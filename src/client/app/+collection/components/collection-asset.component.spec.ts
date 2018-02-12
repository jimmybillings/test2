import { Observable } from 'rxjs/Observable';
import { CollectionAssetComponent } from './collection-asset.component';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Collection Asset Component', () => {
    let componentUnderTest: CollectionAssetComponent;
    let mockAppStore: MockAppStore;

    beforeEach(() => {
      mockAppStore = new MockAppStore();

      mockAppStore.createStateSection('uiConfig', {
        components: { collectionComment: { config: { form: { items: [{ some: 'field' }] } } } }
      });

      componentUnderTest = new CollectionAssetComponent(mockAppStore);
    });

    describe('ngOnInit()', () => {
      it('gets the right ui config', () => {
        componentUnderTest.ngOnInit();

        expect(componentUnderTest.commentFormConfig).toEqual([{ some: 'field' }]);
      });
    });
  });
}
