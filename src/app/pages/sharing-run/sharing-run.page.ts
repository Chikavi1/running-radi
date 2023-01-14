import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-sharing-run',
  templateUrl: './sharing-run.page.html',
  styleUrls: ['./sharing-run.page.scss'],
})
export class SharingRunPage implements OnInit {

  constructor(private socialSharing:SocialSharing) { }

today;
bg;
distance;
time;

url;

measure;

  ngOnInit() {
    this.measure = localStorage.getItem('measure');

    this.today = moment().utc().format('MM/DD/Y');
    var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.crossOrigin = "anonymous";  // This enables CORS
    var today  = this.today;
    var distance =  this.getdistance(this.distance);
    var min = this.time;
    var measure = this.measure
imageObj.onload = function () {
  context.drawImage(imageObj,0,0,imageObj.width,imageObj.height,0,0,canvas.width,canvas.height);
    context.fillStyle = 'white';
    context.font = " 30px sans-serif";
    context.fillText("Radi", 20, 50);
    context.font = "bold 15px sans-serif";
    context.fillText(" Running", 20, 70);
    context.font = "15px Arial";
    context.fillText(today, 20, 275);
    context.font = "bold 26px Arial";
    context.fillText(distance+" "+measure+" "+min+" min", 20, 300);

};

imageObj.src = this.bg;

setTimeout(async function(){
  this.url = canvas.toDataURL("image/jpeg");
  this.image = await this.url;
  localStorage.setItem('image',this.image);
},100);
}

getdistance(distance){
  let result = 0;
  if(this.measure == 'mi'){
    result = (distance*0.6214);
  }else{
    result = distance;
  }
  return result.toFixed(2);
}

shareImage(){
  this.url = localStorage.getItem('image');
  this.socialSharing.shareViaWhatsApp('hoy corri '+this.distance+' '+this.measure,localStorage.getItem('image'),null)
  .then((success) =>{

   })
    .catch(()=>{
    });
}

}
