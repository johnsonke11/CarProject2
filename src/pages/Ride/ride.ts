import { Component, ViewChild, ElementRef, PACKAGE_ROOT_URL } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import {} from '@agm/core';
import { GeocodeService } from '../geocodeservices/geocode.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { ride } from '../../models/ride.interface';
@Component({
  selector: 'page-ride',
  templateUrl: 'ride.html'
})
export class RidePage {
  //Database Variables
  ridesCollectionRef: AngularFirestoreCollection<ride>;
  rides: Observable<ride[]>;
  //GPS Variables
  public startlocation = 
  {lat: 0, 
    lng: 0};
  public endlocation = { lat: 0, lng: 0 };
  startaddress: ""; n
  endaddress: "";
  //Other Variables
  loading: boolean;
  name = "";

  //Constructor gets the rides table from the database as well as getting the persons name from storage
  constructor(public navCtrl: NavController, private _geoloc: Geolocation, private geocodeService: GeocodeService, private storage: Storage, private afs: AngularFirestore) {
    this.ridesCollectionRef = this.afs.collection<ride>('rides');
    this.rides = this.ridesCollectionRef.valueChanges();
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

  //On app load
  ionViewDidLoad(){


    this.initMap()
  }
  //Sets the map to current location
  initMap(){
 
    this._geoloc.getCurrentPosition().then((resp) => {
      this.startlocation.lat = resp.coords.latitude;
      this.startlocation.lng = resp.coords.longitude;
      }); 
  }
  //Changes map to whatever address user puts in. Turns address into gps coordinates via Geocode
  updateStartAddress(){
    this.loading= true;
    this.geocodeService.geocodeAddress(this.startaddress)
    .subscribe(
      location => {
        this.startlocation = location;
        this.loading = false; 
      }      
    );  
  }
  //Turns Start/end address into gps coordinates via Geocode puts the start and puts them into the database as
  //Puts the name and address as well as the time the ride was scheduled 
  startRide(){
    this.loading = true;
    if (this.startaddress != "") {
      this.geocodeService.geocodeAddress(this.startaddress)
        .subscribe(
          location => {
            this.startlocation = location;
            this.loading = false;
          }
        );
    }
    this.loading = true;
    this.geocodeService.geocodeAddress(this.endaddress)
    .subscribe(
      location => {
        this.endlocation = location;
        this.loading = false; 
      }      
    );
    const startcord = new firebase.firestore.GeoPoint(this.startlocation.lat, this.startlocation.lng);
    const mydate = new Date().toLocaleDateString();
    const endcord = new firebase.firestore.GeoPoint(this.endlocation.lat, this.endlocation.lng);
    var distancekm = this.calcdistance();
    var distancemiles = distancekm * 0.62137119;
    var money = .9 * distancemiles;
    console.log(this.name);
    this.ridesCollectionRef.add({ personname: this.name, startpoint: startcord, endpoint: endcord, startaddress: this.startaddress, endaddress: this.endaddress, passenger: "", passenger2: "", timestart: mydate, cost: money });
    alert("Ride From " + this.startaddress + " to " + this.endaddress + " planned. Total miles/km: " + distancemiles + "/" + distancekm + " Cost: " + money);

  }
  calcdistance() {
    const earthRadiuskm = 6371;

    var dlat = this.degreesToRadians(this.endlocation.lat - this.startlocation.lat);
    var dlon = this.degreesToRadians(this.endlocation.lng - this.endlocation.lng);

    var lat1 = this.degreesToRadians(this.startlocation.lat)
    var lat2 = this.degreesToRadians(this.endlocation.lat)

    var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return earthRadiuskm * c;
   

  }
  degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
  }

}
