import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalReportPageRoutingModule } from './modal-report-routing.module';

import { ModalReportPage } from './modal-report.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ModalReportPageRoutingModule
  ],
  declarations: [ModalReportPage]
})
export class ModalReportPageModule {}
