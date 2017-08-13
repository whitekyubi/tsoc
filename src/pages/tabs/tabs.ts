import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Login } from '../login/login';
import { HistoryPage } from '../history/history';
import { GameListPage } from '../game-list/game-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GameListPage;
  tab3Root = Login;
  tab4Root = HistoryPage

  constructor() {

  }
}
