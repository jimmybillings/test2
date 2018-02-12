export enum Api {
  Identities,
  Assets,
  Orders
};

export interface ApiParameters {
  [key: string]: string;
}

export interface ApiBody {
  [key: string]: any;
};

export interface ApiResponse {
  [key: string]: any;
};

export interface ApiErrorResponse {
  status: number | string;
  json?: Function;
}

export type LoadingIndicatorOption = boolean | 'onBeforeRequest' | 'offAfterResponse';

export interface ApiOptions {
  parameters?: ApiParameters;
  body?: ApiBody;
  loadingIndicator?: LoadingIndicatorOption;
  overridingToken?: string;
  headerType?: string;
}
