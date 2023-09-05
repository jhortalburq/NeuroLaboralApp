import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteCompanyPageRoutingModule } from './complete-company-routing.module';

import { CompleteCompanyPage } from './complete-company.page';
import { ChatBotModule } from '../chat-bot/chat-bot.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChatBotModule,
    CompleteCompanyPageRoutingModule
  ],
  declarations: [CompleteCompanyPage]
})
export class CompleteCompanyPageModule {}
