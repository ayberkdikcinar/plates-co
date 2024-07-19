import './Basket.css';
import { BasketItem } from '../../types/Basket';
import { displayPriceWithCurrency } from '../../utils/utils';

interface BasketItemProps {
  item: BasketItem;
}

export default function BasketItemComponent({ item }: BasketItemProps) {
  return (
    <div className='basket-item'>
      <h5 className='product'>Product: {item.product.code}</h5>
      <h5 className='quantity'>Quantity: {item.quantity}</h5>
      <h5 className='price'>{displayPriceWithCurrency(item.quantity * item.product.price)}</h5>
    </div>
  );
}
