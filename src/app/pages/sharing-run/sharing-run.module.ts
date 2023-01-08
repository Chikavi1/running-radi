import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharingRunPageRoutingModule } from './sharing-run-routing.module';

import { SharingRunPage } from './sharing-run.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharingRunPageRoutingModule
  ],
  declarations: [SharingRunPage]
})
export class SharingRunPageModule {}
