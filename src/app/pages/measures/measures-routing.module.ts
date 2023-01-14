import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeasuresPage } from './measures.page';

const routes: Routes = [
  {
    path: '',
    component: MeasuresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeasuresPageRoutingModule {}
