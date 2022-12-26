import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  // @ViewChild('portComponent',{static:false}) portComponent: IonicSelectableComponent;

  port;
  // countries;
  step = 1;
  errorMessages;
  wait;

  name_required;
  name_least;
  email_required;
  email_valid;
  phone_required;
  phone_valid;
  password_required;
  password_least;

  currency;
  country;



  countries = [
    { code: "+52", name: "México" },
    { code: "+57", name: "Colombia" },
    { code: "+1", name: "USA" },
    { code: "+1",  name: "Canada" },
    { code: "+55", name: "Brazil" }
  ];

  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private translateService:TranslateService,
    private loadingController: LoadingController,
    private data:DataService)
    {

      this.data.getInfoIp().subscribe((data:any) => {
        this.currency = data.country_name,
        this.country  = data.currency_code
        console.log(this.currency,this.country);
      })

      // this.oneSignal.getIds().then(identity => {

      // });
      this.translate();



      this.errorMessages = {
        name: [
          { type: 'required', message: this.name_required },
          { type: 'minlength', message: this.name_least }
        ],
        email: [
          { type: 'required', message: this.email_required },
          { type: 'pattern', message: this.email_valid }
        ],
        cellphone: [
          { type: 'required', message: this.phone_required },
          { type: 'pattern', message: this.phone_valid }
        ],
        password:[
          { type: 'required', message: this.password_required },
          { type: 'minlength', message: this.password_least }
        ],
        cellphone_country:[

        ]
      };
    }

    translate(){
      this.translateService.get('register.wait').subscribe(value => {
        this.wait = value;
      })

      this.translateService.get('register.name_required').subscribe(value => {
        this.name_required = value;
      })
      this.translateService.get('register.name_least').subscribe(value => {
        this.name_least = value;
      })
      this.translateService.get('register.email_required').subscribe(value => {
        this.email_required = value;
      })
      this.translateService.get('register.email_valid').subscribe(value => {
        this.email_valid = value;
      })
      this.translateService.get('register.phone_required').subscribe(value => {
        this.phone_required = value;
      })
      this.translateService.get('register.phone_valid').subscribe(value => {
        this.phone_valid = value;
      })
      this.translateService.get('register.password_required').subscribe(value => {
        this.password_required = value;
      })
      this.translateService.get('register.password_least').subscribe(value => {
        this.password_least = value;
      })



    }

    numberOnlyValidation(event: any) {
      const pattern = /[0-9.,]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

  registrationForm = this.formBuilder.group({
    name: ['',[ Validators.required, Validators.minLength(3)]],
    password: ['',[ Validators.required, Validators.minLength(6)]],
    email: ['',[ Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
  ]],
    cellphone: ['',[ Validators.required,
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
    ]],
    cellphone_country:[]
  });


  contra;
  showPassword;



  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get cellphone() {
    return this.registrationForm.get('cellphone');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  get cellphone_country() {
    return this.registrationForm.get('cellphone_country');
  }




  exit(state){
    if(state){
      this.modalCtrl.dismiss(true);
    }else{
      this.modalCtrl.dismiss();
    }
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  onCodeChanged(code: string) {
  }

  onCodeCompleted(code: string) {

  }

  public submit(){
    this.presentLoading();
    let navigationExtras: NavigationExtras = {
      state: {
        type:'verification',
      }
    }
    let customer_id;
    this.data.createCustomer({
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.cellphone_country+''+this.registrationForm.value.email,
      phone: this.registrationForm.value.cellphone
        }).
      subscribe( data => {
        customer_id = data.id;
        localStorage.setItem('customer_id',data.id);
        this.data.register(this.registrationForm.value,customer_id,this.currency,this.country).subscribe( (data:any) => {
          this.presentToast(data.message,"success");
          localStorage.setItem('user_id',data.id);
          this.navCtrl.navigateForward('/code-verification',navigationExtras);
          this.exit(true);
        },error => {
          let message:any = error.error.message;
          this.presentToast(""+message,"danger");
        })
      });
  }
  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: color
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: this.wait,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
