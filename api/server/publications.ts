import { User } from './models/profile';
import { Users } from './collections/users';
import { Message } from './models/message';
import { Messages } from './collections/messages';
import { Chat } from './models/chat';
import { Chats } from './collections/chats';
import { Meteor } from 'meteor/meteor';

// can't change to this syntax (): Mongo.Cursor<User> => {}
Meteor.publish('users', function(): Mongo.Cursor<User> {
  if (!this.userId) {
    return;
  }

  return Users.collection.find({}, {
    fields: {
      profile: 1
    }
  });
});

Meteor.publish('messages', function(chatId: string): Mongo.Cursor<Message> {
  if (!this.userId || !chatId) {
    return;
  }

  return Messages.collection.find({chatId}, {
    sort: {createdAt: -1}
  });
});

Meteor.publishComposite('chats', function(): PublishCompositeConfig<Chat> {
  if (!this.userId) {
    return;
  }

  return {
    find: () => {
      return Chats.collection.find({memberIds: this.userId});
    },

    children: [
      <PublishCompositeConfig1<Chat, Message>> {
      find: (chat) => {
        return Messages.collection.find({chatId: chat._id}, {
          sort: {createdAt: -1},
          limit: 1
        });
      }
      },
      <PublishCompositeConfig1<Chat, User>> {
      find: (chat) => {
        return Users.collection.find({
          _id: {$in: chat.memberIds}
        }, {
          fields: {profile: 1}
        });
      }
      }
    ]
  };
});
