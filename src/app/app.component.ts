import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public androidPermissions: AndroidPermissions,
    ) {   
    this.initializeApp();
    }

    initializeApp() {
      this.platform.ready().then(() => {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          success => {
            if (!success.hasPermission){
              this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
            }
          },
          err => {
              this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
          }
        );


        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
        .then(
          result => {
            console.log("have camera permission", result);
          },
          err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
        );
      })
    }
}
