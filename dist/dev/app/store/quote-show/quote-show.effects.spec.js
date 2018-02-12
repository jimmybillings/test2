"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuoteShowActions = require("./quote-show.actions");
var quote_show_effects_1 = require("./quote-show.effects");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Quote Show Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new quote_show_effects_1.QuoteShowEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'load',
            effectsInstantiator: instantiator,
            inputAction: {
                type: QuoteShowActions.Load.Type,
                quoteId: 47
            },
            serviceMethod: {
                name: 'load',
                expectedArguments: [47],
                returnsObservableOf: { some: 'quote' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'quoteShow',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ some: 'quote' }]
                },
                failure: {
                    sectionName: 'quoteShow',
                    methodName: 'loadFailure'
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXlEO0FBQ3pELDJEQUF3RDtBQUN4RCwyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDN0IsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUkscUNBQWdCLENBQ3pCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3JHLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLE1BQU07WUFDbEIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNoQyxPQUFPLEVBQUUsRUFBRTthQUNaO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLGlCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUN2QixtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDdkM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxXQUFXO29CQUN4QixVQUFVLEVBQUUsYUFBYTtvQkFDekIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztpQkFDdkM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxXQUFXO29CQUN4QixVQUFVLEVBQUUsYUFBYTtpQkFDMUI7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5DRCxvQkFtQ0MiLCJmaWxlIjoiYXBwL3N0b3JlL3F1b3RlLXNob3cvcXVvdGUtc2hvdy5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBRdW90ZVNob3dBY3Rpb25zIGZyb20gJy4vcXVvdGUtc2hvdy5hY3Rpb25zJztcbmltcG9ydCB7IFF1b3RlU2hvd0VmZmVjdHMgfSBmcm9tICcuL3F1b3RlLXNob3cuZWZmZWN0cyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdRdW90ZSBTaG93IEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogYW55IHtcbiAgICAgIHJldHVybiBuZXcgUXVvdGVTaG93RWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFF1b3RlU2hvd0FjdGlvbnMuTG9hZC5UeXBlLFxuICAgICAgICBxdW90ZUlkOiA0N1xuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzQ3XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAncXVvdGUnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncXVvdGVTaG93JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZFN1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncXVvdGUnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3F1b3RlU2hvdycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRGYWlsdXJlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
