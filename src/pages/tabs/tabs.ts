import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { RidePage } from '../ride/ride';
import { HomePage } from '../home/home';
import { NearbyridesPage } from '../nearbyrides/nearbyrides';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = RidePage;
  tab4Root = NearbyridesPage;

  constructor() {

  }
}
