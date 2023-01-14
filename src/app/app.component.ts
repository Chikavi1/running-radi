import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ModalController } from '@ionic/angular';
import { ModalAnnouncementPage } from './pages/modal-announcement/modal-announcement.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private screenOrientation:ScreenOrientation,
    private modalController:ModalController,
    private translateService: TranslateService,
    private router:Router) {
      window.screen.orientation.lock('portrait');
      localStorage.setItem('device','phone');

      if(!localStorage.getItem('intro')){
        this.router.navigateByUrl('/intro');
      }else{
        this.router.navigateByUrl('/');
      }

      if(localStorage.getItem('languagedevice')){
        this.automaticTranslate();
      }
      let language = localStorage.getItem('language')?localStorage.getItem('language'):'en';
      this.translateService.setDefaultLang(language);
      this.translateService.currentLang = language;
      this.translateService.addLangs(['en','es']);

    localStorage.setItem('sandbox','true')
// cambiar

    // setTimeout(()=>{
    //   this.presentModal(ModalAnnouncementPage);
    // },1000)
  }

  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      breakpoints: [0.7,1.0],
      initialBreakpoint:0.70,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });
    return await modal.present();
  }

  automaticTranslate(){
    if(this.translateService.getBrowserLang() === 'en'){
      localStorage.setItem('language',this.translateService.getBrowserLang());
      this.translateService.use(this.translateService.getBrowserLang());
    }
    if(this.translateService.getBrowserLang() === 'es'){
      localStorage.setItem('language',this.translateService.getBrowserLang());
      this.translateService.use(this.translateService.getBrowserLang());
    }
  }
}
