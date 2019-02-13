import { Component } from '@angular/core';
import { PlanService } from '../services/plan.service';
import { Plan } from '../services/Plan';
import { Table } from '../services/Table';
import { TableModalPage } from '../table-modal/table-modal.page';
import { ModalController } from '@ionic/angular';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage {
  plan: Plan;
  tables: Table[];
  searchTables: Table[];
  searchControl: FormControl;
  searching = false;
  constructor(private modalController: ModalController,
              private planService: PlanService,
              public formBuilder: FormBuilder) {
    this.plan = new Plan();
    this.tables = [];
    this.searchTables = [];
    this.searchControl = new FormControl();
   }

  ionViewWillEnter() {
    this.plan = this.planService.getActualPlan();
    this.planService.getStoredTables(this.plan.id).then((tables) => {
      this.tables = tables;
      this.searchTables = this.tables;
      this.searchControl.valueChanges.subscribe(search => {
        this.searching = false;
        this.searchTables = this.filterTables(this.searchControl.value);
    }, debounceTime(750));
    });
  }

  onSearchInput() {
    this.searching = true;
}

  async createTable() {
    const modal = await this.modalController.create({
      component: TableModalPage,
      cssClass: 'home-plan-modal'
    });

    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      const result: Table[] = [];
      if (data.units === 1) {
        data.name = data.name === '' ? '' + (this.tables.length + 1) : data.name;
        const newTable = new Table(data.name, data.type, data.seats);
        result.push(newTable);
      } else {
        for (let x = 1; x <= data.units; x++) {
          const newTable = new Table('' + (this.tables.length + x), data.type, data.seats);
          result.push(newTable);
        }
      }
      this.planService.setNewTables(result);
      this.searchTables = this.tables;
    }
    // TODO: Si creas multiples mesas, indicar que puedes editar su nombre en cada una.
  }

  selectTable(table) {
    this.planService.setActualTable(table);
    this.planService.navigatePage('/table');
  }

  filterTables(value) {
    return this.tables.filter((table) => {
      return table.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
  });
  }

  hasTitle(value: string) {
    return ! /^[0-9]+$/.test(value);
  }

}
