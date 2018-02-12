import { ActionFactory, InternalActionFactory } from './quote-show.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Quote Show Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'load',
        parameters: [42]
      },
      expectedAction: {
        type: '[Quote Show] Load',
        quoteId: 42
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadSuccess',
        parameters: [{ some: 'quote' }]
      },
      expectedAction: {
        type: '[Quote Show] Load Success',
        quote: { some: 'quote' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Quote Show] Load Failure',
        error: { some: 'error' }
      }
    });
  });
}
