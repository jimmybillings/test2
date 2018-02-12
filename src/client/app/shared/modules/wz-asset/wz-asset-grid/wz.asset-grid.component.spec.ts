import { WzAssetGridComponent } from './wz.asset-grid.component';

export function main() {
  describe('Wz Asset Grid Component', () => {
    let componentUnderTest: WzAssetGridComponent;

    beforeEach(() => {
      componentUnderTest = new WzAssetGridComponent(null, null);
    });

    it('has no testable functionality', () => {
      expect(true).toBe(true);
    });
  });
}
