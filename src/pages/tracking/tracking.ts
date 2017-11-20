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
import { LocalNotifications } from '@ionic-native/local-notifications';

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

  private beaconHisMap: any;

  constructor(public navCtrl: NavController, private api: ApiProvider, private toastCtrl: ToastController, public navParams: NavParams, private storage: Storage, private ibeacon: IBeacon, private backgroundMode: BackgroundMode, private ar : ApplicationRef, private push: Push, private localNotifications: LocalNotifications) {
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
    this.beaconHisMap = {};
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    console.log("view did enter", "tracking");
    this.checkLogin(() => {
      this.loadNotifications();
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
        android: {
          sound: true,
          vibrate: true,
        },
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
        console.log('Received a notification', JSON.stringify(notification));
        this.storeNotification(notification);
      });
      pushObject.on('registration').subscribe((registration: any) => {
        console.log('Device registered', JSON.stringify(registration));
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
    console.log("storeNotification data", data);
    let topic = {
      topicId: Number(data.additionalData.topicId),
      title: data.title,
      content: data.message,
      needReply: data.additionalData.needReply,
      acceptText: data.additionalData.acceptText,
      rejectText: data.additionalData.rejectText,
      author: data.additionalData.author,
      avatar: data.additionalData.avatar
    };
    if(typeof(topic.needReply) == 'string') {
      topic.needReply = topic.needReply == 'true';
    }
    // console.log("topic", topic);
    this.storage.get('SMRT_NOTIFICATIONS').then((val) => {
      console.log('SMRT_NOTIFICATIONS', val);
      if(val) {
        this.messageCount = val.length;
        let isExist = false;
        for(var o in val) {
          if(val[o].topicId == topic.topicId) {
            isExist = true;
          }
        }
        if(!isExist) {
          val.push(topic);
          this.messageCount += 1;
          this.storage.set('SMRT_NOTIFICATIONS', val);
        }
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
      this.presentToast("DeviceToken: " + err);
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
          let newSectionName = this.device.account.tracking.section.name;
          if(this.page.sectionName != newSectionName) {
            // Section changed!
            let title = "Zone Change";
            let text = `You are entering ${this.page.trackingType} ${newSectionName}!`;
            this.alertNotification(title, text);
          }
          this.page.sectionName = newSectionName;
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
      this.presentToast("BeaconRegion: " + err);
    });
  };

  private sendBeaconRecords = function(beacons) {
    // testing
    // beacons.push({
    //   "minor":30,
    //   "rssi":0,
    //   "major":10,
    //   "proximity":"ProximityFar",
    //   "accuracy":-1,
    //   "uuid":"B9407F30-F5F8-466E-AFF9-25556B57FE5A"
    // }, {
    //   "minor":40,
    //   "rssi":0,
    //   "major":10,
    //   "proximity":"ProximityFar",
    //   "accuracy":-1,
    //   "uuid":"B9407F30-F5F8-466E-AFF9-25556B57FE5A"
    // }, {
    //   "minor":50,
    //   "rssi":0,
    //   "major":10,
    //   "proximity":"ProximityFar",
    //   "accuracy":-1,
    //   "uuid":"B9407F30-F5F8-466E-AFF9-25556B57FE5A"
    // });
    // end of testing
    if(this.counter == 5) {
      this.counter = 0;
      this.loadNotifications();
      this.syncMobile();
    }
    this.counter += 1;
    let inputBeacons = [];
    // TODO buffer!!
    for(var o in beacons) {
      let beacon = beacons[o];
      let bd = {
        uuid: beacon.uuid.toUpperCase(),
        major: Number(beacon.major),
        minor: Number(beacon.minor),
        distance: Number(beacon.accuracy)
      };
      // if(bd.distance == -1) {
      //   let distance = this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`];
      //   if(distance) {
      //     if(distance < 50) {
      //       bd.distance = distance;
      //       this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`] = distance + 5;
      //     }
      //   }
      // } else {
      //   this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`] = bd.distance;
      // }
      // inputBeacons.push(bd);
      if(bd.distance == -1) {
        let distances = this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`];
        if(distances) {
          if(distances.length > 0) {
            let distance = distances[distances.length - 1];
            this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`].push(distance + 8);
            if(this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`].length > 8) {
              this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`].shift();
            }
          }
        }
      } else {
        let distances = this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`];
        if(distances) {
          this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`].push(bd.distance);
          if(this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`].length > 8) {
            this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`].shift();
          }
        } else {
          this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`] = [bd.distance];
        }
      }
      // averaging!
      let distances = this.beaconHisMap[`${bd.uuid}_${bd.major}_${bd.minor}`];
      if(distances) {
        if(distances.length) {
          let sum = 0;
          for(var o in distances) {
            let d = distances[o];
            sum += d;
          }
          bd.distance = sum / distances.length;
          // console.log("arr", JSON.stringify(distances));
          // console.log("bd", JSON.stringify(bd));
          inputBeacons.push(bd);
        }
      }
    }
    let finalBeacons = [];
    let keys = Object.keys(this.beaconHisMap);
    // console.log("inputBeacons", JSON.stringify(inputBeacons));
    // console.log("this.beaconHisMap", JSON.stringify(this.beaconHisMap));
    for(var o in keys) {
      let k = keys[o];
      let v = this.beaconHisMap[k];
      let newRec = false;
      for(var p in inputBeacons) {
        let bd = inputBeacons[p];
        let bk = `${bd.uuid}_${bd.major}_${bd.minor}`;
        if(bk == k) {
          newRec = true;
          break;
        }
      }
      if(!newRec) {
        if(v.length) {
          this.beaconHisMap[k].shift();
        }
      }
      // console.log("beacon history", k, v, newRec);
      if(v.length) {
        let sum = 0;
        for(var p in v) {
          let d = v[p];
          sum += d;
        }
        // console.log("average", sum, v.length);
        finalBeacons.push({
          uuid: k.split("_")[0],
          major: Number(k.split("_")[1]),
          minor: Number(k.split("_")[2]),
          distance: sum / v.length
        });
      }
    }
    // console.log("finalBeacons", finalBeacons);
    let input = {
      deviceId: this.device.deviceId,
      beacons: finalBeacons
    };
    // end buffer!!
    console.log("Input", input);
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
      this.presentToast("SyncDevice: " + err);
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
    console.log("view will leave", "tracking");
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

  private alertNotification = function(title: string, text: string) {
    this.localNotifications.schedule({
      id: new Date().getTime(),
      title: title,
      text: text,
      sound: 'file://beep.caf',
      data: {}
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