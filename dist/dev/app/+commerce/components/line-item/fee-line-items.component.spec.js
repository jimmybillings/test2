"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fee_line_items_component_1 = require("./fee-line-items.component");
function main() {
    describe('Fee Line Items Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new fee_line_items_component_1.FeeLineItemsComponent();
            componentUnderTest.feeLineItemsNotify.emit = jasmine.createSpy('feeLineItemsNotify emitter');
        });
        describe('readOnly input', function () {
            it('defaults to false', function () {
                expect(componentUnderTest.readOnly).toBe(false);
            });
        });
        describe('onRemove()', function () {
            it('emits the expected event', function () {
                componentUnderTest.onRemove({ some: 'fee' });
                expect(componentUnderTest.feeLineItemsNotify.emit)
                    .toHaveBeenCalledWith({ type: 'REMOVE_QUOTE_FEE', payload: { some: 'fee' } });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vZmVlLWxpbmUtaXRlbXMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1RUFBbUU7QUFHbkU7SUFDRSxRQUFRLENBQUMsMEJBQTBCLEVBQUU7UUFDbkMsSUFBSSxrQkFBeUMsQ0FBQztRQUU5QyxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLGdEQUFxQixFQUFFLENBQUM7WUFDakQsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMvRixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixFQUFFLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ3RCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsRUFBRSxDQUFDLDBCQUEwQixFQUFFO2dCQUM3QixrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFpQixDQUFDLENBQUM7Z0JBRTVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7cUJBQy9DLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXhCRCxvQkF3QkMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2xpbmUtaXRlbS9mZWUtbGluZS1pdGVtcy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZlZUxpbmVJdGVtc0NvbXBvbmVudCB9IGZyb20gJy4vZmVlLWxpbmUtaXRlbXMuY29tcG9uZW50JztcbmltcG9ydCB7IEZlZUxpbmVJdGVtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdGZWUgTGluZSBJdGVtcyBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogRmVlTGluZUl0ZW1zQ29tcG9uZW50O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgRmVlTGluZUl0ZW1zQ29tcG9uZW50KCk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QuZmVlTGluZUl0ZW1zTm90aWZ5LmVtaXQgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZmVlTGluZUl0ZW1zTm90aWZ5IGVtaXR0ZXInKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWFkT25seSBpbnB1dCcsICgpID0+IHtcbiAgICAgIGl0KCdkZWZhdWx0cyB0byBmYWxzZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZWFkT25seSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvblJlbW92ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHRoZSBleHBlY3RlZCBldmVudCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uUmVtb3ZlKHsgc29tZTogJ2ZlZScgfSBhcyBGZWVMaW5lSXRlbSk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mZWVMaW5lSXRlbXNOb3RpZnkuZW1pdClcbiAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB0eXBlOiAnUkVNT1ZFX1FVT1RFX0ZFRScsIHBheWxvYWQ6IHsgc29tZTogJ2ZlZScgfSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
