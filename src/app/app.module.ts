import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NotificationsPage} from '../pages/notifications/notifications';
import { TrackingPage } from '../pages/tracking/tracking';
import { ApiProvider } from '../providers/api/api';
import { IonicStorageModule } from '@ionic/storage';

import { PipesModule } from "../pipes/pipes.module";
import { ComponentsModule } from '../components/components.module';

import { IBeacon } from '@ionic-native/ibeacon';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NotificationsPage,
    TrackingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PipesModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NotificationsPage,
    TrackingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    IBeacon,
    BackgroundMode,
    Push
  ]
})
export class AppModule {}
