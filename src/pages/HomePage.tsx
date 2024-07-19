import './HomePage.css';
import ProductList from '../components/Product/ProductList';
import Basket from '../components/Basket/Basket';

export default function HomePage() {
  return (
    <>
      <div data-testid='product-list-comp' className='left-section'>
        <ProductList />
      </div>
      <div className='divider-vertical' />
      <div data-testid='basket-comp' className='right-section section-center'>
        <Basket />
      </div>
    </>
  );
}
