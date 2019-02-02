import { PlanService } from '../services/plan.service';
import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage {
  langSelected: string;
  audioEnabled: string;
  constructor(private service: PlanService, private translate: TranslateService) {
  }

  ionViewWillEnter() {
    this.service.getStoredLanguage().then((language) => {
      this.langSelected = language;
    });
  }

  selectLanguage(language: string) {
    this.service.setLanguage(language);
    this.translate.use(language);
  }

}
