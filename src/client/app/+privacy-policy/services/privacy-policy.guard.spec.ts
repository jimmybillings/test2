import { MockAppStore } from '../../store/spec-helpers/mock-app.store';
import { PrivacyPolicyGuard } from './privacy-policy.guard';

export function main() {
  describe('Privacy Policy Guard', () => {
    let guardUnderTest: PrivacyPolicyGuard;
    let mockStore: MockAppStore;
    let goToPageNotFoundSpy: jasmine.Spy;

    beforeEach(() => {
      mockStore = new MockAppStore();
      goToPageNotFoundSpy = mockStore.createActionFactoryMethod('router', 'goToPageNotFound');
      guardUnderTest = new PrivacyPolicyGuard(mockStore);
    });

    describe('canActviate', () => {
      it('returns true if the uiConfig has a privacyPolicyId', () => {
        mockStore.createStateSection('uiConfig', { components: { footer: { config: { privacyPolicyId: '1' } } } });

        expect(guardUnderTest.canActivate()).toBe(true);
      });

      describe('when the uiConfig does not have a privacyPolicyId', () => {
        beforeEach(() => {
          mockStore.createStateSection('uiConfig', { components: { footer: { config: {} } } });
        });

        it('returns false', () => {
          expect(guardUnderTest.canActivate()).toBe(false);
        });

        it('dispatches the correct action', () => {
          guardUnderTest.canActivate();
          mockStore.expectDispatchFor(goToPageNotFoundSpy);
        });
      });
    });
  });
}
