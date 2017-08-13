import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage'; //儲存登入紀錄
import { LocationTracker } from '../../providers/location-tracker';
import { Http, Headers } from '@angular/http';		//要get和post要import這行
import 'rxjs/add/operator/map';

///
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

/**
 * Generated class for the Game page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-game',
	templateUrl: 'game.html',
})
export class GamePage {
	//定位
	public watch: any;
	public lat: number = 0;
	public lng: number = 0;
	EARTH_RADIUS = 6378137.0;    //单位M
	PI = Math.PI;
	place;
	end;
	//
	public user: any = [];
	public string: string;
	countScript: any;
	storyScript: any;
	nowScript: any = [];
	dialogText: string;
	progress: string;
	progressEnum = {
		start: '1',
		middle: '2',
		stageA: ['3', '3-1', '3-2', '3-3', '3-4'],
		stageB: ['4', '4-1', '4-2', '4-3', '4-4'],
		stageC: ['5', '5-1', '5-2'],
		final: '6',
		end: '7'
	};

	gamelat = [23.48667, 23.48133, 23.48293333430657, 23.48391805163077, 23.48163149596133, 23.4805181204497, 23.48019397738388, 23.48393893130969, 23.487297];//檜意森活村,嘉義公園1,嘉義公園2,嘉義公園3,嘉義公園4,嘉義公園5,北門驛
	gamelng = [120.4541, 120.4688, 120.4636054252927, 120.4634096084258, 120.466573922442, 120.4668337706267, 120.4686608826058, 120.4678115890025, 120.454646];
	run = 0;
	gameplace = [
		"",
		"",
		"火車站商圈",
		"檜意森活村",
		"嘉義公園",
		"北門驛",
		"",
		"中央噴水池",
		"射日塔"
	];

	gameAns = [
		"T21A",
		"共和路191巷5號",
		"北門街2號",
		"",
		"自畫像、兒童樂園、嘉義公園（一）、嘉義公園（二）、嘉義公園（三）、嘉義公園（四）、嘉義公園一景、嘉義公園一隅、睡蓮",
		"林運"
	];

	gameQue = [
		"請解開謎題",
		"請玩家前往園區T21的位置，並輸入門牌地址。",
		"請玩家前往所長官舍的位置，並輸入門牌地址。",
		"請玩家尋找照片中的地點。",
		"請玩家尋找公園中的任一一幅陳澄波畫架，並輸入畫作名稱。"
	];

	gameimg = [
		"http://140.123.175.96:8080/tsoc/img/img0.jpg",//[配一張吳明捷的照片]
		"http://140.123.175.96:8080/tsoc/img/img1.png",//[配一張嘉義地圖]
		"[配一張鑰匙和謎題的圖片]",
		"http://iphoto.ipeen.com.tw/photo/comment/201011/cgmc7ef61d6f9a8d9faf66bef25830dc834763.jpg",//(射日塔的局部圖片)
		"https://chiayi.itour.org.tw/media/poi_img/C1_376600000A_000018/309e055c-f65c-4ae8-8a7a-0c8d023891a9_large.jpg",//(射日塔的圖片)
		"http://140.123.175.96:8080/tsoc/img/img5.jpg",//[配日治時期噴水池照片]
		"http://140.123.175.96:8080/tsoc/img/img6.jpg"//[配上中央噴水池的圖片]
	];


	constructor(public actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController, public alertCtrl: AlertController, public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation, public navCtrl: NavController, public http: Http, public navParams: NavParams, public storage: Storage) {
		this.storyScript = {
			start: [],
			middle: [],
			stageA: [],
			stageB: [],
			stageC: [],
			final: [],
			end: []
		};
		this.storyScript.start = [
			"您好，希望你能到嘉義幫我找到一個人，我年輕時與他相遇相識，只可惜早期台灣動盪，我之後和家人搬離嘉義，從此與他斷了聯繫。希望有機會能再和他見一面啊......",
			"這張照片是我唯一一張他的照片，雖然有點模糊，希望你能從這僅有的線索找到那個人。img0",
			"我：嘉義嗎？看來得先出發到嘉義火車站。",
			"系統：請玩家前往嘉義火車站。"
		];
		this.storyScript.middle = [
			"我：這裡就是嘉義火車站嗎？看起來...有點老舊呢！",
			"服務處：您好，第一次來嘉義嗎？嘉義車站建於日治明治29年，曾經是集客運、貨運、糖運、材運於一身的車站，功能多元，地位重要，是嘉義的門戶呢！。",
			"服務處：這裡有一張嘉義地圖，嘉義有很多好玩的地方，希望能幫助到您。img1",
			"我：謝謝你的講解。",
			"我：目前也沒有別的線索，一邊參觀嘉義一邊蒐集線索吧！",
			"系統：請玩家任意前往地圖上的一個景點。",
			""
		];
		this.storyScript.stageA = [
			"(一抵達檜意森活村，一個小孩突然出現，搶走了我手上的照片)img0",
			"我：喂！喂！不要跑，那是我唯一的線索啊...",
			"我：奇怪怎麼一轉眼就不見了，那個小孩跑哪去了？",
			"我：這個是那小孩掉的鑰匙嗎？上面有寫字，說不定解開了會知道那個小孩住哪。img2",
			"Puzzle0",
			"我：原來那小孩住T21A啊！我得快點去T21A找他。",
			"系統：請玩家前往園區T21的位置，並輸入門牌地址。",
			"Puzzle1",
			"我：找到你了！你為什麼要搶走照片！img0",
			"小孩：因為照片上的人看起來很眼熟，我想看清楚一點就拿走了。",
			"我：你認識照片上的人？",
			"小孩：不認識...可是照片上的球衣我認得......那是我曾爺爺進藤教練之前在台灣帶的棒球隊的衣服！",
			"我：咦？哪一支棒球隊？",
			"小孩：嘉義農林呀！不過其實我也不太清楚，照片還你，你可以去所長官舍問問看所長，他應該會比我清楚。",
			"我：好，那我去問問看所長。",
			"系統：請玩家前往所長官舍的位置，並輸入門牌地址。",
			"Puzzle2",
			"我：請問所長在嗎？",
			"所長：有什麼事情嗎？",
			"我：請問你認不認識照片上的人？",
			"所長：這照片可真模糊啊...不過仔細一看還是挺眼熟的。",
			"我：真的嗎？你認識照片上的人？",
			"所長：是啊，這個人你到一個地方，就能經常見到他的身影呢！",
			"我：什麼地方？",
			"所長：嘉義幾條重要道路的交會點。",
			"我：交會點？",
			"所長：沒錯，剩下的線索你再去其他地方找找吧！",
			""
		];
		this.storyScript.stageB = [
			"小女孩：嗚嗚嗚...",
			"我：小妹妹，你怎麼了？",
			"小女孩：我迷路了，可不可以幫我找我的媽媽，媽媽有說要帶我去圖片裡的地方玩，拜託。img3",
			"Puzzle3",
			"女孩母親：啊！很感謝你帶她來這裡。img4",
			"我：不會，這是應該的。話說...這棟建築物是什麼啊？",
			"女孩母親：這是射日塔。",
			"女孩母親：相傳在太古之時，天空中有兩個太陽輪流出現，因此天氣非常酷熱，於是有勇士自告奮勇要將這太陽射下來。因為到太陽的路非常遙遠，所以他出發時背著一位嬰孩，勇士死去後長大的小孩繼承當初的使命繼續前進，之後終於成功射下太陽，完成任務。",
			"我：聽起來和后羿的故事蠻像的。",
			"女孩母親：早期流傳不少類似的故事，像射日塔和后羿都是其中一種，除此之外也還有很多類似的故事呢！",
			"小女孩：媽媽~媽媽~我們快點上去射日塔上面啦！",
			"我：啊！等等，請問你認不認識照片上的人呢？img0",
			"女孩母親：阿....這照片有點模糊了，我也不太清楚。看起來像是日治時期的照片...",
			"女孩母親：我這裡也有張日治時期的照片，或許你去公園裡的史蹟資料館會有線索吧。img5",
			"我：謝謝你，再見。",
			"小女孩：掰掰～",
			"女孩母親：再見～",
			"我：只靠一張照片找人果然有點難啊...",
			"路人甲：聽說這公園放了不少陳澄波畫架，你可知道是為什麼嗎？",
			"路人乙：這還不簡單！一定是因為要紀念陳澄波阿，他的作品《淡水夕照》在拍賣場上可是以約新台幣2.2億成交。",
			"路人甲：你只知其一不知其二，的確陳澄波是台灣嘉義知名畫家，但是還曾經發生過......",
			"我：發生過什麼....？我也去找看看陳澄波畫架好了！",
			"Puzzle4",
			"路人丙：好難得看到年輕人駐足在畫作前，你在找東西嗎？",
			"我：剛剛聽到路人講了關於陳澄波發生過一些事，不過沒聽請處，想說來看看畫作會不會了解些什麼。",
			"路人丙：陳澄波發生的事嗎...那八成是在說二二八事件吧。",
			"路人丙：1947年二二八事件爆發後，嘉義市區發生嚴重的警民衝突。",
			"路人丙：地方仕紳希望平息事端推派陳澄波等數位嘉義市參議員擔任「和平使」前往協商，怎知一行人遭到拘禁並受到嚴刑拷打，被逼迫承認煽動暴動。",
			"路人丙：根據其陳澄波的子女口述歷史紀錄，正好在嘉義噴水池附近見到父親被押在軍車上，像犯人一樣手被反綁羞辱式的遊街至火車站前執行槍決。",
			"我：啊？原來還發生過這樣的事情啊...",
			"我：真可惜，這們厲害的一個畫家就這樣...",
			"路人丙：可不是嗎...嘉義因此還蓋了個二二八紀念公園，就在附近，有空可以去那裡玩玩呀！",
			"我：摁。想再請教你一個問題，你認不認識照片上的人呢？img0",
			"路人丙：阿阿...這人的確有點眼熟，好像在哪裡看過呢...",
			"我：你真的看過這個人嗎？",
			"路人丙：啊啊，我想起來了",
			"路人丙：看在我們如此有緣的份上，我這裡有幅陳澄波的畫作，就送給你吧！你照片裡的那個人，說不定在畫作裡的地點能找到答案呢！img6",
			"路人丙：就這樣，再會啦！",
			""
		];
		this.storyScript.stageC = [
			"我：地圖上的北門車站，應該就是指這裡了嗎？",
			"站長：請問要搭火車往阿里山嗎？那你來錯地方囉！",
			"我：不是，我是來打聽一個人的消息的。",
			"我：請問你認識照片中的人嗎？img0",
			"車長：這照片有點模糊了吧？",
			"我：果然不知道嗎....",
			"車長：不過我到是認得。",
			"我：疑？",
			"車長：如果你能答得出我的問題，我到是可以給你一點關於這個人的提示。",
			"Puzzle5",
			"車長：沒錯，北門車站最早是用來運輸阿里山上的森林資源，附近設有包括營林所、貯木池、製材場之類與伐木有關的設施，以及負責車輛維修調度的北門修理工廠。",
			"車長：在森林資源開採停止之後，用途漸漸被轉為觀光客運方面。",
			"車長：原本的舊站，也就是這裡則經整修後作為嘉義林業歷史展覽館使用，並被指定為市定古蹟。",
			"我：哇！原來這裡跟嘉義車站一樣，從日治時期就有了呢！",
			"車長：沒錯！既然你答對我的問題了，關於照片上的人，我想你去「桃仔尾」這個地方，應該會找到答案。",
			"我：桃...仔尾？",
			"車長：我就說到這了，年輕人自己多探索會有趣許多呀！",
			""
		];
		this.storyScript.final = [
			"我：重要道路的交會點、桃仔尾還有陳澄波的這張畫...",
			"我：難道指的是...",
			"系統：請點選神秘男子的所在地img1",
			"我：中央七彩噴水池位於文化路、中山路、光明路、光華路四條道路之交叉點。",
			"我：而且在臺灣清治時期曾是嘉義城牆的一部分，被市民稱為「桃仔尾」。",
			"我：另外陳澄波的這張畫，畫得正是「中央噴水池」！",
			"我：我得趕快前往中央七彩噴水池尋找關於答案了！",
			"系統：請玩家前往中央噴水池。",
		];
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
			"我：這....是惡作劇嗎？"
		];

	}

	ionViewDidLoad() {
		this.storage.get('user').then((val) => {
			this.user = val;
			let data = '{"uid": "' + this.user.uid + '"}';
			this.http.post("http://140.123.175.96:8080/tsoc/history.php", data)
				.map(res => res.json())
				.subscribe(data => {
					this.run = data.run;
					this.progress = data.history;
					if (this.run == 2) {
						this.loadplace();
					} else if (this.progress == "") {
						this.progress = this.progressEnum.start;
						this.setProgress(this.progressEnum.start);
						this.loadStart();
					} else if (data.run == 3) {
						switch (this.progress) {
							case '3-2':
								this.nowScript = this.storyScript.stageA;
								this.countScript = 5;
								this.string = this.nowScript[this.countScript].slice(-4, );
								this.dialogText = this.nowScript[this.countScript++].slice(0, -4);
								document.querySelector(".gameWindow").innerHTML = `
									<img src="`+ this.gameimg[this.string.slice(3, )] + `">`;
								break;
							case '3-3':
								this.nowScript = this.storyScript.stageA;
								this.countScript = 8;
								this.string = this.nowScript[this.countScript].slice(-4, );
								this.dialogText = this.nowScript[this.countScript++].slice(0, -4);
								document.querySelector(".gameWindow").innerHTML = `
									<img src="`+ this.gameimg[this.string.slice(3, )] + `">`;
								break;
							case '3-4':
								this.nowScript = this.storyScript.stageA;
								this.countScript = 17;
								this.dialogText = this.nowScript[this.countScript++];
								break;
							case '4-2':
								this.nowScript = this.storyScript.stageB;
								this.countScript = 4;
								this.string = this.nowScript[this.countScript].slice(-4, );
								this.dialogText = this.nowScript[this.countScript++].slice(0, -4);
								document.querySelector(".gameWindow").innerHTML = `
									<img src="`+ this.gameimg[this.string.slice(3, )] + `">`;
								break;
							case '4-3':
								this.nowScript = this.storyScript.stageB;
								this.countScript = 23;
								this.dialogText = this.nowScript[this.countScript++];
								break;
							case '5-2':
								this.nowScript = this.storyScript.stageC;
								this.countScript = 10;
								this.dialogText = this.nowScript[this.countScript++];
								break;
							default:
								this.dialogText = "請前往" + this.gameplace[this.progress];
								this.tracker(this.progress);
						}
					} else {
						switch (this.progress) {
							case '1':
								this.loadStart();
								break;
							case '2':
								this.loadMiddle();
								break;
							case '3':
								this.loadstageA();
								break;
							case '3-1':
								this.nowScript = this.storyScript.stageA;
								this.countScript = 3;
								this.string = this.nowScript[this.countScript].slice(-4, );
								this.dialogText = this.nowScript[this.countScript++].slice(0, -4);
								document.querySelector(".gameWindow").innerHTML = `
									<img src="`+ this.gameimg[this.string.slice(3, )] + `">`;
								break;
							case '3-2':
								this.nowScript = this.storyScript.stageA;
								this.countScript = 6;
								this.dialogText = this.nowScript[this.countScript++];
								break;
							case '3-3':
								this.nowScript = this.storyScript.stageA;
								this.countScript = 15;
								this.dialogText = this.nowScript[this.countScript++];
								break;
							case '4':
								this.loadstageB();
								break;
							case '4-1':
								this.nowScript = this.storyScript.stageB;
								this.countScript = 2;
								this.string = this.nowScript[this.countScript].slice(-4, );
								this.dialogText = this.nowScript[this.countScript++].slice(0, -4);
								document.querySelector(".gameWindow").innerHTML = `
									<img src="`+ this.gameimg[this.string.slice(3, )] + `">`;
								break;
							case '4-2':
								this.nowScript = this.storyScript.stageB;
								this.countScript = 21;
								this.dialogText = this.nowScript[this.countScript++];
								break;
							case '5':
								this.loadstageC();
								break;
							case '5-1':
								this.nowScript = this.storyScript.stageC;
								this.countScript = 8;
								this.dialogText = this.nowScript[this.countScript++];
								break;
							case '6':
								this.nowScript = this.storyScript.final;
								this.countScript = 0;
								this.dialogText = this.nowScript[this.countScript++];
								break;
							case '7':
								this.nowScript = this.storyScript.end;
								this.countScript = 0;
								this.dialogText = this.nowScript[this.countScript++];
								break;
							default:
								console.log(this.progress);
						}
					}

				}, error => {
					console.log(error);
				});
		});
	}

	//開始關卡
	setProgress(progress) {
		let data = '{"progress": "' + progress + '","uid": "' + this.user.uid + '"}';
		// console.log(data);
		this.http.post("http://140.123.175.96:8080/tsoc/setProgress.php", data)
			.subscribe(data => {
			}, error => {
				console.log(error);
			});
	}

	//移動位置
	nextplace(progress) {
		let data = '{"progress": "' + progress + '","uid": "' + this.user.uid + '"}';
		this.http.post("http://140.123.175.96:8080/tsoc/nextplace.php", data)
			.subscribe(data => {
			}, error => {
				console.log(error);
			});
		this.progress = progress;
	}

	//完成關卡
	endProgress(progress) {
		let data = '{"progress": "' + progress + '","uid": "' + this.user.uid + '"}';
		// console.log(data);
		this.http.post("http://140.123.175.96:8080/tsoc/endProgress.php", data)
			.subscribe(data => {
			}, error => {
				console.log(error);
			});
	}

	loadplace() {
		let newgamelat = [];
		let newgamelng = [];
		this.dialogText = "我：接下來要去哪裡呢？";
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://140.123.175.96:8080/tsoc/img/img1.png">`;
		let data = '{"uid": "' + this.user.uid + '"}';
		this.http.post("http://140.123.175.96:8080/tsoc/history1.php", data)
			.map(res => res.json())
			.subscribe(data => {
				let stage = data.history;
				if (stage == "") {
					this.progress = '6';
					this.setProgress(this.progress);
					this.loadfinal();
				} else {
					for (var key in stage) {
						if (stage[key] == 3) {
							newgamelat.push(this.gamelat[0]);
							newgamelng.push(this.gamelng[0]);
						} else if (stage[key] == 4) {
							for (let i = 1; i < 8; i++) {
								newgamelat.push(this.gamelat[i]);
								newgamelng.push(this.gamelng[i]);
							}
						} else if (stage[key] == 5) {
							newgamelat.push(this.gamelat[8]);
							newgamelng.push(this.gamelng[8]);
						}
					}
					this.startTracking(newgamelat, newgamelng);
				}
			}, error => {
				console.log(error);
			});

	}

	//老奶奶委託
	loadStart() {
		this.nowScript = this.storyScript.start;
		this.countScript = 0;
		this.dialogText = this.nowScript[this.countScript++];
		document.querySelector(".gameWindow").innerHTML = `
		<img src="https://cambridgewriting.files.wordpress.com/2011/04/letter.jpg">`;
	}

	//嘉義火車站
	loadMiddle() {
		this.nowScript = this.storyScript.middle;
		this.countScript = 0;
		this.dialogText = this.nowScript[this.countScript++];
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://fun.chiayi.gov.tw/cy2012/images/396/images/%E5%98%89%E7%BE%A9%E7%81%AB%E8%BB%8A%E7%AB%991.JPG">`;
	}

	//檜意森活村
	loadstageA() {
		this.nowScript = this.storyScript.stageA;
		this.countScript = 0;
		this.string = this.nowScript[this.countScript].slice(-4, );
		this.dialogText = this.nowScript[this.countScript++].slice(0, -4);
		document.querySelector(".gameWindow").innerHTML = `
		<img src="https://chiayi.itour.org.tw/media/poi_img/C1_376600000A_000060/f8c6656f-9c21-4921-ab56-2da841d3158e_large.jpg">`;
		let data = '{"img": "' + this.string + '","uid": "' + this.user.uid + '"}';
		this.http.post("http://140.123.175.96:8080/tsoc/deletimg.php", data)
			.subscribe(data => {
			}, error => {
				console.log(error);
			});
	}

	//嘉義公園
	loadstageB() {
		this.nowScript = this.storyScript.stageB;
		this.countScript = 0;
		this.dialogText = this.nowScript[this.countScript++];
		document.querySelector(".gameWindow").innerHTML = `
		<img src="http://140.123.175.96:8080/tsoc/img/1476.jpg">`;
	}

	//北門車站
	loadstageC() {
		this.nowScript = this.storyScript.stageC;
		this.countScript = 0;
		this.dialogText = this.nowScript[this.countScript++];

		let data = '{"place": "' + this.gameplace[5] + '"}';
		console.log(data);
		this.http.post("http://140.123.175.96:8080/tsoc/spotapi.php", data)
			.map(res => res.json())
			.subscribe(data => {
				let location = data.scenery_list[0].location;
				let img = "https://chiayi.itour.org.tw/media/" + data.scenery_list[0].image[0].file_path + "_large.jpg";
				document.querySelector(".gameWindow").innerHTML = `
						<img src="`+ img + `">`;
						console.log(img);

			}, error => {
				console.log(error);
			});

	}

	loadfinal() {
		this.nowScript = this.storyScript.final;
		this.countScript = 0;
		this.dialogText = this.nowScript[this.countScript++];
	}
	loadEnd() {
		this.nowScript = this.storyScript.end;
		this.countScript = 0;
		this.dialogText = this.nowScript[this.countScript++];
	}

	//關卡間地點
	tracker(place) {

		let data = '{"place": "' + this.gameplace[place] + '"}';
		console.log(data);
		this.http.post("http://140.123.175.96:8080/tsoc/spotapi.php", data)
			.map(res => res.json())
			.subscribe(data => {
				let location = data.scenery_list[0].location;
				let img = "https://chiayi.itour.org.tw/media/" + data.scenery_list[0].image[0].file_path + "_large.jpg";
				document.querySelector(".gameWindow").innerHTML = `
						<img src="`+ img + `">`;
				this.startTracking(location.latitude, location.longitude);
			}, error => {
				console.log(error);
			});

	}

	//關卡內地點
	gametracker(place) {
		let data = '{"place": "' + this.gameplace[place] + '"}';
		this.http.post("http://140.123.175.96:8080/tsoc/spotapi.php", data)
			.map(res => res.json())
			.subscribe(data => {
				let location = data.scenery_list[0].location;
				this.gameTracking(location.latitude, location.longitude);
			}, error => {
				console.log(error);
			});
	}

	//對話
	nextDialogText() {
		console.log(this.progress);
		if (this.countScript < this.nowScript.length) {
			if (this.nowScript[this.countScript].slice(0, 6) !== "Puzzle") {
				this.string = this.nowScript[this.countScript].slice(-4, );
				if (this.string.slice(0, 3) !== "img") {
					this.end = 0;
					this.dialogText = this.nowScript[this.countScript++];
				} else {
					if (this.nowScript[this.countScript] == "系統：請點選神秘男子的所在地img1") {
						this.end = 1;
						this.dialogText = this.nowScript[this.countScript].slice(0, -4);
						document.querySelector(".touchOne").innerHTML = `
						<img src="`+ this.gameimg[this.string.slice(3, )] + `"  />`;

					} else {
						this.dialogText = this.nowScript[this.countScript++].slice(0, -4);
						document.querySelector(".gameWindow").innerHTML = `
						<img src="`+ this.gameimg[this.string.slice(3, )] + `">`;
						let data = '{"img": "' + this.string + '","uid": "' + this.user.uid + '"}';
						this.http.post("http://140.123.175.96:8080/tsoc/img.php", data)
							.subscribe(data => {
							}, error => {
								console.log(error);
							});
					}
				}
			} else {
				this.puzzle();
			}
		}

		if (this.countScript == this.nowScript.length) {

			this.countScript++;
			this.endProgress(this.progress);
			if (this.progress == '1') {
				this.tracker(this.progressEnum.middle);
				this.nextplace(this.progressEnum.middle);
			} else if (this.progress == '2') {
				this.loadplace();
			} else if (this.progress == '6') {
				this.tracker(this.progressEnum.end);
				this.nextplace(this.progressEnum.end);
			} else if (this.progress == '7') {
				this.dialogText = "恭喜破關";
			} else {
				this.loadplace();
				let data = '{"uid": "' + this.user.uid + '"}';
				this.http.post("http://140.123.175.96:8080/tsoc/history1.php", data)
					.map(res => res.json())
					.subscribe(data => {
						let stage = data.history;
						if (stage == "") {
							this.progress = '6';
							this.setProgress(this.progress);
							this.loadfinal();
						}
					}, error => {
						console.log(error);
					});

			}
		}
	}

	//謎題
	puzzle() {

		let i = this.nowScript[this.countScript].slice(6, );
		if (this.progress.length == 1) {
			console.log(this.progress);
			this.endProgress(this.progress);
			if (this.progressEnum.stageA.indexOf(this.progress) != -1) {
				let j = this.progressEnum.stageA.indexOf(this.progress);
				this.progress = this.progressEnum.stageA[j + 1];
				this.setProgress(this.progress);
			} else if (this.progressEnum.stageB.indexOf(this.progress) != -1) {
				let j = this.progressEnum.stageB.indexOf(this.progress);
				this.progress = this.progressEnum.stageB[j + 1];
				this.setProgress(this.progress);
			} else if (this.progressEnum.stageC.indexOf(this.progress) != -1) {
				let j = this.progressEnum.stageC.indexOf(this.progress);
				this.progress = this.progressEnum.stageC[j + 1];
				this.setProgress(this.progress);
			}
		} else {
			if (this.progressEnum.stageA.indexOf(this.progress) != -1) {
				this.setProgress(this.progress);
			} else if (this.progressEnum.stageB.indexOf(this.progress) != -1) {
				this.setProgress(this.progress);
			} else if (this.progressEnum.stageC.indexOf(this.progress) != -1) {
				this.setProgress(this.progress);
			}
		}

		if (i != 3) {
			if (i != 5) {
				let prompt = this.alertCtrl.create({
					title: '系統',
					message: this.gameQue[i],
					inputs: [
						{
							name: 'ans',
							placeholder: '請輸入解答'
						},
					],
					buttons: [
						{
							text: '清除',
							handler: data => {
								console.log('Cancel clicked');
							}
						},
						{
							text: '確認',
							handler: data => {
								console.log(this.gameAns[i].indexOf(data.ans));
								if (this.gameAns[i].indexOf(data.ans) != -1) {
									this.endProgress(this.progress);
									if (this.progressEnum.stageA.indexOf(this.progress) != -1) {
										let j = this.progressEnum.stageA.indexOf(this.progress);
										this.progress = this.progressEnum.stageA[j + 1];
									} else if (this.progressEnum.stageB.indexOf(this.progress) != -1) {
										let j = this.progressEnum.stageB.indexOf(this.progress);
										this.progress = this.progressEnum.stageB[j + 1];
									}
									this.nextplace(this.progress);
									this.countScript++;
									this.nextDialogText();
								} else {
									let toast = this.toastCtrl.create({
										message: '解答錯誤',
										duration: 2000,
										position: 'middle'
									});

									toast.present(toast);
								}
							}
						}
					]
				});
				prompt.present();
			} else {
				let alert = this.alertCtrl.create({
					title: '車長',
					message: '北門車站最早的用途是什麼呢？',
					inputs: [
						{
							type: 'radio',
							label: '客運',
							value: '客運',
						},
						{
							type: 'radio',
							label: '貨運',
							value: '貨運',
						},
						{
							type: 'radio',
							label: '糖運',
							value: '糖運',
						},
						{
							type: 'radio',
							label: '林運',
							value: '林運',
						},
					],
					buttons: [
						{
							text: '清除',
							handler: data => {
								console.log('Cancel clicked');
							}
						},
						{
							text: '確認',
							handler: data => {
								console.log(data);
								if (this.gameAns[i].indexOf(data) != -1) {
									this.endProgress(this.progress);
									let j = this.progressEnum.stageC.indexOf(this.progress);
									this.progress = this.progressEnum.stageC[j + 1];
									this.nextplace(this.progress);
									this.countScript++;
									this.nextDialogText();
								} else {
									let toast = this.toastCtrl.create({
										message: '車長：不對哦！在答一次吧！',
										duration: 2000,
										position: 'middle'
									});
									toast.present(toast);
								}
							}
						}
					]

				});
				alert.present();
			}
		} else {
			let prompt = this.alertCtrl.create({
				title: '指令',
				message: this.gameQue[i],
				buttons: [
					{
						text: '了解',
						handler: data => {
						}
					}
				]
			});
			prompt.present();
			this.gametracker(7);
		}
	}

	touchno() {
		this.dialogText = "我：看來不是這裡呢...那會是哪裡呢？";
	}
	touchyes() {
		event.stopPropagation();
		this.dialogText = "我：果然是嘉義市的中央七彩噴水池！";
		this.countScript = 3;
	}

	openMenu() {
		this.navCtrl.push(MenuPage, {});
	}

	//關卡間gps
	startTracking(gamelat, gamelng) {

		this.place = "開始"
		// 中正大學118
		// gamelat = 23.547995;
		// gamelng = 120.4588;

		// Background Tracking
		const config: BackgroundGeolocationConfig = {
			desiredAccuracy: 0,
			stationaryRadius: 20,
			distanceFilter: 10,
			debug: true,
			interval: 2000
		};

		this.backgroundGeolocation.configure(config).subscribe((location) => {

			console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

			// Run update inside of Angular's zone
			this.zone.run(() => {
				this.lat = location.latitude;
				this.lng = location.longitude;
			});

		}, (err) => {

			console.log(err);

		});

		// Turn ON the background-geolocation system.
		this.backgroundGeolocation.start();


		// Foreground Tracking

		let options = {
			frequency: 5000,
			enableHighAccuracy: true
		};

		this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

			// Run update inside of Angular's zone
			this.zone.run(() => {
				this.lat = position.coords.latitude;
				this.lng = position.coords.longitude;
				if (Array.isArray(gamelat)) {
					for (let i = 0; i < gamelat.length; i++) {
						var distance = this.getFlatternDistance(gamelat[i], gamelng[i], this.lat, this.lng);
						console.log(distance);
						if (distance < 150) {
							this.place = "";
							this.stopTracking();
							if (i == 0) {
								this.setProgress(this.progress);
								this.loadstageA();
							} else if (i >= 1 && i <= 7) {
								this.setProgress(this.progress);
								this.loadstageB();
							} else if (i == 8) {
								this.setProgress(this.progress);
								this.loadstageC();
							}
						}
					}
				} else {
					var distance = this.getFlatternDistance(gamelat, gamelng, this.lat, this.lng);
					if (distance < 150) {
						this.place = "";
						this.stopTracking();
						if (this.progress == '2') {
							this.setProgress(this.progress);
							this.loadMiddle();
						}
						if (this.progress == '7') {
							this.setProgress(this.progress);
							this.loadEnd();
						}
					}
				}
			});
		});
	}

	//關卡內gps
	gameTracking(gamelat, gamelng) {

		// 中正大學118
		// gamelat = 23.547995;
		// gamelng = 120.4588;
		this.place = "開始"
		// Background Tracking
		const config: BackgroundGeolocationConfig = {
			desiredAccuracy: 0,
			stationaryRadius: 20,
			distanceFilter: 10,
			debug: true,
			interval: 2000
		};

		this.backgroundGeolocation.configure(config).subscribe((location) => {

			console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

			// Run update inside of Angular's zone
			this.zone.run(() => {
				this.lat = location.latitude;
				this.lng = location.longitude;
			});

		}, (err) => {

			console.log(err);

		});

		// Turn ON the background-geolocation system.
		this.backgroundGeolocation.start();


		// Foreground Tracking

		let options = {
			frequency: 3000,
			enableHighAccuracy: true
		};

		this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

			// Run update inside of Angular's zone
			this.zone.run(() => {
				this.lat = position.coords.latitude;
				this.lng = position.coords.longitude;
				let distance = this.getFlatternDistance(gamelat, gamelng, this.lat, this.lng);
				if (distance < 150) {
					this.place = "";
					this.stopTracking();
					if (this.progress == '4-1') {
						this.endProgress(this.progress);
						let j = this.progressEnum.stageB.indexOf(this.progress);
						this.progress = this.progressEnum.stageB[j + 1];
						this.nextplace(this.progress);
						this.countScript++;
						this.nextDialogText();
					}

				}
			});

		});

	}

	test() {
		event.stopPropagation();
		this.place = "";
		this.stopTracking();
		if (this.progress == '2') {
			this.setProgress(this.progress);
			this.loadMiddle();
		}
		if (this.progress == '7') {
			this.setProgress(this.progress);
			this.loadEnd();
		}
	}
	test2() {
		event.stopPropagation();
		this.place = "";
		this.stopTracking();

		this.progress = '3';
		this.setProgress(this.progress);
		this.loadstageA();

	}
	test3() {
		event.stopPropagation();
		this.place = "";
		this.stopTracking();
		this.progress = '4';
		this.setProgress(this.progress);
		this.loadstageB();

	}
	test4() {
		event.stopPropagation();
		this.place = "";
		this.stopTracking();
		this.progress = '5';
		this.setProgress(this.progress);
		this.loadstageC();

	}
	test1() {
		event.stopPropagation();
		this.place = "";
		this.stopTracking();
		if (this.progress == '4-1') {
			this.endProgress(this.progress);
			let j = this.progressEnum.stageB.indexOf(this.progress);
			this.progress = this.progressEnum.stageB[j + 1];
			this.nextplace(this.progress);
			this.countScript++;
			this.nextDialogText();
		}
	}

	stopTracking() {
		console.log('stopTracking');
		this.backgroundGeolocation.stop();
		this.watch.unsubscribe();

	}

	getRad(d) {
		return d * this.PI / 180.0;
	}

	getFlatternDistance(lat1, lng1, lat2, lng2) {
		var f = this.getRad((lat1 + lat2) / 2);
		var g = this.getRad((lat1 - lat2) / 2);
		var l = this.getRad((lng1 - lng2) / 2);

		var sg = Math.sin(g);
		var sl = Math.sin(l);
		var sf = Math.sin(f);

		var s, c, w, r, d, h1, h2;
		var a = this.EARTH_RADIUS;
		var fl = 1 / 298.257;

		sg = sg * sg;
		sl = sl * sl;
		sf = sf * sf;

		s = sg * (1 - sl) + (1 - sf) * sl;
		c = (1 - sg) * (1 - sl) + sf * sl;

		w = Math.atan(Math.sqrt(s / c));
		r = Math.sqrt(s * c) / w;
		d = 2 * w * a;
		h1 = (3 * r - 1) / 2 / c;
		h2 = (3 * r + 1) / 2 / s;

		return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
	}

}
