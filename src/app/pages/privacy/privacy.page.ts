import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  show;


  rewards;
  activities;
  pets;

  constructor(private navCtrl:NavController,private api:DataService){

    this.show = localStorage.getItem('show_near')?true:false;

    // this.api.getUserConfiguration({id: localStorage.getItem('user_id')}).subscribe(data=> {
    //   console.log(data);
    // });
  }

  crazyEvent(e){
    if(e.detail.checked){
      this.show = true;
      localStorage.setItem('show_near','true');
    }else{
      this.show = false;
      localStorage.removeItem('show_near');
    }

  }

  ngOnInit() {
  }

  beforePage(){
    this.navCtrl.back();
  }

  update(){
    let configuration = {
      "rewards": this.rewards,
      "activities": this.activities,
      "pets": this.pets,
      "show": this.show
    }

    this.beforePage();


    console.log(localStorage.getItem('show_near'));


  }


}
