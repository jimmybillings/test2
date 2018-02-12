"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var one_level_view_component_1 = require("./one-level-view.component");
function main() {
    describe('One Level View Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new one_level_view_component_1.OneLevelViewComponent();
            componentUnderTest.navigate.emit = jasmine.createSpy('navigate emitter');
        });
        describe('onClick()', function () {
            var mockResult;
            beforeEach(function () {
                mockResult = { id: 42, name: 'A name', hasMore: true };
            });
            it('emits the expected event when the clicked result has children', function () {
                componentUnderTest.onClick(mockResult);
                expect(componentUnderTest.navigate.emit)
                    .toHaveBeenCalledWith({ pathSegment: { ids: [42], names: ['A name'] }, method: 'nextLevel' });
            });
            it('emits the expected event when the clicked result does not have children', function () {
                mockResult.hasMore = false;
                componentUnderTest.onClick(mockResult);
                expect(componentUnderTest.navigate.emit)
                    .toHaveBeenCalledWith({ pathSegment: { ids: [42], names: ['A name'] }, method: 'search' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L2NvbXBvbmVudHMvb25lLWxldmVsLXZpZXcuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1RUFBbUU7QUFFbkU7SUFDRSxRQUFRLENBQUMsMEJBQTBCLEVBQUU7UUFDbkMsSUFBSSxrQkFBeUMsQ0FBQztRQUU5QyxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLGdEQUFxQixFQUFFLENBQUM7WUFDakQsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksVUFBZSxDQUFDO1lBRXBCLFVBQVUsQ0FBQztnQkFDVCxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLCtEQUErRCxFQUFFO2dCQUNsRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXZDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO3FCQUNyQyxvQkFBb0IsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDbEcsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMseUVBQXlFLEVBQUU7Z0JBQzVFLFVBQVUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXZDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO3FCQUNyQyxvQkFBb0IsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDL0YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhDRCxvQkFnQ0MiLCJmaWxlIjoiYXBwLytnYWxsZXJ5LXZpZXcvY29tcG9uZW50cy9vbmUtbGV2ZWwtdmlldy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uZUxldmVsVmlld0NvbXBvbmVudCB9IGZyb20gJy4vb25lLWxldmVsLXZpZXcuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdPbmUgTGV2ZWwgVmlldyBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogT25lTGV2ZWxWaWV3Q29tcG9uZW50O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgT25lTGV2ZWxWaWV3Q29tcG9uZW50KCk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QubmF2aWdhdGUuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCduYXZpZ2F0ZSBlbWl0dGVyJyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGljaygpJywgKCkgPT4ge1xuICAgICAgbGV0IG1vY2tSZXN1bHQ6IGFueTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tSZXN1bHQgPSB7IGlkOiA0MiwgbmFtZTogJ0EgbmFtZScsIGhhc01vcmU6IHRydWUgfTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZW1pdHMgdGhlIGV4cGVjdGVkIGV2ZW50IHdoZW4gdGhlIGNsaWNrZWQgcmVzdWx0IGhhcyBjaGlsZHJlbicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2sobW9ja1Jlc3VsdCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5uYXZpZ2F0ZS5lbWl0KVxuICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHBhdGhTZWdtZW50OiB7IGlkczogWzQyXSwgbmFtZXM6IFsnQSBuYW1lJ10gfSwgbWV0aG9kOiAnbmV4dExldmVsJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZW1pdHMgdGhlIGV4cGVjdGVkIGV2ZW50IHdoZW4gdGhlIGNsaWNrZWQgcmVzdWx0IGRvZXMgbm90IGhhdmUgY2hpbGRyZW4nLCAoKSA9PiB7XG4gICAgICAgIG1vY2tSZXN1bHQuaGFzTW9yZSA9IGZhbHNlO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbGljayhtb2NrUmVzdWx0KTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5hdmlnYXRlLmVtaXQpXG4gICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgcGF0aFNlZ21lbnQ6IHsgaWRzOiBbNDJdLCBuYW1lczogWydBIG5hbWUnXSB9LCBtZXRob2Q6ICdzZWFyY2gnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
