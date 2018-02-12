"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_gallery_two_level_component_1 = require("./wz.gallery-two-level.component");
function main() {
    describe('Two Level View Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new wz_gallery_two_level_component_1.WzGalleryTwoLevelComponent();
            componentUnderTest.navigate.emit = jasmine.createSpy('navigate emitter');
        });
        describe('onClick()', function () {
            var mockResult;
            var mockChildResult;
            beforeEach(function () {
                mockResult = { id: 42, name: 'A name' };
                mockChildResult = { id: 87, name: 'Another name', hasMore: true };
            });
            it('emits the expected event when the clicked child has children', function () {
                componentUnderTest.onClick(mockResult, mockChildResult);
                expect(componentUnderTest.navigate.emit)
                    .toHaveBeenCalledWith({ pathSegment: { ids: [42, 87], names: ['A name', 'Another name'] }, method: 'nextLevel' });
            });
            it('emits the expected event when the clicked child does not have children', function () {
                mockChildResult.hasMore = false;
                componentUnderTest.onClick(mockResult, mockChildResult);
                expect(componentUnderTest.navigate.emit)
                    .toHaveBeenCalledWith({ pathSegment: { ids: [42, 87], names: ['A name', 'Another name'] }, method: 'search' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1nYWxsZXJ5LXR3by1sZXZlbC93ei5nYWxsZXJ5LXR3by1sZXZlbC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1GQUE4RTtBQUU5RTtJQUNFLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUNuQyxJQUFJLGtCQUE4QyxDQUFDO1FBRW5ELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksMkRBQTBCLEVBQUUsQ0FBQztZQUN0RCxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxVQUFlLENBQUM7WUFDcEIsSUFBSSxlQUFvQixDQUFDO1lBRXpCLFVBQVUsQ0FBQztnQkFDVCxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztnQkFDeEMsZUFBZSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw4REFBOEQsRUFBRTtnQkFDakUsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFFeEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7cUJBQ3JDLG9CQUFvQixDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3RILENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHdFQUF3RSxFQUFFO2dCQUMzRSxlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDaEMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFFeEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7cUJBQ3JDLG9CQUFvQixDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ25ILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsQ0Qsb0JBa0NDIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1nYWxsZXJ5LXR3by1sZXZlbC93ei5nYWxsZXJ5LXR3by1sZXZlbC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFd6R2FsbGVyeVR3b0xldmVsQ29tcG9uZW50IH0gZnJvbSAnLi93ei5nYWxsZXJ5LXR3by1sZXZlbC5jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1R3byBMZXZlbCBWaWV3IENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBXekdhbGxlcnlUd29MZXZlbENvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFd6R2FsbGVyeVR3b0xldmVsQ29tcG9uZW50KCk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QubmF2aWdhdGUuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCduYXZpZ2F0ZSBlbWl0dGVyJyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGljaygpJywgKCkgPT4ge1xuICAgICAgbGV0IG1vY2tSZXN1bHQ6IGFueTtcbiAgICAgIGxldCBtb2NrQ2hpbGRSZXN1bHQ6IGFueTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tSZXN1bHQgPSB7IGlkOiA0MiwgbmFtZTogJ0EgbmFtZScgfTtcbiAgICAgICAgbW9ja0NoaWxkUmVzdWx0ID0geyBpZDogODcsIG5hbWU6ICdBbm90aGVyIG5hbWUnLCBoYXNNb3JlOiB0cnVlIH07XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2VtaXRzIHRoZSBleHBlY3RlZCBldmVudCB3aGVuIHRoZSBjbGlja2VkIGNoaWxkIGhhcyBjaGlsZHJlbicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2sobW9ja1Jlc3VsdCwgbW9ja0NoaWxkUmVzdWx0KTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5hdmlnYXRlLmVtaXQpXG4gICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgcGF0aFNlZ21lbnQ6IHsgaWRzOiBbNDIsIDg3XSwgbmFtZXM6IFsnQSBuYW1lJywgJ0Fub3RoZXIgbmFtZSddIH0sIG1ldGhvZDogJ25leHRMZXZlbCcgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2VtaXRzIHRoZSBleHBlY3RlZCBldmVudCB3aGVuIHRoZSBjbGlja2VkIGNoaWxkIGRvZXMgbm90IGhhdmUgY2hpbGRyZW4nLCAoKSA9PiB7XG4gICAgICAgIG1vY2tDaGlsZFJlc3VsdC5oYXNNb3JlID0gZmFsc2U7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNsaWNrKG1vY2tSZXN1bHQsIG1vY2tDaGlsZFJlc3VsdCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5uYXZpZ2F0ZS5lbWl0KVxuICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHBhdGhTZWdtZW50OiB7IGlkczogWzQyLCA4N10sIG5hbWVzOiBbJ0EgbmFtZScsICdBbm90aGVyIG5hbWUnXSB9LCBtZXRob2Q6ICdzZWFyY2gnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
