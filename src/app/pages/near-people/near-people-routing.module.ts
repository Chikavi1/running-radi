import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NearPeoplePage } from './near-people.page';

const routes: Routes = [
  {
    path: '',
    component: NearPeoplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NearPeoplePageRoutingModule {}
