import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeVerificationPageRoutingModule } from './code-verification-routing.module';

import { CodeVerificationPage } from './code-verification.page';
import { TranslateModule } from '@ngx-translate/core';
import { CodeInputModule } from 'angular-code-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: false,
      // code: '123456'
    }),
    CodeVerificationPageRoutingModule
  ],
  declarations: [CodeVerificationPage]
})
export class CodeVerificationPageModule {}
