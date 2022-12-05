import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { Product } from '../components/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShopingCart: Product[] = []
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable()

  constructor() { }

  addProduct(product: Product){
    this.myShopingCart.push(product);
    this.myCart.next(this.myShopingCart);
  }

  getShoppingCart(){
    return this.myShopingCart;
  }

  getTotal(){
    return this.myShopingCart.reduce((sum,item)=> sum + item.price, 0)
  }
}
