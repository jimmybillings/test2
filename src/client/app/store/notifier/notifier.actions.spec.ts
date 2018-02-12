import { ActionFactory, InternalActionFactory, defaultOnCloseFunction } from './notifier.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  describe('Notifier Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();
    const onCloseFunction = jasmine.createSpy('onCloseFunction');
    const emptyFunction = () => { };

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: ActionFactory,
        name: 'notify',
        parameters: [{ title: 'title', message: 'message', prompt: 'prompt' }, onCloseFunction]
      },
      expectedAction: {
        type: '[Notifier] Notify',
        options: { title: 'title', message: 'message', prompt: 'prompt' },
        onClose: onCloseFunction
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'has a default prompt',
      factoryMethod: {
        class: ActionFactory,
        name: 'notify',
        parameters: [{ title: 'title', message: 'message' }, onCloseFunction]
      },
      expectedAction: {
        type: '[Notifier] Notify',
        options: { title: 'title', message: 'message', prompt: 'NOTIFICATION.CLOSE' },
        onClose: onCloseFunction
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'has no default title or message',
      factoryMethod: {
        class: ActionFactory,
        name: 'notify',
        parameters: [{}, onCloseFunction]
      },
      expectedAction: {
        type: '[Notifier] Notify',
        options: { prompt: 'NOTIFICATION.CLOSE' },
        onClose: onCloseFunction
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'has a default onClose function',
      factoryMethod: {
        class: ActionFactory,
        name: 'notify',
        parameters: [{ title: 'title', message: 'message', prompt: 'prompt' }]
      },
      expectedAction: {
        type: '[Notifier] Notify',
        options: { title: 'title', message: 'message', prompt: 'prompt' },
        onClose: defaultOnCloseFunction
      }
    });

    it('has a callable default onClose function (worthless test other than coverage)', () => {
      defaultOnCloseFunction();
    });
  });
}
