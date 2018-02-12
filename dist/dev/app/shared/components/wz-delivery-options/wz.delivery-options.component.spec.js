"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_delivery_options_component_1 = require("./wz.delivery-options.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Wz Delivery Options Component', function () {
        var componentUnderTest;
        var mockStore;
        var deliverDispatchSpy;
        var downloadDispatchSpy;
        var downloadViaAsperaSpy;
        var snackbarDisplaySpy;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('deliveryOptions', {
                options: [{ some: 'options' }], hasDeliveryOptions: true, loading: false
            });
            deliverDispatchSpy = mockStore.createActionFactoryMethod('deliveryOptions', 'deliver');
            downloadDispatchSpy = mockStore.createActionFactoryMethod('deliveryOptions', 'download');
            downloadViaAsperaSpy = mockStore.createActionFactoryMethod('deliveryOptions', 'downloadViaAspera');
            snackbarDisplaySpy = mockStore.createActionFactoryMethod('snackbar', 'display');
            componentUnderTest = new wz_delivery_options_component_1.WzDeliveryOptionsComponent(mockStore);
        });
        describe('ngOnInit()', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
            });
            it('sets up the deliveryOptions Observable', function () {
                var options;
                componentUnderTest.deliveryOptions.take(1).subscribe(function (deliveryOptions) { return options = deliveryOptions; });
                expect(options).toEqual([{ some: 'options' }]);
            });
            it('sets up the showMissingOptionsMessage Observable', function () {
                var showMessage;
                componentUnderTest.showMissingOptionsMessage.take(1).subscribe(function (show) { return showMessage = show; });
                expect(showMessage).toBe(false);
            });
            it('sets up the showLoadingSpinner Observable', function () {
                var showLoading;
                componentUnderTest.showLoadingSpinner.take(1).subscribe(function (showLoadingSpinner) { return showLoading = showLoadingSpinner; });
                expect(showLoading).toBe(false);
            });
        });
        describe('iconStringFor()', function () {
            it('returns the translation string interpolated with the option transfer type', function () {
                expect(componentUnderTest.iconStringFor({ deliveryOptionTransferType: 'aspera' }))
                    .toEqual('ASSET.DELIVERY_OPTIONS.ICON.aspera');
            });
        });
        describe('trStringFor()', function () {
            it('returns the translation string interpolated with the first option of the group\'s label', function () {
                expect(componentUnderTest.trStringFor([{ deliveryOptionLabel: 'someLabel' }]))
                    .toEqual('ASSET.DELIVERY_OPTIONS.LABEL.someLabel');
            });
        });
        describe('onDownloadBtnClick()', function () {
            describe('dispatches the proper action to the store', function () {
                it('for a \'location\' delivery type', function () {
                    componentUnderTest.assetId = 1;
                    componentUnderTest.markers = { some: 'markers' };
                    componentUnderTest.onDownloadBtnClick({ deliveryOptionTransferType: 'location' });
                    mockStore.expectDispatchFor(deliverDispatchSpy, 1, { deliveryOptionTransferType: 'location' }, { some: 'markers' });
                });
                it('for a \'download\' delivery type', function () {
                    componentUnderTest.onDownloadBtnClick({ deliveryOptionTransferType: 'download' });
                    mockStore.expectDispatchFor(downloadDispatchSpy, { deliveryOptionTransferType: 'download' });
                });
                it('for a \'aspera\' delivery type', function () {
                    componentUnderTest.onDownloadBtnClick({ deliveryOptionTransferType: 'aspera' });
                    mockStore.expectDispatchFor(downloadViaAsperaSpy, { deliveryOptionTransferType: 'aspera' });
                });
                it('for an invalid delivery type', function () {
                    componentUnderTest.onDownloadBtnClick({ deliveryOptionTransferType: 'blah' });
                    mockStore.expectDispatchFor(snackbarDisplaySpy, 'DELIVERY_OPTIONS.DELIVERY_ERROR');
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1kZWxpdmVyeS1vcHRpb25zL3d6LmRlbGl2ZXJ5LW9wdGlvbnMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRkFBNkU7QUFDN0UsNkVBQTBFO0FBRTFFO0lBQ0UsUUFBUSxDQUFDLCtCQUErQixFQUFFO1FBQ3hDLElBQUksa0JBQThDLENBQUM7UUFDbkQsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksa0JBQStCLENBQUM7UUFDcEMsSUFBSSxtQkFBZ0MsQ0FBQztRQUNyQyxJQUFJLG9CQUFpQyxDQUFDO1FBQ3RDLElBQUksa0JBQStCLENBQUM7UUFFcEMsVUFBVSxDQUFDO1lBQ1QsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDOUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUs7YUFDekUsQ0FBQyxDQUFDO1lBQ0gsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZGLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN6RixvQkFBb0IsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUNuRyxrQkFBa0IsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hGLGtCQUFrQixHQUFHLElBQUksMERBQTBCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFVB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LG1CQUFtQixFQUFFLEVBQUUsMEJBQTBCLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDL0YsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO29CQUNuQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBUyxDQUFDLENBQUM7b0JBRXZGLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzlGLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtvQkFDakMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLEVBQVMsQ0FBQyxDQUFDO29CQUVyRixTQUFTLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztnQkFDckYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBekZELG9CQXlGQyIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvd3otZGVsaXZlcnktb3B0aW9ucy93ei5kZWxpdmVyeS1vcHRpb25zLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV3pEZWxpdmVyeU9wdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL3d6LmRlbGl2ZXJ5LW9wdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnV3ogRGVsaXZlcnkgT3B0aW9ucyBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pEZWxpdmVyeU9wdGlvbnNDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuICAgIGxldCBkZWxpdmVyRGlzcGF0Y2hTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBkb3dubG9hZERpc3BhdGNoU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgZG93bmxvYWRWaWFBc3BlcmFTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBzbmFja2JhckRpc3BsYXlTcHk6IGphc21pbmUuU3B5O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdkZWxpdmVyeU9wdGlvbnMnLCB7XG4gICAgICAgIG9wdGlvbnM6IFt7IHNvbWU6ICdvcHRpb25zJyB9XSwgaGFzRGVsaXZlcnlPcHRpb25zOiB0cnVlLCBsb2FkaW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICBkZWxpdmVyRGlzcGF0Y2hTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnZGVsaXZlcnlPcHRpb25zJywgJ2RlbGl2ZXInKTtcbiAgICAgIGRvd25sb2FkRGlzcGF0Y2hTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnZGVsaXZlcnlPcHRpb25zJywgJ2Rvd25sb2FkJyk7XG4gICAgICBkb3dubG9hZFZpYUFzcGVyYVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdkZWxpdmVyeU9wdGlvbnMnLCAnZG93bmxvYWRWaWFBc3BlcmEnKTtcbiAgICAgIHNuYWNrYmFyRGlzcGxheVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdzbmFja2JhcicsICdkaXNwbGF5Jyk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgV3pEZWxpdmVyeU9wdGlvbnNDb21wb25lbnQobW9ja1N0b3JlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uSW5pdCgpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZXRzIHVwIHRoZSBkZWxpdmVyeU9wdGlvbnMgT2JzZXJ2YWJsZScsICgpID0+IHtcbiAgICAgICAgbGV0IG9wdGlvbnM6IGFueTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRlbGl2ZXJ5T3B0aW9ucy50YWtlKDEpLnN1YnNjcmliZShkZWxpdmVyeU9wdGlvbnMgPT4gb3B0aW9ucyA9IGRlbGl2ZXJ5T3B0aW9ucyk7XG4gICAgICAgIGV4cGVjdChvcHRpb25zKS50b0VxdWFsKFt7IHNvbWU6ICdvcHRpb25zJyB9XSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgdXAgdGhlIHNob3dNaXNzaW5nT3B0aW9uc01lc3NhZ2UgT2JzZXJ2YWJsZScsICgpID0+IHtcbiAgICAgICAgbGV0IHNob3dNZXNzYWdlOiBib29sZWFuO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2hvd01pc3NpbmdPcHRpb25zTWVzc2FnZS50YWtlKDEpLnN1YnNjcmliZShzaG93ID0+IHNob3dNZXNzYWdlID0gc2hvdyk7XG4gICAgICAgIGV4cGVjdChzaG93TWVzc2FnZSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgdXAgdGhlIHNob3dMb2FkaW5nU3Bpbm5lciBPYnNlcnZhYmxlJywgKCkgPT4ge1xuICAgICAgICBsZXQgc2hvd0xvYWRpbmc6IGJvb2xlYW47XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zaG93TG9hZGluZ1NwaW5uZXIudGFrZSgxKS5zdWJzY3JpYmUoc2hvd0xvYWRpbmdTcGlubmVyID0+IHNob3dMb2FkaW5nID0gc2hvd0xvYWRpbmdTcGlubmVyKTtcbiAgICAgICAgZXhwZWN0KHNob3dMb2FkaW5nKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2ljb25TdHJpbmdGb3IoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSB0cmFuc2xhdGlvbiBzdHJpbmcgaW50ZXJwb2xhdGVkIHdpdGggdGhlIG9wdGlvbiB0cmFuc2ZlciB0eXBlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmljb25TdHJpbmdGb3IoeyBkZWxpdmVyeU9wdGlvblRyYW5zZmVyVHlwZTogJ2FzcGVyYScgfSBhcyBhbnkpKVxuICAgICAgICAgIC50b0VxdWFsKCdBU1NFVC5ERUxJVkVSWV9PUFRJT05TLklDT04uYXNwZXJhJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0clN0cmluZ0ZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIHRyYW5zbGF0aW9uIHN0cmluZyBpbnRlcnBvbGF0ZWQgd2l0aCB0aGUgZmlyc3Qgb3B0aW9uIG9mIHRoZSBncm91cFxcJ3MgbGFiZWwnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudHJTdHJpbmdGb3IoW3sgZGVsaXZlcnlPcHRpb25MYWJlbDogJ3NvbWVMYWJlbCcgfV0gYXMgYW55KSlcbiAgICAgICAgICAudG9FcXVhbCgnQVNTRVQuREVMSVZFUllfT1BUSU9OUy5MQUJFTC5zb21lTGFiZWwnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uRG93bmxvYWRCdG5DbGljaygpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ2Rpc3BhdGNoZXMgdGhlIHByb3BlciBhY3Rpb24gdG8gdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICBpdCgnZm9yIGEgXFwnbG9jYXRpb25cXCcgZGVsaXZlcnkgdHlwZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRJZCA9IDE7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm1hcmtlcnMgPSB7IHNvbWU6ICdtYXJrZXJzJyB9IGFzIGFueTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Eb3dubG9hZEJ0bkNsaWNrKHsgZGVsaXZlcnlPcHRpb25UcmFuc2ZlclR5cGU6ICdsb2NhdGlvbicgfSBhcyBhbnkpO1xuXG4gICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKGRlbGl2ZXJEaXNwYXRjaFNweSwgMSwgeyBkZWxpdmVyeU9wdGlvblRyYW5zZmVyVHlwZTogJ2xvY2F0aW9uJyB9LCB7IHNvbWU6ICdtYXJrZXJzJyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBhIFxcJ2Rvd25sb2FkXFwnIGRlbGl2ZXJ5IHR5cGUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uRG93bmxvYWRCdG5DbGljayh7IGRlbGl2ZXJ5T3B0aW9uVHJhbnNmZXJUeXBlOiAnZG93bmxvYWQnIH0gYXMgYW55KTtcblxuICAgICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihkb3dubG9hZERpc3BhdGNoU3B5LCB7IGRlbGl2ZXJ5T3B0aW9uVHJhbnNmZXJUeXBlOiAnZG93bmxvYWQnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIGEgXFwnYXNwZXJhXFwnIGRlbGl2ZXJ5IHR5cGUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uRG93bmxvYWRCdG5DbGljayh7IGRlbGl2ZXJ5T3B0aW9uVHJhbnNmZXJUeXBlOiAnYXNwZXJhJyB9IGFzIGFueSk7XG5cbiAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IoZG93bmxvYWRWaWFBc3BlcmFTcHksIHsgZGVsaXZlcnlPcHRpb25UcmFuc2ZlclR5cGU6ICdhc3BlcmEnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIGFuIGludmFsaWQgZGVsaXZlcnkgdHlwZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Eb3dubG9hZEJ0bkNsaWNrKHsgZGVsaXZlcnlPcHRpb25UcmFuc2ZlclR5cGU6ICdibGFoJyB9IGFzIGFueSk7XG5cbiAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3Ioc25hY2tiYXJEaXNwbGF5U3B5LCAnREVMSVZFUllfT1BUSU9OUy5ERUxJVkVSWV9FUlJPUicpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
