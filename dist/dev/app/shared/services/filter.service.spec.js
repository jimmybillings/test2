"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_service_1 = require("./filter.service");
function main() {
    describe('Filter Service', function () {
        var serviceUnderTest;
        var mockStore;
        beforeEach(function () {
            mockStore = { select: function () { return {}; } };
            serviceUnderTest = new filter_service_1.FilterService(null, mockStore, null);
        });
        it('***** HASN\'T BEEN TESTED YET! *****', function () {
            expect(true).toBe(true);
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvZmlsdGVyLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFpRDtBQUVqRDtJQUNFLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixJQUFJLGdCQUErQixDQUFDO1FBQ3BDLElBQUksU0FBYyxDQUFDO1FBRW5CLFVBQVUsQ0FBQztZQUdULFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxjQUFRLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM3QyxnQkFBZ0IsR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtZQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBaEJELG9CQWdCQyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9maWx0ZXIuc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnRmlsdGVyIFNlcnZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IEZpbHRlclNlcnZpY2U7XG4gICAgbGV0IG1vY2tTdG9yZTogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAvLyBUT0RPOiBUaGlzIGlzIGEgbWluaW1hbCBtb2NrIHRoYXQgZXhpc3RzIHNvbGVseSB0byBzdG9wXG4gICAgICAvLyB0aGUgY29uc3RydWN0b3IgZnJvbSBmYWlsaW5nLiAgRW5oYW5jZSBhcyBuZWVkZWQuXG4gICAgICBtb2NrU3RvcmUgPSB7IHNlbGVjdDogKCkgPT4geyByZXR1cm4ge307IH0gfTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgRmlsdGVyU2VydmljZShudWxsLCBtb2NrU3RvcmUsIG51bGwpO1xuICAgIH0pO1xuXG4gICAgaXQoJyoqKioqIEhBU05cXCdUIEJFRU4gVEVTVEVEIFlFVCEgKioqKionLCAoKSA9PiB7XG4gICAgICBleHBlY3QodHJ1ZSkudG9CZSh0cnVlKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
