import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { ChatsPage } from '../chats-page/chats-page';
import { MeteorObservable } from 'meteor-rxjs';
import { Profile } from 'api/models/profile';

@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage implements OnInit {

  picture: string;
  profile: Profile;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.profile = Meteor.user().profile || {
        name: ''
      };
  }

  updateProfile(): void {
    MeteorObservable.call('updateProfile', this.profile).subscribe({
      next: () => {
        this.navCtrl.push(ChatsPage);
      },
      error: (e: Error) => {
        this.handleError(e);
      }
    });
  }

  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      title: 'Oops!',
      message: e.message,
      buttons: ['OK']
    });

    alert.present();
  }

}
