export interface Gallery {
  results: GalleryResults;
  numberOfLevels: number;
  path: GalleryPath;
}

export type GalleryResults = GalleryResult[];

export interface GalleryResult {
  id: number;
  name: string;
  resultCount: number;
  thumbnailUrl?: string;
  hasMore: boolean;
  children?: GalleryResults;
}

export type GalleryPath = GalleryPathSegment[];

export interface GalleryPathSegment {
  ids: number[];
  names: string[];
}

export interface GalleryNavigationEvent {
  pathSegment: GalleryPathSegment;
  method: 'nextLevel' | 'search';
}
