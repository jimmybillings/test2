import { ActionFactory, InternalActionFactory } from './speed-preview.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Speed Preview Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: [{ asset: { assetId: 1 } }]
      },
      expectedAction: {
        type: '[SpeedPreview] Load',
        asset: { asset: { assetId: 1 } }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [{ 'speedViewData': 'test speed view data' }, 1]
      },
      expectedAction: {
        type: '[SpeedPreview] Load Success',
        speedViewData: { 'speedViewData': 'test speed view data' },
        assetId: 1
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: [1]
      },
      expectedAction: {
        type: '[SpeedPreview] Load Failure',
        assetId: 1
      }
    });
  });

}

