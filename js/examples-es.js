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
w699|Mucho gusto, me llamo Ana.|はじめまして、アナです。
w700|¡Bienvenido a nuestra casa!|わが家へようこそ！
w701|Un vaso de agua, por favor.|お水を1杯お願いします。
w702|De nada, fue un placer ayudarte.|どういたしまして、手伝えてうれしかったよ。
w703|Lo siento, llegué tarde.|ごめんなさい、遅れました。
w704|Buenos días, mamá.|おはよう、ママ。
w705|Buenas noches, que duermas bien.|おやすみ、ぐっすり眠ってね。
w706|Hasta luego, nos vemos mañana.|またね、明日会おう。
w707|Tu mochila está ahí.|君のリュックはそこにあるよ。
w708|Mis abuelos viven allá.|祖父母はあそこに住んでいます。
w709|Ven acá, por favor.|こっちに来て。
w710|Mi número de teléfono empieza con cero.|私の電話番号はゼロから始まります。
w711|El señor Pérez es muy amable.|ペレスさんはとても親切です。
w712|La señora López vende flores.|ロペスさんは花を売っています。
w713|Esa señorita es mi maestra.|あのお嬢さんは私の先生です。
w714|Mi abuelo tiene ochenta años.|祖父は80歳です。
w715|Mi abuela cocina muy bien.|祖母は料理がとても上手です。
w716|Mi sobrino juega al fútbol.|甥はサッカーをします。
w717|Mi nieta tiene cinco años.|孫娘は5歳です。
w718|Mi prima vive en México.|私のいとこはメキシコに住んでいます。
w719|Mi papá es muy gracioso.|父はとても面白いです。
w720|¿Me haces un favor?|ちょっと頼みを聞いてくれる？
w721|La clase empieza a las ocho.|授業は8時に始まります。
w722|Mamá, tengo hambre.|ママ、おなかすいた。
w723|Papá trabaja en una oficina.|パパは事務所で働いています。
w724|Mi compañero de clase es muy simpático.|私のクラスメートはとても感じがいいです。
w725|El maestro explica la lección.|先生が課の説明をします。
w726|Hay veinte alumnos en mi clase.|私のクラスには生徒が20人います。
w727|Voy al colegio en bicicleta.|自転車で学校に行きます。
w728|El aula está en el segundo piso.|教室は2階にあります。
w729|Mañana tengo un examen de inglés.|明日英語の試験があります。
w730|Ya terminé mi tarea.|もう宿題を終えました。
w731|Hoy estudiamos la lección cinco.|今日は第5課を勉強します。
w732|La maestra escribe en la pizarra.|先生が黒板に書きます。
w733|¿Me prestas tu goma?|消しゴムを貸してくれる？
w734|Necesito una regla para la tarea.|宿題に定規が必要です。
w735|Corta el papel con la tijera.|はさみで紙を切って。
w736|Abran el libro en la página diez.|本の10ページを開いてください。
w737|Tu letra es muy bonita.|君の字はとてもきれいだね。
w738|Lee esta frase en voz alta.|この文を声に出して読んで。
w739|Saqué una buena nota en matemáticas.|数学でいい成績をとりました。
w740|¿Cuál es tu materia favorita?|好きな科目は何？
w741|Me gustan mucho las matemáticas.|数学が大好きです。
w742|Me interesa mucho la ciencia.|科学にとても興味があります。
w743|Mi hermano habla inglés muy bien.|兄は英語がとても上手です。
w744|Estudio español todos los días.|毎日スペイン語を勉強しています。
w745|Mi amiga quiere aprender japonés.|友だちは日本語を学びたがっています。
w746|Me gusta bailar con mi familia.|家族と踊るのが好きです。
w747|Mi hermana canta muy bien.|姉は歌がとても上手です。
w748|Hoy va a llover mucho.|今日はたくさん雨が降りそうです。
w749|En invierno nieva en la montaña.|冬は山で雪が降ります。
w750|¿A qué hora regresas a casa?|何時に家に帰る？
w751|Saca el libro de la mochila.|リュックから本を出して。
w752|Mi papá maneja con cuidado.|父は慎重に運転します。
w753|Te devuelvo el libro mañana.|明日本を返すね。
w754|Me encanta el chocolate.|チョコレートが大好きです。
w755|Practico piano todas las tardes.|毎日午後にピアノを練習します。
w756|Mi hijo pinta un árbol.|息子が木の絵を描いています。
w757|Le ofrecí ayuda a mi vecina.|隣の人に手伝いを申し出ました。
w758|La mamá besa al bebé.|お母さんが赤ちゃんにキスします。
w759|Abrazo a mi abuela.|おばあちゃんを抱きしめます。
w760|Corta el pan, por favor.|パンを切ってください。
w761|Escoge un color.|色を一つ選んで。
w762|Agarra mi mano.|私の手をつかんで。
w763|No comprendo esta pregunta.|この質問がわかりません。
w764|Mi papá plancha su camisa.|父は自分のシャツにアイロンをかけます。
w765|Barro el piso de la cocina.|台所の床を掃きます。
w766|Ordena tu cuarto, por favor.|部屋を片付けてね。
w767|Hierve el agua para el té.|お茶のためにお湯を沸かして。
w768|Mi abuela fríe pescado.|祖母は魚を揚げます。
w769|Calienta la sopa, por favor.|スープを温めてください。
w770|Mezcla la harina con el huevo.|小麦粉と卵を混ぜて。
w771|Me acuesto a las diez.|10時に寝ます。
w772|No importa, no pasa nada.|大丈夫、気にしないで。
w773|Me interesa la historia.|私は歴史に興味があります。
w774|¿Te molesta la música?|音楽、うるさくない？
w775|Gira a la derecha en la esquina.|角を右に曲がって。
w776|Dobla a la izquierda en el semáforo.|信号を左に曲がって。
w777|No puedes estacionar aquí.|ここには駐車できません。
w778|¿Cuánto me cobra por esto?|これはいくらになりますか？
w779|Ahorro dinero para un viaje.|旅行のためにお金を貯めています。
w780|¿Me prestas tu lápiz?|鉛筆を貸してくれる？
w781|Me gusta charlar con mis amigas.|友だちとおしゃべりするのが好きです。
w782|Avísame cuando llegues.|着いたら知らせてね。
w783|No grites, el bebé duerme.|叫ばないで、赤ちゃんが寝てるよ。
w784|La niña sonríe en la foto.|女の子は写真でほほえんでいます。
w785|El perro salta muy alto.|犬はとても高く跳びます。
w786|Las hojas caen en otoño.|秋には葉が落ちます。
w787|Empuja la puerta para abrir.|ドアを押して開けて。
w788|Levanta la mano si sabes.|わかったら手を挙げて。
w789|Lanza la pelota a tu hermano.|弟にボールを投げて。
w790|Mi abuelo pesca en el río.|祖父は川で釣りをします。
w791|Me gusta montar a caballo.|乗馬が好きです。
w792|La película comienza a las siete.|映画は7時に始まります。
w793|Nos mudamos a otra ciudad.|私たちは別の町に引っ越します。
w794|Le regalé flores a mi mamá.|母に花を贈りました。
w795|Suma dos más tres.|2たす3を計算して。
w796|Resta dos a cinco.|5から2を引いて。
w797|¿Cuánto mides?|身長はどれくらい？
w798|¿Cuánto pesa la maleta?|スーツケースの重さはどれくらい？
w799|Odio levantarme temprano.|早起きは大嫌いです。
w800|Amo a mi familia.|私は家族を愛しています。
w801|Te extraño mucho, abuela.|おばあちゃん、とても会いたいよ。
w802|Te deseo un feliz cumpleaños.|誕生日おめでとう。
w803|Imagina una casa en la playa.|浜辺の家を想像してみて。
w804|Copia las palabras en tu cuaderno.|ノートに単語を写して。
w805|La maestra corrige los exámenes.|先生が試験を採点します。
w806|Almorzamos juntos a la una.|1時に一緒にお昼を食べます。
w807|Vacía la basura, por favor.|ごみ箱を空にしてね。
w808|Enciende la luz, por favor.|電気をつけてください。
w809|Prende la tele, por favor.|テレビをつけて。
w810|Conecta el cable a la computadora.|ケーブルをコンピューターにつないで。
w811|Voy a descargar una aplicación.|アプリをダウンロードします。
w812|Necesito imprimir la tarea.|宿題を印刷しないと。
w813|Marca la respuesta correcta.|正しい答えに印をつけて。
w814|Cuelga tu abrigo aquí.|コートをここに掛けて。
w815|Mi papá repara la bicicleta.|父が自転車を修理しています。
w816|Los niños crean un cuento juntos.|子どもたちが一緒にお話を作ります。
w817|Utiliza el diccionario en clase.|授業では辞書を使って。
w818|Mete la ropa en la maleta.|服をスーツケースに入れて。
w819|Coloca los platos en la mesa.|お皿をテーブルに並べて。
w820|El niño esconde el chocolate.|男の子がチョコレートを隠します。
w821|Señala el país en el mapa.|地図でその国を指さして。
w822|Observamos las estrellas por la noche.|夜に星を観察します。
w823|El sol aparece detrás de la montaña.|山の後ろから太陽が現れます。
w824|Mi gato desapareció ayer.|昨日うちの猫がいなくなりました。
w825|Me peino antes de salir.|出かける前に髪をとかします。
w826|Mi hermana se maquilla en el baño.|姉は洗面所で化粧をします。
w827|Mi papá se afeita cada mañana.|父は毎朝ひげをそります。
w828|Me cepillo los dientes tres veces al día.|1日3回歯を磨きます。
w829|Ponte la chaqueta, hace frío.|上着を着て、寒いよ。
w830|¿Cómo te llamas?|名前は何ていうの？
w831|Ya me voy, hasta mañana.|もう帰るね、また明日。
w832|Se enamoró de su compañera.|彼は同級生に恋をしました。
w833|Perdón, me equivoqué de número.|すみません、番号を間違えました。
w834|¿Te acuerdas de mi nombre?|私の名前、覚えてる？
w835|Tengo ganas de comer helado.|アイスが食べたいな。
w836|Mi hijo cumple diez años hoy.|息子は今日10歳になります。
w837|¿Tienes una mascota en casa?|家でペットを飼ってる？
w838|Un ratón corre por la cocina.|ネズミが台所を走っています。
w839|El conejo come zanahorias.|ウサギはニンジンを食べます。
w840|El oso duerme en invierno.|クマは冬に眠ります。
w841|El león es el rey de la selva.|ライオンはジャングルの王様です。
w842|El tigre tiene rayas negras.|トラには黒いしま模様があります。
w843|El elefante tiene orejas grandes.|ゾウは大きな耳をしています。
w844|El mono come un plátano.|サルがバナナを食べています。
w845|La jirafa tiene el cuello largo.|キリンは首が長いです。
w846|La oveja nos da lana.|羊は私たちに羊毛をくれます。
w847|La gallina pone huevos.|ニワトリは卵を産みます。
w848|Hay patos en el lago.|湖にアヒルがいます。
w849|La serpiente vive en el bosque.|ヘビは森に住んでいます。
w850|La rana salta al agua.|カエルが水に跳びこみます。
w851|Una mariposa vuela en el jardín.|庭でチョウが飛んでいます。
w852|La abeja hace miel.|ハチははちみつを作ります。
w853|Las hormigas trabajan mucho.|アリはよく働きます。
w854|Hay una mosca en la sopa.|スープにハエが入っています。
w855|Un mosquito me picó en el brazo.|蚊に腕を刺されました。
w856|Mi hermana tiene miedo de las arañas.|姉はクモが怖いです。
w857|La tortuga camina muy lento.|カメはとてもゆっくり歩きます。
w858|Vimos delfines en el mar.|海でイルカを見ました。
w859|La ballena es un animal enorme.|クジラはとても大きな動物です。
w860|El tiburón tiene dientes grandes.|サメには大きな歯があります。
w861|El lobo aúlla de noche.|オオカミは夜に遠ぼえします。
w862|El zorro es muy listo.|キツネはとても賢いです。
w863|El toro es fuerte y grande.|雄牛は強くて大きいです。
w864|El burro lleva la carga.|ロバが荷物を運びます。
w865|Me gusta buscar insectos en el parque.|公園で虫を探すのが好きです。
w866|Ella tiene el cabello largo.|彼女は髪が長いです。
w867|Me duele el cuello.|首が痛いです。
w868|El niño duerme en mi hombro.|子どもが私の肩で眠っています。
w869|Me caí y me lastimé la rodilla.|転んでひざをけがしました。
w870|No pongas los codos en la mesa.|テーブルにひじをつかないで。
w871|Córtate las uñas, por favor.|爪を切ってね。
w872|Tengo los labios secos.|唇が乾いています。
w873|El perro saca la lengua.|犬が舌を出しています。
w874|Mi papá tiene cejas gruesas.|父は眉が太いです。
w875|Tienes fiebre, tu frente está caliente.|熱があるね、おでこが熱いよ。
w876|La abuela me besa en la mejilla.|おばあちゃんが私のほおにキスします。
w877|Mi abuelo tiene barba blanca.|祖父は白いあごひげがあります。
w878|Usa crema para la piel.|肌にクリームを塗って。
w879|El perro come un hueso.|犬が骨をかじっています。
w880|Me duele la garganta.|のどが痛いです。
w881|Me duele el pecho al toser.|せきをすると胸が痛いです。
w882|Me duele la barriga.|おなかが痛いです。
w883|Me duele una muela.|奥歯が痛いです。
w884|Tengo tos desde ayer.|昨日からせきが出ます。
w885|Mi hermano tiene gripe.|兄はインフルエンザにかかっています。
w886|Tengo un resfriado fuerte.|ひどい風邪をひいています。
w887|Lava bien la herida.|傷をよく洗って。
w888|Toma una pastilla después de comer.|食後に錠剤を1つ飲んでね。
w889|El médico me dio una receta.|医者が処方箋をくれました。
w890|Mañana voy al dentista.|明日歯医者に行きます。
w891|El paciente espera al doctor.|患者が医者を待っています。
w892|¡Llamen una ambulancia!|救急車を呼んで！
w893|La clínica abre a las nueve.|診療所は9時に開きます。
w894|Mi mamá tiene cuarenta años.|母は40歳です。
w895|Una hora tiene sesenta minutos.|1時間は60分です。
w896|Mi abuelo tiene setenta años.|祖父は70歳です。
w897|El libro cuesta ochenta pesos.|その本は80ペソです。
w898|Saqué noventa en el examen.|試験で90点をとりました。
w899|La entrada cuesta doscientos pesos.|入場料は200ペソです。
w900|Hay quinientos alumnos en la escuela.|学校には500人の生徒がいます。
w901|Vivo en el tercer piso.|私は3階に住んでいます。
w902|Mi cuarto es pequeño.|私の部屋は小さいです。
w903|Estoy en quinto grado.|私は5年生です。
w904|Mi hermana tiene trece años.|姉は13歳です。
w905|Hay catorce niños en el parque.|公園に子どもが14人います。
w906|Mi primo tiene dieciséis años.|いとこは16歳です。
w907|Faltan diecisiete días para Navidad.|クリスマスまであと17日です。
w908|Mi hermano cumple dieciocho años.|兄は18歳になります。
w909|Hay diecinueve libros en la mesa.|テーブルに本が19冊あります。
w910|Mi cumpleaños es el veinticinco de mayo.|私の誕生日は5月25日です。
w911|Encantado de conocerte.|お会いできてうれしいです。
w912|Disculpa, ¿qué hora es?|すみません、今何時ですか？
w913|¡Chau, nos vemos!|バイバイ、またね！
w914|¡Qué genial tu dibujo!|君の絵、すごいね！
w915|Tu español es perfecto.|君のスペイン語は完璧だね。
w916|¿Estás listo para salir?|出かける準備はできた？
w917|Estoy muy contento con mi regalo.|プレゼントにとても満足しています。
w918|Mi tía es una persona alegre.|おばは陽気な人です。
w919|Mi hermano está enamorado.|兄は恋をしています。
w920|Es un cantante muy famoso.|彼はとても有名な歌手です。
w921|Este juego es muy popular.|このゲームはとても人気があります。
w922|Mi prima tiene el pelo rubio.|いとこは金髪です。
w923|Mi papá es moreno y alto.|父は色黒で背が高いです。
w924|El niño pelirrojo es mi vecino.|赤毛の男の子は近所の子です。
w925|Mi abuelo está calvo.|祖父ははげています。
w926|Este río es muy ancho.|この川はとても幅が広いです。
w927|La calle es muy estrecha.|その通りはとても狭いです。
w928|La mesa es redonda.|テーブルは丸いです。
w929|La ventana es cuadrada.|窓は四角いです。
w930|Esta caja es muy pesada.|この箱はとても重いです。
w931|Mi mochila es ligera.|私のリュックは軽いです。
w932|El pan está duro.|パンが硬くなっています。
w933|Esta almohada es muy blanda.|この枕はとても柔らかいです。
w934|La piel del bebé es muy suave.|赤ちゃんの肌はとても柔らかいです。
w935|Este pastel es muy dulce.|このケーキはとても甘いです。
w936|La sopa está muy salada.|スープがとてもしょっぱいです。
w937|Me gusta la comida picante.|辛い料理が好きです。
w938|El café sin azúcar es amargo.|砂糖なしのコーヒーは苦いです。
w939|El limón es muy ácido.|レモンはとても酸っぱいです。
w940|La comida de mi abuela es sabrosa.|祖母の料理はおいしいです。
w941|¡Este helado está delicioso!|このアイス、とてもおいしい！
w942|El pescado está fresco.|魚は新鮮です。
w943|El agua está tibia.|お湯がぬるいです。
w944|Tengo los zapatos mojados.|靴が濡れています。
w945|La ropa ya está seca.|洗濯物はもう乾いています。
w946|¡Qué paisaje tan hermoso!|なんて美しい景色！
w947|Este suéter es un poco feo.|このセーターはちょっとかっこ悪いです。
w948|Tu vestido es precioso.|君のワンピース、すてきだね。
w949|Mi abuelo tiene un reloj antiguo.|祖父は古い時計を持っています。
w950|Es un edificio muy moderno.|とても近代的な建物です。
w951|Cada niño es distinto.|子どもはみんなそれぞれ違います。
w952|Tenemos gustos diferentes.|私たちは好みが違います。
w953|Tu camisa es igual a la mía.|君のシャツは私のと同じだね。
w954|Eres muy parecido a tu papá.|君はお父さんにとても似ているね。
w955|Hoy es un día especial.|今日は特別な日です。
w956|Hoy fue un día normal.|今日はふつうの一日でした。
w957|Es raro ver nieve aquí.|ここで雪を見るのは珍しいです。
w958|Escuché un ruido extraño.|変な音が聞こえました。
w959|Es un plato típico de México.|それはメキシコの代表的な料理です。
w960|El azul es mi color favorito.|青は私のお気に入りの色です。
w961|¿Cuál es tu comida preferida?|一番好きな食べ物は何？
w962|Esta es la calle principal.|これが大通りです。
w963|Es una receta muy sencilla.|とても簡単なレシピです。
w964|Este problema es complicado.|この問題は複雑です。
w965|Mi computadora es muy lenta.|私のコンピューターはとても遅いです。
w966|La biblioteca es un lugar silencioso.|図書館は静かな場所です。
w967|Mi vecino es muy ruidoso.|隣の人はとてもうるさいです。
w968|Mi papá está bravo porque no hice la tarea.|宿題をしなかったので父は怒っています。
w969|Mi hermano es muy valiente.|兄はとても勇敢です。
w970|Mi hija es un poco tímida.|娘は少し内気です。
w971|El maestro es muy serio.|先生はとてもまじめです。
w972|Tu hijo es muy educado.|息子さんはとても礼儀正しいですね。
w973|Siempre hay que ser honesto.|いつも正直でいなければなりません。
w974|Mi mamá es muy trabajadora.|母はとても働き者です。
w975|El gato es muy perezoso.|猫はとても怠け者です。
w976|Mi abuelo es muy generoso.|祖父はとても気前がいいです。
w977|No seas egoísta, comparte.|わがまま言わないで、分けてあげて。
w978|El perro está celoso del bebé.|犬は赤ちゃんにやきもちを焼いています。
w979|Estoy orgulloso de ti.|君のことを誇りに思うよ。
w980|Todos estaban sorprendidos con la noticia.|みんなその知らせに驚いていました。
w981|El niño está asustado por la tormenta.|男の子は嵐を怖がっています。
w982|Estoy emocionado por el viaje.|旅行にわくわくしています。
w983|El bebé está dormido.|赤ちゃんは眠っています。
w984|¿Todavía estás despierto?|まだ起きてるの？
w985|El pez todavía está vivo.|魚はまだ生きています。
w986|La planta está muerta.|植物が枯れています。
w987|Mi celular está roto.|携帯が壊れています。
w988|Comer frutas es muy sano.|果物を食べるのはとても健康的です。
w989|La entrada es gratis para niños.|子どもは入場無料です。
w990|Me gusta el vestido morado.|紫のワンピースが好きです。
w991|Lleva una blusa violeta.|彼女はすみれ色のブラウスを着ています。
w992|El cielo está celeste hoy.|今日の空は水色です。
w993|Tengo un reloj dorado.|金色の時計を持っています。
w994|El auto de mi tío es plateado.|おじの車は銀色です。
w995|Pinté el sol de color anaranjado.|太陽をオレンジ色で塗りました。
w996|Mi mamá tiene un anillo de oro.|母は金の指輪を持っています。
w997|Este collar es de plata.|このネックレスは銀でできています。
w998|La puerta es de hierro.|そのドアは鉄でできています。
w999|La mesa es de madera.|テーブルは木でできています。
w1000|Cuidado, el vaso es de vidrio.|気をつけて、コップはガラスだよ。
w1001|Esta botella es de plástico.|このボトルはプラスチック製です。
w1002|Mi camiseta es de algodón.|私のTシャツは綿です。
w1003|La abuela teje con lana.|祖母は毛糸で編み物をします。
w1004|Tengo una chaqueta de cuero.|革のジャケットを持っています。
w1005|Compré tela para hacer cortinas.|カーテンを作るために布を買いました。
w1006|Tengo las llaves en el bolsillo.|鍵はポケットに入っています。
w1007|Se cayó un botón de mi camisa.|シャツのボタンが取れました。
w1008|Ponte el cinturón de seguridad.|シートベルトを締めて。
w1009|Mi papá usa corbata en el trabajo.|父は仕事でネクタイを締めます。
w1010|Ponte la bufanda, hace frío.|マフラーをして、寒いよ。
w1011|No encuentro mis guantes.|手袋が見つかりません。
w1012|Me pongo la gorra para el sol.|日差しよけにキャップをかぶります。
w1013|Uso botas cuando llueve.|雨の日はブーツをはきます。
w1014|En verano uso sandalias.|夏はサンダルをはきます。
w1015|Necesito zapatillas nuevas para correr.|走るための新しいスニーカーが必要です。
w1016|Ponte el pijama, ya es tarde.|パジャマを着て、もう遅いよ。
w1017|Mi papá lleva un traje negro.|父は黒いスーツを着ています。
w1018|Los alumnos llevan uniforme azul.|生徒たちは青い制服を着ています。
w1019|Mi mamá tiene una blusa blanca.|母は白いブラウスを持っています。
w1020|Este suéter es muy calientito.|このセーターはとても暖かいです。
w1021|Me gustan estos jeans azules.|この青いジーンズが好きです。
w1022|En la playa uso short.|ビーチでは短パンをはきます。
w1023|Guarda la ropa interior en el cajón.|下着は引き出しにしまって。
w1024|Mi abuela tiene un anillo antiguo.|祖母は古い指輪を持っています。
w1025|Le regalé un collar a mi mamá.|母にネックレスを贈りました。
w1026|Mi hermana perdió un arete.|姉がイヤリングを片方なくしました。
w1027|Mi cartera está en la mesa.|私の財布はテーブルの上にあります。
w1028|Mi papá perdió su billetera.|父が財布をなくしました。
w1029|Guardo las monedas en el monedero.|小銭は小銭入れにしまいます。
w1030|¿Dónde está mi peine?|私のくしはどこ？
w1031|Necesito un cepillo de dientes nuevo.|新しい歯ブラシが必要です。
w1032|Se acabó la pasta de dientes.|歯磨き粉がなくなりました。
w1033|Lávate las manos con jabón.|石けんで手を洗って。
w1034|Este champú huele muy rico.|このシャンプーはとてもいい香りです。
w1035|Toma una toalla limpia.|きれいなタオルをどうぞ。
w1036|No hay papel higiénico en el baño.|トイレにトイレットペーパーがありません。
w1037|Me gusta una almohada suave.|柔らかい枕が好きです。
w1038|Tengo frío, dame una manta.|寒いから毛布をちょうだい。
w1039|Cambia las sábanas de la cama.|ベッドのシーツを替えて。
w1040|Este colchón es muy cómodo.|このマットレスはとても寝心地がいいです。
w1041|Apaga la lámpara, por favor.|ランプを消してください。
w1042|Abre las cortinas, ya es de día.|カーテンを開けて、もう朝だよ。
w1043|El gato duerme en la alfombra.|猫がじゅうたんの上で寝ています。
w1044|Pon los libros en el estante.|本を棚に置いて。
w1045|Las cucharas están en el cajón.|スプーンは引き出しの中です。
w1046|Hago la tarea en mi escritorio.|自分の机で宿題をします。
w1047|Uso la computadora para estudiar.|勉強にコンピューターを使います。
w1048|La pantalla del celular está rota.|携帯の画面が割れています。
w1049|Este teclado no tiene la letra ñ.|このキーボードにはñの文字がありません。
w1050|¿Dónde dejé mi celular?|携帯どこに置いたっけ？
w1051|Llevo la cámara al viaje.|旅行にカメラを持っていきます。
w1052|Compramos un televisor nuevo.|新しいテレビを買いました。
w1053|La leche está en el refrigerador.|牛乳は冷蔵庫の中にあります。
w1054|El pan está en el horno.|パンはオーブンの中です。
w1055|Calienta la leche en el microondas.|牛乳を電子レンジで温めて。
w1056|La olla está en la estufa.|鍋はコンロの上にあります。
w1057|Pon la ropa sucia en la lavadora.|汚れた服を洗濯機に入れて。
w1058|Prende el aire acondicionado, hace calor.|暑いからエアコンをつけて。
w1059|El ventilador está roto.|扇風機が壊れています。
w1060|En invierno usamos la calefacción.|冬は暖房を使います。
w1061|Saca la basura, por favor.|ごみを出してね。
w1062|Sube por la escalera, el ascensor no funciona.|階段で上がって、エレベーターが動かないの。
w1063|Tomamos el ascensor al quinto piso.|エレベーターで5階に行きます。
w1064|El auto está en el garaje.|車はガレージにあります。
w1065|Hay flores en el balcón.|バルコニーに花があります。
w1066|Cenamos en la terraza.|テラスで夕食をとります。
w1067|Los niños juegan en el patio.|子どもたちは中庭で遊んでいます。
w1068|Dame un vaso de agua.|水を1杯ちょうだい。
w1069|Lava los platos después de comer.|食べたあとはお皿を洗って。
w1070|La sopa está en la olla.|スープは鍋の中です。
w1071|Calienta el aceite en la sartén.|フライパンで油を熱して。
w1072|Pásame una servilleta, por favor.|ナプキンを取ってください。
w1073|Pon el mantel en la mesa.|テーブルにテーブルクロスをかけて。
w1074|Hay una jarra de jugo en la mesa.|テーブルにジュースの入ったピッチャーがあります。
w1075|Sirvo el jugo en copas para la fiesta.|パーティー用にジュースをグラスに注ぎます。
w1076|Abre la lata de atún.|ツナ缶を開けて。
w1077|Los juguetes están en la caja.|おもちゃは箱の中です。
w1078|Llegó un paquete para ti.|君宛ての小包が届いたよ。
w1079|No comas mucha comida rápida.|ファストフードを食べすぎないで。
w1080|Quiero una hamburguesa con papas.|ポテト付きのハンバーガーが欲しいです。
w1081|Pedimos una pizza grande.|大きいピザを注文しました。
w1082|Llevo un sándwich para el almuerzo.|お昼にサンドイッチを持っていきます。
w1083|Esta noche cenamos pasta.|今夜の夕食はパスタです。
w1084|Me gusta la sopa de fideos.|麺入りスープが好きです。
w1085|Comemos salchichas en el desayuno.|朝ごはんにソーセージを食べます。
w1086|Compramos carne de res para la cena.|夕食用に牛肉を買いました。
w1087|Mi papá prepara un bistec delicioso.|父はおいしいステーキを作ります。
w1088|Quiero un filete de pescado.|魚の切り身をください。
w1089|Me encantan los camarones fritos.|エビフライが大好きです。
w1090|Hago un sándwich de atún.|ツナサンドを作ります。
w1091|El salmón es mi pescado favorito.|サケは私の好きな魚です。
w1092|Comemos arroz con frijoles.|豆ごはんを食べます。
w1093|La sopa de lentejas es muy sana.|レンズ豆のスープはとても健康的です。
w1094|Las tortillas se hacen con maíz.|トルティーヤはトウモロコシで作ります。
w1095|Lava bien la lechuga.|レタスをよく洗って。
w1096|El conejo come una zanahoria.|ウサギがニンジンを食べています。
w1097|Pongo pepino en la ensalada.|サラダにキュウリを入れます。
w1098|No me gusta el pimiento verde.|緑のピーマンは好きじゃありません。
w1099|Las espinacas son muy sanas.|ホウレンソウはとても体にいいです。
w1100|Hacemos sopa de calabaza.|カボチャのスープを作ります。
w1101|La pizza tiene champiñones.|そのピザにはマッシュルームがのっています。
w1102|Me gusta el pan con aguacate.|アボカドをのせたパンが好きです。
w1103|La piña está muy dulce.|パイナップルはとても甘いです。
w1104|En verano comemos sandía.|夏はスイカを食べます。
w1105|Este melón huele muy bien.|このメロンはとてもいい香りがします。
w1106|El durazno es mi fruta favorita.|モモは私の好きな果物です。
w1107|Quiero una pera, por favor.|洋ナシを1つください。
w1108|Hay cerezas en el pastel.|ケーキにサクランボがのっています。
w1109|El jugo de mango es delicioso.|マンゴージュースはおいしいです。
w1110|El kiwi tiene mucha vitamina C.|キウイにはビタミンCがたくさんあります。
w1111|Bebemos agua de coco en la playa.|浜辺でココナッツウォーターを飲みます。
w1112|Pongo nueces en el pastel.|ケーキにクルミを入れます。
w1113|Me gusta el té con miel.|はちみつ入りの紅茶が好きです。
w1114|Unto mermelada en el pan.|パンにジャムを塗ります。
w1115|Como yogur con fruta.|果物入りのヨーグルトを食べます。
w1116|Ponle crema al café.|コーヒーにクリームを入れて。
w1117|Necesitamos harina para el pastel.|ケーキに小麦粉が必要です。
w1118|Pon un poco de vinagre en la ensalada.|サラダに酢を少し入れて。
w1119|Esta salsa es muy picante.|このソースはとても辛いです。
w1120|El niño quiere un caramelo.|男の子はあめを欲しがっています。
w1121|Me encanta el pan con dulce de leche.|パンにドゥルセ・デ・レチェをつけるのが大好きです。
w1122|Hicimos una torta de chocolate.|チョコレートケーキを作りました。
w1123|Desayuno una tostada con mantequilla.|朝食にバタートーストを食べます。
w1124|Los niños comen cereal con leche.|子どもたちは牛乳をかけたシリアルを食べます。
w1125|¿Quieres un refresco?|ジュース飲む？
w1126|Una gaseosa de naranja, por favor.|オレンジの炭酸飲料をください。
w1127|Compré una botella de agua mineral.|ミネラルウォーターを1本買いました。
w1128|Pon hielo en mi vaso, por favor.|私のコップに氷を入れてください。
w1129|Me tomo un batido de fresa.|イチゴシェイクを飲みます。
w1130|¿Qué hay de merienda hoy?|今日のおやつは何？
w1131|¿Me trae el menú, por favor?|メニューを持ってきてもらえますか？
w1132|El plato principal es pollo con arroz.|メイン料理はチキンとごはんです。
w1133|Quiero una porción de pastel.|ケーキを一切れください。
w1134|Dejamos una propina para el mesero.|ウェイターにチップを置きました。
w1135|El mesero nos trae la comida.|ウェイターが料理を運んできます。
w1136|Mi tío es cocinero en un hotel.|おじはホテルの料理人です。
w1137|Compro pollo en la carnicería.|肉屋で鶏肉を買います。
w1138|Las verduras de la verdulería son frescas.|八百屋の野菜は新鮮です。
w1139|Voy a la frutería por manzanas.|リンゴを買いに果物屋へ行きます。
w1140|Compré un libro en la librería.|書店で本を買いました。
w1141|Necesito ir a la papelería por cuadernos.|ノートを買いに文房具店に行かないと。
w1142|Mi mamá va a la peluquería los sábados.|母は土曜日に美容院へ行きます。
w1143|Compramos botas en la zapatería.|靴屋でブーツを買いました。
w1144|Los niños quieren ir a la juguetería.|子どもたちはおもちゃ屋に行きたがっています。
w1145|Vamos a la heladería después de cenar.|夕食のあとアイス屋さんに行こう。
w1146|Compro el periódico en el kiosco.|売店で新聞を買います。
w1147|Vamos al centro comercial el domingo.|日曜日にショッピングモールに行きます。
w1148|Paramos en la gasolinera.|ガソリンスタンドに寄ります。
w1149|La comisaría está cerca del parque.|警察署は公園の近くにあります。
w1150|Mi hijo quiere ser bombero.|息子は消防士になりたがっています。
w1151|Trabajo en la municipalidad.|私は市役所で働いています。
w1152|Fuimos a la embajada de Japón.|日本大使館に行きました。
w1153|Vamos al zoológico a ver los leones.|ライオンを見に動物園へ行こう。
w1154|El estadio está lleno de gente.|スタジアムは人でいっぱいです。
w1155|Mi papá va al gimnasio por la mañana.|父は朝ジムに行きます。
w1156|Los niños nadan en la piscina.|子どもたちはプールで泳いでいます。
w1157|Jugamos fútbol en la cancha.|グラウンドでサッカーをします。
w1158|Mi tío trabaja en una fábrica.|おじは工場で働いています。
w1159|Mis abuelos tienen una granja.|祖父母は農場を持っています。
w1160|Caminamos por el bosque.|森の中を歩きます。
w1161|En la selva hay muchos animales.|ジャングルにはたくさんの動物がいます。
w1162|En el desierto hace mucho calor.|砂漠はとても暑いです。
w1163|Vivimos en la costa.|私たちは海岸沿いに住んでいます。
w1164|El océano Pacífico es muy grande.|太平洋はとても大きいです。
w1165|Desde aquí se ve el volcán.|ここから火山が見えます。
w1166|El pueblo está en un valle.|その村は谷間にあります。
w1167|Subimos la colina en bicicleta.|自転車で丘を登ります。
w1168|Los niños juegan en la arena.|子どもたちは砂で遊んでいます。
w1169|Hoy las olas son muy grandes.|今日は波がとても高いです。
w1170|¡Mira, hay un arcoíris!|見て、虹が出てるよ！
w1171|Anoche hubo una tormenta fuerte.|昨夜は激しい嵐でした。
w1172|El perro tiene miedo de los truenos.|犬は雷を怖がります。
w1173|Un rayo cayó en el árbol.|木に雷が落ちました。
w1174|Hay mucha niebla esta mañana.|今朝は霧が深いです。
w1175|El clima aquí es muy agradable.|ここの気候はとても快適です。
w1176|La temperatura bajó mucho hoy.|今日は気温がずいぶん下がりました。
w1177|Hoy estamos a treinta grados.|今日は30度です。
w1178|Hay mucha humedad en verano.|夏は湿気がすごいです。
w1179|Sentémonos a la sombra del árbol.|木陰に座りましょう。
w1180|Desde la montaña el paisaje es precioso.|山からの景色はすばらしいです。
w1181|La habitación tiene vista al mar.|その部屋からは海が見えます。
w1182|La tienda está en la avenida principal.|その店は大通りにあります。
w1183|Viajamos por la carretera a la playa.|幹線道路を通って海へ行きます。
w1184|Este camino va al río.|この道は川に通じています。
w1185|La escuela está a dos cuadras.|学校は2ブロック先です。
w1186|Mi barrio es muy tranquilo.|私の住む地区はとても静かです。
w1187|Camina por la acera, por favor.|歩道を歩いてね。
w1188|Compré el pasaje de autobús.|バスの乗車券を買いました。
w1189|¿Este asiento está libre?|この席は空いていますか？
w1190|El tren llega al andén dos.|電車は2番ホームに着きます。
w1191|Nuestro vuelo sale a las diez.|私たちの便は10時に出発します。
w1192|Un camión grande pasa por la calle.|大きなトラックが通りを走っています。
w1193|Mi tío tiene una camioneta roja.|おじは赤い小型トラックを持っています。
w1194|Baja la velocidad, por favor.|スピードを落としてください。
w1195|Hubo un accidente en la esquina.|角で事故がありました。
w1196|Hay mucho tráfico a esta hora.|この時間は道がとても混んでいます。
w1197|Marca la fecha en el calendario.|カレンダーに日付の印をつけて。
w1198|Me desperté de madrugada.|明け方に目が覚めました。
w1199|Vimos el amanecer en la playa.|浜辺で夜明けを見ました。
w1200|El atardecer en el mar es hermoso.|海の夕暮れは美しいです。
w1201|Este edificio es del siglo pasado.|この建物は前世紀のものです。
w1202|Viví en México una década.|私はメキシコに10年住んでいました。
w1203|En esa época no había internet.|その時代にはインターネットがありませんでした。
w1204|¿Qué quieres ser en el futuro?|将来、何になりたい？
w1205|Hay que vivir el presente.|今を生きなければなりません。
w1206|No hablemos del pasado.|過去の話はやめましょう。
w1207|Hoy en día todos tienen celular.|今日ではみんな携帯電話を持っています。
w1208|Anoche dormí muy bien.|昨夜はとてもよく眠れました。
w1209|Escucho música mientras cocino.|料理をしながら音楽を聴きます。
w1210|Recién llegué a casa.|今、家に着いたばかりです。
w1211|Vuelvo enseguida.|すぐに戻ります。
w1212|Apenas llegamos a tiempo.|かろうじて間に合いました。
w1213|Los niños juegan afuera.|子どもたちは外で遊んでいます。
w1214|Hace frío, vamos adentro.|寒いから中に入ろう。
w1215|El gato está encima de la mesa.|猫はテーブルの上にいます。
w1216|El perro duerme debajo de la cama.|犬はベッドの下で寝ています。
w1217|Hay árboles alrededor de la casa.|家の周りに木があります。
w1218|La farmacia está enfrente del banco.|薬局は銀行の向かいにあります。
w1219|Mi tío vive al lado.|おじは隣に住んでいます。
w1220|Siéntate junto a mí.|私のそばに座って。
w1221|Yo tampoco quiero ir.|私も行きたくありません。
w1222|Es barato y además muy rico.|安いし、そのうえとてもおいしい。
w1223|Incluso mi abuela usa internet.|祖母でさえインターネットを使います。
w1224|Solamente tengo cinco pesos.|5ペソしか持っていません。
w1225|Me gusta la fruta, especialmente el mango.|果物が好きで、特にマンゴーが好きです。
w1226|Realmente no sé qué hacer.|本当にどうしたらいいかわかりません。
w1227|Habla claramente, por favor.|はっきり話してください。
w1228|¿Qué hora es exactamente?|正確には何時ですか？
w1229|Seguramente va a llover.|きっと雨が降るでしょう。
w1230|Probablemente llegue tarde.|たぶん遅れて着きます。
w1231|Tal vez mañana vaya a la playa.|たぶん明日ビーチに行きます。
w1232|A lo mejor llueve esta tarde.|ひょっとすると今日の午後は雨かもしれません。
w1233|¿Puedes explicarlo de nuevo?|もう一度説明してくれる？
w1234|Mañana jugamos contra otro equipo.|明日は別のチームと対戦します。
w1235|Dormí durante el viaje.|旅行の間、眠っていました。
w1236|Es difícil; sin embargo, lo voy a intentar.|難しい。しかしながら、やってみます。
w1237|Trabajo todos los días excepto el domingo.|日曜日以外は毎日働いています。
w1238|¿Tienes alguna pregunta?|何か質問はありますか？
w1239|No tengo ningún problema.|何の問題もありません。
w1240|Puedes venir a cualquier hora.|何時に来てもいいですよ。
w1241|Ambos hermanos son muy altos.|兄弟は二人ともとても背が高いです。
w1242|Los demás niños ya se fueron.|他の子どもたちはもう帰りました。
w1243|No comas tanto.|そんなに食べないで。
w1244|Hoy hace menos frío que ayer.|今日は昨日ほど寒くありません。
w1245|Compré medio kilo de queso.|チーズを半キロ買いました。
w1246|Pagamos el doble por las entradas.|入場券に二倍の料金を払いました。
w1247|Necesito un par de zapatos nuevos.|新しい靴が一足必要です。
w1248|Compré una docena de huevos.|卵を1ダース買いました。
w1249|Un kilo de manzanas, por favor.|リンゴを1キロください。
w1250|Bebo dos litros de agua al día.|1日に2リットルの水を飲みます。
w1251|La mesa mide ochenta centímetros.|そのテーブルは80センチあります。
w1252|La playa está a dos kilómetros.|ビーチは2キロ先です。
w1253|No es azul, sino verde.|それは青ではなく緑です。
w1254|Tras la cena, salimos a caminar.|夕食の後、散歩に出かけました。
w1255|Habló ante mucha gente.|彼は大勢の人の前で話しました。
w1256|Disfruta tus vacaciones.|休暇を楽しんでね。
w1257|Hay que aprovechar el buen tiempo.|いい天気を生かさなきゃ。
w1258|Tenía lágrimas en los ojos.|彼女は目に涙を浮かべていました。
w1259|Tienes una sonrisa muy bonita.|あなたはとても素敵な笑顔ですね。
w1260|Su risa es muy alegre.|彼の笑い声はとても明るいです。
w1261|Tiene una mirada tranquila.|彼は穏やかなまなざしをしています。
w1262|Cada movimiento del bailarín es perfecto.|そのダンサーの動きはどれも完璧です。
w1263|Da un paso adelante.|一歩前に出て。
w1264|Mi abuela me dio un abrazo.|祖母が私を抱きしめてくれました。
w1265|Le di un beso a mi mamá.|母にキスをしました。
w1266|Dale saludos a tu familia.|ご家族によろしく伝えてね。
w1267|Mañana es la fiesta de despedida.|明日は送別会です。
w1268|Quedan dos galletas.|クッキーが2枚残っています。
w1269|Trato de comer más verduras.|もっと野菜を食べるようにしています。
w1270|El examen resultó muy fácil.|試験は結局とても簡単でした。
w1271|¿Crees que existen los fantasmas?|幽霊は存在すると思う？
w1272|Por fin logré terminar el libro.|ついにその本を読み終えることができました。
w1273|Conseguí boletos para el concierto.|コンサートのチケットを手に入れました。
w1274|Obtuvo una buena nota.|彼はいい成績を取りました。
w1275|Esta región produce mucho café.|この地域はコーヒーをたくさん生産しています。
w1276|Quiero realizar mi sueño.|夢を実現したいです。
w1277|Hay que mantener la casa limpia.|家をきれいに保たなければなりません。
w1278|Voy a considerar tu idea.|君のアイデアを検討してみるよ。
w1279|Permanecimos en casa todo el día.|私たちは一日中家にいました。
w1280|¿Qué sucedió anoche?|昨夜何が起こったの？
w1281|Convirtió el garaje en un taller.|彼はガレージを作業場に変えました。
w1282|La empresa desarrolla nuevos productos.|その会社は新製品を開発しています。
w1283|No te reconocí con ese sombrero.|その帽子をかぶっていたから君だとわからなかった。
w1284|¿Me puede indicar el camino?|道を教えていただけますか？
w1285|Establecieron la empresa en 1990.|彼らは1990年に会社を設立しました。
w1286|Los niños formaron un círculo.|子どもたちは輪を作りました。
w1287|¿El precio incluye el desayuno?|料金に朝食は含まれていますか？
w1288|Añade un poco de sal.|塩を少し加えて。
w1289|Agrega más azúcar al café.|コーヒーにもっと砂糖を入れて。
w1290|Los precios aumentaron mucho.|物価がかなり上がりました。
w1291|Quiero reducir el azúcar.|砂糖を減らしたいです。
w1292|La fiebre disminuyó por la noche.|夜になって熱が下がりました。
w1293|No compares a tus hijos.|子どもたちを比べないで。
w1294|Depende del clima.|天気次第です。
w1295|Este libro pertenece a mi padre.|この本は父のものです。
w1296|Hay que proteger la naturaleza.|自然を守らなければなりません。
w1297|El perro defiende la casa.|犬は家を守っています。
w1298|El equipo atacó en el segundo tiempo.|チームは後半に攻撃しました。
w1299|Evito comer muy tarde.|遅い時間に食べるのを避けています。
w1300|La lluvia nos impidió salir.|雨のせいで出かけられませんでした。
w1301|Tenemos que resolver este problema.|この問題を解決しなければなりません。
w1302|Ya solucionamos el problema.|もう問題は解決しました。
w1303|Mis hermanos discuten por todo.|兄弟たちは何でも言い争います。
w1304|Él lo niega todo.|彼はすべてを否定しています。
w1305|Admito que me equivoqué.|間違えたことを認めます。
w1306|Confío en ti.|君を信頼しているよ。
w1307|Dudo que venga hoy.|彼が今日来るとは思えません。
w1308|Supongo que tienes razón.|君の言う通りだと思うよ。
w1309|La policía sospecha del vecino.|警察は隣人を疑っています。
w1310|Te mereces un descanso.|君は休んで当然だよ。
w1311|Te agradezco mucho tu ayuda.|手伝ってくれて本当に感謝しています。
w1312|Te felicito por tu cumpleaños.|誕生日おめでとう。
w1313|Me despedí de mis amigos.|友達に別れを告げました。
w1314|Nos reunimos los domingos.|私たちは日曜日に集まります。
w1315|Me encontré con Ana en el mercado.|市場でアナに会いました。
w1316|¿Me acompañas al médico?|病院に一緒に来てくれる？
w1317|Ella dirige la orquesta.|彼女がオーケストラを指揮しています。
w1318|Vamos a organizar una fiesta.|パーティーを企画しよう。
w1319|Estamos planeando un viaje.|私たちは旅行を計画しています。
w1320|La policía investiga el caso.|警察がその事件を調査しています。
w1321|Hay que analizar los datos.|データを分析する必要があります。
w1322|Calcula cuánto cuesta todo.|全部でいくらかかるか計算して。
w1323|Mi hermana diseña ropa.|姉は服をデザインしています。
w1324|El huracán destruyó muchas casas.|ハリケーンは多くの家を破壊しました。
w1325|Cuidado, no te quemes.|気をつけて、やけどしないでね。
w1326|Las estrellas brillan en el cielo.|星が空で輝いています。
w1327|La luna ilumina el camino.|月が道を照らしています。
w1328|Alguien golpea la puerta.|誰かがドアをたたいています。
w1329|Pega la foto en el cuaderno.|写真をノートに貼って。
w1330|Átate los zapatos.|靴ひもを結びなさい。
w1331|¡Suelta mi mano!|手を放して！
w1332|Voy a recoger a los niños.|子どもたちを迎えに行きます。
w1333|Mi hijo colecciona estampillas.|息子は切手を集めています。
w1334|Reunimos dinero para el viaje.|旅行のためにお金を集めました。
w1335|Junta las sillas, por favor.|いすを寄せてください。
w1336|Hay que separar la basura.|ごみを分別しなければなりません。
w1337|Dividimos la pizza en ocho partes.|ピザを8つに分けました。
w1338|El maestro repartió los exámenes.|先生が試験を配りました。
w1339|Le pedí prestado un libro a mi tía.|おばに本を借りました。
w1340|Invirtió su dinero en una tienda.|彼はお金を店に投資しました。
w1341|El tiempo empeoró por la tarde.|午後になって天気が悪くなりました。
w1342|El médico curó la herida.|医者が傷を治療しました。
w1343|La herida sanó rápido.|傷はすぐに治りました。
w1344|Respira profundo.|深呼吸して。
w1345|El niño tose mucho por la noche.|その子は夜よくせきをします。
w1346|Estornudo mucho en primavera.|春はよくくしゃみが出ます。
w1347|Sudo mucho cuando corro.|走るとたくさん汗をかきます。
w1348|Estoy temblando de frío.|寒くて震えています。
w1349|Me sangra la nariz.|鼻血が出ています。
w1350|El niño vomitó en el auto.|その子は車の中で吐きました。
w1351|Me lastimé la rodilla jugando.|遊んでいてひざをけがしました。
w1352|Sus palabras me hirieron.|彼の言葉に傷つきました。
w1353|Se quebró un vaso.|コップが割れました。
w1354|Me torcí el tobillo.|足首をひねりました。
w1355|Caminar tanto me cansa.|こんなに歩くと疲れます。
w1356|Me relajo escuchando música.|音楽を聴いてリラックスします。
w1357|Los niños se aburren en casa.|子どもたちは家で退屈しています。
w1358|Me preocupa tu salud.|君の健康が心配です。
w1359|¡Me asustaste!|びっくりした！
w1360|Me sorprendió la noticia.|その知らせに驚きました。
w1361|Me alegra verte.|会えてうれしいよ。
w1362|No te enojes conmigo.|私に怒らないで。
w1363|No quería ofenderte.|あなたの気を悪くさせるつもりはなかった。
w1364|Te perdono.|許してあげる。
w1365|Se disculpó por llegar tarde.|彼は遅刻したことを謝りました。
w1366|No me arrepiento de nada.|何も後悔していません。
w1367|No te burles de tu hermano.|弟をからかわないで。
w1368|Ese vendedor me engañó.|あの店員にだまされました。
w1369|Me robaron la bicicleta.|自転車を盗まれました。
w1370|El perro se escapó del jardín.|犬が庭から逃げ出しました。
w1371|Los ladrones huyeron en un auto.|泥棒たちは車で逃げました。
w1372|El perro persigue al gato.|犬が猫を追いかけています。
w1373|No alcanzo la repisa de arriba.|上の棚に手が届きません。
w1374|¡Atrapa la pelota!|ボールをキャッチして！
w1375|Al gato le gusta cazar ratones.|猫はネズミを捕るのが好きです。
w1376|Mató un mosquito con la mano.|彼は手で蚊を殺しました。
w1377|El perro salvó al niño.|犬がその子を救いました。
w1378|Los bomberos rescataron al gato.|消防士たちが猫を救出しました。
w1379|Mis padres siempre me apoyan.|両親はいつも私を支えてくれます。
w1380|Mi amiga me animó a seguir.|友達が続けるよう励ましてくれました。
w1381|Te aconsejo descansar.|休んだほうがいいよ。
w1382|¿Qué plato me recomienda?|どの料理がおすすめですか？
w1383|Sugiero ir en tren.|電車で行くことを提案します。
w1384|Le propuso matrimonio en la playa.|彼はビーチでプロポーズしました。
w1385|Rechazó la invitación.|彼女は招待を断りました。
w1386|El niño se niega a comer verduras.|その子は野菜を食べるのを嫌がります。
w1387|Los niños obedecen a su madre.|子どもたちは母親の言うことを聞きます。
w1388|Está prohibido fumar aquí.|ここは禁煙です。
w1389|Nadie te obliga a ir.|誰も君に行けと強制していないよ。
w1390|El jefe exige puntualidad.|上司は時間厳守を求めています。
w1391|Fui a reclamar a la tienda.|店に苦情を言いに行きました。
w1392|Insiste en pagar la cuenta.|彼は勘定を払うと言い張っています。
w1393|Me convenciste.|君の話に納得したよ。
w1394|Lo persuadí de quedarse.|彼を説得して残ってもらいました。
w1395|Me cuesta expresar mis sentimientos.|自分の気持ちを表現するのが苦手です。
w1396|Te comunico que la reunión es mañana.|会議は明日だとお伝えします。
w1397|Nos informaron del cambio de horario.|時間の変更を知らされました。
w1398|Anunciaron el nombre del ganador.|優勝者の名前が発表されました。
w1399|¿Tiene algo que declarar?|何か申告するものはありますか？
w1400|Afirma que no vio nada.|彼は何も見なかったと断言しています。
w1401|No mencionó nada de la fiesta.|彼はパーティーのことに何も触れませんでした。
w1402|Me comentó que se va a mudar.|彼は引っ越すと話していました。
w1403|¿Qué opinas de esta idea?|このアイデアについてどう思う？
w1404|No critiques a los demás.|他人を批判しないで。
w1405|La maestra elogió su dibujo.|先生は彼の絵をほめました。
w1406|El abuelo narra historias antiguas.|祖父は昔話を語ります。
w1407|Nos relató su viaje a Perú.|彼はペルー旅行の話をしてくれました。
w1408|¿Cómo se pronuncia esta palabra?|この単語はどう発音しますか？
w1409|¿Puede deletrear su apellido?|名字のつづりを言っていただけますか？
w1410|¿Qué significa esta palabra?|この単語はどういう意味ですか？
w1411|Es difícil definir la felicidad.|幸せを定義するのは難しいです。
w1412|Demuéstrame que tienes razón.|君が正しいことを証明して。
w1413|Comprueba que la puerta esté cerrada.|ドアが閉まっているか確かめて。
w1414|Verifica los datos antes de enviar.|送る前にデータを確認して。
w1415|Quiero confirmar mi reserva.|予約を確認したいです。
w1416|Te aseguro que es verdad.|それは本当だと保証するよ。
w1417|La tienda garantiza el producto por un año.|店はその製品を1年間保証しています。
w1418|Te juro que no fui yo.|誓って、私じゃないよ。
w1419|Falló el último tiro.|最後のシュートを外しました。
w1420|El plan fracasó.|その計画は失敗しました。
w1421|Quiere triunfar como cantante.|彼女は歌手として成功したいと思っています。
w1422|Mañana compito en una carrera.|明日、レースに出場します。
w1423|Me inscribí en un curso de inglés.|英語の講座に申し込みました。
w1424|Hay que registrar al bebé.|赤ちゃんの届け出をしなければなりません。
w1425|Apunta mi número de teléfono.|私の電話番号をメモして。
w1426|Anoté la dirección en un papel.|住所を紙に書き留めました。
w1427|Tengo que entregar la tarea mañana.|明日宿題を提出しなければなりません。
w1428|Vivimos en una sociedad moderna.|私たちは現代社会に生きています。
w1429|El gobierno anunció nuevas leyes.|政府は新しい法律を発表しました。
w1430|El presidente dio un discurso.|大統領が演説をしました。
w1431|No me gusta hablar de política.|政治の話をするのは好きではありません。
w1432|Todos deben respetar la ley.|皆が法律を守らなければなりません。
w1433|Todos tienen derecho a la educación.|すべての人に教育を受ける権利があります。
w1434|Queremos justicia para todos.|すべての人のための正義を望みます。
w1435|La libertad es muy importante.|自由はとても大切です。
w1436|La seguridad de los niños es lo primero.|子どもの安全が第一です。
w1437|¡Cuidado! Hay peligro.|気をつけて！危険です。
w1438|Manejar con lluvia es un riesgo.|雨の中の運転は危険です。
w1439|La policía investiga el crimen.|警察はその犯罪を捜査しています。
w1440|Robar es un delito.|盗みは犯罪です。
w1441|El ladrón entró por la ventana.|泥棒は窓から入りました。
w1442|Ayudaron a las víctimas del terremoto.|地震の被災者を助けました。
w1443|El juez tomó una decisión.|裁判官は判決を下しました。
w1444|El juicio será el lunes.|裁判は月曜日です。
w1445|El ladrón fue a la cárcel.|泥棒は刑務所に入りました。
w1446|Me pusieron una multa por estacionar mal.|駐車違反で罰金を取られました。
w1447|Firma este documento, por favor.|この書類に署名してください。
w1448|Llene el formulario, por favor.|用紙に記入してください。
w1449|Los trámites tardan mucho.|手続きにとても時間がかかります。
w1450|Necesito permiso para salir.|外出するには許可が必要です。
w1451|Ya tengo licencia de conducir.|もう運転免許を持っています。
w1452|Muestre su carnet, por favor.|身分証を見せてください。
w1453|Necesito ver su documento de identidad.|身分証明書を見せていただく必要があります。
w1454|¿Cuál es su nacionalidad?|国籍はどちらですか？
w1455|Es un deber de todo ciudadano.|それはすべての市民の義務です。
w1456|La población de la ciudad crece.|その町の人口は増えています。
w1457|El pueblo tiene mil habitantes.|その村には千人の住民がいます。
w1458|Hay muchos extranjeros en esta ciudad.|この町には外国人がたくさんいます。
w1459|Mis abuelos eran inmigrantes.|私の祖父母は移民でした。
w1460|Cruzamos la frontera en autobús.|私たちはバスで国境を越えました。
w1461|Esta región es famosa por su vino.|この地域はワインで有名です。
w1462|Córdoba es una provincia de Argentina.|コルドバはアルゼンチンの州の一つです。
w1463|¿En qué estado de México vives?|メキシコのどの州に住んでいるの？
w1464|Lima es la capital de Perú.|リマはペルーの首都です。
w1465|Ayudamos a la comunidad.|私たちは地域社会を手伝っています。
w1466|Mi vecindario es muy tranquilo.|私の住む地区はとても静かです。
w1467|Vivo en una zona tranquila.|私は静かな地域に住んでいます。
w1468|Esta área es solo para empleados.|この区域は従業員専用です。
w1469|Es un territorio muy grande.|それはとても広い領土です。
w1470|Las naciones firmaron un acuerdo.|各国が協定に署名しました。
w1471|Extraña mucho su patria.|彼は祖国をとても恋しく思っています。
w1472|La bandera de Japón es blanca y roja.|日本の国旗は白と赤です。
w1473|Cantamos el himno nacional.|私たちは国歌を歌いました。
w1474|El rey vive en el palacio.|王様は宮殿に住んでいます。
w1475|La reina saludó a la gente.|女王は人々にあいさつしました。
w1476|El príncipe se casó con una actriz.|王子は女優と結婚しました。
w1477|Mi hija quiere ser princesa.|娘はお姫様になりたがっています。
w1478|Mi abuelo estuvo en el ejército.|祖父は軍隊にいました。
w1479|El soldado volvió a casa.|その兵士は家に帰りました。
w1480|Los soldados dejaron sus armas.|兵士たちは武器を置きました。
w1481|Ganaron la batalla.|彼らは戦いに勝ちました。
w1482|Celebramos la victoria del equipo.|チームの勝利を祝いました。
w1483|Fue una derrota difícil.|つらい負けでした。
w1484|No tengo enemigos.|私には敵はいません。
w1485|Somos aliados en este proyecto.|このプロジェクトでは私たちは味方同士です。
w1486|Trabajo en una empresa grande.|私は大企業で働いています。
w1487|Es una compañía de teléfonos.|それは電話会社です。
w1488|Mi tío tiene un negocio de ropa.|おじは服の商売をしています。
w1489|La industria del turismo es importante aquí.|ここでは観光産業が重要です。
w1490|El comercio con Asia ha crecido.|アジアとの貿易が伸びています。
w1491|La economía del país mejoró.|その国の経済は良くなりました。
w1492|Este producto es de buena calidad.|この製品は品質がいいです。
w1493|El servicio en este restaurante es excelente.|このレストランのサービスは最高です。
w1494|Prefiero calidad antes que cantidad.|量より質を選びます。
w1495|Comí una gran cantidad de arroz.|ご飯をたくさん食べました。
w1496|El costo del viaje es alto.|旅行の費用は高いです。
w1497|Este mes tuvimos muchos gastos.|今月は出費が多かったです。
w1498|La tienda tuvo buenas ganancias.|その店は大きな利益を上げました。
w1499|Fue una pérdida de tiempo.|時間の無駄でした。
w1500|Por fin pagué mi deuda.|やっと借金を返しました。
w1501|Pedí un préstamo al banco.|銀行にローンを申し込みました。
w1502|Hay que pagar los impuestos.|税金を払わなければなりません。
w1503|El salario mínimo subió este año.|今年、最低賃金が上がりました。
w1504|Me pagan el sueldo a fin de mes.|月末に給料が支払われます。
w1505|El pago se hace en efectivo.|支払いは現金で行います。
w1506|Me llegó la factura de la luz.|電気代の請求書が届きました。
w1507|¿Me da el recibo, por favor?|領収書をいただけますか？
w1508|¿Paga con tarjeta o en efectivo?|カードで払いますか、現金で払いますか？
w1509|Pagó con un cheque.|彼は小切手で払いました。
w1510|Gasté todos mis ahorros en el viaje.|旅行で貯金を全部使いました。
w1511|No tenemos presupuesto para eso.|それに使う予算はありません。
w1512|Busco empleo en una oficina.|事務所での仕事を探しています。
w1513|La empresa tiene cien empleados.|その会社には従業員が100人います。
w1514|Mi empleador es muy justo.|私の雇い主はとても公平です。
w1515|Los obreros construyen un edificio.|作業員たちがビルを建てています。
w1516|Quiero hablar con el gerente.|マネージャーと話したいです。
w1517|El director de la escuela es amable.|学校の校長先生は親切です。
w1518|La secretaria contestó el teléfono.|秘書が電話に出ました。
w1519|El vendedor me ayudó a elegir.|店員さんが選ぶのを手伝ってくれました。
w1520|Mi abuelo era comerciante.|祖父は商人でした。
w1521|¿Quién es el dueño de este perro?|この犬の飼い主は誰ですか？
w1522|Soy socio del club de tenis.|私はテニスクラブの会員です。
w1523|Mi colega me ayudó con el informe.|同僚が報告書を手伝ってくれました。
w1524|Tengo una reunión a las diez.|10時に会議があります。
w1525|Mañana tengo una entrevista de trabajo.|明日、就職の面接があります。
w1526|Firmé el contrato ayer.|昨日契約書にサインしました。
w1527|Estamos trabajando en un proyecto nuevo.|私たちは新しいプロジェクトに取り組んでいます。
w1528|¿Cuál es el plan para hoy?|今日の予定は何？
w1529|Mi objetivo es aprender español.|私の目的はスペイン語を学ぶことです。
w1530|Mi meta es correr diez kilómetros.|私の目標は10キロ走ることです。
w1531|Mañana sabremos el resultado.|明日結果がわかります。
w1532|¡Mucho éxito en tu examen!|試験がうまくいきますように！
w1533|Un fracaso no es el fin.|一度の失敗で終わりではありません。
w1534|Gracias por tu esfuerzo.|頑張ってくれてありがとう。
w1535|Tengo experiencia como profesor.|私は教師の経験があります。
w1536|Tiene mucha habilidad para dibujar.|彼は絵を描くのがとても上手です。
w1537|El estadio tiene capacidad para cincuenta mil personas.|そのスタジアムの収容人数は5万人です。
w1538|Tiene buenos conocimientos de historia.|彼は歴史の知識が豊富です。
w1539|Estudio la carrera de medicina.|私は医学部で学んでいます。
w1540|¿Cuál es su profesión?|ご職業は何ですか？
w1541|Mi padre aprendió el oficio de carpintero.|父は大工の仕事を覚えました。
w1542|Consiguió un puesto en el banco.|彼は銀行に職を得ました。
w1543|Ella tiene un cargo importante.|彼女は重要な役職に就いています。
w1544|¿Cuál es el horario de la tienda?|お店の営業時間は何時から何時ですか？
w1545|Espere su turno, por favor.|順番をお待ちください。
w1546|Tomemos un descanso de diez minutos.|10分休憩しましょう。
w1547|Mi padre espera su jubilación.|父は定年退職を待っています。
w1548|Hay una vacante en la oficina.|事務所に欠員が一つあります。
w1549|Envié mi currículum a la empresa.|会社に履歴書を送りました。
w1550|Mi hermano es ingeniero.|兄はエンジニアです。
w1551|El arquitecto diseñó la casa.|建築家がその家を設計しました。
w1552|Quiero ser científico.|科学者になりたいです。
w1553|Su madre es una gran artista.|彼の母親は偉大な芸術家です。
w1554|Picasso fue un pintor famoso.|ピカソは有名な画家でした。
w1555|Mi escritor favorito es García Márquez.|私の好きな作家はガルシア・マルケスです。
w1556|La periodista hizo muchas preguntas.|記者はたくさん質問しました。
w1557|El fotógrafo tomó fotos de la boda.|カメラマンが結婚式の写真を撮りました。
w1558|Mi tío es músico.|おじはミュージシャンです。
w1559|Ella es una cantante famosa.|彼女は有名な歌手です。
w1560|Ese actor es muy famoso en México.|その俳優はメキシコでとても有名です。
w1561|La actriz ganó un premio.|その女優は賞を取りました。
w1562|Quiere ser bailarín profesional.|彼はプロのダンサーになりたいと思っています。
w1563|Es una deportista muy disciplinada.|彼女はとても自己管理のできるスポーツ選手です。
w1564|Messi es un gran jugador.|メッシは偉大な選手です。
w1565|El entrenador habló con el equipo.|コーチはチームと話しました。
w1566|El árbitro pitó el final del partido.|審判が試合終了の笛を吹きました。
w1567|Mi equipo es el campeón.|私のチームがチャンピオンです。
w1568|El ganador recibe un trofeo.|勝者はトロフィーをもらいます。
w1569|No seas mal perdedor.|負けても文句を言わないで。
w1570|El carpintero hizo una mesa.|大工がテーブルを作りました。
w1571|Llevé el auto al mecánico.|車を整備士のところに持って行きました。
w1572|Llamamos al electricista.|電気屋さんを呼びました。
w1573|El plomero arregló el baño.|配管工がトイレを直しました。
w1574|Los agricultores cultivan maíz.|農家の人たちはトウモロコシを栽培しています。
w1575|Los campesinos trabajan desde temprano.|農民たちは朝早くから働きます。
w1576|El pescador salió al mar.|漁師は海に出ました。
w1577|El panadero se levanta muy temprano.|パン職人はとても早く起きます。
w1578|El carnicero cortó la carne.|肉屋さんが肉を切りました。
w1579|Mi peluquero es muy bueno.|私の美容師はとても腕がいいです。
w1580|El cartero trajo una carta.|郵便配達員が手紙を持ってきました。
w1581|El piloto habló por el altavoz.|パイロットがスピーカーで話しました。
w1582|La azafata nos trajo agua.|客室乗務員が水を持ってきてくれました。
w1583|El guía nos explicó la historia.|ガイドが私たちに歴史を説明してくれました。
w1584|Mi madre trabaja como traductora.|母は翻訳者として働いています。
w1585|Necesitamos un intérprete de japonés.|日本語の通訳が必要です。
w1586|Llevé al gato al veterinario.|猫を獣医に連れて行きました。
w1587|Pregúntale al farmacéutico.|薬剤師に聞いてみて。
w1588|Habló con un psicólogo.|彼は心理カウンセラーと話しました。
w1589|Mi tía es investigadora en una universidad.|おばは大学の研究者です。
w1590|Mi padre es funcionario del gobierno.|父は公務員です。
w1591|Ese político habla mucho.|あの政治家はよくしゃべります。
w1592|Su padre es militar.|彼の父は軍人です。
w1593|Tengo parientes en Chile.|チリに親戚がいます。
w1594|Mi suegro es muy simpático.|義父はとても感じがいいです。
w1595|Mi suegra cocina muy bien.|義母は料理がとても上手です。
w1596|Mi yerno es médico.|婿は医者です。
w1597|Mi nuera es de Colombia.|嫁はコロンビア出身です。
w1598|Mi cuñado vive en Lima.|義理の兄弟はリマに住んでいます。
w1599|Mi cuñada me regaló un libro.|義理の姉が本をくれました。
w1600|Mi bisabuelo vivió cien años.|曽祖父は100歳まで生きました。
w1601|Mi hermana tiene gemelos.|姉には双子がいます。
w1602|Mi abuelo es viudo.|祖父は妻を亡くしています。
w1603|Mi pareja es de Argentina.|私のパートナーはアルゼンチン出身です。
w1604|Llevan treinta años de matrimonio.|二人は結婚して30年になります。
w1605|La boda es en junio.|結婚式は6月です。
w1606|El divorcio fue difícil para los niños.|離婚は子どもたちにとってつらいものでした。
w1607|El embarazo dura nueve meses.|妊娠期間は9か月です。
w1608|Celebramos el nacimiento del bebé.|赤ちゃんの誕生を祝いました。
w1609|La muerte de su perro lo puso triste.|飼い犬の死で彼は悲しみました。
w1610|Fuimos al funeral de su abuela.|彼のおばあさんの葬儀に行きました。
w1611|Tuve una infancia feliz.|私は幸せな子ども時代を過ごしました。
w1612|En mi juventud viajé mucho.|若い頃、たくさん旅をしました。
w1613|Mi hijo ya es adolescente.|息子はもう10代です。
w1614|Los adultos pagan más.|大人は料金が高いです。
w1615|Ayudé a un anciano a cruzar la calle.|お年寄りが道を渡るのを手伝いました。
w1616|Mi generación creció con internet.|私の世代はインターネットと共に育ちました。
w1617|¿Qué edad tienes?|何歳ですか？
w1618|Quiero vivir en el campo en mi vejez.|老後は田舎で暮らしたいです。
w1619|¡Qué alegría verte!|会えてなんてうれしいんだろう！
w1620|Sentí mucha tristeza.|とても悲しくなりました。
w1621|La felicidad está en las cosas pequeñas.|幸せは小さなことの中にあります。
w1622|No pudo ocultar su enojo.|彼は怒りを隠せませんでした。
w1623|Me da rabia perder.|負けると頭にきます。
w1624|Le tengo temor a la oscuridad.|私は暗闇が怖いです。
w1625|¡Qué susto me diste!|びっくりしたじゃない！
w1626|¡Qué sorpresa verte aquí!|ここで会うなんてびっくり！
w1627|Me da vergüenza cantar.|歌うのは恥ずかしいです。
w1628|Mis hijos son mi orgullo.|子どもたちは私の誇りです。
w1629|Mi perro tiene celos del gato.|うちの犬は猫にやきもちを焼いています。
w1630|Me da envidia tu viaje.|君の旅行がうらやましいよ。
w1631|No me gusta la soledad.|一人ぼっちは好きではありません。
w1632|Nunca pierdas la esperanza.|決して希望を失わないで。
w1633|Tengo confianza en mi equipo.|自分のチームを信頼しています。
w1634|Si tienes dudas, pregúntame.|わからないことがあれば聞いてね。
w1635|Pide un deseo.|願い事をして。
w1636|Me hace mucha ilusión el viaje.|旅行がとても楽しみです。
w1637|Lloró de emoción.|彼女は感動して泣きました。
w1638|No quiero herir tus sentimientos.|君の気持ちを傷つけたくない。
w1639|Hoy estoy de buen humor.|今日は機嫌がいいです。
w1640|¡Ánimo! Tú puedes.|頑張って！君ならできるよ。
w1641|Le tengo mucho cariño a mi abuela.|私は祖母が大好きです。
w1642|El odio no resuelve nada.|憎しみは何も解決しません。
w1643|Hay que tratar a todos con respeto.|みんなに敬意を持って接しなければなりません。
w1644|Ten paciencia con tu hermano.|弟には我慢してあげて。
w1645|Hay que mantener la calma.|落ち着いていなければなりません。
w1646|El trabajo me causa mucho estrés.|仕事でとてもストレスがたまります。
w1647|Siento ansiedad antes de los exámenes.|試験の前は不安になります。
w1648|Gracias por tu preocupación.|心配してくれてありがとう。
w1649|Mi hijo tiene buen carácter.|息子は性格がいいです。
w1650|Tiene una personalidad muy alegre.|彼女はとても明るい性格です。
w1651|Es costumbre comer pavo en Navidad.|クリスマスに七面鳥を食べるのが習慣です。
w1652|Morderse las uñas es un mal hábito.|爪をかむのは悪い癖です。
w1653|Es una tradición de mi familia.|それは私の家族の伝統です。
w1654|Me interesa la cultura mexicana.|メキシコの文化に興味があります。
w1655|Respeto todas las religiones.|すべての宗教を尊重します。
w1656|Tiene mucha fe.|彼女は信仰が厚いです。
w1657|Mi abuela cree en Dios.|祖母は神を信じています。
w1658|Te quiero con toda mi alma.|心の底から愛しています。
w1659|Tiene un espíritu joven.|彼は気持ちが若いです。
w1660|Tengo la mente en blanco.|頭が真っ白です。
w1661|Tengo muy mala memoria.|私は記憶力がとても悪いです。
w1662|Tengo buenos recuerdos de esa playa.|あのビーチにはいい思い出があります。
w1663|Escribe tus pensamientos en un diario.|日記に自分の考えを書いて。
w1664|¿Cuál es tu opinión?|君の意見は？
w1665|Desde mi punto de vista, es un error.|私の観点からすると、それは間違いです。
w1666|Es una creencia muy antigua.|それは古くからの信仰です。
w1667|Te doy un consejo.|ひとつアドバイスをあげるね。
w1668|¿Tienes alguna sugerencia?|何か提案はある？
w1669|Aceptaron nuestra propuesta.|私たちの提案は受け入れられました。
w1670|Fue una decisión difícil.|難しい決断でした。
w1671|Mañana son las elecciones.|明日は選挙です。
w1672|No tenemos otra opción.|ほかに選択肢はありません。
w1673|Es una gran oportunidad.|それは大きなチャンスです。
w1674|Hay una posibilidad de lluvia.|雨の可能性があります。
w1675|No hay necesidad de gritar.|叫ぶ必要はありません。
w1676|Te ayudo con una condición.|一つ条件付きで手伝うよ。
w1677|La situación es complicada.|状況は複雑です。
w1678|Depende de las circunstancias.|事情によります。
w1679|En ese caso, te llamo mañana.|その場合は明日電話するね。
w1680|El hecho es que no tengo dinero.|実は、お金がないのです。
w1681|El suceso salió en las noticias.|その出来事はニュースに出ました。
w1682|El evento empieza a las ocho.|イベントは8時に始まります。
w1683|La boda fue un gran acontecimiento.|結婚式は大きな出来事でした。
w1684|Quiero hablar de un asunto importante.|大事な用件について話したいです。
w1685|Cambiemos de tema.|話題を変えましょう。
w1686|Es una cuestión de tiempo.|それは時間の問題です。
w1687|Explícame los detalles.|詳細を説明して。
w1688|Necesito tus datos personales.|あなたの個人情報が必要です。
w1689|Busco información sobre el museo.|博物館についての情報を探しています。
w1690|La educación es muy importante.|教育はとても大切です。
w1691|Trabaja en la enseñanza.|彼女は教育の仕事をしています。
w1692|El aprendizaje de idiomas lleva tiempo.|語学の学習には時間がかかります。
w1693|Dedico dos horas al estudio.|勉強に2時間かけています。
w1694|Hace una investigación sobre el clima.|彼は気候についての研究をしています。
w1695|Tomo un curso de cocina.|料理講座を受けています。
w1696|¿Cuál es el título del libro?|その本の題名は何ですか？
w1697|Recibí mi diploma ayer.|昨日卒業証書を受け取りました。
w1698|Ganó una beca para estudiar en España.|彼女はスペイン留学の奨学金を得ました。
w1699|Estudio en la Facultad de Derecho.|私は法学部で学んでいます。
w1700|Mi hija va al instituto.|娘は高校に通っています。
w1701|Voy a una academia de inglés.|私は英語の学校に通っています。
w1702|Mi asignatura favorita es historia.|私の好きな科目は歴史です。
w1703|Tenemos examen de geografía mañana.|明日は地理のテストがあります。
w1704|La física es difícil para mí.|私にとって物理は難しいです。
w1705|En la clase de química hacemos experimentos.|化学の授業では実験をします。
w1706|Me gusta estudiar biología.|生物学を勉強するのが好きです。
w1707|Leemos literatura española en clase.|授業でスペイン文学を読みます。
w1708|Mi hermano estudia filosofía.|兄は哲学を勉強しています。
w1709|Ella trabaja en informática.|彼女はIT関係の仕事をしています。
w1710|Hoy tenemos educación física.|今日は体育があります。
w1711|Mi hijo hizo un dibujo bonito.|息子がきれいな絵を描きました。
w1712|Hago ejercicio todas las mañanas.|毎朝運動をしています。
w1713|Mañana hay una prueba de matemáticas.|明日は数学のテストがあります。
w1714|Escribe un resumen del libro.|本の要約を書きなさい。
w1715|La redacción es para el lunes.|作文は月曜日までです。
w1716|Tengo que escribir un ensayo.|エッセイを書かなければなりません。
w1717|Terminé el informe esta tarde.|今日の午後、報告書を仕上げました。
w1718|¿Me prestas tus apuntes?|ノートを貸してくれる？
w1719|Busca la palabra en el diccionario.|辞書でその単語を調べて。
w1720|Hay una enciclopedia en la biblioteca.|図書館に百科事典があります。
w1721|Compré una revista de cocina.|料理の雑誌を買いました。
w1722|Mi abuelo lee el periódico cada día.|祖父は毎日新聞を読みます。
w1723|Escribo en mi diario por la noche.|夜に日記を書きます。
w1724|Leí un artículo interesante.|面白い記事を読みました。
w1725|Vi el anuncio en la televisión.|テレビでその広告を見ました。
w1726|Hay mucha publicidad en internet.|インターネットには広告がたくさんあります。
w1727|Este programa es muy divertido.|この番組はとても面白いです。
w1728|Cambia el canal, por favor.|チャンネルを変えてください。
w1729|Estoy viendo una serie nueva.|新しいドラマを見ています。
w1730|El último episodio fue increíble.|最終話はすごかったです。
w1731|A los niños les gustan los dibujos animados.|子どもたちはアニメが好きです。
w1732|Vimos un documental sobre animales.|動物のドキュメンタリーを見ました。
w1733|Vamos a un concierto el sábado.|土曜日にコンサートに行きます。
w1734|Esta canción es muy bonita.|この歌はとてもきれいです。
w1735|Mi hermano toca en una banda.|兄はバンドで演奏しています。
w1736|Trabajamos en grupo en clase.|授業ではグループで作業します。
w1737|La orquesta toca música clásica.|オーケストラがクラシック音楽を演奏します。
w1738|¿Tocas algún instrumento?|何か楽器を弾きますか？
w1739|Mi papá toca la guitarra.|父はギターを弾きます。
w1740|Mi hija aprende piano.|娘はピアノを習っています。
w1741|Ella toca el violín muy bien.|彼女はバイオリンがとても上手です。
w1742|El niño toca el tambor.|その子は太鼓をたたいています。
w1743|En la escuela tocamos la flauta.|学校で笛を吹きます。
w1744|Él toca la trompeta en la banda.|彼はバンドでトランペットを吹いています。
w1745|Esta música tiene buen ritmo.|この音楽はリズムがいいです。
w1746|Me gusta la melodía de esa canción.|その歌のメロディーが好きです。
w1747|Tienes una voz muy bonita.|とてもきれいな声ですね。
w1748|Hay mucho ruido en la calle.|通りがとてもうるさいです。
w1749|No me gusta ese sonido.|その音は好きではありません。
w1750|Por favor, silencio en la biblioteca.|図書館では静かにしてください。
w1751|El baile empieza a las ocho.|ダンスは8時に始まります。
w1752|Ella estudia danza clásica.|彼女はクラシックバレエを学んでいます。
w1753|Vimos una obra de teatro.|演劇を見ました。
w1754|Fuimos a una exposición de arte.|美術展に行きました。
w1755|Hay un cuadro en la pared.|壁に絵が掛かっています。
w1756|Esta escultura es muy antigua.|この彫刻はとても古いです。
w1757|Estoy leyendo una novela larga.|長い小説を読んでいます。
w1758|Mi mamá me lee un cuento.|母がお話を読んでくれます。
w1759|Escribí un poema para mi madre.|母のために詩を書きました。
w1760|Me gusta leer poesía.|詩を読むのが好きです。
w1761|¿Quién es el autor de este libro?|この本の著者は誰ですか？
w1762|Mi personaje favorito es el perro.|好きな登場人物は犬です。
w1763|El protagonista es un niño valiente.|主人公は勇敢な男の子です。
w1764|Leí el primer capítulo anoche.|昨夜、第1章を読みました。
w1765|Esa escena me hizo llorar.|その場面で泣いてしまいました。
w1766|El espectáculo fue maravilloso.|ショーは素晴らしかったです。
w1767|Leer es mi pasatiempo favorito.|読書は私の一番の趣味です。
w1768|Tiene afición por la música.|彼は音楽が趣味です。
w1769|Tengo una colección de sellos.|切手のコレクションを持っています。
w1770|El niño juega con su juguete.|その子はおもちゃで遊んでいます。
w1771|Mi hija tiene una muñeca nueva.|娘は新しい人形を持っています。
w1772|Los niños juegan con la pelota.|子どもたちはボールで遊んでいます。
w1773|Pásame el balón.|ボールをパスして。
w1774|El niño tiene un globo rojo.|その子は赤い風船を持っています。
w1775|Volamos una cometa en la playa.|浜辺で凧をあげました。
w1776|Hicimos un rompecabezas de mil piezas.|千ピースのパズルをしました。
w1777|Mi abuelo juega al ajedrez.|祖父はチェスをします。
w1778|Te escribí una carta.|君に手紙を書いたよ。
w1779|Tira el dado, por favor.|サイコロを振ってください。
w1780|Mi hijo juega videojuegos los domingos.|息子は日曜日にゲームをします。
w1781|Hago natación dos veces por semana.|週に2回水泳をしています。
w1782|¿Juegas al tenis?|テニスをしますか？
w1783|El béisbol es popular en México.|野球はメキシコで人気があります。
w1784|Él juega baloncesto en la escuela.|彼は学校でバスケットボールをしています。
w1785|Jugamos voleibol en la playa.|浜辺でバレーボールをしました。
w1786|Ella practica atletismo.|彼女は陸上競技をしています。
w1787|El ciclismo es bueno para la salud.|自転車競技は健康に良いです。
w1788|¡Qué gol tan bonito!|なんてきれいなゴールだ！
w1789|Ganamos por un punto.|1点差で勝ちました。
w1790|Hay una competencia de natación hoy.|今日、水泳の大会があります。
w1791|Nuestro equipo ganó el torneo.|私たちのチームがトーナメントで優勝しました。
w1792|El campeonato empieza en junio.|選手権は6月に始まります。
w1793|Ganó una medalla de oro.|彼は金メダルを取りました。
w1794|Ella recibió un premio.|彼女は賞をもらいました。
w1795|El trofeo está en la mesa.|トロフィーはテーブルの上にあります。
w1796|El entrenamiento es a las cinco.|練習は5時からです。
w1797|Mañana vamos de excursión.|明日は遠足に行きます。
w1798|Damos un paseo por el parque.|公園を散歩します。
w1799|Este verano vamos de camping.|この夏はキャンプに行きます。
w1800|El viaje fue una gran aventura.|その旅は大冒険でした。
w1801|El recorrido dura dos horas.|行程は2時間かかります。
w1802|¿Cuál es tu destino final?|最終目的地はどこですか？
w1803|Tengo una reserva para dos personas.|2名で予約しています。
w1804|Buscamos alojamiento cerca de la playa.|浜辺の近くで宿を探しています。
w1805|Pregunta en la recepción del hotel.|ホテルのフロントで聞いてね。
w1806|La llegada del tren es a las seis.|電車の到着は6時です。
w1807|La partida del avión se retrasó.|飛行機の出発が遅れました。
w1808|El vuelo tiene una hora de retraso.|その便は1時間遅れています。
w1809|Quiero tener mi propia casa.|自分の家を持ちたいです。
w1810|Es cierto lo que dices.|君の言うことは本当だ。
w1811|En general, me gusta la comida picante.|一般的に、辛い食べ物が好きです。
w1812|Tenemos un amigo en común.|私たちには共通の友達がいます。
w1813|Este es un parque público.|これは公共の公園です。
w1814|Es una escuela privada.|それは私立の学校です。
w1815|Es una pregunta personal.|それは個人的な質問です。
w1816|Las redes sociales son muy populares.|SNSはとても人気があります。
w1817|Hoy es fiesta nacional.|今日は国民の祝日です。
w1818|Llegamos al aeropuerto internacional.|国際空港に着きました。
w1819|Compramos en el mercado local.|地元の市場で買い物をします。
w1820|Es un problema mundial.|それは世界的な問題です。
w1821|Me gusta el jugo natural.|天然のジュースが好きです。
w1822|Esta flor es artificial.|この花は造花です。
w1823|El cuerpo humano es increíble.|人間の体はすごいです。
w1824|Es una historia real.|それは実話です。
w1825|La situación actual es difícil.|現在の状況は厳しいです。
w1826|Es una foto reciente.|それは最近の写真です。
w1827|Nos vemos la próxima semana.|来週会いましょう。
w1828|El día anterior llovió mucho.|前日はたくさん雨が降りました。
w1829|Al día siguiente fuimos a la playa.|翌日、私たちは海へ行きました。
w1830|Esta es la parte final.|これが最後の部分です。
w1831|La idea inicial era diferente.|最初のアイデアは違いました。
w1832|El precio total es cien pesos.|合計金額は100ペソです。
w1833|El hotel está completo.|ホテルは満室です。
w1834|Se comió la pizza entera.|彼はピザを丸ごと食べました。
w1835|Es mi único hijo.|彼は私の一人息子です。
w1836|La respuesta es muy simple.|答えはとても単純です。
w1837|Hablo un español básico.|基本的なスペイン語を話します。
w1838|El agua es fundamental para la vida.|水は生命にとって根本的なものです。
w1839|Dormir bien es esencial.|よく眠ることは欠かせません。
w1840|Este libro es muy útil.|この本はとても役に立ちます。
w1841|Es inútil llorar ahora.|今泣いても無駄です。
w1842|Esta bolsa es muy práctica.|このバッグはとても実用的です。
w1843|Este remedio es muy eficaz.|この薬はとてもよく効きます。
w1844|No es nada grave.|たいしたことはありません。
w1845|Es un mensaje urgente.|それは急ぎのメッセージです。
w1846|Es evidente que está cansado.|彼が疲れているのは明らかです。
w1847|La respuesta es obvia.|答えは明白です。
w1848|¿Cuál es la hora exacta?|正確な時間は何時ですか？
w1849|Necesito datos precisos.|正確なデータが必要です。
w1850|Es un vuelo directo a Lima.|リマへの直行便です。
w1851|Hay diversas opiniones.|さまざまな意見があります。
w1852|El menú es muy variado.|メニューはとてもバラエティ豊かです。
w1853|Tienen una casa enorme.|彼らはとても大きな家を持っています。
w1854|El océano es inmenso.|海は広大です。
w1855|Compramos una pizza gigante.|巨大なピザを買いました。
w1856|La temperatura mínima es de cinco grados.|最低気温は5度です。
w1857|La velocidad máxima es cien.|最高速度は100です。
w1858|Mi hermano mayor vive en Lima.|兄はリマに住んでいます。
w1859|Mi hermana menor tiene diez años.|妹は10歳です。
w1860|Vive en el piso superior.|彼は上の階に住んでいます。
w1861|La cocina está en el piso inferior.|台所は下の階にあります。
w1862|El lago es muy profundo.|その湖はとても深いです。
w1863|Este libro es muy grueso.|この本はとても分厚いです。
w1864|Corta el pan en rebanadas finas.|パンを薄く切って。
w1865|El cuchillo tiene una punta aguda.|そのナイフは先が鋭いです。
w1866|El terreno es plano.|その土地は平らです。
w1867|Sigue todo recto.|ずっとまっすぐ行って。
w1868|El cuadro está torcido.|絵が傾いています。
w1869|No tengo suficiente dinero.|お金が足りません。
w1870|El agua es escasa aquí.|ここでは水が乏しいです。
w1871|La comida fue abundante.|料理はたっぷりありました。
w1872|¡Pobre perro! Tiene frío.|かわいそうな犬！寒がっている。
w1873|La entrada es gratuita.|入場は無料です。
w1874|Este hotel es muy económico.|このホテルはとても安いです。
w1875|Se quedaron en un hotel lujoso.|彼らは豪華なホテルに泊まりました。
w1876|Tu vestido es muy elegante.|君のドレスはとても上品だね。
w1877|Esta silla es incómoda.|この椅子は座り心地が悪いです。
w1878|Hace un clima agradable.|気持ちのいい天気です。
w1879|Tiene un olor desagradable.|嫌なにおいがします。
w1880|Fue un día maravilloso.|素晴らしい一日でした。
w1881|¡Es increíble!|信じられない！
w1882|La fiesta fue fantástica.|パーティーは最高でした。
w1883|Es una excelente idea.|それは素晴らしいアイデアです。
w1884|¡Estupendo! Nos vemos mañana.|いいね！また明日。
w1885|El tiempo está horrible hoy.|今日の天気はひどいです。
w1886|Tuve un sueño terrible.|恐ろしい夢を見ました。
w1887|Me siento fatal hoy.|今日は最悪の気分です。
w1888|Mi abuela es muy activa.|祖母はとても活発です。
w1889|No seas tan pasivo.|そんなに受け身にならないで。
w1890|Mi gato es muy cariñoso.|うちの猫はとても甘えん坊です。
w1891|Los vecinos son muy amistosos.|近所の人たちはとても友好的です。
w1892|El perro es un animal fiel.|犬は忠実な動物です。
w1893|Es un amigo muy leal.|彼はとても誠実な友人です。
w1894|Quiero tu opinión sincera.|君の率直な意見が聞きたい。
w1895|No es justo.|それは不公平だ。
w1896|Es una decisión injusta.|それは不公平な決定です。
w1897|No seas cruel con los animales.|動物にひどいことをしないで。
w1898|El villano es muy malvado.|その悪役はとても悪いやつです。
w1899|Mi abuelo es un hombre bondadoso.|祖父は心の優しい人です。
w1900|Los niños están impacientes.|子どもたちは待ちきれない様子です。
w1901|Mi hija es muy responsable.|娘はとても責任感があります。
w1902|Siempre soy puntual.|私はいつも時間を守ります。
w1903|Su cuarto está muy ordenado.|彼の部屋はとても片付いています。
w1904|Mi escritorio está desordenado.|私の机は散らかっています。
w1905|Es muy cuidadoso con sus cosas.|彼は自分の物をとても大事に扱います。
w1906|No seas descuidado con tu tarea.|宿題をいいかげんにしないで。
w1907|Eres capaz de hacerlo.|君ならそれができるよ。
w1908|Es muy hábil con las manos.|彼は手先がとても器用です。
w1909|Soy un poco torpe en la cocina.|私は料理が少し不器用です。
w1910|Mi abuela es una mujer sabia.|祖母は賢い女性です。
w1911|Nadie quiere ser ignorante.|誰も無知ではいたくありません。
w1912|¿Estás loco? Hace mucho frío.|正気？すごく寒いよ。
w1913|Los niños son muy curiosos.|子どもはとても好奇心が強いです。
w1914|Mi hijo es muy creativo.|息子はとても創造力があります。
w1915|Es un proyecto muy ambicioso.|それはとても野心的な計画です。
w1916|Siempre soy optimista.|私はいつも楽観的です。
w1917|No seas tan pesimista.|そんなに悲観的にならないで。
w1918|Mi hija ya es independiente.|娘はもう自立しています。
w1919|Es un actor muy conocido.|彼はとても有名な俳優です。
w1920|No hables con desconocidos.|知らない人と話してはいけません。
w1921|Comemos comida saludable.|私たちは健康的な食事をしています。
w1922|El perro está herido.|その犬はけがをしています。
w1923|Mi hermana está embarazada.|姉は妊娠しています。
w1924|El perro ayuda a un hombre ciego.|その犬は目の見えない男性を助けています。
w1925|Mi abuelo está un poco sordo.|祖父は少し耳が遠いです。
w1926|Se quedó mudo de la sorpresa.|彼は驚いて言葉を失いました。
w1927|El bebé está desnudo en la bañera.|赤ちゃんは裸で浴槽にいます。
w1928|Estoy dispuesto a ayudarte.|君を手伝うつもりだよ。
w1929|El uniforme es obligatorio.|制服の着用は義務です。
w1930|La excursión es opcional.|遠足は自由参加です。
w1931|Prohibido fumar aquí.|ここは禁煙です。
w1932|¿Está permitido tomar fotos?|写真を撮ってもいいですか？
w1933|¿Hay habitaciones disponibles?|空いている部屋はありますか？
w1934|Estoy acostumbrado al frío.|寒さには慣れています。
w1935|Estoy interesado en el curso.|その講座に興味があります。
w1936|Estoy muy satisfecho con el resultado.|結果にとても満足しています。
w1937|Estoy decepcionado con la película.|その映画にはがっかりしました。
w1938|Estoy confundido con la tarea.|宿題のことで混乱しています。
w1939|Me siento avergonzado por mi error.|自分の間違いが恥ずかしいです。
w1940|Estoy harto de esperar.|待つのにはうんざりです。
w1941|Después del viaje estoy agotado.|旅行のあとでくたくたです。
w1942|Está deprimido por el examen.|彼は試験のことで落ち込んでいます。
w1943|Es un lugar muy solitario.|そこはとても寂しい場所です。
w1944|El mesero fue muy atento.|ウェイターはとても気配りがありました。
w1945|Hoy estoy muy distraído.|今日はとてもぼんやりしています。
w1946|Aún no ha llegado.|彼はまだ着いていません。
w1947|Ven aquí inmediatamente.|すぐにここに来なさい。
w1948|El tiempo pasa rápidamente.|時間はすばやく過ぎます。
w1949|Habla lentamente, por favor.|ゆっくり話してください。
w1950|Finalmente llegamos a casa.|ついに家に着きました。
w1951|Actualmente vivo en Lima.|現在リマに住んでいます。
w1952|Últimamente duermo poco.|最近あまり寝ていません。
w1953|Recientemente compré un coche.|最近車を買いました。
w1954|Antiguamente no había internet.|昔はインターネットがありませんでした。
w1955|Generalmente desayuno a las siete.|たいてい7時に朝食をとります。
w1956|Normalmente camino al trabajo.|ふだんは歩いて仕事に行きます。
w1957|Visito a mis abuelos frecuentemente.|祖父母をよく訪ねます。
w1958|Vamos al cine a menudo.|私たちはよく映画に行きます。
w1959|Raramente como carne.|肉はめったに食べません。
w1960|De repente empezó a llover.|突然雨が降り出しました。
w1961|De pronto se apagó la luz.|突然電気が消えました。
w1962|Poco a poco aprendo español.|少しずつスペイン語を覚えています。
w1963|Al final todo salió bien.|最後には全部うまくいきました。
w1964|¡Por fin es viernes!|やっと金曜日だ！
w1965|Estaba cansado, por eso me dormí.|疲れていたので、寝てしまいました。
w1966|Llueve, por lo tanto no salimos.|雨が降っているので、外出しません。
w1967|Me gustan las frutas, por ejemplo, la manzana.|果物が好きです、例えばリンゴです。
w1968|Yo soy alto; en cambio, mi hermano es bajo.|私は背が高いですが、一方で兄は低いです。
w1969|O sea, no vienes mañana.|つまり、明日は来ないんだね。
w1970|Llego el lunes, es decir, mañana.|月曜日、つまり明日着きます。
w1971|Me gusta la fruta, sobre todo el mango.|果物が好きで、特にマンゴーが好きです。
w1972|De todos modos, gracias por venir.|とにかく、来てくれてありがとう。
w1973|Posiblemente llueva mañana.|もしかすると明日は雨かもしれません。
w1974|Afortunadamente, nadie se lastimó.|幸い、誰もけがをしませんでした。
w1975|Desgraciadamente, perdimos el partido.|残念ながら、試合に負けました。
w1976|Lamentablemente, no puedo ir.|残念ながら行けません。
w1977|Estoy totalmente de acuerdo.|完全に賛成です。
w1978|Me olvidé completamente.|すっかり忘れていました。
w1979|No sé absolutamente nada.|まったく何も知りません。
w1980|Te entiendo perfectamente.|君の言うことはよく分かるよ。
w1981|¡Eres tan amable!|あなたはなんて親切なんでしょう！
w1982|Come cuanto quieras.|好きなだけ食べてね。
w1983|Es el chico cuyo padre es médico.|父親が医者の男の子です。
w1984|Cualquiera puede hacerlo.|誰でもそれはできます。
w1985|Me encanta la naturaleza.|自然が大好きです。
w1986|Debemos cuidar el medio ambiente.|私たちは環境を守らなければなりません。
w1987|La Tierra es nuestro planeta.|地球は私たちの惑星です。
w1988|El universo es enorme.|宇宙はとても広いです。
w1989|No hay espacio en el coche.|車にスペースがありません。
w1990|La atmósfera protege la Tierra.|大気は地球を守っています。
w1991|Abre la ventana para que entre aire.|空気が入るように窓を開けて。
w1992|No juegues con fuego.|火遊びをしてはいけません。
w1993|Sale humo de la cocina.|台所から煙が出ています。
w1994|Hoy tengo mucha energía.|今日はとても元気です。
w1995|Se fue la electricidad anoche.|昨夜停電しました。
w1996|Apaga el gas, por favor.|ガスを消してください。
w1997|El petróleo es muy caro.|石油はとても高いです。
w1998|Cocinamos la carne con carbón.|炭で肉を焼きます。
w1999|El agua es un recurso importante.|水は大切な資源です。
w2000|La contaminación del aire es grave.|大気汚染は深刻です。
w2001|El reciclaje es importante.|リサイクルは大切です。
w2002|Separamos los residuos en casa.|家でごみを分別しています。
w2003|La sequía afecta a los agricultores.|干ばつは農家に影響を与えます。
w2004|Hubo una inundación en el pueblo.|村で洪水がありました。
w2005|El terremoto fue muy fuerte.|地震はとても強かったです。
w2006|Viene un huracán este fin de semana.|今週末ハリケーンが来ます。
w2007|Hubo un incendio en el edificio.|そのビルで火事がありました。
w2008|Fue un desastre natural terrible.|ひどい自然災害でした。
w2009|Riego las plantas cada mañana.|毎朝植物に水をやります。
w2010|Plantamos semillas de tomate.|トマトの種をまきました。
w2011|Las raíces del árbol son largas.|その木の根は長いです。
w2012|Un pájaro está en la rama.|鳥が枝にとまっています。
w2013|El tronco de este árbol es grueso.|この木の幹は太いです。
w2014|El perro come hierba.|犬が草を食べています。
w2015|Los niños juegan en el pasto.|子どもたちが芝生で遊んでいます。
w2016|No pises el césped.|芝生に入らないで。
w2017|El girasol sigue al sol.|ヒマワリは太陽の方を向きます。
w2018|Tengo un cactus en la ventana.|窓辺にサボテンがあります。
w2019|Hay muchos pinos en el bosque.|森には松がたくさんあります。
w2020|Hay palmeras en la playa.|浜辺にヤシの木があります。
w2021|Este árbol da muchos frutos.|この木はたくさん実をつけます。
w2022|La cosecha de este año fue buena.|今年の収穫は良かったです。
w2023|Hay mucho polvo en los libros.|本にほこりがたくさんついています。
w2024|Tus zapatos tienen barro.|君の靴に泥がついているよ。
w2025|Nos sentamos sobre una roca.|私たちは岩の上に座りました。
w2026|Exploramos una cueva oscura.|暗い洞窟を探検しました。
w2027|Caminamos por la orilla del río.|川岸を歩きました。
w2028|La marea está alta hoy.|今日は満潮です。
w2029|El barco llega al puerto.|船が港に着きます。
w2030|La bahía es muy bonita.|その湾はとてもきれいです。
w2031|Visitamos una cascada enorme.|大きな滝を訪れました。
w2032|Hay una fuente en la plaza.|広場に噴水があります。
w2033|Sacamos agua del pozo.|井戸から水をくみます。
w2034|El niño salta en los charcos.|その子は水たまりで跳ねています。
w2035|Esta ave vuela muy alto.|この鳥はとても高く飛びます。
w2036|El águila vuela sobre las montañas.|ワシが山の上を飛んでいます。
w2037|Hay muchas palomas en el parque.|公園にハトがたくさんいます。
w2038|Mi loro sabe decir hola.|うちのオウムは「オラ」と言えます。
w2039|El gallo canta por la mañana.|朝、おんどりが鳴きます。
w2040|El pollito sigue a su mamá.|ひよこがお母さんについて行きます。
w2041|Hay dos cisnes en el lago.|湖に白鳥が2羽います。
w2042|El búho sale de noche.|フクロウは夜に出てきます。
w2043|Un cuervo está en el techo.|カラスが屋根にいます。
w2044|El camello vive en el desierto.|ラクダは砂漠に住んでいます。
w2045|Vimos un ciervo en el bosque.|森でシカを見ました。
w2046|La ardilla come nueces.|リスがクルミを食べています。
w2047|El canguro salta muy alto.|カンガルーはとても高く跳びます。
w2048|Los pingüinos viven en lugares fríos.|ペンギンは寒い場所に住んでいます。
w2049|El cocodrilo está en el río.|川にワニがいます。
w2050|Hay un gusano en la manzana.|リンゴに虫がいます。
w2051|El caracol es muy lento.|カタツムリはとても遅いです。
w2052|Encontramos un cangrejo en la playa.|浜辺でカニを見つけました。
w2053|El pulpo tiene ocho brazos.|タコには腕が8本あります。
w2054|Cuidado con las medusas en el mar.|海ではクラゲに気をつけて。
w2055|Tenemos un cachorro nuevo.|新しい子犬を飼っています。
w2056|El gatito duerme en la cama.|子猫がベッドで寝ています。
w2057|Hay un nido en el árbol.|木に巣があります。
w2058|El pájaro tiene un ala rota.|その鳥は翼が折れています。
w2059|Encontré una pluma blanca.|白い羽を見つけました。
w2060|El perro mueve la cola.|犬がしっぽを振っています。
w2061|El gato tiene una pata herida.|その猫は足をけがしています。
w2062|El toro tiene cuernos grandes.|その雄牛は大きな角があります。
w2063|La tecnología cambia muy rápido.|技術はとても速く変わります。
w2064|Busco la receta en internet.|インターネットでレシピを探します。
w2065|El pescador saca la red del agua.|漁師が網を水から引き上げます。
w2066|Visita nuestra página web.|私たちのウェブページを見てください。
w2067|Este sitio es muy tranquilo.|ここはとても静かな場所です。
w2068|Te mando un correo electrónico.|メールを送るね。
w2069|Escribe tu nombre de usuario.|ユーザー名を入力してください。
w2070|Descargué una aplicación nueva.|新しいアプリをダウンロードしました。
w2071|Guarda el archivo antes de salir.|終了する前にファイルを保存して。
w2072|El documento está en esta carpeta.|書類はこのフォルダーにあります。
w2073|Apaga todos los dispositivos.|すべての機器の電源を切って。
w2074|Este aparato no funciona.|この器具は動きません。
w2075|La máquina de café está rota.|コーヒーマシンが壊れています。
w2076|El motor del coche hace ruido.|車のエンジンが音を立てています。
w2077|Mi celular no tiene batería.|携帯の電池が切れています。
w2078|El control necesita pilas nuevas.|リモコンに新しい電池が必要です。
w2079|¿Dónde está el cable del cargador?|充電器のケーブルはどこ？
w2080|El enchufe está detrás del sofá.|コンセントはソファの後ろにあります。
w2081|Olvidé mi cargador en casa.|充電器を家に忘れました。
w2082|Uso auriculares en el tren.|電車ではイヤホンを使います。
w2083|Pon la música en el altavoz.|スピーカーで音楽をかけて。
w2084|Habla cerca del micrófono.|マイクに近づいて話して。
w2085|La impresora no tiene papel.|プリンターに紙がありません。
w2086|Mi hijo lee en la tableta.|息子はタブレットで読書をします。
w2087|Tengo una llamada perdida.|不在着信があります。
w2088|Mira este video tan gracioso.|このすごく面白い動画を見て。
w2089|La imagen no se ve bien.|画像がよく見えません。
w2090|No hay señal aquí.|ここは電波が入りません。
w2091|Necesito una herramienta para esto.|これには道具が必要です。
w2092|Pásame el martillo, por favor.|金づちを取ってください。
w2093|Pon un clavo en la pared.|壁にくぎを打って。
w2094|Falta un tornillo en la silla.|椅子のねじが1本足りません。
w2095|Ata la caja con una cuerda.|箱をひもで縛って。
w2096|Necesito hilo y aguja.|糸と針が必要です。
w2097|Ten cuidado con la aguja.|針に気をつけて。
w2098|Pon los libros en una caja de cartón.|本を段ボール箱に入れて。
w2099|Necesito un sello para la carta.|手紙に切手が必要です。
w2100|Compré estampillas en el correo.|郵便局で切手を買いました。
w2101|La impresora no tiene tinta.|プリンターのインクが切れています。
w2102|Usa pegamento para pegar el papel.|紙を貼るのにのりを使って。
w2103|Necesito cinta para cerrar la caja.|箱を閉じるのにテープが必要です。
w2104|Guardan el dinero en una caja fuerte.|お金を金庫にしまっています。
w2105|La llave no entra en la cerradura.|鍵が鍵穴に入りません。
w2106|Alguien tocó el timbre.|誰かが呼び鈴を鳴らしました。
w2107|Hay una carta en el buzón.|郵便受けに手紙があります。
w2108|Compramos muebles nuevos.|新しい家具を買いました。
w2109|No hay nada como el hogar.|我が家に勝るものはありません。
w2110|Guardamos las cajas en el sótano.|箱は地下室にしまっています。
w2111|El baño está al final del pasillo.|トイレは廊下の突き当たりです。
w2112|Nos sentamos cerca de la chimenea.|暖炉のそばに座りました。
w2113|Cierra el grifo, por favor.|蛇口を閉めてください。
w2114|Me lavo las manos en el lavabo.|洗面台で手を洗います。
w2115|Los platos están en el fregadero.|お皿は流しにあります。
w2116|Me doy una ducha por la mañana.|朝シャワーを浴びます。
w2117|El bebé juega en la bañera.|赤ちゃんが浴槽で遊んでいます。
w2118|Limpia el inodoro, por favor.|便器を掃除してください。
w2119|Llena el cubo de agua.|バケツに水を入れて。
w2120|Barre el piso con la escoba.|ほうきで床を掃いて。
w2121|Limpia la mesa con un trapo.|ふきんでテーブルを拭いて。
w2122|Paso la aspiradora los sábados.|土曜日に掃除機をかけます。
w2123|Se acabó el detergente.|洗剤がなくなりました。
w2124|La plancha está muy caliente.|アイロンはとても熱いです。
w2125|Cuelga la camisa en una percha.|シャツをハンガーに掛けて。
w2126|Pon las frutas en la cesta.|果物をかごに入れて。
w2127|Pon las flores en el florero.|花を花瓶に生けて。
w2128|Hay diez velas en el pastel.|ケーキにろうそくが10本あります。
w2129|¿Tienes un fósforo?|マッチを持ってる？
w2130|El encendedor no funciona.|ライターがつきません。
w2131|Es una enfermedad muy rara.|それはとても珍しい病気です。
w2132|¿Cuáles son tus síntomas?|どんな症状がありますか？
w2133|Tengo alergia al polen.|花粉アレルギーがあります。
w2134|Tiene una infección de oído.|彼は耳の感染症にかかっています。
w2135|Este virus se contagia fácilmente.|このウイルスはうつりやすいです。
w2136|Mi tío venció el cáncer.|おじはがんを克服しました。
w2137|Mi abuelo tiene diabetes.|祖父は糖尿病です。
w2138|El médico me tomó la presión.|医者が血圧を測りました。
w2139|La operación salió bien.|手術はうまくいきました。
w2140|El tratamiento dura un mes.|治療は1か月かかります。
w2141|El niño recibió una vacuna.|その子はワクチンを受けました。
w2142|No me gustan las inyecciones.|注射は好きではありません。
w2143|Necesito un análisis de sangre.|血液検査が必要です。
w2144|Me hicieron una radiografía del brazo.|腕のレントゲンを撮ってもらいました。
w2145|Tengo consulta con el médico hoy.|今日は医者の診察があります。
w2146|Tengo una cita con el dentista.|歯医者の予約があります。
w2147|¿Tienes seguro médico?|医療保険に入っていますか？
w2148|Toma el jarabe para la tos.|咳止めシロップを飲んで。
w2149|La enfermera me puso una venda.|看護師が包帯を巻いてくれました。
w2150|Ponte una curita en el dedo.|指に絆創膏を貼って。
w2151|Usa el termómetro para ver la fiebre.|体温計で熱を測って。
w2152|Estoy a dieta.|ダイエット中です。
w2153|Las frutas tienen muchas vitaminas.|果物にはビタミンがたくさんあります。
w2154|El huevo tiene mucha proteína.|卵にはタンパク質がたくさんあります。
w2155|Esta carne tiene mucha grasa.|この肉は脂肪が多いです。
w2156|Este postre tiene muchas calorías.|このデザートはカロリーが高いです。
w2157|¿Qué ingredientes necesitas?|どんな材料が必要？
w2158|Esta sopa tiene buen sabor.|このスープは味がいいです。
w2159|¡Qué olor tan rico!|なんていいにおい！
w2160|Agrega una cucharita de azúcar.|砂糖を小さじ1杯加えて。
w2161|Pon dos cucharadas de aceite.|油を大さじ2杯入れて。
w2162|¿Quieres un trozo de pastel?|ケーキを一切れどう？
w2163|Dame una rebanada de pan.|パンを一枚ちょうだい。
w2164|Comí un pedazo de chocolate.|チョコレートを一かけら食べました。
w2165|Tira la cáscara del plátano.|バナナの皮を捨てて。
w2166|Lleva la bandeja a la mesa.|お盆をテーブルに運んで。
w2167|Pon los cubiertos en la mesa.|テーブルにナイフとフォークを並べて。
w2168|El chef prepara la cena.|シェフが夕食を作っています。
w2169|El domingo hacemos un asado.|日曜日にバーベキューをします。
w2170|Pon la carne en la parrilla.|肉をグリルにのせて。
w2171|Los niños meriendan a las cinco.|子どもたちは5時におやつを食べます。
w2172|Mastica bien la comida.|食べ物をよく噛んで。
w2173|No puedo tragar la pastilla.|錠剤が飲み込めません。
w2174|El perro no muerde.|その犬は噛みません。
w2175|El bebé se chupa el dedo.|赤ちゃんが指をしゃぶっています。
w2176|El gato lame su leche.|猫がミルクをなめています。
w2177|Sopla las velas del pastel.|ケーキのろうそくを吹き消して。
w2178|Derramé el café en la mesa.|テーブルにコーヒーをこぼしました。
w2179|Bate los huevos con azúcar.|卵を砂糖と混ぜて泡立てて。
w2180|Ayúdame a pelar las papas.|ジャガイモの皮むきを手伝って。
w2181|Pica la cebolla, por favor.|玉ねぎを刻んでください。
w2182|Vamos a asar pollo.|鶏肉を焼きましょう。
w2183|Mi mamá hornea galletas.|母がクッキーを焼いています。
w2184|Cuece la pasta diez minutos.|パスタを10分ゆでて。
w2185|La casa está en venta.|その家は売りに出ています。
w2186|Hay un descuento del veinte por ciento.|20パーセント引きです。
w2187|Compré esta camisa en rebaja.|このシャツはセールで買いました。
w2188|Hay liquidación en esa tienda.|あの店で在庫一掃セールをしています。
w2189|¿Qué talla usas?|サイズはいくつですか？
w2190|El probador está al fondo.|試着室は奥にあります。
w2191|Me gusta el vestido de la vitrina.|ショーウィンドーのドレスが気に入りました。
w2192|Paga en el mostrador, por favor.|カウンターでお支払いください。
w2193|Pon las cosas en el carrito.|品物をカートに入れて。
w2194|El cajero me dio el cambio.|レジ係がおつりをくれました。
w2195|¿Hay un cajero automático cerca?|近くにATMはありますか？
w2196|¿Puedo pagar con tarjeta de crédito?|クレジットカードで払えますか？
w2197|¿De qué marca son tus zapatos?|君の靴はどこのブランド？
w2198|Este modelo es más barato.|この型のほうが安いです。
w2199|Recicla los envases de plástico.|プラスチック容器をリサイクルして。
w2200|Mira el precio en la etiqueta.|値札で値段を見て。
w2201|El televisor tiene dos años de garantía.|そのテレビには2年の保証がついている。
w2202|Quiero hacer una devolución de esta camisa.|このシャツを返品したいです。
w2203|El cliente presentó una queja en la tienda.|その客は店に苦情を申し立てた。
w2204|Mi pedido llegó ayer por la tarde.|私の注文品は昨日の午後に届いた。
w2205|El envío es gratis en compras grandes.|大きな買い物では発送は無料です。
w2206|La entrega será el lunes por la mañana.|配達は月曜日の朝になります。
w2207|Escribe tu código postal en el sobre.|封筒に郵便番号を書いてね。
w2208|La oficina de correos cierra a las cinco.|郵便局は5時に閉まる。
w2209|Mi abuela me mandó una encomienda.|祖母が私に小包を送ってくれた。
w2210|Uso el transporte público todos los días.|私は毎日公共交通機関を使う。
w2211|Los pasajeros esperan el tren en el andén.|乗客たちはホームで電車を待っている。
w2212|El viajero llevaba una mochila enorme.|その旅行者は大きなリュックを背負っていた。
w2213|Esta ruta es más corta para llegar.|このルートの方が着くのに近い。
w2214|Hay mucho tránsito en el centro hoy.|今日は中心街の通行量が多い。
w2215|El peatón cruzó la calle con cuidado.|歩行者は注意して道を渡った。
w2216|Gira a la derecha en el próximo cruce.|次の交差点で右に曲がって。
w2217|El tren pasa por un túnel largo.|電車は長いトンネルを通る。
w2218|Tomamos la autopista para ir a la playa.|私たちはビーチへ行くのに高速道路を使った。
w2219|Hay que pagar peaje en esta carretera.|この道路では通行料を払わなければならない。
w2220|No hay lugar en el estacionamiento.|駐車場に空きがない。
w2221|Necesitamos poner gasolina al carro.|車にガソリンを入れる必要がある。
w2222|La bicicleta tiene una rueda pinchada.|自転車のタイヤがパンクしている。
w2223|Hay que cambiar el neumático del coche.|車のタイヤを交換しなければならない。
w2224|Mi papá sujeta el volante con las dos manos.|父は両手でハンドルを握る。
w2225|Los frenos de mi bici no funcionan bien.|僕の自転車のブレーキがよく効かない。
w2226|Ponte el cinturón de seguridad, por favor.|シートベルトを締めてね。
w2227|Siempre uso casco cuando ando en bici.|自転車に乗るときはいつもヘルメットをかぶる。
w2228|El autobús sale de la terminal a las ocho.|バスは8時にターミナルを出発する。
w2229|Pasamos por la aduana sin problemas.|私たちは問題なく税関を通った。
w2230|Solo llevo equipaje de mano en este viaje.|今回の旅行は手荷物だけ持って行く。
w2231|Muestre su tarjeta de embarque, por favor.|搭乗券をお見せください。
w2232|El avión despega a las diez en punto.|飛行機は10時ちょうどに離陸する。
w2233|Vamos a aterrizar en veinte minutos.|あと20分で着陸します。
w2234|Los pasajeros ya pueden embarcar.|乗客の皆さまはもうご搭乗いただけます。
w2235|Abordamos el avión por la puerta cinco.|私たちは5番ゲートから飛行機に乗り込んだ。
w2236|Me perdí en el centro de la ciudad.|私は街の中心で道に迷った。
w2237|Es difícil orientarse en esta ciudad.|この街では方向をつかむのが難しい。
w2238|Recorrimos todo el museo en una tarde.|私たちは午後のうちに美術館を全部巡った。
w2239|Los niños exploran el bosque con su papá.|子どもたちはお父さんと森を探検する。
w2240|Descubrimos un café muy bonito ayer.|昨日とてもすてきなカフェを見つけた。
w2241|Me gusta fotografiar flores y pájaros.|私は花や鳥の写真を撮るのが好きだ。
w2242|Vamos a acampar cerca del lago.|湖の近くでキャンプしよう。
w2243|Mi hermana quiere broncearse en la playa.|姉はビーチで日焼けしたがっている。
w2244|Mi abuelo goza de buena salud.|祖父は健康に恵まれている。
w2245|No soporto el calor del verano.|夏の暑さには耐えられない。
w2246|No aguanto más, tengo mucha hambre.|もう我慢できない、とてもお腹がすいた。
w2247|Estas plantas sobreviven sin mucha agua.|これらの植物はあまり水がなくても生き延びる。
w2248|Todos envejecemos con el tiempo.|時とともに誰もが年をとる。
w2249|Los plátanos maduran rápido en verano.|夏はバナナがすぐに熟す。
w2250|Mi tío quiere adelgazar cinco kilos.|おじは5キロやせたいと思っている。
w2251|Comí mucho y engordé un poco.|たくさん食べて少し太った。
w2252|Aprendimos mediante juegos y canciones.|私たちはゲームや歌を通して学んだ。
w2253|Todos vinieron salvo mi primo.|いとこ以外はみんな来た。
w2254|Hablamos acerca de nuestras vacaciones.|私たちは休暇について話した。
w2255|Quiero adquirir más experiencia en el trabajo.|仕事でもっと経験を積みたい。
w2256|Aplica la crema dos veces al día.|クリームを1日2回塗ってください。
w2257|Ella asumió la responsabilidad del proyecto.|彼女はプロジェクトの責任を引き受けた。
w2258|La doctora atiende a los pacientes temprano.|その医者は朝早く患者を診る。
w2259|Las flores atraen a las abejas.|花はミツバチを引きつける。
w2260|Avanzamos poco a poco por el camino.|私たちは道を少しずつ進んだ。
w2261|La amabilidad caracteriza a esta familia.|親切さがこの家族の特徴だ。
w2262|Todos colaboran en la limpieza de la casa.|みんなが家の掃除に協力する。
w2263|Este viaje compensa todo el esfuerzo.|この旅行はすべての努力の埋め合わせになる。
w2264|Mi hermano compone canciones en su guitarra.|兄はギターで曲を作曲する。
w2265|No puedo concentrarme con tanto ruido.|こんなにうるさいと集中できない。
w2266|El profesor nos concedió más tiempo.|先生は私たちにもっと時間をくれた。
w2267|Concluimos que el plan era bueno.|私たちはその計画は良いと結論づけた。
w2268|Conserva la leche en el refrigerador.|牛乳は冷蔵庫で保存してね。
w2269|El juego consiste en adivinar palabras.|そのゲームは単語を当てることから成る。
w2270|Doce jugadores constituyen el equipo.|12人の選手がチームを構成している。
w2271|Consulta el diccionario si no entiendes.|わからなければ辞書を調べて。
w2272|Este carro consume poca gasolina.|この車はガソリンをあまり消費しない。
w2273|Esta caja contiene libros viejos.|この箱には古い本が入っている。
w2274|Todos contribuimos a cuidar el parque.|私たちはみんな公園を守ることに貢献している。
w2275|Mi mamá controla los gastos de la casa.|母が家の出費を管理している。
w2276|Este dinero te corresponde a ti.|このお金は君の分だ。
w2277|La nieve cubre las montañas.|雪が山々を覆っている。
w2278|Dedico una hora al día a leer.|私は1日1時間を読書に費やす。
w2279|Mi tía se dedica a la enseñanza.|おばは教育の仕事をしている。
w2280|Los vecinos demandan más seguridad.|住民たちはもっと安全を求めている。
w2281|Designaron a Ana como capitana del equipo.|アナがチームのキャプテンに指名された。
w2282|La alarma detecta el humo enseguida.|警報器はすぐに煙を感知する。
w2283|El médico determinó la causa del dolor.|医者は痛みの原因を特定した。
w2284|La policía detuvo al ladrón.|警察はその泥棒を逮捕した。
w2285|No distingo bien los colores de lejos.|遠くからだと色がよく区別できない。
w2286|La maestra distribuye los libros a los alumnos.|先生が生徒たちに本を配る。
w2287|Mi prima domina tres idiomas.|いとこは3か国語を使いこなす。
w2288|Elaboramos un plan para el viaje.|私たちは旅行の計画を作り上げた。
w2289|Elimina las fotos que no te gustan.|気に入らない写真は削除して。
w2290|La fábrica emplea a cien personas.|その工場は100人を雇っている。
w2291|Tenemos que enfrentar el problema juntos.|私たちは一緒にその問題に立ち向かわなければならない。
w2292|Enfoca la cámara antes de tomar la foto.|写真を撮る前にカメラのピントを合わせて。
w2293|Hay que equilibrar el estudio y el juego.|勉強と遊びのバランスをとらないといけない。
w2294|Estimamos que el viaje dura tres horas.|旅は3時間かかると見積もっている。
w2295|La maestra evalúa nuestros trabajos cada semana.|先生は毎週私たちの課題を評価する。
w2296|La tecnología evoluciona muy rápido.|テクノロジーはとても速く進化する。
w2297|No exageres, no fue tan grave.|大げさに言わないで、そんなに深刻じゃなかったよ。
w2298|Experimentamos con agua y sal en clase.|授業で水と塩を使って実験した。
w2299|El museo expone cuadros de artistas jóvenes.|その美術館は若い芸術家の絵を展示している。
w2300|Extiende el mapa sobre la mesa.|テーブルの上に地図を広げて。
w2301|Este programa facilita el trabajo en casa.|このプログラムは家での作業を楽にする。
w2302|La escuela fomenta la lectura entre los niños.|学校は子どもたちの読書を奨励している。
w2303|El ejercicio fortalece los músculos.|運動は筋肉を強くする。
w2304|Los paneles solares generan electricidad.|ソーラーパネルは電気を生み出す。
w2305|Mi papá gestiona los papeles del viaje.|父が旅行の書類の手続きをしている。
w2306|¿Puedes identificar a este pájaro?|この鳥が何か特定できる？
w2307|No ignores los consejos de tu abuela.|おばあちゃんの忠告を無視しないで。
w2308|El gobierno impuso una nueva regla.|政府は新しい規則を課した。
w2309|Ser padre implica mucha responsabilidad.|親になることは大きな責任を伴う。
w2310|El clima influye en nuestro humor.|天気は私たちの気分に影響する。
w2311|El partido se inicia a las tres.|試合は3時に始まる。
w2312|Los niños intercambian tarjetas en el recreo.|子どもたちは休み時間にカードを交換する。
w2313|Cada persona interpreta el cuento a su manera.|人それぞれが自分なりにその物語を解釈する。
w2314|La maestra intervino en la pelea.|先生がそのけんかに割って入った。
w2315|Introduce la tarjeta en la máquina.|カードを機械に入れてください。
w2316|Mis padres limitan el tiempo de los videojuegos.|両親はゲームの時間を制限している。
w2317|Los alumnos manifestaron su opinión con calma.|生徒たちは落ち着いて意見を表明した。
w2318|Tuvimos que modificar el plan del fin de semana.|週末の予定を変更しなければならなかった。
w2319|El entrenador motiva mucho a los jugadores.|コーチは選手たちのやる気をとても引き出す。
w2320|Mi mamá negoció un buen precio en el mercado.|母は市場でいい値段に交渉した。
w2321|Este sofá ocupa mucho espacio.|このソファーは場所をとる。
w2322|El perro ocultó el hueso en el jardín.|犬は骨を庭に隠した。
w2323|Puedes omitir esta parte del ejercicio.|練習問題のこの部分は省いていいよ。
w2324|El maestro nos orienta en el proyecto.|先生がプロジェクトで私たちを導いてくれる。
w2325|Mi abuela padece de dolor de espalda.|祖母は腰痛を患っている。
w2326|El alumno planteó una pregunta interesante.|その生徒は興味深い質問を出した。
w2327|Mi tío posee una pequeña granja.|おじは小さな農場を所有している。
w2328|Nadie puede predecir el futuro.|誰も未来を予言することはできない。
w2329|Lavarse las manos previene muchas enfermedades.|手を洗うことで多くの病気を予防できる。
w2330|Debemos preservar los bosques del país.|私たちは国の森を守らなければならない。
w2331|Procura llegar temprano mañana.|明日は早く着くように心がけて。
w2332|La ciudad promueve el uso de la bicicleta.|市は自転車の利用を推進している。
w2333|El hotel proporciona toallas a los huéspedes.|ホテルは宿泊客にタオルを提供する。
w2334|La lluvia provocó un gran atasco.|雨が大渋滞を引き起こした。
w2335|Mi tía publicó un libro de cocina.|おばは料理の本を出版した。
w2336|Ya recuperé mi bicicleta perdida.|なくした自転車をもう取り戻した。
w2337|El lago refleja las montañas.|湖が山々を映している。
w2338|Reflexiona antes de tomar una decisión.|決める前によく考えて。
w2339|Vamos a reforzar la puerta del garaje.|ガレージのドアを補強しよう。
w2340|Este botón regula la temperatura.|このボタンで温度を調節する。
w2341|Relaciona cada palabra con su dibujo.|それぞれの単語を絵と結びつけなさい。
w2342|Hay que reemplazar la bombilla de la cocina.|台所の電球を取り替えないといけない。
w2343|Puedes sustituir el azúcar por miel.|砂糖の代わりにはちみつを使ってもいい。
w2344|Mi vecino renunció a su trabajo.|隣の人は仕事を辞めた。
w2345|Este dibujo representa a mi familia.|この絵は私の家族を表している。
w2346|Este trabajo requiere mucha paciencia.|この仕事には大変な忍耐が必要だ。
w2347|Hay que respetar las opiniones de los demás.|他の人の意見を尊重しなければならない。
w2348|Restringieron el acceso al parque por la lluvia.|雨のため公園への立ち入りが制限された。
w2349|Voy a retirar dinero del cajero.|ATMでお金を引き出してくる。
w2350|Mi hermano reveló el secreto en la cena.|兄は夕食のときに秘密をばらした。
w2351|La comida satisfizo a todos los invitados.|料理は招待客全員を満足させた。
w2352|Vamos a simplificar el problema.|問題を簡単にしてみよう。
w2353|La casa está situada cerca del río.|その家は川の近くに位置している。
w2354|Sometieron el plan a votación.|その計画は投票にかけられた。
w2355|Ella superó su miedo al agua.|彼女は水への恐怖を克服した。
w2356|Surgió un problema con el carro.|車に問題が生じた。
w2357|Transformamos la caja en una casita.|私たちは箱を小さな家に変えた。
w2358|El partido se transmite en vivo por televisión.|試合はテレビで生中継される。
w2359|Valoro mucho tu ayuda.|あなたの助けをとてもありがたく思っています。
w2360|El precio varía según la temporada.|値段は季節によって変わる。
w2361|Este proyecto vincula la escuela y las familias.|このプロジェクトは学校と家庭を結びつける。
w2362|Nunca abandones a tu mascota.|絶対にペットを捨てないで。
w2363|No abuses del azúcar.|砂糖をとりすぎないで。
w2364|Me acusaron de romper la ventana.|私は窓を割ったと責められた。
w2365|Adaptamos la receta para los niños.|子ども向けにレシピを合わせた。
w2366|Mi abuelo administra una pequeña tienda.|祖父は小さな店を経営している。
w2367|Te advierto que el piso está mojado.|床が濡れているから気をつけて。
w2368|La lluvia afectó la cosecha.|雨が収穫に影響を与えた。
w2369|Agotamos todas las pilas jugando.|遊んでいて電池を全部使い果たした。
w2370|Ajusta el asiento antes de manejar.|運転する前に座席を調整して。
w2371|El ruido altera el sueño del bebé.|騒音は赤ちゃんの眠りを乱す。
w2372|Las nubes amenazan con lluvia.|雲が雨になりそうな気配だ。
w2373|Vamos a ampliar la cocina este año.|今年は台所を広げる予定だ。
w2374|Aprecio mucho tu paciencia.|あなたの忍耐をとてもありがたく思う。
w2375|Mi hermana aprobó el examen de inglés.|姉は英語の試験に合格した。
w2376|Suspendieron el partido por la lluvia.|雨で試合が中止になった。
w2377|No arriesgues tu salud por el trabajo.|仕事のために健康を危険にさらさないで。
w2378|Asocio el verano con la playa.|私は夏といえば海を連想する。
w2379|Atribuyen el éxito al trabajo en equipo.|成功はチームワークのおかげだとされている。
w2380|Mis padres me autorizaron a ir a la excursión.|両親は私が遠足に行くのを許可した。
w2381|El profesor calificó los exámenes ayer.|先生は昨日テストを採点した。
w2382|Mis padres nunca me castigan sin razón.|両親は理由なく私を罰したりしない。
w2383|Todos cometemos errores a veces.|誰でもときどき間違いを犯す。
w2384|Me comprometo a estudiar más.|もっと勉強すると約束します。
w2385|No puedo concebir una vida sin música.|音楽のない生活は想像できない。
w2386|El juez condenó al ladrón a dos años.|裁判官は泥棒に懲役2年を言い渡した。
w2387|Te confieso que tengo miedo.|正直に言うと怖いんだ。
w2388|Siempre confundo a los gemelos.|いつも双子を取り違えてしまう。
w2389|La empresa contrató a diez personas nuevas.|その会社は新しく10人を雇った。
w2390|Convivo con mis abuelos y mis padres.|私は祖父母や両親と一緒に暮らしている。
w2391|Todos cooperaron para limpiar la playa.|みんなが海岸の清掃に協力した。
w2392|Mis abuelos criaron a seis hijos.|祖父母は6人の子どもを育てた。
w2393|Mi abuelo cultiva tomates en el jardín.|祖父は庭でトマトを栽培している。
w2394|En clase debatimos sobre el medio ambiente.|授業で環境について討論した。
w2395|La película me decepcionó un poco.|その映画には少しがっかりした。
w2396|Denunciamos el robo a la policía.|私たちは盗難を警察に届け出た。
w2397|Deposité el dinero en el banco.|銀行にお金を預けた。
w2398|Mi hermano me desafió a una carrera.|兄は私に競走を挑んできた。
w2399|La temperatura desciende por la noche.|夜には気温が下がる。
w2400|Desconfío de los mensajes de desconocidos.|知らない人からのメッセージは信用しない。
w2401|No descuides tus estudios.|勉強をおろそかにしないで。
w2402|Fuimos al aeropuerto a despedir a mi tía.|おばを見送りに空港へ行った。
w2403|Ella destaca en matemáticas.|彼女は数学で際立っている。
w2404|Las redes sociales difunden noticias muy rápido.|SNSはニュースをとても速く広める。
w2405|Los niños se disfrazaron de piratas.|子どもたちは海賊に仮装した。
w2406|Disponemos de poco tiempo hoy.|今日はあまり時間がない。
w2407|Mis bisabuelos emigraron a Brasil.|曾祖父母はブラジルに移住した。
w2408|Me emociona mucho ver a mi familia.|家族に会えるのはとてもうれしい。
w2409|Encargamos una pizza para la cena.|夕食にピザを注文した。
w2410|Leer enriquece nuestro vocabulario.|読書は語彙を豊かにする。
w2411|No ensucies el piso con los zapatos.|靴で床を汚さないで。
w2412|El payaso entretiene a los niños.|ピエロが子どもたちを楽しませる。
w2413|Me entusiasma la idea del viaje.|旅行の計画に夢中だ。
w2414|Un kilo equivale a mil gramos.|1キロは1000グラムに相当する。
w2415|Mi hijo se esfuerza mucho en la escuela.|息子は学校でとても頑張っている。
w2416|Los juegos estimulan la mente de los niños.|遊びは子どもの頭を刺激する。
w2417|No debemos excluir a nadie del juego.|誰も遊びから仲間はずれにしてはいけない。
w2418|El globo explotó con un ruido fuerte.|風船が大きな音を立てて割れた。
w2419|Este país exporta mucho café.|この国はコーヒーをたくさん輸出している。
w2420|El árbitro expulsó a un jugador.|審判は選手を1人退場させた。
w2421|Esta empresa fabrica juguetes de madera.|この会社は木のおもちゃを製造している。
w2422|Mi hermano fingió estar dormido.|弟は寝たふりをした。
w2423|El chofer frenó de repente.|運転手は急ブレーキをかけた。
w2424|Mi bisabuelo fundó esta panadería.|曾祖父がこのパン屋を創業した。
w2425|Heredé los ojos verdes de mi madre.|私は母から緑の目を受け継いだ。
w2426|La tormenta hundió el barco.|嵐が船を沈めた。
w2427|El loro imita la voz de mi abuela.|オウムが祖母の声をまねする。
w2428|Me impresionó el tamaño del museo.|その美術館の大きさに感心した。
w2429|Inauguraron un nuevo parque en el barrio.|近所に新しい公園がオープンした。
w2430|¿Quién inventó el teléfono?|誰が電話を発明したの？
w2431|El mar inspira a muchos pintores.|海は多くの画家に着想を与える。
w2432|Instalamos una nueva lámpara en la sala.|居間に新しいランプを取り付けた。
w2433|Ana integra el equipo de fútbol.|アナはサッカーチームのメンバーだ。
w2434|No interrumpas cuando alguien habla.|誰かが話しているときに口をはさまないで。
w2435|Mi abuelo se jubiló a los sesenta años.|祖父は60歳で定年退職した。
w2436|No juzgues a las personas por su ropa.|服装で人を判断しないで。
w2437|Lamento mucho llegar tarde.|遅れて本当に申し訳ない。
w2438|Liberamos al pájaro en el bosque.|私たちは森で鳥を放した。
w2439|Nombraron a mi tía directora de la escuela.|おばが学校の校長に任命された。
w2440|La nieve ocasionó retrasos en los vuelos.|雪が飛行機の遅れを引き起こした。
w2441|Mi papá se opone a comprar otro perro.|父はもう1匹犬を飼うことに反対している。
w2442|Le otorgaron un premio a mi maestra.|私の先生に賞が授与された。
w2443|Te pareces mucho a tu papá.|君はお父さんにとても似ているね。
w2444|Fumar perjudica la salud.|喫煙は健康を害する。
w2445|Plantamos un árbol en el jardín.|私たちは庭に木を植えた。
w2446|Muchas aves pueblan esta isla.|この島には多くの鳥が住んでいる。
w2447|Pospusimos la fiesta para el sábado.|パーティーを土曜日に延期した。
w2448|Precisamos ayuda para mover el sofá.|ソファーを動かすのに手伝いが必要だ。
w2449|No me presiones, ya voy.|せかさないで、今行くから。
w2450|¿Qué pretendes hacer con esas cajas?|その箱で何をするつもり？
w2451|La enfermedad lo privó del sueño.|病気で彼は眠れなくなった。
w2452|Programamos el viaje para diciembre.|旅行を12月に計画した。
w2453|Los niños protestaron por la tarea.|子どもたちは宿題に文句を言った。
w2454|Siempre recurro a mi abuela para consejos.|アドバイスが欲しいときはいつも祖母に頼る。
w2455|Mi mamá me regañó por llegar tarde.|遅く帰ったので母に叱られた。
w2456|Rindo más en la mañana que en la noche.|私は夜より朝の方が成果が出る。
w2457|Hay que reponer el papel higiénico.|トイレットペーパーを補充しないと。
w2458|Este puente resiste terremotos fuertes.|この橋は強い地震にも耐える。
w2459|Mis padres respaldan mi decisión.|両親は私の決断を支持してくれる。
w2460|La lluvia retrasó el partido una hora.|雨で試合が1時間遅れた。
w2461|Los árboles rodean la casa.|木々が家を囲んでいる。
w2462|Mis padres sacrificaron mucho por nosotros.|両親は私たちのために多くを犠牲にした。
w2463|Selecciona la foto que más te guste.|一番気に入った写真を選んで。
w2464|Sostén la escalera, por favor.|はしごを支えてください。
w2465|Subraya las palabras nuevas del texto.|文章の新しい単語に下線を引きなさい。
w2466|Sujeta bien al perro en la calle.|通りでは犬をしっかり押さえていて。
w2467|Mi hermana suspiró al ver la tarea.|姉は宿題を見てため息をついた。
w2468|Tardo diez minutos en llegar a la escuela.|学校に着くのに10分かかる。
w2469|El camión transporta frutas al mercado.|トラックが果物を市場に運ぶ。
w2470|Trasladaron a mi papá a otra ciudad.|父は別の町に転勤になった。
w2471|La música une a las personas.|音楽は人々を結びつける。
w2472|Nuestro equipo venció al campeón.|私たちのチームはチャンピオンを打ち負かした。
w2473|Vigila a tu hermanito en el parque.|公園で弟を見ていてね。
w2474|Mis padres votaron temprano.|両親は早めに投票した。
w2475|El desarrollo del país es muy rápido.|その国の発展はとても速い。
w2476|El crecimiento de los niños es increíble.|子どもたちの成長はすごい。
w2477|Tu progreso en español es muy bueno.|君のスペイン語の進歩はとても素晴らしい。
w2478|Vimos el avance de la película nueva.|新作映画の予告編を見た。
w2479|Aprender un idioma es un proceso largo.|言語を学ぶのは長い過程だ。
w2480|El sistema de transporte es muy bueno aquí.|ここの交通システムはとても良い。
w2481|Este método de estudio funciona bien.|この勉強方法はよく効く。
w2482|El pintor usa una técnica especial.|その画家は特別な技法を使う。
w2483|Esta es la mejor manera de aprender.|これが一番良い学び方だ。
w2484|Pon el celular en modo silencio.|携帯をマナーモードにして。
w2485|Tomaron medidas para ahorrar agua.|水を節約するための対策がとられた。
w2486|¿Cuál es la función de este botón?|このボタンの機能は何？
w2487|La estructura del edificio es muy fuerte.|その建物の構造はとても頑丈だ。
w2488|Trabaja en una organización de ayuda.|彼は支援団体で働いている。
w2489|La universidad es una institución pública.|その大学は公的な機関だ。
w2490|Mi madre pertenece a una asociación de vecinos.|母は町内会に入っている。
w2491|Una fundación ayuda a los niños del barrio.|ある財団が地域の子どもたちを支援している。
w2492|El sindicato habló con la empresa.|労働組合は会社と話し合った。
w2493|Cada voto es importante.|一票一票が大切だ。
w2494|La escuela hizo una campaña de reciclaje.|学校はリサイクル運動を行った。
w2495|Hay tres candidatos para presidente.|大統領候補は3人いる。
w2496|El ministro visitó nuestra escuela.|大臣が私たちの学校を訪れた。
w2497|Mi tío trabaja en el Ministerio de Salud.|おじは保健省で働いている。
w2498|El diputado habló en la televisión.|その議員はテレビで話した。
w2499|La senadora visitó el hospital nuevo.|上院議員が新しい病院を訪れた。
w2500|El congreso aprobó una nueva ley.|議会は新しい法律を可決した。
w2501|El parlamento se reúne los martes.|議会は毎週火曜日に開かれる。
w2502|La constitución protege nuestros derechos.|憲法は私たちの権利を守っている。
w2503|En una democracia todos pueden votar.|民主主義ではみんなが投票できる。
w2504|Mis abuelos vivieron durante una dictadura.|祖父母は独裁政権の時代を生きた。
w2505|Las autoridades cerraron la carretera.|当局がその道路を閉鎖した。
w2506|Estamos haciendo una reforma en la cocina.|うちは台所を改装しているところだ。
w2507|El país pasó por una crisis económica.|その国は経済危機を経験した。
w2508|Hablando se resuelven muchos conflictos.|話し合うことで多くの対立は解決する。
w2509|Hubo una protesta frente al ayuntamiento.|市役所の前で抗議活動があった。
w2510|Miles de personas fueron a la manifestación.|何千人もの人がデモに参加した。
w2511|Los maestros están en huelga hoy.|今日は先生たちがストライキ中だ。
w2512|Llegamos a un acuerdo después de hablar.|話し合いの末に合意に達した。
w2513|Los dos países firmaron un tratado de paz.|両国は平和条約に署名した。
w2514|Tengo una buena relación con mis primos.|私はいとこたちと仲が良い。
w2515|Hay un vínculo fuerte entre las hermanas.|姉妹の間には強い絆がある。
w2516|Seguimos en contacto por mensajes.|私たちはメッセージで連絡を取り続けている。
w2517|Mi abuela tiene mucha influencia en mí.|祖母は私に大きな影響を与えている。
w2518|La medicina hizo efecto muy rápido.|薬はとても早く効いた。
w2519|Cada acción tiene una consecuencia.|どんな行動にも結果がある。
w2520|La causa del accidente fue la lluvia.|事故の原因は雨だった。
w2521|¿Cuál es el motivo de tu visita?|ご訪問の理由は何ですか？
w2522|¿Cuál es el origen de esta palabra?|この単語の由来は何？
w2523|El respeto es la base de una amistad.|尊重は友情の土台だ。
w2524|Tu idea no tiene fundamento.|君の考えには根拠がない。
w2525|Este anillo tiene mucho valor para mí.|この指輪は私にとってとても価値がある。
w2526|No le des importancia a ese comentario.|そのコメントは気にしないで。
w2527|Mi hijo tiene mucho interés en los dinosaurios.|息子は恐竜にとても興味がある。
w2528|El ejercicio tiene muchos beneficios.|運動には多くの利点がある。
w2529|Vivir cerca de la escuela es una gran ventaja.|学校の近くに住んでいるのは大きな利点だ。
w2530|La única desventaja es el precio.|唯一の欠点は値段だ。
w2531|No hay ningún inconveniente en cambiar la fecha.|日付を変えても何の支障もない。
w2532|Tuvimos dificultades para encontrar la casa.|その家を見つけるのに苦労した。
w2533|Hay un obstáculo en el camino.|道に障害物がある。
w2534|Aprender a nadar fue un gran reto para mí.|泳ぎを覚えるのは私には大きな挑戦だった。
w2535|Este rompecabezas es un verdadero desafío.|このパズルは本当に難題だ。
w2536|La contaminación es una amenaza para el planeta.|汚染は地球にとって脅威だ。
w2537|La tormenta causó mucho daño en el pueblo.|嵐は村に大きな被害をもたらした。
w2538|El retraso nos causó un gran perjuicio.|その遅れで私たちは大きな損害を受けた。
w2539|Muchas familias viven en la pobreza.|多くの家庭が貧困の中で暮らしている。
w2540|La riqueza natural de este país es enorme.|この国の自然の豊かさは計り知れない。
w2541|La desigualdad es un problema grave.|不平等は深刻な問題だ。
w2542|Creemos en la igualdad entre hombres y mujeres.|私たちは男女平等を信じている。
w2543|La discriminación no se acepta en esta escuela.|この学校では差別は認められない。
w2544|Hablamos del racismo en la clase de historia.|歴史の授業で人種差別について話した。
w2545|Decimos no a la violencia.|私たちは暴力に反対する。
w2546|El bienestar de los niños es lo más importante.|子どもたちの幸せが何より大切だ。
w2547|Mi nivel de inglés es intermedio.|私の英語のレベルは中級だ。
w2548|Un alto porcentaje de alumnos aprobó.|高い割合の生徒が合格した。
w2549|El promedio de mis notas es ocho.|私の成績の平均は8だ。
w2550|La mayoría de mis amigos juega fútbol.|友達の大部分はサッカーをする。
w2551|Solo una minoría votó en contra.|少数だけが反対票を投じた。
w2552|Escribe la cifra en el cuadro.|枠の中に数字を書いて。
w2553|Según las estadísticas, llueve más en junio.|統計によると6月に雨が多い。
w2554|Respondimos una encuesta sobre el parque.|公園についてのアンケートに答えた。
w2555|Mi hermano tiene una teoría sobre el gato.|兄は猫についてある説を持っている。
w2556|La práctica hace al maestro.|習うより慣れよ。
w2557|Vamos a comprobar nuestra hipótesis.|私たちの仮説を確かめてみよう。
w2558|Hicimos un experimento con un volcán de papel.|紙の火山で実験をした。
w2559|El descubrimiento fue muy importante.|その発見はとても重要だった。
w2560|La rueda es un invento muy antiguo.|車輪はとても古い発明品だ。
w2561|La invención de la imprenta cambió el mundo.|印刷機の発明は世界を変えた。
w2562|La empresa apuesta por la innovación.|その会社は革新に力を入れている。
w2563|Mi hijo construyó un robot pequeño.|息子は小さなロボットを作った。
w2564|La inteligencia artificial ayuda en muchos trabajos.|人工知能は多くの仕事で役立っている。
w2565|La Luna es un satélite natural de la Tierra.|月は地球の自然の衛星だ。
w2566|El cohete despegó hacia el espacio.|ロケットは宇宙へ飛び立った。
w2567|Mi hijo quiere ser astronauta.|息子は宇宙飛行士になりたがっている。
w2568|La Tierra gira en órbita alrededor del Sol.|地球は軌道に乗って太陽の周りを回っている。
w2569|Vivimos en una galaxia llamada Vía Láctea.|私たちは天の川という銀河に住んでいる。
w2570|La gravedad hace caer las manzanas.|重力でリンゴは落ちる。
w2571|Todo está hecho de átomos.|すべては原子でできている。
w2572|Una molécula de agua tiene tres átomos.|水の分子には3つの原子がある。
w2573|El cuerpo tiene millones de células.|体には何百万もの細胞がある。
w2574|Esta especie de tortuga vive en el mar.|この種のカメは海に住んでいる。
w2575|Estudiamos la evolución de los animales.|私たちは動物の進化を勉強した。
w2576|Los genes determinan el color de los ojos.|遺伝子が目の色を決める。
w2577|Las plantas producen oxígeno.|植物は酸素を作り出す。
w2578|Los árboles absorben dióxido de carbono.|木は二酸化炭素を吸収する。
w2579|Esta sustancia es peligrosa para los niños.|この物質は子どもには危険だ。
w2580|El agua es un líquido sin color.|水は色のない液体だ。
w2581|El hielo es agua en estado sólido.|氷は固体の状態の水だ。
w2582|Esta pintura es una mezcla de azul y amarillo.|この絵の具は青と黄色を混ぜたものだ。
w2583|La superficie de la mesa está mojada.|テーブルの表面が濡れている。
w2584|Baja el volumen de la tele, por favor.|テレビの音量を下げてください。
w2585|¿Cuál es la longitud de la mesa?|テーブルの長さはどのくらい？
w2586|La anchura de la puerta es de un metro.|ドアの幅は1メートルだ。
w2587|La altura de la montaña es impresionante.|その山の高さには圧倒される。
w2588|La profundidad de la piscina es de dos metros.|プールの深さは2メートルだ。
w2589|¿Qué distancia hay de aquí a la playa?|ここからビーチまでどのくらいの距離？
w2590|Mide las dimensiones de la caja.|箱の寸法を測って。
w2591|Dibuja una figura con cuatro lados.|4辺のある図形を描きなさい。
w2592|Los niños se sentaron en un círculo.|子どもたちは輪になって座った。
w2593|Un triángulo tiene tres lados.|三角形には辺が3つある。
w2594|La mesa tiene forma de rectángulo.|テーブルは長方形をしている。
w2595|Dibuja una línea recta con la regla.|定規でまっすぐな線を引いて。
w2596|Este ángulo mide noventa grados.|この角度は90度だ。
w2597|La Tierra gira sobre su eje.|地球は自転軸を中心に回っている。
w2598|Hice el cálculo con la calculadora.|電卓で計算した。
w2599|La suma de dos y tres es cinco.|2と3の合計は5だ。
w2600|Los niños practican la resta en clase.|子どもたちは授業で引き算の練習をする。
w2601|La división es difícil para mi hermanito.|弟には割り算が難しい。
w2602|Aprendimos la tabla de multiplicación.|私たちは九九を覚えた。
w2603|Resuelve esta ecuación en tu cuaderno.|ノートでこの方程式を解きなさい。
w2604|Un medio es una fracción.|2分の1は分数だ。
w2605|Comí un tercio del pastel.|ケーキの3分の1を食べた。
w2606|Tres es un número impar.|3は奇数だ。
w2607|El metro es una unidad de longitud.|メートルは長さの単位だ。
w2608|Este conjunto de herramientas es muy útil.|この工具一式はとても便利だ。
w2609|Haz una lista de las compras.|買い物リストを作って。
w2610|Mira la tabla de horarios del tren.|電車の時刻表を見て。
w2611|El gráfico muestra la temperatura del mes.|そのグラフは今月の気温を示している。
w2612|Hice un esquema para estudiar historia.|歴史の勉強のために図式を作った。
w2613|El diagrama explica cómo funciona la máquina.|図表はその機械の仕組みを説明している。
w2614|Me dieron una muestra de perfume gratis.|香水の試供品を無料でもらった。
w2615|Compré dos ejemplares del mismo libro.|同じ本を2冊買った。
w2616|Necesito una copia de tu pasaporte.|あなたのパスポートのコピーが必要です。
w2617|Descarga la nueva versión de la aplicación.|アプリの新しいバージョンをダウンロードして。
w2618|Esta es la primera edición del libro.|これはその本の初版だ。
w2619|Lee el texto y contesta las preguntas.|文章を読んで質問に答えなさい。
w2620|Escribe un párrafo sobre tu familia.|家族について一段落書きなさい。
w2621|Escribe una oración con esta palabra.|この単語を使って文を書きなさい。
w2622|Leer ayuda a aumentar el vocabulario.|読書は語彙を増やすのに役立つ。
w2623|La gramática española no es tan difícil.|スペイン語の文法はそれほど難しくない。
w2624|Ser es un verbo muy importante.|serはとても大事な動詞だ。
w2625|Casa es un sustantivo femenino.|casaは女性名詞だ。
w2626|Bonito es un adjetivo.|bonitoは形容詞だ。
w2627|La palabra casa tiene dos sílabas.|casaという単語は2音節だ。
w2628|Mi profesor tiene acento argentino.|私の先生はアルゼンチンなまりがある。
w2629|¿Cuál es el significado de esta palabra?|この単語の意味は何？
w2630|Mi abuelo tiene buen sentido del humor.|祖父はユーモアのセンスがある。
w2631|Este concepto es difícil de explicar.|この概念は説明しにくい。
w2632|No entiendo este término técnico.|この専門用語がわからない。
w2633|Es una expresión muy común en México.|それはメキシコでよく使う表現だ。
w2634|Usa un lenguaje claro y sencillo.|はっきりした簡単な言葉遣いをして。
w2635|La comunicación en la familia es importante.|家族のコミュニケーションは大切だ。
w2636|Practicamos un diálogo en la clase de español.|スペイン語の授業で会話の練習をした。
w2637|Tuvimos una conversación larga por teléfono.|電話で長い会話をした。
w2638|El director dio un discurso en la graduación.|校長は卒業式でスピーチをした。
w2639|Hubo un debate interesante en clase.|授業で興味深い討論があった。
w2640|El argumento de la película es muy simple.|その映画の筋はとても単純だ。
w2641|Llegamos a la conclusión de quedarnos en casa.|家にいるという結論に達した。
w2642|Lee la introducción del libro primero.|まず本の序論を読んで。
w2643|El contenido de la caja es un secreto.|箱の中身は秘密だ。
w2644|Este aspecto del problema es importante.|問題のこの側面は重要だ。
w2645|El clima es un factor importante.|天候は重要な要因だ。
w2646|El agua es un elemento esencial para la vida.|水は生命に不可欠な要素だ。
w2647|Cambiaron un componente de la computadora.|コンピューターの部品が1つ交換された。
w2648|Su característica principal es la paciencia.|その人の一番の特徴は忍耐強さだ。
w2649|Tiene los rasgos de su madre.|その子は母親似の顔立ちをしている。
w2650|¿Qué tipo de música te gusta?|どんな種類の音楽が好き？
w2651|Este hotel es de primera categoría.|このホテルは一流だ。
w2652|¿Qué género de películas prefieres?|どのジャンルの映画が好き？
w2653|Me gusta tu estilo de vestir.|君の服装のスタイルが好きだ。
w2654|Esos zapatos están de moda este año.|その靴は今年流行っている。
w2655|Hay una tendencia a comer más sano.|より健康的に食べる傾向がある。
w2656|El cambio climático afecta a todo el planeta.|気候変動は地球全体に影響している。
w2657|El calentamiento global derrite los glaciares.|地球温暖化で氷河が溶けている。
w2658|Estudiamos ecología en la clase de ciencias.|理科の授業で生態学を学んだ。
w2659|En casa reciclamos el papel y el plástico.|家では紙とプラスチックをリサイクルしている。
w2660|Los carros contaminan el aire de la ciudad.|車が町の空気を汚染する。
w2661|Los medios de comunicación hablaron del accidente.|メディアがその事故を報じた。
w2662|La prensa entrevistó al alcalde.|報道陣が市長にインタビューした。
w2663|Mi papá escucha una emisora de música clásica.|父はクラシック音楽の放送局を聴いている。
w2664|Es una cadena de supermercados muy grande.|それはとても大きなスーパーのチェーンだ。
w2665|Mi prima estudia periodismo en la universidad.|いとこは大学でジャーナリズムを学んでいる。
w2666|Vimos un reportaje sobre los delfines.|イルカについてのルポを見た。
w2667|Leí el titular del periódico esta mañana.|今朝、新聞の見出しを読んだ。
w2668|La portada del libro es muy bonita.|その本の表紙はとてもきれいだ。
w2669|El editorial de hoy habla de la educación.|今日の社説は教育について書いている。
w2670|El entrevistador hizo preguntas difíciles.|インタビュアーは難しい質問をした。
w2671|El programa tiene una gran audiencia.|その番組は視聴者が多い。
w2672|Los espectadores aplaudieron al final.|観客は最後に拍手した。
w2673|La radio saludó a sus oyentes.|ラジオはリスナーにあいさつした。
w2674|Mi abuela es una gran lectora.|祖母は大の読書家だ。
w2675|Mi hermana pasa mucho tiempo en las redes sociales.|姉はSNSに長い時間を使っている。
w2676|Esa cantante tiene millones de seguidores.|その歌手には何百万人ものフォロワーがいる。
w2677|Me gustó tu última publicación.|あなたの最新の投稿が気に入った。
w2678|Dejé un comentario en tu foto.|あなたの写真にコメントを残した。
w2679|Te mando el enlace por mensaje.|メッセージでリンクを送るね。
w2680|Busca la receta en el buscador.|検索エンジンでレシピを探して。
w2681|Abre la página en otro navegador.|別のブラウザーでページを開いて。
w2682|Hay que cuidar la privacidad en internet.|インターネットではプライバシーに気をつけなければならない。
w2683|Un hacker entró en la computadora de la empresa.|ハッカーが会社のコンピューターに侵入した。
w2684|Necesito instalar un software nuevo.|新しいソフトウェアをインストールする必要がある。
w2685|El problema está en el hardware, no en el programa.|問題はプログラムではなくハードウェアにある。
w2686|Guarda tus archivos en la memoria USB.|ファイルをUSBメモリに保存して。
w2687|La descarga tardó cinco minutos.|ダウンロードに5分かかった。
w2688|Hay una actualización para tu teléfono.|あなたの電話にアップデートがある。
w2689|Cambia el idioma en la configuración.|設定で言語を変えて。
w2690|Mi abuelo teclea muy despacio.|祖父はキーを打つのがとてもゆっくりだ。
w2691|Me gusta navegar por internet en la noche.|夜にネットを見るのが好きだ。
w2692|Vamos a grabar un video para la abuela.|おばあちゃんのために動画を撮ろう。
w2693|Mi hermano edita videos en su computadora.|兄はパソコンで動画を編集する。
w2694|Escanea el documento y mándamelo.|書類をスキャンして送って。
w2695|Reinicia la computadora si no funciona.|動かないならパソコンを再起動して。
w2696|Guardé el mensaje como borrador.|メッセージを下書きとして保存した。
w2697|El mecanismo del reloj es muy delicado.|時計の仕組みはとても繊細だ。
w2698|El corazón es un órgano muy importante.|心臓はとても大事な臓器だ。
w2699|El cerebro controla todo el cuerpo.|脳は体全体を制御している。
w2700|Los pulmones nos ayudan a respirar.|肺は呼吸を助けてくれる。
w2701|El hígado limpia la sangre.|肝臓は血液をきれいにする。
w2702|Tengo dolor en el riñón derecho.|右の腎臓が痛い。
w2703|El intestino ayuda a digerir la comida.|腸は食べ物の消化を助ける。
w2704|Me duele un músculo de la pierna.|脚の筋肉が痛い。
w2705|El dentista tocó un nervio.|歯医者が神経に触れた。
w2706|La enfermera buscó una vena en mi brazo.|看護師が私の腕の静脈を探した。
w2707|La arteria lleva sangre desde el corazón.|動脈は心臓から血液を運ぶ。
w2708|En el museo vimos un esqueleto de dinosaurio.|博物館で恐竜の骨格を見た。
w2709|Hay que cuidar la columna vertebral.|背骨を大切にしなければならない。
w2710|Mi abuela se rompió la cadera.|祖母は腰の骨を折った。
w2711|Este pantalón me queda grande de cintura.|このズボンはウエストが大きい。
w2712|El muslo de pollo es muy rico.|鶏のもも肉はとてもおいしい。
w2713|Me torcí el tobillo jugando fútbol.|サッカーをしていて足首をひねった。
w2714|Tengo una ampolla en el talón.|かかとに水ぶくれがある。
w2715|Cerró el puño con fuerza.|彼はこぶしを強く握った。
w2716|Escribí la palabra en la palma de la mano.|その言葉を手のひらに書いた。
w2717|El bebé se chupa el pulgar.|赤ちゃんが親指をしゃぶっている。
w2718|Tienes una pestaña en la mejilla.|ほっぺにまつげがついているよ。
w2719|Me pica el párpado.|まぶたがかゆい。
w2720|Me duele la mandíbula al masticar.|かむとあごが痛い。
w2721|Tiene un hoyuelo en la barbilla.|彼はあご先にくぼみがある。
w2722|El bebé tiene un ombligo pequeño.|赤ちゃんのおへそは小さい。
w2723|Caminar después de comer ayuda a la digestión.|食後に歩くと消化を助ける。
w2724|Respira profundo y controla tu respiración.|深く吸って、呼吸を整えて。
w2725|El ejercicio mejora la circulación.|運動は血行を良くする。
w2726|El médico me tomó el pulso.|医者が私の脈をとった。
w2727|Puedo oír el latido de tu corazón.|君の心臓の鼓動が聞こえる。
w2728|Hay mucha tensión antes del partido.|試合の前はとても緊張感がある。
w2729|Siento mucho cansancio después del trabajo.|仕事の後、とても疲れを感じる。
w2730|La fatiga no me deja concentrarme.|疲労で集中できない。
w2731|Mi papá sufre de insomnio.|父は不眠に悩んでいる。
w2732|En el barco sentí un mareo.|船の上でめまいがした。
w2733|Tengo náuseas por la mañana.|朝、吐き気がする。
w2734|Me hice una quemadura con la plancha.|アイロンでやけどをした。
w2735|La radiografía mostró una fractura.|レントゲンで骨折がわかった。
w2736|Tengo un esguince en el tobillo.|足首を捻挫している。
w2737|Me salió un moretón en la rodilla.|ひざにあざができた。
w2738|La hinchazón bajó con hielo.|氷で腫れが引いた。
w2739|Tengo una picadura de mosquito.|蚊に刺された跡がある。
w2740|Lávate las manos para evitar el contagio.|感染を防ぐために手を洗って。
w2741|Hubo una epidemia de gripe ese invierno.|その冬はインフルエンザが流行した。
w2742|Durante la pandemia estudiamos en casa.|パンデミックの間、家で勉強した。
w2743|Mi vecino tiene una discapacidad visual.|隣の人は視覚障害がある。
w2744|Mi abuelo usa silla de ruedas.|祖父は車いすを使っている。
w2745|Camina con muletas desde el accidente.|事故以来、松葉づえで歩いている。
w2746|Lo llevaron en camilla a la ambulancia.|彼は担架で救急車に運ばれた。
w2747|El cirujano operó a mi tía.|外科医が叔母を手術した。
w2748|La cirugía salió muy bien.|手術はとてもうまくいった。
w2749|Me pusieron anestesia antes de la operación.|手術の前に麻酔をかけられた。
w2750|El diagnóstico fue una gripe fuerte.|診断はひどいインフルエンザだった。
w2751|Te deseo una pronta recuperación.|早い回復を願っています。
w2752|Va a terapia dos veces por semana.|週に2回セラピーに通っている。
w2753|Después de la fractura necesitó rehabilitación.|骨折の後、リハビリが必要だった。
w2754|La prevención es mejor que la cura.|予防は治療に勝る。
w2755|La higiene es importante en la cocina.|台所では衛生が大切だ。
w2756|Una buena nutrición es clave para crecer.|成長には良い栄養が大切だ。
w2757|Cuida tu alimentación y haz ejercicio.|食生活に気をつけて運動しなさい。
w2758|La leche es un alimento muy completo.|牛乳はとても栄養豊かな食品だ。
w2759|Las lentejas son una legumbre nutritiva.|レンズ豆は栄養のある豆だ。
w2760|No puedo comer lácteos.|私は乳製品が食べられない。
w2761|En esa tienda venden embutidos caseros.|その店では自家製のソーセージを売っている。
w2762|Me encanta la sopa de mariscos.|海鮮スープが大好きだ。
w2763|Como frutos secos en la merienda.|おやつにナッツを食べる。
w2764|Esta comida tiene muchas especias.|この料理には香辛料がたくさん入っている。
w2765|La sal es el condimento más común.|塩は一番一般的な調味料だ。
w2766|Me gusta el arroz con leche con canela.|シナモン入りのライスプディングが好きだ。
w2767|Pon un poco de orégano en la pizza.|ピザにオレガノを少しかけて。
w2768|Corta el perejil muy fino.|パセリをとても細かく刻んで。
w2769|La salsa lleva tomate y albahaca.|そのソースにはトマトとバジルが入っている。
w2770|El té de jengibre es bueno para el resfriado.|ショウガ茶は風邪に良い。
w2771|¿Quieres mostaza en tu hot dog?|ホットドッグにマスタードはいる？
w2772|Las papas con mayonesa son deliciosas.|マヨネーズをつけたポテトはおいしい。
w2773|Pongo aceitunas en la ensalada.|サラダにオリーブを入れる。
w2774|Hoy cocinamos berenjenas al horno.|今日はナスのオーブン焼きを作る。
w2775|Los niños no quieren comer brócoli.|子どもたちはブロッコリーを食べたがらない。
w2776|La coliflor es blanca y redonda.|カリフラワーは白くて丸い。
w2777|Compré un repollo para la ensalada.|サラダ用にキャベツを買った。
w2778|El apio tiene mucha agua.|セロリは水分が多い。
w2779|Los rábanos son rojos por fuera.|ラディッシュは外側が赤い。
w2780|La remolacha pinta la sopa de rojo.|ビーツでスープが赤くなる。
w2781|Asamos batatas en el horno.|オーブンでサツマイモを焼いた。
w2782|El arroz lleva arvejas y zanahoria.|そのご飯にはグリーンピースとニンジンが入っている。
w2783|Mi mamá prepara sopa de garbanzos.|母はヒヨコ豆のスープを作る。
w2784|Estas ciruelas están muy dulces.|このプラムはとても甘い。
w2785|En verano comemos higos frescos.|夏には生のイチジクを食べる。
w2786|Hice una mermelada de frambuesa.|ラズベリージャムを作った。
w2787|Pelé una mandarina para mi hermana.|妹にみかんをむいてあげた。
w2788|Desayuno jugo de toronja.|朝食にグレープフルーツジュースを飲む。
w2789|Exprime una lima sobre los tacos.|タコスにライムを搾って。
w2790|Este pastel tiene almendras.|このケーキにはアーモンドが入っている。
w2791|Mi hermano es alérgico al maní.|兄はピーナッツアレルギーだ。
w2792|Desayuno avena con fruta.|朝食に果物入りのオートミールを食べる。
w2793|El pan se hace con harina de trigo.|パンは小麦粉で作られる。
w2794|Los caballos comen cebada.|馬は大麦を食べる。
w2795|Amasamos la masa para la pizza.|ピザの生地をこねた。
w2796|Sin levadura el pan no sube.|イーストがないとパンは膨らまない。
w2797|Comimos empanadas de carne en la fiesta.|パーティーで肉のエンパナーダを食べた。
w2798|Calienta las tortillas para los tacos.|タコス用にトルティーヤを温めて。
w2799|Mi abuela hace un guiso de pollo.|祖母は鶏の煮込みを作る。
w2800|Hoy hay puré de papas para cenar.|今日の夕食はマッシュポテトだ。
w2801|Las croquetas de jamón están ricas.|ハムのコロッケはおいしい。
w2802|De postre hay flan.|デザートはプリンだ。
w2803|Hicimos un bizcocho de chocolate.|チョコのスポンジケーキを作った。
w2804|No comas golosinas antes de cenar.|夕食の前にお菓子を食べないで。
w2805|No se puede masticar chicle en clase.|授業中はガムをかんではいけない。
w2806|El niño quiere una paleta de fresa.|その子はイチゴの棒付きキャンディを欲しがっている。
w2807|Este no es el momento adecuado.|今は適切なタイミングではない。
w2808|Esa ropa no es apropiada para la boda.|その服は結婚式にふさわしくない。
w2809|Es conveniente llegar temprano.|早めに着いたほうが都合がいい。
w2810|Tu llamada fue muy oportuna.|君の電話はとてもいいタイミングだった。
w2811|El clima es favorable para viajar.|天気は旅行に好都合だ。
w2812|Mi mamá siempre tiene una actitud positiva.|母はいつも前向きな態度だ。
w2813|La prueba salió negativa.|検査は陰性だった。
w2814|El árbitro debe ser neutral.|審判は中立でなければならない。
w2815|Es una forma eficiente de ahorrar agua.|それは水を節約する効率的な方法だ。
w2816|Hoy fue un día muy productivo.|今日はとても生産的な一日だった。
w2817|Tu ayuda es muy valiosa para mí.|君の助けは私にとってとても貴重だ。
w2818|Es un trabajo digno de admiración.|それは称賛に値する仕事だ。
w2819|Hubo una mejora notable en sus notas.|彼の成績に著しい向上があった。
w2820|Es un alumno destacado de la clase.|彼はクラスで傑出した生徒だ。
w2821|Ahorramos una cantidad considerable de dinero.|かなりの額のお金を貯めた。
w2822|Fue un día muy significativo para la familia.|家族にとってとても意義のある日だった。
w2823|Es un dato muy relevante.|それはとても重要なデータだ。
w2824|Fue el gol decisivo del partido.|それが試合の決定的なゴールだった。
w2825|Este momento es crucial para el equipo.|この瞬間はチームにとって極めて重要だ。
w2826|El agua es vital para las plantas.|水は植物にとって不可欠だ。
w2827|El celular es indispensable para mi papá.|携帯は父にとって欠かせない。
w2828|Es imprescindible traer el pasaporte.|パスポートを持ってくることは不可欠だ。
w2829|No compres cosas innecesarias.|いらない物を買わないで。
w2830|El uso excesivo del celular es malo.|携帯の使いすぎは良くない。
w2831|Hace un calor extremo en el desierto.|砂漠は極度に暑い。
w2832|Haz ejercicio moderado todos los días.|毎日適度な運動をしなさい。
w2833|El precio es bastante razonable.|値段はかなり手ごろだ。
w2834|Es lógico que estés cansado.|君が疲れているのは当然だ。
w2835|Esa idea es absurda.|その考えはばかげている。
w2836|Me veo ridículo con este sombrero.|この帽子をかぶるとこっけいに見える。
w2837|Lo dijo en tono irónico.|彼は皮肉な口調でそれを言った。
w2838|Es un problema muy complejo.|それはとても複雑な問題だ。
w2839|Solo es una herida superficial.|ただの浅い傷だ。
w2840|Me gusta el arte abstracto.|抽象画が好きだ。
w2841|Dame un ejemplo concreto.|具体的な例をちょうだい。
w2842|Mañana tengo el examen teórico de manejo.|明日は運転の学科試験がある。
w2843|Hubo un problema técnico con la tele.|テレビに技術的な問題があった。
w2844|Fuimos a un centro cultural.|文化センターに行った。
w2845|Visitamos el centro histórico de la ciudad.|町の歴史地区を訪れた。
w2846|Comemos un plato tradicional en Navidad.|クリスマスには伝統料理を食べる。
w2847|Me gusta la música contemporánea.|現代音楽が好きだ。
w2848|Mi papá escucha música clásica.|父はクラシック音楽を聴く。
w2849|Tu dibujo es muy original.|君の絵はとても独創的だ。
w2850|Este restaurante sirve comida mexicana auténtica.|このレストランは本格的なメキシコ料理を出す。
w2851|Es legal estacionar aquí los domingos.|日曜日にここに駐車するのは合法だ。
w2852|Es ilegal tirar basura en la calle.|道にごみを捨てるのは違法だ。
w2853|El español es el idioma oficial de México.|スペイン語はメキシコの公用語だ。
w2854|Para la entrevista usa ropa formal.|面接にはフォーマルな服を着て。
w2855|Fue una reunión informal entre amigos.|友達同士のくだけた集まりだった。
w2856|El transporte urbano es barato aquí.|ここは市内交通が安い。
w2857|Mis abuelos viven en una zona rural.|祖父母は田舎に住んでいる。
w2858|Es una región agrícola muy rica.|そこはとても豊かな農業地帯だ。
w2859|Vivimos cerca de una zona industrial.|私たちは工業地帯の近くに住んでいる。
w2860|Vamos al centro comercial.|ショッピングセンターに行こう。
w2861|La empresa tiene problemas financieros.|その会社は財政問題を抱えている。
w2862|Mi mamá tiene un horario laboral largo.|母の勤務時間は長い。
w2863|Es una cena familiar.|家族の夕食会だ。
w2864|Ayudo con las tareas domésticas.|家事を手伝う。
w2865|Ya compré los útiles escolares.|もう学用品を買った。
w2866|Mi hermana es estudiante universitaria.|姉は大学生だ。
w2867|La salud mental es muy importante.|心の健康はとても大切だ。
w2868|Hago actividad física todos los días.|毎日体を動かしている。
w2869|Fue un momento muy emocional.|感情が揺さぶられる瞬間だった。
w2870|Mi abuela es muy religiosa.|祖母はとても信心深い。
w2871|Tenemos la obligación moral de ayudar.|私たちには助ける道徳的義務がある。
w2872|No es ético mentir a los clientes.|客にうそをつくのは倫理的ではない。
w2873|Lo hizo por razones estéticas.|見た目の理由でそうした。
w2874|Tiene muy buena memoria visual.|彼は視覚的な記憶力がとてもいい。
w2875|Compré una cámara digital.|デジタルカメラを買った。
w2876|Hoy tuvimos una clase virtual.|今日はオンライン授業があった。
w2877|Te mandé un correo electrónico.|君にメールを送った。
w2878|Mi tío tiene un carro eléctrico.|叔父は電気自動車を持っている。
w2879|La puerta es automática.|そのドアは自動だ。
w2880|Este carro tiene cambio manual.|この車はマニュアル車だ。
w2881|Hacemos una fiesta anual en el barrio.|地区で年に一度のお祭りをする。
w2882|El pago del alquiler es mensual.|家賃の支払いは毎月だ。
w2883|Tengo una reunión semanal los lunes.|毎週月曜日に週1回の会議がある。
w2884|Cocinar es parte de mi vida cotidiana.|料理は私の日常生活の一部だ。
w2885|Nos vemos en el lugar habitual.|いつもの場所で会おう。
w2886|Es un error muy frecuente.|それはとてもよくある間違いだ。
w2887|Recibimos visitas ocasionales de mis tíos.|おじたちが時々訪ねてくる。
w2888|Es una exposición permanente del museo.|それは博物館の常設展だ。
w2889|Es un trabajo temporal de verano.|それは夏の臨時の仕事だ。
w2890|Te hago una pregunta breve.|短い質問をするね。
w2891|La espera fue eterna.|待ち時間が永遠に感じられた。
w2892|Necesito una respuesta inmediata.|すぐに返事が必要だ。
w2893|Hubo un cambio repentino de clima.|天気が急に変わった。
w2894|Hubo una mejora gradual.|少しずつ良くなった。
w2895|Hay un ruido constante en la calle.|通りでは絶え間なく騒音がする。
w2896|Trabajó tres horas de forma continua.|彼は3時間続けて働いた。
w2897|Ganó durante tres años sucesivos.|彼は3年連続で優勝した。
w2898|No necesitas experiencia previa.|事前の経験は必要ない。
w2899|Lo hablamos en una reunión posterior.|後の会議でそれを話し合った。
w2900|Mi hermano va a la escuela primaria.|弟は小学校に通っている。
w2901|Este medicamento no tiene efectos secundarios.|この薬には副作用がない。
w2902|Vivimos en una zona central.|私たちは中心部に住んでいる。
w2903|Entra por la puerta lateral.|横のドアから入って。
w2904|Pintamos la pared exterior de la casa.|家の外壁を塗った。
w2905|Me gustan las plantas de interior.|室内用の植物が好きだ。
w2906|Esta crema es de uso externo.|このクリームは外用だ。
w2907|Es un problema interno de la empresa.|それは会社の内部の問題だ。
w2908|Dibuja una línea vertical.|縦の線を描いて。
w2909|Pon el cuadro en posición horizontal.|絵を横向きに置いて。
w2910|Las vías del tren son paralelas.|線路は平行だ。
w2911|Viven en el lado opuesto de la ciudad.|彼らは町の反対側に住んでいる。
w2912|Caminamos en dirección contraria.|私たちは逆の方向に歩いた。
w2913|Mis hermanas tienen gustos semejantes.|姉妹は似た趣味を持っている。
w2914|Tu mochila es similar a la mía.|君のリュックは私のに似ている。
w2915|Los gemelos son idénticos.|その双子はそっくりだ。
w2916|Un kilo es equivalente a mil gramos.|1キロは1000グラムに相当する。
w2917|En la vida, todo es relativo.|人生ではすべてが相対的だ。
w2918|Tengo absoluta confianza en ti.|君を絶対的に信頼している。
w2919|En el campo el aire es puro.|田舎では空気がきれいだ。
w2920|Pedí una ensalada mixta.|ミックスサラダを頼んだ。
w2921|El agua del lago es transparente.|湖の水は透き通っている。
w2922|Tu hija es una alumna brillante.|君の娘さんは優秀な生徒だ。
w2923|Estás pálido, ¿te sientes bien?|顔色が悪いよ、大丈夫？
w2924|El sol es muy intenso hoy.|今日は日差しがとても強い。
w2925|Solo tengo una fiebre leve.|微熱があるだけだ。
w2926|No me gustan las películas violentas.|暴力的な映画は好きじゃない。
w2927|Ese perro es un poco agresivo.|その犬は少し攻撃的だ。
w2928|Mi gato es muy pacífico.|うちの猫はとても穏やかだ。
w2929|Siempre es cortés con los vecinos.|彼はいつも近所の人に礼儀正しい。
w2930|No seas grosero con tu hermana.|妹に失礼なことをしないで。
w2931|Es famoso, pero muy humilde.|彼は有名だがとても謙虚だ。
w2932|No me gusta su actitud arrogante.|彼の傲慢な態度が嫌いだ。
w2933|Es muy modesto con sus logros.|彼は自分の成果についてとても控えめだ。
w2934|Es tan vanidoso que siempre se mira al espejo.|彼はうぬぼれが強くて、いつも鏡を見ている。
w2935|Mi abuelo es muy terco.|祖父はとても頑固だ。
w2936|Mi horario de trabajo es flexible.|私の勤務時間は融通がきく。
w2937|La maestra es muy estricta.|先生はとても厳しい。
w2938|El castigo fue muy severo.|罰はとても厳しかった。
w2939|Mi jefe es muy exigente.|上司はとても要求が厳しい。
w2940|Hay que ser tolerante con los demás.|他人には寛容でなければならない。
w2941|Mis papás son muy comprensivos.|両親はとても理解がある。
w2942|Mi hija es muy sensible.|娘はとても繊細だ。
w2943|Fue una decisión sensata.|それは賢明な判断だった。
w2944|Sé prudente al manejar.|運転するときは慎重にね。
w2945|Cruzar en rojo es imprudente.|赤信号で渡るのは軽率だ。
w2946|Fue muy atrevido saltar al agua.|水に飛び込むなんてとても大胆だった。
w2947|No seas cobarde, inténtalo.|臆病にならないで、やってみて。
w2948|Es una fuente de información fiable.|それは信頼できる情報源だ。
w2949|Mi vecino es una persona confiable.|隣人は信頼できる人だ。
w2950|Mi hermanito es muy travieso.|弟はとてもやんちゃだ。
w2951|Es un niño muy mimado.|彼はとても甘やかされた子だ。
w2952|No seas maleducado y saluda.|失礼なことをしないで、あいさつしなさい。
w2953|Tu abuela es encantadora.|君のおばあさんはすてきな人だ。
w2954|El precio es muy atractivo.|値段がとても魅力的だ。
w2955|Mi tío es muy chistoso.|叔父はとても面白い。
w2956|El partido fue muy emocionante.|試合はとてもわくわくした。
w2957|Ella es muy apasionada por su trabajo.|彼女は仕事にとても情熱的だ。
w2958|Es un estudiante muy entusiasta.|彼はとても熱心な学生だ。
w2959|Me es indiferente el color.|色はどうでもいい。
w2960|Me siento nostálgico al ver fotos viejas.|古い写真を見ると懐かしい気持ちになる。
w2961|Es una canción muy melancólica.|それはとても物悲しい歌だ。
w2962|Estoy ansioso por verte.|君に会うのが待ちきれない。
w2963|Está angustiado por el examen.|彼は試験のことで悩んでいる。
w2964|Estaba desesperado buscando a su perro.|彼は必死に犬を探していた。
w2965|Mi papá está furioso conmigo.|父は私にかんかんに怒っている。
w2966|Este ruido es muy molesto.|この騒音はとても不快だ。
w2967|Hoy está irritado por el tráfico.|今日は渋滞でいらいらしている。
w2968|Me quedé asombrado con el paisaje.|景色に驚かされた。
w2969|Estoy muy agradecido por tu ayuda.|君の助けにとても感謝している。
w2970|Me siento aliviado después del examen.|試験が終わってほっとしている。
w2971|Me siento inseguro antes de hablar en público.|人前で話す前は自信がない。
w2972|Evidentemente, no estudió para el examen.|明らかに、彼は試験勉強をしなかった。
w2973|Aparentemente, todo está bien.|見たところ、すべて順調だ。
w2974|Supuestamente llega a las ocho.|彼は8時に着くはずだ。
w2975|Obviamente, te voy a ayudar.|もちろん、君を手伝うよ。
w2976|Naturalmente, estaba cansado después del viaje.|当然、旅行の後で疲れていた。
w2977|Efectivamente, tú tenías toda la razón.|確かに、君の言う通りだった。
w2978|Precisamente de eso quería hablar.|まさにそのことを話したかった。
w2979|Justamente iba a llamarte.|ちょうど君に電話しようとしていた。
w2980|Ve directamente a casa después de clase.|授業の後はまっすぐ家に帰って。
w2981|Simplemente no tengo tiempo.|単に時間がないだけだ。
w2982|Únicamente quiero dormir un rato.|ただ少し眠りたいだけだ。
w2983|Comemos principalmente arroz y frijoles.|私たちは主に米と豆を食べる。
w2984|Básicamente, tenemos que empezar de nuevo.|基本的に、最初からやり直さなければならない。
w2985|Esencialmente, es la misma idea.|本質的には同じ考えだ。
w2986|El examen fue relativamente fácil.|試験は比較的簡単だった。
w2987|La caja no es suficientemente grande.|その箱は十分な大きさではない。
w2988|Hoy hace extremadamente frío.|今日は極めて寒い。
w2989|Es una persona sumamente amable.|彼は非常に親切な人だ。
w2990|La sopa está ligeramente salada.|スープは少ししょっぱい。
w2991|El viaje dura aproximadamente dos horas.|旅は約2時間かかる。
w2992|Prácticamente terminé la tarea.|宿題はほとんど終わった。
w2993|Definitivamente quiero volver a este lugar.|絶対にまたこの場所に来たい。
w2994|Anteriormente vivíamos en el campo.|以前は田舎に住んでいた。
w2995|Posteriormente se mudó a la capital.|その後、彼は首都に引っ越した。
w2996|Hay que reservar previamente.|事前に予約する必要がある。
w2997|La tienda está cerrada temporalmente.|その店は一時的に閉まっている。
w2998|Mi hermano revisa el celular constantemente.|兄はしょっちゅう携帯をチェックしている。
w2999|Llueve continuamente desde ayer.|昨日から絶えず雨が降っている。
w3000|El dolor desapareció gradualmente.|痛みは徐々に消えた。
w3001|Paulatinamente aprendió a nadar.|彼は少しずつ泳げるようになった。
w3002|Uno, dos, tres, y así sucesivamente.|1、2、3、以下同様。
w3003|Los hermanos se ayudan mutuamente.|兄弟は互いに助け合う。
w3004|Personalmente, prefiero el té.|個人的には紅茶のほうが好きだ。
w3005|El alcalde pidió perdón públicamente.|市長は公に謝罪した。
w3006|Las vacaciones empiezan oficialmente mañana.|休暇は明日から正式に始まる。
w3007|Legalmente, todavía no puedes manejar.|法的には、君はまだ運転できない。
w3008|Hoy estoy físicamente muy cansado.|今日は体がとても疲れている。
w3009|Cuenta mentalmente hasta diez.|心の中で10まで数えて。
w3010|Fue un día emocionalmente difícil.|気持ちの上でつらい一日だった。
w3011|Es un tema socialmente importante.|それは社会的に重要なテーマだ。
w3012|Mis padres me ayudan económicamente.|両親は私を経済的に助けてくれる。
w3013|Es un tema políticamente delicado.|それは政治的に微妙な話題だ。
w3014|—¡Buen fin de semana! —Igualmente.|「よい週末を！」「あなたもね。」
w3015|Asimismo, les pedimos llegar temprano.|同様に、早めに来るようお願いします。
w3016|Llovía; no obstante, salimos a caminar.|雨が降っていたが、それでも散歩に出かけた。
w3017|Salimos a pesar de la lluvia.|雨にもかかわらず出かけた。
w3018|En cuanto a la fiesta, ya está todo listo.|パーティーに関しては、もう準備万端だ。
w3019|Tengo una pregunta respecto a la tarea.|宿題についてひとつ質問がある。
w3020|De hecho, ya terminé la tarea.|実は、もう宿題を終えた。
w3021|En realidad, no me gusta el café.|実は、コーヒーは好きじゃない。
w3022|En general, los niños duermen temprano.|一般に、子どもは早く寝る。
w3023|Me gustan las frutas, en particular el mango.|果物が好きで、特にマンゴーが好きだ。
w3024|—¿Me ayudas? —¡Por supuesto!|「手伝ってくれる？」「もちろん！」
w3025|Sin duda, es la mejor pizza de la ciudad.|間違いなく、町で一番のピザだ。
w3026|No puedo hacer dos cosas a la vez.|2つのことを同時にはできない。
w3027|Yo cocino; mientras tanto, pon la mesa.|私が料理するから、その間に食卓の準備をして。
w3028|Desde luego que puedes venir.|もちろん来てもいいよ。
w3029|Tomo agua en lugar de refresco.|ジュースの代わりに水を飲む。
w3030|En vez de ver la tele, lee un libro.|テレビを見る代わりに本を読みなさい。
w3031|Aprobé gracias a tu ayuda.|君の助けのおかげで合格した。
w3032|El vuelo se canceló debido a la tormenta.|嵐のため飛行機が欠航した。
w3033|No fui a la escuela a causa de la fiebre.|熱のせいで学校に行かなかった。
w3034|Me gusta el ambiente de este café.|このカフェの雰囲気が好きだ。
w3035|Los niños aprenden de su entorno.|子どもは周りの環境から学ぶ。
w3036|Busca el significado según el contexto.|文脈に合わせて意味を探しなさい。
w3037|Los actores salieron al escenario.|俳優たちが舞台に出てきた。
w3038|Compré un marco para la foto.|写真用の額縁を買った。
w3039|Mi paciencia tiene un límite.|私の忍耐にも限界がある。
w3040|No pongas el vaso en el borde de la mesa.|コップをテーブルの端に置かないで。
w3041|Me lastimé con la punta del cuchillo.|ナイフの先でけがをした。
w3042|El baño está al fondo del pasillo.|トイレは廊下の突き当たりにある。
w3043|Siéntate a mi lado.|私の隣に座って。
w3044|Me duele el costado cuando corro.|走るとわき腹が痛い。
w3045|Escribe tu nombre en el dorso de la hoja.|紙の裏に名前を書いて。
w3046|Llegamos a la cima de la montaña.|山の頂上に着いた。
w3047|El pico de la montaña tiene nieve.|山の峰には雪がある。
w3048|La llanura es muy verde en primavera.|春、平野はとても緑になる。
w3049|Madrid está en una meseta.|マドリードは高原にある。
w3050|Fuimos de excursión a la sierra.|山へハイキングに行った。
w3051|La cordillera de los Andes es muy larga.|アンデス山脈はとても長い。
w3052|América es un continente enorme.|アメリカは巨大な大陸だ。
w3053|En el hemisferio sur, diciembre es verano.|南半球では12月は夏だ。
w3054|La línea del ecuador pasa por Ecuador.|赤道はエクアドルを通っている。
w3055|En el polo norte hace mucho frío.|北極はとても寒い。
w3056|Mi tío obtuvo la ciudadanía mexicana.|叔父はメキシコの市民権を取った。
w3057|Es difícil encontrar vivienda en la ciudad.|都会で住宅を見つけるのは難しい。
w3058|El alquiler sube cada año.|家賃は毎年上がる。
w3059|Mis padres pagan la hipoteca cada mes.|両親は毎月住宅ローンを払っている。
w3060|El nuevo inquilino es muy amable.|新しい入居者はとても親切だ。
w3061|El propietario arregló la ventana.|家主が窓を直した。
w3062|La mudanza es el sábado.|引っ越しは土曜日だ。
w3063|Hay una construcción frente a mi casa.|家の前で工事をしている。
w3064|La casa es de ladrillo rojo.|その家は赤れんが造りだ。
w3065|Los albañiles mezclan el cemento.|職人たちがセメントを混ぜる。
w3066|El edificio tiene columnas de mármol.|その建物には大理石の柱がある。
w3067|Hay un muro alto alrededor del jardín.|庭の周りに高い塀がある。
w3068|El perro saltó la valla.|犬が柵を飛び越えた。
w3069|Las ventanas tienen rejas.|窓には鉄格子がついている。
w3070|Cierra el portón al salir.|出るときに門を閉めて。
w3071|Se rompió una tubería en el baño.|浴室の配管が壊れた。
w3072|El desagüe del lavabo está tapado.|洗面台の排水口が詰まっている。
w3073|El plomero revisó la cañería.|配管工が水道管を点検した。
w3074|El interruptor está junto a la puerta.|スイッチはドアの横にある。
w3075|Hay que cambiar la bombilla.|電球を交換しなければならない。
w3076|Se fundió el foco de la cocina.|台所の電球が切れた。
w3077|Hay un farol en la esquina.|角に街灯がある。
w3078|Maneja por el carril derecho.|右の車線を走って。
w3079|Hay una curva peligrosa más adelante.|この先に危ないカーブがある。
w3080|Después de la curva viene una recta larga.|カーブの後に長い直線がある。
w3081|Hay un atasco en la autopista.|高速道路で渋滞している。
w3082|Llegamos tarde por un embotellamiento.|渋滞のせいで遅れて着いた。
w3083|Hubo un choque en la avenida.|大通りで衝突事故があった。
w3084|La grúa se llevó el carro mal estacionado.|レッカー車が違法駐車の車を持っていった。
w3085|Llevamos las bicicletas en un remolque.|自転車をトレーラーに載せて運んだ。
w3086|Vimos un velero en el mar.|海で帆船を見た。
w3087|Paseamos en bote por el lago.|湖でボートに乗った。
w3088|Fuimos a la isla en lancha.|モーターボートで島に行った。
w3089|Remamos en canoa por el río.|川でカヌーをこいだ。
w3090|El submarino bajó al fondo del mar.|潜水艦が海の底へ潜った。
w3091|Un helicóptero voló sobre la ciudad.|ヘリコプターが町の上を飛んだ。
w3092|La nave espacial llegó a la Luna.|宇宙船が月に着いた。
w3093|Nos sentamos en el último vagón.|最後の車両に座った。
w3094|La locomotora antigua echaba humo.|古い機関車は煙を出していた。
w3095|No camines por la vía del tren.|線路を歩かないで。
w3096|Mis abuelos hicieron un crucero por el Caribe.|祖父母はカリブ海クルーズをした。
w3097|Viajó por Sudamérica como mochilero.|彼はバックパッカーとして南米を旅した。
w3098|Dormimos en un hostal barato.|安い簡易ホテルに泊まった。
w3099|Nos quedamos en un albergue juvenil.|ユースホステルに泊まった。
w3100|La casa tiene un cuarto para huéspedes.|その家には客用の部屋がある。
w3101|El anfitrión nos recibió con una sonrisa.|ホストは笑顔で迎えてくれた。
w3102|La recepcionista nos dio la llave.|受付係が鍵をくれた。
w3103|El conserje abre el edificio a las seis.|管理人は6時に建物を開ける。
w3104|El vigilante cuida el estacionamiento.|警備員が駐車場を見張っている。
w3105|Hay un guardia en la entrada.|入り口に警備員がいる。
w3106|Mi hijo quiere ser detective.|息子は探偵になりたがっている。
w3107|Fue testigo del accidente.|彼はその事故の目撃者だった。
w3108|La policía detuvo al sospechoso.|警察は容疑者を逮捕した。
w3109|El acusado dijo que era inocente.|被告は無実だと言った。
w3110|El fiscal presentó las pruebas.|検察官が証拠を提出した。
w3111|El caso llegó al tribunal.|その事件は裁判所に持ち込まれた。
w3112|El juez leyó la sentencia.|裁判官が判決を読み上げた。
w3113|Recibió una pena de dos años.|彼は2年の刑を受けた。
w3114|Como castigo, hoy no hay tele.|罰として、今日はテレビなし。
w3115|El ladrón está en prisión.|泥棒は刑務所にいる。
w3116|El preso salió libre después de cinco años.|囚人は5年後に釈放された。
w3117|Hubo un robo en la tienda.|店で盗難があった。
w3118|Sufrió un asalto en el autobús.|彼はバスの中で強盗にあった。
w3119|Ese mensaje es una estafa.|そのメッセージは詐欺だ。
w3120|Descubrieron un fraude en la empresa.|会社で不正が発覚した。
w3121|La gente está cansada de la corrupción.|人々は汚職にうんざりしている。
w3122|El policía rechazó el soborno.|その警官は賄賂を断った。
w3123|Hicimos la denuncia del robo.|盗難の届け出をした。
w3124|El detective encontró una pista.|探偵は手がかりを見つけた。
w3125|Vimos huellas de perro en la nieve.|雪の上に犬の足跡を見た。
w3126|No dejaron ningún rastro.|彼らは何の痕跡も残さなかった。
w3127|La policía encontró nuevas evidencias.|警察は新しい証拠を見つけた。
w3128|¿Me guardas un secreto?|秘密を守ってくれる？
w3129|Es un misterio dónde está mi calcetín.|私の靴下がどこにあるかは謎だ。
w3130|Su desaparición sigue siendo un enigma.|彼の失踪は今も謎のままだ。
w3131|Te enseño un truco para cocinar el arroz.|ご飯を炊くこつを教えてあげる。
w3132|Es solo una broma, no te enojes.|ただの冗談だよ、怒らないで。
w3133|Mi papá cuenta chistes muy malos.|父はとてもつまらないジョークを言う。
w3134|Hicimos una apuesta sobre el partido.|試合について賭けをした。
w3135|Elegimos un número al azar.|番号を無作為に選んだ。
w3136|¡Qué casualidad verte aquí!|ここで会うなんて偶然だね！
w3137|Por fortuna, nadie se lastimó.|幸運にも、誰もけがをしなかった。
w3138|Por desgracia, perdimos el partido.|残念ながら、試合に負けた。
w3139|Romeo y Julieta es una tragedia famosa.|『ロミオとジュリエット』は有名な悲劇だ。
w3140|Vimos una comedia muy divertida.|とても面白いコメディを見た。
w3141|Me gusta ver dramas coreanos.|韓国ドラマを見るのが好きだ。
w3142|Vimos una película de terror.|ホラー映画を見た。
w3143|Me encantan las novelas de suspenso.|サスペンス小説が大好きだ。
w3144|Me gusta la ciencia ficción.|SFが好きだ。
w3145|Tu sueño se hizo realidad.|君の夢が現実になった。
w3146|A los niños les encantan los cuentos de fantasía.|子どもたちはファンタジーの物語が大好きだ。
w3147|Mi abuela me contó una leyenda antigua.|祖母が昔の伝説を話してくれた。
w3148|Conocemos muchos mitos griegos.|私たちはギリシャ神話をたくさん知っている。
w3149|La fábula de la tortuga y la liebre es famosa.|ウサギとカメの寓話は有名だ。
w3150|Mi papá es mi héroe.|父は私のヒーローだ。
w3151|La heroína de la película es muy valiente.|その映画のヒロインはとても勇敢だ。
w3152|El villano siempre pierde al final.|悪役はいつも最後に負ける。
w3153|El niño tiene miedo de los monstruos.|その子は怪物を怖がっている。
w3154|Dicen que hay un fantasma en esa casa.|あの家には幽霊が出るそうだ。
w3155|La bruja vuela en su escoba.|魔女はほうきに乗って飛ぶ。
w3156|El mago sacó un conejo del sombrero.|手品師が帽子からウサギを出した。
w3157|Con un poco de magia, todo es posible.|少しの魔法があれば、何でもできる。
w3158|El hada madrina ayudó a Cenicienta.|妖精のおばあさんがシンデレラを助けた。
w3159|El caballero luchó contra el dragón.|騎士は竜と戦った。
w3160|Blancanieves vivía con siete enanos.|白雪姫は7人の小人と暮らしていた。
w3161|Los piratas buscaban un tesoro.|海賊たちは宝を探していた。
w3162|El rey lleva una corona de oro.|王様は金の王冠をかぶっている。
w3163|Hicimos un castillo de arena en la playa.|浜辺で砂の城を作った。
w3164|Visitamos el palacio del rey.|王の宮殿を訪れた。
w3165|En Kioto hay muchos templos antiguos.|京都には古い寺がたくさんある。
w3166|La catedral está en la plaza principal.|大聖堂は中央広場にある。
w3167|Nos tomamos una foto frente al monumento.|記念碑の前で写真を撮った。
w3168|Hay una estatua en el centro del parque.|公園の真ん中に像がある。
w3169|Visitamos las ruinas mayas.|マヤの遺跡を訪れた。
w3170|Subimos a la pirámide del Sol.|太陽のピラミッドに登った。
w3171|Los mayas fueron una gran civilización.|マヤは偉大な文明だった。
w3172|El Imperio inca era muy grande.|インカ帝国はとても大きかった。
w3173|México fue una colonia española.|メキシコはスペインの植民地だった。
w3174|Estudiamos la conquista de América.|アメリカ大陸の征服について勉強している。
w3175|Celebramos el Día de la Independencia.|独立記念日を祝う。
w3176|La Revolución mexicana empezó en 1910.|メキシコ革命は1910年に始まった。
w3177|Mis antepasados eran de Galicia.|私の祖先はガリシア出身だった。
w3178|Es descendiente de japoneses.|彼は日本人の子孫だ。
w3179|Recibió una casa como herencia.|彼は遺産として家を受け継いだ。
w3180|Ese centro histórico es patrimonio de la humanidad.|その歴史地区は世界遺産だ。
w3181|Fuimos a un festival de música.|音楽フェスに行った。
w3182|En carnaval todos se disfrazan.|カーニバルではみんな仮装する。
w3183|Vimos el desfile desde el balcón.|バルコニーからパレードを見た。
w3184|Fuimos a la feria del libro.|ブックフェアに行った。
w3185|La ceremonia de graduación fue emocionante.|卒業式は感動的だった。
w3186|Hoy es el aniversario de bodas de mis padres.|今日は両親の結婚記念日だ。
w3187|Hicieron un homenaje al maestro.|先生に敬意を表する会を開いた。
w3188|Hagamos un brindis por los novios.|新郎新婦に乾杯しよう。
w3189|Gracias por la invitación a tu fiesta.|パーティーに招待してくれてありがとう。
w3190|Los invitados llegan a las siete.|招待客は7時に来る。
w3191|¿De qué es tu disfraz?|君の仮装は何？
w3192|Me puse una máscara de león.|ライオンのお面をつけた。
w3193|Vimos los fuegos artificiales en Año Nuevo.|新年に花火を見た。
w3194|Te mando una postal desde Cancún.|カンクンから絵はがきを送るね。
w3195|Compramos artesanías en el mercado.|市場で民芸品を買った。
w3196|Mi mamá hace cerámica los sábados.|母は毎週土曜日に陶芸をする。
w3197|Ella guarda sus joyas en una caja.|彼女は宝石を箱にしまっている。
w3198|El anillo tiene un diamante pequeño.|その指輪には小さなダイヤが付いている。
w3199|Mi abuela tiene un collar de perlas.|祖母は真珠のネックレスを持っている。
w3200|Ten cuidado, el vaso es de cristal.|気をつけて、そのコップはガラス製だ。
w3201|Esta mesa es de metal.|このテーブルは金属製です。
w3202|El puente está hecho de acero.|その橋は鋼鉄でできています。
w3203|Los cables son de cobre.|そのケーブルは銅でできています。
w3204|Las latas de refresco son de aluminio.|ジュースの缶はアルミ製です。
w3205|La estatua del parque es de bronce.|公園の像は青銅でできています。
w3206|El piso de la entrada es de mármol.|玄関の床は大理石です。
w3207|Mi abuela tiene una blusa de seda.|祖母は絹のブラウスを持っています。
w3208|Esta camisa de lino es muy fresca.|この麻のシャツはとても涼しいです。
w3209|Mi mamá usa un perfume muy suave.|母はとても優しい香りの香水を使っています。
w3210|Compré unos cosméticos en la farmacia.|薬局で化粧品を買いました。
w3211|Ella casi no usa maquillaje.|彼女はほとんど化粧をしません。
w3212|Se puso un lápiz labial rojo.|彼女は赤い口紅を塗りました。
w3213|Me gusta el esmalte de uñas azul.|青いマニキュアが好きです。
w3214|¡Qué bonito peinado tienes hoy!|今日はすてきな髪型だね！
w3215|Necesito un corte de pelo pronto.|そろそろ散髪しないといけません。
w3216|Mi tío tiene un tatuaje en el brazo.|おじは腕にタトゥーがあります。
w3217|Mi abuelo tiene arrugas en la frente.|祖父は額にしわがあります。
w3218|Tengo una cicatriz en la rodilla.|ひざに傷跡があります。
w3219|Tiene un lunar cerca de la boca.|彼は口の近くにほくろがあります。
w3220|Mi hermana tiene pecas en la nariz.|妹は鼻にそばかすがあります。
w3221|Después de correr, estaba lleno de sudor.|走った後、汗びっしょりでした。
w3222|El llanto del bebé me despertó.|赤ちゃんの泣き声で目が覚めました。
w3223|Escuché un grito en la calle.|通りで叫び声が聞こえました。
w3224|Dio un suspiro de alivio.|彼はほっとため息をつきました。
w3225|El bostezo es contagioso.|あくびはうつります。
w3226|Ese estornudo fue muy fuerte.|今のくしゃみはとても大きかったです。
w3227|Me hizo un gesto con la mano.|彼は私に手で合図しました。
w3228|Siéntate con buena postura.|よい姿勢で座りなさい。
w3229|El niño dio un salto muy alto.|その子はとても高くジャンプしました。
w3230|Tuvo una caída en la escalera.|彼は階段で転びました。
w3231|Me di un golpe en la cabeza.|頭をぶつけました。
w3232|Alguien me dio un empujón en la fila.|列で誰かに押されました。
w3233|No pude hallar mis llaves.|鍵が見つかりませんでした。
w3234|Con eso basta, gracias.|それで十分です、ありがとう。
w3235|Todos callaron cuando entró la maestra.|先生が入ってくると皆黙りました。
w3236|Quiero solicitar una beca.|奨学金を申請したいです。
w3237|Los bomberos acudieron rápidamente.|消防士がすぐに駆けつけました。
w3238|Voy a averiguar a qué hora abre.|何時に開くか調べてみます。
w3239|¡Adivina quién vino hoy!|今日誰が来たか当ててみて！
w3240|Su abuelo falleció el año pasado.|彼の祖父は去年亡くなりました。
w3241|Optamos por quedarnos en casa.|私たちは家にいることを選びました。
w3242|Percibí un olor extraño en la cocina.|台所で変なにおいに気づきました。
w3243|El canal emite noticias todo el día.|そのチャンネルは一日中ニュースを放送しています。
w3244|Cada uno aportó una idea.|一人ひとりがアイデアを出しました。
w3245|Me encanta la belleza del paisaje.|その景色の美しさが大好きです。
w3246|Su bondad es conocida por todos.|彼の優しさは皆に知られています。
w3247|No lo sé con certeza.|確かなことはわかりません。
w3248|Ese perro muestra mucha lealtad.|その犬はとても忠実です。
w3249|Maneja con precaución, por favor.|気をつけて運転してね。
w3250|Hay que actuar con prudencia.|慎重に行動しなければなりません。
w3251|Miró a su hijo con ternura.|彼女は息子を優しく見つめました。
w3252|Mostró mucha valentía en el rescate.|彼は救助で大きな勇気を示しました。
w3253|El curso abarca muchos temas.|その講座は多くのテーマを含んでいます。
w3254|Esta granja abastece de leche al pueblo.|この農場は村に牛乳を供給しています。
w3255|El país abolió la esclavitud hace siglos.|その国は何世紀も前に奴隷制を廃止しました。
w3256|Tanto trabajo me abruma.|仕事が多すぎて参っています。
w3257|Esa decisión puede acarrear problemas.|その決定は問題を引き起こすかもしれません。
w3258|Hay que acatar las reglas del colegio.|学校の規則に従わなければなりません。
w3259|No puedo acceder a mi correo.|メールにアクセスできません。
w3260|La luz acentúa los colores del cuadro.|光が絵の色を際立たせています。
w3261|La familia acogió a un perro sin hogar.|その家族は家のない犬を引き取りました。
w3262|Nadie sabe lo que acontecerá mañana.|明日何が起こるか誰にもわかりません。
w3263|Acumulé muchos puntos en la tienda.|お店でポイントをたくさんためました。
w3264|Te adjunto las fotos del viaje.|旅行の写真を添付するね。
w3265|La escuela adoptó un nuevo método.|学校は新しい方法を採用しました。
w3266|Adornamos el árbol de Navidad.|クリスマスツリーを飾りました。
w3267|Hay que afrontar los problemas.|問題に立ち向かわなければなりません。
w3268|La lluvia agravó el tráfico.|雨で渋滞が悪化しました。
w3269|Agrupa los libros por color.|本を色ごとにまとめて。
w3270|La maestra alabó su dibujo.|先生は彼の絵をほめました。
w3271|Mis padres siempre me alientan.|両親はいつも私を励ましてくれます。
w3272|Esta medicina alivia el dolor.|この薬は痛みを和らげます。
w3273|Almacenamos la comida en el sótano.|食料を地下室に保管しています。
w3274|Mis tíos nos alojaron una semana.|おじ夫婦が私たちを一週間泊めてくれました。
w3275|Alterno el estudio con el deporte.|勉強とスポーツを交互にしています。
w3276|La alfombra amortigua el ruido.|じゅうたんが音を和らげます。
w3277|Anhelo ver a mi familia otra vez.|また家族に会えることを切望しています。
w3278|Nadie anticipó tanta lluvia.|こんなに雨が降るとは誰も予想していませんでした。
w3279|Tuvimos que anular la reserva.|予約を取り消さなければなりませんでした。
w3280|La mamá apaciguó al bebé.|母親は赤ちゃんをなだめました。
w3281|Te apuesto que va a llover.|雨が降るって賭けてもいいよ。
w3282|Los ladrones se apoderaron del dinero.|泥棒たちはお金を奪い取りました。
w3283|No te apresures, tenemos tiempo.|急がないで、時間はあるから。
w3284|No te aproveches de su bondad.|彼の優しさにつけこまないで。
w3285|Me apunté a la clase de baile.|ダンス教室に申し込みました。
w3286|Esa costumbre arraigó en el pueblo.|その習慣は村に根付きました。
w3287|El niño arrastra su mochila.|その子はリュックを引きずっています。
w3288|Le arrebataron el bolso en la calle.|彼女は通りでバッグをひったくられました。
w3289|No arrojes basura al río.|川にゴミを投げ捨てないで。
w3290|Debes articular bien tus ideas.|考えをきちんと組み立てるべきです。
w3291|Él asintió con la cabeza.|彼はうなずいて同意しました。
w3292|Su talento nos asombró a todos.|彼の才能は私たち皆を驚かせました。
w3293|Aspira el aire fresco del mar.|海の新鮮な空気を吸い込んで。
w3294|Las cortinas atenúan la luz del sol.|カーテンが日差しを弱めます。
w3295|Las tormentas aterrorizan a mi perro.|嵐は私の犬をひどく怖がらせます。
w3296|Atravesamos el parque para llegar.|公園を横切って行きました。
w3297|Esas nubes auguran tormenta.|あの雲は嵐を予感させます。
w3298|No me avergüences delante de mis amigos.|友だちの前で恥をかかせないで。
w3299|Un árbol caído bloqueó la carretera.|倒れた木が道路をふさぎました。
w3300|Caminamos bordeando el lago.|湖に沿って歩きました。
w3301|Ya brotaron las flores del jardín.|庭の花がもう芽を出しました。
w3302|Canaliza tu energía en el deporte.|そのエネルギーをスポーツに向けなさい。
w3303|La empresa capacita a sus empleados.|その会社は社員を研修しています。
w3304|La policía capturó al ladrón.|警察は泥棒を捕まえました。
w3305|Esta sopa carece de sal.|このスープは塩が足りません。
w3306|Catalogamos todos los libros de la biblioteca.|図書館の本をすべて目録にしました。
w3307|Cedí mi asiento a una señora mayor.|年配の女性に席を譲りました。
w3308|El gobierno censuró la película.|政府はその映画を検閲しました。
w3309|Por fin cesó la lluvia.|ようやく雨がやみました。
w3310|La sangre circula por todo el cuerpo.|血液は全身を循環しています。
w3311|El profesor citó a un escritor famoso.|先生は有名な作家の言葉を引用しました。
w3312|Clasifica la basura antes de tirarla.|捨てる前にゴミを分別して。
w3313|Nuestras opiniones coinciden.|私たちの意見は一致しています。
w3314|El tráfico colapsó por la lluvia.|雨で交通が麻痺しました。
w3315|Hay que combatir la contaminación.|汚染と戦わなければなりません。
w3316|Compadezco a los que trabajan hoy.|今日働いている人たちに同情します。
w3317|Es difícil complacer a todos.|皆を満足させるのは難しいです。
w3318|La fruta complementa bien el desayuno.|果物は朝食をうまく補ってくれます。
w3319|Comprime el archivo antes de enviarlo.|送る前にファイルを圧縮して。
w3320|No se computan los días festivos.|祝日は数に入りません。
w3321|Concertamos una cita con el médico.|医者の予約を取りました。
w3322|Es difícil conciliar el trabajo y la familia.|仕事と家庭を両立させるのは難しいです。
w3323|El clima condiciona nuestros planes.|天気が私たちの予定を左右します。
w3324|La universidad le confirió un premio.|大学は彼に賞を授けました。
w3325|Ayúdame a configurar el teléfono.|電話の設定を手伝って。
w3326|Congelé la carne para la próxima semana.|来週用に肉を冷凍しました。
w3327|Hoy aprendimos a conjugar verbos.|今日は動詞の活用を学びました。
w3328|El equipo consolidó su primer lugar.|チームは首位を固めました。
w3329|Pudimos constatar que todo estaba bien.|すべて問題ないことを確認できました。
w3330|Al fin consumaron su plan.|ついに彼らは計画を成し遂げました。
w3331|Nos gusta contemplar las estrellas.|私たちは星を眺めるのが好きです。
w3332|Bebe agua para contrarrestar el calor.|暑さに負けないように水を飲んで。
w3333|Ese color contrasta con la pared.|その色は壁と対照的です。
w3334|El director convocó una reunión.|校長は会議を招集しました。
w3335|Ella coordina las actividades del club.|彼女はクラブの活動をまとめています。
w3336|Pedí que me cotizaran la reparación.|修理の見積もりを頼みました。
w3337|Muchos cuestionan esa decisión.|多くの人がその決定を疑問視しています。
w3338|La fiesta culminó con fuegos artificiales.|パーティーは花火で締めくくられました。
w3339|No culpes a tu hermano.|弟のせいにしないで。
w3340|Deduje que estabas cansado.|君が疲れているんだと推測しました。
w3341|Un buen jefe sabe delegar.|よい上司は仕事を任せることができます。
w3342|El jurado deliberó durante horas.|陪審は何時間も審議しました。
w3343|El tren demoró una hora.|電車は1時間遅れました。
w3344|Esta palabra deriva del latín.|この単語はラテン語から派生しています。
w3345|Nuestro equipo derrotó al campeón.|私たちのチームはチャンピオンを打ち破りました。
w3346|Van a derrumbar el edificio viejo.|古い建物を取り壊す予定です。
w3347|Desata el nudo con cuidado.|結び目を注意してほどいて。
w3348|No descartamos ninguna opción.|私たちはどの選択肢も除外していません。
w3349|No puedo descifrar su letra.|彼の字が読み解けません。
w3350|Desconecta el cargador, por favor.|充電器を抜いてください。
w3351|Ella desempeña un papel importante.|彼女は重要な役割を果たしています。
w3352|Un comentario desencadenó la discusión.|一言が口論を引き起こしました。
w3353|El juez desestimó la demanda.|裁判官は訴えを却下しました。
w3354|El actor desmintió los rumores.|その俳優はうわさを否定しました。
w3355|Por la tarde se despejó el cielo.|午後には空が晴れました。
w3356|Desplaza la silla un poco a la izquierda.|いすを少し左に動かして。
w3357|Desprende la etiqueta con cuidado.|ラベルを注意してはがして。
w3358|Destinamos ese dinero a las vacaciones.|そのお金を休暇に充てます。
w3359|Por fin desveló su secreto.|ついに彼は秘密を明かしました。
w3360|Desviaron el tráfico por las obras.|工事のため交通が迂回させられました。
w3361|El médico le diagnosticó una gripe.|医者は彼をインフルエンザと診断しました。
w3362|La maestra dictó un texto corto.|先生は短い文を書き取らせました。
w3363|No debes difamar a nadie.|誰のことも中傷してはいけません。
w3364|No dilates más la decisión.|これ以上決定を延ばさないで。
w3365|Discrepo contigo en eso.|その点では君と意見が違います。
w3366|No pudo disimular su alegría.|彼は喜びを隠せませんでした。
w3367|Disuelve el azúcar en el agua.|砂糖を水に溶かして。
w3368|Lo disuadimos de salir con la tormenta.|嵐の中出かけるのを彼に思いとどまらせました。
w3369|No divagues y ve al grano.|話をそらさずに要点を言って。
w3370|No divulgues mi secreto.|私の秘密を広めないで。
w3371|Siempre elude mis preguntas.|彼はいつも私の質問を避けます。
w3372|De la cocina emana un olor delicioso.|台所からおいしいにおいが漂ってきます。
w3373|El banco embargó la casa.|銀行はその家を差し押さえました。
w3374|La ballena emergió del agua.|クジラが水面に浮かび上がりました。
w3375|Es importante empatizar con los demás.|他人に共感することは大切です。
w3376|Mi hermano quiere emprender un negocio.|兄は事業を始めたがっています。
w3377|Ella encabeza el grupo de estudio.|彼女は勉強会を率いています。
w3378|Esta pieza no encaja aquí.|このピースはここにははまりません。
w3379|Tenemos que encarar la realidad.|現実に向き合わなければなりません。
w3380|Los padres encauzan a sus hijos.|親は子どもを正しい方向へ導きます。
w3381|El maestro enfatizó la importancia de leer.|先生は読書の大切さを強調しました。
w3382|La violencia engendra más violencia.|暴力はさらなる暴力を生み出します。
w3383|Este puente enlaza las dos ciudades.|この橋は2つの町を結んでいます。
w3384|Quiero enmendar mi error.|自分の誤りを正したいです。
w3385|Entablamos una conversación en el tren.|電車で会話を始めました。
w3386|La nieve entorpeció el tráfico.|雪が交通を妨げました。
w3387|Ese viaje entraña algunos riesgos.|その旅にはいくつかの危険が伴います。
w3388|No te entrometas en mis asuntos.|私のことに口出ししないで。
w3389|Enumera tres frutas que te gustan.|好きな果物を3つ挙げて。
w3390|Queremos erradicar el hambre.|私たちは飢餓を根絶したいです。
w3391|Erigieron una estatua en la plaza.|広場に像が建てられました。
w3392|En verano escasea el agua.|夏は水が不足します。
w3393|La policía esclareció el caso.|警察はその事件を解明しました。
w3394|Esgrimió buenos argumentos en el debate.|彼は討論で説得力のある論拠を持ち出しました。
w3395|No especules sin saber los hechos.|事実を知らずに憶測しないで。
w3396|Esquivó la pelota con agilidad.|彼はボールを素早くかわしました。
w3397|El proyecto se estancó por falta de dinero.|資金不足で計画が停滞しました。
w3398|El contrato estipula el horario de trabajo.|契約は勤務時間を定めています。
w3399|No puedes evadir tus responsabilidades.|責任から逃れることはできません。
w3400|Esta canción evoca mi infancia.|この歌は子どもの頃を思い起こさせます。
w3401|El museo exhibe pinturas antiguas.|その美術館は古い絵を展示しています。
w3402|La empresa quiere expandir su negocio.|その会社は事業を拡大したいと考えています。
w3403|El abuelo se explayó contando historias.|祖父は思い出話を長々と語りました。
w3404|Los bomberos extinguieron el incendio.|消防士たちは火事を消しました。
w3405|El dentista me extrajo una muela.|歯医者は私の奥歯を抜きました。
w3406|Los precios fluctúan cada semana.|価格は毎週変動します。
w3407|Forjaron una gran amistad en la escuela.|彼らは学校で深い友情を築きました。
w3408|¿Puedo formular una pregunta?|質問をしてもいいですか？
w3409|Las dos empresas se fusionaron.|2つの会社が合併しました。
w3410|El poema glorifica a los héroes.|その詩は英雄たちを称えています。
w3411|El presidente gobierna el país.|大統領が国を治めています。
w3412|El gobierno grava los productos de lujo.|政府はぜいたく品に課税しています。
w3413|No debes hostigar a tus compañeros.|クラスメートに嫌がらせをしてはいけません。
w3414|Ideamos un juego nuevo.|私たちは新しいゲームを考え出しました。
w3415|El maestro ilustró la idea con un ejemplo.|先生は例を使ってその考えを説明しました。
w3416|Ella imparte clases de inglés.|彼女は英語の授業をしています。
w3417|El colegio implantó un nuevo horario.|学校は新しい時間割を導入しました。
w3418|Vamos a implementar el plan en enero.|1月にその計画を実施します。
w3419|El gobierno impulsa el turismo.|政府は観光を推進しています。
w3420|Queremos incentivar la lectura en casa.|家庭での読書を奨励したいです。
w3421|El clima incide en nuestro ánimo.|天気は私たちの気分に影響を及ぼします。
w3422|Incorpora el huevo a la mezcla.|卵を生地に加えて。
w3423|Mis padres me inculcaron el respeto.|両親は私に敬意の大切さを教え込みました。
w3424|La periodista indagó sobre el caso.|その記者は事件について調べました。
w3425|De sus palabras infiero que está triste.|彼の言葉から悲しんでいるのだと推測します。
w3426|No infrinjas las reglas de tránsito.|交通ルールに違反しないで。
w3427|No quiero inmiscuirme en tu vida.|君の生活に口出ししたくありません。
w3428|¿Qué estás insinuando?|何をほのめかしているの？
w3429|Instauraron una nueva tradición familiar.|新しい家族の伝統を作りました。
w3430|Mi abuela intercedió por mí.|祖母が私のために取りなしてくれました。
w3431|Intuí que algo andaba mal.|何かがおかしいと直感しました。
w3432|Las hormigas invadieron la cocina.|アリが台所に押し寄せました。
w3433|No me involucres en tus problemas.|君の問題に私を巻き込まないで。
w3434|El perro irrumpió en la sala.|犬が居間に飛び込んできました。
w3435|Nada justifica la violencia.|何ものも暴力を正当化しません。
w3436|El congreso legisla sobre la educación.|議会は教育に関する法律を制定します。
w3437|Tengo que lidiar con mucho estrés.|たくさんのストレスに対処しなければなりません。
w3438|No manipules los cables eléctricos.|電気のコードをいじらないで。
w3439|El maestro medió entre los dos niños.|先生は2人の子どもの間を取りなしました。
w3440|No menosprecies el trabajo de otros.|他人の仕事を軽んじないで。
w3441|Los árboles mitigan el calor de la ciudad.|木々は街の暑さを和らげます。
w3442|Modera el volumen, por favor.|音量を抑えてください。
w3443|Moldeamos figuras con plastilina.|粘土で人形を作りました。
w3444|El pueblo se movilizó para ayudar.|町の人々は助けるために立ち上がりました。
w3445|El limón neutraliza el olor a pescado.|レモンは魚のにおいを打ち消します。
w3446|Un coche obstaculizaba la salida.|車が出口をふさいでいました。
w3447|La temperatura oscila entre diez y veinte grados.|気温は10度から20度の間で変動します。
w3448|Pactamos no pelear más.|もうけんかしないと約束しました。
w3449|Una empresa patrocina a nuestro equipo.|ある会社が私たちのチームのスポンサーです。
w3450|Su recuerdo perdurará siempre.|彼の思い出はずっと残り続けるでしょう。
w3451|Quiero perfeccionar mi español.|スペイン語に磨きをかけたいです。
w3452|Si el dolor persiste, ve al médico.|痛みが続くなら医者に行って。
w3453|Plasmó sus ideas en un dibujo.|彼は自分の考えを絵で表現しました。
w3454|Hay que ponderar los pros y los contras.|長所と短所を吟味しなければなりません。
w3455|Voy a postular a ese trabajo.|その仕事に応募するつもりです。
w3456|En este jardín predominan las rosas.|この庭ではバラが多くを占めています。
w3457|No puedo prescindir del café.|コーヒーなしではやっていけません。
w3458|Presenciamos un accidente en la esquina.|角で事故を目撃しました。
w3459|Al final prevaleció la verdad.|最後には真実が勝ちました。
w3460|Debes priorizar tu salud.|健康を優先すべきです。
w3461|Lo proclamaron campeón del torneo.|彼は大会の優勝者として発表されました。
w3462|Prolongamos las vacaciones un día.|休暇を1日延長しました。
w3463|El viento propagó el fuego.|風が火を広げました。
w3464|El negocio de mi tía prosperó.|おばの商売は繁盛しました。
w3465|Después de comer, proseguimos el viaje.|食事の後、旅を続けました。
w3466|Esta fruta proviene de México.|この果物はメキシコ産です。
w3467|El problema radica en la falta de tiempo.|問題は時間不足にあります。
w3468|El país ratificó el acuerdo.|その国は協定を批准しました。
w3469|Recaudamos dinero para la escuela.|学校のためにお金を集めました。
w3470|Recopilé todas las recetas de mi abuela.|祖母のレシピを全部まとめました。
w3471|Rectifica la fecha en el formulario.|用紙の日付を訂正して。
w3472|Redacta un correo para la maestra.|先生へのメールを書いて。
w3473|La tienda me reembolsó el dinero.|お店がお金を返金してくれました。
w3474|Es difícil refutar sus argumentos.|彼の主張に反論するのは難しいです。
w3475|Estas reglas rigen en todo el colegio.|これらの規則は学校全体に適用されます。
w3476|Los trabajadores reivindican sus derechos.|労働者たちは自分たちの権利を要求しています。
w3477|Ya no se puede remediar.|もうどうしようもありません。
w3478|Esta casa se remonta al siglo pasado.|この家は前世紀にさかのぼります。
w3479|¡No te rindas nunca!|絶対にあきらめないで！
w3480|Dormir poco repercute en la salud.|睡眠不足は健康に影響します。
w3481|No pude reprimir la risa.|笑いをこらえられませんでした。
w3482|No me reproches nada.|私を責めないで。
w3483|Mi tía reside en Lima.|おばはリマに住んでいます。
w3484|Ya restablecieron la luz en el barrio.|地域の電気がもう復旧しました。
w3485|Este color resalta tus ojos.|この色は君の目を引き立てます。
w3486|Retomamos la clase después del recreo.|休み時間の後、授業を再開しました。
w3487|El pintor retrató a mi abuela.|その画家は祖母の肖像を描きました。
w3488|Todavía podemos revertir la situación.|まだ状況を元に戻すことができます。
w3489|Debemos salvaguardar la naturaleza.|私たちは自然を守らなければなりません。
w3490|Las llamadas saturaron la línea.|電話が殺到して回線がいっぱいになりました。
w3491|En la película secuestran a un niño.|その映画では子どもが誘拐されます。
w3492|El precio sobrepasa nuestro presupuesto.|値段が私たちの予算を超えています。
w3493|Las mentiras socavan la confianza.|うそは信頼をむしばみます。
w3494|Vamos a sortear un premio en la fiesta.|パーティーで景品を抽選します。
w3495|No subestimes a tu rival.|相手を甘く見ないで。
w3496|Esa tradición aún subsiste.|その伝統は今も残っています。
w3497|La empresa suministra agua a la ciudad.|その会社は市に水を供給しています。
w3498|Suprimieron el examen final.|期末試験が廃止されました。
w3499|Mi padre sustenta a la familia.|父が家族を養っています。
w3500|No tergiverses mis palabras.|私の言葉を曲解しないで。
w3501|Estoy tramitando mi pasaporte.|パスポートの手続きをしています。
w3502|La noticia trascendió rápidamente.|そのニュースはすぐに知れ渡りました。
w3503|La lluvia trastornó nuestros planes.|雨で私たちの計画が狂いました。
w3504|Usurpó el puesto de su jefe.|彼は上司の地位を奪いました。
w3505|No vaciles en pedir ayuda.|ためらわずに助けを求めて。
w3506|A lo lejos vislumbramos el mar.|遠くに海がかすかに見えました。
w3507|Esa ley vulnera nuestros derechos.|その法律は私たちの権利を侵害しています。
w3508|Trabaja en el ámbito de la salud.|彼は医療分野で働いています。
w3509|Hablamos de temas de toda índole.|私たちはあらゆる種類の話題について話しました。
w3510|Necesitamos un enfoque diferente.|違うアプローチが必要です。
w3511|Desde mi perspectiva, es una buena idea.|私の視点では、それはよい考えです。
w3512|Cada uno tiene su propio criterio.|人それぞれ自分の判断基準があります。
w3513|Ajusta los parámetros del programa.|プログラムのパラメーターを調整して。
w3514|Partimos de una premisa falsa.|私たちは間違った前提から出発しました。
w3515|Perdí la noción del tiempo.|時間の感覚を失いました。
w3516|Esa palabra tiene otro matiz.|その言葉には別のニュアンスがあります。
w3517|Es una paradoja interesante.|それは興味深い逆説です。
w3518|Estoy ante un dilema difícil.|私は難しいジレンマに直面しています。
w3519|La película causó mucha polémica.|その映画は大きな物議を醸しました。
w3520|El nuevo horario generó controversia.|新しい時間割は議論を呼びました。
w3521|Llegamos a un consenso en la familia.|家族で合意に達しました。
w3522|Hay una discrepancia en las cuentas.|計算に食い違いがあります。
w3523|Hay una contradicción en su historia.|彼の話には矛盾があります。
w3524|Tu respuesta no tiene coherencia.|君の答えには一貫性がありません。
w3525|Estudió el tema con rigor.|彼はそのテーマを厳密に研究しました。
w3526|El boleto tiene validez por un mes.|その切符は1か月有効です。
w3527|Nadie duda de la eficacia de esta vacuna.|このワクチンの有効性を疑う人はいません。
w3528|Trabaja con mucha eficiencia.|彼はとても効率よく働きます。
w3529|Su rendimiento escolar mejoró mucho.|彼の学校の成績はとても上がりました。
w3530|Su desempeño en el trabajo es excelente.|彼の仕事ぶりは優秀です。
w3531|Dormir bien mejora la productividad.|よく眠ると生産性が上がります。
w3532|La empresa busca mejorar su competitividad.|その会社は競争力の向上を目指しています。
w3533|Hablamos de la sostenibilidad en clase.|授業で持続可能性について話しました。
w3534|Estudiamos la viabilidad del proyecto.|計画の実現可能性を検討しました。
w3535|El negocio tiene buena rentabilidad.|その商売は収益性が高いです。
w3536|Estudiar es una buena inversión.|勉強はよい投資です。
w3537|Un inversor apoyó la nueva tienda.|ある投資家が新しい店を支援しました。
w3538|Mi tío es accionista de la empresa.|おじはその会社の株主です。
w3539|Ayudar a la señora fue una buena acción.|その女性を助けたのはよい行いでした。
w3540|La bolsa de valores subió hoy.|今日は株式市場が上がりました。
w3541|El desempleo bajó este año.|今年は失業が減りました。
w3542|La inflación hace todo más caro.|インフレですべてが高くなります。
w3543|El país entró en recesión.|その国は景気後退に入りました。
w3544|El turismo está en auge.|観光は好調です。
w3545|El presupuesto tiene un déficit grande.|予算は大きな赤字です。
w3546|Este año hubo superávit.|今年は黒字でした。
w3547|Sus ingresos aumentaron este año.|彼の収入は今年増えました。
w3548|Anota los ingresos y egresos del mes.|その月の収入と支出を書きとめて。
w3549|Dejó todos sus bienes a sus hijos.|彼は全財産を子どもたちに残しました。
w3550|Estudiamos el capitalismo en historia.|歴史の授業で資本主義を学びました。
w3551|El socialismo es un sistema político.|社会主義は政治体制の一つです。
w3552|La globalización une a los países.|グローバル化は国々を結びつけます。
w3553|La mercancía llegó en camión.|商品はトラックで届きました。
w3554|La exportación de café es importante aquí.|ここではコーヒーの輸出が重要です。
w3555|Esta tienda vende productos de importación.|この店は輸入品を売っています。
w3556|El consumidor tiene derecho a quejarse.|消費者には苦情を言う権利があります。
w3557|Cambiamos de proveedor de internet.|インターネットのプロバイダーを変えました。
w3558|El distribuidor trae la leche cada mañana.|業者が毎朝牛乳を届けてくれます。
w3559|Abrieron una franquicia de pizza.|ピザのフランチャイズ店がオープンしました。
w3560|El banco tiene una sucursal cerca.|その銀行は近くに支店があります。
w3561|La sede de la empresa está en Bogotá.|その会社の本社はボゴタにあります。
w3562|La filial abrió una oficina en Chile.|子会社はチリに事務所を開きました。
w3563|La plantilla de la tienda es pequeña.|その店の従業員は少人数です。
w3564|La directiva aprobó el plan.|経営陣はその計画を承認しました。
w3565|Tenemos junta de padres el lunes.|月曜日に保護者会があります。
w3566|Ella forma parte del comité escolar.|彼女は学校の委員会のメンバーです。
w3567|Hubo una asamblea de vecinos.|住民の集会がありました。
w3568|Su mandato termina el próximo año.|彼の任期は来年終わります。
w3569|La legislación protege a los niños.|法律は子どもたちを守っています。
w3570|El presidente firmó un decreto.|大統領は政令に署名しました。
w3571|Respetamos las normas de la biblioteca.|図書館の決まりを守ります。
w3572|Lee el reglamento del club.|クラブの規則を読んで。
w3573|Lee bien cada cláusula del contrato.|契約の各条項をよく読んで。
w3574|Hablar inglés es un requisito.|英語を話せることが必要条件です。
w3575|Hay demasiada burocracia para todo.|何をするにもお役所仕事が多すぎます。
w3576|Cada país defiende su soberanía.|どの国も自国の主権を守ります。
w3577|El electorado votó por el cambio.|有権者は変化に票を投じました。
w3578|El partido ganó diez escaños.|その党は10議席を獲得しました。
w3579|El presidente presentó su nuevo gabinete.|大統領は新しい内閣を発表しました。
w3580|La oposición criticó la nueva ley.|野党は新しい法律を批判しました。
w3581|Los partidos formaron una coalición.|各党は連立を組みました。
w3582|El país cambió de régimen.|その国は体制が変わりました。
w3583|Respeto todas las ideologías.|私はあらゆる思想を尊重します。
w3584|Llegó mucha propaganda al buzón.|郵便受けにたくさんの広告が届きました。
w3585|La película pasó la censura.|その映画は検閲を通りました。
w3586|El pueblo sufrió años de represión.|国民は何年も弾圧に苦しみました。
w3587|El escritor vivió muchos años en el exilio.|その作家は長年亡命生活を送りました。
w3588|Ayudamos a una familia de refugiados.|私たちは難民の家族を助けました。
w3589|Pidió asilo en otro país.|彼は他国に亡命を申請しました。
w3590|Resolvió el problema con diplomacia.|彼は角を立てずに問題を解決しました。
w3591|El embajador visitó nuestra escuela.|大使が私たちの学校を訪問しました。
w3592|Llegamos a la cumbre de la montaña.|私たちは山の頂上に着きました。
w3593|La negociación duró toda la noche.|交渉は一晩中続きました。
w3594|El jugador recibió una sanción.|その選手は処分を受けました。
w3595|Los dos países firmaron una alianza.|2つの国は同盟を結びました。
w3596|Los dos bandos acordaron una tregua.|両陣営は休戦に合意しました。
w3597|El país redujo su armamento.|その国は軍備を縮小しました。
w3598|Todos rechazamos el terrorismo.|私たちは皆テロに反対します。
w3599|Las noticias hablaron del atentado.|ニュースはその襲撃について報じました。
w3600|Liberaron a todos los rehenes.|人質は全員解放されました。
w3601|La seguridad social cubre los gastos médicos.|社会保障が医療費をカバーします。
w3602|Mi abuelo vive de su pensión.|祖父は年金で暮らしています。
w3603|El gobierno da un subsidio a las familias.|政府は家族に補助金を出します。
w3604|Donaron dinero a una obra de beneficencia.|彼らは慈善事業にお金を寄付しました。
w3605|Hago voluntariado en un hospital los sábados.|土曜日は病院でボランティア活動をしています。
w3606|Mi hermana es voluntaria en la biblioteca.|姉は図書館のボランティアです。
w3607|Ella ayuda a los pobres por caridad.|彼女は慈善の心から貧しい人を助けます。
w3608|Gracias por tu solidaridad con nosotros.|私たちへの連帯に感謝します。
w3609|Necesitamos la cooperación de todos.|みんなの協力が必要です。
w3610|La convivencia con mis primos es divertida.|いとこたちとの共同生活は楽しいです。
w3611|La integración de los nuevos alumnos fue rápida.|新入生たちはすぐに溶け込みました。
w3612|Me encanta la diversidad de culturas aquí.|ここの文化の多様性が大好きです。
w3613|La escuela promueve la inclusión de todos.|学校はすべての人の受け入れを進めています。
w3614|La marginación afecta a muchas personas.|疎外は多くの人に影響を与えます。
w3615|Nadie merece la exclusión por su origen.|出身で排除されるべき人はいません。
w3616|Hay que luchar contra los prejuicios.|偏見と闘わなければなりません。
w3617|Ese chiste se basa en un estereotipo.|その冗談は固定観念に基づいています。
w3618|La tolerancia es importante en una familia.|家族の中では寛容さが大切です。
w3619|Todas las personas merecen dignidad.|すべての人は尊厳に値します。
w3620|Es un hombre de gran integridad.|彼はとても誠実な人です。
w3621|Valoro mucho la honestidad de mis amigos.|友達の誠実さをとても大切にしています。
w3622|Su honradez es conocida por todos.|彼の正直さはみんなに知られています。
w3623|La ética es importante en el trabajo.|仕事では倫理が大切です。
w3624|Hablamos de la moralidad de sus actos.|彼の行為の道徳性について話しました。
w3625|La paciencia es una gran virtud.|忍耐は大きな美徳です。
w3626|Fumar es un vicio peligroso.|喫煙は危険な悪癖です。
w3627|No fue tu culpa.|君のせいじゃなかったよ。
w3628|Sintió remordimiento por mentir.|彼は嘘をついたことで良心の呵責を感じました。
w3629|Mostró arrepentimiento y pidió perdón.|彼は反省を示して謝りました。
w3630|La venganza no resuelve nada.|復讐は何も解決しません。
w3631|No le guardo rencor a nadie.|私は誰にも恨みを持っていません。
w3632|Sintió compasión por el perro abandonado.|彼は捨て犬に同情しました。
w3633|La empatía nos ayuda a entender a otros.|共感は他人を理解する助けになります。
w3634|Le expresé mi gratitud a la maestra.|先生に感謝の気持ちを伝えました。
w3635|Gracias por tu generosidad.|あなたの寛大さに感謝します。
w3636|Habla de sus logros con humildad.|彼は自分の業績を謙虚に話します。
w3637|Su soberbia le hizo perder amigos.|彼は傲慢さのせいで友達を失いました。
w3638|La avaricia nunca trae felicidad.|強欲は決して幸せをもたらしません。
w3639|Hoy me da pereza limpiar.|今日は掃除するのが面倒です。
w3640|No dejes que la ira te controle.|怒りに支配されないで。
w3641|Sentí angustia antes del examen.|試験の前に強い不安を感じました。
w3642|Lloraba con desesperación.|彼は絶望して泣いていました。
w3643|Siento nostalgia de mi infancia.|子どもの頃が懐かしいです。
w3644|La lluvia me da melancolía.|雨は私を物悲しい気分にさせます。
w3645|Hubo euforia tras la victoria.|勝利の後、熱狂に包まれました。
w3646|Trabaja con mucho entusiasmo.|彼はとても熱意をもって働いています。
w3647|Miramos el volcán con asombro.|私たちは驚きをもって火山を見ました。
w3648|La noticia causó desconcierto.|その知らせは困惑を招きました。
w3649|Sentí indignación por la injusticia.|不正に憤りを感じました。
w3650|Sentí mucha frustración al perder el partido.|試合に負けてとても悔しかったです。
w3651|Aceptó la noticia con resignación.|彼はあきらめてその知らせを受け入れました。
w3652|Vivimos con incertidumbre sobre el futuro.|私たちは将来がどうなるか分からないまま暮らしています。
w3653|Tengo cierta inquietud por mi salud.|健康について少し不安があります。
w3654|Siento agobio con tantas tareas.|宿題が多すぎて重圧を感じます。
w3655|No te dejes llevar por el desánimo.|落胆に流されないで。
w3656|El deporte mejora la autoestima.|スポーツは自己肯定感を高めます。
w3657|Tiene una voluntad muy fuerte.|彼はとても強い意志を持っています。
w3658|Habló con determinación.|彼は決意をもって話しました。
w3659|Con perseverancia todo se logra.|粘り強さがあれば何でも達成できます。
w3660|La constancia es la clave del éxito.|根気が成功の鍵です。
w3661|El deporte enseña disciplina.|スポーツは規律を教えてくれます。
w3662|Tomó la iniciativa y organizó la fiesta.|彼が率先してパーティーを企画しました。
w3663|Ella tiene mucho liderazgo en el equipo.|彼女はチームで高いリーダーシップを発揮します。
w3664|Tienes talento para la música.|君には音楽の才能があるね。
w3665|Corta la madera con destreza.|彼は器用に木を切ります。
w3666|Tiene aptitud para los idiomas.|彼は語学の適性があります。
w3667|Mi abuela tiene mucha sabiduría.|祖母はとても知恵があります。
w3668|Resolvió el problema con ingenio.|彼は工夫して問題を解決しました。
w3669|Es una persona de gran intelecto.|彼は優れた知性の持ち主です。
w3670|Tu razonamiento es muy lógico.|君の推論はとても論理的だね。
w3671|Mi intuición me dice que tiene razón.|直感では彼が正しいと思います。
w3672|Cada uno tiene una percepción distinta.|人はそれぞれ感じ方が違います。
w3673|Perdió la conciencia por un momento.|彼は一瞬意識を失いました。
w3674|El subconsciente influye en los sueños.|潜在意識は夢に影響します。
w3675|Los niños tienen mucha imaginación.|子どもたちは想像力が豊かです。
w3676|Este trabajo requiere mucha creatividad.|この仕事には多くの創造性が必要です。
w3677|El mar es mi fuente de inspiración.|海は私のインスピレーションの源です。
w3678|Después de mucha reflexión, decidí quedarme.|よく考えた末に、残ることにしました。
w3679|Su argumentación fue muy convincente.|彼の論証はとても説得力がありました。
w3680|Su discurso tenía mucha retórica.|彼の演説は美辞麗句ばかりでした。
w3681|El poema usa una metáfora bonita.|その詩は美しい隠喩を使っています。
w3682|La paloma es un símbolo de paz.|ハトは平和の象徴です。
w3683|La obra es una alegoría de la vida.|その作品は人生の寓意です。
w3684|Lo dijo con ironía.|彼はそれを皮肉っぽく言いました。
w3685|La película es una sátira política.|その映画は政治風刺です。
w3686|Me gusta la narrativa latinoamericana.|ラテンアメリカの小説が好きです。
w3687|La trama de la novela es emocionante.|その小説の筋はわくわくします。
w3688|No esperaba ese desenlace.|そんな結末は予想していませんでした。
w3689|Lee el prólogo antes de empezar.|始める前に序文を読んで。
w3690|El epílogo explica qué pasó después.|エピローグでその後の出来事が説明されます。
w3691|La canción tiene tres estrofas.|その歌には3つの節があります。
w3692|Escribió unos versos para su madre.|彼は母のために詩を書きました。
w3693|Busca una palabra que rime con amor.|amorと韻を踏む言葉を探して。
w3694|Octavio Paz fue un gran ensayista.|オクタビオ・パスは偉大な随筆家でした。
w3695|Lope de Vega fue un dramaturgo famoso.|ロペ・デ・ベガは有名な劇作家でした。
w3696|Mi tía quiere ser novelista.|おばは小説家になりたがっています。
w3697|Pablo Neruda fue un poeta chileno.|パブロ・ネルーダはチリの詩人でした。
w3698|El crítico elogió la película.|批評家はその映画を絶賛しました。
w3699|Esta pintura es una obra maestra.|この絵は傑作です。
w3700|El autor perdió el manuscrito.|著者は原稿をなくしました。
w3701|Incluye la bibliografía al final del trabajo.|レポートの最後に参考文献を入れて。
w3702|Mi hermano escribe su tesis de maestría.|兄は修士論文を書いています。
w3703|Hicimos un experimento en el laboratorio.|実験室で実験をしました。
w3704|La temperatura es una variable importante.|温度は重要な変数です。
w3705|El arcoíris es un fenómeno natural.|虹は自然現象です。
w3706|El hallazgo sorprendió a los científicos.|その発見は科学者たちを驚かせました。
w3707|Este dibujo sigue un patrón.|この絵はあるパターンに従っています。
w3708|La proyección de ventas es positiva.|売上の予測は良好です。
w3709|El índice de precios subió este mes.|今月は物価指数が上がりました。
w3710|La tasa de desempleo bajó este año.|今年は失業率が下がりました。
w3711|Calcula el coeficiente de la ecuación.|方程式の係数を計算して。
w3712|Hay mucha probabilidad de lluvia hoy.|今日は雨の確率が高いです。
w3713|El terremoto tuvo una magnitud de siete.|その地震はマグニチュード7でした。
w3714|Este mapa tiene una escala pequeña.|この地図は縮尺が小さいです。
w3715|Mezcla agua y harina en la misma proporción.|水と小麦粉を同じ割合で混ぜて。
w3716|Se detuvo en el umbral de la puerta.|彼は戸口の敷居で立ち止まりました。
w3717|Observamos la trayectoria de la pelota.|ボールの軌跡を観察しました。
w3718|La adolescencia es una etapa difícil.|思春期は難しい時期です。
w3719|El proyecto está en su fase final.|そのプロジェクトは最終段階にあります。
w3720|Es una época de transición.|今は過渡期です。
w3721|El ciclo del agua es fascinante.|水の循環はとても面白いです。
w3722|Sigue la secuencia de los números.|数字の順序に従って。
w3723|En el ejército hay una jerarquía estricta.|軍隊には厳しい階級制度があります。
w3724|La ciudad necesita mejor infraestructura.|その町にはもっと良いインフラが必要です。
w3725|Estudia urbanismo en la universidad.|彼は大学で都市計画を学んでいます。
w3726|Me interesa la arquitectura moderna.|私は現代建築に興味があります。
w3727|No toques las cosas ajenas.|他人の物に触らないで。
w3728|Esta película es apta para niños.|この映画は子ども向けです。
w3729|Fue un trabajo arduo pero valió la pena.|大変な仕事だったが、やりがいがありました。
w3730|La tela es muy áspera.|その布はとてもざらざらしています。
w3731|Fue una decisión audaz.|それは大胆な決断でした。
w3732|Hablamos de temas banales.|私たちはありふれた話題について話しました。
w3733|El juez fue benévolo con él.|裁判官は彼に寛大でした。
w3734|La foto salió borrosa.|写真がぼやけてしまいました。
w3735|Sé cauteloso al cruzar la calle.|道を渡るときは用心して。
w3736|Hizo un comentario certero.|彼は的確なコメントをしました。
w3737|Tu respuesta no es coherente.|君の答えは筋が通っていません。
w3738|Me lanzó una mirada cómplice.|彼は私に意味ありげな目くばせをしました。
w3739|Dio una respuesta contundente.|彼はきっぱりとした答えを返しました。
w3740|Mi abuelo tiene una enfermedad crónica.|祖父は慢性の病気を持っています。
w3741|Recibieron una cuantiosa donación.|彼らは多額の寄付を受けました。
w3742|El servicio fue deficiente.|サービスは不十分でした。
w3743|Fue un error deliberado.|それはわざとの間違いでした。
w3744|El pueblo quedó desolado tras la tormenta.|嵐の後、村は荒れ果てました。
w3745|El villano era despiadado.|その悪役は冷酷でした。
w3746|Es muy diestro con las herramientas.|彼は道具の扱いがとても器用です。
w3747|Tengo un recuerdo difuso de ese día.|その日のことはぼんやりとしか覚えていません。
w3748|Lleva un vestido discreto.|彼女は控えめなドレスを着ています。
w3749|Los juguetes estaban dispersos por el suelo.|おもちゃが床に散らばっていました。
w3750|Este perro es muy dócil.|この犬はとてもおとなしいです。
w3751|La fama es efímera.|名声ははかないものです。
w3752|Fue un discurso muy elocuente.|とても雄弁な演説でした。
w3753|Es un eminente científico.|彼は著名な科学者です。
w3754|Necesitamos datos empíricos.|実証的なデータが必要です。
w3755|La silla es muy endeble.|その椅子はとてもぐらぐらしています。
w3756|Tiene una sonrisa enigmática.|彼女は謎めいた笑みを浮かべています。
w3757|Soy escéptico sobre ese plan.|私はその計画に懐疑的です。
w3758|Su risa fue espontánea.|彼の笑いは自然に出たものでした。
w3759|Tiene un trabajo estable.|彼は安定した仕事に就いています。
w3760|El clima está inestable hoy.|今日は天気が不安定です。
w3761|Hicieron una búsqueda exhaustiva.|彼らは徹底的な捜索を行いました。
w3762|Las instrucciones son muy explícitas.|指示はとてもはっきりしています。
w3763|Hay un mensaje implícito en la carta.|その手紙には言外のメッセージがあります。
w3764|La comida estaba exquisita.|料理は絶品でした。
w3765|Tu idea es factible.|君のアイデアは実現可能だね。
w3766|Fue un año fecundo para el escritor.|その作家にとって実り多い一年でした。
w3767|El tigre es un animal feroz.|トラは獰猛な動物です。
w3768|Esta tierra es muy fértil.|この土地はとても肥沃です。
w3769|Cuidado, ese vaso es frágil.|気をつけて、そのコップは壊れやすいよ。
w3770|No seas tan frívolo.|そんなに軽薄にならないで。
w3771|Es un cuero genuino.|それは本物の革です。
w3772|Tenemos una visión global del problema.|私たちはその問題を全体的に見ています。
w3773|El ambiente era hostil.|雰囲気は敵意に満ちていました。
w3774|Es el lugar idóneo para descansar.|ここは休むのに最適な場所です。
w3775|Salió ileso del accidente.|彼は事故で無傷でした。
w3776|Es hijo de una familia ilustre.|彼は名門の家の息子です。
w3777|El árbitro debe ser imparcial.|審判は公平でなければなりません。
w3778|Su trabajo fue impecable.|彼の仕事は完璧でした。
w3779|El sol era implacable.|太陽が容赦なく照りつけていました。
w3780|Tuvimos un problema imprevisto.|思いがけない問題が起きました。
w3781|¡Esto es inaudito!|こんなことは前代未聞だ！
w3782|La lluvia incesante inundó la calle.|絶え間ない雨で通りが水浸しになりました。
w3783|El futuro es incierto.|未来は不確かです。
w3784|Fue una experiencia indeleble.|それは忘れられない経験でした。
w3785|Encontraron un poema inédito.|未発表の詩が見つかりました。
w3786|La máquina quedó inerte.|機械は動かなくなりました。
w3787|El cambio es inevitable.|変化は避けられません。
w3788|Fue un suceso inexplicable.|それは説明のつかない出来事でした。
w3789|No seas ingenuo, es una trampa.|お人よしにならないで、それは罠だよ。
w3790|El riesgo es inherente a todo negocio.|リスクはどんな商売にもつきものです。
w3791|La tormenta es inminente.|嵐が目前に迫っています。
w3792|El acusado es inocente.|被告は無罪です。
w3793|Es insólito ver nieve aquí.|ここで雪を見るのは珍しいことです。
w3794|Leí el texto íntegro.|私はその文章を全部読みました。
w3795|El valor intrínseco de la amistad es enorme.|友情の本質的な価値は計り知れません。
w3796|Su excusa es inverosímil.|彼の言い訳は信じがたいです。
w3797|El daño es irreversible.|その損傷は元に戻せません。
w3798|Es un negocio lícito.|それは合法的な商売です。
w3799|Mi tío es muy locuaz.|おじはとてもおしゃべりです。
w3800|A sus noventa años, sigue muy lúcido.|90歳になっても、彼は頭がとてもはっきりしています。
w3801|Es muy meticuloso con su trabajo.|彼は仕事にとても几帳面です。
w3802|Hizo un análisis minucioso.|彼は綿密な分析をしました。
w3803|Siempre hace comentarios mordaces.|彼はいつも辛辣なコメントをします。
w3804|La imagen se ve muy nítida.|画像がとても鮮明に見えます。
w3805|El humo es nocivo para la salud.|煙は健康に有害です。
w3806|Su talento es notorio.|彼の才能は誰の目にも明らかです。
w3807|Este teléfono ya está obsoleto.|この電話はもう時代遅れです。
w3808|El vidrio de la ventana es opaco.|窓のガラスは不透明です。
w3809|Es el momento óptimo para sembrar.|今は種をまくのに最適な時期です。
w3810|Tiene un coche muy ostentoso.|彼はとても派手な車を持っています。
w3811|El pino es un árbol de hoja perenne.|松は常緑樹です。
w3812|Hizo una pregunta pertinente.|彼は適切な質問をしました。
w3813|Mi abuela es muy perspicaz.|祖母はとても鋭いです。
w3814|Es una explicación plausible.|それは納得できる説明です。
w3815|Viven en condiciones precarias.|彼らは不安定な状況で暮らしています。
w3816|El helado es mi postre predilecto.|アイスクリームは私のお気に入りのデザートです。
w3817|Soy propenso a resfriarme en invierno.|私は冬に風邪をひきやすいです。
w3818|¡Próspero Año Nuevo!|よい新年を！
w3819|Siempre lleva la ropa pulcra.|彼はいつもこぎれいな服を着ています。
w3820|El respeto debe ser recíproco.|尊敬はお互いにするものです。
w3821|Mi hijo es reacio a comer verduras.|息子は野菜を食べるのを嫌がります。
w3822|Vive en un pueblo remoto.|彼は人里離れた村に住んでいます。
w3823|Es un negocio muy rentable.|それはとてももうかる商売です。
w3824|El examen fue muy riguroso.|試験はとても厳しかったです。
w3825|Es una mesa robusta.|それは頑丈なテーブルです。
w3826|Su respuesta fue un no rotundo.|彼の答えはきっぱりとしたノーでした。
w3827|Para mí, la familia es sagrada.|私にとって家族は神聖なものです。
w3828|No seas sarcástico conmigo.|私に嫌味を言わないで。
w3829|El mar está sereno hoy.|今日は海が穏やかです。
w3830|El gato es muy sigiloso.|猫はとても静かに忍び寄ります。
w3831|Lleva un traje sobrio.|彼は地味なスーツを着ています。
w3832|Es un sistema muy sofisticado.|それはとても高度なシステムです。
w3833|El día está gris y sombrío.|今日は灰色で陰気な日です。
w3834|Hizo una revisión somera del texto.|彼は文章をざっと見直しました。
w3835|Usamos energía sostenible.|私たちは持続可能なエネルギーを使っています。
w3836|Es una opinión muy subjetiva.|それはとても主観的な意見です。
w3837|La música era sublime.|その音楽はすばらしかったです。
w3838|Haz un resumen sucinto.|簡潔な要約を書いて。
w3839|No tienes que ser tan sumiso.|そんなに言いなりになる必要はありません。
w3840|Hay una diferencia sutil entre los dos.|二つの間には微妙な違いがあります。
w3841|Me dio un no tajante.|彼は私にきっぱりとノーと言いました。
w3842|Es una mujer muy tenaz.|彼女はとても粘り強い女性です。
w3843|Había una luz tenue en la sala.|居間にはほのかな明かりがありました。
w3844|El ambiente estaba tenso.|雰囲気が張り詰めていました。
w3845|Discutieron por algo trivial.|彼らはささいなことで口論しました。
w3846|El agua del río está turbia.|川の水が濁っています。
w3847|Lo discutiremos en una reunión ulterior.|後の会議でそれを話し合いましょう。
w3848|La decisión fue unánime.|決定は満場一致でした。
w3849|El desierto es muy vasto.|砂漠はとても広大です。
w3850|El guepardo es muy veloz.|チーターはとても速いです。
w3851|Su historia parece verosímil.|彼の話は本当らしく思えます。
w3852|Es un actor muy versátil.|彼はとても多才な俳優です。
w3853|Mi pasaporte todavía está vigente.|私のパスポートはまだ有効です。
w3854|Los niños son más vulnerables.|子どもたちはより傷つきやすいです。
w3855|No uses palabras vulgares.|下品な言葉を使わないで。
w3856|Es una tierra yerma y seca.|それは不毛で乾いた土地です。
w3857|¿Acaso no lo sabías?|まさか知らなかったの？
w3858|Lo hizo adrede.|彼はわざとそれをしました。
w3859|Antaño la gente caminaba más.|昔は人々がもっと歩いていました。
w3860|Cumplió cabalmente con su deber.|彼は義務をきちんと果たしました。
w3861|Llovió mucho y, consecuentemente, se canceló el partido.|雨がたくさん降ったので、試合は中止になりました。
w3862|Rompió el vaso deliberadamente.|彼はわざとコップを割りました。
w3863|Estoy enteramente de acuerdo contigo.|私は君に全面的に賛成です。
w3864|Está estrictamente prohibido fumar aquí.|ここでの喫煙は厳しく禁止されています。
w3865|Vine expresamente para verte.|君に会うためにわざわざ来ました。
w3866|Fundamentalmente, estamos de acuerdo.|基本的に私たちは同意しています。
w3867|Abrimos de lunes a sábado inclusive.|月曜日から土曜日まで（土曜日も含めて）営業しています。
w3868|Indudablemente, es el mejor equipo.|間違いなく、それが最高のチームです。
w3869|No lo hice intencionalmente.|わざとやったんじゃないよ。
w3870|Invariablemente llega tarde.|彼はいつも決まって遅れてきます。
w3871|Fue meramente una sugerencia.|それは単なる提案にすぎませんでした。
w3872|Estudia y trabaja paralelamente.|彼は勉強と仕事を並行して行っています。
w3873|El hombre presuntamente robó un coche.|その男は車を盗んだとされています。
w3874|El dolor disminuyó progresivamente.|痛みは次第に和らぎました。
w3875|Nos ayudamos recíprocamente.|私たちは互いに助け合っています。
w3876|Sinceramente, no me gusta esa idea.|正直に言って、その考えは好きではありません。
w3877|Me alegra sobremanera tu visita.|君が来てくれてことのほか嬉しいです。
w3878|Se negó tajantemente.|彼はきっぱりと断りました。
w3879|Lo dijo textualmente así.|彼は一字一句そのとおりに言いました。
w3880|El tema se discutirá ulteriormente.|そのテーマは後で話し合われます。
w3881|Lo recuerdo vagamente.|それをぼんやりと覚えています。
w3882|Conforme pasan los días, hace más frío.|日がたつにつれて寒くなります。
w3883|Salimos pese a la lluvia.|雨にもかかわらず私たちは出かけました。
w3884|A raíz de la crisis, cerró la tienda.|危機がきっかけで、その店は閉店しました。
w3885|El debate giró en torno a la educación.|議論は教育をめぐって展開しました。
w3886|A medida que creces, aprendes más.|大きくなるにつれて、もっと多くを学びます。
w3887|Te presto el libro con tal de que lo cuides.|大事にしてくれるなら本を貸してあげる。
w3888|Puedes salir siempre y cuando vuelvas temprano.|早く帰るなら出かけてもいいよ。
w3889|Llovió mucho y, por ende, no salimos.|雨がたくさん降ったので、出かけませんでした。
w3890|Así pues, empecemos la reunión.|それでは、会議を始めましょう。
w3891|Estaba cansado, de modo que me acosté.|疲れていたので、横になりました。
w3892|No había pan, de manera que fui a comprarlo.|パンがなかったので、買いに行きました。
w3893|Ahorramos a fin de viajar en verano.|夏に旅行するために貯金しています。
w3894|Lo hicimos en aras de la paz.|私たちは平和のためにそうしました。
w3895|Mi abuela siempre lleva un abanico.|祖母はいつも扇子を持っています。
w3896|Desde el acantilado se ve el mar.|断崖から海が見えます。
w3897|Este río es un afluente del Amazonas.|この川はアマゾン川の支流です。
w3898|Salimos al alba.|私たちは夜明けに出発しました。
w3899|La lluvia entró en la alcantarilla.|雨水が下水溝に流れ込みました。
w3900|Un alud bloqueó el camino.|雪崩が道をふさぎました。
w3901|Los obreros suben al andamio.|作業員たちが足場に登ります。
w3902|El pez mordió el anzuelo.|魚が釣り針に食いつきました。
w3903|Japón es un archipiélago.|日本は列島です。
w3904|Los niños hacen figuras de arcilla.|子どもたちは粘土で人形を作ります。
w3905|Hay un arroyo detrás de la casa.|家の裏に小川があります。
w3906|Me clavé una astilla en el dedo.|指にとげが刺さりました。
w3907|Tomemos un atajo por el parque.|公園を通って近道しよう。
w3908|Las baldosas del baño son blancas.|浴室のタイルは白です。
w3909|Hay un barranco profundo cerca del camino.|道の近くに深い峡谷があります。
w3910|La bisagra de la puerta hace ruido.|ドアのちょうつがいがきしみます。
w3911|La bóveda de la iglesia es preciosa.|教会の丸天井はとても美しいです。
w3912|Usamos una brújula en la montaña.|山で方位磁石を使いました。
w3913|El buzo vio muchos peces.|ダイバーはたくさんの魚を見ました。
w3914|La caldera calienta el agua de la casa.|ボイラーが家のお湯を沸かします。
w3915|Mi casa está en un callejón estrecho.|私の家は狭い路地にあります。
w3916|Sacan piedra de la cantera.|採石場から石を切り出します。
w3917|El río se salió de su cauce.|川が氾濫しました。
w3918|Cierra la puerta con el cerrojo.|かんぬきでドアを閉めて。
w3919|Las ranas viven en la charca.|カエルは池に住んでいます。
w3920|Átate los cordones de los zapatos.|靴ひもを結びなさい。
w3921|Paseamos en el crepúsculo.|私たちは夕暮れに散歩しました。
w3922|El camino pasa por un desfiladero.|道は狭い峡谷を通っています。
w3923|Construyeron un dique contra las inundaciones.|洪水に備えて堤防を作りました。
w3924|El embalse está lleno después de la lluvia.|雨の後でダム湖は満水です。
w3925|Limpiaron los escombros después del terremoto.|地震の後、がれきを片付けました。
w3926|El faro ilumina el mar de noche.|灯台は夜の海を照らします。
w3927|El follaje del bosque es muy verde.|森の葉はとても青々としています。
w3928|Visitamos un glaciar en la Patagonia.|私たちはパタゴニアの氷河を訪れました。
w3929|Cayó granizo esta tarde.|今日の午後、ひょうが降りました。
w3930|Hay una grieta en la pared.|壁にひびがあります。
w3931|Hicimos una hoguera en la playa.|浜辺でたき火をしました。
w3932|El sol se esconde en el horizonte.|太陽が地平線に沈みます。
w3933|Dormimos a la intemperie.|私たちは野宿しました。
w3934|Mis zapatos están llenos de lodo.|靴が泥だらけです。
w3935|El conejo entró en su madriguera.|ウサギは巣穴に入りました。
w3936|Bebimos agua del manantial.|私たちは泉の水を飲みました。
w3937|El gato se escondió en el matorral.|猫はやぶに隠れました。
w3938|El barco está en el muelle.|船は埠頭にいます。
w3939|Hay neblina esta mañana.|今朝はもやがかかっています。
w3940|Encontraron un oasis en el desierto.|彼らは砂漠でオアシスを見つけました。
w3941|Hoy hay mucho oleaje en el mar.|今日は海の波が高いです。
w3942|Hay cocodrilos en el pantano.|その沼にはワニがいます。
w3943|Subimos a un peñasco para ver el valle.|谷を見るために大岩に登りました。
w3944|La sala estaba en penumbra.|部屋は薄暗かったです。
w3945|Los caballos corren por la pradera.|馬が草原を駆けています。
w3946|La presa da electricidad a la ciudad.|ダムが町に電気を供給しています。
w3947|Vi un relámpago en el cielo.|空に稲妻が見えました。
w3948|Hay un remolino en el río.|川に渦があります。
w3949|Las flores tienen rocío por la mañana.|朝、花に露がついています。
w3950|Caminamos por un sendero del bosque.|私たちは森の小道を歩きました。
w3951|El torrente bajaba de la montaña.|急流が山から流れ下っていました。
w3952|El vendaval tiró varios árboles.|強風で何本も木が倒れました。
w3953|Hay casas en la vertiente de la montaña.|山の斜面に家があります。
w3954|El museo guarda un gran acervo cultural.|その博物館は大きな文化遺産を保管しています。
w3955|Se mantuvo fuerte ante la adversidad.|彼は逆境の中でも強くいました。
w3956|Estudia con mucho afán.|彼はとても熱心に勉強します。
w3957|Lo tomó como un agravio personal.|彼はそれを個人的な侮辱と受け取りました。
w3958|Actuó por su libre albedrío.|彼は自分の自由意志で行動しました。
w3959|La vida tiene sus altibajos.|人生には浮き沈みがあります。
w3960|Hay ambigüedad en sus palabras.|彼の言葉にはあいまいさがあります。
w3961|Su anhelo es viajar por el mundo.|彼の願いは世界中を旅することです。
w3962|El grupo estaba en su apogeo.|そのグループは全盛期でした。
w3963|Usó una artimaña para ganar.|彼は勝つために策略を使いました。
w3964|Hay un atisbo de esperanza.|希望の兆しがあります。
w3965|Lo vio como un buen augurio.|彼はそれを良い前兆と見ました。
w3966|Pidieron auxilio por la radio.|彼らは無線で救助を求めました。
w3967|Tiene un gran bagaje cultural.|彼は豊かな教養を持っています。
w3968|Hay una brecha entre ricos y pobres.|金持ちと貧しい人の間には格差があります。
w3969|Hay que actuar con cautela.|慎重に行動しなければなりません。
w3970|Se oyó el clamor de la gente.|人々の叫び声が聞こえました。
w3971|Cumplió su cometido con éxito.|彼は任務を見事に果たしました。
w3972|Actuó con cordura en la crisis.|彼は危機の中で分別をもって行動しました。
w3973|La crueldad con los animales es inaceptable.|動物への残酷な扱いは許されません。
w3974|Me miró con desdén.|彼は私を見下すように見ました。
w3975|Fue solo un desliz.|それはほんのうっかりミスでした。
w3976|Vi un destello en el cielo.|空にきらめきが見えました。
w3977|Nadie sabe el devenir de la historia.|歴史の成り行きは誰にも分かりません。
w3978|¡Qué dicha verte de nuevo!|また会えて本当に嬉しい！
w3979|Estoy ante una disyuntiva difícil.|私は難しい二者択一を迫られています。
w3980|El barco resistió el embate de las olas.|船は波の猛攻に耐えました。
w3981|Pone mucho empeño en sus estudios.|彼は勉強にとても熱心に取り組んでいます。
w3982|Estoy en una encrucijada en mi vida.|私は人生の岐路に立っています。
w3983|Enfrentó la noticia con entereza.|彼はその知らせに気丈に向き合いました。
w3984|No tiene escrúpulos para mentir.|彼は平気で嘘をつきます。
w3985|Preparó la comida con esmero.|彼は丹念に料理を作りました。
w3986|La tormenta causó estragos en el pueblo.|嵐は村に大きな被害をもたらしました。
w3987|Los fans cantaban con fervor.|ファンたちは熱狂的に歌っていました。
w3988|La fragilidad del cristal me preocupa.|ガラスのもろさが心配です。
w3989|Fue una gesta histórica.|それは歴史的な偉業でした。
w3990|Escalar esa montaña fue una hazaña.|あの山に登ったのは快挙でした。
w3991|Fue un hito en la historia del país.|それはその国の歴史における画期的な出来事でした。
w3992|Vivimos con holgura.|私たちはゆとりのある暮らしをしています。
w3993|Empezó el proyecto con mucho ímpetu.|彼はとても勢いよくプロジェクトを始めました。
w3994|Seguimos haciéndolo por inercia.|私たちは惰性でそれを続けています。
w3995|Su ingenuidad me parece tierna.|彼の純真さはかわいらしいと思います。
w3996|No aceptamos injerencias externas.|外部からの干渉は受け入れません。
w3997|Fue una insensatez salir con la tormenta.|嵐の中で出かけるなんて無分別でした。
w3998|Recibieron la noticia con júbilo.|彼らはその知らせを大喜びで受け取りました。
w3999|Las deudas son un lastre para la familia.|借金は家族にとって足かせです。
w4000|Habló con gran lucidez.|彼はとても明晰に話しました。
`;

export const EXAMPLES_ES = Object.fromEntries(
  RAW.trim().split('\n').map((line) => {
    const [id, text, ja] = line.split('|');
    return [id, { text, ja }];
  }),
);
