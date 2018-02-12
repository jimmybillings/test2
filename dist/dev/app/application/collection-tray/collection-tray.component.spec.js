"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collection_tray_component_1 = require("./collection-tray.component");
var collection_form_component_1 = require("./components/collection-form.component");
var EnhancedMock = require("../../shared/interfaces/enhanced-asset");
var mock_asset_1 = require("../../shared/mocks/mock-asset");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Collection Tray Component', function () {
        var componentUnderTest;
        var mockEnhancedAsset;
        var mockAppStore;
        var mockDialogService;
        var navigateDispatchSpy;
        var snackBarDispatchSpy;
        beforeEach(function () {
            mockEnhancedAsset = EnhancedMock.enhanceAsset(mock_asset_1.mockAsset, 'collection');
            mockAppStore = new mock_app_store_1.MockAppStore();
            mockAppStore.createStateSection('uiConfig', {
                components: {
                    collection: { config: { some: 'config' } }
                }
            });
            navigateDispatchSpy = mockAppStore.createActionFactoryMethod('router', 'goToCollection');
            snackBarDispatchSpy = mockAppStore.createActionFactoryMethod('snackbar', 'display');
            mockAppStore.createActionFactoryMethod('activeCollection', 'loadIfNeeded');
            mockDialogService = {
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.callFake(function (_) {
                    mockDialogService.onSubmitCallback = _.outputOptions[0].callback;
                })
            };
            componentUnderTest = new collection_tray_component_1.CollectionTrayComponent(mockDialogService, mockAppStore, null);
            componentUnderTest.collection = { assets: { items: [EnhancedMock.enhanceAsset(mock_asset_1.mockAsset, 'collection')] } };
            componentUnderTest.urlPath = '/collections/';
        });
        describe('hasId()', function () {
            it('returns true when the asset exists and has an id', function () {
                expect(componentUnderTest.hasId({ assetId: 47 })).toBe(true);
            });
            it('returns false when the asset is undefined', function () {
                expect(componentUnderTest.hasId(undefined)).toBe(false);
            });
            it('returns false when the asset is null', function () {
                expect(componentUnderTest.hasId(null)).toBe(false);
            });
            it('returns false when the asset doesn\'t have an id', function () {
                expect(componentUnderTest.hasId({})).toBe(false);
            });
        });
        describe('routerLinkFor()', function () {
            it('returns the enhanced asset\'s router link array', function () {
                expect(componentUnderTest.routerLinkFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.routerLink);
            });
        });
        describe('hasThumbnail()', function () {
            it('returns true if the asset has a thumbnail URL', function () {
                expect(componentUnderTest.hasThumbnail(mockEnhancedAsset)).toBe(true);
            });
        });
        describe('thumbnailUrlFor()', function () {
            it('returns the thumbnail URL for the asset', function () {
                expect(componentUnderTest.thumbnailUrlFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.thumbnailUrl);
            });
        });
        describe('createCollection', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.createCollection();
            });
            it('calls openComponentInDialog on the dialog service', function () {
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                    componentType: collection_form_component_1.CollectionFormComponent,
                    dialogConfig: { position: { top: '10%' } },
                    inputOptions: {
                        fields: { some: 'config' },
                        collectionActionType: 'create'
                    },
                    outputOptions: [{
                            event: 'collectionSaved',
                            callback: jasmine.any(Function),
                            closeOnEvent: true
                        }]
                });
            });
            describe('createCollectionlistDialog()', function () {
                it('Should call the dialog service to open the asset sharing dialog', function () {
                    componentUnderTest.collection = { id: 1, name: 'some collection' };
                    componentUnderTest.collectionFormConfig = { config: 'some config' };
                    componentUnderTest.createCollectionlistDialog();
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                        componentType: jasmine.any(Function),
                        dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
                        inputOptions: {
                            focusedCollection: componentUnderTest.collection,
                        },
                        outputOptions: [{
                                event: 'close',
                                callback: jasmine.any(Function),
                                closeOnEvent: true
                            }]
                    });
                });
            });
            describe('dispatches the proper action when the callback is called', function () {
                it('Should redirect to the collection show if currently on the collection show page.', function () {
                    componentUnderTest.urlPath = '/collections/';
                    mockDialogService.onSubmitCallback({ collectionId: 123 });
                    mockAppStore.expectDispatchFor(navigateDispatchSpy, 123);
                });
                it('Should just display a snackbar if on any other page.', function () {
                    componentUnderTest.urlPath = '/collections';
                    mockDialogService.onSubmitCallback({ collectionId: 123 });
                    mockAppStore.expectDispatchFor(snackBarDispatchSpy, 'COLLECTION.COLLECTION_CREATED');
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9jb2xsZWN0aW9uLXRyYXkvY29sbGVjdGlvbi10cmF5LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUVBQXNFO0FBQ3RFLG9GQUFpRjtBQUVqRixxRUFBdUU7QUFDdkUsNERBQTBEO0FBQzFELDBFQUF1RTtBQUV2RTtJQUNFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtRQUNwQyxJQUFJLGtCQUEyQyxDQUFDO1FBQ2hELElBQUksaUJBQTZDLENBQUM7UUFDbEQsSUFBSSxZQUEwQixDQUFDO1FBQy9CLElBQUksaUJBQXNCLENBQUM7UUFDM0IsSUFBSSxtQkFBZ0MsQ0FBQztRQUNyQyxJQUFJLG1CQUFnQyxDQUFDO1FBRXJDLFVBQVUsQ0FBQztZQUNULGlCQUFpQixHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsc0JBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUV2RSxZQUFZLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDbEMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtnQkFDMUMsVUFBVSxFQUFFO29CQUNWLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRTtpQkFDM0M7YUFDRixDQUFDLENBQUM7WUFDSCxtQkFBbUIsR0FBRyxZQUFZLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDekYsbUJBQW1CLEdBQUcsWUFBWSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNwRixZQUFZLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFM0UsaUJBQWlCLEdBQUc7Z0JBQ2xCLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQUMsQ0FBTTtvQkFD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QUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLDBEQUEwRCxFQUFFO2dCQUNuRSxFQUFFLENBQUMsa0ZBQWtGLEVBQUU7b0JBQ3JGLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7b0JBQzdDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBRTFELFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDM0QsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsRUFBRSxDQUFDLHNEQUFzRCxFQUFFO29CQUN6RCxrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO29CQUM1QyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUUxRCxZQUFZLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsK0JBQStCLENBQUMsQ0FBQztnQkFDdkYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBaklELG9CQWlJQyIsImZpbGUiOiJhcHAvYXBwbGljYXRpb24vY29sbGVjdGlvbi10cmF5L2NvbGxlY3Rpb24tdHJheS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblRyYXlDb21wb25lbnQgfSBmcm9tICcuL2NvbGxlY3Rpb24tdHJheS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGVjdGlvbi1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc3NldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0ICogYXMgRW5oYW5jZWRNb2NrIGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IG1vY2tBc3NldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2Nrcy9tb2NrLWFzc2V0JztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ29sbGVjdGlvbiBUcmF5IENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBDb2xsZWN0aW9uVHJheUNvbXBvbmVudDtcbiAgICBsZXQgbW9ja0VuaGFuY2VkQXNzZXQ6IEVuaGFuY2VkTW9jay5FbmhhbmNlZEFzc2V0O1xuICAgIGxldCBtb2NrQXBwU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgbW9ja0RpYWxvZ1NlcnZpY2U6IGFueTtcbiAgICBsZXQgbmF2aWdhdGVEaXNwYXRjaFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IHNuYWNrQmFyRGlzcGF0Y2hTcHk6IGphc21pbmUuU3B5O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrRW5oYW5jZWRBc3NldCA9IEVuaGFuY2VkTW9jay5lbmhhbmNlQXNzZXQobW9ja0Fzc2V0LCAnY29sbGVjdGlvbicpO1xuXG4gICAgICBtb2NrQXBwU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBtb2NrQXBwU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCd1aUNvbmZpZycsIHtcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgIGNvbGxlY3Rpb246IHsgY29uZmlnOiB7IHNvbWU6ICdjb25maWcnIH0gfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG5hdmlnYXRlRGlzcGF0Y2hTcHkgPSBtb2NrQXBwU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncm91dGVyJywgJ2dvVG9Db2xsZWN0aW9uJyk7XG4gICAgICBzbmFja0JhckRpc3BhdGNoU3B5ID0gbW9ja0FwcFN0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3NuYWNrYmFyJywgJ2Rpc3BsYXknKTtcbiAgICAgIG1vY2tBcHBTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdhY3RpdmVDb2xsZWN0aW9uJywgJ2xvYWRJZk5lZWRlZCcpO1xuXG4gICAgICBtb2NrRGlhbG9nU2VydmljZSA9IHtcbiAgICAgICAgb3BlbkNvbXBvbmVudEluRGlhbG9nOiBqYXNtaW5lLmNyZWF0ZVNweSgnb3BlbkNvbXBvbmVudEluRGlhbG9nJykuYW5kLmNhbGxGYWtlKChfOiBhbnkpID0+IHtcbiAgICAgICAgICBtb2NrRGlhbG9nU2VydmljZS5vblN1Ym1pdENhbGxiYWNrID0gXy5vdXRwdXRPcHRpb25zWzBdLmNhbGxiYWNrO1xuICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENvbGxlY3Rpb25UcmF5Q29tcG9uZW50KG1vY2tEaWFsb2dTZXJ2aWNlLCBtb2NrQXBwU3RvcmUsIG51bGwpO1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbiA9IHsgYXNzZXRzOiB7IGl0ZW1zOiBbRW5oYW5jZWRNb2NrLmVuaGFuY2VBc3NldChtb2NrQXNzZXQsICdjb2xsZWN0aW9uJyldIH0gfSBhcyBhbnk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QudXJsUGF0aCA9ICcvY29sbGVjdGlvbnMvJztcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNJZCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIHRoZSBhc3NldCBleGlzdHMgYW5kIGhhcyBhbiBpZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNJZCh7IGFzc2V0SWQ6IDQ3IH0gYXMgRW5oYW5jZWRNb2NrLkVuaGFuY2VkQXNzZXQpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIGFzc2V0IGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNJZCh1bmRlZmluZWQpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZSBhc3NldCBpcyBudWxsJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc0lkKG51bGwpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZSBhc3NldCBkb2VzblxcJ3QgaGF2ZSBhbiBpZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNJZCh7fSBhcyBFbmhhbmNlZE1vY2suRW5oYW5jZWRBc3NldCkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncm91dGVyTGlua0ZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGVuaGFuY2VkIGFzc2V0XFwncyByb3V0ZXIgbGluayBhcnJheScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yb3V0ZXJMaW5rRm9yKG1vY2tFbmhhbmNlZEFzc2V0KSkudG9FcXVhbChtb2NrRW5oYW5jZWRBc3NldC5yb3V0ZXJMaW5rKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc1RodW1ibmFpbCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgYXNzZXQgaGFzIGEgdGh1bWJuYWlsIFVSTCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNUaHVtYm5haWwobW9ja0VuaGFuY2VkQXNzZXQpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndGh1bWJuYWlsVXJsRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgdGh1bWJuYWlsIFVSTCBmb3IgdGhlIGFzc2V0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRodW1ibmFpbFVybEZvcihtb2NrRW5oYW5jZWRBc3NldCkpLnRvRXF1YWwobW9ja0VuaGFuY2VkQXNzZXQudGh1bWJuYWlsVXJsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NyZWF0ZUNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jcmVhdGVDb2xsZWN0aW9uKCk7XG4gICAgICB9KTtcblxuXG4gICAgICBpdCgnY2FsbHMgb3BlbkNvbXBvbmVudEluRGlhbG9nIG9uIHRoZSBkaWFsb2cgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgIGNvbXBvbmVudFR5cGU6IENvbGxlY3Rpb25Gb3JtQ29tcG9uZW50LFxuICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICcxMCUnIH0gfSxcbiAgICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGZpZWxkczogeyBzb21lOiAnY29uZmlnJyB9LFxuICAgICAgICAgICAgY29sbGVjdGlvbkFjdGlvblR5cGU6ICdjcmVhdGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXRwdXRPcHRpb25zOiBbe1xuICAgICAgICAgICAgZXZlbnQ6ICdjb2xsZWN0aW9uU2F2ZWQnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdjcmVhdGVDb2xsZWN0aW9ubGlzdERpYWxvZygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIGRpYWxvZyBzZXJ2aWNlIHRvIG9wZW4gdGhlIGFzc2V0IHNoYXJpbmcgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uID0geyBpZDogMSwgbmFtZTogJ3NvbWUgY29sbGVjdGlvbicgfSBhcyBhbnk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25Gb3JtQ29uZmlnID0geyBjb25maWc6ICdzb21lIGNvbmZpZycgfSBhcyBhbnk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNyZWF0ZUNvbGxlY3Rpb25saXN0RGlhbG9nKCk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgICAgY29tcG9uZW50VHlwZTogamFzbWluZS5hbnkoRnVuY3Rpb24pLFxuICAgICAgICAgICAgZGlhbG9nQ29uZmlnOiB7IHBvc2l0aW9uOiB7IHRvcDogJzMlJyB9LCBwYW5lbENsYXNzOiAnY29sbGVjdGlvbi1saXN0LWRkLWNvbXBvbmVudCcgfSxcbiAgICAgICAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICAgICAgICBmb2N1c2VkQ29sbGVjdGlvbjogY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3V0cHV0T3B0aW9uczogW3tcbiAgICAgICAgICAgICAgZXZlbnQ6ICdjbG9zZScsXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiBqYXNtaW5lLmFueShGdW5jdGlvbiksXG4gICAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2Rpc3BhdGNoZXMgdGhlIHByb3BlciBhY3Rpb24gd2hlbiB0aGUgY2FsbGJhY2sgaXMgY2FsbGVkJywgKCkgPT4ge1xuICAgICAgICBpdCgnU2hvdWxkIHJlZGlyZWN0IHRvIHRoZSBjb2xsZWN0aW9uIHNob3cgaWYgY3VycmVudGx5IG9uIHRoZSBjb2xsZWN0aW9uIHNob3cgcGFnZS4nLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVybFBhdGggPSAnL2NvbGxlY3Rpb25zLyc7XG4gICAgICAgICAgbW9ja0RpYWxvZ1NlcnZpY2Uub25TdWJtaXRDYWxsYmFjayh7IGNvbGxlY3Rpb25JZDogMTIzIH0pO1xuXG4gICAgICAgICAgbW9ja0FwcFN0b3JlLmV4cGVjdERpc3BhdGNoRm9yKG5hdmlnYXRlRGlzcGF0Y2hTcHksIDEyMyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnU2hvdWxkIGp1c3QgZGlzcGxheSBhIHNuYWNrYmFyIGlmIG9uIGFueSBvdGhlciBwYWdlLicsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXJsUGF0aCA9ICcvY29sbGVjdGlvbnMnO1xuICAgICAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlLm9uU3VibWl0Q2FsbGJhY2soeyBjb2xsZWN0aW9uSWQ6IDEyMyB9KTtcblxuICAgICAgICAgIG1vY2tBcHBTdG9yZS5leHBlY3REaXNwYXRjaEZvcihzbmFja0JhckRpc3BhdGNoU3B5LCAnQ09MTEVDVElPTi5DT0xMRUNUSU9OX0NSRUFURUQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
