import * as QuoteShowActions from './quote-show.actions';
import { QuoteShowEffects } from './quote-show.effects';
import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Quote Show Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): any {
      return new QuoteShowEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'load',
      effectsInstantiator: instantiator,
      inputAction: {
        type: QuoteShowActions.Load.Type,
        quoteId: 47
      },
      serviceMethod: {
        name: 'load',
        expectedArguments: [47],
        returnsObservableOf: { some: 'quote' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'quoteShow',
          methodName: 'loadSuccess',
          expectedArguments: [{ some: 'quote' }]
        },
        failure: {
          sectionName: 'quoteShow',
          methodName: 'loadFailure'
        }
      }
    });
  });
}
