webpackJsonp([2],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_api__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotificationsPage = (function () {
    function NotificationsPage(navCtrl, navParams, platform, storage, actionsheetCtrl, toastCtrl, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.storage = storage;
        this.actionsheetCtrl = actionsheetCtrl;
        this.toastCtrl = toastCtrl;
        this.api = api;
        this.loadNotifications = function () {
            var _this = this;
            this.storage.get('SMRT_NOTIFICATIONS').then(function (val) {
                console.log('SMRT_NOTIFICATIONS', val);
                if (val) {
                    _this.topics = val;
                }
                else {
                    _this.topics = [];
                }
            });
        };
        this.saveNotifications = function () {
            this.storage.set('SMRT_NOTIFICATIONS', this.topics);
        };
        this.presentToast = function (message) {
            var toast = this.toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        };
        this.openYNMenu = function (acceptText, rejectText) {
            var _this = this;
            var actionSheet = this.actionsheetCtrl.create({
                title: 'Canned Reply',
                cssClass: 'action-sheets-basic-page',
                buttons: [{
                        text: acceptText,
                        // role: 'destructive',
                        icon: "send",
                        handler: function () {
                            for (var o in _this.topics) {
                                var topic = _this.topics[o];
                                if (topic.topicId == _this.chosenTopicId) {
                                    _this.sendMessageRequest(acceptText, true, topic.topicId, function () {
                                        _this.topics[o].message = "Replied: " + acceptText;
                                        _this.chosenTopicId = 0;
                                        _this.saveNotifications();
                                    });
                                    break;
                                }
                            }
                        }
                    }, {
                        text: rejectText,
                        // role: 'destructive',
                        icon: "send",
                        handler: function () {
                            for (var o in _this.topics) {
                                var topic = _this.topics[o];
                                if (topic.topicId == _this.chosenTopicId) {
                                    _this.sendMessageRequest(rejectText, false, topic.topicId, function () {
                                        _this.topics[o].message = "Replied: " + rejectText;
                                        _this.chosenTopicId = 0;
                                        _this.saveNotifications();
                                    });
                                    break;
                                }
                            }
                        }
                    }, {
                        text: 'Cancel',
                        role: 'cancel',
                        icon: !this.platform.is('ios') ? 'close' : null,
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }]
            });
            actionSheet.present();
        };
        this.sendMessage = function () {
            var _this = this;
            for (var o in this.topics) {
                var topic = this.topics[o];
                if (topic.topicId == this.chosenTopicId) {
                    this.sendMessageRequest(this.messageForm.message, true, topic.topicId, function () {
                        _this.topics[o].message = "Replied: " + _this.messageForm.message;
                        _this.saveNotifications();
                        _this.chosenTopicId = 0;
                        _this.messageForm.message = "";
                        _this.messageForm.showInput = false;
                    });
                    break;
                }
            }
        };
        this.processReply = function (idx) {
            this.chosenTopicId = idx;
            // console.log(this.chosenTopicId);
            for (var o in this.topics) {
                var topic = this.topics[o];
                if (topic.topicId == this.chosenTopicId) {
                    if (!topic.message) {
                        if (topic.needReply) {
                            this.messageForm.showInput = true;
                        }
                        else {
                            this.openYNMenu(topic.acceptText, topic.rejectText);
                        }
                    }
                    break;
                }
            }
        };
        this.clearAllMessages = function () {
            var _this = this;
            this.storage.remove('SMRT_NOTIFICATIONS').then(function (val) {
                _this.topics = [];
            });
        };
        this.sendMessageRequest = function (content, choice, topicId, success) {
            var _this = this;
            var input = {
                deviceId: this.device.deviceId,
                content: content,
                choice: choice,
                topicId: topicId
            };
            // console.log("input", input);
            this.api.sendRequest("SendMessage", -1, null, input, function (res) {
                console.log("send message request", res);
                success();
            }, function (err) {
                _this.presentToast(err);
            });
        };
        this.onInputCancel = function (evt) {
            this.chosenTopicId = 0;
            this.messageForm.message = "";
            this.messageForm.showInput = false;
        };
        this.checkLogin = function (success, fail) {
            var _this = this;
            this.storage.get('SMRT_DEVICE').then(function (val) {
                console.log('SMRT_DEVICE', val);
                if (val) {
                    _this.device = val;
                    if (_this.device.account) {
                        success();
                    }
                    else {
                        fail();
                    }
                }
                else {
                    fail();
                }
            });
        };
        this.chosenTopicId = 0;
        this.messageForm = {
            message: "",
            showInput: false
        };
        this.topics = [];
    }
    NotificationsPage.prototype.ionViewDidLoad = function () {
    };
    NotificationsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log("view did enter", "notifications");
        this.checkLogin(function () {
            _this.loadNotifications();
        }, function () {
            console.log("login fail...");
            // NOTHING...
        });
    };
    NotificationsPage.prototype.ionViewWillLeave = function () {
        console.log("view will leave", "notifications");
    };
    return NotificationsPage;
}());
NotificationsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-notifications',template:/*ion-inline-start:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/notifications/notifications.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Notifications</ion-title>\n    <ion-buttons end>\n    <button ion-button item-end (click)="clearAllMessages()">Clear All</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list>\n    <ion-item class="topic" *ngFor="let topic of topics|sort:[\'topicId\', true]" (click)="processReply(topic.topicId)">\n      <ion-avatar item-start>\n        <img [src]="topic.avatar">\n      </ion-avatar>\n      <h2 class="topicTitle">\n        {{topic.title}}\n        <span class="date">{{ topic.date|dateFormat:\'MMM DD HH:mm:ss\' }}</span>\n      </h2>\n      <ion-note class="content">{{topic.author}} : {{topic.content}}</ion-note>\n      <p class="replyMessage">\n        {{ topic.message }}\n      </p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer *ngIf="messageForm.showInput">\n  <ion-toolbar>\n    <form (submit)="sendMessage()">\n      <ion-searchbar placeholder="Type your message" showCancelButton="true" [(ngModel)]="messageForm.message" name="message" (ionCancel)="onInputCancel($event)"></ion-searchbar>\n    </form>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/notifications/notifications.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */]])
], NotificationsPage);

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_api__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_ibeacon__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_background_mode__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_push__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the TrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TrackingPage = (function () {
    function TrackingPage(navCtrl, api, toastCtrl, navParams, storage, ibeacon, backgroundMode, ar, push, localNotifications) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.ibeacon = ibeacon;
        this.backgroundMode = backgroundMode;
        this.ar = ar;
        this.push = push;
        this.localNotifications = localNotifications;
        this.notificationsPage = __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__["a" /* NotificationsPage */];
        this.pushInit = function () {
            var _this = this;
            try {
                this.push.hasPermission().then(function (res) {
                    if (res.isEnabled) {
                        console.log('We have permission to send push notifications');
                    }
                    else {
                        console.log('We do not have permission to send push notifications');
                    }
                });
                var options = {
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
                var pushObject = this.push.init(options);
                pushObject.on('notification').subscribe(function (notification) {
                    console.log('Received a notification', JSON.stringify(notification));
                    _this.storeNotification(notification);
                });
                pushObject.on('registration').subscribe(function (registration) {
                    console.log('Device registered', JSON.stringify(registration));
                    _this.updatePushToken(registration);
                });
                pushObject.on('error').subscribe(function (error) {
                    console.error('Error with Push plugin', error);
                });
            }
            catch (e) {
                console.log(e);
            }
        };
        this.loadNotifications = function () {
            var _this = this;
            this.storage.get('SMRT_NOTIFICATIONS').then(function (val) {
                console.log('SMRT_NOTIFICATIONS', val);
                if (val) {
                    _this.messageCount = val.length;
                }
                else {
                    _this.messageCount = 0;
                }
            });
        };
        this.storeNotification = function (data) {
            var _this = this;
            console.log("storeNotification data", data);
            var topic = {
                topicId: Number(data.additionalData.topicId),
                title: data.title,
                content: data.message,
                needReply: data.additionalData.needReply,
                acceptText: data.additionalData.acceptText,
                rejectText: data.additionalData.rejectText,
                author: data.additionalData.author,
                avatar: data.additionalData.avatar
            };
            if (typeof (topic.needReply) == 'string') {
                topic.needReply = topic.needReply == 'true';
            }
            // console.log("topic", topic);
            this.storage.get('SMRT_NOTIFICATIONS').then(function (val) {
                console.log('SMRT_NOTIFICATIONS', val);
                if (val) {
                    _this.messageCount = val.length;
                    var isExist = false;
                    for (var o in val) {
                        if (val[o].topicId == topic.topicId) {
                            isExist = true;
                        }
                    }
                    if (!isExist) {
                        val.push(topic);
                        _this.messageCount += 1;
                        _this.storage.set('SMRT_NOTIFICATIONS', val);
                    }
                }
                else {
                    var notifications = [topic];
                    _this.messageCount = 1;
                    _this.storage.set('SMRT_NOTIFICATIONS', notifications);
                }
            });
        };
        this.updatePushToken = function (registration) {
            var _this = this;
            var input = {
                secret: registration.registrationType,
                token: registration.registrationId
            };
            this.api.sendRequest("DeviceToken", this.device.deviceId, null, input, function (res) {
                console.log("this.deviceToken", res);
            }, function (err) {
                _this.presentToast("DeviceToken: " + err);
            });
        };
        this.beaconScanning = function () {
            var _this = this;
            try {
                this.backgroundMode.enable();
                this.ibeacon.requestAlwaysAuthorization();
                var delegate = this.ibeacon.Delegate();
                delegate.didRangeBeaconsInRegion().subscribe(function (data) {
                    // console.log('didRangeBeaconsInRegion: ', JSON.stringify(data));
                    _this.sendBeaconRecords(data.beacons);
                    // this.ar.tick();
                }, function (error) {
                    console.error();
                });
                delegate.didStartMonitoringForRegion().subscribe(function (data) {
                    console.log('didStartMonitoringForRegion: ', data);
                }, function (error) {
                    console.error();
                });
                delegate.didEnterRegion().subscribe(function (data) {
                    console.log('didEnterRegion: ', data);
                });
            }
            catch (e) {
                console.log(e);
            }
        };
        this.presentToast = function (message) {
            var toast = this.toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        };
        this.processDeviceData = function () {
            if (this.device.account) {
                this.page.deviceModel = this.device.model;
                this.page.accountUsername = this.device.account.username;
                if (this.device.account.avatar) {
                    this.page.avatarUrl = this.device.account.avatar.url;
                }
                else {
                    this.page.avatarUrl = "";
                }
                if (this.device.account.attendance) {
                    if (this.device.account.attendance.checkInStation) {
                        this.page.checkInStation = this.device.account.attendance.checkInStation.name;
                    }
                    else {
                        this.page.checkInStation = "Not check In";
                    }
                    if (this.device.account.attendance.checkInDate) {
                        this.page.checkInDate = this.device.account.attendance.checkInDate;
                    }
                    else {
                        this.page.checkInDate = "no record";
                    }
                    if (this.device.account.attendance.checkOutStation) {
                        this.page.checkOutStation = this.device.account.attendance.checkOutStation.name;
                    }
                    else {
                        this.page.checkOutStation = "Not check Out";
                    }
                    if (this.device.account.attendance.checkOutDate) {
                        this.page.checkOutDate = this.device.account.attendance.checkOutDate;
                    }
                    else {
                        this.page.checkOutDate = "no record";
                    }
                }
                else {
                    this.page.checkInStation = "Not check In";
                    this.page.checkInDate = "no record";
                    this.page.checkOutStation = "Not check Out";
                    this.page.checkOutDate = "no record";
                }
                if (this.device.account.tracking) {
                    this.page.trackingType = this.device.account.tracking.type;
                    if (this.device.account.tracking.section) {
                        var newSectionName = this.device.account.tracking.section.name;
                        if (this.page.sectionName != newSectionName) {
                            // Section changed!
                            var title = "Zone Change";
                            var text = "You are entering " + this.page.trackingType + " " + newSectionName + "!";
                            this.alertNotification(title, text);
                        }
                        this.page.sectionName = newSectionName;
                    }
                    else {
                        this.page.sectionName = "";
                    }
                    this.page.trackingDate = this.device.account.tracking.date;
                    this.page.trackingAgo = this.formatDate(this.device.account.tracking.date);
                    if (this.device.account.tracking.stations) {
                        this.stations = this.device.account.tracking.stations;
                    }
                    else {
                        this.stations = [];
                    }
                }
                else {
                    this.page.trackingType = "";
                    this.page.sectionName = "";
                    this.page.trackingDate = "no record";
                    this.page.trackingAgo = "no record";
                    this.stations = [];
                }
            }
            else {
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
        this.getBeaconRegion = function () {
            var _this = this;
            this.api.sendRequest("BeaconRegion", -1, null, null, function (res) {
                // console.log("this.region", res);
                var uuid = res.uuid;
                var major = res.major;
                if (major) {
                    _this.beaconRegion = _this.ibeacon.BeaconRegion('SMRT_BEACONS', uuid, major, undefined, true);
                }
                else {
                    _this.beaconRegion = _this.ibeacon.BeaconRegion('SMRT_BEACONS', uuid, undefined, undefined, true);
                }
                try {
                    _this.ibeacon.startMonitoringForRegion(_this.beaconRegion).then(function () {
                        console.log('Native layer recieved the request to monitoring');
                    }, function (error) {
                        console.error('Native layer failed to begin monitoring: ', error);
                    });
                    _this.ibeacon.startRangingBeaconsInRegion(_this.beaconRegion).then(function () {
                        console.log('Native layer recieved the request to ranging');
                    }, function (error) {
                        console.error('Native layer failed to begin ranging: ', error);
                    });
                }
                catch (e) {
                    console.log(e);
                }
            }, function (err) {
                _this.presentToast("BeaconRegion: " + err);
            });
        };
        this.sendBeaconRecords = function (beacons) {
            // console.log("beacons", JSON.stringify(beacons));
            if (this.counter == 5) {
                this.counter = 0;
                this.loadNotifications();
                this.syncMobile();
            }
            this.counter += 1;
            var inputBeacons = [];
            // TODO buffer!!
            for (var o in beacons) {
                var beacon = beacons[o];
                var bd = {
                    uuid: beacon.uuid.toUpperCase(),
                    major: Number(beacon.major),
                    minor: Number(beacon.minor),
                    distance: beacon.accuracy
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
                if (bd.distance == -1) {
                    var distances_1 = this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor];
                    if (distances_1) {
                        if (distances_1.length) {
                            var distance = distances_1[distances_1.length - 1];
                            this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor].push(distance + 8);
                            if (this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor].length > 8) {
                                this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor].shift();
                            }
                        }
                    }
                }
                else {
                    var distances_2 = this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor];
                    if (distances_2) {
                        this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor].push(bd.distance);
                        if (this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor].length > 8) {
                            this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor].shift();
                        }
                    }
                    else {
                        this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor] = [bd.distance];
                    }
                }
                // averaging!
                var distances = this.beaconHisMap[bd.uuid + "_" + bd.major + "_" + bd.minor];
                if (distances.length) {
                    var sum = 0;
                    for (var o in distances) {
                        var d = distances[o];
                        sum += d;
                    }
                    bd.distance = sum / distances.length;
                    // console.log("arr", JSON.stringify(distances));
                    // console.log("bd", JSON.stringify(bd));
                    inputBeacons.push(bd);
                }
            }
            var finalBeacons = [];
            var keys = Object.keys(this.beaconHisMap);
            for (var o in keys) {
                var k = keys[o];
                var v = this.beaconHisMap[k];
                var newRec = false;
                for (var p in inputBeacons) {
                    var bd = inputBeacons[p];
                    var bk = bd.uuid + "_" + bd.major + "_" + bd.minor;
                    if (bk == k) {
                        newRec = true;
                        break;
                    }
                }
                if (!newRec) {
                    if (v.length) {
                        this.beaconHisMap[k].shift();
                    }
                }
                // console.log("beacon history", k, v, newRec);
                if (v.length) {
                    var sum = 0;
                    for (var p in v) {
                        var d = v[p];
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
            var input = {
                deviceId: this.device.deviceId,
                beacons: finalBeacons
            };
            // end buffer!!
            console.log("Input", input);
            this.api.sendRequest("BeaconRecord", -1, null, input, function (res) {
                console.log("BeaconRecord", res);
            }, function (err) {
                // this.presentToast(err);
            });
            this.processDeviceData();
        };
        this.syncMobile = function () {
            var _this = this;
            var input = {
                name: this.device.name
            };
            console.log(input);
            this.api.sendRequest("SyncDevice", -1, null, input, function (res) {
                if (res.account) {
                    _this.device = res;
                    // this.storage.set('SMRT_DEVICE', this.device);
                    // this.processDeviceData();
                }
                else {
                    _this.presentToast("This device has not link to account!");
                    _this.logout();
                }
            }, function (err) {
                _this.presentToast("SyncDevice: " + err);
            });
        };
        this.goNotificationsPage = function () {
            if (this.messageCount) {
                this.navCtrl.push(this.notificationsPage);
            }
        };
        this.logout = function () {
            var _this = this;
            this.storage.remove('SMRT_DEVICE').then(function (val) {
                try {
                    _this.backgroundMode.disable();
                    _this.ibeacon.stopMonitoringForRegion(_this.beaconRegion).then(function () {
                        console.log('Native layer recieved the request to stop monitoring');
                    }, function (error) {
                        console.error('Native layer failed to stop monitoring: ', error);
                    });
                    _this.ibeacon.stopRangingBeaconsInRegion(_this.beaconRegion).then(function () {
                        console.log('Native layer recieved the request to stop ranging');
                    }, function (error) {
                        console.error('Native layer failed to stop ranging: ', error);
                    });
                }
                catch (e) {
                    console.log(e);
                }
                _this.navCtrl.pop();
            });
        };
        this.checkLogin = function (success, fail) {
            var _this = this;
            this.storage.get('SMRT_DEVICE').then(function (val) {
                console.log('SMRT_DEVICE', val);
                if (val) {
                    _this.device = val;
                    if (_this.device.account) {
                        success();
                    }
                    else {
                        fail();
                    }
                }
            });
        };
        this.alertNotification = function (title, text) {
            this.localNotifications.schedule({
                id: new Date().getTime(),
                title: title,
                text: text,
                sound: 'file://beep.caf',
                data: {}
            });
        };
        this.formatDate = function (date) {
            var diff = __WEBPACK_IMPORTED_MODULE_9_moment___default()().diff(date, 'seconds');
            if (diff < 60) {
                return diff + " secs";
            }
            else if (diff < 3600) {
                var min = Math.floor(diff / 60);
                var sec = diff % 60;
                return min + " mins " + sec + " secs";
            }
            else if (diff < 86400) {
                var hr = Math.floor(diff / 3600);
                var rem = diff % 3600;
                var min = Math.floor(rem / 60);
                var sec = rem % 60;
                return hr + " hrs " + min + " mins " + sec + " secs";
            }
            else {
                var d = Math.floor(diff / 86400);
                return d + " days";
            }
        };
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
    TrackingPage.prototype.ionViewDidLoad = function () {
    };
    TrackingPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log("view did enter", "tracking");
        this.checkLogin(function () {
            _this.loadNotifications();
            _this.processDeviceData();
            _this.beaconScanning();
            _this.getBeaconRegion();
            _this.pushInit();
        }, function () {
            _this.logout();
        });
    };
    TrackingPage.prototype.ionViewWillLeave = function () {
        console.log("view will leave", "tracking");
        try {
            this.backgroundMode.disable();
            this.ibeacon.stopMonitoringForRegion(this.beaconRegion).then(function () {
                console.log('Native layer recieved the request to stop monitoring');
            }, function (error) {
                console.error('Native layer failed to stop monitoring: ', error);
            });
            this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion).then(function () {
                console.log('Native layer recieved the request to stop ranging');
            }, function (error) {
                console.error('Native layer failed to stop ranging: ', error);
            });
        }
        catch (e) {
            console.log(e);
        }
    };
    return TrackingPage;
}());
TrackingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tracking',template:/*ion-inline-start:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/tracking/tracking.html"*/'<!--\n  Generated template for the TrackingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton= "true">\n    <ion-title>\n      SMRT Tracking\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only large (click)="goNotificationsPage(account)">\n        <ion-icon class="notificationIcon" name="mail"></ion-icon>\n        <ion-badge *ngIf="messageCount" class="nav-badge">\n          {{ messageCount }}\n        </ion-badge>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card class="account">\n    <ion-item class="item">\n      <ion-avatar item-start>\n        <img [src]="page.avatarUrl" />\n      </ion-avatar>\n     <h2 class="name">\n       {{ page.accountUsername }}\n     </h2>\n     <h2 class="model">\n       {{ page.deviceModel }}\n     </h2>\n    </ion-item>\n  </ion-card>\n  <ion-card class="attendance">\n    <ion-item class="item">\n      <ion-icon name="log-in" item-start large></ion-icon>\n      <h2 class="title">\n        {{ page.checkInStation }}\n      </h2>\n      <h3 class="info">\n        {{ page.checkInDate|dateFormat:\'MMM DD HH:mm:ss\' }}\n      </h3>\n    </ion-item>\n    <ion-item class="item">\n      <ion-icon name="log-out" item-start large></ion-icon>\n      <h2 class="title">\n        {{ page.checkOutStation }}\n      </h2>\n      <h3 class="info">\n        {{ page.checkOutDate|dateFormat:\'MMM DD HH:mm:ss\' }}\n      </h3>\n    </ion-item>\n  </ion-card>\n  <ion-card class="tracking">\n    <ion-item class="stations">\n      <ion-grid>\n        <ion-row>\n          <ion-col *ngFor="let station of stations">\n            <div class="station">\n              <station-icon [station]="station"></station-icon>\n              <div class="name">\n                {{ station.name }}\n              </div>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n    <ion-item class="section" [ngClass]="page.trackingType">\n      <h2 class="title">\n        Section:\n        {{ page.sectionName }}\n      </h2>\n      <h3 class="info">\n        {{ page.trackingDate|dateFormat:\'YYYY MMM DD HH:mm:ss\' }}\n      </h3>\n      <h3 class="info-sm">\n        {{ page.trackingAgo + " ago" }}\n      </h3>\n    </ion-item>\n  </ion-card>\n  <ion-fab bottom right mini>\n    <button class="logoutButton" ion-fab (click) ="logout()">\n      <ion-icon name="arrow-dropleft"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/tracking/tracking.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_ibeacon__["a" /* IBeacon */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */]])
], TrackingPage);

//# sourceMappingURL=tracking.js.map

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/notifications/notifications.module": [
		401,
		1
	],
	"../pages/tracking/tracking.module": [
		402,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 156;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tracking_tracking__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_api__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, api, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.trackingPage = __WEBPACK_IMPORTED_MODULE_3__tracking_tracking__["a" /* TrackingPage */];
        this.clearNotifications = function () {
            this.storage.remove('SMRT_NOTIFICATIONS').then(function () {
                console.log("SMRT_NOTIFICATIONS", "remove");
            });
        };
        this.presentToast = function (message) {
            var toast = this.toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        };
        this.login = function () {
            var _this = this;
            if (this.device.name) {
                var input = {
                    name: this.device.name
                };
                console.log(input);
                this.api.sendRequest("SyncDevice", -1, null, input, function (res) {
                    console.log("this.device", res);
                    if (res.account) {
                        _this.device = res;
                        _this.storage.set('SMRT_DEVICE', _this.device);
                        _this.navCtrl.push(_this.trackingPage);
                    }
                    else {
                        _this.presentToast("This device has not link to account!");
                    }
                }, function (err) {
                    _this.presentToast(err);
                });
            }
            else {
                this.presentToast("Invalid Inputs");
            }
        };
        this.checkLogin = function (success, fail) {
            var _this = this;
            this.storage.get('SMRT_DEVICE').then(function (val) {
                console.log('SMRT_DEVICE', val);
                if (val) {
                    _this.device = val;
                    if (_this.device.account) {
                        success();
                    }
                    else {
                        fail();
                    }
                }
                else {
                    fail();
                }
            });
        };
        this.navCtrl = navCtrl;
        this.device = {
            deviceId: 0,
            name: "SMRTSUMS001",
            number: "",
            model: "",
            account: null,
            date: ""
        };
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log("view did enter", "home");
        this.checkLogin(function () {
            _this.navCtrl.push(_this.trackingPage);
        }, function () {
            _this.clearNotifications();
        });
    };
    HomePage.prototype.ionViewWillLeave = function () {
        console.log("view will leave", "home");
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/home/home.html"*/'\n<ion-header>\n</ion-header>\n<ion-content class="loginBackground">\n    <form (submit)="login()" class= "login">\n      <img src= "assets/img/SMRTlogo.png"  />\n      <ion-list class="loginList">\n        <ion-item class="input">\n          <ion-label class="lable">Device :</ion-label>\n          <ion-input type="string" [(ngModel)]="device.name" name = "deviceName"></ion-input>\n        </ion-item>\n          <button ion-button block class="loginButton">Link Device</button>\n        </ion-list>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_api_api__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(341);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tracking_tracking__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_api_api__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_components_module__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_ibeacon__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_push__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_local_notifications__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tracking_tracking__["a" /* TrackingPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tracking/tracking.module#TrackingPageModule', name: 'TrackingPage', segment: 'tracking', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__["a" /* PipesModule */],
            __WEBPACK_IMPORTED_MODULE_13__components_components_module__["a" /* ComponentsModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tracking_tracking__["a" /* TrackingPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_10__providers_api_api__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_ibeacon__["a" /* IBeacon */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_local_notifications__["a" /* LocalNotifications */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 162,
	"./af.js": 162,
	"./ar": 163,
	"./ar-dz": 164,
	"./ar-dz.js": 164,
	"./ar-kw": 165,
	"./ar-kw.js": 165,
	"./ar-ly": 166,
	"./ar-ly.js": 166,
	"./ar-ma": 167,
	"./ar-ma.js": 167,
	"./ar-sa": 168,
	"./ar-sa.js": 168,
	"./ar-tn": 169,
	"./ar-tn.js": 169,
	"./ar.js": 163,
	"./az": 170,
	"./az.js": 170,
	"./be": 171,
	"./be.js": 171,
	"./bg": 172,
	"./bg.js": 172,
	"./bm": 173,
	"./bm.js": 173,
	"./bn": 174,
	"./bn.js": 174,
	"./bo": 175,
	"./bo.js": 175,
	"./br": 176,
	"./br.js": 176,
	"./bs": 177,
	"./bs.js": 177,
	"./ca": 178,
	"./ca.js": 178,
	"./cs": 179,
	"./cs.js": 179,
	"./cv": 180,
	"./cv.js": 180,
	"./cy": 181,
	"./cy.js": 181,
	"./da": 182,
	"./da.js": 182,
	"./de": 183,
	"./de-at": 184,
	"./de-at.js": 184,
	"./de-ch": 185,
	"./de-ch.js": 185,
	"./de.js": 183,
	"./dv": 186,
	"./dv.js": 186,
	"./el": 187,
	"./el.js": 187,
	"./en-au": 188,
	"./en-au.js": 188,
	"./en-ca": 189,
	"./en-ca.js": 189,
	"./en-gb": 190,
	"./en-gb.js": 190,
	"./en-ie": 191,
	"./en-ie.js": 191,
	"./en-nz": 192,
	"./en-nz.js": 192,
	"./eo": 193,
	"./eo.js": 193,
	"./es": 194,
	"./es-do": 195,
	"./es-do.js": 195,
	"./es-us": 196,
	"./es-us.js": 196,
	"./es.js": 194,
	"./et": 197,
	"./et.js": 197,
	"./eu": 198,
	"./eu.js": 198,
	"./fa": 199,
	"./fa.js": 199,
	"./fi": 200,
	"./fi.js": 200,
	"./fo": 201,
	"./fo.js": 201,
	"./fr": 202,
	"./fr-ca": 203,
	"./fr-ca.js": 203,
	"./fr-ch": 204,
	"./fr-ch.js": 204,
	"./fr.js": 202,
	"./fy": 205,
	"./fy.js": 205,
	"./gd": 206,
	"./gd.js": 206,
	"./gl": 207,
	"./gl.js": 207,
	"./gom-latn": 208,
	"./gom-latn.js": 208,
	"./gu": 209,
	"./gu.js": 209,
	"./he": 210,
	"./he.js": 210,
	"./hi": 211,
	"./hi.js": 211,
	"./hr": 212,
	"./hr.js": 212,
	"./hu": 213,
	"./hu.js": 213,
	"./hy-am": 214,
	"./hy-am.js": 214,
	"./id": 215,
	"./id.js": 215,
	"./is": 216,
	"./is.js": 216,
	"./it": 217,
	"./it.js": 217,
	"./ja": 218,
	"./ja.js": 218,
	"./jv": 219,
	"./jv.js": 219,
	"./ka": 220,
	"./ka.js": 220,
	"./kk": 221,
	"./kk.js": 221,
	"./km": 222,
	"./km.js": 222,
	"./kn": 223,
	"./kn.js": 223,
	"./ko": 224,
	"./ko.js": 224,
	"./ky": 225,
	"./ky.js": 225,
	"./lb": 226,
	"./lb.js": 226,
	"./lo": 227,
	"./lo.js": 227,
	"./lt": 228,
	"./lt.js": 228,
	"./lv": 229,
	"./lv.js": 229,
	"./me": 230,
	"./me.js": 230,
	"./mi": 231,
	"./mi.js": 231,
	"./mk": 232,
	"./mk.js": 232,
	"./ml": 233,
	"./ml.js": 233,
	"./mr": 234,
	"./mr.js": 234,
	"./ms": 235,
	"./ms-my": 236,
	"./ms-my.js": 236,
	"./ms.js": 235,
	"./my": 237,
	"./my.js": 237,
	"./nb": 238,
	"./nb.js": 238,
	"./ne": 239,
	"./ne.js": 239,
	"./nl": 240,
	"./nl-be": 241,
	"./nl-be.js": 241,
	"./nl.js": 240,
	"./nn": 242,
	"./nn.js": 242,
	"./pa-in": 243,
	"./pa-in.js": 243,
	"./pl": 244,
	"./pl.js": 244,
	"./pt": 245,
	"./pt-br": 246,
	"./pt-br.js": 246,
	"./pt.js": 245,
	"./ro": 247,
	"./ro.js": 247,
	"./ru": 248,
	"./ru.js": 248,
	"./sd": 249,
	"./sd.js": 249,
	"./se": 250,
	"./se.js": 250,
	"./si": 251,
	"./si.js": 251,
	"./sk": 252,
	"./sk.js": 252,
	"./sl": 253,
	"./sl.js": 253,
	"./sq": 254,
	"./sq.js": 254,
	"./sr": 255,
	"./sr-cyrl": 256,
	"./sr-cyrl.js": 256,
	"./sr.js": 255,
	"./ss": 257,
	"./ss.js": 257,
	"./sv": 258,
	"./sv.js": 258,
	"./sw": 259,
	"./sw.js": 259,
	"./ta": 260,
	"./ta.js": 260,
	"./te": 261,
	"./te.js": 261,
	"./tet": 262,
	"./tet.js": 262,
	"./th": 263,
	"./th.js": 263,
	"./tl-ph": 264,
	"./tl-ph.js": 264,
	"./tlh": 265,
	"./tlh.js": 265,
	"./tr": 266,
	"./tr.js": 266,
	"./tzl": 267,
	"./tzl.js": 267,
	"./tzm": 268,
	"./tzm-latn": 269,
	"./tzm-latn.js": 269,
	"./tzm.js": 268,
	"./uk": 270,
	"./uk.js": 270,
	"./ur": 271,
	"./ur.js": 271,
	"./uz": 272,
	"./uz-latn": 273,
	"./uz-latn.js": 273,
	"./uz.js": 272,
	"./vi": 274,
	"./vi.js": 274,
	"./x-pseudo": 275,
	"./x-pseudo.js": 275,
	"./yo": 276,
	"./yo.js": 276,
	"./zh-cn": 277,
	"./zh-cn.js": 277,
	"./zh-hk": 278,
	"./zh-hk.js": 278,
	"./zh-tw": 279,
	"./zh-tw.js": 279
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 377;

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(321);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_format_date_format__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sort_sort__ = __webpack_require__(398);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PipesModule = (function () {
    function PipesModule() {
    }
    return PipesModule;
}());
PipesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__date_format_date_format__["a" /* DateFormatPipe */],
            __WEBPACK_IMPORTED_MODULE_2__sort_sort__["a" /* SortPipe */]],
        imports: [],
        exports: [__WEBPACK_IMPORTED_MODULE_1__date_format_date_format__["a" /* DateFormatPipe */],
            __WEBPACK_IMPORTED_MODULE_2__sort_sort__["a" /* SortPipe */]]
    })
], PipesModule);

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateFormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the DateFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var DateFormatPipe = (function () {
    function DateFormatPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    DateFormatPipe.prototype.transform = function (value, args) {
        var text = args;
        var result = "Invalid Date";
        result = __WEBPACK_IMPORTED_MODULE_1_moment___default()(value).format(text);
        return result;
    };
    return DateFormatPipe;
}());
DateFormatPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'dateFormat',
    })
], DateFormatPipe);

//# sourceMappingURL=date-format.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SortPipe = (function () {
    function SortPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    SortPipe.prototype.transform = function (value, args) {
        var key = args[0];
        var order = args[1];
        value.sort(function (a, b) {
            if (order) {
                if (a[key] < b[key]) {
                    return 1;
                }
                else if (a[key] > b[key]) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
            else {
                if (a[key] > b[key]) {
                    return 1;
                }
                else if (a[key] < b[key]) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        });
        return value;
    };
    return SortPipe;
}());
SortPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'sort',
    })
], SortPipe);

//# sourceMappingURL=sort.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__station_icon_station_icon__ = __webpack_require__(400);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__station_icon_station_icon__["a" /* StationIconComponent */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__station_icon_station_icon__["a" /* StationIconComponent */]]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StationIconComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the StationIconComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var StationIconComponent = (function () {
    function StationIconComponent() {
        this.loadColorCodes = function () {
            this.colorCodes = [];
            var codes = this.station.code.split(",");
            var colors = this.station.colors;
            for (var i = 0; i < colors.length; i++) {
                var colorCode = {
                    code: "",
                    color: colors[i]
                };
                if (codes[i]) {
                    colorCode.code = codes[i];
                }
                this.colorCodes.push(colorCode);
            }
        };
        this.colorCodes = [];
    }
    StationIconComponent.prototype.ngOnChanges = function (changes) {
        if (this.station) {
            this.loadColorCodes();
        }
    };
    StationIconComponent.prototype.ngOnInit = function () {
        if (this.station) {
            this.loadColorCodes();
        }
    };
    return StationIconComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], StationIconComponent.prototype, "station", void 0);
StationIconComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'station-icon',template:/*ion-inline-start:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/components/station-icon/station-icon.html"*/'<!-- Generated template for the StationIconComponent component -->\n<div class="station-icon">\n  <span class="color-code" *ngFor="let colorCode of colorCodes" [ngStyle]="{\'background-color\':colorCode.color}">\n    {{ colorCode.code }}\n  </span>\n</div>\n'/*ion-inline-end:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/components/station-icon/station-icon.html"*/
    }),
    __metadata("design:paramtypes", [])
], StationIconComponent);

//# sourceMappingURL=station-icon.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ApiProvider = (function () {
    function ApiProvider(http) {
        this.http = http;
        this.sendRequest = function (name, id, operation, input, success, fail) {
            // prepare requested API
            var method = null;
            var url = null;
            var headers = null;
            for (var o in this.service.apis) {
                var api = this.service.apis[o];
                if (api.name == name) {
                    method = api.method;
                    url = this.service.endpoint + api.link;
                    headers = {
                        "Content-Type": "application/json",
                        "Auth-Secret": api.secret
                    };
                    break;
                }
            }
            // console.log(method, url, headers, id, input, operation);
            if (id != -1) {
                url = url + "/" + id;
            }
            if (operation != null) {
                url = url + "/" + operation;
            }
            // send request
            switch (method) {
                case "GET":
                    this.getRequest(url, input, headers, success, fail);
                    break;
                case "POST":
                    this.postRequest(url, input, headers, success, fail);
                    break;
                case "PUT":
                    this.putRequest(url, input, headers, success, fail);
                    break;
                case "DELETE":
                    this.deleteRequest(url, headers, success, fail);
                    break;
                default:
                    console.log("the method not found!");
            }
        };
        this.getRequest = function (url, input, headers, success, fail) {
            var additionalUrl = "";
            if (input) {
                var keys = Object.keys(input);
                for (var o in keys) {
                    var key = keys[o];
                    additionalUrl += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(input[key]);
                }
            }
            this.http.get(url + "?_=" + new Date().getTime() + additionalUrl, {
                headers: headers
            }).subscribe(function (res) {
                if (success) {
                    success(JSON.parse(res.text()));
                }
            }, function (err) {
                if (fail) {
                    fail(JSON.parse(err.text()));
                }
            });
        };
        this.postRequest = function (url, input, headers, success, fail) {
            this.http.post(url, input, {
                headers: headers
            }).subscribe(function (res) {
                if (success) {
                    success(JSON.parse(res.text()));
                }
            }, function (err) {
                if (fail) {
                    fail(JSON.parse(err.text()));
                }
            });
        };
        this.putRequest = function (url, input, headers, success, fail) {
            this.http.put(url, input, {
                headers: headers
            }).subscribe(function (res) {
                if (success) {
                    success(JSON.parse(res.text()));
                }
            }, function (err) {
                if (fail) {
                    fail(JSON.parse(err.text()));
                }
            });
        };
        this.deleteRequest = function (url, headers, success, fail) {
            this.http.delete(url, {
                headers: headers
            }).subscribe(function (res) {
                if (success) {
                    success(JSON.parse(res.text()));
                }
            }, function (err) {
                if (fail) {
                    fail(JSON.parse(err.text()));
                }
            });
        };
        this.service = {
            endpoint: "http://via.viatick.com/smrt_track_tracking",
            apis: [{
                    name: "SyncDevice",
                    method: "POST",
                    secret: "00register00",
                    link: "/service/asset/register"
                }, {
                    name: "BeaconRegion",
                    method: "GET",
                    secret: "00tracking00",
                    link: "/service/bms"
                }, {
                    name: "BeaconRecord",
                    method: "POST",
                    secret: "00tracking00",
                    link: "/service/bms"
                }, {
                    name: "DeviceToken",
                    method: "PUT",
                    secret: "00notification00",
                    link: "/service/asset/register"
                }, {
                    name: "SendMessage",
                    method: "POST",
                    secret: "00notification00",
                    link: "/service/asset/message"
                }]
        };
    }
    return ApiProvider;
}());
ApiProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ApiProvider);

//# sourceMappingURL=api.js.map

/***/ })

},[322]);
//# sourceMappingURL=main.js.map