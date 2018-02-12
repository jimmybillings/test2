import { MockAppStore } from '../../store/spec-helpers/mock-app.store';
import { PrivacyPolicyResolver } from './privacy-policy.resolver';

export function main() {
  describe('Privacy Policy Resolver', () => {
    let resolverUnderTest: PrivacyPolicyResolver;
    let mockStore: MockAppStore;
    let loadDispatchSpy: jasmine.Spy;

    beforeEach(() => {
      mockStore = new MockAppStore();
      loadDispatchSpy = mockStore.createActionFactoryMethod('privacyPolicy', 'load');
      mockStore.createStateSection('uiConfig', { components: { footer: { config: { privacyPolicyId: { value: '12' } } } } });
      resolverUnderTest = new PrivacyPolicyResolver(mockStore);
    });

    describe('resolve()', () => {
      it('dispatches the proper action to the store', () => {
        resolverUnderTest.resolve().take(1).subscribe();

        mockStore.expectDispatchFor(loadDispatchSpy, '12');
      });

      it('resolves when there is data in the privacy policy store', () => {
        mockStore.createStateSection('privacyPolicy', { document: 'some-document' });

        let resolved: jasmine.Spy = jasmine.createSpy('resolved');
        resolverUnderTest.resolve().take(1).subscribe(resolved);
        expect(resolved).toHaveBeenCalled();
      });

      it('does not resolve when there is not data in the privacy policy store', () => {
        mockStore.createStateSection('privacyPolicy', { document: null });

        let resolved: jasmine.Spy = jasmine.createSpy('resolved');
        resolverUnderTest.resolve().take(1).subscribe(resolved);
        expect(resolved).not.toHaveBeenCalled();
      });
    });
  });
}
