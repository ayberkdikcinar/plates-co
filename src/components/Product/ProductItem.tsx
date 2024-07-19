import { Currency } from '../../constants/enum/currency';
import { Product } from '../../types/Product';
import Button from '../Button/Button';
import { useState } from 'react';
import './Product.css';
import Quantity from '../Quantity/Quantity';
import { BasketItem } from '../../types/Basket';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store';
interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCard = () => {
    const newBasketItem: BasketItem = {
      product,
      quantity,
    };
    dispatch(addItem(newBasketItem));
  };

  return (
    <div data-testid='product-item-comp' className='product-item'>
      <div className='product-details'>
        <p className='product-name'>{product.display_name}</p>
        <p className='product-price'>{`${Currency.DEFAULT}${product.price}`}</p>
      </div>
      <div className='product-footer'>
        <div className='product-btn'>
          <Button primary onClick={handleAddToCard}>
            Add to Cart
          </Button>
        </div>
        <Quantity onQuantityChange={(val) => setQuantity(val)}></Quantity>
      </div>
    </div>
  );
}
