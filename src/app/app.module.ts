import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { ProfilePage } from '../pages/profile/profile';
import { RidePage } from '../pages/ride/ride';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { GeocodeService } from '../pages/geocodeservices/geocode.service'
import { GoogleMaps } from "@ionic-native/google-maps";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage'
import { EditProfilePage } from '../pages/editprofile/editprofile';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NearbyridesPage } from '../pages/nearbyrides/nearbyrides';
import { EditpaymentPage } from '../pages/editpayment/editpayment'
export const firebaseConfig = {
  apiKey: "AIzaSyDPtBlzCErEwpmxWyg5-86HawwtVS_Yg-o",
  authDomain: "rideshare-209404.firebaseapp.com",
  databaseURL: "https://rideshare-209404.firebaseio.com",
  projectId: "rideshare-209404",
  storageBucket: "rideshare-209404.appspot.com",
  messagingSenderId: "904582080372"
};
@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    RidePage,
    HomePage,
    TabsPage,
    NearbyridesPage,
    EditProfilePage,
    EditpaymentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFXfx4DweMo0sfm0qXOFvfKKnrsypmjPY'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    RidePage,
    HomePage,
    TabsPage,
    EditProfilePage,
    NearbyridesPage,
    EditpaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeocodeService,
  ]
})
export class AppModule {}
