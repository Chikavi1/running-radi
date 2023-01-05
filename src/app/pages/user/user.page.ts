import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user:any = [];
  activities:any = [];

  short_name;


  total_km = 0;
  total_time = '';
  time_seconds = 0;

  age;

  photo;

  private = true;

  me_bar   = 0;
  you_bar = 0;

  my_distance = 0;


  constructor(private navCtrl:NavController,private route:ActivatedRoute,private api: DataService) {
    this.photo = localStorage.getItem('photo');
    this.my_distance = parseFloat(localStorage.getItem('month_distance'));

    this.route.params.subscribe((params: Params) => {
     let data = {id: params['id'] } ;
    //  let data = {id:1};
      this.api.userRunning(data).subscribe((data:any) => {
        this.user = data.user[0];
        this.short_name = this.user.name.split(" ")[0];

        if(this.user.birthday){
          this.age = moment().diff(moment(this.user.birthday), 'years');
        }

        this.activities = data.activities;
        this.activities.forEach(element => {
          this.total_km += element.distance;
          this.time_seconds += element.seconds;
        });

        this.total_time = this.fancyTimeFormat(this.time_seconds);


        if(this.my_distance > this.total_km){
          this.me_bar = 1;
          this.you_bar = ((100/(this.my_distance/this.total_km))/100);
          //  ((this.total_km*this.my_distance)/100);
          //
        }else{
          this.you_bar = 1;
          this.me_bar = ((100/(this.total_km/this.my_distance))/100);
        }

        // console.log(this.total_km,this.my_distance);
        // console.log(this.you_bar,this.me_bar);


      })
   });
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

  ngOnInit() {
  }

  goToRun(id){
    this.navCtrl.navigateForward('run-show/'+id);
  }

  beforePage(){
    this.navCtrl.back();
  }

}
