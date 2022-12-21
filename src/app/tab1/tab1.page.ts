import { Component } from '@angular/core';
import {registerPlugin} from "@capacitor/core";
import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

import { Geolocation } from '@capacitor/geolocation';

import * as Leaflet from 'leaflet';
import { ModalController } from '@ionic/angular';
import { PlacePage } from '../pages/place/place.page';
declare var L: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private modalController:ModalController){
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

  getInfo(){
    this.isPets = !this.isPets;
  }

  openModal(){
    this.presentModal(PlacePage);
  }

  async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      breakpoints: [0.0,0.6, 0.90],
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

  storeCoordinate(xVal, yVal, array) {

    let ultimadistancia = parseFloat(this.getDistanceFromLatLonInKm(this.lat,this.lng,this.oldlat,this.oldlng));
    this.distance += ultimadistancia;

    array.push({x: xVal, y: yVal});
    this.addCoordenates(xVal,yVal);

  }

  addCoordenates(lat,lng){
    let coodinates = [lat, lng];
    // console.log(coodinates);
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

date1;

start(){
    this.isStart = true;

    this.date1 = new Date();
    this.interval = window.setInterval(() => {
      var fecha2 = new Date()
      var difference = this.date1.getTime() - fecha2.getTime();
      // console.log((this.float2int(difference/1000)*-1));
      this.seconds = (this.float2int(difference/1000)*-1);
      this.time = this.getTimeFormatted();
    }, 1000);



  BackgroundGeolocation.addWatcher({
        backgroundMessage: "Cancel to prevent battery drain.",

        backgroundTitle: "Tracking You.",

        requestPermissions: true,

        stale: false,

        distanceFilter: 10
    },(data)=>{

      // this.addCoordenates(data?.latitude,data?.longitude);
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


delete(){
  BackgroundGeolocation.removeWatcher({id:this.id});
  window.clearInterval(this.interval); // Clear the interval
  this.seconds = 0; // Sets seconds to zero
  this.isStart = false;
}

ionViewDidEnter(){
  this.initMap();
}

initMap(){

  this.lat = 20.6109151;
  this.lng = -103.3009833
  Geolocation.watchPosition({},(position,err) => {
    if(position){


  this.mapa = Leaflet.map('mapa-running',{ zoomControl: false}).setView([this.lat, this.lng], 10);

  this.mapa.flyTo([this.lat, this.lng], 14, {
    animate: true,
    duration: 1.5
});

      var homeICon = L.icon(
        {
          iconUrl:  'https://i.ibb.co/d59mYxn/wanted.png',
          shadowUrl: 'https://i.ibb.co/d59mYxn/wanted.png',
          iconSize:     [25, 41], // size of the icon
          shadowSize:   [41, 41] // size of the shadow
        });

        var pointsForJson = [
          [this.lat, this.lng],
        ];

        var userIcon = L.icon(
          {
            iconUrl:  'https://i.ibb.co/Z6f29T3/placeholder.png',
            shadowUrl: 'https://i.ibb.co/Z6f29T3/placeholder.png',
            iconSize:     [25, 41], // size of the icon
            shadowSize:   [41, 41] // size of the shadow
          });

    Leaflet.marker([this.lat,this.lng],{draggable: true,icon: userIcon}).on('dragend', e => this.procesar(e) ).addTo(this.mapa).bindPopup('Tu Ubicación');

    Leaflet.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga', {
          zoom: 8,
          zoomControl: false,
          maxZoom: 18,
          minZoom: 4,
          minResolution: 4891.96981025128,
          maxResolution: 39135.75848201024,
          doubleClickZoom: true,
          center: [this.lat, this.lng]
          }).addTo(this.mapa);

    this.polyline = L.polyline(this.lngLatArrayToLatLng(pointsForJson),{color: 'red',
    weight: 8}).addTo(this.mapa);


    // this.startTracking();
  }
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


}
