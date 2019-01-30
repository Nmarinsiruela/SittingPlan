import { Component, OnInit } from '@angular/core';
import { PlanService } from '../services/plan.service';
import { Plan } from '../services/Plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  plan: Plan;
  constructor(private planService: PlanService) { }

  ngOnInit() {
    this.plan = this.planService.getActualPlan();
  }

}
