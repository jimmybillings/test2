import { QuoteShowAssetComponent } from './quote-show-asset.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { Observable } from 'rxjs/Observable';

export function main() {
  describe('Quote Show Asset Component', () => {
    let componentUnderTest: QuoteShowAssetComponent;
    let mockAppStore: MockAppStore;

    beforeEach(() => {
      mockAppStore = new MockAppStore();
      mockAppStore.createStateSection('uiConfig', {
        components: { quoteComment: { config: { form: { items: [{ some: 'field' }] } } } }
      });
      componentUnderTest = new QuoteShowAssetComponent(mockAppStore);
    });

    describe('ngOnInit()', () => {
      it('gets the right ui config', () => {
        componentUnderTest.ngOnInit();

        expect(componentUnderTest.commentFormConfig).toEqual([{ some: 'field' }]);
      });
    });
  });
}
