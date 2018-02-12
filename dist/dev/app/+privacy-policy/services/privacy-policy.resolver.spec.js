"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
var privacy_policy_resolver_1 = require("./privacy-policy.resolver");
function main() {
    describe('Privacy Policy Resolver', function () {
        var resolverUnderTest;
        var mockStore;
        var loadDispatchSpy;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            loadDispatchSpy = mockStore.createActionFactoryMethod('privacyPolicy', 'load');
            mockStore.createStateSection('uiConfig', { components: { footer: { config: { privacyPolicyId: { value: '12' } } } } });
            resolverUnderTest = new privacy_policy_resolver_1.PrivacyPolicyResolver(mockStore);
        });
        describe('resolve()', function () {
            it('dispatches the proper action to the store', function () {
                resolverUnderTest.resolve().take(1).subscribe();
                mockStore.expectDispatchFor(loadDispatchSpy, '12');
            });
            it('resolves when there is data in the privacy policy store', function () {
                mockStore.createStateSection('privacyPolicy', { document: 'some-document' });
                var resolved = jasmine.createSpy('resolved');
                resolverUnderTest.resolve().take(1).subscribe(resolved);
                expect(resolved).toHaveBeenCalled();
            });
            it('does not resolve when there is not data in the privacy policy store', function () {
                mockStore.createStateSection('privacyPolicy', { document: null });
                var resolved = jasmine.createSpy('resolved');
                resolverUnderTest.resolve().take(1).subscribe(resolved);
                expect(resolved).not.toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rcHJpdmFjeS1wb2xpY3kvc2VydmljZXMvcHJpdmFjeS1wb2xpY3kucmVzb2x2ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBFQUF1RTtBQUN2RSxxRUFBa0U7QUFFbEU7SUFDRSxRQUFRLENBQUMseUJBQXlCLEVBQUU7UUFDbEMsSUFBSSxpQkFBd0MsQ0FBQztRQUM3QyxJQUFJLFNBQXVCLENBQUM7UUFDNUIsSUFBSSxlQUE0QixDQUFDO1FBRWpDLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixlQUFlLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2SCxpQkFBaUIsR0FBRyxJQUFJLCtDQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixFQUFFLENBQUMsMkNBQTJDLEVBQUU7Z0JBQzlDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFFaEQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx5REFBeUQsRUFBRTtnQkFDNUQsU0FBUyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUU3RSxJQUFJLFFBQVEsR0FBZ0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDMUQsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMscUVBQXFFLEVBQUU7Z0JBQ3hFLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFFbEUsSUFBSSxRQUFRLEdBQWdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFELGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBckNELG9CQXFDQyIsImZpbGUiOiJhcHAvK3ByaXZhY3ktcG9saWN5L3NlcnZpY2VzL3ByaXZhY3ktcG9saWN5LnJlc29sdmVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgUHJpdmFjeVBvbGljeVJlc29sdmVyIH0gZnJvbSAnLi9wcml2YWN5LXBvbGljeS5yZXNvbHZlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUHJpdmFjeSBQb2xpY3kgUmVzb2x2ZXInLCAoKSA9PiB7XG4gICAgbGV0IHJlc29sdmVyVW5kZXJUZXN0OiBQcml2YWN5UG9saWN5UmVzb2x2ZXI7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuICAgIGxldCBsb2FkRGlzcGF0Y2hTcHk6IGphc21pbmUuU3B5O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBsb2FkRGlzcGF0Y2hTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncHJpdmFjeVBvbGljeScsICdsb2FkJyk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCd1aUNvbmZpZycsIHsgY29tcG9uZW50czogeyBmb290ZXI6IHsgY29uZmlnOiB7IHByaXZhY3lQb2xpY3lJZDogeyB2YWx1ZTogJzEyJyB9IH0gfSB9IH0pO1xuICAgICAgcmVzb2x2ZXJVbmRlclRlc3QgPSBuZXcgUHJpdmFjeVBvbGljeVJlc29sdmVyKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2Rpc3BhdGNoZXMgdGhlIHByb3BlciBhY3Rpb24gdG8gdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKCkudGFrZSgxKS5zdWJzY3JpYmUoKTtcblxuICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IobG9hZERpc3BhdGNoU3B5LCAnMTInKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmVzb2x2ZXMgd2hlbiB0aGVyZSBpcyBkYXRhIGluIHRoZSBwcml2YWN5IHBvbGljeSBzdG9yZScsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncHJpdmFjeVBvbGljeScsIHsgZG9jdW1lbnQ6ICdzb21lLWRvY3VtZW50JyB9KTtcblxuICAgICAgICBsZXQgcmVzb2x2ZWQ6IGphc21pbmUuU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoJ3Jlc29sdmVkJyk7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUoKS50YWtlKDEpLnN1YnNjcmliZShyZXNvbHZlZCk7XG4gICAgICAgIGV4cGVjdChyZXNvbHZlZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzIG5vdCByZXNvbHZlIHdoZW4gdGhlcmUgaXMgbm90IGRhdGEgaW4gdGhlIHByaXZhY3kgcG9saWN5IHN0b3JlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdwcml2YWN5UG9saWN5JywgeyBkb2N1bWVudDogbnVsbCB9KTtcblxuICAgICAgICBsZXQgcmVzb2x2ZWQ6IGphc21pbmUuU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoJ3Jlc29sdmVkJyk7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUoKS50YWtlKDEpLnN1YnNjcmliZShyZXNvbHZlZCk7XG4gICAgICAgIGV4cGVjdChyZXNvbHZlZCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
