import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Browser } from '@capacitor/browser';
import { Geolocation } from '@capacitor/geolocation';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-start-near',
  templateUrl: './start-near.page.html',
  styleUrls: ['./start-near.page.scss'],
})
export class StartNearPage implements OnInit {

  step = 1;

  facebook_url;
  instagram_url;
  whatsapp_number;

  activities = true;
  pets = true;
  rewards = true;
  social_media = false;

  name;
  description;
  city;
  birthday;
  cellphone = '52312321321';


  constructor(private api:DataService,private nativeGeocoder: NativeGeocoder
    ){
    // this.api.get
    this.whatsapp_number = this.cellphone;
    this.name = 'Luis Rojas';
    this.description;
    this.birthday;
    this.city;


    if(!this.city){
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };

      Geolocation.getCurrentPosition().then((resp) => {
        this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
        .then((result: NativeGeocoderResult[]) => {
          this.city = result[0].locality;
          this.city = result[0].locality;

        })
        .catch((error: any) => console.log(error));
      });
    }


   }

  ngOnInit() {
  }




  async openUrl(url){
    await Browser.open({ url });
   }


  back(){
    this.step -= 1;
  }

  next(){
    this.step += 1;
  }





  verified(type,link){
    if(type == 'fb'){
      this.openUrl('https://www.facebook.com/'+link)
    }else if(type == 'ig'){
      this.openUrl('https://www.instagram.com/'+link);
    }else if(type == 'wa'){
      this.openUrl('https://api.whatsapp.com/send?phone='+link);
    }

  }


  finish(){
    let social = {
      "instagram":this.instagram_url,
      "facebook": this.facebook_url,
      "whatsapp": this.whatsapp_number
    }
    let data = {
      "social_media": JSON.stringify(social),
      "description": this.description,
      "city": this.city,
      "birthday": this.birthday
    }
    console.log(data);
  }

}
