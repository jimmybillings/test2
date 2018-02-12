"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var page_data_service_1 = require("./page-data.service");
function main() {
    describe('Page Data Service', function () {
        var serviceUnderTest;
        var mockTranslateService;
        var mockTitleService;
        beforeEach(function () {
            mockTranslateService = {
                values: {
                    COMPANY_NAME: 'Wazee Digital -',
                    SOME_KEY: ' Some value',
                    SEARCH: ' Search for {{q}}'
                },
                get: function (keys, params) {
                    var v = {};
                    keys.forEach(function (k, i) { return v[k] = mockTranslateService.values[k]; });
                    return Observable_1.Observable.of(v);
                }
            };
            mockTitleService = {
                setTitle: jasmine.createSpy('setTitle')
            };
            serviceUnderTest = new page_data_service_1.PageDataService(mockTranslateService, mockTitleService);
        });
        describe('updateTitle()', function () {
            describe('calls translateService::setTitle with the proper value', function () {
                it('when there is no search param', function () {
                    serviceUnderTest.updateTitle('SEARCH', { some: 'params' });
                    expect(mockTitleService.setTitle).toHaveBeenCalledWith('Wazee Digital - Search for all');
                });
                it('for a generic string', function () {
                    serviceUnderTest.updateTitle('SOME_KEY', { some: 'params' });
                    expect(mockTitleService.setTitle).toHaveBeenCalledWith('Wazee Digital - Some value');
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wYWdlLWRhdGEvcGFnZS1kYXRhLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3Qyx5REFBc0Q7QUFFdEQ7SUFDRSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsSUFBSSxnQkFBaUMsQ0FBQztRQUN0QyxJQUFJLG9CQUF5QixDQUFDO1FBQzlCLElBQUksZ0JBQXFCLENBQUM7UUFFMUIsVUFBVSxDQUFDO1lBQ1Qsb0JBQW9CLEdBQUc7Z0JBQ3JCLE1BQU0sRUFBRTtvQkFDTixZQUFZLEVBQUUsaUJBQWlCO29CQUMvQixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsTUFBTSxFQUFFLG1CQUFtQjtpQkFDNUI7Z0JBQ0QsR0FBRyxFQUFFLFVBQUMsSUFBYyxFQUFFLE1BQVc7b0JBQy9CLElBQUksQ0FBQyxHQUFRLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQVMsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUM7b0JBQzlFLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsQ0FBQzthQUNGLENBQUM7WUFDRixnQkFBZ0IsR0FBRztnQkFDakIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2FBQ3hDLENBQUM7WUFDRixnQkFBZ0IsR0FBRyxJQUFJLG1DQUFlLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7WUFDeEIsUUFBUSxDQUFDLHdEQUF3RCxFQUFFO2dCQUNqRSxFQUFFLENBQUMsK0JBQStCLEVBQUU7b0JBQ2xDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFFM0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGdDQUFnQyxDQUFDLENBQUM7Z0JBQzNGLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxzQkFBc0IsRUFBRTtvQkFDekIsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUU3RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDdkYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBekNELG9CQXlDQyIsImZpbGUiOiJhcHAvc3RvcmUvcGFnZS1kYXRhL3BhZ2UtZGF0YS5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2VEYXRhU2VydmljZSB9IGZyb20gJy4vcGFnZS1kYXRhLnNlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1BhZ2UgRGF0YSBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBQYWdlRGF0YVNlcnZpY2U7XG4gICAgbGV0IG1vY2tUcmFuc2xhdGVTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tUaXRsZVNlcnZpY2U6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1RyYW5zbGF0ZVNlcnZpY2UgPSB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIENPTVBBTllfTkFNRTogJ1dhemVlIERpZ2l0YWwgLScsXG4gICAgICAgICAgU09NRV9LRVk6ICcgU29tZSB2YWx1ZScsXG4gICAgICAgICAgU0VBUkNIOiAnIFNlYXJjaCBmb3Ige3txfX0nXG4gICAgICAgIH0sXG4gICAgICAgIGdldDogKGtleXM6IHN0cmluZ1tdLCBwYXJhbXM6IGFueSkgPT4ge1xuICAgICAgICAgIGxldCB2OiBhbnkgPSB7fTtcbiAgICAgICAgICBrZXlzLmZvckVhY2goKGs6IHN0cmluZywgaTogbnVtYmVyKSA9PiB2W2tdID0gbW9ja1RyYW5zbGF0ZVNlcnZpY2UudmFsdWVzW2tdKTtcbiAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih2KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG1vY2tUaXRsZVNlcnZpY2UgPSB7XG4gICAgICAgIHNldFRpdGxlOiBqYXNtaW5lLmNyZWF0ZVNweSgnc2V0VGl0bGUnKVxuICAgICAgfTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgUGFnZURhdGFTZXJ2aWNlKG1vY2tUcmFuc2xhdGVTZXJ2aWNlLCBtb2NrVGl0bGVTZXJ2aWNlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd1cGRhdGVUaXRsZSgpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ2NhbGxzIHRyYW5zbGF0ZVNlcnZpY2U6OnNldFRpdGxlIHdpdGggdGhlIHByb3BlciB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlcmUgaXMgbm8gc2VhcmNoIHBhcmFtJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QudXBkYXRlVGl0bGUoJ1NFQVJDSCcsIHsgc29tZTogJ3BhcmFtcycgfSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja1RpdGxlU2VydmljZS5zZXRUaXRsZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ1dhemVlIERpZ2l0YWwgLSBTZWFyY2ggZm9yIGFsbCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIGEgZ2VuZXJpYyBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC51cGRhdGVUaXRsZSgnU09NRV9LRVknLCB7IHNvbWU6ICdwYXJhbXMnIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tUaXRsZVNlcnZpY2Uuc2V0VGl0bGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdXYXplZSBEaWdpdGFsIC0gU29tZSB2YWx1ZScpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
