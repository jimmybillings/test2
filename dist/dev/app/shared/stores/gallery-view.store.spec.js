"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var reducer_1 = require("../tests/reducer");
var gallery_view_store_1 = require("./gallery-view.store");
function main() {
    var initialState = {
        results: [],
        numberOfLevels: 0,
        path: []
    };
    describe('gallery reducer', function () {
        describe('REPLACE_GALLERY', function () {
            reducer_1.addStandardReducerTestsFor(gallery_view_store_1.gallery, 'REPLACE_GALLERY', initialState);
            it('returns payload when current state is passed in', function () {
                expect(gallery_view_store_1.gallery(initialState, { type: 'REPLACE_GALLERY', payload: { property1: 'new', other: 'stuff' } }))
                    .toEqual({ property1: 'new', other: 'stuff' });
            });
            it('returns payload when current state is not passed in', function () {
                expect(gallery_view_store_1.gallery(undefined, { type: 'REPLACE_GALLERY', payload: { some: 'payload' } }))
                    .toEqual({ some: 'payload' });
            });
            it('returns initial state when payload is not passed in', function () {
                expect(gallery_view_store_1.gallery({ property1: 'existing1', property2: 'existing2' }, { type: 'REPLACE_GALLERY' }))
                    .toEqual(initialState);
            });
        });
    });
    describe('Gallery View Store', function () {
        var storeUnderTest;
        var mockStore;
        beforeEach(function () {
            mockStore = {
                select: jasmine.createSpy('select').and.returnValue(Observable_1.Observable.of({ someKey: 'someValue' })),
                dispatch: jasmine.createSpy('dispatch')
            };
            storeUnderTest = new gallery_view_store_1.GalleryViewStore(mockStore);
        });
        describe('data getter', function () {
            it('accesses the right part of the global store', function () {
                storeUnderTest.data.subscribe();
                expect(mockStore.select).toHaveBeenCalledWith('gallery');
            });
            it('returns the expected data', function () {
                storeUnderTest.data.subscribe(function (data) {
                    expect(data).toEqual({ someKey: 'someValue' });
                });
            });
        });
        describe('state getter', function () {
            it('should return the state', function () {
                expect(storeUnderTest.state).toEqual({ someKey: 'someValue' });
            });
        });
        describe('replaceWith()', function () {
            it('dispatches REPLACE_GALLERY with the expected payload', function () {
                var results = [{ id: 3, name: 'Name 3', resultCount: 42, hasMore: false }];
                var path = [{ ids: [1, 2], names: ['Name 1', 'Name 2'] }];
                storeUnderTest.replaceWith(results, path);
                expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'REPLACE_GALLERY', payload: { results: results, numberOfLevels: 1, path: path } });
            });
            it('calculates the correct number of levels for a complex results set', function () {
                var results = [
                    {
                        id: 3, name: 'Name 3', resultCount: 42, hasMore: true, children: [
                            {
                                id: 4, name: 'Name 4_1', resultCount: 17, hasMore: true, children: [
                                    { id: 5, name: 'Name 5_1', resultCount: 2, hasMore: false },
                                    { id: 5, name: 'Name 5_2', resultCount: 46, hasMore: false },
                                    { id: 5, name: 'Name 5_3', resultCount: 23, hasMore: false }
                                ]
                            },
                            {
                                id: 4, name: 'Name 4_2', resultCount: 99, hasMore: true, children: [
                                    { id: 5, name: 'Name 5_1', resultCount: 2, hasMore: false },
                                    { id: 5, name: 'Name 5_2', resultCount: 46, hasMore: false },
                                    { id: 5, name: 'Name 5_3', resultCount: 23, hasMore: false }
                                ]
                            }
                        ]
                    }
                ];
                var path = [{ ids: [1, 2], names: ['Name 1', 'Name 2'] }];
                storeUnderTest.replaceWith(results, path);
                expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'REPLACE_GALLERY', payload: { results: results, numberOfLevels: 3, path: path } });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc3RvcmVzL2dhbGxlcnktdmlldy5zdG9yZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDLDRDQUE4RDtBQUM5RCwyREFBaUU7QUFHakU7SUFDRSxJQUFNLFlBQVksR0FBWTtRQUM1QixPQUFPLEVBQUUsRUFBRTtRQUNYLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLElBQUksRUFBRSxFQUFFO0tBQ1QsQ0FBQztJQUVGLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsb0NBQTBCLENBQUMsNEJBQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVyRSxFQUFFLENBQUMsaURBQWlELEVBQUU7Z0JBQ3BELE1BQU0sQ0FBQyw0QkFBTyxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ3RHLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMscURBQXFELEVBQUU7Z0JBQ3hELE1BQU0sQ0FBQyw0QkFBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUNsRixPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtnQkFDeEQsTUFBTSxDQUFDLDRCQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMs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QUM7Z0JBRTVELGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUxQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUM3QyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQzFGLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBeEdELG9CQXdHQyIsImZpbGUiOiJhcHAvc2hhcmVkL3N0b3Jlcy9nYWxsZXJ5LXZpZXcuc3RvcmUuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBhZGRTdGFuZGFyZFJlZHVjZXJUZXN0c0ZvciB9IGZyb20gJy4uL3Rlc3RzL3JlZHVjZXInO1xuaW1wb3J0IHsgZ2FsbGVyeSwgR2FsbGVyeVZpZXdTdG9yZSB9IGZyb20gJy4vZ2FsbGVyeS12aWV3LnN0b3JlJztcbmltcG9ydCB7IEdhbGxlcnkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2dhbGxlcnktdmlldy5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgaW5pdGlhbFN0YXRlOiBHYWxsZXJ5ID0ge1xuICAgIHJlc3VsdHM6IFtdLFxuICAgIG51bWJlck9mTGV2ZWxzOiAwLFxuICAgIHBhdGg6IFtdXG4gIH07XG5cbiAgZGVzY3JpYmUoJ2dhbGxlcnkgcmVkdWNlcicsICgpID0+IHtcbiAgICBkZXNjcmliZSgnUkVQTEFDRV9HQUxMRVJZJywgKCkgPT4ge1xuICAgICAgYWRkU3RhbmRhcmRSZWR1Y2VyVGVzdHNGb3IoZ2FsbGVyeSwgJ1JFUExBQ0VfR0FMTEVSWScsIGluaXRpYWxTdGF0ZSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHBheWxvYWQgd2hlbiBjdXJyZW50IHN0YXRlIGlzIHBhc3NlZCBpbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGdhbGxlcnkoaW5pdGlhbFN0YXRlLCB7IHR5cGU6ICdSRVBMQUNFX0dBTExFUlknLCBwYXlsb2FkOiB7IHByb3BlcnR5MTogJ25ldycsIG90aGVyOiAnc3R1ZmYnIH0gfSkpXG4gICAgICAgICAgLnRvRXF1YWwoeyBwcm9wZXJ0eTE6ICduZXcnLCBvdGhlcjogJ3N0dWZmJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBwYXlsb2FkIHdoZW4gY3VycmVudCBzdGF0ZSBpcyBub3QgcGFzc2VkIGluJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoZ2FsbGVyeSh1bmRlZmluZWQsIHsgdHlwZTogJ1JFUExBQ0VfR0FMTEVSWScsIHBheWxvYWQ6IHsgc29tZTogJ3BheWxvYWQnIH0gfSkpXG4gICAgICAgICAgLnRvRXF1YWwoeyBzb21lOiAncGF5bG9hZCcgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgaW5pdGlhbCBzdGF0ZSB3aGVuIHBheWxvYWQgaXMgbm90IHBhc3NlZCBpbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGdhbGxlcnkoeyBwcm9wZXJ0eTE6ICdleGlzdGluZzEnLCBwcm9wZXJ0eTI6ICdleGlzdGluZzInIH0gYXMgYW55LCB7IHR5cGU6ICdSRVBMQUNFX0dBTExFUlknIH0pKVxuICAgICAgICAgIC50b0VxdWFsKGluaXRpYWxTdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ0dhbGxlcnkgVmlldyBTdG9yZScsICgpID0+IHtcbiAgICBsZXQgc3RvcmVVbmRlclRlc3Q6IEdhbGxlcnlWaWV3U3RvcmU7XG4gICAgbGV0IG1vY2tTdG9yZTogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU3RvcmUgPSB7XG4gICAgICAgIHNlbGVjdDogamFzbWluZS5jcmVhdGVTcHkoJ3NlbGVjdCcpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHsgc29tZUtleTogJ3NvbWVWYWx1ZScgfSkpLFxuICAgICAgICBkaXNwYXRjaDogamFzbWluZS5jcmVhdGVTcHkoJ2Rpc3BhdGNoJylcbiAgICAgIH07XG5cbiAgICAgIHN0b3JlVW5kZXJUZXN0ID0gbmV3IEdhbGxlcnlWaWV3U3RvcmUobW9ja1N0b3JlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkYXRhIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdhY2Nlc3NlcyB0aGUgcmlnaHQgcGFydCBvZiB0aGUgZ2xvYmFsIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICBzdG9yZVVuZGVyVGVzdC5kYXRhLnN1YnNjcmliZSgpO1xuICAgICAgICBleHBlY3QobW9ja1N0b3JlLnNlbGVjdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2dhbGxlcnknKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgZXhwZWN0ZWQgZGF0YScsICgpID0+IHtcbiAgICAgICAgc3RvcmVVbmRlclRlc3QuZGF0YS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGRhdGEpLnRvRXF1YWwoeyBzb21lS2V5OiAnc29tZVZhbHVlJyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdGF0ZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChzdG9yZVVuZGVyVGVzdC5zdGF0ZSkudG9FcXVhbCh7IHNvbWVLZXk6ICdzb21lVmFsdWUnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVwbGFjZVdpdGgoKScsICgpID0+IHtcbiAgICAgIGl0KCdkaXNwYXRjaGVzIFJFUExBQ0VfR0FMTEVSWSB3aXRoIHRoZSBleHBlY3RlZCBwYXlsb2FkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW3sgaWQ6IDMsIG5hbWU6ICdOYW1lIDMnLCByZXN1bHRDb3VudDogNDIsIGhhc01vcmU6IGZhbHNlIH1dO1xuICAgICAgICBjb25zdCBwYXRoID0gW3sgaWRzOiBbMSwgMl0sIG5hbWVzOiBbJ05hbWUgMScsICdOYW1lIDInXSB9XTtcblxuICAgICAgICBzdG9yZVVuZGVyVGVzdC5yZXBsYWNlV2l0aChyZXN1bHRzLCBwYXRoKTtcblxuICAgICAgICBleHBlY3QobW9ja1N0b3JlLmRpc3BhdGNoKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICB7IHR5cGU6ICdSRVBMQUNFX0dBTExFUlknLCBwYXlsb2FkOiB7IHJlc3VsdHM6IHJlc3VsdHMsIG51bWJlck9mTGV2ZWxzOiAxLCBwYXRoOiBwYXRoIH0gfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxjdWxhdGVzIHRoZSBjb3JyZWN0IG51bWJlciBvZiBsZXZlbHMgZm9yIGEgY29tcGxleCByZXN1bHRzIHNldCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogMywgbmFtZTogJ05hbWUgMycsIHJlc3VsdENvdW50OiA0MiwgaGFzTW9yZTogdHJ1ZSwgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiA0LCBuYW1lOiAnTmFtZSA0XzEnLCByZXN1bHRDb3VudDogMTcsIGhhc01vcmU6IHRydWUsIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICB7IGlkOiA1LCBuYW1lOiAnTmFtZSA1XzEnLCByZXN1bHRDb3VudDogMiwgaGFzTW9yZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6IDUsIG5hbWU6ICdOYW1lIDVfMicsIHJlc3VsdENvdW50OiA0NiwgaGFzTW9yZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6IDUsIG5hbWU6ICdOYW1lIDVfMycsIHJlc3VsdENvdW50OiAyMywgaGFzTW9yZTogZmFsc2UgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiA0LCBuYW1lOiAnTmFtZSA0XzInLCByZXN1bHRDb3VudDogOTksIGhhc01vcmU6IHRydWUsIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICB7IGlkOiA1LCBuYW1lOiAnTmFtZSA1XzEnLCByZXN1bHRDb3VudDogMiwgaGFzTW9yZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6IDUsIG5hbWU6ICdOYW1lIDVfMicsIHJlc3VsdENvdW50OiA0NiwgaGFzTW9yZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6IDUsIG5hbWU6ICdOYW1lIDVfMycsIHJlc3VsdENvdW50OiAyMywgaGFzTW9yZTogZmFsc2UgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBwYXRoID0gW3sgaWRzOiBbMSwgMl0sIG5hbWVzOiBbJ05hbWUgMScsICdOYW1lIDInXSB9XTtcblxuICAgICAgICBzdG9yZVVuZGVyVGVzdC5yZXBsYWNlV2l0aChyZXN1bHRzLCBwYXRoKTtcblxuICAgICAgICBleHBlY3QobW9ja1N0b3JlLmRpc3BhdGNoKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICB7IHR5cGU6ICdSRVBMQUNFX0dBTExFUlknLCBwYXlsb2FkOiB7IHJlc3VsdHM6IHJlc3VsdHMsIG51bWJlck9mTGV2ZWxzOiAzLCBwYXRoOiBwYXRoIH0gfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
