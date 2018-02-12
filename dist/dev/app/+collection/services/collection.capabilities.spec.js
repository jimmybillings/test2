"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var collection_capabilities_1 = require("./collection.capabilities");
function main() {
    describe('Collection Capabilities', function () {
        var capabilitiesUnderTest, mockCurrentUserService;
        beforeEach(function () {
            mockCurrentUserService = { data: Observable_1.Observable.of({ id: 123, editableCollections: [7] }) };
            capabilitiesUnderTest = new collection_capabilities_1.CollectionCapabilities(mockCurrentUserService, null, null);
        });
        describe('editCollection()', function () {
            describe('returns an observable of true', function () {
                it('when the user\'s id is the same as the collection\'s owner id', function () {
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ owner: 123 }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(true);
                });
                it('when the user has the collection id in his editableCollections array', function () {
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ id: 7 }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(true);
                });
                it('when the collection has the user in its editors array', function () {
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ editors: [{ id: 123 }] }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(true);
                });
                it('when the collection\'s userRole is \'editor\'', function () {
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ userRole: 'editor' }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(true);
                });
                it('when the collection\'s userRole is \'owner\'', function () {
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ userRole: 'owner' }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(true);
                });
            });
            describe('returns an observable of false', function () {
                it('when the user\'s id is mot the same as the collection\'s owner id', function () {
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ owner: 1111 }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(false);
                });
                it('when the user does not have the collection id in his editableCollections array', function () {
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ id: 9876 }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(false);
                });
                it('when the collection does not have the user in its editors array', function () {
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ editors: [{ id: 1010 }] }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(false);
                });
                it('when the collection\'s userRole is not \'editor\' or \'owner\'', function () {
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ userRole: 'notEditorOrOwner' }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(false);
                });
                it('when the user id and collection owner id are both 0', function () {
                    mockCurrentUserService = { data: Observable_1.Observable.of({ id: 0 }) };
                    capabilitiesUnderTest = new collection_capabilities_1.CollectionCapabilities(mockCurrentUserService, null, null);
                    var canEdit;
                    capabilitiesUnderTest.editCollection({ owner: 0 }).subscribe(function (d) { return canEdit = d; });
                    expect(canEdit).toBe(false);
                });
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9uLmNhcGFiaWxpdGllcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDLHFFQUFtRTtBQUVuRTtJQUNFLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtRQUNsQyxJQUFJLHFCQUE2QyxFQUFFLHNCQUEyQixDQUFDO1FBRS9FLFVBQVUsQ0FBQztZQUNULHNCQUFzQixHQUFHLEVBQUUsSUFBSSxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3hGLHFCQUFxQixHQUFHLElBQUksZ0RBQXNCLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pGLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLFFBQVEsQ0FBQywrQkFBK0IsRUFBRTtnQkFDeEMsRUFBRSxDQUFDLCtEQUErRCxFQUFFO29CQUNsRSxJQUFJLE9BQWdCLENBQUM7b0JBQ3JCLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE9BQU8sR0FBRyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7b0JBQ3hGLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRTtvQkFDekUsSUFBSSxPQUFnQixDQUFDO29CQUNyQixxQkFBcUIsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFP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b0JBQ25FLElBQUksT0FBZ0IsQ0FBQztvQkFDckIscUJBQXFCLENBQUMsY0FBYyxDQUFDLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFPLEdBQUcsQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFDO29CQUMxRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMscURBQXFELEVBQUU7b0JBQ3hELHNCQUFzQixHQUFHLEVBQUUsSUFBSSxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDNUQscUJBQXFCLEdBQUcsSUFBSSxnREFBc0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBRXZGLElBQUksT0FBZ0IsQ0FBQztvQkFDckIscUJBQXFCLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsT0FBTyxHQUFHLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztvQkFDdEYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBOUVELG9CQThFQztBQUFBLENBQUMiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL3NlcnZpY2VzL2NvbGxlY3Rpb24uY2FwYWJpbGl0aWVzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgQ29sbGVjdGlvbkNhcGFiaWxpdGllcyB9IGZyb20gJy4vY29sbGVjdGlvbi5jYXBhYmlsaXRpZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NvbGxlY3Rpb24gQ2FwYWJpbGl0aWVzJywgKCkgPT4ge1xuICAgIGxldCBjYXBhYmlsaXRpZXNVbmRlclRlc3Q6IENvbGxlY3Rpb25DYXBhYmlsaXRpZXMsIG1vY2tDdXJyZW50VXNlclNlcnZpY2U6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGlkOiAxMjMsIGVkaXRhYmxlQ29sbGVjdGlvbnM6IFs3XSB9KSB9O1xuICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0ID0gbmV3IENvbGxlY3Rpb25DYXBhYmlsaXRpZXMobW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbnVsbCwgbnVsbCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZWRpdENvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGFuIG9ic2VydmFibGUgb2YgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXJcXCdzIGlkIGlzIHRoZSBzYW1lIGFzIHRoZSBjb2xsZWN0aW9uXFwncyBvd25lciBpZCcsICgpID0+IHtcbiAgICAgICAgICBsZXQgY2FuRWRpdDogYm9vbGVhbjtcbiAgICAgICAgICBjYXBhYmlsaXRpZXNVbmRlclRlc3QuZWRpdENvbGxlY3Rpb24oeyBvd25lcjogMTIzIH0gYXMgYW55KS5zdWJzY3JpYmUoZCA9PiBjYW5FZGl0ID0gZCk7XG4gICAgICAgICAgZXhwZWN0KGNhbkVkaXQpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGhhcyB0aGUgY29sbGVjdGlvbiBpZCBpbiBoaXMgZWRpdGFibGVDb2xsZWN0aW9ucyBhcnJheScsICgpID0+IHtcbiAgICAgICAgICBsZXQgY2FuRWRpdDogYm9vbGVhbjtcbiAgICAgICAgICBjYXBhYmlsaXRpZXNVbmRlclRlc3QuZWRpdENvbGxlY3Rpb24oeyBpZDogNyB9IGFzIGFueSkuc3Vic2NyaWJlKGQgPT4gY2FuRWRpdCA9IGQpO1xuICAgICAgICAgIGV4cGVjdChjYW5FZGl0KS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgY29sbGVjdGlvbiBoYXMgdGhlIHVzZXIgaW4gaXRzIGVkaXRvcnMgYXJyYXknLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IGNhbkVkaXQ6IGJvb2xlYW47XG4gICAgICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0LmVkaXRDb2xsZWN0aW9uKHsgZWRpdG9yczogW3sgaWQ6IDEyMyB9XSB9IGFzIGFueSkuc3Vic2NyaWJlKGQgPT4gY2FuRWRpdCA9IGQpO1xuICAgICAgICAgIGV4cGVjdChjYW5FZGl0KS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgY29sbGVjdGlvblxcJ3MgdXNlclJvbGUgaXMgXFwnZWRpdG9yXFwnJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBjYW5FZGl0OiBib29sZWFuO1xuICAgICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdC5lZGl0Q29sbGVjdGlvbih7IHVzZXJSb2xlOiAnZWRpdG9yJyB9IGFzIGFueSkuc3Vic2NyaWJlKGQgPT4gY2FuRWRpdCA9IGQpO1xuICAgICAgICAgIGV4cGVjdChjYW5FZGl0KS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgY29sbGVjdGlvblxcJ3MgdXNlclJvbGUgaXMgXFwnb3duZXJcXCcnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IGNhbkVkaXQ6IGJvb2xlYW47XG4gICAgICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0LmVkaXRDb2xsZWN0aW9uKHsgdXNlclJvbGU6ICdvd25lcicgfSBhcyBhbnkpLnN1YnNjcmliZShkID0+IGNhbkVkaXQgPSBkKTtcbiAgICAgICAgICBleHBlY3QoY2FuRWRpdCkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgYW4gb2JzZXJ2YWJsZSBvZiBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXJcXCdzIGlkIGlzIG1vdCB0aGUgc2FtZSBhcyB0aGUgY29sbGVjdGlvblxcJ3Mgb3duZXIgaWQnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IGNhbkVkaXQ6IGJvb2xlYW47XG4gICAgICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0LmVkaXRDb2xsZWN0aW9uKHsgb3duZXI6IDExMTEgfSBhcyBhbnkpLnN1YnNjcmliZShkID0+IGNhbkVkaXQgPSBkKTtcbiAgICAgICAgICBleHBlY3QoY2FuRWRpdCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGRvZXMgbm90IGhhdmUgdGhlIGNvbGxlY3Rpb24gaWQgaW4gaGlzIGVkaXRhYmxlQ29sbGVjdGlvbnMgYXJyYXknLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IGNhbkVkaXQ6IGJvb2xlYW47XG4gICAgICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0LmVkaXRDb2xsZWN0aW9uKHsgaWQ6IDk4NzYgfSBhcyBhbnkpLnN1YnNjcmliZShkID0+IGNhbkVkaXQgPSBkKTtcbiAgICAgICAgICBleHBlY3QoY2FuRWRpdCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBjb2xsZWN0aW9uIGRvZXMgbm90IGhhdmUgdGhlIHVzZXIgaW4gaXRzIGVkaXRvcnMgYXJyYXknLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IGNhbkVkaXQ6IGJvb2xlYW47XG4gICAgICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0LmVkaXRDb2xsZWN0aW9uKHsgZWRpdG9yczogW3sgaWQ6IDEwMTAgfV0gfSBhcyBhbnkpLnN1YnNjcmliZShkID0+IGNhbkVkaXQgPSBkKTtcbiAgICAgICAgICBleHBlY3QoY2FuRWRpdCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBjb2xsZWN0aW9uXFwncyB1c2VyUm9sZSBpcyBub3QgXFwnZWRpdG9yXFwnIG9yIFxcJ293bmVyXFwnJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBjYW5FZGl0OiBib29sZWFuO1xuICAgICAgICAgIGNhcGFiaWxpdGllc1VuZGVyVGVzdC5lZGl0Q29sbGVjdGlvbih7IHVzZXJSb2xlOiAnbm90RWRpdG9yT3JPd25lcicgfSBhcyBhbnkpLnN1YnNjcmliZShkID0+IGNhbkVkaXQgPSBkKTtcbiAgICAgICAgICBleHBlY3QoY2FuRWRpdCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGlkIGFuZCBjb2xsZWN0aW9uIG93bmVyIGlkIGFyZSBib3RoIDAnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGlkOiAwIH0pIH07XG4gICAgICAgICAgY2FwYWJpbGl0aWVzVW5kZXJUZXN0ID0gbmV3IENvbGxlY3Rpb25DYXBhYmlsaXRpZXMobW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbnVsbCwgbnVsbCk7XG5cbiAgICAgICAgICBsZXQgY2FuRWRpdDogYm9vbGVhbjtcbiAgICAgICAgICBjYXBhYmlsaXRpZXNVbmRlclRlc3QuZWRpdENvbGxlY3Rpb24oeyBvd25lcjogMCB9IGFzIGFueSkuc3Vic2NyaWJlKGQgPT4gY2FuRWRpdCA9IGQpO1xuICAgICAgICAgIGV4cGVjdChjYW5FZGl0KS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4iXX0=
