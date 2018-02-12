import { Headers } from '@angular/http';
import { ApiConfig } from './api.config';

export function main() {
  let serviceUnderTest: ApiConfig, mockCurrentUserService: any;

  describe('Api Config', () => {
    beforeEach(() => {
      serviceUnderTest = new ApiConfig(null);
    });

    describe('get portalName', () => {
      it('should return null if none is set', () => {
        expect(serviceUnderTest.portal).toBe(null);
      });

      it('should return the name of the portal', () => {
        serviceUnderTest.portal = 'commerce';
        expect(serviceUnderTest.portal).toBe('commerce');
      });
    });

    describe('headers()', () => {
      let loggedIn: boolean;
      let mockCurrentUserService: any;
      let returnedHeaders: Headers;

      beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('token', 'LOGIN_TOKEN');
        mockCurrentUserService = {
          loggedIn: () => loggedIn
        };
      });

      afterEach(() => {
        localStorage.clear();
      });

      it('returns appropriate headers for a logged out user', () => {
        loggedIn = false;
        returnedHeaders = new ApiConfig(mockCurrentUserService).headers();

        expect(returnedHeaders.get('Content-Type')).toEqual('application/json');
        expect(returnedHeaders.get('Accept')).toEqual('application/json');
        expect(returnedHeaders.has('Authorization')).toBe(false);
      });

      it('returns appropriate headers for a logged in user', () => {
        loggedIn = true;
        returnedHeaders = new ApiConfig(mockCurrentUserService).headers();

        expect(returnedHeaders.get('Content-Type')).toEqual('application/json');
        expect(returnedHeaders.get('Accept')).toEqual('application/json');
        expect(returnedHeaders.get('Authorization')).toEqual('Bearer LOGIN_TOKEN');
      });

      it('adds overriding auth header for a logged out user', () => {
        loggedIn = false;
        returnedHeaders = new ApiConfig(mockCurrentUserService).headers('OVERRIDING_TOKEN');

        expect(returnedHeaders.get('Content-Type')).toEqual('application/json');
        expect(returnedHeaders.get('Accept')).toEqual('application/json');
        expect(returnedHeaders.get('Authorization')).toEqual('Bearer OVERRIDING_TOKEN');
      });

      it('overrides the normal auth header for a logged in user', () => {
        loggedIn = true;
        returnedHeaders = new ApiConfig(mockCurrentUserService).headers('OVERRIDING_TOKEN');

        expect(returnedHeaders.get('Content-Type')).toEqual('application/json');
        expect(returnedHeaders.get('Accept')).toEqual('application/json');
        expect(returnedHeaders.get('Authorization')).toEqual('Bearer OVERRIDING_TOKEN');
      });
    });
  });
}
