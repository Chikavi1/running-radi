import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.page.html',
  styleUrls: ['./my-pets.page.scss'],
})
export class MyPetsPage implements OnInit {

  user_id;
  mascotas:any = [];

  constructor(private api:DataService,private navCtrl:NavController){
    this.user_id = localStorage.getItem('user_id');

    this.api.getPets(this.user_id).subscribe( datos => {
      console.log(datos);
      this.mascotas = datos;
    });
  }

  ngOnInit() {
  }

  goToPets(id){
    this.navCtrl.navigateForward('pet/'+hashids.encode(id));
   }

  beforePage(){
    this.navCtrl.back();
  }

  addPet(){
    this.navCtrl.navigateForward('/create-pet');
   }

}
