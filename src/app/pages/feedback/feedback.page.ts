import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage  {
  type    = '';
  comment = '';
  successSend;
  errorSend;

  translate(){
    this.translateService.get('feedback.successsend').subscribe(value => {
      this.successSend = value;
    })
    this.translateService.get('feedback.errorsend').subscribe(value => {
      this.errorSend = value;
    })
  }
  device;

  constructor(private data: DataService,
              private toastController:ToastController,
              private translateService:TranslateService,
              private navCtrl:NavController){
                this.device = localStorage.getItem('device');

                this.translate();
               }

  beforePage(){
    this.navCtrl.back();
  }


  enviar(){
    let data = {
      id_user: localStorage.getItem('user_id'),
      text: this.comment,
      category: this.type
    }

    this.data.feedback(data).subscribe( data => {
      console.log(data);
      if(data.status === 200){
        this.presentToast(this.successSend,'success');
        this.navCtrl.back();
      }
    },err => {
      this.presentToast(this.errorSend,'danger');
    });
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

}

