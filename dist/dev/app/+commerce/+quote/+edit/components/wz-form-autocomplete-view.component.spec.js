"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_form_autocomplete_view_component_1 = require("./wz-form-autocomplete-view.component");
function main() {
    describe('Wz Form Auto Complete View Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new wz_form_autocomplete_view_component_1.WzFormAutoCompleteViewComponent(null, null, null);
        });
        describe('onSelectSuggestion()', function () {
            it('Should emit a formSubmit event with a suggestion', function () {
                spyOn(componentUnderTest.formSubmit, 'emit');
                componentUnderTest.onSelectSuggestion({ id: 1, Account: 'some account' });
                expect(componentUnderTest.formSubmit.emit).toHaveBeenCalledWith({ id: 1, Account: 'some account' });
            });
        });
        describe('set displayProperties()', function () {
            it('Should parse the properties into translation strings', function () {
                var mockProperties = {
                    id: 53,
                    customerName: 'James Billings',
                    email: 'james.billings@wazeedigital.com'
                };
                componentUnderTest.displayProperties = mockProperties;
                var parsedProperties;
                componentUnderTest.labels.subscribe(function (labels) { return parsedProperties = labels; });
                expect(parsedProperties).toEqual([{ label: 'QUOTE.EDIT.CUSTOMER_NAME_KEY', value: 'James Billings' }]);
            });
            it('Should not error if an undefined input is passed to display properties', function () {
                var mockProperties;
                var parsedProperties;
                componentUnderTest.displayProperties = mockProperties;
                componentUnderTest.labels.subscribe(function (labels) { return parsedProperties = labels; });
                expect(parsedProperties).toEqual([]);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvd3otZm9ybS1hdXRvY29tcGxldGUtdmlldy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZGQUF3RjtBQUV4RjtJQUNFLFFBQVEsQ0FBQyxzQ0FBc0MsRUFBRTtRQUMvQyxJQUFJLGtCQUFtRCxDQUFDO1FBRXhELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUkscUVBQStCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixFQUFFLENBQUMsa0RBQWtELEVBQUU7Z0JBQ3JELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzdDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDMUUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDdEcsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxFQUFFLENBQUMsc0RBQXNELEVBQUU7Z0JBQ3pELElBQUksY0FBYyxHQUFTO29CQUN6QixFQUFFLEVBQUUsRUFBRTtvQkFDTixZQUFZLEVBQUUsZ0JBQWdCO29CQUM5QixLQUFLLEVBQUUsaUNBQWlDO2lCQUN6QyxDQUFDO2dCQUVGLGtCQUFrQixDQUFDLGlCQUFpQixHQUFHLGNBQWMsQ0FBQztnQkFDdEQsSUFBSSxnQkFBc0IsQ0FBQztnQkFDM0Isa0JBQWtCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLGdCQUFnQixHQUFHLE1BQU0sRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekcsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsd0VBQXdFLEVBQUU7Z0JBQzNFLElBQUksY0FBb0IsQ0FBQztnQkFDekIsSUFBSSxnQkFBc0IsQ0FBQztnQkFDM0Isa0JBQWtCLENBQUMsaUJBQWlCLEdBQUcsY0FBYyxDQUFDO2dCQUN0RCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsZ0JBQWdCLEdBQUcsTUFBTSxFQUF6QixDQUF5QixDQUFDLENBQUM7Z0JBQ3pFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdkNELG9CQXVDQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS8rZWRpdC9jb21wb25lbnRzL3d6LWZvcm0tYXV0b2NvbXBsZXRlLXZpZXcuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBXekZvcm1BdXRvQ29tcGxldGVWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi93ei1mb3JtLWF1dG9jb21wbGV0ZS12aWV3LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnV3ogRm9ybSBBdXRvIENvbXBsZXRlIFZpZXcgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFd6Rm9ybUF1dG9Db21wbGV0ZVZpZXdDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBXekZvcm1BdXRvQ29tcGxldGVWaWV3Q29tcG9uZW50KG51bGwsIG51bGwsIG51bGwpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uU2VsZWN0U3VnZ2VzdGlvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBlbWl0IGEgZm9ybVN1Ym1pdCBldmVudCB3aXRoIGEgc3VnZ2VzdGlvbicsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LmZvcm1TdWJtaXQsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblNlbGVjdFN1Z2dlc3Rpb24oeyBpZDogMSwgQWNjb3VudDogJ3NvbWUgYWNjb3VudCcgfSk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybVN1Ym1pdC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGlkOiAxLCBBY2NvdW50OiAnc29tZSBhY2NvdW50JyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NldCBkaXNwbGF5UHJvcGVydGllcygpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBwYXJzZSB0aGUgcHJvcGVydGllcyBpbnRvIHRyYW5zbGF0aW9uIHN0cmluZ3MnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtb2NrUHJvcGVydGllczogUG9qbyA9IHtcbiAgICAgICAgICBpZDogNTMsXG4gICAgICAgICAgY3VzdG9tZXJOYW1lOiAnSmFtZXMgQmlsbGluZ3MnLFxuICAgICAgICAgIGVtYWlsOiAnamFtZXMuYmlsbGluZ3NAd2F6ZWVkaWdpdGFsLmNvbSdcbiAgICAgICAgfTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZGlzcGxheVByb3BlcnRpZXMgPSBtb2NrUHJvcGVydGllcztcbiAgICAgICAgbGV0IHBhcnNlZFByb3BlcnRpZXM6IFBvam87XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5sYWJlbHMuc3Vic2NyaWJlKGxhYmVscyA9PiBwYXJzZWRQcm9wZXJ0aWVzID0gbGFiZWxzKTtcbiAgICAgICAgZXhwZWN0KHBhcnNlZFByb3BlcnRpZXMpLnRvRXF1YWwoW3sgbGFiZWw6ICdRVU9URS5FRElULkNVU1RPTUVSX05BTUVfS0VZJywgdmFsdWU6ICdKYW1lcyBCaWxsaW5ncycgfV0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgbm90IGVycm9yIGlmIGFuIHVuZGVmaW5lZCBpbnB1dCBpcyBwYXNzZWQgdG8gZGlzcGxheSBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbW9ja1Byb3BlcnRpZXM6IFBvam87XG4gICAgICAgIGxldCBwYXJzZWRQcm9wZXJ0aWVzOiBQb2pvO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZGlzcGxheVByb3BlcnRpZXMgPSBtb2NrUHJvcGVydGllcztcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmxhYmVscy5zdWJzY3JpYmUobGFiZWxzID0+IHBhcnNlZFByb3BlcnRpZXMgPSBsYWJlbHMpO1xuICAgICAgICBleHBlY3QocGFyc2VkUHJvcGVydGllcykudG9FcXVhbChbXSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
