import { Observable } from 'rxjs/Observable';

import { SnackbarService } from './snackbar.service';

export function main() {
  describe('Snackbar Service', () => {
    let serviceUnderTest: SnackbarService;
    let mockTranslateService: any;
    let mockSnackBar: any;

    beforeEach(() => {
      mockTranslateService = {
        get: jasmine.createSpy('translateService').and.returnValue(Observable.of('someTranslatedString'))
      };
      mockSnackBar = { open: jasmine.createSpy('open') };

      serviceUnderTest = new SnackbarService(mockTranslateService, mockSnackBar);
    });

    describe('display()', () => {
      it('calls the translate service with the expected arguments', () => {
        serviceUnderTest.display('some key', { some: 'parameters' });

        expect(mockTranslateService.get).toHaveBeenCalledWith('some key', { some: 'parameters' });
      });

      it('opens the snackbar with the translated string', () => {
        serviceUnderTest.display('some key', { some: 'parameters' }).subscribe(() => {
          expect(mockSnackBar.open).toHaveBeenCalledWith('someTranslatedString', '', {
            duration: jasmine.any(Number),
            verticalPosition: 'top',
            horizontalPosition: 'left',
            extraClasses: ['wz-snackbar']
          });
        });
      });
    });
  });
}
