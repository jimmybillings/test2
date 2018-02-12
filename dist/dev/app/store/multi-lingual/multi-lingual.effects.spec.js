"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multi_lingual_effects_1 = require("./multi-lingual.effects");
var MultiLingualActions = require("./multi-lingual.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Multi Lingual Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        var mockApiConfig;
        function instantiator() {
            return new multi_lingual_effects_1.MultiLingualEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService, mockApiConfig);
        }
        beforeEach(function () {
            mockApiConfig = { baseUrl: 'http://cruxapi.com/', portal: 'commerce' };
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'setLanguage',
            comment: 'calls translate use with correct api endpoint url',
            effectsInstantiator: instantiator,
            inputAction: {
                type: MultiLingualActions.SetLanguage.Type,
                lang: 'en'
            },
            state: {
                storeSectionName: 'multiLingual',
                propertyName: 'lang',
                value: 'en'
            },
            serviceMethod: {
                name: 'use',
                expectedArguments: ["/cruxapi.com/identities-api/v1/translation/commerce/en"],
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9tdWx0aS1saW5ndWFsL211bHRpLWxpbmd1YWwuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQThEO0FBQzlELDZEQUErRDtBQUMvRCwyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsdUJBQXVCLEVBQUU7UUFDaEMsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBQ3JFLElBQUksYUFBa0IsQ0FBQztRQUN2QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLDJDQUFtQixDQUM1QixpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FDcEgsQ0FBQztRQUNKLENBQUM7UUFFRCxVQUFVLENBQUM7WUFDVCxhQUFhLEdBQUcsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLGFBQWE7WUFDekIsT0FBTyxFQUFFLG1EQUFtRDtZQUM1RCxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUk7Z0JBQzFDLElBQUksRUFBRSxJQUFJO2FBQ1g7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsZ0JBQWdCLEVBQUUsY0FBYztnQkFDaEMsWUFBWSxFQUFFLE1BQU07Z0JBQ3BCLEtBQUssRUFBRSxJQUFJO2FBQ1o7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsaUJBQWlCLEVBQUUsQ0FBQyx3REFBd0QsQ0FBQzthQUM5RTtTQUNGLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWxDRCxvQkFrQ0MiLCJmaWxlIjoiYXBwL3N0b3JlL211bHRpLWxpbmd1YWwvbXVsdGktbGluZ3VhbC5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNdWx0aUxpbmd1YWxFZmZlY3RzIH0gZnJvbSAnLi9tdWx0aS1saW5ndWFsLmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgTXVsdGlMaW5ndWFsQWN0aW9ucyBmcm9tICcuL211bHRpLWxpbmd1YWwuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdNdWx0aSBMaW5ndWFsIEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG4gICAgbGV0IG1vY2tBcGlDb25maWc6IGFueTtcbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogYW55IHtcbiAgICAgIHJldHVybiBuZXcgTXVsdGlMaW5ndWFsRWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZSwgbW9ja0FwaUNvbmZpZ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tBcGlDb25maWcgPSB7IGJhc2VVcmw6ICdodHRwOi8vY3J1eGFwaS5jb20vJywgcG9ydGFsOiAnY29tbWVyY2UnIH07XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdzZXRMYW5ndWFnZScsXG4gICAgICBjb21tZW50OiAnY2FsbHMgdHJhbnNsYXRlIHVzZSB3aXRoIGNvcnJlY3QgYXBpIGVuZHBvaW50IHVybCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBNdWx0aUxpbmd1YWxBY3Rpb25zLlNldExhbmd1YWdlLlR5cGUsXG4gICAgICAgIGxhbmc6ICdlbidcbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnbXVsdGlMaW5ndWFsJyxcbiAgICAgICAgcHJvcGVydHlOYW1lOiAnbGFuZycsXG4gICAgICAgIHZhbHVlOiAnZW4nXG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAndXNlJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtgL2NydXhhcGkuY29tL2lkZW50aXRpZXMtYXBpL3YxL3RyYW5zbGF0aW9uL2NvbW1lcmNlL2VuYF0sXG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSk7XG59XG4iXX0=
