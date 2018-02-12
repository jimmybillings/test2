"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var orders_component_1 = require("./orders.component");
var Observable_1 = require("rxjs/Observable");
function main() {
    describe('Orders Component', function () {
        var componentUnderTest;
        var mockRouter, mockRoute, mockOrdersService;
        beforeEach(function () {
            mockRoute = { params: Observable_1.Observable.of({ i: '1', n: '4' }) };
            mockRouter = { navigate: jasmine.createSpy('navigate') };
            mockOrdersService = { getOrders: jasmine.createSpy('getOrders').and.returnValue(Observable_1.Observable.of({})) };
            componentUnderTest = new orders_component_1.OrdersComponent(mockOrdersService, mockRoute, mockRouter);
        });
        describe('Initialization', function () {
            it('Should subscribe to the activated route setting page and number per page from params', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.ordersPerPage).toEqual('4');
            });
            it('Should subscribe to the activated route without params per page default is 20', function () {
                mockRoute = { params: Observable_1.Observable.of({}) };
                componentUnderTest = new orders_component_1.OrdersComponent(null, mockRoute, mockRouter);
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.ordersPerPage).toEqual('20');
            });
        });
        describe('changePage()', function () {
            it('Should accept a page number and navigate to the correct page url', function () {
                componentUnderTest.changePage(99);
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/orders', { n: '20', i: 99 }]);
            });
        });
        describe('search()', function () {
            it('Should accept a search query and navigate to a url that include the search query', function () {
                componentUnderTest.onSearch({ q: 'dogs' });
                expect(mockOrdersService.getOrders).toHaveBeenCalledWith({ q: 'dogs' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyLytpbmRleC9vcmRlcnMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBcUQ7QUFDckQsOENBQTZDO0FBRTdDO0lBQ0UsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLElBQUksa0JBQW1DLENBQUM7UUFDeEMsSUFBSSxVQUFlLEVBQUUsU0FBYyxFQUFFLGlCQUFzQixDQUFDO1FBRTVELFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUMxRCxVQUFVLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ3pELGlCQUFpQixHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckcsa0JBQWtCLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNyRixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixFQUFFLENBQUMsc0ZBQXNGLEVBQUU7Z0JBQ3pGLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLCtFQUErRSxFQUFFO2dCQUNsRixTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDMUMsa0JBQWtCLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3RFLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxrRUFBa0UsRUFBRTtnQkFDckUsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ25CLEVBQUUsQ0FBQyxrRkFBa0YsRUFBRTtnQkFDckYsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzFFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF4Q0Qsb0JBd0NDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK29yZGVyLytpbmRleC9vcmRlcnMuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcmRlcnNDb21wb25lbnQgfSBmcm9tICcuL29yZGVycy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnT3JkZXJzIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBPcmRlcnNDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tSb3V0ZXI6IGFueSwgbW9ja1JvdXRlOiBhbnksIG1vY2tPcmRlcnNTZXJ2aWNlOiBhbnk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tSb3V0ZSA9IHsgcGFyYW1zOiBPYnNlcnZhYmxlLm9mKHsgaTogJzEnLCBuOiAnNCcgfSkgfTtcbiAgICAgIG1vY2tSb3V0ZXIgPSB7IG5hdmlnYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnbmF2aWdhdGUnKSB9O1xuICAgICAgbW9ja09yZGVyc1NlcnZpY2UgPSB7IGdldE9yZGVyczogamFzbWluZS5jcmVhdGVTcHkoJ2dldE9yZGVycycpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHt9KSkgfTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBPcmRlcnNDb21wb25lbnQobW9ja09yZGVyc1NlcnZpY2UsIG1vY2tSb3V0ZSwgbW9ja1JvdXRlcik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnSW5pdGlhbGl6YXRpb24nLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIHN1YnNjcmliZSB0byB0aGUgYWN0aXZhdGVkIHJvdXRlIHNldHRpbmcgcGFnZSBhbmQgbnVtYmVyIHBlciBwYWdlIGZyb20gcGFyYW1zJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vcmRlcnNQZXJQYWdlKS50b0VxdWFsKCc0Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBzdWJzY3JpYmUgdG8gdGhlIGFjdGl2YXRlZCByb3V0ZSB3aXRob3V0IHBhcmFtcyBwZXIgcGFnZSBkZWZhdWx0IGlzIDIwJywgKCkgPT4ge1xuICAgICAgICBtb2NrUm91dGUgPSB7IHBhcmFtczogT2JzZXJ2YWJsZS5vZih7fSkgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IE9yZGVyc0NvbXBvbmVudChudWxsLCBtb2NrUm91dGUsIG1vY2tSb3V0ZXIpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vcmRlcnNQZXJQYWdlKS50b0VxdWFsKCcyMCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2hhbmdlUGFnZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBhY2NlcHQgYSBwYWdlIG51bWJlciBhbmQgbmF2aWdhdGUgdG8gdGhlIGNvcnJlY3QgcGFnZSB1cmwnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jaGFuZ2VQYWdlKDk5KTtcbiAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnL29yZGVycycsIHsgbjogJzIwJywgaTogOTkgfV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2VhcmNoKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGFjY2VwdCBhIHNlYXJjaCBxdWVyeSBhbmQgbmF2aWdhdGUgdG8gYSB1cmwgdGhhdCBpbmNsdWRlIHRoZSBzZWFyY2ggcXVlcnknLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblNlYXJjaCh7IHE6ICdkb2dzJyB9KTtcbiAgICAgICAgZXhwZWN0KG1vY2tPcmRlcnNTZXJ2aWNlLmdldE9yZGVycykudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBxOiAnZG9ncycgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
