import { mockApiMatchers } from './mock-api.matchers';
import { Api } from '../interfaces/api.interface';

export function main() {
  describe('Mock Api Matchers', () => {
    const matchers = mockApiMatchers as any;
    const whateverApi: Api = 10836 as Api;
    const whateverEndpoint: string = 'dont_care';
    let apiSpy: jasmine.Spy;

    beforeEach(() => apiSpy = jasmine.createSpy('apiSpy'));

    describe('toHaveBeenCalledWithApi()', () => {
      const matcher: jasmine.CustomMatcher = matchers.toHaveBeenCalledWithApi();

      describe('when expecting to have been called with a specific API', () => {
        it('passes when spy was called with a matching API', () => {
          apiSpy(Api.Identities, whateverEndpoint);

          const result = matcher.compare(apiSpy, Api.Identities);

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, Api.Identities);

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with api = Api.Identities, but it was never called.`);
        });

        it('fails when spy was called, but not with the expected API', () => {
          apiSpy(Api.Assets, whateverEndpoint);
          apiSpy(Api.Orders, whateverEndpoint);

          const result = matcher.compare(apiSpy, Api.Identities);

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with api = Api.Identities, but it was called with Api.Assets, Api.Orders.`);
        });

        it('fails when spy was called, but with the wrong argument type', () => {
          apiSpy('blah', whateverEndpoint);
          const result = matcher.compare(apiSpy, Api.Identities);

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual('Expected spy to have been called with api = Api.Identities, but it was called with blah.');
        });
      });

      describe('when expecting NOT to have been called with a specific API', () => {
        it('produces appropriate message when spy is called with a matching API', () => {
          apiSpy(Api.Identities, whateverEndpoint);

          const result = matcher.compare(apiSpy, Api.Identities);

          expect(result.message)
            .toEqual(`Expected spy not to have been called with api = Api.Identities, but it was.`);
        });
      });
    });

    describe('toHaveBeenCalledWithEndpoint()', () => {
      const matcher: jasmine.CustomMatcher = matchers.toHaveBeenCalledWithEndpoint();

      describe('when expecting to have been called with a specific endpoint', () => {
        it('passes when spy was called with a matching endpoint', () => {
          apiSpy(whateverApi, 'end/point');

          const result = matcher.compare(apiSpy, 'end/point');

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, 'end/point');

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with endpoint = 'end/point', but it was never called.`);
        });

        it('fails when spy was called, but not with the expected endpoint', () => {
          apiSpy(whateverApi, 'another/end/point');
          apiSpy(whateverApi, 'different/end/point');

          const result = matcher.compare(apiSpy, 'end/point');

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(
            `Expected spy to have been called with endpoint = 'end/point', ` +
            `but it was called with 'another/end/point', 'different/end/point'.`);
        });
      });

      describe('when expecting NOT to have been called with a specific endpoint', () => {
        it('produces appropriate message when spy is called with a matching endpoint', () => {
          apiSpy(whateverApi, 'end/point');

          const result = matcher.compare(apiSpy, 'end/point');

          expect(result.message)
            .toEqual(`Expected spy not to have been called with endpoint = 'end/point', but it was.`);
        });
      });
    });

    describe('toHaveBeenCalledWithBody()', () => {
      const matcher: jasmine.CustomMatcher = matchers.toHaveBeenCalledWithBody();

      describe('when expecting to have been called with a specific body option', () => {
        it('passes when spy was called with a matching body option', () => {
          apiSpy(whateverApi, whateverEndpoint, { body: { a: 'b' } });

          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with body =\n${JSON.stringify({ a: 'b' }, null, 2)}\n, but it was never called.`);
        });

        it('fails when spy was called, but without any body option', () => {
          apiSpy(whateverApi, whateverEndpoint);
          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with body =\n${JSON.stringify({ a: 'b' }, null, 2)}\n,` +
            ` but it was never called with any body option.`);
        });

        it('fails when spy was called, but not with the expected body option', () => {
          apiSpy(whateverApi, whateverEndpoint, { body: { c: 'd' } });
          apiSpy(whateverApi, whateverEndpoint, { body: { e: 'f' } });
          apiSpy(whateverApi, whateverEndpoint);

          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with body =\n${JSON.stringify({ a: 'b' }, null, 2)}\n,`
            + ` but it was called with \n${JSON.stringify({ c: 'd' }, null, 2)}\n- and -\n${JSON.stringify({ e: 'f' }, null, 2)}.`);
        });
      });

      describe('when expecting NOT to have been called with a specific body option', () => {
        it('produces appropriate message when spy is called with a matching body option', () => {
          apiSpy(whateverApi, whateverEndpoint, { body: { a: 'b' } });

          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.message)
            .toEqual(`Expected spy not to have been called with body =\n${JSON.stringify({ a: 'b' }, null, 2)}\n, but it was.`);
        });
      });

      describe('when expecting to have been called with any body option', () => {
        it('passes when spy was called with a body option', () => {
          apiSpy(whateverApi, whateverEndpoint, { body: { a: 'b' } });
          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(false);
          expect(result.message).toEqual(`Expected spy to have been called with a body option, but it was never called.`);
        });

        it('fails when spy was called, but without a body option', () => {
          apiSpy(whateverApi, whateverEndpoint);

          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(false);
          expect(result.message).toEqual('Expected spy to have been called with a body option, but it was not.');
        });
      });

      describe('when expecting NOT to have been called with any body option', () => {
        it('produces appropriate message when spy is called with a body option', () => {
          apiSpy(whateverApi, whateverEndpoint, { body: { c: 'd' } });

          const result = matcher.compare(apiSpy, undefined);

          expect(result.message)
            .toEqual(`Expected spy not to have been called with a body option, ` +
            `but it was called with \n${JSON.stringify({ c: 'd' }, null, 2)}.`);
        });
      });
    });

    describe('toHaveBeenCalledWithParameters()', () => {
      const matcher: jasmine.CustomMatcher = matchers.toHaveBeenCalledWithParameters();

      describe('when expecting to have been called with a specific parameters option', () => {
        it('passes when spy was called with a matching parameters option', () => {
          apiSpy(whateverApi, whateverEndpoint, { parameters: { a: 'b' } });

          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with `
            + `parameters =\n${JSON.stringify({ a: 'b' }, null, 2)}\n, but it was never called.`);
        });

        it('fails when spy was called, but without a parameters option', () => {
          apiSpy(whateverApi, whateverEndpoint);
          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with`
            + ` parameters =\n${JSON.stringify({ a: 'b' }, null, 2)}\n, `
            + `but it was never called with any parameters option.`);
        });

        it('fails when spy was called, but not with the expected parameters option', () => {
          apiSpy(whateverApi, whateverEndpoint, { parameters: { c: 'd' } });
          apiSpy(whateverApi, whateverEndpoint, { parameters: { e: 'f' } });
          apiSpy(whateverApi, whateverEndpoint);

          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with` +
            ` parameters =\n${JSON.stringify({ a: 'b' }, null, 2)}\n, ` +
            `but it was called with \n${JSON.stringify({ c: 'd' }, null, 2)}\n- ` +
            `and -\n${JSON.stringify({ e: 'f' }, null, 2)}.`);
        });
      });

      describe('when expecting NOT to have been called with a specific parameters option', () => {
        it('produces appropriate message when spy is called with a matching parameters option', () => {
          apiSpy(whateverApi, whateverEndpoint, { parameters: { a: 'b' } });

          const result = matcher.compare(apiSpy, { a: 'b' });

          expect(result.message)
            .toEqual(`Expected spy not to have been called with parameters =\n${JSON.stringify({ a: 'b' }, null, 2)}\n, but it was.`);
        });
      });

      describe('when expecting to have been called with any parameters option', () => {
        it('passes when spy was called with a parameters option', () => {
          apiSpy(whateverApi, whateverEndpoint, { parameters: { a: 'b' } });
          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(false);
          expect(result.message).toEqual(`Expected spy to have been called with a parameters option, but it was never called.`);
        });

        it('fails when spy was called, but without a parameters option', () => {
          apiSpy(whateverApi, whateverEndpoint);

          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(false);
          expect(result.message).toEqual('Expected spy to have been called with a parameters option, but it was not.');
        });
      });

      describe('when expecting NOT to have been called with any parameters option', () => {
        it('produces appropriate message when spy was called with parameters option', () => {
          apiSpy(whateverApi, whateverEndpoint, { parameters: { c: 'd' } });

          const result = matcher.compare(apiSpy, undefined);

          expect(result.message)
            .toEqual(`Expected spy not to have been called with a parameters option, `
            + `but it was called with \n${JSON.stringify({ c: 'd' }, null, 2)}.`);
        });
      });
    });

    describe('toHaveBeenCalledWithLoading()', () => {
      const matcher: jasmine.CustomMatcher = matchers.toHaveBeenCalledWithLoading();

      describe('when expecting to have been called with a specific loadingIndicator option', () => {
        it('passes when spy was called with a matching loadingIndicator option', () => {
          apiSpy(whateverApi, whateverEndpoint, { loadingIndicator: true });

          const result = matcher.compare(apiSpy, true);

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, true);

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with loadingIndicator = true, but it was never called.`);
        });

        it('fails when spy was called, but without a loadingIndicator option', () => {
          apiSpy(whateverApi, whateverEndpoint);
          const result = matcher.compare(apiSpy, true);

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual('Expected spy to have been called with loadingIndicator = true, but it was' +
            ' never called with any loadingIndicator option.');
        });

        it('fails when spy was called, but not with the expected loadingIndicator option', () => {
          apiSpy(whateverApi, whateverEndpoint, { loadingIndicator: false });
          apiSpy(whateverApi, whateverEndpoint);

          const result = matcher.compare(apiSpy, true);

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with loadingIndicator = true, but it was called with false.`);
        });
      });

      describe('when expecting NOT to have been called with a specific loadingIndicator option', () => {
        it('produces appropriate message when spy is called with a matching loadingIndicator option', () => {
          apiSpy(whateverApi, whateverEndpoint, { loadingIndicator: true });

          const result = matcher.compare(apiSpy, true);

          expect(result.message)
            .toEqual(`Expected spy not to have been called with loadingIndicator = true, but it was.`);
        });
      });

      describe('when expecting to have been called with any loadingIndicator option', () => {
        it('passes when spy was called with a loadingIndicator option', () => {
          apiSpy(whateverApi, whateverEndpoint, { loadingIndicator: true });
          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(false);
          expect(result.message).toEqual(`Expected spy to have been called with a loadingIndicator option, but it was never called.`);
        });

        it('fails when spy was called, but without a loadingIndicator option', () => {
          apiSpy(whateverApi, whateverEndpoint);

          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(false);
          expect(result.message).toEqual('Expected spy to have been called with a loadingIndicator option, but it was not.');
        });
      });

      describe('when expecting NOT to have been called with any loadingIndicator option', () => {
        it('produces appropriate message when spy is called with a loadingIndicator option', () => {
          apiSpy(whateverApi, whateverEndpoint, { loadingIndicator: true });

          const result = matcher.compare(apiSpy, undefined);

          expect(result.message)
            .toEqual(`Expected spy not to have been called with a loadingIndicator option, but it was called with true.`);
        });
      });
    });

    describe('toHaveBeenCalledWithOverridingToken()', () => {
      const matcher: jasmine.CustomMatcher = matchers.toHaveBeenCalledWithOverridingToken();

      describe('when expecting to have been called with a specific overridingToken option', () => {
        it('passes when spy was called with a matching overridingToken option', () => {
          apiSpy(whateverApi, whateverEndpoint, { overridingToken: 'some token' });

          const result = matcher.compare(apiSpy, 'some token');

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, 'some token');

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with overridingToken = 'some token', but it was never called.`);
        });

        it('fails when spy was called, but without an overridingToken option', () => {
          apiSpy(whateverApi, whateverEndpoint);
          const result = matcher.compare(apiSpy, 'some token');

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with overridingToken = 'some token', ` +
            `but it was never called with any overridingToken option.`);
        });

        it('fails when spy was called, but not with the expected overridingToken option', () => {
          apiSpy(whateverApi, whateverEndpoint, { overridingToken: 'some other token' });
          apiSpy(whateverApi, whateverEndpoint);

          const result = matcher.compare(apiSpy, 'some token');

          expect(result.pass).toBe(false);
          expect(result.message)
            .toEqual(`Expected spy to have been called with overridingToken = 'some token', but it was called with 'some other token'.`);
        });
      });

      describe('when expecting NOT to have been called with a specific overridingToken option', () => {
        it('produces appropriate message when spy is called with a matching overridingToken option', () => {
          apiSpy(whateverApi, whateverEndpoint, { overridingToken: 'some token' });

          const result = matcher.compare(apiSpy, 'some token');

          expect(result.message)
            .toEqual(`Expected spy not to have been called with overridingToken = 'some token', but it was.`);
        });
      });

      describe('when expecting to have been called with any overridingToken option', () => {
        it('passes when spy was called with an overridingToken option', () => {
          apiSpy(whateverApi, whateverEndpoint, { overridingToken: 'some token' });
          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(true);
        });

        it('fails when spy was never called', () => {
          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(false);
          expect(result.message).toEqual(`Expected spy to have been called with an overridingToken option, but it was never called.`);
        });

        it('fails when spy was called, but without an overridingToken option', () => {
          apiSpy(whateverApi, whateverEndpoint);

          const result = matcher.compare(apiSpy, undefined);

          expect(result.pass).toBe(false);
          expect(result.message).toEqual('Expected spy to have been called with an overridingToken option, but it was not.');
        });
      });

      describe('when expecting NOT to have been called with any overridingToken option', () => {
        it('produces appropriate message when spy is called with an overridingToken option', () => {
          apiSpy(whateverApi, whateverEndpoint, { overridingToken: 'some token' });

          const result = matcher.compare(apiSpy, undefined);

          expect(result.message)
            .toEqual(`Expected spy not to have been called with an overridingToken option, but it was called with 'some token'.`);
        });
      });
    });
  });
}
