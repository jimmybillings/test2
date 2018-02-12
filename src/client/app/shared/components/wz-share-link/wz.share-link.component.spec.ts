import { WzShareLinkComponent } from './wz.share-link.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Wz Share Link Component', () => {
    let componentUnderTest: WzShareLinkComponent;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockStore = new MockAppStore();
      componentUnderTest = new WzShareLinkComponent(mockStore);
    });

    describe('onCopyShareLinkButtonClick()', () => {
      it('displays a snackbar with the expected message', () => {
        const snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');

        componentUnderTest.onCopyShareLinkButtonClick();

        expect(snackbarSpy).toHaveBeenCalledWith('SHARING.SHARE_LINK.COPIED_CONFIRMED_MESSAGE');
      });
    });

  });
};

