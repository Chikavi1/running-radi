import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetGoalPageRoutingModule } from './set-goal-routing.module';

import { SetGoalPage } from './set-goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetGoalPageRoutingModule
  ],
  declarations: [SetGoalPage]
})
export class SetGoalPageModule {}
