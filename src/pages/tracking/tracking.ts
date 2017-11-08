import { Component, ApplicationRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { DeviceInterface } from '../../model/DeviceInterface';
import { StationInterface } from "../../model/StationInterface";
import { ApiProvider } from "../../providers/api/api";
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IBeacon } from '@ionic-native/ibeacon';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import moment from 'moment';


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
  private notificationsPage = NotificationsPage;
  private device : DeviceInterface;

  // private attendance: AttendanceInterface;
  // private section: SectionInterface;
  private stations: Array<StationInterface>;

  private beaconRegion: any;
  private counter: number;
  private messageCount: number;

  private page: {
    avatarUrl: string,
    accountUsername: string,
    deviceModel: string,
    checkInStation: string,
    checkInDate: string,
    checkOutStation: string,
    checkOutDate: string,
    trackingType: string,
    sectionName: string,
    trackingDate: string,
    trackingAgo: string
  };

  constructor(public navCtrl: NavController, private api: ApiProvider, private toastCtrl: ToastController, public navParams: NavParams, private storage: Storage, private ibeacon: IBeacon, private backgroundMode: BackgroundMode, private ar : ApplicationRef, private push: Push) {
    this.navCtrl = navCtrl;
    this.navParams = navParams;
    this.page = {
      avatarUrl: "",
      accountUsername: "No Name",
      deviceModel: "",
      checkInStation: "Not check In",
      checkInDate: "no record",
      checkOutStation: "Not check Out",
      checkOutDate: "no record",
      trackingType: "",
      sectionName: "",
      trackingDate: "no record",
      trackingAgo: "no record"
    };
    this.device = null;
    this.stations = [];
    this.counter = 5;
    this.messageCount = 0;
  }

  ionViewDidLoad() {
    this.checkLogin(() => {
      this.processDeviceData();
      this.beaconScanning();
      this.getBeaconRegion();
      this.pushInit();
    }, () => {
      this.logout();
    });
  }

  private pushInit = function() {
    try {
      this.push.hasPermission().then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });
      const options: PushOptions = {
        android: {},
        ios: {
          alert: true,
          badge: true,
          sound: true
        },
        windows: {},
        browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      };
      const pushObject: PushObject = this.push.init(options);
      pushObject.on('notification').subscribe((notification: any) => {
        // console.log('Received a notification', JSON.stringify(notification));
        this.storeNotification(notification);
      });
      pushObject.on('registration').subscribe((registration: any) => {
        // console.log('Device registered', JSON.stringify(registration));
        this.updatePushToken(registration);
      });
      pushObject.on('error').subscribe((error) => {
        console.error('Error with Push plugin', error);
      });
    } catch(e) {
      console.log(e);
    }
  };

  private loadNotifications = function() {
    this.storage.get('SMRT_NOTIFICATIONS').then((val) => {
      console.log('SMRT_NOTIFICATIONS', val);
      if(val) {
        this.messageCount = val.length;
      } else {
        this.messageCount = 0;
      }
    });
  };

  private storeNotification = function(data) {
    let topic = {
      topicId: data.additionalData.topicId,
      title: data.title,
      content: data.message,
      needReply: data.additionalData.needReply,
      acceptText: data.additionalData.acceptText,
      rejectText: data.additionalData.rejectText,
      author: data.additionalData.author,
      avatar: data.additionalData.avatar
    };
    this.storage.get('SMRT_NOTIFICATIONS').then((val) => {
      console.log('SMRT_NOTIFICATIONS', val);
      if(val) {
        val.push(topic);
        this.messageCount = val.length + 1;
        this.storage.set('SMRT_NOTIFICATIONS', val);
      } else {
        let notifications = [topic];
        this.messageCount = 1;
        this.storage.set('SMRT_NOTIFICATIONS', notifications);
      }
    });
  };

  private updatePushToken = function(registration) {
    let input = {
      secret: registration.registrationType,
      token: registration.registrationId
    };
    this.api.sendRequest("DeviceToken", this.device.deviceId, null, input, (res) => {
      console.log("this.deviceToken", res);
    }, (err) => {
      this.presentToast(err);
    });
  };

  private beaconScanning = function() {
    try {
      this.backgroundMode.enable();
      this.ibeacon.requestAlwaysAuthorization();
      let delegate = this.ibeacon.Delegate();
      delegate.didRangeBeaconsInRegion().subscribe((data) => {
        // console.log('didRangeBeaconsInRegion: ', JSON.stringify(data));
        this.sendBeaconRecords(data.beacons);
        // this.ar.tick();
      }, (error) => {
        console.error();
      });
      delegate.didStartMonitoringForRegion().subscribe((data) => {
        console.log('didStartMonitoringForRegion: ', data);
      }, (error) => {
        console.error();
      });
      delegate.didEnterRegion().subscribe((data) => {
        console.log('didEnterRegion: ', data);
      });
    } catch(e) {
      console.log(e);
    }
  };

  private presentToast = function(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  };

  private processDeviceData = function() {
    if(this.device.account) {
      this.page.deviceModel = this.device.model;
      this.page.accountUsername = this.device.account.username;
      if(this.device.account.avatar) {
        this.page.avatarUrl = this.device.account.avatar.url;
      } else {
        this.page.avatarUrl = "";
      }
      if(this.device.account.attendance) {
        if(this.device.account.attendance.checkInStation) {
          this.page.checkInStation = this.device.account.attendance.checkInStation.name;
        } else {
          this.page.checkInStation = "Not check In";
        }
        if(this.device.account.attendance.checkInDate) {
          this.page.checkInDate = this.device.account.attendance.checkInDate;
        } else {
          this.page.checkInDate = "no record";
        }
        if(this.device.account.attendance.checkOutStation) {
          this.page.checkOutStation = this.device.account.attendance.checkOutStation.name;
        } else {
          this.page.checkOutStation = "Not check Out";
        }
        if(this.device.account.attendance.checkOutDate) {
          this.page.checkOutDate = this.device.account.attendance.checkOutDate;
        } else {
          this.page.checkOutDate = "no record";
        }
      } else {
        this.page.checkInStation = "Not check In";
        this.page.checkInDate = "no record";
        this.page.checkOutStation = "Not check Out";
        this.page.checkOutDate = "no record";
      }
      if(this.device.account.tracking) {
        this.page.trackingType = this.device.account.tracking.type;
        if(this.device.account.tracking.section) {
          this.page.sectionName = this.device.account.tracking.section.name;
        } else {
          this.page.sectionName = "";
        }
        this.page.trackingDate = this.device.account.tracking.date;
        this.page.trackingAgo = this.formatDate(this.device.account.tracking.date);
        if(this.device.account.tracking.stations) {
          this.stations = this.device.account.tracking.stations;
        } else {
          this.stations = [];
        }
      } else {
        this.page.trackingType = "";
        this.page.sectionName = "";
        this.page.trackingDate = "no record";
        this.page.trackingAgo = "no record";
        this.stations = [];
      }
    } else {
      this.page.avatarUrl = "";
      this.page.accountUsername = "No Name";
      this.page.deviceModel = "";
      this.page.checkInStation = "Not check In";
      this.page.checkInDate = "no record";
      this.page.checkOutStation = "Not check Out";
      this.page.checkOutDate = "no record";
      this.page.trackingType = "";
      this.page.sectionName = "";
      this.page.trackingDate = "no record";
      this.page.trackingAgo = "no record";
      this.stations = [];
    }
    this.ar.tick();
  };

  private getBeaconRegion = function() {
    this.api.sendRequest("BeaconRegion", -1, null, null, (res) => {
      // console.log("this.region", res);
      let uuid = res.uuid;
      let major = res.major;
      if(major) {
        this.beaconRegion = this.ibeacon.BeaconRegion('SMRT_BEACONS', uuid, major, undefined, true);
      } else {
        this.beaconRegion = this.ibeacon.BeaconRegion('SMRT_BEACONS', uuid, undefined, undefined, true);
      }
      try {
        this.ibeacon.startMonitoringForRegion(this.beaconRegion).then(() => {
          console.log('Native layer recieved the request to monitoring');
        }, (error) => {
          console.error('Native layer failed to begin monitoring: ', error);
        });
        this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion).then(() => {
          console.log('Native layer recieved the request to ranging');
        }, (error) => {
          console.error('Native layer failed to begin ranging: ', error);
        });
      } catch(e) {
        console.log(e);
      }
    }, (err) => {
      this.presentToast(err);
    });
  };

  private sendBeaconRecords = function(beacons) {
    // console.log("beacons", JSON.stringify(beacons));
    if(this.counter == 5) {
      this.counter = 0;
      this.loadNotifications();
      this.syncMobile();
    }
    this.counter += 1;
    let inputBeacons = [];
    for(var o in beacons) {
      let beacon = beacons[o];
      inputBeacons.push({
        uuid: beacon.uuid,
        major: beacon.major,
        minor: beacon.minor,
        distance: beacon.accuracy
      });
    }
    let input = {
      deviceId: this.device.deviceId,
      beacons: inputBeacons
    };
    this.api.sendRequest("BeaconRecord", -1, null, input, (res) => {
      console.log("BeaconRecord", res);
    }, (err) => {
      // this.presentToast(err);
    });
    this.processDeviceData();
  };

  private syncMobile = function() {
    let input = {
      name: this.device.name
    };
    console.log(input);
    this.api.sendRequest("SyncDevice", -1, null, input, (res) => {
      if(res.account) {
        this.device = res;
        // this.storage.set('SMRT_DEVICE', this.device);
        // this.processDeviceData();
      } else {
        this.presentToast("This device has not link to account!");
        this.logout();
      }
    }, (err) => {
      this.presentToast(err);
    });
  };

  private goNotificationsPage = function(): void{
    if(this.messageCount) {
      this.navCtrl.push(this.notificationsPage);
    }
  };

  private logout = function() : void {
    this.storage.remove('SMRT_DEVICE').then((val) => {
      try {
        this.backgroundMode.disable();
        this.ibeacon.stopMonitoringForRegion(this.beaconRegion).then(() => {
          console.log('Native layer recieved the request to stop monitoring');
        }, (error) => {
          console.error('Native layer failed to stop monitoring: ', error);
        });
        this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion).then(() => {
          console.log('Native layer recieved the request to stop ranging');
        }, (error) => {
          console.error('Native layer failed to stop ranging: ', error);
        });
      } catch(e) {
        console.log(e);
      }
      this.navCtrl.pop();
    });
  };

  ionViewWillLeave() {
    try {
      this.backgroundMode.disable();
      this.ibeacon.stopMonitoringForRegion(this.beaconRegion).then(() => {
        console.log('Native layer recieved the request to stop monitoring');
      }, (error) => {
        console.error('Native layer failed to stop monitoring: ', error);
      });
      this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion).then(() => {
        console.log('Native layer recieved the request to stop ranging');
      }, (error) => {
        console.error('Native layer failed to stop ranging: ', error);
      });
    } catch(e) {
      console.log(e);
    }
  }

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

  private formatDate = function(date: string): string {
    let diff = moment().diff(date, 'seconds');
		if(diff < 60) {
			return diff + " secs";
		} else if(diff < 3600) {
			let min = Math.floor(diff / 60);
			let sec = diff % 60;
			return min + " mins " + sec + " secs";
		} else if(diff < 86400) {
			let hr = Math.floor(diff / 3600);
			let rem = diff % 3600;
			let min = Math.floor(rem / 60);
			let sec = rem % 60;
			return hr + " hrs " + min + " mins " + sec + " secs";
		} else {
			let d = Math.floor(diff / 86400);
			return d + " days";
		}
  };
}
