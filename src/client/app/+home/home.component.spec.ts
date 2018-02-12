
import { Observable } from 'rxjs/Observable';
import { HomeComponent } from './home.component';
import { MockAppStore } from '../store/spec-helpers/mock-app.store';

export function main() {
  describe('Home Component', () => {
    let componentUnderTest: HomeComponent;
    let loggedIn: boolean;
    let mockCurrentUser: any;
    let mockSearchContext: any;
    let mockUserPreference: any;
    let mockGalleryView: any;
    let mockHomeVideo: any;
    let mockRouter: any;
    let mockFilter: any;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', {
        components: {
          home: {
            config: {
              pageSize: { value: '100' },
              notifications: { items: [{ trString: 'NOTIFICATION.NEW_USER' }] },
              heroContentType: { value: 'image' }
            }
          }
        }
      });

      mockGalleryView = {
        get: jasmine.createSpy('data').and.returnValue(Observable.of({
          'results': [{ 'id': 10, 'name': 'Tee offs', 'resultCount': 6, 'thumbnailUrl': '', 'hasMore': false }]
        }))
      };

      mockHomeVideo = {
        get: jasmine.createSpy('data').and.returnValue(Observable.of({
          'results': [{ 'feedid': 'qKeeO3ld', 'kind': 'manual', 'playlist': [], 'title': 'commerce-hero' }]
        }))
      };

      mockCurrentUser = { loggedIn: () => loggedIn };

      mockSearchContext = { new: jasmine.createSpy('new') };

      mockUserPreference = { state: { sortId: 0 } };

      mockFilter = { set: jasmine.createSpy('set'), clear: jasmine.createSpy('clear') };

      componentUnderTest = new HomeComponent(
        mockCurrentUser, mockSearchContext, mockUserPreference, mockGalleryView, mockHomeVideo, null, mockFilter, mockStore
      );
    });

    describe('ngOnInit()', () => {
      it('get the correct config from the app store', () => {
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.config).toEqual(
          {
            'pageSize': { 'value': '100' },
            'notifications': { 'items': [{ 'trString': 'NOTIFICATION.NEW_USER' }] },
            'heroContentType': { 'value': 'image' }
          });
      });
    });

    describe('buildSearchContext()', () => {
      it('Should create a new search context - anon user', () => {
        componentUnderTest.ngOnInit();
        componentUnderTest.newSearchContext('cat');
        expect(mockSearchContext.new).toHaveBeenCalledWith({ q: 'cat', i: 1, n: '100', sortId: 0 });
        expect(mockFilter.clear).toHaveBeenCalled();
      });
    });
  });
}
