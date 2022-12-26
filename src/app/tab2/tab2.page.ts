import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  blogs:any = [];
  lostPets:any = [];
  activity:any =  [];
  petFriendly:any = [];
  act;
  constructor(
    private navCtrl:NavController,
    private modalController:ModalController,
    private api: DataService){
      this.act = JSON.stringify(localStorage.getItem('activity'));
    this.api.getBlogs().subscribe(data => {
      this.blogs = data;
    })
  }

  slide = {
    slidesPerView: 1.1
  }
  slidePets = {
    slidesPerView: 1.03
  }

  goToPage(page){
    this.navCtrl.navigateForward(page)
  }

  goToBlog(slug){
    this.navCtrl.navigateForward('blog/'+slug);
  }
  
  async presentModalShow(component) {
    const modal = await this.modalController.create({
      component: component,
      componentProps:{
        id: 1
      },
      breakpoints: [0.0,0.6, 1],
      initialBreakpoint: 0.6,
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
