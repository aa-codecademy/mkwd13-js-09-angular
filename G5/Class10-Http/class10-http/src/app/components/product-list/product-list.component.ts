import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductsStateService } from '../../services/products-state.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products = signal<Product[]>([]);

  private readonly productStateService = inject(ProductsStateService);
  private readonly router = inject(Router);

  // TODO: Implement unsubscribe
  ngOnInit() {
    this.productStateService.products$.subscribe((products) =>
      this.products.set(products)
    );
  }

  onSelectProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  onDeleteProduct(id: number, event: Event) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    if (confirm('Are you sure that you wanna delete this product?')) {
      // TODO: Implement delete product
    }
  }

  onEditProduct(id: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/products', id, 'edit']);
  }
}
