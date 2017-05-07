import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MomentModule } from 'angular2-moment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatsPage } from '../pages/chats-page/chats-page';
import { MessagesPage } from '../pages/messages-page/messages-page';
import { PhoneService } from '../services/phone';
import { LoginPage } from '../pages/login-page/login-page';
import { VerificationPage } from '../pages/verification-page/verification-page';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { ChatsOptions } from '../pages/chats-page/chats-options/chats-options';
import { NewChat } from '../pages/chats-page/new-chat/new-chat';

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    MessagesPage,
    LoginPage,
    VerificationPage,
    ProfilePage,
    ChatsOptions,
    NewChat
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    MessagesPage,
    LoginPage,
    VerificationPage,
    ProfilePage,
    ChatsOptions,
    NewChat
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhoneService
  ]
})
export class AppModule {}
