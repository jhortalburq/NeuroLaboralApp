import { Component, OnInit,  } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import {AlertServiceService} from '../../services/alert-service.service';

import swal from 'sweetalert';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})

export class NewPasswordPage implements OnInit {

  forgetForm!: FormGroup;
  password1!: FormControl;
  password2!: FormControl;

  disabled: boolean = false;

  constructor(
        private _router: Router,
        private apiService: ApiService,
        public _alertService: AlertServiceService,
        private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    
    this.createFormControls();
    this.createForm();
  }

  async ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  createFormControls() {
    this.password1 = new FormControl('', Validators.required);
    this.password2 = new FormControl('', Validators.required);
  }

  createForm() {
    this.forgetForm = new FormGroup({
      password1: this.password1,
      password2: this.password2,
    });
  }

  changePassword() {

    if (this.forgetForm.value.password1 !== this.forgetForm.value.password2) {
      this.disabled = true
    } else {
      this.disabled = false
    }

  }

  onSubmit() {
    if (this.forgetForm.valid) {
        this.disabled = true;
        this._router.navigate(['/home']);

            this.apiService.setPassword(this.forgetForm.value.password1.trim())
                            .then( (res: any) => {
                              this._alertService.successToast('Se reestableció contraseña correctamente');
                              this.verifyProfile();
                            })
                            .catch( error => {
                              console.error( error );
                              this.disabled = false;
                            })
      }
  }

  verifyProfile() {
    this.apiService.getProfile()
            .then( (res: any) => {
              for (let i = 0; i < res['results'].length; i++) {
                if (!res['results'][i]['completed_user']) {
                  this._router.navigate(['/complete-profile']);
                } else if (!res['results'][i]['completed_company']) {
                  this._router.navigate(['/complete-company']);
                } else {
                  this._router.navigate(['/home']);
                }
              }
            })
  }


}