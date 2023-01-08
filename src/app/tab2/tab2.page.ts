import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { SetGoalPage } from '../pages/set-goal/set-goal.page';
import { DataService } from '../services/data.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
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

  user_id;

  float2int (value) {
    return value | 0;
}

  constructor(
    private navCtrl:NavController,
    private modalController:ModalController,
    private socialSharing: SocialSharing, 
    private api: DataService){

    // this.getActivities();


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

url;

today;
image:string;

shareviaWhatsapp(){
  this.socialSharing.shareViaWhatsApp('hoy corri 2km',this.image,null)
    .then((success) =>{
        alert("Success");
     })
      .catch(()=>{
        alert("Could not share information");
      });
  }

  ionViewWillEnter(){
    this.today = moment().utc().format('MM/DD/Y');
    var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.crossOrigin = "anonymous";  // This enables CORS
    var today  = this.today;
    var km = 6.00;
    var min = '12:20';

imageObj.onload = function () {
    context.drawImage(imageObj, 0,0);
    context.fillStyle = 'white';
    context.font = "30px sans-serif";
    context.fillText("Radi", 20, 50);
    context.font = "15px sans-serif";
    context.fillText(" Running", 20, 70);
    context.font = "15px Arial";
    context.fillText(today, 20, 275);
    context.font = "bold 26px Arial";
    context.fillText(km+" km "+min+" min", 20, 300);

};

imageObj.src = 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nc3xlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60';


setTimeout(function(){
  this.url = canvas.toDataURL("image/jpeg").split(';base64,')[1];
  this.image = this.url;
  // console.log(this.image);
  fetch(canvas.toDataURL("image/jpeg"))
  .then((res) => res.blob())
  .then((blob) => {
    this.image = blob;
    console.log(blob);
  });
},1000);


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
