import { Injectable } from '@angular/core';
import { Product } from './products.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = [
    { id: 1, product: "Mochila xiaomi", descripcion: "Mochila con cargador con batería super resistente", categoria: "Tecnologia", precio: "1000" },
    { id: 2, product: "Zapatillas nike", descripcion: "Las mejores zapatillas para correr", categoria: "Vestimenta", precio: "120" },
  ];

  // Método para obtener todos los productos
  getProducts() {
    return this.products;
  }

  filterCategory(category: string){
    return this.products.filter((value) => value.categoria === category)
  }

  // Método para obtener un producto por ID
  getProductById(id: number): Product | null {
    const product = this.products.find(p => p.id === id);
    return product ? product : null; // Devuelve el producto o null si no se encuentra
  }

  // Método para agregar un nuevo producto
  addProduct(newProduct: any) {
    const newId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    newProduct.id = newId;
    this.products.push(newProduct);
  }


  deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
