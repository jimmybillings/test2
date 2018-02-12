import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from './current-user.service';
import { User } from '../interfaces/user.interface';

export function main() {
  describe('Current User Service', () => {
    let mockUser: any;
    let mockData: any;
    let mockStore: any;
    let serviceUnderTest: any;

    beforeEach(() => {
      mockUser = {
        'lastUpdated': '2016-01-14T16:46:21Z',
        'createdOn': '2016-01-14T16:46:21Z',
        'id': 6,
        'emailAddress': 'test_email@email.com',
        'password': '5daf7de08c0014ec2baa13a64b35a4e0',
        'firstName': 'first',
        'lastName': 'last',
        'siteName': 'cnn',
        'accountIds': [4],
        'roles': {
          'id': 1,
          'permissions': [
            'ViewClips',
            'ViewCollections',
          ]
        },
        'permissions': [
          'ViewCarts'
        ],
        'allUserPermissions': [
          'ViewClips',
          'ViewCollections',
          'ViewCarts'
        ]
      };
      mockData = {};
      mockStore = {
        select: (_: string) => Observable.of(mockUser),
        dispatch: () => true
      };
      serviceUnderTest = new CurrentUserService(mockStore);
    });

    describe('get state()', () => {
      it('should return the current user from the store', () => {
        const user = serviceUnderTest.state;
        expect(user).toEqual(mockUser);
      });
    });

    describe('hasPermission() - individual permissions', () => {
      it('returns true if a user has a certain permission', () => {
        expect(serviceUnderTest.hasPermission('ViewCarts')).toBe(true);
        expect(serviceUnderTest.hasPermission('ViewCollections')).toBe(true);
        expect(serviceUnderTest.hasPermission('ViewClips')).toBe(true);
      });

      it('returns false if a user doesn\'t have a certain permission', () => {
        expect(serviceUnderTest.hasPermission('Root')).toBe(false);
        expect(serviceUnderTest.hasPermission('NotAPermission')).toBe(false);
      });
    });

    describe('hasPermission() - empty', () => {
      it('Should return an false if has no permissions or roles', () => {
        mockUser = {
          'lastUpdated': '2016-01-14T16:46:21Z',
          'createdOn': '2016-01-14T16:46:21Z',
          'id': 6,
          'emailAddress': 'test_email@email.com',
          'password': '5daf7de08c0014ec2baa13a64b35a4e0',
          'firstName': 'first',
          'lastName': 'last',
          'siteName': 'cnn',
          'accountIds': [4]
        };
        mockData = {};
        mockStore = {
          select: (_: string) => Observable.of(mockUser),
          dispatch: () => true
        };
        serviceUnderTest = new CurrentUserService(mockStore);
        expect(serviceUnderTest.hasPermission('DeleteCollections')).toBe(false);
      });

      it('Should return an false if has role with no permissions', () => {
        mockUser = {
          'lastUpdated': '2016-01-14T16:46:21Z',
          'createdOn': '2016-01-14T16:46:21Z',
          'id': 6,
          'emailAddress': 'test_email@email.com',
          'password': '5daf7de08c0014ec2baa13a64b35a4e0',
          'firstName': 'first',
          'lastName': 'last',
          'siteName': 'cnn',
          'accountIds': [4],
          'roles': [
            {
              'lastUpdated': '2016-09-27T19:02:50Z',
              'createdOn': '2016-09-19T21:25:57Z',
              'id': 1,
              'siteName': 'core',
              'name': 'DefaultUser',
              'description': 'Default User Role for a Registered User'
            }
          ]
        };
        mockData = {};
        mockStore = {
          select: (_: string) => Observable.of(mockUser),
          dispatch: () => true
        };
        serviceUnderTest = new CurrentUserService(mockStore);
        expect(serviceUnderTest.hasPermission('DeleteCollections')).toBe(false);
      });
    });

    describe('CurrentUserService Model', () => {
      let loggedInUser = setLoggedInUser();
      let loggedOutUser = setLoggedOutUser();
      // let loggedInUserWithoutPermissions = setLoggedInUserWithoutPermissions();

      let mockData: any;
      let mockStore: any;
      let serviceUnderTest: any;

      beforeEach(() => {
        mockData = {};
        mockStore = {
          select: (_: string) => Observable.of(setLoggedInUser()),
          dispatch: () => true
        };
        serviceUnderTest = new CurrentUserService(mockStore);
      });

      it('should set a object for a logged in user', () => {
        serviceUnderTest.set(loggedInUser);

        serviceUnderTest.data.subscribe((user: User) => {
          expect(user).toEqual(loggedInUser);
        });

        localStorage.clear();
      });

      it('should add the account to the logged in user', () => {
        serviceUnderTest.set(loggedInUser);
        serviceUnderTest.addAccountToUser({ name: 'some account' });

        expect(localStorage.getItem('currentUser'))
          .toEqual(JSON.stringify({ ...loggedInUser, account: { name: 'some account' } }));
        localStorage.clear();
      });

      it('should return the logged in state for a user', () => {
        serviceUnderTest.loggedInState().subscribe((isLoggedIn: boolean) => {
          expect(isLoggedIn).toBe(true);
        });
      });

      it('should set a object for a logged out user', () => {
        mockData = {};
        mockStore = {
          select: (_: string) => Observable.of(setLoggedOutUser()),
          dispatch: () => true
        };
        serviceUnderTest = new CurrentUserService(mockStore);
        localStorage.clear();
        serviceUnderTest.set();
        serviceUnderTest.data.subscribe((user: User) => {
          expect(user).toEqual(loggedOutUser);
        });
        localStorage.clear();
      });

      it('Should destroy the current user by resetting the user object and clearing localStorage',
        () => {
          spyOn(localStorage, 'removeItem');
          spyOn(serviceUnderTest, 'set');
          serviceUnderTest.destroy();
          expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
          expect(serviceUnderTest.set).toHaveBeenCalled();
        });

      it('should return the correct email address of a user', () => {
        serviceUnderTest.set(loggedInUser);
        serviceUnderTest.data.subscribe((user: User) => {
          expect(user.emailAddress).toEqual('test_email@email.com');
        });
        localStorage.clear();
      });

      it('should return the correct first name of a user', () => {
        serviceUnderTest.set(loggedInUser);
        serviceUnderTest.data.subscribe((user: User) => {
          expect(user.firstName).toEqual('first');
        });
        localStorage.clear();
      });

      it('should return the correct last name of a user', () => {
        serviceUnderTest.set(loggedInUser);
        serviceUnderTest.data.subscribe((user: User) => {
          expect(user.lastName).toEqual('last');
        });
        localStorage.clear();
      });

      it('should return the correct full name of a user', () => {
        serviceUnderTest.set(loggedInUser);
        serviceUnderTest.fullName().subscribe((name: string) => {
          expect(name).toEqual('first last');
        });
        localStorage.clear();
      });

      it('should return the correct accounts of a user', () => {
        serviceUnderTest.set(loggedInUser);
        serviceUnderTest.data.subscribe((user: User) => {
          expect(user.accountIds).toEqual([4]);
        });
        localStorage.clear();
      });

      it('should return the loggedIn state of a user as false', () => {
        mockData = {};
        mockStore = {
          select: (_: string) => Observable.of(setLoggedOutUser()),
          dispatch: () => true
        };
        serviceUnderTest = new CurrentUserService(mockStore);
        expect(serviceUnderTest.loggedIn()).toBe(false);
      });

      it('should return the loggedIn state of a user as true', () => {
        serviceUnderTest.set(setLoggedInUser(), '99e6f262fd358051bf7584e11ec7a3');
        expect(serviceUnderTest.loggedIn()).toBe(true);
        localStorage.clear();
      });
    });

    describe('Current User model - hasPurchaseOnCredit()', () => {
      let mockData: any;
      let mockStore: any;

      beforeEach(() => {
        mockData = {};
        mockStore = {
          select: (_: string) => Observable.of(mockData),
          dispatch: () => true
        };
      });

      it('returns true when the store defines purchaseOnCredit=true', () => {
        mockData = { purchaseOnCredit: true };

        expect(new CurrentUserService(mockStore).hasPurchaseOnCredit()).toBe(true);
      });

      it('returns false when the store defines purchaseOnCredit=false', () => {
        mockData = { purchaseOnCredit: false };

        expect(new CurrentUserService(mockStore).hasPurchaseOnCredit()).toBe(false);
      });

      it('returns false when the store does not define purchaseOnCredit', () => {
        mockData = {};

        expect(new CurrentUserService(mockStore).hasPurchaseOnCredit()).toBe(false);
      });
    });
  });

  function setLoggedInUser() {
    return {
      'lastUpdated': '2016-01-14T16:46:21Z',
      'createdOn': '2016-01-14T16:46:21Z',
      'id': 6,
      'emailAddress': 'test_email@email.com',
      'password': '5daf7de08c0014ec2baa13a64b35a4e0',
      'firstName': 'first',
      'lastName': 'last',
      'siteName': 'cnn',
      'accountIds': [4],
      'permissions': [
        'Root'
      ]
    };
  }

  function setLoggedOutUser(): any {
    return {
      'lastUpdated': '',
      'createdOn': '',
      'id': 0,
      'emailAddress': '',
      'password': '',
      'firstName': '',
      'lastName': '',
      'siteName': '',
      'accountIds': [0],
      'permissions': [''],
      'purchaseOnCredit': false,
      'focusedCollection': null,
      'ownedCollections': null,
      'editableCollections': null,
      'accessibleCollections': null
    };
  }

}
