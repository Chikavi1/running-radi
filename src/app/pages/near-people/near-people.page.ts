import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-near-people',
  templateUrl: './near-people.page.html',
  styleUrls: ['./near-people.page.scss'],
})
export class NearPeoplePage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  goToPage(page){
    this.navCtrl.navigateForward(page)
  }

  beforePage(){
    this.navCtrl.back();
  }

}
