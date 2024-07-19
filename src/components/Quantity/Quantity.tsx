import './Quantity.css';
import React from 'react';

interface QuantityProps {
  onQuantityChange: (value: number) => void;
}

export default function Quantity({ onQuantityChange }: QuantityProps) {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (!value || value < 1) {
      value = 1;
    }
    if (value > 10) {
      value = 10;
    }
    event.target.value = String(value);
    onQuantityChange(value);
  };

  return (
    <div className='container'>
      <label htmlFor='quantity' className='label-quantity'>
        Quantity
      </label>
      <input
        className='input-quantity'
        min='1'
        max='10'
        defaultValue='1'
        name='quantity'
        type='number'
        onChange={handleQuantityChange}
      ></input>
    </div>
  );
}
