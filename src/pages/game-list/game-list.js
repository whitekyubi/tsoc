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
import { GamePage } from '../game/game';
import { LocationTracker } from '../../providers/location-tracker';
var GameListPage = (function () {
    function GameListPage(navCtrl, navParams, locationTracker) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.locationTracker = locationTracker;
    }
    GameListPage.prototype.startGame = function () {
        console.log('start game');
        this.navCtrl.push(GamePage, {});
    };
    return GameListPage;
}());
GameListPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-game-list',
        templateUrl: 'game-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LocationTracker])
], GameListPage);
export { GameListPage };
//# sourceMappingURL=game-list.js.map