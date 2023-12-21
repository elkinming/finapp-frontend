import { Injectable } from '@angular/core';
import { User } from '../interfaces/HttpResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userLogged?: User ;
  activeToken = '';

  constructor() { }

}
