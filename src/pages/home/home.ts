import { Component} from '@angular/core';
// import {Page} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { TrackingPage } from '../tracking/tracking';
import { AccountInterface } from '../../model/AccountInterface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  trackingPage = TrackingPage;
  un: number;
  pwd : string;
  account : AccountInterface;
  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
    this.account = {
      accountID : 13,
      username : "myself",
      pwdSalt : "pwdSalt",
      pwdHash : "pwdHash",
      avatar: {
        url: "images/me.jpg"
      },
      type: "accountType",
      active: "A",
      date: "loginDate"
    }
  }
  login(){
    if(this.un == this.account.accountID){
      this.navCtrl.push(this.trackingPage, {
        url: this.account.avatar.url,
        date: this.account.date,
        username : this.account.username
      });

    }
 	}
}
