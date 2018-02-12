import { MockApiService, mockApiMatchers } from './mock-api.service';
import { FutureApiService } from '../api/api.service';
import { Api, ApiResponse } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Mock Api Service', () => {
    const whateverApi: Api = 10836 as Api;
    const whateverEndpoint: string = 'dont_care';

    let mockApi: MockApiService;

    beforeEach(() => mockApi = new MockApiService());

    describe('mockApi.injector', () => {
      it('is an instance of ApiService', () => {
        expect(mockApi.injector instanceof FutureApiService).toBe(true);
      });

      it('includes get()', () => {
        mockApi.injector.get(whateverApi, whateverEndpoint);

        expect(mockApi.get).toHaveBeenCalled();
      });

      it('includes post()', () => {
        mockApi.injector.post(whateverApi, whateverEndpoint);

        expect(mockApi.post).toHaveBeenCalled();
      });

      it('includes put()', () => {
        mockApi.injector.put(whateverApi, whateverEndpoint);

        expect(mockApi.put).toHaveBeenCalled();
      });

      it('includes delete()', () => {
        mockApi.injector.delete(whateverApi, whateverEndpoint);

        expect(mockApi.delete).toHaveBeenCalled();
      });
    });

    describe('Response', () => {
      let actualResponse: ApiResponse;

      describe('for get()', () => {
        it('has a default value', () => {
          mockApi.injector.get(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toBe(mockApi.getResponse);
        });

        it('can be customized - as an object', () => {
          mockApi.getResponse = { a: 'b' };

          mockApi.injector.get(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });
        });

        it('can be customized - as an array - single index', () => {
          mockApi.getResponse = [{ a: 'b' }];

          mockApi.injector.get(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });
        });

        it('can be customized - as an array - multi index', () => {
          mockApi.getResponse = [{ a: 'b' }, { c: 'd' }];

          // Sort of a dummy assertion to keep branch coverage at 100%
          expect(mockApi.getResponse).toEqual([{ a: 'b' }, { c: 'd' }]);

          mockApi.injector.get(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });

          mockApi.injector.get(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ c: 'd' });
        });
      });

      describe('for post()', () => {
        it('has a default value', () => {
          mockApi.injector.post(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toBe(mockApi.postResponse);
        });

        it('can be customized', () => {
          mockApi.postResponse = { a: 'b' };

          mockApi.injector.post(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });
        });

        it('can be customized - as an array - single index', () => {
          mockApi.postResponse = [{ a: 'b' }];

          mockApi.injector.post(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });
        });

        it('can be customized - as an array - multi index', () => {
          mockApi.postResponse = [{ a: 'b' }, { c: 'd' }];

          // Sort of a dummy assertion to keep branch coverage at 100%
          expect(mockApi.postResponse).toEqual([{ a: 'b' }, { c: 'd' }]);

          mockApi.injector.post(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });

          mockApi.injector.post(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ c: 'd' });
        });
      });

      describe('for put()', () => {
        it('has a default value', () => {
          mockApi.injector.put(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toBe(mockApi.putResponse);
        });

        it('can be customized', () => {
          mockApi.putResponse = { a: 'b' };

          mockApi.injector.put(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });
        });


        it('can be customized - as an array - single index', () => {
          mockApi.putResponse = [{ a: 'b' }];

          mockApi.injector.put(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });
        });

        it('can be customized - as an array - multi index', () => {
          mockApi.putResponse = [{ a: 'b' }, { c: 'd' }];

          // Sort of a dummy assertion to keep branch coverage at 100%
          expect(mockApi.putResponse).toEqual([{ a: 'b' }, { c: 'd' }]);

          mockApi.injector.put(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });

          mockApi.injector.put(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ c: 'd' });
        });
      });

      describe('for delete()', () => {
        it('has a default value', () => {
          mockApi.injector.delete(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toBe(mockApi.deleteResponse);
        });

        it('can be customized', () => {
          mockApi.deleteResponse = { a: 'b' };

          mockApi.injector.delete(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });
        });

        it('can be customized - as an array - single index', () => {
          mockApi.deleteResponse = [{ a: 'b' }];

          mockApi.injector.delete(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });
        });

        it('can be customized - as an array - multi index', () => {
          mockApi.deleteResponse = [{ a: 'b' }, { c: 'd' }];

          // Sort of a dummy assertion to keep branch coverage at 100%
          expect(mockApi.deleteResponse).toEqual([{ a: 'b' }, { c: 'd' }]);

          mockApi.injector.delete(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ a: 'b' });

          mockApi.injector.delete(whateverApi, whateverEndpoint)
            .subscribe(response => actualResponse = response);

          expect(actualResponse).toEqual({ c: 'd' });
        });
      });
    });

    describe('Error', () => {
      let actualError: any;

      describe('for get()', () => {
        it('can be set', () => {
          mockApi.getError = { a: 'b' };

          mockApi.injector.get(whateverApi, whateverEndpoint)
            .subscribe(response => fail(), error => actualError = error);

          expect(actualError).toEqual({ a: 'b' });
        });
      });

      describe('for post()', () => {
        it('can be set', () => {
          mockApi.postError = { a: 'b' };

          mockApi.injector.post(whateverApi, whateverEndpoint)
            .subscribe(response => fail(), error => actualError = error);

          expect(actualError).toEqual({ a: 'b' });
        });
      });

      describe('for put()', () => {
        it('can be set', () => {
          mockApi.putError = { a: 'b' };

          mockApi.injector.put(whateverApi, whateverEndpoint)
            .subscribe(response => fail(), error => actualError = error);

          expect(actualError).toEqual({ a: 'b' });
        });
      });

      describe('for delete()', () => {
        it('can be set', () => {
          mockApi.deleteError = { a: 'b' };

          mockApi.injector.delete(whateverApi, whateverEndpoint)
            .subscribe(response => fail(), error => actualError = error);

          expect(actualError).toEqual({ a: 'b' });
        });
      });
    });

    describe('Custom matchers', () => {
      // By definition, matchers work with any spy.
      // So for this section, we'll just call mockApi.instance.get()
      // and run our expectations on mockApi.get().

      beforeEach(() => jasmine.addMatchers(mockApiMatchers));

      describe('toHaveBeenCalledWithApi()', () => {
        it('works with a positive test and a matching call', () => {
          mockApi.injector.get(Api.Identities, 'some/endpoint');

          expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
        });

        it('works with a negative test and no call at all', () => {
          expect(mockApi.get).not.toHaveBeenCalledWithApi(Api.Assets);
        });

        it('works with a negative test and a non-matching call', () => {
          mockApi.injector.get(Api.Identities, 'some/endpoint');

          expect(mockApi.get).not.toHaveBeenCalledWithApi(Api.Assets);
        });
      });

      describe('toHaveBeenCalledWithEndpoint()', () => {
        it('works with a positive test and a matching call', () => {
          mockApi.injector.get(Api.Identities, 'some/endpoint');

          expect(mockApi.get).toHaveBeenCalledWithEndpoint('some/endpoint');
        });

        it('works with a negative test and no call at all', () => {
          expect(mockApi.get).not.toHaveBeenCalledWithEndpoint('some/endpoint');
        });

        it('works with a negative test and a non-matching call', () => {
          mockApi.injector.get(Api.Identities, 'another/endpoint');

          expect(mockApi.get).not.toHaveBeenCalledWithEndpoint('some/endpoint');
        });
      });

      describe('toHaveBeenCalledWithBody()', () => {
        describe('with a specific expectation', () => {
          it('works with positive test and a matching call', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { body: { a: 'b' } });

            expect(mockApi.get).toHaveBeenCalledWithBody({ a: 'b' });
          });

          it('works with a negative test and no call at all', () => {
            expect(mockApi.get).not.toHaveBeenCalledWithBody({ a: 'b' });
          });

          it('works with a negative test and a call with no option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint');

            expect(mockApi.get).not.toHaveBeenCalledWithBody({ a: 'b' });
          });

          it('works with a negative test and a non-matching call', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { body: { c: 'd' } });

            expect(mockApi.get).not.toHaveBeenCalledWithBody({ a: 'b' });
          });
        });

        describe('without a specific expectation', () => {
          it('works with a positive test and any matching option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { body: { a: 'b' } });

            expect(mockApi.get).toHaveBeenCalledWithBody();
          });

          it('works with a negative test and no call at all', () => {
            expect(mockApi.get).not.toHaveBeenCalledWithBody();
          });

          it('works with a negative test and a call with no option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint');

            expect(mockApi.get).not.toHaveBeenCalledWithBody();
          });
        });
      });

      describe('toHaveBeenCalledWithParameters()', () => {
        describe('with a specific expectation', () => {
          it('works with positive test and a matching call', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { parameters: { a: 'b' } });

            expect(mockApi.get).toHaveBeenCalledWithParameters({ a: 'b' });
          });

          it('works with a negative test and no call at all', () => {
            expect(mockApi.get).not.toHaveBeenCalledWithParameters({ a: 'b' });
          });

          it('works with a negative test and a call with no option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint');

            expect(mockApi.get).not.toHaveBeenCalledWithParameters({ a: 'b' });
          });

          it('works with a negative test and a non-matching call', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { parameters: { c: 'd' } });

            expect(mockApi.get).not.toHaveBeenCalledWithParameters({ a: 'b' });
          });
        });

        describe('without a specific expectation', () => {
          it('works with a positive test and any matching option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { parameters: { a: 'b' } });

            expect(mockApi.get).toHaveBeenCalledWithParameters();
          });

          it('works with a negative test and no call at all', () => {
            expect(mockApi.get).not.toHaveBeenCalledWithParameters();
          });

          it('works with a negative test and a call with no option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint');

            expect(mockApi.get).not.toHaveBeenCalledWithParameters();
          });
        });
      });

      describe('toHaveBeenCalledWithLoading()', () => {
        describe('with a specific expectation', () => {
          it('works with positive test and a matching call', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { loadingIndicator: true });

            expect(mockApi.get).toHaveBeenCalledWithLoading(true);
          });

          it('works with a negative test and no call at all', () => {
            expect(mockApi.get).not.toHaveBeenCalledWithLoading(true);
          });

          it('works with a negative test and a call with no option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint');

            expect(mockApi.get).not.toHaveBeenCalledWithLoading(true);
          });

          it('works with a negative test and a non-matching call', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { loadingIndicator: true });

            expect(mockApi.get).not.toHaveBeenCalledWithLoading(false);
          });
        });

        describe('without a specific expectation', () => {
          it('works with a positive test and any matching option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { loadingIndicator: true });

            expect(mockApi.get).toHaveBeenCalledWithLoading();
          });

          it('works with a negative test and no call at all', () => {
            expect(mockApi.get).not.toHaveBeenCalledWithLoading();
          });

          it('works with a negative test and a call with no option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint');

            expect(mockApi.get).not.toHaveBeenCalledWithLoading();
          });
        });
      });

      describe('toHaveBeenCalledWithOverridingToken()', () => {
        describe('with a specific expectation', () => {
          it('works with positive test and a matching call', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { overridingToken: 'some token' });

            expect(mockApi.get).toHaveBeenCalledWithOverridingToken('some token');
          });

          it('works with a negative test and no call at all', () => {
            expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken('some token');
          });

          it('works with a negative test and a call with no option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint');

            expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken('some token');
          });

          it('works with a negative test and a non-matching call', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { overridingToken: 'some other token' });

            expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken('some token');
          });
        });

        describe('without a specific expectation', () => {
          it('works with a positive test and any matching option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint', { overridingToken: 'some token' });

            expect(mockApi.get).toHaveBeenCalledWithOverridingToken();
          });

          it('works with a negative test and no call at all', () => {
            expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken();
          });

          it('works with a negative test and a call with no option', () => {
            mockApi.injector.get(Api.Identities, 'some/endpoint');

            expect(mockApi.get).not.toHaveBeenCalledWithOverridingToken();
          });
        });
      });
    });
  });
}
