import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteProfilePageRoutingModule } from './complete-profile-routing.module';

import { CompleteProfilePage } from './complete-profile.page';
import { ChatBotModule } from '../chat-bot/chat-bot.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChatBotModule,
    CompleteProfilePageRoutingModule
  ],
  declarations: [CompleteProfilePage]
})
export class CompleteProfilePageModule {}
