import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'; //儲存登入紀錄
/**
 * Generated class for the MenuDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu-detail',
  templateUrl: 'menu-detail.html',
})
export class MenuDetailPage {
  title: any;
  option: any;
  gameProgress: any;
  storyScript: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
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
    }
  }

  ionViewDidLoad() {
    switch (this.option) {
    	case "story":
    		this.title = "劇情回顧";
        this.storage.get('gameProgress').then((value) => {
          this.gameProgress = value;
          console.log((this.gameProgress.start));
        });
    		break;
    	case "item":
    		this.title = "物品欄";
    		break;
    	case "hint":
    		this.title = "提示";
    		break;
    }
  }

  getStoryScript(gameProgress){
    if(gameProgress.start = 1){
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
  }


}
