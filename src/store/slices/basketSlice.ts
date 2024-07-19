import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Basket, BasketItem } from '../../types/Basket';

const initialState: Basket = {
  items: [],
  originalAmount: 0, // the amount without offers and charge. (only the item prices).
  totalAmount: 0, //includes the final amount with offers and charge applied.
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<BasketItem>) {
      const item = {
        ...action.payload,
        uid: nanoid(),
      } as BasketItem;

      state.originalAmount += item.product.price * item.quantity;

      const itemIndex = state.items.findIndex((val) => val.product.code === item.product.code);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += item.quantity;
        return;
      }
      state.items.push(item);
    },
    changeTotalAmount(state, action: PayloadAction<number>) {
      state.totalAmount = action.payload;
    },
  },
});

export const { addItem, changeTotalAmount } = basketSlice.actions;
export const basketReducer = basketSlice.reducer;
