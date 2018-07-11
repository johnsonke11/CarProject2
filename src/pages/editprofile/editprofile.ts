import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditProfilePage {

  public person = {
    name: "",
    phonenumber: ""
  }

  constructor(public navCtrl: NavController, private storage: Storage) {

  }
  //Adds Persons phone number and name into storage
  addperson() {
    this.storage.set('name', this.person.name).then(() => alert("Changed name to" + this.person.name))
    this.storage.set('phonenumber', this.person.phonenumber).then(() => alert("Changed phone number to" + this.person.phonenumber))
    this.navCtrl.push(ProfilePage)
  }
  

}
