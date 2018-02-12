import { ActionFactory, InternalActionFactory } from './router.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Router Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'goToLogin',
        parameters: []
      },
      expectedAction: {
        type: '[Router] Go To Login'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'goToLoginWithRedirect',
        parameters: []
      },
      expectedAction: {
        type: '[Router] Go To Login With Redirect'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'goToPageNotFound',
        parameters: []
      },
      expectedAction: {
        type: '[Router] Go To Page Not Found'
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'without markers',
      factoryMethod: {
        class: ActionFactory,
        name: 'goToSearchAssetDetails',
        parameters: [42]
      },
      expectedAction: {
        type: '[Router] Go To Search Asset Details',
        assetId: 42,
        markers: undefined
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'with markers',
      factoryMethod: {
        class: ActionFactory,
        name: 'goToSearchAssetDetails',
        parameters: [42, { some: 'markers' }]
      },
      expectedAction: {
        type: '[Router] Go To Search Asset Details',
        assetId: 42,
        markers: { some: 'markers' }
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'followRedirect',
        parameters: []
      },
      expectedAction: {
        type: '[Router] Follow Redirect'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'goToQuotes',
        parameters: []
      },
      expectedAction: {
        type: '[Router] Go To Quotes'
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'with default page and perPage',
      factoryMethod: {
        class: ActionFactory,
        name: 'goToCollection',
        parameters: [1]
      },
      expectedAction: {
        type: '[Router] Go To Collection',
        collectionId: 1,
        page: 1,
        perPage: 100
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'with custom page and perPage',
      factoryMethod: {
        class: ActionFactory,
        name: 'goToCollection',
        parameters: [1, 5, 55]
      },
      expectedAction: {
        type: '[Router] Go To Collection',
        collectionId: 1,
        page: 5,
        perPage: 55
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'goToActiveQuote',
        parameters: []
      },
      expectedAction: {
        type: '[Router] Go To Active Quote'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'goToCart',
        parameters: []
      },
      expectedAction: {
        type: '[Router] Go To Cart'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'goToQuoteById',
        parameters: [1]
      },
      expectedAction: {
        type: '[Router] Go To Quote By ID',
        quoteId: 1
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addMarkersToUrl',
        parameters: [123, 100, 200]
      },
      expectedAction: {
        type: '[Router] Add Markers To Url',
        assetId: 123,
        timeStart: 100,
        timeEnd: 200
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'goToBadRequest',
        parameters: []
      },
      expectedAction: {
        type: '[Router] Go To Bad Request'
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'goToServerError',
        parameters: []
      },
      expectedAction: {
        type: '[Router] Go To Server Error'
      }
    });
  });
}
