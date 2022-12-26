import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-help',
  templateUrl: './modal-help.page.html',
  styleUrls: ['./modal-help.page.scss'],
})
export class ModalHelpPage implements OnInit {
  title = 'titulo';
  response = 'mensaje';
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  close(){
  this.modalCtrl.dismiss();
}

}

