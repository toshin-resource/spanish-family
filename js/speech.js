// 発音の読み上げ（音声合成）と音声入力（音声認識）
// どちらも Web Speech API。使える声・動作は端末とブラウザに依存する。

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let allVoices = [];

function loadVoices() {
  if (!synth) return [];
  allVoices = synth.getVoices();
  return allVoices;
}
if (synth) {
  loadVoices();
  synth.addEventListener?.('voiceschanged', loadVoices);
}

export function ttsSupported() {
  return !!synth && typeof SpeechSynthesisUtterance !== 'undefined';
}

// その言語（'es' / 'th'）の声の一覧
export function voicesFor(lang) {
  const list = allVoices.length ? allVoices : loadVoices();
  const re = new RegExp(`^${lang}([-_]|$)`, 'i');
  return list.filter((v) => re.test(v.lang));
}
export function spanishVoices() {
  return voicesFor('es');
}

// 言語ごとの声の優先順（スペイン語はアルゼンチン → 中南米 → スペインの順）
const LANG_ORDER = {
  es: ['es-AR', 'es-419', 'es-US', 'es-MX', 'es-ES'],
  th: ['th-TH'],
};
const BCP47 = { es: 'es-ES', th: 'th-TH' };
function pickVoice(lang, voiceURI) {
  const list = voicesFor(lang);
  if (voiceURI) {
    const v = list.find((x) => x.voiceURI === voiceURI);
    if (v) return v;
  }
  for (const code of LANG_ORDER[lang] || []) {
    const v = list.find((x) => x.lang.replace('_', '-').toLowerCase() === code.toLowerCase());
    if (v) return v;
  }
  return list[0] || null;
}

// 声の一覧は読み込まれたが、その言語の声が1つもない状態か
export function missingVoice(lang = 'es') {
  if (!synth) return false;
  return synth.getVoices().length > 0 && voicesFor(lang).length === 0;
}

export function speakText(text) {
  return String(text).replace(/…|\.\.\./g, ' ').replace(/\s+/g, ' ').trim();
}

let current = null;
export function stopSpeaking() {
  if (synth) synth.cancel();
  current = null;
}

// 読み上げ。成功で resolve、失敗（声がない・再生できない）で reject
// repeat：同じ言葉を続けて読む回数。まとめて読み上げの順番待ちに入れるので、1回目の終わりを待たずに2回目が続く
export function speak(text, { rate = 0.9, voiceURI = '', lang = 'es', repeat = 1 } = {}) {
  return new Promise((resolve, reject) => {
    if (!ttsSupported()) return reject(new Error('unsupported'));
    stopListening();
    synth.cancel();
    const v = pickVoice(lang, voiceURI);
    let started = false;
    let finished = false;
    const done = (fn) => { if (!finished) { finished = true; clearTimeout(timer); fn(); } };
    const timer = setTimeout(() => {
      if (!started) {
        synth.cancel();
        done(() => reject(new Error('timeout')));
      }
    }, 4000);
    const list = Array.from({ length: Math.max(1, repeat) }, (_, i) => {
      const u = new SpeechSynthesisUtterance(speakText(text));
      if (v) u.voice = v;
      u.lang = v ? v.lang : BCP47[lang] || 'es-ES';
      u.rate = rate;
      u.onstart = () => { started = true; };
      u.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') done(resolve);
        else done(() => reject(new Error(e.error || 'error')));
      };
      if (i === repeat - 1 || repeat <= 1) u.onend = () => done(resolve);
      return u;
    });
    current = list[list.length - 1];
    for (const u of list) synth.speak(u);
  });
}

export function speaking() {
  return !!(synth && synth.speaking);
}

// ---------- 効果音 ----------
// 音声ファイルを使わず、ブラウザで「ピンポン」と2音を鳴らす（iPhoneの消音モード中は鳴らない）
let actx = null;
export function unlockAudio() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    actx ||= new Ctx();
    if (actx.state === 'suspended') actx.resume();
  } catch (e) { /* 効果音なしで続ける */ }
}

// 鳴らした長さ（ミリ秒）を返す。鳴らせないときは 0
export function playChime() {
  unlockAudio();
  if (!actx) return 0;
  try {
    const t0 = actx.currentTime + 0.02;
    [[880, 0], [1318.5, 0.12]].forEach(([freq, dt]) => {
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t0 + dt);
      gain.gain.exponentialRampToValueAtTime(0.3, t0 + dt + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 0.4);
      osc.connect(gain).connect(actx.destination);
      osc.start(t0 + dt);
      osc.stop(t0 + dt + 0.45);
    });
    return 500;
  } catch (e) {
    return 0;
  }
}

// iPhoneでは、最初の読み上げを画面のタップの中で行わないと、あとから（タイマーで）読み上げても音が出ない。
// そこで、学習を始めるタップの中で、聞こえない短い読み上げをして準備しておく
export function primeSpeech(lang = 'es') {
  if (!ttsSupported()) return;
  try {
    const u = new SpeechSynthesisUtterance('a');
    u.volume = 0;
    u.rate = 2;
    u.lang = BCP47[lang] || 'es-ES';
    synth.speak(u);
  } catch (e) { /* 読み上げなしで続ける */ }
}
export function unlockSpeech() {
  primeSpeech();
}

// ---------- 音声入力 ----------
const Recognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
let rec = null;

export function sttSupported() {
  return !!Recognition;
}

// handlers: { onText(text, isFinal), onEnd(), onError(code) }
export function startListening({ lang = 'ja-JP', onText, onEnd, onError } = {}) {
  if (!Recognition) {
    onError?.('unsupported');
    return false;
  }
  stopListening();
  // お手本の読み上げを答えとして取り込まないよう、先に止める
  if (synth) synth.cancel();
  rec = new Recognition();
  rec.lang = lang;
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;
  let finalText = '';
  rec.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i];
      if (r.isFinal) finalText += r[0].transcript;
      else interim += r[0].transcript;
    }
    onText?.(finalText + interim, !interim);
  };
  rec.onerror = (e) => onError?.(e.error || 'error');
  rec.onend = () => {
    rec = null;
    onEnd?.();
  };
  try {
    rec.start();
  } catch (err) {
    rec = null;
    onError?.('start-failed');
    return false;
  }
  return true;
}

export function stopListening() {
  if (rec) {
    try { rec.stop(); } catch (e) { /* 既に止まっている */ }
  }
}

export function listening() {
  return !!rec;
}

export function sttErrorMessage(code) {
  switch (code) {
    case 'unsupported': return 'この端末・ブラウザでは音声入力が使えません。キーボードで入力してください。';
    case 'not-allowed':
    case 'service-not-allowed': return 'マイクまたは音声認識が許可されていません。iPhoneの「設定」→「Safari」→「マイク」や、「設定」→「Siriと検索」を確認してください。キーボードでも入力できます。';
    case 'network': return '通信できないため音声入力が使えません。キーボードで入力してください。';
    case 'no-speech': return '声が聞き取れませんでした。もう一度押して話してください。';
    case 'audio-capture': return 'マイクが使えません。キーボードで入力してください。';
    default: return '音声入力がうまくいきませんでした。もう一度試すか、キーボードで入力してください。';
  }
}
