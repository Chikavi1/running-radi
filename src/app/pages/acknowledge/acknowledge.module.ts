import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcknowledgePageRoutingModule } from './acknowledge-routing.module';

import { AcknowledgePage } from './acknowledge.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AcknowledgePageRoutingModule
  ],
  declarations: [AcknowledgePage]
})
export class AcknowledgePageModule {}
