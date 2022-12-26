import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Browser } from '@capacitor/browser';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';
import { DataService } from '../services/data.service';

declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  mascotas:any = [];
  mostrar = false;
  user_id;
  datos:any = [];
  device;
  slide;
  isMobile;
  constructor(
    public navCtrl:NavController,
    private api: DataService,
    private modalCtrl:ModalController,
    private platform:Platform,
    private oneSignal:OneSignal
    ){
      this.isMobile = this.platform.is('mobile');
      this.device = localStorage.getItem('device');
      this.slide = {
        slidesPerView:  (this.device === 'tablet')?2.3:1.2,
        spaceBetween:5,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }
      }

   }

   ionViewDidEnter(){
    setTimeout(() => {
      this.mostrar = true;
     }, 1100);
     this.user_id = localStorage.getItem('user_id');

     if(this.user_id){
      this.apiget();

     }
   }

   apiget(){

    this.api.getUser(this.user_id).subscribe( data => {
      this.datos = data[0];
      if(!localStorage.getItem('email')){
        localStorage.setItem('email',data[0].email)
      }
    });

   
   }

   login(){
    this.presentModal(LoginPage);
   }

   async presentModal(component) {
    const modal = await this.modalCtrl.create({
      component: component,
      breakpoints: [0.0, 0.90],
      initialBreakpoint: 0.90,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {
     if(data['data']){
        this.user_id = localStorage.getItem('user_id');
        this.apiget();
        this.mostrar = false;
      setTimeout(() => {
        this.mostrar = true;
      }, 1100);
     }

    });
    return await modal.present();
  }

   async openBlank(url){
    await Browser.open({ url });
   }

   goToPets(id){
    this.navCtrl.navigateForward('pet/'+hashids.encode(id));
   }

    goToPage(pagina,data?){
      let navigationExtras: NavigationExtras = data;
      this.navCtrl.navigateForward(pagina,navigationExtras);
    }

  logout(){
    localStorage.removeItem('user_id');
    localStorage.removeItem('address_default_id');
    localStorage.removeItem('method_payment');
    localStorage.removeItem('customer_id');
    localStorage.removeItem('pet_default_id');
    localStorage.removeItem('email');

    // only dev
    // localStorage.removeItem('intro')
    this.exit();
  }

  exit(){
    this.mostrar = false;
    setTimeout(() => {
      this.mostrar = true;
     }, 1100);
    this.user_id = null;
    this.oneSignal.removeExternalUserId();

  }



}
