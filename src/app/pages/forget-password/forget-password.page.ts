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
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  forgetForm!: FormGroup;
  email!: FormControl;

  inputType: string = 'password';
  disabled: boolean = false;

  user: any;

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
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }

  createForm() {
    this.forgetForm = new FormGroup({
      email: this.email,
    });
  }

  onSubmit() {
    if (this.forgetForm.valid) {
          this.disabled = true;

            this.apiService.forgetPassword(this.forgetForm.value.email.trim())
                            .then( (res: any) => {
                                this._router.navigate(['/verify-code']);
                              })
                            .catch( error => {
                              this._alertService.dangerToast(JSON.parse(error.error)["msg"]);
                              this.disabled = false;
                            })
      }
  }

  irLogin() {
    this._router.navigate(['/login']);

  }
}
