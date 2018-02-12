import { HomeResolver } from './home.resolver';
import { Observable } from 'rxjs/Observable';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Home Resolver', () => {
    let resolverUnderTest: HomeResolver;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', {
        components: {
          home: {
            config: {
              pageSize: { value: '100' },
              notifications: {
                items: [{ trString: 'NOTIFICATION.NEW_USER' }]
              }
            }
          }
        }
      });

      resolverUnderTest = new HomeResolver(null, mockStore, null);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
}
