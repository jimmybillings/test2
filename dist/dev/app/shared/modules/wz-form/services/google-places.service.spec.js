"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var google_places_service_1 = require("./google-places.service");
function main() {
    var MockAutocomplete = (function () {
        function MockAutocomplete(inputElement, options) {
            this.addListener = jasmine.createSpy('addListener');
            this.setBounds = jasmine.createSpy('setBounds');
        }
        return MockAutocomplete;
    }());
    var MockCircle = (function () {
        function MockCircle(options) {
            this.getBounds = jasmine.createSpy('getBounds').and.returnValue({ mock: 'bounds' });
        }
        return MockCircle;
    }());
    describe('Google Service', function () {
        var serviceUnderTest, mockWindow, mockDocument;
        var scriptSrc = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzyGsK3zaRGFAEC72nWbdRvBY1Lo92Cfw&libraries=places';
        beforeEach(function () {
            mockDocument = {
                getElementsByTagName: jasmine.createSpy('getElementsByTagName').and.returnValue([{}, {}, {}]),
                createElement: jasmine.createSpy('createElement').and.returnValue({}),
                getElementById: jasmine.createSpy('getElementById').and.returnValue({}),
                body: {
                    appendChild: jasmine.createSpy('appendChild')
                }
            };
            mockWindow = {
                nativeWindow: { google: { maps: { places: { Autocomplete: MockAutocomplete }, Circle: MockCircle } } }
            };
            serviceUnderTest = new google_places_service_1.GooglePlacesService(mockWindow, mockDocument);
        });
        describe('loadPlacesLibrary()', function () {
            describe('if the script already exists on the page', function () {
                beforeEach(function () {
                    mockDocument = {
                        getElementsByTagName: jasmine.createSpy('getElementsByTagName').and.returnValue([{ src: scriptSrc }]),
                        getElementById: jasmine.createSpy('getElementById').and.returnValue({})
                    };
                    serviceUnderTest = new google_places_service_1.GooglePlacesService(mockWindow, mockDocument);
                    serviceUnderTest.loadPlacesLibrary(null);
                });
                it('calls initAutocomplete()', function () {
                    expect(mockDocument.getElementById).toHaveBeenCalledWith('autocomplete');
                });
            });
            describe('if the script doesn\'t exist', function () {
                beforeEach(function () {
                    serviceUnderTest.loadPlacesLibrary(null);
                });
                it('creates the script', function () {
                    expect(mockDocument.getElementsByTagName).toHaveBeenCalledWith('script');
                });
                it('appends the script to the DOM', function () {
                    expect(mockDocument.body.appendChild).toHaveBeenCalledWith({
                        src: scriptSrc,
                        type: 'text/javascript',
                        onload: jasmine.any(Function)
                    });
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3NlcnZpY2VzL2dvb2dsZS1wbGFjZXMuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQThEO0FBRTlEO0lBQ0U7UUFHRSwwQkFBWSxZQUFpQixFQUFFLE9BQVk7WUFGcEMsZ0JBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLGNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ0gsQ0FBQztRQUNsRCx1QkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBRUQ7UUFFRSxvQkFBWSxPQUFZO1lBRGpCLGNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQy9CLGlCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFFRCxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDekIsSUFBSSxnQkFBcUMsRUFBRSxVQUFlLEVBQUUsWUFBaUIsQ0FBQztRQUM5RSxJQUFNLFNBQVMsR0FBRyxzR0FBc0csQ0FBQztRQUV6SCxVQUFVLENBQUM7WUFDVCxZQUFZLEdBQUc7Z0JBQ2Isb0JBQW9CLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RixhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDckUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDdkUsSUFBSSxFQUFFO29CQUNKLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztpQkFDOUM7YUFDRixDQUFDO1lBQ0YsVUFBVSxHQUFHO2dCQUNYLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO2FBQ3ZHLENBQUM7WUFFRixnQkFBZ0IsR0FBRyxJQUFJLDJDQUFtQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixRQUFRLENBQUMsMENBQTBDLEVBQUU7Z0JBQ25ELFVBQVUsQ0FBQztvQkFDVCxZQUFZLEdBQUc7d0JBQ2Isb0JBQW9CLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO3dCQUNyRyxjQUFjLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO3FCQUN4RSxDQUFDO29CQUNGLGdCQUFnQixHQUFHLElBQUksMkNBQW1CLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUNyRSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLDBCQUEwQixFQUFFO29CQUM3QixNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLDhCQUE4QixFQUFFO2dCQUN2QyxVQUFVLENBQUM7b0JBQ1QsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTtvQkFDdkIsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsK0JBQStCLEVBQUU7b0JBQ2xDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO3dCQUN6RCxHQUFHLEVBQUUsU0FBUzt3QkFDZCxJQUFJLEVBQUUsaUJBQWlCO3dCQUN2QixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7cUJBQzlCLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuRUQsb0JBbUVDIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3NlcnZpY2VzL2dvb2dsZS1wbGFjZXMuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlUGxhY2VzU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLXBsYWNlcy5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNsYXNzIE1vY2tBdXRvY29tcGxldGUge1xuICAgIHB1YmxpYyBhZGRMaXN0ZW5lciA9IGphc21pbmUuY3JlYXRlU3B5KCdhZGRMaXN0ZW5lcicpO1xuICAgIHB1YmxpYyBzZXRCb3VuZHMgPSBqYXNtaW5lLmNyZWF0ZVNweSgnc2V0Qm91bmRzJyk7XG4gICAgY29uc3RydWN0b3IoaW5wdXRFbGVtZW50OiBhbnksIG9wdGlvbnM6IGFueSkgeyB9XG4gIH1cblxuICBjbGFzcyBNb2NrQ2lyY2xlIHtcbiAgICBwdWJsaWMgZ2V0Qm91bmRzID0gamFzbWluZS5jcmVhdGVTcHkoJ2dldEJvdW5kcycpLmFuZC5yZXR1cm5WYWx1ZSh7IG1vY2s6ICdib3VuZHMnIH0pO1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IGFueSkgeyB9XG4gIH1cblxuICBkZXNjcmliZSgnR29vZ2xlIFNlcnZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IEdvb2dsZVBsYWNlc1NlcnZpY2UsIG1vY2tXaW5kb3c6IGFueSwgbW9ja0RvY3VtZW50OiBhbnk7XG4gICAgY29uc3Qgc2NyaXB0U3JjID0gJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcz9rZXk9QUl6YVN5Q3p5R3NLM3phUkdGQUVDNzJuV2JkUnZCWTFMbzkyQ2Z3JmxpYnJhcmllcz1wbGFjZXMnO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrRG9jdW1lbnQgPSB7XG4gICAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lOiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0RWxlbWVudHNCeVRhZ05hbWUnKS5hbmQucmV0dXJuVmFsdWUoW3t9LCB7fSwge31dKSxcbiAgICAgICAgY3JlYXRlRWxlbWVudDogamFzbWluZS5jcmVhdGVTcHkoJ2NyZWF0ZUVsZW1lbnQnKS5hbmQucmV0dXJuVmFsdWUoe30pLFxuICAgICAgICBnZXRFbGVtZW50QnlJZDogamFzbWluZS5jcmVhdGVTcHkoJ2dldEVsZW1lbnRCeUlkJykuYW5kLnJldHVyblZhbHVlKHt9KSxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGFwcGVuZENoaWxkOiBqYXNtaW5lLmNyZWF0ZVNweSgnYXBwZW5kQ2hpbGQnKVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbW9ja1dpbmRvdyA9IHtcbiAgICAgICAgbmF0aXZlV2luZG93OiB7IGdvb2dsZTogeyBtYXBzOiB7IHBsYWNlczogeyBBdXRvY29tcGxldGU6IE1vY2tBdXRvY29tcGxldGUgfSwgQ2lyY2xlOiBNb2NrQ2lyY2xlIH0gfSB9XG4gICAgICB9O1xuXG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IEdvb2dsZVBsYWNlc1NlcnZpY2UobW9ja1dpbmRvdywgbW9ja0RvY3VtZW50KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsb2FkUGxhY2VzTGlicmFyeSgpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ2lmIHRoZSBzY3JpcHQgYWxyZWFkeSBleGlzdHMgb24gdGhlIHBhZ2UnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIG1vY2tEb2N1bWVudCA9IHtcbiAgICAgICAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lOiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0RWxlbWVudHNCeVRhZ05hbWUnKS5hbmQucmV0dXJuVmFsdWUoW3sgc3JjOiBzY3JpcHRTcmMgfV0pLFxuICAgICAgICAgICAgZ2V0RWxlbWVudEJ5SWQ6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRFbGVtZW50QnlJZCcpLmFuZC5yZXR1cm5WYWx1ZSh7fSlcbiAgICAgICAgICB9O1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgR29vZ2xlUGxhY2VzU2VydmljZShtb2NrV2luZG93LCBtb2NrRG9jdW1lbnQpO1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZFBsYWNlc0xpYnJhcnkobnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYWxscyBpbml0QXV0b2NvbXBsZXRlKCknLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG1vY2tEb2N1bWVudC5nZXRFbGVtZW50QnlJZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2F1dG9jb21wbGV0ZScpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnaWYgdGhlIHNjcmlwdCBkb2VzblxcJ3QgZXhpc3QnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZFBsYWNlc0xpYnJhcnkobnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjcmVhdGVzIHRoZSBzY3JpcHQnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG1vY2tEb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3NjcmlwdCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYXBwZW5kcyB0aGUgc2NyaXB0IHRvIHRoZSBET00nLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG1vY2tEb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgICBzcmM6IHNjcmlwdFNyYyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICAgICAgICAgb25sb2FkOiBqYXNtaW5lLmFueShGdW5jdGlvbilcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
