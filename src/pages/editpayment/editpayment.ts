import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EditpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { Injectable } from '@angular/core';
@Component({
  selector: 'page-editpayment',
  templateUrl: 'editpayment.html',
})
@Injectable()
export class EditpaymentPage {

  public payment = {
    cardnumber: "",
    paypal: ""
  }
  mydate = new Date().toISOString();
  constructor(public navCtrl: NavController, private storage: Storage) {
    
  }

  changepayment() {
    this.storage.set('cardnumber', this.payment.cardnumber).then(() => console.log("added payment"))
    this.storage.set('paypal', this.payment.paypal).then(() => alert("Changed payment method"))
    this.navCtrl.push(ProfilePage)
  }
  ionViewDidLoad() {
  }

}
