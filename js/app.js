// 画面と操作
import * as store from './store.js';
import * as sp from './speech.js';
import { toIpa } from './ipa.js';
import {
  RULES, WORDS, PHRASES, WORD_STAGES, PHRASE_CATEGORIES, LETTER_CATEGORIES, LANG, LANGS, setLang, langOf, getItem, stateKey, todayKey, addDays,
  applyResult, applyNotYet, applyMastered, judgeInput, buildChoices, buildQueue, dueEntries, effectiveMode, summarize, itemStatus, labelFor, scopeItems,
} from './learn.js';

const $main = document.getElementById('main');
const $modal = document.getElementById('modal');
const $toast = document.getElementById('toast');
const $save = document.getElementById('save-status');
const $brand = document.getElementById('brand');

const ui = {
  screen: 'users',
  q: null, // 表示中の問題（一時的な状態）
  result: null, // 直前の学習の結果
  list: { filter: 'all', scope: '1' },
  phraseCat: 'あいさつ',
  letterCat: '子音',
  usersError: '',
  busy: false,
};

// ---------- 小さな道具 ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const me = () => store.user();
const settings = () => ({ ...store.DEFAULT_SETTINGS, ...(me()?.settings || {}) });
const STATUS_LABEL = { new: '未学習', learning: '学習中', mastered: '習得済み' };
// 出題方向の表示名（言語名は選んでいる言語、または問題の言語）
const dirLabel = (dir, name = LANG.name) => ({ 'es-ja': `${name} → 日本語`, 'ja-es': `日本語 → ${name}`, mix: 'ミックス' }[dir]);
const KIND_LABEL = { word: '単語', phrase: 'フレーズ', letter: '文字' };
// 読み上げる文字列（文字の学習では文字の名前を読む）
const sayText = (item) => item.speak || item.es;

function esWithArticle(item) {
  return item.article ? `<span class="article">${esc(item.article)}</span> ${esc(item.es)}` : esc(item.es);
}

// 単語の下の補足行：発音記号（設定で「表示しない」にもできる）と品詞（名詞・動詞など）
// withIpa:false は日本語→スペイン語の問題文用（答えのヒントになる発音記号は出さない）
function ipaLine(item, { withIpa = true } = {}) {
  const v = settings().ipa;
  let ipa = '';
  if (withIpa && item.roman) ipa = `<span class="ipa roman">${esc(item.roman)}</span>`; // タイ語は読み（声調記号つき）
  else if (withIpa && item.ipa) { if (settings().enIpa !== 'off') ipa = `<span class="ipa" lang="en-fonipa">/${esc(item.ipa)}/</span>`; } // 英語（アメリカ発音）
  else if (withIpa && v !== 'off' && item.lang === 'es') ipa = `<span class="ipa" lang="es-fonipa">${esc(toIpa(item.es, v))}</span>`;
  const pos = item.pos ? `<span class="pos">${esc(item.pos)}</span>` : '';
  return ipa || pos ? `<div class="sub">${ipa}${pos}</div>` : '';
}

// 例文：文・読み（タイ語）・日本語訳と、読み上げボタン
function exampleBlock(item, { compact = false } = {}) {
  const ex = item.example;
  if (!ex) return '';
  return `<div class="example${compact ? ' compact' : ''}">
    <button class="icon-btn ex-say" data-action="play-ex" data-id="${esc(item.id)}" aria-label="例文を聞く">🔊</button>
    <div class="ex-body">
      ${compact ? '' : '<span class="ex-label">例文</span>'}
      <div class="ex-text" lang="${esc(item.lang)}">${esc(ex.text)}</div>
      ${ex.roman ? `<div class="ex-roman">${esc(ex.roman)}</div>` : ''}
      <div class="ex-ja">${esc(ex.ja)}</div>
    </div>
  </div>`;
}

function toast(msg, ms = 3200) {
  $toast.textContent = msg;
  $toast.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => $toast.classList.remove('show'), ms);
}

// 読み上げの共通処理（その言語の声がない端末では一度だけ案内する）
const warnedVoice = {};
function say(text, lang = LANG.code, repeat = 1) {
  const s = settings();
  if (!warnedVoice[lang] && sp.missingVoice(lang)) {
    warnedVoice[lang] = true;
    const name = LANGS[lang]?.name || '';
    toast(`この端末に${name}の声が見つかりません。発音が正しくない場合は、iPhoneの「設定」→「アクセシビリティ」→「読み上げコンテンツ」→「声」で${name}を追加してください。`, 7000);
  }
  // 声の選択はスペイン語だけ（タイ語は端末のタイ語の声を自動で使う）
  return sp.speak(text, { rate: s.rate, voiceURI: lang === 'es' ? s.voiceURI : '', lang, repeat });
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
  if (ui.screen === 'autoplay' && screen !== 'autoplay') stopAuto();
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
  const kind = s.kind === 'letter' && !LANG.letters.length ? 'word' : s.kind;
  return {
    kind,
    dir: s.dir,
    answerMode: s.answerMode,
    presentation: s.presentation,
    lang: s.lang,
    scope: kind === 'word' ? s.wordScope : kind === 'letter' ? s.letterScope : s.phraseScope,
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
  const due = dueEntries(u.states, { ...cfg, scope: 'all', setNo: nextSetNo(s) }).length;
  const session = u.session;
  const today = todayKey();
  const sets = u.today && u.today.date === today ? u.today.sets : 0;
  const pct = stage.total ? Math.round((stage.mastered / stage.total) * 100) : 0;
  const m = effectiveMode(cfg);
  const todayMs = s.studyDay && s.studyDay.date === today ? s.studyDay.ms : 0;
  const toma = tomaSays({ name: u.profile.display_name, session, sets, due });
  const tiles = [
    ['auto-open', '', '🎧', '自動再生', '聞き流し'],
    ['go', 'setup', '🎯', '学習を選ぶ', '方向・範囲・問題数'],
    ['unmastered', '', '🔁', '未習得だけ', 'まとめて復習'],
    ['go', 'list', '📖', '単語リスト', '習得済みにする'],
    ['go', 'phrases', '💬', 'フレーズ集', '場面ごとに'],
    ...(LANG.letters.length ? [['go', 'letters', 'ก', 'タイ文字', '一覧と読み']] : []),
    ['go', 'settings', '⚙️', '設定', '声・時間など'],
  ];
  return `
  <section class="hero">
    <div class="hero-top">
      <button class="who-pill" data-action="switch-user" aria-label="利用者を変更">
        <span class="avatar sm">${esc([...u.profile.display_name][0] || '?')}</span>${esc(u.profile.display_name)} さん<span class="who-change">変更</span>
      </button>
      <span class="time-pill">⏱ 今日 ${fmtDuration(todayMs)}</span>
    </div>
    <div class="hero-main">
      <div class="hero-stat">
        <div class="big-label">覚えた単語</div>
        <div class="big-number"><span>${sum.masteredWords}</span><small>語</small></div>
      </div>
      <div class="toma-box">
        <div class="bubble">${toma.text}</div>
        <img class="toma" src="img/${toma.img}" alt="とーまくん" width="120" height="124">
      </div>
    </div>
    <div class="progress"><div style="width:${Math.max(pct, sum.masteredWords ? 2 : 0)}%"></div></div>
    <div class="progress-label"><span>${esc(stage.label)}のうち <b>${stage.mastered}</b> / ${stage.total}語</span><b>${pct}%</b></div>
    <div class="stat-grid">
      <div><b>${sum.masteredWordsJaEs}</b><span>日本語→${esc(LANG.short)}</span></div>
      <div><b>${sum.masteredWordsListen}</b><span>聞き取り</span></div>
      <div><b>${sum.masteredPhrases}<small>/${sum.totalPhrases}</small></b><span>フレーズ</span></div>
      ${sum.totalLetters ? `<div><b>${sum.masteredLetters}<small>/${sum.totalLetters}</small></b><span>文字</span></div>` : ''}
    </div>
    <p class="hero-note">覚えた単語＝${esc(LANG.name)}→日本語（文字あり）で習得済みの数。学習時間の合計 ${fmtDuration(s.studyTotalMs)}</p>
  </section>

  <section class="card home-card">
    <div class="home-switch lang-switch">${seg('lang', s.lang, Object.values(LANGS).map((l) => [l.code, `<span class="flag">${LANG_FLAG[l.code] || ''}</span>${l.name}`]))}</div>
    <div class="home-switch">${seg('kind', cfg.kind, [['word', '単語'], ['phrase', 'フレーズ'], ...(LANG.letters.length ? [['letter', 'タイ文字']] : [])])}</div>
    <div class="home-switch">${seg('homeDir', m.dir, [['es-ja', `${LANG.name} → 日本語`], ['ja-es', `日本語 → ${LANG.name}`]])}</div>
    ${m.dir === 'mix' ? '<p class="muted small center">いまはミックス（両方向）で出題します</p>' : ''}

    ${session ? `<button class="btn resume-btn" data-action="resume">
      <span class="resume-play" aria-hidden="true">▶</span>
      <span class="resume-text"><b>続きから学習</b><small>${session.answeredCount || 0} / ${session.target}問 回答済み</small></span>
    </button>` : ''}
    <button class="btn today" data-action="today">
      <span class="today-text">
        <span class="today-title">今日の${s.setSize}問</span>
        <span class="today-sub">${KIND_LABEL[cfg.kind]}・${dirLabel(m.dir)}</span>
        <span class="today-badges"><span>${m.presentation === 'listen' ? '聞き取り' : m.answerMode === 'input' ? '入力式' : '選択式'}</span><span>復習 <b>${due}</b>件</span>${sets ? `<span>今日 ${sets}セット ✓</span>` : ''}</span>
      </span>
      <img class="today-toma" src="img/toma-walk.webp" alt="" width="84" height="86">
    </button>

    <div class="tiles">
      ${tiles.map(([action, to, icon, label, sub], i) => `
        <button class="tile${tiles.length % 2 && i === tiles.length - 1 ? ' span2' : ''}" data-action="${action}"${to ? ` data-to="${to}"` : ''}>
          <span class="tile-icon" aria-hidden="true">${icon}</span>
          <span class="tile-text"><b>${label}</b><small>${sub}</small></span>
        </button>`).join('')}
    </div>
    <button class="btn ghost wide small" data-action="a2hs">ホーム画面に追加する方法</button>
  </section>`;
}

// ホームのとーまくんのひとこと（状況に合わせて変える）
const LANG_FLAG = { es: '🇦🇷', th: '🇹🇭', en: '🇺🇸' };
const LANG_HELLO = { es: '¡Hola!', th: 'สวัสดี!', en: 'Hello!' };
function tomaSays({ name, session, sets, due }) {
  const hello = `<span class="hello" lang="${LANG.code}">${LANG_HELLO[LANG.code] || ''}</span>`;
  if (session) return { img: 'toma-wait.webp', text: `${hello}続きから やろう！<br>あと${Math.max(0, session.target - (session.answeredCount || 0))}問だよ` };
  if (sets >= 2) return { img: 'toma-joy.webp', text: `今日は${sets}セットも<br>できたね！すごい！` };
  if (sets === 1) return { img: 'toma-joy.webp', text: '今日の1セット<br>できたね！' };
  if (due > 0) return { img: 'toma-wait.webp', text: `${hello}復習が<br>${due}件 まってるよ` };
  return { img: 'toma.svg', text: `${hello}${esc(name)}さん、<br>いっしょにがんばろう！` };
}

// ---------- 学習の設定（今日の学習を選ぶ） ----------
// 範囲の選択肢（単語は段階、フレーズは場面、文字は子音・母音など）と、それを保存する設定の名前
function scopeOptions(kind) {
  const opts = kind === 'word'
    ? [['all', 'すべて（順番に）'], ...WORD_STAGES.map((st) => [String(st.id), `${st.label}`])]
    : kind === 'letter'
      ? [['all', 'すべての文字'], ...LETTER_CATEGORIES.map((c) => [c, c])]
      : [['all', 'すべての場面'], ...PHRASE_CATEGORIES.map((c) => [c, c])];
  return { opts, name: kind === 'word' ? 'wordScope' : kind === 'letter' ? 'letterScope' : 'phraseScope' };
}

function screenSetup() {
  const s = settings();
  const cfg = homeCfg(s);
  const m = effectiveMode(cfg);
  const { opts: scopeOpts, name: scopeName } = scopeOptions(cfg.kind);
  const notes = [];
  if (cfg.presentation === 'listen') notes.push(`聞き取りは「${LANG.name}の音声 → 日本語で答える」形式です。`);
  if (cfg.dir !== 'es-ja' && cfg.answerMode === 'input' && cfg.presentation !== 'listen') notes.push(`${LANG.name}の入力式はまだないため、この方向は選択式で出題します。`);
  if (cfg.kind === 'letter') notes.push('文字の学習は選択式で出題します。');
  if (cfg.dir === 'mix') notes.push('ミックスは両方向をほぼ半分ずつ出題します。各問に方向を表示します。');
  return `
  <section class="card">
    <h1 class="title">今日は何を勉強する？</h1>
    <label class="field-label">言語</label>
    ${seg('lang', s.lang, Object.values(LANGS).map((l) => [l.code, l.name]))}
    <label class="field-label">学習する内容</label>
    ${seg('kind', cfg.kind, [['word', '単語'], ['phrase', '日常フレーズ'], ...(LANG.letters.length ? [['letter', 'タイ文字']] : [])])}
    <label class="field-label">出題方向</label>
    ${seg('dir', s.dir, [['es-ja', `${LANG.name}→日本語`], ['ja-es', `日本語→${LANG.name}`], ['mix', 'ミックス']])}
    <label class="field-label">表示形式</label>
    ${seg('presentation', s.presentation, [['text', '文字あり'], ['listen', '聞き取り']])}
    <label class="field-label">回答方式</label>
    ${seg('answerMode', s.answerMode, [['choice', '選択式'], ['input', '日本語で入力']])}
    <label class="field-label">範囲</label>
    ${seg(scopeName, cfg.scope, scopeOpts)}
    <label class="field-label">出題対象</label>
    ${seg('target', s.target, [['all', '全部'], ['unmastered', '未習得のみ'], ['review', '今日の復習のみ']])}
    <label class="field-label">問題数</label>
    ${seg('setSize', String(s.setSize), [['5', '5問'], ['10', '10問'], ['15', '15問'], ['20', '20問'], ['30', '30問']])}
    ${notes.length ? `<ul class="notes">${notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
    <p class="muted small">今の設定：${LANG.name}・${KIND_LABEL[cfg.kind]}・${dirLabel(m.dir)}・${m.presentation === 'listen' ? '聞き取り' : '文字あり'}・${m.answerMode === 'input' ? '入力式' : '選択式'}</p>
    <button class="btn primary wide big" data-action="start">学習を始める</button>
    <button class="btn ghost wide" data-action="go" data-to="home">ホームへ戻る</button>
  </section>`;
}

// ---------- 学習の開始・再開 ----------
// 「今日の○問」のセット番号（言語ごと）。間違えた語を「次の次のセット」で出し直すのに使う
const nextSetNo = (s = settings(), lang = LANG.code) => ((s.setNos || {})[lang] || 0) + 1;
// 間違えた語を出し直すセット番号。「今日の○問」中ならそのセットの次の次、それ以外の学習なら次の次の「今日の○問」
function retrySetNo(entry) {
  const sn = me().session;
  if (sn?.type === 'today' && sn.cfg.setNo) return sn.cfg.setNo + RULES.retryAfterSets;
  const lang = getItem(entry.id)?.lang || LANG.code;
  return nextSetNo(settings(), lang) - 1 + RULES.retryAfterSets;
}

function startSession(cfg, type) {
  const u = me();
  sp.primeSpeech(cfg.lang || LANG.code);
  if (type === 'today') cfg = { ...cfg, setNo: nextSetNo(settings(), cfg.lang) };
  const queue = buildQueue(u.states, cfg, { todaySet: type === 'today' });
  if (!queue.length) {
    toast(cfg.target === 'review' || type === 'today'
      ? '今日の復習も新しい問題もありません。範囲や対象を変えてみてください。'
      : 'この条件で出題できる問題がありません。');
    return;
  }
  if (type === 'today') {
    const s = settings();
    store.updateSettings(u.profile.user_id, { setNos: { ...(s.setNos || {}), [cfg.lang]: cfg.setNo } });
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
  sp.primeSpeech(LANG.code);
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
  // 以前の版でセットの途中に入れた「もう一度」の問題は出さない（間違えた語は次の次のセットで出す）
  while (sn.queue[sn.pos]?.retry) sn.queue.splice(sn.pos, 1);
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

// 問題を出したときの自動再生：聞き取りはすぐ、外国語が表示される問題は1秒後に読み上げる
// （日本語→外国語と、タイ文字は答えのヒントになるので読み上げない）
function autoPlayIfListening() {
  const q = ui.screen === 'quiz' ? prepareQuestion() : null;
  if (!q || q.answered) return;
  const still = () => ui.q === q && ui.screen === 'quiz' && !q.answered && !q.audioError;
  // 2回続けて読み上げる（2回分をまとめて読み上げの順番待ちに入れる）
  const twice = () => playQuestion(2);
  if (q.entry.mode === 'listen') { twice().finally(() => { q.audioDone = true; ensureCountdown(); }); return; }
  if (q.entry.dir !== 'es-ja' || q.item.kind === 'letter' || settings().autoSpeakQuestion === 'off') return;
  setTimeout(() => { if (still()) twice(); }, 1000);
}

function playQuestion(repeat = 1) {
  const q = ui.q;
  if (!q) return Promise.resolve();
  q.audioError = false;
  return say(sayText(q.item), q.item.lang, repeat)
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
  const isLetter = item.kind === 'letter';
  const longEs = isLetter ? ' letter' : item.es.length > 14 ? ' long' : '';
  const esRow = `
      <div class="prompt-row">
        <div class="prompt-es${longEs}">${esWithArticle(item)}</div>
        <button class="icon-btn play-icon" data-action="play-q" aria-label="発音を聞く">🔊</button>
      </div>
      ${ipaLine(item, { withIpa: !isLetter || revealed })}`;
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
      ${revealed || item.kind === 'letter' ? '' : '<p class="muted small center">選択肢の 🔊 で発音を聞けます。</p>'}`;
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
      const roman = entry.dir !== 'es-ja' && c.roman && c.kind !== 'letter' ? `<small class="choice-roman">${esc(c.roman)}</small>` : '';
      const mark = cls === 'correct' ? '<span class="choice-mark">✓ 正解</span>' : cls === 'wrong' ? '<span class="choice-mark">✗ あなたの答え</span>' : '';
      // 日本語→外国語では、各選択肢の発音を聞けるボタンを横に置く（押しても回答にはならない）
      const sayBtn = entry.dir !== 'es-ja' && c.kind !== 'letter'
        ? `<button class="icon-btn choice-say" data-action="play" data-id="${esc(id)}" aria-label="${esc(labelFor(c, entry.dir))}の発音を聞く">🔊</button>` : '';
      return `<div class="choice-row ${cls}"><button class="choice ${cls}" data-action="choose" data-id="${esc(id)}" ${q.answered ? 'disabled' : ''}>${mark}${esc(labelFor(c, entry.dir))}${roman}</button>${sayBtn}</div>`;
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
      <span class="tag dir">${listen ? '聞き取り：音声 → 日本語' : dirLabel(entry.dir, langOf(item).name)}</span>
      ${entry.retry ? '<span class="tag retry">もう一度</span>' : ''}
    </div>
    <div class="prompt">${prompt}</div>
    ${answerArea}
    ${!revealed ? (answerSeconds() > 0
      ? `<div class="countdown"><div class="cd-track"><div class="cd-bar" id="cd-bar"></div></div><span id="cd-text">${listen && !q.audioDone ? '音声のあとで数えます' : `あと${answerSeconds()}秒`}</span></div>`
      : '<button class="btn ghost wide" data-action="dont-know">わからない</button>') : ''}
    ${revealed ? feedback(q) : ''}
  </section>
  ${revealed ? actionBar(q) : `
  <button class="btn ok wide mastered-skip" data-action="mark-mastered">✓ 習得済み<span>もう覚えている（押すと覚えた${KIND_LABEL[entry.kind]}に入り、次の問題へ）</span></button>`}`;
}

// 回答後の操作は画面下に固定し、スクロールしなくても押せるようにする
function actionBar(q) {
  const inner = q.pending
    ? `<button class="btn ok" data-action="self-judge" data-value="correct">正解として記録</button>
       <button class="btn" data-action="self-judge" data-value="wrong">復習に回す</button>`
    : `<button class="btn big" data-action="rate" data-value="notyet">まだ覚えていない</button>
       <button class="btn primary big" data-action="rate" data-value="known">ほぼ覚えた</button>`;
  return `<div class="action-bar"><div class="action-inner">${inner}</div></div>`;
}

function feedback(q) {
  const { item, entry } = q;
  const others = item.kind === 'letter' ? [] : item.accepted.slice(1).filter((a) => a !== item.ja);
  const kind = q.pending ? 'pending' : q.result === 'correct' ? 'ok' : q.result === 'unknown' ? 'unknown' : 'ng';
  const banner = { ok: '⭕ 正解！', ng: '❌ 不正解', unknown: q.timedOut ? '⏰ 時間切れ' : '💡 答えを確認しましょう', pending: '❓ 確認待ち' }[kind];
  // 正しい答え：その問題で選ぶ側の表記（外国語→日本語なら日本語、日本語→外国語なら外国語）
  const rightLabel = entry.dir === 'es-ja' ? item.ja : item.es;
  const rightSub = entry.dir === 'es-ja' ? '' : `<span class="fb-sub">${esc(item.ja)}</span>`;
  let mine = '';
  if (q.pending) {
    mine = `${esc(q.text)}<span class="fb-sub">自動で判定できません。下のボタンで選んでください</span>`;
  } else if (q.result === 'wrong' && q.matched) {
    mine = `${esc(q.text)}<span class="fb-sub">＝ ${esc(q.matched.es)} の意味</span>`;
  } else if (q.result === 'wrong' && q.picked && entry.answerMode === 'choice') {
    const p = getItem(q.picked);
    mine = `${esc(labelFor(p, entry.dir))}<span class="fb-sub">＝ ${esc(entry.dir === 'es-ja' ? p.es : p.ja)}${entry.dir === 'es-ja' && p.roman ? `（${esc(p.roman)}）` : ''}</span>`;
  }
  return `
  <div class="feedback ${kind}">
    <div class="verdict-banner">${banner}</div>
    <div class="fb-row right">
      <span class="fb-label">正しい答え</span>
      <span class="fb-value">${esc(rightLabel)}${rightSub}</span>
      ${entry.dir !== 'es-ja' ? `<button class="icon-btn" data-action="play" data-id="${esc(item.id)}" aria-label="発音を聞く">🔊</button>` : ''}
    </div>
    ${entry.dir !== 'es-ja' ? ipaLine(item) : ''}
    ${mine ? `<div class="fb-row mine"><span class="fb-label">あなたの答え</span><span class="fb-value">${mine}</span></div>` : ''}
    ${others.length ? `<div class="small muted">ほかの正解：${others.map(esc).join('、')}</div>` : ''}
    ${item.hint ? `<div class="small hint">💡 ${esc(item.hint)}</div>` : ''}
    ${item.note ? `<div class="small hint">💬 ${esc(item.note)}</div>` : ''}
    ${exampleBlock(item)}
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
    if (ui.q === q && ui.screen === 'quiz') say(sayText(item), item.lang).catch(() => {});
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
  // 間違えた・わからなかった語は、同じセットでは出し直さず、次の次の「今日の○問」で出す
  if (result !== 'correct') state.retryAtSet = retrySetNo(entry);
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
  sn.answeredCount++;
  sn.log.push({ id: item.id, kind: item.kind, dir: entry.dir, result, retry: !!entry.retry });
  sn.pos++;
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
    <img class="result-toma" src="img/toma-joy.webp" alt="" width="120" height="124">
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
          <span class="es">${esWithArticle(it)}${it.roman ? `<small class="choice-roman">${esc(it.roman)}</small>` : ''}</span><span class="ja">${esc(it.ja)}</span>
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
    <p class="muted small">状態は「${LANG.name}→日本語（文字あり）」の結果です。「未習得」は未学習と学習中の両方を含みます。もう知っている単語は「習得済みにする」を押すと、覚えた単語に入ります。${rows.length}語</p>
    <ul class="word-list">
      ${rows.map(({ w, st }) => `
        <li>
          <button class="icon-btn" data-action="play" data-id="${w.id}" aria-label="発音">🔊</button>
          <div class="wl-main"><div class="es">${esWithArticle(w)}</div>${ipaLine(w)}<div class="ja">${esc(w.ja)}</div>${exampleBlock(w, { compact: true })}</div>
          <div class="wl-side"><span class="badge ${st}">${STATUS_LABEL[st]}</span>
            <span class="mini">${ja(w) ? `日→${LANG.short}✓` : ''} ${li(w) ? '聞✓' : ''}</span>
            ${st === 'mastered'
              ? `<button class="mark-btn undo" data-action="list-mastered" data-id="${w.id}" data-value="off">取り消す</button>`
              : `<button class="mark-btn" data-action="list-mastered" data-id="${w.id}" data-value="on">✓ 習得済み<br>にする</button>`}</div>
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

// ---------- タイ文字の一覧 ----------
function screenLetters() {
  const u = me();
  const cat = LETTER_CATEGORIES.includes(ui.letterCat) ? ui.letterCat : LETTER_CATEGORIES[0];
  const list = LANG.letters.filter((l) => l.category === cat);
  const intro = {
    子音: '子音は「名前（例の単語）」で覚えます。中子音・高子音・低子音の3つの類があり、声調の決まり方が変わります。',
    母音: '母音は子音（ここでは無音の อ）の前・後・上・下に書きます。前に書く母音も、読むのは子音のあとです。',
    声調記号: '声調記号は子音の右上に付けます。同じ記号でも、子音の類によって声調が変わります。',
  }[cat];
  return `
  <section class="card">
    <h1 class="title">タイ文字の一覧</h1>
    <div class="tabs">${LETTER_CATEGORIES.map((c) => `<button class="${c === cat ? 'on' : ''}" data-action="letter-cat" data-value="${esc(c)}">${esc(c)}</button>`).join('')}</div>
    <p class="muted small">${esc(intro)} 文字を押すと名前を読み上げます。</p>
    <ul class="letter-grid">
      ${list.map((l) => {
        const st = itemStatus(u.states, l);
        return `<li>
          <button class="letter-card ${st}" data-action="play" data-id="${l.id}" aria-label="${esc(l.roman)}を読み上げ">
            <span class="letter-big" lang="th">${esc(l.es)}</span>
            <span class="letter-roman">${esc(l.roman)}</span>
            <span class="letter-ja">${esc(l.ja.replace(/^[^（]*/, ''))}</span>
            <span class="letter-cls">${esc(l.pos)}</span>
          </button>
        </li>`;
      }).join('')}
    </ul>
    <button class="btn primary wide" data-action="letter-quiz" data-value="${esc(cat)}">「${esc(cat)}」をクイズで確認</button>
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
    <label class="field-label">答えるまでの時間（過ぎたら答えを表示）</label>
    <select class="sec-select" data-change="answerSeconds" aria-label="答えるまでの時間">
      ${Array.from({ length: 28 }, (_, i) => i + 3).map((n) => `<option value="${n}" ${n === answerSeconds() ? 'selected' : ''}>${n}秒</option>`).join('')}
      <option value="0" ${answerSeconds() === 0 ? 'selected' : ''}>なし（「わからない」ボタンを出す）</option>
    </select>
    <label class="field-label">問題を表示して1秒後に発音を読み上げる（2回）</label>
    ${seg('autoSpeakQuestion', s.autoSpeakQuestion, [['on', 'する'], ['off', 'しない']])}
    <label class="field-label">回答したら発音を読み上げる</label>
    ${seg('autoSpeak', s.autoSpeak, [['on', 'する'], ['off', 'しない']])}
    <label class="field-label">正解のときの効果音</label>
    ${seg('sfx', s.sfx, [['on', '鳴らす'], ['off', '鳴らさない']])}
    ${LANG.code === 'es' ? `
    <label class="field-label">発音記号（スペイン語）</label>
    ${seg('ipa', s.ipa, [['latam', '中南米'], ['ar', 'アルゼンチン'], ['off', '表示しない']])}
    <p class="muted small">発音記号は綴りから自動で作った簡略表記です（例：calle ${esc(toIpa('calle', 'latam'))}、アルゼンチン式では ${esc(toIpa('calle', 'ar'))}）。聞き取り問題と日本語→スペイン語の問題では、答えのヒントにならないよう回答後に表示します。</p>
    <label class="field-label">読み上げの声（スペイン語）</label>
    ${voices.length ? `<select data-change="voice">
        <option value="">自動（アルゼンチン → 中南米 → スペインの順に選択）</option>
        ${voices.map((v) => `<option value="${esc(v.voiceURI)}" ${v.voiceURI === s.voiceURI ? 'selected' : ''}>${esc(v.name)}（${esc(v.lang)}）</option>`).join('')}
      </select>`
      : `<p class="alert small">${sp.ttsSupported() ? 'スペイン語の音声が見つかりません。iPhoneの「設定」→「アクセシビリティ」→「読み上げコンテンツ」→「声」からスペイン語の声を追加すると使えるようになる場合があります。' : 'このブラウザは読み上げに対応していません。'}</p>`}
    <button class="btn" data-action="test-voice">試しに再生：¡Hola! ¿Cómo estás?</button>`
    : LANG.code === 'en' ? `
    <label class="field-label">発音記号（英語・アメリカ発音）</label>
    ${seg('enIpa', s.enIpa, [['on', '表示する'], ['off', '表示しない']])}
    <p class="muted small">日本語→英語の問題と聞き取り問題では、答えのヒントにならないよう回答後に表示します。</p>
    <label class="field-label">読み上げの声（英語）</label>
    ${sp.voicesFor('en').length ? '<p class="muted small">この端末の英語の声（アメリカ → イギリス → オーストラリアの順）を自動で使います。</p>'
      : `<p class="alert small">${sp.ttsSupported() ? '英語の音声が見つかりません。iPhoneの「設定」→「アクセシビリティ」→「読み上げコンテンツ」→「声」から英語の声を追加すると使えるようになる場合があります。' : 'このブラウザは読み上げに対応していません。'}</p>`}
    <button class="btn" data-action="test-voice">試しに再生：Hello! How are you?</button>`
    : `
    <p class="muted small">タイ語は、タイ文字の下に読み（ローマ字・声調記号つき）を表示します。記号なし＝平らに、à＝低く、â＝高から下げて、á＝高く、ǎ＝低から上げて発音します。aa・ii など同じ文字が2つ続くと長く伸ばします。</p>
    <label class="field-label">読み上げの声（タイ語）</label>
    ${sp.voicesFor('th').length ? '<p class="muted small">この端末のタイ語の声を自動で使います。</p>'
      : `<p class="alert small">${sp.ttsSupported() ? 'タイ語の音声が見つかりません。iPhoneの「設定」→「アクセシビリティ」→「読み上げコンテンツ」→「声」からタイ語の声を追加すると使えるようになる場合があります。' : 'このブラウザは読み上げに対応していません。'}</p>`}
    <button class="btn" data-action="test-voice">試しに再生：สวัสดีครับ</button>`}
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
    <p class="muted small">正解が続くと間隔が ${RULES.intervalsDays.join('・')} 日と延び、間違えると翌日に戻ります。<b>別々の学習回で${RULES.masteryStreak}回続けて正解</b>すると「習得済み」になります。間違えた語は、次の次の「今日の○問」で出し直します。</p>
    ${sched.upcoming.length ? `<details><summary>次の復習予定（近い順）</summary><ul class="sched-list">${sched.upcoming.map((x) => {
      const [kind, id, dir, mode] = x.key.split(':');
      const it = getItem(id);
      return it ? `<li><span>${fmtDay(x.next)}</span><span>${esc(it.es)}</span><span class="small muted">${dir === 'es-ja' ? `${langOf(it).short}→日` : `日→${langOf(it).short}`}${mode === 'listen' ? '・聞' : ''}</span></li>` : '';
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
    <p class="muted small">いまの版：${esc(APP_VERSION || '—')}（新しい版が出ると、ホームの一番上に「更新する」が出ます）</p>
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

// ---------- 回答の制限時間（「わからない」ボタンの代わり） ----------
// 決めた秒数のあいだに答えなければ、答えを表示する（わからない扱い）。秒数は設定で変えられる（0 = なし）
const countdown = { q: null, deadline: 0, total: 0, timer: null };
function answerSeconds() {
  const n = Number(settings().answerSeconds);
  return Number.isFinite(n) ? n : 5;
}
function stopCountdown() {
  clearInterval(countdown.timer);
  countdown.timer = null;
  countdown.q = null;
}
// 入力中は、文字を打つたびに数え直す
function restartCountdown(q) {
  if (countdown.q === q) countdown.deadline = Date.now() + countdown.total;
}
function ensureCountdown() {
  const q = ui.screen === 'quiz' ? ui.q : null;
  if (!q || q.answered || q.pending || q.listeningNow || answerSeconds() <= 0) { stopCountdown(); return; }
  if (q.entry.mode === 'listen' && !q.audioDone) return; // 聞き取りは音声を聞き終わってから数える
  if (countdown.q === q && countdown.timer) { tickCountdown(); return; }
  stopCountdown();
  countdown.q = q;
  countdown.total = answerSeconds() * 1000;
  countdown.deadline = Date.now() + countdown.total;
  countdown.timer = setInterval(tickCountdown, 100);
  tickCountdown();
}
function tickCountdown() {
  const q = countdown.q;
  if (!q || ui.q !== q || ui.screen !== 'quiz' || q.answered || q.pending) { stopCountdown(); return; }
  const left = countdown.deadline - Date.now();
  const bar = document.getElementById('cd-bar');
  const text = document.getElementById('cd-text');
  if (bar) bar.style.width = `${Math.max(0, (left / countdown.total) * 100)}%`;
  if (text) text.textContent = `あと${Math.max(0, Math.ceil(left / 1000))}秒`;
  if (left <= 0) {
    stopCountdown();
    q.timedOut = true;
    commitAnswer('unknown');
  }
}

// ---------- 自動再生（聞き流し） ----------
// 1語ずつ「外国語を2回 → 日本語を1回」読み上げ、単語・意味・例文を表示して、次の語へ自動で進む
const auto = { key: '', items: [], pos: 0, playing: false, seq: 0, phase: '', wake: null };
const AUTO_GAP_MS = 700; // 外国語と日本語のあいだ
const AUTO_NEXT_MS = 1500; // 次の語へ進む前

function autoKey(s = settings()) {
  const cfg = homeCfg(s);
  return [LANG.code, cfg.kind, cfg.scope, s.autoTarget, s.autoOrder].join('|');
}
function buildAuto() {
  const s = settings();
  const cfg = homeCfg(s);
  let items = scopeItems(cfg.kind, cfg.scope, LANG.code);
  if (s.autoTarget === 'unmastered') items = items.filter((it) => itemStatus(me().states, it) !== 'mastered');
  if (s.autoOrder === 'random') {
    items = [...items];
    for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; }
  }
  auto.key = autoKey(s);
  auto.items = items;
  // 順番どおりのときは、前回止めた語から続ける
  const saved = s.autoOrder === 'random' ? '' : (s.autoPos || {})[auto.key];
  auto.pos = Math.max(0, items.findIndex((it) => it.id === saved));
}
const autoWait = (ms) => new Promise((ok) => setTimeout(ok, ms));
function stopAuto() {
  if (auto.playing) {
    auto.playing = false;
    auto.seq++;
    auto.phase = '';
    sp.stopSpeaking();
    flushStudy();
  }
  auto.wake?.release?.().catch(() => {});
  auto.wake = null;
  const it = auto.items[auto.pos];
  const s = settings();
  if (it && s.autoOrder !== 'random' && me() && (s.autoPos || {})[auto.key] !== it.id) {
    store.updateSettings(store.currentUid(), { autoPos: { ...(s.autoPos || {}), [auto.key]: it.id } });
  }
}
async function startAuto() {
  if (!auto.items.length) return;
  sp.primeSpeech(LANG.code);
  auto.playing = true;
  const seq = ++auto.seq;
  noteActivity();
  // 再生中は画面が暗くならないようにする（対応している端末のみ）
  navigator.wakeLock?.request('screen').then((w) => { if (seq === auto.seq) auto.wake = w; else w.release(); }).catch(() => {});
  const live = () => seq === auto.seq && auto.playing && ui.screen === 'autoplay';
  const s = settings();
  try {
    while (live()) {
      const it = auto.items[auto.pos];
      const lang = it.lang;
      auto.phase = 'fx';
      render();
      await say(sayText(it), lang, 2);
      if (!live()) return;
      await autoWait(AUTO_GAP_MS);
      if (!live()) return;
      auto.phase = 'ja';
      render();
      await sp.speak(it.ja, { lang: 'ja', rate: 1 });
      if (!live()) return;
      if (s.autoExample === 'read' && it.example) {
        await autoWait(AUTO_GAP_MS);
        if (!live()) return;
        auto.phase = 'ex';
        render();
        await say(it.example.text, lang);
        if (!live()) return;
        await autoWait(400);
        if (!live()) return;
        await sp.speak(it.example.ja, { lang: 'ja', rate: 1 });
        if (!live()) return;
      }
      auto.phase = '';
      render();
      await autoWait(AUTO_NEXT_MS);
      if (!live()) return;
      auto.pos = (auto.pos + 1) % auto.items.length; // 最後まで行ったら最初に戻って続ける
      noteActivity();
    }
  } catch (e) {
    if (seq !== auto.seq) return;
    stopAuto();
    render();
    toast(`音声を再生できませんでした。マナーモードや音量、${LANG.name}・日本語の声があるかを確認してください。`, 5000);
  }
}
function autoJump(step) {
  if (!auto.items.length) return;
  const wasPlaying = auto.playing;
  stopAuto();
  auto.pos = (auto.pos + step + auto.items.length) % auto.items.length;
  if (wasPlaying) startAuto();
  else render();
}

function screenAutoplay() {
  const s = settings();
  const cfg = homeCfg(s);
  if (auto.key !== autoKey(s)) {
    stopAuto();
    buildAuto();
  }
  const { opts, name } = scopeOptions(cfg.kind);
  const it = auto.items[auto.pos];
  const ph = auto.playing ? auto.phase : '';
  const card = it ? `
    <div class="auto-card">
      <div class="tags"><span class="tag">${KIND_LABEL[cfg.kind]}</span><span class="tag">${auto.pos + 1} / ${auto.items.length}</span></div>
      <div class="auto-fx ${ph === 'fx' ? 'now' : ''}" lang="${esc(it.lang)}">${esWithArticle(it)}</div>
      ${ipaLine(it)}
      <div class="auto-ja ${ph === 'ja' ? 'now' : ''}">${esc(it.ja)}</div>
      ${it.example ? `<div class="auto-ex ${ph === 'ex' ? 'now' : ''}">${exampleBlock(it)}</div>` : ''}
    </div>` : `<p class="muted center">この条件の${KIND_LABEL[cfg.kind]}がありません。範囲や対象を変えてください。</p>`;
  return `
  <section class="card auto">
    ${card}
    <div class="auto-controls">
      <button class="btn" data-action="auto-prev">⏮ 前へ</button>
      <button class="btn primary" data-action="auto-toggle">${auto.playing ? '⏸ 一時停止' : '▶ 再生'}</button>
      <button class="btn" data-action="auto-next">次へ ⏭</button>
    </div>
    <p class="muted small center">${LANG.name}を2回 → 日本語を1回読み、次へ進みます。最後まで行くと最初に戻ります。</p>
    <details class="auto-opts">
      <summary>再生の設定</summary>
      <label class="field-label">範囲</label>
      ${seg(name, cfg.scope, opts)}
      <label class="field-label">対象</label>
      ${seg('autoTarget', s.autoTarget, [['all', '全部'], ['unmastered', '未習得のみ']])}
      <label class="field-label">順番</label>
      ${seg('autoOrder', s.autoOrder, [['order', '順番どおり'], ['random', 'シャッフル']])}
      <label class="field-label">例文の読み上げ</label>
      ${seg('autoExample', s.autoExample, [['show', '表示だけ'], ['read', '例文も読む']])}
    </details>
  </section>`;
}

// ---------- 学習時間（問題の画面を開いている時間） ----------
// 1分以上なにも操作がないあいだは数えない（画面を開いたまま置いておいた時間を含めない）
const study = { start: 0, last: Date.now() };
const STUDY_IDLE_MS = 60 * 1000;
function studyActive() {
  return (ui.screen === 'quiz' || (ui.screen === 'autoplay' && auto.playing)) && document.visibilityState === 'visible' && !!me();
}
function flushStudy() {
  const now = Date.now();
  if (study.start && me()) {
    const ms = Math.max(0, Math.min(now, study.last + STUDY_IDLE_MS) - study.start);
    if (ms >= 1000) {
      const s = settings();
      const today = todayKey();
      const dayMs = s.studyDay && s.studyDay.date === today ? s.studyDay.ms : 0;
      store.updateSettings(store.currentUid(), { studyTotalMs: (s.studyTotalMs || 0) + ms, studyDay: { date: today, ms: dayMs + ms } });
    }
  }
  study.start = studyActive() ? now : 0;
}
function noteActivity() {
  const now = Date.now();
  if (study.start && now - study.last > STUDY_IDLE_MS) flushStudy(); // 休んでいた分は数えずに区切る
  study.last = now;
  if (!study.start && studyActive()) study.start = now;
}
['pointerdown', 'keydown', 'input'].forEach((ev) => document.addEventListener(ev, noteActivity, true));
setInterval(flushStudy, 30 * 1000);
function fmtDuration(ms) {
  const min = Math.floor((ms || 0) / 60000);
  if (min === 0 && ms > 0) return '1分未満';
  return min >= 60 ? `${Math.floor(min / 60)}時間${min % 60}分` : `${min}分`;
}

// ---------- アプリの更新 ----------
// いま動いている版（読み込んだ app.js の ?v=）と、公開中の index.html の版を比べ、新しければ「更新する」を出す
const APP_VERSION = new URL(import.meta.url).searchParams.get('v') || '';
const $update = document.getElementById('update-banner');
let latestVersion = '';
function renderUpdateBanner() {
  const show = !!latestVersion && ['home', 'users'].includes(ui.screen);
  $update.hidden = !show;
  if (show) $update.innerHTML = `<span>新しいバージョンがあります</span><button class="btn small primary" data-action="update-app" data-v="${esc(latestVersion)}">更新する</button>`;
}
async function checkForUpdate() {
  if (!APP_VERSION || !navigator.onLine) return;
  try {
    const html = await (await fetch(`./index.html?check=${Date.now()}`, { cache: 'no-store' })).text();
    const latest = (html.match(/js\/app\.js\?v=([\w.-]+)/) || [])[1];
    latestVersion = latest && latest !== APP_VERSION ? latest : '';
    renderUpdateBanner();
  } catch (e) { /* 通信できないときは次の機会に */ }
}
// 更新：ためていた記録を先に保存してから、最新の版を読み込み直す
async function updateApp(v = String(Date.now())) {
  flushStudy();
  toast('更新しています…');
  await store.syncNow().catch(() => {});
  location.replace(`./?v=${encodeURIComponent(v)}`);
}
setTimeout(checkForUpdate, 3000);
setInterval(checkForUpdate, 10 * 60 * 1000);

// ---------- 描画 ----------
const SCREENS = {
  users: screenUsers, home: screenHome, setup: screenSetup, quiz: screenQuiz, result: screenResult,
  list: screenList, phrases: screenPhrases, settings: screenSettings,
  passcode: screenPasscode, letters: screenLetters, autoplay: screenAutoplay,
};

function render() {
  setLang(settings().lang);
  // 保存先はクラウド。合言葉が入るまでは学習を始めない
  if (store.needsKey()) ui.screen = 'passcode';
  else if (ui.screen === 'passcode') ui.screen = me() ? 'home' : 'users';
  if (!me() && !['users', 'settings', 'passcode'].includes(ui.screen)) ui.screen = 'users';
  $main.innerHTML = SCREENS[ui.screen]();
  document.body.dataset.screen = ui.screen;
  renderHeader();
  renderSave();
  renderUpdateBanner();
  if (studyActive() !== !!study.start) flushStudy();
  ensureCountdown();
}

// 画面上部の固定バー：ホーム以外の画面では、アプリ名の代わりに「ホームへ戻る」ボタンを出す
function renderHeader() {
  document.title = `はじめの${LANG.name}`;
  if (['home', 'users', 'passcode'].includes(ui.screen)) { $brand.innerHTML = `<img class="brand-toma" src="img/toma.svg" alt="" width="26" height="34"><span>はじめの${LANG.name}</span>`; return; }
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
    patch[name] = ['setSize', 'choices', 'answerSeconds'].includes(name) ? Number(value) : name === 'rate' ? Number(value) : value;
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
    const same = sn && ['lang', 'kind', 'dir', 'presentation', 'answerMode', 'scope'].every((k) => sn.cfg?.[k] === cfg[k]);
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
  // その種類（子音・母音・声調記号）の文字だけのクイズ。設定は変えない
  'letter-quiz': (el) => {
    startSession({ ...homeCfg(), kind: 'letter', scope: el.dataset.value, target: 'all' }, 'normal');
  },
  'retry-missed': () => {
    sp.primeSpeech(LANG.code);
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
  'auto-open': () => {
    sp.primeSpeech(LANG.code);
    go('autoplay');
    startAuto();
  },
  'auto-toggle': () => {
    if (auto.playing) { stopAuto(); render(); } else startAuto();
  },
  'auto-prev': () => autoJump(-1),
  'auto-next': () => autoJump(1),
  play: (el) => {
    const it = getItem(el.dataset.id);
    say(sayText(it), it.lang).catch(() => toast(`音声を再生できませんでした。マナーモードや音量、${langOf(it).name}の声があるかを確認してください。`, 5000));
  },
  'update-app': (el) => updateApp(el.dataset.v),
  'play-ex': (el) => {
    const it = getItem(el.dataset.id);
    if (it?.example) say(it.example.text, it.lang).catch(() => toast('音声を再生できませんでした。', 4000));
  },
  'test-voice': () => {
    const sample = { th: 'สวัสดีครับ', en: 'Hello! How are you?', es: '¡Hola! ¿Cómo estás?' };
    say(sample[LANG.code] || sample.es, LANG.code).catch(() => toast('音声を再生できませんでした。', 4000));
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
    // 自分で判定したので、「ほぼ覚えた／まだ覚えていない」は聞かずに次の問題へ
    ui.q.rated = true;
    nextQuestion();
  },
  next: () => nextQuestion(),
  'home-nav': () => {
    if (ui.screen === 'quiz') return actions.quit();
    go(me() ? 'home' : 'users');
  },
  // 「習得済み」（回答する前に押す）：この問題の向きと「外国語→日本語（文字あり）」の両方を習得済みにして、
  // 覚えた単語に入れる。1問答えたものとして数え、次の問題へ進む
  'mark-mastered': () => {
    const q = ui.q;
    const u = me();
    const sn = u?.session;
    if (!q || q.answered || q.pending || !sn || sn.id !== q.sessionId || sn.pos !== q.index) return;
    q.answered = true;
    q.done = true;
    stopCountdown();
    sp.stopListening();
    sp.stopSpeaking();
    const { entry, item } = q;
    const key = stateKey(entry.kind, entry.id, entry.dir, entry.mode);
    for (const k of new Set([key, stateKey(entry.kind, entry.id, 'es-ja', 'text')])) {
      store.updateState(u.profile.user_id, k, applyMastered(u.states[k]));
    }
    sn.firstDone[key] = true;
    sn.answeredCount++;
    sn.log.push({ id: item.id, kind: item.kind, dir: entry.dir, result: 'correct', mastered: true });
    sn.pos++;
    store.saveSession(u.profile.user_id, sn);
    toast(`「${item.es}」を習得済みにしました`, 2000);
    nextQuestion();
  },
  // 単語リストの「習得済みにする／取り消す」（外国語→日本語（文字あり）の状態を変える）
  'list-mastered': (el) => {
    const u = me();
    const item = getItem(el.dataset.id);
    if (!u || !item) return;
    const key = stateKey(item.kind, item.id, 'es-ja', 'text');
    const next = el.dataset.value === 'off' ? applyNotYet(u.states[key]) : applyMastered(u.states[key]);
    store.updateState(u.profile.user_id, key, next);
    store.syncNow().catch(() => {});
    render();
  },
  // 回答後の自己評価。どちらを押しても次の問題へ進む
  rate: (el) => {
    const q = ui.q;
    if (!q || !q.done || q.rated) return;
    q.rated = true;
    if (el.dataset.value === 'notyet' && q.result === 'correct') {
      // 当てずっぽうで正解したときなど：習得には数えず、次の次の「今日の○問」で出し直す
      const u = me();
      const sn = u.session;
      const { entry } = q;
      const key = stateKey(entry.kind, entry.id, entry.dir, entry.mode);
      const notYet = applyNotYet(u.states[key]);
      notYet.retryAtSet = retrySetNo(entry);
      store.updateState(u.profile.user_id, key, notYet);
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
  'letter-cat': (el) => { ui.letterCat = el.dataset.value; render(); },
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
    restartCountdown(ui.q);
  }
});

document.addEventListener('change', (e) => {
  // 答えるまでの時間（iPhoneでは回転式のリールで選べる）
  if (e.target.dataset.change === 'answerSeconds') {
    store.updateSettings(store.currentUid(), { answerSeconds: Number(e.target.value) });
    toast(Number(e.target.value) ? `答えるまでの時間を${e.target.value}秒にしました` : '時間の制限をなくしました');
  }
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
    if (j.result === 'empty') { toast('答えを入力してください。'); return; }
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
  flushStudy(); // 学習時間：アプリを閉じたら区切り、戻ったら数え直す
  if (document.visibilityState === 'hidden') {
    sp.stopListening();
    if (auto.playing) { stopAuto(); render(); } // 画面を閉じたら自動再生は一時停止
    store.syncNow().catch(() => {});
    return;
  }
  checkForUpdate();
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
