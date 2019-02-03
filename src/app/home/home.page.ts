import { Component } from '@angular/core';
import { ModalController, IonItemSliding } from '@ionic/angular';
import { PlanModalPage } from '../plan-modal/plan-modal.page';
import { Plan } from '../services/Plan';
import { PlanService } from '../services/plan.service';

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
    }
  }

  selectPlan(plan) {
    this.planService.setActualPlan(plan);
    this.planService.navigatePage('/plan');
  }

  returnClass(type: string) {
    return  `../../assets/icon/${type.toLowerCase()}.svg`;
  }

  deletePlan(slidingItem: IonItemSliding, id: number) {
    slidingItem.close();
    this.planService.deletePlan(id);
  }
}
