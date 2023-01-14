import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Browser } from '@capacitor/browser';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';
import { ModalWarningPage } from '../pages/modal-warning/modal-warning.page';
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
  premium;
  constructor(
    public navCtrl:NavController,
    private api: DataService,
    private modalCtrl:ModalController,
    private platform:Platform,
    private oneSignal:OneSignal,
    private router:Router
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

   photo;
   name;


   ionViewDidEnter(){

    if(localStorage.getItem('customer_id')){

      if(!localStorage.getItem('pe')){

        this.api.getSubscriptions({'id':localStorage.getItem('customer_id')}).subscribe( data => {
          console.log(data);
          if(data.data.length != 0){
              if(data.data[0].status == 'active'){ // se guarda la fecha del premium
                this.premium = true;
                localStorage.setItem('pe',''+new Date(data.current_period_end*1000));
              }else{
                localStorage.setItem('pe','a');
                this.premium = false;
              }
            }else{
              localStorage.setItem('pe','a');
              this.premium = false;
            }
        });

        }else{
          if(new Date(localStorage.getItem('pe')) > new Date()){
            this.premium = true;
          }else{
            this.premium = false;
          }
      }

      }

    this.photo = localStorage.getItem('photo');
    this.name = localStorage.getItem('name')


    setTimeout(() => {
      this.mostrar = true;
     }, 1100);
     this.user_id = localStorage.getItem('user_id');

    //  if(this.user_id){
    //   this.apiget();

    //  }
   }

  //  apiget(){

  //   this.api.getUser(this.user_id).subscribe( data => {
  //     this.datos = data[0];
  //     if(!localStorage.getItem('email')){
  //       localStorage.setItem('email',data[0].email)
  //     }
  //   });


  //  }

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
      // this.router.navigateByUrl('/tabs/tab1')

        this.user_id = localStorage.getItem('user_id');
        this.photo = localStorage.getItem('photo');
        this.name = localStorage.getItem('name');

        localStorage.setItem('newActivity','true');
        // this.apiget();
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


    modalWarning(title,subtitle){
      this.presentWarning(ModalWarningPage,title,subtitle);
    }


    async presentWarning(component,title,subtitle) {
      const modal = await this.modalCtrl.create({
        component: component,
        breakpoints: [0.0,0.5, 0.90],
        componentProps:{
          title: title,
          subtitle: subtitle,
          cancel_text: 'Cancelar',
          done_text: 'Cerrar Sesión',
          path:'warning'
        },
        initialBreakpoint: 0.5,
        backdropDismiss:true,
        swipeToClose​:true,
        cssClass: 'small-modal'
      });

      modal.onDidDismiss().then((data) => {
        if(data['data']){
          let sandbox = localStorage.getItem('sanbox')?true:false;
          let device  = 'phone'

          localStorage.clear();
          localStorage.setItem('device',device);
          localStorage.setItem('sandbox',''+sandbox);
          this.exit();

        }
      });
      return await modal.present();
    }

  logout(){

    if(localStorage.getItem('date_start')){
      this.modalWarning('Atención','Tienes una actividad inconclusa.');
      return;
    }

    if(localStorage.getItem('activities')){
      this.modalWarning('Atención','Tienes actividades sin subir, al salir se eliminaran.');
      return;
    }

    let sandbox = localStorage.getItem('sanbox')?true:false;
    let device  = 'phone'
    let measure = localStorage.getItem('measure');
    let mass = localStorage.getItem('mass');

    localStorage.clear();
    localStorage.setItem('device',device);
    localStorage.setItem('sandbox',''+sandbox);
    localStorage.setItem('measure',''+measure);
    localStorage.setItem('mass',''+mass);
    localStorage.setItem('intro',''+true);


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
