import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AlertServiceService {
  isLoading = false;

    constructor(
        public alertController: AlertController,
        public loadingController: LoadingController,
        public toastController: ToastController,
        private _router: Router,
    ) { }

    async redirectAlert(message: any, url: any) {
        const alert = await this.alertController.create({
          // subHeader: header,
          message: message,
          buttons: [{
              text: 'OK',
              handler: () => {
                this._router.navigate([url]);
              }
            }]
        });

        await alert.present();
    }

    async defaultAlert(message: any) {
        const alert = await this.alertController.create({
          // header: header,
          message: message,
          buttons: ['ok']
        });

        await alert.present();
    }

    async alertServidor(header: any, message: any) {
        const alert = await this.alertController.create({
          header: header,
          message: message,
          inputs: [
            {
              name: 'password',
              label: 'Contraseña',
              type: 'password',
              placeholder: 'Ingrese Contraseña',
            }
          ],
          buttons: [
              {text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
              },
              {
              text: 'Aceptar',
              cssClass: 'success',
              handler: (item) => {
                  if (item.password === '@dministr@d0r') {
                          // this.storage.set('auth', 'true').then( () => {
                     this._router.navigate(['/servidor']);
                          // });
                  } else {
                        this.alertConfirmRedirect('Contraseña invalida', '/login');
                  }
              }
            }]
        });

        await alert.present();
      }

    async alertConfirmRedirect(message: string, url: string) {
        const alert = await this.alertController.create({
          message: message,
          buttons: [
              {text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
              },
              {
              text: 'Aceptar',
              cssClass: 'success',
              handler: () => {
                this._router.navigate([url]);
              }
            }]
        });
        await alert.present();
      }

    async successToast(message: string) {
        const toast = await this.toastController.create({
          message: message,
          color: 'success',
          position: 'top',
          cssClass: 'toast-center',
          duration: 3000
        });
        toast.present();
     }

    async tertiaryToast(message: any) {
        const toast = await this.toastController.create({
          message: message,
          color: 'tertiary',
          cssClass: 'toast-center',
          duration: 3000
        });
        toast.present();
     }

    async dangerToast(message: string) {
        const toast = await this.toastController.create({
          message: message,
          color: 'danger',
          position: 'top',
          cssClass: 'toast-center',
          duration: 3000
        });
        toast.present();
     }

    async presentLoading() {
        const loading = await this.loadingController.create({
          message: 'Espere un momento...',
        });
        await loading.present();
      }

    // async present() {
    //     this.isLoading = true;
    //     return await this.loadingController.create({
    //           message: 'Espere un momento...',
    //     }).then(a => {
    //       a.present().then(() => {
    //         console.log('presented');
    //         console.log(this.isLoading);
    //         if (!this.isLoading) {
    //             console.log('abnty');
    //           a.dismiss().then(() => console.log('abort presenting'));
    //         }
    //       });
    //     });
    // }
    //
    // async dismiss() {
    //     console.log('tranado de cerrar loading');
    //     this.isLoading = false;
    //     return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    // }

    async present() {
        // Dismiss all pending loaders before creating the new one
        await this.dismiss();

        await this.loadingController
          .create({
              message: 'Espere un momento...',
            })
          .then(res => {
            res.present();
          });
      }

      /**
       * Dismiss all the pending loaders, if any
       */
      async dismiss() {
        // while (await this.loadingController.getTop() !== undefined) {
        //   console.log('s3334s')
          await this.loadingController.dismiss();
        // }
      }


}