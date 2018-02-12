"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var line_item_rights_component_1 = require("./line-item-rights.component");
function main() {
    describe('Line Item Rights Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new line_item_rights_component_1.LineItemRightsComponent();
        });
        describe('attributeName', function () {
            it('returns priceAttributeDisplayName over priceAttributeName', function () {
                expect(componentUnderTest.attributeName({
                    priceAttributeDisplayName: 'A',
                    priceAttributeName: 'a'
                })).toEqual('A');
                expect(componentUnderTest.attributeName({ priceAttributeName: 'a' })).toEqual('a');
            });
        });
        describe('attributeValue', function () {
            it('returns priceAttributeDisplayName over priceAttributeName', function () {
                expect(componentUnderTest.attributeValue({
                    selectedAttributeValue: 'a',
                    selectedAttributeName: 'A'
                })).toEqual('A');
                expect(componentUnderTest.attributeValue({ selectedAttributeValue: 'a' })).toEqual('a');
            });
        });
        describe('rightsManagedDisplayUsage()', function () {
            it('returns true when asset is rights managed and display rights attributes is true', function () {
                componentUnderTest.rightsManaged = 'Rights Managed';
                componentUnderTest.displayRmAttributes = true;
                expect(componentUnderTest.rightsManagedDisplayUsage)
                    .toBe(true);
            });
            it('returns false when asset is rights managed and display rights attributes is false', function () {
                componentUnderTest.rightsManaged = 'Rights Managed';
                componentUnderTest.displayRmAttributes = false;
                expect(componentUnderTest.rightsManagedDisplayUsage)
                    .toBe(false);
            });
            it('returns false when asset is royalty free', function () {
                componentUnderTest.rightsManaged = 'Royalty Free';
                componentUnderTest.displayRmAttributes = true;
                expect(componentUnderTest.rightsManagedDisplayUsage)
                    .toBe(false);
            });
        });
        describe('rightsManagedWithoutUsage()', function () {
            it('returns true when asset is rights managed and display rights attributes is false', function () {
                componentUnderTest.rightsManaged = 'Rights Managed';
                componentUnderTest.displayRmAttributes = false;
                expect(componentUnderTest.rightsManagedWithoutUsage)
                    .toBe(true);
            });
            it('returns false when asset is rights managed and display rights attributes is true', function () {
                componentUnderTest.rightsManaged = 'Rights Managed';
                componentUnderTest.displayRmAttributes = true;
                expect(componentUnderTest.rightsManagedWithoutUsage)
                    .toBe(false);
            });
            it('returns false when asset is royalty free', function () {
                componentUnderTest.rightsManaged = 'Royalty Free';
                componentUnderTest.displayRmAttributes = true;
                expect(componentUnderTest.rightsManagedWithoutUsage)
                    .toBe(false);
            });
        });
        describe('rightsRoyaltyFree()', function () {
            it('returns true when asset rights is royalty free', function () {
                componentUnderTest.rightsManaged = 'Royalty Free';
                expect(componentUnderTest.rightsRoyaltyFree)
                    .toBe(true);
            });
            it('returns false when asset rights is NOT royalty free', function () {
                componentUnderTest.rightsManaged = 'Not Royalty Free';
                expect(componentUnderTest.rightsRoyaltyFree)
                    .toBe(false);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtLXJpZ2h0cy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJFQUF1RTtBQUV2RTtJQUNFLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtRQUNyQyxJQUFJLGtCQUEyQyxDQUFDO1FBRWhELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksb0RBQXVCLEVBQUUsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7WUFDeEIsRUFBRSxDQUFDLDJEQUEyRCxFQUFFO2dCQUM5RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDO29CQUN0Qyx5QkFBeUIsRUFBRSxHQUFHO29CQUM5QixrQkFBa0IsRUFBRSxHQUFHO2lCQUNqQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEVBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsRUFBRSxDQUFDLDJEQUEyRCxFQUFFO2dCQUM5RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDO29CQUN2QyxzQkFBc0IsRUFBRSxHQUFHO29CQUMzQixxQkFBcUIsRUFBRSxHQUFHO2lCQUNwQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsRUFBRSxzQkFBc0IsRUFBRSxHQUFHLEVBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pH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ZW0vbGluZS1pdGVtLXJpZ2h0cy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpbmVJdGVtUmlnaHRzQ29tcG9uZW50IH0gZnJvbSAnLi9saW5lLWl0ZW0tcmlnaHRzLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnTGluZSBJdGVtIFJpZ2h0cyBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogTGluZUl0ZW1SaWdodHNDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBMaW5lSXRlbVJpZ2h0c0NvbXBvbmVudCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2F0dHJpYnV0ZU5hbWUnLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBwcmljZUF0dHJpYnV0ZURpc3BsYXlOYW1lIG92ZXIgcHJpY2VBdHRyaWJ1dGVOYW1lJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmF0dHJpYnV0ZU5hbWUoe1xuICAgICAgICAgIHByaWNlQXR0cmlidXRlRGlzcGxheU5hbWU6ICdBJyxcbiAgICAgICAgICBwcmljZUF0dHJpYnV0ZU5hbWU6ICdhJ1xuICAgICAgICB9IGFzIGFueSkpLnRvRXF1YWwoJ0EnKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hdHRyaWJ1dGVOYW1lKHsgcHJpY2VBdHRyaWJ1dGVOYW1lOiAnYScgfSBhcyBhbnkpKS50b0VxdWFsKCdhJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhdHRyaWJ1dGVWYWx1ZScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHByaWNlQXR0cmlidXRlRGlzcGxheU5hbWUgb3ZlciBwcmljZUF0dHJpYnV0ZU5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYXR0cmlidXRlVmFsdWUoe1xuICAgICAgICAgIHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICdhJyxcbiAgICAgICAgICBzZWxlY3RlZEF0dHJpYnV0ZU5hbWU6ICdBJ1xuICAgICAgICB9IGFzIGFueSkpLnRvRXF1YWwoJ0EnKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5hdHRyaWJ1dGVWYWx1ZSh7IHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICdhJyB9IGFzIGFueSkpLnRvRXF1YWwoJ2EnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JpZ2h0c01hbmFnZWREaXNwbGF5VXNhZ2UoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBhc3NldCBpcyByaWdodHMgbWFuYWdlZCBhbmQgZGlzcGxheSByaWdodHMgYXR0cmlidXRlcyBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucmlnaHRzTWFuYWdlZCA9ICdSaWdodHMgTWFuYWdlZCc7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5kaXNwbGF5Um1BdHRyaWJ1dGVzID0gdHJ1ZTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yaWdodHNNYW5hZ2VkRGlzcGxheVVzYWdlKVxuICAgICAgICAgIC50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gYXNzZXQgaXMgcmlnaHRzIG1hbmFnZWQgYW5kIGRpc3BsYXkgcmlnaHRzIGF0dHJpYnV0ZXMgaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yaWdodHNNYW5hZ2VkID0gJ1JpZ2h0cyBNYW5hZ2VkJztcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRpc3BsYXlSbUF0dHJpYnV0ZXMgPSBmYWxzZTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yaWdodHNNYW5hZ2VkRGlzcGxheVVzYWdlKVxuICAgICAgICAgIC50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIGFzc2V0IGlzIHJveWFsdHkgZnJlZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c01hbmFnZWQgPSAnUm95YWx0eSBGcmVlJztcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRpc3BsYXlSbUF0dHJpYnV0ZXMgPSB0cnVlO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c01hbmFnZWREaXNwbGF5VXNhZ2UpXG4gICAgICAgICAgLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmlnaHRzTWFuYWdlZFdpdGhvdXRVc2FnZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGFzc2V0IGlzIHJpZ2h0cyBtYW5hZ2VkIGFuZCBkaXNwbGF5IHJpZ2h0cyBhdHRyaWJ1dGVzIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucmlnaHRzTWFuYWdlZCA9ICdSaWdodHMgTWFuYWdlZCc7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5kaXNwbGF5Um1BdHRyaWJ1dGVzID0gZmFsc2U7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmlnaHRzTWFuYWdlZFdpdGhvdXRVc2FnZSlcbiAgICAgICAgICAudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIGFzc2V0IGlzIHJpZ2h0cyBtYW5hZ2VkIGFuZCBkaXNwbGF5IHJpZ2h0cyBhdHRyaWJ1dGVzIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yaWdodHNNYW5hZ2VkID0gJ1JpZ2h0cyBNYW5hZ2VkJztcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRpc3BsYXlSbUF0dHJpYnV0ZXMgPSB0cnVlO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c01hbmFnZWRXaXRob3V0VXNhZ2UpXG4gICAgICAgICAgLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gYXNzZXQgaXMgcm95YWx0eSBmcmVlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucmlnaHRzTWFuYWdlZCA9ICdSb3lhbHR5IEZyZWUnO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZGlzcGxheVJtQXR0cmlidXRlcyA9IHRydWU7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmlnaHRzTWFuYWdlZFdpdGhvdXRVc2FnZSlcbiAgICAgICAgICAudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyaWdodHNSb3lhbHR5RnJlZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGFzc2V0IHJpZ2h0cyBpcyByb3lhbHR5IGZyZWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yaWdodHNNYW5hZ2VkID0gJ1JveWFsdHkgRnJlZSc7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmlnaHRzUm95YWx0eUZyZWUpXG4gICAgICAgICAgLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiBhc3NldCByaWdodHMgaXMgTk9UIHJveWFsdHkgZnJlZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJpZ2h0c01hbmFnZWQgPSAnTm90IFJveWFsdHkgRnJlZSc7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucmlnaHRzUm95YWx0eUZyZWUpXG4gICAgICAgICAgLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
