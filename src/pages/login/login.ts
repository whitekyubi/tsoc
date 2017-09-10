import { OnInit, Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ModalController, ViewController, Platform, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Http, Headers } from '@angular/http';		//要get和post要import這行
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
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login implements OnInit {
  loginForm: FormGroup;
  user_list = []; // 全部的 username, email
  public is_login = false;
  public user: any = [];
  public lat;
  public lng;
  constructor(public viewCtrl: ViewController, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, private geolocation: Geolocation,
    public modalCtrl: ModalController, public storage: Storage, public alertCtrl: AlertController) {
    this.storage.get('user').then((val) => {
      if (val) {
        this.user = val;
        this.is_login = true;
      }
    });
  }

  ngOnInit(): any {
    this.loginForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl()
    });
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, this.emailValidator.bind(this)]],
      'password': ['', Validators.required]
    });
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {

    for (var i in this.user_list) {
      if (control.value === this.user_list[i].email) {
        return { invalidEmail: true };
      }
      if (!(control.value.toLowerCase().match('@'))) {
        return { invalidEmail: true };
      }
    }

  }

  login() {
    let data = '{"email": "' + this.loginForm.controls.email.value + '","password": "' + this.loginForm.controls.password.value + '"}';
    this.http.post("http://140.123.175.96:8080/tsoc/login.php", data)
      .map(res => res.json())
      .subscribe(data => {
        this.user = data.user;
        if (this.user == "undone") {
          let prompt = this.alertCtrl.create({
            title: '請先完成認證',
            message: "請您至註冊的電子信箱收取'驗證碼'",
            inputs: [
              {
                name: 'ans',
                placeholder: '請輸入驗證碼'
              },
            ],
            buttons: [
              {
                text: '關閉',
                handler: data => {
                }
              },
              {
                text: '確認',
                handler: data => {
                  let ans = '{"email": "' + this.loginForm.controls.email.value + '","ans": "' + data.ans + '"}';
                  this.http.post("http://140.123.175.96:8080/tsoc/chmail.php", ans)
                    .map(res => res.json())
                    .subscribe(data => {
                      let account = data.accounts;
                      if (account == "same") {
                        let toast = this.toastCtrl.create({
                          message: '驗證成功',
                          duration: 2000,
                          position: 'middle'
                        });

                        toast.present(toast);
                        this.viewCtrl.dismiss();
                      } else if (account == "diff") {
                        let toast = this.toastCtrl.create({
                          message: '驗證碼錯誤',
                          duration: 2000,
                          position: 'middle'
                        });

                        toast.present(toast);

                      }
                    });
                }
              }]
          });
          prompt.present();

        } else if (this.user != "") {
          this.storage.set('user', this.user);
          this.is_login = true;
          if (this.user.picture == "") {
            this.user.picture = "assets/nopicture.jpg";
          }
        } else {
          let alert = this.alertCtrl.create({
            subTitle: '帳號密碼錯誤',
            buttons: ['OK']
          });
          alert.present();
        }

        this.geolocation.getCurrentPosition().then((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }, err => {
          let prompt = this.alertCtrl.create({
            title: '定位',
            message: '請玩家打開手機GPS定位',
            buttons: [
              {
                text: '了解',
                handler: data => {
                }
              }
            ]
          });
          prompt.present();
        });
      }, error => {
        console.log(error);
      });
  }
  ionViewWillEnter() {
    if (this.user != "") {
      this.load();
      console.log("load");
    }
  }
  load() {
    let data = '{"email": "' + this.user.email + '","uid": "' + this.user.uid + '"}';
    this.http.post("http://140.123.175.96:8080/tsoc/loginagain.php", data)
      .map(res => res.json())
      .subscribe(data => {
        this.user = data.user;
        this.storage.set('user', this.user);
        if (this.user.picture == "") {
          this.user.picture = "assets/nopicture.jpg";
        }
      }, error => {
        console.log(error);
      });
  }
  newUser() {
    let modal = this.modalCtrl.create(RegisterPage);
    modal.onDidDismiss(() => {
    });
    modal.present();
  }
  logout() {
    this.is_login = false;
    this.storage.remove("user");
    this.user = "";
  }

  get_user() {
    this.navCtrl.push(LoginDetailPage, {
      uid: this.user.uid,
      name: this.user.username,
      password: this.user.password,
      email: this.user.email,
    }).then(success => {

    });
  }
  forget() {
    let modal = this.modalCtrl.create(ForgetPage);
    modal.onDidDismiss(() => {
    });
    modal.present();
  }


}
@Component({
  selector: 'page-register',
  template: `
<ion-content class="mymodal">
<ion-list class = "liststyle">
    <form [formGroup]="registerForm">
      <ion-item>
        <ion-label color="dark" stacked>Email</ion-label>
        <ion-input [value]="email" formControlName="email" type="email" id="email" spellcheck="false" autocapitalize="off">
        </ion-input>
      </ion-item>
      <ion-item>
        <ion-label color="dark" stacked>password</ion-label>
        <ion-input [value]="password" formControlName="password" type="password" id="password" spellcheck="false" autocapitalize="off">
        </ion-input>
      </ion-item>
      <p class="warn">6~16位字符，至少包含数字、字母</p>
      <ion-item>
        <ion-label color="dark" stacked>暱稱</ion-label>
        <ion-input [value]="username" formControlName="username" type="username" id="username" spellcheck="false" autocapitalize="off">
        </ion-input>
      </ion-item>
      <button ion-button (click)="Submit()" [disabled]="!registerForm.valid">確認</button>
      <button ion-button clear (click)="cancel()">取消</button>
     </form>     
  </ion-list>
</ion-content>

`
})


export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  warningsEmail = false;
  constructor(private toastCtrl: ToastController, public platform: Platform, public params: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController, public http: Http, public alertCtrl: AlertController) {
  }
  ngOnInit(): any {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl()
    });
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, this.emailValidator.bind(this)]],
      'password': ['', [Validators.required, this.passwordValidator.bind(this)]],
      'username': ['', Validators.required]
    });
  }

  Submit() {
    let data = '{"email": "' + this.registerForm.controls.email.value + '","password": "' + this.registerForm.controls.password.value + '","username": "' + this.registerForm.controls.username.value + '"}';
    this.http.post("http://140.123.175.96:8080/tsoc/register.php", data)
      .map(res => res.json())
      .subscribe(data => {
        let repeat = data.user;
        if (repeat == "finish") {
          this.viewCtrl.dismiss();
          let prompt = this.alertCtrl.create({
            title: '信箱驗證',
            message: "請您至註冊的電子信箱收取'驗證碼'",
            inputs: [
              {
                name: 'ans',
                placeholder: '請輸入驗證碼'
              },
            ],
            buttons: [
              {
                text: '關閉',
                handler: data => {
                }
              },
              {
                text: '確認',
                handler: data => {
                  let ans = '{"email": "' + this.registerForm.controls.email.value + '","ans": "' + data.ans + '"}';
                  this.http.post("http://140.123.175.96:8080/tsoc/chmail.php", ans)
                    .map(res => res.json())
                    .subscribe(data => {
                      let account = data.accounts;
                      if (account == "same") {
                        let toast = this.toastCtrl.create({
                          message: '驗證成功',
                          duration: 2000,
                          position: 'middle'
                        });

                        toast.present(toast);
                        this.viewCtrl.dismiss();
                      } else if (account == "diff") {
                        let toast = this.toastCtrl.create({
                          message: '驗證碼錯誤',
                          duration: 2000,
                          position: 'middle'
                        });

                        toast.present(toast);

                      }
                    });
                }
              }]
          });
          prompt.present();

        } else if (repeat == "repeat") {
          this.viewCtrl.dismiss();
          let prompt = this.alertCtrl.create({
            title: '該信箱已存在',
            message: '如果是忘記密碼，請點選"忘記密碼"的按鈕。',
            buttons: [
              {
                text: '了解',
                handler: data => {
                }
              }
            ]
          });
          prompt.present();
        }
      }, error => {
        console.log(error);
      });

  }

  passwordValidator(control: FormControl, e): { [s: string]: boolean } {
    let nonAlphaChars = /[^a-zA-Z]/;
    let nonNumericChars = /[^0-9]/;
    if (!/^[A-Za-z0-9]{6,16}$/.test(control.value)) {
      this.warningsEmail = true;
      return { invalidEmail: true };
    }
  }

  emailValidator(control: FormControl, e): { [s: string]: boolean } {
    if (!/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/.test(control.value)) {
      return { invalidEmail: true };
    }
  }


  cancel() {
    this.viewCtrl.dismiss();
  }
}



@Component({
  selector: 'page-forget',
  template: `
<ion-content class="mymodal">
<ion-list class = "liststyle">
    <form [formGroup]="forgetForm">    
      <ion-item>
        <ion-label color="dark" stacked>Email</ion-label>
        <ion-input [value]="email" formControlName="email" type="email" id="email" spellcheck="false" autocapitalize="off">
        </ion-input>
      </ion-item>
      <button ion-button (click)="Submit()" [disabled]="!forgetForm.valid">確認</button>
      <button ion-button clear (click)="cancel()">取消</button>
     </form> 
  </ion-list>
</ion-content>

`
})



export class ForgetPage implements OnInit {
  code;

  forgetForm: FormGroup;
  warningsEmail = false;
  ans_ckword = "";
  constructor(public platform: Platform, public params: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController, public http: Http, public alertCtrl: AlertController) {
  this.createCode();
}
  ngOnInit(): any {
    this.forgetForm = new FormGroup({
      email: new FormControl(),
      captcha: new FormControl(),
    });
    this.forgetForm = this.formBuilder.group({
      'email': ['', [Validators.required, this.emailValidator.bind(this)]]
    });
  }

  createCode() {
    this.code = "";
    var codeLength = 6; //验证码的长度
    var checkCode = document.querySelector("#checkCode");
    var codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) {
      var charNum = Math.floor(Math.random() * 52);
      this.code += codeChars[charNum];
    }
    if (checkCode) {
      checkCode.className = "code";
      checkCode.innerHTML = this.code;
    }
  }
  validateCode() {
    // var inputCode = document.getElementById("inputCode").value;
    var inputCode = "";
    if (inputCode.length <= 0) {
      alert("请输入验证码！");
    }
    else if (inputCode.toUpperCase() != this.code.toUpperCase()) {
      alert("验证码输入有误！");
      this.createCode();
    }
    else {
      alert("验证码正确！");
    }
  }

  Submit() {
    let data = '{"email": "' + this.forgetForm.controls.email.value + '","inputCode": "' + this.forgetForm.controls.inputCode.value + '"}';
    // console.log(data);
    this.http.post("http://140.123.175.96:8080/tsoc/forgetpw.php", data)
      .subscribe(data => {
      }, error => {
        console.log(error);
      });
    this.viewCtrl.dismiss();
  }

  passwordValidator(control: FormControl, e): { [s: string]: boolean } {
    let nonAlphaChars = /[^a-zA-Z]/;
    let nonNumericChars = /[^0-9]/;
    if (!/^[A-Za-z0-9]{6,16}$/.test(control.value)) {
      this.warningsEmail = true;
      return { invalidEmail: true };
    }
  }

  emailValidator(control: FormControl, e): { [s: string]: boolean } {
    if (!/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/.test(control.value)) {
      return { invalidEmail: true };
    }
  }


  cancel() {
    this.viewCtrl.dismiss();
  }
}