import { screen } from '@testing-library/react';
import ProductList from '../ProductList';
import { renderWithProviders } from '../../../utils/test-utils';

describe('Home Page', () => {
  test('Should render product list with 3 items.', async () => {
    renderWithProviders(<ProductList />);

    const productItems = screen.getAllByTestId('product-item-comp');
    expect(productItems.length).toBe(3);
  });
});
