import { MockApiService, mockApiMatchers } from '../../shared/mocks/mock-api.service';
import { Api } from '../interfaces/api.interface';
import { UserService } from './user.service';

export function main() {
  describe('User Service', () => {
    let serviceUnderTest: UserService, mockApi: MockApiService, mockCurrentUserService: any;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApi = new MockApiService();
      mockCurrentUserService = { set: jasmine.createSpy('set') };
      serviceUnderTest = new UserService(mockApi.injector, mockCurrentUserService);
    });

    describe('get()', () => {
      it('Should make a request to get a user', () => {
        serviceUnderTest.get().subscribe((res) => {
          expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
          expect(mockApi.get).toHaveBeenCalledWithEndpoint('user/currentUser');
        });
      });
    });

    describe('getById()', () => {
      it('Should make a request to get a user by id', () => {
        serviceUnderTest.getById(1).subscribe((res) => {
          expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
          expect(mockApi.get).toHaveBeenCalledWithEndpoint('user/1');
        });
      });
    });

    describe('create()', () => {
      it('Should make a request to create a new user', () => {
        serviceUnderTest.create(setUser()).subscribe((res) => {
          expect(mockApi.post).toHaveBeenCalledWithApi(Api.Identities);
          expect(mockApi.post).toHaveBeenCalledWithEndpoint('user/register');
          expect(mockApi.post).toHaveBeenCalledWithLoading(true);
          expect(mockApi.post).toHaveBeenCalledWithBody(setUser());
        });
      });
    });

    describe('forgotPassword()', () => {
      it('Should make a request to get a password reset email', () => {
        serviceUnderTest.forgotPassword(setUser()).subscribe((res) => {
          expect(mockApi.post).toHaveBeenCalledWithApi(Api.Identities);
          expect(mockApi.post).toHaveBeenCalledWithEndpoint('user/requestPasswordReset');
          expect(mockApi.post).toHaveBeenCalledWithLoading(true);
          expect(mockApi.post).toHaveBeenCalledWithBody(setUser());
        });
      });
    });

    describe('resetPassword()', () => {
      it('Should make a request to change a users password with api token', () => {
        serviceUnderTest.resetPassword({ oldPassword: 'abc123', newPassword: 'ABC123' }, '3234234234234').subscribe((res) => {
          expect(mockApi.post).toHaveBeenCalledWithApi(Api.Identities);
          expect(mockApi.post).toHaveBeenCalledWithEndpoint('user/passwordReset');
          expect(mockApi.post).toHaveBeenCalledWithLoading(true);
          expect(mockApi.post).toHaveBeenCalledWithOverridingToken('3234234234234');
          expect(mockApi.post).toHaveBeenCalledWithBody({ newPassword: 'ABC123' });
        });
      });
    });

    describe('downloadActiveTosDocument()', () => {
      beforeEach(() => {
        jasmine.addMatchers(mockApiMatchers);
        mockApi = new MockApiService();
        mockApi.getResponse = [{ id: 1, activeVersionId: 'abcd1234', name: 'TOS' }, { text: () => { return 'text'; } }];
        serviceUnderTest = new UserService(mockApi.injector, null);
      });

      it('hits the API correctly', () => {
        serviceUnderTest.downloadActiveTosDocument();
        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('document/activeVersion/TOS');
      });

      it('Should flatmap the response to make another request', () => {
        serviceUnderTest.downloadActiveTosDocument().take(1).subscribe(data => {
          expect(data).toBe('text');
        });

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('document/downloadDocumentFile/1');
        expect(mockApi.get).toHaveBeenCalledWithHeaderType('download');
      });
    });

    describe('agreeUserToTerms', () => {
      it('hits the API correctly', () => {
        serviceUnderTest.documentId = 1;
        serviceUnderTest.agreeUserToTerms();

        expect(mockApi.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.post).toHaveBeenCalledWithEndpoint('document/version/agree');
        expect(mockApi.post).toHaveBeenCalledWithParameters({ documentId: '1' });
      });
    });

    describe('changePassword', () => {
      it('should call the API correctly', () => {
        serviceUnderTest.changePassword({ oldPassword: '123abc', newPassword: 'abc123' });

        expect(mockApi.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.post).toHaveBeenCalledWithEndpoint('user/changePassword');
        expect(mockApi.post).toHaveBeenCalledWithBody({ oldPassword: '123abc', newPassword: 'abc123' });
        expect(mockApi.post).toHaveBeenCalledWithLoading(true);
      });
    });

    describe('resetPassword', () => {
      it('should call the API correctly', () => {
        serviceUnderTest.resetPassword({ newPassword: 'abc123' }, 'LKJbcd7e2HCD783cd');

        expect(mockApi.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.post).toHaveBeenCalledWithEndpoint('user/passwordReset');
        expect(mockApi.post).toHaveBeenCalledWithBody({ newPassword: 'abc123' });
        expect(mockApi.post).toHaveBeenCalledWithOverridingToken('LKJbcd7e2HCD783cd');
        expect(mockApi.post).toHaveBeenCalledWithLoading(true);
      });
    });

    describe('getAddresses', () => {
      it('should call the API correctly', () => {
        serviceUnderTest.getAddresses();

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('user/currentUsersAssociatedAddresses');
      });

      it('Should parse the response for easier user by the caller', () => {
        mockApi.getResponse = { list: [{ 'address1': {} }, { 'address2': {} }] };
        serviceUnderTest.getAddresses().subscribe(res => {
          expect(res).toEqual([{ 'address1': {} }, { 'address2': {} }]);
        });
      });
    });

    describe('addBillingAddress()', () => {
      it('should call the API correctly', () => {
        localStorage.setItem('currentUser', JSON.stringify({ id: 1, firstName: 'ross' }));
        spyOn(localStorage, 'setItem');
        let mockAddress: any = { address: '123 Oak Street' };
        serviceUnderTest.addBillingAddress(mockAddress).take(1).subscribe();

        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('user/self');
        expect(mockApi.put).toHaveBeenCalledWithBody({
          id: 1, firstName: 'ross', billingInfo: { address: { address: '123 Oak Street' } }
        });
        expect(mockCurrentUserService.set).toHaveBeenCalledWith(mockApi.putResponse);
      });
    });

    describe('addAccountBillingAddress', () => {
      it('should call the API service correctly', () => {
        let mockAddress: any = { addressEntityId: 3, address: { address: '123 Oak Street' } };
        serviceUnderTest.addAccountBillingAddress(mockAddress).take(1).subscribe();

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('account/3');
        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('account/3');
        let expectedBody: any = Object.assign(mockApi.getResponse, { billingInfo: { address: { address: '123 Oak Street' } } });
        expect(mockApi.put).toHaveBeenCalledWithBody(expectedBody);
      });
    });

    describe('getAccount()', () => {
      it('should call the API service correctly', () => {
        serviceUnderTest.getAccount(1).take(1).subscribe();

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('account/1');

      });
    });


    function setUser() {
      return {
        'lastUpdated': '2016-01-14T16:46:21Z',
        'createdOn': '2016-01-14T16:46:21Z',
        'id': 6,
        'emailAddress': 'test_email@email.com',
        'password': '5daf7de08c0014ec2baa13a64b35a4e0',
        'firstName': 'first',
        'lastName': 'last',
        'siteName': 'core',
        'accountIds': [4]
      };
    }
  });
}
