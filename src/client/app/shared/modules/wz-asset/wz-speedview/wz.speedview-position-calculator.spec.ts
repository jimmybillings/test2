import { SpeedViewPositionCalculator, SpeedViewPositionCalculatorInterface } from './wz.speedview-position-calculator';
import { Viewport } from '../../../interfaces/common.interface';

export function main() {
  const mockViewportWidth: number = 240;
  const mockViewportHeight: number = 180;

  describe('Hover Intent directive', () => {
    let objectUnderTest: SpeedViewPositionCalculatorInterface;

    beforeEach(() => {
      objectUnderTest = SpeedViewPositionCalculator;
    });

    describe('should properly determine the x and y coordinates to place the hover preview', () => {

      beforeEach(() => {
        (<any>window).innerHeight = 800;
        (<any>window).innerWidth = 1440;
      });

      it('for an asset with room above, below, and to the right', () => {
        let viewport: Viewport = calculateViewport(100, 300);
        let y: number = viewport.top - (300 / 3);
        expect(objectUnderTest.calculate(viewport)).toEqual({ x: 350, y: y });
      });

      it('for an asset with room above, below, but not to the right', () => {
        let viewport: Viewport = calculateViewport(1000, 300);
        let y: number = viewport.top - (300 / 3);
        expect(objectUnderTest.calculate(viewport)).toEqual({ x: 570, y: y });
      });

      it('for an asset with no room below, but room to the right', () => {
        let viewport: Viewport = calculateViewport(100, 700);
        expect(objectUnderTest.calculate(viewport)).toEqual({ x: 350, y: 480 });
      });

      it('for an asset with no room above, but room to the right', () => {
        let viewport: Viewport = calculateViewport(100, 0);
        expect(objectUnderTest.calculate(viewport)).toEqual({ x: 350, y: 20 });
      });
    });
  });

  function calculateViewport(x: number, y: number): Viewport {
    return {
      left: x,
      top: y,
      right: x + mockViewportWidth,
      bottom: y + mockViewportHeight,
      width: mockViewportWidth,
      height: mockViewportHeight
    };
  }
}
