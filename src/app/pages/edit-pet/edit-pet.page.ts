import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.page.html',
  styleUrls: ['./edit-pet.page.scss'],
})
export class EditPetPage {


  segmentModel = "informacion";

  pet:any = [];
  imagen;
  photo;

  InCrop = false;
  croppedImage;
  base64;



  pet_id;
  name = '';
  description = '';
  tags;

  // translate
  toastupdateimage;
  toastupdatesuccess;
  translate(){
    this.translateService.get('toast.updateImage').subscribe(value => {
      this.toastupdateimage = value;
    })

    this.translateService.get('toast.updateSuccess').subscribe(value => {
      this.toastupdatesuccess = value;
    })
  }
  device;
  constructor(
    private navCtrl: NavController,
    private api: DataService,
    private toastController: ToastController,
    private modalCtrl:ModalController,
    private router: Router,
    private translateService: TranslateService,
    ){
      this.device = localStorage.getItem('device');
    this.pet_id = this.router.getCurrentNavigation().extras.state.id;
    this.translate();
    this.api.getPetInfo(this.pet_id).subscribe( data => {
      this.pet = data[0]
      this.name = this.pet.name;
      this.description  = this.pet.description;

    });
   }

  async getPicture(){
    const image = await Camera.getPhoto({
      quality: 40,
      saveToGallery:true,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      promptLabelHeader:'Foto',
      promptLabelCancel:'Cancelar',
      promptLabelPhoto: 'Galeria',
      promptLabelPicture: 'Tomar Foto'
    });
      this.modalImage(image.base64String);

  }

  async modalImage(image){
    const modal = await this.modalCtrl.create({
      component: PhotoModalPage,
      componentProps:{
        imageSend: image,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const imagen = data['data'];
        this.photo = `data:image/jpeg;base64,`+imagen;
        this.uploadImage(imagen);
      }
    });
    return await modal.present();
  }

  beforePage(){
    this.navCtrl.back();
  }



  segmentChanged(event){
  }

    uploadImage(img64){
      this.api.uploadPetsImageProfile({id:this.pet_id,photo:img64}).subscribe(data => {
        this.presentToast(this.toastupdateimage);
      },err=>{
      });
    }

    update(){
      this.api.updatePet({id:  this.pet_id ,name:this.name,description:this.description}).subscribe(data => {
        if(data.status === 200){
          this.presentToast(this.toastupdatesuccess);
          this.beforePage();
        }
      });
    }

    async presentToast(message) {
      const toast = await this.toastController.create({
        message,
        color:'success',
        duration: 2000
      });
      toast.present();
    }
}
