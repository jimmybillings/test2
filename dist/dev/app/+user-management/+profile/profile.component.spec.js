"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var profile_component_1 = require("./profile.component");
var Observable_1 = require("rxjs/Observable");
var wz_address_form_component_1 = require("../../shared/modules/wz-form/components/wz-address-form/wz.address-form.component");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Profile Component', function () {
        var componentUnderTest;
        var mockStore;
        var mockCurrentUserService;
        var mockChangeDetectorRef;
        var mockUserService;
        var mockDialogService;
        var user = {
            accountId: 123,
            emailAddress: 'jamesbonline@yahoo.com',
            firstName: 'james', lastName: 'billings', password: '3978f324e14ac256b2994b754586e05f',
            billingInfo: { address: { state: 'CO', phone: '720 291-2524' } },
        };
        beforeEach(function () {
            mockCurrentUserService = { data: Observable_1.Observable.of(user) };
            mockChangeDetectorRef = { detectChanges: jasmine.createSpy('detectChanges') };
            mockUserService = {
                getAccount: jasmine.createSpy('getAccount').and.returnValue(Observable_1.Observable.of({ name: 'accountName', some: 'data' })),
                addBillingAddress: jasmine.createSpy('addBillingAddress').and.returnValue(Observable_1.Observable.of({})),
                changeBasicInfo: jasmine.createSpy('changeBasicInfo').and.returnValue(Observable_1.Observable.of({}))
            };
            mockDialogService = {
                openFormDialog: jasmine.createSpy('openFormDialog').and.callFake(function (_, __, onSubmitCallback) {
                    mockDialogService.onChangeBasicInfo = onSubmitCallback;
                }),
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.callFake(function (options) {
                    mockDialogService.onSubmitCallBack = options.outputOptions[0].callback;
                })
            };
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('uiConfig', {
                components: { userBasicInfo: { config: { form: { items: [{ some: 'items' }] } } } }
            });
            componentUnderTest = new profile_component_1.ProfileComponent(mockCurrentUserService, mockDialogService, mockUserService, mockChangeDetectorRef, mockStore);
        });
        describe('ngOnInit()', function () {
            it('Grabs the component config and assigns to an instance variable', function () {
                componentUnderTest = new profile_component_1.ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.user).toEqual(user);
            });
        });
        describe('ngOnDestroy()', function () {
            it('unsubscribes from the UI config to prevent memory leakage', function () {
                var mockSubscription = { unsubscribe: jasmine.createSpy('unsubscribe') };
                var mockObservable = { subscribe: function () { return mockSubscription; } };
                mockCurrentUserService = { data: mockObservable };
                componentUnderTest = new profile_component_1.ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
                componentUnderTest.ngOnInit();
                componentUnderTest.ngOnDestroy();
                expect(mockSubscription.unsubscribe).toHaveBeenCalled();
            });
        });
        describe('getBillingAddressInfo()', function () {
            var mockUser;
            it('should return an empty string when billingInfo does not exist on the user', function () {
                mockUser = {
                    emailAddress: 'jdoe@gmail.com',
                    firstName: 'John', lastName: 'Doe', password: '3978f324e14ac256b2994b754586e05f',
                };
                mockCurrentUserService = { data: Observable_1.Observable.of(mockUser) };
                componentUnderTest = new profile_component_1.ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
                componentUnderTest.ngOnInit();
                var result = componentUnderTest.getBillingAddressInfo('state');
                expect(result).toBe('');
            });
            it('should return an empty string when part of billingInfo.address exist but requested part is missing', function () {
                mockUser = {
                    emailAddress: 'jdoe@gmail.com',
                    firstName: 'John', lastName: 'Doe', password: '3978f324e14ac256b2994b754586e05f',
                    emailOptOut: false,
                    billingInfo: { address: { state: 'CO', phone: '720 291-2524' } },
                };
                mockCurrentUserService = { data: Observable_1.Observable.of(mockUser) };
                componentUnderTest = new profile_component_1.ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
                componentUnderTest.ngOnInit();
                var result = componentUnderTest.getBillingAddressInfo('address');
                expect(result).toBe('');
            });
            it('should return correct part of billingInfo address if it exists', function () {
                mockUser = {
                    emailAddress: 'jdoe@gmail.com',
                    firstName: 'John', lastName: 'Doe', password: '3978f324e14ac256b2994b754586e05f',
                    emailOptOut: false,
                    billingInfo: { address: { state: 'CO', phone: '720 291-2524' } },
                };
                mockCurrentUserService = { data: Observable_1.Observable.of(mockUser) };
                componentUnderTest = new profile_component_1.ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
                componentUnderTest.ngOnInit();
                var result = componentUnderTest.getBillingAddressInfo('state');
                expect(result).toBe('CO');
            });
            it('should return empty string if billingInfo.address does not exist', function () {
                mockUser = {
                    emailAddress: 'jdoe@gmail.com',
                    emailOptOut: false,
                    billingInfo: {},
                };
                mockCurrentUserService = { data: Observable_1.Observable.of(mockUser) };
                componentUnderTest = new profile_component_1.ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
                componentUnderTest.ngOnInit();
                var result = componentUnderTest.getBillingAddressInfo('state');
                expect(result).toBe('');
            });
        });
        describe('onClickEditAddressButton()', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.onClickEditAddressButton();
            });
            it('opens a dialogService to edit the billing address', function () {
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                    componentType: wz_address_form_component_1.WzAddressFormComponent,
                    dialogConfig: { disableClose: true },
                    inputOptions: {
                        address: user.billingInfo.address,
                        loaded: true,
                        title: 'PROFILE.BASIC_INFO.BILLING_ADDRESS_EDIT_BTN_LABEL',
                        includeCloseButton: true
                    },
                    outputOptions: [{
                            event: 'onSaveAddress',
                            callback: jasmine.any(Function),
                            closeOnEvent: true
                        }]
                });
            });
            it('adds the billing address', function () {
                mockDialogService.onSubmitCallBack({ some: 'data' });
                expect(mockUserService.addBillingAddress).toHaveBeenCalledWith({ some: 'data' });
            });
        });
        describe('onClickEditBasicInfoButton()', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.onClickEditBasicInfoButton();
            });
            it('opens a form dialog to edit the basic info', function () {
                expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(jasmine.any(Array), {
                    title: 'PROFILE.BASIC_INFO.EDIT_BTN_LABEL', submitLabel: 'PROFILE.BASIC_INFO.UPDATE_BTN_LABEL'
                }, jasmine.any(Function));
            });
            it('changes the basic info', function () {
                mockDialogService.onChangeBasicInfo({ some: 'data' });
                expect(mockUserService.changeBasicInfo).toHaveBeenCalledWith({ some: 'data' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50Lytwcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBdUQ7QUFDdkQsOENBQTZDO0FBQzdDLCtIQUEySDtBQUUzSCwwRUFBdUU7QUFFdkU7SUFDRSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsSUFBSSxrQkFBb0MsQ0FBQztRQUN6QyxJQUFJLFNBQXVCLENBQUM7UUFDNUIsSUFBSSxzQkFBMkIsQ0FBQztRQUNoQyxJQUFJLHFCQUEwQixDQUFDO1FBQy9CLElBQUksZUFBb0IsQ0FBQztRQUN6QixJQUFJLGlCQUFzQixDQUFDO1FBRTNCLElBQU0sSUFBSSxHQUFRO1lBQ2hCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsWUFBWSxFQUFFLHdCQUF3QjtZQUN0QyxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGtDQUFrQztZQUN0RixXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsRUFBRTtTQUNqRSxDQUFDO1FBRUYsVUFBVSxDQUFDO1lBQ1Qsc0JBQXNCLEdBQUcsRUFBRSxJQUFJLEVBQUUsdUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUV2RCxxQkFBcUIsR0FBRyxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7WUFFOUUsZUFBZSxHQUFHO2dCQUNoQixVQUFVLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDakgsaUJBQWlCLEVBQUUsT0FBTyxDQUFD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bGUvcHJvZmlsZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2ZpbGVDb21wb25lbnQgfSBmcm9tICcuL3Byb2ZpbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgV3pBZGRyZXNzRm9ybUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2R1bGVzL3d6LWZvcm0vY29tcG9uZW50cy93ei1hZGRyZXNzLWZvcm0vd3ouYWRkcmVzcy1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdQcm9maWxlIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBQcm9maWxlQ29tcG9uZW50O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgbW9ja0N1cnJlbnRVc2VyU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWY6IGFueTtcbiAgICBsZXQgbW9ja1VzZXJTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tEaWFsb2dTZXJ2aWNlOiBhbnk7XG5cbiAgICBjb25zdCB1c2VyOiBhbnkgPSB7XG4gICAgICBhY2NvdW50SWQ6IDEyMyxcbiAgICAgIGVtYWlsQWRkcmVzczogJ2phbWVzYm9ubGluZUB5YWhvby5jb20nLFxuICAgICAgZmlyc3ROYW1lOiAnamFtZXMnLCBsYXN0TmFtZTogJ2JpbGxpbmdzJywgcGFzc3dvcmQ6ICczOTc4ZjMyNGUxNGFjMjU2YjI5OTRiNzU0NTg2ZTA1ZicsXG4gICAgICBiaWxsaW5nSW5mbzogeyBhZGRyZXNzOiB7IHN0YXRlOiAnQ08nLCBwaG9uZTogJzcyMCAyOTEtMjUyNCcgfSB9LFxuICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7IGRhdGE6IE9ic2VydmFibGUub2YodXNlcikgfTtcblxuICAgICAgbW9ja0NoYW5nZURldGVjdG9yUmVmID0geyBkZXRlY3RDaGFuZ2VzOiBqYXNtaW5lLmNyZWF0ZVNweSgnZGV0ZWN0Q2hhbmdlcycpIH07XG5cbiAgICAgIG1vY2tVc2VyU2VydmljZSA9IHtcbiAgICAgICAgZ2V0QWNjb3VudDogamFzbWluZS5jcmVhdGVTcHkoJ2dldEFjY291bnQnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7IG5hbWU6ICdhY2NvdW50TmFtZScsIHNvbWU6ICdkYXRhJyB9KSksXG4gICAgICAgIGFkZEJpbGxpbmdBZGRyZXNzOiBqYXNtaW5lLmNyZWF0ZVNweSgnYWRkQmlsbGluZ0FkZHJlc3MnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7fSkpLFxuICAgICAgICBjaGFuZ2VCYXNpY0luZm86IGphc21pbmUuY3JlYXRlU3B5KCdjaGFuZ2VCYXNpY0luZm8nKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7fSkpXG4gICAgICB9O1xuXG4gICAgICBtb2NrRGlhbG9nU2VydmljZSA9IHtcbiAgICAgICAgb3BlbkZvcm1EaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuRm9ybURpYWxvZycpLmFuZC5jYWxsRmFrZSgoXzogYW55LCBfXzogYW55LCBvblN1Ym1pdENhbGxiYWNrOiBGdW5jdGlvbikgPT4ge1xuICAgICAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlLm9uQ2hhbmdlQmFzaWNJbmZvID0gb25TdWJtaXRDYWxsYmFjaztcbiAgICAgICAgfSksXG4gICAgICAgIG9wZW5Db21wb25lbnRJbkRpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Db21wb25lbnRJbkRpYWxvZycpLmFuZC5jYWxsRmFrZSgob3B0aW9uczogYW55KSA9PiB7XG4gICAgICAgICAgbW9ja0RpYWxvZ1NlcnZpY2Uub25TdWJtaXRDYWxsQmFjayA9IG9wdGlvbnMub3V0cHV0T3B0aW9uc1swXS5jYWxsYmFjaztcbiAgICAgICAgfSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywge1xuICAgICAgICBjb21wb25lbnRzOiB7IHVzZXJCYXNpY0luZm86IHsgY29uZmlnOiB7IGZvcm06IHsgaXRlbXM6IFt7IHNvbWU6ICdpdGVtcycgfV0gfSB9IH0gfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBQcm9maWxlQ29tcG9uZW50KFxuICAgICAgICBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrRGlhbG9nU2VydmljZSwgbW9ja1VzZXJTZXJ2aWNlLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYsIG1vY2tTdG9yZVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uSW5pdCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ0dyYWJzIHRoZSBjb21wb25lbnQgY29uZmlnIGFuZCBhc3NpZ25zIHRvIGFuIGluc3RhbmNlIHZhcmlhYmxlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUHJvZmlsZUNvbXBvbmVudChtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBudWxsLCBtb2NrVXNlclNlcnZpY2UsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZiwgbW9ja1N0b3JlKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudXNlcikudG9FcXVhbCh1c2VyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ25nT25EZXN0cm95KCknLCAoKSA9PiB7XG4gICAgICBpdCgndW5zdWJzY3JpYmVzIGZyb20gdGhlIFVJIGNvbmZpZyB0byBwcmV2ZW50IG1lbW9yeSBsZWFrYWdlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbW9ja1N1YnNjcmlwdGlvbiA9IHsgdW5zdWJzY3JpYmU6IGphc21pbmUuY3JlYXRlU3B5KCd1bnN1YnNjcmliZScpIH07XG4gICAgICAgIGxldCBtb2NrT2JzZXJ2YWJsZSA9IHsgc3Vic2NyaWJlOiAoKSA9PiBtb2NrU3Vic2NyaXB0aW9uIH07XG4gICAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7IGRhdGE6IG1vY2tPYnNlcnZhYmxlIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBQcm9maWxlQ29tcG9uZW50KG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG51bGwsIG1vY2tVc2VyU2VydmljZSwgbW9ja0NoYW5nZURldGVjdG9yUmVmLCBtb2NrU3RvcmUpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25EZXN0cm95KCk7XG4gICAgICAgIGV4cGVjdChtb2NrU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRCaWxsaW5nQWRkcmVzc0luZm8oKScsICgpID0+IHtcbiAgICAgIGxldCBtb2NrVXNlcjogYW55O1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gYmlsbGluZ0luZm8gZG9lcyBub3QgZXhpc3Qgb24gdGhlIHVzZXInLCAoKSA9PiB7XG4gICAgICAgIG1vY2tVc2VyID0ge1xuICAgICAgICAgIGVtYWlsQWRkcmVzczogJ2pkb2VAZ21haWwuY29tJyxcbiAgICAgICAgICBmaXJzdE5hbWU6ICdKb2huJywgbGFzdE5hbWU6ICdEb2UnLCBwYXNzd29yZDogJzM5NzhmMzI0ZTE0YWMyNTZiMjk5NGI3NTQ1ODZlMDVmJyxcbiAgICAgICAgfTtcbiAgICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgZGF0YTogT2JzZXJ2YWJsZS5vZihtb2NrVXNlcikgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFByb2ZpbGVDb21wb25lbnQobW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbnVsbCwgbW9ja1VzZXJTZXJ2aWNlLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWYsIG1vY2tTdG9yZSk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gY29tcG9uZW50VW5kZXJUZXN0LmdldEJpbGxpbmdBZGRyZXNzSW5mbygnc3RhdGUnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZSgnJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIHdoZW4gcGFydCBvZiBiaWxsaW5nSW5mby5hZGRyZXNzIGV4aXN0IGJ1dCByZXF1ZXN0ZWQgcGFydCBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBtb2NrVXNlciA9IHtcbiAgICAgICAgICBlbWFpbEFkZHJlc3M6ICdqZG9lQGdtYWlsLmNvbScsXG4gICAgICAgICAgZmlyc3ROYW1lOiAnSm9obicsIGxhc3ROYW1lOiAnRG9lJywgcGFzc3dvcmQ6ICczOTc4ZjMyNGUxNGFjMjU2YjI5OTRiNzU0NTg2ZTA1ZicsXG4gICAgICAgICAgZW1haWxPcHRPdXQ6IGZhbHNlLFxuICAgICAgICAgIGJpbGxpbmdJbmZvOiB7IGFkZHJlc3M6IHsgc3RhdGU6ICdDTycsIHBob25lOiAnNzIwIDI5MS0yNTI0JyB9IH0sXG4gICAgICAgIH07XG4gICAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7IGRhdGE6IE9ic2VydmFibGUub2YobW9ja1VzZXIpIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBQcm9maWxlQ29tcG9uZW50KG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG51bGwsIG1vY2tVc2VyU2VydmljZSwgbW9ja0NoYW5nZURldGVjdG9yUmVmLCBtb2NrU3RvcmUpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGNvbXBvbmVudFVuZGVyVGVzdC5nZXRCaWxsaW5nQWRkcmVzc0luZm8oJ2FkZHJlc3MnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZSgnJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCBwYXJ0IG9mIGJpbGxpbmdJbmZvIGFkZHJlc3MgaWYgaXQgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICBtb2NrVXNlciA9IHtcbiAgICAgICAgICBlbWFpbEFkZHJlc3M6ICdqZG9lQGdtYWlsLmNvbScsXG4gICAgICAgICAgZmlyc3ROYW1lOiAnSm9obicsIGxhc3ROYW1lOiAnRG9lJywgcGFzc3dvcmQ6ICczOTc4ZjMyNGUxNGFjMjU2YjI5OTRiNzU0NTg2ZTA1ZicsXG4gICAgICAgICAgZW1haWxPcHRPdXQ6IGZhbHNlLFxuICAgICAgICAgIGJpbGxpbmdJbmZvOiB7IGFkZHJlc3M6IHsgc3RhdGU6ICdDTycsIHBob25lOiAnNzIwIDI5MS0yNTI0JyB9IH0sXG4gICAgICAgIH07XG4gICAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7IGRhdGE6IE9ic2VydmFibGUub2YobW9ja1VzZXIpIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBQcm9maWxlQ29tcG9uZW50KG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG51bGwsIG1vY2tVc2VyU2VydmljZSwgbW9ja0NoYW5nZURldGVjdG9yUmVmLCBtb2NrU3RvcmUpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGNvbXBvbmVudFVuZGVyVGVzdC5nZXRCaWxsaW5nQWRkcmVzc0luZm8oJ3N0YXRlJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUoJ0NPJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIGJpbGxpbmdJbmZvLmFkZHJlc3MgZG9lcyBub3QgZXhpc3QnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tVc2VyID0ge1xuICAgICAgICAgIGVtYWlsQWRkcmVzczogJ2pkb2VAZ21haWwuY29tJyxcbiAgICAgICAgICBlbWFpbE9wdE91dDogZmFsc2UsXG4gICAgICAgICAgYmlsbGluZ0luZm86IHt9LFxuICAgICAgICB9O1xuICAgICAgICBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlID0geyBkYXRhOiBPYnNlcnZhYmxlLm9mKG1vY2tVc2VyKSB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUHJvZmlsZUNvbXBvbmVudChtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBudWxsLCBtb2NrVXNlclNlcnZpY2UsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZiwgbW9ja1N0b3JlKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBjb21wb25lbnRVbmRlclRlc3QuZ2V0QmlsbGluZ0FkZHJlc3NJbmZvKCdzdGF0ZScpO1xuICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlKCcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ2xpY2tFZGl0QWRkcmVzc0J1dHRvbigpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbGlja0VkaXRBZGRyZXNzQnV0dG9uKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ29wZW5zIGEgZGlhbG9nU2VydmljZSB0byBlZGl0IHRoZSBiaWxsaW5nIGFkZHJlc3MnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICBjb21wb25lbnRUeXBlOiBXekFkZHJlc3NGb3JtQ29tcG9uZW50LFxuICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyBkaXNhYmxlQ2xvc2U6IHRydWUgfSxcbiAgICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGFkZHJlc3M6IHVzZXIuYmlsbGluZ0luZm8uYWRkcmVzcyxcbiAgICAgICAgICAgIGxvYWRlZDogdHJ1ZSxcbiAgICAgICAgICAgIHRpdGxlOiAnUFJPRklMRS5CQVNJQ19JTkZPLkJJTExJTkdfQUREUkVTU19FRElUX0JUTl9MQUJFTCcsXG4gICAgICAgICAgICBpbmNsdWRlQ2xvc2VCdXR0b246IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFt7XG4gICAgICAgICAgICBldmVudDogJ29uU2F2ZUFkZHJlc3MnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdhZGRzIHRoZSBiaWxsaW5nIGFkZHJlc3MnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlLm9uU3VibWl0Q2FsbEJhY2soeyBzb21lOiAnZGF0YScgfSk7XG4gICAgICAgIGV4cGVjdChtb2NrVXNlclNlcnZpY2UuYWRkQmlsbGluZ0FkZHJlc3MpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgc29tZTogJ2RhdGEnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGlja0VkaXRCYXNpY0luZm9CdXR0b24oKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2tFZGl0QmFzaWNJbmZvQnV0dG9uKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ29wZW5zIGEgZm9ybSBkaWFsb2cgdG8gZWRpdCB0aGUgYmFzaWMgaW5mbycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Gb3JtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChqYXNtaW5lLmFueShBcnJheSksIHtcbiAgICAgICAgICB0aXRsZTogJ1BST0ZJTEUuQkFTSUNfSU5GTy5FRElUX0JUTl9MQUJFTCcsIHN1Ym1pdExhYmVsOiAnUFJPRklMRS5CQVNJQ19JTkZPLlVQREFURV9CVE5fTEFCRUwnXG4gICAgICAgIH0sIGphc21pbmUuYW55KEZ1bmN0aW9uKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NoYW5nZXMgdGhlIGJhc2ljIGluZm8nLCAoKSA9PiB7XG4gICAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlLm9uQ2hhbmdlQmFzaWNJbmZvKHsgc29tZTogJ2RhdGEnIH0pO1xuICAgICAgICBleHBlY3QobW9ja1VzZXJTZXJ2aWNlLmNoYW5nZUJhc2ljSW5mbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBzb21lOiAnZGF0YScgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
