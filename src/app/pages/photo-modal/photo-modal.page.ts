import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.page.html',
  styleUrls: ['./photo-modal.page.scss'],
})
export class PhotoModalPage implements OnInit {
  @ViewChild(ImageCropperComponent,{ static: false }) angularCropper: ImageCropperComponent;
  imageSend;
  backimage;
  constructor(private modalCtrl:ModalController){
    this.imageSend = "data:image/jpeg;base64,/"+this.imageSend;

   }

  ngOnInit() {
    this.imageSend = "data:image/jpeg;base64,"+this.imageSend;
  }

  imageCropped(event: ImageCroppedEvent){
    this.backimage =  event.base64.split(',')[1];
  }

  exit(){
    this.modalCtrl.dismiss();
  }

  crop(){
    this.modalCtrl.dismiss(this.backimage);
  }




}
