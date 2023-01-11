import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { CardPage } from '../card/card.page';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage {
  cardDetails;
  extras;
  customer_id = '';
  number;
  cards:any;
  total = 0;
  menu = false;
  price;
  slide = {
    slidesPerView:  1.16,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  // translate
  firstOption;
  secondOption;
  menutitle;
  optioncancel;

  device;
  constructor(
    public data:DataService,
    public modalController: ModalController,
    private navCtrl: NavController,
    private actionSheetController:ActionSheetController,
    private router:Router,
    private translateService: TranslateService
  ){
    this.device = localStorage.getItem('device');

    this.customer_id = localStorage.getItem('customer_id');
    this.translateService.get('petsmenu.title').subscribe(value => {
      this.menutitle = value;
    })
    translateService.get('payments.debitorcredit').subscribe(value => {
      this.firstOption = value;
    })
    translateService.get('payments.giftcard').subscribe(value => {
      this.secondOption = value;
    })
    this.translateService.get('petsmenu.optioncancel').subscribe(value => {
      this.optioncancel = value;
    })

    this.extras = this.router.getCurrentNavigation().extras;
    if(this.extras.queryParams){
      this.price = this.extras.queryParams.price;
    }
    if(this.extras.menu){
      this.menu = true;
    }
  }
  exit(){
    this.modalController.dismiss();
  }

obtenerTarjetas(){
  this.data.getCards(this.customer_id).subscribe( cards => {
    this.cards = cards.data;
  });
}

obtenerPuntos(){
  this.total = 0;
  this.data.getPoints(localStorage.getItem('user_id')).subscribe((data:any) =>{
    data.forEach(element => {
      this.total += element.value;
    });
  });
}

updateDefaultCard(customer_id,card_id){
  localStorage.setItem('method_payment','1');
  this.data.updateDefaultCard(customer_id,card_id).subscribe( datos => {

  });
  this.obtenerTarjetas();
  this.beforePage();
}
delete(item,customer_id,card_id){
  let index = this.cards.indexOf(item);
  if(index > -1){
    this.cards.splice(index, 1);
  }
  this.data.deleteCard(customer_id,card_id).subscribe( datos => {
  });
}

ionViewWillEnter(){
  this.obtenerTarjetas();
  this.obtenerPuntos();
 }

async addCard(){
  let options = [];
    options = [
    {
      text: this.firstOption,
      icon: 'card',
      handler: () => {
        this.presentModal(CardPage,1);
      }
    },
    {
        text: this.secondOption,
        icon: 'paw',

        handler: () => {
          this.presentModal(CardPage,2);
        }

    },
    {
      text: this.optioncancel,
      icon: 'close',
      role: 'cancel',
      handler: () => {
      }
    }
  ];

  const actionSheet = await this.actionSheetController.create({
    header: this.menutitle,
    mode: 'md',
    buttons: options
  });
  await actionSheet.present();

  const { role } = await actionSheet.onDidDismiss();

  // this.presentModalSmall(SelectBinaryPage);
}

async presentModal(component,type) {
  const modal = await this.modalController.create({
    component: component,
    componentProps: {
      type
    }
  });
    modal.onDidDismiss().then( () => {
      this.obtenerTarjetas();
      this.obtenerPuntos();
    });
  return await modal.present();
}

selectRadi(){
  localStorage.setItem('method_payment','2');
  this.beforePage();
}

beforePage(){
  this.navCtrl.back();
}
}

