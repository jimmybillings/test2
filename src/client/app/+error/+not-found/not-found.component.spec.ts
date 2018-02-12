import { NotFoundComponent } from './not-found.component';

export function main() {
  describe('Not Found Component', () => {
    let componentUnderTest: NotFoundComponent;

    beforeEach(() => {
      componentUnderTest = new NotFoundComponent(null);
    });

    it('***** DOESN\'T HAVE ANY TESTABLE FUNCTIONALITY! *****', () => {
      expect(true).toBe(true);
    });
  });
}
