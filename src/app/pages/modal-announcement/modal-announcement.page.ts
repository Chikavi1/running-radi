import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-announcement',
  templateUrl: './modal-announcement.page.html',
  styleUrls: ['./modal-announcement.page.scss'],
})
export class ModalAnnouncementPage implements OnInit {
  page = '/create-pet';
  device;
  step = 1;
  interest;

  items = [
    {
      id: 'adoptions',
      isChecked: false
    },
    {
      id: 'emergencies',
      isChecked: false
    },
    {
      id: 'petfriendly',
      isChecked: false
    },
    {
      id: 'appointments',
      isChecked: false
    },
    {
      id: 'disappear',
      isChecked: false
    }
    ,{
      id: 'clinical',
      isChecked: false
    }
    ,{
      id: 'sterilized',
      isChecked: false
    }
    ,{
      id: 'guides',
      isChecked: false
    }
  ]

    constructor(
            private navCtrl:NavController,
            private api: DataService,
            private modal:ModalController,
            ) {
              this.device = localStorage.getItem('device');
            }

    ngOnInit() {
    }

    nextStep(){
      this.api.updateUser({id:localStorage.getItem('user_id'),interest: JSON.stringify(this.checkedIDs)}).subscribe(data => {
        this.step += 1;
      })
    }


    changeSelection() {
      this.fetchSelectedItems()
      this.fetchCheckedIDs()
    }

    selectedItemsList = [];
    checkedIDs = [];


  fetchSelectedItems() {
    this.selectedItemsList = this.items.filter((value, index) => {
      return value.isChecked
    });
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.items.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }

    close(){
      this.modal.dismiss();
    }
    goToPage(){

      this.navCtrl.navigateForward(this.page);
      this.close();
    }

  }
