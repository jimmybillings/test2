import { ActionFactory, InternalActionFactory } from './activity.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Activity Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'record',
        parameters: [{ some: 'options' }]
      },
      expectedAction: {
        type: '[Activity] Record',
        options: { some: 'options' }
      }
    });
  });
}
