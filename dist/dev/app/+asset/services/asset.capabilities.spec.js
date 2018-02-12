"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asset_capabilities_1 = require("./asset.capabilities");
function main() {
    describe('Asset Capabilities', function () {
        var capabilitiesUnderTest;
        var mockCurrentUser;
        function instantiator(hasPerm) {
            mockCurrentUser = { hasPermission: function () { return hasPerm; } };
            return new asset_capabilities_1.AssetCapabilities(mockCurrentUser, null);
        }
        describe('viewAdvancedPlayer()', function () {
            describe('returns true', function () {
                it('when the user can create subclips', function () {
                    capabilitiesUnderTest = instantiator(true);
                    expect(capabilitiesUnderTest.viewAdvancedPlayer({ metadata: { 'Format.FrameRate': '27' } }, false));
                });
                it('when the asset is shared', function () {
                    capabilitiesUnderTest = instantiator(false);
                    expect(capabilitiesUnderTest.viewAdvancedPlayer({}, true));
                });
            });
            describe('returns false', function () {
                it('when the user cannot create subclips and the asset is not shared', function () {
                    capabilitiesUnderTest = instantiator(false);
                    expect(capabilitiesUnderTest.viewAdvancedPlayer({}, false));
                });
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvc2VydmljZXMvYXNzZXQuY2FwYWJpbGl0aWVzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBeUQ7QUFFekQ7SUFDRSxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDN0IsSUFBSSxxQkFBd0MsQ0FBQztRQUM3QyxJQUFJLGVBQW9CLENBQUM7UUFFekIsc0JBQXNCLE9BQWdCO1lBQ3BDLGVBQWUsR0FBRyxFQUFFLGFBQWEsRUFBRSxjQUFNLE9BQUEsT0FBTyxFQUFQLENBQU8sRUFBRSxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLHNDQUFpQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLFFBQVEsQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtvQkFDdEMscUJBQXFCLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMzQyxNQUFNLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsRUFBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzdHLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtvQkFDN0IscUJBQXFCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QyxNQUFNLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQUMsRUFBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsZUFBZSxFQUFFO2dCQUN4QixFQUFFLENBQUMsa0VBQWtFLEVBQUU7b0JBQ3JFLHFCQUFxQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLEVBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEvQkQsb0JBK0JDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2Fzc2V0L3NlcnZpY2VzL2Fzc2V0LmNhcGFiaWxpdGllcy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzZXRDYXBhYmlsaXRpZXMgfSBmcm9tICcuL2Fzc2V0LmNhcGFiaWxpdGllcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQXNzZXQgQ2FwYWJpbGl0aWVzJywgKCkgPT4ge1xuICAgIGxldCBjYXBhYmlsaXRpZXNVbmRlclRlc3Q6IEFzc2V0Q2FwYWJpbGl0aWVzO1xuICAgIGxldCBtb2NrQ3VycmVudFVzZXI6IGFueTtcblxuICAgIGZ1bmN0aW9uIGluc3RhbnRpYXRvcihoYXNQZXJtOiBib29sZWFuKSB7XG4gICAgICBtb2NrQ3VycmVudFVzZXIgPSB7IGhhc1Blcm1pc3Npb246ICgpID0+IGhhc1Blcm0gfTtcbiAgICAgIHJldHVybiBuZXcgQXNzZXRDYXBhYmlsaXRpZXMobW9ja0N1cnJlbnRVc2VyLCBudWxsKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgndmlld0FkdmFuY2VkUGxheWVyKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW4gY3JlYXRlIHN1YmNsaXBzJywgKCkgPT4ge1xuICAgICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdCA9IGluc3RhbnRpYXRvcih0cnVlKTtcbiAgICAgICAgICBleHBlY3QoY2FwYWJpbGl0aWVzVW5kZXJUZXN0LnZpZXdBZHZhbmNlZFBsYXllcih7IG1ldGFkYXRhOiB7ICdGb3JtYXQuRnJhbWVSYXRlJzogJzI3JyB9IH0gYXMgYW55LCBmYWxzZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgYXNzZXQgaXMgc2hhcmVkJywgKCkgPT4ge1xuICAgICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdCA9IGluc3RhbnRpYXRvcihmYWxzZSk7XG4gICAgICAgICAgZXhwZWN0KGNhcGFiaWxpdGllc1VuZGVyVGVzdC52aWV3QWR2YW5jZWRQbGF5ZXIoe30gYXMgYW55LCB0cnVlKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW5ub3QgY3JlYXRlIHN1YmNsaXBzIGFuZCB0aGUgYXNzZXQgaXMgbm90IHNoYXJlZCcsICgpID0+IHtcbiAgICAgICAgICBjYXBhYmlsaXRpZXNVbmRlclRlc3QgPSBpbnN0YW50aWF0b3IoZmFsc2UpO1xuICAgICAgICAgIGV4cGVjdChjYXBhYmlsaXRpZXNVbmRlclRlc3Qudmlld0FkdmFuY2VkUGxheWVyKHt9IGFzIGFueSwgZmFsc2UpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4iXX0=
