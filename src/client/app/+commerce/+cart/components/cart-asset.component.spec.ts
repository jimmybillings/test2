import { Observable } from 'rxjs/Observable';

import { CartAssetComponent } from './cart-asset.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Cart Asset Component', () => {
    let componentUnderTest: CartAssetComponent;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', {
        components: { cartComment: { config: { form: { items: [{ some: 'field' }] } } } }
      });
      componentUnderTest = new CartAssetComponent(mockStore);
    });

    describe('ngOnInit()', () => {
      it('gets the right ui config', () => {
        componentUnderTest.ngOnInit();

        expect(componentUnderTest.commentFormConfig).toEqual([{ some: 'field' }]);
      });
    });
  });
}
