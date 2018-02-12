"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var privacy_policy_component_1 = require("./privacy-policy.component");
var mock_app_store_1 = require("../store/spec-helpers/mock-app.store");
function main() {
    describe('Privacy Policy Component', function () {
        var componentUnderTest;
        var mockStore;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('privacyPolicy', { document: 'some doc' });
            componentUnderTest = new privacy_policy_component_1.PrivacyPolicyComponent(mockStore);
        });
        describe('get document()', function () {
            it('returns the document from the store', function () {
                var actualDoc;
                componentUnderTest.document.take(1).subscribe(function (docInStore) { return actualDoc = docInStore; });
                expect(actualDoc).toEqual('some doc');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1RUFBb0U7QUFDcEUsdUVBQW9FO0FBRXBFO0lBQ0UsUUFBUSxDQUFDLDBCQUEwQixFQUFFO1FBQ25DLElBQUksa0JBQTBDLENBQUM7UUFDL0MsSUFBSSxTQUF1QixDQUFDO1FBRTVCLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixTQUFTLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDeEUsa0JBQWtCLEdBQUcsSUFBSSxpREFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixFQUFFLENBQUMscUNBQXFDLEVBQUU7Z0JBQ3hDLElBQUksU0FBaUIsQ0FBQztnQkFDdEIsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxTQUFTLEdBQUcsVUFBVSxFQUF0QixDQUFzQixDQUFDLENBQUM7Z0JBQ3BGLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5CRCxvQkFtQkMiLCJmaWxlIjoiYXBwLytwcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXZhY3lQb2xpY3lDb21wb25lbnQgfSBmcm9tICcuL3ByaXZhY3ktcG9saWN5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1ByaXZhY3kgUG9saWN5IENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBQcml2YWN5UG9saWN5Q29tcG9uZW50O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncHJpdmFjeVBvbGljeScsIHsgZG9jdW1lbnQ6ICdzb21lIGRvYycgfSk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUHJpdmFjeVBvbGljeUNvbXBvbmVudChtb2NrU3RvcmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBkb2N1bWVudCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGRvY3VtZW50IGZyb20gdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICBsZXQgYWN0dWFsRG9jOiBzdHJpbmc7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5kb2N1bWVudC50YWtlKDEpLnN1YnNjcmliZShkb2NJblN0b3JlID0+IGFjdHVhbERvYyA9IGRvY0luU3RvcmUpO1xuICAgICAgICBleHBlY3QoYWN0dWFsRG9jKS50b0VxdWFsKCdzb21lIGRvYycpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
