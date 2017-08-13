import { OnInit, Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Headers, Http, RequestOptions } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer,FileUploadOptions } from '@ionic-native/file-transfer';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Login } from '../login/login';

@Component({
  selector: 'page-login-detail',
  templateUrl: 'login-detail.html'
})
export class LoginDetailPage {
  isChange: boolean = false;//头像是否改变标识
  avatarPath: string = '../../assets/img/qr_code.png';//用户默认头像
  imageBase64: string;//保存头像base64,用于上传
  private toast;
  private loading;
  myForm: FormGroup;
  userInfo: { name: string, password: string, email: string, uid: any } = { name: '', password: '', email: '', uid: '' };
  constructor(public navCtrl: NavController, public camera: Camera, private toastCtrl: ToastController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, private loadingCtrl: LoadingController) {
    let uid = navParams.get('uid');
    let name = navParams.get('name');
    let email = navParams.get('email');
    let password = navParams.get('password');
    this.userInfo.uid = uid;
    this.userInfo.name = name;
    this.userInfo.password = password;
    this.userInfo.email = email;

  }
  ngOnInit(): any {
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

  }

  isValid(field: string) {
    let formField = this.myForm.get(field);
    return formField.valid || formField.pristine;
  }

  getPicture(type) {//1拍照,0从图库选择
    let options = {
      targetWidth: 400,
      targetHeight: 400
    };
    if (type == 1) {
      this.getPictureByCamera(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    }
    else {
      this.getPictureByPhotoLibrary(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    }
  }

  private getPictureSuccess(imageBase64) {
    this.isChange = true;
    this.imageBase64 = <string>imageBase64;
    this.avatarPath = 'data:image/jpeg;base64,' + imageBase64;
  }
  showToast = (message: string = '操作完成', duration: number = 2500) => {
    this.toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      showCloseButton: true,
      closeButtonText: '關閉'
    });
    this.toast.present();
  };

  /**
   * 关闭信息提示框
   */
  hideToast = () => {
    this.toast.dismissAll()
  };

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading = (content: string = '') => {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
    setTimeout(() => {//最长显示20秒
      this.loading.dismiss();
    }, 20000);
  };

  /**
   * 关闭loading
   */
  hideLoading = () => {
    this.loading.dismissAll()
  };

  /**
   * 使用cordova-plugin-camera获取照片的base64
   * @param options
   * @return {Promise<T>}
   */
  getPicture2 = (options) => {
    return new Promise((resolve, reject) => {
      this.camera.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
        destinationType: this.camera.DestinationType.DATA_URL,//返回值格式,DATA_URL:base64,FILE_URI:图片路径
        quality: 100,//保存的图像质量，范围为0 - 100
        allowEdit: true,//选择图片前是否允许编辑
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 2000,//缩放图像的宽度（像素）
        targetHeight: 2000,//缩放图像的高度（像素）
        saveToPhotoAlbum: false,//是否保存到相册
        correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
      }, options)).then((imageData) => {
        resolve(imageData);
        //this.showToast('send succefull'+imageData);
      }, (err) => {
        console.log(err);
        err == 20 ? this.showToast('沒有權限，請在設定中開啟權限') : reject(err);
      });
    });
  };

  /**
   * 通过图库获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByPhotoLibrary = (options = {}) => {
    return new Promise((resolve) => {
      this.getPicture2(Object.assign({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }, options)).then(imageBase64 => {
        resolve(imageBase64);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消選擇照片!', 1500) : this.showToast('沒有權限');
      });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByCamera = (options = {}) => {
    return new Promise((resolve) => {
      this.getPicture2(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA
      }, options)).then(imageBase64 => {
        resolve(imageBase64);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('沒有權限');
      });
    });
  };

  save() {

    var data = '{"uid": "' + this.userInfo.uid + '", "name": "' + this.userInfo.name + '", "password": "' + this.userInfo.password + '", "email": "' + this.userInfo.email + '"';
    // console.log(data);

    if (this.imageBase64) {
      data += ',"imageBase64": "' + this.imageBase64 + '"';
      this.showToast('this.imageBase64', 1500);
    }
    data += '}';
    this.http.post("http://140.123.175.96:8080/tsoc/logindetail.php", data).subscribe();
  }
}