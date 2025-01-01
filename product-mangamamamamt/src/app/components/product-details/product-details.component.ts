import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [FormsModule,CommonModule], // Ensure FormsModule is included
})
export class ProductDetailsComponent implements OnInit {
  currentProduct: Product = {
    name: '',
    description: '',
    price: 0,
  };
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getProduct(id);
  }

  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.currentProduct = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateProduct(): void {
    if (this.currentProduct.id) {
      this.productService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe(
        (response) => {
          console.log(response);
          this.message = 'Product updated successfully!';
          
          // Wait for 1 second before navigating back to the product list
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
}
