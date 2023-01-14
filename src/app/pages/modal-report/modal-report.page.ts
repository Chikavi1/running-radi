import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-report',
  templateUrl: './modal-report.page.html',
  styleUrls: ['./modal-report.page.scss'],
})
export class ModalReportPage implements OnInit {
  device;
  step=1;

  titletoast;

  reason;
  message='';

  type;
  id;

  translate(){
    this.translateService.get('modal-report.titletoast').subscribe(value => {
      this.titletoast = value;
    })
    }

  constructor(private modal:ModalController,
    private toastController:ToastController,
    private api:DataService,
    private modalctrl:ModalController,
    private translateService:TranslateService
    ){
    this.device = localStorage.getItem('device');
    this.translate()
  }

   selected(option){
     this.reason = option;
     this.step += 1;
   }

  ngOnInit() {
    console.log(this.type,this.id);
  }


  send(){

    if(this.type == 'place'){
      let data = {
        "user_id": localStorage.getItem('user_id'),
        "place_id": this.id,
        "reason": this.reason,
        "message": this.message
      }
      this.api.createReportPlace(data).subscribe(data => {
        console.log(data);
        if(data.status == 200){
          this.presentToast(this.titletoast,'success');
          this.modal.dismiss();

        }

      });
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

  close(){
    this.modalctrl.dismiss();
  }

}
