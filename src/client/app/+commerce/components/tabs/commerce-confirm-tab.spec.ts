import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { CommerceConfirmTab } from './commerce-confirm-tab';
import { ViewAddress } from '../../../shared/interfaces/user.interface';

export function main() {
  describe('Confirm Tab Component', () => {
    let componentUnderTest: CommerceConfirmTab;
    let mockCommerceService: any;
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

    beforeEach(() => {
      mockCommerceService = { state: { data: { itemCount: 1, projects: [], quoteStauts: 'blah' } } };
      mockStore = new MockAppStore();
      componentUnderTest = new CommerceConfirmTab(null, mockCommerceService, null, null, mockStore);
    });

    describe('hasDiscount()', () => {
      it('should return false when discount does NOT exists', () => {
        expect(componentUnderTest.hasDiscount).toBe(false);
      });

      it('should return true if discount has a value', () => {
        let mockState = { data: { discount: 12.0 } };

        mockCommerceService = {
          state: mockState,
        };
        componentUnderTest = new CommerceConfirmTab(null, mockCommerceService, null, null, mockStore);
        expect(componentUnderTest.hasDiscount).toBe(true);
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

  });
};
