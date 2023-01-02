import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SetGoalPage } from '../pages/set-goal/set-goal.page';
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
  daily_percentage = 0;

  convertgoal;
  constructor(
    private navCtrl:NavController,
    private modalController:ModalController,
    private api: DataService){
      // this.daily_percentage = 15;
    this.act = JSON.stringify(localStorage.getItem('activities'));
    
    this.convertgoal =  (parseInt(localStorage.getItem('goal'))/60);
    console.log(this.convertgoal)

    // this.getActivities();


    // this.api.getBlogs().subscribe(data => {
    //   this.blogs = data;
    // })

  }

  slide = {
    slidesPerView: 1.1
  }
  slidePets = {
    slidesPerView: 1.03
  }

  getActivities(){
    if(localStorage.getItem('user_id')){
      this.api.getActivities(localStorage.getItem('user_id')).subscribe(data => {
        this.activity = data;
      })
    }
  }

  ionViewWillEnter(){
    if(localStorage.getItem('newActivity')){
      this.getActivities();
      localStorage.removeItem('newActivity');
    }
  }

  goToPage(page){
    this.navCtrl.navigateForward(page)
  }

  goToRun(id){
    this.navCtrl.navigateForward('run-show/'+id);
  }

  goToBlog(slug){
    this.navCtrl.navigateForward('blog/'+slug);
  }

  openModal(){
    this.presentModalShow(SetGoalPage);
  }

  async presentModalShow(component) {
    const modal = await this.modalController.create({
      component: component,
      componentProps:{
        id: 1
      },
      breakpoints: [0.0,0.75, 1],
      initialBreakpoint: 0.75,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {
     if(data['data']){
      this.convertgoal =  (parseInt(localStorage.getItem('goal'))/60);

     }

    });
    return await modal.present();
  }

  async presentMedium(component) {
    const modal = await this.modalController.create({
      component: component,
      componentProps:{
        id: 1
      },
      breakpoints: [0.0,0.6, 1],
      initialBreakpoint: 0.5,
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
