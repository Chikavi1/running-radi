import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { DataService } from 'src/app/services/data.service';
declare var L: any;

declare var require: any;
const Hashids = require('hashids/cjs');
const hashids = new Hashids('Elradipet10Lt', 6,'ABCEIU1234567890');
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-run-show',
  templateUrl: './run-show.page.html',
  styleUrls: ['./run-show.page.scss'],
})
export class RunShowPage implements OnInit {

  premium = true;
  measure = 'mi';

    getSafeUrl(filePreviewUrl){
      return this.sanitization.bypassSecurityTrustStyle('url(\'' + filePreviewUrl + '\')');
    }

    image  = "https://radi-images.s3.us-west-1.amazonaws.com/764fddb820c660fe";;
    activity:any=[];
    pets:any = [];


    slide = {
      slidesPerView:  1.1,
      spaceBetween:1,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }
    }
    myFor;
  constructor(
    private sanitization: DomSanitizer,
    private navCtrl:NavController,
    private api: DataService,
    private route: ActivatedRoute
    ){
     this.route.params.subscribe((params: Params) => {
      this.api.getActivity(params['id']).subscribe((data:any) => {
        this.myFor = JSON.parse(data.activity[0].json_points)
        this.activity = data.activity[0];
        this.pets = data.pets;
      })
   });
   }

  ngOnInit() {
  }

  beforePage(){
    this.navCtrl.back();
  }


  goToPage(page){
    this.navCtrl.navigateForward(page)
  }

  ionViewDidEnter(){
    setTimeout(() => {
    this.initMap();
  },1000)
  }

  polyline;
  mapa;


  lat;
  lng;

  initMap(){
    let array = []
    console.log(this.myFor);
    this.myFor.forEach(element => {
      array.push([element.x,element.y]);
    });

   this.lat = this.myFor[0].x
   this.lng =  this.myFor[0].y



      this.mapa = Leaflet.map('mapa-run',{ zoomControl: false}).setView([this.myFor[0].x, this.myFor[0].y], 11);
        this.mapa.flyTo([this.lat, this.lng], 14, {
          animate: true,
          duration: 1.5
    });

    var startIcon = L.icon(
      {
        iconUrl:  '../../../assets/start.png',
        iconSize:     [31, 31], // size of the icon
      });

      var finishIcon = L.icon(
        {
          iconUrl:  '../../../assets/finish.png',
          iconSize:     [31, 31], // size of the icon
        });


      let pointsForJson = array;

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

      setTimeout(() => {
        this.polyline = L.polyline(this.lngLatArrayToLatLng(pointsForJson),{color: '#3b1493',weight: 8}).addTo(this.mapa);
        Leaflet.marker([this.myFor[0].x,this.myFor[0].y],{icon: startIcon}).addTo(this.mapa).bindPopup('Start');
        Leaflet.marker([this.myFor[this.myFor.length - 1].x,this.myFor[this.myFor.length - 1].y],{icon: finishIcon}).addTo(this.mapa).bindPopup('Finish');
      },1700)


  }


  lngLatArrayToLatLng(lngLatArray) {
    return lngLatArray.map(this.lngLatToLatLng);
  }

  lngLatToLatLng(lngLat) {
    return [lngLat[0], lngLat[1]];
  }

  goToPets(id){
    this.navCtrl.navigateForward('pet/'+hashids.encode(id));
   }
}
