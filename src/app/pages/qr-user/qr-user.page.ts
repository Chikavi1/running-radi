import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-qr-user',
  templateUrl: './qr-user.page.html',
  styleUrls: ['./qr-user.page.scss'],
})
export class QrUserPage implements OnInit {

  photo;
  createdCode;

  constructor(
    private navCtrl:NavController,
    private api:DataService,
    private toastController:ToastController,
    private barcodeScanner: BarcodeScanner,
    ){
    this.createdCode = 'https://radi.pet/user/'+localStorage.getItem('user_id');
    this.photo = localStorage.getItem('photo');

  }

scan(){
  this.barcodeScanner.scan().then(barcodeData => {
    let recorte = barcodeData.text.split('https://radi.pet/user/')
    if(recorte[1]){
      this.goToPage('user/'+recorte[1]);
    }else{
      this.presentToast('Código QR no valido','danger');
    }

   }).catch(err => {
       console.log('Error', err);
   });
}


goToPage(page){
  this.navCtrl.navigateForward(page);
}

async presentToast(message,color) {
  const toast = await this.toastController.create({
    message,
    color,
    duration: 2000
  });
  toast.present();
}


  async  ngOnInit() {
    const brightness = 0.95;
    await ScreenBrightness.setBrightness({ brightness });

}

beforePage(){
  this.navCtrl.back();
}

}
