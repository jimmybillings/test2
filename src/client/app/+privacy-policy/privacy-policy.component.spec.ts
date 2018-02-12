import { PrivacyPolicyComponent } from './privacy-policy.component';
import { MockAppStore } from '../store/spec-helpers/mock-app.store';

export function main() {
  describe('Privacy Policy Component', () => {
    let componentUnderTest: PrivacyPolicyComponent;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockStore = new MockAppStore();
      mockStore.createStateSection('privacyPolicy', { document: 'some doc' });
      componentUnderTest = new PrivacyPolicyComponent(mockStore);
    });

    describe('get document()', () => {
      it('returns the document from the store', () => {
        let actualDoc: string;
        componentUnderTest.document.take(1).subscribe(docInStore => actualDoc = docInStore);
        expect(actualDoc).toEqual('some doc');
      });
    });
  });
}
