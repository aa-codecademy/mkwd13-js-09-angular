import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateProductDto, Product } from '../../models/product.interface';
import { ProductsStateService } from '../../services/products-state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  // TODO: Fetch categories and do not hardcode them.
  // https://fakestoreapi.com/products/categories
  categories = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  isEditMode = signal(false);

  productForm: FormGroup;

  private fb = inject(FormBuilder);
  private productStateService = inject(ProductsStateService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.initForm();

    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(productId);
    if (productId) {
      this.isEditMode.set(true);
      this.loadProductForEdit(+productId);
    } else {
      this.isEditMode.set(false);
    }
  }

  private loadProductForEdit(id: number) {
    this.productStateService.getProduct(id).subscribe({
      next: (product) => {
        console.log('am i here 1', product); // undefined because the products are not yet fetched
        if (!product) return;
        console.log('am i here 2');
        this.preloadFormValues(product);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private preloadFormValues(product: Product) {
    if (this.productForm) {
      this.productForm.patchValue({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        imageUrl: product.image,
      });
    }
  }

  private initForm() {
    // = new FormGroup()
    this.productForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(2),
        ],
      ],
      price: [0, Validators.min(0.1)],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  // TODO: Make onSubmit reusable, meaning if we are in editMode invoke updateProduct, otherwise create the product
  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValues = this.productForm.value;

    console.log(formValues);

    const createProductDto: CreateProductDto = {
      title: formValues.title,
      description: formValues.description,
      image: formValues.image,
      category: formValues.category,
      price: +formValues.price,
    };

    this.productStateService.createProduct(createProductDto);

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }

  // TODO: Handle error messages
  onCancel() {
    this.router.navigate(['/']);
  }
}
