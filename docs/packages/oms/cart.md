# Cart

## Overview

## Cart

Cart is created when a user adds an item to the cart. The cart is stored in Geins under a unique identifier. A cart is stored in Geins for 30 days from the last update.


await geinsOMS.cart.clear(); <--- REMOVES CART and starts new Cart


### Type 
  
```typescript
type CartType {
    id: String
    items: [CartItemType]
    isCompleted: Boolean!
    promoCode: String
    freeShipping: Boolean!
    fixedDiscount: Decimal!
    merchantData: String
    appliedCampaigns: [CampaignRuleType]
    summary: CartSummaryType
}

type CartSummaryType {
  total: PriceType
  subTotal: PriceType
  vats: [VatGroupType]
  fees: CartFeesType
  balance: BalanceType
  fixedAmountDiscountIncVat: Decimal!
  fixedAmountDiscountExVat: Decimal!
  shipping: ShippingOptionType
  payment: PaymentOptionType
}

type CartItemType {
    product: ProductType
    skuId: Int!
    id: ID!
    totalPrice: PriceType
    unitPrice: PriceType
    quantity: Int!
    campaign: CampaignType
    groupKey: ID
    productPackage: ProductPackageCartItemType
    message: String
  }

type VatGroupType {
  rate: Int!
  amount: Decimal!
}
```

## Merchant Data

Template data warnings
free mode. 



### Add Item to Cart

- Id of the cartRow
- SKU id
- Quantity  

Returns bool and updates the cart

Handles sku or id of row

### Remove Item from Cart

### Update Item in Cart



## Shipping

### Types
  
```typescript
type ShippingOptionType {
    id: Int!
    name: String
    displayName: String
    feeIncVat: Decimal!
    feeExVat: Decimal!
    isDefault: Boolean!
    isSelected: Boolean!
    externalId: String
    shippingData: String
    amountLeftToFreeShipping: Decimal!
    logo: String
    subOptions: [ShippingOptionType]
    amountLeftToFreeShippingFormatted: String
    feeIncVatFormatted: String
    feeExVatFormatted: String
}

type PaymentOptionType {
  id: Int!
  name: String
  displayName: String
  logo: String
  feeIncVat: Decimal!
  feeExVat: Decimal!
  isDefault: Boolean!
  isSelected: Boolean!
  paymentType: PaymentType
  paymentData: String
  newCheckoutSession: Boolean!
  feeIncVatFormatted: String
  feeExVatFormatted: String
}
```

### Shipping Methods

### Shipping Address

### Shipping Costs

## Payment

## Types 

```typescript

type PaymentOptionType {
  id: Int!
  name: String
  displayName: String
  logo: String
  feeIncVat: Decimal!
  feeExVat: Decimal!
  isDefault: Boolean!
  isSelected: Boolean!
  paymentType: PaymentType
  paymentData: String
  newCheckoutSession: Boolean!
  feeIncVatFormatted: String
  feeExVatFormatted: String
}

enum PaymentType {
  STANDARD
  KLARNA
  SVEA
  WALLEY
  AVARDA
}

```

### Payment Methods

### Payment Address

### Payment Costs





