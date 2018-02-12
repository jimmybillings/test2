"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_gallery_breadcrumb_component_1 = require("./wz.gallery-breadcrumb.component");
function main() {
    describe('Wz Gallery Breadcrumb Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new wz_gallery_breadcrumb_component_1.WzGalleryBreadcrumbComponent();
        });
        describe('breadcrumbLabelFor', function () {
            it('returns empty string for an undefined segment', function () {
                expect(componentUnderTest.breadcrumbLabelFor(undefined)).toEqual('');
            });
            it('returns empty string for a null segment', function () {
                expect(componentUnderTest.breadcrumbLabelFor(null)).toEqual('');
            });
            it('returns empty string for a segment with undefined names', function () {
                expect(componentUnderTest.breadcrumbLabelFor({})).toEqual('');
            });
            it('returns empty string for a segment with null names', function () {
                expect(componentUnderTest.breadcrumbLabelFor({ names: null })).toEqual('');
            });
            it('returns a simple name for a segment with one name', function () {
                expect(componentUnderTest.breadcrumbLabelFor({ names: ['name 1'] })).toEqual('name 1');
            });
            it('returns a compound name for a segment with two names', function () {
                expect(componentUnderTest.breadcrumbLabelFor({ names: ['name 1', 'name 2'] }))
                    .toEqual('name 1 : name 2');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1nYWxsZXJ5LWJyZWFkY3J1bWIvd3ouZ2FsbGVyeS1icmVhZGNydW1iLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUZBQWlGO0FBRWpGO0lBQ0UsUUFBUSxDQUFDLGlDQUFpQyxFQUFFO1FBQzFDLElBQUksa0JBQWdELENBQUM7UUFFckQsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSw4REFBNEIsRUFBRSxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtnQkFDbEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO2dCQUM1QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMseURBQXlELEVBQUU7Z0JBQzVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxvREFBb0QsRUFBRTtnQkFDdkQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0UsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsbURBQW1ELEVBQUU7Z0JBQ3RELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxzREFBc0QsRUFBRTtnQkFDekQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDM0UsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5DRCxvQkFtQ0MiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LWdhbGxlcnktYnJlYWRjcnVtYi93ei5nYWxsZXJ5LWJyZWFkY3J1bWIuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXekdhbGxlcnlCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi93ei5nYWxsZXJ5LWJyZWFkY3J1bWIuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBHYWxsZXJ5IEJyZWFkY3J1bWIgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFd6R2FsbGVyeUJyZWFkY3J1bWJDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBXekdhbGxlcnlCcmVhZGNydW1iQ29tcG9uZW50KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYnJlYWRjcnVtYkxhYmVsRm9yJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgZW1wdHkgc3RyaW5nIGZvciBhbiB1bmRlZmluZWQgc2VnbWVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5icmVhZGNydW1iTGFiZWxGb3IodW5kZWZpbmVkKSkudG9FcXVhbCgnJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZW1wdHkgc3RyaW5nIGZvciBhIG51bGwgc2VnbWVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5icmVhZGNydW1iTGFiZWxGb3IobnVsbCkpLnRvRXF1YWwoJycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGVtcHR5IHN0cmluZyBmb3IgYSBzZWdtZW50IHdpdGggdW5kZWZpbmVkIG5hbWVzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmJyZWFkY3J1bWJMYWJlbEZvcih7fSkpLnRvRXF1YWwoJycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGVtcHR5IHN0cmluZyBmb3IgYSBzZWdtZW50IHdpdGggbnVsbCBuYW1lcycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5icmVhZGNydW1iTGFiZWxGb3IoeyBuYW1lczogbnVsbCB9KSkudG9FcXVhbCgnJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYSBzaW1wbGUgbmFtZSBmb3IgYSBzZWdtZW50IHdpdGggb25lIG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYnJlYWRjcnVtYkxhYmVsRm9yKHsgbmFtZXM6IFsnbmFtZSAxJ10gfSkpLnRvRXF1YWwoJ25hbWUgMScpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGEgY29tcG91bmQgbmFtZSBmb3IgYSBzZWdtZW50IHdpdGggdHdvIG5hbWVzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmJyZWFkY3J1bWJMYWJlbEZvcih7IG5hbWVzOiBbJ25hbWUgMScsICduYW1lIDInXSB9KSlcbiAgICAgICAgICAudG9FcXVhbCgnbmFtZSAxIDogbmFtZSAyJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
