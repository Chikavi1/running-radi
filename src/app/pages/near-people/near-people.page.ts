import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-near-people',
  templateUrl: './near-people.page.html',
  styleUrls: ['./near-people.page.scss'],
})
export class NearPeoplePage implements OnInit {

  users:any = [];
  show = false;
  constructor(private navCtrl:NavController,private api:DataService) {
    this.show = localStorage.getItem('show_near')?true:false;

    if(this.show){
      this.getUsers();
    }

  }

  getUsers(){
    let data = {
      "latitude" : "20.620591",
      "longitude" : "-103.305511"
    }
    this.api.usersNear(data).subscribe(data => {
      this.users = data;
    });
  }

  changeVisible(){
    this.show = true;
    localStorage.setItem('show_near','true');
  }

  ngOnInit() {
  }

  goToPage(page){
    this.navCtrl.navigateForward(page)
  }

  beforePage(){
    this.navCtrl.back();
  }

  async share(){
    await Share.share({
      title: 'Radi Runners',
      text: 'Descarga la app para ir de paseo con tu mascota',
      url: 'https://radi.pet/',
      dialogTitle: 'Descarga la app para ir de paseo con tu mascota'
    });
  }

}
