import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlanModalPage } from '../plan-modal/plan-modal.page';
import { PlanService } from '../services/plan.service';
import { Plan } from '../services/Plan';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public items: string[];
  public plans: Plan[];

  constructor(private modalController: ModalController, private planService: PlanService) {
    this.plans = [];
  }

  ionViewWillEnter() {
    this.planService.getStoredPlans().then(sPlans => {

      this.plans = sPlans;
    });
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: PlanModalPage
    });

    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      const newPlan = new Plan(data.name, data.type, data.date, data.place);
      this.planService.setNewPlan(newPlan);
      this.plans = this.planService.getPlans();
    }
  }

  selectPlan(plan) {
    console.log(plan);
    this.planService.setActualPlan(plan);
    this.planService.navigatePage('/plan');
  }

  returnClass(type: string) {
    return  `../../assets/icon/${type.toLowerCase()}.svg`;
  }
}
