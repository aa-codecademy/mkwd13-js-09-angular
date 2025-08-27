import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDto, Product } from '../models/product.interface';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ProductsApiService } from './products-api.service';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsStateService {
  private readonly initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
  };

  constructor(private readonly productApiService: ProductsApiService) {}

  private stateSubject = new BehaviorSubject<ProductState>(this.initialState);

  // Observables
  private state$ = this.stateSubject.asObservable();
  products$ = this.state$.pipe(map((state) => state.products));
  loading$ = this.state$.pipe(map((state) => state.loading));
  error$ = this.state$.pipe(map((state) => state.error));

  private updateState(partial: Partial<ProductState>) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...partial });
  }

  loadProducts() {
    this.updateState({ loading: true });

    this.productApiService.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);

        this.updateState({
          products: data,
          loading: false,
        });
      },

      error: (error) => {
        this.updateState({
          loading: false,
          error: 'Failed to load products.',
        });
      },
    });
  }

  createProduct(productData: CreateProductDto) {
    this.updateState({ loading: true });

    const requestBodyWithId = {
      ...productData,
      id: Date.now(),
    };

    this.productApiService.createProduct(requestBodyWithId).subscribe({
      next: (newProduct) => {
        const currentState = this.stateSubject.value;
        this.updateState({
          products: [...currentState.products, newProduct],
          loading: false,
        });
      },

      error: (error) => {
        this.updateState({
          loading: false,
          error: 'Failed to create product',
        });
      },
    });
  }

  getProduct(id: number): Observable<Product | undefined> {
    const currentProducts = this.stateSubject.value.products;
    // TODO: Maybe fetch that product with that id
    const existingProduct = currentProducts.find(
      (product) => product.id === id
    );

    return of(existingProduct);
  }
}
