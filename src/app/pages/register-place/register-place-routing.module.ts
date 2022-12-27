import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPlacePage } from './register-place.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPlacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPlacePageRoutingModule {}
