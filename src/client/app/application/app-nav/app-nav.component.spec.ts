import { AppNavComponent } from './app-nav.component';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('App Nav Component', () => {
    let componentUnderTest: AppNavComponent;
    let mockStore: MockAppStore;
    let mockRouter: any;

    beforeEach(() => {
      mockStore = new MockAppStore();
      mockRouter = { navigate: jasmine.createSpy('navigate') };
      componentUnderTest = new AppNavComponent(mockStore, mockRouter);
      componentUnderTest.trigger = { closeMenu: jasmine.createSpy('closeMenu') } as any;
      componentUnderTest.userPreference = {
        toggleSearch: jasmine.createSpy('toggleSearch'),
        toggleCollectionTray: jasmine.createSpy('toggleCollectionTray')
      };
    });

    describe('constructor', () => {
      describe('sets the headerIsFixed instance variable', () => {
        it('to observable of true when the \'isFixed\' value is true in the store', () => {
          mockStore.createStateSection('headerDisplayOptions', { isFixed: true });
          componentUnderTest = new AppNavComponent(mockStore, mockRouter);
          let isFixed: boolean;
          componentUnderTest.headerIsFixed.take(1).subscribe(fixed => isFixed = fixed);
          expect(isFixed).toBe(true);
        });

        it('to observable of false when the \'isFixed\' value is false in the store', () => {
          mockStore.createStateSection('headerDisplayOptions', { isFixed: false });
          componentUnderTest = new AppNavComponent(mockStore, mockRouter);
          let isFixed: boolean;
          componentUnderTest.headerIsFixed.take(1).subscribe(fixed => isFixed = fixed);
          expect(isFixed).toBe(false);
        });
      });

      describe('sets the headerCanBeFixed instance variable', () => {
        it('to observable of true when the \'canBeFixed\' value is true in the store', () => {
          mockStore.createStateSection('headerDisplayOptions', { canBeFixed: true });
          componentUnderTest = new AppNavComponent(mockStore, mockRouter);
          let canBeFixed: boolean;
          componentUnderTest.headerCanBeFixed.take(1).subscribe(fixed => canBeFixed = fixed);
          expect(canBeFixed).toBe(true);
        });

        it('to observable of false when the \'canBeFixed\' value is false in the store', () => {
          mockStore.createStateSection('headerDisplayOptions', { canBeFixed: false });
          componentUnderTest = new AppNavComponent(mockStore, mockRouter);
          let canBeFixed: boolean;
          componentUnderTest.headerCanBeFixed.take(1).subscribe(fixed => canBeFixed = fixed);
          expect(canBeFixed).toBe(false);
        });
      });
    });

    describe('logOut()', () => {
      it('should fire an event to logout a user', () => {
        spyOn(componentUnderTest.onLogOut, 'emit');
        componentUnderTest.logOut(event);
        expect(componentUnderTest.onLogOut.emit).toHaveBeenCalledWith(event);
      });

      it('close the menu', () => {
        componentUnderTest.logOut(event);
        expect(componentUnderTest.trigger.closeMenu).toHaveBeenCalled();
      });

      it('navigates to the root route', () => {
        componentUnderTest.logOut(event);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
      });
    });

    describe('toggleSearch', () => {
      it('should call toggleSearch() on the user preference object', () => {
        componentUnderTest.toggleSearch();
        expect(componentUnderTest.userPreference.toggleSearch).toHaveBeenCalled();
      });
    });

    describe('toggleCollectionTray', () => {
      it('should call toggleCollectionTray() on the user preference object', () => {
        componentUnderTest.toggleCollectionTray();
        expect(componentUnderTest.userPreference.toggleCollectionTray).toHaveBeenCalled();
      });
    });

    describe('formatBadgeNumber()', () => {
      const numbers = [0, 1, 99];

      numbers.forEach((num: number) => {
        it(`should return "${num}" when the size is ${num}`, () => {
          expect(componentUnderTest.formatBadgeNumber(num)).toBe(num.toString());
        });
      });

      it('should return "99+" if the number is larger than 99', () => {
        expect(componentUnderTest.formatBadgeNumber(100)).toBe('99+');
      });
    });

    describe('navigateTo()', () => {
      it('calls navigate() on the router service', () => {
        componentUnderTest.navigateTo('some-path');
        expect(mockRouter.navigate).toHaveBeenCalledWith(['some-path']);
      });
    });
  });
}
