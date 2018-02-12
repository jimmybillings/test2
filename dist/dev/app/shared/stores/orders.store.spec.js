"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var orders_store_1 = require("./orders.store");
function main() {
    describe('orders reducer', function () {
        it('returns the payload for ORDERS.GET_ORDERS', function () {
            expect(orders_store_1.orders({ current: 'State' }, { type: 'ORDERS.GET_ORDERS', payload: { someKey: 'someValue' } }))
                .toEqual({ someKey: 'someValue' });
        });
        it('returns the current state for an unexpected action type', function () {
            expect(orders_store_1.orders({ current: 'State' }, { type: 'BLAH', payload: { someKey: 'someValue' } }))
                .toEqual({ current: 'State' });
        });
        it('returns the default state for no current state and an unexpected action type', function () {
            expect(orders_store_1.orders(undefined, { type: 'BLAH', payload: { someKey: 'someValue' } }))
                .toEqual({
                items: [],
                pagination: {
                    totalCount: 0,
                    currentPage: 1,
                    pageSize: 100,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    numberOfPages: 0
                }
            });
        });
    });
    describe('Orders Store', function () {
        var mockStore;
        var storeUnderTest;
        beforeEach(function () {
            mockStore = {
                select: jasmine.createSpy('select').and.returnValue(Observable_1.Observable.of({ someKey: 'someValue' })),
                dispatch: jasmine.createSpy('dispatch')
            };
            storeUnderTest = new orders_store_1.OrdersStore(mockStore);
        });
        describe('data getter', function () {
            it('accesses the right part of the global store', function () {
                storeUnderTest.data.subscribe();
                expect(mockStore.select).toHaveBeenCalledWith('orders');
            });
            it('returns the expected data', function () {
                storeUnderTest.data.subscribe(function (data) {
                    expect(data).toEqual({ someKey: 'someValue' });
                });
            });
        });
        describe('storeOrders()', function () {
            it('dispatches ORDERS.GET_ORDERS with the passed-in orders', function () {
                storeUnderTest.storeOrders({
                    items: [],
                    currentPage: 0,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    numberOfPages: 1,
                    pageSize: 20,
                    totalCount: 4
                });
                expect(mockStore.dispatch)
                    .toHaveBeenCalledWith({
                    type: 'ORDERS.GET_ORDERS', payload: {
                        items: [],
                        pagination: {
                            currentPage: 1,
                            hasNextPage: false,
                            hasPreviousPage: false,
                            numberOfPages: 1,
                            pageSize: 20,
                            totalCount: 4
                        }
                    }
                });
            });
            it('dispatches ORDERS.GET_ORDERS with the passed-in orders, sets items to [] if items is undefined', function () {
                storeUnderTest.storeOrders({
                    currentPage: 0,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    numberOfPages: 1,
                    pageSize: 20,
                    totalCount: 4
                });
                expect(mockStore.dispatch)
                    .toHaveBeenCalledWith({
                    type: 'ORDERS.GET_ORDERS', payload: {
                        items: [],
                        pagination: {
                            currentPage: 1,
                            hasNextPage: false,
                            hasPreviousPage: false,
                            numberOfPages: 1,
                            pageSize: 20,
                            totalCount: 4
                        }
                    }
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc3RvcmVzL29yZGVycy5zdG9yZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLCtDQUFxRDtBQUVyRDtJQUNFLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixFQUFFLENBQUMsMkNBQTJDLEVBQUU7WUFDOUMsTUFBTSxDQUFDLHFCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDMUcsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseURBQXlELEVBQUU7WUFDNUQsTUFBTSxDQUFDLHFCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzdGLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDhFQUE4RSxFQUFFO1lBQ2pGLE1BQU0sQ0FBQyxxQkFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDM0UsT0FBTyxDQUFDO2dCQUNQLEtBQUssRUFBRSxFQUFFO2dCQUNULFVBQVUsRUFBRTtvQkFDVixVQUFVLEVBQUUsQ0FBQztvQkFDYixXQUFXLEVBQUUsQ0FBQztvQkFDZCxRQUFRLEVBQUUsR0FBRztvQkFDYixXQUFXLEVBQUUsS0FBSztvQkFDbEIs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NEJBQ3RCLGFBQWEsRUFBRSxDQUFDOzRCQUNoQixRQUFRLEVBQUUsRUFBRTs0QkFDWixVQUFVLEVBQUUsQ0FBQzt5QkFDZDtxQkFDRjtpQkFDRixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBN0dELG9CQTZHQyIsImZpbGUiOiJhcHAvc2hhcmVkL3N0b3Jlcy9vcmRlcnMuc3RvcmUuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgb3JkZXJzLCBPcmRlcnNTdG9yZSB9IGZyb20gJy4vb3JkZXJzLnN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdvcmRlcnMgcmVkdWNlcicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgcGF5bG9hZCBmb3IgT1JERVJTLkdFVF9PUkRFUlMnLCAoKSA9PiB7XG4gICAgICBleHBlY3Qob3JkZXJzKHsgY3VycmVudDogJ1N0YXRlJyB9IGFzIGFueSwgeyB0eXBlOiAnT1JERVJTLkdFVF9PUkRFUlMnLCBwYXlsb2FkOiB7IHNvbWVLZXk6ICdzb21lVmFsdWUnIH0gfSkpXG4gICAgICAgIC50b0VxdWFsKHsgc29tZUtleTogJ3NvbWVWYWx1ZScgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZSBmb3IgYW4gdW5leHBlY3RlZCBhY3Rpb24gdHlwZScsICgpID0+IHtcbiAgICAgIGV4cGVjdChvcmRlcnMoeyBjdXJyZW50OiAnU3RhdGUnIH0gYXMgYW55LCB7IHR5cGU6ICdCTEFIJywgcGF5bG9hZDogeyBzb21lS2V5OiAnc29tZVZhbHVlJyB9IH0pKVxuICAgICAgICAudG9FcXVhbCh7IGN1cnJlbnQ6ICdTdGF0ZScgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgZGVmYXVsdCBzdGF0ZSBmb3Igbm8gY3VycmVudCBzdGF0ZSBhbmQgYW4gdW5leHBlY3RlZCBhY3Rpb24gdHlwZScsICgpID0+IHtcbiAgICAgIGV4cGVjdChvcmRlcnModW5kZWZpbmVkLCB7IHR5cGU6ICdCTEFIJywgcGF5bG9hZDogeyBzb21lS2V5OiAnc29tZVZhbHVlJyB9IH0pKVxuICAgICAgICAudG9FcXVhbCh7XG4gICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgIHRvdGFsQ291bnQ6IDAsXG4gICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgIHBhZ2VTaXplOiAxMDAsXG4gICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgbnVtYmVyT2ZQYWdlczogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdPcmRlcnMgU3RvcmUnLCAoKSA9PiB7XG4gICAgbGV0IG1vY2tTdG9yZTogYW55O1xuICAgIGxldCBzdG9yZVVuZGVyVGVzdDogT3JkZXJzU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IHtcbiAgICAgICAgc2VsZWN0OiBqYXNtaW5lLmNyZWF0ZVNweSgnc2VsZWN0JykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YoeyBzb21lS2V5OiAnc29tZVZhbHVlJyB9KSksXG4gICAgICAgIGRpc3BhdGNoOiBqYXNtaW5lLmNyZWF0ZVNweSgnZGlzcGF0Y2gnKVxuICAgICAgfTtcbiAgICAgIHN0b3JlVW5kZXJUZXN0ID0gbmV3IE9yZGVyc1N0b3JlKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGF0YSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgnYWNjZXNzZXMgdGhlIHJpZ2h0IHBhcnQgb2YgdGhlIGdsb2JhbCBzdG9yZScsICgpID0+IHtcbiAgICAgICAgc3RvcmVVbmRlclRlc3QuZGF0YS5zdWJzY3JpYmUoKTtcbiAgICAgICAgZXhwZWN0KG1vY2tTdG9yZS5zZWxlY3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdvcmRlcnMnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgZXhwZWN0ZWQgZGF0YScsICgpID0+IHtcbiAgICAgICAgc3RvcmVVbmRlclRlc3QuZGF0YS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGRhdGEpLnRvRXF1YWwoeyBzb21lS2V5OiAnc29tZVZhbHVlJyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZGVzY3JpYmUoJ3N0b3JlT3JkZXJzKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZGlzcGF0Y2hlcyBPUkRFUlMuR0VUX09SREVSUyB3aXRoIHRoZSBwYXNzZWQtaW4gb3JkZXJzJywgKCkgPT4ge1xuICAgICAgICBzdG9yZVVuZGVyVGVzdC5zdG9yZU9yZGVycyh7XG4gICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgICAgIGhhc05leHRQYWdlOiBmYWxzZSxcbiAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICAgIG51bWJlck9mUGFnZXM6IDEsXG4gICAgICAgICAgcGFnZVNpemU6IDIwLFxuICAgICAgICAgIHRvdGFsQ291bnQ6IDRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tTdG9yZS5kaXNwYXRjaClcbiAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgICAgdHlwZTogJ09SREVSUy5HRVRfT1JERVJTJywgcGF5bG9hZDoge1xuICAgICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAxLFxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAyMCxcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50OiA0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGlzcGF0Y2hlcyBPUkRFUlMuR0VUX09SREVSUyB3aXRoIHRoZSBwYXNzZWQtaW4gb3JkZXJzLCBzZXRzIGl0ZW1zIHRvIFtdIGlmIGl0ZW1zIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgc3RvcmVVbmRlclRlc3Quc3RvcmVPcmRlcnMoe1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgICAgIGhhc05leHRQYWdlOiBmYWxzZSxcbiAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICAgIG51bWJlck9mUGFnZXM6IDEsXG4gICAgICAgICAgcGFnZVNpemU6IDIwLFxuICAgICAgICAgIHRvdGFsQ291bnQ6IDRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tTdG9yZS5kaXNwYXRjaClcbiAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgICAgdHlwZTogJ09SREVSUy5HRVRfT1JERVJTJywgcGF5bG9hZDoge1xuICAgICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAxLFxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAyMCxcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50OiA0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
