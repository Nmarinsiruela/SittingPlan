import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlanService } from '../services/plan.service';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.page.html',
  styleUrls: ['./table-modal.page.scss'],
})
export class TableModalPage implements OnInit {
  submitted = false;
  public typeTable: Object;
  public form: FormGroup;
  constructor(private modalController: ModalController,
              public formBuilder: FormBuilder,
              private planService: PlanService) {
  }

  ngOnInit() {
    this.typeTable = this.returnTypeTables();
    this.form = this.formBuilder.group({
      seats: [1, Validators.required],
      name: [''],
      units: [1, Validators.required],
      type: ['RECTANGLE', Validators.required]
  });
  }

  returnTypeTables() {
    const table1 = new Object({'value': 'CIRCLE', 'name': 'CIRCLE'});
    const table2 = new Object({'value': 'SQUARE', 'name': 'SQUARE'});
    const table3 = new Object({'value': 'RECTANGLE', 'name': 'RECTANGLE'});
    return [table1, table2, table3];
  }

  get f() {
    return this.form.controls;
  }

  submitData() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.modalController.dismiss({
      'units': this.f.units.value,
      'seats': this.f.seats.value,
      'type': this.f.type.value,
      'name': this.f.name.value
    });
  }

}
