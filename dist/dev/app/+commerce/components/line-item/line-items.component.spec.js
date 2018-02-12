"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var line_items_component_1 = require("./line-items.component");
var EnhancedMock = require("../../../shared/interfaces/enhanced-asset");
var mock_asset_1 = require("../../../shared/mocks/mock-asset");
function main() {
    describe('Line Items', function () {
        var classUnderTest;
        var mockEnhancedAsset;
        beforeEach(function () {
            mockEnhancedAsset = EnhancedMock.enhanceAsset(mock_asset_1.mockCommerceAssetLineItem.asset, null);
            classUnderTest = new line_items_component_1.LineItemsComponent();
            mock_asset_1.mockCommerceAssetLineItem.asset = EnhancedMock.enhanceAsset(mock_asset_1.mockCommerceAssetLineItem.asset, null);
            classUnderTest.lineItems = [mock_asset_1.mockCommerceAssetLineItem];
        });
        describe('onMoveTo()', function () {
            it('emits the proper request event', function () {
                var project = { some: 'project' };
                var lineItem = { some: 'lineItem' };
                classUnderTest.lineItemsNotify
                    .subscribe(function (event) {
                    expect(event).toEqual({
                        type: 'MOVE_LINE_ITEM',
                        payload: { lineItem: lineItem, otherProject: project }
                    });
                });
                classUnderTest.onMoveTo(project, lineItem);
            });
        });
        describe('onClone()', function () {
            it('emits the proper request event', function () {
                var lineItem = { some: 'lineItem' };
                classUnderTest.lineItemsNotify
                    .subscribe(function (event) {
                    expect(event).toEqual({ type: 'CLONE_LINE_ITEM', payload: lineItem });
                });
                classUnderTest.onClone(lineItem);
            });
        });
        describe('remove()', function () {
            it('emits the proper request event', function () {
                var lineItem = { some: 'lineItem' };
                classUnderTest.lineItemsNotify
                    .subscribe(function (event) {
                    expect(event).toEqual({ type: 'REMOVE_LINE_ITEM', payload: lineItem });
                });
                classUnderTest.onRemove(lineItem);
            });
        });
        describe('editMarkers()', function () {
            it('emits the proper request event', function () {
                var lineItem = { some: 'lineItem' };
                classUnderTest.lineItemsNotify
                    .subscribe(function (event) {
                    expect(event).toEqual({ type: 'EDIT_LINE_ITEM_MARKERS', payload: lineItem });
                });
                classUnderTest.onEditMarkers(lineItem);
            });
        });
        describe('delegate()', function () {
            it('forwards events', function () {
                classUnderTest.lineItemsNotify
                    .subscribe(function (event) {
                    expect(event).toEqual({ some: 'event' });
                });
                classUnderTest.delegate({ some: 'event' });
            });
        });
        describe('selectLineItem()', function () {
            it('has no testable effect (yet)', function () {
                var lineItem = { some: 'lineItem' };
                classUnderTest.selectLineItem(lineItem);
                expect(true).toBe(true);
            });
        });
        describe('onShowPricingDialog', function () {
            it('should emit the "SHOW_PRICING_DIALOG" event', function () {
                var lineItem = { some: 'lineItem' };
                classUnderTest.lineItemsNotify.subscribe(function (event) {
                    expect(event).toEqual({ type: 'SHOW_PRICING_DIALOG', payload: lineItem });
                });
                classUnderTest.onShowPricingDialog(lineItem);
            });
        });
        describe('onSelectTarget', function () {
            it('emits the proper event', function () {
                var lineItem = { some: 'lineItem' };
                classUnderTest.lineItemsNotify
                    .subscribe(function (event) {
                    expect(event).toEqual({
                        type: 'EDIT_LINE_ITEM', payload: {
                            lineItem: lineItem, fieldToEdit: { selectedTranscodeTarget: 'master_copy' }
                        }
                    });
                });
                classUnderTest.onSelectTarget('master_copy', '', lineItem);
            });
        });
        describe('onAddCostMultiplier()', function () {
            it('emits the proper event with the lineItem', function () {
                var lineItem = { some: 'lineItem' };
                classUnderTest.lineItemsNotify.subscribe(function (event) {
                    expect(event).toEqual({ type: 'SHOW_COST_MULTIPLIER_DIALOG', payload: lineItem });
                });
                classUnderTest.onOpenCostMultiplierForm(lineItem);
            });
        });
        describe('onRemoveCostMultiplier', function () {
            it('emits the proper event with the lineItem', function () {
                var lineItem = { some: 'lineItem' };
                classUnderTest.lineItemsNotify.subscribe(function (event) {
                    expect(event).toEqual({ type: 'REMOVE_COST_MULTIPLIER', payload: lineItem });
                });
                classUnderTest.onRemoveCostMultiplier(lineItem);
            });
        });
        describe('isSubclipped()', function () {
            it('returns true when the enhanced asset is subclipped', function () {
                expect(classUnderTest.isSubclipped(classUnderTest.items[0].asset))
                    .toBe(mockEnhancedAsset.isSubclipped);
            });
        });
        describe('shouldDisplayPricing()', function () {
            it('returns true when quote is NOT a Trial and all rights managed assets have selected rights packages', function () {
                classUnderTest.quoteType = 'NoTrial';
                classUnderTest.rmAssetsHaveAttributes = true;
                expect(classUnderTest.shouldDisplayPricing({
                    rightsManaged: 'Rights Managed',
                    attributes: [{ some: 'attributes' }]
                })).toBe(true);
            });
            it('returns true when quote is NOT a Trial and it is a royalty free clip', function () {
                classUnderTest.quoteType = 'NoTrial';
                classUnderTest.rmAssetsHaveAttributes = true;
                expect(classUnderTest.shouldDisplayPricing({
                    rightsManaged: 'Royalty Free'
                })).toBe(true);
            });
            it('returns true when quote is NOT a Trial and it has a overrideGrossAssetPrice property', function () {
                classUnderTest.quoteType = 'NoTrial';
                classUnderTest.rmAssetsHaveAttributes = true;
                expect(classUnderTest.shouldDisplayPricing({
                    rightsManaged: 'Rights Managed',
                    overrideGrossAssetPrice: 200
                })).toBe(true);
            });
            it('returns false when the quote is a Trial', function () {
                classUnderTest.quoteType = 'Trial';
                expect(classUnderTest.shouldDisplayPricing({ rightsManaged: 'Royalty Free' })).toBe(false);
            });
            it('returns false when the quote is a Trial, but not all rights managed assets have rights packages', function () {
                classUnderTest.quoteType = 'Trial';
                classUnderTest.rmAssetsHaveAttributes = false;
                expect(classUnderTest.shouldDisplayPricing({ rightsManaged: 'Rights Managed', attributes: false })).toBe(false);
            });
        });
        describe('shouldShowTargets()', function () {
            it('returns true when transcodeTargets exist and have a length greater than 0', function () {
                var lineItem = { transcodeTargets: ['native', '10mbH264', 'xconvert_prores_hd'] };
                expect(classUnderTest.shouldShowTargets(lineItem)).toBe(true);
            });
            it('returns false when transcodeTargets exist, but have a zero length', function () {
                var lineItem = { transcodeTargets: [] };
                expect(classUnderTest.shouldShowTargets(lineItem)).toBe(false);
            });
        });
        describe('shouldDisplayRights()', function () {
            it('returns true when the line item is rights managed and quote is NOT a Trial', function () {
                var lineItem = { rightsManaged: 'Rights Managed' };
                classUnderTest.quoteType = 'Not Trial';
                expect(classUnderTest.shouldDisplayRights(lineItem)).toBe(true);
            });
            it('returns false when the line item is royalty-free', function () {
                var lineItem = { rightsManaged: 'Royalty Free' };
                expect(classUnderTest.shouldDisplayRights(lineItem)).toBe(false);
            });
            it('returns false when the quote is a Trial', function () {
                var lineItem = { rightsManaged: 'Rights Managed' };
                classUnderTest.quoteType = 'Trial';
                expect(classUnderTest.shouldDisplayRights(lineItem)).toBe(false);
            });
        });
        describe('onAddCustomPrice()', function () {
            it('emits the lineItemsNotify event with the right type and payload', function () {
                classUnderTest.onAddCustomPrice({ some: 'lineItem' });
                classUnderTest.lineItemsNotify.subscribe(function (event) {
                    expect(event).toEqual({ type: 'ADD_CUSTOM_PRICE', payload: { some: 'lineItem' } });
                });
            });
        });
        describe('iconForNotesButton()', function () {
            it('returns \'keyboard_arrow_down\' when the note is not visble', function () {
                var mockLineItem = { id: 'abc' };
                expect(classUnderTest.iconForNotesButton(mockLineItem)).toBe('keyboard_arrow_down');
            });
            it('returns \'keyboard_arrow_up\' when the note is visble', function () {
                var mockLineItem = { id: 'abc' };
                classUnderTest.toggleNotesVisibilityFor(mockLineItem);
                expect(classUnderTest.iconForNotesButton(mockLineItem)).toBe('keyboard_arrow_up');
            });
        });
        describe('toggleNotesVisibilityFor()', function () {
            it('toggles the boolean for the given lineItem', function () {
                var mockLineItem = { id: 'xyz-789', notes: [{ notes: ['a note'] }] };
                expect(classUnderTest.noteVisibilityMap[mockLineItem.id]).toBeFalsy();
                classUnderTest.toggleNotesVisibilityFor(mockLineItem);
                expect(classUnderTest.noteVisibilityMap[mockLineItem.id]).toBe(true);
                classUnderTest.toggleNotesVisibilityFor(mockLineItem);
                expect(classUnderTest.noteVisibilityMap[mockLineItem.id]).toBe(false);
            });
        });
        describe('hasNotes()', function () {
            describe('returns true', function () {
                it('when the lineItem has at least 1 note', function () {
                    expect(classUnderTest.hasNotes({ notes: [{ notes: ['a note'] }] })).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the lineItem does not have a note', function () {
                    expect(classUnderTest.hasNotes({ notes: [{ notes: [] }] })).toBe(false);
                });
                it('when the lineItem does not have a notes property in the notes', function () {
                    expect(classUnderTest.hasNotes({ notes: [{}] })).toBe(false);
                });
                it('when the notes property on the lineItem is empty', function () {
                    expect(classUnderTest.hasNotes({ notes: [] })).toBe(false);
                });
                it('when there is no notes property on the lineItem', function () {
                    expect(classUnderTest.hasNotes({})).toBe(false);
                });
            });
        });
        describe('shouldShowNoteFor()', function () {
            describe('returns true', function () {
                it('when the lineItem has notes and the toggle is true', function () {
                    var mockLineItem = { id: 'abc-123', notes: [{ notes: ['a note'] }] };
                    classUnderTest.toggleNotesVisibilityFor(mockLineItem);
                    expect(classUnderTest.shouldShowNoteFor(mockLineItem)).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the lineItem doesn\'t have notes', function () {
                    var mockLineItem = { id: 'def-456' };
                    expect(classUnderTest.shouldShowNoteFor(mockLineItem)).toBe(false);
                });
                it('when the lineItem does have notes, but the toggle is false', function () {
                    var mockLineItem = { id: 'abc-123', notes: [{ notes: ['a note'] }] };
                    expect(classUnderTest.shouldShowNoteFor(mockLineItem)).toBe(false);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtcy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE0RDtBQUM1RCx3RUFBMEU7QUFDMUUsK0RBQTZFO0FBRTdFO0lBQ0UsUUFBUSxDQUFDLFlBQVksRUFBRTtRQUNyQixJQUFJLGNBQWtDLENBQUM7UUFDdkMsSUFBSSxpQkFBNkMsQ0FBQztRQUVsRCxVQUFVLENBQUM7WUFDVCxpQkFBaUIsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLHNDQUF5QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRixjQUFjLEdBQUcsSUFBSSx5Q0FBa0IsRUFBRSxDQUFDO1lBQzFDLHNDQUF5QixDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLHNDQUF5QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRyxjQUFjLENBQUMsU0FBUyxHQUFHLENBQUMsc0NBQXlCLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO2dCQUNuQyxJQUFJLE9BQU8sR0FBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztnQkFDdkMsSUFBSSxRQUFRLEdBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7Z0JBRXpDLGNBQWMsQ0FBQyxlQUFlO3FCQUMzQixTQUFTLENBQUMsVUFBQyxLQUFhO29CQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNwQixJQUFJLEVBQUUsZ0JBQWdCO3dCQUN0QixPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUU7cUJBQ3ZELENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFTCxjQUFjLENBQUMs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Q0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuVEQsb0JBbVRDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtcy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpbmVJdGVtc0NvbXBvbmVudCB9IGZyb20gJy4vbGluZS1pdGVtcy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgRW5oYW5jZWRNb2NrIGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IG1vY2tDb21tZXJjZUFzc2V0TGluZUl0ZW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9ja3MvbW9jay1hc3NldCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnTGluZSBJdGVtcycsICgpID0+IHtcbiAgICBsZXQgY2xhc3NVbmRlclRlc3Q6IExpbmVJdGVtc0NvbXBvbmVudDtcbiAgICBsZXQgbW9ja0VuaGFuY2VkQXNzZXQ6IEVuaGFuY2VkTW9jay5FbmhhbmNlZEFzc2V0O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrRW5oYW5jZWRBc3NldCA9IEVuaGFuY2VkTW9jay5lbmhhbmNlQXNzZXQobW9ja0NvbW1lcmNlQXNzZXRMaW5lSXRlbS5hc3NldCwgbnVsbCk7XG4gICAgICBjbGFzc1VuZGVyVGVzdCA9IG5ldyBMaW5lSXRlbXNDb21wb25lbnQoKTtcbiAgICAgIG1vY2tDb21tZXJjZUFzc2V0TGluZUl0ZW0uYXNzZXQgPSBFbmhhbmNlZE1vY2suZW5oYW5jZUFzc2V0KG1vY2tDb21tZXJjZUFzc2V0TGluZUl0ZW0uYXNzZXQsIG51bGwpO1xuICAgICAgY2xhc3NVbmRlclRlc3QubGluZUl0ZW1zID0gW21vY2tDb21tZXJjZUFzc2V0TGluZUl0ZW1dO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uTW92ZVRvKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgdGhlIHByb3BlciByZXF1ZXN0IGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBsZXQgcHJvamVjdDogYW55ID0geyBzb21lOiAncHJvamVjdCcgfTtcbiAgICAgICAgbGV0IGxpbmVJdGVtOiBhbnkgPSB7IHNvbWU6ICdsaW5lSXRlbScgfTtcblxuICAgICAgICBjbGFzc1VuZGVyVGVzdC5saW5lSXRlbXNOb3RpZnlcbiAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoZXZlbnQpLnRvRXF1YWwoe1xuICAgICAgICAgICAgICB0eXBlOiAnTU9WRV9MSU5FX0lURU0nLFxuICAgICAgICAgICAgICBwYXlsb2FkOiB7IGxpbmVJdGVtOiBsaW5lSXRlbSwgb3RoZXJQcm9qZWN0OiBwcm9qZWN0IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNsYXNzVW5kZXJUZXN0Lm9uTW92ZVRvKHByb2plY3QsIGxpbmVJdGVtKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ2xvbmUoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgcHJvcGVyIHJlcXVlc3QgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBsaW5lSXRlbTogYW55ID0geyBzb21lOiAnbGluZUl0ZW0nIH07XG5cbiAgICAgICAgY2xhc3NVbmRlclRlc3QubGluZUl0ZW1zTm90aWZ5XG4gICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGV2ZW50KS50b0VxdWFsKHsgdHlwZTogJ0NMT05FX0xJTkVfSVRFTScsIHBheWxvYWQ6IGxpbmVJdGVtIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNsYXNzVW5kZXJUZXN0Lm9uQ2xvbmUobGluZUl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVtb3ZlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgdGhlIHByb3BlciByZXF1ZXN0IGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBsZXQgbGluZUl0ZW06IGFueSA9IHsgc29tZTogJ2xpbmVJdGVtJyB9O1xuXG4gICAgICAgIGNsYXNzVW5kZXJUZXN0LmxpbmVJdGVtc05vdGlmeVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChldmVudCkudG9FcXVhbCh7IHR5cGU6ICdSRU1PVkVfTElORV9JVEVNJywgcGF5bG9hZDogbGluZUl0ZW0gfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgY2xhc3NVbmRlclRlc3Qub25SZW1vdmUobGluZUl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZWRpdE1hcmtlcnMoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgcHJvcGVyIHJlcXVlc3QgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBsaW5lSXRlbTogYW55ID0geyBzb21lOiAnbGluZUl0ZW0nIH07XG4gICAgICAgIGNsYXNzVW5kZXJUZXN0LmxpbmVJdGVtc05vdGlmeVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChldmVudCkudG9FcXVhbCh7IHR5cGU6ICdFRElUX0xJTkVfSVRFTV9NQVJLRVJTJywgcGF5bG9hZDogbGluZUl0ZW0gfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgY2xhc3NVbmRlclRlc3Qub25FZGl0TWFya2VycyhsaW5lSXRlbSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkZWxlZ2F0ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2ZvcndhcmRzIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY2xhc3NVbmRlclRlc3QubGluZUl0ZW1zTm90aWZ5XG4gICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGV2ZW50KS50b0VxdWFsKHsgc29tZTogJ2V2ZW50JyB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBjbGFzc1VuZGVyVGVzdC5kZWxlZ2F0ZSh7IHNvbWU6ICdldmVudCcgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZWxlY3RMaW5lSXRlbSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2hhcyBubyB0ZXN0YWJsZSBlZmZlY3QgKHlldCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBsaW5lSXRlbTogYW55ID0geyBzb21lOiAnbGluZUl0ZW0nIH07XG5cbiAgICAgICAgY2xhc3NVbmRlclRlc3Quc2VsZWN0TGluZUl0ZW0obGluZUl0ZW0pO1xuXG4gICAgICAgIGV4cGVjdCh0cnVlKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TaG93UHJpY2luZ0RpYWxvZycsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZW1pdCB0aGUgXCJTSE9XX1BSSUNJTkdfRElBTE9HXCIgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBsaW5lSXRlbTogYW55ID0geyBzb21lOiAnbGluZUl0ZW0nIH07XG5cbiAgICAgICAgY2xhc3NVbmRlclRlc3QubGluZUl0ZW1zTm90aWZ5LnN1YnNjcmliZSgoZXZlbnQ6IE9iamVjdCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChldmVudCkudG9FcXVhbCh7IHR5cGU6ICdTSE9XX1BSSUNJTkdfRElBTE9HJywgcGF5bG9hZDogbGluZUl0ZW0gfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNsYXNzVW5kZXJUZXN0Lm9uU2hvd1ByaWNpbmdEaWFsb2cobGluZUl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TZWxlY3RUYXJnZXQnLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgdGhlIHByb3BlciBldmVudCcsICgpID0+IHtcbiAgICAgICAgbGV0IGxpbmVJdGVtOiBhbnkgPSB7IHNvbWU6ICdsaW5lSXRlbScgfTtcblxuICAgICAgICBjbGFzc1VuZGVyVGVzdC5saW5lSXRlbXNOb3RpZnlcbiAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoZXZlbnQpLnRvRXF1YWwoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnRURJVF9MSU5FX0lURU0nLCBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICBsaW5lSXRlbTogbGluZUl0ZW0sIGZpZWxkVG9FZGl0OiB7IHNlbGVjdGVkVHJhbnNjb2RlVGFyZ2V0OiAnbWFzdGVyX2NvcHknIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNsYXNzVW5kZXJUZXN0Lm9uU2VsZWN0VGFyZ2V0KCdtYXN0ZXJfY29weScsICcnLCBsaW5lSXRlbSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbkFkZENvc3RNdWx0aXBsaWVyKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgdGhlIHByb3BlciBldmVudCB3aXRoIHRoZSBsaW5lSXRlbScsICgpID0+IHtcbiAgICAgICAgbGV0IGxpbmVJdGVtOiBhbnkgPSB7IHNvbWU6ICdsaW5lSXRlbScgfTtcblxuICAgICAgICBjbGFzc1VuZGVyVGVzdC5saW5lSXRlbXNOb3RpZnkuc3Vic2NyaWJlKChldmVudDogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGV2ZW50KS50b0VxdWFsKHsgdHlwZTogJ1NIT1dfQ09TVF9NVUxUSVBMSUVSX0RJQUxPRycsIHBheWxvYWQ6IGxpbmVJdGVtIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbGFzc1VuZGVyVGVzdC5vbk9wZW5Db3N0TXVsdGlwbGllckZvcm0obGluZUl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25SZW1vdmVDb3N0TXVsdGlwbGllcicsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgcHJvcGVyIGV2ZW50IHdpdGggdGhlIGxpbmVJdGVtJywgKCkgPT4ge1xuICAgICAgICBsZXQgbGluZUl0ZW06IGFueSA9IHsgc29tZTogJ2xpbmVJdGVtJyB9O1xuXG4gICAgICAgIGNsYXNzVW5kZXJUZXN0LmxpbmVJdGVtc05vdGlmeS5zdWJzY3JpYmUoKGV2ZW50OiBPYmplY3QpID0+IHtcbiAgICAgICAgICBleHBlY3QoZXZlbnQpLnRvRXF1YWwoeyB0eXBlOiAnUkVNT1ZFX0NPU1RfTVVMVElQTElFUicsIHBheWxvYWQ6IGxpbmVJdGVtIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbGFzc1VuZGVyVGVzdC5vblJlbW92ZUNvc3RNdWx0aXBsaWVyKGxpbmVJdGVtKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzU3ViY2xpcHBlZCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIHRoZSBlbmhhbmNlZCBhc3NldCBpcyBzdWJjbGlwcGVkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3QuaXNTdWJjbGlwcGVkKGNsYXNzVW5kZXJUZXN0Lml0ZW1zWzBdLmFzc2V0IGFzIEVuaGFuY2VkTW9jay5FbmhhbmNlZEFzc2V0KSlcbiAgICAgICAgICAudG9CZShtb2NrRW5oYW5jZWRBc3NldC5pc1N1YmNsaXBwZWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdWxkRGlzcGxheVByaWNpbmcoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBxdW90ZSBpcyBOT1QgYSBUcmlhbCBhbmQgYWxsIHJpZ2h0cyBtYW5hZ2VkIGFzc2V0cyBoYXZlIHNlbGVjdGVkIHJpZ2h0cyBwYWNrYWdlcycsICgpID0+IHtcbiAgICAgICAgY2xhc3NVbmRlclRlc3QucXVvdGVUeXBlID0gJ05vVHJpYWwnIGFzIGFueTtcbiAgICAgICAgY2xhc3NVbmRlclRlc3Qucm1Bc3NldHNIYXZlQXR0cmlidXRlcyA9IHRydWU7XG4gICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG91bGREaXNwbGF5UHJpY2luZyhcbiAgICAgICAgICB7XG4gICAgICAgICAgICByaWdodHNNYW5hZ2VkOiAnUmlnaHRzIE1hbmFnZWQnLFxuICAgICAgICAgICAgYXR0cmlidXRlczogW3sgc29tZTogJ2F0dHJpYnV0ZXMnIH0gYXMgYW55XVxuICAgICAgICAgIH0pKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBxdW90ZSBpcyBOT1QgYSBUcmlhbCBhbmQgaXQgaXMgYSByb3lhbHR5IGZyZWUgY2xpcCcsICgpID0+IHtcbiAgICAgICAgY2xhc3NVbmRlclRlc3QucXVvdGVUeXBlID0gJ05vVHJpYWwnIGFzIGFueTtcbiAgICAgICAgY2xhc3NVbmRlclRlc3Qucm1Bc3NldHNIYXZlQXR0cmlidXRlcyA9IHRydWU7XG4gICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG91bGREaXNwbGF5UHJpY2luZyhcbiAgICAgICAgICB7XG4gICAgICAgICAgICByaWdodHNNYW5hZ2VkOiAnUm95YWx0eSBGcmVlJ1xuICAgICAgICAgIH0pKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBxdW90ZSBpcyBOT1QgYSBUcmlhbCBhbmQgaXQgaGFzIGEgb3ZlcnJpZGVHcm9zc0Fzc2V0UHJpY2UgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGNsYXNzVW5kZXJUZXN0LnF1b3RlVHlwZSA9ICdOb1RyaWFsJyBhcyBhbnk7XG4gICAgICAgIGNsYXNzVW5kZXJUZXN0LnJtQXNzZXRzSGF2ZUF0dHJpYnV0ZXMgPSB0cnVlO1xuICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvdWxkRGlzcGxheVByaWNpbmcoXG4gICAgICAgICAge1xuICAgICAgICAgICAgcmlnaHRzTWFuYWdlZDogJ1JpZ2h0cyBNYW5hZ2VkJyxcbiAgICAgICAgICAgIG92ZXJyaWRlR3Jvc3NBc3NldFByaWNlOiAyMDBcbiAgICAgICAgICB9KSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZSBxdW90ZSBpcyBhIFRyaWFsJywgKCkgPT4ge1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5xdW90ZVR5cGUgPSAnVHJpYWwnO1xuICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvdWxkRGlzcGxheVByaWNpbmcoeyByaWdodHNNYW5hZ2VkOiAnUm95YWx0eSBGcmVlJyB9KSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0aGUgcXVvdGUgaXMgYSBUcmlhbCwgYnV0IG5vdCBhbGwgcmlnaHRzIG1hbmFnZWQgYXNzZXRzIGhhdmUgcmlnaHRzIHBhY2thZ2VzJywgKCkgPT4ge1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5xdW90ZVR5cGUgPSAnVHJpYWwnO1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5ybUFzc2V0c0hhdmVBdHRyaWJ1dGVzID0gZmFsc2U7XG4gICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG91bGREaXNwbGF5UHJpY2luZyh7IHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcsIGF0dHJpYnV0ZXM6IGZhbHNlIGFzIGFueSB9KSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93VGFyZ2V0cygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIHRyYW5zY29kZVRhcmdldHMgZXhpc3QgYW5kIGhhdmUgYSBsZW5ndGggZ3JlYXRlciB0aGFuIDAnLCAoKSA9PiB7XG4gICAgICAgIGxldCBsaW5lSXRlbTogYW55ID0geyB0cmFuc2NvZGVUYXJnZXRzOiBbJ25hdGl2ZScsICcxMG1iSDI2NCcsICd4Y29udmVydF9wcm9yZXNfaGQnXSB9O1xuICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvdWxkU2hvd1RhcmdldHMobGluZUl0ZW0pKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdHJhbnNjb2RlVGFyZ2V0cyBleGlzdCwgYnV0IGhhdmUgYSB6ZXJvIGxlbmd0aCcsICgpID0+IHtcbiAgICAgICAgbGV0IGxpbmVJdGVtOiBhbnkgPSB7IHRyYW5zY29kZVRhcmdldHM6IFtdIH07XG4gICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG91bGRTaG93VGFyZ2V0cyhsaW5lSXRlbSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdWxkRGlzcGxheVJpZ2h0cygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIHRoZSBsaW5lIGl0ZW0gaXMgcmlnaHRzIG1hbmFnZWQgYW5kIHF1b3RlIGlzIE5PVCBhIFRyaWFsJywgKCkgPT4ge1xuICAgICAgICBsZXQgbGluZUl0ZW06IGFueSA9IHsgcmlnaHRzTWFuYWdlZDogJ1JpZ2h0cyBNYW5hZ2VkJyB9O1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5xdW90ZVR5cGUgPSAnTm90IFRyaWFsJyBhcyBhbnk7XG4gICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5zaG91bGREaXNwbGF5UmlnaHRzKGxpbmVJdGVtKSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZSBsaW5lIGl0ZW0gaXMgcm95YWx0eS1mcmVlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbGluZUl0ZW06IGFueSA9IHsgcmlnaHRzTWFuYWdlZDogJ1JveWFsdHkgRnJlZScgfTtcbiAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3VsZERpc3BsYXlSaWdodHMobGluZUl0ZW0pKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZSBxdW90ZSBpcyBhIFRyaWFsJywgKCkgPT4ge1xuICAgICAgICBsZXQgbGluZUl0ZW06IGFueSA9IHsgcmlnaHRzTWFuYWdlZDogJ1JpZ2h0cyBNYW5hZ2VkJyB9O1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC5xdW90ZVR5cGUgPSAnVHJpYWwnO1xuICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvdWxkRGlzcGxheVJpZ2h0cyhsaW5lSXRlbSkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25BZGRDdXN0b21QcmljZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHRoZSBsaW5lSXRlbXNOb3RpZnkgZXZlbnQgd2l0aCB0aGUgcmlnaHQgdHlwZSBhbmQgcGF5bG9hZCcsICgpID0+IHtcbiAgICAgICAgY2xhc3NVbmRlclRlc3Qub25BZGRDdXN0b21QcmljZSh7IHNvbWU6ICdsaW5lSXRlbScgfSBhcyBhbnkpO1xuXG4gICAgICAgIGNsYXNzVW5kZXJUZXN0LmxpbmVJdGVtc05vdGlmeS5zdWJzY3JpYmUoKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICBleHBlY3QoZXZlbnQpLnRvRXF1YWwoeyB0eXBlOiAnQUREX0NVU1RPTV9QUklDRScsIHBheWxvYWQ6IHsgc29tZTogJ2xpbmVJdGVtJyB9IH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgnaWNvbkZvck5vdGVzQnV0dG9uKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBcXCdrZXlib2FyZF9hcnJvd19kb3duXFwnIHdoZW4gdGhlIG5vdGUgaXMgbm90IHZpc2JsZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9ja0xpbmVJdGVtOiBhbnkgPSB7IGlkOiAnYWJjJyB9O1xuICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3QuaWNvbkZvck5vdGVzQnV0dG9uKG1vY2tMaW5lSXRlbSkpLnRvQmUoJ2tleWJvYXJkX2Fycm93X2Rvd24nKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBcXCdrZXlib2FyZF9hcnJvd191cFxcJyB3aGVuIHRoZSBub3RlIGlzIHZpc2JsZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9ja0xpbmVJdGVtOiBhbnkgPSB7IGlkOiAnYWJjJyB9O1xuICAgICAgICBjbGFzc1VuZGVyVGVzdC50b2dnbGVOb3Rlc1Zpc2liaWxpdHlGb3IobW9ja0xpbmVJdGVtKTtcbiAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0Lmljb25Gb3JOb3Rlc0J1dHRvbihtb2NrTGluZUl0ZW0pKS50b0JlKCdrZXlib2FyZF9hcnJvd191cCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndG9nZ2xlTm90ZXNWaXNpYmlsaXR5Rm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgndG9nZ2xlcyB0aGUgYm9vbGVhbiBmb3IgdGhlIGdpdmVuIGxpbmVJdGVtJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2NrTGluZUl0ZW06IGFueSA9IHsgaWQ6ICd4eXotNzg5Jywgbm90ZXM6IFt7IG5vdGVzOiBbJ2Egbm90ZSddIH1dIH07XG5cbiAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0Lm5vdGVWaXNpYmlsaXR5TWFwW21vY2tMaW5lSXRlbS5pZF0pLnRvQmVGYWxzeSgpOyAvLyBzdGFydHMgYXMgdW5kZWZpbmVkXG4gICAgICAgIGNsYXNzVW5kZXJUZXN0LnRvZ2dsZU5vdGVzVmlzaWJpbGl0eUZvcihtb2NrTGluZUl0ZW0pO1xuICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Qubm90ZVZpc2liaWxpdHlNYXBbbW9ja0xpbmVJdGVtLmlkXSkudG9CZSh0cnVlKTtcbiAgICAgICAgY2xhc3NVbmRlclRlc3QudG9nZ2xlTm90ZXNWaXNpYmlsaXR5Rm9yKG1vY2tMaW5lSXRlbSk7XG4gICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5ub3RlVmlzaWJpbGl0eU1hcFttb2NrTGluZUl0ZW0uaWRdKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc05vdGVzKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgbGluZUl0ZW0gaGFzIGF0IGxlYXN0IDEgbm90ZScsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3QuaGFzTm90ZXMoeyBub3RlczogW3sgbm90ZXM6IFsnYSBub3RlJ10gfV0gfSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgbGluZUl0ZW0gZG9lcyBub3QgaGF2ZSBhIG5vdGUnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0Lmhhc05vdGVzKHsgbm90ZXM6IFt7IG5vdGVzOiBbXSB9XSB9KSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBsaW5lSXRlbSBkb2VzIG5vdCBoYXZlIGEgbm90ZXMgcHJvcGVydHkgaW4gdGhlIG5vdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjbGFzc1VuZGVyVGVzdC5oYXNOb3Rlcyh7IG5vdGVzOiBbe31dIH0gYXMgYW55KSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBub3RlcyBwcm9wZXJ0eSBvbiB0aGUgbGluZUl0ZW0gaXMgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0Lmhhc05vdGVzKHsgbm90ZXM6IFtdIH0gYXMgYW55KSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZXJlIGlzIG5vIG5vdGVzIHByb3BlcnR5IG9uIHRoZSBsaW5lSXRlbScsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3QuaGFzTm90ZXMoe30pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93Tm90ZUZvcigpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIGxpbmVJdGVtIGhhcyBub3RlcyBhbmQgdGhlIHRvZ2dsZSBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1vY2tMaW5lSXRlbTogYW55ID0geyBpZDogJ2FiYy0xMjMnLCBub3RlczogW3sgbm90ZXM6IFsnYSBub3RlJ10gfV0gfTtcbiAgICAgICAgICBjbGFzc1VuZGVyVGVzdC50b2dnbGVOb3Rlc1Zpc2liaWxpdHlGb3IobW9ja0xpbmVJdGVtKTsgLy8gdG9nZ2xlIHRvIHRydWUsIGJlY2F1c2UgaXQgc3RhcnRzIGFzIHVuZGVmaW5lZFxuXG4gICAgICAgICAgZXhwZWN0KGNsYXNzVW5kZXJUZXN0LnNob3VsZFNob3dOb3RlRm9yKG1vY2tMaW5lSXRlbSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgbGluZUl0ZW0gZG9lc25cXCd0IGhhdmUgbm90ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbW9ja0xpbmVJdGVtOiBhbnkgPSB7IGlkOiAnZGVmLTQ1NicgfTtcbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvdWxkU2hvd05vdGVGb3IobW9ja0xpbmVJdGVtKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBsaW5lSXRlbSBkb2VzIGhhdmUgbm90ZXMsIGJ1dCB0aGUgdG9nZ2xlIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1vY2tMaW5lSXRlbTogYW55ID0geyBpZDogJ2FiYy0xMjMnLCBub3RlczogW3sgbm90ZXM6IFsnYSBub3RlJ10gfV0gfTtcbiAgICAgICAgICBleHBlY3QoY2xhc3NVbmRlclRlc3Quc2hvdWxkU2hvd05vdGVGb3IobW9ja0xpbmVJdGVtKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
