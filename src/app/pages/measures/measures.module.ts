import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeasuresPageRoutingModule } from './measures-routing.module';

import { MeasuresPage } from './measures.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MeasuresPageRoutingModule
  ],
  declarations: [MeasuresPage]
})
export class MeasuresPageModule {}
