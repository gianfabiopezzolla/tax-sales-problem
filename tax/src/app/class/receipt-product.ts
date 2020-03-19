
import { ProductCategory } from "../enum/product-category.enum";
import { Product } from "./product";
import { Decimal } from 'decimal.js';

export class ReceiptProduct extends Product {

    taxesPerUnit: number;

    constructor(id: number, name: string, quantity: number, pricePerUnit: Decimal, category: ProductCategory, taxesPerUnit: number) {
        super(id, name, quantity, pricePerUnit, category);
        this.taxesPerUnit = taxesPerUnit;
    }

    getTotalPriceWithTaxes(): Decimal {

        return this.pricePerUnit
            .plus(this.taxesPerUnit)
            .times(this.quantity);

    }

}