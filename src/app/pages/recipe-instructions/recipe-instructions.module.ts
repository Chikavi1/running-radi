import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeInstructionsPageRoutingModule } from './recipe-instructions-routing.module';

import { RecipeInstructionsPage } from './recipe-instructions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeInstructionsPageRoutingModule
  ],
  declarations: [RecipeInstructionsPage]
})
export class RecipeInstructionsPageModule {}
