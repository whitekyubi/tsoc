import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review-page',
  templateUrl: 'review-page.html',
})
export class ReviewPage {
	storyScript: any;
	dialogText : string;
	message : string;
	x:number = 0;
	count:number = 0 ;


  constructor(public navCtrl: NavController, public navParams: NavParams) {


  		this.message = navParams.get('message');
  		console.log(this.message);
  		this.storyScript = {
			start: [],
			middle: [],
			stage30:[],
			stage3A:[],
			stage3B:[],
			stage3C:[],
			stage3D:[],
			stage40:[],
			stage4A:[],
			stage4B:[],
			stage4C:[],
			stage50:[],
			stage5A:[],
			stage5B:[],
			final:[],
			end: []
		};
		this.storyScript.start = [
			"您好，希望你能到嘉義幫我找到一個人，我年輕時與他相遇相識，只可惜早期台灣動盪，我之後和家人搬離嘉義，從此與他斷了聯繫。希望有機會能再和他見一面啊......",
			"這張照片是我唯一一張他的照片，雖然有點模糊，希望你能從這僅有的線索找到那個人。",
			"我：嘉義嗎？看來得先出發到嘉義火車站。",
			"系統：請玩家前往嘉義火車站。"
		];
		this.storyScript.middle = [
			"我：這裡就是嘉義火車站嗎？看起來...有點老舊呢！",
			"服務處：您好，第一次來嘉義嗎？嘉義車站建於日治明治29年，曾經是集客運、貨運、糖運、材運於一身的車站，功能多元，地位重要，是嘉義的門戶呢！。",
			"服務處：這裡有一張嘉義地圖，嘉義有很多好玩的地方，希望能幫助到您。",
			"我：謝謝你的講解。",
			"我：目前也沒有別的線索，一邊參觀嘉義一邊蒐集線索吧！",
			"系統：請玩家任意前往地圖上的一個景點。",
			
		];
		this.storyScript.stage3A = [
			"(一抵達檜意森活村，一個小孩突然出現，搶走了我手上的照片)",
			"我：喂！喂！不要跑，那是我唯一的線索啊...",
			"我：奇怪怎麼一轉眼就不見了，那個小孩跑哪去了？",
			"我：這個是那小孩掉的鑰匙嗎？上面有寫字，說不定解開了會知道那個小孩住哪。"
		];

		this.storyScript.stage3B = [
			"我：原來那小孩住T21A啊！我得快點去T21A找他。",
			"系統：請玩家前往園區T21的位置，並輸入門牌地址。"];
		this.storyScript.stage3C = [
			"我：找到你了！你為什麼要搶走照片！",
			"小孩：因為照片上的人看起來很眼熟，我想看清楚一點就拿走了。",
			"我：你認識照片上的人？",
			"小孩：不認識...可是照片上的球衣我認得......那是我曾爺爺進藤教練之前在台灣帶的棒球隊的衣服！",
			"我：咦？哪一支棒球隊？",
			"小孩：嘉義農林呀！不過其實我也不太清楚，照片還你，你可以去所長官舍問問看所長，他應該會比我清楚。",
			"我：好，那我去問問看所長。",
			"系統：請玩家前往所長官舍的位置，並輸入門牌地址。"];
		this.storyScript.stage3D = [
			"我：請問所長在嗎？",
			"所長：有什麼事情嗎？",
			"我：請問你認不認識照片上的人？",
			"所長：這照片可真模糊啊...不過仔細一看還是挺眼熟的。",
			"我：真的嗎？你認識照片上的人？",
			"所長：是啊，這個人你到一個地方，就能經常見到他的身影呢！",
			"我：什麼地方？",
			"所長：嘉義幾條重要道路的交會點。",
			"我：交會點？",
			"所長：沒錯，剩下的線索你再去其他地方找找吧！"];
		this.storyScript.stage4A = [
			"小女孩：嗚嗚嗚...",
			"我：小妹妹，你怎麼了？",
			"小女孩：我迷路了，可不可以幫我找我的媽媽，媽媽有說要帶我去圖片裡的地方玩，拜託。"];
		this.storyScript.stage4B = [
			"女孩母親：啊！很感謝你帶她來這裡。",
			"我：不會，這是應該的。話說...這棟建築物是什麼啊？",
			"女孩母親：這是射日塔。",
			"女孩母親：相傳在太古之時，天空中有兩個太陽輪流出現，因此天氣非常酷熱，於是有勇士自告奮勇要將這太陽射下來。因為到太陽的路非常遙遠，所以他出發時背著一位嬰孩，勇士死去後長大的小孩繼承當初的使命繼續前進，之後終於成功射下太陽，完成任務。",
			"我：聽起來和后羿的故事蠻像的。",
			"女孩母親：早期流傳不少類似的故事，像射日塔和后羿都是其中一種，除此之外也還有很多類似的故事呢！",
			"小女孩：媽媽~媽媽~我們快點上去射日塔上面啦！",
			"我：啊！等等，請問你認不認識照片上的人呢？",
			"女孩母親：阿....這照片有點模糊了，我也不太清楚。看起來像是日治時期的照片...",
			"女孩母親：我這裡也有張日治時期的照片，或許你去公園裡的史蹟資料館會有線索吧。",
			"我：謝謝你，再見。",
			"小女孩：掰掰～",
			"女孩母親：再見～",
			"我：只靠一張照片找人果然有點難啊...",
			"路人甲：聽說這公園放了不少陳澄波畫架，你可知道是為什麼嗎？",
			"路人乙：這還不簡單！一定是因為要紀念陳澄波阿，他的作品《淡水夕照》在拍賣場上可是以約新台幣2.2億成交。",
			"路人甲：你只知其一不知其二，的確陳澄波是台灣嘉義知名畫家，但是還曾經發生過......",
			"我：發生過什麼....？我也去找看看陳澄波畫架好了！"];
		this.storyScript.stage4C = [
			"路人丙：好難得看到年輕人駐足在畫作前，你在找東西嗎？",
			"我：剛剛聽到路人講了關於陳澄波發生過一些事，不過沒聽請處，想說來看看畫作會不會了解些什麼。",
			"路人丙：陳澄波發生的事嗎...那八成是在說二二八事件吧。",
			"路人丙：1947年二二八事件爆發後，嘉義市區發生嚴重的警民衝突。",
			"路人丙：地方仕紳希望平息事端推派陳澄波等數位嘉義市參議員擔任「和平使」前往協商，怎知一行人遭到拘禁並受到嚴刑拷打，被逼迫承認煽動暴動。",
			"路人丙：根據其陳澄波的子女口述歷史紀錄，正好在嘉義噴水池附近見到父親被押在軍車上，像犯人一樣手被反綁羞辱式的遊街至火車站前執行槍決。",
			"我：啊？原來還發生過這樣的事情啊...",
			"我：真可惜，這們厲害的一個畫家就這樣...",
			"路人丙：可不是嗎...嘉義因此還蓋了個二二八紀念公園，就在附近，有空可以去那裡玩玩呀！",
			"我：摁。想再請教你一個問題，你認不認識照片上的人呢？",
			"路人丙：阿阿...這人的確有點眼熟，好像在哪裡看過呢...",
			"我：你真的看過這個人嗎？",
			"路人丙：啊啊，我想起來了",
			"路人丙：看在我們如此有緣的份上，我這裡有幅陳澄波的畫作，就送給你吧！你照片裡的那個人，說不定在畫作裡的地點能找到答案呢！img6",
			"路人丙：就這樣，再會啦！"];
		this.storyScript.stage5A = [
			"我：地圖上的北門車站，應該就是指這裡了嗎？",
			"站長：請問要搭火車往阿里山嗎？那你來錯地方囉！",
			"我：不是，我是來打聽一個人的消息的。",
			"我：請問你認識照片中的人嗎？",
			"車長：這照片有點模糊了吧？",
			"我：果然不知道嗎....",
			"車長：不過我到是認得。",
			"我：疑？",
			"車長：如果你能答得出我的問題，我到是可以給你一點關於這個人的提示。"];
		this.storyScript.stage5B = [
			"Puzzle5",
			"車長：沒錯，北門車站最早是用來運輸阿里山上的森林資源，附近設有包括營林所、貯木池、製材場之類與伐木有關的設施，以及負責車輛維修調度的北門修理工廠。",
			"車長：在森林資源開採停止之後，用途漸漸被轉為觀光客運方面。",
			"車長：原本的舊站，也就是這裡則經整修後作為嘉義林業歷史展覽館使用，並被指定為市定古蹟。",
			"我：哇！原來這裡跟嘉義車站一樣，從日治時期就有了呢！",
			"車長：沒錯！既然你答對我的問題了，關於照片上的人，我想你去「桃仔尾」這個地方，應該會找到答案。",
			"我：桃...仔尾？",
			"車長：我就說到這了，年輕人自己多探索會有趣許多呀！"];
		this.storyScript.final = [
			"我：重要道路的交會點、桃仔尾還有陳澄波的這張畫...",
			"我：難道指的是...",
			"系統：請點選神秘男子的所在地",
			"我：中央七彩噴水池位於文化路、中山路、光明路、光華路四條道路之交叉點。",
			"我：而且在臺灣清治時期曾是嘉義城牆的一部分，被市民稱為「桃仔尾」。",
			"我：另外陳澄波的這張畫，畫得正是「中央噴水池」！",
			"我：我得趕快前往中央七彩噴水池尋找關於答案了！",
			"系統：請玩家前往中央噴水池。"];
		this.storyScript.end = [
			"我：難道...他們指的就是中央噴水池中間的這座雕像。",
			"我：這雕像是....？",
			"攤販：小夥子，你也是KANO粉絲呀？今天有好幾個KANO粉絲來朝聖這座雕像啦！",
			"我：啊？KANO",
			"攤販：你不知道嗎？KANO嘉農呀！",
			"攤販：當初嘉農棒球隊可是代表台灣前進甲子園，第一次進甲子園就拿了亞軍回來。真是嘉義之光、台灣之光啊！因此還獲得「天下嘉農」的美稱！",
			"我：嘉農嗎？那雕像上的人是...？",
			"攤販：那可是嘉農的王牌投手吳明捷呀！雕像上的那個動作，是吳明捷獨一無二的高壓式投法，就像老鷹張開翅膀一樣。",
			"攤放：在1931年那場夏季甲子園大會，吳明捷獲得了最有價值球員的獎項。",
			"我：等等...1931年？那不是日治時期嗎？",
			"攤販：是啊！都是好久以前的故事啦！吳明捷也早已去世多年了。",
			"我：已經去世了？那.......那封委託信的主人...若是跟吳明捷同年代的人話，應該也已經離世了啊？",
			"我：這....是惡作劇嗎？"];

	this.count = 0;
	if(this.message == "stage1")
  	{
  	this.dialogText = this.storyScript.start[0];
  	}
  	if(this.message == "stage2")
  	{
  	this.dialogText = this.storyScript.middle[this.count];
  	}
  	if(this.message == "stage3A")
  	{
  	this.dialogText = this.storyScript.stage3A[this.count];
  	}
  	if(this.message == "stage3B")
  	{
  	this.dialogText = this.storyScript.stage3B[this.count];
  	}
  	if(this.message == "stage3C")
  	{
  	this.dialogText = this.storyScript.stage3C[this.count];
  	}
  	if(this.message == "stage3D")
  	{
  	this.dialogText = this.storyScript.stage3D[this.count];
  	}
  	if(this.message == "stage4A")
  	{
  	this.dialogText = this.storyScript.stage4A[this.count];
  	}
  	if(this.message == "stage4B")
  	{
  	this.dialogText = this.storyScript.stage4B[this.count];
  	}
  	if(this.message == "stage4C")
  	{
  	this.dialogText = this.storyScript.stage4C[this.count];
  	}
  	if(this.message == "stage5A")
  	{
  	this.dialogText = this.storyScript.stage5A[this.count];
  	}
  	if(this.message == "stage5B")
  	{
  	this.dialogText = this.storyScript.stage5B[this.count];
  	}
  	if(this.message == "stage6")
  	{
  	this.dialogText = this.storyScript.final[this.count];
  	}
  	if(this.message == "stage7")
  	{
  	this.dialogText = this.storyScript.end[this.count];
  	}


  }

  ionViewDidLoad() {
  	if(this.message == "stage1")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="https://cambridgewriting.files.wordpress.com/2011/04/letter.jpg">`;
		
	}
	if(this.message == "stage2")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://fun.chiayi.gov.tw/cy2012/images/396/images/%E5%98%89%E7%BE%A9%E7%81%AB%E8%BB%8A%E7%AB%991.JPG">`;
		
	}
	if(this.message == "stage3A")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="https://chiayi.itour.org.tw/media/poi_img/C1_376600000A_000060/f8c6656f-9c21-4921-ab56-2da841d3158e_large.jpg">`;
	}
	if(this.message == "stage3C")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://140.123.175.96:8080/tsoc/img/img0.jpg">`;
	}
	if(this.message == "stage3D")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://140.123.175.96:8080/tsoc/img/img0.jpg">`;
	}
	if(this.message == "stage4A")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://140.123.175.96:8080/tsoc/img/1476.jpg">`;
	}
	if(this.message == "stage4B")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="https://chiayi.itour.org.tw/media/poi_img/C1_376600000A_000018/309e055c-f65c-4ae8-8a7a-0c8d023891a9_large.jpg">`;
	}
	if(this.message == "stage4C")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://140.123.175.96:8080/tsoc/img/img5.jpg">`;
	}
	if(this.message == "stage5A")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="https://chiayi.itour.org.tw/media/poi_img/C1_376600000A_000042/6b4a385f-e5ad-420b-81f8-79fe2173d1b7_large.jpg">`;
	}
	if(this.message == "stage5B")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://140.123.175.96:8080/tsoc/img/img0.jpg">`;
	}
	if(this.message == "stage6")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://140.123.175.96:8080/tsoc/img/img0.jpg">`;
	}
	if(this.message == "stage7")
  	{
		document.querySelector(".gameWindow").innerHTML = `
		<img src="">`;
	}

	}
  nextDialogText()
  {
  	if(this.message == "stage1")
  	{
  	this.count++;
  	this.dialogText = this.storyScript.start[this.count];
  	if(this.count == 1 )
		{
		document.querySelector(".gameWindow").innerHTML =`
		<img src = "http://140.123.175.96:8080/tsoc/img/img0.jpg">`;
		}
  	
  	}
  	if(this.message == "stage2")
  	{
  	this.count++;
  	this.dialogText = this.storyScript.middle[this.count];
  		if(this.count == 2)
  		{
  		document.querySelector(".gameWindow").innerHTML =`
		<img src = "http://140.123.175.96:8080/tsoc/img/img1.png">`;
  		
  		}
  	}
  	if(this.message == "stage3A")
  	{this.count++;
  	this.dialogText = this.storyScript.stage3A[this.count];
  	
  	}
  	if(this.message == "stage3B")
  	{this.count++;
  	this.dialogText = this.storyScript.stage3B[this.count];
  	
  	}
  	if(this.message == "stage3C")
  	{this.count++;
  	this.dialogText = this.storyScript.stage3C[this.count];
  	
  	}
  	if(this.message == "stage3D")
  	{this.count++;
  	this.dialogText = this.storyScript.stage3D[this.count];
  	if(this.count == 7 )
		{
		document.querySelector(".gameWindow").innerHTML =`
		<img src = "http://140.123.175.96:8080/tsoc/img/img1.png">`;
		}
  	
  	}
  	if(this.message == "stage4A")
  	{this.count++;
  	this.dialogText = this.storyScript.stage4A[this.count];
  	if(this.count == 2 )
		{
		document.querySelector(".gameWindow").innerHTML =`
		<img src = "http://iphoto.ipeen.com.tw/photo/comment/201011/cgmc7ef61d6f9a8d9faf66bef25830dc834763.jpg">`;
		}
  	
  	
  	}
  	if(this.message == "stage4B")
  	{this.count++;
  	this.dialogText = this.storyScript.stage4B[this.count];
  	  if(this.count == 7 )
		{
		document.querySelector(".gameWindow").innerHTML =`
		<img src = "http://140.123.175.96:8080/tsoc/img/img.png">`;
		}
	  if(this.count == 9 )
		{
		document.querySelector(".gameWindow").innerHTML =`
		<img src = "http://140.123.175.96:8080/tsoc/img/img5.jpg">`;
		}

  	
  	}
  	if(this.message == "stage4C")
  	{this.count++;
  	this.dialogText = this.storyScript.stage4C[this.count];
  	if(this.count == 9 )
		{
		document.querySelector(".gameWindow").innerHTML =`
		<img src = "http://140.123.175.96:8080/tsoc/img/img.png">`;
		}
	if(this.count == 13 )
		{
		document.querySelector(".gameWindow").innerHTML =`
		<img src = "http://140.123.175.96:8080/tsoc/img/img6.jpg">`;
		}
  	
  	}
  	if(this.message == "stage5A")
  	{this.count++;
  	this.dialogText = this.storyScript.stage5A[this.count];
  	  	if(this.count == 3 )
		{
		document.querySelector(".gameWindow").innerHTML =`
		<img src = "http://140.123.175.96:8080/tsoc/img/img.png">`;
		}
  	}
  	if(this.message == "stage5B")
  	{this.count++;
  	this.dialogText = this.storyScript.stage5B[this.count];
  	
  	}
  	if(this.message == "stage6")
  	{this.count++;
  	this.dialogText = this.storyScript.final[this.count];
  	
  	}
  	if(this.message == "stage7")
  	{this.count++;
  	this.dialogText = this.storyScript.end[this.count];
  	
  	}
  	

  }


  

}
