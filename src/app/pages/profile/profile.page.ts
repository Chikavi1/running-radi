import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AcknowledgePage } from '../acknowledge/acknowledge.page';
import { PhotoRoundedModalPage } from '../photo-rounded-modal/photo-rounded-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  datos:any = [];
  name           = '';
  birthday       = '';
  gender;
  address        = '';
  photo           = '';
  cellphone      = '';
  identification = '';
  description = '';
  subscription;

  yearLimitIonDateTime;
  btnValidate = false;

  edit = false;

   updatesuccess;
   updateerror;
   validatemessage;
   cancel;
   expira;

  constructor(
    private api: DataService,
    private navCtrl:NavController,
    private modalController:ModalController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private alertController:AlertController) {
      // borrar

    // this.api.getSubscriptions({'subscribe':1}).subscribe( data => {
    //   console.log(data);
    //   this.datos = data.data[0];
    //   this.expira = new Date(this.datos.current_period_end);
    //   console.log(this.datos);
    // });





   }
device = 'phone';


ionViewDidEnter(){
  this.getUser();
 }

 changePhoto(){
  if(this.edit){
    this.editPhoto();
   }
 }


getUser(){
  this.api.getUser(localStorage.getItem('user_id')).subscribe( data => {
    this.datos = data[0];
    console.log(this.datos);
    this.name           = data[0].name;
     this.photo         = data[0].photo;
     this.description   = data[0].description;
     this.subscription  = data[0].subscription;
    //  this.birthday       = moment(data[0].birthday).format('DD/MM/yyyy');
    this.address        = data[0].address;
    this.cellphone      = data[0].cellphone;
    this.identification = data[0].identification;
    this.gender         = data[0].gender?data[0].gender.toString():null;
   });
}

editProfile(){
  this.edit = !this.edit;
}


async editPhoto(){
  let options = [];
    options = [

    {
      text: 'Tomar Foto',
      icon: 'camera',
      handler: () => {
        this.getPicture('camera');
      }
    },
    {
        text: 'Subir foto',
        icon: 'image',
        handler: () => {
          this.getPicture('photos');
        }

    },
    {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
      }
    }
  ];

  const actionSheet = await this.actionSheetController.create({
    header: 'Selecciona una opción.',
    mode: 'md',
    buttons: options
  });
  await actionSheet.present();

  const { role } = await actionSheet.onDidDismiss();

  // this.presentModalSmall(SelectBinaryPage);
}

async getPicture(src){

  let source = src=='camera'?CameraSource.Camera:CameraSource.Photos;

  const image = await Camera.getPhoto({
    quality: 100,
    saveToGallery:true,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    source: source,
    promptLabelHeader:'Foto',
    promptLabelCancel:'Cancelar',
    promptLabelPhoto: 'Galeria',
    promptLabelPicture: 'Tomar Foto'
  });
    this.modalImage(image.base64String);
}

uploadPhoto = '';
async modalImage(image){
  const modal = await this.modalController.create({
    component: PhotoRoundedModalPage,
    componentProps:{
      imageSend: image,
    }
  });
  modal.onDidDismiss().then((data) => {
    if(data['data']){
      const image = data['data'];
      this.uploadPhoto = image;
      this.photo = `data:image/jpeg;base64,`+image;
      this.uploadImage(this.uploadPhoto);
    }
  });
  return await modal.present();
}

uploadImage(image){
  let data = {
    id: localStorage.getItem('user_id'),
    photo: image
  }
  this.api.uploadImageUser(data).subscribe((data:any) => {
    if(data.status == 200){
      localStorage.setItem('photo',this.photo);
      this.presentToast('Se ha actualizado exitosamente.','success');
    }

  });
}



   async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿estas seguro de que quieres eliminar la subscripción?',
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

            this.api.cancelSubscription({id:this.datos.id}).subscribe(data =>{
              this.datos = data;
            })

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  ngOnInit() {
  }

  beforePage(){
    this.navCtrl.back();
  }

  presentAcknowledge(){
    this.presentModal(AcknowledgePage);
  }

  async presentModal(component,data?) {
    const modal = await this.modalController.create({
      component: component,
      componentProps:{
        id:data
      },
      breakpoints: [0.5,1.0],
      initialBreakpoint: 0.5,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then(() => {

    });
    return await modal.present();
  }

  goToPage(page){
    this.navCtrl.navigateForward(page);
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Eliminar'+"<br> <b>delete</b>",
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'delete'
        }
      ],
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (e) => {
            if(e.code.toLowerCase() === 'delete'){
              this.api.deleteUser({id:localStorage.getItem('user_id')}).subscribe(data => {
                if(data.status == 200){
                  this.presentToast('eliminar','success');
                  localStorage.removeItem('user_id');
                  this.navCtrl.back();
                  this.navCtrl.navigateForward('/tabs/tab1');
                }
              })
            }else{
              this.presentToast('se ha eliminado','warning');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9. ,]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  actualizar(){
    let datos = {
      id: localStorage.getItem('user_id'),
      name:this.name,
      description: this.description,
     //  birthday:this.birthday,
      photo: this.photo,
      gender:this.gender,
      address:this.address,
      cellphone:this.cellphone
    }

    this.api.updateUser(datos).subscribe(data => {
        this.presentToast(this.updatesuccess,'success');
    },err =>{
      this.presentToast(this.updateerror,'danger')
    });
    this.beforePage();
  }

}
