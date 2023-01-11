import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NearPeoplePageRoutingModule } from './near-people-routing.module';

import { NearPeoplePage } from './near-people.page';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule.forRoot({ player: playerFactory }),
    NearPeoplePageRoutingModule
  ],
  declarations: [NearPeoplePage]
})
export class NearPeoplePageModule {}
