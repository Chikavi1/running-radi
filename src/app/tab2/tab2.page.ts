import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SetGoalPage } from '../pages/set-goal/set-goal.page';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  blogs:any = [];
  lostPets:any = [];
  activities:any =  [];
  petFriendly:any = [];
  acts:any = {};
  daily_percentage = 0;

  convertgoal;

  time;

  date1;
  interval;
  seconds;

  float2int (value) {
    return value | 0;
}

  constructor(
    private navCtrl:NavController,
    private modalController:ModalController,

    private api: DataService){
    this.acts = JSON.parse(localStorage.getItem('activities'));
      console.log(this.acts);

    this.convertgoal =  (parseInt(localStorage.getItem('goal'))/60);





    // console.log('time',this.time)

    this.getActivities();


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
