import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  datos:any = [];

  expira;
  constructor(private api: DataService,private alertController:AlertController) {

    this.api.getSubscriptions({'subscribe':1}).subscribe( data => {
      console.log(data);
      this.datos = data.data[0];
      this.expira = new Date(this.datos.current_period_end);
      console.log(this.datos);
    });

   }

   async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿estas seguro de que quieres eliminar la subscripción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Si,Terminar',
          role: 'confirm',
          handler: () => {

            this.api.cancelSubscription({id:this.datos.id}).subscribe(data =>{
              this.datos = data;
            })

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  ngOnInit() {
  }

}
