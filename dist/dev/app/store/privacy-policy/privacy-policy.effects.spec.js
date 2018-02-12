"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var privacy_policy_effects_1 = require("./privacy-policy.effects");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Privacy Policy Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new privacy_policy_effects_1.PrivacyPolicyEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'load',
            effectsInstantiator: instantiator,
            inputAction: {
                type: '[Privacy Policy] Load',
                documentId: '12'
            },
            serviceMethod: {
                name: 'load',
                expectedArguments: ['12'],
                returnsObservableOf: 'some-document'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'privacyPolicy',
                    methodName: 'loadSuccess',
                    expectedArguments: ['some-document']
                },
                failure: {
                    sectionName: 'privacyPolicy',
                    methodName: 'loadFailure'
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5lZmZlY3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRUFBZ0U7QUFFaEUsMkVBQThGO0FBRTlGO0lBQ0UsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1FBQ2pDLElBQU0saUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVyRTtZQUNFLE1BQU0sQ0FBQyxJQUFJLDZDQUFvQixDQUM3QixpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxDQUNyRyxDQUFDO1FBQ0osQ0FBQztRQUVELGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUN6QixtQkFBbUIsRUFBRSxlQUFlO2FBQ3JDO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsZUFBZTtvQkFDNUIsVUFBVSxFQUFFLGFBQWE7b0JBQ3pCLGlCQUFpQixFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUNyQztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLGVBQWU7b0JBQzVCLFVBQVUsRUFBRSxhQUFhO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbkNELG9CQW1DQyIsImZpbGUiOiJhcHAvc3RvcmUvcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpdmFjeVBvbGljeUVmZmVjdHMgfSBmcm9tICcuL3ByaXZhY3ktcG9saWN5LmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgUHJpdmFjeVBvbGljeUFjdGlvbnMgZnJvbSAnLi9wcml2YWN5LXBvbGljeS5hY3Rpb25zJztcbmltcG9ydCB7IEVmZmVjdHNTcGVjSGVscGVyLCBFZmZlY3RUZXN0UGFyYW1ldGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdQcml2YWN5IFBvbGljeSBFZmZlY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVmZmVjdHNTcGVjSGVscGVyOiBFZmZlY3RzU3BlY0hlbHBlciA9IG5ldyBFZmZlY3RzU3BlY0hlbHBlcigpO1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IFByaXZhY3lQb2xpY3lFZmZlY3RzIHtcbiAgICAgIHJldHVybiBuZXcgUHJpdmFjeVBvbGljeUVmZmVjdHMoXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTdG9yZSwgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1NlcnZpY2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1ByaXZhY3kgUG9saWN5XSBMb2FkJyxcbiAgICAgICAgZG9jdW1lbnRJZDogJzEyJ1xuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWycxMiddLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiAnc29tZS1kb2N1bWVudCdcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncHJpdmFjeVBvbGljeScsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydzb21lLWRvY3VtZW50J11cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZToge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncHJpdmFjeVBvbGljeScsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRGYWlsdXJlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
