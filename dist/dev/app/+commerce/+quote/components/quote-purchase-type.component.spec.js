"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_purchase_type_component_1 = require("./quote-purchase-type.component");
function main() {
    describe('Quote Purchase Type Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new quote_purchase_type_component_1.QuotePurchaseTypeComponent();
        });
        describe('quoteTypes setter', function () {
            beforeEach(function () {
                componentUnderTest.quoteTypes = [{ viewValue: 'Value', value: 'value' }];
            });
            it('sets the \'types\' public instance variable on the component', function () {
                expect(componentUnderTest.types).toEqual([{ viewValue: 'Value', value: 'value' }]);
            });
            it('sets the \'selectedType\' instance variable on the component', function () {
                expect(componentUnderTest.selectedType).toEqual('value');
            });
        });
        describe('onSelectChange()', function () {
            it('emits the selectQuoteType variable', function () {
                spyOn(componentUnderTest.selectQuoteType, 'emit');
                componentUnderTest.onSelectChange({ value: 'someValue' });
                expect(componentUnderTest.selectQuoteType.emit).toHaveBeenCalledWith({ purchaseType: 'someValue' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvcXVvdGUtcHVyY2hhc2UtdHlwZS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlGQUE2RTtBQUU3RTtJQUNFLFFBQVEsQ0FBQywrQkFBK0IsRUFBRTtRQUN4QyxJQUFJLGtCQUE4QyxDQUFDO1FBRW5ELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksMERBQTBCLEVBQUUsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixVQUFVLENBQUM7Z0JBQ1Qsa0JBQWtCLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzNFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLDhEQUE4RCxFQUFFO2dCQUNqRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsOERBQThELEVBQUU7Z0JBQ2pFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixFQUFFLENBQUMsb0NBQW9DLEVBQUU7Z0JBQ3ZDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVMsQ0FBQyxDQUFDO2dCQUVqRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDdEcsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTlCRCxvQkE4QkMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvY29tcG9uZW50cy9xdW90ZS1wdXJjaGFzZS10eXBlLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVvdGVQdXJjaGFzZVR5cGVDb21wb25lbnQgfSBmcm9tICcuL3F1b3RlLXB1cmNoYXNlLXR5cGUuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdRdW90ZSBQdXJjaGFzZSBUeXBlIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBRdW90ZVB1cmNoYXNlVHlwZUNvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlUHVyY2hhc2VUeXBlQ29tcG9uZW50KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncXVvdGVUeXBlcyBzZXR0ZXInLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnF1b3RlVHlwZXMgPSBbeyB2aWV3VmFsdWU6ICdWYWx1ZScsIHZhbHVlOiAndmFsdWUnIH1dO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2V0cyB0aGUgXFwndHlwZXNcXCcgcHVibGljIGluc3RhbmNlIHZhcmlhYmxlIG9uIHRoZSBjb21wb25lbnQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudHlwZXMpLnRvRXF1YWwoW3sgdmlld1ZhbHVlOiAnVmFsdWUnLCB2YWx1ZTogJ3ZhbHVlJyB9XSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgdGhlIFxcJ3NlbGVjdGVkVHlwZVxcJyBpbnN0YW5jZSB2YXJpYWJsZSBvbiB0aGUgY29tcG9uZW50JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdGVkVHlwZSkudG9FcXVhbCgndmFsdWUnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uU2VsZWN0Q2hhbmdlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgdGhlIHNlbGVjdFF1b3RlVHlwZSB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdFF1b3RlVHlwZSwgJ2VtaXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU2VsZWN0Q2hhbmdlKHsgdmFsdWU6ICdzb21lVmFsdWUnIH0gYXMgYW55KTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdFF1b3RlVHlwZS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHB1cmNoYXNlVHlwZTogJ3NvbWVWYWx1ZScgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
