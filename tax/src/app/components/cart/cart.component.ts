import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../class/product';
import { Utils } from '../../class/utils';
import { Decimal } from 'decimal.js';
import { ProductCategory } from '../../enum/product-category.enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  static readonly baseTaxPercentage = 10;
  static readonly importTaxPercentage = 5;
  console = console;
  items = [];
  total: Decimal = new Decimal(0);
  salesTaxes: Decimal = new Decimal(0);

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params["id"];
      if (id) {
        let item = {
          product: this.productService.find(id),
          quantity: 1
        };

        if (localStorage.getItem("cart") == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem("cart"));
          let index: number = -1;
          for (let i = 0; i < cart.length; i++) {
            let item = JSON.parse(cart[i]);
            if (item.product.id == id) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem("cart", JSON.stringify(cart));
          } else {
            let item = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        }
        this.loadCart();
      } else {
        this.loadCart();
      }
    });
  }

  public loadCart(): void {
    this.total = new Decimal(0);
    this.salesTaxes = new Decimal(0);
    this.items = [];
    let cart = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);

      let taxesPercentage = new Decimal(0);
      if (!this.isTaxExempt(item.product)) {
        taxesPercentage = taxesPercentage.plus(CartComponent.baseTaxPercentage);
      }
      if (this.isImported(item.product)) {
        taxesPercentage = taxesPercentage.plus(
          CartComponent.importTaxPercentage
        );
      }

      item.tax = this.calculateTaxes(item.product.pricePerUnit, taxesPercentage);

      const totalTaxesForItem = item.tax.times(item.quantity);
      item.subtotal = item.tax.plus(item.product.pricePerUnit * item.quantity);

      this.salesTaxes = this.salesTaxes.plus(totalTaxesForItem);
      this.total = item.tax.plus(this.total.plus(item.product.pricePerUnit * item.quantity));

      this.items.push({
        product: item.product,
        quantity: item.quantity,
        tax: item.tax,
        subtotal: item.subtotal
      });
    }
  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem("cart"));
    let index: number = -1;
    for (let i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  private isImported(product: Product) {
    return product.isImported;
  }

  private isTaxExempt(product: Product): boolean {
    return (
      product.category === ProductCategory.Books ||
      product.category === ProductCategory.Food ||
      product.category === ProductCategory.MedicalProducts
    );
  }

  private calculateTaxes(
    pricePerUnit: Decimal,
    taxesPercentage: Decimal
  ): Decimal {
    let taxesPerUnit = new Decimal(0);
    pricePerUnit = new Decimal(pricePerUnit);
    if (taxesPercentage.isZero()) {
      return taxesPerUnit;
    }

    let actualTaxesPerUnit = pricePerUnit.times(taxesPercentage).div(100);
    taxesPerUnit = Utils.roundUpToNearest5Cent(actualTaxesPerUnit);


    return taxesPerUnit;
  }
}
