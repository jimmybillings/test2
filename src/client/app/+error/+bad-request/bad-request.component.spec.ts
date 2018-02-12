import { BadRequestComponent } from './bad-request.component';

export function main() {
  describe('Not Found Component', () => {
    let componentUnderTest: BadRequestComponent;

    beforeEach(() => {
      componentUnderTest = new BadRequestComponent(null);
    });

    it('***** DOESN\'T HAVE ANY TESTABLE FUNCTIONALITY! *****', () => {
      expect(true).toBe(true);
    });
  });
}
