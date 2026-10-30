// スペイン語の例文（単語ごとに1つ）
// 1行 = 単語のid|例文|日本語訳
// - 回答後と単語リストに表示し、🔊で読み上げる。日常会話で使いやすい短い文にしている（仮作成・要確認）。
const RAW = `
w001|¡Hola! ¿Cómo estás?|こんにちは！元気？
w002|Muchas gracias por tu ayuda.|手伝ってくれて本当にありがとう。
w003|Sí, me gusta mucho.|はい、とても好きです。
w004|No, no tengo tiempo.|いいえ、時間がありません。
w005|Adiós, hasta mañana.|さようなら、また明日。
w006|Perdón, ¿dónde está el baño?|すみません、トイレはどこですか？
w007|Yo soy de Japón.|私は日本出身です。
w008|¿Tú hablas inglés?|君は英語を話す？
w009|¿Usted es el profesor?|あなたが先生ですか？
w010|Él trabaja en un banco.|彼は銀行で働いています。
w011|Ella es mi hermana.|彼女は私の姉（妹）です。
w012|Nosotros vivimos en Tokio.|私たちは東京に住んでいます。
w013|Ellos llegan mañana.|彼らは明日着きます。
w014|¿Ustedes quieren café?|皆さん、コーヒーはいかがですか？
w015|Mi madre es muy amable.|母はとても親切です。
w016|Estoy muy cansado hoy.|今日はとても疲れています。
w017|Tengo dos hermanos.|私には兄弟が2人います。
w018|Hay un parque cerca de mi casa.|家の近くに公園があります。
w019|¿Qué haces mañana?|明日は何をするの？
w020|Voy al mercado.|市場に行きます。
w021|¿Vienes a la fiesta?|パーティーに来る？
w022|¿Puedo pagar con tarjeta?|カードで払えますか？
w023|Quiero un café, por favor.|コーヒーを1杯ください。
w024|¿Qué dices?|何て言ってるの？
w025|Veo la televisión por la noche.|夜はテレビを見ます。
w026|Te doy un regalo.|君にプレゼントをあげる。
w027|No sé su nombre.|彼の名前を知りません。
w028|Conozco a tu hermano.|君のお兄さんを知っています。
w029|¿Qué es esto?|これは何ですか？
w030|¿Quién es ella?|彼女は誰ですか？
w031|¿Dónde vives?|どこに住んでいるの？
w032|¿Cuándo es tu cumpleaños?|君の誕生日はいつ？
w033|¿Cómo se dice "gracias" en japonés?|「gracias」は日本語で何と言いますか？
w034|¿Por qué estudias español?|なぜスペイン語を勉強しているの？
w035|¿Cuánto cuesta este libro?|この本はいくらですか？
w036|¿Cuál es tu color favorito?|好きな色はどれ（何色）？
w037|Esto es muy rico.|これはとてもおいしい。
w038|Eso no es verdad.|それは本当じゃない。
w039|Vivo aquí.|私はここに住んでいます。
w040|El hotel está allí.|ホテルはあそこです。
w041|Quiero pan y queso.|パンとチーズが欲しいです。
w042|¿Café o té?|コーヒーにする？それとも紅茶？
w043|Es caro, pero es bonito.|高いけれど、きれいです。
w044|No voy porque estoy enfermo.|病気なので行きません。
w045|Si llueve, no salgo.|雨が降ったら出かけません。
w046|Vivo con mi familia.|家族と一緒に住んでいます。
w047|Un café sin azúcar, por favor.|砂糖なしのコーヒーをください。
w048|Este regalo es para ti.|このプレゼントは君にです。
w049|Es el libro de mi padre.|それは父の本です。
w050|Estoy en casa.|私は家にいます。
w051|Hace muy frío hoy.|今日はとても寒い。
w052|Hablas muy bien español.|スペイン語がとても上手ですね。
w053|Me siento mal.|気分が悪いです。
w054|Tengo mucho trabajo.|仕事がたくさんあります。
w055|Hablo un poco de español.|スペイン語を少し話します。
w056|Más despacio, por favor.|もっとゆっくりお願いします。
w057|Yo también quiero ir.|私も行きたいです。
w058|Ahora no puedo.|今はできません。
w059|Hoy es lunes.|今日は月曜日です。
w060|Ayer fui al cine.|昨日、映画館に行きました。
w061|Hasta mañana.|また明日。
w062|Siempre desayuno a las siete.|いつも7時に朝ご飯を食べます。
w063|Nunca bebo alcohol.|お酒は決して飲みません。
w064|Ya comí.|もう食べました。
w065|Todavía no entiendo.|まだわかりません。
w066|Es un buen restaurante.|いいレストランです。
w067|Hace mal tiempo.|天気が悪いです。
w068|Mi casa es grande.|私の家は大きいです。
w069|Tengo un perro pequeño.|小さい犬を飼っています。
w070|Compré un teléfono nuevo.|新しい電話を買いました。
w071|Mi coche es muy viejo.|私の車はとても古いです。
w072|Es una persona muy simpática.|とても感じのいい人です。
w073|Ese hombre es mi jefe.|あの男性は私の上司です。
w074|La mujer habla con el médico.|その女性は医者と話しています。
w075|El niño juega en el parque.|男の子が公園で遊んでいます。
w076|La niña tiene cinco años.|その女の子は5歳です。
w077|Él es mi mejor amigo.|彼は私の一番の友達です。
w078|Mi familia es grande.|私の家族は大家族です。
w079|Mi padre trabaja mucho.|父はよく働きます。
w080|Mi madre cocina muy bien.|母は料理がとても上手です。
w081|Mi hijo tiene diez años.|息子は10歳です。
w082|Mi hija estudia en la universidad.|娘は大学で勉強しています。
w083|Mi hermano vive en Osaka.|兄（弟）は大阪に住んでいます。
w084|Mi hermana es médica.|姉（妹）は医者です。
w085|Mi esposo es japonés.|夫は日本人です。
w086|Mi esposa habla español.|妻はスペイン語を話します。
w087|¿Cuál es tu nombre?|名前は何ですか？
w088|Estoy en casa ahora.|今、家にいます。
w089|Hoy es un día bonito.|今日はいい日です。
w090|Buenas noches.|おやすみなさい。
w091|Nos vemos esta tarde.|今日の午後に会いましょう。
w092|No tengo tiempo.|時間がありません。
w093|Tengo cuarenta años.|私は40歳です。
w094|Hablo con mi madre por teléfono.|母と電話で話します。
w095|Comemos a las doce.|12時にお昼を食べます。
w096|Bebo agua todos los días.|毎日水を飲みます。
w097|¿Tomamos un café?|コーヒーを飲みましょうか？
w098|Vivo en Japón.|日本に住んでいます。
w099|Trabajo de lunes a viernes.|月曜から金曜まで働きます。
w100|Estudio español todos los días.|毎日スペイン語を勉強します。
w101|No entiendo la pregunta.|質問がわかりません。
w102|Quiero comprar pan.|パンを買いたいです。
w103|Voy a pagar yo.|私が払います。
w104|Necesito ayuda.|助けが必要です。
w105|Me gusta el café.|コーヒーが好きです。
w106|Te espero aquí.|ここで待っているね。
w107|Busco mi llave.|鍵を探しています。
w108|El tren llega a las tres.|電車は3時に着きます。
w109|Salgo de casa a las ocho.|8時に家を出ます。
w110|Te llamo mañana.|明日電話するね。
w111|Un vaso de agua, por favor.|お水を1杯ください。
w112|La comida está muy rica.|食事がとてもおいしいです。
w113|Tomo café por la mañana.|朝はコーヒーを飲みます。
w114|Compro pan en la panadería.|パン屋でパンを買います。
w115|No tengo dinero.|お金がありません。
w116|Tengo mucho trabajo hoy.|今日は仕事がたくさんあります。
w117|Madrid es una ciudad grande.|マドリードは大きな町です。
w118|Japón es un país bonito.|日本はきれいな国です。
w119|La calle está muy tranquila.|通りはとても静かです。
w120|Tengo muchas cosas que hacer.|やることがたくさんあります。
w121|Quiero un café, solo uno.|コーヒーを1杯だけください。
w122|Tengo dos hijos.|子どもが2人います。
w123|Son las tres.|3時です。
w124|Somos cuatro en mi familia.|うちは4人家族です。
w125|Trabajo cinco días a la semana.|週に5日働きます。
w126|Me levanto a las seis.|6時に起きます。
w127|Una semana tiene siete días.|1週間は7日あります。
w128|Abro la tienda a las ocho.|8時に店を開けます。
w129|Mi hijo tiene nueve años.|息子は9歳です。
w130|Son diez euros.|10ユーロです。
w131|Todo está bien.|すべて順調です。
w132|Quiero otro café.|コーヒーをもう1杯ください。
w133|Tenemos la misma edad.|私たちは同じ年です。
w134|¿Quieres algo de beber?|何か飲み物はいかが？
w135|No hay nada en la mesa.|テーブルの上には何もありません。
w136|Alguien está en la puerta.|誰かが玄関にいます。
w137|No hay nadie en casa.|家には誰もいません。
w138|Mi casa está cerca.|私の家は近くです。
w139|¿Dónde está tu hermano?|君のお兄さんはどこ？
w140|Su casa es muy bonita.|彼（彼女）の家はとてもきれいです。
w141|Pienso en ti.|君のことを考えています。
w142|Creo que sí.|そう思います。
w143|Lo siento mucho.|本当にごめんなさい。
w144|Pongo el libro en la mesa.|本をテーブルに置きます。
w145|¿Qué pasa?|どうしたの？
w146|Llevo a mi hija a la escuela.|娘を学校に連れて行きます。
w147|¿Me traes un vaso de agua?|水を1杯持ってきてくれる？
w148|Dejo el coche aquí.|車をここに置いていきます。
w149|Sigue todo recto.|まっすぐ行ってください。
w150|Vuelvo a casa a las seis.|6時に家に帰ります。
w151|La clase empieza a las nueve.|授業は9時に始まります。
w152|Termino el trabajo a las cinco.|5時に仕事を終えます。
w153|¿Puedes abrir la ventana?|窓を開けてくれる？
w154|Cierra la puerta, por favor.|ドアを閉めてください。
w155|Escribo una carta a mi abuela.|祖母に手紙を書きます。
w156|Me gusta leer libros.|本を読むのが好きです。
w157|Escucho música en el tren.|電車で音楽を聞きます。
w158|Mira, ¡qué bonito!|見て、なんてきれい！
w159|Duermo ocho horas.|8時間眠ります。
w160|¿Me puedes ayudar?|手伝ってもらえる？
w161|¿Puedo usar tu teléfono?|君の電話を使ってもいい？
w162|Quiero aprender español.|スペイン語を学びたいです。
w163|No encuentro mi llave.|鍵が見つかりません。
w164|Quiero preguntar algo.|ちょっと聞きたいことがあります。
w165|No sé qué responder.|何と答えたらいいかわかりません。
w166|Camino al trabajo.|仕事に歩いて行きます。
w167|Corro en el parque.|公園で走ります。
w168|Los niños juegan al fútbol.|子どもたちがサッカーをしています。
w169|Me gusta cocinar.|料理をするのが好きです。
w170|Lavo los platos después de comer.|食後にお皿を洗います。
w171|Limpio la casa los sábados.|土曜日に家を掃除します。
w172|Quiero viajar a Argentina.|アルゼンチンに旅行したいです。
w173|¿Puedo entrar?|入ってもいいですか？
w174|Voy a pedir una pizza.|ピザを頼みます。
w175|Venden fruta en el mercado.|市場で果物を売っています。
w176|No recuerdo su nombre.|彼の名前を覚えていません。
w177|Olvidé mi paraguas.|傘を忘れました。
w178|Quiero cambiar dinero.|両替したいです。
w179|Perdí mi pasaporte.|パスポートをなくしました。
w180|Mi equipo ganó el partido.|私のチームが試合に勝ちました。
w181|Nos vemos la próxima semana.|また来週会いましょう。
w182|Voy a México el próximo mes.|来月メキシコに行きます。
w183|¿Qué hora es?|何時ですか？
w184|Voy al gimnasio dos veces por semana.|週に2回ジムに行きます。
w185|Un momento, por favor.|少々お待ちください。
w186|El lunes empiezo un trabajo nuevo.|月曜日に新しい仕事を始めます。
w187|Tengo clase el martes.|火曜日に授業があります。
w188|El miércoles voy al médico.|水曜日に病院に行きます。
w189|El jueves cenamos juntos.|木曜日に一緒に夕食を食べます。
w190|El viernes salgo con amigos.|金曜日は友達と出かけます。
w191|El sábado no trabajo.|土曜日は仕事をしません。
w192|El domingo descanso en casa.|日曜日は家で休みます。
w193|Mi hijo va a la escuela en bicicleta.|息子は自転車で学校に行きます。
w194|La tienda abre a las diez.|お店は10時に開きます。
w195|Compro verduras en el mercado.|市場で野菜を買います。
w196|Cenamos en un restaurante italiano.|イタリアンレストランで夕食を食べます。
w197|Mi abuelo está en el hospital.|祖父は入院しています。
w198|El banco está cerrado hoy.|今日は銀行が閉まっています。
w199|¿Dónde está el baño?|トイレはどこですか？
w200|Mi habitación es pequeña.|私の部屋は小さいです。
w201|Mi madre está en la cocina.|母は台所にいます。
w202|Alguien está en la puerta.|誰かがドアのところにいます。
w203|Abro la ventana por la mañana.|朝、窓を開けます。
w204|La comida está en la mesa.|料理はテーブルの上にあります。
w205|Siéntate en esta silla.|この椅子に座って。
w206|Me voy a la cama.|もう寝ます。
w207|La estación está cerca de aquí.|駅はこの近くです。
w208|Voy al aeropuerto en taxi.|タクシーで空港に行きます。
w209|El hotel tiene piscina.|ホテルにはプールがあります。
w210|Nos vemos en la plaza.|広場で会いましょう。
w211|Paseo al perro en el parque.|公園で犬の散歩をします。
w212|En verano vamos a la playa.|夏はビーチに行きます。
w213|Me gusta nadar en el mar.|海で泳ぐのが好きです。
w214|Voy al trabajo en auto.|車で仕事に行きます。
w215|El autobús llega en cinco minutos.|バスは5分後に来ます。
w216|Tomo el tren de las ocho.|8時の電車に乗ります。
w217|El avión sale a las diez.|飛行機は10時に出発します。
w218|Vamos en taxi.|タクシーで行きましょう。
w219|Voy en bicicleta a la escuela.|自転車で学校に行きます。
w220|¿Quieres un té?|お茶はいかが？
w221|Bebo leche por la mañana.|朝、牛乳を飲みます。
w222|No como carne.|肉は食べません。
w223|Hoy cenamos pescado.|今日の夕食は魚です。
w224|El pollo está muy rico.|鶏肉がとてもおいしいです。
w225|Desayuno huevos con pan.|朝食に卵とパンを食べます。
w226|En Japón comemos mucho arroz.|日本ではお米をたくさん食べます。
w227|Como fruta todos los días.|毎日果物を食べます。
w228|Quiero una manzana roja.|赤いりんごが欲しいです。
w229|Un jugo de naranja, por favor.|オレンジジュースをください。
w230|Las verduras son buenas para la salud.|野菜は健康にいいです。
w231|Me gusta el queso.|チーズが好きです。
w232|¿Vino tinto o blanco?|赤ワイン？それとも白？
w233|Dos cervezas, por favor.|ビールを2つください。
w234|Sin azúcar, por favor.|砂糖なしでお願いします。
w235|¿Me pasas la sal?|塩を取ってくれる？
w236|El desayuno está listo.|朝ご飯ができました。
w237|El almuerzo es a la una.|昼食は1時です。
w238|La cena es a las nueve.|夕食は9時です。
w239|Me duele la cabeza.|頭が痛いです。
w240|Lávate las manos.|手を洗いなさい。
w241|Tiene los ojos azules.|彼（彼女）は青い目をしています。
w242|Abre la boca, por favor.|口を開けてください。
w243|Me duele el pie.|足が痛いです。
w244|El ejercicio es bueno para el cuerpo.|運動は体にいいです。
w245|Te quiero con todo mi corazón.|心から君を愛しています。
w246|Estoy leyendo un libro interesante.|面白い本を読んでいます。
w247|¿Cuál es tu número de teléfono?|あなたの電話番号は何ですか？
w248|Compro ropa nueva.|新しい服を買います。
w249|¿Dónde está la llave?|鍵はどこ？
w250|¿Me da una bolsa, por favor?|袋をもらえますか？
w251|Este regalo es para mi madre.|このプレゼントは母へのものです。
w252|¿Podemos sacar una foto?|写真を撮ってもいいですか？
w253|Me gusta la música latina.|ラテン音楽が好きです。
w254|Vamos a ver una película.|映画を見に行きましょう。
w255|Hablo dos idiomas.|私は2つの言語を話します。
w256|No conozco esta palabra.|この単語を知りません。
w257|Tengo una pregunta.|質問があります。
w258|No hay problema.|問題ありません。
w259|¿Cuál es el precio?|値段はいくらですか？
w260|Quiero viajar por el mundo.|世界中を旅行したいです。
w261|La vida es bonita.|人生は素晴らしい。
w262|El amor es importante.|愛は大切です。
w263|Hoy hace sol.|今日は晴れています。
w264|Hay mucha lluvia en junio.|6月は雨がたくさん降ります。
w265|Hace mucho calor.|とても暑いです。
w266|El agua está fría.|水が冷たいです。
w267|Mi perro se llama Toto.|うちの犬の名前はトトです。
w268|El gato duerme en la cama.|猫がベッドで寝ています。
w269|Te compré flores.|君に花を買ったよ。
w270|Tengo una camisa blanca.|白いシャツを持っています。
w271|Me gusta el café negro.|ブラックコーヒーが好きです。
w272|Quiero el vestido rojo.|赤いドレスが欲しいです。
w273|El cielo está azul.|空が青いです。
w274|Me gusta el té verde.|緑茶が好きです。
w275|El taxi es amarillo.|タクシーは黄色です。
w276|¡Qué bonito día!|なんていい日でしょう！
w277|¡Qué lindo perro!|なんてかわいい犬！
w278|Tiene el pelo largo.|彼女は髪が長いです。
w279|El viaje es corto.|移動は短いです。
w280|Mi hermano es muy alto.|兄はとても背が高いです。
w281|La mesa es baja.|そのテーブルは低いです。
w282|Este reloj es muy caro.|この時計はとても高いです。
w283|La fruta es barata aquí.|ここは果物が安いです。
w284|El examen fue fácil.|試験は簡単でした。
w285|El español no es difícil.|スペイン語は難しくありません。
w286|La sopa está muy caliente.|スープがとても熱いです。
w287|Estoy muy feliz hoy.|今日はとても幸せです。
w288|¿Por qué estás triste?|どうして悲しいの？
w289|Estoy cansado del trabajo.|仕事で疲れています。
w290|El tren es muy rápido.|電車はとても速いです。
w291|Es muy importante.|とても大切です。
w292|¡Qué rico está esto!|これはなんておいしいんだ！
w293|Estoy ocupado ahora.|今、忙しいです。
w294|Mi hijo está enfermo.|息子が病気です。
w295|El supermercado está cerca.|スーパーは近くにあります。
w296|Mi casa está lejos de aquí.|私の家はここから遠いです。
w297|Te llamo después.|あとで電話するね。
w298|Lávate las manos antes de comer.|食べる前に手を洗いなさい。
w299|Gira a la derecha.|右に曲がってください。
w300|El banco está a la izquierda.|銀行は左にあります。
w301|Acabo de llegar.|今着いたところです。
w302|Aceptamos tarjetas.|カードが使えます。
w303|Quiero alquilar un auto.|車を借りたいです。
w304|¿Cómo andas?|調子はどう？
w305|Apaga la luz, por favor.|電気を消してください。
w306|Tengo que arreglar la bicicleta.|自転車を直さないといけません。
w307|Asisto a clase todos los días.|毎日授業に出ています。
w308|Me baño por la noche.|夜にお風呂に入ります。
w309|Borra la pizarra, por favor.|黒板を消してください。
w310|Necesito cargar el teléfono.|電話を充電しないと。
w311|Mi hermana se casa en mayo.|姉（妹）は5月に結婚します。
w312|Celebramos su cumpleaños.|彼（彼女）の誕生日を祝います。
w313|Cenamos a las ocho.|8時に夕食をとります。
w314|Comparto la habitación con mi hermano.|兄弟と部屋を共有しています。
w315|No sé conducir.|運転ができません。
w316|Construyen un edificio nuevo.|新しいビルを建てています。
w317|Contesta el teléfono, por favor.|電話に出てください。
w318|Continuamos mañana.|続きは明日にしましょう。
w319|¿Cuánto cuesta el boleto?|切符はいくらですか？
w320|Los niños crecen rápido.|子どもはすぐに大きくなります。
w321|Cruza la calle con cuidado.|気をつけて道を渡ってね。
w322|Cuido a mi abuela.|祖母の世話をしています。
w323|Debes descansar.|休んだほうがいいよ。
w324|No puedo decidir.|決められません。
w325|Desayuno a las siete.|7時に朝食をとります。
w326|¿Puedes describir a tu amigo?|君の友達がどんな人か説明できる？
w327|Me despierto temprano.|早く目を覚まします。
w328|Mi hija dibuja muy bien.|娘は絵がとても上手です。
w329|¡Diviértete en la fiesta!|パーティーを楽しんでね！
w330|Me duele el estómago.|お腹が痛いです。
w331|Me ducho por la mañana.|朝、シャワーを浴びます。
w332|Elige uno, por favor.|1つ選んでください。
w333|Mi madre enseña inglés.|母は英語を教えています。
w334|Te envío un mensaje.|メッセージを送るね。
w335|¿Me lo puedes explicar?|それを説明してもらえる？
w336|Falta un plato.|お皿が1枚足りません。
w337|Firme aquí, por favor.|ここにサインしてください。
w338|El ascensor no funciona.|エレベーターが動きません。
w339|Gasto mucho en comida.|食べ物にお金をたくさん使います。
w340|Guarda tu dinero.|お金をしまっておいて。
w341|Voy a intentarlo.|やってみます。
w342|Me levanto a las seis.|6時に起きます。
w343|Llena el vaso de agua.|コップを水でいっぱいにして。
w344|El bebé llora mucho.|赤ちゃんがよく泣きます。
w345|Te mando una foto.|写真を送るね。
w346|Quiero mejorar mi español.|スペイン語を上達させたいです。
w347|No me mientas.|うそをつかないで。
w348|Las flores mueren sin agua.|花は水がないと枯れてしまいます。
w349|¿Puedes mover la mesa?|テーブルを動かしてくれる？
w350|Nací en Osaka.|私は大阪で生まれました。
w351|Me gusta nadar en verano.|夏に泳ぐのが好きです。
w352|No noté nada.|何も気づきませんでした。
w353|¿Qué ocurrió?|何が起こったの？
w354|No te oigo bien.|よく聞こえません。
w355|Huele muy bien.|とてもいいにおいがします。
w356|El autobús para aquí.|バスはここで止まります。
w357|Parece fácil.|簡単そうに見えます。
w358|Quiero participar en el concurso.|コンテストに参加したいです。
w359|Paseamos por el parque.|公園を散歩します。
w360|Mis hijos siempre pelean.|子どもたちはいつもけんかしています。
w361|No se permite fumar.|喫煙は禁止です。
w362|Prefiero el té.|紅茶のほうが好きです。
w363|No te preocupes.|心配しないで。
w364|Preparo la cena.|夕食の準備をします。
w365|Te presento a mi esposa.|妻を紹介します。
w366|¿Puedo probar este vestido?|このドレスを試着してもいいですか？
w367|Te lo prometo.|約束するよ。
w368|Me quedo en casa hoy.|今日は家にいます。
w369|Siempre se queja del trabajo.|彼はいつも仕事の文句を言っています。
w370|Quítate los zapatos, por favor.|靴を脱いでください。
w371|Recibí tu mensaje.|メッセージを受け取りました。
w372|Nos reímos mucho.|私たちはたくさん笑いました。
w373|¿Puede repetir, por favor?|もう一度言ってもらえますか？
w374|Quiero reservar una mesa.|テーブルを予約したいです。
w375|Se rompió el vaso.|コップが割れました。
w376|Saluda a tu madre de mi parte.|お母さんによろしく伝えてね。
w377|Siéntate aquí.|ここに座って。
w378|¿Para qué sirve esto?|これは何に使うの？
w379|Suena el teléfono.|電話が鳴っています。
w380|Soñé contigo.|君の夢を見たよ。
w381|Subimos al tercer piso.|3階に上がります。
w382|Bajo del autobús aquí.|ここでバスを降ります。
w383|Sufre mucho por el calor.|暑さでとても苦しんでいます。
w384|No tires basura en la calle.|道にごみを捨てないで。
w385|Toco la guitarra.|ギターを弾きます。
w386|¿Puedes traducir esto?|これを訳してくれる？
w387|¿Cuánto vale?|いくらですか？
w388|Me visto rápido.|急いで服を着ます。
w389|Visito a mis abuelos los domingos.|日曜日に祖父母を訪ねます。
w390|Los pájaros vuelan alto.|鳥が高く飛んでいます。
w391|Te muestro mi casa.|家を案内するね。
w392|Cuenta hasta diez.|10まで数えて。
w393|Te invito a cenar.|夕食をごちそうするよ。
w394|Necesito descansar un poco.|少し休む必要があります。
w395|Hay mucha gente aquí.|ここは人がたくさんいます。
w396|Ese chico es mi primo.|あの男の子は私のいとこです。
w397|La chica habla japonés.|その女の子は日本語を話します。
w398|El bebé duerme.|赤ちゃんが眠っています。
w399|Mi tío vive en el campo.|おじは田舎に住んでいます。
w400|Mi tía cocina muy bien.|おばは料理がとても上手です。
w401|Mi primo tiene veinte años.|いとこは20歳です。
w402|Mi nieto tiene tres años.|孫は3歳です。
w403|Su novio es argentino.|彼女の恋人はアルゼンチン人です。
w404|Mi novia es muy simpática.|僕の恋人はとても感じがいいです。
w405|Mi vecino tiene un perro.|隣の人は犬を飼っています。
w406|Mi jefe es muy amable.|上司はとても親切です。
w407|El profesor habla despacio.|先生はゆっくり話します。
w408|Soy estudiante.|私は学生です。
w409|Necesito un médico.|医者が必要です。
w410|La enfermera es muy amable.|看護師さんはとても親切です。
w411|Llame a la policía.|警察を呼んでください。
w412|El cliente espera en la tienda.|お客さんが店で待っています。
w413|El camarero trae la cuenta.|ウェイターがお会計を持ってきます。
w414|El conductor del autobús es simpático.|バスの運転手は感じがいいです。
w415|Mi hermano es abogado.|兄は弁護士です。
w416|Trabajo en una oficina.|事務所で働いています。
w417|Estudio en la universidad.|大学で勉強しています。
w418|Leo en la biblioteca.|図書館で読書をします。
w419|Vamos al museo el domingo.|日曜日に美術館に行きましょう。
w420|La iglesia es muy antigua.|その教会はとても古いです。
w421|¿Hay una farmacia cerca?|近くに薬局はありますか？
w422|Voy al supermercado.|スーパーに行きます。
w423|La panadería abre temprano.|パン屋は朝早く開きます。
w424|Tomamos algo en el bar.|バーで何か飲みましょう。
w425|Vamos al cine esta noche.|今夜、映画館に行こう。
w426|El teatro está en el centro.|劇場は中心街にあります。
w427|Mando una carta por correo.|手紙を郵便で送ります。
w428|Vivo en ese edificio.|あの建物に住んでいます。
w429|Vivo en el quinto piso.|5階に住んでいます。
w430|Mi apartamento es pequeño.|私のアパートは小さいです。
w431|Hay flores en el jardín.|庭に花があります。
w432|Mis abuelos viven en el campo.|祖父母は田舎に住んでいます。
w433|Es un pueblo tranquilo.|静かな村です。
w434|Subimos a la montaña.|山に登ります。
w435|Nadamos en el río.|川で泳ぎます。
w436|El lago es muy bonito.|湖はとてもきれいです。
w437|Japón es un país de islas.|日本は島国です。
w438|Cruzamos el puente.|橋を渡ります。
w439|La tienda está en la esquina.|お店は角にあります。
w440|Vamos al centro.|中心街に行きましょう。
w441|Vivo en el norte de Japón.|日本の北部に住んでいます。
w442|Argentina está en el sur.|アルゼンチンは南にあります。
w443|Vemos la tele en la sala.|居間でテレビを見ます。
w444|El dormitorio es grande.|寝室は広いです。
w445|Hay una foto en la pared.|壁に写真が飾ってあります。
w446|El gato duerme en el suelo.|猫が床で寝ています。
w447|El techo es muy alto.|天井がとても高いです。
w448|Enciende la luz, por favor.|電気をつけてください。
w449|Me miro en el espejo.|鏡で自分を見ます。
w450|El perro duerme en el sofá.|犬がソファーで寝ています。
w451|La ropa está en el armario.|服はたんすの中にあります。
w452|Veo la televisión con mi familia.|家族とテレビを見ます。
w453|Escucho la radio en el auto.|車でラジオを聞きます。
w454|Mi reloj no funciona.|私の時計が動きません。
w455|¿Tienes papel?|紙を持ってる？
w456|Escribo con lápiz.|鉛筆で書きます。
w457|¿Me prestas un bolígrafo?|ボールペンを貸してくれる？
w458|Escribo las palabras en mi cuaderno.|ノートに単語を書きます。
w459|Mi mochila es azul.|私のリュックは青いです。
w460|Lleva el paraguas, va a llover.|傘を持って行って、雨が降るよ。
w461|No veo bien sin gafas.|眼鏡がないとよく見えません。
w462|Me gusta tu camisa.|君のシャツ、いいね。
w463|Compré una camiseta en Buenos Aires.|ブエノスアイレスでTシャツを買いました。
w464|Este pantalón es muy cómodo.|このズボンはとても楽です。
w465|Ella lleva una falda roja.|彼女は赤いスカートをはいています。
w466|¡Qué vestido tan bonito!|なんてきれいなドレス！
w467|Necesito zapatos nuevos.|新しい靴が必要です。
w468|Hace frío, ponte el abrigo.|寒いからコートを着て。
w469|Mi abuelo lleva sombrero.|祖父は帽子をかぶっています。
w470|No encuentro el otro calcetín.|もう片方の靴下が見つかりません。
w471|Quítate la chaqueta.|上着を脱いで。
w472|La sopa está caliente.|スープが熱いです。
w473|Quiero una ensalada.|サラダをください。
w474|Me gustan las papas fritas.|フライドポテトが好きです。
w475|Compro tomates en el mercado.|市場でトマトを買います。
w476|No me gusta la cebolla.|玉ねぎが苦手です。
w477|La comida tiene mucho ajo.|料理ににんにくがたくさん入っています。
w478|Como un plátano en el desayuno.|朝食にバナナを食べます。
w479|Las uvas son muy dulces.|ぶどうがとても甘いです。
w480|Me encantan las fresas.|いちごが大好きです。
w481|Un té con limón, por favor.|レモンティーをください。
w482|Quiero un jugo de manzana.|りんごジュースが欲しいです。
w483|Vamos a comer helado.|アイスクリームを食べに行こう。
w484|Hice un pastel de cumpleaños.|誕生日ケーキを作りました。
w485|Me gusta el chocolate.|チョコレートが好きです。
w486|Los niños comen galletas.|子どもたちがクッキーを食べています。
w487|Pan con mantequilla, por favor.|バターをつけたパンをください。
w488|Cocino con aceite de oliva.|オリーブオイルで料理します。
w489|Sal y pimienta, por favor.|塩とこしょうをください。
w490|No como cerdo.|豚肉は食べません。
w491|Un sándwich de jamón y queso.|ハムとチーズのサンドイッチ。
w492|¿Qué hay de postre?|デザートは何がありますか？
w493|¿Qué bebida quieres?|飲み物は何にする？
w494|Una botella de agua, por favor.|水を1本ください。
w495|Una taza de café, por favor.|コーヒーを1杯ください。
w496|Necesito una cuchara.|スプーンが必要です。
w497|Como con tenedor.|フォークで食べます。
w498|Cuidado, el cuchillo corta mucho.|気をつけて、ナイフがよく切れるよ。
w499|Lávate la cara.|顔を洗いなさい。
w500|Tiene el pelo negro.|黒い髪をしています。
w501|Me duele la nariz.|鼻が痛いです。
w502|Me duele la oreja.|耳が痛いです。
w503|Me lavo los dientes.|歯を磨きます。
w504|Me duele el brazo.|腕が痛いです。
w505|Me duelen las piernas.|脚が痛いです。
w506|Me corté el dedo.|指を切りました。
w507|Me duele la espalda.|背中が痛いです。
w508|Tengo dolor de estómago.|胃が痛いです。
w509|Mañana voy a donar sangre.|明日献血に行きます。
w510|Tengo dolor de cabeza.|頭痛がします。
w511|Mi hijo tiene fiebre.|息子は熱があります。
w512|Toma esta medicina después de comer.|食後にこの薬を飲んでください。
w513|¡Salud!|乾杯！
w514|El cielo está despejado.|空が晴れわたっています。
w515|Hay muchas nubes hoy.|今日は雲が多いです。
w516|Hace mucho viento.|風が強いです。
w517|En invierno hay nieve.|冬は雪が降ります。
w518|Hay muchas estrellas esta noche.|今夜は星がたくさん出ています。
w519|La luna está muy bonita.|月がとてもきれいです。
w520|La Tierra es redonda.|地球は丸いです。
w521|Hay una piedra en el camino.|道に石があります。
w522|Hay un árbol grande en el parque.|公園に大きな木があります。
w523|Las hojas son verdes.|葉っぱは緑色です。
w524|Me gustan los animales.|動物が好きです。
w525|Hay un pájaro en el árbol.|木に鳥がとまっています。
w526|El caballo corre rápido.|馬が速く走ります。
w527|La vaca da leche.|牛は牛乳を出します。
w528|Hay peces en el río.|川に魚がいます。
w529|En primavera hay muchas flores.|春は花がたくさん咲きます。
w530|En verano hace calor.|夏は暑いです。
w531|Me gusta el otoño.|秋が好きです。
w532|En invierno hace frío.|冬は寒いです。
w533|Espera un minuto.|ちょっと待って。
w534|Comemos al mediodía.|お昼の12時に食べます。
w535|Llegué a medianoche.|真夜中に着きました。
w536|¿Qué haces el fin de semana?|週末は何をするの？
w537|¿Qué fecha es hoy?|今日は何日ですか？
w538|Pasado mañana es sábado.|あさっては土曜日です。
w539|Anteayer llovió mucho.|おとといは雨がたくさん降りました。
w540|Mi cumpleaños es en enero.|私の誕生日は1月です。
w541|En febrero hace frío.|2月は寒いです。
w542|En marzo empieza la primavera.|3月に春が始まります。
w543|En abril hay muchas flores.|4月は花がたくさん咲きます。
w544|Vamos de viaje en mayo.|5月に旅行に行きます。
w545|En junio llueve mucho.|6月は雨がよく降ります。
w546|En julio empiezan las vacaciones.|7月に休みが始まります。
w547|En agosto hace mucho calor.|8月はとても暑いです。
w548|Las clases empiezan en septiembre.|授業は9月に始まります。
w549|En octubre hace fresco.|10月は涼しいです。
w550|En noviembre llueve poco.|11月は雨が少ないです。
w551|En diciembre celebramos la Navidad.|12月はクリスマスを祝います。
w552|Mi hija tiene once años.|娘は11歳です。
w553|Comemos a las doce.|12時に食べます。
w554|Espera quince minutos.|15分待ってください。
w555|Son veinte pesos.|20ペソです。
w556|El mes tiene treinta días.|1か月は30日あります。
w557|Mi padre tiene cincuenta años.|父は50歳です。
w558|Hay cien personas.|100人います。
w559|Cuesta mil yenes.|1000円です。
w560|La ciudad tiene un millón de habitantes.|その町の人口は100万人です。
w561|Es mi primer viaje a Argentina.|初めてのアルゼンチン旅行です。
w562|Vivo en el segundo piso.|2階に住んでいます。
w563|Es el último tren.|最終電車です。
w564|Voy al parque cada día.|毎日公園に行きます。
w565|Tengo varios amigos en México.|メキシコに友達が何人かいます。
w566|Mi madre es muy joven.|母はとても若いです。
w567|Tu hermano es muy simpático.|君のお兄さんはとても感じがいいね。
w568|Usted es muy amable.|ご親切にありがとうございます。
w569|¡Qué guapo estás hoy!|今日はかっこいいね！
w570|Mi gato está gordo.|うちの猫は太っています。
w571|Ella es alta y delgada.|彼女は背が高くてやせています。
w572|Mi padre es muy fuerte.|父はとても力が強いです。
w573|Me siento débil.|体に力が入りません。
w574|Tu hija es muy inteligente.|君の娘さんはとても頭がいいね。
w575|No seas tonto.|ばかなこと言わないで。
w576|El pueblo es muy tranquilo.|その村はとても静かです。
w577|Estoy nervioso por el examen.|試験で緊張しています。
w578|¿Por qué estás enojado?|どうして怒っているの？
w579|Estoy preocupado por mi hijo.|息子のことが心配です。
w580|La película es aburrida.|その映画は退屈です。
w581|El viaje fue muy divertido.|旅行はとても楽しかったです。
w582|Es un libro muy interesante.|とても面白い本です。
w583|Este sofá es muy cómodo.|このソファーはとても快適です。
w584|La habitación está limpia.|部屋はきれいです。
w585|Tus zapatos están sucios.|君の靴は汚れているよ。
w586|El tren está lleno.|電車は満員です。
w587|La botella está vacía.|瓶は空っぽです。
w588|¿Está abierto el museo?|美術館は開いていますか？
w589|La tienda está cerrada.|お店は閉まっています。
w590|¿Está libre esta silla?|この椅子は空いていますか？
w591|Este barrio es seguro.|この地区は安全です。
w592|Es peligroso nadar aquí.|ここで泳ぐのは危険です。
w593|¿Es posible cambiar la fecha?|日付を変えることはできますか？
w594|Es imposible llegar a tiempo.|間に合うのは無理です。
w595|No es necesario.|必要ありません。
w596|La respuesta es correcta.|答えは正しいです。
w597|Eso es falso.|それはうそです。
w598|Es una historia verdadera.|本当の話です。
w599|La habitación está oscura.|部屋が暗いです。
w600|La sala es muy clara.|居間はとても明るいです。
w601|Hoy el cielo está gris.|今日は空が灰色です。
w602|Tengo los ojos marrones.|私の目は茶色です。
w603|Me gusta el color rosa.|ピンク色が好きです。
w604|Casi termino.|もうすぐ終わります。
w605|Entonces, ¿vamos?|じゃあ、行こうか？
w606|Se hace así.|こうやってやります。
w607|Hablas bastante bien.|かなり上手に話せますね。
w608|Es demasiado caro.|高すぎます。
w609|Solo quiero un café.|コーヒーだけ欲しいです。
w610|Vamos juntos.|一緒に行こう。
w611|Hasta pronto.|またすぐにね。
w612|Me levanto temprano.|早く起きます。
w613|Hasta luego.|またあとで。
w614|Dilo otra vez, por favor.|もう一度言ってください。
w615|A veces cocino.|ときどき料理します。
w616|Habla despacio, por favor.|ゆっくり話してください。
w617|Me siento mejor.|気分がよくなりました。
w618|Hoy el tiempo está peor.|今日は天気がもっと悪いです。
w619|Quizás llueva mañana.|たぶん明日は雨でしょう。
w620|¡Ojalá haga sol!|晴れるといいな！
w621|Mi habitación está arriba.|私の部屋は上の階です。
w622|Te espero abajo.|下で待ってるね。
w623|El gato está dentro de la caja.|猫が箱の中にいます。
w624|Los niños juegan fuera.|子どもたちは外で遊んでいます。
w625|El taxi espera delante del hotel.|タクシーはホテルの前で待っています。
w626|El jardín está detrás de la casa.|庭は家の裏にあります。
w627|Trabajo hasta las seis.|6時まで働きます。
w628|Vivo aquí desde 2020.|2020年からここに住んでいます。
w629|El banco está entre la farmacia y el café.|銀行は薬局とカフェの間にあります。
w630|El libro está sobre la mesa.|本はテーブルの上にあります。
w631|Cuando llueve, me quedo en casa.|雨のときは家にいます。
w632|Aunque está cansado, trabaja.|疲れていても、彼は働きます。
w633|Habla como un nativo.|ネイティブのように話します。
w634|Según la radio, va a llover.|ラジオによると、雨が降るそうです。
w635|Caminamos hacia el centro.|中心街の方へ歩きます。
w636|¿Vos sos de Buenos Aires?|君はブエノスアイレス出身？
w637|¿Vosotros sois de Madrid?|君たちはマドリード出身？
w638|Nuestra casa es pequeña.|私たちの家は小さいです。
w639|Tienes razón.|君の言うとおりだ。
w640|¿De verdad?|本当に？
w641|¡Buena idea!|いい考えだね！
w642|Eso es mentira.|それはうそだ。
w643|Gracias por tu ayuda.|手伝ってくれてありがとう。
w644|Perdón, fue un error.|ごめんなさい、間違いでした。
w645|Aquí tiene su cambio.|おつりです。
w646|La cuenta, por favor.|お会計をお願いします。
w647|¿Cuál es tu número de teléfono?|電話番号は何番？
w648|¿Cuál es su dirección?|ご住所はどちらですか？
w649|No sé la respuesta.|答えがわかりません。
w650|Tengo una buena noticia.|いい知らせがあります。
w651|Te dejo un mensaje.|メッセージを残しておくね。
w652|Olvidé mi contraseña.|パスワードを忘れました。
w653|Hay una fiesta el sábado.|土曜日にパーティーがあります。
w654|¡Feliz cumpleaños!|お誕生日おめでとう！
w655|¡Buen viaje!|よい旅を！
w656|Estoy de vacaciones.|休暇中です。
w657|Es un juego para niños.|子ども向けのゲームです。
w658|¿Qué deporte te gusta?|どのスポーツが好き？
w659|Los argentinos aman el fútbol.|アルゼンチン人はサッカーが大好きです。
w660|Vamos a ver el partido.|試合を見に行こう。
w661|¿Cuál es tu equipo favorito?|好きなチームはどこ？
w662|Me gusta la historia de Japón.|日本の歴史が好きです。
w663|Por ejemplo, el arroz.|たとえば、お米。
w664|Vivo en esta parte de la ciudad.|町のこのあたりに住んでいます。
w665|Es un lugar muy bonito.|とてもきれいな場所です。
w666|Por fin llegamos.|やっと着きました。
w667|Al principio fue difícil.|初めは難しかったです。
w668|Corta el pan por la mitad.|パンを半分に切って。
w669|Tengo miedo de los perros.|犬が怖いです。
w670|Tengo mucho sueño.|とても眠いです。
w671|Tengo hambre.|お腹がすきました。
w672|Tengo sed.|のどが渇きました。
w673|¡Buena suerte!|幸運を祈ります！
w674|Queremos vivir en paz.|平和に暮らしたいです。
w675|La guerra es terrible.|戦争はひどいものです。
w676|Me gusta el arte moderno.|現代アートが好きです。
w677|¿De qué color es tu auto?|君の車は何色？
w678|Tiene forma de corazón.|ハートの形をしています。
w679|¿Tiene otro tamaño?|ほかのサイズはありますか？
w680|¿Cuál es el peso de la maleta?|スーツケースの重さはどのくらいですか？
w681|Mide dos metros.|長さは2メートルです。
w682|Voy de compras.|買い物に行きます。
w683|Hay una oferta hoy.|今日は特売があります。
w684|¿Puedo pagar con tarjeta?|カードで払えますか？
w685|Solo tengo billetes grandes.|大きいお札しかありません。
w686|No tengo monedas.|小銭がありません。
w687|Necesito un boleto de ida y vuelta.|往復の切符が必要です。
w688|¿Me lo muestras en el mapa?|地図で見せてくれる？
w689|Vamos a la isla en barco.|船で島に行きます。
w690|Mi hermano tiene una moto.|兄はバイクを持っています。
w691|¿Tiene su pasaporte?|パスポートはお持ちですか？
w692|Mi maleta es muy pesada.|スーツケースがとても重いです。
w693|¿Dónde recojo el equipaje?|荷物はどこで受け取りますか？
w694|Hay muchos turistas en la plaza.|広場には観光客がたくさんいます。
w695|¿Dónde está la salida?|出口はどこですか？
w696|La entrada es gratis.|入場は無料です。
w697|Espera, el semáforo está en rojo.|待って、信号が赤だよ。
w698|¿Dónde está la parada del autobús?|バス停はどこですか？
`;

export const EXAMPLES_ES = Object.fromEntries(
  RAW.trim().split('\n').map((line) => {
    const [id, text, ja] = line.split('|');
    return [id, { text, ja }];
  }),
);
