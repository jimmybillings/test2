"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_video_service_1 = require("./home.video.service");
var mock_api_service_1 = require("../../shared/mocks/mock-api.service");
function main() {
    describe('Home Video Service', function () {
        var serviceUnderTest, mockApi;
        beforeEach(function () {
            mockApi = new mock_api_service_1.MockApiService();
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApi.getResponse = { data: { 'feedid': 'qKeeO3ld', 'kind': 'manual', 'playlist': [], 'title': 'commerce-hero' } };
            serviceUnderTest = new home_video_service_1.HomeVideoService(null);
        });
        describe('data getter', function () {
            it('***** HASN\'T BEEN TESTED YET! *****', function () {
                expect(true).toBe(true);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9zZXJ2aWNlcy9ob21lLnZpZGVvLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUF3RDtBQUN4RCx3RUFBc0Y7QUFHdEY7SUFDRSxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDN0IsSUFBSSxnQkFBa0MsRUFBRSxPQUF1QixDQUFDO1FBRWhFLFVBQVUsQ0FBQztZQUNULE9BQU8sR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUMvQixPQUFPLENBQUMsV0FBVyxDQUFDLGtDQUFlLENBQUMsQ0FBQztZQUtyQyxPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxFQUFFLENBQUM7WUFDckgsZ0JBQWdCLEdBQUcsSUFBSSxxQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEIsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO2dCQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF0QkQsb0JBc0JDIiwiZmlsZSI6ImFwcC8raG9tZS9zZXJ2aWNlcy9ob21lLnZpZGVvLnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhvbWVWaWRlb1NlcnZpY2UgfSBmcm9tICcuL2hvbWUudmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vY2tzL21vY2stYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnSG9tZSBWaWRlbyBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBIb21lVmlkZW9TZXJ2aWNlLCBtb2NrQXBpOiBNb2NrQXBpU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja0FwaSA9IG5ldyBNb2NrQXBpU2VydmljZSgpO1xuICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpO1xuXG4gICAgICAvLyBtb2NrSG9tZVZpZGVvU2VydmljZSA9IHtcbiAgICAgIC8vICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7ICdmZWVkaWQnOiAncUtlZU8zbGQnLCAna2luZCc6ICdtYW51YWwnLCAncGxheWxpc3QnOiBbXSwgJ3RpdGxlJzogJ2NvbW1lcmNlLWhlcm8nIH0pXG4gICAgICAvLyB9O1xuICAgICAgbW9ja0FwaS5nZXRSZXNwb25zZSA9IHsgZGF0YTogeyAnZmVlZGlkJzogJ3FLZWVPM2xkJywgJ2tpbmQnOiAnbWFudWFsJywgJ3BsYXlsaXN0JzogW10sICd0aXRsZSc6ICdjb21tZXJjZS1oZXJvJyB9IH07XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IEhvbWVWaWRlb1NlcnZpY2UobnVsbCk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkYXRhIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCcqKioqKiBIQVNOXFwnVCBCRUVOIFRFU1RFRCBZRVQhICoqKioqJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QodHJ1ZSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
