import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {
  reminder_push  = true;
  reminder_email = true;
  reminder_sms   = true;

  ad_push       = true;
  ad_email      = true;
  ad_sms        = true

  nails;
  showers;
  data;
  notifications:any = [];
  id_user;

  device;
  constructor(
              private navCtrl:NavController,
              // private localNotifications:LocalNotifications,
              private api:DataService,
              private toastController: ToastController,
              private alertCtrl: AlertController){ 
                this.id_user = localStorage.getItem('user_id');
                this.device = localStorage.getItem('device');

                this.api.getNotifications(localStorage.getItem('user_id')).subscribe(data => {
                  this.data = JSON.parse(data[0].notifications);
                  console.log(data);
                  this.reminder_push   = this.data.reminder_push;
                  this.reminder_email  = this.data.reminder_email;
                  this.reminder_sms    = this.data.reminder_sms;
                  this.ad_push         = this.data.ad_push;
                  this.ad_email        = this.data.ad_email;
                  this.ad_sms          = this.data.ad_sms;
                });
  }


  beforePage(){
    this.navCtrl.back();
  }

 async presentAlertConfirm() {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Confirmar',
    message: '¿Seguro que quieres eliminar las notificaciones?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Eliminar',
        handler: () => {
          // this.localNotifications.cancelAll().then(data => {
         
          // });
        }
      }
    ]
  });

  await alert.present();
}

  
  cancelAll(){
    this.presentAlertConfirm()
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }


ionViewWillLeave(){

  let notifications = {
    "reminder_push"   : this.reminder_push,
    "reminder_email"  : this.reminder_email,
    "reminder_sms"    : this.reminder_sms,
    "ad_push"         : this.ad_push,
    "ad_email"        : this.ad_email,
    "ad_sms"          : this.ad_sms
  }


  let datos = {
    "id"            : this.id_user,
    "notifications" : JSON.stringify(notifications)
  }

    this.api.updateUser(datos).subscribe(data => {
      console.log(data);
    });

}

}

