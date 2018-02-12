import { Observable } from 'rxjs/Observable';

import { FutureApiService } from '../api/api.service';
import { ApiResponse } from '../../shared/interfaces/api.interface';

// Add these to a beforeEach() method with addMatchers(mockApiMatchers).
export { mockApiMatchers } from './mock-api.matchers';

interface CallCounter { get: number; put: number; post: number; delete: number; };

export class MockApiService {
  // Errors:
  // These are normally dormant, but if you set them to something, then the
  // spy's returned Observable will throw your specified error value (instead of
  // emitting the normal response) when the spy is called.
  public getError: any;
  public postError: any;
  public putError: any;
  public deleteError: any;

  private spies: MockApiServiceSpies;
  private apiService: FutureApiService;
  private callCounter: CallCounter = { get: 0, put: 0, post: 0, delete: 0 };

  // Responses:
  // Set these if you care about the contents of a specific response
  // (so you can verify that some other code uses some part of that response).
  //
  // Otherwise, you can just use them as-is to verify that the appropriate
  // response was passed along to some other code.
  //
  // Note also that the initial values for these responses are worthless,
  // but there is *something* in there so that the likelihood of accidentally
  // matching these responses in real specs is almost zero.
  private _getResponse: Array<ApiResponse> = [{ responseFor: 'get' }];
  private _postResponse: Array<ApiResponse> = [{ responseFor: 'post' }];
  private _putResponse: Array<ApiResponse> = [{ responseFor: 'put' }];
  private _deleteResponse: Array<ApiResponse> = [{ responseFor: 'delete' }];

  constructor() {
    this.initialize();
  }

  // Inject this into the service you are testing.
  public get injector(): FutureApiService {
    return this.apiService;
  }

  public get getResponse(): ApiResponse | Array<ApiResponse> {
    return (this._getResponse.length === 1) ? this._getResponse[0] : this._getResponse;
  }

  public set getResponse(response: ApiResponse | Array<ApiResponse>) {
    this._getResponse = (Array.isArray(response)) ? response : [response];
  }

  public get putResponse(): ApiResponse | Array<ApiResponse> {
    return (this._putResponse.length === 1) ? this._putResponse[0] : this._putResponse;
  }

  public set putResponse(response: ApiResponse | Array<ApiResponse>) {
    this._putResponse = (Array.isArray(response)) ? response : [response];
  }

  public get postResponse(): ApiResponse | Array<ApiResponse> {
    return (this._postResponse.length === 1) ? this._postResponse[0] : this._postResponse;
  }

  public set postResponse(response: ApiResponse | Array<ApiResponse>) {
    this._postResponse = (Array.isArray(response)) ? response : [response];
  }

  public get deleteResponse(): ApiResponse | Array<ApiResponse> {
    return (this._deleteResponse.length === 1) ? this._deleteResponse[0] : this._deleteResponse;
  }

  public set deleteResponse(response: ApiResponse | Array<ApiResponse>) {
    this._deleteResponse = (Array.isArray(response)) ? response : [response];
  }

  // Spies:
  // Use these in your jasmine expectations.
  public get get(): jasmine.Spy { return this.spies.get; }
  public get post(): jasmine.Spy { return this.spies.post; }
  public get put(): jasmine.Spy { return this.spies.put; }
  public get delete(): jasmine.Spy { return this.spies.delete; }

  private initialize() {
    this.apiService = new FutureApiService(null, null, null);

    this.spies = {
      get: spyOn(this.apiService, 'get').and.callFake((): any => {
        if (this.getError) {
          return Observable.throw(this.getError);
        } else {
          const counter = this.callCounter.get;
          if (this.callCounter.get !== this._getResponse.length - 1) this.callCounter.get++;
          return Observable.of(this._getResponse[counter]);
        }
      }),

      post: spyOn(this.apiService, 'post').and.callFake((): any => {
        if (this.postError) {
          return Observable.throw(this.postError);
        } else {
          const counter = this.callCounter.post;
          if (this.callCounter.post !== this._postResponse.length - 1) this.callCounter.post++;
          return Observable.of(this._postResponse[counter]);
        }
      }),

      put: spyOn(this.apiService, 'put').and.callFake((): any => {
        if (this.putError) {
          return Observable.throw(this.putError);
        } else {
          const counter = this.callCounter.put;
          if (this.callCounter.put !== this._putResponse.length - 1) this.callCounter.put++;
          return Observable.of(this._putResponse[counter]);
        }
      }),

      delete: spyOn(this.apiService, 'delete').and.callFake((): any => {
        if (this.deleteError) {
          return Observable.throw(this.deleteError);
        } else {
          const counter = this.callCounter.delete;
          if (this.callCounter.delete !== this._deleteResponse.length - 1) this.callCounter.delete++;
          return Observable.of(this._deleteResponse[counter]);
        }
      })
    };
  }
}

interface MockApiServiceSpies { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy; delete: jasmine.Spy; };
