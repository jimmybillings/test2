import { ActionFactory, InternalActionFactory } from './header-display-options.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Header Display Options Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setHeaderPosition',
        parameters: [100]
      },
      expectedAction: {
        type: '[Header Display Options] Set Header Position',
        pageVerticalOffset: 100
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'checkIfHeaderCanBeFixed',
        parameters: ['/user/login']
      },
      expectedAction: {
        type: '[Header Display Options] Check If Header Can Be Fixed',
        url: '/user/login'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'checkIfFiltersAreAvailable',
        parameters: ['/user/login']
      },
      expectedAction: {
        type: '[Header Display Options] Check If Filters Are Available',
        url: '/user/login'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'reset',
        parameters: []
      },
      expectedAction: {
        type: '[Header Display Options] Reset'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'disableFix',
        parameters: []
      },
      expectedAction: {
        type: '[Header Display Options] Disable Fix'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'enableFix',
        parameters: []
      },
      expectedAction: {
        type: '[Header Display Options] Enable Fix'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'fix',
        parameters: []
      },
      expectedAction: {
        type: '[Header Display Options] Fix'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'unfix',
        parameters: []
      },
      expectedAction: {
        type: '[Header Display Options] Unfix'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'enableFilters',
        parameters: []
      },
      expectedAction: {
        type: '[Header Display Options] Enable Filters'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'disableFilters',
        parameters: []
      },
      expectedAction: {
        type: '[Header Display Options] Disable Filters'
      }
    });
  });
}
