import { ActionFactory, InternalActionFactory } from './search.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Search Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'loadResults',
        parameters: [{ some: 'params' }]
      },
      expectedAction: {
        type: '[Search] Load Results',
        params: { some: 'params' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'reset',
        parameters: []
      },
      expectedAction: {
        type: '[Search] Reset'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadResultsSuccess',
        parameters: [{ some: 'results' }]
      },
      expectedAction: {
        type: '[Search] Load Results Success',
        results: { some: 'results' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'loadResultsFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Search] Load Results Failure',
        error: { some: 'error' }
      }
    });
  });
}
