import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipeInstructionsPage } from '../recipe-instructions/recipe-instructions.page';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
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

  openModal(){
    this.presentOffline(RecipeInstructionsPage);
  }

  async presentOffline(component){
    const modal = await this.modalController.create({
      component: component,
      breakpoints: [1],
      componentProps:{

      },
      initialBreakpoint: 1,
      backdropDismiss:true,
      swipeToClose​:true,
      cssClass: 'small-modal'
    });

    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }


}
