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
e301|It is a small dog.|それは小さな犬です。
e302|This is my room.|これは私の部屋です。
e303|Can you call me later?|後で私に電話してくれる？
e304|Is this your pen?|これはあなたのペンですか？
e305|His bike is blue.|彼の自転車は青い。
e306|I like her smile.|私は彼女の笑顔が好きです。
e307|I saw him at school.|学校で彼を見かけました。
e308|This is our house.|これは私たちの家です。
e309|Mom called us for dinner.|お母さんが私たちを夕食に呼んだ。
e310|Their dog is very big.|彼らの犬はとても大きい。
e311|I know them well.|私は彼らをよく知っています。
e312|The dog wagged its tail.|犬がしっぽを振った。
e313|I am not hungry.|私はお腹がすいていません。
e314|The cat is on the bed.|ネコはベッドの上にいます。
e315|Let's meet at the station.|駅で会いましょう。
e316|This is a picture of my family.|これは私の家族の写真です。
e317|Tell me about your school.|あなたの学校について教えて。
e318|My house is by the river.|私の家は川のそばにあります。
e319|The ball is under the table.|ボールはテーブルの下にあります。
e320|I live near the park.|私は公園の近くに住んでいます。
e321|Let's play after school.|放課後に遊ぼう。
e322|Wash your hands before lunch.|昼ご飯の前に手を洗いなさい。
e323|Please stand up.|立ってください。
e324|Please sit down.|座ってください。
e325|This cake is very good.|このケーキはとてもおいしい。
e326|I like dogs, too.|私も犬が好きです。
e327|She also plays the piano.|彼女はピアノも弾きます。
e328|She sings very well.|彼女はとても上手に歌います。
e329|I really like this song.|私はこの歌が本当に好きです。
e330|Please say it again.|もう一度言ってください。
e331|Let's sing together.|一緒に歌おう。
e332|My name is Yuki.|私の名前はユキです。
e333|Look at that big bird!|あの大きな鳥を見て！
e334|I think it's a good idea.|それはいい考えだと思う。
e335|Take an umbrella with you.|傘を持って行きなさい。
e336|Can I use your pen?|あなたのペンを使ってもいい？
e337|I can't find my key.|鍵が見つからない。
e338|Can you help me?|手伝ってくれる？
e339|I live in Tokyo.|私は東京に住んでいます。
e340|I study English every day.|私は毎日英語を勉強します。
e341|My dog runs very fast.|私の犬はとても速く走ります。
e342|I walk to school.|私は歩いて学校へ行きます。
e343|We watch TV after dinner.|夕食の後、テレビを見ます。
e344|I will call you tonight.|今夜あなたに電話するね。
e345|Try this cake.|このケーキを食べてみて。
e346|Show me your picture.|あなたの絵を見せて。
e347|Put your bag here.|かばんをここに置いて。
e348|Let me try.|私にやらせて。
e349|School starts at eight.|学校は8時に始まります。
e350|The bus stopped at the station.|バスは駅で止まった。
e351|I want to learn Spanish.|スペイン語を学びたいです。
e352|My mom teaches math.|母は数学を教えています。
e353|We visit Grandma every summer.|私たちは毎年夏におばあちゃんを訪ねます。
e354|Please wait here.|ここで待っていてください。
e355|We enjoyed the party.|私たちはパーティーを楽しんだ。
e356|I finished my homework.|宿題を終えました。
e357|I practice the piano every day.|私は毎日ピアノを練習します。
e358|Can you swim?|泳げますか？
e359|Let's sing a song.|歌を歌おう。
e360|She loves to dance.|彼女は踊るのが大好きです。
e361|My dad cooks dinner on Sundays.|父は日曜日に夕食を作ります。
e362|Wash your hands.|手を洗いなさい。
e363|I brush my teeth every morning.|私は毎朝歯をみがきます。
e364|Stand by the door, please.|ドアのそばに立ってください。
e365|Sit on this chair.|このいすに座って。
e366|Please close the window.|窓を閉めてください。
e367|Turn left at the corner.|その角を左に曲がって。
e368|She is wearing a red dress.|彼女は赤いドレスを着ています。
e369|I ride my bike to the park.|私は自転車に乗って公園へ行きます。
e370|Birds fly in the sky.|鳥は空を飛びます。
e371|The frog jumped into the pond.|カエルが池に跳びこんだ。
e372|Let's climb the mountain.|山に登ろう。
e373|Catch the ball!|ボールを捕って！
e374|Throw the ball to me.|ボールを私に投げて。
e375|He kicked the ball hard.|彼はボールを強く蹴った。
e376|Let's draw a picture.|絵を描こう。
e377|We painted the wall white.|私たちは壁を白く塗った。
e378|Don't touch the hot pan.|熱いなべを触らないで。
e379|What's your phone number?|あなたの電話番号は何ですか？
e380|Can I ask a question?|質問してもいいですか？
e381|I know the answer.|私は答えを知っています。
e382|What does this word mean?|この単語はどういう意味ですか？
e383|I wrote a letter to Grandpa.|おじいちゃんに手紙を書きました。
e384|Read me a story, please.|お話を読んで。
e385|What color do you like?|何色が好きですか？
e386|We won the game!|私たちは試合に勝った！
e387|What sport do you like?|何のスポーツが好きですか？
e388|Let's play baseball.|野球をしよう。
e389|He plays soccer after school.|彼は放課後サッカーをします。
e390|My sister is on the basketball team.|姉はバスケットボール部に入っています。
e391|Do you play tennis?|テニスをしますか？
e392|We played volleyball on the beach.|浜辺でバレーボールをしました。
e393|Swimming is my favorite sport.|水泳は私の大好きなスポーツです。
e394|I love chocolate.|私はチョコレートが大好きです。
e395|Mom made cookies for us.|お母さんがクッキーを作ってくれた。
e396|Don't eat too much candy.|あめを食べすぎないで。
e397|I want some ice cream.|アイスクリームがほしい。
e398|We grow potatoes in our garden.|庭でジャガイモを育てています。
e399|This tomato is very red.|このトマトはとても赤い。
e400|Rabbits like carrots.|ウサギはニンジンが好きです。
e401|We picked strawberries on the farm.|農場でイチゴをつみました。
e402|I eat an orange every morning.|毎朝オレンジを1つ食べます。
e403|These grapes are sweet.|このブドウは甘い。
e404|This lemon is very sour.|このレモンはとてもすっぱい。
e405|Draw a circle on the paper.|紙に円をかいて。
e406|A square has four sides.|正方形には4つの辺がある。
e407|Cut the paper into a triangle.|紙を三角形に切って。
e408|We had fun at summer camp.|夏のキャンプは楽しかった。
e409|Let's have a picnic in the park.|公園でピクニックをしよう。
e410|Our team won the game.|私たちのチームが試合に勝った。
e411|We have five classes today.|今日は授業が5つあります。
e412|Our classroom is on the second floor.|私たちの教室は2階にあります。
e413|Do your homework first.|先に宿題をしなさい。
e414|I have a math test tomorrow.|明日は数学のテストがあります。
e415|I have a piano lesson today.|今日はピアノのレッスンがあります。
e416|What subject do you like?|何の教科が好きですか？
e417|Math is my favorite subject.|数学は私の大好きな教科です。
e418|I like science class.|私は理科の授業が好きです。
e419|I listen to music every day.|私は毎日音楽を聞きます。
e420|We painted pictures in art class.|美術の授業で絵を描きました。
e421|My desk is by the window.|私の机は窓のそばにあります。
e422|Can I use your eraser?|消しゴムを使ってもいい？
e423|I need a ruler for math.|数学で定規が必要です。
e424|What animal do you like?|何の動物が好きですか？
e425|This is my favorite song.|これは私の大好きな歌です。
e426|My dream is to be a doctor.|私の夢は医者になることです。
e427|Happy birthday, Mom!|お母さん、誕生日おめでとう！
e428|This present is for you.|これはあなたへのプレゼントです。
e429|Come to my party on Sunday.|日曜日の私のパーティーに来てね。
e430|Tomorrow is a holiday.|明日は休日です。
e431|We went to Okinawa during summer vacation.|夏休みに沖縄へ行きました。
e432|Let's go to the summer festival.|夏祭りに行こう。
e433|Sports day is a big school event.|運動会は学校の大きな行事です。
e434|We took a trip to Kyoto.|私たちは京都へ旅行しました。
e435|Which season do you like?|どの季節が好きですか？
e436|Cherry blossoms bloom in spring.|春には桜がさきます。
e437|It is very hot in summer.|夏はとても暑い。
e438|The leaves turn red in fall.|秋には葉が赤くなります。
e439|We go skiing in winter.|冬にはスキーに行きます。
e440|My birthday is in January.|私の誕生日は1月です。
e441|February is a short month.|2月は短い月です。
e442|The school year ends in March.|学年は3月に終わります。
e443|School starts in April in Japan.|日本では学校は4月に始まります。
e444|We have a long holiday in May.|5月には長い休みがあります。
e445|It rains a lot in June.|6月は雨がたくさん降ります。
e446|Summer vacation starts in July.|夏休みは7月に始まります。
e447|August is the hottest month.|8月はいちばん暑い月です。
e448|School starts again in September.|9月にまた学校が始まります。
e449|Halloween is in October.|ハロウィーンは10月です。
e450|It gets cold in November.|11月には寒くなります。
e451|Christmas is in December.|クリスマスは12月です。
e452|I am thirteen years old.|私は13歳です。
e453|There are fourteen students here.|ここに14人の生徒がいます。
e454|My sister is fifteen.|姉は15歳です。
e455|He turned sixteen today.|彼は今日16歳になった。
e456|There are seventeen eggs in the box.|箱に卵が17個あります。
e457|My brother is eighteen.|兄は18歳です。
e458|Nineteen people came to the party.|19人がパーティーに来ました。
e459|My dad is forty.|父は40歳です。
e460|This book has fifty pages.|この本は50ページあります。
e461|There are sixty minutes in an hour.|1時間は60分です。
e462|My grandma is seventy.|祖母は70歳です。
e463|The tree is eighty years old.|その木は樹齢80年です。
e464|I got ninety on the test.|テストで90点を取りました。
e465|I'm fine, thank you.|元気です、ありがとう。
e466|That's a great idea!|それはすばらしい考えだ！
e467|What a nice day!|なんてすてきな日だろう！
e468|The party was a lot of fun.|パーティーはとても楽しかった。
e469|Your puppy is so cute!|あなたの子犬はとてもかわいい！
e470|Your new shoes are cool!|あなたの新しい靴、かっこいいね！
e471|She is kind to everyone.|彼女はみんなに親切です。
e472|He told a funny story.|彼はおかしな話をした。
e473|The dog is very friendly.|その犬はとても人なつっこい。
e474|The brave boy saved the cat.|勇敢な男の子がネコを助けた。
e475|My father is very strong.|父はとても力が強い。
e476|Your dog is very smart.|あなたの犬はとても賢い。
e477|My little brother is very active.|弟はとても活発です。
e478|He is a famous singer.|彼は有名な歌手です。
e479|This game is popular with kids.|このゲームは子どもたちに人気がある。
e480|We had a wonderful time.|私たちはすばらしい時間を過ごした。
e481|The game was very exciting.|その試合はとてもわくわくした。
e482|This book is very interesting.|この本はとてもおもしろい。
e483|Blue is my favorite color.|青は私のお気に入りの色です。
e484|The little bird is singing.|小さな鳥が歌っている。
e485|I want a large pizza.|Lサイズのピザがほしい。
e486|This bread is very hard.|このパンはとてもかたい。
e487|This pillow is soft.|このまくらは柔らかい。
e488|The earth is round.|地球は丸い。
e489|This cake is too sweet.|このケーキは甘すぎる。
e490|This curry is too spicy for me.|このカレーは私には辛すぎる。
e491|I'm sleepy. Good night.|眠いよ。おやすみ。
e492|I'm thirsty. Can I have water?|のどがかわいた。水をもらえる？
e493|I'm so excited about the trip!|旅行がとても楽しみでわくわくしている！
e494|This sweater is very warm.|このセーターはとても暖かい。
e495|It is sunny and warm.|晴れていて暖かい。
e496|It's rainy today.|今日は雨です。
e497|It was cloudy this morning.|今朝はくもっていた。
e498|It's windy outside.|外は風が強い。
e499|The sky is blue today.|今日は空が青い。
e500|I can see many stars tonight.|今夜は星がたくさん見える。
e501|The moon is bright tonight.|今夜は月が明るい。
e502|Look at that white cloud.|あの白い雲を見て。
e503|The wind is very strong today.|今日は風がとても強い。
e504|Japan is a country of islands.|日本は島国です。
e505|Many animals live in the forest.|森にはたくさんの動物が住んでいます。
e506|We swam in the lake.|私たちは湖で泳ぎました。
e507|Let's go to the beach.|浜辺へ行こう。
e508|Exercise is good for your body.|運動は体にいい。
e509|Your nose is red.|鼻が赤いよ。
e510|I cut my finger.|指を切ってしまった。
e511|My shoulder hurts.|肩が痛い。
e512|I hurt my knee.|ひざをけがした。
e513|Giraffes have long necks.|キリンは首が長い。
e514|She has a kind heart.|彼女はやさしい心を持っている。
e515|My uncle lives in Osaka.|おじは大阪に住んでいます。
e516|My aunt is a nurse.|おばは看護師です。
e517|My cousin is the same age as me.|いとこは私と同い年です。
e518|Good morning, everyone!|みなさん、おはようございます！
e519|He is a good tennis player.|彼は上手なテニス選手です。
e520|The nurse is very kind.|その看護師はとても親切です。
e521|The farmer grows rice.|その農家の人は米を育てている。
e522|She wants to be a singer.|彼女は歌手になりたい。
e523|The pilot flies the plane.|パイロットが飛行機を操縦する。
e524|I want to be a scientist.|私は科学者になりたい。
e525|The artist painted a big picture.|その画家は大きな絵を描いた。
e526|My cousin is a writer.|いとこは作家です。
e527|The bus driver said hello.|バスの運転手さんがあいさつしてくれた。
e528|We saw lions at the zoo.|動物園でライオンを見ました。
e529|My grandma grows flowers in her garden.|祖母は庭で花を育てている。
e530|Be careful when you cross the street.|通りを渡るときは気をつけて。
e531|That tall building is a hotel.|あの高い建物はホテルです。
e532|Let's walk across the bridge.|橋を歩いて渡ろう。
e533|My uncle has a farm.|おじは農場を持っています。
e534|Let's swim in the pool.|プールで泳ごう。
e535|We play basketball in the gym.|体育館でバスケットボールをします。
e536|I bought a comic at the bookstore.|書店でマンガを買いました。
e537|We visited an old temple in Nara.|奈良の古いお寺を訪れました。
e538|We go to the shrine on New Year's Day.|元日に神社へ行きます。
e539|The kids are playing in the playground.|子どもたちが遊び場で遊んでいる。
e540|There is a clock on the wall.|壁に時計がかかっている。
e541|Don't sit on the floor.|床に座らないで。
e542|There is a television in the living room.|居間にテレビがあります。
e543|Can I have a glass of water?|水を1杯もらえますか？
e544|Please wash the dishes.|お皿を洗ってください。
e545|Eat your soup with a spoon.|スープはスプーンで飲みなさい。
e546|I need a fork for the cake.|ケーキ用のフォークが必要です。
e547|Be careful with that knife.|そのナイフに気をつけて。
e548|I bought a bottle of water.|水を1本買いました。
e549|Can you use chopsticks?|おはしを使えますか？
e550|My brother has many toys.|弟はおもちゃをたくさん持っている。
e551|My sister loves her doll.|妹は自分の人形が大好きです。
e552|She plays the piano well.|彼女はピアノを上手に弾く。
e553|My dad plays the guitar.|父はギターを弾きます。
e554|A big ship is in the port.|大きな船が港にいる。
e555|Let's ride a boat on the lake.|湖でボートに乗ろう。
e556|A big truck is on the road.|大きなトラックが道を走っている。
e557|It's seven o'clock.|7時です。
e558|He is wearing a baseball cap.|彼は野球帽をかぶっている。
e559|I lost one of my gloves.|手袋を片方なくしました。
e560|Where are my socks?|私の靴下はどこ？
e561|Grandma made this sweater for me.|おばあちゃんがこのセーターを作ってくれた。
e562|Take your jacket. It's cold.|上着を持って行きなさい。寒いよ。
e563|I bought a new T-shirt.|新しいTシャツを買いました。
e564|Can you ride a horse?|馬に乗れますか？
e565|Cows give us milk.|牛は私たちに牛乳をくれる。
e566|The pig is sleeping in the mud.|ブタが泥の中で寝ている。
e567|The rabbit has long ears.|ウサギは耳が長い。
e568|Bears sleep in winter.|クマは冬に眠る。
e569|The cat is chasing a mouse.|ネコがネズミを追いかけている。
e570|The monkey is eating a banana.|サルがバナナを食べている。
e571|The lion is the king of animals.|ライオンは動物の王様です。
e572|The tiger has black stripes.|トラには黒いしまがある。
e573|The elephant has a long nose.|ゾウは鼻が長い。
e574|There are many sheep on the farm.|農場にはたくさんの羊がいる。
e575|The ducks are swimming in the pond.|アヒルが池で泳いでいる。
e576|A fox lives in the forest.|森にキツネが住んでいる。
e577|I heard a frog in the rice field.|田んぼでカエルの声が聞こえた。
e578|I'm afraid of snakes.|私はヘビがこわい。
e579|Pandas eat bamboo.|パンダは竹を食べる。
e580|Penguins can't fly.|ペンギンは飛べない。
e581|Dolphins are very smart.|イルカはとても賢い。
e582|A butterfly is on the flower.|花にチョウがとまっている。
e583|Bees make honey.|ハチははちみつを作る。
e584|Do you want sugar in your tea?|紅茶に砂糖を入れますか？
e585|Can you pass me the salt?|塩を取ってくれる？
e586|Mice like cheese.|ネズミはチーズが好き。
e587|Put some butter on your toast.|トーストにバターをぬって。
e588|Let's order a pizza tonight.|今夜はピザを頼もう。
e589|I want a hamburger for lunch.|お昼にハンバーガーが食べたい。
e590|Mom made sandwiches for the picnic.|お母さんがピクニック用にサンドイッチを作った。
e591|Eat your salad, too.|サラダも食べなさい。
e592|My dad makes good curry.|父はおいしいカレーを作ります。
e593|We had spaghetti for dinner.|夕食にスパゲッティを食べました。
e594|This steak is delicious.|このステーキはとてもおいしい。
e595|Grandma baked an apple pie.|おばあちゃんがアップルパイを焼いた。
e596|Cutting onions makes me cry.|タマネギを切ると涙が出る。
e597|We ate corn at the festival.|お祭りでトウモロコシを食べた。
e598|I like hot noodles in winter.|冬は温かいめんが好きです。
e599|This peach is soft and sweet.|このモモは柔らかくて甘い。
e600|Melons are expensive in Japan.|日本ではメロンは高い。
e601|What is that thing on the table?|テーブルの上のあれは何？
e602|Is this the way to the station?|これは駅へ行く道ですか？
e603|She has a happy life.|彼女は幸せな生活を送っている。
e604|I want to travel around the world.|世界中を旅行したい。
e605|This is a nice place to sit.|ここは座るのにいい場所だ。
e606|My father works at a bank.|父は銀行で働いています。
e607|Let's talk about our trip.|旅行について話そう。
e608|Please tell me your name.|あなたの名前を教えてください。
e609|Can I ask you a question?|質問してもいいですか？
e610|I feel happy today.|今日は幸せな気分だ。
e611|I want to become a doctor.|私は医者になりたい。
e612|The bus leaves at seven.|バスは7時に出発します。
e613|Keep your room clean.|部屋をきれいに保ちなさい。
e614|School begins in April.|学校は4月に始まります。
e615|Please bring your lunch tomorrow.|明日はお弁当を持ってきてください。
e616|Can you hear me?|私の声が聞こえますか？
e617|Nice to meet you.|はじめまして。
e618|We moved to Osaka last year.|私たちは去年大阪に引っ越した。
e619|Please hold my bag for a minute.|ちょっと私のかばんを持っていて。
e620|I don't understand this word.|この単語がわかりません。
e621|Do you remember her name?|彼女の名前を覚えている？
e622|Don't forget your umbrella.|かさを忘れないでね。
e623|I want to thank my teacher.|先生に感謝したい。
e624|I hope you get well soon.|早くよくなるといいね。
e625|We stayed at a hotel.|私たちはホテルに泊まった。
e626|I sent a letter to Grandma.|おばあちゃんに手紙を送った。
e627|I like to travel by train.|電車で旅行するのが好きです。
e628|The leaves change color in fall.|秋には葉の色が変わる。
e629|We grow tomatoes in our garden.|庭でトマトを育てています。
e630|Can you carry this box?|この箱を運べる？
e631|They will build a new school.|彼らは新しい学校を建てる予定だ。
e632|Choose one card, please.|カードを1枚選んでください。
e633|I decided to join the team.|私はチームに入ることに決めた。
e634|I can't believe it!|信じられない！
e635|I spent all my money.|お金を全部使ってしまった。
e636|I lost my key yesterday.|昨日かぎをなくした。
e637|Our team won the game.|私たちのチームが試合に勝った。
e638|The train arrived on time.|電車は時間どおりに着いた。
e639|Please return the book tomorrow.|明日その本を返してください。
e640|The baby is crying.|赤ちゃんが泣いている。
e641|We laughed at his joke.|私たちは彼の冗談に笑った。
e642|She always smiles at me.|彼女はいつも私にほほえむ。
e643|Don't worry about the test.|テストのことは心配しないで。
e644|What happened to you?|何があったの？
e645|What does this word mean?|この単語はどういう意味？
e646|What are your plans for summer?|夏の予定は何？
e647|Let's share this cake.|このケーキを分け合おう。
e648|Cut the paper with scissors.|はさみで紙を切って。
e649|Don't break the glass.|コップを割らないで。
e650|Dad fixed my bike.|お父さんが自転車を直してくれた。
e651|My mother drives to work.|母は車で仕事に行く。
e652|Please pass me the salt.|塩を取ってください。
e653|Push the button, please.|ボタンを押してください。
e654|Pull the door to open it.|ドアを引いて開けて。
e655|We picked strawberries at the farm.|農園でいちごを摘んだ。
e656|I water the plants every day.|毎日植物に水をやる。
e657|I save money for a new bike.|新しい自転車のためにお金を貯めている。
e658|My plant died last week.|先週、私の植物が枯れた。
e659|This spray kills bugs.|このスプレーは虫を殺す。
e660|I wake up at six.|私は6時に目が覚める。
e661|We have to hurry.|急がなくちゃ。
e662|I joined the soccer club.|サッカー部に入った。
e663|Please enter the room quietly.|静かに部屋に入ってください。
e664|I invited Ken to my party.|ケンをパーティーに招待した。
e665|Let me introduce my friend.|友だちを紹介させてください。
e666|Can I borrow your pen?|ペンを借りてもいい？
e667|Can you lend me your eraser?|消しゴムを貸してくれる？
e668|My brother collects stamps.|兄は切手を集めている。
e669|Look both ways before you cross.|渡る前に左右を見てね。
e670|Can I take your order?|ご注文をうかがいます。
e671|Let's take a rest here.|ここで休憩しよう。
e672|Don't shout in the library.|図書館で大声を出さないで。
e673|This soup smells good.|このスープはいいにおいがする。
e674|This cake tastes sweet.|このケーキは甘い味がする。
e675|That sounds like fun!|それは楽しそうだね！
e676|I wish I could fly.|空を飛べたらいいのに。
e677|Can you guess my age?|私の年を当ててみて。
e678|My leg hurts after running.|走ったあと足が痛い。
e679|Please repeat after me.|私のあとについて言ってください。
e680|I received a letter from her.|彼女から手紙を受け取った。
e681|How do you spell your name?|あなたの名前はどうつづりますか？
e682|I solved the math problem.|算数の問題を解いた。
e683|Mom bakes bread on Sundays.|お母さんは日曜日にパンを焼く。
e684|Boil the eggs for ten minutes.|卵を10分ゆでて。
e685|Please set the table for dinner.|夕食のために食卓を整えてください。
e686|Shake the bottle before you drink.|飲む前にびんを振ってね。
e687|I missed the bus today.|今日バスに乗り遅れた。
e688|He hit the ball far.|彼はボールを遠くまで打った。
e689|I walk my dog every day.|毎日犬の散歩をする。
e690|Do you have any other colors?|他の色はありますか？
e691|Can I have another cookie?|クッキーをもう一つもらえる？
e692|Each student has a desk.|それぞれの生徒に机がある。
e693|Both my parents are teachers.|両親は二人とも先生です。
e694|I have only one brother.|私には兄弟が一人だけいる。
e695|I just finished my homework.|ちょうど宿題が終わったところ。
e696|Are you still hungry?|まだおなかすいてる？
e697|I already ate lunch.|もう昼ごはんを食べた。
e698|I haven't eaten dinner yet.|まだ夕食を食べていない。
e699|Have you ever been to Kyoto?|京都に行ったことはある？
e700|I went to Hokkaido once.|北海道に一度行ったことがある。
e701|I brush my teeth twice a day.|私は1日に2回歯をみがく。
e702|Maybe it will rain tomorrow.|たぶん明日は雨が降るだろう。
e703|Dinner is almost ready.|夕食はほとんどできている。
e704|We have enough food for everyone.|みんなに十分な食べ物がある。
e705|Even my dad likes this game.|父でさえこのゲームが好きだ。
e706|My brother is taller than me.|兄は私より背が高い。
e707|It was cold, so I wore a coat.|寒かったので、コートを着た。
e708|We ate lunch, then went shopping.|お昼を食べて、それから買い物に行った。
e709|She works as a nurse.|彼女は看護師として働いている。
e710|I'll be back soon.|すぐ戻るね。
e711|The station is far away.|駅はずっと遠くにある。
e712|I met him three days ago.|3日前に彼に会った。
e713|I got up early today.|今日は早く起きた。
e714|I was late for school today.|今日は学校に遅れた。
e715|Let's play outside after lunch.|お昼のあとに外で遊ぼう。
e716|It's raining, so stay inside.|雨だから中にいなさい。
e717|The cat jumped into the box.|ねこが箱の中に飛びこんだ。
e718|A bird flew over the house.|鳥が家の上を飛んでいった。
e719|We sat around the table.|私たちはテーブルの周りに座った。
e720|The bank is between the two shops.|銀行は2つの店の間にある。
e721|I can't live without music.|音楽なしでは生きられない。
e722|I slept during the movie.|映画の間、寝てしまった。
e723|I'll wait until five.|5時まで待ちます。
e724|We walked through the park.|私たちは公園を通って歩いた。
e725|The store is across the street.|店は通りの向こう側にある。
e726|We walked along the river.|私たちは川に沿って歩いた。
e727|The cat is behind the sofa.|ねこはソファーの後ろにいる。
e728|I want something to drink.|何か飲み物がほしい。
e729|Do you need anything?|何か必要なものはある？
e730|There is nothing in the box.|箱の中には何もない。
e731|Someone is at the door.|誰かが玄関に来ている。
e732|Can anyone help me?|誰か手伝ってくれる？
e733|Thank you for everything.|いろいろとありがとう。
e734|I made this cake myself.|このケーキは自分で作った。
e735|Please help yourself to the cookies.|クッキーをご自由にどうぞ。
e736|This pencil is mine.|この鉛筆は私のものです。
e737|Is this bag yours?|このかばんはあなたの？
e738|I ate a lot at dinner.|夕食でたくさん食べた。
e739|We are in the same class.|私たちは同じクラスです。
e740|My sister and I are very different.|姉と私はとても違う。
e741|Sleep is important for kids.|子どもにとって睡眠は大切だ。
e742|Today is a special day.|今日は特別な日だ。
e743|I'm sure he will come.|きっと彼は来ると思う。
e744|Are you ready for school?|学校の準備はできた？
e745|Is that story true?|その話は本当？
e746|Is this a real diamond?|これは本物のダイヤモンド？
e747|Sorry, I took the wrong bus.|ごめん、違うバスに乗っちゃった。
e748|I saw her last week.|先週彼女に会った。
e749|See you next week!|また来週ね！
e750|I want my own room.|自分の部屋がほしい。
e751|I was able to swim fast.|速く泳ぐことができた。
e752|I'm glad to see you.|会えてうれしい。
e753|You are so lucky!|君はとても運がいいね！
e754|Dear Grandma, thank you for the gift.|おばあちゃんへ、プレゼントをありがとう。
e755|Be careful on the stairs.|階段では気をつけて。
e756|Please be quiet in the library.|図書館では静かにしてください。
e757|It gets dark early in winter.|冬は早く暗くなる。
e758|The sun is very bright today.|今日は太陽がとてもまぶしい。
e759|Please turn on the light.|電気をつけてください。
e760|This box is too heavy.|この箱は重すぎる。
e761|Swimming here is dangerous.|ここで泳ぐのは危ない。
e762|This park is safe for kids.|この公園は子どもにとって安全だ。
e763|This app is very useful.|このアプリはとても役に立つ。
e764|The poor dog is hungry.|かわいそうに、その犬はおなかをすかせている。
e765|He wants to be rich.|彼はお金持ちになりたい。
e766|The bus was full this morning.|今朝のバスは満員だった。
e767|The bottle is empty.|びんは空っぽだ。
e768|Your shoes are dirty.|あなたのくつは汚れている。
e769|My hair is still wet.|髪がまだぬれている。
e770|Are the clothes dry yet?|服はもう乾いた？
e771|This lake is very deep.|この湖はとても深い。
e772|The table is too low for me.|そのテーブルは私には低すぎる。
e773|Let's have a quick lunch.|さっと昼ごはんを食べよう。
e774|The music is too loud.|音楽の音が大きすぎる。
e775|The rules are very simple.|ルールはとても簡単だ。
e776|I heard a strange sound.|変な音が聞こえた。
e777|The weather was terrible today.|今日の天気はひどかった。
e778|Your English is perfect!|あなたの英語は完璧だ！
e779|Eat vegetables to stay healthy.|健康でいるために野菜を食べよう。
e780|The baby bird is still weak.|ひな鳥はまだ弱い。
e781|This book is very thin.|この本はとても薄い。
e782|The dictionary is very thick.|その辞書はとても厚い。
e783|I walked home alone.|一人で歩いて帰った。
e784|I have a few friends here.|ここには少し友だちがいる。
e785|I ate the whole pizza.|ピザを丸ごと食べた。
e786|The water is very clear.|水がとても澄んでいる。
e787|I was surprised at the news.|そのニュースに驚いた。
e788|I'm interested in Japanese history.|私は日本の歴史に興味がある。
e789|I'm bored. Let's play a game.|退屈だ。ゲームをしよう。
e790|I'm scared of big dogs.|大きい犬が怖い。
e791|I'm nervous about the test.|テストのことで緊張している。
e792|I feel lonely without my dog.|犬がいなくてさびしい。
e793|Be gentle with the kitten.|子ねこには優しくしてね。
e794|She is a very kind person.|彼女はとても親切な人だ。
e795|The kids are playing in the park.|子どもたちが公園で遊んでいる。
e796|Tickets are ten dollars for adults.|チケットは大人10ドルです。
e797|My parents are both from Osaka.|両親はどちらも大阪出身だ。
e798|Her husband is a cook.|彼女の夫は料理人だ。
e799|His wife works at a hospital.|彼の奥さんは病院で働いている。
e800|We have guests tonight.|今夜はお客さんが来る。
e801|Our neighbor has a big dog.|お隣さんは大きな犬を飼っている。
e802|Ken is my classmate.|ケンは私の同級生です。
e803|Find a partner and talk.|相手を見つけて話しましょう。
e804|I'm a member of the tennis club.|私はテニス部の部員です。
e805|She is the leader of our group.|彼女は私たちのグループのリーダーだ。
e806|He is the captain of the team.|彼はチームのキャプテンだ。
e807|Our coach is very strict.|私たちのコーチはとても厳しい。
e808|I'm a big fan of this singer.|私はこの歌手の大ファンです。
e809|The king lived in a big castle.|王様は大きなお城に住んでいた。
e810|The queen wore a beautiful dress.|女王は美しいドレスを着ていた。
e811|The prince rode a white horse.|王子は白い馬に乗った。
e812|My sister loves princess stories.|妹はお姫様の話が大好きだ。
e813|That lady is my teacher.|あの女性は私の先生です。
e814|He is a real gentleman.|彼は本当の紳士だ。
e815|I visit my grandma every Sunday.|毎週日曜日におばあちゃんに会いに行く。
e816|This is my favorite part of the movie.|ここが映画でいちばん好きな部分だ。
e817|We have a big problem.|大きな問題がある。
e818|That's a good idea!|それはいい考えだね！
e819|Can you give me an example?|例を挙げてくれますか？
e820|We cried at the end of the movie.|映画の最後で私たちは泣いた。
e821|We reached the top of the mountain.|私たちは山の頂上に着いた。
e822|Please walk on the left side.|左側を歩いてください。
e823|There is a tree in the middle of the park.|公園の真ん中に木がある。
e824|I ate half of the cake.|ケーキの半分を食べた。
e825|The station is in the center of town.|駅は町の中心にある。
e826|Turn right at the corner.|その角を右に曲がって。
e827|Let's meet in front of the station.|駅の前で会おう。
e828|I'm in the art club.|私は美術部に入っている。
e829|Club activities start at four.|部活動は4時に始まる。
e830|She won the singing contest.|彼女は歌のコンテストで優勝した。
e831|I gave a speech in English.|私は英語でスピーチをした。
e832|Open your textbook to page ten.|教科書の10ページを開いてください。
e833|Look up the word in your dictionary.|辞書でその単語を調べなさい。
e834|Please turn the page.|ページをめくってください。
e835|Read the first sentence aloud.|最初の文を声に出して読みなさい。
e836|I like history class the best.|歴史の授業がいちばん好き。
e837|I'm in the sixth grade.|私は6年生です。
e838|My brother plays in a band.|兄はバンドで演奏している。
e839|We went to a piano concert.|私たちはピアノのコンサートに行った。
e840|I have some good news!|いい知らせがあるよ！
e841|My grandpa reads the newspaper every morning.|祖父は毎朝新聞を読む。
e842|I bought a comic magazine.|漫画雑誌を買った。
e843|We listen to the radio in the car.|車の中でラジオを聞く。
e844|Let's watch a movie tonight.|今夜映画を見よう。
e845|I watched a funny video.|面白い動画を見た。
e846|Can I take a photo here?|ここで写真を撮ってもいいですか？
e847|I read comics before bed.|寝る前に漫画を読む。
e848|Can I leave a message?|伝言をお願いできますか？
e849|My grandma lives in a small village.|祖母は小さな村に住んでいる。
e850|There are many parks in this area.|この地域には公園がたくさんある。
e851|We buy fish at the market.|私たちは市場で魚を買う。
e852|We saw a play at the theater.|劇場で劇を見た。
e853|The concert is in the big hall.|コンサートは大ホールである。
e854|We live in an apartment.|私たちはアパートに住んでいる。
e855|My uncle works at a car factory.|おじは自動車工場で働いている。
e856|The farmer works in the field.|農家の人が畑で働いている。
e857|The ground is wet after the rain.|雨のあと地面がぬれている。
e858|Our school is on a hill.|私たちの学校は丘の上にある。
e859|The earth goes around the sun.|地球は太陽の周りを回っている。
e860|Whales live in the ocean.|クジラは海に住んでいる。
e861|I want to go to space someday.|いつか宇宙に行きたい。
e862|I love walking in nature.|自然の中を歩くのが大好き。
e863|The air is fresh in the mountains.|山の空気は新鮮だ。
e864|Don't play with fire.|火遊びをしてはいけない。
e865|Put some ice in my drink.|飲み物に氷を入れて。
e866|We sat on a big rock.|私たちは大きな岩に座った。
e867|The old wall is made of stone.|その古い壁は石でできている。
e868|The kids played in the sand.|子どもたちは砂で遊んだ。
e869|Don't walk on the grass.|芝生に入らないでください。
e870|A red leaf fell from the tree.|赤い葉が木から落ちた。
e871|This table is made of wood.|このテーブルは木でできている。
e872|We planted flower seeds.|花の種を植えた。
e873|The waves are big today.|今日は波が大きい。
e874|Let's eat lunch at noon.|正午にお昼を食べよう。
e875|What's the date today?|今日は何日？
e876|I want to be a pilot in the future.|将来パイロットになりたい。
e877|Let's not talk about the past.|過去のことは話さないでおこう。
e878|Wait a moment, please.|ちょっと待ってください。
e879|My bedroom is on the second floor.|私の寝室は2階にある。
e880|Can I use your bathroom?|トイレを借りてもいい？
e881|Please flush the toilet.|トイレの水を流してください。
e882|I take a shower every night.|毎晩シャワーを浴びる。
e883|She looked in the mirror.|彼女は鏡を見た。
e884|Let's take the stairs.|階段で行こう。
e885|A cat is sleeping on the roof.|ねこが屋根の上で寝ている。
e886|Please close the gate.|門を閉めてください。
e887|The kids are playing in the yard.|子どもたちが庭で遊んでいる。
e888|I left my wallet at home.|財布を家に忘れた。
e889|She wears a gold ring.|彼女は金の指輪をしている。
e890|I can't read without my glasses.|めがねがないと読めない。
e891|We wear uniforms at school.|学校では制服を着る。
e892|I put my phone in my pocket.|スマホをポケットに入れた。
e893|My father wears a tie to work.|父は仕事にネクタイをしていく。
e894|It's cold, so wear a scarf.|寒いからマフラーをしてね。
e895|I wear boots on rainy days.|雨の日はブーツをはく。
e896|We eat three meals a day.|私たちは1日に3回食事をする。
e897|What's for dessert today?|今日のデザートは何？
e898|I eat a snack after school.|放課後におやつを食べる。
e899|Can I see the menu, please?|メニューを見せてもらえますか？
e900|Put some sauce on your fish.|魚にソースをかけて。
e901|Put some oil in the pan.|フライパンに油を少し入れて。
e902|Can you pass the pepper?|コショウを取ってくれる？
e903|I don't like green beans.|ぼくはさやいんげんが苦手です。
e904|I forgot my lunchbox today.|今日はお弁当箱を忘れちゃった。
e905|My son has a fever.|息子は熱があります。
e906|Take this medicine after dinner.|夕食後にこの薬を飲んでね。
e907|I have a bad headache.|ひどい頭痛がします。
e908|I hurt my toe.|足の指をけがしました。
e909|My lips are dry.|くちびるがかさかさです。
e910|I love autumn leaves.|秋の紅葉が大好きです。
e911|Dad has a meeting today.|お父さんは今日会議があります。
e912|Slow down your speed.|スピードを落として。
e913|I put jam on my toast.|トーストにジャムをぬります。
e914|Good job!|よくできました！
e915|How many languages can you speak?|何か国語話せますか？
e916|Let's work in groups.|グループで取り組みましょう。
e917|Please wait in line.|列に並んでお待ちください。
e918|Let's make a shopping list.|買い物リストを作ろう。
e919|That's a good point.|それはいい点ですね。
e920|Follow the rules.|規則を守りなさい。
e921|Look at that sign.|あの標識を見て。
e922|She has a beautiful voice.|彼女はきれいな声をしています。
e923|What's that noise?|あの物音は何？
e924|What size are your shoes?|くつのサイズはいくつ？
e925|This cookie is in the shape of a star.|このクッキーは星の形です。
e926|Can I have a piece of cake?|ケーキを一切れもらえる？
e927|I bought a pair of socks.|くつ下を一足買いました。
e928|Thank you for the gift.|贈り物をありがとう。
e929|She won first prize.|彼女は1等賞をとりました。
e930|My goal is to swim fast.|私の目標は速く泳ぐことです。
e931|What's the score now?|今の得点は？
e932|Good luck on your test!|テストがんばってね！
e933|We want world peace.|私たちは世界平和を願います。
e934|The war ended long ago.|その戦争はずっと前に終わりました。
e935|Sleep is good for your health.|睡眠は健康によいです。
e936|Can you keep a secret?|秘密を守れる？
e937|My hobby is reading.|私の趣味は読書です。
e938|Let's go shopping tomorrow.|明日買い物に行こう。
e939|We went fishing in the river.|川へ釣りに行きました。
e940|Hiking is fun in spring.|春のハイキングは楽しいです。
e941|It was just a joke.|ただの冗談だよ。
e942|He showed us a magic trick.|彼は手品を見せてくれました。
e943|Let's do a puzzle together.|いっしょにパズルをしよう。
e944|I watch a drama every night.|毎晩ドラマを見ます。
e945|We took a tour of the castle.|お城の見学ツアーに参加しました。
e946|We have a visitor today.|今日はお客さんが来ます。
e947|Many tourists come to Kyoto.|たくさんの観光客が京都に来ます。
e948|Our guide was very kind.|ガイドさんはとても親切でした。
e949|I bought a souvenir for you.|あなたにおみやげを買ったよ。
e950|We saw land from the ship.|船から陸地が見えました。
e951|There are fish in the pond.|池に魚がいます。
e952|She likes red roses.|彼女は赤いバラが好きです。
e953|The sunflowers are very tall.|ヒマワリはとても背が高いです。
e954|A big storm is coming.|大きな嵐が近づいています。
e955|School is closed because of the typhoon.|台風で学校が休みです。
e956|The sun rises in the east.|太陽は東からのぼります。
e957|The sun sets in the west.|太陽は西にしずみます。
e958|Birds fly south in winter.|鳥は冬に南へ飛んでいきます。
e959|It's cold in the north.|北の方は寒いです。
e960|Go straight and turn left.|まっすぐ行って左に曲がってください。
e961|My mom works for a big company.|母は大きな会社で働いています。
e962|He is a hard worker.|彼は働き者です。
e963|Call the police!|警察を呼んで！
e964|The officer helped the lost child.|警官が迷子を助けました。
e965|I go to the dentist today.|今日は歯医者に行きます。
e966|Ask the clerk for help.|店員さんに聞いてみて。
e967|The waiter brought our food.|ウェイターが料理を運んできました。
e968|He wants to be an actor.|彼は俳優になりたいです。
e969|My uncle is a musician.|おじは音楽家です。
e970|Do you have any pets?|何かペットを飼っていますか？
e971|The puppy is so cute.|その子犬はとてもかわいいです。
e972|A bee is an insect.|ハチは昆虫です。
e973|There's a bug on your shirt.|シャツに虫がついてるよ。
e974|I have two goldfish.|金魚を2匹飼っています。
e975|Let's eat lunch in the cafeteria.|食堂でお昼を食べよう。
e976|The teacher wrote on the blackboard.|先生が黒板に書きました。
e977|My backpack is heavy.|ぼくのリュックは重いです。
e978|Put the apples in the basket.|リンゴをかごに入れて。
e979|He swung the bat hard.|彼はバットを強くふりました。
e980|I need a new tennis racket.|新しいテニスラケットがほしいです。
e981|She won a gold medal.|彼女は金メダルをとりました。
e982|I found a coin on the floor.|床に硬貨が落ちていました。
e983|Is this seat free?|この席は空いていますか？
e984|I sent a postcard to Grandma.|おばあちゃんにはがきを送りました。
e985|I need a stamp for this letter.|この手紙に切手が必要です。
e986|What's your address?|あなたの住所はどこですか？
e987|My smartphone is out of battery.|スマホの電池が切れた。
e988|I looked it up on the internet.|インターネットで調べました。
e989|Let's meet at the cafe.|カフェで会おう。
e990|We went to the mall on Sunday.|日曜日にショッピングモールへ行きました。
e991|Where is the post office?|郵便局はどこですか？
e992|These jeans are too long.|このジーンズは長すぎます。
e993|Put the plates on the table.|お皿をテーブルに並べて。
e994|I ate a bowl of rice.|ご飯を一杯食べました。
e995|Cook the soup in a big pot.|大きななべでスープを作って。
e996|Heat the pan first.|まずフライパンを温めて。
e997|I had a ham sandwich.|ハムサンドを食べました。
e998|Bees make honey.|ハチははちみつを作ります。
e999|This pear is sweet.|この洋ナシは甘いです。
e1000|We made pumpkin soup.|カボチャのスープを作りました。
e1001|Wash the lettuce well.|レタスをよく洗ってね。
e1002|A helicopter is flying over us.|ヘリコプターが頭上を飛んでいます。
e1003|The rocket went into space.|ロケットは宇宙へ飛んでいきました。
e1004|My uncle rides a motorcycle.|おじはオートバイに乗ります。
e1005|Let's take the subway.|地下鉄に乗ろう。
e1006|We are the same age.|私たちは同い年です。
e1007|What's for dinner tonight?|今夜の夕食は何？
e1008|Today is the fourth of July.|今日は7月4日です。
e1009|My room is on the fifth floor.|私の部屋は5階です。
e1010|I am in the sixth grade.|私は6年生です。
e1011|Her birthday is May seventh.|彼女の誕生日は5月7日です。
e1012|This is my eighth trip to Tokyo.|東京へは今回で8回目です。
e1013|He came in ninth.|彼は9位でした。
e1014|Today is my tenth birthday.|今日は私の10歳の誕生日です。
e1015|Millions of people live in Tokyo.|何百万人もの人が東京に住んでいます。
e1016|Of course you can come.|もちろん来ていいよ。
e1017|Everybody likes ice cream.|みんなアイスクリームが好きです。
e1018|Nobody was at home.|家には誰もいませんでした。
e1019|He made it himself.|彼はそれを自分で作りました。
e1020|She looked at herself in the mirror.|彼女は鏡で自分の姿を見ました。
e1021|The kids cleaned the room themselves.|子どもたちは自分たちで部屋をそうじしました。
e1022|I usually get up at seven.|ふだんは7時に起きます。
e1023|Come here quickly!|早くこっちに来て！
e1024|Please speak slowly.|ゆっくり話してください。
e1025|He solved the puzzle easily.|彼はそのパズルを簡単に解きました。
e1026|Cross the street carefully.|気をつけて道をわたってね。
e1027|What a pretty dress!|なんてかわいいドレス！
e1028|What a lovely day!|なんてすてきな日でしょう！
e1029|Your drawing is amazing!|きみの絵はすごいね！
e1030|We had a fantastic time.|すばらしい時間を過ごしました。
e1031|This movie is boring.|この映画はつまらない。
e1032|These vegetables are fresh.|この野菜は新鮮です。
e1033|We saw wild monkeys.|野生のサルを見ました。
e1034|The classroom is noisy.|教室が騒がしいです。
e1035|This river is very wide.|この川はとても幅が広いです。
e1036|Don't be shy.|恥ずかしがらないで。
e1037|I want to learn a foreign language.|外国語を学びたいです。
e1038|My grandma is ill in bed.|祖母は病気で寝ています。
e1039|Can you count to ten in English?|英語で10まで数えられる？
e1040|Cover your mouth when you cough.|せきをするときは口を覆って。
e1041|I dropped my pen.|ペンを落としました。
e1042|Don't fight with your brother.|弟とけんかしないで。
e1043|Fill the glass with water.|コップを水で満たして。
e1044|Follow me, please.|私について来てください。
e1045|Let's gather around the table.|テーブルのまわりに集まろう。
e1046|The cat is hiding under the bed.|ネコがベッドの下に隠れています。
e1047|Give me a hug!|ぎゅっとして！
e1048|Cats hunt mice.|ネコはネズミを狩ります。
e1049|Please knock before you come in.|入る前にノックしてね。
e1050|Lie down on the sofa.|ソファに横になって。
e1051|Can you lift this box?|この箱を持ち上げられる？
e1052|Don't forget to lock the door.|ドアに鍵をかけるのを忘れないで。
e1053|Will you marry me?|結婚してくれますか？
e1054|The ice cream is melting.|アイスがとけているよ。
e1055|Mix the eggs and sugar.|卵と砂糖を混ぜて。
e1056|We pray for peace.|私たちは平和を祈ります。
e1057|Mom is preparing dinner.|お母さんが夕食の準備をしています。
e1058|We reached the station at noon.|私たちは正午に駅に着きました。
e1059|Let's relax at home today.|今日は家でくつろごう。
e1060|The firefighters rescued the cat.|消防士たちがネコを救助しました。
e1061|The ball rolled down the hill.|ボールが坂を転がっていきました。
e1062|I searched for my key everywhere.|鍵をあちこち探しました。
e1063|Dinner is served at six.|夕食は6時に出されます。
e1064|The sun is shining.|太陽が輝いています。
e1065|He shot the ball into the goal.|彼はボールをゴールにシュートしました。
e1066|The kids slid down the hill.|子どもたちは丘をすべりおりました。
e1067|Someone stole my bike!|誰かに自転車を盗まれた！
e1068|Watch your step.|足もとに気をつけて。
e1069|Stretch your arms up high.|腕を高く伸ばして。
e1070|I trust you.|あなたを信頼しています。
e1071|I wonder where my cat is.|うちのネコはどこにいるのかな。
e1072|Let's wrap the present.|プレゼントを包もう。
e1073|Check your answers again.|答えをもう一度確認して。
e1074|We cheered for our team.|私たちはチームを応援しました。
e1075|Take care of yourself.|お体を大切に。
e1076|Add some salt to the soup.|スープに塩を少し加えて。
e1077|I agree with you.|あなたに賛成です。
e1078|She acted in the school play.|彼女は学芸会の劇で演じました。
e1079|The wind is blowing hard.|風が強く吹いています。
e1080|The toast is burning!|トーストが焦げてる！
e1081|The dog is digging a hole.|犬が穴を掘っています。
e1082|He dived into the pool.|彼はプールに飛び込みました。
e1083|Does your dog bite?|お宅の犬はかみますか？
e1084|The cherry trees are in bloom.|桜の木が花を咲かせています。
e1085|Dad jogs every morning.|お父さんは毎朝ジョギングします。
e1086|It will rain tomorrow.|明日は雨が降るでしょう。
e1087|You must wash your hands.|手を洗わなければなりません。
e1088|You should go to bed early.|早く寝たほうがいいよ。
e1089|Would you like some tea?|お茶はいかがですか？
e1090|Let's go out and play.|外へ遊びに行こう。
e1091|Turn off the TV, please.|テレビを消してください。
e1092|The bird flew above the trees.|鳥が木々の上を飛びました。
e1093|The temperature is below zero.|気温は0度より下です。
e1094|Anything else?|ほかに何かありますか？
e1095|I want to go to Paris someday.|いつかパリに行きたいです。
e1096|Excuse me, where is the station?|すみません、駅はどこですか？
e1097|Can I help you, sir?|お客様、何かお探しですか？
e1098|What type of music do you like?|どんなタイプの音楽が好きですか？
e1099|I left a note on the table.|テーブルにメモを置いておいたよ。
e1100|I wrote a report about bees.|ハチについてのレポートを書きました。
e1101|I have a math exam tomorrow.|明日は数学の試験があります。
e1102|Exercise is good for you.|運動は体にいいです。
e1103|He won the race.|彼は競走で勝ちました。
e1104|We have a tennis match on Saturday.|土曜日にテニスの試合があります。
e1105|This is my favorite film.|これは私のお気に入りの映画です。
e1106|My brother likes watching cartoons.|弟はアニメを見るのが好きです。
e1107|I write in my diary every night.|毎晩日記を書きます。
e1108|Let's look at the photo album.|写真のアルバムを見よう。
e1109|I'm worried about the test.|テストが心配です。
e1110|This book is ten dollars.|この本は10ドルです。
e1111|It costs five hundred yen.|それは500円です。
e1112|This candy is fifty cents.|このあめは50セントです。
e1113|The pool is 25 meters long.|プールは長さ25メートルです。
e1114|I go to school on weekdays.|平日は学校に行きます。
e1115|My hometown is near the sea.|私の故郷は海の近くです。
e1116|We went sightseeing in Nara.|奈良へ観光に行きました。
e1117|I did a homestay in Canada.|カナダでホームステイをしました。
e1118|Let's watch the fireworks tonight.|今夜花火を見よう。
e1119|Let's fly a kite in the park.|公園でたこをあげよう。
e1120|My sisters are twins.|私の姉たちは双子です。
e1121|I ride my bike to school.|自転車で学校に行きます。
e1122|Let's take the elevator.|エレベーターに乗ろう。
e1123|Turn on the lamp, please.|電灯をつけてください。
e1124|Put the milk in the refrigerator.|牛乳を冷蔵庫に入れて。
e1125|Wash your hands with soap.|せっけんで手を洗って。
e1126|I need a new toothbrush.|新しい歯ブラシがほしいです。
e1127|We had pork for dinner.|夕食は豚肉でした。
e1128|She has a gold ring.|彼女は金の指輪を持っています。
e1129|He won a silver medal.|彼は銀メダルをとりました。
e1130|The school bell is ringing.|学校のベルが鳴っています。
e1131|Japan's flag is white and red.|日本の国旗は白と赤です。
e1132|This robot can dance.|このロボットは踊れます。
e1133|This machine makes coffee.|この機械はコーヒーをいれます。
e1134|My son loves dinosaurs.|息子は恐竜が大好きです。
e1135|The dragon can breathe fire.|その竜は火をはくことができます。
e1136|There's no monster under the bed.|ベッドの下に怪物なんていないよ。
e1137|Are you afraid of ghosts?|おばけはこわい？
e1138|We fed the deer in Nara.|奈良でシカにえさをあげました。
e1139|The goat is eating grass.|ヤギが草を食べています。
e1140|She plays the flute.|彼女はフルートを吹きます。
e1141|He practices the trumpet every day.|彼は毎日トランペットを練習します。
e1142|My dad ran a marathon.|父はマラソンを走りました。
e1143|Did you feed the cat?|ネコにえさをあげた？
e1144|Hang your coat here.|コートをここに掛けて。
e1145|Can you print this page?|このページを印刷してくれる？
e1146|Copy the words in your notebook.|ノートに単語を写しなさい。
e1147|I hate waking up early.|早起きは大嫌いです。
e1148|She kissed her baby.|彼女は赤ちゃんにキスしました。
e1149|The ship sailed across the sea.|船は海をわたって航海しました。
e1150|Could you help me?|手伝ってもらえますか？
e1151|This is the most beautiful flower.|これは最も美しい花です。
e1152|I looked everywhere for my glasses.|めがねをあちこち探しました。
e1153|Let's go somewhere warm.|どこか暖かい所へ行こう。
e1154|You can sit anywhere.|どこに座ってもいいですよ。
e1155|Put a mark next to your name.|名前の横にしるしをつけて。
e1156|She sang on the stage.|彼女は舞台で歌いました。
e1157|The coin is at the bottom of the pool.|コインはプールの底にあります。
e1158|I'm a beginner at skiing.|スキーは初心者です。
e1159|It's cold. Get a blanket.|寒いね。毛布を持ってきて。
e1160|I like a soft pillow.|やわらかいまくらが好きです。
e1161|The kids are playing in the schoolyard.|子どもたちが校庭で遊んでいます。
e1162|I had grilled salmon for lunch.|昼ごはんに焼き鮭を食べました。
e1163|I love fried shrimp.|エビフライが大好きです。
e1164|We found a crab on the beach.|浜辺でカニを見つけました。
e1165|The bird has broken wings.|その鳥は翼をけがしています。
e1166|The dog is wagging its tail.|犬がしっぽをふっています。
e1167|These cherries are sweet.|このサクランボは甘いです。
e1168|Let's eat watermelon on the porch.|縁側でスイカを食べよう。
e1169|I like pineapple juice.|パイナップルジュースが好きです。
e1170|Can I have some pudding?|プリンを食べてもいい？
e1171|Cut the cabbage into small pieces.|キャベツを細かく切って。
e1172|I don't like mushrooms.|キノコが苦手です。
e1173|Put cucumber in the salad.|サラダにキュウリを入れて。
e1174|I had sausages for breakfast.|朝食にソーセージを食べました。
e1175|Let's play table tennis.|卓球をしよう。
e1176|I play badminton after school.|放課後にバドミントンをします。
e1177|My dad is my hero.|父は私のヒーローです。
e1178|Let's make a snowman!|雪だるまを作ろう！
e1179|Can I borrow your scissors?|はさみを借りてもいい？
e1180|Write it on the calendar.|カレンダーに書いておいて。
e1181|We visited Himeji Castle.|姫路城を訪れました。
e1182|There is an old church in the town.|町に古い教会があります。
e1183|The stadium was full of fans.|競技場はファンでいっぱいでした。
e1184|Let's go to the aquarium.|水族館に行こう。
e1185|I buy bread at the bakery.|パン屋でパンを買います。
e1186|The cat is sleeping on the sofa.|ネコがソファーで寝ています。
e1187|Here's a clean towel.|はい、きれいなタオルです。
e1188|My sister plays the violin.|姉はバイオリンをひきます。
e1189|He plays the drums in a band.|彼はバンドでドラムをたたいています。
e1190|A whale is not a fish.|クジラは魚ではありません。
e1191|The giraffe has a long neck.|キリンは首が長いです。
e1192|Owls sleep during the day.|フクロウは昼間眠ります。
e1193|The turtle walks slowly.|カメはゆっくり歩きます。
e1194|There's a spider on the wall!|壁にクモがいる！
e1195|Ants are carrying sugar.|アリが砂糖を運んでいます。
e1196|Look, there's a rainbow!|見て、虹が出てるよ！
e1197|I want to be an astronaut.|宇宙飛行士になりたいです。
e1198|Firefighters are very brave.|消防士はとても勇敢です。
e1199|She is a great dancer.|彼女はすばらしいダンサーです。
e1200|We took our dog to the vet.|犬を獣医に連れて行きました。
e1201|I read a book while I waited.|待っている間に本を読みました。
e1202|Though it was raining, we went out.|雨が降っていたけれど、私たちは出かけた。
e1203|It was cold. However, we went swimming.|寒かった。しかし、私たちは泳ぎに行った。
e1204|I have known her since I was five.|私は5歳のときから彼女を知っています。
e1205|Many people are against the plan.|多くの人がその計画に反対している。
e1206|This song is popular among children.|この歌は子どもたちの間で人気がある。
e1207|The dog ran toward me.|犬が私の方へ走ってきた。
e1208|You can take either one.|どちらか一つを取っていいよ。
e1209|Neither of them came.|彼らのどちらも来なかった。
e1210|I have never seen such a big fish.|そんなに大きな魚は見たことがない。
e1211|I have several friends in Canada.|カナダに何人か友だちがいます。
e1212|It might rain tomorrow.|明日は雨が降るかもしれない。
e1213|Shall I open the window?|窓を開けましょうか？
e1214|Perhaps he is busy today.|おそらく彼は今日忙しいのだろう。
e1215|This book is quite interesting.|この本はかなりおもしろい。
e1216|Let's have tea instead.|代わりにお茶にしよう。
e1217|Anyway, let's start the meeting.|とにかく、会議を始めよう。
e1218|Look straight ahead when you walk.|歩くときはまっすぐ前を見て。
e1219|I want to study abroad.|私は外国で勉強したい。
e1220|Please take one step forward.|一歩前へ出てください。
e1221|We will be friends forever.|私たちはずっと友だちだよ。
e1222|None of us knew the answer.|私たちの誰も答えを知らなかった。
e1223|The cat is cleaning itself.|ねこが自分の体をきれいにしている。
e1224|We made it ourselves.|私たちはそれを自分たちで作った。
e1225|We help each other.|私たちはお互いに助け合う。
e1226|Suddenly, the lights went out.|突然、電気が消えた。
e1227|We finally arrived at the hotel.|私たちはついにホテルに着いた。
e1228|Actually, I don't like coffee.|実は、コーヒーが好きではないんです。
e1229|I like fruit, especially apples.|果物が好きで、特にりんごが好きです。
e1230|He will probably come.|彼はたぶん来るでしょう。
e1231|It is certainly hot today.|今日は確かに暑い。
e1232|I recently started piano lessons.|最近ピアノのレッスンを始めました。
e1233|Please speak more clearly.|もっとはっきり話してください。
e1234|The baby is sleeping, so talk quietly.|赤ちゃんが寝ているので静かに話して。
e1235|Luckily, nobody was hurt.|幸運にも、誰もけがをしなかった。
e1236|My uncle works overseas.|おじは海外で働いている。
e1237|My room is upstairs.|私の部屋は上の階にあります。
e1238|Come downstairs for dinner.|夕ごはんだから下におりてきて。
e1239|Is there a bank nearby?|近くに銀行はありますか？
e1240|I don't play that game anymore.|もうそのゲームはしていない。
e1241|You seem tired today.|今日は疲れているように見えるね。
e1242|Dogs are not allowed in this park.|この公園に犬は入れません。
e1243|A rainbow appeared in the sky.|空に虹が現れた。
e1244|Can you explain this word?|この単語を説明してくれますか？
e1245|Don't be afraid to fail.|失敗を恐れないで。
e1246|We must protect the forest.|私たちは森を守らなければならない。
e1247|Please remove your shoes here.|ここでくつを脱いでください。
e1248|Let's continue the game.|ゲームを続けよう。
e1249|She likes to create new songs.|彼女は新しい歌を作るのが好きだ。
e1250|They developed a new game.|彼らは新しいゲームを開発した。
e1251|He discovered a new star.|彼は新しい星を発見した。
e1252|The sun disappeared behind the clouds.|太陽が雲の後ろに消えた。
e1253|My parents always encourage me.|両親はいつも私を励ましてくれる。
e1254|It is hard to express my feelings.|気持ちを表現するのは難しい。
e1255|Imagine a world without music.|音楽のない世界を想像してみて。
e1256|I want to improve my English.|英語を上達させたい。
e1257|The price includes breakfast.|その料金には朝食が含まれています。
e1258|Who invented the telephone?|誰が電話を発明したのですか？
e1259|Did you notice my new haircut?|私の新しい髪型に気づいた？
e1260|This farm produces milk.|この農場は牛乳を生産している。
e1261|Raise your hand if you know.|わかったら手を上げて。
e1262|I realized I was wrong.|自分が間違っていると気づいた。
e1263|We recycle bottles and cans.|私たちはびんと缶をリサイクルしている。
e1264|We should reduce waste.|私たちはごみを減らすべきだ。
e1265|You can reuse this bag.|このバッグは再利用できます。
e1266|I respect my grandfather.|私は祖父を尊敬している。
e1267|The news spread quickly.|そのニュースはすぐに広まった。
e1268|I hope you succeed.|あなたが成功することを願っています。
e1269|We communicate by email.|私たちはメールで連絡を取り合っている。
e1270|Connect the cable to the TV.|ケーブルをテレビにつないで。
e1271|Please contact me by phone.|電話で私に連絡してください。
e1272|The storm caused a lot of damage.|嵐は大きな被害を引き起こした。
e1273|Let's celebrate your birthday!|あなたの誕生日をお祝いしよう！
e1274|I completed the puzzle.|パズルを完成させた。
e1275|You need to control your anger.|怒りを抑える必要がある。
e1276|How much does this bag cost?|このかばんはいくらですか？
e1277|They deliver pizza until midnight.|その店は真夜中までピザを配達してくれる。
e1278|Can you describe the man?|その男の人の様子を説明できますか？
e1279|The fire destroyed the old house.|火事がその古い家を破壊した。
e1280|He earns money by delivering newspapers.|彼は新聞配達でお金を稼いでいる。
e1281|It was a great experience.|それはすばらしい経験だった。
e1282|The number of tourists increased.|観光客の数が増えた。
e1283|This road leads to the station.|この道は駅に通じている。
e1284|Let's measure the table.|テーブルの大きさを測ろう。
e1285|I don't mind the rain.|雨は気にしないよ。
e1286|She offered to help me.|彼女は私を手伝おうと申し出てくれた。
e1287|The band performed at the festival.|そのバンドはお祭りで演奏した。
e1288|Factories pollute the river.|工場が川を汚染している。
e1289|I prefer tea to coffee.|コーヒーより紅茶のほうが好きです。
e1290|I promise to come back.|戻ってくると約束するよ。
e1291|She set a new school record.|彼女は学校の新記録を出した。
e1292|Please reply to my email.|私のメールに返事をください。
e1293|The sun rises in the east.|太陽は東から昇る。
e1294|Let's surprise Mom with a cake.|ケーキでお母さんを驚かせよう。
e1295|Can you translate this into English?|これを英語に訳してくれますか？
e1296|Adults can vote in elections.|大人は選挙で投票できる。
e1297|Please don't waste water.|水を無駄にしないでください。
e1298|She accepted my invitation.|彼女は私の招待を受けてくれた。
e1299|I apologize for being late.|遅れてすみません。
e1300|I attend a piano class on Fridays.|金曜日にピアノ教室に通っています。
e1301|This book belongs to my sister.|この本は姉のものです。
e1302|Breathe slowly and relax.|ゆっくり呼吸してリラックスして。
e1303|We chatted over lunch.|私たちは昼ごはんを食べながらおしゃべりした。
e1304|Your answer is correct.|あなたの答えは正しいです。
e1305|It depends on the weather.|それは天気次第です。
e1306|I like the design of this shirt.|このシャツのデザインが好きです。
e1307|We donated old clothes.|私たちは古着を寄付した。
e1308|I downloaded a new app.|新しいアプリをダウンロードした。
e1309|The bird escaped from its cage.|鳥がかごから逃げた。
e1310|Can I exchange this shirt?|このシャツを交換できますか？
e1311|I didn't expect so many people.|こんなに多くの人が来るとは思わなかった。
e1312|Leaves are floating on the water.|葉っぱが水に浮かんでいる。
e1313|Please forgive me for being rude.|失礼なことをしてごめんなさい、許してください。
e1314|My brother will graduate next March.|兄は来年の3月に卒業します。
e1315|I have a job interview tomorrow.|明日、仕事の面接があります。
e1316|What's the matter with you?|どうしたの？
e1317|I memorized ten new words.|新しい単語を10個暗記した。
e1318|Can you pour me some milk?|牛乳を注いでくれる？
e1319|Dad repaired my bike.|お父さんが自転車を修理してくれた。
e1320|We rented a car in Hawaii.|ハワイで車を借りました。
e1321|She greeted us with a smile.|彼女は笑顔で私たちにあいさつした。
e1322|Please fold your clothes.|服をたたんでください。
e1323|The lake froze last night.|昨夜、湖が凍った。
e1324|The river flows into the sea.|その川は海へ流れ込む。
e1325|I dislike cold weather.|私は寒い天気が嫌いだ。
e1326|Is that a fact?|それは事実ですか？
e1327|Tell me the reason.|理由を教えて。
e1328|I was happy with the result.|その結果に満足した。
e1329|This is a good chance to practice.|これは練習するいい機会だ。
e1330|I need more information.|もっと情報が必要です。
e1331|I am interested in Japanese culture.|私は日本の文化に興味があります。
e1332|This festival is an old tradition.|このお祭りは古い伝統です。
e1333|Music has the power to make people happy.|音楽には人を幸せにする力がある。
e1334|Kids have so much energy.|子どもはとても元気だ。
e1335|I have good memories of that trip.|その旅行にはいい思い出がある。
e1336|His death was a great shock.|彼の死は大きなショックだった。
e1337|Our friendship is important to me.|私たちの友情は私にとって大切です。
e1338|Thank you for your kindness.|ご親切にありがとうございます。
e1339|We must protect the environment.|私たちは環境を守らなければならない。
e1340|Air pollution is a big problem.|大気汚染は大きな問題だ。
e1341|Please take out the garbage.|ごみを出してください。
e1342|Don't throw trash on the street.|道にごみを捨てないで。
e1343|This bottle is made of plastic.|このボトルはプラスチックでできている。
e1344|Technology changes our lives.|科学技術は私たちの生活を変える。
e1345|Check our website for details.|詳しくは私たちのウェブサイトを見てください。
e1346|This TV program is funny.|このテレビ番組はおもしろい。
e1347|Our class started a new project.|私たちのクラスは新しい計画を始めた。
e1348|I gave a presentation in English.|私は英語で発表をした。
e1349|She is reading a long novel.|彼女は長い小説を読んでいる。
e1350|He wrote a poem about the sea.|彼は海についての詩を書いた。
e1351|Who is your favorite character?|好きな登場人物は誰？
e1352|I love the last scene of the movie.|その映画の最後の場面が大好きです。
e1353|Your effort will pay off.|あなたの努力は報われるよ。
e1354|The party was a big success.|パーティーは大成功だった。
e1355|Cooking is a useful skill.|料理は役に立つ技能だ。
e1356|She has the ability to speak three languages.|彼女は3か国語を話す能力がある。
e1357|My sister goes to college.|姉は大学に通っている。
e1358|He studies science at university.|彼は大学で科学を勉強している。
e1359|Humans need water to live.|人間は生きるために水が必要だ。
e1360|My cousin is a teenager.|いとこは十代です。
e1361|The president gave a speech.|大統領が演説をした。
e1362|We work as volunteers at the park.|私たちは公園でボランティアとして活動している。
e1363|Who is the owner of this bike?|この自転車の持ち主は誰ですか？
e1364|My aunt is an engineer.|おばは技術者です。
e1365|She wants to be a fashion designer.|彼女はファッションデザイナーになりたい。
e1366|The soldier came home safely.|その兵士は無事に家に帰ってきた。
e1367|The hotel staff were very kind.|ホテルの職員はとても親切だった。
e1368|The shop has many customers.|その店にはたくさんの客がいる。
e1369|All passengers must wear seat belts.|乗客は全員シートベルトをしなければならない。
e1370|The audience clapped loudly.|観客は大きな拍手をした。
e1371|Ask the librarian for help.|図書館員に手伝ってもらおう。
e1372|The reporter asked many questions.|記者はたくさんの質問をした。
e1373|She is a great athlete.|彼女はすばらしい運動選手だ。
e1374|He became the tennis champion.|彼はテニスの優勝者になった。
e1375|The winner gets a prize.|勝った人は賞品がもらえる。
e1376|The chef made a special dish.|シェフが特別な料理を作った。
e1377|The principal spoke at the ceremony.|式で校長先生が話をした。
e1378|Don't talk to strangers.|知らない人と話してはいけません。
e1379|The hero beat the enemy.|ヒーローは敵を倒した。
e1380|The population of this city is growing.|この市の人口は増えている。
e1381|Japan is an island nation.|日本は島国です。
e1382|Tokyo is the capital of Japan.|東京は日本の首都です。
e1383|Texas is a big state.|テキサスは大きな州です。
e1384|A river runs through the valley.|谷を川が流れている。
e1385|We drove along the coast.|私たちは海岸沿いをドライブした。
e1386|Camels live in the desert.|ラクダは砂漠に住んでいる。
e1387|Mars is a red planet.|火星は赤い惑星だ。
e1388|Plants need sunlight to grow.|植物が育つには日光が必要だ。
e1389|We got up early to see the sunrise.|日の出を見るために早く起きた。
e1390|The sunset was beautiful.|夕日がきれいだった。
e1391|My shadow is long in the evening.|夕方は私の影が長い。
e1392|The temperature is 30 degrees today.|今日の気温は30度です。
e1393|It is ten degrees outside.|外は10度です。
e1394|The thunder scared my dog.|雷の音で犬がこわがった。
e1395|Lightning hit the tall tree.|稲妻が高い木に落ちた。
e1396|We had a small earthquake last night.|昨夜、小さな地震があった。
e1397|There was a car accident near the school.|学校の近くで車の事故があった。
e1398|The sign says "Danger."|その標識には「危険」と書いてある。
e1399|I can see smoke from the chimney.|煙突から煙が見える。
e1400|The traffic is heavy today.|今日は交通量が多い。
e1401|My mother has a driver's license.|母は運転免許を持っている。
e1402|Don't forget your passport.|パスポートを忘れないで。
e1403|Our flight leaves at nine.|私たちの便は9時に出発する。
e1404|I love adventure stories.|冒険の話が大好きです。
e1405|The ship arrived at the port.|船が港に着いた。
e1406|Which direction is the station?|駅はどの方向ですか？
e1407|The distance to the park is two kilometers.|公園までの距離は2キロです。
e1408|Can you play an instrument?|何か楽器を演奏できますか？
e1409|The opening ceremony starts at ten.|開会式は10時に始まる。
e1410|We went to my cousin's wedding.|いとこの結婚式に行った。
e1411|Our graduation is in March.|私たちの卒業は3月です。
e1412|She is interested in fashion.|彼女はファッションに興味がある。
e1413|I like your hair style.|あなたの髪型、すてきだね。
e1414|This shop sells local products.|この店は地元の製品を売っている。
e1415|Can I pay in cash?|現金で払えますか？
e1416|My father went to Osaka on business.|父は仕事で大阪へ行った。
e1417|A hammer is a useful tool.|かなづちは便利な道具だ。
e1418|The car's engine is very quiet.|その車のエンジンはとても静かだ。
e1419|We should save electricity.|私たちは電気を節約するべきだ。
e1420|We cook with gas.|私たちはガスで料理する。
e1421|This tree has deep roots.|この木は深く根を張っている。
e1422|A bird is sitting on the branch.|鳥が枝にとまっている。
e1423|This is my grandma's recipe.|これはおばあちゃんのレシピです。
e1424|Washing hands can stop disease.|手を洗うと病気を防げる。
e1425|I have a pain in my back.|背中が痛い。
e1426|The nurse checked my blood.|看護師さんが私の血液を調べた。
e1427|The dog is eating a bone.|犬が骨を食べている。
e1428|Babies have soft skin.|赤ちゃんの肌はやわらかい。
e1429|Reading is good for your brain.|読書は脳にいい。
e1430|I have a sore throat.|のどが痛い。
e1431|Don't burn your tongue.|舌をやけどしないでね。
e1432|I feel pain in my chest.|胸が痛い。
e1433|I have a bad cough.|ひどいせきが出る。
e1434|The doctor is talking to a patient.|医者が患者と話している。
e1435|Reading every day is a good habit.|毎日本を読むのはいい習慣だ。
e1436|Bowing is a Japanese custom.|おじぎは日本の習慣だ。
e1437|Table manners are important.|食事の行儀は大切です。
e1438|Actions speak louder than words.|行動は言葉よりも雄弁だ。
e1439|I had trouble finding the house.|その家を見つけるのに苦労した。
e1440|Don't worry, everyone makes mistakes.|心配しないで、誰でも間違いはするよ。
e1441|This game has ten levels.|このゲームには10のレベルがある。
e1442|What is the weight of this box?|この箱の重さはどれくらい？
e1443|There is a nice park in my neighborhood.|近所にすてきな公園がある。
e1444|Let's go shopping downtown.|繁華街に買い物に行こう。
e1445|My grandparents live in the countryside.|祖父母は田舎に住んでいる。
e1446|Thank you for your advice.|アドバイスをありがとう。
e1447|This temple is five centuries old.|このお寺は500年前のものです。
e1448|I woke up at midnight.|真夜中に目が覚めた。
e1449|I like geography class.|地理の授業が好きです。
e1450|He is always polite to everyone.|彼はいつも誰にでも礼儀正しい。
e1451|It is rude to talk with your mouth full.|口にものを入れたまま話すのは失礼だ。
e1452|Please be honest with me.|私には正直に話して。
e1453|Is the problem serious?|その問題は深刻なの？
e1454|She has a cheerful smile.|彼女は明るい笑顔をしている。
e1455|The clever fox found a way out.|賢いキツネは出口を見つけた。
e1456|This is an international school.|ここはインターナショナルスクールです。
e1457|We buy vegetables from local farms.|私たちは地元の農家から野菜を買う。
e1458|Today is a national holiday.|今日は国民の祝日だ。
e1459|We ate traditional Japanese food.|私たちは伝統的な日本料理を食べた。
e1460|I live in a modern apartment.|私は近代的なアパートに住んでいる。
e1461|This juice is made from natural fruit.|このジュースは天然の果物から作られている。
e1462|Please be quiet in public places.|公共の場では静かにしてください。
e1463|Is it possible to change the date?|日にちを変えることは可能ですか？
e1464|It is impossible to finish today.|今日終わらせるのは不可能だ。
e1465|Water is necessary for life.|水は生きるために必要だ。
e1466|Your speech was excellent.|あなたのスピーチはすばらしかった。
e1467|The ugly duckling became a swan.|みにくいアヒルの子は白鳥になった。
e1468|The dinosaur was huge.|その恐竜は巨大だった。
e1469|Look at this tiny insect.|このちっちゃな虫を見て。
e1470|This road is too narrow for cars.|この道は車には狭すぎる。
e1471|I am proud of my team.|私は自分のチームを誇りに思う。
e1472|She was upset about the news.|彼女はその知らせに動揺していた。
e1473|I am pleased to meet you.|お会いできてうれしいです。
e1474|Is this sentence true or false?|この文は正しいですか、間違っていますか？
e1475|What is the main idea of this story?|この話の主な考えは何ですか？
e1476|Exercise is part of my daily life.|運動は私の毎日の生活の一部だ。
e1477|We have a common interest in music.|私たちには音楽という共通の趣味がある。
e1478|Thank you, that was very helpful.|ありがとう、とても助かりました。
e1479|This is a powerful machine.|これは強力な機械だ。
e1480|Her new shop is very successful.|彼女の新しい店はとても成功している。
e1481|There was a sudden change in the weather.|天気が急に変わった。
e1482|My grandmother is a wise woman.|祖母は賢い人だ。
e1483|The fish is still alive.|その魚はまだ生きている。
e1484|The baby is asleep.|赤ちゃんは眠っている。
e1485|Ken is absent from school today.|ケンは今日学校を休んでいる。
e1486|This sofa is very comfortable.|このソファーはとても座り心地がいい。
e1487|Is Sunday convenient for you?|日曜日は都合がいいですか？
e1488|The train was very crowded.|電車はとても混んでいた。
e1489|I feel lazy on Sunday mornings.|日曜の朝はだらだらしてしまう。
e1490|It is a peaceful town.|そこは平和な町だ。
e1491|That movie was really scary.|あの映画は本当に怖かった。
e1492|Our coach is very strict.|私たちのコーチはとても厳しい。
e1493|This old phone is useless.|この古い電話は役に立たない。
e1494|Her native language is Spanish.|彼女の母語はスペイン語だ。
e1495|Let's meet at the usual place.|いつもの場所で会おう。
e1496|The flowers are dead.|花が枯れている。
e1497|We have an electric car.|うちには電気自動車がある。
e1498|To whom did you send the letter?|あなたは誰に手紙を送ったのですか？
e1499|We live in a busy society.|私たちは忙しい社会に生きている。
e1500|Our community has a summer festival.|私たちの地域には夏祭りがある。
e1501|The government made a new law.|政府は新しい法律を作った。
e1502|What is your opinion?|あなたの意見は何ですか？
e1503|Can you see the difference?|違いがわかりますか？
e1504|You made a good choice.|いい選択をしたね。
e1505|I am taking an English course.|英語の講座を受けています。
e1506|In that case, let's stay home.|その場合は、家にいよう。
e1507|What is the meaning of this word?|この単語の意味は何ですか？
e1508|I understand your feelings.|あなたの気持ちはわかるよ。
e1509|She has a fear of the dark.|彼女は暗闇が怖い。
e1510|Birds fly in the sky with freedom.|鳥は空を自由に飛ぶ。
e1511|Please tell me the truth.|本当のことを言ってください。
e1512|That's a good thought.|それはいい考えだね。
e1513|I have a strong interest in space.|私は宇宙に強い興味がある。
e1514|Dogs have a good sense of smell.|犬は鼻がよくきく。
e1515|My grandfather has poor sight.|祖父は視力が弱い。
e1516|The view from the top is amazing.|頂上からの眺めはすばらしい。
e1517|She played the main role in the play.|彼女はその劇で主役を演じた。
e1518|Safety is the most important thing.|安全がいちばん大切だ。
e1519|The service at this hotel is good.|このホテルのサービスはいい。
e1520|My schedule is full this week.|今週は予定がいっぱいです。
e1521|What is the title of the book?|その本の題名は何ですか？
e1522|Let's change the topic.|話題を変えよう。
e1523|He built a model of a ship.|彼は船の模型を作った。
e1524|A young couple lives next door.|隣に若い夫婦が住んでいる。
e1525|There was a big crowd at the station.|駅には大勢の人がいた。
e1526|I bought five items at the store.|その店で5品買った。
e1527|This is a nice spot for a picnic.|ここはピクニックにいい場所だ。
e1528|Follow this path to the lake.|この小道を進むと湖に出ます。
e1529|We climbed the tower.|私たちはその塔にのぼった。
e1530|There is a statue in the park.|公園に像がある。
e1531|The dove is a symbol of peace.|ハトは平和の象徴だ。
e1532|The phone is a great invention.|電話はすばらしい発明だ。
e1533|We enjoyed the beauty of the mountains.|私たちは山の美しさを楽しんだ。
e1534|My father has a good sense of humor.|父はユーモアのセンスがある。
e1535|Take a deep breath.|深呼吸して。
e1536|She made a gesture to come in.|彼女は入ってとしぐさで合図した。
e1537|Teamwork is important in soccer.|サッカーではチームワークが大切だ。
e1538|These shoes are on sale.|このくつはセール中です。
e1539|Can I have the bill, please?|お会計をお願いします。
e1540|Look at the board.|黒板を見てください。
e1541|Please take a sheet of paper.|紙を1枚取ってください。
e1542|There is a hole in my sock.|靴下に穴があいている。
e1543|A bike has two wheels.|自転車には車輪が2つある。
e1544|My grandma uses a wheelchair.|祖母は車いすを使っている。
e1545|Did we get any mail today?|今日は郵便が来た？
e1546|I want to talk to the manager.|店長と話したいのですが。
e1547|My boss is very kind.|私の上司はとても親切だ。
e1548|Let's meet at the entrance.|入口で会おう。
e1549|Where is the exit?|出口はどこですか？
e1550|We visited an art gallery.|私たちは美術館を訪れた。
e1551|My little brother goes to kindergarten.|弟は幼稚園に通っている。
e1552|The king lives in a palace.|王様は宮殿に住んでいる。
e1553|They recorded the song in a studio.|彼らはその歌をスタジオで録音した。
e1554|The train went through a long tunnel.|電車は長いトンネルを通った。
e1555|We drove on the highway.|私たちは幹線道路を車で走った。
e1556|The library is two blocks away.|図書館は2ブロック先です。
e1557|The waterfall is very high.|その滝はとても高い。
e1558|Mt. Fuji is a volcano.|富士山は火山だ。
e1559|Bats live in the cave.|その洞窟にはコウモリが住んでいる。
e1560|Tigers live in the jungle.|トラはジャングルに住んでいる。
e1561|Let's enjoy the sunshine.|日差しを楽しもう。
e1562|The old bomb was found in the field.|畑で古い爆弾が見つかった。
e1563|Can I have a straw?|ストローをもらえますか？
e1564|Try to avoid sweets before dinner.|夕食前に甘いものは避けるようにしよう。
e1565|The dog attacked the cat.|その犬はねこを襲った。
e1566|Japanese people bow when they greet.|日本人はあいさつのときにおじぎをする。
e1567|The cat chased a mouse.|ねこがネズミを追いかけた。
e1568|Everyone clapped their hands.|みんなが手をたたいた。
e1569|Don't compare yourself with others.|自分を他人と比べないで。
e1570|The car crashed into a wall.|車が壁に衝突した。
e1571|Let's decorate the Christmas tree.|クリスマスツリーを飾ろう。
e1572|We discussed the plan.|私たちはその計画について話し合った。
e1573|Let's divide the cake into four.|ケーキを4つに分けよう。
e1574|Let's explore the forest.|森を探検しよう。
e1575|These shoes fit me well.|このくつは私にぴったり合う。
e1576|He nodded and smiled.|彼はうなずいてほほえんだ。
e1577|Did you pack your bag?|かばんの荷造りはした？
e1578|Press the red button.|赤いボタンを押して。
e1579|We rushed to the station.|私たちは急いで駅へ行った。
e1580|She screamed when she saw the spider.|彼女はクモを見て悲鳴を上げた。
e1581|The boat began to sink.|ボートが沈み始めた。
e1582|Be careful not to slip on the ice.|氷ですべらないように気をつけて。
e1583|My family always supports me.|家族はいつも私を支えてくれる。
e1584|Please sweep the floor.|床を掃いてください。
e1585|Don't tear the paper.|紙を破らないで。
e1586|How much do you weigh?|体重はどれくらいですか？
e1587|She whispered in my ear.|彼女は私の耳元でささやいた。
e1588|The game was canceled because of rain.|試合は雨で中止になった。
e1589|Shut the door, please.|ドアを閉めてください。
e1590|Please don't skip breakfast.|朝ごはんを抜かないでね。
e1591|Bend your knees a little.|ひざを少し曲げて。
e1592|Mom fried some chicken.|お母さんがとり肉を揚げた。
e1593|Put the book on the shelf.|本を棚に置いて。
e1594|The cat jumped over the fence.|ねこが塀を飛び越えた。
e1595|Hold on to the rope.|ロープにつかまって。
e1596|I lost a button from my coat.|コートのボタンが1つとれてなくなった。
e1597|My suitcase is too heavy.|私のスーツケースは重すぎる。
e1598|Don't look at the screen too long.|画面を長く見すぎないで。
e1599|Blow out the candles on your cake.|ケーキのろうそくを吹き消して。
e1600|Put the letter in the envelope.|手紙を封筒に入れて。
e1601|Wear a mask when you have a cold.|かぜのときはマスクをしてね。
e1602|He caught a butterfly with a net.|彼は網でチョウをつかまえた。
e1603|We slept in a tent.|私たちはテントで寝た。
e1604|Put the flowers in the vase.|花を花びんに入れて。
e1605|I love seafood pasta.|シーフードパスタが大好きです。
e1606|Squirrels like to eat nuts.|リスは木の実を食べるのが好きだ。
e1607|This soup has a lot of garlic.|このスープにはニンニクがたくさん入っている。
e1608|I don't like eggplant.|ナスは好きではない。
e1609|Do you want cream in your coffee?|コーヒーにクリームを入れますか？
e1610|I eat toast for breakfast.|朝ごはんにトーストを食べる。
e1611|A camel can walk for days without water.|ラクダは水なしで何日も歩ける。
e1612|An eagle flew over the mountain.|ワシが山の上を飛んでいった。
e1613|A crow is sitting on the roof.|カラスが屋根にとまっている。
e1614|The wolf howled at the moon.|オオカミが月に向かってほえた。
e1615|A squirrel ran up the tree.|リスが木をかけ上がった。
e1616|The kitten is playing with a ball.|子ねこがボールで遊んでいる。
e1617|A mosquito bit my arm.|蚊に腕を刺された。
e1618|An octopus has eight arms.|タコには8本の腕がある。
e1619|He is a handsome young man.|彼はハンサムな青年だ。
e1620|I'll have a medium size, please.|Mサイズをください。
e1621|It was just a normal day.|それはただの普通の日だった。
e1622|That was a silly mistake.|それはばかげた間違いだった。
e1623|I am thankful for my friends.|友だちに感謝している。
e1624|Why do you look so unhappy?|どうしてそんなに悲しそうなの？
e1625|I was unlucky today.|今日はついていなかった。
e1626|We have a wooden table.|うちには木のテーブルがある。
e1627|I made a careless mistake.|うっかりミスをしてしまった。
e1628|It was foolish of me to say that.|あんなことを言うなんて私は愚かだった。
e1629|She has golden hair.|彼女は金色の髪をしている。
e1630|I love Mom's homemade cookies.|お母さんの手作りクッキーが大好き。
e1631|We enjoy outdoor sports.|私たちは屋外スポーツを楽しむ。
e1632|Can you play a musical instrument?|楽器を演奏できますか？
e1633|I took an online class.|オンラインの授業を受けた。
e1634|The news was surprising.|そのニュースは驚くべきものだった。
e1635|I was unable to sleep last night.|昨夜は眠れなかった。
e1636|They live in western Japan.|彼らは西日本に住んでいる。
e1637|The sun rises in the eastern sky.|太陽は東の空に昇る。
e1638|The world has about eight billion people.|世界には約80億人がいる。
e1639|I bought a dozen eggs.|卵を1ダース買った。
e1640|It's a quarter past three.|3時15分です。
e1641|The station is one kilometer away.|駅は1キロ先です。
e1642|This bag weighs five kilograms.|このかばんは5キロある。
e1643|This pencil is fifteen centimeters long.|この鉛筆は長さ15センチだ。
e1644|Add 100 grams of sugar.|砂糖を100グラム加えて。
e1645|You can speak freely here.|ここでは自由に話していいよ。
e1646|Hold the baby gently.|赤ちゃんを優しく抱いて。
e1647|They lived happily ever after.|彼らはその後ずっと幸せに暮らした。
e1648|The dog barked loudly.|犬が大きな声でほえた。
e1649|She sang the song perfectly.|彼女はその歌を完璧に歌った。
e1650|We arrived home safely.|私たちは無事に家に着いた。
e1651|The boy looked at me sadly.|少年は悲しそうに私を見た。
e1652|Please listen to me seriously.|真剣に聞いてください。
e1653|She spoke softly to the baby.|彼女は赤ちゃんに静かに話しかけた。
e1654|I strongly agree with you.|あなたに強く賛成します。
e1655|Surely you remember me!|きっと私のことを覚えているでしょう！
e1656|I am truly sorry.|本当にごめんなさい。
e1657|The old man kindly showed us the way.|おじいさんは親切に道を教えてくれた。
e1658|He was badly hurt.|彼はひどいけがをした。
e1659|Learning a new language is a challenge.|新しい言語を学ぶのは挑戦だ。
e1660|Money can't buy happiness.|お金で幸せは買えない。
e1661|She cried with joy.|彼女はうれし泣きした。
e1662|It takes courage to say sorry.|謝るのには勇気がいる。
e1663|What sort of music do you like?|どんな種類の音楽が好き？
e1664|I'm a bit tired.|少し疲れた。
e1665|The pirates found the treasure.|海賊たちは宝物を見つけた。
e1666|The police caught the thief.|警察が泥棒を捕まえた。
e1667|Our team beat them 3 to 1.|私たちのチームは3対1で彼らに勝った。
e1668|Click this button to start.|始めるにはこのボタンをクリックして。
e1669|I disagree with you.|私はあなたと意見が違います。
e1670|She posted a photo online.|彼女はネットに写真を投稿した。
e1671|Don't scare me like that!|そんなふうに驚かせないでよ！
e1672|The news was a big shock.|そのニュースは大きな衝撃だった。
e1673|I uploaded the video.|その動画をアップロードした。
e1674|I was embarrassed when I fell down.|転んで恥ずかしかった。
e1675|I was disappointed with the result.|私はその結果にがっかりした。
e1676|I was impressed by her speech.|私は彼女のスピーチに感動した。
e1677|We were shocked to hear the news.|私たちはその知らせを聞いてショックを受けた。
e1678|The garden is full of colorful flowers.|庭は色とりどりの花でいっぱいだ。
e1679|My grandpa is fond of fishing.|おじいちゃんは釣りが好きだ。
e1680|My sister is in elementary school.|妹は小学生です。
e1681|I bought a drink at the convenience store.|コンビニで飲み物を買った。
e1682|Japan has many vending machines.|日本には自動販売機がたくさんある。
e1683|Global warming is a serious problem.|地球温暖化は深刻な問題だ。
e1684|She can talk in sign language.|彼女は手話で話せる。
e1685|We collected shells on the beach.|私たちは浜辺で貝殻を集めた。
e1686|Fish swim in the stream.|小川で魚が泳いでいる。
e1687|The cherry blossoms are beautiful.|桜の花がきれいだ。
e1688|My brother caught a big beetle.|弟は大きなカブトムシをつかまえた。
e1689|We saw fireflies by the river.|私たちは川のそばでホタルを見た。
e1690|A dragonfly landed on my finger.|トンボが私の指にとまった。
e1691|The hen laid an egg.|めんどりが卵を産んだ。
e1692|Swans are swimming on the lake.|白鳥が湖を泳いでいる。
e1693|Our parrot can say "hello."|うちのオウムは「ハロー」と言える。
e1694|The child let go of the balloon.|子どもが風船を放してしまった。
e1695|She tied her hair with a ribbon.|彼女はリボンで髪を結んだ。
e1696|This necklace was a gift from my mom.|このネックレスは母からの贈り物です。
e1697|Fix it with some tape.|テープで留めて。
e1698|The printer is out of paper.|プリンターの紙が切れている。
e1699|Save the file before you close it.|閉じる前にファイルを保存して。
e1700|Don't tell anyone your password.|パスワードは誰にも教えないで。
e1701|We had pasta for dinner.|夕食にパスタを食べました。
e1702|Let's eat popcorn at the movies.|映画館でポップコーンを食べよう。
e1703|I like tuna sandwiches.|ツナサンドが好きです。
e1704|Seaweed is good for your health.|海藻は健康によいです。
e1705|We need flour to make bread.|パンを作るのに小麦粉が必要です。
e1706|The cake is in the oven.|ケーキはオーブンに入っています。
e1707|Be careful, the stove is hot.|気をつけて、コンロが熱いよ。
e1708|My birthday is on the eleventh.|私の誕生日は11日です。
e1709|December is the twelfth month.|12月は12番目の月です。
e1710|Today is the twentieth of May.|今日は5月20日です。
e1711|We will meet on the thirtieth.|30日に会いましょう。
e1712|This is a great opportunity for you.|これはあなたにとってすばらしい機会です。
e1713|Failure is a part of learning.|失敗は学ぶことの一部です。
e1714|She won the singing competition.|彼女は歌の大会で優勝しました。
e1715|He spoke with confidence.|彼は自信を持って話しました。
e1716|Learning a language takes patience.|言語を学ぶには忍耐が必要です。
e1717|Mom told me the importance of sleep.|母は睡眠の大切さを教えてくれました。
e1718|He has great strength.|彼はとても力が強いです。
e1719|Everyone has a weakness.|だれにでも弱点があります。
e1720|Being tall is an advantage in basketball.|背が高いことはバスケットボールで有利です。
e1721|Exercise has many benefits.|運動にはたくさんの利点があります。
e1722|She could not hide her anger.|彼女は怒りを隠せませんでした。
e1723|The room was full of laughter.|部屋は笑い声でいっぱいでした。
e1724|He has a strong belief in peace.|彼は平和を強く信じています。
e1725|We learned about religion in class.|授業で宗教について学びました。
e1726|Crime is low in this town.|この町は犯罪が少ないです。
e1727|His income is not very high.|彼の収入はあまり高くありません。
e1728|The forecast says it will rain.|予報では雨が降るそうです。
e1729|Japan has a mild climate.|日本は気候が穏やかです。
e1730|The team has a great spirit.|そのチームはすばらしい精神を持っています。
e1731|My great-grandfather was in the army.|ひいおじいさんは軍隊にいました。
e1732|They won the battle.|彼らは戦いに勝ちました。
e1733|We celebrated our victory.|私たちは勝利を祝いました。
e1734|Knights carried weapons.|騎士は武器を持っていました。
e1735|I opened a bank account.|銀行口座を開きました。
e1736|Please fill out this application.|この申込書に記入してください。
e1737|This software is easy to use.|このソフトウェアは使いやすいです。
e1738|Please read chapter three.|第3章を読んでください。
e1739|Read the first paragraph aloud.|最初の段落を声に出して読んでください。
e1740|Your pronunciation is very good.|あなたの発音はとても上手です。
e1741|I have a chemistry test tomorrow.|明日、化学のテストがあります。
e1742|Physics is my favorite subject.|物理は私の好きな教科です。
e1743|We study plants in biology.|生物の授業で植物を学びます。
e1744|Look at the chart on page ten.|10ページの図表を見てください。
e1745|We made a donation to the hospital.|私たちは病院に寄付をしました。
e1746|The country sent aid after the storm.|その国は嵐のあとに援助を送りました。
e1747|This curry has many spices.|このカレーにはたくさんの香辛料が入っています。
e1748|Summer in Tokyo is very humid.|東京の夏はとても蒸し暑いです。
e1749|The weather was awful yesterday.|昨日は天気がひどかったです。
e1750|That is a brilliant idea!|それはすばらしい考えだ！
e1751|We saw a distant mountain.|遠くの山が見えました。
e1752|My sister is jealous of my new bike.|妹は私の新しい自転車をうらやましがっています。
e1753|I am satisfied with the result.|私はその結果に満足しています。
e1754|She arranged the flowers in a vase.|彼女は花びんに花を生けました。
e1755|The festival attracts many tourists.|そのお祭りは多くの観光客を引きつけます。
e1756|Don't blame your brother.|弟を責めないで。
e1757|Everyone can contribute to the team.|だれでもチームに貢献できます。
e1758|This medicine will cure your cold.|この薬で風邪が治ります。
e1759|He denied breaking the window.|彼は窓を割ったことを否定しました。
e1760|Sorry to disturb you.|お邪魔してすみません。
e1761|I edited the video on my phone.|スマホで動画を編集しました。
e1762|The clown entertained the children.|ピエロは子どもたちを楽しませました。
e1763|The doctor examined my throat.|医者は私ののどを診察しました。
e1764|Do you think ghosts exist?|おばけは存在すると思う？
e1765|We extended our stay by two days.|私たちは滞在を2日延ばしました。
e1766|The loud noise frightened the dog.|大きな音が犬を怖がらせました。
e1767|She gained a lot of experience.|彼女は多くの経験を得ました。
e1768|Grab your coat, let's go!|コートをつかんで、行こう！
e1769|A dog guards the house.|犬が家を守っています。
e1770|The cut on my finger healed quickly.|指の切り傷はすぐに治りました。
e1771|His speech impressed everyone.|彼のスピーチはみんなを感動させました。
e1772|Her story inspired me.|彼女の話は私を奮い立たせました。
e1773|Please don't interrupt me.|私の話をさえぎらないでください。
e1774|The job involves a lot of travel.|その仕事には出張がたくさん含まれます。
e1775|Read the label before you buy it.|買う前にラベルを読んでね。
e1776|This bridge links the two towns.|この橋は2つの町をつないでいます。
e1777|I owe you five dollars.|あなたに5ドル借りがあります。
e1778|How do you pronounce this word?|この単語はどう発音しますか？
e1779|I regret saying that.|あんなことを言って後悔しています。
e1780|I reserved a table for four.|4人分の席を予約しました。
e1781|My grandpa retired last year.|祖父は去年退職しました。
e1782|Two men robbed the bank.|2人の男が銀行強盗をしました。
e1783|Mom scolded me for being late.|母は私が遅れたのでしかりました。
e1784|They settled the problem quickly.|彼らはすぐに問題を解決しました。
e1785|Don't stare at people.|人をじろじろ見ないで。
e1786|I'm starving! What's for dinner?|お腹ぺこぺこ！夕ご飯は何？
e1787|Lightning struck the tree.|雷が木に落ちました。
e1788|He struggled to open the jar.|彼はびんを開けようと苦労しました。
e1789|She suffers from headaches.|彼女は頭痛に苦しんでいます。
e1790|The farm supplies milk to the town.|その農場は町に牛乳を供給しています。
e1791|The house is surrounded by trees.|その家は木に囲まれています。
e1792|Trucks transport food to stores.|トラックが食べ物を店に運びます。
e1793|The game united the whole town.|その試合は町全体を一つにしました。
e1794|We wandered around the old town.|私たちは旧市街をぶらぶら歩きました。
e1795|The wound will heal soon.|傷はすぐに治るでしょう。
e1796|The train had a short delay.|電車が少し遅れました。
e1797|Our team defeated the champions.|私たちのチームはチャンピオンを打ち負かしました。
e1798|There is no charge for children.|子どもは料金がかかりません。
e1799|Lack of sleep makes me tired.|睡眠不足で疲れます。
e1800|The dog buried a bone.|犬が骨を埋めました。
e1801|Dogs should obey their owners.|犬は飼い主に従うべきです。
e1802|The shop has ten employees.|その店には従業員が10人います。
e1803|She works as a secretary.|彼女は秘書として働いています。
e1804|The teacher's assistant helped me.|先生の助手が手伝ってくれました。
e1805|He is an expert on birds.|彼は鳥の専門家です。
e1806|Picasso was a famous painter.|ピカソは有名な画家でした。
e1807|This painting is very old.|この絵画はとても古いです。
e1808|My sister plays violin in an orchestra.|姉はオーケストラでバイオリンをひいています。
e1809|Her performance was amazing.|彼女の演技はすばらしかったです。
e1810|The director made a new movie.|監督は新しい映画を作りました。
e1811|I read an article about pandas.|パンダについての記事を読みました。
e1812|I saw an advertisement for a new game.|新しいゲームの広告を見ました。
e1813|This commercial is funny.|このコマーシャルはおもしろいです。
e1814|The media reported the news.|メディアがそのニュースを報じました。
e1815|We did an experiment in science class.|理科の授業で実験をしました。
e1816|It was an important discovery.|それは重要な発見でした。
e1817|We did a survey of our class.|クラスでアンケート調査をしました。
e1818|Exercise helps reduce stress.|運動はストレスを減らすのに役立ちます。
e1819|Call an ambulance!|救急車を呼んで！
e1820|My dad had an operation last week.|父は先週手術を受けました。
e1821|Smoking can cause cancer.|喫煙はがんの原因になることがあります。
e1822|I have a reservation for two.|2名で予約しています。
e1823|Can I get a student discount?|学生割引はありますか？
e1824|The entrance fee is five dollars.|入場料は5ドルです。
e1825|The bus fare is two dollars.|バスの運賃は2ドルです。
e1826|The train leaves from platform three.|電車は3番ホームから出ます。
e1827|Please close the curtains.|カーテンを閉めてください。
e1828|I do the laundry on Sundays.|日曜日に洗濯をします。
e1829|Everyone helps with the housework.|みんなが家事を手伝います。
e1830|The ring has a small diamond.|その指輪には小さなダイヤモンドがついています。
e1831|Follow the arrows to the exit.|矢印に従って出口へ行ってください。
e1832|The arrow hit the target.|矢が的に当たりました。
e1833|My bike has a flat tire.|自転車のタイヤがパンクしています。
e1834|Many foreigners visit Kyoto.|たくさんの外国人が京都を訪れます。
e1835|Cats are very curious animals.|ねこはとても好奇心の強い動物です。
e1836|She is fluent in English.|彼女は英語がぺらぺらです。
e1837|This is a general rule.|これは一般的なルールです。
e1838|I am grateful for your help.|あなたの助けに感謝しています。
e1839|We heard a mysterious sound.|不思議な音が聞こえました。
e1840|He lives on the opposite side of the street.|彼は通りの反対側に住んでいます。
e1841|Please behave in the library.|図書館ではお行儀よくしてね。
e1842|Grandma can sew very well.|おばあちゃんは縫い物がとても上手です。
e1843|Mom knitted a scarf for me.|母が私にマフラーを編んでくれました。
e1844|Please wipe the table.|テーブルをふいてください。
e1845|Don't spill your milk.|牛乳をこぼさないでね。
e1846|He is a nice guy.|彼はいいやつです。
e1847|I'd like a double cheeseburger.|ダブルチーズバーガーをください。
e1848|He is crazy about soccer.|彼はサッカーに夢中です。
e1849|The station is one mile away.|駅は1マイル先です。
e1850|Always wear a helmet on your bike.|自転車に乗るときはいつもヘルメットをかぶってね。
e1851|He has a beard on his chin.|彼はあごにひげを生やしています。
e1852|Clean it with a soft cloth.|やわらかい布でふいてください。
e1853|Sit beside me.|私のそばに座って。
e1854|She is two years junior to me.|彼女は私より2歳年下です。
e1855|The railway runs along the river.|鉄道は川沿いを走っています。
e1856|This bag costs ten pounds.|このかばんは10ポンドです。
e1857|Please consider my idea.|私の考えをよく考えてみてください。
e1858|I suggest we take a break.|休憩しようと提案します。
e1859|Can you recommend a good book?|いい本を勧めてくれますか？
e1860|Camels can survive without water for days.|ラクダは何日も水なしで生き延びられます。
e1861|Treat animals kindly.|動物にはやさしく接してね。
e1862|I managed to finish my homework.|なんとか宿題を終えました。
e1863|He didn't mention the test.|彼はテストのことに触れませんでした。
e1864|This song reminds me of summer.|この歌を聞くと夏を思い出します。
e1865|The sign warns people of danger.|その標識は人々に危険を警告しています。
e1866|The teacher praised my drawing.|先生は私の絵をほめてくれました。
e1867|He pretended to be asleep.|彼は寝ているふりをしました。
e1868|She recovered from her cold.|彼女は風邪から回復しました。
e1869|We need to replace the battery.|電池を取り替える必要があります。
e1870|Let's review today's lesson.|今日の授業を復習しよう。
e1871|Please separate the trash.|ごみを分別してください。
e1872|Focus on your homework.|宿題に集中しなさい。
e1873|We organized a party for Mom.|私たちは母のためにパーティーを準備しました。
e1874|Everyone participated in the game.|みんながゲームに参加しました。
e1875|It's hard to predict the weather.|天気を予測するのは難しいです。
e1876|He always complains about food.|彼はいつも食べ物に文句を言います。
e1877|My brothers often argue.|兄たちはよく言い争います。
e1878|We can't afford a new car.|新しい車を買う余裕はありません。
e1879|I really appreciate your help.|手伝ってくれて本当に感謝しています。
e1880|She achieved her goal.|彼女は目標を達成しました。
e1881|Let's cooperate to clean the room.|協力して部屋を掃除しよう。
e1882|The number of children is decreasing.|子どもの数が減っています。
e1883|The school provides lunch.|学校は昼食を提供しています。
e1884|The shop hired a new worker.|その店は新しい店員を雇いました。
e1885|Don't judge people by their looks.|人を見た目で判断してはいけません。
e1886|Don't ignore my message!|私のメッセージを無視しないで！
e1887|My father had a big influence on me.|父は私に大きな影響を与えました。
e1888|There is a time limit of ten minutes.|10分の時間制限があります。
e1889|We observed the stars at night.|夜に星を観察しました。
e1890|The accident occurred last night.|その事故は昨夜起こりました。
e1891|She overcame her fear of dogs.|彼女は犬への恐怖を克服しました。
e1892|I admire my grandfather.|私は祖父を尊敬しています。
e1893|Sorry to bother you.|お手数をおかけしてすみません。
e1894|Combine the eggs and sugar.|卵と砂糖を混ぜ合わせてください。
e1895|I can't concentrate with the TV on.|テレビがついていると集中できません。
e1896|These two words confuse me.|この2つの単語はまぎらわしいです。
e1897|I doubt he will come.|彼が来るとは思えません。
e1898|Parents educate their children.|親は子どもを教育します。
e1899|We elected a new class leader.|私たちは新しい学級委員を選びました。
e1900|He refused my offer.|彼は私の申し出を断りました。
e1901|Please remain in your seats.|席に座ったままでいてください。
e1902|She does research on whales.|彼女はクジラの研究をしています。
e1903|He didn't respond to my email.|彼は私のメールに返事をしませんでした。
e1904|Please select one item.|商品を一つ選んでください。
e1905|This tape doesn't stick well.|このテープはあまりくっつきません。
e1906|I suppose you are right.|たぶんあなたの言う通りだと思います。
e1907|The meal satisfied everyone.|その食事はみんなを満足させました。
e1908|Her first book was published last year.|彼女の最初の本は去年出版されました。
e1909|My dad quit smoking.|父はたばこをやめました。
e1910|Please inform us of any changes.|変更があればお知らせください。
e1911|He was injured in the game.|彼は試合でけがをしました。
e1912|Handle the glass carefully.|グラスは丁寧に扱ってください。
e1913|Lay the baby on the bed.|赤ちゃんをベッドに寝かせてください。
e1914|Can you operate this machine?|この機械を操作できますか？
e1915|Can you prove it?|それを証明できますか？
e1916|We collected data for our project.|私たちは研究課題のためにデータを集めました。
e1917|This medicine has a quick effect.|この薬はすぐに効果があります。
e1918|Please fill out this form.|この用紙に記入してください。
e1919|Write the figures in the box.|数字を枠の中に書いてください。
e1920|Everyone must follow the law.|だれもが法律を守らなければなりません。
e1921|This is a new method of teaching.|これは新しい教え方です。
e1922|We have math in the first period.|1時間目は数学です。
e1923|What is the purpose of your visit?|訪問の目的は何ですか？
e1924|This bag is good quality.|このかばんは質がいいです。
e1925|Japan's school system is different.|日本の学校制度は違います。
e1926|Cleaning is my task today.|今日は掃除が私の仕事です。
e1927|We start Unit 5 today.|今日から第5単元に入ります。
e1928|This old coin has great value.|この古いコインはとても価値があります。
e1929|He played soccer in his youth.|彼は若いころサッカーをしていました。
e1930|I like the pattern on your shirt.|あなたのシャツの模様が好きです。
e1931|Learning is a slow process.|学ぶことはゆっくりした過程です。
e1932|The car is in good condition.|その車は状態がいいです。
e1933|This is a difficult situation.|これは難しい状況です。
e1934|We found a solution to the problem.|私たちは問題の解決策を見つけました。
e1935|There is an error in this sentence.|この文には誤りがあります。
e1936|The total is twenty dollars.|合計は20ドルです。
e1937|Drink a large amount of water.|たくさんの量の水を飲んでください。
e1938|Fifty percent of the class are girls.|クラスの50パーセントは女子です。
e1939|My test score was above average.|私のテストの点は平均より上でした。
e1940|The birth rate is falling.|出生率が下がっています。
e1941|What is your height?|あなたの身長はどのくらいですか？
e1942|Measure the length of the desk.|机の長さを測ってください。
e1943|This region is famous for apples.|この地域はリンゴで有名です。
e1944|What position do you play?|あなたはどのポジションでプレーしますか？
e1945|The surface of the lake was calm.|湖の表面は穏やかでした。
e1946|I can't stand this heat.|この暑さには耐えられません。
e1947|There was a long silence.|長い沈黙がありました。
e1948|They went on a long journey.|彼らは長い旅に出ました。
e1949|We crossed the border by car.|私たちは車で国境を越えました。
e1950|This is the fastest route to school.|これが学校への一番速い道です。
e1951|This store sells sports goods.|この店はスポーツ用品を売っています。
e1952|The price includes tax.|その値段には税金が含まれています。
e1953|He gets his salary every month.|彼は毎月給料をもらいます。
e1954|The car industry is big in Japan.|日本では自動車産業が大きいです。
e1955|The economy is growing.|経済は成長しています。
e1956|Japan has a lot of trade with China.|日本は中国と多くの貿易をしています。
e1957|Rice is the main crop here.|ここでは米が主な作物です。
e1958|We help with the rice harvest every fall.|毎年秋に稲刈りを手伝います。
e1959|Plants grow well in this soil.|この土では植物がよく育ちます。
e1960|This box is made of metal.|この箱は金属でできています。
e1961|What material is this shirt made of?|このシャツは何の素材でできていますか？
e1962|My phone battery is low.|スマホの電池が少ないです。
e1963|The car is running out of fuel.|車の燃料がなくなりかけています。
e1964|We should protect wildlife.|私たちは野生生物を守るべきです。
e1965|The sea is full of strange creatures.|海は不思議な生き物でいっぱいです。
e1966|What flavor of ice cream do you want?|何味のアイスがいい？
e1967|A healthy diet is important.|健康的な食事は大切です。
e1968|He missed school because of illness.|彼は病気で学校を休みました。
e1969|Wash your hands to stop the virus.|ウイルスを防ぐために手を洗いましょう。
e1970|He had a knee injury.|彼はひざをけがしていました。
e1971|Swimming builds strong muscles.|水泳で強い筋肉がつきます。
e1972|She is getting treatment at the hospital.|彼女は病院で治療を受けています。
e1973|What is your date of birth?|あなたの生年月日はいつですか？
e1974|Three generations live in this house.|この家には3世代が住んでいます。
e1975|Is your cat male or female?|あなたのねこはおすですか、めすですか？
e1976|Female lions do most of the hunting.|めすのライオンが狩りのほとんどをします。
e1977|She has a cheerful personality.|彼女は明るい性格です。
e1978|His behavior in class was good.|授業中の彼のふるまいはよかったです。
e1979|She has a positive attitude.|彼女は前向きな態度を持っています。
e1980|He has a lot of knowledge about trains.|彼は電車についての知識がたくさんあります。
e1981|Education is important for everyone.|教育はみんなにとって大切です。
e1982|She has a talent for music.|彼女には音楽の才能があります。
e1983|Who is the author of this book?|この本の著者はだれですか？
e1984|My uncle is a professor at a university.|おじは大学の教授です。
e1985|She is a cancer researcher.|彼女はがんの研究者です。
e1986|The journalist wrote about the fire.|その記者は火事について書きました。
e1987|Every citizen has the right to vote.|すべての市民に投票権があります。
e1988|We visit our relatives at New Year.|お正月には親戚を訪ねます。
e1989|Africa is a large continent.|アフリカは大きな大陸です。
e1990|The universe is very big.|宇宙はとても大きいです。
e1991|The satellite goes around the Earth.|人工衛星は地球の周りを回っています。
e1992|We should prepare for disasters.|災害に備えるべきです。
e1993|The heavy rain caused a flood.|大雨で洪水が起きました。
e1994|In an emergency, call 119.|緊急のときは119番に電話してください。
e1995|The storm caused a lot of damage.|嵐が大きな被害をもたらしました。
e1996|Wait for the signal to cross.|渡るのは信号を待ってからにしてね。
e1997|Don't forget your luggage.|手荷物を忘れないでね。
e1998|A package came for you today.|今日あなたに小包が届きました。
e1999|Change the channel, please.|チャンネルを変えてください。
e2000|We bought new furniture.|新しい家具を買いました。
e2001|Tie the box with string.|箱をひもで結んでください。
e2002|We did the experiment in the laboratory.|私たちは実験室で実験をしました。
e2003|Many people live in poverty.|多くの人が貧困の中で暮らしています。
e2004|Many children suffer from hunger.|多くの子どもが飢えに苦しんでいます。
e2005|Language can be a barrier.|言葉が壁になることがあります。
e2006|Water is an important resource.|水は大切な資源です。
e2007|Click on the image to see it bigger.|画像をクリックすると大きく見られます。
e2008|It's a pleasure to meet you.|お会いできてうれしいです。
e2009|You are making good progress in English.|英語がよく上達していますね。
e2010|She spoke about her family with pride.|彼女は家族のことを誇りを持って話しました。
e2011|The team had a loss last night.|チームは昨夜負けました。
e2012|It is our duty to help others.|人を助けるのは私たちの義務です。
e2013|We gave old clothes to charity.|古い服を慈善団体に寄付しました。
e2014|Dad is in a good mood today.|今日はお父さんの機嫌がいいです。
e2015|What is that strange object?|あの変な物体は何？
e2016|The theme of the party is space.|パーティーのテーマは宇宙です。
e2017|Our host made a big dinner.|招いてくれた人がごちそうを作ってくれました。
e2018|She is a native speaker of English.|彼女は英語を母語として話す人です。
e2019|He is a fast reader.|彼は読むのが速いです。
e2020|This app has many users.|このアプリにはたくさんの利用者がいます。
e2021|The teacher has thirty pupils.|その先生には30人の生徒がいます。
e2022|Many travelers visit this temple.|多くの旅行者がこのお寺を訪れます。
e2023|The hunter walked into the forest.|狩人は森の中へ歩いていきました。
e2024|The fisherman caught a big fish.|漁師は大きな魚をつかまえました。
e2025|Edison was a great inventor.|エジソンは偉大な発明家でした。
e2026|The photographer took our picture.|写真家が私たちの写真をとりました。
e2027|The comedian made everyone laugh.|そのお笑い芸人はみんなを笑わせました。
e2028|The magician pulled a rabbit from a hat.|手品師は帽子からウサギを出しました。
e2029|My aunt is a lawyer.|おばは弁護士です。
e2030|The carpenter built a new shelf.|大工さんが新しい棚を作りました。
e2031|The sailor looked at the sea.|船乗りは海を見ました。
e2032|The story is about a friendly giant.|その物語はやさしい巨人の話です。
e2033|Grandma loves her grandchildren.|おばあちゃんは孫たちが大好きです。
e2034|My grandparents live in Osaka.|祖父母は大阪に住んでいます。
e2035|My teammates are very kind.|チームメイトはとても親切です。
e2036|He gave me a thumbs-up.|彼は親指を立ててくれました。
e2037|The baby has round cheeks.|赤ちゃんのほっぺたは丸いです。
e2038|He lived in London for a decade.|彼は10年間ロンドンに住んでいました。
e2039|Today is my parents' wedding anniversary.|今日は両親の結婚記念日です。
e2040|We sang in the chorus contest.|私たちは合唱コンクールで歌いました。
e2041|Draw a graph of the results.|結果をグラフにしてください。
e2042|We have a spelling quiz today.|今日はつづりの小テストがあります。
e2043|We had a discussion about the trip.|旅行について話し合いました。
e2044|English grammar is not so hard.|英語の文法はそれほど難しくありません。
e2045|Reading helps build your vocabulary.|読書は語彙を増やすのに役立ちます。
e2046|We had a long conversation.|私たちは長い会話をしました。
e2047|This is a useful expression.|これは役に立つ表現です。
e2048|Learn these phrases for your trip.|旅行のためにこの言い回しを覚えてね。
e2049|Read the text on page twenty.|20ページの本文を読んでください。
e2050|I wrote an essay about my family.|家族について作文を書きました。
e2051|Write a short summary of the story.|物語の短い要約を書いてください。
e2052|We had a class debate today.|今日はクラスで討論会をしました。
e2053|She studies English literature.|彼女は英文学を勉強しています。
e2054|There is a spider on the ceiling.|天井にクモがいます。
e2055|Dad parked the car in the garage.|父は車を車庫に入れました。
e2056|I'm certain she will come.|彼女はきっと来ると確信しています。
e2057|Our hotel is in central Tokyo.|私たちのホテルは東京の中心にあります。
e2058|That's not fair!|そんなのずるいよ！
e2059|Your face looks familiar.|あなたの顔に見覚えがあります。
e2060|Global warming is a serious problem.|地球温暖化は深刻な問題です。
e2061|Tokyo is a major city.|東京は主要な都市です。
e2062|This is my personal opinion.|これは私の個人的な意見です。
e2063|Here are some recent photos.|これは最近の写真です。
e2064|My bag is similar to yours.|私のかばんはあなたのと似ています。
e2065|Everyone is unique.|みんなそれぞれ独特です。
e2066|The store sells various kinds of fruit.|その店はいろいろな種類の果物を売っています。
e2067|Try to stay positive.|前向きでいるようにしよう。
e2068|Don't be so negative.|そんなに後ろ向きにならないで。
e2069|Physical exercise is good for you.|体を動かすことは体によいです。
e2070|This is a private beach.|ここはプライベートビーチです。
e2071|This bird is very rare.|この鳥はとても珍しいです。
e2072|Regular exercise keeps you healthy.|定期的な運動は健康を保ちます。
e2073|Social studies is my favorite subject.|社会科は私の好きな教科です。
e2074|This is a typical Japanese breakfast.|これは典型的な日本の朝ごはんです。
e2075|This is a valuable lesson.|これは貴重な教訓です。
e2076|Learn the basic rules first.|まず基本的なルールを覚えて。
e2077|All people are equal.|すべての人は平等です。
e2078|Bring an extra pencil.|鉛筆を余分に持ってきてね。
e2079|The land here is flat.|ここの土地は平らです。
e2080|This is the original story.|これが元の物語です。
e2081|I didn't eat a single cookie.|クッキーを一つも食べませんでした。
e2082|It was a tough day.|大変な一日でした。
e2083|This is the official website.|これは公式ウェブサイトです。
e2084|It was just an ordinary day.|ただの普通の一日でした。
e2085|She is very independent.|彼女はとても自立しています。
e2086|Stay calm and listen.|落ち着いて聞いて。
e2087|Are you still awake?|まだ起きてるの？
e2088|The room was silent.|部屋はしんとしていました。
e2089|The baby's skin is smooth.|赤ちゃんの肌はすべすべです。
e2090|Be careful, the knife is sharp.|気をつけて、ナイフはよく切れるよ。
e2091|We had a pleasant evening.|楽しい夜を過ごしました。
e2092|This is pure orange juice.|これは果汁100%のオレンジジュースです。
e2093|The sea was rough today.|今日は海が荒れていました。
e2094|These shoes are too tight.|このくつはきつすぎます。
e2095|This curry is mild.|このカレーは甘口です。
e2096|The song was written by an unknown singer.|その歌は無名の歌手によって書かれました。
e2097|It's unusual for him to be late.|彼が遅れるのは珍しいです。
e2098|She is a talented singer.|彼女は才能のある歌手です。
e2099|The game is popular worldwide.|そのゲームは世界中で人気です。
e2100|We helped an elderly woman.|私たちは年配の女性を手伝いました。
e2101|He needs medical help.|彼には医療の助けが必要です。
e2102|We went to a cultural festival.|私たちは文化祭に行きました。
e2103|This is a scientific fact.|これは科学的な事実です。
e2104|We visited a historical museum.|私たちは歴史博物館を訪れました。
e2105|We learned about ancient Egypt.|古代エジプトについて学びました。
e2106|I have a digital camera.|私はデジタルカメラを持っています。
e2107|It's exactly three o'clock.|ちょうど3時です。
e2108|It's nearly time for dinner.|もうすぐ夕食の時間です。
e2109|I simply forgot.|ただ忘れただけです。
e2110|The guests were mostly children.|お客さんは大部分が子どもでした。
e2111|I completely forgot about it.|そのことをすっかり忘れていました。
e2112|Go directly to the station.|駅にまっすぐ行ってください。
e2113|Hold your chopsticks properly.|はしをきちんと持ってね。
e2114|English is widely spoken.|英語は広く話されています。
e2115|I was deeply moved by the movie.|その映画に深く感動しました。
e2116|It was raining. Therefore, we stayed home.|雨が降っていた。それゆえ、私たちは家にいました。
e2117|Although it was raining, we went out.|雨が降っていたけれど、私たちは出かけました。
e2118|You can't go unless you finish your homework.|宿題を終えない限り行けません。
e2119|I don't know whether he will come.|彼が来るかどうかわかりません。
e2120|You can eat whatever you like.|好きなものを何でも食べていいよ。
e2121|Come and visit whenever you like.|いつでも好きなときに遊びに来てね。
e2122|It's too late. Besides, I'm tired.|もう遅いよ。それに疲れてるんだ。
e2123|I'd rather stay home today.|今日はむしろ家にいたいです。
e2124|Please pay attention to the teacher.|先生の話をよく聞いてください。
e2125|It was a hard decision.|それは難しい決断でした。
e2126|Tell me the details later.|あとで詳しいことを教えて。
e2127|She hid her emotions.|彼女は感情を隠しました。
e2128|Don't forget your camping equipment.|キャンプ用具を忘れないでね。
e2129|This phone has many functions.|このスマホにはたくさんの機能があります。
e2130|Climate change is a big issue.|気候変動は大きな問題です。
e2131|They have a good relationship.|彼らはいい関係です。
e2132|Taking care of the dog is my responsibility.|犬の世話は私の責任です。
e2133|I feel a lot of pressure before tests.|テストの前は大きなプレッシャーを感じます。
e2134|The airport has tight security.|空港は警備が厳しいです。
e2135|The sun is a source of energy.|太陽はエネルギー源です。
e2136|The structure of the bridge is strong.|その橋の構造は丈夫です。
e2137|There is a variety of food at the party.|パーティーにはいろいろな食べ物があります。
e2138|No vehicles are allowed in the park.|公園には乗り物は入れません。
e2139|Grandma told us an old tale.|おばあちゃんが昔話をしてくれました。
e2140|It's a mystery to me.|それは私にはなぞです。
e2141|Walking the dog is part of my routine.|犬の散歩は私の日課の一つです。
e2142|Don't believe that rumor.|そのうわさを信じないで。
e2143|I have a small request.|ちょっとしたお願いがあります。
e2144|I have a dentist appointment today.|今日は歯医者の予約があります。
e2145|They had an argument about money.|彼らはお金のことで口論しました。
e2146|We reached an agreement.|私たちは合意に達しました。
e2147|I spent my childhood in Hokkaido.|私は子ども時代を北海道で過ごしました。
e2148|We had a big celebration for Grandpa.|おじいちゃんのために盛大なお祝いをしました。
e2149|He has a large stamp collection.|彼は切手をたくさん集めています。
e2150|Communication is important in a family.|家族では意思疎通が大切です。
e2151|The internet connection is slow.|インターネットの接続が遅いです。
e2152|The road is under construction.|その道路は工事中です。
e2153|Consumers want cheaper prices.|消費者はもっと安い値段を望んでいます。
e2154|Which department do you work in?|どの部署で働いていますか？
e2155|We finally reached our destination.|ついに目的地に着きました。
e2156|Please sign this document.|この書類にサインしてください。
e2157|There is a lot of entertainment in this city.|この町には娯楽がたくさんあります。
e2158|We went to an art exhibition.|私たちは美術展に行きました。
e2159|Thank you for your clear explanation.|わかりやすい説明をありがとう。
e2160|I like reading science fiction.|SF小説を読むのが好きです。
e2161|The growth of the plant was fast.|その植物の成長は速かったです。
e2162|What are the ingredients for this cake?|このケーキの材料は何ですか？
e2163|Read the instructions first.|まず説明書を読んでください。
e2164|Let me make a short introduction.|簡単に自己紹介させてください。
e2165|The professor gave a lecture on history.|教授は歴史の講義をしました。
e2166|He has a healthy lifestyle.|彼は健康的な暮らしをしています。
e2167|Watch the movement of the fish.|魚の動きを見てごらん。
e2168|Tokyo has a big train network.|東京には大きな鉄道網があります。
e2169|I had a nightmare last night.|昨夜こわい夢を見ました。
e2170|She works for a charity organization.|彼女は慈善団体で働いています。
e2171|What is the origin of this word?|この言葉の由来は何ですか？
e2172|He has a passion for soccer.|彼はサッカーに情熱を持っています。
e2173|Payment is due on Friday.|支払いは金曜日までです。
e2174|Basho was a famous poet.|芭蕉は有名な詩人でした。
e2175|Some mushrooms contain poison.|毒を含むキノコもあります。
e2176|They said a prayer before dinner.|彼らは夕食の前にお祈りをしました。
e2177|The preparation for the party took hours.|パーティーの準備に何時間もかかりました。
e2178|What was his reaction?|彼の反応はどうでしたか？
e2179|Dreams can become reality.|夢は現実になることがあります。
e2180|What a relief!|ああ、ほっとした！
e2181|I'm waiting for her response.|彼女の返事を待っています。
e2182|The scenery here is beautiful.|ここの景色は美しいです。
e2183|We went to the shelter during the storm.|嵐の間、私たちは避難所に行きました。
e2184|There is a water shortage this summer.|この夏は水不足です。
e2185|This is the site for the new school.|ここが新しい学校の用地です。
e2186|Music is good for the soul.|音楽は心によいです。
e2187|Our team needs a new strategy.|私たちのチームには新しい作戦が必要です。
e2188|Water is needed for survival.|生きるためには水が必要です。
e2189|Do you know Einstein's theory?|アインシュタインの理論を知っていますか？
e2190|Pollution is a threat to sea life.|汚染は海の生き物にとって脅威です。
e2191|This is a new fashion trend.|これは新しいファッションの流行です。
e2192|Download the latest version of the app.|アプリの最新版をダウンロードしてね。
e2193|They helped the victims of the flood.|彼らは洪水の被害者を助けました。
e2194|Violence is never the answer.|暴力は決して解決になりません。
e2195|My grandma has poor vision.|祖母は視力が弱いです。
e2196|I didn't recognize you with glasses!|めがねをかけていたから、あなただと気づかなかった！
e2197|How did your mom react?|お母さんはどう反応したの？
e2198|This story relates to our lives.|この話は私たちの生活に関係があります。
e2199|She represented our school at the contest.|彼女はコンテストで私たちの学校を代表しました。
e2200|He was punished for lying.|彼はうそをついたので罰を受けました。
e2201|My doctor advised me to rest.|医者は私に休むよう忠告した。
e2202|I persuaded my dad to get a dog.|私は父を説得して犬を飼ってもらった。
e2203|They announced the winner today.|今日、彼らは優勝者を発表した。
e2204|She applied for a new job.|彼女は新しい仕事に申し込んだ。
e2205|A big dog approached us.|大きな犬が私たちに近づいてきた。
e2206|He attempted to climb the wall.|彼はその壁を登ろうと試みた。
e2207|He admitted his mistake.|彼は自分の間違いを認めた。
e2208|Ten teams will compete in the tournament.|10チームがトーナメントで競う。
e2209|Washing your hands prevents colds.|手洗いはかぜを防ぐ。
e2210|The lake reflects the mountains.|湖に山々が映っている。
e2211|She finally revealed her secret.|彼女はついに秘密を明かした。
e2212|Our team defended well.|うちのチームはよく守った。
e2213|They demanded more money.|彼らはもっとお金を要求した。
e2214|The man threatened to call the police.|その男は警察を呼ぶと脅した。
e2215|Many people seek happiness.|多くの人が幸せを求めている。
e2216|Smoking is a health risk.|喫煙は健康を危険にさらす。
e2217|We went out despite the rain.|雨にもかかわらず私たちは出かけた。
e2218|It rained throughout the night.|一晩中ずっと雨が降った。
e2219|There is a village beyond the river.|川の向こうに村がある。
e2220|Please reply within a week.|1週間以内に返事をください。
e2221|Once upon a time, there lived a king.|昔々、ある王様が住んでいました。
e2222|Unlike my sister, I love dogs.|姉と違って、私は犬が大好きだ。
e2223|I can't swim, nor can my brother.|私は泳げないし、兄も泳げない。
e2224|My dog follows me wherever I go.|犬は私が行くところどこへでもついてくる。
e2225|We somehow finished on time.|私たちはどうにか時間内に終わらせた。
e2226|Nowadays, everyone has a smartphone.|今日では、みんながスマホを持っている。
e2227|Meanwhile, Dad cooked dinner.|その間に、父が夕食を作った。
e2228|We had lunch and went shopping afterward.|私たちは昼食を食べて、その後買い物に行った。
e2229|That's ten dollars altogether.|全部で10ドルです。
e2230|It was indeed a great day.|本当にすばらしい一日だった。
e2231|Hurry up, otherwise we'll be late.|急いで、さもないと遅れるよ。
e2232|He eventually found his keys.|彼は最終的に鍵を見つけた。
e2233|It gradually got dark.|だんだん暗くなった。
e2234|I could hardly sleep last night.|昨夜はほとんど眠れなかった。
e2235|Please call me immediately.|すぐに電話してください。
e2236|The hotel is cheap. Moreover, it's near the beach.|そのホテルは安い。さらに、ビーチに近い。
e2237|This bag is light. Furthermore, it's waterproof.|このかばんは軽い。そのうえ、防水だ。
e2238|It was cold. Nevertheless, we swam.|寒かった。それにもかかわらず、私たちは泳いだ。
e2239|He was sick and thus stayed home.|彼は病気だった。したがって家にいた。
e2240|Fortunately, nobody was hurt.|幸運にも、誰もけがをしなかった。
e2241|Unfortunately, the shop was closed.|残念ながら、店は閉まっていた。
e2242|Apparently, it will snow tomorrow.|どうやら明日は雪が降るらしい。
e2243|She was obviously tired.|彼女は明らかに疲れていた。
e2244|It could possibly rain later.|ひょっとすると後で雨が降るかもしれない。
e2245|My father rarely gets angry.|父はめったに怒らない。
e2246|We seldom eat out.|私たちはめったに外食しない。
e2247|I've been very busy lately.|最近とても忙しい。
e2248|The story is largely true.|その話は大部分が本当だ。
e2249|It was partly my fault.|それは一部は私のせいだった。
e2250|The soup is slightly salty.|スープは少ししょっぱい。
e2251|The city is growing rapidly.|その町は急速に成長している。
e2252|The test was relatively easy.|テストは比較的簡単だった。
e2253|It takes roughly an hour.|おおよそ1時間かかる。
e2254|Please explain it briefly.|それを簡潔に説明してください。
e2255|The baby cries constantly.|その赤ちゃんは絶えず泣いている。
e2256|You're absolutely right.|まったくその通りです。
e2257|I previously lived in Osaka.|私は以前大阪に住んでいた。
e2258|We typically eat breakfast at seven.|私たちはたいてい7時に朝食を食べる。
e2259|Leave the beans in water overnight.|豆を一晩水につけておいて。
e2260|The force of the wind broke the window.|風の力で窓が割れた。
e2261|Sleep is important for a child's development.|睡眠は子どもの発達に大切だ。
e2262|These boots are made of rubber.|この長靴はゴムでできている。
e2263|My pen is out of ink.|私のペンはインクが切れている。
e2264|Animals adapt to the cold.|動物は寒さに適応する。
e2265|Our school adopted a new uniform.|私たちの学校は新しい制服を採用した。
e2266|Please attach a photo to the email.|メールに写真を添付してください。
e2267|She won an award for her drawing.|彼女は絵で賞をとった。
e2268|He bet ten dollars on the game.|彼はその試合に10ドル賭けた。
e2269|Can you calculate the total cost?|合計金額を計算できる？
e2270|They captured the escaped lion.|彼らは逃げたライオンを捕まえた。
e2271|He claims he saw a UFO.|彼はUFOを見たと主張している。
e2272|The old bridge collapsed.|古い橋が崩れ落ちた。
e2273|Thank you for your kind comments.|親切なコメントをありがとう。
e2274|Thank you for your concern.|ご心配ありがとうございます。
e2275|Please confirm your seat number.|座席番号を確認してください。
e2276|Our team consists of five people.|私たちのチームは5人から成る。
e2277|They constructed a new school.|彼らは新しい学校を建設した。
e2278|This car consumes a lot of gas.|この車はガソリンをたくさん消費する。
e2279|This drink contains sugar.|この飲み物には砂糖が含まれている。
e2280|I convinced Mom that I was right.|私は自分が正しいと母を納得させた。
e2281|She copes well with stress.|彼女はストレスにうまく対処している。
e2282|Don't criticize others too much.|他人を批判しすぎないで。
e2283|The country declared independence.|その国は独立を宣言した。
e2284|She politely declined the invitation.|彼女は丁寧に招待を断った。
e2285|I deleted the old photos.|私は古い写真を削除した。
e2286|You deserve a good rest.|あなたはゆっくり休んで当然だ。
e2287|He has a strong desire to win.|彼には勝ちたいという強い願望がある。
e2288|The new toys are on display.|新しいおもちゃが展示されている。
e2289|The sun emerged from the clouds.|太陽が雲の間から現れた。
e2290|The shop employs ten people.|その店は10人を雇っている。
e2291|The internet enables us to study at home.|インターネットのおかげで家で勉強できる。
e2292|The school was established in 1900.|その学校は1900年に設立された。
e2293|Can you estimate the cost?|費用を見積もってもらえますか？
e2294|The shop expanded last year.|その店は昨年規模を拡大した。
e2295|The balloon exploded with a bang.|風船がパンと破裂した。
e2296|Japan exports many cars.|日本はたくさんの車を輸出している。
e2297|We import bananas from abroad.|私たちはバナナを外国から輸入している。
e2298|My jeans faded in the sun.|私のジーンズは日に当たって色あせた。
e2299|This phone has many new features.|この電話には新しい機能がたくさんある。
e2300|My parents forbid me to stay out late.|両親は私が夜遅くまで外にいるのを禁じている。
e2301|Wind can generate electricity.|風は電気を生み出すことができる。
e2302|This watch is guaranteed for two years.|この時計は2年間保証されている。
e2303|Too much sun can do harm to your skin.|日に当たりすぎると肌に害になることがある。
e2304|Don't hesitate to ask questions.|ためらわずに質問してね。
e2305|Can you identify this bird?|この鳥が何の鳥か特定できる？
e2306|The baby imitates her mother.|赤ちゃんは母親のまねをする。
e2307|He insisted on paying for lunch.|彼は昼食代を払うと言い張った。
e2308|Dad installed a new air conditioner.|父が新しいエアコンを設置した。
e2309|I intend to study abroad.|私は留学するつもりだ。
e2310|He invested money in the company.|彼はその会社にお金を投資した。
e2311|The police are investigating the accident.|警察がその事故を調査している。
e2312|They launched a rocket into space.|彼らはロケットを宇宙に打ち上げた。
e2313|The hotel is located near the station.|そのホテルは駅の近くにある。
e2314|It's not easy to maintain a healthy weight.|健康的な体重を維持するのは簡単ではない。
e2315|Good teachers motivate their students.|よい先生は生徒をやる気にさせる。
e2316|You must obtain permission first.|まず許可を得なければならない。
e2317|Many people opposed the new rule.|多くの人が新しい規則に反対した。
e2318|He possesses a large house.|彼は大きな家を所有している。
e2319|The game was postponed because of rain.|試合は雨のため延期された。
e2320|Exercise promotes good health.|運動は健康を促進する。
e2321|I propose that we take a short break.|少し休憩することを提案します。
e2322|People protested against the plan.|人々はその計画に抗議した。
e2323|She is pursuing her dream of becoming a singer.|彼女は歌手になる夢を追い続けている。
e2324|I can't recall his name.|彼の名前が思い出せない。
e2325|Please refer to page ten.|10ページを参照してください。
e2326|I registered for the English class.|私は英語の授業に登録した。
e2327|They rejected my idea.|彼らは私の考えを却下した。
e2328|We released the fish back into the river.|私たちは魚を川に放した。
e2329|This medicine will relieve your pain.|この薬で痛みが和らぐでしょう。
e2330|You can always rely on me.|いつでも私を頼っていいよ。
e2331|She resembles her grandmother.|彼女はおばあさんに似ている。
e2332|I couldn't resist the chocolate cake.|チョコレートケーキの誘惑に勝てなかった。
e2333|They restored the old temple.|彼らは古いお寺を修復した。
e2334|You'll get a reward for your hard work.|がんばればごほうびがもらえるよ。
e2335|The rain ruined our picnic.|雨でピクニックが台無しになった。
e2336|Can you shift the table a little?|テーブルを少し動かしてくれる？
e2337|The rain spoiled our trip.|雨で旅行が台無しになった。
e2338|Please submit your homework by Friday.|金曜日までに宿題を提出してください。
e2339|I suspect he ate my cookie.|彼が私のクッキーを食べたんじゃないかと思う。
e2340|Let's switch seats.|席を替わろう。
e2341|I tend to sleep late on Sundays.|私は日曜日は遅くまで寝がちだ。
e2342|I transferred to a new school.|私は新しい学校に転校した。
e2343|The caterpillar transformed into a butterfly.|イモムシはチョウに姿を変えた。
e2344|Please update your app.|アプリを更新してください。
e2345|The cat vanished into the dark.|猫は暗闇に消えた。
e2346|Prices vary from shop to shop.|値段は店によって異なる。
e2347|They advertise their shop on TV.|彼らはテレビで店を宣伝している。
e2348|My parents approved of my plan.|両親は私の計画に賛成してくれた。
e2349|I assumed you were busy.|あなたは忙しいのだと思っていた。
e2350|The kids begged for ice cream.|子どもたちはアイスクリームをせがんだ。
e2351|My uncle breeds dogs.|おじは犬を繁殖させている。
e2352|Never cheat on a test.|テストで絶対にカンニングしてはいけない。
e2353|The dog obeyed my command.|犬は私の命令に従った。
e2354|He committed a crime.|彼は罪を犯した。
e2355|We concluded that the plan was too risky.|私たちはその計画は危険すぎると結論づけた。
e2356|We conducted an experiment in class.|私たちは授業で実験を行った。
e2357|I didn't dare to ask her.|私は彼女に聞く勇気がなかった。
e2358|The movie disappointed me.|その映画にはがっかりした。
e2359|Can you distinguish the twins?|あの双子を見分けられる？
e2360|The teacher distributed the papers.|先生がプリントを配った。
e2361|He dragged the heavy box.|彼は重い箱を引きずった。
e2362|They endured the long winter.|彼らは長い冬に耐えた。
e2363|She is engaged in volunteer work.|彼女はボランティア活動に従事している。
e2364|Teachers evaluate students' work.|先生は生徒の作品を評価する。
e2365|Birds evolved from dinosaurs.|鳥は恐竜から進化した。
e2366|Don't exaggerate. It wasn't that big.|大げさに言わないで。そんなに大きくなかったよ。
e2367|Don't expose your skin to the sun too long.|肌を長時間日光にさらさないで。
e2368|Space has always fascinated me.|宇宙にはいつも心を奪われてきた。
e2369|This puzzle frustrates me.|このパズルにはいらいらする。
e2370|She fulfilled her promise.|彼女は約束を果たした。
e2371|The baby grasped my finger.|赤ちゃんが私の指をつかんだ。
e2372|He illustrated his point with a chart.|彼は図表を使って自分の考えを説明した。
e2373|She inherited her mother's eyes.|彼女は母親の目を受け継いだ。
e2374|How do you interpret this poem?|この詩をどう解釈しますか？
e2375|The army invaded the country.|軍隊がその国に侵攻した。
e2376|The village was isolated by snow.|その村は雪で孤立した。
e2377|Don't neglect your health.|健康をおろそかにしないで。
e2378|Dogs perceive sounds we can't hear.|犬は私たちに聞こえない音を感じ取る。
e2379|We must preserve the forest.|私たちは森を守らなければならない。
e2380|Smoking is prohibited here.|ここは禁煙です。
e2381|We regard him as a hero.|私たちは彼を英雄とみなしている。
e2382|My boss resigned last month.|私の上司は先月辞職した。
e2383|The park restricts the number of visitors.|その公園は入場者数を制限している。
e2384|Parents make many sacrifices for their children.|親は子どものために多くの犠牲を払う。
e2385|We secured good seats for the show.|私たちはショーのよい席を確保した。
e2386|Can you simplify this question?|この質問をもっと簡単にしてくれる？
e2387|This shop specializes in cheese.|この店はチーズを専門にしている。
e2388|Reading stimulates the brain.|読書は脳を刺激する。
e2389|We need water to sustain life.|生命を維持するには水が必要だ。
e2390|I can't tolerate loud music.|大きな音の音楽には我慢できない。
e2391|There was no trace of the thief.|泥棒の跡はまったくなかった。
e2392|He violated the traffic rules.|彼は交通規則に違反した。
e2393|Chew your food well.|食べ物をよくかんで。
e2394|The baby started to crawl.|赤ちゃんがはいはいし始めた。
e2395|He almost drowned in the river.|彼は川でおぼれかけた。
e2396|Please fasten your seat belt.|シートベルトを締めてください。
e2397|Mom frowned at the messy room.|母は散らかった部屋を見て顔をしかめた。
e2398|He knelt down to tie his shoe.|彼はひざをついて靴ひもを結んだ。
e2399|Don't lean against the door.|ドアにもたれないで。
e2400|Can you peel the apples?|りんごの皮をむいてくれる？
e2401|The lion roared loudly.|ライオンが大きくほえた。
e2402|The cat scratched my hand.|猫が私の手をひっかいた。
e2403|Dad shaves every morning.|父は毎朝ひげをそる。
e2404|She sighed and closed the book.|彼女はため息をついて本を閉じた。
e2405|I sneeze a lot in spring.|春はくしゃみがよく出る。
e2406|The top spun for a long time.|こまが長い間回っていた。
e2407|Squeeze the lemon into the tea.|レモンを紅茶にしぼって。
e2408|Stir the soup slowly.|スープをゆっくりかき混ぜて。
e2409|Chew well before you swallow.|飲み込む前によくかんで。
e2410|The kids are swinging in the park.|子どもたちが公園でぶらんこをこいでいる。
e2411|Someone tapped me on the shoulder.|誰かが私の肩を軽くたたいた。
e2412|Her voice trembled with fear.|彼女の声は恐怖で震えた。
e2413|He winked at me.|彼は私にウインクした。
e2414|The boring class made me yawn.|退屈な授業であくびが出た。
e2415|Don't yell at your brother.|弟に大声を出さないで。
e2416|Can I have a slice of pizza?|ピザを一切れもらえる？
e2417|Chop the onions into small pieces.|玉ねぎを細かく刻んで。
e2418|He rubbed his eyes.|彼は目をこすった。
e2419|I bumped my head on the door.|ドアに頭をぶつけた。
e2420|I stumbled on the stairs.|私は階段でつまずいた。
e2421|The kids splashed water at each other.|子どもたちはお互いに水をかけ合った。
e2422|I was covered in sweat after running.|走った後、汗びっしょりだった。
e2423|We shivered in the cold wind.|私たちは冷たい風の中で震えた。
e2424|This job requires patience.|この仕事には忍耐が必要だ。
e2425|He is a professional soccer player.|彼はプロのサッカー選手だ。
e2426|This is the final question.|これが最後の質問です。
e2427|Everyone came except Tom.|トム以外はみんな来た。
e2428|According to the news, it will rain.|ニュースによれば、雨が降るそうだ。
e2429|We have plenty of time.|時間はたくさんある。
e2430|The tickets are ten dollars per person.|チケットは1人につき10ドルです。
e2431|Is there a direct flight to London?|ロンドンへの直行便はありますか？
e2432|Science has made great advances.|科学は大きな進歩をとげた。
e2433|Our houses are two miles apart.|私たちの家は2マイル離れている。
e2434|Please step aside.|わきによけてください。
e2435|The two sisters look alike.|その2人の姉妹は似ている。
e2436|Can I assist you?|お手伝いしましょうか？
e2437|It's an honor to meet you.|お会いできて光栄です。
e2438|Do you have any proof?|何か証拠はありますか？
e2439|Dad wears a suit to work.|父はスーツを着て仕事に行く。
e2440|That size is out of stock.|そのサイズは在庫切れです。
e2441|We keep old toys in storage.|古いおもちゃは保管してある。
e2442|This is only a temporary job.|これは一時的な仕事にすぎない。
e2443|My grandfather was in the military.|祖父は軍隊にいた。
e2444|This factory manufactures cars.|この工場は車を製造している。
e2445|The game will be broadcast live.|その試合は生放送される。
e2446|Farmers cultivate the land.|農家の人たちは土地を耕す。
e2447|I can't eat dairy products.|私は乳製品が食べられない。
e2448|The bird is in its cage.|鳥はかごの中にいる。
e2449|I'm ashamed of what I did.|自分のしたことを恥じている。
e2450|This town is an attractive place to live.|この町は住むのに魅力的な場所だ。
e2451|I was confused by the question.|その質問にわけがわからなくなった。
e2452|This medicine is very effective.|この薬はとてもよく効く。
e2453|I met her on the previous day.|私はその前日に彼女に会った。
e2454|We keep a spare key under the mat.|マットの下に予備の鍵を置いている。
e2455|Where can I pick up my baggage?|手荷物はどこで受け取れますか？
e2456|This jacket was a real bargain.|このジャケットは本当にお買い得だった。
e2457|She got a certificate for finishing the course.|彼女は講座を修了して修了証をもらった。
e2458|The lawyer met her client.|弁護士は依頼人に会った。
e2459|I went to the clinic near my house.|家の近くの診療所に行った。
e2460|My mom commutes by train.|母は電車で通勤している。
e2461|Thank you for your cooperation.|ご協力ありがとうございます。
e2462|I used a coupon to get a discount.|クーポンを使って割引してもらった。
e2463|The deadline is next Monday.|締め切りは来週の月曜日だ。
e2464|We live in a quiet district.|私たちは静かな地区に住んでいる。
e2465|We watched a documentary about whales.|私たちはクジラのドキュメンタリーを見た。
e2466|The school has good sports facilities.|その学校にはよいスポーツ施設がある。
e2467|The company's headquarters are in Tokyo.|その会社の本社は東京にある。
e2468|Kyoto has a rich cultural heritage.|京都には豊かな文化遺産がある。
e2469|They help homeless people in the city.|彼らは町の家のない人々を助けている。
e2470|My swimming instructor is very kind.|私の水泳の指導者はとても親切だ。
e2471|I do my homework on a laptop.|私はノートパソコンで宿題をする。
e2472|Put your bag in your locker.|かばんはロッカーに入れて。
e2473|Heat the milk in the microwave.|牛乳を電子レンジで温めて。
e2474|We watched the parade on the street.|私たちは通りでパレードを見た。
e2475|Is there free parking here?|ここに無料の駐車場はありますか？
e2476|I bought some medicine at the pharmacy.|薬局で薬を買った。
e2477|Thank you for your purchase.|ご購入ありがとうございます。
e2478|Can I have a receipt, please?|領収書をいただけますか？
e2479|I asked for a refund.|私は返金を求めた。
e2480|Read the first section of the book.|本の最初の部分を読んで。
e2481|The new semester starts in April.|新学期は4月に始まる。
e2482|I love this book series.|私はこの本のシリーズが大好きだ。
e2483|She has a good painting technique.|彼女は絵の技術が高い。
e2484|Tourism is important for this island.|観光業はこの島にとって重要だ。
e2485|My trainer helped me get stronger.|トレーナーのおかげで体が強くなった。
e2486|I have a math tutor.|私には数学の家庭教師がいる。
e2487|I joined a cooking workshop.|私は料理の講習会に参加した。
e2488|This is a no-parking zone.|ここは駐車禁止区域だ。
e2489|Is this seat available?|この席は空いていますか？
e2490|Are you aware of the danger?|その危険に気づいていますか？
e2491|What is your current address?|現在の住所はどこですか？
e2492|I read the entire book in one day.|私はその本を1日で全部読んだ。
e2493|It's likely to rain tonight.|今夜は雨が降りそうだ。
e2494|Mental health is as important as physical health.|心の健康は体の健康と同じくらい大切だ。
e2495|They talked about political problems.|彼らは政治の問題について話した。
e2496|Who is responsible for this mess?|この散らかりは誰の責任？
e2497|I'm willing to help you.|喜んであなたを手伝います。
e2498|The food here is of a high standard.|ここの料理は水準が高い。
e2499|Smoking is harmful to your health.|喫煙は健康に有害だ。
e2500|Dolphins are very intelligent animals.|イルカはとても知能の高い動物だ。
e2501|Our house uses solar power.|うちは太陽光発電を使っている。
e2502|They talked about nuclear energy.|彼らは原子力エネルギーについて話し合った。
e2503|These shoes are very practical.|この靴はとても実用的だ。
e2504|She was anxious about the test.|彼女はテストのことを心配していた。
e2505|Wear appropriate clothes for the party.|パーティーにふさわしい服を着てね。
e2506|This drink has no artificial colors.|この飲み物には人工着色料が入っていない。
e2507|This clock is very accurate.|この時計はとても正確だ。
e2508|What was the actual price?|実際の値段はいくらだった？
e2509|There is an additional charge for drinks.|飲み物には追加料金がかかる。
e2510|Do you have an alternative plan?|代わりの計画はある？
e2511|Our school has an annual sports day.|私たちの学校では年に一度運動会がある。
e2512|Her happiness was apparent.|彼女がうれしいのは明らかだった。
e2513|There was an awkward silence.|気まずい沈黙があった。
e2514|We had a brief meeting.|私たちは短い打ち合わせをした。
e2515|The river is very broad here.|川はここでとても幅が広い。
e2516|She is capable of running the shop.|彼女には店を切り盛りする能力がある。
e2517|We wear casual clothes on Fridays.|金曜日はカジュアルな服を着る。
e2518|Voting is a civil right.|投票は市民の権利だ。
e2519|I like classical music.|私はクラシック音楽が好きだ。
e2520|My brother is very competitive.|兄はとても負けず嫌いだ。
e2521|The human brain is very complex.|人間の脳はとても複雑だ。
e2522|The rules of this game are complicated.|このゲームのルールはややこしい。
e2523|Can you give me a concrete example?|具体的な例を挙げてくれますか？
e2524|I'm confident about the test.|テストには自信がある。
e2525|He is conscious of his weight.|彼は体重を気にしている。
e2526|It took a considerable amount of time.|かなりの時間がかかった。
e2527|The baby needs constant care.|赤ちゃんには絶え間ない世話が必要だ。
e2528|We visited a museum of contemporary art.|私たちは現代美術館を訪れた。
e2529|This is a conventional way of cooking rice.|これは従来のご飯の炊き方だ。
e2530|Don't be cruel to animals.|動物にひどいことをしないで。
e2531|He needs a decent job.|彼にはまともな仕事が必要だ。
e2532|Be careful with that delicate glass.|その壊れやすいグラスに気をつけて。
e2533|Babies are dependent on their parents.|赤ちゃんは親に頼っている。
e2534|He made a desperate effort to win.|彼は勝つために必死の努力をした。
e2535|Our class has a diverse group of students.|私たちのクラスにはさまざまな生徒がいる。
e2536|We took a domestic flight to Okinawa.|私たちは国内線で沖縄へ行った。
e2537|There was a dramatic change in the weather.|天気が劇的に変化した。
e2538|The movie was dull.|その映画は退屈だった。
e2539|The kids are eager to go to the beach.|子どもたちはビーチに行きたくてたまらない。
e2540|The country has economic problems.|その国は経済の問題を抱えている。
e2541|This is an efficient way to study.|これは効率的な勉強法だ。
e2542|She wore an elegant dress.|彼女は上品なドレスを着ていた。
e2543|It was an emotional moment.|それは感動的な瞬間だった。
e2544|Pandas are an endangered species.|パンダは絶滅の危機にある種だ。
e2545|They live in an enormous house.|彼らは巨大な家に住んでいる。
e2546|Plastic waste is an environmental problem.|プラスチックごみは環境問題だ。
e2547|Water is essential for life.|水は生命に不可欠だ。
e2548|The evil witch lived in the forest.|邪悪な魔女が森に住んでいた。
e2549|What's the exact time now?|今の正確な時刻は？
e2550|Dinosaurs are extinct.|恐竜は絶滅した。
e2551|She has an extraordinary talent.|彼女には並外れた才能がある。
e2552|The heat this summer was extreme.|今年の夏の暑さは極端だった。
e2553|The company has financial problems.|その会社は財政的な問題を抱えている。
e2554|This bed is too firm for me.|このベッドは私には硬すぎる。
e2555|My work hours are flexible.|私の勤務時間は融通がきく。
e2556|You need formal clothes for the wedding.|結婚式には正装が必要だ。
e2557|He is a former teacher.|彼は元教師だ。
e2558|We were fortunate to have good weather.|私たちは幸運にも天気に恵まれた。
e2559|To be frank, I don't like it.|率直に言うと、それは好きじゃない。
e2560|He is a frequent visitor here.|彼はここによく来る人だ。
e2561|Reading is a fundamental skill.|読むことは基本的な技能だ。
e2562|My uncle is very generous.|おじはとても気前がいい。
e2563|Is this a genuine diamond?|これは本物のダイヤモンド？
e2564|There was a gradual rise in prices.|物価がゆるやかに上がった。
e2565|I feel guilty about eating all the cake.|ケーキを全部食べて後ろめたい。
e2566|The winter here is very harsh.|ここの冬はとても厳しい。
e2567|I had a horrible dream.|恐ろしい夢を見た。
e2568|These two bags are identical.|この2つのかばんはまったく同じだ。
e2569|It's illegal to park here.|ここに駐車するのは違法だ。
e2570|We need an immediate answer.|すぐに返事が必要だ。
e2571|The view from the top was incredible.|頂上からの景色は信じられないほどすばらしかった。
e2572|This is an industrial city.|ここは工業都市だ。
e2573|Change is inevitable.|変化は避けられない。
e2574|It was an informal party.|それは気軽なパーティーだった。
e2575|My initial plan was to go by bus.|最初の計画ではバスで行くつもりだった。
e2576|The man said he was innocent.|その男は自分は無罪だと言った。
e2577|The heat was intense.|暑さは強烈だった。
e2578|The company had an internal meeting.|その会社は社内会議を開いた。
e2579|Air is invisible.|空気は目に見えない。
e2580|I prefer the latter plan.|私は後者の計画のほうがいい。
e2581|He asked for legal advice.|彼は法律の助言を求めた。
e2582|That's a logical answer.|それは筋の通った答えだ。
e2583|My shoes are a little loose.|私の靴は少しゆるい。
e2584|Dogs are loyal animals.|犬は忠実な動物だ。
e2585|It's only a minor problem.|それはほんの小さな問題だ。
e2586|Moderate exercise is good for you.|適度な運動は体にいい。
e2587|She is modest about her success.|彼女は自分の成功について謙虚だ。
e2588|We have a moral duty to help.|私たちには助ける道徳的な義務がある。
e2589|I made multiple mistakes on the test.|テストで複数のミスをした。
e2590|We met through a mutual friend.|私たちは共通の友人を通じて知り合った。
e2591|Switzerland is a neutral country.|スイスは中立国だ。
e2592|He has visited numerous countries.|彼は数多くの国を訪れている。
e2593|The answer is obvious.|答えは明らかだ。
e2594|We have occasional rain in May.|5月には時折雨が降る。
e2595|That's an odd noise.|変な音だね。
e2596|She is always optimistic.|彼女はいつも楽観的だ。
e2597|We buy organic vegetables.|私たちは有機野菜を買っている。
e2598|He is an outstanding student.|彼は傑出した生徒だ。
e2599|The overall cost was low.|全体的な費用は安かった。
e2600|My knee is still painful.|ひざがまだ痛い。
e2601|This ink is permanent.|このインクは消えない。
e2602|Don't be so pessimistic.|そんなに悲観的にならないで。
e2603|She wore a plain white shirt.|彼女は無地の白いシャツを着ていた。
e2604|Time is precious.|時間は貴重だ。
e2605|Safety is our primary concern.|安全が私たちの第一の関心事だ。
e2606|Primitive people used stone tools.|原始時代の人々は石の道具を使った。
e2607|We had a productive meeting.|実りの多い会議だった。
e2608|Use the proper tools for the job.|その作業には適切な道具を使って。
e2609|Our teacher is always punctual.|私たちの先生はいつも時間を守る。
e2610|The town saw rapid growth.|その町は急速に成長した。
e2611|Do you eat raw fish?|生の魚を食べますか？
e2612|We need a realistic plan.|現実的な計画が必要だ。
e2613|The prices here are reasonable.|ここの値段は手ごろだ。
e2614|That question isn't relevant.|その質問は関係ない。
e2615|He is a reliable friend.|彼は頼りになる友達だ。
e2616|He was reluctant to go to the dentist.|彼は歯医者に行くのに気が進まなかった。
e2617|She made remarkable progress.|彼女は著しい進歩をとげた。
e2618|They live in a remote village.|彼らはへんぴな村に住んでいる。
e2619|I grew up in a rural area.|私は田舎で育った。
e2620|Many people live in urban areas.|多くの人が都市部に住んでいる。
e2621|This mountain is sacred to them.|この山は彼らにとって神聖だ。
e2622|Water is scarce in the desert.|砂漠では水が乏しい。
e2623|She is a senior member of the club.|彼女はクラブの上級メンバーだ。
e2624|That's a sensible idea.|それは賢明な考えだ。
e2625|My skin is sensitive to the sun.|私の肌は日光に敏感だ。
e2626|He has a severe cold.|彼はひどいかぜをひいている。
e2627|This was a significant moment in history.|これは歴史上重要な瞬間だった。
e2628|Please accept my sincere thanks.|心からの感謝を受け取ってください。
e2629|I have a slight headache.|少し頭が痛い。
e2630|Can you be more specific?|もっと具体的に言ってくれる？
e2631|Music is a spiritual thing for her.|彼女にとって音楽は心の支えだ。
e2632|We had a splendid view of the sea.|海の見事な景色が見えた。
e2633|The ladder is not stable.|そのはしごは安定していない。
e2634|She made steady progress in English.|彼女は英語で着実に進歩した。
e2635|There is a subtle difference between them.|それらの間には微妙な違いがある。
e2636|We have sufficient food for a week.|1週間分の十分な食料がある。
e2637|This movie is suitable for children.|この映画は子ども向けだ。
e2638|This tool is superior to the old one.|この道具は古いものより優れている。
e2639|This copy is inferior to the original.|このコピーは原本より劣っている。
e2640|We need sustainable energy.|私たちには持続可能なエネルギーが必要だ。
e2641|The dove is symbolic of peace.|ハトは平和の象徴だ。
e2642|This meat is very tender.|この肉はとても柔らかい。
e2643|The doctor gave me a thorough checkup.|医者は私を念入りに診察した。
e2644|Keep your room tidy.|部屋をきちんと片付けておいて。
e2645|The concert was a tremendous success.|コンサートは大成功だった。
e2646|I love tropical fruits like mangoes.|私はマンゴーのような熱帯の果物が大好きだ。
e2647|His ultimate goal is to win the Olympics.|彼の究極の目標はオリンピックで優勝することだ。
e2648|These shoes are uncomfortable.|この靴ははき心地が悪い。
e2649|We had an unexpected visitor.|思いがけない客が来た。
e2650|Music is a universal language.|音楽は世界共通の言語だ。
e2651|It's unlikely to snow tomorrow.|明日は雪が降りそうにない。
e2652|I have an urgent message for you.|あなたに緊急の伝言がある。
e2653|I have only a vague memory of it.|それについてはぼんやりとした記憶しかない。
e2654|Is your passport still valid?|あなたのパスポートはまだ有効？
e2655|The desert is vast.|その砂漠は広大だ。
e2656|We took a virtual tour of the museum.|私たちは美術館のバーチャルツアーをした。
e2657|The stars are visible tonight.|今夜は星が見える。
e2658|Sleep is vital for good health.|睡眠は健康にとって極めて重要だ。
e2659|She has vivid memories of her childhood.|彼女は子どものころの記憶が鮮明だ。
e2660|Joining the club is voluntary.|クラブへの参加は自由だ。
e2661|Young children are vulnerable to colds.|幼い子どもはかぜをひきやすい。
e2662|They come from a wealthy family.|彼らは裕福な家の出身だ。
e2663|This idea is worthy of attention.|この考えは注目に値する。
e2664|Winning the prize was a great achievement.|その賞をとったのは大きな業績だった。
e2665|I'll look after the dog in your absence.|留守中は私が犬の世話をするよ。
e2666|Do you have access to the internet?|インターネットを利用できますか？
e2667|In addition, we need some milk.|さらに、牛乳も必要だ。
e2668|Admission is free for children.|子どもは入場無料です。
e2669|The wedding was a big family affair.|結婚式は家族の一大行事だった。
e2670|We booked our trip at a travel agency.|私たちは旅行代理店で旅行を予約した。
e2671|He talked to a real estate agent.|彼は不動産業者と話をした。
e2672|Agriculture is important in this area.|この地域では農業が重要だ。
e2673|My aim is to pass the test.|私の目的はテストに合格することだ。
e2674|I set my alarm for six.|目覚ましを6時にセットした。
e2675|Look at it from a different angle.|違う角度から見てごらん。
e2676|Please listen to the announcement.|お知らせを聞いてください。
e2677|She felt anxiety before the speech.|彼女はスピーチの前に不安を感じた。
e2678|Don't judge people by their appearance.|人を外見で判断しないで。
e2679|I have no appetite today.|今日は食欲がない。
e2680|We talked about every aspect of the plan.|私たちは計画のあらゆる側面について話した。
e2681|I finished my math assignment.|数学の課題を終えた。
e2682|The restaurant has a nice atmosphere.|そのレストランは雰囲気がいい。
e2683|He is an authority on dinosaurs.|彼は恐竜の権威だ。
e2684|There are mountains in the background of the photo.|写真の背景に山が写っている。
e2685|I lost my balance and fell.|バランスを崩して転んだ。
e2686|There is a ban on fishing here.|ここでは釣りが禁止されている。
e2687|The base of the lamp is heavy.|そのランプの土台は重い。
e2688|I exercise on a daily basis.|私は毎日運動している。
e2689|Let's sit on that bench.|あのベンチに座ろう。
e2690|There is a strong bond between them.|2人の間には強いきずながある。
e2691|The river forms the boundary between the towns.|その川が町の境界になっている。
e2692|What brand of shoes do you like?|どのブランドの靴が好き？
e2693|The house is made of brick.|その家はれんが造りだ。
e2694|We are traveling on a small budget.|私たちは少ない予算で旅行している。
e2695|I don't want to be a burden to you.|あなたの負担になりたくない。
e2696|They started a campaign to clean the beach.|彼らは海岸をきれいにする運動を始めた。
e2697|There are three candidates for class president.|学級委員長の候補者は3人いる。
e2698|The stadium has a capacity of 50,000.|そのスタジアムの収容人数は5万人だ。
e2699|She wants a career in science.|彼女は科学の仕事に就きたいと思っている。
e2700|Which category does this book belong to?|この本はどの分類に入る？
e2701|The dog was tied with a chain.|その犬は鎖でつながれていた。
e2702|Kindness is her best characteristic.|親切さが彼女のいちばんの特徴だ。
e2703|This old town has a special charm.|この古い町には特別な魅力がある。
e2704|Under these circumstances, we must wait.|こういう状況では、待つしかない。
e2705|Egypt had an ancient civilization.|エジプトには古代文明があった。
e2706|The detective found an important clue.|探偵は重要な手がかりを見つけた。
e2707|America was once a British colony.|アメリカはかつてイギリスの植民地だった。
e2708|The temple has tall stone columns.|その神殿には高い石の柱がある。
e2709|Red and green is a nice combination.|赤と緑はいい組み合わせだ。
e2710|Her words gave me comfort.|彼女の言葉に慰められた。
e2711|This city is a center of commerce.|この市は商業の中心地だ。
e2712|She is on the school committee.|彼女は学校の委員会に入っている。
e2713|Let's make a comparison of the two plans.|二つの計画を比較してみよう。
e2714|The hotel got many complaints.|そのホテルには多くの苦情が来た。
e2715|Time is a difficult concept.|時間は難しい概念だ。
e2716|We came to a conclusion.|私たちは結論に達した。
e2717|My father went to a conference.|父は会議に出かけた。
e2718|They solved the conflict by talking.|彼らは話し合いで対立を解決した。
e2719|Think about the consequences first.|まず結果をよく考えなさい。
e2720|Check the contents of the box.|箱の中身を確認して。
e2721|Guess the meaning from the context.|文脈から意味を推測しよう。
e2722|He signed the contract today.|彼は今日、契約書にサインした。
e2723|There is a big contrast between them.|両者には大きな違いがある。
e2724|Thank you for your contribution.|ご協力ありがとうございます。
e2725|I bought milk at a convenience store.|コンビニで牛乳を買った。
e2726|She works for a big corporation.|彼女は大企業で働いている。
e2727|This shirt is made of cotton.|このシャツは綿でできている。
e2728|The city council met last night.|昨夜、市議会が開かれた。
e2729|We played on the tennis court.|私たちはテニスコートでプレーした。
e2730|The country faced an energy crisis.|その国はエネルギー危機に直面した。
e2731|He listened to the criticism calmly.|彼は批判を落ち着いて聞いた。
e2732|The yen is Japan's currency.|円は日本の通貨だ。
e2733|Water moves in a cycle.|水は循環している。
e2734|We made a good deal.|私たちはいい取引をした。
e2735|He finally paid off his debt.|彼はついに借金を返した。
e2736|Our team has a strong defense.|うちのチームは守りが強い。
e2737|The delivery will come tomorrow.|配達は明日来る予定だ。
e2738|Voting is important in a democracy.|民主主義では投票が大切だ。
e2739|Check the departure time.|出発時刻を確認して。
e2740|We waited for his arrival.|私たちは彼の到着を待った。
e2741|I made a deposit at the bank.|銀行に預金した。
e2742|Read the description on the box.|箱の説明を読んで。
e2743|The storm caused great destruction.|嵐は大きな破壊をもたらした。
e2744|This device measures the temperature.|この装置は温度を測る。
e2745|She had difficulty sleeping.|彼女はなかなか眠れなかった。
e2746|Being short is not a disadvantage.|背が低いことは不利ではない。
e2747|Sports teach us discipline.|スポーツは規律を教えてくれる。
e2748|This drug helps with headaches.|この薬は頭痛に効く。
e2749|Don't stand near the edge.|端の近くに立たないで。
e2750|This car has good fuel efficiency.|この車は燃費がいい。
e2751|Trust is an important element.|信頼は大切な要素だ。
e2752|Our school puts emphasis on reading.|私たちの学校は読書に力を入れている。
e2753|He is looking for employment.|彼は職を探している。
e2754|She showed great enthusiasm for music.|彼女は音楽に大きな熱意を見せた。
e2755|No entry without a ticket.|チケットがないと入場できません。
e2756|We live in the digital era.|私たちはデジタル時代に生きている。
e2757|The police found new evidence.|警察は新しい証拠を見つけた。
e2758|Darwin studied evolution.|ダーウィンは進化を研究した。
e2759|Every rule has an exception.|どんな規則にも例外がある。
e2760|Do you believe in the existence of ghosts?|幽霊の存在を信じる？
e2761|Travel is a big expense.|旅行は大きな出費だ。
e2762|I agree with you to some extent.|ある程度はあなたに賛成だ。
e2763|Weather is a big factor.|天気は大きな要因だ。
e2764|I have faith in you.|私はあなたを信頼している。
e2765|The singer found fame young.|その歌手は若くして有名になった。
e2766|It wasn't your fault.|あなたのせいじゃないよ。
e2767|Can I ask you a favor?|お願いしてもいい？
e2768|She studies finance at college.|彼女は大学で金融を学んでいる。
e2769|He made a fortune in business.|彼は商売で財産を築いた。
e2770|Reading is the foundation of learning.|読書は学びの基礎だ。
e2771|I put the photo in a frame.|写真を額縁に入れた。
e2772|We raised funds for the library.|図書館のために資金を集めた。
e2773|Many people came to the funeral.|たくさんの人が葬式に来た。
e2774|Mind the gap.|すき間にご注意ください。
e2775|Eye color is decided by genes.|目の色は遺伝子で決まる。
e2776|Einstein was a genius.|アインシュタインは天才だった。
e2777|Rice is an important grain.|米は大切な穀物だ。
e2778|Gravity pulls things down.|重力は物を下に引っぱる。
e2779|Every household has a TV.|どの家庭にもテレビがある。
e2780|The war was a crime against humanity.|その戦争は人類に対する罪だった。
e2781|This is an ideal place for a picnic.|ここはピクニックに理想的な場所だ。
e2782|Please show proof of identity.|身分証明書を見せてください。
e2783|The lines look bent, but it's an illusion.|線が曲がって見えるが、錯覚だ。
e2784|The book had a big impact on me.|その本は私に大きな影響を与えた。
e2785|She made a good impression.|彼女はいい印象を与えた。
e2786|Tell me about the incident.|その出来事について教えて。
e2787|The country won its independence.|その国は独立を勝ち取った。
e2788|Every individual is different.|一人ひとりはみんな違う。
e2789|The infant was sleeping quietly.|赤ちゃんは静かに眠っていた。
e2790|The island has few inhabitants.|その島には住民が少ない。
e2791|The book gave me new insight.|その本から新しい見方を得た。
e2792|I like fruit, for instance, apples.|果物が好き、たとえばりんご。
e2793|Birds build nests by instinct.|鳥は本能で巣を作る。
e2794|A university is an educational institution.|大学は教育機関だ。
e2795|Do you have travel insurance?|旅行保険に入っていますか？
e2796|Dolphins have high intelligence.|イルカは知能が高い。
e2797|I had no intention of hurting you.|あなたを傷つけるつもりはなかった。
e2798|Education is a good investment.|教育はよい投資だ。
e2799|I write in my journal every night.|毎晩日誌をつけている。
e2800|I trust your judgment.|あなたの判断を信じるよ。
e2801|They fought for justice.|彼らは正義のために戦った。
e2802|Farm work needs a lot of labor.|農作業には多くの労働が必要だ。
e2803|The mountain landscape was beautiful.|山の景色は美しかった。
e2804|Wear layers on cold days.|寒い日は重ね着をしよう。
e2805|What do you do in your leisure time?|余暇に何をしていますか？
e2806|The Statue of Liberty is in New York.|自由の女神はニューヨークにある。
e2807|This is a chance of a lifetime.|これは一生に一度のチャンスだ。
e2808|I don't follow your logic.|あなたの理屈がわからない。
e2809|A hot bath is my little luxury.|熱いお風呂は私のちょっとしたぜいたくだ。
e2810|The majority of students agreed.|大多数の生徒が賛成した。
e2811|Only a minority voted no.|反対したのは少数だけだった。
e2812|The manufacturer fixed the problem.|製造元がその問題を直した。
e2813|A mass of people gathered.|大勢の人が集まった。
e2814|This clock has a simple mechanism.|この時計は仕組みが簡単だ。
e2815|I renewed my gym membership.|ジムの会員を更新した。
e2816|The merchant sold silk and spices.|その商人は絹と香辛料を売っていた。
e2817|Sleep a minimum of seven hours.|最低7時間は眠りなさい。
e2818|The maximum speed here is 40.|ここの最高速度は40だ。
e2819|The minister gave a speech.|大臣が演説をした。
e2820|Their mission was to reach the moon.|彼らの任務は月に到達することだった。
e2821|Pour the mixture into the pan.|混ぜたものをなべに入れて。
e2822|We visited the war monument.|私たちは戦争の記念碑を訪れた。
e2823|Watch the motion of the waves.|波の動きを見てごらん。
e2824|What was his motive?|彼の動機は何だったのか？
e2825|It's a myth that goldfish forget fast.|金魚がすぐ忘れるというのは作り話だ。
e2826|She hurt a nerve in her arm.|彼女は腕の神経を痛めた。
e2827|I have no notion of what he means.|彼の言いたいことがさっぱりわからない。
e2828|Good nutrition keeps you healthy.|よい栄養は健康を保つ。
e2829|You have no obligation to buy.|買う義務はありません。
e2830|We wrote down our observations.|私たちは観察したことを書き留めた。
e2831|We got over many obstacles.|私たちは多くの障害を乗り越えた。
e2832|Wear this dress on special occasions.|特別なときにこのドレスを着てね。
e2833|Write your occupation here.|ここにご職業を書いてください。
e2834|Shake hands with your opponent.|対戦相手と握手しなさい。
e2835|We have two options.|選択肢は二つある。
e2836|The moon is in orbit around the earth.|月は地球の周りの軌道を回っている。
e2837|The heart is an important organ.|心臓は大切な器官だ。
e2838|We need oxygen to live.|私たちは生きるのに酸素が必要だ。
e2839|Walk at your own pace.|自分のペースで歩きなさい。
e2840|Don't panic! Stay calm.|あわてないで！落ち着いて。
e2841|Each participant got a T-shirt.|参加者はそれぞれTシャツをもらった。
e2842|Read the passage aloud.|その一節を声に出して読みなさい。
e2843|Try to see it from my perspective.|私の視点から見てみて。
e2844|A rainbow is a natural phenomenon.|虹は自然現象だ。
e2845|He studied philosophy in Germany.|彼はドイツで哲学を学んだ。
e2846|There is a pile of books on the desk.|机の上に本の山がある。
e2847|She was a pioneer in science.|彼女は科学の先駆者だった。
e2848|The movie has a simple plot.|その映画は筋が単純だ。
e2849|Honesty is the best policy.|正直は最善の策。
e2850|This restaurant serves large portions.|このレストランは量が多い。
e2851|She painted a portrait of her mother.|彼女は母の肖像画を描いた。
e2852|There is a possibility of rain.|雨の可能性がある。
e2853|This boy has great potential.|この少年には大きな可能性がある。
e2854|Do you have a preference?|何かお好みはありますか？
e2855|We must fight against prejudice.|私たちは偏見と戦わなければならない。
e2856|Thank you for your presence today.|本日はご出席ありがとうございます。
e2857|It's against my principles.|それは私の主義に反する。
e2858|Safety is our top priority.|安全が最優先だ。
e2859|Please respect my privacy.|私のプライバシーを尊重してください。
e2860|Follow the safety procedure.|安全手順に従いなさい。
e2861|She is a lawyer by profession.|彼女の職業は弁護士だ。
e2862|The shop made a small profit.|その店は少し利益を出した。
e2863|A large proportion of people agree.|かなりの割合の人が賛成している。
e2864|They accepted my proposal.|彼らは私の提案を受け入れた。
e2865|The prospects for the future are good.|将来の見通しは明るい。
e2866|Wear a hat for sun protection.|日よけに帽子をかぶりなさい。
e2867|My sister studies psychology.|姉は心理学を勉強している。
e2868|The punishment was too hard.|その罰は厳しすぎた。
e2869|Quality is more important than quantity.|量より質が大切だ。
e2870|The shop sells a wide range of goods.|その店は幅広い商品を売っている。
e2871|He got recognition for his work.|彼は仕事を認められた。
e2872|I wish you a quick recovery.|早くよくなりますように。
e2873|There was a reduction in prices.|値下げがあった。
e2874|Keep this book for reference.|この本を参考用に取っておいて。
e2875|The school needs reform.|その学校には改革が必要だ。
e2876|Many refugees crossed the border.|多くの難民が国境を越えた。
e2877|Japan has good relations with them.|日本は彼らとよい関係にある。
e2878|Honey is a good remedy for a cough.|はちみつはせきによく効く。
e2879|This restaurant has a good reputation.|このレストランは評判がいい。
e2880|What are the requirements for the job?|その仕事の条件は何ですか？
e2881|The residents cleaned the park.|住民たちが公園を掃除した。
e2882|They met strong resistance.|彼らは強い抵抗にあった。
e2883|My New Year's resolution is to read more.|新年の抱負はもっと本を読むことだ。
e2884|The Industrial Revolution began in Britain.|産業革命はイギリスで始まった。
e2885|Clap your hands to the rhythm.|リズムに合わせて手をたたこう。
e2886|The project is on a large scale.|その計画は大規模だ。
e2887|They had a scheme to make money.|彼らはお金をもうける計画を立てていた。
e2888|He is a famous history scholar.|彼は有名な歴史学者だ。
e2889|She won a scholarship to college.|彼女は大学の奨学金を得た。
e2890|That is beyond the scope of this class.|それはこの授業の範囲外だ。
e2891|There is a big sculpture in the park.|公園に大きな彫刻がある。
e2892|She works in the public sector.|彼女は公共部門で働いている。
e2893|This store has a good selection.|この店は品ぞろえがいい。
e2894|Put the pictures in sequence.|絵を順番に並べなさい。
e2895|They reached a settlement.|彼らは和解に達した。
e2896|Let's rest in the shade.|日陰で休もう。
e2897|What a shame you can't come!|来られないなんて残念！
e2898|Put your signature here.|ここに署名してください。
e2899|Do you know the significance of this day?|この日の意義を知っていますか？
e2900|We skied down the slope.|私たちは斜面をスキーで滑り降りた。
e2901|This species of bird is rare.|この種の鳥は珍しい。
e2902|The mayor made a statement.|市長が声明を出した。
e2903|These statistics show a big change.|これらの統計は大きな変化を示している。
e2904|Check the status of your order.|注文の状況を確認してください。
e2905|Water is a common substance.|水はありふれた物質だ。
e2906|We live in a quiet suburb.|私たちは静かな郊外に住んでいる。
e2907|He had surgery on his knee.|彼はひざの手術を受けた。
e2908|A fever is a symptom of the flu.|熱はインフルエンザの症状だ。
e2909|I have sympathy for him.|私は彼に同情している。
e2910|He has a tendency to be late.|彼は遅れがちだ。
e2911|There was tension in the room.|部屋には緊張感があった。
e2912|Dogs protect their territory.|犬は自分のなわばりを守る。
e2913|Music therapy helps many people.|音楽療法は多くの人を助けている。
e2914|The tide is coming in.|潮が満ちてきている。
e2915|Don't speak to me in that tone.|そんな口調で話さないで。
e2916|We found bear tracks in the snow.|雪の中にクマの足跡を見つけた。
e2917|Romeo and Juliet is a tragedy.|『ロミオとジュリエット』は悲劇だ。
e2918|Patience is a good trait.|忍耐強さはよい特性だ。
e2919|Public transportation is cheap here.|ここは公共交通機関が安い。
e2920|The mouse got caught in a trap.|ネズミがわなにかかった。
e2921|The two countries signed a peace treaty.|両国は平和条約に調印した。
e2922|You can use it for a free trial.|無料お試しで使えます。
e2923|The tribe lives in the forest.|その部族は森に住んでいる。
e2924|The concert was a triumph.|コンサートは大成功だった。
e2925|She hummed a happy tune.|彼女は楽しい曲を口ずさんだ。
e2926|He joined the workers' union.|彼は労働組合に入った。
e2927|Please turn down the volume.|音量を下げてください。
e2928|The minimum wage went up.|最低賃金が上がった。
e2929|Health is better than wealth.|健康は富にまさる。
e2930|She works in social welfare.|彼女は社会福祉の仕事をしている。
e2931|My grandma is full of wisdom.|祖母は知恵にあふれている。
e2932|The witness saw the accident.|目撃者は事故を見た。
e2933|This movie is worth watching.|この映画は見る価値がある。
e2934|The forest is the bears' habitat.|森はクマの生息地だ。
e2935|The sun rose above the horizon.|太陽が地平線から昇った。
e2936|My ancestors came from Kyoto.|私の先祖は京都の出身だ。
e2937|He is a descendant of a samurai.|彼は侍の子孫だ。
e2938|Her parents were immigrants.|彼女の両親は移民だった。
e2939|I had lunch with a colleague.|同僚と昼食をとった。
e2940|My dog is my best companion.|犬は私の最高の相棒だ。
e2941|The emperor lived in a palace.|皇帝は宮殿に住んでいた。
e2942|The politician promised lower taxes.|その政治家は減税を約束した。
e2943|He is the fire chief.|彼は消防署長だ。
e2944|The mayor opened the new park.|市長が新しい公園を開いた。
e2945|You should see a specialist.|専門医に診てもらったほうがいい。
e2946|The crew welcomed us on board.|乗組員が機内で私たちを迎えた。
e2947|Which airline are you flying with?|どの航空会社で行くの？
e2948|She doesn't wear much jewelry.|彼女はあまりアクセサリーをつけない。
e2949|He wore a pirate costume.|彼は海賊の衣装を着た。
e2950|This fabric is soft.|この布地はやわらかい。
e2951|He bought a leather jacket.|彼は革のジャケットを買った。
e2952|The bridge is made of steel.|その橋は鋼鉄でできている。
e2953|Iron the shirt, please.|シャツにアイロンをかけてね。
e2954|This scarf is made of silk.|このスカーフは絹でできている。
e2955|Wool keeps you warm.|羊毛は暖かい。
e2956|Bread is made from wheat.|パンは小麦から作られる。
e2957|The train ran on coal.|その列車は石炭で走った。
e2958|Gold is a valuable mineral.|金は価値のある鉱物だ。
e2959|Water is a liquid.|水は液体だ。
e2960|Ice is a solid.|氷は固体だ。
e2961|We saw a dinosaur fossil.|恐竜の化石を見た。
e2962|The shelf is covered with dust.|棚がほこりで覆われている。
e2963|My shoes are covered in mud.|靴が泥だらけだ。
e2964|The fog is very thick today.|今日は霧がとても濃い。
e2965|There was frost on the window.|窓に霜がついていた。
e2966|A cool breeze is blowing.|涼しいそよ風が吹いている。
e2967|The hurricane hit Florida.|ハリケーンがフロリダを襲った。
e2968|The volcano sent out ash.|火山が灰を噴き出した。
e2969|The cattle are eating grass.|牛たちが草を食べている。
e2970|He climbed the ladder.|彼ははしごを登った。
e2971|Hit the nail with a hammer.|金づちでくぎを打って。
e2972|Thread the needle, please.|針に糸を通してね。
e2973|I need red thread.|赤い糸が必要だ。
e2974|She painted her nails pink.|彼女はつめをピンクに塗った。
e2975|Put the cookies in the jar.|クッキーをびんに入れて。
e2976|Carry the cups on a tray.|カップをお盆で運んで。
e2977|Put the kettle on, please.|やかんを火にかけてね。
e2978|The spoons are in the top drawer.|スプーンは一番上の引き出しにある。
e2979|Hang your coat in the closet.|コートをクローゼットにかけて。
e2980|The plates are in the cupboard.|お皿は食器棚にある。
e2981|Don't spill juice on the carpet.|じゅうたんにジュースをこぼさないで。
e2982|Leave your shoes in the hallway.|靴は玄関に置いてね。
e2983|We hung the laundry on the balcony.|洗濯物をベランダに干した。
e2984|The old toys are in the basement.|古いおもちゃは地下室にある。
e2985|Dad mows the lawn on Sundays.|父は日曜に芝刈りをする。
e2986|Water runs through this pipe.|水はこの管を通って流れる。
e2987|Don't touch the wire.|その電線にさわらないで。
e2988|Pull out the plug, please.|プラグを抜いてください。
e2989|We looked at the moon through a telescope.|望遠鏡で月を見た。
e2990|Look at the cells under a microscope.|顕微鏡で細胞を見なさい。
e2991|Use a compass to find north.|方位磁針で北を見つけよう。
e2992|I hit my elbow on the table.|テーブルにひじをぶつけた。
e2993|She wears a watch on her wrist.|彼女は手首に時計をしている。
e2994|I twisted my ankle.|足首をひねった。
e2995|She put her hands on her hips.|彼女は腰に手を当てた。
e2996|This belt is too big for my waist.|このベルトは私の腰には大きすぎる。
e2997|He touched my forehead.|彼は私のおでこに触れた。
e2998|She raised her eyebrows.|彼女はまゆを上げた。
e2999|Smoking is bad for your lungs.|たばこは肺に悪い。
e3000|Hold the coin in your palm.|コインを手のひらにのせて。
e3001|My heel hurts after the walk.|散歩のあとかかとが痛い。
e3002|My grandpa has a white beard.|祖父は白いあごひげを生やしている。
e3003|Add a little vinegar to the salad.|サラダにお酢を少し加えて。
e3004|Spinach is good for you.|ホウレンソウは体にいい。
e3005|Eat your broccoli, please.|ブロッコリーを食べてね。
e3006|I had bacon and eggs for breakfast.|朝食にベーコンエッグを食べた。
e3007|I eat cereal with milk.|シリアルに牛乳をかけて食べる。
e3008|Beverages are sold here.|ここで飲み物を売っています。
e3009|Oranges have a lot of vitamin C.|オレンジにはビタミンCがたくさんある。
e3010|Eggs are full of protein.|卵にはタンパク質がたっぷり。
e3011|This cake has many calories.|このケーキはカロリーが高い。
e3012|A whale is a mammal.|クジラは哺乳類だ。
e3013|The lion watched its prey.|ライオンは獲物を見つめた。
e3014|The bird built a nest in the tree.|鳥が木に巣を作った。
e3015|This pillow is filled with feathers.|この枕には羽毛が詰まっている。
e3016|My cat has soft fur.|うちの猫の毛はやわらかい。
e3017|Pigeons are walking in the park.|公園をハトが歩いている。
e3018|A sparrow is singing outside.|外でスズメが鳴いている。
e3019|Adjust the seat before you drive.|運転する前にシートを調整して。
e3020|The noise annoys me.|その音にいらいらする。
e3021|Blend the fruit and milk.|果物と牛乳を混ぜて。
e3022|Classify the animals into groups.|動物をグループに分類しなさい。
e3023|Consult a doctor if it hurts.|痛むなら医者に相談しなさい。
e3024|Convert dollars into yen.|ドルを円に換えて。
e3025|How do you define success?|成功をどう定義しますか？
e3026|She demonstrated how to use it.|彼女は使い方を実演した。
e3027|The train departs at nine.|列車は9時に出発する。
e3028|Dogs can detect many smells.|犬は多くのにおいをかぎ分けられる。
e3029|She devoted her life to music.|彼女は音楽に一生をささげた。
e3030|Our opinions differ.|私たちの意見は異なる。
e3031|Our team dominated the game.|うちのチームが試合を圧倒した。
e3032|The teacher emphasized this point.|先生はこの点を強調した。
e3033|We encountered a bear on the trail.|山道でクマに出くわした。
e3034|Please ensure the door is locked.|ドアに必ず鍵をかけてください。
e3035|Don't exceed the speed limit.|制限速度を超えないで。
e3036|She glanced at the clock.|彼女はちらっと時計を見た。
e3037|Highlight the important words.|大事な語に印をつけなさい。
e3038|What are you trying to imply?|何をほのめかそうとしているの？
e3039|Children learn by interacting with others.|子どもは人と関わって学ぶ。
e3040|It takes years to master a language.|言語を習得するには何年もかかる。
e3041|Nurses monitor the patients.|看護師が患者を見守っている。
e3042|Multiply three by four.|3に4を掛けなさい。
e3043|They negotiated a better price.|彼らはもっと安い値段を交渉した。
e3044|Is this seat occupied?|この席はふさがっていますか？
e3045|Pets are not permitted here.|ここではペットは禁止です。
e3046|He quoted a famous poem.|彼は有名な詩を引用した。
e3047|He ranks first in his class.|彼はクラスで1位だ。
e3048|The club is recruiting new members.|クラブは新しい部員を募集している。
e3049|I need to renew my passport.|パスポートを更新しなくては。
e3050|We resolved the problem together.|私たちは一緒に問題を解決した。
e3051|Reverse the order of the cards.|カードの順番を逆にしなさい。
e3052|I revised my essay twice.|作文を2回見直した。
e3053|Water revived the dying plant.|水で枯れかけた植物が生き返った。
e3054|He seized my arm.|彼は私の腕をつかんだ。
e3055|My sweater shrank in the wash.|セーターが洗濯で縮んだ。
e3056|Summarize the story in three lines.|物語を3行に要約しなさい。
e3057|Let's tackle this problem together.|この問題に一緒に取り組もう。
e3058|These trees yield a lot of fruit.|これらの木はたくさん実をつける。
e3059|Never abandon your pets.|ペットを決して捨ててはいけない。
e3060|A sponge absorbs water.|スポンジは水を吸収する。
e3061|He accused me of lying.|彼は私がうそをついたと責めた。
e3062|Can you alter this dress?|このドレスを直してもらえますか？
e3063|Her talent amazed everyone.|彼女の才能はみんなを驚かせた。
e3064|The clown amused the children.|ピエロは子どもたちを楽しませた。
e3065|We anticipate a large crowd.|大勢の人出を予想している。
e3066|Problems may arise later.|後で問題が起こるかもしれない。
e3067|I assure you it's safe.|安全だと保証します。
e3068|Mozart composed many songs.|モーツァルトは多くの曲を作曲した。
e3069|He tried to conceal his feelings.|彼は気持ちを隠そうとした。
e3070|Crush the garlic with a knife.|ナイフでにんにくをつぶして。
e3071|Sugar can make your teeth decay.|砂糖は虫歯の原因になる。
e3072|The plane began to descend.|飛行機は降下し始めた。
e3073|The pain slowly diminished.|痛みはだんだん弱まった。
e3074|Our team was eliminated in the first round.|うちのチームは1回戦で敗退した。
e3075|She embraced her son at the airport.|彼女は空港で息子を抱きしめた。
e3076|I envy your long vacation.|長い休暇がうらやましい。
e3077|Erase the mistake and try again.|間違いを消してもう一度やろう。
e3078|Don't exclude anyone from the game.|誰も遊びから仲間外れにしないで。
e3079|The museum exhibits old coins.|その博物館は古い硬貨を展示している。
e3080|The plants flourish in the sun.|植物は日なたでよく育つ。
e3081|The cold infected the whole family.|かぜが家族全員にうつった。
e3082|Don't insult my friends.|私の友達をばかにしないで。
e3083|Nothing can justify violence.|何があっても暴力は正当化できない。
e3084|We modified the plan a little.|私たちは計画を少し修正した。
e3085|I didn't mean to offend you.|あなたを怒らせるつもりはなかった。
e3086|I overlooked a small mistake.|小さな間違いを見落とした。
e3087|Polish your shoes before school.|学校に行く前に靴を磨きなさい。
e3088|The brothers often quarrel.|その兄弟はよく口げんかする。
e3089|We need to get rid of old clothes.|古い服を処分しなくちゃ。
e3090|Seal the envelope before mailing it.|出す前に封筒の封をして。
e3091|Let's split the pizza.|ピザを分けよう。
e3092|He steered the boat to the shore.|彼はボートを岸へ操縦した。
e3093|A bee stung my arm.|ハチに腕を刺された。
e3094|She stroked the cat's back.|彼女は猫の背中をなでた。
e3095|The game was suspended because of rain.|試合は雨で一時中断された。
e3096|My ankle began to swell.|足首が腫れはじめた。
e3097|Toss me the ball!|ボールを投げて！
e3098|She wept at the sad ending.|彼女は悲しい結末に涙を流した。
e3099|I withdrew some money from the bank.|銀行でお金を少し引き出した。
e3100|Children must be accompanied by an adult.|子どもは大人の同伴が必要です。
e3101|Children acquire language quickly.|子どもは言葉をすぐに身につける。
e3102|The teacher assessed our work.|先生は私たちの作品を評価した。
e3103|She enrolled in a cooking class.|彼女は料理教室に申し込んだ。
e3104|Please specify the size you want.|ご希望のサイズを指定してください。
e3105|People worshiped the sun long ago.|昔、人々は太陽を崇拝した。
e3106|The analysis took two weeks.|分析には2週間かかった。
e3107|I love old Japanese architecture.|私は古い日本建築が大好きだ。
e3108|Wash your hands to remove bacteria.|手を洗って細菌を落とそう。
e3109|Don't touch those chemicals.|その化学薬品にさわらないで。
e3110|Our school has a dress code.|私たちの学校には服装の決まりがある。
e3111|Energy consumption is rising.|エネルギー消費が増えている。
e3112|Art helps develop creativity.|芸術は創造力を育てる。
e3113|She got credit for the idea.|そのアイデアは彼女の手柄になった。
e3114|Children are full of curiosity.|子どもは好奇心でいっぱいだ。
e3115|We celebrate diversity at our school.|私たちの学校は多様性を大切にしている。
e3116|Pollution harms the ecosystem.|汚染は生態系を損なう。
e3117|Everyone wants equality.|誰もが平等を望んでいる。
e3118|Our galaxy is called the Milky Way.|私たちの銀河は天の川銀河と呼ばれる。
e3119|Find Japan on the globe.|地球儀で日本を見つけて。
e3120|We should live in harmony with nature.|私たちは自然と調和して生きるべきだ。
e3121|The smartphone was a great innovation.|スマートフォンは大きな革新だった。
e3122|There is a legend about this lake.|この湖には伝説がある。
e3123|They have a happy marriage.|彼らは幸せな結婚生活を送っている。
e3124|It's a miracle that you survived.|あなたが助かったのは奇跡だ。
e3125|I lost my motivation to study.|勉強のやる気がなくなった。
e3126|Water is a necessity of life.|水は生活の必需品だ。
e3127|We are happy with the outcome.|私たちはその結果に満足している。
e3128|Cars must stop for pedestrians.|車は歩行者のために止まらなければならない。
e3129|Ask your physician for advice.|医師に助言を求めてください。
e3130|The poll shows most people agree.|世論調査ではほとんどの人が賛成している。
e3131|Do you have any siblings?|きょうだいはいますか？
e3132|Our class made a safety slogan.|私たちのクラスは安全の標語を作った。
e3133|The vaccine protects you from the flu.|ワクチンはインフルエンザから身を守る。
e3134|The voyage took three months.|航海は3か月かかった。
e3135|The boxes are kept in a warehouse.|箱は倉庫に保管されている。
e3136|We need more awareness of the problem.|その問題をもっと意識する必要がある。
e3137|Her ambition is to be a pilot.|彼女の夢はパイロットになることだ。
e3138|The singer got loud applause.|その歌手は大きな拍手を受けた。
e3139|My uncle is an architect.|おじは建築家だ。
e3140|I joined the astronomy club.|天文部に入った。
e3141|I read a biography of Edison.|エジソンの伝記を読んだ。
e3142|Scientists made a breakthrough.|科学者たちは大発見をした。
e3143|Drive with caution in the snow.|雪道では注意して運転しなさい。
e3144|The kitchen was in chaos.|台所は大混乱だった。
e3145|She treats animals with compassion.|彼女は動物に思いやりを持って接する。
e3146|We reached a compromise.|私たちは妥協点に達した。
e3147|Forest conservation is important.|森林保護は大切だ。
e3148|I love Italian cuisine.|私はイタリア料理が大好きだ。
e3149|We left home at dawn.|夜明けに家を出た。
e3150|My grandma speaks the Osaka dialect.|祖母は大阪弁を話す。
e3151|Everyone has the right to dignity.|すべての人に尊厳がある。
e3152|The school helps students with disabilities.|その学校は障がいのある生徒を支援している。
e3153|We must cut carbon emissions.|二酸化炭素の排出を減らさなければならない。
e3154|The Roman Empire was huge.|ローマ帝国は巨大だった。
e3155|Look it up in the encyclopedia.|百科事典で調べてごらん。
e3156|They went on an expedition to the South Pole.|彼らは南極へ探検に出かけた。
e3157|Pandas were in danger of extinction.|パンダは絶滅の危機にあった。
e3158|The candle flame is moving.|ろうそくの炎がゆれている。
e3159|Old folks love this song.|お年寄りはこの歌が大好きだ。
e3160|Remember this math formula.|この数学の公式を覚えなさい。
e3161|Space is the final frontier.|宇宙は最後のフロンティアだ。
e3162|She was full of grief after the loss.|彼女は喪失のあと深い悲しみに沈んだ。
e3163|Please follow these guidelines.|これらの指針に従ってください。
e3164|We went through immigration at the airport.|空港で入国審査を通った。
e3165|The king ruled a small kingdom.|王は小さな王国を治めていた。
e3166|Tokyo Tower is a famous landmark.|東京タワーは有名な名所だ。
e3167|Literacy rates are high in Japan.|日本は識字率が高い。
e3168|The moon landing was a big step for mankind.|月面着陸は人類にとって大きな一歩だった。
e3169|The Mona Lisa is a masterpiece.|モナ・リザは傑作だ。
e3170|We watched the migration of birds.|私たちは鳥の渡りを観察した。
e3171|My grandfather was in the navy.|祖父は海軍にいた。
e3172|Write an outline before the essay.|作文の前に概要を書きなさい。
e3173|The parliament passed a new law.|議会は新しい法律を可決した。
e3174|We had heavy rainfall last night.|昨夜は大雨が降った。
e3175|We have a rehearsal for the play today.|今日は劇のリハーサルがある。
e3176|Grandpa enjoys his retirement.|祖父は退職後の生活を楽しんでいる。
e3177|I love the scent of roses.|バラの香りが大好きだ。
e3178|We reached the summit at noon.|私たちは正午に頂上に着いた。
e3179|The surgeon saved his life.|外科医が彼の命を救った。
e3180|He reported the theft to the police.|彼は盗難を警察に届けた。
e3181|College tuition is expensive.|大学の授業料は高い。
e3182|Let's sing the second verse.|2番を歌おう。
e3183|They camped in the wilderness.|彼らは荒野でキャンプをした。
e3184|The academic year starts in April.|学年は4月に始まる。
e3185|Love is an abstract idea.|愛は抽象的な概念だ。
e3186|I have absolute trust in her.|私は彼女を完全に信頼している。
e3187|Get an adequate amount of sleep.|十分な睡眠をとりなさい。
e3188|That was a bold decision.|それは大胆な決断だった。
e3189|This movie is a classic.|この映画は名作だ。
e3190|This is a crucial moment.|今がとても大事な瞬間だ。
e3191|There is a distinct smell of gas.|はっきりとガスのにおいがする。
e3192|She is a dynamic leader.|彼女は活動的なリーダーだ。
e3193|They promised eternal love.|彼らは永遠の愛を誓った。
e3194|It was evident that she was tired.|彼女が疲れているのは明らかだった。
e3195|We ate exotic fruit in Thailand.|タイで珍しい果物を食べた。
e3196|This medicine is for external use only.|この薬は外用専用です。
e3197|I heard a faint sound.|かすかな音が聞こえた。
e3198|It was a fatal mistake.|それは致命的な誤りだった。
e3199|The tiger looked fierce.|そのトラはどう猛に見えた。
e3200|We stayed at a grand hotel.|私たちは豪華なホテルに泊まった。
e3201|It was extremely cold this morning.|今朝は極めて寒かった。
e3202|Children generally like sweets.|子どもは一般に甘いものが好きだ。
e3203|I mainly eat rice for breakfast.|私は朝ごはんに主にごはんを食べる。
e3204|I particularly like this song.|私は特にこの歌が好きだ。
e3205|This book is highly recommended.|この本は非常におすすめだ。
e3206|I totally forgot about the meeting.|会議のことをまったく忘れていた。
e3207|He frequently visits his grandmother.|彼は頻繁に祖母を訪ねる。
e3208|Just smile and act naturally.|ただ笑って自然にふるまって。
e3209|Please answer honestly.|正直に答えてください。
e3210|The room was entirely empty.|部屋は完全に空っぽだった。
e3211|It is getting increasingly hot.|ますます暑くなっている。
e3212|She uses her time effectively.|彼女は時間を効果的に使う。
e3213|We shared the cake equally.|私たちはケーキを等しく分けた。
e3214|I go to the dentist regularly.|私は定期的に歯医者に行く。
e3215|The twins dress similarly.|その双子は同じような服装をしている。
e3216|My father is originally from Osaka.|父は元々は大阪の出身だ。
e3217|I normally get up at six.|私は普段は6時に起きる。
e3218|Personally, I prefer tea.|個人的には紅茶のほうが好きだ。
e3219|The train will arrive shortly.|電車はまもなく到着する。
e3220|Prices have risen significantly.|物価が著しく上がった。
e3221|The town has changed considerably.|町はかなり変わった。
e3222|The baby stopped crying instantly.|赤ちゃんは即座に泣きやんだ。
e3223|I accidentally broke a glass.|うっかりグラスを割ってしまった。
e3224|The door opens automatically.|ドアは自動的に開く。
e3225|He deliberately ignored my question.|彼はわざと私の質問を無視した。
e3226|The two plans are essentially the same.|その二つの計画は本質的に同じだ。
e3227|Initially, I didn't like natto.|最初は納豆が好きではなかった。
e3228|The word literally means big river.|その単語は文字通り「大きな川」という意味だ。
e3229|Expensive food is not necessarily good.|高い食べ物が必ずしもおいしいとは限らない。
e3230|The bottle is practically empty.|瓶はほとんど空だ。
e3231|The mayor apologized publicly.|市長は公に謝罪した。
e3232|Please wash white clothes separately.|白い服は別々に洗ってください。
e3233|I sincerely thank you for your help.|手伝ってくれて心から感謝します。
e3234|Her English is improving steadily.|彼女の英語は着実に上達している。
e3235|The rocket was launched successfully.|ロケットは無事に打ち上げられた。
e3236|The shop is temporarily closed.|その店は一時的に閉まっている。
e3237|The work is virtually finished.|仕事は事実上終わっている。
e3238|The kids waited eagerly for Christmas.|子どもたちはクリスマスを心待ちにした。
e3239|Hold the rope firmly.|ロープをしっかりと握って。
e3240|It rained heavily last night.|昨夜は激しく雨が降った。
e3241|He is physically strong.|彼は身体的に強い。
e3242|I was mentally tired after the test.|テストの後、精神的に疲れていた。
e3243|The trip takes approximately two hours.|その旅はおよそ2時間かかる。
e3244|I could barely hear his voice.|彼の声がかろうじて聞こえた。
e3245|He missed the bus and consequently was late.|彼はバスに乗り遅れ、その結果遅刻した。
e3246|Frankly, I don't like this idea.|率直に言って、この考えは好きではない。
e3247|It is old, hence the low price.|それは古い、それゆえ値段が安い。
e3248|It was merely a joke.|それは単なる冗談だった。
e3249|Two kids came, namely Ken and Mai.|二人の子ども、すなわちケンとマイが来た。
e3250|It was raining. Nonetheless, we went out.|雨だった。それでもなお、私たちは出かけた。
e3251|The train left at precisely nine.|電車はちょうど9時に出発した。
e3252|This app is primarily for children.|このアプリは主として子ども向けだ。
e3253|She readily agreed to help.|彼女は快く手伝うことに同意した。
e3254|I could scarcely believe my eyes.|自分の目がほとんど信じられなかった。
e3255|I was somewhat surprised.|私はいくぶん驚いた。
e3256|This book is specifically for beginners.|この本は特に初心者向けだ。
e3257|Smoking is strictly forbidden here.|ここでは喫煙は厳しく禁止されている。
e3258|Wash your hands thoroughly.|手を徹底的に洗いなさい。
e3259|Ultimately, the choice is yours.|最終的には、選ぶのはあなただ。
e3260|Watch me and do likewise.|私を見て同じようにしなさい。
e3261|I like cats, whereas my sister likes dogs.|私は猫が好きなのに対して、妹は犬が好きだ。
e3262|I have a question regarding the test.|テストに関して質問がある。
e3263|Please call me beforehand.|前もって電話してください。
e3264|The road runs alongside the river.|その道は川と並んで走っている。
e3265|The cat slept beneath the table.|猫はテーブルの下で眠った。
e3266|We will go regardless of the weather.|天気にかかわらず私たちは行く。
e3267|He subsequently became a teacher.|彼はその後教師になった。
e3268|This room is solely for staff.|この部屋はもっぱら職員用だ。
e3269|We met purely by chance.|私たちはまったくの偶然で出会った。
e3270|He is famous but very humble.|彼は有名だがとても謙虚だ。
e3271|The castle has an immense garden.|その城には巨大な庭がある。
e3272|Space seems infinite.|宇宙は無限に思える。
e3273|Open the inner door, please.|内側のドアを開けてください。
e3274|She is keen on tennis.|彼女はテニスに熱心だ。
e3275|He is very mature for his age.|彼は年のわりにとても大人びている。
e3276|She was a mere child then.|彼女は当時ほんの子どもだった。
e3277|Helping others is a noble act.|人を助けるのは立派な行いだ。
e3278|Try to give an objective opinion.|客観的な意見を述べるようにしなさい。
e3279|We have an oral test tomorrow.|明日は口頭試験がある。
e3280|Don't be passive in class.|授業で受け身にならないで。
e3281|Give me the precise time.|正確な時間を教えて。
e3282|My aunt is pregnant with twins.|おばは双子を妊娠している。
e3283|I have a prior appointment.|先約がある。
e3284|Thank you for your prompt reply.|すばやいお返事をありがとう。
e3285|Let's make a rational decision.|合理的な決定をしよう。
e3286|Solar power is renewable energy.|太陽光発電は再生可能エネルギーだ。
e3287|He is my rival in the race.|彼はレースでの私の競争相手だ。
e3288|She was sympathetic to my problem.|彼女は私の問題に同情的だった。
e3289|The idea appeals to young people.|その考えは若い人の心に訴える。
e3290|The teacher assigned us homework.|先生は私たちに宿題を出した。
e3291|I associate summer with watermelon.|私は夏といえばスイカを連想する。
e3292|He asserted that he was right.|彼は自分が正しいと断言した。
e3293|Two artists collaborated on the song.|二人のアーティストがその歌で協力した。
e3294|We should conserve water.|私たちは水を節約すべきだ。
e3295|The noise deprived me of sleep.|騒音で眠れなかった。
e3296|The king granted her wish.|王は彼女の願いをかなえた。
e3297|Parents nurture their children.|親は子どもを育てる。
e3298|The benefits outweigh the costs.|利点が費用を上回る。
e3299|A red car overtook us.|赤い車が私たちを追い越した。
e3300|Rabbits reproduce very quickly.|ウサギはとても速く繁殖する。
e3301|The game simulates flying a plane.|そのゲームは飛行機の操縦を再現する。
e3302|The doctor stabilized the patient.|医師は患者の容体を安定させた。
e3303|Exercise strengthens your muscles.|運動は筋肉を強くする。
e3304|I supplement my diet with fruit.|私は食事を果物で補っている。
e3305|She suppressed a laugh.|彼女は笑いをこらえた。
e3306|The dove symbolizes peace.|ハトは平和を象徴する。
e3307|He will undergo surgery next week.|彼は来週手術を受ける。
e3308|The storm weakened overnight.|嵐は一晩で弱まった。
e3309|They are widening the road.|その道路は拡張工事中だ。
e3310|His cold worsened at night.|彼の風邪は夜に悪化した。
e3311|Travel broadens your mind.|旅は視野を広げる。
e3312|Reading deepens your knowledge.|読書は知識を深める。
e3313|Can you shorten these pants?|このズボンを短くしてくれる？
e3314|Butter softens at room temperature.|バターは室温で柔らかくなる。
e3315|Education empowers young people.|教育は若者に力を与える。
e3316|Pollution endangers wild animals.|汚染は野生動物を危険にさらす。
e3317|He always boasts about his car.|彼はいつも自分の車を自慢する。
e3318|I confess that I ate the cake.|ケーキを食べたのは私だと白状します。
e3319|She conquered her fear of water.|彼女は水への恐怖を克服した。
e3320|Words can't convey my thanks.|言葉では感謝を伝えきれない。
e3321|His story doesn't correspond with the facts.|彼の話は事実と一致しない。
e3322|Don't try to deceive me.|私をだまそうとしないで。
e3323|She dedicated her life to music.|彼女は人生を音楽にささげた。
e3324|This word derives from Latin.|この単語はラテン語に由来する。
e3325|Don't let one mistake discourage you.|一度の失敗でがっかりしないで。
e3326|The teacher dismissed the class early.|先生は早めに授業を終わらせた。
e3327|Music can enhance your mood.|音楽は気分を高めることができる。
e3328|Books enrich our lives.|本は私たちの生活を豊かにする。
e3329|The room is equipped with a TV.|その部屋にはテレビが備え付けられている。
e3330|We should exploit this chance.|私たちはこの機会を活用すべきだ。
e3331|The cat fled from the dog.|猫は犬から逃げた。
e3332|The fireflies glowed in the dark.|ホタルが暗闇で光った。
e3333|The king governed the country well.|王は国をうまく治めた。
e3334|The school implemented a new rule.|学校は新しい規則を実施した。
e3335|Don't impose your ideas on others.|自分の考えを人に押しつけないで。
e3336|Insert a coin here.|ここに硬貨を入れてください。
e3337|They inspect the bus every day.|彼らは毎日バスを点検する。
e3338|Water is leaking from the pipe.|パイプから水が漏れている。
e3339|The two roads merge here.|二つの道はここで合流する。
e3340|Some birds migrate south in winter.|冬に南へ渡る鳥もいる。
e3341|The sign misled many drivers.|その標識は多くの運転手を誤解させた。
e3342|They nominated her for class leader.|彼らは彼女を学級委員に推薦した。
e3343|Please notify us of any changes.|変更があればお知らせください。
e3344|If the pain persists, see a doctor.|痛みが続くなら医者に行きなさい。
e3345|Smoking poses a risk to health.|喫煙は健康に危険をもたらす。
e3346|Please proceed to gate five.|5番ゲートへお進みください。
e3347|The town prospered after the war.|その町は戦後に繁栄した。
e3348|Don't provoke the dog.|犬を怒らせてはいけない。
e3349|She recited a poem in class.|彼女は授業で詩を暗唱した。
e3350|They reinforced the old bridge.|彼らは古い橋を補強した。
e3351|He remarked that it was cold.|彼は寒いと述べた。
e3352|I resent being treated like a child.|子ども扱いされるのは腹が立つ。
e3353|They resorted to violence.|彼らは暴力に訴えた。
e3354|The game will resume after the rain.|試合は雨の後に再開する。
e3355|This cup retains heat well.|このカップは熱をよく保つ。
e3356|The earth rotates once a day.|地球は1日に1回自転する。
e3357|Leaves were scattered on the ground.|葉っぱが地面に散らばっていた。
e3358|He just shrugged and said nothing.|彼はただ肩をすくめて何も言わなかった。
e3359|Soak the beans in water overnight.|豆を一晩水に浸しておきなさい。
e3360|She sued the company.|彼女はその会社を訴えた。
e3361|A teacher supervises the lunch room.|先生が食堂を監督している。
e3362|I swear I didn't take it.|それを取っていないと誓うよ。
e3363|The cake tempted me.|そのケーキに誘惑された。
e3364|Thunder terrifies my dog.|雷は私の犬をひどく怖がらせる。
e3365|He undertook the difficult job.|彼はその難しい仕事を引き受けた。
e3366|We utilize sunlight to make power.|私たちは日光を利用して電気を作る。
e3367|We ventured into the dark forest.|私たちは思い切って暗い森に入った。
e3368|Dust can trigger a cough.|ほこりはせきを引き起こすことがある。
e3369|Please accept my apology.|どうか私の謝罪を受け入れてください。
e3370|We bought a new kitchen appliance.|新しい台所の電化製品を買った。
e3371|We need our parents' approval.|私たちは両親の承認が必要だ。
e3372|He sold his old guitar at an auction.|彼は古いギターをオークションで売った。
e3373|A celebrity came to our town.|有名人が私たちの町に来た。
e3374|This book is a collaboration of two writers.|この本は二人の作家の共同作品だ。
e3375|We watched a comedy last night.|昨夜コメディーを見た。
e3376|Being a parent is a big commitment.|親になることは大きな責任だ。
e3377|Thank you for the compliment.|ほめてくれてありがとう。
e3378|This puzzle needs concentration.|このパズルには集中が必要だ。
e3379|There was some confusion about the time.|時間について少し混乱があった。
e3380|My uncle works as a consultant.|おじはコンサルタントとして働いている。
e3381|The critic loved the movie.|その批評家はその映画を絶賛した。
e3382|We bought the car from a dealer.|販売店で車を買った。
e3383|We put up Christmas decorations.|私たちはクリスマスの飾りつけをした。
e3384|Look up the definition in a dictionary.|辞書で定義を調べなさい。
e3385|What is the depth of this pool?|このプールの深さはどれくらい？
e3386|I love detective stories.|私は探偵小説が大好きだ。
e3387|She showed great determination.|彼女は強い決意を見せた。
e3388|The doctor gave a quick diagnosis.|医師はすぐに診断を下した。
e3389|She received her diploma today.|彼女は今日卒業証書を受け取った。
e3390|We had a small disagreement.|私たちはちょっとした意見の相違があった。
e3391|He has a sleep disorder.|彼は睡眠障害がある。
e3392|The distribution of food was fair.|食料の分配は公平だった。
e3393|Her parents went through a divorce.|彼女の両親は離婚した。
e3394|He is a blood donor.|彼は献血者だ。
e3395|My brother lives in a dormitory.|兄は寮に住んでいる。
e3396|The only drawback is the price.|唯一の欠点は値段だ。
e3397|He saves half of his earnings.|彼は収入の半分を貯金している。
e3398|She started her own enterprise.|彼女は自分の事業を始めた。
e3399|My aunt is a young entrepreneur.|おばは若い起業家だ。
e3400|The teacher gave a fair evaluation.|先生は公平な評価をした。
e3401|The shop is planning an expansion.|その店は拡張を計画している。
e3402|The movie was above my expectations.|その映画は期待以上だった。
e3403|Too much sun exposure is bad for skin.|日光に当たりすぎるのは肌に悪い。
e3404|Please call extension 205.|内線205番に電話してください。
e3405|She studies in the faculty of law.|彼女は法学部で学んでいる。
e3406|Thanks for your feedback.|ご意見ありがとうございます。
e3407|Vegetables are rich in fiber.|野菜は食物繊維が豊富だ。
e3408|He goes to a fitness club.|彼はフィットネスクラブに通っている。
e3409|Yoga improves flexibility.|ヨガは柔軟性を高める。
e3410|I got the flu last winter.|去年の冬インフルエンザにかかった。
e3411|Her fluency in English is amazing.|彼女の英語の流ちょうさはすばらしい。
e3412|He loves new gadgets.|彼は新しい機器が大好きだ。
e3413|Thank you for your generosity.|ご厚意に感謝します。
e3414|Globalization connects the world.|グローバル化は世界をつなぐ。
e3415|I want to show my gratitude.|感謝の気持ちを示したい。
e3416|She waved as a greeting.|彼女はあいさつとして手を振った。
e3417|I bought groceries after work.|仕事の後、食料品を買った。
e3418|Thank you for your guidance.|ご指導ありがとうございます。
e3419|They lived through many hardships.|彼らは多くの苦難を乗り越えた。
e3420|I only read the headlines.|私は見出しだけ読む。
e3421|Thank you for your kind hospitality.|温かいおもてなしをありがとう。
e3422|The humidity is high today.|今日は湿度が高い。
e3423|Water contains hydrogen and oxygen.|水には水素と酸素が含まれる。
e3424|Please show your identification.|身分証を見せてください。
e3425|Children have a rich imagination.|子どもは豊かな想像力を持っている。
e3426|There is no indication of rain.|雨の兆しはない。
e3427|The nurse gave me an injection.|看護師が私に注射をした。
e3428|We need your input on this plan.|この計画についてあなたの意見が必要だ。
e3429|The installation took two hours.|設置には2時間かかった。
e3430|The intensity of the storm grew.|嵐の激しさが増した。
e3431|That is one interpretation of the poem.|それはその詩の一つの解釈だ。
e3432|The castle survived the invasion.|その城は侵略に耐えた。
e3433|Thank you for the invitation.|ご招待ありがとうございます。
e3434|She wants to study journalism.|彼女は報道について学びたい。
e3435|The landlord fixed the window.|大家さんが窓を直してくれた。
e3436|Heavy rain caused a landslide.|大雨で土砂崩れが起きた。
e3437|I like the layout of this room.|この部屋の間取りが好きだ。
e3438|She showed strong leadership.|彼女は強い指導力を見せた。
e3439|A dog's lifespan is about 13 years.|犬の寿命は約13年だ。
e3440|Everyone has limitations.|誰にでも限界はある。
e3441|They got a loan to buy a house.|彼らは家を買うためにローンを組んだ。
e3442|This hotel is in a great location.|このホテルはすばらしい場所にある。
e3443|The elevator is under maintenance.|エレベーターは点検中だ。
e3444|She doesn't wear much makeup.|彼女はあまり化粧をしない。
e3445|Time management is important.|時間の管理は大切だ。
e3446|Write notes in the margin.|余白にメモを書きなさい。
e3447|Mathematics is my favorite subject.|数学は私の好きな教科だ。
e3448|Take the measurements of the window.|窓の寸法を測って。
e3449|The mechanic fixed our car.|整備士が私たちの車を直した。
e3450|Each plan has its merits.|どの計画にもそれぞれ長所がある。
e3451|No offense, but I disagree.|気を悪くしないでほしいけど、反対だ。
e3452|There was strong opposition to the plan.|その計画には強い反対があった。
e3453|Her optimism made us feel better.|彼女の楽観的な姿勢で私たちは元気になった。
e3454|The ownership of the house changed.|その家の所有権が変わった。
e3455|The penalty for being late is a fine.|遅刻の罰は罰金だ。
e3456|You need permission to enter.|入るには許可が必要だ。
e3457|Mom got perfume for her birthday.|母は誕生日に香水をもらった。
e3458|My hobby is photography.|私の趣味は写真撮影だ。
e3459|She enjoys reading poetry.|彼女は詩を読むのが好きだ。
e3460|This watch is my favorite possession.|この時計は私のお気に入りの持ち物だ。
e3461|Add a spoon of milk powder.|粉ミルクを1さじ加えて。
e3462|She felt tired during her pregnancy.|彼女は妊娠中疲れを感じた。
e3463|The priest spoke at the wedding.|結婚式で司祭が話をした。
e3464|The probability of rain is 80 percent.|雨の確率は80パーセントだ。
e3465|Good sleep improves productivity.|よく眠ると生産性が上がる。
e3466|My sister is a computer programmer.|姉はコンピュータープログラマーだ。
e3467|Dad got a promotion at work.|父は会社で昇進した。
e3468|The publisher liked her story.|出版社は彼女の物語を気に入った。
e3469|What qualifications do you need?|どんな資格が必要ですか。
e3470|Do you have any book recommendations?|おすすめの本はありますか。
e3471|Swimming is my favorite recreation.|水泳は私のお気に入りの娯楽だ。
e3472|I saw my reflection in the lake.|湖に映った自分の姿を見た。
e3473|Registration starts at nine.|受付は9時に始まる。
e3474|I set a reminder on my phone.|スマホにリマインダーを設定した。
e3475|Repetition helps you remember words.|繰り返しは単語を覚えるのに役立つ。
e3476|He smiled with satisfaction.|彼は満足してほほえんだ。
e3477|I keep my savings in the bank.|私は貯金を銀行に預けている。
e3478|I joined a seminar on science.|私は科学のセミナーに参加した。
e3479|The king had many servants.|王には多くの召使いがいた。
e3480|The shipment will arrive on Monday.|荷物は月曜日に届く。
e3481|She made a quick sketch of the cat.|彼女は猫を手早くスケッチした。
e3482|Roll up your sleeves.|そでをまくりなさい。
e3483|The city was covered in smog.|街はスモッグに覆われていた。
e3484|Thousands of spectators watched the game.|何千人もの観客がその試合を見た。
e3485|I love buying cute stationery.|かわいい文房具を買うのが大好きだ。
e3486|Steam rose from the hot soup.|熱いスープから湯気が立った。
e3487|Ask your supervisor for help.|上司に助けを求めなさい。
e3488|He is a big supporter of the team.|彼はそのチームの熱心なサポーターだ。
e3489|We listened to a Mozart symphony.|私たちはモーツァルトの交響曲を聴いた。
e3490|A technician fixed the printer.|技術者がプリンターを直した。
e3491|The new tenant moved in yesterday.|新しい入居者が昨日引っ越してきた。
e3492|The bus leaves from terminal two.|バスは第2ターミナルから出る。
e3493|Our team won the tennis tournament.|私たちのチームがテニス大会で優勝した。
e3494|Unemployment is rising in the area.|その地域では失業が増えている。
e3495|This vacuum is very quiet.|この掃除機はとても静かだ。
e3496|We bought ice cream from a street vendor.|露店の売り手からアイスクリームを買った。
e3497|Try to see it from her viewpoint.|彼女の視点から見てごらん。
e3498|You need a visa to visit that country.|その国を訪れるにはビザが必要だ。
e3499|Young voters are important.|若い有権者は大切だ。
e3500|Hang your coat in the wardrobe.|コートを衣装だんすに掛けて。
e3501|What is the width of the table?|テーブルの幅はどれくらい？
e3502|Her workplace is near the station.|彼女の職場は駅の近くだ。
e3503|My shirt is full of wrinkles.|私のシャツはしわだらけだ。
e3504|I use an electronic dictionary.|私は電子辞書を使う。
e3505|Is this price acceptable to you?|この値段で受け入れられますか。
e3506|The park is accessible by bus.|その公園にはバスで行きやすい。
e3507|This shop sells affordable clothes.|この店は手ごろな服を売っている。
e3508|That dog can be aggressive.|あの犬は攻撃的になることがある。
e3509|Stay alert when you cross the road.|道を渡るときは油断しないで。
e3510|She is an ambitious young woman.|彼女は野心的な若い女性だ。
e3511|My brother is very artistic.|兄はとても芸術的センスがある。
e3512|She is tall and athletic.|彼女は背が高くて運動が得意だ。
e3513|This restaurant serves authentic Italian food.|このレストランは本場のイタリア料理を出す。
e3514|The shop has an automatic door.|その店には自動ドアがある。
e3515|Walking is beneficial to health.|歩くことは健康に良い。
e3516|We study biological science.|私たちは生物学を勉強している。
e3517|Be cautious on icy roads.|凍った道では慎重に。
e3518|They live in a charming little house.|彼らはすてきな小さな家に住んでいる。
e3519|We visited a coastal town.|私たちは海沿いの町を訪れた。
e3520|This camera is very compact.|このカメラはとても小型だ。
e3521|English is a compulsory subject.|英語は必修科目だ。
e3522|It was considerate of you to call.|電話をくれるなんて思いやりがあるね。
e3523|Thank you for your constructive advice.|建設的な助言をありがとう。
e3524|This cafe is warm and cozy.|このカフェは暖かくて居心地がよい。
e3525|She is a very creative child.|彼女はとても創造的な子どもだ。
e3526|My socks are still damp.|靴下がまだ湿っている。
e3527|We had a delightful evening.|私たちは楽しい夜を過ごした。
e3528|He is determined to win.|彼は勝つと決意している。
e3529|She is a diligent student.|彼女は勤勉な生徒だ。
e3530|We used disposable plates at the picnic.|ピクニックで使い捨ての皿を使った。
e3531|He has a distinctive voice.|彼は独特の声をしている。
e3532|I felt dizzy after the ride.|乗り物の後でめまいがした。
e3533|We need drastic changes.|私たちには思い切った変化が必要だ。
e3534|Are these mushrooms edible?|このキノコは食べられますか。
e3535|This is an educational TV show.|これは教育テレビ番組だ。
e3536|The road seemed endless.|その道は果てしなく思えた。
e3537|One dollar is equivalent to about 150 yen.|1ドルは約150円に相当する。
e3538|These are my everyday shoes.|これは私のふだん履きの靴だ。
e3539|She is an exceptional pianist.|彼女は並外れたピアニストだ。
e3540|Dogs are faithful animals.|犬は忠実な動物だ。
e3541|The police found fake money.|警察は偽札を見つけた。
e3542|The child was frightened of the dark.|その子は暗闇を怖がっていた。
e3543|I bought some frozen fish.|冷凍の魚を買った。
e3544|I get frustrated when I lose.|負けるとイライラする。
e3545|Mom was furious about the mess.|母は散らかっていることに激怒した。
e3546|Eye color is genetic.|目の色は遺伝による。
e3547|Don't be greedy. Share with your sister.|欲張らないで。妹と分けなさい。
e3548|My father is very hardworking.|父はとても働き者だ。
e3549|A newborn baby is helpless.|生まれたばかりの赤ちゃんは無力だ。
e3550|I felt homesick at camp.|キャンプで家が恋しくなった。
e3551|The situation is not hopeless.|状況は絶望的ではない。
e3552|He told a humorous story.|彼はユーモアのある話をした。
e3553|The machines are idle on Sundays.|日曜日は機械が止まっている。
e3554|Is tomorrow inconvenient for you?|明日はご都合が悪いですか。
e3555|The school has an indoor pool.|その学校には屋内プールがある。
e3556|The injured player left the field.|けがをした選手がフィールドを去った。
e3557|I had instant noodles for lunch.|昼ごはんにインスタントラーメンを食べた。
e3558|I took an intensive English course.|私は英語の集中講座を受けた。
e3559|The museum has interactive displays.|その博物館には体験型の展示がある。
e3560|He is a leading scientist in Japan.|彼は日本の一流の科学者だ。
e3561|They became lifelong friends.|彼らは生涯の友人になった。
e3562|We stayed at a luxurious hotel.|私たちは豪華なホテルに泊まった。
e3563|It was a magical night.|魔法のような夜だった。
e3564|It was a memorable trip.|それは忘れられない旅だった。
e3565|My room is always messy.|私の部屋はいつも散らかっている。
e3566|One of my socks is missing.|靴下が片方見つからない。
e3567|This cake is soft and moist.|このケーキは柔らかくてしっとりしている。
e3568|I was naive to believe him.|彼を信じるなんて私は世間知らずだった。
e3569|Keep your desk neat and clean.|机をきちんときれいにしておきなさい。
e3570|They live in northern Japan.|彼らは北日本に住んでいる。
e3571|Okinawa is in southern Japan.|沖縄は日本の南部にある。
e3572|My sister is very outgoing.|妹はとても社交的だ。
e3573|The vet says my cat is overweight.|獣医さんは私の猫が太りすぎだと言う。
e3574|You look pale. Are you okay?|顔色が悪いよ。大丈夫？
e3575|He is passionate about soccer.|彼はサッカーに情熱を注いでいる。
e3576|The river is badly polluted.|その川はひどく汚染されている。
e3577|The ending of the movie was predictable.|その映画の結末は予想どおりだった。
e3578|These family photos are priceless.|これらの家族写真はかけがえのないものだ。
e3579|She is a qualified nurse.|彼女は資格を持つ看護師だ。
e3580|A cold drink is refreshing in summer.|夏の冷たい飲み物はさわやかだ。
e3581|Climbing that tree is risky.|あの木に登るのは危険だ。
e3582|We took a scenic route home.|私たちは景色のよい道を通って帰った。
e3583|We enjoy seasonal vegetables.|私たちは旬の野菜を楽しむ。
e3584|He is a skilled carpenter.|彼は腕のいい大工だ。
e3585|The floor is wet and slippery.|床がぬれて滑りやすい。
e3586|I have a sore throat.|のどが痛い。
e3587|Exams are stressful for students.|試験は生徒にとってストレスが多い。
e3588|She wears stylish clothes.|彼女はおしゃれな服を着ている。
e3589|My little brother is very talkative.|弟はとてもおしゃべりだ。
e3590|This soup is really tasty.|このスープは本当においしい。
e3591|We had a technical problem.|技術的な問題があった。
e3592|What a thoughtful gift!|なんて思いやりのある贈り物でしょう！
e3593|It was a tragic accident.|それは痛ましい事故だった。
e3594|He was unaware of the danger.|彼は危険に気づいていなかった。
e3595|The view was unbelievable.|景色は信じられないほどすばらしかった。
e3596|The new rule seems unfair to me.|その新しいルールは不公平だと思う。
e3597|Eating too much candy is unhealthy.|お菓子の食べすぎは体に悪い。
e3598|Turn off unnecessary lights.|不必要な電気は消しなさい。
e3599|Are you ready for the upcoming test?|今度のテストの準備はできてる？
e3600|Is this seat vacant?|この席は空いていますか。
e3601|My sister has been a vegetarian for years.|姉は何年も菜食主義者だ。
e3602|I bought a pair of wireless earphones.|ワイヤレスのイヤホンを買った。
e3603|We need cheap accommodation in Kyoto.|京都で安い宿泊施設が必要だ。
e3604|The new administration made many changes.|新しい政権は多くの変更を行った。
e3605|Adolescents need plenty of sleep.|青年期の若者は十分な睡眠が必要だ。
e3606|She is a strong advocate of free education.|彼女は無償教育の強い支持者だ。
e3607|The aircraft landed safely.|その航空機は無事に着陸した。
e3608|I have an allergy to cats.|私は猫アレルギーがある。
e3609|Japan and the U.S. are allies.|日本とアメリカは同盟国だ。
e3610|The ambassador visited our school.|大使が私たちの学校を訪れた。
e3611|We have a school assembly every Monday.|毎週月曜日に全校集会がある。
e3612|The company sold some of its assets.|その会社は資産の一部を売った。
e3613|That is just an assumption.|それはただの仮定にすぎない。
e3614|We should judge people without bias.|偏見なしに人を判断すべきだ。
e3615|I picked up a travel brochure.|旅行のパンフレットをもらった。
e3616|The prime minister chose a new cabinet.|首相は新しい内閣を選んだ。
e3617|Boats travel along the canal.|船が運河を進んでいく。
e3618|Diamonds are made of carbon.|ダイヤモンドは炭素でできている。
e3619|The flood was a catastrophe for the town.|その洪水は町にとって大惨事だった。
e3620|We visited an old cathedral in Paris.|パリで古い大聖堂を訪れた。
e3621|Our bodies are made of cells.|私たちの体は細胞でできている。
e3622|She bought a ceramic bowl.|彼女は陶磁器のおわんを買った。
e3623|The circuit connects the battery and the light.|その回路は電池と電球をつないでいる。
e3624|Don't stand too close to the cliff.|がけに近づきすぎないで。
e3625|The climax of the movie was exciting.|その映画の最高潮の場面はわくわくした。
e3626|What a coincidence to see you here!|ここで会うなんてすごい偶然だね！
e3627|A commission was set up to study the problem.|その問題を調べるため委員会が作られた。
e3628|Coffee is an important commodity.|コーヒーは重要な商品だ。
e3629|This machine has many small components.|この機械には小さな部品がたくさんある。
e3630|I wrote a composition about my family.|家族についての作文を書いた。
e3631|Water is a compound of hydrogen and oxygen.|水は水素と酸素の化合物だ。
e3632|My conscience told me to tell the truth.|良心が本当のことを言えと告げた。
e3633|He lost consciousness after the fall.|彼は転んだあと意識を失った。
e3634|The team reached a consensus.|チームは合意に達した。
e3635|My grandfather has conservative ideas.|祖父は保守的な考えを持っている。
e3636|The new rule caused a lot of controversy.|新しい規則は大きな論争を引き起こした。
e3637|It is a convention to shake hands here.|ここでは握手をするのが慣習だ。
e3638|She spoke with strong conviction.|彼女は強い確信を持って話した。
e3639|Don't run in the corridor.|廊下を走らないで。
e3640|My mother buys cosmetics online.|母はネットで化粧品を買う。
e3641|The minister met his French counterpart.|大臣はフランスで同じ立場の大臣と会った。
e3642|Please show courtesy to others.|ほかの人に礼儀を示しましょう。
e3643|She sells her crafts at the market.|彼女は市場で自分の工芸品を売っている。
e3644|This cake is my own creation.|このケーキは私が考えた作品だ。
e3645|Price is one criterion for choosing.|値段は選ぶときの基準の一つだ。
e3646|Snowflakes are made of ice crystals.|雪は氷の結晶でできている。
e3647|English is part of the school curriculum.|英語は学校の教育課程の一部だ。
e3648|The country has a large budget deficit.|その国は大きな財政赤字を抱えている。
e3649|Each class sent a delegate to the meeting.|各クラスが会議に代表者を送った。
e3650|The chef gave a cooking demonstration.|シェフが料理の実演をした。
e3651|Tokyo has a high population density.|東京は人口密度が高い。
e3652|Practice the dialogue with your partner.|パートナーと対話を練習しよう。
e3653|The circle has a diameter of ten centimeters.|その円の直径は10センチだ。
e3654|I'm in a dilemma about which school to choose.|どちらの学校を選ぶかで板挟みになっている。
e3655|Her father works as a diplomat.|彼女の父は外交官として働いている。
e3656|Discrimination against women is wrong.|女性への差別は間違っている。
e3657|Take one dose of this medicine after meals.|食後にこの薬を1回分飲んでください。
e3658|The drought killed many crops.|干ばつで多くの作物が枯れた。
e3659|She studies the ecology of the forest.|彼女は森の生態を研究している。
e3660|My aunt is a magazine editor.|おばは雑誌の編集者だ。
e3661|Only the elite could join the club.|エリートだけがそのクラブに入れた。
e3662|We went to the embassy to get a visa.|ビザを取りに大使館へ行った。
e3663|We wish you success in your endeavors.|あなたの取り組みが成功しますように。
e3664|The flu epidemic closed many schools.|インフルエンザの流行で多くの学校が休校になった。
e3665|Can you solve this equation?|この方程式を解ける？
e3666|Singapore is near the equator.|シンガポールは赤道の近くにある。
e3667|Love is the essence of family.|愛は家族の本質だ。
e3668|They own a large estate in the country.|彼らは田舎に広い地所を持っている。
e3669|Doctors must follow strict ethics.|医者は厳しい倫理に従わなければならない。
e3670|We need your expertise on this project.|この計画にはあなたの専門知識が必要だ。
e3671|Space exploration is very expensive.|宇宙探査はとてもお金がかかる。
e3672|He felt great fatigue after the race.|レースの後、彼はひどい疲労を感じた。
e3673|Farmers put fertilizer on the fields.|農家は畑に肥料をまく。
e3674|The findings of the study were surprising.|その研究の調査結果は驚くべきものだった。
e3675|There is a flaw in this plan.|この計画には欠陥がある。
e3676|The navy sent a fleet to the area.|海軍はその地域に艦隊を送った。
e3677|Drink plenty of fluids when you have a fever.|熱があるときは水分をたくさんとって。
e3678|Please save the file in this format.|この形式でファイルを保存してください。
e3679|We learned fractions in math class.|算数の授業で分数を習った。
e3680|We need a framework for our plan.|私たちの計画には枠組みが必要だ。
e3681|Friction makes the wheels hot.|摩擦で車輪が熱くなる。
e3682|There were glass fragments on the floor.|床にガラスの破片があった。
e3683|Everyone is welcome, whatever their gender.|性別に関係なく誰でも歓迎です。
e3684|What genre of music do you like?|どんなジャンルの音楽が好き？
e3685|The glacier is melting fast.|その氷河は急速に溶けている。
e3686|Smoking is a health hazard.|喫煙は健康にとって危険なものだ。
e3687|Australia is in the Southern Hemisphere.|オーストラリアは南半球にある。
e3688|The company has a strict hierarchy.|その会社には厳しい上下関係がある。
e3689|Scientists tested the hypothesis.|科学者たちはその仮説を検証した。
e3690|The two parties have different ideologies.|その二つの政党は異なる思想を持つ。
e3691|His mistake came from ignorance.|彼の間違いは無知から来た。
e3692|This book has beautiful illustrations.|この本には美しい挿絵がある。
e3693|Vaccines give us immunity to diseases.|ワクチンは病気への免疫を与えてくれる。
e3694|We must think about the implications of this choice.|この選択がもたらす影響を考えなければならない。
e3695|A bonus is a good incentive to work hard.|ボーナスは一生懸命働く良い動機になる。
e3696|Income inequality is a big problem.|所得の不平等は大きな問題だ。
e3697|Inflation makes food more expensive.|インフレで食べ物が高くなる。
e3698|The city is improving its infrastructure.|市は社会基盤を整備している。
e3699|She took the initiative and cleaned the room.|彼女は率先して部屋を掃除した。
e3700|We received many inquiries about the event.|そのイベントについて多くの問い合わせを受けた。
e3701|The car needs an inspection every two years.|車は2年ごとに検査が必要だ。
e3702|Nature gives me inspiration for my paintings.|自然が私の絵にひらめきを与えてくれる。
e3703|She is a woman of great integrity.|彼女はとても誠実な女性だ。
e3704|He is a man of great intellect.|彼は優れた知性の持ち主だ。
e3705|Children learn through interaction with others.|子どもは他者との交流を通して学ぶ。
e3706|I don't like interference in my private life.|私生活への干渉は好きではない。
e3707|Buses run at ten-minute intervals.|バスは10分間隔で運行している。
e3708|I trusted my intuition and said no.|私は直感を信じて断った。
e3709|The irony is that the fire station burned down.|皮肉なことに、消防署が全焼した。
e3710|The old man lived in isolation.|その老人は孤立して暮らしていた。
e3711|The jury found him not guilty.|陪審は彼を無罪と判断した。
e3712|The temple is a legacy of the past.|その寺は過去からの遺産だ。
e3713|New legislation protects wild animals.|新しい法律が野生動物を守っている。
e3714|I need to clean my camera lens.|カメラのレンズをきれいにしなきゃ。
e3715|There is little likelihood of rain today.|今日は雨の見込みはほとんどない。
e3716|He hurt a limb in the accident.|彼は事故で手足をけがした。
e3717|My brother studies linguistics at college.|兄は大学で言語学を学んでいる。
e3718|The farmer keeps livestock on his land.|その農家は自分の土地で家畜を飼っている。
e3719|Let's meet in the hotel lobby.|ホテルのロビーで会おう。
e3720|Japanese people are known for their longevity.|日本人は長寿で知られている。
e3721|He won the lottery last year.|彼は去年宝くじに当たった。
e3722|The earthquake had a magnitude of seven.|その地震はマグニチュード7だった。
e3723|Many children suffer from malnutrition.|多くの子どもが栄養失調に苦しんでいる。
e3724|The writer sent the manuscript to the publisher.|作家は原稿を出版社に送った。
e3725|She showed great maturity for her age.|彼女は年のわりにとても成熟していた。
e3726|Cows were eating grass in the meadow.|牛が牧草地で草を食べていた。
e3727|The king showed mercy to the prisoner.|王は囚人に慈悲を示した。
e3728|The poet uses many metaphors.|その詩人は多くの隠喩を使う。
e3729|Graduation is a milestone in life.|卒業は人生の節目だ。
e3730|The war brought misery to many people.|戦争は多くの人々に不幸をもたらした。
e3731|This cream keeps moisture in your skin.|このクリームは肌の水分を保つ。
e3732|A water molecule has three atoms.|水の分子には3つの原子がある。
e3733|The team gained momentum in the second half.|チームは後半に勢いを得た。
e3734|The monarch lived in a large palace.|君主は大きな宮殿に住んでいた。
e3735|The company has a monopoly on the market.|その会社は市場を独占している。
e3736|Stories often teach morality to children.|物語はよく子どもに道徳を教える。
e3737|My parents are paying off the mortgage.|両親は住宅ローンを返済している。
e3738|The book has a simple narrative.|その本の物語は単純だ。
e3739|The negotiation lasted for three hours.|交渉は3時間続いた。
e3740|We welcomed the newcomer to our team.|私たちは新人をチームに迎えた。
e3741|Working from home is now the norm.|今では在宅勤務が普通のことだ。
e3742|The novelty of the toy soon wore off.|そのおもちゃの目新しさはすぐに薄れた。
e3743|He took an oath to tell the truth.|彼は真実を話すと誓いを立てた。
e3744|Does anyone have any objection?|誰か反対の人はいますか？
e3745|Obesity is a serious health problem.|肥満は深刻な健康問題だ。
e3746|There is a strange odor in the kitchen.|台所で変なにおいがする。
e3747|The bird feeds its offspring every day.|その鳥は毎日子どもにえさをやる。
e3748|New students attend an orientation in April.|新入生は4月にオリエンテーションに出る。
e3749|There was an outbreak of flu at school.|学校でインフルエンザが発生した。
e3750|Is there an outlet near the desk?|机の近くにコンセントはある？
e3751|Let me give you a quick overview.|簡単に概要を説明しましょう。
e3752|Life is full of paradoxes.|人生は逆説に満ちている。
e3753|Dust particles floated in the air.|ほこりの粒子が空中に浮かんでいた。
e3754|She got a patent for her invention.|彼女は自分の発明で特許を取った。
e3755|The peasants worked hard in the fields.|小作農たちは畑で懸命に働いた。
e3756|The Izu Peninsula is famous for hot springs.|伊豆半島は温泉で有名だ。
e3757|Our perception of time changes with age.|時間の感じ方は年齢とともに変わる。
e3758|We signed a petition to save the park.|公園を守るための請願書に署名した。
e3759|Many pilgrims visit the temple every year.|毎年多くの巡礼者がその寺を訪れる。
e3760|The roof is supported by four pillars.|屋根は4本の柱で支えられている。
e3761|The plague killed many people long ago.|昔、疫病で多くの人が亡くなった。
e3762|They grow coffee on the plantation.|その大農園ではコーヒーを育てている。
e3763|My grandmother makes pottery as a hobby.|祖母は趣味で陶器を作っている。
e3764|Take an umbrella as a precaution.|用心のために傘を持って行きなさい。
e3765|This job needs great precision.|この仕事には高い正確さが必要だ。
e3766|The lion is a powerful predator.|ライオンは強力な捕食者だ。
e3767|The doctor wrote me a prescription.|医者は私に処方箋を書いてくれた。
e3768|The preservation of nature is important.|自然の保護は大切だ。
e3769|The university has great prestige.|その大学は高い名声がある。
e3770|Monkeys and humans are primates.|サルと人間は霊長類だ。
e3771|The old prophet spoke to the people.|年老いた預言者が人々に語った。
e3772|We wish you health and prosperity.|ご健康とご繁栄をお祈りします。
e3773|Please follow the safety protocol.|安全手順に従ってください。
e3774|Canada has ten provinces.|カナダには10の州がある。
e3775|The provision of clean water is important.|きれいな水の供給は大切だ。
e3776|The movie got a lot of publicity.|その映画は大いに宣伝された。
e3777|The nurse checked my pulse.|看護師が私の脈拍を測った。
e3778|The hero went on a quest for treasure.|勇者は宝の探求の旅に出た。
e3779|Please fill out this questionnaire.|このアンケートに記入してください。
e3780|Each worker has a daily quota.|各作業員には1日の割り当てがある。
e3781|X-rays use a small amount of radiation.|レントゲンは少量の放射線を使う。
e3782|This is beyond the realm of science.|これは科学の領域を超えている。
e3783|The rebellion was quickly stopped.|反乱はすぐに鎮圧された。
e3784|Many people lost jobs during the recession.|景気後退の間に多くの人が仕事を失った。
e3785|Write the recipient's name on the envelope.|封筒に受取人の名前を書いてください。
e3786|The referee blew the whistle.|審判が笛を吹いた。
e3787|The old regime fell in 1989.|古い政権は1989年に倒れた。
e3788|This has no relevance to our topic.|これは私たちの話題とは関連性がない。
e3789|Our reliance on smartphones is growing.|スマホへの依存が高まっている。
e3790|The museum shows relics from ancient Rome.|博物館は古代ローマの遺物を展示している。
e3791|We drove a rental car in Hawaii.|ハワイでレンタカーを運転した。
e3792|This statue is a replica.|この像は複製だ。
e3793|France became a republic long ago.|フランスはずっと昔に共和国になった。
e3794|The town gets water from the reservoir.|その町は貯水池から水を得ている。
e3795|This is the residence of the mayor.|ここは市長の住居だ。
e3796|The company's revenue rose this year.|その会社の収入は今年増えた。
e3797|His speech was full of empty rhetoric.|彼の演説は中身のない美辞麗句ばかりだった。
e3798|We walked along the mountain ridge.|私たちは山の尾根に沿って歩いた。
e3799|There was a robbery at the bank.|その銀行で強盗事件があった。
e3800|This lake is a sanctuary for birds.|この湖は鳥の保護区だ。
e3801|Good sanitation prevents disease.|良い公衆衛生は病気を防ぐ。
e3802|She is as kind as a saint.|彼女は聖人のように優しい。
e3803|The scandal was in all the newspapers.|そのスキャンダルはすべての新聞に載った。
e3804|In the worst scenario, we will miss the train.|最悪の筋書きだと、電車に乗り遅れる。
e3805|This segment of the road is closed.|道路のこの部分は通行止めだ。
e3806|I had a strange sensation in my leg.|足に変な感覚があった。
e3807|I share your sentiment.|私もあなたと同じ感情を持っています。
e3808|The shareholders met to discuss the plan.|株主たちはその計画を話し合うために集まった。
e3809|We saw a dinosaur skeleton at the museum.|博物館で恐竜の骨格を見た。
e3810|Slavery ended in the U.S. in 1865.|アメリカの奴隷制度は1865年に終わった。
e3811|She is studying sociology at university.|彼女は大学で社会学を学んでいる。
e3812|The workers showed solidarity.|労働者たちは団結を示した。
e3813|Every nation has its own sovereignty.|どの国にも主権がある。
e3814|He collects insect specimens.|彼は昆虫の標本を集めている。
e3815|A rainbow shows the spectrum of light.|虹は光のスペクトルを見せてくれる。
e3816|That is pure speculation.|それはただの推測だ。
e3817|The earth is almost a sphere.|地球はほぼ球だ。
e3818|The event needs a sponsor.|そのイベントには後援者が必要だ。
e3819|Children need stability at home.|子どもには家庭の安定が必要だ。
e3820|The eye reacts to a light stimulus.|目は光の刺激に反応する。
e3821|Farmers receive a subsidy from the government.|農家は政府から補助金を受け取る。
e3822|He chose his son as his successor.|彼は息子を後継者に選んだ。
e3823|Some people believe the superstition about black cats.|黒猫の迷信を信じる人もいる。
e3824|We gave the surplus food to a shelter.|余剰の食べ物を施設に寄付した。
e3825|The store uses surveillance cameras.|その店は監視カメラを使っている。
e3826|He was arrested on suspicion of theft.|彼は窃盗の疑いで逮捕された。
e3827|The butterfly's wings show perfect symmetry.|チョウの羽は完全な対称になっている。
e3828|He has a rare syndrome.|彼はまれな症候群をもっている。
e3829|His plan is a synthesis of two ideas.|彼の計画は二つの考えを総合したものだ。
e3830|The coach changed his tactics.|監督は戦術を変えた。
e3831|My dog has a gentle temperament.|うちの犬はおだやかな気質だ。
e3832|Her testimony helped the police.|彼女の証言は警察の役に立った。
e3833|This town is famous for textiles.|この町は織物で有名だ。
e3834|I love the soft texture of this blanket.|この毛布のやわらかい手触りが大好きだ。
e3835|He stood at the threshold of the door.|彼は戸口のしきいに立っていた。
e3836|The house is made of timber.|その家は材木でできている。
e3837|Muscle tissue needs protein to grow.|筋肉組織が育つにはたんぱく質が必要だ。
e3838|We should show tolerance to different cultures.|異なる文化に寛容さを示すべきだ。
e3839|Some mushrooms contain deadly toxins.|一部のキノコには命にかかわる毒素がある。
e3840|The red hat is his trademark.|赤い帽子は彼のトレードマークだ。
e3841|The bank records every transaction.|銀行はすべての取引を記録する。
e3842|The package was lost in transit.|荷物は輸送中に紛失した。
e3843|He needs a heart transplant.|彼には心臓移植が必要だ。
e3844|The accident left him with trauma.|その事故は彼に心的外傷を残した。
e3845|The concert was a tribute to the singer.|そのコンサートはその歌手への賛辞だった。
e3846|The country was in turmoil after the election.|選挙後、その国は混乱していた。
e3847|The people fought against tyranny.|人々は暴政と戦った。
e3848|She had a strict upbringing.|彼女は厳しいしつけを受けて育った。
e3849|We pay for utilities every month.|毎月、公共料金を払っている。
e3850|I question the validity of this data.|このデータの妥当性に疑問がある。
e3851|Water turns into vapor when it boils.|水は沸騰すると蒸気になる。
e3852|The venue for the concert has changed.|コンサートの会場が変わった。
e3853|The jury reached a verdict.|陪審は評決を下した。
e3854|She is a veteran teacher.|彼女はベテランの先生だ。
e3855|There are many shops in the vicinity.|付近にはたくさんの店がある。
e3856|Patience is a virtue.|忍耐は美徳である。
e3857|Teaching is her true vocation.|教えることは彼女の本当の天職だ。
e3858|Modern warfare uses many machines.|現代の戦争では多くの機械が使われる。
e3859|Women make up half the workforce.|女性が労働力の半分を占めている。
e3860|The two cars are comparable in price.|その2台の車は値段の点で比較できる。
e3861|Her opinion has always been consistent.|彼女の意見はいつも一貫している。
e3862|The students were very cooperative.|生徒たちはとても協力的だった。
e3863|There are countless stars in the sky.|空には数え切れない星がある。
e3864|He is critical of the new plan.|彼は新しい計画に批判的だ。
e3865|We walked through a dense forest.|私たちは木の密集した森を歩いた。
e3866|A good education is desirable for everyone.|良い教育は誰にとっても望ましい。
e3867|The typhoon was very destructive.|その台風はとても破壊的だった。
e3868|She is a devoted mother.|彼女は献身的な母親だ。
e3869|Lions are the dominant animals here.|ここではライオンが支配的な動物だ。
e3870|These shoes are very durable.|この靴はとても耐久性がある。
e3871|Pollution causes ecological damage.|汚染は生態系に被害をもたらす。
e3872|My uncle is an electrical engineer.|おじは電気技師だ。
e3873|You are eligible to vote at eighteen.|18歳で投票する資格がある。
e3874|The children are very energetic today.|子どもたちは今日とても元気だ。
e3875|The fans were enthusiastic about the game.|ファンはその試合に熱狂していた。
e3876|Is it ethical to test on animals?|動物実験をするのは倫理的だろうか？
e3877|Excessive sugar is bad for your teeth.|過度の砂糖は歯に悪い。
e3878|The club is very exclusive.|そのクラブはとても排他的だ。
e3879|I was exhausted after the long walk.|長い散歩のあと疲れ果てていた。
e3880|This is an experimental medicine.|これは実験的な薬だ。
e3881|The story was really fascinating.|その話は本当に魅力的だった。
e3882|She always wears fashionable clothes.|彼女はいつも流行の服を着ている。
e3883|The movie got favorable reviews.|その映画は好意的な評価を受けた。
e3884|The land here is very fertile.|ここの土地はとても肥沃だ。
e3885|Sherlock Holmes is a fictional character.|シャーロック・ホームズは架空の人物だ。
e3886|Be careful, the glass is fragile.|気をつけて、そのグラスは壊れやすい。
e3887|The kitchen is small but functional.|その台所は小さいが機能的だ。
e3888|This little knife is very handy.|この小さなナイフはとても便利だ。
e3889|The dog was hostile to strangers.|その犬は見知らぬ人に敵意を示した。
e3890|I was ignorant of the rules.|私はその規則について無知だった。
e3891|My little brother has an imaginary friend.|弟には想像上の友だちがいる。
e3892|She is an imaginative writer.|彼女は想像力豊かな作家だ。
e3893|Don't be so impatient!|そんなにせっかちにならないで！
e3894|Your speech was very impressive.|あなたのスピーチはとても印象的だった。
e3895|Some of the information was incorrect.|情報の一部が不正確だった。
e3896|He is indifferent to fashion.|彼はファッションに無関心だ。
e3897|Water is indispensable for life.|水は生命に不可欠だ。
e3898|She is an influential politician.|彼女は影響力のある政治家だ。
e3899|The lecture was very informative.|その講義はとても有益だった。
e3900|The company is famous for innovative products.|その会社は革新的な製品で有名だ。
e3901|The evidence was insufficient.|証拠は不十分だった。
e3902|Chess is an intellectual game.|チェスは知的なゲームだ。
e3903|I'm in the intermediate English class.|私は英語の中級クラスにいる。
e3904|He works irregular hours.|彼は不規則な時間に働いている。
e3905|They live in an isolated village.|彼らは孤立した村に住んでいる。
e3906|She has liberal political views.|彼女は自由主義の政治的見解をもっている。
e3907|A literal translation is often unnatural.|文字通りの翻訳はしばしば不自然だ。
e3908|She won a famous literary prize.|彼女は有名な文学賞を受賞した。
e3909|She has a lively personality.|彼女は生き生きとした性格だ。
e3910|The view from the top was magnificent.|頂上からの眺めは壮大だった。
e3911|This camera has a manual focus.|このカメラは手動でピントを合わせる。
e3912|We studied marine animals at the aquarium.|水族館で海の生き物について学んだ。
e3913|A massive rock blocked the road.|巨大な岩が道をふさいだ。
e3914|The train stopped because of a mechanical problem.|機械の故障で電車が止まった。
e3915|The mighty river flows to the sea.|その強大な川は海へと流れる。
e3916|I felt miserable when I lost the game.|試合に負けてみじめな気持ちだった。
e3917|A mobile library visits our town every week.|移動式の図書館が毎週町に来る。
e3918|I read a monthly magazine.|私は毎月の雑誌（月刊誌）を読んでいる。
e3919|There was a nationwide strike.|全国的なストライキがあった。
e3920|This is a notable achievement.|これは注目に値する業績だ。
e3921|There is a noticeable change in his attitude.|彼の態度には目立った変化がある。
e3922|Eat nutritious food every day.|毎日栄養のある食べ物を食べなさい。
e3923|Our dog is very obedient.|うちの犬はとても従順だ。
e3924|The project is still ongoing.|その計画はまだ進行中だ。
e3925|This map is outdated.|この地図は時代遅れだ。
e3926|She won by an overwhelming majority.|彼女は圧倒的多数で勝った。
e3927|Draw two parallel lines.|平行な2本の線を引きなさい。
e3928|The plan was only a partial success.|その計画は部分的な成功にすぎなかった。
e3929|This fruit has a peculiar smell.|この果物には独特のにおいがある。
e3930|I have a persistent cough.|しつこいせきが続いている。
e3931|We bought a portable speaker.|持ち運びできるスピーカーを買った。
e3932|Rain is probable this afternoon.|午後は雨になりそうだ。
e3933|The book had a profound effect on me.|その本は私に深い影響を与えた。
e3934|The school has progressive ideas about education.|その学校は教育について進歩的な考えをもっている。
e3935|He is a prominent scientist.|彼は著名な科学者だ。
e3936|The town became prosperous after the railway came.|鉄道が来てからその町は繁栄した。
e3937|Stress can cause psychological problems.|ストレスは心理的な問題を引き起こしうる。
e3938|We need a radical change.|根本的な変化が必要だ。
e3939|The winners were chosen at random.|当選者は無作為に選ばれた。
e3940|Christmas is a religious holiday.|クリスマスは宗教の祝日だ。
e3941|The chef is renowned for his sushi.|そのシェフはすしで有名だ。
e3942|She is our class representative.|彼女は私たちのクラスの代表だ。
e3943|This plant is resistant to disease.|この植物は病気に抵抗力がある。
e3944|Be respectful to your elders.|お年寄りには敬意を払いなさい。
e3945|They went back to their respective homes.|彼らはそれぞれの家に帰った。
e3946|The children were restless in class.|子どもたちは授業中に落ち着かなかった。
e3947|The school has very rigid rules.|その学校にはとても厳格な規則がある。
e3948|These bananas are not ripe yet.|このバナナはまだ熟していない。
e3949|We had a romantic dinner.|私たちはロマンチックな夕食をとった。
e3950|This apple is rotten.|このリンゴは腐っている。
e3951|The royal family lives in a palace.|王室の人々は宮殿に住んでいる。
e3952|Money is of secondary importance to me.|私にとってお金は二次的なものだ。
e3953|Don't be so selfish.|そんなに利己的にならないで。
e3954|The river is shallow here.|ここは川が浅い。
e3955|She has sophisticated taste in music.|彼女は音楽について洗練された趣味をもっている。
e3956|The fireworks were spectacular.|花火は壮観だった。
e3957|The audience gave spontaneous applause.|観客は自発的に拍手を送った。
e3958|We need more statistical data.|もっと統計のデータが必要だ。
e3959|My grandfather is very stubborn.|祖父はとても頑固だ。
e3960|Taste in art is subjective.|芸術の好みは主観的なものだ。
e3961|The subsequent events surprised everyone.|その後の出来事は皆を驚かせた。
e3962|She earned a substantial amount of money.|彼女は相当な額のお金を稼いだ。
e3963|It was only a superficial cut.|それは表面的な切り傷にすぎなかった。
e3964|She made a supreme effort to win.|彼女は勝つために最高の努力をした。
e3965|The police found a suspicious bag.|警察は疑わしいかばんを見つけた。
e3966|We need a swift decision.|速い決定が必要だ。
e3967|The room was quiet and tense.|部屋は静かで張りつめていた。
e3968|Some plants are toxic to cats.|猫にとって有毒な植物もある。
e3969|The box is made of transparent plastic.|その箱は透明なプラスチックでできている。
e3970|Don't worry about trivial things.|ささいなことを気にしないで。
e3971|The future is uncertain.|未来は不確かだ。
e3972|He was unconscious after the accident.|事故の後、彼は意識を失っていた。
e3973|There is an underground parking lot.|地下の駐車場がある。
e3974|My uncle has been unemployed for months.|おじは何か月も失業している。
e3975|I heard an unfamiliar voice.|なじみのない声が聞こえた。
e3976|There is an unpleasant smell here.|ここは不快なにおいがする。
e3977|This chair is unstable.|このいすは不安定だ。
e3978|Draw a vertical line.|垂直な線を引いて。
e3979|Draw a horizontal line across the page.|ページを横切る水平な線を引いて。
e3980|I don't like violent movies.|暴力的な映画は好きではない。
e3981|Pictures are a good visual aid.|絵は視覚の良い助けになる。
e3982|The use of smartphones is now widespread.|スマホの利用は今や広まっている。
e3983|Volunteering is a worthwhile experience.|ボランティアは価値のある経験だ。
e3984|We made the decision in a democratic way.|私たちは民主的な方法で決めた。
e3985|The school abolished its uniform rule.|その学校は制服の規則を廃止した。
e3986|He attributed his failure to bad luck.|彼は失敗を運が悪かったせいにした。
e3987|The ball bounced off the wall.|ボールが壁ではね返った。
e3988|I browse the internet after dinner.|夕食後にインターネットを閲覧する。
e3989|The factory ceased production last year.|その工場は去年生産をやめた。
e3990|I cherish the memories of my childhood.|子どものころの思い出を大切にしている。
e3991|He cited a line from a famous poem.|彼は有名な詩の一節を引用した。
e3992|Could you clarify your question?|質問の内容を明らかにしてもらえますか？
e3993|The baby monkey clung to its mother.|子ザルは母親にしがみついた。
e3994|Two cars collided at the corner.|角で2台の車が衝突した。
e3995|The company will compensate you for the damage.|会社が損害を補償します。
e3996|She compiled a list of useful words.|彼女は役に立つ単語のリストを編集した。
e3997|All students must comply with the rules.|全生徒は規則に従わなければならない。
e3998|The team comprises ten players.|チームは10人の選手で構成されている。
e3999|Everyone condemned the attack.|誰もがその攻撃を非難した。
e4000|The dog was confined to the house.|犬は家に閉じ込められていた。
e4001|Tokyo and Madrid are at a similar latitude.|東京とマドリードは同じくらいの緯度にある。
e4002|We visited the war memorial in the park.|私たちは公園の戦争記念碑を訪れた。
e4003|My notes are so disorganized that I can't study.|ノートがまとまっていなくて勉強できない。
e4004|Sleep is important for your well-being.|睡眠は心身の健康にとって大切だ。
e4005|The investor put money into a new company.|その投資家は新しい会社にお金を出した。
e4006|Do not touch the hazardous chemicals.|その危険な化学物質に触らないで。
e4007|Can I get a refill on my coffee?|コーヒーのおかわりをもらえますか。
e4008|My uncle works for a wine importer.|おじはワインの輸入業者で働いている。
e4009|The new law brought about big changes.|新しい法律は大きな変化をもたらした。
e4010|The old house has bad plumbing.|その古い家は配管が悪い。
e4011|The craftsman made this chair by hand.|その職人がこのいすを手作りした。
e4012|The view from the top was stunning.|頂上からの眺めは見事だった。
e4013|Saliva helps us digest food.|唾液は食べ物の消化を助ける。
e4014|This library book is two weeks overdue.|この図書館の本は返却期限を2週間過ぎている。
e4015|Children should not drink alcohol.|子どもはお酒を飲んではいけない。
e4016|I worked for two hours without interruption.|私は中断なしで2時間働いた。
e4017|My workload is heavy this month.|今月は仕事量が多い。
e4018|Drinking water is good for your kidneys.|水を飲むことは腎臓によい。
e4019|The hotel was reasonably priced.|そのホテルは手頃な値段だった。
e4020|The retailer sells clothes online.|その小売業者はオンラインで服を売っている。
e4021|We insured our car against theft.|私たちは車に盗難保険をかけた。
e4022|Additionally, you will need a passport.|さらに、パスポートも必要になる。
e4023|My brother is an undergraduate at Kyoto University.|兄は京都大学の学部生だ。
e4024|The actor lives in a huge mansion.|その俳優は大きな豪邸に住んでいる。
e4025|The ratio of boys to girls is two to one.|男子と女子の比率は2対1だ。
e4026|The trees swayed in the wind.|木々が風に揺れた。
e4027|The janitor cleans the school every night.|用務員は毎晩学校を掃除する。
e4028|My grandpa is getting forgetful.|祖父は忘れっぽくなってきている。
e4029|A positive mindset helps you learn faster.|前向きな考え方は学ぶのを速くする。
e4030|We paid the toll on the highway.|私たちは高速道路の通行料を払った。
e4031|Rainforests are rich in biodiversity.|熱帯雨林は生物多様性に富んでいる。
e4032|I got a bad sunburn at the beach.|浜辺でひどく日焼けした。
e4033|This word is commonly used in Japan.|この言葉は日本で一般に使われている。
e4034|This medicine will lessen the pain.|この薬は痛みを和らげるだろう。
e4035|The cat got used to its new surroundings.|猫は新しい環境に慣れた。
e4036|He didn't blink during the scary movie.|彼は怖い映画の間、まばたきをしなかった。
e4037|The landowner rents his fields to farmers.|その地主は農家に畑を貸している。
e4038|We fertilize the garden in spring.|私たちは春に庭に肥料をやる。
e4039|Her explanation was very convincing.|彼女の説明はとても説得力があった。
e4040|We should reduce our dependence on oil.|私たちは石油への依存を減らすべきだ。
e4041|I will repay the money next month.|来月そのお金を返します。
e4042|The website is visually beautiful.|そのウェブサイトは見た目が美しい。
e4043|You can't copy this song because of copyright.|著作権があるのでこの歌はコピーできない。
e4044|Our class went on an excursion to the zoo.|私たちのクラスは動物園へ遠足に行った。
e4045|The chemist found a new kind of plastic.|その化学者は新しい種類のプラスチックを発見した。
e4046|Falling on stage was so embarrassing.|舞台で転んだのはとても恥ずかしかった。
e4047|The soap dispenser is empty.|せっけんのディスペンサーが空っぽだ。
e4048|We remodeled our kitchen last year.|私たちは去年台所を改装した。
e4049|Her speech was really inspiring.|彼女のスピーチは本当に励みになった。
e4050|The vaccination didn't hurt at all.|予防接種は全然痛くなかった。
e4051|The medicine enters the bloodstream quickly.|その薬はすぐに血流に入る。
e4052|We ran out of milk this morning.|今朝牛乳を切らしてしまった。
e4053|The children shouted with delight.|子どもたちは喜んで叫んだ。
e4054|Wearing a tie is optional at this party.|このパーティーではネクタイは任意だ。
e4055|Microplastics are found even in the deep sea.|マイクロプラスチックは深海でも見つかる。
e4056|The school held a fundraising event.|学校は資金集めのイベントを開いた。
e4057|The road was closed because of an avalanche.|雪崩のためにその道路は閉鎖された。
e4058|We walked through the woodland.|私たちは森林地帯を歩いた。
e4059|She has a job in a retail store.|彼女は小売店で働いている。
e4060|We hired a contractor to fix the roof.|屋根の修理に業者を雇った。
e4061|Teaching children is a rewarding job.|子どもを教えるのはやりがいのある仕事だ。
e4062|A big surprise awaits you at home.|家で大きなサプライズが待っているよ。
e4063|He made an honorable choice.|彼は立派な選択をした。
e4064|There is rust on my old bike.|私の古い自転車にはさびがある。
e4065|I had lunch with a coworker today.|今日は同僚と昼ごはんを食べた。
e4066|The instructions are quite straightforward.|説明はとてもわかりやすい。
e4067|I joined a webinar about saving money.|お金の節約についてのウェビナーに参加した。
e4068|The canceled trip was a big disappointment.|旅行の中止は大きな失望だった。
e4069|We had a bake sale as a fundraiser.|資金集めにお菓子の販売会をした。
e4070|I'm hopeful that we will win.|私たちが勝つと期待している。
e4071|I glimpsed a deer in the forest.|森でシカをちらりと見た。
e4072|New York is famous for its skyscrapers.|ニューヨークは超高層ビルで有名だ。
e4073|She wants to become a novelist.|彼女は小説家になりたがっている。
e4074|The machine operator wears a helmet.|機械の操作者はヘルメットをかぶっている。
e4075|He gave a persuasive speech.|彼は説得力のあるスピーチをした。
e4076|I love the fragrance of these roses.|このバラの香りが大好きだ。
e4077|We walked through the bustling market.|私たちはにぎやかな市場を歩いた。
e4078|Please don't embarrass me in front of my friends.|友達の前で恥をかかせないで。
e4079|My workday starts at nine.|私の勤務は9時に始まる。
e4080|She is a highly motivated student.|彼女はとてもやる気のある生徒だ。
e4081|All the names are kept in a database.|すべての名前はデータベースに保存されている。
e4082|Can we reschedule the meeting for Friday?|会議を金曜日に変更できますか。
e4083|I vaguely remember my first birthday.|最初の誕生日をぼんやりと覚えている。
e4084|The little boy sobbed after losing his toy.|男の子はおもちゃをなくしてすすり泣いた。
e4085|The weather here is very variable.|ここの天気はとても変わりやすい。
e4086|I have a bruise on my knee.|ひざにあざがある。
e4087|Please inflate the balloons for the party.|パーティー用に風船を膨らませてください。
e4088|The rumor turned out to be false.|そのうわさは誤りだと判明した。
e4089|The volcano's eruption lasted three days.|その火山の噴火は3日間続いた。
e4090|Fish are abundant in this lake.|この湖には魚が豊富にいる。
e4091|The hotel has a breakfast buffet.|そのホテルには朝食のビュッフェがある。
e4092|We stripped the old paint off the door.|ドアの古いペンキをはぎ取った。
e4093|Stop being so immature!|そんなに子どもっぽいことはやめなさい！
e4094|The spark ignited the dry grass.|火花が乾いた草に火をつけた。
e4095|My parents support me financially.|両親が経済的に私を支えてくれている。
e4096|We heard a loud explosion.|大きな爆発音が聞こえた。
e4097|His familiarity with computers helped us.|彼のコンピューターへの精通が私たちを助けた。
e4098|You can play this game offline.|このゲームはオフラインで遊べる。
e4099|These vegetables are grown without pesticides.|これらの野菜は農薬なしで育てられている。
e4100|Please read the contract closely.|契約書を注意深く読んでください。
e4101|The archaeologist found an old pot.|その考古学者は古いつぼを発見した。
e4102|There is a fire extinguisher in the hall.|廊下に消火器がある。
e4103|My older sister is a little bossy.|姉は少し偉そうだ。
e4104|It is wrong to discriminate against anyone.|誰かを差別するのは間違っている。
e4105|The old tree is hollow inside.|その古い木は中が空洞だ。
e4106|The caretaker looks after the old building.|管理人がその古い建物の世話をしている。
e4107|The interviewer asked me about my hobbies.|面接官は私の趣味について質問した。
e4108|Drain the pasta and add the sauce.|パスタの水を切ってソースを加えて。
e4109|We saw footprints in the snow.|雪の中に足跡が見えた。
e4110|Please take all your belongings with you.|持ち物をすべてお持ちください。
e4111|She works as a freelance designer.|彼女はフリーランスのデザイナーとして働いている。
e4112|This plan gives you unlimited data.|このプランはデータが無制限だ。
e4113|There is a crack in the window.|窓にひびが入っている。
e4114|There were fifty applicants for the job.|その仕事には50人の応募者がいた。
e4115|We should be tolerant of different opinions.|私たちは異なる意見に寛容であるべきだ。
e4116|The streetlights come on at six.|街灯は6時につく。
e4117|The sunset was breathtaking.|夕日は息をのむほど美しかった。
e4118|I still have jet lag after my trip.|旅行の後でまだ時差ぼけがある。
e4119|Depression is a serious illness.|うつ病は深刻な病気だ。
e4120|The train left punctually at noon.|列車は正午に時間通りに出発した。
e4121|There was only one survivor of the crash.|その事故の生存者は1人だけだった。
e4122|Adolescence can be a difficult time.|思春期は難しい時期になりうる。
e4123|Praise can help children build self-esteem.|ほめることは子どもの自尊心を育てる助けになる。
e4124|Trees shed their leaves in autumn.|木々は秋に葉を落とす。
e4125|There is mold on this bread.|このパンにかびが生えている。
e4126|The bathtub overflowed while I was on the phone.|電話中に浴槽があふれた。
e4127|I was thrilled to meet my favorite singer.|大好きな歌手に会えて大喜びした。
e4128|The town was hit by a tsunami.|その町は津波に襲われた。
e4129|The flight attendant brought me some water.|客室乗務員が水を持ってきてくれた。
e4130|I'll make up for being late.|遅れた埋め合わせをするよ。
e4131|My dad grinds coffee beans every morning.|父は毎朝コーヒー豆をひく。
e4132|We met in the plaza near the station.|私たちは駅の近くの広場で会った。
e4133|This jacket is made of synthetic fiber.|このジャケットは合成繊維でできている。
e4134|They handed out leaflets at the station.|彼らは駅でちらしを配った。
e4135|Parenting is hard but rewarding.|子育ては大変だがやりがいがある。
e4136|She agreed without hesitation.|彼女はためらうことなく同意した。
e4137|He rides his skateboard to the park.|彼はスケートボードで公園へ行く。
e4138|The news was quite startling.|そのニュースはかなり驚くべきものだった。
e4139|My grandmother weaves beautiful cloth.|祖母は美しい布を織る。
e4140|We saw a meteor last night.|昨夜流れ星を見た。
e4141|I occasionally eat out with friends.|時々友達と外食する。
e4142|She got Canadian citizenship last year.|彼女は去年カナダの市民権を取得した。
e4143|Can you pass me the screwdriver?|ドライバーを取ってくれる？
e4144|We should think critically about the news.|私たちはニュースを批判的に考えるべきだ。
e4145|Our competitor lowered its prices.|競合他社が値下げをした。
e4146|This area is restricted to staff only.|この区域はスタッフ専用に制限されている。
e4147|The bridge is near completion.|その橋は完成間近だ。
e4148|"What a surprise!" she exclaimed.|「なんて驚きなの！」と彼女は叫んだ。
e4149|My sister is studying nursing.|姉は看護を勉強している。
e4150|Prices rose dramatically last year.|去年物価が劇的に上がった。
e4151|Success comes from persistence.|成功は粘り強さから生まれる。
e4152|The ship appeared on the radar.|その船がレーダーに映った。
e4153|We buy paper from a local supplier.|私たちは地元の業者から紙を買っている。
e4154|She replied promptly to my email.|彼女は私のメールにすぐ返事をくれた。
e4155|I got a cramp in my leg while swimming.|泳いでいるときに足がつった。
e4156|Don't interfere in other people's business.|他人のことに口出ししないで。
e4157|He couldn't hide his jealousy.|彼は嫉妬を隠せなかった。
e4158|Don't worry about such insignificant things.|そんなささいなことは気にしないで。
e4159|This company brews beer in Hokkaido.|この会社は北海道でビールを醸造している。
e4160|The company declared bankruptcy.|その会社は破産を宣言した。
e4161|He works in corporate sales.|彼は法人営業の仕事をしている。
e4162|Japan is a major exporter of cars.|日本は自動車の主要な輸出国だ。
e4163|The earth's crust is very thin.|地球の地殻はとても薄い。
e4164|I have a dental checkup tomorrow.|明日歯の検診がある。
e4165|Don't put off your homework until tomorrow.|宿題を明日まで先延ばしにしないで。
e4166|Ideally, we should leave by eight.|理想を言えば8時までに出発すべきだ。
e4167|I really look up to my grandfather.|私は祖父を心から尊敬している。
e4168|Hail damaged the cars in the parking lot.|ひょうで駐車場の車が傷ついた。
e4169|Help me unload the groceries from the car.|車から食料品を降ろすのを手伝って。
e4170|She became more self-confident after the contest.|コンテストの後、彼女はもっと自信を持つようになった。
e4171|Please don't slam the door.|ドアをバタンと閉めないで。
e4172|The teacher took attendance this morning.|先生は今朝出席をとった。
e4173|There is a huge billboard on the highway.|高速道路に巨大な広告板がある。
e4174|The music stopped abruptly.|音楽が突然止まった。
e4175|Telecommuting saves me two hours a day.|在宅勤務のおかげで1日2時間節約できる。
e4176|Grip the handle firmly.|取っ手をしっかり握って。
e4177|I look forward to seeing you again.|またお会いできるのを楽しみにしています。
e4178|The dietitian made a meal plan for me.|栄養士が私の食事計画を作ってくれた。
e4179|The food was mildly spicy.|その料理は少し辛かった。
e4180|Throwing away food is wasteful.|食べ物を捨てるのはもったいない。
e4181|Try rebooting your computer.|コンピューターを再起動してみて。
e4182|This car is famous for its reliability.|この車は信頼性で有名だ。
e4183|It was dishonest to copy his answers.|彼の答えを写すのは不正直だった。
e4184|The bulk of the work is done.|仕事の大部分は終わった。
e4185|Bring a flashlight for the camping trip.|キャンプには懐中電灯を持ってきて。
e4186|The two countries have a border dispute.|その2か国は国境紛争を抱えている。
e4187|The town has many recreational facilities.|その町には娯楽施設がたくさんある。
e4188|A herd of cows was crossing the road.|牛の群れが道路を横切っていた。
e4189|I get a weekly allowance from my parents.|両親から毎週お小遣いをもらっている。
e4190|The heat today is unbearable.|今日の暑さは耐えられない。
e4191|Can you untie this knot?|この結び目をほどける？
e4192|Each contestant sang one song.|出場者はそれぞれ1曲歌った。
e4193|We stayed at a hot spring spa.|私たちは温泉に泊まった。
e4194|More importantly, we had fun.|もっと大事なのは、私たちが楽しんだことだ。
e4195|Dissolve the sugar in warm water.|砂糖をお湯で溶かして。
e4196|He works at a small tech startup.|彼は小さなIT新興企業で働いている。
e4197|The new bridge officially opened today.|新しい橋が今日正式に開通した。
e4198|The government regulates the price of rice.|政府は米の価格を規制している。
e4199|Rice cultivation needs a lot of water.|稲の栽培には多くの水が必要だ。
e4200|I forgot my phone charger at home.|携帯の充電器を家に忘れた。
e4201|Running every day builds stamina.|毎日走るとスタミナがつく。
e4202|We found a mutually convenient time.|お互いに都合のいい時間を見つけた。
e4203|The town has changed radically.|その町は根本的に変わった。
e4204|The mountaineer reached the top of Everest.|その登山家はエベレストの頂上に到達した。
e4205|Walk on the pavement, not the road.|車道ではなく歩道を歩いて。
e4206|It was a daring rescue.|それは大胆な救出だった。
e4207|You can customize the colors of the app.|アプリの色を自分好みにできる。
e4208|Many retirees live in this quiet town.|多くの退職者がこの静かな町に住んでいる。
e4209|We got a free upgrade to business class.|ビジネスクラスへの無料の格上げを受けた。
e4210|We called a plumber to fix the sink.|流しを直すために配管工を呼んだ。
e4211|The ozone layer protects us from the sun.|オゾン層は太陽から私たちを守っている。
e4212|Only authorized people can enter this room.|許可された人だけがこの部屋に入れる。
e4213|The juice stained my white shirt.|ジュースで白いシャツにしみがついた。
e4214|She has a high proficiency in English.|彼女は高い英語力を持っている。
e4215|The cat sneaked into the kitchen.|猫が台所にこっそり入り込んだ。
e4216|My brother always teases me.|兄はいつも私をからかう。
e4217|We had a farewell party for our teacher.|先生のために送別会を開いた。
e4218|My father snores very loudly.|父はとても大きないびきをかく。
e4219|The kitchen is not very sanitary.|その台所はあまり衛生的ではない。
e4220|The cashier gave me my change.|レジ係がおつりをくれた。
e4221|We picked apples at the orchard.|私たちは果樹園でりんごを摘んだ。
e4222|I was emotionally tired after the exam.|試験の後、精神的に疲れていた。
e4223|Breathe in, then exhale slowly.|息を吸って、それからゆっくり吐いて。
e4224|My parents carpool to work.|両親は車に相乗りして通勤する。
e4225|Our first try was unsuccessful.|最初の試みは失敗に終わった。
e4226|The hotel has no vacancies tonight.|そのホテルは今夜空室がない。
e4227|He is a dependable friend.|彼は頼りになる友達だ。
e4228|Termites damaged the wooden house.|シロアリが木造の家を傷めた。
e4229|My passport expires next year.|私のパスポートは来年期限が切れる。
e4230|She dyed her hair brown.|彼女は髪を茶色に染めた。
e4231|They bound the old newspapers with string.|彼らは古新聞をひもで縛った。
e4232|Much of the deep sea is still unexplored.|深海の多くはまだ未踏の地だ。
e4233|Thank you for your consideration.|ご検討いただきありがとうございます。
e4234|Turn left at the next intersection.|次の交差点を左に曲がって。
e4235|The test was fairly easy.|テストはかなり簡単だった。
e4236|We collected shells on the seashore.|私たちは海岸で貝殻を集めた。
e4237|Good hygiene prevents illness.|よい衛生習慣は病気を防ぐ。
e4238|He agreed verbally but didn't sign.|彼は口頭で同意したが署名はしなかった。
e4239|Can you enlarge this photo?|この写真を引き伸ばしてもらえますか。
e4240|The heatwave lasted for two weeks.|熱波は2週間続いた。
e4241|The forecaster said it would rain tomorrow.|予報士は明日は雨だと言った。
e4242|Moving house is exhausting.|引っ越しはへとへとに疲れる。
e4243|Japan has a very long coastline.|日本はとても長い海岸線を持っている。
e4244|We grow tomatoes in a greenhouse.|私たちは温室でトマトを育てている。
e4245|Be careful, the floor is uneven.|気をつけて、床がでこぼこだよ。
e4246|Kids were playing on the sidewalk.|子どもたちが歩道で遊んでいた。
e4247|I was overwhelmed by all the homework.|大量の宿題に圧倒された。
e4248|The new school was formally opened today.|新しい学校が今日正式に開校した。
e4249|The young filmmaker won an award.|その若い映画製作者は賞を取った。
e4250|Please check the availability of rooms.|部屋の空き状況を確認してください。
e4251|We need to rethink our plan.|計画を考え直す必要がある。
e4252|She was genuinely happy for me.|彼女は心から私のことを喜んでくれた。
e4253|My father drives a hybrid.|父はハイブリッド車に乗っている。
e4254|I unpacked my suitcase at the hotel.|ホテルでスーツケースの荷をほどいた。
e4255|Cats are less socially active than dogs.|猫は犬ほど社交的ではない。
e4256|His family immigrated to Canada.|彼の家族はカナダに移住した。
e4257|The teacher turned on the projector.|先生はプロジェクターをつけた。
e4258|He reluctantly cleaned his room.|彼はしぶしぶ部屋を掃除した。
e4259|Please read the handout before class.|授業前に配布資料を読んでください。
e4260|This bread contains no preservatives.|このパンには保存料が入っていない。
e4261|He seemed uninterested in the game.|彼は試合に興味がなさそうだった。
e4262|She volunteers at a nonprofit.|彼女は非営利団体でボランティアをしている。
e4263|Many birds live in the marsh.|多くの鳥がその沼地に住んでいる。
e4264|This flower is uniquely Japanese.|この花は日本独特のものだ。
e4265|My little sister goes to preschool.|妹は保育園に通っている。
e4266|Copying from the internet is plagiarism.|インターネットから写すのは盗作だ。
e4267|The teacher counseled him about his future.|先生は彼に将来について助言した。
e4268|Advertisers pay a lot for TV commercials.|広告主はテレビCMに多額のお金を払う。
e4269|My family is very supportive.|家族はとても協力的だ。
e4270|I got a rash from the new soap.|新しいせっけんで発疹が出た。
e4271|The test was comparatively easy.|テストは比較的簡単だった。
e4272|There is an old windmill on the hill.|丘の上に古い風車がある。
e4273|Grandma made a feast for New Year.|おばあちゃんはお正月にごちそうを作った。
e4274|She slowly regained her strength.|彼女は少しずつ体力を取り戻した。
e4275|Punctuality is important in Japan.|日本では時間厳守が大切だ。
e4276|Take the escalator to the third floor.|エスカレーターで3階まで行って。
e4277|This app is used globally.|このアプリは世界的に使われている。
e4278|The salesperson showed me some shoes.|販売員が靴を何足か見せてくれた。
e4279|Traditionally, we eat soba on New Year's Eve.|昔から大みそかにはそばを食べる。
e4280|Dip the shrimp in the sauce.|エビをソースにつけて。
e4281|I don't like greasy food.|脂っこい食べ物は好きじゃない。
e4282|I need a replacement for my broken phone.|壊れた電話の代わりが必要だ。
e4283|Add one tablespoon of sugar.|砂糖を大さじ1杯加えて。
e4284|Elevate your leg to reduce the swelling.|腫れを抑えるために足を高く上げて。
e4285|He is just an acquaintance, not a friend.|彼は友達ではなく、ただの知り合いだ。
e4286|Don't strain your eyes reading in the dark.|暗い所で読んで目を酷使しないで。
e4287|The cereal is in the pantry.|シリアルは食料庫にある。
e4288|I can't figure out this math problem.|この数学の問題がわからない。
e4289|Urbanization changed the area quickly.|都市化でその地域は急速に変わった。
e4290|The soldiers saluted the flag.|兵士たちは旗に敬礼した。
e4291|The king sent a messenger to the village.|王は村に使者を送った。
e4292|Your question is irrelevant to the topic.|あなたの質問はその話題と関係がない。
e4293|Would you like a window or aisle seat?|窓側と通路側、どちらの席がいいですか。
e4294|She works very efficiently.|彼女はとても効率よく働く。
e4295|They rebuilt the town after the earthquake.|地震の後、彼らは町を再建した。
e4296|Take one capsule after each meal.|毎食後にカプセルを1つ飲んで。
e4297|I go for a checkup every year.|毎年健康診断を受けている。
e4298|She came up with a great idea.|彼女はすばらしいアイデアを思いついた。
e4299|We got a full refund after the cancellation.|キャンセルの後、全額返金された。
e4300|I can't put up with this noise anymore.|この騒音にはもう我慢できない。
e4301|I did an internship at a bank.|私は銀行でインターンシップをした。
e4302|My cousin is a vegan, so she doesn't eat eggs.|いとこはビーガンなので卵を食べない。
e4303|His face turned red with embarrassment.|彼は恥ずかしさで顔が赤くなった。
e4304|That goal was the decisive moment.|あのゴールが決定的な瞬間だった。
e4305|Motorists should slow down near schools.|ドライバーは学校の近くでは速度を落とすべきだ。
e4306|Do you need any assistance?|何かお手伝いが必要ですか。
e4307|Don't make a hasty decision.|早まった決断をしないで。
e4308|Please stay seated for the duration of the flight.|飛行中はずっと座っていてください。
e4309|Many animals live in the rainforest.|多くの動物が熱帯雨林に住んでいる。
e4310|The movie was tremendously popular.|その映画はものすごく人気があった。
e4311|My calculation was wrong.|私の計算は間違っていた。
e4312|The calf stayed close to its mother.|子牛は母牛のそばにいた。
e4313|The festival is held annually in August.|その祭りは毎年8月に開かれる。
e4314|Always cross the street at the crosswalk.|道路は必ず横断歩道で渡って。
e4315|I keep my workspace clean.|私は作業スペースをきれいにしている。
e4316|The economic outlook is good this year.|今年の経済の見通しはよい。
e4317|Snakes and lizards are reptiles.|ヘビとトカゲは爬虫類だ。
e4318|Everyone has some shortcomings.|誰にでも欠点はある。
e4319|It was irresponsible to leave the door open.|ドアを開けたままにしたのは無責任だった。
e4320|The teacher glared at the noisy students.|先生は騒がしい生徒たちをにらんだ。
e4321|His loud music irritates me.|彼の大きな音楽にイライラする。
e4322|Teenagers care about what their peers think.|10代の若者は仲間の考えを気にする。
e4323|This old car is unreliable.|この古い車は当てにならない。
e4324|Put the ice cream in the freezer.|アイスクリームを冷凍庫に入れて。
e4325|She studies geology at university.|彼女は大学で地質学を学んでいる。
e4326|Good insulation keeps the house warm.|よい断熱材は家を暖かく保つ。
e4327|He dropped out of college to start a company.|彼は会社を始めるために大学を中退した。
e4328|I overslept and missed the bus.|寝坊してバスに乗り遅れた。
e4329|Scientists analyze the data carefully.|科学者たちはデータを慎重に分析する。
e4330|She stayed remarkably calm.|彼女は驚くほど落ち着いていた。
e4331|This garment must be washed by hand.|この衣服は手洗いしなければならない。
e4332|My mom finally gave in and bought me a dog.|母はついに折れて犬を買ってくれた。
e4333|My license is due for renewal.|免許が更新の時期だ。
e4334|We looked down into the crater of the volcano.|私たちは火山の火口をのぞき込んだ。
e4335|The ending of the movie was disappointing.|その映画の結末は期待外れだった。
e4336|Fasting before the test is not a good idea.|検査の前に断食するのはよくない。
e4337|The intern helped me make copies.|研修生がコピーを手伝ってくれた。
e4338|This old watch has sentimental value.|この古い時計には思い出としての価値がある。
e4339|These boots are known for their durability.|このブーツは耐久性で知られている。
e4340|Everyone groaned when the teacher gave us more homework.|先生が宿題を増やすとみんなうめいた。
e4341|Cows produce a lot of methane.|牛は大量のメタンを出す。
e4342|The factory's output increased this year.|今年その工場の生産高が増えた。
e4343|Our car broke down on the highway.|私たちの車が高速道路で故障した。
e4344|I get my paycheck on the 25th.|25日に給料をもらう。
e4345|The news coverage of the storm was good.|嵐の報道はよかった。
e4346|I'm allergic to peanuts.|私はピーナッツアレルギーだ。
e4347|The light has a motion sensor.|そのライトには動きを感知するセンサーがある。
e4348|The museum is closed for renovation.|博物館は改装のため休館中だ。
e4349|I crammed for the exam all night.|一晩中試験の詰め込み勉強をした。
e4350|People with diabetes may need insulin.|糖尿病の人はインスリンが必要なことがある。
e4351|There has been a big improvement in your writing.|君の作文は大きく上達した。
e4352|This is an agricultural area.|ここは農業地域だ。
e4353|Overfishing has reduced the number of tuna.|乱獲でマグロの数が減った。
e4354|My phone needs a recharge.|携帯の充電が必要だ。
e4355|The concert was held in the school auditorium.|コンサートは学校の講堂で開かれた。
e4356|The factory is fully automated.|その工場は完全に自動化されている。
e4357|She attained her goal of running a marathon.|彼女はマラソンを走るという目標を達成した。
e4358|He feels insecure about his height.|彼は身長に自信がない。
e4359|Please discard any old food in the fridge.|冷蔵庫の古い食べ物は処分してください。
e4360|The temperature dropped sharply at night.|夜に気温が急激に下がった。
e4361|We bought local handicrafts as souvenirs.|お土産に地元の手工芸品を買った。
e4362|Children played near the fountain.|子どもたちが噴水の近くで遊んだ。
e4363|He handed in his resignation yesterday.|彼は昨日辞表を提出した。
e4364|Poaching is a threat to elephants.|密猟はゾウにとって脅威だ。
e4365|The lighting in this room is too dark.|この部屋の照明は暗すぎる。
e4366|Go ahead, I'll catch up with you later.|先に行って、後で追いつくから。
e4367|Most of our trash goes to a landfill.|私たちのごみのほとんどは埋め立て地へ行く。
e4368|My brother has asthma.|弟はぜんそくがある。
e4369|He gave me his assurance that it was safe.|彼は安全だと私に保証した。
e4370|The bakery is very profitable.|そのパン屋はとてももうかっている。
e4371|The boy plunged into the cold river.|少年は冷たい川に飛び込んだ。
e4372|My dad trims the hedge every month.|父は毎月生け垣を刈り込む。
e4373|How do you account for the mistake?|その間違いをどう説明するの？
e4374|Alligators live in the swamp.|ワニがその沼地に住んでいる。
e4375|I watched the movie with English subtitles.|英語字幕でその映画を見た。
e4376|The medicine has some undesirable effects.|その薬には望ましくない副作用がある。
e4377|Add a teaspoon of salt.|塩を小さじ1杯加えて。
e4378|Do you have any suggestions?|何か提案はありますか。
e4379|Reforestation helps fight climate change.|森林再生は気候変動との闘いに役立つ。
e4380|Please fill out this form.|この用紙に記入してください。
e4381|The spacecraft landed on the moon.|宇宙船は月に着陸した。
e4382|The dentist found a cavity in my tooth.|歯医者が私の歯に虫歯を見つけた。
e4383|I'm interested in archaeology.|私は考古学に興味がある。
e4384|Turn right at the crossroads.|十字路を右に曲がって。
e4385|The company publishes a quarterly report.|その会社は四半期ごとの報告書を出している。
e4386|Bless you! Do you have a cold?|お大事に！風邪をひいてるの？
e4387|Deforestation is a serious problem in the Amazon.|アマゾンでは森林破壊が深刻な問題だ。
e4388|Put the plates in the dishwasher.|お皿を食洗機に入れて。
e4389|This medicine tastes bitter.|この薬は苦い味がする。
e4390|Wind turbines make electricity.|風力タービンは電気を作る。
e4391|Drink water to avoid heatstroke.|熱中症を防ぐために水を飲んで。
e4392|Dust accumulates under the bed.|ベッドの下にほこりがたまる。
e4393|Presumably, he missed the train.|おそらく彼は電車に乗り遅れたのだろう。
e4394|I asked my sister for forgiveness.|私は妹に許しを求めた。
e4395|The TV comes with a one-year warranty.|そのテレビには1年間の保証がついている。
e4396|Cheating on the test was shameful.|テストでカンニングしたのは恥ずべきことだった。
e4397|We stayed at a small inn in the mountains.|山の小さな宿屋に泊まった。
e4398|It was just a misunderstanding.|それはただの誤解だった。
e4399|Grandma mended the hole in my sock.|祖母が靴下の穴を繕ってくれた。
e4400|The columnist writes about food every week.|そのコラムニストは毎週食べ物について書いている。
e4401|A burglar broke into our neighbor's house.|空き巣が隣の家に入った。
e4402|Wetlands are home to many birds.|湿地は多くの鳥のすみかだ。
e4403|He is a model train hobbyist.|彼は鉄道模型の愛好家だ。
e4404|My son goes to nursery three days a week.|息子は週3日保育所に通っている。
e4405|Your test results are satisfactory.|あなたのテストの結果は満足のいくものだ。
e4406|My uncle is a workaholic.|おじは仕事中毒だ。
e4407|My phone is a big distraction when I study.|勉強中、携帯は大きな気を散らすものだ。
e4408|The book gives a comprehensive guide to Japan.|その本は日本への総合的なガイドだ。
e4409|We trekked through the mountains for three days.|私たちは3日間山を歩いて旅した。
e4410|This phone has great camera capabilities.|この電話はすばらしいカメラ性能を持つ。
e4411|This snake is harmless.|このヘビは無害だ。
e4412|The chicks hatched this morning.|今朝ひなたちがかえった。
e4413|I have to deal with a lot of emails.|たくさんのメールに対処しなければならない。
e4414|The company outsources its customer service.|その会社は顧客サービスを外部に委託している。
e4415|The ballet dancer was very graceful.|そのバレエダンサーはとても優美だった。
e4416|Ask the pharmacist about this medicine.|この薬について薬剤師に聞いて。
e4417|Sleep affects your hormones.|睡眠はホルモンに影響する。
e4418|Her books are famous internationally.|彼女の本は国際的に有名だ。
e4419|Many children in the slum can't go to school.|スラム街の多くの子どもは学校へ行けない。
e4420|There is a revival of interest in vinyl records.|レコードへの関心が復活している。
e4421|The phone cord is too short.|電話のコードが短すぎる。
e4422|I took my pants to the shop for alterations.|ズボンをお直しに店へ持っていった。
e4423|The army was forced to retreat.|軍は退却を余儀なくされた。
e4424|They refurbished the old hotel.|彼らは古いホテルを改装した。
e4425|This bus has space for disabled people.|このバスには障害のある人のためのスペースがある。
e4426|He gambled all his money and lost it.|彼は全財産を賭けて失った。
e4427|The kids couldn't sleep from excitement.|子どもたちは興奮して眠れなかった。
e4428|Some mushrooms are poisonous.|毒のあるキノコもある。
e4429|Lawmakers voted on the new bill.|議員たちは新しい法案に投票した。
e4430|Exercise can boost your energy.|運動は元気を高めることができる。
e4431|Please reconsider your decision.|決定を考え直してください。
e4432|My mother is an accountant.|母は会計士だ。
e4433|Trees prevent soil erosion.|木は土壌の浸食を防ぐ。
e4434|We had dreadful weather on our trip.|旅行中ひどい天気だった。
e4435|The test will determine your class level.|そのテストでクラスのレベルが決まる。
e4436|Wash your hands to prevent infection.|感染を防ぐために手を洗って。
e4437|The movie is about a kidnapped girl.|その映画は誘拐された少女の話だ。
e4438|Unplug the iron when you finish.|終わったらアイロンのプラグを抜いて。
e4439|The package was left on our doorstep.|小包が玄関先に置かれていた。
e4440|It was an unfortunate accident.|それは不運な事故だった。
e4441|She sipped her hot tea slowly.|彼女は熱いお茶をゆっくりすすった。
e4442|I wholly agree with you.|私はあなたに全く同感だ。
e4443|We paid for the car in monthly installments.|車の代金を月々の分割払いで払った。
e4444|The ad was very misleading.|その広告はとても誤解を招くものだった。
e4445|This table is an antique from 1900.|このテーブルは1900年の骨董品だ。
e4446|I'll do the remainder of the work tomorrow.|仕事の残りは明日やる。
e4447|I don't know the lyrics of this song.|この歌の歌詞を知らない。
e4448|He voluntarily cleaned the classroom.|彼は自ら進んで教室を掃除した。
e4449|The taxi driver overcharged us.|タクシーの運転手は私たちに料金を多く請求した。
e4450|He comes from a respectable family.|彼はちゃんとした家の出身だ。
e4451|The furnace heats the whole house.|暖房炉が家全体を暖める。
e4452|I unlock my phone with my fingerprint.|私は指紋で携帯のロックを解除する。
e4453|The enemy finally surrendered.|敵はついに降伏した。
e4454|The crowd cheered enthusiastically.|観衆は熱狂的に声援を送った。
e4455|Her parents consented to the trip.|彼女の両親はその旅行に同意した。
e4456|Please mop the kitchen floor.|台所の床をモップでふいてください。
e4457|She works as a translator.|彼女は翻訳者として働いている。
e4458|The delay was unavoidable.|その遅れは避けられなかった。
e4459|My uncle is a stamp collector.|おじは切手収集家だ。
e4460|Many animals died of starvation.|多くの動物が飢えで死んだ。
e4461|The freeway was full of cars.|高速道路は車でいっぱいだった。
e4462|You shouldn't overwork yourself.|働きすぎてはいけない。
e4463|Can we talk privately?|内密に話せますか。
e4464|Fixing the roof was costly.|屋根の修理は高くついた。
e4465|The seeds sprouted after a week.|種は1週間後に芽を出した。
e4466|Pardon me for interrupting.|お話し中失礼します。
e4467|Children must swim under adult supervision.|子どもは大人の監督のもとで泳がなければならない。
e4468|Spray some water on the plants.|植物に水を吹きかけて。
e4469|The courageous firefighter saved the baby.|勇敢な消防士が赤ちゃんを救った。
e4470|The steak was cooked to perfection.|ステーキは完璧に焼けていた。
e4471|I scrubbed the bathtub until it shined.|浴槽をぴかぴかになるまでごしごし洗った。
e4472|Athletes need to be very disciplined.|運動選手はとても規律正しくなければならない。
e4473|It's hard to multitask while driving.|運転中に複数のことを同時にするのは難しい。
e4474|We found an inexpensive hotel near the station.|駅の近くに安価なホテルを見つけた。
e4475|The doctor gave me antibiotics.|医者は私に抗生物質を出した。
e4476|What's on the agenda for today's meeting?|今日の会議の議題は何ですか。
e4477|He has very muscular arms.|彼はとても筋肉質な腕をしている。
e4478|Hold the handrail on the stairs.|階段では手すりにつかまって。
e4479|We went through customs at the airport.|私たちは空港で税関を通った。
e4480|Please send the report electronically.|報告書は電子データで送ってください。
e4481|The castle was built to stop invaders.|その城は侵略者を防ぐために建てられた。
e4482|My father often works overtime.|父はよく残業する。
e4483|The usher showed us to our seats.|案内係が私たちを席に案内してくれた。
e4484|The little boy tumbled down the stairs.|小さな男の子が階段を転げ落ちた。
e4485|Our puppy is very playful.|うちの子犬はとても遊び好きだ。
e4486|Let's brainstorm ideas for the festival.|学園祭のアイデアを出し合おう。
e4487|We had a breakdown on the way to the beach.|海へ行く途中で車が故障した。
e4488|Influenza spreads quickly in winter.|インフルエンザは冬に急速に広がる。
e4489|She is a certified nurse.|彼女は資格を持った看護師だ。
e4490|There is a lot of variation in prices.|値段にはかなりのばらつきがある。
e4491|The architect showed us the blueprint.|建築家は私たちに設計図を見せた。
e4492|She takes after her mother.|彼女はお母さんに似ている。
e4493|This is an imitation of a famous painting.|これは有名な絵の模造品だ。
e4494|The people were evacuated before the storm.|嵐の前に人々は避難させられた。
e4495|The two teams clashed in the final.|両チームは決勝でぶつかった。
e4496|There are some unpaid bills on the table.|テーブルの上に未払いの請求書がある。
e4497|The train is full of commuters in the morning.|朝の電車は通勤客でいっぱいだ。
e4498|A tall hedge surrounds the garden.|高い生け垣が庭を囲んでいる。
e4499|There were over a hundred exhibitors at the fair.|見本市には100を超える出展者がいた。
e4500|He was unwilling to help us.|彼は私たちを手伝うのに乗り気でなかった。
e4501|Hot lava flowed down the side of the volcano.|熱い溶岩が火山の斜面を流れ下った。
e4502|Nobody should bully younger children.|誰も年下の子をいじめるべきではない。
e4503|The new game was massively popular with kids.|その新しいゲームは子どもたちに大人気だった。
e4504|The doctor prescribed some medicine for my cough.|医者は私のせきに薬を処方した。
e4505|You can get a free consultation with a lawyer.|弁護士に無料で相談できる。
e4506|The timid puppy hid behind the sofa.|臆病な子犬はソファの後ろに隠れた。
e4507|Diplomacy is better than war.|戦争より外交の方がよい。
e4508|Children are exposed to many ads online.|子どもたちはネット上で多くの広告にさらされている。
e4509|We sat by the fireplace on a cold night.|寒い夜、私たちは暖炉のそばに座った。
e4510|The band rehearsed for hours before the concert.|バンドはコンサート前に何時間もリハーサルした。
e4511|He didn't show up for the meeting.|彼は会議に現れなかった。
e4512|The commentator explained the rules of the game.|解説者が試合のルールを説明した。
e4513|My father telecommutes three days a week.|父は週に3日在宅勤務している。
e4514|The streets were deserted late at night.|夜遅く、通りには人けがなかった。
e4515|Her artwork is shown in the city museum.|彼女の芸術作品は市の美術館に展示されている。
e4516|She actively takes part in class discussions.|彼女は授業の話し合いに積極的に参加する。
e4517|My cousin is bilingual in English and Japanese.|いとこは英語と日本語の2言語を話す。
e4518|We assembled the bookshelf ourselves.|私たちは自分で本棚を組み立てた。
e4519|The ship hit a huge iceberg.|その船は巨大な氷山にぶつかった。
e4520|The old bridge needs reinforcement.|その古い橋は補強が必要だ。
e4521|The roller coaster ride was thrilling.|そのジェットコースターはスリル満点だった。
e4522|Please leave your key at the reception.|鍵は受付に預けてください。
e4523|The company discontinued this model last year.|その会社は昨年このモデルの製造を中止した。
e4524|Too much sugar can lead to diabetes.|砂糖の取りすぎは糖尿病につながることがある。
e4525|The road was partially closed for repairs.|道路は修理のため一部通行止めだった。
e4526|They renovated the old house last summer.|彼らは昨年の夏、古い家を改装した。
e4527|We are sorry for the inconvenience.|ご不便をおかけして申し訳ありません。
e4528|She gave me a detailed map of the area.|彼女はその地域の詳しい地図をくれた。
e4529|The product was not commercially successful.|その製品は商業的には成功しなかった。
e4530|Our office will relocate to Osaka next year.|私たちの事務所は来年大阪に移転する。
e4531|The factory bought new machinery.|その工場は新しい機械類を購入した。
e4532|Strange fish live on the seabed.|海底には奇妙な魚が住んでいる。
e4533|There are restrictions on water use this summer.|今年の夏は水の使用に制限がある。
e4534|I will never betray my friends.|私は決して友達を裏切らない。
e4535|This app is very user-friendly.|このアプリはとても使いやすい。
e4536|We collected food for needy families.|私たちは生活に困っている家庭のために食料を集めた。
e4537|Please be careful with the handling of glass.|ガラスの取り扱いには注意してください。
e4538|The loud noise startled the baby.|大きな音が赤ちゃんをびっくりさせた。
e4539|Cars release pollutants into the air.|車は空気中に汚染物質を出す。
e4540|Write the answer as a decimal.|答えを小数で書きなさい。
e4541|He looked irritated after waiting so long.|長く待たされて彼はいらいらしているようだった。
e4542|I read the bulletin on the school board.|学校の掲示板で掲示を読んだ。
e4543|Water evaporates quickly on hot days.|暑い日には水がすぐに蒸発する。
e4544|My aunt works as a hairdresser.|おばは美容師として働いている。
e4545|Technically, the plan is possible.|技術的にはその計画は可能だ。
e4546|Please open the attachment in my email.|メールの添付ファイルを開いてください。
e4547|We use eco-friendly shopping bags.|私たちは環境に優しい買い物袋を使う。
e4548|My phone vibrated in my pocket.|ポケットの中で携帯電話が振動した。
e4549|She spoke openly about her feelings.|彼女は自分の気持ちを率直に話した。
e4550|Please speak into the microphone.|マイクに向かって話してください。
e4551|The internet was disconnected during the storm.|嵐の間、インターネットが切断された。
e4552|My brother is very sociable and has many friends.|兄はとても社交的で友達が多い。
e4553|The dam supplies water to the whole city.|そのダムが市全体に水を供給している。
e4554|Inhale deeply and hold your breath.|深く息を吸って止めてください。
e4555|I'm trying to cut down on sweets.|甘い物を減らそうとしている。
e4556|His inability to swim worried his parents.|彼が泳げないことを両親は心配した。
e4557|The garage is full of old junk.|車庫は古いがらくたでいっぱいだ。
e4558|I was amazed at how fast she ran.|彼女の走る速さに驚いた。
e4559|The museum offers hands-on science lessons.|その博物館は体験型の理科の授業を行っている。
e4560|I finished the first draft of my essay.|作文の最初の下書きを終えた。
e4561|The town has poor drainage after heavy rain.|その町は大雨の後の水はけが悪い。
e4562|We had a fruitful discussion today.|今日は実りある話し合いができた。
e4563|We stayed at a cheap hostel in London.|私たちはロンドンの安い簡易宿泊所に泊まった。
e4564|It is unsafe to swim here.|ここで泳ぐのは危険だ。
e4565|The lighthouse guides ships at night.|灯台は夜に船を導く。
e4566|The news showed footage of the flood.|ニュースは洪水の映像を流した。
e4567|I bought new glasses at the optician.|眼鏡屋で新しい眼鏡を買った。
e4568|Their new apartment is bright and spacious.|彼らの新しいアパートは明るく広々としている。
e4569|My dad loves sports trivia.|父はスポーツの雑学が大好きだ。
e4570|The elimination of waste is our goal.|ごみの除去が私たちの目標だ。
e4571|This factory uses high-tech robots.|この工場は先端技術のロボットを使っている。
e4572|We received an anonymous letter.|私たちは匿名の手紙を受け取った。
e4573|The diver found an old ship underwater.|ダイバーは水中で古い船を見つけた。
e4574|The kids watched the clown with amusement.|子どもたちは道化師を楽しそうに見ていた。
e4575|Make sure you are adequately prepared.|十分に準備しておきなさい。
e4576|This movie is unsuitable for young children.|この映画は幼い子どもにはふさわしくない。
e4577|My nose started to bleed.|鼻血が出始めた。
e4578|We heard a continuous noise from the street.|通りから絶え間ない騒音が聞こえた。
e4579|He flattered the teacher to get a better grade.|彼はよい成績を取ろうと先生にお世辞を言った。
e4580|The rescuers found the lost hikers.|救助隊員たちは行方不明の登山者を見つけた。
e4581|The painting depicts a quiet village.|その絵は静かな村を描いている。
e4582|The city helps low-income families.|市は低所得の家庭を支援している。
e4583|We need an experienced driver for this trip.|この旅には経験豊富な運転手が必要だ。
e4584|A recruiter called me about a new job.|採用担当者から新しい仕事について電話があった。
e4585|Careless driving can result in accidents.|不注意な運転は事故につながることがある。
e4586|I watched a video tutorial on drawing.|絵の描き方の動画講座を見た。
e4587|I got a confirmation email for my order.|注文の確認メールを受け取った。
e4588|The movie was absolutely hilarious.|その映画は本当に大笑いだった。
e4589|Everyone wore a name badge at the party.|パーティーでは全員が名札をつけていた。
e4590|She is honest and trustworthy.|彼女は正直で信頼できる。
e4591|We have a family gathering every New Year.|毎年正月には家族の集まりがある。
e4592|Each entrant must pay a small fee.|参加者はそれぞれ少額の参加費を払わなければならない。
e4593|A middle-aged man helped me with my bag.|中年の男性が私のかばんを運ぶのを手伝ってくれた。
e4594|This candy has no artificial flavoring.|このキャンディーには人工香料が入っていない。
e4595|Grandpa likes to sit on the porch.|おじいちゃんはポーチに座るのが好きだ。
e4596|We had a fabulous time at the beach.|私たちは海辺ですばらしい時間を過ごした。
e4597|Divers explored the old shipwreck.|ダイバーたちは古い難破船を探検した。
e4598|This job is boring and repetitive.|この仕事は退屈で単調だ。
e4599|Check the accuracy of your answers.|答えの正確さを確認しなさい。
e4600|She unfolded the map on the table.|彼女はテーブルの上に地図を広げた。
e4601|The car was returned because of a defect.|その車は欠陥のため返品された。
e4602|We rented a cottage by the lake.|私たちは湖のそばの小さな家を借りた。
e4603|I have great admiration for my teacher.|私は先生をとても尊敬している。
e4604|She is a gifted young pianist.|彼女は才能のある若いピアニストだ。
e4605|He got a bad sprain playing soccer.|彼はサッカーをしていてひどいねんざをした。
e4606|This is a well-known song in Japan.|これは日本でよく知られた歌だ。
e4607|The hotel held a wedding banquet.|そのホテルで結婚披露宴が開かれた。
e4608|My mother got a bonus at work.|母は職場でボーナスをもらった。
e4609|He is incapable of telling a lie.|彼はうそをつくことができない。
e4610|Please pick up the litter in the park.|公園のごみを拾ってください。
e4611|What an adorable little kitten!|なんてかわいらしい子猫だろう。
e4612|Refreshments will be served after the meeting.|会議の後に軽食が出される。
e4613|Children cannot buy alcoholic drinks.|子どもはアルコール飲料を買えない。
e4614|Open the window for better ventilation.|換気をよくするために窓を開けなさい。
e4615|She wore a pearl necklace to the party.|彼女はパーティーに真珠のネックレスをつけていった。
e4616|We visited a medieval castle in Germany.|私たちはドイツの中世の城を訪れた。
e4617|Exercise has long-term health benefits.|運動には長期的な健康効果がある。
e4618|The two schools were integrated into one.|その2つの学校は1つに統合された。
e4619|It is doubtful that he will come.|彼が来るかどうかは疑わしい。
e4620|The shop buys fruit at wholesale prices.|その店は果物を卸値で仕入れる。
e4621|I handed out flyers for the school festival.|文化祭のちらしを配った。
e4622|He disguised himself as a waiter.|彼はウエーターに変装した。
e4623|It is improper to talk loudly here.|ここで大声で話すのは不適切だ。
e4624|A spokesman for the company answered questions.|会社の報道官が質問に答えた。
e4625|The tornado destroyed several houses.|竜巻が数軒の家を壊した。
e4626|The village is at an elevation of 1,000 meters.|その村は標高1,000メートルにある。
e4627|The store sells basic foodstuffs like rice.|その店は米などの基本的な食料品を売っている。
e4628|School enrollment is falling in rural areas.|地方では学校の在籍者数が減っている。
e4629|We had an enjoyable evening together.|私たちは一緒に楽しい夜を過ごした。
e4630|The children played outside during recess.|子どもたちは休み時間に外で遊んだ。
e4631|Meditation helps me relax.|瞑想は私をリラックスさせてくれる。
e4632|This is only a short-term solution.|これは短期的な解決策にすぎない。
e4633|This building was formerly a school.|この建物は以前は学校だった。
e4634|She gazed at the stars for a long time.|彼女は長い間星をじっと見ていた。
e4635|The police ruled out an accident.|警察は事故の可能性を除外した。
e4636|I got the singer's autograph.|その歌手のサインをもらった。
e4637|Her devotion to her family is amazing.|彼女の家族への献身はすばらしい。
e4638|The facts in the article are questionable.|その記事の事実は疑わしい。
e4639|The nurse injected the medicine into my arm.|看護師が私の腕に薬を注射した。
e4640|City dwellers often feel stressed.|都市の住民はしばしばストレスを感じる。
e4641|Saving energy is a collective effort.|省エネは集団での努力だ。
e4642|A beam of light came through the window.|一筋の光が窓から差し込んだ。
e4643|Snow removal is a big job in winter.|冬には除雪が大仕事だ。
e4644|Commuting by train takes an hour.|電車での通勤には1時間かかる。
e4645|We talked informally over lunch.|私たちは昼食をとりながら気軽に話した。
e4646|They had dinner at an upscale restaurant.|彼らは高級レストランで夕食をとった。
e4647|I have a subscription to a science magazine.|私は科学雑誌を定期購読している。
e4648|Our team qualified for the finals.|私たちのチームは決勝への出場資格を得た。
e4649|Many old people suffer from loneliness.|多くの高齢者が孤独に苦しんでいる。
e4650|The firefighter's actions were heroic.|その消防士の行動は英雄的だった。
e4651|This used car has low mileage.|この中古車は走行距離が短い。
e4652|The trip left a lasting memory.|その旅は長く残る思い出になった。
e4653|I do a short workout every morning.|私は毎朝短い運動をする。
e4654|Wash your hands to kill germs.|ばい菌を殺すために手を洗いなさい。
e4655|Everyone admired the brilliance of the diamond.|誰もがそのダイヤモンドの輝きに見とれた。
e4656|We strolled along the beach after dinner.|夕食後、私たちは浜辺を散歩した。
e4657|We need clear and measurable goals.|明確で測定できる目標が必要だ。
e4658|Check the expiration date on the milk.|牛乳の賞味期限を確認しなさい。
e4659|I bought a secondhand bike for my son.|息子に中古の自転車を買った。
e4660|We should live in an environmentally friendly way.|私たちは環境に優しい暮らしをするべきだ。
e4661|He carved a bird out of wood.|彼は木で鳥を彫った。
e4662|The park is an oasis in the busy city.|その公園はにぎやかな都会のオアシスだ。
e4663|I work out at the gym twice a week.|私は週に2回ジムで運動する。
e4664|The college asked for my high school transcript.|大学は高校の成績証明書を求めた。
e4665|People started a boycott of the company.|人々はその会社の不買運動を始めた。
e4666|The room was not sufficiently warm.|その部屋は十分に暖かくなかった。
e4667|The mistake was just an oversight.|その間違いは単なる見落としだった。
e4668|The coach instructed us to run faster.|コーチは私たちにもっと速く走るよう指示した。
e4669|We make compost from kitchen waste.|私たちは生ごみから堆肥を作る。
e4670|The country is growing economically.|その国は経済的に成長している。
e4671|The parking attendant showed us where to park.|駐車場の係員がどこに停めるか案内してくれた。
e4672|Dad grilled fish for dinner.|父は夕食に魚を焼いた。
e4673|We changed our internet provider.|私たちはインターネットのプロバイダーを変えた。
e4674|The potter made a beautiful bowl.|陶芸家は美しい器を作った。
e4675|I felt uneasy walking home alone.|一人で歩いて帰るのは不安だった。
e4676|There was a disturbance in the street last night.|昨夜、通りで騒ぎがあった。
e4677|It is customary to bow in Japan.|日本ではお辞儀をするのが習慣だ。
e4678|Safety regulations must be followed.|安全規則は守らなければならない。
e4679|Let's check the train timetable.|電車の時刻表を確認しよう。
e4680|The team executed the plan perfectly.|チームは計画を完璧に実行した。
e4681|Try to eat less processed food.|加工食品を減らすようにしなさい。
e4682|We watched the solar eclipse through special glasses.|私たちは特別な眼鏡で日食を見た。
e4683|Fishing is my grandfather's favorite pastime.|釣りは祖父のお気に入りの娯楽だ。
e4684|The city skyline looks beautiful at night.|夜の街のスカイラインは美しい。
e4685|It is best to drink coffee moderately.|コーヒーは適度に飲むのがいちばんだ。
e4686|Rescue teams were dispatched to the area.|救助隊がその地域に派遣された。
e4687|Traffic congestion is bad in the morning.|朝は交通渋滞がひどい。
e4688|I'm clumsy and often drop things.|私は不器用でよく物を落とす。
e4689|Don't overeat at the party.|パーティーで食べ過ぎないように。
e4690|The teacher made corrections in red ink.|先生は赤ペンで訂正した。
e4691|Take the bypass to avoid the traffic.|渋滞を避けるため迂回路を通りなさい。
e4692|We were stuck in a traffic jam for an hour.|私たちは1時間交通渋滞にはまった。
e4693|The view from the top was marvelous.|頂上からの眺めはすばらしかった。
e4694|Packaged food often contains a lot of salt.|パック詰めの食品は塩分が多いことがよくある。
e4695|We should respect our elders.|私たちは年長者を敬うべきだ。
e4696|The sign gave a warning about falling rocks.|その標識は落石の警告をしていた。
e4697|My brother will take over the family shop.|兄が家族の店を引き継ぐ予定だ。
e4698|The beer had too much foam.|そのビールは泡が多すぎた。
e4699|They announced their engagement last week.|彼らは先週婚約を発表した。
e4700|Press this button to activate the alarm.|警報を作動させるにはこのボタンを押しなさい。
e4701|Her red coat stood out in the crowd.|彼女の赤いコートは人混みの中で目立った。
e4702|A realtor showed us several houses.|不動産業者が何軒か家を見せてくれた。
e4703|It's pointless to argue with him.|彼と言い争っても無意味だ。
e4704|The room was too dim to read in.|その部屋は本を読むには薄暗すぎた。
e4705|Sugary drinks are bad for your teeth.|砂糖の多い飲み物は歯に悪い。
e4706|Too much alcohol damages the liver.|飲酒が多すぎると肝臓を傷める。
e4707|The magician did an astonishing trick.|その手品師は驚くべき手品をした。
e4708|Japan is a big producer of cars.|日本は自動車の大生産国だ。
e4709|The students carried out a science experiment.|生徒たちは理科の実験を行った。
e4710|This machine purifies the water.|この機械は水を浄化する。
e4711|Vegetables are full of important nutrients.|野菜は大切な栄養素がいっぱいだ。
e4712|She is a lecturer at a university.|彼女は大学の講師だ。
e4713|This plant is potentially dangerous to pets.|この植物はペットにとって危険な可能性がある。
e4714|A cold drink will refresh you.|冷たい飲み物を飲むと元気になる。
e4715|There is an abundance of fish in this river.|この川には魚が豊富にいる。
e4716|He is addicted to video games.|彼はテレビゲームに夢中になっている。
e4717|The boat drifted out to sea.|ボートは海へ流されていった。
e4718|He told us an amusing story.|彼は私たちにおもしろい話をしてくれた。
e4719|Don't poke the dog with a stick.|棒で犬をつつかないで。
e4720|I overheard my parents talking about me.|両親が私のことを話しているのを偶然耳にした。
e4721|Nobody could foresee the accident.|誰もその事故を予見できなかった。
e4722|Alternatively, you can take the bus.|あるいは、バスに乗ることもできる。
e4723|We had a class reunion after ten years.|10年ぶりにクラスの同窓会を開いた。
e4724|The nurse cleaned up the vomit.|看護師が吐いた物を片付けた。
e4725|Many nurses are overworked.|多くの看護師が働きすぎている。
e4726|He is a promising young player.|彼は有望な若手選手だ。
e4727|My sister is a college freshman.|姉は大学1年生だ。
e4728|The game was stopped by a thunderstorm.|雷雨で試合が中断された。
e4729|Bring a reusable bottle to school.|学校に繰り返し使えるボトルを持ってきなさい。
e4730|Sprinkle some salt on the salad.|サラダに塩を少し振りかけなさい。
e4731|She was hesitant to ask for help.|彼女は助けを求めるのをためらった。
e4732|We practiced an evacuation drill at school.|学校で避難訓練をした。
e4733|Young people are often idealistic.|若者はしばしば理想主義的だ。
e4734|Only the manager can authorize refunds.|返金を許可できるのは店長だけだ。
e4735|Put your bag in the overhead compartment.|かばんを頭上の荷物入れに入れてください。
e4736|Oil is extracted from olives.|油はオリーブから抽出される。
e4737|This item is currently unavailable.|この商品は現在入手できない。
e4738|Many young workers feel underpaid.|多くの若い労働者は給料が安いと感じている。
e4739|We called an electrician to fix the lights.|電灯を直すために電気工事士を呼んだ。
e4740|He tried to prove his innocence.|彼は自分の無罪を証明しようとした。
e4741|The test results were very encouraging.|テストの結果はとても励みになった。
e4742|Whip the cream until it is thick.|クリームが固くなるまで泡立てなさい。
e4743|I subscribe to her video channel.|私は彼女の動画チャンネルに登録している。
e4744|I listen to an English podcast every day.|私は毎日英語のポッドキャストを聞く。
e4745|You did a terrific job!|すばらしい出来だったね。
e4746|Children care a lot about fairness.|子どもは公平さをとても気にする。
e4747|The food supply was inadequate.|食料の供給は不十分だった。
e4748|The band's popularity grew quickly.|そのバンドの人気は急速に高まった。
e4749|The cat leaped onto the table.|猫はテーブルの上に跳び乗った。
e4750|I feel stressed before exams.|試験の前はストレスを感じる。
e4751|She is an adviser to the president.|彼女は社長の顧問だ。
e4752|I fully understand your feelings.|あなたの気持ちは完全にわかります。
e4753|The island is covered with thick vegetation.|その島は生い茂った草木に覆われている。
e4754|Japan faces the problem of an aging society.|日本は高齢化社会の問題に直面している。
e4755|It was a gloomy, rainy day.|どんよりとした雨の日だった。
e4756|We hiked through a deep canyon.|私たちは深い峡谷を歩いた。
e4757|I help with the household chores on weekends.|週末は家事を手伝う。
e4758|Hopefully, it will be sunny tomorrow.|明日は晴れるといいな。
e4759|Prevention is better than cure.|予防は治療に勝る。
e4760|The police halted the traffic.|警察は交通を止めた。
e4761|We had glorious weather on our trip.|旅行中はすばらしい天気だった。
e4762|We followed the trail up the mountain.|私たちは山の小道をたどって登った。
e4763|I had a sleepless night before the test.|テストの前の晩は眠れなかった。
e4764|She has very expressive eyes.|彼女はとても表情豊かな目をしている。
e4765|Don't distract me while I'm studying.|勉強中に気を散らさないで。
e4766|The toddler is learning to walk.|その幼児は歩けるようになりつつある。
e4767|Police officers patrol this area at night.|警察官が夜にこの地域を巡回する。
e4768|Prices will inevitably rise.|物価は必然的に上がるだろう。
e4769|I was envious of her new phone.|彼女の新しい携帯電話がうらやましかった。
e4770|I have a terrible toothache.|ひどい歯痛がする。
e4771|Finishing the marathon was a great accomplishment.|マラソンを完走したのは大きな達成だった。
e4772|Parrots can mimic human voices.|オウムは人の声をまねることができる。
e4773|He has been jobless for six months.|彼は半年間失業している。
e4774|Many problems stem from a lack of sleep.|多くの問題は睡眠不足から生じる。
e4775|We made arrangements for the trip.|私たちは旅行の手配をした。
e4776|Cinderella's stepmother was very mean.|シンデレラの継母はとても意地悪だった。
e4777|I want to be a veterinarian.|私は獣医になりたい。
e4778|My uncle is a real gourmet.|おじは本物の美食家だ。
e4779|The new bridge was built with taxpayers' money.|新しい橋は納税者のお金で建てられた。
e4780|It is regrettable that the event was canceled.|そのイベントが中止されたのは残念だ。
e4781|I got stung by a jellyfish.|クラゲに刺された。
e4782|He was sad about the rejection of his plan.|彼は計画が拒否されて悲しんだ。
e4783|Prolonged rain caused floods.|長引く雨で洪水が起きた。
e4784|The long walk exhausted the children.|長い散歩で子どもたちはへとへとになった。
e4785|The school sends out a monthly newsletter.|学校は毎月お便りを出している。
e4786|A light drizzle fell all morning.|午前中ずっと霧雨が降っていた。
e4787|I'm sorry, it wasn't intentional.|ごめん、わざとじゃなかったんだ。
e4788|Put recyclable bottles in the blue box.|リサイクルできる瓶は青い箱に入れなさい。
e4789|The boys wrestled on the grass.|男の子たちは芝生の上で取っ組み合った。
e4790|The game was called off because of rain.|試合は雨で中止された。
e4791|The dog licked my face.|犬が私の顔をなめた。
e4792|Grandma gave me a handmade sweater.|祖母が手作りのセーターをくれた。
e4793|The movie is an adaptation of a famous novel.|その映画は有名な小説を脚色したものだ。
e4794|I'm currently living in Tokyo.|私は現在東京に住んでいる。
e4795|My little brother goes to daycare.|弟は保育園に通っている。
e4796|He casually mentioned his new job.|彼は何気なく新しい仕事のことを口にした。
e4797|The adoption of the new system took time.|新しいシステムの採用には時間がかかった。
e4798|The food at the station was overpriced.|駅の食べ物は値段が高すぎた。
e4799|Water is dripping from the ceiling.|天井から水がしたたっている。
e4800|We urgently need more volunteers.|至急ボランティアがもっと必要だ。
e4801|She excels in math and science.|彼女は数学と理科に優れている。
e4802|The weather report was inaccurate.|天気予報は不正確だった。
e4803|Put the milk back in the fridge.|牛乳を冷蔵庫に戻しなさい。
e4804|We paddled the canoe across the lake.|私たちはカヌーをこいで湖を渡った。
e4805|The sailors came ashore for food.|船員たちは食料を求めて上陸した。
e4806|I couldn't comprehend the difficult question.|その難しい質問が理解できなかった。
e4807|We watched fireworks from the rooftop.|私たちは屋上から花火を見た。
e4808|The sculptor made a statue of a horse.|その彫刻家は馬の像を作った。
e4809|The report contains factual errors.|その報告書には事実の誤りがある。
e4810|Students eat lunch in the courtyard.|生徒たちは中庭で昼食を食べる。
e4811|This document contains classified information.|この書類には機密情報が含まれている。
e4812|Please send your résumé by email.|履歴書をメールで送ってください。
e4813|It's hard to keep up with the latest news.|最新のニュースについていくのは難しい。
e4814|The ship was carrying cargo to China.|その船は中国へ貨物を運んでいた。
e4815|I got a voucher for a free meal.|無料の食事券をもらった。
e4816|The car accelerated quickly onto the highway.|車は高速道路に入ると急加速した。
e4817|You can substitute honey for sugar.|砂糖の代わりにはちみつを使ってもよい。
e4818|The road was paved last year.|その道路は昨年舗装された。
e4819|She turned down the job offer.|彼女はその仕事の申し出を断った。
e4820|He made a strong denial of the rumor.|彼はそのうわさを強く否定した。
e4821|They sang a patriotic song.|彼らは愛国的な歌を歌った。
e4822|The organizers of the festival thanked everyone.|祭りの主催者が皆に感謝した。
e4823|The farmer drove a tractor across the field.|農家の人がトラクターで畑を走った。
e4824|You can legally drive at eighteen in Japan.|日本では18歳で合法的に運転できる。
e4825|The receptionist asked for my name.|受付係が私の名前を尋ねた。
e4826|The old coins turned out to be worthless.|その古い硬貨は価値がないとわかった。
e4827|All bags go through security screening.|すべてのかばんは保安検査を通る。
e4828|He took photos of the beach with a drone.|彼はドローンで海辺の写真を撮った。
e4829|She fought against injustice all her life.|彼女は生涯不正と闘った。
e4830|There is a striking difference between the twins.|その双子には著しい違いがある。
e4831|We took a tram to the city center.|私たちは路面電車で市の中心部へ行った。
e4832|Use hand sanitizer before eating.|食べる前に手指消毒液を使いなさい。
e4833|The hotel is conveniently located near the station.|そのホテルは駅の近くの便利な場所にある。
e4834|These flowers are artificially colored.|これらの花は人工的に着色されている。
e4835|She bought a new outfit for the party.|彼女はパーティー用に新しい服を一そろい買った。
e4836|He speaks English with a French accent.|彼はフランス語なまりの英語を話す。
e4837|India is an emerging economic power.|インドは新興の経済大国だ。
e4838|Turn off the faucet when you brush your teeth.|歯をみがくときは蛇口を閉めなさい。
e4839|We buy vegetables grown locally.|私たちは地元で育てられた野菜を買う。
e4840|Teachers have too much paperwork.|教師は事務仕事が多すぎる。
e4841|The garden is full of fragrant roses.|庭は香りのよいバラでいっぱいだ。
e4842|My daughter does gymnastics after school.|娘は放課後に体操をしている。
e4843|I reckon it will rain later.|後で雨が降ると思う。
e4844|Volunteering is a meaningful experience.|ボランティアは有意義な経験だ。
e4845|All the old photos were saved digitally.|古い写真はすべてデジタルで保存された。
e4846|Children are vaccinated against measles.|子どもたちははしかの予防接種を受ける。
e4847|This job needs specialized skills.|この仕事には専門の技能が必要だ。
e4848|He was a college dropout but became rich.|彼は大学中退者だったが金持ちになった。
e4849|Her patience is admirable.|彼女の忍耐強さは立派だ。
e4850|The red light indicates danger.|赤いランプは危険を示している。
e4851|The hospital has its own generator.|その病院には自家発電機がある。
e4852|My grandfather is witty and fun.|祖父は機知に富んでいて楽しい。
e4853|The hall can accommodate 500 people.|そのホールは500人を収容できる。
e4854|My car was towed away.|私の車はレッカー移動された。
e4855|The entrance examination is next week.|入学試験は来週だ。
e4856|She inclined her head and smiled at me.|彼女は首をかしげて私にほほえんだ。
e4857|You have to open the door manually.|そのドアは手で開けなければならない。
e4858|Subtract 5 from 12.|12から5を引きなさい。
e4859|We made a few modifications to the plan.|私たちは計画にいくつか修正を加えた。
e4860|He didn't break the cup intentionally.|彼はわざとカップを割ったのではない。
e4861|Microscopic creatures live in pond water.|池の水には微小な生き物が住んでいる。
e4862|I reorganized my bookshelf yesterday.|昨日、本棚を整理し直した。
e4863|The doctor diagnosed her with the flu.|医者は彼女をインフルエンザと診断した。
e4864|The thermometer shows 30 degrees.|温度計は30度を示している。
e4865|A spokesperson for the city answered questions.|市の広報担当者が質問に答えた。
e4866|We dined at a nice restaurant.|私たちはすてきなレストランで食事をした。
e4867|Each area has its own regional food.|それぞれの地域には郷土料理がある。
e4868|War is often born from hatred.|戦争はしばしば憎しみから生まれる。
e4869|We bought takoyaki from a stall at the festival.|祭りの屋台でたこ焼きを買った。
e4870|Tokyo is at about 140 degrees east longitude.|東京は東経約140度にある。
e4871|Your homework is still incomplete.|あなたの宿題はまだ終わっていない。
e4872|He is a train enthusiast.|彼は鉄道愛好家だ。
e4873|The trip was an unforgettable experience.|その旅は忘れられない経験だった。
e4874|I twisted my ankle on the stairs.|階段で足首をひねった。
e4875|His demands were unreasonable.|彼の要求は理不尽だった。
e4876|The restoration of the old temple took years.|その古い寺の修復には何年もかかった。
e4877|We walked along a gravel path.|私たちは砂利道を歩いた。
e4878|He is a legendary baseball player.|彼は伝説的な野球選手だ。
e4879|His prediction about the game was right.|試合についての彼の予想は当たった。
e4880|That noise is really annoying.|あの音は本当にうるさい。
e4881|Two phones rang simultaneously.|2台の電話が同時に鳴った。
e4882|I picked up a pamphlet about the museum.|その博物館のパンフレットをもらった。
e4883|After some persuasion, he agreed to come.|少し説得すると、彼は来ることに同意した。
e4884|Everything is made of atoms.|すべての物は原子でできている。
e4885|I signed up for a cooking class.|料理教室に申し込んだ。
e4886|We keep old toys in the attic.|古いおもちゃは屋根裏部屋にしまっている。
e4887|The shop closed permanently last month.|その店は先月閉店した。
e4888|Paper lanterns lit up the summer festival.|紙のちょうちんが夏祭りを照らした。
e4889|The directions were very confusing.|その道順の説明はとてもわかりにくかった。
e4890|Eating too much fat raises cholesterol.|脂肪を取りすぎるとコレステロールが上がる。
e4891|Shipping is free for orders over 3,000 yen.|3,000円以上の注文は送料無料だ。
e4892|It is impolite to stare at people.|人をじろじろ見るのは失礼だ。
e4893|A nutritionist planned our school lunches.|栄養士が私たちの給食の献立を立てた。
e4894|The kitchen must be kept hygienic.|台所は衛生的に保たなければならない。
e4895|She was a nominee for the best actress award.|彼女は主演女優賞の候補者だった。
e4896|You must confront your fears.|恐怖に立ち向かわなければならない。
e4897|The company went bankrupt last year.|その会社は昨年倒産した。
e4898|Bees carry pollen from flower to flower.|ミツバチは花から花へ花粉を運ぶ。
e4899|The kids were fascinated by the dinosaurs.|子どもたちは恐竜に夢中になった。
e4900|The singer made her debut at sixteen.|その歌手は16歳でデビューした。
e4901|The school is known for its academic excellence.|その学校は学業の優秀さで知られている。
e4902|We said goodbye to our beloved dog.|私たちは最愛の犬に別れを告げた。
e4903|She was appointed captain of the team.|彼女はチームのキャプテンに任命された。
e4904|The band has a gig on Saturday night.|そのバンドは土曜の夜にライブがある。
e4905|The food at that hotel was superb.|あのホテルの料理は最高だった。
e4906|I got a letter of acceptance from the college.|大学から合格通知を受け取った。
e4907|She gave an indirect answer.|彼女は遠回しな答えをした。
e4908|The baby is sleeping in the cradle.|赤ちゃんは揺りかごの中で眠っている。
e4909|The nurse put a bandage on my knee.|看護師がひざに包帯を巻いてくれた。
e4910|It has become noticeably colder.|目立って寒くなってきた。
e4911|Taking the bus is more economical.|バスに乗る方が経済的だ。
e4912|The captain navigated the ship through the storm.|船長は嵐の中で船を操縦した。
e4913|She has Irish ancestry.|彼女はアイルランド系の家系だ。
e4914|The teacher pointed out my mistakes.|先生が私の間違いを指摘した。
e4915|I made a small adjustment to the seat.|座席を少し調整した。
e4916|He has a bachelor's degree in history.|彼は歴史学の学士号を持っている。
e4917|Your help is greatly appreciated.|ご協力に大いに感謝します。
e4918|The lifeguard watched the swimmers carefully.|監視員は泳ぐ人たちを注意深く見守った。
e4919|I was relieved to hear the news.|その知らせを聞いてほっとした。
e4920|This song makes me feel nostalgic.|この歌を聞くと懐かしい気持ちになる。
e4921|The blizzard closed all the roads.|吹雪ですべての道路が閉鎖された。
e4922|Our neighbor is a warm-hearted old woman.|隣の人は心の温かいおばあさんだ。
e4923|Rinse the dishes with hot water.|お皿をお湯ですすぎなさい。
e4924|This medicine may make you drowsy.|この薬を飲むと眠くなることがある。
e4925|There is a strong rivalry between the two teams.|その2チームの間には強い対抗意識がある。
e4926|She sells cosmetics at a department store.|彼女はデパートで化粧品を売っている。
e4927|Our cat is very affectionate.|うちの猫はとても甘えん坊だ。
e4928|Her answer astonished everyone.|彼女の答えは皆を驚かせた。
e4929|The mother hugged her son with affection.|母親は愛情をこめて息子を抱きしめた。
e4930|Please rewrite this sentence more clearly.|この文をもっとわかりやすく書き直してください。
e4931|I called her repeatedly, but she didn't answer.|何度も電話したが、彼女は出なかった。
e4932|His dedication to his work is admirable.|彼の仕事への献身は立派だ。
e4933|Put on sunscreen before you go outside.|外に出る前に日焼け止めを塗りなさい。
e4934|The police are looking into the case.|警察はその事件を調べている。
e4935|We gave her flowers in appreciation of her help.|私たちは手伝いへの感謝として彼女に花を贈った。
e4936|Customers showed dissatisfaction with the service.|客はそのサービスに不満を示した。
e4937|The country is politically stable.|その国は政治的に安定している。
e4938|Each interviewee was asked the same questions.|面接を受ける人は皆同じ質問をされた。
e4939|There was a collision between two cars.|2台の車の衝突があった。
e4940|That's a ridiculous idea.|それはばかげた考えだ。
e4941|Gasoline prices went up again.|ガソリン価格がまた上がった。
e4942|Henry Ford made automobiles popular.|ヘンリー・フォードは自動車を普及させた。
e4943|Please hand in your homework by Friday.|金曜日までに宿題を提出してください。
e4944|Plug the charger into the socket.|充電器をコンセントに差し込みなさい。
e4945|The closure of the factory hurt the town.|工場の閉鎖は町に打撃を与えた。
e4946|Do you want to swap seats with me?|私と席を交換したい？
e4947|The winners were chosen randomly.|当選者は無作為に選ばれた。
e4948|The election will be held next Sunday.|選挙は来週の日曜日に行われる。
e4949|A market analyst explained the data.|市場アナリストがそのデータを説明した。
e4950|The school was closed for an indefinite period.|その学校は無期限で閉鎖された。
e4951|The wildfire spread quickly in the dry wind.|乾いた風で山火事は急速に広がった。
e4952|The test was surprisingly easy.|テストは驚くほど簡単だった。
e4953|Use the underpass to cross the road.|道路を渡るには地下道を使いなさい。
e4954|Visibility was poor because of the fog.|霧のため視界が悪かった。
e4955|She is in the advanced English class.|彼女は上級英語クラスにいる。
e4956|The doctor urged him to stop smoking.|医者は彼に禁煙するよう強く勧めた。
e4957|The missile fell into the sea.|そのミサイルは海に落ちた。
e4958|He was dissatisfied with his grade.|彼は自分の成績に不満だった。
e4959|The roads are congested during holidays.|休日は道路が混雑する。
e4960|Once you have had it, you are immune.|一度かかると免疫ができる。
e4961|Mice and squirrels are rodents.|ネズミやリスは齧歯類だ。
e4962|We congratulated her on her new baby.|私たちは彼女の赤ちゃん誕生を祝った。
e4963|The book needs some revision.|その本はいくらか改訂が必要だ。
e4964|We used worms as bait for fishing.|私たちは釣りのえさにミミズを使った。
e4965|The coral in Okinawa is very beautiful.|沖縄のサンゴはとても美しい。
e4966|The flu is a highly infectious disease.|インフルエンザは感染力の強い病気だ。
e4967|The relocation of the office took a month.|事務所の移転には1か月かかった。
e4968|We roasted a chicken for Christmas.|クリスマスに鶏を丸焼きにした。
e4969|The students worked cooperatively in groups.|生徒たちはグループで協力して作業した。
e4970|He moved to the city in early adulthood.|彼は成人して間もなく都会へ引っ越した。
e4971|I bought a new mattress for my bed.|ベッド用に新しいマットレスを買った。
e4972|My uncle visited us unexpectedly.|おじが思いがけなく訪ねてきた。
e4973|She was elected chairperson of the committee.|彼女は委員会の議長に選ばれた。
e4974|I love the simplicity of this design.|このデザインのシンプルさが大好きだ。
e4975|The path up the hill is very steep.|丘への小道はとても急だ。
e4976|Many fish live around the coral reef.|サンゴ礁の周りには多くの魚が住んでいる。
e4977|I read comics to escape boredom.|退屈しのぎに漫画を読む。
e4978|The students were attentive during the lecture.|生徒たちは講義中熱心に聞いていた。
e4979|The stairway leads to the roof.|その階段は屋上に通じている。
e4980|Without love, life is meaningless.|愛がなければ人生は無意味だ。
e4981|The farm raises poultry and pigs.|その農場は家禽と豚を飼育している。
e4982|Let's use our time productively.|時間を有効に使おう。
e4983|He received a large inheritance from his aunt.|彼はおばから多額の遺産を受け取った。
e4984|Pandas eat a lot of bamboo.|パンダは竹をたくさん食べる。
e4985|The storm caused minimal damage.|嵐の被害は最小限だった。
e4986|A parent or guardian must sign this form.|親または保護者がこの用紙に署名しなければならない。
e4987|I helped Mom carry the groceries.|母が食料品を運ぶのを手伝った。
e4988|High heels are impractical for hiking.|ハイヒールはハイキングには実用的でない。
e4989|The deadline for submission is Monday.|提出の締め切りは月曜日だ。
e4990|The documents were sent by courier.|書類は宅配便で送られた。
e4991|We need to get rid of these old clothes.|この古い服を処分する必要がある。
e4992|Grandma stitched a patch onto my jeans.|祖母がジーンズに当て布を縫いつけてくれた。
e4993|His story was inconsistent.|彼の話には一貫性がなかった。
e4994|Early detection of cancer saves lives.|がんの早期発見は命を救う。
e4995|We took the ferry to the island.|私たちはフェリーで島へ行った。
e4996|This fish was caught sustainably.|この魚は持続可能な方法でとられた。
e4997|He is an amateur photographer.|彼はアマチュア写真家だ。
e4998|Prices soared after the storm.|嵐の後、物価が急上昇した。
e4999|They set up a new company last year.|彼らは昨年新しい会社を設立した。
e5000|The ball smashed the window.|ボールが窓を粉々に割った。
e5001|Guards walked along the perimeter of the base.|警備員が基地の周囲を歩いた。
e5002|Take time to savor every bite.|一口ずつゆっくり味わってね。
e5003|The company announced cutbacks in staff.|会社は人員削減を発表した。
e5004|Sorry, I digress; back to the main point.|すみません、脱線しました。本題に戻ります。
e5005|A short speech preceded the dinner.|夕食の前に短いスピーチがあった。
e5006|We need a pragmatic solution to this problem.|この問題には現実的な解決策が必要だ。
e5007|Scientists study evolutionary changes in birds.|科学者は鳥の進化の変化を研究している。
e5008|The city subsidizes bus fares for seniors.|市は高齢者のバス運賃に補助金を出している。
e5009|The kids had a squabble over the toy.|子どもたちはおもちゃのことで口げんかした。
e5010|A gust of wind blew my hat away.|突風で帽子が飛ばされた。
e5011|She was indignant at the unfair treatment.|彼女は不当な扱いに憤慨していた。
e5012|He renounced his claim to the throne.|彼は王位継承権を放棄した。
e5013|This disease is prevalent in hot regions.|この病気は暑い地域で広く見られる。
e5014|He clenched his fists in anger.|彼は怒ってこぶしを握りしめた。
e5015|It is a common misconception that bats are blind.|コウモリは目が見えないというのはよくある誤解だ。
e5016|The law protects workers from exploitation.|その法律は労働者を搾取から守る。
e5017|He tried to manipulate public opinion.|彼は世論を操作しようとした。
e5018|We need empirical evidence to support this theory.|この理論を裏付ける実証的な証拠が必要だ。
e5019|He was arrested for inciting violence.|彼は暴力を扇動した罪で逮捕された。
e5020|I said it without any malice.|悪気はまったくなくそう言った。
e5021|Your criticism is completely unwarranted.|あなたの批判はまったく不当だ。
e5022|His cynicism about politics is understandable.|彼の政治への冷めた見方は理解できる。
e5023|The cave is made of limestone.|その洞窟は石灰岩でできている。
e5024|A red flag denotes danger.|赤い旗は危険を示す。
e5025|Many young players emulate their heroes.|多くの若い選手があこがれの選手を見習う。
e5026|We must reduce our expenditure on energy.|エネルギーへの支出を減らさなければならない。
e5027|We saw majestic mountains from the train.|電車から雄大な山々が見えた。
e5028|We laughed heartily at his joke.|私たちは彼の冗談に心から笑った。
e5029|There is still a stigma around mental illness.|心の病にはいまだに偏見がある。
e5030|The storm intensified overnight.|嵐は夜の間に激しくなった。
e5031|The leaders discussed nuclear disarmament.|首脳たちは核軍縮について話し合った。
e5032|A militant group attacked the town.|過激派グループがその町を襲った。
e5033|I wholeheartedly agree with you.|あなたに心から賛成します。
e5034|She tried to pacify the crying baby.|彼女は泣いている赤ちゃんをなだめようとした。
e5035|The hostages were finally released.|人質たちはついに解放された。
e5036|He is inept at handling money.|彼はお金の管理が下手だ。
e5037|Wearing a helmet is obligatory here.|ここではヘルメットの着用が義務だ。
e5038|This restaurant is supposedly the best in town.|この店は町で一番だということになっている。
e5039|The airport was built on reclamation land.|その空港は埋め立て地に建てられた。
e5040|I had a hunch that he would win.|彼が勝つ予感がしていた。
e5041|She surmounted many difficulties to succeed.|彼女は多くの困難を乗り越えて成功した。
e5042|He gives money to charitable causes.|彼は慈善活動にお金を寄付している。
e5043|If you persevere, you will succeed.|やり抜けば、きっと成功する。
e5044|This drug counteracts the poison.|この薬は毒を中和する。
e5045|He bought the car out of vanity.|彼は見栄でその車を買った。
e5046|Garlic is said to ward off colds.|ニンニクは風邪を防ぐと言われている。
e5047|They voted to amend the law.|彼らは法律を改正することに投票した。
e5048|He works for the provincial government.|彼は州政府で働いている。
e5049|The proprietor of the shop greeted us.|店の経営者が私たちを出迎えた。
e5050|The doctors think she will pull through.|医師たちは彼女が持ち直すと考えている。
e5051|He is only the nominal leader of the team.|彼はチームの名ばかりのリーダーだ。
e5052|Workers unearthed an old coin.|作業員が古い硬貨を掘り出した。
e5053|She was a precocious child who read early.|彼女は早くから本を読むませた子だった。
e5054|He has a deep, masculine voice.|彼は低くて男らしい声をしている。
e5055|He works at a correctional facility.|彼は矯正施設で働いている。
e5056|Check the compatibility of the software first.|まずソフトの互換性を確認してください。
e5057|Fish abound in this river.|この川には魚がたくさんいる。
e5058|The armistice was signed in 1918.|休戦協定は1918年に結ばれた。
e5059|It rained for five consecutive days.|5日連続で雨が降った。
e5060|He worked as an apprentice to a carpenter.|彼は大工の見習いとして働いた。
e5061|She works for a multinational company.|彼女は多国籍企業で働いている。
e5062|The old wall began to crumble.|古い壁が崩れ始めた。
e5063|Let's sort out this problem together.|一緒にこの問題を解決しよう。
e5064|We dismantled the old shelf.|私たちは古い棚を分解した。
e5065|Language acquisition is easier for children.|言語の習得は子どもの方が容易だ。
e5066|The cost is proportional to the size.|費用は大きさに比例する。
e5067|Her music always uplifts my spirits.|彼女の音楽はいつも私の気分を高めてくれる。
e5068|They ridiculed his strange idea.|彼らは彼の奇妙な考えをあざ笑った。
e5069|He denied any complicity in the crime.|彼はその犯罪への加担を否定した。
e5070|He faces prosecution for fraud.|彼は詐欺で起訴されそうだ。
e5071|Emigration to America increased in that period.|その時期にアメリカへの移住が増えた。
e5072|The test results were inconclusive.|検査結果ははっきりしなかった。
e5073|Fear underlies much of his anger.|彼の怒りの多くの根底には恐れがある。
e5074|Thank you for your insightful comments.|鋭いご意見をありがとうございます。
e5075|The firm plans to restructure its business.|その会社は事業を再編する予定だ。
e5076|Losing the match was a big setback.|その試合に負けたのは大きなつまずきだった。
e5077|She refused the offer outright.|彼女はその申し出をきっぱり断った。
e5078|Her diligence was rewarded with a promotion.|彼女の勤勉さは昇進で報われた。
e5079|The audience applauded loudly.|観客は大きな拍手を送った。
e5080|We are in grave danger.|私たちは重大な危機にある。
e5081|He was the target of a vicious rumor.|彼は悪意のあるうわさの標的になった。
e5082|It was a success, albeit a small one.|小さいながらもそれは成功だった。
e5083|The country suffered years of economic stagnation.|その国は何年も経済の停滞に苦しんだ。
e5084|I find his attitude repugnant.|彼の態度はとても不快だ。
e5085|Farmers irrigate their fields with river water.|農家は川の水で畑に水を引く。
e5086|We could not pinpoint the cause of the problem.|問題の原因を特定できなかった。
e5087|This phrase is too colloquial for an essay.|この表現は作文にはくだけすぎだ。
e5088|The advent of smartphones changed our lives.|スマートフォンの登場が私たちの生活を変えた。
e5089|The town is enjoying a cultural renaissance.|その町は文化的な復興期を迎えている。
e5090|Please don't misinterpret my words.|私の言葉を誤解しないでください。
e5091|She has an innate talent for music.|彼女には生まれつきの音楽の才能がある。
e5092|Her smile was just a facade.|彼女の笑顔はただの見せかけだった。
e5093|Safety is paramount in this job.|この仕事では安全が最も重要だ。
e5094|Tears trickled down her cheeks.|涙が彼女のほおをつたった。
e5095|He had a relapse after leaving the hospital.|彼は退院後に病気が再発した。
e5096|She can trace her lineage back to a samurai.|彼女は家系を侍までさかのぼれる。
e5097|I'm sorry to intrude on your evening.|夜分にお邪魔してすみません。
e5098|You have my wholehearted support.|私は心からあなたを応援しています。
e5099|The police are investigating the abduction.|警察はその誘拐事件を捜査している。
e5100|His public persona is very different from his real self.|彼の人前での顔は本当の姿とまったく違う。
e5101|They live in an affluent neighborhood.|彼らは裕福な地域に住んでいる。
e5102|Her talent is undeniable.|彼女の才能は否定できない。
e5103|The hotel offers complimentary breakfast.|そのホテルは無料の朝食を出している。
e5104|The boss reprimanded him for being late.|上司は遅刻した彼を叱責した。
e5105|The trip was canceled due to unforeseen problems.|予期しない問題で旅行は中止になった。
e5106|The new store undercut its rivals' prices.|新しい店は競合より安い値段で売った。
e5107|The scandal damaged his credibility.|そのスキャンダルで彼の信用は傷ついた。
e5108|She showed great mastery of the violin.|彼女はバイオリンの見事な腕前を見せた。
e5109|We had a bountiful harvest this year.|今年は豊作だった。
e5110|He retracted his statement the next day.|彼は翌日発言を撤回した。
e5111|The government introduced austerity measures.|政府は緊縮策を導入した。
e5112|She was instrumental in starting the club.|彼女はクラブの設立に大きな役割を果たした。
e5113|Keep the receipt for reimbursement.|払い戻しのためにレシートを保管してください。
e5114|The upkeep of a big house is expensive.|大きな家の維持費は高い。
e5115|Do not ingest this liquid.|この液体を飲み込まないでください。
e5116|He wore a hideous sweater to the party.|彼はひどく醜いセーターでパーティーに来た。
e5117|It was a degrading experience for him.|それは彼にとって屈辱的な経験だった。
e5118|He was fired for serious misconduct.|彼は重大な不正行為で解雇された。
e5119|Boil the bottles to sterilize them.|瓶を煮沸して殺菌しなさい。
e5120|We must minimize the risk of fire.|火事の危険を最小限にしなければならない。
e5121|She trusted him implicitly.|彼女は彼を全面的に信頼していた。
e5122|The school aims for equity in education.|その学校は教育の公平を目指している。
e5123|He made a provocative remark on TV.|彼はテレビで挑発的な発言をした。
e5124|This bread has gone stale.|このパンは古くなってかたくなった。
e5125|She gave a wistful smile.|彼女は切なげにほほえんだ。
e5126|It is better to err on the side of caution.|用心しすぎるくらいの方がよい。
e5127|The products are rigorously tested.|製品は厳密に検査されている。
e5128|The kidnappers demanded a large ransom.|誘拐犯は多額の身代金を要求した。
e5129|We need an unbiased opinion.|偏りのない意見が必要だ。
e5130|I can attest to her honesty.|彼女が正直であることは私が保証できる。
e5131|They protested the encroachment on their land.|彼らは土地の侵害に抗議した。
e5132|We need to rein in our spending.|出費を抑える必要がある。
e5133|The drug is still in clinical trials.|その薬はまだ臨床試験中だ。
e5134|The company denied any wrongdoing.|その会社は一切の不正を否定した。
e5135|Scientists measured the toxicity of the water.|科学者たちは水の毒性を測定した。
e5136|The song has a catchy tune.|その歌は耳に残るメロディーだ。
e5137|Buy from a reputable dealer.|信頼できる業者から買いなさい。
e5138|The team lacked cohesion this season.|今シーズンのチームはまとまりに欠けていた。
e5139|The farmer plowed the field in spring.|農家は春に畑を耕した。
e5140|Water is the main constituent of the body.|水は体の主な構成要素だ。
e5141|I was gratified by their kind words.|彼らの親切な言葉をうれしく思った。
e5142|The charity helps underprivileged children.|その慈善団体は恵まれない子どもを支援している。
e5143|Firefighters fought the blaze all night.|消防士たちは一晩中火災と戦った。
e5144|A world without war is not just a utopia.|戦争のない世界はただの理想郷ではない。
e5145|The win solidified his position as leader.|その勝利で彼のリーダーとしての地位が固まった。
e5146|Let me check our itinerary for tomorrow.|明日の旅程を確認させて。
e5147|She entrusted her cat to a neighbor.|彼女は猫を隣人に預けた。
e5148|The new rule is discriminatory against women.|新しい規則は女性に対して差別的だ。
e5149|This decision will set a precedent.|この決定は前例となるだろう。
e5150|This offer is exclusively for members.|この特典は会員限定だ。
e5151|The school custodian locked the doors.|学校の管理人がドアに鍵をかけた。
e5152|It was an inadvertent mistake.|それはうっかりしたミスだった。
e5153|The book is a chronicle of the war.|その本は戦争の記録だ。
e5154|I envision a future without poverty.|私は貧困のない未来を思い描いている。
e5155|Congress voted to impeach the president.|議会は大統領を弾劾することを議決した。
e5156|He is nominally in charge of the project.|彼は名目上そのプロジェクトの責任者だ。
e5157|She was destined to become a star.|彼女はスターになる運命だった。
e5158|Free lunch is one perk of this job.|無料の昼食はこの仕事の特典の一つだ。
e5159|The light was diffused through the curtain.|光はカーテン越しに柔らかく広がった。
e5160|There was no animosity between the two teams.|両チームの間に敵意はなかった。
e5161|She has a soothing voice.|彼女は心が落ち着く声をしている。
e5162|After long deliberation, the jury reached a verdict.|長い審議の末、陪審は評決に達した。
e5163|The whistleblower exposed the company's lies.|内部告発者が会社のうそを暴いた。
e5164|The king was exiled from his country.|王は国外へ追放された。
e5165|Stock prices plummeted yesterday.|昨日、株価が急落した。
e5166|There is a large disparity in income.|所得に大きな格差がある。
e5167|Law enforcement officers arrived quickly.|警察官たちがすぐに到着した。
e5168|Fax machines are almost obsolete now.|ファックスは今やほぼ時代遅れだ。
e5169|The park warden told us to stay on the path.|公園の監視員に道から外れないよう言われた。
e5170|A famous actor narrated the film.|有名な俳優がその映画のナレーションをした。
e5171|We bought snacks during the intermission.|休憩時間にお菓子を買った。
e5172|There will be intermittent rain today.|今日は断続的に雨が降るだろう。
e5173|Investors worry about market volatility.|投資家は市場の不安定さを心配している。
e5174|Disease decimated the bird population.|病気で鳥の数が激減した。
e5175|She still harbors doubts about him.|彼女はまだ彼に疑いを抱いている。
e5176|You are under no compulsion to pay.|あなたに支払いの義務はありません。
e5177|He is obsessive about cleaning.|彼は異常なほどきれい好きだ。
e5178|It is a subsidiary company of a big bank.|それは大手銀行の子会社だ。
e5179|Sediment collected at the bottom of the lake.|湖の底に堆積物がたまった。
e5180|The contract stipulates a fixed price.|契約は固定価格を定めている。
e5181|He crossed the room in three strides.|彼は大またの3歩で部屋を横切った。
e5182|The town is reliant on tourism.|その町は観光に頼っている。
e5183|Smartphones have a pervasive influence on our lives.|スマホは生活に広く影響を及ぼしている。
e5184|She worked with great zeal.|彼女はすごい熱意で働いた。
e5185|Bad habits can become deeply ingrained.|悪い習慣は深く染みつくことがある。
e5186|A local restaurant catered the wedding.|地元のレストランが結婚式の料理を用意した。
e5187|That salesman is a real crook.|あの営業マンはとんだ詐欺師だ。
e5188|There is one snag in your plan.|あなたの計画には一つ問題点がある。
e5189|What can we infer from this data?|このデータから何が推測できるだろうか。
e5190|The two companies are separate legal entities.|その2社は別々の法人だ。
e5191|Can you expedite the delivery?|配送を早めてもらえますか。
e5192|Smoking is detrimental to your health.|喫煙は健康に有害だ。
e5193|A consumer watchdog criticized the company.|消費者監視団体がその会社を批判した。
e5194|The electorate wants lower taxes.|有権者は減税を望んでいる。
e5195|He looked bewildered by the question.|彼はその質問に当惑しているようだった。
e5196|The two friends made a pact to stay in touch.|二人の友人は連絡を取り合う約束をした。
e5197|She aspires to become a doctor.|彼女は医者になることを目指している。
e5198|The fertility of the soil is very high.|その土地はとても肥沃だ。
e5199|He has a strong entrepreneurial spirit.|彼は強い起業家精神を持っている。
e5200|She painstakingly restored the old painting.|彼女はその古い絵を丹念に修復した。
e5201|My father is an avid reader.|父は大の読書家だ。
e5202|It was thoughtless of me to say that.|あんなことを言うなんて私は軽率だった。
e5203|I cringe when I see my old photos.|昔の写真を見るとぞっとする。
e5204|The statue had a grotesque face.|その像は奇怪な顔をしていた。
e5205|The firefighter wore breathing apparatus.|消防士は呼吸装置をつけていた。
e5206|She cried out in anguish.|彼女は苦しみのあまり叫んだ。
e5207|A ferocious dog guarded the gate.|どう猛な犬が門を守っていた。
e5208|We can only speculate about the cause.|原因については推測するしかない。
e5209|The scientists noticed an anomaly in the data.|科学者たちはデータに異常があることに気づいた。
e5210|All players must adhere to the rules.|全選手は規則を守らなければならない。
e5211|He allegedly stole the money.|彼はそのお金を盗んだとされている。
e5212|We want an inclusive society for everyone.|私たちは誰も排除しない社会を望んでいる。
e5213|Their intimacy grew over the years.|二人の親しさは年月とともに深まった。
e5214|Women constitute half of the staff.|女性が職員の半分を占めている。
e5215|He worked hard to redeem himself.|彼は名誉挽回のために懸命に働いた。
e5216|She was disheartened by the bad news.|彼女は悪い知らせに落胆した。
e5217|He agreed with great reluctance.|彼はしぶしぶ同意した。
e5218|This lens magnifies objects ten times.|このレンズは物を10倍に拡大する。
e5219|He is a ruthless businessman.|彼は冷酷なビジネスマンだ。
e5220|The living conditions were appalling.|生活環境はひどいものだった。
e5221|The takeover of the company was announced today.|その会社の買収が今日発表された。
e5222|His anger slowly began to ebb.|彼の怒りはゆっくりと収まり始めた。
e5223|The rebels tried to overthrow the government.|反乱軍は政府を倒そうとした。
e5224|It is hypocritical to preach what you don't practice.|自分が実行しないことを説くのは偽善的だ。
e5225|She is a general practitioner in our town.|彼女は町の一般開業医だ。
e5226|He had the foresight to save money.|彼には貯金しておく先見の明があった。
e5227|He worked long hours to the detriment of his health.|彼は健康を犠牲にして長時間働いた。
e5228|We had to curtail our travel plans.|旅行の計画を縮小しなければならなかった。
e5229|There was sporadic fighting near the border.|国境付近で散発的な戦闘があった。
e5230|She is a shrewd negotiator.|彼女は抜け目のない交渉人だ。
e5231|My grandmother is very superstitious.|祖母はとても迷信深い。
e5232|Japan suffered from deflation for years.|日本は何年もデフレに苦しんだ。
e5233|They demolished the old school building.|古い校舎が取り壊された。
e5234|There are inconsistencies in his story.|彼の話には矛盾がある。
e5235|The refugees are in dire need of food.|難民たちは食料にひどく困っている。
e5236|Fluctuations in temperature affect the crops.|気温の変動は作物に影響する。
e5237|The teacher scrutinized my report.|先生は私のレポートを細かく調べた。
e5238|The situation in the region is volatile.|その地域の情勢は不安定だ。
e5239|Procrastination is my biggest weakness.|先延ばしが私の最大の弱点だ。
e5240|He was taken to the school infirmary.|彼は学校の保健室に運ばれた。
e5241|The city built a new sewage system.|市は新しい下水道を作った。
e5242|Public transport is almost nonexistent here.|ここには公共交通機関がほとんどない。
e5243|This is a transitional period for the company.|今は会社にとって過渡期だ。
e5244|He defied his parents and went out.|彼は両親に逆らって出かけた。
e5245|He is under the delusion that he is famous.|彼は自分が有名だと思い込んでいる。
e5246|We need tangible results this year.|今年は目に見える成果が必要だ。
e5247|Children are full of spontaneity.|子どもたちはのびのびとしている。
e5248|The police caught the perpetrator.|警察は犯人を捕まえた。
e5249|The whole town rejoiced at the news.|町中がその知らせに喜んだ。
e5250|We found the hotel staff very congenial.|ホテルのスタッフはとても感じがよかった。
e5251|The disclosure of his salary surprised everyone.|彼の給料の公開は皆を驚かせた。
e5252|The heat made me feel listless.|暑さで元気が出なかった。
e5253|She gave a clear and coherent answer.|彼女は明確で筋の通った答えをした。
e5254|She acts as a liaison between the two teams.|彼女は2つのチームの連絡係を務めている。
e5255|The museum teaches about the genocide.|その博物館は大量虐殺について伝えている。
e5256|He is intolerant of other people's opinions.|彼は他人の意見に不寛容だ。
e5257|He was coerced into signing the paper.|彼は書類への署名を強要された。
e5258|I was in a terrible predicament.|私はひどい苦境に立たされていた。
e5259|We burned incense at the temple.|お寺で線香をたいた。
e5260|Salt water causes corrosion of metal.|塩水は金属の腐食を引き起こす。
e5261|The two explosions were almost simultaneous.|2つの爆発はほぼ同時だった。
e5262|You can't dictate what I wear.|私が何を着るかあなたに指図されたくない。
e5263|A hot bath will rejuvenate you.|熱いお風呂で元気が戻るよ。
e5264|He is a proponent of renewable energy.|彼は再生可能エネルギーの支持者だ。
e5265|There were no casualties in the accident.|その事故で死傷者は出なかった。
e5266|She is held in high esteem by her students.|彼女は生徒たちからとても尊敬されている。
e5267|He keeps meticulous records of his spending.|彼は出費を几帳面に記録している。
e5268|These shoes outlasted my old ones.|この靴は前の靴より長持ちした。
e5269|She made a compelling argument.|彼女は説得力のある主張をした。
e5270|She handled the problem with great tact.|彼女は見事な気配りでその問題に対処した。
e5271|That was an intrusive question.|それは立ち入った質問だった。
e5272|I detest getting up early.|早起きが大嫌いだ。
e5273|Don't be so stingy with the snacks.|お菓子をそんなにけちらないで。
e5274|He was a dutiful son to his parents.|彼は両親に孝行な息子だった。
e5275|The incumbent won the election again.|現職者が再び選挙に勝った。
e5276|My uncle is a little eccentric.|おじは少し変わり者だ。
e5277|Some countries still have conscription.|いまだに徴兵制のある国もある。
e5278|Our savings have dwindled to nothing.|貯金はほとんどなくなってしまった。
e5279|The public demands accountability from leaders.|国民は指導者に説明責任を求めている。
e5280|To my dismay, the shop was closed.|がっかりしたことに、店は閉まっていた。
e5281|I don't like his condescending tone.|彼の見下すような口調が嫌いだ。
e5282|The dress accentuates her slim figure.|そのドレスは彼女のほっそりした体型を際立たせる。
e5283|The agents worked covertly in the city.|諜報員たちはその都市でひそかに活動した。
e5284|The president can override the decision.|大統領はその決定を覆すことができる。
e5285|The dog showed signs of aggression.|その犬は攻撃的なそぶりを見せた。
e5286|Irrigation made farming possible in the desert.|灌漑のおかげで砂漠でも農業ができるようになった。
e5287|She gave him an ultimatum: quit smoking or leave.|彼女は彼に禁煙か出ていくかの最後通告をした。
e5288|Dark clouds loomed over the mountains.|黒い雲が山の上に不気味に現れた。
e5289|We need to iron out a few details.|いくつか細かい点を詰める必要がある。
e5290|The custom originated in China.|その習慣は中国で始まった。
e5291|For some inexplicable reason, the light went out.|なぜか説明のつかない理由で明かりが消えた。
e5292|The story aroused my curiosity.|その話は私の好奇心をかき立てた。
e5293|The mayor was arrested for bribery.|市長は贈収賄で逮捕された。
e5294|Demand for masks surged last year.|昨年、マスクの需要が急増した。
e5295|This information is strictly confidential.|この情報は極秘だ。
e5296|Appearances can be deceptive.|見かけは当てにならない。
e5297|The soldier was charged with desertion.|その兵士は脱走の罪に問われた。
e5298|His whereabouts are still unknown.|彼の居場所はまだわかっていない。
e5299|They tried to smuggle drugs into the country.|彼らは国内に麻薬を密輸しようとした。
e5300|The athletes follow a rigorous training plan.|選手たちは厳しい練習計画に従っている。
e5301|His actions came under public scrutiny.|彼の行動は世間の厳しい目にさらされた。
e5302|The river meanders through the valley.|川は谷を曲がりくねって流れている。
e5303|The plan was blocked by bureaucrats.|その計画は官僚によって阻まれた。
e5304|The case went to an international tribunal.|その事件は国際法廷にかけられた。
e5305|She studied botany at university.|彼女は大学で植物学を学んだ。
e5306|He goes to a prestigious university.|彼は名門大学に通っている。
e5307|The new houses encroach on the forest.|新しい家々が森に食い込んでいる。
e5308|He trained hard, thereby improving his speed.|彼は懸命に練習し、それによってスピードを上げた。
e5309|Colds are a common ailment in winter.|風邪は冬によくある病気だ。
e5310|She nodded her assent.|彼女はうなずいて同意を示した。
e5311|Tokyo is a vibrant city.|東京は活気のある都市だ。
e5312|The dog gave a menacing growl.|その犬は威嚇するようにうなった。
e5313|They decided to scrap the old plan.|彼らは古い計画を取りやめることにした。
e5314|First-time offenders may get a lighter punishment.|初犯者は刑が軽くなることがある。
e5315|The police found a corpse in the river.|警察は川で遺体を発見した。
e5316|The singer received a tumultuous welcome.|その歌手は熱狂的な歓迎を受けた。
e5317|This is a matter of the utmost importance.|これは最も重要な問題だ。
e5318|From the clues, she deduced the answer.|手がかりから彼女は答えを導き出した。
e5319|Everyone cheered for the underdog.|みんなが勝ち目の薄い方を応援した。
e5320|There is a resurgence of interest in vinyl records.|レコードへの関心が再び高まっている。
e5321|The noise was intolerable.|その騒音は耐えられなかった。
e5322|The hotel has a panoramic view of the sea.|そのホテルからは海が一望できる。
e5323|There is a prohibition on smoking here.|ここでは喫煙が禁止されている。
e5324|Complacency is the enemy of success.|油断は成功の敵だ。
e5325|Teenagers often rebel against their parents.|十代の子はよく親に反抗する。
e5326|Prices are rising at an alarming rate.|物価が驚くべき速さで上がっている。
e5327|He was charged with obstruction of justice.|彼は司法妨害の罪に問われた。
e5328|The prosecutor asked for a long sentence.|検察官は長い刑を求めた。
e5329|The player intercepted the pass.|その選手はパスをカットした。
e5330|Mosquitoes breed in stagnant water.|蚊はよどんだ水で繁殖する。
e5331|Learning a language requires perseverance.|語学の習得には粘り強さが必要だ。
e5332|Hair clogged the bathroom drain.|髪の毛で風呂の排水口が詰まった。
e5333|He used an analogy to explain the idea.|彼はたとえを使ってその考えを説明した。
e5334|You should heed your doctor's advice.|医者の助言を聞き入れるべきだ。
e5335|Many countries condemned the annexation.|多くの国がその併合を非難した。
e5336|A mother's love is unconditional.|母の愛は無条件だ。
e5337|We support the inclusion of all children.|すべての子どもを受け入れることを支持します。
e5338|The shop sells official team merchandise.|その店は公式のチームグッズを売っている。
e5339|Bees and flowers live in symbiosis.|ハチと花は共生している。
e5340|Money problems preoccupy him these days.|最近、彼はお金の問題で頭がいっぱいだ。
e5341|Formal attire is required for the party.|パーティーには正装が必要だ。
e5342|Stop being so sarcastic.|そんなにいやみを言うのはやめて。
e5343|The music heightened the tension in the film.|音楽が映画の緊張感を高めた。
e5344|The posters were part of wartime propaganda.|そのポスターは戦時中の宣伝の一部だった。
e5345|If you hit him, he will retaliate.|彼をたたいたら、やり返されるよ。
e5346|He shouted in defiance of the teacher.|彼は先生に逆らって叫んだ。
e5347|We stayed in a picturesque village.|私たちは絵のように美しい村に泊まった。
e5348|The protagonist of the novel is a young girl.|その小説の主人公は若い少女だ。
e5349|The police must enforce the law.|警察は法律を執行しなければならない。
e5350|The program helps rehabilitate former prisoners.|その事業は元受刑者の社会復帰を助ける。
e5351|She is very methodical in her work.|彼女は仕事がとても几帳面だ。
e5352|In the interim, please wait here.|その間、ここでお待ちください。
e5353|His rude reply infuriated me.|彼の失礼な返事に私は激怒した。
e5354|The price was a point of contention.|値段が争点だった。
e5355|The rules explicitly forbid phones in class.|規則は授業中の携帯電話をはっきり禁じている。
e5356|Honesty is a cardinal rule in our family.|正直さはわが家の基本原則だ。
e5357|She lamented the loss of her old friend.|彼女は旧友を失ったことを嘆いた。
e5358|The plane is flying at a high altitude.|飛行機は高い高度を飛んでいる。
e5359|I came across an old photo yesterday.|昨日、古い写真を偶然見つけた。
e5360|The incidence of flu is high this winter.|この冬はインフルエンザの発生率が高い。
e5361|Crime is rampant in that area.|その地域では犯罪が横行している。
e5362|The quarrelsome neighbors argue every day.|けんか好きな隣人は毎日口論している。
e5363|Any error will invalidate the ticket.|間違いがあればそのチケットは無効になる。
e5364|He felt deep humiliation after the defeat.|彼は敗北の後、深い屈辱を感じた。
e5365|There has been an upsurge in online shopping.|ネットショッピングが急増している。
e5366|We tried to dissuade him from quitting.|私たちは彼が辞めるのを思いとどまらせようとした。
e5367|This is only a theoretical possibility.|これは理論上の可能性にすぎない。
e5368|Old bones become brittle.|年をとると骨はもろくなる。
e5369|The soldiers ran out of ammunition.|兵士たちは弾薬を使い果たした。
e5370|This job requires strong analytical skills.|この仕事には高い分析力が必要だ。
e5371|She filed a lawsuit against the company.|彼女はその会社を相手に訴訟を起こした。
e5372|We went for an invigorating morning walk.|すがすがしい朝の散歩に出かけた。
e5373|Let the soup simmer for twenty minutes.|スープを20分間とろ火で煮てください。
e5374|The company pays dividends twice a year.|その会社は年2回配当を支払う。
e5375|The show is a political satire.|その番組は政治風刺だ。
e5376|The rabbit nibbled on a carrot.|ウサギがニンジンを少しずつかじった。
e5377|Overpopulation causes many problems in cities.|人口過剰は都市に多くの問題を引き起こす。
e5378|Don't open malicious emails.|悪質なメールを開かないで。
e5379|Poor diet can stunt a child's growth.|栄養不足は子どもの成長を妨げることがある。
e5380|The park is adjacent to our school.|公園は私たちの学校の隣にある。
e5381|We had to scale back the party plans.|パーティーの計画を縮小しなければならなかった。
e5382|The two sides agreed to a truce.|双方は休戦に合意した。
e5383|The team forfeited the game.|そのチームは試合を棄権した。
e5384|The work was boring and monotonous.|その仕事は退屈で単調だった。
e5385|We made a tentative plan for Sunday.|日曜日の仮の予定を立てた。
e5386|The country held a referendum on the issue.|その国はその問題について国民投票を行った。
e5387|The realization of her dream took years.|彼女の夢の実現には何年もかかった。
e5388|The two countries forged a strong friendship.|両国は強い友好関係を築いた。
e5389|The manager was incompetent and lazy.|そのマネージャーは無能で怠け者だった。
e5390|Never underestimate your opponent.|相手を決して甘く見るな。
e5391|The party published its election manifesto.|その党は選挙公約を発表した。
e5392|It is imperative that we act now.|今すぐ行動することが不可欠だ。
e5393|The singer is reportedly getting married.|報道によるとその歌手は結婚するらしい。
e5394|The bank agreed to waive the fee.|銀行は手数料の免除に応じた。
e5395|The two schools have a reciprocal exchange program.|両校は相互交流プログラムを行っている。
e5396|Despite her success, she kept her modesty.|成功しても彼女は謙虚さを失わなかった。
e5397|The team's performance was abysmal.|そのチームの成績は最悪だった。
e5398|The virus has undergone a mutation.|ウイルスに突然変異が起きた。
e5399|There was a brief skirmish at the border.|国境で短い小競り合いがあった。
e5400|I don't relish the idea of moving again.|また引っ越すのは気が進まない。
e5401|Pay for excess baggage at the counter.|超過手荷物の料金はカウンターで払ってください。
e5402|The office still uses antiquated computers.|その事務所はいまだに旧式のパソコンを使っている。
e5403|They tried to smear his reputation.|彼らは彼の評判を傷つけようとした。
e5404|The meaning of the poem is obscure.|その詩の意味ははっきりしない。
e5405|He is a baseball fanatic.|彼は熱狂的な野球ファンだ。
e5406|The boy gave a defiant look.|少年は反抗的な目つきをした。
e5407|The police apprehended the thief at the station.|警察は駅で泥棒を逮捕した。
e5408|The internet speeds up the dissemination of news.|インターネットはニュースの広まりを速める。
e5409|Let's make the station our rendezvous.|駅を待ち合わせ場所にしよう。
e5410|There was an implicit agreement between them.|二人の間には暗黙の了解があった。
e5411|He gave a flimsy excuse for being late.|彼は遅刻の苦しい言い訳をした。
e5412|Terrorists hijacked the plane.|テロリストが飛行機を乗っ取った。
e5413|I inadvertently deleted the file.|うっかりファイルを削除してしまった。
e5414|We attended my sister's commencement ceremony.|姉の卒業式に出席した。
e5415|Our gross income rose this year.|今年は総収入が増えた。
e5416|Don't get complacent after one win.|一度勝ったぐらいで油断するな。
e5417|This ticket entitles you to a free drink.|このチケットで飲み物が1杯無料になる。
e5418|He fabricated a story to avoid blame.|彼は責任逃れのために話をでっち上げた。
e5419|The trip ended without any mishap.|旅行は何事もなく終わった。
e5420|She wrote a strong rebuttal to the article.|彼女はその記事への強い反論を書いた。
e5421|The price is negotiable.|価格は応相談です。
e5422|She is a tireless volunteer.|彼女は疲れを知らないボランティアだ。
e5423|The storm caused havoc on the roads.|嵐で道路は大混乱になった。
e5424|He finally conceded that he was wrong.|彼はついに自分の誤りを認めた。
e5425|She works for a pharmaceutical company.|彼女は製薬会社で働いている。
e5426|He was arrested on charges of espionage.|彼はスパイ容疑で逮捕された。
e5427|Every person has intrinsic value.|すべての人に固有の価値がある。
e5428|The leader has a lot of charisma.|そのリーダーには強いカリスマ性がある。
e5429|The coach rebuked the players for being lazy.|コーチは怠けた選手たちを叱責した。
e5430|We took aerial photos with a drone.|ドローンで空撮写真を撮った。
e5431|Many shops closed during the economic downturn.|景気後退の間に多くの店が閉店した。
e5432|Don't be unduly worried about the test.|テストのことを必要以上に心配しないで。
e5433|The speech galvanized the crowd.|その演説は群衆を奮い立たせた。
e5434|The film is shown in three dimensions.|その映画は3Dで上映される。
e5435|The company consolidated its two offices.|会社は2つの事務所を統合した。
e5436|Good nurses show empathy for patients.|よい看護師は患者に共感を示す。
e5437|The country proclaimed its independence.|その国は独立を宣言した。
e5438|He gave up all his worldly possessions.|彼は財産をすべて手放した。
e5439|The company aims for world domination.|その会社は世界制覇を目指している。
e5440|He suffered a cardiac arrest.|彼は心停止に陥った。
e5441|Students are exempted from the fee.|学生は料金を免除されている。
e5442|My grandfather is an obstinate old man.|祖父は頑固な老人だ。
e5443|Don't devalue your own efforts.|自分の努力を軽く見ないで。
e5444|His theory is based on pure conjecture.|彼の説は単なる推測に基づいている。
e5445|Inertia kept me lying on the sofa all day.|惰性で一日中ソファに寝転んでいた。
e5446|The principal summoned him to the office.|校長は彼を校長室に呼び出した。
e5447|Gardening can be very therapeutic.|庭いじりはとても癒やしになる。
e5448|We had a substantive discussion about the plan.|私たちはその計画について中身のある議論をした。
e5449|The treaty aims to stop nuclear proliferation.|その条約は核拡散の防止を目指している。
e5450|Girls outnumber boys in our class.|うちのクラスは女子の方が男子より多い。
e5451|He watched the scene with detachment.|彼はその光景を冷めた目で見ていた。
e5452|The pain slowly subsided.|痛みはゆっくりと治まった。
e5453|She grew up in a deprived area.|彼女は貧しい地域で育った。
e5454|He looked perplexed by the question.|彼はその質問に困惑した様子だった。
e5455|The rigor of the training surprised me.|その訓練の厳しさに驚いた。
e5456|The minister made another embarrassing gaffe.|大臣はまた恥ずかしい失言をした。
e5457|His story sounded implausible.|彼の話は信じがたく聞こえた。
e5458|They excavated an ancient city.|彼らは古代都市を発掘した。
e5459|Music is an integral part of our culture.|音楽は私たちの文化に欠かせない一部だ。
e5460|The town's affluence came from fishing.|その町の豊かさは漁業によるものだった。
e5461|The fugitive was caught after a week.|逃亡者は1週間後に捕まった。
e5462|His confrontational style upset the team.|彼のけんか腰なやり方にチームは動揺した。
e5463|He amassed a fortune in business.|彼は商売で巨万の富を築いた。
e5464|The movie spawned several sequels.|その映画からいくつもの続編が生まれた。
e5465|They tacitly agreed not to discuss it.|彼らはそれについて話さないことを暗黙のうちに了解した。
e5466|The machine needs periodic checks.|その機械には定期的な点検が必要だ。
e5467|The win boosted the team's morale.|その勝利でチームの士気が上がった。
e5468|She is proficient in three languages.|彼女は3か国語に堪能だ。
e5469|Grandpa dozed off in his chair.|おじいちゃんはいすでうとうとした。
e5470|The oil cartel raised prices again.|石油カルテルがまた価格を引き上げた。
e5471|His health deteriorated quickly.|彼の健康は急速に悪化した。
e5472|He likes to tinker with old cars.|彼は古い車をいじるのが好きだ。
e5473|She bought him a toy to appease him.|彼女は彼をなだめるためにおもちゃを買った。
e5474|Insurgents attacked the army base.|反乱者たちが軍の基地を襲った。
e5475|The presumption of innocence is important.|無罪の推定は重要だ。
e5476|She studies comparative literature.|彼女は比較文学を研究している。
e5477|He denied the allegations of cheating.|彼は不正の疑惑を否定した。
e5478|The teacher mediated between the two students.|先生は2人の生徒の間を取り持った。
e5479|The new phone is lighter than its predecessor.|新しい電話は前のモデルより軽い。
e5480|Preventive medicine can save lives.|予防医学は命を救うことができる。
e5481|The test proved conclusively that he was innocent.|その検査で彼の無実がはっきりと証明された。
e5482|She takes care of her ailing mother.|彼女は病気の母親の世話をしている。
e5483|The dancer gave a mesmerizing performance.|そのダンサーは魅惑的な演技を見せた。
e5484|Ozone depletion is a serious problem.|オゾン層の破壊は深刻な問題だ。
e5485|He invoked his right to remain silent.|彼は黙秘権を行使した。
e5486|She has a prodigious memory.|彼女は驚異的な記憶力を持っている。
e5487|Millions died during the famine.|その飢饉の間に何百万人もが亡くなった。
e5488|In my haste, I forgot my keys.|急いでいて鍵を忘れた。
e5489|Many teenagers feel a sense of alienation.|多くの十代が疎外感を感じている。
e5490|She juggles work and family life.|彼女は仕事と家庭を両立させている。
e5491|You can get a tax rebate this year.|今年は税の還付が受けられる。
e5492|The cessation of fighting brought relief.|戦闘の停止で人々はほっとした。
e5493|Invasive species threaten local plants.|外来種は在来の植物をおびやかす。
e5494|The driver was held culpable for the accident.|運転手がその事故の責任を問われた。
e5495|Every language has its peculiarities.|どの言語にも独特の特徴がある。
e5496|He was made a scapegoat for the failure.|彼は失敗の身代わりにされた。
e5497|The sudden rain drenched us.|にわか雨で私たちはびしょぬれになった。
e5498|We must find the underlying cause.|根本的な原因を見つけなければならない。
e5499|The cat made a nimble jump onto the wall.|猫は身軽に塀に飛び乗った。
e5500|I admire the intricacy of the design.|そのデザインの精巧さに感心する。
e5501|The city outlawed smoking in public parks.|市は公園での喫煙を禁止した。
e5502|The future looked bleak after the factory closed.|工場が閉鎖され、未来は暗く見えた。
e5503|The teacher gave us a stern warning.|先生は私たちに厳しい警告をした。
e5504|Everything hinges on tomorrow's weather.|すべては明日の天気にかかっている。
e5505|Each municipality collects garbage differently.|自治体ごとにごみの収集方法が違う。
e5506|My son has an aversion to green peppers.|息子はピーマンが大嫌いだ。
e5507|The evidence is only anecdotal.|その証拠は逸話にすぎない。
e5508|The sick dog was quarantined for two weeks.|病気の犬は2週間隔離された。
e5509|Her kindness was of immeasurable value to us.|彼女の親切は私たちにとって計り知れない価値があった。
e5510|We met several prospective buyers for the house.|その家の購入希望者数人に会った。
e5511|The school has an affiliation with a university.|その学校は大学と提携している。
e5512|Too much sugar can make children obese.|砂糖のとりすぎで子どもが肥満になることがある。
e5513|All personnel must wear ID cards.|全職員は身分証を着用しなければならない。
e5514|The teacher intervened to stop the fight.|先生がけんかを止めようと間に入った。
e5515|There is too much bureaucracy in this office.|この役所はお役所仕事がひどすぎる。
e5516|Our next opponent is a formidable team.|次の相手は手ごわいチームだ。
e5517|The company was on the brink of collapse.|その会社は倒産の瀬戸際にあった。
e5518|Chocolate cake is my one indulgence.|チョコレートケーキが私の唯一のぜいたくだ。
e5519|Dad chuckled while reading the comic.|父は漫画を読みながらくすくす笑った。
e5520|The price of the ring was astronomical.|その指輪の値段は天文学的だった。
e5521|He used his house as collateral for the loan.|彼は家をローンの担保にした。
e5522|This photo encapsulates our whole summer trip.|この写真は夏の旅行全体を象徴している。
e5523|That word sounds archaic today.|その言葉は今では古風に聞こえる。
e5524|He became arrogant after winning the prize.|彼は賞をとってから傲慢になった。
e5525|She embodies the spirit of our team.|彼女は私たちのチームの精神を体現している。
e5526|We saw a regression in his test scores.|彼のテストの点数が後退した。
e5527|She spoke with indignation about the unfair rule.|彼女は不公平な規則について憤りを込めて話した。
e5528|Coercive methods rarely change people's minds.|強制的な方法で人の心が変わることはめったにない。
e5529|Most children here are literate by age seven.|ここの子どもの大半は7歳までに読み書きができる。
e5530|A cat was lurking under the car.|猫が車の下に潜んでいた。
e5531|He finally paid back all his creditors.|彼はついに債権者全員に返済した。
e5532|She tried to hide her irritation.|彼女はいらだちを隠そうとした。
e5533|Don't put undue pressure on the kids.|子どもたちに過度のプレッシャーをかけないで。
e5534|I turned off the gruesome horror movie.|ぞっとするホラー映画を消した。
e5535|Is this plan really viable?|この計画は本当に実行可能なの？
e5536|I feel a strong affinity for this town.|この町に強い親近感を覚える。
e5537|The new washing machine liberated Mom from hours of work.|新しい洗濯機で母は長時間の作業から解放された。
e5538|She has a lot of clout in the company.|彼女は社内で大きな影響力を持っている。
e5539|The boy looked remorseful after breaking the window.|窓を割った少年は後悔している様子だった。
e5540|Speeding drivers are a menace on this road.|この道ではスピード違反の運転手が脅威だ。
e5541|My stomach rumbled during the test.|テスト中におなかがゴロゴロ鳴った。
e5542|We watched an uplifting movie about friendship.|友情についての元気が出る映画を見た。
e5543|She gave me an enigmatic smile.|彼女は私に謎めいた笑みを浮かべた。
e5544|The concert was the culmination of a year's practice.|そのコンサートは1年間の練習の集大成だった。
e5545|The lizard uses camouflage to hide from birds.|そのトカゲは鳥から隠れるために擬態を使う。
e5546|He received a letter about the termination of his contract.|彼は契約終了の手紙を受け取った。
e5547|The town saw unprecedented snowfall this year.|今年町は前例のない大雪に見舞われた。
e5548|We must curb our spending this month.|今月は出費を抑えなければならない。
e5549|There are innumerable stars in the sky tonight.|今夜は空に無数の星がある。
e5550|They bought a large tract of farmland.|彼らは広大な農地を買った。
e5551|The meeting is tentatively set for Friday.|会議は仮に金曜日に予定されている。
e5552|The bashful boy hid behind his mother.|恥ずかしがりの男の子は母親の後ろに隠れた。
e5553|The economy has stagnated for years.|経済は何年も停滞している。
e5554|He stammered when the teacher called his name.|先生に名前を呼ばれて彼は口ごもった。
e5555|We won three games in succession.|私たちは3試合連続で勝った。
e5556|I have only a rudimentary knowledge of Chinese.|私は中国語の初歩的な知識しかない。
e5557|The school received official accreditation last year.|その学校は昨年正式な認定を受けた。
e5558|She is an earnest student who never misses class.|彼女は授業を休まないまじめな生徒だ。
e5559|This ticket is not refundable.|このチケットは払い戻しできません。
e5560|Grandpa muttered something about the weather.|祖父は天気について何かつぶやいた。
e5561|A strange fungus was growing on the log.|丸太に奇妙な菌類が生えていた。
e5562|His story was a complete fabrication.|彼の話は完全なでっち上げだった。
e5563|We need to weed out the weak ideas first.|まず弱いアイデアを取り除く必要がある。
e5564|The workers were repatriated after the war.|労働者たちは戦後本国に送還された。
e5565|The coach made a smart tactical change.|監督は賢い戦術的変更をした。
e5566|Convenience stores have proliferated in this area.|この地域ではコンビニが急増している。
e5567|Many people helped in the aftermath of the flood.|洪水の後、多くの人が手伝った。
e5568|Many rare birds inhabit this island.|この島には多くの珍しい鳥が生息している。
e5569|The speaker touched on the topic of climate change.|講演者は気候変動の話題に簡単に触れた。
e5570|Bees pollinate the flowers in our garden.|ミツバチが庭の花を受粉させる。
e5571|The fragility of the old vase worried me.|古い花びんのもろさが心配だった。
e5572|Some movies glorify violence.|暴力を美化する映画もある。
e5573|Learning one new idiom a day is fun.|1日1つ新しい慣用句を覚えるのは楽しい。
e5574|I wore out my sneakers in three months.|3か月でスニーカーをはきつぶした。
e5575|The strong wind toppled the old tree.|強風が古い木を倒した。
e5576|Kids are often more perceptive than adults think.|子どもは大人が思うより鋭いことが多い。
e5577|Exercise may help prolong your life.|運動は寿命を延ばすのに役立つかもしれない。
e5578|The sign says trespassers will be fined.|看板には侵入者は罰金と書いてある。
e5579|We found a commonality in our hobbies.|私たちは趣味に共通点を見つけた。
e5580|The spy infiltrated the enemy base.|スパイは敵の基地に潜入した。
e5581|The final tally showed our class won.|最終集計で私たちのクラスの勝ちだとわかった。
e5582|We can harness the power of the sun.|私たちは太陽の力を利用できる。
e5583|The university received a large endowment.|その大学は多額の寄付金を受け取った。
e5584|The doctor's face looked grim.|医者の表情は険しかった。
e5585|Police thwarted the robbery just in time.|警察はぎりぎりで強盗を阻止した。
e5586|Absenteeism is a problem at the factory.|工場では欠勤が問題になっている。
e5587|She gave an affirmative answer.|彼女は肯定的な返事をした。
e5588|Good food nourishes both body and mind.|良い食べ物は体と心の両方に栄養を与える。
e5589|Check the dosage before giving medicine to children.|子どもに薬をあげる前に服用量を確認して。
e5590|Please compress the file before sending it.|送る前にファイルを圧縮してください。
e5591|Chemicals contaminated the river water.|化学物質が川の水を汚染した。
e5592|He downplayed the seriousness of his injury.|彼はけがの深刻さを軽く扱った。
e5593|The teacher singled out my essay for praise.|先生は私の作文を特に取り上げてほめた。
e5594|His silence was indicative of his anger.|彼の沈黙は怒りを示していた。
e5595|She didn't flinch when she got the shot.|彼女は注射を打たれてもひるまなかった。
e5596|He hastily packed his bag and left.|彼は急いでかばんに荷物を詰めて出かけた。
e5597|Trees are sparse in the desert.|砂漠では木がまばらだ。
e5598|Workers met the boss to discuss their grievances.|労働者たちは不満を話し合うため上司と会った。
e5599|My paternal grandmother lives in Osaka.|父方の祖母は大阪に住んでいる。
e5600|Press this button to eject the disc.|ディスクを取り出すにはこのボタンを押して。
e5601|My inquisitive daughter asks questions all day.|好奇心の強い娘は一日中質問してくる。
e5602|He faced deportation after his visa expired.|ビザが切れて彼は国外追放の危機に直面した。
e5603|The new rule caused an uproar among students.|新しい規則は生徒の間で大騒ぎを引き起こした。
e5604|She has lofty goals for her future.|彼女は将来について高い目標を持っている。
e5605|The seemingly easy test was actually hard.|一見簡単なテストは実は難しかった。
e5606|Stop whining and finish your homework.|泣き言を言わずに宿題を終わらせなさい。
e5607|The area received designation as a national park.|その地域は国立公園に指定された。
e5608|The new car seats are compliant with safety rules.|新しいチャイルドシートは安全基準に準拠している。
e5609|The vase arrived intact.|花びんは無傷で届いた。
e5610|I unwittingly took my sister's umbrella.|知らずに姉の傘を持ってきてしまった。
e5611|The accident underscores the need for helmets.|その事故はヘルメットの必要性を強調している。
e5612|Read every clause before you sign.|署名する前にすべての条項を読んで。
e5613|The fire caused irreparable damage to the temple.|火事は寺に取り返しのつかない被害を与えた。
e5614|The queen reigned for over sixty years.|女王は60年以上君臨した。
e5615|He had a small fracture in his arm.|彼は腕を軽く骨折していた。
e5616|The band announced its dissolution last week.|そのバンドは先週解散を発表した。
e5617|We stayed in a quaint little inn.|私たちは古風で趣のある小さな宿に泊まった。
e5618|It's hard to gauge how he feels.|彼の気持ちを判断するのは難しい。
e5619|Language immersion is a great way to learn.|言語に浸る環境は学ぶのに最適な方法だ。
e5620|The lake looked serene in the morning.|朝の湖は穏やかに見えた。
e5621|The fog dissipated by noon.|霧は昼までに消えた。
e5622|Set small goals that are attainable.|達成可能な小さな目標を立てよう。
e5623|Admittedly, I should have called you earlier.|確かに、もっと早く電話するべきだった。
e5624|This painting is a reproduction, not the original.|この絵は本物ではなく複製だ。
e5625|She refined her speech before the contest.|彼女は大会の前にスピーチを磨いた。
e5626|Fishing is the livelihood of this village.|漁業がこの村の生計の手段だ。
e5627|It was a solemn ceremony.|それは厳粛な式典だった。
e5628|I couldn't tell if he was using sarcasm.|彼が皮肉を言っているのかわからなかった。
e5629|Cut the redundancy from your essay.|作文の余分な部分を削りなさい。
e5630|The man was arrested for assaulting a guard.|男は警備員に暴行して逮捕された。
e5631|We dissected a fish in science class.|理科の授業で魚を解剖した。
e5632|This is only a provisional schedule.|これはあくまで仮の予定だ。
e5633|We closed the school as a precautionary measure.|予防措置として学校を休校にした。
e5634|New cars suffer rapid depreciation.|新車は急速に価値が下がる。
e5635|The fireworks dazzled the children.|花火は子どもたちの目をくらませた。
e5636|Drop by my house anytime.|いつでも家に寄ってね。
e5637|This hardy plant survives the cold winter.|この丈夫な植物は寒い冬を越す。
e5638|His assertion was not supported by facts.|彼の主張は事実に裏付けられていなかった。
e5639|The town made a concerted effort to clean the beach.|町は一致協力して浜辺を掃除した。
e5640|The technology is still in its infancy.|その技術はまだ初期段階だ。
e5641|Rescue teams were deployed after the earthquake.|地震の後、救助隊が配備された。
e5642|It's hard to pin down the cause of the noise.|騒音の原因を突き止めるのは難しい。
e5643|The puzzle confounded everyone in the family.|そのパズルは家族全員を困惑させた。
e5644|Homework is a contentious topic in our house.|宿題はわが家で議論を呼ぶ話題だ。
e5645|Check your eligibility for the scholarship.|奨学金の資格があるか確認して。
e5646|Mornings are always hectic in our family.|わが家の朝はいつも慌ただしい。
e5647|He was convicted of theft.|彼は窃盗で有罪判決を受けた。
e5648|The people fought against oppression.|人々は抑圧と戦った。
e5649|Dark clouds warned of an impending storm.|黒い雲が嵐が迫っていることを知らせた。
e5650|His indifference to the news surprised me.|そのニュースへの彼の無関心さに驚いた。
e5651|The two teams fought for supremacy in the league.|2チームはリーグの覇権を争った。
e5652|His English regressed after he stopped studying.|勉強をやめて彼の英語は後退した。
e5653|My interest in the game began to wane.|そのゲームへの興味が薄れ始めた。
e5654|The teacher gave explicit instructions.|先生ははっきりした指示を出した。
e5655|Old songs fill me with nostalgia.|古い歌を聞くと懐かしさでいっぱいになる。
e5656|The museum tour was very enlightening.|博物館の見学はとてもためになった。
e5657|This case is outside our jurisdiction.|この件は私たちの管轄外だ。
e5658|Indiscriminate use of antibiotics is dangerous.|抗生物質の見境のない使用は危険だ。
e5659|We waded across the shallow river.|私たちは浅い川を歩いて渡った。
e5660|The school teaches entrepreneurship to teenagers.|その学校は10代に起業家精神を教えている。
e5661|She fended off questions from reporters.|彼女は記者の質問をかわした。
e5662|The rowdy fans were asked to leave.|騒々しいファンは退場を求められた。
e5663|It's futile to argue with him.|彼と言い争っても無駄だ。
e5664|Many countries ratified the treaty.|多くの国がその条約を批准した。
e5665|Vegetable prices fluctuate with the seasons.|野菜の値段は季節によって変動する。
e5666|She resolutely refused to give up.|彼女は断固としてあきらめるのを拒んだ。
e5667|The kitchen has a simple, utilitarian design.|台所はシンプルで実用的なデザインだ。
e5668|They fled their country to escape persecution.|彼らは迫害を逃れて国を出た。
e5669|The filter removes contaminants from the water.|フィルターは水から汚染物質を取り除く。
e5670|Dilute the juice with some water.|ジュースを水で薄めて。
e5671|The complexity of the rules confused us.|規則の複雑さに私たちは混乱した。
e5672|The town resurrected an old summer festival.|町は古い夏祭りを復活させた。
e5673|The trip was a catalyst for her career change.|その旅が彼女の転職のきっかけになった。
e5674|Be proactive and plan ahead.|先を見越して前もって計画しよう。
e5675|Mom soothed the crying baby.|母は泣いている赤ちゃんをなだめた。
e5676|A sedentary lifestyle is bad for your health.|座りがちの生活は健康に悪い。
e5677|The transition to middle school was hard for him.|中学への移行は彼にとって大変だった。
e5678|Our team is small but cohesive.|私たちのチームは小さいが結束している。
e5679|The batter is in a slump this month.|そのバッターは今月不振だ。
e5680|Scientists hope to eradicate the disease.|科学者たちはその病気の根絶を望んでいる。
e5681|This ring is a family heirloom.|この指輪はわが家の家宝だ。
e5682|I felt wretched after the flu.|インフルエンザの後、惨めな気分だった。
e5683|He is a zealous fan of the team.|彼はそのチームの熱狂的なファンだ。
e5684|The whole congregation sang together.|会衆全員が一緒に歌った。
e5685|Don't scorn other people's ideas.|他人の考えを軽蔑してはいけない。
e5686|The culprit who ate the cake was our dog.|ケーキを食べた犯人はうちの犬だった。
e5687|Infant mortality has dropped greatly.|乳児死亡率は大きく下がった。
e5688|My parents are opposed to the plan.|両親はその計画に反対している。
e5689|The train was overcrowded this morning.|今朝の電車はすし詰めだった。
e5690|Sleep plays a big role in cognition.|睡眠は認知に大きな役割を果たす。
e5691|The company declared insolvency last year.|その会社は昨年支払い不能を宣言した。
e5692|Grandma loves to pamper her grandchildren.|祖母は孫たちを甘やかすのが大好きだ。
e5693|The long illness debilitated him.|長い病気で彼は衰弱した。
e5694|We heard an ominous sound from the engine.|エンジンから不吉な音が聞こえた。
e5695|This city is a convergence of many cultures.|この都市は多くの文化が集まる場所だ。
e5696|Please segregate your trash into three types.|ごみを3種類に分けてください。
e5697|Avoid strenuous exercise after eating.|食後に激しい運動は避けて。
e5698|Voter apathy is a big problem.|有権者の無関心は大きな問題だ。
e5699|There was a minuscule stain on my shirt.|シャツにごく小さなしみがあった。
e5700|The old station is now defunct.|古い駅は今では使われていない。
e5701|Each child gets an allotment of screen time.|子どもはそれぞれ画面を見る時間が割り当てられている。
e5702|The garden looked enchanting in the moonlight.|月明かりの中で庭は魅惑的に見えた。
e5703|He moaned with pain after the fall.|転んだ後、彼は痛みでうめいた。
e5704|She has an incurable disease.|彼女は不治の病を抱えている。
e5705|The tenacious player never gave up.|粘り強い選手は決してあきらめなかった。
e5706|She is known for her philanthropy.|彼女は慈善活動で知られている。
e5707|Don't hold a grudge against your brother.|お兄ちゃんを恨んじゃだめだよ。
e5708|He keeps scrupulous records of his spending.|彼は出費を綿密に記録している。
e5709|You need to be more assertive at meetings.|会議ではもっと自分の意見を言う必要がある。
e5710|Can you substantiate your claim with data?|その主張をデータで立証できますか？
e5711|She represents a rural constituency.|彼女は地方の選挙区を代表している。
e5712|The manager issued a new directive.|部長は新しい指令を出した。
e5713|The medicine was ineffective against my cold.|その薬は私の風邪に効かなかった。
e5714|Despite his fame, he is very unassuming.|有名なのに彼はとても気取らない。
e5715|The flowers withered in the heat.|暑さで花がしおれた。
e5716|He blatantly ignored the rules.|彼はあからさまに規則を無視した。
e5717|There were no fatalities in the accident.|その事故で死者は出なかった。
e5718|The persecuted family found safety abroad.|迫害された家族は海外で安全を得た。
e5719|We tested his suitability for the job.|私たちは彼のその仕事への適性を調べた。
e5720|Mom is resourceful when money is tight.|母はお金が厳しいとき、やりくり上手だ。
e5721|He refused to relinquish control of the company.|彼は会社の支配権を手放すことを拒んだ。
e5722|Can you run an errand for me?|お使いに行ってくれる？
e5723|His eccentricity made him popular with kids.|彼の風変わりなところが子どもたちに人気だった。
e5724|My son has outgrown his old shoes.|息子は大きくなって古い靴が履けなくなった。
e5725|The villagers were very hospitable to us.|村の人たちは私たちをとても温かくもてなしてくれた。
e5726|In retrospect, I should have studied harder.|振り返れば、もっと勉強すべきだった。
e5727|She alluded to a surprise party.|彼女はサプライズパーティーをほのめかした。
e5728|They have an enduring friendship.|彼らには長く続く友情がある。
e5729|Her letter was a great consolation to me.|彼女の手紙は私にとって大きな慰めだった。
e5730|We stayed in a deluxe room for our anniversary.|記念日に豪華な部屋に泊まった。
e5731|The bear went on a rampage in the village.|クマが村で暴れ回った。
e5732|I feel sluggish after a big lunch.|たくさん昼食を食べると体がだるい。
e5733|The nurse administered the medicine.|看護師が薬を投与した。
e5734|The old farmer had a weathered face.|年老いた農夫は日に焼けた顔をしていた。
e5735|Your fears are completely unfounded.|あなたの心配はまったく根拠がない。
e5736|He felt a longing for his hometown.|彼は故郷を恋しく思った。
e5737|Grandpa was in the hospital with pneumonia.|祖父は肺炎で入院していた。
e5738|We will rectify the mistake right away.|すぐに誤りを正します。
e5739|Write the name on the ballot.|投票用紙に名前を書いて。
e5740|Success remained elusive for the team.|チームにとって成功はなかなか手に入らなかった。
e5741|The cafe has a cozy ambiance.|そのカフェは居心地のよい雰囲気だ。
e5742|There was no overt sign of trouble.|問題のはっきりした兆候はなかった。
e5743|The school solicited donations from parents.|学校は保護者から寄付を募った。
e5744|We need a sturdy table for the kids.|子どもたちのために頑丈なテーブルが必要だ。
e5745|The noise was a hindrance to my studying.|その騒音が勉強の妨げになった。
e5746|Some damage to the environment is irreversible.|環境への被害の中には元に戻せないものもある。
e5747|The library is a haven for quiet readers.|図書館は静かに読書したい人の安息の地だ。
e5748|The high fever caused hallucinations.|高熱で幻覚が起きた。
e5749|The company disclosed its sales figures.|会社は売上高を公開した。
e5750|Don't be paranoid; nobody is watching you.|心配しすぎないで、誰も見てないよ。
e5751|Companies must innovate to survive.|企業は生き残るために革新しなければならない。
e5752|The price increase caused a backlash from customers.|値上げは客からの反発を招いた。
e5753|His actions contradict his words.|彼の行動は言葉と矛盾している。
e5754|The general usurped the throne.|その将軍は王位を奪った。
e5755|I can't envisage life without my dog.|犬のいない生活は想像できない。
e5756|The hall was lavishly decorated for the wedding.|会場は結婚式のために豪華に飾られていた。
e5757|This smell is reminiscent of my childhood.|この匂いは子どもの頃を思い出させる。
e5758|We need a player of her caliber.|彼女ほどの力量の選手が必要だ。
e5759|The members ousted their leader.|会員たちはリーダーを追放した。
e5760|He is a compulsive gamer.|彼はゲームがやめられない。
e5761|His conclusion is disputable.|彼の結論には議論の余地がある。
e5762|The teacher built a good rapport with students.|先生は生徒と良い信頼関係を築いた。
e5763|A glitch in the app deleted my photos.|アプリの不具合で写真が消えた。
e5764|Let's categorize the books by size.|本を大きさで分類しよう。
e5765|Sunlight couldn't penetrate the thick forest.|日光は深い森を通り抜けられなかった。
e5766|The city offers a myriad of restaurants.|その都市には無数のレストランがある。
e5767|The accountant was arrested for embezzlement.|会計係は横領で逮捕された。
e5768|The old house was infested with mice.|古い家にはネズミがはびこっていた。
e5769|A long procession moved through the town.|長い行列が町を進んだ。
e5770|He was paralyzed with fear.|彼は恐怖で動けなくなった。
e5771|Early intervention can help children with reading problems.|早期の介入は読みに苦労する子を助けられる。
e5772|That volcano has been dormant for centuries.|その火山は何世紀も活動を休止している。
e5773|She immersed herself in the novel.|彼女はその小説に没頭した。
e5774|Judges must show impartiality.|裁判官は公平でなければならない。
e5775|The puppy has an endearing habit of tilting its head.|子犬には首をかしげるかわいい癖がある。
e5776|Workers cleared the wreckage of the plane.|作業員が飛行機の残骸を片付けた。
e5777|It's prudent to save some money each month.|毎月いくらか貯金するのは賢明だ。
e5778|Young children are naturally egocentric.|幼い子どもは本来自己中心的だ。
e5779|Someone snatched her bag on the street.|誰かが道で彼女のバッグをひったくった。
e5780|She has an aptitude for languages.|彼女は語学の才能がある。
e5781|Dad spoke sternly to my brother.|父は弟に厳しく話した。
e5782|We won by sheer luck.|私たちはまったくの幸運で勝った。
e5783|The ball shattered the kitchen window.|ボールが台所の窓を粉々にした。
e5784|A fever is a manifestation of infection.|熱は感染の表れだ。
e5785|Never plagiarize other people's essays.|他人の作文を決して盗用してはいけない。
e5786|The school rules are too inflexible.|校則は融通がきかなすぎる。
e5787|The project could conceivably finish next month.|ひょっとするとその計画は来月終わるかもしれない。
e5788|This road is notorious for traffic jams.|この道は渋滞で悪名高い。
e5789|Cameras act as a deterrent to crime.|カメラは犯罪の抑止力になる。
e5790|They allege that he stole the money.|彼がお金を盗んだと彼らは主張している。
e5791|Our dwindling savings worried us.|減っていく貯金が心配だった。
e5792|The farm is almost self-sufficient in food.|その農場は食料がほぼ自給自足だ。
e5793|Phones in class will lead to confiscation.|授業中の携帯電話は没収されます。
e5794|The weather here is notoriously unpredictable.|ここの天気は予測できないことで有名だ。
e5795|Don't preach to me about saving money.|貯金について説教しないで。
e5796|Women often outlive men.|女性は男性より長生きすることが多い。
e5797|The reclusive writer rarely leaves his house.|その隠遁した作家はめったに家を出ない。
e5798|Here are some common pitfalls for beginners.|初心者がはまりがちな落とし穴を紹介します。
e5799|These plants thrive in sunny places.|これらの植物は日当たりの良い場所でよく育つ。
e5800|There is a clear dichotomy between work and play.|仕事と遊びははっきり二分されている。
e5801|The police dispersed the crowd.|警察は群衆を解散させた。
e5802|This shop sells traditional confectionery.|この店は伝統的なお菓子を売っている。
e5803|The town saw an influx of tourists in summer.|夏、町には観光客が押し寄せた。
e5804|Keeping animals in tiny cages is inhumane.|動物を小さなおりに入れておくのは非人道的だ。
e5805|The old bridge is structurally unsound.|その古い橋は構造的に不安定だ。
e5806|She paced the room in agitation.|彼女は動揺して部屋の中を歩き回った。
e5807|The angry boy hurled his toy across the room.|怒った男の子はおもちゃを部屋の向こうへ投げつけた。
e5808|Never use derogatory words about others.|他人について軽蔑的な言葉を使ってはいけない。
e5809|Her excuse sounded plausible.|彼女の言い訳はもっともらしく聞こえた。
e5810|She spoke at a symposium on climate change.|彼女は気候変動の討論会で話した。
e5811|The temple belongs to a small Buddhist sect.|その寺は小さな仏教の宗派に属している。
e5812|Music can transcend language barriers.|音楽は言葉の壁を越えることができる。
e5813|The sullen teenager didn't say a word.|むっつりした10代の子は一言も話さなかった。
e5814|The flood caused the displacement of many families.|洪水で多くの家族が移動を余儀なくされた。
e5815|The new president will be inaugurated in January.|新大統領は1月に就任する。
e5816|Owls are nocturnal birds.|フクロウは夜行性の鳥だ。
e5817|The earth revolves around the sun.|地球は太陽の周りを回っている。
e5818|They erected a statue in the park.|彼らは公園に像を建てた。
e5819|The council passed an amendment to the law.|議会はその法律の改正案を可決した。
e5820|The hotel has many amenities, including a pool.|そのホテルにはプールなど多くの設備がある。
e5821|We paid a premium for front-row seats.|最前列の席に割増料金を払った。
e5822|The plan was flawed from the start.|その計画は最初から欠陥があった。
e5823|We need a credible source for this news.|このニュースには信頼できる情報源が必要だ。
e5824|His rude jokes alienated his friends.|彼の失礼な冗談で友達が離れていった。
e5825|I have no inclination to go out tonight.|今夜は出かける気がしない。
e5826|He was despondent after failing the exam.|試験に落ちて彼は落胆していた。
e5827|Your handwriting is almost illegible.|あなたの字はほとんど読めない。
e5828|We chose the house for its proximity to school.|学校に近いのでその家を選んだ。
e5829|The university conferred a degree on her.|大学は彼女に学位を授与した。
e5830|He felt disillusionment with politics.|彼は政治に幻滅を感じた。
e5831|The whole town mourned the old mayor.|町全体が前市長を悼んだ。
e5832|Please accept my deepest condolences.|心からお悔やみ申し上げます。
e5833|Keep your answers short and concise.|答えは短く簡潔にしなさい。
e5834|Tokyo is a huge metropolitan area.|東京は巨大な大都市圏だ。
e5835|Fans swarmed around the singer.|ファンが歌手の周りに群がった。
e5836|He is clever but a little conceited.|彼は賢いが少しうぬぼれている。
e5837|People want more transparency from the government.|人々は政府にもっと透明性を求めている。
e5838|The film tells of the resurrection of a famous band.|その映画は有名バンドの復活を描いている。
e5839|She runs a philanthropic group for children.|彼女は子どものための慈善団体を運営している。
e5840|We marveled at the beautiful sunset.|私たちは美しい夕日に驚嘆した。
e5841|The police had a warrant to search the house.|警察は家宅捜索の令状を持っていた。
e5842|The preliminary results look good.|予備的な結果は良さそうだ。
e5843|He gave a terse reply and left.|彼はそっけなく返事をして去った。
e5844|I'm trying to cut back on sweets.|甘いものを控えようとしている。
e5845|The company denied liability for the accident.|会社はその事故の法的責任を否定した。
e5846|The storm displaced thousands of people.|嵐で何千人もの人が家を追われた。
e5847|My parents downsized to a smaller apartment.|両親はもっと小さなアパートに引っ越した。
e5848|Volunteering is an altruistic act.|ボランティアは利他的な行為だ。
e5849|He felt resentment toward his boss.|彼は上司に恨みを感じた。
e5850|Fleas are parasites that live on dogs.|ノミは犬に寄生する寄生虫だ。
e5851|I will never forget his betrayal.|彼の裏切りは決して忘れない。
e5852|The child clutched her mother's hand.|子どもは母親の手をしっかり握った。
e5853|Our search for the key was fruitless.|鍵探しは無駄に終わった。
e5854|The smell of fresh bread is irresistible.|焼きたてのパンの匂いはたまらない。
e5855|Cars emit carbon dioxide.|車は二酸化炭素を排出する。
e5856|The country is a federation of states.|その国は州の連邦だ。
e5857|Some countries have strict internet censorship.|インターネットを厳しく検閲する国もある。
e5858|He tried to circumvent the rules.|彼は規則をすり抜けようとした。
e5859|Scientists could not replicate the results.|科学者たちはその結果を再現できなかった。
e5860|Thank you for your timely help.|ちょうど良い時に助けてくれてありがとう。
e5861|We took refuge from the rain in a cafe.|雨を避けてカフェに逃げ込んだ。
e5862|I called to inquire about the schedule.|予定について問い合わせるために電話した。
e5863|The castle was under siege for months.|城は何か月も包囲されていた。
e5864|The bathroom window is made of opaque glass.|浴室の窓は不透明なガラスでできている。
e5865|They had an intimate dinner at home.|彼らは家で親しい人だけの夕食をとった。
e5866|Safety is our prime concern.|安全が私たちの最重要の関心事だ。
e5867|Grandma loves to reminisce about her school days.|祖母は学生時代の思い出話をするのが大好きだ。
e5868|She is a scientist of great stature.|彼女は非常に名声のある科学者だ。
e5869|We found a secluded beach.|私たちは人目につかない浜辺を見つけた。
e5870|Knitting requires great dexterity.|編み物にはかなりの器用さが必要だ。
e5871|Don't stray from the path in the forest.|森では道からそれないでね。
e5872|She has an arsenal of cooking tricks.|彼女は料理のコツをたくさん持っている。
e5873|We shouldn't be prejudiced against newcomers.|新しく来た人に偏見を持つべきではない。
e5874|My piano lesson overlaps with soccer practice.|ピアノのレッスンがサッカーの練習と重なる。
e5875|The conspirators planned a surprise party.|共謀者たちはサプライズパーティーを計画した。
e5876|This medicine is very potent.|この薬はとても効き目が強い。
e5877|The conglomerate owns banks and hotels.|その複合企業は銀行やホテルを所有している。
e5878|The video garnered millions of views.|その動画は何百万回もの再生を獲得した。
e5879|Luckily, everyone escaped unscathed.|幸い全員無傷で逃げた。
e5880|Let me reiterate the main points.|要点を繰り返します。
e5881|Children often show great resilience.|子どもはしばしば大きな回復力を見せる。
e5882|People used barter before money existed.|お金が存在する前、人々は物々交換をしていた。
e5883|We took our dog to obedience classes.|犬をしつけ教室に連れて行った。
e5884|It's gratifying to see the kids grow.|子どもたちの成長を見るのはうれしい。
e5885|He arrived in the city penniless.|彼は一文無しでその都市に着いた。
e5886|A malfunction stopped the elevator.|故障でエレベーターが止まった。
e5887|The magician enthralled the children.|手品師は子どもたちを夢中にさせた。
e5888|Sometimes I indulge in a long bath.|ときどき長風呂を楽しむ。
e5889|She has long, slender fingers.|彼女は長くほっそりした指をしている。
e5890|Music helps break the monotony of cleaning.|音楽は掃除の単調さを和らげてくれる。
e5891|This bird is endemic to the island.|この鳥はその島の固有種だ。
e5892|The talks ended in a stalemate.|話し合いは行き詰まりに終わった。
e5893|I pondered the question all night.|その問題を一晩中じっくり考えた。
e5894|The two colors are subtly different.|その2色は微妙に違う。
e5895|The desert is an inhospitable place.|砂漠は住みにくい場所だ。
e5896|Children are the main beneficiaries of the program.|子どもがその計画の主な受益者だ。
e5897|Moving to a new country can be daunting.|新しい国への引っ越しは気が遠くなることもある。
e5898|She repressed a laugh during the meeting.|彼女は会議中に笑いをこらえた。
e5899|The audience was predominantly young people.|観客は主に若者だった。
e5900|Mosquitoes can transmit diseases.|蚊は病気を伝染させることがある。
e5901|A wheelchair gives her more mobility.|車いすで彼女はもっと動きやすくなる。
e5902|The doctor gave me a generic medicine.|医者はジェネリック医薬品を出してくれた。
e5903|In its heyday, the town had three cinemas.|全盛期には町に映画館が3つあった。
e5904|Her death left a void in our lives.|彼女の死は私たちの生活に空白を残した。
e5905|He always grumbles about the food.|彼はいつも食べ物に文句を言う。
e5906|She is vocal about protecting animals.|彼女は動物保護について声高に意見を言う。
e5907|We keep a stockpile of water for emergencies.|非常時のために水を備蓄している。
e5908|The museum displays ancient artifacts.|博物館は古代の遺物を展示している。
e5909|The dancer gave a dazzling performance.|そのダンサーは見事な演技を見せた。
e5910|The smell lured the cat into the kitchen.|その匂いにつられて猫が台所に入ってきた。
e5911|Grandparents are often lenient with kids.|祖父母は子どもに甘いことが多い。
e5912|The movie's ending was controversial.|その映画の結末は議論を呼んだ。
e5913|Tips are left to the customer's discretion.|チップは客の判断に任されている。
e5914|The ball hit the wall at high velocity.|ボールは高速で壁に当たった。
e5915|It was a grievous mistake.|それは重大な誤りだった。
e5916|Dad prunes the roses every spring.|父は毎年春にバラを剪定する。
e5917|We devised a new game for the party.|パーティーのために新しいゲームを考え出した。
e5918|The thief and his accomplice were caught.|泥棒とその共犯者は捕まった。
e5919|Don't overestimate your own strength.|自分の力を過大評価しないで。
e5920|Road work caused a diversion this morning.|今朝は道路工事で迂回させられた。
e5921|The decision was consensual among all members.|その決定は全員の合意の上だった。
e5922|I'm prone to catching colds in winter.|私は冬に風邪をひきやすい。
e5923|What does the job entail?|その仕事にはどんなことが含まれますか？
e5924|The dictator controlled the media.|その独裁者はメディアを支配した。
e5925|Put the photos in chronological order.|写真を年代順に並べて。
e5926|He came under the guise of a friend.|彼は友人を装ってやって来た。
e5927|The school offers enrichment classes after lunch.|学校は昼食後に発展学習の授業を行っている。
e5928|She oversees a team of ten people.|彼女は10人のチームを監督している。
e5929|Don't overload the washing machine.|洗濯機に詰め込みすぎないで。
e5930|Good grades give you leverage when choosing schools.|良い成績は学校選びで強みになる。
e5931|It's bound to rain this afternoon.|今日の午後はきっと雨が降る。
e5932|Don't dwell on your mistakes.|失敗をくよくよ考えないで。
e5933|Scratching will aggravate the rash.|かくと発疹が悪化する。
e5934|The family faced eviction from their apartment.|その家族はアパートからの立ち退きに直面した。
e5935|My uncle is a fanatical baseball fan.|おじは熱狂的な野球ファンだ。
e5936|They engraved our names on the trophy.|トロフィーに私たちの名前が刻まれた。
e5937|The sailors were in great peril.|船員たちは大きな危険にさらされていた。
e5938|She mustered the courage to speak.|彼女は勇気を奮い起こして話した。
e5939|The test checks your competency in math.|そのテストは数学の能力を確かめる。
e5940|Cats are very agile animals.|猫はとても機敏な動物だ。
e5941|We formulated a plan to save money.|私たちはお金をためる計画を立てた。
e5942|She stayed positive in the face of adversity.|彼女は逆境の中でも前向きでいた。
e5943|It's rude to eavesdrop on other people.|他人の話を盗み聞きするのは失礼だ。
e5944|The mountains looked hazy this morning.|今朝は山がかすんで見えた。
e5945|He made a grimace when he tasted the medicine.|彼は薬を味わってしかめっ面をした。
e5946|The kitten gave a feeble cry.|子猫が弱々しく鳴いた。
e5947|She finds fulfillment in helping others.|彼女は人助けに充実感を見いだしている。
e5948|The pirates hid their plunder on an island.|海賊たちは略奪品を島に隠した。
e5949|I think he's just bluffing.|彼はただはったりをかけているだけだと思う。
e5950|Lack of sleep can undermine your health.|睡眠不足は健康をむしばむことがある。
e5951|The program helps young delinquents find jobs.|その計画は非行少年の就職を支援している。
e5952|Her answer was clear and succinct.|彼女の答えは明確で簡潔だった。
e5953|The plane began its descent.|飛行機は降下を始めた。
e5954|Some mushrooms contain a lethal poison.|毒キノコの中には致死性の毒を含むものがある。
e5955|The music almost hypnotized the audience.|音楽は観客をほとんど夢中にさせた。
e5956|The medicine had no adverse effects.|その薬に副作用はなかった。
e5957|My aunt works as an attorney.|おばは弁護士として働いている。
e5958|The demolition of the old school began today.|今日、古い校舎の取り壊しが始まった。
e5959|The villain had a devious plan.|悪役はずる賢い計画を持っていた。
e5960|The news stunned the whole class.|その知らせはクラス全員を唖然とさせた。
e5961|He is a patron of the local theater.|彼は地元劇場の後援者だ。
e5962|Whether the plan will work is debatable.|その計画がうまくいくかどうかは議論の余地がある。
e5963|I need to brush up on my English before the trip.|旅行の前に英語を磨き直さなきゃ。
e5964|The ceaseless noise kept me awake.|絶え間ない騒音で眠れなかった。
e5965|Judges must uphold the law.|裁判官は法を守らなければならない。
e5966|This machine was the forerunner of the computer.|この機械はコンピューターの先駆けだった。
e5967|Prioritize your homework before games.|ゲームより先に宿題を優先して。
e5968|Their skills are complementary.|彼らの能力は互いに補い合っている。
e5969|The garden was overrun with weeds.|庭は雑草がはびこっていた。
e5970|Many students, notably the girls, joined the club.|多くの生徒、特に女子がそのクラブに入った。
e5971|The country had an authoritarian government.|その国には権威主義的な政府があった。
e5972|The witness testified in court.|証人は法廷で証言した。
e5973|Don't worry about such inconsequential details.|そんなささいなことは気にしないで。
e5974|The news was met with skepticism.|そのニュースは疑いの目で受け止められた。
e5975|The castle's fortifications are still standing.|城の防御設備は今も残っている。
e5976|Let me ask you a hypothetical question.|仮定の質問をさせてください。
e5977|Don't squander your allowance on candy.|おこづかいをお菓子に無駄遣いしないで。
e5978|The camera comes with many accessories.|そのカメラには付属品がたくさんついている。
e5979|The shoes were cheap but shoddy.|その靴は安いが粗悪だった。
e5980|The inefficiency of the system wastes time.|そのシステムの非効率さは時間の無駄だ。
e5981|They threw an extravagant birthday party.|彼らはぜいたくな誕生日パーティーを開いた。
e5982|Let me mull over your offer.|あなたの申し出をじっくり考えさせて。
e5983|Teenagers want more autonomy.|10代の子はもっと自主性を求める。
e5984|The chip is embedded in the card.|チップはカードに埋め込まれている。
e5985|The storm caused catastrophic damage.|嵐は壊滅的な被害をもたらした。
e5986|There was only a marginal improvement.|わずかな改善しかなかった。
e5987|He sends a monthly remittance to his family.|彼は毎月家族に仕送りしている。
e5988|He is invariably late for meetings.|彼は会議に決まって遅れる。
e5989|The rain didn't deter us from going.|雨でも私たちは出かけるのをやめなかった。
e5990|Sunlight can degrade plastic over time.|日光は時間とともにプラスチックを劣化させる。
e5991|The doctor said the prognosis was good.|医者は予後は良好だと言った。
e5992|Winning the game bolstered our confidence.|試合に勝って私たちの自信が高まった。
e5993|The buses return to the depot at night.|バスは夜に車庫に戻る。
e5994|Try to reduce your salt intake.|塩分の摂取を減らすようにして。
e5995|The dispute was settled by arbitration.|その争いは仲裁によって解決された。
e5996|The marathon was a grueling race.|マラソンは過酷なレースだった。
e5997|My grandparents live on their pension.|祖父母は年金で暮らしている。
e5998|She epitomizes the hardworking student.|彼女は勤勉な生徒の典型だ。
e5999|Someone tampered with my bike lock.|誰かが私の自転車の鍵をいじった。
e6000|We had the misfortune of missing the last train.|私たちは不運にも終電を逃した。
e6001|Children are often more resilient than adults think.|子どもは大人が思うより立ち直りが早いことが多い。
e6002|The implementation of the new plan starts next month.|新しい計画の実施は来月始まる。
e6003|It is infuriating when the train is late again.|電車がまた遅れると腹立たしい。
e6004|One mistake can negate all your hard work.|一つのミスがすべての努力を帳消しにすることがある。
e6005|Every worker has an entitlement to paid holidays.|すべての労働者には有給休暇の権利がある。
e6006|The club fosters friendship among local children.|そのクラブは地元の子どもたちの友情を育んでいる。
e6007|Legislators debated the new tax law for hours.|議員たちは新しい税法について何時間も議論した。
e6008|The punishment was disproportionate to the crime.|その罰は罪に対して不釣り合いだった。
e6009|This medicine may induce sleep.|この薬は眠気を誘うことがある。
e6010|My grandfather was diagnosed with dementia last year.|祖父は去年認知症と診断された。
e6011|She came up with an ingenious solution.|彼女は独創的な解決策を思いついた。
e6012|The trial was a mockery of justice.|その裁判は正義を愚弄するものだった。
e6013|The scandal discredited the entire company.|そのスキャンダルで会社全体の信用が落ちた。
e6014|These are only peripheral issues.|これらは周辺的な問題にすぎない。
e6015|The old castle had an aura of mystery.|その古城には神秘的な雰囲気があった。
e6016|The wicked witch cast a spell on the princess.|邪悪な魔女が王女に呪いをかけた。
e6017|Our travel plans fell through at the last minute.|旅行の計画は直前にだめになった。
e6018|The view from the summit was astounding.|山頂からの眺めは驚くべきものだった。
e6019|The box was too unwieldy to carry alone.|その箱はかさばって一人では運べなかった。
e6020|I can't recollect where I put my keys.|鍵をどこに置いたか思い出せない。
e6021|You can vote by proxy if you are away.|不在なら代理で投票できる。
e6022|Break the task into manageable parts.|その仕事を扱いやすい部分に分けなさい。
e6023|The conqueror built a huge palace in the city.|その征服者は都市に巨大な宮殿を建てた。
e6024|The old water pipe ruptured during the night.|古い水道管が夜中に破裂した。
e6025|He is a seasoned traveler who has visited fifty countries.|彼は50か国を訪れた経験豊富な旅行者だ。
e6026|The hospital was sued for malpractice.|その病院は医療過誤で訴えられた。
e6027|Students are entitled to a discount on tickets.|学生はチケットの割引を受ける資格がある。
e6028|Farmers are the backbone of this town.|農家はこの町の中心的存在だ。
e6029|The village looked desolate after the storm.|嵐の後、村は荒れ果てて見えた。
e6030|Many people equate money with happiness.|多くの人はお金を幸せと同一視する。
e6031|My son was insistent that we buy a puppy.|息子は子犬を買おうとしつこく言い張った。
e6032|The dove is an emblem of peace.|鳩は平和の象徴だ。
e6033|The teacher calmed down the unruly class.|先生は手に負えないクラスを落ち着かせた。
e6034|Savings act as a buffer against hard times.|貯金は苦しい時期の緩衝材になる。
e6035|The company used a loophole to avoid paying taxes.|その会社は税金を逃れるために抜け穴を利用した。
e6036|They were persecuted for their religious beliefs.|彼らは宗教的信念のために迫害された。
e6037|We splurged on a fancy dinner for Mom's birthday.|母の誕生日に奮発して豪華な夕食にした。
e6038|Please be discreet about this matter.|この件については慎重にお願いします。
e6039|Be wary of strangers who offer free gifts.|無料の贈り物をくれる見知らぬ人には用心しなさい。
e6040|The king issued a decree banning hunting.|王は狩猟を禁じる法令を出した。
e6041|The newspaper printed a sensational story about the actor.|新聞はその俳優についての衝撃的な記事を載せた。
e6042|He had the audacity to ask for more money.|彼は厚かましくもさらにお金を要求した。
e6043|Please replenish the paper in the printer.|プリンターに紙を補充してください。
e6044|The venerable temple is over a thousand years old.|その由緒ある寺は千年以上の歴史がある。
e6045|The report contains several inaccuracies.|その報告書にはいくつか不正確な点がある。
e6046|Thank you for your unwavering support.|揺るぎないご支援に感謝します。
e6047|Guests must vacate their rooms by eleven.|宿泊客は11時までに部屋を空けなければならない。
e6048|The film shows the brutality of war.|その映画は戦争の残虐性を描いている。
e6049|Constant vigilance is needed to prevent fires.|火事を防ぐには常に警戒が必要だ。
e6050|He was arrested for credit card fraud.|彼はクレジットカード詐欺で逮捕された。
e6051|The shop sells fine tea for discerning customers.|その店は目の肥えた客向けに上質なお茶を売っている。
e6052|Shoplifters will be prosecuted.|万引きをした者は起訴されます。
e6053|The writer lived in seclusion in the mountains.|その作家は山の中で隠遁生活をしていた。
e6054|The police are still searching for the assailant.|警察はまだ襲撃者を捜している。
e6055|The hotel offers unparalleled views of the ocean.|そのホテルからは比類のない海の眺めが楽しめる。
e6056|The federal government announced a new budget.|連邦政府は新しい予算を発表した。
e6057|Mom nags me to clean my room every day.|母は毎日部屋を片付けるよう口うるさく言う。
e6058|Not speaking English was a handicap in his job.|英語を話せないことは彼の仕事で不利な条件だった。
e6059|The man swindled the old woman out of her savings.|その男は老婦人から貯金をだまし取った。
e6060|People fled the repressive government.|人々は抑圧的な政府から逃れた。
e6061|Many people called for the abolition of the death penalty.|多くの人が死刑の廃止を求めた。
e6062|She is a versatile actress who can sing and dance.|彼女は歌も踊りもこなす多才な女優だ。
e6063|A lawyer acted as an intermediary between the two sides.|弁護士が両者の仲介者を務めた。
e6064|The store needs a quick replenishment of milk.|その店は牛乳をすぐに補充する必要がある。
e6065|The evidence implicated the manager in the theft.|証拠はその盗難に支配人が関与していることを示した。
e6066|She remained upbeat despite the bad news.|悪い知らせにもかかわらず彼女は前向きなままだった。
e6067|After the exertion of the climb, we rested.|登山で力を使い果たした後、私たちは休んだ。
e6068|The city charges a fee for garbage disposal.|市はごみの処分に料金を取る。
e6069|Immigration is a thorny issue for many countries.|移民は多くの国にとってやっかいな問題だ。
e6070|The effect of the medicine was almost instantaneous.|その薬の効果はほぼ即座に表れた。
e6071|The teacher tried to elicit answers from the students.|先生は生徒から答えを引き出そうとした。
e6072|The attack was in retaliation for the bombing.|その攻撃は爆撃への報復だった。
e6073|Please verify your email address.|メールアドレスを確認してください。
e6074|The previous occupant left the apartment very clean.|前の居住者はアパートをとてもきれいにして出て行った。
e6075|The two countries signed a peace accord.|両国は和平協定に調印した。
e6076|He got a three-day suspension from school.|彼は3日間の停学処分を受けた。
e6077|He is obsessed with video games.|彼はテレビゲームに取りつかれている。
e6078|The team was relegated to the second division.|そのチームは2部に降格した。
e6079|She meticulously checked every page of the report.|彼女は報告書のすべてのページを念入りに確認した。
e6080|The dress has a flower motif.|そのドレスには花のモチーフがある。
e6081|Reading helps children's cognitive development.|読書は子どもの認知発達を助ける。
e6082|Please duplicate this key for me.|この鍵の合い鍵を作ってください。
e6083|He was fined for reckless driving.|彼は無謀運転で罰金を科された。
e6084|The paramedics arrived within five minutes.|救急救命士は5分以内に到着した。
e6085|Your application has been duly received.|あなたの申込書は正式に受理されました。
e6086|The flood waters slowly receded.|洪水の水はゆっくりと引いた。
e6087|She retorted that it was not her fault.|彼女は自分のせいではないと言い返した。
e6088|The pandemic changed how many people work.|パンデミックは多くの人の働き方を変えた。
e6089|She likes feminine clothes with soft colors.|彼女は柔らかい色の女性らしい服が好きだ。
e6090|Signing this form is just a formality.|この書類への署名は単なる形式的な手続きだ。
e6091|The new coach looks intimidating but is very kind.|新しいコーチは威圧的に見えるがとても優しい。
e6092|We always strive to do our best.|私たちは常に最善を尽くすよう努力している。
e6093|Good service is the hallmark of this hotel.|よいサービスがこのホテルの特徴だ。
e6094|Wearing a helmet is mandatory here.|ここではヘルメットの着用が義務だ。
e6095|Please ask only pertinent questions.|関連のある質問だけをしてください。
e6096|We doubt the viability of the project.|その計画の実行可能性は疑わしい。
e6097|He was so engrossed in his book that he missed his stop.|彼は本に夢中で降りる駅を乗り過ごした。
e6098|My back pain flared up again this morning.|今朝また腰痛がぶり返した。
e6099|The company revamped its website last year.|その会社は昨年ウェブサイトを刷新した。
e6100|The teacher gave us some supplementary materials.|先生は補足資料をいくつかくれた。
e6101|Prudence is important when you invest money.|お金を投資するときは慎重さが大切だ。
e6102|The police offered a bounty for information.|警察は情報提供に報奨金を出した。
e6103|The president vetoed the new law.|大統領は新しい法案を拒否した。
e6104|The weather changed, so we changed our plans accordingly.|天気が変わったので、それに応じて計画を変えた。
e6105|Tokyo is one of the most populous cities in the world.|東京は世界で最も人口の多い都市の一つだ。
e6106|They held a lavish party for their anniversary.|彼らは記念日に豪華なパーティーを開いた。
e6107|I bought the shoes on impulse.|その靴を衝動買いしてしまった。
e6108|My voice was hoarse after the concert.|コンサートの後、声がかれていた。
e6109|Many animals are slaughtered for food each year.|毎年多くの動物が食用に殺されている。
e6110|Your essay needs more coherence.|あなたの作文にはもっと一貫性が必要だ。
e6111|A teacher acted as a mediator in the argument.|先生が言い争いの仲裁役を務めた。
e6112|An irate customer complained to the manager.|激怒した客が店長に苦情を言った。
e6113|The pianist has a large repertoire of songs.|そのピアニストは曲のレパートリーが広い。
e6114|Could you enlighten me about the new rules?|新しい規則について教えていただけますか。
e6115|A judge must be impartial.|裁判官は公平でなければならない。
e6116|The merger created synergy between the two companies.|合併で両社の間に相乗効果が生まれた。
e6117|Scientists are grappling with climate change.|科学者たちは気候変動に取り組んでいる。
e6118|The word cheap has a negative connotation.|cheap という語には否定的な含みがある。
e6119|He made an impulsive decision to quit his job.|彼は衝動的に仕事を辞める決断をした。
e6120|The children got into mischief while I was out.|私が外出中に子どもたちがいたずらをした。
e6121|He conceived the idea for the book on a train.|彼は電車の中でその本の着想を得た。
e6122|Jubilant fans celebrated in the streets.|歓喜に満ちたファンが通りで祝った。
e6123|It rained intermittently all afternoon.|午後はずっと断続的に雨が降った。
e6124|She had a yearning to see her hometown again.|彼女は故郷をもう一度見たいと切望していた。
e6125|Her unflagging energy amazed everyone.|彼女の衰えないエネルギーに皆が驚いた。
e6126|This charger is compatible with most phones.|この充電器はほとんどの携帯電話と互換性がある。
e6127|The new system will streamline the ordering process.|新しいシステムは注文の手順を効率化する。
e6128|The sky was overcast all day.|一日中空はどんよりと曇っていた。
e6129|She practices mindfulness to reduce stress.|彼女はストレスを減らすためにマインドフルネスを実践している。
e6130|He is a devotee of classical music.|彼はクラシック音楽の熱心な愛好家だ。
e6131|The kitchen was chaotic before dinner.|夕食前の台所は混乱していた。
e6132|The hungry boys devoured the whole pizza.|お腹をすかせた少年たちはピザを丸ごと平らげた。
e6133|Her manners showed great refinement.|彼女の振る舞いはとても洗練されていた。
e6134|She emphatically denied the rumor.|彼女はそのうわさをきっぱりと否定した。
e6135|The relentless rain lasted for a week.|容赦ない雨が一週間続いた。
e6136|Passing the exam is the first hurdle.|試験に合格することが最初の障害だ。
e6137|It was a deliberate attempt to cheat.|それは意図的な不正の試みだった。
e6138|This area is designated as a no-smoking zone.|この区域は禁煙区域に指定されている。
e6139|He was imprisoned for ten years.|彼は10年間投獄された。
e6140|Forgetting her name was a terrible blunder.|彼女の名前を忘れたのはひどいへまだった。
e6141|My brother went through a rebellious phase.|兄は反抗期を経験した。
e6142|Children's bodies change a lot during puberty.|思春期には子どもの体が大きく変化する。
e6143|Many people perished in the earthquake.|その地震で多くの人が亡くなった。
e6144|We want to avoid duplication of work.|私たちは作業の重複を避けたい。
e6145|There is no conclusive evidence against him.|彼に不利な決定的証拠はない。
e6146|We got lost and wound up in a strange town.|私たちは道に迷い、結局見知らぬ町に行き着いた。
e6147|My maternal grandmother lives in Osaka.|母方の祖母は大阪に住んでいる。
e6148|Her English pronunciation is flawless.|彼女の英語の発音は完璧だ。
e6149|The rain hastened our return home.|雨のおかげで私たちは帰宅を早めた。
e6150|The nomads moved with their sheep across the desert.|遊牧民は羊とともに砂漠を移動した。
e6151|The movie had a poignant ending.|その映画は胸を打つ結末だった。
e6152|Our team lost in a lopsided game.|私たちのチームは一方的な試合で負けた。
e6153|He went to a vocational school to become a cook.|彼は料理人になるため職業学校に通った。
e6154|The little boy threw a tantrum in the store.|小さな男の子が店でかんしゃくを起こした。
e6155|This water has been distilled.|この水は蒸留されている。
e6156|The town lives in perpetual fear of floods.|その町は絶えず洪水を恐れて暮らしている。
e6157|There was an eerie silence in the old house.|古い家には不気味な静けさがあった。
e6158|Lions and tigers are carnivores.|ライオンやトラは肉食動物だ。
e6159|Traffic was diverted because of the accident.|事故のため車は迂回させられた。
e6160|The garden gave me a sense of serenity.|その庭は私に穏やかな気持ちを与えてくれた。
e6161|The wine complements the fish perfectly.|そのワインは魚料理を完璧に引き立てる。
e6162|Torrential rain caused flooding in the city.|激しい雨で市内が浸水した。
e6163|The town wants to reduce juvenile delinquency.|その町は少年非行を減らしたいと考えている。
e6164|Don't shove people when you get on the train.|電車に乗るときに人を押してはいけない。
e6165|The police stopped the riot quickly.|警察はすぐに暴動を鎮めた。
e6166|His invariable answer was no.|彼の答えはいつも決まってノーだった。
e6167|Stress increases our susceptibility to colds.|ストレスは風邪へのかかりやすさを高める。
e6168|The bad fish gave him diarrhea.|悪くなった魚で彼は下痢をした。
e6169|I had a bizarre dream last night.|昨夜奇妙な夢を見た。
e6170|The artist is known for his unconventional style.|その芸術家は型破りな作風で知られている。
e6171|It is hypocrisy to preach what you don't practice.|自分が実践しないことを説くのは偽善だ。
e6172|His words only inflamed the crowd's anger.|彼の言葉は群衆の怒りをあおるだけだった。
e6173|The meeting dragged on for three hours.|会議は3時間もだらだらと続いた。
e6174|This restaurant serves a fusion of Japanese and French food.|このレストランは和食とフランス料理を融合させた料理を出す。
e6175|This building exemplifies modern design.|この建物は現代的デザインの典型だ。
e6176|Some groups feel marginalized by society.|社会から疎外されていると感じる集団もある。
e6177|It is hard to translate the subtleties of poetry.|詩の微妙なニュアンスを翻訳するのは難しい。
e6178|Please accept this gift as a token of thanks.|感謝のしるしとしてこの贈り物を受け取ってください。
e6179|The contract will be terminated next month.|その契約は来月終了する。
e6180|The coffee was lukewarm by the time I drank it.|飲むころにはコーヒーはぬるくなっていた。
e6181|The rescued dog was badly malnourished.|保護された犬はひどい栄養失調だった。
e6182|The school initiated a new recycling program.|学校は新しいリサイクル計画を開始した。
e6183|She has traveled extensively in Asia.|彼女はアジアを広く旅してきた。
e6184|Some foods raise blood sugar; conversely, others lower it.|血糖値を上げる食品もあれば、逆に下げる食品もある。
e6185|She has an uncanny ability to guess my thoughts.|彼女には私の考えを当てる不思議な力がある。
e6186|He carried a stout walking stick.|彼は頑丈な杖を持っていた。
e6187|The storm uprooted several old trees.|嵐で古い木が数本根こそぎにされた。
e6188|We enjoyed the tranquility of the countryside.|私たちは田舎の静けさを楽しんだ。
e6189|The Christmas illuminations in the city are beautiful.|街のクリスマスのイルミネーションは美しい。
e6190|She was elated to hear she had passed.|彼女は合格したと聞いて大喜びだった。
e6191|Rumors circulate quickly in a small town.|小さな町ではうわさがすぐに広まる。
e6192|He got detention for talking in class.|彼は授業中のおしゃべりで居残りをさせられた。
e6193|Loud music can impair your hearing.|大音量の音楽は聴力を損なうことがある。
e6194|The group sends humanitarian aid to war zones.|その団体は紛争地域に人道支援を送っている。
e6195|This album is a compilation of her greatest hits.|このアルバムは彼女のヒット曲を集めたものだ。
e6196|Experts authenticated the old painting.|専門家がその古い絵画を本物と鑑定した。
e6197|Quick action averted a disaster.|素早い行動で惨事が回避された。
e6198|Sales this year surpassed our expectations.|今年の売り上げは予想を上回った。
e6199|The problem seemed insurmountable at first.|その問題は最初は乗り越えられないように思えた。
e6200|Racial segregation was once legal in parts of America.|人種隔離はかつてアメリカの一部で合法だった。
e6201|The river suffered contamination from a nearby factory.|その川は近くの工場によって汚染された。
e6202|These flowers give off a sweet smell.|これらの花は甘い香りを放つ。
e6203|Everyone scrambled to get a seat on the bus.|皆がバスの席を取ろうと急いだ。
e6204|He has a predisposition to heart disease.|彼は心臓病にかかりやすい体質だ。
e6205|Be careful of fraudulent emails asking for money.|お金を求める詐欺メールに気をつけなさい。
e6206|The runner was disqualified for a false start.|その走者はフライングで失格になった。
e6207|His name was conspicuously absent from the list.|彼の名前がリストにないのが目立った。
e6208|The museum has an archive of old photos.|その博物館には古い写真の記録保管所がある。
e6209|Scratching will only exacerbate the rash.|かくと発疹が悪化するだけだ。
e6210|She is a prolific writer with over fifty books.|彼女は50冊以上の本を書いた多作の作家だ。
e6211|The airline mishandled my luggage.|航空会社は私の荷物を手荒に扱った。
e6212|The test was deemed too difficult for children.|そのテストは子どもには難しすぎるとみなされた。
e6213|She follows a strict exercise regimen.|彼女は厳しい運動の日課を守っている。
e6214|The factory laid off two hundred workers.|その工場は200人の労働者を一時解雇した。
e6215|It was hard to discern his true feelings.|彼の本当の気持ちを見分けるのは難しかった。
e6216|There is a scarcity of water in summer.|夏には水不足が起こる。
e6217|The room was decorated in subdued colors.|その部屋は落ち着いた色で飾られていた。
e6218|The police foiled the bank robbery.|警察は銀行強盗を阻止した。
e6219|We bought firewood before the onset of winter.|冬の始まる前にまきを買った。
e6220|He worked all day for a paltry sum.|彼はわずかな金額のために一日中働いた。
e6221|Teachers impart knowledge to their students.|教師は生徒に知識を伝える。
e6222|Good posture is important for your back.|よい姿勢は背中にとって大切だ。
e6223|She lost her inhibitions and started to dance.|彼女は遠慮を捨てて踊り始めた。
e6224|The winter here can be brutal.|ここの冬は過酷なことがある。
e6225|Do not leave your bags unattended.|荷物を放置しないでください。
e6226|The girl was abducted on her way home.|その少女は帰宅途中に連れ去られた。
e6227|The school did away with uniforms.|その学校は制服を廃止した。
e6228|The minister sidestepped the reporter's question.|大臣は記者の質問をはぐらかした。
e6229|The students collectively decided on the trip.|生徒たちは全体で旅行先を決めた。
e6230|The meeting was adjourned until Monday.|会議は月曜日まで休会となった。
e6231|The old painter lived as a recluse.|その老画家は世捨て人のように暮らした。
e6232|The mischievous kitten knocked over my cup.|いたずらな子猫が私のカップをひっくり返した。
e6233|There is growing pessimism about the economy.|経済に対する悲観が広がっている。
e6234|This is the definitive guide to Japanese cooking.|これは日本料理の決定版ガイドだ。
e6235|She felt apprehensive about her first day at work.|彼女は初出勤の日を不安に思っていた。
e6236|The court overturned the earlier decision.|裁判所は以前の判決を覆した。
e6237|He gave up in despair.|彼は絶望してあきらめた。
e6238|Some patients felt better after taking a placebo.|偽薬を飲んだ後に気分がよくなった患者もいた。
e6239|You must have a lawful reason to enter.|入るには正当な理由が必要だ。
e6240|The company failed because of mismanagement.|その会社はずさんな経営のせいで倒産した。
e6241|I concur with your opinion.|あなたの意見に同意します。
e6242|He was expelled from school for fighting.|彼はけんかで退学処分になった。
e6243|I have a craving for chocolate.|無性にチョコレートが食べたい。
e6244|The shop will stay closed for the foreseeable future.|その店は当分の間閉店したままだ。
e6245|It would be insane to swim in this storm.|この嵐の中で泳ぐなんて正気の沙汰ではない。
e6246|The drawer is full of miscellaneous items.|その引き出しは雑多な物でいっぱいだ。
e6247|We listened to the live commentary of the game.|私たちは試合の実況中継を聞いた。
e6248|We want to maximize our profits.|私たちは利益を最大化したい。
e6249|The alleged thief was arrested yesterday.|窃盗の疑いのある人物が昨日逮捕された。
e6250|They made a plan whereby everyone shares the work.|皆で仕事を分担するという計画を立てた。
e6251|Political discourse has become very angry.|政治的な議論はとても感情的になっている。
e6252|Tears blurred her vision.|涙で彼女の視界がぼやけた。
e6253|This knife is too blunt to cut bread.|このナイフは切れなくてパンが切れない。
e6254|What is the rationale behind this decision?|この決定の根拠は何ですか。
e6255|The festival culminated in a huge fireworks show.|祭りは盛大な花火大会で最高潮を迎えた。
e6256|I had a premonition that something bad would happen.|何か悪いことが起こる予感がした。
e6257|I've misplaced my glasses again.|また眼鏡をどこかに置き忘れた。
e6258|The link between the two events is tenuous.|二つの出来事の関連は希薄だ。
e6259|We took a detour because of the road work.|道路工事のため回り道をした。
e6260|The victims received compensation from the company.|被害者は会社から補償を受けた。
e6261|She worked with several collaborators on the album.|彼女は数人の共同制作者とアルバムを作った。
e6262|The forest was ravaged by fire.|その森は火事で荒廃した。
e6263|These birds rarely breed in captivity.|これらの鳥は飼育下ではめったに繁殖しない。
e6264|His answer was ambiguous.|彼の答えはあいまいだった。
e6265|The dog retrieved the ball from the river.|犬は川からボールを取ってきた。
e6266|Nobody in this world is completely infallible.|この世に絶対に間違えない人などいない。
e6267|This course is for novices.|このコースは初心者向けだ。
e6268|Heavy snow hindered the rescue.|大雪が救助を妨げた。
e6269|Undaunted by failure, she tried again.|失敗にもひるまず、彼女は再挑戦した。
e6270|The misuse of medicine can be dangerous.|薬の誤用は危険なことがある。
e6271|The company found a niche in the pet food market.|その会社はペットフード市場ですき間を見つけた。
e6272|The spy carried out a covert mission.|そのスパイは秘密の任務を遂行した。
e6273|She showed her portfolio at the job interview.|彼女は就職面接で作品集を見せた。
e6274|He was shunned by his classmates.|彼はクラスメートから避けられていた。
e6275|I found his jokes distasteful.|彼の冗談は不快だと思った。
e6276|The municipal library is open until eight.|市立図書館は8時まで開いている。
e6277|The king made a proclamation of peace.|王は平和を宣言した。
e6278|Eating too fast gives me indigestion.|早食いすると胃もたれする。
e6279|Japan faces serious demographic changes.|日本は深刻な人口動態の変化に直面している。
e6280|The thick walls muffled the noise.|厚い壁が騒音を弱めた。
e6281|The city will phase out plastic bags.|市はレジ袋を段階的に廃止する予定だ。
e6282|A lapse in attention caused the accident.|ちょっとした不注意が事故を招いた。
e6283|The two events were concurrent.|その二つの出来事は同時に起こった。
e6284|Translations can lose the nuances of the original.|翻訳では原文の微妙なニュアンスが失われることがある。
e6285|The boat is propelled by a small engine.|そのボートは小さなエンジンで進む。
e6286|It is impossible to overstate the importance of sleep.|睡眠の大切さはいくら強調してもしすぎることはない。
e6287|We want wholesome food for our children.|私たちは子どものために体によい食べ物を求めている。
e6288|Waiting for the results was torture.|結果を待つのは拷問のようだった。
e6289|The driver was found negligent.|その運転手は過失があると認められた。
e6290|Shoppers were in a frenzy during the sale.|セール中、買い物客は大騒ぎだった。
e6291|She is contemplating a move to Canada.|彼女はカナダへの移住を考えている。
e6292|The new rules are burdensome for small shops.|新しい規則は小さな店にとって負担が重い。
e6293|The story is about loss and redemption.|その物語は喪失と救いについて描いている。
e6294|Many expatriates live in this part of the city.|街のこの地区には多くの外国人居住者が住んでいる。
e6295|Watch out for unscrupulous salesmen.|悪徳セールスマンに気をつけなさい。
e6296|It was a cold and dreary day.|寒くてわびしい一日だった。
e6297|He likes to flaunt his expensive watch.|彼は高価な腕時計を見せびらかすのが好きだ。
e6298|Keep perishable food in the fridge.|傷みやすい食べ物は冷蔵庫に入れておきなさい。
e6299|He respected his adversary on the court.|彼はコート上の対戦相手を尊敬していた。
e6300|You are not obligated to buy anything.|何も買う義務はありません。
e6301|The aesthetics of Japanese gardens attract many visitors.|日本庭園の美しさは多くの観光客を引きつける。
e6302|We studied the reproductive system of fish.|私たちは魚の生殖のしくみを学んだ。
e6303|Please don't meddle in my private life.|私の私生活に口出ししないでください。
e6304|The strike caused major disruption to train services.|ストライキで電車の運行が大きく混乱した。
e6305|He lived on a meager salary.|彼はわずかな給料で暮らしていた。
e6306|The CEO decided to step down after ten years.|そのCEOは10年後に辞任することにした。
e6307|We had a sumptuous meal at the hotel.|私たちはホテルで豪華な食事をした。
e6308|The church teaches its doctrine to young members.|その教会は若い信者に教義を教える。
e6309|She resides in a small town near the sea.|彼女は海の近くの小さな町に住んでいる。
e6310|All our efforts were in vain.|私たちの努力はすべてむだだった。
e6311|Forestry is an important industry in this region.|林業はこの地域の重要な産業だ。
e6312|Many migratory birds visit this lake in winter.|冬には多くの渡り鳥がこの湖を訪れる。
e6313|There was a feeling of euphoria after the victory.|勝利の後には高揚感があった。
e6314|The witness faced intimidation from the gang.|その証人はギャングから脅しを受けた。
e6315|I skimmed the newspaper over breakfast.|朝食をとりながら新聞にざっと目を通した。
e6316|Only a small part of the land is arable.|その土地のごく一部しか耕作に適していない。
e6317|The new tower dwarfs the buildings around it.|新しいタワーは周りの建物を小さく見せる。
e6318|They were arrested for conspiracy to commit fraud.|彼らは詐欺を共謀した罪で逮捕された。
e6319|The plan was overwhelmingly approved.|その計画は圧倒的多数で承認された。
e6320|Please validate your parking ticket at the desk.|受付で駐車券に認証を受けてください。
e6321|It is premature to celebrate now.|今祝うのは早すぎる。
e6322|The treaty is waiting for ratification.|その条約は批准を待っている。
e6323|The initiation of the project was delayed.|その計画の開始は遅れた。
e6324|The candidate received the endorsement of the mayor.|その候補者は市長の支持を得た。
e6325|This software is incompatible with my computer.|このソフトは私のパソコンと互換性がない。
e6326|Physics is outside my domain.|物理学は私の専門外だ。
e6327|They deferred the decision until next week.|彼らは決定を来週まで延期した。
e6328|He paid a hefty fine for speeding.|彼はスピード違反で高額な罰金を払った。
e6329|The boy showed no remorse for what he did.|その少年は自分のしたことを後悔する様子を見せなかった。
e6330|I can't give you the number offhand.|その番号はすぐにはお答えできません。
e6331|The corrupt officials took bribes.|腐敗した役人たちが賄賂を受け取った。
e6332|Mass hysteria spread through the town.|集団ヒステリーが町中に広がった。
e6333|The city allocated money for a new park.|市は新しい公園のために予算を割り当てた。
e6334|Smartphones have superseded many older devices.|スマートフォンは多くの古い機器に取って代わった。
e6335|My grandmother has a cheerful disposition.|祖母は明るい性格だ。
e6336|The car swerved to avoid a cat.|車は猫をよけるために急にハンドルを切った。
e6337|Don't let the bigger players intimidate you.|大きな選手たちにおじけづいてはいけない。
e6338|My curfew is ten o'clock on weekends.|週末の私の門限は10時だ。
e6339|The manager was receptive to our ideas.|部長は私たちの考えを快く受け入れてくれた。
e6340|You can eat sweets in moderation.|甘い物はほどほどなら食べてもいい。
e6341|During his tenure as mayor, the city grew quickly.|彼が市長を務めた期間に市は急速に発展した。
e6342|The country placed an embargo on oil imports.|その国は石油の輸入を禁止した。
e6343|Paintings adorn the walls of the hall.|ホールの壁は絵画で飾られている。
e6344|The plaintiff asked for one million dollars.|原告は100万ドルを要求した。
e6345|He was oblivious to the danger around him.|彼は周りの危険に気づいていなかった。
e6346|Immigration is a divisive issue in many countries.|移民は多くの国で対立を生む問題だ。
e6347|The family lived on subsistence farming.|その一家は自給農業で暮らしていた。
e6348|The two countries severed diplomatic ties.|両国は国交を断絶した。
e6349|Buying a new car was an extravagance.|新車を買うのはぜいたくだった。
e6350|We must prevent the escalation of the conflict.|私たちは紛争の拡大を防がなければならない。
e6351|The prize has no monetary value.|その賞には金銭的な価値はない。
e6352|A heated argument ensued.|続いて激しい口論が起こった。
e6353|The prison holds about five hundred inmates.|その刑務所には約500人の受刑者がいる。
e6354|Keep receipts for incidental expenses.|雑費の領収書を取っておきなさい。
e6355|Use salt sparingly in this recipe.|このレシピでは塩を控えめに使ってください。
e6356|Grandpa recounted his adventures at sea.|祖父は海での冒険を詳しく語った。
e6357|The museum tour was very instructive.|博物館の見学はとてもためになった。
e6358|She vowed never to give up.|彼女は決してあきらめないと誓った。
e6359|The guards overpowered the thief.|警備員たちが泥棒を取り押さえた。
e6360|They treated the old master with reverence.|彼らはその老師を敬意をもって扱った。
e6361|The president gave his inaugural speech.|大統領は就任演説をした。
e6362|They were once foes but are now friends.|彼らはかつて敵同士だったが今は友人だ。
e6363|Her voice was barely audible.|彼女の声はほとんど聞き取れなかった。
e6364|She was on the verge of tears.|彼女は今にも泣き出しそうだった。
e6365|Fallen trees impeded traffic.|倒木が交通を妨げた。
e6366|The car was stationary when the bus hit it.|バスがぶつかったとき車は止まっていた。
e6367|Each speaker is allotted ten minutes.|各発表者には10分が割り当てられる。
e6368|The test checks your reading comprehension.|そのテストは読解力を確かめるものだ。
e6369|Schools sometimes value conformity too much.|学校は時に周りに合わせることを重視しすぎる。
e6370|Scientists debunked the myth.|科学者たちはその俗説の誤りを暴いた。
e6371|We hiked along the rugged coast.|私たちは起伏の多い海岸沿いをハイキングした。
e6372|The merger of the two banks was announced today.|二つの銀行の合併が今日発表された。
e6373|Microbes live everywhere, even in our bodies.|微生物は私たちの体の中を含めあらゆる所にいる。
e6374|Everyone was moved by her eloquence.|皆が彼女の雄弁さに心を動かされた。
e6375|She gave a tactful answer to the rude question.|彼女は失礼な質問に機転のきいた答えをした。
e6376|It was a momentous day in our history.|それは私たちの歴史において重大な日だった。
e6377|People hoarded toilet paper during the crisis.|危機の間、人々はトイレットペーパーを買いだめした。
e6378|I always crave sweets when I'm tired.|疲れるといつも甘い物が無性に欲しくなる。
e6379|The villagers depend on fishing for sustenance.|村人たちは漁業で生計を立てている。
e6380|All players must abide by the rules.|すべての選手は規則を守らなければならない。
e6381|Japan has an independent judicial system.|日本には独立した司法制度がある。
e6382|These bags are counterfeits, not real brands.|これらのバッグは本物のブランド品ではなく偽物だ。
e6383|Copying the song infringes copyright.|その歌を複製するのは著作権の侵害だ。
e6384|He enjoys the solitude of early mornings.|彼は早朝の一人の時間を楽しんでいる。
e6385|The two companies formed an alliance.|その2社は提携した。
e6386|Please accept my heartfelt thanks.|心からの感謝をお受け取りください。
e6387|They used social media to propagate their ideas.|彼らは自分たちの考えを広めるためにSNSを使った。
e6388|After the party, the room was in disarray.|パーティーの後、部屋は散らかっていた。
e6389|Overfishing has depleted fish stocks.|乱獲で魚の資源が激減した。
e6390|She is an outspoken critic of the plan.|彼女はその計画を遠慮なく批判している。
e6391|I think that restaurant is overrated.|あのレストランは過大評価されていると思う。
e6392|Sleep deprivation can affect your health.|睡眠不足は健康に影響を与えることがある。
e6393|The tension in the room was palpable.|部屋の緊張感がはっきりと感じられた。
e6394|We knew from the outset that it would be hard.|最初から大変になるとわかっていた。
e6395|These movies perpetuate old stereotypes.|これらの映画は古い固定観念を定着させている。
e6396|The article was a distortion of the facts.|その記事は事実をゆがめたものだった。
e6397|My grandmother is getting frail.|祖母は体が弱ってきている。
e6398|This is a robust design that will last for years.|これは何年ももつ頑丈なデザインだ。
e6399|We spent a blissful week on the island.|私たちは島で至福の一週間を過ごした。
e6400|Please refrain from smoking here.|ここでの喫煙はご遠慮ください。
e6401|Drinking tea every morning is my daily ritual.|毎朝お茶を飲むのが私の日課だ。
e6402|It was hard to get my message across.|自分の言いたいことを伝えるのは難しかった。
e6403|She suffers from recurrent headaches.|彼女は繰り返し起こる頭痛に悩んでいる。
e6404|Any deviation from the plan must be reported.|計画からのずれはすべて報告しなければならない。
e6405|She confided in her best friend.|彼女は親友に秘密を打ち明けた。
e6406|The company has strict rules against harassment.|その会社には嫌がらせに対する厳しい規則がある。
e6407|Lack of sleep can cause lethargy.|睡眠不足はだるさの原因になる。
e6408|My thrifty mother never wastes food.|倹約家の母は決して食べ物を無駄にしない。
e6409|The journey was fraught with danger.|その旅は危険に満ちていた。
e6410|He wore a shabby old coat.|彼はみすぼらしい古いコートを着ていた。
e6411|The internet created a new paradigm for business.|インターネットはビジネスの新しい枠組みを生み出した。
e6412|The company will unveil its new phone tomorrow.|その会社は明日新しい携帯電話を発表する。
e6413|He is a fervent supporter of the local team.|彼は地元チームの熱烈なサポーターだ。
e6414|Japan is an archipelago of thousands of islands.|日本は何千もの島からなる列島だ。
e6415|Each juror listened carefully to the evidence.|陪審員はそれぞれ証拠に注意深く耳を傾けた。
e6416|Bad weather hampered the search.|悪天候が捜索を妨げた。
e6417|Read the synopsis before you watch the movie.|映画を見る前にあらすじを読みなさい。
e6418|The oppressive heat made it hard to sleep.|うだるような暑さで眠れなかった。
e6419|There is political unrest in the region.|その地域では政情が不安定だ。
e6420|You can omit this step if you are busy.|忙しければこの手順は省略してよい。
e6421|Building the model ship took painstaking work.|模型の船を作るのは骨の折れる作業だった。
e6422|My first boss was a great mentor to me.|最初の上司は私にとってすばらしい指導者だった。
e6423|This spray repels mosquitoes.|このスプレーは蚊を寄せつけない。
e6424|He was discharged from the hospital yesterday.|彼は昨日退院した。
e6425|We live in a quiet residential area.|私たちは静かな住宅地に住んでいる。
e6426|Our family motto is never give up.|我が家のモットーは決してあきらめないことだ。
e6427|Stay vigilant when walking alone at night.|夜一人で歩くときは油断しないように。
e6428|The family was evicted for not paying rent.|その家族は家賃を払わず立ち退きを命じられた。
e6429|This sofa is too bulky for our room.|このソファは私たちの部屋にはかさばりすぎる。
e6430|There was a sudden deterioration in his health.|彼の健康は急に悪化した。
e6431|I despise people who lie.|うそをつく人を軽蔑する。
e6432|The movie did not live up to my expectations.|その映画は期待外れだった。
e6433|Japan has a temperate climate.|日本は温暖な気候だ。
e6434|Reporters harassed the actor for days.|記者たちは何日もその俳優を悩ませた。
e6435|The medicine loses its potency over time.|その薬は時間がたつと効き目が落ちる。
e6436|The castle is infamous for its ghost stories.|その城は幽霊話で悪名高い。
e6437|Short hair is in vogue this year.|今年はショートヘアがはやっている。
e6438|He was accused of instigating the fight.|彼はけんかを扇動したとして責められた。
e6439|The withdrawal of troops began last week.|軍隊の撤退は先週始まった。
e6440|Lizards can regenerate their tails.|トカゲは尻尾を再生できる。
e6441|Babies need plenty of stimulation to learn.|赤ちゃんが学ぶには十分な刺激が必要だ。
e6442|We check the inventory every Friday.|毎週金曜日に在庫を確認する。
e6443|The old car is in pristine condition.|その古い車は新品同様の状態だ。
e6444|The letter was erroneously sent to my neighbor.|その手紙は誤って隣人に送られた。
e6445|The town reconstructed the bridge after the flood.|町は洪水の後に橋を再建した。
e6446|There is ample time to finish the test.|テストを終えるには十分な時間がある。
e6447|She has the right credentials for the job.|彼女はその仕事にふさわしい資格を持っている。
e6448|Copying all the data by hand was laborious.|すべてのデータを手で写すのは骨の折れる作業だった。
e6449|Incidentally, have you seen my umbrella?|ところで、私の傘を見なかった？
e6450|Higher prices were offset by better quality.|値上がり分は品質の向上で埋め合わされた。
e6451|Don't patronize me; I understand the problem.|子ども扱いしないで、問題はわかっているから。
e6452|Some people think a black cat is a bad omen.|黒猫は不吉な前兆だと考える人もいる。
e6453|We tried every conceivable method.|私たちは考えられるあらゆる方法を試した。
e6454|Small savings have a cumulative effect.|少しずつの貯金は積み重なって効果を生む。
e6455|The medicine may cause nausea.|その薬は吐き気を起こすことがある。
e6456|The strange question baffled the teacher.|その奇妙な質問に先生は困惑した。
e6457|She shrugged off the criticism and kept working.|彼女は批判を受け流して働き続けた。
e6458|The film shows the plight of refugees.|その映画は難民の苦境を描いている。
e6459|He has a cynical view of politics.|彼は政治に対して冷めた見方をしている。
e6460|That was a spiteful thing to say.|それは意地の悪い言い方だった。
e6461|Dogs are known for their fidelity to their owners.|犬は飼い主への忠実さで知られている。
e6462|The mechanic overhauled the engine.|整備士がエンジンを分解点検した。
e6463|She spoke candidly about her mistakes.|彼女は自分の失敗について率直に語った。
e6464|I returned the defective toaster to the store.|欠陥のあるトースターを店に返品した。
e6465|Please dispose of your trash properly.|ごみは適切に処分してください。
e6466|Employees and their spouses are invited to the party.|社員とその配偶者がパーティーに招待されている。
e6467|The lost dog was reunited with its family.|迷子の犬は家族と再会した。
e6468|He was a skeptic until he saw it himself.|彼は自分で見るまでは疑っていた。
e6469|Vegetable prices skyrocketed after the storm.|嵐の後、野菜の値段が急騰した。
e6470|The police are investigating the homicide.|警察はその殺人事件を捜査している。
e6471|She looked at the mess with disdain.|彼女は散らかった様子を軽蔑の目で見た。
e6472|We need a systematic approach to studying.|勉強には体系的なやり方が必要だ。
e6473|The suspect was detained for questioning.|容疑者は取り調べのために拘留された。
e6474|He enjoys solitary walks in the forest.|彼は森の中を一人で散歩するのが好きだ。
e6475|They live on the outskirts of Nagoya.|彼らは名古屋の郊外に住んでいる。
e6476|Many doctors endorse this diet.|多くの医師がこの食事法を支持している。
e6477|A feeling of melancholy came over me in autumn.|秋になると物悲しい気分になった。
e6478|The government raised tariffs on imported cars.|政府は輸入車の関税を引き上げた。
e6479|He has been estranged from his brother for years.|彼は何年も兄と疎遠になっている。
e6480|The film was acclaimed by critics.|その映画は批評家に絶賛された。
e6481|We met at a predetermined place.|私たちはあらかじめ決めた場所で会った。
e6482|Birds help in the dispersal of seeds.|鳥は種子をまき散らす手助けをする。
e6483|Her tenacity helped her win the race.|粘り強さのおかげで彼女はレースに勝った。
e6484|Leaders must be accountable for their decisions.|指導者は自分の決定に責任を持たなければならない。
e6485|We were inundated with calls after the show.|番組の後、電話が殺到した。
e6486|He found a lucrative job in the city.|彼は都会でもうかる仕事を見つけた。
e6487|Please keep your seat in the upright position.|座席をまっすぐな位置に戻してください。
e6488|The internet led to the demise of many video shops.|インターネットのせいで多くのレンタルビデオ店が消えた。
e6489|The integration of the two schools took a year.|二つの学校の統合には1年かかった。
e6490|An eminent scientist gave a lecture at our school.|著名な科学者が私たちの学校で講演した。
e6491|We said a tearful goodbye at the airport.|私たちは空港で涙ながらに別れを告げた。
e6492|The company breached the contract.|その会社は契約に違反した。
e6493|Children often want instant gratification.|子どもはすぐに満足を得たがることが多い。
e6494|Luckily, the tumor was benign.|幸い、腫瘍は良性だった。
e6495|The company is at the forefront of AI research.|その会社はAI研究の最前線にいる。
e6496|Their lives became closely intertwined.|彼らの人生は密接に絡み合うようになった。
e6497|Regular review improves memory retention.|定期的な復習は記憶の保持を高める。
e6498|We stayed at a tranquil lake in the mountains.|私たちは山の静かな湖に滞在した。
e6499|The brothers always try to outdo each other.|その兄弟はいつも互いに負けまいとする。
e6500|We ate snacks to stave off hunger.|空腹をしのぐためにお菓子を食べた。
e6501|Trust is the cornerstone of any good friendship.|信頼はどんな良い友情にとっても礎だ。
e6502|The mayor commended the firefighters for their bravery.|市長は消防士たちの勇敢さを称賛した。
e6503|At my mother's insistence, I wore a coat.|母が強く言うので、私はコートを着た。
e6504|Traffic jams are a perennial problem in this city.|交通渋滞はこの町の長年の問題だ。
e6505|Thousands of people attended the president's inauguration.|何千人もの人が大統領の就任式に出席した。
e6506|A delegation from Japan visited the conference.|日本からの代表団がその会議を訪れた。
e6507|The leader tried to unify the divided country.|その指導者は分断された国を統一しようとした。
e6508|Filling out these forms is a tedious job.|これらの書類に記入するのは退屈な仕事だ。
e6509|Sharks are predatory fish found in every ocean.|サメはあらゆる海にいる捕食性の魚だ。
e6510|I am deeply indebted to my teachers.|私は先生方に深く恩を受けている。
e6511|The new government has a mandate for change.|新政府には改革を行う権限がある。
e6512|Members receive preferential treatment at the hotel.|会員はホテルで優遇を受ける。
e6513|We mingled with other guests at the party.|私たちはパーティーで他の客と交流した。
e6514|The terrain here is too rocky for bikes.|ここの地形は自転車には岩が多すぎる。
e6515|His disruptive behavior annoyed the whole class.|彼の迷惑な行動はクラス全体をいらだたせた。
e6516|The police arrested three men for smuggling.|警察は密輸の容疑で3人の男を逮捕した。
e6517|Someone tried to sabotage our science project.|誰かが私たちの理科の研究を妨害しようとした。
e6518|The difference in price is negligible.|値段の差はごくわずかだ。
e6519|This rule is not applicable to children.|この規則は子どもには適用されない。
e6520|The city will crack down on illegal parking.|市は違法駐車を取り締まる予定だ。
e6521|Her exemplary behavior earned her a school award.|彼女の模範的な態度は学校の賞を受けた。
e6522|The strange noise unnerved everyone in the house.|その奇妙な音は家中の皆を不安にさせた。
e6523|The revelation shocked the whole country.|その暴露は国中に衝撃を与えた。
e6524|Cold weather can inhibit plant growth.|寒い天候は植物の成長を妨げることがある。
e6525|Shouting at kids is often counterproductive.|子どもを怒鳴るのはたいてい逆効果だ。
e6526|The police put up a barricade across the road.|警察は道路にバリケードを設置した。
e6527|She kept her composure during the difficult interview.|彼女は難しい面接の間も落ち着きを保った。
e6528|The sudden stop jolted the passengers forward.|急停車で乗客は前に揺さぶられた。
e6529|It was expedient to postpone the meeting.|会議を延期するのが好都合だった。
e6530|The king was merciful to his enemies.|その王は敵に対して慈悲深かった。
e6531|He was demoted after the serious mistake.|彼は重大なミスの後で降格させられた。
e6532|Laughter is a good antidote to stress.|笑いはストレスへの良い対策だ。
e6533|The castle belonged to the old aristocracy.|その城は昔の貴族階級のものだった。
e6534|Animals should be treated in a humane way.|動物は人道的に扱われるべきだ。
e6535|Drink water often to avoid dehydration.|脱水症状を防ぐためにこまめに水を飲もう。
e6536|She orchestrated a surprise party for her dad.|彼女は父のためにサプライズパーティーを計画した。
e6537|The company has a high staff turnover.|その会社は社員の離職率が高い。
e6538|No language is inherently better than another.|本質的に他より優れた言語はない。
e6539|She spearheaded the campaign to clean the beach.|彼女は浜辺の清掃運動の先頭に立った。
e6540|It would be imprudent to spend all your savings.|貯金を全部使うのは軽率だろう。
e6541|The flood was a calamity for the small town.|その洪水は小さな町にとって大災害だった。
e6542|The weary travelers finally reached the hotel.|疲れた旅行者たちはようやくホテルに着いた。
e6543|He fumbled in his pocket for the key.|彼はポケットの中を手探りして鍵を探した。
e6544|The report contained prejudicial information about him.|その報告書には彼に不利な情報が含まれていた。
e6545|We all chipped in to buy Mom a gift.|みんなでお金を出し合って母に贈り物を買った。
e6546|Music is an important facet of her life.|音楽は彼女の人生の大切な側面だ。
e6547|The police made an exhaustive search of the area.|警察はその地域を徹底的に捜索した。
e6548|The baby wailed all night long.|赤ちゃんは一晩中泣き叫んだ。
e6549|I couldn't resist the temptation of chocolate cake.|チョコレートケーキの誘惑に勝てなかった。
e6550|Don't mention his weight; he's touchy about it.|彼の体重には触れないで。気にしているから。
e6551|The festival has a great lineup this year.|今年のフェスティバルは顔ぶれがすばらしい。
e6552|The company will reimburse your travel expenses.|会社が交通費を払い戻してくれる。
e6553|Young children are susceptible to colds.|幼い子どもは風邪をひきやすい。
e6554|He tried to bribe the official with money.|彼はお金で役人を買収しようとした。
e6555|The salvage of the sunken ship took months.|沈没船の引き揚げには何か月もかかった。
e6556|The charity helps impoverished families in the area.|その慈善団体は地域の貧しい家庭を助けている。
e6557|She flatly refused to change her mind.|彼女はきっぱりと考えを変えるのを拒んだ。
e6558|The new tax caused public outrage.|新しい税は国民の激しい怒りを引き起こした。
e6559|The storm unleashed heavy rain on the city.|嵐は町に激しい雨をもたらした。
e6560|Open the window; it's stuffy in here.|窓を開けて。ここは息苦しいよ。
e6561|Don't be so uptight; it's just a game.|そんなに緊張しないで。ただのゲームだよ。
e6562|The company has an audit every year.|その会社は毎年会計監査を受ける。
e6563|Smoking is not allowed on the premises.|敷地内での喫煙は禁止されている。
e6564|He sat in quiet contemplation by the lake.|彼は湖のほとりで静かに物思いにふけった。
e6565|The smell of rotten eggs is repulsive.|腐った卵のにおいはひどく不快だ。
e6566|Japan's constitution was written in 1946.|日本国憲法は1946年に書かれた。
e6567|The enactment of the new law took two years.|新しい法律の制定には2年かかった。
e6568|The song evokes memories of my childhood.|その歌は子どもの頃の記憶を呼び起こす。
e6569|You will reap the rewards of your hard work.|努力の成果を手にするだろう。
e6570|Her fear of spiders is completely irrational.|彼女のクモ嫌いはまったく理屈に合わない。
e6571|This test is a benchmark for student progress.|このテストは生徒の進歩を測る基準だ。
e6572|After the hike, we were absolutely ravenous.|ハイキングの後、私たちは腹ぺこだった。
e6573|She is a very competent nurse.|彼女はとても有能な看護師だ。
e6574|The injury necessitated a long stay in hospital.|そのけがで長期の入院が必要になった。
e6575|Good health is a prerequisite for this job.|健康はこの仕事の前提条件だ。
e6576|Disgruntled customers complained about the long wait.|不満を抱いた客が長い待ち時間に苦情を言った。
e6577|There is a discrepancy between the two reports.|二つの報告書の間には食い違いがある。
e6578|We need a plan for every contingency.|あらゆる不測の事態に備えた計画が必要だ。
e6579|All living things are mortal.|すべての生き物は死すべき運命にある。
e6580|The museum held a retrospective exhibition of his work.|美術館は彼の作品の回顧展を開いた。
e6581|Her speech resonated with many young people.|彼女のスピーチは多くの若者の心に響いた。
e6582|Money is not the only yardstick of success.|お金だけが成功の尺度ではない。
e6583|Tom and Ann are ten and twelve, respectively.|トムとアンはそれぞれ10歳と12歳だ。
e6584|There was a public outcry over the price increase.|値上げに対して世間から激しい抗議が起きた。
e6585|He felt resentful about being left out.|彼は仲間外れにされたことに憤慨した。
e6586|She is a dedicated teacher who loves her students.|彼女は生徒を愛する献身的な先生だ。
e6587|The difficult question rattled the speaker.|その難しい質問は話し手を動揺させた。
e6588|The prevalence of smartphones has changed our lives.|スマートフォンの普及は私たちの生活を変えた。
e6589|We expended a lot of energy on the project.|私たちはその企画に多くの労力を費やした。
e6590|The airport has stringent security checks.|その空港は厳しい保安検査を行っている。
e6591|The police are trying to ascertain the facts.|警察は事実を確かめようとしている。
e6592|The prize money was a nice windfall.|その賞金はうれしい臨時収入だった。
e6593|His obsession with video games worries his parents.|彼のゲームへの執着は両親を心配させている。
e6594|The boat crossed the turbulent sea.|船は荒れ狂う海を渡った。
e6595|He is arguably the best player on the team.|彼はほぼ間違いなくチームで一番の選手だ。
e6596|The news caused her great distress.|その知らせは彼女をひどく苦しめた。
e6597|He was arrested for impersonating a police officer.|彼は警察官になりすました罪で逮捕された。
e6598|We hauled the heavy boxes up the stairs.|私たちは重い箱を階段の上へ運び上げた。
e6599|The parents made a plea for help on TV.|両親はテレビで助けを求めて訴えた。
e6600|Critics derided the film as boring.|批評家たちはその映画を退屈だとあざけった。
e6601|The article was biased against young people.|その記事は若者に対して偏っていた。
e6602|There were no complications after the surgery.|手術後に合併症はなかった。
e6603|I have a recurring dream about flying.|私は空を飛ぶ夢を繰り返し見る。
e6604|He abstained from eating sweets for a month.|彼は1か月間甘いものを控えた。
e6605|The knights swore allegiance to the king.|騎士たちは王に忠誠を誓った。
e6606|The carpet has an intricate pattern.|そのじゅうたんには複雑な模様がある。
e6607|Let's hold off on buying a car until spring.|車を買うのは春まで延期しよう。
e6608|My grandfather suffers from chronic back pain.|祖父は慢性の腰痛に苦しんでいる。
e6609|The snowstorm disrupted train services.|吹雪で電車の運行が乱れた。
e6610|The consolidation of the two banks took a year.|二つの銀行の統合には1年かかった。
e6611|The cat pounced on the toy mouse.|猫はおもちゃのネズミに飛びかかった。
e6612|The food was mediocre but the view was great.|料理は平凡だったが景色はすばらしかった。
e6613|Tokyo is a huge, busy metropolis.|東京は巨大でにぎやかな大都市だ。
e6614|She embarked on a new career as a writer.|彼女は作家として新たな仕事に乗り出した。
e6615|The heavy snow rendered the road useless.|大雪で道路は使えなくなった。
e6616|It's hard to reconcile work and family life.|仕事と家庭生活を両立させるのは難しい。
e6617|The detainees were released after two days.|拘留者は2日後に釈放された。
e6618|Scientists should question dogma, not simply accept it.|科学者は定説をただ受け入れず疑うべきだ。
e6619|Parents exert a strong influence on their children.|親は子どもに強い影響を及ぼす。
e6620|Demand for the toy outstripped supply.|そのおもちゃの需要が供給を上回った。
e6621|The country is planning electoral reform.|その国は選挙制度の改革を計画している。
e6622|The soldiers found explosives hidden in the building.|兵士たちは建物に隠された爆発物を見つけた。
e6623|A multitude of birds flew over the lake.|たくさんの鳥が湖の上を飛んだ。
e6624|He took a part-time job to augment his income.|彼は収入を増やすためにアルバイトを始めた。
e6625|She was adamant that she had locked the door.|彼女はドアに鍵をかけたと言い張った。
e6626|The decision caused discord within the family.|その決定は家族の中に不和を生んだ。
e6627|I presume you've already eaten dinner.|もう夕食は済ませたんでしょうね。
e6628|An expert appraised the old painting.|専門家がその古い絵を鑑定した。
e6629|She is adept at solving puzzles.|彼女はパズルを解くのが上手だ。
e6630|Too much coffee can cause insomnia.|コーヒーの飲みすぎは不眠症の原因になる。
e6631|Don't jeopardize your health by skipping sleep.|睡眠を削って健康を危険にさらしてはいけない。
e6632|His dismissal from the company surprised everyone.|彼の会社からの解雇は皆を驚かせた。
e6633|We had no recourse but to call the police.|警察を呼ぶしかなかった。
e6634|The old problem resurfaced after a few years.|その古い問題は数年後に再浮上した。
e6635|Some people questioned the legitimacy of the election.|その選挙の正当性を疑う人もいた。
e6636|The bus came to an abrupt stop.|バスは急停車した。
e6637|Please don't mumble; speak clearly.|もごもご言わないで、はっきり話して。
e6638|Her photo was displayed prominently in the hall.|彼女の写真はホールに目立つように飾られていた。
e6639|Fireworks illuminated the night sky.|花火が夜空を照らした。
e6640|Grandpa told a funny anecdote about his school days.|祖父は学生時代の面白い逸話を話した。
e6641|People with mental illness should not be stigmatized.|心の病を持つ人に汚名を着せてはならない。
e6642|Check the nutritional information on the package.|包装の栄養成分表示を確認しなさい。
e6643|The man was deported for working illegally.|その男性は不法就労で国外追放された。
e6644|The book profoundly changed the way I think.|その本は私の考え方を大きく変えた。
e6645|The lake was placid in the early morning.|早朝の湖は穏やかだった。
e6646|Please don't use offensive language.|不快な言葉を使わないでください。
e6647|A big dog terrorized the neighborhood cats.|大きな犬が近所の猫たちをおびえさせた。
e6648|A wealthy benefactor paid for the new library.|裕福な後援者が新しい図書館の費用を出した。
e6649|There is growing discontent among the workers.|労働者の間で不満が高まっている。
e6650|The decision was unanimous.|その決定は満場一致だった。
e6651|I'm so indecisive when ordering at restaurants.|私はレストランで注文するときとても優柔不断だ。
e6652|They made a perilous journey across the mountains.|彼らは山を越える危険な旅をした。
e6653|The free gift is an inducement to buy more.|無料の景品はもっと買わせるための誘因だ。
e6654|The committee will convene next Monday.|委員会は来週月曜日に開かれる。
e6655|The goalkeeper was the savior of the match.|ゴールキーパーがその試合の救世主だった。
e6656|The doctors performed exploratory surgery.|医師たちは検査のための手術を行った。
e6657|The town needs economic rejuvenation.|その町には経済の再生が必要だ。
e6658|The market is saturated with similar phones.|市場は似たような携帯電話であふれている。
e6659|My little brother idolizes famous soccer players.|弟は有名なサッカー選手に心酔している。
e6660|Is it feasible to finish by Friday?|金曜日までに終えるのは可能ですか。
e6661|A quiet room is conducive to studying.|静かな部屋は勉強の助けになる。
e6662|An artist drew a caricature of my dad.|画家が父の似顔絵を描いた。
e6663|She vehemently denied the rumor.|彼女はそのうわさを激しく否定した。
e6664|The country took retaliatory measures against the sanctions.|その国は制裁に対して報復措置をとった。
e6665|Our new model outperforms all its competitors.|当社の新モデルはすべての競合製品を上回る。
e6666|The rain compelled us to stay indoors.|雨のせいで私たちは屋内にいるしかなかった。
e6667|The movie is about a dysfunctional family.|その映画は機能不全の家族を描いている。
e6668|A good boss listens to her subordinates.|良い上司は部下の話に耳を傾ける。
e6669|The attack drew condemnation from around the world.|その攻撃は世界中から非難を浴びた。
e6670|The teacher confiscated my phone during class.|授業中に先生に携帯電話を取り上げられた。
e6671|Everyone was in a somber mood after the news.|その知らせの後、皆が沈んだ気分だった。
e6672|Climbing Everest is an amazing feat.|エベレスト登頂はすばらしい偉業だ。
e6673|Trust is an intangible but valuable asset.|信頼は目に見えないが価値ある財産だ。
e6674|She has very refined taste in music.|彼女は音楽にとても洗練された趣味を持っている。
e6675|There is a tradeoff between speed and quality.|速さと質の間には兼ね合いがある。
e6676|A statue commemorates the town's founder.|銅像が町の創設者を記念している。
e6677|I spent the day on mundane tasks like laundry.|洗濯のような平凡な用事で一日を過ごした。
e6678|Social exclusion can harm a child's development.|社会的な排除は子どもの成長を害しうる。
e6679|Time constraints forced us to cut the speech short.|時間の制約でスピーチを短くせざるを得なかった。
e6680|Please make your explanation comprehensible to children.|説明を子どもにもわかるようにしてください。
e6681|My doctor gave me a referral to a specialist.|かかりつけ医が専門医を紹介してくれた。
e6682|Our trip is contingent on the weather.|私たちの旅行は天気次第だ。
e6683|The waves have eroded the cliffs over time.|波が長い時間をかけて崖を浸食してきた。
e6684|This custom still prevails in rural areas.|この習慣は今も田舎で広く行われている。
e6685|Vitamin D deficiency can weaken your bones.|ビタミンD不足は骨を弱くすることがある。
e6686|My grandmother lived a frugal life.|祖母は倹約的な生活を送った。
e6687|The child persistently asked for a new toy.|その子はしつこく新しいおもちゃをねだった。
e6688|The town mobilized volunteers to clean up after the flood.|町は洪水の後片付けにボランティアを動員した。
e6689|There is a correlation between sleep and grades.|睡眠と成績には相関関係がある。
e6690|These outmoded rules should be changed.|これらの時代遅れの規則は変えるべきだ。
e6691|He sued the magazine for a slanderous article.|彼は中傷的な記事を理由に雑誌を訴えた。
e6692|The painting turned out to be a forgery.|その絵は偽物だとわかった。
e6693|The final match was absolutely riveting.|決勝戦は本当に目が離せなかった。
e6694|The government decided to privatize the railways.|政府は鉄道を民営化することに決めた。
e6695|Many jobs are now in jeopardy.|多くの仕事が今、危機にさらされている。
e6696|I had to restrain myself from laughing.|笑いをこらえなければならなかった。
e6697|My birthday coincides with the school festival this year.|今年は私の誕生日が文化祭と重なる。
e6698|Her diet is deficient in iron.|彼女の食事は鉄分が不足している。
e6699|Both sides made concessions to reach an agreement.|合意に達するため双方が譲歩した。
e6700|The memory of the accident still haunts him.|事故の記憶が今も彼に付きまとっている。
e6701|Pride was the cause of his downfall.|傲慢さが彼の没落の原因だった。
e6702|A stately old house stands on the hill.|丘の上に堂々とした古い屋敷が建っている。
e6703|He bought a franchise for a famous burger chain.|彼は有名なハンバーガーチェーンの営業権を買った。
e6704|Her answer was an emphatic no.|彼女の答えはきっぱりとした「いいえ」だった。
e6705|A helicopter hovered above the building.|ヘリコプターが建物の上空に停止していた。
e6706|We signed a two-year lease on the apartment.|私たちはアパートの2年間の賃貸契約に署名した。
e6707|The rain turned the small stream into a torrent.|雨で小川が激しい流れになった。
e6708|There is an imbalance between supply and demand.|需要と供給の間に不均衡がある。
e6709|Parents should instill good manners in their kids.|親は子どもに良いマナーを教え込むべきだ。
e6710|We felt a small tremor early this morning.|今朝早く小さな揺れを感じた。
e6711|All products must conform to safety standards.|すべての製品は安全基準に従わなければならない。
e6712|Riding a roller coaster is exhilarating.|ジェットコースターに乗るのは爽快だ。
e6713|Smartphones are now commonplace among teenagers.|スマートフォンは今や十代の間でありふれたものだ。
e6714|The free toy is just a sales gimmick.|おまけのおもちゃは単なる販売の仕掛けだ。
e6715|There is a divergence of opinion on this issue.|この問題については意見の相違がある。
e6716|The speakers amplify the sound of the guitar.|スピーカーがギターの音を増幅する。
e6717|The proceeds from the concert went to charity.|コンサートの収益は慈善事業に寄付された。
e6718|There is a chasm between rich and poor.|富める者と貧しい者の間には大きな隔たりがある。
e6719|The strike paralyzed the city's transport system.|ストライキで町の交通がまひした。
e6720|She felt self-conscious about her new haircut.|彼女は新しい髪型が人にどう見られるか気になった。
e6721|I caught a fleeting glimpse of the deer.|鹿の姿がちらりと見えた。
e6722|The museum offers a fun sensory experience for kids.|その博物館は子どもに楽しい感覚体験を提供する。
e6723|He looked at me with contempt.|彼は軽蔑したように私を見た。
e6724|Marathon runners need great endurance.|マラソン選手にはすぐれた持久力が必要だ。
e6725|The course encompasses history, art, and music.|その講座は歴史、美術、音楽を含んでいる。
e6726|The fiscal year in Japan starts in April.|日本の会計年度は4月に始まる。
e6727|After the accident, he needed months of rehabilitation.|事故の後、彼は何か月ものリハビリが必要だった。
e6728|She was too preoccupied with work to notice me.|彼女は仕事に気を取られて私に気づかなかった。
e6729|The Ming dynasty ruled China for nearly 300 years.|明王朝は300年近く中国を治めた。
e6730|Ironically, the fire station burned down.|皮肉なことに、消防署が全焼した。
e6731|This sweater is made of coarse wool.|このセーターは粗い毛糸でできている。
e6732|Don't drink the contaminated water.|汚染された水を飲んではいけない。
e6733|The strange question perplexed the teacher.|その奇妙な質問は先生を当惑させた。
e6734|His pragmatism helped the team solve problems quickly.|彼の現実主義のおかげでチームは素早く問題を解決した。
e6735|He signed the contract under coercion.|彼は強制されて契約書に署名した。
e6736|He was so tired that his speech became incoherent.|彼はひどく疲れて話が支離滅裂になった。
e6737|The freight train carries goods across the country.|貨物列車が国中に品物を運ぶ。
e6738|You can detach the hood from this jacket.|このジャケットのフードは取り外せる。
e6739|The boxer won the bout in the third round.|そのボクサーは第3ラウンドで試合に勝った。
e6740|The smell of curry permeated the whole house.|カレーのにおいが家中に広がった。
e6741|The cunning fox tricked the crow.|ずる賢いキツネはカラスをだました。
e6742|I keep all my correspondence in this box.|手紙はすべてこの箱に保管している。
e6743|The navy set up a blockade of the port.|海軍は港を封鎖した。
e6744|The storm inflicted serious damage on the town.|嵐は町に深刻な被害を与えた。
e6745|My grandfather still works with great vigor.|祖父は今もとても元気に働いている。
e6746|Nothing grows in this sterile soil.|この不毛の土地では何も育たない。
e6747|He made a crude joke at dinner.|彼は夕食の席で下品な冗談を言った。
e6748|Don't deviate from the plan.|計画から外れないように。
e6749|We need to change our mentality about failure.|失敗についての考え方を変える必要がある。
e6750|The politician made an inflammatory speech.|その政治家は扇動的な演説をした。
e6751|Blue is the predominant color in this painting.|この絵で主な色は青だ。
e6752|Cutting the school budget is a shortsighted decision.|学校の予算削減は近視眼的な決定だ。
e6753|The deputy mayor spoke at the ceremony.|式典で副市長がスピーチをした。
e6754|The argument quickly escalated into a fight.|口論はすぐにけんかへと発展した。
e6755|I try to avoid confrontation with my neighbors.|私は隣人との対立を避けるようにしている。
e6756|The group was taken over by extremists.|その団体は過激派に乗っ取られた。
e6757|You can reclaim your bag at the lost and found.|かばんは遺失物係で取り戻せる。
e6758|Every sport has some inherent risks.|どんなスポーツにも本来の危険がある。
e6759|This medicine will alleviate the pain.|この薬は痛みを和らげるだろう。
e6760|The building has great aesthetic appeal.|その建物はとても美的な魅力がある。
e6761|She felt some apprehension before her first flight.|初めての飛行の前、彼女は少し不安を感じた。
e6762|The argument caused a rift between the two friends.|その口論で二人の友人の間に亀裂が生じた。
e6763|This game is really addictive.|このゲームは本当にやみつきになる。
e6764|Please do not trespass on private land.|私有地に立ち入らないでください。
e6765|We went to the beach on a whim.|私たちは思いつきで海へ行った。
e6766|Check the serial number on the back.|裏側の製造番号を確認して。
e6767|A feeling of gloom filled the room.|部屋に重苦しい雰囲気が漂った。
e6768|The earthquake had a devastating effect on the region.|その地震は地域に壊滅的な影響を与えた。
e6769|These stones are remnants of an old castle.|これらの石は古い城の名残だ。
e6770|The two companies reached an amicable agreement.|両社は円満に合意に達した。
e6771|You will incur a fee if you cancel late.|遅れてキャンセルすると手数料がかかる。
e6772|The books were stacked in a haphazard way.|本は無造作に積み上げられていた。
e6773|The mechanic checked the wheel alignment.|整備士は車輪の位置調整を確認した。
e6774|I have enclosed a photo with this letter.|この手紙に写真を同封しました。
e6775|The prisoner was kept in solitary confinement.|その囚人は独房に監禁された。
e6776|Please don't trample the flowers.|花を踏みつけないでください。
e6777|He became vindictive after losing the election.|彼は選挙に負けてから執念深くなった。
e6778|The decision had serious repercussions for the town.|その決定は町に深刻な影響を与えた。
e6779|I came down with a cold last week.|先週、風邪をひいた。
e6780|Please send the invoice by the end of the month.|月末までに請求書を送ってください。
e6781|The company was caught falsifying its sales data.|その会社は売上データの改ざんが発覚した。
e6782|She transcribed the interview into a document.|彼女はインタビューを文書に書き起こした。
e6783|The children played near a derelict factory.|子どもたちは荒れ果てた工場の近くで遊んだ。
e6784|That is a simplistic answer to a complex problem.|それは複雑な問題に対する単純すぎる答えだ。
e6785|Copying music online can be copyright infringement.|ネット上で音楽をコピーするのは著作権侵害になりうる。
e6786|Rescuers searched through the rubble for survivors.|救助隊はがれきの中で生存者を探した。
e6787|The country made a unilateral decision to leave.|その国は一方的に離脱を決めた。
e6788|The new coach gave the team fresh impetus.|新しいコーチがチームに新たな弾みを与えた。
e6789|We enlisted the help of our neighbors.|私たちは近所の人に協力を求めた。
e6790|There is no justification for violence.|暴力を正当化する理由はない。
e6791|We scoured the house for my lost ring.|なくした指輪を家中くまなく探した。
e6792|Our host was very gracious and kind.|私たちを迎えてくれた人はとても丁寧で親切だった。
e6793|The noisy neighbors are a real nuisance.|騒がしい隣人は本当に迷惑だ。
e6794|Traffic came to a standstill because of the snow.|雪で交通が完全に止まった。
e6795|His story sounds a bit far-fetched.|彼の話は少し無理があるように聞こえる。
e6796|He disregarded the doctor's advice.|彼は医者の忠告を無視した。
e6797|After the divorce, the mother got custody of the kids.|離婚後、母親が子どもたちの親権を得た。
e6798|He wore a conspicuous red hat.|彼は目立つ赤い帽子をかぶっていた。
e6799|She is the embodiment of kindness.|彼女は優しさそのものだ。
e6800|The ball rebounded off the wall.|ボールは壁に当たって跳ね返った。
e6801|The street was covered with debris after the storm.|嵐の後、通りはがれきで覆われていた。
e6802|The company touts its new phone as the best.|その会社は新しい携帯電話を最高だと売り込んでいる。
e6803|Stealing from the poor is immoral.|貧しい人から盗むのは不道徳だ。
e6804|Vigorous exercise is good for your heart.|激しい運動は心臓に良い。
e6805|The magician captivated the audience.|手品師は観客を魅了した。
e6806|There is a lag between the video and the sound.|映像と音の間にずれがある。
e6807|The actor wrote a memoir about his childhood.|その俳優は子ども時代の回顧録を書いた。
e6808|Police escorted the singer to her car.|警察が歌手を車まで護衛した。
e6809|The icy roads were treacherous this morning.|今朝の凍った道路は危険だった。
e6810|The market will soon reach equilibrium.|市場はまもなく均衡に達するだろう。
e6811|It's mean to mock someone's accent.|人のなまりをからかうのは意地悪だ。
e6812|His naivety made him easy to trick.|彼は世間知らずなのでだまされやすかった。
e6813|His father threatened to disown him.|彼の父親は彼を勘当すると脅した。
e6814|Don't skimp on sleep before an exam.|試験の前に睡眠をけちってはいけない。
e6815|His overbearing boss never listens to anyone.|彼の横柄な上司は誰の話も聞かない。
e6816|I'm skeptical about diets that promise quick results.|すぐに効果が出るというダイエットには懐疑的だ。
e6817|The two parties formed a coalition government.|二つの政党は連立政権を作った。
e6818|The unfair decision enraged the fans.|不公平な判定はファンを激怒させた。
e6819|It's no exaggeration to say she saved my life.|彼女が私の命を救ったと言っても過言ではない。
e6820|My grandparents are very indulgent with us.|祖父母は私たちにとても甘い。
e6821|Her success is a testament to her hard work.|彼女の成功は努力の証しだ。
e6822|Someone defaced the wall with graffiti.|誰かが落書きで壁を汚した。
e6823|Her voice faltered as she began her speech.|スピーチを始めたとき彼女の声は震えた。
e6824|He is a cultivated man who loves art and books.|彼は芸術と本を愛する教養ある人だ。
e6825|She was resolute in her decision to study abroad.|彼女は留学するという決意が固かった。
e6826|He shook my hand vigorously.|彼は私の手を力強く握った。
e6827|She gave an eloquent speech at graduation.|彼女は卒業式で雄弁なスピーチをした。
e6828|Strict adherence to the rules is required.|規則を厳しく守ることが求められる。
e6829|The detective finally unraveled the mystery.|探偵はついにその謎を解いた。
e6830|The prices at that shop are outrageous.|あの店の値段はとんでもない。
e6831|You must sign a waiver before skydiving.|スカイダイビングの前に権利放棄書に署名しなければならない。
e6832|The uprising was quickly crushed by the army.|その反乱は軍によってすぐに鎮圧された。
e6833|The report helped dispel fears about the new vaccine.|その報告は新ワクチンへの不安を払拭するのに役立った。
e6834|The smell of smoke lingered in the room.|煙のにおいが部屋になかなか消えなかった。
e6835|The new schedule is problematic for working parents.|新しい日程は働く親にとって問題がある。
e6836|The government is reviewing its system of taxation.|政府は税制を見直している。
e6837|Her laughter was contagious.|彼女の笑いはまわりにうつった。
e6838|The bomb threat turned out to be a hoax.|爆破予告はいたずらだとわかった。
e6839|The company has a very hierarchical structure.|その会社はとても階層的な組織だ。
e6840|The students left the building in an orderly way.|生徒たちは整然と建物から出た。
e6841|A small budget constrains what we can do.|少ない予算が私たちにできることを制約している。
e6842|I feel a strong kinship with my classmates.|私はクラスメートに強い親近感を抱いている。
e6843|The critic wrote a scathing review of the film.|批評家はその映画について痛烈な批評を書いた。
e6844|The lake in the desert was only a mirage.|砂漠の湖は蜃気楼にすぎなかった。
e6845|The accident was a sobering reminder of the danger.|その事故は危険をはっと思い出させるものだった。
e6846|The tired runner staggered across the finish line.|疲れたランナーはよろめきながらゴールした。
e6847|Remove any redundant words from your essay.|作文から余分な言葉を削りなさい。
e6848|I bought a box of assorted chocolates.|チョコレートの詰め合わせを1箱買った。
e6849|The website has testimonials from happy customers.|そのサイトには満足した客の推薦の声が載っている。
e6850|What's all this commotion in the hallway?|廊下のこの騒ぎはいったい何？
e6851|I loathe getting up early on weekends.|週末に早起きするのが大嫌いだ。
e6852|We used a box as a makeshift table.|箱を間に合わせのテーブルとして使った。
e6853|Please explain the rules with more clarity.|規則をもっとはっきり説明してください。
e6854|Fresh fish is plentiful in this town.|この町には新鮮な魚が豊富にある。
e6855|There was open hostility between the two teams.|二つのチームの間にはあからさまな敵意があった。
e6856|The company tried to play down the problem.|会社はその問題を大したことではないように見せようとした。
e6857|The scientist refuted the old theory.|その科学者は古い理論を論破した。
e6858|The kids showed great ingenuity in building the robot.|子どもたちはロボット作りで素晴らしい創意工夫を見せた。
e6859|All factories must be in compliance with the law.|すべての工場は法律を遵守しなければならない。
e6860|Let's not argue over petty things.|ささいなことで言い争うのはやめよう。
e6861|Learning is intrinsically rewarding.|学ぶことは本質的にやりがいがある。
e6862|He deflected the question with a joke.|彼は冗談でその質問をかわした。
e6863|The government plans to legislate against plastic bags.|政府はレジ袋を規制する法律を作る予定だ。
e6864|The two companies are in litigation over the patent.|両社は特許をめぐって訴訟中だ。
e6865|Wearing a coat in summer seems absurd.|夏にコートを着るのはばかげているように思える。
e6866|The statute was passed by parliament last year.|その法令は昨年議会で可決された。
e6867|It took time for the family to assimilate into the new culture.|その家族が新しい文化に溶け込むには時間がかかった。
e6868|The conversion of the barn into a house took a year.|納屋を家に改装するのに1年かかった。
e6869|The rules seemed arbitrary and unfair.|その規則は恣意的で不公平に思えた。
e6870|Juvenile crime has decreased in recent years.|少年犯罪は近年減っている。
e6871|The store is having a clearance sale this weekend.|その店は今週末、在庫一掃セールを行う。
e6872|Voter turnout was low in this election.|今回の選挙は投票率が低かった。
e6873|I miss my carefree childhood days.|気楽だった子ども時代が懐かしい。
e6874|The new law was enacted last April.|新しい法律は昨年4月に制定された。
e6875|I'm too squeamish to watch medical dramas.|私は気が弱くて医療ドラマを見られない。
e6876|The offer comes with one caveat: you must pay today.|その申し出には但し書きが一つある。今日払うことだ。
e6877|The debate became very partisan.|その議論は非常に党派的になった。
e6878|Firefighters quickly extinguished the fire.|消防士はすぐに火を消した。
e6879|The Diet is Japan's legislative body.|国会は日本の立法機関だ。
e6880|She made an elaborate cake for the party.|彼女はパーティーのために手の込んだケーキを作った。
e6881|The villain in this movie is very scary.|この映画の悪役はとても怖い。
e6882|Can you condense your report into one page?|報告書を1ページに要約できますか。
e6883|Reporters bombarded the star with questions.|記者たちはスターに質問を浴びせた。
e6884|A bystander called an ambulance.|居合わせた人が救急車を呼んだ。
e6885|He seemed detached from what was happening around him.|彼は周りで起きていることに無関心なようだった。
e6886|The manager was fired for incompetence.|その部長は無能を理由に解雇された。
e6887|Our team won for the third successive year.|私たちのチームは3年連続で優勝した。
e6888|Rice is a staple food in Japan.|米は日本の主食だ。
e6889|Autonomous cars may soon be common.|自動運転車はまもなく一般的になるかもしれない。
e6890|She maneuvered the car into a tight space.|彼女は狭い場所に車を巧みに入れた。
e6891|The boy pleaded with his mom for a puppy.|少年は母親に子犬をねだって懇願した。
e6892|I have no recollection of meeting him.|彼に会った記憶がまったくない。
e6893|The festival helped revitalize the small town.|その祭りは小さな町の活性化に役立った。
e6894|The government granted amnesty to political prisoners.|政府は政治犯に恩赦を与えた。
e6895|The two countries signed a bilateral trade agreement.|両国は二国間貿易協定に署名した。
e6896|I dread going to the dentist.|歯医者に行くのがとても怖い。
e6897|We are studying the feasibility of the plan.|その計画の実現可能性を調べている。
e6898|We visited the Imperial Palace in Tokyo.|私たちは東京の皇居を訪れた。
e6899|He dodged the ball just in time.|彼はぎりぎりでボールをよけた。
e6900|The two brothers had a tearful reconciliation.|兄弟は涙ながらに和解した。
e6901|Taxes are deducted from your salary.|税金は給料から差し引かれる。
e6902|The city sprawls for miles in every direction.|その都市は四方に何マイルも無秩序に広がっている。
e6903|My aunt bought a condominium near the station.|おばは駅の近くに分譲マンションを買った。
e6904|This plan is only a stopgap.|この計画は一時しのぎにすぎない。
e6905|The living conditions in the camp were deplorable.|キャンプの生活環境は嘆かわしいものだった。
e6906|He felt a sense of inadequacy at his new job.|彼は新しい職場で力不足を感じた。
e6907|She has aspirations to become a doctor.|彼女は医者になるという大志を抱いている。
e6908|The king banished the traitor from the country.|王は裏切り者を国から追放した。
e6909|All your hard work will pay off someday.|君の努力はいつか報われるだろう。
e6910|The president affirmed his support for the plan.|大統領はその計画への支持を明言した。
e6911|He humiliated me in front of my friends.|彼は友達の前で私に恥をかかせた。
e6912|A distinguished scientist gave a lecture at our school.|著名な科学者が私たちの学校で講演した。
e6913|All the characters in this story are fictitious.|この物語の登場人物はすべて架空のものだ。
e6914|The heavy rain caused inundation of the farmland.|大雨で農地が浸水した。
e6915|The game helps kids tap into their creativity.|そのゲームは子どもが創造力を生かす助けになる。
e6916|He tried to evade the question.|彼はその質問をはぐらかそうとした。
e6917|My cat is very selective about her food.|うちの猫は食べ物をとても選ぶ。
e6918|Wash the vegetables to remove any chemical residue.|化学物質の残留物を取り除くために野菜を洗いなさい。
e6919|She gave a categorical denial.|彼女はきっぱりと否定した。
e6920|The empire annexed the small neighboring country.|その帝国は隣の小国を併合した。
e6921|The typhoon devastated the coastal towns.|台風は海沿いの町を壊滅させた。
e6922|What is your stance on school uniforms?|制服についてあなたの立場はどうですか。
e6923|Japan holds a census every five years.|日本では5年ごとに国勢調査が行われる。
e6924|The moon is the closest celestial body to Earth.|月は地球に最も近い天体だ。
e6925|Dark clouds are often a precursor of rain.|黒い雲はしばしば雨の前触れだ。
e6926|The government censors news about the war.|政府は戦争に関するニュースを検閲している。
e6927|The painting shows a peaceful pastoral scene.|その絵は穏やかな田園風景を描いている。
e6928|She has a flair for languages.|彼女には語学の才能がある。
e6929|The omission of his name from the list was a mistake.|名簿から彼の名前が抜けていたのは手違いだった。
e6930|My son is a picky eater.|息子は好き嫌いが多い。
e6931|The service at the hotel was subpar.|そのホテルのサービスは標準以下だった。
e6932|The climbers slowly ascended the mountain.|登山者たちはゆっくりと山を登った。
e6933|The embryo grows inside the egg.|胚は卵の中で育つ。
e6934|The children were full of vitality.|子どもたちは活力にあふれていた。
e6935|The allure of city life attracts many young people.|都会生活の魅力は多くの若者を引きつける。
e6936|The school faces a budget shortfall this year.|学校は今年、予算不足に直面している。
e6937|There was a momentary silence in the room.|部屋に一瞬の沈黙があった。
e6938|Plants synthesize sugar from sunlight and water.|植物は日光と水から糖を合成する。
e6939|He adamantly refused to apologize.|彼は頑として謝ることを拒んだ。
e6940|The promised pay raise never materialized.|約束された昇給は結局実現しなかった。
e6941|Convenience stores are ubiquitous in Japan.|日本ではコンビニがどこにでもある。
e6942|His angry outburst surprised everyone.|彼が怒りを爆発させたことに皆が驚いた。
e6943|You are liable for any damage to the car.|車への損害についてはあなたに責任がある。
e6944|This cereal is fortified with vitamins.|このシリアルはビタミンが強化されている。
e6945|She has a knack for making people laugh.|彼女には人を笑わせるこつがある。
e6946|The museum shows the culture of indigenous people.|その博物館は先住民の文化を紹介している。
e6947|Your advice was invaluable to me.|あなたの助言は私にとって非常に貴重だった。
e6948|The newspaper distorted the facts.|その新聞は事実をゆがめた。
e6949|The road diverges at the bottom of the hill.|道は丘のふもとで分岐している。
e6950|The restaurant has a wealthy clientele.|そのレストランには裕福な常連客がいる。
e6951|The mayor made a pledge to build a new park.|市長は新しい公園を作ると公約した。
e6952|The cost of the trip was prohibitive.|その旅行の費用は手が出ないほど高かった。
e6953|Sugar is soluble in water.|砂糖は水に溶ける。
e6954|The new leader purged his rivals from the party.|新しい指導者はライバルを党から一掃した。
e6955|Our team is a strong contender for the title.|私たちのチームは優勝の有力候補だ。
e6956|The team gave a lackluster performance.|チームは精彩のないプレーをした。
e6957|We opted for the cheaper hotel.|私たちは安い方のホテルを選んだ。
e6958|Many countries imposed sanctions on the regime.|多くの国がその政権に制裁を科した。
e6959|The ceremony will commence at ten o'clock.|式典は10時に開始される。
e6960|She is recuperating from the flu at home.|彼女は家でインフルエンザから回復しつつある。
e6961|It was a thought-provoking documentary.|それは考えさせられるドキュメンタリーだった。
e6962|Is it permissible to bring food into the museum?|博物館に食べ物を持ち込んでもいいですか。
e6963|Walking improves blood circulation.|歩くと血行が良くなる。
e6964|Students may get an exemption from the fee.|学生は料金が免除されることがある。
e6965|The emergence of the internet changed the world.|インターネットの出現は世界を変えた。
e6966|We incorporated your ideas into the plan.|あなたのアイデアを計画に取り入れた。
e6967|The fans chanted the team's name.|ファンはチーム名を繰り返し叫んだ。
e6968|Your effort is commendable.|あなたの努力は称賛に値する。
e6969|The earthquake left terrible devastation behind.|地震はひどい荒廃を残した。
e6970|He told us about his harrowing experience at sea.|彼は海での恐ろしい体験を語ってくれた。
e6971|Snow is a rarity in this part of the country.|この地方では雪は珍しい。
e6972|The men conspired to rob the bank.|男たちは銀行強盗を共謀した。
e6973|I'm dubious about his story.|彼の話は疑わしいと思う。
e6974|Is this a legitimate business?|これは合法的な商売ですか。
e6975|The teams were chosen arbitrarily.|チームは任意に選ばれた。
e6976|We insulated the attic to keep the house warm.|家を暖かく保つため屋根裏を断熱した。
e6977|The ascent to the top took five hours.|頂上までの登りに5時間かかった。
e6978|There was vehement opposition to the plan.|その計画には激しい反対があった。
e6979|His argument was completely illogical.|彼の主張はまったく筋が通っていなかった。
e6980|She is honing her skills as a pianist.|彼女はピアニストとしての腕を磨いている。
e6981|Cows and rabbits are herbivores.|牛やウサギは草食動物だ。
e6982|His driver's license was revoked.|彼の運転免許は取り消された。
e6983|What a pathetic excuse!|なんて情けない言い訳だ。
e6984|She was drawn to the glamour of Hollywood.|彼女はハリウッドの華やかさに引かれた。
e6985|The broken windows were caused by vandalism.|窓が割れたのは破壊行為によるものだった。
e6986|The prince is the heir to the throne.|王子は王位継承者だ。
e6987|The bureaucratic process took months.|お役所的な手続きに何か月もかかった。
e6988|Two judges dissented from the decision.|2人の判事がその判決に異議を唱えた。
e6989|The disease wiped out most of the crops.|その病気で作物のほとんどが全滅した。
e6990|Microorganisms are too small to see without a microscope.|微生物は顕微鏡なしでは小さすぎて見えない。
e6991|Strong evidence underpins his theory.|強力な証拠が彼の理論を裏付けている。
e6992|For many, owning a house seems unattainable.|多くの人にとって家を持つことは手の届かない夢に思える。
e6993|She is an articulate speaker.|彼女は自分の考えをはっきり話せる人だ。
e6994|He always brags about his new car.|彼はいつも新しい車を自慢する。
e6995|The excavation uncovered an ancient village.|発掘によって古代の村が見つかった。
e6996|Nobody doubts her competence as a leader.|リーダーとしての彼女の能力を疑う者はいない。
e6997|Some diseases are hereditary.|遺伝性の病気もある。
e6998|The vase was in a precarious position on the shelf.|花瓶は棚の上で危なっかしい位置にあった。
e6999|Being lost in the forest was a terrible ordeal.|森で迷ったことはひどい試練だった。
e7000|The bad news overshadowed the celebration.|悪い知らせが祝いの場に暗い影を落とした。
e7001|He gave a fulsome speech praising his boss.|彼は上司を褒めちぎる大げさなスピーチをした。
e7002|She is endowed with great musical talent.|彼女は素晴らしい音楽の才能に恵まれている。
e7003|The kids snickered when the teacher tripped.|先生がつまずくと子どもたちはくすくす笑った。
e7004|He drank the coffee down to the dregs.|彼はコーヒーをかすまで飲み干した。
e7005|Artists need unfettered freedom to create.|芸術家には束縛されない創作の自由が必要だ。
e7006|Please tone down your language in front of the kids.|子どもの前では言葉づかいを和らげてください。
e7007|She always behaves with perfect propriety.|彼女はいつも申し分なく礼儀正しくふるまう。
e7008|A caterpillar becomes a butterfly through metamorphosis.|イモムシは変態によってチョウになる。
e7009|He looked dejected after losing the match.|試合に負けた後、彼は落胆した様子だった。
e7010|She proffered her hand in greeting.|彼女はあいさつに手を差し出した。
e7011|A fracas broke out outside the stadium.|スタジアムの外で騒動が起きた。
e7012|He replied tersely and hung up the phone.|彼はそっけなく答えて電話を切った。
e7013|His words had a deep resonance with the audience.|彼の言葉は聴衆の心に深く響いた。
e7014|Dictionaries use phonetic symbols to show pronunciation.|辞書は発音を示すのに音声記号を使う。
e7015|The children's edition was heavily bowdlerized.|子ども向けの版は不適切な箇所が大幅に削除されていた。
e7016|Her calm demeanor reassured the patients.|彼女の落ち着いた態度は患者たちを安心させた。
e7017|He looked pallid after the long illness.|長い病気の後、彼は青白く見えた。
e7018|She evinced no interest in the offer.|彼女はその申し出に何の関心も示さなかった。
e7019|Doctors were alarmed by the virulence of the virus.|医師たちはそのウイルスの悪性に驚いた。
e7020|Modern cosmology studies the origin of the universe.|現代の宇宙論は宇宙の起源を研究する。
e7021|The manager spoke in an imperious tone.|部長は傲慢な口調で話した。
e7022|The king bestowed a medal on the soldier.|王はその兵士に勲章を授けた。
e7023|The government promulgated the new law last week.|政府は先週新しい法律を公布した。
e7024|The monks walked quietly in the cloister.|修道士たちは修道院の中を静かに歩いた。
e7025|The volcano has been quiescent for centuries.|その火山は何世紀も活動を休止している。
e7026|He regretted his intemperate remarks at the meeting.|彼は会議での節度のない発言を後悔した。
e7027|The drug binds to receptors in the brain.|その薬は脳の受容体に結合する。
e7028|The hard climb tested the team's mettle.|厳しい登山がチームの気概を試した。
e7029|The movie had too much gratuitous violence.|その映画には不必要な暴力が多すぎた。
e7030|The empire subjugated many smaller nations.|その帝国は多くの小国を征服した。
e7031|He is an ardent supporter of the local team.|彼は地元チームの熱烈なサポーターだ。
e7032|The priest gave a benediction at the end.|司祭は最後に祝福を与えた。
e7033|The baby wriggled out of my arms.|赤ちゃんは身をくねらせて私の腕から抜け出した。
e7034|The old miser never spent a single penny.|そのけちん坊の老人は一銭も使わなかった。
e7035|We live in an increasingly litigious society.|私たちはますます訴訟好きな社会に生きている。
e7036|The rescued dog was weak and emaciated.|救出された犬は弱ってやせ衰えていた。
e7037|The court annulled the contract.|裁判所はその契約を無効にした。
e7038|That is a ludicrous idea.|それはばかげた考えだ。
e7039|They lived in servitude for many years.|彼らは何年も隷属状態で暮らした。
e7040|Scientists recorded strong seismic activity.|科学者たちは強い地震活動を記録した。
e7041|He got involved with some disreputable people.|彼は評判の悪い人たちと関わるようになった。
e7042|My grandmother was a pious woman.|祖母は信心深い女性だった。
e7043|The singer earned the sobriquet the King.|その歌手は「キング」というあだ名を得た。
e7044|A fox was skulking near the henhouse.|キツネが鶏小屋の近くでこそこそしていた。
e7045|Passed away is a euphemism for died.|「亡くなる」は「死ぬ」の婉曲表現だ。
e7046|The linguist studies ancient languages.|その言語学者は古代語を研究している。
e7047|His jokes were rather puerile.|彼の冗談はかなり子どもじみていた。
e7048|He was accused of malingering to avoid work.|彼は仕事を避けるために仮病を使ったと責められた。
e7049|She wrenched the bag from his hand.|彼女は彼の手からかばんをもぎ取った。
e7050|The stone came from a local quarry.|その石は地元の採石場から来た。
e7051|The meeting was perforce postponed.|会議はやむなく延期された。
e7052|He frittered away his savings on games.|彼は貯金をゲームに浪費した。
e7053|An actuary calculates insurance risks.|保険数理士は保険のリスクを計算する。
e7054|A free press is a bulwark of democracy.|自由な報道は民主主義の防壁だ。
e7055|The talks were a prelude to peace.|その会談は平和への前触れだった。
e7056|His name will go down in the annals of science.|彼の名は科学の年代記に残るだろう。
e7057|Smoking has deleterious effects on health.|喫煙は健康に有害な影響を与える。
e7058|The tax rules are truly byzantine.|税の規則は本当に複雑だ。
e7059|The case went to an appellate court.|その事件は上訴裁判所に持ち込まれた。
e7060|The crew jettisoned cargo to lighten the ship.|乗組員は船を軽くするため積み荷を投げ捨てた。
e7061|Perfect happiness is a chimera.|完全な幸福は幻想だ。
e7062|It was a dismal, rainy day.|陰気な雨の日だった。
e7063|His plans were still inchoate.|彼の計画はまだ未発達だった。
e7064|He is a dilettante in art, not an expert.|彼は芸術の専門家ではなく好事家だ。
e7065|She left a cryptic message on my desk.|彼女は私の机に謎めいたメッセージを残した。
e7066|New evidence exculpated the suspect.|新しい証拠が容疑者の無罪を証明した。
e7067|The war left the town in desolation.|戦争はその町を荒廃させた。
e7068|Insofar as I know, he is honest.|私の知る限りでは、彼は正直だ。
e7069|She rummaged in her bag for her keys.|彼女はかぎを探してかばんの中をかき回した。
e7070|The new rules seem draconian to students.|新しい規則は学生には過酷に思える。
e7071|She had no qualms about saying no.|彼女は断ることに何のためらいもなかった。
e7072|The poem describes astral light.|その詩は星の光を描いている。
e7073|The speaker whipped up the crowd's anger.|演説者は群衆の怒りをかき立てた。
e7074|The new policy should ameliorate poverty.|新しい政策は貧困を改善するはずだ。
e7075|They work long hours for a pittance.|彼らはわずかな金のために長時間働く。
e7076|I groped for the light switch in the dark.|暗闇で電気のスイッチを手探りした。
e7077|Only a philistine would call this art boring.|この芸術を退屈と言うのは俗物だけだ。
e7078|Our plans went awry because of the rain.|雨のせいで計画がうまくいかなかった。
e7079|The epicenter was near the coast.|震源地は海岸の近くだった。
e7080|The old library had a fusty smell.|古い図書館はかび臭いにおいがした。
e7081|The small groups coalesced into one movement.|小さな集団が一つの運動へと合体した。
e7082|A small garrison defended the fort.|小さな守備隊がとりでを守った。
e7083|We received a cordial welcome.|私たちは心からの歓迎を受けた。
e7084|The internet ushered in a new era.|インターネットは新しい時代の到来を告げた。
e7085|An elephant's gestation lasts about two years.|ゾウの妊娠期間は約2年続く。
e7086|The film contains strong profanity.|その映画にはひどい悪態が含まれている。
e7087|He gave a sardonic smile.|彼は冷笑的な笑みを浮かべた。
e7088|The law proscribes smoking in public places.|法律は公共の場での喫煙を禁止している。
e7089|Violence is anathema to her.|暴力は彼女にとって忌み嫌われるものだ。
e7090|He wore a flamboyant purple suit.|彼は派手な紫のスーツを着ていた。
e7091|The light bulb's filament glowed brightly.|電球のフィラメントが明るく光った。
e7092|The children ran with unbridled joy.|子どもたちは抑えきれない喜びで走り回った。
e7093|Dad was livid when he saw the broken window.|割れた窓を見て父は激怒した。
e7094|Critics extolled the young pianist.|批評家たちはその若いピアニストを激賞した。
e7095|The verdict was a vindication of her efforts.|その判決は彼女の努力の正当性を立証した。
e7096|She stifled a yawn during the lecture.|彼女は講義中にあくびをこらえた。
e7097|The climber was treated for hypothermia.|その登山者は低体温症の治療を受けた。
e7098|Being late once is a venial fault.|一度の遅刻は許される程度の過ちだ。
e7099|His speech was full of platitudes.|彼のスピーチは陳腐な言葉ばかりだった。
e7100|The professor spoke in a magisterial voice.|教授は威厳のある声で話した。
e7101|Steve was a true innovator in technology.|スティーブは技術の真の革新者だった。
e7102|Some drivers flout the speed limit.|制限速度を無視する運転手もいる。
e7103|She gave me a haughty look.|彼女は私に傲慢な目つきを向けた。
e7104|The crowd grew restive as they waited.|待つうちに群衆は落ち着かなくなった。
e7105|He walks well with his new prosthesis.|彼は新しい義足でうまく歩く。
e7106|Epistemology asks how we know things.|認識論は私たちがどう物事を知るのかを問う。
e7107|The class is a heterogeneous group of students.|そのクラスは多様な学生の集まりだ。
e7108|The new bridge is a boon to local people.|新しい橋は地元の人々にとって恩恵だ。
e7109|Her prescience about the market was amazing.|市場についての彼女の先見の明は驚くべきものだった。
e7110|Teachers often bemoan the lack of funding.|教師たちはよく資金不足を嘆く。
e7111|The bank agreed to underwrite the loan.|銀行はその融資を引き受けることに同意した。
e7112|It was galling to lose to our rivals.|ライバルに負けたのはしゃくにさわった。
e7113|The president faced impeachment.|大統領は弾劾に直面した。
e7114|His face remained impassive during the trial.|裁判の間、彼の顔は無表情のままだった。
e7115|Litter is a blight on our beautiful beaches.|ごみは美しい海岸にとっての害だ。
e7116|The temple dates from antiquity.|その神殿は古代にさかのぼる。
e7117|She ignored her mother's admonition to be careful.|彼女は気をつけるようにという母の戒めを無視した。
e7118|The doctor tried to allay our fears.|医師は私たちの不安を和らげようとした。
e7119|The monk lived an ascetic life.|その僧は禁欲的な生活を送った。
e7120|The boy has an insatiable curiosity.|その少年は飽くことのない好奇心を持っている。
e7121|The fireworks were an amazing spectacle.|花火は素晴らしい光景だった。
e7122|Ontology studies the nature of being.|存在論は存在の本質を研究する。
e7123|The complex map bewildered the tourists.|複雑な地図は観光客を当惑させた。
e7124|Many religions believe in God's omnipotence.|多くの宗教は神の全能を信じている。
e7125|She sang in her own inimitable style.|彼女は自分独自のまねのできないスタイルで歌った。
e7126|He was too complaisant to argue with his boss.|彼は従順すぎて上司と議論できなかった。
e7127|She deprecated the use of violence.|彼女は暴力の行使を非難した。
e7128|The ghost was a figment of his imagination.|その幽霊は彼の想像の産物だった。
e7129|English and German are cognate languages.|英語とドイツ語は同族の言語だ。
e7130|The host was charming and urbane.|主催者は魅力的で洗練されていた。
e7131|The government imposed a levy on imports.|政府は輸入品に課税した。
e7132|Everyone liked him for his affability.|誰もが彼の愛想のよさを好いた。
e7133|They tried to subvert the government.|彼らは政府を転覆させようとした。
e7134|The team suffered an ignominious defeat.|チームは屈辱的な敗北を喫した。
e7135|There was great camaraderie among the players.|選手たちの間には強い仲間意識があった。
e7136|He is abstemious with food and drink.|彼は飲食を節制している。
e7137|He was incarcerated for ten years.|彼は10年間投獄された。
e7138|The thief eluded the police for weeks.|泥棒は何週間も警察の手を逃れた。
e7139|The two nations live in amity.|その2国は友好関係にある。
e7140|The guard was bludgeoned by the robbers.|警備員は強盗にこん棒で殴られた。
e7141|She assiduously practiced the piano every day.|彼女は毎日せっせとピアノを練習した。
e7142|Free gift is a tautology.|「無料の贈り物」は同語反復だ。
e7143|Renaissance humanism valued human learning.|ルネサンスの人文主義は人間の学問を重んじた。
e7144|Church members belong to different denominations.|教会員はさまざまな宗派に属している。
e7145|The newspaper printed lurid details of the crime.|新聞はその犯罪のぞっとする詳細を載せた。
e7146|The tough question flustered the speaker.|難しい質問は話し手をまごつかせた。
e7147|The trip was an unalloyed pleasure.|その旅は純粋な喜びだった。
e7148|The doctor checked her thyroid.|医師は彼女の甲状腺を調べた。
e7149|The school has a strong ethos of kindness.|その学校には思いやりの強い気風がある。
e7150|She is adroit at handling difficult customers.|彼女は難しい客の扱いが巧みだ。
e7151|The old computer was big and cumbersome.|古いコンピューターは大きくて扱いにくかった。
e7152|The policy of appeasement failed.|宥和政策は失敗した。
e7153|He swaggered into the room.|彼は威張って部屋に入ってきた。
e7154|Ambulatory patients can visit the garden.|歩行可能な患者は庭を訪れることができる。
e7155|It is disingenuous to deny knowing him.|彼を知らないと否定するのは不誠実だ。
e7156|His disparagement of her work hurt her.|彼が彼女の仕事をけなしたことは彼女を傷つけた。
e7157|They sang with religious fervor.|彼らは宗教的な熱意を込めて歌った。
e7158|The room was painted a garish pink.|部屋はけばけばしいピンクに塗られていた。
e7159|The party gained ascendancy in the election.|その党は選挙で優勢を得た。
e7160|There was a reverent silence in the temple.|寺の中には敬虔な静けさがあった。
e7161|Grandpa whittled a small bird from wood.|祖父は木から小鳥を削り出した。
e7162|An asteroid passed close to Earth.|小惑星が地球の近くを通過した。
e7163|Her diffidence kept her from speaking up.|自信のなさから彼女は発言できなかった。
e7164|She is conversant with several languages.|彼女はいくつかの言語に精通している。
e7165|He smiled ruefully at his mistake.|彼は自分の失敗に悲しげに笑った。
e7166|Only a bigot would say such a thing.|偏見の強い人だけがそんなことを言うだろう。
e7167|Investors are bearish about the market.|投資家たちは市場に弱気だ。
e7168|The coach harangued the team for an hour.|コーチはチームに1時間熱弁をふるった。
e7169|Fame is often transitory.|名声はしばしば一時的なものだ。
e7170|He was ashamed of his cowardice.|彼は自分の臆病さを恥じた。
e7171|She is the epitome of kindness.|彼女は優しさの典型だ。
e7172|He is punctilious about being on time.|彼は時間厳守について几帳面だ。
e7173|They are three months in arrears with the rent.|彼らは家賃を3か月滞納している。
e7174|The editor excised several pages.|編集者は数ページを削除した。
e7175|He met his erstwhile friend at the station.|彼は駅でかつての友人に会った。
e7176|The play's denouement surprised everyone.|その劇の結末は皆を驚かせた。
e7177|Police quickly quelled the riot.|警察はすぐに暴動を鎮めた。
e7178|His British accent is just an affectation.|彼のイギリス英語のなまりはただの気取りだ。
e7179|The valley was formed by glacial ice.|その谷は氷河の氷によって作られた。
e7180|Getting a visa is such a rigmarole.|ビザを取るのは本当に面倒な手続きだ。
e7181|They went through an acrimonious divorce.|彼らはとげとげしい離婚を経験した。
e7182|Bad weather stymied the rescue efforts.|悪天候が救助活動を妨げた。
e7183|Her emotions ran the gamut from joy to anger.|彼女の感情は喜びから怒りまで全範囲に及んだ。
e7184|The scandal revealed the cupidity of the bankers.|その不祥事は銀行家たちの強欲を明らかにした。
e7185|The rapacious landlord raised the rent again.|強欲な家主はまた家賃を上げた。
e7186|Electrons are subatomic particles.|電子は原子より小さい粒子だ。
e7187|There was dissonance between his words and actions.|彼の言葉と行動の間には不調和があった。
e7188|Interest accrues on the savings every month.|貯金には毎月利息が生じる。
e7189|He ate a gargantuan plate of pasta.|彼は巨大な皿のパスタを食べた。
e7190|Customs officers found contraband in the truck.|税関職員がトラックの中から密輸品を見つけた。
e7191|The boy looked penitent after breaking the vase.|花瓶を割った後、少年は後悔している様子だった。
e7192|The artist died in penury.|その画家は極貧のうちに亡くなった。
e7193|London is a very cosmopolitan city.|ロンドンはとても国際的な都市だ。
e7194|Please read the disclaimer before using the site.|サイトを使う前に免責事項を読んでください。
e7195|He perfunctorily glanced at my report.|彼は私の報告書におざなりに目を通した。
e7196|The teacher upbraided him for cheating.|先生はカンニングをした彼を叱責した。
e7197|It is your prerogative to change your mind.|考えを変えるのはあなたの特権だ。
e7198|She kept a vigil by her sick son's bed.|彼女は病気の息子のベッドのそばで徹夜の看護をした。
e7199|Euthanasia is legal in some countries.|安楽死はいくつかの国で合法だ。
e7200|Politicians love to grandstand on TV.|政治家はテレビで人気取りをするのが好きだ。
e7201|The team's defense was woeful.|そのチームの守備は悲惨だった。
e7202|The puppy gave me a doleful look.|子犬は私に悲しげな目を向けた。
e7203|The banality of the plot bored me.|筋書きの陳腐さに私は退屈した。
e7204|Her parents imbued her with a love of books.|両親は彼女に本への愛情を吹き込んだ。
e7205|A cold drink will quench your thirst.|冷たい飲み物で渇きがいやされるよ。
e7206|The king hired mercenaries to fight the war.|王は戦争のために傭兵を雇った。
e7207|Monkeys are mostly arboreal animals.|サルはほとんどが樹上に住む動物だ。
e7208|She pointedly ignored his question.|彼女はあてつけがましく彼の質問を無視した。
e7209|As a neophyte, he made many mistakes.|初心者として彼は多くの失敗をした。
e7210|Dark clouds presaged a storm.|黒い雲が嵐の前兆となった。
e7211|As the old adage says, time is money.|昔の格言にあるように、時は金なりだ。
e7212|He became morose after losing his job.|仕事を失ってから彼は気難しくなった。
e7213|She resisted all his blandishments.|彼女は彼のあらゆる甘言に屈しなかった。
e7214|The study used a new methodology.|その研究は新しい方法論を用いた。
e7215|Saying I died laughing is hyperbole.|「笑い死にした」と言うのは誇張だ。
e7216|The actor sued the magazine for defamation.|その俳優は名誉毀損で雑誌を訴えた。
e7217|Her censorious remarks upset everyone.|彼女の批判的な発言は皆を怒らせた。
e7218|Our plans finally came to fruition.|私たちの計画はついに実現した。
e7219|The flowers wilted in the hot sun.|暑い日差しで花がしおれた。
e7220|The company is in danger of default.|その会社は債務不履行の危機にある。
e7221|The climbers stood at the edge of a precipice.|登山者たちは断崖の縁に立った。
e7222|Family dinner time is sacrosanct in our house.|わが家では家族の夕食の時間は神聖だ。
e7223|The book is replete with useful tips.|その本は役に立つヒントに満ちている。
e7224|The newspaper revealed the sordid details.|新聞はその浅ましい詳細を明らかにした。
e7225|She studied optics at university.|彼女は大学で光学を学んだ。
e7226|The long title was truncated on the screen.|長いタイトルは画面上で切り詰められた。
e7227|The guard was fired for dereliction of duty.|警備員は職務怠慢で解雇された。
e7228|The pilot remained unflappable in the storm.|パイロットは嵐の中でも動じなかった。
e7229|The general tenor of the speech was hopeful.|スピーチの全体的な趣旨は希望に満ちていた。
e7230|Don't waste money on frivolous things.|くだらない物にお金を無駄遣いしないで。
e7231|My cousin studies zoology in college.|いとこは大学で動物学を学んでいる。
e7232|It is invidious to compare the two sisters.|その2人の姉妹を比べるのは不公平だ。
e7233|The habit is deeply entrenched in our culture.|その習慣は私たちの文化に深く定着している。
e7234|He spoke in an emollient tone.|彼は和らげるような口調で話した。
e7235|He has a proclivity for telling lies.|彼にはうそをつく性癖がある。
e7236|Please explain without using medical jargon.|医学の専門用語を使わずに説明してください。
e7237|The lecture was too esoteric for most students.|その講義はほとんどの学生には難解すぎた。
e7238|Scientists hypothesize that water once existed on Mars.|科学者たちは火星にかつて水があったと仮説を立てている。
e7239|He feared retribution for his crimes.|彼は自分の罪の報いを恐れた。
e7240|The squirrel scampered up the tree.|リスは木にちょこちょこ駆け上がった。
e7241|Her husband is a terrible spendthrift.|彼女の夫はひどい浪費家だ。
e7242|Is he being obtuse on purpose?|彼はわざと鈍いふりをしているのか。
e7243|The paper discusses epistemic questions.|その論文は認識に関する問題を論じている。
e7244|She looked at the rotten food with revulsion.|彼女は腐った食べ物を嫌悪の目で見た。
e7245|The ubiquity of smartphones changed society.|スマートフォンがどこにでもあることが社会を変えた。
e7246|The library is a repository of knowledge.|図書館は知識の宝庫だ。
e7247|She perused the menu carefully.|彼女はメニューをじっくり読んだ。
e7248|Some ads use subliminal messages.|潜在意識に訴えるメッセージを使う広告もある。
e7249|The fans listened in rapture.|ファンたちは有頂天になって聴いた。
e7250|He was charged with larceny.|彼は窃盗罪で起訴された。
e7251|Housework can feel like drudgery.|家事は骨の折れる仕事に感じることがある。
e7252|They survived the vicissitudes of life together.|彼らは人生の浮き沈みを共に乗り越えた。
e7253|It was a seminal work in modern art.|それは現代美術において影響力の大きい作品だった。
e7254|He forswore alcohol after the accident.|事故の後、彼は酒を誓ってやめた。
e7255|Oscar Wilde was famous for his epigrams.|オスカー・ワイルドは警句で有名だった。
e7256|She writes in pellucid prose.|彼女は明快な散文を書く。
e7257|The kangaroo is a marsupial.|カンガルーは有袋類だ。
e7258|She staunchly defended her friend.|彼女は断固として友人をかばった。
e7259|The job offers generous remuneration.|その仕事は気前のよい報酬を提供する。
e7260|Selfie has entered the English lexicon.|selfie は英語の語彙に加わった。
e7261|The army deposed the king.|軍は王を退位させた。
e7262|The kids loved the clown's zany tricks.|子どもたちはピエロのおどけた芸が大好きだった。
e7263|It was just a rhetorical question.|それはただの修辞的な問いだった。
e7264|Sorry to be pedantic, but that word is wrong.|細かくてすまないが、その単語は間違っている。
e7265|Many birds die from predation by cats.|多くの鳥が猫による捕食で死ぬ。
e7266|We walked through verdant hills.|私たちは緑豊かな丘を歩いた。
e7267|The teacher remained imperturbable in the chaos.|混乱の中でも先生は冷静なままだった。
e7268|He was so angry he wanted to throttle someone.|彼は誰かの首を絞めたいほど怒っていた。
e7269|His essay was long and discursive.|彼のエッセイは長くて散漫だった。
e7270|Her behavior was beyond reproach.|彼女の振る舞いは非の打ちどころがなかった。
e7271|The redolence of roses filled the garden.|バラの芳香が庭に満ちていた。
e7272|The lion walked with a regal air.|ライオンは堂々とした様子で歩いた。
e7273|The dog cowered under the table during the storm.|嵐の間、犬はテーブルの下ですくんでいた。
e7274|Light hits the retina at the back of the eye.|光は目の奥の網膜に当たる。
e7275|I had no inkling of their plan.|私は彼らの計画に全く感づいていなかった。
e7276|They looked down on benighted ancestors.|彼らは無知な祖先を見下した。
e7277|She runs a fledgling business from home.|彼女は自宅で駆け出しの事業を営んでいる。
e7278|The witness gave a deposition to the lawyers.|証人は弁護士たちに証言を行った。
e7279|She opened the letter with trepidation.|彼女は恐る恐るその手紙を開けた。
e7280|The medicine was made palatable for children.|その薬は子どもの口に合うように作られた。
e7281|He hobbled off the field with a sore ankle.|彼は足首を痛めて足を引きずって退場した。
e7282|The teacher often goes off on a tangent.|先生はよく話が脱線する。
e7283|Apropos of your question, here is my answer.|あなたの質問に関して、私の答えはこうだ。
e7284|With a deft move, she caught the falling cup.|器用な動きで彼女は落ちるカップを受け止めた。
e7285|The company has kept its primacy in the market.|その会社は市場で首位を保ってきた。
e7286|He is the putative father of the child.|彼はその子の推定上の父親だ。
e7287|We need to pare down our expenses.|私たちは出費を切り詰める必要がある。
e7288|The baby was born with a congenital heart problem.|その赤ちゃんは先天性の心臓病を持って生まれた。
e7289|Two boys tussled over the ball.|2人の少年がボールをめぐって取っ組み合った。
e7290|He has a predilection for spicy food.|彼は辛い食べ物が大好きだ。
e7291|My brother is outgoing and gregarious.|兄は外向的で社交的だ。
e7292|She is a perspicacious judge of character.|彼女は人柄を見抜く洞察力のある人だ。
e7293|The comedians were known for their quick repartee.|その芸人たちは当意即妙の応答で知られていた。
e7294|The balloon rose into the stratosphere.|気球は成層圏まで上昇した。
e7295|The lawyers protracted the trial for months.|弁護士たちは裁判を何か月も長引かせた。
e7296|The plan won the approbation of the board.|その計画は役員会の承認を得た。
e7297|He was arrested for using a bogus passport.|彼は偽のパスポートを使って逮捕された。
e7298|Nothing untoward happened during the trip.|旅行中に不都合なことは何も起きなかった。
e7299|We had a scintillating conversation at dinner.|夕食で才気あふれる会話を楽しんだ。
e7300|Steam rose from a fissure in the rock.|岩の裂け目から蒸気が上がった。
e7301|Young people are often full of idealism.|若者はしばしば理想主義に満ちている。
e7302|The band played a discordant note.|バンドは調和しない音を出した。
e7303|He got a ticket for a minor traffic infraction.|彼は軽い交通違反で切符を切られた。
e7304|The brothers wrangled over the inheritance.|兄弟は遺産をめぐって口論した。
e7305|They stayed in an opulent hotel.|彼らは豪華なホテルに泊まった。
e7306|An octopus has eight appendages.|タコには8本の手足がある。
e7307|The hall has excellent acoustic quality.|そのホールは音響の質が素晴らしい。
e7308|She remembers the halcyon days of her youth.|彼女は若いころの穏やかな日々を思い出す。
e7309|The fans exulted at the victory.|ファンたちは勝利に大喜びした。
e7310|A feeling of ennui filled the long afternoon.|長い午後に倦怠感が満ちていた。
e7311|Someone pilfered cookies from the jar.|誰かが瓶からクッキーをくすねた。
e7312|The puppies caused mayhem in the kitchen.|子犬たちが台所で大混乱を起こした。
e7313|He flagrantly broke the rules.|彼はあからさまに規則を破った。
e7314|Children learn languages almost by osmosis.|子どもはほとんど自然に言語を身につける。
e7315|Prices rose in small increments.|値段は少しずつ増加した。
e7316|A huge stone monolith stood in the field.|巨大な一枚岩の石柱が野原に立っていた。
e7317|It would be folly to ignore the warning.|警告を無視するのは愚かなことだろう。
e7318|She eschews sugar and fast food.|彼女は砂糖とファストフードを避けている。
e7319|The theory is too abstruse for me.|その理論は私には難解すぎる。
e7320|A spoon has a concave surface.|スプーンは凹面になっている。
e7321|The model looked svelte in her black dress.|モデルは黒いドレスですらりとして見えた。
e7322|The room was full of mirth and laughter.|部屋は陽気さと笑い声にあふれていた。
e7323|He remained steadfast in his beliefs.|彼は信念を揺るぎなく持ち続けた。
e7324|They held clandestine meetings at night.|彼らは夜に秘密の会合を開いた。
e7325|The singer faced vilification in the media.|その歌手はメディアで中傷を受けた。
e7326|The project languished for lack of money.|資金不足でその計画は停滞した。
e7327|Smoking causes respiratory problems.|喫煙は呼吸器の問題を引き起こす。
e7328|We received a deluge of letters.|私たちのもとに手紙が殺到した。
e7329|He has grandiose plans to build a castle.|彼には城を建てるという壮大な計画がある。
e7330|The watch has luminous hands.|その時計の針は光を発する。
e7331|The company went into liquidation.|その会社は清算に入った。
e7332|The young chef was the master's protégé.|その若い料理人は名人の弟子だった。
e7333|His silence was construed as agreement.|彼の沈黙は同意と解釈された。
e7334|This river is a tributary of the Mississippi.|この川はミシシッピ川の支流だ。
e7335|He made incendiary remarks at the rally.|彼は集会で扇動的な発言をした。
e7336|She has a fetish for cleanliness.|彼女は清潔さに執着している。
e7337|The trip kindled her interest in history.|その旅が彼女の歴史への関心を燃え立たせた。
e7338|The robin is a harbinger of spring.|コマドリは春の前触れだ。
e7339|The devaluation made imports more expensive.|平価切り下げで輸入品が高くなった。
e7340|Pay will be commensurate with experience.|給与は経験に見合ったものになる。
e7341|The company divested itself of its oil business.|その会社は石油事業を手放した。
e7342|It would be gauche to ask her age.|彼女の年齢を聞くのは気の利かないことだろう。
e7343|A clock in an ancient Roman film is an anachronism.|古代ローマの映画に時計があるのは時代錯誤だ。
e7344|A provident family saves for the future.|先見の明のある家族は将来のために貯金する。
e7345|His words had political overtones.|彼の言葉には政治的な含みがあった。
e7346|The dentist gave me a local anesthetic.|歯医者は私に局所麻酔薬を打った。
e7347|He feared his father's wrath.|彼は父親の激怒を恐れた。
e7348|Some people heckled the speaker.|何人かが演説者をやじった。
e7349|It was a flagrant violation of the rules.|それは規則の甚だしい違反だった。
e7350|He challenged the scientific orthodoxy.|彼は科学の通説に異議を唱えた。
e7351|High blood pressure is an insidious disease.|高血圧は知らぬ間に進行する病気だ。
e7352|The doctor ordered a biopsy of the lump.|医師はしこりの生検を指示した。
e7353|The exhibit juxtaposes old and new photos.|その展示は新旧の写真を並べて置いている。
e7354|The prophecy came true.|その予言は的中した。
e7355|He tried to atone for his mistakes.|彼は自分の過ちを償おうとした。
e7356|Prices are rising inexorably.|物価は止めようもなく上がっている。
e7357|Political myopia ignores future problems.|政治的な近視眼は将来の問題を無視する。
e7358|The test measures lexical knowledge.|そのテストは語彙の知識を測る。
e7359|Women are fighting for pay parity.|女性たちは賃金の平等を求めて闘っている。
e7360|He gave a facile answer to a hard question.|彼は難しい質問に安易な答えをした。
e7361|Exercise is a useful adjunct to diet.|運動は食事療法の有益な補助となる。
e7362|The villagers venerate their ancestors.|村人たちは祖先を崇めている。
e7363|He paid scant attention to the warning.|彼はその警告にほとんど注意を払わなかった。
e7364|The film is full of humor and pathos.|その映画はユーモアと哀愁に満ちている。
e7365|Solipsism holds that only the self exists.|独我論は自己のみが存在すると考える。
e7366|She studies molecular biology.|彼女は分子生物学を研究している。
e7367|The twins look uncannily alike.|その双子は不思議なほどそっくりだ。
e7368|It was an impetuous decision.|それは性急な決断だった。
e7369|She vacillated between two choices.|彼女は2つの選択肢の間で迷った。
e7370|The querulous old man complained about everything.|その不平の多い老人は何にでも文句を言った。
e7371|The ships fired a salvo of rockets.|艦船はロケットの一斉射撃を行った。
e7372|The farmer sprayed herbicide on the weeds.|農家は雑草に除草剤をまいた。
e7373|I appreciate your candor.|あなたの率直さに感謝します。
e7374|His prodigality left the family poor.|彼の浪費で家族は貧しくなった。
e7375|The issue has polarized the country.|その問題は国を二極化させた。
e7376|The talks got bogged down in details.|交渉は細部で行き詰まった。
e7377|The test results vindicated her theory.|検査結果が彼女の理論の正しさを証明した。
e7378|The pancreas produces insulin.|膵臓はインスリンを作る。
e7379|He is a party stalwart.|彼は党の忠実な支持者だ。
e7380|Lincoln is famous for the emancipation of slaves.|リンカーンは奴隷解放で有名だ。
e7381|He apologized profusely for being late.|彼は遅刻したことをしきりに謝った。
e7382|The novel explores themes of nihilism.|その小説は虚無主義のテーマを探求している。
e7383|The kids badgered me to buy a puppy.|子どもたちは子犬を買ってとしつこく頼んできた。
e7384|The story has an allegorical meaning.|その物語には寓意的な意味がある。
e7385|The old company ignored the upstart rival.|老舗企業は新参のライバルを無視した。
e7386|The trip left an indelible impression on me.|その旅は私に消えない印象を残した。
e7387|The band returned after a long hiatus.|バンドは長い休止期間の後に復帰した。
e7388|My aunt gets lachrymose at weddings.|おばは結婚式で涙もろくなる。
e7389|Vandals defiled the old temple.|破壊者たちが古い寺を汚した。
e7390|Signals pass between neurons at a synapse.|信号はシナプスでニューロンの間を伝わる。
e7391|He is too parsimonious to buy a new coat.|彼はけちすぎて新しいコートを買えない。
e7392|Don't settle for mediocrity.|平凡に甘んじてはいけない。
e7393|Please don't tread on the grass.|芝生を踏まないでください。
e7394|Putting ketchup on this steak is sacrilege.|このステーキにケチャップをかけるのは冒涜だ。
e7395|They vociferously opposed the new tax.|彼らは新しい税に声高に反対した。
e7396|She studies the iconography of Buddhist art.|彼女は仏教美術の図像学を研究している。
e7397|The children told fanciful stories about dragons.|子どもたちはドラゴンについての空想的な話をした。
e7398|The body was exhumed for testing.|検査のために遺体が掘り起こされた。
e7399|I had misgivings about the plan.|私はその計画に不安を抱いていた。
e7400|Talking about money is a taboo in some families.|お金の話がタブーの家庭もある。
e7401|The leader made bellicose statements.|その指導者は好戦的な発言をした。
e7402|The war led to the impoverishment of farmers.|戦争は農民の貧困化を招いた。
e7403|The insurance provides indemnity against loss.|その保険は損失に対する補償を提供する。
e7404|The dictator was reviled by his people.|その独裁者は国民からののしられた。
e7405|In the past, he was burned for heresy.|昔、彼は異端のかどで火あぶりにされた。
e7406|The villain had a nefarious plan.|悪役には極悪な計画があった。
e7407|As brave as a lion is a simile.|「ライオンのように勇敢な」は直喩だ。
e7408|Warm clay is soft and pliable.|温かい粘土は柔らかくて曲げやすい。
e7409|He spent five years in incarceration.|彼は5年間投獄されていた。
e7410|The company has become a tech behemoth.|その会社は巨大なIT企業になった。
e7411|He has a cavalier attitude toward safety.|彼は安全に対して無頓着な態度をとっている。
e7412|Bears forage for berries in the autumn.|クマは秋にベリーを探してあさる。
e7413|Cherry blossoms are beautiful but ephemeral.|桜は美しいがはかない。
e7414|They signed a covenant to protect the land.|彼らは土地を守る契約を結んだ。
e7415|Bees and flowers have a symbiotic relationship.|ハチと花は共生関係にある。
e7416|The family was bereft after the loss.|家族はその喪失に打ちひしがれていた。
e7417|We laughed at the incongruity of the situation.|私たちはその状況の不釣り合いさに笑った。
e7418|She spends an inordinate amount of time online.|彼女はネットに過度な時間を費やしている。
e7419|One error vitiated the whole experiment.|一つの誤りが実験全体を損なった。
e7420|Robbery is a serious felony.|強盗は重大な重罪だ。
e7421|The beneficent king helped the poor.|慈悲深い王は貧しい人々を助けた。
e7422|English syntax can be difficult to learn.|英語の構文は習得が難しいことがある。
e7423|He suffered the ignominy of losing his title.|彼は王座を失うという不名誉を味わった。
e7424|It was an audacious plan to climb the peak.|その山頂に登るのは大胆な計画だった。
e7425|The invaders pillaged the village.|侵略者たちは村を略奪した。
e7426|It was remiss of me not to call you.|あなたに電話しなかったのは私の怠慢だった。
e7427|Use an abrasive cleaner on the old pan.|古い鍋には研磨用のクレンザーを使って。
e7428|The hills were denuded of trees.|丘は木がはぎ取られて裸になっていた。
e7429|The decision caused a furor among fans.|その決定はファンの激しい怒りを招いた。
e7430|She gave a curt reply and left.|彼女はそっけない返事をして去った。
e7431|At this juncture, we must decide.|この時点で、私たちは決めなければならない。
e7432|Stop waffling and give me an answer.|あいまいな態度はやめて答えをちょうだい。
e7433|Usury was once a serious crime.|高利貸しはかつて重大な犯罪だった。
e7434|Most birds are diurnal animals.|ほとんどの鳥は昼行性の動物だ。
e7435|The movie raked in millions of dollars.|その映画は何百万ドルも大もうけした。
e7436|The king was shocked by his minister's perfidy.|王は大臣の裏切りに衝撃を受けた。
e7437|She forgave his past transgressions.|彼女は彼の過去の罪を許した。
e7438|I surmised that she was upset.|私は彼女が動揺していると推測した。
e7439|The baby had a beatific smile.|赤ちゃんは至福の笑みを浮かべていた。
e7440|Washing hands removes many pathogens.|手を洗うと多くの病原体が取り除かれる。
e7441|The queen arrived with her retinue.|女王は随行員を連れて到着した。
e7442|The field was left fallow for a year.|その畑は1年間休閑された。
e7443|Please accept my profuse apologies.|心から深くおわび申し上げます。
e7444|He is a fitness zealot.|彼はフィットネスの熱狂者だ。
e7445|They want a more egalitarian society.|彼らはもっと平等主義的な社会を望んでいる。
e7446|The corpulent man struggled up the stairs.|肥満の男性は苦労して階段を上った。
e7447|Some people criticize modern materialism.|現代の物質主義を批判する人もいる。
e7448|He chafed at the strict rules.|彼は厳しい規則にいらだった。
e7449|Lions are apex predators.|ライオンは頂点捕食者だ。
e7450|He was just a callow youth then.|彼は当時ただの未熟な若者だった。
e7451|The article was tendentious and unfair.|その記事は偏向していて不公平だった。
e7452|His career reached its zenith in the 1990s.|彼の経歴は1990年代に頂点に達した。
e7453|The ostensible reason for his visit was business.|彼の訪問の表向きの理由は仕事だった。
e7454|My grandmother suffers from arthritis.|祖母は関節炎を患っている。
e7455|The broken glass lacerated his hand.|割れたガラスで彼の手が切り裂かれた。
e7456|He suffered ostracism from his classmates.|彼はクラスメートから仲間外れにされた。
e7457|The children's book is a bit too didactic.|その児童書は少し教訓的すぎる。
e7458|The company denied any culpability.|その会社は一切の責任を否定した。
e7459|We deplore all forms of violence.|私たちはあらゆる形の暴力を遺憾に思う。
e7460|The hot wind desiccated the crops.|熱風が作物を干からびさせた。
e7461|They browbeat him into signing the paper.|彼らは彼を脅して書類に署名させた。
e7462|They lived in abject poverty.|彼らは悲惨な貧困の中で暮らしていた。
e7463|The minister faced a barrage of questions.|大臣は質問の集中砲火を浴びた。
e7464|Read the rubric before you start the test.|試験を始める前に指示を読みなさい。
e7465|Brevity is the soul of wit.|簡潔さは機知の真髄だ。
e7466|She is a doctor specializing in neurology.|彼女は神経学を専門とする医師だ。
e7467|The report was full of slipshod work.|その報告書はずさんな仕事だらけだった。
e7468|The professor expounded his theory for an hour.|教授は1時間かけて自説を詳しく説明した。
e7469|The army repelled the enemy incursion.|軍は敵の侵入を撃退した。
e7470|His views are rather parochial.|彼の考え方はかなり偏狭だ。
e7471|Young minds are very malleable.|若い頭脳はとても順応性がある。
e7472|Ghosts have no corporeal form.|幽霊には肉体的な形がない。
e7473|The salesman bamboozled my grandpa.|セールスマンは祖父をだました。
e7474|This was the genesis of the idea.|これがそのアイデアの起源だった。
e7475|The dog lolled in the sun with its tongue out.|犬は舌を出して日なたでだらりと寝そべった。
e7476|The country refused his extradition.|その国は彼の本国送還を拒否した。
e7477|The city was rife with crime.|その都市には犯罪がはびこっていた。
e7478|He received a custodial sentence.|彼は拘禁刑を言い渡された。
e7479|I couldn't decipher his handwriting.|彼の手書きの字が解読できなかった。
e7480|She accepted the news with equanimity.|彼女はその知らせを平静に受け止めた。
e7481|My dad uses an antediluvian cell phone.|父は時代遅れの携帯電話を使っている。
e7482|Our team trounced them ten to nothing.|私たちのチームは10対0で彼らを完敗させた。
e7483|The mayor denied any impropriety.|市長は不適切な行為を一切否定した。
e7484|She felt aggrieved at being ignored.|彼女は無視されて不当に扱われたと感じた。
e7485|A caterpillar is the larva of a butterfly.|イモムシはチョウの幼虫だ。
e7486|She made a cogent argument.|彼女は説得力のある主張をした。
e7487|The benefits of exercise are manifold.|運動の利点は多様だ。
e7488|The view from the top was stupendous.|頂上からの眺めは驚くべきものだった。
e7489|Her kindness endeared her to everyone.|彼女の優しさで皆が彼女を慕った。
e7490|Both sides blamed each other's intransigence.|双方が互いの頑固さを非難した。
e7491|The app uses strong encryption.|そのアプリは強力な暗号化を使っている。
e7492|The order takes effect forthwith.|その命令は直ちに効力を発する。
e7493|She had an illustrious career in science.|彼女は科学の分野で輝かしい経歴を持っていた。
e7494|The speech was long and ponderous.|そのスピーチは長くて重苦しかった。
e7495|He avowed his love for her.|彼は彼女への愛を公言した。
e7496|The fox used all its wiles to escape.|キツネは逃げるためにあらゆる策略を使った。
e7497|Your effort is laudable.|あなたの努力は称賛に値する。
e7498|The council is an analogue of a parliament.|その評議会は議会の類似物だ。
e7499|Let me summarize the salient points.|顕著な点をまとめさせてください。
e7500|He was seen as a reactionary.|彼は反動主義者だとみなされた。
e7501|He ran on, heedless of the danger.|彼は危険も気にせず走り続けた。
e7502|The seeds remain in dormancy until spring.|種は春まで休眠状態のままだ。
e7503|She improved quickly under his tutelage.|彼女は彼の指導のもとで急速に上達した。
e7504|He extricated himself from the tangled net.|彼は絡まった網から抜け出した。
e7505|The kitchen was frenetic before the dinner rush.|夕食の混雑前、厨房は大慌てだった。
e7506|She yearns for a quiet life in the country.|彼女は田舎での静かな暮らしを切望している。
e7507|He came, ostensibly to help, but mostly ate.|彼は表向きは手伝いに来たが、ほとんど食べていた。
e7508|The library is a bastion of free thought.|図書館は自由な思想の砦だ。
e7509|The hen incubates her eggs for three weeks.|めんどりは3週間卵を温める。
e7510|Thanks to her intercession, the two friends made up.|彼女の仲裁のおかげで二人の友人は仲直りした。
e7511|Critics excoriated the film for its weak story.|批評家はその映画の弱い筋書きを酷評した。
e7512|The truth was more prosaic than the rumors.|真実はうわさよりずっと平凡だった。
e7513|His caustic remarks hurt everyone at the table.|彼の辛辣な言葉は食卓の全員を傷つけた。
e7514|Cut the verbiage and get to the point.|無駄な言葉を省いて要点を言いなさい。
e7515|The baby babbled happy gibberish all morning.|赤ちゃんは朝じゅう楽しそうに訳のわからない言葉を話した。
e7516|Medieval alchemy tried to turn lead into gold.|中世の錬金術は鉛を金に変えようとした。
e7517|A portentous silence fell over the crowd.|不吉な沈黙が群衆を覆った。
e7518|Choosing a school was a real conundrum for us.|学校選びは私たちにとって本当に難問だった。
e7519|Please don't misconstrue my silence as anger.|私の沈黙を怒りと誤解しないでください。
e7520|Some people call laughter the elixir of life.|笑いを命の万能薬と呼ぶ人もいる。
e7521|He has always been a staunch supporter of the team.|彼はずっとそのチームの忠実な支持者だ。
e7522|Feral cats live behind the old factory.|古い工場の裏に野良猫が住んでいる。
e7523|Nuclear fission releases a huge amount of energy.|核分裂は膨大なエネルギーを放出する。
e7524|The choir sang a requiem for the victims.|合唱団は犠牲者のために鎮魂曲を歌った。
e7525|The hero vanquished the dragon in the end.|英雄は最後に竜を打ち負かした。
e7526|The stringency of the rules surprised new students.|規則の厳しさは新入生を驚かせた。
e7527|The guard carried a heavy wooden cudgel.|番人は重い木のこん棒を持っていた。
e7528|Our voluble neighbor talks for hours.|口達者な隣人は何時間も話す。
e7529|Farmers must deal with the vagaries of the weather.|農家は天候の気まぐれに対処しなければならない。
e7530|Neurons send signals through the brain.|神経細胞は脳内で信号を送る。
e7531|They made a pilgrimage to the old temple.|彼らはその古い寺へ巡礼した。
e7532|The storm hit with surprising ferocity.|嵐は驚くほどの激しさで襲った。
e7533|She interposed herself between the two angry boys.|彼女は怒った二人の少年の間に割って入った。
e7534|The stolid guard did not even smile.|無表情な警備員は笑みひとつ見せなかった。
e7535|He is a specialist in pulmonary diseases.|彼は肺の病気の専門医だ。
e7536|Everyone admired the aptness of her reply.|誰もが彼女の返答の的確さに感心した。
e7537|Venice was once a great mercantile city.|ベネチアはかつて偉大な商業都市だった。
e7538|He is lucky, inasmuch as he has good friends.|良い友達がいるという点で、彼は幸運だ。
e7539|She wore an exquisite silk dress.|彼女は非常に美しい絹のドレスを着ていた。
e7540|A loud scream rent the quiet night.|大きな悲鳴が静かな夜を引き裂いた。
e7541|He pays alimony to his former wife.|彼は元妻に扶養手当を払っている。
e7542|The river forms a clear line of demarcation.|その川ははっきりした境界線になっている。
e7543|Profane language is not allowed in class.|授業中に下品な言葉は許されない。
e7544|Our new teacher is an amiable young man.|新しい先生は愛想のよい若い男性だ。
e7545|She accepted the invitation with alacrity.|彼女は二つ返事で招待を受けた。
e7546|Please enunciate each word clearly.|一語一語はっきり発音してください。
e7547|The show was full of vapid conversation.|その番組はつまらない会話ばかりだった。
e7548|Social stratification exists in every country.|社会の階層化はどの国にも存在する。
e7549|Our tailbone is a vestigial part of the body.|尾てい骨は体の痕跡器官だ。
e7550|Thank you for your forbearance during the repairs.|修理中のご辛抱に感謝します。
e7551|The two companies were accused of collusion.|その2社は共謀の罪で訴えられた。
e7552|The house once belonged to the local gentry.|その屋敷はかつて地元の上流階級のものだった。
e7553|The food at that hotel was execrable.|そのホテルの料理はひどかった。
e7554|He parried the reporter's tricky question.|彼は記者の意地悪な質問を受け流した。
e7555|Too much salt can lead to hypertension.|塩分の取りすぎは高血圧につながる。
e7556|She played the piano with great panache.|彼女は実に堂々とピアノを弾いた。
e7557|He is an unabashed fan of old cartoons.|彼は臆面もなく昔のアニメの大ファンだ。
e7558|The flood obliterated the small village.|洪水がその小さな村を跡形もなく消し去った。
e7559|She balked at the high price of the ticket.|彼女はチケットの高値にしりごみした。
e7560|Plastic pollution causes environmental degradation.|プラスチック汚染は環境の悪化を招く。
e7561|Store the medicine at ambient temperature.|薬は室温で保管してください。
e7562|The kids wheedled extra candy out of Grandma.|子どもたちはおばあちゃんを言いくるめてお菓子を余分にもらった。
e7563|An officious clerk kept telling us what to do.|おせっかいな店員がずっと指図してきた。
e7564|She is the quintessence of kindness.|彼女は優しさの典型だ。
e7565|This coat is impervious to rain.|このコートは雨を通さない。
e7566|My son wants to study entomology.|息子は昆虫学を学びたがっている。
e7567|The children answered in unison.|子どもたちは声をそろえて答えた。
e7568|Mother gently reproved him for being late.|母は遅刻した彼を優しくたしなめた。
e7569|He remained obdurate despite our pleas.|私たちが頼んでも彼はかたくなだった。
e7570|The diminutive dog barked at the big cat.|小さな犬が大きな猫にほえた。
e7571|Several fans were hurt in the melee.|乱闘で数人のファンがけがをした。
e7572|He kept quiet for fear of reprisal.|彼は報復を恐れて黙っていた。
e7573|The nurse cleaned the cut with saline solution.|看護師は生理食塩水で傷口を洗った。
e7574|He drives an ostentatious gold car.|彼はこれ見よがしの金色の車に乗っている。
e7575|The laxity of security worried the parents.|警備の手ぬるさに親たちは不安を感じた。
e7576|Farmers sometimes cull weak animals from the herd.|農家は群れから弱い動物を間引くことがある。
e7577|Her wanderlust took her to forty countries.|旅行熱で彼女は40か国を訪れた。
e7578|The judge meted out a harsh sentence.|裁判官は厳しい判決を下した。
e7579|Her kitchen is always immaculate.|彼女の台所はいつもしみ一つない。
e7580|English orthography is famously irregular.|英語のつづり方は不規則なことで有名だ。
e7581|Fashion is a highly mutable thing.|ファッションはとても変わりやすいものだ。
e7582|The castle walls repulsed every attack.|城壁はあらゆる攻撃を撃退した。
e7583|The hospital hired more ancillary staff.|病院は補助スタッフを増員した。
e7584|The election was full of political chicanery.|その選挙は政治的なごまかしだらけだった。
e7585|The boisterous kids ran around the park.|騒々しい子どもたちが公園を走り回った。
e7586|She is studying human physiology at college.|彼女は大学で人体生理学を学んでいる。
e7587|They shared many trials and tribulations together.|彼らは多くの苦難を共にした。
e7588|Only two copies of the book are extant.|その本は2冊しか現存していない。
e7589|Our team thrashed them ten to nothing.|私たちのチームは10対0で彼らに圧勝した。
e7590|Medical students learn anatomy from a cadaver.|医学生は献体から解剖学を学ぶ。
e7591|She studied for the exam with great assiduity.|彼女は非常に熱心に試験勉強をした。
e7592|The eye drops cause dilation of the pupils.|その目薬で瞳孔が広がる。
e7593|He blurted out the secret at dinner.|彼は夕食中に秘密を口走った。
e7594|We need an expeditious solution to this problem.|この問題には迅速な解決策が必要だ。
e7595|The soldier received a medal for gallantry.|その兵士は勇敢さを称えられ勲章を受けた。
e7596|The bank foreclosed on their house.|銀行は彼らの家を差し押さえた。
e7597|The Irish diaspora spread across the world.|離散したアイルランド人は世界中に広がった。
e7598|The music reached ninety decibels.|音楽は90デシベルに達した。
e7599|The city wants to stamp out bullying in schools.|市は学校のいじめを根絶したいと考えている。
e7600|The talks reached an impasse.|交渉は行き詰まった。
e7601|Calling a whale a fish is a misnomer.|クジラを魚と呼ぶのは誤った名称だ。
e7602|The crowd answered with derisive laughter.|群衆はあざけるような笑いで応えた。
e7603|This is not an opportune moment to ask.|今は尋ねるのに都合のよい時ではない。
e7604|The mayor lauded the firefighters for their courage.|市長は消防士たちの勇気を称賛した。
e7605|The hidebound manager rejected every new idea.|頑固な部長はあらゆる新しい案を退けた。
e7606|The trial ended in an acquittal.|裁判は無罪判決で終わった。
e7607|She explained the theory with great lucidity.|彼女はその理論を非常に明快に説明した。
e7608|He gave me a contemptuous look.|彼は私に軽蔑的な視線を向けた。
e7609|Both sides remained intransigent.|双方とも譲らなかった。
e7610|The king sent an emissary to the enemy camp.|王は敵の陣営に使者を送った。
e7611|The long illness sapped his strength.|長い病気が彼の体力を奪った。
e7612|The camera uses infrared light at night.|そのカメラは夜間に赤外線を使う。
e7613|My grandfather was a taciturn but kind man.|祖父は無口だが優しい人だった。
e7614|Detritus from the party covered the floor.|パーティーのごみが床を覆っていた。
e7615|Sushi is a quintessential Japanese food.|すしは典型的な日本料理だ。
e7616|The wanton destruction of the forest shocked us.|森林の理不尽な破壊に私たちは衝撃を受けた。
e7617|We all have our little foibles.|誰にでもちょっとした欠点はある。
e7618|The café was popular with the city's literati.|そのカフェは町の文化人に人気だった。
e7619|The bad signal garbled her message.|電波が悪くて彼女の伝言が聞き取れなくなった。
e7620|Grandma shared reminiscences of her childhood.|祖母は子ども時代の思い出を語った。
e7621|It was a felicitous choice of words.|それは絶妙な言葉の選び方だった。
e7622|His hubris led to his downfall.|彼の傲慢さが彼の没落を招いた。
e7623|Her smile remains an enigma to us.|彼女の微笑みは私たちにとって謎のままだ。
e7624|Bees are important pollinators for farms.|ハチは農場にとって重要な花粉媒介者だ。
e7625|He had no pecuniary interest in the deal.|彼はその取引に金銭的な利害がなかった。
e7626|She showed indomitable courage during her illness.|彼女は病気の間、不屈の勇気を見せた。
e7627|They sojourned in Paris for a month.|彼らはパリに1か月滞在した。
e7628|She rebuffed all his offers of help.|彼女は彼の援助の申し出をすべてはねつけた。
e7629|The bank checked the company's solvency.|銀行はその会社の支払い能力を調べた。
e7630|He lives in a nondescript gray building.|彼は特徴のない灰色の建物に住んでいる。
e7631|Try to avoid clichés in your essay.|作文では決まり文句を避けるようにしなさい。
e7632|The truck lifts heavy loads with hydraulic power.|そのトラックは油圧で重い荷物を持ち上げる。
e7633|Passengers disembarked at the next port.|乗客は次の港で下船した。
e7634|The initial outlay for the shop was large.|店の初期費用は多額だった。
e7635|Real place names add verisimilitude to the novel.|実在の地名が小説に真実味を与えている。
e7636|We scraped by on very little money.|私たちはわずかなお金で何とか暮らした。
e7637|The event was held under the aegis of the city.|その行事は市の後援で開かれた。
e7638|We collected quantitative data for the study.|私たちは研究のために量的データを集めた。
e7639|The contract has a stipulation about overtime.|その契約には残業に関する規定がある。
e7640|He has an encyclopedic knowledge of birds.|彼は鳥について百科事典並みの知識を持っている。
e7641|She exudes confidence on stage.|彼女は舞台で自信を漂わせている。
e7642|His boorish behavior embarrassed everyone.|彼の無作法なふるまいに皆が恥ずかしい思いをした。
e7643|Malaria is still a scourge in many countries.|マラリアは今も多くの国で災いとなっている。
e7644|Earthquakes happen when tectonic plates move.|地震はプレートが動くときに起こる。
e7645|He loves discussing the minutiae of baseball rules.|彼は野球の規則の細部について話すのが大好きだ。
e7646|Cheating on a test is reprehensible.|テストでのカンニングは非難されるべきことだ。
e7647|The rainbow's beauty was evanescent.|虹の美しさはつかの間のものだった。
e7648|Don't get upset over such a trifle.|そんなささいなことで怒らないで。
e7649|The school does not condone bullying.|学校はいじめを容認しない。
e7650|Beneath a veneer of calm, she was nervous.|落ち着いたうわべの下で彼女は緊張していた。
e7651|Orion is an easy constellation to find.|オリオン座は見つけやすい星座だ。
e7652|We swam in a limpid mountain lake.|私たちは澄んだ山の湖で泳いだ。
e7653|The review was full of vitriol.|その批評は痛烈な批判に満ちていた。
e7654|She snubbed me at the party.|彼女はパーティーで私を冷たくあしらった。
e7655|Vandals desecrated the old graves.|破壊者たちが古い墓を荒らした。
e7656|She has a warm, mellifluous voice.|彼女は温かく流れるように美しい声をしている。
e7657|We signed the papers in front of a notary.|私たちは公証人の前で書類に署名した。
e7658|His argument is based on a fallacious idea.|彼の主張は誤った考えに基づいている。
e7659|Check the roster to see your shift.|勤務表で自分のシフトを確認して。
e7660|There is a dearth of doctors in rural areas.|地方では医師が不足している。
e7661|Stop asking such inane questions.|そんなばかげた質問はやめなさい。
e7662|The guard connived at the prisoner's escape.|看守は囚人の脱走を見て見ぬふりをした。
e7663|He built a clever contrivance to catch mice.|彼はネズミを捕まえる巧妙な仕掛けを作った。
e7664|She bequeathed her house to her niece.|彼女は家をめいに遺贈した。
e7665|His slovenly room smelled of old socks.|彼のだらしない部屋は古い靴下のにおいがした。
e7666|Her calm style is the antithesis of his.|彼女の落ち着いたやり方は彼とは正反対だ。
e7667|Winning the gold medal was the pinnacle of her career.|金メダル獲得は彼女の経歴の頂点だった。
e7668|She is a redoubtable opponent at chess.|彼女はチェスで手ごわい相手だ。
e7669|Don't let old habits shackle you.|古い習慣に縛られてはいけない。
e7670|The arraignment is set for next Monday.|罪状認否は来週月曜日に予定されている。
e7671|He begrudgingly shared his cake with his brother.|彼はしぶしぶ弟とケーキを分けた。
e7672|We don't have the wherewithal to buy a house.|私たちには家を買う資金がない。
e7673|It was an arduous climb to the top.|頂上までの登山は骨が折れた。
e7674|Climate change is an existential threat.|気候変動は存亡に関わる脅威だ。
e7675|Her warning about the storm proved prescient.|嵐についての彼女の警告は先見の明があった。
e7676|The paramedics resuscitated the swimmer.|救急隊員は泳いでいた人を蘇生させた。
e7677|I love the juxtaposition of old and new buildings.|古い建物と新しい建物が並ぶ様子が大好きだ。
e7678|He wrote a vituperative letter to the editor.|彼は編集者に口汚い手紙を書いた。
e7679|The gang made money through extortion.|そのギャングは恐喝で金を稼いだ。
e7680|Prices fell precipitously last month.|先月、物価が急激に下がった。
e7681|Keep the tea in a hermetic container.|お茶は密閉容器に保存してください。
e7682|Years in the city inured him to the noise.|都会での年月が彼を騒音に慣れさせた。
e7683|Her answer was an unequivocal no.|彼女の答えははっきりとした「いいえ」だった。
e7684|I can't stand the inanity of that TV show.|あのテレビ番組のくだらなさには耐えられない。
e7685|The lithe cat jumped onto the fence.|しなやかな猫が塀に飛び乗った。
e7686|We tried to keep some semblance of order.|私たちは一応の秩序を保とうとした。
e7687|The clear sky was a good augury for the trip.|晴れた空は旅行のよい前兆だった。
e7688|Children are immunized against measles.|子どもたちははしかの予防接種を受ける。
e7689|He gave a fervid speech about freedom.|彼は自由について熱烈な演説をした。
e7690|The doctor enjoined him to rest for a week.|医者は彼に1週間休むよう命じた。
e7691|Dad gave us a homily about saving money.|父は私たちに貯金についてお説教をした。
e7692|The valley has fecund soil for farming.|その谷には農業に適した肥沃な土がある。
e7693|Thunder reverberated through the valley.|雷鳴が谷じゅうに鳴り響いた。
e7694|The dissident was forced to leave the country.|その反体制活動家は国外へ追われた。
e7695|Avoid colloquialisms in formal writing.|正式な文章では口語表現を避けなさい。
e7696|She gave an extemporaneous speech at the wedding.|彼女は結婚式で即興のスピーチをした。
e7697|He was unfairly maligned by the newspapers.|彼は新聞に不当に中傷された。
e7698|The writer asked for political asylum abroad.|その作家は外国に政治亡命を求めた。
e7699|The insolent boy talked back to his teacher.|生意気な少年は先生に口答えした。
e7700|The island has unique flora and fauna.|その島には独特の動植物がいる。
e7701|The somnolent afternoon made everyone want a nap.|眠気を誘う午後で皆が昼寝をしたくなった。
e7702|I didn't catch every word, but I got the gist.|全部は聞き取れなかったが、要点はわかった。
e7703|He gave a servile smile to his boss.|彼は上司に卑屈な笑みを見せた。
e7704|The onus is on you to prove it.|それを証明する責任はあなたにある。
e7705|The crowd jeered at the referee.|観衆は審判にやじを飛ばした。
e7706|We had a desultory chat about the weather.|私たちは天気についてとりとめのない話をした。
e7707|He gave the report only a cursory glance.|彼は報告書にざっと目を通しただけだった。
e7708|Exercise can speed up your metabolism.|運動は代謝を高めることがある。
e7709|To our consternation, the bridge was gone.|驚いたことに、橋がなくなっていた。
e7710|He hurled invective at the other driver.|彼は相手の運転手に悪口を浴びせた。
e7711|Our vivacious aunt makes every party fun.|陽気なおばはどのパーティーも楽しくする。
e7712|He faced an implacable enemy.|彼は容赦ない敵に直面した。
e7713|She wrested the remote from her brother.|彼女は弟からリモコンをもぎ取った。
e7714|The doctor checked the fetus on the screen.|医師は画面で胎児を確認した。
e7715|The explorers traversed the desert on camels.|探検家たちはラクダで砂漠を横断した。
e7716|A throng of fans waited outside the hotel.|大勢のファンがホテルの外で待っていた。
e7717|She is indubitably the best player on the team.|彼女は疑いなくチームで最高の選手だ。
e7718|Rabbits are famous for their fecundity.|ウサギは多産で有名だ。
e7719|Don't be disheartened by one bad grade.|一度の悪い成績で落胆しないで。
e7720|She works in the dermatology department.|彼女は皮膚科で働いている。
e7721|The indolent cat slept all day.|怠け者の猫は一日中寝ていた。
e7722|He nonchalantly walked past the barking dog.|彼はほえる犬の横を平然と通り過ぎた。
e7723|The fortress was thought to be impregnable.|その要塞は難攻不落と考えられていた。
e7724|The country was ruled by a small oligarchy.|その国は少数の支配者による寡頭政治だった。
e7725|My grandmother lives on a small annuity.|祖母はわずかな年金で暮らしている。
e7726|The tired hikers plodded up the hill.|疲れたハイカーたちは丘をとぼとぼ登った。
e7727|She has worked here since its inception.|彼女は創設以来ここで働いている。
e7728|His position became untenable after the scandal.|不祥事の後、彼の立場は維持できなくなった。
e7729|The coach's castigation upset the players.|コーチの厳しい非難に選手たちは動揺した。
e7730|The dog gave me a lugubrious look.|犬は悲しげな目で私を見た。
e7731|Science is built on empiricism.|科学は経験主義の上に成り立っている。
e7732|He became a famous media mogul.|彼は有名なメディア界の大物になった。
e7733|His name was expunged from the records.|彼の名前は記録から抹消された。
e7734|The new government abrogated the old treaty.|新政府は古い条約を破棄した。
e7735|We fixed the roof to forestall any leaks.|雨漏りを未然に防ぐため屋根を修理した。
e7736|The trial was a travesty of justice.|その裁判は正義を曲げた茶番だった。
e7737|The disease spreads insidiously through the body.|その病気は知らぬ間に体中に広がる。
e7738|Forensic experts examined the evidence.|法医学の専門家が証拠を調べた。
e7739|The company made overtures to its rival.|その会社はライバル社に提携を申し入れた。
e7740|She entreated him to stay a little longer.|彼女は彼にもう少しいてほしいと懇願した。
e7741|The singer arrived with her entourage.|歌手は取り巻きを連れて到着した。
e7742|The team built an unassailable lead.|チームは揺るぎないリードを築いた。
e7743|They broke the rules with impunity.|彼らは罰を受けることなく規則を破った。
e7744|The prisoner's wrists were bound in manacles.|囚人の手首は手かせでつながれていた。
e7745|Rationalism values reason over feelings.|合理主義は感情より理性を重んじる。
e7746|I was amazed by the breadth of her knowledge.|彼女の知識の幅広さに驚いた。
e7747|Nothing grows on this barren land.|この不毛の土地には何も育たない。
e7748|His maladroit apology made things worse.|彼の不器用な謝罪で事態は悪化した。
e7749|The train hurtled through the dark tunnel.|列車は暗いトンネルを猛スピードで走り抜けた。
e7750|Political pundits predicted a close election.|政治評論家たちは接戦を予想した。
e7751|Salt water gives you more buoyancy.|塩水ではより大きな浮力が得られる。
e7752|His laconic reply was simply, "No."|彼の簡潔な返事はただ「いいえ」だった。
e7753|Sloth is one of the seven deadly sins.|怠惰は七つの大罪の一つだ。
e7754|The farmers protested the expropriation of their land.|農民たちは土地の収用に抗議した。
e7755|It took an hour to disentangle the fishing line.|釣り糸をほどくのに1時間かかった。
e7756|She gave a demure smile and looked away.|彼女は控えめに微笑んで目をそらした。
e7757|He was just a lackey of the rich boss.|彼は金持ちのボスの手先にすぎなかった。
e7758|The cake was so sweet it was cloying.|そのケーキは甘すぎて甘ったるかった。
e7759|The insects defoliated the trees in weeks.|その虫は数週間で木々の葉を枯らした。
e7760|We were struck by the grandeur of the mountains.|私たちは山々の雄大さに心を打たれた。
e7761|A general malaise kept him in bed.|全身のだるさで彼は寝込んだ。
e7762|Stop prevaricating and tell me the truth.|言い逃れはやめて本当のことを言いなさい。
e7763|The beleaguered team lost again.|苦境に立つチームはまた負けた。
e7764|His verbose speech bored the audience.|彼のくどい演説は聴衆を退屈させた。
e7765|The city gets water from a desalination plant.|その市は海水淡水化施設から水を得ている。
e7766|New evidence led to his exoneration.|新しい証拠で彼の無実が証明された。
e7767|She has an unimpeachable reputation.|彼女の評判は非の打ちどころがない。
e7768|He signed the paper under duress.|彼は脅されて書類に署名した。
e7769|The rules of the game seemed arcane to me.|そのゲームのルールは私には難解に思えた。
e7770|The teacher was tired of the boy's recalcitrance.|先生は少年の反抗的な態度にうんざりしていた。
e7771|Mom chastised us for breaking the window.|母は窓を割った私たちを厳しく叱った。
e7772|The town draws water from an underground aquifer.|町は地下の帯水層から水をくみ上げている。
e7773|They got the tickets by subterfuge.|彼らは策略を使ってチケットを手に入れた。
e7774|Too much sugar is inimical to good health.|砂糖の取りすぎは健康に有害だ。
e7775|The court issued an injunction against the factory.|裁判所はその工場に差し止め命令を出した。
e7776|She handled the angry customer with finesse.|彼女は怒った客を手際よく対応した。
e7777|The police quickly quashed the riot.|警察はすぐに暴動を鎮圧した。
e7778|I love learning the etymology of words.|私は言葉の語源を学ぶのが大好きだ。
e7779|The singer gave a transcendent performance.|その歌手はずば抜けた演奏を見せた。
e7780|The restaurant was expensive and pretentious.|そのレストランは高くて気取っていた。
e7781|The rain gave us a brief reprieve from the heat.|雨のおかげで暑さが一時和らいだ。
e7782|Her English pronunciation is impeccable.|彼女の英語の発音は完璧だ。
e7783|A deep ravine lay below the bridge.|橋の下には深い峡谷があった。
e7784|Radioactive waste must be stored safely.|放射性廃棄物は安全に保管しなければならない。
e7785|He gave a sententious lecture on good manners.|彼は礼儀について説教くさい話をした。
e7786|The council censured the mayor for lying.|議会はうそをついた市長を非難した。
e7787|The two families carried on a long vendetta.|その二つの家族は長い間反目し合っていた。
e7788|She wore a gaudy pink and gold dress.|彼女はけばけばしいピンクと金のドレスを着ていた。
e7789|A sinuous road led up the mountain.|曲がりくねった道が山の上へ続いていた。
e7790|The politician gave a bombastic speech.|その政治家は大げさな演説をした。
e7791|Dark clouds were a portent of the storm.|黒い雲は嵐の前兆だった。
e7792|Some herbs are believed to have curative powers.|いくつかの薬草には治療効果があると信じられている。
e7793|The rain didn't dampen our spirits.|雨でも私たちの気分はそがれなかった。
e7794|He grew up in an artistic milieu.|彼は芸術的な環境で育った。
e7795|The cat gave the dog a baleful stare.|猫は犬を悪意のこもった目でにらんだ。
e7796|The report contained erroneous information.|その報告書には誤った情報が含まれていた。
e7797|Bears hibernate through the winter.|クマは冬の間冬眠する。
e7798|She answered the tough questions with aplomb.|彼女は難しい質問に落ち着いて答えた。
e7799|Cheap ads debase the brand.|安っぽい広告はブランドの価値を下げる。
e7800|The brash young player challenged the champion.|生意気な若手選手はチャンピオンに挑んだ。
e7801|The sudden question discomfited the speaker.|突然の質問に講演者は当惑した。
e7802|His egotism made it hard to work with him.|彼の自己中心ぶりで一緒に働くのは大変だった。
e7803|The website crashed under an onslaught of visitors.|訪問者が殺到してウェブサイトがダウンした。
e7804|She chose to specialize in psychiatry.|彼女は精神医学を専門に選んだ。
e7805|Our plan to camp didn't pan out.|キャンプの計画はうまくいかなかった。
e7806|The insurance will indemnify you for the loss.|保険がその損失を補償してくれる。
e7807|The novel is full of royal intrigue.|その小説は王室の陰謀に満ちている。
e7808|The town's tourism industry is burgeoning.|その町の観光業は急成長している。
e7809|The diffusion of smartphones changed daily life.|スマートフォンの普及が日常生活を変えた。
e7810|The tired kids grew fractious in the car.|疲れた子どもたちは車の中でぐずり出した。
e7811|After much vacillation, she chose the blue dress.|さんざん迷った末、彼女は青いドレスを選んだ。
e7812|We must take cognizance of the risks.|私たちは危険を認識しなければならない。
e7813|The staff fawned over the famous guest.|スタッフは有名な客にこびへつらった。
e7814|She bore the pain with quiet stoicism.|彼女は静かな忍耐で痛みに耐えた。
e7815|He was magnanimous in victory.|彼は勝っても寛大だった。
e7816|The smell of bread pervaded the house.|パンの香りが家じゅうに広がった。
e7817|Utilitarianism seeks the greatest good for the most people.|功利主義は最大多数の最大幸福を求める。
e7818|She took umbrage at his rude joke.|彼女は彼の失礼な冗談に腹を立てた。
e7819|It was crass to joke about her weight.|彼女の体重を冗談にするのは無神経だった。
e7820|The old toys were consigned to the attic.|古いおもちゃは屋根裏部屋へ追いやられた。
e7821|The inebriated man fell asleep on the bench.|酔っ払った男はベンチで眠り込んだ。
e7822|The army seized power in a coup.|軍はクーデターで権力を握った。
e7823|The article was full of nasty innuendo.|その記事は意地の悪い当てこすりだらけだった。
e7824|Detectives use deductive reasoning.|探偵は演繹的な推理を使う。
e7825|A virulent flu spread through the school.|悪性のインフルエンザが学校で広まった。
e7826|Paris was once the arbiter of fashion.|パリはかつて流行の決定者だった。
e7827|The website disseminates health information.|そのサイトは健康情報を広めている。
e7828|The incessant rain kept us indoors.|絶え間ない雨で私たちは家にこもった。
e7829|Japan had a feudal system for centuries.|日本には何世紀も封建制度があった。
e7830|It's a truism that practice makes perfect.|練習が完璧を生むのは分かりきったことだ。
e7831|His sycophantic praise annoyed the boss.|彼のおべっかは上司をいらだたせた。
e7832|Both sides agreed to accept the arbitrator's decision.|双方とも仲裁人の決定に従うことに同意した。
e7833|The erudite professor knew six languages.|博識な教授は6か国語を知っていた。
e7834|We doused the campfire before bed.|私たちは寝る前にたき火に水をかけて消した。
e7835|Helium is an inert gas.|ヘリウムは不活性ガスだ。
e7836|It was a propitious time to start a business.|事業を始めるのに好都合な時期だった。
e7837|The hotel charges exorbitant prices for drinks.|そのホテルは飲み物に法外な値段をつける。
e7838|He follows the dictum "less is more."|彼は「少ないほど豊か」という格言に従っている。
e7839|The meeting ended in acrimony.|会議はとげとげしい雰囲気で終わった。
e7840|We whiled away the afternoon reading.|私たちは読書をして午後をのんびり過ごした。
e7841|Frogs and fish are aquatic animals.|カエルや魚は水生動物だ。
e7842|The smell of cookies tantalized the kids.|クッキーのにおいが子どもたちをじらした。
e7843|She finally succumbed to temptation and ate the cake.|彼女はついに誘惑に負けてケーキを食べた。
e7844|His son gave a moving eulogy at the funeral.|息子は葬儀で感動的な弔辞を述べた。
e7845|There is growing disquiet about the new rules.|新しい規則への不安が高まっている。
e7846|That's a preposterous excuse!|それはばかげた言い訳だ！
e7847|The house has an expansive garden.|その家には広々とした庭がある。
e7848|The cheers rose to a crescendo.|声援は最高潮に達した。
e7849|Running is good for cardiovascular health.|ランニングは心臓血管の健康によい。
e7850|Music brought her solace after the loss.|喪失の後、音楽が彼女の慰めとなった。
e7851|It took years to recoup the investment.|投資を回収するのに何年もかかった。
e7852|"Always be honest" is my credo.|「常に正直であれ」が私の信条だ。
e7853|The pungent smell of garlic filled the kitchen.|ニンニクの鼻をつくにおいが台所に満ちた。
e7854|He became a wealthy shipping magnate.|彼は裕福な海運王になった。
e7855|Plants make food through photosynthesis.|植物は光合成で養分を作る。
e7856|Coffee revived my flagging energy.|コーヒーが弱まっていた私の元気を回復させた。
e7857|Women fought for suffrage for many years.|女性たちは長年参政権のために闘った。
e7858|A hitherto unknown species was discovered.|これまで知られていなかった種が発見された。
e7859|The plan contravenes local safety rules.|その計画は地元の安全規則に違反している。
e7860|Tea leaves were once used for divination.|かつて茶葉が占いに使われた。
e7861|The defendant stood up when the judge entered.|裁判官が入廷すると被告は起立した。
e7862|To my chagrin, I forgot her birthday.|悔しいことに、彼女の誕生日を忘れてしまった。
e7863|Turn off that infernal noise!|そのいまいましい騒音を止めて！
e7864|The strident alarm woke the whole house.|耳ざわりな警報音が家中を起こした。
e7865|Small groups were subsumed into the larger club.|小さなグループは大きなクラブに組み込まれた。
e7866|The old town is a labyrinth of narrow streets.|旧市街は狭い通りが入り組んだ迷宮だ。
e7867|He showed a blithe disregard for the rules.|彼は規則をのんきに無視した。
e7868|Be circumspect about what you post online.|ネットに投稿する内容には慎重になりなさい。
e7869|Maples are deciduous trees.|カエデは落葉樹だ。
e7870|A surfeit of sweets made him sick.|甘い物の食べ過ぎで彼は気分が悪くなった。
e7871|Police found illicit drugs in the car.|警察は車から違法薬物を発見した。
e7872|He rarely imbibes anything stronger than tea.|彼はお茶より強いものはめったに飲まない。
e7873|The old church is an impressive edifice.|その古い教会は堂々たる建築物だ。
e7874|The prodigal son spent all his money.|放蕩息子はお金を使い果たした。
e7875|The thyroid is part of the endocrine system.|甲状腺は内分泌系の一部だ。
e7876|The old castle has a certain mystique.|その古城にはある種の神秘性がある。
e7877|Are you insinuating that I lied?|私がうそをついたとほのめかしているの？
e7878|The two lawyers had an adversarial relationship.|その二人の弁護士は敵対関係にあった。
e7879|The movie's plot was hackneyed and dull.|その映画の筋は陳腐で退屈だった。
e7880|Stop wallowing in self-pity.|自己憐憫に浸るのはやめなさい。
e7881|Their trip across Africa was a real odyssey.|彼らのアフリカ横断はまさに長い冒険だった。
e7882|Crabs and shrimp are crustaceans.|カニやエビは甲殻類だ。
e7883|She made a trenchant comment about the plan.|彼女はその計画について鋭い意見を述べた。
e7884|The old king's progeny ruled for centuries.|老王の子孫が何世紀も統治した。
e7885|He is sanguine about his chances of winning.|彼は自分の勝つ見込みについて楽観的だ。
e7886|They hoisted the flag at sunrise.|彼らは日の出に旗を揚げた。
e7887|The politician's mendacity was finally exposed.|その政治家の虚偽がついに暴かれた。
e7888|The song ends with a strange dissonant chord.|その曲は奇妙な不協和音で終わる。
e7889|Our cantankerous neighbor complains about everything.|気難しい隣人は何にでも文句を言う。
e7890|As an epicure, he only eats the finest food.|美食家の彼は最高級の料理しか食べない。
e7891|Eating slowly helps you feel satiety sooner.|ゆっくり食べると早く満腹感を得られる。
e7892|Their dog has a long pedigree.|彼らの犬は由緒ある血統だ。
e7893|He received vitriolic comments online.|彼はネットで辛辣なコメントを受けた。
e7894|Stop equivocating and give me a clear answer.|言葉を濁さずにはっきり答えて。
e7895|Loneliness is a common malady of modern life.|孤独は現代生活によくある病だ。
e7896|He spent ten years in the state penitentiary.|彼は州刑務所で10年過ごした。
e7897|He did volunteer work as expiation for his mistakes.|彼は過ちの償いとしてボランティアをした。
e7898|Don't shirk your share of the housework.|家事の分担をさぼらないで。
e7899|Cleaning the toilet is an odious chore.|トイレ掃除はいやな家事だ。
e7900|She was nonplussed by his strange question.|彼女は彼の奇妙な質問に当惑した。
e7901|He caught a viral infection last week.|彼は先週ウイルス感染症にかかった。
e7902|New data buttressed her argument.|新しいデータが彼女の主張を裏付けた。
e7903|He has a deep antipathy toward liars.|彼はうそつきに強い反感を持っている。
e7904|We sat through an interminable meeting.|私たちは延々と続く会議に耐えた。
e7905|The usurper took the throne by force.|簒奪者は力ずくで王位を奪った。
e7906|A preponderance of evidence pointed to him.|証拠の大部分が彼を指していた。
e7907|The museum curator showed us the old paintings.|美術館の学芸員が古い絵を見せてくれた。
e7908|His rude comment still rankles with me.|彼の失礼な一言がいまだにしゃくにさわる。
e7909|The books were piled haphazardly on the floor.|本が床にでたらめに積まれていた。
e7910|Whether you like it is immaterial.|あなたが好きかどうかは重要ではない。
e7911|His first win was just a fluke.|彼の初勝利は単なるまぐれだった。
e7912|He felt like an outcast at his new school.|彼は新しい学校でのけ者のように感じた。
e7913|The novel describes a frightening dystopia.|その小説は恐ろしい暗黒世界を描いている。
e7914|Don't pass up this great chance.|この絶好のチャンスを逃さないで。
e7915|There was dissension within the team.|チーム内に意見の対立があった。
e7916|The salesman hoodwinked them into buying junk.|セールスマンは彼らをだましてがらくたを買わせた。
e7917|Math has always been my nemesis.|数学はずっと私の宿敵だ。
e7918|The doctor turned out to be an imposter.|その医者は偽者だとわかった。
e7919|The feeling of safety was illusory.|安全だという感覚は錯覚だった。
e7920|Enzymes help the body digest food.|酵素は体が食べ物を消化するのを助ける。
e7921|The speech had a xenophobic tone.|その演説には排外的な調子があった。
e7922|Grandpa is the patriarch of our family.|祖父は我が家の家長だ。
e7923|Please affix a stamp to the envelope.|封筒に切手を貼ってください。
e7924|The irascible old man yelled at the kids.|怒りっぽい老人は子どもたちを怒鳴りつけた。
e7925|The prisoner asked the governor for clemency.|囚人は知事に恩赦を求めた。
e7926|The military junta ruled for ten years.|軍事政権は10年間支配した。
e7927|The two farms are contiguous.|その二つの農場は隣接している。
e7928|He remained stoic despite the bad news.|悪い知らせにも彼は平然としていた。
e7929|We spent a languid summer afternoon by the pool.|私たちはプールのそばでけだるい夏の午後を過ごした。
e7930|Many birds feed in the river estuary.|多くの鳥が河口でえさを食べる。
e7931|Don't obfuscate the facts with jargon.|専門用語で事実をぼかさないで。
e7932|She coaxed the cat out from under the bed.|彼女はなだめすかして猫をベッドの下から出した。
e7933|The witness received a subpoena to appear in court.|証人は出廷を求める召喚状を受け取った。
e7934|Fear of the dark may be an atavistic instinct.|暗闇への恐れは先祖返りの本能かもしれない。
e7935|Religious fanaticism can lead to violence.|宗教的狂信は暴力につながることがある。
e7936|They live in a palatial house by the sea.|彼らは海辺の宮殿のような家に住んでいる。
e7937|I was hurt by the condescension in his voice.|彼の声に込められた見下した態度に傷ついた。
e7938|The dark clouds foreshadowed a storm.|黒い雲が嵐を予示していた。
e7939|He winced when the nurse gave him a shot.|看護師に注射されて彼は顔をしかめた。
e7940|Workers will be remunerated for overtime.|従業員には残業代が支払われる。
e7941|The movie's ending was too mawkish for me.|その映画の結末は私には感傷的すぎた。
e7942|Switzerland is a landlocked country.|スイスは内陸国だ。
e7943|A bedraggled puppy appeared at our door.|ずぶぬれの子犬が玄関に現れた。
e7944|We were impressed by her erudition.|私たちは彼女の博識に感心した。
e7945|She demurred when asked to work late.|残業を頼まれて彼女は難色を示した。
e7946|He is known for his iconoclastic ideas.|彼は型破りな考えで知られている。
e7947|The poem exalts the beauty of nature.|その詩は自然の美しさをほめたたえている。
e7948|Doctors used a serum to treat the snake bite.|医師たちは蛇にかまれた傷の治療に血清を使った。
e7949|His clever argument was just sophistry.|彼の巧妙な議論はただの詭弁だった。
e7950|She is famous for her acerbic wit.|彼女は辛辣な機知で有名だ。
e7951|The country was once ruled as a theocracy.|その国はかつて神権政治で統治されていた。
e7952|The robber brandished a knife.|強盗はナイフを振りかざした。
e7953|Sweating helps the body maintain homeostasis.|汗をかくことは体の恒常性維持に役立つ。
e7954|The government banned the subversive book.|政府はその反体制的な本を発禁にした。
e7955|We must fight bigotry in all its forms.|私たちはあらゆる形の偏見と戦わなければならない。
e7956|She bristled at his rude remark.|彼女は彼の失礼な発言にいきり立った。
e7957|His quixotic plan to end hunger failed.|飢餓をなくすという彼の非現実的な計画は失敗した。
e7958|After the accident, he suffered from amnesia.|事故の後、彼は記憶喪失になった。
e7959|The company was declared insolvent.|その会社は支払い不能と宣告された。
e7960|DNA evidence exonerated the man.|DNA証拠がその男の無実を証明した。
e7961|The coach castigated the team for being lazy.|コーチは怠けたチームを厳しく非難した。
e7962|They met clandestinely in the park.|彼らは公園でひそかに会った。
e7963|Shoplifting is often treated as a misdemeanor.|万引きは軽犯罪として扱われることが多い。
e7964|Drink water so you don't get dehydrated.|脱水症状にならないよう水を飲みなさい。
e7965|The court ordered restitution to the victims.|裁判所は被害者への賠償を命じた。
e7966|She handled the interview with poise.|彼女は落ち着いて面接をこなした。
e7967|His cruel behavior was indefensible.|彼の残酷なふるまいは弁解の余地がなかった。
e7968|The project is still in an embryonic stage.|その計画はまだ初期段階にある。
e7969|She cajoled her dad into buying ice cream.|彼女は父をおだててアイスを買ってもらった。
e7970|The people lived under foreign subjugation for years.|人々は長年外国の支配下で暮らした。
e7971|The truculent boy refused to apologize.|反抗的な少年は謝ろうとしなかった。
e7972|Investors are bullish about the market.|投資家たちは市場に強気だ。
e7973|He packed all his fishing paraphernalia.|彼は釣り道具一式を詰め込んだ。
e7974|Foreign dignitaries attended the ceremony.|外国の要人が式典に出席した。
e7975|Nothing could assuage her grief.|何も彼女の悲しみを和らげることはできなかった。
e7976|The day will live in infamy.|その日は汚名とともに記憶されるだろう。
e7977|The diffident student rarely spoke in class.|自信のない生徒は授業でめったに発言しなかった。
e7978|Let me recapitulate the main points.|要点をまとめさせてください。
e7979|She saw an orthopedic surgeon about her knee.|彼女はひざのことで整形外科医に診てもらった。
e7980|It was a heinous crime.|それは凶悪な犯罪だった。
e7981|A brawl broke out outside the bar.|バーの外で乱闘が起きた。
e7982|Fog shrouded the whole city.|霧が町全体を覆い隠した。
e7983|I think, ergo I am.|我思う、ゆえに我あり。
e7984|His levity at the funeral upset everyone.|葬儀での彼の不まじめな態度は皆を怒らせた。
e7985|Freedom is an abstraction, but it matters.|自由は抽象概念だが、大切なものだ。
e7986|My grandmother is a devout Christian.|祖母は信心深いキリスト教徒だ。
e7987|That word is often used in a pejorative sense.|その語はよく軽蔑的な意味で使われる。
e7988|The meeting turned into a complete farce.|その会議はまったくの茶番になった。
e7989|The company is a monolithic organization.|その会社は一枚岩の組織だ。
e7990|The police impounded his car.|警察は彼の車を押収した。
e7991|A cataclysm wiped out the dinosaurs.|大変動が恐竜を絶滅させた。
e7992|France is a secular country.|フランスは政教分離の国だ。
e7993|The unctuous salesman praised everything we chose.|調子のいい店員は私たちの選ぶものすべてをほめた。
e7994|The gallant knight saved the village.|勇敢な騎士は村を救った。
e7995|There wasn't a single blemish on the apple.|そのリンゴには傷一つなかった。
e7996|He writhed in pain on the floor.|彼は床の上で痛みにもだえた。
e7997|There was a tacit agreement not to discuss it.|それについては話さないという暗黙の了解があった。
e7998|Plasma makes up more than half of our blood.|血漿は血液の半分以上を占める。
e7999|Talking to his plants is one of his idiosyncrasies.|植物に話しかけるのは彼のくせの一つだ。
e8000|The perfidious friend sold our secret.|不誠実な友人は私たちの秘密を売った。
e8001|The housing market remained buoyant all year.|住宅市場は一年中好調だった。
e8002|His decision brought him public opprobrium.|彼の決断は世間の非難を招いた。
e8003|The divorce turned rancorous very quickly.|その離婚はすぐに恨みに満ちたものになった。
e8004|I was mortified when my phone rang in class.|授業中に電話が鳴って恥ずかしかった。
e8005|The company faces a major antitrust lawsuit.|その会社は大きな独占禁止訴訟に直面している。
e8006|There is no simple nostrum for poverty.|貧困を解決する簡単な万能薬はない。
e8007|Thank you for your candid opinion.|率直なご意見をありがとう。
e8008|He has a droll sense of humor.|彼にはとぼけたユーモアのセンスがある。
e8009|He transgressed the rules of the club.|彼はクラブの規則を破った。
e8010|Jet lag disrupts our circadian rhythm.|時差ぼけは体内時計を乱す。
e8011|She was loath to leave her friends.|彼女は友達と別れるのが気が進まなかった。
e8012|Security at the airport was surprisingly lax.|空港の警備は意外なほど緩かった。
e8013|He died a pauper despite his early fame.|若い頃の名声にもかかわらず彼は貧困のうちに死んだ。
e8014|Our garrulous neighbor talked for an hour.|おしゃべりな隣人が1時間も話した。
e8015|I recognized him by his unusual gait.|変わった歩き方で彼だとわかった。
e8016|A gratuity is included in the bill.|心付けは料金に含まれています。
e8017|I wear thermal underwear in winter.|冬は保温下着を着ている。
e8018|Power was devolved to local governments.|権限は地方政府に委譲された。
e8019|The garden was a veritable paradise.|その庭はまさに楽園だった。
e8020|They treated the newcomer as an interloper.|彼らは新入りを部外者扱いした。
e8021|She seemed aloof at the party.|彼女はパーティーでよそよそしく見えた。
e8022|A pleasant languor came over us after lunch.|昼食後、心地よいけだるさに包まれた。
e8023|There was jubilation in the streets after the victory.|勝利の後、街は歓喜に包まれた。
e8024|The police use canine units to find drugs.|警察は麻薬を探すのに警察犬部隊を使う。
e8025|The villain gave a malevolent smile.|悪役は悪意に満ちた笑みを浮かべた。
e8026|May I interject a quick comment?|ちょっと一言口をはさんでもいいですか。
e8027|Critics say the country is becoming a plutocracy.|批評家はその国が金権政治になりつつあると言う。
e8028|I'll forgo dessert tonight.|今夜はデザートを我慢する。
e8029|He was impeccably dressed for the interview.|彼は面接に申し分ない服装で臨んだ。
e8030|Visual acuity declines with age.|視力の鋭さは年齢とともに衰える。
e8031|The project sank into a morass of paperwork.|その計画は書類仕事の泥沼にはまった。
e8032|Fans besieged the singer at the airport.|ファンが空港で歌手に押し寄せた。
e8033|He woke early, as was his wont.|彼はいつものように早起きした。
e8034|A few malcontents tried to stir up trouble.|数人の不平分子が騒ぎを起こそうとした。
e8035|He made a jocular remark to ease the tension.|彼は緊張をほぐそうと冗談めかしたことを言った。
e8036|The witness was charged with perjury.|証人は偽証罪で起訴された。
e8037|Peter Piper is a famous example of alliteration.|ピーター・パイパーは頭韻の有名な例だ。
e8038|The two nations lived in concord for decades.|両国は何十年も協調して暮らした。
e8039|The clinic offers free care to indigent patients.|その診療所は貧しい患者に無料で治療を行う。
e8040|The boxer pummeled his opponent.|ボクサーは相手を殴り続けた。
e8041|The phone call was just a ruse to distract us.|その電話は私たちの気をそらす策略にすぎなかった。
e8042|Read the prospectus before you invest.|投資する前に目論見書を読みなさい。
e8043|Food went down his trachea and he coughed.|食べ物が気管に入って彼はせき込んだ。
e8044|The antiquarian studied the old coins carefully.|古物研究家はその古い硬貨を注意深く調べた。
e8045|Her voice had an ethereal quality.|彼女の声はこの世のものと思えない響きがあった。
e8046|The war was fueled by jingoism.|その戦争は好戦的愛国主義にあおられた。
e8047|Grandparents often dote on their grandchildren.|祖父母はよく孫を溺愛する。
e8048|She faced her illness with great fortitude.|彼女は不屈の精神で病気に立ち向かった。
e8049|Please behave with decorum at the ceremony.|式では礼儀正しくふるまってください。
e8050|The patient suffered a brain hemorrhage.|その患者は脳出血を起こした。
e8051|We drove up a tortuous mountain road.|私たちは曲がりくねった山道を車で登った。
e8052|The band played a slow dirge at the funeral.|楽団は葬儀でゆっくりとした哀歌を演奏した。
e8053|We waited for the storm to abate.|私たちは嵐がおさまるのを待った。
e8054|The village has a fairly homogeneous population.|その村の住民はかなり同質だ。
e8055|The poem has an elegiac tone.|その詩は哀調を帯びている。
e8056|She has a penchant for spicy food.|彼女は辛い食べ物が好みだ。
e8057|After the party, the kitchen was a shambles.|パーティーの後、台所はめちゃくちゃだった。
e8058|The divestiture of the unit raised much cash.|その部門の売却で多くの現金が得られた。
e8059|The soldier received a medal for valor.|その兵士は勇敢さをたたえて勲章を受けた。
e8060|The nurse was solicitous of her patients.|その看護師は患者たちを気遣っていた。
e8061|He sued the paper for defaming him.|彼は自分を中傷したとして新聞社を訴えた。
e8062|I feel ambivalent about moving abroad.|海外に引っ越すことには複雑な気持ちだ。
e8063|We visited a maritime museum in the port.|港の海事博物館を訪れた。
e8064|Not a vestige of the old castle remains.|古い城の痕跡はまったく残っていない。
e8065|She pored over the map before the trip.|彼女は旅行前に地図をじっくり調べた。
e8066|Stop fidgeting and sit still.|そわそわしないでじっと座っていなさい。
e8067|He's a hypocrite who never follows his own advice.|彼は自分の忠告を決して守らない偽善者だ。
e8068|The new phone was launched with great fanfare.|新しい電話は鳴り物入りで発売された。
e8069|Bilingualism is common in that region.|その地域では2言語使用が一般的だ。
e8070|The bad news deflated the whole team.|悪い知らせがチーム全体の気持ちをしぼませた。
e8071|This state is a bellwether for national elections.|この州は国政選挙の指標になっている。
e8072|The debonair actor charmed the audience.|あか抜けた俳優は観客を魅了した。
e8073|Liberty, equality, and fraternity are French ideals.|自由、平等、友愛はフランスの理想だ。
e8074|Whales have a mammalian heart like ours.|クジラには私たちと同じ哺乳類の心臓がある。
e8075|I implore you to reconsider.|考え直してくださるよう切にお願いします。
e8076|His mercurial temper made him hard to work with.|気まぐれな性格のせいで彼とは働きにくかった。
e8077|The trip rekindled their friendship.|その旅行で彼らの友情がよみがえった。
e8078|His reticence made him seem unfriendly.|無口なせいで彼は無愛想に見えた。
e8079|The pianist gave a bravura performance.|ピアニストは見事な妙技を披露した。
e8080|According to local lore, the lake is haunted.|地元の言い伝えでは、その湖には幽霊が出る。
e8081|The child gave a guileless smile.|その子は無邪気な笑顔を見せた。
e8082|The city has many ethnic restaurants.|その市にはたくさんのエスニック料理店がある。
e8083|The lighthouse beacon guided the ships home.|灯台の光が船を港へ導いた。
e8084|The scandal scuttled his plans for office.|そのスキャンダルが彼の出馬計画を台無しにした。
e8085|The villagers paid obeisance to the king.|村人たちは王に敬意を表した。
e8086|I travel vicariously through my sister's photos.|姉の写真を通して旅行気分を味わっている。
e8087|Lack of money is the main impediment.|資金不足が主な障害だ。
e8088|They walked through a primeval forest.|彼らは原生林の中を歩いた。
e8089|She is studying pharmacology at university.|彼女は大学で薬理学を学んでいる。
e8090|A delicious smell emanated from the kitchen.|台所からおいしそうなにおいが漂ってきた。
e8091|The machine dispenses hot drinks.|その機械は温かい飲み物を出す。
e8092|The concert was a complete debacle.|そのコンサートは完全な大失敗だった。
e8093|The report was written in turgid prose.|その報告書は仰々しい文体で書かれていた。
e8094|She looked pensive as she gazed out the window.|窓の外を見つめる彼女は物思いにふけっていた。
e8095|Lions and tigers are feline animals.|ライオンやトラはネコ科の動物だ。
e8096|Don't cast aspersions on his honesty.|彼の誠実さをけなすようなことは言うな。
e8097|The nascent industry needs government support.|その新興産業には政府の支援が必要だ。
e8098|The fans were euphoric after the win.|勝利の後、ファンは有頂天だった。
e8099|The big meal satiated our hunger.|たっぷりの食事で空腹が満たされた。
e8100|The matter must be handled with circumspection.|その件は慎重に扱わなければならない。
e8101|We heard the dulcet tones of a violin.|バイオリンの快い音色が聞こえた。
e8102|Bears are omnivores that eat plants and meat.|クマは植物も肉も食べる雑食動物だ。
e8103|My uncle is an inveterate gambler.|おじは根っからのギャンブラーだ。
e8104|The novel exposes the iniquity of slavery.|その小説は奴隷制の不正を暴いている。
e8105|He would never forsake his friends.|彼は決して友人を見捨てないだろう。
e8106|A mouse scurried across the floor.|ネズミが床をちょこちょこ走っていった。
e8107|The young director was a true iconoclast.|その若い監督はまさに因習打破主義者だった。
e8108|The soup was rather insipid.|そのスープはかなり味気なかった。
e8109|A convex lens can focus sunlight.|凸レンズは日光を集めることができる。
e8110|Marx wrote about the struggles of the proletariat.|マルクスは労働者階級の闘争について書いた。
e8111|The children performed in the Christmas pageant.|子どもたちはクリスマス劇に出演した。
e8112|He loves to pontificate about politics.|彼は政治について偉そうに語るのが好きだ。
e8113|We'll muddle through somehow without a plan.|計画がなくても何とか切り抜けよう。
e8114|Don't denigrate other people's efforts.|他人の努力をけなしてはいけない。
e8115|He practiced total abstinence from alcohol.|彼は酒を完全に断っていた。
e8116|Tobacco smoke contains many carcinogens.|たばこの煙には多くの発がん物質が含まれている。
e8117|Crying at the movie was a kind of catharsis.|映画で泣いたことは一種の心の浄化だった。
e8118|Don't be so gullible about online ads.|ネット広告をそんなに簡単に信じてはいけない。
e8119|The village had an insular attitude toward outsiders.|その村はよそ者に閉鎖的な態度をとっていた。
e8120|He endured years of public obloquy.|彼は何年も世間の悪評に耐えた。
e8121|She is convalescing at home after surgery.|彼女は手術後、自宅で療養している。
e8122|Put some antiseptic on that cut.|その切り傷に消毒薬を塗りなさい。
e8123|A noisome smell came from the drain.|排水口から不快なにおいがした。
e8124|She was prodigiously talented as a child.|彼女は子どもの頃から驚くほど才能があった。
e8125|Bullying a small child is despicable.|小さな子をいじめるのは卑劣だ。
e8126|The scale needs regular calibration.|その秤は定期的な較正が必要だ。
e8127|Bankers have a fiduciary duty to their clients.|銀行員は顧客に対して受託者としての義務を負う。
e8128|He woke from a drunken stupor.|彼は酔ってもうろうとした状態から目覚めた。
e8129|The king abdicated in favor of his son.|王は息子に譲位した。
e8130|Parents feel vicarious joy in their child's success.|親は子の成功に自分のことのような喜びを感じる。
e8131|Two witnesses corroborated her story.|2人の証人が彼女の話を裏付けた。
e8132|In hindsight, we should have left earlier.|今思えば、もっと早く出発すべきだった。
e8133|He looked crestfallen after losing the match.|試合に負けて彼はしょげていた。
e8134|The loquacious guide never stopped talking.|おしゃべりなガイドは話をやめなかった。
e8135|Fish, birds, and humans are all vertebrates.|魚も鳥も人間もみな脊椎動物だ。
e8136|The breed is known for its docility.|その品種はおとなしさで知られている。
e8137|Old traditions fettered their creativity.|古い伝統が彼らの創造性を縛った。
e8138|The city has a small artists' enclave.|その市には芸術家が集まる小さな地区がある。
e8139|She was shocked by his duplicity.|彼女は彼の二枚舌に衝撃を受けた。
e8140|We rode out the storm in the basement.|私たちは地下室で嵐をやり過ごした。
e8141|We did a qualitative study of customer views.|顧客の意見について質的調査を行った。
e8142|The museum received a generous bequest.|博物館は多額の遺贈を受けた。
e8143|Puppies frolicked in the grass.|子犬たちが草の上ではしゃいでいた。
e8144|The supine parliament approved every law.|無気力な議会はあらゆる法案を承認した。
e8145|Hard work can ennoble the spirit.|勤勉は精神を気高くすることがある。
e8146|The general was executed for treachery.|将軍は裏切りの罪で処刑された。
e8147|Online games need low network latency.|オンラインゲームには低いネットワーク遅延が必要だ。
e8148|The placenta feeds the growing baby.|胎盤は育っていく赤ちゃんに栄養を与える。
e8149|The harried waiter forgot our order.|忙しさに追われたウェイターは注文を忘れた。
e8150|Her frugality helped her save a lot.|倹約のおかげで彼女はたくさん貯金できた。
e8151|Heavy bags encumbered the hikers.|重い荷物がハイカーたちの足を引っ張った。
e8152|The horse is docile and easy to ride.|その馬はおとなしくて乗りやすい。
e8153|She felt repugnance at the cruel scene.|彼女はその残酷な場面に嫌悪を感じた。
e8154|Volunteering is an act of altruism.|ボランティアは利他的な行為だ。
e8155|They trumped up charges against the journalist.|彼らはその記者に対する容疑をでっち上げた。
e8156|He cast covetous eyes on his neighbor's car.|彼は隣人の車を物欲しげに見た。
e8157|I had an epiphany while taking a shower.|シャワーを浴びているときにひらめいた。
e8158|The fund will disburse money to farmers.|その基金は農家に資金を支払う。
e8159|Young voters are often called apathetic.|若い有権者はよく無関心だと言われる。
e8160|It was a brazen lie.|それは厚かましいうそだった。
e8161|The government expropriated private land for the road.|政府は道路用に私有地を収用した。
e8162|She never wavered in her decision.|彼女は決心が揺らぐことはなかった。
e8163|He has a latent talent for music.|彼には隠れた音楽の才能がある。
e8164|He called on the pretext of borrowing a book.|彼は本を借りるという口実で訪ねてきた。
e8165|Dad was apoplectic about the broken window.|父は割れた窓のことでかんかんに怒った。
e8166|Whisky is made by distillation.|ウイスキーは蒸留によって造られる。
e8167|They gave succor to the refugees.|彼らは難民に救いの手を差し伸べた。
e8168|He gingerly touched the hot pan.|彼は熱い鍋に恐る恐る触れた。
e8169|The money is earmarked for new books.|そのお金は新しい本の購入に充てられている。
e8170|The temple is dedicated to a sea deity.|その寺院は海の神にささげられている。
e8171|Scientists search for habitable planets.|科学者は居住可能な惑星を探している。
e8172|Police suspect arson in the factory fire.|警察は工場火災を放火と疑っている。
e8173|Few plants grow in this arid region.|この乾燥した地域ではほとんど植物が育たない。
e8174|The pompous manager ignored our ideas.|尊大な部長は私たちの意見を無視した。
e8175|He's always grousing about his job.|彼はいつも仕事のことでぼやいている。
e8176|The novel warns against totalitarianism.|その小説は全体主義に警鐘を鳴らしている。
e8177|He refused to divulge his sources.|彼は情報源を明かすことを拒んだ。
e8178|A snake slithered under the rock.|ヘビが岩の下にするすると入っていった。
e8179|Life may have begun in a primordial soup.|生命は原始スープの中で始まったのかもしれない。
e8180|The laws of physics are immutable.|物理法則は不変だ。
e8181|That ugly building is an abomination.|あの醜い建物は忌まわしい代物だ。
e8182|Soldiers guarded a remote outpost.|兵士たちは辺境の前哨基地を守った。
e8183|Trust is the bedrock of any friendship.|信頼はどんな友情においても基盤だ。
e8184|He lashed out at the reporters.|彼は記者たちを激しく非難した。
e8185|Plastic is a type of polymer.|プラスチックは重合体の一種だ。
e8186|The comedy show lampooned the president.|そのお笑い番組は大統領を風刺した。
e8187|The letter purports to be from the mayor.|その手紙は市長からのものだと称している。
e8188|She sighed in exasperation.|彼女はいらだってため息をついた。
e8189|The hapless tourist lost his passport again.|運の悪い旅行者はまたパスポートをなくした。
e8190|His narcissism annoyed his coworkers.|彼の自己愛の強さは同僚をうんざりさせた。
e8191|That rule seems anachronistic today.|その規則は今日では時代錯誤に思える。
e8192|The teacher beckoned me to come forward.|先生は私に前へ来るよう手招きした。
e8193|The milk had been adulterated with water.|その牛乳には水が混ぜられていた。
e8194|There has been a spate of burglaries lately.|最近、空き巣が相次いでいる。
e8195|He glanced furtively at his phone.|彼はこそこそと携帯電話に目をやった。
e8196|The school takes a holistic approach to education.|その学校は総合的な教育方針をとっている。
e8197|Garnish the fish with lemon slices.|魚にレモンの薄切りを添えなさい。
e8198|The meeting ended in tumult.|会議は大騒ぎのうちに終わった。
e8199|Grandpa chortled at his own joke.|祖父は自分の冗談にくっくっと笑った。
e8200|She dabbles in painting on weekends.|彼女は週末に絵をちょっとかじっている。
e8201|The company was dilatory in paying its bills.|その会社は支払いが遅れがちだった。
e8202|He launched into a tirade about taxes.|彼は税金について激しくまくし立てた。
e8203|The summer was a bonanza for ice cream shops.|その夏はアイス店にとって大当たりだった。
e8204|Henceforth, all meetings will start at nine.|今後、会議はすべて9時に始まります。
e8205|The article was a diatribe against modern art.|その記事は現代美術への痛烈な非難だった。
e8206|His words engendered a lot of anger.|彼の言葉は多くの怒りを生んだ。
e8207|There is a paucity of evidence for that claim.|その主張には証拠が乏しい。
e8208|He felt slothful after the long holiday.|長い休暇の後で彼はだらけた気分だった。
e8209|The factory released noxious fumes.|その工場は有害な煙を出した。
e8210|The mayor was indicted for bribery.|市長は収賄で起訴された。
e8211|Our meeting was entirely fortuitous.|私たちの出会いはまったくの偶然だった。
e8212|Each polity has its own laws.|それぞれの国家には独自の法律がある。
e8213|He tried to mollify the angry customer.|彼は怒った客をなだめようとした。
e8214|The pugnacious boy was always in trouble.|そのけんか好きな少年はいつも問題を起こしていた。
e8215|He finally escaped from his persecutors.|彼はついに迫害者から逃れた。
e8216|We watched the lunar eclipse last night.|昨夜、月食を見た。
e8217|He swore vengeance on his enemies.|彼は敵への復讐を誓った。
e8218|The boss was surrounded by sycophants.|社長はおべっか使いに囲まれていた。
e8219|How can I requite your kindness?|あなたの親切にどう報いればよいでしょう。
e8220|She made an apposite remark.|彼女は的を射た発言をした。
e8221|He smirked when I tripped.|私がつまずくと彼はにやにや笑った。
e8222|The dinner was full of warmth and conviviality.|その夕食会は温かさとなごやかさに満ちていた。
e8223|The test gave an anomalous result.|その検査は異常な結果を示した。
e8224|He is famous for his prowess as a chef.|彼は料理人としての腕前で有名だ。
e8225|The shop sold tawdry souvenirs.|その店は安っぽい土産物を売っていた。
e8226|Her vivacity made her popular.|彼女は快活さで人気があった。
e8227|It irks me when people are late.|人が遅れてくるといらいらする。
e8228|We will amortize the loan over ten years.|ローンは10年かけて分割返済する。
e8229|Pandemonium broke out when the lights went out.|明かりが消えると大混乱になった。
e8230|The wily fox escaped the hunters.|ずる賢いキツネは猟師から逃げた。
e8231|The event was held under the auspices of the UN.|その催しは国連の後援で行われた。
e8232|Smartphones are omnipresent these days.|最近はスマートフォンがどこにでもある。
e8233|She offered words of commiseration.|彼女は慰めの言葉をかけた。
e8234|The minister repudiated the accusation.|大臣はその告発を否認した。
e8235|The excuse was frankly risible.|その言い訳ははっきり言って笑止千万だった。
e8236|A city ordinance bans smoking in parks.|市の条例で公園での喫煙は禁止されている。
e8237|The deal was seen as a capitulation.|その取引は屈服と見なされた。
e8238|The new business began to flounder.|新しい事業は行き詰まり始めた。
e8239|She saw through his artifice.|彼女は彼の策略を見抜いた。
e8240|He gave a peremptory order to leave.|彼は有無を言わせず立ち去るよう命じた。
e8241|Trade depends on reciprocity between nations.|貿易は国家間の互恵に依存している。
e8242|Blood coagulates when it meets air.|血液は空気に触れると固まる。
e8243|Don't coddle the kids too much.|子どもたちを甘やかしすぎてはいけない。
e8244|The country fell into anarchy after the war.|その国は戦後、無政府状態に陥った。
e8245|My grandmother taught me the value of thrift.|祖母は倹約の大切さを教えてくれた。
e8246|Don't take antibiotics indiscriminately.|抗生物質をむやみに飲んではいけない。
e8247|We couldn't vote without a quorum.|定足数に達していなかったので採決できなかった。
e8248|She works in a pediatric hospital.|彼女は小児病院で働いている。
e8249|He was beguiled by her charm.|彼は彼女の魅力にすっかり惑わされた。
e8250|She gave a litany of complaints.|彼女は不満を延々と並べ立てた。
e8251|This medicine is efficacious against colds.|この薬は風邪に効き目がある。
e8252|She is the incarnation of kindness.|彼女は優しさの化身だ。
e8253|The plot of the movie was too convoluted.|その映画の筋は込み入りすぎていた。
e8254|Monkeys live in the forest canopy.|サルは森の林冠に住んでいる。
e8255|The bank faced a liquidity crisis.|その銀行は資金繰りの危機に直面した。
e8256|The obnoxious man kept shouting on the train.|その不愉快な男は電車で叫び続けた。
e8257|The speech was full of vacuous slogans.|その演説は中身のないスローガンばかりだった。
e8258|The police commandeered a taxi to chase the thief.|警察は泥棒を追うためにタクシーを徴用した。
e8259|Many families live in squalor.|多くの家族が不潔な環境で暮らしている。
e8260|Flames engulfed the old house.|炎が古い家を飲み込んだ。
e8261|Do you believe in extraterrestrial life?|地球外生命を信じますか。
e8262|The disconsolate boy cried for his lost dog.|悲嘆に暮れた少年はいなくなった犬を思って泣いた。
e8263|It was a clever stratagem to win the game.|それは試合に勝つための巧みな計略だった。
e8264|He was a savant in ancient languages.|彼は古代言語の大家だった。
e8265|The project was beset by problems.|その計画は問題続きだった。
e8266|She gave a lucid explanation.|彼女はわかりやすい説明をした。
e8267|The heat filled me with lassitude.|暑さで体がだるくなった。
e8268|The view from the summit was sublime.|山頂からの眺めは崇高だった。
e8269|He studied pathology at medical school.|彼は医学部で病理学を学んだ。
e8270|The book has a charming sense of whimsy.|その本には魅力的な遊び心がある。
e8271|He feigned illness to skip school.|彼は学校をサボるために仮病を使った。
e8272|Stop being facetious; this is serious.|ふざけるのはやめて、これは真剣な話だ。
e8273|Honesty is a basic tenet of our company.|誠実さはわが社の基本的な信条だ。
e8274|Judges must be people of probity.|裁判官は誠実な人でなければならない。
e8275|Cultural relativism respects other values.|文化相対主義は他の価値観を尊重する。
e8276|His uncouth manners embarrassed his parents.|彼の無作法なふるまいは両親に恥をかかせた。
e8277|Welcome to my humble abode.|むさくるしい所ですがようこそ。
e8278|The ad made mendacious claims.|その広告は虚偽の主張をしていた。
e8279|I shudder to think what might have happened.|何が起きていたかと思うとぞっとする。
e8280|They goaded him into a fight.|彼らは彼をけしかけてけんかをさせた。
e8281|The old man was a lonely misanthrope.|その老人は孤独な人間嫌いだった。
e8282|The bones fossilized over millions of years.|その骨は何百万年もかけて化石化した。
e8283|The sagacious leader avoided a war.|賢明な指導者は戦争を回避した。
e8284|We live at the end of a quiet cul-de-sac.|私たちは静かな袋小路の奥に住んでいる。
e8285|Many people decried the new tax.|多くの人が新しい税を公然と非難した。
e8286|Let me cogitate on that for a while.|それについてしばらくじっくり考えさせて。
e8287|The cheers emboldened the young singer.|声援が若い歌手を勇気づけた。
e8288|A syndicate of banks funded the project.|銀行の連合がその事業に融資した。
e8289|Scientists mapped the human genome.|科学者たちはヒトゲノムを解読した。
e8290|He found a heretofore unknown species.|彼はこれまで知られていなかった種を発見した。
e8291|Bears enter a state of torpor in winter.|クマは冬に休眠状態に入る。
e8292|He was summarily fired.|彼は即座に解雇された。
e8293|Nothing seems to perturb her.|何があっても彼女は動じないようだ。
e8294|The swimmer flailed his arms in panic.|泳者はパニックになって腕をばたつかせた。
e8295|Sunscreen protects against ultraviolet rays.|日焼け止めは紫外線から肌を守る。
e8296|His remark was an affront to her pride.|彼の発言は彼女の誇りに対する侮辱だった。
e8297|The tricky question flummoxed everyone.|その難問にみんな当惑した。
e8298|I was hurt by his ingratitude.|彼の恩知らずな態度に傷ついた。
e8299|The town's moribund economy needs new jobs.|町の衰退しかけた経済には新たな雇用が必要だ。
e8300|The cult indoctrinated its young members.|そのカルトは若い信者を洗脳した。
e8301|Carbon-14 is a radioactive isotope.|炭素14は放射性同位体だ。
e8302|Could you elucidate your point a little?|ご主張をもう少し説明していただけますか。
e8303|He wrote an elegy for his late friend.|彼は亡き友のために哀歌を書いた。
e8304|The hostel rooms were clean but spartan.|ホステルの部屋は清潔だが質素だった。
e8305|The police need corroboration of his story.|警察は彼の話の裏付けを必要としている。
e8306|Don't belittle your own achievements.|自分の業績を過小評価してはいけない。
e8307|We studied the morphology of leaves.|私たちは葉の形態を研究した。
e8308|The clever girl outwitted the thief.|賢い少女は泥棒の裏をかいた。
e8309|The dour old man rarely smiled.|陰気な老人はめったに笑わなかった。
e8310|Budget cuts have hamstrung the project.|予算削減がその計画の足を引っ張っている。
e8311|His flippancy upset the grieving family.|彼の軽薄な態度は悲しむ家族を怒らせた。
e8312|After much prevarication, he finally answered.|さんざん言い逃れをした後、彼はやっと答えた。
e8313|Doctors removed the tumor successfully.|医師たちは腫瘍の摘出に成功した。
e8314|She cast a furtive glance at the clock.|彼女はこっそり時計に目をやった。
e8315|The timorous puppy hid behind the sofa.|臆病な子犬はソファの後ろに隠れた。
e8316|The hiker was mauled by a bear.|ハイカーはクマに襲われて大けがをした。
e8317|The debate caused a schism in the party.|その議論は党内の分裂を引き起こした。
e8318|The movie's dialogue was banal.|その映画のせりふは陳腐だった。
e8319|Priests in that church take a vow of celibacy.|その教会の司祭は独身の誓いを立てる。
e8320|The critic made astringent comments about the film.|批評家はその映画について辛辣な意見を述べた。
e8321|Sharks are carnivorous fish.|サメは肉食の魚だ。
e8322|She lulled the baby to sleep with a song.|彼女は歌で赤ちゃんを寝かしつけた。
e8323|The sounds of revelry went on all night.|お祭り騒ぎの音が一晩中続いた。
e8324|The party disavowed his remarks.|党は彼の発言との関係を否定した。
e8325|She answered in a tremulous voice.|彼女は震える声で答えた。
e8326|Tuberculosis was once a common disease.|結核はかつてありふれた病気だった。
e8327|The ancient game is an antecedent of modern soccer.|その古代の遊びは現代サッカーの前身だ。
e8328|The dexterous chef cut vegetables quickly.|器用な料理人は野菜を素早く切った。
e8329|Cleaning the whole house was a herculean task.|家じゅうを掃除するのは大変な仕事だった。
e8330|You can go, with the proviso that you return by six.|6時までに帰るという条件で行っていいよ。
e8331|They scoffed at his crazy idea.|彼らは彼の突飛な考えをあざ笑った。
e8332|Many saw the new law as a retrograde step.|多くの人が新法を後退だと見た。
e8333|We rode an amphibious bus into the river.|私たちは水陸両用バスで川に入った。
e8334|His bad grade was just an aberration.|彼の悪い成績は一時的な異常にすぎなかった。
e8335|Burglars ransacked the apartment.|泥棒がアパートを荒らした。
e8336|The city is clamping down on illegal parking.|市は違法駐車を取り締まっている。
e8337|Biology uses a strict nomenclature for species.|生物学では種に厳密な命名法を用いる。
e8338|The teacher helped many wayward teens.|その先生は多くの手に負えない若者を助けた。
e8339|She was inducted into the Hall of Fame.|彼女は殿堂入りした。
e8340|The island's fauna includes rare birds.|その島の動物相には珍しい鳥が含まれる。
e8341|Don't ask such impertinent questions.|そんなぶしつけな質問をしてはいけない。
e8342|She recoiled at the sight of the spider.|彼女はクモを見て後ずさりした。
e8343|The army faced total annihilation.|その軍は全滅の危機に直面した。
e8344|He received an award for meritorious service.|彼は功労に対して賞を受けた。
e8345|The comment was a slur on her character.|その発言は彼女の人格に対する中傷だった。
e8346|Fans jostled for a view of the star.|ファンはスターを見ようと押し合った。
e8347|The dauntless explorer kept going.|ひるむことのない探検家は進み続けた。
e8348|Melanin is the pigment in our skin.|メラニンは皮膚の色素だ。
e8349|She acted as a surrogate mother to the orphan.|彼女はその孤児の母親代わりを務めた。
e8350|Her cancer is now in remission.|彼女のがんは現在寛解している。
e8351|The impudent boy talked back to the teacher.|生意気な少年は先生に口答えした。
e8352|The witch muttered an incantation.|魔女は呪文をつぶやいた。
e8353|She loves dinosaurs and wants to study paleontology.|彼女は恐竜が大好きで古生物学を学びたがっている。
e8354|He yanked the door open.|彼はドアをぐいと引いて開けた。
e8355|Those were heady days for the young band.|それは若いバンドにとって浮き立つような日々だった。
e8356|She smothered the fire with a blanket.|彼女は毛布で火を覆って消した。
e8357|His pallor worried the doctor.|彼の顔色の悪さを医師は心配した。
e8358|The recalcitrant mule refused to move.|言うことを聞かないラバは動こうとしなかった。
e8359|Iceland uses geothermal energy for heating.|アイスランドは暖房に地熱エネルギーを使う。
e8360|There was no personal animus between them.|彼らの間に個人的な敵意はなかった。
e8361|The smell whetted my appetite.|そのにおいが食欲をそそった。
e8362|She wore a diaphanous silk scarf.|彼女は透き通った絹のスカーフを巻いていた。
e8363|The film pays homage to old westerns.|その映画は昔の西部劇にオマージュをささげている。
e8364|That year was the nadir of his career.|その年は彼のキャリアのどん底だった。
e8365|The factious committee could not agree.|派閥争いの激しい委員会はまとまらなかった。
e8366|Epidemiology helps us track diseases.|疫学は病気の広がりを追跡するのに役立つ。
e8367|The lamp has a translucent glass shade.|そのランプには半透明のガラスの笠がついている。
e8368|A knock at the door broke my reverie.|ドアのノックで私の空想は破られた。
e8369|The problem vexed scientists for years.|その問題は長年科学者を悩ませた。
e8370|She was a piano prodigy at age five.|彼女は5歳でピアノの神童だった。
e8371|He left of his own volition.|彼は自分の意志で去った。
e8372|It would be churlish to refuse her gift.|彼女の贈り物を断るのは失礼だろう。
e8373|Car engines work by internal combustion.|車のエンジンは内燃によって動く。
e8374|She claims to have the gift of clairvoyance.|彼女は透視力があると言っている。
e8375|Smartphones have supplanted digital cameras.|スマートフォンがデジタルカメラに取って代わった。
e8376|It was an auspicious start to the season.|それはシーズンの幸先のよい出だしだった。
e8377|The navy interdicted drug shipments.|海軍は麻薬の輸送を阻止した。
e8378|It's a cerebral film with little action.|それはアクションの少ない知的な映画だ。
e8379|The museum shows a facsimile of the old map.|博物館はその古地図の複製を展示している。
e8380|Demography shows that the population is aging.|人口統計学によれば人口は高齢化している。
e8381|They parted without rancor.|彼らは恨みを残さずに別れた。
e8382|The phlegmatic pilot stayed calm in the storm.|冷静な操縦士は嵐の中でも落ち着いていた。
e8383|The title piqued my curiosity.|その題名が私の好奇心をそそった。
e8384|It's a fallacy that money brings happiness.|お金が幸せをもたらすというのは誤った考えだ。
e8385|After the scandal, he became a social pariah.|スキャンダルの後、彼は社会ののけ者になった。
e8386|Teleology explains things by their purpose.|目的論は物事をその目的によって説明する。
e8387|She made an impassioned speech for peace.|彼女は平和を訴える熱のこもった演説をした。
e8388|He surreptitiously checked his phone during dinner.|彼は夕食中にこっそり携帯を確認した。
e8389|He is the scion of a wealthy family.|彼は裕福な一家の御曹司だ。
e8390|She felt elation when she passed the exam.|試験に合格して彼女は大喜びした。
e8391|The drug palliates pain but cannot cure it.|その薬は痛みを和らげるが治すことはできない。
e8392|Day and night are equal at the equinox.|春分と秋分には昼と夜の長さが同じになる。
e8393|Show a modicum of respect, please.|少しは敬意を示してください。
e8394|I feel lethargic after eating too much.|食べすぎると体がだるくなる。
e8395|The empire sought hegemony over the region.|その帝国は地域の覇権を求めた。
e8396|The shop enticed customers with free samples.|その店は無料試供品で客を誘い込んだ。
e8397|The company tried to burnish its image.|その会社はイメージを磨こうとした。
e8398|The story about the apple is probably apocryphal.|そのリンゴの話はおそらく作り話だ。
e8399|He had a paroxysm of coughing.|彼は激しくせき込む発作を起こした。
e8400|The new car has an aerodynamic shape.|新しい車は空気抵抗の少ない形をしている。
e8401|His job was a sinecure with a big salary.|彼の仕事は高給の閑職だった。
e8402|The president sent a special envoy to the talks.|大統領は会談に特使を派遣した。
e8403|Our new neighbor is an affable man.|新しい隣人は愛想のよい人だ。
e8404|The war left many families destitute.|戦争で多くの家族が極貧に陥った。
e8405|Stop moping and go outside.|ふさぎ込んでないで外に出なさい。
e8406|The dispute went to adjudication.|その紛争は裁定に持ち込まれた。
e8407|He had the temerity to ask for a raise.|彼は図々しくも昇給を求めた。
e8408|The boy looked contrite after breaking the vase.|少年は花瓶を割って後悔している様子だった。
e8409|Street vendors importuned the tourists.|露天商たちは観光客にしつこく売りつけた。
e8410|His defection shocked the party.|彼の離党は党に衝撃を与えた。
e8411|Filling in tax forms is an onerous task.|税の書類記入は厄介な作業だ。
e8412|The witness signed an affidavit.|証人は宣誓供述書に署名した。
e8413|The manager absconded with the company's money.|支配人は会社の金を持ち逃げした。
e8414|The school was built through his munificence.|その学校は彼の気前のよい寄付で建てられた。
e8415|The team chalked up another victory.|チームはまた勝利を挙げた。
e8416|He made spurious claims about his past.|彼は自分の過去について根拠のない主張をした。
e8417|Cherry blossoms remind us of life's transience.|桜は人生のはかなさを思い出させる。
e8418|She wrote an ethnography of a mountain village.|彼女はある山村の民族誌を書いた。
e8419|It was an innocuous question.|それは当たり障りのない質問だった。
e8420|Grapes ferment to make wine.|ブドウは発酵してワインになる。
e8421|I had a visceral dislike of the place.|私はその場所に本能的な嫌悪を感じた。
e8422|The court ordered punitive damages.|裁判所は懲罰的損害賠償を命じた。
e8423|His irascibility made him hard to live with.|怒りっぽい性格のせいで彼とは暮らしにくかった。
e8424|Doctors are fallible like everyone else.|医者も他の人と同じく間違えることがある。
e8425|He categorically denied the rumor.|彼はそのうわさをきっぱり否定した。
e8426|The seeds germinate in about a week.|種は1週間ほどで発芽する。
e8427|Teachers must study pedagogy in college.|教師は大学で教育学を学ばなければならない。
e8428|The speaker inveighed against corruption.|演説者は汚職を激しく非難した。
e8429|There was long-standing enmity between the families.|両家には長年の反目があった。
e8430|Acrid smoke filled the room.|鼻をつく煙が部屋に充満した。
e8431|Two teams are vying for first place.|2チームが首位を争っている。
e8432|Humans have 46 chromosomes.|人間には46本の染色体がある。
e8433|She is chary of trusting strangers.|彼女は見知らぬ人を信用することに慎重だ。
e8434|He claimed he saw an apparition in the hall.|彼は廊下で幽霊を見たと言った。
e8435|The obsequious waiter bowed again and again.|こびへつらうウェイターは何度もお辞儀をした。
e8436|The soldier wore his rank insignia.|兵士は階級章をつけていた。
e8437|He suffers from a vascular disease.|彼は血管の病気を患っている。
e8438|The case brought him unwanted notoriety.|その事件で彼は望まない悪名を得た。
e8439|We must fight racism and xenophobia.|私たちは人種差別や外国人嫌いと闘わねばならない。
e8440|She fastidiously cleaned every corner.|彼女は隅々まで入念に掃除した。
e8441|She nudged me to stop talking.|彼女は私をつついて話をやめるよう促した。
e8442|A small cabal controlled the company.|少数の陰謀団が会社を牛耳っていた。
e8443|He doggedly practiced every day.|彼は毎日粘り強く練習した。
e8444|The office had bright fluorescent lights.|事務所には明るい蛍光灯がついていた。
e8445|His silence was tantamount to a confession.|彼の沈黙は自白も同然だった。
e8446|The bill was watered down by lawmakers.|その法案は議員たちによって骨抜きにされた。
e8447|She is a paragon of patience.|彼女は忍耐の鑑だ。
e8448|He was seething with anger.|彼ははらわたが煮えくり返っていた。
e8449|Their friendship was irrevocably damaged.|彼らの友情は取り返しがつかないほど傷ついた。
e8450|Science often uses inductive reasoning.|科学はしばしば帰納的推論を用いる。
e8451|These photos are saved for posterity.|これらの写真は後世のために保存されている。
e8452|She had a quick rejoinder for every insult.|彼女はどんな侮辱にもすぐ言い返した。
e8453|She gave him a coy smile.|彼女は彼にはにかんだ笑顔を見せた。
e8454|I plowed through a pile of homework.|山のような宿題を苦労して片づけた。
e8455|Alchemists tried to transmute lead into gold.|錬金術師は鉛を金に変えようとした。
e8456|Scotland gained more power through devolution.|スコットランドは権限委譲でより多くの権限を得た。
e8457|Scientists postulate that life began in the sea.|科学者は生命が海で誕生したと仮定している。
e8458|The pay raise is retroactive to April.|昇給は4月にさかのぼって適用される。
e8459|Many old people live in indigence.|多くの高齢者が困窮の中で暮らしている。
e8460|The boss finally caved in to our demands.|上司はついに私たちの要求に折れた。
e8461|Stop procrastinating and start your essay.|後回しにしないで作文を始めなさい。
e8462|He tore a ligament in his knee.|彼はひざの靱帯を切った。
e8463|A cacophony of horns filled the street.|クラクションの騒音が通りに響き渡った。
e8464|Her smile belied her sadness.|彼女の笑顔は悲しみを隠していた。
e8465|That was a blatant lie.|それは見え透いたうそだった。
e8466|I read the news to keep abreast of events.|出来事に遅れないようニュースを読んでいる。
e8467|The so-called doctor was a charlatan.|そのいわゆる医者はペテン師だった。
e8468|The doctor gave him a mild sedative.|医師は彼に軽い鎮静剤を与えた。
e8469|Too many details muddled the story.|細かすぎる情報が話を混乱させた。
e8470|The coach called out in a stentorian voice.|コーチは大声で呼びかけた。
e8471|The story is an allegory of good and evil.|その物語は善と悪の寓話だ。
e8472|The country was torn by civil strife.|その国は内紛で引き裂かれた。
e8473|The town depends on the largesse of one company.|その町はある一社の気前のよさに頼っている。
e8474|He's always carping about the food.|彼はいつも食べ物にけちをつけている。
e8475|He is now a professor emeritus.|彼は今は名誉教授だ。
e8476|His plans for the future are nebulous.|彼の将来の計画は漠然としている。
e8477|It's hard to apportion blame fairly.|責任を公平に割り振るのは難しい。
e8478|They believed providence had saved them.|彼らは神の導きに救われたと信じた。
e8479|I give no credence to such rumors.|私はそんなうわさは信じない。
e8480|He gave a wry smile at the news.|その知らせに彼は苦笑いを浮かべた。
e8481|Social mores change over time.|社会の慣習は時代とともに変わる。
e8482|A moving car has kinetic energy.|走っている車は運動エネルギーを持つ。
e8483|Let's not quibble over small details.|細かいことでとやかく言うのはやめよう。
e8484|She was known for her piety.|彼女は信心深さで知られていた。
e8485|Don't fret; everything will be fine.|くよくよしないで、きっと大丈夫だよ。
e8486|He was amenable to our suggestion.|彼は私たちの提案に快く応じた。
e8487|The skittish horse jumped at the noise.|臆病な馬は物音に飛び上がった。
e8488|Chauvinism can lead to conflict between nations.|排他的愛国主義は国家間の対立を招くことがある。
e8489|The 1970s saw a period of stagflation.|1970年代にはスタグフレーションの時期があった。
e8490|The surly clerk didn't say hello.|無愛想な店員はあいさつもしなかった。
e8491|They offered gifts to propitiate the gods.|彼らは神々をなだめるため供え物をした。
e8492|The police tested the driver's sobriety.|警察は運転手が酒に酔っていないか検査した。
e8493|He was a maverick in the world of politics.|彼は政界の一匹狼だった。
e8494|The dam has a hydroelectric power plant.|そのダムには水力発電所がある。
e8495|He was accused of apostasy for leaving the church.|彼は教会を去ったことで背教者だと非難された。
e8496|She took copious notes in class.|彼女は授業でたくさんのノートをとった。
e8497|A motley crew of volunteers showed up.|雑多な顔ぶれのボランティアが集まった。
e8498|He is fastidious about his clothes.|彼は服装にうるさい。
e8499|The bridge buckled under the weight.|橋は重みで曲がった。
e8500|He is the archetype of a hero.|彼は英雄の典型だ。
e8501|Crabs and insects have a hard exoskeleton.|カニや昆虫には硬い外骨格がある。
e8502|The waiter gave us a supercilious smile.|ウェイターは私たちに横柄な笑みを向けた。
e8503|His speech was full of trite phrases.|彼のスピーチは陳腐な言い回しばかりだった。
e8504|Money is not a panacea for every problem.|お金はあらゆる問題の万能薬ではない。
e8505|The friends enjoyed some friendly banter at dinner.|友人たちは夕食で楽しい冗談を言い合った。
e8506|Please don't disparage other people's work.|他人の作品をけなさないでください。
e8507|Shouting at the waiter was unseemly behavior.|ウェイターに怒鳴るのは見苦しい振る舞いだった。
e8508|Scientists are studying avian flu in wild birds.|科学者たちは野鳥の鳥インフルエンザを研究している。
e8509|The report was too prolix to read quickly.|その報告書は冗長すぎてすぐには読めなかった。
e8510|Kudos to the team for finishing on time.|期限内に終えたチームに称賛を送りたい。
e8511|She gave me an incredulous look.|彼女は信じられないという顔で私を見た。
e8512|I gleaned a lot of information from the book.|その本から多くの情報を集めた。
e8513|My mother likes to haggle at the market.|母は市場で値切るのが好きだ。
e8514|The king earned the epithet "the Great."|その王は「大王」というあだ名を得た。
e8515|The epidermis protects the body from germs.|表皮は体を細菌から守る。
e8516|Everyone admired the judge's moral rectitude.|誰もがその判事の道徳的な正直さを称賛した。
e8517|My uncle is a staid and serious man.|私のおじは堅苦しくまじめな人だ。
e8518|The inexorable rise in prices worries everyone.|容赦ない物価上昇に誰もが悩んでいる。
e8519|Doctors found signs of an incipient illness.|医師たちは病気の初期の兆候を見つけた。
e8520|A stranger accosted me on the street.|見知らぬ人が通りで私に声をかけてきた。
e8521|Owls are denizens of the forest.|フクロウは森の住人だ。
e8522|Pine trees are a type of conifer.|松は針葉樹の一種だ。
e8523|His flippant reply made the teacher angry.|彼の軽薄な返事は先生を怒らせた。
e8524|The heavy rain precluded us from going out.|大雨で私たちは外出できなかった。
e8525|We saw Paleolithic tools at the museum.|博物館で旧石器時代の道具を見た。
e8526|The impecunious student lived on instant noodles.|無一文の学生はインスタント麺で暮らしていた。
e8527|The company is in the vanguard of green technology.|その会社は環境技術の先駆者だ。
e8528|I commiserated with my friend about her exam.|試験のことで友人に同情した。
e8529|The wizened old man smiled at the children.|しわだらけの老人が子どもたちに微笑んだ。
e8530|These rules pertain to all students.|これらの規則はすべての生徒に関係する。
e8531|A munificent donor paid for the new library.|気前のよい寄付者が新しい図書館の費用を出した。
e8532|She is studying sociolinguistics at university.|彼女は大学で社会言語学を学んでいる。
e8533|The winner showed magnanimity toward his rival.|勝者はライバルに寛大さを見せた。
e8534|Critics lambasted the new movie.|評論家たちはその新作映画をこき下ろした。
e8535|Don't gloss over your mistakes.|自分の失敗を取り繕ってはいけない。
e8536|He had no scruples about lying.|彼はうそをつくことに何のためらいもなかった。
e8537|I can't fathom why she quit her job.|彼女がなぜ仕事を辞めたのか理解できない。
e8538|The suspect was extradited to his home country.|容疑者は母国へ引き渡された。
e8539|The old building was razed to the ground.|その古い建物は跡形もなく取り壊された。
e8540|He lived like a hermit in the mountains.|彼は山で世捨て人のように暮らした。
e8541|Some politicians pander to voters.|有権者に迎合する政治家もいる。
e8542|We need a disinterested judge for the contest.|コンテストには公平な審査員が必要だ。
e8543|Many illiterate adults learned to read at the school.|読み書きのできない多くの大人がその学校で読み方を学んだ。
e8544|My brothers always bicker over the TV.|兄たちはいつもテレビのことで口げんかする。
e8545|All the children were inoculated against measles.|子どもたちは全員はしかの予防接種を受けた。
e8546|She keeps her kitchen scrupulously clean.|彼女は台所をきちょうめんに清潔に保っている。
e8547|The heavy bag was an encumbrance on the hike.|重いかばんはハイキングで重荷になった。
e8548|The old man glowered at the noisy kids.|老人はうるさい子どもたちをにらみつけた。
e8549|The internet helped the propagation of new ideas.|インターネットは新しい考えの普及を助けた。
e8550|Please keep me apprised of any changes.|変更があれば私に知らせてください。
e8551|Molten lava flowed down the mountain.|溶けた溶岩が山を流れ下った。
e8552|Doctors tested the efficacy of the new drug.|医師たちは新薬の効能を試験した。
e8553|Our coach has very exacting standards.|私たちのコーチは非常に厳しい基準を持っている。
e8554|A lighthouse stands on the rocky promontory.|岩だらけの岬に灯台が立っている。
e8555|You will rue the day you said that.|そんなことを言った日をきっと後悔するよ。
e8556|Notwithstanding the rain, the game continued.|雨にもかかわらず、試合は続いた。
e8557|The sailors staged a mutiny against the captain.|船員たちは船長に対して反乱を起こした。
e8558|The novel describes the decadence of the rich.|その小説は金持ちの退廃を描いている。
e8559|The professor was surrounded by his acolytes.|教授は取り巻きに囲まれていた。
e8560|She repeated his words verbatim.|彼女は彼の言葉を一字一句そのまま繰り返した。
e8561|He ruminated on his future all night.|彼は一晩中自分の将来について思いめぐらした。
e8562|She wants to monetize her cooking videos.|彼女は料理動画を収益化したいと思っている。
e8563|The author wrote under a pseudonym.|その作家はペンネームで執筆した。
e8564|The minister was caught in a political imbroglio.|大臣は政治的な紛糾に巻き込まれた。
e8565|My grandfather looked dapper in his new suit.|祖父は新しいスーツでこざっぱりして見えた。
e8566|They lived in felicity for many years.|彼らは何年も至福の中で暮らした。
e8567|The river teems with fish in spring.|春になるとその川は魚で満ちている。
e8568|Elephants are the largest terrestrial animals.|ゾウは最大の陸生動物だ。
e8569|Lincoln was a great orator.|リンカーンは偉大な演説者だった。
e8570|The critic wrote an encomium to the young pianist.|評論家はその若いピアニストに賛辞を書いた。
e8571|There is a demonstrable link between sleep and health.|睡眠と健康には証明できる関連がある。
e8572|The bakery sells delectable cakes.|そのパン屋はおいしいケーキを売っている。
e8573|This bread is made by a local artisan.|このパンは地元の職人が作っている。
e8574|No one can gainsay her talent.|彼女の才能は誰も否定できない。
e8575|Eye color is decided by heredity.|目の色は遺伝で決まる。
e8576|We felt ineffable joy at the baby's birth.|赤ちゃんが生まれて言いようのない喜びを感じた。
e8577|This feeling is akin to homesickness.|この気持ちはホームシックに似ている。
e8578|There is long antagonism between the two groups.|その2つのグループには長い敵対関係がある。
e8579|Traffic jams are an intractable problem in big cities.|交通渋滞は大都市の手に負えない問題だ。
e8580|He made a fatuous remark at the meeting.|彼は会議で愚かな発言をした。
e8581|The scam took advantage of people's credulity.|その詐欺は人々の信じやすさにつけこんだ。
e8582|Without exercise, muscles suffer atrophy.|運動しないと筋肉は萎縮する。
e8583|A teacher arbitrated the dispute between the students.|先生が生徒間のもめごとを仲裁した。
e8584|She remonstrated with the referee about the call.|彼女はその判定について審判に抗議した。
e8585|The weather in spring is fickle.|春の天気は気まぐれだ。
e8586|The meeting ended in angry recriminations.|会議は怒りの非難の応酬で終わった。
e8587|The government was criticized for profligate spending.|政府は浪費的な支出を批判された。
e8588|We learned the Pythagorean theorem in math class.|数学の授業でピタゴラスの定理を学んだ。
e8589|There is a plethora of apps for learning English.|英語学習用のアプリは山ほどある。
e8590|The newspaper was accused of libeling the actor.|その新聞は俳優を中傷したとして訴えられた。
e8591|The crux of the problem is a lack of money.|問題の核心は資金不足だ。
e8592|Many people protested the iniquitous tax.|多くの人がその不当な税に抗議した。
e8593|He is an agnostic and rarely talks about religion.|彼は不可知論者で、宗教の話はめったにしない。
e8594|My cat is finicky about her food.|うちの猫は食べ物に気難しい。
e8595|He answered with a clever quip.|彼は気の利いた言葉で答えた。
e8596|She is a sedulous student who never skips homework.|彼女は宿題を決してさぼらない勤勉な生徒だ。
e8597|The noise detracted from our enjoyment of the movie.|騒音のせいで映画の楽しさが損なわれた。
e8598|The villagers revere the old tree.|村人たちはその古い木をあがめている。
e8599|This novel is part of the literary canon.|この小説は文学の正典の一部だ。
e8600|Both litigants agreed to settle out of court.|双方の訴訟当事者は示談に同意した。
e8601|The feckless manager never solved any problems.|その無能な部長は何の問題も解決しなかった。
e8602|The workers sought redress for unfair treatment.|労働者たちは不当な扱いの是正を求めた。
e8603|The school rescinded the new rule.|学校はその新しい規則を撤回した。
e8604|The palace has ornate ceilings.|その宮殿には華美な天井がある。
e8605|Honey is a thick, viscous liquid.|はちみつは濃くて粘り気のある液体だ。
e8606|New cars depreciate quickly.|新車はすぐに価値が下がる。
e8607|Homework is the bane of my life.|宿題は私の悩みの種だ。
e8608|The school procured new computers.|学校は新しいコンピューターを調達した。
e8609|The team's vaunted defense failed today.|チームご自慢の守備が今日は崩れた。
e8610|Her histrionic crying did not fool anyone.|彼女の芝居がかった泣き方には誰もだまされなかった。
e8611|His bravado hid his fear.|彼の虚勢は恐怖心を隠していた。
e8612|A few companies form an oligopoly in this market.|この市場は数社による寡占状態だ。
e8613|The documentary both entertains and edifies viewers.|そのドキュメンタリーは視聴者を楽しませ、啓発もする。
e8614|The army struggled to end the insurgency.|軍はその反乱を終わらせるのに苦労した。
e8615|Use your free time judiciously.|自由な時間を賢明に使いなさい。
e8616|Teenagers loitered outside the convenience store.|十代の若者たちがコンビニの外でぶらついていた。
e8617|The two schools amalgamated last year.|その2つの学校は昨年合併した。
e8618|She wants to study meteorology in college.|彼女は大学で気象学を学びたい。
e8619|The war caused terrible carnage.|戦争は恐ろしい大虐殺をもたらした。
e8620|The party had a warm, convivial atmosphere.|パーティーは温かく陽気な雰囲気だった。
e8621|Birds congregate near the lake in winter.|冬になると鳥たちが湖の近くに集まる。
e8622|The shocking news seemed to unhinge him.|その衝撃的な知らせは彼を動揺させたようだった。
e8623|The scientist held heterodox views.|その科学者は異端の見解を持っていた。
e8624|Luckily, the tumor was not malignant.|幸いにも、その腫瘍は悪性ではなかった。
e8625|He came to school with unkempt hair.|彼はぼさぼさの髪で学校に来た。
e8626|The city is a nexus of trade and culture.|その都市は貿易と文化の結びつく中心地だ。
e8627|The driver's erratic movements worried the police.|運転手の不規則な動きに警察は不安を感じた。
e8628|He showed real contrition for his mistake.|彼は自分の過ちに心から悔恨の念を示した。
e8629|The conversation slowly petered out.|会話はだんだんと途切れていった。
e8630|Plants also need respiration to live.|植物も生きるために呼吸が必要だ。
e8631|She spurned his offer of help.|彼女は彼の手助けの申し出をはねつけた。
e8632|The king was unaware of the machinations around him.|王は周囲の陰謀に気づいていなかった。
e8633|We hunkered down at home during the storm.|嵐の間、私たちは家で身を潜めていた。
e8634|The school play was a total fiasco.|学校の劇は完全な大失敗だった。
e8635|They live in a decrepit old house.|彼らは老朽化した古い家に住んでいる。
e8636|The clock's pendulum swung back and forth.|時計の振り子が前後に揺れた。
e8637|We cobbled together a meal from leftovers.|残り物を寄せ集めて食事を作った。
e8638|Protesters burned an effigy of the leader.|抗議者たちは指導者の人形を燃やした。
e8639|The venal official accepted bribes.|金で動くその役人は賄賂を受け取った。
e8640|Our teacher gives us some leeway with deadlines.|先生は締め切りに多少の余裕をくれる。
e8641|His speech was full of bombast.|彼の演説は大げさな言葉だらけだった。
e8642|The bill had bipartisan support.|その法案は超党派の支持を得た。
e8643|A panel will adjudicate the dispute.|委員会がその紛争を裁定する。
e8644|He gets maudlin when he watches old movies.|彼は古い映画を見ると涙もろくなる。
e8645|She didn't even deign to answer me.|彼女は私に返事さえしてくれなかった。
e8646|He suffered years of calumny from his rivals.|彼は何年もライバルたちから中傷を受けた。
e8647|The dog gnawed on a bone.|犬は骨をかじった。
e8648|The doctor found a small lesion on his skin.|医師は彼の皮膚に小さな病変を見つけた。
e8649|Modern cartography uses satellite images.|現代の地図作成法は衛星画像を使う。
e8650|You need to buckle down and study.|本気で勉強に取りかからなければならない。
e8651|Crows scavenge for food in the garbage.|カラスはごみの中で食べ物をあさる。
e8652|Monotheism is the belief in one god.|一神教とは唯一の神を信じることだ。
e8653|The old singer faded into oblivion.|その昔の歌手は忘れ去られていった。
e8654|His friends egged him on to jump.|友人たちは彼に飛び込むようけしかけた。
e8655|The moon's gravitational pull causes tides.|月の引力が潮の満ち引きを起こす。
e8656|The movie shows a world after the apocalypse.|その映画は世界の終わりの後の世界を描いている。
e8657|He got the job through nepotism.|彼は縁故でその仕事に就いた。
e8658|Delete any superfluous words from your essay.|作文から余分な語を削りなさい。
e8659|Stop dithering and choose a dessert.|迷っていないでデザートを選びなさい。
e8660|She read many books during her convalescence.|彼女は療養中にたくさんの本を読んだ。
e8661|The farmer has a gruff voice but a kind heart.|その農夫はぶっきらぼうな声だが心は優しい。
e8662|He was always subservient to his boss.|彼はいつも上司の言いなりだった。
e8663|The region has great geopolitical importance.|その地域は地政学的に非常に重要だ。
e8664|His obstinacy made the problem worse.|彼の頑固さが問題を悪化させた。
e8665|She gave a perfunctory nod and left.|彼女は形だけうなずいて立ち去った。
e8666|Mom chided me for being late.|母は遅刻した私をたしなめた。
e8667|The ball's trajectory was perfect.|ボールの軌道は完璧だった。
e8668|He led a hedonistic life in his twenties.|彼は20代のころ享楽的な生活を送った。
e8669|Jellyfish and octopuses are invertebrates.|クラゲやタコは無脊椎動物だ。
e8670|They contrived a plan to escape.|彼らは逃げ出す計画をたくらんだ。
e8671|The war left many families in destitution.|戦争で多くの家族が極貧に陥った。
e8672|The president unequivocally denied the rumor.|大統領はそのうわさをきっぱりと否定した。
e8673|Rain marred our trip to the beach.|雨で海への旅行が台無しになった。
e8674|Wash your hands to prevent contagion.|伝染を防ぐために手を洗いなさい。
e8675|The country tested a ballistic missile.|その国は弾道ミサイルを試射した。
e8676|The drunk man became belligerent.|その酔っぱらいはけんか腰になった。
e8677|The little girl had a winsome smile.|その少女は愛嬌のある笑顔をしていた。
e8678|The actor brought gravitas to the role.|その俳優は役に重々しさを与えた。
e8679|The coach has an avuncular manner with players.|コーチは選手におじのような優しい態度で接する。
e8680|The witness later recanted his statement.|証人は後に供述を撤回した。
e8681|She gave a pithy answer to a hard question.|彼女は難しい質問に簡潔で力強い答えを返した。
e8682|They had a metaphysical discussion about time.|彼らは時間について形而上の議論をした。
e8683|The novel criticizes the French bourgeoisie.|その小説はフランスの中産階級を批判している。
e8684|The intrepid explorers crossed the desert.|勇敢な探検家たちは砂漠を横断した。
e8685|The country slowly changed from autocracy to democracy.|その国は独裁政治から民主主義へと徐々に変わった。
e8686|The journalist asked incisive questions.|その記者は鋭い質問をした。
e8687|The suspect was taken in for interrogation.|容疑者は取り調べのために連行された。
e8688|We slaked our thirst with cold water.|冷たい水でのどの渇きをいやした。
e8689|Before the election, he was a political nonentity.|選挙前、彼は政界で取るに足らない人物だった。
e8690|The new law was popular with the populace.|新しい法律は大衆に人気があった。
e8691|Their conversation felt stilted and awkward.|彼らの会話は堅苦しくぎこちなかった。
e8692|The heat made everyone feel torpid.|暑さで皆が無気力になった。
e8693|The cello has a warm, rich timbre.|チェロは温かく豊かな音色を持つ。
e8694|He borrowed money at usurious rates.|彼は法外な高利でお金を借りた。
e8695|They were duped into buying fake tickets.|彼らはだまされて偽のチケットを買った。
e8696|The prisoners prayed for deliverance.|捕虜たちは救出を祈った。
e8697|The artist has an idiosyncratic style.|その画家には独特の画風がある。
e8698|The comedian is famous for his irreverent jokes.|そのコメディアンは不遜なジョークで有名だ。
e8699|Students bowed in deference to the principal.|生徒たちは敬意を表して校長にお辞儀をした。
e8700|The documentary was truly revelatory.|そのドキュメンタリーはまさに目からうろこだった。
e8701|Japan has many volcanic islands.|日本には多くの火山島がある。
e8702|His argument sounded specious to me.|彼の主張は私にはもっともらしく聞こえるだけだった。
e8703|No one dared to impugn his honesty.|誰も彼の誠実さを疑問視しようとはしなかった。
e8704|The club brings together disparate groups of people.|そのクラブはまったく異なる人々を結びつけている。
e8705|The conflagration destroyed half the city.|その大火災は町の半分を焼き尽くした。
e8706|She has a small coterie of close friends.|彼女には親しい仲間が少しいる。
e8707|She played a Chopin nocturne on the piano.|彼女はピアノでショパンの夜想曲を弾いた。
e8708|Gossip can have a pernicious effect on a team.|うわさ話はチームに有害な影響を与えうる。
e8709|My brother has a propensity to exaggerate.|兄には大げさに言う傾向がある。
e8710|The manager acceded to our request.|部長は私たちの要求に同意した。
e8711|The rain brought a brief respite from the heat.|雨で暑さが一時やわらいだ。
e8712|The bumptious new player annoyed his teammates.|その傲慢な新人選手はチームメイトをいらだたせた。
e8713|My little sister is a headstrong child.|妹は強情な子だ。
e8714|Taxonomy helps us name living things.|分類学は生き物に名前をつけるのに役立つ。
e8715|Her decisions seemed based on pure caprice.|彼女の決定は単なる気まぐれによるものに見えた。
e8716|After years of estrangement, the brothers made peace.|何年も疎遠だった後、兄弟は和解した。
e8717|The companies colluded to raise prices.|その企業たちは共謀して値上げした。
e8718|The classroom is a microcosm of society.|教室は社会の縮図だ。
e8719|The bride was resplendent in her white dress.|花嫁は白いドレスでまばゆいほどだった。
e8720|A tall tree stood like a sentinel by the gate.|門のそばに大きな木が見張りのように立っていた。
e8721|Grandpa is a wonderful raconteur.|祖父はすばらしい話し上手だ。
e8722|We took a circuitous route to avoid traffic.|渋滞を避けるため遠回りの道を通った。
e8723|The knight wielded a heavy sword.|騎士は重い剣を振るった。
e8724|The despot ruled the country with fear.|その独裁者は恐怖で国を支配した。
e8725|The teacher admonished us for talking.|先生はおしゃべりをした私たちを戒めた。
e8726|"Time is money" is a famous aphorism.|「時は金なり」は有名な格言だ。
e8727|The mountain air is salubrious.|山の空気は健康によい。
e8728|His constant lateness exasperated his boss.|彼のいつもの遅刻は上司を激怒させた。
e8729|The senator spoke for hours in a filibuster.|その上院議員は議事妨害のため何時間も演説した。
e8730|He was ostracized by his classmates.|彼はクラスメートから仲間外れにされた。
e8731|Your ears are made of cartilage.|耳は軟骨でできている。
e8732|They enjoyed a bucolic life on the farm.|彼らは農場で牧歌的な生活を楽しんだ。
e8733|She modulated her voice to sound calm.|彼女は落ち着いて聞こえるよう声の調子を整えた。
e8734|He was seen as a martyr for freedom.|彼は自由のための殉教者とみなされた。
e8735|Graduate students receive a monthly stipend.|大学院生は毎月奨学金を受け取る。
e8736|The politician gave an equivocal answer.|その政治家はあいまいな答えをした。
e8737|A glut of apples lowered their price.|リンゴの供給過剰で値段が下がった。
e8738|She blanched when she heard the news.|その知らせを聞いて彼女は青ざめた。
e8739|Whales eat huge amounts of plankton.|クジラは大量のプランクトンを食べる。
e8740|He tried to look nonchalant before the exam.|彼は試験の前に平然としているふりをした。
e8741|The book is a series of vignettes about city life.|その本は都会生活を描いた小品集だ。
e8742|He is reticent about his private life.|彼は私生活について口が重い。
e8743|The dog barked incessantly all night.|犬は一晩中ひっきりなしに吠えた。
e8744|I don't want to be beholden to anyone.|私は誰にも借りを作りたくない。
e8745|She is a violin virtuoso.|彼女はバイオリンの名人だ。
e8746|The story features anthropomorphic animals.|その物語には擬人化された動物たちが登場する。
e8747|The coach exhorted the players to try harder.|コーチは選手たちにもっと頑張るよう強く促した。
e8748|The author's florid style is hard to read.|その作家の華麗すぎる文体は読みにくい。
e8749|The pop star enjoyed the adulation of her fans.|そのポップスターはファンの熱烈な称賛を楽しんだ。
e8750|The city declared a moratorium on new buildings.|市は新しい建物の建設を一時停止すると発表した。
e8751|Nomadic people move with their animals.|遊牧民は家畜と共に移動する。
e8752|The company went bankrupt because of its profligacy.|その会社は浪費のせいで倒産した。
e8753|Time had effaced the words on the old stone.|時が古い石の文字を消し去っていた。
e8754|She spoke in a conciliatory tone.|彼女はなだめるような口調で話した。
e8755|The plucky little dog chased the bear away.|その勇敢な小犬はクマを追い払った。
e8756|Her pacifism comes from her grandparents' war stories.|彼女の平和主義は祖父母の戦争体験の話から来ている。
e8757|She is an astute businesswoman.|彼女は抜け目のない実業家だ。
e8758|We studied Hegel's dialectic in philosophy class.|哲学の授業でヘーゲルの弁証法を学んだ。
e8759|The two sides hammered out an agreement.|双方は苦心して合意をまとめ上げた。
e8760|After a short interlude, the concert continued.|短い合間の後、コンサートは再開した。
e8761|The country ceded the island to its neighbor.|その国は島を隣国に譲渡した。
e8762|This chocolate cake is truly decadent.|このチョコレートケーキは本当にぜいたくだ。
e8763|He gave a rueful smile after losing.|彼は負けた後、悔しそうに微笑んだ。
e8764|The country is reforming its penal system.|その国は刑罰制度を改革している。
e8765|The journalist was a gadfly to the government.|その記者は政府にとってうるさく批判する人だった。
e8766|His parsimony was famous in the village.|彼のけちぶりは村で有名だった。
e8767|She dissembled her anger with a smile.|彼女は笑顔で怒りを隠した。
e8768|A fetid smell came from the trash can.|ごみ箱から悪臭がした。
e8769|There is an exodus from the city every summer.|毎年夏には都市からの大移動がある。
e8770|The poem is full of allusions to the Bible.|その詩は聖書への言及にあふれている。
e8771|Oil has a higher viscosity than water.|油は水より粘性が高い。
e8772|Her fans are legion.|彼女のファンは非常に多い。
e8773|I'm tired of his sanctimonious lectures.|彼の聖人ぶった説教にはうんざりだ。
e8774|The kids gorged on candy at the party.|子どもたちはパーティーでお菓子をむさぼり食べた。
e8775|The monks lead an austere life.|僧たちは質素な生活を送っている。
e8776|The city is an amalgam of old and new.|その都市は新旧の融合体だ。
e8777|Some snakes have deadly venom.|一部のヘビは命にかかわる毒を持っている。
e8778|Neolithic people began to farm.|新石器時代の人々は農耕を始めた。
e8779|His theory is no longer tenable.|彼の理論はもはや擁護できない。
e8780|The film received many accolades.|その映画は多くの称賛を受けた。
e8781|He likes to embellish his stories.|彼は話を脚色するのが好きだ。
e8782|A benevolent old man helped the poor.|慈悲深い老人が貧しい人々を助けた。
e8783|That is just a semantic difference.|それは単なる言葉の意味の違いだ。
e8784|We heard the plaintive cry of a kitten.|子猫の悲しげな鳴き声が聞こえた。
e8785|The children ate their dinner with gusto.|子どもたちはさもおいしそうに夕食を食べた。
e8786|The company has become a tech juggernaut.|その会社は巨大なIT企業になった。
e8787|The court absolved him of all blame.|裁判所は彼のすべての責任を免除した。
e8788|My parents finally acquiesced to my plan.|両親はついに私の計画を黙認した。
e8789|Fame can be transient.|名声はつかの間のものになりうる。
e8790|He has a bacterial infection.|彼は細菌感染症にかかっている。
e8791|His callous remarks hurt her feelings.|彼の冷淡な言葉は彼女を傷つけた。
e8792|The old chief was known for his sagacity.|その老いた長はその賢明さで知られていた。
e8793|I had to shell out a lot for the repairs.|修理に大金をしぶしぶ払うはめになった。
e8794|The land was given to the town in perpetuity.|その土地は永久に町に与えられた。
e8795|The goalkeeper lunged for the ball.|ゴールキーパーはボールに飛びついた。
e8796|The country was once an agrarian society.|その国はかつて農業社会だった。
e8797|Make judicious use of your savings.|貯金を賢明に使いなさい。
e8798|His avarice cost him all his friends.|強欲のせいで彼は友人をすべて失った。
e8799|The critic opined that the film was too long.|評論家はその映画は長すぎると意見を述べた。
e8800|Running away was a craven act.|逃げ出したのは臆病な行為だった。
e8801|The museum records the atrocities of the war.|その博物館は戦争の残虐行為を記録している。
e8802|He appeared before a magistrate.|彼は治安判事の前に出廷した。
e8803|Don't dawdle on your way to school.|学校へ行く途中でぐずぐずしないで。
e8804|Many players covet the gold medal.|多くの選手が金メダルを切望している。
e8805|Her ingenuous smile charmed everyone.|彼女の純真な笑顔は皆を魅了した。
e8806|Some people questioned the veracity of his story.|彼の話の真実性を疑う人もいた。
e8807|The renegade soldiers joined the enemy.|裏切り者の兵士たちは敵に加わった。
e8808|Sweat glands help cool the body.|汗腺は体を冷やす働きをする。
e8809|The party was weakened by internecine fighting.|その党は内部抗争で弱体化した。
e8810|He wrote a scurrilous article about the mayor.|彼は市長について口汚い記事を書いた。
e8811|My father's maxim is "Never give up."|父の座右の銘は「決してあきらめるな」だ。
e8812|The magician mesmerized the audience.|手品師は観客を魅了した。
e8813|Honesty is a basic precept of our family.|正直はわが家の基本的な教えだ。
e8814|The plan is still amorphous.|その計画はまだまとまりがない。
e8815|The novel criticizes a patriarchal society.|その小説は家父長制の社会を批判している。
e8816|The writer was arrested for sedition.|その作家は扇動の罪で逮捕された。
e8817|He concocted an excuse for being late.|彼は遅刻の言い訳をでっち上げた。
e8818|He groveled to get his job back.|彼は仕事を取り戻すためにへつらった。
e8819|He showed deep penitence for his crime.|彼は自分の罪を深く悔いた。
e8820|The purported cure did not work at all.|うわさの治療法はまったく効かなかった。
e8821|The musician lived a peripatetic life.|その音楽家はあちこちを渡り歩く生活を送った。
e8822|He did menial jobs to pay for college.|彼は大学の学費のために単純な仕事をした。
e8823|Miso is made through fermentation.|味噌は発酵によって作られる。
e8824|She is a scientist of great eminence.|彼女は非常に名声の高い科学者だ。
e8825|The rumors fomented unrest in the town.|うわさが町の不安をあおった。
e8826|The misanthropic old man lived alone.|人間嫌いの老人は一人で暮らしていた。
e8827|He suffered the indignity of being fired in public.|彼は人前で解雇されるという屈辱を味わった。
e8828|The walls attenuate the noise from the street.|壁が通りからの騒音を弱める。
e8829|The children shouted with glee.|子どもたちは大喜びで叫んだ。
e8830|The professor's lectures are recondite.|その教授の講義は難解だ。
e8831|A few high scores skewed the average.|少数の高得点が平均を偏らせた。
e8832|After the storm, the river was turbid.|嵐の後、川は濁っていた。
e8833|The bird preened its feathers.|鳥は羽を整えた。
e8834|It became a war of attrition.|それは消耗戦になった。
e8835|The topography of the island is very rugged.|その島の地形はとても険しい。
e8836|He glibly promised to fix everything.|彼は口先だけで全部直すと約束した。
e8837|She denied it with great vehemence.|彼女はそれを激しく否定した。
e8838|He slandered his rival on TV.|彼はテレビでライバルを中傷した。
e8839|I abhor violence of any kind.|私はどんな暴力もひどく嫌う。
e8840|He is a rabid baseball fan.|彼は熱狂的な野球ファンだ。
e8841|The soldier was punished for insubordination.|その兵士は命令違反で罰せられた。
e8842|Most faces show some asymmetry.|ほとんどの顔は多少非対称だ。
e8843|Remove any extraneous details from your report.|報告書から無関係な細部を取り除きなさい。
e8844|The smell conjures up memories of my childhood.|その匂いは子どものころの記憶を呼び起こす。
e8845|He wrote a long treatise on economics.|彼は経済学に関する長い論文を書いた。
e8846|We felt enervated by the hot weather.|暑さで私たちはぐったりした。
e8847|He peddled vegetables from door to door.|彼は家々を回って野菜を売り歩いた。
e8848|Granite is an igneous rock.|花こう岩は火成岩だ。
e8849|The book is a polemic against modern farming.|その本は現代農業を激しく批判する論争の書だ。
e8850|Our indefatigable teacher never gives up on us.|疲れを知らない先生は決して私たちを見捨てない。
e8851|He bought flowers to placate his wife.|彼は妻をなだめるために花を買った。
e8852|The student was punished for his insolence.|その生徒は無礼な態度で罰を受けた。
e8853|Please collate the pages before stapling.|ホチキスで留める前にページをそろえてください。
e8854|The clerk embezzled money from the bank.|その事務員は銀行の金を横領した。
e8855|Keep flammable materials away from the stove.|燃えやすい物はコンロから離しておきなさい。
e8856|He had a few abrasions on his knee.|彼はひざに少しすり傷があった。
e8857|She smiled wryly at his excuse.|彼女は彼の言い訳に皮肉っぽく微笑んだ。
e8858|He is a consummate professional.|彼は完璧なプロだ。
e8859|She has great business acumen.|彼女にはすばらしい商才がある。
e8860|The coroner examined the body.|検死官が遺体を調べた。
e8861|The new bridge obviates the need for a ferry.|新しい橋でフェリーは不要になった。
e8862|We need a dispassionate view of the problem.|その問題には冷静な見方が必要だ。
e8863|There was no intimation of trouble.|問題が起きる兆しは何もなかった。
e8864|His overweening pride led to his downfall.|彼の過度な自尊心が身の破滅を招いた。
e8865|The army put down the insurrection.|軍はその暴動を鎮圧した。
e8866|The exigencies of war changed everyday life.|戦争の緊急事態が日常生活を変えた。
e8867|The actor has a deep, sonorous voice.|その俳優は深く朗々とした声をしている。
e8868|Workers have a statutory right to holidays.|労働者には法定の休暇の権利がある。
e8869|Please desist from making noise.|騒音を立てるのはやめてください。
e8870|I love the gentle cadence of her voice.|私は彼女の声の穏やかな抑揚が大好きだ。
e8871|Music helps relieve the tedium of long drives.|音楽は長いドライブの退屈を和らげる。
e8872|Your comment is not germane to the discussion.|あなたの発言はこの議論に関係ない。
e8873|The sovereign gave a speech to the nation.|君主は国民に向けて演説した。
e8874|Polygamy is illegal in Japan.|日本では一夫多妻制は違法だ。
e8875|Climbing in this weather would be foolhardy.|この天気で登山するのは無謀だ。
e8876|The coach berated the players after the loss.|コーチは敗戦後、選手たちを厳しく叱った。
e8877|A forlorn puppy sat in the rain.|寂しげな子犬が雨の中に座っていた。
e8878|A modern building looks incongruous in the old town.|現代的な建物は古い町並みの中で場違いに見える。
e8879|Education can reduce recidivism.|教育は再犯を減らすことができる。
e8880|There was a clamor for lower taxes.|減税を求める声が高まった。
e8881|She hasn't spoken to her estranged sister in years.|彼女は疎遠になった姉と何年も話していない。
e8882|Freedom of speech is enshrined in the constitution.|言論の自由は憲法に明記されている。
e8883|Our summer at the lake was a perfect idyll.|湖で過ごした夏は申し分なくのどかなひと時だった。
e8884|Our jovial neighbor always tells jokes.|陽気な隣人はいつも冗談を言っている。
e8885|Viruses can mutate quickly.|ウイルスはすぐに突然変異することがある。
e8886|The guests behaved in a decorous manner.|客たちは礼儀正しく振る舞った。
e8887|Their ardor for the project never faded.|そのプロジェクトへの彼らの熱意は決して衰えなかった。
e8888|He regretted his dissolute youth.|彼は放蕩な青春時代を悔やんだ。
e8889|The dictator wanted to aggrandize his own power.|独裁者は自らの権力を強化しようとした。
e8890|Members of the nobility lived in large castles.|貴族の人々は大きな城に住んでいた。
e8891|They lived in a squalid apartment.|彼らはむさくるしいアパートに住んでいた。
e8892|That was an egregious error.|それはとんでもない間違いだった。
e8893|Sports drinks help replace electrolytes.|スポーツドリンクは電解質を補うのに役立つ。
e8894|The plan is in abeyance for now.|その計画は今のところ保留中だ。
e8895|His freedom was circumscribed by strict rules.|彼の自由は厳しい規則で制限されていた。
e8896|The capricious king changed his mind daily.|気まぐれな王は毎日気が変わった。
e8897|The empire had become effete and weak.|その帝国は衰退し弱くなっていた。
e8898|The consecration of the new church took place today.|新しい教会の奉献式が今日行われた。
e8899|The kids reveled in the first snow.|子どもたちは初雪を大いに楽しんだ。
e8900|The school is known for its egalitarianism.|その学校は平等主義で知られている。
e8901|The philanthropist donated millions to hospitals.|その慈善家は病院に何百万ドルも寄付した。
e8902|My son is a voracious reader.|息子は大の読書家だ。
e8903|He always has a glib answer for everything.|彼は何にでも口先だけの答えを用意している。
e8904|The school will not countenance bullying.|学校はいじめを容認しない。
e8905|Gluttony is one of the seven deadly sins.|大食は七つの大罪の一つだ。
e8906|The summer solstice is the longest day of the year.|夏至は一年で最も昼が長い日だ。
e8907|The emperor issued an edict banning the sale of rice.|皇帝は米の販売を禁じる布告を出した。
e8908|She is an assiduous worker.|彼女は勤勉な働き手だ。
e8909|My uncle is a connoisseur of fine wine.|おじは高級ワインの目利きだ。
e8910|The police found incontrovertible evidence.|警察は議論の余地のない証拠を見つけた。
e8911|The project was a colossal waste of money.|その計画はばく大なお金の無駄だった。
e8912|The cat gouged a hole in the sofa.|猫がソファに穴をえぐった。
e8913|The classroom was bedlam when the teacher left.|先生が出て行くと教室は大混乱になった。
e8914|He repented of his harsh words.|彼は自分のきつい言葉を後悔した。
e8915|Even jaded critics loved the new show.|飽き飽きしている評論家たちでさえ新しい番組を気に入った。
e8916|This is the actor's first foray into singing.|これはその俳優にとって歌への初進出だ。
e8917|She adduced several facts to support her view.|彼女は自分の見解を支えるいくつかの事実を挙げた。
e8918|The delay was vexatious for all passengers.|その遅れは乗客全員にとって腹立たしかった。
e8919|He took a surreptitious look at his phone.|彼はこっそりスマホを見た。
e8920|Grandpa regaled us with stories of his youth.|祖父は若いころの話で私たちを楽しませた。
e8921|We must accept our own fallibility.|私たちは自分が間違いを犯しうることを受け入れなければならない。
e8922|The rumors besmirched his good name.|そのうわさは彼の名声を汚した。
e8923|She received a long missive from her aunt.|彼女はおばから長い手紙を受け取った。
e8924|The plan faced vociferous opposition.|その計画は声高な反対にあった。
e8925|Negligence is a common type of tort.|過失はよくある不法行為の一つだ。
e8926|His idea was met with derision.|彼のアイデアはあざけりを受けた。
e8927|There was malevolence in his eyes.|彼の目には悪意があった。
e8928|The company tried to squelch the rumors.|会社はうわさを抑えつけようとした。
e8929|The petulant child refused to eat.|すねた子どもは食べるのを拒んだ。
e8930|The city is a mosaic of cultures.|その都市はさまざまな文化の寄せ集めだ。
e8931|He was insouciant about the exam.|彼は試験のことに無頓着だった。
e8932|Yogurt is good for your digestive system.|ヨーグルトは消化器系によい。
e8933|The heart is analogous to a pump.|心臓はポンプに似ている。
e8934|He had the effrontery to ask for more money.|彼は厚かましくももっとお金を要求した。
e8935|I won't belabor the point.|その点をくどくど論じるつもりはない。
e8936|The lecture had a soporific effect on the class.|その講義はクラスの眠気を誘った。
e8937|That is a perversion of the truth.|それは真実の曲解だ。
e8938|She has gastric problems.|彼女は胃に問題がある。
e8939|She was overwrought after the accident.|事故の後、彼女はひどく取り乱していた。
e8940|The country paid reparations after the war.|その国は戦後に賠償金を支払った。
e8941|My visa application is still in limbo.|私のビザ申請はまだ宙ぶらりんの状態だ。
e8942|He guffawed at the silly joke.|彼はそのくだらない冗談にばか笑いした。
e8943|The DNA test gave irrefutable proof.|DNA鑑定が反論できない証拠を示した。
e8944|An autopsy was performed to find the cause of death.|死因を調べるために検死が行われた。
e8945|They had a tempestuous relationship.|彼らは波乱に満ちた関係だった。
e8946|Some people criticize the hedonism of modern life.|現代生活の快楽主義を批判する人もいる。
e8947|She is a conscientious student.|彼女はまじめな生徒だ。
e8948|As a libertarian, he opposes most taxes.|自由論者として、彼はほとんどの税金に反対している。
e8949|The jury was sequestered during the trial.|陪審員は裁判の間隔離された。
e8950|Fortuitously, the rain stopped before the game.|幸運にも試合前に雨がやんだ。
e8951|The island formed by the accretion of sand.|その島は砂の堆積によってできた。
e8952|The specter of war hung over the country.|戦争の亡霊がその国を覆っていた。
e8953|The city earned the appellation "City of Light."|その都市は「光の都」という呼び名を得た。
e8954|We had an impromptu party in the park.|公園で即席のパーティーを開いた。
e8955|The cat gave me an inscrutable look.|猫は私に何を考えているのかわからない視線を向けた。
e8956|Meeting my best friend was pure serendipity.|親友に出会ったのはまったくの偶然の幸運だった。
e8957|His rude comment nettled her.|彼の失礼な言葉が彼女をいらだたせた。
e8958|It is an axiom that practice makes perfect.|練習が完璧を生むというのは自明の理だ。
e8959|Behind all his bluster, he was nervous.|怒鳴り散らしていても、彼は内心不安だった。
e8960|She gave us an effusive welcome.|彼女は私たちを熱烈に歓迎してくれた。
e8961|The fans were ecstatic after the victory.|勝利の後、ファンは有頂天になった。
e8962|The demagogue stirred up the angry crowd.|その扇動政治家は怒った群衆をあおった。
e8963|His silence disconcerted me.|彼の沈黙が私を当惑させた。
e8964|The police interrogated the suspect for hours.|警察は容疑者を何時間も尋問した。
e8965|She feels tired because she is anemic.|彼女は貧血なので疲れやすい。
e8966|The picture on the wall was askew.|壁の絵は斜めに傾いていた。
e8967|The party split into two factions.|その党は2つの派閥に分裂した。
e8968|The children ran outside with exuberance.|子どもたちは元気いっぱいに外へ飛び出した。
e8969|The fox used guile to catch its prey.|キツネはずる賢さで獲物を捕らえた。
e8970|The lawyer handled the conveyance of the house.|弁護士がその家の譲渡手続きを担当した。
e8971|Parents try to inculcate good manners in children.|親は子どもに良いマナーを教え込もうとする。
e8972|He is a protean actor who can play any role.|彼はどんな役でも演じられる変幻自在の俳優だ。
e8973|I was touched by her solicitude.|彼女の気遣いに心を打たれた。
e8974|Don't gloat over your rival's failure.|ライバルの失敗をほくそ笑んではいけない。
e8975|Old organizations tend to ossify.|古い組織は硬直化しがちだ。
e8976|Credulous people often fall for scams.|だまされやすい人はよく詐欺にひっかかる。
e8977|Bright lights give me a migraine.|まぶしい光で偏頭痛が起きる。
e8978|In the past, blasphemy was a serious crime.|昔は冒涜は重大な罪だった。
e8979|The book delves into the history of tea.|その本はお茶の歴史を掘り下げている。
e8980|My uncle is a cynic who trusts no one.|おじは誰も信じない皮肉屋だ。
e8981|The police subdued the angry man.|警察は怒った男を取り押さえた。
e8982|There was a precipitous drop in sales.|売り上げが急激に落ちた。
e8983|She studies anthropology at university.|彼女は大学で人類学を学んでいる。
e8984|The show is a parody of famous movies.|その番組は有名な映画のパロディーだ。
e8985|The book has whimsical drawings.|その本には風変わりで楽しい絵が描かれている。
e8986|She espouses healthy eating.|彼女は健康的な食生活を支持している。
e8987|My brother is an incorrigible liar.|兄はどうしようもないうそつきだ。
e8988|Our genial host made us feel welcome.|愛想のよい主人は私たちを温かく迎えてくれた。
e8989|The poet wrote in the local vernacular.|その詩人は土地の言葉で書いた。
e8990|The man defrauded investors of millions.|その男は投資家から何百万もだまし取った。
e8991|He has a degree in jurisprudence.|彼は法学の学位を持っている。
e8992|The war turned into a quagmire.|その戦争は泥沼化した。
e8993|The weather was atrocious all week.|一週間ずっとひどい天気だった。
e8994|They dredged the river to make it deeper.|川を深くするために川底をさらった。
e8995|I'm in a quandary about which club to join.|どのクラブに入るか迷っている。
e8996|There was an undercurrent of anger in his voice.|彼の声には怒りが潜んでいた。
e8997|The artist made anatomical drawings of the hand.|その画家は手の解剖図を描いた。
e8998|They bought a dilapidated farmhouse.|彼らは荒れ果てた農家を買った。
e8999|Don't conflate opinion with fact.|意見と事実を混同してはいけない。
e9000|The upshot was that we canceled the trip.|結局、私たちは旅行を中止した。
`;

export const EXAMPLES_EN = Object.fromEntries(
  RAW.trim().split('\n').map((line) => {
    const [id, text, ja] = line.split('|');
    return [id, { text, ja }];
  }),
);
