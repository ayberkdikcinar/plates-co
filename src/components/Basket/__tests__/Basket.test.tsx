import { screen, waitFor } from '@testing-library/react';
import Basket from '../Basket';
import { renderWithProviders } from '../../../utils/test-utils';
import { act } from 'react';
import { addItem } from '../../../store';

describe('Home Page', () => {
  test('Should render basket with empty warning text.', async () => {
    renderWithProviders(<Basket />);

    expect(screen.getByText('Basket')).toBeInTheDocument();
    expect(screen.getByText('The Basket is empty right now!')).toBeInTheDocument();
  });

  test('Should render total amount and delivery charge if any item has been added to the basket', async () => {
    const { store } = renderWithProviders(<Basket />);

    const item = {
      product: { display_name: 'Red Plate', code: 'R1', price: 32.95 },
      quantity: 1,
      uid: 'test-uid',
    };

    await act(async () => {
      store.dispatch(addItem(item));
    });

    await waitFor(() => {
      expect(screen.getByText('Total Amount')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Delivery Charge')).toBeInTheDocument();
    });
  });
});
