import { Component, OnInit, ViewChild } from '@angular/core';
import {CodeInputComponent} from 'angular-code-input';

import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import {AlertServiceService} from '../../services/alert-service.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
})
export class VerifyCodePage implements OnInit {
  @ViewChild('codeInput') codeInput !: CodeInputComponent;

  disabled: boolean = true;
  email!: string;
  no_documento!: string;
  codigo: string = '';
  token!: string;

  constructor(
        private _router: Router,
        private apiService: ApiService,
        public _alertService: AlertServiceService,
        private menuCtrl: MenuController,
        ) { }

  ngOnInit() {
    this.iniciarData();
  }

  async iniciarData(){
    console.log('iniciando')
  }

  
  onCodeCompleted(code: string) {
      this.disabled = false;
      this.codigo = code;
  }

  onCodeChanged(code: string) {
      if (code.length === 4) {
          this.disabled = false;
      } else {
        this.disabled = true;
      }
  }

  async ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }


  async solicitarCodigo() {
    await this.solicitarNotificacionCodigoAPI();
  }

  solicitarNotificacionCodigoAPI() {
    return this.apiService.sendCodeVerification()
                  .then((res: any) => {
                      this.codeInput.reset();
                      this._alertService.successToast('Se volvío a enviar a su email el código');

                  }).catch( error => {
                      this._alertService.dangerToast('No se pudo generar el código');
                  })
  }

  onSubmit() {
        this.disabled = true;

        this._router.navigate(['/verify-code']);

          this.apiService.verifyCode(this.codigo)
                          .then( (res: any) => {
                              this._router.navigate(['/new-password']);
                            })
                          .catch( error => {
                            this.disabled = false;
                            this.codeInput.reset();
                            this._alertService.dangerToast(JSON.parse(error.error)["msg"]);
                          })
  }
}
