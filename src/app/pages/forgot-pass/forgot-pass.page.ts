import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage {
  email = '';

  toastsendemail;
  toastsendemailerror;
  translate(){
    this.translateService.get('toast.sendemail').subscribe(value => {
      this.toastsendemail = value;
    })
    this.translateService.get('toast.sendemailerror').subscribe(value => {
      this.toastsendemailerror = value;
    })
  }
  device;
  constructor(private navCtrl: NavController,
              private api:DataService,
              private translateService:TranslateService,
              private toastController: ToastController){
                this.device = localStorage.getItem('device');

                this.translate();
    }

  beforePage(){
    this.navCtrl.back();
  }

  enviar()
  {
    this.api.forgotPassword(this.email).subscribe( data => {
      if(data.status === 200){
        this.presentToast(this.toastsendemail,'success');
        let navigationExtras: NavigationExtras = {
          state: {
            type:'forgot',
          }
        }
        this.navCtrl.navigateForward('/code-verification',navigationExtras);
      }else{
        this,this.presentToast(this.toastsendemailerror,'warning')
      }
    })
  }


  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

}

