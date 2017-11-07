import { Component, ApplicationRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { DeviceInterface } from '../../model/DeviceInterface';
import { AttendanceInterface } from "../../model/AttendanceInterface";
import { StationInterface } from "../../model/StationInterface";
import { SectionInterface } from "../../model/SectionInterface";
import { HomePage } from '../home/home';
import { ApiProvider } from "../../providers/api/api";
import { ToastController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
import { BackgroundMode } from '@ionic-native/background-mode';

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
  private homePage = HomePage;
  private notificationsPage = NotificationsPage;
  private device : DeviceInterface;

  private attendance: AttendanceInterface;
  private section: SectionInterface;
  private stations: Array<StationInterface>;

  private beaconRegion: any;
  private counter: number;

  constructor(public navCtrl: NavController, private api: ApiProvider, private toastCtrl: ToastController, public navParams: NavParams, private storage: Storage, private ibeacon: IBeacon, private backgroundMode: BackgroundMode, private ar : ApplicationRef) {
    this.navCtrl = navCtrl;
    this.navParams = navParams;
    this.device = {
      deviceId: 0,
      name: "",
      number: "",
      model: "",
      account: {
        accountID : 0,
        username : "",
        avatar: {
          url: ""
        },
        type: "",
        active: false,
        attendance: {
          attendanceId: 0,
          checkInDate: "",
          checkInStation: {
            stationId: 0,
            name: "",
            code: "",
            color: [],
            date: ""
          },
          checkOutDate: "",
          checkOutStation: {
            stationId: 0,
            name: "",
            code: "",
            color: [],
            date: ""
          },
          date: ""
        },
        tracking: {
          trackingId: 0,
          primaryNode: {
            nodeId: 0,
            name: "",
            point: 0,
            date : ""
          },
          secondaryNode: {
            nodeId: 0,
            name: "",
            point: 0,
            date : ""
          },
          primaryDistance: 0,
          secondaryDistance: 0,
          section: {
            sectionId: 0,
            name: "",
            startNode: {
              nodeId: 0,
              name: "",
              point: 0,
              date : ""
            },
            endNode: {
              nodeId: 0,
              name: "",
              point: 0,
              date : ""
            },
            remark: "",
            date : ""
          },
          stations: [],
          date : ""
        },
        date : ""
      },
      date : ""
    };
    this.attendance = {
      attendanceId: 0,
      checkInDate: "",
      checkInStation: {
        stationId: 0,
        name: "",
        code: "",
        color: [],
        date: ""
      },
      checkOutDate: "",
      checkOutStation: {
        stationId: 0,
        name: "",
        code: "",
        color: [],
        date: ""
      },
      date: ""
    };
    this.section = {
      sectionId: 0,
      name: "",
      startNode: {
        nodeId: 0,
        name: "",
        point: 0,
        date : ""
      },
      endNode: {
        nodeId: 0,
        name: "",
        point: 0,
        date : ""
      },
      remark: "",
      date : ""
    };
    this.stations = [];
    this.counter = 5;
  }

  ionViewDidLoad() {
    this.checkLogin(() => {
      this.processDeviceData();
      this.beaconScanning();
      this.getBeaconRegion();
    }, () => {
      this.logout();
    });
  }

  private beaconScanning = function() {
    try {
      this.backgroundMode.enable();
      this.ibeacon.requestAlwaysAuthorization();
      let delegate = this.ibeacon.Delegate();
      delegate.didRangeBeaconsInRegion().subscribe((data) => {
        // console.log('didRangeBeaconsInRegion: ', JSON.stringify(data));
        this.sendBeaconRecords(data.beacons);
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
      if(this.device.account.attendance) {
        this.attendance = this.device.account.attendance;
        console.log("this.attendance", "updated");
      } else {
        this.attendance = {
          attendanceId: 0,
          checkInDate: "",
          checkInStation: {
            stationId: 0,
            name: "",
            code: "",
            color: [],
            date: ""
          },
          checkOutDate: "",
          checkOutStation: {
            stationId: 0,
            name: "",
            code: "",
            color: [],
            date: ""
          },
          date: ""
        };
      }
      if(this.device.account.tracking) {
        if(this.device.account.tracking.section) {
          this.section = this.device.account.tracking.section;
          console.log("this.section", "updated");
        } else {
          this.section = {
            sectionId: 0,
            name: "",
            startNode: {
              nodeId: 0,
              name: "",
              point: 0,
              date : ""
            },
            endNode: {
              nodeId: 0,
              name: "",
              point: 0,
              date : ""
            },
            remark: "",
            date : ""
          };
        }
        if(this.device.account.tracking.stations) {
          this.stations = this.device.account.tracking.stations;
          console.log("this.stations", "updated");
        } else {
          this.stations = [];
        }
      } else {
        this.section = {
          sectionId: 0,
          name: "",
          startNode: {
            nodeId: 0,
            name: "",
            point: 0,
            date : ""
          },
          endNode: {
            nodeId: 0,
            name: "",
            point: 0,
            date : ""
          },
          remark: "",
          date : ""
        };
        this.stations = [];
      }
    } else {
      this.attendance = {
        attendanceId: 0,
        checkInDate: "",
        checkInStation: {
          stationId: 0,
          name: "",
          code: "",
          color: [],
          date: ""
        },
        checkOutDate: "",
        checkOutStation: {
          stationId: 0,
          name: "",
          code: "",
          color: [],
          date: ""
        },
        date: ""
      };
      this.section = {
        sectionId: 0,
        name: "",
        startNode: {
          nodeId: 0,
          name: "",
          point: 0,
          date : ""
        },
        endNode: {
          nodeId: 0,
          name: "",
          point: 0,
          date : ""
        },
        remark: "",
        date : ""
      };
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
        this.processDeviceData();
      } else {
        this.presentToast("This device has not link to account!");
        this.logout();
      }
    }, (err) => {
      this.presentToast(err);
    });
  };

  private goNotificationsPage = function(): void{
    // TODO
    // console.log("Ojbect: "+topic);
    // this.navCtrl.push(this.notificationsPage, {
    //   username : this.username
    // })
  }

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
