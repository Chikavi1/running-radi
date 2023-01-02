import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-breeds',
  templateUrl: './breeds.page.html',
  styleUrls: ['./breeds.page.scss'],
})
export class BreedsPage implements OnInit {
  breeds:any = [];
  searchBreeds;

  loading = true;

  constructor(private api: DataService,private modalCtrl: ModalController){
    setTimeout(()=>{
        this.loading = false;
    },1200)
  }

  select(id,name,image){
    this.modalCtrl.dismiss({id,name,image});
  }


  search(event){
    const text = event.target.value;
    this.searchBreeds = this.breeds;
    if(text && text.trim() != ''){
      this.searchBreeds = this.searchBreeds.filter((breed:any) => {
        return (breed.name.toLowerCase().indexOf(text.toLowerCase()) > -1);      })
    }
  }



  breed;
  ngOnInit(){

   let infoBreeds = {
        breed: this.breed,
        language: 'es'
    }

    this.api.breeds(infoBreeds).subscribe(data => {
      this.breeds = data;
      this.searchBreeds = this.breeds;
    })
  }

  close(){
    this.modalCtrl.dismiss()
  }
}
