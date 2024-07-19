## How It Works

To start the project, run the command `npm start`. This command initializes the application and fetches data from the `data.json` file. The `data.json` file contains all the necessary information, including products, offers, and delivery charges.

- **Data Fetching:** The application retrieves data from `data.json`, which has structured data.
- **Offer and Delivery Charges Models:** The offers and delivery charges are modeled in TypeScript, with offers including conditions and actions, and delivery charges containing ranges to determine applicable fees based on the basket amount.
- **Redux Integration:** Although Redux is not mandatory for this application, it is used for central management of the basket. This setup demonstrates how Redux can be beneficial in larger applications where multiple components may need to access and manage the basket data.
- **Quantity Management:** The application restricts the quantity selection to a minimum of 1 and a maximum of 10. While there’s no limit on the total quantity that can be added, this constraint ensures a reasonable selection range.
- **Basket Calculation:** The basket calculates two amounts: `originalAmount` (the total of item prices without any discounts or charges) and `totalAmount` (the final amount after applying offers and delivery charges). Discounts and offers are applied based on the `originalAmount`, which is calculated by multiplying the product prices by the quantity added to the basket.

## Assumptions

- Discounts are repeatable; for instance, if there is a "Buy 2, pay 1" offer and you buy 4 items, you will effectively pay for only 2 items.
- I assume that the offers might differ. Therefore, I have added one more offer example, which provides a promotion where you can "Buy four green plates, pay only three." This offer applies when the quantity of the specified product (code G01) is at least 4. The discount type is dynamic, meaning the discount value is calculated based on product price, resulting in a discount of 1 unit for each qualifying offer.
- I used TypeScript to ensure type safety and to provide better development tools and error checking, which can improve code quality and maintainability in larger projects.
- I have structured the offers and delivery charges models on my own. An offer includes details such as the condition and the action that should be taken.
- Delivery charges have entries, and each entry has a range (number). Based on the basket amount, it determines which charge will be applied.
- I used Redux for the basket. While Redux is not required for this application, I thought it would be useful for a larger application with many components that might need to access the basket information. This is why I used Redux for central management of the basket and to demonstrate my ability to use Redux.
- I limited the quantity selection to a minimum of 1 and a maximum of 10. You can add quantities in multiples of 10, with no additional limit.
- The basket includes `originalAmount` and `totalAmount`. `originalAmount` refers to the amount without offers and charges (only the item prices), while `totalAmount` includes the final amount with offers and charges applied.
- All discounts and offers are applied based on the `originalAmount`, which is the product prices multiplied by the quantity added to the basket.

## Test Coverage Results:

![coverage](/src/assets/coverage.png)
