import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { MockAppStore } from './mock-app.store';
import { Common } from '../../shared/utilities/common.functions';
import { Pojo } from '../../shared/interfaces/common.interface';
import { Any } from '../speed-preview/speed-preview.actions';

export interface ParameterizedAction extends Action {
  [parameterName: string]: any;
}

export interface EffectTestState {
  storeSectionName: string;
  propertyName?: string;
  value: any;
}

export interface EffectServiceMethod {
  name: string;
  callsApiService?: boolean; // default = true
  expectedArguments?: any[];
  returnsObservableOf?: any;
  expectToHaveBeenCalled?: boolean;
}

export interface HelperServiceMethod {
  name: string;
  expectedArguments?: any[];
  returns: any;
}

export interface SuccessActionFactory {
  sectionName: string;
  methodName: string;
  expectedArguments: any[];
}

export interface FailureActionFactory {
  sectionName: string;
  methodName: string;
  expectedArgument?: any;
}

export interface OutputActionFactories {
  success: SuccessActionFactory | SuccessActionFactory[];
  failure?: FailureActionFactory;
}

export interface CustomTest {
  it: string;
  stateOverrider?: (originalState: EffectTestState | EffectTestState[]) => EffectTestState | EffectTestState[];
  serviceMethodOverrider?: (originalServiceMethod: EffectServiceMethod) => EffectServiceMethod;
  helperServiceMethodsOverrider?: (originalHelperServiceMethods: HelperServiceMethod[]) => HelperServiceMethod[];
  beforeInstantiation?: () => void;
  expectation: () => void;
}

export interface EffectTestParameters {
  fdescribe?: boolean;
  effectName: string;
  comment?: string;
  effectsInstantiator: () => any;
  inputAction: ParameterizedAction;
  state?: EffectTestState | EffectTestState[];
  serviceMethod?: EffectServiceMethod;
  helperServiceMethods?: HelperServiceMethod[];
  outputActionFactories?: OutputActionFactories;
  expectToEmitAction?: boolean;
  customTests?: CustomTest[];

}

export class EffectsSpecHelper {
  public mockStore: MockAppStore;
  public mockNgrxEffectsActions: any;
  public mockService: any;

  public effect: any;
  public effectSubscription: Subscription;
  public effectSubscriptionCallback: jasmine.Spy;
  public successActionFactoryMethods: jasmine.Spy[];
  public failureActionFactoryMethod: jasmine.Spy;

  private mockNgrxEffectsActionSubject: Subject<ParameterizedAction>;

  public generateTestsFor(parameters: EffectTestParameters): void {
    const description = `${parameters.effectName}${parameters.comment ? ` (${parameters.comment})` : ''}`;
    const describeOrFdescribe = (parameters.fdescribe !== true ? describe : fdescribe);

    describeOrFdescribe(description, () => {
      describe('standard effect tests', () => {
        beforeEach(() => {
          this.setupMocksFor(parameters);
        });

        afterEach(() => {
          if (this.effectSubscription) this.effectSubscription.unsubscribe();
        });

        if (parameters.serviceMethod) {
          if (parameters.serviceMethod.expectToHaveBeenCalled !== false) {
            it('calls the expected service method with the expected arguments', () => {
              this.simulateInputAction(parameters.inputAction);

              expect(this.mockService[parameters.serviceMethod.name])
                .toHaveBeenCalledWith(...parameters.serviceMethod.expectedArguments);
            });
          } else {
            it('doesn\'t call the service method', () => {
              this.simulateInputAction(parameters.inputAction);

              expect(this.mockService[parameters.serviceMethod.name]).not.toHaveBeenCalled();
            });
          }
        }

        if (parameters.helperServiceMethods) {
          parameters.helperServiceMethods.forEach(method => {
            if (method.expectedArguments) {
              it(`calls the ${method.name}() service method with the expected arguments`, () => {
                this.simulateInputAction(parameters.inputAction);

                expect(this.mockService[method.name]).toHaveBeenCalledWith(...method.expectedArguments);
              });
            }
          });
        }

        if (parameters.expectToEmitAction === false) {
          it('does not emit an action', () => {
            this.simulateInputAction(parameters.inputAction);

            expect(this.effectSubscriptionCallback).not.toHaveBeenCalled();
          });
        } else if (parameters.outputActionFactories) {

          describe('for success', () => {
            it(`calls the expected action factory method(s) with the expected arguments`, () => {
              this.simulateInputAction(parameters.inputAction);

              const factories = parameters.outputActionFactories;

              (Array.isArray(factories.success) ? factories.success : [factories.success])
                .forEach((successFactory, index) =>
                  expect(this.successActionFactoryMethods[index]).toHaveBeenCalledWith(...successFactory.expectedArguments)
                );
            });

            it('emits the expected action', () => {
              this.simulateInputAction(parameters.inputAction);

              this.successActionFactoryMethods.forEach(method =>
                expect(this.effectSubscriptionCallback).toHaveBeenCalledWith(this.mockStore.getActionCreatedBy(method))
              );
            });
          });

          if (parameters.serviceMethod && parameters.serviceMethod.callsApiService !== false) {
            describe('for failure', () => {
              let expectedArgument: Pojo;
              beforeEach(() => {
                expectedArgument = (
                  parameters.outputActionFactories &&
                  parameters.outputActionFactories.failure &&
                  parameters.outputActionFactories.failure.hasOwnProperty('expectedArgument')) ?
                  parameters.outputActionFactories.failure.expectedArgument : { some: 'error' };
                this.createMockServiceMethod(parameters.serviceMethod.name, () => Observable.throw(expectedArgument));
              });

              it('calls the expected action factory method with the expected arguments', () => {
                this.simulateInputAction(parameters.inputAction);
                if (expectedArgument === null) {
                  expect(this.failureActionFactoryMethod)
                    .toHaveBeenCalledWith();
                } else {
                  expect(this.failureActionFactoryMethod)
                    .toHaveBeenCalledWith(expectedArgument);
                }
              });

              it('emits the expected action', () => {
                this.simulateInputAction(parameters.inputAction);
                expect(this.effectSubscriptionCallback)
                  .toHaveBeenCalledWith(this.mockStore.getActionCreatedBy(this.failureActionFactoryMethod));
              });
            });
          }
        } else {
          // TODO: Properly interpret @Effect({dispatch: false}).
          it('emits the expected action', () => {
            this.simulateInputAction(parameters.inputAction);

            expect(this.effectSubscriptionCallback).toHaveBeenCalledWith(parameters.inputAction);
          });
        }
      });

      if (parameters.customTests) {
        describe('custom tests', () => {
          parameters.customTests.forEach((customTest: CustomTest) => {
            it(customTest.it, () => {
              if (customTest.beforeInstantiation) customTest.beforeInstantiation();
              this.setupCustomMocksFor(customTest, parameters);

              this.simulateInputAction(parameters.inputAction);

              customTest.expectation();
            });
          });
        });
      }
    });
  }

  public initializeMocks(): void {
    this.mockStore = new MockAppStore();
    this.mockNgrxEffectsActionSubject = new Subject<ParameterizedAction>();
    this.mockNgrxEffectsActions = {
      ofType: (...types: string[]): Observable<Action> =>
        this.mockNgrxEffectsActionSubject.filter(action => types.some(type => type === action.type)),
      filter: (filterFunction: () => boolean): Observable<Action> =>
        this.mockNgrxEffectsActionSubject.filter(filterFunction)
    };
    this.mockService = {};
    this.effectSubscriptionCallback = jasmine.createSpy('effect subscription callback');
  }

  public subscribeTo(effectsInstantiator: Function, effectName: string): void {
    this.effect = effectsInstantiator()[effectName];
    this.effectSubscription = this.effect.subscribe(this.effectSubscriptionCallback);
  }

  public createMockServiceMethod(methodName: string, fakeImplementation: Function): void {
    this.mockService[methodName] = jasmine.createSpy(`'${methodName} service method'`).and.callFake(fakeImplementation);
  }

  public simulateInputAction(inputAction: ParameterizedAction): void {
    this.mockNgrxEffectsActionSubject.next(inputAction);
  }

  private setupMocksFor(activeParameters: EffectTestParameters, originalParameters: EffectTestParameters = activeParameters) {
    this.initializeMocks();

    if (activeParameters.state) {
      this.createMockStateInfoFrom(activeParameters.state);
    }

    if (activeParameters.serviceMethod) {
      this.createMockServiceMethod(
        activeParameters.serviceMethod.name, () => Observable.of(activeParameters.serviceMethod.returnsObservableOf)
      );
    }

    if (activeParameters.helperServiceMethods) {
      activeParameters.helperServiceMethods.forEach(method => {
        this.createMockServiceMethod(method.name, () => method.returns);
      });
    }

    if (activeParameters.outputActionFactories) {
      const factories = activeParameters.outputActionFactories;
      const successFactories = Array.isArray(factories.success) ? factories.success : [factories.success];
      const failureFactory = factories.failure;
      const successFactoryExpectsAnError = successFactories.some(factory =>
        factory.sectionName === 'error' && factory.methodName === 'handle');

      this.successActionFactoryMethods =
        successFactories.map(successFactory =>
          this.mockStore.createInternalActionFactoryMethod(successFactory.sectionName, successFactory.methodName)
        );

      if (!successFactoryExpectsAnError) {
        this.failureActionFactoryMethod = this.mockStore.createInternalActionFactoryMethod(
          failureFactory ? failureFactory.sectionName : 'error',
          failureFactory ? failureFactory.methodName : 'handle'
        );
      }
    }

    this.subscribeTo(originalParameters.effectsInstantiator, originalParameters.effectName);
    expect(this.effectSubscriptionCallback).not.toHaveBeenCalled();  // Not yet, anyway!
  }

  private setupCustomMocksFor(customTest: CustomTest, originalParameters: EffectTestParameters): void {
    let overriddenParameters = Common.clone(originalParameters);

    if (customTest.stateOverrider) {
      overriddenParameters = {
        ...overriddenParameters,
        state: customTest.stateOverrider(originalParameters.state)
      };
    }

    if (customTest.serviceMethodOverrider) {
      overriddenParameters = {
        ...overriddenParameters,
        serviceMethod: customTest.serviceMethodOverrider(originalParameters.serviceMethod)
      };
    }

    if (customTest.helperServiceMethodsOverrider) {
      overriddenParameters = {
        ...overriddenParameters,
        helperServiceMethods: customTest.helperServiceMethodsOverrider(originalParameters.helperServiceMethods)
      };
    }

    this.setupMocksFor(overriddenParameters, originalParameters);
  }


  private createMockStateInfoFrom(oneOrMoreStateParameters: EffectTestState | EffectTestState[]) {
    (Array.isArray(oneOrMoreStateParameters) ? oneOrMoreStateParameters : [oneOrMoreStateParameters])
      .forEach(stateParameter => {
        if (stateParameter.propertyName) {
          this.mockStore.createStateElement(stateParameter.storeSectionName, stateParameter.propertyName, stateParameter.value);
        } else {
          this.mockStore.createStateSection(stateParameter.storeSectionName, stateParameter.value);
        }
      });
  }
}
