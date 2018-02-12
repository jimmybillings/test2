import { AssetShareComponent } from './asset-share.component';
import { mockCommerceAssetLineItem } from '../../shared/mocks/mock-asset';
import * as EnhancedMock from '../../shared/interfaces/enhanced-asset';


export function main() {
  describe('Asset Share Component', () => {
    let componentUnderTest: AssetShareComponent;
    let mockEnhancedAsset: EnhancedMock.EnhancedAsset;

    beforeEach(() => {
      componentUnderTest = new AssetShareComponent(null);
    });

    describe('enhancedAsset setter', () => {
      beforeEach(() => {
        spyOn(componentUnderTest, 'closeAssetShare');
        mockEnhancedAsset = EnhancedMock.enhanceAsset(mockCommerceAssetLineItem.asset, null);
        componentUnderTest.enhancedAsset = mockEnhancedAsset;
      });

      // it('should set the currentAsset', () => {
      //   expect(componentUnderTest.currentAsset).toEqual(mockEnhancedAsset);
      // });

      // it('should call closeAssetShare()', () => {
      //   expect(componentUnderTest.close).toHaveBeenCalled();
      // });
    });
  });
};

