"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var commerce_billing_tab_1 = require("./commerce-billing-tab");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Billing Tab Class', function () {
        var componentUnderTest;
        var mockCartService, mockUserService, mockDialogService, mockCurrentUserService;
        var mockUserAccountPermission;
        var mockStore;
        var mockEmptyAddress = {
            type: null,
            name: null,
            addressEntityId: NaN,
            defaultAddress: false
        };
        var mockAddressA = {
            type: 'User',
            name: 'Ross Edfort',
            addressEntityId: 10,
            defaultAddress: false,
            address: {
                address: '123 Main Street',
                state: 'CO',
                city: 'Denver',
                country: 'USA',
                zipcode: '80202',
                phone: '5555555555'
            }
        };
        var mockAddressB = {
            type: 'Account',
            name: 'Wazee Digital',
            addressEntityId: 1,
            defaultAddress: false,
            address: {
                address: '1515 Arapahoe Street',
                address2: 'Tower 3, Suite 400',
                state: 'CO',
                city: 'Denver',
                country: 'USA',
                zipcode: '80202',
                phone: '5555555555'
            }
        };
        var mockInvoiceContact = {
            addressId: 2,
            billingInfo: { address: {} },
            email: 'invoice.contact@gmail.com',
            firstName: 'Invoice',
            lastName: 'Contact',
            type: 'User'
        };
        beforeEach(function () {
            mockCartService = {
                data: Observable_1.Observable.of({
                    cart: { itemCount: 1, projects: [] }
                }),
                determineNewSelectedAddress: jasmine.createSpy('determineNewSelectedAddress'),
                updateOrderInProgress: jasmine.createSpy('updateOrderInProgress')
            };
            mockUserService = {
                getAddresses: jasmine.createSpy('getAddresses').and.returnValue(Observable_1.Observable.of([mockAddressA, mockAddressB])),
                addBillingAddress: jasmine.createSpy('addBillingAddress').and.returnValue(Observable_1.Observable.of({})),
                addAccountBillingAddress: jasmine.createSpy('addAccountBillingAddress').and.returnValue(Observable_1.Observable.of({}))
            };
            mockDialogService = {
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable_1.Observable.of({ data: 'Test data' })),
            };
            mockCurrentUserService = {
                state: { purchaseOnCredit: true }
            };
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createActionFactoryMethod('checkout', 'setAvailableAddresses');
            mockStore.createActionFactoryMethod('checkout', 'setSelectedAddress');
            mockStore.createStateSection('checkout', { selectedAddress: mockAddressA, addresses: [mockAddressA, mockAddressB] });
            componentUnderTest = new commerce_billing_tab_1.CommerceBillingTab(null, mockCartService, mockUserService, mockCurrentUserService, mockDialogService, mockStore);
        });
        describe('typeFor()', function () {
            it('returns the address\'s type', function () {
                expect(componentUnderTest.typeFor(mockAddressA)).toBe('User');
                expect(componentUnderTest.typeFor(mockAddressB)).toBe('Account');
            });
            it('returns and emptuy string if the address doesn\'t have a type', function () {
                expect(componentUnderTest.typeFor(mockEmptyAddress)).toBe('');
            });
        });
        describe('nameFor()', function () {
            it('returns the address\'s name', function () {
                expect(componentUnderTest.nameFor(mockAddressA)).toBe('Ross Edfort');
                expect(componentUnderTest.nameFor(mockAddressB)).toBe('Wazee Digital');
            });
            it('returns an empty string if the address doesn\'t have a name', function () {
                expect(componentUnderTest.nameFor(mockEmptyAddress)).toBe('');
            });
        });
        describe('lineOneFor()', function () {
            it('returns the address\'s first line', function () {
                expect(componentUnderTest.lineOneFor(mockAddressA)).toBe('123 Main Street');
                expect(componentUnderTest.lineOneFor(mockAddressB)).toBe('1515 Arapahoe Street, Tower 3, Suite 400');
            });
        });
        describe('cityFor()', function () {
            it('returns the address\'s city', function () {
                expect(componentUnderTest.cityFor(mockAddressA)).toBe('Denver,');
            });
            it('returns an empty string if the address doesn\'t have a city', function () {
                expect(componentUnderTest.cityFor(mockEmptyAddress)).toBe('');
            });
        });
        describe('stateFor()', function () {
            it('returns the address\'s state', function () {
                expect(componentUnderTest.stateFor(mockAddressA)).toBe('CO');
            });
            it('returns null if the address doesn\'t have a state', function () {
                expect(componentUnderTest.stateFor(mockEmptyAddress)).toBeNull();
            });
        });
        describe('zipcodeFor()', function () {
            it('returns the address\'s zip', function () {
                expect(componentUnderTest.zipcodeFor(mockAddressA)).toBe('80202,');
            });
            it('returns an empty string if the address doesn\'t have a zip', function () {
                expect(componentUnderTest.zipcodeFor(mockEmptyAddress)).toBe('');
            });
        });
        describe('zipcodeFor()', function () {
            it('returns the address\'s zipcode', function () {
                expect(componentUnderTest.zipcodeFor(mockAddressA)).toBe('80202,');
            });
            it('returns an empty string if the address doesn\'t have a zipcode', function () {
                expect(componentUnderTest.zipcodeFor(mockEmptyAddress)).toBe('');
            });
        });
        describe('countryFor()', function () {
            it('returns the address\'s country', function () {
                expect(componentUnderTest.countryFor(mockAddressA)).toBe('USA');
            });
            it('returns null if the address doesn\'t have a country', function () {
                expect(componentUnderTest.countryFor(mockEmptyAddress)).toBeNull();
            });
        });
        describe('phoneFor()', function () {
            it('returns the address\'s phone number', function () {
                expect(componentUnderTest.phoneFor(mockAddressA)).toBe('5555555555');
            });
            it('returns null if the address doesn\'t have a phone number', function () {
                expect(componentUnderTest.phoneFor(mockEmptyAddress)).toBeNull();
            });
        });
        describe('addUserAddress()', function () {
            it('should call addBillingAddress() on the user service', function () {
                componentUnderTest.addUserAddress(mockAddressA.address);
                expect(mockUserService.addBillingAddress).toHaveBeenCalledWith(mockAddressA.address);
            });
            it('should re-fetch the addresses', function () {
                componentUnderTest.addUserAddress(mockAddressA.address);
                expect(mockUserService.getAddresses).toHaveBeenCalled();
            });
        });
        describe('addAccountAddress()', function () {
            it('should call addAccountBillingAddress() on the user service', function () {
                componentUnderTest.addAccountAddress(mockAddressB.address, mockAddressA);
                var newAddress = Object.assign({}, mockAddressA, { address: mockAddressB.address });
                expect(mockUserService.addAccountBillingAddress).toHaveBeenCalledWith(newAddress);
            });
        });
        describe('formatAndSelectAddress()', function () {
            it('should call selectAddress() with a properly formatted invoice contact', function () {
                spyOn(componentUnderTest, 'selectAddress');
                componentUnderTest.formatAndSelectAddress(mockInvoiceContact);
                var invoiceAddress = { addressEntityId: 2, type: 'User', name: 'Invoice Contact', address: {} };
                expect(componentUnderTest.selectAddress).toHaveBeenCalledWith(invoiceAddress);
            });
            it('should re-fetch the addresses', function () {
                componentUnderTest.addUserAddress(mockAddressA.address);
                expect(mockUserService.getAddresses).toHaveBeenCalled();
            });
        });
        describe('openFormFor', function () {
            describe('user', function () {
                it('should open a dialog and call addBillingAddress if mode is "edit"', function () {
                    componentUnderTest.openFormFor('user', 'edit', mockAddressB);
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
                });
                it('should open a dialog and call addUserAddress if mode is "create"', function () {
                    componentUnderTest.openFormFor('user', 'create');
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
                });
            });
            describe('account', function () {
                it('should open a dialog and call addAccountBillingAddress if mode is "edit"', function () {
                    componentUnderTest.openFormFor('account', 'edit', mockAddressB);
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
                });
                it('should open a dialog and call addAccountBillingAddress if mode is "create"', function () {
                    componentUnderTest.openFormFor('account', 'create');
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
                });
            });
        });
        describe('displayAddressErrors()', function () {
            it('should return true when the address has errors', function () {
                componentUnderTest.addressErrors = { 123: ['city'] };
                expect(componentUnderTest.displayAddressErrors(123)).toBe(true);
            });
            it('should return false when the address does not have errors', function () {
                componentUnderTest.addressErrors = { 123: [] };
                expect(componentUnderTest.displayAddressErrors(123)).toBe(false);
            });
        });
        describe('formatAddressErrors()', function () {
            it('should return the right string for 1 error', function () {
                componentUnderTest.addressErrors = { 10: ['city'] };
                expect(componentUnderTest.formatAddressErrors(mockAddressA)).toBe('city');
            });
            it('should return the right string for 2 errors', function () {
                componentUnderTest.addressErrors = { 10: ['city', 'state'] };
                expect(componentUnderTest.formatAddressErrors(mockAddressA)).toBe('city, and state');
            });
            it('should return the right string for more than 2 errors', function () {
                componentUnderTest.addressErrors = { 10: ['city', 'state', 'phone', 'zipcode'] };
                expect(componentUnderTest.formatAddressErrors(mockAddressA)).toBe('city, state, phone, and zipcode');
            });
        });
        describe('get userCanProceed()', function () {
            it('should return false if the selectedAddress has no values', function () {
                mockStore.createStateSection('checkout', {
                    addresses: [mockAddressA], selectedAddress: { type: 'user', address: { address: '', state: '' } }
                });
                var userCanProceed;
                componentUnderTest.userCanProceed.take(1).subscribe(function (data) {
                    userCanProceed = data;
                });
                expect(userCanProceed).toBe(false);
            });
            it('should return true if there is a selectedAddress with all values', function () {
                mockStore.createStateSection('checkout', {
                    addresses: [mockAddressA], selectedAddress: { type: 'user', address: { address: 'b', state: 'a' } }
                });
                var userCanProceed;
                componentUnderTest.userCanProceed.take(1).subscribe(function (data) {
                    userCanProceed = data;
                });
                expect(userCanProceed).toBe(true);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLWJpbGxpbmctdGFiLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFDN0MsK0RBQTREO0FBRTVELDZFQUEwRTtBQUcxRTtJQUNFLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtRQUM1QixJQUFJLGtCQUFzQyxDQUFDO1FBQzNDLElBQUksZUFBb0IsRUFBRSxlQUFvQixFQUFFLGlCQUFzQixFQUFFLHNCQUEyQixDQUFDO1FBQ3BHLElBQUkseUJBQWtDLENBQUM7UUFDdkMsSUFBSSxTQUF1QixDQUFDO1FBRTVCLElBQUksZ0JBQWdCLEdBQWdCO1lBQ2xDLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixlQUFlLEVBQUUsR0FBRztZQUNwQixjQUFjLEVBQUUsS0FBSztTQUN0QixDQUFDO1FBRUYsSUFBSSxZQUFZLEdBQWdCO1lBQzlCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLGFBQWE7WUFDbkIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsY0FBYyxFQUFFLEtBQUs7WUFDckIsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixLQUFLLEVBQUUsWUFBWTthQUNwQjtTQUNGLENBQUM7UUFFRixJQUFJLFlBQVksR0FBZ0I7WUFDOUIsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsZUFBZTtZQUNyQixlQUFlLEVBQUUsQ0FBQztZQUNsQixjQUFjLEVBQUUsS0FBSztZQUNyQixPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLEtBQUssRUFBRSxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQztRQUVGLElBQUksa0JBQWtCLEdBQVM7WUFDN0IsU0FBUyxFQUFFLENBQUM7WUFDWixXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQzVCLEtBQUssRUFBRSwyQkFBMkI7WUFDbEMsU0FBUyxFQUFFLFNBQVM7WUFDcEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDO1FBRUYsVUFBVSxDQUFDO1lBQ1QsZUFBZSxHQUFHO2dCQUNoQixJQUFJLEVBQUUsdUJBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtpQkFDckMsQ0FBQztnQkFDRiwyQkFBMkIsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDO2dCQUM3RSxxQkFBcUIsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO2FBQ2xFLENBQUM7WUFFRixlQUFlLEdBQUc7Z0JBQ2hCLFlBQVksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDNUcsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVGLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzNHLENBQUM7WUFFRixpQkFBaUIsR0FBRztnQkFDbEIscUJBQXFCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUN4SCxDQUFDO1lBRUYsc0JBQXNCLEdBQUc7Z0JBQ3ZCLEtBQUssRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRTthQUNsQyxDQUFDO1lBRUYsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztZQUN6RSxTQUFTLENBQUMseUJBQXlCLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDdEUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVySCxrQkFBa0IsR0FBRyxJQUFJLHlDQUFrQixDQUN6QyxJQUFJLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLENBQzdGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsRUFBRSxDQUFDLDZCQUE2QixFQUFFO2dCQUNoQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLCtEQUErRCxFQUFFO2dCQUNsRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsRUFBRSxDQUFDLDZCQUE2QixFQUFFO2dCQUNoQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNyRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDZEQUE2RCxFQUFFO2dCQUNoRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxjQUFjLEVBQUU7WUFDdkIsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO2dCQUN0QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzVFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUN2RyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixFQUFFLENBQUMsNkJBQTZCLEVBQUU7Z0JBQ2hDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsNkRBQTZELEVBQUU7Z0JBQ2hFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUNyQixFQUFFLENBQUMsOEJBQThCLEVBQUU7Z0JBQ2pDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsbURBQW1ELEVBQUU7Z0JBQ3RELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRTtnQkFDL0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw0REFBNEQsRUFBRTtnQkFDL0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtnQkFDbkMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRTtnQkFDbkUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtnQkFDbkMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtnQkFDeEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsRUFBRSxDQUFDLHFDQUFxQyxFQUFFO2dCQUN4QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDBEQUEwRCxFQUFFO2dCQUM3RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtnQkFDeEQsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFeEQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTtnQkFDbEMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFeEQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsRUFBRSxDQUFDLDREQUE0RCxFQUFFO2dCQUMvRCxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUV6RSxJQUFJLFVBQVUsR0FBZ0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUVqRyxNQUFNLENBQUMsZUFBZSxDQUFDLHdCQUF3QixDQUFDLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtZQUVuQyxFQUFFLENBQUMsdUVBQXVFLEVBQUU7Z0JBQzFFLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDM0Msa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFFOUQsSUFBSSxjQUFjLEdBQVMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFFdEcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFO2dCQUNsQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV4RCxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEIsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDZixFQUFFLENBQUMsbUVBQW1FLEVBQUU7b0JBQ3RFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUU3RCxNQUFNLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsa0VBQWtFLEVBQUU7b0JBQ3JFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBRWpELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsU0FBUyxFQUFFO2dCQUNsQixFQUFFLENBQUMsMEVBQTBFLEVBQUU7b0JBQzdFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUVoRSxNQUFNLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsNEVBQTRFLEVBQUU7b0JBQy9FLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBRXBELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtZQUNqQyxFQUFFLENBQUMsZ0RBQWdELEVBQUU7Z0JBQ25ELGtCQUFrQixDQUFDLGFBQWEsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3JELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywyREFBMkQsRUFBRTtnQkFDOUQsa0JBQWtCLENBQUMsYUFBYSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUMvQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxFQUFFLENBQUMsNENBQTRDLEVBQUU7Z0JBQy9DLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3BELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1RSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtnQkFDaEQsa0JBQWtCLENBQUMsYUFBYSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3ZGLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO2dCQUMxRCxrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDO2dCQUNqRixNQUFNLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUN2RyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLEVBQUUsQ0FBQywwREFBMEQsRUFBRTtnQkFDN0QsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtvQkFDdkMsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtpQkFDbEcsQ0FBQyxDQUFDO2dCQUNILElBQUksY0FBdUIsQ0FBQztnQkFDNUIsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFhO29CQUNoRSxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGtFQUFrRSxFQUFFO2dCQUNyRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFO29CQUN2QyxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO2lCQUNwRyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxjQUF1QixDQUFDO2dCQUM1QixrQkFBa0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQWE7b0JBQ2hFLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTdTRCxvQkE2U0M7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLWJpbGxpbmctdGFiLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbW1lcmNlQmlsbGluZ1RhYiB9IGZyb20gJy4vY29tbWVyY2UtYmlsbGluZy10YWInO1xuaW1wb3J0IHsgQWRkcmVzcywgVmlld0FkZHJlc3MgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0JpbGxpbmcgVGFiIENsYXNzJywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IENvbW1lcmNlQmlsbGluZ1RhYjtcbiAgICBsZXQgbW9ja0NhcnRTZXJ2aWNlOiBhbnksIG1vY2tVc2VyU2VydmljZTogYW55LCBtb2NrRGlhbG9nU2VydmljZTogYW55LCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tVc2VyQWNjb3VudFBlcm1pc3Npb246IGJvb2xlYW47XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuXG4gICAgbGV0IG1vY2tFbXB0eUFkZHJlc3M6IFZpZXdBZGRyZXNzID0ge1xuICAgICAgdHlwZTogbnVsbCxcbiAgICAgIG5hbWU6IG51bGwsXG4gICAgICBhZGRyZXNzRW50aXR5SWQ6IE5hTixcbiAgICAgIGRlZmF1bHRBZGRyZXNzOiBmYWxzZVxuICAgIH07XG5cbiAgICBsZXQgbW9ja0FkZHJlc3NBOiBWaWV3QWRkcmVzcyA9IHtcbiAgICAgIHR5cGU6ICdVc2VyJyxcbiAgICAgIG5hbWU6ICdSb3NzIEVkZm9ydCcsXG4gICAgICBhZGRyZXNzRW50aXR5SWQ6IDEwLFxuICAgICAgZGVmYXVsdEFkZHJlc3M6IGZhbHNlLFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICBhZGRyZXNzOiAnMTIzIE1haW4gU3RyZWV0JyxcbiAgICAgICAgc3RhdGU6ICdDTycsXG4gICAgICAgIGNpdHk6ICdEZW52ZXInLFxuICAgICAgICBjb3VudHJ5OiAnVVNBJyxcbiAgICAgICAgemlwY29kZTogJzgwMjAyJyxcbiAgICAgICAgcGhvbmU6ICc1NTU1NTU1NTU1J1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgbW9ja0FkZHJlc3NCOiBWaWV3QWRkcmVzcyA9IHtcbiAgICAgIHR5cGU6ICdBY2NvdW50JyxcbiAgICAgIG5hbWU6ICdXYXplZSBEaWdpdGFsJyxcbiAgICAgIGFkZHJlc3NFbnRpdHlJZDogMSxcbiAgICAgIGRlZmF1bHRBZGRyZXNzOiBmYWxzZSxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgYWRkcmVzczogJzE1MTUgQXJhcGFob2UgU3RyZWV0JyxcbiAgICAgICAgYWRkcmVzczI6ICdUb3dlciAzLCBTdWl0ZSA0MDAnLFxuICAgICAgICBzdGF0ZTogJ0NPJyxcbiAgICAgICAgY2l0eTogJ0RlbnZlcicsXG4gICAgICAgIGNvdW50cnk6ICdVU0EnLFxuICAgICAgICB6aXBjb2RlOiAnODAyMDInLFxuICAgICAgICBwaG9uZTogJzU1NTU1NTU1NTUnXG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCBtb2NrSW52b2ljZUNvbnRhY3Q6IFBvam8gPSB7XG4gICAgICBhZGRyZXNzSWQ6IDIsXG4gICAgICBiaWxsaW5nSW5mbzogeyBhZGRyZXNzOiB7fSB9LFxuICAgICAgZW1haWw6ICdpbnZvaWNlLmNvbnRhY3RAZ21haWwuY29tJyxcbiAgICAgIGZpcnN0TmFtZTogJ0ludm9pY2UnLFxuICAgICAgbGFzdE5hbWU6ICdDb250YWN0JyxcbiAgICAgIHR5cGU6ICdVc2VyJ1xuICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tDYXJ0U2VydmljZSA9IHtcbiAgICAgICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7XG4gICAgICAgICAgY2FydDogeyBpdGVtQ291bnQ6IDEsIHByb2plY3RzOiBbXSB9XG4gICAgICAgIH0pLFxuICAgICAgICBkZXRlcm1pbmVOZXdTZWxlY3RlZEFkZHJlc3M6IGphc21pbmUuY3JlYXRlU3B5KCdkZXRlcm1pbmVOZXdTZWxlY3RlZEFkZHJlc3MnKSxcbiAgICAgICAgdXBkYXRlT3JkZXJJblByb2dyZXNzOiBqYXNtaW5lLmNyZWF0ZVNweSgndXBkYXRlT3JkZXJJblByb2dyZXNzJylcbiAgICAgIH07XG5cbiAgICAgIG1vY2tVc2VyU2VydmljZSA9IHtcbiAgICAgICAgZ2V0QWRkcmVzc2VzOiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0QWRkcmVzc2VzJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YoW21vY2tBZGRyZXNzQSwgbW9ja0FkZHJlc3NCXSkpLFxuICAgICAgICBhZGRCaWxsaW5nQWRkcmVzczogamFzbWluZS5jcmVhdGVTcHkoJ2FkZEJpbGxpbmdBZGRyZXNzJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe30pKSxcbiAgICAgICAgYWRkQWNjb3VudEJpbGxpbmdBZGRyZXNzOiBqYXNtaW5lLmNyZWF0ZVNweSgnYWRkQWNjb3VudEJpbGxpbmdBZGRyZXNzJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe30pKVxuICAgICAgfTtcblxuICAgICAgbW9ja0RpYWxvZ1NlcnZpY2UgPSB7XG4gICAgICAgIG9wZW5Db21wb25lbnRJbkRpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Db21wb25lbnRJbkRpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHsgZGF0YTogJ1Rlc3QgZGF0YScgfSkpLFxuICAgICAgfTtcblxuICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHtcbiAgICAgICAgc3RhdGU6IHsgcHVyY2hhc2VPbkNyZWRpdDogdHJ1ZSB9XG4gICAgICB9O1xuXG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnY2hlY2tvdXQnLCAnc2V0QXZhaWxhYmxlQWRkcmVzc2VzJyk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnY2hlY2tvdXQnLCAnc2V0U2VsZWN0ZWRBZGRyZXNzJyk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdjaGVja291dCcsIHsgc2VsZWN0ZWRBZGRyZXNzOiBtb2NrQWRkcmVzc0EsIGFkZHJlc3NlczogW21vY2tBZGRyZXNzQSwgbW9ja0FkZHJlc3NCXSB9KTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENvbW1lcmNlQmlsbGluZ1RhYihcbiAgICAgICAgbnVsbCwgbW9ja0NhcnRTZXJ2aWNlLCBtb2NrVXNlclNlcnZpY2UsIG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG1vY2tEaWFsb2dTZXJ2aWNlLCBtb2NrU3RvcmVcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndHlwZUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGFkZHJlc3NcXCdzIHR5cGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudHlwZUZvcihtb2NrQWRkcmVzc0EpKS50b0JlKCdVc2VyJyk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudHlwZUZvcihtb2NrQWRkcmVzc0IpKS50b0JlKCdBY2NvdW50Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYW5kIGVtcHR1eSBzdHJpbmcgaWYgdGhlIGFkZHJlc3MgZG9lc25cXCd0IGhhdmUgYSB0eXBlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnR5cGVGb3IobW9ja0VtcHR5QWRkcmVzcykpLnRvQmUoJycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmFtZUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGFkZHJlc3NcXCdzIG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubmFtZUZvcihtb2NrQWRkcmVzc0EpKS50b0JlKCdSb3NzIEVkZm9ydCcpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5hbWVGb3IobW9ja0FkZHJlc3NCKSkudG9CZSgnV2F6ZWUgRGlnaXRhbCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgYWRkcmVzcyBkb2VzblxcJ3QgaGF2ZSBhIG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubmFtZUZvcihtb2NrRW1wdHlBZGRyZXNzKSkudG9CZSgnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsaW5lT25lRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgYWRkcmVzc1xcJ3MgZmlyc3QgbGluZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5saW5lT25lRm9yKG1vY2tBZGRyZXNzQSkpLnRvQmUoJzEyMyBNYWluIFN0cmVldCcpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmxpbmVPbmVGb3IobW9ja0FkZHJlc3NCKSkudG9CZSgnMTUxNSBBcmFwYWhvZSBTdHJlZXQsIFRvd2VyIDMsIFN1aXRlIDQwMCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2l0eUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGFkZHJlc3NcXCdzIGNpdHknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2l0eUZvcihtb2NrQWRkcmVzc0EpKS50b0JlKCdEZW52ZXIsJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBhZGRyZXNzIGRvZXNuXFwndCBoYXZlIGEgY2l0eScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jaXR5Rm9yKG1vY2tFbXB0eUFkZHJlc3MpKS50b0JlKCcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N0YXRlRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgYWRkcmVzc1xcJ3Mgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc3RhdGVGb3IobW9ja0FkZHJlc3NBKSkudG9CZSgnQ08nKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBudWxsIGlmIHRoZSBhZGRyZXNzIGRvZXNuXFwndCBoYXZlIGEgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc3RhdGVGb3IobW9ja0VtcHR5QWRkcmVzcykpLnRvQmVOdWxsKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd6aXBjb2RlRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgYWRkcmVzc1xcJ3MgemlwJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnppcGNvZGVGb3IobW9ja0FkZHJlc3NBKSkudG9CZSgnODAyMDIsJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBhZGRyZXNzIGRvZXNuXFwndCBoYXZlIGEgemlwJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnppcGNvZGVGb3IobW9ja0VtcHR5QWRkcmVzcykpLnRvQmUoJycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnemlwY29kZUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGFkZHJlc3NcXCdzIHppcGNvZGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuemlwY29kZUZvcihtb2NrQWRkcmVzc0EpKS50b0JlKCc4MDIwMiwnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIGFkZHJlc3MgZG9lc25cXCd0IGhhdmUgYSB6aXBjb2RlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnppcGNvZGVGb3IobW9ja0VtcHR5QWRkcmVzcykpLnRvQmUoJycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY291bnRyeUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGFkZHJlc3NcXCdzIGNvdW50cnknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY291bnRyeUZvcihtb2NrQWRkcmVzc0EpKS50b0JlKCdVU0EnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBudWxsIGlmIHRoZSBhZGRyZXNzIGRvZXNuXFwndCBoYXZlIGEgY291bnRyeScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb3VudHJ5Rm9yKG1vY2tFbXB0eUFkZHJlc3MpKS50b0JlTnVsbCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncGhvbmVGb3IoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBhZGRyZXNzXFwncyBwaG9uZSBudW1iZXInLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGhvbmVGb3IobW9ja0FkZHJlc3NBKSkudG9CZSgnNTU1NTU1NTU1NScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgdGhlIGFkZHJlc3MgZG9lc25cXCd0IGhhdmUgYSBwaG9uZSBudW1iZXInLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucGhvbmVGb3IobW9ja0VtcHR5QWRkcmVzcykpLnRvQmVOdWxsKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRVc2VyQWRkcmVzcygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGFkZEJpbGxpbmdBZGRyZXNzKCkgb24gdGhlIHVzZXIgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFkZFVzZXJBZGRyZXNzKG1vY2tBZGRyZXNzQS5hZGRyZXNzKTtcblxuICAgICAgICBleHBlY3QobW9ja1VzZXJTZXJ2aWNlLmFkZEJpbGxpbmdBZGRyZXNzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChtb2NrQWRkcmVzc0EuYWRkcmVzcyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZS1mZXRjaCB0aGUgYWRkcmVzc2VzJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWRkVXNlckFkZHJlc3MobW9ja0FkZHJlc3NBLmFkZHJlc3MpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrVXNlclNlcnZpY2UuZ2V0QWRkcmVzc2VzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRBY2NvdW50QWRkcmVzcygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGFkZEFjY291bnRCaWxsaW5nQWRkcmVzcygpIG9uIHRoZSB1c2VyIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hZGRBY2NvdW50QWRkcmVzcyhtb2NrQWRkcmVzc0IuYWRkcmVzcywgbW9ja0FkZHJlc3NBKTtcblxuICAgICAgICBsZXQgbmV3QWRkcmVzczogVmlld0FkZHJlc3MgPSBPYmplY3QuYXNzaWduKHt9LCBtb2NrQWRkcmVzc0EsIHsgYWRkcmVzczogbW9ja0FkZHJlc3NCLmFkZHJlc3MgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tVc2VyU2VydmljZS5hZGRBY2NvdW50QmlsbGluZ0FkZHJlc3MpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG5ld0FkZHJlc3MpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZm9ybWF0QW5kU2VsZWN0QWRkcmVzcygpJywgKCkgPT4ge1xuXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2VsZWN0QWRkcmVzcygpIHdpdGggYSBwcm9wZXJseSBmb3JtYXR0ZWQgaW52b2ljZSBjb250YWN0JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QsICdzZWxlY3RBZGRyZXNzJyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtYXRBbmRTZWxlY3RBZGRyZXNzKG1vY2tJbnZvaWNlQ29udGFjdCk7XG5cbiAgICAgICAgbGV0IGludm9pY2VBZGRyZXNzOiBQb2pvID0geyBhZGRyZXNzRW50aXR5SWQ6IDIsIHR5cGU6ICdVc2VyJywgbmFtZTogJ0ludm9pY2UgQ29udGFjdCcsIGFkZHJlc3M6IHt9IH07XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZWxlY3RBZGRyZXNzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpbnZvaWNlQWRkcmVzcyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZS1mZXRjaCB0aGUgYWRkcmVzc2VzJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWRkVXNlckFkZHJlc3MobW9ja0FkZHJlc3NBLmFkZHJlc3MpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrVXNlclNlcnZpY2UuZ2V0QWRkcmVzc2VzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvcGVuRm9ybUZvcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCd1c2VyJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gYSBkaWFsb2cgYW5kIGNhbGwgYWRkQmlsbGluZ0FkZHJlc3MgaWYgbW9kZSBpcyBcImVkaXRcIicsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub3BlbkZvcm1Gb3IoJ3VzZXInLCAnZWRpdCcsIG1vY2tBZGRyZXNzQik7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBhIGRpYWxvZyBhbmQgY2FsbCBhZGRVc2VyQWRkcmVzcyBpZiBtb2RlIGlzIFwiY3JlYXRlXCInLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9wZW5Gb3JtRm9yKCd1c2VyJywgJ2NyZWF0ZScpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnYWNjb3VudCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGEgZGlhbG9nIGFuZCBjYWxsIGFkZEFjY291bnRCaWxsaW5nQWRkcmVzcyBpZiBtb2RlIGlzIFwiZWRpdFwiJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vcGVuRm9ybUZvcignYWNjb3VudCcsICdlZGl0JywgbW9ja0FkZHJlc3NCKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGEgZGlhbG9nIGFuZCBjYWxsIGFkZEFjY291bnRCaWxsaW5nQWRkcmVzcyBpZiBtb2RlIGlzIFwiY3JlYXRlXCInLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9wZW5Gb3JtRm9yKCdhY2NvdW50JywgJ2NyZWF0ZScpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Rpc3BsYXlBZGRyZXNzRXJyb3JzKCknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gdGhlIGFkZHJlc3MgaGFzIGVycm9ycycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFkZHJlc3NFcnJvcnMgPSB7IDEyMzogWydjaXR5J10gfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kaXNwbGF5QWRkcmVzc0Vycm9ycygxMjMpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gdGhlIGFkZHJlc3MgZG9lcyBub3QgaGF2ZSBlcnJvcnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hZGRyZXNzRXJyb3JzID0geyAxMjM6IFtdIH07XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZGlzcGxheUFkZHJlc3NFcnJvcnMoMTIzKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdmb3JtYXRBZGRyZXNzRXJyb3JzKCknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcmlnaHQgc3RyaW5nIGZvciAxIGVycm9yJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWRkcmVzc0Vycm9ycyA9IHsgMTA6IFsnY2l0eSddIH07XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybWF0QWRkcmVzc0Vycm9ycyhtb2NrQWRkcmVzc0EpKS50b0JlKCdjaXR5Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIHJpZ2h0IHN0cmluZyBmb3IgMiBlcnJvcnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hZGRyZXNzRXJyb3JzID0geyAxMDogWydjaXR5JywgJ3N0YXRlJ10gfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtYXRBZGRyZXNzRXJyb3JzKG1vY2tBZGRyZXNzQSkpLnRvQmUoJ2NpdHksIGFuZCBzdGF0ZScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSByaWdodCBzdHJpbmcgZm9yIG1vcmUgdGhhbiAyIGVycm9ycycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFkZHJlc3NFcnJvcnMgPSB7IDEwOiBbJ2NpdHknLCAnc3RhdGUnLCAncGhvbmUnLCAnemlwY29kZSddIH07XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybWF0QWRkcmVzc0Vycm9ycyhtb2NrQWRkcmVzc0EpKS50b0JlKCdjaXR5LCBzdGF0ZSwgcGhvbmUsIGFuZCB6aXBjb2RlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgdXNlckNhblByb2NlZWQoKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBzZWxlY3RlZEFkZHJlc3MgaGFzIG5vIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignY2hlY2tvdXQnLCB7XG4gICAgICAgICAgYWRkcmVzc2VzOiBbbW9ja0FkZHJlc3NBXSwgc2VsZWN0ZWRBZGRyZXNzOiB7IHR5cGU6ICd1c2VyJywgYWRkcmVzczogeyBhZGRyZXNzOiAnJywgc3RhdGU6ICcnIH0gfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHVzZXJDYW5Qcm9jZWVkOiBib29sZWFuO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhblByb2NlZWQudGFrZSgxKS5zdWJzY3JpYmUoKGRhdGE6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICB1c2VyQ2FuUHJvY2VlZCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgICAgICBleHBlY3QodXNlckNhblByb2NlZWQpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlcmUgaXMgYSBzZWxlY3RlZEFkZHJlc3Mgd2l0aCBhbGwgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdjaGVja291dCcsIHtcbiAgICAgICAgICBhZGRyZXNzZXM6IFttb2NrQWRkcmVzc0FdLCBzZWxlY3RlZEFkZHJlc3M6IHsgdHlwZTogJ3VzZXInLCBhZGRyZXNzOiB7IGFkZHJlc3M6ICdiJywgc3RhdGU6ICdhJyB9IH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCB1c2VyQ2FuUHJvY2VlZDogYm9vbGVhbjtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5Qcm9jZWVkLnRha2UoMSkuc3Vic2NyaWJlKChkYXRhOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgdXNlckNhblByb2NlZWQgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgZXhwZWN0KHVzZXJDYW5Qcm9jZWVkKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==
