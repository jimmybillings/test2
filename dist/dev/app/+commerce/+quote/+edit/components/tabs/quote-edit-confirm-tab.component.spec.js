"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../../../../store/spec-helpers/mock-app.store");
var quote_edit_confirm_tab_component_1 = require("./quote-edit-confirm-tab.component");
function main() {
    describe('Quote Edit Confirm Tab Component', function () {
        var componentUnderTest;
        var mockCapabilities;
        var mockStore;
        beforeEach(function () {
            mockCapabilities = {
                administerQuotes: function () { return false; }
            };
            mockStore = new mock_app_store_1.MockAppStore();
            componentUnderTest = new quote_edit_confirm_tab_component_1.QuoteEditConfirmTabComponent(mockCapabilities, mockStore);
        });
        describe('get sendDetails()', function () {
            it('Should return the current discount amount for the quote', function () {
                mockStore.createStateSection('quoteEdit', {
                    sendDetails: {
                        user: { accountName: 'CBS' },
                        salesManager: { expirationDate: '2017/12/01' }
                    }
                });
                var currentSendDetails = {};
                componentUnderTest.sendDetails.subscribe(function (sendDetails) { return currentSendDetails = sendDetails; });
                expect(currentSendDetails).toEqual({
                    user: { accountName: 'CBS' }, salesManager: { expirationDate: '2017/12/01' }
                });
            });
        });
        describe('sendQuote()', function () {
            it('displays a snackbar with the expected message', function () {
                var sendQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'sendQuote');
                componentUnderTest.sendQuote();
                expect(sendQuoteSpy).toHaveBeenCalled();
            });
        });
        describe('get discount()', function () {
            it('Should return the current discount amount for the quote', function () {
                mockStore.createStateSection('quoteEdit', { data: { discount: 10 } });
                var currentDiscount;
                componentUnderTest.discount.subscribe(function (discount) { return currentDiscount = discount; });
                expect(currentDiscount).toBe(10);
            });
        });
        describe('showDiscount()', function () {
            describe('returns false', function () {
                it('when the quote does not have the property', function () {
                    mockStore.createStateSection('quoteEdit', { data: {} });
                    expect(componentUnderTest.showDiscount).toBe(false);
                });
                it('when the quoteType is "Trial" and the quote DOES NOT have the property', function () {
                    mockStore.createStateSection('quoteEdit', { data: { purchaseType: 'Trial' } });
                    expect(componentUnderTest.showDiscount).toBe(false);
                });
                it('when the quoteType is "Trial" and the quote DOES have the property', function () {
                    mockStore.createStateSection('quoteEdit', { data: { discount: 100, purchaseType: 'Trial' } });
                    expect(componentUnderTest.showDiscount).toBe(false);
                });
            });
            describe('returns true', function () {
                it('when the quote does have the property AND the quoteType is NOT Trial', function () {
                    mockStore.createStateSection('quoteEdit', { data: { discount: 100, purchaseType: 'NotTrial' } });
                    expect(componentUnderTest.showDiscount).toBe(true);
                });
            });
        });
        describe('get subTotal()', function () {
            it('Should return the current subTotal dollar amount for the quote', function () {
                mockStore.createStateSection('quoteEdit', { data: { subTotal: 1254 } });
                var currentSubTotal;
                componentUnderTest.subTotal.subscribe(function (subTotal) { return currentSubTotal = subTotal; });
                expect(currentSubTotal).toBe(1254);
            });
        });
        describe('get total()', function () {
            it('Should return the current total dollar amount for the quote', function () {
                mockStore.createStateSection('quoteEdit', { data: { total: 1000 } });
                var currentTotal;
                componentUnderTest.total.subscribe(function (total) { return currentTotal = total; });
                expect(currentTotal).toBe(1000);
            });
        });
        describe('get showTotal()', function () {
            describe('returns false', function () {
                it('when the quote does not have a total value', function () {
                    mockStore.createStateSection('quoteEdit', { data: {} });
                    expect(componentUnderTest.showTotal).toBe(false);
                });
                it('when the quoteType is "Trial" and the quote does not have a total value', function () {
                    mockStore.createStateSection('quoteEdit', { data: { purchaseType: 'Trial' } });
                    expect(componentUnderTest.showTotal).toBe(false);
                });
                it('when the quoteType is "Trial" and the quote does have a total value', function () {
                    mockStore.createStateSection('quoteEdit', { data: { total: 100, purchaseType: 'Trial' } });
                    expect(componentUnderTest.showTotal).toBe(false);
                });
            });
            describe('returns true', function () {
                it('when the quote does have does have a total value AND the quoteType is NOT Trial', function () {
                    mockStore.createStateSection('quoteEdit', { data: { total: 100, purchaseType: 'NotTrial' } });
                    expect(componentUnderTest.showTotal).toBe(true);
                });
            });
        });
        describe('get quoteType()', function () {
            it('Should return the current purchaseType for the quote', function () {
                mockStore.createStateSection('quoteEdit', { data: { purchaseType: 'NotTrial' } });
                var currentPurchaseType;
                componentUnderTest.quoteType.subscribe(function (purchaseType) { return currentPurchaseType = purchaseType; });
                expect(currentPurchaseType).toBe('NotTrial');
            });
        });
        describe('get quoteTypeTranslationKey()', function () {
            it('Should return the translation key for the quote type', function () {
                mockStore.createStateSection('quoteEdit', { data: { purchaseType: 'NotTrial' } });
                var currentPurchaseType;
                componentUnderTest.quoteTypeTranslationKey.subscribe(function (purchaseType) { return currentPurchaseType = purchaseType; });
                expect(currentPurchaseType).toBe('QUOTE.NotTrial');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LWNvbmZpcm0tdGFiLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsbUZBQWdGO0FBQ2hGLHVGQUFrRjtBQUVsRjtJQUNFLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRTtRQUMzQyxJQUFJLGtCQUFnRCxDQUFDO1FBQ3JELElBQUksZ0JBQXFCLENBQUM7UUFDMUIsSUFBSSxTQUF1QixDQUFDO1FBRTVCLFVBQVUsQ0FBQztZQUNULGdCQUFnQixHQUFHO2dCQUNqQixnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsS0FBSyxFQUFMLENBQUs7YUFDOUIsQ0FBQztZQUNGLFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixrQkFBa0IsR0FBRyxJQUFJLCtEQUE0QixDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQyxDQUFDO1FBR0gsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLEVBQUUsQ0FBQyx5REFBeUQsRUFBRTtnQkFDNUQsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtvQkFDeEMsV0FBVyxFQUFFO3dCQUNYLElBQUksRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7d0JBQzVCLFlBQVksRUFBRSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUU7cUJBQy9DO2lCQUNGLENBQUMsQ0FBQztnQkFDSCxJQUFJLGtCQUFrQixHQUFTLEVBQUUsQ0FBQztnQkFDbEMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFdBQVcsSUFBSSxPQUFBLGtCQUFrQixHQUFHLFdBQVcsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO2dCQUMxRixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQ2pDLElBQUksRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVB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RUFBRSxDQUFDLENBQUM7Z0JBQ2xGLElBQUksbUJBQTJCLENBQUM7Z0JBQ2hDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQSxZQUFZLElBQUksT0FBQSxtQkFBbUIsR0FBRyxZQUFZLEVBQWxDLENBQWtDLENBQUMsQ0FBQztnQkFDM0YsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsK0JBQStCLEVBQUU7WUFDeEMsRUFBRSxDQUFDLHNEQUFzRCxFQUFFO2dCQUN6RCxTQUFTLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEYsSUFBSSxtQkFBMkIsQ0FBQztnQkFDaEMsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLFVBQUEsWUFBWSxJQUFJLE9BQUEsbUJBQW1CLEdBQUcsWUFBWSxFQUFsQyxDQUFrQyxDQUFDLENBQUM7Z0JBQ3pHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF4SUQsb0JBd0lDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LWNvbmZpcm0tdGFiLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgUXVvdGVFZGl0Q29uZmlybVRhYkNvbXBvbmVudCB9IGZyb20gJy4vcXVvdGUtZWRpdC1jb25maXJtLXRhYi5jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1F1b3RlIEVkaXQgQ29uZmlybSBUYWIgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFF1b3RlRWRpdENvbmZpcm1UYWJDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tDYXBhYmlsaXRpZXM6IGFueTtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tDYXBhYmlsaXRpZXMgPSB7XG4gICAgICAgIGFkbWluaXN0ZXJRdW90ZXM6ICgpID0+IGZhbHNlXG4gICAgICB9O1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFF1b3RlRWRpdENvbmZpcm1UYWJDb21wb25lbnQobW9ja0NhcGFiaWxpdGllcywgbW9ja1N0b3JlKTtcbiAgICB9KTtcblxuXG4gICAgZGVzY3JpYmUoJ2dldCBzZW5kRGV0YWlscygpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gdGhlIGN1cnJlbnQgZGlzY291bnQgYW1vdW50IGZvciB0aGUgcXVvdGUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHtcbiAgICAgICAgICBzZW5kRGV0YWlsczoge1xuICAgICAgICAgICAgdXNlcjogeyBhY2NvdW50TmFtZTogJ0NCUycgfSxcbiAgICAgICAgICAgIHNhbGVzTWFuYWdlcjogeyBleHBpcmF0aW9uRGF0ZTogJzIwMTcvMTIvMDEnIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgY3VycmVudFNlbmREZXRhaWxzOiBQb2pvID0ge307XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zZW5kRGV0YWlscy5zdWJzY3JpYmUoc2VuZERldGFpbHMgPT4gY3VycmVudFNlbmREZXRhaWxzID0gc2VuZERldGFpbHMpO1xuICAgICAgICBleHBlY3QoY3VycmVudFNlbmREZXRhaWxzKS50b0VxdWFsKHtcbiAgICAgICAgICB1c2VyOiB7IGFjY291bnROYW1lOiAnQ0JTJyB9LCBzYWxlc01hbmFnZXI6IHsgZXhwaXJhdGlvbkRhdGU6ICcyMDE3LzEyLzAxJyB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2VuZFF1b3RlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZGlzcGxheXMgYSBzbmFja2JhciB3aXRoIHRoZSBleHBlY3RlZCBtZXNzYWdlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzZW5kUXVvdGVTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncXVvdGVFZGl0JywgJ3NlbmRRdW90ZScpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VuZFF1b3RlKCk7XG4gICAgICAgIGV4cGVjdChzZW5kUXVvdGVTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBkaXNjb3VudCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gdGhlIGN1cnJlbnQgZGlzY291bnQgYW1vdW50IGZvciB0aGUgcXVvdGUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YTogeyBkaXNjb3VudDogMTAgfSB9KTtcbiAgICAgICAgbGV0IGN1cnJlbnREaXNjb3VudDogbnVtYmVyO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZGlzY291bnQuc3Vic2NyaWJlKGRpc2NvdW50ID0+IGN1cnJlbnREaXNjb3VudCA9IGRpc2NvdW50KTtcbiAgICAgICAgZXhwZWN0KGN1cnJlbnREaXNjb3VudCkudG9CZSgxMCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93RGlzY291bnQoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgcXVvdGUgZG9lcyBub3QgaGF2ZSB0aGUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7fSB9KTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dEaXNjb3VudCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZVR5cGUgaXMgXCJUcmlhbFwiIGFuZCB0aGUgcXVvdGUgRE9FUyBOT1QgaGF2ZSB0aGUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IHB1cmNoYXNlVHlwZTogJ1RyaWFsJyB9IH0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd0Rpc2NvdW50KS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIHF1b3RlVHlwZSBpcyBcIlRyaWFsXCIgYW5kIHRoZSBxdW90ZSBET0VTIGhhdmUgdGhlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YTogeyBkaXNjb3VudDogMTAwLCBwdXJjaGFzZVR5cGU6ICdUcmlhbCcgfSB9KTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dEaXNjb3VudCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZSBkb2VzIGhhdmUgdGhlIHByb3BlcnR5IEFORCB0aGUgcXVvdGVUeXBlIGlzIE5PVCBUcmlhbCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHsgZGlzY291bnQ6IDEwMCwgcHVyY2hhc2VUeXBlOiAnTm90VHJpYWwnIH0gfSk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93RGlzY291bnQpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHN1YlRvdGFsKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIHJldHVybiB0aGUgY3VycmVudCBzdWJUb3RhbCBkb2xsYXIgYW1vdW50IGZvciB0aGUgcXVvdGUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YTogeyBzdWJUb3RhbDogMTI1NCB9IH0pO1xuICAgICAgICBsZXQgY3VycmVudFN1YlRvdGFsOiBudW1iZXI7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zdWJUb3RhbC5zdWJzY3JpYmUoc3ViVG90YWwgPT4gY3VycmVudFN1YlRvdGFsID0gc3ViVG90YWwpO1xuICAgICAgICBleHBlY3QoY3VycmVudFN1YlRvdGFsKS50b0JlKDEyNTQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHRvdGFsKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIHJldHVybiB0aGUgY3VycmVudCB0b3RhbCBkb2xsYXIgYW1vdW50IGZvciB0aGUgcXVvdGUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YTogeyB0b3RhbDogMTAwMCB9IH0pO1xuICAgICAgICBsZXQgY3VycmVudFRvdGFsOiBudW1iZXI7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50b3RhbC5zdWJzY3JpYmUodG90YWwgPT4gY3VycmVudFRvdGFsID0gdG90YWwpO1xuICAgICAgICBleHBlY3QoY3VycmVudFRvdGFsKS50b0JlKDEwMDApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHNob3dUb3RhbCgpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZSBkb2VzIG5vdCBoYXZlIGEgdG90YWwgdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7fSB9KTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dUb3RhbCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZVR5cGUgaXMgXCJUcmlhbFwiIGFuZCB0aGUgcXVvdGUgZG9lcyBub3QgaGF2ZSBhIHRvdGFsIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YTogeyBwdXJjaGFzZVR5cGU6ICdUcmlhbCcgfSB9KTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dUb3RhbCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZVR5cGUgaXMgXCJUcmlhbFwiIGFuZCB0aGUgcXVvdGUgZG9lcyBoYXZlIGEgdG90YWwgdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IHRvdGFsOiAxMDAsIHB1cmNoYXNlVHlwZTogJ1RyaWFsJyB9IH0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd1RvdGFsKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHF1b3RlIGRvZXMgaGF2ZSBkb2VzIGhhdmUgYSB0b3RhbCB2YWx1ZSBBTkQgdGhlIHF1b3RlVHlwZSBpcyBOT1QgVHJpYWwnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IHRvdGFsOiAxMDAsIHB1cmNoYXNlVHlwZTogJ05vdFRyaWFsJyB9IH0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd1RvdGFsKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBxdW90ZVR5cGUoKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIHRoZSBjdXJyZW50IHB1cmNoYXNlVHlwZSBmb3IgdGhlIHF1b3RlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHsgcHVyY2hhc2VUeXBlOiAnTm90VHJpYWwnIH0gfSk7XG4gICAgICAgIGxldCBjdXJyZW50UHVyY2hhc2VUeXBlOiBzdHJpbmc7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5xdW90ZVR5cGUuc3Vic2NyaWJlKHB1cmNoYXNlVHlwZSA9PiBjdXJyZW50UHVyY2hhc2VUeXBlID0gcHVyY2hhc2VUeXBlKTtcbiAgICAgICAgZXhwZWN0KGN1cnJlbnRQdXJjaGFzZVR5cGUpLnRvQmUoJ05vdFRyaWFsJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgcXVvdGVUeXBlVHJhbnNsYXRpb25LZXkoKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIHRoZSB0cmFuc2xhdGlvbiBrZXkgZm9yIHRoZSBxdW90ZSB0eXBlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHsgcHVyY2hhc2VUeXBlOiAnTm90VHJpYWwnIH0gfSk7XG4gICAgICAgIGxldCBjdXJyZW50UHVyY2hhc2VUeXBlOiBzdHJpbmc7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5xdW90ZVR5cGVUcmFuc2xhdGlvbktleS5zdWJzY3JpYmUocHVyY2hhc2VUeXBlID0+IGN1cnJlbnRQdXJjaGFzZVR5cGUgPSBwdXJjaGFzZVR5cGUpO1xuICAgICAgICBleHBlY3QoY3VycmVudFB1cmNoYXNlVHlwZSkudG9CZSgnUVVPVEUuTm90VHJpYWwnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
