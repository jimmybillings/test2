import { InvoiceComponent } from './invoice.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { Observable } from 'rxjs/Observable';
import { Pojo } from '../../../shared/interfaces/common.interface';

export function main() {

  describe('Invoice Component', () => {
    let componentUnderTest: InvoiceComponent;
    let mockStore: MockAppStore;
    let mockActivatedRoute: any;
    let mockDialogService: any;

    beforeEach(() => {
      mockStore = new MockAppStore();
      mockStore.createStateSection(
        'invoice', {
          invoice: {
            some: 'invoice',
            order: { id: 42, projects: [] },
            licenseDocuments: { items: [{ some: 'stuff' }] }
          }
        });
      mockActivatedRoute = { params: Observable.of({ share_key: 'abc-123' }) };

      mockDialogService = {
        openComponentInDialog: jasmine.createSpy('openComponentInDialog'),
        openConfirmationDialog: jasmine.createSpy('openConfirmationDialog'),
        openFormDialog: jasmine.createSpy('openFormDialog')
      };
      componentUnderTest = new InvoiceComponent(mockStore, mockActivatedRoute, mockDialogService);
    });

    describe('constructor()', () => {

      it('sets up the isShared Observable', () => {
        let isShared: boolean;
        componentUnderTest.isShared.take(1).subscribe(is => isShared = is);
        expect(isShared).toBe(true);
      });

      it('contains enhanced assets', () => {
        mockStore.createStateSection(
          'invoice',
          {
            invoice: {
              some: 'invoice',
              order: {
                id: 42,
                projects: [{ lineItems: [{ asset: {} }] }]
              }
            }
          }
        );

        new InvoiceComponent(mockStore, mockActivatedRoute, mockDialogService).invoiceObservable.subscribe(invoice => {
          const asset: any = invoice.order.projects[0].lineItems[0].asset;

          expect(asset.type).toEqual('order');
          expect(asset.parentId).toEqual(42);
        });
      });
    });

    const mockObj: Pojo = { a: { b: { c: { d: 'e', f: '', g: 0, h: {} } } } };

    describe('hasProp()', () => {
      it('returns true when the object has the property', () => {
        expect(componentUnderTest.hasProp(mockObj, 'a', 'b', 'c', 'd')).toBe(true);
      });
      it('returns false when the object does not have the property', () => {
        expect(componentUnderTest.hasProp(mockObj, 'a', 'd')).toBe(false);
      });
      it('returns false when the object property is an empty string', () => {
        expect(componentUnderTest.hasProp(mockObj, 'a', 'b', 'c', 'f')).toBe(false);
      });
      it('returns false when the object property is the number 0', () => {
        expect(componentUnderTest.hasProp(mockObj, 'a', 'b', 'c', 'g')).toBe(false);
      });
      it('returns false when the object property is an empty object', () => {
        expect(componentUnderTest.hasProp(mockObj, 'a', 'b', 'c', 'h')).toBe(false);
      });
      it('handles undefined objects', () => {
        expect(componentUnderTest.hasProp(undefined, 'a', 'd')).toBe(false);
      });
      it('handles no props', () => {
        expect(componentUnderTest.hasProp(mockObj)).toBe(true);
      });
    });

    describe('shouldDisplayRights()', () => {
      it('returns true when the line item is rights managed and order type is NOT a Trial', () => {
        let lineItem: any = { rightsManaged: 'Rights Managed' };
        let invoice: any = {
          order: { orderType: 'Not Trial' }
        };
        expect(componentUnderTest.shouldDisplayRights(lineItem, invoice))
          .toBe(true);
      });
      it('returns false when the line item is royalty-free', () => {
        let lineItem: any = { rightsManaged: 'Royalty Free' };
        let invoice: any = {
          order: { orderType: 'Trial' }
        };
        expect(componentUnderTest.shouldDisplayRights(lineItem, invoice))
          .toBe(false);
      });
      it('returns false when the order type is a Trial', () => {
        let lineItem: any = { rightsManaged: 'Rights Managed' };
        let invoice: any = {
          order: { orderType: 'Trial' }
        };
        expect(componentUnderTest.shouldDisplayRights(lineItem, invoice))
          .toBe(false);
      });
    });

    describe('shouldShowLicenseDetailsBtn()', () => {
      it('returns true when invoice contains license documents', () => {
        let licenseAgreements: any = {
          items: [{ some: 'licenses' }]
        };
        expect(componentUnderTest.shouldShowLicenseDetailsBtn(licenseAgreements))
          .toBe(true);
      });

      it('returns false when the License documents do not contain items', () => {
        let licenseAgreements: any = {
          notItems: {}
        };
        expect(componentUnderTest.shouldShowLicenseDetailsBtn(licenseAgreements))
          .toBe(false);
      });

      it('returns false when the LicenseDocuments are empty', () => {
        let licenseAgreements: any = {};
        expect(componentUnderTest.shouldShowLicenseDetailsBtn(licenseAgreements))
          .toBe(false);
      });
    });


    describe('showLicenseAgreements()', () => {
      let licenseAgreements: any = {
        items: [{ some: 'licenses' }]
      };
      it('calls openComponentInDialog() on the dialog service (with the right config)', () => {
        componentUnderTest.showLicenseAgreements(licenseAgreements);

        expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
          componentType: jasmine.any(Function),
          dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
          inputOptions: {
            assetType: 'order',
            licenses: { items: [{ some: 'licenses' }] }
          },
          outputOptions: [
            {
              event: 'close',
              callback: jasmine.any(Function),
              closeOnEvent: true
            }
          ]
        });
      });
    });
  });
}
