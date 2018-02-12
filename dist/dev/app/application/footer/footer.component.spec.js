"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var footer_component_1 = require("./footer.component");
function main() {
    var componentUnderTest;
    describe('Footer Component', function () {
        beforeEach(function () {
            componentUnderTest = new footer_component_1.FooterComponent();
        });
        describe('privacyPolicyExists', function () {
            it('returns true when the config is loaded and has a privacyPolicyId value', function () {
                componentUnderTest.config = { privacyPolicyId: { value: '12' } };
                expect(componentUnderTest.privacyPolicyExists).toBe(true);
            });
            describe('returns false', function () {
                it('when the config is not yet loaded', function () {
                    componentUnderTest.config = undefined;
                    expect(componentUnderTest.privacyPolicyExists).toBe(undefined);
                });
                it('when the config does not have a privacyPolicyId value', function () {
                    componentUnderTest.config = {};
                    expect(componentUnderTest.privacyPolicyExists).toBe(false);
                });
            });
        });
        describe('showCont', function () {
            describe('returns true', function () {
                it('when the object is valid', function () {
                    componentUnderTest.config = { contacts: { items: [{ some: 'item' }] } };
                    expect(componentUnderTest.showContacts).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the object has an empty items array', function () {
                    componentUnderTest.config = { contacts: { items: [] } };
                    expect(componentUnderTest.showContacts).toBe(false);
                });
                it('when the object does not have an items property', function () {
                    componentUnderTest.config = { contacts: {} };
                    expect(componentUnderTest.showContacts).toBe(false);
                });
                it('when the object does not have a contacts property', function () {
                    componentUnderTest.config = {};
                    expect(componentUnderTest.showContacts).toBe(false);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXFEO0FBR3JEO0lBQ0UsSUFBSSxrQkFBbUMsQ0FBQztJQUV4QyxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0IsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsRUFBRSxDQUFDLHdFQUF3RSxFQUFFO2dCQUMzRSxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsRUFBRSxlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDakUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO29CQUN0QyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO29CQUN0QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pFLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyx1REFBdUQsRUFBRTtvQkFDMUQsa0JBQWtCLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDL0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3RCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ25CLFFBQVEsQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtvQkFDN0Isa0JBQWtCLENBQUMsTUFBTSxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBRXhFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JELENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsZUFBZSxFQUFFO2dCQUN4QixFQUFFLENBQUMsMENBQTBDLEVBQUU7b0JBQzdDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO29CQUV4RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsaURBQWlELEVBQUU7b0JBQ3BELGtCQUFrQixDQUFDLE1BQU0sR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFFN0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLG1EQUFtRCxFQUFFO29CQUN0RCxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUUvQixNQUFNLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF6REQsb0JBeURDIiwiZmlsZSI6ImFwcC9hcHBsaWNhdGlvbi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogRm9vdGVyQ29tcG9uZW50O1xuXG4gIGRlc2NyaWJlKCdGb290ZXIgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IEZvb3RlckNvbXBvbmVudCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ByaXZhY3lQb2xpY3lFeGlzdHMnLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gdGhlIGNvbmZpZyBpcyBsb2FkZWQgYW5kIGhhcyBhIHByaXZhY3lQb2xpY3lJZCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbmZpZyA9IHsgcHJpdmFjeVBvbGljeUlkOiB7IHZhbHVlOiAnMTInIH0gfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5wcml2YWN5UG9saWN5RXhpc3RzKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgY29uZmlnIGlzIG5vdCB5ZXQgbG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb25maWcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5wcml2YWN5UG9saWN5RXhpc3RzKS50b0JlKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBjb25maWcgZG9lcyBub3QgaGF2ZSBhIHByaXZhY3lQb2xpY3lJZCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29uZmlnID0ge307XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5wcml2YWN5UG9saWN5RXhpc3RzKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93Q29udCcsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBvYmplY3QgaXMgdmFsaWQnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbmZpZyA9IHsgY29udGFjdHM6IHsgaXRlbXM6IFt7IHNvbWU6ICdpdGVtJyB9XSB9IH07XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dDb250YWN0cykudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBvYmplY3QgaGFzIGFuIGVtcHR5IGl0ZW1zIGFycmF5JywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb25maWcgPSB7IGNvbnRhY3RzOiB7IGl0ZW1zOiBbXSB9IH07XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dDb250YWN0cykudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBvYmplY3QgZG9lcyBub3QgaGF2ZSBhbiBpdGVtcyBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29uZmlnID0geyBjb250YWN0czoge30gfTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd0NvbnRhY3RzKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIG9iamVjdCBkb2VzIG5vdCBoYXZlIGEgY29udGFjdHMgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbmZpZyA9IHt9O1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93Q29udGFjdHMpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
