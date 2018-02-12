import { Common } from './common.interface';
import { Account } from './account.interface';

export interface User extends Common {
  password: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  searchConfiguration?: {
    filter: string;
    searchableFields: string[];
    searchResultFields: string[];
    fieldMaps: {};
    typeAheadFields: string[];
    searchFilterTreeId: number
  };
  userName?: string;
  roles?: [
    {
      id: number;
      siteName: string;
      name: string;
      description: string;
      permissions: string[];
      roleAccount: boolean
    }
  ];
  permissions?: string[];
  allUserPermissions?: string[];
  purchaseOnCredit?: boolean;
  phoneNumber?: string;
  zipcode?: string;
  accountIds?: number[];
  accountId?: number;
  ownedCollections?: string[];
  editableCollections?: number[];
  accessibleCollections?: number[];
  focusedCollection?: number;
  root?: boolean;
  billingInfo?: { address: Address };
  [index: string]: any;
  account: Account;
}

export interface UserBasicInfo {
  firstName: string;
  lastName: string;
}

export const AddressKeys: Array<string> = ['address', 'state', 'city', 'country', 'zipcode', 'phone'];

export interface Address {
  address: string;
  address2?: string;
  address3?: string;
  state: string;
  city: string;
  country: string;
  zipcode: string;
  phone: string;
  [index: string]: any;
}

export interface ViewAddress {
  addressEntityId: number;
  defaultAddress: boolean;
  type: 'User' | 'Account';
  name: string;
  address?: Address;
  [index: string]: any;
}
export interface Document extends Common {
  name: string;
  description: string;
  documentType: string;
  documentStatus: string;
  language: string;
  documentContentType: string;
  filename: string;
  fileId: string;
}

export interface GoogleAddressComponent {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

export interface GoogleAddress {
  address_components: Array<GoogleAddressComponent>;
  adr_address: string;
  formatted_address: string;
  geometry: Object;
  html_attributions: Array<any>;
  icon: string;
  id: string;
  place_id: string;
  name: string;
  reference: string;
  scope: string;
  types: Array<string>;
  url: string;
  utc_offset: number;
  vicinity: string;
}

export interface PaymentAddress {
  address: Address;
  creditAccount: string;
  creditOf: string;
  entity: string;
  name: string;
  routingNumber: string;
  swiftCode: string;
}

export interface Payee {
  businessAddress: Address;
  email: string;
  logoUrl: string;
  payeeName: string;
  paymentAddresses: Array<PaymentAddress>;
  taxId: string;
}

export interface FormattedGoogleAddress {
  [index: string]: { long_name: string, short_name: string, [index: string]: any };
}
