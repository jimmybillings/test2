import { Observable } from 'rxjs/Observable';
import { CommerceBillingTab } from './commerce-billing-tab';
import { Address, ViewAddress } from '../../../shared/interfaces/user.interface';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { Pojo } from '../../../shared/interfaces/common.interface';

export function main() {
  describe('Billing Tab Class', () => {
    let componentUnderTest: CommerceBillingTab;
    let mockCartService: any, mockUserService: any, mockDialogService: any, mockCurrentUserService: any;
    let mockUserAccountPermission: boolean;
    let mockStore: MockAppStore;

    let mockEmptyAddress: ViewAddress = {
      type: null,
      name: null,
      addressEntityId: NaN,
      defaultAddress: false
    };

    let mockAddressA: ViewAddress = {
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

    let mockAddressB: ViewAddress = {
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

    let mockInvoiceContact: Pojo = {
      addressId: 2,
      billingInfo: { address: {} },
      email: 'invoice.contact@gmail.com',
      firstName: 'Invoice',
      lastName: 'Contact',
      type: 'User'
    };

    beforeEach(() => {
      mockCartService = {
        data: Observable.of({
          cart: { itemCount: 1, projects: [] }
        }),
        determineNewSelectedAddress: jasmine.createSpy('determineNewSelectedAddress'),
        updateOrderInProgress: jasmine.createSpy('updateOrderInProgress')
      };

      mockUserService = {
        getAddresses: jasmine.createSpy('getAddresses').and.returnValue(Observable.of([mockAddressA, mockAddressB])),
        addBillingAddress: jasmine.createSpy('addBillingAddress').and.returnValue(Observable.of({})),
        addAccountBillingAddress: jasmine.createSpy('addAccountBillingAddress').and.returnValue(Observable.of({}))
      };

      mockDialogService = {
        openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable.of({ data: 'Test data' })),
      };

      mockCurrentUserService = {
        state: { purchaseOnCredit: true }
      };

      mockStore = new MockAppStore();
      mockStore.createActionFactoryMethod('checkout', 'setAvailableAddresses');
      mockStore.createActionFactoryMethod('checkout', 'setSelectedAddress');
      mockStore.createStateSection('checkout', { selectedAddress: mockAddressA, addresses: [mockAddressA, mockAddressB] });

      componentUnderTest = new CommerceBillingTab(
        null, mockCartService, mockUserService, mockCurrentUserService, mockDialogService, mockStore
      );
    });

    describe('typeFor()', () => {
      it('returns the address\'s type', () => {
        expect(componentUnderTest.typeFor(mockAddressA)).toBe('User');
        expect(componentUnderTest.typeFor(mockAddressB)).toBe('Account');
      });

      it('returns and emptuy string if the address doesn\'t have a type', () => {
        expect(componentUnderTest.typeFor(mockEmptyAddress)).toBe('');
      });
    });

    describe('nameFor()', () => {
      it('returns the address\'s name', () => {
        expect(componentUnderTest.nameFor(mockAddressA)).toBe('Ross Edfort');
        expect(componentUnderTest.nameFor(mockAddressB)).toBe('Wazee Digital');
      });

      it('returns an empty string if the address doesn\'t have a name', () => {
        expect(componentUnderTest.nameFor(mockEmptyAddress)).toBe('');
      });
    });

    describe('lineOneFor()', () => {
      it('returns the address\'s first line', () => {
        expect(componentUnderTest.lineOneFor(mockAddressA)).toBe('123 Main Street');
        expect(componentUnderTest.lineOneFor(mockAddressB)).toBe('1515 Arapahoe Street, Tower 3, Suite 400');
      });
    });

    describe('cityFor()', () => {
      it('returns the address\'s city', () => {
        expect(componentUnderTest.cityFor(mockAddressA)).toBe('Denver,');
      });

      it('returns an empty string if the address doesn\'t have a city', () => {
        expect(componentUnderTest.cityFor(mockEmptyAddress)).toBe('');
      });
    });

    describe('stateFor()', () => {
      it('returns the address\'s state', () => {
        expect(componentUnderTest.stateFor(mockAddressA)).toBe('CO');
      });

      it('returns null if the address doesn\'t have a state', () => {
        expect(componentUnderTest.stateFor(mockEmptyAddress)).toBeNull();
      });
    });

    describe('zipcodeFor()', () => {
      it('returns the address\'s zip', () => {
        expect(componentUnderTest.zipcodeFor(mockAddressA)).toBe('80202,');
      });

      it('returns an empty string if the address doesn\'t have a zip', () => {
        expect(componentUnderTest.zipcodeFor(mockEmptyAddress)).toBe('');
      });
    });

    describe('zipcodeFor()', () => {
      it('returns the address\'s zipcode', () => {
        expect(componentUnderTest.zipcodeFor(mockAddressA)).toBe('80202,');
      });

      it('returns an empty string if the address doesn\'t have a zipcode', () => {
        expect(componentUnderTest.zipcodeFor(mockEmptyAddress)).toBe('');
      });
    });

    describe('countryFor()', () => {
      it('returns the address\'s country', () => {
        expect(componentUnderTest.countryFor(mockAddressA)).toBe('USA');
      });

      it('returns null if the address doesn\'t have a country', () => {
        expect(componentUnderTest.countryFor(mockEmptyAddress)).toBeNull();
      });
    });

    describe('phoneFor()', () => {
      it('returns the address\'s phone number', () => {
        expect(componentUnderTest.phoneFor(mockAddressA)).toBe('5555555555');
      });

      it('returns null if the address doesn\'t have a phone number', () => {
        expect(componentUnderTest.phoneFor(mockEmptyAddress)).toBeNull();
      });
    });

    describe('addUserAddress()', () => {
      it('should call addBillingAddress() on the user service', () => {
        componentUnderTest.addUserAddress(mockAddressA.address);

        expect(mockUserService.addBillingAddress).toHaveBeenCalledWith(mockAddressA.address);
      });

      it('should re-fetch the addresses', () => {
        componentUnderTest.addUserAddress(mockAddressA.address);

        expect(mockUserService.getAddresses).toHaveBeenCalled();
      });
    });

    describe('addAccountAddress()', () => {
      it('should call addAccountBillingAddress() on the user service', () => {
        componentUnderTest.addAccountAddress(mockAddressB.address, mockAddressA);

        let newAddress: ViewAddress = Object.assign({}, mockAddressA, { address: mockAddressB.address });

        expect(mockUserService.addAccountBillingAddress).toHaveBeenCalledWith(newAddress);
      });
    });

    describe('formatAndSelectAddress()', () => {

      it('should call selectAddress() with a properly formatted invoice contact', () => {
        spyOn(componentUnderTest, 'selectAddress');
        componentUnderTest.formatAndSelectAddress(mockInvoiceContact);

        let invoiceAddress: Pojo = { addressEntityId: 2, type: 'User', name: 'Invoice Contact', address: {} };

        expect(componentUnderTest.selectAddress).toHaveBeenCalledWith(invoiceAddress);
      });

      it('should re-fetch the addresses', () => {
        componentUnderTest.addUserAddress(mockAddressA.address);

        expect(mockUserService.getAddresses).toHaveBeenCalled();
      });
    });

    describe('openFormFor', () => {
      describe('user', () => {
        it('should open a dialog and call addBillingAddress if mode is "edit"', () => {
          componentUnderTest.openFormFor('user', 'edit', mockAddressB);

          expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
        });

        it('should open a dialog and call addUserAddress if mode is "create"', () => {
          componentUnderTest.openFormFor('user', 'create');

          expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
        });
      });

      describe('account', () => {
        it('should open a dialog and call addAccountBillingAddress if mode is "edit"', () => {
          componentUnderTest.openFormFor('account', 'edit', mockAddressB);

          expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
        });

        it('should open a dialog and call addAccountBillingAddress if mode is "create"', () => {
          componentUnderTest.openFormFor('account', 'create');

          expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
        });
      });
    });

    describe('displayAddressErrors()', () => {
      it('should return true when the address has errors', () => {
        componentUnderTest.addressErrors = { 123: ['city'] };
        expect(componentUnderTest.displayAddressErrors(123)).toBe(true);
      });

      it('should return false when the address does not have errors', () => {
        componentUnderTest.addressErrors = { 123: [] };
        expect(componentUnderTest.displayAddressErrors(123)).toBe(false);
      });
    });

    describe('formatAddressErrors()', () => {
      it('should return the right string for 1 error', () => {
        componentUnderTest.addressErrors = { 10: ['city'] };
        expect(componentUnderTest.formatAddressErrors(mockAddressA)).toBe('city');
      });

      it('should return the right string for 2 errors', () => {
        componentUnderTest.addressErrors = { 10: ['city', 'state'] };
        expect(componentUnderTest.formatAddressErrors(mockAddressA)).toBe('city, and state');
      });

      it('should return the right string for more than 2 errors', () => {
        componentUnderTest.addressErrors = { 10: ['city', 'state', 'phone', 'zipcode'] };
        expect(componentUnderTest.formatAddressErrors(mockAddressA)).toBe('city, state, phone, and zipcode');
      });
    });

    describe('get userCanProceed()', () => {
      it('should return false if the selectedAddress has no values', () => {
        mockStore.createStateSection('checkout', {
          addresses: [mockAddressA], selectedAddress: { type: 'user', address: { address: '', state: '' } }
        });
        let userCanProceed: boolean;
        componentUnderTest.userCanProceed.take(1).subscribe((data: boolean) => {
          userCanProceed = data;
        });
        expect(userCanProceed).toBe(false);
      });

      it('should return true if there is a selectedAddress with all values', () => {
        mockStore.createStateSection('checkout', {
          addresses: [mockAddressA], selectedAddress: { type: 'user', address: { address: 'b', state: 'a' } }
        });
        let userCanProceed: boolean;
        componentUnderTest.userCanProceed.take(1).subscribe((data: boolean) => {
          userCanProceed = data;
        });
        expect(userCanProceed).toBe(true);
      });
    });
  });
};
