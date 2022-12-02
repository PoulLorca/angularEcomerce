import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  myShopingCart: Product[] = []
  total = 0;

  products: Product[] = []

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) { 
    this.myShopingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data =>{
      this.products = data;      
    })
  }

  onAddToShopingCart(product: Product){    
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();    
  }

}
