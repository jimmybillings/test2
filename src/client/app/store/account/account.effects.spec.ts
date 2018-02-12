import { AccountEffects } from './account.effects';
import * as AccountActions from './account.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Account Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): AccountEffects {
      return new AccountEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'getAccountForQuoteAdminSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AccountActions.GetAccountForQuoteAdminSuccess.Type,
        account: { id: 1 }
      },
      outputActionFactories: {
        success: {
          sectionName: 'user',
          methodName: 'getAllUsersByAccountId',
          expectedArguments: [1]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'getAccountForQuoteAdmin',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AccountActions.GetAccountForQuoteAdmin.Type,
        accountId: 1,
        onUserAdd: false
      },
      serviceMethod: {
        name: 'getAccount',
        expectedArguments: [1, 'onBeforeRequest'],
        returnsObservableOf: {
          id: 1,
          name: 'test',
          salesOwner: 'sales owner',
          paymentTermsDays: 'paymentTermsDays',
          purchaseOnCredit: 'purchaseOnCredit',
          creditExemption: 'creditExemption',
          licensingVertical: 'licensingVertical',
          invoiceContactId: 'invoiceContactId'
        }
      },
      outputActionFactories: {
        success: {
          sectionName: 'account',
          methodName: 'getAccountForQuoteAdminSuccess',
          expectedArguments: [{
            id: 1,
            name: 'test',
            salesOwner: 'sales owner',
            paymentTermsDays: 'paymentTermsDays',
            purchaseOnCredit: 'purchaseOnCredit',
            creditExemption: 'creditExemption',
            licensingVertical: 'licensingVertical',
            invoiceContactId: 'invoiceContactId'
          }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'getAccountForQuoteAdmin',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AccountActions.GetAccountForQuoteAdminOnUserAdd.Type,
        accountId: 1,
      },
      serviceMethod: {
        name: 'getAccount',
        expectedArguments: [1, 'onBeforeRequest'],
        returnsObservableOf: {
          id: 1,
          name: 'test',
          salesOwner: 'sales owner',
          paymentTermsDays: 'paymentTermsDays',
          purchaseOnCredit: 'purchaseOnCredit',
          creditExemption: 'creditExemption',
          licensingVertical: 'licensingVertical',
          invoiceContactId: 'invoiceContactId'
        }
      },
      outputActionFactories: {
        success: {
          sectionName: 'account',
          methodName: 'getAccountForQuoteAdminOnUserAddSuccess',
          expectedArguments: [{
            id: 1,
            name: 'test',
            salesOwner: 'sales owner',
            paymentTermsDays: 'paymentTermsDays',
            purchaseOnCredit: 'purchaseOnCredit',
            creditExemption: 'creditExemption',
            licensingVertical: 'licensingVertical',
            invoiceContactId: 'invoiceContactId'
          }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'getAccountForQuoteAdmin',
      effectsInstantiator: instantiator,
      inputAction: {
        type: AccountActions.GetAccountForQuoteAdmin.Type,
        accountId: 1,
      },
      serviceMethod: {
        name: 'getAccount',
        expectedArguments: [1, 'onBeforeRequest'],
        returnsObservableOf: {
          id: 1,
          name: 'test',
          invoiceContactId: 'invoiceContactId'
        }
      },
      outputActionFactories: {
        success: {
          sectionName: 'account',
          methodName: 'getAccountForQuoteAdminSuccess',
          expectedArguments: [{
            id: 1,
            name: 'test',
            salesOwner: null,
            paymentTermsDays: null,
            purchaseOnCredit: null,
            creditExemption: null,
            licensingVertical: null,
            invoiceContactId: 'invoiceContactId'
          }]
        }
      }
    });
  });
}
