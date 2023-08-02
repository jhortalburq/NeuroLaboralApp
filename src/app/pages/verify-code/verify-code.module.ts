import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyCodePageRoutingModule } from './verify-code-routing.module';

import { CodeInputModule } from 'angular-code-input';

import { VerifyCodePage } from './verify-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeInputModule,
    VerifyCodePageRoutingModule
  ],
  declarations: [VerifyCodePage]
})
export class VerifyCodePageModule {}
