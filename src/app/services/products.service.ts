import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../components/models/product.model';
import { catchError, retry, map } from 'rxjs/operators'
import { throwError } from 'rxjs';

import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'api';  //https://young-sands-07814.herokuapp.com/api/products

  constructor(
    private http: HttpClient
  ) { }

  getByCategory(categoryId: string, limit?: number, offset?: number){
    let params = new HttpParams();    
   
    const temp_limit = limit as number;
    const temp_offset = offset as number;

    if(temp_limit?.toString().length > 0 && temp_offset?.toString().length > 0){
      params = params.set('limit', temp_limit);
      params = params.set('offset', temp_offset);
    }

    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params })
  }
  
  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();    
   
    const temp_limit = limit as number;
    const temp_offset = offset as number;

    if(temp_limit?.toString().length > 0 && temp_offset?.toString().length > 0){
      params = params.set('limit', temp_limit);
      params = params.set('offset', temp_offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(item =>{
        return{
          ...item,
          taxes: .19 * item.price
        }
      }))
    );

  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Algo esta fallando en el servidor');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('No estas autorizado para esta operacion');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`,{
      params: {limit, offset}
    });
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string,dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}

