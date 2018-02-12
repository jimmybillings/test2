import { Common, Pagination, Asset, AssetUrls } from './common.interface';
import { SpeedviewData } from './asset.interface';

export interface Collection extends Common {
  name: string;
  owner: number;
  email?: string;
  userRole?: string;
  editors?: CollectionShareMember[];
  viewers?: CollectionShareMember[];
  assets?: CollectionItems;
  tags?: any;
  assetCount?: number;
  editorsCount?: number;
  tagCount?: number;
  collectionThumbnail?: { name: string, urls: { https: string } };
  assetsCount?: number;
  pagination?: Pagination;
}

export interface CollectionSummary {
  items: CollectionSummaryItem[];
  pagination?: Pagination;
}

export interface CollectionSummaryItem {
  assetsCount?: number;
  createdOn?: string;
  email?: string;
  id: number;
  lastUpdated?: string;
  name: string;
  owner: number;
  userRole?: CollectionUserRole;
}

export type CollectionUserRole = 'owner' | 'editor' | 'viewer';

export type CollectionReloadType = 'activeCollection' | 'collections';

export type CollectionActionType = 'create' | 'edit' | 'duplicate';

export interface CollectionsStoreI {
  items: Collection[];
  pagination: Pagination;
}

export interface CollectionItems {
  items?: Asset[];
  pagination?: Pagination;
}

export interface CollectionPaginationParameters {
  currentPage: number; // The first page number is 1.
  pageSize: number;
}

export interface CollectionItemsResponse {
  items: CollectionAssetResponse[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  numberOfPages: number;
}

// Ick.  Same as Asset, except the server returns timeStart and timeEnd as strings for some reason.
export interface CollectionAssetResponse {
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
  timeStart?: string;
  timeEnd?: string;
  speedviewData?: SpeedviewData;

  // These were all used in asset-detail.html before its
  // "asset" input was typed.  Unsure if this is the right
  // "Asset" to put these in...  Further analysis is warranted.
  price?: number;
  common?: Array<{ value: string }>;
  clipThumbnailUrl?: string;
}

export interface AddAssetToCollectionResponse {
  list: [CollectionItemMarkersUpdater];
}
export interface CollectionItemMarkersUpdater {
  uuid: string;
  assetId: number;
  timeStart: string;
  timeEnd: string;
}

export interface CollectionShareMember {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export interface CollectionFormEvent {
  collectionId?: number;
}
