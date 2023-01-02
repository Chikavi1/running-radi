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

    getSafeUrl(filePreviewUrl){
      return this.sanitization.bypassSecurityTrustStyle('url(\'' + filePreviewUrl + '\')');
    }

    image  = "https://radi-images.s3.us-west-1.amazonaws.com/764fddb820c660fe";;

    activity:any=[];

  constructor(
    private sanitization: DomSanitizer,
    private navCtrl:NavController,
    private api: DataService,
    private route: ActivatedRoute
    ) {

     this.route.params.subscribe((params: Params) => {
      this.api.getActivity(params['id']).subscribe(data => {
        console.log(data);
        this.activity = data[0];
      })
   });





   }

  lat = 20.620616;
  lng = -103.305521;

  ngOnInit() {
  }

  beforePage(){
    this.navCtrl.back();
  }


  goToPage(page){
    this.navCtrl.navigateForward(page)
  }

  ionViewDidEnter(){
    this.initMap();
  }

  polyline;
  mapa;

  initMap(){

      this.mapa = Leaflet.map('mapa-run',{ zoomControl: false}).setView([this.lat, this.lng], 10);

        this.mapa.flyTo([this.lat, this.lng], 16, {
          animate: true,
          duration: 1.5
    });


      let array = []
      let myfor = JSON.parse(this.activity.json_points)

      myfor.forEach(element => {
        array.push([element.x,element.y]);
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
