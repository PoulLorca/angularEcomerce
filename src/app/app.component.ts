import { Component } from '@angular/core';

import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imgParent = '';
  token = '';

  constructor(    
    private usersService: UsersService
  ){  }

  createUser(){
    this.usersService.create({
      name: 'Dev',
      email: 'dev@dev.com',
      password:'123456'
    })
    .subscribe(rta =>{
      console.log(rta)
    })
  }  
  
}
