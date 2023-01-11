import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartNearPageRoutingModule } from './start-near-routing.module';

import { StartNearPage } from './start-near.page';
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
    StartNearPageRoutingModule
  ],
  declarations: [StartNearPage]
})
export class StartNearPageModule {}
