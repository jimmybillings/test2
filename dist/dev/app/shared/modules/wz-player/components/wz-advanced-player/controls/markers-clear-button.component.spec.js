"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var markers_clear_button_component_1 = require("./markers-clear-button.component");
function main() {
    describe('Markers Clear Button Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new markers_clear_button_component_1.MarkersClearButtonComponent();
            componentUnderTest.request.emit = jasmine.createSpy('request emitter');
        });
        describe('onClick()', function () {
            it('emits the expected request event', function () {
                componentUnderTest.onClick();
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith({ type: 'CLEAR_MARKERS' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2Vycy1jbGVhci1idXR0b24uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0U7QUFFL0U7SUFDRSxRQUFRLENBQUMsZ0NBQWdDLEVBQUU7UUFDekMsSUFBSSxrQkFBK0MsQ0FBQztRQUVwRCxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLDREQUEyQixFQUFFLENBQUM7WUFDdkQsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtnQkFDckMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRTdCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUMxRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBakJELG9CQWlCQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL21hcmtlcnMtY2xlYXItYnV0dG9uLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFya2Vyc0NsZWFyQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJrZXJzLWNsZWFyLWJ1dHRvbi5jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ01hcmtlcnMgQ2xlYXIgQnV0dG9uIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBNYXJrZXJzQ2xlYXJCdXR0b25Db21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBNYXJrZXJzQ2xlYXJCdXR0b25Db21wb25lbnQoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQgPSBqYXNtaW5lLmNyZWF0ZVNweSgncmVxdWVzdCBlbWl0dGVyJyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGljaygpJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHRoZSBleHBlY3RlZCByZXF1ZXN0IGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmVxdWVzdC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdDTEVBUl9NQVJLRVJTJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
