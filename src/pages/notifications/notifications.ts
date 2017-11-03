import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopicInterface } from '../../model/TopicInterface';
import { AccountInterface } from '../../model/AccountInterface';
import { Platform, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  account: AccountInterface;
  topics: TopicInterface[];
  message: string;
  chosenTopicId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public actionsheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
      this.chosenTopicId = 0;
      this.message = "";
      this.topics =[{
        topicId: 1,
        title: "Checking",
        content: "Are you at Station 1?",
        author:{
          username: "Daniel",
          avatar:{
            url: "images/daniel.png"
          }
        },
        needReply: false,
        acceptText: "YES",
        rejectText: "NO",
        date : "2017-11-03T12:00:00+8:00"
      }, {
        topicId: 2,
        title: "Checking",
        content: "Where are you heading to?",
        author:{
          username: "Emily",
          avatar:{
            url: "images/emily.png"
          }
        },
        needReply: true,
        acceptText: null,
        rejectText: null,
        date : "2017-11-03T13:00:00+8:00"
      }, {
        topicId: 3,
        title: "Leisure",
        content: "How long will you need?",
        author:{
          username: "Emily",
          avatar:{
            url: "images/emily.png"
          }
        },
        needReply: true,
        acceptText: null,
        rejectText: null,
        date : "2017-11-03T14:00:00+8:00"
      }]
    }
    ionViewDidLoad(){
      console.log('ionViewDidLoad NotificationsPage');
      this.account = this.navParams.get('account');

    }
    private openYNMenu = function(acceptText: string, rejectText: string) {
      let actionSheet = this.actionsheetCtrl.create({
        title: 'Reply',
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: acceptText,
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              this.topics[this.chosenTopicId].message = `Reply: ${acceptText}`;
            }
          },
          {
            text: rejectText,
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              this.topics[this.chosenTopicId].message = "Reply: " + rejectText;
            }
          },
          {
            text: 'Cancel',
            role: 'cancel', // will always sort to be on the bottom
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    };

openReplyMenu = function(idx: number){
      this.chosenTopicId = idx;
    };

sendMessage = function() {
      this.topics[this.chosenTopicId].message = `Reply: ${this.message}`;
      this.message = "";
      this.chosenTopicId = 0;
    };

processReply = function(idx: number) {
      let topic = this.topics[idx];
      if(!topic.message) {
        if(topic.needReply) {
          this.openReplyMenu(idx);
        } else {
          this.openYNMenu(topic.acceptText, topic.rejectText);
        }
      }
    };
clearAllMessages = function(){
  this.topics= [];
}

  }
