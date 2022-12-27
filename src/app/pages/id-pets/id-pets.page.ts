import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DataService } from 'src/app/services/data.service';
declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');
@Component({
  selector: 'app-id-pets',
  templateUrl: './id-pets.page.html',
  styleUrls: ['./id-pets.page.scss'],
})
export class IdPetsPage implements OnInit {
  verified = false;
  id;
  date;

  constructor(
    public dataService:  DataService,
    private toastController: ToastController,
    private barcodeScanner: BarcodeScanner,
    ){

    }

  ngOnInit(){
    // buscar si ya tiene
    this.dataService.getIdentification(hashids.decode(this.id)[0]).subscribe((data:any) => {
      if(data.length == 0){
        this.verified = false;
      }else{
        this.verified = true;
        this.date = data[0].redeemed_date;
      }
    });
  }

  scan(){

    this.barcodeScanner.scan().then(barcodeData => {
      let code = barcodeData.text.split('https://radi.pet/pets/')
      let data = {
        id: hashids.decode(this.id)[0],
        code: code[1]
      }
      this.dataService.associatedId(data).subscribe((data:any) => {
        if(data.status == 200){
          this.verified = true;
          this.presentToast('Se asocio correctamente.','success');
        }

        if(data.status == 503){
          this.presentToast('No se pudo asociar','warning');
        }
      },err => {
        this.presentToast('No se pudo asociar','warning');
      })
    }).catch(err => {
         console.log('Error', err);
     });
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

}
