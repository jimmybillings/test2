"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invoice_component_1 = require("./invoice.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var Observable_1 = require("rxjs/Observable");
function main() {
    describe('Invoice Component', function () {
        var componentUnderTest;
        var mockStore;
        var mockActivatedRoute;
        var mockDialogService;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('invoice', {
                invoice: {
                    some: 'invoice',
                    order: { id: 42, projects: [] },
                    licenseDocuments: { items: [{ some: 'stuff' }] }
                }
            });
            mockActivatedRoute = { params: Observable_1.Observable.of({ share_key: 'abc-123' }) };
            mockDialogService = {
                openComponentInDialog: jasmine.createSpy('openComponentInDialog'),
                openConfirmationDialog: jasmine.createSpy('openConfirmationDialog'),
                openFormDialog: jasmine.createSpy('openFormDialog')
            };
            componentUnderTest = new invoice_component_1.InvoiceComponent(mockStore, mockActivatedRoute, mockDialogService);
        });
        describe('constructor()', function () {
            it('sets up the isShared Observable', function () {
                var isShared;
                componentUnderTest.isShared.take(1).subscribe(function (is) { return isShared = is; });
                expect(isShared).toBe(true);
            });
            it('contains enhanced assets', function () {
                mockStore.createStateSection('invoice', {
                    invoice: {
                        some: 'invoice',
                        order: {
                            id: 42,
                            projects: [{ lineItems: [{ asset: {} }] }]
                        }
                    }
                });
                new invoice_component_1.InvoiceComponent(mockStore, mockActivatedRoute, mockDialogService).invoiceObservable.subscribe(function (invoice) {
                    var asset = invoice.order.projects[0].lineItems[0].asset;
                    expect(asset.type).toEqual('order');
                    expect(asset.parentId).toEqual(42);
                });
            });
        });
        var mockObj = { a: { b: { c: { d: 'e', f: '', g: 0, h: {} } } } };
        describe('hasProp()', function () {
            it('returns true when the object has the property', function () {
                expect(componentUnderTest.hasProp(mockObj, 'a', 'b', 'c', 'd')).toBe(true);
            });
            it('returns false when the object does not have the property', function () {
                expect(componentUnderTest.hasProp(mockObj, 'a', 'd')).toBe(false);
            });
            it('returns false when the object property is an empty string', function () {
                expect(componentUnderTest.hasProp(mockObj, 'a', 'b', 'c', 'f')).toBe(false);
            });
            it('returns false when the object property is the number 0', function () {
                expect(componentUnderTest.hasProp(mockObj, 'a', 'b', 'c', 'g')).toBe(false);
            });
            it('returns false when the object property is an empty object', function () {
                expect(componentUnderTest.hasProp(mockObj, 'a', 'b', 'c', 'h')).toBe(false);
            });
            it('handles undefined objects', function () {
                expect(componentUnderTest.hasProp(undefined, 'a', 'd')).toBe(false);
            });
            it('handles no props', function () {
                expect(componentUnderTest.hasProp(mockObj)).toBe(true);
            });
        });
        describe('shouldDisplayRights()', function () {
            it('returns true when the line item is rights managed and order type is NOT a Trial', function () {
                var lineItem = { rightsManaged: 'Rights Managed' };
                var invoice = {
                    order: { orderType: 'Not Trial' }
                };
                expect(componentUnderTest.shouldDisplayRights(lineItem, invoice))
                    .toBe(true);
            });
            it('returns false when the line item is royalty-free', function () {
                var lineItem = { rightsManaged: 'Royalty Free' };
                var invoice = {
                    order: { orderType: 'Trial' }
                };
                expect(componentUnderTest.shouldDisplayRights(lineItem, invoice))
                    .toBe(false);
            });
            it('returns false when the order type is a Trial', function () {
                var lineItem = { rightsManaged: 'Rights Managed' };
                var invoice = {
                    order: { orderType: 'Trial' }
                };
                expect(componentUnderTest.shouldDisplayRights(lineItem, invoice))
                    .toBe(false);
            });
        });
        describe('shouldShowLicenseDetailsBtn()', function () {
            it('returns true when invoice contains license documents', function () {
                var licenseAgreements = {
                    items: [{ some: 'licenses' }]
                };
                expect(componentUnderTest.shouldShowLicenseDetailsBtn(licenseAgreements))
                    .toBe(true);
            });
            it('returns false when the License documents do not contain items', function () {
                var licenseAgreements = {
                    notItems: {}
                };
                expect(componentUnderTest.shouldShowLicenseDetailsBtn(licenseAgreements))
                    .toBe(false);
            });
            it('returns false when the LicenseDocuments are empty', function () {
                var licenseAgreements = {};
                expect(componentUnderTest.shouldShowLicenseDetailsBtn(licenseAgreements))
                    .toBe(false);
            });
        });
        describe('showLicenseAgreements()', function () {
            var licenseAgreements = {
                items: [{ some: 'licenses' }]
            };
            it('calls openComponentInDialog() on the dialog service (with the right config)', function () {
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
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL2NvbXBvbmVudHMvaW52b2ljZS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUF1RDtBQUN2RCw2RUFBMEU7QUFDMUUsOENBQTZDO0FBRzdDO0lBRUUsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLElBQUksa0JBQW9DLENBQUM7UUFDekMsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksa0JBQXVCLENBQUM7UUFDNUIsSUFBSSxpQkFBc0IsQ0FBQztRQUUzQixVQUFVLENBQUM7WUFDVCxTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDL0IsU0FBUyxDQUFDLGtCQUFrQixDQUMxQixTQUFTLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtvQkFDL0IsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO2lCQUNqRDthQUNGLENBQUMsQ0FBQztZQUNMLGtCQUFrQixHQUFHLEVBQUUsTUFBTSxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUV6RSxpQkFBaUIsR0FBRztnQkFDbEIscUJBQXFCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDakUsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDbkUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7YUFDcEQsQ0FBQztZQUNGLGtCQUFrQixHQUFHLElBQUksb0NBQWdCLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLENB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QkFrS0MiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rb3JkZXIvY29tcG9uZW50cy9pbnZvaWNlLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW52b2ljZUNvbXBvbmVudCB9IGZyb20gJy4vaW52b2ljZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcblxuICBkZXNjcmliZSgnSW52b2ljZSBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogSW52b2ljZUNvbXBvbmVudDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG4gICAgbGV0IG1vY2tBY3RpdmF0ZWRSb3V0ZTogYW55O1xuICAgIGxldCBtb2NrRGlhbG9nU2VydmljZTogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKFxuICAgICAgICAnaW52b2ljZScsIHtcbiAgICAgICAgICBpbnZvaWNlOiB7XG4gICAgICAgICAgICBzb21lOiAnaW52b2ljZScsXG4gICAgICAgICAgICBvcmRlcjogeyBpZDogNDIsIHByb2plY3RzOiBbXSB9LFxuICAgICAgICAgICAgbGljZW5zZURvY3VtZW50czogeyBpdGVtczogW3sgc29tZTogJ3N0dWZmJyB9XSB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIG1vY2tBY3RpdmF0ZWRSb3V0ZSA9IHsgcGFyYW1zOiBPYnNlcnZhYmxlLm9mKHsgc2hhcmVfa2V5OiAnYWJjLTEyMycgfSkgfTtcblxuICAgICAgbW9ja0RpYWxvZ1NlcnZpY2UgPSB7XG4gICAgICAgIG9wZW5Db21wb25lbnRJbkRpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Db21wb25lbnRJbkRpYWxvZycpLFxuICAgICAgICBvcGVuQ29uZmlybWF0aW9uRGlhbG9nOiBqYXNtaW5lLmNyZWF0ZVNweSgnb3BlbkNvbmZpcm1hdGlvbkRpYWxvZycpLFxuICAgICAgICBvcGVuRm9ybURpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Gb3JtRGlhbG9nJylcbiAgICAgIH07XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgSW52b2ljZUNvbXBvbmVudChtb2NrU3RvcmUsIG1vY2tBY3RpdmF0ZWRSb3V0ZSwgbW9ja0RpYWxvZ1NlcnZpY2UpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yKCknLCAoKSA9PiB7XG5cbiAgICAgIGl0KCdzZXRzIHVwIHRoZSBpc1NoYXJlZCBPYnNlcnZhYmxlJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXNTaGFyZWQ6IGJvb2xlYW47XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5pc1NoYXJlZC50YWtlKDEpLnN1YnNjcmliZShpcyA9PiBpc1NoYXJlZCA9IGlzKTtcbiAgICAgICAgZXhwZWN0KGlzU2hhcmVkKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjb250YWlucyBlbmhhbmNlZCBhc3NldHMnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oXG4gICAgICAgICAgJ2ludm9pY2UnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGludm9pY2U6IHtcbiAgICAgICAgICAgICAgc29tZTogJ2ludm9pY2UnLFxuICAgICAgICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgICAgIGlkOiA0MixcbiAgICAgICAgICAgICAgICBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbeyBhc3NldDoge30gfV0gfV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBuZXcgSW52b2ljZUNvbXBvbmVudChtb2NrU3RvcmUsIG1vY2tBY3RpdmF0ZWRSb3V0ZSwgbW9ja0RpYWxvZ1NlcnZpY2UpLmludm9pY2VPYnNlcnZhYmxlLnN1YnNjcmliZShpbnZvaWNlID0+IHtcbiAgICAgICAgICBjb25zdCBhc3NldDogYW55ID0gaW52b2ljZS5vcmRlci5wcm9qZWN0c1swXS5saW5lSXRlbXNbMF0uYXNzZXQ7XG5cbiAgICAgICAgICBleHBlY3QoYXNzZXQudHlwZSkudG9FcXVhbCgnb3JkZXInKTtcbiAgICAgICAgICBleHBlY3QoYXNzZXQucGFyZW50SWQpLnRvRXF1YWwoNDIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbW9ja09iajogUG9qbyA9IHsgYTogeyBiOiB7IGM6IHsgZDogJ2UnLCBmOiAnJywgZzogMCwgaDoge30gfSB9IH0gfTtcblxuICAgIGRlc2NyaWJlKCdoYXNQcm9wKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gdGhlIG9iamVjdCBoYXMgdGhlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc1Byb3AobW9ja09iaiwgJ2EnLCAnYicsICdjJywgJ2QnKSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0aGUgb2JqZWN0IGRvZXMgbm90IGhhdmUgdGhlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc1Byb3AobW9ja09iaiwgJ2EnLCAnZCcpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0aGUgb2JqZWN0IHByb3BlcnR5IGlzIGFuIGVtcHR5IHN0cmluZycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNQcm9wKG1vY2tPYmosICdhJywgJ2InLCAnYycsICdmJykpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZSBvYmplY3QgcHJvcGVydHkgaXMgdGhlIG51bWJlciAwJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc1Byb3AobW9ja09iaiwgJ2EnLCAnYicsICdjJywgJ2cnKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIG9iamVjdCBwcm9wZXJ0eSBpcyBhbiBlbXB0eSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaGFzUHJvcChtb2NrT2JqLCAnYScsICdiJywgJ2MnLCAnaCcpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ2hhbmRsZXMgdW5kZWZpbmVkIG9iamVjdHMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaGFzUHJvcCh1bmRlZmluZWQsICdhJywgJ2QnKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdoYW5kbGVzIG5vIHByb3BzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc1Byb3AobW9ja09iaikpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGREaXNwbGF5UmlnaHRzKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gdGhlIGxpbmUgaXRlbSBpcyByaWdodHMgbWFuYWdlZCBhbmQgb3JkZXIgdHlwZSBpcyBOT1QgYSBUcmlhbCcsICgpID0+IHtcbiAgICAgICAgbGV0IGxpbmVJdGVtOiBhbnkgPSB7IHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcgfTtcbiAgICAgICAgbGV0IGludm9pY2U6IGFueSA9IHtcbiAgICAgICAgICBvcmRlcjogeyBvcmRlclR5cGU6ICdOb3QgVHJpYWwnIH1cbiAgICAgICAgfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGREaXNwbGF5UmlnaHRzKGxpbmVJdGVtLCBpbnZvaWNlKSlcbiAgICAgICAgICAudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0aGUgbGluZSBpdGVtIGlzIHJveWFsdHktZnJlZScsICgpID0+IHtcbiAgICAgICAgbGV0IGxpbmVJdGVtOiBhbnkgPSB7IHJpZ2h0c01hbmFnZWQ6ICdSb3lhbHR5IEZyZWUnIH07XG4gICAgICAgIGxldCBpbnZvaWNlOiBhbnkgPSB7XG4gICAgICAgICAgb3JkZXI6IHsgb3JkZXJUeXBlOiAnVHJpYWwnIH1cbiAgICAgICAgfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGREaXNwbGF5UmlnaHRzKGxpbmVJdGVtLCBpbnZvaWNlKSlcbiAgICAgICAgICAudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIG9yZGVyIHR5cGUgaXMgYSBUcmlhbCcsICgpID0+IHtcbiAgICAgICAgbGV0IGxpbmVJdGVtOiBhbnkgPSB7IHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcgfTtcbiAgICAgICAgbGV0IGludm9pY2U6IGFueSA9IHtcbiAgICAgICAgICBvcmRlcjogeyBvcmRlclR5cGU6ICdUcmlhbCcgfVxuICAgICAgICB9O1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZERpc3BsYXlSaWdodHMobGluZUl0ZW0sIGludm9pY2UpKVxuICAgICAgICAgIC50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZFNob3dMaWNlbnNlRGV0YWlsc0J0bigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGludm9pY2UgY29udGFpbnMgbGljZW5zZSBkb2N1bWVudHMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBsaWNlbnNlQWdyZWVtZW50czogYW55ID0ge1xuICAgICAgICAgIGl0ZW1zOiBbeyBzb21lOiAnbGljZW5zZXMnIH1dXG4gICAgICAgIH07XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd0xpY2Vuc2VEZXRhaWxzQnRuKGxpY2Vuc2VBZ3JlZW1lbnRzKSlcbiAgICAgICAgICAudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZSBMaWNlbnNlIGRvY3VtZW50cyBkbyBub3QgY29udGFpbiBpdGVtcycsICgpID0+IHtcbiAgICAgICAgbGV0IGxpY2Vuc2VBZ3JlZW1lbnRzOiBhbnkgPSB7XG4gICAgICAgICAgbm90SXRlbXM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd0xpY2Vuc2VEZXRhaWxzQnRuKGxpY2Vuc2VBZ3JlZW1lbnRzKSlcbiAgICAgICAgICAudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0aGUgTGljZW5zZURvY3VtZW50cyBhcmUgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgIGxldCBsaWNlbnNlQWdyZWVtZW50czogYW55ID0ge307XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd0xpY2Vuc2VEZXRhaWxzQnRuKGxpY2Vuc2VBZ3JlZW1lbnRzKSlcbiAgICAgICAgICAudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZGVzY3JpYmUoJ3Nob3dMaWNlbnNlQWdyZWVtZW50cygpJywgKCkgPT4ge1xuICAgICAgbGV0IGxpY2Vuc2VBZ3JlZW1lbnRzOiBhbnkgPSB7XG4gICAgICAgIGl0ZW1zOiBbeyBzb21lOiAnbGljZW5zZXMnIH1dXG4gICAgICB9O1xuICAgICAgaXQoJ2NhbGxzIG9wZW5Db21wb25lbnRJbkRpYWxvZygpIG9uIHRoZSBkaWFsb2cgc2VydmljZSAod2l0aCB0aGUgcmlnaHQgY29uZmlnKScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNob3dMaWNlbnNlQWdyZWVtZW50cyhsaWNlbnNlQWdyZWVtZW50cyk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgIGNvbXBvbmVudFR5cGU6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICBkaWFsb2dDb25maWc6IHsgcGFuZWxDbGFzczogJ2xpY2Vuc2UtcGFuZScsIHBvc2l0aW9uOiB7IHRvcDogJzEwJScgfSB9LFxuICAgICAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICAgICAgYXNzZXRUeXBlOiAnb3JkZXInLFxuICAgICAgICAgICAgbGljZW5zZXM6IHsgaXRlbXM6IFt7IHNvbWU6ICdsaWNlbnNlcycgfV0gfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3V0cHV0T3B0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBldmVudDogJ2Nsb3NlJyxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
