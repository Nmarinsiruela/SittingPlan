import { Injectable } from '@angular/core';
import { Plan } from './Plan';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { Table } from './Table';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private plans: Plan[];
  private tables: Table[];
  private actualPlan: Plan;
  private actualTable: Table;
  private language: string;
  constructor(private router: Router,
              private storage: Storage) { }

  getPlans(): Plan[] {
    return this.plans;
  }

  getTables(): Table[] {
    return this.tables;
  }

  setActualPlan(aPlan: Plan) {
    this.actualPlan = aPlan;
  }

  getActualPlan() {
    return this.actualPlan;
  }

  setActualTable(aTable: Table) {
    this.actualTable = aTable;
  }

  getActualTable() {
    return this.actualTable;
  }

  navigatePage(destiny: string) {
    this.router.navigateByUrl(destiny);
  }

  // STORAGE-RELATED METHODS

  setNewPlan(newPlan: Plan) {
    if (this.plans.length === 0) {
      newPlan.setId(0);
    } else {
      newPlan.setId(this.plans[this.plans.length - 1].id + 1);
    }
    this.plans.push(newPlan);
    this.storage.set('plans', JSON.stringify(this.plans));
  }

  setNewTables(newTables: Table[]) {
    for (let x = 0; x < newTables.length; x++) {
      newTables[x].setId(this.tables.length !== 0 ? this.tables[this.tables.length - 1].id + 1 : 0);
      newTables[x].setPlanId(this.actualPlan.id);
      this.tables.push(newTables[x]);
    }

    this.storage.set(`tables${this.actualPlan.id}`, JSON.stringify(this.tables));
  }

  setNewPeople(table: Table) {
    const idTable = this.tables.indexOf(table);
    this.tables[idTable] = table;
    this.storage.set(`tables${this.actualPlan.id}`, JSON.stringify(this.tables));
  }

  async getStoredPlans() {
    return this.getFromStorageAsync('plans').then(plansArray => {
      const data = JSON.parse(plansArray);
      this.plans = data !== null ? data : [];
      return this.plans;
    });
  }

  async getStoredTables(idPlan: number) {
    return this.getFromStorageAsync(`tables${idPlan}`).then(tablesArray => {
      const data = JSON.parse(tablesArray);
      this.tables = data !== null ? data : [];
      return this.tables;
    });
  }

  async getStoredLanguage() {
    return this.getFromStorageAsync('lang').then(language => {
      this.language = language !== null ? language : 'es';
      return this.language;
    });
  }

  async getFromStorageAsync(keyStorage) {
    return await this.storage.get(keyStorage);
  }

  deletePlan(plan: Plan) {
    const idPlan = this.plans.indexOf(plan);
    this.plans.splice(idPlan, 1);
    this.storage.set('plans', JSON.stringify(this.plans));
    this.storage.remove(`tables${idPlan}`);

    // WIP: Deleting a plan will delete its tables and related users.
  }

  deleteTable(table: Table) {
    const idTable = this.tables.indexOf(table);
    this.tables.splice(idTable, 1);
    this.storage.set(`tables${table.planId}`, JSON.stringify(this.tables));
  }

  setLanguage(option: string) {
    if (this.language !== option) {
      this.language = option;
      this.storage.set('lang', this.language);
    }
  }

  getLanguage() {
    return this.language;
  }

}
