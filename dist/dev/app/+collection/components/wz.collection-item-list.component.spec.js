"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_collection_item_list_component_1 = require("./wz.collection-item-list.component");
var Observable_1 = require("rxjs/Observable");
function main() {
    describe('Wz Collection Item List Component', function () {
        var componentUnderTest;
        var mockCapabilitiesService;
        beforeEach(function () {
            mockCapabilitiesService = {
                editCollection: jasmine.createSpy('editCollection').and.returnValue(Observable_1.Observable.of(true))
            };
            componentUnderTest = new wz_collection_item_list_component_1.WzCollectionItemListComponent(mockCapabilitiesService);
            componentUnderTest.currentCollection = mockCurrentCollection();
        });
        describe('selectActiveCollection()', function () {
            it('emits setActiveCollection with a collection id', function () {
                spyOn(componentUnderTest.setActiveCollection, 'emit');
                componentUnderTest.selectActiveCollection(123);
                expect(componentUnderTest.setActiveCollection.emit).toHaveBeenCalledWith(123);
            });
        });
        describe('setCurrentCollection()', function () {
            it('takes a collection and sets the currentCollection var to it', function () {
                componentUnderTest.setCurrentCollection(mockCollection());
                expect(componentUnderTest.currentCollection).toEqual(mockCollection());
            });
        });
        describe('collectionIsShared()', function () {
            it('should return true when collection has editors or viewers', function () {
                expect(componentUnderTest.collectionIsShared(mockCollection())).toBe(true);
            });
            it('should return false when collection does not have editors or viewers', function () {
                expect(componentUnderTest.collectionIsShared(mockCollectionNotShared())).toBe(false);
            });
        });
        describe('userCanEditCollection()', function () {
            it('should call editCollection() on the cababilities service', function () {
                var result;
                componentUnderTest.userCanEditCollection(mockCollection()).take(1).subscribe(function (r) { return result = r; });
                expect(result).toBe(true);
            });
        });
        describe('collectionViewerIsOwner()', function () {
            it('should return true when person viewing the collection is the owner', function () {
                expect(componentUnderTest.collectionViewerIsOwner(mockCollection())).toBe(true);
            });
            it('should return false when person viewing the collection is the NOT owner', function () {
                expect(componentUnderTest.collectionViewerIsOwner(mockCollectionNotOwned())).toBe(false);
            });
        });
        describe('edit()', function () {
            it('emits editCollection with a collection', function () {
                spyOn(componentUnderTest.editCollection, 'emit');
                componentUnderTest.edit(mockCollection());
                expect(componentUnderTest.editCollection.emit).toHaveBeenCalledWith(mockCollection());
            });
        });
        describe('sharedMembers()', function () {
            it('emits showShareMembers with a collection', function () {
                spyOn(componentUnderTest.showShareMembers, 'emit');
                componentUnderTest.sharedMembers(mockCollection());
                expect(componentUnderTest.showShareMembers.emit).toHaveBeenCalledWith(mockCollection());
            });
        });
        describe('delete()', function () {
            it('emits deleteCollection with a collection', function () {
                spyOn(componentUnderTest.deleteCollection, 'emit');
                componentUnderTest.delete(mockCollection());
                expect(componentUnderTest.deleteCollection.emit).toHaveBeenCalledWith(mockCollection());
            });
        });
        describe('duplicate()', function () {
            it('emits duplicateCollection with the current collection id', function () {
                spyOn(componentUnderTest.duplicateCollection, 'emit');
                componentUnderTest.duplicate();
                expect(componentUnderTest.duplicateCollection.emit).toHaveBeenCalledWith(3);
            });
        });
        describe('generateLegacyLink()', function () {
            it('emits generateCollectionLink with the current collection id', function () {
                spyOn(componentUnderTest.generateCollectionLink, 'emit');
                componentUnderTest.generateLegacyLink();
                expect(componentUnderTest.generateCollectionLink.emit).toHaveBeenCalledWith(3);
            });
        });
        describe('onCreateShareDialog()', function () {
            it('emits createShareDialog with the current collection', function () {
                spyOn(componentUnderTest.createShareDialog, 'emit');
                componentUnderTest.onCreateShareDialog({ collection: 'some collection' });
                expect(componentUnderTest.createShareDialog.emit).toHaveBeenCalledWith({ collection: 'some collection' });
            });
        });
        describe('notOwnerOf()', function () {
            it('return true if the current user is not the collection owner', function () {
                expect(componentUnderTest.notOwnerOf({ userRole: 'editor' })).toBe(true);
            });
            it('return false if the current user is the collection owner', function () {
                expect(componentUnderTest.notOwnerOf({ userRole: 'owner' })).toBe(false);
            });
        });
    });
}
exports.main = main;
;
function mockCollection() {
    return {
        id: 2,
        siteName: 'core',
        name: 'james billings',
        createdOn: new Date('2017-10-17T19:20:25.083Z'),
        owner: 123,
        tags: 'cat, dog, cow',
        userRole: 'owner',
        editors: [
            { id: 1, firstName: 'Tom', lastName: 'Thumb', emailAddress: 'tt@test.co' },
            { id: 2, firstName: 'Jane', lastName: 'Doe', emailAddress: 'jd@test.co' },
            { id: 300, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }
        ],
        viewers: [{ id: 4, firstName: 'Mary', lastName: 'Maze', emailAddress: 'mm@test.co' }]
    };
}
function mockCurrentCollection() {
    return {
        id: 3,
        siteName: 'core',
        name: 'Reptiles',
        createdOn: new Date('2017-10-12T14:20:25.083Z'),
        owner: 333,
        tags: 'frog, lizard, snake',
        userRole: 'owner',
        editors: [
            { id: 6, firstName: 'Tom', lastName: 'Thumb', emailAddress: 'tt@test.co' },
            { id: 7, firstName: 'Jane', lastName: 'Doe', emailAddress: 'jd@test.co' },
            { id: 800, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }
        ],
        viewers: [{ id: 5, firstName: 'Mary', lastName: 'Maze', emailAddress: 'mm@test.co' }]
    };
}
function mockCollectionNotShared() {
    return {
        id: 4,
        siteName: 'core',
        name: 'Business',
        createdOn: new Date('2017-07-12T14:20:25.083Z'),
        owner: 333,
        tags: 'suit, tie, pants',
        userRole: 'owner'
    };
}
function mockCollectionNotOwned() {
    return {
        id: 5,
        siteName: 'core',
        name: 'Mockeriffic collection',
        createdOn: new Date('2017-06-14T16:20:25.083Z'),
        owner: 7676,
        tags: 'blue, green',
        userRole: 'editor',
        editors: [
            { id: 6542, firstName: 'Tom', lastName: 'Thumb', emailAddress: 'tt@test.co' },
            { id: 3, firstName: 'Jane', lastName: 'Doe', emailAddress: 'jd@test.co' },
            { id: 100, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }
        ]
    };
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL3d6LmNvbGxlY3Rpb24taXRlbS1saXN0LmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUZBQW9GO0FBRXBGLDhDQUE2QztBQUU3QztJQUNFLFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRTtRQUM1QyxJQUFJLGtCQUFpRCxDQUFDO1FBQ3RELElBQUksdUJBQTRCLENBQUM7UUFFakMsVUFBVSxDQUFDO1lBQ1QsdUJBQXVCLEdBQUc7Z0JBQ3hCLGNBQWMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6RixDQUFDO1lBRUYsa0JBQWtCLEdBQUcsSUFBSSxpRUFBNkIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2hGLGtCQUFrQixDQUFDLGlCQUFpQixHQUFHLHFCQUFxQixFQUFFLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsMEJBQTBCLEVBQUU7WUFDbkMsRUFBRSxDQUFDLGdEQUFnRCxFQUFFO2dCQUNuRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3RELGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUUvQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtZQUNqQyxFQUFFLENBQUMsNkRBQTZELEVBQUU7Z0JBQ2hFLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0JBRTFELE1BQU0sQ0FB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LFVBQVU7UUFDaEIsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLDBCQUEwQixDQUFDO1FBQy9DLEtBQUssRUFBRSxHQUFHO1FBQ1YsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixRQUFRLEVBQUUsT0FBTztLQUNsQixDQUFDO0FBQ0osQ0FBQztBQUNEO0lBQ0UsTUFBTSxDQUFDO1FBQ0wsRUFBRSxFQUFFLENBQUM7UUFDTCxRQUFRLEVBQUUsTUFBTTtRQUNoQixJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQywwQkFBMEIsQ0FBQztRQUMvQyxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxhQUFhO1FBQ25CLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRTtZQUM3RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUU7WUFDekUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFO1NBQUM7S0FDOUUsQ0FBQztBQUNKLENBQUMiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL2NvbXBvbmVudHMvd3ouY29sbGVjdGlvbi1pdGVtLWxpc3QuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXekNvbGxlY3Rpb25JdGVtTGlzdENvbXBvbmVudCB9IGZyb20gJy4vd3ouY29sbGVjdGlvbi1pdGVtLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBDb2xsZWN0aW9uIEl0ZW0gTGlzdCBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pDb2xsZWN0aW9uSXRlbUxpc3RDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tDYXBhYmlsaXRpZXNTZXJ2aWNlOiBhbnk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tDYXBhYmlsaXRpZXNTZXJ2aWNlID0ge1xuICAgICAgICBlZGl0Q29sbGVjdGlvbjogamFzbWluZS5jcmVhdGVTcHkoJ2VkaXRDb2xsZWN0aW9uJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YodHJ1ZSkpXG4gICAgICB9O1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgV3pDb2xsZWN0aW9uSXRlbUxpc3RDb21wb25lbnQobW9ja0NhcGFiaWxpdGllc1NlcnZpY2UpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmN1cnJlbnRDb2xsZWN0aW9uID0gbW9ja0N1cnJlbnRDb2xsZWN0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2VsZWN0QWN0aXZlQ29sbGVjdGlvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHNldEFjdGl2ZUNvbGxlY3Rpb24gd2l0aCBhIGNvbGxlY3Rpb24gaWQnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5zZXRBY3RpdmVDb2xsZWN0aW9uLCAnZW1pdCcpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0QWN0aXZlQ29sbGVjdGlvbigxMjMpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2V0QWN0aXZlQ29sbGVjdGlvbi5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgxMjMpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2V0Q3VycmVudENvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgIGl0KCd0YWtlcyBhIGNvbGxlY3Rpb24gYW5kIHNldHMgdGhlIGN1cnJlbnRDb2xsZWN0aW9uIHZhciB0byBpdCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNldEN1cnJlbnRDb2xsZWN0aW9uKG1vY2tDb2xsZWN0aW9uKCkpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY3VycmVudENvbGxlY3Rpb24pLnRvRXF1YWwobW9ja0NvbGxlY3Rpb24oKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb2xsZWN0aW9uSXNTaGFyZWQoKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiBjb2xsZWN0aW9uIGhhcyBlZGl0b3JzIG9yIHZpZXdlcnMnLCAoKSA9PiB7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uSXNTaGFyZWQobW9ja0NvbGxlY3Rpb24oKSkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gY29sbGVjdGlvbiBkb2VzIG5vdCBoYXZlIGVkaXRvcnMgb3Igdmlld2VycycsICgpID0+IHtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25Jc1NoYXJlZChtb2NrQ29sbGVjdGlvbk5vdFNoYXJlZCgpKSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd1c2VyQ2FuRWRpdENvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBlZGl0Q29sbGVjdGlvbigpIG9uIHRoZSBjYWJhYmlsaXRpZXMgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbjtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5FZGl0Q29sbGVjdGlvbihtb2NrQ29sbGVjdGlvbigpKS50YWtlKDEpLnN1YnNjcmliZShyID0+IHJlc3VsdCA9IHIpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb2xsZWN0aW9uVmlld2VySXNPd25lcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIHBlcnNvbiB2aWV3aW5nIHRoZSBjb2xsZWN0aW9uIGlzIHRoZSBvd25lcicsICgpID0+IHtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25WaWV3ZXJJc093bmVyKG1vY2tDb2xsZWN0aW9uKCkpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIHBlcnNvbiB2aWV3aW5nIHRoZSBjb2xsZWN0aW9uIGlzIHRoZSBOT1Qgb3duZXInLCAoKSA9PiB7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uVmlld2VySXNPd25lcihtb2NrQ29sbGVjdGlvbk5vdE93bmVkKCkpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyBlZGl0Q29sbGVjdGlvbiB3aXRoIGEgY29sbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LmVkaXRDb2xsZWN0aW9uLCAnZW1pdCcpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZWRpdChtb2NrQ29sbGVjdGlvbigpKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmVkaXRDb2xsZWN0aW9uLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1vY2tDb2xsZWN0aW9uKCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hhcmVkTWVtYmVycygpJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHNob3dTaGFyZU1lbWJlcnMgd2l0aCBhIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5zaG93U2hhcmVNZW1iZXJzLCAnZW1pdCcpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2hhcmVkTWVtYmVycyhtb2NrQ29sbGVjdGlvbigpKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dTaGFyZU1lbWJlcnMuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0NvbGxlY3Rpb24oKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkZWxldGUoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyBkZWxldGVDb2xsZWN0aW9uIHdpdGggYSBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QuZGVsZXRlQ29sbGVjdGlvbiwgJ2VtaXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRlbGV0ZShtb2NrQ29sbGVjdGlvbigpKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmRlbGV0ZUNvbGxlY3Rpb24uZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0NvbGxlY3Rpb24oKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkdXBsaWNhdGUoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyBkdXBsaWNhdGVDb2xsZWN0aW9uIHdpdGggdGhlIGN1cnJlbnQgY29sbGVjdGlvbiBpZCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LmR1cGxpY2F0ZUNvbGxlY3Rpb24sICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5kdXBsaWNhdGUoKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmR1cGxpY2F0ZUNvbGxlY3Rpb24uZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZW5lcmF0ZUxlZ2FjeUxpbmsoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyBnZW5lcmF0ZUNvbGxlY3Rpb25MaW5rIHdpdGggdGhlIGN1cnJlbnQgY29sbGVjdGlvbiBpZCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LmdlbmVyYXRlQ29sbGVjdGlvbkxpbmssICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5nZW5lcmF0ZUxlZ2FjeUxpbmsoKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmdlbmVyYXRlQ29sbGVjdGlvbkxpbmsuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbkNyZWF0ZVNoYXJlRGlhbG9nKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgY3JlYXRlU2hhcmVEaWFsb2cgd2l0aCB0aGUgY3VycmVudCBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QuY3JlYXRlU2hhcmVEaWFsb2csICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNyZWF0ZVNoYXJlRGlhbG9nKHsgY29sbGVjdGlvbjogJ3NvbWUgY29sbGVjdGlvbicgfSBhcyBhbnkpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY3JlYXRlU2hhcmVEaWFsb2cuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBjb2xsZWN0aW9uOiAnc29tZSBjb2xsZWN0aW9uJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ25vdE93bmVyT2YoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm4gdHJ1ZSBpZiB0aGUgY3VycmVudCB1c2VyIGlzIG5vdCB0aGUgY29sbGVjdGlvbiBvd25lcicsICgpID0+IHtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5vdE93bmVyT2YoeyB1c2VyUm9sZTogJ2VkaXRvcicgfSBhcyBhbnkpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm4gZmFsc2UgaWYgdGhlIGN1cnJlbnQgdXNlciBpcyB0aGUgY29sbGVjdGlvbiBvd25lcicsICgpID0+IHtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5vdE93bmVyT2YoeyB1c2VyUm9sZTogJ293bmVyJyB9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBtb2NrQ29sbGVjdGlvbigpOiBDb2xsZWN0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogMixcbiAgICBzaXRlTmFtZTogJ2NvcmUnLFxuICAgIG5hbWU6ICdqYW1lcyBiaWxsaW5ncycsXG4gICAgY3JlYXRlZE9uOiBuZXcgRGF0ZSgnMjAxNy0xMC0xN1QxOToyMDoyNS4wODNaJyksXG4gICAgb3duZXI6IDEyMyxcbiAgICB0YWdzOiAnY2F0LCBkb2csIGNvdycsXG4gICAgdXNlclJvbGU6ICdvd25lcicsXG4gICAgZWRpdG9yczogW1xuICAgICAgeyBpZDogMSwgZmlyc3ROYW1lOiAnVG9tJywgbGFzdE5hbWU6ICdUaHVtYicsIGVtYWlsQWRkcmVzczogJ3R0QHRlc3QuY28nIH0sXG4gICAgICB7IGlkOiAyLCBmaXJzdE5hbWU6ICdKYW5lJywgbGFzdE5hbWU6ICdEb2UnLCBlbWFpbEFkZHJlc3M6ICdqZEB0ZXN0LmNvJyB9LFxuICAgICAgeyBpZDogMzAwLCBmaXJzdE5hbWU6ICdUeScsIGxhc3ROYW1lOiAnVGVzdCcsIGVtYWlsQWRkcmVzczogJ3R5QHRlc3QuY28nIH1dLFxuICAgIHZpZXdlcnM6IFt7IGlkOiA0LCBmaXJzdE5hbWU6ICdNYXJ5JywgbGFzdE5hbWU6ICdNYXplJywgZW1haWxBZGRyZXNzOiAnbW1AdGVzdC5jbycgfV1cbiAgfTtcbn1cbmZ1bmN0aW9uIG1vY2tDdXJyZW50Q29sbGVjdGlvbigpOiBDb2xsZWN0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogMyxcbiAgICBzaXRlTmFtZTogJ2NvcmUnLFxuICAgIG5hbWU6ICdSZXB0aWxlcycsXG4gICAgY3JlYXRlZE9uOiBuZXcgRGF0ZSgnMjAxNy0xMC0xMlQxNDoyMDoyNS4wODNaJyksXG4gICAgb3duZXI6IDMzMyxcbiAgICB0YWdzOiAnZnJvZywgbGl6YXJkLCBzbmFrZScsXG4gICAgdXNlclJvbGU6ICdvd25lcicsXG4gICAgZWRpdG9yczogW1xuICAgICAgeyBpZDogNiwgZmlyc3ROYW1lOiAnVG9tJywgbGFzdE5hbWU6ICdUaHVtYicsIGVtYWlsQWRkcmVzczogJ3R0QHRlc3QuY28nIH0sXG4gICAgICB7IGlkOiA3LCBmaXJzdE5hbWU6ICdKYW5lJywgbGFzdE5hbWU6ICdEb2UnLCBlbWFpbEFkZHJlc3M6ICdqZEB0ZXN0LmNvJyB9LFxuICAgICAgeyBpZDogODAwLCBmaXJzdE5hbWU6ICdUeScsIGxhc3ROYW1lOiAnVGVzdCcsIGVtYWlsQWRkcmVzczogJ3R5QHRlc3QuY28nIH1dLFxuICAgIHZpZXdlcnM6IFt7IGlkOiA1LCBmaXJzdE5hbWU6ICdNYXJ5JywgbGFzdE5hbWU6ICdNYXplJywgZW1haWxBZGRyZXNzOiAnbW1AdGVzdC5jbycgfV1cbiAgfTtcbn1cbmZ1bmN0aW9uIG1vY2tDb2xsZWN0aW9uTm90U2hhcmVkKCk6IENvbGxlY3Rpb24ge1xuICByZXR1cm4ge1xuICAgIGlkOiA0LFxuICAgIHNpdGVOYW1lOiAnY29yZScsXG4gICAgbmFtZTogJ0J1c2luZXNzJyxcbiAgICBjcmVhdGVkT246IG5ldyBEYXRlKCcyMDE3LTA3LTEyVDE0OjIwOjI1LjA4M1onKSxcbiAgICBvd25lcjogMzMzLFxuICAgIHRhZ3M6ICdzdWl0LCB0aWUsIHBhbnRzJyxcbiAgICB1c2VyUm9sZTogJ293bmVyJ1xuICB9O1xufVxuZnVuY3Rpb24gbW9ja0NvbGxlY3Rpb25Ob3RPd25lZCgpOiBDb2xsZWN0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogNSxcbiAgICBzaXRlTmFtZTogJ2NvcmUnLFxuICAgIG5hbWU6ICdNb2NrZXJpZmZpYyBjb2xsZWN0aW9uJyxcbiAgICBjcmVhdGVkT246IG5ldyBEYXRlKCcyMDE3LTA2LTE0VDE2OjIwOjI1LjA4M1onKSxcbiAgICBvd25lcjogNzY3NixcbiAgICB0YWdzOiAnYmx1ZSwgZ3JlZW4nLFxuICAgIHVzZXJSb2xlOiAnZWRpdG9yJyxcbiAgICBlZGl0b3JzOiBbXG4gICAgICB7IGlkOiA2NTQyLCBmaXJzdE5hbWU6ICdUb20nLCBsYXN0TmFtZTogJ1RodW1iJywgZW1haWxBZGRyZXNzOiAndHRAdGVzdC5jbycgfSxcbiAgICAgIHsgaWQ6IDMsIGZpcnN0TmFtZTogJ0phbmUnLCBsYXN0TmFtZTogJ0RvZScsIGVtYWlsQWRkcmVzczogJ2pkQHRlc3QuY28nIH0sXG4gICAgICB7IGlkOiAxMDAsIGZpcnN0TmFtZTogJ1R5JywgbGFzdE5hbWU6ICdUZXN0JywgZW1haWxBZGRyZXNzOiAndHlAdGVzdC5jbycgfV1cbiAgfTtcbn1cbiJdfQ==
