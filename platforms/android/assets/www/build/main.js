webpackJsonp([2],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
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
    function NotificationsPage(navCtrl, navParams, platform, actionsheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
        this.alertCtrl = alertCtrl;
        this.openYNMenu = function (acceptText, rejectText) {
            var _this = this;
            var actionSheet = this.actionsheetCtrl.create({
                title: 'Reply',
                cssClass: 'action-sheets-basic-page',
                buttons: [
                    {
                        text: acceptText,
                        role: 'destructive',
                        icon: !this.platform.is('ios') ? 'trash' : null,
                        handler: function () {
                            _this.topics[_this.chosenTopicId].message = "Reply: " + acceptText;
                        }
                    },
                    {
                        text: rejectText,
                        role: 'destructive',
                        icon: !this.platform.is('ios') ? 'trash' : null,
                        handler: function () {
                            _this.topics[_this.chosenTopicId].message = "Reply: " + rejectText;
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        icon: !this.platform.is('ios') ? 'close' : null,
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        };
        this.openReplyMenu = function (idx) {
            this.chosenTopicId = idx;
        };
        this.sendMessage = function () {
            this.topics[this.chosenTopicId].message = "Reply: " + this.message;
            this.message = "";
            this.chosenTopicId = 0;
        };
        this.processReply = function (idx) {
            var topic = this.topics[idx];
            if (!topic.message) {
                if (topic.needReply) {
                    this.openReplyMenu(idx);
                }
                else {
                    this.openYNMenu(topic.acceptText, topic.rejectText);
                }
            }
        };
        this.clearAllMessages = function () {
            this.topics = [];
        };
        this.chosenTopicId = 0;
        this.message = "";
        this.topics = [{
                topicId: 1,
                title: "Checking",
                content: "Are you at Station 1?",
                author: {
                    username: "Daniel",
                    avatar: {
                        url: "images/daniel.png"
                    }
                },
                needReply: false,
                acceptText: "YES",
                rejectText: "NO",
                date: "2017-11-03T12:00:00+8:00"
            }, {
                topicId: 2,
                title: "Checking",
                content: "Where are you heading to?",
                author: {
                    username: "Emily",
                    avatar: {
                        url: "images/emily.png"
                    }
                },
                needReply: true,
                acceptText: null,
                rejectText: null,
                date: "2017-11-03T13:00:00+8:00"
            }, {
                topicId: 3,
                title: "Leisure",
                content: "How long will you need?",
                author: {
                    username: "Emily",
                    avatar: {
                        url: "images/emily.png"
                    }
                },
                needReply: true,
                acceptText: null,
                rejectText: null,
                date: "2017-11-03T14:00:00+8:00"
            }];
    }
    NotificationsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationsPage');
        this.account = this.navParams.get('account');
    };
    return NotificationsPage;
}());
NotificationsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-notifications',template:/*ion-inline-start:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/notifications/notifications.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Notifications</ion-title>\n    <ion-buttons end>\n    <button ion-button item-end (click) = "clearAllMessages()">Clear All</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list>\n    <ion-item class="topic" *ngFor="let topic of topics; index as i" (click)="processReply(i)">\n      <ion-avatar item-start >\n        <img src= "{{topic.author.avatar.url}}">\n      </ion-avatar>\n      <h2 class="topicTitle">\n        {{topic.title}}\n        <span class="date">{{ topic.date }}</span>\n      </h2>\n      <ion-note class="content">{{topic.author.username}} : {{topic.content}}</ion-note>\n      <p class="replyMessage">\n        {{ topic.message }}\n      </p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer *ngIf = "this.chosenTopicId">\n\n  <ion-toolbar>\n    <form (submit)="sendMessage()">\n      <!-- <ion-item no-lines>\n      <ion-icon item-start name="chatbubbles"></ion-icon>\n      <input class="message-input" dir="auto" placeholder="Type your message" autocomplete ="on" autocorrect="on" spellcheck=true />\n    </ion-item> -->\n    <ion-searchbar placeholder="Type your message"\n    [(ngModel)]="message" name="message" >\n  </ion-searchbar>\n</form>\n<!-- [showCancelButton]="shouldShowCancel" -->\n<!--    (ionCancel)="onCancel($event)"-->\n</ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/notifications/notifications.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], NotificationsPage);

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notifications_notifications__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_api_api__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_ibeacon__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
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
    function TrackingPage(navCtrl, api, toastCtrl, navParams, storage, ibeacon) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.ibeacon = ibeacon;
        this.homePage = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        this.notificationsPage = __WEBPACK_IMPORTED_MODULE_3__notifications_notifications__["a" /* NotificationsPage */];
        this.beaconScanning = function () {
            try {
                this.ibeacon.requestAlwaysAuthorization();
                var delegate = this.ibeacon.Delegate();
                delegate.didRangeBeaconsInRegion().subscribe(function (data) {
                    console.log('didRangeBeaconsInRegion: ', data);
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
                if (this.device.account.attendance) {
                    this.attendance = this.device.account.attendance;
                }
                else {
                    this.attendance = null;
                }
                if (this.device.account.tracking) {
                    if (this.device.account.tracking.section) {
                        this.section = this.device.account.tracking.section;
                    }
                    else {
                        this.section = null;
                    }
                    if (this.device.account.tracking.stations) {
                        this.stations = this.device.account.tracking.stations;
                    }
                    else {
                        this.stations = [];
                    }
                }
                else {
                    this.section = null;
                    this.stations = [];
                }
            }
            else {
                this.attendance = null;
                this.section = null;
                this.stations = [];
            }
        };
        this.getBeaconRegion = function () {
            var _this = this;
            this.api.sendRequest("BeaconRegion", -1, null, null, function (res) {
                console.log("this.region", res);
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
                }
                catch (e) {
                    console.log(e);
                }
            }, function (err) {
                _this.presentToast(err);
            });
        };
        this.syncMobile = function () {
            var _this = this;
            var input = {
                name: this.device.name
            };
            console.log(input);
            this.api.sendRequest("SyncDevice", -1, null, input, function (res) {
                console.log("this.device", res);
                if (res.account) {
                    _this.device = res;
                    // this.storage.set('SMRT_DEVICE', this.device);
                    _this.processDeviceData();
                }
                else {
                    _this.presentToast("This device has not link to account!");
                }
            }, function (err) {
                _this.presentToast(err);
            });
        };
        this.goNotificationsPage = function () {
            // console.log("Ojbect: "+topic);
            // this.navCtrl.push(this.notificationsPage, {
            //   username : this.username
            // })
        };
        this.logout = function () {
            var _this = this;
            this.storage.remove('SMRT_DEVICE').then(function (val) {
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
            var diff = __WEBPACK_IMPORTED_MODULE_7_moment___default()().diff(date, 'seconds');
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
        this.device = {
            deviceId: 0,
            name: "",
            number: "",
            model: "",
            account: null,
            date: ""
        };
        this.attendance = null;
        this.section = null;
        this.stations = [];
    }
    TrackingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.checkLogin(function () {
            _this.processDeviceData();
            _this.beaconScanning();
            _this.getBeaconRegion();
        }, function () {
            _this.logout();
        });
    };
    return TrackingPage;
}());
TrackingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tracking',template:/*ion-inline-start:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/tracking/tracking.html"*/'<!--\n  Generated template for the TrackingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton= "true">\n    <ion-title>\n      SMRT Tracking\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only large (click) = "goNotificationsPage(account)">\n        <ion-icon class="notificationIcon"name="mail"></ion-icon>\n        <ion-badge class="nav-badge">3</ion-badge>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card class="account">\n    <ion-item class="item">\n      <ion-avatar item-start>\n        <img [src]="device.account?device.account.avatar?device.account.avatar.url:\'\':\'\'" />\n      </ion-avatar>\n     <h2 class="name">\n       {{ device.account?device.account.username:"No Name" }}\n     </h2>\n     <h2 class="model">\n       {{ device.model }}\n     </h2>\n    </ion-item>\n  </ion-card>\n  <ion-card class="attendance">\n    <ion-item class="item">\n      <ion-icon name="log-in" item-start large></ion-icon>\n      <h2 class="title">\n        {{ attendance?\n          attendance.checkInStation?\n          attendance.checkInStation.name:\n          "Not check In":\n          "No Attendance Record" }}\n      </h2>\n      <h3 class="info">\n        {{ attendance?\n          attendance.checkInDate?\n          attendance.checkInDate:\n          "no record":\n          "no record" }}\n      </h3>\n    </ion-item>\n    <ion-item class="item">\n      <ion-icon name="log-out" item-start large></ion-icon>\n      <h2 class="title">\n        {{ attendance?\n          attendance.checkOutStation?\n          attendance.checkOutStation.name:\n          "Not check Out":\n          "No Attendance Record" }}\n      </h2>\n      <h3 class="info">\n        {{ attendance?\n          attendance.checkOutDate?\n          attendance.checkOutDate:\n          "no record":\n          "no record" }}\n      </h3>\n    </ion-item>\n  </ion-card>\n  <ion-card class="tracking">\n    <ion-item class="stations">\n      <ion-grid>\n        <ion-row>\n          <ion-col *ngFor="let station of stations">\n            <div class="station">\n              <station-icon [station]="station"></station-icon>\n              <div class="name">\n                {{ station.name }}\n              </div>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n    <ion-item class="section">\n      <h2 class="title">\n        Section:\n        {{ section?\n          section.name +\n          (section.remark?" "+section.remark:""):\n          "no record" }}\n      </h2>\n      <h3 class="info">\n        {{ device.account?\n          device.account.tracking?\n          (device.account.tracking.date|dateFormat:\'YYYY MMM DD HH:mm:ss\'):\n          "no record":\n          "no record" }}\n      </h3>\n      <h3 class="info-sm">\n        {{ device.account?\n          device.account.tracking?\n          (formatDate(device.account.tracking.date) + " ago"):\n          "no record":\n          "no record" }}\n      </h3>\n    </ion-item>\n  </ion-card>\n  <ion-fab bottom right mini>\n    <button class="logoutButton" ion-fab (click) ="logout()">\n      <ion-icon name="arrow-dropleft"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/tracking/tracking.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_api_api__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_ibeacon__["a" /* IBeacon */]])
], TrackingPage);

//# sourceMappingURL=tracking.js.map

/***/ }),

/***/ 114:
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
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/notifications/notifications.module": [
		397,
		1
	],
	"../pages/tracking/tracking.module": [
		398,
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
webpackAsyncContext.id = 157;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(338);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tracking_tracking__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_api_api__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_components_module__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_ibeacon__ = __webpack_require__(158);
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
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tracking/tracking.module#TrackingPageModule', name: 'TrackingPage', segment: 'tracking', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__["a" /* PipesModule */],
            __WEBPACK_IMPORTED_MODULE_13__components_components_module__["a" /* ComponentsModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tracking_tracking__["a" /* TrackingPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_10__providers_api_api__["a" /* ApiProvider */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_ibeacon__["a" /* IBeacon */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 160,
	"./af.js": 160,
	"./ar": 161,
	"./ar-dz": 162,
	"./ar-dz.js": 162,
	"./ar-kw": 163,
	"./ar-kw.js": 163,
	"./ar-ly": 164,
	"./ar-ly.js": 164,
	"./ar-ma": 165,
	"./ar-ma.js": 165,
	"./ar-sa": 166,
	"./ar-sa.js": 166,
	"./ar-tn": 167,
	"./ar-tn.js": 167,
	"./ar.js": 161,
	"./az": 168,
	"./az.js": 168,
	"./be": 169,
	"./be.js": 169,
	"./bg": 170,
	"./bg.js": 170,
	"./bm": 171,
	"./bm.js": 171,
	"./bn": 172,
	"./bn.js": 172,
	"./bo": 173,
	"./bo.js": 173,
	"./br": 174,
	"./br.js": 174,
	"./bs": 175,
	"./bs.js": 175,
	"./ca": 176,
	"./ca.js": 176,
	"./cs": 177,
	"./cs.js": 177,
	"./cv": 178,
	"./cv.js": 178,
	"./cy": 179,
	"./cy.js": 179,
	"./da": 180,
	"./da.js": 180,
	"./de": 181,
	"./de-at": 182,
	"./de-at.js": 182,
	"./de-ch": 183,
	"./de-ch.js": 183,
	"./de.js": 181,
	"./dv": 184,
	"./dv.js": 184,
	"./el": 185,
	"./el.js": 185,
	"./en-au": 186,
	"./en-au.js": 186,
	"./en-ca": 187,
	"./en-ca.js": 187,
	"./en-gb": 188,
	"./en-gb.js": 188,
	"./en-ie": 189,
	"./en-ie.js": 189,
	"./en-nz": 190,
	"./en-nz.js": 190,
	"./eo": 191,
	"./eo.js": 191,
	"./es": 192,
	"./es-do": 193,
	"./es-do.js": 193,
	"./es-us": 194,
	"./es-us.js": 194,
	"./es.js": 192,
	"./et": 195,
	"./et.js": 195,
	"./eu": 196,
	"./eu.js": 196,
	"./fa": 197,
	"./fa.js": 197,
	"./fi": 198,
	"./fi.js": 198,
	"./fo": 199,
	"./fo.js": 199,
	"./fr": 200,
	"./fr-ca": 201,
	"./fr-ca.js": 201,
	"./fr-ch": 202,
	"./fr-ch.js": 202,
	"./fr.js": 200,
	"./fy": 203,
	"./fy.js": 203,
	"./gd": 204,
	"./gd.js": 204,
	"./gl": 205,
	"./gl.js": 205,
	"./gom-latn": 206,
	"./gom-latn.js": 206,
	"./gu": 207,
	"./gu.js": 207,
	"./he": 208,
	"./he.js": 208,
	"./hi": 209,
	"./hi.js": 209,
	"./hr": 210,
	"./hr.js": 210,
	"./hu": 211,
	"./hu.js": 211,
	"./hy-am": 212,
	"./hy-am.js": 212,
	"./id": 213,
	"./id.js": 213,
	"./is": 214,
	"./is.js": 214,
	"./it": 215,
	"./it.js": 215,
	"./ja": 216,
	"./ja.js": 216,
	"./jv": 217,
	"./jv.js": 217,
	"./ka": 218,
	"./ka.js": 218,
	"./kk": 219,
	"./kk.js": 219,
	"./km": 220,
	"./km.js": 220,
	"./kn": 221,
	"./kn.js": 221,
	"./ko": 222,
	"./ko.js": 222,
	"./ky": 223,
	"./ky.js": 223,
	"./lb": 224,
	"./lb.js": 224,
	"./lo": 225,
	"./lo.js": 225,
	"./lt": 226,
	"./lt.js": 226,
	"./lv": 227,
	"./lv.js": 227,
	"./me": 228,
	"./me.js": 228,
	"./mi": 229,
	"./mi.js": 229,
	"./mk": 230,
	"./mk.js": 230,
	"./ml": 231,
	"./ml.js": 231,
	"./mr": 232,
	"./mr.js": 232,
	"./ms": 233,
	"./ms-my": 234,
	"./ms-my.js": 234,
	"./ms.js": 233,
	"./my": 235,
	"./my.js": 235,
	"./nb": 236,
	"./nb.js": 236,
	"./ne": 237,
	"./ne.js": 237,
	"./nl": 238,
	"./nl-be": 239,
	"./nl-be.js": 239,
	"./nl.js": 238,
	"./nn": 240,
	"./nn.js": 240,
	"./pa-in": 241,
	"./pa-in.js": 241,
	"./pl": 242,
	"./pl.js": 242,
	"./pt": 243,
	"./pt-br": 244,
	"./pt-br.js": 244,
	"./pt.js": 243,
	"./ro": 245,
	"./ro.js": 245,
	"./ru": 246,
	"./ru.js": 246,
	"./sd": 247,
	"./sd.js": 247,
	"./se": 248,
	"./se.js": 248,
	"./si": 249,
	"./si.js": 249,
	"./sk": 250,
	"./sk.js": 250,
	"./sl": 251,
	"./sl.js": 251,
	"./sq": 252,
	"./sq.js": 252,
	"./sr": 253,
	"./sr-cyrl": 254,
	"./sr-cyrl.js": 254,
	"./sr.js": 253,
	"./ss": 255,
	"./ss.js": 255,
	"./sv": 256,
	"./sv.js": 256,
	"./sw": 257,
	"./sw.js": 257,
	"./ta": 258,
	"./ta.js": 258,
	"./te": 259,
	"./te.js": 259,
	"./tet": 260,
	"./tet.js": 260,
	"./th": 261,
	"./th.js": 261,
	"./tl-ph": 262,
	"./tl-ph.js": 262,
	"./tlh": 263,
	"./tlh.js": 263,
	"./tr": 264,
	"./tr.js": 264,
	"./tzl": 265,
	"./tzl.js": 265,
	"./tzm": 266,
	"./tzm-latn": 267,
	"./tzm-latn.js": 267,
	"./tzm.js": 266,
	"./uk": 268,
	"./uk.js": 268,
	"./ur": 269,
	"./ur.js": 269,
	"./uz": 270,
	"./uz-latn": 271,
	"./uz-latn.js": 271,
	"./uz.js": 270,
	"./vi": 272,
	"./vi.js": 272,
	"./x-pseudo": 273,
	"./x-pseudo.js": 273,
	"./yo": 274,
	"./yo.js": 274,
	"./zh-cn": 275,
	"./zh-cn.js": 275,
	"./zh-hk": 276,
	"./zh-hk.js": 276,
	"./zh-tw": 277,
	"./zh-tw.js": 277
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
webpackContext.id = 374;

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(80);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_format_date_format__ = __webpack_require__(394);
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

/***/ 394:
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

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__station_icon_station_icon__ = __webpack_require__(396);
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
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__station_icon_station_icon__["a" /* StationIconComponent */]]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 396:
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

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tracking_tracking__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_api__ = __webpack_require__(81);
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
        var _this = this;
        this.checkLogin(function () {
            _this.navCtrl.push(_this.trackingPage);
        }, function () {
            // NOTHING
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/home/home.html"*/'\n<ion-header>\n</ion-header>\n<ion-content class="loginBackground">\n    <form (submit)="login()" class= "login">\n      <img src= "images/SMRTlogo.png"  />\n      <ion-list class="loginList">\n        <ion-item class="input">\n          <ion-label class="lable">Device :</ion-label>\n          <ion-input type="string" [(ngModel)]="device.name" name = "deviceName"></ion-input>\n        </ion-item>\n          <button ion-button block class="loginButton">Link Device</button>\n        </ion-list>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/yaqing.bie/Documents/Github/smrt_tracking/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_api_api__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(364);
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
            console.log(method, url, headers, id, input, operation);
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

},[319]);
//# sourceMappingURL=main.js.map