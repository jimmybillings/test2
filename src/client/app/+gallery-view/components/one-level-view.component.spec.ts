import { OneLevelViewComponent } from './one-level-view.component';

export function main() {
  describe('One Level View Component', () => {
    let componentUnderTest: OneLevelViewComponent;

    beforeEach(() => {
      componentUnderTest = new OneLevelViewComponent();
      componentUnderTest.navigate.emit = jasmine.createSpy('navigate emitter');
    });

    describe('onClick()', () => {
      let mockResult: any;

      beforeEach(() => {
        mockResult = { id: 42, name: 'A name', hasMore: true };
      });

      it('emits the expected event when the clicked result has children', () => {
        componentUnderTest.onClick(mockResult);

        expect(componentUnderTest.navigate.emit)
          .toHaveBeenCalledWith({ pathSegment: { ids: [42], names: ['A name'] }, method: 'nextLevel' });
      });

      it('emits the expected event when the clicked result does not have children', () => {
        mockResult.hasMore = false;
        componentUnderTest.onClick(mockResult);

        expect(componentUnderTest.navigate.emit)
          .toHaveBeenCalledWith({ pathSegment: { ids: [42], names: ['A name'] }, method: 'search' });
      });
    });
  });
}
