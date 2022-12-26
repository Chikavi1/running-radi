import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeVerificationPage } from './code-verification.page';

const routes: Routes = [
  {
    path: '',
    component: CodeVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeVerificationPageRoutingModule {}
