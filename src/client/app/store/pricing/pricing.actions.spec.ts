import { ActionFactory, InternalActionFactory } from './pricing.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Pricing Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'resetPricing',
        parameters: []
      },
      expectedAction: {
        type: '[Pricing] Reset Pricing'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setPriceForDetails',
        parameters: [100]
      },
      expectedAction: {
        type: '[Pricing] Set Price For Details',
        price: 100
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setPriceForDialog',
        parameters: [100]
      },
      expectedAction: {
        type: '[Pricing] Set Price For Dialog',
        price: 100
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setAppliedAttributes',
        parameters: [{ some: 'attributes' }]
      },
      expectedAction: {
        type: '[Pricing] Set Applied Attributes',
        appliedAttributes: { some: 'attributes' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'initializePricing',
        parameters: ['Rights Managed', { some: 'options' }]
      },
      expectedAction: {
        type: '[Pricing] Initialize Pricing',
        rightsReproduction: 'Rights Managed',
        dialogOptions: { some: 'options' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'calculatePrice',
        parameters: [{ some: 'attributes' }, 12345, { some: 'markers' }]
      },
      expectedAction: {
        type: '[Pricing] Calculate Price',
        selectedAttributes: { some: 'attributes' },
        assetId: 12345,
        subclipMarkers: { some: 'markers' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'getAttributes',
        parameters: ['Rights Managed', { some: 'options' }]
      },
      expectedAction: {
        type: '[Pricing] Get Attributes',
        rightsReproduction: 'Rights Managed',
        dialogOptions: { some: 'options' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'openDialog',
        parameters: [{ some: 'options' }]
      },
      expectedAction: {
        type: '[Pricing] Open Dialog',
        dialogOptions: { some: 'options' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'getAttributesSuccess',
        parameters: [{ some: 'attributes' }, 'Rights Managed', { some: 'options' }]
      },
      expectedAction: {
        type: '[Pricing] Get Attributes Success',
        dialogOptions: { some: 'options' },
        attributes: { some: 'attributes' },
        rightsReproduction: 'Rights Managed'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'getAttributesFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Pricing] Get Attributes Failure',
        error: { some: 'error' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'calculatePriceSuccess',
        parameters: [100]
      },
      expectedAction: {
        type: '[Pricing] Calculate Price Success',
        price: 100
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'calculatePriceFailure',
        parameters: [{ some: 'error' }]
      },
      expectedAction: {
        type: '[Pricing] Calculate Price Failure',
        error: { some: 'error' }
      }
    });
  });
}
