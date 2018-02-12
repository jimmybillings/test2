import { ServerErrorComponent } from './server-error.component';

export function main() {
  describe('Not Found Component', () => {
    let componentUnderTest: ServerErrorComponent;

    beforeEach(() => {
      componentUnderTest = new ServerErrorComponent(null);
    });

    it('***** DOESN\'T HAVE ANY TESTABLE FUNCTIONALITY! *****', () => {
      expect(true).toBe(true);
    });
  });
}
