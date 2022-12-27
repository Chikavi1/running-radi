import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

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


  constructor(private toastController:ToastController,private navCtrl:NavController) { }

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

    this.navCtrl.back()
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
