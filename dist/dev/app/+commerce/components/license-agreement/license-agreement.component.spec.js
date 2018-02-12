"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var license_agreement_component_1 = require("./license-agreement.component");
function main() {
    describe('License Agreement Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new license_agreement_component_1.LicenseAgreementComponent();
        });
        describe('labelForLicense()', function () {
            it('should be equal to license.rights if the projectType does not exist', function () {
                var license = { rights: 'Rights Managed', matchingAssets: [], document: null };
                expect(componentUnderTest.labelForLicense(license)).toEqual('Rights Managed');
            });
            it('should be equal to license.rights if the projectType exist and the rights value is not Rights Managed', function () {
                var license = { projectType: 'proj', rights: 'Royalty Free', matchingAssets: [], document: null };
                expect(componentUnderTest.labelForLicense(license)).toEqual('Royalty Free');
            });
            it('should be equal to license.projectType if the projectType exist and the rights value is Rights Managed', function () {
                var license = { projectType: 'proj', rights: 'Rights Managed', matchingAssets: [], document: null };
                expect(componentUnderTest.labelForLicense(license)).toEqual('proj');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saWNlbnNlLWFncmVlbWVudC9saWNlbnNlLWFncmVlbWVudC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZFQUEwRTtBQUcxRTtJQUNFLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRTtRQUN0QyxJQUFJLGtCQUE2QyxDQUFDO1FBRWxELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksdURBQXlCLEVBQUUsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixFQUFFLENBQUMscUVBQXFFLEVBQUU7Z0JBQ3hFLElBQU0sT0FBTyxHQUFxQixFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDbkcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHVHQUF1RyxFQUFFO2dCQUMxRyxJQUFNLE9BQU8sR0FBcUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RILE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDOUUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsd0dBQXdHLEVBQUU7Z0JBQzNHLElBQU0sT0FBTyxHQUFxQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN4SCxNQUFNLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF6QkQsb0JBeUJDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saWNlbnNlLWFncmVlbWVudC9saWNlbnNlLWFncmVlbWVudC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpY2Vuc2VBZ3JlZW1lbnRDb21wb25lbnQgfSBmcm9tICcuL2xpY2Vuc2UtYWdyZWVtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaWNlbnNlQWdyZWVtZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdMaWNlbnNlIEFncmVlbWVudCBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogTGljZW5zZUFncmVlbWVudENvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IExpY2Vuc2VBZ3JlZW1lbnRDb21wb25lbnQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsYWJlbEZvckxpY2Vuc2UoKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgYmUgZXF1YWwgdG8gbGljZW5zZS5yaWdodHMgaWYgdGhlIHByb2plY3RUeXBlIGRvZXMgbm90IGV4aXN0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBsaWNlbnNlOiBMaWNlbnNlQWdyZWVtZW50ID0geyByaWdodHM6ICdSaWdodHMgTWFuYWdlZCcsIG1hdGNoaW5nQXNzZXRzOiBbXSwgZG9jdW1lbnQ6IG51bGwgfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5sYWJlbEZvckxpY2Vuc2UobGljZW5zZSkpLnRvRXF1YWwoJ1JpZ2h0cyBNYW5hZ2VkJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBiZSBlcXVhbCB0byBsaWNlbnNlLnJpZ2h0cyBpZiB0aGUgcHJvamVjdFR5cGUgZXhpc3QgYW5kIHRoZSByaWdodHMgdmFsdWUgaXMgbm90IFJpZ2h0cyBNYW5hZ2VkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBsaWNlbnNlOiBMaWNlbnNlQWdyZWVtZW50ID0geyBwcm9qZWN0VHlwZTogJ3Byb2onLCByaWdodHM6ICdSb3lhbHR5IEZyZWUnLCBtYXRjaGluZ0Fzc2V0czogW10sIGRvY3VtZW50OiBudWxsIH07XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubGFiZWxGb3JMaWNlbnNlKGxpY2Vuc2UpKS50b0VxdWFsKCdSb3lhbHR5IEZyZWUnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGJlIGVxdWFsIHRvIGxpY2Vuc2UucHJvamVjdFR5cGUgaWYgdGhlIHByb2plY3RUeXBlIGV4aXN0IGFuZCB0aGUgcmlnaHRzIHZhbHVlIGlzIFJpZ2h0cyBNYW5hZ2VkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBsaWNlbnNlOiBMaWNlbnNlQWdyZWVtZW50ID0geyBwcm9qZWN0VHlwZTogJ3Byb2onLCByaWdodHM6ICdSaWdodHMgTWFuYWdlZCcsIG1hdGNoaW5nQXNzZXRzOiBbXSwgZG9jdW1lbnQ6IG51bGwgfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5sYWJlbEZvckxpY2Vuc2UobGljZW5zZSkpLnRvRXF1YWwoJ3Byb2onKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
