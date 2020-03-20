import { Injectable } from '@angular/core';
import { Product } from '../class/product';
import { ProductCategory } from '../enum/product-category.enum';
import { Decimal } from 'decimal.js';

@Injectable()
export class ProductService {
  products: Product[];
  constructor() {
    this.products = [
      new Product(
        1,
        'book',
        'https://cdn.pixabay.com/photo/2016/03/27/19/32/blur-1283865_960_720.jpg',
        1,
        new Decimal(12.49),
        ProductCategory.Books),
      new Product(2, 'music CD', 'https://cdn.pixabay.com/photo/2015/07/28/13/21/cd-864404_960_720.jpg', 1, new Decimal(14.99), ProductCategory.Other),
      new Product(3, 'chocolate bar', 'https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_960_720.jpg', 1, new Decimal(0.85), ProductCategory.Food),
      new Product(4, 'imported box of chocolates', 'https://cdn.pixabay.com/photo/2020/01/05/18/12/chocolates-4743755_960_720.jpg', 1, new Decimal(10.00), ProductCategory.Food, true),
      new Product(5, 'imported bottle of perfume', 'https://cdn.pixabay.com/photo/2017/03/14/11/39/perfume-2142817_960_720.jpg', 1, new Decimal(47.50), ProductCategory.Other, true),
      new Product(6, 'imported bottle of perfume', 'https://cdn.pixabay.com/photo/2017/08/02/23/40/perfume-2574073_960_720.jpg', 1, new Decimal(27.99), ProductCategory.Other, true),
      new Product(7, 'bottle of perfume', 'https://cdn.pixabay.com/photo/2017/10/03/12/07/bottle-2812214_960_720.jpg', 1, new Decimal(18.99), ProductCategory.Other),
      new Product(8, 'packet of headache pills','https://cdn.pixabay.com/photo/2020/01/10/14/48/aspirine-4755456_960_720.jpg', 1, new Decimal(9.75), ProductCategory.MedicalProducts),
      new Product(9, 'box of imported chocolates','https://cdn.pixabay.com/photo/2018/01/29/12/20/chocolates-3115991_960_720.jpg', 1, new Decimal(11.25), ProductCategory.Food, true),
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