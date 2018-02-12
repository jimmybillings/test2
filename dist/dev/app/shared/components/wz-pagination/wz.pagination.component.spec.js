"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_pagination_component_1 = require("./wz.pagination.component");
function main() {
    var componentUnderTest;
    beforeEach(function () {
        componentUnderTest = new wz_pagination_component_1.WzPaginationComponent(null);
    });
    describe('getPageNumber()', function () {
        beforeEach(function () {
            componentUnderTest.pagination = { numberOfPages: 3 };
            spyOn(componentUnderTest.getPage, 'emit');
        });
        it('emits a getPage event', function () {
            componentUnderTest.getPageNumber(2);
            expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(2);
        });
        it('should return the last page if a page higher than the numbeOfPages is entered', function () {
            componentUnderTest.getPageNumber(7);
            expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(3);
        });
        it('should return the first page if a page of 0 or lower is entered', function () {
            componentUnderTest.getPageNumber(-1);
            expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(1);
        });
        it('turns the input into an integer so a decimal input entered by a user is ok', function () {
            componentUnderTest.getPageNumber(1.2367485);
            expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(1);
        });
        it('turns the input into an integer so a letter input entered by a user is ok', function () {
            componentUnderTest.getPageNumber('adf');
            expect(componentUnderTest.getPage.emit).toHaveBeenCalledWith(1);
        });
    });
    describe('getCurrentPage()', function () {
        it('should return the page number if the number of pages is greater than 0', function () {
            componentUnderTest.pagination = { numberOfPages: 10, currentPage: 5 };
            expect(componentUnderTest.getCurrentPage()).toBe(5);
        });
        it('should return 0 if the the number of pages is 0 or less', function () {
            componentUnderTest.pagination = { numberOfPages: 0 };
            expect(componentUnderTest.getCurrentPage()).toBe(0);
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1wYWdpbmF0aW9uL3d6LnBhZ2luYXRpb24uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRUFBa0U7QUFFbEU7SUFDRSxJQUFJLGtCQUF5QyxDQUFDO0lBRTlDLFVBQVUsQ0FBQztRQUNULGtCQUFrQixHQUFHLElBQUksK0NBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLENBQUMsVUFBVSxHQUFHLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3JELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsdUJBQXVCLEVBQUU7WUFDMUIsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsK0VBQStFLEVBQUU7WUFDbEYsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsaUVBQWlFLEVBQUU7WUFDcEUsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw0RUFBNEUsRUFBRTtZQUMvRSxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywyRUFBMkUsRUFBRTtZQUM5RSxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLEVBQUUsQ0FBQyx3RUFBd0UsRUFBRTtZQUMzRSxrQkFBa0IsQ0FBQyxVQUFVLEdBQUcsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN0RSxNQUFNLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseURBQXlELEVBQUU7WUFDNUQsa0JBQWtCLENBQUMsVUFBVSxHQUFHLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWxERCxvQkFrREMiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LXBhZ2luYXRpb24vd3oucGFnaW5hdGlvbi5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFd6UGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vd3oucGFnaW5hdGlvbi5jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pQYWdpbmF0aW9uQ29tcG9uZW50O1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBXelBhZ2luYXRpb25Db21wb25lbnQobnVsbCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRQYWdlTnVtYmVyKCknLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QucGFnaW5hdGlvbiA9IHsgbnVtYmVyT2ZQYWdlczogMyB9O1xuICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LmdldFBhZ2UsICdlbWl0Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZW1pdHMgYSBnZXRQYWdlIGV2ZW50JywgKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmdldFBhZ2VOdW1iZXIoMik7XG4gICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmdldFBhZ2UuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMik7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgbGFzdCBwYWdlIGlmIGEgcGFnZSBoaWdoZXIgdGhhbiB0aGUgbnVtYmVPZlBhZ2VzIGlzIGVudGVyZWQnLCAoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QuZ2V0UGFnZU51bWJlcig3KTtcbiAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZ2V0UGFnZS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgzKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBmaXJzdCBwYWdlIGlmIGEgcGFnZSBvZiAwIG9yIGxvd2VyIGlzIGVudGVyZWQnLCAoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QuZ2V0UGFnZU51bWJlcigtMSk7XG4gICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmdldFBhZ2UuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHVybnMgdGhlIGlucHV0IGludG8gYW4gaW50ZWdlciBzbyBhIGRlY2ltYWwgaW5wdXQgZW50ZXJlZCBieSBhIHVzZXIgaXMgb2snLCAoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QuZ2V0UGFnZU51bWJlcigxLjIzNjc0ODUpO1xuICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5nZXRQYWdlLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3R1cm5zIHRoZSBpbnB1dCBpbnRvIGFuIGludGVnZXIgc28gYSBsZXR0ZXIgaW5wdXQgZW50ZXJlZCBieSBhIHVzZXIgaXMgb2snLCAoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QuZ2V0UGFnZU51bWJlcignYWRmJyk7XG4gICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmdldFBhZ2UuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRDdXJyZW50UGFnZSgpJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBwYWdlIG51bWJlciBpZiB0aGUgbnVtYmVyIG9mIHBhZ2VzIGlzIGdyZWF0ZXIgdGhhbiAwJywgKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBhZ2luYXRpb24gPSB7IG51bWJlck9mUGFnZXM6IDEwLCBjdXJyZW50UGFnZTogNSB9O1xuICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5nZXRDdXJyZW50UGFnZSgpKS50b0JlKDUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gMCBpZiB0aGUgdGhlIG51bWJlciBvZiBwYWdlcyBpcyAwIG9yIGxlc3MnLCAoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QucGFnaW5hdGlvbiA9IHsgbnVtYmVyT2ZQYWdlczogMCB9O1xuICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5nZXRDdXJyZW50UGFnZSgpKS50b0JlKDApO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
