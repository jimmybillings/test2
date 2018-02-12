"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pendo_service_1 = require("./pendo.service");
function main() {
    describe('Pendo Service', function () {
        var serviceUnderTest;
        var mockUser;
        window.pendo = {};
        beforeEach(function () {
            serviceUnderTest = new pendo_service_1.PendoService();
            window.pendo = {
                initialize: jasmine.createSpy('initialize')
            };
            mockUser = {
                accountId: 1,
                id: 25,
                firstName: 'ross',
                lastName: 'edfort',
                siteName: 'core',
                emailAddress: 'ross.edfort@wazeedigital.com'
            };
        });
        describe('initialize()', function () {
            it('Should initialize pendo correctly', function () {
                serviceUnderTest.initialize({
                    siteName: 'core',
                    id: 1,
                    firstName: 'ross',
                    lastName: 'edfort',
                    accountId: '25',
                    emailAddress: 'ross.edfort@wazeedigital.com'
                });
                expect(window.pendo.initialize).toHaveBeenCalledWith({
                    apiKey: '7e5da402-5d29-41b0-5579-6e149b0a28f2',
                    visitor: { id: 'core-1-ross-edfort', email: 'ross.edfort@wazeedigital.com' },
                    account: { id: 'core-25' }
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvcGVuZG8uc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQStDO0FBRS9DO0lBQ0UsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN4QixJQUFJLGdCQUE4QixDQUFDO1FBQ25DLElBQUksUUFBYSxDQUFDO1FBQ1osTUFBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFekIsVUFBVSxDQUFDO1lBQ1QsZ0JBQWdCLEdBQUcsSUFBSSw0QkFBWSxFQUFFLENBQUM7WUFDaEMsTUFBTyxDQUFDLEtBQUssR0FBRztnQkFDcEIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2FBQzVDLENBQUM7WUFDRixRQUFRLEdBQUc7Z0JBQ1QsU0FBUyxFQUFFLENBQUM7Z0JBQ1osRUFBRSxFQUFFLEVBQUU7Z0JBQ04sU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsWUFBWSxFQUFFLDhCQUE4QjthQUM3QyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDdEMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO29CQUMxQixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsRUFBRSxFQUFFLENBQUM7b0JBQ0wsU0FBUyxFQUFFLE1BQU07b0JBQ2pCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixTQUFTLEVBQUUsSUFBSTtvQkFDZixZQUFZLEVBQUUsOEJBQThCO2lCQUN0QyxDQUFDLENBQUM7Z0JBQ1YsTUFBTSxDQUFPLE1BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsb0JBQW9CLENBQUM7b0JBQzFELE1BQU0sRUFBRSxzQ0FBc0M7b0JBQzlDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsOEJBQThCLEVBQUU7b0JBQzVFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUU7aUJBQzNCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF2Q0Qsb0JBdUNDIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvcGVuZG8uc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGVuZG9TZXJ2aWNlIH0gZnJvbSAnLi9wZW5kby5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdQZW5kbyBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBQZW5kb1NlcnZpY2U7XG4gICAgbGV0IG1vY2tVc2VyOiBhbnk7XG4gICAgKDxhbnk+d2luZG93KS5wZW5kbyA9IHt9O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IFBlbmRvU2VydmljZSgpO1xuICAgICAgKDxhbnk+d2luZG93KS5wZW5kbyA9IHtcbiAgICAgICAgaW5pdGlhbGl6ZTogamFzbWluZS5jcmVhdGVTcHkoJ2luaXRpYWxpemUnKVxuICAgICAgfTtcbiAgICAgIG1vY2tVc2VyID0ge1xuICAgICAgICBhY2NvdW50SWQ6IDEsXG4gICAgICAgIGlkOiAyNSxcbiAgICAgICAgZmlyc3ROYW1lOiAncm9zcycsXG4gICAgICAgIGxhc3ROYW1lOiAnZWRmb3J0JyxcbiAgICAgICAgc2l0ZU5hbWU6ICdjb3JlJyxcbiAgICAgICAgZW1haWxBZGRyZXNzOiAncm9zcy5lZGZvcnRAd2F6ZWVkaWdpdGFsLmNvbSdcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdGlhbGl6ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBpbml0aWFsaXplIHBlbmRvIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5pbml0aWFsaXplKHtcbiAgICAgICAgICBzaXRlTmFtZTogJ2NvcmUnLFxuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIGZpcnN0TmFtZTogJ3Jvc3MnLFxuICAgICAgICAgIGxhc3ROYW1lOiAnZWRmb3J0JyxcbiAgICAgICAgICBhY2NvdW50SWQ6ICcyNScsXG4gICAgICAgICAgZW1haWxBZGRyZXNzOiAncm9zcy5lZGZvcnRAd2F6ZWVkaWdpdGFsLmNvbSdcbiAgICAgICAgfSBhcyBhbnkpO1xuICAgICAgICBleHBlY3QoKDxhbnk+d2luZG93KS5wZW5kby5pbml0aWFsaXplKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgYXBpS2V5OiAnN2U1ZGE0MDItNWQyOS00MWIwLTU1NzktNmUxNDliMGEyOGYyJyxcbiAgICAgICAgICB2aXNpdG9yOiB7IGlkOiAnY29yZS0xLXJvc3MtZWRmb3J0JywgZW1haWw6ICdyb3NzLmVkZm9ydEB3YXplZWRpZ2l0YWwuY29tJyB9LFxuICAgICAgICAgIGFjY291bnQ6IHsgaWQ6ICdjb3JlLTI1JyB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
