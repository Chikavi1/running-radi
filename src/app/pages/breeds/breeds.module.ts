import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreedsPageRoutingModule } from './breeds-routing.module';

import { BreedsPage } from './breeds.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BreedsPageRoutingModule
  ],
  declarations: [BreedsPage]
})
export class BreedsPageModule {}
