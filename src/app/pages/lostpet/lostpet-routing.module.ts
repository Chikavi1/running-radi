import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpetPage } from './lostpet.page';

const routes: Routes = [
  {
    path: '',
    component: LostpetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpetPageRoutingModule {}
