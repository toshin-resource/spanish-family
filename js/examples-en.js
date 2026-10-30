// 英語の例文（単語ごとに1つ）
// 1行 = 単語のid|例文|日本語訳
// - 回答後と単語リストに表示し、🔊で読み上げる。日常会話で使いやすい短い文にしている（仮作成・要確認）。
const RAW = `
e001|Hello! How are you?|こんにちは！元気？
e002|Hi, I'm Ken.|やあ、ぼくはケンだよ。
e003|Goodbye! See you tomorrow.|さようなら！また明日。
e004|Thanks for the help.|手伝ってくれてありがとう。
e005|I'm sorry I'm late.|遅れてごめんなさい。
e006|Welcome to our home!|わが家へようこそ！
e007|Yes, I like cats.|はい、ねこが好きです。
e008|No, thank you.|いいえ、けっこうです。
e009|Water, please.|お水をください。
e010|Okay, let's go!|いいよ、行こう！
e011|This is my bag.|これは私のかばんです。
e012|What is that?|あれは何？
e013|These are my books.|これらは私の本です。
e014|Are those your shoes?|あれはあなたのくつですか？
e015|Come here, please.|ここに来てください。
e016|My school is over there.|私の学校はあそこです。
e017|What is your name?|あなたの名前は何ですか？
e018|Who is that boy?|あの男の子は誰？
e019|Where is the station?|駅はどこですか？
e020|When is your birthday?|誕生日はいつ？
e021|Why are you sad?|どうして悲しいの？
e022|How are you today?|今日の調子はどう？
e023|Which cup is yours?|どのカップがあなたの？
e024|Whose pen is this?|これは誰のペンですか？
e025|I am a student.|私は学生です。
e026|You are very kind.|あなたはとても親切です。
e027|He is my brother.|彼は私の兄です。
e028|She likes music.|彼女は音楽が好きです。
e029|We are good friends.|私たちは仲良しです。
e030|They live in Tokyo.|彼らは東京に住んでいます。
e031|Many people are here.|ここにはたくさんの人がいます。
e032|That man is tall.|あの男の人は背が高い。
e033|The woman is a nurse.|その女の人は看護師です。
e034|She has one child.|彼女には子どもが一人います。
e035|The boy is running.|男の子が走っています。
e036|The girl has a dog.|その女の子は犬を飼っています。
e037|Tom is my friend.|トムは私の友だちです。
e038|My teacher is kind.|私の先生はやさしい。
e039|I want to be a doctor.|私は医者になりたい。
e040|He is a new student.|彼は新しい生徒です。
e041|I love my family.|私は家族が大好きです。
e042|My father cooks dinner.|父が夕食を作ります。
e043|My mother is busy today.|母は今日忙しい。
e044|Dad, can you help me?|お父さん、手伝ってくれる？
e045|Mom, I'm home!|お母さん、ただいま！
e046|I have one brother.|私には兄弟が一人います。
e047|My sister is ten.|妹は10歳です。
e048|My grandfather is eighty.|祖父は80歳です。
e049|My grandmother makes cookies.|おばあちゃんはクッキーを作ります。
e050|Their son is five.|彼らの息子は5歳です。
e051|She has two daughters.|彼女には娘が二人います。
e052|The baby is sleeping.|赤ちゃんが寝ています。
e053|It's zero degrees today.|今日は0度です。
e054|I have one cat.|ねこを1匹飼っています。
e055|I have two sisters.|私には姉妹が2人います。
e056|She has three dogs.|彼女は犬を3匹飼っています。
e057|We are a family of four.|うちは4人家族です。
e058|I get up at five.|私は5時に起きます。
e059|School ends at six.|学校は6時に終わります。
e060|A week has seven days.|1週間は7日です。
e061|He is eight years old.|彼は8歳です。
e062|I go to bed at nine.|私は9時に寝ます。
e063|I can count to ten.|10まで数えられます。
e064|My son is eleven.|息子は11歳です。
e065|A year has twelve months.|1年は12か月です。
e066|There are twenty students.|生徒が20人います。
e067|Wait thirty minutes, please.|30分待ってください。
e068|I have a hundred yen.|100円持っています。
e069|It costs a thousand yen.|それは1000円です。
e070|This is my first time.|これが初めてです。
e071|He came in second.|彼は2位でした。
e072|My room is on the third floor.|私の部屋は3階です。
e073|I have many books.|私はたくさんの本を持っています。
e074|I don't have much time.|あまり時間がありません。
e075|I want some water.|お水が少し欲しいです。
e076|All the students are here.|生徒はみんなここにいます。
e077|Can I have more rice?|ご飯をもう少しもらえますか？
e078|Do you have any questions?|何か質問はありますか？
e079|It is hot today.|今日は暑い。
e080|See you tomorrow!|また明日！
e081|I was sick yesterday.|昨日は具合が悪かった。
e082|I run every morning.|私は毎朝走ります。
e083|Let's meet this afternoon.|今日の午後に会おう。
e084|I study in the evening.|私は夕方に勉強します。
e085|Good night, Mom.|おやすみ、お母さん。
e086|Have a nice day!|よい一日を！
e087|I swim twice a week.|私は週に2回泳ぎます。
e088|My birthday is next month.|私の誕生日は来月です。
e089|I am ten years old.|私は10歳です。
e090|The movie is two hours long.|その映画は2時間です。
e091|Wait a minute, please.|ちょっと待ってください。
e092|What time is it now?|今何時ですか？
e093|I am busy now.|今忙しいです。
e094|Call me later.|あとで電話してね。
e095|Dinner will be ready soon.|夕食はもうすぐできます。
e096|She always smiles.|彼女はいつも笑顔です。
e097|I often read books.|私はよく本を読みます。
e098|I sometimes cook dinner.|私はときどき夕食を作ります。
e099|I never eat breakfast.|私は朝ごはんを決して食べません。
e100|I play soccer on the weekend.|週末にサッカーをします。
e101|I have piano on Monday.|月曜日にピアノがあります。
e102|Today is Tuesday.|今日は火曜日です。
e103|See you on Wednesday.|水曜日に会いましょう。
e104|I swim on Thursday.|木曜日に泳ぎます。
e105|Friday is my favorite day.|金曜日は私の好きな曜日です。
e106|We play soccer on Saturday.|土曜日にサッカーをします。
e107|I sleep late on Sunday.|日曜日は遅くまで寝ます。
e108|I like red apples.|赤いりんごが好きです。
e109|The sky is blue.|空は青い。
e110|She has a yellow hat.|彼女は黄色い帽子を持っています。
e111|The leaves are green.|葉っぱは緑です。
e112|Snow is white.|雪は白い。
e113|My cat is black.|私のねこは黒い。
e114|He has brown eyes.|彼の目は茶色です。
e115|Her dress is pink.|彼女のドレスはピンクです。
e116|I like purple flowers.|紫の花が好きです。
e117|The sky is gray today.|今日は空が灰色です。
e118|I want to be a teacher.|私は先生になりたい。
e119|I have a new bike.|私は新しい自転車を持っています。
e120|I do my homework every day.|私は毎日宿題をします。
e121|I go to school by bus.|私はバスで学校に行きます。
e122|Can you come to my party?|私のパーティーに来られる？
e123|I can swim.|私は泳げます。
e124|I want a new phone.|新しい電話が欲しい。
e125|I like dogs.|私は犬が好きです。
e126|I need your help.|あなたの助けが必要です。
e127|I know his name.|私は彼の名前を知っています。
e128|Where can I get a ticket?|どこで切符を手に入れられますか？
e129|Let's make a cake.|ケーキを作ろう。
e130|What did you say?|何て言ったの？
e131|I can see the sea.|海が見えます。
e132|Please give me the book.|その本を私にください。
e133|Let's eat lunch.|お昼ごはんを食べよう。
e134|I drink milk every morning.|私は毎朝牛乳を飲みます。
e135|I sleep eight hours.|私は8時間眠ります。
e136|I read a book every night.|毎晩本を読みます。
e137|Please write your name.|名前を書いてください。
e138|Can you speak English?|英語を話せますか？
e139|Listen to me, please.|私の話を聞いてください。
e140|Let's play outside.|外で遊ぼう。
e141|I like cats and dogs.|私はねこと犬が好きです。
e142|I'm tired, but I'm happy.|疲れたけど、楽しい。
e143|Tea or coffee?|紅茶にする？それともコーヒー？
e144|I'm happy because it's Friday.|金曜日だからうれしい。
e145|If it rains, I stay home.|雨が降ったら家にいます。
e146|I walk with my dog.|犬と一緒に散歩します。
e147|This gift is for you.|これはあなたへのプレゼントです。
e148|I am from Japan.|私は日本出身です。
e149|I go to the park.|私は公園へ行きます。
e150|The cat is in the box.|ねこは箱の中にいます。
e151|Can I have some water?|お水をもらえますか？
e152|I drink coffee every morning.|私は毎朝コーヒーを飲みます。
e153|Would you like some tea?|お茶はいかがですか？
e154|The milk is in the fridge.|牛乳は冷蔵庫に入っています。
e155|I'd like an orange juice, please.|オレンジジュースをください。
e156|We need some bread.|パンが必要です。
e157|I eat rice every day.|私は毎日ご飯を食べます。
e158|I had an egg for breakfast.|朝ご飯に卵を食べました。
e159|He doesn't eat meat.|彼は肉を食べません。
e160|This fish is very good.|この魚はとてもおいしいです。
e161|I'll have the chicken, please.|チキンをお願いします。
e162|Is this beef or pork?|これは牛肉ですか、豚肉ですか？
e163|I like fresh fruit.|私は新鮮な果物が好きです。
e164|She is eating an apple.|彼女はりんごを食べています。
e165|Monkeys like bananas.|サルはバナナが好きです。
e166|Eat your vegetables.|野菜を食べなさい。
e167|This cake is for you.|このケーキはあなたにです。
e168|The soup is hot.|スープは熱いです。
e169|I love Japanese food.|私は日本食が大好きです。
e170|What did you have for breakfast?|朝ご飯に何を食べましたか？
e171|Let's have lunch together.|一緒に昼ご飯を食べましょう。
e172|Dinner is ready!|晩ご飯ができたよ！
e173|This book is interesting.|この本はおもしろいです。
e174|Can I use your pen?|ペンを借りてもいいですか？
e175|I write with a pencil.|私は鉛筆で書きます。
e176|I need a piece of paper.|紙が一枚必要です。
e177|Open your notebook.|ノートを開いてください。
e178|My phone is in my bag.|私の電話はかばんの中です。
e179|This bag is heavy.|このかばんは重いです。
e180|I can't find my key.|鍵が見つかりません。
e181|I don't have much money.|お金をあまり持っていません。
e182|Take an umbrella with you.|傘を持っていきなさい。
e183|This is my new camera.|これは私の新しいカメラです。
e184|I use a computer at work.|私は仕事でコンピューターを使います。
e185|What's in the box?|箱の中に何が入っていますか？
e186|Can I have a cup of tea?|お茶を一杯もらえますか？
e187|The clock on the wall is fast.|壁の時計は進んでいます。
e188|Can I take a picture?|写真を撮ってもいいですか？
e189|Do you have a map?|地図を持っていますか？
e190|The boy is kicking a ball.|男の子がボールを蹴っています。
e191|Where is the station?|駅はどこですか？
e192|My son goes to school by bus.|息子はバスで学校に行きます。
e193|She is in the hospital.|彼女は入院しています。
e194|The store opens at ten.|その店は10時に開きます。
e195|There is a flower shop near here.|この近くに花屋があります。
e196|This restaurant is very popular.|このレストランはとても人気です。
e197|The bank is closed today.|銀行は今日閉まっています。
e198|Let's go to the park.|公園に行きましょう。
e199|We stayed at a nice hotel.|私たちはすてきなホテルに泊まりました。
e200|Tokyo is a big city.|東京は大きな都市です。
e201|I live in a small town.|私は小さな町に住んでいます。
e202|Which country are you from?|どこの国の出身ですか？
e203|How do I get to the airport?|空港へはどうやって行けばいいですか？
e204|Where is the restroom?|トイレはどこですか？
e205|My office is on the third floor.|私の事務所は3階にあります。
e206|I study at the library.|私は図書館で勉強します。
e207|The museum is closed on Mondays.|その博物館は月曜日が休みです。
e208|I go to the supermarket every Sunday.|私は毎週日曜日にスーパーに行きます。
e209|My father has a red car.|父は赤い車を持っています。
e210|The bus is late today.|今日はバスが遅れています。
e211|I go to work by train.|私は電車で仕事に行きます。
e212|Let's take a taxi.|タクシーに乗りましょう。
e213|I ride my bicycle to school.|私は自転車で学校に行きます。
e214|The plane leaves at noon.|飛行機は正午に出発します。
e215|Two tickets, please.|切符を2枚ください。
e216|Be careful on the road.|道路では気をつけて。
e217|Turn left at the corner.|その角を左に曲がってください。
e218|The bank is on your right.|銀行は右側にあります。
e219|The sun is very hot today.|今日は太陽がとても暑いです。
e220|We had a lot of rain today.|今日は雨がたくさん降りました。
e221|The children love the snow.|子どもたちは雪が大好きです。
e222|How is the weather today?|今日の天気はどうですか？
e223|We swam in the sea.|私たちは海で泳ぎました。
e224|That mountain is very high.|あの山はとても高いです。
e225|There is a big tree in the garden.|庭に大きな木があります。
e226|These flowers are for you.|この花はあなたにです。
e227|I have a small dog.|私は小さな犬を飼っています。
e228|The cat is sleeping on the bed.|猫がベッドの上で寝ています。
e229|A bird is singing outside.|外で鳥が鳴いています。
e230|We walked along the river.|私たちは川沿いを歩きました。
e231|My head hurts.|頭が痛いです。
e232|Wash your face.|顔を洗いなさい。
e233|She has beautiful eyes.|彼女はきれいな目をしています。
e234|My ear hurts.|耳が痛いです。
e235|Open your mouth, please.|口を開けてください。
e236|Wash your hands before dinner.|夕食の前に手を洗いなさい。
e237|My left foot hurts.|左足が痛いです。
e238|He broke his arm.|彼は腕を骨折しました。
e239|My legs are tired.|脚が疲れました。
e240|I have a bad tooth.|虫歯があります。
e241|My stomach hurts.|お腹が痛いです。
e242|She has long hair.|彼女は長い髪をしています。
e243|I'm very happy today.|今日はとてもうれしいです。
e244|Why are you sad?|どうして悲しいの？
e245|I'm tired after work.|仕事の後で疲れています。
e246|Are you hungry?|お腹がすいていますか？
e247|My son is sick today.|息子は今日病気です。
e248|I love this song.|私はこの歌が大好きです。
e249|Why are you angry?|どうして怒っているの？
e250|She is afraid of dogs.|彼女は犬が怖いです。
e251|Let's go home.|家に帰りましょう。
e252|They live in a big house.|彼らは大きな家に住んでいます。
e253|My room is small.|私の部屋は小さいです。
e254|Please close the door.|ドアを閉めてください。
e255|Can you open the window?|窓を開けてくれますか？
e256|It's time for bed.|もう寝る時間です。
e257|Mom is in the kitchen.|お母さんは台所にいます。
e258|Put it on the table.|それをテーブルの上に置いてください。
e259|Please sit on this chair.|この椅子に座ってください。
e260|I take a bath every night.|私は毎晩お風呂に入ります。
e261|I need new clothes.|新しい服が必要です。
e262|This shirt is too big.|このシャツは大きすぎます。
e263|These pants are too long.|このズボンは長すぎます。
e264|She is wearing a blue skirt.|彼女は青いスカートをはいています。
e265|That's a beautiful dress.|それはきれいなドレスですね。
e266|Take off your shoes, please.|靴を脱いでください。
e267|Don't forget your hat.|帽子を忘れないでね。
e268|It's cold, so wear a coat.|寒いからコートを着なさい。
e269|I want to buy a new phone.|新しい電話を買いたいです。
e270|They sell fresh fish here.|ここでは新鮮な魚を売っています。
e271|Can I pay by card?|カードで払えますか？
e272|What's the price of this?|これの値段はいくらですか？
e273|This shirt is very cheap.|このシャツはとても安いです。
e274|That watch is too expensive.|あの腕時計は高すぎます。
e275|Do you take credit cards?|クレジットカードは使えますか？
e276|That's a big dog.|あれは大きな犬です。
e277|I have a small car.|私は小さな車を持っています。
e278|This is a good book.|これは良い本です。
e279|The weather is bad today.|今日は天気が悪いです。
e280|I bought a new bag.|新しいかばんを買いました。
e281|This house is very old.|この家はとても古いです。
e282|It's very hot today.|今日はとても暑いです。
e283|It's cold outside.|外は寒いです。
e284|It was a long day.|長い一日でした。
e285|The movie was short.|その映画は短かったです。
e286|This test is easy.|このテストは簡単です。
e287|English is not so difficult.|英語はそれほど難しくありません。
e288|He is a fast runner.|彼は走るのが速いです。
e289|This computer is very slow.|このコンピューターはとても遅いです。
e290|What a beautiful day!|なんて美しい日でしょう！
e291|This soup is delicious.|このスープはとてもおいしいです。
e292|I'm busy this week.|今週は忙しいです。
e293|Are you free tomorrow?|明日は暇ですか？
e294|Is the store open now?|その店は今開いていますか？
e295|The bank is closed on Sundays.|銀行は日曜日は閉まっています。
e296|Is the station far from here?|駅はここから遠いですか？
e297|My mother looks young.|母は若く見えます。
e298|The price is too high.|値段が高すぎます。
e299|My brother is very tall.|私の兄はとても背が高いです。
e300|My room is clean now.|私の部屋は今きれいです。
`;

export const EXAMPLES_EN = Object.fromEntries(
  RAW.trim().split('\n').map((line) => {
    const [id, text, ja] = line.split('|');
    return [id, { text, ja }];
  }),
);
