import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { NavController } from '@ionic/angular';
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
    private barcodeScanner: BarcodeScanner,
    ){
    this.createdCode = 'sadsa';
    this.photo = localStorage.getItem('photo');

  }

scan(){
  this.barcodeScanner.scan().then(barcodeData => {
    this.goToPage('user/2');
    // this.api.getUser(barcodeData.text).subscribe(data => {

    // });
   }).catch(err => {
       console.log('Error', err);
   });
}


goToPage(page){
  this.navCtrl.navigateForward(page);
}


  async  ngOnInit() {
    const brightness = 0.95;
    await ScreenBrightness.setBrightness({ brightness });

}

beforePage(){
  this.navCtrl.back();
}

}
