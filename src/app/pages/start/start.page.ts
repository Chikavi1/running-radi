import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
mascotas:any = [];
user_id;
  constructor(private modalCtrl:ModalController,private api: DataService) {
    this.user_id = localStorage.getItem('user_id');
    this.api.getPets(this.user_id).subscribe( datos => {
      this.mascotas = datos;
    });
   }
  step = 1;
  pet_selected;
  ngOnInit() {
  }

  next(){
    this.step += this.step;
  }

  close(success){
    this.modalCtrl.dismiss(this.pet_selected);
  }

  handleChange(ev) {
    this.pet_selected = ev.target.value;
  }

}
