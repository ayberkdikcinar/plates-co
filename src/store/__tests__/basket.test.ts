import { addItem, basketReducer, changeTotalAmount } from '../slices/basketSlice';
import { Basket, BasketItem } from '../../types/Basket';
test('should return the initial state', () => {
  expect(basketReducer(undefined, { type: 'unknown' })).toEqual({ items: [], originalAmount: 0, totalAmount: 0 });
});

test('should handle an item being added to an empty basket', () => {
  const previousState: Basket = {
    items: [],
    originalAmount: 0,
    totalAmount: 0,
  };

  const newItem: BasketItem = {
    product: { display_name: 'R1', code: 'R1', price: 100 },
    quantity: 1,
    uid: 'test-uid-1',
  };

  const expectedState: Basket = {
    items: [
      {
        product: { display_name: 'R1', code: 'R1', price: 100 },
        quantity: 1,
        uid: expect.any(String),
      },
    ],
    originalAmount: 100,
    totalAmount: 0,
  };

  expect(basketReducer(previousState, addItem(newItem))).toEqual(expectedState);
});

test('should add new item to the list if the code of item that being added not exist in the basket', () => {
  const item: BasketItem = {
    product: { display_name: 'R1', code: 'R1', price: 100 },
    quantity: 1,
    uid: 'test-uid-1',
  };

  const previousState: Basket = {
    items: [item],
    originalAmount: 100,
    totalAmount: 0,
  };

  const newItem: BasketItem = {
    product: { display_name: 'B1', code: 'B1', price: 100 },
    quantity: 2,
    uid: 'test-uid-2',
  };

  const nextState = basketReducer(previousState, addItem(newItem));
  expect(nextState.items.length).toBe(2);
  expect(nextState.originalAmount).toBe(newItem.product.price * newItem.quantity + previousState.originalAmount);
});

test('should quantity to be increased when the same item being added to an existing basket', () => {
  const item: BasketItem = {
    product: { display_name: 'R1', code: 'R1', price: 100 },
    quantity: 1,
    uid: 'test-uid-1',
  };

  const previousState: Basket = {
    items: [item],
    originalAmount: 100,
    totalAmount: 0,
  };

  const newItem: BasketItem = {
    product: { display_name: 'R1', code: 'R1', price: 100 },
    quantity: 2,
    uid: 'test-uid-2',
  };

  const nextState = basketReducer(previousState, addItem(newItem));
  expect(nextState.items.length).toBe(1);
  expect(nextState.items.find((i) => i.product.code === item.product.code)?.quantity).toBe(
    newItem.quantity + item.quantity
  );
});

test('should handle total amount change', () => {
  const previousState: Basket = {
    items: [
      {
        product: { display_name: 'R1', code: 'R1', price: 100 },
        quantity: 1,
        uid: 'test-uid-1',
      },
    ],
    originalAmount: 100,
    totalAmount: 0,
  };

  const nextState = basketReducer(previousState, changeTotalAmount(150));
  expect(nextState.totalAmount).toBe(150);
});
