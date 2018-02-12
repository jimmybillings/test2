"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var administer_quote_component_1 = require("./administer-quote.component");
function main() {
    describe('Administer Quote Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new administer_quote_component_1.AdministerQuoteComponent();
            spyOn(componentUnderTest.notify, 'emit');
        });
        describe('onSaveAndNew()', function () {
            it('Should emit the onSaveAndNew event', function () {
                componentUnderTest.onSaveAndNew();
                expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'SAVE_AND_NEW' });
            });
        });
        describe('onOpenDeleteDialog()', function () {
            it('Should emit the openDeleteDialog event', function () {
                componentUnderTest.onOpenDeleteDialog();
                expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'OPEN_DELETE_DIALOG' });
            });
        });
        describe('onCloneQuote()', function () {
            it('Should emit the saveAsDraft event', function () {
                componentUnderTest.onClickCloneQuoteButton();
                expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'CLONE_QUOTE' });
            });
        });
        describe('goToNextTab()', function () {
            it('Should emit the saveAsDraft event', function () {
                componentUnderTest.goToNextTab();
                expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'GO_TO_NEXT_TAB' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvYWRtaW5pc3Rlci1xdW90ZS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtRQUNyQyxJQUFJLGtCQUE0QyxDQUFDO1FBRWpELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUkscURBQXdCLEVBQUUsQ0FBQztZQUNwRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRTtnQkFDdkMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtnQkFDM0Msa0JBQWtCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7WUFDOUYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixFQUFFLENBQUMsbUNBQW1DLEVBQUU7Z0JBQ3RDLGtCQUFrQixDQUFDLHVCQUF1QixFQUFFLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUN2RixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUN4QixFQUFFLENBQUMsbUNBQW1DLEVBQUU7Z0JBQ3RDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUMxRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBckNELG9CQXFDQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9jb21wb25lbnRzL2FkbWluaXN0ZXItcXVvdGUuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZG1pbmlzdGVyUXVvdGVDb21wb25lbnQgfSBmcm9tICcuL2FkbWluaXN0ZXItcXVvdGUuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdBZG1pbmlzdGVyIFF1b3RlIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBBZG1pbmlzdGVyUXVvdGVDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBBZG1pbmlzdGVyUXVvdGVDb21wb25lbnQoKTtcbiAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5ub3RpZnksICdlbWl0Jyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TYXZlQW5kTmV3KCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGVtaXQgdGhlIG9uU2F2ZUFuZE5ldyBldmVudCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU2F2ZUFuZE5ldygpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5vdGlmeS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdTQVZFX0FORF9ORVcnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25PcGVuRGVsZXRlRGlhbG9nKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGVtaXQgdGhlIG9wZW5EZWxldGVEaWFsb2cgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk9wZW5EZWxldGVEaWFsb2coKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ub3RpZnkuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB0eXBlOiAnT1BFTl9ERUxFVEVfRElBTE9HJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ2xvbmVRdW90ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBlbWl0IHRoZSBzYXZlQXNEcmFmdCBldmVudCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2tDbG9uZVF1b3RlQnV0dG9uKCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qubm90aWZ5LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdHlwZTogJ0NMT05FX1FVT1RFJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dvVG9OZXh0VGFiKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGVtaXQgdGhlIHNhdmVBc0RyYWZ0IGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZ29Ub05leHRUYWIoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ub3RpZnkuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB0eXBlOiAnR09fVE9fTkVYVF9UQUInIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
