import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { LoginPage } from '../login/login.page';
import { Network } from '@capacitor/network';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
mascotas:any = [];
user_id;

premium;
pets_selected;

offline = false;

  constructor(private modalCtrl:ModalController,private api: DataService){

    if(localStorage.getItem('pe')){
      if(new Date(localStorage.getItem('pe')) > new Date()){
        this.premium = true;
      }else{
        this.premium = false;
      }
    }else{
      this.premium = false;
    }




    this.user_id = localStorage.getItem('user_id');
    this.getPets()
   }


  step = 1;
  ngOnInit() {
  }

  getPets(){


    Network.addListener('networkStatusChange', status => {
      this.offline = !status.connected;
    });


    if(this.offline){
      this.mascotas = JSON.parse(localStorage.getItem('pets'));
    }else{
        if(this.user_id){
        this.api.getPets(this.user_id).subscribe( datos => {
          this.mascotas = datos;
          localStorage.setItem('pets',JSON.stringify(this.mascotas));
        });
      }
    }
  }

  next(){
    this.step += this.step;
  }

  close(success){
    this.modalCtrl.dismiss(this.pets_selected);
  }


  login(){
    this.presentModal(LoginPage);
   }

   async presentModal(component) {
    const modal = await this.modalCtrl.create({
      component: component,
      breakpoints: [0.0, 0.90],
      initialBreakpoint: 0.90,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {
     if(data['data']){
        this.user_id = localStorage.getItem('user_id');
        this.getPets();

     }

    });
    return await modal.present();
  }

}
