import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter =  0;
  token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('dev@dev.com', '123456')
    .subscribe(rta =>{
      this.token = rta.access_token
      console.log(this.token)
      this.getProfile();
    })
  }

  getProfile(){
    this.authService.profile(this.token)
    .subscribe(user=>{
      this.profile = user
    })
  }

}
