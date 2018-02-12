import { Observable } from 'rxjs/Observable';
import { PageDataService } from './page-data.service';

export function main() {
  describe('Page Data Service', () => {
    let serviceUnderTest: PageDataService;
    let mockTranslateService: any;
    let mockTitleService: any;

    beforeEach(() => {
      mockTranslateService = {
        values: {
          COMPANY_NAME: 'Wazee Digital -',
          SOME_KEY: ' Some value',
          SEARCH: ' Search for {{q}}'
        },
        get: (keys: string[], params: any) => {
          let v: any = {};
          keys.forEach((k: string, i: number) => v[k] = mockTranslateService.values[k]);
          return Observable.of(v);
        }
      };
      mockTitleService = {
        setTitle: jasmine.createSpy('setTitle')
      };
      serviceUnderTest = new PageDataService(mockTranslateService, mockTitleService);
    });

    describe('updateTitle()', () => {
      describe('calls translateService::setTitle with the proper value', () => {
        it('when there is no search param', () => {
          serviceUnderTest.updateTitle('SEARCH', { some: 'params' });

          expect(mockTitleService.setTitle).toHaveBeenCalledWith('Wazee Digital - Search for all');
        });

        it('for a generic string', () => {
          serviceUnderTest.updateTitle('SOME_KEY', { some: 'params' });

          expect(mockTitleService.setTitle).toHaveBeenCalledWith('Wazee Digital - Some value');
        });
      });
    });
  });
}
