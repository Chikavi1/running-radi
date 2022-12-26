import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage  {
  langs: string [] = [];
  language;
  idiom;
  selectLanguage;
  device;
  constructor(
    private translateService: TranslateService,
    private navCtrl: NavController) {
    this.langs = this.translateService.getLangs();
    this.device = localStorage.getItem('device');

    this.language = localStorage.getItem('languagedevice');
    this.selectLanguage = localStorage.getItem('language');
    this.idiom = this.translateService.getBrowserLang();
    console.log(this.idiom);
   }

   beforePage(){
    this.navCtrl.back();
  }

   changeLang(language){
    this.selectLanguage = localStorage.setItem('language',language);
    this.translateService.use(language);
    this.beforePage();
  }

  changeToggle(){
    if(this.language){
      
      localStorage.setItem('languagedevice','true');
      this.selectLanguage = localStorage.setItem('language',this.translateService.getBrowserLang());
      this.translateService.use(this.translateService.getBrowserLang());
    }else{
      if(localStorage.getItem('languagedevice')){
        localStorage.removeItem('languagedevice');
      }
    }
  }
}
