"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_share_component_1 = require("./wz.share.component");
function main() {
    describe('Wz Share Component', function () {
        var componentUnderTest;
        var mockWzForm;
        beforeEach(function () {
            mockWzForm = { resetForm: jasmine.createSpy('resetForm') };
            componentUnderTest = new wz_share_component_1.WzShareComponent(null);
            componentUnderTest.closeRequest.emit = jasmine.createSpy('closeRequest emit');
            componentUnderTest.wzForm = mockWzForm;
        });
        describe('ngOnDestroy', function () {
            it('resets the form', function () {
                componentUnderTest.ngOnDestroy();
                expect(mockWzForm.resetForm).toHaveBeenCalled();
            });
            it('emits a close request', function () {
                componentUnderTest.ngOnDestroy();
                expect(componentUnderTest.closeRequest.emit).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zaGFyZS93ei5zaGFyZS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUF3RDtBQUt4RDtJQUNFLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtRQUM3QixJQUFJLGtCQUFvQyxDQUFDO1FBQ3pDLElBQUksVUFBZSxDQUFDO1FBRXBCLFVBQVUsQ0FBQztZQUNULFVBQVUsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFFM0Qsa0JBQWtCLEdBQUcsSUFBSSxxQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM5RSxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUN0QixFQUFFLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3BCLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUVqQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsdUJBQXVCLEVBQUU7Z0JBQzFCLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUVqQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNCRCxvQkEyQkM7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zaGFyZS93ei5zaGFyZS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFd6U2hhcmVDb21wb25lbnQgfSBmcm9tICcuL3d6LnNoYXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBtb2NrQ29tbWVyY2VBc3NldExpbmVJdGVtIH0gZnJvbSAnLi4vLi4vbW9ja3MvbW9jay1hc3NldCc7XG5pbXBvcnQgKiBhcyBFbmhhbmNlZE1vY2sgZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBTaGFyZSBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pTaGFyZUNvbXBvbmVudDtcbiAgICBsZXQgbW9ja1d6Rm9ybTogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrV3pGb3JtID0geyByZXNldEZvcm06IGphc21pbmUuY3JlYXRlU3B5KCdyZXNldEZvcm0nKSB9O1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgV3pTaGFyZUNvbXBvbmVudChudWxsKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jbG9zZVJlcXVlc3QuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCdjbG9zZVJlcXVlc3QgZW1pdCcpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lnd6Rm9ybSA9IG1vY2tXekZvcm07XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmdPbkRlc3Ryb3knLCAoKSA9PiB7XG4gICAgICBpdCgncmVzZXRzIHRoZSBmb3JtJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICBleHBlY3QobW9ja1d6Rm9ybS5yZXNldEZvcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZW1pdHMgYSBjbG9zZSByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNsb3NlUmVxdWVzdC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4iXX0=
