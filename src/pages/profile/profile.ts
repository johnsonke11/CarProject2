import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { EditProfilePage } from '../editprofile/editprofile';
import { EditpaymentPage } from '../editpayment/editpayment';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
@Injectable()
export class ProfilePage {

  public person = {
    name: "",
    phonenumber: ""
  }
  public payment = {
    cardnumber: "",
    paypal: "",
    publiccardnum: "***",
    type: ""
  }
  paymentobj: ""
  constructor(public navCtrl: NavController, private storage: Storage) {

  }
  // Gets Name and phone number from Storage
  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('name').then((val) => {
      if (val === null) {
        this.person.name = ""
      } else {
        this.person.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
    this.storage.get('phonenumber').then((val) => {
      if (val === null) {
        this.person.phonenumber = ""
      } else {
        this.person.phonenumber = val;
      }
    }).catch((err) => {
      console.log(err)
      });
    this.storage.get('cardnumber').then((val) => {
      if (val === null) {
        this.payment.cardnumber = ""
      } else {
        this.payment.cardnumber = val;
        if (this.payment.cardnumber.startsWith("2", 1) || this.payment.cardnumber.startsWith("5", 1)) {
          this.payment.type = "Mastercard";
        }
        else if (this.payment.cardnumber.startsWith("3", 1)) {
          this.payment.type = "American Express";
        }
        else if (this.payment.cardnumber.startsWith("4", 1)) {
          this.payment.type = "Visa";
        }
        else if (this.payment.cardnumber.startsWith("6", 1)) {
          this.payment.type = "Discover";
        }
        this.payment.publiccardnum = this.payment.publiccardnum + this.payment.cardnumber.substring(13,16)
      }
    }).catch((err) => {
      console.log(err)
      });
    this.storage.get('paypal').then((val) => {
      if (val === null) {
        this.payment.paypal= ""
      } else {
        this.payment.paypal = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }
  goToEdit()
  {
    this.navCtrl.push(EditProfilePage)
  }
  goToPayment() {
    this.navCtrl.push(EditpaymentPage)
  }
  


}
