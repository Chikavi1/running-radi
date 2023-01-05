import { Component, OnInit } from '@angular/core';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-qr-user',
  templateUrl: './qr-user.page.html',
  styleUrls: ['./qr-user.page.scss'],
})
export class QrUserPage implements OnInit {

  photo;
  createdCode;

  constructor(private navCtrl:NavController){
    this.createdCode = 'sadsa';
    this.photo = localStorage.getItem('photo');

  }

  async  ngOnInit() {
    const brightness = 0.5;
    await ScreenBrightness.setBrightness({ brightness });

}

beforePage(){
  this.navCtrl.back();
}

}
