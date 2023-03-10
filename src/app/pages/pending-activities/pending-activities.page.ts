import { Component, OnInit } from '@angular/core';
import { AdMob, AdMobRewardItem, RewardAdOptions, RewardAdPluginEvents } from '@capacitor-community/admob';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pending-activities',
  templateUrl: './pending-activities.page.html',
  styleUrls: ['./pending-activities.page.scss'],
})
export class PendingActivitiesPage implements OnInit {

  activities:any = [];
  measure;

  successactivity
  translate(){
    this.translateService.get('pendingactivities.uploadsuccess').subscribe(value => {
      this.successactivity = value;
    })
  }

  constructor(private toastController:ToastController,private translateService:TranslateService,private api:DataService) {
    this.translate();
    this.activities = JSON.parse(localStorage.getItem('activities'));
    this.measure = localStorage.getItem('measure');

  }

  ngOnInit() {
  }

  response:any = [];

  async showAd(i,item){
    AdMob.addListener(RewardAdPluginEvents.Rewarded,(reward: AdMobRewardItem) => {
      this.create(i,item);
    })

      const options: RewardAdOptions = {
      adId: '9906704246',
      isTesting: true
    };

      await AdMob.prepareRewardVideoAd(options);
      await AdMob.showRewardVideoAd();
  }

   create(i,item){

    let activityData = {
      "user_id": localStorage.getItem('user_id'),
      "distance": item.distance,
      "time": item.time,
      "json_points": JSON.stringify(item.json_points),
      "seconds": 0,
      "city": item.city,
    }

    this.response = item.pets;

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
      this.remove(i);
      this.presentToast(this.successactivity,'success');
    });
  }

  ionViewWillLeave(){
    if(this.activities.length == 0){
      localStorage.removeItem('activities')
    }
    if(this.activities.length != 0){
      localStorage.setItem('activities',JSON.stringify(this.activities));
    }
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  remove(i){
    this.activities.splice(i,1);
  }

}
