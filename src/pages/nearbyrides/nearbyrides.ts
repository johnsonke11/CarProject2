import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { ride } from '../../models/ride.interface';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the NearbyridesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nearbyrides',
  templateUrl: 'nearbyrides.html',
})
export class NearbyridesPage {
  public location =
    {
      startlat: 0,
      startlng: 0,
      endlat: 0,
      endlng: 0
    };
  public endlocation = { lat: 0, lng: 0 };
  ridesCollectionRef: AngularFirestoreCollection<ride>;
  rides: Observable<ride[]>;
  ridesCollectionRef2: AngularFirestoreCollection<ride>;
  rides2: Observable<ride[]>;
  name = "";
  constructor(public navCtrl: NavController, private _geoloc: Geolocation, private storage: Storage, private afs: AngularFirestore) {
    this.storage.get('name').then((val) => {
      if (val === null) {
        this.name = ""
      } else {
        this.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }
  ionViewDidLoad() {
    this.storage.get('name').then((val) => {
      if (val === null) {
        this.name = ""
      } else {
        this.name = val;
      }
      this.ridesCollectionRef = this.afs.collection<ride>('rides', ref => ref.where('passenger', '==', ""));
      this.rides = this.ridesCollectionRef.valueChanges();
      this.rides = this.ridesCollectionRef.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as ride;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      });
      this.ridesCollectionRef2 = this.afs.collection<ride>('rides', ref => ref.where('passenger2', '==', ""));
      this.rides2 = this.ridesCollectionRef2.valueChanges();
      this.rides2 = this.ridesCollectionRef2.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as ride;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      });
    }).catch((err) => {
      console.log(err)
    });
    console.log(this.name + "Hi")


  }
  /*
  ionViewDidLoad() {
    this.storage.get('cords').then((val) => {
      if (val === null) {
        console.log("hi")
      } else {
        console.log(val)
        this.location = JSON.parse(val);
        
      }
      console.log(this.location.startlat)
      this.ridesCollectionRef = this.afs.collection<ride>('rides');
      this.rides = this.ridesCollectionRef.valueChanges();
      this.rides = this.ridesCollectionRef.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as ride;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      });
    }).catch((err) => {
      console.log(err)
    });
  }
  */
  
  addpassenger(ride1: ride) {
    this.ridesCollectionRef.doc(ride1.id).update({ passenger: this.name });
    alert("Joined Ride");
  }
  addpassenger2(ride1: ride) {
    this.ridesCollectionRef.doc(ride1.id).update({ passenger2: this.name });
    alert("Joined Ride");
  }
}
