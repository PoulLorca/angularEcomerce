import { Component, Input, Output } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];  
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    category:{
      id: '',
      name:''
    },
    description:''
  };  
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  @Output() onLoadMore:
    EventEmitter<string>=new EventEmitter<string>();

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService    
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }  

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  
  onShowDetail(id: string) {
    this.statusDetail = 'loading'
    this.productsService.getProduct(id)
    .subscribe({
      next: (data) => {
      this.toggleProductDetail();
      this.productChosen = data;
      this.statusDetail = 'success'
    },
    error: (errorMsg)=>{    
      this.statusDetail = 'error'      
      Swal.fire({
        title:'Error!',
        text: errorMsg,
        icon:'error',
        confirmButtonText: 'Ok'
      })
    }
  })
  }
  

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'bla bla bla bla',
      price:100,
      images: ['https://placeimg.com/640/480/animals?r=0.437797703929907'],
      categoryId: 2

    }
    this.productsService.create(product)
    .subscribe(data=>{
      console.log('created', data);
      this.products.unshift(data)
    })
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'new title'      
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data=>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

  loadMore(){
    this.onLoadMore.emit();
  }

// loadMore(){
//   this.productsService.getAllProducts(this.limit, this.offset)
//   .subscribe(data => {
//     this.products = this.products.concat(data);
//     this.offset += this.limit;
//   });
// }

}
