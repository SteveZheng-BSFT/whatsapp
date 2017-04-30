import { MongoObservable } from 'meteor-rxjs';
import { Chat } from '../models/chat';

export const Chats = new MongoObservable.Collection<Chat>('chats');
