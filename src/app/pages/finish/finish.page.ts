import { Component, OnInit } from '@angular/core';
import { AdMob,RewardAdOptions,RewardAdPluginEvents,AdMobRewardItem } from '@capacitor-community/admob';
import { ModalController } from '@ionic/angular';

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
  id_pet;

  constructor(private modalCtrl:ModalController) {
    this.initialize();
    this.today = new Date();
   }

  ngOnInit() {
    console.log(this.distance,this.time,this.id_pet)
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
    AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward: AdMobRewardItem) => {
        console.log('REWARD: ',reward);
        this.modalCtrl.dismiss();
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
