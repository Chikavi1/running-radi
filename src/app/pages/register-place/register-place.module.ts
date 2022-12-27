import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPlacePageRoutingModule } from './register-place-routing.module';

import { RegisterPlacePage } from './register-place.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPlacePageRoutingModule
  ],
  declarations: [RegisterPlacePage]
})
export class RegisterPlacePageModule {}
