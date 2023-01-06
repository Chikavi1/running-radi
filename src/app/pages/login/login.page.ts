import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import jwt_decode from "jwt-decode";
import { RegisterPage } from '../register/register.page';


declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email = '';
  password = '';
  validaciones = false;
  lottieConfig = {};
  showPassword = false;

  device;
  verifypassword;
  unauthorized;
  constructor(private toastController: ToastController,
              private navCtrl: NavController,
              private dataService: DataService,
              private modalCtrl: ModalController,
              private onesignal:OneSignal,
              private translateService: TranslateService,
              private modalController: ModalController,
              ){

              this.device = localStorage.getItem('device');

              this.translateService.get('login.verifypassword').subscribe(value => {
                this.verifypassword = value;
              });

              this.translateService.get('login.unauthorized').subscribe(value => {
                this.unauthorized = value;
              });

    this.lottieConfig = {
      path: 'https://assets5.lottiefiles.com/packages/lf20_T7TNvI.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };

}

  login(){
    this.dataService.login(this.email,this.password).subscribe(data=>{

      if(data.token){
        var decoded:any = jwt_decode(data.token);
        localStorage.setItem('user_id',decoded.id);
        localStorage.setItem('name',decoded.name);
        localStorage.setItem('photo',decoded.photo);
        localStorage.setItem('customer_id',decoded.customer);

        this.dataService.getSubscriptions({'id':decoded.customer}).subscribe( data => {
          if(data.data[0].status == 'active'){ // se guarda la fecha del premium
            localStorage.setItem('pe',''+new Date(data.data[0].current_period_end*1000));
          }else{
            localStorage.setItem('pe','');
          }
        })


        this.onesignal.setExternalUserId(hashids.encode(decoded.id));
        this.exit(true);
      }else{
        this.presentToast(this.verifypassword,"danger");
      }
    }, error => {
      if(error.error.message == 'Usuario no existe.' ){
        this.presentToast(this.verifypassword,"danger");
      }
    });
  }

  async presentModalSmall(component) {
    const modal = await this.modalController.create({
      cssClass: 'small-modal',
      component: component,
      backdropDismiss:false

    });
    return await modal.present();
  }

  ngOnInit() {
  }

  async presentToast(data,color) {
    const toast = await this.toastController.create({
      message: data,
      duration: 1500,
      color: color
    });
    toast.present();
  }

  exit(success){
    if(success){
      this.modalCtrl.dismiss(true);
    }else{
      this.modalCtrl.dismiss();
    }
  }

  goToRegister(){
    this.modalCtrl.dismiss().then( () => {
      this.presentModal(RegisterPage);
    });
  }

  async presentModal(component) {
    const modal = await this.modalCtrl.create({
      component: component,
      breakpoints: [0.0, 0.90],
      initialBreakpoint: 0.90,
      backdropDismiss:true,
      swipeToClose​:true,
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
       this.exit(true);
      }

    });

    return await modal.present();
  }

  goToPage(pagina){
    this.navCtrl.navigateForward(pagina);
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  forgotPass(){
    this.exit(false);
    this.goToPage('/forgot-pass')
  }

  registrate(){
    this.presentModal(RegisterPage);
}

}

