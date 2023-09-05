import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

import { Router } from '@angular/router';

import { ActionSheetController } from '@ionic/angular';
import {AlertServiceService} from '../../services/alert-service.service';

import { ApiService } from '../../services/api.service';

import { ChatComponent } from '../chat-bot/chat/chat.component';
declare var window: any;

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
    public modalController: ModalController,
    private androidPermissions: AndroidPermissions,
    public _alertService: AlertServiceService,
    private camera: Camera,
    public file: File,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.first_name = this.apiService.name_user;
    this.logo = this.apiService.url_logo_company;
  }

  ionViewWillEnter() {
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
                  this.apiService.startEvaluation(this.profile.id, this.dias[i].id).then( (res: any) => {
                                  this._alertService.successToast(`EVALUACIÓN DÍA ${this.dias[i].day} INICIADA`);
                                  this._router.navigate(['/evaluation', 'dia', this.dias[i].day, res.id])
                                })
                                .catch( error => {
                                  console.error( error );
                                })
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

  takePhoto() {

    const options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
                success => console.log('SI tiene permiso'),
                err => {
                    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
                }
            );

    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        .then(
          result => {
            this.procesarImagen( options );
          },
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        );

  }
  captureImage() {

    const options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
                success => console.log('SI tiene permiso'),
                err => {
                    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
                }
            );

    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        .then(
          result => {
            this.procesarImagen( options );
          },
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        );

  }

  procesarImagen( options: CameraOptions ) {
    console.log('procensando imagen')

    this.camera.getPicture(options).then( ( imageData ) => {
        let data = 'data:image/jpeg;base64,' + imageData;

        this.apiService.setProfileAvatar(this.profile.id, data).then( res => {
          this.profile = res;
        })


     }, (err) => {
        console.log(err)
      // Handle error
     });
  }

}
