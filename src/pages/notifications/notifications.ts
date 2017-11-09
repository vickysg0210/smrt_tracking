import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopicInterface } from '../../model/TopicInterface';
import { DeviceInterface } from "../../model/DeviceInterface";
import { Platform, ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  private topics: TopicInterface[];
  private device: DeviceInterface;
  private messageForm: {
    message: string,
    showInput: boolean
  };
  private chosenTopicId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private storage: Storage, public actionsheetCtrl: ActionSheetController, private toastCtrl: ToastController, private api: ApiProvider) {
    this.chosenTopicId = 0;
    this.messageForm = {
      message: "",
      showInput: false
    };
    this.topics = [];
  }

  ionViewDidLoad(){

  }

  ionViewDidEnter() {
    console.log("view did enter", "notifications");
    this.checkLogin(() => {
      this.loadNotifications();
    }, () => {
      console.log("login fail...");
      // NOTHING...
    });
  }

  private loadNotifications = function() {
    this.storage.get('SMRT_NOTIFICATIONS').then((val) => {
      console.log('SMRT_NOTIFICATIONS', val);
      if(val) {
        this.topics = val;
      } else {
        this.topics =[
          // {
          //   topicId: 1,
          //   title: "Notification to Khoa",
          //   content: "Where are you Khoa?",
          //   needReply: false,
          //   acceptText: "Home",
          //   rejectText: "Toilet",
          //   author: "BIE YAQING",
          //   avatar: "https://s3-ap-southeast-1.amazonaws.com/com.viatick/smrt/smrt/1509415183877acc_2.png",
          //   date : "2017-11-08T03:38:55Z"
          // }, {
          //   topicId: 2,
          //   title: "Notification to Khoa",
          //   content: "Are you receiving?",
          //   needReply: false,
          //   acceptText: "Yes",
          //   rejectText: "No",
          //   author: "BIE YAQING",
          //   avatar: "https://s3-ap-southeast-1.amazonaws.com/com.viatick/smrt/smrt/1509415183877acc_2.png",
          //   date : "2017-11-08T03:38:55Z"
          // }, {
          //   topicId: 3,
          //   title: "Notification to Khoa",
          //   content: "Tell me where are you!",
          //   needReply: true,
          //   acceptText: "Yes",
          //   rejectText: "No",
          //   author: "BIE YAQING",
          //   avatar: "https://s3-ap-southeast-1.amazonaws.com/com.viatick/smrt/smrt/1509415183877acc_2.png",
          //   date : "2017-11-08T03:38:55Z"
          // }
        ];
      }
    });
  };

  private saveNotifications = function() {
    this.storage.set('SMRT_NOTIFICATIONS', this.topics);
  };

  private presentToast = function(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  };

  private openYNMenu = function(acceptText: string, rejectText: string) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Canned Reply',
      cssClass: 'action-sheets-basic-page',
      buttons: [{
        text: acceptText,
        // role: 'destructive',
        icon: "send",
        handler: () => {
          for(var o in this.topics) {
            let topic = this.topics[o];
            if(topic.topicId == this.chosenTopicId) {
              this.sendMessageRequest(acceptText, true, topic.topicId, () => {
                this.topics[o].message = `Replied: ${acceptText}`;
                this.chosenTopicId = 0;
                this.saveNotifications();
              });
              break;
            }
          }
        }
      }, {
        text: rejectText,
        // role: 'destructive',
        icon: "send",
        handler: () => {
          for(var o in this.topics) {
            let topic = this.topics[o];
            if(topic.topicId == this.chosenTopicId) {
              this.sendMessageRequest(rejectText, false, topic.topicId, () => {
                this.topics[o].message = `Replied: ${rejectText}`;
                this.chosenTopicId = 0;
                this.saveNotifications();
              });
              break;
            }
          }
        }
      }, {
        text: 'Cancel',
        role: 'cancel', // will always sort to be on the bottom
        icon: !this.platform.is('ios') ? 'close' : null,
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  };

  private sendMessage = function() {
    for(var o in this.topics) {
      let topic = this.topics[o];
      if(topic.topicId == this.chosenTopicId) {
        this.sendMessageRequest(this.messageForm.message, true, topic.topicId, () => {
          this.topics[o].message = `Replied: ${this.messageForm.message}`;
          this.saveNotifications();
          this.chosenTopicId = 0;
          this.messageForm.message = "";
          this.messageForm.showInput = false;
        });
        break;
      }
    }
  };

  private processReply = function(idx: number) {
    this.chosenTopicId = idx;
    // console.log(this.chosenTopicId);
    for(var o in this.topics) {
      let topic = this.topics[o];
      if(topic.topicId == this.chosenTopicId) {
        if(!topic.message) {
          if(topic.needReply) {
            this.messageForm.showInput = true;
          } else {
            this.openYNMenu(topic.acceptText, topic.rejectText);
          }
        }
        break;
      }
    }
  };

  private clearAllMessages = function() {
    this.storage.remove('SMRT_NOTIFICATIONS').then((val) => {
      this.topics= [];
    });
  };

  private sendMessageRequest = function(content: string, choice: boolean, topicId: number, success: any) {
    let input = {
      deviceId: this.device.deviceId,
      content: content,
      choice: choice,
      topicId: topicId
    };
    // console.log("input", input);
    this.api.sendRequest("SendMessage", -1, null, input, (res) => {
      console.log("send message request", res);
      success();
    }, (err) => {
      this.presentToast(err);
    });
  };

  ionViewWillLeave() {
    console.log("view will leave", "notifications");
  }

  private onInputCancel = function(evt) {
    this.chosenTopicId = 0;
    this.messageForm.message = "";
    this.messageForm.showInput = false;
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
      } else {
        fail();
      }
    });
  };

}
