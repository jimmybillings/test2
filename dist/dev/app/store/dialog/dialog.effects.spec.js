"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialog_effects_1 = require("./dialog.effects");
var DialogActions = require("./dialog.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Dialog Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new dialog_effects_1.DialogEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'showConfirmation',
            effectsInstantiator: instantiator,
            inputAction: {
                type: DialogActions.ShowConfirmation.Type,
                confirmationDialogOptions: { some: 'option' },
                onAccept: function () { },
                onDecline: function () { }
            },
            serviceMethod: {
                name: 'openConfirmationDialog',
                expectedArguments: [{ some: 'option' }, jasmine.any(Function), jasmine.any(Function)],
                returnsObservableOf: '',
            },
            outputActionFactories: {
                success: {
                    sectionName: 'dialog',
                    methodName: 'showConfirmationSuccess',
                    expectedArguments: []
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kaWFsb2cvZGlhbG9nLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFpRDtBQUNqRCxnREFBa0Q7QUFDbEQsMkVBQThGO0FBRTlGO0lBQ0UsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLElBQU0saUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVyRTtZQUNFLE1BQU0sQ0FBQyxJQUFJLDhCQUFhLENBQ3RCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3JHLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLGtCQUFrQjtZQUM5QixtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUk7Z0JBQ3pDLHlCQUF5QixFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDN0MsUUFBUSxFQUFFLGNBQVEsQ0FBQztnQkFDbkIsU0FBUyxFQUFFLGNBQVEsQ0FBQzthQUNyQjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckYsbUJBQW1CLEVBQUUsRUFBRTthQUN4QjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLFFBQVE7b0JBQ3JCLFVBQVUsRUFBRSx5QkFBeUI7b0JBQ3JDLGlCQUFpQixFQUFFLEVBQUU7aUJBQ3RCO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqQ0Qsb0JBaUNDIiwiZmlsZSI6ImFwcC9zdG9yZS9kaWFsb2cvZGlhbG9nLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpYWxvZ0VmZmVjdHMgfSBmcm9tICcuL2RpYWxvZy5lZmZlY3RzJztcbmltcG9ydCAqIGFzIERpYWxvZ0FjdGlvbnMgZnJvbSAnLi9kaWFsb2cuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciwgRWZmZWN0VGVzdFBhcmFtZXRlcnMgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnRGlhbG9nIEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogRGlhbG9nRWZmZWN0cyB7XG4gICAgICByZXR1cm4gbmV3IERpYWxvZ0VmZmVjdHMoXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTdG9yZSwgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1NlcnZpY2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2hvd0NvbmZpcm1hdGlvbicsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBEaWFsb2dBY3Rpb25zLlNob3dDb25maXJtYXRpb24uVHlwZSxcbiAgICAgICAgY29uZmlybWF0aW9uRGlhbG9nT3B0aW9uczogeyBzb21lOiAnb3B0aW9uJyB9LFxuICAgICAgICBvbkFjY2VwdDogKCkgPT4geyB9LFxuICAgICAgICBvbkRlY2xpbmU6ICgpID0+IHsgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ29wZW5Db25maXJtYXRpb25EaWFsb2cnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ29wdGlvbicgfSwgamFzbWluZS5hbnkoRnVuY3Rpb24pLCBqYXNtaW5lLmFueShGdW5jdGlvbildLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiAnJyxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnZGlhbG9nJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnc2hvd0NvbmZpcm1hdGlvblN1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
