import { Injectable } from '@angular/core';
import { Plan } from './Plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor() { }


  returnDefaultPlans() {
    const plan1 = new Plan('Boda Na', 'WEDDING', '2019-06-07');
    const plan2 = new Plan('Boda MA', 'WEDDING', '2019-08-11');
    const plan3 = new Plan('Rol D&D', 'OTHER', '2019-02-03');
    const plan4 = new Plan('Bautizo Juan', 'BAPTISM', '2019-11-22');
    return [plan1, plan2, plan3, plan4];
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
}
