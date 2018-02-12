"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var notifier_effects_1 = require("./notifier.effects");
var NotifierActions = require("./notifier.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Notification Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new notifier_effects_1.NotifierEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'notify',
            effectsInstantiator: instantiator,
            inputAction: {
                type: NotifierActions.Notify.Type,
                options: { some: 'options' },
                onClose: function () { }
            },
            serviceMethod: {
                name: 'openNotificationDialog',
                callsApiService: false,
                expectedArguments: [{ some: 'options' }],
                returnsObservableOf: null
            }
        });
        describe('notify (onClose method)', function () {
            var onCloseFunction;
            var inputAction;
            var onCloseSubject;
            beforeEach(function () {
                onCloseSubject = new Subject_1.Subject();
                effectsSpecHelper.initializeMocks();
                effectsSpecHelper.subscribeTo(instantiator, 'notify');
                effectsSpecHelper.createMockServiceMethod('openNotificationDialog', function () { return onCloseSubject; });
                onCloseFunction = jasmine.createSpy('onClose');
                inputAction = { type: NotifierActions.Notify.Type, options: 'some options', onClose: onCloseFunction };
            });
            afterEach(function () {
                effectsSpecHelper.effectSubscription.unsubscribe();
            });
            it('doesn\'t call the onClose method before the dialog is closed', function () {
                effectsSpecHelper.simulateInputAction(inputAction);
                expect(onCloseFunction).not.toHaveBeenCalled();
            });
            it('calls the onClose method after the dialog is closed', function () {
                effectsSpecHelper.simulateInputAction(inputAction);
                onCloseSubject.next();
                expect(onCloseFunction).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9ub3RpZmllci9ub3RpZmllci5lZmZlY3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBdUM7QUFFdkMsdURBQXFEO0FBQ3JELG9EQUFzRDtBQUN0RCwyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsc0JBQXNCLEVBQUU7UUFDL0IsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUksa0NBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0RyxDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLFFBQVE7WUFDcEIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSTtnQkFDakMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtnQkFDNUIsT0FBTyxFQUFFLGNBQVEsQ0FBQzthQUNuQjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixlQUFlLEVBQUUsS0FBSztnQkFDdEIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztnQkFDeEMsbUJBQW1CLEVBQUUsSUFBSTthQUMxQjtTQUNGLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxJQUFJLGVBQTRCLENBQUM7WUFDakMsSUFBSSxXQUFnQixDQUFDO1lBQ3JCLElBQUksY0FBNkIsQ0FBQztZQUVsQyxVQUFVLENBQUM7Z0JBQ1QsY0FBYyxHQUFHLElBQUksaUJBQU8sRUFBUSxDQUFDO2dCQUVyQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDcEMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDdEQsaUJBQWlCLENBQUMsdUJBQXVCLENBQUMsd0JBQXdCLEVBQUUsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUMsQ0FBQztnQkFDMUYsZUFBZSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9DLFdBQVcsR0FBRyxFQUFFLElBQUksRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQztZQUN6RyxDQUFDLENBQUMsQ0FBQztZQUVILFNBQVMsQ0FBQztnQkFDUixpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw4REFBOEQsRUFBRTtnQkFDakUsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRW5ELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtnQkFDeEQsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRW5ELGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFdEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFERCxvQkEwREMiLCJmaWxlIjoiYXBwL3N0b3JlL25vdGlmaWVyL25vdGlmaWVyLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5pbXBvcnQgeyBOb3RpZmllckVmZmVjdHMgfSBmcm9tICcuL25vdGlmaWVyLmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgTm90aWZpZXJBY3Rpb25zIGZyb20gJy4vbm90aWZpZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdOb3RpZmljYXRpb24gRWZmZWN0cycsICgpID0+IHtcbiAgICBjb25zdCBlZmZlY3RzU3BlY0hlbHBlcjogRWZmZWN0c1NwZWNIZWxwZXIgPSBuZXcgRWZmZWN0c1NwZWNIZWxwZXIoKTtcblxuICAgIGZ1bmN0aW9uIGluc3RhbnRpYXRvcigpOiBhbnkge1xuICAgICAgcmV0dXJuIG5ldyBOb3RpZmllckVmZmVjdHMoZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1NlcnZpY2UpO1xuICAgIH1cblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ25vdGlmeScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBOb3RpZmllckFjdGlvbnMuTm90aWZ5LlR5cGUsXG4gICAgICAgIG9wdGlvbnM6IHsgc29tZTogJ29wdGlvbnMnIH0sXG4gICAgICAgIG9uQ2xvc2U6ICgpID0+IHsgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ29wZW5Ob3RpZmljYXRpb25EaWFsb2cnLFxuICAgICAgICBjYWxsc0FwaVNlcnZpY2U6IGZhbHNlLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ29wdGlvbnMnIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiBudWxsXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbm90aWZ5IChvbkNsb3NlIG1ldGhvZCknLCAoKSA9PiB7XG4gICAgICBsZXQgb25DbG9zZUZ1bmN0aW9uOiBqYXNtaW5lLlNweTtcbiAgICAgIGxldCBpbnB1dEFjdGlvbjogYW55O1xuICAgICAgbGV0IG9uQ2xvc2VTdWJqZWN0OiBTdWJqZWN0PG51bGw+O1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgb25DbG9zZVN1YmplY3QgPSBuZXcgU3ViamVjdDxudWxsPigpO1xuXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLmluaXRpYWxpemVNb2NrcygpO1xuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5zdWJzY3JpYmVUbyhpbnN0YW50aWF0b3IsICdub3RpZnknKTtcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIuY3JlYXRlTW9ja1NlcnZpY2VNZXRob2QoJ29wZW5Ob3RpZmljYXRpb25EaWFsb2cnLCAoKSA9PiBvbkNsb3NlU3ViamVjdCk7XG4gICAgICAgIG9uQ2xvc2VGdW5jdGlvbiA9IGphc21pbmUuY3JlYXRlU3B5KCdvbkNsb3NlJyk7XG4gICAgICAgIGlucHV0QWN0aW9uID0geyB0eXBlOiBOb3RpZmllckFjdGlvbnMuTm90aWZ5LlR5cGUsIG9wdGlvbnM6ICdzb21lIG9wdGlvbnMnLCBvbkNsb3NlOiBvbkNsb3NlRnVuY3Rpb24gfTtcbiAgICAgIH0pO1xuXG4gICAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5lZmZlY3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lc25cXCd0IGNhbGwgdGhlIG9uQ2xvc2UgbWV0aG9kIGJlZm9yZSB0aGUgZGlhbG9nIGlzIGNsb3NlZCcsICgpID0+IHtcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIuc2ltdWxhdGVJbnB1dEFjdGlvbihpbnB1dEFjdGlvbik7XG5cbiAgICAgICAgZXhwZWN0KG9uQ2xvc2VGdW5jdGlvbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgdGhlIG9uQ2xvc2UgbWV0aG9kIGFmdGVyIHRoZSBkaWFsb2cgaXMgY2xvc2VkJywgKCkgPT4ge1xuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5zaW11bGF0ZUlucHV0QWN0aW9uKGlucHV0QWN0aW9uKTtcblxuICAgICAgICBvbkNsb3NlU3ViamVjdC5uZXh0KCk7XG5cbiAgICAgICAgZXhwZWN0KG9uQ2xvc2VGdW5jdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
