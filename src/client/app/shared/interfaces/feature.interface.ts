
export type Feature =
  'disableCollectionAccess' |
  'disableCartAccess' |
  'disableCommerceAgreements';


export interface Features {
  disableCartAccess: boolean;
  disableCommerceAgreements: boolean;
  disableCollectionAccess: boolean;
}
