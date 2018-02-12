"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var line_item_actions_component_1 = require("./line-item-actions.component");
function main() {
    describe('Line Item Actions Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new line_item_actions_component_1.LineItemActionsComponent();
        });
        describe('get displayPriceButton()', function () {
            describe('returns true', function () {
                it('when the asset is RM and quoteType is not Trial', function () {
                    componentUnderTest.rightsReproduction = 'Rights Managed';
                    componentUnderTest.quoteType = 'NotTrial';
                    expect(componentUnderTest.displayPriceButton).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the asset is not RM', function () {
                    componentUnderTest.rightsReproduction = 'Royalty Free';
                    componentUnderTest.quoteType = 'Not Trial';
                    expect(componentUnderTest.displayPriceButton).toBe(false);
                });
                it('when the asset is RM but the quote type is Trial', function () {
                    componentUnderTest.rightsReproduction = 'Rights Managed';
                    componentUnderTest.quoteType = 'Trial';
                    expect(componentUnderTest.displayPriceButton).toBe(false);
                });
                it('when the asset is not RM AND the quote type is Trial', function () {
                    componentUnderTest.rightsReproduction = 'Royalty Free';
                    componentUnderTest.quoteType = 'Trial';
                    expect(componentUnderTest.displayPriceButton).toBe(false);
                });
            });
        });
        describe('get needsAttributes()', function () {
            describe('returns true', function () {
                it('when the asset is Rights Managed and doesn\'t have a rights package', function () {
                    componentUnderTest.rightsReproduction = 'Rights Managed';
                    componentUnderTest.hasAttributes = false;
                    expect(componentUnderTest.needsAttributes).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the asset is not Rights Managed', function () {
                    componentUnderTest.rightsReproduction = 'Royalty Free';
                    componentUnderTest.hasAttributes = false;
                    expect(componentUnderTest.needsAttributes).toBe(false);
                });
                it('when the asset already has a rights package, even if it is RM', function () {
                    componentUnderTest.rightsReproduction = 'Rights Managed';
                    componentUnderTest.hasAttributes = true;
                    expect(componentUnderTest.needsAttributes).toBe(false);
                });
                it('when the asset is not RM', function () {
                    componentUnderTest.rightsReproduction = 'Royalty Free';
                    componentUnderTest.hasAttributes = false;
                    expect(componentUnderTest.needsAttributes).toBe(false);
                });
            });
        });
        describe('get shouldShowSubclipButton()', function () {
            describe('returns true', function () {
                it('when the user can create subclips and there aer other projects in the cart/quote', function () {
                    componentUnderTest.userCanCreateSubclips = true;
                    componentUnderTest.otherProjects = [1, 2];
                    expect(componentUnderTest.shouldShowSubclipButton).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user cannot create subclips', function () {
                    componentUnderTest.userCanCreateSubclips = false;
                    componentUnderTest.otherProjects = [1, 2];
                    expect(componentUnderTest.shouldShowSubclipButton).toBe(false);
                });
                it('when there are no other projects in the cart/quote', function () {
                    componentUnderTest.userCanCreateSubclips = true;
                    componentUnderTest.otherProjects = [];
                    expect(componentUnderTest.shouldShowSubclipButton).toBe(false);
                });
                it('when there are no other projects in the cart/quote AND the user cannot create subclips', function () {
                    componentUnderTest.userCanCreateSubclips = false;
                    componentUnderTest.otherProjects = [];
                    expect(componentUnderTest.shouldShowSubclipButton).toBe(false);
                });
            });
        });
        describe('get otherProjectsExist()', function () {
            describe('returns true', function () {
                it('when there are other projects', function () {
                    componentUnderTest.otherProjects = [1, 2, 3];
                    expect(componentUnderTest.otherProjectsExist).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when there are no other projects', function () {
                    componentUnderTest.otherProjects = [];
                    expect(componentUnderTest.otherProjectsExist).toBe(false);
                });
            });
        });
        describe('get trStringForSubclipping()', function () {
            it('returns "COLLECTION.SHOW.ASSET_MORE_MENU.EDIT_SUBCLIPPING" when the asset is subclipped', function () {
                componentUnderTest.assetIsSubclipped = true;
                expect(componentUnderTest.trStringForSubclipping).toBe('COLLECTION.SHOW.ASSET_MORE_MENU.EDIT_SUBCLIPPING');
            });
            it('returns "COLLECTION.SHOW.ASSET_MORE_MENU.ADD_SUBCLIPPING" when the asset is not subclipped', function () {
                componentUnderTest.assetIsSubclipped = false;
                expect(componentUnderTest.trStringForSubclipping).toBe('COLLECTION.SHOW.ASSET_MORE_MENU.ADD_SUBCLIPPING');
            });
        });
        describe('get trStringForCostMultiplier()', function () {
            it('returns "QUOTE.EDIT_MULTIPLIER_TITLE" when there is a multiplier', function () {
                componentUnderTest.hasMultiplier = true;
                expect(componentUnderTest.trStringForCostMultiplier).toBe('QUOTE.EDIT_MULTIPLIER_TITLE');
            });
            it('returns "QUOTE.ADD_MULTIPLIER_TITLE" when there is NOT a multiplier', function () {
                componentUnderTest.hasMultiplier = false;
                expect(componentUnderTest.trStringForCostMultiplier).toBe('QUOTE.ADD_MULTIPLIER_TITLE');
            });
        });
        describe('get trStringForRightsPackage()', function () {
            it('returns "QUOTE.ADD_RIGHTS_PACKAGE_TITLE" when there is a rights attributes already exist', function () {
                componentUnderTest.hasAttributes = false;
                expect(componentUnderTest.trStringForRightsPackage).toBe('QUOTE.ADD_RIGHTS_PACKAGE_TITLE');
            });
            it('returns "QUOTE.EDIT_RIGHTS_PACKAGE_TITLE" when there are not rights attributes', function () {
                componentUnderTest.hasAttributes = true;
                expect(componentUnderTest.trStringForRightsPackage).toBe('QUOTE.EDIT_RIGHTS_PACKAGE_TITLE');
            });
        });
        describe('get showDeleteCostMultiplierBtn()', function () {
            describe('returns true', function () {
                it('when the user can administer quotes and the line item has a multiplier', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.hasMultiplier = true;
                    expect(componentUnderTest.showDeleteCostMultiplierBtn).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the user can\'t administer quotes', function () {
                    componentUnderTest.userCanAdministerQuotes = false;
                    componentUnderTest.hasMultiplier = true;
                    expect(componentUnderTest.showDeleteCostMultiplierBtn).toBe(false);
                });
                it('when the line item doesn\'t have a multiplier', function () {
                    componentUnderTest.userCanAdministerQuotes = true;
                    componentUnderTest.hasMultiplier = false;
                    expect(componentUnderTest.showDeleteCostMultiplierBtn).toBe(false);
                });
                it('when the line item doesn\'t have a multiplier AND the user can\'t adminster quotes', function () {
                    componentUnderTest.userCanAdministerQuotes = false;
                    componentUnderTest.hasMultiplier = false;
                    expect(componentUnderTest.showDeleteCostMultiplierBtn).toBe(false);
                });
            });
        });
        describe('onClickAddCustomPrice', function () {
            it('emits the proper event', function () {
                spyOn(componentUnderTest.addCustomPrice, 'emit');
                componentUnderTest.onClickAddCustomPrice();
                expect(componentUnderTest.addCustomPrice.emit).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtLWFjdGlvbnMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RUFBeUU7QUFFekU7SUFDRSxRQUFRLENBQUMsNkJBQTZCLEVBQUU7UUFDdEMsSUFBSSxrQkFBNEMsQ0FBQztRQUVqRCxVQUFVLENBQUM7WUFDVCxrQkFBa0IsR0FBRyxJQUFJLHNEQUF3QixFQUFFLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsMEJBQTBCLEVBQUU7WUFDbkMsUUFBUSxDQUFDLGNBQWMsRUFBRTtnQkFDdkIsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO29CQUNwRCxrQkFBa0IsQ0FBQyxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQztvQkFDekQsa0JBQWtCLENBQUMsU0FBUyxHQUFHLFVBQWlCLENBQUM7b0JBRWpELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0QsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtvQkFDN0Isa0JBQWtCLENBQUMsa0JBQWtCLEdBQUcsY0FBYyxDQUFDO29CQUN2RCxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsV0FBa0IsQ0FBQztvQkFFbEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM1RCxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsa0RBQWtELEVBQUU7b0JBQ3JELGtCQUFrQixDQUFDLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDO29CQUN6RCxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO29CQUV2QyxNQUFNLENBQUMs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Q0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckUsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLG9GQUFvRixFQUFFO29CQUN2RixrQkFBa0IsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7b0JBQ25ELGtCQUFrQixDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBRXpDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtnQkFDM0IsS0FBSyxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDakQsa0JBQWtCLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwTkQsb0JBb05DIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtLWFjdGlvbnMuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaW5lSXRlbUFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2xpbmUtaXRlbS1hY3Rpb25zLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnTGluZSBJdGVtIEFjdGlvbnMgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IExpbmVJdGVtQWN0aW9uc0NvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IExpbmVJdGVtQWN0aW9uc0NvbXBvbmVudCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBkaXNwbGF5UHJpY2VCdXR0b24oKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBhc3NldCBpcyBSTSBhbmQgcXVvdGVUeXBlIGlzIG5vdCBUcmlhbCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucmlnaHRzUmVwcm9kdWN0aW9uID0gJ1JpZ2h0cyBNYW5hZ2VkJztcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucXVvdGVUeXBlID0gJ05vdFRyaWFsJyBhcyBhbnk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmRpc3BsYXlQcmljZUJ1dHRvbikudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBhc3NldCBpcyBub3QgUk0nLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c1JlcHJvZHVjdGlvbiA9ICdSb3lhbHR5IEZyZWUnO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5xdW90ZVR5cGUgPSAnTm90IFRyaWFsJyBhcyBhbnk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmRpc3BsYXlQcmljZUJ1dHRvbikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBhc3NldCBpcyBSTSBidXQgdGhlIHF1b3RlIHR5cGUgaXMgVHJpYWwnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c1JlcHJvZHVjdGlvbiA9ICdSaWdodHMgTWFuYWdlZCc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnF1b3RlVHlwZSA9ICdUcmlhbCc7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmRpc3BsYXlQcmljZUJ1dHRvbikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBhc3NldCBpcyBub3QgUk0gQU5EIHRoZSBxdW90ZSB0eXBlIGlzIFRyaWFsJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yaWdodHNSZXByb2R1Y3Rpb24gPSAnUm95YWx0eSBGcmVlJztcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucXVvdGVUeXBlID0gJ1RyaWFsJztcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZGlzcGxheVByaWNlQnV0dG9uKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgbmVlZHNBdHRyaWJ1dGVzKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgYXNzZXQgaXMgUmlnaHRzIE1hbmFnZWQgYW5kIGRvZXNuXFwndCBoYXZlIGEgcmlnaHRzIHBhY2thZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c1JlcHJvZHVjdGlvbiA9ICdSaWdodHMgTWFuYWdlZCc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lmhhc0F0dHJpYnV0ZXMgPSBmYWxzZTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubmVlZHNBdHRyaWJ1dGVzKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIGFzc2V0IGlzIG5vdCBSaWdodHMgTWFuYWdlZCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucmlnaHRzUmVwcm9kdWN0aW9uID0gJ1JveWFsdHkgRnJlZSc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lmhhc0F0dHJpYnV0ZXMgPSBmYWxzZTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubmVlZHNBdHRyaWJ1dGVzKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIGFzc2V0IGFscmVhZHkgaGFzIGEgcmlnaHRzIHBhY2thZ2UsIGV2ZW4gaWYgaXQgaXMgUk0nLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c1JlcHJvZHVjdGlvbiA9ICdSaWdodHMgTWFuYWdlZCc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lmhhc0F0dHJpYnV0ZXMgPSB0cnVlO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5uZWVkc0F0dHJpYnV0ZXMpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgYXNzZXQgaXMgbm90IFJNJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yaWdodHNSZXByb2R1Y3Rpb24gPSAnUm95YWx0eSBGcmVlJztcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFzQXR0cmlidXRlcyA9IGZhbHNlO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5uZWVkc0F0dHJpYnV0ZXMpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBzaG91bGRTaG93U3ViY2xpcEJ1dHRvbigpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXIgY2FuIGNyZWF0ZSBzdWJjbGlwcyBhbmQgdGhlcmUgYWVyIG90aGVyIHByb2plY3RzIGluIHRoZSBjYXJ0L3F1b3RlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQ3JlYXRlU3ViY2xpcHMgPSB0cnVlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vdGhlclByb2plY3RzID0gWzEsIDJdO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93U3ViY2xpcEJ1dHRvbikudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhbm5vdCBjcmVhdGUgc3ViY2xpcHMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5DcmVhdGVTdWJjbGlwcyA9IGZhbHNlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vdGhlclByb2plY3RzID0gWzEsIDJdO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93U3ViY2xpcEJ1dHRvbikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZXJlIGFyZSBubyBvdGhlciBwcm9qZWN0cyBpbiB0aGUgY2FydC9xdW90ZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkNyZWF0ZVN1YmNsaXBzID0gdHJ1ZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub3RoZXJQcm9qZWN0cyA9IFtdO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93U3ViY2xpcEJ1dHRvbikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZXJlIGFyZSBubyBvdGhlciBwcm9qZWN0cyBpbiB0aGUgY2FydC9xdW90ZSBBTkQgdGhlIHVzZXIgY2Fubm90IGNyZWF0ZSBzdWJjbGlwcycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkNyZWF0ZVN1YmNsaXBzID0gZmFsc2U7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm90aGVyUHJvamVjdHMgPSBbXTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd1N1YmNsaXBCdXR0b24pLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBvdGhlclByb2plY3RzRXhpc3QoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZXJlIGFyZSBvdGhlciBwcm9qZWN0cycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub3RoZXJQcm9qZWN0cyA9IFsxLCAyLCAzXTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub3RoZXJQcm9qZWN0c0V4aXN0KS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlcmUgYXJlIG5vIG90aGVyIHByb2plY3RzJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vdGhlclByb2plY3RzID0gW107XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm90aGVyUHJvamVjdHNFeGlzdCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHRyU3RyaW5nRm9yU3ViY2xpcHBpbmcoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIFwiQ09MTEVDVElPTi5TSE9XLkFTU0VUX01PUkVfTUVOVS5FRElUX1NVQkNMSVBQSU5HXCIgd2hlbiB0aGUgYXNzZXQgaXMgc3ViY2xpcHBlZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0SXNTdWJjbGlwcGVkID0gdHJ1ZTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRyU3RyaW5nRm9yU3ViY2xpcHBpbmcpLnRvQmUoJ0NPTExFQ1RJT04uU0hPVy5BU1NFVF9NT1JFX01FTlUuRURJVF9TVUJDTElQUElORycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIFwiQ09MTEVDVElPTi5TSE9XLkFTU0VUX01PUkVfTUVOVS5BRERfU1VCQ0xJUFBJTkdcIiB3aGVuIHRoZSBhc3NldCBpcyBub3Qgc3ViY2xpcHBlZCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0SXNTdWJjbGlwcGVkID0gZmFsc2U7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50clN0cmluZ0ZvclN1YmNsaXBwaW5nKS50b0JlKCdDT0xMRUNUSU9OLlNIT1cuQVNTRVRfTU9SRV9NRU5VLkFERF9TVUJDTElQUElORycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHRyU3RyaW5nRm9yQ29zdE11bHRpcGxpZXIoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIFwiUVVPVEUuRURJVF9NVUxUSVBMSUVSX1RJVExFXCIgd2hlbiB0aGVyZSBpcyBhIG11bHRpcGxpZXInLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYXNNdWx0aXBsaWVyID0gdHJ1ZTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRyU3RyaW5nRm9yQ29zdE11bHRpcGxpZXIpLnRvQmUoJ1FVT1RFLkVESVRfTVVMVElQTElFUl9USVRMRScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIFwiUVVPVEUuQUREX01VTFRJUExJRVJfVElUTEVcIiB3aGVuIHRoZXJlIGlzIE5PVCBhIG11bHRpcGxpZXInLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYXNNdWx0aXBsaWVyID0gZmFsc2U7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50clN0cmluZ0ZvckNvc3RNdWx0aXBsaWVyKS50b0JlKCdRVU9URS5BRERfTVVMVElQTElFUl9USVRMRScpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHRyU3RyaW5nRm9yUmlnaHRzUGFja2FnZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgXCJRVU9URS5BRERfUklHSFRTX1BBQ0tBR0VfVElUTEVcIiB3aGVuIHRoZXJlIGlzIGEgcmlnaHRzIGF0dHJpYnV0ZXMgYWxyZWFkeSBleGlzdCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lmhhc0F0dHJpYnV0ZXMgPSBmYWxzZTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRyU3RyaW5nRm9yUmlnaHRzUGFja2FnZSkudG9CZSgnUVVPVEUuQUREX1JJR0hUU19QQUNLQUdFX1RJVExFJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgXCJRVU9URS5FRElUX1JJR0hUU19QQUNLQUdFX1RJVExFXCIgd2hlbiB0aGVyZSBhcmUgbm90IHJpZ2h0cyBhdHRyaWJ1dGVzJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFzQXR0cmlidXRlcyA9IHRydWU7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50clN0cmluZ0ZvclJpZ2h0c1BhY2thZ2UpLnRvQmUoJ1FVT1RFLkVESVRfUklHSFRTX1BBQ0tBR0VfVElUTEUnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBzaG93RGVsZXRlQ29zdE11bHRpcGxpZXJCdG4oKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSB1c2VyIGNhbiBhZG1pbmlzdGVyIHF1b3RlcyBhbmQgdGhlIGxpbmUgaXRlbSBoYXMgYSBtdWx0aXBsaWVyJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyA9IHRydWU7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lmhhc011bHRpcGxpZXIgPSB0cnVlO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93RGVsZXRlQ29zdE11bHRpcGxpZXJCdG4pLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgdXNlciBjYW5cXCd0IGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyA9IGZhbHNlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYXNNdWx0aXBsaWVyID0gdHJ1ZTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd0RlbGV0ZUNvc3RNdWx0aXBsaWVyQnRuKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIGxpbmUgaXRlbSBkb2VzblxcJ3QgaGF2ZSBhIG11bHRpcGxpZXInLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzID0gdHJ1ZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGFzTXVsdGlwbGllciA9IGZhbHNlO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93RGVsZXRlQ29zdE11bHRpcGxpZXJCdG4pLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGUgbGluZSBpdGVtIGRvZXNuXFwndCBoYXZlIGEgbXVsdGlwbGllciBBTkQgdGhlIHVzZXIgY2FuXFwndCBhZG1pbnN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyA9IGZhbHNlO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oYXNNdWx0aXBsaWVyID0gZmFsc2U7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dEZWxldGVDb3N0TXVsdGlwbGllckJ0bikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGlja0FkZEN1c3RvbVByaWNlJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHRoZSBwcm9wZXIgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5hZGRDdXN0b21QcmljZSwgJ2VtaXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2xpY2tBZGRDdXN0b21QcmljZSgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFkZEN1c3RvbVByaWNlLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
