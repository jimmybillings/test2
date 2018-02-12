import { Action } from '@ngrx/store';
import { SearchParams, SearchResults } from '../../shared/interfaces/search.interface';
import { ApiErrorResponse } from '../../shared/interfaces/api.interface';

export class ActionFactory {
  public loadResults(params: SearchParams): LoadResults {
    return new LoadResults(params);
  }

  public reset(): Reset {
    return new Reset();
  }
}

export class InternalActionFactory extends ActionFactory {
  public loadResultsSuccess(results: SearchResults): LoadResultsSuccess {
    return new LoadResultsSuccess(results);
  }

  public loadResultsFailure(error: ApiErrorResponse): LoadResultsFailure {
    return new LoadResultsFailure(error);
  }
}

export class LoadResults implements Action {
  public static readonly Type = '[Search] Load Results';
  public readonly type = LoadResults.Type;
  constructor(public readonly params: SearchParams) { }
}

export class LoadResultsSuccess implements Action {
  public static readonly Type = '[Search] Load Results Success';
  public readonly type = LoadResultsSuccess.Type;
  constructor(public readonly results: SearchResults) { }
}

export class LoadResultsFailure implements Action {
  public static readonly Type = '[Search] Load Results Failure';
  public readonly type = LoadResultsFailure.Type;
  constructor(public readonly error: ApiErrorResponse) { }
}

export class Reset implements Action {
  public static readonly Type = '[Search] Reset';
  public readonly type = Reset.Type;
}

export type Any = LoadResults | LoadResultsSuccess | Reset | LoadResultsFailure;
