import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpcenterPageRoutingModule } from './helpcenter-routing.module';

import { HelpcenterPage } from './helpcenter.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HelpcenterPageRoutingModule
  ],
  declarations: [HelpcenterPage]
})
export class HelpcenterPageModule {}
