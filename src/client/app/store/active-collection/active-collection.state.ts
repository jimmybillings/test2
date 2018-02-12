import * as ActiveCollectionActions from './active-collection.actions';
import {
  Collection, CollectionItems, CollectionItemsResponse, CollectionItemMarkersUpdater
} from '../../shared/interfaces/collection.interface';
import { Asset } from '../../shared/interfaces/common.interface';
import { SerializedSubclipMarkers, serialize } from '../../shared/interfaces/subclip-markers';
import { Common } from '../../shared/utilities/common.functions';

export interface State {
  readonly loading: boolean;
  readonly collection: Collection;
};

export const initialState: State = {
  loading: false,
  collection: {
    createdOn: null,
    lastUpdated: null,
    id: null,
    siteName: '',
    name: '',
    owner: 0,
    email: '',
    userRole: '',
    editors: [],
    viewers: [],
    collectionThumbnail: {} as { name: string, urls: { https: string } },
    assets: {
      items: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 100,
        hasNextPage: false,
        hasPreviousPage: false,
        numberOfPages: 0
      },
    },
    tags: [],
    assetsCount: 0
  }
};

export function reducer(state: State = initialState, action: ActiveCollectionActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case ActiveCollectionActions.Load.Type:
    case ActiveCollectionActions.Set.Type:
    case ActiveCollectionActions.LoadPage.Type:
    case ActiveCollectionActions.AddAsset.Type:
    case ActiveCollectionActions.RemoveAsset.Type:
    case ActiveCollectionActions.AddPageOfSearchAssets.Type:
    case ActiveCollectionActions.UpdateAssetMarkers.Type: {
      return {
        ...Common.clone(state),
        loading: true
      };
    }

    case ActiveCollectionActions.LoadSuccess.Type:
    case ActiveCollectionActions.SetSuccess.Type: {
      return {
        ...Common.clone(initialState),
        collection: action.activeCollection,
        loading: false
      };
    }

    case ActiveCollectionActions.LoadPageSuccess.Type:
    case ActiveCollectionActions.UpdateAssetMarkersSuccess.Type: {
      const stateClone: State = Common.clone(state);

      return {
        ...stateClone,
        collection: {
          ...stateClone.collection,
          assets: action.currentPageItems
        },
        loading: false
      };
    }

    case ActiveCollectionActions.AddAssetSuccess.Type: {
      const stateClone: State = Common.clone(state);

      return {
        ...stateClone,
        collection: {
          ...stateClone.collection,
          assets: action.currentPageItems,
          assetsCount: stateClone.collection.assetsCount + 1
        },
        loading: false
      };
    }

    case ActiveCollectionActions.RemoveAssetSuccess.Type: {
      const stateClone: State = Common.clone(state);

      return {
        ...stateClone,
        collection: {
          ...stateClone.collection,
          assets: action.currentPageItems,
          assetsCount: stateClone.collection.assetsCount - 1
        },
        loading: false
      };
    }

    case ActiveCollectionActions.LoadFailure.Type:
    case ActiveCollectionActions.SetFailure.Type:
    case ActiveCollectionActions.LoadPageFailure.Type:
    case ActiveCollectionActions.AddAssetFailure.Type:
    case ActiveCollectionActions.RemoveAssetFailure.Type:
    case ActiveCollectionActions.UpdateAssetMarkersFailure.Type: {
      return {
        ...Common.clone(state),
        loading: false
      };
    }

    case ActiveCollectionActions.AddPageOfSearchAssetsSuccess.Type: {
      const clonedState: State = Common.clone(state);

      return {
        ...clonedState,
        collection: {
          ...clonedState.collection,
          assets: {
            items: action.currentPageItems.items,
            pagination: action.currentPageItems.pagination
          },
          assetsCount: clonedState.collection.assetsCount + action.currentPageItems.totalAssetsAdded
        },
        loading: false
      };
    }

    case ActiveCollectionActions.Reset.Type: {
      return Common.clone(initialState);
    }

    default: {
      return state;
    }
  }
}
