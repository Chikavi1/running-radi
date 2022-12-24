import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage {
  interval;
  payment;
  card;

  total_points;

    constructor(private api: DataService,private navCtrl:NavController) {
      // this.api.getSubscriptions({'id':1}).subscribe( data => {
      //   console.log(data);
      // });

      // this.api.getSubscription({'subscribe':1}).subscribe( data => {
      //   console.log(data);
      // });
    }
    ionViewWillEnter(){
      this.getInfo()

    }

    getInfo(){
      this.payment = localStorage.getItem('method_payment');

      this.api.getCards(localStorage.getItem('customer_id')).subscribe(data => {
        this.card = data.data[0];
      });
    }

    goToPage(page){
      this.navCtrl.navigateForward(page);
    }


  }
