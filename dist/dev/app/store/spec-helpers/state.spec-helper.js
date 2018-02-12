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
var StateSpecHelper = (function () {
    function StateSpecHelper() {
        this.reducerTestModules = null;
    }
    StateSpecHelper.prototype.setReducerTestModules = function (modules) {
        this.reducerTestModules = modules;
        describe('for an unexpected action', function () {
            it('with previous state, returns previous state', function () {
                expect(modules.state.reducer({ previous: 'state' }, { type: 'BLAH' })).toEqual({ previous: 'state' });
            });
            it('without previous state, returns initial state', function () {
                expect(modules.state.reducer(undefined, { type: 'BLAH' })).toEqual(modules.state.initialState);
            });
        });
    };
    StateSpecHelper.prototype.generateTestsFor = function (parameters) {
        var _this = this;
        if (parameters.actionClassName) {
            (Array.isArray(parameters.actionClassName) ? parameters.actionClassName : [parameters.actionClassName])
                .forEach(function (actionClassName) {
                var actionType = parameters.overrideActionClass ?
                    parameters.overrideActionClass[actionClassName].Type :
                    _this.reducerTestModules.actions[actionClassName].Type;
                _this.runSpecsFor(actionType, parameters);
            });
        }
        if (parameters.actionTypes) {
            (Array.isArray(parameters.actionTypes) ? parameters.actionTypes : [parameters.actionTypes])
                .forEach(function (actionType) {
                _this.runSpecsFor(actionType, parameters);
            });
        }
    };
    StateSpecHelper.prototype.runSpecsFor = function (actionType, parameters) {
        var _this = this;
        if (!this.reducerTestModules) {
            describe("for " + actionType + " (unknown action type)", function () {
                it('has modules defined for test', function () {
                    fail("setStandardReducerTestModules() needs to be called before addStandardReducerTestsFor()");
                });
            });
            return;
        }
        var reducerUnderTest = this.reducerTestModules.state.reducer;
        describe("for " + actionType + " ('" + actionType + "')", function () {
            parameters.customTests.forEach(function (test) {
                it(test.it, function () {
                    var testAction = __assign({ type: actionType }, test.actionParameters);
                    expect(reducerUnderTest(test.previousState, testAction)).toEqual(test.expectedNextState);
                });
            });
            describe('meets basic reducer standards, because it:', function () {
                var testAction = __assign({ type: actionType }, (parameters.mutationTestData ? (parameters.mutationTestData.actionParameters || []) : []));
                var previousState = parameters.mutationTestData ? parameters.mutationTestData.previousState : undefined;
                var previousStateSnapshot = JSON.stringify(previousState);
                var initialState = _this.reducerTestModules.state.initialState;
                var initialStateSnapshot = JSON.stringify(initialState);
                it('does not throw an exception when the previous state is null', function () {
                    expect(function () { return reducerUnderTest(null, testAction); }).not.toThrow();
                });
                it('has test parameters sufficient to prove lack of mutation', function () {
                    var newState = reducerUnderTest(previousState, testAction);
                    if (JSON.stringify(newState) === (previousStateSnapshot || initialStateSnapshot)) {
                        fail('The test parameters do not cause a difference between pre- and post-action states for this reducer,'
                            + ' so we cannot determine whether it could potentially mutate the previous state.'
                            + ' (Specify \'mutationTestData\' with \'previousState\' and/or \'actionParameters\' to ensure a state change.)');
                    }
                });
                it('does not directly mutate the previous state', function () {
                    reducerUnderTest(previousState, testAction);
                    var postReducerSnapshot = JSON.stringify(previousState);
                    expect(postReducerSnapshot).toEqual(previousStateSnapshot);
                });
                it('does not directly mutate the initial state when there was a previous state', function () {
                    reducerUnderTest(previousState, testAction);
                    var postReducerSnapshot = JSON.stringify(initialState);
                    expect(postReducerSnapshot).toEqual(initialStateSnapshot);
                });
                it('does not directly mutate the initial state when there was not a previous state', function () {
                    reducerUnderTest(undefined, testAction);
                    var postReducerSnapshot = JSON.stringify(initialState);
                    expect(postReducerSnapshot).toEqual(initialStateSnapshot);
                });
                it('protects the previous state from changes to the returned state', function () {
                    var newState = reducerUnderTest(previousState, testAction);
                    expect(_this.preserves(previousState, 'previous', newState)).toBe(true);
                });
                it('protects the initial state from changes to the returned state when there was a previous state', function () {
                    var newState = reducerUnderTest(previousState, testAction);
                    expect(_this.preserves(initialState, 'initial', newState)).toBe(true);
                });
                it('protects the initial state from changes to the returned state when there was not a previous state', function () {
                    var newState = reducerUnderTest(undefined, testAction);
                    expect(_this.preserves(initialState, 'initial', newState)).toBe(true);
                });
            });
        });
    };
    StateSpecHelper.prototype.preserves = function (previousState, previousStateName, newState, propertyPath, previousStateSnapshot) {
        if (propertyPath === void 0) { propertyPath = 'state'; }
        if (previousStateSnapshot === void 0) { previousStateSnapshot = JSON.stringify(previousState); }
        if (Array.isArray(newState)) {
            return this.preservesArrayIn(previousState, previousStateName, newState, propertyPath, previousStateSnapshot);
        }
        if (newState === Object(newState)) {
            return this.preservesObjectIn(previousState, previousStateName, newState, propertyPath, previousStateSnapshot);
        }
        return this.preservesValueIn(previousState, previousStateName, newState, propertyPath, previousStateSnapshot);
    };
    StateSpecHelper.prototype.preservesArrayIn = function (previousState, previousStateName, array, propertyPath, previousStateSnapshot) {
        array.push('evil mutation');
        this.verifyPreservationOf(previousState, previousStateSnapshot, "'" + propertyPath + "' array in the " + previousStateName + " state is changed when pushing an element to it in the new state");
        array.pop();
        for (var index in array) {
            if (!this.preserves(previousState, previousStateName, array[index], propertyPath + "[" + index + "]", previousStateSnapshot)) {
                return false;
            }
        }
        return true;
    };
    StateSpecHelper.prototype.preservesObjectIn = function (previousState, previousStateName, object, propertyPath, previousStateSnapshot) {
        object['evil mutation'] = 'evil mutation';
        this.verifyPreservationOf(previousState, previousStateSnapshot, "'" + propertyPath + "' object in the " + previousStateName + " state is changed when adding a property to it in the new state");
        delete object['evil mutation'];
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!this.preserves(previousState, previousStateName, object[key], propertyPath + "." + key, previousStateSnapshot)) {
                return false;
            }
        }
        return true;
    };
    StateSpecHelper.prototype.preservesValueIn = function (previousState, previousStateName, value, propertyPath, previousStateSnapshot) {
        var valueBeforeMutation = value;
        value = 'evil mutation';
        this.verifyPreservationOf(previousState, previousStateSnapshot, "'" + propertyPath + "' value in the " + previousStateName + " state is changed when changing it in the new state");
        value = valueBeforeMutation;
        return true;
    };
    StateSpecHelper.prototype.verifyPreservationOf = function (previousState, previousStateSnapshot, errorMessage) {
        if (JSON.stringify(previousState) !== previousStateSnapshot)
            throw new Error(errorMessage);
    };
    return StateSpecHelper;
}());
exports.StateSpecHelper = StateSpecHelper;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVjLWhlbHBlcnMvc3RhdGUuc3BlYy1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQXlCQTtJQUFBO1FBQ1UsdUJBQWtCLEdBQXVCLElBQUksQ0FBQztJQW1OeEQsQ0FBQztJQWpOUSwrQ0FBcUIsR0FBNUIsVUFBNkIsT0FBMkI7UUFDdEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQztRQUVsQyxRQUFRLENBQUMsMEJBQTBCLEVBQUU7WUFDbkMsRUFBRSxDQUFDLDZDQUE2QyxFQUFFO2dCQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3hHLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFO2dCQUNsRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqRyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDBDQUFnQixHQUF2QixVQUF3QixVQUFpQztRQUF6RCxpQkFpQkM7UUFoQkMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENB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RUFDNUQsTUFBSSxZQUFZLHVCQUFrQixpQkFBaUIsd0RBQXFELENBQUMsQ0FBQztRQUU1RyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7UUFFNUIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyw4Q0FBb0IsR0FBNUIsVUFBNkIsYUFBa0IsRUFBRSxxQkFBNkIsRUFBRSxZQUFvQjtRQUNsRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLHFCQUFxQixDQUFDO1lBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQXBOQSxBQW9OQyxJQUFBO0FBcE5ZLDBDQUFlIiwiZmlsZSI6ImFwcC9zdG9yZS9zcGVjLWhlbHBlcnMvc3RhdGUuc3BlYy1oZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25SZWR1Y2VyIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlclRlc3RNb2R1bGVzIHtcbiAgYWN0aW9uczogUG9qbztcbiAgc3RhdGU6IFBvam87XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlclRlc3RQYXJhbWV0ZXJzIHtcbiAgb3ZlcnJpZGVBY3Rpb25DbGFzcz86IFBvam87XG4gIGFjdGlvbkNsYXNzTmFtZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICBhY3Rpb25UeXBlcz86IHN0cmluZyB8IHN0cmluZ1tdO1xuICBtdXRhdGlvblRlc3REYXRhPzoge1xuICAgIHByZXZpb3VzU3RhdGU/OiBQb2pvO1xuICAgIGFjdGlvblBhcmFtZXRlcnM/OiBQb2pvO1xuICB9O1xuICBjdXN0b21UZXN0czoge1xuICAgIGl0OiBzdHJpbmc7XG4gICAgcHJldmlvdXNTdGF0ZT86IFBvam87XG4gICAgYWN0aW9uUGFyYW1ldGVycz86IFBvam87XG4gICAgZXhwZWN0ZWROZXh0U3RhdGU6IFBvam87XG4gIH1bXTtcbn1cblxuZXhwb3J0IGNsYXNzIFN0YXRlU3BlY0hlbHBlciB7XG4gIHByaXZhdGUgcmVkdWNlclRlc3RNb2R1bGVzOiBSZWR1Y2VyVGVzdE1vZHVsZXMgPSBudWxsO1xuXG4gIHB1YmxpYyBzZXRSZWR1Y2VyVGVzdE1vZHVsZXMobW9kdWxlczogUmVkdWNlclRlc3RNb2R1bGVzKTogdm9pZCB7XG4gICAgdGhpcy5yZWR1Y2VyVGVzdE1vZHVsZXMgPSBtb2R1bGVzO1xuXG4gICAgZGVzY3JpYmUoJ2ZvciBhbiB1bmV4cGVjdGVkIGFjdGlvbicsICgpID0+IHtcbiAgICAgIGl0KCd3aXRoIHByZXZpb3VzIHN0YXRlLCByZXR1cm5zIHByZXZpb3VzIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9kdWxlcy5zdGF0ZS5yZWR1Y2VyKHsgcHJldmlvdXM6ICdzdGF0ZScgfSwgeyB0eXBlOiAnQkxBSCcgfSkpLnRvRXF1YWwoeyBwcmV2aW91czogJ3N0YXRlJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnd2l0aG91dCBwcmV2aW91cyBzdGF0ZSwgcmV0dXJucyBpbml0aWFsIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9kdWxlcy5zdGF0ZS5yZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiAnQkxBSCcgfSkpLnRvRXF1YWwobW9kdWxlcy5zdGF0ZS5pbml0aWFsU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2VuZXJhdGVUZXN0c0ZvcihwYXJhbWV0ZXJzOiBSZWR1Y2VyVGVzdFBhcmFtZXRlcnMpOiB2b2lkIHtcbiAgICBpZiAocGFyYW1ldGVycy5hY3Rpb25DbGFzc05hbWUpIHtcbiAgICAgIChBcnJheS5pc0FycmF5KHBhcmFtZXRlcnMuYWN0aW9uQ2xhc3NOYW1lKSA/IHBhcmFtZXRlcnMuYWN0aW9uQ2xhc3NOYW1lIDogW3BhcmFtZXRlcnMuYWN0aW9uQ2xhc3NOYW1lXSlcbiAgICAgICAgLmZvckVhY2goYWN0aW9uQ2xhc3NOYW1lID0+IHtcbiAgICAgICAgICBjb25zdCBhY3Rpb25UeXBlOiBzdHJpbmcgPSBwYXJhbWV0ZXJzLm92ZXJyaWRlQWN0aW9uQ2xhc3MgP1xuICAgICAgICAgICAgcGFyYW1ldGVycy5vdmVycmlkZUFjdGlvbkNsYXNzW2FjdGlvbkNsYXNzTmFtZV0uVHlwZSA6XG4gICAgICAgICAgICB0aGlzLnJlZHVjZXJUZXN0TW9kdWxlcy5hY3Rpb25zW2FjdGlvbkNsYXNzTmFtZV0uVHlwZTtcbiAgICAgICAgICB0aGlzLnJ1blNwZWNzRm9yKGFjdGlvblR5cGUsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1ldGVycy5hY3Rpb25UeXBlcykge1xuICAgICAgKEFycmF5LmlzQXJyYXkocGFyYW1ldGVycy5hY3Rpb25UeXBlcykgPyBwYXJhbWV0ZXJzLmFjdGlvblR5cGVzIDogW3BhcmFtZXRlcnMuYWN0aW9uVHlwZXNdKVxuICAgICAgICAuZm9yRWFjaChhY3Rpb25UeXBlID0+IHtcbiAgICAgICAgICB0aGlzLnJ1blNwZWNzRm9yKGFjdGlvblR5cGUsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1blNwZWNzRm9yKGFjdGlvblR5cGU6IHN0cmluZywgcGFyYW1ldGVyczogUmVkdWNlclRlc3RQYXJhbWV0ZXJzKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlZHVjZXJUZXN0TW9kdWxlcykge1xuICAgICAgZGVzY3JpYmUoYGZvciAke2FjdGlvblR5cGV9ICh1bmtub3duIGFjdGlvbiB0eXBlKWAsICgpID0+IHtcbiAgICAgICAgaXQoJ2hhcyBtb2R1bGVzIGRlZmluZWQgZm9yIHRlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgZmFpbChgc2V0U3RhbmRhcmRSZWR1Y2VyVGVzdE1vZHVsZXMoKSBuZWVkcyB0byBiZSBjYWxsZWQgYmVmb3JlIGFkZFN0YW5kYXJkUmVkdWNlclRlc3RzRm9yKClgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZHVjZXJVbmRlclRlc3Q6IEFjdGlvblJlZHVjZXI8YW55PiA9IHRoaXMucmVkdWNlclRlc3RNb2R1bGVzLnN0YXRlLnJlZHVjZXI7XG5cbiAgICBkZXNjcmliZShgZm9yICR7YWN0aW9uVHlwZX0gKCcke2FjdGlvblR5cGV9JylgLCAoKSA9PiB7XG4gICAgICBwYXJhbWV0ZXJzLmN1c3RvbVRlc3RzLmZvckVhY2godGVzdCA9PiB7XG4gICAgICAgIGl0KHRlc3QuaXQsICgpID0+IHtcbiAgICAgICAgICBjb25zdCB0ZXN0QWN0aW9uOiBhbnkgPSB7IHR5cGU6IGFjdGlvblR5cGUsIC4uLnRlc3QuYWN0aW9uUGFyYW1ldGVycyB9O1xuXG4gICAgICAgICAgZXhwZWN0KHJlZHVjZXJVbmRlclRlc3QodGVzdC5wcmV2aW91c1N0YXRlLCB0ZXN0QWN0aW9uKSkudG9FcXVhbCh0ZXN0LmV4cGVjdGVkTmV4dFN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ21lZXRzIGJhc2ljIHJlZHVjZXIgc3RhbmRhcmRzLCBiZWNhdXNlIGl0OicsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVzdEFjdGlvbjogYW55ID0ge1xuICAgICAgICAgIHR5cGU6IGFjdGlvblR5cGUsXG4gICAgICAgICAgLi4uKHBhcmFtZXRlcnMubXV0YXRpb25UZXN0RGF0YSA/IChwYXJhbWV0ZXJzLm11dGF0aW9uVGVzdERhdGEuYWN0aW9uUGFyYW1ldGVycyB8fCBbXSkgOiBbXSlcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTdGF0ZTogUG9qbyA9IHBhcmFtZXRlcnMubXV0YXRpb25UZXN0RGF0YSA/IHBhcmFtZXRlcnMubXV0YXRpb25UZXN0RGF0YS5wcmV2aW91c1N0YXRlIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBwcmV2aW91c1N0YXRlU25hcHNob3Q6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzU3RhdGUpO1xuICAgICAgICBjb25zdCBpbml0aWFsU3RhdGU6IFBvam8gPSB0aGlzLnJlZHVjZXJUZXN0TW9kdWxlcy5zdGF0ZS5pbml0aWFsU3RhdGU7XG4gICAgICAgIGNvbnN0IGluaXRpYWxTdGF0ZVNuYXBzaG90OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiB0aGUgcHJldmlvdXMgc3RhdGUgaXMgbnVsbCcsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoKCkgPT4gcmVkdWNlclVuZGVyVGVzdChudWxsLCB0ZXN0QWN0aW9uKSkubm90LnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2hhcyB0ZXN0IHBhcmFtZXRlcnMgc3VmZmljaWVudCB0byBwcm92ZSBsYWNrIG9mIG11dGF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0gcmVkdWNlclVuZGVyVGVzdChwcmV2aW91c1N0YXRlLCB0ZXN0QWN0aW9uKTtcblxuICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShuZXdTdGF0ZSkgPT09IChwcmV2aW91c1N0YXRlU25hcHNob3QgfHwgaW5pdGlhbFN0YXRlU25hcHNob3QpKSB7XG4gICAgICAgICAgICBmYWlsKCdUaGUgdGVzdCBwYXJhbWV0ZXJzIGRvIG5vdCBjYXVzZSBhIGRpZmZlcmVuY2UgYmV0d2VlbiBwcmUtIGFuZCBwb3N0LWFjdGlvbiBzdGF0ZXMgZm9yIHRoaXMgcmVkdWNlciwnXG4gICAgICAgICAgICAgICsgJyBzbyB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHdoZXRoZXIgaXQgY291bGQgcG90ZW50aWFsbHkgbXV0YXRlIHRoZSBwcmV2aW91cyBzdGF0ZS4nXG4gICAgICAgICAgICAgICsgJyAoU3BlY2lmeSBcXCdtdXRhdGlvblRlc3REYXRhXFwnIHdpdGggXFwncHJldmlvdXNTdGF0ZVxcJyBhbmQvb3IgXFwnYWN0aW9uUGFyYW1ldGVyc1xcJyB0byBlbnN1cmUgYSBzdGF0ZSBjaGFuZ2UuKScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IGRpcmVjdGx5IG11dGF0ZSB0aGUgcHJldmlvdXMgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgcmVkdWNlclVuZGVyVGVzdChwcmV2aW91c1N0YXRlLCB0ZXN0QWN0aW9uKTtcblxuICAgICAgICAgIGNvbnN0IHBvc3RSZWR1Y2VyU25hcHNob3QgPSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1N0YXRlKTtcblxuICAgICAgICAgIGV4cGVjdChwb3N0UmVkdWNlclNuYXBzaG90KS50b0VxdWFsKHByZXZpb3VzU3RhdGVTbmFwc2hvdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBkaXJlY3RseSBtdXRhdGUgdGhlIGluaXRpYWwgc3RhdGUgd2hlbiB0aGVyZSB3YXMgYSBwcmV2aW91cyBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgICByZWR1Y2VyVW5kZXJUZXN0KHByZXZpb3VzU3RhdGUsIHRlc3RBY3Rpb24pO1xuXG4gICAgICAgICAgY29uc3QgcG9zdFJlZHVjZXJTbmFwc2hvdCA9IEpTT04uc3RyaW5naWZ5KGluaXRpYWxTdGF0ZSk7XG5cbiAgICAgICAgICBleHBlY3QocG9zdFJlZHVjZXJTbmFwc2hvdCkudG9FcXVhbChpbml0aWFsU3RhdGVTbmFwc2hvdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBkaXJlY3RseSBtdXRhdGUgdGhlIGluaXRpYWwgc3RhdGUgd2hlbiB0aGVyZSB3YXMgbm90IGEgcHJldmlvdXMgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgcmVkdWNlclVuZGVyVGVzdCh1bmRlZmluZWQsIHRlc3RBY3Rpb24pO1xuXG4gICAgICAgICAgY29uc3QgcG9zdFJlZHVjZXJTbmFwc2hvdCA9IEpTT04uc3RyaW5naWZ5KGluaXRpYWxTdGF0ZSk7XG5cbiAgICAgICAgICBleHBlY3QocG9zdFJlZHVjZXJTbmFwc2hvdCkudG9FcXVhbChpbml0aWFsU3RhdGVTbmFwc2hvdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwcm90ZWN0cyB0aGUgcHJldmlvdXMgc3RhdGUgZnJvbSBjaGFuZ2VzIHRvIHRoZSByZXR1cm5lZCBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHJlZHVjZXJVbmRlclRlc3QocHJldmlvdXNTdGF0ZSwgdGVzdEFjdGlvbik7XG5cbiAgICAgICAgICBleHBlY3QodGhpcy5wcmVzZXJ2ZXMocHJldmlvdXNTdGF0ZSwgJ3ByZXZpb3VzJywgbmV3U3RhdGUpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHJvdGVjdHMgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBjaGFuZ2VzIHRvIHRoZSByZXR1cm5lZCBzdGF0ZSB3aGVuIHRoZXJlIHdhcyBhIHByZXZpb3VzIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0gcmVkdWNlclVuZGVyVGVzdChwcmV2aW91c1N0YXRlLCB0ZXN0QWN0aW9uKTtcblxuICAgICAgICAgIGV4cGVjdCh0aGlzLnByZXNlcnZlcyhpbml0aWFsU3RhdGUsICdpbml0aWFsJywgbmV3U3RhdGUpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHJvdGVjdHMgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBjaGFuZ2VzIHRvIHRoZSByZXR1cm5lZCBzdGF0ZSB3aGVuIHRoZXJlIHdhcyBub3QgYSBwcmV2aW91cyBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHJlZHVjZXJVbmRlclRlc3QodW5kZWZpbmVkLCB0ZXN0QWN0aW9uKTtcblxuICAgICAgICAgIGV4cGVjdCh0aGlzLnByZXNlcnZlcyhpbml0aWFsU3RhdGUsICdpbml0aWFsJywgbmV3U3RhdGUpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVzZXJ2ZXMoXG4gICAgcHJldmlvdXNTdGF0ZTogYW55LFxuICAgIHByZXZpb3VzU3RhdGVOYW1lOiBzdHJpbmcsXG4gICAgbmV3U3RhdGU6IGFueSxcbiAgICBwcm9wZXJ0eVBhdGg6IHN0cmluZyA9ICdzdGF0ZScsXG4gICAgcHJldmlvdXNTdGF0ZVNuYXBzaG90OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1N0YXRlKVxuICApOiBib29sZWFuIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdTdGF0ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZXNlcnZlc0FycmF5SW4ocHJldmlvdXNTdGF0ZSwgcHJldmlvdXNTdGF0ZU5hbWUsIG5ld1N0YXRlLCBwcm9wZXJ0eVBhdGgsIHByZXZpb3VzU3RhdGVTbmFwc2hvdCk7XG4gICAgfVxuXG4gICAgaWYgKG5ld1N0YXRlID09PSBPYmplY3QobmV3U3RhdGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmVzZXJ2ZXNPYmplY3RJbihwcmV2aW91c1N0YXRlLCBwcmV2aW91c1N0YXRlTmFtZSwgbmV3U3RhdGUsIHByb3BlcnR5UGF0aCwgcHJldmlvdXNTdGF0ZVNuYXBzaG90KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcmVzZXJ2ZXNWYWx1ZUluKHByZXZpb3VzU3RhdGUsIHByZXZpb3VzU3RhdGVOYW1lLCBuZXdTdGF0ZSwgcHJvcGVydHlQYXRoLCBwcmV2aW91c1N0YXRlU25hcHNob3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVzZXJ2ZXNBcnJheUluKFxuICAgIHByZXZpb3VzU3RhdGU6IGFueSxcbiAgICBwcmV2aW91c1N0YXRlTmFtZTogc3RyaW5nLFxuICAgIGFycmF5OiBhbnlbXSxcbiAgICBwcm9wZXJ0eVBhdGg6IHN0cmluZyxcbiAgICBwcmV2aW91c1N0YXRlU25hcHNob3Q6IHN0cmluZ1xuICApOiBib29sZWFuIHtcbiAgICBhcnJheS5wdXNoKCdldmlsIG11dGF0aW9uJyk7XG5cbiAgICB0aGlzLnZlcmlmeVByZXNlcnZhdGlvbk9mKHByZXZpb3VzU3RhdGUsIHByZXZpb3VzU3RhdGVTbmFwc2hvdCxcbiAgICAgIGAnJHtwcm9wZXJ0eVBhdGh9JyBhcnJheSBpbiB0aGUgJHtwcmV2aW91c1N0YXRlTmFtZX0gc3RhdGUgaXMgY2hhbmdlZCB3aGVuIHB1c2hpbmcgYW4gZWxlbWVudCB0byBpdCBpbiB0aGUgbmV3IHN0YXRlYCk7XG5cbiAgICBhcnJheS5wb3AoKTtcblxuICAgIGZvciAoY29uc3QgaW5kZXggaW4gYXJyYXkpIHtcbiAgICAgIGlmICghdGhpcy5wcmVzZXJ2ZXMocHJldmlvdXNTdGF0ZSwgcHJldmlvdXNTdGF0ZU5hbWUsIGFycmF5W2luZGV4XSwgYCR7cHJvcGVydHlQYXRofVske2luZGV4fV1gLCBwcmV2aW91c1N0YXRlU25hcHNob3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlc2VydmVzT2JqZWN0SW4oXG4gICAgcHJldmlvdXNTdGF0ZTogYW55LFxuICAgIHByZXZpb3VzU3RhdGVOYW1lOiBzdHJpbmcsXG4gICAgb2JqZWN0OiBhbnksXG4gICAgcHJvcGVydHlQYXRoOiBzdHJpbmcsXG4gICAgcHJldmlvdXNTdGF0ZVNuYXBzaG90OiBzdHJpbmdcbiAgKTogYm9vbGVhbiB7XG4gICAgb2JqZWN0WydldmlsIG11dGF0aW9uJ10gPSAnZXZpbCBtdXRhdGlvbic7XG5cbiAgICB0aGlzLnZlcmlmeVByZXNlcnZhdGlvbk9mKHByZXZpb3VzU3RhdGUsIHByZXZpb3VzU3RhdGVTbmFwc2hvdCxcbiAgICAgIGAnJHtwcm9wZXJ0eVBhdGh9JyBvYmplY3QgaW4gdGhlICR7cHJldmlvdXNTdGF0ZU5hbWV9IHN0YXRlIGlzIGNoYW5nZWQgd2hlbiBhZGRpbmcgYSBwcm9wZXJ0eSB0byBpdCBpbiB0aGUgbmV3IHN0YXRlYCk7XG5cbiAgICBkZWxldGUgb2JqZWN0WydldmlsIG11dGF0aW9uJ107XG5cbiAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuICAgICAgaWYgKCF0aGlzLnByZXNlcnZlcyhwcmV2aW91c1N0YXRlLCBwcmV2aW91c1N0YXRlTmFtZSwgb2JqZWN0W2tleV0sIGAke3Byb3BlcnR5UGF0aH0uJHtrZXl9YCwgcHJldmlvdXNTdGF0ZVNuYXBzaG90KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIHByZXNlcnZlc1ZhbHVlSW4oXG4gICAgcHJldmlvdXNTdGF0ZTogYW55LFxuICAgIHByZXZpb3VzU3RhdGVOYW1lOiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSxcbiAgICBwcm9wZXJ0eVBhdGg6IHN0cmluZyxcbiAgICBwcmV2aW91c1N0YXRlU25hcHNob3Q6IHN0cmluZ1xuICApOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZUJlZm9yZU11dGF0aW9uID0gdmFsdWU7XG4gICAgdmFsdWUgPSAnZXZpbCBtdXRhdGlvbic7XG5cbiAgICB0aGlzLnZlcmlmeVByZXNlcnZhdGlvbk9mKHByZXZpb3VzU3RhdGUsIHByZXZpb3VzU3RhdGVTbmFwc2hvdCxcbiAgICAgIGAnJHtwcm9wZXJ0eVBhdGh9JyB2YWx1ZSBpbiB0aGUgJHtwcmV2aW91c1N0YXRlTmFtZX0gc3RhdGUgaXMgY2hhbmdlZCB3aGVuIGNoYW5naW5nIGl0IGluIHRoZSBuZXcgc3RhdGVgKTtcblxuICAgIHZhbHVlID0gdmFsdWVCZWZvcmVNdXRhdGlvbjtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSB2ZXJpZnlQcmVzZXJ2YXRpb25PZihwcmV2aW91c1N0YXRlOiBhbnksIHByZXZpb3VzU3RhdGVTbmFwc2hvdDogc3RyaW5nLCBlcnJvck1lc3NhZ2U6IHN0cmluZykge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeShwcmV2aW91c1N0YXRlKSAhPT0gcHJldmlvdXNTdGF0ZVNuYXBzaG90KSB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgfVxufVxuIl19
