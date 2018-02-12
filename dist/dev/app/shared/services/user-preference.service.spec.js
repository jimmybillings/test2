"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_preference_service_1 = require("./user-preference.service");
var Observable_1 = require("rxjs/Observable");
var mock_api_service_1 = require("../mocks/mock-api.service");
var api_interface_1 = require("../interfaces/api.interface");
function main() {
    describe('UserPreferenceService', function () {
        var serviceUnderTest;
        var mockCurrentUserServiceService;
        var mockStore;
        var mockApi;
        mockCurrentUserServiceService = {
            loggedIn: function () { return false; }
        };
        var data = { displayFilterCounts: false, collectionTrayIsOpen: false, searchIsOpen: true, sortId: 0 };
        mockStore = {
            dispatch: function (_) { return Object.assign(data, _.payload); },
            select: function (_) { return Observable_1.Observable.of(data); }
        };
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApi = new mock_api_service_1.MockApiService();
            mockApi.getResponse = { prefs: { displayFilterCounts: 'false', collectionTrayIsOpen: 'true' } };
            serviceUnderTest = new user_preference_service_1.UserPreferenceService(mockCurrentUserServiceService, mockStore, mockApi.injector);
            serviceUnderTest.reset();
        });
        it('Should have a state() getter method that returns the state of the store', function () {
            expect(serviceUnderTest.state).toEqual({
                displayFilterCounts: false, collectionTrayIsOpen: false,
                searchIsOpen: true, sortId: 0, displayFilterTree: false, assetView: 'grid',
                pricingPreferences: {}
            });
        });
        it('should have a getPrefs() method that calls the api', function () {
            serviceUnderTest.getPrefs();
            expect(mockApi.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
            expect(mockApi.get).toHaveBeenCalledWithEndpoint('userPreferences');
        });
        it('Should have a toggleSearch method that toggles the searchIsOpen property', function () {
            expect(serviceUnderTest.state.searchIsOpen).toEqual(true);
            serviceUnderTest.toggleSearch();
            expect(serviceUnderTest.state.searchIsOpen).toEqual(false);
            serviceUnderTest.toggleSearch();
            expect(serviceUnderTest.state.searchIsOpen).toEqual(true);
        });
        it('Should have a closeSearch method that sets the searchIsOpen property to false', function () {
            expect(serviceUnderTest.state.searchIsOpen).toEqual(true);
            serviceUnderTest.closeSearch();
            expect(serviceUnderTest.state.searchIsOpen).toEqual(false);
        });
        it('Should have a toggleCollectionTray method that toggles the collectionTrayIsOpen property', function () {
            expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(false);
            serviceUnderTest.openCollectionTray();
            expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(true);
            serviceUnderTest.toggleCollectionTray();
            expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(false);
        });
        it('Should have a openCollectionTray method that sets the collectionTrayIsOpen property to true', function () {
            expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(false);
            serviceUnderTest.openCollectionTray();
            expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(true);
        });
        it('Should have an updateSortPreference() method that takes a sortId and sets it in the store', function () {
            expect(serviceUnderTest.state.sortId).toEqual(0);
            serviceUnderTest.updateSortPreference(16);
            expect(serviceUnderTest.state.sortId).toEqual(16);
        });
        it('Should have an updateAssetViewPreference() method that takes an asset view type and sets it in the store', function () {
            expect(serviceUnderTest.state.assetView).toEqual('grid');
            serviceUnderTest.updateAssetViewPreference('list');
            expect(serviceUnderTest.state.assetView).toEqual('list');
        });
        it('should have a toggleFilterCount() method that updates the displayFilterCounts property in the store', function () {
            expect(serviceUnderTest.state.displayFilterCounts).toBe(false);
            serviceUnderTest.toggleFilterCount();
            expect(serviceUnderTest.state.displayFilterCounts).toBe(true);
            serviceUnderTest.toggleFilterCount();
            expect(serviceUnderTest.state.displayFilterCounts).toBe(false);
        });
        it('should have a toggleFilterTree() method that updates the displayFilterTree property in the store', function () {
            expect(serviceUnderTest.state.displayFilterTree).toBe(false);
            serviceUnderTest.toggleFilterTree();
            expect(serviceUnderTest.state.displayFilterTree).toBe(true);
            serviceUnderTest.toggleFilterTree();
            expect(serviceUnderTest.state.displayFilterTree).toBe(false);
        });
        it('Should have an set() method that updates the store', function () {
            spyOn(serviceUnderTest.store, 'dispatch');
            serviceUnderTest.set({ filterCounts: true });
            expect(serviceUnderTest.store.dispatch).toHaveBeenCalledWith({ type: 'USER_PREFS.UPDATE_PREFERENCES', payload: { filterCounts: true } });
        });
        it('Should have an reset method that reset the store to default values', function () {
            expect(serviceUnderTest.state).toEqual({
                displayFilterCounts: false, collectionTrayIsOpen: false,
                searchIsOpen: true, sortId: 0, displayFilterTree: false, assetView: 'grid',
                pricingPreferences: {}
            });
            serviceUnderTest.toggleCollectionTray();
            serviceUnderTest.toggleSearch();
            serviceUnderTest.updateSortPreference(100);
            serviceUnderTest.updateAssetViewPreference('list');
            expect(serviceUnderTest.state).toEqual({
                displayFilterCounts: false, collectionTrayIsOpen: true,
                searchIsOpen: false, sortId: 100, displayFilterTree: false, assetView: 'list',
                pricingPreferences: {}
            });
            serviceUnderTest.reset();
            expect(serviceUnderTest.state).toEqual({
                displayFilterCounts: false, collectionTrayIsOpen: false,
                searchIsOpen: true, sortId: 0, displayFilterTree: false, assetView: 'grid',
                pricingPreferences: {}
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvdXNlci1wcmVmZXJlbmNlLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUFrRTtBQUNsRSw4Q0FBNkM7QUFDN0MsOERBQTRFO0FBQzVFLDZEQUFrRDtBQUVsRDtJQUNFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtRQUNoQyxJQUFJLGdCQUF1QyxDQUFDO1FBQzVDLElBQUksNkJBQWtDLENBQUM7UUFDdkMsSUFBSSxTQUFjLENBQUM7UUFDbkIsSUFBSSxPQUF1QixDQUFDO1FBRTVCLDZCQUE2QixHQUFHO1lBQzlCLFFBQVEsRUFBRSxjQUFNLE9BQUEsS0FBSyxFQUFMLENBQUs7U0FDdEIsQ0FBQztRQUVGLElBQUksSUFBSSxHQUFRLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUUzRyxTQUFTLEdBQUc7WUFDVixRQUFRLEVBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQTlCLENBQThCO1lBQ3BELE1BQU0sRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFuQixDQUFtQjtTQUMzQyxDQUFDO1FBRUYsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxrQ0FBZSxDQUFDLENBQUM7WUFDckMsT0FBTyxHQUFHLElBQUksaUNBQWMsRUFBRSxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxXQUFXLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztZQUNoRyxnQkFBZ0IsR0FBRyxJQUFJLCtDQUFxQixDQUFDLDZCQUE2QixF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QyxZQUFZLEVBQUUsQ0FBQztZQUNoQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUNwQztnQkFDRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsSUFBSTtnQkFDdEQsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTTtnQkFDN0Usa0JBQWtCLEVBQUUsRUFBRTthQUN2QixDQUFDLENBQUM7WUFDTCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUNwQztnQkFDRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsS0FBSztnQkFDdkQsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTTtnQkFDMUUsa0JBQWtCLEVBQUUsRUFBRTthQUN2QixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5JRCxvQkFtSUMiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXByZWZlcmVuY2Uuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlclByZWZlcmVuY2VTZXJ2aWNlIH0gZnJvbSAnLi91c2VyLXByZWZlcmVuY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vY2tBcGlTZXJ2aWNlLCBtb2NrQXBpTWF0Y2hlcnMgfSBmcm9tICcuLi9tb2Nrcy9tb2NrLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnVXNlclByZWZlcmVuY2VTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBVc2VyUHJlZmVyZW5jZVNlcnZpY2U7XG4gICAgbGV0IG1vY2tDdXJyZW50VXNlclNlcnZpY2VTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tTdG9yZTogYW55O1xuICAgIGxldCBtb2NrQXBpOiBNb2NrQXBpU2VydmljZTtcblxuICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2VTZXJ2aWNlID0ge1xuICAgICAgbG9nZ2VkSW46ICgpID0+IGZhbHNlXG4gICAgfTtcblxuICAgIGxldCBkYXRhOiBhbnkgPSB7IGRpc3BsYXlGaWx0ZXJDb3VudHM6IGZhbHNlLCBjb2xsZWN0aW9uVHJheUlzT3BlbjogZmFsc2UsIHNlYXJjaElzT3BlbjogdHJ1ZSwgc29ydElkOiAwIH07XG5cbiAgICBtb2NrU3RvcmUgPSB7XG4gICAgICBkaXNwYXRjaDogKF86IGFueSkgPT4gT2JqZWN0LmFzc2lnbihkYXRhLCBfLnBheWxvYWQpLFxuICAgICAgc2VsZWN0OiAoXzogc3RyaW5nKSA9PiBPYnNlcnZhYmxlLm9mKGRhdGEpXG4gICAgfTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpO1xuICAgICAgbW9ja0FwaSA9IG5ldyBNb2NrQXBpU2VydmljZSgpO1xuICAgICAgbW9ja0FwaS5nZXRSZXNwb25zZSA9IHsgcHJlZnM6IHsgZGlzcGxheUZpbHRlckNvdW50czogJ2ZhbHNlJywgY29sbGVjdGlvblRyYXlJc09wZW46ICd0cnVlJyB9IH07XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IFVzZXJQcmVmZXJlbmNlU2VydmljZShtb2NrQ3VycmVudFVzZXJTZXJ2aWNlU2VydmljZSwgbW9ja1N0b3JlLCBtb2NrQXBpLmluamVjdG9yKTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QucmVzZXQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGF2ZSBhIHN0YXRlKCkgZ2V0dGVyIG1ldGhvZCB0aGF0IHJldHVybnMgdGhlIHN0YXRlIG9mIHRoZSBzdG9yZScsICgpID0+IHtcbiAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlKS50b0VxdWFsKFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheUZpbHRlckNvdW50czogZmFsc2UsIGNvbGxlY3Rpb25UcmF5SXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICBzZWFyY2hJc09wZW46IHRydWUsIHNvcnRJZDogMCwgZGlzcGxheUZpbHRlclRyZWU6IGZhbHNlLCBhc3NldFZpZXc6ICdncmlkJyxcbiAgICAgICAgICBwcmljaW5nUHJlZmVyZW5jZXM6IHt9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGEgZ2V0UHJlZnMoKSBtZXRob2QgdGhhdCBjYWxscyB0aGUgYXBpJywgKCkgPT4ge1xuICAgICAgc2VydmljZVVuZGVyVGVzdC5nZXRQcmVmcygpO1xuXG4gICAgICBleHBlY3QobW9ja0FwaS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgndXNlclByZWZlcmVuY2VzJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhdmUgYSB0b2dnbGVTZWFyY2ggbWV0aG9kIHRoYXQgdG9nZ2xlcyB0aGUgc2VhcmNoSXNPcGVuIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuc2VhcmNoSXNPcGVuKS50b0VxdWFsKHRydWUpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdC50b2dnbGVTZWFyY2goKTtcbiAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlLnNlYXJjaElzT3BlbikudG9FcXVhbChmYWxzZSk7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0LnRvZ2dsZVNlYXJjaCgpO1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuc2VhcmNoSXNPcGVuKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYXZlIGEgY2xvc2VTZWFyY2ggbWV0aG9kIHRoYXQgc2V0cyB0aGUgc2VhcmNoSXNPcGVuIHByb3BlcnR5IHRvIGZhbHNlJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuc2VhcmNoSXNPcGVuKS50b0VxdWFsKHRydWUpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdC5jbG9zZVNlYXJjaCgpO1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuc2VhcmNoSXNPcGVuKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGF2ZSBhIHRvZ2dsZUNvbGxlY3Rpb25UcmF5IG1ldGhvZCB0aGF0IHRvZ2dsZXMgdGhlIGNvbGxlY3Rpb25UcmF5SXNPcGVuIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuY29sbGVjdGlvblRyYXlJc09wZW4pLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuQ29sbGVjdGlvblRyYXkoKTtcbiAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlLmNvbGxlY3Rpb25UcmF5SXNPcGVuKS50b0VxdWFsKHRydWUpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdC50b2dnbGVDb2xsZWN0aW9uVHJheSgpO1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuY29sbGVjdGlvblRyYXlJc09wZW4pLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYXZlIGEgb3BlbkNvbGxlY3Rpb25UcmF5IG1ldGhvZCB0aGF0IHNldHMgdGhlIGNvbGxlY3Rpb25UcmF5SXNPcGVuIHByb3BlcnR5IHRvIHRydWUnLCAoKSA9PiB7XG4gICAgICBleHBlY3Qoc2VydmljZVVuZGVyVGVzdC5zdGF0ZS5jb2xsZWN0aW9uVHJheUlzT3BlbikudG9FcXVhbChmYWxzZSk7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Db2xsZWN0aW9uVHJheSgpO1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuY29sbGVjdGlvblRyYXlJc09wZW4pLnRvRXF1YWwodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhdmUgYW4gdXBkYXRlU29ydFByZWZlcmVuY2UoKSBtZXRob2QgdGhhdCB0YWtlcyBhIHNvcnRJZCBhbmQgc2V0cyBpdCBpbiB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICBleHBlY3Qoc2VydmljZVVuZGVyVGVzdC5zdGF0ZS5zb3J0SWQpLnRvRXF1YWwoMCk7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0LnVwZGF0ZVNvcnRQcmVmZXJlbmNlKDE2KTtcbiAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlLnNvcnRJZCkudG9FcXVhbCgxNik7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhdmUgYW4gdXBkYXRlQXNzZXRWaWV3UHJlZmVyZW5jZSgpIG1ldGhvZCB0aGF0IHRha2VzIGFuIGFzc2V0IHZpZXcgdHlwZSBhbmQgc2V0cyBpdCBpbiB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICBleHBlY3Qoc2VydmljZVVuZGVyVGVzdC5zdGF0ZS5hc3NldFZpZXcpLnRvRXF1YWwoJ2dyaWQnKTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QudXBkYXRlQXNzZXRWaWV3UHJlZmVyZW5jZSgnbGlzdCcpO1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuYXNzZXRWaWV3KS50b0VxdWFsKCdsaXN0Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgYSB0b2dnbGVGaWx0ZXJDb3VudCgpIG1ldGhvZCB0aGF0IHVwZGF0ZXMgdGhlIGRpc3BsYXlGaWx0ZXJDb3VudHMgcHJvcGVydHkgaW4gdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuZGlzcGxheUZpbHRlckNvdW50cykudG9CZShmYWxzZSk7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0LnRvZ2dsZUZpbHRlckNvdW50KCk7XG4gICAgICBleHBlY3Qoc2VydmljZVVuZGVyVGVzdC5zdGF0ZS5kaXNwbGF5RmlsdGVyQ291bnRzKS50b0JlKHRydWUpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdC50b2dnbGVGaWx0ZXJDb3VudCgpO1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuZGlzcGxheUZpbHRlckNvdW50cykudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgYSB0b2dnbGVGaWx0ZXJUcmVlKCkgbWV0aG9kIHRoYXQgdXBkYXRlcyB0aGUgZGlzcGxheUZpbHRlclRyZWUgcHJvcGVydHkgaW4gdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuZGlzcGxheUZpbHRlclRyZWUpLnRvQmUoZmFsc2UpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdC50b2dnbGVGaWx0ZXJUcmVlKCk7XG4gICAgICBleHBlY3Qoc2VydmljZVVuZGVyVGVzdC5zdGF0ZS5kaXNwbGF5RmlsdGVyVHJlZSkudG9CZSh0cnVlKTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QudG9nZ2xlRmlsdGVyVHJlZSgpO1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUuZGlzcGxheUZpbHRlclRyZWUpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYXZlIGFuIHNldCgpIG1ldGhvZCB0aGF0IHVwZGF0ZXMgdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgc3B5T24oc2VydmljZVVuZGVyVGVzdC5zdG9yZSwgJ2Rpc3BhdGNoJyk7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0LnNldCh7IGZpbHRlckNvdW50czogdHJ1ZSB9KTtcbiAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0b3JlLmRpc3BhdGNoKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgeyB0eXBlOiAnVVNFUl9QUkVGUy5VUERBVEVfUFJFRkVSRU5DRVMnLCBwYXlsb2FkOiB7IGZpbHRlckNvdW50czogdHJ1ZSB9IH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYXZlIGFuIHJlc2V0IG1ldGhvZCB0aGF0IHJlc2V0IHRoZSBzdG9yZSB0byBkZWZhdWx0IHZhbHVlcycsICgpID0+IHtcbiAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlKS50b0VxdWFsKFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheUZpbHRlckNvdW50czogZmFsc2UsIGNvbGxlY3Rpb25UcmF5SXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICBzZWFyY2hJc09wZW46IHRydWUsIHNvcnRJZDogMCwgZGlzcGxheUZpbHRlclRyZWU6IGZhbHNlLCBhc3NldFZpZXc6ICdncmlkJyxcbiAgICAgICAgICBwcmljaW5nUHJlZmVyZW5jZXM6IHt9XG4gICAgICAgIH0pO1xuICAgICAgc2VydmljZVVuZGVyVGVzdC50b2dnbGVDb2xsZWN0aW9uVHJheSgpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdC50b2dnbGVTZWFyY2goKTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QudXBkYXRlU29ydFByZWZlcmVuY2UoMTAwKTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QudXBkYXRlQXNzZXRWaWV3UHJlZmVyZW5jZSgnbGlzdCcpO1xuICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Quc3RhdGUpLnRvRXF1YWwoXG4gICAgICAgIHtcbiAgICAgICAgICBkaXNwbGF5RmlsdGVyQ291bnRzOiBmYWxzZSwgY29sbGVjdGlvblRyYXlJc09wZW46IHRydWUsXG4gICAgICAgICAgc2VhcmNoSXNPcGVuOiBmYWxzZSwgc29ydElkOiAxMDAsIGRpc3BsYXlGaWx0ZXJUcmVlOiBmYWxzZSwgYXNzZXRWaWV3OiAnbGlzdCcsXG4gICAgICAgICAgcHJpY2luZ1ByZWZlcmVuY2VzOiB7fVxuICAgICAgICB9KTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QucmVzZXQoKTtcbiAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnN0YXRlKS50b0VxdWFsKFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheUZpbHRlckNvdW50czogZmFsc2UsIGNvbGxlY3Rpb25UcmF5SXNPcGVuOiBmYWxzZSxcbiAgICAgICAgICBzZWFyY2hJc09wZW46IHRydWUsIHNvcnRJZDogMCwgZGlzcGxheUZpbHRlclRyZWU6IGZhbHNlLCBhc3NldFZpZXc6ICdncmlkJyxcbiAgICAgICAgICBwcmljaW5nUHJlZmVyZW5jZXM6IHt9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
