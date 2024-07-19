export type AppliedOffer = {
  discount: number;
  offer: Offer;
};

export interface Offer {
  id: string;
  description: string;
  conditions: Conditions;
  actions: {
    discountType: string;
    discountValue: number;
  };
}

interface BaseConditions {}

type Conditions = SpendCondition | ProductCondition;

export interface SpendCondition extends BaseConditions {
  minSpend: number;
}

export interface ProductCondition extends BaseConditions {
  productCode: string;
  minQuantity: number;
}
