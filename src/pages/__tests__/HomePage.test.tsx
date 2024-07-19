import { screen } from '@testing-library/react';
import HomePage from '../HomePage';
import { renderWithProviders } from '../../utils/test-utils';

describe('Home Page', () => {
  test('Should render product list & basket', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByTestId('basket-comp')).toBeInTheDocument();
    expect(screen.getByTestId('product-list-comp')).toBeInTheDocument();
  });
});
