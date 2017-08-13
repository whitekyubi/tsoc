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
import { Http } from '@angular/http'; //要get和post要import這行
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ReviewPage } from '../review-page/review-page';
/**
 * Generated class for the History page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HistoryPage = (function () {
    function HistoryPage(navCtrl, navParams, http, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.stage1 = 0;
        this.stage2 = 0;
        this.stage3 = 0;
        this.stage4 = 0;
        this.stage5 = 0;
        this.stage6 = 0;
        this.stage7 = 0;
        this.stage3A = 0;
        this.stage3B = 0;
        this.stage3C = 0;
        this.stage3D = 0;
        this.stage4A = 0;
        this.stage4B = 0;
        this.stage4C = 0;
        this.stage5A = 0;
        this.stage5B = 0;
        this.showstage3A = 0;
        this.showstage3B = 0;
        this.showstage3C = 0;
        this.showstage3D = 0;
        this.showstage4A = 0;
        this.showstage4B = 0;
        this.showstage4C = 0;
        this.showstage5A = 0;
        this.showstage5B = 0;
        this.load();
    }
    HistoryPage.prototype.load = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            var data = '{"uid": "' + val.uid + '"}';
            console.log(data);
            _this.http.post('http://140.123.175.96:8080/tsoc/gethis.php', data)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.stage1 = data.stage[0];
                _this.stage2 = data.stage[1];
                _this.stage3 = data.stage[2];
                _this.stage3A = data.stage[3];
                _this.stage3B = data.stage[4];
                _this.stage3C = data.stage[5];
                _this.stage3D = data.stage[6];
                _this.stage4 = data.stage[7];
                _this.stage4A = data.stage[8];
                _this.stage4B = data.stage[9];
                _this.stage4C = data.stage[10];
                _this.stage5 = data.stage[11];
                _this.stage5A = data.stage[12];
                _this.stage5B = data.stage[13];
                _this.stage6 = data.stage[14];
                _this.stage7 = data.stage[15];
                if (_this.stage1 != 0) {
                    _this.showstage1 = 1;
                }
                if (_this.stage2 != 0) {
                    _this.showstage2 = 1;
                }
                if (_this.stage3 != 0) {
                    _this.showstage3 = 1;
                }
                if (_this.stage4 != 0) {
                    _this.showstage4 = 1;
                }
                if (_this.stage5 != 0) {
                    _this.showstage5 = 1;
                }
                if (_this.stage6 != 0) {
                    _this.showstage6 = 1;
                }
                if (_this.stage7 != 0) {
                    _this.showstage7 = 1;
                }
            });
        });
    };
    HistoryPage.prototype.redirect1 = function () {
        console.log("hi");
        this.navCtrl.push(ReviewPage, { message: "stage1" });
    };
    HistoryPage.prototype.redirect2 = function () {
        console.log("hi");
        this.navCtrl.push(ReviewPage, { message: "stage2" });
    };
    HistoryPage.prototype.show3 = function () {
        this.showstage1 = 0;
        this.showstage2 = 0;
        this.showstage3 = 0;
        this.showstage4 = 0;
        this.showstage5 = 0;
        this.showstage6 = 0;
        this.showstage7 = 0;
        this.showstage4A = 0;
        this.showstage4B = 0;
        this.showstage4C = 0;
        this.showstage5A = 0;
        this.showstage5B = 0;
        this.showstage30 = 1;
        if (this.stage3A != 0) {
            this.showstage3A = 1;
        }
        if (this.stage3B != 0) {
            this.showstage3B = 1;
        }
        if (this.stage3C != 0) {
            this.showstage3C = 1;
        }
        if (this.stage3D != 0) {
            this.showstage3D = 1;
        }
    };
    HistoryPage.prototype.redirect30 = function () { this.navCtrl.push(ReviewPage, { message: "stage30" }); };
    HistoryPage.prototype.redirect3A = function () { this.navCtrl.push(ReviewPage, { message: "stage3A" }); };
    HistoryPage.prototype.redirect3B = function () { this.navCtrl.push(ReviewPage, { message: "stage3B" }); };
    HistoryPage.prototype.redirect3C = function () { this.navCtrl.push(ReviewPage, { message: "stage3C" }); };
    HistoryPage.prototype.redirect3D = function () { this.navCtrl.push(ReviewPage, { message: "stage3D" }); };
    HistoryPage.prototype.show4 = function () {
        this.showstage1 = 0;
        this.showstage2 = 0;
        this.showstage3 = 0;
        this.showstage4 = 0;
        this.showstage5 = 0;
        this.showstage6 = 0;
        this.showstage7 = 0;
        this.showstage4A = 0;
        this.showstage4B = 0;
        this.showstage4C = 0;
        this.showstage5A = 0;
        this.showstage5B = 0;
        this.showstage40 = 1;
        if (this.stage4A != 0) {
            this.showstage4A = 1;
        }
        if (this.stage4B != 0) {
            this.showstage4B = 1;
        }
        if (this.stage4C != 0) {
            this.showstage4C = 1;
        }
    };
    HistoryPage.prototype.redirect40 = function () { this.navCtrl.push(ReviewPage, { message: "stage40" }); };
    HistoryPage.prototype.redirect4A = function () { this.navCtrl.push(ReviewPage, { message: "stage4A" }); };
    HistoryPage.prototype.redirect4B = function () { this.navCtrl.push(ReviewPage, { message: "stage4B" }); };
    HistoryPage.prototype.redirect4C = function () { this.navCtrl.push(ReviewPage, { message: "stage4C" }); };
    HistoryPage.prototype.show5 = function () {
        this.showstage1 = 0;
        this.showstage2 = 0;
        this.showstage3 = 0;
        this.showstage4 = 0;
        this.showstage5 = 0;
        this.showstage6 = 0;
        this.showstage7 = 0;
        this.showstage4A = 0;
        this.showstage4B = 0;
        this.showstage4C = 0;
        this.showstage5A = 0;
        this.showstage5B = 0;
        this.showstage50 = 1;
        if (this.stage5A != 0) {
            this.showstage5A = 1;
        }
        if (this.stage5B != 0) {
            this.showstage5B = 1;
        }
    };
    HistoryPage.prototype.redirect50 = function () { this.navCtrl.push(ReviewPage, { message: "stage50" }); };
    HistoryPage.prototype.redirect5A = function () { this.navCtrl.push(ReviewPage, { message: "stage5A" }); };
    HistoryPage.prototype.redirect5B = function () { this.navCtrl.push(ReviewPage, { message: "stage5B" }); };
    HistoryPage.prototype.redirect6 = function () { this.navCtrl.push(ReviewPage, { message: "stage6" }); };
    HistoryPage.prototype.redirect7 = function () { this.navCtrl.push(ReviewPage, { message: "stage7" }); };
    HistoryPage.prototype.back = function () {
        if (this.stage1 != 0) {
            this.showstage1 = 1;
        }
        if (this.stage2 != 0) {
            this.showstage2 = 1;
        }
        if (this.stage3 != 0) {
            this.showstage3 = 1;
        }
        if (this.stage4 != 0) {
            this.showstage4 = 1;
        }
        if (this.stage5 != 0) {
            this.showstage5 = 1;
        }
        if (this.stage6 != 0) {
            this.showstage6 = 1;
        }
        if (this.stage7 != 0) {
            this.showstage7 = 1;
        }
        this.showstage30 = 0;
        this.showstage40 = 0;
        this.showstage50 = 0;
        this.showstage4A = 0;
        this.showstage4B = 0;
        this.showstage4C = 0;
        this.showstage3A = 0;
        this.showstage3B = 0;
        this.showstage3C = 0;
        this.showstage3D = 0;
        this.showstage5A = 0;
        this.showstage5B = 0;
    };
    return HistoryPage;
}());
HistoryPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-history',
        templateUrl: 'history.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Http, Storage])
], HistoryPage);
export { HistoryPage };
//# sourceMappingURL=history.js.map