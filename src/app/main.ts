import 'meteor-client'; // import bundled meteor client file
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { MeteorObservable } from 'meteor-rxjs';

Meteor.startup(() => {
  const subscription = MeteorObservable.autorun().subscribe(() => {
    if (Meteor.loggingIn()) {
      return;
    }

    setTimeout(() => {subscription.unsubscribe()});
    platformBrowserDynamic().bootstrapModule(AppModule);
  });
});
