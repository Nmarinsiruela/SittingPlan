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
    this.typeOptions = this.planService.returnTypePlans();
    this.min =  moment().format('YYYY-MM-DD');
    console.log(this.typeOptions);
    this.planForm = this.formBuilder.group({
      namePlan: ['', Validators.required],
      typePlan: ['', Validators.required],
      datePlan: [moment().format('YYYY-MM-DD'), Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.planForm.controls;
  }

  submitData() {
    this.submitted = true;
    console.log('Modal', this.f.namePlan.value, this.f.datePlan.value);
    if (this.planForm.invalid) {
      // Show an alert, input hints or something to inform the user the fields are invalid.
      // Let's just return for now
      return;
    }
    this.modalController.dismiss({
      'name': this.f.namePlan.value,
      'type': this.f.typePlan.value,
      'date': this.f.datePlan.value
    });
  }

}
