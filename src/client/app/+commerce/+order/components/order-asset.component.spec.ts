import { OrderAssetComponent } from './order-asset.component';

export function main() {
  describe('Order Asset Component', () => {
    let componentUnderTest: OrderAssetComponent;

    beforeEach(() => {
      componentUnderTest = new OrderAssetComponent(null);
    });

    it('has no testable functionality', () => {
      expect(true).toBe(true);
    });
  });
}
