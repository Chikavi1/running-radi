import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunShowPageRoutingModule } from './run-show-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RunShowPage } from './run-show.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RunShowPageRoutingModule,
    PipesModule,
  ],
  declarations: [RunShowPage]
})
export class RunShowPageModule {}
