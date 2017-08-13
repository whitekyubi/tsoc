var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ReviewPage = (function () {
    function ReviewPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.x = 0;
        this.gameimg = [
            "http://iphoto.ipeen.com.tw/photo/comment/201011/cgmc7ef61d6f9a8d9faf66bef25830dc834763.jpg",
            "http://140.123.175.96:8080/tsoc/img/2022.jpg",
            "http://140.123.175.96:8080/tsoc/img/2013.jpg"
        ];
        this.count = 0;
        this.message = navParams.get('message');
        console.log(this.message);
        this.storyScript = {
            start: [],
            middle: [],
            stageA: [],
            stageB: [],
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
        ];
        this.storyScript.stageA = [
            "遇到一個迷路的小孩尋求協助。",
            "小孩說：「我迷路了，可不可以幫我找我的媽媽，媽媽有說要帶我去圖片裡的地方玩，拜託。」img0",
            "Puzzle3",
            "他媽媽很感謝玩家帶他的小孩過來這裡",
            "玩家詢問小孩媽媽說到：「請問你知不知道照片中的人是誰?」",
            "小孩媽媽說：「不清楚，但看起來跟這張日治時期的照片很像，或許去公園裡的史蹟資料館會有線索吧。」img1",
            "路人甲問乙說：「你知道為甚麼公園內隨處可見的陳澄波畫架嗎?」",
            "路人乙說：「這還不簡單!一定是因為要紀念陳澄波阿，他的作品《淡水夕照》在拍賣場上可是以約新台幣2.2億成交。」",
            "路人甲說：「你只知其一不知其二，的確陳澄波是台灣嘉義知名畫家，但是還曾經發生過......」",
            "隨著路人甲和乙的走遠，勾起你的興趣想知道陳澄波到底發生了什麼事情。",
            "你猜想畫作旁的說明或許會提到。",
            "Puzzle4",
            "路人丙看玩家正在看陳澄波的畫作說到：「好難得看到年輕人駐足在畫作前，你在找東西嗎?」",
            "玩家剛剛聽到的話告訴路人丙並且說到：「我就想看看畫作旁的說明或許會提到。」",
            "路人丙說：「哦~!他們應該是在說228事件吧。」",
            "路人丙說：「1947年二二八事件爆發後，嘉義市區發生嚴重的警民衝突。」",
            "路人丙說：「地方仕紳希望平息事端推派陳澄波等數位嘉義市參議員擔任「和平使」前往協商，怎知一行人遭到拘禁並受到嚴刑拷打，被逼迫承認煽動暴動。」",
            "路人丙說：「根據其陳澄波的子女口述歷史紀錄，正好在嘉義噴水池附近見到父親被押在軍車上，像犯人一樣手被反綁羞辱式的遊街至火車站前執行槍決。」",
            "得到陳澄波的畫作「中央噴水池」img2",
            "恭喜破關了",
            ""
        ];
        this.count = 0;
        if (this.message == "stage1") {
            this.dialogText = this.storyScript.start[this.count];
        }
        if (this.message == "stage2") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage30") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage3A") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage3B") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage3C") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage3D") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage40") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage4A") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage4B") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage4C") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage50") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage5A") {
            this.dialogText = this.storyScript.middle[this.count];
        }
        if (this.message == "stage5B") {
            this.dialogText = this.storyScript.middle[this.count];
        }
    }
    ReviewPage.prototype.ionViewDidLoad = function () {
        if (this.message == "stage1") {
            document.querySelector(".gameWindow").innerHTML = "\n\t\t<img src=\"https://cambridgewriting.files.wordpress.com/2011/04/letter.jpg\">";
        }
        if (this.message == "stage2") {
            document.querySelector(".gameWindow").innerHTML = "\n\t\t<img src=\"http://140.123.175.96:8080/tsoc/img/2022.jpg\">";
        }
    };
    ReviewPage.prototype.nextDialogText = function () {
        if (this.message == "stage1") {
            this.dialogText = this.storyScript.start[this.count];
            this.count++;
        }
        if (this.message == "stage2") {
            this.dialogText = this.storyScript.middle[this.count];
            this.count++;
        }
    };
    return ReviewPage;
}());
ReviewPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-review-page',
        templateUrl: 'review-page.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], ReviewPage);
export { ReviewPage };
//# sourceMappingURL=review-page.js.map