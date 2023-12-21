import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  get isUserLogged(){
    return this.dataService.userLogged ? true : false
  }

  get username(){
    return this.dataService.userLogged ? this.dataService.userLogged.username : ''
  }

  logout(){
    this.router.navigateByUrl('/login');
    this.dataService.userLogged = undefined;
    this.dataService.activeToken = '';
  }

}
