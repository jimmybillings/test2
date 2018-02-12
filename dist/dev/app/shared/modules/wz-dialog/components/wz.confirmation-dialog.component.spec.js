"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_confirmation_dialog_component_1 = require("./wz.confirmation-dialog.component");
function main() {
    describe('Wz Confirmation Dialog Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new wz_confirmation_dialog_component_1.WzConfirmationDialogComponent();
        });
        describe('onClickAccept', function () {
            it('should emit the accept event', function () {
                spyOn(componentUnderTest.accept, 'emit');
                componentUnderTest.onClickAccept();
                expect(componentUnderTest.accept.emit).toHaveBeenCalled();
            });
        });
        describe('onClickDecline', function () {
            it('should emit the decline event', function () {
                spyOn(componentUnderTest.decline, 'emit');
                componentUnderTest.onClickDecline();
                expect(componentUnderTest.decline.emit).toHaveBeenCalled();
            });
        });
        describe('get title()', function () {
            describe('returns the Translation object', function () {
                it('when the input string is just a translation key', function () {
                    componentUnderTest.strings = { title: 'SOME.KEY' };
                    expect(componentUnderTest.title).toEqual({ key: 'SOME.KEY', values: {} });
                });
                it('when the input string is a TranslationKeyValuesObject', function () {
                    componentUnderTest.strings = { title: { key: 'SOME.KEY', values: { collectionName: 'Some Collection' } } };
                    expect(componentUnderTest.title).toEqual({ key: 'SOME.KEY', values: { collectionName: 'Some Collection' } });
                });
            });
        });
        describe('get message()', function () {
            describe('returns the Translation object', function () {
                it('when the input string is just a translation key', function () {
                    componentUnderTest.strings = { message: 'SOME.KEY' };
                    expect(componentUnderTest.message).toEqual({ key: 'SOME.KEY', values: {} });
                });
                it('when the input string is a TranslationKeyAndValues Object', function () {
                    componentUnderTest.strings = { message: { key: 'SOME.KEY', values: { collectionName: 'Some Collection' } } };
                    expect(componentUnderTest.message).toEqual({ key: 'SOME.KEY', values: { collectionName: 'Some Collection' } });
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvY29tcG9uZW50cy93ei5jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUZBQW1GO0FBRW5GO0lBQ0UsUUFBUSxDQUFDLGtDQUFrQyxFQUFFO1FBQzNDLElBQUksa0JBQWlELENBQUM7UUFFdEQsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUcsSUFBSSxnRUFBNkIsRUFBRSxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUN4QixFQUFFLENBQUMsOEJBQThCLEVBQUU7Z0JBQ2pDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNuQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixFQUFFLENBQUMsK0JBQStCLEVBQUU7Z0JBQ2xDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNwQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEIsUUFBUSxDQUFDLGdDQUFnQyxFQUFFO2dCQUN6QyxFQUFFLENBQUMsaURBQWlELEVBQUU7b0JBQ3BELGtCQUFrQixDQUFDLE9BQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQztvQkFDbkQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyx1REFBdUQsRUFBRTtvQkFDMUQsa0JBQWtCLENBQUMsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQzNHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDL0csQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUN4QixRQUFRLENBQUMsZ0NBQWdDLEVBQUU7Z0JBQ3pDLEVBQUUsQ0FBQyxpREFBaUQsRUFBRTtvQkFDcEQsa0JBQWtCLENBQUMsT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO29CQUNyRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDOUUsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLDJEQUEyRCxFQUFFO29CQUM5RCxrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFDN0csTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNqSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwREQsb0JBb0RDIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvY29tcG9uZW50cy93ei5jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV3pDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3d6LmNvbmZpcm1hdGlvbi1kaWFsb2cuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBDb25maXJtYXRpb24gRGlhbG9nIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBXekNvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFd6Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25DbGlja0FjY2VwdCcsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZW1pdCB0aGUgYWNjZXB0IGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QuYWNjZXB0LCAnZW1pdCcpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25DbGlja0FjY2VwdCgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFjY2VwdC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbkNsaWNrRGVjbGluZScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZW1pdCB0aGUgZGVjbGluZSBldmVudCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LmRlY2xpbmUsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNsaWNrRGVjbGluZSgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmRlY2xpbmUuZW1pdCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHRpdGxlKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0aGUgVHJhbnNsYXRpb24gb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgaW5wdXQgc3RyaW5nIGlzIGp1c3QgYSB0cmFuc2xhdGlvbiBrZXknLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnN0cmluZ3MgPSB7IHRpdGxlOiAnU09NRS5LRVknIH07XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50aXRsZSkudG9FcXVhbCh7IGtleTogJ1NPTUUuS0VZJywgdmFsdWVzOiB7fSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIGlucHV0IHN0cmluZyBpcyBhIFRyYW5zbGF0aW9uS2V5VmFsdWVzT2JqZWN0JywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zdHJpbmdzID0geyB0aXRsZTogeyBrZXk6ICdTT01FLktFWScsIHZhbHVlczogeyBjb2xsZWN0aW9uTmFtZTogJ1NvbWUgQ29sbGVjdGlvbicgfSB9IH07XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50aXRsZSkudG9FcXVhbCh7IGtleTogJ1NPTUUuS0VZJywgdmFsdWVzOiB7IGNvbGxlY3Rpb25OYW1lOiAnU29tZSBDb2xsZWN0aW9uJyB9IH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBtZXNzYWdlKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0aGUgVHJhbnNsYXRpb24gb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgaW5wdXQgc3RyaW5nIGlzIGp1c3QgYSB0cmFuc2xhdGlvbiBrZXknLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnN0cmluZ3MgPSB7IG1lc3NhZ2U6ICdTT01FLktFWScgfTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm1lc3NhZ2UpLnRvRXF1YWwoeyBrZXk6ICdTT01FLktFWScsIHZhbHVlczoge30gfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBpbnB1dCBzdHJpbmcgaXMgYSBUcmFuc2xhdGlvbktleUFuZFZhbHVlcyBPYmplY3QnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnN0cmluZ3MgPSB7IG1lc3NhZ2U6IHsga2V5OiAnU09NRS5LRVknLCB2YWx1ZXM6IHsgY29sbGVjdGlvbk5hbWU6ICdTb21lIENvbGxlY3Rpb24nIH0gfSB9O1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubWVzc2FnZSkudG9FcXVhbCh7IGtleTogJ1NPTUUuS0VZJywgdmFsdWVzOiB7IGNvbGxlY3Rpb25OYW1lOiAnU29tZSBDb2xsZWN0aW9uJyB9IH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
