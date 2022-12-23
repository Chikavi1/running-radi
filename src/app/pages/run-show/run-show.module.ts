import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunShowPageRoutingModule } from './run-show-routing.module';

import { RunShowPage } from './run-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunShowPageRoutingModule
  ],
  declarations: [RunShowPage]
})
export class RunShowPageModule {}
