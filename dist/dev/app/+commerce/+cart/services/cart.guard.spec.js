"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cart_guard_1 = require("./cart.guard");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Cart Guard', function () {
        var mockCommerceCapabilities;
        var mockStore;
        describe('canActivate()', function () {
            var viewCarts;
            var errorSpy;
            beforeEach(function () {
                mockCommerceCapabilities = { addToCart: function () { return viewCarts; } };
                mockStore = new mock_app_store_1.MockAppStore();
                errorSpy = mockStore.createActionFactoryMethod('error', 'handle403Forbidden');
            });
            it('returns true when logged in', function () {
                viewCarts = true;
                expect(new cart_guard_1.CartGuard(mockCommerceCapabilities, mockStore).canActivate(null, null))
                    .toBe(true);
                expect(errorSpy).not.toHaveBeenCalled();
            });
            it('returns false when not logged in', function () {
                viewCarts = false;
                expect(new cart_guard_1.CartGuard(mockCommerceCapabilities, mockStore).canActivate(null, null))
                    .toBe(false);
                mockStore.expectDispatchFor(errorSpy);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvc2VydmljZXMvY2FydC5ndWFyZC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXlDO0FBQ3pDLDZFQUEwRTtBQUUxRTtJQUNFLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDckIsSUFBSSx3QkFBNkIsQ0FBQztRQUNsQyxJQUFJLFNBQXVCLENBQUM7UUFFNUIsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLFNBQWtCLENBQUM7WUFDdkIsSUFBSSxRQUFxQixDQUFDO1lBRTFCLFVBQVUsQ0FBQztnQkFDVCx3QkFBd0IsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFNLE9BQUEsU0FBUyxFQUFULENBQVMsRUFBRSxDQUFDO2dCQUMxRCxTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7Z0JBQy9CLFFBQVEsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDaEYsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsNkJBQTZCLEVBQUU7Z0JBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBRWpCLE1BQU0sQ0FBQyxJQUFJLHNCQUFTLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDL0UsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtnQkFDckMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFFbEIsTUFBTSxDQUFDLElBQUksc0JBQVMsQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUMvRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFoQ0Qsb0JBZ0NDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytjYXJ0L3NlcnZpY2VzL2NhcnQuZ3VhcmQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhcnRHdWFyZCB9IGZyb20gJy4vY2FydC5ndWFyZCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NhcnQgR3VhcmQnLCAoKSA9PiB7XG4gICAgbGV0IG1vY2tDb21tZXJjZUNhcGFiaWxpdGllczogYW55O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcblxuICAgIGRlc2NyaWJlKCdjYW5BY3RpdmF0ZSgpJywgKCkgPT4ge1xuICAgICAgbGV0IHZpZXdDYXJ0czogYm9vbGVhbjtcbiAgICAgIGxldCBlcnJvclNweTogamFzbWluZS5TcHk7XG5cbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBtb2NrQ29tbWVyY2VDYXBhYmlsaXRpZXMgPSB7IGFkZFRvQ2FydDogKCkgPT4gdmlld0NhcnRzIH07XG4gICAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgICAgZXJyb3JTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnZXJyb3InLCAnaGFuZGxlNDAzRm9yYmlkZGVuJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGxvZ2dlZCBpbicsICgpID0+IHtcbiAgICAgICAgdmlld0NhcnRzID0gdHJ1ZTtcblxuICAgICAgICBleHBlY3QobmV3IENhcnRHdWFyZChtb2NrQ29tbWVyY2VDYXBhYmlsaXRpZXMsIG1vY2tTdG9yZSkuY2FuQWN0aXZhdGUobnVsbCwgbnVsbCkpXG4gICAgICAgICAgLnRvQmUodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChlcnJvclNweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIG5vdCBsb2dnZWQgaW4nLCAoKSA9PiB7XG4gICAgICAgIHZpZXdDYXJ0cyA9IGZhbHNlO1xuXG4gICAgICAgIGV4cGVjdChuZXcgQ2FydEd1YXJkKG1vY2tDb21tZXJjZUNhcGFiaWxpdGllcywgbW9ja1N0b3JlKS5jYW5BY3RpdmF0ZShudWxsLCBudWxsKSlcbiAgICAgICAgICAudG9CZShmYWxzZSk7XG4gICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihlcnJvclNweSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIl19
