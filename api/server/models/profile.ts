export const DEFAULT_PICTURE_URL = '/assets/default-profile-pic.svg';

export interface Profile {
  name?: string;
  picture?: string;
}

export interface User extends Meteor.User {
  profile?: Profile;
}
