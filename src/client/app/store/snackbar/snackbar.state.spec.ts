import * as SnackbarActions from './snackbar.actions';
import * as SnackbarState from './snackbar.state';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Snackbar Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: SnackbarActions,
      state: SnackbarState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Display',
      customTests: [
        {
          it: 'with previous state and message parameters, returns new state with message key and message parameters',
          previousState: {
            messageKey: 'old key',
            messageParameters: { some: 'old parameters' },
            translatedMessage: 'old translation'
          },
          actionParameters: { messageKey: 'new key', messageParameters: { some: 'new parameters' } },
          expectedNextState: { messageKey: 'new key', messageParameters: { some: 'new parameters' }, translatedMessage: '' }
        },
        {
          it: 'with previous state and no message parameters, returns new state with message key',
          previousState: {
            messageKey: 'old key',
            messageParameters: { some: 'old parameters' },
            translatedMessage: 'old translation'
          },
          actionParameters: { messageKey: 'new key' },
          expectedNextState: { messageKey: 'new key', messageParameters: undefined, translatedMessage: '' }
        },
        {
          it: 'without previous state and with message parameters, returns new state with message key and message parameters',
          actionParameters: { messageKey: 'new key', messageParameters: { some: 'new parameters' } },
          expectedNextState: { messageKey: 'new key', messageParameters: { some: 'new parameters' }, translatedMessage: '' }
        },
        {
          it: 'without previous state or message parameters, returns new state with message key',
          actionParameters: { messageKey: 'new key' },
          expectedNextState: { messageKey: 'new key', messageParameters: undefined, translatedMessage: '' }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'DisplaySuccess',
      customTests: [
        {
          it: 'with previous state, returns previous state with translated message',
          previousState: {
            messageKey: 'old key',
            messageParameters: { some: 'old parameters' },
            translatedMessage: 'old translation'
          },
          actionParameters: { translatedMessage: 'new translation' },
          expectedNextState: {
            messageKey: 'old key',
            messageParameters: { some: 'old parameters' },
            translatedMessage: 'new translation'
          }
        },
        {
          it: 'without previous state, returns initial state with translated message',
          actionParameters: { translatedMessage: 'new translation' },
          expectedNextState: { messageKey: '', messageParameters: {}, translatedMessage: 'new translation' }
        }
      ]
    });
  });
}
