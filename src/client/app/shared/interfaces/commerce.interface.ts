import { Common, Pagination, Pojo, SelectedPriceAttribute, Store, ViewAddress } from './common.interface';
import { SubclipMarkers } from './subclip-markers';
import { EnhancedAsset } from './enhanced-asset';
import { Address, Document, Payee } from './user.interface';

export type PurchaseType =
  'SystemLicense' |
  'SystemLicenseNoDelivery' |
  'OfflineLicense' |
  'OfflineLicenseNoDelivery' |
  'PrepaySystemLicense' |
  'PrepayOfflineLicense' |
  'Trial' |
  'DeliveryOnly' |
  'ChannelNoDelivery' |
  'RevenueOnly' |
  'PrepayAccess';

export type PaymentOption =
  'Trial' |
  'DeliveryOnly' |
  'PurchaseOnCredit' |
  'CreditCard' |
  'Hold';

export type PaymentType =
  'PurchaseOnCredit' |
  'CreditCard';

export type QuoteStatus = 'ACTIVE' | 'PENDING' | 'ORDERED' | 'EXPIRED' | 'CANCELLED';

export type TranscodeStatus = 'Submitted' | 'Completed' | 'Failed' | 'UrlError' | 'Deleted';

export type OrderStatus = 'ORDER' | 'REFUND';

export type EditableQuoteFields = 'bulkOrderId' | 'discount' | 'purchaseType';

export const quotesWithoutPricing: PurchaseType[] = [
  'Trial',
  'DeliveryOnly'
];

export const quotesAllowedToHaveFeesOnly: PurchaseType[] = [
  'RevenueOnly',
  'PrepayAccess'
];

// Base interfaces

export interface CommonCommerce extends Common {
  projects?: Project[];
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  subTotal?: number;
  creditMemoForProjectId?: number;
  lineItems?: Array<AssetLineItem>;
  feeLineItems?: Array<FeeLineItem>;
  attributes?: Array<SelectedPriceAttribute>;
  [index: string]: any;
}

export interface LineItemNote {
  notes: string[];
}

export interface AssetLineItem {
  id?: string;
  asset?: Asset;
  notes?: Array<LineItemNote>;
  itemPrice?: number;
  multiplier?: number;
  transcodeStatus?: TranscodeStatus;
  downloadUrl?: string;
  asperaSpec?: string;
  tomSubmitTimestamp?: number;
  tomCompleteTimestamp?: number;
  tomTransactionId?: string;
  selectedTranscodeTarget?: string;
  transcodeTargets?: Array<string>;
  expirationDate?: number;
  attributes?: Array<SelectedPriceAttribute>;
  salesForceId?: string;
  price?: number;
  grossAssetPrice?: number;
  rightsManaged?: string;
  externalAgreementIds?: string[];
  overrideGrossAssetPrice?: number;
}

export interface FeeLineItem {
  id?: string;
  amount?: string;
  feeType?: string;
  notes?: string;
  salesForceId?: string;
}

export interface Asset {
  assetId?: number;
  assetName?: string;
  assetDuration?: number;
  metadata?: Metadatum[];
  rightsManaged?: string;
  supplierId?: number;
  supplierName?: string;
  thumbnailUrl?: string;
  timeStart?: number;
  timeEnd?: number;
  clipUrl?: string;
  uuid?: string;
  price?: number;
  masterDownloadUrl?: string;
}

export interface Metadatum {
  name: string;
  value: string;
}

export interface FeeConfigItem {
  id: number;
  siteName: string;
  name: string;
  amount: number;
  financeCode: string;
  paymentRestriction: string;
  accountId: number;
}

export interface FeeConfig {
  items: FeeConfigItem[];
}

// Store initial states

export interface CartState {
  data: Cart;
};

export interface QuoteState {
  data: Quote;
};

export interface FeeConfigState {
  initialized: boolean;
  feeConfig: FeeConfig;
}

// Models

export interface Cart extends CommonCommerce {
  discount?: number;
  itemCount?: number;
  projects?: Project[];
  stripePublicKey?: string;
  subTotal?: number;
  total?: number;
  userId?: number;
}

export interface Order extends CommonCommerce {
  paymentTerms?: string;
  poNumber?: string;
  discount?: number;
  bulkOrderId?: string;
  createdUserId: number;
  ownerUserId: number;
  ownerData?: OwnerData;
  orderAddress?: OrderAddress;
  orderStatus: OrderStatus;
  orderType: PurchaseType;
  paymentType: PaymentType;
  quoteId: number;
  taxAmount: number;
  licenseAgreementId: string;
  refundAmount: number;
  salesVertical: string;
  oldCommerceId: number;
  salesForceId: string;
  createdByIntegration: boolean;
  salesForceSyncedError: boolean;
  paymentBalance: number;
  paymentDueDate?: Date;
  creditMemoForOrderId?: number;
  subTotal?: number;
  total?: number;
  totalDiscountAmount?: number;
}

export interface Quote extends CommonCommerce {
  createdUserId: number;
  ownerUserId: number;
  total: number;
  subTotal?: number;
  quoteStatus: QuoteStatus;
  purchaseType?: PurchaseType;
  projects?: Project[];
  itemCount?: number;
  expirationDate?: string;
  focused?: boolean;
  stripePublicKey?: string;
  bulkOrderId?: string;
  discount?: number;
  externalAgreementIds?: string[];
  internalAgreementIds?: number[];
  externalLicenseIds?: string[];
  internalLicenseIds?: number[];
  billingAccountId?: number;
  invoiceContact?: ViewAddress;
  billingAccountData?: SendDetailsBillingAccount;
  salesManager?: string;
  orderId?: number;
  ownerData?: {
    accountName: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface QuoteEdit {
  data: Quote;
  sendDetails: SendDetails;
  loading: boolean;
}

export interface SendDetails {
  user: SendDetailsUser;
  billingAccount: SendDetailsBillingAccount;
  invoiceContact: SendDetailsInvoiceContact;
  salesManager: SendDetailsSalesManager;
}

export interface SendDetailsUser {
  id?: number;
  accountName?: string;
  customerName?: string;
  email?: string;
  [index: string]: any;
}

export interface SendDetailsBillingAccount {
  id?: number;
  name?: string;
  salesOwner?: string;
  salesManager?: string;
  purchaseOnCredit?: number;
  creditExemption?: number;
  paymentTermsDays?: string;
  readonly readonlyPaymentTermsDays?: string;
  licensingVertical?: string;
  invoiceContactId?: number;
  [index: string]: any;
}

export interface SendDetailsSalesManager {
  expirationDate?: string;
  salesManager?: string;
  offlineAgreement?: string;
  [index: string]: any;
}

export interface SendDetailsInvoiceContact {
  id?: number;
  name?: string;
  contactEmail?: string;
  contacts?: SendDetailsBillingAccount[];
  [index: string]: any;
}

export interface OrdersApiResponse extends Pagination {
  items: Order[];
}

export interface Orders extends Store {
  items: Order[];
}

export interface QuotesApiResponse extends Pagination {
  items: Quote[];
}

export interface Quotes extends Store {
  items: Quote[];
}

export interface AddAssetParameters {
  lineItem: AssetLineItem;
  markers?: SubclipMarkers;
  attributes?: {
    [index: string]: any;
  };
}

export interface QuoteOptions {
  ownerEmail: string;
  expirationDate: string;
  purchaseType: string;
  offlineAgreementId?: string;
  [index: string]: any;
}

export interface CommerceMessage {
  type: string;
  payload?: any;
}

export interface PriceOption {
  amount: number;
  multiplier: boolean;
  name: string;
  value: string;
}

export interface ValidChildChoicesMap {
  // both the keys and the array of strings are PriceAttribute values!
  [key: string]: Array<string>;
}

export interface PriceAttribute {
  attributeList: Array<PriceOption>;
  childId: number;
  createdOn: string;
  displayName: string;
  id: number;
  lastUpdated: string;
  name: string;
  priceModel: string;
  siteName: string;
  validChildChoicesMap: ValidChildChoicesMap;
  primary?: boolean;
}

export interface PricingState {
  priceForDetails: number;
  priceForDialog: number;
}

export interface PurchaseOptions {
  poNumber?: string;
  orderAddressId?: number;
  orderAddressType?: string;
  stripeToken?: string;
  stripeTokenType?: string;
}

export interface PaymentOptions {
  paymentOptions: Array<PaymentOption>;
  explanation: string;
  noCheckout: boolean;
}

export interface LicenseAgreementDocument {
  name: string;
  text: string;
}

export interface LicenseAgreement {
  projectType?: string;
  rights?: string;
  matchingAssets: Array<LicenseAsset | EnhancedAsset>;
  document: LicenseAgreementDocument;
}

export interface LicenseAgreements {
  items: Array<LicenseAgreement>;
}

export interface LicenseAsset {
  assetId: number;
  assetLineItemId: string;
  name: string;
  thumbnailUrl: string;
}

export interface CreditCardAuthorization {
  card: {
    brand: string;
    last4: string;
    exp_month: string;
    exp_year: string;
  };
  error?: {
    code: number;
    param: any;
  };
  id?: string;
  type?: string;
}
export interface OwnerData {
  accountName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
export interface OrderAddress {
  accountId: number;
  accountName?: string;
  billingInfo?: { address: Address; };
  email?: string;
  firstName?: string;
  lastName?: string;
  type: 'User' | 'Account';
}
export interface Invoice {
  licenseDocuments: LicenseAgreements;
  order: Order;
  payee: Payee;
}
