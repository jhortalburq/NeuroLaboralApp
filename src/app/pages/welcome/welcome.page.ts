import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../chat-bot/chat/chat.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  first_name!: string;
  logo!: string;
  avatar!: string;

  profile: any = {};

  dias: Array<any> = [];

  frase: string | undefined = "Frase de bienvenida";

  constructor(
    private _router: Router,
    public modalController: ModalController,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.first_name = this.apiService.name_user;

    this.getProfile();
  }

  getProfile() {
    this.apiService.getProfile()
                  .then((res: any) => {
                    for (let i = 0; i < res['results'].length; i++) {

                        this.profile = res['results'][i];

                    }
                  })
  }

  irHome() {
    this._router.navigate(['/home']);
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
