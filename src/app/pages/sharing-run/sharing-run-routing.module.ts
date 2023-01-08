import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharingRunPage } from './sharing-run.page';

const routes: Routes = [
  {
    path: '',
    component: SharingRunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharingRunPageRoutingModule {}
