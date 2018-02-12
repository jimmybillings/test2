import { FooterComponent } from './footer.component';
import { Observable } from 'rxjs/Observable';

export function main() {
  let componentUnderTest: FooterComponent;

  describe('Footer Component', () => {
    beforeEach(() => {
      componentUnderTest = new FooterComponent();
    });

    describe('privacyPolicyExists', () => {
      it('returns true when the config is loaded and has a privacyPolicyId value', () => {
        componentUnderTest.config = { privacyPolicyId: { value: '12' } };
        expect(componentUnderTest.privacyPolicyExists).toBe(true);
      });

      describe('returns false', () => {
        it('when the config is not yet loaded', () => {
          componentUnderTest.config = undefined;
          expect(componentUnderTest.privacyPolicyExists).toBe(undefined);
        });

        it('when the config does not have a privacyPolicyId value', () => {
          componentUnderTest.config = {};
          expect(componentUnderTest.privacyPolicyExists).toBe(false);
        });
      });
    });

    describe('showCont', () => {
      describe('returns true', () => {
        it('when the object is valid', () => {
          componentUnderTest.config = { contacts: { items: [{ some: 'item' }] } };

          expect(componentUnderTest.showContacts).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the object has an empty items array', () => {
          componentUnderTest.config = { contacts: { items: [] } };

          expect(componentUnderTest.showContacts).toBe(false);
        });

        it('when the object does not have an items property', () => {
          componentUnderTest.config = { contacts: {} };

          expect(componentUnderTest.showContacts).toBe(false);
        });

        it('when the object does not have a contacts property', () => {
          componentUnderTest.config = {};

          expect(componentUnderTest.showContacts).toBe(false);
        });
      });
    });
  });
}
