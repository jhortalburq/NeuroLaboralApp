import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseAvatarPage } from './choose-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseAvatarPageRoutingModule {}
