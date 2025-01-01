import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  currentProduct: Product | null = null;
  currentIndex = -1;
  name = '';

  constructor(
    private productService: ProductService,
    private router: Router // Inject Router here
  ) {}

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  searchName(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data.filter((product) =>
          product.name?.toLowerCase().includes(this.name.toLowerCase())
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteAllProducts(): void {
    this.productService.deleteAllProducts().subscribe(
      () => {
        this.products = [];
        this.currentProduct = null;
        this.currentIndex = -1;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editProduct(): void {
    if (this.currentProduct?.id) {
      // Use Router's navigate method to go to the edit page
      this.router.navigate(['/products', this.currentProduct.id, 'edit']);
    }
  }
}
