import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { ModalHelpPage } from '../modal-help/modal-help.page';

@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.page.html',
  styleUrls: ['./helpcenter.page.scss'],
})
export class HelpcenterPage {
  
  menu = 'general';
  questions = [];

  slide = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  device;
  language;

  constructor(private navCtrl: NavController,
    private api: DataService,
    private translateService: TranslateService,
    private modalController:ModalController) {
    this.device = localStorage.getItem('device');
    this.language = localStorage.getItem('language')?localStorage.getItem('language'):this.translateService.getBrowserLang();

  this.api.getQA(this.language).subscribe(data =>{
    this.questions = data;
  });

   }

  beforePage(){
    this.navCtrl.back();
  }


  Miscellanous(id){
    this.navCtrl.navigateForward('/topic-miscellanous');
    console.log(id);
  }

  openModal(title,response){
    let data = {
      title,
      response
    }
    this.presentModalSmall(ModalHelpPage,data);
  }

  async presentModalSmall(component,data?) {
    const modal = await this.modalController.create({
      component: component,
      backdropDismiss: true,
      componentProps:
        data

    });

    modal.onDidDismiss().then( () => {

    });

    return await modal.present();
  }
}
