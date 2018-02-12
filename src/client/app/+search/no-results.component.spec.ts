import { NoResultsComponent } from './no-results.component';

export function main() {
  describe('No Results Component', () => {
    let componentUnderTest: NoResultsComponent;

    beforeEach(() => {
      componentUnderTest = new NoResultsComponent();
    });

    it('has no testable functionality', () => {
      expect(true).toBe(true);
    });
  });
};
