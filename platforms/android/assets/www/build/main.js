webpackJsonp([2],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__ = __webpack_require__(77);
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
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MessagePage = (function () {
    function MessagePage(navCtrl, navParams, keyboard) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.keyboard = keyboard;
        this.navParams = navParams;
        this.keyboard = keyboard;
    }
    MessagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessagePage');
        this.topic = this.navParams.get('topic');
        this.account = this.navParams.get('account');
        this.messages = this.topic.messages;
    };
    MessagePage.prototype.inputUp = function () {
        this.keyboard.show();
    };
    MessagePage.prototype.inputDown = function () {
        this.keyboard.close();
    };
    // sendMessage() : void{
    //   this.topic.messages.push(
    //   this.topic)
    // }
    MessagePage.prototype.closeKeyboard = function () {
        this.keyboard.close();
    };
    return MessagePage;
}());
MessagePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-message',template:/*ion-inline-start:"/Users/Weiqiao/Documents/GitHub/ionic_frontend/src/pages/message/message.html"*/'<!--\n  Generated template for the MessagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>{{topic?.topicTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <ion-item no-lines *ngFor ="let message of messages">\n      <div *ngIf="message.author.username ==account.username" class="my">\n        <div class="myUsernameAndMessage">\n          <h4 class="myUsername">{{message.author.username}}</h4>\n          <p class="myMessage">\n            {{message.content}}\n          </p>\n          <h4 class="myMessageTime">at {{message.date}}</h4>\n        </div>\n        <ion-avatar class="myProfile">\n          <img src ="{{message.author.avatar.url}}" />\n        </ion-avatar>\n      </div>\n      <div *ngIf="message.author.username !==account.username" class="other">\n        <ion-avatar class ="otherProfile">\n          <img src ="{{message.author.avatar.url}}"  />\n        </ion-avatar>\n        <div class="otherUsernameAndMessage">\n          <h4 class="otherUsername">{{message.author.username}}</h4>\n          <p class="otherMessage">\n            {{message.content}}\n          </p>\n          <h4 class="otherMessageTime">at {{message.date}}</h4>\n        </div>\n      </div>\n    </ion-item>\n</ion-content>\n\n\n<ion-footer>\n  <ion-toolbar>\n    <label class="item-input-wrapper">\n      <input class="input" type="text" placeholder="Type your message" on-return="closeKeyboard()" ng-model="text.content" on-focus="inputUp()" on-blur="inputDown()" />\n    </label>\n    <button class="button" large >\n      <!-- ng-click="sendMessage()" -->\n      <ion-icon name="send" class="sendIcon"></ion-icon>\n      <!-- Send -->\n    </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/Weiqiao/Documents/GitHub/ionic_frontend/src/pages/message/message.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__["a" /* Keyboard */]])
], MessagePage);

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_message__ = __webpack_require__(101);
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
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotificationsPage = (function () {
    function NotificationsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.messagePage = __WEBPACK_IMPORTED_MODULE_2__message_message__["a" /* MessagePage */];
        this.topics = [
            {
                topicID: "topicID1",
                topicTitle: "topicTitle1",
                needReply: 1,
                author: {
                    username: "username1",
                    avatar: {
                        url: ""
                    }
                },
                date: "date1",
                messages: [
                    {
                        author: {
                            username: "emily",
                            avatar: {
                                url: "images/emily.png"
                            }
                        },
                        content: "Hi, are you there?",
                        date: "message1Topic1Time"
                    }, {
                        author: {
                            username: "daniel",
                            avatar: {
                                url: "images/daniel.png"
                            }
                        },
                        content: "yygo dinner later?",
                        date: "message2Topic1Time"
                    }, {
                        author: {
                            username: "myself",
                            avatar: {
                                url: "images/me.jpg"
                            }
                        },
                        content: "See you after work ",
                        date: "message3Topic1Time"
                    }
                ]
            },
            {
                topicID: "topicID2",
                topicTitle: "topicTitle2",
                needReply: 0,
                author: {
                    username: "username2",
                    avatar: {
                        url: "url2"
                    }
                },
                date: "date2",
                messages: [
                    {
                        author: {
                            username: "emily",
                            avatar: {
                                url: "images/emily.png"
                            }
                        },
                        content: "yes",
                        date: "message1Topic2Time"
                    }
                ]
            }
        ];
    }
    NotificationsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationsPage');
        this.account = this.navParams.get('account');
    };
    NotificationsPage.prototype.goMessagePage = function (topic, account) {
        // console.log("Ojbect: "+topic);
        this.navCtrl.push(this.messagePage, {
            topic: topic,
            account: account
        });
    };
    return NotificationsPage;
}());
NotificationsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-notifications',template:/*ion-inline-start:"/Users/Weiqiao/Documents/GitHub/ionic_frontend/src/pages/notifications/notifications.html"*/'<!--\n  Generated template for the NotificationsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Notifications</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list *ngFor ="let topic of topics">\n    <!-- <div > -->\n    <ion-item-sliding *ngFor ="let message of topic.messages">\n      <ion-item>\n        <ion-avatar item-start>\n          <img src= "{{message.author.avatar.url}}">\n        </ion-avatar>\n        <h2 class= "topicTitle"> {{topic.topicTitle}}</h2>\n        <h2 class = "topicDate"> {{topic.date}} </h2>\n        <h2 class = "topicContent">{{message.content}}</h2>\n      </ion-item>\n      <ion-item-options side="right" >\n        <button ion-button color="primary" *ngIf="topic.needReply == 0" >\n          Yes\n        </button>\n        <button ion-button color="secondary" *ngIf = "topic.needReply == 0">\n          No\n        </button>\n        <button ion-button color="primary" *ngIf = "topic.needReply == 1"  (click) = "goMessagePage(topic,account)">\n          Reply\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n    <!-- </div> -->\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/Weiqiao/Documents/GitHub/ionic_frontend/src/pages/notifications/notifications.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
], NotificationsPage);

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 111:
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
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/message/message.module": [
		265,
		1
	],
	"../pages/notifications/notifications.module": [
		266,
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
webpackAsyncContext.id = 152;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__ = __webpack_require__(102);
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
        this.notificationsPage = __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__["a" /* NotificationsPage */];
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
        this.authenticated = false;
    }
    HomePage.prototype.login = function () {
        if (this.un == this.account.accountID && this.pwd == this.account.pwdHash) {
            this.authenticated = true;
        }
    };
    HomePage.prototype.goNotificationsPage = function (account) {
        // console.log("Ojbect: "+topic);
        this.navCtrl.push(this.notificationsPage, {
            account: account
        });
    };
    HomePage.prototype.logout = function () {
        this.authenticated = false;
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/Weiqiao/Documents/GitHub/ionic_frontend/src/pages/home/home.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      SMRT Tracking\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only large (click) = "goNotificationsPage(account)">\n        <ion-icon class="notificationIcon"name="mail"></ion-icon>\n        <ion-badge class="nav-badge">3</ion-badge>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content [ngClass]="{\'loginBackground\':!authenticated}" padding>\n  <div *ngIf="!authenticated">\n    <form (submit)="login()" class= "login">\n      <img src= "images/SMRTlogo.png"  />\n      <ion-list class="loginList">\n        <ion-item no-lines class="input">\n          <ion-label class="lable">Account ID</ion-label>\n          <ion-input type="number" [(ngModel)]="un" name = "username"></ion-input>\n        </ion-item>\n        <ion-item  no-lines class="input">\n          <ion-label class="lable">Password</ion-label>\n          <ion-input type="password" [(ngModel)]="pwd" name="password"></ion-input>\n        </ion-item>\n        <div class="buttonDiv">\n          <button ion-button block class="loginButton">Pair</button>\n        </div>\n      </ion-list>\n    </form>\n  </div>\n  <div *ngIf = "authenticated">\n    <ion-card class="accountinfo">\n      <ion-card-header class="headerLable">Account Details</ion-card-header>\n      <ion-item>\n        <ion-avatar item-start>\n          <img src ="{{account.avatar.url}}"/>\n        </ion-avatar>\n       <h2 class="name">{{account.username}}</h2>\n       <h2 class="loginDate">{{account.date}}</h2>\n      </ion-item>\n    </ion-card>\n    <ion-card *ngIf = "authenticated" class="tracking">\n      <ion-card-header class="headerLable">Tracking</ion-card-header>\n      <ion-item>\n        <ion-icon name="pin" item-start large></ion-icon>\n        <h2 class="title">Location :</h2>\n        <h3 class="info"> Station 1, Interval 2</h3>\n      </ion-item>\n      <ion-item>\n        <ion-icon name="time" item-start large></ion-icon>\n        <h2 class="title">Check-in Time :</h2>\n        <h3 class="info"> 16:00 P.M. </h3>\n      </ion-item>\n      <ion-item>\n        <ion-icon name="speedometer" item-start large></ion-icon>\n        <h2 class="title">Distance : </h2>\n        <h3 class="info">3m</h3>\n      </ion-item>\n      <ion-item>\n        <ion-icon name="construct" item-start large></ion-icon>\n        <h2 class="title">Device Model :</h2>\n        <h3 class="info">E285-395</h3>\n      </ion-item>\n    </ion-card>\n    <ion-footer>\n      <ion-toolbar>\n      <button class="logout" ion-button block (click) = "logout()">Log Out</button>\n      </ion-toolbar>\n    </ion-footer>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Weiqiao/Documents/GitHub/ionic_frontend/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(215);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_message_message__ = __webpack_require__(101);
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
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_message_message__["a" /* MessagePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/message/message.module#MessagePageModule', name: 'MessagePage', segment: 'message', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_message_message__["a" /* MessagePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__["a" /* Keyboard */],
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(195);
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
    function MyApp(platform, statusBar, splashScreen, keyboard) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            keyboard.close();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Weiqiao/Documents/GitHub/ionic_frontend/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/Weiqiao/Documents/GitHub/ionic_frontend/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map