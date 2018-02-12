"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_base_1 = require("./error.base");
function main() {
    describe('Error Base Class', function () {
        var classUnderTest;
        var mockCapabilities;
        var canAddToCart;
        var canAdministerQuotes;
        var canViewCollections;
        beforeEach(function () {
            mockCapabilities = {
                addToCart: function () { return canAddToCart; },
                administerQuotes: function () { return canAdministerQuotes; },
                viewCollections: function () { return canViewCollections; }
            };
            classUnderTest = new error_base_1.ErrorBase(mockCapabilities);
        });
        describe('showCartLink getter', function () {
            describe('returns false', function () {
                it('when the user can\'t add to their cart', function () {
                    canAddToCart = false;
                    expect(classUnderTest.showCartLink).toBe(false);
                });
                it('when the user can add to their cart, but can administer quotes', function () {
                    canAddToCart = true;
                    canAdministerQuotes = true;
                    expect(classUnderTest.showCartLink).toBe(false);
                });
            });
            describe('returns true', function () {
                it('when the user can add to their cart and can\'t administer quotes', function () {
                    canAddToCart = true;
                    canAdministerQuotes = false;
                    expect(classUnderTest.showCartLink).toBe(true);
                });
            });
        });
        describe('showCollectionsLink getter', function () {
            describe('returns false', function () {
                it('when the user can\'t view collections', function () {
                    canViewCollections = false;
                    expect(classUnderTest.showCollectionsLink).toBe(false);
                });
            });
            describe('returns true', function () {
                it('when the user can\'t view collections', function () {
                    canViewCollections = true;
                    expect(classUnderTest.showCollectionsLink).toBe(true);
                });
            });
        });
        describe('showQuotesLink getter', function () {
            describe('returns false', function () {
                it('when the user can\'t administer quotes', function () {
                    canAdministerQuotes = false;
                    expect(classUnderTest.showQuotesLink).toBe(false);
                });
            });
            describe('returns true', function () {
                it('when the user can\'t administer quotes', function () {
                    canAdministerQuotes = true;
                    expect(classUnderTest.showQuotesLink).toBe(true);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZXJyb3IvZXJyb3IuYmFzZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXlDO0FBRXpDO0lBQ0UsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLElBQUksY0FBeUIsQ0FBQztRQUM5QixJQUFJLGdCQUFxQixDQUFDO1FBQzFCLElBQUksWUFBcUIsQ0FBQztRQUMxQixJQUFJLG1CQUE0QixDQUFDO1FBQ2pDLElBQUksa0JBQTJCLENBQUM7UUFFaEMsVUFBVSxDQUFDO1lBQ1QsZ0JBQWdCLEdBQUc7Z0JBQ2pCLFNBQVMsRUFBRSxjQUFNLE9BQUEsWUFBWSxFQUFaLENBQVk7Z0JBQzdCLGdCQUFnQixFQUFFLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUI7Z0JBQzNDLGVBQWUsRUFBRSxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCO2FBQzFDLENBQUM7WUFDRixjQUFjLEdBQUcsSUFBSSxzQkFBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsRUFBRSxDQUFDLHdDQUF3QyxFQUFFO29CQUMzQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUNyQixNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO29CQUNuRSxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUNwQixtQkFBbUIsR0FBRyxJQUFJLENBQUM7b0JBQzNCLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLGNBQWMsRUFBRTtnQkFDdkIsRUFBRSxDQUFDLGtFQUFrRSxFQUFFO29CQUNyRSxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUNwQixtQkFBbUIsR0FBRyxLQUFLLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsNEJBQTRCLEVBQUU7WUFDckMsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsRUFBRSxDQUFDLHVDQUF1QyxFQUFFO29CQUMxQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7b0JBQzNCLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pELENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO2dCQUN2QixFQUFFLENBQUMsdUNBQXVDLEVBQUU7b0JBQzFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztvQkFDMUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtvQkFDM0MsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO29CQUM1QixNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtvQkFDM0MsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO29CQUMzQixNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBeEVELG9CQXdFQyIsImZpbGUiOiJhcHAvK2Vycm9yL2Vycm9yLmJhc2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9yQmFzZSB9IGZyb20gJy4vZXJyb3IuYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnRXJyb3IgQmFzZSBDbGFzcycsICgpID0+IHtcbiAgICBsZXQgY2xhc3NVbmRlclRlc3Q6IEVycm9yQmFzZTtcbiAgICBsZXQgbW9ja0NhcGFiaWxpdGllczogYW55O1xuICAgIGxldCBjYW5BZGRUb0NhcnQ6IGJvb2xlYW47XG4gICAgbGV0IGNhbkFkbWluaXN0ZXJRdW90ZXM6IGJvb2xlYW47XG4gICAgbGV0IGNhblZpZXdDb2xsZWN0aW9uczogYm9vbGVhbjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja0NhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgYWRkVG9DYXJ0OiAoKSA9PiBjYW5BZGRUb0NhcnQsXG4gICAgICAgIGFkbWluaXN0ZXJRdW90ZXM6ICgpID0+IGNhbkFkbWluaXN0ZXJRdW90ZXMsXG4gICAgICAgIHZpZXdDb2xsZWN0aW9uczogKCkgPT4gY2FuVmlld0NvbGxlY3Rpb25zXG4gICAgICB9O1xuICAgICAgY2xhc3NVbmRlclRlc3QgPSBuZXcgRXJyb3JCYXNlKG1vY2tDYXBhYmlsaXRpZXMpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dDYXJ0TGluayBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2FuXFwndCBhZGQgdG8gdGhlaXIgY2FydCcsICgpID0+IHtcbiAgICAgICAgICBjYW5BZGRUb0NhcnQgPSBmYWxzZTtcbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvd0NhcnRMaW5rKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2FuIGFkZCB0byB0aGVpciBjYXJ0LCBidXQgY2FuIGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGNhbkFkZFRvQ2FydCA9IHRydWU7XG4gICAgICAgICAgY2FuQWRtaW5pc3RlclF1b3RlcyA9IHRydWU7XG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3dDYXJ0TGluaykudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhbiBhZGQgdG8gdGhlaXIgY2FydCBhbmQgY2FuXFwndCBhZG1pbmlzdGVyIHF1b3RlcycsICgpID0+IHtcbiAgICAgICAgICBjYW5BZGRUb0NhcnQgPSB0cnVlO1xuICAgICAgICAgIGNhbkFkbWluaXN0ZXJRdW90ZXMgPSBmYWxzZTtcbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvd0NhcnRMaW5rKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dDb2xsZWN0aW9uc0xpbmsgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhblxcJ3QgdmlldyBjb2xsZWN0aW9ucycsICgpID0+IHtcbiAgICAgICAgICBjYW5WaWV3Q29sbGVjdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvd0NvbGxlY3Rpb25zTGluaykudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhblxcJ3QgdmlldyBjb2xsZWN0aW9ucycsICgpID0+IHtcbiAgICAgICAgICBjYW5WaWV3Q29sbGVjdGlvbnMgPSB0cnVlO1xuICAgICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG93Q29sbGVjdGlvbnNMaW5rKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dRdW90ZXNMaW5rIGdldHRlcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW5cXCd0IGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGNhbkFkbWluaXN0ZXJRdW90ZXMgPSBmYWxzZTtcbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvd1F1b3Rlc0xpbmspLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW5cXCd0IGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG93UXVvdGVzTGluaykudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
