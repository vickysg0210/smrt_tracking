webpackJsonp([2],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
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
        selector: 'page-notifications',template:/*ion-inline-start:"/Users/Weiqiao/Documents/GitHub/smrt_tracking/src/pages/notifications/notifications.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Notifications</ion-title>\n    <ion-buttons end>\n    <button ion-button item-end (click) = "clearAllMessages()">Clear All</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list>\n    <ion-item class="topic" *ngFor="let topic of topics; index as i" (click)="processReply(i)">\n      <ion-avatar item-start >\n        <img src= "{{topic.author.avatar.url}}">\n      </ion-avatar>\n      <h2 class="topicTitle">\n        {{topic.title}}\n        <span class="date">{{ topic.date }}</span>\n      </h2>\n      <ion-note class="content">{{topic.author.username}} : {{topic.content}}</ion-note>\n      <p class="replyMessage">\n        {{ topic.message }}\n      </p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer *ngIf = "this.chosenTopicId">\n\n  <ion-toolbar>\n    <form (submit)="sendMessage()">\n      <!-- <ion-item no-lines>\n      <ion-icon item-start name="chatbubbles"></ion-icon>\n      <input class="message-input" dir="auto" placeholder="Type your message" autocomplete ="on" autocorrect="on" spellcheck=true />\n    </ion-item> -->\n    <ion-searchbar placeholder="Type your message"\n    [(ngModel)]="message" name="message" >\n  </ion-searchbar>\n</form>\n<!-- [showCancelButton]="shouldShowCancel" -->\n<!--    (ionCancel)="onCancel($event)"-->\n</ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/Weiqiao/Documents/GitHub/smrt_tracking/src/pages/notifications/notifications.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], NotificationsPage);

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(77);
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
    function TrackingPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.homePage = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.notificationsPage = __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__["a" /* NotificationsPage */];
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TrackingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TrackingPage');
        this.url = this.navParams.get('url');
        this.date = this.navParams.get('date');
        this.username = this.navParams.get('username');
    };
    TrackingPage.prototype.goNotificationsPage = function (account) {
        // console.log("Ojbect: "+topic);
        this.navCtrl.push(this.notificationsPage, {
            username: this.username
        });
    };
    TrackingPage.prototype.logout = function () {
        this.navCtrl.pop();
    };
    return TrackingPage;
}());
TrackingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tracking',template:/*ion-inline-start:"/Users/Weiqiao/Documents/GitHub/smrt_tracking/src/pages/tracking/tracking.html"*/'<!--\n  Generated template for the TrackingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton= "true">\n    <ion-title>\n      SMRT Tracking\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only large (click) = "goNotificationsPage(account)">\n        <ion-icon class="notificationIcon"name="mail"></ion-icon>\n        <ion-badge class="nav-badge">3</ion-badge>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card class="accountinfo">\n    <ion-card-header class="headerLable">Account Details</ion-card-header>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src ={{this.url}}/>\n      </ion-avatar>\n     <h2 class="name">{{this.username}}</h2>\n     <h2 class="loginDate">{{this.date}}</h2>\n    </ion-item>\n  </ion-card>\n  <ion-card class="tracking">\n    <ion-card-header class="headerLable">Tracking</ion-card-header>\n    <ion-item class="trackingitem">\n      <ion-icon name="pin" item-start large></ion-icon>\n      <h2 class="trackingtitle">Location :</h2>\n      <h3 class="info"> Station 1, Interval 2</h3>\n    </ion-item>\n    <ion-item class="trackingitem">\n      <ion-icon name="time" item-start large></ion-icon>\n      <h2 class="trackingtitle">Check-in Time :</h2>\n      <h3 class="info"> 16:00 P.M. </h3>\n    </ion-item>\n    <ion-item class="trackingitem">\n      <ion-icon name="speedometer" item-start large></ion-icon>\n      <h2 class="trackingtitle">Distance : </h2>\n      <h3 class="info">3m</h3>\n    </ion-item>\n    <ion-item class="trackingitem">\n      <ion-icon name="construct" item-start large></ion-icon>\n      <h2 class="trackingtitle">Device Model :</h2>\n      <h3 class="info">E285-395</h3>\n    </ion-item>\n  </ion-card>\n  <ion-fab bottom right mini>\n    <button class="logoutButton" ion-fab (click) ="logout()">\n      <ion-icon name="arrow-dropleft"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/Weiqiao/Documents/GitHub/smrt_tracking/src/pages/tracking/tracking.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], TrackingPage);

//# sourceMappingURL=tracking.js.map

/***/ }),

/***/ 110:
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
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/notifications/notifications.module": [
		264,
		1
	],
	"../pages/tracking/tracking.module": [
		265,
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
webpackAsyncContext.id = 151;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(214);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_notifications_notifications__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tracking_tracking__ = __webpack_require__(101);
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tracking_tracking__["a" /* TrackingPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tracking/tracking.module#TrackingPageModule', name: 'TrackingPage', segment: 'tracking', priority: 'low', defaultHistory: [] }
                ]
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tracking_tracking__["a" /* TrackingPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(77);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Weiqiao/Documents/GitHub/smrt_tracking/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/Weiqiao/Documents/GitHub/smrt_tracking/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tracking_tracking__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import {Page} from 'ionic-angular';


var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.trackingPage = __WEBPACK_IMPORTED_MODULE_2__tracking_tracking__["a" /* TrackingPage */];
        this.navCtrl = navCtrl;
        this.account = {
            accountID: 13,
            username: "myself",
            pwdSalt: "pwdSalt",
            pwdHash: "pwdHash",
            avatar: {
                url: "images/me.jpg"
            },
            type: "accountType",
            active: "A",
            date: "loginDate"
        };
    }
    HomePage.prototype.login = function () {
        if (this.un == this.account.accountID) {
            this.navCtrl.push(this.trackingPage, {
                url: this.account.avatar.url,
                date: this.account.date,
                username: this.account.username
            });
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/Weiqiao/Documents/GitHub/smrt_tracking/src/pages/home/home.html"*/'\n<ion-header>\n</ion-header>\n<ion-content padding class="loginBackground">\n    <form (submit)="login()" class= "login">\n      <img src= "images/SMRTlogo.png"  />\n      <ion-list class="loginList">\n        <ion-item class="input">\n          <ion-label class="lable">Device ID :{{authenticated}}</ion-label>\n          <ion-input type="number" [(ngModel)]="un" name = "username"></ion-input>\n        </ion-item>\n          <button ion-button block class="loginButton">Pair</button>\n        </ion-list>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/Weiqiao/Documents/GitHub/smrt_tracking/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[195]);
//# sourceMappingURL=main.js.map