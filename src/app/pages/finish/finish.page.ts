import { Component, OnInit } from '@angular/core';
import { AdMob,RewardAdOptions,RewardAdPluginEvents,AdMobRewardItem } from '@capacitor-community/admob';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

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

  constructor(
    private modalCtrl:ModalController,
    private api:DataService) {
    this.initialize();
    this.today = new Date();
   }

  ngOnInit() {
    console.log(this.distance,this.time,this.pet_id)
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

    AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward: AdMobRewardItem) => {

        this.api.createActivity(data).subscribe((data:any) => {
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
  }


}
