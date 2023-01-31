import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeInstructionsPage } from './recipe-instructions.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeInstructionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeInstructionsPageRoutingModule {}
