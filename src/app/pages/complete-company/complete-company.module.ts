import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteCompanyPageRoutingModule } from './complete-company-routing.module';

import { CompleteCompanyPage } from './complete-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CompleteCompanyPageRoutingModule
  ],
  declarations: [CompleteCompanyPage]
})
export class CompleteCompanyPageModule {}
