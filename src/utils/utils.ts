import data from '../data/data.json';
import { Basket } from '../types/Basket';
import { DiscountType } from '../constants/enum/discountType';
import { AppliedOffer, Offer, ProductCondition, SpendCondition } from '../types/AppliedOffers';
import { Currency } from '../constants/enum/currency';

export function displayPriceWithCurrency(price: number) {
  return `${Currency.DEFAULT}${price.toFixed(2)}`;
}

export function calculateCharge(totalAmount: number) {
  if (totalAmount === 0) {
    return 0;
  }
  const deliveryCharge = data.deliveryCharges.find(
    (charge) => charge.min <= totalAmount && (charge.max >= totalAmount || charge.max === -1)
  );
  if (!deliveryCharge) {
    throw new Error('No delivery charge matched.');
  }
  return deliveryCharge.charge;
}

export function applyOffer(basket: Basket): AppliedOffer[] {
  const appliedOffers: AppliedOffer[] = [];
  if (!basket.items.length) {
    return appliedOffers;
  }
  for (const offer of data.offers) {
    if ('minSpend' in offer.conditions) {
      appliedOffers.push(applySpendConditionOffer(basket.originalAmount, offer));
    } else if ('productCode' in offer.conditions && 'minQuantity' in offer.conditions) {
      appliedOffers.push(applyProductConditionOffer(basket, offer));
    }
  }
  return appliedOffers.filter((appliedOffer) => appliedOffer.discount > 0);
}

export function applySpendConditionOffer(originalAmount: number, offer: Offer): AppliedOffer {
  const { minSpend } = offer.conditions as SpendCondition;
  let calculateDiscount = 0;
  if (originalAmount >= minSpend) {
    calculateDiscount = offer.actions.discountValue;
  }
  return { offer: offer, discount: calculateDiscount };
}

export function applyProductConditionOffer(basket: Basket, offer: Offer): AppliedOffer {
  const { minQuantity, productCode } = offer.conditions as ProductCondition;
  let calculatedDiscount = 0;
  const item = basket.items.find((item) => item.product.code === productCode && item.quantity >= minQuantity);
  if (item) {
    const repeated = Math.floor(item.quantity / minQuantity);
    if (offer.actions.discountType === DiscountType.PERCENTAGE) {
      const discount = percentage(offer.actions.discountValue, item.product.price);
      calculatedDiscount = discount * repeated;
    } else if (offer.actions.discountType === DiscountType.DYNAMIC) {
      calculatedDiscount = item.product.price * repeated;
    } else {
      throw new Error('Discount type is unknown.');
    }
  }
  return { discount: calculatedDiscount, offer: offer };
}

export function percentage(percent: number, total: number) {
  return (percent / 100) * total;
}
