import { ActionFactory, InternalActionFactory } from './privacy-policy.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Privacy Policy Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: ['12']
      },
      expectedAction: {
        type: '[Privacy Policy] Load',
        documentId: '12'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: ['some-doc']
      },
      expectedAction: {
        type: '[Privacy Policy] Load Success',
        document: 'some-doc'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: ['some-error']
      },
      expectedAction: {
        type: '[Privacy Policy] Load Failure',
        error: 'some-error'
      }
    });
  });
}
