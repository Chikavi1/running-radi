import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { ModalAnnouncementPage } from '../modal-announcement/modal-announcement.page';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.page.html',
  styleUrls: ['./code-verification.page.scss'],
})
export class CodeVerificationPage {

  codecorrect;
  codeincorrect;
  type;
  translate(){
    this.translateService.get('codeverification.correct').subscribe(value => {
      this.codecorrect = value;
    })
    this.translateService.get('codeverification.incorrect').subscribe(value => {
      this.codeincorrect = value;
    })
  }
  device;
  constructor(private navCtrl:NavController,
    private api:DataService,
    private router:Router,
    private translateService:TranslateService,
    private modalController:ModalController,
    private toastController:ToastController){
      this.translate();
      this.device = localStorage.getItem('device');

     let extras = this.router.getCurrentNavigation().extras;
      if(extras){
        if(extras.state){
          this.type = extras.state.type;
        }
      }
    }

  onCodeChanged(code: string) {

  }

onCodeCompleted(code: string){
  console.log(this.type);

  if(this.type === 'forgot'){
    this.api.validateToken(code).subscribe( data => {
      if(data.estatus){
        localStorage.setItem('password_change_token',code);
        this.presentToast(this.codecorrect,'success');
        this.goToPage('/change-password',{login:0});
      }else{
        this.presentToast(this.codeincorrect,'danger');
      }
    });
  }else{
    console.log(code);
    this.api.validateEmail(code).subscribe(data =>{
      console.log(data);
      if(data.estatus){
        this.presentToast(this.codecorrect,'success');
        this.router.navigateByUrl('/');
        // modal
        this.presentModal(ModalAnnouncementPage);
      }
    });
  }
}

goToPage(pagina,data){
  let navigationExtras: NavigationExtras = data;
  this.navCtrl.navigateForward(pagina,navigationExtras);
}

async presentToast(message,color) {
  const toast = await this.toastController.create({
  message,
  color,
  duration: 2000
  });
  toast.present();
  }


  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      breakpoints: [0.0, 0.77],
      initialBreakpoint: 0.77,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then(() => {


    });
    return await modal.present();
  }

  beforePage(){
    this.navCtrl.back();
  }
}
