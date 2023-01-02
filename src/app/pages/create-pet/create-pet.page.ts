import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { BreedsPage } from '../breeds/breeds.page';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.page.html',
  styleUrls: ['./create-pet.page.scss'],
})
export class CreatePetPage  {
  valor = 0;
  step  = 0;
  title = ''
  weight = 0.0;
  // helper
  location;
  newLocation;

  today;
  yearLimitIonDateTime;


  breedImage = '';
  breedName  = '';
  breddId   =  0;

  colornecklace;
  user_id;
  necklaceSrc;

  uploadPhoto;

  name        = '';
  description = '';
  pais;
  age         = 0;
  birthday    = '';
  color       = 0;
  gender      = '';
  specie      = '';
  size        = '';
  breed       = '';
  code        ;
  latitude    = '';
  longitude   = '';

  esterilized;
  sterelized_date;

  croppedImage  =  null;
  dateFormat;

  selectedItemsList = [];
  checkedIDs = [];

  senddata = false;

  checkboxesDataList = [
    {
      id: 'ID0001',
      label: 'Travieso',
      isChecked: false
    },
    {
      id: 'ID0002',
      label: 'Jugueton',
      isChecked: false
    },
    {
      id: 'ID0003',
      label: 'Obediente',
      isChecked: false
    },
    {
      id: 'ID0004',
      label: 'Alegre',
      isChecked: false
    },
    {
      id: 'ID0005',
      label: 'Convive con niños',
      isChecked: false
    },
    {
      id: 'ID0006',
      label: 'Convive con otras mascotas',
      isChecked: false
    },
    {
      id: 'ID0007',
      label: 'Sensible',
      isChecked: false
    },
    {
      id: 'ID0008',
      label: 'Curioso',
      isChecked: false
    },
    {
      id: 'ID0009',
      label: 'Manso',
      isChecked: false
    },
    {
      id: 'ID0010',
      label: 'Cariñoso',
      isChecked: false
    },
    {
      id: 'ID0011',
      label: 'Dócil',
      isChecked: false
    },
    {
      id: 'ID0012',
      label: 'Activo',
      isChecked: false
    },
    {
      id: 'ID0013',
      label: 'Pacífico',
      isChecked: false
    },
    {
      id: 'ID0014',
      label: 'Mordedor',
      isChecked: false
    },
    {
      id: 'ID0015',
      label: 'Inquieto',
      isChecked: false
    },
    {
      id: 'ID0016',
      label: 'Fiel',
      isChecked: false
    },
    {
      id: 'ID0017',
      label: 'Ladrador',
      isChecked: false
    },
    {
      id: 'ID0018',
      label: 'Tranquilo',
      isChecked: false
    },

  ]

  photo;

  successtoast;
  errortoast;
  process;


  translate(){
    this.translateService.get('toast.create').subscribe(value => {
      this.successtoast = value;
    })

    this.translateService.get('toast.again').subscribe(value => {
      this.errortoast = value;
    })

    this.translateService.get('checkout.process').subscribe(value => {
      this.process = value;
    });

  }


  slide = {
    slidesPerView:  1.3,
    spaceBetween:5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  async getPicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      saveToGallery:true,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      promptLabelHeader:'Foto',
      promptLabelCancel:'Cancelar',
      promptLabelPhoto: 'Galeria',
      promptLabelPicture: 'Tomar Foto'
    });
    console.log('lll')
    console.log(image.base64String);
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
        const image = data['data'];
        this.uploadPhoto = image;
        this.photo = `data:image/jpeg;base64,`+image;
      }
    });
    return await modal.present();
  }

  async modalBreed(){
    const modal = await this.modalCtrl.create({
      component: BreedsPage,
      componentProps:{
        breed: this.specie,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data['data']){
        const info = data['data'];
        this.breedImage = info.image;
        this.breedName  = info.name;
        this.breddId    = info.id;
        this.breed = info.id;
      }
    });
    return await modal.present();
  }


  birthdayChange(){
    var years = moment().diff(moment(this.birthday).format('yyyy-MM-DD'), 'years');
    this.age = years;
    this.dateFormat='years';
    if(years === 0){
      var months = moment().diff(moment(this.birthday).format('yyyy-MM-DD'), 'months');
      this.age = months;
      this.dateFormat='months';
      if(months === 0){
        var days = moment().diff(moment(this.birthday).format('yyyy-MM-DD'), 'days');
        this.age = days;
        this.dateFormat='days';
      }
    }
  }
  device;
    constructor(
      public actionSheetController: ActionSheetController,
      public api: DataService,
      private navCtrl: NavController,
      private modalCtrl:ModalController,
      private translateService: TranslateService,
      private toastController: ToastController,
      private loadingController: LoadingController
      )
      {
        this.device = localStorage.getItem('device');

        this.translate()
        this.user_id = localStorage.getItem('user_id');
        this.today =  moment().format('yyyy-MM-DD');
        this.yearLimitIonDateTime = moment().subtract(20,'years').format('yyyy-MM-DD');


      }

      setGender(sex){
        this.gender = sex;
      }

      setSpecie(specie){
        this.specie = specie;
        this.weight = 0;
        this.size = '';

        this.breedImage = '';
        this.breedName  = '';
        this.breddId   =  0;
      }

      setLocation(location){
        this.location = location;
        this.latitude = '';
        this.longitude = '';

        if(location === 0){
          this.latitude  = localStorage.getItem('latitude');
          this.longitude = localStorage.getItem('longitude');
        }
      }


      setWeight(weight){
        this.weight = weight;
      }

      setcolorn(color) {
        this.colornecklace = color;
        switch (color) {
          case 1: this.necklaceSrc = "../../../assets/necklace-red.png";
            break;
          case 2: this.necklaceSrc = "../../../assets/necklace-yellow.png";
            break;
          case 3: this.necklaceSrc = "../../../assets/necklace-green.png";
            break;
          case 4: this.necklaceSrc = "../../../assets/necklace-orange.png";
            break;
          case 5: this.necklaceSrc = "../../../assets/necklace-purple.png";
            break;
          case 6: this.necklaceSrc = "../../../assets/necklace-blue.png";
            break;
          case 7: this.necklaceSrc = "../../../assets/necklace-white.png"
            break;
        }
      }


      saveTodos() {

        let defaultImage = 'iVBORw0KGgoAAAANSUhEUgAABDgAAALQCAYAAAB118BaAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAABGtpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICA8QXR0cmliOkFkcz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMS0xMi0xNTwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgPEF0dHJpYjpFeHRJZD44ZjhhMWFkMC02MjdkLTQwYTUtOWUwZC0xNWNkYThlYTg1MGQ8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QWRkIGEgaGVhZGluZzwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICA8cGRmOkF1dGhvcj5MdWlzIFJvamFzPC9wZGY6QXV0aG9yPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogIDx4bXA6Q3JlYXRvclRvb2w+Q2FudmE8L3htcDpDcmVhdG9yVG9vbD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSdyJz8+YPKv+wAAIABJREFUeJzs3XmUXuV94PnffdcqSaWShCQkgRYQq9jEZgR4AW94iZMmJo6TSeJ0ljlOuuPEJ5OTTHKS7jnt7kkyk8wkk9UnHXe6Y6cT29iJHS/EBgy2sY1B7ELsICQksWhXVb3LvfNHBSFAgpLqvfXWU/X5nONDvVX1/p5HMudIfOve52bFH72vCAAAAICEVfq9AQAAAIDJEjgAAACA5AkcAAAAQPIEDgAAACB5AgcAAACQPIEDAAAASJ7AAQAAACRP4AAAAACSJ3AAAAAAyRM4AAAAgOQJHAAAAEDyBA4AAAAgeQIHAAAAkDyBAwAAAEiewAEAAAAkT+AAAAAAkidwAAAAAMkTOAAAAIDkCRwAAABA8gQOAAAAIHkCBwAAAJA8gQMAAABInsABAAAAJE/gAAAAAJIncAAAAADJEzgAAACA5AkcAAAAQPIEDgAAACB5AgcAAACQPIEDAAAASJ7AAQAAACRP4AAAAACSJ3AAAAAAyRM4AAAAgOQJHAAAAEDyBA4AAAAgeQIHAAAAkDyBAwAAAEiewAEAAAAkT+AAAAAAkidwAAAAAMkTOAAAAIDkCRwAAABA8gQOAAAAIHkCBwAAAJA8gQMAAABInsABAAAAJE/gAAAAAJIncAAAAADJEzgAAACA5AkcAAAAQPIEDgAAACB5AgcAAACQPIEDAAAASJ7AAQAAACRP4AAAAACSJ3AAAAAAyRM4AAAAgOQJHAAAAEDyBA4AAAAgeQIHAAAAkDyBAwAAAEiewAEAAAAkT+AAAAAAkidwAAAAAMkTOAAAAIDkCRwAAABA8gQOAAAAIHkCBwAAAJA8gQMAAABInsABAAAAJE/gAAAAAJIncAAAAADJEzgAAACA5AkcAAAAQPIEDgAAACB5AgcAAACQPIEDAAAASJ7AAQAAACRP4AAAAACSJ3AAAAAAyRM4AAAAgOQJHAAAAEDyBA4AAAAgeQIHAAAAkDyBAwAAAEiewAEAAAAkT+AAAAAAkidwAAAAAMkTOAAAAIDkCRwAAABA8gQOAAAAIHkCBwAAAJA8gQMAAABInsABAAAAJE/gAAAAAJIncAAAAADJEzgAAACA5AkcAAAAQPIEDgAAACB5AgcAAACQPIEDAAAASJ7AAQAAACRP4AAAAACSJ3AAAAAAyRM4AAAAgOQJHAAAAEDyBA4AAAAgeQIHAAAAkDyBAwAAAEiewAEAAAAkT+AAAAAAkidwAAAAAMkTOAAAAIDkCRwAAABA8gQOAAAAIHkCBwAAAJA8gQMAAABInsABAAAAJE/gAAAAAJIncAAAAADJEzgAAACA5AkcAAAAQPIEDgAAACB5AgcAAACQPIEDAAAASJ7AAQAAACRP4AAAAACSJ3AAAAAAyRM4AAAAgOQJHAAAAEDyBA4AAAAgeQIHAAAAkDyBAwAAAEiewAEAAAAkT+AAAAAAkidwAAAAAMkTOAAAAIDkCRwAAABA8gQOAAAAIHkCBwAAAJA8gQMAAABInsABAAAAJE/gAAAAAJIncAAAAADJEzgAAACA5AkcAAAAQPIEDgAAACB5AgcAAACQPIEDAAAASJ7AAQAAACRP4AAAAACSJ3AAAAAAyRM4AAAAgOQJHAAAAEDyBA4AAAAgeQIHAAAAkDyBAwAAAEiewAEAAAAkT+AAAAAAkidwAAAAAMkTOAAAAIDkCRwAAABA8gQOAAAAIHkCBwAAAJA8gQMAAABInsABAAAAJE/gAAAAAJIncAAAAADJEzgAAACA5AkcAAAAQPIEDgAAACB5AgcAAACQPIEDAAAASJ7AAQAAACRP4AAAAACSJ3AAAAAAyRM4AAAAgOQJHAAAAEDyBA4AAAAgeQIHAAAAkDyBAwAAAEiewAEAAAAkT+AAAAAAkidwAAAAAMkTOAAAAIDkCRwAAABA8gQOAAAAIHkCBwAAAJA8gQMAAABInsABAAAAJE/gAAAAAJIncAAAAADJEzgAAACA5AkcAAAAQPIE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nsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApCdwAAAAAOkJHAAAAEB6AgcAAACQnsABAAAApPcfqINIfQTCrM8AAAAASUVORK5CYII='
        let mascota =
        {
          "name"            : this.name,
          "description"     : this.description,
          "birthday"        : this.birthday,
          "color_necklace"  : this.colornecklace,
          "size"            : this.size,
          "breed"           : this.breed,
          "weight"          : this.weight,
          "gender"          : this.gender,
          "specie"          : this.specie,
          "photo"           : this.uploadPhoto?this.uploadPhoto:defaultImage,
          "latitude"        : parseFloat(this.latitude),
          "longitude"       : parseFloat(this.longitude),
          "sterelized"      : this.esterilized?1:0,
          "sterelized_date" : this.sterelized_date?this.sterelized_date:null,
          "id_user"         : localStorage.getItem('user_id'),
          "status"          : 1,
          "tags"            : JSON.stringify(this.checkedIDs)
        }
        this.senddata = true;

      this.presentLoading()

        this.api.createPet(mascota).subscribe(data => {

          if(data.status === 200){
          this.navCtrl.navigateBack('/');
          this.presentToast(this.successtoast,"success")
        }else{
          this.presentToast(this.errortoast,"warning")
          this.senddata = false;
        }
      });
      }

      async presentLoading() {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message:  this.process,
          duration: 2000
        });
        await loading.present();
        const { role, data } = await loading.onDidDismiss();
      }



      back(){
        this.navCtrl.back();

      }

    siguiente(){
      this.valor += .25;
      this.step += 1;
    }

    regresar(){
      if( this.valor > 0){
        this.valor -= .25;
      }
      if(this.step > 0){
        this.step -= 1;
      }
    }


    changeSelection() {
      this.fetchSelectedItems()
      this.fetchCheckedIDs()

    }

    fetchSelectedItems() {
      this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
        return value.isChecked
      });
    }

    fetchCheckedIDs() {
      this.checkedIDs = []
      this.checkboxesDataList.forEach((value, index) => {
        if (value.isChecked) {
          this.checkedIDs.push(value.id);
        }
      });
    }

    async presentToast(message,color) {
      const toast = await this.toastController.create({
        message,
        color,
        duration: 2000
      });
      toast.present();
    }

}
