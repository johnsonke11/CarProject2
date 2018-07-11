import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { ride } from '../../models/ride.interface';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ridesCollectionRef: AngularFirestoreCollection<ride>;
  ridesCollectionRef2: AngularFirestoreCollection<ride>;
  ridesCollectionRef3: AngularFirestoreCollection<ride>;
  rides: Observable<ride[]>;
  rides2: Observable<ride[]>;
  rides3: Observable<ride[]>;
  name = "";
  constructor(public navCtrl: NavController, private storage: Storage, private afs: AngularFirestore, private _geoloc: Geolocation) {
    
  }
  public location =
    {
      startlat: 0,
      startlng: 0,
      endlat: 0,
      endlng: 0
    };
  ionViewDidLoad() {
    this.storage.get('name').then((val) => {
      if (val === null) {
        this.name = ""
      } else {
        this.name = val;
      }
      this.ridesCollectionRef = this.afs.collection<ride>('rides', ref => ref.where('personname', '==', this.name));
      this.rides = this.ridesCollectionRef.valueChanges();
      this.ridesCollectionRef2 = this.afs.collection<ride>('rides', ref => ref.where('passenger', '==', this.name));
      this.rides2 = this.ridesCollectionRef2.valueChanges();
      this.ridesCollectionRef3 = this.afs.collection<ride>('rides', ref => ref.where('passenger2', '==', this.name));
      this.rides3 = this.ridesCollectionRef3.valueChanges();
    }).catch((err) => {
      console.log(err)
    });
    console.log(this.name + "Hi")
    this.getcords();
    
    
  }
  getcords() {
    this._geoloc.getCurrentPosition().then((resp) => {
      this.location.startlat = resp.coords.latitude;
      this.location.startlng = resp.coords.longitude;
      const lat = 0.0144927536231884;
      const lon = 0.0181818181818182;
      const miles = 1;
      this.location.endlat = this.location.startlat + (this.location.startlat * lat * miles);
      this.location.endlng = this.location.startlng + (this.location.startlng * lon * miles);
      this.location.startlat = this.location.startlat - (this.location.startlat * lat * miles);
      this.location.startlng = this.location.startlng - (this.location.startlat * lat * miles);
    }); 
  }
  ionViewWillLeave(){
  this.storage.set('cords', JSON.stringify(this.location)).then(() => console.log(this.location.startlat))
  }

}
