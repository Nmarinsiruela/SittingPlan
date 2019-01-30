import { Injectable } from '@angular/core';
import { Plan } from './Plan';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private plans: Plan[];
  private actualPlan: Plan;
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
    newPlan.setId(this.plans.length);
    console.log(newPlan);
    this.plans.push(newPlan);
    this.storage.set('plans', JSON.stringify(this.plans));
  }

  async getStoredPlans() {
    return this.getFromStorageAsync('plans').then(plansArray => {
      const data = JSON.parse(plansArray);
      console.log('StoredPlans', data);
      this.plans = data !== null ? data : [];
      return this.plans;
    });
  }

  async getFromStorageAsync(keyStorage) {
    return await this.storage.get(keyStorage);
  }

  deletePlan(idPlan: number) {
    this.plans.splice(idPlan, 1);
    this.storage.set('plans', JSON.stringify(this.plans));

    // WIP: Deleting a plan will delete its tables and related users.
  }
}
