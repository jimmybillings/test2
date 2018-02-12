"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quotes_store_1 = require("./quotes.store");
var Observable_1 = require("rxjs/Observable");
function main() {
    var initState = {
        items: null,
        pagination: {
            totalCount: 0,
            currentPage: 1,
            pageSize: 20,
            hasNextPage: false,
            hasPreviousPage: false,
            numberOfPages: 0
        }
    };
    describe('quotes reducer', function () {
        it('returns the payload for QUOTES.SET_QUOTES', function () {
            expect(quotes_store_1.quotes(initState, { type: 'QUOTES.SET_QUOTES', payload: { key: 'value' } }))
                .toEqual({ key: 'value' });
        });
        it('returns the current state for an unexpected action type', function () {
            expect(quotes_store_1.quotes(initState, { type: 'BLAH', payload: { someKey: 'someValue' } }))
                .toEqual(initState);
        });
        it('returns the default state for no current state and an unexpected action type', function () {
            expect(quotes_store_1.quotes(undefined, { type: 'BLAH', payload: { someKey: 'someValue' } }))
                .toEqual(initState);
        });
    });
    describe('Quotes Store', function () {
        var storeUnderTest, mockStore;
        beforeEach(function () {
            mockStore = {
                dispatch: jasmine.createSpy('dispatch'),
                select: jasmine.createSpy('select').and.returnValue(Observable_1.Observable.of(initState))
            };
            storeUnderTest = new quotes_store_1.QuotesStore(mockStore);
        });
        describe('data getter', function () {
            it('should return the right data', function () {
                storeUnderTest.data.take(1).subscribe(function (d) {
                    expect(d).toEqual(initState);
                });
            });
            it('should call store.select() with "quotes"', function () {
                storeUnderTest.data.take(1).subscribe();
                expect(mockStore.select).toHaveBeenCalledWith('quotes');
            });
        });
        describe('state', function () {
            it('should return the right state', function () {
                expect(storeUnderTest.state).toEqual(initState);
            });
        });
        describe('setQuotes', function () {
            it('should call dispatch on the store with the right payload', function () {
                var newQuotes = {
                    items: [],
                    totalCount: 0,
                    currentPage: 0,
                    pageSize: 20,
                    hasNextPage: false,
                    hasPreviousPage: false,
                    numberOfPages: 0
                };
                storeUnderTest.setQuotes(newQuotes);
                expect(mockStore.dispatch).toHaveBeenCalledWith({
                    type: 'QUOTES.SET_QUOTES',
                    payload: {
                        items: [],
                        pagination: {
                            totalCount: 0,
                            currentPage: 1,
                            pageSize: 20,
                            hasNextPage: false,
                            hasPreviousPage: false,
                            numberOfPages: 0
                        }
                    }
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc3RvcmVzL3F1b3Rlcy5zdG9yZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXFEO0FBQ3JELDhDQUE2QztBQUU3QztJQUNFLElBQU0sU0FBUyxHQUFRO1FBQ3JCLEtBQUssRUFBRSxJQUFJO1FBQ1gsVUFBVSxFQUFFO1lBQ1YsVUFBVSxFQUFFLENBQUM7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLFFBQVEsRUFBRSxFQUFFO1lBQ1osV0FBVyxFQUFFLEtBQUs7WUFDbEIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsYUFBYSxFQUFFLENBQUM7U0FDakI7S0FDRixDQUFDO0lBRUYsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtZQUM5QyxNQUFNLENBQUMscUJBQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDaEYsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseURBQXlELEVBQUU7WUFDNUQsTUFBTSxDQUFDLHFCQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUMzRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsOEVBQThFLEVBQUU7WUFDakYsTUFBTSxDQUFDLHFCQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUMzRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDdkIsSUFBSSxjQUEyQixFQUFFLFNBQWMsQ0FBQztRQUVoRCxVQUFVLENBQUM7WUFDVCxTQUFTLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzlFLENBQUM7WUFDRixjQUFjLEdBQUcsSUFBSSwwQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUN0QixFQUFFLENBQUMsOEJBQThCLEVBQUU7Z0JBQ2pDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUU7Z0JBQzdDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUV4QyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2hCLEVBQUUsQ0FBQywrQkFBK0IsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsRUFBRSxDQUFDLDBEQUEwRCxFQUFFO2dCQUM3RCxJQUFJLFNBQVMsR0FBUTtvQkFDbkIsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsVUFBVSxFQUFFLENBQUM7b0JBQ2IsV0FBVyxFQUFFLENBQUM7b0JBQ2QsUUFBUSxFQUFFLEVBQUU7b0JBQ1osV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLGVBQWUsRUFBRSxLQUFLO29CQUN0QixhQUFhLEVBQUUsQ0FBQztpQkFDakIsQ0FBQztnQkFDRixjQUFjLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO29CQUM5QyxJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixPQUFPLEVBQUU7d0JBQ1AsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsVUFBVSxFQUFFOzRCQUNWLFVBQVUsRUFBRSxDQUFDOzRCQUNiLFdBQVcsRUFBRSxDQUFDOzRCQUNkLFFBQVEsRUFBRSxFQUFFOzRCQUNaLFdBQVcsRUFBRSxLQUFLOzRCQUNsQixlQUFlLEVBQUUsS0FBSzs0QkFDdEIsYUFBYSxFQUFFLENBQUM7eUJBQ2pCO3FCQUNGO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUExRkQsb0JBMEZDIiwiZmlsZSI6ImFwcC9zaGFyZWQvc3RvcmVzL3F1b3Rlcy5zdG9yZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVvdGVzU3RvcmUsIHF1b3RlcyB9IGZyb20gJy4vcXVvdGVzLnN0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgaW5pdFN0YXRlOiBhbnkgPSB7XG4gICAgaXRlbXM6IG51bGwsXG4gICAgcGFnaW5hdGlvbjoge1xuICAgICAgdG90YWxDb3VudDogMCxcbiAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgcGFnZVNpemU6IDIwLFxuICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgIG51bWJlck9mUGFnZXM6IDBcbiAgICB9XG4gIH07XG5cbiAgZGVzY3JpYmUoJ3F1b3RlcyByZWR1Y2VyJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSBwYXlsb2FkIGZvciBRVU9URVMuU0VUX1FVT1RFUycsICgpID0+IHtcbiAgICAgIGV4cGVjdChxdW90ZXMoaW5pdFN0YXRlLCB7IHR5cGU6ICdRVU9URVMuU0VUX1FVT1RFUycsIHBheWxvYWQ6IHsga2V5OiAndmFsdWUnIH0gfSkpXG4gICAgICAgIC50b0VxdWFsKHsga2V5OiAndmFsdWUnIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUgZm9yIGFuIHVuZXhwZWN0ZWQgYWN0aW9uIHR5cGUnLCAoKSA9PiB7XG4gICAgICBleHBlY3QocXVvdGVzKGluaXRTdGF0ZSwgeyB0eXBlOiAnQkxBSCcsIHBheWxvYWQ6IHsgc29tZUtleTogJ3NvbWVWYWx1ZScgfSB9KSlcbiAgICAgICAgLnRvRXF1YWwoaW5pdFN0YXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBkZWZhdWx0IHN0YXRlIGZvciBubyBjdXJyZW50IHN0YXRlIGFuZCBhbiB1bmV4cGVjdGVkIGFjdGlvbiB0eXBlJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHF1b3Rlcyh1bmRlZmluZWQsIHsgdHlwZTogJ0JMQUgnLCBwYXlsb2FkOiB7IHNvbWVLZXk6ICdzb21lVmFsdWUnIH0gfSkpXG4gICAgICAgIC50b0VxdWFsKGluaXRTdGF0ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdRdW90ZXMgU3RvcmUnLCAoKSA9PiB7XG4gICAgbGV0IHN0b3JlVW5kZXJUZXN0OiBRdW90ZXNTdG9yZSwgbW9ja1N0b3JlOiBhbnk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IHtcbiAgICAgICAgZGlzcGF0Y2g6IGphc21pbmUuY3JlYXRlU3B5KCdkaXNwYXRjaCcpLFxuICAgICAgICBzZWxlY3Q6IGphc21pbmUuY3JlYXRlU3B5KCdzZWxlY3QnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZihpbml0U3RhdGUpKVxuICAgICAgfTtcbiAgICAgIHN0b3JlVW5kZXJUZXN0ID0gbmV3IFF1b3Rlc1N0b3JlKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGF0YSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcmlnaHQgZGF0YScsICgpID0+IHtcbiAgICAgICAgc3RvcmVVbmRlclRlc3QuZGF0YS50YWtlKDEpLnN1YnNjcmliZShkID0+IHtcbiAgICAgICAgICBleHBlY3QoZCkudG9FcXVhbChpbml0U3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc3RvcmUuc2VsZWN0KCkgd2l0aCBcInF1b3Rlc1wiJywgKCkgPT4ge1xuICAgICAgICBzdG9yZVVuZGVyVGVzdC5kYXRhLnRha2UoMSkuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tTdG9yZS5zZWxlY3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdxdW90ZXMnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N0YXRlJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIHJpZ2h0IHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3Qoc3RvcmVVbmRlclRlc3Quc3RhdGUpLnRvRXF1YWwoaW5pdFN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NldFF1b3RlcycsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBkaXNwYXRjaCBvbiB0aGUgc3RvcmUgd2l0aCB0aGUgcmlnaHQgcGF5bG9hZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG5ld1F1b3RlczogYW55ID0ge1xuICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICB0b3RhbENvdW50OiAwLFxuICAgICAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgICAgIHBhZ2VTaXplOiAyMCxcbiAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2UsXG4gICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgICAgICBudW1iZXJPZlBhZ2VzOiAwXG4gICAgICAgIH07XG4gICAgICAgIHN0b3JlVW5kZXJUZXN0LnNldFF1b3RlcyhuZXdRdW90ZXMpO1xuICAgICAgICBleHBlY3QobW9ja1N0b3JlLmRpc3BhdGNoKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgdHlwZTogJ1FVT1RFUy5TRVRfUVVPVEVTJyxcbiAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgIHRvdGFsQ291bnQ6IDAsXG4gICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgICAgICBwYWdlU2l6ZTogMjAsXG4gICAgICAgICAgICAgIGhhc05leHRQYWdlOiBmYWxzZSxcbiAgICAgICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgICAgICAgICAgbnVtYmVyT2ZQYWdlczogMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
