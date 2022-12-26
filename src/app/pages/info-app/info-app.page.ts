import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
@Component({
  selector: 'app-info-app',
  templateUrl: './info-app.page.html',
  styleUrls: ['./info-app.page.scss'],
})
export class InfoAppPage {
  name;
  package;
  versionCode;
  versionNumber;
  plt;
  clicks = 0;


  constructor(private navCtrl:NavController,
    private appVersion: AppVersion,
    private alertController:AlertController,
    private toastController:ToastController,
    private platform:Platform){
    this.plt = this.platform.is('android')?'android':'ios';
    this.init();
   }

   async init(){
    this.name = await this.appVersion.getAppName();
    this.package = await this.appVersion.getPackageName();
    this.versionCode = await this.appVersion.getVersionCode();
    this.versionNumber = await this.appVersion.getVersionNumber();
   }

  beforePage(){
    this.navCtrl.back();
  }

  goToPage(pagina){

    this.navCtrl.navigateForward(pagina);
  }

  sumClicks(){
    this.clicks++;
    if(this.clicks >= 10){
          if(localStorage.getItem('sandbox')){
            this.presentToast("Sandbox Desactivado.","success");
            localStorage.removeItem('sandbox');
            setTimeout(() => {          window.location.reload();}, 2000);

          }else{
            this.presentAlert('Vas a entrar a modo sanbox');
          }

        }
  }


  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message,
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Código de reservación'
        }
      ],
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.navCtrl.back();

            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: (e) => {
            console.log(e.code);
            if(e.code == "chikavi"){

              localStorage.setItem('sandbox','true');
              this.presentToast("Sandbox activado.","success");
              setTimeout(() => {          window.location.reload();}, 2000);

          }

          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentToast(data,color) {
    const toast = await this.toastController.create({
      message: data,
      duration: 1500,
      color: color
    });
    toast.present();
  }
}
