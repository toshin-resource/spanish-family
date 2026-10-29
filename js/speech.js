// 発音の読み上げ（音声合成）と音声入力（音声認識）
// どちらも Web Speech API。使える声・動作は端末とブラウザに依存する。

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let voices = [];

function loadVoices() {
  if (!synth) return [];
  voices = synth.getVoices().filter((v) => /^es([-_]|$)/i.test(v.lang));
  return voices;
}
if (synth) {
  loadVoices();
  synth.addEventListener?.('voiceschanged', loadVoices);
}

export function ttsSupported() {
  return !!synth && typeof SpeechSynthesisUtterance !== 'undefined';
}

export function spanishVoices() {
  return voices.length ? voices : loadVoices();
}

// 地域の優先順：アルゼンチン → 中南米 → スペイン → その他
const LANG_ORDER = ['es-AR', 'es-419', 'es-US', 'es-MX', 'es-ES'];
function pickVoice(voiceURI) {
  const list = spanishVoices();
  if (voiceURI) {
    const v = list.find((x) => x.voiceURI === voiceURI);
    if (v) return v;
  }
  for (const lang of LANG_ORDER) {
    const v = list.find((x) => x.lang.replace('_', '-').toLowerCase() === lang.toLowerCase());
    if (v) return v;
  }
  return list[0] || null;
}

// 声の一覧は読み込まれたが、スペイン語の声が1つもない状態か
export function missingSpanishVoice() {
  if (!synth) return false;
  return synth.getVoices().length > 0 && spanishVoices().length === 0;
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
export function speak(text, { rate = 0.9, voiceURI = '' } = {}) {
  return new Promise((resolve, reject) => {
    if (!ttsSupported()) return reject(new Error('unsupported'));
    stopListening();
    synth.cancel();
    const u = new SpeechSynthesisUtterance(speakText(text));
    const v = pickVoice(voiceURI);
    if (v) u.voice = v;
    u.lang = v ? v.lang : 'es-ES';
    u.rate = rate;
    let started = false;
    const timer = setTimeout(() => {
      if (!started) {
        synth.cancel();
        reject(new Error('timeout'));
      }
    }, 4000);
    u.onstart = () => { started = true; };
    u.onend = () => { clearTimeout(timer); resolve(); };
    u.onerror = (e) => {
      clearTimeout(timer);
      if (e.error === 'interrupted' || e.error === 'canceled') resolve();
      else reject(new Error(e.error || 'error'));
    };
    current = u;
    synth.speak(u);
  });
}

export function speaking() {
  return !!(synth && synth.speaking);
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
