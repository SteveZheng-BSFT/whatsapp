import { MongoObservable } from 'meteor-rxjs';
import { User } from '../models/profile';
import { Meteor } from 'meteor/meteor';

export const Users = MongoObservable.fromExisting<User>(Meteor.users);
