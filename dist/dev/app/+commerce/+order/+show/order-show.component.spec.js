"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_show_component_1 = require("./order-show.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Order Show Component', function () {
        var componentUnderTest;
        var mockAppStore;
        var mockOrderService;
        var mockWindow;
        var mockOrder;
        beforeEach(function () {
            mockWindow = {
                nativeWindow: {
                    location: { href: '' }
                }
            };
            mockAppStore = new mock_app_store_1.MockAppStore();
            componentUnderTest = new order_show_component_1.OrderShowComponent(mockWindow, mockAppStore);
        });
        describe('orderObservable property', function () {
            it('represents the store\'s active order', function () {
                mockAppStore.createStateElement('order', 'activeOrder', { some: 'order', projects: [] });
                componentUnderTest = new order_show_component_1.OrderShowComponent(mockWindow, mockAppStore);
                var currentOrder;
                componentUnderTest.orderObservable.subscribe(function (order) { return currentOrder = order; });
                expect(currentOrder).toEqual({ some: 'order', projects: [] });
            });
            it('contains enhanced assets', function () {
                mockAppStore.createStateElement('order', 'activeOrder', {
                    some: 'order',
                    id: 42,
                    projects: [{ lineItems: [{ asset: {} }] }]
                });
                new order_show_component_1.OrderShowComponent(mockWindow, mockAppStore).orderObservable.subscribe(function (order) {
                    var asset = order.projects[0].lineItems[0].asset;
                    expect(asset.type).toEqual('order');
                    expect(asset.parentId).toEqual(42);
                });
            });
        });
        describe('download()', function () {
            it('changes the window\'s location', function () {
                componentUnderTest.download('https://this-is-a-url.com');
                expect(mockWindow.nativeWindow.location.href).toBe('https://this-is-a-url.com');
            });
        });
        describe('assetCountLabelKeyFor()', function () {
            it('returns pluralized translatable string based on asset count. If count is 0 return no assets', function () {
                expect(componentUnderTest.assetCountLabelKeyFor(0)).toBe('ORDER.SHOW.PROJECTS.NO_ASSETS');
            });
            it('returns 1 asset if asset count is 1', function () {
                expect(componentUnderTest.assetCountLabelKeyFor(1)).toBe('ORDER.SHOW.PROJECTS.ONLY_ONE_ASSET');
            });
            it('returns x assets if asset count is more than 1', function () {
                expect(componentUnderTest.assetCountLabelKeyFor(20)).toBe('ORDER.SHOW.PROJECTS.MORE_THAN_ONE_ASSET');
            });
        });
        describe('isRefundedLineItem()', function () {
            it('returns false if the price is > 0', function () {
                expect(componentUnderTest.isRefundedLineItem({ price: 100 })).toBe(false);
            });
            it('returns true if the price is < 0', function () {
                expect(componentUnderTest.isRefundedLineItem({ price: -100 })).toBe(true);
            });
        });
        describe('isRefundedProject()', function () {
            it('returns false if there is no creditMemoForProjectId', function () {
                expect(componentUnderTest.isRefundedProject({})).toBe(false);
            });
            it('returns true if there is a creditMemoForProjectId', function () {
                expect(componentUnderTest.isRefundedProject({ creditMemoForProjectId: 12345 })).toBe(true);
            });
        });
        describe('isRefundedOrder()', function () {
            it('returns true if the order has a corresponding credit memo', function () {
                expect(componentUnderTest.isRefundedOrder({ creditMemoForOrderId: 12345 })).toBe(true);
            });
            it('returns false if the order doesn\'t have a corresponding credit memo', function () {
                expect(componentUnderTest.isRefundedOrder({})).toBe(false);
            });
        });
        describe('shouldShowPaymentBalanceFor()', function () {
            it('returns true if the order has a paymentBalance and a paymentDueDate', function () {
                expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345, paymentDueDate: 'test date' })).toBe(true);
            });
            it('returns false if the order doesn\'t have both a paymentBalance and a paymentDueDate', function () {
                expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345 })).toBe(false);
            });
            it('returns false if the order has a paymentBalance and a paymentDueDate, but paymentBalance less than zero', function () {
                expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: -123, paymentDueDate: 'test date' }))
                    .toBe(false);
            });
        });
        describe('shouldShowDiscountFor()', function () {
            it('returns true if the order has a discount value greater than zero', function () {
                expect(componentUnderTest.shouldShowDiscountFor({ discount: 16 })).toBe(true);
            });
            it('returns false if the order has a discount value of zero', function () {
                expect(componentUnderTest.shouldShowDiscountFor({ discount: 0 })).toBe(false);
            });
            it('returns false if the order has a discount value greater than zero, but is a refund', function () {
                expect(componentUnderTest.shouldShowDiscountFor({ discount: 16, creditMemoForOrderId: 12345 })).toBe(false);
            });
            it('returns false if the order has a no discount value', function () {
                expect(componentUnderTest.shouldShowDiscountFor({})).toBe(false);
            });
        });
        describe('offlineAgreementIds getter', function () {
            describe('should return any externalAgreementIds from the quote\'s lineItems', function () {
                it('for 1 lineItem in 1 project', function () {
                    mockOrder = { projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }] }] };
                    expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123');
                });
                it('for 1 lineItem in many projects', function () {
                    mockOrder = {
                        projects: [
                            { lineItems: [{ externalAgreementIds: ['abc-123'] }] },
                            { lineItems: [{ externalAgreementIds: ['def-456'] }] }
                        ]
                    };
                    expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123, def-456');
                });
                it('for many lineItems in 1 project', function () {
                    mockOrder = {
                        projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['def-456'] }] }]
                    };
                    expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123, def-456');
                });
                it('for many lineItems in many projects', function () {
                    mockOrder = {
                        projects: [
                            { lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['def-456'] }] },
                            { lineItems: [{ externalAgreementIds: ['fgh-789'] }, { externalAgreementIds: ['ijk-012'] }] }
                        ]
                    };
                    expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123, def-456, fgh-789, ijk-012');
                });
                it('with duplicate identifiers', function () {
                    mockOrder = {
                        projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['abc-123'] }] }]
                    };
                    expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123');
                });
                it('with no identifiers', function () {
                    mockOrder = {
                        projects: [{ lineItems: [{ some: 'lineItem' }, { some: 'lineItem' }] }]
                    };
                    expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('');
                });
            });
        });
        describe('shouldDisplayRights()', function () {
            it('returns true when the line item is rights managed and order type is NOT a Trial', function () {
                var lineItem = { rightsManaged: 'Rights Managed' };
                mockOrder = {
                    orderType: 'Not Trial'
                };
                expect(componentUnderTest.shouldDisplayRights(lineItem, mockOrder))
                    .toBe(true);
            });
            it('returns false when the line item is royalty-free', function () {
                var lineItem = { rightsManaged: 'Royalty Free' };
                mockOrder = {
                    orderType: 'Trial'
                };
                expect(componentUnderTest.shouldDisplayRights(lineItem, mockOrder))
                    .toBe(false);
            });
            it('returns false when the order type is a Trial', function () {
                var lineItem = { rightsManaged: 'Rights Managed' };
                mockOrder = {
                    orderType: 'Trial'
                };
                expect(componentUnderTest.shouldDisplayRights(lineItem, mockOrder))
                    .toBe(false);
            });
        });
        describe('showDownloadButtonFor()', function () {
            describe('returns true', function () {
                it('when the asset on the lineItem has a downloadUrl', function () {
                    expect(componentUnderTest.showDownloadButtonFor({ downloadUrl: 'some-url' })).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the asset on the lineItem does not have a downloadUrl', function () {
                    expect(componentUnderTest.showDownloadButtonFor({ downloadUrl: null })).toBe(false);
                });
                it('when the asset on the lineItem has a transcode status of \'Failed\'', function () {
                    expect(componentUnderTest.showDownloadButtonFor({ downloadUrl: 'some-url', transcodeStatus: 'Failed' })).toBe(false);
                });
            });
        });
        describe('showSpinnerIcon()', function () {
            describe('returns true', function () {
                it('when the asset on the lineItem has a transcode status of \'Submitted\'', function () {
                    expect(componentUnderTest.showSpinnerIcon({ transcodeStatus: 'Submitted' })).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the asset on the lineItem has a transcode status of something other than \'Submitted\'', function () {
                    expect(componentUnderTest.showSpinnerIcon({ transcodeStatus: 'Failed' })).toBe(false);
                });
                it('when the asset on the lineItem has a transcode status is undefined', function () {
                    expect(componentUnderTest.showSpinnerIcon({ transcodeStatus: undefined })).toBe(false);
                });
            });
        });
        describe('nothingToDownload()', function () {
            describe('returns true', function () {
                it('when the asset on the lineItem does not have a downloadUrl and transcodeStatus is  \'Completed\'', function () {
                    expect(componentUnderTest.nothingToDownload({ transcodeStatus: 'Completed' })).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the asset on the lineItem does not have a downloadUrl and the transcodeStatus is any but \'Completed\'', function () {
                    expect(componentUnderTest.nothingToDownload({ transcodeStatus: 'Failed', downloadUrl: null })).toBe(false);
                });
                it('when the asset on the lineItem has a downloadUrl and the transcodeStatus is \'Completed\'', function () {
                    expect(componentUnderTest.nothingToDownload({ transcodeStatus: 'Completed', downloadUrl: 'some-url.mov' })).toBe(false);
                });
            });
        });
        describe('showAsperaButtonFor()', function () {
            describe('returns true', function () {
                it('when the transcode status on the lineItem is \'Completed\' and there is an asperaSpec', function () {
                    expect(componentUnderTest.showAsperaButtonFor({ transcodeStatus: 'Completed', asperaSpec: 'some-spec' })).toBe(true);
                });
            });
            describe('returns false', function () {
                it('if the transcode status is not \'Completed\'', function () {
                    expect(componentUnderTest.showAsperaButtonFor({ transcodeStatus: 'Submitted' })).toBe(false);
                });
                it('if the transcode status is \'Completed\', but there is no asperaSpec', function () {
                    expect(componentUnderTest.showAsperaButtonFor({ transcodeStatus: 'Completed' })).toBe(false);
                });
            });
        });
        describe('iconForNotesButton()', function () {
            it('returns \'keyboard_arrow_down\' when the note is not visble', function () {
                var mockLineItem = { id: 'abc' };
                expect(componentUnderTest.iconForNotesButton(mockLineItem)).toBe('keyboard_arrow_down');
            });
            it('returns \'keyboard_arrow_up\' when the note is visble', function () {
                var mockLineItem = { id: 'abc' };
                componentUnderTest.toggleNotesVisibilityFor(mockLineItem);
                expect(componentUnderTest.iconForNotesButton(mockLineItem)).toBe('keyboard_arrow_up');
            });
        });
        describe('toggleNotesVisibilityFor()', function () {
            it('toggles the boolean for the given lineItem', function () {
                var mockLineItem = { id: 'xyz-789', notes: [{ notes: ['a note'] }] };
                expect(componentUnderTest.noteVisibilityMap[mockLineItem.id]).toBeFalsy();
                componentUnderTest.toggleNotesVisibilityFor(mockLineItem);
                expect(componentUnderTest.noteVisibilityMap[mockLineItem.id]).toBe(true);
                componentUnderTest.toggleNotesVisibilityFor(mockLineItem);
                expect(componentUnderTest.noteVisibilityMap[mockLineItem.id]).toBe(false);
            });
        });
        describe('hasNotes()', function () {
            describe('returns true', function () {
                it('when the lineItem has at least 1 note', function () {
                    expect(componentUnderTest.hasNotes({ notes: [{ notes: ['a note'] }] })).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the lineItem does not have a note', function () {
                    expect(componentUnderTest.hasNotes({ notes: [{ notes: [] }] })).toBe(false);
                });
                it('when the lineItem does not have a notes property in the notes', function () {
                    expect(componentUnderTest.hasNotes({ notes: [{}] })).toBe(false);
                });
                it('when the notes property on the lineItem is empty', function () {
                    expect(componentUnderTest.hasNotes({ notes: [] })).toBe(false);
                });
                it('when there is no notes property on the lineItem', function () {
                    expect(componentUnderTest.hasNotes({})).toBe(false);
                });
            });
        });
        describe('shouldShowNoteFor()', function () {
            describe('returns true', function () {
                it('when the lineItem has notes and the toggle is true', function () {
                    var mockLineItem = { id: 'abc-123', notes: [{ notes: ['a note'] }] };
                    componentUnderTest.toggleNotesVisibilityFor(mockLineItem);
                    expect(componentUnderTest.shouldShowNoteFor(mockLineItem)).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the lineItem doesn\'t have notes', function () {
                    var mockLineItem = { id: 'def-456' };
                    expect(componentUnderTest.shouldShowNoteFor(mockLineItem)).toBe(false);
                });
                it('when the lineItem does have notes, but the toggle is false', function () {
                    var mockLineItem = { id: 'abc-123', notes: [{ notes: ['a note'] }] };
                    expect(componentUnderTest.shouldShowNoteFor(mockLineItem)).toBe(false);
                });
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyLytzaG93L29yZGVyLXNob3cuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwrREFBNEQ7QUFDNUQsNkVBQTBFO0FBRTFFO0lBQ0UsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLElBQUksa0JBQXNDLENBQUM7UUFDM0MsSUFBSSxZQUEwQixDQUFDO1FBQy9CLElBQUksZ0JBQXFCLENBQUM7UUFDMUIsSUFBSSxVQUFlLENBQUM7UUFDcEIsSUFBSSxTQUFjLENBQUM7UUFFbkIsVUFBVSxDQUFDO1lBQ1QsVUFBVSxHQUFHO2dCQUNYLFlBQVksRUFBRTtvQkFDWixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO2lCQUN2QjthQUNGLENBQUM7WUFFRixZQUFZLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDbEMsa0JBQWtCLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsMEJBQTBCLEVBQUU7WUFDbkMsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO2dCQUN6QyxZQUFZLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3pGLGtCQUFrQixHQUFHLElBQUkseUNBQWtCLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLFlBQVksQ0FBQztnQkFDakIsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLFlBQVksR0FBRyxLQUFLLEVBQXBCLENBQW9CLENBQUMsQ0FBQztnQkFDNUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVB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QUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdldELG9CQXVXQztBQUFBLENBQUMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rb3JkZXIvK3Nob3cvb3JkZXItc2hvdy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBPcmRlclNob3dDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLXNob3cuY29tcG9uZW50JztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnT3JkZXIgU2hvdyBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogT3JkZXJTaG93Q29tcG9uZW50O1xuICAgIGxldCBtb2NrQXBwU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgbW9ja09yZGVyU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrV2luZG93OiBhbnk7XG4gICAgbGV0IG1vY2tPcmRlcjogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrV2luZG93ID0ge1xuICAgICAgICBuYXRpdmVXaW5kb3c6IHtcbiAgICAgICAgICBsb2NhdGlvbjogeyBocmVmOiAnJyB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIG1vY2tBcHBTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBPcmRlclNob3dDb21wb25lbnQobW9ja1dpbmRvdywgbW9ja0FwcFN0b3JlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvcmRlck9ic2VydmFibGUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICBpdCgncmVwcmVzZW50cyB0aGUgc3RvcmVcXCdzIGFjdGl2ZSBvcmRlcicsICgpID0+IHtcbiAgICAgICAgbW9ja0FwcFN0b3JlLmNyZWF0ZVN0YXRlRWxlbWVudCgnb3JkZXInLCAnYWN0aXZlT3JkZXInLCB7IHNvbWU6ICdvcmRlcicsIHByb2plY3RzOiBbXSB9KTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IE9yZGVyU2hvd0NvbXBvbmVudChtb2NrV2luZG93LCBtb2NrQXBwU3RvcmUpO1xuICAgICAgICBsZXQgY3VycmVudE9yZGVyO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub3JkZXJPYnNlcnZhYmxlLnN1YnNjcmliZShvcmRlciA9PiBjdXJyZW50T3JkZXIgPSBvcmRlcik7XG4gICAgICAgIGV4cGVjdChjdXJyZW50T3JkZXIpLnRvRXF1YWwoeyBzb21lOiAnb3JkZXInLCBwcm9qZWN0czogW10gfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NvbnRhaW5zIGVuaGFuY2VkIGFzc2V0cycsICgpID0+IHtcbiAgICAgICAgbW9ja0FwcFN0b3JlLmNyZWF0ZVN0YXRlRWxlbWVudChcbiAgICAgICAgICAnb3JkZXInLFxuICAgICAgICAgICdhY3RpdmVPcmRlcicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc29tZTogJ29yZGVyJyxcbiAgICAgICAgICAgIGlkOiA0MixcbiAgICAgICAgICAgIHByb2plY3RzOiBbeyBsaW5lSXRlbXM6IFt7IGFzc2V0OiB7fSB9XSB9XVxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBuZXcgT3JkZXJTaG93Q29tcG9uZW50KG1vY2tXaW5kb3csIG1vY2tBcHBTdG9yZSkub3JkZXJPYnNlcnZhYmxlLnN1YnNjcmliZShvcmRlciA9PiB7XG4gICAgICAgICAgY29uc3QgYXNzZXQ6IGFueSA9IG9yZGVyLnByb2plY3RzWzBdLmxpbmVJdGVtc1swXS5hc3NldDtcblxuICAgICAgICAgIGV4cGVjdChhc3NldC50eXBlKS50b0VxdWFsKCdvcmRlcicpO1xuICAgICAgICAgIGV4cGVjdChhc3NldC5wYXJlbnRJZCkudG9FcXVhbCg0Mik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZG93bmxvYWQoKScsICgpID0+IHtcbiAgICAgIGl0KCdjaGFuZ2VzIHRoZSB3aW5kb3dcXCdzIGxvY2F0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZG93bmxvYWQoJ2h0dHBzOi8vdGhpcy1pcy1hLXVybC5jb20nKTtcbiAgICAgICAgZXhwZWN0KG1vY2tXaW5kb3cubmF0aXZlV2luZG93LmxvY2F0aW9uLmhyZWYpLnRvQmUoJ2h0dHBzOi8vdGhpcy1pcy1hLXVybC5jb20nKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Fzc2V0Q291bnRMYWJlbEtleUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgcGx1cmFsaXplZCB0cmFuc2xhdGFibGUgc3RyaW5nIGJhc2VkIG9uIGFzc2V0IGNvdW50LiBJZiBjb3VudCBpcyAwIHJldHVybiBubyBhc3NldHMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYXNzZXRDb3VudExhYmVsS2V5Rm9yKDApKS50b0JlKCdPUkRFUi5TSE9XLlBST0pFQ1RTLk5PX0FTU0VUUycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIDEgYXNzZXQgaWYgYXNzZXQgY291bnQgaXMgMScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldENvdW50TGFiZWxLZXlGb3IoMSkpLnRvQmUoJ09SREVSLlNIT1cuUFJPSkVDVFMuT05MWV9PTkVfQVNTRVQnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB4IGFzc2V0cyBpZiBhc3NldCBjb3VudCBpcyBtb3JlIHRoYW4gMScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldENvdW50TGFiZWxLZXlGb3IoMjApKS50b0JlKCdPUkRFUi5TSE9XLlBST0pFQ1RTLk1PUkVfVEhBTl9PTkVfQVNTRVQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzUmVmdW5kZWRMaW5lSXRlbSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIHByaWNlIGlzID4gMCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pc1JlZnVuZGVkTGluZUl0ZW0oeyBwcmljZTogMTAwIH0pKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBwcmljZSBpcyA8IDAnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaXNSZWZ1bmRlZExpbmVJdGVtKHsgcHJpY2U6IC0xMDAgfSkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1JlZnVuZGVkUHJvamVjdCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgbm8gY3JlZGl0TWVtb0ZvclByb2plY3RJZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pc1JlZnVuZGVkUHJvamVjdCh7fSBhcyBhbnkpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGEgY3JlZGl0TWVtb0ZvclByb2plY3RJZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pc1JlZnVuZGVkUHJvamVjdCh7IGNyZWRpdE1lbW9Gb3JQcm9qZWN0SWQ6IDEyMzQ1IH0gYXMgYW55KSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzUmVmdW5kZWRPcmRlcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgb3JkZXIgaGFzIGEgY29ycmVzcG9uZGluZyBjcmVkaXQgbWVtbycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pc1JlZnVuZGVkT3JkZXIoeyBjcmVkaXRNZW1vRm9yT3JkZXJJZDogMTIzNDUgfSBhcyBhbnkpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBvcmRlciBkb2VzblxcJ3QgaGF2ZSBhIGNvcnJlc3BvbmRpbmcgY3JlZGl0IG1lbW8nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaXNSZWZ1bmRlZE9yZGVyKHt9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdWxkU2hvd1BheW1lbnRCYWxhbmNlRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBvcmRlciBoYXMgYSBwYXltZW50QmFsYW5jZSBhbmQgYSBwYXltZW50RHVlRGF0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UGF5bWVudEJhbGFuY2VGb3IoeyBwYXltZW50QmFsYW5jZTogMTIzNDUsIHBheW1lbnREdWVEYXRlOiAndGVzdCBkYXRlJyB9IGFzIGFueSkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIG9yZGVyIGRvZXNuXFwndCBoYXZlIGJvdGggYSBwYXltZW50QmFsYW5jZSBhbmQgYSBwYXltZW50RHVlRGF0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UGF5bWVudEJhbGFuY2VGb3IoeyBwYXltZW50QmFsYW5jZTogMTIzNDUgfSBhcyBhbnkpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgb3JkZXIgaGFzIGEgcGF5bWVudEJhbGFuY2UgYW5kIGEgcGF5bWVudER1ZURhdGUsIGJ1dCBwYXltZW50QmFsYW5jZSBsZXNzIHRoYW4gemVybycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93UGF5bWVudEJhbGFuY2VGb3IoeyBwYXltZW50QmFsYW5jZTogLTEyMywgcGF5bWVudER1ZURhdGU6ICd0ZXN0IGRhdGUnIH0gYXMgYW55KSlcbiAgICAgICAgICAudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93RGlzY291bnRGb3IoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIG9yZGVyIGhhcyBhIGRpc2NvdW50IHZhbHVlIGdyZWF0ZXIgdGhhbiB6ZXJvJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dEaXNjb3VudEZvcih7IGRpc2NvdW50OiAxNiB9IGFzIGFueSkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIG9yZGVyIGhhcyBhIGRpc2NvdW50IHZhbHVlIG9mIHplcm8nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd0Rpc2NvdW50Rm9yKHsgZGlzY291bnQ6IDAgfSBhcyBhbnkpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgb3JkZXIgaGFzIGEgZGlzY291bnQgdmFsdWUgZ3JlYXRlciB0aGFuIHplcm8sIGJ1dCBpcyBhIHJlZnVuZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93RGlzY291bnRGb3IoeyBkaXNjb3VudDogMTYsIGNyZWRpdE1lbW9Gb3JPcmRlcklkOiAxMjM0NSB9IGFzIGFueSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBvcmRlciBoYXMgYSBubyBkaXNjb3VudCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93RGlzY291bnRGb3Ioe30gYXMgYW55KSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvZmZsaW5lQWdyZWVtZW50SWRzIGdldHRlcicsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdzaG91bGQgcmV0dXJuIGFueSBleHRlcm5hbEFncmVlbWVudElkcyBmcm9tIHRoZSBxdW90ZVxcJ3MgbGluZUl0ZW1zJywgKCkgPT4ge1xuICAgICAgICBpdCgnZm9yIDEgbGluZUl0ZW0gaW4gMSBwcm9qZWN0JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tPcmRlciA9IHsgcHJvamVjdHM6IFt7IGxpbmVJdGVtczogW3sgZXh0ZXJuYWxBZ3JlZW1lbnRJZHM6IFsnYWJjLTEyMyddIH1dIH1dIH07XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm9mZmxpbmVBZ3JlZW1lbnRJZHNGb3IobW9ja09yZGVyKSkudG9FcXVhbCgnYWJjLTEyMycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIDEgbGluZUl0ZW0gaW4gbWFueSBwcm9qZWN0cycsICgpID0+IHtcbiAgICAgICAgICBtb2NrT3JkZXIgPSB7XG4gICAgICAgICAgICBwcm9qZWN0czogW1xuICAgICAgICAgICAgICB7IGxpbmVJdGVtczogW3sgZXh0ZXJuYWxBZ3JlZW1lbnRJZHM6IFsnYWJjLTEyMyddIH1dIH0sXG4gICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydkZWYtNDU2J10gfV0gfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm9mZmxpbmVBZ3JlZW1lbnRJZHNGb3IobW9ja09yZGVyKSkudG9FcXVhbCgnYWJjLTEyMywgZGVmLTQ1NicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIG1hbnkgbGluZUl0ZW1zIGluIDEgcHJvamVjdCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrT3JkZXIgPSB7XG4gICAgICAgICAgICBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydhYmMtMTIzJ10gfSwgeyBleHRlcm5hbEFncmVlbWVudElkczogWydkZWYtNDU2J10gfV0gfV1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vZmZsaW5lQWdyZWVtZW50SWRzRm9yKG1vY2tPcmRlcikpLnRvRXF1YWwoJ2FiYy0xMjMsIGRlZi00NTYnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBtYW55IGxpbmVJdGVtcyBpbiBtYW55IHByb2plY3RzJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tPcmRlciA9IHtcbiAgICAgICAgICAgIHByb2plY3RzOiBbXG4gICAgICAgICAgICAgIHsgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydhYmMtMTIzJ10gfSwgeyBleHRlcm5hbEFncmVlbWVudElkczogWydkZWYtNDU2J10gfV0gfSxcbiAgICAgICAgICAgICAgeyBsaW5lSXRlbXM6IFt7IGV4dGVybmFsQWdyZWVtZW50SWRzOiBbJ2ZnaC03ODknXSB9LCB7IGV4dGVybmFsQWdyZWVtZW50SWRzOiBbJ2lqay0wMTInXSB9XSB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub2ZmbGluZUFncmVlbWVudElkc0Zvcihtb2NrT3JkZXIpKS50b0VxdWFsKCdhYmMtMTIzLCBkZWYtNDU2LCBmZ2gtNzg5LCBpamstMDEyJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aXRoIGR1cGxpY2F0ZSBpZGVudGlmaWVycycsICgpID0+IHtcbiAgICAgICAgICBtb2NrT3JkZXIgPSB7XG4gICAgICAgICAgICBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbeyBleHRlcm5hbEFncmVlbWVudElkczogWydhYmMtMTIzJ10gfSwgeyBleHRlcm5hbEFncmVlbWVudElkczogWydhYmMtMTIzJ10gfV0gfV1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vZmZsaW5lQWdyZWVtZW50SWRzRm9yKG1vY2tPcmRlcikpLnRvRXF1YWwoJ2FiYy0xMjMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3dpdGggbm8gaWRlbnRpZmllcnMnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja09yZGVyID0ge1xuICAgICAgICAgICAgcHJvamVjdHM6IFt7IGxpbmVJdGVtczogW3sgc29tZTogJ2xpbmVJdGVtJyB9LCB7IHNvbWU6ICdsaW5lSXRlbScgfV0gfV1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vZmZsaW5lQWdyZWVtZW50SWRzRm9yKG1vY2tPcmRlcikpLnRvRXF1YWwoJycpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZERpc3BsYXlSaWdodHMoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiB0aGUgbGluZSBpdGVtIGlzIHJpZ2h0cyBtYW5hZ2VkIGFuZCBvcmRlciB0eXBlIGlzIE5PVCBhIFRyaWFsJywgKCkgPT4ge1xuICAgICAgICBsZXQgbGluZUl0ZW06IGFueSA9IHsgcmlnaHRzTWFuYWdlZDogJ1JpZ2h0cyBNYW5hZ2VkJyB9O1xuICAgICAgICBtb2NrT3JkZXIgPSB7XG4gICAgICAgICAgb3JkZXJUeXBlOiAnTm90IFRyaWFsJ1xuICAgICAgICB9O1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZERpc3BsYXlSaWdodHMobGluZUl0ZW0sIG1vY2tPcmRlcikpXG4gICAgICAgICAgLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIGxpbmUgaXRlbSBpcyByb3lhbHR5LWZyZWUnLCAoKSA9PiB7XG4gICAgICAgIGxldCBsaW5lSXRlbTogYW55ID0geyByaWdodHNNYW5hZ2VkOiAnUm95YWx0eSBGcmVlJyB9O1xuICAgICAgICBtb2NrT3JkZXIgPSB7XG4gICAgICAgICAgb3JkZXJUeXBlOiAnVHJpYWwnXG4gICAgICAgIH07XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkRGlzcGxheVJpZ2h0cyhsaW5lSXRlbSwgbW9ja09yZGVyKSlcbiAgICAgICAgICAudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdGhlIG9yZGVyIHR5cGUgaXMgYSBUcmlhbCcsICgpID0+IHtcbiAgICAgICAgbGV0IGxpbmVJdGVtOiBhbnkgPSB7IHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcgfTtcbiAgICAgICAgbW9ja09yZGVyID0ge1xuICAgICAgICAgIG9yZGVyVHlwZTogJ1RyaWFsJ1xuICAgICAgICB9O1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZERpc3BsYXlSaWdodHMobGluZUl0ZW0sIG1vY2tPcmRlcikpXG4gICAgICAgICAgLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0Rvd25sb2FkQnV0dG9uRm9yKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgYXNzZXQgb24gdGhlIGxpbmVJdGVtIGhhcyBhIGRvd25sb2FkVXJsJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd0Rvd25sb2FkQnV0dG9uRm9yKHsgZG93bmxvYWRVcmw6ICdzb21lLXVybCcgfSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgYXNzZXQgb24gdGhlIGxpbmVJdGVtIGRvZXMgbm90IGhhdmUgYSBkb3dubG9hZFVybCcsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dEb3dubG9hZEJ1dHRvbkZvcih7IGRvd25sb2FkVXJsOiBudWxsIH0pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIGFzc2V0IG9uIHRoZSBsaW5lSXRlbSBoYXMgYSB0cmFuc2NvZGUgc3RhdHVzIG9mIFxcJ0ZhaWxlZFxcJycsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dEb3dubG9hZEJ1dHRvbkZvcih7IGRvd25sb2FkVXJsOiAnc29tZS11cmwnLCB0cmFuc2NvZGVTdGF0dXM6ICdGYWlsZWQnIH0pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93U3Bpbm5lckljb24oKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBhc3NldCBvbiB0aGUgbGluZUl0ZW0gaGFzIGEgdHJhbnNjb2RlIHN0YXR1cyBvZiBcXCdTdWJtaXR0ZWRcXCcnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93U3Bpbm5lckljb24oeyB0cmFuc2NvZGVTdGF0dXM6ICdTdWJtaXR0ZWQnIH0pKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIGFzc2V0IG9uIHRoZSBsaW5lSXRlbSBoYXMgYSB0cmFuc2NvZGUgc3RhdHVzIG9mIHNvbWV0aGluZyBvdGhlciB0aGFuIFxcJ1N1Ym1pdHRlZFxcJycsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dTcGlubmVySWNvbih7IHRyYW5zY29kZVN0YXR1czogJ0ZhaWxlZCcgfSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3doZW4gdGhlIGFzc2V0IG9uIHRoZSBsaW5lSXRlbSBoYXMgYSB0cmFuc2NvZGUgc3RhdHVzIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dTcGlubmVySWNvbih7IHRyYW5zY29kZVN0YXR1czogdW5kZWZpbmVkIH0pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdub3RoaW5nVG9Eb3dubG9hZCgpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIGFzc2V0IG9uIHRoZSBsaW5lSXRlbSBkb2VzIG5vdCBoYXZlIGEgZG93bmxvYWRVcmwgYW5kIHRyYW5zY29kZVN0YXR1cyBpcyAgXFwnQ29tcGxldGVkXFwnJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qubm90aGluZ1RvRG93bmxvYWQoeyB0cmFuc2NvZGVTdGF0dXM6ICdDb21wbGV0ZWQnIH0pKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIGFzc2V0IG9uIHRoZSBsaW5lSXRlbSBkb2VzIG5vdCBoYXZlIGEgZG93bmxvYWRVcmwgYW5kIHRoZSB0cmFuc2NvZGVTdGF0dXMgaXMgYW55IGJ1dCBcXCdDb21wbGV0ZWRcXCcnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ub3RoaW5nVG9Eb3dubG9hZCh7IHRyYW5zY29kZVN0YXR1czogJ0ZhaWxlZCcsIGRvd25sb2FkVXJsOiBudWxsIH0pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBhc3NldCBvbiB0aGUgbGluZUl0ZW0gaGFzIGEgZG93bmxvYWRVcmwgYW5kIHRoZSB0cmFuc2NvZGVTdGF0dXMgaXMgXFwnQ29tcGxldGVkXFwnJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qubm90aGluZ1RvRG93bmxvYWQoeyB0cmFuc2NvZGVTdGF0dXM6ICdDb21wbGV0ZWQnLCBkb3dubG9hZFVybDogJ3NvbWUtdXJsLm1vdicgfSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dBc3BlcmFCdXR0b25Gb3IoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB0cmFuc2NvZGUgc3RhdHVzIG9uIHRoZSBsaW5lSXRlbSBpcyBcXCdDb21wbGV0ZWRcXCcgYW5kIHRoZXJlIGlzIGFuIGFzcGVyYVNwZWMnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93QXNwZXJhQnV0dG9uRm9yKHsgdHJhbnNjb2RlU3RhdHVzOiAnQ29tcGxldGVkJywgYXNwZXJhU3BlYzogJ3NvbWUtc3BlYycgfSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnaWYgdGhlIHRyYW5zY29kZSBzdGF0dXMgaXMgbm90IFxcJ0NvbXBsZXRlZFxcJycsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dBc3BlcmFCdXR0b25Gb3IoeyB0cmFuc2NvZGVTdGF0dXM6ICdTdWJtaXR0ZWQnIH0pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lmIHRoZSB0cmFuc2NvZGUgc3RhdHVzIGlzIFxcJ0NvbXBsZXRlZFxcJywgYnV0IHRoZXJlIGlzIG5vIGFzcGVyYVNwZWMnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93QXNwZXJhQnV0dG9uRm9yKHsgdHJhbnNjb2RlU3RhdHVzOiAnQ29tcGxldGVkJyB9KSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaWNvbkZvck5vdGVzQnV0dG9uKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBcXCdrZXlib2FyZF9hcnJvd19kb3duXFwnIHdoZW4gdGhlIG5vdGUgaXMgbm90IHZpc2JsZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9ja0xpbmVJdGVtOiBhbnkgPSB7IGlkOiAnYWJjJyB9O1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmljb25Gb3JOb3Rlc0J1dHRvbihtb2NrTGluZUl0ZW0pKS50b0JlKCdrZXlib2FyZF9hcnJvd19kb3duJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgXFwna2V5Ym9hcmRfYXJyb3dfdXBcXCcgd2hlbiB0aGUgbm90ZSBpcyB2aXNibGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vY2tMaW5lSXRlbTogYW55ID0geyBpZDogJ2FiYycgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZU5vdGVzVmlzaWJpbGl0eUZvcihtb2NrTGluZUl0ZW0pO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmljb25Gb3JOb3Rlc0J1dHRvbihtb2NrTGluZUl0ZW0pKS50b0JlKCdrZXlib2FyZF9hcnJvd191cCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndG9nZ2xlTm90ZXNWaXNpYmlsaXR5Rm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgndG9nZ2xlcyB0aGUgYm9vbGVhbiBmb3IgdGhlIGdpdmVuIGxpbmVJdGVtJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2NrTGluZUl0ZW06IGFueSA9IHsgaWQ6ICd4eXotNzg5Jywgbm90ZXM6IFt7IG5vdGVzOiBbJ2Egbm90ZSddIH1dIH07XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ub3RlVmlzaWJpbGl0eU1hcFttb2NrTGluZUl0ZW0uaWRdKS50b0JlRmFsc3koKTsgLy8gc3RhcnRzIGFzIHVuZGVmaW5lZFxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudG9nZ2xlTm90ZXNWaXNpYmlsaXR5Rm9yKG1vY2tMaW5lSXRlbSk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qubm90ZVZpc2liaWxpdHlNYXBbbW9ja0xpbmVJdGVtLmlkXSkudG9CZSh0cnVlKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZU5vdGVzVmlzaWJpbGl0eUZvcihtb2NrTGluZUl0ZW0pO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5vdGVWaXNpYmlsaXR5TWFwW21vY2tMaW5lSXRlbS5pZF0pLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFzTm90ZXMoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBsaW5lSXRlbSBoYXMgYXQgbGVhc3QgMSBub3RlJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaGFzTm90ZXMoeyBub3RlczogW3sgbm90ZXM6IFsnYSBub3RlJ10gfV0gfSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgbGluZUl0ZW0gZG9lcyBub3QgaGF2ZSBhIG5vdGUnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNOb3Rlcyh7IG5vdGVzOiBbeyBub3RlczogW10gfV0gfSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgbGluZUl0ZW0gZG9lcyBub3QgaGF2ZSBhIG5vdGVzIHByb3BlcnR5IGluIHRoZSBub3RlcycsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc05vdGVzKHsgbm90ZXM6IFt7fV0gfSBhcyBhbnkpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIG5vdGVzIHByb3BlcnR5IG9uIHRoZSBsaW5lSXRlbSBpcyBlbXB0eScsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc05vdGVzKHsgbm90ZXM6IFtdIH0gYXMgYW55KSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZXJlIGlzIG5vIG5vdGVzIHByb3BlcnR5IG9uIHRoZSBsaW5lSXRlbScsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc05vdGVzKHt9KSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdWxkU2hvd05vdGVGb3IoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBsaW5lSXRlbSBoYXMgbm90ZXMgYW5kIHRoZSB0b2dnbGUgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBtb2NrTGluZUl0ZW06IGFueSA9IHsgaWQ6ICdhYmMtMTIzJywgbm90ZXM6IFt7IG5vdGVzOiBbJ2Egbm90ZSddIH1dIH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZU5vdGVzVmlzaWJpbGl0eUZvcihtb2NrTGluZUl0ZW0pOyAvLyB0b2dnbGUgdG8gdHJ1ZSwgYmVjYXVzZSBpdCBzdGFydHMgYXMgdW5kZWZpbmVkXG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dOb3RlRm9yKG1vY2tMaW5lSXRlbSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgbGluZUl0ZW0gZG9lc25cXCd0IGhhdmUgbm90ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbW9ja0xpbmVJdGVtOiBhbnkgPSB7IGlkOiAnZGVmLTQ1NicgfTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3VsZFNob3dOb3RlRm9yKG1vY2tMaW5lSXRlbSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgbGluZUl0ZW0gZG9lcyBoYXZlIG5vdGVzLCBidXQgdGhlIHRvZ2dsZSBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBtb2NrTGluZUl0ZW06IGFueSA9IHsgaWQ6ICdhYmMtMTIzJywgbm90ZXM6IFt7IG5vdGVzOiBbJ2Egbm90ZSddIH1dIH07XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93Tm90ZUZvcihtb2NrTGluZUl0ZW0pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIl19
