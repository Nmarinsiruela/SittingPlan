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
    this.plans = this.planService.returnDefaultPlans();
  }

    async abrirModal() {
      const modal = await this.modalController.create({
          component: PlanModalPage
      });

      modal.present();

      const { data } = await modal.onDidDismiss();
      console.log(data);
      this.plans.push(new Plan(data.name, data.type, data.date));
    }

    selectPlan(plan) {
      console.log(plan);
      this.planService.navigatePage('/plan');
    }
}
