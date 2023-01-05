import { Component, OnInit } from '@angular/core';
import { AdMob,RewardAdOptions,RewardAdPluginEvents,AdMobRewardItem } from '@capacitor-community/admob';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Network } from '@capacitor/network';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';


@Component({
  selector: 'app-finish',
  templateUrl: './finish.page.html',
  styleUrls: ['./finish.page.scss'],
})
export class FinishPage implements OnInit {
  slide;

  behavior;
  pooped;
  water;

  today;
  distance;
  time;
  pet_id;

  json_points;

  welcome;

  lat_start;
  lng_start;
  city;

  constructor(
    private modalCtrl:ModalController,
    private nativeGeocoder: NativeGeocoder,
    private api:DataService){
      const date = new Date().getHours()
      this.welcome = date < 12 ? 'En la mañana' : date < 18 ? 'En la tarde' : 'En la noche'

    this.initialize();
    this.today = new Date();
   }

  ngOnInit() {
    console.log(this.distance,this.time,this.pet_id);


    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

      this.nativeGeocoder.reverseGeocode(this.lat_start, this.lng_start, options)
      .then((result: NativeGeocoderResult[]) => {
        this.city = result[0].locality;
        // alert(JSON.stringify(result[0].locality))

      })
      .catch((error: any) => console.log(error));
  }

  uploadPhoto;
  photo;

  async getPicture(){
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
      this.modalImage(image.base64String);
  }

  async modalImage(image){
    const modal = await this.modalCtrl.create({
      component: PhotoModalPage,
      componentProps:{
        imageSend: image,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const image = data['data'];
        this.uploadPhoto = image;
        this.photo = `data:image/jpeg;base64,`+image;
      }
    });
    return await modal.present();
  }

  async initialize(){
    const { status} = await AdMob.trackingAuthorizationStatus();
    console.log(status);

    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: [''],
      initializeForTesting: true,
    })

  }

  setPooped(s){
    this.pooped = s;
  }

  setWater(s){
    this.water = s;
  }

  setBehavior(s){
    this.behavior = s;
  }

  offline;
  ionViewWillEnter(){
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);

      if(status.connected == false){
       this.offline = true;
      }

    });

    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
      console.log('Network status:', status);
    };



  }

  async showRewardVideo(){

    let meta_data = {
      "behavior": this.behavior,
      "pooped" : this.pooped,
      "water" : this.water
    }

    let data = {
      "user_id": localStorage.getItem('user_id'),
      "pet_id": this.pet_id,
      "distance": this.distance,
      "time": this.time,
      "created": new Date(),
      "json_points": JSON.stringify(this.json_points),
      "meta_data": JSON.stringify(meta_data)
    }

    if(this.offline){
      localStorage.setItem('activities',JSON.stringify(data));
      this.modalCtrl.dismiss();

      }else{



        AdMob.addListener(
          RewardAdPluginEvents.Rewarded,
          (reward: AdMobRewardItem) => {

            this.api.createActivity(data).subscribe((data:any) => {
            localStorage.setItem('newActivity','true');
            if(data.status == 200){
              this.modalCtrl.dismiss();
            }
          })

          console.log('REWARD: ',reward);
        }
        )
        const options: RewardAdOptions = {
        adId: '9906704246',
        isTesting: true
      };

      await AdMob.prepareRewardVideoAd(options);
      await AdMob.showRewardVideoAd();

      localStorage.removeItem('date_start');

    }
  }


}
