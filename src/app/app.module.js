var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ReviewPage } from '../pages/review-page/review-page';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { TabsPage } from '../pages/tabs/tabs';
import { Login, RegisterPage } from '../pages/login/login';
import { LoginDetailPage } from '../pages/login-detail/login-detail';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GameListPage } from '../pages/game-list/game-list';
import { GamePage } from '../pages/game/game';
import { MenuPage } from '../pages/menu/menu';
import { MenuDetailPage } from '../pages/menu-detail/menu-detail';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationTracker } from '../providers/location-tracker';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            AboutPage,
            ContactPage,
            HomePage,
            TabsPage,
            Login,
            RegisterPage,
            GameListPage,
            GamePage,
            MenuPage,
            MenuDetailPage,
            LoginDetailPage,
            HistoryPage,
            ReviewPage
        ],
        imports: [
            BrowserModule,
            HttpModule,
            JsonpModule,
            IonicModule.forRoot(MyApp),
            IonicStorageModule.forRoot()
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            AboutPage,
            ContactPage,
            HomePage,
            TabsPage,
            Login,
            RegisterPage,
            GameListPage,
            GamePage,
            MenuPage,
            MenuDetailPage,
            LoginDetailPage,
            HistoryPage,
            ReviewPage
        ],
        providers: [
            LocationTracker,
            StatusBar,
            SplashScreen,
            Geolocation,
            BackgroundGeolocation,
            Camera,
            FileTransfer,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map