import { HeaderDisplayOptionsEffects } from './header-display-options.effects';
import * as HeaderDisplayOptionsActions from './header-display-options.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Header Display Options Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): HeaderDisplayOptionsEffects {
      return new HeaderDisplayOptionsEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'determineHeaderPosition',
      comment: 'when the header should NOT be fixed',
      inputAction: {
        type: HeaderDisplayOptionsActions.SetHeaderPosition.Type,
        pageVerticalOffset: 110
      },
      state: {
        storeSectionName: 'headerDisplayOptions',
        value: { isFixed: true }
      },
      outputActionFactories: {
        success: {
          sectionName: 'headerDisplayOptions',
          methodName: 'unfix',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'determineHeaderPosition',
      comment: 'when the header SHOULD be fixed',
      inputAction: {
        type: HeaderDisplayOptionsActions.SetHeaderPosition.Type,
        pageVerticalOffset: 112
      },
      state: {
        storeSectionName: 'headerDisplayOptions',
        value: { isFixed: false }
      },
      outputActionFactories: {
        success: {
          sectionName: 'headerDisplayOptions',
          methodName: 'fix',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'determineIfHeaderCanBeFixed',
      comment: 'when the header CAN be fixed',
      inputAction: {
        type: HeaderDisplayOptionsActions.CheckIfHeaderCanBeFixed.Type,
        url: '/cart'
      },
      outputActionFactories: {
        success: {
          sectionName: 'headerDisplayOptions',
          methodName: 'enableFix',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'determineIfHeaderCanBeFixed',
      comment: 'when the header CANNOT be fixed',
      inputAction: {
        type: HeaderDisplayOptionsActions.CheckIfHeaderCanBeFixed.Type,
        url: '/user/login'
      },
      outputActionFactories: {
        success: {
          sectionName: 'headerDisplayOptions',
          methodName: 'disableFix',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'determineIfHeaderCanBeFixed',
      comment: 'when the header CANNOT be fixed - root url',
      inputAction: {
        type: HeaderDisplayOptionsActions.CheckIfHeaderCanBeFixed.Type,
        url: '/'
      },
      outputActionFactories: {
        success: {
          sectionName: 'headerDisplayOptions',
          methodName: 'disableFix',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'determineIfFiltersAreAvailable',
      comment: 'when the filters SHOULD be available',
      inputAction: {
        type: HeaderDisplayOptionsActions.CheckIfFiltersAreAvailable.Type,
        url: '/search'
      },
      outputActionFactories: {
        success: {
          sectionName: 'headerDisplayOptions',
          methodName: 'enableFilters',
          expectedArguments: []
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'determineIfFiltersAreAvailable',
      comment: 'when the SHOULD NOT be available',
      inputAction: {
        type: HeaderDisplayOptionsActions.CheckIfFiltersAreAvailable.Type,
        url: '/collections'
      },
      outputActionFactories: {
        success: {
          sectionName: 'headerDisplayOptions',
          methodName: 'disableFilters',
          expectedArguments: []
        }
      }
    });
  });
}
