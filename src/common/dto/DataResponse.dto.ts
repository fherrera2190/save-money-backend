export interface DataResponseDto {
  itemId: string;
  name: string;
  nameComplete: string;
  ean: string;
  images: Images;
  sellers: Sellers;
}

export interface Images {
  imageId: string;
  imageLabel: string;
  imageTag: string;
  imageUrl: string;
  imageText: string;
  imageLastModified: Date;
}

export interface Sellers {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommertialOffer;
}

export interface CommertialOffer {
  DeliverySlaSamplesPerRegion: DeliverySlaSamplesPerRegion;
  Installments: Installment[];
  DiscountHighLight: any[];
  GiftSkuIds: any[];
  Teasers: any[];
  PromotionTeasers: any[];
  BuyTogether: any[];
  ItemMetadataAttachment: any[];
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  FullSellingPrice: number;
  RewardValue: number;
  PriceValidUntil: Date;
  AvailableQuantity: number;
  IsAvailable: boolean;
  Tax: number;
  DeliverySlaSamples: DeliverySlaSample[];
  GetInfoErrorMessage: null;
  CacheVersionUsedToCallCheckout: string;
  PaymentOptions: PaymentOptions;
}

export interface DeliverySlaSample {
  DeliverySlaPerTypes: any[];
  Region: null;
}

export interface DeliverySlaSamplesPerRegion {
  '0': DeliverySlaSample;
}

export interface Installment {
  Value: number;
  InterestRate: number;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  PaymentSystemName: string;
  PaymentSystemGroupName: string;
  Name: string;
}

export interface PaymentOptions {
  installmentOptions: InstallmentOption[];
  paymentSystems: PaymentSystem[];
  payments: any[];
  giftCards: any[];
  giftCardMessages: any[];
  availableAccounts: any[];
  availableTokens: any[];
}

export interface InstallmentOption {
  paymentSystem: string;
  bin: null;
  paymentName: string;
  paymentGroupName: string;
  value: number;
  installments: InstallmentElement[];
}

export interface InstallmentElement {
  count: number;
  hasInterestRate: boolean;
  interestRate: number;
  value: number;
  total: number;
  sellerMerchantInstallments?: InstallmentElement[];
  id?: ID;
}

export enum ID {
  Alberdisa = 'ALBERDISA',
}

export interface PaymentSystem {
  id: number;
  name: string;
  groupName: string;
  validator: null;
  stringId: string;
  template: string;
  requiresDocument: boolean;
  isCustom: boolean;
  description: null | string;
  requiresAuthentication: boolean;
  dueDate: Date;
  availablePayments: null;
}
