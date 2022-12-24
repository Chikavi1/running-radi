import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
payment;
customer = 'cus_Mq6OUZsYmkZHVa';

  constructor(private api: DataService,private navCtrl:NavController) {
    this.api.getSubscriptions({'subscribe':1}).subscribe( data => {
      console.log(data);
    });

    // this.api.getSubscription({'subscribe':1}).subscribe( data => {
    //   console.log(data);
    // });

  }

  goToPage(page){
    this.navCtrl.navigateForward(page);
  }


}
