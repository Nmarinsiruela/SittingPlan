import { Component, OnInit } from '@angular/core';
import { Table } from '../services/Table';
import { PlanService } from '../services/plan.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss']
})
export class TablePage implements OnInit {
  submitted = false;
  public form: FormGroup;
  table: Table;
  constructor(
    public formBuilder: FormBuilder,
    private planService: PlanService
  ) {
    this.table = new Table();
  }

  ngOnInit() {
    this.table = this.planService.getActualTable();
    this.form = this.formBuilder.group({
      name: [this.table.name],
      people: this.formBuilder.array([this.addSeat()])
    });
    this.returnSeatsArray();
  }

  get f() {
    return this.form.controls;
  }

  returnSeatsArray() {
    const control = <FormArray>this.form.controls.people;
    for (let x = 1; x < this.table.seats; x++) {
      control.push(this.addSeat());
    }
  }

  addSeat(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  submitData(val: any) {
    console.dir(val);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }
}
