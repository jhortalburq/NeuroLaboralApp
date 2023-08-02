import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { IonSlides } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {

  @ViewChild('mySlider') slides!: IonSlides;

  questions: any = [];  
  logo: string = '';

  dia: any = '';

  constructor(
      private screenOrientation: ScreenOrientation,
      private _router: Router,
      public route: ActivatedRoute,
      private apiService: ApiService,
  ) { }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
      this.dia = this.route.snapshot.params['dia'];
      this.getQuestionProfile()
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.logo = this.apiService.url_logo_company;
  }

  ionViewWillLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  swipePrev(){
    this.slides.slidePrev();
  }

  swipeNext(){
    this.slides.slideNext();
  }
  
  getQuestionProfile() {
    this.apiService.getQuestionProfile(this.dia)
                    .then( (res: any) => this.questions = res['results'])
  }

  finalizar() {
    this._router.navigate(['/rating', 'dia', this.dia]);
  }
}
