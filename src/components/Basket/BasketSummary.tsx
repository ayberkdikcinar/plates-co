import { AppliedOffer } from '../../types/AppliedOffers';
import Discount from '../Discount/Discount';
import { displayPriceWithCurrency } from '../../utils/utils';

interface BasketSummaryProps {
  originalAmount: number;
  totalAmount: number;
  charge: number;
  appliedOffers: AppliedOffer[];
}

export default function BasketSummary({ originalAmount, totalAmount, charge, appliedOffers }: BasketSummaryProps) {
  return (
    <div className='summary'>
      <div className='summary-row'>
        <p>Amount</p>
        <p>{displayPriceWithCurrency(originalAmount)}</p>
      </div>
      <div className='summary-row'>
        <p>Delivery Charge</p>
        <p className={`${charge > 0 ? 'negative' : 'positive'}`}>{displayPriceWithCurrency(charge)}</p>
      </div>
      <Discount appliedOffers={appliedOffers} />
      <div className='summary-row total-amount'>
        <p>Total Amount</p>
        <p>{displayPriceWithCurrency(totalAmount)}</p>
      </div>
    </div>
  );
}
