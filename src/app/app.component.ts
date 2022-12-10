import { Component } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imgParent = '';
  token = '';
  imgRta = "";

  constructor(    
    private usersService: UsersService,
    private filesService: FilesService
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

  downloadPDF(){
    this.filesService.getFile('test.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0)
    if (file){
      this.filesService.uploadFile(file)
    .subscribe(rta =>{
      this.imgRta = rta.location;
    })
    }
    
  }
  
}
