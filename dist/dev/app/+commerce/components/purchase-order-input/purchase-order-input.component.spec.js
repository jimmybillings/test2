"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var purchase_order_input_component_1 = require("./purchase-order-input.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Purchase Order Input Component', function () {
        var componentUnderTest;
        var setPurchaseOrderIdDispatchSpy;
        var mockAppStore;
        beforeEach(function () {
            mockAppStore = new mock_app_store_1.MockAppStore();
            mockAppStore.createStateSection('uiConfig', {
                components: { cart: { config: { addPurchaseOrderId: { items: [{ some: 'field' }] } } } }
            });
            setPurchaseOrderIdDispatchSpy = mockAppStore.createActionFactoryMethod('checkout', 'setPurchaseOrderId');
            componentUnderTest = new purchase_order_input_component_1.PurchaseOrderInputComponent(mockAppStore);
        });
        describe('ngOnInit()', function () {
            it('gets the form input from the ui config', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.PurchaseOrderFormConfig).toEqual([{ some: 'field' }]);
            });
        });
        describe('onBlur()', function () {
            it('dispatchs updateSalesManagerFormOnQuote with the sales manager form', function () {
                componentUnderTest.onBlur({ purchaseOrderId: '123456-789' });
                expect(setPurchaseOrderIdDispatchSpy).toHaveBeenCalledWith('123456-789');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wdXJjaGFzZS1vcmRlci1pbnB1dC9wdXJjaGFzZS1vcmRlci1pbnB1dC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1GQUErRTtBQUMvRSw2RUFBMEU7QUFFMUU7SUFDRSxRQUFRLENBQUMsZ0NBQWdDLEVBQUU7UUFDekMsSUFBSSxrQkFBK0MsQ0FBQztRQUNwRCxJQUFJLDZCQUEwQyxDQUFDO1FBQy9DLElBQUksWUFBMEIsQ0FBQztRQUUvQixVQUFVLENBQUM7WUFDVCxZQUFZLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFFbEMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtnQkFDMUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO2FBQ3pGLENBQUMsQ0FBQztZQUVILDZCQUE2QixHQUFHLFlBQVksQ0FBQyx5QkFBeUIsQ0FDcEUsVUFBVSxFQUNWLG9CQUFvQixDQUNyQixDQUFDO1lBRUYsa0JBQWtCLEdBQUcsSUFBSSw0REFBMkIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsRUFBRSxDQUFDLHdDQUF3QyxFQUFFO2dCQUMzQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ25CLEVBQUUsQ0FBQyxxRUFBcUUsRUFBRTtnQkFDeEUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBUyxDQUFDLENBQUM7Z0JBRXBFLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwQ0Qsb0JBb0NDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wdXJjaGFzZS1vcmRlci1pbnB1dC9wdXJjaGFzZS1vcmRlci1pbnB1dC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUHVyY2hhc2VPcmRlcklucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9wdXJjaGFzZS1vcmRlci1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdQdXJjaGFzZSBPcmRlciBJbnB1dCBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogUHVyY2hhc2VPcmRlcklucHV0Q29tcG9uZW50O1xuICAgIGxldCBzZXRQdXJjaGFzZU9yZGVySWREaXNwYXRjaFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IG1vY2tBcHBTdG9yZTogTW9ja0FwcFN0b3JlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrQXBwU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG5cbiAgICAgIG1vY2tBcHBTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywge1xuICAgICAgICBjb21wb25lbnRzOiB7IGNhcnQ6IHsgY29uZmlnOiB7IGFkZFB1cmNoYXNlT3JkZXJJZDogeyBpdGVtczogW3sgc29tZTogJ2ZpZWxkJyB9XSB9IH0gfSB9XG4gICAgICB9KTtcblxuICAgICAgc2V0UHVyY2hhc2VPcmRlcklkRGlzcGF0Y2hTcHkgPSBtb2NrQXBwU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZChcbiAgICAgICAgJ2NoZWNrb3V0JyxcbiAgICAgICAgJ3NldFB1cmNoYXNlT3JkZXJJZCdcbiAgICAgICk7XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBQdXJjaGFzZU9yZGVySW5wdXRDb21wb25lbnQobW9ja0FwcFN0b3JlKTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnbmdPbkluaXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdnZXRzIHRoZSBmb3JtIGlucHV0IGZyb20gdGhlIHVpIGNvbmZpZycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5QdXJjaGFzZU9yZGVyRm9ybUNvbmZpZykudG9FcXVhbChbeyBzb21lOiAnZmllbGQnIH1dKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQmx1cigpJywgKCkgPT4ge1xuICAgICAgaXQoJ2Rpc3BhdGNocyB1cGRhdGVTYWxlc01hbmFnZXJGb3JtT25RdW90ZSB3aXRoIHRoZSBzYWxlcyBtYW5hZ2VyIGZvcm0nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkJsdXIoeyBwdXJjaGFzZU9yZGVySWQ6ICcxMjM0NTYtNzg5JyB9IGFzIGFueSk7XG5cbiAgICAgICAgZXhwZWN0KHNldFB1cmNoYXNlT3JkZXJJZERpc3BhdGNoU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnMTIzNDU2LTc4OScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
