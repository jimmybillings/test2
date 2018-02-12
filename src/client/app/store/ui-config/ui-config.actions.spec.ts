import { ActionFactory, InternalActionFactory } from './ui-config.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Ui Config Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'initialize',
        parameters: ['commerce']
      },
      expectedAction: {
        type: '[Ui Config] Initialize',
        siteName: 'commerce'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: []
      },
      expectedAction: {
        type: '[Ui Config] Load'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [{ some: 'config' }]
      },
      expectedAction: {
        type: '[Ui Config] Load Success',
        config: { some: 'config' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Ui Config] Load Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'initializeSuccess',
        parameters: [{ some: 'config' }]
      },
      expectedAction: {
        type: '[Ui Config] Initialize Success',
        config: { some: 'config' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'initializeFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Ui Config] Initialize Failure',
        error: { some: 'error' }
      }
    });
  });
}
