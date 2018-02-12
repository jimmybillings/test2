import { Tab } from './tab';

export function main() {
  describe('Cart Tab Base Class', () => {
    let classUnderTest: Tab;

    beforeEach(() => {
      classUnderTest = new Tab();
      classUnderTest.notify.emit = jasmine.createSpy('notify emitter');
    });

    describe('goToPreviousTab()', () => {
      it('emits the expected event', () => {
        classUnderTest.goToPreviousTab();

        expect(classUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'GO_TO_PREVIOUS_TAB' });
      });
    });

    describe('goToNextTab()', () => {
      it('emits the expected event', () => {
        classUnderTest.goToNextTab();

        expect(classUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'GO_TO_NEXT_TAB' });
      });
    });

    describe('goToTab()', () => {
      it('emits the expected event', () => {
        classUnderTest.goToTab(1);

        expect(classUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'GO_TO_TAB', payload: 1 });
      });
    });
  });
};
