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
import { AlertController, ModalController, ViewController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Http } from '@angular/http'; //要get和post要import這行
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'; //儲存登入紀錄
import { Geolocation } from '@ionic-native/geolocation';
import { LoginDetailPage } from '../login-detail/login-detail';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Login = (function () {
    function Login(navCtrl, navParams, formBuilder, http, geolocation, modalCtrl, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.geolocation = geolocation;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.user_list = []; // 全部的 username, email
        this.is_login = false;
        this.user = [];
    }
    Login.prototype.ngOnInit = function () {
        this.loginForm = new FormGroup({
            name: new FormControl(),
            email: new FormControl()
        });
        this.loginForm = this.formBuilder.group({
            'email': ['', [Validators.required, this.emailValidator.bind(this)]],
            'password': ['', Validators.required]
        });
    };
    Login.prototype.emailValidator = function (control) {
        for (var i in this.user_list) {
            if (control.value === this.user_list[i].email) {
                return { invalidEmail: true };
            }
            if (!(control.value.toLowerCase().match('@'))) {
                return { invalidEmail: true };
            }
        }
    };
    Login.prototype.login = function () {
        var _this = this;
        var data = '{"email": "' + this.loginForm.controls.email.value + '","password": "' + this.loginForm.controls.password.value + '"}';
        this.http.post("http://140.123.175.96:8080/tsoc/login.php", data)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.user = data.user;
            if (_this.user != "") {
                _this.storage.set('user', _this.user);
                _this.is_login = true;
                if (_this.user.picture == "") {
                    _this.user.picture = "assets/nopicture.jpg";
                }
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    subTitle: '帳號密碼錯誤',
                    buttons: ['OK']
                });
                alert_1.present();
            }
            _this.geolocation.getCurrentPosition().then(function (position) {
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
            }, function (err) {
                _this.lat = 23.561944;
                _this.lng = 120.474722;
            });
        }, function (error) {
            console.log(error);
        });
    };
    Login.prototype.ionViewWillEnter = function () {
        if (this.user != "") {
            this.load();
            console.log("load");
        }
    };
    Login.prototype.load = function () {
        var _this = this;
        var data = '{"email": "' + this.user.email + '","uid": "' + this.user.uid + '"}';
        this.http.post("http://140.123.175.96:8080/tsoc/loginagain.php", data)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.user = data.user;
            _this.storage.set('user', _this.user);
            if (_this.user.picture == "") {
                _this.user.picture = "assets/nopicture.jpg";
            }
        }, function (error) {
            console.log(error);
        });
    };
    Login.prototype.newUser = function () {
        var modal = this.modalCtrl.create(RegisterPage);
        modal.onDidDismiss(function () {
        });
        modal.present();
    };
    Login.prototype.logout = function () {
        this.is_login = false;
        this.storage.remove("users");
        this.user = "";
    };
    Login.prototype.get_user = function () {
        this.navCtrl.push(LoginDetailPage, {
            uid: this.user.uid,
            name: this.user.username,
            password: this.user.password,
            email: this.user.email,
        }).then(function (success) {
        });
    };
    return Login;
}());
Login = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, Http, Geolocation,
        ModalController, Storage, AlertController])
], Login);
export { Login };
var RegisterPage = (function () {
    function RegisterPage(platform, params, formBuilder, viewCtrl, http, alertCtrl) {
        this.platform = platform;
        this.params = params;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.registerForm = new FormGroup({
            name: new FormControl(),
            email: new FormControl()
        });
        this.registerForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required],
            'username': ['', Validators.required]
        });
    };
    RegisterPage.prototype.Submit = function () {
        var data = '{"email": "' + this.registerForm.controls.email.value + '","password": "' + this.registerForm.controls.password.value + '","username": "' + this.registerForm.controls.username.value + '"}';
        // console.log(data);
        this.http.post("http://140.123.175.96:8080/tsoc/register.php", data)
            .subscribe(function (data) {
        }, function (error) {
            console.log(error);
        });
        this.viewCtrl.dismiss();
    };
    RegisterPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Component({
        selector: 'page-register',
        template: "\n<ion-content class=\"mymodal\">\n<ion-list class = \"liststyle\">\n    <form [formGroup]=\"registerForm\">\n      <ion-item>\n        <ion-label color=\"dark\" stacked>Email</ion-label>\n        <ion-input [value]=\"email\" formControlName=\"email\" type=\"email\" id=\"email\" spellcheck=\"false\" autocapitalize=\"off\">\n        </ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label color=\"dark\" stacked>password</ion-label>\n        <ion-input [value]=\"password\" formControlName=\"password\" type=\"password\" id=\"password\" spellcheck=\"false\" autocapitalize=\"off\">\n        </ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label color=\"dark\" stacked>\u66B1\u7A31</ion-label>\n        <ion-input [value]=\"username\" formControlName=\"username\" type=\"username\" id=\"username\" spellcheck=\"false\" autocapitalize=\"off\">\n        </ion-input>\n      </ion-item>\n      <button ion-button (click)=\"Submit()\">\u78BA\u8A8D</button>\n      <button ion-button clear (click)=\"cancel()\">\u53D6\u6D88</button>\n     </form>     \n  </ion-list>\n</ion-content>\n\n"
    }),
    __metadata("design:paramtypes", [Platform, NavParams, FormBuilder, ViewController, Http, AlertController])
], RegisterPage);
export { RegisterPage };
//# sourceMappingURL=login.js.map