import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingActivitiesPageRoutingModule } from './pending-activities-routing.module';

import { PendingActivitiesPage } from './pending-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingActivitiesPageRoutingModule
  ],
  declarations: [PendingActivitiesPage]
})
export class PendingActivitiesPageModule {}
