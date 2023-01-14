import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAnnouncementPageRoutingModule } from './modal-announcement-routing.module';

import { ModalAnnouncementPage } from './modal-announcement.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ModalAnnouncementPageRoutingModule
  ],
  declarations: [ModalAnnouncementPage]
})
export class ModalAnnouncementPageModule {}
