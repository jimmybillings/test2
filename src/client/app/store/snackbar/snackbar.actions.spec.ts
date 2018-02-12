import { ActionFactory, InternalActionFactory } from './snackbar.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Snackbar Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'display',
        parameters: ['some key', { some: 'parameters' }]
      },
      expectedAction: {
        type: '[Snackbar] Display',
        messageKey: 'some key',
        messageParameters: { some: 'parameters' }
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'with no parameters',
      factoryMethod: {
        class: ActionFactory,
        name: 'display',
        parameters: ['some key']
      },
      expectedAction: {
        type: '[Snackbar] Display',
        messageKey: 'some key',
        messageParameters: {}
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'displaySuccess',
        parameters: ['some translated string']
      },
      expectedAction: {
        type: '[Snackbar] Display Success',
        translatedMessage: 'some translated string'
      }
    });
  });
}
