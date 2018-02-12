import { MockVideoElement } from './mockVideoElement';

export function main() {
  describe('Mock Video Element', () => {
    let mockVideoElementUnderTest: MockVideoElement;

    beforeEach(() => {
      mockVideoElementUnderTest = new MockVideoElement(true);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
}
