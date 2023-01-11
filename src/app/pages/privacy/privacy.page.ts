import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  visible;

  activities;
  pets;
  rewards;
  social_media;


  constructor(private navCtrl:NavController,private api:DataService){
    this.visible = localStorage.getItem('show_near')?true:false;
    this.api.getUserPrivacy({id: localStorage.getItem('user_id')}).subscribe(data=> {
      let datos = JSON.parse(data[0].public_configuration);
      this.social_media    = datos.social_media;
      this.activities = datos.activities;
      this.pets       = datos.pets;
      this.rewards    = datos.rewards;
    });

  }

  crazyEvent(e){
    if(e.detail.checked){
      this.visible = true;
      localStorage.setItem('show_near','true');
    }else{
      this.visible = false;
      localStorage.removeItem('show_near');
    }

  }

  ngOnInit() {
  }

  beforePage(){
    this.navCtrl.back();
  }

  update(){
    // "show": this.show,
    let configuration = {
      "social_media":this.social_media,
      "activities": this.activities,
      "pets": this.pets,
      "rewards": this.rewards,
    }

    let public_configuation = JSON.stringify(configuration);

    this.api.updatePrivacy({
      id: localStorage.getItem('user_id'),
      visible: this.visible,
      public_configuration: public_configuation
    }).subscribe(data => {
      console.log(data);
      this.beforePage();
    })



    console.log(localStorage.getItem('show_near'));


  }


}
