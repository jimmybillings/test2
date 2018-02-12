"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var mock_app_store_1 = require("./mock-app.store");
var common_functions_1 = require("../../shared/utilities/common.functions");
var EffectsSpecHelper = (function () {
    function EffectsSpecHelper() {
    }
    EffectsSpecHelper.prototype.generateTestsFor = function (parameters) {
        var _this = this;
        var description = "" + parameters.effectName + (parameters.comment ? " (" + parameters.comment + ")" : '');
        var describeOrFdescribe = (parameters.fdescribe !== true ? describe : fdescribe);
        describeOrFdescribe(description, function () {
            describe('standard effect tests', function () {
                beforeEach(function () {
                    _this.setupMocksFor(parameters);
                });
                afterEach(function () {
                    if (_this.effectSubscription)
                        _this.effectSubscription.unsubscribe();
                });
                if (parameters.serviceMethod) {
                    if (parameters.serviceMethod.expectToHaveBeenCalled !== false) {
                        it('calls the expected service method with the expected arguments', function () {
                            _this.simulateInputAction(parameters.inputAction);
                            (_a = expect(_this.mockService[parameters.serviceMethod.name])).toHaveBeenCalledWith.apply(_a, parameters.serviceMethod.expectedArguments);
                            var _a;
                        });
                    }
                    else {
                        it('doesn\'t call the service method', function () {
                            _this.simulateInputAction(parameters.inputAction);
                            expect(_this.mockService[parameters.serviceMethod.name]).not.toHaveBeenCalled();
                        });
                    }
                }
                if (parameters.helperServiceMethods) {
                    parameters.helperServiceMethods.forEach(function (method) {
                        if (method.expectedArguments) {
                            it("calls the " + method.name + "() service method with the expected arguments", function () {
                                _this.simulateInputAction(parameters.inputAction);
                                (_a = expect(_this.mockService[method.name])).toHaveBeenCalledWith.apply(_a, method.expectedArguments);
                                var _a;
                            });
                        }
                    });
                }
                if (parameters.expectToEmitAction === false) {
                    it('does not emit an action', function () {
                        _this.simulateInputAction(parameters.inputAction);
                        expect(_this.effectSubscriptionCallback).not.toHaveBeenCalled();
                    });
                }
                else if (parameters.outputActionFactories) {
                    describe('for success', function () {
                        it("calls the expected action factory method(s) with the expected arguments", function () {
                            _this.simulateInputAction(parameters.inputAction);
                            var factories = parameters.outputActionFactories;
                            (Array.isArray(factories.success) ? factories.success : [factories.success])
                                .forEach(function (successFactory, index) {
                                return (_a = expect(_this.successActionFactoryMethods[index])).toHaveBeenCalledWith.apply(_a, successFactory.expectedArguments);
                                var _a;
                            });
                        });
                        it('emits the expected action', function () {
                            _this.simulateInputAction(parameters.inputAction);
                            _this.successActionFactoryMethods.forEach(function (method) {
                                return expect(_this.effectSubscriptionCallback).toHaveBeenCalledWith(_this.mockStore.getActionCreatedBy(method));
                            });
                        });
                    });
                    if (parameters.serviceMethod && parameters.serviceMethod.callsApiService !== false) {
                        describe('for failure', function () {
                            var expectedArgument;
                            beforeEach(function () {
                                expectedArgument = (parameters.outputActionFactories &&
                                    parameters.outputActionFactories.failure &&
                                    parameters.outputActionFactories.failure.hasOwnProperty('expectedArgument')) ?
                                    parameters.outputActionFactories.failure.expectedArgument : { some: 'error' };
                                _this.createMockServiceMethod(parameters.serviceMethod.name, function () { return Observable_1.Observable.throw(expectedArgument); });
                            });
                            it('calls the expected action factory method with the expected arguments', function () {
                                _this.simulateInputAction(parameters.inputAction);
                                if (expectedArgument === null) {
                                    expect(_this.failureActionFactoryMethod)
                                        .toHaveBeenCalledWith();
                                }
                                else {
                                    expect(_this.failureActionFactoryMethod)
                                        .toHaveBeenCalledWith(expectedArgument);
                                }
                            });
                            it('emits the expected action', function () {
                                _this.simulateInputAction(parameters.inputAction);
                                expect(_this.effectSubscriptionCallback)
                                    .toHaveBeenCalledWith(_this.mockStore.getActionCreatedBy(_this.failureActionFactoryMethod));
                            });
                        });
                    }
                }
                else {
                    it('emits the expected action', function () {
                        _this.simulateInputAction(parameters.inputAction);
                        expect(_this.effectSubscriptionCallback).toHaveBeenCalledWith(parameters.inputAction);
                    });
                }
            });
            if (parameters.customTests) {
                describe('custom tests', function () {
                    parameters.customTests.forEach(function (customTest) {
                        it(customTest.it, function () {
                            if (customTest.beforeInstantiation)
                                customTest.beforeInstantiation();
                            _this.setupCustomMocksFor(customTest, parameters);
                            _this.simulateInputAction(parameters.inputAction);
                            customTest.expectation();
                        });
                    });
                });
            }
        });
    };
    EffectsSpecHelper.prototype.initializeMocks = function () {
        var _this = this;
        this.mockStore = new mock_app_store_1.MockAppStore();
        this.mockNgrxEffectsActionSubject = new Subject_1.Subject();
        this.mockNgrxEffectsActions = {
            ofType: function () {
                var types = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    types[_i] = arguments[_i];
                }
                return _this.mockNgrxEffectsActionSubject.filter(function (action) { return types.some(function (type) { return type === action.type; }); });
            },
            filter: function (filterFunction) {
                return _this.mockNgrxEffectsActionSubject.filter(filterFunction);
            }
        };
        this.mockService = {};
        this.effectSubscriptionCallback = jasmine.createSpy('effect subscription callback');
    };
    EffectsSpecHelper.prototype.subscribeTo = function (effectsInstantiator, effectName) {
        this.effect = effectsInstantiator()[effectName];
        this.effectSubscription = this.effect.subscribe(this.effectSubscriptionCallback);
    };
    EffectsSpecHelper.prototype.createMockServiceMethod = function (methodName, fakeImplementation) {
        this.mockService[methodName] = jasmine.createSpy("'" + methodName + " service method'").and.callFake(fakeImplementation);
    };
    EffectsSpecHelper.prototype.simulateInputAction = function (inputAction) {
        this.mockNgrxEffectsActionSubject.next(inputAction);
    };
    EffectsSpecHelper.prototype.setupMocksFor = function (activeParameters, originalParameters) {
        var _this = this;
        if (originalParameters === void 0) { originalParameters = activeParameters; }
        this.initializeMocks();
        if (activeParameters.state) {
            this.createMockStateInfoFrom(activeParameters.state);
        }
        if (activeParameters.serviceMethod) {
            this.createMockServiceMethod(activeParameters.serviceMethod.name, function () { return Observable_1.Observable.of(activeParameters.serviceMethod.returnsObservableOf); });
        }
        if (activeParameters.helperServiceMethods) {
            activeParameters.helperServiceMethods.forEach(function (method) {
                _this.createMockServiceMethod(method.name, function () { return method.returns; });
            });
        }
        if (activeParameters.outputActionFactories) {
            var factories = activeParameters.outputActionFactories;
            var successFactories = Array.isArray(factories.success) ? factories.success : [factories.success];
            var failureFactory = factories.failure;
            var successFactoryExpectsAnError = successFactories.some(function (factory) {
                return factory.sectionName === 'error' && factory.methodName === 'handle';
            });
            this.successActionFactoryMethods =
                successFactories.map(function (successFactory) {
                    return _this.mockStore.createInternalActionFactoryMethod(successFactory.sectionName, successFactory.methodName);
                });
            if (!successFactoryExpectsAnError) {
                this.failureActionFactoryMethod = this.mockStore.createInternalActionFactoryMethod(failureFactory ? failureFactory.sectionName : 'error', failureFactory ? failureFactory.methodName : 'handle');
            }
        }
        this.subscribeTo(originalParameters.effectsInstantiator, originalParameters.effectName);
        expect(this.effectSubscriptionCallback).not.toHaveBeenCalled();
    };
    EffectsSpecHelper.prototype.setupCustomMocksFor = function (customTest, originalParameters) {
        var overriddenParameters = common_functions_1.Common.clone(originalParameters);
        if (customTest.stateOverrider) {
            overriddenParameters = __assign({}, overriddenParameters, { state: customTest.stateOverrider(originalParameters.state) });
        }
        if (customTest.serviceMethodOverrider) {
            overriddenParameters = __assign({}, overriddenParameters, { serviceMethod: customTest.serviceMethodOverrider(originalParameters.serviceMethod) });
        }
        if (customTest.helperServiceMethodsOverrider) {
            overriddenParameters = __assign({}, overriddenParameters, { helperServiceMethods: customTest.helperServiceMethodsOverrider(originalParameters.helperServiceMethods) });
        }
        this.setupMocksFor(overriddenParameters, originalParameters);
    };
    EffectsSpecHelper.prototype.createMockStateInfoFrom = function (oneOrMoreStateParameters) {
        var _this = this;
        (Array.isArray(oneOrMoreStateParameters) ? oneOrMoreStateParameters : [oneOrMoreStateParameters])
            .forEach(function (stateParameter) {
            if (stateParameter.propertyName) {
                _this.mockStore.createStateElement(stateParameter.storeSectionName, stateParameter.propertyName, stateParameter.value);
            }
            else {
                _this.mockStore.createStateSection(stateParameter.storeSectionName, stateParameter.value);
            }
        });
    };
    return EffectsSpecHelper;
}());
exports.EffectsSpecHelper = EffectsSpecHelper;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsOENBQTZDO0FBQzdDLHdDQUF1QztBQUd2QyxtREFBZ0Q7QUFDaEQsNEVBQWlFO0FBcUVqRTtJQUFBO0lBeVBBLENBQUM7SUE1T1EsNENBQWdCLEdBQXZCLFVBQXdCLFVBQWdDO1FBQXhELGlCQStIQztRQTlIQyxJQUFNLFdBQVcsR0FBRyxLQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBSyxVQUFVLENBQUMsT0FBTyxNQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxDQUFDO1FBQ3RHLElBQU0sbUJBQW1CLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRixtQkFBbUIsQ0FBQyxXQUFXLEVBQUU7WUFDL0IsUUFBUSxDQUFDLHVCQUF1QixFQUFFO2dCQUNoQyxVQUFVLENBQUM7b0JBQ1QsS0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsU0FBUyxDQUFDO29CQUNSLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQzt3QkFBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUM3QixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLHNCQUFzQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzlELEVBQUUsQ0FBQywrREFBK0QsRUFBRTs0QkFDbEUsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFFakQsQ0FBQSxLQUFBLE1BQU0sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUNwRCxvQkFBb0IsV0FBSSxVQUFVLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFOzt3QkFDekUsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixFQUFFLENBQUMsa0NBQWtDLEVBQUU7NEJBQ3JDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBRWpELE1BQU0sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDakYsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztnQkFDSCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO3dCQUM1QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzRCQUM3QixFQUFFLENBQUMsZUFBYSxNQUFNLENBQUMsSUFBSSxrREFBK0MsRUFBRTtnQ0FDMUUsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FFakQsQ0FBQSxLQUFBLE1BQU0sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUMsb0JBQW9CLFdBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFOzs0QkFDMUYsQ0FBQyxDQUFDLENBQUM7d0JBQ0wsQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxFQUFFLENBQUMseUJBQXlCLEVBQUU7d0JBQzVCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBRWpELE1BQU0sQ0FBQyxLQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDakUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztvQkFFNUMsUUFBUSxDQUFDLGFBQWEsRUFBRTt3QkFDdEIsRUFBRSxDQUFDLHlFQUF5RSxFQUFFOzRCQUM1RSxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUVqRCxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMscUJBQXFCLENBQUM7NEJBRW5ELENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lDQUN6RSxPQUFPLENBQUMsVUFBQyxjQUFjLEVBQUUsS0FBSztnQ0FDN0IsT0FBQSxDQUFBLEtBQUEsTUFBTSxDQUFDLEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUMsb0JBQW9CLFdBQUksY0FBYyxDQUFDLGlCQUFpQjs7NEJBQXhHLENBQXlHLENBQzFHLENBQUM7d0JBQ04sQ0FBQyxDQUFDLENBQUM7d0JBRUgsRUFBRSxDQUFDLDJCQUEyQixFQUFFOzRCQUM5QixLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUVqRCxLQUFJLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtnQ0FDN0MsT0FBQSxNQUFNLENBQUMsS0FBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsb0JBQW9CLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFBdkcsQ0FBdUcsQ0FDeEcsQ0FBQzt3QkFDSixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsZUFBZSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ25GLFFBQVEsQ0FBQyxhQUFhLEVBQUU7NEJBQ3RCLElBQUksZ0JBQXNCLENBQUM7NEJBQzNCLFVBQVUsQ0FBQztnQ0FDVCxnQkFBZ0IsR0FBRyxDQUNqQixVQUFVLENBQUMscUJBQXFCO29DQUNoQyxVQUFVLENBQUMscUJBQXFCLENBQUMsT0FBTztvQ0FDeEMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQzlFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2dDQUNoRixLQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLHVCQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQzs0QkFDeEcsQ0FBQyxDQUFDLENBQUM7NEJBRUgsRUFBRSxDQUFDLHNFQUFzRSxFQUFFO2dDQUN6RSxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUNqRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29DQUM5QixNQUFNLENBQUMsS0FBSSxDQUFDLDBCQUEwQixDQUFDO3lDQUNwQyxvQkFBb0IsRUFBRSxDQUFDO2dDQUM1QixDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNOLE1BQU0sQ0FBQyxLQUFJLENBQUMsMEJBQTBCLENBQUM7eUNBQ3BDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0NBQzVDLENBQUM7NEJBQ0gsQ0FBQyxDQUFDLENBQUM7NEJBRUgsRUFBRSxDQUFDLDJCQUEyQixFQUFFO2dDQUM5QixLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUNqRCxNQUFNLENBQUMsS0FBSSxDQUFDLDBCQUEwQixDQUFDO3FDQUNwQyxvQkFBb0IsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEtBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7NEJBQzlGLENBQUMsQ0FBQyxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0gsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFTixFQUFFLENBQUMsMkJBQTJCLEVBQUU7d0JBQzlCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBRWpELE1BQU0sQ0FBQyxLQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3ZGLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixRQUFRLENBQUMsY0FBYyxFQUFFO29CQUN2QixVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQXNCO3dCQUNwRCxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRTs0QkFDaEIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDO2dDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDOzRCQUNyRSxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUVqRCxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUVqRCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzNCLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDJDQUFlLEdBQXRCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLGlCQUFPLEVBQXVCLENBQUM7UUFDdkUsSUFBSSxDQUFDLHNCQUFzQixHQUFHO1lBQzVCLE1BQU0sRUFBRTtnQkFBQyxlQUFrQjtxQkFBbEIsVUFBa0IsRUFBbEIscUJBQWtCLEVBQWxCLElBQWtCO29CQUFsQiwwQkFBa0I7O2dCQUN6QixPQUFBLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQXBCLENBQW9CLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQztZQUE1RixDQUE0RjtZQUM5RixNQUFNLEVBQUUsVUFBQyxjQUE2QjtnQkFDcEMsT0FBQSxLQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUF4RCxDQUF3RDtTQUMzRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLDBCQUEwQixHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsbUJBQTZCLEVBQUUsVUFBa0I7UUFDbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRU0sbURBQXVCLEdBQTlCLFVBQStCLFVBQWtCLEVBQUUsa0JBQTRCO1FBQzdFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFJLFVBQVUscUJBQWtCLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEgsQ0FBQztJQUVNLCtDQUFtQixHQUExQixVQUEyQixXQUFnQztRQUN6RCxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTyx5Q0FBYSxHQUFyQixVQUFzQixnQkFBc0MsRUFBRSxrQkFBMkQ7UUFBekgsaUJBeUNDO1FBekM2RCxtQ0FBQSxFQUFBLHFDQUEyRDtRQUN2SCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLHVCQUF1QixDQUMxQixnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsRUFBakUsQ0FBaUUsQ0FDN0csQ0FBQztRQUNKLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDMUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtnQkFDbEQsS0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLE1BQU0sQ0FBQyxPQUFPLEVBQWQsQ0FBYyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQU0sU0FBUyxHQUFHLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO1lBQ3pELElBQU0sZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BHLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDekMsSUFBTSw0QkFBNEIsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO2dCQUNoRSxPQUFBLE9BQU8sQ0FBQyxXQUFXLEtBQUssT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssUUFBUTtZQUFsRSxDQUFrRSxDQUFDLENBQUM7WUFFdEUsSUFBSSxDQUFDLDJCQUEyQjtnQkFDOUIsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFVBQUEsY0FBYztvQkFDakMsT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLGlDQUFpQyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQztnQkFBdkcsQ0FBdUcsQ0FDeEcsQ0FBQztZQUVKLEVBQUUsQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FDaEYsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQ3JELGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUN0RCxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hGLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNqRSxDQUFDO0lBRU8sK0NBQW1CLEdBQTNCLFVBQTRCLFVBQXNCLEVBQUUsa0JBQXdDO1FBQzFGLElBQUksb0JBQW9CLEdBQUcseUJBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUU1RCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM5QixvQkFBb0IsZ0JBQ2Ysb0JBQW9CLElBQ3ZCLEtBQUssRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUMzRCxDQUFDO1FBQ0osQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDdEMsb0JBQW9CLGdCQUNmLG9CQUFvQixJQUN2QixhQUFhLEVBQUUsVUFBVSxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxHQUNuRixDQUFDO1FBQ0osQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUM7WUFDN0Msb0JBQW9CLGdCQUNmLG9CQUFvQixJQUN2QixvQkFBb0IsRUFBRSxVQUFVLENBQUMsNkJBQTZCLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsR0FDeEcsQ0FBQztRQUNKLENBQUM7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUdPLG1EQUF1QixHQUEvQixVQUFnQyx3QkFBNkQ7UUFBN0YsaUJBU0M7UUFSQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUM5RixPQUFPLENBQUMsVUFBQSxjQUFjO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4SCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNGLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDSCx3QkFBQztBQUFELENBelBBLEFBeVBDLElBQUE7QUF6UFksOENBQWlCIiwiZmlsZSI6ImFwcC9zdG9yZS9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4vbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IFBvam8gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEFueSB9IGZyb20gJy4uL3NwZWVkLXByZXZpZXcvc3BlZWQtcHJldmlldy5hY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBQYXJhbWV0ZXJpemVkQWN0aW9uIGV4dGVuZHMgQWN0aW9uIHtcbiAgW3BhcmFtZXRlck5hbWU6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFZmZlY3RUZXN0U3RhdGUge1xuICBzdG9yZVNlY3Rpb25OYW1lOiBzdHJpbmc7XG4gIHByb3BlcnR5TmFtZT86IHN0cmluZztcbiAgdmFsdWU6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFZmZlY3RTZXJ2aWNlTWV0aG9kIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjYWxsc0FwaVNlcnZpY2U/OiBib29sZWFuOyAvLyBkZWZhdWx0ID0gdHJ1ZVxuICBleHBlY3RlZEFyZ3VtZW50cz86IGFueVtdO1xuICByZXR1cm5zT2JzZXJ2YWJsZU9mPzogYW55O1xuICBleHBlY3RUb0hhdmVCZWVuQ2FsbGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIZWxwZXJTZXJ2aWNlTWV0aG9kIHtcbiAgbmFtZTogc3RyaW5nO1xuICBleHBlY3RlZEFyZ3VtZW50cz86IGFueVtdO1xuICByZXR1cm5zOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VjY2Vzc0FjdGlvbkZhY3Rvcnkge1xuICBzZWN0aW9uTmFtZTogc3RyaW5nO1xuICBtZXRob2ROYW1lOiBzdHJpbmc7XG4gIGV4cGVjdGVkQXJndW1lbnRzOiBhbnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWlsdXJlQWN0aW9uRmFjdG9yeSB7XG4gIHNlY3Rpb25OYW1lOiBzdHJpbmc7XG4gIG1ldGhvZE5hbWU6IHN0cmluZztcbiAgZXhwZWN0ZWRBcmd1bWVudD86IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPdXRwdXRBY3Rpb25GYWN0b3JpZXMge1xuICBzdWNjZXNzOiBTdWNjZXNzQWN0aW9uRmFjdG9yeSB8IFN1Y2Nlc3NBY3Rpb25GYWN0b3J5W107XG4gIGZhaWx1cmU/OiBGYWlsdXJlQWN0aW9uRmFjdG9yeTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21UZXN0IHtcbiAgaXQ6IHN0cmluZztcbiAgc3RhdGVPdmVycmlkZXI/OiAob3JpZ2luYWxTdGF0ZTogRWZmZWN0VGVzdFN0YXRlIHwgRWZmZWN0VGVzdFN0YXRlW10pID0+IEVmZmVjdFRlc3RTdGF0ZSB8IEVmZmVjdFRlc3RTdGF0ZVtdO1xuICBzZXJ2aWNlTWV0aG9kT3ZlcnJpZGVyPzogKG9yaWdpbmFsU2VydmljZU1ldGhvZDogRWZmZWN0U2VydmljZU1ldGhvZCkgPT4gRWZmZWN0U2VydmljZU1ldGhvZDtcbiAgaGVscGVyU2VydmljZU1ldGhvZHNPdmVycmlkZXI/OiAob3JpZ2luYWxIZWxwZXJTZXJ2aWNlTWV0aG9kczogSGVscGVyU2VydmljZU1ldGhvZFtdKSA9PiBIZWxwZXJTZXJ2aWNlTWV0aG9kW107XG4gIGJlZm9yZUluc3RhbnRpYXRpb24/OiAoKSA9PiB2b2lkO1xuICBleHBlY3RhdGlvbjogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFZmZlY3RUZXN0UGFyYW1ldGVycyB7XG4gIGZkZXNjcmliZT86IGJvb2xlYW47XG4gIGVmZmVjdE5hbWU6IHN0cmluZztcbiAgY29tbWVudD86IHN0cmluZztcbiAgZWZmZWN0c0luc3RhbnRpYXRvcjogKCkgPT4gYW55O1xuICBpbnB1dEFjdGlvbjogUGFyYW1ldGVyaXplZEFjdGlvbjtcbiAgc3RhdGU/OiBFZmZlY3RUZXN0U3RhdGUgfCBFZmZlY3RUZXN0U3RhdGVbXTtcbiAgc2VydmljZU1ldGhvZD86IEVmZmVjdFNlcnZpY2VNZXRob2Q7XG4gIGhlbHBlclNlcnZpY2VNZXRob2RzPzogSGVscGVyU2VydmljZU1ldGhvZFtdO1xuICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM/OiBPdXRwdXRBY3Rpb25GYWN0b3JpZXM7XG4gIGV4cGVjdFRvRW1pdEFjdGlvbj86IGJvb2xlYW47XG4gIGN1c3RvbVRlc3RzPzogQ3VzdG9tVGVzdFtdO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBFZmZlY3RzU3BlY0hlbHBlciB7XG4gIHB1YmxpYyBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgcHVibGljIG1vY2tOZ3J4RWZmZWN0c0FjdGlvbnM6IGFueTtcbiAgcHVibGljIG1vY2tTZXJ2aWNlOiBhbnk7XG5cbiAgcHVibGljIGVmZmVjdDogYW55O1xuICBwdWJsaWMgZWZmZWN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBlZmZlY3RTdWJzY3JpcHRpb25DYWxsYmFjazogamFzbWluZS5TcHk7XG4gIHB1YmxpYyBzdWNjZXNzQWN0aW9uRmFjdG9yeU1ldGhvZHM6IGphc21pbmUuU3B5W107XG4gIHB1YmxpYyBmYWlsdXJlQWN0aW9uRmFjdG9yeU1ldGhvZDogamFzbWluZS5TcHk7XG5cbiAgcHJpdmF0ZSBtb2NrTmdyeEVmZmVjdHNBY3Rpb25TdWJqZWN0OiBTdWJqZWN0PFBhcmFtZXRlcml6ZWRBY3Rpb24+O1xuXG4gIHB1YmxpYyBnZW5lcmF0ZVRlc3RzRm9yKHBhcmFtZXRlcnM6IEVmZmVjdFRlc3RQYXJhbWV0ZXJzKTogdm9pZCB7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBgJHtwYXJhbWV0ZXJzLmVmZmVjdE5hbWV9JHtwYXJhbWV0ZXJzLmNvbW1lbnQgPyBgICgke3BhcmFtZXRlcnMuY29tbWVudH0pYCA6ICcnfWA7XG4gICAgY29uc3QgZGVzY3JpYmVPckZkZXNjcmliZSA9IChwYXJhbWV0ZXJzLmZkZXNjcmliZSAhPT0gdHJ1ZSA/IGRlc2NyaWJlIDogZmRlc2NyaWJlKTtcblxuICAgIGRlc2NyaWJlT3JGZGVzY3JpYmUoZGVzY3JpcHRpb24sICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdzdGFuZGFyZCBlZmZlY3QgdGVzdHMnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0dXBNb2Nrc0ZvcihwYXJhbWV0ZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5lZmZlY3RTdWJzY3JpcHRpb24pIHRoaXMuZWZmZWN0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwYXJhbWV0ZXJzLnNlcnZpY2VNZXRob2QpIHtcbiAgICAgICAgICBpZiAocGFyYW1ldGVycy5zZXJ2aWNlTWV0aG9kLmV4cGVjdFRvSGF2ZUJlZW5DYWxsZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpdCgnY2FsbHMgdGhlIGV4cGVjdGVkIHNlcnZpY2UgbWV0aG9kIHdpdGggdGhlIGV4cGVjdGVkIGFyZ3VtZW50cycsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zaW11bGF0ZUlucHV0QWN0aW9uKHBhcmFtZXRlcnMuaW5wdXRBY3Rpb24pO1xuXG4gICAgICAgICAgICAgIGV4cGVjdCh0aGlzLm1vY2tTZXJ2aWNlW3BhcmFtZXRlcnMuc2VydmljZU1ldGhvZC5uYW1lXSlcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoLi4ucGFyYW1ldGVycy5zZXJ2aWNlTWV0aG9kLmV4cGVjdGVkQXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdCgnZG9lc25cXCd0IGNhbGwgdGhlIHNlcnZpY2UgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNpbXVsYXRlSW5wdXRBY3Rpb24ocGFyYW1ldGVycy5pbnB1dEFjdGlvbik7XG5cbiAgICAgICAgICAgICAgZXhwZWN0KHRoaXMubW9ja1NlcnZpY2VbcGFyYW1ldGVycy5zZXJ2aWNlTWV0aG9kLm5hbWVdKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuaGVscGVyU2VydmljZU1ldGhvZHMpIHtcbiAgICAgICAgICBwYXJhbWV0ZXJzLmhlbHBlclNlcnZpY2VNZXRob2RzLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRob2QuZXhwZWN0ZWRBcmd1bWVudHMpIHtcbiAgICAgICAgICAgICAgaXQoYGNhbGxzIHRoZSAke21ldGhvZC5uYW1lfSgpIHNlcnZpY2UgbWV0aG9kIHdpdGggdGhlIGV4cGVjdGVkIGFyZ3VtZW50c2AsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpbXVsYXRlSW5wdXRBY3Rpb24ocGFyYW1ldGVycy5pbnB1dEFjdGlvbik7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QodGhpcy5tb2NrU2VydmljZVttZXRob2QubmFtZV0pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKC4uLm1ldGhvZC5leHBlY3RlZEFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuZXhwZWN0VG9FbWl0QWN0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgIGl0KCdkb2VzIG5vdCBlbWl0IGFuIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2ltdWxhdGVJbnB1dEFjdGlvbihwYXJhbWV0ZXJzLmlucHV0QWN0aW9uKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRoaXMuZWZmZWN0U3Vic2NyaXB0aW9uQ2FsbGJhY2spLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5vdXRwdXRBY3Rpb25GYWN0b3JpZXMpIHtcblxuICAgICAgICAgIGRlc2NyaWJlKCdmb3Igc3VjY2VzcycsICgpID0+IHtcbiAgICAgICAgICAgIGl0KGBjYWxscyB0aGUgZXhwZWN0ZWQgYWN0aW9uIGZhY3RvcnkgbWV0aG9kKHMpIHdpdGggdGhlIGV4cGVjdGVkIGFyZ3VtZW50c2AsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zaW11bGF0ZUlucHV0QWN0aW9uKHBhcmFtZXRlcnMuaW5wdXRBY3Rpb24pO1xuXG4gICAgICAgICAgICAgIGNvbnN0IGZhY3RvcmllcyA9IHBhcmFtZXRlcnMub3V0cHV0QWN0aW9uRmFjdG9yaWVzO1xuXG4gICAgICAgICAgICAgIChBcnJheS5pc0FycmF5KGZhY3Rvcmllcy5zdWNjZXNzKSA/IGZhY3Rvcmllcy5zdWNjZXNzIDogW2ZhY3Rvcmllcy5zdWNjZXNzXSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoc3VjY2Vzc0ZhY3RvcnksIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgZXhwZWN0KHRoaXMuc3VjY2Vzc0FjdGlvbkZhY3RvcnlNZXRob2RzW2luZGV4XSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoLi4uc3VjY2Vzc0ZhY3RvcnkuZXhwZWN0ZWRBcmd1bWVudHMpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZW1pdHMgdGhlIGV4cGVjdGVkIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zaW11bGF0ZUlucHV0QWN0aW9uKHBhcmFtZXRlcnMuaW5wdXRBY3Rpb24pO1xuXG4gICAgICAgICAgICAgIHRoaXMuc3VjY2Vzc0FjdGlvbkZhY3RvcnlNZXRob2RzLmZvckVhY2gobWV0aG9kID0+XG4gICAgICAgICAgICAgICAgZXhwZWN0KHRoaXMuZWZmZWN0U3Vic2NyaXB0aW9uQ2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRoaXMubW9ja1N0b3JlLmdldEFjdGlvbkNyZWF0ZWRCeShtZXRob2QpKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAocGFyYW1ldGVycy5zZXJ2aWNlTWV0aG9kICYmIHBhcmFtZXRlcnMuc2VydmljZU1ldGhvZC5jYWxsc0FwaVNlcnZpY2UgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBkZXNjcmliZSgnZm9yIGZhaWx1cmUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBleHBlY3RlZEFyZ3VtZW50OiBQb2pvO1xuICAgICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50ID0gKFxuICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycy5vdXRwdXRBY3Rpb25GYWN0b3JpZXMgJiZcbiAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMub3V0cHV0QWN0aW9uRmFjdG9yaWVzLmZhaWx1cmUgJiZcbiAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMub3V0cHV0QWN0aW9uRmFjdG9yaWVzLmZhaWx1cmUuaGFzT3duUHJvcGVydHkoJ2V4cGVjdGVkQXJndW1lbnQnKSkgP1xuICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycy5vdXRwdXRBY3Rpb25GYWN0b3JpZXMuZmFpbHVyZS5leHBlY3RlZEFyZ3VtZW50IDogeyBzb21lOiAnZXJyb3InIH07XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNb2NrU2VydmljZU1ldGhvZChwYXJhbWV0ZXJzLnNlcnZpY2VNZXRob2QubmFtZSwgKCkgPT4gT2JzZXJ2YWJsZS50aHJvdyhleHBlY3RlZEFyZ3VtZW50KSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGl0KCdjYWxscyB0aGUgZXhwZWN0ZWQgYWN0aW9uIGZhY3RvcnkgbWV0aG9kIHdpdGggdGhlIGV4cGVjdGVkIGFyZ3VtZW50cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpbXVsYXRlSW5wdXRBY3Rpb24ocGFyYW1ldGVycy5pbnB1dEFjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKGV4cGVjdGVkQXJndW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGV4cGVjdCh0aGlzLmZhaWx1cmVBY3Rpb25GYWN0b3J5TWV0aG9kKVxuICAgICAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZXhwZWN0KHRoaXMuZmFpbHVyZUFjdGlvbkZhY3RvcnlNZXRob2QpXG4gICAgICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChleHBlY3RlZEFyZ3VtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGl0KCdlbWl0cyB0aGUgZXhwZWN0ZWQgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2ltdWxhdGVJbnB1dEFjdGlvbihwYXJhbWV0ZXJzLmlucHV0QWN0aW9uKTtcbiAgICAgICAgICAgICAgICBleHBlY3QodGhpcy5lZmZlY3RTdWJzY3JpcHRpb25DYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0aGlzLm1vY2tTdG9yZS5nZXRBY3Rpb25DcmVhdGVkQnkodGhpcy5mYWlsdXJlQWN0aW9uRmFjdG9yeU1ldGhvZCkpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUT0RPOiBQcm9wZXJseSBpbnRlcnByZXQgQEVmZmVjdCh7ZGlzcGF0Y2g6IGZhbHNlfSkuXG4gICAgICAgICAgaXQoJ2VtaXRzIHRoZSBleHBlY3RlZCBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNpbXVsYXRlSW5wdXRBY3Rpb24ocGFyYW1ldGVycy5pbnB1dEFjdGlvbik7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0aGlzLmVmZmVjdFN1YnNjcmlwdGlvbkNhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChwYXJhbWV0ZXJzLmlucHV0QWN0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChwYXJhbWV0ZXJzLmN1c3RvbVRlc3RzKSB7XG4gICAgICAgIGRlc2NyaWJlKCdjdXN0b20gdGVzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgcGFyYW1ldGVycy5jdXN0b21UZXN0cy5mb3JFYWNoKChjdXN0b21UZXN0OiBDdXN0b21UZXN0KSA9PiB7XG4gICAgICAgICAgICBpdChjdXN0b21UZXN0Lml0LCAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChjdXN0b21UZXN0LmJlZm9yZUluc3RhbnRpYXRpb24pIGN1c3RvbVRlc3QuYmVmb3JlSW5zdGFudGlhdGlvbigpO1xuICAgICAgICAgICAgICB0aGlzLnNldHVwQ3VzdG9tTW9ja3NGb3IoY3VzdG9tVGVzdCwgcGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgICAgdGhpcy5zaW11bGF0ZUlucHV0QWN0aW9uKHBhcmFtZXRlcnMuaW5wdXRBY3Rpb24pO1xuXG4gICAgICAgICAgICAgIGN1c3RvbVRlc3QuZXhwZWN0YXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXplTW9ja3MoKTogdm9pZCB7XG4gICAgdGhpcy5tb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgdGhpcy5tb2NrTmdyeEVmZmVjdHNBY3Rpb25TdWJqZWN0ID0gbmV3IFN1YmplY3Q8UGFyYW1ldGVyaXplZEFjdGlvbj4oKTtcbiAgICB0aGlzLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMgPSB7XG4gICAgICBvZlR5cGU6ICguLi50eXBlczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEFjdGlvbj4gPT5cbiAgICAgICAgdGhpcy5tb2NrTmdyeEVmZmVjdHNBY3Rpb25TdWJqZWN0LmZpbHRlcihhY3Rpb24gPT4gdHlwZXMuc29tZSh0eXBlID0+IHR5cGUgPT09IGFjdGlvbi50eXBlKSksXG4gICAgICBmaWx0ZXI6IChmaWx0ZXJGdW5jdGlvbjogKCkgPT4gYm9vbGVhbik6IE9ic2VydmFibGU8QWN0aW9uPiA9PlxuICAgICAgICB0aGlzLm1vY2tOZ3J4RWZmZWN0c0FjdGlvblN1YmplY3QuZmlsdGVyKGZpbHRlckZ1bmN0aW9uKVxuICAgIH07XG4gICAgdGhpcy5tb2NrU2VydmljZSA9IHt9O1xuICAgIHRoaXMuZWZmZWN0U3Vic2NyaXB0aW9uQ2FsbGJhY2sgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZWZmZWN0IHN1YnNjcmlwdGlvbiBjYWxsYmFjaycpO1xuICB9XG5cbiAgcHVibGljIHN1YnNjcmliZVRvKGVmZmVjdHNJbnN0YW50aWF0b3I6IEZ1bmN0aW9uLCBlZmZlY3ROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmVmZmVjdCA9IGVmZmVjdHNJbnN0YW50aWF0b3IoKVtlZmZlY3ROYW1lXTtcbiAgICB0aGlzLmVmZmVjdFN1YnNjcmlwdGlvbiA9IHRoaXMuZWZmZWN0LnN1YnNjcmliZSh0aGlzLmVmZmVjdFN1YnNjcmlwdGlvbkNhbGxiYWNrKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVNb2NrU2VydmljZU1ldGhvZChtZXRob2ROYW1lOiBzdHJpbmcsIGZha2VJbXBsZW1lbnRhdGlvbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm1vY2tTZXJ2aWNlW21ldGhvZE5hbWVdID0gamFzbWluZS5jcmVhdGVTcHkoYCcke21ldGhvZE5hbWV9IHNlcnZpY2UgbWV0aG9kJ2ApLmFuZC5jYWxsRmFrZShmYWtlSW1wbGVtZW50YXRpb24pO1xuICB9XG5cbiAgcHVibGljIHNpbXVsYXRlSW5wdXRBY3Rpb24oaW5wdXRBY3Rpb246IFBhcmFtZXRlcml6ZWRBY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm1vY2tOZ3J4RWZmZWN0c0FjdGlvblN1YmplY3QubmV4dChpbnB1dEFjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIHNldHVwTW9ja3NGb3IoYWN0aXZlUGFyYW1ldGVyczogRWZmZWN0VGVzdFBhcmFtZXRlcnMsIG9yaWdpbmFsUGFyYW1ldGVyczogRWZmZWN0VGVzdFBhcmFtZXRlcnMgPSBhY3RpdmVQYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5pbml0aWFsaXplTW9ja3MoKTtcblxuICAgIGlmIChhY3RpdmVQYXJhbWV0ZXJzLnN0YXRlKSB7XG4gICAgICB0aGlzLmNyZWF0ZU1vY2tTdGF0ZUluZm9Gcm9tKGFjdGl2ZVBhcmFtZXRlcnMuc3RhdGUpO1xuICAgIH1cblxuICAgIGlmIChhY3RpdmVQYXJhbWV0ZXJzLnNlcnZpY2VNZXRob2QpIHtcbiAgICAgIHRoaXMuY3JlYXRlTW9ja1NlcnZpY2VNZXRob2QoXG4gICAgICAgIGFjdGl2ZVBhcmFtZXRlcnMuc2VydmljZU1ldGhvZC5uYW1lLCAoKSA9PiBPYnNlcnZhYmxlLm9mKGFjdGl2ZVBhcmFtZXRlcnMuc2VydmljZU1ldGhvZC5yZXR1cm5zT2JzZXJ2YWJsZU9mKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlUGFyYW1ldGVycy5oZWxwZXJTZXJ2aWNlTWV0aG9kcykge1xuICAgICAgYWN0aXZlUGFyYW1ldGVycy5oZWxwZXJTZXJ2aWNlTWV0aG9kcy5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9ja1NlcnZpY2VNZXRob2QobWV0aG9kLm5hbWUsICgpID0+IG1ldGhvZC5yZXR1cm5zKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChhY3RpdmVQYXJhbWV0ZXJzLm91dHB1dEFjdGlvbkZhY3Rvcmllcykge1xuICAgICAgY29uc3QgZmFjdG9yaWVzID0gYWN0aXZlUGFyYW1ldGVycy5vdXRwdXRBY3Rpb25GYWN0b3JpZXM7XG4gICAgICBjb25zdCBzdWNjZXNzRmFjdG9yaWVzID0gQXJyYXkuaXNBcnJheShmYWN0b3JpZXMuc3VjY2VzcykgPyBmYWN0b3JpZXMuc3VjY2VzcyA6IFtmYWN0b3JpZXMuc3VjY2Vzc107XG4gICAgICBjb25zdCBmYWlsdXJlRmFjdG9yeSA9IGZhY3Rvcmllcy5mYWlsdXJlO1xuICAgICAgY29uc3Qgc3VjY2Vzc0ZhY3RvcnlFeHBlY3RzQW5FcnJvciA9IHN1Y2Nlc3NGYWN0b3JpZXMuc29tZShmYWN0b3J5ID0+XG4gICAgICAgIGZhY3Rvcnkuc2VjdGlvbk5hbWUgPT09ICdlcnJvcicgJiYgZmFjdG9yeS5tZXRob2ROYW1lID09PSAnaGFuZGxlJyk7XG5cbiAgICAgIHRoaXMuc3VjY2Vzc0FjdGlvbkZhY3RvcnlNZXRob2RzID1cbiAgICAgICAgc3VjY2Vzc0ZhY3Rvcmllcy5tYXAoc3VjY2Vzc0ZhY3RvcnkgPT5cbiAgICAgICAgICB0aGlzLm1vY2tTdG9yZS5jcmVhdGVJbnRlcm5hbEFjdGlvbkZhY3RvcnlNZXRob2Qoc3VjY2Vzc0ZhY3Rvcnkuc2VjdGlvbk5hbWUsIHN1Y2Nlc3NGYWN0b3J5Lm1ldGhvZE5hbWUpXG4gICAgICAgICk7XG5cbiAgICAgIGlmICghc3VjY2Vzc0ZhY3RvcnlFeHBlY3RzQW5FcnJvcikge1xuICAgICAgICB0aGlzLmZhaWx1cmVBY3Rpb25GYWN0b3J5TWV0aG9kID0gdGhpcy5tb2NrU3RvcmUuY3JlYXRlSW50ZXJuYWxBY3Rpb25GYWN0b3J5TWV0aG9kKFxuICAgICAgICAgIGZhaWx1cmVGYWN0b3J5ID8gZmFpbHVyZUZhY3Rvcnkuc2VjdGlvbk5hbWUgOiAnZXJyb3InLFxuICAgICAgICAgIGZhaWx1cmVGYWN0b3J5ID8gZmFpbHVyZUZhY3RvcnkubWV0aG9kTmFtZSA6ICdoYW5kbGUnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdWJzY3JpYmVUbyhvcmlnaW5hbFBhcmFtZXRlcnMuZWZmZWN0c0luc3RhbnRpYXRvciwgb3JpZ2luYWxQYXJhbWV0ZXJzLmVmZmVjdE5hbWUpO1xuICAgIGV4cGVjdCh0aGlzLmVmZmVjdFN1YnNjcmlwdGlvbkNhbGxiYWNrKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpOyAgLy8gTm90IHlldCwgYW55d2F5IVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEN1c3RvbU1vY2tzRm9yKGN1c3RvbVRlc3Q6IEN1c3RvbVRlc3QsIG9yaWdpbmFsUGFyYW1ldGVyczogRWZmZWN0VGVzdFBhcmFtZXRlcnMpOiB2b2lkIHtcbiAgICBsZXQgb3ZlcnJpZGRlblBhcmFtZXRlcnMgPSBDb21tb24uY2xvbmUob3JpZ2luYWxQYXJhbWV0ZXJzKTtcblxuICAgIGlmIChjdXN0b21UZXN0LnN0YXRlT3ZlcnJpZGVyKSB7XG4gICAgICBvdmVycmlkZGVuUGFyYW1ldGVycyA9IHtcbiAgICAgICAgLi4ub3ZlcnJpZGRlblBhcmFtZXRlcnMsXG4gICAgICAgIHN0YXRlOiBjdXN0b21UZXN0LnN0YXRlT3ZlcnJpZGVyKG9yaWdpbmFsUGFyYW1ldGVycy5zdGF0ZSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbVRlc3Quc2VydmljZU1ldGhvZE92ZXJyaWRlcikge1xuICAgICAgb3ZlcnJpZGRlblBhcmFtZXRlcnMgPSB7XG4gICAgICAgIC4uLm92ZXJyaWRkZW5QYXJhbWV0ZXJzLFxuICAgICAgICBzZXJ2aWNlTWV0aG9kOiBjdXN0b21UZXN0LnNlcnZpY2VNZXRob2RPdmVycmlkZXIob3JpZ2luYWxQYXJhbWV0ZXJzLnNlcnZpY2VNZXRob2QpXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjdXN0b21UZXN0LmhlbHBlclNlcnZpY2VNZXRob2RzT3ZlcnJpZGVyKSB7XG4gICAgICBvdmVycmlkZGVuUGFyYW1ldGVycyA9IHtcbiAgICAgICAgLi4ub3ZlcnJpZGRlblBhcmFtZXRlcnMsXG4gICAgICAgIGhlbHBlclNlcnZpY2VNZXRob2RzOiBjdXN0b21UZXN0LmhlbHBlclNlcnZpY2VNZXRob2RzT3ZlcnJpZGVyKG9yaWdpbmFsUGFyYW1ldGVycy5oZWxwZXJTZXJ2aWNlTWV0aG9kcylcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5zZXR1cE1vY2tzRm9yKG92ZXJyaWRkZW5QYXJhbWV0ZXJzLCBvcmlnaW5hbFBhcmFtZXRlcnMpO1xuICB9XG5cblxuICBwcml2YXRlIGNyZWF0ZU1vY2tTdGF0ZUluZm9Gcm9tKG9uZU9yTW9yZVN0YXRlUGFyYW1ldGVyczogRWZmZWN0VGVzdFN0YXRlIHwgRWZmZWN0VGVzdFN0YXRlW10pIHtcbiAgICAoQXJyYXkuaXNBcnJheShvbmVPck1vcmVTdGF0ZVBhcmFtZXRlcnMpID8gb25lT3JNb3JlU3RhdGVQYXJhbWV0ZXJzIDogW29uZU9yTW9yZVN0YXRlUGFyYW1ldGVyc10pXG4gICAgICAuZm9yRWFjaChzdGF0ZVBhcmFtZXRlciA9PiB7XG4gICAgICAgIGlmIChzdGF0ZVBhcmFtZXRlci5wcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICB0aGlzLm1vY2tTdG9yZS5jcmVhdGVTdGF0ZUVsZW1lbnQoc3RhdGVQYXJhbWV0ZXIuc3RvcmVTZWN0aW9uTmFtZSwgc3RhdGVQYXJhbWV0ZXIucHJvcGVydHlOYW1lLCBzdGF0ZVBhcmFtZXRlci52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKHN0YXRlUGFyYW1ldGVyLnN0b3JlU2VjdGlvbk5hbWUsIHN0YXRlUGFyYW1ldGVyLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==
