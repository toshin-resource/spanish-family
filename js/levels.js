// 単語のレベル（3言語共通）
// 日本の学校の英語に合わせた5段階。スペイン語・タイ語は、同じくらいの難しさ（よく使う順）で分けている。
// 英語だけは、その上に英検2級・準1級・1級の段階がある（EXTRA_LEVELS）。
// 単語データは行の順番 = レベル順に並べてあり、先頭から size 語ずつ各レベルに入る。
export const LEVELS = [
  { id: 1, label: '小学校', short: '小学校', size: 600, level: 'A1' },
  { id: 2, label: '中学1年', short: '中1', size: 600, level: 'A1〜A2' },
  { id: 3, label: '中学2〜3年', short: '中2〜3', size: 1000, level: 'A2' },
  { id: 4, label: '高校基礎', short: '高校基礎', size: 1000, level: 'B1' },
  { id: 5, label: '高校卒業', short: '高校卒業', size: 800, level: 'B1〜B2' },
];

export const EXTRA_LEVELS = {
  en: [
    { id: 6, label: '英検2級', short: '英検2級', size: 1000, level: 'B1〜B2' },
    { id: 7, label: '英検準1級', short: '英検準1級', size: 2000, level: 'B2〜C1' },
    { id: 8, label: '英検1級', short: '英検1級', size: 2000, level: 'C1〜C2' },
  ],
};

// その言語で選べるレベル（語がまだないレベルも含む）
export const levelsFor = (lang) => [...LEVELS, ...(EXTRA_LEVELS[lang] || [])];

// n語のデータに対するレベルの区切り（語がまだないレベルは含めない。最後のレベルは残りすべて）
export function stagesFor(n, lang) {
  const levels = levelsFor(lang);
  const out = [];
  let from = 1;
  levels.forEach((lv, i) => {
    if (from > n) return;
    const to = i === levels.length - 1 ? n : Math.min(n, from + lv.size - 1);
    out.push({ id: lv.id, label: lv.label, short: lv.short, level: lv.level, from, to });
    from = to + 1;
  });
  if (from <= n && out.length) out[out.length - 1].to = n;
  return out;
}

// i番目（1から）の語が入るレベル
export function stageIdAt(stages, n) {
  const s = stages.find((st) => n >= st.from && n <= st.to);
  return s ? s.id : stages[stages.length - 1].id;
}
