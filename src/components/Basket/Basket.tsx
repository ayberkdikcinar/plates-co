import './Basket.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, changeTotalAmount } from '../../store';
import BasketItemComponent from './BasketItem';
import { applyOffer, calculateCharge } from '../../utils/utils';
import { AppliedOffer } from '../../types/AppliedOffers';
import ListHeader from '../ListHeader/ListHeader';
import { useEffect, useMemo } from 'react';
import BasketSummary from './BasketSummary';

export default function Basket() {
  const basket = useSelector((state: RootState) => state.basket);
  const dispatch = useDispatch();
  const appliedOffers = useMemo(() => applyOffer(basket), [basket]);
  const charge = calculateCharge(basket.originalAmount);

  useEffect(() => {
    calculateFinalCost(appliedOffers, charge);
  }, [appliedOffers, charge]);

  function calculateFinalCost(appliedOffers: AppliedOffer[], charge: number) {
    let finalCost = basket.originalAmount;
    for (const appliedOffer of appliedOffers) {
      finalCost -= appliedOffer.discount;
    }
    finalCost += charge;
    dispatch(changeTotalAmount(finalCost));
  }

  function render() {
    if (!basket.items.length) {
      return <div className='warning'>The Basket is empty right now!</div>;
    }
    return (
      <>
        {basket.items.map((item, index) => (
          <BasketItemComponent key={item.uid || index} item={item} />
        ))}
        <BasketSummary
          appliedOffers={appliedOffers}
          charge={charge}
          originalAmount={basket.originalAmount}
          totalAmount={basket.totalAmount}
        />
      </>
    );
  }

  return (
    <div>
      <ListHeader label='Basket' />
      <div className='basket'>{render()}</div>
    </div>
  );
}
