"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var feature_store_1 = require("./feature.store");
var Observable_1 = require("rxjs/Observable");
function main() {
    var initState = {
        disableCartAccess: false,
        disableCollectionAccess: false,
        disableCommerceAgreements: false,
    };
    describe('features reducer', function () {
        it('returns the payload for FEATURE.SET_STATE', function () {
            expect(feature_store_1.features(initState, { type: 'FEATURE.SET_STATE', payload: { key: 'value' } }))
                .toEqual({
                disableCartAccess: false,
                disableCollectionAccess: false,
                disableCommerceAgreements: false,
                key: 'value'
            });
        });
        it('returns the current state for an unexpected action type', function () {
            expect(feature_store_1.features(initState, { type: 'BLAH', payload: { someKey: 'someValue' } }))
                .toEqual(initState);
        });
        it('returns the default state for no current state and an unexpected action type', function () {
            expect(feature_store_1.features(undefined, { type: 'BLAH', payload: { someKey: 'someValue' } }))
                .toEqual(initState);
        });
    });
    describe('Feature Store', function () {
        var storeUnderTest, mockStore;
        beforeEach(function () {
            mockStore = {
                dispatch: jasmine.createSpy('dispatch'),
                select: jasmine.createSpy('select').and.returnValue(Observable_1.Observable.of(initState))
            };
            storeUnderTest = new feature_store_1.FeatureStore(mockStore);
        });
        describe('isAvailable', function () {
            it('should return true if the feature is not disabled', function () {
                expect(storeUnderTest.isAvailable('disableCartAccess')).toBe(true);
            });
        });
        describe('set', function () {
            it('should call dispatch on the store with the right action - for expected data', function () {
                storeUnderTest.set({ disableCartAccess: 'true' });
                expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'FEATURE.SET_STATE', payload: { disableCartAccess: true } });
            });
            it('should call dispatch on the store with the right action - for unexpected data', function () {
                storeUnderTest.set({ stripePublicKey: 'pk_lbkjo87eta89nca' });
                expect(mockStore.dispatch).toHaveBeenCalledWith({
                    type: 'FEATURE.SET_STATE',
                    payload: { stripePublicKey: 'pk_lbkjo87eta89nca' }
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc3RvcmVzL2ZlYXR1cmUuc3RvcmUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUF5RDtBQUV6RCw4Q0FBNkM7QUFFN0M7SUFDRSxJQUFNLFNBQVMsR0FBUTtRQUNyQixpQkFBaUIsRUFBRSxLQUFLO1FBQ3hCLHVCQUF1QixFQUFFLEtBQUs7UUFDOUIseUJBQXlCLEVBQUUsS0FBSztLQUNqQyxDQUFDO0lBRUYsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtZQUM5QyxNQUFNLENBQUMsd0JBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDbEYsT0FBTyxDQUFDO2dCQUNQLGlCQUFpQixFQUFFLEtBQUs7Z0JBQ3hCLHVCQUF1QixFQUFFLEtBQUs7Z0JBQzlCLHlCQUF5QixFQUFFLEtBQUs7Z0JBQ2hDLEdBQUcsRUFBRSxPQUFPO2FBQ2IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseURBQXlELEVBQUU7WUFDNUQsTUFBTSxDQUFDLHdCQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM3RSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsOEVBQThFLEVBQUU7WUFDakYsTUFBTSxDQUFDLHdCQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM3RSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsSUFBSSxjQUE0QixFQUFFLFNBQWMsQ0FBQztRQUVqRCxVQUFVLENBQUM7WUFDVCxTQUFTLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzlFLENBQUM7WUFDRixjQUFjLEdBQUcsSUFBSSw0QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUN0QixFQUFFLENBQUMsbURBQW1ELEVBQUU7Z0JBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDZCxFQUFFLENBQUMsNkVBQTZFLEVBQUU7Z0JBQ2hGLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUVsRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2SCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywrRUFBK0UsRUFBRTtnQkFDbEYsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7Z0JBRTlELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUM7b0JBQzlDLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLE9BQU8sRUFBRSxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRTtpQkFDbkQsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQS9ERCxvQkErREMiLCJmaWxlIjoiYXBwL3NoYXJlZC9zdG9yZXMvZmVhdHVyZS5zdG9yZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmVhdHVyZXMsIEZlYXR1cmVTdG9yZSB9IGZyb20gJy4vZmVhdHVyZS5zdG9yZSc7XG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9mZWF0dXJlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IGluaXRTdGF0ZTogYW55ID0ge1xuICAgIGRpc2FibGVDYXJ0QWNjZXNzOiBmYWxzZSxcbiAgICBkaXNhYmxlQ29sbGVjdGlvbkFjY2VzczogZmFsc2UsXG4gICAgZGlzYWJsZUNvbW1lcmNlQWdyZWVtZW50czogZmFsc2UsXG4gIH07XG5cbiAgZGVzY3JpYmUoJ2ZlYXR1cmVzIHJlZHVjZXInLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhlIHBheWxvYWQgZm9yIEZFQVRVUkUuU0VUX1NUQVRFJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KGZlYXR1cmVzKGluaXRTdGF0ZSwgeyB0eXBlOiAnRkVBVFVSRS5TRVRfU1RBVEUnLCBwYXlsb2FkOiB7IGtleTogJ3ZhbHVlJyB9IH0pKVxuICAgICAgICAudG9FcXVhbCh7XG4gICAgICAgICAgZGlzYWJsZUNhcnRBY2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIGRpc2FibGVDb2xsZWN0aW9uQWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBkaXNhYmxlQ29tbWVyY2VBZ3JlZW1lbnRzOiBmYWxzZSxcbiAgICAgICAgICBrZXk6ICd2YWx1ZSdcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZSBmb3IgYW4gdW5leHBlY3RlZCBhY3Rpb24gdHlwZScsICgpID0+IHtcbiAgICAgIGV4cGVjdChmZWF0dXJlcyhpbml0U3RhdGUsIHsgdHlwZTogJ0JMQUgnLCBwYXlsb2FkOiB7IHNvbWVLZXk6ICdzb21lVmFsdWUnIH0gfSkpXG4gICAgICAgIC50b0VxdWFsKGluaXRTdGF0ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgZGVmYXVsdCBzdGF0ZSBmb3Igbm8gY3VycmVudCBzdGF0ZSBhbmQgYW4gdW5leHBlY3RlZCBhY3Rpb24gdHlwZScsICgpID0+IHtcbiAgICAgIGV4cGVjdChmZWF0dXJlcyh1bmRlZmluZWQsIHsgdHlwZTogJ0JMQUgnLCBwYXlsb2FkOiB7IHNvbWVLZXk6ICdzb21lVmFsdWUnIH0gfSkpXG4gICAgICAgIC50b0VxdWFsKGluaXRTdGF0ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdGZWF0dXJlIFN0b3JlJywgKCkgPT4ge1xuICAgIGxldCBzdG9yZVVuZGVyVGVzdDogRmVhdHVyZVN0b3JlLCBtb2NrU3RvcmU6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0ge1xuICAgICAgICBkaXNwYXRjaDogamFzbWluZS5jcmVhdGVTcHkoJ2Rpc3BhdGNoJyksXG4gICAgICAgIHNlbGVjdDogamFzbWluZS5jcmVhdGVTcHkoJ3NlbGVjdCcpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKGluaXRTdGF0ZSkpXG4gICAgICB9O1xuICAgICAgc3RvcmVVbmRlclRlc3QgPSBuZXcgRmVhdHVyZVN0b3JlKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNBdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBmZWF0dXJlIGlzIG5vdCBkaXNhYmxlZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KHN0b3JlVW5kZXJUZXN0LmlzQXZhaWxhYmxlKCdkaXNhYmxlQ2FydEFjY2VzcycpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2V0JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGRpc3BhdGNoIG9uIHRoZSBzdG9yZSB3aXRoIHRoZSByaWdodCBhY3Rpb24gLSBmb3IgZXhwZWN0ZWQgZGF0YScsICgpID0+IHtcbiAgICAgICAgc3RvcmVVbmRlclRlc3Quc2V0KHsgZGlzYWJsZUNhcnRBY2Nlc3M6ICd0cnVlJyB9KTtcblxuICAgICAgICBleHBlY3QobW9ja1N0b3JlLmRpc3BhdGNoKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdGRUFUVVJFLlNFVF9TVEFURScsIHBheWxvYWQ6IHsgZGlzYWJsZUNhcnRBY2Nlc3M6IHRydWUgfSB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgZGlzcGF0Y2ggb24gdGhlIHN0b3JlIHdpdGggdGhlIHJpZ2h0IGFjdGlvbiAtIGZvciB1bmV4cGVjdGVkIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgIHN0b3JlVW5kZXJUZXN0LnNldCh7IHN0cmlwZVB1YmxpY0tleTogJ3BrX2xia2pvODdldGE4OW5jYScgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tTdG9yZS5kaXNwYXRjaCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgIHR5cGU6ICdGRUFUVVJFLlNFVF9TVEFURScsXG4gICAgICAgICAgcGF5bG9hZDogeyBzdHJpcGVQdWJsaWNLZXk6ICdwa19sYmtqbzg3ZXRhODluY2EnIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
