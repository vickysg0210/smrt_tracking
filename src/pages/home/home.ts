import { Component} from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { TrackingPage } from '../tracking/tracking';
import { ApiProvider } from "../../providers/api/api";
import { ToastController } from 'ionic-angular';
import { DeviceInterface } from '../../model/DeviceInterface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  private trackingPage = TrackingPage;
  private device : DeviceInterface;

  constructor(private navCtrl: NavController, private api: ApiProvider, private toastCtrl: ToastController, private storage: Storage) {
    this.navCtrl = navCtrl;
    this.device = {
      deviceId: 0,
      name: "SMRTSUMS001",
      number: "",
      model: "",
      account: null,
      date : ""
    };
  }

  ionViewDidLoad() {
    this.checkLogin(() => {
      this.navCtrl.push(this.trackingPage);
    }, () => {
      // NOTHING
    });
  }

  private presentToast = function(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  };

  private login = function(){
    if(this.device.name) {
      let input = {
        name: this.device.name
      };
      console.log(input);
      this.api.sendRequest("SyncDevice", -1, null, input, (res) => {
        console.log("this.device", res);
        if(res.account) {
          this.device = res;
          this.storage.set('SMRT_DEVICE', this.device);
          this.navCtrl.push(this.trackingPage);
        } else {
          this.presentToast("This device has not link to account!");
        }
      }, (err) => {
        this.presentToast(err);
      });
    } else {
      this.presentToast("Invalid Inputs");
    }
 	};

  private checkLogin = function(success: any, fail: any) {
    this.storage.get('SMRT_DEVICE').then((val) => {
      console.log('SMRT_DEVICE', val);
      if(val) {
        this.device = val;
        if(this.device.account) {
          success();
        } else {
          fail();
        }
      }
    });
  };
}
