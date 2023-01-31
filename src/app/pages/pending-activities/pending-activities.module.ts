import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingActivitiesPageRoutingModule } from './pending-activities-routing.module';

import { PendingActivitiesPage } from './pending-activities.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    PendingActivitiesPageRoutingModule
  ],
  declarations: [PendingActivitiesPage]
})
export class PendingActivitiesPageModule {}
