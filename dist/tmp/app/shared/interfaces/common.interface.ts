import { Action } from '@ngrx/store';

export { ViewAddress } from './user.interface';
import { SpeedviewData } from './asset.interface';

export interface Pagination {
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  numberOfPages?: number;
}

export interface Common {
  id?: number;
  siteName?: string;
  createdOn?: Date;
  lastUpdated?: Date;
}

export interface WzEvent {
  type: string;
  payload?: any;
}

export interface Store {
  pagination: Pagination;
}

export interface SelectedPriceAttribute {
  priceAttributeDisplayName: string;
  priceAttributeName: string;
  selectedAttributeName: string;
  selectedAttributeValue: string;
}

export interface UrlParams {
  s?: string;
  d?: string;
  i?: number;
  n?: number;
}

export interface Asset extends Common {
  assetId: number;
  name: string;
  metaData?: { name: string, value: string }[];
  thumbnail?: { name: string, urls: AssetUrls };
  smallPreview?: { name: string, urls: AssetUrls };
  hasDownloadableComp?: boolean;
  transcodeTargets?: string[];
  primary?: Array<{ value: string }>;
  detailTypeMap?: any;
  uuid?: string;
  timeStart?: number;
  timeEnd?: number;
  speedviewData?: SpeedviewData;

  // These were all used in asset-detail.html before its
  // "asset" input was typed.  Unsure if this is the right
  // "Asset" to put these in...  Further analysis is warranted.
  price?: number;
  common?: Array<{ value: string }>;
  clipThumbnailUrl?: string;
  clipUrl?: string;
}

// For assets that have no parent, like Search
export interface SearchAssetLoadParameters {
  readonly id: string;
  readonly share_key?: string;
  readonly timeStart?: string;
  readonly timeEnd?: string;
}

// For assets that are UUID'd children of other objects, like ActiveCollection, Cart, Order, Quote
export interface ChildAssetLoadParameters {
  readonly id: string;
  readonly uuid: string;
  readonly timeStart?: string;
  readonly timeEnd?: string;
}

// Generic combination of SearchAssetLoadParameters and ChildAssetLoadParameters
export interface AssetLoadParameters {
  readonly id: string;
  readonly uuid?: string;
  readonly share_key?: string;
  readonly timeStart?: string;
  readonly timeEnd?: string;
}

export interface AssetUrls {
  http?: string;
  https?: string;
}

export interface AssetShareParameters {
  recipientEmails: string;  // comma-delimited list
  comment: string;
  project?: string;
  copyMe: boolean;
}

export interface CollectionShareParameters {
  recipientEmails: string;  // comma-delimited list
  accessLevel: string;
  comment: string;
  project?: string;
}

export interface Pojo {
  [index: string]: any;
}

export interface Viewport {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

export interface Coords {
  x?: number;
  y?: number;
}

export interface Position {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

export interface Geolocation {
  lat: number;
  lng: number;
}

export interface Circle {
  center: number;
  radius: number;
  getBounds: Function;
}

export interface Autocomplete {
  setBounds: Function;
  addListener: Function;
  getPlace: Function;
}

// Temporary interface -- needed only until we convert all stores to the new AppStore way.
export interface LegacyAction extends Action {
  payload?: any;
}

export interface UiConfigSegment {
  config: {
    [index: string]: any;
  };
};

export interface UiConfigComponents {
  'cart': UiConfigSegment;
  'billing': UiConfigSegment;
  'global': UiConfigSegment;
  'header': UiConfigSegment;
  'footer': UiConfigSegment;
  'searchBox': UiConfigSegment;
  'search': UiConfigSegment;
  'home': UiConfigSegment;
  'userBasicInfo': UiConfigSegment;
  'register': UiConfigSegment;
  'login': UiConfigSegment;
  'forgotPassword': UiConfigSegment;
  'resetPassword': UiConfigSegment;
  'changePassword': UiConfigSegment;
  'collection': UiConfigSegment;
  'assetSharing': UiConfigSegment;
  'collectionSharing': UiConfigSegment;
  'cartComment': UiConfigSegment;
  'collectionComment': UiConfigSegment;
  'quoteComment': UiConfigSegment;
  'playerOverlay': UiConfigSegment;
  [index: string]: UiConfigSegment;
};

export interface AsperaSpec {
  authentication: string;
  direction: string;
  paths: { source: string }[];
  resume: string;
  tags: Pojo;
  token: string;
  remote_user: string;
  remote_host: string;
  ssh_port: number;
  source_root?: string;
  destination_root?: string;
  cipher?: string;
  rate_policy_allowed?: string;
  rate_policy?: string;
  target_rate_kbps?: number;
  min_rate_kbps?: number;
  sshfp?: string;
  fasp_port?: number;
  http_fallback?: boolean;
};

export interface AsperaSpecs {
  transfer_specs: { transfer_spec: AsperaSpec }[];
};

export interface ActivityOptions {
  activityName: string;
  activities: Pojo;
};
