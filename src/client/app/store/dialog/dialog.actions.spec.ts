import { ActionFactory, InternalActionFactory } from './dialog.actions';
import { ActionsSpecHelper } from '../spec-helpers/actions.spec-helper';

export function main() {
  const onAcceptFn: Function = () => { };
  const onDeclineFn: Function = () => { };

  describe('Dialog Action Factory', () => {
    let actionsSpecHelper: ActionsSpecHelper = new ActionsSpecHelper();

    actionsSpecHelper.generateTestFor({
      comment: 'Without an onDecline callback',
      factoryMethod: {
        class: ActionFactory,
        name: 'showConfirmation',
        parameters: [{ some: 'title' }, onAcceptFn]
      },
      expectedAction: {
        type: '[Dialog] Show Confirmation',
        confirmationDialogOptions: { some: 'title' },
        onAccept: onAcceptFn,
        onDecline: jasmine.any(Function)
      }
    });

    actionsSpecHelper.generateTestFor({
      comment: 'With an onDecline callback',
      factoryMethod: {
        class: ActionFactory,
        name: 'showConfirmation',
        parameters: [{ some: 'title' }, onAcceptFn, onDeclineFn]
      },
      expectedAction: {
        type: '[Dialog] Show Confirmation',
        confirmationDialogOptions: { some: 'title' },
        onAccept: onAcceptFn,
        onDecline: onDeclineFn
      }
    });

    actionsSpecHelper.generateTestFor({
      factoryMethod: {
        class: InternalActionFactory,
        name: 'showConfirmationSuccess',
        parameters: []
      },
      expectedAction: {
        type: '[Dialog] Show Confirmation Success'
      }
    });
  });
}
