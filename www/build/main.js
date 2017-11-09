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
                        role: 'destructive',
                        icon: !this.platform.is('ios') ? 'trash' : null,
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
                        role: 'destructive',
                        icon: !this.platform.is('ios') ? 'trash' : null,
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
            console.log(this.chosenTopicId);
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
            console.log("input", input);
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
        selector: 'page-notifications',template:/*ion-inline-start:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/notifications/notifications.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Notifications</ion-title>\n    <ion-buttons end>\n    <button ion-button item-end (click)="clearAllMessages()">Clear All</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list>\n    <ion-item class="topic" *ngFor="let topic of topics" (click)="processReply(topic.topicId)">\n      <ion-avatar item-start>\n        <img [src]="topic.avatar">\n      </ion-avatar>\n      <h2 class="topicTitle">\n        {{topic.title}}\n        <span class="date">{{ topic.date|dateFormat:\'MMM DD HH:mm:ss\' }}</span>\n      </h2>\n      <ion-note class="content">{{topic.author}} : {{topic.content}}</ion-note>\n      <p class="replyMessage">\n        {{ topic.message }}\n      </p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer *ngIf="messageForm.showInput">\n  <ion-toolbar>\n    <form (submit)="sendMessage()">\n      <ion-searchbar placeholder="Type your message" showCancelButton="true" [(ngModel)]="messageForm.message" name="message" (ionCancel)="onInputCancel($event)"></ion-searchbar>\n    </form>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/notifications/notifications.html"*/,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
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
    function TrackingPage(navCtrl, api, toastCtrl, navParams, storage, ibeacon, backgroundMode, ar, push) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.ibeacon = ibeacon;
        this.backgroundMode = backgroundMode;
        this.ar = ar;
        this.push = push;
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
                var pushObject = this.push.init(options);
                pushObject.on('notification').subscribe(function (notification) {
                    // console.log('Received a notification', JSON.stringify(notification));
                    _this.storeNotification(notification);
                });
                pushObject.on('registration').subscribe(function (registration) {
                    // console.log('Device registered', JSON.stringify(registration));
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
            var topic = {
                topicId: data.additionalData.topicId,
                title: data.title,
                content: data.message,
                needReply: data.additionalData.needReply,
                acceptText: data.additionalData.acceptText,
                rejectText: data.additionalData.rejectText,
                author: data.additionalData.author,
                avatar: data.additionalData.avatar
            };
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
                        this.page.sectionName = this.device.account.tracking.section.name;
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
            for (var o in beacons) {
                var beacon = beacons[o];
                inputBeacons.push({
                    uuid: beacon.uuid,
                    major: beacon.major,
                    minor: beacon.minor,
                    distance: beacon.accuracy
                });
            }
            var input = {
                deviceId: this.device.deviceId,
                beacons: inputBeacons
            };
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
        this.formatDate = function (date) {
            var diff = __WEBPACK_IMPORTED_MODULE_8_moment___default()().diff(date, 'seconds');
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_api_api__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_ibeacon__["a" /* IBeacon */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_push__["a" /* Push */]])
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
		399,
		1
	],
	"../pages/tracking/tracking.module": [
		400,
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

/***/ 320:
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

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(340);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tracking_tracking__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_api_api__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_components_module__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_ibeacon__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_push__ = __webpack_require__(160);
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
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_push__["a" /* Push */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 161,
	"./af.js": 161,
	"./ar": 162,
	"./ar-dz": 163,
	"./ar-dz.js": 163,
	"./ar-kw": 164,
	"./ar-kw.js": 164,
	"./ar-ly": 165,
	"./ar-ly.js": 165,
	"./ar-ma": 166,
	"./ar-ma.js": 166,
	"./ar-sa": 167,
	"./ar-sa.js": 167,
	"./ar-tn": 168,
	"./ar-tn.js": 168,
	"./ar.js": 162,
	"./az": 169,
	"./az.js": 169,
	"./be": 170,
	"./be.js": 170,
	"./bg": 171,
	"./bg.js": 171,
	"./bm": 172,
	"./bm.js": 172,
	"./bn": 173,
	"./bn.js": 173,
	"./bo": 174,
	"./bo.js": 174,
	"./br": 175,
	"./br.js": 175,
	"./bs": 176,
	"./bs.js": 176,
	"./ca": 177,
	"./ca.js": 177,
	"./cs": 178,
	"./cs.js": 178,
	"./cv": 179,
	"./cv.js": 179,
	"./cy": 180,
	"./cy.js": 180,
	"./da": 181,
	"./da.js": 181,
	"./de": 182,
	"./de-at": 183,
	"./de-at.js": 183,
	"./de-ch": 184,
	"./de-ch.js": 184,
	"./de.js": 182,
	"./dv": 185,
	"./dv.js": 185,
	"./el": 186,
	"./el.js": 186,
	"./en-au": 187,
	"./en-au.js": 187,
	"./en-ca": 188,
	"./en-ca.js": 188,
	"./en-gb": 189,
	"./en-gb.js": 189,
	"./en-ie": 190,
	"./en-ie.js": 190,
	"./en-nz": 191,
	"./en-nz.js": 191,
	"./eo": 192,
	"./eo.js": 192,
	"./es": 193,
	"./es-do": 194,
	"./es-do.js": 194,
	"./es-us": 195,
	"./es-us.js": 195,
	"./es.js": 193,
	"./et": 196,
	"./et.js": 196,
	"./eu": 197,
	"./eu.js": 197,
	"./fa": 198,
	"./fa.js": 198,
	"./fi": 199,
	"./fi.js": 199,
	"./fo": 200,
	"./fo.js": 200,
	"./fr": 201,
	"./fr-ca": 202,
	"./fr-ca.js": 202,
	"./fr-ch": 203,
	"./fr-ch.js": 203,
	"./fr.js": 201,
	"./fy": 204,
	"./fy.js": 204,
	"./gd": 205,
	"./gd.js": 205,
	"./gl": 206,
	"./gl.js": 206,
	"./gom-latn": 207,
	"./gom-latn.js": 207,
	"./gu": 208,
	"./gu.js": 208,
	"./he": 209,
	"./he.js": 209,
	"./hi": 210,
	"./hi.js": 210,
	"./hr": 211,
	"./hr.js": 211,
	"./hu": 212,
	"./hu.js": 212,
	"./hy-am": 213,
	"./hy-am.js": 213,
	"./id": 214,
	"./id.js": 214,
	"./is": 215,
	"./is.js": 215,
	"./it": 216,
	"./it.js": 216,
	"./ja": 217,
	"./ja.js": 217,
	"./jv": 218,
	"./jv.js": 218,
	"./ka": 219,
	"./ka.js": 219,
	"./kk": 220,
	"./kk.js": 220,
	"./km": 221,
	"./km.js": 221,
	"./kn": 222,
	"./kn.js": 222,
	"./ko": 223,
	"./ko.js": 223,
	"./ky": 224,
	"./ky.js": 224,
	"./lb": 225,
	"./lb.js": 225,
	"./lo": 226,
	"./lo.js": 226,
	"./lt": 227,
	"./lt.js": 227,
	"./lv": 228,
	"./lv.js": 228,
	"./me": 229,
	"./me.js": 229,
	"./mi": 230,
	"./mi.js": 230,
	"./mk": 231,
	"./mk.js": 231,
	"./ml": 232,
	"./ml.js": 232,
	"./mr": 233,
	"./mr.js": 233,
	"./ms": 234,
	"./ms-my": 235,
	"./ms-my.js": 235,
	"./ms.js": 234,
	"./my": 236,
	"./my.js": 236,
	"./nb": 237,
	"./nb.js": 237,
	"./ne": 238,
	"./ne.js": 238,
	"./nl": 239,
	"./nl-be": 240,
	"./nl-be.js": 240,
	"./nl.js": 239,
	"./nn": 241,
	"./nn.js": 241,
	"./pa-in": 242,
	"./pa-in.js": 242,
	"./pl": 243,
	"./pl.js": 243,
	"./pt": 244,
	"./pt-br": 245,
	"./pt-br.js": 245,
	"./pt.js": 244,
	"./ro": 246,
	"./ro.js": 246,
	"./ru": 247,
	"./ru.js": 247,
	"./sd": 248,
	"./sd.js": 248,
	"./se": 249,
	"./se.js": 249,
	"./si": 250,
	"./si.js": 250,
	"./sk": 251,
	"./sk.js": 251,
	"./sl": 252,
	"./sl.js": 252,
	"./sq": 253,
	"./sq.js": 253,
	"./sr": 254,
	"./sr-cyrl": 255,
	"./sr-cyrl.js": 255,
	"./sr.js": 254,
	"./ss": 256,
	"./ss.js": 256,
	"./sv": 257,
	"./sv.js": 257,
	"./sw": 258,
	"./sw.js": 258,
	"./ta": 259,
	"./ta.js": 259,
	"./te": 260,
	"./te.js": 260,
	"./tet": 261,
	"./tet.js": 261,
	"./th": 262,
	"./th.js": 262,
	"./tl-ph": 263,
	"./tl-ph.js": 263,
	"./tlh": 264,
	"./tlh.js": 264,
	"./tr": 265,
	"./tr.js": 265,
	"./tzl": 266,
	"./tzl.js": 266,
	"./tzm": 267,
	"./tzm-latn": 268,
	"./tzm-latn.js": 268,
	"./tzm.js": 267,
	"./uk": 269,
	"./uk.js": 269,
	"./ur": 270,
	"./ur.js": 270,
	"./uz": 271,
	"./uz-latn": 272,
	"./uz-latn.js": 272,
	"./uz.js": 271,
	"./vi": 273,
	"./vi.js": 273,
	"./x-pseudo": 274,
	"./x-pseudo.js": 274,
	"./yo": 275,
	"./yo.js": 275,
	"./zh-cn": 276,
	"./zh-cn.js": 276,
	"./zh-hk": 277,
	"./zh-hk.js": 277,
	"./zh-tw": 278,
	"./zh-tw.js": 278
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
webpackContext.id = 376;

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(320);
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

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_format_date_format__ = __webpack_require__(396);
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
        declarations: [__WEBPACK_IMPORTED_MODULE_1__date_format_date_format__["a" /* DateFormatPipe */]],
        imports: [],
        exports: [__WEBPACK_IMPORTED_MODULE_1__date_format_date_format__["a" /* DateFormatPipe */]]
    })
], PipesModule);

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 396:
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

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__station_icon_station_icon__ = __webpack_require__(398);
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

/***/ 398:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(366);
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

},[321]);
//# sourceMappingURL=main.js.map