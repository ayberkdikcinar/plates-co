import './Product.css';
import React from 'react';
import data from '../../data/data.json';
import ProductItem from './ProductItem';
import { Product } from '../../types/Product';
import ListHeader from '../ListHeader/ListHeader';

export default function ProductList() {
  const products: Product[] = data.products;

  function render() {
    return products.map((product) => <ProductItem key={product.code} product={product} />);
  }

  return (
    <>
      <ListHeader label='Product Catalogue' />
      <div className='product-list'>{render()}</div>
    </>
  );
}
