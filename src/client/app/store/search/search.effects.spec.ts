import { SearchEffects } from './search.effects';
import * as SearchActions from './search.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Search Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): SearchEffects {
      return new SearchEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadResults',
      effectsInstantiator: instantiator,
      inputAction: {
        type: SearchActions.LoadResults.Type,
        params: { some: 'params' }
      },
      serviceMethod: {
        name: 'loadResults',
        expectedArguments: [{ some: 'params' }],
        returnsObservableOf: { some: 'results' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'search',
          methodName: 'loadResultsSuccess',
          expectedArguments: [{ some: 'results' }]
        },
        failure: {
          sectionName: 'search',
          methodName: 'loadResultsFailure'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadResultsFailure',
      comment: 'With a status of 400',
      effectsInstantiator: instantiator,
      inputAction: {
        type: SearchActions.LoadResultsFailure.Type,
        error: { status: 400 },
      },
      outputActionFactories: {
        success: {
          sectionName: 'error',
          methodName: 'handle',
          expectedArguments: [{ status: 400 }]
        }
      }
    });
  });
}
