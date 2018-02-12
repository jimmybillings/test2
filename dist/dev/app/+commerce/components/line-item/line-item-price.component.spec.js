"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var line_item_price_component_1 = require("./line-item-price.component");
function main() {
    describe('Line Item Price Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new line_item_price_component_1.LineItemPriceComponent();
        });
        describe('needsAttributes getter', function () {
            describe('returns true ', function () {
                it('when the lineItem is \'Rights Managed\' and doesn\'t have price attributes', function () {
                    componentUnderTest.rightsManaged = 'Rights Managed';
                    componentUnderTest.hasAttributes = false;
                    expect(componentUnderTest.needsAttributes).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the lineItem is not \'Rights Managed\'', function () {
                    componentUnderTest.rightsManaged = 'Royalty Free';
                    expect(componentUnderTest.needsAttributes).toBe(false);
                });
                it('when the lineItem is \'Rights Managed\', but it does have attributes', function () {
                    componentUnderTest.rightsManaged = 'Rights Managed';
                    componentUnderTest.hasAttributes = true;
                    expect(componentUnderTest.needsAttributes).toBe(false);
                });
            });
        });
        describe('shouldShowMultiplier getter', function () {
            describe('returns true', function () {
                it('when the user can administer quotes and the multiplier is greater than 1', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.multiplier = 2;
                    expect(componentUnderTest.shouldShowMultiplier).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user cannot administer quotes', function () {
                    componentUnderTest.userCanAdministerQuotes = false;
                    expect(componentUnderTest.shouldShowMultiplier).toBe(false);
                });
                it('when the user can administer quotes, but the multiplier is less than 1', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.multiplier = 0;
                    expect(componentUnderTest.shouldShowMultiplier).toBe(false);
                });
            });
        });
        describe('formattedMultiplier getter', function () {
            describe('returns the multiplier truncated (NOT ROUNDED) at 2 decimal places', function () {
                it('for a small number', function () {
                    componentUnderTest.multiplier = 8.8796543;
                    expect(componentUnderTest.formattedMultiplier).toEqual('8.87');
                });
                it('for a large number', function () {
                    componentUnderTest.multiplier = 1758.19241;
                    expect(componentUnderTest.formattedMultiplier).toEqual('1758.19');
                });
                it('for a number with only 1 decimal point', function () {
                    componentUnderTest.multiplier = 4.1;
                    expect(componentUnderTest.formattedMultiplier).toEqual('4.1');
                });
                it('for a number with no decimal points', function () {
                    componentUnderTest.multiplier = 4;
                    expect(componentUnderTest.formattedMultiplier).toEqual('4');
                });
            });
        });
        describe('showAdminPrice getter', function () {
            describe('returns true', function () {
                it('when the user can administer quotes, and the lineItem doesnt need attributes', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.rightsManaged = 'Royalty Free';
                    expect(componentUnderTest.showAdminPrice).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user can\'t administer quotes', function () {
                    componentUnderTest.userCanAdministerQuotes = false;
                    expect(componentUnderTest.showAdminPrice).toBe(false);
                });
                it('when the user can administer quotes, but the lineItem does need attributes', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.rightsManaged = 'Rights Managed';
                    componentUnderTest.hasAttributes = false;
                    expect(componentUnderTest.showAdminPrice).toBe(false);
                });
            });
        });
        describe('onClickPrice()', function () {
            it('emits the addCustomPrice event', function () {
                spyOn(componentUnderTest.addCustomPrice, 'emit');
                componentUnderTest.onClickPrice();
                expect(componentUnderTest.addCustomPrice.emit).toHaveBeenCalled();
            });
        });
        describe('showPreDiscountPrice getter', function () {
            describe('returns true', function () {
                it('when the user can administer quotes and the grossAssetPrice is different from the price', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.itemPrice = 200.89;
                    componentUnderTest.price = 200.99;
                    componentUnderTest.overrideGrossAssetPrice = null;
                    expect(componentUnderTest.showPreDiscountPrice).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user cannot administer quotes', function () {
                    componentUnderTest.userCanAdministerQuotes = false;
                    expect(componentUnderTest.showPreDiscountPrice).toBe(false);
                });
                it('when the user can administer quotes and the grossAssetPrice is the same as the price', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.itemPrice = 200.89;
                    componentUnderTest.price = 200.89;
                    componentUnderTest.overrideGrossAssetPrice = 1000;
                    expect(componentUnderTest.showPreDiscountPrice).toBe(false);
                });
            });
        });
        describe('showAdminOveridePrice getter', function () {
            describe('returns true', function () {
                it('when user can administer quotes, its not readonly and the lineItem has an overrideGrossAsset price', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.readonly = false;
                    componentUnderTest.overrideGrossAssetPrice = 200;
                    expect(componentUnderTest.showAdminOveridePrice).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user cannot administer quotes', function () {
                    componentUnderTest.userCanAdministerQuotes = false;
                    expect(componentUnderTest.showAdminOveridePrice).toBe(false);
                });
                it('when its not readonly', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.readonly = true;
                    componentUnderTest.overrideGrossAssetPrice = 200;
                    expect(componentUnderTest.showAdminOveridePrice).toBe(false);
                });
                it('when there is no override price', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.readonly = false;
                    componentUnderTest.overrideGrossAssetPrice = null;
                    expect(componentUnderTest.showAdminOveridePrice).toBe(false);
                });
            });
        });
        describe('shouldShowBasePrice getter', function () {
            describe('returns true', function () {
                it('when user can administer quotes and it has a override price and the base price does not equal the price property', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.price = 200;
                    componentUnderTest.itemPrice = 100;
                    componentUnderTest.overrideGrossAssetPrice = 200;
                    expect(componentUnderTest.shouldShowBasePrice).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user cannot administer quotes', function () {
                    componentUnderTest.userCanAdministerQuotes = false;
                    componentUnderTest.price = 200;
                    componentUnderTest.itemPrice = 100;
                    componentUnderTest.overrideGrossAssetPrice = 200;
                    expect(componentUnderTest.shouldShowBasePrice).toBe(false);
                });
                it('when there is no override price', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.price = 200;
                    componentUnderTest.itemPrice = 100;
                    componentUnderTest.overrideGrossAssetPrice = null;
                    expect(componentUnderTest.shouldShowBasePrice).toBe(false);
                });
                it('when the base price equals the price property', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.price = 200;
                    componentUnderTest.itemPrice = 200;
                    componentUnderTest.overrideGrossAssetPrice = 300;
                    expect(componentUnderTest.shouldShowBasePrice).toBe(false);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtLXByaWNlLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUVBQXFFO0FBRXJFO0lBQ0UsUUFBUSxDQUFDLDJCQUEyQixFQUFFO1FBQ3BDLElBQUksa0JBQTBDLENBQUM7UUFFL0MsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSxrREFBc0IsRUFBRSxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyw0RUFBNEUsRUFBRTtvQkFDL0Usa0JBQWtCLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDO29CQUNwRCxrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO29CQUV6QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsRUFBRSxDQUFDLDZDQUE2QyxFQUFFO29CQUNoRCxrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDO29CQUVsRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsc0VBQXNFLEVBQUU7b0JBQ3pFLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQztvQkFDcEQsa0JBQWtCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFFeEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztn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QkFDbEQsa0JBQWtCLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztvQkFDL0Isa0JBQWtCLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztvQkFDbkMsa0JBQWtCLENBQUMsdUJBQXVCLEdBQUcsR0FBRyxDQUFDO29CQUNqRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdELENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTdORCxvQkE2TkMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2xpbmUtaXRlbS9saW5lLWl0ZW0tcHJpY2UuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaW5lSXRlbVByaWNlQ29tcG9uZW50IH0gZnJvbSAnLi9saW5lLWl0ZW0tcHJpY2UuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdMaW5lIEl0ZW0gUHJpY2UgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IExpbmVJdGVtUHJpY2VDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBMaW5lSXRlbVByaWNlQ29tcG9uZW50KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmVlZHNBdHRyaWJ1dGVzIGdldHRlcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUgJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgbGluZUl0ZW0gaXMgXFwnUmlnaHRzIE1hbmFnZWRcXCcgYW5kIGRvZXNuXFwndCBoYXZlIHByaWNlIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c01hbmFnZWQgPSAnUmlnaHRzIE1hbmFnZWQnO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYXNBdHRyaWJ1dGVzID0gZmFsc2U7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5lZWRzQXR0cmlidXRlcykudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBsaW5lSXRlbSBpcyBub3QgXFwnUmlnaHRzIE1hbmFnZWRcXCcnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c01hbmFnZWQgPSAnUm95YWx0eSBGcmVlJztcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubmVlZHNBdHRyaWJ1dGVzKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIGxpbmVJdGVtIGlzIFxcJ1JpZ2h0cyBNYW5hZ2VkXFwnLCBidXQgaXQgZG9lcyBoYXZlIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c01hbmFnZWQgPSAnUmlnaHRzIE1hbmFnZWQnO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYXNBdHRyaWJ1dGVzID0gdHJ1ZTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubmVlZHNBdHRyaWJ1dGVzKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93TXVsdGlwbGllciBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW4gYWRtaW5pc3RlciBxdW90ZXMgYW5kIHRoZSBtdWx0aXBsaWVyIGlzIGdyZWF0ZXIgdGhhbiAxJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyA9IHRydWU7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm11bHRpcGxpZXIgPSAyO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93TXVsdGlwbGllcikudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhbm5vdCBhZG1pbmlzdGVyIHF1b3RlcycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSBmYWxzZTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd011bHRpcGxpZXIpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW4gYWRtaW5pc3RlciBxdW90ZXMsIGJ1dCB0aGUgbXVsdGlwbGllciBpcyBsZXNzIHRoYW4gMScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5tdWx0aXBsaWVyID0gMDtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd011bHRpcGxpZXIpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Zvcm1hdHRlZE11bHRpcGxpZXIgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdGhlIG11bHRpcGxpZXIgdHJ1bmNhdGVkIChOT1QgUk9VTkRFRCkgYXQgMiBkZWNpbWFsIHBsYWNlcycsICgpID0+IHtcbiAgICAgICAgaXQoJ2ZvciBhIHNtYWxsIG51bWJlcicsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubXVsdGlwbGllciA9IDguODc5NjU0MztcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybWF0dGVkTXVsdGlwbGllcikudG9FcXVhbCgnOC44NycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIGEgbGFyZ2UgbnVtYmVyJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5tdWx0aXBsaWVyID0gMTc1OC4xOTI0MTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybWF0dGVkTXVsdGlwbGllcikudG9FcXVhbCgnMTc1OC4xOScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIGEgbnVtYmVyIHdpdGggb25seSAxIGRlY2ltYWwgcG9pbnQnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm11bHRpcGxpZXIgPSA0LjE7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmZvcm1hdHRlZE11bHRpcGxpZXIpLnRvRXF1YWwoJzQuMScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIGEgbnVtYmVyIHdpdGggbm8gZGVjaW1hbCBwb2ludHMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm11bHRpcGxpZXIgPSA0O1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtYXR0ZWRNdWx0aXBsaWVyKS50b0VxdWFsKCc0Jyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0FkbWluUHJpY2UgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2FuIGFkbWluaXN0ZXIgcXVvdGVzLCBhbmQgdGhlIGxpbmVJdGVtIGRvZXNudCBuZWVkIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzID0gdHJ1ZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucmlnaHRzTWFuYWdlZCA9ICdSb3lhbHR5IEZyZWUnO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93QWRtaW5QcmljZSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhblxcJ3QgYWRtaW5pc3RlciBxdW90ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzID0gZmFsc2U7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dBZG1pblByaWNlKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhbiBhZG1pbmlzdGVyIHF1b3RlcywgYnV0IHRoZSBsaW5lSXRlbSBkb2VzIG5lZWQgYXR0cmlidXRlcycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yaWdodHNNYW5hZ2VkID0gJ1JpZ2h0cyBNYW5hZ2VkJztcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFzQXR0cmlidXRlcyA9IGZhbHNlO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93QWRtaW5QcmljZSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGlja1ByaWNlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgdGhlIGFkZEN1c3RvbVByaWNlIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QuYWRkQ3VzdG9tUHJpY2UsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNsaWNrUHJpY2UoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hZGRDdXN0b21QcmljZS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93UHJlRGlzY291bnRQcmljZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW4gYWRtaW5pc3RlciBxdW90ZXMgYW5kIHRoZSBncm9zc0Fzc2V0UHJpY2UgaXMgZGlmZmVyZW50IGZyb20gdGhlIHByaWNlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyA9IHRydWU7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lml0ZW1QcmljZSA9IDIwMC44OTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJpY2UgPSAyMDAuOTk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm92ZXJyaWRlR3Jvc3NBc3NldFByaWNlID0gbnVsbDtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dQcmVEaXNjb3VudFByaWNlKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2Fubm90IGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyA9IGZhbHNlO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93UHJlRGlzY291bnRQcmljZSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhbiBhZG1pbmlzdGVyIHF1b3RlcyBhbmQgdGhlIGdyb3NzQXNzZXRQcmljZSBpcyB0aGUgc2FtZSBhcyB0aGUgcHJpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzID0gdHJ1ZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaXRlbVByaWNlID0gMjAwLjg5O1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcmljZSA9IDIwMC44OTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub3ZlcnJpZGVHcm9zc0Fzc2V0UHJpY2UgPSAxMDAwO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd1ByZURpc2NvdW50UHJpY2UpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dBZG1pbk92ZXJpZGVQcmljZSBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB1c2VyIGNhbiBhZG1pbmlzdGVyIHF1b3RlcywgaXRzIG5vdCByZWFkb25seSBhbmQgdGhlIGxpbmVJdGVtIGhhcyBhbiBvdmVycmlkZUdyb3NzQXNzZXQgcHJpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzID0gdHJ1ZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucmVhZG9ubHkgPSBmYWxzZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub3ZlcnJpZGVHcm9zc0Fzc2V0UHJpY2UgPSAyMDA7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93QWRtaW5PdmVyaWRlUHJpY2UpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW5ub3QgYWRtaW5pc3RlciBxdW90ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzID0gZmFsc2U7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93QWRtaW5PdmVyaWRlUHJpY2UpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiBpdHMgbm90IHJlYWRvbmx5JywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyA9IHRydWU7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJlYWRvbmx5ID0gdHJ1ZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub3ZlcnJpZGVHcm9zc0Fzc2V0UHJpY2UgPSAyMDA7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93QWRtaW5PdmVyaWRlUHJpY2UpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGVyZSBpcyBubyBvdmVycmlkZSBwcmljZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yZWFkb25seSA9IGZhbHNlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vdmVycmlkZUdyb3NzQXNzZXRQcmljZSA9IG51bGw7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93QWRtaW5PdmVyaWRlUHJpY2UpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZFNob3dCYXNlUHJpY2UgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdXNlciBjYW4gYWRtaW5pc3RlciBxdW90ZXMgYW5kIGl0IGhhcyBhIG92ZXJyaWRlIHByaWNlIGFuZCB0aGUgYmFzZSBwcmljZSBkb2VzIG5vdCBlcXVhbCB0aGUgcHJpY2UgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzID0gdHJ1ZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJpY2UgPSAyMDA7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lml0ZW1QcmljZSA9IDEwMDtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub3ZlcnJpZGVHcm9zc0Fzc2V0UHJpY2UgPSAyMDA7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93QmFzZVByaWNlKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2Fubm90IGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyA9IGZhbHNlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcmljZSA9IDIwMDtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaXRlbVByaWNlID0gMTAwO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vdmVycmlkZUdyb3NzQXNzZXRQcmljZSA9IDIwMDtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dCYXNlUHJpY2UpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGVyZSBpcyBubyBvdmVycmlkZSBwcmljZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcmljZSA9IDIwMDtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaXRlbVByaWNlID0gMTAwO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vdmVycmlkZUdyb3NzQXNzZXRQcmljZSA9IG51bGw7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93QmFzZVByaWNlKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIGJhc2UgcHJpY2UgZXF1YWxzIHRoZSBwcmljZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcmljZSA9IDIwMDtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaXRlbVByaWNlID0gMjAwO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vdmVycmlkZUdyb3NzQXNzZXRQcmljZSA9IDMwMDtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dCYXNlUHJpY2UpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gIH0pO1xufVxuIl19
