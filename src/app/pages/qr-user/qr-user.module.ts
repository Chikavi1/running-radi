import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrUserPageRoutingModule } from './qr-user-routing.module';

import { QrUserPage } from './qr-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrUserPageRoutingModule
  ],
  declarations: [QrUserPage]
})
export class QrUserPageModule {}
