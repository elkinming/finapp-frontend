import { Injectable } from '@angular/core';
import { Budget, User } from '../interfaces/HttpResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userLogged?: User ;
  activeToken = '';

  budgetSelected!: Budget;

  constructor() { }

}
