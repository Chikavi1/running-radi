import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoRoundedModalPageRoutingModule } from './photo-rounded-modal-routing.module';

import { PhotoRoundedModalPage } from './photo-rounded-modal.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    PhotoRoundedModalPageRoutingModule
  ],
  declarations: [PhotoRoundedModalPage]
})
export class PhotoRoundedModalPageModule {}
