import { ActionFactory, InternalActionFactory } from './loading-indicator.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Loading Indicator Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'show',
        parameters: []
      },
      expectedAction: {
        type: '[Loading Indicator] Show'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'hide',
        parameters: []
      },
      expectedAction: {
        type: '[Loading Indicator] Hide'
      }
    });
  });
}
