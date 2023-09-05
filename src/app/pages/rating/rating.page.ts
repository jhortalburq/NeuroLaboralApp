import { Component, OnInit,  } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ApiService } from '../../services/api.service';

import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../chat-bot/chat/chat.component';

enum COLORS {
  GREY = '#E0E0E0',
  GREEN = '#76FF03',
  YELLOW = '#FFCA28',
  RED = '#DD2C00',
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {

  rating: number = 0;
  profile: any = {};

  disabled: boolean = true;
  dia: any = '';

  constructor(
      private screenOrientation: ScreenOrientation,
      private _router: Router,
      public modalController: ModalController,
      public route: ActivatedRoute,
      private apiService: ApiService,
  ) { }


  ngOnInit() {
      this.dia = this.route.snapshot.params['dia'];
      this.getProfile();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  getProfile() {
    this.apiService.getProfile()
                  .then((res: any) => {
                    for (let i = 0; i < res['results'].length; i++) {
                        this.profile = res['results'][i];
                    }
                  })
  }

  ionViewWillLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }


  rate(index: number) {
    this.rating = index;
    this.disabled = false;
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }
    switch (this.rating) {
      case 1: 
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
        return COLORS.GREEN;
      case 5:
        return COLORS.GREEN
    }
    return
  }

  isAboveRating(index: number): boolean {
      return index > this.rating;
  }

  onSubmit() {
    if (this.rating > 0) {
          this.disabled = true;
          this.apiService.ratingUser(this.rating, this.dia)
                          .then( (res: any) => {
                              this._router.navigate(['/home']);
                          })
                          .catch( error => {
                              console.error( error );
                          })
      }
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
