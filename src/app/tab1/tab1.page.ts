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

  BackgroundGeolocation.addWatcher(
    {

        backgroundMessage: "Cancel to prevent battery drain.",

        backgroundTitle: "Tracking You.",

        requestPermissions: true,

        stale: false,

        distanceFilter: 2
    },
    function callback(location, error) {
      alert(JSON.stringify(location));
        if (error) {
            if (error.code === "NOT_AUTHORIZED") {
                if (window.confirm(
                    "This app needs your location, " +
                    "but does not have permission.\n\n" +
                    "Open settings now?"
                )) {
                    BackgroundGeolocation.openSettings();
                }
            }
            return console.error(error);
        }
        return console.log(location);
    }
).then(function after_the_watcher_has_been_added(watcher_id) {

    BackgroundGeolocation.removeWatcher({
        id: watcher_id
    });
});

}



}
