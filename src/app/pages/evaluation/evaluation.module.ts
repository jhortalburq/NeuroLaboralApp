import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluationPageRoutingModule } from './evaluation-routing.module';

import { EvaluationPage } from './evaluation.page';
import { ChatBotModule } from '../chat-bot/chat-bot.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatBotModule,
    EvaluationPageRoutingModule
  ],
  declarations: [EvaluationPage]
})
export class EvaluationPageModule {}
