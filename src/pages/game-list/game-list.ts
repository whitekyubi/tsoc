import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';
import { LocationTracker } from '../../providers/location-tracker';


@IonicPage()
@Component({
  selector: 'page-game-list',
  templateUrl: 'game-list.html',
})
export class GameListPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public locationTracker: LocationTracker) {
  }

  startGame(){
  	console.log('start game');
  	this.navCtrl.push(GamePage, {});
  }

}
