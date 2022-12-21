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
  }

  lat:any;
  lng:any;

  last_location:any;
  id:any;

  start(){

  BackgroundGeolocation.addWatcher({
        backgroundMessage: "Cancel to prevent battery drain.",

        backgroundTitle: "Tracking You.",

        requestPermissions: true,

        stale: false,

        distanceFilter: 1
    },(data)=>{
      this.lat = data?.latitude;
      this.lng = data?.longitude;

    }).then((watcher_id) => {
      // alert(watcher_id);
    // BackgroundGeolocation.removeWatcher({
    //     id: watcher_id
    // });

});

}

guess_location(){
  BackgroundGeolocation.addWatcher(
      {
          requestPermissions: false,
          stale: true
      },
      function (location) {
        alert(JSON.stringify(location));
      }).then(function (id) {
        this.id = id
      });
}

delete(){
  BackgroundGeolocation.removeWatcher({id:this.id});
  alert('se ha eliminado');
}

}
