import { WzGalleryBreadcrumbComponent } from './wz.gallery-breadcrumb.component';

export function main() {
  describe('Wz Gallery Breadcrumb Component', () => {
    let componentUnderTest: WzGalleryBreadcrumbComponent;

    beforeEach(() => {
      componentUnderTest = new WzGalleryBreadcrumbComponent();
    });

    describe('breadcrumbLabelFor', () => {
      it('returns empty string for an undefined segment', () => {
        expect(componentUnderTest.breadcrumbLabelFor(undefined)).toEqual('');
      });

      it('returns empty string for a null segment', () => {
        expect(componentUnderTest.breadcrumbLabelFor(null)).toEqual('');
      });

      it('returns empty string for a segment with undefined names', () => {
        expect(componentUnderTest.breadcrumbLabelFor({})).toEqual('');
      });

      it('returns empty string for a segment with null names', () => {
        expect(componentUnderTest.breadcrumbLabelFor({ names: null })).toEqual('');
      });

      it('returns a simple name for a segment with one name', () => {
        expect(componentUnderTest.breadcrumbLabelFor({ names: ['name 1'] })).toEqual('name 1');
      });

      it('returns a compound name for a segment with two names', () => {
        expect(componentUnderTest.breadcrumbLabelFor({ names: ['name 1', 'name 2'] }))
          .toEqual('name 1 : name 2');
      });
    });
  });
}
