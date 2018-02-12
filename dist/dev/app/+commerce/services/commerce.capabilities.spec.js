"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
var commerce_capabilities_1 = require("./commerce.capabilities");
function main() {
    describe('Commerce Capabilities', function () {
        var mockCurrentUserService;
        var mockStore;
        var mockFeature;
        var capabilitiesUnderTest;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockCurrentUserService = {};
            mockFeature = {};
            capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature);
        });
        describe('viewCartIcon()', function () {
            function instantiator(loggedIn, canBeFixed, permission) {
                mockCurrentUserService = { loggedIn: function () { return loggedIn; }, hasPermission: function () { return permission; } };
                mockStore.createStateSection('headerDisplayOptions', { canBeFixed: canBeFixed });
                mockFeature = { isAvailable: function () { return true; } };
                return capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature);
            }
            it('returns false when header can\'t be fixed and no permission', function () {
                capabilitiesUnderTest = instantiator(true, false, false);
                expect(capabilitiesUnderTest.viewCartIcon()).toBe(false);
            });
            it('returns false when header can be fixed but no permission', function () {
                capabilitiesUnderTest = instantiator(false, true, false);
                expect(capabilitiesUnderTest.viewCartIcon()).toBe(false);
            });
            it('returns false when header not expanded but has permission', function () {
                capabilitiesUnderTest = instantiator(false, false, true);
                expect(capabilitiesUnderTest.viewCartIcon()).toBe(false);
            });
            it('returns true when header is expanded and has permission', function () {
                capabilitiesUnderTest = instantiator(true, true, true);
                expect(capabilitiesUnderTest.viewCartIcon()).toBe(true);
            });
        });
        describe('purchaseOnCredit()', function () {
            var hasPurchaseOnCredit;
            beforeEach(function () {
                mockCurrentUserService = { hasPurchaseOnCredit: function () { return hasPurchaseOnCredit; } };
                mockFeature = { isAvailable: function () { return true; } };
            });
            it('returns false when User does not have purchaseOnCredit', function () {
                hasPurchaseOnCredit = false;
                expect(new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature).purchaseOnCredit())
                    .toBe(false);
            });
            it('returns true when User has purchaseOnCredit', function () {
                hasPurchaseOnCredit = true;
                expect(new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature).purchaseOnCredit())
                    .toBe(true);
            });
        });
        describe('editAddress', function () {
            it('should return true for an address of type \'User\' that has a valid address', function () {
                var addr = { type: 'User', address: {} };
                expect(capabilitiesUnderTest.editAddress(addr)).toBe(true);
            });
            it('should return false for an address of type \'Account\' that has a valid address', function () {
                var addr = { type: 'Account', address: {} };
                expect(capabilitiesUnderTest.editAddress(addr)).toBe(false);
            });
            it('should return false for an address of type \'User\' that does not have a valid address', function () {
                var addr = { type: 'Account' };
                expect(capabilitiesUnderTest.editAddress(addr)).toBe(false);
            });
        });
        describe('addAddress', function () {
            it('should return false for an address of type \'User\' that has a valid address', function () {
                var addr = { type: 'User', address: {} };
                expect(capabilitiesUnderTest.addAddress(addr)).toBe(false);
            });
            it('should return false for an address of type \'Account\' that does not have a valid address', function () {
                var addr = { type: 'Account' };
                expect(capabilitiesUnderTest.addAddress(addr)).toBe(false);
            });
            it('should return true for an address of type \'User\' that does not have a valid address', function () {
                var addr = { type: 'User' };
                expect(capabilitiesUnderTest.addAddress(addr)).toBe(true);
            });
        });
        describe('editAccountAddress', function () {
            var hasPermission, addr;
            beforeEach(function () {
                mockCurrentUserService = { hasPermission: function () { return hasPermission; } };
            });
            it('should return false if the User doesnt have the permission', function () {
                addr = { type: 'Account', address: {} };
                hasPermission = false;
                capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, null, null);
                expect(capabilitiesUnderTest.editAccountAddress(addr)).toBe(false);
            });
            it('should return false if the address is of type \'User\'', function () {
                addr = { type: 'User', address: {} };
                hasPermission = true;
                capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, null, null);
                expect(capabilitiesUnderTest.editAccountAddress(addr)).toBe(false);
            });
            it('should return false if there is no address', function () {
                addr = { type: 'Account' };
                hasPermission = true;
                capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, null, null);
                expect(capabilitiesUnderTest.editAccountAddress(addr)).toBe(false);
            });
            it('should return true if all conditions are met', function () {
                addr = { type: 'Account', address: {} };
                hasPermission = true;
                capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, null, null);
                expect(capabilitiesUnderTest.editAccountAddress(addr)).toBe(true);
            });
        });
        describe('addAccountAddress', function () {
            var hasPermission, addr;
            beforeEach(function () {
                mockCurrentUserService = { hasPermission: function () { return hasPermission; } };
            });
            it('should return false if the User doesnt have the permission', function () {
                addr = { type: 'Account' };
                hasPermission = false;
                capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, null, null);
                expect(capabilitiesUnderTest.addAccountAddress(addr)).toBe(false);
            });
            it('should return false if the address is of type \'User\'', function () {
                addr = { type: 'User' };
                hasPermission = true;
                capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, null, null);
                expect(capabilitiesUnderTest.addAccountAddress(addr)).toBe(false);
            });
            it('should return false if there is an address', function () {
                addr = { type: 'Account', address: {} };
                hasPermission = true;
                capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, null, null);
                expect(capabilitiesUnderTest.addAccountAddress(addr)).toBe(false);
            });
            it('should return true if all conditions are met', function () {
                addr = { type: 'Account' };
                hasPermission = true;
                capabilitiesUnderTest = new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, null, null);
                expect(capabilitiesUnderTest.addAccountAddress(addr)).toBe(true);
            });
        });
        describe('cloneQuote()', function () {
            var oneAsset = {
                'data': {
                    'lastUpdated': '2017-07-23T18:41:21Z',
                    'createdOn': '2017-07-23T18:20:00Z',
                    'id': 282,
                    'siteName': 'commerce',
                    'projects': [
                        {
                            'name': '2017-04-27',
                            'id': '390bec17-929b-452d-a2f4-27b7b04cb6ea',
                            'lineItems': [
                                {
                                    'asset': {
                                        'assetId': 33737670
                                    },
                                    'id': 'f642f893-f4cf-4a3c-ad5e-dc2d0cd1a321',
                                    'subTotal': 159
                                }
                            ],
                            'assetLineItemSubtotal': 159,
                            'feeLineItemSubtotal': 0,
                            'totalAmount': 79.5,
                            'subTotal': 159
                        }
                    ]
                }
            };
            var oneFeeItem = {
                'data': {
                    'lastUpdated': '2017-07-23T18:48:15Z',
                    'createdOn': '2017-07-23T18:20:00Z',
                    'id': 282,
                    'siteName': 'commerce',
                    'projects': [
                        {
                            'name': '2017-04-27',
                            'id': '390bec17-929b-452d-a2f4-27b7b04cb6ea',
                            'feeLineItems': [
                                {
                                    'amount': 60,
                                    'feeType': 'Research',
                                    'notes': '',
                                    'id': '3902a6f0-588f-4bfd-a0ee-2c02c864658f'
                                }
                            ],
                            'assetLineItemSubtotal': 0,
                            'feeLineItemSubtotal': 60,
                            'totalAmount': 60,
                            'subTotal': 60
                        }
                    ]
                }
            };
            var oneFeeItemAndOneAsset = {
                'data': {
                    'lastUpdated': '2017-07-23T18:46:52Z',
                    'createdOn': '2017-07-23T18:20:00Z',
                    'id': 282,
                    'siteName': 'commerce',
                    'projects': [{
                            'name': '2017-04-27',
                            'id': '390bec17-929b-452d-a2f4-27b7b04cb6ea',
                            'lineItems': [{
                                    'asset': {
                                        'assetId': 33737670
                                    },
                                    'id': 'f642f893-f4cf-4a3c-ad5e-dc2d0cd1a321',
                                    'subTotal': 159
                                }],
                            'feeLineItems': [{
                                    'amount': 60,
                                    'feeType': 'Research',
                                    'notes': '',
                                    'id': '3902a6f0-588f-4bfd-a0ee-2c02c864658f'
                                }],
                            'assetLineItemSubtotal': 159,
                            'feeLineItemSubtotal': 60,
                            'totalAmount': 139.5,
                            'subTotal': 219
                        }]
                }
            };
            var noFeeItemOrAsset = {
                'data': {
                    'lastUpdated': '2017-07-23T18:49:05Z',
                    'createdOn': '2017-07-23T18:20:00Z',
                    'id': 282,
                    'siteName': 'commerce',
                    'projects': [
                        {
                            'name': '2017-04-27',
                            'id': '390bec17-929b-452d-a2f4-27b7b04cb6ea',
                            'assetLineItemSubtotal': 0,
                            'feeLineItemSubtotal': 0,
                            'totalAmount': 0,
                            'subTotal': 0
                        }
                    ]
                }
            };
            var hasPermission = true;
            var mockCurrentUserService;
            beforeEach(function () {
                mockCurrentUserService = { hasPermission: function () { return hasPermission; } };
            });
            it('Should return true if a user has at least one asset', function () {
                new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature)
                    .cloneQuote(Observable_1.Observable.of(oneAsset))
                    .subscribe(function (result) {
                    expect(result).toBe(true);
                });
            });
            it('Should return true if a user has at least one fee item', function () {
                new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature)
                    .cloneQuote(Observable_1.Observable.of(oneFeeItem))
                    .subscribe(function (result) {
                    expect(result).toBe(true);
                });
            });
            it('Should return true if a user has both at least one asset AND one fee item', function () {
                new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature)
                    .cloneQuote(Observable_1.Observable.of(oneFeeItemAndOneAsset))
                    .subscribe(function (result) {
                    expect(result).toBe(true);
                });
            });
            it('Should return false if a user no assets or fee items', function () {
                new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature)
                    .cloneQuote(Observable_1.Observable.of(noFeeItemOrAsset))
                    .subscribe(function (result) {
                    expect(result).toBe(false);
                });
            });
        });
        describe('userHas()', function () {
            var hasPermission;
            beforeEach(function () {
                mockCurrentUserService = { hasPermission: function () { return hasPermission; } };
            });
            it('returns false when User does not have permission', function () {
                hasPermission = false;
                expect(new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature).userHas('whatever'))
                    .toBe(false);
            });
            it('returns true when User has permission', function () {
                hasPermission = true;
                expect(new commerce_capabilities_1.CommerceCapabilities(mockCurrentUserService, mockStore, mockFeature).userHas('whatever'))
                    .toBe(true);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2Uvc2VydmljZXMvY29tbWVyY2UuY2FwYWJpbGl0aWVzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFFN0MsMEVBQXVFO0FBQ3ZFLGlFQUErRDtBQUcvRDtJQUNFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtRQUNoQyxJQUFJLHNCQUEyQixDQUFDO1FBQ2hDLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLFdBQWdCLENBQUM7UUFDckIsSUFBSSxxQkFBMkMsQ0FBQztRQUVoRCxVQUFVLENBQUM7WUFDVCxTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDL0Isc0JBQXNCLEdBQUcsRUFBRSxDQUFDO1lBQzVCLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFakIscUJBQXFCLEdBQUcsSUFBSSw0Q0FBb0IsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkcsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsc0JBQXNCLFFBQWlCLEVBQUUsVUFBbUIsRUFBRSxVQUFtQjtnQkFDL0Usc0JBQXNCLEdBQUcsRUFBRSxRQUFRLEVBQUUsY0FBTSxPQUFBLFFBQVEsRUFBUixDQUFRLEVBQUUsYUFBYSxFQUFFLGNBQU0sT0FBQSxVQUFVLEVBQVYsQ0FBVSxFQUFFLENBQUM7Z0JBQ3ZGLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRixXQUFXLEdBQUcsRUFBRSxXQUFXLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxDQUFDLHFCQUFxQixHQUFHLElBQUksNENBQW9CLENBQUMsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzFHLENBQUM7WUFFRCxFQUFFLENBQUMsNkRBQTZELEVBQUU7Z0JBQ2hFLHFCQUFxQixHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsMERBQTBELEVBQUU7Z0JBQzdELHFCQUFxQixHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsMkRBQTJELEVBQUU7Z0JBQzlELHFCQUFxQixHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMseURBQXlELEVBQUU7Z0JBQzVELHFCQUFxQixHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixJQUFJLG1CQUE0QixDQUFDO1lBRWpDLFVBQVUsQ0FBQztnQkFDVCxzQkFBc0IsR0FBRyxFQUFFLG1CQUFtQixFQUFFLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsRUFBRSxDQUFDO2dCQUM1RSxXQUFXLEdBQUcsRUFBRSxXQUFXLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLEVBQUUsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx3REFBd0QsRUFBRTtnQkFDM0QsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUU1QixNQUFNLENBQUMsSUFBSSw0Q0FBb0IsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztxQkFDaEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFO2dCQUNoRCxtQkFBbUIsR0FBRyxJQUFJLENBQUM7Z0JBRTNCLE1BQU0sQ0FBQyxJQUFJLDRDQUFvQixDQUFDLHNCQUFzQixFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3FCQUNoRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEIsRUFBRSxDQUFDLDZFQUE2RSxFQUFFO2dCQUNoRixJQUFJLElBQUksR0FBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUM5QyxNQUFNLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGlGQUFpRixFQUFFO2dCQUNwRixJQUFJLElBQUksR0FBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNqRCxNQUFNLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHdGQUF3RixFQUFFO2dCQUMzRixJQUFJLElBQUksR0FBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztnQkFDcEMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUNyQixFQUFFLENBQUMsOEVBQThFLEVBQUU7Z0JBQ2pGLElBQUksSUFBSSxHQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsMkZBQTJGLEVBQUU7Z0JBQzlGLElBQUksSUFBSSxHQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2dCQUNwQyxNQUFNLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHVGQUF1RixFQUFFO2dCQUMxRixJQUFJLElBQUksR0FBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLElBQUksYUFBc0IsRUFBRSxJQUFTLENBQUM7WUFFdEMsVUFBVSxDQUFDO2dCQUNULHNCQUFzQixHQUFHLEVBQUUsYUFBYSxFQUFFLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxFQUFFLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsNERBQTRELEVBQUU7Z0JBQy9ELElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixxQkFBcUIsR0FBRyxJQUFJLDRDQUFvQixDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDckYsTUFBTSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO2dCQUMzRCxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDckMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDckIscUJBQXFCLEdBQUcsSUFBSSw0Q0FBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JGLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRTtnQkFDL0MsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2dCQUMzQixhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixxQkFBcUIsR0FBRyxJQUFJLDRDQUFvQixDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDckYsTUFBTSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO2dCQUNqRCxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDckIscUJBQXFCLEdBQUcsSUFBSSw0Q0FBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JGLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLElBQUksYUFBc0IsRUFBRSxJQUFTLENBQUM7WUFFdEMsVUFBVSxDQUFDO2dCQUNULHNCQUFzQixHQUFHLEVBQUUsYUFBYSxFQUFFLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxFQUFFLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsNERBQTRELEVBQUU7Z0JBQy9ELElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztnQkFDM0IsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDdEIscUJBQXFCLEdBQUcsSUFBSSw0Q0FBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JGLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx3REFBd0QsRUFBRTtnQkFDM0QsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO2dCQUN4QixhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixxQkFBcUIsR0FBRyxJQUFJLDRDQUFvQixDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDckYsTUFBTSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO2dCQUMvQyxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDckIscUJBQXFCLEdBQUcsSUFBSSw0Q0FBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JGLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtnQkFDakQsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2dCQUMzQixhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixxQkFBcUIsR0FBRyxJQUFJLDRDQUFvQixDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDckYsTUFBTSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBRXZCLElBQU0sUUFBUSxHQUFHO2dCQUNmLE1BQU0sRUFBRTtvQkFDTixhQUFhLEVBQUUsc0JBQXNCO29CQUNyQyxXQUFXLEVBQUUsc0JBQXNCO29CQUNuQyxJQUFJLEVBQUUsR0FBRztvQkFDVCxVQUFVLEVBQUUsVUFBVTtvQkFDdEIsVUFBVSxFQUFFO3dCQUNWOzRCQUNFLE1BQU0sRUFBRSxZQUFZOzRCQUNwQixJQUFJLEVBQUUsc0NBQXNDOzRCQUM1QyxXQUFXLEVBQUU7Z0NBQ1g7b0NBQ0UsT0FBTyxFQUFFO3dDQUNQLFNBQVMsRUFBRSxRQUFRO3FDQUNwQjtvQ0FDRCxJQUFJLEVBQUUsc0NBQXNDO29DQUM1QyxVQUFVLEVBQUUsR0FBRztpQ0FDaEI7NkJBQ0Y7NEJBQ0QsdUJBQXVCLEVBQUUsR0FBRzs0QkFDNUIscUJBQXFCLEVBQUUsQ0FBQzs0QkFDeEIsYUFBYSxFQUFFLElBQUk7NEJBQ25CLFVBQVUsRUFBRSxHQUFHO3lCQUNoQjtxQkFDRjtpQkFDRjthQUNGLENBQUM7WUFFRixJQUFNLFVBQVUsR0FBRztnQkFDakIsTUFBTSxFQUFFO29CQUNOLGFBQWEsRUFBRSxzQkFBc0I7b0JBQ3JDLFdBQVcsRUFBRSxzQkFBc0I7b0JBQ25DLElBQUksRUFBRSxHQUFHO29CQUNULFVBQVUsRUFBRSxVQUFVO29CQUN0QixVQUFVLEVBQUU7d0JBQ1Y7NEJBQ0UsTUFBTSxFQUFFLFlBQVk7NEJBQ3BCLElBQUksRUFBRSxzQ0FBc0M7NEJBQzVDLGNBQWMsRUFBRTtnQ0FDZDtvQ0FDRSxRQUFRLEVBQUUsRUFBRTtvQ0FDWixTQUFTLEVBQUUsVUFBVTtvQ0FDckIsT0FBTyxFQUFFLEVBQUU7b0NBQ1gsSUFBSSxFQUFFLHNDQUFzQztpQ0FDN0M7NkJBQ0Y7NEJBQ0QsdUJBQXVCLEVBQUUsQ0FBQzs0QkFDMUIscUJBQXFCLEVBQUUsRUFBRTs0QkFDekIsYUFBYSxFQUFFLEVBQUU7NEJBQ2pCLFVBQVUsRUFBRSxFQUFFO3lCQUNmO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQztZQUVGLElBQU0scUJBQXFCLEdBQUc7Z0JBQzVCLE1BQU0sRUFBRTtvQkFDTixhQUFhLEVBQUUsc0JBQXNCO29CQUNyQyxXQUFXLEVBQUUsc0JBQXNCO29CQUNuQyxJQUFJLEVBQUUsR0FBRztvQkFDVCxVQUFVLEVBQUUsVUFBVTtvQkFDdEIsVUFBVSxFQUFFLENBQUM7NEJBQ1gsTUFBTSxFQUFFLFlBQVk7NEJBQ3BCLElBQUksRUFBRSxzQ0FBc0M7NEJBQzVDLFdBQVcsRUFBRSxDQUFDO29DQUNaLE9BQU8sRUFBRTt3Q0FDUCxTQUFTLEVBQUUsUUFBUTtxQ0FDcEI7b0NBQ0QsSUFBSSxFQUFFLHNDQUFzQztvQ0FDNUMsVUFBVSxFQUFFLEdBQUc7aUNBQ2hCLENBQUM7NEJBQ0YsY0FBYyxFQUFFLENBQUM7b0NBQ2YsUUFBUSxFQUFFLEVBQUU7b0NBQ1osU0FBUyxFQUFFLFVBQVU7b0NBQ3JCLE9BQU8sRUFBRSxFQUFFO29DQUNYLElBQUksRUFBRSxzQ0FBc0M7aUNBQzdDLENBQUM7NEJBQ0YsdUJBQXVCLEVBQUUsR0FBRzs0QkFDNUIscUJBQXFCLEVBQUUsRUFBRTs0QkFDekIsYUFBYSxFQUFFLEtBQUs7NEJBQ3BCLFVBQVUsRUFBRSxHQUFHO3lCQUNoQixDQUFDO2lCQUNIO2FBQ0YsQ0FBQztZQUVGLElBQU0sZ0JBQWdCLEdBQUc7Z0JBQ3ZCLE1BQU0sRUFBRTtvQkFDTixhQUFhLEVBQUUsc0JBQXNCO29CQUNyQyxXQUFXLEVBQUUsc0JBQXNCO29CQUNuQyxJQUFJLEVBQUUsR0FBRztvQkFDVCxVQUFVLEVBQUUsVUFBVTtvQkFDdEIsVUFBVSxFQUFFO3dCQUNWOzRCQUNFLE1BQU0sRUFBRSxZQUFZOzRCQUNwQixJQUFJLEVBQUUsc0NBQXNDOzRCQUM1Qyx1QkFBdUIsRUFBRSxDQUFDOzRCQUMxQixxQkFBcUIsRUFBRSxDQUFDOzRCQUN4QixhQUFhLEVBQUUsQ0FBQzs0QkFDaEIsVUFBVSxFQUFFLENBQUM7eUJBQ2Q7cUJBQ0Y7aUJBQ0Y7YUFDRixDQUFDO1lBRUYsSUFBSSxhQUFhLEdBQVksSUFBSSxDQUFDO1lBQ2xDLElBQUksc0JBQTJCLENBQUM7WUFDaEMsVUFBVSxDQUFDO2dCQUNULHNCQUFzQixHQUFHLEVBQUUsYUFBYSxFQUFFLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxFQUFFLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMscURBQXFELEVBQUU7Z0JBQ3hELElBQUksNENBQW9CLENBQUMsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQztxQkFDckUsVUFBVSxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBUSxDQUFDO3FCQUMxQyxTQUFTLENBQUMsVUFBQyxNQUFlO29CQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO2dCQUMzRCxJQUFJLDRDQUFvQixDQUFDLHNCQUFzQixFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUM7cUJBQ3JFLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQVEsQ0FBQztxQkFDNUMsU0FBUyxDQUFDLFVBQUMsTUFBZTtvQkFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywyRUFBMkUsRUFBRTtnQkFDOUUsSUFBSSw0Q0FBb0IsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDO3FCQUNyRSxVQUFVLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQVEsQ0FBQztxQkFDdkQsU0FBUyxDQUFDLFVBQUMsTUFBZTtvQkFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxzREFBc0QsRUFBRTtnQkFDekQsSUFBSSw0Q0FBb0IsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDO3FCQUNyRSxVQUFVLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQVEsQ0FBQztxQkFDbEQsU0FBUyxDQUFDLFVBQUMsTUFBZTtvQkFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLGFBQXNCLENBQUM7WUFFM0IsVUFBVSxDQUFDO2dCQUNULHNCQUFzQixHQUFHLEVBQUUsYUFBYSxFQUFFLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxFQUFFLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsa0RBQWtELEVBQUU7Z0JBQ3JELGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBRXRCLE1BQU0sQ0FBQyxJQUFJLDRDQUFvQixDQUFDLHNCQUFzQixFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ2pHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRTtnQkFDMUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFFckIsTUFBTSxDQUFDLElBQUksNENBQW9CLENBQUMsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDakcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwVkQsb0JBb1ZDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlL3NlcnZpY2VzL2NvbW1lcmNlLmNhcGFiaWxpdGllcy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5pbXBvcnQgeyBDb21tZXJjZUNhcGFiaWxpdGllcyB9IGZyb20gJy4vY29tbWVyY2UuY2FwYWJpbGl0aWVzJztcbmltcG9ydCB7IFF1b3RlU3RhdGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NvbW1lcmNlIENhcGFiaWxpdGllcycsICgpID0+IHtcbiAgICBsZXQgbW9ja0N1cnJlbnRVc2VyU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgbW9ja0ZlYXR1cmU6IGFueTtcbiAgICBsZXQgY2FwYWJpbGl0aWVzVW5kZXJUZXN0OiBDb21tZXJjZUNhcGFiaWxpdGllcztcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHt9O1xuICAgICAgbW9ja0ZlYXR1cmUgPSB7fTtcblxuICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0ID0gbmV3IENvbW1lcmNlQ2FwYWJpbGl0aWVzKG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG1vY2tTdG9yZSwgbW9ja0ZlYXR1cmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ZpZXdDYXJ0SWNvbigpJywgKCkgPT4ge1xuICAgICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKGxvZ2dlZEluOiBib29sZWFuLCBjYW5CZUZpeGVkOiBib29sZWFuLCBwZXJtaXNzaW9uOiBib29sZWFuKSB7XG4gICAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7IGxvZ2dlZEluOiAoKSA9PiBsb2dnZWRJbiwgaGFzUGVybWlzc2lvbjogKCkgPT4gcGVybWlzc2lvbiB9O1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdoZWFkZXJEaXNwbGF5T3B0aW9ucycsIHsgY2FuQmVGaXhlZDogY2FuQmVGaXhlZCB9KTtcbiAgICAgICAgbW9ja0ZlYXR1cmUgPSB7IGlzQXZhaWxhYmxlOiAoKSA9PiB0cnVlIH07XG4gICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXNVbmRlclRlc3QgPSBuZXcgQ29tbWVyY2VDYXBhYmlsaXRpZXMobW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbW9ja1N0b3JlLCBtb2NrRmVhdHVyZSk7XG4gICAgICB9XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gaGVhZGVyIGNhblxcJ3QgYmUgZml4ZWQgYW5kIG5vIHBlcm1pc3Npb24nLCAoKSA9PiB7XG4gICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdCA9IGluc3RhbnRpYXRvcih0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICBleHBlY3QoY2FwYWJpbGl0aWVzVW5kZXJUZXN0LnZpZXdDYXJ0SWNvbigpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIGhlYWRlciBjYW4gYmUgZml4ZWQgYnV0IG5vIHBlcm1pc3Npb24nLCAoKSA9PiB7XG4gICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdCA9IGluc3RhbnRpYXRvcihmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICBleHBlY3QoY2FwYWJpbGl0aWVzVW5kZXJUZXN0LnZpZXdDYXJ0SWNvbigpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIGhlYWRlciBub3QgZXhwYW5kZWQgYnV0IGhhcyBwZXJtaXNzaW9uJywgKCkgPT4ge1xuICAgICAgICBjYXBhYmlsaXRpZXNVbmRlclRlc3QgPSBpbnN0YW50aWF0b3IoZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgZXhwZWN0KGNhcGFiaWxpdGllc1VuZGVyVGVzdC52aWV3Q2FydEljb24oKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGhlYWRlciBpcyBleHBhbmRlZCBhbmQgaGFzIHBlcm1pc3Npb24nLCAoKSA9PiB7XG4gICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdCA9IGluc3RhbnRpYXRvcih0cnVlLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgZXhwZWN0KGNhcGFiaWxpdGllc1VuZGVyVGVzdC52aWV3Q2FydEljb24oKSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3B1cmNoYXNlT25DcmVkaXQoKScsICgpID0+IHtcbiAgICAgIGxldCBoYXNQdXJjaGFzZU9uQ3JlZGl0OiBib29sZWFuO1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgaGFzUHVyY2hhc2VPbkNyZWRpdDogKCkgPT4gaGFzUHVyY2hhc2VPbkNyZWRpdCB9O1xuICAgICAgICBtb2NrRmVhdHVyZSA9IHsgaXNBdmFpbGFibGU6ICgpID0+IHRydWUgfTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIFVzZXIgZG9lcyBub3QgaGF2ZSBwdXJjaGFzZU9uQ3JlZGl0JywgKCkgPT4ge1xuICAgICAgICBoYXNQdXJjaGFzZU9uQ3JlZGl0ID0gZmFsc2U7XG5cbiAgICAgICAgZXhwZWN0KG5ldyBDb21tZXJjZUNhcGFiaWxpdGllcyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrU3RvcmUsIG1vY2tGZWF0dXJlKS5wdXJjaGFzZU9uQ3JlZGl0KCkpXG4gICAgICAgICAgLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBVc2VyIGhhcyBwdXJjaGFzZU9uQ3JlZGl0JywgKCkgPT4ge1xuICAgICAgICBoYXNQdXJjaGFzZU9uQ3JlZGl0ID0gdHJ1ZTtcblxuICAgICAgICBleHBlY3QobmV3IENvbW1lcmNlQ2FwYWJpbGl0aWVzKG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG1vY2tTdG9yZSwgbW9ja0ZlYXR1cmUpLnB1cmNoYXNlT25DcmVkaXQoKSlcbiAgICAgICAgICAudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXRBZGRyZXNzJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgYW4gYWRkcmVzcyBvZiB0eXBlIFxcJ1VzZXJcXCcgdGhhdCBoYXMgYSB2YWxpZCBhZGRyZXNzJywgKCkgPT4ge1xuICAgICAgICBsZXQgYWRkcjogYW55ID0geyB0eXBlOiAnVXNlcicsIGFkZHJlc3M6IHt9IH07XG4gICAgICAgIGV4cGVjdChjYXBhYmlsaXRpZXNVbmRlclRlc3QuZWRpdEFkZHJlc3MoYWRkcikpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIGFuIGFkZHJlc3Mgb2YgdHlwZSBcXCdBY2NvdW50XFwnIHRoYXQgaGFzIGEgdmFsaWQgYWRkcmVzcycsICgpID0+IHtcbiAgICAgICAgbGV0IGFkZHI6IGFueSA9IHsgdHlwZTogJ0FjY291bnQnLCBhZGRyZXNzOiB7fSB9O1xuICAgICAgICBleHBlY3QoY2FwYWJpbGl0aWVzVW5kZXJUZXN0LmVkaXRBZGRyZXNzKGFkZHIpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3IgYW4gYWRkcmVzcyBvZiB0eXBlIFxcJ1VzZXJcXCcgdGhhdCBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgYWRkcmVzcycsICgpID0+IHtcbiAgICAgICAgbGV0IGFkZHI6IGFueSA9IHsgdHlwZTogJ0FjY291bnQnIH07XG4gICAgICAgIGV4cGVjdChjYXBhYmlsaXRpZXNVbmRlclRlc3QuZWRpdEFkZHJlc3MoYWRkcikpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkQWRkcmVzcycsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBhbiBhZGRyZXNzIG9mIHR5cGUgXFwnVXNlclxcJyB0aGF0IGhhcyBhIHZhbGlkIGFkZHJlc3MnLCAoKSA9PiB7XG4gICAgICAgIGxldCBhZGRyOiBhbnkgPSB7IHR5cGU6ICdVc2VyJywgYWRkcmVzczoge30gfTtcbiAgICAgICAgZXhwZWN0KGNhcGFiaWxpdGllc1VuZGVyVGVzdC5hZGRBZGRyZXNzKGFkZHIpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3IgYW4gYWRkcmVzcyBvZiB0eXBlIFxcJ0FjY291bnRcXCcgdGhhdCBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgYWRkcmVzcycsICgpID0+IHtcbiAgICAgICAgbGV0IGFkZHI6IGFueSA9IHsgdHlwZTogJ0FjY291bnQnIH07XG4gICAgICAgIGV4cGVjdChjYXBhYmlsaXRpZXNVbmRlclRlc3QuYWRkQWRkcmVzcyhhZGRyKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgYW4gYWRkcmVzcyBvZiB0eXBlIFxcJ1VzZXJcXCcgdGhhdCBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgYWRkcmVzcycsICgpID0+IHtcbiAgICAgICAgbGV0IGFkZHI6IGFueSA9IHsgdHlwZTogJ1VzZXInIH07XG4gICAgICAgIGV4cGVjdChjYXBhYmlsaXRpZXNVbmRlclRlc3QuYWRkQWRkcmVzcyhhZGRyKSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXRBY2NvdW50QWRkcmVzcycsICgpID0+IHtcbiAgICAgIGxldCBoYXNQZXJtaXNzaW9uOiBib29sZWFuLCBhZGRyOiBhbnk7XG5cbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlID0geyBoYXNQZXJtaXNzaW9uOiAoKSA9PiBoYXNQZXJtaXNzaW9uIH07XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIFVzZXIgZG9lc250IGhhdmUgdGhlIHBlcm1pc3Npb24nLCAoKSA9PiB7XG4gICAgICAgIGFkZHIgPSB7IHR5cGU6ICdBY2NvdW50JywgYWRkcmVzczoge30gfTtcbiAgICAgICAgaGFzUGVybWlzc2lvbiA9IGZhbHNlO1xuICAgICAgICBjYXBhYmlsaXRpZXNVbmRlclRlc3QgPSBuZXcgQ29tbWVyY2VDYXBhYmlsaXRpZXMobW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbnVsbCwgbnVsbCk7XG4gICAgICAgIGV4cGVjdChjYXBhYmlsaXRpZXNVbmRlclRlc3QuZWRpdEFjY291bnRBZGRyZXNzKGFkZHIpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgYWRkcmVzcyBpcyBvZiB0eXBlIFxcJ1VzZXJcXCcnLCAoKSA9PiB7XG4gICAgICAgIGFkZHIgPSB7IHR5cGU6ICdVc2VyJywgYWRkcmVzczoge30gfTtcbiAgICAgICAgaGFzUGVybWlzc2lvbiA9IHRydWU7XG4gICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdCA9IG5ldyBDb21tZXJjZUNhcGFiaWxpdGllcyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBudWxsLCBudWxsKTtcbiAgICAgICAgZXhwZWN0KGNhcGFiaWxpdGllc1VuZGVyVGVzdC5lZGl0QWNjb3VudEFkZHJlc3MoYWRkcikpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZXJlIGlzIG5vIGFkZHJlc3MnLCAoKSA9PiB7XG4gICAgICAgIGFkZHIgPSB7IHR5cGU6ICdBY2NvdW50JyB9O1xuICAgICAgICBoYXNQZXJtaXNzaW9uID0gdHJ1ZTtcbiAgICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0ID0gbmV3IENvbW1lcmNlQ2FwYWJpbGl0aWVzKG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG51bGwsIG51bGwpO1xuICAgICAgICBleHBlY3QoY2FwYWJpbGl0aWVzVW5kZXJUZXN0LmVkaXRBY2NvdW50QWRkcmVzcyhhZGRyKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBhbGwgY29uZGl0aW9ucyBhcmUgbWV0JywgKCkgPT4ge1xuICAgICAgICBhZGRyID0geyB0eXBlOiAnQWNjb3VudCcsIGFkZHJlc3M6IHt9IH07XG4gICAgICAgIGhhc1Blcm1pc3Npb24gPSB0cnVlO1xuICAgICAgICBjYXBhYmlsaXRpZXNVbmRlclRlc3QgPSBuZXcgQ29tbWVyY2VDYXBhYmlsaXRpZXMobW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbnVsbCwgbnVsbCk7XG4gICAgICAgIGV4cGVjdChjYXBhYmlsaXRpZXNVbmRlclRlc3QuZWRpdEFjY291bnRBZGRyZXNzKGFkZHIpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkQWNjb3VudEFkZHJlc3MnLCAoKSA9PiB7XG4gICAgICBsZXQgaGFzUGVybWlzc2lvbjogYm9vbGVhbiwgYWRkcjogYW55O1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgaGFzUGVybWlzc2lvbjogKCkgPT4gaGFzUGVybWlzc2lvbiB9O1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBVc2VyIGRvZXNudCBoYXZlIHRoZSBwZXJtaXNzaW9uJywgKCkgPT4ge1xuICAgICAgICBhZGRyID0geyB0eXBlOiAnQWNjb3VudCcgfTtcbiAgICAgICAgaGFzUGVybWlzc2lvbiA9IGZhbHNlO1xuICAgICAgICBjYXBhYmlsaXRpZXNVbmRlclRlc3QgPSBuZXcgQ29tbWVyY2VDYXBhYmlsaXRpZXMobW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbnVsbCwgbnVsbCk7XG4gICAgICAgIGV4cGVjdChjYXBhYmlsaXRpZXNVbmRlclRlc3QuYWRkQWNjb3VudEFkZHJlc3MoYWRkcikpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBhZGRyZXNzIGlzIG9mIHR5cGUgXFwnVXNlclxcJycsICgpID0+IHtcbiAgICAgICAgYWRkciA9IHsgdHlwZTogJ1VzZXInIH07XG4gICAgICAgIGhhc1Blcm1pc3Npb24gPSB0cnVlO1xuICAgICAgICBjYXBhYmlsaXRpZXNVbmRlclRlc3QgPSBuZXcgQ29tbWVyY2VDYXBhYmlsaXRpZXMobW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbnVsbCwgbnVsbCk7XG4gICAgICAgIGV4cGVjdChjYXBhYmlsaXRpZXNVbmRlclRlc3QuYWRkQWNjb3VudEFkZHJlc3MoYWRkcikpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZXJlIGlzIGFuIGFkZHJlc3MnLCAoKSA9PiB7XG4gICAgICAgIGFkZHIgPSB7IHR5cGU6ICdBY2NvdW50JywgYWRkcmVzczoge30gfTtcbiAgICAgICAgaGFzUGVybWlzc2lvbiA9IHRydWU7XG4gICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdCA9IG5ldyBDb21tZXJjZUNhcGFiaWxpdGllcyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBudWxsLCBudWxsKTtcbiAgICAgICAgZXhwZWN0KGNhcGFiaWxpdGllc1VuZGVyVGVzdC5hZGRBY2NvdW50QWRkcmVzcyhhZGRyKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBhbGwgY29uZGl0aW9ucyBhcmUgbWV0JywgKCkgPT4ge1xuICAgICAgICBhZGRyID0geyB0eXBlOiAnQWNjb3VudCcgfTtcbiAgICAgICAgaGFzUGVybWlzc2lvbiA9IHRydWU7XG4gICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdCA9IG5ldyBDb21tZXJjZUNhcGFiaWxpdGllcyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBudWxsLCBudWxsKTtcbiAgICAgICAgZXhwZWN0KGNhcGFiaWxpdGllc1VuZGVyVGVzdC5hZGRBY2NvdW50QWRkcmVzcyhhZGRyKSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Nsb25lUXVvdGUoKScsICgpID0+IHtcblxuICAgICAgY29uc3Qgb25lQXNzZXQgPSB7XG4gICAgICAgICdkYXRhJzoge1xuICAgICAgICAgICdsYXN0VXBkYXRlZCc6ICcyMDE3LTA3LTIzVDE4OjQxOjIxWicsXG4gICAgICAgICAgJ2NyZWF0ZWRPbic6ICcyMDE3LTA3LTIzVDE4OjIwOjAwWicsXG4gICAgICAgICAgJ2lkJzogMjgyLFxuICAgICAgICAgICdzaXRlTmFtZSc6ICdjb21tZXJjZScsXG4gICAgICAgICAgJ3Byb2plY3RzJzogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAnbmFtZSc6ICcyMDE3LTA0LTI3JyxcbiAgICAgICAgICAgICAgJ2lkJzogJzM5MGJlYzE3LTkyOWItNDUyZC1hMmY0LTI3YjdiMDRjYjZlYScsXG4gICAgICAgICAgICAgICdsaW5lSXRlbXMnOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgJ2Fzc2V0Jzoge1xuICAgICAgICAgICAgICAgICAgICAnYXNzZXRJZCc6IDMzNzM3NjcwXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2lkJzogJ2Y2NDJmODkzLWY0Y2YtNGEzYy1hZDVlLWRjMmQwY2QxYTMyMScsXG4gICAgICAgICAgICAgICAgICAnc3ViVG90YWwnOiAxNTlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICdhc3NldExpbmVJdGVtU3VidG90YWwnOiAxNTksXG4gICAgICAgICAgICAgICdmZWVMaW5lSXRlbVN1YnRvdGFsJzogMCxcbiAgICAgICAgICAgICAgJ3RvdGFsQW1vdW50JzogNzkuNSxcbiAgICAgICAgICAgICAgJ3N1YlRvdGFsJzogMTU5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvbmVGZWVJdGVtID0ge1xuICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAnbGFzdFVwZGF0ZWQnOiAnMjAxNy0wNy0yM1QxODo0ODoxNVonLFxuICAgICAgICAgICdjcmVhdGVkT24nOiAnMjAxNy0wNy0yM1QxODoyMDowMFonLFxuICAgICAgICAgICdpZCc6IDI4MixcbiAgICAgICAgICAnc2l0ZU5hbWUnOiAnY29tbWVyY2UnLFxuICAgICAgICAgICdwcm9qZWN0cyc6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgJ25hbWUnOiAnMjAxNy0wNC0yNycsXG4gICAgICAgICAgICAgICdpZCc6ICczOTBiZWMxNy05MjliLTQ1MmQtYTJmNC0yN2I3YjA0Y2I2ZWEnLFxuICAgICAgICAgICAgICAnZmVlTGluZUl0ZW1zJzogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICdhbW91bnQnOiA2MCxcbiAgICAgICAgICAgICAgICAgICdmZWVUeXBlJzogJ1Jlc2VhcmNoJyxcbiAgICAgICAgICAgICAgICAgICdub3Rlcyc6ICcnLFxuICAgICAgICAgICAgICAgICAgJ2lkJzogJzM5MDJhNmYwLTU4OGYtNGJmZC1hMGVlLTJjMDJjODY0NjU4ZidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICdhc3NldExpbmVJdGVtU3VidG90YWwnOiAwLFxuICAgICAgICAgICAgICAnZmVlTGluZUl0ZW1TdWJ0b3RhbCc6IDYwLFxuICAgICAgICAgICAgICAndG90YWxBbW91bnQnOiA2MCxcbiAgICAgICAgICAgICAgJ3N1YlRvdGFsJzogNjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9uZUZlZUl0ZW1BbmRPbmVBc3NldCA9IHtcbiAgICAgICAgJ2RhdGEnOiB7XG4gICAgICAgICAgJ2xhc3RVcGRhdGVkJzogJzIwMTctMDctMjNUMTg6NDY6NTJaJyxcbiAgICAgICAgICAnY3JlYXRlZE9uJzogJzIwMTctMDctMjNUMTg6MjA6MDBaJyxcbiAgICAgICAgICAnaWQnOiAyODIsXG4gICAgICAgICAgJ3NpdGVOYW1lJzogJ2NvbW1lcmNlJyxcbiAgICAgICAgICAncHJvamVjdHMnOiBbe1xuICAgICAgICAgICAgJ25hbWUnOiAnMjAxNy0wNC0yNycsXG4gICAgICAgICAgICAnaWQnOiAnMzkwYmVjMTctOTI5Yi00NTJkLWEyZjQtMjdiN2IwNGNiNmVhJyxcbiAgICAgICAgICAgICdsaW5lSXRlbXMnOiBbe1xuICAgICAgICAgICAgICAnYXNzZXQnOiB7XG4gICAgICAgICAgICAgICAgJ2Fzc2V0SWQnOiAzMzczNzY3MFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnaWQnOiAnZjY0MmY4OTMtZjRjZi00YTNjLWFkNWUtZGMyZDBjZDFhMzIxJyxcbiAgICAgICAgICAgICAgJ3N1YlRvdGFsJzogMTU5XG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICdmZWVMaW5lSXRlbXMnOiBbe1xuICAgICAgICAgICAgICAnYW1vdW50JzogNjAsXG4gICAgICAgICAgICAgICdmZWVUeXBlJzogJ1Jlc2VhcmNoJyxcbiAgICAgICAgICAgICAgJ25vdGVzJzogJycsXG4gICAgICAgICAgICAgICdpZCc6ICczOTAyYTZmMC01ODhmLTRiZmQtYTBlZS0yYzAyYzg2NDY1OGYnXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICdhc3NldExpbmVJdGVtU3VidG90YWwnOiAxNTksXG4gICAgICAgICAgICAnZmVlTGluZUl0ZW1TdWJ0b3RhbCc6IDYwLFxuICAgICAgICAgICAgJ3RvdGFsQW1vdW50JzogMTM5LjUsXG4gICAgICAgICAgICAnc3ViVG90YWwnOiAyMTlcbiAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBub0ZlZUl0ZW1PckFzc2V0ID0ge1xuICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAnbGFzdFVwZGF0ZWQnOiAnMjAxNy0wNy0yM1QxODo0OTowNVonLFxuICAgICAgICAgICdjcmVhdGVkT24nOiAnMjAxNy0wNy0yM1QxODoyMDowMFonLFxuICAgICAgICAgICdpZCc6IDI4MixcbiAgICAgICAgICAnc2l0ZU5hbWUnOiAnY29tbWVyY2UnLFxuICAgICAgICAgICdwcm9qZWN0cyc6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgJ25hbWUnOiAnMjAxNy0wNC0yNycsXG4gICAgICAgICAgICAgICdpZCc6ICczOTBiZWMxNy05MjliLTQ1MmQtYTJmNC0yN2I3YjA0Y2I2ZWEnLFxuICAgICAgICAgICAgICAnYXNzZXRMaW5lSXRlbVN1YnRvdGFsJzogMCxcbiAgICAgICAgICAgICAgJ2ZlZUxpbmVJdGVtU3VidG90YWwnOiAwLFxuICAgICAgICAgICAgICAndG90YWxBbW91bnQnOiAwLFxuICAgICAgICAgICAgICAnc3ViVG90YWwnOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBsZXQgaGFzUGVybWlzc2lvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgICBsZXQgbW9ja0N1cnJlbnRVc2VyU2VydmljZTogYW55O1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7IGhhc1Blcm1pc3Npb246ICgpID0+IGhhc1Blcm1pc3Npb24gfTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIHJldHVybiB0cnVlIGlmIGEgdXNlciBoYXMgYXQgbGVhc3Qgb25lIGFzc2V0JywgKCkgPT4ge1xuICAgICAgICBuZXcgQ29tbWVyY2VDYXBhYmlsaXRpZXMobW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbW9ja1N0b3JlLCBtb2NrRmVhdHVyZSlcbiAgICAgICAgICAuY2xvbmVRdW90ZShPYnNlcnZhYmxlLm9mKG9uZUFzc2V0KSBhcyBhbnkpXG4gICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlKHRydWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIHRydWUgaWYgYSB1c2VyIGhhcyBhdCBsZWFzdCBvbmUgZmVlIGl0ZW0nLCAoKSA9PiB7XG4gICAgICAgIG5ldyBDb21tZXJjZUNhcGFiaWxpdGllcyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrU3RvcmUsIG1vY2tGZWF0dXJlKVxuICAgICAgICAgIC5jbG9uZVF1b3RlKE9ic2VydmFibGUub2Yob25lRmVlSXRlbSkgYXMgYW55KVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZSh0cnVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIHJldHVybiB0cnVlIGlmIGEgdXNlciBoYXMgYm90aCBhdCBsZWFzdCBvbmUgYXNzZXQgQU5EIG9uZSBmZWUgaXRlbScsICgpID0+IHtcbiAgICAgICAgbmV3IENvbW1lcmNlQ2FwYWJpbGl0aWVzKG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG1vY2tTdG9yZSwgbW9ja0ZlYXR1cmUpXG4gICAgICAgICAgLmNsb25lUXVvdGUoT2JzZXJ2YWJsZS5vZihvbmVGZWVJdGVtQW5kT25lQXNzZXQpIGFzIGFueSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gZmFsc2UgaWYgYSB1c2VyIG5vIGFzc2V0cyBvciBmZWUgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIG5ldyBDb21tZXJjZUNhcGFiaWxpdGllcyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrU3RvcmUsIG1vY2tGZWF0dXJlKVxuICAgICAgICAgIC5jbG9uZVF1b3RlKE9ic2VydmFibGUub2Yobm9GZWVJdGVtT3JBc3NldCkgYXMgYW55KVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZShmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd1c2VySGFzKCknLCAoKSA9PiB7XG4gICAgICBsZXQgaGFzUGVybWlzc2lvbjogYm9vbGVhbjtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7IGhhc1Blcm1pc3Npb246ICgpID0+IGhhc1Blcm1pc3Npb24gfTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIFVzZXIgZG9lcyBub3QgaGF2ZSBwZXJtaXNzaW9uJywgKCkgPT4ge1xuICAgICAgICBoYXNQZXJtaXNzaW9uID0gZmFsc2U7XG5cbiAgICAgICAgZXhwZWN0KG5ldyBDb21tZXJjZUNhcGFiaWxpdGllcyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrU3RvcmUsIG1vY2tGZWF0dXJlKS51c2VySGFzKCd3aGF0ZXZlcicpKVxuICAgICAgICAgIC50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gVXNlciBoYXMgcGVybWlzc2lvbicsICgpID0+IHtcbiAgICAgICAgaGFzUGVybWlzc2lvbiA9IHRydWU7XG5cbiAgICAgICAgZXhwZWN0KG5ldyBDb21tZXJjZUNhcGFiaWxpdGllcyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrU3RvcmUsIG1vY2tGZWF0dXJlKS51c2VySGFzKCd3aGF0ZXZlcicpKVxuICAgICAgICAgIC50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==
