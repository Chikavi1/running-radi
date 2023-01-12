import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { ModalController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Geolocation } from '@capacitor/geolocation';
import { StartNearPage } from '../start-near/start-near.page';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-near-people',
  templateUrl: './near-people.page.html',
  styleUrls: ['./near-people.page.scss'],
})
export class NearPeoplePage implements OnInit {

  users:any = [];
  show = false;

  near_success = false;

  walkpet: AnimationOptions  = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_XRLjtE.json',
    autoplay: true,
    loop: true
  };

  constructor(private navCtrl:NavController,private api:DataService,private modalController:ModalController) {

  }


  ionViewWillEnter(){
    this.show = localStorage.getItem('show_near')?true:false;
    this.near_success = localStorage.getItem('near_success')?true:false;
    if(this.show && this.near_success){
      this.getUsers();
    }
  }

  getUsers(){
    Geolocation.getCurrentPosition().then((resp) => {
        let data = {
          "latitude" :  resp.coords.latitude,
          "longitude" : resp.coords.longitude
        }

        this.api.usersNear(data).subscribe(data => {
          console.log(data);
          this.users = data;
        });
    });

  }

  changeVisible(){
    this.api.updateUser({id:localStorage.getItem('user_id'),visible:true}).subscribe(data => {
      if(data.status == 200){
        this.show = true;
        localStorage.setItem('show_near','true');
        this.getUsers();
      }
    });

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

  start(){
    this.presentModal(StartNearPage)
  }

  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      breakpoints: [0.0, 0.77],
      initialBreakpoint: 0.77,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.near_success = true;
      }

    });
    return await modal.present();
  }

}
