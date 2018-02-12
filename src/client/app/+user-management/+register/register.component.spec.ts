import { Observable } from 'rxjs/Observable';
import { RegisterComponent } from './register.component';
import { Response, ResponseOptions } from '@angular/http';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

const user: any = {
  emailAddress: 'jamesbonline@yahoo.com', firstName: 'james',
  lastName: 'billigns', password: '3978f324e14ac256b2994b754586e05f'
};

export function main() {
  describe('Register Component', () => {
    let mockUserService: any;
    let mockDialogService: any;
    let mockRef: any;
    let componentUnderTest: RegisterComponent;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockRef = { markForCheck: function () { } };

      mockUserService = {
        create: jasmine.createSpy('create').and.returnValue(Observable.of(user)),
        downloadActiveTosDocument: jasmine.createSpy('downloadActiveTosDocument').and.returnValue(Observable.of('some-terms'))
      };

      mockDialogService = {
        openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable.of({}))
      };

      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', { components: { register: { config: { someConfig: 'test' } } } });

      componentUnderTest = new RegisterComponent(mockUserService, mockStore, mockDialogService, mockRef);
    });

    describe('ngOnInit()', () => {
      it('Grabs the component config and assigns to an instance variable', () => {
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.config).toEqual({ someConfig: 'test' });
        expect(mockUserService.downloadActiveTosDocument).toHaveBeenCalled();
      });
    });

    describe('onSubmit()', () => {
      it('Calls the server with user body to create user', () => {
        componentUnderTest.onSubmit(user);
        expect(componentUnderTest.userService.create).toHaveBeenCalledWith(user);
      });

      it('Sets a component variable flag to show a success dialog to user', () => {
        componentUnderTest.onSubmit(user);
        expect(componentUnderTest.successfullySubmitted).toEqual(true);
      });

      it('Assigns success user response to instance variable for screen display', () => {
        componentUnderTest.onSubmit(user);
        expect(componentUnderTest.newUser).toEqual(user);
      });

      it('Sets a errors variable to display errors if the server doesnt pass', () => {
        const errorResponse: Response = new Response(new ResponseOptions({ body: JSON.stringify({ email: 'Not Unique' }) }));
        mockUserService = { create: jasmine.createSpy('create').and.returnValue(Observable.throw(errorResponse)) };
        componentUnderTest = new RegisterComponent(mockUserService, mockStore, mockDialogService, mockRef);
        componentUnderTest.onSubmit(user);
        expect(componentUnderTest.serverErrors).toEqual({ email: 'Not Unique' });
      });

      it('Does not set errors variable if the status was 451', () => {
        const errorResponse: Response = new Response(
          new ResponseOptions({ status: 451, body: JSON.stringify({ email: 'Not Unique' }) })
        );
        mockUserService = { create: jasmine.createSpy('create').and.returnValue(Observable.throw(errorResponse)) };
        componentUnderTest = new RegisterComponent(mockUserService, mockStore, mockDialogService, mockRef);
        componentUnderTest.onSubmit(user);
        expect(componentUnderTest.serverErrors).toEqual(null);
      });
    });

    describe('openTermsDialog()', () => {
      it('opens the component in the dialog service', () => {
        componentUnderTest.ngOnInit();
        componentUnderTest.openTermsDialog();
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
          componentType: jasmine.any(Function),
          inputOptions: {
            terms: 'some-terms',
            btnLabel: 'REGISTER.CLOSE_TOS_DIALOG',
            header: 'REGISTER.TOS_TITLE'
          }
        });
      });
    });
  });
}
