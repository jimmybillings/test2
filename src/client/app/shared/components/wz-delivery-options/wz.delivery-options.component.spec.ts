import { WzDeliveryOptionsComponent } from './wz.delivery-options.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Wz Delivery Options Component', () => {
    let componentUnderTest: WzDeliveryOptionsComponent;
    let mockStore: MockAppStore;
    let deliverDispatchSpy: jasmine.Spy;
    let downloadDispatchSpy: jasmine.Spy;
    let downloadViaAsperaSpy: jasmine.Spy;
    let snackbarDisplaySpy: jasmine.Spy;

    beforeEach(() => {
      mockStore = new MockAppStore();
      mockStore.createStateSection('deliveryOptions', {
        options: [{ some: 'options' }], hasDeliveryOptions: true, loading: false
      });
      deliverDispatchSpy = mockStore.createActionFactoryMethod('deliveryOptions', 'deliver');
      downloadDispatchSpy = mockStore.createActionFactoryMethod('deliveryOptions', 'download');
      downloadViaAsperaSpy = mockStore.createActionFactoryMethod('deliveryOptions', 'downloadViaAspera');
      snackbarDisplaySpy = mockStore.createActionFactoryMethod('snackbar', 'display');
      componentUnderTest = new WzDeliveryOptionsComponent(mockStore);
    });

    describe('ngOnInit()', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
      });

      it('sets up the deliveryOptions Observable', () => {
        let options: any;
        componentUnderTest.deliveryOptions.take(1).subscribe(deliveryOptions => options = deliveryOptions);
        expect(options).toEqual([{ some: 'options' }]);
      });

      it('sets up the showMissingOptionsMessage Observable', () => {
        let showMessage: boolean;
        componentUnderTest.showMissingOptionsMessage.take(1).subscribe(show => showMessage = show);
        expect(showMessage).toBe(false);
      });

      it('sets up the showLoadingSpinner Observable', () => {
        let showLoading: boolean;
        componentUnderTest.showLoadingSpinner.take(1).subscribe(showLoadingSpinner => showLoading = showLoadingSpinner);
        expect(showLoading).toBe(false);
      });
    });

    describe('iconStringFor()', () => {
      it('returns the translation string interpolated with the option transfer type', () => {
        expect(componentUnderTest.iconStringFor({ deliveryOptionTransferType: 'aspera' } as any))
          .toEqual('ASSET.DELIVERY_OPTIONS.ICON.aspera');
      });
    });

    describe('trStringFor()', () => {
      it('returns the translation string interpolated with the first option of the group\'s label', () => {
        expect(componentUnderTest.trStringFor([{ deliveryOptionLabel: 'someLabel' }] as any))
          .toEqual('ASSET.DELIVERY_OPTIONS.LABEL.someLabel');
      });
    });

    describe('onDownloadBtnClick()', () => {
      describe('dispatches the proper action to the store', () => {
        it('for a \'location\' delivery type', () => {
          componentUnderTest.assetId = 1;
          componentUnderTest.markers = { some: 'markers' } as any;
          componentUnderTest.onDownloadBtnClick({ deliveryOptionTransferType: 'location' } as any);

          mockStore.expectDispatchFor(deliverDispatchSpy, 1, { deliveryOptionTransferType: 'location' }, { some: 'markers' });
        });

        it('for a \'download\' delivery type', () => {
          componentUnderTest.onDownloadBtnClick({ deliveryOptionTransferType: 'download' } as any);

          mockStore.expectDispatchFor(downloadDispatchSpy, { deliveryOptionTransferType: 'download' });
        });

        it('for a \'aspera\' delivery type', () => {
          componentUnderTest.onDownloadBtnClick({ deliveryOptionTransferType: 'aspera' } as any);

          mockStore.expectDispatchFor(downloadViaAsperaSpy, { deliveryOptionTransferType: 'aspera' });
        });

        it('for an invalid delivery type', () => {
          componentUnderTest.onDownloadBtnClick({ deliveryOptionTransferType: 'blah' } as any);

          mockStore.expectDispatchFor(snackbarDisplaySpy, 'DELIVERY_OPTIONS.DELIVERY_ERROR');
        });
      });
    });
  });
}
