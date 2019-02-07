import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PlanService } from '../services/plan.service';

@Component({
  selector: 'app-plan-modal',
  templateUrl: './plan-modal.page.html',
  styleUrls: ['./plan-modal.page.scss'],
})
export class PlanModalPage implements OnInit {
  min: string;
  submitted = false;
  public typeOptions: Object;
  public planForm: FormGroup;
  constructor(private modalController: ModalController,
              public formBuilder: FormBuilder,
              private planService: PlanService) {
  }

  ngOnInit() {
    this.typeOptions = this.returnTypePlans();
    this.min =  moment().format('YYYY-MM-DD');
    this.planForm = this.formBuilder.group({
      namePlan: ['', Validators.required],
      typePlan: ['OTHER', Validators.required],
      datePlan: [moment().format('YYYY-MM-DD'), Validators.required],
      placePlan: ['']
  });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.planForm.controls;
  }

  submitData() {
    this.submitted = true;
    if (this.planForm.invalid) {
      // Show an alert, input hints or something to inform the user the fields are invalid.
      // Let's just return for now
      return;
    }
    this.modalController.dismiss({
      'name': this.f.namePlan.value,
      'type': this.f.typePlan.value,
      'date': this.f.datePlan.value,
      'place': this.f.placePlan.value
    });
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
