import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

import { IonSlides } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../chat-bot/chat/chat.component';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {

  @ViewChild('mySlider') slides!: IonSlides;

  questions: any = [];  
  profile: any = {};

  logo: string = '';

  dia: any = '';
  evaluation: any = '';

  play: boolean = true;

  constructor(
      private screenOrientation: ScreenOrientation,
      private _router: Router,
      public modalController: ModalController,
      public route: ActivatedRoute,
      private apiService: ApiService,
      private textToSpeech: TextToSpeech
  ) { }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ngOnInit() {
      this.dia = this.route.snapshot.params['dia'];
      this.evaluation = this.route.snapshot.params['evaluation'];
      this.getProfile();
      this.getQuestionProfile()
      this.logo = this.apiService.url_logo_company;
  }

  getProfile() {
    this.apiService.getProfile()
                  .then((res: any) => {
                    for (let i = 0; i < res['results'].length; i++) {
                        this.profile = res['results'][i];
                    }
                  })
  }

  ionViewWillEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ionViewWillLeave() {
    this.stopAudio();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  swipePrev(){
    this.stopAudio();
    this.slides.slidePrev();
  }

  swipeNext(){
    this.stopAudio();
    this.slides.slideNext();
  }
  
  getQuestionProfile() {
    this.apiService.getQuestionProfile(this.dia)
                    .then( (res: any) => {
                      console.log(res['results'])
                      this.questions = res['results']
                    })
  }

  finalizar() {
    this.apiService.finishEvaluation(this.evaluation).then( (res: any) => {
          this._router.navigate(['/rating', 'dia', this.dia]);
        })
        .catch( error => {
          console.error( error );
        })
  }

  playAudio(text: string) {
    console.log('payy')
    this.play = true;
    this.textToSpeech
      .speak({text: text, locale: 'es-ES'})
      .then(() => {
        console.log('Playing');
      })
      .catch((reason: any) => {
        console.log(reason);
        this.play = false;
      });
  }

  stopAudio() {
    console.log('parando')
    this.play = false;
    this.textToSpeech
      .speak({text: "", locale: 'es-ES'})
      .then(() => {
        console.log('Playing');
      })
      .catch((reason: any) => {
        console.log(reason);
        this.play = false;
      });

    // this.textToSpeech
    //   .stop()
    //   .then(() => {
    //     console.log('Stop');
    //   })
    //   .catch((reason: any) => {
    //     console.log(reason);
    //     this.play = false;
    //   });
  }

  slideDidChange(ev: any) {
    this.slides.getActiveIndex().then(index => {
      if (this.questions[index-1].description) {
        this.playAudio(this.questions[index-1].description);
      }
    });   
  };

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
