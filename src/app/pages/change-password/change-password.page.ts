import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage{
  showPassword = false;
  showPassword2 = false;
  reestablecer;
  token;
  data;
  
  errorMessages;
  errorequired;
  errorrequiredconfirm;
  miniumerror;
  successchange;
  errorchange;
  passwordnomatch;
  passwordequal;

  new_password="";
  password="";
  new_passwordReset;

  translate(){
    this.translateService.get('changepassword.errorrequired').subscribe(value => {
      this.errorequired = value;
    })
    this.translateService.get('changepassword.errorrequiredconfirm').subscribe(value => {
      this.errorrequiredconfirm = value;
    })
    this.translateService.get('changepassword.miniumerror').subscribe(value => {
      this.miniumerror = value;
    })
    this.translateService.get('changepassword.successchange').subscribe(value => {
      this.successchange = value;
    })
    this.translateService.get('changepassword.errorchange').subscribe(value => {
      this.errorchange = value;
    })
    this.translateService.get('changepassword.passwordnomatch').subscribe(value => {
      this.passwordnomatch = value;
    })

    this.translateService.get('changepassword.passwordequal').subscribe(value => {
      this.passwordequal = value;
    })
  }


  ionViewWillEnter(){
    this.translate();
  }
  device;
  constructor(
    private navCtrl:NavController,
    private api: DataService,
    public toastController: ToastController,
    private translateService:TranslateService,
    private router:Router,
    public formBuilder: FormBuilder) {
      this.device = localStorage.getItem('device');

      this.data = this.router.getCurrentNavigation().extras;
      if(this.data.login === 1){
        this.reestablecer = false;
      }else{
        this.reestablecer = true;
      }
     this.token  = localStorage.getItem('password_change_token')?localStorage.getItem('password_change_token'):0;
    

    //  this.errorMessages = {
    //   new_password:[
    //     { type: 'required', message: this.errorrequiredconfirm },
    //     { type: 'minlength', message: this.miniumerror }
    //   ],
    //   new_passwordReset:[
    //     { type: 'required', message: this.errorrequiredconfirm },
    //     { type: 'minlength', message: this.miniumerror }
    //   ],
    //   password:[
    //     { type: 'required', message: this.errorequired },
    //     { type: 'minlength', message: this.miniumerror }
    //   ]
    // };

    }
    // registrationForm = this.formBuilder.group({
    //   password: ['',[ Validators.required, Validators.minLength(6)]],
    //   new_password: ['',[ Validators.required, Validators.minLength(6)]],
    // });

    // registrationFormReset = this.formBuilder.group({
    //   new_passwordReset: ['',[ Validators.required, Validators.minLength(6)]],
    // });


    // get new_passwordReset() {
    //   return this.registrationFormReset.get('new_passwordReset');
    // }
    // get new_password() {
    //   return this.registrationForm.get('new_password');
    // }
    // get password() {
    //   return this.registrationForm.get('password');
    // }


    toggleShow() {
      this.showPassword = !this.showPassword;
    }

    toggleShow2() {
      this.showPassword2 = !this.showPassword2;
    }


    

  actualizar(){
    if(this.new_password = this.password){
      return this.presentToast(this.passwordequal,'warning')
    }
    if(this.reestablecer){
      this.api.resetPassword({ password: this.new_passwordReset,token:this.token}).subscribe( data => {
        console.log(data);
        if(data.status === 200){
          this.navCtrl.navigateRoot('/tabs/tab3');
          this.presentToast(this.successchange,'success');
        }else{
          this.presentToast(this.errorchange,'warning');
        }
      })
    }else{
      
      this.api.changePassword({
          id:           localStorage.getItem('user_id'),
          password:     this.password,
          new_password: this.new_password
        }).subscribe( (data) =>{
            // this.registrationForm.reset();
            this.presentToast(this.successchange,'success');
            this.beforePage()
        },err=>{
          this.presentToast(this.passwordnomatch,'warning');
        });

      // if(this.registrationForm.value.password != this.registrationForm.value.new_password){
       
      // }else{
      //   this.presentToast(this.passwordequal,'warning');
      // }
    }
  }

  beforePage(){
    this.navCtrl.back();
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }


}
