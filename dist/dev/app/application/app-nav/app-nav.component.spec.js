"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_nav_component_1 = require("./app-nav.component");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('App Nav Component', function () {
        var componentUnderTest;
        var mockStore;
        var mockRouter;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockRouter = { navigate: jasmine.createSpy('navigate') };
            componentUnderTest = new app_nav_component_1.AppNavComponent(mockStore, mockRouter);
            componentUnderTest.trigger = { closeMenu: jasmine.createSpy('closeMenu') };
            componentUnderTest.userPreference = {
                toggleSearch: jasmine.createSpy('toggleSearch'),
                toggleCollectionTray: jasmine.createSpy('toggleCollectionTray')
            };
        });
        describe('constructor', function () {
            describe('sets the headerIsFixed instance variable', function () {
                it('to observable of true when the \'isFixed\' value is true in the store', function () {
                    mockStore.createStateSection('headerDisplayOptions', { isFixed: true });
                    componentUnderTest = new app_nav_component_1.AppNavComponent(mockStore, mockRouter);
                    var isFixed;
                    componentUnderTest.headerIsFixed.take(1).subscribe(function (fixed) { return isFixed = fixed; });
                    expect(isFixed).toBe(true);
                });
                it('to observable of false when the \'isFixed\' value is false in the store', function () {
                    mockStore.createStateSection('headerDisplayOptions', { isFixed: false });
                    componentUnderTest = new app_nav_component_1.AppNavComponent(mockStore, mockRouter);
                    var isFixed;
                    componentUnderTest.headerIsFixed.take(1).subscribe(function (fixed) { return isFixed = fixed; });
                    expect(isFixed).toBe(false);
                });
            });
            describe('sets the headerCanBeFixed instance variable', function () {
                it('to observable of true when the \'canBeFixed\' value is true in the store', function () {
                    mockStore.createStateSection('headerDisplayOptions', { canBeFixed: true });
                    componentUnderTest = new app_nav_component_1.AppNavComponent(mockStore, mockRouter);
                    var canBeFixed;
                    componentUnderTest.headerCanBeFixed.take(1).subscribe(function (fixed) { return canBeFixed = fixed; });
                    expect(canBeFixed).toBe(true);
                });
                it('to observable of false when the \'canBeFixed\' value is false in the store', function () {
                    mockStore.createStateSection('headerDisplayOptions', { canBeFixed: false });
                    componentUnderTest = new app_nav_component_1.AppNavComponent(mockStore, mockRouter);
                    var canBeFixed;
                    componentUnderTest.headerCanBeFixed.take(1).subscribe(function (fixed) { return canBeFixed = fixed; });
                    expect(canBeFixed).toBe(false);
                });
            });
        });
        describe('logOut()', function () {
            it('should fire an event to logout a user', function () {
                spyOn(componentUnderTest.onLogOut, 'emit');
                componentUnderTest.logOut(event);
                expect(componentUnderTest.onLogOut.emit).toHaveBeenCalledWith(event);
            });
            it('close the menu', function () {
                componentUnderTest.logOut(event);
                expect(componentUnderTest.trigger.closeMenu).toHaveBeenCalled();
            });
            it('navigates to the root route', function () {
                componentUnderTest.logOut(event);
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
            });
        });
        describe('toggleSearch', function () {
            it('should call toggleSearch() on the user preference object', function () {
                componentUnderTest.toggleSearch();
                expect(componentUnderTest.userPreference.toggleSearch).toHaveBeenCalled();
            });
        });
        describe('toggleCollectionTray', function () {
            it('should call toggleCollectionTray() on the user preference object', function () {
                componentUnderTest.toggleCollectionTray();
                expect(componentUnderTest.userPreference.toggleCollectionTray).toHaveBeenCalled();
            });
        });
        describe('formatBadgeNumber()', function () {
            var numbers = [0, 1, 99];
            numbers.forEach(function (num) {
                it("should return \"" + num + "\" when the size is " + num, function () {
                    expect(componentUnderTest.formatBadgeNumber(num)).toBe(num.toString());
                });
            });
            it('should return "99+" if the number is larger than 99', function () {
                expect(componentUnderTest.formatBadgeNumber(100)).toBe('99+');
            });
        });
        describe('navigateTo()', function () {
            it('calls navigate() on the router service', function () {
                componentUnderTest.navigateTo('some-path');
                expect(mockRouter.navigate).toHaveBeenCalledWith(['some-path']);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9hcHAtbmF2L2FwcC1uYXYuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBc0Q7QUFDdEQsMEVBQXVFO0FBRXZFO0lBQ0UsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLElBQUksa0JBQW1DLENBQUM7UUFDeEMsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksVUFBZSxDQUFDO1FBRXBCLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixVQUFVLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ3pELGtCQUFrQixHQUFHLElBQUksbUNBQWUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDaEUsa0JBQWtCLENBQUMsT0FBTyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQVMsQ0FBQztZQUNsRixrQkFBa0IsQ0FBQyxjQUFjLEdBQUc7Z0JBQ2xDLFlBQVksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztnQkFDL0Msb0JBQW9CLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQzthQUNoRSxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3RCLFFBQVEsQ0FBQywwQ0FBMEMsRUFBRTtnQkFDbkQsRUFBRSxDQUFDLHVFQUF1RSxFQUFFO29CQUMxRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDeEUsa0JBQWtCLEdBQUcsSUFBSSxtQ0FBZSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxPQUFnQixDQUFDO29CQUNyQixrQkFB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UUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDekUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtnQkFDeEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtnQkFDM0Msa0JBQWtCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBNUdELG9CQTRHQyIsImZpbGUiOiJhcHAvYXBwbGljYXRpb24vYXBwLW5hdi9hcHAtbmF2LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwTmF2Q29tcG9uZW50IH0gZnJvbSAnLi9hcHAtbmF2LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0FwcCBOYXYgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IEFwcE5hdkNvbXBvbmVudDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG4gICAgbGV0IG1vY2tSb3V0ZXI6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgbW9ja1JvdXRlciA9IHsgbmF2aWdhdGU6IGphc21pbmUuY3JlYXRlU3B5KCduYXZpZ2F0ZScpIH07XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgQXBwTmF2Q29tcG9uZW50KG1vY2tTdG9yZSwgbW9ja1JvdXRlcik7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QudHJpZ2dlciA9IHsgY2xvc2VNZW51OiBqYXNtaW5lLmNyZWF0ZVNweSgnY2xvc2VNZW51JykgfSBhcyBhbnk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlclByZWZlcmVuY2UgPSB7XG4gICAgICAgIHRvZ2dsZVNlYXJjaDogamFzbWluZS5jcmVhdGVTcHkoJ3RvZ2dsZVNlYXJjaCcpLFxuICAgICAgICB0b2dnbGVDb2xsZWN0aW9uVHJheTogamFzbWluZS5jcmVhdGVTcHkoJ3RvZ2dsZUNvbGxlY3Rpb25UcmF5JylcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnc2V0cyB0aGUgaGVhZGVySXNGaXhlZCBpbnN0YW5jZSB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3RvIG9ic2VydmFibGUgb2YgdHJ1ZSB3aGVuIHRoZSBcXCdpc0ZpeGVkXFwnIHZhbHVlIGlzIHRydWUgaW4gdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2hlYWRlckRpc3BsYXlPcHRpb25zJywgeyBpc0ZpeGVkOiB0cnVlIH0pO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBBcHBOYXZDb21wb25lbnQobW9ja1N0b3JlLCBtb2NrUm91dGVyKTtcbiAgICAgICAgICBsZXQgaXNGaXhlZDogYm9vbGVhbjtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGVhZGVySXNGaXhlZC50YWtlKDEpLnN1YnNjcmliZShmaXhlZCA9PiBpc0ZpeGVkID0gZml4ZWQpO1xuICAgICAgICAgIGV4cGVjdChpc0ZpeGVkKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndG8gb2JzZXJ2YWJsZSBvZiBmYWxzZSB3aGVuIHRoZSBcXCdpc0ZpeGVkXFwnIHZhbHVlIGlzIGZhbHNlIGluIHRoZSBzdG9yZScsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdoZWFkZXJEaXNwbGF5T3B0aW9ucycsIHsgaXNGaXhlZDogZmFsc2UgfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IEFwcE5hdkNvbXBvbmVudChtb2NrU3RvcmUsIG1vY2tSb3V0ZXIpO1xuICAgICAgICAgIGxldCBpc0ZpeGVkOiBib29sZWFuO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oZWFkZXJJc0ZpeGVkLnRha2UoMSkuc3Vic2NyaWJlKGZpeGVkID0+IGlzRml4ZWQgPSBmaXhlZCk7XG4gICAgICAgICAgZXhwZWN0KGlzRml4ZWQpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnc2V0cyB0aGUgaGVhZGVyQ2FuQmVGaXhlZCBpbnN0YW5jZSB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3RvIG9ic2VydmFibGUgb2YgdHJ1ZSB3aGVuIHRoZSBcXCdjYW5CZUZpeGVkXFwnIHZhbHVlIGlzIHRydWUgaW4gdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2hlYWRlckRpc3BsYXlPcHRpb25zJywgeyBjYW5CZUZpeGVkOiB0cnVlIH0pO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBBcHBOYXZDb21wb25lbnQobW9ja1N0b3JlLCBtb2NrUm91dGVyKTtcbiAgICAgICAgICBsZXQgY2FuQmVGaXhlZDogYm9vbGVhbjtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGVhZGVyQ2FuQmVGaXhlZC50YWtlKDEpLnN1YnNjcmliZShmaXhlZCA9PiBjYW5CZUZpeGVkID0gZml4ZWQpO1xuICAgICAgICAgIGV4cGVjdChjYW5CZUZpeGVkKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndG8gb2JzZXJ2YWJsZSBvZiBmYWxzZSB3aGVuIHRoZSBcXCdjYW5CZUZpeGVkXFwnIHZhbHVlIGlzIGZhbHNlIGluIHRoZSBzdG9yZScsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdoZWFkZXJEaXNwbGF5T3B0aW9ucycsIHsgY2FuQmVGaXhlZDogZmFsc2UgfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IEFwcE5hdkNvbXBvbmVudChtb2NrU3RvcmUsIG1vY2tSb3V0ZXIpO1xuICAgICAgICAgIGxldCBjYW5CZUZpeGVkOiBib29sZWFuO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oZWFkZXJDYW5CZUZpeGVkLnRha2UoMSkuc3Vic2NyaWJlKGZpeGVkID0+IGNhbkJlRml4ZWQgPSBmaXhlZCk7XG4gICAgICAgICAgZXhwZWN0KGNhbkJlRml4ZWQpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2xvZ091dCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmaXJlIGFuIGV2ZW50IHRvIGxvZ291dCBhIHVzZXInLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5vbkxvZ091dCwgJ2VtaXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmxvZ091dChldmVudCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub25Mb2dPdXQuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjbG9zZSB0aGUgbWVudScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmxvZ091dChldmVudCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudHJpZ2dlci5jbG9zZU1lbnUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnbmF2aWdhdGVzIHRvIHRoZSByb290IHJvdXRlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubG9nT3V0KGV2ZW50KTtcbiAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnLyddKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZVNlYXJjaCcsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCB0b2dnbGVTZWFyY2goKSBvbiB0aGUgdXNlciBwcmVmZXJlbmNlIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZVNlYXJjaCgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnVzZXJQcmVmZXJlbmNlLnRvZ2dsZVNlYXJjaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndG9nZ2xlQ29sbGVjdGlvblRyYXknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgdG9nZ2xlQ29sbGVjdGlvblRyYXkoKSBvbiB0aGUgdXNlciBwcmVmZXJlbmNlIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZUNvbGxlY3Rpb25UcmF5KCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudXNlclByZWZlcmVuY2UudG9nZ2xlQ29sbGVjdGlvblRyYXkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Zvcm1hdEJhZGdlTnVtYmVyKCknLCAoKSA9PiB7XG4gICAgICBjb25zdCBudW1iZXJzID0gWzAsIDEsIDk5XTtcblxuICAgICAgbnVtYmVycy5mb3JFYWNoKChudW06IG51bWJlcikgPT4ge1xuICAgICAgICBpdChgc2hvdWxkIHJldHVybiBcIiR7bnVtfVwiIHdoZW4gdGhlIHNpemUgaXMgJHtudW19YCwgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybWF0QmFkZ2VOdW1iZXIobnVtKSkudG9CZShudW0udG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIFwiOTkrXCIgaWYgdGhlIG51bWJlciBpcyBsYXJnZXIgdGhhbiA5OScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtYXRCYWRnZU51bWJlcigxMDApKS50b0JlKCc5OSsnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ25hdmlnYXRlVG8oKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyBuYXZpZ2F0ZSgpIG9uIHRoZSByb3V0ZXIgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5hdmlnYXRlVG8oJ3NvbWUtcGF0aCcpO1xuICAgICAgICBleHBlY3QobW9ja1JvdXRlci5uYXZpZ2F0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoWydzb21lLXBhdGgnXSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
