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
  private actualPlan: Plan;
  private language: string;
  constructor(private router: Router,
              private storage: Storage) { }

  getPlans(): Plan[] {
    return this.plans;
  }

  setActualPlan(aPlan: Plan) {
    this.actualPlan = aPlan;
  }

  getActualPlan() {
    return this.actualPlan;
  }

  returnTypePlans() {
    const type1 = new Object({'value': 'WEDDING', 'name': 'WEDDING'});
    const type2 = new Object({'value': 'COMMUNION', 'name': 'COMMUNION'});
    const type3 = new Object({'value': 'BAPTISM', 'name': 'BAPTISM'});
    const type4 = new Object({'value': 'MEETING', 'name': 'MEETING'});
    const type5 = new Object({'value': 'WORK', 'name': 'WORK'});
    const type6 = new Object({'value': 'OTHER', 'name': 'OTHER'});
    return [type1, type2, type3, type4, type5, type6];
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
    console.log("After ID", newPlan);
    this.plans.push(newPlan);
    this.storage.set('plans', JSON.stringify(this.plans));
  }

  async getStoredPlans() {
    return this.getFromStorageAsync('plans').then(plansArray => {
      const data = JSON.parse(plansArray);
      this.plans = data !== null ? data : [];
      return this.plans;
    });
  }

  getStoredLanguage() {
    return this.getFromStorageAsync('lang').then(language => {
      this.language = language !== null ? language : 'es';
      return this.language;
    });
  }


  async getFromStorageAsync(keyStorage) {
    return await this.storage.get(keyStorage);
  }

  deletePlan(idPlan: number) {
    this.plans.splice(idPlan, 1);
    console.table(this.plans);
    this.storage.set('plans', JSON.stringify(this.plans));

    // WIP: Deleting a plan will delete its tables and related users.
  }


    // OPTIONS METHODS

    setLanguage(option: string) {
      if (this.language !== option) {
        this.language = option;
        this.storage.set('lang', this.language);
      }
    }

    getLanguage() {
      return this.language;
    }

    getDefaultTables() {
      const type1 = new Table('Disco Inferno', 'circle', 5);
      const type2 = new Table('Papa Frita', 'circle', 4);
      const type3 = new Table('', 'square', 6);
      const type4 = new Table('Disco Inferno', 'rectangle', 8);
      return [type1, type2, type3, type4];
    }
}
