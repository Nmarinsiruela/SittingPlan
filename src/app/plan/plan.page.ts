import { Component, OnInit } from '@angular/core';
import { PlanService } from '../services/plan.service';
import { Plan } from '../services/Plan';
import { Table } from '../services/Table';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  plan: Plan;
  tables: Table[];
  constructor(private planService: PlanService) { }

  ngOnInit() {
    this.plan = this.planService.getActualPlan();
    this.tables = this.planService.getDefaultTables();
  }

  createTable() {
    console.log(this.plan);
  }

}
