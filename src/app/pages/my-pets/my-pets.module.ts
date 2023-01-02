import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPetsPageRoutingModule } from './my-pets-routing.module';

import { MyPetsPage } from './my-pets.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MyPetsPageRoutingModule
  ],
  declarations: [MyPetsPage]
})
export class MyPetsPageModule {}
