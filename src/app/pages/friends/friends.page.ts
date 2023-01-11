import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  beforePage(){
    this.navCtrl.back();
  }


}
