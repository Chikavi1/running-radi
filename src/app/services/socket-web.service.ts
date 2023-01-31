import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class SocketWebService extends Socket {

  callback: EventEmitter<any> = new EventEmitter();

  constructor() {
    super({
      url: 'http://radishare.us-west-1.elasticbeanstalk.com:3030/',
      options: {
        query:{
          id: '1'
        }
      }
    })
    this.listen();
   }

   listen = () => {
    this.ioSocket.on('event', res => this.callback.emit(res))
   }
// esto en ionic se elimina ya que solo va a emitir

   emitEvent = (payload = {}) => {
    this.ioSocket.emit('event',payload)
   }
}
