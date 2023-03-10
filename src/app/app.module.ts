import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
// import { Network } from '@awesome-cordova-plugins/network/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

// import localePt from '@angular/common/locales/pt';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';

import { registerLocaleData } from '@angular/common';
// registerLocaleData(localePt, 'pt');
registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent],
  imports: [LottieModule.forRoot({ player: playerFactory }),FormsModule,ReactiveFormsModule,BrowserModule, TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }
  }),
    HttpClientModule,
    IonicModule.forRoot(),

    AppRoutingModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    Clipboard,SocialSharing,NativeGeocoder,BarcodeScanner,LocalNotifications,OneSignal,AppVersion,ScreenOrientation,CallNumber,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
