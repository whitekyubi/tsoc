import { OnInit, Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ModalController, ViewController, Platform } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http, private geolocation: Geolocation,
    public modalCtrl: ModalController, public storage: Storage, public alertCtrl: AlertController) {
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
        if (this.user != "") {
          this.storage.set('user', this.user);
          this.is_login = true;
          if(this.user.picture==""){
            this.user.picture="assets/nopicture.jpg";
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
          this.lat = 23.561944;
          this.lng = 120.474722;
        });
      }, error => {
        console.log(error);
      });
  }
  ionViewWillEnter() {
    if(this.user!=""){
      this.load();
      console.log("load");
    }
  }
  load(){
    let data = '{"email": "' + this.user.email + '","uid": "' + this.user.uid + '"}';
    this.http.post("http://140.123.175.96:8080/tsoc/loginagain.php", data)
      .map(res => res.json())
      .subscribe(data => {
        this.user = data.user;
          this.storage.set('user', this.user);
          if(this.user.picture==""){
            this.user.picture="assets/nopicture.jpg";
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
    this.storage.remove("users");
    this.user="";
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
      <ion-item>
        <ion-label color="dark" stacked>暱稱</ion-label>
        <ion-input [value]="username" formControlName="username" type="username" id="username" spellcheck="false" autocapitalize="off">
        </ion-input>
      </ion-item>
      <button ion-button (click)="Submit()">確認</button>
      <button ion-button clear (click)="cancel()">取消</button>
     </form>     
  </ion-list>
</ion-content>

`
})


export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(public platform: Platform, public params: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController, public http: Http, public alertCtrl: AlertController) {
  }
  ngOnInit(): any {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl()
    });
    this.registerForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'username': ['', Validators.required]
    });
  }

  Submit() {
    let data = '{"email": "' + this.registerForm.controls.email.value + '","password": "' + this.registerForm.controls.password.value + '","username": "' + this.registerForm.controls.username.value + '"}';
    // console.log(data);
    this.http.post("http://140.123.175.96:8080/tsoc/register.php", data)
      .subscribe(data => {
      }, error => {
        console.log(error);
      });
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}