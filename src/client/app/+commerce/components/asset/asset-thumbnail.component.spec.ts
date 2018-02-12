import { AssetThumbnailComponent } from './asset-thumbnail.component';
import * as EnhancedMock from '../../../shared/interfaces/enhanced-asset';
import { mockCommerceAsset } from '../../../shared/mocks/mock-asset';

export function main() {
  describe('Asset Thumbnail Component', () => {
    let componentUnderTest: AssetThumbnailComponent;
    let mockEnhancedAsset: EnhancedMock.EnhancedAsset;

    beforeEach(() => {
      mockEnhancedAsset = EnhancedMock.enhanceAsset(mockCommerceAsset, 'cart');
      componentUnderTest = new AssetThumbnailComponent();
      componentUnderTest.asset = EnhancedMock.enhanceAsset(mockCommerceAsset, 'cart');
    });

    describe('routerLink()', () => {
      it('returns the enhanced asset\'s router link array', () => {
        expect(componentUnderTest.routerLink).toEqual(mockEnhancedAsset.routerLink);
      });
    });

    describe('durationFrame()', () => {
      it('returns the enhanced asset\'s subclip duration frame', () => {
        expect(componentUnderTest.durationFrame).toEqual(mockEnhancedAsset.durationFrame);
      });
    });

    describe('isImage()', () => {
      it('returns true for an image', () => {
        expect(componentUnderTest.isImage).toBe(mockEnhancedAsset.isImage);
      });
    });

    describe('thumbnailUrl()', () => {
      it('returns the enhanced asset\'s thumbnail URL', () => {
        expect(componentUnderTest.thumbnailUrl).toEqual(mockEnhancedAsset.thumbnailUrl);
      });
    });
  });
}
