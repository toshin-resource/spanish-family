/** @OnlyCurrentDoc  このスクリプトが触れるのは、このスプレッドシートだけ（他のファイルへの権限は求めない） */

/**
 * 家族のスペイン語 — 記録保存用サーバー（Google Apps Script）
 *
 * このスクリプトは、記録用のGoogleスプレッドシートに「拡張機能 → Apps Script」から作成して使う。
 * 手順は README.md の「クラウド保存の準備」を参照。
 *
 * - 標準は合言葉なし。enableFamilyKey で合言葉（スクリプト プロパティ FAMILY_KEY）を付けると、知っている人だけが読み書きできる。
 * - スプレッドシート自体は公開しない。このスクリプト経由で必要な情報だけを返す。
 * - 同時に書き込んでも上書きし合わないよう、書き込みはロックをかけて1件ずつ処理する。
 */

var SHEETS = {
  users: ['user_id', 'display_name', 'created_at', 'settings_json', 'settings_updated_at', 'session_json',
    'session_updated_at', 'today_json', 'summary_json', 'updated_at'],
  progress: ['user_id', 'key', 'kind', 'item_id', 'direction', 'mode', 'status', 'correct', 'incorrect', 'unknown',
    'streak', 'step', 'next_review', 'last_session', 'last_at', 'last_day', 'last_step_day', 'updated_at', 'retry_at_set'],
  answers: ['answer_id', 'user_id', 'kind', 'item_id', 'direction', 'mode', 'session_id', 'answer_mode',
    'input_method', 'result', 'judged_by', 'answer_text', 'answered_at', 'received_at'],
};

// 最初に一度だけ、エディタ上部の関数選択で「setup」を選んで実行する
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SHEETS).forEach(function (name) {
    var sh = ss.getSheetByName(name) || ss.insertSheet(name);
    // 日付などが自動変換されないよう、すべて書式なしテキストにする
    sh.getRange(1, 1, sh.getMaxRows(), SHEETS[name].length).setNumberFormat('@');
    sh.getRange(1, 1, 1, SHEETS[name].length).setValues([SHEETS[name]]).setFontWeight('bold');
    sh.setFrozenRows(1);
  });
  Logger.log('準備ができました。合言葉なしで使えます（合言葉を付けたいときは関数「enableFamilyKey」を実行）。');
}

// 利用者と学習記録をすべて消して、最初からやり直す（エディタから実行する。アプリからは呼べない）
// 消した内容は、スプレッドシートの「ファイル → 変更履歴」から戻せる
function resetAllData() {
  Object.keys(SHEETS).forEach(function (name) {
    var sh = sheet(name);
    var last = sh.getLastRow();
    if (last >= 2) sh.getRange(2, 1, last - 1, SHEETS[name].length).clearContent();
  });
  Logger.log('利用者と学習記録をすべて消しました。');
}

// 合言葉を付けたくなったときに実行する。アプリでは最初に合言葉の入力画面が出るようになる
function enableFamilyKey() {
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('FAMILY_KEY')) props.setProperty('FAMILY_KEY', makeFamilyKey());
  showFamilyKey();
}

// 合言葉をやめて、合言葉なしで使えるようにする
function disableFamilyKey() {
  PropertiesService.getScriptProperties().deleteProperty('FAMILY_KEY');
  Logger.log('合言葉をなくしました。合言葉なしで使えます。');
}

// 家族の合言葉を表示する（アプリの「設定」→「クラウド保存」に入力する）
function showFamilyKey() {
  Logger.log('家族の合言葉：' + (PropertiesService.getScriptProperties().getProperty('FAMILY_KEY') || '（設定なし）'));
}

// iPhoneでも入力しやすいよう、紛らわしい文字（0/o、1/l など）を除いた小文字と数字で作る
function makeFamilyKey() {
  var chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  var groups = [];
  for (var g = 0; g < 4; g++) {
    var s = '';
    for (var i = 0; i < 4; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
    groups.push(s);
  }
  return groups.join('-');
}

function doGet() {
  return out({ ok: true, message: '家族のスペイン語：記録保存サーバーは動いています。アプリの設定画面にこのURLを入力してください。' });
}

function doPost(e) {
  var req;
  try {
    req = JSON.parse(e.postData.contents);
  } catch (err) {
    return out({ ok: false, error: 'リクエストを読み取れませんでした' });
  }
  // 合言葉（FAMILY_KEY）を設定したときだけ確認する。設定がなければ合言葉なしで使える
  var familyKey = PropertiesService.getScriptProperties().getProperty('FAMILY_KEY');
  if (familyKey && String(req.key || '') !== familyKey) {
    Utilities.sleep(800); // 総当たりを遅くする
    return out({ ok: false, error: '合言葉が違います' });
  }
  try {
    switch (req.action) {
      case 'ping': return out({ ok: true });
      case 'listUsers': return out({ ok: true, users: listUsers() });
      case 'createUser': return out(withLock(function () { return { ok: true, user: createUser(req.user) }; }));
      case 'getUserData': return out(getUserData(req.user_id));
      case 'sync': return out(withLock(function () { return sync(req); }));
      case 'familySummary': return out({ ok: true, users: familySummary() });
      default: return out({ ok: false, error: '不明な操作です' });
    }
  } catch (err) {
    return out({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

// ---------- 共通 ----------
function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function withLock(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function sheet(name) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh) throw new Error('シート「' + name + '」がありません。setup を実行してください。');
  return sh;
}

function rows(name) {
  var sh = sheet(name);
  var last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, 1, last - 1, SHEETS[name].length).getValues();
}

function toObj(name, row) {
  var o = {};
  SHEETS[name].forEach(function (h, i) { o[h] = row[i]; });
  return o;
}

function parseJson(s, fallback) {
  if (!s) return fallback;
  try { return JSON.parse(s); } catch (e) { return fallback; }
}

function findUserRow(userId) {
  var data = rows('users');
  for (var i = 0; i < data.length; i++) {
    if (String(data[i][0]) === String(userId)) return { index: i + 2, user: toObj('users', data[i]) };
  }
  return null;
}

// 外部から渡された利用者IDをそのまま信用せず、家族として登録済みかを確認する
function requireUser(userId) {
  var found = findUserRow(userId);
  if (!found) throw new Error('この利用者は登録されていません');
  return found;
}

// ---------- 利用者 ----------
function listUsers() {
  return rows('users').map(function (r) {
    var u = toObj('users', r);
    return { user_id: String(u.user_id), display_name: String(u.display_name), created_at: String(u.created_at) };
  });
}

function createUser(user) {
  if (!user || !/^[0-9a-f-]{36}$/i.test(String(user.user_id))) throw new Error('利用者IDが正しくありません');
  var name = String(user.display_name || '').trim().slice(0, 20);
  if (!name) throw new Error('名前を入力してください');
  if (findUserRow(user.user_id)) throw new Error('同じIDの利用者がすでにいます');
  var now = new Date().toISOString();
  var created = String(user.created_at || now);
  sheet('users').appendRow([String(user.user_id), name, created, '', '0', '', '0', '', '', now]);
  return { user_id: String(user.user_id), display_name: name, created_at: created };
}

function getUserData(userId) {
  var found = requireUser(userId);
  var u = found.user;
  var states = {};
  rows('progress').forEach(function (r) {
    if (String(r[0]) !== String(userId)) return;
    var p = toObj('progress', r);
    states[String(p.key)] = {
      status: String(p.status),
      correct: Number(p.correct) || 0,
      incorrect: Number(p.incorrect) || 0,
      unknown: Number(p.unknown) || 0,
      streak: Number(p.streak) || 0,
      step: Number(p.step) || 0,
      next: String(p.next_review || ''),
      lastSession: String(p.last_session || ''),
      lastAt: Number(p.last_at) || 0,
      lastDay: String(p.last_day || ''),
      lastStepDay: String(p.last_step_day || ''),
      updatedAt: Number(p.updated_at) || 0,
      retryAtSet: Number(p.retry_at_set) || 0,
    };
  });
  return {
    ok: true,
    profile: { user_id: String(u.user_id), display_name: String(u.display_name), created_at: String(u.created_at) },
    states: states,
    settings: parseJson(u.settings_json, null),
    settingsUpdatedAt: Number(u.settings_updated_at) || 0,
    session: parseJson(u.session_json, null),
    sessionUpdatedAt: Number(u.session_updated_at) || 0,
    today: parseJson(u.today_json, null),
  };
}

// ---------- 保存 ----------
var STATUS_OK = { 'new': 1, learning: 1, mastered: 1 };
var RESULT_OK = { correct: 1, wrong: 1, unknown: 1 };

function sync(req) {
  var found = requireUser(req.user_id);
  var userId = String(req.user_id);
  var now = new Date().toISOString();

  // 学習状態：新しいもの（updatedAt が大きい方）で上書き。再送しても結果は同じ。
  var states = (req.states || []).filter(function (s) {
    return s && typeof s.key === 'string' && s.key.split(':').length === 4 && STATUS_OK[s.status];
  });
  if (states.length) {
    var sh = sheet('progress');
    var data = rows('progress');
    var index = {};
    data.forEach(function (r, i) { if (String(r[0]) === userId) index[String(r[1])] = { row: i + 2, updated: Number(r[17]) || 0 }; });
    var appendRows = [];
    states.forEach(function (s) {
      var parts = s.key.split(':');
      var row = [userId, s.key, parts[0], parts[1], parts[2], parts[3], s.status,
        String(s.correct || 0), String(s.incorrect || 0), String(s.unknown || 0), String(s.streak || 0), String(s.step || 0),
        String(s.next || ''), String(s.lastSession || ''), String(s.lastAt || 0), String(s.lastDay || ''),
        String(s.lastStepDay || ''), String(s.updatedAt || 0), String(s.retryAtSet || 0)];
      var existing = index[s.key];
      if (!existing) {
        appendRows.push(row);
        index[s.key] = { row: -1, updated: Number(s.updatedAt) || 0 };
      } else if ((Number(s.updatedAt) || 0) >= existing.updated && existing.row > 0) {
        sh.getRange(existing.row, 1, 1, row.length).setValues([row]);
      }
    });
    if (appendRows.length) {
      var start = sh.getLastRow() + 1;
      sh.getRange(start, 1, appendRows.length, appendRows[0].length).setNumberFormat('@').setValues(appendRows);
    }
  }

  // 回答履歴：回答IDが既にあるものは追加しない（通信の再試行で二重にならないように）
  var answers = (req.answers || []).filter(function (a) {
    return a && a.answer_id && String(a.user_id) === userId && RESULT_OK[a.result];
  });
  if (answers.length) {
    var ash = sheet('answers');
    var last = ash.getLastRow();
    var seen = {};
    if (last >= 2) {
      var from = Math.max(2, last - 3000);
      ash.getRange(from, 1, last - from + 1, 1).getValues().forEach(function (r) { seen[String(r[0])] = 1; });
    }
    var add = answers.filter(function (a) { return !seen[String(a.answer_id)]; }).map(function (a) {
      return [String(a.answer_id), userId, String(a.kind), String(a.item_id), String(a.direction), String(a.mode),
        String(a.session_id), String(a.answer_mode), String(a.input_method), String(a.result), String(a.judged_by),
        String(a.answer_text || '').slice(0, 200), String(a.answered_at), now];
    });
    if (add.length) {
      ash.getRange(ash.getLastRow() + 1, 1, add.length, add[0].length).setNumberFormat('@').setValues(add);
    }
  }

  // 設定・学習セットの続き・家族画面用の集計
  var p = req.profile;
  if (p) {
    var ush = sheet('users');
    var u = found.user;
    var r = found.index;
    if ((Number(p.settingsUpdatedAt) || 0) > (Number(u.settings_updated_at) || 0)) {
      ush.getRange(r, 4, 1, 2).setValues([[JSON.stringify(p.settings || {}), String(p.settingsUpdatedAt)]]);
    }
    if ((Number(p.sessionUpdatedAt) || 0) > (Number(u.session_updated_at) || 0)) {
      ush.getRange(r, 6, 1, 2).setValues([[p.session ? JSON.stringify(p.session) : '', String(p.sessionUpdatedAt)]]);
    }
    if (p.today) ush.getRange(r, 8).setValue(JSON.stringify(p.today));
    if (p.summary) {
      var sum = p.summary;
      var small = {
        masteredWords: sum.masteredWords, masteredWordsJaEs: sum.masteredWordsJaEs, masteredWordsListen: sum.masteredWordsListen,
        masteredPhrases: sum.masteredPhrases, todayWords: sum.todayWords, todayPhrases: sum.todayPhrases, lastDay: sum.lastDay,
        stage: sum.stage ? { label: sum.stage.label, mastered: sum.stage.mastered, total: sum.stage.total } : null,
        date: sum.date,
      };
      ush.getRange(r, 9).setValue(JSON.stringify(small));
    }
    ush.getRange(r, 10).setValue(now);
  }
  return { ok: true, savedStates: states.length, savedAnswers: answers.length };
}

// ---------- 家族の学習状況 ----------
function familySummary() {
  return rows('users').map(function (r) {
    var u = toObj('users', r);
    return {
      user_id: String(u.user_id),
      display_name: String(u.display_name),
      created_at: String(u.created_at),
      summary: parseJson(u.summary_json, null),
    };
  });
}
