import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpetPageRoutingModule } from './lostpet-routing.module';

import { LostpetPage } from './lostpet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpetPageRoutingModule
  ],
  declarations: [LostpetPage]
})
export class LostpetPageModule {}
