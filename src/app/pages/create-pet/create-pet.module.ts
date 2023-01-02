import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePetPageRoutingModule } from './create-pet-routing.module';

import { CreatePetPage } from './create-pet.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 20,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      showInnerStroke:false,
      showSubtitle: false
    }),
    CreatePetPageRoutingModule
  ],
  declarations: [CreatePetPage]
})
export class CreatePetPageModule {}
