"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var account_effects_1 = require("./account.effects");
var AccountActions = require("./account.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Account Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new account_effects_1.AccountEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'getAccountForQuoteAdminSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: AccountActions.GetAccountForQuoteAdminSuccess.Type,
                account: { id: 1 }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'user',
                    methodName: 'getAllUsersByAccountId',
                    expectedArguments: [1]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'getAccountForQuoteAdmin',
            effectsInstantiator: instantiator,
            inputAction: {
                type: AccountActions.GetAccountForQuoteAdmin.Type,
                accountId: 1,
                onUserAdd: false
            },
            serviceMethod: {
                name: 'getAccount',
                expectedArguments: [1, 'onBeforeRequest'],
                returnsObservableOf: {
                    id: 1,
                    name: 'test',
                    salesOwner: 'sales owner',
                    paymentTermsDays: 'paymentTermsDays',
                    purchaseOnCredit: 'purchaseOnCredit',
                    creditExemption: 'creditExemption',
                    licensingVertical: 'licensingVertical',
                    invoiceContactId: 'invoiceContactId'
                }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'account',
                    methodName: 'getAccountForQuoteAdminSuccess',
                    expectedArguments: [{
                            id: 1,
                            name: 'test',
                            salesOwner: 'sales owner',
                            paymentTermsDays: 'paymentTermsDays',
                            purchaseOnCredit: 'purchaseOnCredit',
                            creditExemption: 'creditExemption',
                            licensingVertical: 'licensingVertical',
                            invoiceContactId: 'invoiceContactId'
                        }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'getAccountForQuoteAdmin',
            effectsInstantiator: instantiator,
            inputAction: {
                type: AccountActions.GetAccountForQuoteAdminOnUserAdd.Type,
                accountId: 1,
            },
            serviceMethod: {
                name: 'getAccount',
                expectedArguments: [1, 'onBeforeRequest'],
                returnsObservableOf: {
                    id: 1,
                    name: 'test',
                    salesOwner: 'sales owner',
                    paymentTermsDays: 'paymentTermsDays',
                    purchaseOnCredit: 'purchaseOnCredit',
                    creditExemption: 'creditExemption',
                    licensingVertical: 'licensingVertical',
                    invoiceContactId: 'invoiceContactId'
                }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'account',
                    methodName: 'getAccountForQuoteAdminOnUserAddSuccess',
                    expectedArguments: [{
                            id: 1,
                            name: 'test',
                            salesOwner: 'sales owner',
                            paymentTermsDays: 'paymentTermsDays',
                            purchaseOnCredit: 'purchaseOnCredit',
                            creditExemption: 'creditExemption',
                            licensingVertical: 'licensingVertical',
                            invoiceContactId: 'invoiceContactId'
                        }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'getAccountForQuoteAdmin',
            effectsInstantiator: instantiator,
            inputAction: {
                type: AccountActions.GetAccountForQuoteAdmin.Type,
                accountId: 1,
            },
            serviceMethod: {
                name: 'getAccount',
                expectedArguments: [1, 'onBeforeRequest'],
                returnsObservableOf: {
                    id: 1,
                    name: 'test',
                    invoiceContactId: 'invoiceContactId'
                }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'account',
                    methodName: 'getAccountForQuoteAdminSuccess',
                    expectedArguments: [{
                            id: 1,
                            name: 'test',
                            salesOwner: null,
                            paymentTermsDays: null,
                            purchaseOnCredit: null,
                            creditExemption: null,
                            licensingVertical: null,
                            invoiceContactId: 'invoiceContactId'
                        }]
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY2NvdW50L2FjY291bnQuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW1EO0FBQ25ELGtEQUFvRDtBQUNwRCwyRUFBOEY7QUFFOUY7SUFDRSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUksZ0NBQWMsQ0FDdkIsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FDckcsQ0FBQztRQUNKLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxVQUFVLEVBQUUsZ0NBQWdDO1lBQzVDLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxjQUFjLENBQUMsOEJBQThCLENBQUMsSUFBSTtnQkFDeEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTthQUNuQjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLE1BQU07b0JBQ25CLFVBQVUsRUFBRSx3QkFBd0I7b0JBQ3BDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUN2QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLHlCQUF5QjtZQUNyQyxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsY0FBYyxDQUFDLHVCQUF1QixDQUFDLElBQUk7Z0JBQ2pELFNBQVMsRUFBRSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxZQUFZO2dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLENB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NUMsaUJBQWlCLEVBQUUsQ0FBQzs0QkFDbEIsRUFBRSxFQUFFLENBQUM7NEJBQ0wsSUFBSSxFQUFFLE1BQU07NEJBQ1osVUFBVSxFQUFFLElBQUk7NEJBQ2hCLGdCQUFnQixFQUFFLElBQUk7NEJBQ3RCLGdCQUFnQixFQUFFLElBQUk7NEJBQ3RCLGVBQWUsRUFBRSxJQUFJOzRCQUNyQixpQkFBaUIsRUFBRSxJQUFJOzRCQUN2QixnQkFBZ0IsRUFBRSxrQkFBa0I7eUJBQ3JDLENBQUM7aUJBQ0g7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNJRCxvQkEySUMiLCJmaWxlIjoiYXBwL3N0b3JlL2FjY291bnQvYWNjb3VudC5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY2NvdW50RWZmZWN0cyB9IGZyb20gJy4vYWNjb3VudC5lZmZlY3RzJztcbmltcG9ydCAqIGFzIEFjY291bnRBY3Rpb25zIGZyb20gJy4vYWNjb3VudC5hY3Rpb25zJztcbmltcG9ydCB7IEVmZmVjdHNTcGVjSGVscGVyLCBFZmZlY3RUZXN0UGFyYW1ldGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdBY2NvdW50IEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogQWNjb3VudEVmZmVjdHMge1xuICAgICAgcmV0dXJuIG5ldyBBY2NvdW50RWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdnZXRBY2NvdW50Rm9yUXVvdGVBZG1pblN1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuR2V0QWNjb3VudEZvclF1b3RlQWRtaW5TdWNjZXNzLlR5cGUsXG4gICAgICAgIGFjY291bnQ6IHsgaWQ6IDEgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICd1c2VyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ2V0QWxsVXNlcnNCeUFjY291bnRJZCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdnZXRBY2NvdW50Rm9yUXVvdGVBZG1pbicsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5HZXRBY2NvdW50Rm9yUXVvdGVBZG1pbi5UeXBlLFxuICAgICAgICBhY2NvdW50SWQ6IDEsXG4gICAgICAgIG9uVXNlckFkZDogZmFsc2VcbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdnZXRBY2NvdW50JyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxLCAnb25CZWZvcmVSZXF1ZXN0J10sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHtcbiAgICAgICAgICBpZDogMSxcbiAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgc2FsZXNPd25lcjogJ3NhbGVzIG93bmVyJyxcbiAgICAgICAgICBwYXltZW50VGVybXNEYXlzOiAncGF5bWVudFRlcm1zRGF5cycsXG4gICAgICAgICAgcHVyY2hhc2VPbkNyZWRpdDogJ3B1cmNoYXNlT25DcmVkaXQnLFxuICAgICAgICAgIGNyZWRpdEV4ZW1wdGlvbjogJ2NyZWRpdEV4ZW1wdGlvbicsXG4gICAgICAgICAgbGljZW5zaW5nVmVydGljYWw6ICdsaWNlbnNpbmdWZXJ0aWNhbCcsXG4gICAgICAgICAgaW52b2ljZUNvbnRhY3RJZDogJ2ludm9pY2VDb250YWN0SWQnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYWNjb3VudCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2dldEFjY291bnRGb3JRdW90ZUFkbWluU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgIHNhbGVzT3duZXI6ICdzYWxlcyBvd25lcicsXG4gICAgICAgICAgICBwYXltZW50VGVybXNEYXlzOiAncGF5bWVudFRlcm1zRGF5cycsXG4gICAgICAgICAgICBwdXJjaGFzZU9uQ3JlZGl0OiAncHVyY2hhc2VPbkNyZWRpdCcsXG4gICAgICAgICAgICBjcmVkaXRFeGVtcHRpb246ICdjcmVkaXRFeGVtcHRpb24nLFxuICAgICAgICAgICAgbGljZW5zaW5nVmVydGljYWw6ICdsaWNlbnNpbmdWZXJ0aWNhbCcsXG4gICAgICAgICAgICBpbnZvaWNlQ29udGFjdElkOiAnaW52b2ljZUNvbnRhY3RJZCdcbiAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdnZXRBY2NvdW50Rm9yUXVvdGVBZG1pbicsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBY2NvdW50QWN0aW9ucy5HZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZC5UeXBlLFxuICAgICAgICBhY2NvdW50SWQ6IDEsXG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnZ2V0QWNjb3VudCcsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbMSwgJ29uQmVmb3JlUmVxdWVzdCddLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7XG4gICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgIHNhbGVzT3duZXI6ICdzYWxlcyBvd25lcicsXG4gICAgICAgICAgcGF5bWVudFRlcm1zRGF5czogJ3BheW1lbnRUZXJtc0RheXMnLFxuICAgICAgICAgIHB1cmNoYXNlT25DcmVkaXQ6ICdwdXJjaGFzZU9uQ3JlZGl0JyxcbiAgICAgICAgICBjcmVkaXRFeGVtcHRpb246ICdjcmVkaXRFeGVtcHRpb24nLFxuICAgICAgICAgIGxpY2Vuc2luZ1ZlcnRpY2FsOiAnbGljZW5zaW5nVmVydGljYWwnLFxuICAgICAgICAgIGludm9pY2VDb250YWN0SWQ6ICdpbnZvaWNlQ29udGFjdElkJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2FjY291bnQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdnZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZFN1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbe1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgICBzYWxlc093bmVyOiAnc2FsZXMgb3duZXInLFxuICAgICAgICAgICAgcGF5bWVudFRlcm1zRGF5czogJ3BheW1lbnRUZXJtc0RheXMnLFxuICAgICAgICAgICAgcHVyY2hhc2VPbkNyZWRpdDogJ3B1cmNoYXNlT25DcmVkaXQnLFxuICAgICAgICAgICAgY3JlZGl0RXhlbXB0aW9uOiAnY3JlZGl0RXhlbXB0aW9uJyxcbiAgICAgICAgICAgIGxpY2Vuc2luZ1ZlcnRpY2FsOiAnbGljZW5zaW5nVmVydGljYWwnLFxuICAgICAgICAgICAgaW52b2ljZUNvbnRhY3RJZDogJ2ludm9pY2VDb250YWN0SWQnXG4gICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZ2V0QWNjb3VudEZvclF1b3RlQWRtaW4nLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWNjb3VudEFjdGlvbnMuR2V0QWNjb3VudEZvclF1b3RlQWRtaW4uVHlwZSxcbiAgICAgICAgYWNjb3VudElkOiAxLFxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2dldEFjY291bnQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEsICdvbkJlZm9yZVJlcXVlc3QnXSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjoge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICBpbnZvaWNlQ29udGFjdElkOiAnaW52b2ljZUNvbnRhY3RJZCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhY2NvdW50JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ2V0QWNjb3VudEZvclF1b3RlQWRtaW5TdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3tcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgc2FsZXNPd25lcjogbnVsbCxcbiAgICAgICAgICAgIHBheW1lbnRUZXJtc0RheXM6IG51bGwsXG4gICAgICAgICAgICBwdXJjaGFzZU9uQ3JlZGl0OiBudWxsLFxuICAgICAgICAgICAgY3JlZGl0RXhlbXB0aW9uOiBudWxsLFxuICAgICAgICAgICAgbGljZW5zaW5nVmVydGljYWw6IG51bGwsXG4gICAgICAgICAgICBpbnZvaWNlQ29udGFjdElkOiAnaW52b2ljZUNvbnRhY3RJZCdcbiAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
