import { GalleryViewCapabilities } from './gallery-view.capabilities';

export function main() {
  describe('Gallery View Capabilities', () => {
    let capabilitiesUnderTest: GalleryViewCapabilities;

    beforeEach(() => {
      capabilitiesUnderTest = new GalleryViewCapabilities();
    });

    it('canHaveGalleryView() should return a fake true for now', () => {
      expect(capabilitiesUnderTest.haveGalleryView()).toBe(true);
    });
  });
}
