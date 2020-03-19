import { ProductCategory } from "../enum/product-category.enum";
import { Decimal } from "decimal.js";

export class Product {
  id: number;
  name: string;
  quantity: number;
  pricePerUnit: Decimal;
  category: ProductCategory;
  isImported: boolean;

  constructor(
    id: number,
    name: string,
    quantity: number,
    pricePerUnit: Decimal,
    category: ProductCategory,
    isImported: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.pricePerUnit = pricePerUnit;
    this.category = category;
    this.isImported = isImported;
  }
}
