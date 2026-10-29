// 保存：端末内（localStorage）＋ Googleスプレッドシート（Apps Script 経由）
// 端末内は一時的な保存・キャッシュ。クラウドを設定すると、回答と学習状態を送信し、
// サーバーの受け取り確認ができたものだけを「保存済み」と表示する。
import { APP_CONFIG } from '../config.js';
import { summarize, todayKey } from './learn.js';

const LS_KEY = 'svocab.v1';

export const DEFAULT_SETTINGS = {
  kind: 'word',
  dir: 'es-ja',
  answerMode: 'choice',
  presentation: 'text',
  scope: '1',
  phraseScope: 'all',
  target: 'all',
  setSize: 10,
  choices: 4,
  rate: 0.9,
  voiceURI: '',
  ipa: 'latam', // 発音記号：latam 中南米 / ar アルゼンチン / off 表示しない
  autoSpeak: 'on', // 回答したら発音を読み上げる
  sfx: 'on', // 正解のときに効果音を鳴らす
};

function fresh() {
  return {
    version: 1,
    deviceId: uid(),
    currentUid: '',
    users: {},
    outbox: { answers: [], states: {}, users: {} },
    remote: { url: APP_CONFIG.GAS_URL || '', key: '' },
    familyCache: null,
  };
}

export function uid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

let storageOk = true;
function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      const base = fresh();
      return { ...base, ...d, outbox: { ...base.outbox, ...(d.outbox || {}) }, remote: { ...base.remote, ...(d.remote || {}) } };
    }
  } catch (e) {
    storageOk = false;
  }
  return fresh();
}

const db = load();

function persist() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(db));
    storageOk = true;
  } catch (e) {
    storageOk = false;
  }
}

// ---------- 保存状態の通知 ----------
const listeners = new Set();
let syncState = { phase: 'idle', message: '' };
export function onStatus(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function emit() {
  const s = status();
  for (const cb of listeners) cb(s);
}
export function pendingCount() {
  const ob = db.outbox;
  return ob.answers.length + Object.values(ob.states).reduce((n, m) => n + Object.keys(m).length, 0) + Object.keys(ob.users).length;
}
export function status() {
  if (!remoteEnabled()) return { mode: 'local', phase: 'local', pending: 0, storageOk, message: '' };
  const pending = pendingCount();
  const phase = syncState.phase === 'saving' ? 'saving' : syncState.phase === 'error' ? 'error' : pending ? 'pending' : 'saved';
  return { mode: 'remote', phase, pending, storageOk, message: syncState.message };
}
export function storageAvailable() {
  return storageOk;
}

// ---------- クラウド接続 ----------
export function remoteEnabled() {
  return !!(db.remote.url && db.remote.key);
}
export function remoteConfig() {
  return { ...db.remote };
}
export function setRemote(url, key) {
  db.remote = { url: (url || '').trim(), key: (key || '').trim() };
  persist();
  emit();
}

async function call(action, payload = {}) {
  const res = await fetch(db.remote.url, {
    method: 'POST',
    // text/plain にすると事前確認（プリフライト）なしで Apps Script に送れる
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, key: db.remote.key, ...payload }),
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  let json;
  try {
    json = await res.json();
  } catch (e) {
    throw new Error('サーバーの応答を読み取れませんでした（Apps ScriptのURLや公開設定を確認してください）');
  }
  if (!json.ok) throw new Error(json.error || 'サーバーでエラーが発生しました');
  return json;
}

export async function testRemote(url, key) {
  const saved = db.remote;
  db.remote = { url, key };
  try {
    const r = await call('ping');
    return r;
  } finally {
    db.remote = saved;
  }
}

// ---------- 利用者 ----------
function blankUser(profile) {
  return {
    profile,
    settings: { ...DEFAULT_SETTINGS },
    settingsUpdatedAt: 0,
    states: {},
    session: null,
    sessionUpdatedAt: 0,
    today: { date: '', sets: 0 },
    pulledAt: 0,
  };
}

export function users() {
  return Object.values(db.users)
    .map((u) => u.profile)
    .sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
}
export function user(id = db.currentUid) {
  return db.users[id] || null;
}
export function currentUid() {
  return db.users[db.currentUid] ? db.currentUid : '';
}

// サーバーに登録済みの家族一覧を取り込む（記録は利用者を選んだときに読み込む）
export async function refreshUsers() {
  if (!remoteEnabled()) return users();
  const r = await call('listUsers');
  const known = new Set(r.users.map((p) => p.user_id));
  for (const p of r.users) {
    if (!db.users[p.user_id]) db.users[p.user_id] = blankUser(p);
    else db.users[p.user_id].profile = { ...db.users[p.user_id].profile, ...p };
  }
  // クラウドにつなぐ前にこの端末で登録した人は、同じIDのままクラウドにも登録して記録を引き継ぐ
  for (const u of Object.values(db.users)) {
    if (known.has(u.profile.user_id)) continue;
    await call('createUser', { user: u.profile });
    markUser(u.profile.user_id);
    const keys = Object.keys(u.states);
    if (keys.length) db.outbox.states[u.profile.user_id] = Object.fromEntries(keys.map((k) => [k, true]));
  }
  persist();
  return users();
}

export function nameTaken(name) {
  const n = name.trim();
  return users().some((p) => p.display_name.trim() === n);
}

export async function createUser(displayName) {
  const profile = { user_id: uid(), display_name: displayName.trim(), created_at: new Date().toISOString() };
  if (remoteEnabled()) {
    const r = await call('createUser', { user: profile });
    Object.assign(profile, r.user);
  }
  db.users[profile.user_id] = blankUser(profile);
  db.currentUid = profile.user_id;
  persist();
  emit();
  return profile;
}

export async function selectUser(id) {
  db.currentUid = id;
  persist();
  if (remoteEnabled()) await pullUser(id);
  emit();
}

export function signOut() {
  db.currentUid = '';
  persist();
}

// 別の端末の記録をサーバーから読み込み、新しい方を残す
export async function pullUser(id) {
  const r = await call('getUserData', { user_id: id });
  const u = db.users[id] || (db.users[id] = blankUser(r.profile));
  u.profile = { ...u.profile, ...r.profile };
  const dirty = db.outbox.states[id] || {};
  for (const [key, s] of Object.entries(r.states || {})) {
    const local = u.states[key];
    if (!local || (!dirty[key] && (s.updatedAt || 0) >= (local.updatedAt || 0)) || (s.updatedAt || 0) > (local.updatedAt || 0)) {
      u.states[key] = s;
    }
  }
  if (r.settings && (r.settingsUpdatedAt || 0) > (u.settingsUpdatedAt || 0)) {
    u.settings = { ...DEFAULT_SETTINGS, ...r.settings };
    u.settingsUpdatedAt = r.settingsUpdatedAt;
  }
  if ((r.sessionUpdatedAt || 0) > (u.sessionUpdatedAt || 0)) {
    u.session = r.session || null;
    u.sessionUpdatedAt = r.sessionUpdatedAt;
  }
  if (r.today && (!u.today || r.today.date > u.today.date || (r.today.date === u.today.date && r.today.sets > u.today.sets))) {
    u.today = r.today;
  }
  u.pulledAt = Date.now();
  persist();
}

// ---------- 書き込み ----------
function markUser(id) {
  db.outbox.users[id] = true;
}

export function updateSettings(id, patch) {
  const u = db.users[id];
  u.settings = { ...u.settings, ...patch };
  u.settingsUpdatedAt = Date.now();
  markUser(id);
  persist();
  scheduleSync();
}

export function saveSession(id, session) {
  const u = db.users[id];
  u.session = session;
  u.sessionUpdatedAt = Date.now();
  markUser(id);
  persist();
  scheduleSync();
}

export function addTodaySet(id, date) {
  const u = db.users[id];
  u.today = u.today && u.today.date === date ? { date, sets: u.today.sets + 1 } : { date, sets: 1 };
  markUser(id);
  persist();
}

// 回答1件と、それによって変わった学習状態をまとめて保存する
export function recordAnswer(id, answer, key, state) {
  const u = db.users[id];
  u.states[key] = state;
  db.outbox.answers.push(answer);
  // クラウド未接続のあいだは回答履歴を直近の分だけ持っておく（接続したときにまとめて送る）
  if (!remoteEnabled() && db.outbox.answers.length > 3000) db.outbox.answers.splice(0, db.outbox.answers.length - 3000);
  (db.outbox.states[id] ||= {})[key] = true;
  persist();
  scheduleSync();
}

// ---------- 送信 ----------
let timer = null;
let running = null;
let retryDelay = 3000;

export function scheduleSync(delay = 1500) {
  if (!remoteEnabled()) return;
  emit();
  clearTimeout(timer);
  timer = setTimeout(() => { syncNow().catch(() => {}); }, delay);
}

export async function syncNow() {
  if (!remoteEnabled()) return;
  if (running) return running;
  if (!pendingCount()) { syncState = { phase: 'idle', message: '' }; emit(); return; }
  running = (async () => {
    syncState = { phase: 'saving', message: '' };
    emit();
    try {
      // 利用者ごとにまとめて送る（サーバー側で利用者IDが家族に登録済みか確認される）
      const ids = new Set([...db.outbox.answers.map((a) => a.user_id), ...Object.keys(db.outbox.states), ...Object.keys(db.outbox.users)]);
      for (const id of ids) {
        const u = db.users[id];
        if (!u) continue;
        const answers = db.outbox.answers.filter((a) => a.user_id === id);
        const keys = Object.keys(db.outbox.states[id] || {});
        const states = keys.map((k) => ({ key: k, ...u.states[k] }));
        const sendUser = !!db.outbox.users[id];
        await call('sync', {
          user_id: id,
          answers,
          states,
          profile: {
            settings: u.settings,
            settingsUpdatedAt: u.settingsUpdatedAt,
            session: u.session,
            sessionUpdatedAt: u.sessionUpdatedAt,
            today: u.today,
            // 家族画面はこの集計を表示する（本人のホームと同じ計算で、数字を一致させる）
            summary: { ...summarize(u.states), date: todayKey() },
          },
        });
        // 受け取り確認ができたものだけ送信待ちから外す（送信中に増えた分は残す）
        const sentIds = new Set(answers.map((a) => a.answer_id));
        db.outbox.answers = db.outbox.answers.filter((a) => !sentIds.has(a.answer_id));
        const st = db.outbox.states[id] || {};
        for (const k of keys) if (u.states[k] && states.find((s) => s.key === k).updatedAt === u.states[k].updatedAt) delete st[k];
        if (!Object.keys(st).length) delete db.outbox.states[id];
        if (sendUser) delete db.outbox.users[id];
        persist();
      }
      syncState = { phase: 'idle', message: '' };
      retryDelay = 3000;
    } catch (e) {
      syncState = { phase: 'error', message: e.message || String(e) };
      // 少しずつ間隔を空けて自動で再試行する
      clearTimeout(timer);
      timer = setTimeout(() => { syncNow().catch(() => {}); }, retryDelay);
      retryDelay = Math.min(retryDelay * 2, 60000);
      throw e;
    } finally {
      running = null;
      emit();
    }
  })();
  return running;
}

// ---------- 家族の学習状況 ----------
export async function familySummary() {
  if (remoteEnabled()) {
    const r = await call('familySummary');
    db.familyCache = { at: Date.now(), list: r.users };
    persist();
    return { source: 'remote', list: r.users };
  }
  const list = users().map((p) => ({ ...p, summary: { ...summarize(db.users[p.user_id].states), date: todayKey() } }));
  return { source: 'local', list };
}

export function cachedFamily() {
  return db.familyCache;
}

// バックアップ用：この端末に保存している記録を書き出す
export function exportData() {
  return JSON.stringify({ exportedAt: new Date().toISOString(), users: db.users }, null, 1);
}

window.addEventListener('online', () => scheduleSync(500));
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') syncNow().catch(() => {});
});
