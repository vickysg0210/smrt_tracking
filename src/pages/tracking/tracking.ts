import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { AccountInterface } from '../../model/AccountInterface'
import { HomePage } from '../home/home'


/**
 * Generated class for the TrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage{
  homePage = HomePage;
  notificationsPage = NotificationsPage;
  account : AccountInterface;
  url: string;
  date: string;
  username: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl;
    this.navParams = navParams;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
    this.url = this.navParams.get('url');
    this.date=this.navParams.get('date');
    this.username = this.navParams.get('username');
  }
  goNotificationsPage(account): void{
    // console.log("Ojbect: "+topic);
    this.navCtrl.push(this.notificationsPage, {
    username : this.username
    })
  }
  logout() : void {
    this.navCtrl.pop();
  }
}
