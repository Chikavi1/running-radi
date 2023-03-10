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

   createReportPlace(data):any{
    return this.http.post(this.MODE + 'reports/place/create', JSON.parse(JSON.stringify(data)), this.options);
   }


   getFriends(data){
      return this.http.post(this.MODE + 'follower/friends', JSON.parse(JSON.stringify(data)), this.options);
   }

   createFollow(data){
    return this.http.post(this.MODE + 'follower/create', JSON.parse(JSON.stringify(data)), this.options);
   }

   deleteFollow(data){
    return this.http.post(this.MODE + 'follower/delete', JSON.parse(JSON.stringify(data)), this.options);
   }



   updatePrivacy(data){
    return this.http.put(this.MODE + 'api/update_user', JSON.parse(JSON.stringify(data)), this.options);
   }

   getpetsnear(lat, lng, status): any {
    return this.http.get(this.MODE + 'near_pets/' + lat + '/' + lng + '/' + status);
  }

   getPlaces(lat,lng):any{
    return this.http.get(this.MODE + 'places/'+lat+'/'+lng+'/1');
  }

     getUserPrivacy(data){
    return this.http.post(this.MODE + 'api/user/privacy', JSON.parse(JSON.stringify(data)), this.options);

   }

   userRunning(data){
    return this.http.post(this.MODE + 'users/running', JSON.parse(JSON.stringify(data)), this.options);

   }

   usersNear(data){
    return this.http.post(this.MODE + 'users/near', JSON.parse(JSON.stringify(data)), this.options);
   }

   breeds(data){
    return this.http.post(this.MODE + 'breeds', JSON.parse(JSON.stringify(data)), this.options);
  }

  createPet(data): any {
    return this.http.post(this.MODE + 'pets/store', JSON.parse(JSON.stringify(data)), this.options);
  }

   getActivity(id){
    return this.http.get(this.MODE + 'activity/' + id);
   }

   createActivity(data){
    return this.http.post(this.MODE + 'activity', JSON.parse(JSON.stringify(data)), this.options);
   }

   createPetActivity(data){
    return this.http.post(this.MODE + 'petActivity', JSON.parse(JSON.stringify(data)), this.options);
   }



   getActivitiesByMonth(data){
    return this.http.post(this.MODE + 'activity_by_month', JSON.parse(JSON.stringify(data)), this.options);
   }

   getActivities(user_id){
    return this.http.get(this.MODE + 'activities/' + user_id);
   }

   createCustomer(data):any{
    return this.http.post(this.MODE + 'createCostumer', JSON.parse(JSON.stringify(data)), this.options);
  }

   login(email, password): any {
    return this.http.post(this.MODE + 'api/login', {
      "email": email,
      "password": password,
    });
  }
  getUserByNearConfiguration(data){
    return this.http.post(this.MODE + 'api/user/nearConfiguration', JSON.parse(JSON.stringify(data)), this.options);

  }

  getInfoIp(){
    return this.http.get('https://json.geoiplookup.io/');
  }

  uploadPetsImageProfile(data){
    return this.http.post(this.MODE+'uploadPetsImageProfile', JSON.parse(JSON.stringify(data)),this.options);
  }

  getPets(id): any {
    return this.http.get(this.MODE + 'pets/user/' + id);
  }

  forgotPassword(email):any{
    return this.http.post(this.MODE+'forgot',JSON.parse(JSON.stringify({email:email})),this.options);
  }

  getIdentification(id_pet){
    return this.http.post(this.MODE + 'identifications/get', JSON.parse(JSON.stringify({id:id_pet})), this.options);
  }

  associatedId(data){
    return this.http.post(this.MODE + 'identifications/associated', JSON.parse(JSON.stringify(data)), this.options);
  }

  getPetInfo(PetId): any {
    return this.http.get(this.MODE + 'pets/showOrg/' + PetId);
  }

   getBreedInfo(data){
    return this.http.post(this.MODE + 'breeds/search', JSON.parse(JSON.stringify(data)), this.options);
  }

  updatePet(data):any{
    return this.http.put(this.MODE + 'pets/update', JSON.parse(JSON.stringify(data)), this.options);
  }

  validateToken(token):any{
    return this.http.get(this.MODE+'reestablecer/'+token);
  }

  validateEmail(token):any{
    return this.http.post(this.MODE+'api/user/verifiedEmail/',JSON.parse(JSON.stringify({verified:token})),this.options);
  }

  getQA(language):any{
    return this.http.post(this.MODE+'json_questions',JSON.parse(JSON.stringify({language})), this.options);
  }

  register(data, customer_id,currency,country) {
    let datos = {
      name: data.name,
      password: data.password,
      email: data.email,
      gender: data.gender,
      cellphone: data.cellphone_country+''+data.cellphone,
      customer: customer_id,
      currency: currency,
      country: country,
      photo: 'https://avatars.dicebear.com/api/initials/' + data.name + '.svg'
    }
    return this.http.post(this.MODE + 'api/register', datos);
  }


  prePlaces(data){
    return this.http.post(this.MODE+'places/pre_register',JSON.parse(JSON.stringify(data)), this.options);
  }

   givePoints(data){
    return this.http.post(this.MODE+'give_points',JSON.parse(JSON.stringify(data)), this.options);
  }


   createGift(data){
    return this.http.post(this.MODE+'create_gift_card',JSON.parse(JSON.stringify(data)), this.options);
  }

   getNotifications(id){
    return this.http.get(this.MODE+'api/user/getNotifications/'+id);
  }

   getBlogs(){
    return this.http.get(this.MODE + 'blogs/');
  }

  getBlog(slug){
    return this.http.get(this.MODE + 'blog/'+slug);
  }

   getUser(id): any{
    return this.http.get(this.MODE + 'api/get_user/'+id);
  }

  changePassword(data):any{
    return this.http.post(this.MODE+'updatepassword/',JSON.parse(JSON.stringify(data)),this.options);
  }

  resetPassword(data):any{
    return this.http.post(this.MODE+'resetpassword/'+data.token,JSON.parse(JSON.stringify(data)),this.options);
  }

  updateUser(data):any{
    return this.http.put(this.MODE + 'api/update_user', JSON.parse(JSON.stringify(data)), this.options);
  }
  deleteUser(data):any{
    return this.http.post(this.MODE + 'api/delete_user', JSON.parse(JSON.stringify(data)), this.options);
  }

  getPlace(id):any{
    return this.http.get(this.MODE + 'place/'+id);
  }

  feedback(data):any{
    return this.http.post(this.MODE + 'feedback/create', JSON.parse(JSON.stringify(data)), this.options);
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

  uploadImageUser(data){
    return this.http.post(this.MODE+'uploadImageUser', JSON.parse(JSON.stringify(data)),this.options);
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
