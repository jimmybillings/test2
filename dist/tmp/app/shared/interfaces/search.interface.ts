import { Asset, Pagination } from './common.interface';

export interface SearchParams {
  i: number;
  n: number;
  q?: string;
  sortId?: number;
  filterIds?: string;
  filterValues?: string;
  gq?: string;
  viewType?: 'list' | 'grid';
  [key: string]: string | number;
}

export interface ApiSearchResults extends Pagination {
  items: Asset[];
}

export interface SearchResults {
  items: Asset[];
  pagination: Pagination;
}
