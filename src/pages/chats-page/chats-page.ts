import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Chat } from 'api/models/chat';
import { Chats } from 'api/collections/chats';
import { Messages } from 'api/collections/messages';
import { AlertController, ModalController, NavController, PopoverController } from 'ionic-angular';
import { MessagesPage } from '../messages-page/messages-page';
import { ChatsOptions } from './chats-options/chats-options';
import { NewChat } from './new-chat/new-chat';
import { Users } from 'api/collections/users';
import { Message } from 'api/models/message';
import { Subscriber } from 'rxjs/Subscriber';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
  selector: 'page-chats-page',
  templateUrl: 'chats-page.html',
})
export class ChatsPage implements OnInit {
  chats;
  senderId: string;

  constructor(private navCtrl: NavController, private popoverCtrl: PopoverController,
              private modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.senderId = Meteor.userId();
  }

  ngOnInit(): void {
    Observable.merge(MeteorObservable.subscribe('chats'), MeteorObservable.autorun()).subscribe(() => {
      this.chats = this.findChats();
    });
    // MeteorObservable.subscribe('chats').subscribe(() => {
    //   MeteorObservable.autorun().subscribe(() => {
    //
    //   });
    // });
  }

  findChats(): Observable<Chat[]> {
    // Find chats and transform them
    return Chats.find({}).map(chats => {
      chats.forEach(chat => {
        chat.title = '';
        chat.picture = '';

        const receiverId = chat.memberIds.find(memberId => memberId !== this.senderId);
        const receiver = Users.findOne(receiverId);

        if (receiver) {
          chat.title = receiver.profile.name;
          chat.picture = receiver.profile.picture;
        }

        // This will make the last message reactive
        this.findLastChatMessage(chat._id).subscribe((message) => {
          chat.lastMessage = message;
        });
      });

      return chats;
    });
  }

  findLastChatMessage(chatId: string): Observable<Message> {
    return Observable.create((observer: Subscriber<Message>) => {
      const chatExists = () => !!Chats.findOne(chatId);

      // Re-compute until chat is removed
      MeteorObservable.autorun().takeWhile(chatExists).subscribe(() => {
        Messages.find({ chatId }, {
          sort: { createdAt: -1 }
        }).subscribe({
          next: (messages) => {
            // Invoke subscription with the last message found
            if (!messages.length) {
              return;
            }

            const lastMessage = messages[0];
            observer.next(lastMessage);
          },
          error: (e) => {
            observer.error(e);
          },
          complete: () => {
            observer.complete();
          }
        });
      });
    });
  }

  addChat(): void {
    const modal = this.modalCtrl.create(NewChat);
    modal.present();
  }

  showMessages(chat: Chat): void {
    this.navCtrl.push(MessagesPage, {chat})
  }

  removeChat(chat: Chat): void {
    MeteorObservable.call('removeChat', chat._id).subscribe({
      error: (e: Error) => {
        if (e) {
          this.handleError(e);
        }
      }
    });
  }

  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      buttons: ['OK'],
      message: e.message,
      title: 'Oops!'
    });

    alert.present();
  }

  showOptions(): void {
    const popover = this.popoverCtrl.create(ChatsOptions, {}, {
      cssClass: 'options-popover chats-options-popover'
    });

    popover.present();
  }

}
