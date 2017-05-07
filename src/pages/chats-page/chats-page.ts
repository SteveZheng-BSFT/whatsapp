import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Chat } from 'api/models/chat';
import { Chats } from 'api/collections/chats';
import { Messages } from 'api/collections/messages';
import { NavController, PopoverController } from 'ionic-angular';
import { MessagesPage } from '../messages-page/messages-page';
import { ChatsOptions } from './chats-options/chats-options';

@Component({
  selector: 'page-chats-page',
  templateUrl: 'chats-page.html',
})
export class ChatsPage implements OnInit {
  chats;

  constructor(private navCtrl: NavController, private popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.chats = Chats.find({})
      .mergeMap((chats: Chat[]) =>
        Observable.combineLatest(
          ...chats.map((chat: Chat) =>
            Messages.find({chatId: chat._id})
              .startWith(null)
              .map(messages => {
                if (messages) {
                  chat.lastMessage = messages[0];
                  return chat;
                }
    })))).zone();
  }

  showMessages(chat: Chat): void {
    this.navCtrl.push(MessagesPage, {chat})
  }

  removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {});
  }

  showOptions(): void {
    const popover = this.popoverCtrl.create(ChatsOptions, {}, {
      cssClass: 'options-popover chats-options-popover'
    });

    popover.present();
  }

}
