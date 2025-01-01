import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [FormsModule,CommonModule], // Ensure FormsModule is imported
})
export class AddProductComponent {
  product: Product = {
    name: '',
    description: '',
    price: 0,
  };
  submitted = false;

  constructor(private productService: ProductService,private router: Router) {}

  saveProduct(): void {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1000);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      description: '',
      price: 0,
    };
  }
}
