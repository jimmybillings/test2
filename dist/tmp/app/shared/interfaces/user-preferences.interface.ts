

export interface UserPreferences {
  collectionTrayIsOpen: boolean;
  searchIsOpen: boolean;
  displayFilterCounts: boolean;
  displayFilterTree: boolean;
  focusedCollection: string;
  sortId: string;
  assetView: 'grid' | 'list';
  pricingPreferences: string;
}
