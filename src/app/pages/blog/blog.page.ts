import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  blog:any = [];
  contents:any;
  constructor(private api:DataService,private navCtrl:NavController,private activatedRoute: ActivatedRoute    ) {
    console.log(this.activatedRoute.snapshot.paramMap.get('slug'))

    this.api.getBlog(this.activatedRoute.snapshot.paramMap.get('slug')).subscribe(data => {
      console.log(data);
      this.blog = data[0];
      this.contents = JSON.parse(data[0].content);
    });

   }

   adClick(){
    this.openUrl('https://radi.pet/ads')

   }

   async openUrl(url){
    await Browser.open({ url });
   }

  ngOnInit() {
  }


  back(){
    this.navCtrl.back();
  }
}

