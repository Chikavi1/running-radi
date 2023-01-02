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
  constructor(private modalCtrl:ModalController,private api: DataService) {
    this.user_id = localStorage.getItem('user_id');
    this.getPets()
   }

  step = 1;
  pet_selected;
  ngOnInit() {
  }

  getPets(){
    if(this.user_id){
      Network.addListener('networkStatusChange', status => {
        if(status.connected == false){
          this.api.getPets(this.user_id).subscribe( datos => {
            this.mascotas = datos;
            localStorage.setItem('pets',JSON.stringify(this.mascotas));
          });
        }else{
          this.mascotas = localStorage.getItem('pets');
        }
      });

    }
  }

  next(){
    this.step += this.step;
  }

  close(success){
    this.modalCtrl.dismiss(this.pet_selected);
  }

  handleChange(ev) {
    this.pet_selected = ev.target.value;
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
