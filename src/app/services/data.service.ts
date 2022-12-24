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
      this.MODE = this.LOCAL_URL;
    }else{
      this.MODE = this.PRODUCTION_URL;
    }
   }

  getPlace(id):any{
    return this.http.get(this.MODE + 'place/'+id);
  }

  getCustomer():any{

  }

  getSubscriptions(data):any{

    return this.http.post(this.MODE + 'retrieveSubscriptions/', JSON.parse(JSON.stringify(data)), this.options);

  }

  cancelSubscription(data):any{
    return this.http.post(this.MODE + 'cancelSubscription/', JSON.parse(JSON.stringify(data)), this.options);

  }

  getSubscription(data):any{
    return this.http.post(this.MODE + 'retrieveSubscription/', JSON.parse(JSON.stringify(data)), this.options);
  }

  getReviewsPlace(id){
    return this.http.get(this.MODE + 'places/reviews/'+id);
  }

  getCards(customer_id): any {
    return this.http.get(this.MODE + 'getCards/' + customer_id);
  }
  updateDefaultCard(customerId, cardId): any {
    return this.http.get(this.MODE + 'updateCostumer/' + customerId + '/' + cardId);
  }
  deleteCard(customerId, cardId): any {
    return this.http.get(this.MODE + 'deleteCard/' + customerId + '/' + cardId)
  }


  getPoints(id){
    return this.http.get(this.MODE+'get_points/'+id);
  }

  useGift(data){
    return this.http.post(this.MODE+'use_gift_card',JSON.parse(JSON.stringify(data)), this.options);
  }

  createToken(data) {
    return this.http.post(this.MODE + 'createToken', JSON.parse(JSON.stringify(data)), this.options);
  }

  addcard(customer, token): any {
    return this.http.post(this.MODE + 'addCard', JSON.parse(JSON.stringify({
      customer: customer,
      token: token
    })), this.options);
  }
}
