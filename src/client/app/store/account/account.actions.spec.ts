import { ActionFactory, InternalActionFactory } from './account.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Account Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'getAccountForQuoteAdmin',
        parameters: [1]
      },
      expectedAction: {
        type: '[Account] Get Account For Quote Admin',
        accountId: 1,
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'getAccountForQuoteAdminSuccess',
        parameters: [{ account: 'Some account' }]
      },
      expectedAction: {
        type: '[Account] Get Account For Quote Admin Success',
        account: { account: 'Some account' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'getAccountForQuoteAdminOnUserAdd',
        parameters: [{ accountId: 1 }]
      },
      expectedAction: {
        type: '[Account] Get Account For Quote Admin On User Add',
        accountId: { accountId: 1 },
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'getAccountForQuoteAdminOnUserAddSuccess',
        parameters: [{ account: 'Some account' }]
      },
      expectedAction: {
        type: '[Account] Get Account For Quote Admin On User Add Success',
        account: { account: 'Some account' }
      }
    });
  });
}
