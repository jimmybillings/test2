import * as SearchActions from './search.actions';
import { Asset, Pagination, Store } from '../../shared/interfaces/common.interface';
import { SearchResults } from '../../shared/interfaces/search.interface';
import { Common } from '../../shared/utilities/common.functions';

export interface State {
  loading: boolean;
  results: SearchResults;
}

export const initialState: State = {
  loading: false,
  results: {
    items: [],
    pagination: {
      totalCount: 0,
      pageSize: 100,
      currentPage: 1,
      numberOfPages: 0,
      hasNextPage: false,
      hasPreviousPage: false
    }
  }
};

export function reducer(state: State = initialState, action: SearchActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {

    case SearchActions.LoadResults.Type: {
      const clonedState: State = Common.clone(state);

      return {
        ...clonedState,
        loading: true
      };
    }

    case SearchActions.LoadResultsSuccess.Type: {
      return {
        loading: false,
        results: {
          items: action.results.items,
          pagination: action.results.pagination
        },
      };
    }

    case SearchActions.LoadResultsFailure.Type: {
      const clonedState: State = Common.clone(state);
      return {
        ...clonedState,
        loading: false
      };
    }

    case SearchActions.Reset.Type: {
      return Common.clone(initialState);
    }

    default: {
      return state;
    }

  }
}
