import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
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

  me_bar   = 0;
  you_bar = 0;

  my_distance = 0;


  user_id;

  follower = 0;

  configuration;

  show_activities   = false;
  show_social_media = false;
  show_pets         = false;
  show_rewards      = false;

  measure;
  social_media:any = [];

  constructor(
    private navCtrl:NavController,
    private route:ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private api: DataService) {

      this.measure = localStorage.getItem('measure');


    this.user_id = localStorage.getItem('user_id');
    this.photo = localStorage.getItem('photo');
    this.my_distance = parseFloat(localStorage.getItem('month_distance'));

    this.route.params.subscribe((params: Params) => {
     let data = { id: params['id'], id_follower: localStorage.getItem('user_id') } ;
      this.api.userRunning(data).subscribe((data:any) => {
        if(data.user[0].social_media){
          this.social_media = JSON.parse(data.user[0].social_media);
        }
        this.user = data.user[0];
        this.follower = data.follower;
        this.configuration = JSON.parse(this.user.public_configuration);
        if(this.configuration != null){
          this.show_activities   = this.configuration.activities;
          this.show_social_media = this.configuration.social_media;
          this.show_pets         = this.configuration.pets;
          this.show_rewards      = this.configuration.rewards;
        }
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
        }else{
          this.you_bar = 1;
          this.me_bar = ((100/(this.total_km/this.my_distance))/100);
        }

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

  follow(){

    if(this.show_social_media == false){
      this.createFollow(1);
      this.presentToast('Se envio una solicitud de amistad','dark');
    }else{
      this.createFollow(2);
      this.presentToast('Ya son amigos','dark');
    }
  }

  unfollow(){
    this.actionUnFollow();
  }

  deleteRequest(){
    this.actionDeleteRequest();
  }

  async actionUnFollow(){
    let options = [];
      options = [
      {
        text: 'Dejar de seguir',
        icon: 'person-remove',
        handler: () => {

          this.deleteFollow();
          this.presentToast('Ya no son amigos','dark');

        }
      },
      {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'

      }
    ];

    const actionSheet = await this.actionSheetController.create({
      header: '¿Quieres dejar de seguirlo?',
      mode: 'md',
      buttons: options
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    }


  createFollow(status){

    let data = {
      id_user     : this.user.id,
      id_follower : localStorage.getItem('user_id'),
      status      : status
    }

    this.api.createFollow(data).subscribe((data:any) => {
      console.log(data);
      if(data.status == 200){
        this.follower = status;
      }
    });

  }

  deleteFollow(){
    let data = {
      id_user: this.user.id,
      id_follower: localStorage.getItem('user_id')
    }

    this.api.deleteFollow(data).subscribe((data:any) => {
      console.log(data);
      if(data.status == 200){
        this.follower = 0;
      }
    });

  }

  async openUrl(url){
    await Browser.open({ url });
   }

  contact(type,link){
    if(type == 'fb'){
      this.openUrl('https://www.facebook.com/'+link)
    }else if(type == 'ig'){
      this.openUrl('https://www.instagram.com/'+link);
    }else if(type == 'wa'){
      this.openUrl('https://api.whatsapp.com/send?phone='+link);
    }
  }


  async actionDeleteRequest(){
    let options = [];
      options = [
      {
        text: 'Eliminar Solicitud',
        icon: 'person-remove',
        handler: () => {
          this.deleteFollow();
          this.presentToast('Se eliminó la solicitud','dark');
        }
      },
      {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
      }
    ];

    const actionSheet = await this.actionSheetController.create({
      header: '¿Quieres eliminar la solicitud?',
      mode: 'md',
      buttons: options
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
      });
    toast.present();
  }

}
