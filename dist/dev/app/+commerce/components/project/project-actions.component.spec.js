"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var project_actions_component_1 = require("./project-actions.component");
function main() {
    describe('Project Actions Component', function () {
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new project_actions_component_1.ProjectActionsComponent();
            componentUnderTest.edit.emit = jasmine.createSpy('edit emitter');
            componentUnderTest.remove.emit = jasmine.createSpy('remove emitter');
            componentUnderTest.addFee.emit = jasmine.createSpy('addFee emitter');
        });
        describe('onEditButtonClick()', function () {
            it('emits an edit request', function () {
                componentUnderTest.onEditButtonClick();
                expect(componentUnderTest.edit.emit).toHaveBeenCalled();
            });
        });
        describe('onRemoveButtonClick()', function () {
            it('emits an remove request', function () {
                componentUnderTest.onRemoveButtonClick();
                expect(componentUnderTest.remove.emit).toHaveBeenCalled();
            });
        });
        describe('onAddFeeButtonClick()', function () {
            it('emits an addFee request', function () {
                componentUnderTest.onAddFeeButtonClick();
                expect(componentUnderTest.addFee.emit).toHaveBeenCalled();
            });
        });
        describe('showRightsPricingBtn()', function () {
            describe('returns false', function () {
                it('when the quote type is Trial', function () {
                    componentUnderTest.quoteType = 'Trial';
                    componentUnderTest.projectHasRmAssets = true;
                    expect(componentUnderTest.showRightsPricingBtn).toBe(false);
                });
                it('project does not have any rights managed assets', function () {
                    componentUnderTest.quoteType = null;
                    componentUnderTest.projectHasRmAssets = false;
                    expect(componentUnderTest.showRightsPricingBtn).toBe(false);
                });
            });
            describe('returns true', function () {
                it('when the quote type is OfflineLicense and project has rights managed assets', function () {
                    componentUnderTest.quoteType = 'OfflineLicense';
                    componentUnderTest.projectHasRmAssets = true;
                    expect(componentUnderTest.showRightsPricingBtn).toBe(true);
                });
                it('when the quote type is null and project has rights managed assets', function () {
                    componentUnderTest.quoteType = null;
                    componentUnderTest.projectHasRmAssets = true;
                    expect(componentUnderTest.showRightsPricingBtn).toBe(true);
                });
            });
        });
        describe('onBulkImportClick', function () {
            it('emits the \'bulkImport\' event', function () {
                spyOn(componentUnderTest.bulkImport, 'emit');
                componentUnderTest.onBulkImportClick();
                expect(componentUnderTest.bulkImport.emit).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QtYWN0aW9ucy5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlFQUFzRTtBQUN0RTtJQUNFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtRQUVwQyxJQUFJLGtCQUEyQyxDQUFDO1FBRWhELFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksbURBQXVCLEVBQUUsQ0FBQztZQUNuRCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDakUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsRUFBRSxDQUFDLHVCQUF1QixFQUFFO2dCQUMxQixrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN2QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxFQUFFLENBQUMseUJBQXlCLEVBQUU7Z0JBQzVCLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRTtnQkFDNUIsa0JBQWtCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsd0JBQXdCLEVBQUU7WUFDakMsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsRUFBRSxDQUFDLDhCQUE4QixFQUFFO29CQUNqQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO29CQUN2QyxrQkFBa0IsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7b0JBQzdDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO29CQUNwRCxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNwQyxrQkFBa0IsQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7b0JBQzlDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQyw2RUFBNkUsRUFBRTtvQkFDaEYsa0JBQWtCLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO29CQUNoRCxrQkFBa0IsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7b0JBQzdDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0QsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLG1FQUFtRSxFQUFFO29CQUN0RSxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNwQyxrQkFBa0IsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7b0JBQzdDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0QsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtnQkFDbkMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDN0Msa0JBQWtCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFFdkMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF4RUQsb0JBd0VDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QtYWN0aW9ucy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2plY3RBY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9qZWN0LWFjdGlvbnMuY29tcG9uZW50JztcbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUHJvamVjdCBBY3Rpb25zIENvbXBvbmVudCcsICgpID0+IHtcblxuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFByb2plY3RBY3Rpb25zQ29tcG9uZW50O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgUHJvamVjdEFjdGlvbnNDb21wb25lbnQoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5lZGl0LmVtaXQgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZWRpdCBlbWl0dGVyJyk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QucmVtb3ZlLmVtaXQgPSBqYXNtaW5lLmNyZWF0ZVNweSgncmVtb3ZlIGVtaXR0ZXInKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hZGRGZWUuZW1pdCA9IGphc21pbmUuY3JlYXRlU3B5KCdhZGRGZWUgZW1pdHRlcicpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uRWRpdEJ1dHRvbkNsaWNrKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZW1pdHMgYW4gZWRpdCByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25FZGl0QnV0dG9uQ2xpY2soKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5lZGl0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uUmVtb3ZlQnV0dG9uQ2xpY2soKScsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyBhbiByZW1vdmUgcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uUmVtb3ZlQnV0dG9uQ2xpY2soKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5yZW1vdmUuZW1pdCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25BZGRGZWVCdXR0b25DbGljaygpJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIGFuIGFkZEZlZSByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25BZGRGZWVCdXR0b25DbGljaygpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFkZEZlZS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93UmlnaHRzUHJpY2luZ0J0bigpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZSB0eXBlIGlzIFRyaWFsJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5xdW90ZVR5cGUgPSAnVHJpYWwnO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcm9qZWN0SGFzUm1Bc3NldHMgPSB0cnVlO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd1JpZ2h0c1ByaWNpbmdCdG4pLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHJvamVjdCBkb2VzIG5vdCBoYXZlIGFueSByaWdodHMgbWFuYWdlZCBhc3NldHMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnF1b3RlVHlwZSA9IG51bGw7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnByb2plY3RIYXNSbUFzc2V0cyA9IGZhbHNlO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd1JpZ2h0c1ByaWNpbmdCdG4pLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgcXVvdGUgdHlwZSBpcyBPZmZsaW5lTGljZW5zZSBhbmQgcHJvamVjdCBoYXMgcmlnaHRzIG1hbmFnZWQgYXNzZXRzJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5xdW90ZVR5cGUgPSAnT2ZmbGluZUxpY2Vuc2UnO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wcm9qZWN0SGFzUm1Bc3NldHMgPSB0cnVlO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd1JpZ2h0c1ByaWNpbmdCdG4pLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZSB0eXBlIGlzIG51bGwgYW5kIHByb2plY3QgaGFzIHJpZ2h0cyBtYW5hZ2VkIGFzc2V0cycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucXVvdGVUeXBlID0gbnVsbDtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJvamVjdEhhc1JtQXNzZXRzID0gdHJ1ZTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dSaWdodHNQcmljaW5nQnRuKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQnVsa0ltcG9ydENsaWNrJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHRoZSBcXCdidWxrSW1wb3J0XFwnIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QuYnVsa0ltcG9ydCwgJ2VtaXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQnVsa0ltcG9ydENsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5idWxrSW1wb3J0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
