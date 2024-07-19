import './Discount.css';
import { AppliedOffer } from '../../types/AppliedOffers';
import { displayPriceWithCurrency } from '../../utils/utils';

interface DiscountProps {
  appliedOffers: AppliedOffer[];
}

export default function Discount({ appliedOffers }: DiscountProps) {
  if (!appliedOffers.length) {
    return null;
  }
  return (
    <>
      <p className='discount-label'>Applied Discounts</p>
      {appliedOffers.map((appliedOffer) => (
        <div className='discount' key={appliedOffer.offer.id}>
          <p className='item'>{appliedOffer.offer.description}</p>
          <p className=' item total'>- {displayPriceWithCurrency(appliedOffer.discount)}</p>
        </div>
      ))}
    </>
  );
}
