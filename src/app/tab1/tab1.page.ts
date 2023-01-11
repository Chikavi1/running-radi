import { Component } from '@angular/core';
import {registerPlugin} from "@capacitor/core";
import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

import { Geolocation } from '@capacitor/geolocation';

import * as Leaflet from 'leaflet';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { PlacePage } from '../pages/place/place.page';
import { StartPage } from '../pages/start/start.page';
import { FinishPage } from '../pages/finish/finish.page';


import { Network } from '@capacitor/network';
import { LocalNotifications } from '@capacitor/local-notifications';
import { DataService } from '../services/data.service';
import { PendingActivitiesPage } from '../pages/pending-activities/pending-activities.page';
declare var L: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private modalController:ModalController,
    private alertController:AlertController,
    private api: DataService,
    private toastController:ToastController){

      if(localStorage.getItem('date_start')){
        this.presentAlertWithout();
      }


    if(localStorage.getItem('customer_id')){
        if(!localStorage.getItem('pe')){
          this.api.getSubscriptions({'id':localStorage.getItem('customer_id')}).subscribe( data => {
            if(data.data){

              if(data.data[0].status == 'active'){ // se guarda la fecha del premium
                localStorage.setItem('pe',''+new Date(data.data[0].current_period_end*1000));
              }else{
                localStorage.setItem('pe','a');
              }
            }else{

            }
          });
        }
    }

    this.items = this.pets;
    this.slide = {
        slidesPerView: 1.1
      }
    }



  lat:any;
  lng:any;
  private interval: any;
  private seconds: number = 0;
  public time: string = '00:00';
  public showSeconds: boolean = true;

  polyline;
  mapa;


  date1;
  marker;
  pet_selected:any = [];

  last_location:any;
  id:any;

  trazo:any = [];

  impresion;

  coords=[];

  oldlat;
  oldlng;

  distance = 0;

  slide;

  isStart:boolean = false;

  isPets:boolean = true;


  places:any = [
    {
      "image": "https://i.ibb.co/6rKNjzg/coffee.jpg",
      "title": "Coffe and Pets",
      "subtitle":"subtitle",
      "latitude": "20.614203",
      "longitude": "-103.316067"
    },
    {
      "image": "https://i.ibb.co/F70nS9B/Whats-App-Image-2022-12-01-at-11-49-28-AM.jpg",
      "title": "Petunia",
      "subtitle":"subtitle",
      "latitude": "20.615820",
      "longitude": "-103.304319"
    },
    {
      "image": "https://i.ibb.co/B3fT3KP/image.png",
      "title": "Urbana Gourmet",
      "subtitle":"subtitle",
      "latitude": "20.638449",
      "longitude": "-103.311984"
    },
    {
      "image": "https://i.ibb.co/fNQDTY5/image.png",
      "title": "Bendigo Cage",
      "subtitle":"subtitle",
      "latitude": "20.643959",
      "longitude": " -103.318934"
    }
  ];
  items:any;

  pets:any = [
    {
      "image": "https://i.ibb.co/44dMw7K/083bb445cf89.png",
      "title": "pelusa",
      "subtitle":"20/12/2022",
      "latitude": "20.620491",
      "longitude": "-103.315560"
    },
    {
      "image": "https://i.ibb.co/zFfYCLs/e35946d2b404.png",
      "title": "Corki",
      "subtitle":"18/12/2022",
      "latitude": "20.614200",
      "longitude": "-103.316471"
    },
    {
      "image": "https://i.ibb.co/Twpwrqd/734347785ffa.png",
      "title": "pulguitas",
      "subtitle":"17/12/2022",
      "latitude": "20.625732",
      "longitude": "-103.310321"
    },
    {
      "image": "https://i.ibb.co/zSM7JRJ/09615e6fd7dc.png",
      "title": "Fok",
      "subtitle":"14/12/2022",
      "latitude": "20.626997",
      "longitude": "-103.307285"
    }
  ]




  getInfo(){
    this.isPets = !this.isPets;
    if(this.isPets){
      this.items = this.pets;
    }else{
      this.items = this.places;

    }
  }

  openModal(){
    this.presentModalShow(PlacePage);
  }

  openPendingActivities(){
    this.presentActivitiesPending(PendingActivitiesPage);
  }

    async presentModalComplete(component) {
      console.log(this.pet_selected);
      const modal = await this.modalController.create({
        component: component,
        componentProps: {
          distance: this.distance,
          time: this.time,
          seconds:this.seconds,
          pet_selected: this.pet_selected,
          lat_start: this.lat_start,
          lng_start:this.lng_start,
          json_points: this.coords
        },
        breakpoints: [0.0,1],
        initialBreakpoint: 1,
        backdropDismiss:true,
        swipeToClose​:true,
        cssClass: 'small-modal'
      });

      modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.coords = [];
        this.distance = 0;
        this.time = '';

        this.removeData();
      }

      });
      return await modal.present();
    }

    async presentModalShow(component) {
      const modal = await this.modalController.create({
        component: component,
        componentProps:{
          id: 1
        },
        breakpoints: [0.0,0.6, 1],
        initialBreakpoint: 0.6,
        backdropDismiss:true,
        swipeToClose​:true,
        cssClass: 'small-modal'
      });

      modal.onDidDismiss().then((data) => {
      if(data['data']){

      }

      });
      return await modal.present();
    }

    async presentActivitiesPending(component) {
      const modal = await this.modalController.create({
        component: component,
        breakpoints: [0.0,0.7, 0.90],
        initialBreakpoint: 0.7,
        backdropDismiss:true,
        swipeToClose​:true,
        cssClass: 'small-modal'
      });

      modal.onDidDismiss().then((data) => {
        this.activities = JSON.parse(localStorage.getItem('activities'));
      });
      return await modal.present();
    }

    async presentModalStart(component) {
      const modal = await this.modalController.create({
        component: component,
        breakpoints: [0.0,0.7, 0.90],
        initialBreakpoint: 0.7,
        backdropDismiss:true,
        swipeToClose​:true,
        cssClass: 'small-modal'
      });

      modal.onDidDismiss().then((data) => {
      if(data['data']){
        this.pet_selected = data['data']
        localStorage.setItem('pet_selected',JSON.stringify(this.pet_selected));
        // hacer if si tiene premium validar
        this.runGeolocation();
      }
      });
      return await modal.present();
    }

    storeCoordinate(xVal, yVal, array) {

      let ultimadistancia = parseFloat(this.getDistanceFromLatLonInKm(this.lat,this.lng,this.oldlat,this.oldlng));
      this.distance += ultimadistancia;

      array.push({x: xVal, y: yVal});
      this.addCoordenates(xVal,yVal);

    }

    offline;
    activities;
    ionViewWillEnter(){


      this.activities = JSON.parse(localStorage.getItem('activities'));


      Network.addListener('networkStatusChange', status => {
        this.offline = !status.connected;

        if(this.offline){
          this.presentToast();
        }

      });

    }

    addCoordenates(lat,lng){
      let coodinates = [lat, lng];
      // this.pLineGroup.addLayer(L.polyline(coodinates, {color: 'red'}))
      this.polyline.addLatLng(coodinates);
    }

    lngLatArrayToLatLng(lngLatArray) {
      // console.log(lngLatArray);
      return lngLatArray.map(this.lngLatToLatLng);
    }

    lngLatToLatLng(lngLat) {
      return [lngLat[0], lngLat[1]];
    }

    createCoords(){
    this.storeCoordinate(this.lat, this.lng, this.coords);
    }

    float2int (value) {
      return value | 0;
  }

  removeLines(){
    this.mapa.eachLayer((layer) => {
      if (  layer === this.polyline) {
          this.mapa.removeLayer(layer);
      }
    })
  }

start(){

  this.presentModalStart(StartPage);

}

verenMapa(lat,lng){
  if(this.isPets){
    var homeICon = L.icon(
      {
        iconUrl:  'https://i.ibb.co/d59mYxn/wanted.png',
        iconSize:     [31, 31], // size of the icon
      });
  }else{
    var homeICon = L.icon(
      {
        iconUrl:  'https://i.ibb.co/X2gkTYX/shops.png',
        iconSize:     [31, 31], // size of the icon
      });
  }



  if(this.marker){
    this.mapa.removeLayer(this.marker);
  }
  this.marker =  Leaflet.marker([lat,lng],{icon: homeICon}).addTo(this.mapa).bindPopup('Tu Ubicación');


//  this.marker = Leaflet.marker([lat,lng,{draggable: true,icon: homeICon}]).addTo(this.mapa).bindPopup('Business ');
  this.mapa.flyTo([lat, lng], 16, {
    animate: true,
    duration: 1.5
});
}

async noti(sec){

  let min = (sec/60);

  await LocalNotifications.schedule({
    notifications: [
      {
        id: 1,
        title: 'Llevas '+min+' minutos',
        body: 'Paseo de hoy',
        extra: {
          data: 'pass'
        },
        iconColor: "#17202F"
      }
    ]
  });
}

lat_start;
lng_start;


runGeolocation(){
  this.isStart = true;

  Geolocation.getCurrentPosition().then((resp) => {
    this.lat_start = resp.coords.latitude;
    this.lng_start =  resp.coords.longitude;

     var pointsForJson = [
          [this.lat_start, this.lng_start],
        ];

    this.polyline = L.polyline(this.lngLatArrayToLatLng(pointsForJson),{color: '#3b1493',weight: 8})
      .addTo(this.mapa);
    });


    this.date1 = new Date();

    localStorage.setItem('date_start',this.date1);

    this.interval = window.setInterval(() => {
      var fecha2 = new Date()
      var difference = this.date1.getTime() - fecha2.getTime();
      this.seconds = (this.float2int(difference/1000)*-1);
      this.time = this.getTimeFormatted();

      localStorage.setItem('seconds',''+this.seconds);
      localStorage.setItem('kilometers',''+this.distance);


      if(this.seconds % 300 == 0){
        this.noti(this.seconds);
      }
    }, 1000);



  BackgroundGeolocation.addWatcher({
        backgroundMessage: "Cancelalo cuando puedas para no drenar tu bateria.",
        backgroundTitle: "Estas paseando con tu mascota.",
        requestPermissions: true,
        stale:false,
        distanceFilter: 15
    },(data)=>{

      this.oldlat = this.lat;
      this.oldlng = this.lng;
      this.lat = data?.latitude;
      this.lng = data?.longitude;

      this.storeCoordinate(data?.latitude, data?.longitude, this.coords);


  }).then((watcher_id) => {
       this.id = watcher_id
    });
}


deg2rad(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}

getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d.toFixed(2);
}

async presentAlert() {
  const alert = await this.alertController.create({
    header: '¿estas seguro?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
        },
      },
      {
        text: 'Si,Terminar',
        role: 'confirm',
        handler: () => {

          this.terminate();

        },
      },
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
}

terminate(){
  BackgroundGeolocation.removeWatcher({id:this.id});
  window.clearInterval(this.interval); // Clear the interval
  this.seconds = 0; // Sets seconds to zero
  this.isStart = false;
  this.removeLines();
  this.presentModalComplete(FinishPage);
}

ionViewDidEnter(){
  this.initMap();
}

ionViewWillLeave(){
  if(this.isStart){
    console.log('seconds',this.seconds);
  }
}


initMap(){

  Geolocation.getCurrentPosition().then((resp) => {
    this.lat = resp.coords.latitude;
    this.lng = resp.coords.longitude;
    this.mapa = Leaflet.map('mapa-running',{ zoomControl: false}).setView([this.lat, this.lng], 10);

      this.mapa.flyTo([this.lat, this.lng], 14, {
        animate: true,
        duration: 1.5
        });

      var homeICon = L.icon(
        {
          iconUrl:  'https://i.ibb.co/d59mYxn/wanted.png',
          iconSize:     [31, 31], // size of the icon
        });



        var userIcon = L.icon(
          {
            iconUrl:  'https://i.ibb.co/Z6f29T3/placeholder.png',
            iconSize:     [31, 31], // size of the icon
          });

    // Leaflet.marker([this.lat,this.lng],{draggable: true,icon: userIcon}).on('dragend', e => this.procesar(e) ).addTo(this.mapa).bindPopup('Tu Ubicación');
// https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}
// https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga
// https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png

let tile;
  if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    // light mode
    tile = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  }else{
    // dark mode
    tile = 'https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga';
  }

Leaflet.tileLayer(tile, {
          zoom: 8,
          zoomControl: false,
          maxZoom: 18,
          minZoom: 4,
          minResolution: 4891.96981025128,
          maxResolution: 39135.75848201024,
          doubleClickZoom: true,
          center: [this.lat, this.lng]
          }).addTo(this.mapa);




  }).catch((error) => {
    console.log('Error getting location', error);
  });



}

procesar(e){

  this.oldlat = this.lat;
  this.oldlng = this.lng;

  this.lat = e.target._latlng.lat;
  this.lng = e.target._latlng.lng;

}


getTimeFormatted() {
  var hours   = Math.floor(this.seconds / 3600);
  var minutes = Math.floor((this.seconds - (hours * 3600)) / 60);
  var seconds = this.seconds - (hours * 3600) - (minutes * 60);

  var hours_st = hours.toString();
  var minutes_st = minutes.toString();
  var seconds_st = seconds.toString();
  if (hours   < 10) {
    hours_st   = "0" + hours.toString();
  }
  if (minutes < 10) {
    minutes_st = "0" + minutes.toString();
  }
  if (seconds < 10) {
    seconds_st = "0" + seconds.toString();
  }

  var formatted_time = '';
  if (hours > 0) {
    formatted_time += hours_st + ':';
  }
  formatted_time += minutes_st;
  if (this.showSeconds) {
    formatted_time += ':' + seconds_st;
  }
  return formatted_time;
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'No hay internet, el mapa puede fallar',
    duration: 1500,
    position: 'bottom'
  });

  await toast.present();
}


removeData(){

  localStorage.removeItem('date_start');
  localStorage.removeItem('kilometers');
  localStorage.removeItem('seconds');
  localStorage.removeItem('pet_selected');

}


async presentAlertWithout() {
  this.seconds = parseInt(localStorage.getItem('seconds'));
  this.time = this.getTimeFormatted();

  const alert = await this.alertController.create({
    header: 'Tienes una paseada sin terminar de '+this.time +' min, ¿deseas guardarla?',
    buttons: [
      {
        text: 'Empezar de nuevo',
        role: 'cancel',
        handler: () => {
          this.removeData();
        },
      },
      {
        text: 'Terminar y guardar',
        role: 'confirm',
        handler: () => {

          this.distance = parseFloat(localStorage.getItem('kilometers'));
          this.seconds  = parseInt(localStorage.getItem('seconds'));
          this.pet_selected = JSON.parse(localStorage.getItem('pet_selected'));
          this.time = this.getTimeFormatted();
          console.log(this.distance,this.time,this.pet_selected);
          this.terminate();
        },
      },
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
}


}
