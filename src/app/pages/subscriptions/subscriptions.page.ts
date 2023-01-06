import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {

  subscription;
  datos:any = [];
  expira;
  destination = 'shelters';
  constructor(private navCtrl:NavController,
    private api: DataService,
    private alertController:AlertController){

      this.api.getSubscriptions({'id':localStorage.getItem('customer_id')}).subscribe( data => {
      this.datos = data.data[0];
      this.expira = new Date(this.datos.current_period_end);
      if(this.datos.status == 'active'){
        this.subscription = true;
        localStorage.setItem('pe',''+new Date(this.expira*1000));
      }else{
        localStorage.setItem('pe','');
        this.subscription = false;
      }

    });
     }

  ngOnInit() {
  }

  select(type){
    this.destination = type;
  }


  goToPage(page){
    this.navCtrl.navigateForward(page);
  }

  beforePage(){
    this.navCtrl.back();
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

            this.api.cancelSubscription({id: localStorage.getItem('customer_id') }).subscribe(data =>{
              this.datos = data;
            })

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
