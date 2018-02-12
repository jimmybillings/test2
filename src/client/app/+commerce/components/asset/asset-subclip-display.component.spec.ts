import { AssetSubclipDisplayComponent } from './asset-subclip-display.component';
import * as EnhancedMock from '../../../shared/interfaces/enhanced-asset';
import { mockCommerceAsset } from '../../../shared/mocks/mock-asset';

export function main() {
  describe('Asset Subclip Display Component', () => {
    let componentUnderTest: AssetSubclipDisplayComponent;
    let mockEnhancedAsset: EnhancedMock.EnhancedAsset;

    beforeEach(() => {
      mockEnhancedAsset = EnhancedMock.enhanceAsset(mockCommerceAsset, null);
      componentUnderTest = new AssetSubclipDisplayComponent();
      componentUnderTest.asset = EnhancedMock.enhanceAsset(mockCommerceAsset, null);
    });

    describe('isSubclipped getter', () => {
      it('returns true if the asset is subclipped', () => {
        expect(componentUnderTest.isSubclipped).toBe(mockEnhancedAsset.isSubclipped);
      });
    });

    describe('subclipSegmentStyles getter', () => {
      it('returns styles based on the asset', () => {
        expect(componentUnderTest.subclipSegmentStyles).toEqual({
          'margin-left.%': mockEnhancedAsset.inMarkerPercentage,
          'width.%': mockEnhancedAsset.subclipDurationPercentage,
          'min-width.px': 2
        });
      });
    });

    describe('inMarkerFrame getter', () => {
      it('returns the in marker frame from the asset', () => {
        expect(componentUnderTest.inMarkerFrame).toEqual(mockEnhancedAsset.inMarkerFrame);
      });
    });

    describe('outMarkerFrame getter', () => {
      it('returns the out marker frame from the asset', () => {
        expect(componentUnderTest.outMarkerFrame).toEqual(mockEnhancedAsset.outMarkerFrame);
      });
    });

    describe('subclipDurationFrame getter', () => {
      it('returns the subclip duration frame from the asset', () => {
        expect(componentUnderTest.subclipDurationFrame).toEqual(mockEnhancedAsset.subclipDurationFrame);
      });
    });
  });
}
