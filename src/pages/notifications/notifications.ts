import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopicInterface } from '../../model/TopicInterface';
import { Platform, ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  private topics: TopicInterface[];
  private messageForm: {
    message: string,
    showInput: boolean
  };
  private chosenTopicId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private storage: Storage, public actionsheetCtrl: ActionSheetController, private toastCtrl: ToastController) {
    this.chosenTopicId = 0;
    this.messageForm = {
      message: "",
      showInput: false
    };
    this.topics = [];
  }

  ionViewDidLoad(){
    this.loadNotifications();
  }

  private loadNotifications = function() {
    this.storage.get('SMRT_NOTIFICATIONS').then((val) => {
      console.log('SMRT_NOTIFICATIONS', val);
      if(val) {
        this.topics = val;
      } else {
        this.topics =[{
          topicId: 1,
          title: "Notification to Khoa",
          content: "Where are you Khoa?",
          needReply: false,
          acceptText: "Home",
          rejectText: "Toilet",
          author: "BIE YAQING",
          avatar: "https://s3-ap-southeast-1.amazonaws.com/com.viatick/smrt/smrt/1509415183877acc_2.png",
          date : "2017-11-03T14:00:00+8:00"
        }, {
          topicId: 2,
          title: "Notification to Khoa",
          content: "Are you receiving?",
          needReply: false,
          acceptText: "Yes",
          rejectText: "No",
          author: "BIE YAQING",
          avatar: "https://s3-ap-southeast-1.amazonaws.com/com.viatick/smrt/smrt/1509415183877acc_2.png",
          date : "2017-11-03T14:00:00+8:00"
        }, {
          topicId: 3,
          title: "Notification to Khoa",
          content: "Tell me where are you!",
          needReply: true,
          acceptText: "Yes",
          rejectText: "No",
          author: "BIE YAQING",
          avatar: "https://s3-ap-southeast-1.amazonaws.com/com.viatick/smrt/smrt/1509415183877acc_2.png",
          date : "2017-11-03T14:00:00+8:00"
        }];
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
        role: 'destructive',
        icon: !this.platform.is('ios') ? 'trash' : null,
        handler: () => {
          for(var o in this.topics) {
            let topic = this.topics[o];
            if(topic.topicId == this.chosenTopicId) {
              this.topics[o].message = `Replied: ${acceptText}`;
              this.chosenTopicId = 0;
              this.saveNotifications();
              break;
            }
          }
        }
      }, {
        text: rejectText,
        role: 'destructive',
        icon: !this.platform.is('ios') ? 'trash' : null,
        handler: () => {
          for(var o in this.topics) {
            let topic = this.topics[o];
            if(topic.topicId == this.chosenTopicId) {
              this.topics[o].message = `Replied: ${rejectText}`;
              this.chosenTopicId = 0;
              this.saveNotifications();
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
        this.topics[o].message = `Replied: ${this.messageForm.message}`;
        this.saveNotifications();
        this.chosenTopicId = 0;
        this.messageForm.message = "";
        this.messageForm.showInput = false;
        break;
      }
    }
  };

  private processReply = function(idx: number) {
    this.chosenTopicId = idx;
    console.log(this.chosenTopicId);
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

}
