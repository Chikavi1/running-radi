import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
step=1;
  constructor(private navCtrl:NavController,private translateService:TranslateService) { }

  ngOnInit() {
    console.log(this.translateService.getBrowserLang());
    this.translateService.use(this.translateService.getBrowserLang());

  }

  goToPage(page){
    this.navCtrl.navigateForward(page)
  }

  finish(){
    if(!localStorage.getItem('language')){
      localStorage.setItem('language',this.translateService.getBrowserLang());
    }

    if(!localStorage.getItem('measure')){
      localStorage.setItem('measure','km');
    }

    if(!localStorage.getItem('mass')){
      localStorage.setItem('mass','kg');
    }

    localStorage.setItem('intro','true');
    this.navCtrl.navigateForward('/');
  }

  nextStep(){
    this.step += 1;
  }

  skip(){
    this.step = 4;
  }
}
