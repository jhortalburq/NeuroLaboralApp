import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluationPage } from './evaluation.page';

const routes: Routes = [
  {
    path: 'dia/:dia',
    component: EvaluationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationPageRoutingModule {}