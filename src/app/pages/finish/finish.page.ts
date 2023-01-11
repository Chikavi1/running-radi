import { Component, OnInit } from '@angular/core';
import { AdMob,RewardAdOptions,RewardAdPluginEvents,AdMobRewardItem } from '@capacitor-community/admob';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Network } from '@capacitor/network';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';
import { SharingRunPage } from '../sharing-run/sharing-run.page';
import * as moment from 'moment';


@Component({
  selector: 'app-finish',
  templateUrl: './finish.page.html',
  styleUrls: ['./finish.page.scss'],
})



export class FinishPage implements OnInit {
  slide;



  today;
  distance = 0;
  time = '0:00';
  seconds = 0;
  json_points;
  welcome;

  lat_start;
  lng_start;
  city = 'a';

  premium;

datas:any = [];

  pet_selected:any = [];

  response:any = [];


  constructor(
    private modalCtrl:ModalController,
    private nativeGeocoder: NativeGeocoder,
    private toastController:ToastController,
    private modalController:ModalController,
    private api:DataService){
      const date = new Date().getHours()
      this.welcome = date < 12 ? 'en la mañana' : date < 18 ? 'en la tarde' : 'en la noche'

      this.initialize();
      this.today = new Date();

      this.slide = {
        slidesPerView:  1.1,
        spaceBetween:1,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }
      }

      if(localStorage.getItem('pe')){
        if(new Date(localStorage.getItem('pe')) > new Date()){
          this.premium = true;
        }else{
          this.premium = false;
        }
      }else{
        this.premium = false;
      }


   }

   pets;

  ngOnInit() {

    if(this.pet_selected.length == undefined){
      this.pets = [
        {
          "name": this.pet_selected.name,
          "id":  this.pet_selected.id
        }
      ];


        this.response.push({
          id: this.pet_selected.id,
          behavior: 0,
          popped: 0,
          water: 0,
          photo:'',
        })
    }else{
      this.pets = this.pet_selected;

      this.pets.forEach(element => {
        this.response.push({
          id: element.id,
          behavior: 0,
          popped: 0,
          water: 0,
          photo:'',
        })
      });
    }



    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

      this.nativeGeocoder.reverseGeocode(this.lat_start, this.lng_start, options)
      .then((result: NativeGeocoderResult[]) => {
        this.city = result[0].locality;
      })
      .catch((error: any) => console.log(error));
  }



  async getPicture(i){
    const image = await Camera.getPhoto({
      quality: 100,

      saveToGallery:true,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      promptLabelHeader: 'Foto',
      promptLabelCancel: 'Cancelar',
      promptLabelPhoto: 'Galeria',
      promptLabelPicture: 'Tomar Foto'
    });
      this.modalImage(i,image.base64String);
  }

  async modalImage(i,image){
    const modal = await this.modalCtrl.create({
      component: PhotoModalPage,
      componentProps:{
        imageSend: image,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const image = data['data'];
        this.response[i].photo =  image;
      }
    });
    return await modal.present();
  }

  async initialize(){
    const { status} = await AdMob.trackingAuthorizationStatus();

    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: [''],
      initializeForTesting: true,
    })

  }

  setPooped(i,popped){
    this.response[i].popped = popped;
  }

  setWater(i,water){
    this.response[i].water = water;

  }

  setBehavior(i,behavior){
    this.response[i].behavior = behavior;
  }

  offline;

  ionViewWillEnter(){
    Network.addListener('networkStatusChange', status => {
      this.offline = !status.connected;
    });
    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
    };
  }


async presentToast(message,color) {
  const toast = await this.toastController.create({
    message,
    color,
    duration: 2000
  });
  toast.present();
}


openModalSharing(bg){
  this.presentShare(SharingRunPage,bg);
}

async presentShare(component,bg) {
  const modal = await this.modalController.create({
    component: component,
    componentProps:{
      id: 1,
      bg: bg,
      distance: 6.32,
      time: '23:43'
    },
    breakpoints: [0.0,0.6],
    initialBreakpoint: 0.5,
    backdropDismiss:true,
    swipeToClose​:true,
    cssClass: 'small-modal'
  });

  modal.onDidDismiss().then((data) => {
   if(data['data']){

   }

  });
  return await modal.present();
}



finish(){

    if(!navigator.onLine){

      let array = localStorage.getItem('activities')?JSON.parse(localStorage.getItem('activities')):[];

      let activityData:any = {
        "user_id": localStorage.getItem('user_id'),
        "date": moment().toDate(),
        "distance": this.distance,
        "time": this.time,
        "json_points": this.json_points,
        "seconds": 0,
        "city": this.city,
        "pets": this.response
      }

      array.push(activityData);

      localStorage.setItem('activities',JSON.stringify(array));

      if(this.premium){
        this.presentToast('Se guardara en local,cuando recuperes la conexión podras subirlos','success');
      }else{
        this.presentToast('Se guardara en local,se borrara pronto, cuando tengas internet subelo','success');
      }
      this.modalCtrl.dismiss(true);

    }
    else{
      if(this.premium){
        this.create();
      }else{
        this.showRewardVideo();
      }
    }
    localStorage.removeItem('date_start');
    localStorage.removeItem('kilometers');
    localStorage.removeItem('seconds');
    localStorage.removeItem('pet_selected');
}

create(){
  let activityData = {
    "user_id": localStorage.getItem('user_id'),
    "distance": this.distance,
    "time": this.time,
    "json_points": this.json_points,
    "seconds": 0,
    "city": this.city,
  }

  this.api.createActivity(activityData).subscribe((activyResponse:any) => {
    const actid = activyResponse.id;
    this.response.forEach(pet => {
        let petData = {
        activity_id: actid,
          pet_id: pet.id,
          behavior: pet.behavior,
          popped: pet.popped,
          water: pet.water,
          photo: pet.photo
        }
        this.api.createPetActivity(petData).subscribe((data:any) => {
        });

    });


    this.modalCtrl.dismiss(true);

    this.presentToast('Se ha subido exitosamente la actividad a tu perfil','success');


  });
}

  async showRewardVideo(){
    AdMob.addListener(RewardAdPluginEvents.Rewarded,(reward: AdMobRewardItem) => {
      this.create();
    })

      const options: RewardAdOptions = {
      adId: '9906704246',
      isTesting: true
    };

      await AdMob.prepareRewardVideoAd(options);
      await AdMob.showRewardVideoAd();

  }


}
