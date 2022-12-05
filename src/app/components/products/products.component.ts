import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO } from '../models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
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


  constructor(
    private storeService: StoreService,
    private productsService: ProductsService    
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  
  onShowDetail(id: string) {
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
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

}
