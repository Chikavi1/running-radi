import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.page.html',
  styleUrls: ['./register-place.page.scss'],
})
export class RegisterPlacePage implements OnInit {

  step = 1;
  google;

  owner;
  type;
  name;

  url;

  street;
  city;
  state;


  constructor(
    private toastController:ToastController,
    private api:DataService,
    private navCtrl:NavController) { }

  ngOnInit() {
  }

  beforeStep(){
    this.step -= 1;
  }

  nextStep(){
    this.step += 1;
  }

  beforePage(){
    this.navCtrl.back();
  }

  send(){

    let data = {
      "user_id": localStorage.getItem('user_id'),
      "name": this.name,
      "owner": this.owner,
      "type": this.type,
      "url": this.url,
      "address": this.street+', '+this.city+', '+this.state
    };

    this.api.prePlaces(data).subscribe(data => {
      console.log(data);
    });

    console.log(data);

   this.navCtrl.back();
   this.presentToast('Se ha enviado, muchas gracias por tu aporte.','success');
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
