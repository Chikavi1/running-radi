import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Browser } from '@capacitor/browser';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
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
  description = '';
  city;
  birthday;

  constructor(private api:DataService,
    private modalCtrl:ModalController,
    private nativeGeocoder: NativeGeocoder){

    this.api.getUserByNearConfiguration({id:localStorage.getItem('user_id')}).subscribe(data => {
      console.log(data);
      this.whatsapp_number      = data[0].cellphone;
      this.name                 = data[0].name;
      this.description          = data[0].description;
      this.birthday             = data[0].birthday;
      this.city                 = data[0].city;

      let datos = JSON.parse(data[0].public_configuration);
      this.social_media    = datos.social_media;
      this.activities = datos.activities;
      this.pets       = datos.pets;
      this.rewards    = datos.rewards;
    });


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

  ngOnInit(){

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

    let privacy = {
      "social_media":this.social_media,
      "activities": this.activities,
      "pets": this.pets,
      "rewards": this.rewards,
    }

    let public_config = JSON.stringify(privacy);


    let data = {
      "id": localStorage.getItem('user_id'),
      "social_media": JSON.stringify(social),
      "description": this.description,
      "city": this.city,
      "public_configuration": public_config,
      "birthday": this.birthday,
      "visible":1
    }


    this.api.updateUser(data).subscribe(data => {
      if(data.status == 200){
        localStorage.setItem('near_success',''+true);
        localStorage.setItem('show_near',''+true);

        this.modalCtrl.dismiss(true);
      }
    })

  }

}
