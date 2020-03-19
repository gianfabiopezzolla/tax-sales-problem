import { Injectable } from '@angular/core';
import { Product } from '../class/product';
import { ProductCategory } from '../enum/product-category.enum';
import { Decimal } from 'decimal.js';

@Injectable()
export class ProductService {
  products: Product[];
  constructor() {
    this.products = [
      new Product(1, 'book', 1, new Decimal(12.49), ProductCategory.Books),
      new Product(2, 'music CD', 1, new Decimal(14.99), ProductCategory.Other),
      new Product(3, 'chocolate bar', 1, new Decimal(0.85), ProductCategory.Food),
      new Product(4, 'imported box of chocolates', 1, new Decimal(10.00), ProductCategory.Food, true),
      new Product(5, 'imported bottle of perfume', 1, new Decimal(47.50), ProductCategory.Other, true),
      new Product(6, 'imported bottle of perfume', 1, new Decimal(27.99), ProductCategory.Other, true),
      new Product(7, 'bottle of perfume', 1, new Decimal(18.99), ProductCategory.Other),
      new Product(8, 'packet of headache pills', 1, new Decimal(9.75), ProductCategory.MedicalProducts),
      new Product(9, 'box of imported chocolates', 1, new Decimal(11.25), ProductCategory.Food, true),
    ]
  }

  getProducts() {
    return this.products;
  }

  find(id: number): Product {
        return this.products[this.getSelectedIndex(id)];
    }

    private getSelectedIndex(id: number) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                return i;
            }
        }
        return -1;
    }
  

}