import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras  } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { IdPetsPage } from '../id-pets/id-pets.page';
import { LoginPage } from '../login/login.page';
import { Share } from '@capacitor/share';


@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {


  PetId;
  age;
  dateFormat;
  pet:any = [];

  services: any;
  reviews = [];

  images = [];
  vaccines = [];
  dewormings = [];

  tags:any = [];
  nextvisit:any = [];
  user_id;

  owner = false;
  visitsMenu = 'history';
  injections = 'vaccines';

  slideOpts = {
    slidesPerView: 1,
  }

  breedData:any = [];

  visits:any = [];

   slideOptsVacums = {
    slidesPerView:2.4,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  extras;

// translate
menutitle;
optionid;
optionQrcode;
optionshare;
optionreportlost;
optionedit;
optiondead;
optioncancel;
alertdeadthtitle;
alertdeadmessage;
alertdeadthcancel;
alertdeadthok;

titleShare;
textshare;
dialogshare;

foundheader
foundmessage
foundtext;

eliminatevacccine;
eliminatedes
location;
necklaceColor;
necklaceTitle;
necklaceSrc;

translate(){
  this.translateService.get('petsmenu.optionid').subscribe(value => {
    this.optionid = value;
  });
  this.translateService.get('petsmenu.title').subscribe(value => {
    this.menutitle = value;
  })
  this.translateService.get('petsmenu.optionqrcode').subscribe(value => {
    this.optionQrcode = value;
  })
  this.translateService.get('petsmenu.optionshare').subscribe(value => {
    this.optionshare = value;
  })
  this.translateService.get('petsmenu.optionreportlost').subscribe(value => {
    this.optionreportlost = value;
  })
  this.translateService.get('petsmenu.optionedit').subscribe(value => {
    this.optionedit = value;
  })
  this.translateService.get('petsmenu.optiondead').subscribe(value => {
    this.optiondead = value;
  })
  this.translateService.get('petsmenu.optioncancel').subscribe(value => {
    this.optioncancel = value;
  })
  this.translateService.get('petalertdeadth.title').subscribe(value => {
    this.alertdeadthtitle = value;
  })
  this.translateService.get('petalertdeadth.message').subscribe(value => {
    this.alertdeadmessage = value;
  })
  this.translateService.get('petalertdeadth.cancel').subscribe(value => {
    this.alertdeadthcancel = value;
  })
  this.translateService.get('petalertdeadth.ok').subscribe(value => {
    this.alertdeadthok = value;
  });

  this.translateService.get('lostdog.titleShare').subscribe(value => {
    this.titleShare = value;
  });

  this.translateService.get('lostdog.textshare').subscribe(value => {
    this.textshare = value;
  });

  this.translateService.get('lostdog.dialogshare').subscribe(value => {
    this.dialogshare = value;
  });


  this.translateService.get('pets.foundheader').subscribe(value => {
    this.foundheader = value;
  });

  this.translateService.get('pets.foundmessage').subscribe(value => {
    this.foundmessage = value;
  });

  this.translateService.get('pets.foundtext').subscribe(value => {
    this.foundtext = value;
  });

  this.translateService.get('pets.eliminatevacccine').subscribe(value => {
    this.eliminatevacccine = value;
  });

  this.translateService.get('pets.eliminatedes').subscribe(value => {
    this.eliminatedes = value;
  });

  this.translateService.get('lostdog.location').subscribe(value => {
    this.location = value;
  });

}


inAdoption;
noContent;

device;
  constructor(
      private navCtrl: NavController,
      private activatedRoute: ActivatedRoute,
      private dataService: DataService,
      private actionSheetController:ActionSheetController,
      private modalController: ModalController,
      private alertController: AlertController,
      private toastController: ToastController,
      private translateService:TranslateService,
      ){
        this.device = localStorage.getItem('device');
        this.user_id = parseInt(localStorage.getItem('user_id'));

        this.translate();

   }


  birthdayChange(birthdayChange){
    var years = moment().diff(moment(birthdayChange).format('yyyy-MM-DD'), 'years');
    this.age = years;
    this.dateFormat='years';
    if(years === 0){
      var months = moment().diff(moment(birthdayChange).format('yyyy-MM-DD'), 'months');
      this.age = months;
      this.dateFormat='months';
      if(months === 0){
        var days = moment().diff(moment(birthdayChange).format('yyyy-MM-DD'), 'days');
        this.age = days;
        this.dateFormat='days';
      }
    }
  }

  login(){
    this.presentModal(LoginPage);
   }

   async presentModal(component) {
    const modal = await this.modalController.create({
      component: component,
      breakpoints: [0.0, 0.90],
      initialBreakpoint: 0.90,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {
     if(data['data']){
        this.user_id = localStorage.getItem('user_id');
     }

    });
    return await modal.present();
  }

  getPetInfo(){
    this.PetId = this.activatedRoute.snapshot.paramMap.get('id');
      this.dataService.getPetInfo(this.PetId).subscribe( data => {

        if(data.length != 0){
          this.noContent = false;
          if(data[0].id_user === this.user_id){
            this.owner = true;
          }
          this.pet = data[0];

          let petInfo = {
            language: 'es',
            id: this.pet.breed,
            specie: this.pet.specie
          }

          this.dataService.getBreedInfo(petInfo).subscribe(data => {
            this.breedData = data;
          })

          this.setNecklaceColor(this.pet.color_necklace)
          this.birthdayChange(data[0].birthday)

          if(data[0].tags){
            var tags = data[0].tags;
            this.tags =  JSON.parse(tags.split(','));
          }
        }else{
          this.noContent = true;
        }
      });
  }

   ionViewWillEnter(){

    this.getPetInfo();

    // this.dataService.getVisitsByPet(this.PetId).subscribe( data => {
    //   this.visits = data;
    // });

    // this.dataService.getNextVisitsByPet({'pet_id':this.PetId}).subscribe(data => {
    //   if(data.length != 0){
    //     this.nextvisit = data[0];
    //  }
    // });

    // this.get_injections();
   }

   setNecklaceColor(colorId: number){
    switch(colorId){
      case 1: this.necklaceSrc = "../../../assets/necklace-red.png";
              this.necklaceTitle = "createpet.warning";
              break;
      case 2: this.necklaceSrc = "../../../assets/necklace-yellow.png";
              this.necklaceTitle = "createpet.nervious";
              break;
      case 3: this.necklaceSrc = "../../../assets/necklace-green.png";
              this.necklaceTitle = "createpet.friendly";
              break;
      case 4: this.necklaceSrc = "../../../assets/necklace-orange.png";
              this.necklaceTitle = "createpet.notfriendly";
              break;
      case 5: this.necklaceSrc = "../../../assets/necklace-purple.png";
              this.necklaceTitle = "createpet.notfeedme";
              break;
      case 6: this.necklaceSrc = "../../../assets/necklace-blue.png";
              this.necklaceTitle = "createpet.trained";
              break;
      case 7: this.necklaceSrc = "../../../assets/necklace-white.png"
              this.necklaceTitle = "createpet.disability";
              break;
    }
   }

  //  get_injections(){
  //   this.dataService.getVaccines(this.PetId).subscribe( data => {
  //     this.vaccines = [];
  //     this.dewormings = [];
  //     data.forEach( element => {
  //       if(element.type == 1){
  //         this.vaccines = this.vaccines.concat(element);
  //       }else{
  //         this.dewormings = this.dewormings.concat(element);
  //       }
  //     });
  //   });
  //  }




  async presentActionSheet() {
    let options = [];
    options = [

    {
      text: this.optionshare,
      icon: 'share-social',
      handler:async() => {
        await Share.share({
          title: 'Radi',
          text: 'Mira el perfil de '+this.pet.name+' en Radi🐶🐱',
          url: 'https://radi.pet/pet/'+this.PetId,
          dialogTitle: 'Comparte el perfil en Radi🐶🐱'
        });

        // this.presentModalSmall(SharePetPage,{
        //   photo: this.pet.photo,
        //   text: this.pet.name
        // });
      }
    },
    {
      text: this.optionreportlost,
      icon: 'file-tray-full',
      handler: () => {
        this.lostDog();
      }
    },
    {
      text: this.optionedit,
      icon: 'paw',
      handler: () => {
        let navigationExtras: NavigationExtras = {
          state: {
            id: this.PetId,
          }
        };
        this.navCtrl.navigateForward('edit-pet',navigationExtras)
      }
    },
    {
      text: this.optionid,
      icon: 'id-card-outline',
      handler: () => {
       this.presentModalSmall(IdPetsPage,{id: this.PetId});
      }
    },
    {
        text: this.optiondead,
        icon: 'heart',
        handler: () => {
          this.alertDeath();
        }

    },
    // {
    //   text: this.optionQrcode,
    //   icon: 'qr-code',
    //   handler: () => {
    //     Browser.open({ url: 'data:image/png;base64,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'});

    //   }
    // },
    {
      text: this.optioncancel,
      icon: 'close',
      role: 'cancel',
      handler: () => {
      }
    }
  ];

    if(this.pet.status === 0){
      options = options.slice(0,1);
    }

    if(this.pet.status === 3){
      options.splice(1,1);
    }


    const actionSheet = await this.actionSheetController.create({
      header: this.menutitle,
      mode:'md',
      buttons: options
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  beforePage(){
    this.navCtrl.back();
  }

  goToPage(page,state){
    let navigationExtras: NavigationExtras = {
      state
    };

    this.navCtrl.navigateForward(page,navigationExtras);
  }

  goVisit(visit){
    let navigationExtras: NavigationExtras = {
      state: visit
    };

    this.navCtrl.navigateForward('/visit',navigationExtras);
  }


  lostDog(){
    let navigationExtras: NavigationExtras = {
      state: {
        id: this.PetId,
      }
    };
    this.navCtrl.navigateForward('lost-dog',navigationExtras);
  }

  lostDogHelp(){
    if(this.user_id != this.pet.id_user){

      let navigationExtras: NavigationExtras = {
        state: {
          origin: this.extras.origin,
          id_report: this.pet.id_report,
          latitude: this.pet.latitude,
          longitude: this.pet.longitude
        }
      };
      this.navCtrl.navigateForward('lost-dog-help',navigationExtras);
    }
  }

  Adoption(){
    let navigationExtras: NavigationExtras = {
      state: {
        pet_id: this.PetId,
        organization_id: this.pet.id_organization,
      }
    };
    this.navCtrl.navigateForward('/adopcion',navigationExtras);
  }



    async presentModalSmall(component,data) {
      const modal = await this.modalController.create({
        breakpoints: [0.59,1.0],
        initialBreakpoint:0.59,
        backdropDismiss:true,
        swipeToClose​:true,
        cssClass: 'small-modal',
        component: component,
        componentProps: data
      });



      return await modal.present();
    }


    async alertDeath() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        subHeader: this.alertdeadthtitle,
        message: this.alertdeadmessage,
        buttons: [
          {
            text: this.alertdeadthcancel,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, {
            text: this.alertdeadthok,
            handler: () => {
              let datos = {
                id: this.PetId,
                status: 0
              }
              this.update(datos);
              console.log('Confirm Okay');
            }
          }
        ]
      });

      await alert.present();
    }

    // async alertFoundIt(){
    //   const alert = await this.alertController.create({
    //     cssClass: 'my-custom-class',
    //     subHeader: this.foundheader,
    //     message: this.foundmessage,
    //     buttons: [
    //       {
    //         text: this.alertdeadthcancel,
    //         role: 'cancel',
    //         cssClass: 'secondary',
    //         handler: (blah) => {
    //         }
    //       }, {
    //         text: this.foundtext,
    //         handler: () => {
    //           let datos = {
    //             id: this.PetId,
    //             status: 1
    //           }
    //           this.update(datos);
    //         // eliminar el ultimo reporte

    //         }
    //       }
    //     ]
    //   });

    //   await alert.present();
    // }


    update(datos){
      this.dataService.updatePet(datos).subscribe( data => {
        if(data.msg[0] === 1){
          this.pet.status = datos.status;
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

    segmentChanged(event){
    }

    ngOnInit() { }


  }

