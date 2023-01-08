import { Component, OnInit } from '@angular/core';
import { AdMob,RewardAdOptions,RewardAdPluginEvents,AdMobRewardItem } from '@capacitor-community/admob';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Network } from '@capacitor/network';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';
import { SharingRunPage } from '../sharing-run/sharing-run.page';


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
          showPhoto:''
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
          showPhoto:''
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
        this.response[i].showPhoto =   `data:image/jpeg;base64,`+image;
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
      // console.log(status);
      this.offline = !status.connected;
      // console.log(this.offline)

    });
    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
      // console.log(status);
    };
  }


  finish(){


    // if(this.premium){
    //   this.create();
    // }else{
    //   this.showRewardVideo();
    // }

    let activityData = {
      "user_id": localStorage.getItem('user_id'),
      "distance": this.distance,
      "time": this.time,
      "json_points": this.json_points,
      "seconds": 0,
      "city": this.city,
      "pets":[this.response]
    }

    if(this.offline){
      alert('estas offiline');
      localStorage.setItem('activities',JSON.stringify(activityData));
      this.modalCtrl.dismiss();
      }else{
        this.showRewardVideo();
      }

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
  // console.log(activyResponse)
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
        // console.log(data);
      });

  });

  this.modalCtrl.dismiss();
  localStorage.removeItem('date_start');
// toast

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
