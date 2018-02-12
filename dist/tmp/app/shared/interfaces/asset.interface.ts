import { Asset, Pagination, Pojo, Coords } from './common.interface';
import { EnhancedAsset } from './enhanced-asset';
import { SubclipMarkers } from './subclip-markers';
import { FormFields } from './forms.interface';

export interface SpeedviewEvent {
  asset: Asset;
  position: Coords;
}

export type PricingType = 'Royalty Free' | 'Rights Managed' | '';
export interface SpeedviewData {
  noData?: boolean;
  imageQuickView?: boolean;
  price?: number;
  pricingType?: PricingType;
  url?: string;
  posterUrl?: string;
  values?: Array<Pojo>;
  value?: any;
}

export interface RenditionUrl {
  assetId: number;
  asperaSpec?: string;
  mobile?: boolean;
  url?: string;
  useType?: string;
}

export interface DeliveryOption {
  deliveryOptionId: number;
  deliveryOptionLabel?: string;
  deliveryOptionTransferType?: string;
  deliveryOptionUseType?: string;
  deliveryOptionGroupId?: string;
  deliveryOptionGroupOrder?: string;
  renditionUrl?: RenditionUrl;
}

export type DeliveryOptionGroup = Array<DeliveryOption>;

export type DeliveryOptions = Array<DeliveryOptionGroup>;

export interface ApiDeliveryOptions {
  list?: Array<DeliveryOption>;
}

export interface AssetShareDialogOptions {
  enhancedAsset: EnhancedAsset;
  subclipMarkers: SubclipMarkers;
  formFields: FormFields[];
}
