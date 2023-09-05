import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../chat-bot/chat/chat.component';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {

  completeForm!: FormGroup;

  range_age!: FormControl;
  gender!: FormControl;
  country_origin!: FormControl;
  profession!: FormControl;
  civil_status!: FormControl;
  completed!: FormControl;

  choices_range_age: Array<any> = [];
  choices_gender: Array<any> = [];
  choices_country_origin: Array<any> = [];
  choices_profession: Array<any> = [];
  choices_civil_status: Array<any> = [];

  first_name!: string;
  logo!: string;

  profile: any = {};

  constructor(
          private _router: Router,
          public modalController: ModalController,
          private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.choicesMaintance();

    this.getProfileUser();

    this.first_name = this.apiService.name_user;
    this.logo = this.apiService.url_logo_company;
  }

  getProfileUser() {
    this.apiService.getUserProfile()
                  .then((res: any) => {
                    for (let i = 0; i < res['results'].length; i++) {
                        this.profile = res['results'][i];

                        this.completeForm.patchValue({
                            range_age: this.profile.range_age,
                            gender: this.profile.gender,
                            profession: this.profile.profession,
                            civil_status: this.profile.civil_status,
                            country_origin: this.profile.country_origin
                        })
                    }
                  })
  }

  createFormControls() {
    this.range_age = new FormControl(this.profile.range_age, Validators.required);
    this.gender = new FormControl(this.profile.gender, Validators.required);
    this.country_origin = new FormControl(this.profile.country_origin, Validators.required);
    this.profession = new FormControl(this.profile.profession, Validators.required);
    this.civil_status = new FormControl(this.profile.civil_status, Validators.required);
    this.completed = new FormControl(true);
  }

  createForm() {
    this.completeForm = new FormGroup({
      range_age: this.range_age,
      gender: this.gender,
      profession: this.profession,
      civil_status: this.civil_status,
      country_origin: this.country_origin,
      completed: this.completed
    });
  }

  choicesMaintance() {
      this.apiService.getRangeAge().then((res: any) => this.choices_range_age = res['results']);
      this.apiService.getGender().then((res: any) => this.choices_gender = res['results']);
      this.apiService.getCountryOrigin().then((res: any) => this.choices_country_origin = res['results']);
      this.apiService.getProfession().then((res: any) => this.choices_profession = res['results']);
      this.apiService.getCivilStatus().then((res: any) => this.choices_civil_status = res['results']);
  }

  onSubmit() {
    this.apiService.setProfileUser(this.completeForm.value, this.profile.id)
                   .then( (res: any) => {
                        console.log('grabado')
                        this._router.navigate(['/complete-company']);
                   })
  }

  async chatModal() {
    console.log('ssss')
    const modal = await this.modalController.create({
      component: ChatComponent,
      componentProps: {
      }
    });

    modal.onDidDismiss().then((data) => {
      // this.getData(this.url);
      console.log('cerrandooo')
    });

    return await modal.present();
  }
}
