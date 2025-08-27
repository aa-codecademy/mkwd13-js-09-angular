import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDto, Product } from '../models/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly baseUrl = 'https://fakestoreapi.com/products';

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  createProduct(body: CreateProductDto): Observable<Product> {
    // { body: JSON.stringify(body) } => FETCH
    return this.http.post<Product>(this.baseUrl, body);
  }
}
