// スペイン語の綴りから発音記号（IPA・簡略表記）を作る
// スペイン語は綴りと発音の対応がほぼ規則的なので、規則で変換する。
// - 方針：中南米の標準的な発音（c/z は s、ll と y は同じ音）。アルゼンチン式では ll/y を ʃ にする。
// - b/d/g の弱い音（β ð ɣ）などの細かい違いは書かず、学習者向けに簡略化している。
// - 音節の区切りを「.」、強く読む音節の前に「ˈ」を付ける（1音節の語には付けない）。

const VOWELS = 'aeiouáéíóúü';
const STRONG = 'aeoáéó';
const ACCENTED = 'áéíóú';
const PLAIN = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u' };
// 2つの子音でも分けずに次の音節の頭になる組み合わせ
const ONSETS = new Set(['pl', 'pr', 'bl', 'br', 'fl', 'fr', 'cl', 'cr', 'gl', 'gr', 'dr', 'tr', 'kl', 'kr']);

function graphemes(word) {
  const out = [];
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    const n = word[i + 1];
    const n2 = word[i + 2];
    if (c === 'c' && n === 'h') { out.push({ g: 'ch' }); i++; continue; }
    if (c === 'l' && n === 'l') { out.push({ g: 'll' }); i++; continue; }
    if (c === 'r' && n === 'r') { out.push({ g: 'rr' }); i++; continue; }
    if (c === 'q' && n === 'u') { out.push({ g: 'qu' }); i++; continue; }
    if (c === 'g' && n === 'u' && n2 && 'eéií'.includes(n2)) { out.push({ g: 'gu' }); i++; continue; }
    if (c === 'x') { out.push({ g: 'k' }, { g: 's' }); continue; } // examen → ek.sa.men
    out.push({ g: c, v: VOWELS.includes(c) });
  }
  // y は母音の前では子音、語末や子音の前では母音（i）として扱う
  out.forEach((t, i) => {
    if (t.g === 'y') t.v = !(out[i + 1] && out[i + 1].v);
  });
  return out;
}

const isHiatus = (a, b) => (STRONG.includes(a.g) && STRONG.includes(b.g)) || 'íú'.includes(a.g) || 'íú'.includes(b.g);

function syllabify(gs) {
  // 母音のまとまり（核）を探す。強母音どうし・アクセント付きの i/u は別の音節に分ける
  const nuclei = [];
  let cur = null;
  gs.forEach((t, i) => {
    if (!t.v) { cur = null; return; }
    if (cur && !isHiatus(gs[i - 1], t)) cur.end = i;
    else { cur = { start: i, end: i }; nuclei.push(cur); }
  });
  if (!nuclei.length) return [gs];
  const cuts = [];
  for (let k = 1; k < nuclei.length; k++) {
    const from = nuclei[k - 1].end + 1;
    const to = nuclei[k].start; // from..to-1 が間の子音
    const cons = gs.slice(from, to).map((t) => t.g);
    let cut;
    if (cons.length <= 1) cut = from;
    else if (cons.length === 2) cut = ONSETS.has(cons.join('')) ? from : from + 1;
    else if (cons.length === 3) cut = ONSETS.has(cons.slice(1).join('')) ? from + 1 : from + 2;
    else cut = from + 2;
    cuts.push(cut);
  }
  const syl = [];
  let s = 0;
  for (const c of [...cuts, gs.length]) { syl.push(gs.slice(s, c)); s = c; }
  return syl;
}

function stressIndex(word, syl) {
  const acc = syl.findIndex((s) => s.some((t) => ACCENTED.includes(t.g)));
  if (acc >= 0) return acc;
  if (syl.length < 2) return 0;
  const last = word[word.length - 1];
  return 'aeiouns'.includes(last) ? syl.length - 2 : syl.length - 1;
}

function consonant(t, prev, next, first, variant) {
  const nx = next ? next.g : '';
  switch (t.g) {
    case 'b': case 'v': return 'b';
    case 'c': return 'eéií'.includes(nx[0] || '') ? 's' : 'k';
    case 'ch': return 'tʃ';
    case 'g': return 'eéií'.includes(nx[0] || '') ? 'x' : 'g';
    case 'gu': return 'g';
    case 'h': return '';
    case 'j': return 'x';
    case 'll': case 'y': return variant === 'ar' ? 'ʃ' : 'ʝ';
    case 'ñ': return 'ɲ';
    case 'qu': return 'k';
    case 'r': return first || (prev && 'lns'.includes(prev.g)) ? 'r' : 'ɾ';
    case 'rr': return 'r';
    case 'z': return 's';
    default: return t.g;
  }
}

function wordIpa(raw, variant) {
  const word = raw.toLowerCase();
  const gs = graphemes(word);
  const syl = syllabify(gs);
  const stress = stressIndex(word, syl);
  let index = 0;
  const parts = syl.map((s, si) => {
    // 母音のまとまりの中で一番強い母音以外は、半母音 j / w になる
    const vs = s.filter((t) => t.v);
    const peak = vs.find((t) => ACCENTED.includes(t.g)) || vs.find((t) => STRONG.includes(t.g)) || vs[vs.length - 1];
    let out = '';
    for (const t of s) {
      const pos = index++;
      if (t.v) {
        const base = PLAIN[t.g] || (t.g === 'y' ? 'i' : t.g);
        out += t === peak ? base : base === 'i' ? 'j' : base === 'u' ? 'w' : base;
      } else {
        out += consonant(t, gs[pos - 1], gs[pos + 1], pos === 0, variant);
      }
    }
    return (syl.length > 1 && si === stress ? 'ˈ' : si > 0 ? '.' : '') + out;
  });
  return parts.join('').replace(/\.ˈ/g, 'ˈ');
}

const cache = new Map();
// text：スペイン語の単語またはフレーズ。variant：'latam'（中南米）/ 'ar'（アルゼンチン）
export function toIpa(text, variant = 'latam') {
  const key = `${variant}|${text}`;
  if (cache.has(key)) return cache.get(key);
  const words = String(text)
    .replace(/…|\.\.\./g, ' ')
    .replace(/[¿?¡!,.;:"]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const ipa = words.length ? `/${words.map((w) => wordIpa(w, variant)).join(' ')}/` : '';
  cache.set(key, ipa);
  return ipa;
}
