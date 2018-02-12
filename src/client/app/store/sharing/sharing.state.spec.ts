import * as SharingState from './sharing.state';
import * as SharingActions from './sharing.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Sharing Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: SharingActions,
      state: SharingState,
    });
  });

  stateSpecHelper.generateTestsFor({
    actionClassName: 'CreateAssetShareLinkSuccess',
    customTests: [
      {
        it: 'with previous state, returns previous state with assetLink',
        previousState: {
          assetLink: 'old link',
        },
        actionParameters: { link: 'new link' },
        expectedNextState: {
          assetLink: 'new link',
        }
      }
    ]
  });
}
