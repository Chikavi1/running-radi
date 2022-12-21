import { Component } from '@angular/core';
import {registerPlugin} from "@capacitor/core";
import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(){
    this.start();
  }

  start(){

  BackgroundGeolocation.addWatcher({
        backgroundMessage: "Cancel to prevent battery drain.",

        backgroundTitle: "Tracking You.",

        requestPermissions: true,

        stale: false,

        distanceFilter: 1
    },(data)=>{
      alert(JSON.stringify(data));

    }).then((watcher_id) => {
      // alert(watcher_id);
    // BackgroundGeolocation.removeWatcher({
    //     id: watcher_id
    // });

});

}



}
