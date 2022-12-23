import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunShowPage } from './run-show.page';

const routes: Routes = [
  {
    path: '',
    component: RunShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunShowPageRoutingModule {}
