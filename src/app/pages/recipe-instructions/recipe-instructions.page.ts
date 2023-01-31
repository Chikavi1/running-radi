import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-instructions',
  templateUrl: './recipe-instructions.page.html',
  styleUrls: ['./recipe-instructions.page.scss'],
})
export class RecipeInstructionsPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  close(){
    this.modalCtrl.dismiss();
  }

}
