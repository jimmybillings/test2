import { ActionFactory, InternalActionFactory } from './error.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Error Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'handle',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Error] Handle',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'handle401Unauthorized',
        parameters: []
      },
      expectedAction: {
        type: '[Error] Handle 401 Unauthorized'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'handle403Forbidden',
        parameters: []
      },
      expectedAction: {
        type: '[Error] Handle 403 Forbidden'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'handleCustomError',
        parameters: ['some string']
      },
      expectedAction: {
        type: '[Error] Handle Custom Error',
        title: 'some string'
      }
    });
  });
}
