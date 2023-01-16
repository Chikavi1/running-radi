import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Share } from '@capacitor/share';
import { ActionSheetController, ModalController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import * as Leaflet from 'leaflet';
import { Browser } from '@capacitor/browser';
import { ModalReportPage } from '../modal-report/modal-report.page';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

declare var L: any;

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})
export class PlacePage implements OnInit {
  @ViewChild('leafletMap')
  private mapElement: ElementRef;

  device;
  place:any = [];
  schedule:any = {};
  id;

  monday_start;
  tuesday_start;
  wednesday_start;
  thursday_start;
  friday_start;
  saturday_start;
  sunday_start;


  monday_end;
  tuesday_end;
  wednesday_end;
  thursday_end;
  friday_end;
  saturday_end;
  sunday_end;

  reviews:any = [];

  total_score = 0;

  payments_methods;

  slideOpts = {
    slidesPerView: 1.05,
    spaceBetween:5,
    pager: true
  }

  user_id;

  constructor(
    private callNumber:CallNumber,
    private translateService:TranslateService,
    private navCtrl: NavController,
    private api:DataService,
    private clipboard:Clipboard,
    private modalController:ModalController,
    private actionSheetController:ActionSheetController,
    private toastController:ToastController
  ){
    this.device = 'phone'
    this.translate();
    this.user_id = localStorage.getItem('user_id');
  }

  ngOnInit() {


    this.api.getPlace(this.id).subscribe((data:any) => {
      this.place = data[0];
      this.schedule = JSON.parse(this.place.schedule);
      if(this.schedule){
        this.monday_start = this.schedule[0].start;
        this.monday_end = this.schedule[0].end;

        this.tuesday_start = this.schedule[1].start;
        this.tuesday_end = this.schedule[1].end;

        this.wednesday_start = this.schedule[2].start;
        this.wednesday_end = this.schedule[2].end;

        this.thursday_start = this.schedule[3].start;
        this.thursday_end = this.schedule[3].end;

        this.friday_start = this.schedule[4].start;
        this.friday_end = this.schedule[4].end;

        this.saturday_start = this.schedule[5].start;
        this.saturday_end = this.schedule[5].end;

        this.sunday_start = this.schedule[6].start;
        this.sunday_end = this.schedule[6].end;
      }


    });

    this.api.getReviewsPlace(this.id).subscribe((data:any) =>{
      this.reviews = data;
      this.reviews.forEach(element => {
        this.total_score += parseInt(element.score);
      });
    });

  }

  copy;
  menutitle;
  optionshare;

  optionreport;
  optionsave;
  optionnosave;
  savemessage;
  deletemessage
  optioncancel

  translate(){
    this.translateService.get('place.copy').subscribe(value => {
      this.copy = value;
    });
    this.translateService.get('petsmenu.title').subscribe(value => {
      this.menutitle = value;
    });
    this.translateService.get('petsmenu.optionshare').subscribe(value => {
      this.optionshare = value;
    })


    this.translateService.get('place.optionreport').subscribe(value => {
      this.optionreport = value;
    })
    this.translateService.get('place.optionsave').subscribe(value => {
      this.optionsave = value;
    })
    this.translateService.get('place.optionnosave').subscribe(value => {
      this.optionnosave = value;
    })
    this.translateService.get('place.savemessage').subscribe(value => {
      this.savemessage = value;
    })
    this.translateService.get('place.deletemessage').subscribe(value => {
      this.deletemessage = value;
    })

    this.translateService.get('place.optioncancel').subscribe(value => {
      this.optioncancel = value;
    })



  }

  close(){
    this.modalController.dismiss();
  }

  presentReview(review){
    // this.presentSmallModal(PlaceReviewPage,review);
  }

  async presentSmallModal(component,review) {
    const modal = await this.modalController.create({
      component: component,
      componentProps:{
        review
      },
      breakpoints: [0.0, 0.75],
      initialBreakpoint: 0.75,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }

  async options() {



    let options = [];
    options = [

    {
      text: this.optionshare,
      icon: 'share-social',
      handler:async() => {
        this.share();
      }
    },
    {
      text: this.optionreport,
      icon: 'file-tray-full',
      handler: () => {
        this.presentReport();
      }
    },
    // ,
    // {
    //   text: this.optionsave,
    //   icon: 'bookmark',
    //   handler: () => {
    //     // this.api.createSaved({user_id:localStorage.getItem('user_id'),place_id: this.place.id }).subscribe((data:any) => {
    //     //   if(data.status == 200){
    //     //     this.presentToast(this.savemessage,'success');
    //     //   }
    //     // });
    //   }
    // },
    // {
    //   text: this.optionnosave,
    //   icon: 'bookmark',
    //   handler: () => {
    //     // this.api.deleteSaved({user_id:localStorage.getItem('user_id'),place_id: this.place.id }).subscribe(data => {
    //     //   console.log(data);
    //     //   if(data.status == 200){
    //     //     this.presentToast(this.deletemessage,'warning')
    //     //   }
    //     // });

    //   }
    // },
    {
      text: this.optioncancel,
      icon: 'close',
      role: 'cancel',
      handler: () => {
      }
    }
  ];

  if(this.user_id){

    // this.api.checkSaved({user_id:this.user_id,place_id: this.place.id }).subscribe(data =>{
    //   console.log(data)
    //   if(!data){
    //     options.splice(3,1);
    //   }else{
    //     options.splice(2,1);
    //   }
    // })
  }else{
    options.splice(2,2);
  }

  setTimeout(async()=>{

    const actionSheet = await this.actionSheetController.create({
      header: this.menutitle,
      mode:'md',
      buttons: options
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  },650);

  }

  call(number){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
}

presentReport(){
  this.presentModal(ModalReportPage,this.place.id,'place');
}

async presentModal(component,id,type) {
  const modal = await this.modalController.create({
    component: component,
    componentProps:{
      id,
      type
    },
    breakpoints: [0.5,1.0],
    initialBreakpoint: 1.0,
    backdropDismiss:true,
    swipeToClose​:true,
    cssClass: 'small-modal'
  });

  modal.onDidDismiss().then(() => {

  });
  return await modal.present();
}

openMenu(){
  this.openUrl(this.place.pdf_menu)
}

async share(){
  await Share.share({
    title: this.place.title,
    text: 'Este lugar se llama '+this.place.title+' y se encuentra en '+this.place.city+' te mando el link para que lo cheques: ',
    url: this.place.google_link,
    dialogTitle: 'Lugar pet friendly',
  });
}


adClick(){
  this.openUrl('https://radi.pet/ads')
 }



  copyText(text){
    this.clipboard.copy(text);
    this.presentToast(this.copy,'success')
   }

   async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  async openUrl(url){
    await Browser.open({ url });
   }


  ionViewDidEnter() {

    this.leafletMap();
   }

  map;

    leafletMap(){
      var homeICon = L.icon(
        {
          iconUrl:  'https://i.ibb.co/X2gkTYX/shops.png',
          iconSize:     [33, 33], // size of the icon
        });
      this.map = Leaflet.map(this.mapElement.nativeElement,{ zoomControl: false}).setView([this.place.latitude,this.place.longitude], 15);
      Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
        zoom: 8,
        zoomControl: false,
        maxZoom: 18,
        minZoom: 4,
        minResolution: 4891.96981025128,
        maxResolution: 39135.75848201024,
        doubleClickZoom: true
        }).addTo(this.map);

        Leaflet.marker([this.place.latitude,this.place.longitude],{icon: homeICon}).addTo(this.map).bindPopup(this.place.address);

    }

    beforePage(){{
      this.navCtrl.back();
    }}

    goToPage(page){
      this.navCtrl.navigateForward(page);
    }

    goReviewCreate(){
      const extras: NavigationExtras = {
        queryParams:{
          id_place: this.place.id
        }
      }
      this.navCtrl.navigateForward('/place-check',extras);
    }


}
