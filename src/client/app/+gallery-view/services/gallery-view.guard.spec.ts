import { GalleryViewGuard } from './gallery-view.guard';

export function main() {
  describe('Gallery View Guard', () => {
    let guardUnderTest: GalleryViewGuard;

    beforeEach(() => {
      guardUnderTest = new GalleryViewGuard();
    });

    it('canActivate() should return a fake true for now', () => {
      expect(guardUnderTest.canActivate()).toBe(true);
    });
  });
}
