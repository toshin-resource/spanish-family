// スペイン語の単語の英語の意味と、例文の英訳（「英語で答える」で使う）
// 1行 = 単語・フレーズのid|英語の意味|別の正解（/区切り）|例文の英訳（フレーズは空）
const RAW = `
w001|hello|hi/hey|Hello! How are you?
w002|thank you|thanks|Thank you very much for your help.
w003|yes|yeah|Yes, I like it a lot.
w004|no||No, I don't have time.
w005|goodbye|bye|Goodbye, see you tomorrow.
w006|sorry|excuse me/pardon|Excuse me, where is the bathroom?
w007|I||I am from Japan.
w008|you (informal)|you|Do you speak English?
w009|you (polite)|you|Are you the teacher?
w010|he||He works at a bank.
w011|she||She is my sister.
w012|we||We live in Tokyo.
w013|they||They arrive tomorrow.
w014|you (plural)|you all/you guys|Do you all want coffee?
w015|be (identity)|to be|My mother is very kind.
w016|be (state)|to be|I'm very tired today.
w017|have|to have|I have two brothers.
w018|there is|there are|There is a park near my house.
w019|do|make|What are you doing tomorrow?
w020|go|to go|I'm going to the market.
w021|come|to come|Are you coming to the party?
w022|can|be able to|Can I pay by card?
w023|want|to want|I want a coffee, please.
w024|say|tell|What are you saying?
w025|see|watch/look|I watch TV at night.
w026|give|to give|I'm giving you a present.
w027|know (facts)|know|I don't know his name.
w028|know (people)|know/be acquainted with|I know your brother.
w029|what||What is this?
w030|who||Who is she?
w031|where||Where do you live?
w032|when||When is your birthday?
w033|how||How do you say "thank you" in Japanese?
w034|why||Why are you studying Spanish?
w035|how much|how many|How much does this book cost?
w036|which|which one/what|What is your favorite color?
w037|this|this thing|This is very tasty.
w038|that|that thing|That isn't true.
w039|here||I live here.
w040|there|over there|The hotel is over there.
w041|and||I want bread and cheese.
w042|or||Coffee or tea?
w043|but||It's expensive, but it's pretty.
w044|because||I'm not going because I'm sick.
w045|if||If it rains, I don't go out.
w046|with||I live with my family.
w047|without||A coffee without sugar, please.
w048|for|in order to|This present is for you.
w049|of|from|It's my father's book.
w050|in|at/on|I'm at home.
w051|very|really|It's very cold today.
w052|well|good|You speak Spanish very well.
w053|badly|bad/poorly|I feel bad.
w054|a lot|much/many|I have a lot of work.
w055|a little|little/few|I speak a little Spanish.
w056|more||Slower, please.
w057|also|too|I want to go too.
w058|now|right now|I can't right now.
w059|today||Today is Monday.
w060|yesterday||Yesterday I went to the movies.
w061|tomorrow|morning|See you tomorrow.
w062|always||I always have breakfast at seven.
w063|never||I never drink alcohol.
w064|already|now/anymore|I already ate.
w065|still|yet|I still don't understand.
w066|good|nice|It's a good restaurant.
w067|bad||The weather is bad.
w068|big|large|My house is big.
w069|small|little|I have a small dog.
w070|new||I bought a new phone.
w071|old||My car is very old.
w072|person||He's a very nice person.
w073|man||That man is my boss.
w074|woman||The woman is talking with the doctor.
w075|child|boy/kid|The boy is playing in the park.
w076|girl|little girl|The girl is five years old.
w077|friend||He is my best friend.
w078|family||My family is big.
w079|father|dad|My father works a lot.
w080|mother|mom|My mother cooks very well.
w081|son||My son is ten years old.
w082|daughter||My daughter studies at the university.
w083|brother||My brother lives in Osaka.
w084|sister||My sister is a doctor.
w085|husband||My husband is Japanese.
w086|wife||My wife speaks Spanish.
w087|name||What is your name?
w088|house|home|I'm at home now.
w089|day||Today is a beautiful day.
w090|night|evening|Good night.
w091|afternoon|evening|See you this afternoon.
w092|time|weather|I don't have time.
w093|year||I'm forty years old.
w094|speak|talk|I talk with my mother on the phone.
w095|eat|to eat|We eat at twelve.
w096|drink|to drink|I drink water every day.
w097|take|have/drink|Shall we have a coffee?
w098|live|to live|I live in Japan.
w099|work|to work|I work from Monday to Friday.
w100|study|to study|I study Spanish every day.
w101|understand|to understand|I don't understand the question.
w102|buy|to buy|I want to buy bread.
w103|pay|to pay|I'm going to pay.
w104|need|to need|I need help.
w105|like|to like|I like coffee.
w106|wait|wait for/hope|I'll wait for you here.
w107|look for|search/seek|I'm looking for my key.
w108|arrive|get to/reach|The train arrives at three.
w109|go out|leave/exit|I leave home at eight.
w110|call|phone|I'll call you tomorrow.
w111|water||A glass of water, please.
w112|food|meal|The food is very tasty.
w113|coffee|café|I drink coffee in the morning.
w114|bread||I buy bread at the bakery.
w115|money||I don't have any money.
w116|work|job|I have a lot of work today.
w117|city|town|Madrid is a big city.
w118|country||Japan is a beautiful country.
w119|street|road|The street is very quiet.
w120|thing||I have a lot of things to do.
w121|one|1|I want a coffee, just one.
w122|two|2|I have two children.
w123|three|3|It's three o'clock.
w124|four|4|There are four of us in my family.
w125|five|5|I work five days a week.
w126|six|6|I get up at six.
w127|seven|7|A week has seven days.
w128|eight|8|I open the store at eight.
w129|nine|9|My son is nine years old.
w130|ten|10|It's ten euros.
w131|all|everything/every|Everything is fine.
w132|other|another|I want another coffee.
w133|same||We are the same age.
w134|something|anything|Do you want something to drink?
w135|nothing|anything|There is nothing on the table.
w136|someone|somebody|Someone is at the door.
w137|nobody|no one/anyone|There's nobody at home.
w138|my||My house is nearby.
w139|your||Where is your brother?
w140|his|her/their/your|His house is very pretty.
w141|think|to think|I think about you.
w142|believe|think|I think so.
w143|feel|to feel|I'm very sorry.
w144|put|place|I put the book on the table.
w145|pass|happen/go through|What's happening?
w146|take|carry/bring|I take my daughter to school.
w147|bring|to bring|Can you bring me a glass of water?
w148|leave|let/drop off|I'll leave the car here.
w149|continue|keep/follow|Go straight ahead.
w150|return|go back/come back|I go back home at six.
w151|begin|start|The class starts at nine.
w152|finish|end|I finish work at five.
w153|open|to open|Can you open the window?
w154|close|shut|Close the door, please.
w155|write|to write|I'm writing a letter to my grandmother.
w156|read|to read|I like reading books.
w157|listen|listen to/hear|I listen to music on the train.
w158|look|watch/look at|Look, how pretty!
w159|sleep|to sleep|I sleep eight hours.
w160|help|to help|Can you help me?
w161|use|to use|Can I use your phone?
w162|learn|to learn|I want to learn Spanish.
w163|find|to find|I can't find my key.
w164|ask|to ask|I want to ask something.
w165|answer|reply/respond|I don't know what to answer.
w166|walk|to walk|I walk to work.
w167|run|to run|I run in the park.
w168|play|to play|The children play soccer.
w169|cook|to cook|I like cooking.
w170|wash|to wash|I wash the dishes after eating.
w171|clean|to clean|I clean the house on Saturdays.
w172|travel|to travel|I want to travel to Argentina.
w173|enter|come in/go in|Can I come in?
w174|order|ask for/request|I'm going to order a pizza.
w175|sell|to sell|They sell fruit at the market.
w176|remember|to remember|I don't remember his name.
w177|forget|to forget|I forgot my umbrella.
w178|change|exchange|I want to exchange money.
w179|lose|to lose|I lost my passport.
w180|win|earn|My team won the match.
w181|week||See you next week.
w182|month||I'm going to Mexico next month.
w183|time (clock)|hour|What time is it?
w184|time (occasion)|times|I go to the gym twice a week.
w185|moment|minute|One moment, please.
w186|Monday||On Monday I start a new job.
w187|Tuesday||I have class on Tuesday.
w188|Wednesday||On Wednesday I'm going to the doctor.
w189|Thursday||On Thursday we have dinner together.
w190|Friday||On Friday I go out with friends.
w191|Saturday||I don't work on Saturday.
w192|Sunday||On Sunday I rest at home.
w193|school||My son goes to school by bike.
w194|store|shop|The store opens at ten.
w195|market||I buy vegetables at the market.
w196|restaurant||We have dinner at an Italian restaurant.
w197|hospital||My grandfather is in the hospital.
w198|bank||The bank is closed today.
w199|bathroom|toilet/restroom|Where is the bathroom?
w200|room|bedroom|My room is small.
w201|kitchen||My mother is in the kitchen.
w202|door||Someone is at the door.
w203|window||I open the window in the morning.
w204|table||The food is on the table.
w205|chair||Sit on this chair.
w206|bed||I'm going to bed.
w207|station||The station is near here.
w208|airport||I'm going to the airport by taxi.
w209|hotel||The hotel has a pool.
w210|square|plaza|See you in the square.
w211|park||I walk the dog in the park.
w212|beach||In summer we go to the beach.
w213|sea|ocean|I like swimming in the sea.
w214|car|auto|I go to work by car.
w215|bus||The bus arrives in five minutes.
w216|train||I take the eight o'clock train.
w217|airplane|plane|The plane leaves at ten.
w218|taxi|cab|Let's go by taxi.
w219|bicycle|bike|I go to school by bike.
w220|tea||Do you want some tea?
w221|milk||I drink milk in the morning.
w222|meat||I don't eat meat.
w223|fish||Today we're having fish for dinner.
w224|chicken||The chicken is very tasty.
w225|egg||I have eggs and bread for breakfast.
w226|rice||In Japan we eat a lot of rice.
w227|fruit||I eat fruit every day.
w228|apple||I want a red apple.
w229|orange||An orange juice, please.
w230|vegetable|vegetables|Vegetables are good for your health.
w231|cheese||I like cheese.
w232|wine||Red or white wine?
w233|beer||Two beers, please.
w234|sugar||No sugar, please.
w235|salt||Can you pass me the salt?
w236|breakfast||Breakfast is ready.
w237|lunch||Lunch is at one.
w238|dinner|supper|Dinner is at nine.
w239|head||I have a headache.
w240|hand||Wash your hands.
w241|eye||She has blue eyes.
w242|mouth||Open your mouth, please.
w243|foot||My foot hurts.
w244|body||Exercise is good for the body.
w245|heart||I love you with all my heart.
w246|book||I'm reading an interesting book.
w247|telephone|phone|What is your phone number?
w248|clothes|clothing|I'm buying new clothes.
w249|key||Where is the key?
w250|bag||Can I have a bag, please?
w251|present|gift|This present is for my mother.
w252|photo|picture/photograph|Can we take a photo?
w253|music||I like Latin music.
w254|movie|film|Let's go see a movie.
w255|language||I speak two languages.
w256|word||I don't know this word.
w257|question||I have a question.
w258|problem||No problem.
w259|price||What is the price?
w260|world||I want to travel around the world.
w261|life||Life is beautiful.
w262|love||Love is important.
w263|sun||It's sunny today.
w264|rain||There is a lot of rain in June.
w265|heat|hot|It's very hot.
w266|cold||The water is cold.
w267|dog||My dog's name is Toto.
w268|cat||The cat is sleeping on the bed.
w269|flower||I bought you flowers.
w270|white||I have a white shirt.
w271|black||I like black coffee.
w272|red||I want the red dress.
w273|blue||The sky is blue.
w274|green||I like green tea.
w275|yellow||The taxi is yellow.
w276|pretty|beautiful/nice|What a beautiful day!
w277|cute|pretty/lovely|What a cute dog!
w278|long||She has long hair.
w279|short||The trip is short.
w280|tall|high|My brother is very tall.
w281|low|short|The table is low.
w282|expensive||This watch is very expensive.
w283|cheap|inexpensive|Fruit is cheap here.
w284|easy||The exam was easy.
w285|difficult|hard|Spanish isn't difficult.
w286|hot||The soup is very hot.
w287|happy||I'm very happy today.
w288|sad||Why are you sad?
w289|tired||I'm tired from work.
w290|fast|quick|The train is very fast.
w291|important||It's very important.
w292|delicious|tasty|This is so tasty!
w293|busy||I'm busy right now.
w294|sick|ill|My son is sick.
w295|near|close/nearby|The supermarket is nearby.
w296|far|far away|My house is far from here.
w297|later|after/afterwards|I'll call you later.
w298|before|earlier|Wash your hands before eating.
w299|right||Turn right.
w300|left||The bank is on the left.
w301|finish|end|I have just arrived.
w302|accept||We accept cards.
w303|rent||I want to rent a car.
w304|walk|go|How are you doing?
w305|turn off|switch off|Turn off the light, please.
w306|fix|repair|I have to fix the bicycle.
w307|attend||I attend class every day.
w308|take a bath|bathe/bath|I take a bath at night.
w309|erase|delete/wipe|Erase the board, please.
w310|charge|load|I need to charge my phone.
w311|get married|marry|My sister is getting married in May.
w312|celebrate||We're celebrating his birthday.
w313|have dinner|eat dinner/dine|We have dinner at eight.
w314|share||I share the room with my brother.
w315|drive||I can't drive.
w316|build|construct|They are building a new building.
w317|answer|reply|Answer the phone, please.
w318|continue|go on|We'll continue tomorrow.
w319|cost||How much does the ticket cost?
w320|grow|grow up|Children grow up fast.
w321|cross|go across|Cross the street carefully.
w322|take care of|look after/care for|I take care of my grandmother.
w323|should|must/ought to/owe|You should rest.
w324|decide||I can't decide.
w325|have breakfast|eat breakfast|I have breakfast at seven.
w326|describe||Can you describe your friend?
w327|wake up|awaken|I wake up early.
w328|draw||My daughter draws very well.
w329|have fun|enjoy oneself|Have fun at the party!
w330|hurt|ache|I have a stomachache.
w331|take a shower|shower|I take a shower in the morning.
w332|choose|pick/select|Choose one, please.
w333|teach|show|My mother teaches English.
w334|send||I'll send you a message.
w335|explain||Can you explain it to me?
w336|be missing|lack/be lacking|One plate is missing.
w337|sign||Sign here, please.
w338|work (function)|function/run|The elevator doesn't work.
w339|spend||I spend a lot on food.
w340|put away|keep/save|Put your money away.
w341|try|attempt|I'm going to try it.
w342|get up|stand up/rise|I get up at six.
w343|fill|fill up|Fill the glass with water.
w344|cry|weep|The baby cries a lot.
w345|send|order|I'll send you a photo.
w346|improve|get better|I want to improve my Spanish.
w347|lie|tell a lie|Don't lie to me.
w348|die||Flowers die without water.
w349|move||Can you move the table?
w350|be born||I was born in Osaka.
w351|swim||I like swimming in summer.
w352|notice||I didn't notice anything.
w353|happen|occur|What happened?
w354|hear||I can't hear you well.
w355|smell||It smells very good.
w356|stop||The bus stops here.
w357|seem|look/appear|It looks easy.
w358|participate|take part|I want to take part in the contest.
w359|take a walk|walk/stroll|We take a walk in the park.
w360|fight|argue/quarrel|My kids are always fighting.
w361|allow|permit/let|Smoking is not allowed.
w362|prefer||I prefer tea.
w363|worry||Don't worry.
w364|prepare|make/get ready|I'm making dinner.
w365|introduce|present|Let me introduce my wife to you.
w366|try|try on/taste|Can I try on this dress?
w367|promise||I promise.
w368|stay|remain|I'm staying at home today.
w369|complain||He always complains about work.
w370|remove|take off/take away|Take off your shoes, please.
w371|receive|get|I got your message.
w372|laugh||We laughed a lot.
w373|repeat||Could you repeat that, please?
w374|reserve|book|I want to reserve a table.
w375|break||The glass broke.
w376|greet|say hello|Say hello to your mother for me.
w377|sit down|sit|Sit here.
w378|be useful|serve|What is this for?
w379|ring|sound|The phone is ringing.
w380|dream||I dreamed about you.
w381|go up|climb/get on|We go up to the third floor.
w382|go down|get off/lower|I get off the bus here.
w383|suffer||He suffers a lot from the heat.
w384|throw|throw away|Don't throw trash in the street.
w385|touch|play (instrument)|I play the guitar.
w386|translate||Can you translate this?
w387|be worth|cost|How much is it?
w388|get dressed|dress|I get dressed quickly.
w389|visit||I visit my grandparents on Sundays.
w390|fly||Birds fly high.
w391|show||I'll show you my house.
w392|count|tell|Count to ten.
w393|invite|treat|I'm inviting you to dinner.
w394|rest|take a break|I need to rest a little.
w395|people||There are a lot of people here.
w396|boy|guy/kid|That boy is my cousin.
w397|girl|young woman|The girl speaks Japanese.
w398|baby||The baby is sleeping.
w399|uncle||My uncle lives in the countryside.
w400|aunt||My aunt cooks very well.
w401|cousin||My cousin is twenty years old.
w402|grandson|grandchild|My grandson is three years old.
w403|boyfriend||Her boyfriend is Argentinian.
w404|girlfriend||My girlfriend is very nice.
w405|neighbor||My neighbor has a dog.
w406|boss||My boss is very kind.
w407|teacher|professor|The teacher speaks slowly.
w408|student||I'm a student.
w409|doctor||I need a doctor.
w410|nurse||The nurse is very kind.
w411|police|police officer|Call the police.
w412|customer|client|The customer is waiting in the store.
w413|waiter||The waiter brings the check.
w414|driver||The bus driver is nice.
w415|lawyer|attorney|My brother is a lawyer.
w416|office||I work in an office.
w417|university|college|I study at the university.
w418|library||I read at the library.
w419|museum||We're going to the museum on Sunday.
w420|church||The church is very old.
w421|pharmacy|drugstore|Is there a pharmacy nearby?
w422|supermarket||I'm going to the supermarket.
w423|bakery||The bakery opens early.
w424|bar||We have a drink at the bar.
w425|movie theater|cinema/movies|Let's go to the movies tonight.
w426|theater||The theater is downtown.
w427|mail|post/post office|I'm sending a letter by mail.
w428|building||I live in that building.
w429|floor|apartment|I live on the fifth floor.
w430|apartment|flat|My apartment is small.
w431|garden|yard|There are flowers in the garden.
w432|countryside|field/country|My grandparents live in the countryside.
w433|village|town|It's a quiet village.
w434|mountain||We climbed the mountain.
w435|river||We swim in the river.
w436|lake||The lake is very beautiful.
w437|island||Japan is a country of islands.
w438|bridge||We cross the bridge.
w439|corner||The store is on the corner.
w440|center|downtown/middle|Let's go downtown.
w441|north||I live in the north of Japan.
w442|south||Argentina is in the south.
w443|living room|room|We watch TV in the living room.
w444|bedroom||The bedroom is big.
w445|wall||There is a photo on the wall.
w446|floor (ground)|floor/ground|The cat sleeps on the floor.
w447|ceiling|roof|The ceiling is very high.
w448|light||Turn on the light, please.
w449|mirror||I look at myself in the mirror.
w450|sofa|couch|The dog sleeps on the sofa.
w451|closet|wardrobe/cupboard|The clothes are in the closet.
w452|television|TV|I watch TV with my family.
w453|radio||I listen to the radio in the car.
w454|clock|watch|My watch doesn't work.
w455|paper||Do you have paper?
w456|pencil||I write with a pencil.
w457|pen|ballpoint pen|Can you lend me a pen?
w458|notebook||I write the words in my notebook.
w459|backpack|rucksack|My backpack is blue.
w460|umbrella||Take the umbrella, it's going to rain.
w461|glasses|eyeglasses|I can't see well without glasses.
w462|shirt||I like your shirt.
w463|T-shirt|tee shirt|I bought a T-shirt in Buenos Aires.
w464|pants|trousers|These pants are very comfortable.
w465|skirt||She is wearing a red skirt.
w466|dress||What a beautiful dress!
w467|shoe|shoes|I need new shoes.
w468|coat||It's cold, put on your coat.
w469|hat||My grandfather wears a hat.
w470|sock|socks|I can't find the other sock.
w471|jacket||Take off your jacket.
w472|soup||The soup is hot.
w473|salad||I want a salad.
w474|potato||I like French fries.
w475|tomato||I buy tomatoes at the market.
w476|onion||I don't like onion.
w477|garlic||The food has a lot of garlic.
w478|banana||I eat a banana for breakfast.
w479|grape|grapes|The grapes are very sweet.
w480|strawberry||I love strawberries.
w481|lemon||A tea with lemon, please.
w482|juice||I want an apple juice.
w483|ice cream||Let's go eat ice cream.
w484|cake||I made a birthday cake.
w485|chocolate||I like chocolate.
w486|cookie|biscuit|The children are eating cookies.
w487|butter||Bread with butter, please.
w488|oil||I cook with olive oil.
w489|pepper||Salt and pepper, please.
w490|pork|pig|I don't eat pork.
w491|ham||A ham and cheese sandwich.
w492|dessert||What's for dessert?
w493|drink|beverage|What would you like to drink?
w494|bottle||A bottle of water, please.
w495|cup|mug|A cup of coffee, please.
w496|spoon||I need a spoon.
w497|fork||I eat with a fork.
w498|knife||Careful, the knife is very sharp.
w499|face||Wash your face.
w500|hair||She has black hair.
w501|nose||My nose hurts.
w502|ear||My ear hurts.
w503|tooth|teeth|I brush my teeth.
w504|arm||My arm hurts.
w505|leg||My legs hurt.
w506|finger|toe|I cut my finger.
w507|back||My back hurts.
w508|stomach|belly|I have a stomachache.
w509|blood||Tomorrow I'm going to donate blood.
w510|pain|ache|I have a headache.
w511|fever|temperature|My son has a fever.
w512|medicine|medication|Take this medicine after eating.
w513|health|cheers|Cheers!
w514|sky||The sky is clear.
w515|cloud||There are a lot of clouds today.
w516|wind||It's very windy.
w517|snow||There is snow in winter.
w518|star||There are a lot of stars tonight.
w519|moon||The moon is very beautiful.
w520|earth|ground/land|The Earth is round.
w521|stone|rock|There is a stone on the path.
w522|tree||There is a big tree in the park.
w523|leaf|sheet|The leaves are green.
w524|animal||I like animals.
w525|bird||There is a bird in the tree.
w526|horse||The horse runs fast.
w527|cow||The cow gives milk.
w528|fish (animal)|fish|There are fish in the river.
w529|spring||In spring there are a lot of flowers.
w530|summer||It's hot in summer.
w531|autumn|fall|I like autumn.
w532|winter||It's cold in winter.
w533|minute||Wait a minute.
w534|noon|midday|We eat at noon.
w535|midnight||I arrived at midnight.
w536|weekend||What are you doing on the weekend?
w537|date||What's the date today?
w538|day after tomorrow||The day after tomorrow is Saturday.
w539|day before yesterday||It rained a lot the day before yesterday.
w540|January||My birthday is in January.
w541|February||It's cold in February.
w542|March||Spring begins in March.
w543|April||There are a lot of flowers in April.
w544|May||We're going on a trip in May.
w545|June||It rains a lot in June.
w546|July||Vacation starts in July.
w547|August||It's very hot in August.
w548|September||Classes start in September.
w549|October||It's cool in October.
w550|November||It doesn't rain much in November.
w551|December||In December we celebrate Christmas.
w552|eleven|11|My daughter is eleven years old.
w553|twelve|12|We eat at twelve.
w554|fifteen|15|Wait fifteen minutes.
w555|twenty|20|It's twenty pesos.
w556|thirty|30|The month has thirty days.
w557|fifty|50|My father is fifty years old.
w558|hundred|100/one hundred|There are a hundred people.
w559|thousand|1000/one thousand|It costs a thousand yen.
w560|million|one million|The city has a million inhabitants.
w561|first||It's my first trip to Argentina.
w562|second||I live on the second floor.
w563|last|final|It's the last train.
w564|each|every|I go to the park every day.
w565|several|various|I have several friends in Mexico.
w566|young||My mother is very young.
w567|nice|friendly/pleasant|Your brother is very nice.
w568|kind|nice|You are very kind.
w569|handsome|good-looking|You look so handsome today!
w570|fat|chubby|My cat is fat.
w571|thin|slim|She is tall and thin.
w572|strong||My father is very strong.
w573|weak||I feel weak.
w574|intelligent|smart/clever|Your daughter is very smart.
w575|stupid|silly/foolish|Don't be silly.
w576|quiet|calm|The village is very quiet.
w577|nervous||I'm nervous about the exam.
w578|angry|mad|Why are you angry?
w579|worried||I'm worried about my son.
w580|boring|bored|The movie is boring.
w581|fun|funny/enjoyable|The trip was a lot of fun.
w582|interesting||It's a very interesting book.
w583|comfortable||This sofa is very comfortable.
w584|clean||The room is clean.
w585|dirty||Your shoes are dirty.
w586|full||The train is full.
w587|empty||The bottle is empty.
w588|open||Is the museum open?
w589|closed|shut|The store is closed.
w590|free|available/vacant|Is this chair free?
w591|safe|sure|This neighborhood is safe.
w592|dangerous||It's dangerous to swim here.
w593|possible||Is it possible to change the date?
w594|impossible||It's impossible to get there on time.
w595|necessary||It's not necessary.
w596|correct|right|The answer is correct.
w597|false|fake|That's false.
w598|true|real|It's a true story.
w599|dark||The room is dark.
w600|bright|light/clear|The living room is very bright.
w601|gray|grey|The sky is gray today.
w602|brown||I have brown eyes.
w603|pink||I like the color pink.
w604|almost|nearly|I'm almost done.
w605|then|so|So, shall we go?
w606|like this|so/this way|You do it like this.
w607|quite|enough/fairly|You speak quite well.
w608|too|too much|It's too expensive.
w609|only|just|I just want a coffee.
w610|together||Let's go together.
w611|soon||See you soon.
w612|early||I get up early.
w613|later|then|See you later.
w614|again|once more|Say it again, please.
w615|sometimes||Sometimes I cook.
w616|slowly||Speak slowly, please.
w617|better|best|I feel better.
w618|worse|worst|The weather is worse today.
w619|maybe|perhaps|Maybe it will rain tomorrow.
w620|I hope|hopefully/if only|I hope it's sunny!
w621|upstairs|up/above|My room is upstairs.
w622|downstairs|down/below|I'll wait for you downstairs.
w623|inside|in|The cat is inside the box.
w624|outside|out|The children play outside.
w625|in front|in front of/ahead|The taxi is waiting in front of the hotel.
w626|behind|in back|The garden is behind the house.
w627|until|till/up to|I work until six.
w628|since|from|I have lived here since 2020.
w629|between|among|The bank is between the pharmacy and the café.
w630|on|about/over|The book is on the table.
w631|when|whenever|When it rains, I stay home.
w632|although|even though/though|Although he's tired, he works.
w633|like|as|He speaks like a native.
w634|according to||According to the radio, it's going to rain.
w635|toward|towards|We walk toward the center.
w636|you (Argentina)|you|Are you from Buenos Aires?
w637|you all (Spain)|you/you guys|Are you all from Madrid?
w638|our|ours|Our house is small.
w639|reason|right|You're right.
w640|truth|true|Really?
w641|idea||Good idea!
w642|lie||That's a lie.
w643|help|aid|Thanks for your help.
w644|mistake|error|Sorry, it was a mistake.
w645|change||Here is your change.
w646|check|bill/account|The check, please.
w647|number||What is your phone number?
w648|address|direction|What is your address?
w649|answer|response|I don't know the answer.
w650|news||I have some good news.
w651|message||I'm leaving you a message.
w652|password||I forgot my password.
w653|party||There is a party on Saturday.
w654|birthday||Happy birthday!
w655|trip|journey/travel|Have a good trip!
w656|vacation|holidays|I'm on vacation.
w657|game||It's a game for children.
w658|sport|sports|What sport do you like?
w659|soccer|football|Argentinians love soccer.
w660|match|game|Let's go watch the match.
w661|team||What's your favorite team?
w662|history|story|I like Japanese history.
w663|example||For example, rice.
w664|part|area/piece|I live in this part of the city.
w665|place|spot|It's a very beautiful place.
w666|end|ending|We finally arrived.
w667|beginning|start|At first it was difficult.
w668|half|middle|Cut the bread in half.
w669|fear|afraid/scared|I'm afraid of dogs.
w670|sleepiness|sleepy/dream|I'm very sleepy.
w671|hunger|hungry|I'm hungry.
w672|thirst|thirsty|I'm thirsty.
w673|luck||Good luck!
w674|peace||We want to live in peace.
w675|war||War is terrible.
w676|art||I like modern art.
w677|color|colour|What color is your car?
w678|shape|form/way|It's heart-shaped.
w679|size||Do you have another size?
w680|weight||What is the weight of the suitcase?
w681|meter|metre/subway|He is two meters tall.
w682|shopping|purchase|I'm going shopping.
w683|sale|offer/deal|There's a sale today.
w684|card|credit card|Can I pay by card?
w685|bill (money)|banknote/note/ticket|I only have large bills.
w686|coin|currency|I don't have any coins.
w687|ticket||I need a round-trip ticket.
w688|map||Can you show it to me on the map?
w689|ship|boat|We're going to the island by boat.
w690|motorcycle|motorbike/bike|My brother has a motorcycle.
w691|passport||Do you have your passport?
w692|suitcase||My suitcase is very heavy.
w693|baggage|luggage|Where do I pick up the luggage?
w694|tourist||There are a lot of tourists in the square.
w695|exit|departure/way out|Where is the exit?
w696|entrance|ticket/entry|Admission is free.
w697|traffic light|stoplight|Wait, the light is red.
w698|stop|bus stop|Where is the bus stop?
w699|nice to meet you|pleased to meet you|Nice to meet you, my name is Ana.
w700|welcome||Welcome to our home!
w701|please||A glass of water, please.
w702|you're welcome|not at all|You're welcome, it was a pleasure to help you.
w703|I'm sorry|sorry|I'm sorry, I'm late.
w704|good morning||Good morning, Mom.
w705|good evening|good night|Good night, sleep well.
w706|see you later|see you/bye|See you later, see you tomorrow.
w707|there||Your backpack is there.
w708|over there|there|My grandparents live over there.
w709|here|over here|Come here, please.
w710|zero|0|My phone number starts with zero.
w711|gentleman|Mr./sir/man|Mr. Pérez is very kind.
w712|lady|Mrs./madam/woman|Mrs. López sells flowers.
w713|young lady|Miss|That young lady is my teacher.
w714|grandfather|grandpa|My grandfather is eighty years old.
w715|grandmother|grandma|My grandmother cooks very well.
w716|nephew||My nephew plays soccer.
w717|granddaughter||My granddaughter is five years old.
w718|cousin (female)|cousin|My cousin lives in Mexico.
w719|funny||My dad is very funny.
w720|favor|favour|Can you do me a favor?
w721|class|lesson|The class starts at eight.
w722|mom|mommy/mum|Mom, I'm hungry.
w723|dad|daddy|Dad works in an office.
w724|classmate|companion/partner/colleague|My classmate is very nice.
w725|teacher||The teacher explains the lesson.
w726|student|pupil|There are twenty students in my class.
w727|school||I go to school by bike.
w728|classroom||The classroom is on the second floor.
w729|exam|test|Tomorrow I have an English test.
w730|homework|task|I already finished my homework.
w731|lesson||Today we're studying lesson five.
w732|blackboard|board/whiteboard|The teacher writes on the board.
w733|eraser|rubber|Can you lend me your eraser?
w734|ruler|rule|I need a ruler for my homework.
w735|scissors||Cut the paper with the scissors.
w736|page||Open your books to page ten.
w737|letter|handwriting|Your handwriting is very nice.
w738|sentence|phrase|Read this sentence out loud.
w739|grade|mark/note|I got a good grade in math.
w740|subject||What is your favorite subject?
w741|math|mathematics/maths|I really like math.
w742|science||I'm very interested in science.
w743|English||My brother speaks English very well.
w744|Spanish||I study Spanish every day.
w745|Japanese||My friend wants to learn Japanese.
w746|dance||I like dancing with my family.
w747|sing||My sister sings very well.
w748|rain||It's going to rain a lot today.
w749|snow||In winter it snows in the mountains.
w750|return|go back/come back|What time do you get back home?
w751|take out|get out/pull out|Take the book out of your backpack.
w752|drive||My dad drives carefully.
w753|give back|return|I'll give you the book back tomorrow.
w754|love|really like|I love chocolate.
w755|practice|practise|I practice piano every afternoon.
w756|paint||My son is painting a tree.
w757|offer||I offered my neighbor help.
w758|kiss||The mom kisses the baby.
w759|hug|embrace|I hug my grandmother.
w760|cut||Cut the bread, please.
w761|choose|pick/select|Choose a color.
w762|grab|hold/take|Hold my hand.
w763|understand|comprehend|I don't understand this question.
w764|iron||My dad irons his shirt.
w765|sweep||I sweep the kitchen floor.
w766|tidy up|organize/order|Clean up your room, please.
w767|boil||Boil the water for the tea.
w768|fry||My grandmother fries fish.
w769|heat up|warm up/heat|Heat up the soup, please.
w770|mix|stir|Mix the flour with the egg.
w771|go to bed|lie down|I go to bed at ten.
w772|matter|import|It doesn't matter, it's okay.
w773|interest|be interested|I'm interested in history.
w774|bother|annoy|Does the music bother you?
w775|turn||Turn right at the corner.
w776|turn|fold/bend|Turn left at the traffic light.
w777|park||You can't park here.
w778|charge||How much do you charge for this?
w779|save||I'm saving money for a trip.
w780|lend||Can you lend me your pencil?
w781|chat|talk|I like chatting with my friends.
w782|let know|tell/inform/notify|Let me know when you arrive.
w783|shout|yell/scream|Don't shout, the baby is sleeping.
w784|smile||The girl is smiling in the photo.
w785|jump||The dog jumps very high.
w786|fall|drop|Leaves fall in autumn.
w787|push||Push the door to open it.
w788|lift|raise|Raise your hand if you know.
w789|throw|toss/launch|Throw the ball to your brother.
w790|fish|go fishing|My grandfather fishes in the river.
w791|ride||I like riding horses.
w792|begin|start|The movie starts at seven.
w793|move (house)|move|We're moving to another city.
w794|give (as a gift)|give|I gave my mom flowers.
w795|add||Add two plus three.
w796|subtract||Subtract two from five.
w797|measure||How tall are you?
w798|weigh||How much does the suitcase weigh?
w799|hate||I hate getting up early.
w800|love||I love my family.
w801|miss||I miss you a lot, Grandma.
w802|wish|want/desire|I wish you a happy birthday.
w803|imagine||Imagine a house on the beach.
w804|copy||Copy the words into your notebook.
w805|correct|grade/fix|The teacher grades the exams.
w806|have lunch|eat lunch|We have lunch together at one.
w807|empty||Empty the trash, please.
w808|turn on|switch on/light|Turn on the light, please.
w809|turn on|switch on/light|Turn on the TV, please.
w810|connect|plug in|Connect the cable to the computer.
w811|download|unload|I'm going to download an app.
w812|print||I need to print my homework.
w813|mark|check/dial|Mark the correct answer.
w814|hang|hang up|Hang your coat here.
w815|repair|fix|My dad is fixing the bicycle.
w816|create|make|The children are creating a story together.
w817|use|utilize|Use the dictionary in class.
w818|put in|put|Put the clothes in the suitcase.
w819|place|put|Put the plates on the table.
w820|hide||The boy hides the chocolate.
w821|point|point out/point to|Point to the country on the map.
w822|observe|watch|We watch the stars at night.
w823|appear||The sun appears from behind the mountain.
w824|disappear|vanish|My cat disappeared yesterday.
w825|comb one's hair|comb|I comb my hair before going out.
w826|put on makeup|do makeup|My sister puts on makeup in the bathroom.
w827|shave||My dad shaves every morning.
w828|brush||I brush my teeth three times a day.
w829|put on|wear|Put on your jacket, it's cold.
w830|be called|be named|What's your name?
w831|leave|go away/go|I'm leaving now, see you tomorrow.
w832|fall in love||He fell in love with his classmate.
w833|make a mistake|be wrong|Sorry, I dialed the wrong number.
w834|remember|recall|Do you remember my name?
w835|desire|urge/feel like|I feel like eating ice cream.
w836|fulfill|turn (age)/keep|My son turns ten today.
w837|pet||Do you have a pet at home?
w838|mouse|rat|A mouse is running through the kitchen.
w839|rabbit|bunny|The rabbit eats carrots.
w840|bear||The bear sleeps in winter.
w841|lion||The lion is the king of the jungle.
w842|tiger||The tiger has black stripes.
w843|elephant||The elephant has big ears.
w844|monkey||The monkey is eating a banana.
w845|giraffe||The giraffe has a long neck.
w846|sheep||Sheep give us wool.
w847|hen|chicken|The hen lays eggs.
w848|duck||There are ducks on the lake.
w849|snake||The snake lives in the forest.
w850|frog||The frog jumps into the water.
w851|butterfly||A butterfly is flying in the garden.
w852|bee||The bee makes honey.
w853|ant||Ants work hard.
w854|fly||There's a fly in the soup.
w855|mosquito||A mosquito bit me on the arm.
w856|spider||My sister is afraid of spiders.
w857|turtle|tortoise|The turtle walks very slowly.
w858|dolphin||We saw dolphins in the sea.
w859|whale||The whale is a huge animal.
w860|shark||The shark has big teeth.
w861|wolf||The wolf howls at night.
w862|fox||The fox is very clever.
w863|bull||The bull is strong and big.
w864|donkey||The donkey carries the load.
w865|insect|bug|I like looking for insects in the park.
w866|hair||She has long hair.
w867|neck||My neck hurts.
w868|shoulder||The child is sleeping on my shoulder.
w869|knee||I fell and hurt my knee.
w870|elbow||Don't put your elbows on the table.
w871|nail|fingernail|Cut your nails, please.
w872|lip|lips|My lips are dry.
w873|tongue|language|The dog sticks out its tongue.
w874|eyebrow||My dad has thick eyebrows.
w875|forehead|front|You have a fever, your forehead is hot.
w876|cheek||Grandma kisses me on the cheek.
w877|beard||My grandfather has a white beard.
w878|skin||Use cream for your skin.
w879|bone||The dog is eating a bone.
w880|throat||I have a sore throat.
w881|chest||My chest hurts when I cough.
w882|belly|tummy/stomach|My tummy hurts.
w883|molar|back tooth/tooth|I have a toothache.
w884|cough||I've had a cough since yesterday.
w885|flu|influenza|My brother has the flu.
w886|cold (illness)|cold|I have a bad cold.
w887|wound|injury/cut|Wash the wound well.
w888|pill|tablet|Take a pill after eating.
w889|prescription|recipe|The doctor gave me a prescription.
w890|dentist||Tomorrow I'm going to the dentist.
w891|patient||The patient is waiting for the doctor.
w892|ambulance||Call an ambulance!
w893|clinic||The clinic opens at nine.
w894|forty|40|My mom is forty years old.
w895|sixty|60|An hour has sixty minutes.
w896|seventy|70|My grandfather is seventy years old.
w897|eighty|80|The book costs eighty pesos.
w898|ninety|90|I got ninety on the exam.
w899|two hundred|200|The ticket costs two hundred pesos.
w900|five hundred|500|There are five hundred students in the school.
w901|third||I live on the third floor.
w902|room|bedroom/quarter/fourth|My room is small.
w903|fifth||I'm in fifth grade.
w904|thirteen|13|My sister is thirteen years old.
w905|fourteen|14|There are fourteen children in the park.
w906|sixteen|16|My cousin is sixteen years old.
w907|seventeen|17|There are seventeen days until Christmas.
w908|eighteen|18|My brother is turning eighteen.
w909|nineteen|19|There are nineteen books on the table.
w910|twenty-five|25|My birthday is on May twenty-fifth.
w911|nice to meet you|pleased to meet you/delighted|Nice to meet you.
w912|excuse me|sorry/pardon|Excuse me, what time is it?
w913|bye|bye-bye/see you|Bye, see you!
w914|great|awesome/cool|Your drawing is so great!
w915|perfect||Your Spanish is perfect.
w916|ready|prepared|Are you ready to go?
w917|happy|glad/pleased|I'm very happy with my present.
w918|cheerful|happy/joyful|My aunt is a cheerful person.
w919|in love||My brother is in love.
w920|famous||He's a very famous singer.
w921|popular||This game is very popular.
w922|blond|blonde|My cousin has blond hair.
w923|dark-skinned|brunette/tanned/dark-haired|My dad is dark and tall.
w924|red-haired|redhead/redheaded|The red-haired boy is my neighbor.
w925|bald||My grandfather is bald.
w926|wide|broad|This river is very wide.
w927|narrow|tight|The street is very narrow.
w928|round||The table is round.
w929|square||The window is square.
w930|heavy||This box is very heavy.
w931|light|lightweight|My backpack is light.
w932|hard|tough|The bread is hard.
w933|soft (not hard)|soft|This pillow is very soft.
w934|soft (to touch)|soft/smooth/gentle|The baby's skin is very soft.
w935|sweet||This cake is very sweet.
w936|salty||The soup is very salty.
w937|spicy|hot|I like spicy food.
w938|bitter||Coffee without sugar is bitter.
w939|sour|acid/acidic|Lemons are very sour.
w940|tasty|delicious|My grandmother's food is tasty.
w941|delicious|yummy|This ice cream is delicious!
w942|fresh|cool|The fish is fresh.
w943|lukewarm|warm|The water is lukewarm.
w944|wet||My shoes are wet.
w945|dry||The clothes are already dry.
w946|beautiful|lovely|What a beautiful landscape!
w947|ugly||This sweater is a bit ugly.
w948|lovely|beautiful/gorgeous/precious|Your dress is lovely.
w949|old|antique/ancient|My grandfather has an antique watch.
w950|modern||It's a very modern building.
w951|different|distinct|Every child is different.
w952|different||We have different tastes.
w953|same|equal|Your shirt is the same as mine.
w954|similar|alike|You look a lot like your dad.
w955|special||Today is a special day.
w956|normal|ordinary/usual|Today was a normal day.
w957|rare|strange/unusual|It's unusual to see snow here.
w958|strange|weird/odd|I heard a strange noise.
w959|typical|traditional|It's a typical Mexican dish.
w960|favorite|favourite|Blue is my favorite color.
w961|favorite|preferred|What is your favorite food?
w962|main|principal|This is the main street.
w963|simple|easy|It's a very simple recipe.
w964|complicated|complex|This problem is complicated.
w965|slow||My computer is very slow.
w966|silent|quiet|The library is a quiet place.
w967|noisy|loud|My neighbor is very noisy.
w968|brave|angry/fierce|My dad is angry because I didn't do my homework.
w969|brave|courageous|My brother is very brave.
w970|shy|timid|My daughter is a little shy.
w971|serious||The teacher is very serious.
w972|polite|well-mannered/educated|Your son is very polite.
w973|honest||You always have to be honest.
w974|hardworking|worker|My mom is very hardworking.
w975|lazy||The cat is very lazy.
w976|generous||My grandfather is very generous.
w977|selfish||Don't be selfish, share.
w978|jealous||The dog is jealous of the baby.
w979|proud||I'm proud of you.
w980|surprised||Everyone was surprised by the news.
w981|scared|frightened/afraid|The boy is scared of the storm.
w982|excited||I'm excited about the trip.
w983|asleep|sleeping|The baby is asleep.
w984|awake||Are you still awake?
w985|alive|living|The fish is still alive.
w986|dead||The plant is dead.
w987|broken||My cell phone is broken.
w988|healthy||Eating fruit is very healthy.
w989|free|free of charge|Admission is free for children.
w990|purple||I like the purple dress.
w991|violet|purple|She is wearing a violet blouse.
w992|light blue|sky blue|The sky is light blue today.
w993|golden|gold|I have a gold watch.
w994|silver||My uncle's car is silver.
w995|orange||I painted the sun orange.
w996|gold||My mom has a gold ring.
w997|silver|money|This necklace is made of silver.
w998|iron||The door is made of iron.
w999|wood||The table is made of wood.
w1000|glass||Careful, the cup is made of glass.
w1001|plastic||This bottle is made of plastic.
w1002|cotton||My T-shirt is made of cotton.
w1003|wool||Grandma knits with wool.
w1004|leather||I have a leather jacket.
w1005|cloth|fabric|I bought fabric to make curtains.
w1006|pocket||I have the keys in my pocket.
w1007|button||A button fell off my shirt.
w1008|belt|seat belt|Put on your seat belt.
w1009|tie|necktie|My dad wears a tie at work.
w1010|scarf|muffler|Put on your scarf, it's cold.
w1011|glove||I can't find my gloves.
w1012|cap|hat|I put on my cap for the sun.
w1013|boot||I wear boots when it rains.
w1014|sandal||In summer I wear sandals.
w1015|sneaker|trainer/sneakers|I need new sneakers for running.
w1016|pajamas|pyjamas|Put on your pajamas, it's already late.
w1017|suit||My dad is wearing a black suit.
w1018|uniform||The students wear a blue uniform.
w1019|blouse||My mom has a white blouse.
w1020|sweater|jumper/pullover|This sweater is very warm.
w1021|jeans|denim|I like these blue jeans.
w1022|shorts||At the beach I wear shorts.
w1023|underwear||Put the underwear away in the drawer.
w1024|ring||My grandma has an old ring.
w1025|necklace||I gave my mom a necklace.
w1026|earring||My sister lost an earring.
w1027|wallet|purse|My wallet is on the table.
w1028|wallet|billfold|My dad lost his wallet.
w1029|coin purse|purse|I keep the coins in the coin purse.
w1030|comb||Where is my comb?
w1031|brush||I need a new toothbrush.
w1032|toothpaste||We ran out of toothpaste.
w1033|soap||Wash your hands with soap.
w1034|shampoo||This shampoo smells really nice.
w1035|towel||Take a clean towel.
w1036|toilet paper||There's no toilet paper in the bathroom.
w1037|pillow||I like a soft pillow.
w1038|blanket||I'm cold, give me a blanket.
w1039|sheet|bed sheet|Change the sheets on the bed.
w1040|mattress||This mattress is very comfortable.
w1041|lamp||Turn off the lamp, please.
w1042|curtain||Open the curtains, it's already daytime.
w1043|carpet|rug|The cat sleeps on the carpet.
w1044|shelf|bookshelf|Put the books on the shelf.
w1045|drawer||The spoons are in the drawer.
w1046|desk||I do my homework at my desk.
w1047|computer|PC|I use the computer to study.
w1048|screen|display|The phone screen is broken.
w1049|keyboard||This keyboard doesn't have the letter ñ.
w1050|cell phone|mobile phone/phone|Where did I leave my cell phone?
w1051|camera||I'm taking the camera on the trip.
w1052|television|TV/TV set|We bought a new TV.
w1053|refrigerator|fridge|The milk is in the refrigerator.
w1054|oven||The bread is in the oven.
w1055|microwave||Heat the milk in the microwave.
w1056|stove|cooker|The pot is on the stove.
w1057|washing machine|washer|Put the dirty clothes in the washing machine.
w1058|air conditioner|air conditioning/AC|Turn on the air conditioner, it's hot.
w1059|fan||The fan is broken.
w1060|heating|heater|In winter we use the heating.
w1061|trash|garbage/rubbish|Take out the trash, please.
w1062|stairs|staircase/ladder|Go up the stairs, the elevator isn't working.
w1063|elevator|lift|We take the elevator to the fifth floor.
w1064|garage||The car is in the garage.
w1065|balcony||There are flowers on the balcony.
w1066|terrace||We have dinner on the terrace.
w1067|courtyard|patio/yard|The children play in the courtyard.
w1068|glass|cup|Give me a glass of water.
w1069|plate|dish|Wash the dishes after eating.
w1070|pot|saucepan|The soup is in the pot.
w1071|frying pan|pan/skillet|Heat the oil in the frying pan.
w1072|napkin|serviette|Pass me a napkin, please.
w1073|tablecloth||Put the tablecloth on the table.
w1074|pitcher|jug|There is a pitcher of juice on the table.
w1075|glass (stemmed)|wine glass/goblet|I serve the juice in glasses for the party.
w1076|can|tin|Open the can of tuna.
w1077|box||The toys are in the box.
w1078|package|parcel|A package arrived for you.
w1079|fast food||Don't eat too much fast food.
w1080|hamburger|burger|I want a hamburger with fries.
w1081|pizza||We ordered a large pizza.
w1082|sandwich||I'm bringing a sandwich for lunch.
w1083|pasta||Tonight we're having pasta for dinner.
w1084|noodle||I like noodle soup.
w1085|sausage||We eat sausages for breakfast.
w1086|beef||We bought beef for dinner.
w1087|steak|beefsteak|My dad makes a delicious steak.
w1088|fillet|filet|I want a fish fillet.
w1089|shrimp|prawn|I love fried shrimp.
w1090|tuna||I'm making a tuna sandwich.
w1091|salmon||Salmon is my favorite fish.
w1092|bean|kidney bean|We eat rice and beans.
w1093|lentil||Lentil soup is very healthy.
w1094|corn|maize|Tortillas are made with corn.
w1095|lettuce||Wash the lettuce well.
w1096|carrot||The rabbit is eating a carrot.
w1097|cucumber||I put cucumber in the salad.
w1098|bell pepper|pepper/green pepper|I don't like green peppers.
w1099|spinach||Spinach is very healthy.
w1100|pumpkin|squash|We make pumpkin soup.
w1101|mushroom|button mushroom|The pizza has mushrooms.
w1102|avocado||I like bread with avocado.
w1103|pineapple||The pineapple is very sweet.
w1104|watermelon||In summer we eat watermelon.
w1105|melon||This melon smells very good.
w1106|peach||The peach is my favorite fruit.
w1107|pear||I'd like a pear, please.
w1108|cherry||There are cherries on the cake.
w1109|mango||Mango juice is delicious.
w1110|kiwi|kiwi fruit|Kiwi has a lot of vitamin C.
w1111|coconut||We drink coconut water at the beach.
w1112|walnut|nut|I put walnuts in the cake.
w1113|honey||I like tea with honey.
w1114|jam|marmalade/jelly|I spread jam on the bread.
w1115|yogurt|yoghurt|I eat yogurt with fruit.
w1116|cream||Put some cream in the coffee.
w1117|flour||We need flour for the cake.
w1118|vinegar||Put a little vinegar in the salad.
w1119|sauce||This sauce is very spicy.
w1120|candy|sweet|The boy wants a candy.
w1121|dulce de leche|caramel spread|I love bread with dulce de leche.
w1122|cake||We made a chocolate cake.
w1123|toast||I have toast with butter for breakfast.
w1124|cereal||The children eat cereal with milk.
w1125|soft drink|soda/pop|Do you want a soft drink?
w1126|soda|fizzy drink/pop|An orange soda, please.
w1127|mineral water||I bought a bottle of mineral water.
w1128|ice||Put ice in my glass, please.
w1129|shake|milkshake/smoothie|I'm having a strawberry milkshake.
w1130|snack|afternoon snack|What's for snack today?
w1131|menu||Could you bring me the menu, please?
w1132|main course|main dish/entree|The main course is chicken with rice.
w1133|portion|serving/helping|I want a portion of cake.
w1134|tip|gratuity|We left a tip for the waiter.
w1135|waiter|server|The waiter brings us the food.
w1136|cook|chef|My uncle is a cook at a hotel.
w1137|butcher shop|butcher's|I buy chicken at the butcher shop.
w1138|greengrocer|vegetable shop/greengrocer's|The vegetables from the greengrocer are fresh.
w1139|fruit shop|fruit store|I'm going to the fruit shop for apples.
w1140|bookstore|bookshop|I bought a book at the bookstore.
w1141|stationery store|stationer's|I need to go to the stationery store for notebooks.
w1142|hair salon|hairdresser's/beauty salon|My mom goes to the hair salon on Saturdays.
w1143|shoe store|shoe shop|We bought boots at the shoe store.
w1144|toy store|toy shop|The children want to go to the toy store.
w1145|ice cream shop|ice cream parlor|Let's go to the ice cream shop after dinner.
w1146|kiosk|newsstand/stand|I buy the newspaper at the kiosk.
w1147|shopping mall|mall/shopping center|We're going to the shopping mall on Sunday.
w1148|gas station|petrol station|We stopped at the gas station.
w1149|police station||The police station is near the park.
w1150|firefighter|fireman|My son wants to be a firefighter.
w1151|city hall|town hall/municipality|I work at city hall.
w1152|embassy||We went to the Japanese embassy.
w1153|zoo||Let's go to the zoo to see the lions.
w1154|stadium||The stadium is full of people.
w1155|gym|gymnasium|My dad goes to the gym in the morning.
w1156|swimming pool|pool|The children swim in the pool.
w1157|court|field/pitch|We play soccer on the field.
w1158|factory|plant|My uncle works in a factory.
w1159|farm||My grandparents have a farm.
w1160|forest|woods|We walked through the forest.
w1161|jungle|rainforest|There are many animals in the jungle.
w1162|desert||It's very hot in the desert.
w1163|coast|seashore/shore|We live on the coast.
w1164|ocean||The Pacific Ocean is very big.
w1165|volcano||You can see the volcano from here.
w1166|valley||The town is in a valley.
w1167|hill||We rode our bikes up the hill.
w1168|sand||The children play in the sand.
w1169|wave||The waves are very big today.
w1170|rainbow||Look, there's a rainbow!
w1171|storm||There was a strong storm last night.
w1172|thunder||The dog is afraid of thunder.
w1173|lightning|lightning bolt|Lightning struck the tree.
w1174|fog|mist|There's a lot of fog this morning.
w1175|climate|weather|The climate here is very pleasant.
w1176|temperature||The temperature dropped a lot today.
w1177|degree||It's thirty degrees today.
w1178|humidity||It's very humid in summer.
w1179|shadow|shade|Let's sit in the shade of the tree.
w1180|scenery|landscape/view|The view from the mountain is beautiful.
w1181|view|sight|The room has a view of the sea.
w1182|avenue||The store is on the main avenue.
w1183|highway|road/main road|We drove on the highway to the beach.
w1184|path|road/way|This path goes to the river.
w1185|block (city)|city block|The school is two blocks away.
w1186|neighborhood|district|My neighborhood is very quiet.
w1187|sidewalk|pavement|Walk on the sidewalk, please.
w1188|ticket|fare|I bought the bus ticket.
w1189|seat||Is this seat free?
w1190|platform||The train arrives at platform two.
w1191|flight||Our flight leaves at ten.
w1192|truck|lorry|A big truck is going down the street.
w1193|pickup truck|van/pickup|My uncle has a red pickup truck.
w1194|speed||Slow down, please.
w1195|accident|crash|There was an accident on the corner.
w1196|traffic||There's a lot of traffic at this time.
w1197|calendar||Mark the date on the calendar.
w1198|early morning|dawn|I woke up in the early morning.
w1199|dawn|sunrise/daybreak|We watched the sunrise at the beach.
w1200|sunset|dusk/evening|The sunset over the sea is beautiful.
w1201|century||This building is from the last century.
w1202|decade||I lived in Mexico for a decade.
w1203|era|period/time|At that time there was no internet.
w1204|future||What do you want to be in the future?
w1205|present|now|You have to live in the present.
w1206|past||Let's not talk about the past.
w1207|nowadays|these days/today|Nowadays everyone has a cell phone.
w1208|last night||I slept very well last night.
w1209|while|meanwhile|I listen to music while I cook.
w1210|just|recently|I just got home.
w1211|right away|immediately/at once|I'll be right back.
w1212|barely|hardly/scarcely|We barely arrived on time.
w1213|outside|outdoors|The children are playing outside.
w1214|inside|indoors|It's cold, let's go inside.
w1215|on top|above/over|The cat is on top of the table.
w1216|under|underneath/below/beneath|The dog sleeps under the bed.
w1217|around||There are trees around the house.
w1218|opposite|in front/across|The pharmacy is opposite the bank.
w1219|next door|beside/next to|My uncle lives next door.
w1220|next to|beside/by|Sit next to me.
w1221|neither|either/not either|I don't want to go either.
w1222|besides|also/moreover/furthermore|It's cheap and also very tasty.
w1223|even||Even my grandma uses the internet.
w1224|only|just/solely|I only have five pesos.
w1225|especially|particularly|I like fruit, especially mango.
w1226|really|truly/actually|I really don't know what to do.
w1227|clearly||Speak clearly, please.
w1228|exactly|precisely|What time is it exactly?
w1229|surely|certainly/probably|It's surely going to rain.
w1230|probably|likely|I'll probably be late.
w1231|maybe|perhaps|Maybe I'll go to the beach tomorrow.
w1232|maybe|perhaps/possibly|Maybe it'll rain this afternoon.
w1233|again|once more|Can you explain it again?
w1234|against|versus|Tomorrow we play against another team.
w1235|during|throughout|I slept during the trip.
w1236|however|nevertheless/but|It's difficult; however, I'm going to try.
w1237|except|but/apart from|I work every day except Sunday.
w1238|some|any|Do you have any questions?
w1239|none|no/not any|I don't have any problem.
w1240|any|whatever/whichever|You can come at any time.
w1241|both||Both brothers are very tall.
w1242|the rest|others/other|The other children already left.
w1243|so much|so/that much|Don't eat so much.
w1244|less|fewer|It's less cold today than yesterday.
w1245|half|middle|I bought half a kilo of cheese.
w1246|double|twice|We paid double for the tickets.
w1247|pair|couple|I need a new pair of shoes.
w1248|dozen||I bought a dozen eggs.
w1249|kilo|kilogram|A kilo of apples, please.
w1250|liter|litre|I drink two liters of water a day.
w1251|centimeter|centimetre/cm|The table is eighty centimeters long.
w1252|kilometer|kilometre/km|The beach is two kilometers away.
w1253|but rather|but/rather|It's not blue, but green.
w1254|after|behind|After dinner, we went out for a walk.
w1255|before|in front of/facing|He spoke in front of a lot of people.
w1256|enjoy||Enjoy your vacation.
w1257|make the most of|take advantage of/use|We have to make the most of the good weather.
w1258|tear|teardrop|She had tears in her eyes.
w1259|smile||You have a very nice smile.
w1260|laughter|laugh|His laugh is very cheerful.
w1261|look|gaze/glance|He has a calm look.
w1262|movement|motion|Every movement of the dancer is perfect.
w1263|step|pace|Take a step forward.
w1264|hug|embrace|My grandma gave me a hug.
w1265|kiss||I gave my mom a kiss.
w1266|greeting|regards|Say hello to your family.
w1267|farewell|goodbye|Tomorrow is the farewell party.
w1268|remain|be left/stay|There are two cookies left.
w1269|treat|try/handle|I try to eat more vegetables.
w1270|turn out|result/prove|The exam turned out to be very easy.
w1271|exist||Do you think ghosts exist?
w1272|achieve|manage/accomplish|I finally managed to finish the book.
w1273|get|obtain/manage|I got tickets for the concert.
w1274|obtain|get/gain|He got a good grade.
w1275|produce|make|This region produces a lot of coffee.
w1276|carry out|realize/fulfill|I want to fulfill my dream.
w1277|maintain|keep|We have to keep the house clean.
w1278|consider|think about|I'll consider your idea.
w1279|stay|remain|We stayed at home all day.
w1280|happen|occur|What happened last night?
w1281|convert|turn into/change|He turned the garage into a workshop.
w1282|develop||The company develops new products.
w1283|recognize|admit/acknowledge|I didn't recognize you in that hat.
w1284|indicate|show/point out|Can you show me the way?
w1285|establish|found/set up|They founded the company in 1990.
w1286|form|shape/make|The children formed a circle.
w1287|include||Does the price include breakfast?
w1288|add||Add a little salt.
w1289|add||Add more sugar to the coffee.
w1290|increase|rise/go up|Prices went up a lot.
w1291|reduce|cut down/lower|I want to cut down on sugar.
w1292|decrease|diminish/go down|The fever went down during the night.
w1293|compare||Don't compare your children.
w1294|depend||It depends on the weather.
w1295|belong||This book belongs to my father.
w1296|protect||We have to protect nature.
w1297|defend|guard|The dog guards the house.
w1298|attack||The team attacked in the second half.
w1299|avoid||I avoid eating very late.
w1300|prevent|stop/hinder|The rain prevented us from going out.
w1301|resolve|solve/settle|We have to solve this problem.
w1302|solve|fix/resolve|We already solved the problem.
w1303|argue|discuss/debate|My brothers argue about everything.
w1304|deny|refuse|He denies everything.
w1305|admit|accept/acknowledge|I admit that I was wrong.
w1306|trust|rely on|I trust you.
w1307|doubt||I doubt he'll come today.
w1308|suppose|guess/assume|I suppose you're right.
w1309|suspect||The police suspect the neighbor.
w1310|deserve||You deserve a break.
w1311|thank|be grateful|Thank you so much for your help.
w1312|congratulate||Congratulations on your birthday.
w1313|say goodbye|take leave|I said goodbye to my friends.
w1314|meet|get together/gather|We get together on Sundays.
w1315|meet|run into/bump into|I ran into Ana at the market.
w1316|accompany|go with|Will you come with me to the doctor?
w1317|direct|lead/conduct/manage|She conducts the orchestra.
w1318|organize|arrange|We're going to organize a party.
w1319|plan||We're planning a trip.
w1320|investigate|research/look into|The police are investigating the case.
w1321|analyze|examine|We have to analyze the data.
w1322|calculate|work out|Calculate how much everything costs.
w1323|design||My sister designs clothes.
w1324|destroy||The hurricane destroyed many houses.
w1325|burn||Careful, don't burn yourself.
w1326|shine|glow/sparkle|The stars shine in the sky.
w1327|light up|illuminate|The moon lights up the path.
w1328|hit|knock/strike/beat|Someone is knocking on the door.
w1329|stick|glue/paste|Stick the photo in the notebook.
w1330|tie|tie up/fasten|Tie your shoes.
w1331|let go|release/let go of|Let go of my hand!
w1332|pick up|collect/gather|I'm going to pick up the children.
w1333|collect||My son collects stamps.
w1334|gather|collect/raise|We raised money for the trip.
w1335|put together|gather/join|Put the chairs together, please.
w1336|separate|sort|You have to sort the trash.
w1337|divide|split|We divided the pizza into eight pieces.
w1338|hand out|distribute/deliver|The teacher handed out the exams.
w1339|borrow||I borrowed a book from my aunt.
w1340|invest||He invested his money in a store.
w1341|get worse|worsen/deteriorate|The weather got worse in the afternoon.
w1342|cure|heal/treat|The doctor treated the wound.
w1343|heal|recover/get better|The wound healed quickly.
w1344|breathe||Breathe deeply.
w1345|cough||The boy coughs a lot at night.
w1346|sneeze||I sneeze a lot in spring.
w1347|sweat|perspire|I sweat a lot when I run.
w1348|tremble|shake/shiver|I'm shivering with cold.
w1349|bleed||My nose is bleeding.
w1350|vomit|throw up/be sick|The boy threw up in the car.
w1351|get hurt|hurt oneself/injure oneself|I hurt my knee playing.
w1352|hurt|wound/injure|His words hurt me.
w1353|break|crack/smash|A glass broke.
w1354|twist|sprain/bend|I twisted my ankle.
w1355|tire|make tired/wear out|Walking so much tires me out.
w1356|relax||I relax by listening to music.
w1357|get bored|be bored|The children get bored at home.
w1358|worry|concern|I'm worried about your health.
w1359|scare|frighten|You scared me!
w1360|surprise||The news surprised me.
w1361|make happy|cheer up/please|I'm glad to see you.
w1362|get angry|get mad|Don't get mad at me.
w1363|offend|upset|I didn't mean to offend you.
w1364|forgive|pardon|I forgive you.
w1365|apologize|say sorry|He apologized for being late.
w1366|regret|be sorry|I don't regret anything.
w1367|make fun of|tease/mock|Don't make fun of your brother.
w1368|deceive|trick/cheat/fool|That salesman cheated me.
w1369|steal|rob|My bicycle was stolen.
w1370|escape|get away/run away|The dog escaped from the garden.
w1371|flee|run away|The thieves fled in a car.
w1372|chase|pursue/follow|The dog is chasing the cat.
w1373|catch up|reach|I can't reach the top shelf.
w1374|catch|trap|Catch the ball!
w1375|hunt||The cat likes to hunt mice.
w1376|kill||He killed a mosquito with his hand.
w1377|save|rescue|The dog saved the boy.
w1378|rescue|save|The firefighters rescued the cat.
w1379|support|back/lean|My parents always support me.
w1380|encourage|cheer up/cheer on|My friend encouraged me to keep going.
w1381|advise|counsel|I advise you to rest.
w1382|recommend||What dish do you recommend?
w1383|suggest||I suggest going by train.
w1384|propose|suggest|He proposed to her on the beach.
w1385|reject|refuse/turn down/decline|She turned down the invitation.
w1386|refuse|decline|The boy refuses to eat vegetables.
w1387|obey||The children obey their mother.
w1388|prohibit|forbid/ban|Smoking is prohibited here.
w1389|force|oblige/make|Nobody is forcing you to go.
w1390|demand|require|The boss demands punctuality.
w1391|claim|complain/demand|I went to complain at the store.
w1392|insist||He insists on paying the bill.
w1393|convince||You convinced me.
w1394|persuade|convince|I persuaded him to stay.
w1395|express||It's hard for me to express my feelings.
w1396|communicate|inform/tell|I'm letting you know that the meeting is tomorrow.
w1397|inform|notify/tell|They informed us of the schedule change.
w1398|announce||They announced the name of the winner.
w1399|declare|state|Do you have anything to declare?
w1400|assert|affirm/state/claim|He claims he didn't see anything.
w1401|mention||He didn't mention anything about the party.
w1402|comment|remark/mention|He told me that he's going to move.
w1403|give an opinion|think|What do you think of this idea?
w1404|criticize||Don't criticize others.
w1405|praise|compliment|The teacher praised his drawing.
w1406|narrate|tell|Grandpa tells old stories.
w1407|tell|recount/relate|He told us about his trip to Peru.
w1408|pronounce||How do you pronounce this word?
w1409|spell||Can you spell your last name?
w1410|mean|signify|What does this word mean?
w1411|define||It's hard to define happiness.
w1412|prove|demonstrate/show|Prove to me that you're right.
w1413|check|make sure/verify|Check that the door is closed.
w1414|verify|check|Check the data before sending.
w1415|confirm||I want to confirm my reservation.
w1416|assure|ensure/secure|I assure you it's true.
w1417|guarantee|warrant|The store guarantees the product for one year.
w1418|swear|vow|I swear it wasn't me.
w1419|fail|miss|He missed the last shot.
w1420|fail|fall through|The plan failed.
w1421|succeed|triumph/win|She wants to succeed as a singer.
w1422|compete||Tomorrow I'm competing in a race.
w1423|sign up|enroll/register|I signed up for an English course.
w1424|register|record|We have to register the baby.
w1425|note down|write down/jot down|Write down my phone number.
w1426|write down|note/note down|I wrote down the address on a piece of paper.
w1427|hand in|deliver/hand over|I have to hand in my homework tomorrow.
w1428|society||We live in a modern society.
w1429|government||The government announced new laws.
w1430|president||The president gave a speech.
w1431|politics|policy|I don't like talking about politics.
w1432|law||Everyone must respect the law.
w1433|right||Everyone has the right to education.
w1434|justice||We want justice for everyone.
w1435|freedom|liberty|Freedom is very important.
w1436|safety|security|Children's safety comes first.
w1437|danger||Careful! There's danger.
w1438|risk||Driving in the rain is a risk.
w1439|crime||The police are investigating the crime.
w1440|crime|offense|Stealing is a crime.
w1441|thief|robber|The thief came in through the window.
w1442|victim||They helped the victims of the earthquake.
w1443|judge||The judge made a decision.
w1444|trial|judgment|The trial will be on Monday.
w1445|prison|jail|The thief went to prison.
w1446|fine|ticket|I got a fine for parking badly.
w1447|document|paper|Sign this document, please.
w1448|form||Fill out the form, please.
w1449|procedure|paperwork/formality|The paperwork takes a long time.
w1450|permission|permit/license|I need permission to go out.
w1451|license|licence/permit|I already have a driver's license.
w1452|ID card|card/ID|Show your ID card, please.
w1453|identity||I need to see your ID document.
w1454|nationality|citizenship|What is your nationality?
w1455|citizen||It is the duty of every citizen.
w1456|population||The city's population is growing.
w1457|inhabitant|resident|The town has a thousand inhabitants.
w1458|foreigner|stranger|There are many foreigners in this city.
w1459|immigrant||My grandparents were immigrants.
w1460|border|frontier|We crossed the border by bus.
w1461|region|area|This region is famous for its wine.
w1462|province||Córdoba is a province of Argentina.
w1463|state||Which state of Mexico do you live in?
w1464|capital|capital city|Lima is the capital of Peru.
w1465|community||We help the community.
w1466|neighborhood|vicinity|My neighborhood is very quiet.
w1467|zone|area|I live in a quiet area.
w1468|area|zone|This area is for employees only.
w1469|territory||It is a very large territory.
w1470|nation|country|The nations signed an agreement.
w1471|homeland|native land/fatherland|He misses his homeland a lot.
w1472|flag||The flag of Japan is white and red.
w1473|anthem|national anthem/hymn|We sang the national anthem.
w1474|king||The king lives in the palace.
w1475|queen||The queen waved to the people.
w1476|prince||The prince married an actress.
w1477|princess||My daughter wants to be a princess.
w1478|army|military|My grandfather was in the army.
w1479|soldier||The soldier returned home.
w1480|weapon|arms/gun|The soldiers laid down their weapons.
w1481|battle|fight|They won the battle.
w1482|victory|win|We celebrated the team's victory.
w1483|defeat|loss|It was a hard defeat.
w1484|enemy||I have no enemies.
w1485|ally|partner|We are allies in this project.
w1486|company|firm/business|I work for a big company.
w1487|company|firm/companionship|It's a phone company.
w1488|business|trade|My uncle has a clothing business.
w1489|industry||The tourism industry is important here.
w1490|commerce|trade|Trade with Asia has grown.
w1491|economy||The country's economy improved.
w1492|product||This product is of good quality.
w1493|service||The service in this restaurant is excellent.
w1494|quality||I prefer quality over quantity.
w1495|quantity|amount|I ate a large amount of rice.
w1496|cost|price|The cost of the trip is high.
w1497|expense|expenditure/spending|We had a lot of expenses this month.
w1498|profit|earnings/gain|The store made good profits.
w1499|loss|waste|It was a waste of time.
w1500|debt||I finally paid off my debt.
w1501|loan||I asked the bank for a loan.
w1502|tax||You have to pay taxes.
w1503|salary|wage/pay|The minimum wage went up this year.
w1504|salary|pay/wage|I get paid my salary at the end of the month.
w1505|payment||Payment is made in cash.
w1506|bill|invoice|I got the electricity bill.
w1507|receipt||Could I have the receipt, please?
w1508|cash||Are you paying by card or in cash?
w1509|check|cheque|He paid with a check.
w1510|savings|saving|I spent all my savings on the trip.
w1511|budget|estimate/quote|We don't have a budget for that.
w1512|employment|job/work|I'm looking for a job in an office.
w1513|employee|worker/staff|The company has a hundred employees.
w1514|employer|boss|My employer is very fair.
w1515|worker|laborer|The workers are building a building.
w1516|manager||I want to speak with the manager.
w1517|director|head/principal|The school principal is kind.
w1518|secretary||The secretary answered the phone.
w1519|salesperson|clerk/seller/salesman|The salesperson helped me choose.
w1520|merchant|trader/shopkeeper|My grandfather was a merchant.
w1521|owner||Who is the owner of this dog?
w1522|member|partner|I'm a member of the tennis club.
w1523|colleague|coworker|My colleague helped me with the report.
w1524|meeting||I have a meeting at ten.
w1525|interview||Tomorrow I have a job interview.
w1526|contract||I signed the contract yesterday.
w1527|project||We are working on a new project.
w1528|plan||What's the plan for today?
w1529|objective|aim/goal/purpose|My goal is to learn Spanish.
w1530|goal|target/finish line|My goal is to run ten kilometers.
w1531|result|outcome|We'll know the result tomorrow.
w1532|success||Good luck on your exam!
w1533|failure||A failure is not the end.
w1534|effort||Thank you for your effort.
w1535|experience||I have experience as a teacher.
w1536|skill|ability/talent|She is very skilled at drawing.
w1537|capacity|ability|The stadium holds fifty thousand people.
w1538|knowledge||He has a good knowledge of history.
w1539|career|degree/course|I'm studying medicine.
w1540|profession|occupation|What is your profession?
w1541|trade|craft/occupation|My father learned the trade of carpentry.
w1542|position|post/job|He got a position at the bank.
w1543|post|position/office|She has an important position.
w1544|schedule|timetable/hours|What are the store's hours?
w1545|turn|shift|Please wait your turn.
w1546|break|rest|Let's take a ten-minute break.
w1547|retirement|pension|My father is looking forward to his retirement.
w1548|vacancy|opening|There is a vacancy in the office.
w1549|resume|CV/curriculum vitae|I sent my resume to the company.
w1550|engineer||My brother is an engineer.
w1551|architect||The architect designed the house.
w1552|scientist||I want to be a scientist.
w1553|artist||His mother is a great artist.
w1554|painter||Picasso was a famous painter.
w1555|writer|author|My favorite writer is García Márquez.
w1556|journalist|reporter|The journalist asked a lot of questions.
w1557|photographer||The photographer took pictures of the wedding.
w1558|musician||My uncle is a musician.
w1559|singer||She is a famous singer.
w1560|actor||That actor is very famous in Mexico.
w1561|actress||The actress won an award.
w1562|dancer||He wants to be a professional dancer.
w1563|athlete|sportsperson|She is a very disciplined athlete.
w1564|player||Messi is a great player.
w1565|coach|trainer|The coach talked with the team.
w1566|referee|umpire|The referee blew the whistle to end the match.
w1567|champion||My team is the champion.
w1568|winner||The winner gets a trophy.
w1569|loser||Don't be a sore loser.
w1570|carpenter||The carpenter made a table.
w1571|mechanic||I took the car to the mechanic.
w1572|electrician||We called the electrician.
w1573|plumber||The plumber fixed the bathroom.
w1574|farmer|grower|The farmers grow corn.
w1575|peasant|farmer/farm worker|The farmers work from early in the morning.
w1576|fisherman|fisher|The fisherman went out to sea.
w1577|baker||The baker gets up very early.
w1578|butcher||The butcher cut the meat.
w1579|hairdresser|barber/stylist|My hairdresser is very good.
w1580|mail carrier|postman/mailman|The mail carrier brought a letter.
w1581|pilot||The pilot spoke over the loudspeaker.
w1582|flight attendant|stewardess/air hostess|The flight attendant brought us water.
w1583|guide|tour guide|The guide explained the history to us.
w1584|translator||My mother works as a translator.
w1585|interpreter||We need a Japanese interpreter.
w1586|veterinarian|vet|I took the cat to the vet.
w1587|pharmacist|chemist|Ask the pharmacist.
w1588|psychologist||He talked with a psychologist.
w1589|researcher|investigator|My aunt is a researcher at a university.
w1590|civil servant|official/public employee|My father is a government official.
w1591|politician||That politician talks a lot.
w1592|soldier|military officer|His father is in the military.
w1593|relative|relation|I have relatives in Chile.
w1594|father-in-law||My father-in-law is very nice.
w1595|mother-in-law||My mother-in-law cooks very well.
w1596|son-in-law||My son-in-law is a doctor.
w1597|daughter-in-law||My daughter-in-law is from Colombia.
w1598|brother-in-law||My brother-in-law lives in Lima.
w1599|sister-in-law||My sister-in-law gave me a book.
w1600|great-grandfather||My great-grandfather lived to be a hundred.
w1601|twin||My sister has twins.
w1602|widower|widow|My grandfather is a widower.
w1603|couple|partner|My partner is from Argentina.
w1604|marriage|married couple|They have been married for thirty years.
w1605|wedding||The wedding is in June.
w1606|divorce||The divorce was hard on the children.
w1607|pregnancy||Pregnancy lasts nine months.
w1608|birth||We celebrated the baby's birth.
w1609|death||His dog's death made him sad.
w1610|funeral||We went to her grandmother's funeral.
w1611|childhood|infancy|I had a happy childhood.
w1612|youth||In my youth I traveled a lot.
w1613|teenager|adolescent/teen|My son is already a teenager.
w1614|adult|grown-up|Adults pay more.
w1615|elderly person|old man/old person|I helped an old man cross the street.
w1616|generation||My generation grew up with the internet.
w1617|age||How old are you?
w1618|old age||I want to live in the countryside in my old age.
w1619|joy|happiness/delight|How nice to see you!
w1620|sadness|sorrow|I felt very sad.
w1621|happiness|joy|Happiness is in the little things.
w1622|anger||He couldn't hide his anger.
w1623|rage|fury/anger|Losing makes me so angry.
w1624|fear|dread|I'm afraid of the dark.
w1625|fright|scare/shock|You gave me such a fright!
w1626|surprise||What a surprise to see you here!
w1627|shame|embarrassment|I'm embarrassed to sing.
w1628|pride||My children are my pride.
w1629|jealousy||My dog is jealous of the cat.
w1630|envy||I'm jealous of your trip.
w1631|loneliness|solitude|I don't like being alone.
w1632|hope||Never lose hope.
w1633|trust|confidence|I have confidence in my team.
w1634|doubt|question|If you have any questions, ask me.
w1635|wish|desire|Make a wish.
w1636|excitement|anticipation/illusion|I'm really looking forward to the trip.
w1637|emotion|excitement|She cried with emotion.
w1638|feeling|sentiment|I don't want to hurt your feelings.
w1639|humor|mood|I'm in a good mood today.
w1640|spirit|energy/courage|Come on! You can do it.
w1641|affection|love/fondness|I'm very fond of my grandmother.
w1642|hatred|hate|Hatred doesn't solve anything.
w1643|respect||We should treat everyone with respect.
w1644|patience||Be patient with your brother.
w1645|calm|composure|We have to stay calm.
w1646|stress||Work causes me a lot of stress.
w1647|anxiety||I feel anxious before exams.
w1648|worry|concern|Thank you for your concern.
w1649|character|temperament/nature|My son has a good nature.
w1650|personality||She has a very cheerful personality.
w1651|custom|habit/tradition|It's customary to eat turkey at Christmas.
w1652|habit||Biting your nails is a bad habit.
w1653|tradition||It's a tradition in my family.
w1654|culture||I'm interested in Mexican culture.
w1655|religion||I respect all religions.
w1656|faith|belief|She has a lot of faith.
w1657|god||My grandmother believes in God.
w1658|soul||I love you with all my soul.
w1659|spirit||He has a young spirit.
w1660|mind||My mind has gone blank.
w1661|memory||I have a very bad memory.
w1662|memory|souvenir/recollection|I have good memories of that beach.
w1663|thought|thinking|Write your thoughts in a diary.
w1664|opinion|view|What's your opinion?
w1665|point of view|viewpoint/perspective|From my point of view, it's a mistake.
w1666|belief||It's a very old belief.
w1667|advice|tip|Let me give you some advice.
w1668|suggestion||Do you have any suggestions?
w1669|proposal|offer|They accepted our proposal.
w1670|decision||It was a difficult decision.
w1671|choice|election|The elections are tomorrow.
w1672|option|choice|We have no other choice.
w1673|opportunity|chance|It's a great opportunity.
w1674|possibility|chance|There's a chance of rain.
w1675|need|necessity|There's no need to shout.
w1676|condition||I'll help you on one condition.
w1677|situation||The situation is complicated.
w1678|circumstance||It depends on the circumstances.
w1679|case||In that case, I'll call you tomorrow.
w1680|fact||The fact is that I don't have any money.
w1681|event|incident/happening|The incident was on the news.
w1682|event||The event starts at eight.
w1683|event|occurrence/happening|The wedding was a big event.
w1684|matter|affair/business|I want to talk about an important matter.
w1685|topic|subject/theme|Let's change the subject.
w1686|question|issue/matter|It's a matter of time.
w1687|detail||Explain the details to me.
w1688|data|piece of information/fact|I need your personal details.
w1689|information|info|I'm looking for information about the museum.
w1690|education||Education is very important.
w1691|teaching|education|She works in teaching.
w1692|learning||Learning languages takes time.
w1693|study|studying|I spend two hours studying.
w1694|research|investigation|She is doing research on the climate.
w1695|course|class|I'm taking a cooking class.
w1696|title|degree|What is the title of the book?
w1697|diploma|certificate|I received my diploma yesterday.
w1698|scholarship|grant|She won a scholarship to study in Spain.
w1699|faculty|school/department|I study at the Faculty of Law.
w1700|high school|secondary school/institute|My daughter goes to high school.
w1701|academy|cram school/school|I go to an English academy.
w1702|subject|course|My favorite subject is history.
w1703|geography||We have a geography exam tomorrow.
w1704|physics||Physics is difficult for me.
w1705|chemistry||In chemistry class we do experiments.
w1706|biology||I like studying biology.
w1707|literature||We read Spanish literature in class.
w1708|philosophy||My brother studies philosophy.
w1709|computer science|IT/computing|She works in IT.
w1710|physical education|PE/gym|Today we have PE.
w1711|drawing|picture/art|My son made a nice drawing.
w1712|exercise||I exercise every morning.
w1713|test|quiz/exam|Tomorrow there's a math test.
w1714|summary||Write a summary of the book.
w1715|composition|essay/writing|The composition is due on Monday.
w1716|essay||I have to write an essay.
w1717|report||I finished the report this afternoon.
w1718|note|notes|Can you lend me your notes?
w1719|dictionary||Look up the word in the dictionary.
w1720|encyclopedia||There is an encyclopedia in the library.
w1721|magazine||I bought a cooking magazine.
w1722|newspaper|paper|My grandfather reads the newspaper every day.
w1723|diary|journal|I write in my diary at night.
w1724|article||I read an interesting article.
w1725|advertisement|ad/commercial/announcement|I saw the ad on TV.
w1726|advertising|publicity/ads|There is a lot of advertising on the internet.
w1727|program|show|This show is very fun.
w1728|channel||Change the channel, please.
w1729|series|TV series/show|I'm watching a new series.
w1730|episode||The last episode was amazing.
w1731|cartoons|animation/anime|Children like cartoons.
w1732|documentary||We watched a documentary about animals.
w1733|concert||We're going to a concert on Saturday.
w1734|song||This song is very beautiful.
w1735|band||My brother plays in a band.
w1736|group||We work in groups in class.
w1737|orchestra||The orchestra plays classical music.
w1738|instrument|musical instrument|Do you play any instrument?
w1739|guitar||My dad plays the guitar.
w1740|piano||My daughter is learning piano.
w1741|violin||She plays the violin very well.
w1742|drum||The boy plays the drum.
w1743|flute|recorder|At school we play the recorder.
w1744|trumpet||He plays the trumpet in the band.
w1745|rhythm|beat|This music has a good rhythm.
w1746|melody|tune|I like the melody of that song.
w1747|voice||You have a very beautiful voice.
w1748|noise||There's a lot of noise in the street.
w1749|sound||I don't like that sound.
w1750|silence|quiet|Quiet in the library, please.
w1751|dance|dancing/ball|The dance starts at eight.
w1752|dance|dancing|She studies classical dance.
w1753|work|play/piece|We saw a play.
w1754|exhibition|exhibit/show|We went to an art exhibition.
w1755|painting|picture|There is a painting on the wall.
w1756|sculpture|statue|This sculpture is very old.
w1757|novel||I'm reading a long novel.
w1758|story|tale|My mom reads me a story.
w1759|poem||I wrote a poem for my mother.
w1760|poetry||I like reading poetry.
w1761|author|writer|Who is the author of this book?
w1762|character||My favorite character is the dog.
w1763|main character|protagonist/hero|The main character is a brave boy.
w1764|chapter||I read the first chapter last night.
w1765|scene||That scene made me cry.
w1766|show|performance/spectacle|The show was wonderful.
w1767|hobby|pastime|Reading is my favorite hobby.
w1768|hobby|interest/fondness|He is fond of music.
w1769|collection||I have a stamp collection.
w1770|toy||The boy is playing with his toy.
w1771|doll||My daughter has a new doll.
w1772|ball||The children are playing with the ball.
w1773|ball|football|Pass me the ball.
w1774|balloon|globe|The boy has a red balloon.
w1775|kite||We flew a kite at the beach.
w1776|puzzle|jigsaw puzzle|We did a thousand-piece puzzle.
w1777|chess||My grandfather plays chess.
w1778|letter|card|I wrote you a letter.
w1779|die|dice|Roll the die, please.
w1780|video game|game|My son plays video games on Sundays.
w1781|swimming||I go swimming twice a week.
w1782|tennis||Do you play tennis?
w1783|baseball||Baseball is popular in Mexico.
w1784|basketball||He plays basketball at school.
w1785|volleyball||We play volleyball at the beach.
w1786|track and field|athletics|She does track and field.
w1787|cycling||Cycling is good for your health.
w1788|goal||What a beautiful goal!
w1789|point|dot|We won by one point.
w1790|competition|contest|There's a swimming competition today.
w1791|tournament||Our team won the tournament.
w1792|championship||The championship starts in June.
w1793|medal||She won a gold medal.
w1794|prize|award|She received an award.
w1795|trophy|cup|The trophy is on the table.
w1796|training|practice|Practice is at five.
w1797|excursion|field trip/outing/trip|Tomorrow we're going on a field trip.
w1798|walk|stroll|We take a walk in the park.
w1799|camping||This summer we're going camping.
w1800|adventure||The trip was a great adventure.
w1801|route|tour/journey|The tour lasts two hours.
w1802|destination||What is your final destination?
w1803|reservation|booking|I have a reservation for two.
w1804|accommodation|lodging|We're looking for accommodation near the beach.
w1805|reception|front desk|Ask at the hotel reception.
w1806|arrival||The train arrives at six.
w1807|departure||The plane's departure was delayed.
w1808|delay||The flight is an hour late.
w1809|own||I want to have my own house.
w1810|true|certain/sure|What you say is true.
w1811|general||In general, I like spicy food.
w1812|common|shared|We have a friend in common.
w1813|public||This is a public park.
w1814|private||It's a private school.
w1815|personal||It's a personal question.
w1816|social||Social media is very popular.
w1817|national||Today is a national holiday.
w1818|international||We arrived at the international airport.
w1819|local||We shop at the local market.
w1820|global|worldwide/world|It's a global problem.
w1821|natural||I like fresh juice.
w1822|artificial|fake|This flower is artificial.
w1823|human||The human body is amazing.
w1824|real|true|It's a true story.
w1825|current|present|The current situation is difficult.
w1826|recent||It's a recent photo.
w1827|next|coming|See you next week.
w1828|previous|before/prior|It rained a lot the day before.
w1829|following|next|The next day we went to the beach.
w1830|final|last|This is the final part.
w1831|initial|first|The initial idea was different.
w1832|total|whole|The total price is one hundred pesos.
w1833|complete|full|The hotel is full.
w1834|whole|entire|He ate the whole pizza.
w1835|only|unique/sole|He's my only son.
w1836|simple|easy|The answer is very simple.
w1837|basic||I speak basic Spanish.
w1838|fundamental|basic/essential|Water is essential for life.
w1839|essential|vital|Sleeping well is essential.
w1840|useful|helpful|This book is very useful.
w1841|useless|pointless|It's pointless to cry now.
w1842|practical|handy|This bag is very practical.
w1843|effective|efficient|This remedy is very effective.
w1844|serious|grave|It's nothing serious.
w1845|urgent||It's an urgent message.
w1846|evident|obvious/clear|It's obvious that he's tired.
w1847|obvious|evident/clear|The answer is obvious.
w1848|exact|precise|What is the exact time?
w1849|precise|accurate/exact|I need accurate data.
w1850|direct|nonstop|It's a direct flight to Lima.
w1851|diverse|various/different|There are different opinions.
w1852|varied|various|The menu is very varied.
w1853|enormous|huge|They have a huge house.
w1854|immense|vast/huge|The ocean is immense.
w1855|giant|gigantic/huge|We bought a giant pizza.
w1856|minimum|minimal|The minimum temperature is five degrees.
w1857|maximum|top|The speed limit is one hundred.
w1858|older|bigger/greater/elder|My older brother lives in Lima.
w1859|younger|smaller/lesser|My younger sister is ten years old.
w1860|upper|top/higher/superior|He lives on the top floor.
w1861|lower|bottom/inferior|The kitchen is on the lower floor.
w1862|deep||The lake is very deep.
w1863|thick||This book is very thick.
w1864|thin|fine|Cut the bread into thin slices.
w1865|sharp|acute|The knife has a sharp point.
w1866|flat|level|The land is flat.
w1867|straight||Keep going straight ahead.
w1868|crooked|twisted/bent|The picture is crooked.
w1869|enough|sufficient|I don't have enough money.
w1870|scarce|scant/limited|Water is scarce here.
w1871|abundant|plentiful|The food was plentiful.
w1872|poor||Poor dog! It's cold.
w1873|free|free of charge|Admission is free.
w1874|cheap|economical/inexpensive|This hotel is very cheap.
w1875|luxurious|fancy/luxury|They stayed at a luxurious hotel.
w1876|elegant|classy/stylish|Your dress is very elegant.
w1877|uncomfortable||This chair is uncomfortable.
w1878|pleasant|nice/agreeable|The weather is pleasant.
w1879|unpleasant|disagreeable/nasty|It has an unpleasant smell.
w1880|wonderful|marvelous|It was a wonderful day.
w1881|incredible|unbelievable/amazing|It's incredible!
w1882|fantastic|great|The party was fantastic.
w1883|excellent|great|It's an excellent idea.
w1884|great|wonderful/terrific|Great! See you tomorrow.
w1885|horrible|awful|The weather is horrible today.
w1886|terrible|awful|I had a terrible dream.
w1887|awful|terrible|I feel awful today.
w1888|active|lively|My grandmother is very active.
w1889|passive||Don't be so passive.
w1890|affectionate|loving/cuddly|My cat is very affectionate.
w1891|friendly||The neighbors are very friendly.
w1892|faithful|loyal|The dog is a faithful animal.
w1893|loyal|faithful|He is a very loyal friend.
w1894|sincere|honest/frank|I want your honest opinion.
w1895|fair|just/right|It's not fair.
w1896|unfair|unjust|It's an unfair decision.
w1897|cruel||Don't be cruel to animals.
w1898|evil|wicked/bad|The villain is very evil.
w1899|kind|good-hearted/kindhearted|My grandfather is a kind man.
w1900|impatient||The children are impatient.
w1901|responsible||My daughter is very responsible.
w1902|punctual|on time|I'm always punctual.
w1903|tidy|neat/organized|His room is very tidy.
w1904|messy|untidy/disorganized|My desk is messy.
w1905|careful||He is very careful with his things.
w1906|careless|sloppy|Don't be careless with your homework.
w1907|capable|able|You are capable of doing it.
w1908|skillful|skilled/handy/clever|He is very skillful with his hands.
w1909|clumsy|awkward|I'm a bit clumsy in the kitchen.
w1910|wise||My grandmother is a wise woman.
w1911|ignorant||Nobody wants to be ignorant.
w1912|crazy|mad|Are you crazy? It's really cold.
w1913|curious|strange|Children are very curious.
w1914|creative||My son is very creative.
w1915|ambitious||It's a very ambitious project.
w1916|optimistic||I'm always optimistic.
w1917|pessimistic||Don't be so pessimistic.
w1918|independent||My daughter is already independent.
w1919|well-known|known/famous|He is a very well-known actor.
w1920|unknown|stranger|Don't talk to strangers.
w1921|healthy||We eat healthy food.
w1922|injured|hurt/wounded|The dog is injured.
w1923|pregnant||My sister is pregnant.
w1924|blind||The dog helps a blind man.
w1925|deaf||My grandfather is a little deaf.
w1926|mute|speechless/dumb|He was speechless with surprise.
w1927|naked|nude|The baby is naked in the bathtub.
w1928|willing|ready|I'm willing to help you.
w1929|compulsory|mandatory/required|The uniform is compulsory.
w1930|optional||The excursion is optional.
w1931|prohibited|forbidden/banned|No smoking here.
w1932|allowed|permitted|Is taking photos allowed?
w1933|available|free|Are there any rooms available?
w1934|used to|accustomed|I'm used to the cold.
w1935|interested||I'm interested in the course.
w1936|satisfied|content/pleased|I'm very satisfied with the result.
w1937|disappointed||I'm disappointed with the movie.
w1938|confused||I'm confused about the homework.
w1939|ashamed|embarrassed|I feel ashamed of my mistake.
w1940|fed up|sick of/tired of|I'm fed up with waiting.
w1941|exhausted|worn out/tired out|After the trip I'm exhausted.
w1942|depressed|down|He's depressed about the exam.
w1943|lonely|solitary|It's a very lonely place.
w1944|attentive|thoughtful/considerate|The waiter was very attentive.
w1945|absent-minded|distracted|I'm very absent-minded today.
w1946|still|yet|He hasn't arrived yet.
w1947|immediately|at once/right away|Come here immediately.
w1948|quickly|fast/rapidly|Time passes quickly.
w1949|slowly||Speak slowly, please.
w1950|finally|at last/lastly|We finally got home.
w1951|currently|now/at present|I currently live in Lima.
w1952|lately|recently|Lately I haven't been sleeping much.
w1953|recently|lately|I recently bought a car.
w1954|in the past|formerly/long ago|In the past there was no internet.
w1955|generally|usually/in general|I generally have breakfast at seven.
w1956|normally|usually|I normally walk to work.
w1957|frequently|often|I visit my grandparents frequently.
w1958|often|frequently|We often go to the movies.
w1959|rarely|seldom|I rarely eat meat.
w1960|suddenly|all of a sudden|Suddenly it started to rain.
w1961|suddenly|all of a sudden|Suddenly the lights went out.
w1962|little by little|gradually/bit by bit|Little by little I'm learning Spanish.
w1963|in the end|at the end/finally|In the end everything turned out fine.
w1964|finally|at last|It's Friday at last!
w1965|that's why|so/therefore|I was tired, so I fell asleep.
w1966|therefore|so/thus|It's raining, so we're not going out.
w1967|for example|for instance|I like fruit, for example, apples.
w1968|on the other hand|instead/whereas|I'm tall; on the other hand, my brother is short.
w1969|in other words|I mean/that is|In other words, you're not coming tomorrow.
w1970|that is|in other words/I mean|I arrive on Monday, that is, tomorrow.
w1971|above all|especially|I like fruit, especially mango.
w1972|anyway|in any case/anyhow|Anyway, thanks for coming.
w1973|possibly|maybe/perhaps|It may rain tomorrow.
w1974|fortunately|luckily|Fortunately, nobody got hurt.
w1975|unfortunately||Unfortunately, we lost the game.
w1976|unfortunately|sadly/regrettably|Unfortunately, I can't go.
w1977|totally|completely/fully|I totally agree.
w1978|completely|totally|I completely forgot.
w1979|absolutely|at all|I know absolutely nothing.
w1980|perfectly||I understand you perfectly.
w1981|so|such|You're so kind!
w1982|as much as|all that|Eat as much as you want.
w1983|whose||He's the boy whose father is a doctor.
w1984|anyone|anybody/whoever|Anyone can do it.
w1985|nature||I love nature.
w1986|environment||We must take care of the environment.
w1987|planet||The Earth is our planet.
w1988|universe|cosmos|The universe is enormous.
w1989|space|room|There's no room in the car.
w1990|atmosphere||The atmosphere protects the Earth.
w1991|air||Open the window to let some air in.
w1992|fire||Don't play with fire.
w1993|smoke||There's smoke coming from the kitchen.
w1994|energy||I have a lot of energy today.
w1995|electricity|power|The power went out last night.
w1996|gas||Turn off the gas, please.
w1997|oil|petroleum/crude oil|Oil is very expensive.
w1998|coal|charcoal|We cook the meat over charcoal.
w1999|resource||Water is an important resource.
w2000|pollution|contamination|Air pollution is serious.
w2001|recycling||Recycling is important.
w2002|waste|residue/garbage|We separate the waste at home.
w2003|drought||The drought affects the farmers.
w2004|flood|flooding|There was a flood in the town.
w2005|earthquake|quake|The earthquake was very strong.
w2006|hurricane||A hurricane is coming this weekend.
w2007|fire|blaze|There was a fire in the building.
w2008|disaster|catastrophe|It was a terrible natural disaster.
w2009|plant||I water the plants every morning.
w2010|seed||We planted tomato seeds.
w2011|root||The tree's roots are long.
w2012|branch||A bird is on the branch.
w2013|trunk||The trunk of this tree is thick.
w2014|grass|herb|The dog eats grass.
w2015|grass (lawn)|lawn/pasture|The children play on the grass.
w2016|lawn|grass|Don't step on the lawn.
w2017|sunflower||The sunflower follows the sun.
w2018|cactus||I have a cactus in the window.
w2019|pine|pine tree|There are many pines in the forest.
w2020|palm tree|palm|There are palm trees on the beach.
w2021|fruit||This tree gives a lot of fruit.
w2022|harvest|crop|This year's harvest was good.
w2023|dust|powder|There is a lot of dust on the books.
w2024|mud||Your shoes have mud on them.
w2025|rock|boulder|We sat on a rock.
w2026|cave||We explored a dark cave.
w2027|shore|bank/edge|We walked along the bank of the river.
w2028|tide||The tide is high today.
w2029|port|harbor|The ship arrives at the port.
w2030|bay||The bay is very beautiful.
w2031|waterfall||We visited a huge waterfall.
w2032|fountain||There is a fountain in the square.
w2033|well||We draw water from the well.
w2034|puddle||The child jumps in the puddles.
w2035|bird||This bird flies very high.
w2036|eagle||The eagle flies over the mountains.
w2037|pigeon|dove|There are many pigeons in the park.
w2038|parrot||My parrot can say hello.
w2039|rooster||The rooster crows in the morning.
w2040|chick|baby chicken|The chick follows its mother.
w2041|swan||There are two swans on the lake.
w2042|owl||The owl comes out at night.
w2043|crow||A crow is on the roof.
w2044|camel||The camel lives in the desert.
w2045|deer||We saw a deer in the forest.
w2046|squirrel||The squirrel eats nuts.
w2047|kangaroo||The kangaroo jumps very high.
w2048|penguin||Penguins live in cold places.
w2049|crocodile|alligator|The crocodile is in the river.
w2050|worm|earthworm|There is a worm in the apple.
w2051|snail||The snail is very slow.
w2052|crab||We found a crab on the beach.
w2053|octopus||The octopus has eight arms.
w2054|jellyfish||Watch out for jellyfish in the sea.
w2055|puppy||We have a new puppy.
w2056|kitten||The kitten is sleeping on the bed.
w2057|nest||There is a nest in the tree.
w2058|wing||The bird has a broken wing.
w2059|feather||I found a white feather.
w2060|tail||The dog wags its tail.
w2061|paw|leg|The cat has an injured paw.
w2062|horn||The bull has big horns.
w2063|technology||Technology changes very fast.
w2064|internet|the net|I look for the recipe on the internet.
w2065|net|network|The fisherman pulls the net out of the water.
w2066|web page|website|Visit our website.
w2067|place|site/spot|This place is very quiet.
w2068|email|e-mail|I'll send you an email.
w2069|user||Write your username.
w2070|app|application|I downloaded a new app.
w2071|file||Save the file before leaving.
w2072|folder||The document is in this folder.
w2073|device||Turn off all the devices.
w2074|appliance|device/gadget|This appliance doesn't work.
w2075|machine||The coffee machine is broken.
w2076|engine|motor|The car's engine makes noise.
w2077|battery||My cell phone has no battery.
w2078|battery (dry cell)|battery|The remote control needs new batteries.
w2079|cable|cord|Where is the charger cable?
w2080|outlet|socket/plug|The outlet is behind the sofa.
w2081|charger||I forgot my charger at home.
w2082|earphones|headphones/earbuds|I use earphones on the train.
w2083|speaker|loudspeaker|Put the music on the speaker.
w2084|microphone|mic|Speak close to the microphone.
w2085|printer||The printer has no paper.
w2086|tablet||My son reads on the tablet.
w2087|call|phone call|I have a missed call.
w2088|video||Watch this really funny video.
w2089|image|picture|The image doesn't look good.
w2090|signal|sign|There's no signal here.
w2091|tool||I need a tool for this.
w2092|hammer||Pass me the hammer, please.
w2093|nail||Put a nail in the wall.
w2094|screw||A screw is missing from the chair.
w2095|rope|string/cord|Tie the box with a rope.
w2096|thread||I need thread and a needle.
w2097|needle||Be careful with the needle.
w2098|cardboard||Put the books in a cardboard box.
w2099|stamp|postage stamp|I need a stamp for the letter.
w2100|stamp|postage stamp|I bought stamps at the post office.
w2101|ink||The printer has no ink.
w2102|glue||Use glue to stick the paper.
w2103|tape|ribbon|I need tape to close the box.
w2104|safe||They keep the money in a safe.
w2105|lock||The key doesn't fit in the lock.
w2106|doorbell|bell|Someone rang the doorbell.
w2107|mailbox|letterbox|There is a letter in the mailbox.
w2108|furniture|piece of furniture|We bought new furniture.
w2109|home|household|There's no place like home.
w2110|basement|cellar|We keep the boxes in the basement.
w2111|hallway|corridor/hall|The bathroom is at the end of the hallway.
w2112|fireplace|chimney|We sat near the fireplace.
w2113|faucet|tap|Turn off the faucet, please.
w2114|sink (bathroom)|washbasin/sink|I wash my hands in the sink.
w2115|sink (kitchen)|kitchen sink/sink|The dishes are in the sink.
w2116|shower||I take a shower in the morning.
w2117|bathtub|tub/bath|The baby plays in the bathtub.
w2118|toilet||Clean the toilet, please.
w2119|bucket|pail|Fill the bucket with water.
w2120|broom||Sweep the floor with the broom.
w2121|rag|cloth|Clean the table with a rag.
w2122|vacuum cleaner|vacuum|I vacuum on Saturdays.
w2123|detergent|soap|We ran out of detergent.
w2124|iron||The iron is very hot.
w2125|hanger|coat hanger|Hang the shirt on a hanger.
w2126|basket||Put the fruit in the basket.
w2127|vase|flower vase|Put the flowers in the vase.
w2128|candle||There are ten candles on the cake.
w2129|match||Do you have a match?
w2130|lighter||The lighter doesn't work.
w2131|disease|illness/sickness|It's a very rare disease.
w2132|symptom||What are your symptoms?
w2133|allergy||I'm allergic to pollen.
w2134|infection||He has an ear infection.
w2135|virus||This virus spreads easily.
w2136|cancer||My uncle beat cancer.
w2137|diabetes||My grandfather has diabetes.
w2138|pressure|blood pressure|The doctor took my blood pressure.
w2139|operation|surgery|The operation went well.
w2140|treatment||The treatment lasts a month.
w2141|vaccine|vaccination|The child got a vaccine.
w2142|injection|shot|I don't like injections.
w2143|analysis|test|I need a blood test.
w2144|X-ray||They took an X-ray of my arm.
w2145|consultation|appointment/checkup|I have an appointment with the doctor today.
w2146|appointment|date|I have an appointment with the dentist.
w2147|health insurance|medical insurance|Do you have health insurance?
w2148|syrup|cough syrup|Take the syrup for your cough.
w2149|bandage||The nurse put a bandage on me.
w2150|Band-Aid|adhesive bandage/plaster|Put a Band-Aid on your finger.
w2151|thermometer||Use the thermometer to check the fever.
w2152|diet||I'm on a diet.
w2153|vitamin||Fruits have lots of vitamins.
w2154|protein||Eggs have a lot of protein.
w2155|fat|grease|This meat has a lot of fat.
w2156|calorie||This dessert has a lot of calories.
w2157|ingredient||What ingredients do you need?
w2158|taste|flavor|This soup tastes good.
w2159|smell|odor/scent|What a delicious smell!
w2160|teaspoon||Add a teaspoon of sugar.
w2161|tablespoon|spoonful|Add two tablespoons of oil.
w2162|piece|slice/chunk|Do you want a piece of cake?
w2163|slice||Give me a slice of bread.
w2164|piece|bit/chunk|I ate a piece of chocolate.
w2165|peel|skin/shell|Throw away the banana peel.
w2166|tray||Take the tray to the table.
w2167|cutlery|silverware/utensils|Put the cutlery on the table.
w2168|chef|cook|The chef is making dinner.
w2169|barbecue|roast/grilled meat|On Sunday we have a barbecue.
w2170|grill|barbecue|Put the meat on the grill.
w2171|have a snack|snack|The children have a snack at five.
w2172|chew||Chew your food well.
w2173|swallow||I can't swallow the pill.
w2174|bite||The dog doesn't bite.
w2175|suck||The baby sucks his finger.
w2176|lick||The cat licks its milk.
w2177|blow||Blow out the candles on the cake.
w2178|spill||I spilled the coffee on the table.
w2179|beat|whisk/whip|Beat the eggs with sugar.
w2180|peel||Help me peel the potatoes.
w2181|chop|mince/dice|Chop the onion, please.
w2182|roast|grill|Let's roast some chicken.
w2183|bake||My mom bakes cookies.
w2184|boil|cook|Boil the pasta for ten minutes.
w2185|sale|selling|The house is for sale.
w2186|discount||There is a twenty percent discount.
w2187|reduction|sale/markdown|I bought this shirt on sale.
w2188|clearance sale|sale/clearance|There's a clearance sale at that store.
w2189|size (clothing)|size|What size do you wear?
w2190|fitting room|changing room|The fitting room is at the back.
w2191|shop window|display window/showcase|I like the dress in the shop window.
w2192|counter||Pay at the counter, please.
w2193|cart|shopping cart/trolley|Put the things in the cart.
w2194|cashier||The cashier gave me the change.
w2195|ATM|cash machine|Is there an ATM nearby?
w2196|credit card||Can I pay by credit card?
w2197|brand|make|What brand are your shoes?
w2198|model|type|This model is cheaper.
w2199|container|packaging|Recycle plastic containers.
w2200|label|tag|Look at the price on the label.
w2201|warranty|guarantee|The TV has a two-year warranty.
w2202|return|refund|I want to return this shirt.
w2203|complaint||The customer made a complaint at the store.
w2204|order||My order arrived yesterday afternoon.
w2205|shipping|delivery/shipment|Shipping is free on large purchases.
w2206|delivery||The delivery will be on Monday morning.
w2207|postal code|zip code/postcode|Write your zip code on the envelope.
w2208|post office||The post office closes at five.
w2209|parcel|package|My grandmother sent me a parcel.
w2210|transportation|transport/transit|I use public transportation every day.
w2211|passenger||The passengers wait for the train on the platform.
w2212|traveler||The traveler was carrying a huge backpack.
w2213|route|way|This route is shorter to get there.
w2214|traffic|transit|There's a lot of traffic downtown today.
w2215|pedestrian||The pedestrian crossed the street carefully.
w2216|intersection|crossing/crossroads|Turn right at the next intersection.
w2217|tunnel||The train goes through a long tunnel.
w2218|highway|freeway/motorway|We took the highway to go to the beach.
w2219|toll||You have to pay a toll on this road.
w2220|parking lot|parking/car park|There's no space in the parking lot.
w2221|gasoline|gas/petrol|We need to put gas in the car.
w2222|wheel||The bicycle has a flat wheel.
w2223|tire|tyre|We need to change the car's tire.
w2224|steering wheel|wheel|My dad holds the steering wheel with both hands.
w2225|brake||The brakes on my bike don't work well.
w2226|seat belt|seatbelt/safety belt|Put on your seat belt, please.
w2227|helmet||I always wear a helmet when I ride my bike.
w2228|terminal|station|The bus leaves the terminal at eight.
w2229|customs||We went through customs without any problems.
w2230|carry-on luggage|hand luggage/carry-on|I'm only taking carry-on luggage on this trip.
w2231|boarding pass||Please show your boarding pass.
w2232|take off||The plane takes off at ten o'clock sharp.
w2233|land||We are going to land in twenty minutes.
w2234|board|embark|The passengers can board now.
w2235|board|get on|We boarded the plane at gate five.
w2236|get lost|be lost|I got lost in the city center.
w2237|find one's way|orient oneself|It's hard to find your way in this city.
w2238|go around|tour/travel through|We went around the whole museum in one afternoon.
w2239|explore||The children explore the forest with their dad.
w2240|discover|find|We discovered a very nice café yesterday.
w2241|photograph|take pictures|I like to photograph flowers and birds.
w2242|camp|go camping|We are going to camp near the lake.
w2243|get a tan|tan/sunbathe|My sister wants to get a tan at the beach.
w2244|enjoy||My grandfather enjoys good health.
w2245|stand|bear/endure/tolerate|I can't stand the summer heat.
w2246|put up with|bear/endure/stand|I can't take it anymore, I'm very hungry.
w2247|survive||These plants survive without much water.
w2248|grow old|age|We all grow old with time.
w2249|ripen|mature|Bananas ripen fast in summer.
w2250|lose weight|slim down|My uncle wants to lose five kilos.
w2251|gain weight|get fat/put on weight|I ate a lot and gained a little weight.
w2252|by means of|through/by|We learned through games and songs.
w2253|except|apart from/save|Everyone came except my cousin.
w2254|about|concerning|We talked about our vacation.
w2255|acquire|gain/obtain|I want to gain more experience at work.
w2256|apply||Apply the cream twice a day.
w2257|assume|take on|She took on responsibility for the project.
w2258|attend to|see/serve|The doctor sees patients early.
w2259|attract||Flowers attract bees.
w2260|advance|move forward/progress|We moved forward little by little along the path.
w2261|characterize||Kindness characterizes this family.
w2262|collaborate|cooperate/help|Everyone helps with cleaning the house.
w2263|compensate|make up for|This trip makes up for all the effort.
w2264|compose|make up|My brother composes songs on his guitar.
w2265|concentrate|focus|I can't concentrate with so much noise.
w2266|grant|give|The teacher gave us more time.
w2267|conclude||We concluded that the plan was good.
w2268|preserve|keep/conserve|Keep the milk in the refrigerator.
w2269|consist (of)|consist|The game consists of guessing words.
w2270|constitute|make up/form|Twelve players make up the team.
w2271|consult|look up|Look it up in the dictionary if you don't understand.
w2272|consume|use|This car uses little gas.
w2273|contain|hold|This box contains old books.
w2274|contribute||We all help take care of the park.
w2275|control|manage|My mom manages the household expenses.
w2276|correspond|belong to/be due|This money belongs to you.
w2277|cover||Snow covers the mountains.
w2278|dedicate|devote/spend|I spend one hour a day reading.
w2279|work as|devote oneself to/do for a living|My aunt works in teaching.
w2280|demand|sue|The neighbors demand more security.
w2281|designate|appoint/name|They appointed Ana captain of the team.
w2282|detect||The alarm detects smoke right away.
w2283|determine||The doctor determined the cause of the pain.
w2284|stop|detain/arrest|The police arrested the thief.
w2285|distinguish|tell apart|I can't distinguish colors well from far away.
w2286|distribute|hand out|The teacher hands out the books to the students.
w2287|dominate|master|My cousin has mastered three languages.
w2288|elaborate|develop/prepare/draw up|We drew up a plan for the trip.
w2289|eliminate|remove/delete|Delete the photos you don't like.
w2290|employ|use/hire|The factory employs a hundred people.
w2291|face|confront|We have to face the problem together.
w2292|focus||Focus the camera before taking the photo.
w2293|balance||You have to balance studying and playing.
w2294|estimate||We estimate the trip takes three hours.
w2295|evaluate|assess/grade|The teacher grades our work every week.
w2296|evolve|develop|Technology evolves very fast.
w2297|exaggerate||Don't exaggerate, it wasn't that bad.
w2298|experience|experiment|We experimented with water and salt in class.
w2299|exhibit|display/show/expose|The museum exhibits paintings by young artists.
w2300|extend|spread out/stretch|Spread the map out on the table.
w2301|facilitate|make easier|This program makes working from home easier.
w2302|encourage|promote/foster|The school encourages reading among children.
w2303|strengthen||Exercise strengthens the muscles.
w2304|generate|produce|Solar panels generate electricity.
w2305|manage|handle|My dad handles the paperwork for the trip.
w2306|identify||Can you identify this bird?
w2307|ignore||Don't ignore your grandmother's advice.
w2308|impose||The government imposed a new rule.
w2309|imply|involve/mean|Being a parent involves a lot of responsibility.
w2310|influence|affect|The weather affects our mood.
w2311|start|begin/initiate|The game starts at three.
w2312|exchange|swap/trade|The children trade cards at recess.
w2313|interpret||Each person interprets the story in their own way.
w2314|intervene|step in|The teacher stepped in to stop the fight.
w2315|introduce|insert/put in|Insert the card into the machine.
w2316|limit|restrict|My parents limit video game time.
w2317|express|state/show|The students calmly expressed their opinion.
w2318|modify|change/alter|We had to change our weekend plans.
w2319|motivate||The coach motivates the players a lot.
w2320|negotiate||My mom negotiated a good price at the market.
w2321|occupy|take up|This sofa takes up a lot of space.
w2322|hide|conceal|The dog hid the bone in the garden.
w2323|omit|skip/leave out|You can skip this part of the exercise.
w2324|guide|orient/direct|The teacher guides us on the project.
w2325|suffer (from)|suffer|My grandmother suffers from back pain.
w2326|raise|pose/bring up|The student raised an interesting question.
w2327|own|possess/have|My uncle owns a small farm.
w2328|predict|foretell|No one can predict the future.
w2329|prevent||Washing your hands prevents many diseases.
w2330|preserve|protect|We must preserve the country's forests.
w2331|try|make sure/endeavor|Try to arrive early tomorrow.
w2332|promote|encourage|The city promotes the use of bicycles.
w2333|provide|supply|The hotel provides towels to guests.
w2334|cause|provoke|The rain caused a big traffic jam.
w2335|publish||My aunt published a cookbook.
w2336|recover|get back/regain|I already got my lost bicycle back.
w2337|reflect||The lake reflects the mountains.
w2338|reflect (think)|think over/ponder|Think it over before making a decision.
w2339|reinforce|strengthen|We're going to reinforce the garage door.
w2340|regulate|control/adjust|This button controls the temperature.
w2341|relate|connect/match|Match each word with its picture.
w2342|replace||We need to replace the kitchen light bulb.
w2343|substitute|replace|You can replace the sugar with honey.
w2344|resign|quit/give up|My neighbor quit his job.
w2345|represent|show/depict|This drawing represents my family.
w2346|require|need|This job requires a lot of patience.
w2347|respect||We must respect other people's opinions.
w2348|restrict|limit|They restricted access to the park because of the rain.
w2349|withdraw|take out/remove|I'm going to withdraw money from the ATM.
w2350|reveal|disclose|My brother revealed the secret at dinner.
w2351|satisfy|please|The food satisfied all the guests.
w2352|simplify||Let's simplify the problem.
w2353|locate|place/situate|The house is located near the river.
w2354|subject|submit/subdue|They put the plan to a vote.
w2355|overcome|get over/surpass|She overcame her fear of water.
w2356|arise|come up/emerge|A problem came up with the car.
w2357|transform|turn into/change|We turned the box into a little house.
w2358|transmit|broadcast/convey|The game is broadcast live on TV.
w2359|value|appreciate/assess|I really value your help.
w2360|vary|change|The price varies depending on the season.
w2361|link|connect|This project links the school and the families.
w2362|abandon|leave/give up|Never abandon your pet.
w2363|abuse|overuse|Don't overdo the sugar.
w2364|accuse||They accused me of breaking the window.
w2365|adapt|adjust|We adapted the recipe for the children.
w2366|manage|run/administer|My grandfather runs a small store.
w2367|warn|notice|I'm warning you that the floor is wet.
w2368|affect||The rain affected the harvest.
w2369|use up|exhaust/run out of|We used up all the batteries playing.
w2370|adjust||Adjust the seat before driving.
w2371|alter|change/disturb|Noise disturbs the baby's sleep.
w2372|threaten||The clouds threaten rain.
w2373|expand|enlarge/extend|We're going to expand the kitchen this year.
w2374|appreciate|value|I really appreciate your patience.
w2375|pass (exam)|pass/approve|My sister passed the English exam.
w2376|suspend|cancel/call off|They called off the game because of the rain.
w2377|risk||Don't risk your health for work.
w2378|associate||I associate summer with the beach.
w2379|attribute|credit|They attribute the success to teamwork.
w2380|authorize|allow/permit|My parents allowed me to go on the field trip.
w2381|grade|rate/assess|The teacher graded the exams yesterday.
w2382|punish||My parents never punish me without a reason.
w2383|commit|make|We all make mistakes sometimes.
w2384|commit oneself|promise|I promise to study more.
w2385|conceive|imagine|I can't imagine a life without music.
w2386|sentence|condemn|The judge sentenced the thief to two years.
w2387|confess|admit|I confess that I'm scared.
w2388|confuse|mix up|I always mix up the twins.
w2389|hire|employ|The company hired ten new people.
w2390|live together|coexist|I live with my grandparents and my parents.
w2391|cooperate|collaborate|Everyone cooperated to clean the beach.
w2392|raise|bring up/rear|My grandparents raised six children.
w2393|grow|cultivate|My grandfather grows tomatoes in the garden.
w2394|debate|discuss|In class we debate the environment.
w2395|disappoint|let down|The movie disappointed me a little.
w2396|report|denounce|We reported the robbery to the police.
w2397|deposit||I deposited the money in the bank.
w2398|challenge|defy/dare|My brother challenged me to a race.
w2399|descend|go down/drop|The temperature drops at night.
w2400|distrust|mistrust/doubt|I don't trust messages from strangers.
w2401|neglect||Don't neglect your studies.
w2402|dismiss|fire/see off|We went to the airport to see my aunt off.
w2403|stand out|excel|She stands out in math.
w2404|spread|broadcast|Social media spreads news very fast.
w2405|dress up|disguise oneself|The children dressed up as pirates.
w2406|arrange|have/dispose|We have little time today.
w2407|emigrate||My great-grandparents emigrated to Brazil.
w2408|move|excite/touch|It really moves me to see my family.
w2409|order|commission/entrust|We ordered a pizza for dinner.
w2410|enrich||Reading enriches our vocabulary.
w2411|make dirty|dirty/soil|Don't get the floor dirty with your shoes.
w2412|entertain|amuse|The clown entertains the children.
w2413|excite|thrill|The idea of the trip excites me.
w2414|be equivalent (to)|equal|One kilo equals a thousand grams.
w2415|make an effort|try hard/strive|My son tries very hard at school.
w2416|stimulate||Games stimulate children's minds.
w2417|exclude|leave out|We shouldn't leave anyone out of the game.
w2418|explode|burst/blow up|The balloon burst with a loud bang.
w2419|export||This country exports a lot of coffee.
w2420|expel|send off/kick out|The referee sent off a player.
w2421|manufacture|make/produce|This company makes wooden toys.
w2422|pretend|fake|My brother pretended to be asleep.
w2423|brake|stop|The driver braked suddenly.
w2424|found|establish|My great-grandfather founded this bakery.
w2425|inherit||I inherited my green eyes from my mother.
w2426|sink||The storm sank the ship.
w2427|imitate|copy/mimic|The parrot imitates my grandmother's voice.
w2428|impress||The size of the museum impressed me.
w2429|inaugurate|open|They opened a new park in the neighborhood.
w2430|invent||Who invented the telephone?
w2431|inspire||The sea inspires many painters.
w2432|install||We installed a new lamp in the living room.
w2433|integrate|be part of/join|Ana is part of the soccer team.
w2434|interrupt||Don't interrupt when someone is talking.
w2435|retire||My grandfather retired at sixty.
w2436|judge||Don't judge people by their clothes.
w2437|regret|be sorry/lament|I'm very sorry for being late.
w2438|free|release/liberate|We set the bird free in the forest.
w2439|appoint|name|They appointed my aunt principal of the school.
w2440|cause|bring about|The snow caused flight delays.
w2441|oppose|object|My dad is against buying another dog.
w2442|award|grant/give|They gave my teacher an award.
w2443|look like|resemble|You look a lot like your dad.
w2444|harm|damage/hurt|Smoking harms your health.
w2445|plant||We planted a tree in the garden.
w2446|populate|inhabit/live in|Many birds live on this island.
w2447|postpone|put off/delay|We postponed the party until Saturday.
w2448|need|require|We need help to move the sofa.
w2449|pressure|press/push|Don't pressure me, I'm coming.
w2450|intend|try/aim|What do you intend to do with those boxes?
w2451|deprive|take away/rob|The illness deprived him of sleep.
w2452|schedule|plan/program|We scheduled the trip for December.
w2453|protest|complain|The children complained about the homework.
w2454|turn to|resort to/rely on|I always turn to my grandmother for advice.
w2455|scold|tell off|My mom scolded me for being late.
w2456|perform|be productive/yield|I work better in the morning than at night.
w2457|replenish|restock/replace|We need to restock the toilet paper.
w2458|resist|withstand|This bridge withstands strong earthquakes.
w2459|back|support/back up|My parents support my decision.
w2460|delay|hold up/postpone|The rain delayed the game by an hour.
w2461|surround||Trees surround the house.
w2462|sacrifice||My parents sacrificed a lot for us.
w2463|select|choose|Select the photo you like best.
w2464|hold|support/hold up|Hold the ladder, please.
w2465|underline|emphasize/stress|Underline the new words in the text.
w2466|hold|fasten/secure|Hold the dog tightly on the street.
w2467|sigh||My sister sighed when she saw the homework.
w2468|take (time)|take long/be late|It takes me ten minutes to get to school.
w2469|transport|carry|The truck carries fruit to the market.
w2470|move|transfer|They transferred my dad to another city.
w2471|unite|join/bring together|Music brings people together.
w2472|defeat|beat/win|Our team beat the champion.
w2473|watch|keep an eye on/guard|Keep an eye on your little brother at the park.
w2474|vote||My parents voted early.
w2475|development||The country's development is very fast.
w2476|growth||Children's growth is incredible.
w2477|progress||Your progress in Spanish is very good.
w2478|advance|progress/preview|We saw the trailer for the new movie.
w2479|process||Learning a language is a long process.
w2480|system||The transportation system is very good here.
w2481|method|way|This study method works well.
w2482|technique|skill|The painter uses a special technique.
w2483|way|manner|This is the best way to learn.
w2484|mode|way/manner|Put your cell phone on silent mode.
w2485|measure|step/measurement|They took measures to save water.
w2486|function|purpose|What is this button for?
w2487|structure||The structure of the building is very strong.
w2488|organization||She works at an aid organization.
w2489|institution||The university is a public institution.
w2490|association|society|My mother belongs to a neighborhood association.
w2491|foundation||A foundation helps the children in the neighborhood.
w2492|labor union|union/trade union|The union talked with the company.
w2493|vote||Every vote is important.
w2494|campaign||The school ran a recycling campaign.
w2495|candidate||There are three candidates for president.
w2496|minister||The minister visited our school.
w2497|ministry|department|My uncle works at the Ministry of Health.
w2498|representative|deputy/congressman|The congressman spoke on television.
w2499|senator||The senator visited the new hospital.
w2500|congress|parliament|Congress passed a new law.
w2501|parliament||Parliament meets on Tuesdays.
w2502|constitution||The constitution protects our rights.
w2503|democracy||In a democracy everyone can vote.
w2504|dictatorship||My grandparents lived through a dictatorship.
w2505|authority|authorities|The authorities closed the road.
w2506|reform|renovation|We are renovating the kitchen.
w2507|crisis||The country went through an economic crisis.
w2508|conflict||Many conflicts are solved by talking.
w2509|protest||There was a protest in front of city hall.
w2510|demonstration|protest/rally|Thousands of people went to the demonstration.
w2511|strike||The teachers are on strike today.
w2512|agreement|deal|We reached an agreement after talking.
w2513|treaty||The two countries signed a peace treaty.
w2514|relationship|relation|I have a good relationship with my cousins.
w2515|bond|link/tie|There is a strong bond between the sisters.
w2516|contact|touch|We keep in touch by text messages.
w2517|influence||My grandmother has a lot of influence on me.
w2518|effect||The medicine took effect very quickly.
w2519|consequence|result|Every action has a consequence.
w2520|cause|reason|The cause of the accident was the rain.
w2521|reason|motive|What is the reason for your visit?
w2522|origin|source|What is the origin of this word?
w2523|base|basis/foundation|Respect is the basis of a friendship.
w2524|basis|foundation/grounds|Your idea has no basis.
w2525|value|worth/courage|This ring is worth a lot to me.
w2526|importance||Don't pay attention to that comment.
w2527|interest||My son is very interested in dinosaurs.
w2528|benefit|profit|Exercise has many benefits.
w2529|advantage||Living near the school is a big advantage.
w2530|disadvantage|drawback|The only drawback is the price.
w2531|inconvenience|problem/drawback|There's no problem with changing the date.
w2532|difficulty|trouble|We had trouble finding the house.
w2533|obstacle||There is an obstacle in the road.
w2534|challenge||Learning to swim was a big challenge for me.
w2535|challenge||This puzzle is a real challenge.
w2536|threat||Pollution is a threat to the planet.
w2537|damage|harm|The storm caused a lot of damage in the town.
w2538|harm|damage/loss|The delay caused us a lot of harm.
w2539|poverty||Many families live in poverty.
w2540|wealth|riches|This country's natural wealth is enormous.
w2541|inequality||Inequality is a serious problem.
w2542|equality||We believe in equality between men and women.
w2543|discrimination||Discrimination is not accepted at this school.
w2544|racism||We talked about racism in history class.
w2545|violence||We say no to violence.
w2546|well-being|welfare|Children's well-being is the most important thing.
w2547|level|standard|My English level is intermediate.
w2548|percentage||A high percentage of students passed.
w2549|average||My grade average is eight.
w2550|majority|most|Most of my friends play soccer.
w2551|minority||Only a minority voted against it.
w2552|figure|number/digit|Write the number in the box.
w2553|statistics|statistic|According to statistics, it rains more in June.
w2554|survey|questionnaire/poll|We answered a survey about the park.
w2555|theory||My brother has a theory about the cat.
w2556|practice||Practice makes perfect.
w2557|hypothesis||Let's test our hypothesis.
w2558|experiment||We did an experiment with a paper volcano.
w2559|discovery||The discovery was very important.
w2560|invention||The wheel is a very old invention.
w2561|invention||The invention of the printing press changed the world.
w2562|innovation||The company is betting on innovation.
w2563|robot||My son built a small robot.
w2564|artificial intelligence|AI|Artificial intelligence helps in many jobs.
w2565|satellite||The Moon is Earth's natural satellite.
w2566|rocket||The rocket took off into space.
w2567|astronaut||My son wants to be an astronaut.
w2568|orbit||The Earth orbits around the Sun.
w2569|galaxy||We live in a galaxy called the Milky Way.
w2570|gravity||Gravity makes apples fall.
w2571|atom||Everything is made of atoms.
w2572|molecule||A water molecule has three atoms.
w2573|cell||The body has millions of cells.
w2574|species|kind|This species of turtle lives in the sea.
w2575|evolution||We study the evolution of animals.
w2576|gene||Genes determine eye color.
w2577|oxygen||Plants produce oxygen.
w2578|carbon||Trees absorb carbon dioxide.
w2579|substance||This substance is dangerous for children.
w2580|liquid||Water is a colorless liquid.
w2581|solid||Ice is water in a solid state.
w2582|mixture|mix/blend|This paint is a mixture of blue and yellow.
w2583|surface||The surface of the table is wet.
w2584|volume||Turn down the TV volume, please.
w2585|length||What is the length of the table?
w2586|width|breadth|The width of the door is one meter.
w2587|height|altitude|The height of the mountain is impressive.
w2588|depth||The depth of the pool is two meters.
w2589|distance||How far is it from here to the beach?
w2590|dimension|measurements/size|Measure the dimensions of the box.
w2591|figure|shape|Draw a shape with four sides.
w2592|circle||The children sat in a circle.
w2593|triangle||A triangle has three sides.
w2594|rectangle||The table is shaped like a rectangle.
w2595|line||Draw a straight line with the ruler.
w2596|angle||This angle measures ninety degrees.
w2597|axis|axle|The Earth spins on its axis.
w2598|calculation||I did the calculation with the calculator.
w2599|addition|sum|The sum of two and three is five.
w2600|subtraction||The children practice subtraction in class.
w2601|division||Division is hard for my little brother.
w2602|multiplication||We learned the multiplication table.
w2603|equation||Solve this equation in your notebook.
w2604|fraction||One half is a fraction.
w2605|third|one third|I ate a third of the cake.
w2606|odd|odd number|Three is an odd number.
w2607|unit||The meter is a unit of length.
w2608|set|group/collection|This set of tools is very useful.
w2609|list||Make a shopping list.
w2610|table|chart/board|Look at the train timetable.
w2611|graph|chart|The graph shows the month's temperature.
w2612|outline|diagram/scheme|I made an outline to study history.
w2613|diagram|chart|The diagram explains how the machine works.
w2614|sample|specimen|They gave me a free perfume sample.
w2615|copy|issue/specimen|I bought two copies of the same book.
w2616|copy||I need a copy of your passport.
w2617|version||Download the new version of the app.
w2618|edition|editing|This is the first edition of the book.
w2619|text|passage|Read the text and answer the questions.
w2620|paragraph||Write a paragraph about your family.
w2621|sentence|prayer|Write a sentence with this word.
w2622|vocabulary||Reading helps increase your vocabulary.
w2623|grammar||Spanish grammar is not that hard.
w2624|verb||Ser is a very important verb.
w2625|noun||Casa is a feminine noun.
w2626|adjective||Bonito is an adjective.
w2627|syllable||The word casa has two syllables.
w2628|accent|stress|My teacher has an Argentine accent.
w2629|meaning|significance|What is the meaning of this word?
w2630|sense|meaning/direction|My grandfather has a good sense of humor.
w2631|concept|idea|This concept is hard to explain.
w2632|term|end|I don't understand this technical term.
w2633|expression|phrase|It's a very common expression in Mexico.
w2634|language|wording|Use clear and simple language.
w2635|communication||Communication in the family is important.
w2636|dialogue|dialog|We practiced a dialogue in Spanish class.
w2637|conversation|talk|We had a long conversation on the phone.
w2638|speech|address|The principal gave a speech at graduation.
w2639|debate|discussion|There was an interesting debate in class.
w2640|argument|plot|The plot of the movie is very simple.
w2641|conclusion||We came to the conclusion that we should stay home.
w2642|introduction||Read the book's introduction first.
w2643|contents|content|The contents of the box are a secret.
w2644|aspect|appearance|This aspect of the problem is important.
w2645|factor||The weather is an important factor.
w2646|element||Water is an essential element for life.
w2647|component|part|They replaced a computer part.
w2648|characteristic|feature/trait|Her main characteristic is patience.
w2649|feature|trait|She has her mother's features.
w2650|type|kind/sort|What kind of music do you like?
w2651|category|class|This hotel is first-class.
w2652|genre|gender/kind|What genre of movies do you prefer?
w2653|style||I like your style of dressing.
w2654|fashion|trend|Those shoes are in fashion this year.
w2655|trend|tendency|There's a trend toward eating healthier.
w2656|climate change||Climate change affects the whole planet.
w2657|global warming||Global warming is melting the glaciers.
w2658|ecology||We study ecology in science class.
w2659|recycle||At home we recycle paper and plastic.
w2660|pollute|contaminate|Cars pollute the city's air.
w2661|media|mass media|The media reported on the accident.
w2662|press|media|The press interviewed the mayor.
w2663|radio station|station|My dad listens to a classical music station.
w2664|chain|network/channel|It's a very big supermarket chain.
w2665|journalism||My cousin studies journalism at the university.
w2666|report|feature/documentary|We watched a report about dolphins.
w2667|headline||I read the newspaper headline this morning.
w2668|cover|front page|The book cover is very pretty.
w2669|editorial|publisher|Today's editorial is about education.
w2670|interviewer||The interviewer asked hard questions.
w2671|audience|hearing|The show has a large audience.
w2672|spectator|viewer|The spectators applauded at the end.
w2673|listener||The radio station greeted its listeners.
w2674|reader||My grandmother is a big reader.
w2675|social media|social networks|My sister spends a lot of time on social media.
w2676|follower|fan/supporter|That singer has millions of followers.
w2677|post|publication|I liked your latest post.
w2678|comment|remark|I left a comment on your photo.
w2679|link||I'll send you the link by message.
w2680|search engine||Look up the recipe on the search engine.
w2681|browser|navigator|Open the page in another browser.
w2682|privacy||You have to protect your privacy on the internet.
w2683|hacker||A hacker got into the company's computer.
w2684|software|program|I need to install new software.
w2685|hardware||The problem is in the hardware, not the program.
w2686|USB flash drive|USB stick/flash drive|Save your files on the USB stick.
w2687|download||The download took five minutes.
w2688|update|upgrade|There's an update for your phone.
w2689|settings|configuration/setup|Change the language in the settings.
w2690|type|key in|My grandfather types very slowly.
w2691|browse|surf/navigate|I like to browse the internet at night.
w2692|record|film|Let's record a video for Grandma.
w2693|edit||My brother edits videos on his computer.
w2694|scan||Scan the document and send it to me.
w2695|restart|reboot/reset|Restart the computer if it doesn't work.
w2696|draft|eraser|I saved the message as a draft.
w2697|mechanism|works|The watch's mechanism is very delicate.
w2698|organ||The heart is a very important organ.
w2699|brain||The brain controls the whole body.
w2700|lung||Our lungs help us breathe.
w2701|liver||The liver cleans the blood.
w2702|kidney||I have pain in my right kidney.
w2703|intestine|bowel/gut|The intestine helps digest food.
w2704|muscle||A muscle in my leg hurts.
w2705|nerve||The dentist touched a nerve.
w2706|vein||The nurse looked for a vein in my arm.
w2707|artery||The artery carries blood from the heart.
w2708|skeleton||We saw a dinosaur skeleton at the museum.
w2709|spine|backbone/spinal column|You have to take care of your spine.
w2710|hip||My grandmother broke her hip.
w2711|waist||These pants are too big at the waist.
w2712|thigh||Chicken thigh is very tasty.
w2713|ankle||I twisted my ankle playing soccer.
w2714|heel||I have a blister on my heel.
w2715|fist||He clenched his fist tightly.
w2716|palm|palm of the hand|I wrote the word on the palm of my hand.
w2717|thumb||The baby sucks his thumb.
w2718|eyelash|lash|You have an eyelash on your cheek.
w2719|eyelid|lid|My eyelid itches.
w2720|jaw||My jaw hurts when I chew.
w2721|chin||He has a dimple in his chin.
w2722|navel|belly button|The baby has a small belly button.
w2723|digestion||Walking after eating helps digestion.
w2724|breathing|respiration/breath|Breathe deeply and control your breathing.
w2725|circulation||Exercise improves circulation.
w2726|pulse||The doctor took my pulse.
w2727|heartbeat|beat|I can hear your heartbeat.
w2728|tension|stress/blood pressure|There's a lot of tension before the game.
w2729|tiredness|fatigue/exhaustion|I feel very tired after work.
w2730|fatigue|tiredness/exhaustion|Fatigue won't let me concentrate.
w2731|insomnia|sleeplessness|My dad suffers from insomnia.
w2732|dizziness|seasickness/motion sickness|I felt dizzy on the boat.
w2733|nausea|sickness|I feel nauseous in the morning.
w2734|burn||I burned myself with the iron.
w2735|fracture|break|The X-ray showed a fracture.
w2736|sprain||I have a sprained ankle.
w2737|bruise||I got a bruise on my knee.
w2738|swelling||The swelling went down with ice.
w2739|bite|sting/insect bite|I have a mosquito bite.
w2740|contagion|infection/spread|Wash your hands to avoid infection.
w2741|epidemic|outbreak|There was a flu epidemic that winter.
w2742|pandemic||During the pandemic we studied at home.
w2743|disability|handicap|My neighbor has a visual disability.
w2744|wheelchair||My grandfather uses a wheelchair.
w2745|crutch||He has walked with crutches since the accident.
w2746|stretcher||They carried him on a stretcher to the ambulance.
w2747|surgeon||The surgeon operated on my aunt.
w2748|surgery|operation|The surgery went very well.
w2749|anesthesia|anaesthetic|They gave me anesthesia before the operation.
w2750|diagnosis||The diagnosis was a bad flu.
w2751|recovery||I wish you a speedy recovery.
w2752|therapy|treatment|He goes to therapy twice a week.
w2753|rehabilitation|rehab|After the fracture he needed rehabilitation.
w2754|prevention||Prevention is better than cure.
w2755|hygiene|cleanliness|Hygiene is important in the kitchen.
w2756|nutrition||Good nutrition is key to growing.
w2757|diet|eating habits/nutrition|Watch your diet and exercise.
w2758|food|foodstuff|Milk is a very complete food.
w2759|legume|pulse/beans|Lentils are a nutritious legume.
w2760|dairy product|dairy|I can't eat dairy products.
w2761|cold cuts|sausage/cured meats|That store sells homemade cold cuts.
w2762|seafood|shellfish|I love seafood soup.
w2763|nuts|dried fruit|I eat nuts for my afternoon snack.
w2764|spice||This food has a lot of spices.
w2765|seasoning|condiment|Salt is the most common seasoning.
w2766|cinnamon||I like rice pudding with cinnamon.
w2767|oregano||Put a little oregano on the pizza.
w2768|parsley||Chop the parsley very fine.
w2769|basil||The sauce has tomato and basil.
w2770|ginger||Ginger tea is good for a cold.
w2771|mustard||Do you want mustard on your hot dog?
w2772|mayonnaise|mayo|Potatoes with mayonnaise are delicious.
w2773|olive||I put olives in the salad.
w2774|eggplant|aubergine|Today we're cooking baked eggplant.
w2775|broccoli||The children don't want to eat broccoli.
w2776|cauliflower||Cauliflower is white and round.
w2777|cabbage||I bought a cabbage for the salad.
w2778|celery||Celery has a lot of water.
w2779|radish||Radishes are red on the outside.
w2780|beet|beetroot|The beet turns the soup red.
w2781|sweet potato||We baked sweet potatoes in the oven.
w2782|pea|green pea|The rice has peas and carrots.
w2783|chickpea|garbanzo bean|My mom makes chickpea soup.
w2784|plum||These plums are very sweet.
w2785|fig||In summer we eat fresh figs.
w2786|raspberry||I made raspberry jam.
w2787|tangerine|mandarin orange|I peeled a tangerine for my sister.
w2788|grapefruit||I have grapefruit juice for breakfast.
w2789|lime||Squeeze a lime over the tacos.
w2790|almond||This cake has almonds.
w2791|peanut||My brother is allergic to peanuts.
w2792|oatmeal|oats|I have oatmeal with fruit for breakfast.
w2793|wheat||Bread is made with wheat flour.
w2794|barley||Horses eat barley.
w2795|dough|mass|We kneaded the pizza dough.
w2796|yeast||Without yeast the bread doesn't rise.
w2797|empanada|turnover/pasty|We ate beef empanadas at the party.
w2798|tortilla|omelette|Heat the tortillas for the tacos.
w2799|stew||My grandmother makes a chicken stew.
w2800|puree|mash|Today there are mashed potatoes for dinner.
w2801|croquette||The ham croquettes are tasty.
w2802|flan|custard/caramel custard|There's flan for dessert.
w2803|sponge cake|cake|We made a chocolate sponge cake.
w2804|sweets|candy/treat|Don't eat sweets before dinner.
w2805|chewing gum|gum|You can't chew gum in class.
w2806|lollipop|popsicle|The boy wants a strawberry lollipop.
w2807|suitable|appropriate/right|This isn't the right moment.
w2808|appropriate|suitable/proper|Those clothes aren't appropriate for the wedding.
w2809|convenient|advisable|It's a good idea to arrive early.
w2810|timely|well-timed/opportune|Your call came at just the right time.
w2811|favorable|good|The weather is favorable for traveling.
w2812|positive||My mom always has a positive attitude.
w2813|negative||The test came out negative.
w2814|neutral|impartial|The referee must be neutral.
w2815|efficient||It's an efficient way to save water.
w2816|productive||Today was a very productive day.
w2817|valuable|precious|Your help is very valuable to me.
w2818|worthy|dignified/decent|It's work worthy of admiration.
w2819|notable|remarkable/noticeable|There was a notable improvement in his grades.
w2820|outstanding|prominent|He is an outstanding student in the class.
w2821|considerable|substantial|We saved a considerable amount of money.
w2822|significant|meaningful|It was a very meaningful day for the family.
w2823|relevant|important|It's a very relevant piece of information.
w2824|decisive|deciding|It was the deciding goal of the game.
w2825|crucial|critical|This moment is crucial for the team.
w2826|vital|essential|Water is vital for plants.
w2827|indispensable|essential|The cell phone is indispensable for my dad.
w2828|essential|indispensable/must|It's essential to bring your passport.
w2829|unnecessary|needless|Don't buy unnecessary things.
w2830|excessive|too much|Excessive cell phone use is bad.
w2831|extreme||It's extremely hot in the desert.
w2832|moderate||Do moderate exercise every day.
w2833|reasonable|fair|The price is quite reasonable.
w2834|logical|natural|It's natural that you're tired.
w2835|absurd|ridiculous|That idea is absurd.
w2836|ridiculous|silly|I look ridiculous in this hat.
w2837|ironic||He said it in an ironic tone.
w2838|complex|complicated|It's a very complex problem.
w2839|superficial|shallow|It's only a superficial wound.
w2840|abstract||I like abstract art.
w2841|concrete|specific|Give me a concrete example.
w2842|theoretical||Tomorrow I have my written driving test.
w2843|technical||There was a technical problem with the TV.
w2844|cultural||We went to a cultural center.
w2845|historical|historic|We visited the historic center of the city.
w2846|traditional||We eat a traditional dish at Christmas.
w2847|contemporary|modern|I like contemporary music.
w2848|classic|classical|My dad listens to classical music.
w2849|original|creative|Your drawing is very original.
w2850|authentic|genuine/real|This restaurant serves authentic Mexican food.
w2851|legal|lawful|It's legal to park here on Sundays.
w2852|illegal|unlawful|It's illegal to throw trash in the street.
w2853|official||Spanish is the official language of Mexico.
w2854|formal||Wear formal clothes for the interview.
w2855|informal|casual|It was an informal get-together among friends.
w2856|urban|city|Public transportation in the city is cheap here.
w2857|rural|country|My grandparents live in a rural area.
w2858|agricultural|farming|It's a very rich agricultural region.
w2859|industrial||We live near an industrial area.
w2860|commercial|business|Let's go to the shopping mall.
w2861|financial||The company has financial problems.
w2862|work|labor/working|My mom has long working hours.
w2863|family|familiar|It's a family dinner.
w2864|domestic|household|I help with the household chores.
w2865|school||I already bought the school supplies.
w2866|university|college|My sister is a university student.
w2867|mental||Mental health is very important.
w2868|physical||I do physical activity every day.
w2869|emotional||It was a very emotional moment.
w2870|religious||My grandmother is very religious.
w2871|moral||We have a moral obligation to help.
w2872|ethical||It's not ethical to lie to customers.
w2873|aesthetic||He did it for aesthetic reasons.
w2874|visual||She has a very good visual memory.
w2875|digital||I bought a digital camera.
w2876|virtual|online|Today we had an online class.
w2877|electronic||I sent you an email.
w2878|electric|electrical|My uncle has an electric car.
w2879|automatic||The door is automatic.
w2880|manual||This car has a manual transmission.
w2881|annual|yearly|We have an annual party in the neighborhood.
w2882|monthly||The rent is paid monthly.
w2883|weekly||I have a weekly meeting on Mondays.
w2884|daily|everyday|Cooking is part of my daily life.
w2885|usual|regular/habitual|See you at the usual place.
w2886|frequent|common|It's a very common mistake.
w2887|occasional||We get occasional visits from my aunt and uncle.
w2888|permanent||It's a permanent exhibition at the museum.
w2889|temporary||It's a temporary summer job.
w2890|brief|short|Let me ask you a quick question.
w2891|eternal|endless|The wait was endless.
w2892|immediate|instant|I need an immediate answer.
w2893|sudden||There was a sudden change in the weather.
w2894|gradual||There was a gradual improvement.
w2895|constant||There's a constant noise in the street.
w2896|continuous|nonstop|He worked for three hours straight.
w2897|successive|consecutive|He won for three consecutive years.
w2898|previous|prior|You don't need previous experience.
w2899|later|subsequent/posterior|We'll talk about it at a later meeting.
w2900|primary|elementary|My brother goes to elementary school.
w2901|secondary|side|This medicine has no side effects.
w2902|central||We live in a central area.
w2903|side|lateral|Come in through the side door.
w2904|exterior|outside/outer|We painted the outside wall of the house.
w2905|interior|indoor/inner|I like indoor plants.
w2906|external|outside|This cream is for external use.
w2907|internal|inside|It's an internal problem of the company.
w2908|vertical||Draw a vertical line.
w2909|horizontal||Put the picture in a horizontal position.
w2910|parallel||The train tracks are parallel.
w2911|opposite||They live on the opposite side of the city.
w2912|contrary|opposite|We walked in the opposite direction.
w2913|similar|alike|My sisters have similar tastes.
w2914|similar|alike|Your backpack is similar to mine.
w2915|identical||The twins are identical.
w2916|equivalent|equal|One kilo is equivalent to a thousand grams.
w2917|relative||In life, everything is relative.
w2918|absolute|complete/total|I have complete trust in you.
w2919|pure|clean|In the countryside the air is pure.
w2920|mixed||I ordered a mixed salad.
w2921|transparent|clear|The lake water is clear.
w2922|brilliant|bright/shiny|Your daughter is a brilliant student.
w2923|pale||You're pale, do you feel okay?
w2924|intense|strong|The sun is very strong today.
w2925|mild|slight/light|I just have a slight fever.
w2926|violent||I don't like violent movies.
w2927|aggressive||That dog is a little aggressive.
w2928|peaceful|calm|My cat is very calm.
w2929|polite|courteous|He's always polite to the neighbors.
w2930|rude||Don't be rude to your sister.
w2931|humble|modest|He's famous, but very humble.
w2932|arrogant||I don't like his arrogant attitude.
w2933|modest|humble|He's very modest about his achievements.
w2934|vain|conceited|He's so vain that he always looks in the mirror.
w2935|stubborn||My grandfather is very stubborn.
w2936|flexible||My work schedule is flexible.
w2937|strict||The teacher is very strict.
w2938|severe|harsh/strict|The punishment was very harsh.
w2939|demanding||My boss is very demanding.
w2940|tolerant||We must be tolerant of others.
w2941|understanding|sympathetic|My parents are very understanding.
w2942|sensitive||My daughter is very sensitive.
w2943|sensible|reasonable/wise|It was a sensible decision.
w2944|careful|prudent/cautious|Be careful when you drive.
w2945|reckless|careless/imprudent|Crossing on a red light is reckless.
w2946|daring|bold/brave|It was very daring to jump into the water.
w2947|cowardly|coward|Don't be a coward, try it.
w2948|reliable|trustworthy|It's a reliable source of information.
w2949|trustworthy|reliable|My neighbor is a trustworthy person.
w2950|naughty|mischievous|My little brother is very naughty.
w2951|spoiled|pampered|He's a very spoiled child.
w2952|rude|bad-mannered/impolite|Don't be rude, say hello.
w2953|charming|lovely|Your grandmother is charming.
w2954|attractive|appealing|The price is very attractive.
w2955|funny|amusing|My uncle is very funny.
w2956|exciting|thrilling|The game was very exciting.
w2957|passionate||She is very passionate about her work.
w2958|enthusiastic|eager|He's a very enthusiastic student.
w2959|indifferent||I don't care about the color.
w2960|nostalgic||I feel nostalgic when I see old photos.
w2961|melancholy|sad/gloomy|It's a very melancholy song.
w2962|anxious|eager/nervous|I'm eager to see you.
w2963|distressed|anguished/worried|He's distressed about the exam.
w2964|desperate||He was desperately looking for his dog.
w2965|furious|angry|My dad is furious with me.
w2966|annoying|bothersome/annoyed|This noise is very annoying.
w2967|irritated|annoyed|Today he's irritated because of the traffic.
w2968|amazed|astonished/surprised|I was amazed by the scenery.
w2969|grateful|thankful|I'm very grateful for your help.
w2970|relieved||I feel relieved after the exam.
w2971|insecure|unsure/unsafe|I feel insecure before speaking in public.
w2972|evidently|clearly/obviously|Evidently, he didn't study for the exam.
w2973|apparently|seemingly|Apparently, everything is fine.
w2974|supposedly|allegedly|Supposedly he arrives at eight.
w2975|obviously|of course|Obviously, I'm going to help you.
w2976|naturally|of course|Naturally, he was tired after the trip.
w2977|indeed|actually/in fact|Indeed, you were absolutely right.
w2978|precisely|exactly|That's exactly what I wanted to talk about.
w2979|just|exactly/precisely|I was just about to call you.
w2980|directly|straight|Go straight home after class.
w2981|simply|just|I simply don't have time.
w2982|only|solely/just|I only want to sleep for a while.
w2983|mainly|mostly/chiefly|We mainly eat rice and beans.
w2984|basically||Basically, we have to start over.
w2985|essentially|basically|Essentially, it's the same idea.
w2986|relatively|fairly|The exam was relatively easy.
w2987|sufficiently|enough|The box isn't big enough.
w2988|extremely||It's extremely cold today.
w2989|extremely|highly/exceedingly|She's an extremely kind person.
w2990|slightly|a little|The soup is slightly salty.
w2991|approximately|about/roughly|The trip takes approximately two hours.
w2992|practically|almost/virtually|I've practically finished my homework.
w2993|definitely|certainly/for sure|I definitely want to come back to this place.
w2994|previously|before/formerly|We used to live in the countryside.
w2995|later|afterwards/subsequently|Later he moved to the capital.
w2996|beforehand|in advance/previously|You have to book in advance.
w2997|temporarily||The store is temporarily closed.
w2998|constantly|all the time|My brother checks his phone constantly.
w2999|continuously|nonstop/constantly|It has been raining nonstop since yesterday.
w3000|gradually|little by little|The pain gradually went away.
w3001|gradually|little by little/bit by bit|Little by little, he learned to swim.
w3002|successively|in succession/one after another|One, two, three, and so on.
w3003|mutually|each other/one another|The brothers help each other.
w3004|personally||Personally, I prefer tea.
w3005|publicly|in public|The mayor apologized publicly.
w3006|officially||The holidays officially start tomorrow.
w3007|legally||Legally, you still can't drive.
w3008|physically||Today I'm physically very tired.
w3009|mentally|in your head|Count to ten in your head.
w3010|emotionally||It was an emotionally difficult day.
w3011|socially||It's a socially important issue.
w3012|economically|financially|My parents help me financially.
w3013|politically||It's a politically sensitive issue.
w3014|likewise|same to you/equally|"Have a nice weekend!" "Same to you."
w3015|likewise|also/in addition/similarly|Likewise, we ask you to arrive early.
w3016|nevertheless|however/nonetheless|It was raining; nevertheless, we went for a walk.
w3017|despite|in spite of|We went out despite the rain.
w3018|as for|regarding/concerning/as regards|As for the party, everything is ready.
w3019|regarding|about/concerning/with respect to|I have a question about the homework.
w3020|in fact|actually|In fact, I already finished the homework.
w3021|actually|in reality/in fact/really|Actually, I don't like coffee.
w3022|in general|generally|In general, children go to bed early.
w3023|in particular|particularly/especially|I like fruit, especially mango.
w3024|of course|sure/certainly|"Will you help me?" "Of course!"
w3025|without a doubt|undoubtedly/no doubt|Without a doubt, it's the best pizza in the city.
w3026|at the same time|at once|I can't do two things at the same time.
w3027|meanwhile|in the meantime|I'll cook; meanwhile, set the table.
w3028|of course|certainly/naturally|Of course you can come.
w3029|instead of|in place of|I drink water instead of soda.
w3030|instead of|rather than|Instead of watching TV, read a book.
w3031|thanks to||I passed thanks to your help.
w3032|due to|because of/owing to|The flight was canceled due to the storm.
w3033|because of|due to/on account of|I didn't go to school because of a fever.
w3034|atmosphere|ambience/ambiance/mood|I like the atmosphere of this café.
w3035|environment|surroundings|Children learn from their environment.
w3036|context||Look for the meaning based on the context.
w3037|stage||The actors came out onto the stage.
w3038|frame||I bought a frame for the photo.
w3039|limit||My patience has a limit.
w3040|edge|border/rim|Don't put the glass on the edge of the table.
w3041|tip|point/end|I hurt myself on the tip of the knife.
w3042|bottom|back/end|The bathroom is at the end of the hallway.
w3043|side||Sit by my side.
w3044|side (of body)|flank|My side hurts when I run.
w3045|back (of paper)|reverse|Write your name on the back of the sheet.
w3046|summit|top/peak|We reached the top of the mountain.
w3047|peak|summit|The peak of the mountain has snow.
w3048|plain|plains|The plain is very green in spring.
w3049|plateau|tableland|Madrid is on a plateau.
w3050|mountain range|mountains/sierra|We went hiking in the mountains.
w3051|mountain range|range|The Andes mountain range is very long.
w3052|continent||America is a huge continent.
w3053|hemisphere||In the Southern Hemisphere, December is summer.
w3054|equator||The equator line passes through Ecuador.
w3055|pole||It's very cold at the North Pole.
w3056|citizenship||My uncle got Mexican citizenship.
w3057|housing|home/dwelling|It's hard to find housing in the city.
w3058|rent||The rent goes up every year.
w3059|mortgage|home loan|My parents pay the mortgage every month.
w3060|tenant|renter|The new tenant is very nice.
w3061|owner|landlord/proprietor|The owner fixed the window.
w3062|move (house)|moving/removal|The move is on Saturday.
w3063|construction|building|There's construction in front of my house.
w3064|brick||The house is made of red brick.
w3065|cement||The bricklayers mix the cement.
w3066|column|pillar|The building has marble columns.
w3067|wall||There's a high wall around the garden.
w3068|fence||The dog jumped the fence.
w3069|bars|grille/grating/railing|The windows have bars.
w3070|gate|main gate|Close the gate when you leave.
w3071|pipe|piping/plumbing|A pipe broke in the bathroom.
w3072|drain||The sink drain is clogged.
w3073|water pipe|pipe/piping|The plumber checked the pipes.
w3074|switch|light switch|The switch is next to the door.
w3075|light bulb|bulb|We need to change the light bulb.
w3076|light bulb|bulb|The kitchen light bulb burned out.
w3077|streetlight|lamppost/street lamp/lantern|There's a streetlight on the corner.
w3078|lane||Drive in the right lane.
w3079|curve|bend|There's a dangerous curve up ahead.
w3080|straight|straightaway|After the curve comes a long straight.
w3081|traffic jam|jam/congestion|There's a traffic jam on the highway.
w3082|traffic jam|jam/bottleneck|We arrived late because of a traffic jam.
w3083|crash|collision/accident|There was a crash on the avenue.
w3084|crane|tow truck|The tow truck took away the badly parked car.
w3085|trailer||We carried the bikes on a trailer.
w3086|sailboat|sailing ship/sailing boat|We saw a sailboat on the sea.
w3087|boat|rowboat|We went for a boat ride on the lake.
w3088|launch|motorboat/speedboat|We went to the island by motorboat.
w3089|canoe||We paddled down the river in a canoe.
w3090|submarine||The submarine went down to the bottom of the sea.
w3091|helicopter||A helicopter flew over the city.
w3092|ship|vessel/craft|The spaceship reached the Moon.
w3093|car (of train)|carriage/railcar/coach|We sat in the last car.
w3094|locomotive|engine|The old locomotive was puffing smoke.
w3095|track|railroad track/railway|Don't walk on the train tracks.
w3096|cruise||My grandparents went on a cruise in the Caribbean.
w3097|backpacker||He traveled around South America as a backpacker.
w3098|hostel|guesthouse|We slept in a cheap hostel.
w3099|hostel|shelter/lodge|We stayed at a youth hostel.
w3100|guest|lodger|The house has a room for guests.
w3101|host||The host welcomed us with a smile.
w3102|receptionist||The receptionist gave us the key.
w3103|caretaker|janitor/concierge/superintendent|The caretaker opens the building at six.
w3104|security guard|guard/watchman|The security guard watches the parking lot.
w3105|guard||There's a guard at the entrance.
w3106|detective||My son wants to be a detective.
w3107|witness||He was a witness to the accident.
w3108|suspect||The police arrested the suspect.
w3109|defendant|accused|The defendant said he was innocent.
w3110|prosecutor|district attorney|The prosecutor presented the evidence.
w3111|court|tribunal|The case went to court.
w3112|sentence|verdict/ruling|The judge read the sentence.
w3113|penalty|punishment/sentence|He received a two-year sentence.
w3114|punishment||As punishment, there's no TV today.
w3115|prison|jail|The thief is in prison.
w3116|prisoner|inmate|The prisoner was set free after five years.
w3117|theft|robbery|There was a robbery at the store.
w3118|robbery|holdup/mugging/assault|He was robbed on the bus.
w3119|scam|fraud/swindle|That message is a scam.
w3120|fraud||They discovered fraud in the company.
w3121|corruption||People are tired of corruption.
w3122|bribe|bribery|The police officer refused the bribe.
w3123|report|complaint/accusation|We reported the robbery.
w3124|clue|lead|The detective found a clue.
w3125|footprint|track/print|We saw dog tracks in the snow.
w3126|trace|trail/sign|They didn't leave any trace.
w3127|evidence|proof|The police found new evidence.
w3128|secret||Will you keep a secret for me?
w3129|mystery||Where my sock is is a mystery.
w3130|enigma|mystery/puzzle|His disappearance is still a mystery.
w3131|trick|knack/tip|I'll show you a trick for cooking rice.
w3132|joke|prank|It's just a joke, don't get mad.
w3133|joke|funny story|My dad tells really bad jokes.
w3134|bet|wager|We made a bet on the game.
w3135|chance|random|We picked a number at random.
w3136|coincidence|chance|What a coincidence to see you here!
w3137|fortune|luck|Fortunately, no one got hurt.
w3138|misfortune|bad luck|Unfortunately, we lost the game.
w3139|tragedy||Romeo and Juliet is a famous tragedy.
w3140|comedy||We watched a very funny comedy.
w3141|drama|TV drama|I like watching Korean dramas.
w3142|terror|horror/fear|We watched a horror movie.
w3143|suspense|thriller|I love suspense novels.
w3144|fiction||I like science fiction.
w3145|reality||Your dream came true.
w3146|fantasy|imagination|Kids love fantasy stories.
w3147|legend||My grandmother told me an old legend.
w3148|myth||We know many Greek myths.
w3149|fable||The fable of the tortoise and the hare is famous.
w3150|hero||My dad is my hero.
w3151|heroine||The heroine of the movie is very brave.
w3152|villain|bad guy|The villain always loses in the end.
w3153|monster||The boy is afraid of monsters.
w3154|ghost|phantom|They say there's a ghost in that house.
w3155|witch||The witch flies on her broom.
w3156|wizard|magician/sorcerer|The magician pulled a rabbit out of the hat.
w3157|magic||With a little magic, anything is possible.
w3158|fairy||The fairy godmother helped Cinderella.
w3159|dragon||The knight fought the dragon.
w3160|dwarf||Snow White lived with seven dwarfs.
w3161|treasure||The pirates were looking for treasure.
w3162|crown||The king wears a gold crown.
w3163|castle||We made a sandcastle at the beach.
w3164|palace||We visited the king's palace.
w3165|temple||There are many old temples in Kyoto.
w3166|cathedral||The cathedral is on the main square.
w3167|monument|memorial|We took a photo in front of the monument.
w3168|statue||There's a statue in the middle of the park.
w3169|ruins|ruin|We visited the Mayan ruins.
w3170|pyramid||We climbed the Pyramid of the Sun.
w3171|civilization||The Maya were a great civilization.
w3172|empire||The Inca Empire was very large.
w3173|colony||Mexico was a Spanish colony.
w3174|conquest||We are studying the conquest of the Americas.
w3175|independence||We celebrate Independence Day.
w3176|revolution||The Mexican Revolution began in 1910.
w3177|ancestor|forefather|My ancestors were from Galicia.
w3178|descendant||He is of Japanese descent.
w3179|inheritance|heritage|He received a house as an inheritance.
w3180|heritage|patrimony|That historic center is a World Heritage Site.
w3181|festival||We went to a music festival.
w3182|carnival||During carnival, everyone dresses up.
w3183|parade||We watched the parade from the balcony.
w3184|fair|trade fair/exhibition|We went to the book fair.
w3185|ceremony||The graduation ceremony was moving.
w3186|anniversary||Today is my parents' wedding anniversary.
w3187|tribute|homage|They held a tribute to the teacher.
w3188|toast||Let's make a toast to the bride and groom.
w3189|invitation||Thanks for the invitation to your party.
w3190|guest|invitee|The guests arrive at seven.
w3191|costume|disguise|What's your costume?
w3192|mask||I put on a lion mask.
w3193|fireworks||We watched the fireworks on New Year's.
w3194|postcard||I'll send you a postcard from Cancún.
w3195|handicrafts|crafts/handicraft|We bought handicrafts at the market.
w3196|ceramics|pottery|My mom does pottery on Saturdays.
w3197|jewel|jewelry/gem|She keeps her jewelry in a box.
w3198|diamond||The ring has a small diamond.
w3199|pearl||My grandmother has a pearl necklace.
w3200|glass|crystal|Be careful, the glass is made of glass.
w3201|metal||This table is made of metal.
w3202|steel||The bridge is made of steel.
w3203|copper||The cables are made of copper.
w3204|aluminum|aluminium|Soda cans are made of aluminum.
w3205|bronze||The statue in the park is made of bronze.
w3206|marble||The entrance floor is made of marble.
w3207|silk||My grandmother has a silk blouse.
w3208|linen|flax|This linen shirt is very cool.
w3209|perfume|fragrance|My mom wears a very soft perfume.
w3210|cosmetics|cosmetic/makeup|I bought some cosmetics at the pharmacy.
w3211|makeup|make-up|She hardly wears any makeup.
w3212|lipstick||She put on red lipstick.
w3213|nail polish|enamel/varnish|I like blue nail polish.
w3214|hairstyle|hairdo|What a pretty hairstyle you have today!
w3215|haircut||I need a haircut soon.
w3216|tattoo||My uncle has a tattoo on his arm.
w3217|wrinkle||My grandfather has wrinkles on his forehead.
w3218|scar||I have a scar on my knee.
w3219|mole|beauty mark|She has a mole near her mouth.
w3220|freckle|freckles|My sister has freckles on her nose.
w3221|sweat|perspiration|After running, I was covered in sweat.
w3222|crying|weeping/tears|The baby's crying woke me up.
w3223|shout|scream/yell/cry|I heard a scream in the street.
w3224|sigh||He let out a sigh of relief.
w3225|yawn||Yawning is contagious.
w3226|sneeze||That sneeze was really loud.
w3227|gesture|sign|He made a gesture to me with his hand.
w3228|posture||Sit with good posture.
w3229|jump|leap|The boy jumped really high.
w3230|fall||He had a fall on the stairs.
w3231|blow|hit/knock/bump|I hit my head.
w3232|push|shove|Someone pushed me in the line.
w3233|find|discover|I couldn't find my keys.
w3234|be enough|suffice|That's enough, thanks.
w3235|be quiet|keep quiet/fall silent|Everyone fell silent when the teacher came in.
w3236|apply for|request|I want to apply for a scholarship.
w3237|come|rush/go/turn up|The firefighters came quickly.
w3238|find out|figure out/discover|I'm going to find out what time it opens.
w3239|guess||Guess who came today!
w3240|pass away|die|His grandfather passed away last year.
w3241|opt|choose/decide|We chose to stay home.
w3242|perceive|notice/sense|I noticed a strange smell in the kitchen.
w3243|emit|broadcast/give off|The channel broadcasts news all day.
w3244|contribute|provide/bring|Each person contributed an idea.
w3245|beauty||I love the beauty of the landscape.
w3246|goodness|kindness|Everyone knows about her kindness.
w3247|certainty||I don't know for certain.
w3248|loyalty|faithfulness|That dog shows a lot of loyalty.
w3249|caution|precaution/care|Drive carefully, please.
w3250|prudence|caution/care|We must act with caution.
w3251|tenderness|affection|She looked at her son tenderly.
w3252|bravery|courage/valor|He showed great bravery in the rescue.
w3253|cover|include/encompass|The course covers many topics.
w3254|supply|provide/stock|This farm supplies the town with milk.
w3255|abolish||The country abolished slavery centuries ago.
w3256|overwhelm||So much work overwhelms me.
w3257|cause|bring about/lead to/carry|That decision could cause problems.
w3258|obey|comply with/abide by|You have to obey the school rules.
w3259|access|get into/log in|I can't access my email.
w3260|accentuate|emphasize/highlight|The light brings out the colors of the painting.
w3261|take in|welcome/shelter|The family took in a homeless dog.
w3262|happen|occur|No one knows what will happen tomorrow.
w3263|accumulate|collect/build up|I collected a lot of points at the store.
w3264|attach||I'm attaching the photos from the trip.
w3265|adopt||The school adopted a new method.
w3266|decorate|adorn|We decorated the Christmas tree.
w3267|face|confront/tackle|You have to face your problems.
w3268|aggravate|worsen/make worse|The rain made the traffic worse.
w3269|group|sort|Group the books by color.
w3270|praise|compliment|The teacher praised his drawing.
w3271|encourage|cheer on|My parents always encourage me.
w3272|relieve|ease/alleviate|This medicine relieves the pain.
w3273|store|keep|We store the food in the basement.
w3274|put up|host/lodge/accommodate|My aunt and uncle put us up for a week.
w3275|alternate||I alternate studying with sports.
w3276|cushion|muffle/soften/absorb|The rug muffles the noise.
w3277|long for|yearn for/crave|I long to see my family again.
w3278|anticipate|expect/foresee|No one expected so much rain.
w3279|cancel|annul/void|We had to cancel the reservation.
w3280|calm|soothe/pacify/appease|The mother calmed the baby.
w3281|bet|wager|I bet you it's going to rain.
w3282|seize|take over/grab|The thieves seized the money.
w3283|hurry|rush/hasten|Don't rush, we have time.
w3284|take advantage of|exploit/abuse|Don't take advantage of her kindness.
w3285|sign up|enroll/join|I signed up for the dance class.
w3286|take root|settle/become established|That custom took root in the town.
w3287|drag|pull|The boy drags his backpack.
w3288|snatch|grab/seize|Someone snatched her purse in the street.
w3289|throw|hurl/toss/dump|Don't throw trash into the river.
w3290|articulate|express/organize|You should express your ideas clearly.
w3291|nod|agree/assent|He nodded his head.
w3292|amaze|astonish/surprise|His talent amazed all of us.
w3293|inhale|breathe in|Breathe in the fresh sea air.
w3294|dim|soften/attenuate/reduce|The curtains soften the sunlight.
w3295|terrify|frighten/scare|Storms terrify my dog.
w3296|cross|go through/pass through|We crossed the park to get there.
w3297|predict|foretell/augur|Those clouds mean a storm is coming.
w3298|embarrass|shame|Don't embarrass me in front of my friends.
w3299|block|blockade/close off|A fallen tree blocked the road.
w3300|border|go around/skirt/line|We walked around the edge of the lake.
w3301|sprout|bud/bloom/spring up|The flowers in the garden have already come up.
w3302|channel|direct|Channel your energy into sports.
w3303|train|qualify|The company trains its employees.
w3304|capture|catch|The police caught the thief.
w3305|lack|be lacking|This soup lacks salt.
w3306|catalog|classify/catalogue|We cataloged all the books in the library.
w3307|give up|yield/hand over|I gave my seat to an older lady.
w3308|censor|condemn/criticize|The government censored the movie.
w3309|stop|cease|The rain finally stopped.
w3310|circulate|flow/move|Blood circulates throughout the body.
w3311|quote|cite|The teacher quoted a famous writer.
w3312|classify|sort|Sort the trash before throwing it away.
w3313|coincide|agree/match|Our opinions agree.
w3314|collapse|break down|The traffic came to a standstill because of the rain.
w3315|fight|combat/battle|We must fight pollution.
w3316|pity|feel sorry for/sympathize|I feel sorry for those who work today.
w3317|please|satisfy|It's hard to please everyone.
w3318|complement|supplement|Fruit goes well with breakfast.
w3319|compress|zip|Compress the file before sending it.
w3320|count|compute/calculate|Holidays are not counted.
w3321|arrange|set up/agree on|We set up an appointment with the doctor.
w3322|reconcile|balance/harmonize|It's hard to balance work and family.
w3323|condition|determine/affect|The weather affects our plans.
w3324|confer|grant/award/bestow|The university awarded him a prize.
w3325|configure|set up|Help me set up the phone.
w3326|freeze||I froze the meat for next week.
w3327|conjugate||Today we learned to conjugate verbs.
w3328|consolidate|strengthen|The team consolidated its first place.
w3329|confirm|verify|We were able to confirm that everything was fine.
w3330|accomplish|carry out/complete/consummate|They finally carried out their plan.
w3331|contemplate|gaze at/look at/watch|We like to gaze at the stars.
w3332|counteract|offset/counter|Drink water to counteract the heat.
w3333|contrast||That color contrasts with the wall.
w3334|call|summon/convene|The principal called a meeting.
w3335|coordinate|organize|She coordinates the club's activities.
w3336|quote|estimate/price|I asked them to give me a quote for the repair.
w3337|question|challenge/doubt|Many people question that decision.
w3338|culminate|end/climax|The party ended with fireworks.
w3339|blame||Don't blame your brother.
w3340|deduce|infer/conclude|I figured you were tired.
w3341|delegate||A good boss knows how to delegate.
w3342|deliberate|discuss|The jury deliberated for hours.
w3343|delay|be late/take|The train was an hour late.
w3344|derive|come from|This word comes from Latin.
w3345|defeat|beat|Our team beat the champion.
w3346|knock down|demolish/tear down|They're going to tear down the old building.
w3347|untie|undo|Untie the knot carefully.
w3348|rule out|discard/dismiss|We're not ruling out any option.
w3349|decipher|decode/make out|I can't make out his handwriting.
w3350|disconnect|unplug|Unplug the charger, please.
w3351|play (a role)|perform/carry out/fulfill|She plays an important role.
w3352|trigger|unleash/set off/spark|A comment triggered the argument.
w3353|dismiss|reject/throw out|The judge dismissed the lawsuit.
w3354|deny|refute|The actor denied the rumors.
w3355|clear|clear up|In the afternoon, the sky cleared up.
w3356|move|shift/displace|Move the chair a little to the left.
w3357|detach|peel off/remove|Peel off the label carefully.
w3358|allocate|assign/set aside/earmark|We set that money aside for vacation.
w3359|reveal|disclose/unveil|She finally revealed her secret.
w3360|divert|deflect/reroute/detour|They diverted the traffic because of the roadwork.
w3361|diagnose||The doctor diagnosed him with the flu.
w3362|dictate||The teacher dictated a short text.
w3363|defame|slander/libel|You shouldn't slander anyone.
w3364|delay|put off/prolong|Don't put off the decision any longer.
w3365|disagree|differ|I disagree with you on that.
w3366|hide|conceal/disguise|He couldn't hide his joy.
w3367|dissolve||Dissolve the sugar in the water.
w3368|dissuade|deter/talk out of|We talked him out of going out in the storm.
w3369|ramble|digress/wander|Don't ramble, get to the point.
w3370|spread|divulge/disclose|Don't spread my secret.
w3371|evade|avoid/dodge/elude|He always avoids my questions.
w3372|emanate|give off/come from|A delicious smell is coming from the kitchen.
w3373|seize|confiscate/repossess|The bank repossessed the house.
w3374|emerge|surface/appear|The whale surfaced from the water.
w3375|empathize|relate|It's important to empathize with others.
w3376|undertake|start/launch/embark on|My brother wants to start a business.
w3377|lead|head|She leads the study group.
w3378|fit||This piece doesn't fit here.
w3379|face|confront|We have to face reality.
w3380|guide|channel/steer|Parents guide their children.
w3381|emphasize|stress|The teacher stressed the importance of reading.
w3382|breed|generate/give rise to/beget|Violence breeds more violence.
w3383|link|connect/join|This bridge connects the two cities.
w3384|amend|correct/make up for|I want to make up for my mistake.
w3385|strike up|start/begin/establish|We struck up a conversation on the train.
w3386|hinder|obstruct/hamper/slow down|The snow slowed down the traffic.
w3387|involve|entail|That trip involves some risks.
w3388|meddle|interfere/butt in|Don't meddle in my business.
w3389|list|enumerate|List three fruits you like.
w3390|eradicate|wipe out/eliminate|We want to eradicate hunger.
w3391|erect|build/raise/put up|They put up a statue in the square.
w3392|be scarce|run short/run low|In summer, water is scarce.
w3393|clarify|solve/clear up|The police solved the case.
w3394|wield|brandish/put forward|He put forward good arguments in the debate.
w3395|speculate|guess|Don't speculate without knowing the facts.
w3396|dodge|avoid/evade|He nimbly dodged the ball.
w3397|stall|stagnate/stop|The project stalled due to lack of money.
w3398|stipulate|specify/set out|The contract specifies the working hours.
w3399|evade|avoid/escape|You can't avoid your responsibilities.
w3400|evoke|bring back/recall|This song brings back my childhood.
w3401|exhibit|display/show|The museum displays old paintings.
w3402|expand|grow/extend|The company wants to expand its business.
w3403|elaborate|go on at length/expand|Grandpa went on at length telling stories.
w3404|extinguish|put out|The firefighters put out the fire.
w3405|extract|pull out/take out|The dentist pulled out one of my molars.
w3406|fluctuate|vary|Prices fluctuate every week.
w3407|forge|build|They forged a great friendship at school.
w3408|formulate|ask/express/put|May I ask a question?
w3409|merge|fuse/combine|The two companies merged.
w3410|glorify|praise/exalt|The poem glorifies heroes.
w3411|govern|rule|The president governs the country.
w3412|tax|levy|The government taxes luxury goods.
w3413|harass|bully/pester|You shouldn't harass your classmates.
w3414|devise|come up with/invent|We came up with a new game.
w3415|illustrate|explain|The teacher illustrated the idea with an example.
w3416|teach|give/impart|She teaches English classes.
w3417|introduce|implement/establish|The school introduced a new schedule.
w3418|implement|carry out|We will implement the plan in January.
w3419|promote|boost/drive|The government promotes tourism.
w3420|encourage|incentivize/promote|We want to encourage reading at home.
w3421|affect|influence/have an impact|The weather affects our mood.
w3422|incorporate|add/include|Add the egg to the mixture.
w3423|instill|teach/inculcate|My parents instilled respect in me.
w3424|investigate|look into/inquire|The journalist looked into the case.
w3425|infer|deduce/gather|From his words, I gather that he's sad.
w3426|break|violate/infringe|Don't break the traffic rules.
w3427|interfere|meddle/butt in|I don't want to interfere in your life.
w3428|insinuate|imply/hint|What are you implying?
w3429|establish|set up/introduce|They established a new family tradition.
w3430|intercede|intervene/mediate|My grandmother interceded for me.
w3431|sense|feel/intuit|I sensed that something was wrong.
w3432|invade|overrun|The ants invaded the kitchen.
w3433|involve|drag into/implicate|Don't drag me into your problems.
w3434|burst in|barge in/break in|The dog burst into the living room.
w3435|justify||Nothing justifies violence.
w3436|legislate|make laws|Congress makes laws on education.
w3437|deal with|cope with/struggle with|I have to deal with a lot of stress.
w3438|manipulate|handle/tamper with|Don't tamper with the electrical cables.
w3439|mediate|intervene|The teacher mediated between the two children.
w3440|underestimate|belittle/look down on|Don't belittle other people's work.
w3441|mitigate|ease/reduce/lessen|Trees reduce the heat in the city.
w3442|moderate|turn down/reduce|Turn down the volume, please.
w3443|mold|shape/mould|We shaped figures out of modeling clay.
w3444|mobilize|rally|The town rallied to help.
w3445|neutralize|counteract|Lemon neutralizes the fishy smell.
w3446|obstruct|block/hinder|A car was blocking the exit.
w3447|fluctuate|range/vary/swing|The temperature ranges between ten and twenty degrees.
w3448|agree|make a pact/make a deal|We agreed not to fight anymore.
w3449|sponsor|support|A company sponsors our team.
w3450|last|endure/live on|His memory will live on forever.
w3451|perfect|improve/polish|I want to perfect my Spanish.
w3452|persist|continue/last|If the pain persists, see a doctor.
w3453|express|capture/shape/embody|He expressed his ideas in a drawing.
w3454|weigh|consider/ponder|We have to weigh the pros and cons.
w3455|apply|run|I'm going to apply for that job.
w3456|predominate|prevail|Roses predominate in this garden.
w3457|do without|go without/dispense with|I can't do without coffee.
w3458|witness|see|We witnessed an accident on the corner.
w3459|prevail|win out/triumph|In the end, the truth prevailed.
w3460|prioritize||You should prioritize your health.
w3461|proclaim|declare|They declared him champion of the tournament.
w3462|prolong|extend|We extended our vacation by one day.
w3463|spread|propagate|The wind spread the fire.
w3464|prosper|thrive/flourish|My aunt's business prospered.
w3465|continue|proceed/carry on|After eating, we continued the trip.
w3466|come from|originate|This fruit comes from Mexico.
w3467|lie in|be rooted in|The problem lies in the lack of time.
w3468|ratify|confirm|The country ratified the agreement.
w3469|raise|collect|We raised money for the school.
w3470|compile|gather/collect|I compiled all my grandmother's recipes.
w3471|correct|rectify/fix|Correct the date on the form.
w3472|write|draft/compose|Write an email to the teacher.
w3473|refund|reimburse/pay back|The store refunded my money.
w3474|refute|rebut/disprove|It's hard to refute his arguments.
w3475|govern|apply/be in force/rule|These rules apply throughout the school.
w3476|claim|demand/stand up for|The workers stand up for their rights.
w3477|remedy|fix/make up for|It can't be fixed now.
w3478|date back|go back|This house dates back to the last century.
w3479|give up|surrender|Never give up!
w3480|affect|have an impact/have repercussions|Sleeping too little affects your health.
w3481|suppress|hold back/repress|I couldn't hold back my laughter.
w3482|reproach|blame/scold|Don't blame me for anything.
w3483|reside|live|My aunt lives in Lima.
w3484|restore|reestablish|They already restored the power in the neighborhood.
w3485|highlight|stand out/bring out|This color brings out your eyes.
w3486|resume|take up again/pick up|We resumed class after recess.
w3487|portray|paint/depict|The painter painted a portrait of my grandmother.
w3488|reverse|revert/turn around|We can still turn the situation around.
w3489|safeguard|protect|We must protect nature.
w3490|saturate|overload/flood|The calls overloaded the line.
w3491|kidnap|abduct|In the movie, they kidnap a boy.
w3492|exceed|surpass/go beyond|The price exceeds our budget.
w3493|undermine|weaken/erode|Lies undermine trust.
w3494|raffle|draw|We're going to raffle off a prize at the party.
w3495|underestimate||Don't underestimate your opponent.
w3496|survive|subsist/remain/live on|That tradition still survives.
w3497|supply|provide|The company supplies water to the city.
w3498|abolish|eliminate/cancel/suppress|They eliminated the final exam.
w3499|support|sustain/provide for|My father supports the family.
w3500|distort|twist/misrepresent|Don't twist my words.
w3501|process|apply for|I'm applying for my passport.
w3502|transcend|leak out/spread|The news spread quickly.
w3503|disrupt|upset/disturb|The rain disrupted our plans.
w3504|usurp|seize/take over|He took over his boss's position.
w3505|hesitate|waver|Don't hesitate to ask for help.
w3506|glimpse|make out/catch sight of|In the distance, we caught sight of the sea.
w3507|violate|infringe|That law violates our rights.
w3508|field|area/sphere/domain|She works in the field of health.
w3509|nature|kind/sort/type|We talk about all kinds of topics.
w3510|approach|focus|We need a different approach.
w3511|perspective|point of view/viewpoint|From my perspective, it's a good idea.
w3512|criterion|criteria/judgment/standard|Everyone has their own judgment.
w3513|parameter|setting|Adjust the program's settings.
w3514|premise||We started from a false premise.
w3515|notion|idea/sense|I lost track of time.
w3516|nuance|shade/shade of meaning|That word has a different nuance.
w3517|paradox||It's an interesting paradox.
w3518|dilemma||I'm facing a difficult dilemma.
w3519|controversy|dispute/debate|The movie caused a lot of controversy.
w3520|controversy|dispute|The new schedule caused controversy.
w3521|consensus|agreement|We reached a consensus in the family.
w3522|discrepancy|difference|There's a discrepancy in the accounts.
w3523|contradiction||There's a contradiction in his story.
w3524|coherence|consistency|Your answer doesn't make sense.
w3525|rigor|thoroughness/rigour|He studied the subject rigorously.
w3526|validity||The ticket is valid for one month.
w3527|efficacy|effectiveness|No one doubts the effectiveness of this vaccine.
w3528|efficiency||She works very efficiently.
w3529|performance|results|His school performance improved a lot.
w3530|performance|execution|Her performance at work is excellent.
w3531|productivity||Sleeping well improves productivity.
w3532|competitiveness||The company wants to improve its competitiveness.
w3533|sustainability||We talked about sustainability in class.
w3534|feasibility|viability|We studied the feasibility of the project.
w3535|profitability|return|The business is quite profitable.
w3536|investment||Studying is a good investment.
w3537|investor||An investor backed the new store.
w3538|shareholder|stockholder|My uncle is a shareholder in the company.
w3539|action|act/deed|Helping the lady was a good deed.
w3540|stock exchange|stock market|The stock market went up today.
w3541|unemployment||Unemployment went down this year.
w3542|inflation||Inflation makes everything more expensive.
w3543|recession|downturn|The country went into a recession.
w3544|boom|peak/rise|Tourism is booming.
w3545|deficit|shortfall|The budget has a large deficit.
w3546|surplus||This year there was a surplus.
w3547|income|earnings/revenue|His income went up this year.
w3548|expense|expenditure/outgoing|Write down the month's income and expenses.
w3549|property|assets/possessions/goods|He left all his property to his children.
w3550|capitalism||We studied capitalism in history class.
w3551|socialism||Socialism is a political system.
w3552|globalization|globalisation|Globalization brings countries together.
w3553|merchandise|goods|The goods arrived by truck.
w3554|export|exportation|Coffee exports are important here.
w3555|import|importation|This store sells imported products.
w3556|consumer||The consumer has the right to complain.
w3557|supplier|provider|We changed internet providers.
w3558|distributor|dealer|The distributor brings the milk every morning.
w3559|franchise||They opened a pizza franchise.
w3560|branch|branch office|The bank has a branch nearby.
w3561|headquarters|head office/seat|The company's headquarters is in Bogotá.
w3562|subsidiary|affiliate|The subsidiary opened an office in Chile.
w3563|staff|workforce/personnel|The store's staff is small.
w3564|board|management/board of directors|The board approved the plan.
w3565|meeting|board/council|We have a parents' meeting on Monday.
w3566|committee||She is on the school committee.
w3567|assembly|meeting|There was a neighborhood meeting.
w3568|term|term of office/mandate|His term ends next year.
w3569|legislation|laws|The law protects children.
w3570|decree||The president signed a decree.
w3571|rule|norm/standard|We follow the library rules.
w3572|regulations|rules/bylaws|Read the club rules.
w3573|clause||Read each clause of the contract carefully.
w3574|requirement|prerequisite|Speaking English is a requirement.
w3575|bureaucracy|red tape|There's too much red tape for everything.
w3576|sovereignty||Each country defends its sovereignty.
w3577|electorate|voters|The voters voted for change.
w3578|seat||The party won ten seats.
w3579|cabinet||The president introduced his new cabinet.
w3580|opposition||The opposition criticized the new law.
w3581|coalition||The parties formed a coalition.
w3582|regime|system|The country changed its regime.
w3583|ideology||I respect all ideologies.
w3584|propaganda|advertising/publicity|A lot of advertising came in the mailbox.
w3585|censorship||The movie got past the censors.
w3586|repression|oppression|The people suffered years of repression.
w3587|exile||The writer lived in exile for many years.
w3588|refugee||We helped a refugee family.
w3589|asylum|refuge|He asked for asylum in another country.
w3590|diplomacy|tact|He solved the problem with diplomacy.
w3591|ambassador||The ambassador visited our school.
w3592|summit|top/peak|We reached the top of the mountain.
w3593|negotiation|talks|The negotiation lasted all night.
w3594|sanction|penalty|The player received a penalty.
w3595|alliance||The two countries signed an alliance.
w3596|truce|ceasefire|The two sides agreed to a truce.
w3597|armament|arms/weapons|The country reduced its weapons.
w3598|terrorism||We all reject terrorism.
w3599|attack|terrorist attack|The news reported on the attack.
w3600|hostage||They freed all the hostages.
w3601|social security||Social security covers medical expenses.
w3602|pension||My grandfather lives on his pension.
w3603|subsidy|allowance/benefit|The government gives a subsidy to families.
w3604|charity|welfare|They donated money to a charity.
w3605|volunteering|volunteer work|I volunteer at a hospital on Saturdays.
w3606|volunteer||My sister is a volunteer at the library.
w3607|charity||She helps the poor out of charity.
w3608|solidarity|support|Thank you for your support.
w3609|cooperation||We need everyone's cooperation.
w3610|coexistence|living together|Living with my cousins is fun.
w3611|integration||The new students fit in quickly.
w3612|diversity|variety|I love the diversity of cultures here.
w3613|inclusion||The school promotes the inclusion of everyone.
w3614|marginalization|exclusion|Marginalization affects many people.
w3615|exclusion||No one deserves to be excluded because of their origin.
w3616|prejudice|bias|We must fight against prejudice.
w3617|stereotype||That joke is based on a stereotype.
w3618|tolerance||Tolerance is important in a family.
w3619|dignity||All people deserve dignity.
w3620|integrity||He is a man of great integrity.
w3621|honesty||I really value my friends' honesty.
w3622|honesty|integrity/uprightness|Everyone knows about his honesty.
w3623|ethics||Ethics is important at work.
w3624|morality|morals|We talked about the morality of his actions.
w3625|virtue||Patience is a great virtue.
w3626|vice|bad habit|Smoking is a dangerous vice.
w3627|fault|blame/guilt|It wasn't your fault.
w3628|remorse|guilt|He felt remorse for lying.
w3629|repentance|regret/remorse|He showed regret and apologized.
w3630|revenge|vengeance|Revenge doesn't solve anything.
w3631|resentment|grudge|I don't hold a grudge against anyone.
w3632|compassion|pity/sympathy|She felt compassion for the abandoned dog.
w3633|empathy||Empathy helps us understand others.
w3634|gratitude|thanks/thankfulness|I expressed my gratitude to the teacher.
w3635|generosity||Thank you for your generosity.
w3636|humility|modesty|He talks about his achievements with humility.
w3637|arrogance|pride/haughtiness|His arrogance made him lose friends.
w3638|greed|avarice|Greed never brings happiness.
w3639|laziness|sloth|Today I don't feel like cleaning.
w3640|anger|rage/wrath/fury|Don't let anger control you.
w3641|anguish|anxiety/distress|I felt anxious before the exam.
w3642|despair|desperation|She was crying in despair.
w3643|nostalgia|homesickness|I feel nostalgic for my childhood.
w3644|melancholy|sadness/gloom|The rain makes me melancholy.
w3645|euphoria|elation|There was euphoria after the victory.
w3646|enthusiasm|eagerness|She works with great enthusiasm.
w3647|amazement|astonishment/wonder|We looked at the volcano in amazement.
w3648|confusion|bewilderment|The news caused confusion.
w3649|indignation|outrage|I felt outraged at the injustice.
w3650|frustration||I felt very frustrated when we lost the game.
w3651|resignation||He accepted the news with resignation.
w3652|uncertainty||We live with uncertainty about the future.
w3653|worry|anxiety/concern/unease|I'm a little worried about my health.
w3654|stress|pressure/overwhelm|I feel overwhelmed with so much homework.
w3655|discouragement|dejection|Don't let yourself get discouraged.
w3656|self-esteem|self-confidence|Sports improve self-esteem.
w3657|will|willpower|She has a very strong will.
w3658|determination|resolve|He spoke with determination.
w3659|perseverance|persistence|With perseverance, you can achieve anything.
w3660|perseverance|consistency/constancy|Consistency is the key to success.
w3661|discipline||Sports teach discipline.
w3662|initiative||She took the initiative and organized the party.
w3663|leadership||She shows a lot of leadership on the team.
w3664|talent|gift|You have a talent for music.
w3665|skill|dexterity/skillfulness|He cuts the wood skillfully.
w3666|aptitude|ability/talent|She has an aptitude for languages.
w3667|wisdom||My grandmother is very wise.
w3668|ingenuity|wit/cleverness|He solved the problem cleverly.
w3669|intellect|intelligence|She is a person of great intellect.
w3670|reasoning||Your reasoning is very logical.
w3671|intuition|instinct|My intuition tells me he's right.
w3672|perception|view|Everyone has a different perception.
w3673|consciousness|awareness|He lost consciousness for a moment.
w3674|subconscious||The subconscious influences dreams.
w3675|imagination||Children have a lot of imagination.
w3676|creativity||This work requires a lot of creativity.
w3677|inspiration||The sea is my source of inspiration.
w3678|reflection|thought/consideration|After a lot of thought, I decided to stay.
w3679|argumentation|reasoning/argument|His argument was very convincing.
w3680|rhetoric||His speech was full of rhetoric.
w3681|metaphor||The poem uses a beautiful metaphor.
w3682|symbol||The dove is a symbol of peace.
w3683|allegory||The play is an allegory of life.
w3684|irony|sarcasm|He said it ironically.
w3685|satire||The movie is a political satire.
w3686|narrative|fiction/prose|I like Latin American fiction.
w3687|plot|storyline|The plot of the novel is exciting.
w3688|ending|outcome/denouement|I didn't expect that ending.
w3689|prologue|preface/foreword|Read the prologue before you start.
w3690|epilogue|afterword|The epilogue explains what happened afterward.
w3691|stanza|verse|The song has three verses.
w3692|verse|line|He wrote a few verses for his mother.
w3693|rhyme||Find a word that rhymes with "amor".
w3694|essayist||Octavio Paz was a great essayist.
w3695|playwright|dramatist|Lope de Vega was a famous playwright.
w3696|novelist||My aunt wants to be a novelist.
w3697|poet||Pablo Neruda was a Chilean poet.
w3698|critic|reviewer|The critic praised the movie.
w3699|masterpiece||This painting is a masterpiece.
w3700|manuscript||The author lost the manuscript.
w3701|bibliography|references|Include the bibliography at the end of the paper.
w3702|thesis|dissertation|My brother is writing his master's thesis.
w3703|laboratory|lab|We did an experiment in the lab.
w3704|variable|factor|Temperature is an important variable.
w3705|phenomenon||A rainbow is a natural phenomenon.
w3706|discovery|finding/find|The discovery surprised the scientists.
w3707|pattern||This drawing follows a pattern.
w3708|projection|forecast|The sales forecast is positive.
w3709|index|rate|The price index went up this month.
w3710|rate||The unemployment rate fell this year.
w3711|coefficient||Calculate the coefficient of the equation.
w3712|probability|chance/likelihood|There's a high chance of rain today.
w3713|magnitude|scale/size|The earthquake had a magnitude of seven.
w3714|scale||This map has a small scale.
w3715|proportion|ratio|Mix water and flour in equal proportions.
w3716|threshold||He stopped at the threshold of the door.
w3717|trajectory|path/career|We watched the path of the ball.
w3718|stage|phase/period|Adolescence is a difficult stage.
w3719|phase|stage|The project is in its final phase.
w3720|transition||It's a time of transition.
w3721|cycle||The water cycle is fascinating.
w3722|sequence|order|Follow the sequence of numbers.
w3723|hierarchy||There is a strict hierarchy in the army.
w3724|infrastructure||The city needs better infrastructure.
w3725|urban planning|town planning|She studies urban planning at the university.
w3726|architecture||I'm interested in modern architecture.
w3727|other people's|someone else's/another's|Don't touch other people's things.
w3728|suitable|fit/appropriate|This movie is suitable for children.
w3729|arduous|hard/difficult/tough|It was hard work, but it was worth it.
w3730|rough|coarse|The fabric is very rough.
w3731|bold|daring/audacious|It was a bold decision.
w3732|trivial|banal/mundane|We talked about trivial things.
w3733|benevolent|kind/lenient|The judge was lenient with him.
w3734|blurry|blurred/fuzzy|The photo came out blurry.
w3735|cautious|careful|Be careful when crossing the street.
w3736|accurate|on target/spot-on|He made an accurate comment.
w3737|consistent|coherent|Your answer isn't consistent.
w3738|complicit|knowing|She gave me a knowing look.
w3739|convincing|forceful/compelling/blunt|He gave a forceful answer.
w3740|chronic||My grandfather has a chronic illness.
w3741|substantial|large/considerable|They received a large donation.
w3742|poor|deficient/inadequate|The service was poor.
w3743|deliberate|intentional|It was a deliberate mistake.
w3744|desolate|devastated|The town was devastated after the storm.
w3745|ruthless|merciless/heartless|The villain was ruthless.
w3746|skillful|dexterous/handy|He's very skillful with tools.
w3747|vague|hazy/diffuse/fuzzy|I have a hazy memory of that day.
w3748|discreet|modest/understated|She's wearing an understated dress.
w3749|scattered|dispersed|The toys were scattered across the floor.
w3750|docile|obedient/gentle|This dog is very gentle.
w3751|fleeting|ephemeral/short-lived|Fame is fleeting.
w3752|eloquent||It was a very eloquent speech.
w3753|eminent|distinguished/prominent|He is an eminent scientist.
w3754|empirical||We need empirical data.
w3755|flimsy|weak/fragile|The chair is very flimsy.
w3756|enigmatic|mysterious|She has an enigmatic smile.
w3757|skeptical|doubtful|I'm skeptical about that plan.
w3758|spontaneous|natural|His laughter was spontaneous.
w3759|stable|steady/secure|She has a steady job.
w3760|unstable|changeable/unsettled|The weather is unsettled today.
w3761|exhaustive|thorough|They did a thorough search.
w3762|explicit|clear|The instructions are very clear.
w3763|implicit|implied|There's an implied message in the letter.
w3764|exquisite|delicious|The food was delicious.
w3765|feasible|doable/possible|Your idea is doable.
w3766|fruitful|productive/fertile|It was a productive year for the writer.
w3767|ferocious|fierce|The tiger is a fierce animal.
w3768|fertile|rich|This land is very fertile.
w3769|fragile|delicate/breakable|Careful, that glass is fragile.
w3770|frivolous|shallow|Don't be so shallow.
w3771|genuine|real/authentic|It's genuine leather.
w3772|global|overall/comprehensive|We have an overall view of the problem.
w3773|hostile|unfriendly|The atmosphere was hostile.
w3774|ideal|perfect/suitable|It's the ideal place to rest.
w3775|unharmed|unhurt/uninjured|He came out of the accident unhurt.
w3776|illustrious|distinguished/eminent|He comes from a distinguished family.
w3777|impartial|fair/unbiased|The referee must be impartial.
w3778|impeccable|flawless/perfect|His work was flawless.
w3779|relentless|merciless/unforgiving|The sun was relentless.
w3780|unforeseen|unexpected|We had an unexpected problem.
w3781|unheard-of|unprecedented/outrageous|This is outrageous!
w3782|incessant|constant/nonstop|The nonstop rain flooded the street.
w3783|uncertain||The future is uncertain.
w3784|indelible|unforgettable|It was an unforgettable experience.
w3785|unpublished|unreleased|They found an unpublished poem.
w3786|inert|motionless/lifeless|The machine came to a standstill.
w3787|inevitable|unavoidable|Change is inevitable.
w3788|inexplicable|unexplainable|It was an inexplicable event.
w3789|naive|gullible|Don't be naive, it's a trap.
w3790|inherent|intrinsic|Risk is inherent in every business.
w3791|imminent|impending|The storm is imminent.
w3792|innocent|not guilty|The defendant is innocent.
w3793|unusual|extraordinary/rare|It's unusual to see snow here.
w3794|complete|entire/whole|I read the entire text.
w3795|intrinsic|inherent/essential|The intrinsic value of friendship is enormous.
w3796|implausible|unlikely/far-fetched|His excuse is far-fetched.
w3797|irreversible||The damage is irreversible.
w3798|lawful|legal/legitimate|It's a legal business.
w3799|talkative|chatty/loquacious|My uncle is very talkative.
w3800|lucid|clear-headed/sharp|At ninety, he's still very sharp.
w3801|meticulous|careful/thorough|He is very meticulous about his work.
w3802|thorough|detailed/meticulous|He did a thorough analysis.
w3803|scathing|biting/caustic|He always makes biting comments.
w3804|sharp|clear/crisp|The image looks very sharp.
w3805|harmful|noxious|Smoke is harmful to your health.
w3806|well-known|obvious/evident|His talent is well-known.
w3807|obsolete|outdated|This phone is already outdated.
w3808|opaque|frosted|The window glass is frosted.
w3809|optimal|best/ideal|It's the best time to plant.
w3810|ostentatious|flashy/showy|He has a very flashy car.
w3811|perennial|evergreen/everlasting|The pine is an evergreen tree.
w3812|relevant|pertinent/appropriate|She asked a relevant question.
w3813|perceptive|shrewd/insightful|My grandmother is very perceptive.
w3814|plausible|believable|It's a plausible explanation.
w3815|precarious|poor/unstable|They live in poor conditions.
w3816|favorite|preferred|Ice cream is my favorite dessert.
w3817|prone|inclined/likely|I'm prone to catching colds in winter.
w3818|prosperous|successful|Happy New Year!
w3819|neat|tidy/clean/spotless|Her clothes are always neat.
w3820|reciprocal|mutual|Respect must be mutual.
w3821|reluctant|unwilling|My son is reluctant to eat vegetables.
w3822|remote|distant/isolated|He lives in a remote village.
w3823|profitable|lucrative|It's a very profitable business.
w3824|rigorous|strict/demanding|The exam was very demanding.
w3825|sturdy|robust/solid/strong|It's a sturdy table.
w3826|flat|categorical/emphatic/resounding|His answer was a flat no.
w3827|sacred|holy|For me, family is sacred.
w3828|sarcastic||Don't be sarcastic with me.
w3829|calm|serene/peaceful|The sea is calm today.
w3830|stealthy|sneaky/quiet|The cat is very stealthy.
w3831|sober|plain/understated/restrained|He's wearing a plain suit.
w3832|sophisticated|refined/advanced|It's a very sophisticated system.
w3833|gloomy|somber/dark/dreary|The day is gray and gloomy.
w3834|brief|cursory/quick/superficial|He gave the text a quick review.
w3835|sustainable||We use sustainable energy.
w3836|subjective||It's a very subjective opinion.
w3837|sublime|exalted|The music was sublime.
w3838|concise|brief/succinct|Write a brief summary.
w3839|submissive|obedient|You don't have to be so submissive.
w3840|subtle|slight/fine|There's a subtle difference between the two.
w3841|flat|firm/categorical/blunt|He gave me a flat no.
w3842|tenacious|persistent/determined|She's a very tenacious woman.
w3843|faint|dim/soft|There was a dim light in the room.
w3844|tense|strained|The atmosphere was tense.
w3845|trivial|petty/minor|They argued over something trivial.
w3846|cloudy|murky/muddy|The river water is murky.
w3847|later|subsequent/further|We'll discuss it at a later meeting.
w3848|unanimous||The decision was unanimous.
w3849|vast|huge/immense|The desert is very vast.
w3850|fast|quick/swift/speedy|The cheetah is very fast.
w3851|plausible|believable/credible|His story seems believable.
w3852|versatile|all-round|He's a very versatile actor.
w3853|valid|current/in force|My passport is still valid.
w3854|vulnerable||Children are more vulnerable.
w3855|vulgar|rude/crude/coarse|Don't use vulgar words.
w3856|barren|waste/desolate|It's a barren, dry land.
w3857|perhaps|by any chance/maybe|Didn't you know?
w3858|on purpose|deliberately/intentionally|He did it on purpose.
w3859|in the past|long ago/formerly/in olden days|In the past, people walked more.
w3860|fully|properly/thoroughly|He fully carried out his duty.
w3861|consequently|therefore/as a result|It rained a lot and, consequently, the game was canceled.
w3862|deliberately|on purpose/intentionally|He broke the glass on purpose.
w3863|entirely|completely/totally/wholly|I completely agree with you.
w3864|strictly||Smoking is strictly prohibited here.
w3865|specially|expressly/especially|I came specially to see you.
w3866|fundamentally|basically/essentially|Basically, we agree.
w3867|inclusive|including/through|We are open Monday through Saturday.
w3868|undoubtedly|without a doubt/certainly|Without a doubt, it's the best team.
w3869|intentionally|on purpose/deliberately|I didn't do it on purpose.
w3870|invariably|always/without fail|He's invariably late.
w3871|merely|only/just/simply|It was merely a suggestion.
w3872|in parallel|at the same time/simultaneously|He studies and works at the same time.
w3873|allegedly|supposedly/reportedly|The man allegedly stole a car.
w3874|progressively|gradually|The pain gradually decreased.
w3875|reciprocally|mutually/each other|We help each other.
w3876|sincerely|honestly/frankly|Honestly, I don't like that idea.
w3877|exceedingly|greatly/enormously/extremely|I'm extremely happy about your visit.
w3878|flatly|firmly/categorically|He flatly refused.
w3879|word for word|literally/verbatim|He said it exactly like that, word for word.
w3880|subsequently|later/afterward|The topic will be discussed later.
w3881|vaguely|dimly|I remember it vaguely.
w3882|as|according to/in accordance with|As the days go by, it gets colder.
w3883|despite|in spite of|We went out despite the rain.
w3884|as a result of|following/because of|As a result of the crisis, the store closed.
w3885|around|about/regarding/centered on|The debate centered on education.
w3886|as|while|As you grow, you learn more.
w3887|provided that|as long as/so long as|I'll lend you the book as long as you take care of it.
w3888|as long as|provided that/on condition that|You can go out as long as you come back early.
w3889|therefore|hence/thus/consequently|It rained a lot and therefore we didn't go out.
w3890|so|thus/therefore|So, let's start the meeting.
w3891|so|so that/therefore|I was tired, so I went to bed.
w3892|so|so that/therefore|There was no bread, so I went to buy some.
w3893|in order to|so as to|We're saving in order to travel in the summer.
w3894|for the sake of|in the interest of|We did it for the sake of peace.
w3895|fan|hand fan/folding fan|My grandmother always carries a fan.
w3896|cliff|bluff|You can see the sea from the cliff.
w3897|tributary|branch|This river is a tributary of the Amazon.
w3898|dawn|daybreak/sunrise|We left at dawn.
w3899|sewer|drain/manhole|The rain went into the sewer.
w3900|avalanche|landslide|An avalanche blocked the road.
w3901|scaffolding|scaffold|The workers climb up the scaffolding.
w3902|hook|fishhook/bait|The fish took the bait.
w3903|archipelago||Japan is an archipelago.
w3904|clay||The children make clay figures.
w3905|stream|brook/creek|There's a stream behind the house.
w3906|splinter|chip|I got a splinter in my finger.
w3907|shortcut||Let's take a shortcut through the park.
w3908|tile|floor tile|The bathroom tiles are white.
w3909|ravine|gully/gorge|There's a deep ravine near the road.
w3910|hinge||The door hinge squeaks.
w3911|vault|dome|The church's vault is beautiful.
w3912|compass||We used a compass in the mountains.
w3913|diver||The diver saw a lot of fish.
w3914|boiler|furnace|The boiler heats the water in the house.
w3915|alley|alleyway/lane|My house is on a narrow alley.
w3916|quarry||They take stone out of the quarry.
w3917|riverbed|channel/bed|The river overflowed its banks.
w3918|bolt|latch|Lock the door with the bolt.
w3919|pond|pool/puddle|Frogs live in the pond.
w3920|lace|shoelace/cord/string|Tie your shoelaces.
w3921|twilight|dusk|We took a walk at dusk.
w3922|gorge|pass/canyon|The road goes through a gorge.
w3923|dike|dam/levee/dyke|They built a dike against floods.
w3924|reservoir|dam|The reservoir is full after the rain.
w3925|rubble|debris|They cleared the rubble after the earthquake.
w3926|lighthouse|beacon|The lighthouse lights up the sea at night.
w3927|foliage|leaves|The forest foliage is very green.
w3928|glacier||We visited a glacier in Patagonia.
w3929|hail|hailstones|It hailed this afternoon.
w3930|crack|crevice/fissure|There's a crack in the wall.
w3931|bonfire|campfire|We made a bonfire on the beach.
w3932|horizon||The sun sets on the horizon.
w3933|outdoors|open air|We slept outdoors.
w3934|mud||My shoes are covered in mud.
w3935|burrow|den/hole/lair|The rabbit went into its burrow.
w3936|spring|fountain|We drank water from the spring.
w3937|thicket|bushes/brush/scrub|The cat hid in the bushes.
w3938|pier|dock/wharf/quay|The ship is at the pier.
w3939|mist|haze/fog|It's misty this morning.
w3940|oasis||They found an oasis in the desert.
w3941|swell|waves/surf|The sea is very rough today.
w3942|swamp|marsh/bog|There are crocodiles in the swamp.
w3943|crag|rock/boulder|We climbed a crag to see the valley.
w3944|half-light|semi-darkness/dimness/gloom|The room was in semi-darkness.
w3945|meadow|prairie/grassland|The horses run across the meadow.
w3946|dam||The dam provides electricity to the city.
w3947|lightning|flash of lightning|I saw lightning in the sky.
w3948|whirlpool|eddy/whirlwind|There's a whirlpool in the river.
w3949|dew||The flowers have dew on them in the morning.
w3950|path|trail/footpath|We walked along a forest path.
w3951|torrent|rapids|The torrent came down the mountain.
w3952|gale|strong wind/windstorm|The gale knocked down several trees.
w3953|slope|hillside|There are houses on the slope of the mountain.
w3954|heritage|collection/stock/wealth|The museum holds a great cultural heritage.
w3955|adversity|hardship|He stayed strong in the face of adversity.
w3956|eagerness|zeal/desire|She studies with great eagerness.
w3957|offense|insult/grievance/wrong|He took it as a personal insult.
w3958|free will|will|He acted of his own free will.
w3959|ups and downs|highs and lows|Life has its ups and downs.
w3960|ambiguity||There's ambiguity in his words.
w3961|longing|yearning/desire/dream|Her dream is to travel the world.
w3962|peak|height/heyday/apogee|The band was at its peak.
w3963|trick|ruse/ploy/scheme|He used a trick to win.
w3964|glimmer|hint/sign/glimpse|There's a glimmer of hope.
w3965|omen|sign/portent|He saw it as a good omen.
w3966|help|aid/assistance/rescue|They called for help on the radio.
w3967|background|knowledge/baggage|He has a rich cultural background.
w3968|gap|divide|There's a gap between rich and poor.
w3969|caution|care/prudence|We must act with caution.
w3970|clamor|outcry/shouting|The clamor of the people could be heard.
w3971|task|mission/duty/assignment|He completed his task successfully.
w3972|sanity|good sense/prudence|He acted sensibly during the crisis.
w3973|cruelty||Cruelty to animals is unacceptable.
w3974|disdain|contempt/scorn|He looked at me with disdain.
w3975|slip|mistake/lapse|It was just a slip.
w3976|flash|sparkle/gleam/twinkle|I saw a flash in the sky.
w3977|course|future/evolution/development|No one knows the course of history.
w3978|joy|happiness/bliss|What a joy to see you again!
w3979|dilemma|choice/alternative|I'm facing a difficult dilemma.
w3980|onslaught|battering/pounding|The ship withstood the battering of the waves.
w3981|effort|determination/commitment|He puts a lot of effort into his studies.
w3982|crossroads|turning point|I'm at a crossroads in my life.
w3983|fortitude|strength/composure|She faced the news with fortitude.
w3984|scruple|qualm/scruples|He has no qualms about lying.
w3985|care|great care/diligence|He prepared the food with great care.
w3986|havoc|damage/devastation|The storm wreaked havoc on the town.
w3987|fervor|passion/enthusiasm|The fans sang with passion.
w3988|fragility|frailty|The fragility of the glass worries me.
w3989|feat|exploit/epic deed|It was a historic feat.
w3990|feat|achievement/exploit/accomplishment|Climbing that mountain was a feat.
w3991|milestone|landmark|It was a milestone in the country's history.
w3992|ease|comfort/room|We live comfortably.
w3993|impetus|momentum/energy|He started the project with a lot of energy.
w3994|inertia|habit|We keep doing it out of habit.
w3995|naivety|innocence|I find her innocence sweet.
w3996|interference|meddling/intervention|We don't accept outside interference.
w3997|foolishness|folly/madness/stupidity|It was foolish to go out in the storm.
w3998|jubilation|joy/delight|They received the news with joy.
w3999|burden|drag/dead weight|Debts are a burden for the family.
w4000|lucidity|clarity/clear-headedness|He spoke with great clarity.
p001|Hello|Hi|
p002|Good morning||
p003|Good afternoon||
p004|Good evening|Good night|
p005|How are you?|How's it going?|
p006|How are you? (polite)|How do you do?|
p007|Fine, thanks|I'm fine, thank you/Good, thanks|
p008|And you?|What about you?|
p009|Nice to meet you|Pleased to meet you|
p010|See you later|See you|
p011|See you tomorrow||
p012|Bye|Bye-bye|
p013|Welcome||
p014|Thank you|Thanks|
p015|Thank you very much|Thanks a lot|
p016|You're welcome|No problem|
p017|Please||
p018|Sorry|Excuse me|
p019|I'm sorry||
p020|Excuse me (to get attention)|Excuse me|
p021|No problem|That's fine|
p022|Excuse me (to pass)|Excuse me/May I?|
p023|My name is …|I'm …|
p024|What's your name?||
p025|I'm from Japan|I come from Japan|
p026|I'm Japanese||
p027|Where are you from?||
p028|I'm … years old||
p029|I speak a little Spanish||
p030|I don't speak Spanish||
p031|Do you speak English?||
p032|Pleased to meet you|Delighted/Nice to meet you|
p033|I don't understand||
p034|Could you repeat that, please?|Can you say that again?|
p035|More slowly, please|Slower, please|
p036|What does … mean?||
p037|How do you say … in Spanish?||
p038|Pardon?|Sorry?/What?|
p039|I don't know||
p040|Just a moment, please|One moment, please|
p041|Yes, of course|Sure|
p042|How much is it?|How much does it cost?|
p043|I want this|I'd like this|
p044|Do you have …?||
p045|I'm just looking||
p046|It's very expensive|It's too expensive|
p047|Can I pay by card?|Can I pay with a card?|
p048|I'll take it||
p049|Could I have a bag?|Can I get a bag?|
p050|A table for two, please||
p051|The menu, please|Could I see the menu?|
p052|I'd like …||
p053|For me, …|I'll have …|
p054|Water, please||
p055|Delicious!|How tasty!|
p056|The check, please|The bill, please|
p057|Cheers!||
p058|Enjoy your meal!|Bon appétit!|
p059|I'm full||
p060|I'm hungry||
p061|Where is the bathroom?|Where is the restroom?/Where is the toilet?|
p062|Where is …?||
p063|How do I get to …?||
p064|I want to go to …|I'd like to go to …|
p065|Is it far?||
p066|It's close|It's near|
p067|To the right|On the right|
p068|To the left|On the left|
p069|Straight ahead|Go straight|
p070|What time does the train leave?||
p071|One ticket, please||
p072|Help!||
p073|I need help||
p074|I'm lost||
p075|Call the police||
p076|I feel sick|I don't feel well|
p077|I need a doctor||
p078|I lost my passport||
p079|It's no big deal|Don't worry/It's OK|
p080|Can you help me?|Could you help me?|
`;

export const ES_EN = Object.fromEntries(
  RAW.trim().split('\n').filter(Boolean).map((line) => {
    const [id, en, alts, example] = line.split('|');
    return [id, { en, alts: alts ? alts.split('/') : [], example: example || '' }];
  }),
);
