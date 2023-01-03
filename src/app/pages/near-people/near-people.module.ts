import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NearPeoplePageRoutingModule } from './near-people-routing.module';

import { NearPeoplePage } from './near-people.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NearPeoplePageRoutingModule
  ],
  declarations: [NearPeoplePage]
})
export class NearPeoplePageModule {}
