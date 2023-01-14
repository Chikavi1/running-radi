import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
friends:any = [];
request:any = []
segmentModel='request'

  constructor(private navCtrl:NavController,private api:DataService) {
    this.api.getFriends({user_id:'5'}).subscribe((data:any) => {
      console.log(data);

      data.forEach(element => {
        if(element.friend_status == 2){
          this.friends = this.friends.concat(element);
          return;
        }
        if(element.friend_status == 1){
          this.request =this.request.concat(element);
        }
      });
    });
   }

  ngOnInit() {
  }

  beforePage(){
    this.navCtrl.back();
  }

  accept(item,i){
    this.request.splice(i,1);
    this.friends = this.friends.concat(item);

  }




  seeProfile(id){
    this.navCtrl.navigateForward('/user/'+id);
  }

  segmentChanged($event){
    this.segmentModel = $event.detail.value;
    console.log($event.detail.value);
  }

}
