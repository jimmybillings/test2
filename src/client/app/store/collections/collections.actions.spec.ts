import { ActionFactory, InternalActionFactory } from './collections.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Collections Actions', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'addAssetToCollection',
        parameters: [{ some: 'collection' }, { some: 'asset' }]
      },
      expectedAction: {
        type: '[Collections] add asset to collection',
        collection: { some: 'collection' },
        asset: { some: 'asset' }
      }
    });
  });
}
