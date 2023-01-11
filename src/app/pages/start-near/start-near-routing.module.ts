import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartNearPage } from './start-near.page';

const routes: Routes = [
  {
    path: '',
    component: StartNearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartNearPageRoutingModule {}
