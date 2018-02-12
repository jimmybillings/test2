"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_sort_component_1 = require("./wz.sort.component");
function main() {
    describe('Wz Sort Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new wz_sort_component_1.WzSortComponent();
        });
        it('***** HASN\'T BEEN TESTED YET! *****', function () {
            spyOn(componentUnderTest.sort, 'emit');
            componentUnderTest.applySort('newSortDef');
            expect(componentUnderTest.sort.emit).toHaveBeenCalledWith('newSortDef');
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zb3J0L3d6LnNvcnQuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBc0Q7QUFFdEQ7SUFDRSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsSUFBSSxrQkFBbUMsQ0FBQztRQUV4QyxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLG1DQUFlLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtZQUN6QyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBZEQsb0JBY0M7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zb3J0L3d6LnNvcnQuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXelNvcnRDb21wb25lbnQgfSBmcm9tICcuL3d6LnNvcnQuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBTb3J0IENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBXelNvcnRDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBXelNvcnRDb21wb25lbnQoKTtcbiAgICB9KTtcblxuICAgIGl0KCcqKioqKiBIQVNOXFwnVCBCRUVOIFRFU1RFRCBZRVQhICoqKioqJywgKCkgPT4ge1xuICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LnNvcnQsICdlbWl0Jyk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QuYXBwbHlTb3J0KCduZXdTb3J0RGVmJyk7XG4gICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNvcnQuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ25ld1NvcnREZWYnKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4iXX0=
