import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {
  message: string = '';
  messages: Array<any> = [];

  currentUser = '';
  profile: any = {};

  chatId: number = 0;

  constructor(
      public modalController: ModalController,
      public toastCtrl: ToastController,
      private apiService: ApiService,
    ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.apiService.getProfile()
                  .then((res: any) => {
                    for (let i = 0; i < res['results'].length; i++) {
                        this.profile = res['results'][i];

                        console.log('sssss')
                        console.log(this.profile)

                        this.apiService.sendMessage(this.profile.id, 'Hola', this.chatId).then( res => {
                            console.log('ssss', res)
                          for (let i = 0; i < res.length; i++) {
                              this.chatId = res[i].id;

                              this.messages.push(
                                {
                                    msg : res[i].descripcion,
                                    createdAt: new Date().toISOString(),
                                    user: 0,
                                    username: 'Bot'
                                  }
                              );
                          }
                        })
                    }
                  })
  }
 
  sendMessage() {

    this.messages.push(
      {
        msg : this.message,
        createdAt: new Date().toISOString(),
        user: this.profile.id,
        username: this.profile.first_name
      }
    );

    this.apiService.sendMessage(this.profile.id, this.message, this.chatId).then( res => {

      for (let i = 0; i < res.length; i++) {
          this.chatId = res[i].id;

          this.messages.push(
              {
                msg : res[i].descripcion,
                createdAt: new Date().toISOString(),
                user: 0,
                username: 'Bot'
              }
          );
      }

    });

    this.message = '';

  }
  ionViewWillLeave() {
    // this.socket.disconnect();
  }
 
  async showToast(msg: any) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
