import { Routes } from '@angular/router';
import { Products } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'; // Importar el componente

export const routes: Routes = [
  { path: '', component: Products },  // Ruta raíz que muestra todos los productos
  { path: 'product/:id', component: ProductDetailComponent }  // Ruta dinámica para detalles del producto
];