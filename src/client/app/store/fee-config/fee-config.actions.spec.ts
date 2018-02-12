import { ActionFactory, InternalActionFactory } from './fee-config.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Fee Config Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadFeeConfig',
        parameters: []
      },
      expectedAction: {
        type: '[Fee Config] Load Fee Config'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFeeConfigSuccess',
        parameters: [{ feeConfig: 'fee config' }]
      },
      expectedAction: {
        type: '[Fee Config] Load Fee Config Success',
        feeConfig: { 'feeConfig': 'fee config' }
      }
    });
  });
}
