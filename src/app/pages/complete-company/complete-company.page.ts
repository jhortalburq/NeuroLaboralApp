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
  selector: 'app-complete-company',
  templateUrl: './complete-company.page.html',
  styleUrls: ['./complete-company.page.scss'],
})
export class CompleteCompanyPage implements OnInit {

  completeForm!: FormGroup;

  business_category!: FormControl;
  work_area!: FormControl;
  position_job!: FormControl;
  hierarchical_level!: FormControl;
  responsability_level!: FormControl;
  stress_level!: FormControl;
  skill_improve!: FormControl;
  goal_achieve!: FormControl;
  completed!: FormControl;

  first_name!: string;
  logo!: string;

  profile: any = {};

  choices_business_category: Array<any> = [];
  choices_work_area: Array<any> = [];
  choices_position_job: Array<any> = [];
  choices_hierarchical_level: Array<any> = [];
  choices_responsability_level: Array<any> = [];
  choices_stress_level: Array<any> = [];
  choices_skill_improve: Array<any> = [];
  choices_goal_achieve: Array<any> = [];

  constructor(
    private _router: Router,
    public modalController: ModalController,
    private apiService: ApiService,
    ) { }

  ngOnInit() {
    this.first_name = this.apiService.name_user;
    this.logo = this.apiService.url_logo_company;
    this.createFormControls();
    this.createForm();

    this.choicesMaintance();
    this.getProfileCompany();
  }


  getProfileCompany() {
    this.apiService.getCompanyProfile()
                  .then((res: any) => {
                    for (let i = 0; i < res['results'].length; i++) {
                        this.profile = res['results'][i];

                        this.completeForm.patchValue({
                            business_category: this.profile.business_category,
                            work_area: this.profile.work_area,
                            position_job: this.profile.position_job,
                            hierarchical_level: this.profile.hierarchical_level,
                            stress_level: this.profile.stress_level,
                            responsability_level: this.profile.responsability_level,
                            skill_improve: this.profile.skill_improve,
                            goal_achieve: this.profile.goal_achieve,
                        })
                    }
                  })
  }

  choicesMaintance() {
    this.apiService.getBusinessCategory().then((res: any) => this.choices_business_category = res['results']);
    this.apiService.getWorkArea().then((res: any) => this.choices_work_area = res['results']);
    this.apiService.getSkillImprove().then((res: any) => this.choices_skill_improve = res['results']);
    this.apiService.getHierarchicalLevel().then((res: any) => this.choices_hierarchical_level = res['results']);
    this.apiService.getResponsabilityLevel().then((res: any) => this.choices_responsability_level = res['results']);
    this.apiService.getStressLevel().then((res: any) => this.choices_stress_level = res['results']);
    this.apiService.getPositionJob().then((res: any) => this.choices_position_job = res['results']);
    this.apiService.getGoalAchieve().then((res: any) => this.choices_goal_achieve = res['results']);
  }

  createFormControls() {
    this.business_category = new FormControl(this.profile.business_category, Validators.required);
    this.work_area = new FormControl(this.profile.work_area, Validators.required);
    this.position_job = new FormControl(this.profile.position_job, Validators.required);
    this.hierarchical_level = new FormControl(this.profile.hierarchical_level, Validators.required);
    this.responsability_level = new FormControl(this.profile.responsability_level, Validators.required);
    this.stress_level = new FormControl(this.profile.stress_level, Validators.required);
    this.skill_improve = new FormControl(this.profile.skill_improve, Validators.required);
    this.goal_achieve = new FormControl(this.profile.goal_achieve, Validators.required);
    this.completed = new FormControl(true);
  }

  createForm() {
    this.completeForm = new FormGroup({
      business_category: this.business_category,
      work_area: this.work_area,
      position_job: this.position_job,
      hierarchical_level: this.hierarchical_level,
      responsability_level: this.responsability_level,
      stress_level: this.stress_level,
      skill_improve: this.skill_improve,
      goal_achieve: this.goal_achieve,
      completed: this.completed
    });
  }

  onSubmit() {
    this.apiService.setProfileCompany(this.completeForm.value, this.profile.id)
                   .then( (res: any) => {
                        console.log('grabado')
                        this._router.navigate(['/home']);
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
