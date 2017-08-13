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
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Http } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
var LoginDetailPage = (function () {
    function LoginDetailPage(navCtrl, camera, toastCtrl, navParams, formBuilder, http, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.isChange = false; //头像是否改变标识
        this.avatarPath = '../../assets/img/qr_code.png'; //用户默认头像
        this.userInfo = { name: '', password: '', email: '', uid: '' };
        this.showToast = function (message, duration) {
            if (message === void 0) { message = '操作完成'; }
            if (duration === void 0) { duration = 2500; }
            _this.toast = _this.toastCtrl.create({
                message: message,
                duration: duration,
                position: 'top',
                showCloseButton: true,
                closeButtonText: '關閉'
            });
            _this.toast.present();
        };
        /**
         * 关闭信息提示框
         */
        this.hideToast = function () {
            _this.toast.dismissAll();
        };
        /**
         * 统一调用此方法显示loading
         * @param content 显示的内容
         */
        this.showLoading = function (content) {
            if (content === void 0) { content = ''; }
            _this.loading = _this.loadingCtrl.create({
                content: content
            });
            _this.loading.present();
            setTimeout(function () {
                _this.loading.dismiss();
            }, 20000);
        };
        /**
         * 关闭loading
         */
        this.hideLoading = function () {
            _this.loading.dismissAll();
        };
        /**
         * 使用cordova-plugin-camera获取照片的base64
         * @param options
         * @return {Promise<T>}
         */
        this.getPicture2 = function (options) {
            return new Promise(function (resolve, reject) {
                _this.camera.getPicture(Object.assign({
                    sourceType: _this.camera.PictureSourceType.CAMERA,
                    destinationType: _this.camera.DestinationType.DATA_URL,
                    quality: 100,
                    allowEdit: true,
                    encodingType: _this.camera.EncodingType.JPEG,
                    targetWidth: 2000,
                    targetHeight: 2000,
                    saveToPhotoAlbum: false,
                    correctOrientation: true //设置摄像机拍摄的图像是否为正确的方向
                }, options)).then(function (imageData) {
                    resolve(imageData);
                    //this.showToast('send succefull'+imageData);
                }, function (err) {
                    console.log(err);
                    err == 20 ? _this.showToast('沒有權限，請在設定中開啟權限') : reject(err);
                });
            });
        };
        /**
         * 通过图库获取照片
         * @param options
         * @return {Promise<T>}
         */
        this.getPictureByPhotoLibrary = function (options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (resolve) {
                _this.getPicture2(Object.assign({
                    sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY
                }, options)).then(function (imageBase64) {
                    resolve(imageBase64);
                }).catch(function (err) {
                    String(err).indexOf('cancel') != -1 ? _this.showToast('取消選擇照片!', 1500) : _this.showToast('沒有權限');
                });
            });
        };
        /**
         * 通过拍照获取照片
         * @param options
         * @return {Promise<T>}
         */
        this.getPictureByCamera = function (options) {
            if (options === void 0) { options = {}; }
            return new Promise(function (resolve) {
                _this.getPicture2(Object.assign({
                    sourceType: _this.camera.PictureSourceType.CAMERA
                }, options)).then(function (imageBase64) {
                    resolve(imageBase64);
                }).catch(function (err) {
                    String(err).indexOf('cancel') != -1 ? _this.showToast('取消拍照', 1500) : _this.showToast('沒有權限');
                });
            });
        };
        var uid = navParams.get('uid');
        var name = navParams.get('name');
        var email = navParams.get('email');
        var password = navParams.get('password');
        this.userInfo.uid = uid;
        this.userInfo.name = name;
        this.userInfo.password = password;
        this.userInfo.email = email;
    }
    LoginDetailPage.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            name: new FormControl(),
            email: new FormControl(),
            password: new FormControl()
        });
        this.myForm = this.formBuilder.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
    };
    LoginDetailPage.prototype.isValid = function (field) {
        var formField = this.myForm.get(field);
        return formField.valid || formField.pristine;
    };
    LoginDetailPage.prototype.getPicture = function (type) {
        var _this = this;
        var options = {
            targetWidth: 400,
            targetHeight: 400
        };
        if (type == 1) {
            this.getPictureByCamera(options).then(function (imageBase64) {
                _this.getPictureSuccess(imageBase64);
            });
        }
        else {
            this.getPictureByPhotoLibrary(options).then(function (imageBase64) {
                _this.getPictureSuccess(imageBase64);
            });
        }
    };
    LoginDetailPage.prototype.getPictureSuccess = function (imageBase64) {
        this.isChange = true;
        this.imageBase64 = imageBase64;
        this.avatarPath = 'data:image/jpeg;base64,' + imageBase64;
    };
    LoginDetailPage.prototype.save = function () {
        var data = '{"uid": "' + this.userInfo.uid + '", "name": "' + this.userInfo.name + '", "password": "' + this.userInfo.password + '", "email": "' + this.userInfo.email + '"';
        // console.log(data);
        if (this.imageBase64) {
            data += ',"imageBase64": "' + this.imageBase64 + '"';
            this.showToast('this.imageBase64', 1500);
        }
        data += '}';
        this.http.post("http://140.123.175.96:8080/tsoc/logindetail.php", data).subscribe();
    };
    return LoginDetailPage;
}());
LoginDetailPage = __decorate([
    Component({
        selector: 'page-login-detail',
        templateUrl: 'login-detail.html'
    }),
    __metadata("design:paramtypes", [NavController, Camera, ToastController, NavParams, FormBuilder, Http, LoadingController])
], LoginDetailPage);
export { LoginDetailPage };
//# sourceMappingURL=login-detail.js.map