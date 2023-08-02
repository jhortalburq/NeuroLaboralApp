import { Component, OnInit,  } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';


import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  remember!: FormControl;

  disabled: boolean = false;
  
  inputType: string = 'password';

  user: any;

  email: string = '';

  constructor(
        private _router: Router,
        // private _alertService: AlertService,
        private apiService: ApiService,
        private menuCtrl: MenuController,
        // private authenticateService: AuthenticationService
  ) { }

  ngOnInit() {
    //this.menuCtrl.swipeEnable(false);
    
    this.createFormControls();
    this.createForm();
  }

  async ionViewWillEnter() {
    this.menuCtrl.enable(false);

    // this.email = await this.storage.getItem('remember');
    console.log('remember', this.email);

    this.loginForm.patchValue({
      username: this.email,
      password: ''
    })

    // this.storage.getItem('slug').then(res => {
    //   this.user = res;

    //   if (res) {
    //     this._router.navigate(['/inicio']);
    //   } 
    // });
  
  }

  verPassword() {

      this.inputType = 'text'

      setTimeout(()=>{               
          this.inputType = 'password';
      }, 1000);
  }

  ionViewDidLeave () {
    // this._alertService.dismiss();
  }

  createFormControls() {
    console.log('sii', this.email)
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.remember = new FormControl(false);
  }

  createForm() {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
      remember: this.remember
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
            this.disabled = true;
            this.apiService.loginUser(this.loginForm.value.username.trim(), this.loginForm.value.password.trim())
                            .then( (res: any) => {
                                this.verifyProfile();
                            })
                            .catch( error => {
                                console.error( error );
                                this.disabled = false;
                                if (error.status === 401) {
                                    let parseJSON = JSON.parse(error.error)
                
                                    swal({
                                      icon: "error",
                                      text: 'El Usuario o Contraseña ingresados son incorrectos',
                                      title: "Login Incorrecto"
                                    });
                                }
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

  forgetPassword() {
    this._router.navigate(['/forget-password']);
  }
}
