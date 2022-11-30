import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      image: './assets/images/toy.png',
      price: 54500
    },
    {
      id: '2',
      name: 'Product 2',
      image: 'https://lumiere-a.akamaihd.net/v1/images/eu_dsi_toy-story_short-hero_v3_m_481d510f.jpeg?region=0%2C0%2C750%2C668',
      price: 900
    },
    {
      id: '3',
      name: 'Product 3',
      image: './assets/images/toy.png',
      price: 10
    },
    {
      id: '4',
      name: 'Product 4',
      image: './assets/images/toy.png',
      price: 1200
    },
    {
      id: '5',
      name: 'Product 5',
      image: './assets/images/toy.png',
      price: 2500
    },
    {
      id: '6',
      name: 'Product 6',
      image: './assets/images/toy.png',
      price: 500
    },
    {
      id: '7',
      name: 'Product 7',
      image: './assets/images/toy.png',
      price: 750
    },
    {
      id: '8',
      name: 'Product 8',
      image: './assets/images/toy.png',
      price: 800
    },
    {
      id: '9',
      name: 'Product 9',
      image: './assets/images/toy.png',
      price: 900
    },
    {
      id: '10',
      name: 'Product 10',
      image: './assets/images/toy.png',
      price: 10000
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}