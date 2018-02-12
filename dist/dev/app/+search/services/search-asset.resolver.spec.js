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
var search_asset_resolver_1 = require("./search-asset.resolver");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Search Asset Resolver', function () {
        var resolverUnderTest;
        var mockStore;
        var relevantParameters = {
            id: 'some id', share_key: 'some share_key', timeEnd: 'some timeEnd', timeStart: 'some timeStart'
        };
        var mockRoute = { params: __assign({}, relevantParameters, { other: 'useless stuff' }) };
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            resolverUnderTest = new search_asset_resolver_1.SearchAssetResolver(mockStore);
        });
        describe('resolve()', function () {
            it('dispatches the expected action', function () {
                mockStore.createStateElement('asset', 'loading', true);
                var spy = mockStore.createActionFactoryMethod('asset', 'loadSearchAsset');
                resolverUnderTest.resolve(mockRoute);
                mockStore.expectDispatchFor(spy, relevantParameters);
            });
            describe('returns an Observable that', function () {
                beforeEach(function () {
                    mockStore.createActionFactoryMethod('asset', 'loadSearchAsset');
                });
                it('does not emit when the asset is still loading', function () {
                    mockStore.createStateElement('asset', 'loading', true);
                    expect(function () {
                        resolverUnderTest.resolve(mockRoute).subscribe(function () {
                            throw new Error('Should not get here!');
                        });
                    }).not.toThrow();
                });
                it('emits when the asset is done loading', function () {
                    mockStore.createStateElement('asset', 'loading', false);
                    expect(function () {
                        resolverUnderTest.resolve(mockRoute).subscribe(function () {
                            throw new Error('Should get here!');
                        });
                    }).toThrow();
                });
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlcnZpY2VzL3NlYXJjaC1hc3NldC5yZXNvbHZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSxpRUFBOEQ7QUFDOUQsMEVBQXVFO0FBRXZFO0lBQ0UsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1FBQ2hDLElBQUksaUJBQXNDLENBQUM7UUFDM0MsSUFBSSxTQUF1QixDQUFDO1FBRTVCLElBQU0sa0JBQWtCLEdBQUc7WUFDekIsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCO1NBQ2pHLENBQUM7UUFDRixJQUFNLFNBQVMsR0FBRyxFQUFFLE1BQU0sZUFBTyxrQkFBa0IsSUFBRSxLQUFLLEVBQUUsZUFBZSxHQUFFLEVBQUUsQ0FBQztRQUVoRixVQUFVLENBQUM7WUFDVCxTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDL0IsaUJBQWlCLEdBQUcsSUFBSSwyQ0FBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO2dCQUNuQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdkQsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUU1RSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBZ0IsQ0FBQyxDQUFDO2dCQUU1QyxTQUFTLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsNEJBQTRCLEVBQUU7Z0JBQ3JDLFVBQVUsQ0FBQztvQkFDVCxTQUFTLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2xFLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtvQkFDbEQsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBRXZELE1BQU0sQ0FBQzt3QkFDTCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs0QkFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3dCQUMxQyxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtvQkFDekMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBRXhELE1BQU0sQ0FBQzt3QkFDTCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs0QkFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUN0QyxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwREQsb0JBb0RDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK3NlYXJjaC9zZXJ2aWNlcy9zZWFyY2gtYXNzZXQucmVzb2x2ZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IFNlYXJjaEFzc2V0UmVzb2x2ZXIgfSBmcm9tICcuL3NlYXJjaC1hc3NldC5yZXNvbHZlcic7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1NlYXJjaCBBc3NldCBSZXNvbHZlcicsICgpID0+IHtcbiAgICBsZXQgcmVzb2x2ZXJVbmRlclRlc3Q6IFNlYXJjaEFzc2V0UmVzb2x2ZXI7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuXG4gICAgY29uc3QgcmVsZXZhbnRQYXJhbWV0ZXJzID0ge1xuICAgICAgaWQ6ICdzb21lIGlkJywgc2hhcmVfa2V5OiAnc29tZSBzaGFyZV9rZXknLCB0aW1lRW5kOiAnc29tZSB0aW1lRW5kJywgdGltZVN0YXJ0OiAnc29tZSB0aW1lU3RhcnQnXG4gICAgfTtcbiAgICBjb25zdCBtb2NrUm91dGUgPSB7IHBhcmFtczogeyAuLi5yZWxldmFudFBhcmFtZXRlcnMsIG90aGVyOiAndXNlbGVzcyBzdHVmZicgfSB9O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICByZXNvbHZlclVuZGVyVGVzdCA9IG5ldyBTZWFyY2hBc3NldFJlc29sdmVyKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2Rpc3BhdGNoZXMgdGhlIGV4cGVjdGVkIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlRWxlbWVudCgnYXNzZXQnLCAnbG9hZGluZycsIHRydWUpO1xuICAgICAgICBjb25zdCBzcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnYXNzZXQnLCAnbG9hZFNlYXJjaEFzc2V0Jyk7XG5cbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUgYXMgYW55KTtcblxuICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3Ioc3B5LCByZWxldmFudFBhcmFtZXRlcnMpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCcsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2Fzc2V0JywgJ2xvYWRTZWFyY2hBc3NldCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgZW1pdCB3aGVuIHRoZSBhc3NldCBpcyBzdGlsbCBsb2FkaW5nJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZUVsZW1lbnQoJ2Fzc2V0JywgJ2xvYWRpbmcnLCB0cnVlKTtcblxuICAgICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKG1vY2tSb3V0ZSBhcyBhbnkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBnZXQgaGVyZSEnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdlbWl0cyB3aGVuIHRoZSBhc3NldCBpcyBkb25lIGxvYWRpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlRWxlbWVudCgnYXNzZXQnLCAnbG9hZGluZycsIGZhbHNlKTtcblxuICAgICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKG1vY2tSb3V0ZSBhcyBhbnkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIGdldCBoZXJlIScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG4iXX0=
