import { Component } from '@angular/core';
import { Alert, AlertController, NavController, ViewController } from 'ionic-angular';
import { LoginPage } from '../../login-page/login-page';
import { ProfilePage } from '../../profile-page/profile-page';
import { PhoneService } from '../../../services/phone';

@Component({
  selector: 'page-chats-options',
  templateUrl: 'chats-options.html',
})
export class ChatsOptions {

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private phoneService: PhoneService,
    private viewCtrl: ViewController
  ) {}

  editProfile(): void {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push(ProfilePage);
    });
  }

  logout(): void {
    const alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure you would like to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleLogout(alert);
            return false;
          }
        }
      ]
    });

    // this.viewCtrl.dismiss().then(() => {
    alert.present();
    // });
  }

  handleLogout(alert: Alert): void {
    alert.dismiss().then(() => {
      return this.phoneService.logout();
    })
      .then(() => {
        this.navCtrl.setRoot(LoginPage, {}, {
          animate: true
        });
      })
      .catch((e) => {
        this.handleError(e);
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
