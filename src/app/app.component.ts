import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { TranslateService } from '@ngx-translate/core';
import { PlanService } from './services/plan.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'HOME',
      url: '/home',
      src: '../assets/icon/md-home.svg'
    },
    {
      title: 'OPTIONS',
      url: '/options',
      src: '../assets/icon/md-list.svg'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private translate: TranslateService,
    private service: PlanService
  ) {
    this.initializeApp();
    this.translate.setDefaultLang('es');
    this.service.getStoredLanguage().then(language => {
      this.translate.use(language);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
}
