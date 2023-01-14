import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-measures',
  templateUrl: './measures.page.html',
  styleUrls: ['./measures.page.scss'],
})
export class MeasuresPage implements OnInit {

  constructor(private navCtrl:NavController) { }
  selectDistance;
  selectMass;

  ngOnInit() {
    this.selectDistance = localStorage.getItem('measure');
    this.selectMass     = localStorage.getItem('mass');
  }

  changeDistance(dis){
    this.selectDistance = dis;
  }

  changeMass(mass){
    this.selectMass = mass;
  }

  ionViewWillLeave(){
    localStorage.setItem('measure',this.selectDistance)
    localStorage.setItem('mass',this.selectMass)

  }

  beforePage(){
    this.navCtrl.back();
  }
}
