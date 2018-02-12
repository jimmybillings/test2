"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_config_1 = require("./api.config");
function main() {
    var serviceUnderTest, mockCurrentUserService;
    describe('Api Config', function () {
        beforeEach(function () {
            serviceUnderTest = new api_config_1.ApiConfig(null);
        });
        describe('get portalName', function () {
            it('should return null if none is set', function () {
                expect(serviceUnderTest.portal).toBe(null);
            });
            it('should return the name of the portal', function () {
                serviceUnderTest.portal = 'commerce';
                expect(serviceUnderTest.portal).toBe('commerce');
            });
        });
        describe('headers()', function () {
            var loggedIn;
            var mockCurrentUserService;
            var returnedHeaders;
            beforeEach(function () {
                localStorage.clear();
                localStorage.setItem('token', 'LOGIN_TOKEN');
                mockCurrentUserService = {
                    loggedIn: function () { return loggedIn; }
                };
            });
            afterEach(function () {
                localStorage.clear();
            });
            it('returns appropriate headers for a logged out user', function () {
                loggedIn = false;
                returnedHeaders = new api_config_1.ApiConfig(mockCurrentUserService).headers();
                expect(returnedHeaders.get('Content-Type')).toEqual('application/json');
                expect(returnedHeaders.get('Accept')).toEqual('application/json');
                expect(returnedHeaders.has('Authorization')).toBe(false);
            });
            it('returns appropriate headers for a logged in user', function () {
                loggedIn = true;
                returnedHeaders = new api_config_1.ApiConfig(mockCurrentUserService).headers();
                expect(returnedHeaders.get('Content-Type')).toEqual('application/json');
                expect(returnedHeaders.get('Accept')).toEqual('application/json');
                expect(returnedHeaders.get('Authorization')).toEqual('Bearer LOGIN_TOKEN');
            });
            it('adds overriding auth header for a logged out user', function () {
                loggedIn = false;
                returnedHeaders = new api_config_1.ApiConfig(mockCurrentUserService).headers('OVERRIDING_TOKEN');
                expect(returnedHeaders.get('Content-Type')).toEqual('application/json');
                expect(returnedHeaders.get('Accept')).toEqual('application/json');
                expect(returnedHeaders.get('Authorization')).toEqual('Bearer OVERRIDING_TOKEN');
            });
            it('overrides the normal auth header for a logged in user', function () {
                loggedIn = true;
                returnedHeaders = new api_config_1.ApiConfig(mockCurrentUserService).headers('OVERRIDING_TOKEN');
                expect(returnedHeaders.get('Content-Type')).toEqual('application/json');
                expect(returnedHeaders.get('Accept')).toEqual('application/json');
                expect(returnedHeaders.get('Authorization')).toEqual('Bearer OVERRIDING_TOKEN');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpLmNvbmZpZy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQXlDO0FBRXpDO0lBQ0UsSUFBSSxnQkFBMkIsRUFBRSxzQkFBMkIsQ0FBQztJQUU3RCxRQUFRLENBQUMsWUFBWSxFQUFFO1FBQ3JCLFVBQVUsQ0FBQztZQUNULGdCQUFnQixHQUFHLElBQUksc0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixFQUFFLENBQUMsbUNBQW1DLEVBQUU7Z0JBQ3RDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsc0NBQXNDLEVBQUU7Z0JBQ3pDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxRQUFpQixDQUFDO1lBQ3RCLElBQUksc0JBQTJCLENBQUM7WUFDaEMsSUFBSSxlQUF3QixDQUFDO1lBRTdCLFVBQVUsQ0FBQztnQkFDVCxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3JCLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUM3QyxzQkFBc0IsR0FBRztvQkFDdkIsUUFBUSxFQUFFLGNBQU0sT0FBQSxRQUFRLEVBQVIsQ0FBUTtpQkFDekIsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDO2dCQUNSLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtnQkFDdEQsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDakIsZUFBZSxHQUFHLElBQUksc0JBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUVsRSxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtnQkFDckQsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDaEIsZUFBZSxHQUFHLElBQUksc0JBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUVsRSxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLG1EQUFtRCxFQUFFO2dCQUN0RCxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUNqQixlQUFlLEdBQUcsSUFBSSxzQkFBUyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBRXBGLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3hFLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDbEYsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsdURBQXVELEVBQUU7Z0JBQzFELFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLGVBQWUsR0FBRyxJQUFJLHNCQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFFcEYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDeEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDbEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNsRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBekVELG9CQXlFQyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2FwaS5jb25maWcuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IEFwaUNvbmZpZyB9IGZyb20gJy4vYXBpLmNvbmZpZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBsZXQgc2VydmljZVVuZGVyVGVzdDogQXBpQ29uZmlnLCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlOiBhbnk7XG5cbiAgZGVzY3JpYmUoJ0FwaSBDb25maWcnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IEFwaUNvbmZpZyhudWxsKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgcG9ydGFsTmFtZScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIG51bGwgaWYgbm9uZSBpcyBzZXQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnBvcnRhbCkudG9CZShudWxsKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbmFtZSBvZiB0aGUgcG9ydGFsJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LnBvcnRhbCA9ICdjb21tZXJjZSc7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0LnBvcnRhbCkudG9CZSgnY29tbWVyY2UnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hlYWRlcnMoKScsICgpID0+IHtcbiAgICAgIGxldCBsb2dnZWRJbjogYm9vbGVhbjtcbiAgICAgIGxldCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlOiBhbnk7XG4gICAgICBsZXQgcmV0dXJuZWRIZWFkZXJzOiBIZWFkZXJzO1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsICdMT0dJTl9UT0tFTicpO1xuICAgICAgICBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlID0ge1xuICAgICAgICAgIGxvZ2dlZEluOiAoKSA9PiBsb2dnZWRJblxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGFwcHJvcHJpYXRlIGhlYWRlcnMgZm9yIGEgbG9nZ2VkIG91dCB1c2VyJywgKCkgPT4ge1xuICAgICAgICBsb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICByZXR1cm5lZEhlYWRlcnMgPSBuZXcgQXBpQ29uZmlnKG1vY2tDdXJyZW50VXNlclNlcnZpY2UpLmhlYWRlcnMoKTtcblxuICAgICAgICBleHBlY3QocmV0dXJuZWRIZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpLnRvRXF1YWwoJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgZXhwZWN0KHJldHVybmVkSGVhZGVycy5nZXQoJ0FjY2VwdCcpKS50b0VxdWFsKCdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIGV4cGVjdChyZXR1cm5lZEhlYWRlcnMuaGFzKCdBdXRob3JpemF0aW9uJykpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGFwcHJvcHJpYXRlIGhlYWRlcnMgZm9yIGEgbG9nZ2VkIGluIHVzZXInLCAoKSA9PiB7XG4gICAgICAgIGxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuZWRIZWFkZXJzID0gbmV3IEFwaUNvbmZpZyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlKS5oZWFkZXJzKCk7XG5cbiAgICAgICAgZXhwZWN0KHJldHVybmVkSGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpKS50b0VxdWFsKCdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIGV4cGVjdChyZXR1cm5lZEhlYWRlcnMuZ2V0KCdBY2NlcHQnKSkudG9FcXVhbCgnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICBleHBlY3QocmV0dXJuZWRIZWFkZXJzLmdldCgnQXV0aG9yaXphdGlvbicpKS50b0VxdWFsKCdCZWFyZXIgTE9HSU5fVE9LRU4nKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYWRkcyBvdmVycmlkaW5nIGF1dGggaGVhZGVyIGZvciBhIGxvZ2dlZCBvdXQgdXNlcicsICgpID0+IHtcbiAgICAgICAgbG9nZ2VkSW4gPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuZWRIZWFkZXJzID0gbmV3IEFwaUNvbmZpZyhtb2NrQ3VycmVudFVzZXJTZXJ2aWNlKS5oZWFkZXJzKCdPVkVSUklESU5HX1RPS0VOJyk7XG5cbiAgICAgICAgZXhwZWN0KHJldHVybmVkSGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpKS50b0VxdWFsKCdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIGV4cGVjdChyZXR1cm5lZEhlYWRlcnMuZ2V0KCdBY2NlcHQnKSkudG9FcXVhbCgnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICBleHBlY3QocmV0dXJuZWRIZWFkZXJzLmdldCgnQXV0aG9yaXphdGlvbicpKS50b0VxdWFsKCdCZWFyZXIgT1ZFUlJJRElOR19UT0tFTicpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdvdmVycmlkZXMgdGhlIG5vcm1hbCBhdXRoIGhlYWRlciBmb3IgYSBsb2dnZWQgaW4gdXNlcicsICgpID0+IHtcbiAgICAgICAgbG9nZ2VkSW4gPSB0cnVlO1xuICAgICAgICByZXR1cm5lZEhlYWRlcnMgPSBuZXcgQXBpQ29uZmlnKG1vY2tDdXJyZW50VXNlclNlcnZpY2UpLmhlYWRlcnMoJ09WRVJSSURJTkdfVE9LRU4nKTtcblxuICAgICAgICBleHBlY3QocmV0dXJuZWRIZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpLnRvRXF1YWwoJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgZXhwZWN0KHJldHVybmVkSGVhZGVycy5nZXQoJ0FjY2VwdCcpKS50b0VxdWFsKCdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIGV4cGVjdChyZXR1cm5lZEhlYWRlcnMuZ2V0KCdBdXRob3JpemF0aW9uJykpLnRvRXF1YWwoJ0JlYXJlciBPVkVSUklESU5HX1RPS0VOJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
