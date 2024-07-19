import { render, screen, fireEvent } from '@testing-library/react';
import Quantity from '../Quantity';

describe('Quantity Component', () => {
  test('initial value is set to 1', () => {
    render(<Quantity onQuantityChange={() => {}} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(1);
  });

  test('calls onQuantityChange with correct value when input is changed', () => {
    const onQuantityChangeMock = jest.fn();
    render(<Quantity onQuantityChange={onQuantityChangeMock} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });

    expect(onQuantityChangeMock).toHaveBeenCalledWith(5);
  });

  test('does not accept values less than 1', () => {
    const onQuantityChangeMock = jest.fn();
    render(<Quantity onQuantityChange={onQuantityChangeMock} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '0' } });

    expect(input).toHaveValue(1); // Should default to 1
    expect(onQuantityChangeMock).toHaveBeenCalledWith(1);
  });

  test('does not accept values greater than 10', () => {
    const onQuantityChangeMock = jest.fn();
    render(<Quantity onQuantityChange={onQuantityChangeMock} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '15' } });

    expect(input).toHaveValue(10); // Should cap at 10
    expect(onQuantityChangeMock).toHaveBeenCalledWith(10);
  });

  test('calls onQuantityChange with correct value when input is changed within range', () => {
    const onQuantityChangeMock = jest.fn();
    render(<Quantity onQuantityChange={onQuantityChangeMock} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '7' } });

    expect(input).toHaveValue(7);
    expect(onQuantityChangeMock).toHaveBeenCalledWith(7);
  });
});
