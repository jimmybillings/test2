"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commerce_list_component_1 = require("./commerce-list.component");
function main() {
    describe('Commerce List Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new commerce_list_component_1.CommerceListComponent();
        });
        describe('shouldShowSetFocusedButton', function () {
            it('Should return true if all conditions are met', function () {
                componentUnderTest.type = 'QUOTE';
                componentUnderTest.userCanAdministerQuotes = true;
                expect(componentUnderTest.shouldShowSetFocusedButton({ quoteStatus: 'PENDING' })).toBe(true);
            });
            it('Should return false if the type is order', function () {
                componentUnderTest.type = 'ORDER';
                componentUnderTest.userCanAdministerQuotes = true;
                expect(componentUnderTest.shouldShowSetFocusedButton({ quoteStatus: 'PENDING' })).toBe(false);
            });
            it('Should return false if the user doesnt have permission', function () {
                componentUnderTest.type = 'QUOTE';
                componentUnderTest.userCanAdministerQuotes = false;
                expect(componentUnderTest.shouldShowSetFocusedButton({ quoteStatus: 'PENDING' })).toBe(false);
            });
            it('Should return false if the quote is not pending', function () {
                componentUnderTest.type = 'QUOTE';
                componentUnderTest.userCanAdministerQuotes = true;
                expect(componentUnderTest.shouldShowSetFocusedButton({ quoteStatus: 'notpending' })).toBe(false);
            });
        });
        describe('shouldShowEditQuoteButton', function () {
            it('Should return true if all conditions are met', function () {
                componentUnderTest.type = 'QUOTE';
                componentUnderTest.userCanAdministerQuotes = true;
                expect(componentUnderTest.shouldShowEditQuoteButton({ quoteStatus: 'PENDING' })).toBe(true);
            });
            it('Should return false if the type is order', function () {
                componentUnderTest.type = 'ORDER';
                componentUnderTest.userCanAdministerQuotes = true;
                expect(componentUnderTest.shouldShowEditQuoteButton({ quoteStatus: 'PENDING' })).toBe(false);
            });
            it('Should return false if the user doesnt have permission', function () {
                componentUnderTest.type = 'QUOTE';
                componentUnderTest.userCanAdministerQuotes = false;
                expect(componentUnderTest.shouldShowEditQuoteButton({ quoteStatus: 'PENDING' })).toBe(false);
            });
            it('Should return false if the quote is not pending', function () {
                componentUnderTest.type = 'QUOTE';
                componentUnderTest.userCanAdministerQuotes = true;
                expect(componentUnderTest.shouldShowEditQuoteButton({ quoteStatus: 'notpending' })).toBe(false);
            });
        });
        describe('shouldShowViewQuoteButton', function () {
            it('should return true if all conditions are met', function () {
                componentUnderTest.type = 'QUOTE';
                expect(componentUnderTest.shouldShowViewQuoteButton({ quoteStatus: 'notpending' })).toBe(true);
            });
            it('should return false if the type is order', function () {
                componentUnderTest.type = 'ORDER';
                expect(componentUnderTest.shouldShowViewQuoteButton({ quoteStatus: 'notpending' })).toBe(false);
            });
            it('should return false if quote is pending', function () {
                componentUnderTest.type = 'QUOTE';
                expect(componentUnderTest.shouldShowViewQuoteButton({ quoteStatus: 'PENDING' })).toBe(false);
            });
        });
        describe('shouldShowRefundIndicatorFor()', function () {
            describe('should return false', function () {
                it('if the type is not "ORDER"', function () {
                    componentUnderTest.type = 'QUOTE';
                    expect(componentUnderTest.shouldShowRefundIndicatorFor({})).toBe(false);
                });
                it('if the order does not have a creditMemoForOrderId field', function () {
                    componentUnderTest.type = 'ORDER';
                    expect(componentUnderTest.shouldShowRefundIndicatorFor({})).toBe(false);
                });
            });
            describe('should return true', function () {
                it('if the type is "ORDER" and the order has a creditMemoForOrderId field', function () {
                    componentUnderTest.type = 'ORDER';
                    expect(componentUnderTest.shouldShowRefundIndicatorFor({ creditMemoForOrderId: 12345 })).toBe(true);
                });
            });
        });
        describe('shouldShowPaymentBalanceFor()', function () {
            it('returns true if the order is of type ORDER and has a paymentBalance and a paymentDueDate', function () {
                componentUnderTest.type = 'ORDER';
                expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345, paymentDueDate: 'test date' })).toBe(true);
            });
            it('returns false if the order is not of type ORDER but does have both a paymentBalance and a paymentDueDate', function () {
                componentUnderTest.type = 'QUOTE';
                expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345, paymentDueDate: 'test date' })).toBe(false);
            });
            it('returns false if the order is of type ORDER but does not have both a paymentBalance and a paymentDueDate', function () {
                componentUnderTest.type = 'ORDER';
                expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345 })).toBe(false);
            });
            it('returns false if the order is of type ORDER but paymentBalance is less than zero and it has a paymentDueDate', function () {
                componentUnderTest.type = 'ORDER';
                expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: -123, paymentDueDate: 'test date' })).toBe(false);
            });
        });
        describe('shouldShowViewOrderButton()', function () {
            it('should return true if the type is order', function () {
                componentUnderTest.type = 'ORDER';
                expect(componentUnderTest.shouldShowViewOrderButton).toBe(true);
            });
            it('should return false if the type is quote', function () {
                componentUnderTest.type = 'QUOTE';
                expect(componentUnderTest.shouldShowViewOrderButton).toBe(false);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9jb21tZXJjZS1saXN0L2NvbW1lcmNlLWxpc3QuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRUFBa0U7QUFFbEU7SUFDRSxRQUFRLENBQUMseUJBQXlCLEVBQUU7UUFDbEMsSUFBSSxrQkFBeUMsQ0FBQztRQUU5QyxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLCtDQUFxQixFQUFFLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsNEJBQTRCLEVBQUU7WUFDckMsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO2dCQUNqRCxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUNsQyxrQkFBa0IsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7Z0JBQ2xELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RHLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDBDQUEwQyxFQUFFO2dCQUM3QyxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUNsQyxrQkFBa0IsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7Z0JBQ2xELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZHLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO2dCQUMzRCxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUNsQyxrQkFBa0IsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7Z0JBQ25ELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyww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a0JBQWtCLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDbEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDBDQUEwQyxFQUFFO2dCQUM3QyxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUNsQyxNQUFNLENBQUMsa0JBQWtCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBJRCxvQkFvSUM7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9jb21tZXJjZS1saXN0L2NvbW1lcmNlLWxpc3QuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tZXJjZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbW1lcmNlLWxpc3QuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDb21tZXJjZSBMaXN0IENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBDb21tZXJjZUxpc3RDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDb21tZXJjZUxpc3RDb21wb25lbnQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93U2V0Rm9jdXNlZEJ1dHRvbicsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIHRydWUgaWYgYWxsIGNvbmRpdGlvbnMgYXJlIG1ldCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnUVVPVEUnO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dTZXRGb2N1c2VkQnV0dG9uKHsgcXVvdGVTdGF0dXM6ICdQRU5ESU5HJyB9IGFzIGFueSkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIHR5cGUgaXMgb3JkZXInLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50eXBlID0gJ09SREVSJztcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzID0gdHJ1ZTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93U2V0Rm9jdXNlZEJ1dHRvbih7IHF1b3RlU3RhdHVzOiAnUEVORElORycgfSBhcyBhbnkpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgdXNlciBkb2VzbnQgaGF2ZSBwZXJtaXNzaW9uJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdRVU9URSc7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyA9IGZhbHNlO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dTZXRGb2N1c2VkQnV0dG9uKHsgcXVvdGVTdGF0dXM6ICdQRU5ESU5HJyB9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBxdW90ZSBpcyBub3QgcGVuZGluZycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnUVVPVEUnO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dTZXRGb2N1c2VkQnV0dG9uKHsgcXVvdGVTdGF0dXM6ICdub3RwZW5kaW5nJyB9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdWxkU2hvd0VkaXRRdW90ZUJ1dHRvbicsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIHRydWUgaWYgYWxsIGNvbmRpdGlvbnMgYXJlIG1ldCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnUVVPVEUnO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dFZGl0UXVvdGVCdXR0b24oeyBxdW90ZVN0YXR1czogJ1BFTkRJTkcnIH0gYXMgYW55KSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgdHlwZSBpcyBvcmRlcicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnT1JERVInO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dFZGl0UXVvdGVCdXR0b24oeyBxdW90ZVN0YXR1czogJ1BFTkRJTkcnIH0gYXMgYW55KSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIHVzZXIgZG9lc250IGhhdmUgcGVybWlzc2lvbicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnUVVPVEUnO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSBmYWxzZTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93RWRpdFF1b3RlQnV0dG9uKHsgcXVvdGVTdGF0dXM6ICdQRU5ESU5HJyB9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBxdW90ZSBpcyBub3QgcGVuZGluZycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnUVVPVEUnO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgPSB0cnVlO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dFZGl0UXVvdGVCdXR0b24oeyBxdW90ZVN0YXR1czogJ25vdHBlbmRpbmcnIH0gYXMgYW55KSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93Vmlld1F1b3RlQnV0dG9uJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBhbGwgY29uZGl0aW9ucyBhcmUgbWV0JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdRVU9URSc7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd1ZpZXdRdW90ZUJ1dHRvbih7IHF1b3RlU3RhdHVzOiAnbm90cGVuZGluZycgfSBhcyBhbnkpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSB0eXBlIGlzIG9yZGVyJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdPUkRFUic7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd1ZpZXdRdW90ZUJ1dHRvbih7IHF1b3RlU3RhdHVzOiAnbm90cGVuZGluZycgfSBhcyBhbnkpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBxdW90ZSBpcyBwZW5kaW5nJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdRVU9URSc7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd1ZpZXdRdW90ZUJ1dHRvbih7IHF1b3RlU3RhdHVzOiAnUEVORElORycgfSBhcyBhbnkpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZFNob3dSZWZ1bmRJbmRpY2F0b3JGb3IoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnaWYgdGhlIHR5cGUgaXMgbm90IFwiT1JERVJcIicsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdRVU9URSc7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UmVmdW5kSW5kaWNhdG9yRm9yKHt9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaWYgdGhlIG9yZGVyIGRvZXMgbm90IGhhdmUgYSBjcmVkaXRNZW1vRm9yT3JkZXJJZCBmaWVsZCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdPUkRFUic7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UmVmdW5kSW5kaWNhdG9yRm9yKHt9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnc2hvdWxkIHJldHVybiB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnaWYgdGhlIHR5cGUgaXMgXCJPUkRFUlwiIGFuZCB0aGUgb3JkZXIgaGFzIGEgY3JlZGl0TWVtb0Zvck9yZGVySWQgZmllbGQnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnT1JERVInO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd1JlZnVuZEluZGljYXRvckZvcih7IGNyZWRpdE1lbW9Gb3JPcmRlcklkOiAxMjM0NSB9IGFzIGFueSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdWxkU2hvd1BheW1lbnRCYWxhbmNlRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBvcmRlciBpcyBvZiB0eXBlIE9SREVSIGFuZCBoYXMgYSBwYXltZW50QmFsYW5jZSBhbmQgYSBwYXltZW50RHVlRGF0ZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnT1JERVInO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dQYXltZW50QmFsYW5jZUZvcih7IHBheW1lbnRCYWxhbmNlOiAxMjM0NSwgcGF5bWVudER1ZURhdGU6ICd0ZXN0IGRhdGUnIH0gYXMgYW55KSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgb3JkZXIgaXMgbm90IG9mIHR5cGUgT1JERVIgYnV0IGRvZXMgaGF2ZSBib3RoIGEgcGF5bWVudEJhbGFuY2UgYW5kIGEgcGF5bWVudER1ZURhdGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50eXBlID0gJ1FVT1RFJztcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UGF5bWVudEJhbGFuY2VGb3IoeyBwYXltZW50QmFsYW5jZTogMTIzNDUsIHBheW1lbnREdWVEYXRlOiAndGVzdCBkYXRlJyB9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBvcmRlciBpcyBvZiB0eXBlIE9SREVSIGJ1dCBkb2VzIG5vdCBoYXZlIGJvdGggYSBwYXltZW50QmFsYW5jZSBhbmQgYSBwYXltZW50RHVlRGF0ZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnT1JERVInO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dQYXltZW50QmFsYW5jZUZvcih7IHBheW1lbnRCYWxhbmNlOiAxMjM0NSB9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBvcmRlciBpcyBvZiB0eXBlIE9SREVSIGJ1dCBwYXltZW50QmFsYW5jZSBpcyBsZXNzIHRoYW4gemVybyBhbmQgaXQgaGFzIGEgcGF5bWVudER1ZURhdGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50eXBlID0gJ09SREVSJztcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UGF5bWVudEJhbGFuY2VGb3IoeyBwYXltZW50QmFsYW5jZTogLTEyMywgcGF5bWVudER1ZURhdGU6ICd0ZXN0IGRhdGUnIH0gYXMgYW55KSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93Vmlld09yZGVyQnV0dG9uKCknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSB0eXBlIGlzIG9yZGVyJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudHlwZSA9ICdPUkRFUic7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd1ZpZXdPcmRlckJ1dHRvbikudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgdHlwZSBpcyBxdW90ZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnR5cGUgPSAnUVVPVEUnO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dWaWV3T3JkZXJCdXR0b24pLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuIl19
