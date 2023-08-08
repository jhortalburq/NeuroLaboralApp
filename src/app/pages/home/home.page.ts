import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { ActionSheetController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  result: string | undefined;

  first_name!: string;
  logo!: string;
  avatar!: string;

  profile: any = {};

  dias: Array<any> = [];

  constructor(
    private _router: Router,
    private actionSheetCtrl: ActionSheetController,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.first_name = this.apiService.name_user;
    this.logo = this.apiService.url_logo_company;

    this.getProfile();
    this.getDaysEvaluation();

  }

  getProfile() {
    this.apiService.getProfile()
                  .then((res: any) => {
                    for (let i = 0; i < res['results'].length; i++) {
                        this.profile = res['results'][i];
                    }
                  })
  }

  getDaysEvaluation() {
    this.apiService.getQuestionDaysProfile()
                    .then( (res: any) => this.dias = res['results'])
  }

  async presentActionSheet() {

    let actions = []

    for (let i = 0; i < this.dias.length; i++) {
      actions.push(
              {
                text: `DIA ${this.dias[i].day} `,
                handler: () => {
                  this._router.navigate(['/evaluation', 'dia', this.dias[i].day])
                }
              },
      );
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccione Día',
      cssClass: 'my-custom-class',
      buttons: actions
    });

    await actionSheet.present();

  }
}
