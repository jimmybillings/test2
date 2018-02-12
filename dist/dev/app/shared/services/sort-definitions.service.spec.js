"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sort_definitions_service_1 = require("./sort-definitions.service");
function main() {
    describe('Sort Definitions Service', function () {
        var serviceUnderTest;
        var mockStore, mockUserPreference;
        beforeEach(function () {
            mockStore = { select: function () { return {}; } };
            mockUserPreference = { state: { sortId: 1 } };
            serviceUnderTest = new sort_definitions_service_1.SortDefinitionsService(null, mockStore, mockUserPreference);
        });
        it('***** HASN\'T BEEN TESTED YET! *****', function () {
            expect(true).toBe(true);
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvc29ydC1kZWZpbml0aW9ucy5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1RUFBb0U7QUFFcEU7SUFDRSxRQUFRLENBQUMsMEJBQTBCLEVBQUU7UUFDbkMsSUFBSSxnQkFBd0MsQ0FBQztRQUM3QyxJQUFJLFNBQWMsRUFBRSxrQkFBdUIsQ0FBQztRQUU1QyxVQUFVLENBQUM7WUFHVCxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsY0FBUSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDN0Msa0JBQWtCLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUU5QyxnQkFBZ0IsR0FBRyxJQUFJLGlEQUFzQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNyRixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtZQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbEJELG9CQWtCQztBQUFBLENBQUMiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9zb3J0LWRlZmluaXRpb25zLnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvcnREZWZpbml0aW9uc1NlcnZpY2UgfSBmcm9tICcuL3NvcnQtZGVmaW5pdGlvbnMuc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnU29ydCBEZWZpbml0aW9ucyBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBTb3J0RGVmaW5pdGlvbnNTZXJ2aWNlO1xuICAgIGxldCBtb2NrU3RvcmU6IGFueSwgbW9ja1VzZXJQcmVmZXJlbmNlOiBhbnk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIC8vIFRPRE86IFRoaXMgaXMgYSBtaW5pbWFsIG1vY2sgdGhhdCBleGlzdHMgc29sZWx5IHRvIHN0b3BcbiAgICAgIC8vIHRoZSBjb25zdHJ1Y3RvciBmcm9tIGZhaWxpbmcuICBFbmhhbmNlIGFzIG5lZWRlZC5cbiAgICAgIG1vY2tTdG9yZSA9IHsgc2VsZWN0OiAoKSA9PiB7IHJldHVybiB7fTsgfSB9O1xuICAgICAgbW9ja1VzZXJQcmVmZXJlbmNlID0geyBzdGF0ZTogeyBzb3J0SWQ6IDEgfSB9O1xuXG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IFNvcnREZWZpbml0aW9uc1NlcnZpY2UobnVsbCwgbW9ja1N0b3JlLCBtb2NrVXNlclByZWZlcmVuY2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJyoqKioqIEhBU05cXCdUIEJFRU4gVEVTVEVEIFlFVCEgKioqKionLCAoKSA9PiB7XG4gICAgICBleHBlY3QodHJ1ZSkudG9CZSh0cnVlKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4iXX0=
