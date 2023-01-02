import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-set-goal',
  templateUrl: './set-goal.page.html',
  styleUrls: ['./set-goal.page.scss'],
})
export class SetGoalPage implements OnInit {
  goal;

  constructor(private modalCtrl:ModalController) {
    const convertgoal =  (parseInt(localStorage.getItem('goal'))/60);
    this.goal = convertgoal;
    console.log(this.goal);
  }

  ngOnInit() {
  }

  setGoal(goal){
    this.goal = goal;
    localStorage.setItem('goal',''+this.goal*60);
    this.modalCtrl.dismiss(true);
  }

}
