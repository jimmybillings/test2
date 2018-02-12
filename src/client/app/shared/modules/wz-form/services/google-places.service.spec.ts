import { GooglePlacesService } from './google-places.service';

export function main() {
  class MockAutocomplete {
    public addListener = jasmine.createSpy('addListener');
    public setBounds = jasmine.createSpy('setBounds');
    constructor(inputElement: any, options: any) { }
  }

  class MockCircle {
    public getBounds = jasmine.createSpy('getBounds').and.returnValue({ mock: 'bounds' });
    constructor(options: any) { }
  }

  describe('Google Service', () => {
    let serviceUnderTest: GooglePlacesService, mockWindow: any, mockDocument: any;
    const scriptSrc = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzyGsK3zaRGFAEC72nWbdRvBY1Lo92Cfw&libraries=places';

    beforeEach(() => {
      mockDocument = {
        getElementsByTagName: jasmine.createSpy('getElementsByTagName').and.returnValue([{}, {}, {}]),
        createElement: jasmine.createSpy('createElement').and.returnValue({}),
        getElementById: jasmine.createSpy('getElementById').and.returnValue({}),
        body: {
          appendChild: jasmine.createSpy('appendChild')
        }
      };
      mockWindow = {
        nativeWindow: { google: { maps: { places: { Autocomplete: MockAutocomplete }, Circle: MockCircle } } }
      };

      serviceUnderTest = new GooglePlacesService(mockWindow, mockDocument);
    });

    describe('loadPlacesLibrary()', () => {
      describe('if the script already exists on the page', () => {
        beforeEach(() => {
          mockDocument = {
            getElementsByTagName: jasmine.createSpy('getElementsByTagName').and.returnValue([{ src: scriptSrc }]),
            getElementById: jasmine.createSpy('getElementById').and.returnValue({})
          };
          serviceUnderTest = new GooglePlacesService(mockWindow, mockDocument);
          serviceUnderTest.loadPlacesLibrary(null);
        });

        it('calls initAutocomplete()', () => {
          expect(mockDocument.getElementById).toHaveBeenCalledWith('autocomplete');
        });
      });

      describe('if the script doesn\'t exist', () => {
        beforeEach(() => {
          serviceUnderTest.loadPlacesLibrary(null);
        });

        it('creates the script', () => {
          expect(mockDocument.getElementsByTagName).toHaveBeenCalledWith('script');
        });

        it('appends the script to the DOM', () => {
          expect(mockDocument.body.appendChild).toHaveBeenCalledWith({
            src: scriptSrc,
            type: 'text/javascript',
            onload: jasmine.any(Function)
          });
        });
      });
    });
  });
}
