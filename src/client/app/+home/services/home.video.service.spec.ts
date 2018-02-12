import { HomeVideoService } from './home.video.service';
import { MockApiService, mockApiMatchers } from '../../shared/mocks/mock-api.service';
import { Observable } from 'rxjs/Observable';

export function main() {
  describe('Home Video Service', () => {
    let serviceUnderTest: HomeVideoService, mockApi: MockApiService;

    beforeEach(() => {
      mockApi = new MockApiService();
      jasmine.addMatchers(mockApiMatchers);

      // mockHomeVideoService = {
      //   data: Observable.of({ 'feedid': 'qKeeO3ld', 'kind': 'manual', 'playlist': [], 'title': 'commerce-hero' })
      // };
      mockApi.getResponse = { data: { 'feedid': 'qKeeO3ld', 'kind': 'manual', 'playlist': [], 'title': 'commerce-hero' } };
      serviceUnderTest = new HomeVideoService(null);

    });

    describe('data getter', () => {
      it('***** HASN\'T BEEN TESTED YET! *****', () => {
        expect(true).toBe(true);
      });
    });
  });
}
