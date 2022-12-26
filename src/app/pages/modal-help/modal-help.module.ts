import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalHelpPageRoutingModule } from './modal-help-routing.module';

import { ModalHelpPage } from './modal-help.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ModalHelpPageRoutingModule
  ],
  declarations: [ModalHelpPage]
})
export class ModalHelpPageModule {}
