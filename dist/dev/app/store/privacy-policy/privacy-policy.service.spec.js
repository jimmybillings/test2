"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var privacy_policy_service_1 = require("./privacy-policy.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Privacy Policy Service', function () {
        var serviceUnderTest, mockApiService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            serviceUnderTest = new privacy_policy_service_1.PrivacyPolicyService(mockApiService.injector);
        });
        describe('load', function () {
            it('calls the apiService correctly', function () {
                serviceUnderTest.load('12');
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('document/downloadDocumentFile/12');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
                expect(mockApiService.get).toHaveBeenCalledWithHeaderType('download');
            });
            it('maps the response to .text()', function () {
                var response;
                mockApiService.getResponse = { text: function () { return 'some text'; } };
                serviceUnderTest.load('12').take(1).subscribe(function (res) { return response = res; });
                expect(response).toEqual('some text');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRUFBZ0U7QUFDaEUscUVBQW1GO0FBQ25GLHVFQUE0RDtBQUU1RDtJQUNFLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtRQUNqQyxJQUFJLGdCQUFzQyxFQUFFLGNBQThCLENBQUM7UUFFM0UsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxrQ0FBZSxDQUFDLENBQUM7WUFDckMsY0FBYyxHQUFHLElBQUksaUNBQWMsRUFBRSxDQUFDO1lBQ3RDLGdCQUFnQixHQUFHLElBQUksNkNBQW9CLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNmLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtnQkFDbkMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUU1QixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsa0NBQWtDLENBQUMsQ0FBQztnQkFDNUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtnQkFDakMsSUFBSSxRQUFhLENBQUM7Z0JBQ2xCLGNBQWMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUUsY0FBTSxPQUFBLFdBQVcsRUFBWCxDQUFXLEVBQUUsQ0FBQztnQkFDekQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxRQUFRLEdBQUcsR0FBRyxFQUFkLENBQWMsQ0FBQyxDQUFDO2dCQUNyRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE1QkQsb0JBNEJDIiwiZmlsZSI6ImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcml2YWN5UG9saWN5U2VydmljZSB9IGZyb20gJy4vcHJpdmFjeS1wb2xpY3kuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL21vY2stYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUHJpdmFjeSBQb2xpY3kgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogUHJpdmFjeVBvbGljeVNlcnZpY2UsIG1vY2tBcGlTZXJ2aWNlOiBNb2NrQXBpU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpO1xuICAgICAgbW9ja0FwaVNlcnZpY2UgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgUHJpdmFjeVBvbGljeVNlcnZpY2UobW9ja0FwaVNlcnZpY2UuaW5qZWN0b3IpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaVNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQoJzEyJyk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdkb2N1bWVudC9kb3dubG9hZERvY3VtZW50RmlsZS8xMicpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoSGVhZGVyVHlwZSgnZG93bmxvYWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnbWFwcyB0aGUgcmVzcG9uc2UgdG8gLnRleHQoKScsICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBhbnk7XG4gICAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0geyB0ZXh0OiAoKSA9PiAnc29tZSB0ZXh0JyB9O1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQoJzEyJykudGFrZSgxKS5zdWJzY3JpYmUocmVzID0+IHJlc3BvbnNlID0gcmVzKTtcbiAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0VxdWFsKCdzb21lIHRleHQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
