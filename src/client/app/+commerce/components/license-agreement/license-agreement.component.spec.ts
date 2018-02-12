import { LicenseAgreementComponent } from './license-agreement.component';
import { LicenseAgreement } from '../../../shared/interfaces/commerce.interface';

export function main() {
  describe('License Agreement Component', () => {
    let componentUnderTest: LicenseAgreementComponent;

    beforeEach(() => {
      componentUnderTest = new LicenseAgreementComponent();
    });

    describe('labelForLicense()', () => {
      it('should be equal to license.rights if the projectType does not exist', () => {
        const license: LicenseAgreement = { rights: 'Rights Managed', matchingAssets: [], document: null };
        expect(componentUnderTest.labelForLicense(license)).toEqual('Rights Managed');
      });

      it('should be equal to license.rights if the projectType exist and the rights value is not Rights Managed', () => {
        const license: LicenseAgreement = { projectType: 'proj', rights: 'Royalty Free', matchingAssets: [], document: null };
        expect(componentUnderTest.labelForLicense(license)).toEqual('Royalty Free');
      });

      it('should be equal to license.projectType if the projectType exist and the rights value is Rights Managed', () => {
        const license: LicenseAgreement = { projectType: 'proj', rights: 'Rights Managed', matchingAssets: [], document: null };
        expect(componentUnderTest.labelForLicense(license)).toEqual('proj');
      });
    });
  });
}
