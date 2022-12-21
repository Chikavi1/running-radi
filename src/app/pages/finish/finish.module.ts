import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishPageRoutingModule } from './finish-routing.module';

import { FinishPage } from './finish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishPageRoutingModule
  ],
  declarations: [FinishPage]
})
export class FinishPageModule {}
