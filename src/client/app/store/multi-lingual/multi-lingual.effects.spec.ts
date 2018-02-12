import { MultiLingualEffects } from './multi-lingual.effects';
import * as MultiLingualActions from './multi-lingual.actions';
import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Multi Lingual Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();
    let mockApiConfig: any;
    function instantiator(): any {
      return new MultiLingualEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService, mockApiConfig
      );
    }

    beforeEach(() => {
      mockApiConfig = { baseUrl: 'http://cruxapi.com/', portal: 'commerce' };
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'setLanguage',
      comment: 'calls translate use with correct api endpoint url',
      effectsInstantiator: instantiator,
      inputAction: {
        type: MultiLingualActions.SetLanguage.Type,
        lang: 'en'
      },
      state: {
        storeSectionName: 'multiLingual',
        propertyName: 'lang',
        value: 'en'
      },
      serviceMethod: {
        name: 'use',
        expectedArguments: [`/cruxapi.com/identities-api/v1/translation/commerce/en`],
      }
    });

  });
}
