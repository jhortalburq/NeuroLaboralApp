import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseAvatarPageRoutingModule } from './choose-avatar-routing.module';

import { ChooseAvatarPage } from './choose-avatar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseAvatarPageRoutingModule
  ],
  declarations: [ChooseAvatarPage]
})
export class ChooseAvatarPageModule {}
