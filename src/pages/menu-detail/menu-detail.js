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
import { Storage } from '@ionic/storage'; //儲存登入紀錄
/**
 * Generated class for the MenuDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MenuDetailPage = (function () {
    function MenuDetailPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.option = navParams.get('option');
        this.storyScript = {
            start: [],
            middle: [],
            stageA: [],
            stageB: [],
            end: []
        };
        this.storyScript.start = [
            "開場白第一句",
            "開場白第二句",
            "開場白第三句",
            "開場白第四句",
            "開場白第五句",
            "請前往檜意森活村!",
        ];
        this.storyScript.middle = [
            "middle第一句",
            "middle第二句",
            "middle第三句"
        ];
        this.gameProgress = {
            start: 1,
            middle: 0,
            stageA: 0,
            stageB: 0,
            end: 0
        };
    }
    MenuDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        switch (this.option) {
            case "story":
                this.title = "劇情回顧";
                this.storage.get('gameProgress').then(function (value) {
                    _this.gameProgress = value;
                    console.log((_this.gameProgress.start));
                });
                break;
            case "item":
                this.title = "物品欄";
                break;
            case "hint":
                this.title = "提示";
                break;
        }
    };
    MenuDetailPage.prototype.getStoryScript = function (gameProgress) {
        if (gameProgress.start = 1) {
            // document.querySelector(".story").innerHTML = `
            //   <ion-list-item>序章<ion-list-item>`;
            // for(var i=0; i<this.storyScript.start.length; i++){
            //   document.querySelector(".story").innerHTML += `
            //     <ion-item>
            //       ${this.storyScript.start[i]} 123123
            //     </ion-item>
            //   `;
            // }
        }
    };
    return MenuDetailPage;
}());
MenuDetailPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-menu-detail',
        templateUrl: 'menu-detail.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage])
], MenuDetailPage);
export { MenuDetailPage };
//# sourceMappingURL=menu-detail.js.map