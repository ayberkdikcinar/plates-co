import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { addItem, changeTotalAmount, basketReducer } from './slices/basketSlice';

const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

export { store, addItem, changeTotalAmount };

const rootReducer = combineReducers({
  basket: basketReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
