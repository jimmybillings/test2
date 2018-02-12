// TODO: Uncomment all commented lines after fixing 'require' issue.
import { CollectionLinkComponent } from './collection-link.component';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Collection Link Component', () => {
    let componentUnderTest: CollectionLinkComponent;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockStore = new MockAppStore();
      componentUnderTest = new CollectionLinkComponent(mockStore);
    });

    describe('onCopyLegacyLinkButtonClick()', () => {
      it('displays a snackbar with the expected message', () => {
        const snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');

        componentUnderTest.onCopyLegacyLinkButtonClick();

        expect(snackbarSpy).toHaveBeenCalledWith('COLLECTION.LINK_COPIED_TOAST');
      });
    });
  });
};
