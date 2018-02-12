import { LineItemsComponent } from './line-items.component';
import * as EnhancedMock from '../../../shared/interfaces/enhanced-asset';
import { mockCommerceAssetLineItem } from '../../../shared/mocks/mock-asset';

export function main() {
  describe('Line Items', () => {
    let classUnderTest: LineItemsComponent;
    let mockEnhancedAsset: EnhancedMock.EnhancedAsset;

    beforeEach(() => {
      mockEnhancedAsset = EnhancedMock.enhanceAsset(mockCommerceAssetLineItem.asset, null);
      classUnderTest = new LineItemsComponent();
      mockCommerceAssetLineItem.asset = EnhancedMock.enhanceAsset(mockCommerceAssetLineItem.asset, null);
      classUnderTest.lineItems = [mockCommerceAssetLineItem];
    });

    describe('onMoveTo()', () => {
      it('emits the proper request event', () => {
        let project: any = { some: 'project' };
        let lineItem: any = { some: 'lineItem' };

        classUnderTest.lineItemsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual({
              type: 'MOVE_LINE_ITEM',
              payload: { lineItem: lineItem, otherProject: project }
            });
          });

        classUnderTest.onMoveTo(project, lineItem);
      });
    });

    describe('onClone()', () => {
      it('emits the proper request event', () => {
        let lineItem: any = { some: 'lineItem' };

        classUnderTest.lineItemsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual({ type: 'CLONE_LINE_ITEM', payload: lineItem });
          });

        classUnderTest.onClone(lineItem);
      });
    });

    describe('remove()', () => {
      it('emits the proper request event', () => {
        let lineItem: any = { some: 'lineItem' };

        classUnderTest.lineItemsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual({ type: 'REMOVE_LINE_ITEM', payload: lineItem });
          });

        classUnderTest.onRemove(lineItem);
      });
    });

    describe('editMarkers()', () => {
      it('emits the proper request event', () => {
        let lineItem: any = { some: 'lineItem' };
        classUnderTest.lineItemsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual({ type: 'EDIT_LINE_ITEM_MARKERS', payload: lineItem });
          });

        classUnderTest.onEditMarkers(lineItem);
      });
    });

    describe('delegate()', () => {
      it('forwards events', () => {
        classUnderTest.lineItemsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual({ some: 'event' });
          });

        classUnderTest.delegate({ some: 'event' });
      });
    });

    describe('selectLineItem()', () => {
      it('has no testable effect (yet)', () => {
        let lineItem: any = { some: 'lineItem' };

        classUnderTest.selectLineItem(lineItem);

        expect(true).toBe(true);
      });
    });

    describe('onShowPricingDialog', () => {
      it('should emit the "SHOW_PRICING_DIALOG" event', () => {
        let lineItem: any = { some: 'lineItem' };

        classUnderTest.lineItemsNotify.subscribe((event: Object) => {
          expect(event).toEqual({ type: 'SHOW_PRICING_DIALOG', payload: lineItem });
        });

        classUnderTest.onShowPricingDialog(lineItem);
      });
    });

    describe('onSelectTarget', () => {
      it('emits the proper event', () => {
        let lineItem: any = { some: 'lineItem' };

        classUnderTest.lineItemsNotify
          .subscribe((event: Object) => {
            expect(event).toEqual(
              {
                type: 'EDIT_LINE_ITEM', payload: {
                  lineItem: lineItem, fieldToEdit: { selectedTranscodeTarget: 'master_copy' }
                }
              });
          });

        classUnderTest.onSelectTarget('master_copy', '', lineItem);
      });
    });

    describe('onAddCostMultiplier()', () => {
      it('emits the proper event with the lineItem', () => {
        let lineItem: any = { some: 'lineItem' };

        classUnderTest.lineItemsNotify.subscribe((event: Object) => {
          expect(event).toEqual({ type: 'SHOW_COST_MULTIPLIER_DIALOG', payload: lineItem });
        });

        classUnderTest.onOpenCostMultiplierForm(lineItem);
      });
    });

    describe('onRemoveCostMultiplier', () => {
      it('emits the proper event with the lineItem', () => {
        let lineItem: any = { some: 'lineItem' };

        classUnderTest.lineItemsNotify.subscribe((event: Object) => {
          expect(event).toEqual({ type: 'REMOVE_COST_MULTIPLIER', payload: lineItem });
        });

        classUnderTest.onRemoveCostMultiplier(lineItem);
      });
    });

    describe('isSubclipped()', () => {
      it('returns true when the enhanced asset is subclipped', () => {
        expect(classUnderTest.isSubclipped(classUnderTest.items[0].asset as EnhancedMock.EnhancedAsset))
          .toBe(mockEnhancedAsset.isSubclipped);
      });
    });

    describe('shouldDisplayPricing()', () => {
      it('returns true when quote is NOT a Trial and all rights managed assets have selected rights packages', () => {
        classUnderTest.quoteType = 'NoTrial' as any;
        classUnderTest.rmAssetsHaveAttributes = true;
        expect(classUnderTest.shouldDisplayPricing(
          {
            rightsManaged: 'Rights Managed',
            attributes: [{ some: 'attributes' } as any]
          })).toBe(true);
      });

      it('returns true when quote is NOT a Trial and it is a royalty free clip', () => {
        classUnderTest.quoteType = 'NoTrial' as any;
        classUnderTest.rmAssetsHaveAttributes = true;
        expect(classUnderTest.shouldDisplayPricing(
          {
            rightsManaged: 'Royalty Free'
          })).toBe(true);
      });

      it('returns true when quote is NOT a Trial and it has a overrideGrossAssetPrice property', () => {
        classUnderTest.quoteType = 'NoTrial' as any;
        classUnderTest.rmAssetsHaveAttributes = true;
        expect(classUnderTest.shouldDisplayPricing(
          {
            rightsManaged: 'Rights Managed',
            overrideGrossAssetPrice: 200
          })).toBe(true);
      });

      it('returns false when the quote is a Trial', () => {
        classUnderTest.quoteType = 'Trial';
        expect(classUnderTest.shouldDisplayPricing({ rightsManaged: 'Royalty Free' })).toBe(false);
      });

      it('returns false when the quote is a Trial, but not all rights managed assets have rights packages', () => {
        classUnderTest.quoteType = 'Trial';
        classUnderTest.rmAssetsHaveAttributes = false;
        expect(classUnderTest.shouldDisplayPricing({ rightsManaged: 'Rights Managed', attributes: false as any })).toBe(false);
      });
    });

    describe('shouldShowTargets()', () => {
      it('returns true when transcodeTargets exist and have a length greater than 0', () => {
        let lineItem: any = { transcodeTargets: ['native', '10mbH264', 'xconvert_prores_hd'] };
        expect(classUnderTest.shouldShowTargets(lineItem)).toBe(true);
      });

      it('returns false when transcodeTargets exist, but have a zero length', () => {
        let lineItem: any = { transcodeTargets: [] };
        expect(classUnderTest.shouldShowTargets(lineItem)).toBe(false);
      });
    });

    describe('shouldDisplayRights()', () => {
      it('returns true when the line item is rights managed and quote is NOT a Trial', () => {
        let lineItem: any = { rightsManaged: 'Rights Managed' };
        classUnderTest.quoteType = 'Not Trial' as any;
        expect(classUnderTest.shouldDisplayRights(lineItem)).toBe(true);
      });

      it('returns false when the line item is royalty-free', () => {
        let lineItem: any = { rightsManaged: 'Royalty Free' };
        expect(classUnderTest.shouldDisplayRights(lineItem)).toBe(false);
      });

      it('returns false when the quote is a Trial', () => {
        let lineItem: any = { rightsManaged: 'Rights Managed' };
        classUnderTest.quoteType = 'Trial';
        expect(classUnderTest.shouldDisplayRights(lineItem)).toBe(false);
      });
    });

    describe('onAddCustomPrice()', () => {
      it('emits the lineItemsNotify event with the right type and payload', () => {
        classUnderTest.onAddCustomPrice({ some: 'lineItem' } as any);

        classUnderTest.lineItemsNotify.subscribe((event: any) => {
          expect(event).toEqual({ type: 'ADD_CUSTOM_PRICE', payload: { some: 'lineItem' } });
        });
      });
    });


    describe('iconForNotesButton()', () => {
      it('returns \'keyboard_arrow_down\' when the note is not visble', () => {
        const mockLineItem: any = { id: 'abc' };
        expect(classUnderTest.iconForNotesButton(mockLineItem)).toBe('keyboard_arrow_down');
      });

      it('returns \'keyboard_arrow_up\' when the note is visble', () => {
        const mockLineItem: any = { id: 'abc' };
        classUnderTest.toggleNotesVisibilityFor(mockLineItem);
        expect(classUnderTest.iconForNotesButton(mockLineItem)).toBe('keyboard_arrow_up');
      });
    });

    describe('toggleNotesVisibilityFor()', () => {
      it('toggles the boolean for the given lineItem', () => {
        const mockLineItem: any = { id: 'xyz-789', notes: [{ notes: ['a note'] }] };

        expect(classUnderTest.noteVisibilityMap[mockLineItem.id]).toBeFalsy(); // starts as undefined
        classUnderTest.toggleNotesVisibilityFor(mockLineItem);
        expect(classUnderTest.noteVisibilityMap[mockLineItem.id]).toBe(true);
        classUnderTest.toggleNotesVisibilityFor(mockLineItem);
        expect(classUnderTest.noteVisibilityMap[mockLineItem.id]).toBe(false);
      });
    });

    describe('hasNotes()', () => {
      describe('returns true', () => {
        it('when the lineItem has at least 1 note', () => {
          expect(classUnderTest.hasNotes({ notes: [{ notes: ['a note'] }] })).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the lineItem does not have a note', () => {
          expect(classUnderTest.hasNotes({ notes: [{ notes: [] }] })).toBe(false);
        });

        it('when the lineItem does not have a notes property in the notes', () => {
          expect(classUnderTest.hasNotes({ notes: [{}] } as any)).toBe(false);
        });

        it('when the notes property on the lineItem is empty', () => {
          expect(classUnderTest.hasNotes({ notes: [] } as any)).toBe(false);
        });

        it('when there is no notes property on the lineItem', () => {
          expect(classUnderTest.hasNotes({})).toBe(false);
        });
      });
    });

    describe('shouldShowNoteFor()', () => {
      describe('returns true', () => {
        it('when the lineItem has notes and the toggle is true', () => {
          const mockLineItem: any = { id: 'abc-123', notes: [{ notes: ['a note'] }] };
          classUnderTest.toggleNotesVisibilityFor(mockLineItem); // toggle to true, because it starts as undefined

          expect(classUnderTest.shouldShowNoteFor(mockLineItem)).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the lineItem doesn\'t have notes', () => {
          const mockLineItem: any = { id: 'def-456' };
          expect(classUnderTest.shouldShowNoteFor(mockLineItem)).toBe(false);
        });

        it('when the lineItem does have notes, but the toggle is false', () => {
          const mockLineItem: any = { id: 'abc-123', notes: [{ notes: ['a note'] }] };
          expect(classUnderTest.shouldShowNoteFor(mockLineItem)).toBe(false);
        });
      });
    });
  });
}
