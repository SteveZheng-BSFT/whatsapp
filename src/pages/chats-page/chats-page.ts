import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/combineLatest';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/startWith';
import { Chat } from 'api/models/chat';
import { Chats } from 'api/collections/chats';
import { Messages } from 'api/collections/messages';

@Component({
  selector: 'page-chats-page',
  templateUrl: 'chats-page.html',
})
export class ChatsPage implements OnInit {
  chats;

  constructor() {
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

  removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {});
  }

}
