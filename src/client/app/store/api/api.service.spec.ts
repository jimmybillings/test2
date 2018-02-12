import { Headers, Response, BaseRequestOptions, RequestMethod, Http, ResponseOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Store } from '@ngrx/store';

import { FutureApiService } from './api.service';
import { Api, ApiResponse } from '../../shared/interfaces/api.interface';
import { ApiConfig } from '../../shared/services/api.config';
import { AppStore } from '../../app.store';
import * as ErrorActions from '../../store/error/error.actions';
import * as LoadingIndicatorActions from '../../store/loading-indicator/loading-indicator.actions';

export function main() {
  describe('Future Api Service', () => {
    let serviceUnderTest: FutureApiService;
    let mockHttp: any;
    let mockApiConfig: any;
    let mockNgrxStore: any;
    let loadingShowSpy: jasmine.Spy;
    let loadingHideSpy: jasmine.Spy;

    const successResponse: Response = new Response({ status: 200, body: '{ "some": "data" }' } as ResponseOptions);
    const error: any = { status: 401 };
    const errorAction: ErrorActions.Handle = new ErrorActions.Handle(error);

    beforeEach(() => {
      mockHttp = {
        request: jasmine.createSpy('request').and.returnValue(Observable.of(successResponse))
      };

      mockApiConfig = {
        headers: (token: string = '') => new Headers({ 'Authorization': token === '' ? 'STANDARD TOKEN' : token }),
        baseUrl: 'BASE/',
        portal: 'PORTAL'
      };

      mockNgrxStore = {
        dispatch: jasmine.createSpy('dispatch')
      };

      serviceUnderTest = new FutureApiService(mockHttp, mockApiConfig, mockNgrxStore);
    });

    ['get', 'post', 'put', 'delete'].forEach(methodName => {
      describe(`${methodName}()`, () => {
        let methodUnderTest: Function;
        let expectedHttpMethod: RequestMethod;

        const getMethodInfoFrom: Function = (methodName: string) => {
          switch (methodName) {
            case 'get': return [serviceUnderTest.get, RequestMethod.Get];
            case 'post': return [serviceUnderTest.post, RequestMethod.Post];
            case 'put': return [serviceUnderTest.put, RequestMethod.Put];
            case 'delete': return [serviceUnderTest.delete, RequestMethod.Delete];
            default: return [undefined, undefined];
          }
        };

        const mostRecentRequest: Function = () => mockHttp.request.calls.mostRecent().args[0];

        beforeEach(() => {
          [methodUnderTest, expectedHttpMethod] = getMethodInfoFrom(methodName);
        });

        it('uses the correct HTTP method', () => {
          methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point');

          expect(mostRecentRequest().method).toEqual(expectedHttpMethod);
        });

        describe('URL', () => {
          it('is correct for all backend APIs', () => {
            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point');
            expect(mostRecentRequest().url).toEqual('BASE/identities-api/v1/end/point?siteName=PORTAL');

            methodUnderTest.call(serviceUnderTest, Api.Assets, 'end/point');
            expect(mostRecentRequest().url).toEqual('BASE/assets-api/v1/end/point?siteName=PORTAL');

            methodUnderTest.call(serviceUnderTest, Api.Orders, 'end/point');
            expect(mostRecentRequest().url).toEqual('BASE/orders-api/v1/end/point?siteName=PORTAL');
          });

          it('is unusable when an undefined backend API is specified', () => {
            methodUnderTest.call(serviceUnderTest, 10836 as Api, 'end/point');

            expect(mostRecentRequest().url).toEqual('BASE/?-api/v?/end/point&siteName=PORTAL');
          });

          it('is correct with no options', () => {
            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point');

            expect(mostRecentRequest().url).toEqual('BASE/identities-api/v1/end/point?siteName=PORTAL');
          });

          it('is correct with parameters', () => {
            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point', { parameters: { a: 'b', c: 'd' } });

            expect(mostRecentRequest().url)
              .toEqual('BASE/identities-api/v1/end/point?a=b&c=d&siteName=PORTAL');
          });

          it('disregards a passed-in siteName parameter', () => {
            spyOn(console, 'error');  // Keep console error out of test output.

            methodUnderTest.call(
              serviceUnderTest, Api.Identities, 'end/point', { parameters: { a: 'b', c: 'd', siteName: 'TEST' } }
            );

            expect(mostRecentRequest().url)
              .toEqual('BASE/identities-api/v1/end/point?a=b&c=d&siteName=PORTAL');
          });
        });

        describe('headers', () => {
          it('is correct with no options', () => {
            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point');

            expect(mostRecentRequest().headers.get('Authorization')).toEqual('STANDARD TOKEN');
          });

          it('is correct with override token', () => {
            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point', { overridingToken: 'OVERRIDING TOKEN' });

            expect(mostRecentRequest().headers.get('Authorization')).toEqual('OVERRIDING TOKEN');
          });
        });

        describe('body', () => {
          it('is just the site name when no body option is specified', () => {
            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point');

            expect(mostRecentRequest()._body).toEqual('{"siteName":"PORTAL"}');
          });

          it('is the specified body plus the site name', () => {
            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point', { body: { a: 'b' } });

            expect(mostRecentRequest()._body).toEqual('{"a":"b","siteName":"PORTAL"}');
          });
        });

        describe('result', () => {
          let mockHandlers: any;

          beforeEach(() => {
            mockHandlers = jasmine.createSpyObj('mockHandlers', ['response', 'error']);
          });

          it('is as expected when the request succeeds', () => {
            let apiResponse: ApiResponse;

            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point').subscribe(
              (response: ApiResponse) => {
                apiResponse = response;
                mockHandlers.response();
              },
              mockHandlers.error
            );

            expect(apiResponse).toEqual({ some: 'data' });
            expect(mockHandlers.response).toHaveBeenCalled();
            expect(mockHandlers.error).not.toHaveBeenCalled();
            expect(mockNgrxStore.dispatch).not.toHaveBeenCalled();
          });

          it('is as expected when the request succeeds with a non-JSON response', () => {
            let apiResponse: ApiResponse;

            mockHttp.request = jasmine.createSpy('request').and.returnValue(Observable.of('Non-JSON!  Ick!'));

            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point').subscribe(
              (response: ApiResponse) => {
                apiResponse = response;
                mockHandlers.response();
              },
              mockHandlers.error
            );

            expect(apiResponse).toEqual('Non-JSON!  Ick!');
            expect(mockHandlers.response).toHaveBeenCalled();
            expect(mockHandlers.error).not.toHaveBeenCalled();
            expect(mockNgrxStore.dispatch).not.toHaveBeenCalled();
          });

          it('is as expected when the request errors', () => {
            let apiError: Error;

            mockHttp.request = jasmine.createSpy('request').and.returnValue(Observable.throw(error));

            methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point').subscribe(
              mockHandlers.response,
              (error: Error) => {
                apiError = error;
                mockHandlers.error();
              }
            );

            expect(apiError).toEqual({ status: 401 });
            expect(mockHandlers.response).not.toHaveBeenCalled();
            expect(mockHandlers.error).toHaveBeenCalled();
            expect(mockNgrxStore.dispatch).not.toHaveBeenCalled();
          });
        });

        describe('loading indicator animation', () => {
          const showAction: LoadingIndicatorActions.Show = new LoadingIndicatorActions.Show();
          const hideAction: LoadingIndicatorActions.Hide = new LoadingIndicatorActions.Hide();

          const nonErrorActionDispatches = () =>
            mockNgrxStore.dispatch.calls.allArgs().filter((arg: any) => arg[0].type !== '[Error] Handle');

          ['succeeds', 'errors'].forEach(result => {
            describe(`when the request ${result}`, () => {
              beforeEach(() => {
                mockHttp.request = jasmine.createSpy('request').and.returnValue(
                  result === 'succeeds' ? Observable.of(successResponse) : Observable.throw(error)
                );
              });

              describe('when loadingIndicator option is not specified', () => {
                it('is not affected', () => {
                  methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point')
                    .subscribe(() => { }, () => { });

                  expect(mockNgrxStore.dispatch.calls.allArgs().filter((arg: any) => arg[0].type !== '[Error] Handle')).toEqual([]);
                });
              });

              describe('when loadingIndicator option is false', () => {
                it('is not affected', () => {
                  methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point', { loadingIndicator: false })
                    .subscribe(() => { }, () => { });

                  expect(nonErrorActionDispatches()).toEqual([]);
                });
              });

              describe('when loadingIndicator option is true', () => {
                it('is started with the request and stopped when the response is returned', () => {
                  methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point', { loadingIndicator: true })
                    .subscribe(() => { }, () => { });

                  expect(nonErrorActionDispatches()).toEqual([[showAction], [hideAction]]);
                });
              });

              describe('when loadingIndicator option is onBeforeRequest', () => {
                it('is only started with the request and not turned off when the response is returned', () => {
                  methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point', { loadingIndicator: 'onBeforeRequest' })
                    .subscribe(() => { }, () => { });

                  expect(nonErrorActionDispatches()).toEqual([[showAction]]);
                });
              });

              describe('when loadingIndicator option is offAfterResponse', () => {
                it('is not started with the request but is stopped when the response is returned', () => {
                  methodUnderTest.call(serviceUnderTest, Api.Identities, 'end/point', { loadingIndicator: 'offAfterResponse' })
                    .subscribe(() => { }, () => { });

                  expect(nonErrorActionDispatches()).toEqual([[hideAction]]);
                });
              });
            });
          });
        });
      });
    });
  });
}
