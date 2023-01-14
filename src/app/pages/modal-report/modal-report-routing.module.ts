import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalReportPage } from './modal-report.page';

const routes: Routes = [
  {
    path: '',
    component: ModalReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalReportPageRoutingModule {}
