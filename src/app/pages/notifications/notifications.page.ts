import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

import { LocalNotifications } from '@capacitor/local-notifications';
// import { ELocalNotificationTriggerUnit, LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

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


  // createReminder(){
  //   let year = new Date().getFullYear();
  //   let month = new Date().getMonth();
  //   let day = new Date().getDate();

  //   let time1 = new Date(year, month, day, 18, 0, 0);
  //   let time2 = new Date(year, month, day, 11,  0, 0);

  //   this.localNotifications.schedule([
  //     {
  //       id: 10,
  //       title: 'Recordatorio para salir a pasear',
  //       text: 'Buena hora para salir',
  //       trigger: {
  //         firstAt: new Date(time1),
  //         every: ELocalNotificationTriggerUnit.DAY,
  //       },
  //       foreground: true,
  //       data: {"id": 1, "name": "Mr. A"}
  //     },
  //     {
  //       id: 11,
  //       title: 'Recordatorio paseo matutino',
  //       text: 'Buena hora para salir',
  //       trigger: {
  //         firstAt: new Date(time2),
  //         every: ELocalNotificationTriggerUnit.DAY,
  //       },
  //       data: {"id": 2, "name": "Mr. B"},
  //       foreground: true
  //     }
  //   ]);

  //   this.presentToast('Reminder create','success');

  // }

  async ngOnInit(){
    await LocalNotifications.requestPermissions();
  }

  async alert(){

    await LocalNotifications.schedule({
      notifications: [
        {
          id:1,
          title: 'title',
          body: 'cac',
          extra: {
            data: 'pass'
          },
          iconColor: "#17202F"

        }
      ]
    });


    this.presentToast('alerta x activada','success');
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

  update(){
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
        this.beforePage();
      });

  }


}

