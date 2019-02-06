import { Component, OnInit } from '@angular/core';
import { PlanService } from '../services/plan.service';
import { Plan } from '../services/Plan';
import { Table } from '../services/Table';
import { TableModalPage } from '../table-modal/table-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage{
  plan: Plan;
  tables: Table[];
  constructor(private modalController: ModalController, private planService: PlanService) {
    this.plan = new Plan();
   }

  ionViewWillEnter() {
    this.plan = this.planService.getActualPlan();
    this.planService.getStoredTables(this.plan.id).then((tables) => {
      this.tables = tables;
    });
  }

  async createTable() {
    const modal = await this.modalController.create({
      component: TableModalPage
    });

    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log(data);
      const result: Table[] = [];
      if (data.units === 1) {
        const newTable = new Table(data.name, data.type, data.seats);
        result.push(newTable);
      } else {
        for (let x = 0; x < data.units; x++) {
          const newTable = new Table('', data.type, data.seats);
          result.push(newTable);
        }
      }
      this.planService.setNewTables(result);
    }
    // TODO: Si creas multiples mesas, indicar que puedes editar su nombre en cada una.
  }

}
