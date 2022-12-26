import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.page.html',
  styleUrls: ['./gifts.page.scss'],
})
export class GiftsPage {
  sendData = true;
  card:any = [];
  amount = 0;
  description = null;
  slide = {
    slidesPerView: 2.1,
    spaceBetween: 1
  }
  data;


  email;
  message;
  name; //cambiarlo
  buyGift  = false;
  validate = false;
  id_user;
  device;

  sendgift;
  errortoast;

  translate(){
    this.translateService.get('thanks.sendgift').subscribe(value => {
      this.sendgift = value;
    })
    this.translateService.get('thanks.errortoast').subscribe(value => {
      this.errortoast = value;
    })
  }

  constructor(private toastController:ToastController,
    private translateService:TranslateService,private api:DataService,private navCtrl:NavController,private router:Router,private modal:ModalController){
   this.device = localStorage.getItem('device');
   this.translate();
    if(this.router.getCurrentNavigation().extras){
      if(this.router.getCurrentNavigation().extras.queryParams){
        // this.id_user = this.router.getCurrentNavigation().extras.queryParams.id_user_found;
      }
    }
    this.data = this.router.getCurrentNavigation().extras;
    if(this.data.buyGift){
      this.buyGift = true;
    }
    if(this.data.name){
      this.name = this.data.name
    }
   }

   ionViewWillEnter(){
    this.api.getCards(localStorage.getItem('customer_id')).subscribe(data => {
      this.card = data.data[0];
    });
   }

  selectAmount(amount){
    this.amount = amount;
  }

  give(){
    this.sendData = false;
    let data = {
      user_id     : this.id_user,
      origin_id   : localStorage.getItem('user_id'),
      description : this.description,
      value       : this.amount,
      customer    : localStorage.getItem('customer_id')
    }

    this.api.givePoints(data).subscribe((data:any) => {
      if(data.status === 200){
        this.navCtrl.back();
        this.presentToast(this.sendgift,'succces')
      }
    },err=>{
      this.presentToast(this.errortoast,'danger');
      this.sendData = true;
    });
  }

  back(){
    this.navCtrl.back();
  }

  goPayments(){
    const extras: NavigationExtras = {
      queryParams:{
        isSelected: true
      }
    }
    this.navCtrl.navigateForward('/payments',extras);
  }

  validateEmail(email){
    if(this.emailValidator(email) != null){
      this.validate = true;
    }else{
      this.validate = false;
    }
  }

  emailValidator(email) {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  gift(){

    this.sendData = false;
    let data = {
      email       : this.email,
      name        : this.name,
      message     : this.message,
      customer    : localStorage.getItem('customer_id'),
      value       : this.amount,
    }

    this.api.createGift(data).subscribe((data:any) => {
      if(data.status === 200){
        this.presentToast(this.sendgift,'success');
        this.back();
      }
    },err=>{
      this.presentToast(this.errortoast,'danger');
      this.sendData = true;
    })
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color
    });
    toast.present();
  }
}
