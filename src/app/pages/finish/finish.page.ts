import { Component, OnInit } from '@angular/core';
import { AdMob,RewardAdOptions,RewardAdPluginEvents,AdMobRewardItem } from '@capacitor-community/admob';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.page.html',
  styleUrls: ['./finish.page.scss'],
})
export class FinishPage implements OnInit {
  recommend;
  slide;

  constructor() {
    this.initialize();
   }

  ngOnInit() {
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

  setRecommend(s){

  }

  async showRewardVideo(){
    AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward: AdMobRewardItem) => {
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
