import { displayPriceWithCurrency, calculateCharge, applyOffer, percentage } from '../utils';
import data from '../../data/data.json';
import { Basket } from '../../types/Basket';
import { AppliedOffer } from '../../types/AppliedOffers';
import { Currency } from '../../constants/enum/currency';

const mockDeliveryCharges = [
  { min: 0, max: 50, charge: 5 },
  { min: 51, max: 100, charge: 3 },
  { min: 101, max: -1, charge: 0 },
];

const mockOffers = [
  {
    conditions: { productCode: 'A1', minQuantity: 2 },
    actions: { discountValue: 20, discountType: 'percentage' },
    id: '2',
    description: 'discount 2',
  },
  {
    conditions: { productCode: 'B1', minQuantity: 3 },
    actions: { discountValue: 10, discountType: 'dynamic' },
    id: '1',
    description: 'discount 1',
  },
  {
    conditions: { productCode: 'C1', minQuantity: 2 },
    actions: { discountValue: 20, discountType: 'not_exists' },
    id: '2',
    description: 'discount 3',
  },
];

data.deliveryCharges = mockDeliveryCharges;
data.offers = mockOffers;

describe('Utility Functions', () => {
  test('displayPriceWithCurrency formats price correctly', () => {
    expect(displayPriceWithCurrency(10)).toBe(`${Currency.DEFAULT}10.00`);
    expect(displayPriceWithCurrency(0)).toBe(`${Currency.DEFAULT}0.00`);
    expect(displayPriceWithCurrency(123.456)).toBe(`${Currency.DEFAULT}123.46`);
  });

  test('calculateCharge calculates delivery charge based on total amount', () => {
    expect(calculateCharge(0)).toBe(0);
    expect(calculateCharge(10)).toBe(5);
    expect(calculateCharge(60)).toBe(3);
    expect(calculateCharge(150)).toBe(0);
  });

  test('calculateCharge throws an error if no delivery charge is matched', () => {
    expect(() => calculateCharge(-1)).toThrow('No delivery charge matched.');
  });

  test('applyOffer applies condition offers correctly (percentage)', () => {
    const basket: Basket = {
      items: [{ product: { code: 'A1', display_name: 'A1', price: 50 }, quantity: 2, uid: '333' }],
      originalAmount: 100,
      totalAmount: 0,
    };

    const appliedOffers: AppliedOffer[] = applyOffer(basket);
    expect(appliedOffers.length).toBe(1);
    expect(appliedOffers[0].discount).toBe(10);
  });

  test('applyOffer applies product condition offers correctly (dynamic)', () => {
    const basket: Basket = {
      items: [
        {
          product: {
            code: 'B1',
            price: 50,
            display_name: 'B1',
          },
          quantity: 3,
        },
      ],
      originalAmount: 150,
      totalAmount: 0,
    };

    const appliedOffers: AppliedOffer[] = applyOffer(basket);
    expect(appliedOffers.length).toBe(1);
    expect(appliedOffers[0].discount).toBe(50);
  });

  test('applyOffer returns no offers if basket is empty', () => {
    const basket: Basket = {
      items: [],
      originalAmount: 0,
      totalAmount: 0,
    };

    const appliedOffers: AppliedOffer[] = applyOffer(basket);
    expect(appliedOffers.length).toBe(0);
  });

  test('percentage function calculates percentage correctly', () => {
    expect(percentage(10, 100)).toBe(10);
    expect(percentage(50, 200)).toBe(100);
    expect(percentage(0, 100)).toBe(0);
  });

  test('thow error if the offer discount type does not exists', () => {
    const basket: Basket = {
      items: [
        {
          product: {
            code: 'C1',
            price: 50,
            display_name: 'C1',
          },
          quantity: 2,
        },
      ],
      originalAmount: 150,
      totalAmount: 0,
    };
    expect(() => applyOffer(basket)).toThrow(new Error('Discount type is unknown.'));
  });
});
