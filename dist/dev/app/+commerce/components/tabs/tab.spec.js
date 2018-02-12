"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tab_1 = require("./tab");
function main() {
    describe('Cart Tab Base Class', function () {
        var classUnderTest;
        beforeEach(function () {
            classUnderTest = new tab_1.Tab();
            classUnderTest.notify.emit = jasmine.createSpy('notify emitter');
        });
        describe('goToPreviousTab()', function () {
            it('emits the expected event', function () {
                classUnderTest.goToPreviousTab();
                expect(classUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'GO_TO_PREVIOUS_TAB' });
            });
        });
        describe('goToNextTab()', function () {
            it('emits the expected event', function () {
                classUnderTest.goToNextTab();
                expect(classUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'GO_TO_NEXT_TAB' });
            });
        });
        describe('goToTab()', function () {
            it('emits the expected event', function () {
                classUnderTest.goToTab(1);
                expect(classUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'GO_TO_TAB', payload: 1 });
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy90YWJzL3RhYi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTRCO0FBRTVCO0lBQ0UsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzlCLElBQUksY0FBbUIsQ0FBQztRQUV4QixVQUFVLENBQUM7WUFDVCxjQUFjLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztZQUMzQixjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsRUFBRSxDQUFDLDBCQUEwQixFQUFFO2dCQUM3QixjQUFjLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBRWpDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztZQUMxRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUN4QixFQUFFLENBQUMsMEJBQTBCLEVBQUU7Z0JBQzdCLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFN0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBQ3RGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtnQkFDN0IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFMUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqQ0Qsb0JBaUNDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlL2NvbXBvbmVudHMvdGFicy90YWIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhYiB9IGZyb20gJy4vdGFiJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDYXJ0IFRhYiBCYXNlIENsYXNzJywgKCkgPT4ge1xuICAgIGxldCBjbGFzc1VuZGVyVGVzdDogVGFiO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjbGFzc1VuZGVyVGVzdCA9IG5ldyBUYWIoKTtcbiAgICAgIGNsYXNzVW5kZXJUZXN0Lm5vdGlmeS5lbWl0ID0gamFzbWluZS5jcmVhdGVTcHkoJ25vdGlmeSBlbWl0dGVyJyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ29Ub1ByZXZpb3VzVGFiKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgdGhlIGV4cGVjdGVkIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5nb1RvUHJldmlvdXNUYWIoKTtcblxuICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Qubm90aWZ5LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdHlwZTogJ0dPX1RPX1BSRVZJT1VTX1RBQicgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnb1RvTmV4dFRhYigpJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHRoZSBleHBlY3RlZCBldmVudCcsICgpID0+IHtcbiAgICAgICAgY2xhc3NVbmRlclRlc3QuZ29Ub05leHRUYWIoKTtcblxuICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Qubm90aWZ5LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdHlwZTogJ0dPX1RPX05FWFRfVEFCJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dvVG9UYWIoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgZXhwZWN0ZWQgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGNsYXNzVW5kZXJUZXN0LmdvVG9UYWIoMSk7XG5cbiAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0Lm5vdGlmeS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdHT19UT19UQUInLCBwYXlsb2FkOiAxIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==
