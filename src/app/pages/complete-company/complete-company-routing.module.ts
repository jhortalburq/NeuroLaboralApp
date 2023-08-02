import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteCompanyPage } from './complete-company.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteCompanyPageRoutingModule {}
