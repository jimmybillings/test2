import { WzGalleryTwoLevelComponent } from './wz.gallery-two-level.component';

export function main() {
  describe('Two Level View Component', () => {
    let componentUnderTest: WzGalleryTwoLevelComponent;

    beforeEach(() => {
      componentUnderTest = new WzGalleryTwoLevelComponent();
      componentUnderTest.navigate.emit = jasmine.createSpy('navigate emitter');
    });

    describe('onClick()', () => {
      let mockResult: any;
      let mockChildResult: any;

      beforeEach(() => {
        mockResult = { id: 42, name: 'A name' };
        mockChildResult = { id: 87, name: 'Another name', hasMore: true };
      });

      it('emits the expected event when the clicked child has children', () => {
        componentUnderTest.onClick(mockResult, mockChildResult);

        expect(componentUnderTest.navigate.emit)
          .toHaveBeenCalledWith({ pathSegment: { ids: [42, 87], names: ['A name', 'Another name'] }, method: 'nextLevel' });
      });

      it('emits the expected event when the clicked child does not have children', () => {
        mockChildResult.hasMore = false;
        componentUnderTest.onClick(mockResult, mockChildResult);

        expect(componentUnderTest.navigate.emit)
          .toHaveBeenCalledWith({ pathSegment: { ids: [42, 87], names: ['A name', 'Another name'] }, method: 'search' });
      });
    });
  });
}
