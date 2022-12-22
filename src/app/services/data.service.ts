import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  PRODUCTION_URL  = 'https://core.radi.pet/'
  TEST_URL        = 'https://raditest.radi.pet/';
  LOCAL_URL       = 'http://localhost:8080/'
  MODE;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  options = {
    headers: this.headers
  }

  constructor(private http: HttpClient) {
    if(localStorage.getItem('sandbox')){
      this.MODE = this.TEST_URL;
    }else{
      this.MODE = this.PRODUCTION_URL;
    }
   }

   getPlace(id):any{
    return this.http.get(this.MODE + 'place/'+id);
  }
  getReviewsPlace(id){
    return this.http.get(this.MODE + 'places/reviews/'+id);
  }
}
