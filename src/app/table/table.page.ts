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
      nameTable: [this.table.name],
      people: this.formBuilder.array([])
    });
    this.returnSeatsArray();
  }

  get f() {
    return this.form.controls;
  }

  get formData() { return <FormArray>this.form.get('people'); }

  returnSeatsArray() {
    const control = <FormArray>this.form.controls.people;
    for (let x = 0; x < this.table.seats; x++) {
      control.push(this.addSeat(this.table.people[x]));
    }
  }

  addSeat(person: string = ''): FormGroup {
    return this.formBuilder.group({
      name: [person, Validators.required]
    });
  }

  submitData(formvalues: any) {
    if (this.form.invalid) {
      return;
    }
    this.table.name = formvalues.nameTable;
    const people = [];
    formvalues.people.forEach(element => {
      people.push(element.name);
    });
    this.table.people = people;
    this.planService.setNewPeople(this.table);
    this.planService.navigatePage('/plan');
  }
}
