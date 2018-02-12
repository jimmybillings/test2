import { ProfileComponent } from './profile.component';
import { Observable } from 'rxjs/Observable';
import { WzAddressFormComponent } from '../../shared/modules/wz-form/components/wz-address-form/wz.address-form.component';
import { Address } from '../../shared/interfaces/user.interface';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Profile Component', () => {
    let componentUnderTest: ProfileComponent;
    let mockStore: MockAppStore;
    let mockCurrentUserService: any;
    let mockChangeDetectorRef: any;
    let mockUserService: any;
    let mockDialogService: any;

    const user: any = {
      accountId: 123,
      emailAddress: 'jamesbonline@yahoo.com',
      firstName: 'james', lastName: 'billings', password: '3978f324e14ac256b2994b754586e05f',
      billingInfo: { address: { state: 'CO', phone: '720 291-2524' } },
    };

    beforeEach(() => {
      mockCurrentUserService = { data: Observable.of(user) };

      mockChangeDetectorRef = { detectChanges: jasmine.createSpy('detectChanges') };

      mockUserService = {
        getAccount: jasmine.createSpy('getAccount').and.returnValue(Observable.of({ name: 'accountName', some: 'data' })),
        addBillingAddress: jasmine.createSpy('addBillingAddress').and.returnValue(Observable.of({})),
        changeBasicInfo: jasmine.createSpy('changeBasicInfo').and.returnValue(Observable.of({}))
      };

      mockDialogService = {
        openFormDialog: jasmine.createSpy('openFormDialog').and.callFake((_: any, __: any, onSubmitCallback: Function) => {
          mockDialogService.onChangeBasicInfo = onSubmitCallback;
        }),
        openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.callFake((options: any) => {
          mockDialogService.onSubmitCallBack = options.outputOptions[0].callback;
        })
      };

      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', {
        components: { userBasicInfo: { config: { form: { items: [{ some: 'items' }] } } } }
      });

      componentUnderTest = new ProfileComponent(
        mockCurrentUserService, mockDialogService, mockUserService, mockChangeDetectorRef, mockStore
      );
    });

    describe('ngOnInit()', () => {
      it('Grabs the component config and assigns to an instance variable', () => {
        componentUnderTest = new ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.user).toEqual(user);
      });
    });

    describe('ngOnDestroy()', () => {
      it('unsubscribes from the UI config to prevent memory leakage', () => {
        let mockSubscription = { unsubscribe: jasmine.createSpy('unsubscribe') };
        let mockObservable = { subscribe: () => mockSubscription };
        mockCurrentUserService = { data: mockObservable };
        componentUnderTest = new ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
        componentUnderTest.ngOnInit();
        componentUnderTest.ngOnDestroy();
        expect(mockSubscription.unsubscribe).toHaveBeenCalled();
      });
    });

    describe('getBillingAddressInfo()', () => {
      let mockUser: any;
      it('should return an empty string when billingInfo does not exist on the user', () => {
        mockUser = {
          emailAddress: 'jdoe@gmail.com',
          firstName: 'John', lastName: 'Doe', password: '3978f324e14ac256b2994b754586e05f',
        };
        mockCurrentUserService = { data: Observable.of(mockUser) };
        componentUnderTest = new ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
        componentUnderTest.ngOnInit();
        let result = componentUnderTest.getBillingAddressInfo('state');
        expect(result).toBe('');
      });

      it('should return an empty string when part of billingInfo.address exist but requested part is missing', () => {
        mockUser = {
          emailAddress: 'jdoe@gmail.com',
          firstName: 'John', lastName: 'Doe', password: '3978f324e14ac256b2994b754586e05f',
          emailOptOut: false,
          billingInfo: { address: { state: 'CO', phone: '720 291-2524' } },
        };
        mockCurrentUserService = { data: Observable.of(mockUser) };
        componentUnderTest = new ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
        componentUnderTest.ngOnInit();
        let result = componentUnderTest.getBillingAddressInfo('address');
        expect(result).toBe('');
      });

      it('should return correct part of billingInfo address if it exists', () => {
        mockUser = {
          emailAddress: 'jdoe@gmail.com',
          firstName: 'John', lastName: 'Doe', password: '3978f324e14ac256b2994b754586e05f',
          emailOptOut: false,
          billingInfo: { address: { state: 'CO', phone: '720 291-2524' } },
        };
        mockCurrentUserService = { data: Observable.of(mockUser) };
        componentUnderTest = new ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
        componentUnderTest.ngOnInit();
        let result = componentUnderTest.getBillingAddressInfo('state');
        expect(result).toBe('CO');
      });

      it('should return empty string if billingInfo.address does not exist', () => {
        mockUser = {
          emailAddress: 'jdoe@gmail.com',
          emailOptOut: false,
          billingInfo: {},
        };
        mockCurrentUserService = { data: Observable.of(mockUser) };
        componentUnderTest = new ProfileComponent(mockCurrentUserService, null, mockUserService, mockChangeDetectorRef, mockStore);
        componentUnderTest.ngOnInit();
        let result = componentUnderTest.getBillingAddressInfo('state');
        expect(result).toBe('');
      });
    });

    describe('onClickEditAddressButton()', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
        componentUnderTest.onClickEditAddressButton();
      });

      it('opens a dialogService to edit the billing address', () => {
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
          componentType: WzAddressFormComponent,
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

      it('adds the billing address', () => {
        mockDialogService.onSubmitCallBack({ some: 'data' });
        expect(mockUserService.addBillingAddress).toHaveBeenCalledWith({ some: 'data' });
      });
    });

    describe('onClickEditBasicInfoButton()', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
        componentUnderTest.onClickEditBasicInfoButton();
      });

      it('opens a form dialog to edit the basic info', () => {
        expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(jasmine.any(Array), {
          title: 'PROFILE.BASIC_INFO.EDIT_BTN_LABEL', submitLabel: 'PROFILE.BASIC_INFO.UPDATE_BTN_LABEL'
        }, jasmine.any(Function));
      });

      it('changes the basic info', () => {
        mockDialogService.onChangeBasicInfo({ some: 'data' });
        expect(mockUserService.changeBasicInfo).toHaveBeenCalledWith({ some: 'data' });
      });
    });
  });
}
