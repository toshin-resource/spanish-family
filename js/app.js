// 画面と操作
import * as store from './store.js';
import * as sp from './speech.js';
import { toIpa } from './ipa.js';
import {
  RULES, WORDS, PHRASES, WORD_STAGES, PHRASE_CATEGORIES, getItem, stateKey, todayKey, addDays,
  applyResult, applyNotYet, judgeInput, buildChoices, buildQueue, dueEntries, effectiveMode, summarize, itemStatus, labelFor,
} from './learn.js';

const $main = document.getElementById('main');
const $modal = document.getElementById('modal');
const $toast = document.getElementById('toast');
const $save = document.getElementById('save-status');
const $brand = document.getElementById('brand');
const BRAND_HTML = $brand.innerHTML;

const ui = {
  screen: 'users',
  q: null, // 表示中の問題（一時的な状態）
  result: null, // 直前の学習の結果
  list: { filter: 'all', scope: '1' },
  phraseCat: 'あいさつ',
  usersError: '',
  busy: false,
};

// ---------- 小さな道具 ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const me = () => store.user();
const settings = () => ({ ...store.DEFAULT_SETTINGS, ...(me()?.settings || {}) });
const STATUS_LABEL = { new: '未学習', learning: '学習中', mastered: '習得済み' };
const DIR_LABEL = { 'es-ja': 'スペイン語 → 日本語', 'ja-es': '日本語 → スペイン語', mix: 'ミックス' };
const KIND_LABEL = { word: '単語', phrase: 'フレーズ' };

function esWithArticle(item) {
  return item.article ? `<span class="article">${esc(item.article)}</span> ${esc(item.es)}` : esc(item.es);
}

// 単語の下の補足行：発音記号（設定で「表示しない」にもできる）と品詞（名詞・動詞など）
// withIpa:false は日本語→スペイン語の問題文用（答えのヒントになる発音記号は出さない）
function ipaLine(item, { withIpa = true } = {}) {
  const v = settings().ipa;
  const ipa = !withIpa || v === 'off' ? '' : `<span class="ipa" lang="es-fonipa">${esc(toIpa(item.es, v))}</span>`;
  const pos = item.pos ? `<span class="pos">${esc(item.pos)}</span>` : '';
  return ipa || pos ? `<div class="sub">${ipa}${pos}</div>` : '';
}

function toast(msg, ms = 3200) {
  $toast.textContent = msg;
  $toast.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => $toast.classList.remove('show'), ms);
}

// 読み上げの共通処理（スペイン語の声がない端末では一度だけ案内する）
let warnedVoice = false;
function say(text) {
  const s = settings();
  if (!warnedVoice && sp.missingSpanishVoice()) {
    warnedVoice = true;
    toast('この端末にスペイン語の声が見つかりません。発音が正しくない場合は、iPhoneの「設定」→「アクセシビリティ」→「読み上げコンテンツ」→「声」でスペイン語を追加してください。', 7000);
  }
  return sp.speak(text, { rate: s.rate, voiceURI: s.voiceURI });
}

function fmtDay(key) {
  if (!key) return '—';
  const [, m, d] = key.split('-');
  const t = todayKey();
  if (key === t) return '今日';
  if (key === addDays(t, -1)) return '昨日';
  if (key === addDays(t, 1)) return '明日';
  return `${Number(m)}月${Number(d)}日`;
}

function seg(name, value, options) {
  return `<div class="seg" role="radiogroup">${options
    .map(([v, label]) => `<button type="button" role="radio" aria-checked="${v === value}" class="${v === value ? 'on' : ''}" data-action="set" data-name="${name}" data-value="${esc(v)}">${label}</button>`)
    .join('')}</div>`;
}

function go(screen) {
  sp.stopListening();
  sp.stopSpeaking();
  // 学習画面を離れるとき（セットの終わり・ホームへ戻るなど）に、ためておいた回答をまとめて保存する
  if (ui.screen === 'quiz' && screen !== 'quiz') store.syncNow().catch(() => {});
  ui.screen = screen;
  if (screen !== 'quiz') ui.q = null;
  render();
  window.scrollTo(0, 0);
}

// ---------- 保存状態の表示 ----------
function renderSave(s = store.status()) {
  if (!me() && s.mode === 'local') { $save.innerHTML = ''; return; }
  // 学習中は保存しない（あとでまとめて送る）ので、気が散らないよう保存状態を表示しない
  if (ui.screen === 'quiz') { $save.innerHTML = ''; return; }
  let html;
  if (!s.storageOk) html = '<span class="dot err"></span>この端末に保存できません';
  else if (s.mode === 'local') html = '<span class="dot local"></span>この端末だけに保存中';
  else if (s.phase === 'offline') html = `<span class="dot err"></span>オフライン${s.pending ? `：${s.pending}件を一時保存中` : ''}`;
  else if (s.phase === 'saving') html = '<span class="dot busy"></span>保存中…';
  else if (s.phase === 'error') html = `<button class="linkish" data-action="sync-now"><span class="dot err"></span>未保存 ${s.pending}件・再試行</button>`;
  else if (s.phase === 'pending') html = `<span class="dot busy"></span>まとめて保存待ち ${s.pending}件`;
  else html = '<span class="dot ok"></span>クラウドに保存済み';
  $save.innerHTML = html;
}
store.onStatus(renderSave);
// サーバーが合言葉を求めてきたときだけ、入力画面に切り替える
store.onStatus(() => {
  if (store.needsKey() && ui.screen !== 'passcode') render();
  // 選んでいた利用者がクラウドから消された場合は、利用者の選択に戻る
  else if (!me() && !['users', 'passcode', 'settings'].includes(ui.screen)) { ui.screen = 'users'; render(); loadUsers(); }
});

// ---------- 利用者選択 ----------
function screenUsers() {
  const list = store.users();
  const remote = store.remoteEnabled();
  return `
  <section class="card">
    <h1 class="title">だれが学習しますか？</h1>
    ${ui.usersError ? `<p class="alert">${esc(ui.usersError)} <button class="btn small" data-action="reload-users">もう一度読み込む</button></p>` : ''}
    <div class="user-list">
      ${list.length ? list.map((p) => `
        <button class="user-btn" data-action="pick-user" data-id="${esc(p.user_id)}">
          <span class="avatar">${esc([...p.display_name][0] || '?')}</span>
          <span class="uname">${esc(p.display_name)}</span>
        </button>`).join('') : '<p class="muted">まだだれも登録されていません。</p>'}
    </div>
  </section>
  <section class="card">
    <h2>新しく登録する</h2>
    <form data-form="new-user" class="row">
      <input name="name" maxlength="20" placeholder="表示する名前（例：つとむ）" autocomplete="off" required>
      <button class="btn primary" ${ui.busy ? 'disabled' : ''}>登録</button>
    </form>
    <p class="muted small">名前は表示用です。記録は内部の固有IDで分けて保存するので、同じ名前でも混ざりません。
    ほかの端末ですでに記録がある人は、新しく登録せず上の一覧から選んでください。</p>
  </section>
  <section class="card soft">
    ${remote
      ? '<p class="small"><span class="dot ok"></span>記録は家族のクラウド（Googleスプレッドシート）に保存されます。</p>'
      : `<p class="small"><span class="dot local"></span>いまは<b>この端末だけ</b>に保存されます。家族で記録を共有したり、別の端末で続きをするには、クラウド保存に接続してください。</p>
         <button class="btn" data-action="open-cloud">クラウド保存の設定</button>`}
    <button class="btn" data-action="a2hs">ホーム画面に追加する方法</button>
  </section>`;
}

// ---------- 家族の合言葉（最初に一度だけ入力） ----------
function screenPasscode() {
  return `
  <section class="card">
    <h1 class="title">家族の合言葉を入力</h1>
    <p>学習の記録は、家族共通のクラウド（Googleスプレッドシート）に保存します。保存先のサーバーに合言葉が設定されているため、最初に一度だけ入力してください。</p>
    <form data-form="passcode">
      <label class="field-label" for="passcode-input">合言葉</label>
      <input id="passcode-input" name="key" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false"
        placeholder="例：abcd-efgh-jkmn-pqrs" required>
      <button class="btn primary wide big" ${ui.busy ? 'disabled' : ''}>${ui.busy ? '確認しています…' : 'はじめる'}</button>
    </form>
    ${ui.passError ? `<p class="alert small">${esc(ui.passError)}</p>` : ''}
    <p class="muted small">合言葉がわからないときは、アプリを準備した家族に聞いてください（Apps Script の「showFamilyKey」で確認できます）。
    この端末で学習した記録が残っている場合は、接続したときにクラウドへ移します。</p>
  </section>
  <section class="card soft">
    <button class="btn" data-action="a2hs">ホーム画面に追加する方法</button>
  </section>`;
}

// ---------- ホーム ----------
function homeCfg(s = settings()) {
  return {
    kind: s.kind,
    dir: s.dir,
    answerMode: s.answerMode,
    presentation: s.presentation,
    scope: s.kind === 'word' ? s.scope : s.phraseScope,
    target: s.target,
    count: s.setSize,
  };
}

function screenHome() {
  const u = me();
  const s = settings();
  const sum = summarize(u.states);
  const stage = sum.stageProgress[0];
  const cfg = homeCfg(s);
  const due = dueEntries(u.states, { ...cfg, scope: 'all' }).length;
  const session = u.session;
  const today = todayKey();
  const sets = u.today && u.today.date === today ? u.today.sets : 0;
  const pct = stage.total ? Math.round((stage.mastered / stage.total) * 100) : 0;
  const m = effectiveMode(cfg);
  return `
  <section class="hero">
    <div class="hero-top">
      <span class="who">${esc(u.profile.display_name)} さん</span>
      <button class="btn small ghost" data-action="switch-user">利用者を変更</button>
    </div>
    <div class="big-label">覚えた単語</div>
    <div class="big-number"><span>${sum.masteredWords}</span><small>語</small></div>
    <div class="big-note">スペイン語→日本語（文字あり）で習得済みの単語の数</div>
    <div class="progress"><div style="width:${pct}%"></div></div>
    <div class="progress-label">${esc(stage.label)}のうち <b>${stage.mastered}</b> / ${stage.total}語 習得</div>
    <div class="chips">
      <span class="chip">日本語→スペイン語 ${sum.masteredWordsJaEs}語</span>
      <span class="chip">聞き取り ${sum.masteredWordsListen}語</span>
      <span class="chip">フレーズ ${sum.masteredPhrases} / ${sum.totalPhrases}</span>
    </div>
  </section>

  <section class="card">
    <div class="kind-switch">
      ${seg('kind', s.kind, [['word', '単語学習'], ['phrase', '日常フレーズ集']])}
      ${seg('homeDir', m.dir, [['es-ja', 'スペイン語→日本語'], ['ja-es', '日本語→スペイン語']])}
      ${m.dir === 'mix' ? '<p class="muted small center">いまはミックス（両方向）で出題します</p>' : ''}
    </div>
    <button class="btn today" data-action="today">
      <span class="today-title">今日の${s.setSize}問</span>
      <span class="today-sub">${KIND_LABEL[s.kind]}・${DIR_LABEL[m.dir]}・${m.presentation === 'listen' ? '聞き取り' : m.answerMode === 'input' ? '入力式' : '選択式'}</span>
      <span class="today-sub">復習予定 <b>${due}</b>件${sets ? `　今日 ${sets}セット達成 ✓` : ''}</span>
    </button>
    ${session ? `<button class="btn primary wide" data-action="resume">続きから学習（${session.answeredCount || 0} / ${session.target}問 回答済み）</button>` : ''}
    <div class="grid2">
      <button class="btn" data-action="go" data-to="setup">今日の学習を選ぶ</button>
      <button class="btn" data-action="unmastered">未習得だけ復習</button>
      <button class="btn" data-action="go" data-to="list">単語リスト</button>
      <button class="btn" data-action="go" data-to="phrases">フレーズ集</button>
      <button class="btn span2" data-action="go" data-to="settings">設定</button>
    </div>
    <button class="btn ghost wide" data-action="a2hs">ホーム画面に追加する方法</button>
  </section>`;
}

// ---------- 学習の設定（今日の学習を選ぶ） ----------
function screenSetup() {
  const s = settings();
  const cfg = homeCfg(s);
  const m = effectiveMode(cfg);
  const scopeOpts = s.kind === 'word'
    ? [...WORD_STAGES.map((st) => [String(st.id), `${st.label}`]), ['all', 'すべて']]
    : [['all', 'すべての場面'], ...PHRASE_CATEGORIES.map((c) => [c, c])];
  const notes = [];
  if (cfg.presentation === 'listen') notes.push('聞き取りは「スペイン語の音声 → 日本語で答える」形式です。');
  if (cfg.dir !== 'es-ja' && cfg.answerMode === 'input' && cfg.presentation !== 'listen') notes.push('スペイン語の入力式はまだないため、この方向は選択式で出題します。');
  if (cfg.dir === 'mix') notes.push('ミックスは両方向をほぼ半分ずつ出題します。各問に方向を表示します。');
  return `
  <section class="card">
    <h1 class="title">今日は何を勉強する？</h1>
    <label class="field-label">学習する内容</label>
    ${seg('kind', s.kind, [['word', '単語'], ['phrase', '日常フレーズ']])}
    <label class="field-label">出題方向</label>
    ${seg('dir', s.dir, [['es-ja', 'スペイン語→日本語'], ['ja-es', '日本語→スペイン語'], ['mix', 'ミックス']])}
    <label class="field-label">表示形式</label>
    ${seg('presentation', s.presentation, [['text', '文字あり'], ['listen', '聞き取り']])}
    <label class="field-label">回答方式</label>
    ${seg('answerMode', s.answerMode, [['choice', '選択式'], ['input', '日本語で入力']])}
    <label class="field-label">範囲</label>
    ${seg(s.kind === 'word' ? 'scope' : 'phraseScope', s.kind === 'word' ? s.scope : s.phraseScope, scopeOpts)}
    <label class="field-label">出題対象</label>
    ${seg('target', s.target, [['all', '全部'], ['unmastered', '未習得のみ'], ['review', '今日の復習のみ']])}
    <label class="field-label">問題数</label>
    ${seg('setSize', String(s.setSize), [['5', '5問'], ['10', '10問'], ['15', '15問'], ['20', '20問'], ['30', '30問']])}
    ${notes.length ? `<ul class="notes">${notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
    <p class="muted small">今の設定：${KIND_LABEL[s.kind]}・${DIR_LABEL[m.dir]}・${m.presentation === 'listen' ? '聞き取り' : '文字あり'}・${m.answerMode === 'input' ? '入力式' : '選択式'}</p>
    <button class="btn primary wide big" data-action="start">学習を始める</button>
    <button class="btn ghost wide" data-action="go" data-to="home">ホームへ戻る</button>
  </section>`;
}

// ---------- 学習の開始・再開 ----------
function startSession(cfg, type) {
  const u = me();
  const queue = buildQueue(u.states, cfg, { todaySet: type === 'today' });
  if (!queue.length) {
    toast(cfg.target === 'review' || type === 'today'
      ? '今日の復習も新しい問題もありません。範囲や対象を変えてみてください。'
      : 'この条件で出題できる問題がありません。');
    return;
  }
  if (type === 'today' && queue.length < cfg.count) toast(`出題できる問題が${queue.length}問あります（設定は${cfg.count}問）。`);
  const session = {
    id: store.uid(),
    type,
    cfg,
    date: todayKey(),
    queue,
    pos: 0,
    target: queue.length,
    answeredCount: 0,
    firstDone: {},
    retries: {},
    log: [],
    startedAt: Date.now(),
  };
  store.saveSession(u.profile.user_id, session);
  ui.q = null;
  go('quiz');
  autoPlayIfListening();
}

function resumeSession() {
  const u = me();
  if (!u.session) return;
  if (u.session.pos >= u.session.queue.length) { finishSession(); return; }
  go('quiz');
  autoPlayIfListening();
}

function finishSession() {
  const u = me();
  const sn = u.session;
  if (!sn) return go('home');
  if (sn.type === 'today') store.addTodaySet(u.profile.user_id, todayKey());
  const due = dueEntries(u.states, { ...sn.cfg }).length;
  ui.result = { session: sn, due };
  store.saveSession(u.profile.user_id, null);
  go('result');
}

// ---------- 出題 ----------
function currentEntry() {
  const sn = me()?.session;
  if (!sn) return null;
  return sn.queue[sn.pos] || null;
}

function prepareQuestion() {
  const sn = me().session;
  // 表示中の問題を使い続けるのは、同じ学習回の同じ問題のときだけ
  // （回答後は pos が1つ進んでいるので index === pos - 1。最後の問題でも結果と評価ボタンを出す）
  if (ui.q && ui.q.sessionId === sn.id) {
    if (ui.q.done && ui.q.index === sn.pos - 1) return ui.q;
    if (!ui.q.done && ui.q.index === sn.pos) return ui.q;
  }
  const entry = currentEntry();
  if (!entry) return null;
  const item = getItem(entry.id);
  const s = settings();
  ui.q = {
    sessionId: sn.id,
    index: sn.pos,
    entry,
    item,
    choices: entry.answerMode === 'choice' ? buildChoices(item, entry.dir, s.choices).map((c) => c.id) : [],
    answered: false,
    done: false,
    result: null,
    picked: '',
    text: '',
    method: 'keyboard',
    pending: false,
    matched: null,
    audioError: false,
    listeningNow: false,
  };
  return ui.q;
}

function autoPlayIfListening() {
  const q = ui.screen === 'quiz' ? prepareQuestion() : null;
  if (q && q.entry.mode === 'listen' && !q.answered) playQuestion();
}

function playQuestion() {
  const q = ui.q;
  if (!q) return;
  q.audioError = false;
  say(q.item.es)
    .then(() => { if (ui.q === q && q.audioError) { q.audioError = false; render(); } })
    .catch(() => {
      if (ui.q !== q) return;
      q.audioError = true;
      render();
    });
}

function screenQuiz() {
  const sn = me().session;
  if (!sn) return screenHome();
  const q = prepareQuestion();
  if (!q) { setTimeout(finishSession); return ''; }
  const { item, entry } = q;
  const listen = entry.mode === 'listen';
  const revealed = q.answered || q.pending;
  const progressDone = sn.answeredCount;
  const pct = Math.round((progressDone / sn.target) * 100);

  // 単語と発音ボタンを横に並べて、回答後も「次へ」までスクロールせずに見えるようにする
  const longEs = item.es.length > 14 ? ' long' : '';
  const esRow = `
      <div class="prompt-row">
        <div class="prompt-es${longEs}">${esWithArticle(item)}</div>
        <button class="icon-btn play-icon" data-action="play-q" aria-label="発音を聞く">🔊</button>
      </div>
      ${ipaLine(item)}`;
  let prompt;
  if (listen && revealed) {
    prompt = esRow;
  } else if (listen) {
    prompt = `
      <button class="play-big" data-action="play-q" aria-label="音声を再生">▶<span>音声を再生</span></button>
      <p class="muted small center">文字は回答後に表示されます。何度でも聞き直せます。</p>
      ${q.audioError ? `
        <div class="alert">音声を再生できませんでした。この問題は不正解にはなりません。
          <div class="row wrap">
            <button class="btn small" data-action="play-q">もう一度再生</button>
            <button class="btn small" data-action="skip-q">この問題をとばす</button>
            <button class="btn small" data-action="to-text">文字ありの学習に切り替え</button>
          </div>
        </div>` : ''}`;
  } else if (entry.dir === 'es-ja') {
    prompt = esRow;
  } else {
    prompt = `
      <div class="prompt-ja${item.ja.length > 9 ? ' long' : ''}">${esc(item.ja)}</div>
      ${ipaLine(item, { withIpa: false })}
      ${revealed ? '' : '<p class="muted small center">発音は回答後に聞けます。</p>'}`;
  }

  let answerArea = '';
  if (entry.answerMode === 'choice') {
    answerArea = `<div class="choices">${q.choices.map((id) => {
      const c = getItem(id);
      let cls = '';
      if (q.answered) {
        if (id === item.id) cls = 'correct';
        else if (id === q.picked) cls = 'wrong';
        else cls = 'dim';
      }
      return `<button class="choice ${cls}" data-action="choose" data-id="${esc(id)}" ${q.answered ? 'disabled' : ''}>${esc(labelFor(c, entry.dir))}</button>`;
    }).join('')}</div>`;
  } else {
    answerArea = `
      <form data-form="answer" class="answer-form">
        <input id="answer-input" name="answer" lang="ja" autocomplete="off" autocapitalize="off" enterkeyhint="done"
          placeholder="日本語の意味を入力" value="${esc(q.text)}" ${revealed ? 'disabled' : ''}>
        <div class="row">
          ${sp.sttSupported() ? `<button type="button" class="btn mic ${q.listeningNow ? 'on' : ''}" data-action="mic" ${revealed ? 'disabled' : ''}>${q.listeningNow ? '■ 停止' : '🎤 音声入力'}</button>` : ''}
          <button class="btn primary" ${revealed ? 'disabled' : ''}>回答する</button>
        </div>
        <p class="mic-status small muted" id="mic-status">${q.listeningNow ? '聞き取り中… 話し終わったら自動で止まります。文字を確認してから「回答する」を押してください。' : ''}</p>
      </form>`;
  }

  return `
  <div class="quiz-top">
    <div class="qprogress"><div class="bar"><div style="width:${pct}%"></div></div><span>${progressDone} / ${sn.target}</span></div>
  </div>
  <section class="card quiz">
    <div class="qmeta">
      <span class="tag">${KIND_LABEL[entry.kind]}</span>
      <span class="tag dir">${listen ? '聞き取り：音声 → 日本語' : DIR_LABEL[entry.dir]}</span>
      ${entry.retry ? '<span class="tag retry">もう一度</span>' : ''}
    </div>
    <div class="prompt">${prompt}</div>
    ${answerArea}
    ${!revealed ? '<button class="btn ghost wide" data-action="dont-know">わからない</button>' : ''}
    ${revealed ? feedback(q) : ''}
  </section>
  ${revealed ? actionBar(q) : ''}`;
}

// 回答後の操作は画面下に固定し、スクロールしなくても押せるようにする
function actionBar(q) {
  const inner = q.pending
    ? `<button class="btn ok" data-action="self-judge" data-value="correct">正解として記録</button>
       <button class="btn" data-action="self-judge" data-value="wrong">復習に回す</button>`
    : `<button class="btn big" data-action="rate" data-value="notyet">まだ覚えていない</button>
       <button class="btn primary big" data-action="rate" data-value="known">覚えた</button>`;
  return `<div class="action-bar"><div class="action-inner">${inner}</div></div>`;
}

function feedback(q) {
  const { item, entry } = q;
  const others = item.accepted.slice(1).filter((a) => a !== item.ja);
  const verdict = q.pending
    ? ['pending', '確認待ち']
    : q.result === 'correct'
      ? ['ok', '正解！']
      : q.result === 'unknown'
        ? ['unknown', '正しい意味']
        : ['ng', '不正解'];
  // 問題文にスペイン語が出ていない形式（日本語→スペイン語）だけ、ここで表記と発音を見せる
  const showEs = entry.dir !== 'es-ja';
  let extra = '';
  if (q.pending) {
    extra = `
      <p class="small">あなたの答え：<b>${esc(q.text)}</b>（自動で判定できません。下のボタンで選んでください）</p>`;
  } else if (q.result === 'wrong' && q.matched) {
    extra = `<p class="small">「${esc(q.text)}」は <b>${esc(q.matched.es)}</b> の意味です。</p>`;
  } else if (q.result === 'wrong' && q.picked && entry.answerMode === 'choice') {
    const p = getItem(q.picked);
    extra = `<p class="small">選んだ <b>${esc(labelFor(p, entry.dir))}</b> は「${esc(entry.dir === 'es-ja' ? p.es : p.ja)}」です。</p>`;
  }
  return `
  <div class="feedback ${verdict[0]}">
    <div class="fb-head">
      <span class="verdict">${verdict[1]}</span>
      <span class="ans-ja">${esc(item.ja)}</span>
    </div>
    ${showEs ? `<div class="ans-es">${esWithArticle(item)} <button class="icon-btn" data-action="play" data-id="${esc(item.id)}" aria-label="発音を聞く">🔊</button></div>${ipaLine(item)}` : ''}
    ${others.length ? `<div class="small muted">ほかの正解：${others.map(esc).join('、')}</div>` : ''}
    ${item.hint ? `<div class="small hint">💡 ${esc(item.hint)}</div>` : ''}
    ${item.note ? `<div class="small hint">💬 ${esc(item.note)}</div>` : ''}
    ${extra}
  </div>`;
}

// 回答を確定して保存する（同じ問題への二重保存はしない）
// 回答した直後の音：正解なら効果音、そのあと正しいスペイン語を読み上げる（設定で切り替え可）
// 画面操作の処理の中で呼ぶこと（iPhoneは操作と無関係な音の再生を止めるため）
function answerSounds(item, { chime = false, speak = true } = {}) {
  const s = settings();
  const wait = chime && s.sfx !== 'off' ? sp.playChime() : 0;
  if (!speak || s.autoSpeak === 'off') return;
  const q = ui.q;
  setTimeout(() => {
    if (ui.q === q && ui.screen === 'quiz') say(item.es).catch(() => {});
  }, wait);
}

function commitAnswer(result, { judgedBy = 'auto', speak = true } = {}) {
  const q = ui.q;
  const u = me();
  const sn = u.session;
  if (!q || q.done || !sn || sn.id !== q.sessionId || sn.pos !== q.index) return;
  q.done = true;
  q.answered = true;
  q.pending = false;
  q.result = result;
  const { entry, item } = q;
  const key = stateKey(entry.kind, entry.id, entry.dir, entry.mode);
  const first = !sn.firstDone[key];
  const today = todayKey();
  const state = applyResult(u.states[key], result, { sessionId: sn.id, firstInSession: first, today });
  const answer = {
    answer_id: store.uid(),
    user_id: u.profile.user_id,
    kind: entry.kind,
    item_id: entry.id,
    direction: entry.dir,
    mode: entry.mode,
    session_id: sn.id,
    answer_mode: entry.answerMode,
    input_method: entry.answerMode === 'choice' ? 'tap' : q.method,
    result,
    judged_by: judgedBy,
    answer_text: entry.answerMode === 'choice' ? (q.picked ? labelFor(getItem(q.picked), entry.dir) : '') : q.text,
    answered_at: new Date().toISOString(),
  };
  // セットの進み具合を更新
  sn.firstDone[key] = true;
  if (!entry.retry) sn.answeredCount++;
  sn.log.push({ id: item.id, kind: item.kind, dir: entry.dir, result, retry: !!entry.retry });
  sn.pos++;
  if (result !== 'correct') {
    const n = sn.retries[key] || 0;
    if (n < RULES.maxRetriesPerItem) {
      sn.retries[key] = n + 1;
      const at = Math.min(sn.pos + RULES.requeueGap, sn.queue.length);
      sn.queue.splice(at, 0, { ...entry, retry: true });
    }
  }
  store.recordAnswer(u.profile.user_id, answer, key, state);
  store.saveSession(u.profile.user_id, sn);
  sp.stopListening();
  render();
  answerSounds(item, { chime: result === 'correct', speak });
}

function nextQuestion() {
  const sn = me().session;
  ui.q = null;
  if (!sn || sn.pos >= sn.queue.length) { finishSession(); return; }
  render();
  window.scrollTo(0, 0);
  autoPlayIfListening();
}

// ---------- 結果 ----------
function screenResult() {
  const r = ui.result;
  if (!r) return screenHome();
  const firstTries = r.session.log.filter((l) => !l.retry);
  const correct = firstTries.filter((l) => l.result === 'correct').length;
  const seen = new Map();
  for (const l of r.session.log) seen.set(l.id, l.retry && seen.has(l.id) ? seen.get(l.id) : l);
  const missed = [...new Set(firstTries.filter((l) => l.result !== 'correct').map((l) => l.id))];
  return `
  <section class="card center">
    <div class="sun-big" aria-hidden="true"></div>
    <h1 class="title">おつかれさまでした！</h1>
    <div class="score"><b>${correct}</b> / ${firstTries.length} 問 正解</div>
    <p class="muted">今回学習した${KIND_LABEL[r.session.cfg.kind]}：${seen.size}　｜　この範囲の残りの復習：${r.due}件</p>
  </section>
  <section class="card">
    <h2>今回の${KIND_LABEL[r.session.cfg.kind]}</h2>
    <ul class="result-list">
      ${firstTries.map((l) => {
        const it = getItem(l.id);
        return `<li><span class="mark ${l.result === 'correct' ? 'ok' : 'ng'}">${l.result === 'correct' ? '○' : l.result === 'unknown' ? '？' : '×'}</span>
          <span class="es">${esWithArticle(it)}</span><span class="ja">${esc(it.ja)}</span>
          <button class="icon-btn" data-action="play" data-id="${esc(it.id)}" aria-label="発音">🔊</button></li>`;
      }).join('')}
    </ul>
    ${missed.length ? `<button class="btn primary wide" data-action="retry-missed">間違えた${missed.length}問をもう一度</button>` : ''}
    <button class="btn wide" data-action="today">もう1セット学習する</button>
    <button class="btn ghost wide" data-action="go" data-to="home">ホームへ</button>
  </section>`;
}

// ---------- 単語リスト ----------
function screenList() {
  const u = me();
  const { filter, scope } = ui.list;
  const items = WORDS.filter((w) => scope === 'all' || String(w.stage) === scope);
  const rows = items
    .map((w) => ({ w, st: itemStatus(u.states, w) }))
    .filter(({ st }) => filter === 'all' || (filter === 'unmastered' ? st !== 'mastered' : st === filter));
  const ja = (w) => itemStatus(u.states, w, 'ja-es') === 'mastered';
  const li = (w) => itemStatus(u.states, w, 'es-ja', 'listen') === 'mastered';
  return `
  <section class="card">
    <h1 class="title">単語リスト</h1>
    ${seg('list-scope', scope, [...WORD_STAGES.map((s) => [String(s.id), s.label]), ['all', 'すべて']])}
    ${seg('list-filter', filter, [['all', 'すべて'], ['new', '未学習'], ['learning', '学習中'], ['mastered', '習得済み'], ['unmastered', '未習得']])}
    <p class="muted small">状態は「スペイン語→日本語（文字あり）」の結果です。「未習得」は未学習と学習中の両方を含みます。${rows.length}語</p>
    <ul class="word-list">
      ${rows.map(({ w, st }) => `
        <li>
          <button class="icon-btn" data-action="play" data-id="${w.id}" aria-label="発音">🔊</button>
          <div class="wl-main"><div class="es">${esWithArticle(w)}</div>${ipaLine(w)}<div class="ja">${esc(w.ja)}</div></div>
          <div class="wl-side"><span class="badge ${st}">${STATUS_LABEL[st]}</span>
            <span class="mini">${ja(w) ? '日→西✓' : ''} ${li(w) ? '聞✓' : ''}</span></div>
        </li>`).join('')}
    </ul>
  </section>`;
}

// ---------- フレーズ集 ----------
function screenPhrases() {
  const u = me();
  const cat = ui.phraseCat;
  const list = PHRASES.filter((p) => p.category === cat);
  return `
  <section class="card">
    <h1 class="title">日常フレーズ集</h1>
    <div class="tabs">${PHRASE_CATEGORIES.map((c) => `<button class="${c === cat ? 'on' : ''}" data-action="phrase-cat" data-value="${esc(c)}">${esc(c)}</button>`).join('')}</div>
    <ul class="phrase-list">
      ${list.map((p) => {
        const st = itemStatus(u.states, p);
        return `<li>
          <div class="ph-head"><div class="es">${esc(p.es)}</div><button class="icon-btn" data-action="play" data-id="${p.id}" aria-label="読み上げ">🔊</button></div>
          ${ipaLine(p)}
          <div class="ja">${esc(p.ja)}</div>
          ${p.note ? `<div class="small muted">${esc(p.note)}</div>` : ''}
          <span class="badge ${st}">${STATUS_LABEL[st]}</span>
        </li>`;
      }).join('')}
    </ul>
    <button class="btn primary wide" data-action="phrase-quiz">「${esc(cat)}」をクイズで確認</button>
  </section>`;
}

// ---------- 設定 ----------
function reviewSchedule(states) {
  const t = todayKey();
  const buckets = { overdue: 0, today: 0, tomorrow: 0, week: 0, later: 0 };
  const upcoming = [];
  for (const [key, s] of Object.entries(states)) {
    if (!s.next) continue;
    if (s.next < t) buckets.overdue++;
    else if (s.next === t) buckets.today++;
    else if (s.next === addDays(t, 1)) buckets.tomorrow++;
    else if (s.next <= addDays(t, 7)) buckets.week++;
    else buckets.later++;
    upcoming.push({ key, next: s.next, status: s.status });
  }
  upcoming.sort((a, b) => (a.next < b.next ? -1 : 1));
  return { buckets, upcoming: upcoming.slice(0, 30) };
}

function screenSettings() {
  const u = me();
  const s = settings();
  const r = store.remoteConfig();
  const voices = sp.spanishVoices();
  const sched = u ? reviewSchedule(u.states) : null;
  const userPart = u ? `
  <section class="card">
    <h2>${esc(u.profile.display_name)} さんの設定</h2>
    <label class="field-label">1セットの問題数（今日の○問）</label>
    <div class="row"><button class="btn small" data-action="size" data-delta="-5">−5</button>
      <span class="num">${s.setSize}問</span><button class="btn small" data-action="size" data-delta="5">＋5</button></div>
    <label class="field-label">選択肢の数</label>
    ${seg('choices', String(s.choices), [['4', '4択'], ['5', '5択']])}
    <label class="field-label">発音の速さ</label>
    ${seg('rate', String(s.rate), [['0.6', 'ゆっくり'], ['0.9', 'ふつう'], ['1.1', '速め']])}
    <label class="field-label">回答したら発音を読み上げる</label>
    ${seg('autoSpeak', s.autoSpeak, [['on', 'する'], ['off', 'しない']])}
    <label class="field-label">正解のときの効果音</label>
    ${seg('sfx', s.sfx, [['on', '鳴らす'], ['off', '鳴らさない']])}
    <label class="field-label">発音記号</label>
    ${seg('ipa', s.ipa, [['latam', '中南米'], ['ar', 'アルゼンチン'], ['off', '表示しない']])}
    <p class="muted small">発音記号は綴りから自動で作った簡略表記です（例：calle ${esc(toIpa('calle', 'latam'))}、アルゼンチン式では ${esc(toIpa('calle', 'ar'))}）。聞き取り問題と日本語→スペイン語の問題では、答えのヒントにならないよう回答後に表示します。</p>
    <label class="field-label">読み上げの声</label>
    ${voices.length ? `<select data-change="voice">
        <option value="">自動（アルゼンチン → 中南米 → スペインの順に選択）</option>
        ${voices.map((v) => `<option value="${esc(v.voiceURI)}" ${v.voiceURI === s.voiceURI ? 'selected' : ''}>${esc(v.name)}（${esc(v.lang)}）</option>`).join('')}
      </select>`
      : `<p class="alert small">${sp.ttsSupported() ? 'スペイン語の音声が見つかりません。iPhoneの「設定」→「アクセシビリティ」→「読み上げコンテンツ」→「声」からスペイン語の声を追加すると使えるようになる場合があります。' : 'このブラウザは読み上げに対応していません。'}</p>`}
    <button class="btn" data-action="test-voice">試しに再生：¡Hola! ¿Cómo estás?</button>
    <p class="muted small">出題方向・回答方式などは「今日の学習を選ぶ」で選ぶと、次回もその設定から始まります。</p>
  </section>
  <section class="card">
    <h2>自動復習の予定</h2>
    <dl class="sched">
      <dt>期限を過ぎている</dt><dd>${sched.buckets.overdue}件</dd>
      <dt>今日</dt><dd>${sched.buckets.today}件</dd>
      <dt>明日</dt><dd>${sched.buckets.tomorrow}件</dd>
      <dt>1週間以内</dt><dd>${sched.buckets.week}件</dd>
      <dt>それ以降</dt><dd>${sched.buckets.later}件</dd>
    </dl>
    <p class="muted small">正解が続くと間隔が ${RULES.intervalsDays.join('・')} 日と延び、間違えると翌日に戻ります。<b>別々の学習回で${RULES.masteryStreak}回続けて正解</b>すると「習得済み」になります（同じ学習回の中での再出題の正解は数えません）。</p>
    ${sched.upcoming.length ? `<details><summary>次の復習予定（近い順）</summary><ul class="sched-list">${sched.upcoming.map((x) => {
      const [kind, id, dir, mode] = x.key.split(':');
      const it = getItem(id);
      return it ? `<li><span>${fmtDay(x.next)}</span><span>${esc(it.es)}</span><span class="small muted">${dir === 'es-ja' ? '西→日' : '日→西'}${mode === 'listen' ? '・聞' : ''}</span></li>` : '';
    }).join('')}</ul></details>` : ''}
  </section>` : '';
  const st = store.status();
  return `
  <h1 class="title pad">設定</h1>
  ${userPart}
  <section class="card" id="cloud">
    <h2>クラウド保存（家族で共有）</h2>
    <p class="small">Googleスプレッドシートに記録を保存します。スプレッドシート自体は非公開ですが、いまは合言葉なしの設定のため、保存先のURLを知っている人は記録を読み書きできます（合言葉を付けるときは、サーバー側で設定してから下に入力します）。準備の手順は README を見てください。</p>
    <form data-form="cloud">
      <label class="field-label">Apps Script のURL（…/exec）</label>
      <input name="url" inputmode="url" autocomplete="off" value="${esc(r.url)}" placeholder="https://script.google.com/macros/s/…/exec">
      <label class="field-label">家族の合言葉</label>
      <input name="key" type="password" autocomplete="off" value="${esc(r.key)}" placeholder="合言葉">
      <div class="row wrap">
        <button class="btn primary">接続して保存</button>
      </div>
    </form>
    <p class="small">状態：${st.mode === 'local' ? 'この端末だけに保存中'
      : st.phase === 'offline' ? `オフライン。${st.pending ? `${st.pending}件をこの端末に一時保存し、インターネットにつながったら自動で送ります` : '送り残しはありません'}`
      : st.phase === 'error' ? `未保存 ${st.pending}件（${esc(st.message)}）。自動で再試行します`
      : st.pending ? `送信待ち ${st.pending}件` : 'クラウドに保存済み'}</p>
    ${st.mode === 'remote' ? '<p class="muted small">学習中は端末にためておき、セットの終わり・ホームに戻ったとき・アプリを閉じたときに、まとめてクラウドに保存します。インターネットにつながっていないときは、つながったら自動で送ります。</p>' : ''}
    ${st.mode === 'local' ? `<p class="alert small">いまの記録は、このiPhoneのブラウザの中だけにあります。Safariの「履歴とWebサイトデータを消去」をしたり、ホーム画面のアイコンを削除したりすると消えます。Safariで開いた場合は、しばらく使わないと消えることもあります。合言葉を入れて「接続して保存」を押すと、ここまでの記録もクラウドに移して保存します。</p>` : ''}
    ${st.mode === 'remote' ? '<button class="btn" data-action="sync-now">今すぐ保存</button>' : ''}
  </section>
  <section class="card">
    <h2>その他</h2>
    <button class="btn" data-action="a2hs">ホーム画面に追加する方法</button>
    <button class="btn" data-action="export">記録を書き出す（バックアップ）</button>
    <p class="muted small">単語 ${WORDS.length}語・フレーズ ${PHRASES.length}件を収録。単語の選定は仮のもので、日常会話でよく使う基本語を前に並べています。</p>
  </section>`;
}

// ---------- ホーム画面への追加の案内 ----------
function showA2HS() {
  const ua = navigator.userAgent;
  const standalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
  const iOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const otherBrowser = /CriOS|FxiOS|EdgiOS|OPiOS|Line\/|Instagram|FBAN|FBAV|MicroMessenger/i.test(ua);
  $modal.innerHTML = `
  <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="a2hs-title">
    <h2 id="a2hs-title">ホーム画面に追加する方法</h2>
    ${standalone ? '<p class="ok-box">いまはホーム画面のアイコンから開いています。追加は済んでいます。</p>' : ''}
    ${iOS && otherBrowser ? '<p class="alert small">いまはSafari以外（アプリ内ブラウザなど）で開いています。画面のメニューから「Safariで開く」を選んでから、下の手順で追加してください。</p>' : ''}
    <p class="small">このボタンで自動的には追加されません。次の手順でご自身で追加してください。</p>
    <ol class="steps">
      <li><b>共有ボタン</b>（四角から上向き矢印が出ているマーク）を押します。画面の<b>下</b>または<b>上</b>、または「…」メニューの中にあります。</li>
      <li>メニューを下へ動かし、<b>「ホーム画面に追加」</b>を選びます。</li>
      <li>名前を確認し、「Webアプリとして開く」が表示されたらオンにして、<b>「追加」</b>を押します。</li>
    </ol>
    <p class="muted small">追加後はホーム画面のアイコンから始められます。最初に開いたときは、利用者を選び直す必要があります。読み上げ・音声入力・保存には通信が必要な場合があります。</p>
    <button class="btn primary wide" data-action="close-modal">閉じる</button>
  </div>`;
  $modal.hidden = false;
}

// ---------- 描画 ----------
const SCREENS = {
  users: screenUsers, home: screenHome, setup: screenSetup, quiz: screenQuiz, result: screenResult,
  list: screenList, phrases: screenPhrases, settings: screenSettings,
  passcode: screenPasscode,
};

function render() {
  // 保存先はクラウド。合言葉が入るまでは学習を始めない
  if (store.needsKey()) ui.screen = 'passcode';
  else if (ui.screen === 'passcode') ui.screen = me() ? 'home' : 'users';
  if (!me() && !['users', 'settings', 'passcode'].includes(ui.screen)) ui.screen = 'users';
  $main.innerHTML = SCREENS[ui.screen]();
  document.body.dataset.screen = ui.screen;
  renderHeader();
  renderSave();
}

// 画面上部の固定バー：ホーム以外の画面では、アプリ名の代わりに「ホームへ戻る」ボタンを出す
function renderHeader() {
  if (['home', 'users', 'passcode'].includes(ui.screen)) { $brand.innerHTML = BRAND_HTML; return; }
  const label = me() ? '← ホーム' : '← もどる';
  $brand.innerHTML = `<button class="btn small back home-nav" data-action="home-nav">${label}</button>`;
}

// ---------- 操作 ----------
const actions = {
  go: (el) => {
    go(el.dataset.to);
  },
  set: (el) => {
    const { name, value } = el.dataset;
    if (name === 'list-scope') { ui.list.scope = value; return render(); }
    if (name === 'list-filter') { ui.list.filter = value; return render(); }
    // ホームの方向切り替え：聞き取りは「音声→日本語」だけなので、日本語→スペイン語を選んだら文字ありに戻す
    if (name === 'homeDir') {
      const patch = { dir: value };
      if (value === 'ja-es') patch.presentation = 'text';
      store.updateSettings(store.currentUid(), patch);
      return render();
    }
    const patch = {};
    patch[name] = ['setSize', 'choices'].includes(name) ? Number(value) : name === 'rate' ? Number(value) : value;
    store.updateSettings(store.currentUid(), patch);
    render();
  },
  'pick-user': async (el) => {
    ui.busy = true;
    try {
      await store.selectUser(el.dataset.id);
    } catch (e) {
      toast(me()
        ? `クラウドから記録を読み込めませんでした（${e.message}）。この端末の記録で続けます。`
        : 'この利用者はクラウドから削除されています。一覧を読み込み直しました。', 5000);
    }
    ui.busy = false;
    if (!me()) { go('users'); loadUsers(); return; }
    go('home');
  },
  'reload-users': () => loadUsers(),
  'switch-user': () => { store.signOut(); go('users'); loadUsers(); },
  'open-cloud': () => { go('settings'); setTimeout(() => document.getElementById('cloud')?.scrollIntoView()); },
  today: () => {
    const u = me();
    const s = settings();
    const sn = u.session;
    // 最後の問題まで答えたまま閉じていた場合は、先にそのセットを締めくくる（達成の記録と結果表示）
    if (sn && sn.pos >= sn.queue.length) return finishSession();
    const cfg = { ...homeCfg(s), target: 'all' };
    // 途中のセットは、内容・方向・形式が今の選択と同じときだけ続きから。違えば新しいセットにする（回答済みの分は保存済み）
    const same = sn && ['kind', 'dir', 'presentation', 'answerMode', 'scope'].every((k) => sn.cfg?.[k] === cfg[k]);
    if (sn && sn.type === 'today' && sn.date === todayKey() && same) return resumeSession();
    startSession(cfg, 'today');
  },
  resume: () => resumeSession(),
  start: () => startSession(homeCfg(), 'normal'),
  unmastered: () => startSession({ ...homeCfg(), target: 'unmastered' }, 'normal'),
  // その場面だけのクイズ。設定（今日の○問の範囲など）は変えない
  'phrase-quiz': () => {
    startSession({ ...homeCfg(), kind: 'phrase', scope: ui.phraseCat, target: 'all' }, 'normal');
  },
  'retry-missed': () => {
    const r = ui.result;
    const missed = [...new Set(r.session.log.filter((l) => !l.retry && l.result !== 'correct').map((l) => l.id))];
    const first = r.session.queue.filter((e) => !e.retry);
    const queue = missed.map((id) => first.find((e) => e.id === id)).filter(Boolean).map((e) => ({ ...e, retry: false }));
    const session = { ...r.session, id: store.uid(), type: 'retry', queue, pos: 0, target: queue.length, answeredCount: 0, firstDone: {}, retries: {}, log: [], startedAt: Date.now() };
    store.saveSession(store.currentUid(), session);
    go('quiz');
    autoPlayIfListening();
  },
  // 回答は1問ごとに保存済みなので、確認なしでメニューに戻る（「続きから学習」で再開できる）
  quit: () => {
    go('home');
    toast('ここまでの回答は保存しました。「続きから学習」で再開できます。');
  },
  'play-q': () => playQuestion(),
  play: (el) => {
    const it = getItem(el.dataset.id);
    say(it.es).catch(() => toast('音声を再生できませんでした。マナーモードや音量、スペイン語の声があるかを確認してください。', 5000));
  },
  'test-voice': () => {
    say('¡Hola! ¿Cómo estás?').catch(() => toast('音声を再生できませんでした。', 4000));
  },
  choose: (el) => {
    const q = ui.q;
    if (!q || q.answered) return;
    q.picked = el.dataset.id;
    commitAnswer(q.picked === q.item.id ? 'correct' : 'wrong');
  },
  'dont-know': () => {
    const q = ui.q;
    if (!q || q.answered) return;
    commitAnswer('unknown');
  },
  'self-judge': (el) => {
    const q = ui.q;
    if (!q || !q.pending) return;
    // 発音は「確認待ち」を表示したときに読み上げ済みなので、ここでは効果音だけ
    commitAnswer(el.dataset.value === 'correct' ? 'correct' : 'wrong', { judgedBy: 'self', speak: false });
    // 自分で判定したので、「覚えた／まだ覚えていない」は聞かずに次の問題へ
    ui.q.rated = true;
    nextQuestion();
  },
  next: () => nextQuestion(),
  'home-nav': () => {
    if (ui.screen === 'quiz') return actions.quit();
    go(me() ? 'home' : 'users');
  },
  // 回答後の自己評価。どちらを押しても次の問題へ進む
  rate: (el) => {
    const q = ui.q;
    if (!q || !q.done || q.rated) return;
    q.rated = true;
    if (el.dataset.value === 'notyet' && q.result === 'correct') {
      // 当てずっぽうで正解したときなど：習得には数えず、翌日の復習と、この学習の中での再出題に回す
      const u = me();
      const sn = u.session;
      const { entry } = q;
      const key = stateKey(entry.kind, entry.id, entry.dir, entry.mode);
      store.updateState(u.profile.user_id, key, applyNotYet(u.states[key]));
      const n = sn.retries[key] || 0;
      if (n < RULES.maxRetriesPerItem) {
        sn.retries[key] = n + 1;
        sn.queue.splice(Math.min(sn.pos + RULES.requeueGap, sn.queue.length), 0, { ...entry, retry: true });
      }
      const last = sn.log[sn.log.length - 1];
      if (last && last.id === entry.id) last.notYet = true;
      store.saveSession(u.profile.user_id, sn);
    }
    nextQuestion();
  },
  'skip-q': () => {
    // 再生できなかった問題は記録せず、セットの最後に回す
    const sn = me().session;
    const [e] = sn.queue.splice(sn.pos, 1);
    if (sn.queue.length > sn.pos) sn.queue.push(e);
    else sn.target = Math.max(sn.answeredCount, sn.target - 1);
    store.saveSession(store.currentUid(), sn);
    nextQuestion();
  },
  'to-text': () => {
    store.updateSettings(store.currentUid(), { presentation: 'text' });
    store.saveSession(store.currentUid(), null);
    go('setup');
  },
  mic: () => {
    const q = ui.q;
    if (!q) return;
    if (q.listeningNow) { sp.stopListening(); return; }
    const input = document.getElementById('answer-input');
    const ok = sp.startListening({
      lang: 'ja-JP',
      onText: (text) => {
        q.text = text;
        q.method = 'voice';
        if (input) input.value = text;
      },
      onEnd: () => {
        q.listeningNow = false;
        if (ui.q === q && !q.answered) render();
      },
      onError: (code) => {
        q.listeningNow = false;
        toast(sp.sttErrorMessage(code), 6000);
        if (ui.q === q && !q.answered) render();
      },
    });
    if (ok) { q.listeningNow = true; render(); }
  },
  size: (el) => {
    const s = settings();
    const n = Math.min(50, Math.max(5, s.setSize + Number(el.dataset.delta)));
    store.updateSettings(store.currentUid(), { setSize: n });
    render();
  },
  'phrase-cat': (el) => { ui.phraseCat = el.dataset.value; render(); },
  'sync-now': () => store.syncNow().then(() => toast('保存しました')).catch((e) => toast(`保存できませんでした：${e.message}`, 5000)),
  export: () => {
    const blob = new Blob([store.exportData()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `spanish-vocab-backup-${todayKey()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  },
  a2hs: () => showA2HS(),
  'close-modal': () => { $modal.hidden = true; $modal.innerHTML = ''; },
};

// iPhoneで、あとから鳴らす効果音・読み上げを許可してもらうため、最初のタップで準備する
document.addEventListener('pointerdown', () => { sp.unlockAudio(); sp.unlockSpeech(); }, { once: true });

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  const fn = actions[el.dataset.action];
  if (fn) { e.preventDefault(); fn(el); }
});
$modal.addEventListener('click', (e) => { if (e.target === $modal) actions['close-modal'](); });

document.addEventListener('input', (e) => {
  if (e.target.id === 'answer-input' && ui.q) {
    ui.q.text = e.target.value;
  }
});

document.addEventListener('change', (e) => {
  if (e.target.dataset.change === 'voice') {
    store.updateSettings(store.currentUid(), { voiceURI: e.target.value });
  }
});

document.addEventListener('submit', async (e) => {
  const form = e.target.closest('[data-form]');
  if (!form) return;
  e.preventDefault();
  const kind = form.dataset.form;
  if (kind === 'answer') {
    const q = ui.q;
    if (!q || q.answered) return;
    sp.stopListening();
    q.text = form.answer.value;
    const j = judgeInput(q.item, q.text);
    if (j.result === 'empty') { toast('答えを入力するか、「わからない」を押してください。'); return; }
    if (j.result === 'pending') { q.pending = true; q.answered = true; render(); answerSounds(q.item); return; }
    q.matched = j.matched || null;
    commitAnswer(j.result);
  } else if (kind === 'new-user') {
    const name = form.name.value.trim();
    if (!name) return;
    if (store.nameTaken(name) && !confirm(`「${name}」さんはすでに登録されています。別の人として新しく登録しますか？\n（同じ人なら「キャンセル」して一覧から選んでください）`)) return;
    ui.busy = true;
    render();
    try {
      await store.createUser(name);
      go('home');
    } catch (err) {
      toast(`登録できませんでした：${err.message}`, 5000);
    }
    ui.busy = false;
    if (ui.screen === 'users') render();
  } else if (kind === 'passcode') {
    const key = form.key.value.trim();
    if (!key || ui.busy) return;
    ui.busy = true;
    ui.passError = '';
    render();
    try {
      const { url } = store.remoteConfig();
      await store.testRemote(url, key);
      store.setRemote(url, key);
      // この端末で学習済みの記録があれば、ここでクラウドに移す
      await store.refreshUsers();
      if (store.currentUid()) await store.pullUser(store.currentUid()).catch(() => {});
      store.scheduleSync(200);
      ui.screen = store.currentUid() ? 'home' : 'users';
      toast('クラウドに接続しました。記録はクラウドに保存されます。');
    } catch (err) {
      ui.passError = `接続できませんでした：${err.message}`;
    }
    ui.busy = false;
    render();
  } else if (kind === 'cloud') {
    const url = form.url.value.trim();
    const key = form.key.value.trim();
    if (!/^https:\/\/script\.google(usercontent)?\.com\//.test(url)) { toast('Apps Script のURL（https://script.google.com/…/exec）を入力してください。', 5000); return; }
    toast('接続を確認しています…');
    try {
      await store.testRemote(url, key);
      store.setRemote(url, key);
      await store.refreshUsers();
      if (store.currentUid()) await store.pullUser(store.currentUid()).catch(() => {});
      store.scheduleSync(200);
      toast('クラウド保存に接続しました。');
      render();
    } catch (err) {
      toast(`接続できませんでした：${err.message}`, 6000);
    }
  }
});

window.speechSynthesis?.addEventListener?.('voiceschanged', () => { if (ui.screen === 'settings') render(); });

// 他の画面に移るときやアプリを閉じるときは音声入力を止める
// アプリに戻ってきたときは、ほかの端末での学習分をクラウドから読み込み直す
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') { sp.stopListening(); return; }
  if (store.remoteEnabled() && store.currentUid() && store.online()) {
    store.pullUser(store.currentUid()).then(() => { if (['home', 'list', 'phrases'].includes(ui.screen)) render(); }).catch(() => {});
  }
});

async function loadUsers() {
  ui.usersError = '';
  if (store.remoteEnabled()) {
    try {
      await store.refreshUsers();
    } catch (e) {
      ui.usersError = `クラウドから家族の一覧を読み込めませんでした（${e.message}）。`;
    }
  }
  if (ui.screen === 'users') render();
}

// ---------- 起動 ----------
async function boot() {
  if (store.needsKey()) {
    ui.screen = 'passcode';
    render();
    return;
  }
  if (store.currentUid()) {
    ui.screen = 'home';
    render();
    if (store.remoteEnabled()) {
      store.pullUser(store.currentUid()).then(() => { if (ui.screen === 'home') render(); }).catch(() => {});
      store.scheduleSync(1000);
    }
  } else {
    ui.screen = 'users';
    render();
    loadUsers();
  }
}
boot();
