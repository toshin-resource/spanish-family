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
`;

export const EXAMPLES_EN = Object.fromEntries(
  RAW.trim().split('\n').map((line) => {
    const [id, text, ja] = line.split('|');
    return [id, { text, ja }];
  }),
);
