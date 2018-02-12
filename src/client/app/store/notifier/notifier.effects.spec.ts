import { Subject } from 'rxjs/Subject';

import { NotifierEffects } from './notifier.effects';
import * as NotifierActions from './notifier.actions';
import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Notification Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): any {
      return new NotifierEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockService);
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'notify',
      effectsInstantiator: instantiator,
      inputAction: {
        type: NotifierActions.Notify.Type,
        options: { some: 'options' },
        onClose: () => { }
      },
      serviceMethod: {
        name: 'openNotificationDialog',
        callsApiService: false,
        expectedArguments: [{ some: 'options' }],
        returnsObservableOf: null
      }
    });

    describe('notify (onClose method)', () => {
      let onCloseFunction: jasmine.Spy;
      let inputAction: any;
      let onCloseSubject: Subject<null>;

      beforeEach(() => {
        onCloseSubject = new Subject<null>();

        effectsSpecHelper.initializeMocks();
        effectsSpecHelper.subscribeTo(instantiator, 'notify');
        effectsSpecHelper.createMockServiceMethod('openNotificationDialog', () => onCloseSubject);
        onCloseFunction = jasmine.createSpy('onClose');
        inputAction = { type: NotifierActions.Notify.Type, options: 'some options', onClose: onCloseFunction };
      });

      afterEach(() => {
        effectsSpecHelper.effectSubscription.unsubscribe();
      });

      it('doesn\'t call the onClose method before the dialog is closed', () => {
        effectsSpecHelper.simulateInputAction(inputAction);

        expect(onCloseFunction).not.toHaveBeenCalled();
      });

      it('calls the onClose method after the dialog is closed', () => {
        effectsSpecHelper.simulateInputAction(inputAction);

        onCloseSubject.next();

        expect(onCloseFunction).toHaveBeenCalled();
      });
    });
  });
}
