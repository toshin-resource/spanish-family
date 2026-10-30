// 学習ロジック：判定・選択肢・復習スケジュール・出題セット・集計
import { WORDS as ES_WORDS, WORD_STAGES as ES_STAGES } from './data-words.js';
import { PHRASES as ES_PHRASES, PHRASE_CATEGORIES } from './data-phrases.js';
import { THAI_WORDS, THAI_PHRASES, THAI_WORD_STAGES, THAI_LETTERS, LETTER_CATEGORIES } from './data-thai.js';

// 学習できる言語。項目（単語・フレーズ）の id は言語ごとに別なので、学習記録が混ざらない
export const LANGS = {
  es: { code: 'es', name: 'スペイン語', short: '西', words: ES_WORDS, phrases: ES_PHRASES, stages: ES_STAGES, letters: [] },
  th: { code: 'th', name: 'タイ語', short: 'タイ', words: THAI_WORDS, phrases: THAI_PHRASES, stages: THAI_WORD_STAGES, letters: THAI_LETTERS },
};

// いま選んでいる言語。WORDS などは setLang で切り替わる（読み込んだ側にも最新の値が見える）
export let LANG = LANGS.es;
export let WORDS = ES_WORDS;
export let PHRASES = ES_PHRASES;
export let WORD_STAGES = ES_STAGES;
export function setLang(code) {
  LANG = LANGS[code] || LANGS.es;
  WORDS = LANG.words;
  PHRASES = LANG.phrases;
  WORD_STAGES = LANG.stages;
}
export const langOf = (item) => LANGS[item?.lang] || LANG;

// 変更しやすい初期値（仕様書で「暫定」とされている値）
export const RULES = {
  masteryStreak: 3, // 習得済みとする連続正解数（1回の学習につき1回まで数える）
  intervalsDays: [1, 3, 7, 14, 30, 60, 120], // 正解が続いたときの次回復習までの日数
  requeueGap: 3, // 「わからない」・不正解の後、何問挟んで再出題するか
  maxRetriesPerItem: 2, // 1回の学習で同じ問題を再出題する上限（無限ループ防止）
};

export { PHRASE_CATEGORIES, LETTER_CATEGORIES };

const BY_ID = new Map(Object.values(LANGS).flatMap((l) => [...l.words, ...l.phrases, ...l.letters]).map((it) => [it.id, it]));
export const getItem = (id) => BY_ID.get(id);
// lang を省略すると、いま選んでいる言語
export const itemsOf = (kind, lang = LANG.code) => {
  const l = LANGS[lang] || LANG;
  if (kind === 'letter') return l.letters; // 文字（いまはタイ語だけ）
  return kind === 'phrase' ? l.phrases : l.words;
};

// ---------- 日付（日本時間） ----------
const JST = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' });
export function todayKey(date = new Date()) {
  return JST.format(date); // YYYY-MM-DD
}
export function addDays(key, n) {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function stateKey(kind, id, dir, mode) {
  return `${kind}:${id}:${dir}:${mode}`;
}
export function parseKey(key) {
  const [kind, id, dir, mode] = key.split(':');
  return { kind, id, dir, mode };
}

// ---------- 文字の正規化と判定 ----------
export function normalize(s) {
  let t = String(s || '').normalize('NFKC').toLowerCase();
  t = t.replace(/[（(][^）)]*[）)]/g, '');
  t = t.replace(/[\s～〜~…\.、。，,！!？?・「」『』"'¡¿:：;；\-－]/g, '');
  // カタカナ→ひらがな（長音「ー」はそのまま）
  t = t.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  return t;
}

// 「です」「だ」などの語尾の違いは意味に影響しないので揃える
function variants(s) {
  const n = normalize(s);
  const out = new Set([n]);
  for (const end of ['です', 'だ', 'ます']) {
    if (n.length > end.length && n.endsWith(end)) out.add(n.slice(0, -end.length));
  }
  return out;
}

function answerSet(item) {
  const set = new Set();
  for (const a of item.accepted) for (const v of variants(a)) if (v) set.add(v);
  return set;
}
const ANSWER_SETS = new Map([...BY_ID.values()].map((it) => [it.id, answerSet(it)]));

function overlaps(a, b) {
  const A = ANSWER_SETS.get(a.id);
  for (const v of ANSWER_SETS.get(b.id)) if (A.has(v)) return true;
  return false;
}

function bigrams(s) {
  const out = [];
  for (let i = 0; i < s.length - 1; i++) out.push(s.slice(i, i + 2));
  return out;
}
function dice(a, b) {
  const A = bigrams(a);
  const B = bigrams(b);
  if (!A.length || !B.length) return 0;
  const counts = new Map();
  for (const g of A) counts.set(g, (counts.get(g) || 0) + 1);
  let hit = 0;
  for (const g of B) {
    const c = counts.get(g);
    if (c) { hit++; counts.set(g, c - 1); }
  }
  return (2 * hit) / (A.length + B.length);
}

// 日本語の自由入力を判定する。
// 戻り値 result: correct（自動で正解）/ wrong（別の語の意味と一致）/ pending（自動では判断できない＝確認待ち）/ empty
export function judgeInput(item, text) {
  const answers = variants(text);
  const ok = ANSWER_SETS.get(item.id);
  for (const v of answers) if (ok.has(v)) return { result: 'correct' };
  const n = normalize(text);
  if (!n) return { result: 'empty' };

  // フレーズは言い回しの違いがあるので、十分に近い答えも正解にする
  if (item.kind === 'phrase' && n.length >= 3) {
    for (const a of ok) if (dice(n, a) >= 0.75) return { result: 'correct' };
  }

  // 他の語の意味と一致し、この語の意味とは重ならない → 不正解（どの語の意味かを示す）
  for (const other of itemsOf(item.kind, item.lang)) {
    if (other.id === item.id || overlaps(item, other)) continue;
    const set = ANSWER_SETS.get(other.id);
    for (const v of answers) if (set.has(v)) return { result: 'wrong', matched: other };
  }
  return { result: 'pending' };
}

// ---------- 選択肢 ----------
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function labelFor(item, dir) {
  return dir === 'es-ja' ? item.ja : item.es;
}

// 正解と同じ意味・同じ表記の候補は誤答に入れない
export function buildChoices(item, dir, count = 4) {
  const label = (it) => normalize(labelFor(it, dir));
  const used = new Set([label(item)]);
  const pool = shuffle(itemsOf(item.kind, item.lang)).filter((o) => {
    if (o.id === item.id) return false;
    if (item.similarGroup && o.similarGroup === item.similarGroup) return false;
    if (overlaps(item, o)) return false;
    if (normalize(o.es) === normalize(item.es)) return false;
    return true;
  });
  const score = (o) => (o.pos && o.pos === item.pos ? 2 : 0) + (o.category === item.category ? 1 : 0);
  pool.sort((a, b) => score(b) - score(a));
  const near = shuffle(pool.slice(0, Math.max(12, count * 4)));
  const picked = [item];
  for (const o of [...near, ...pool]) {
    if (picked.length >= count) break;
    const l = label(o);
    if (used.has(l)) continue;
    used.add(l);
    picked.push(o);
  }
  return shuffle(picked);
}

// ---------- 学習状態と復習スケジュール ----------
export function newState() {
  return {
    status: 'new', // new 未学習 / learning 学習中 / mastered 習得済み
    correct: 0,
    incorrect: 0,
    unknown: 0,
    streak: 0,
    step: 0,
    next: '', // 次回の復習日（日本時間 YYYY-MM-DD）
    lastSession: '',
    lastAt: 0,
    lastDay: '',
    lastStepDay: '',
    updatedAt: 0,
  };
}

// result: correct / wrong / unknown
// firstInSession: この学習回で初めての回答か（直後の再出題での正解は習得判定に数えない）
export function applyResult(prev, result, { sessionId, firstInSession, today = todayKey(), now = Date.now() }) {
  const s = { ...(prev || newState()) };
  if (result === 'correct') {
    s.correct++;
    if (firstInSession) {
      s.streak++;
      if (s.lastStepDay !== today) {
        s.step = Math.min(s.step + 1, RULES.intervalsDays.length);
        s.lastStepDay = today;
      }
      s.next = addDays(today, RULES.intervalsDays[Math.max(s.step, 1) - 1]);
      s.status = s.streak >= RULES.masteryStreak ? 'mastered' : 'learning';
    } else if (s.status === 'new') {
      s.status = 'learning';
    }
  } else {
    if (result === 'unknown') s.unknown++;
    else s.incorrect++;
    s.streak = 0;
    s.step = 0;
    s.lastStepDay = today;
    s.next = addDays(today, 1);
    s.status = 'learning';
  }
  s.lastSession = sessionId;
  s.lastAt = now;
  s.lastDay = today;
  s.updatedAt = now;
  return s;
}

// 正解したが本人が「まだ覚えていない」と答えたとき：習得には数えず、翌日に復習へ戻す
export function applyNotYet(prev, { today = todayKey(), now = Date.now() } = {}) {
  return {
    ...(prev || newState()),
    status: 'learning',
    streak: 0,
    step: 0,
    lastStepDay: today,
    next: addDays(today, 1),
    updatedAt: now,
  };
}

export function isDue(state, today = todayKey()) {
  return !!(state && state.next && state.next <= today);
}

// ---------- 出題セット ----------
// cfg: { kind, dir: es-ja|ja-es|mix, answerMode: choice|input, presentation: text|listen, scope, target: all|unmastered|review, count }
export function effectiveMode(cfg) {
  const presentation = cfg.presentation === 'listen' ? 'listen' : 'text';
  const dir = presentation === 'listen' ? 'es-ja' : cfg.dir;
  // 学習する言語での自由入力は未対応のため、日本語→外国語とミックスは選択式にする。文字の学習も選択式
  const answerMode = dir === 'es-ja' && cfg.kind !== 'letter' ? cfg.answerMode : 'choice';
  return { presentation, dir, answerMode };
}

export function scopeItems(kind, scope, lang) {
  const all = itemsOf(kind, lang);
  if (!scope || scope === 'all') return all;
  if (kind === 'word') return all.filter((w) => String(w.stage) === String(scope));
  return all.filter((p) => p.category === scope);
}

function dirsFor(dir) {
  return dir === 'mix' ? ['es-ja', 'ja-es'] : [dir];
}

// 復習期限が来ている問題（期限切れの古いものから）
export function dueEntries(states, cfg, today = todayKey()) {
  const { presentation, dir } = effectiveMode(cfg);
  const out = [];
  for (const item of scopeItems(cfg.kind, cfg.scope, cfg.lang)) {
    for (const d of dirsFor(dir)) {
      const st = states[stateKey(item.kind, item.id, d, presentation)];
      if (isDue(st, today)) out.push({ item, dir: d, next: st.next, status: st.status });
    }
  }
  out.sort((a, b) => (a.next < b.next ? -1 : a.next > b.next ? 1 : a.item.order - b.item.order));
  // ミックスで同じ語が両方向とも期限の場合は1つにまとめる
  const seen = new Set();
  return out.filter((e) => (seen.has(e.item.id) ? false : (seen.add(e.item.id), true)));
}

export function buildQueue(states, cfg, { today = todayKey(), todaySet = false } = {}) {
  const { presentation, dir, answerMode } = effectiveMode(cfg);
  const count = Math.max(1, cfg.count || 10);
  const items = scopeItems(cfg.kind, cfg.scope, cfg.lang);
  const st = (item, d) => states[stateKey(item.kind, item.id, d, presentation)];
  const pickDir = () => (dir === 'mix' ? (Math.random() < 0.5 ? 'es-ja' : 'ja-es') : dir);
  const chosen = [];
  const used = new Set();
  const add = (item, d) => {
    if (chosen.length >= count || used.has(item.id)) return;
    used.add(item.id);
    chosen.push({ kind: item.kind, id: item.id, dir: d });
  };

  let due = dueEntries(states, cfg, today);
  if (cfg.target === 'unmastered') due = due.filter((e) => e.status !== 'mastered');
  for (const e of due) add(e.item, e.dir);

  if (cfg.target !== 'review') {
    // 新しい問題：学習順（＝日常でよく使う順）
    for (const item of items) {
      const d = pickDir();
      const isNew = dirsFor(dir).every((dd) => !st(item, dd) || st(item, dd).status === 'new');
      if (isNew) add(item, d);
    }
    if (!todaySet) {
      // 通常の学習では、まだ足りなければ期限前の学習中の語、次に習得済みの語で補う
      const rest = items
        .map((item) => {
          const d = pickDir();
          return { item, d, s: st(item, d) };
        })
        .filter((e) => e.s && e.s.status !== 'new');
      const learning = rest.filter((e) => e.s.status === 'learning').sort((a, b) => (a.s.next < b.s.next ? -1 : 1));
      for (const e of learning) add(e.item, e.d);
      if (cfg.target !== 'unmastered') {
        for (const e of rest.filter((x) => x.s.status === 'mastered')) add(e.item, e.d);
      }
    }
  }
  return chosen.map((c) => ({ ...c, mode: presentation, answerMode }));
}

// ---------- 集計（ホーム画面とスプレッドシートの集計欄で同じ定義を使う） ----------
// 覚えた単語数 = スペイン語→日本語（文字あり）で習得済みの、異なる単語IDの数
export function summarize(states, today = todayKey()) {
  const sets = {
    words: new Set(), wordsJaEs: new Set(), wordsListen: new Set(), phrases: new Set(), letters: new Set(),
    todayWords: new Set(), todayPhrases: new Set(),
  };
  let lastDay = '';
  let answers = 0;
  for (const [key, s] of Object.entries(states || {})) {
    const { kind, id, dir, mode } = parseKey(key);
    if (getItem(id)?.lang !== LANG.code) continue; // いま選んでいる言語の記録だけを数える
    answers += (s.correct || 0) + (s.incorrect || 0) + (s.unknown || 0);
    if (s.lastDay && s.lastDay > lastDay) lastDay = s.lastDay;
    if (s.lastDay === today) (kind === 'word' ? sets.todayWords : sets.todayPhrases).add(id);
    if (s.status !== 'mastered') continue;
    if (kind === 'word') {
      if (mode === 'listen') sets.wordsListen.add(id);
      else if (dir === 'es-ja') sets.words.add(id);
      else sets.wordsJaEs.add(id);
    } else if (kind === 'phrase' && dir === 'es-ja' && mode === 'text') {
      sets.phrases.add(id);
    } else if (kind === 'letter' && dir === 'es-ja' && mode === 'text') {
      sets.letters.add(id);
    }
  }
  const stageProgress = WORD_STAGES.map((stg) => ({
    ...stg,
    total: WORDS.filter((w) => w.stage === stg.id).length,
    mastered: WORDS.filter((w) => w.stage === stg.id && sets.words.has(w.id)).length,
  }));
  const current = stageProgress.find((s) => s.mastered < s.total) || stageProgress[stageProgress.length - 1];
  return {
    masteredWords: sets.words.size,
    masteredWordsJaEs: sets.wordsJaEs.size,
    masteredWordsListen: sets.wordsListen.size,
    masteredPhrases: sets.phrases.size,
    masteredLetters: sets.letters.size,
    todayWords: sets.todayWords.size,
    todayPhrases: sets.todayPhrases.size,
    lastDay,
    answers,
    stage: current,
    stageProgress,
    totalWords: WORDS.length,
    totalPhrases: PHRASES.length,
    totalLetters: LANG.letters.length,
  };
}

// 単語リスト用：その語の状態（スペイン語→日本語・文字ありを基準）
export function itemStatus(states, item, dir = 'es-ja', mode = 'text') {
  const s = states[stateKey(item.kind, item.id, dir, mode)];
  return s ? s.status : 'new';
}
