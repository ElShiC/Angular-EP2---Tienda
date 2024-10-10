import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products/product.service';
import { Product } from '../products/products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule], // Asegúrate de que esto esté presente
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {

  productId!: number;
  product: Product | null = null; // Cambia a 'Product | null' para indicar que puede ser null

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    // Obtener el ID del producto desde la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : 0; // Cambiar a 0 o algún valor por defecto

    // Obtener el producto por ID utilizando el servicio
    this.product = this.productService.getProductById(this.productId);

    // Verificar si el producto no existe y manejarlo (opcional)
    if (!this.product) {
      console.error('Producto no encontrado');
    }
  }
}
