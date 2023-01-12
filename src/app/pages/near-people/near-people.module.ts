import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NearPeoplePageRoutingModule } from './near-people-routing.module';

import { NearPeoplePage } from './near-people.page';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { PipesModule } from 'src/app/pipes/pipes.module';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    LottieModule.forRoot({ player: playerFactory }),
    NearPeoplePageRoutingModule
  ],
  declarations: [NearPeoplePage]
})
export class NearPeoplePageModule {}
