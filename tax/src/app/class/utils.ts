import { Decimal } from 'decimal.js';

export class Utils {

    static roundUpToNearest5Cent(numberToRound: Decimal): Decimal {
        const fiveCents = new Decimal(0.05);
        if (numberToRound.mod(fiveCents).isZero()) {
            return numberToRound;
        }
        const multiplier = numberToRound.div(fiveCents).ceil();
        return fiveCents.times(multiplier);
    }

    static toCurrencyNumber(decimal: Decimal): number {
        return decimal.toDecimalPlaces(2).toNumber();
    }

}