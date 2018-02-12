import { ActionFactory, InternalActionFactory } from './page-data.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Page Data Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'updateTitle',
        parameters: ['key', { some: 'params' }]
      },
      expectedAction: {
        type: '[Page Data] Update Title',
        trKey: 'key',
        trParams: { some: 'params' }
      }
    });
  });
}
