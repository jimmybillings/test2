import { ActionFactory } from './multi-lingual.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Multi-lingual Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'setLanguage',
        parameters: ['en']
      },
      expectedAction: {
        type: '[Multilingual] Set Language',
        lang: 'en'
      }
    });
  });
}

