import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { ProductService } from './product.service';

export interface Product {
  id: number;
  product: string;
  descripcion: string;
  categoria: string;
  precio: string;
}

@Component({
  selector: "Products",
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // Agregar RouterModule aquí
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class Products {
  products: Product[] = [];
  
  product: Product = {
    id: 0,
    product: '',
    descripcion: '',
    categoria: '',
    precio: ''
  };

  constructor(private productService: ProductService) {
    // Inicializamos los productos al cargar el componente
    this.products = this.productService.getProducts();
  }

  AgregarProducto(event: Event) {
    event.preventDefault();
    
    if (this.product.product.trim() && this.product.precio) {
      // Crear un nuevo producto y agregarlo utilizando el servicio
      const newProduct = {
        product: this.product.product,
        descripcion: this.product.descripcion,
        categoria: this.product.categoria,
        precio: this.product.precio
      };


      if (newProduct.categoria.trim() === "" || newProduct.descripcion.trim() === "") {
        throw new Error('ingresa nuevamente los datos');
      }
      console.log(newProduct.descripcion.trim(), 'xdd')

      this.productService.addProduct(newProduct);

      // Reiniciar el formulario
      this.product = { id: 0, product: '', descripcion: '', categoria: '', precio: '' };

      // Actualizar la lista de productos
      this.products = this.productService.getProducts();
    }
  }

  FiltrarProductos(event: Event) {
    const categoria = (event.target as HTMLSelectElement).value;

    if(categoria.trim() !== "") {
      console.log(this.productService.filterCategory(categoria))
      this.products = this.productService.filterCategory(categoria)
    } else{
      console.log('no se si funiona')
      this.products = this.productService.getProducts();
    }
  }

  ListarProductos(): Product[] {
    return this.products;
  }

  Eliminar(id: number): void {
    this.productService.deleteProduct(id);
    // Actualizar la lista de productos después de eliminar
    this.products = this.productService.getProducts();
  }
}
