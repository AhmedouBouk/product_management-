import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'add', component: AddProductComponent },
  { 
    path: 'products/:id/edit', 
    component: ProductDetailsComponent
  }
];
