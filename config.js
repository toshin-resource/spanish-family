// アプリの設定
// GAS_URL：Apps Script を「ウェブアプリ」として公開したときのURL（…/exec）。
//   ここに書いておくと、家族の各端末では「合言葉」を入れるだけでクラウド保存につながる。
//   空のままでも、アプリの「設定」画面から入力できる。
//   ※ 合言葉（家族用のパスワード）はここに書かない。公開されるファイルに秘密情報を入れないため。
export const APP_CONFIG = {
  GAS_URL: 'https://script.google.com/macros/s/AKfycbwHyAsaHQFOao5Yrnq4FbyFp_BibaZCbT75_MdsPe3QKKdGxBJsKc9WAuZN3VumeaTf/exec',
};
