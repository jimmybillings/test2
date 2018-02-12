"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subclip_controlbar_component_1 = require("./subclip-controlbar.component");
function main() {
    describe('Subclip Controlbar Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new subclip_controlbar_component_1.SubclipControlbarComponent();
            componentUnderTest.request.emit = jasmine.createSpy('request emitter');
        });
        describe('forward()', function () {
            it('forwards request events', function () {
                var mockRequest = {};
                componentUnderTest.forward(mockRequest);
                expect(componentUnderTest.request.emit).toHaveBeenCalledWith(mockRequest);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbGJhcnMvc3ViY2xpcC1jb250cm9sYmFyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0VBQTRFO0FBRzVFO0lBQ0UsUUFBUSxDQUFDLDhCQUE4QixFQUFFO1FBQ3ZDLElBQUksa0JBQThDLENBQUM7UUFFbkQsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSx5REFBMEIsRUFBRSxDQUFDO1lBQ3RELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixFQUFFLENBQUMseUJBQXlCLEVBQUU7Z0JBQzVCLElBQU0sV0FBVyxHQUFrQixFQUFtQixDQUFDO2dCQUV2RCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRXhDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5CRCxvQkFtQkMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9sYmFycy9zdWJjbGlwLWNvbnRyb2xiYXIuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJjbGlwQ29udHJvbGJhckNvbXBvbmVudCB9IGZyb20gJy4vc3ViY2xpcC1jb250cm9sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQbGF5ZXJSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9wbGF5ZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdTdWJjbGlwIENvbnRyb2xiYXIgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFN1YmNsaXBDb250cm9sYmFyQ29tcG9uZW50O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgU3ViY2xpcENvbnRyb2xiYXJDb21wb25lbnQoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yZXF1ZXN0LmVtaXQgPSBqYXNtaW5lLmNyZWF0ZVNweSgncmVxdWVzdCBlbWl0dGVyJyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZm9yd2FyZCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2ZvcndhcmRzIHJlcXVlc3QgZXZlbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2NrUmVxdWVzdDogUGxheWVyUmVxdWVzdCA9IHt9IGFzIFBsYXllclJlcXVlc3Q7XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZvcndhcmQobW9ja1JlcXVlc3QpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmVxdWVzdC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChtb2NrUmVxdWVzdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
