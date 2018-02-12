"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var current_user_service_1 = require("./current-user.service");
function main() {
    describe('Current User Service', function () {
        var mockUser;
        var mockData;
        var mockStore;
        var serviceUnderTest;
        beforeEach(function () {
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
                select: function (_) { return Observable_1.Observable.of(mockUser); },
                dispatch: function () { return true; }
            };
            serviceUnderTest = new current_user_service_1.CurrentUserService(mockStore);
        });
        describe('get state()', function () {
            it('should return the current user from the store', function () {
                var user = serviceUnderTest.state;
                expect(user).toEqual(mockUser);
            });
        });
        describe('hasPermission() - individual permissions', function () {
            it('returns true if a user has a certain permission', function () {
                expect(serviceUnderTest.hasPermission('ViewCarts')).toBe(true);
                expect(serviceUnderTest.hasPermission('ViewCollections')).toBe(true);
                expect(serviceUnderTest.hasPermission('ViewClips')).toBe(true);
            });
            it('returns false if a user doesn\'t have a certain permission', function () {
                expect(serviceUnderTest.hasPermission('Root')).toBe(false);
                expect(serviceUnderTest.hasPermission('NotAPermission')).toBe(false);
            });
        });
        describe('hasPermission() - empty', function () {
            it('Should return an false if has no permissions or roles', function () {
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
                    select: function (_) { return Observable_1.Observable.of(mockUser); },
                    dispatch: function () { return true; }
                };
                serviceUnderTest = new current_user_service_1.CurrentUserService(mockStore);
                expect(serviceUnderTest.hasPermission('DeleteCollections')).toBe(false);
            });
            it('Should return an false if has role with no permissions', function () {
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
                    select: function (_) { return Observable_1.Observable.of(mockUser); },
                    dispatch: function () { return true; }
                };
                serviceUnderTest = new current_user_service_1.CurrentUserService(mockStore);
                expect(serviceUnderTest.hasPermission('DeleteCollections')).toBe(false);
            });
        });
        describe('CurrentUserService Model', function () {
            var loggedInUser = setLoggedInUser();
            var loggedOutUser = setLoggedOutUser();
            var mockData;
            var mockStore;
            var serviceUnderTest;
            beforeEach(function () {
                mockData = {};
                mockStore = {
                    select: function (_) { return Observable_1.Observable.of(setLoggedInUser()); },
                    dispatch: function () { return true; }
                };
                serviceUnderTest = new current_user_service_1.CurrentUserService(mockStore);
            });
            it('should set a object for a logged in user', function () {
                serviceUnderTest.set(loggedInUser);
                serviceUnderTest.data.subscribe(function (user) {
                    expect(user).toEqual(loggedInUser);
                });
                localStorage.clear();
            });
            it('should add the account to the logged in user', function () {
                serviceUnderTest.set(loggedInUser);
                serviceUnderTest.addAccountToUser({ name: 'some account' });
                expect(localStorage.getItem('currentUser'))
                    .toEqual(JSON.stringify(__assign({}, loggedInUser, { account: { name: 'some account' } })));
                localStorage.clear();
            });
            it('should return the logged in state for a user', function () {
                serviceUnderTest.loggedInState().subscribe(function (isLoggedIn) {
                    expect(isLoggedIn).toBe(true);
                });
            });
            it('should set a object for a logged out user', function () {
                mockData = {};
                mockStore = {
                    select: function (_) { return Observable_1.Observable.of(setLoggedOutUser()); },
                    dispatch: function () { return true; }
                };
                serviceUnderTest = new current_user_service_1.CurrentUserService(mockStore);
                localStorage.clear();
                serviceUnderTest.set();
                serviceUnderTest.data.subscribe(function (user) {
                    expect(user).toEqual(loggedOutUser);
                });
                localStorage.clear();
            });
            it('Should destroy the current user by resetting the user object and clearing localStorage', function () {
                spyOn(localStorage, 'removeItem');
                spyOn(serviceUnderTest, 'set');
                serviceUnderTest.destroy();
                expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
                expect(serviceUnderTest.set).toHaveBeenCalled();
            });
            it('should return the correct email address of a user', function () {
                serviceUnderTest.set(loggedInUser);
                serviceUnderTest.data.subscribe(function (user) {
                    expect(user.emailAddress).toEqual('test_email@email.com');
                });
                localStorage.clear();
            });
            it('should return the correct first name of a user', function () {
                serviceUnderTest.set(loggedInUser);
                serviceUnderTest.data.subscribe(function (user) {
                    expect(user.firstName).toEqual('first');
                });
                localStorage.clear();
            });
            it('should return the correct last name of a user', function () {
                serviceUnderTest.set(loggedInUser);
                serviceUnderTest.data.subscribe(function (user) {
                    expect(user.lastName).toEqual('last');
                });
                localStorage.clear();
            });
            it('should return the correct full name of a user', function () {
                serviceUnderTest.set(loggedInUser);
                serviceUnderTest.fullName().subscribe(function (name) {
                    expect(name).toEqual('first last');
                });
                localStorage.clear();
            });
            it('should return the correct accounts of a user', function () {
                serviceUnderTest.set(loggedInUser);
                serviceUnderTest.data.subscribe(function (user) {
                    expect(user.accountIds).toEqual([4]);
                });
                localStorage.clear();
            });
            it('should return the loggedIn state of a user as false', function () {
                mockData = {};
                mockStore = {
                    select: function (_) { return Observable_1.Observable.of(setLoggedOutUser()); },
                    dispatch: function () { return true; }
                };
                serviceUnderTest = new current_user_service_1.CurrentUserService(mockStore);
                expect(serviceUnderTest.loggedIn()).toBe(false);
            });
            it('should return the loggedIn state of a user as true', function () {
                serviceUnderTest.set(setLoggedInUser(), '99e6f262fd358051bf7584e11ec7a3');
                expect(serviceUnderTest.loggedIn()).toBe(true);
                localStorage.clear();
            });
        });
        describe('Current User model - hasPurchaseOnCredit()', function () {
            var mockData;
            var mockStore;
            beforeEach(function () {
                mockData = {};
                mockStore = {
                    select: function (_) { return Observable_1.Observable.of(mockData); },
                    dispatch: function () { return true; }
                };
            });
            it('returns true when the store defines purchaseOnCredit=true', function () {
                mockData = { purchaseOnCredit: true };
                expect(new current_user_service_1.CurrentUserService(mockStore).hasPurchaseOnCredit()).toBe(true);
            });
            it('returns false when the store defines purchaseOnCredit=false', function () {
                mockData = { purchaseOnCredit: false };
                expect(new current_user_service_1.CurrentUserService(mockStore).hasPurchaseOnCredit()).toBe(false);
            });
            it('returns false when the store does not define purchaseOnCredit', function () {
                mockData = {};
                expect(new current_user_service_1.CurrentUserService(mockStore).hasPurchaseOnCredit()).toBe(false);
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
    function setLoggedOutUser() {
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
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvY3VycmVudC11c2VyLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOENBQTZDO0FBQzdDLCtEQUE0RDtBQUc1RDtJQUNFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLFFBQWEsQ0FBQztRQUNsQixJQUFJLFFBQWEsQ0FBQztRQUNsQixJQUFJLFNBQWMsQ0FBQztRQUNuQixJQUFJLGdCQUFxQixDQUFDO1FBRTFCLFVBQVUsQ0FBQztZQUNULFFBQVEsR0FBRztnQkFDVCxhQUFhLEVBQUUsc0JBQXNCO2dCQUNyQyxXQUFXLEVBQUUsc0JBQXNCO2dCQUNuQyxJQUFJLEVBQUUsQ0FBQztnQkFDUCxjQUFjLEVBQUUsc0JBQXNCO2dCQUN0QyxVQUFVLEVBQUUsa0NBQWtDO2dCQUM5QyxXQUFXLEVBQUUsT0FBTztnQkFDcEIsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsQ0FBQztvQkFDUCxhQUFhLEVBQUU7d0JBQ2IsV0FBVzt3QkFDWCxpQkFBaUI7cUJBQ2xCO2lCQUNGO2dCQUNELGFBQWEsRUFBRTtvQkFDYixXQUFXO2lCQUNaO2dCQUNELG9CQUFvQixFQUFFO29CQUNwQixXQUFXO29CQUNYLGlCQUFpQjtvQkFDakIsV0FBVztpQkFDWjthQUNGLENBQUM7WUFDRixRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2QsU0FBUyxHQUFHO2dCQUNWLE1BQU0sRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUF2QixDQUF1QjtnQkFDOUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTthQUNyQixDQUFDO1lBQ0YsZ0JBQWdCLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEIsRUFBRSxDQUFDLCtDQUErQyxFQUFFO2dCQUNsRCxJQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQywwQ0FBMEMsRUFBRTtZQUNuRCxFQUFFLENBQUMsaURBQWlELEVBQUU7Z0JBQ3BELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9ELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw0REFBNEQsRUFBRTtnQkFDL0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMseUJBQXlCLEVBQUU7WUFDbEMsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO2dCQUMxRCxRQUFRLEdBQUc7b0JBQ1QsYUFBYSxFQUFFLHNCQUFzQjtvQkFDckMsV0FBVyxFQUFFLHNCQUFzQjtvQkFDbkMsSUFBSSxFQUFFLENBQUM7b0JBQ1AsY0FBYyxFQUFFLHNCQUFzQjtvQkFDdEMsVUFBVSxFQUFFLGtDQUFrQztvQkFDOUMsV0FBVyxFQUFFLE9BQU87b0JBQ3BCLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsS0FBSztvQkFDakIsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNsQixDQUFDO2dCQUNGLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2QsU0FBUyxHQUFHO29CQUNWLE1BQU0sRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUF2QixDQUF1QjtvQkFDOUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTtpQkFDckIsQ0FBQztnQkFDRixnQkFBZ0IsR0FBRyxJQUFJLHlDQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsd0RBQXdELEVBQUU7Z0JBQzNELFFBQVEsR0FBRztvQkFDVCxhQUFhLEVBQUUsc0JBQXNCO29CQUNyQyxXQUFXLEVBQUUsc0JBQXNCO29CQUNuQyxJQUFJLEVBQUUsQ0FBQztvQkFDUCxjQUFjLEVBQUUsc0JBQXNCO29CQUN0QyxVQUFVLEVBQUUsa0NBQWtDO29CQUM5QyxXQUFXLEVBQUUsT0FBTztvQkFDcEIsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxLQUFLO29CQUNqQixZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLE9BQU8sRUFBRTt3QkFDUDs0QkFDRSxhQUFhLEVBQUUsc0JBQXNCOzRCQUNyQyxXQUFXLEVBQUUsc0JBQXNCOzRCQUNuQyxJQUFJLEVBQUUsQ0FBQzs0QkFDUCxVQUFVLEVBQUUsTUFBTTs0QkFDbEIsTUFBTSxFQUFFLGFBQWE7NEJBQ3JCLGFBQWEsRUFBRSx5Q0FBeUM7eUJBQ3pEO3FCQUNGO2lCQUNGLENBQUM7Z0JBQ0YsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxTQUFTLEdBQUc7b0JBQ1YsTUFBTSxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQXZCLENBQXVCO29CQUM5QyxRQUFRLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJO2lCQUNyQixDQUFDO2dCQUNGLGdCQUFnQixHQUFHLElBQUkseUNBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLDBCQUEwQixFQUFFO1lBQ25DLElBQUksWUFBWSxHQUFHLGVBQWUsRUFBRSxDQUFDO1lBQ3JDLElBQUksYUFBYSxHQUFHLGdCQUFnQixFQUFFLENBQUM7WUFHdkMsSUFBSSxRQUFhLENBQUM7WUFDbEIsSUFBSSxTQUFjLENBQUM7WUFDbkIsSUFBSSxnQkFBcUIsQ0FBQztZQUUxQixVQUFVLENBQUM7Z0JBQ1QsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxTQUFTLEdBQUc7b0JBQ1YsTUFBTSxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBaEMsQ0FBZ0M7b0JBQ3ZELFFBQVEsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7aUJBQ3JCLENBQUM7Z0JBQ0YsZ0JBQWdCLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRTtnQkFDN0MsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUVuQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBVTtvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO2dCQUNqRCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ25DLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0JBRTVELE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3FCQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsY0FBTSxZQUFZLElBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFHLENBQUMsQ0FBQztnQkFDbkYsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO2dCQUNqRCxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxVQUFtQjtvQkFDN0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtnQkFDOUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxTQUFTLEdBQUc7b0JBQ1YsTUFBTSxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFqQyxDQUFpQztvQkFDeEQsUUFBUSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTtpQkFDckIsQ0FBQztnQkFDRixnQkFBZ0IsR0FBRyxJQUFJLHlDQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRCxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3JCLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBVTtvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHdGQUF3RixFQUN6RjtnQkFDRSxLQUFLLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNsQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNwRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUVMLEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtnQkFDdEQsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBVTtvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDNUQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFO2dCQUNuRCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ25DLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFVO29CQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFO2dCQUNsRCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ25DLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFVO29CQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFO2dCQUNsRCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ25DLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQVk7b0JBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDO2dCQUNILFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtnQkFDakQsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBVTtvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQztnQkFDSCxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMscURBQXFELEVBQUU7Z0JBQ3hELFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2QsU0FBUyxHQUFHO29CQUNWLE1BQU0sRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBakMsQ0FBaUM7b0JBQ3hELFFBQVEsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7aUJBQ3JCLENBQUM7Z0JBQ0YsZ0JBQWdCLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLG9EQUFvRCxFQUFFO2dCQUN2RCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztnQkFDMUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyw0Q0FBNEMsRUFBRTtZQUNyRCxJQUFJLFFBQWEsQ0FBQztZQUNsQixJQUFJLFNBQWMsQ0FBQztZQUVuQixVQUFVLENBQUM7Z0JBQ1QsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxTQUFTLEdBQUc7b0JBQ1YsTUFBTSxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQXZCLENBQXVCO29CQUM5QyxRQUFRLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJO2lCQUNyQixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsMkRBQTJELEVBQUU7Z0JBQzlELFFBQVEsR0FBRyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDO2dCQUV0QyxNQUFNLENBQUMsSUFBSSx5Q0FBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDZEQUE2RCxFQUFFO2dCQUNoRSxRQUFRLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsQ0FBQztnQkFFdkMsTUFBTSxDQUFDLElBQUkseUNBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywrREFBK0QsRUFBRTtnQkFDbEUsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFFZCxNQUFNLENBQUMsSUFBSSx5Q0FBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVIO1FBQ0UsTUFBTSxDQUFDO1lBQ0wsYUFBYSxFQUFFLHNCQUFzQjtZQUNyQyxXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLElBQUksRUFBRSxDQUFDO1lBQ1AsY0FBYyxFQUFFLHNCQUFzQjtZQUN0QyxVQUFVLEVBQUUsa0NBQWtDO1lBQzlDLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQixhQUFhLEVBQUU7Z0JBQ2IsTUFBTTthQUNQO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDtRQUNFLE1BQU0sQ0FBQztZQUNMLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLENBQUM7WUFDUCxjQUFjLEVBQUUsRUFBRTtZQUNsQixVQUFVLEVBQUUsRUFBRTtZQUNkLFdBQVcsRUFBRSxFQUFFO1lBQ2YsVUFBVSxFQUFFLEVBQUU7WUFDZCxVQUFVLEVBQUUsRUFBRTtZQUNkLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQixhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDbkIsa0JBQWtCLEVBQUUsS0FBSztZQUN6QixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIscUJBQXFCLEVBQUUsSUFBSTtZQUMzQix1QkFBdUIsRUFBRSxJQUFJO1NBQzlCLENBQUM7SUFDSixDQUFDO0FBRUgsQ0FBQztBQXJURCxvQkFxVEMiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBDdXJyZW50VXNlclNlcnZpY2UgfSBmcm9tICcuL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDdXJyZW50IFVzZXIgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgbW9ja1VzZXI6IGFueTtcbiAgICBsZXQgbW9ja0RhdGE6IGFueTtcbiAgICBsZXQgbW9ja1N0b3JlOiBhbnk7XG4gICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1VzZXIgPSB7XG4gICAgICAgICdsYXN0VXBkYXRlZCc6ICcyMDE2LTAxLTE0VDE2OjQ2OjIxWicsXG4gICAgICAgICdjcmVhdGVkT24nOiAnMjAxNi0wMS0xNFQxNjo0NjoyMVonLFxuICAgICAgICAnaWQnOiA2LFxuICAgICAgICAnZW1haWxBZGRyZXNzJzogJ3Rlc3RfZW1haWxAZW1haWwuY29tJyxcbiAgICAgICAgJ3Bhc3N3b3JkJzogJzVkYWY3ZGUwOGMwMDE0ZWMyYmFhMTNhNjRiMzVhNGUwJyxcbiAgICAgICAgJ2ZpcnN0TmFtZSc6ICdmaXJzdCcsXG4gICAgICAgICdsYXN0TmFtZSc6ICdsYXN0JyxcbiAgICAgICAgJ3NpdGVOYW1lJzogJ2NubicsXG4gICAgICAgICdhY2NvdW50SWRzJzogWzRdLFxuICAgICAgICAncm9sZXMnOiB7XG4gICAgICAgICAgJ2lkJzogMSxcbiAgICAgICAgICAncGVybWlzc2lvbnMnOiBbXG4gICAgICAgICAgICAnVmlld0NsaXBzJyxcbiAgICAgICAgICAgICdWaWV3Q29sbGVjdGlvbnMnLFxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgJ3Blcm1pc3Npb25zJzogW1xuICAgICAgICAgICdWaWV3Q2FydHMnXG4gICAgICAgIF0sXG4gICAgICAgICdhbGxVc2VyUGVybWlzc2lvbnMnOiBbXG4gICAgICAgICAgJ1ZpZXdDbGlwcycsXG4gICAgICAgICAgJ1ZpZXdDb2xsZWN0aW9ucycsXG4gICAgICAgICAgJ1ZpZXdDYXJ0cydcbiAgICAgICAgXVxuICAgICAgfTtcbiAgICAgIG1vY2tEYXRhID0ge307XG4gICAgICBtb2NrU3RvcmUgPSB7XG4gICAgICAgIHNlbGVjdDogKF86IHN0cmluZykgPT4gT2JzZXJ2YWJsZS5vZihtb2NrVXNlciksXG4gICAgICAgIGRpc3BhdGNoOiAoKSA9PiB0cnVlXG4gICAgICB9O1xuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBDdXJyZW50VXNlclNlcnZpY2UobW9ja1N0b3JlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgc3RhdGUoKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBjdXJyZW50IHVzZXIgZnJvbSB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlO1xuICAgICAgICBleHBlY3QodXNlcikudG9FcXVhbChtb2NrVXNlcik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNQZXJtaXNzaW9uKCkgLSBpbmRpdmlkdWFsIHBlcm1pc3Npb25zJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhIHVzZXIgaGFzIGEgY2VydGFpbiBwZXJtaXNzaW9uJywgKCkgPT4ge1xuICAgICAgICBleHBlY3Qoc2VydmljZVVuZGVyVGVzdC5oYXNQZXJtaXNzaW9uKCdWaWV3Q2FydHMnKSkudG9CZSh0cnVlKTtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3QuaGFzUGVybWlzc2lvbignVmlld0NvbGxlY3Rpb25zJykpLnRvQmUodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0Lmhhc1Blcm1pc3Npb24oJ1ZpZXdDbGlwcycpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGEgdXNlciBkb2VzblxcJ3QgaGF2ZSBhIGNlcnRhaW4gcGVybWlzc2lvbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3QuaGFzUGVybWlzc2lvbignUm9vdCcpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3QuaGFzUGVybWlzc2lvbignTm90QVBlcm1pc3Npb24nKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNQZXJtaXNzaW9uKCkgLSBlbXB0eScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIGFuIGZhbHNlIGlmIGhhcyBubyBwZXJtaXNzaW9ucyBvciByb2xlcycsICgpID0+IHtcbiAgICAgICAgbW9ja1VzZXIgPSB7XG4gICAgICAgICAgJ2xhc3RVcGRhdGVkJzogJzIwMTYtMDEtMTRUMTY6NDY6MjFaJyxcbiAgICAgICAgICAnY3JlYXRlZE9uJzogJzIwMTYtMDEtMTRUMTY6NDY6MjFaJyxcbiAgICAgICAgICAnaWQnOiA2LFxuICAgICAgICAgICdlbWFpbEFkZHJlc3MnOiAndGVzdF9lbWFpbEBlbWFpbC5jb20nLFxuICAgICAgICAgICdwYXNzd29yZCc6ICc1ZGFmN2RlMDhjMDAxNGVjMmJhYTEzYTY0YjM1YTRlMCcsXG4gICAgICAgICAgJ2ZpcnN0TmFtZSc6ICdmaXJzdCcsXG4gICAgICAgICAgJ2xhc3ROYW1lJzogJ2xhc3QnLFxuICAgICAgICAgICdzaXRlTmFtZSc6ICdjbm4nLFxuICAgICAgICAgICdhY2NvdW50SWRzJzogWzRdXG4gICAgICAgIH07XG4gICAgICAgIG1vY2tEYXRhID0ge307XG4gICAgICAgIG1vY2tTdG9yZSA9IHtcbiAgICAgICAgICBzZWxlY3Q6IChfOiBzdHJpbmcpID0+IE9ic2VydmFibGUub2YobW9ja1VzZXIpLFxuICAgICAgICAgIGRpc3BhdGNoOiAoKSA9PiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgQ3VycmVudFVzZXJTZXJ2aWNlKG1vY2tTdG9yZSk7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0Lmhhc1Blcm1pc3Npb24oJ0RlbGV0ZUNvbGxlY3Rpb25zJykpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIGFuIGZhbHNlIGlmIGhhcyByb2xlIHdpdGggbm8gcGVybWlzc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tVc2VyID0ge1xuICAgICAgICAgICdsYXN0VXBkYXRlZCc6ICcyMDE2LTAxLTE0VDE2OjQ2OjIxWicsXG4gICAgICAgICAgJ2NyZWF0ZWRPbic6ICcyMDE2LTAxLTE0VDE2OjQ2OjIxWicsXG4gICAgICAgICAgJ2lkJzogNixcbiAgICAgICAgICAnZW1haWxBZGRyZXNzJzogJ3Rlc3RfZW1haWxAZW1haWwuY29tJyxcbiAgICAgICAgICAncGFzc3dvcmQnOiAnNWRhZjdkZTA4YzAwMTRlYzJiYWExM2E2NGIzNWE0ZTAnLFxuICAgICAgICAgICdmaXJzdE5hbWUnOiAnZmlyc3QnLFxuICAgICAgICAgICdsYXN0TmFtZSc6ICdsYXN0JyxcbiAgICAgICAgICAnc2l0ZU5hbWUnOiAnY25uJyxcbiAgICAgICAgICAnYWNjb3VudElkcyc6IFs0XSxcbiAgICAgICAgICAncm9sZXMnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICdsYXN0VXBkYXRlZCc6ICcyMDE2LTA5LTI3VDE5OjAyOjUwWicsXG4gICAgICAgICAgICAgICdjcmVhdGVkT24nOiAnMjAxNi0wOS0xOVQyMToyNTo1N1onLFxuICAgICAgICAgICAgICAnaWQnOiAxLFxuICAgICAgICAgICAgICAnc2l0ZU5hbWUnOiAnY29yZScsXG4gICAgICAgICAgICAgICduYW1lJzogJ0RlZmF1bHRVc2VyJyxcbiAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0RlZmF1bHQgVXNlciBSb2xlIGZvciBhIFJlZ2lzdGVyZWQgVXNlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIG1vY2tEYXRhID0ge307XG4gICAgICAgIG1vY2tTdG9yZSA9IHtcbiAgICAgICAgICBzZWxlY3Q6IChfOiBzdHJpbmcpID0+IE9ic2VydmFibGUub2YobW9ja1VzZXIpLFxuICAgICAgICAgIGRpc3BhdGNoOiAoKSA9PiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgQ3VycmVudFVzZXJTZXJ2aWNlKG1vY2tTdG9yZSk7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0Lmhhc1Blcm1pc3Npb24oJ0RlbGV0ZUNvbGxlY3Rpb25zJykpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnQ3VycmVudFVzZXJTZXJ2aWNlIE1vZGVsJywgKCkgPT4ge1xuICAgICAgbGV0IGxvZ2dlZEluVXNlciA9IHNldExvZ2dlZEluVXNlcigpO1xuICAgICAgbGV0IGxvZ2dlZE91dFVzZXIgPSBzZXRMb2dnZWRPdXRVc2VyKCk7XG4gICAgICAvLyBsZXQgbG9nZ2VkSW5Vc2VyV2l0aG91dFBlcm1pc3Npb25zID0gc2V0TG9nZ2VkSW5Vc2VyV2l0aG91dFBlcm1pc3Npb25zKCk7XG5cbiAgICAgIGxldCBtb2NrRGF0YTogYW55O1xuICAgICAgbGV0IG1vY2tTdG9yZTogYW55O1xuICAgICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IGFueTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tEYXRhID0ge307XG4gICAgICAgIG1vY2tTdG9yZSA9IHtcbiAgICAgICAgICBzZWxlY3Q6IChfOiBzdHJpbmcpID0+IE9ic2VydmFibGUub2Yoc2V0TG9nZ2VkSW5Vc2VyKCkpLFxuICAgICAgICAgIGRpc3BhdGNoOiAoKSA9PiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgQ3VycmVudFVzZXJTZXJ2aWNlKG1vY2tTdG9yZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBzZXQgYSBvYmplY3QgZm9yIGEgbG9nZ2VkIGluIHVzZXInLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3Quc2V0KGxvZ2dlZEluVXNlcik7XG5cbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5kYXRhLnN1YnNjcmliZSgodXNlcjogVXNlcikgPT4ge1xuICAgICAgICAgIGV4cGVjdCh1c2VyKS50b0VxdWFsKGxvZ2dlZEluVXNlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgYWRkIHRoZSBhY2NvdW50IHRvIHRoZSBsb2dnZWQgaW4gdXNlcicsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5zZXQobG9nZ2VkSW5Vc2VyKTtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5hZGRBY2NvdW50VG9Vc2VyKHsgbmFtZTogJ3NvbWUgYWNjb3VudCcgfSk7XG5cbiAgICAgICAgZXhwZWN0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKVxuICAgICAgICAgIC50b0VxdWFsKEpTT04uc3RyaW5naWZ5KHsgLi4ubG9nZ2VkSW5Vc2VyLCBhY2NvdW50OiB7IG5hbWU6ICdzb21lIGFjY291bnQnIH0gfSkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbG9nZ2VkIGluIHN0YXRlIGZvciBhIHVzZXInLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9nZ2VkSW5TdGF0ZSgpLnN1YnNjcmliZSgoaXNMb2dnZWRJbjogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIGV4cGVjdChpc0xvZ2dlZEluKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHNldCBhIG9iamVjdCBmb3IgYSBsb2dnZWQgb3V0IHVzZXInLCAoKSA9PiB7XG4gICAgICAgIG1vY2tEYXRhID0ge307XG4gICAgICAgIG1vY2tTdG9yZSA9IHtcbiAgICAgICAgICBzZWxlY3Q6IChfOiBzdHJpbmcpID0+IE9ic2VydmFibGUub2Yoc2V0TG9nZ2VkT3V0VXNlcigpKSxcbiAgICAgICAgICBkaXNwYXRjaDogKCkgPT4gdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IEN1cnJlbnRVc2VyU2VydmljZShtb2NrU3RvcmUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5zZXQoKTtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5kYXRhLnN1YnNjcmliZSgodXNlcjogVXNlcikgPT4ge1xuICAgICAgICAgIGV4cGVjdCh1c2VyKS50b0VxdWFsKGxvZ2dlZE91dFVzZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBkZXN0cm95IHRoZSBjdXJyZW50IHVzZXIgYnkgcmVzZXR0aW5nIHRoZSB1c2VyIG9iamVjdCBhbmQgY2xlYXJpbmcgbG9jYWxTdG9yYWdlJyxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHNweU9uKGxvY2FsU3RvcmFnZSwgJ3JlbW92ZUl0ZW0nKTtcbiAgICAgICAgICBzcHlPbihzZXJ2aWNlVW5kZXJUZXN0LCAnc2V0Jyk7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5kZXN0cm95KCk7XG4gICAgICAgICAgZXhwZWN0KGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnY3VycmVudFVzZXInKTtcbiAgICAgICAgICBleHBlY3Qoc2VydmljZVVuZGVyVGVzdC5zZXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBjb3JyZWN0IGVtYWlsIGFkZHJlc3Mgb2YgYSB1c2VyJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LnNldChsb2dnZWRJblVzZXIpO1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmRhdGEuc3Vic2NyaWJlKCh1c2VyOiBVc2VyKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHVzZXIuZW1haWxBZGRyZXNzKS50b0VxdWFsKCd0ZXN0X2VtYWlsQGVtYWlsLmNvbScpO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGNvcnJlY3QgZmlyc3QgbmFtZSBvZiBhIHVzZXInLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3Quc2V0KGxvZ2dlZEluVXNlcik7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZGF0YS5zdWJzY3JpYmUoKHVzZXI6IFVzZXIpID0+IHtcbiAgICAgICAgICBleHBlY3QodXNlci5maXJzdE5hbWUpLnRvRXF1YWwoJ2ZpcnN0Jyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgY29ycmVjdCBsYXN0IG5hbWUgb2YgYSB1c2VyJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LnNldChsb2dnZWRJblVzZXIpO1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmRhdGEuc3Vic2NyaWJlKCh1c2VyOiBVc2VyKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHVzZXIubGFzdE5hbWUpLnRvRXF1YWwoJ2xhc3QnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBjb3JyZWN0IGZ1bGwgbmFtZSBvZiBhIHVzZXInLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3Quc2V0KGxvZ2dlZEluVXNlcik7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZnVsbE5hbWUoKS5zdWJzY3JpYmUoKG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGV4cGVjdChuYW1lKS50b0VxdWFsKCdmaXJzdCBsYXN0Jyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgY29ycmVjdCBhY2NvdW50cyBvZiBhIHVzZXInLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3Quc2V0KGxvZ2dlZEluVXNlcik7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZGF0YS5zdWJzY3JpYmUoKHVzZXI6IFVzZXIpID0+IHtcbiAgICAgICAgICBleHBlY3QodXNlci5hY2NvdW50SWRzKS50b0VxdWFsKFs0XSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbG9nZ2VkSW4gc3RhdGUgb2YgYSB1c2VyIGFzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBtb2NrRGF0YSA9IHt9O1xuICAgICAgICBtb2NrU3RvcmUgPSB7XG4gICAgICAgICAgc2VsZWN0OiAoXzogc3RyaW5nKSA9PiBPYnNlcnZhYmxlLm9mKHNldExvZ2dlZE91dFVzZXIoKSksXG4gICAgICAgICAgZGlzcGF0Y2g6ICgpID0+IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBDdXJyZW50VXNlclNlcnZpY2UobW9ja1N0b3JlKTtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3QubG9nZ2VkSW4oKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGxvZ2dlZEluIHN0YXRlIG9mIGEgdXNlciBhcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LnNldChzZXRMb2dnZWRJblVzZXIoKSwgJzk5ZTZmMjYyZmQzNTgwNTFiZjc1ODRlMTFlYzdhMycpO1xuICAgICAgICBleHBlY3Qoc2VydmljZVVuZGVyVGVzdC5sb2dnZWRJbigpKS50b0JlKHRydWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0N1cnJlbnQgVXNlciBtb2RlbCAtIGhhc1B1cmNoYXNlT25DcmVkaXQoKScsICgpID0+IHtcbiAgICAgIGxldCBtb2NrRGF0YTogYW55O1xuICAgICAgbGV0IG1vY2tTdG9yZTogYW55O1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0RhdGEgPSB7fTtcbiAgICAgICAgbW9ja1N0b3JlID0ge1xuICAgICAgICAgIHNlbGVjdDogKF86IHN0cmluZykgPT4gT2JzZXJ2YWJsZS5vZihtb2NrRGF0YSksXG4gICAgICAgICAgZGlzcGF0Y2g6ICgpID0+IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gdGhlIHN0b3JlIGRlZmluZXMgcHVyY2hhc2VPbkNyZWRpdD10cnVlJywgKCkgPT4ge1xuICAgICAgICBtb2NrRGF0YSA9IHsgcHVyY2hhc2VPbkNyZWRpdDogdHJ1ZSB9O1xuXG4gICAgICAgIGV4cGVjdChuZXcgQ3VycmVudFVzZXJTZXJ2aWNlKG1vY2tTdG9yZSkuaGFzUHVyY2hhc2VPbkNyZWRpdCgpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIHN0b3JlIGRlZmluZXMgcHVyY2hhc2VPbkNyZWRpdD1mYWxzZScsICgpID0+IHtcbiAgICAgICAgbW9ja0RhdGEgPSB7IHB1cmNoYXNlT25DcmVkaXQ6IGZhbHNlIH07XG5cbiAgICAgICAgZXhwZWN0KG5ldyBDdXJyZW50VXNlclNlcnZpY2UobW9ja1N0b3JlKS5oYXNQdXJjaGFzZU9uQ3JlZGl0KCkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIHN0b3JlIGRvZXMgbm90IGRlZmluZSBwdXJjaGFzZU9uQ3JlZGl0JywgKCkgPT4ge1xuICAgICAgICBtb2NrRGF0YSA9IHt9O1xuXG4gICAgICAgIGV4cGVjdChuZXcgQ3VycmVudFVzZXJTZXJ2aWNlKG1vY2tTdG9yZSkuaGFzUHVyY2hhc2VPbkNyZWRpdCgpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBmdW5jdGlvbiBzZXRMb2dnZWRJblVzZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdsYXN0VXBkYXRlZCc6ICcyMDE2LTAxLTE0VDE2OjQ2OjIxWicsXG4gICAgICAnY3JlYXRlZE9uJzogJzIwMTYtMDEtMTRUMTY6NDY6MjFaJyxcbiAgICAgICdpZCc6IDYsXG4gICAgICAnZW1haWxBZGRyZXNzJzogJ3Rlc3RfZW1haWxAZW1haWwuY29tJyxcbiAgICAgICdwYXNzd29yZCc6ICc1ZGFmN2RlMDhjMDAxNGVjMmJhYTEzYTY0YjM1YTRlMCcsXG4gICAgICAnZmlyc3ROYW1lJzogJ2ZpcnN0JyxcbiAgICAgICdsYXN0TmFtZSc6ICdsYXN0JyxcbiAgICAgICdzaXRlTmFtZSc6ICdjbm4nLFxuICAgICAgJ2FjY291bnRJZHMnOiBbNF0sXG4gICAgICAncGVybWlzc2lvbnMnOiBbXG4gICAgICAgICdSb290J1xuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzZXRMb2dnZWRPdXRVc2VyKCk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdsYXN0VXBkYXRlZCc6ICcnLFxuICAgICAgJ2NyZWF0ZWRPbic6ICcnLFxuICAgICAgJ2lkJzogMCxcbiAgICAgICdlbWFpbEFkZHJlc3MnOiAnJyxcbiAgICAgICdwYXNzd29yZCc6ICcnLFxuICAgICAgJ2ZpcnN0TmFtZSc6ICcnLFxuICAgICAgJ2xhc3ROYW1lJzogJycsXG4gICAgICAnc2l0ZU5hbWUnOiAnJyxcbiAgICAgICdhY2NvdW50SWRzJzogWzBdLFxuICAgICAgJ3Blcm1pc3Npb25zJzogWycnXSxcbiAgICAgICdwdXJjaGFzZU9uQ3JlZGl0JzogZmFsc2UsXG4gICAgICAnZm9jdXNlZENvbGxlY3Rpb24nOiBudWxsLFxuICAgICAgJ293bmVkQ29sbGVjdGlvbnMnOiBudWxsLFxuICAgICAgJ2VkaXRhYmxlQ29sbGVjdGlvbnMnOiBudWxsLFxuICAgICAgJ2FjY2Vzc2libGVDb2xsZWN0aW9ucyc6IG51bGxcbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==
