import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetGoalPage } from './set-goal.page';

const routes: Routes = [
  {
    path: '',
    component: SetGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetGoalPageRoutingModule {}
