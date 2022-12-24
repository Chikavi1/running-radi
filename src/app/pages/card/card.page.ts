import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { isValid } from 'cc-validate';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  sendData = true;


  cardDetails:any = {};
  cardYears:number[] = [];
  numero:string;
  titular:string;
  expiration:string;
  cvc:string;
  month:any;
  year:any;
  card_expiration:string;

  yearLimitIonDateTime;

  logoimg = null;
  mindate;
  type;
  code = '';

  device;
  redeemsuccess;
  redeemfailed;
  incorrect_number;
  card_declined;
  invalid_cvc;
  invalid_expiry_month;

  translate(){
    this.translateService.get('addcard.successredeem').subscribe(value => {
      this.redeemsuccess = value;
    });

    this.translateService.get('addcard.incorrect_number').subscribe(value => {
      this.incorrect_number = value;
    });

    this.translateService.get('addcard.failedredeem').subscribe(value => {
      this.redeemfailed = value;
    });

    this.translateService.get('addcard.card_declined').subscribe(value => {
      this.card_declined = value;
    });

    this.translateService.get('addcard.invalid_cvc').subscribe(value => {
      this.invalid_cvc = value;
    });

    this.translateService.get('addcard.invalid_cvc').subscribe(value => {
      this.invalid_cvc = value;
    });
    this.translateService.get('addcard.invalid_expiry_month').subscribe(value => {
      this.invalid_expiry_month = value;
    });
  }
  constructor(

    private modalCtrl: ModalController,
    private api:DataService,
    private translateService: TranslateService,
    private toastController:ToastController){
      this.translate();
    this.device = localStorage.getItem('device');


    this.mindate = moment().format('YYYY-MM-DD');
    this.yearLimitIonDateTime = moment().year()+8;
  }

  ngOnInit() {
    this.getYears();
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  exit(){
    this.modalCtrl.dismiss();
  }
  getYears(){
    const currentYear = new Date().getFullYear();
    for(let i=0; i<10;i++){
      this.cardYears.push(currentYear + i)
    }
  }

  onEvent(event: KeyboardEvent) {
    let result: any = isValid(this.numero);
    if(result.isValid){
      this.logoimg = result.cardType;
    }
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');

  }

   GetCardType(number){
    let result: any = isValid(number);
    if(result.isValid){
      this.logoimg = result.cardType;
    }
  }

  ParseDataTimeToCardExpiration(date) {
    this.month =  moment(date).month()+1;
    this.year =  moment(date).year();
    this.card_expiration = this.month+'/'+this.year;
 }

 canjear(){
  this.sendData = false;
  let data = {
    code: this.code,
    user_id: localStorage.getItem('user_id')
  }
  this.api.useGift(data).subscribe((data:any) => {
    if(data.status === 200){

      this.presentToast(this.redeemsuccess,'success');
      this.exit();
    }
  },err => {
     this.sendData = true;
     this.presentToast(this.redeemfailed,'danger')
   });
 }

 agregarTarjeta(){
    this.cardDetails = {
      number: this.numero,
      exp_month: this.month,
      exp_year: this.year,
      cvc: this.cvc
    }

  this.api.createToken(this.cardDetails).subscribe(
    (data:any) => {

        this.api.addcard(localStorage.getItem('customer_id'),data.id).subscribe(
          data => {
            this.exit();
          },
          err => {
            if(err.error.code === "invalid_cvc"){
              this.presentToast(this.invalid_cvc,'danger');
            }
          }
        );

    },
    error => {
      if(error.error.code == "incorrect_number"){
        this.presentToast(this.incorrect_number,'danger');
      }
      if(error.error.code == "card_declined"){
        this.presentToast(this.card_declined,'danger');
      }
      if(error.error.code == "invalid_cvc"){
        this.presentToast(this.invalid_cvc,'danger');
      }
      if(error.error.code == "invalid_expiry_month"){
        this.presentToast(this.invalid_expiry_month,'danger');
      }
    }
  );


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
