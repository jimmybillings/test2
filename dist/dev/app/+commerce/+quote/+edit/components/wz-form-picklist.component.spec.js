"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_form_picklist_component_1 = require("./wz-form-picklist.component");
function main() {
    describe('Wz Form Picklist Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new wz_form_picklist_component_1.WzFormPicklistComponent(null, null, null);
        });
        describe('onSelectSuggestion()', function () {
            it('Should emit a formSubmit event with a suggestion', function () {
                spyOn(componentUnderTest.selectContact, 'emit');
                componentUnderTest.onSelectChange({ id: 1, Account: 'some account' });
                expect(componentUnderTest.selectContact.emit).toHaveBeenCalledWith({ id: 1, Account: 'some account' });
            });
        });
        describe('set displayProperties()', function () {
            it('Should parse the properties into translation strings', function () {
                var mockProperties = {
                    contactEmail: 'mjustus.wazee+invoice1@gmail.com',
                    contacts: [{ some: 'contact' }],
                    name: 'JUSTUS',
                    id: 7845
                };
                componentUnderTest.displayProperties = mockProperties;
                var parsedProperties;
                componentUnderTest.labels.subscribe(function (labels) { return parsedProperties = labels; });
                expect(parsedProperties).toEqual([{ 'label': 'QUOTE.EDIT.CONTACT_EMAIL_KEY', 'value': 'mjustus.wazee+invoice1@gmail.com' }]);
            });
            it('Should not error if an undefined input is passed to display properties', function () {
                var mockProperties;
                var parsedProperties;
                componentUnderTest.displayProperties = mockProperties;
                componentUnderTest.labels.subscribe(function (labels) { return parsedProperties = labels; });
                expect(parsedProperties).toEqual([]);
            });
        });
        describe('onCheckboxChange()', function () {
            it('emits the checkboxChange event', function () {
                spyOn(componentUnderTest.checkboxChange, 'emit');
                componentUnderTest.onCheckboxChange({ some: 'event' });
                expect(componentUnderTest.checkboxChange.emit).toHaveBeenCalledWith({ some: 'event' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvd3otZm9ybS1waWNrbGlzdC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJFQUF1RTtBQUV2RTtJQUNFLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtRQUNyQyxJQUFJLGtCQUEyQyxDQUFDO1FBRWhELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksb0RBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixFQUFFLENBQUMsa0RBQWtELEVBQUU7Z0JBQ3JELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2hELGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ3pHLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMseUJBQXlCLEVBQUU7WUFDbEMsRUFBRSxDQUFDLHNEQUFzRCxFQUFFO2dCQUN6RCxJQUFJLGNBQWMsR0FBUztvQkFDekIsWUFBWSxFQUFFLGtDQUFrQztvQkFDaEQsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7b0JBQy9CLElBQUksRUFBRSxRQUFRO29CQUNkLEVBQUUsRUFBRSxJQUFJO2lCQUNULENBQUM7Z0JBRUYsa0JBQWtCLENBQUMsaUJBQWlCLEdBQUcsY0FBYyxDQUFDO2dCQUN0RCxJQUFJLGdCQUFzQixDQUFDO2dCQUMzQixrQkFBa0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsZ0JBQWdCLEdBQUcsTUFBTSxFQUF6QixDQUF5QixDQUFDLENBQUM7Z0JBQ3pFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvSCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx3RUFBd0UsRUFBRTtnQkFDM0UsSUFBSSxjQUFvQixDQUFDO2dCQUN6QixJQUFJLGdCQUFzQixDQUFDO2dCQUMzQixrQkFBa0IsQ0FBQyxpQkFBaUIsR0FBRyxjQUFjLENBQUM7Z0JBQ3RELGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxnQkFBZ0IsR0FBRyxNQUFNLEVBQXpCLENBQXlCLENBQUMsQ0FBQztnQkFDekUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO2dCQUNuQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQVMsQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDekYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhERCxvQkFnREMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvK2VkaXQvY29tcG9uZW50cy93ei1mb3JtLXBpY2tsaXN0LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV3pGb3JtUGlja2xpc3RDb21wb25lbnQgfSBmcm9tICcuL3d6LWZvcm0tcGlja2xpc3QuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBGb3JtIFBpY2tsaXN0IENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBXekZvcm1QaWNrbGlzdENvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFd6Rm9ybVBpY2tsaXN0Q29tcG9uZW50KG51bGwsIG51bGwsIG51bGwpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uU2VsZWN0U3VnZ2VzdGlvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBlbWl0IGEgZm9ybVN1Ym1pdCBldmVudCB3aXRoIGEgc3VnZ2VzdGlvbicsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdENvbnRhY3QsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblNlbGVjdENoYW5nZSh7IGlkOiAxLCBBY2NvdW50OiAnc29tZSBhY2NvdW50JyB9KTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZWxlY3RDb250YWN0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgaWQ6IDEsIEFjY291bnQ6ICdzb21lIGFjY291bnQnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2V0IGRpc3BsYXlQcm9wZXJ0aWVzKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIHBhcnNlIHRoZSBwcm9wZXJ0aWVzIGludG8gdHJhbnNsYXRpb24gc3RyaW5ncycsICgpID0+IHtcbiAgICAgICAgbGV0IG1vY2tQcm9wZXJ0aWVzOiBQb2pvID0ge1xuICAgICAgICAgIGNvbnRhY3RFbWFpbDogJ21qdXN0dXMud2F6ZWUraW52b2ljZTFAZ21haWwuY29tJyxcbiAgICAgICAgICBjb250YWN0czogW3sgc29tZTogJ2NvbnRhY3QnIH1dLFxuICAgICAgICAgIG5hbWU6ICdKVVNUVVMnLFxuICAgICAgICAgIGlkOiA3ODQ1XG4gICAgICAgIH07XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRpc3BsYXlQcm9wZXJ0aWVzID0gbW9ja1Byb3BlcnRpZXM7XG4gICAgICAgIGxldCBwYXJzZWRQcm9wZXJ0aWVzOiBQb2pvO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubGFiZWxzLnN1YnNjcmliZShsYWJlbHMgPT4gcGFyc2VkUHJvcGVydGllcyA9IGxhYmVscyk7XG4gICAgICAgIGV4cGVjdChwYXJzZWRQcm9wZXJ0aWVzKS50b0VxdWFsKFt7ICdsYWJlbCc6ICdRVU9URS5FRElULkNPTlRBQ1RfRU1BSUxfS0VZJywgJ3ZhbHVlJzogJ21qdXN0dXMud2F6ZWUraW52b2ljZTFAZ21haWwuY29tJyB9XSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBub3QgZXJyb3IgaWYgYW4gdW5kZWZpbmVkIGlucHV0IGlzIHBhc3NlZCB0byBkaXNwbGF5IHByb3BlcnRpZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtb2NrUHJvcGVydGllczogUG9qbztcbiAgICAgICAgbGV0IHBhcnNlZFByb3BlcnRpZXM6IFBvam87XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5kaXNwbGF5UHJvcGVydGllcyA9IG1vY2tQcm9wZXJ0aWVzO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubGFiZWxzLnN1YnNjcmliZShsYWJlbHMgPT4gcGFyc2VkUHJvcGVydGllcyA9IGxhYmVscyk7XG4gICAgICAgIGV4cGVjdChwYXJzZWRQcm9wZXJ0aWVzKS50b0VxdWFsKFtdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ2hlY2tib3hDaGFuZ2UoKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgY2hlY2tib3hDaGFuZ2UgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5jaGVja2JveENoYW5nZSwgJ2VtaXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ2hlY2tib3hDaGFuZ2UoeyBzb21lOiAnZXZlbnQnIH0gYXMgYW55KTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jaGVja2JveENoYW5nZS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHNvbWU6ICdldmVudCcgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
