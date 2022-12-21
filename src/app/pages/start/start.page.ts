import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }
  step = 1;
  ngOnInit() {
  }

  next(){
    this.step += this.step;
  }

  close(success){
    this.modalCtrl.dismiss(success);
  }

}
