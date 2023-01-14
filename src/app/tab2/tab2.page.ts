import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SetGoalPage } from '../pages/set-goal/set-goal.page';
import { DataService } from '../services/data.service';
import { Geolocation } from '@capacitor/geolocation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  blogs:any = [];
  lostPets:any = [];
  activities:any =  [];
  acts:any = {};
  daily_percentage = 0;

  convertgoal;

  time;

  date1;
  interval;
  seconds;

  user_id;

  float2int (value) {
    return value | 0;
}

latitude;
longitude;

  constructor(
    private navCtrl:NavController,
    private modalController:ModalController,
    private translateService:TranslateService,
    private api: DataService){

    this.getActivities();

    Geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      // this.getPetsLost();
      // this.getPetFriendly();

    });

    // this.api.getBlogs().subscribe(data => {
    //   this.blogs = data;
    // })

  }

  slide = {
    slidesPerView: 1.1
  }
  slidePets = {
    slidesPerView: 1.03
  }

  total_km = 0;
  time_seconds = 0;
  total_time = '';

  premium;
  measure;


  getPetsLost(){
    this.api.getpetsnear(this.latitude,this.longitude,3).subscribe( data => {
      this.lostPets = data;
      console.log(this.lostPets);
    });
  }

  places:any = [];

  getPetFriendly(){

    this.api.getPlaces(this.latitude,this.longitude).subscribe(data => {
      this.places = data;
      console.log(this.places);

    });


}


  getActivities(){
    if(localStorage.getItem('user_id')){
      this.api.getActivitiesByMonth({id:localStorage.getItem('user_id')}).subscribe(data => {
        this.activities = data;
        this.activities.forEach(element => {
          this.total_km += element.distance;
          this.time_seconds += element.seconds;
        });
        this.total_time = this.fancyTimeFormat(this.time_seconds);
        localStorage.setItem('month_distance',""+this.total_km);
      })
    }
  }

  fancyTimeFormat(duration){
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  ionViewWillEnter(){
    console.log(this.translateService.currentLang);

    this.measure = localStorage.getItem('measure');
    if(localStorage.getItem('pe')){
      if(new Date(localStorage.getItem('pe')) > new Date()){
        this.premium = true;
      }else{
        this.premium = false;
      }
    }else{
      this.premium = false;
    }



    this.user_id =  localStorage.getItem('user_id');
    this.acts = JSON.parse(localStorage.getItem('activities'));
    this.convertgoal =  (parseInt(localStorage.getItem('goal'))/60);


    if(localStorage.getItem('date_start')){
      this.date1 = new Date(localStorage.getItem('date_start'));
      this.interval = window.setInterval(() => {
        var fecha2 = new Date()
        var difference = this.date1.getTime() - fecha2.getTime();
        this.seconds = (this.float2int(difference/1000)*-1);
        this.daily_percentage = (100*this.seconds/(this.convertgoal*60))
      }, 1000);
    }else{
      window.clearInterval(this.interval);
    }


    if(localStorage.getItem('newActivity')){
      this.getActivities();
      localStorage.removeItem('newActivity');
    }
  }

  goToPage(page){
    this.navCtrl.navigateForward(page)
  }

  goToRun(id){
    this.navCtrl.navigateForward('run-show/'+id);
  }

  goToBlog(slug){
    this.navCtrl.navigateForward('blog/'+slug);
  }

  openModal(){
    this.presentModalShow(SetGoalPage);
  }




  async presentModalShow(component) {
    const modal = await this.modalController.create({
      component: component,
      componentProps:{
        id: 1
      },
      breakpoints: [0.0,0.75, 1],
      initialBreakpoint: 0.75,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {
     if(data['data']){
      this.convertgoal =  (parseInt(localStorage.getItem('goal'))/60);

     }

    });
    return await modal.present();
  }

  async presentMedium(component) {
    const modal = await this.modalController.create({
      component: component,
      componentProps:{
        id: 1
      },
      breakpoints: [0.0,0.6, 1],
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
}
