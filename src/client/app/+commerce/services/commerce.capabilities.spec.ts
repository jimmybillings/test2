import { Observable } from 'rxjs/Observable';

import { MockAppStore } from '../../store/spec-helpers/mock-app.store';
import { CommerceCapabilities } from './commerce.capabilities';
import { QuoteState } from '../../shared/interfaces/commerce.interface';

export function main() {
  describe('Commerce Capabilities', () => {
    let mockCurrentUserService: any;
    let mockStore: MockAppStore;
    let mockFeature: any;
    let capabilitiesUnderTest: CommerceCapabilities;

    beforeEach(() => {
      mockStore = new MockAppStore();
      mockCurrentUserService = {};
      mockFeature = {};

      capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature);
    });

    describe('viewCartIcon()', () => {
      function instantiator(loggedIn: boolean, canBeFixed: boolean, permission: boolean) {
        mockCurrentUserService = { loggedIn: () => loggedIn, hasPermission: () => permission };
        mockStore.createStateSection('headerDisplayOptions', { canBeFixed: canBeFixed });
        mockFeature = { isAvailable: () => true };
        return capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature);
      }

      it('returns false when header can\'t be fixed and no permission', () => {
        capabilitiesUnderTest = instantiator(true, false, false);
        expect(capabilitiesUnderTest.viewCartIcon()).toBe(false);
      });

      it('returns false when header can be fixed but no permission', () => {
        capabilitiesUnderTest = instantiator(false, true, false);
        expect(capabilitiesUnderTest.viewCartIcon()).toBe(false);
      });

      it('returns false when header not expanded but has permission', () => {
        capabilitiesUnderTest = instantiator(false, false, true);
        expect(capabilitiesUnderTest.viewCartIcon()).toBe(false);
      });

      it('returns true when header is expanded and has permission', () => {
        capabilitiesUnderTest = instantiator(true, true, true);
        expect(capabilitiesUnderTest.viewCartIcon()).toBe(true);
      });
    });

    describe('purchaseOnCredit()', () => {
      let hasPurchaseOnCredit: boolean;

      beforeEach(() => {
        mockCurrentUserService = { hasPurchaseOnCredit: () => hasPurchaseOnCredit };
        mockFeature = { isAvailable: () => true };
      });

      it('returns false when User does not have purchaseOnCredit', () => {
        hasPurchaseOnCredit = false;

        expect(new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature).purchaseOnCredit())
          .toBe(false);
      });

      it('returns true when User has purchaseOnCredit', () => {
        hasPurchaseOnCredit = true;

        expect(new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature).purchaseOnCredit())
          .toBe(true);
      });
    });

    describe('editAddress', () => {
      it('should return true for an address of type \'User\' that has a valid address', () => {
        let addr: any = { type: 'User', address: {} };
        expect(capabilitiesUnderTest.editAddress(addr)).toBe(true);
      });

      it('should return false for an address of type \'Account\' that has a valid address', () => {
        let addr: any = { type: 'Account', address: {} };
        expect(capabilitiesUnderTest.editAddress(addr)).toBe(false);
      });

      it('should return false for an address of type \'User\' that does not have a valid address', () => {
        let addr: any = { type: 'Account' };
        expect(capabilitiesUnderTest.editAddress(addr)).toBe(false);
      });
    });

    describe('addAddress', () => {
      it('should return false for an address of type \'User\' that has a valid address', () => {
        let addr: any = { type: 'User', address: {} };
        expect(capabilitiesUnderTest.addAddress(addr)).toBe(false);
      });

      it('should return false for an address of type \'Account\' that does not have a valid address', () => {
        let addr: any = { type: 'Account' };
        expect(capabilitiesUnderTest.addAddress(addr)).toBe(false);
      });

      it('should return true for an address of type \'User\' that does not have a valid address', () => {
        let addr: any = { type: 'User' };
        expect(capabilitiesUnderTest.addAddress(addr)).toBe(true);
      });
    });

    describe('editAccountAddress', () => {
      let hasPermission: boolean, addr: any;

      beforeEach(() => {
        mockCurrentUserService = { hasPermission: () => hasPermission };
      });

      it('should return false if the User doesnt have the permission', () => {
        addr = { type: 'Account', address: {} };
        hasPermission = false;
        capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, null, null);
        expect(capabilitiesUnderTest.editAccountAddress(addr)).toBe(false);
      });

      it('should return false if the address is of type \'User\'', () => {
        addr = { type: 'User', address: {} };
        hasPermission = true;
        capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, null, null);
        expect(capabilitiesUnderTest.editAccountAddress(addr)).toBe(false);
      });

      it('should return false if there is no address', () => {
        addr = { type: 'Account' };
        hasPermission = true;
        capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, null, null);
        expect(capabilitiesUnderTest.editAccountAddress(addr)).toBe(false);
      });

      it('should return true if all conditions are met', () => {
        addr = { type: 'Account', address: {} };
        hasPermission = true;
        capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, null, null);
        expect(capabilitiesUnderTest.editAccountAddress(addr)).toBe(true);
      });
    });

    describe('addAccountAddress', () => {
      let hasPermission: boolean, addr: any;

      beforeEach(() => {
        mockCurrentUserService = { hasPermission: () => hasPermission };
      });

      it('should return false if the User doesnt have the permission', () => {
        addr = { type: 'Account' };
        hasPermission = false;
        capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, null, null);
        expect(capabilitiesUnderTest.addAccountAddress(addr)).toBe(false);
      });

      it('should return false if the address is of type \'User\'', () => {
        addr = { type: 'User' };
        hasPermission = true;
        capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, null, null);
        expect(capabilitiesUnderTest.addAccountAddress(addr)).toBe(false);
      });

      it('should return false if there is an address', () => {
        addr = { type: 'Account', address: {} };
        hasPermission = true;
        capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, null, null);
        expect(capabilitiesUnderTest.addAccountAddress(addr)).toBe(false);
      });

      it('should return true if all conditions are met', () => {
        addr = { type: 'Account' };
        hasPermission = true;
        capabilitiesUnderTest = new CommerceCapabilities(mockCurrentUserService, null, null);
        expect(capabilitiesUnderTest.addAccountAddress(addr)).toBe(true);
      });
    });

    describe('cloneQuote()', () => {

      const oneAsset = {
        'data': {
          'lastUpdated': '2017-07-23T18:41:21Z',
          'createdOn': '2017-07-23T18:20:00Z',
          'id': 282,
          'siteName': 'commerce',
          'projects': [
            {
              'name': '2017-04-27',
              'id': '390bec17-929b-452d-a2f4-27b7b04cb6ea',
              'lineItems': [
                {
                  'asset': {
                    'assetId': 33737670
                  },
                  'id': 'f642f893-f4cf-4a3c-ad5e-dc2d0cd1a321',
                  'subTotal': 159
                }
              ],
              'assetLineItemSubtotal': 159,
              'feeLineItemSubtotal': 0,
              'totalAmount': 79.5,
              'subTotal': 159
            }
          ]
        }
      };

      const oneFeeItem = {
        'data': {
          'lastUpdated': '2017-07-23T18:48:15Z',
          'createdOn': '2017-07-23T18:20:00Z',
          'id': 282,
          'siteName': 'commerce',
          'projects': [
            {
              'name': '2017-04-27',
              'id': '390bec17-929b-452d-a2f4-27b7b04cb6ea',
              'feeLineItems': [
                {
                  'amount': 60,
                  'feeType': 'Research',
                  'notes': '',
                  'id': '3902a6f0-588f-4bfd-a0ee-2c02c864658f'
                }
              ],
              'assetLineItemSubtotal': 0,
              'feeLineItemSubtotal': 60,
              'totalAmount': 60,
              'subTotal': 60
            }
          ]
        }
      };

      const oneFeeItemAndOneAsset = {
        'data': {
          'lastUpdated': '2017-07-23T18:46:52Z',
          'createdOn': '2017-07-23T18:20:00Z',
          'id': 282,
          'siteName': 'commerce',
          'projects': [{
            'name': '2017-04-27',
            'id': '390bec17-929b-452d-a2f4-27b7b04cb6ea',
            'lineItems': [{
              'asset': {
                'assetId': 33737670
              },
              'id': 'f642f893-f4cf-4a3c-ad5e-dc2d0cd1a321',
              'subTotal': 159
            }],
            'feeLineItems': [{
              'amount': 60,
              'feeType': 'Research',
              'notes': '',
              'id': '3902a6f0-588f-4bfd-a0ee-2c02c864658f'
            }],
            'assetLineItemSubtotal': 159,
            'feeLineItemSubtotal': 60,
            'totalAmount': 139.5,
            'subTotal': 219
          }]
        }
      };

      const noFeeItemOrAsset = {
        'data': {
          'lastUpdated': '2017-07-23T18:49:05Z',
          'createdOn': '2017-07-23T18:20:00Z',
          'id': 282,
          'siteName': 'commerce',
          'projects': [
            {
              'name': '2017-04-27',
              'id': '390bec17-929b-452d-a2f4-27b7b04cb6ea',
              'assetLineItemSubtotal': 0,
              'feeLineItemSubtotal': 0,
              'totalAmount': 0,
              'subTotal': 0
            }
          ]
        }
      };

      let hasPermission: boolean = true;
      let mockCurrentUserService: any;
      beforeEach(() => {
        mockCurrentUserService = { hasPermission: () => hasPermission };
      });

      it('Should return true if a user has at least one asset', () => {
        new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature)
          .cloneQuote(Observable.of(oneAsset) as any)
          .subscribe((result: boolean) => {
            expect(result).toBe(true);
          });
      });

      it('Should return true if a user has at least one fee item', () => {
        new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature)
          .cloneQuote(Observable.of(oneFeeItem) as any)
          .subscribe((result: boolean) => {
            expect(result).toBe(true);
          });
      });

      it('Should return true if a user has both at least one asset AND one fee item', () => {
        new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature)
          .cloneQuote(Observable.of(oneFeeItemAndOneAsset) as any)
          .subscribe((result: boolean) => {
            expect(result).toBe(true);
          });
      });

      it('Should return false if a user no assets or fee items', () => {
        new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature)
          .cloneQuote(Observable.of(noFeeItemOrAsset) as any)
          .subscribe((result: boolean) => {
            expect(result).toBe(false);
          });
      });
    });

    describe('userHas()', () => {
      let hasPermission: boolean;

      beforeEach(() => {
        mockCurrentUserService = { hasPermission: () => hasPermission };
      });

      it('returns false when User does not have permission', () => {
        hasPermission = false;

        expect(new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature).userHas('whatever'))
          .toBe(false);
      });

      it('returns true when User has permission', () => {
        hasPermission = true;

        expect(new CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature).userHas('whatever'))
          .toBe(true);
      });
    });
  });
};
