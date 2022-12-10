import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from '../../../models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter =  0;  
  profile: User | null = null;
  categories: Category[] = []; 

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
    this.getAllCateories();
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login() {
    // this.authService.login('dev@dev.com', '123456')
    // .subscribe(rta => {
    //   this.token = rta.access_token;
    //   console.log(this.token);
    //   this.getProfile();
    // });
    this.authService.loginAndGet('dev@dev.com', '123456')
    .subscribe(user => {
      this.profile = user;      
    });
  }    

  getAllCateories(){    
    this.categoriesService.getAll()
    .subscribe(data=>{
      this.categories = data
    })
  }

}
