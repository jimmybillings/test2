"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var wz_comment_component_1 = require("./wz.comment.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Wz Comment Component', function () {
        var componentUnderTest, mockStore, loadSpy, formSubmitSpy, removeSpy, changeToEditSpy, changeFormModeToAdd, mockCurrentUserService;
        var mockWzForm = {
            resetForm: jasmine.createSpy('resetForm'),
            mergeNewValues: jasmine.createSpy('mergeNewValues'),
            getValueForField: jasmine.createSpy('getValueForField').and.returnValue('Editor'),
            setValueForField: jasmine.createSpy('setValueForField')
        };
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('comment', {
                formSubmitLabel: 'some.trKey',
                collection: { items: [{ some: 'comment' }], pagination: {} }
            });
            loadSpy = mockStore.createActionFactoryMethod('comment', 'load');
            formSubmitSpy = mockStore.createActionFactoryMethod('comment', 'formSubmit');
            removeSpy = mockStore.createActionFactoryMethod('dialog', 'showConfirmation');
            changeToEditSpy = mockStore.createActionFactoryMethod('comment', 'changeFormModeToEdit');
            changeFormModeToAdd = mockStore.createActionFactoryMethod('comment', 'changeFormModeToAdd');
            mockCurrentUserService = { data: Observable_1.Observable.of({ id: 10 }) };
            componentUnderTest = new wz_comment_component_1.WzCommentComponent(mockStore, mockCurrentUserService);
            componentUnderTest.wzForm = mockWzForm;
            componentUnderTest.formFields = [{ name: 'some', value: '' }];
        });
        describe('parentObject setter', function () {
            beforeEach(function () {
                componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };
            });
            it('should dispatch the getComments action', function () {
                mockStore.expectDispatchFor(loadSpy, { objectType: 'collection', objectId: 1 });
            });
        });
        describe('onFormSubmit', function () {
            beforeEach(function () {
                componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };
            });
            it('dispatches the proper action to the store', function () {
                componentUnderTest.onFormSubmit({ some: 'comment' });
                mockStore.expectDispatchFor(formSubmitSpy, { objectType: 'collection', objectId: 1 }, { some: 'comment' });
            });
            it('calls resetForm() on the wzForm', function () {
                componentUnderTest.onFormSubmit({ some: 'comment' });
                expect(mockWzForm.resetForm).toHaveBeenCalled();
            });
            it('calls getValueForField() on the wzForm', function () {
                expect(mockWzForm.getValueForField).toHaveBeenCalled();
            });
            it('calls setValueForField() on the wzForm', function () {
                expect(mockWzForm.setValueForField).toHaveBeenCalledWith('access', 'Editor');
            });
        });
        describe('get commentsExist()', function () {
            it('returns true if there are comments', function () {
                componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };
                componentUnderTest.commentsExist.take(1).subscribe(function (result) { return expect(result).toBe(true); });
            });
            it('returns false if there are no comments', function () {
                mockStore.createStateSection('comment', { collection: { items: [], pagination: {} } });
                componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };
                componentUnderTest.commentsExist.take(1).subscribe(function (result) { return expect(result).toBe(false); });
            });
        });
        describe('onEditButtonClick()', function () {
            beforeEach(function () {
                componentUnderTest.onEditCommentButtonClick({ some: 'comment' });
            });
            it('calls mergeNewValues() on the form', function () {
                expect(mockWzForm.mergeNewValues).toHaveBeenCalledWith([{ name: 'some', value: 'comment' }]);
            });
            it('dispatches the proper action', function () {
                mockStore.expectDispatchFor(changeToEditSpy, { some: 'comment' });
            });
        });
        describe('initials()', function () {
            it('returns the proper string given a full userName', function () {
                expect(componentUnderTest.initials('Ross Edfort')).toBe('RE');
            });
            it('upcases the names', function () {
                expect(componentUnderTest.initials('ross edfort')).toBe('RE');
            });
        });
        describe('get formSubmitLabel', function () {
            it('returns the value thats in the store', function () {
                componentUnderTest.formSubmitLabel
                    .subscribe(function (label) { return expect(label).toBe('some.trKey'); });
            });
        });
        describe('onFormCancel()', function () {
            beforeEach(function () {
                componentUnderTest.onFormCancel({ preventDefault: function () { } });
            });
            it('calls resetForm() on the wzForm', function () {
                expect(mockWzForm.resetForm).toHaveBeenCalled();
            });
            it('calls getValueForField() on the wzForm', function () {
                expect(mockWzForm.getValueForField).toHaveBeenCalled();
            });
            it('calls setValueForField() on the wzForm', function () {
                expect(mockWzForm.setValueForField).toHaveBeenCalledWith('access', 'Editor');
            });
            it('dispatches the correct action', function () {
                mockStore.expectDispatchFor(changeFormModeToAdd);
            });
        });
        describe('onDeleteCommentButtonClick()', function () {
            it('dispatches the right action', function () {
                componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };
                componentUnderTest.onDeleteCommentButtonClick({ some: 'comment', id: 2 });
                mockStore.expectDispatchFor(removeSpy, jasmine.any(Object), jasmine.any(Function));
            });
        });
        describe('closeComments', function () {
            it('emits the toggleCommentsVisibility event', function () {
                spyOn(componentUnderTest.toggleCommentsVisibility, 'emit');
                componentUnderTest.closeComments();
                expect(componentUnderTest.toggleCommentsVisibility.emit).toHaveBeenCalled();
            });
        });
        describe('comments getter', function () {
            describe('selects the right part of the store', function () {
                it('for a regular objectType', function () {
                    mockStore.createStateSection('comment', { collection: { items: [{ some: 'comment' }], pagination: { totalCount: 10 } } });
                    componentUnderTest.parentObject = {
                        objectType: 'collection',
                        objectId: 1
                    };
                    componentUnderTest.comments.take(1).subscribe(function (comments) {
                        return expect(comments).toEqual({ items: [{ some: 'comment' }], pagination: { totalCount: 10 } });
                    });
                });
                it('for a nested objectType', function () {
                    mockStore.createStateSection('comment', { lineItem: { items: [{ some: 'lineItem' }], pagination: { totalCount: 10 } } });
                    componentUnderTest.parentObject = {
                        objectType: 'collection',
                        objectId: 1,
                        nestedObjectType: 'lineItem',
                        nestedObjectId: 'abc-123'
                    };
                    componentUnderTest.comments.take(1).subscribe(function (comments) {
                        return expect(comments).toEqual({ items: [{ some: 'lineItem' }], pagination: { totalCount: 10 } });
                    });
                });
            });
        });
        describe('isCommentOwner', function () {
            describe('returns true', function () {
                it('when the userId is the same as the comment ownerId', function () {
                    expect(componentUnderTest.isCommentOwner(10)).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the userId is NOT the same as the comment ownerId', function () {
                    expect(componentUnderTest.isCommentOwner(11)).toBe(false);
                });
            });
        });
        describe('pluralize()', function () {
            it('adds an \'s\'', function () {
                expect(componentUnderTest.pluralize('Commenter')).toEqual('Commenters');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1jb21tZW50L3d6LmNvbW1lbnQuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFFN0MsK0RBQTREO0FBQzVELDZFQUEwRTtBQUUxRTtJQUNFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLGtCQUFzQyxFQUFFLFNBQXVCLEVBQ2pFLE9BQW9CLEVBQUUsYUFBMEIsRUFBRSxTQUFzQixFQUFFLGVBQTRCLEVBQ3RHLG1CQUFnQyxFQUFFLHNCQUEyQixDQUFDO1FBRWhFLElBQU0sVUFBVSxHQUFRO1lBQ3RCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN6QyxjQUFjLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNuRCxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDakYsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQztTQUN4RCxDQUFDO1FBRUYsVUFBVSxDQUFDO1lBQ1QsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RDLGVBQWUsRUFBRSxZQUFZO2dCQUM3QixVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUU7YUFDN0QsQ0FBQyxDQUFDO1lBRUgsT0FBTyxHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDakUsYUFBYSxHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDN0Us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LENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBORCxvQkFvTkMiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LWNvbW1lbnQvd3ouY29tbWVudC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBXekNvbW1lbnRDb21wb25lbnQgfSBmcm9tICcuL3d6LmNvbW1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnV3ogQ29tbWVudCBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pDb21tZW50Q29tcG9uZW50LCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZSxcbiAgICAgIGxvYWRTcHk6IGphc21pbmUuU3B5LCBmb3JtU3VibWl0U3B5OiBqYXNtaW5lLlNweSwgcmVtb3ZlU3B5OiBqYXNtaW5lLlNweSwgY2hhbmdlVG9FZGl0U3B5OiBqYXNtaW5lLlNweSxcbiAgICAgIGNoYW5nZUZvcm1Nb2RlVG9BZGQ6IGphc21pbmUuU3B5LCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlOiBhbnk7XG5cbiAgICBjb25zdCBtb2NrV3pGb3JtOiBhbnkgPSB7XG4gICAgICByZXNldEZvcm06IGphc21pbmUuY3JlYXRlU3B5KCdyZXNldEZvcm0nKSxcbiAgICAgIG1lcmdlTmV3VmFsdWVzOiBqYXNtaW5lLmNyZWF0ZVNweSgnbWVyZ2VOZXdWYWx1ZXMnKSxcbiAgICAgIGdldFZhbHVlRm9yRmllbGQ6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRWYWx1ZUZvckZpZWxkJykuYW5kLnJldHVyblZhbHVlKCdFZGl0b3InKSxcbiAgICAgIHNldFZhbHVlRm9yRmllbGQ6IGphc21pbmUuY3JlYXRlU3B5KCdzZXRWYWx1ZUZvckZpZWxkJylcbiAgICB9O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdjb21tZW50Jywge1xuICAgICAgICBmb3JtU3VibWl0TGFiZWw6ICdzb21lLnRyS2V5JyxcbiAgICAgICAgY29sbGVjdGlvbjogeyBpdGVtczogW3sgc29tZTogJ2NvbW1lbnQnIH1dLCBwYWdpbmF0aW9uOiB7fSB9XG4gICAgICB9KTtcblxuICAgICAgbG9hZFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdjb21tZW50JywgJ2xvYWQnKTtcbiAgICAgIGZvcm1TdWJtaXRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnY29tbWVudCcsICdmb3JtU3VibWl0Jyk7XG4gICAgICByZW1vdmVTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnZGlhbG9nJywgJ3Nob3dDb25maXJtYXRpb24nKTtcbiAgICAgIGNoYW5nZVRvRWRpdFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdjb21tZW50JywgJ2NoYW5nZUZvcm1Nb2RlVG9FZGl0Jyk7XG4gICAgICBjaGFuZ2VGb3JtTW9kZVRvQWRkID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2NvbW1lbnQnLCAnY2hhbmdlRm9ybU1vZGVUb0FkZCcpO1xuXG4gICAgICBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlID0geyBkYXRhOiBPYnNlcnZhYmxlLm9mKHsgaWQ6IDEwIH0pIH07XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBXekNvbW1lbnRDb21wb25lbnQobW9ja1N0b3JlLCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC53ekZvcm0gPSBtb2NrV3pGb3JtO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZvcm1GaWVsZHMgPSBbeyBuYW1lOiAnc29tZScsIHZhbHVlOiAnJyB9XSBhcyBhbnk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncGFyZW50T2JqZWN0IHNldHRlcicsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGFyZW50T2JqZWN0ID0geyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH07XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCB0aGUgZ2V0Q29tbWVudHMgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IobG9hZFNweSwgeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25Gb3JtU3VibWl0JywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wYXJlbnRPYmplY3QgPSB7IG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEgfTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGlzcGF0Y2hlcyB0aGUgcHJvcGVyIGFjdGlvbiB0byB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkZvcm1TdWJtaXQoeyBzb21lOiAnY29tbWVudCcgfSBhcyBhbnkpO1xuXG4gICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihmb3JtU3VibWl0U3B5LCB7IG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEgfSwgeyBzb21lOiAnY29tbWVudCcgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIHJlc2V0Rm9ybSgpIG9uIHRoZSB3ekZvcm0nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkZvcm1TdWJtaXQoeyBzb21lOiAnY29tbWVudCcgfSBhcyBhbnkpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrV3pGb3JtLnJlc2V0Rm9ybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyBnZXRWYWx1ZUZvckZpZWxkKCkgb24gdGhlIHd6Rm9ybScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1vY2tXekZvcm0uZ2V0VmFsdWVGb3JGaWVsZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyBzZXRWYWx1ZUZvckZpZWxkKCkgb24gdGhlIHd6Rm9ybScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1vY2tXekZvcm0uc2V0VmFsdWVGb3JGaWVsZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2FjY2VzcycsICdFZGl0b3InKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBjb21tZW50c0V4aXN0KCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBjb21tZW50cycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBhcmVudE9iamVjdCA9IHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSB9O1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb21tZW50c0V4aXN0LnRha2UoMSkuc3Vic2NyaWJlKHJlc3VsdCA9PiBleHBlY3QocmVzdWx0KS50b0JlKHRydWUpKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gY29tbWVudHMnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2NvbW1lbnQnLCB7IGNvbGxlY3Rpb246IHsgaXRlbXM6IFtdLCBwYWdpbmF0aW9uOiB7fSB9IH0pO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGFyZW50T2JqZWN0ID0geyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH07XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbW1lbnRzRXhpc3QudGFrZSgxKS5zdWJzY3JpYmUocmVzdWx0ID0+IGV4cGVjdChyZXN1bHQpLnRvQmUoZmFsc2UpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uRWRpdEJ1dHRvbkNsaWNrKCknLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uRWRpdENvbW1lbnRCdXR0b25DbGljayh7IHNvbWU6ICdjb21tZW50JyB9IGFzIGFueSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIG1lcmdlTmV3VmFsdWVzKCkgb24gdGhlIGZvcm0nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtb2NrV3pGb3JtLm1lcmdlTmV3VmFsdWVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChbeyBuYW1lOiAnc29tZScsIHZhbHVlOiAnY29tbWVudCcgfV0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkaXNwYXRjaGVzIHRoZSBwcm9wZXIgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IoY2hhbmdlVG9FZGl0U3B5LCB7IHNvbWU6ICdjb21tZW50JyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2luaXRpYWxzKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgcHJvcGVyIHN0cmluZyBnaXZlbiBhIGZ1bGwgdXNlck5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaW5pdGlhbHMoJ1Jvc3MgRWRmb3J0JykpLnRvQmUoJ1JFJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3VwY2FzZXMgdGhlIG5hbWVzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmluaXRpYWxzKCdyb3NzIGVkZm9ydCcpKS50b0JlKCdSRScpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IGZvcm1TdWJtaXRMYWJlbCcsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSB2YWx1ZSB0aGF0cyBpbiB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtU3VibWl0TGFiZWxcbiAgICAgICAgICAuc3Vic2NyaWJlKGxhYmVsID0+IGV4cGVjdChsYWJlbCkudG9CZSgnc29tZS50cktleScpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uRm9ybUNhbmNlbCgpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkZvcm1DYW5jZWwoeyBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyB9IH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyByZXNldEZvcm0oKSBvbiB0aGUgd3pGb3JtJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9ja1d6Rm9ybS5yZXNldEZvcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgZ2V0VmFsdWVGb3JGaWVsZCgpIG9uIHRoZSB3ekZvcm0nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtb2NrV3pGb3JtLmdldFZhbHVlRm9yRmllbGQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgc2V0VmFsdWVGb3JGaWVsZCgpIG9uIHRoZSB3ekZvcm0nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtb2NrV3pGb3JtLnNldFZhbHVlRm9yRmllbGQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdhY2Nlc3MnLCAnRWRpdG9yJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2Rpc3BhdGNoZXMgdGhlIGNvcnJlY3QgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IoY2hhbmdlRm9ybU1vZGVUb0FkZCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbkRlbGV0ZUNvbW1lbnRCdXR0b25DbGljaygpJywgKCkgPT4ge1xuICAgICAgaXQoJ2Rpc3BhdGNoZXMgdGhlIHJpZ2h0IGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnBhcmVudE9iamVjdCA9IHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25EZWxldGVDb21tZW50QnV0dG9uQ2xpY2soeyBzb21lOiAnY29tbWVudCcsIGlkOiAyIH0gYXMgYW55KTtcblxuICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IocmVtb3ZlU3B5LCBqYXNtaW5lLmFueShPYmplY3QpLCBqYXNtaW5lLmFueShGdW5jdGlvbikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2xvc2VDb21tZW50cycsICgpID0+IHtcbiAgICAgIGl0KCdlbWl0cyB0aGUgdG9nZ2xlQ29tbWVudHNWaXNpYmlsaXR5IGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QudG9nZ2xlQ29tbWVudHNWaXNpYmlsaXR5LCAnZW1pdCcpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY2xvc2VDb21tZW50cygpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZUNvbW1lbnRzVmlzaWJpbGl0eS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb21tZW50cyBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnc2VsZWN0cyB0aGUgcmlnaHQgcGFydCBvZiB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdmb3IgYSByZWd1bGFyIG9iamVjdFR5cGUnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbihcbiAgICAgICAgICAgICdjb21tZW50JyxcbiAgICAgICAgICAgIHsgY29sbGVjdGlvbjogeyBpdGVtczogW3sgc29tZTogJ2NvbW1lbnQnIH1dLCBwYWdpbmF0aW9uOiB7IHRvdGFsQ291bnQ6IDEwIH0gfSB9XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5wYXJlbnRPYmplY3QgPSB7XG4gICAgICAgICAgICBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsXG4gICAgICAgICAgICBvYmplY3RJZDogMVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29tbWVudHMudGFrZSgxKS5zdWJzY3JpYmUoY29tbWVudHMgPT5cbiAgICAgICAgICAgIGV4cGVjdChjb21tZW50cykudG9FcXVhbCh7IGl0ZW1zOiBbeyBzb21lOiAnY29tbWVudCcgfV0sIHBhZ2luYXRpb246IHsgdG90YWxDb3VudDogMTAgfSB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmb3IgYSBuZXN0ZWQgb2JqZWN0VHlwZScsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKFxuICAgICAgICAgICAgJ2NvbW1lbnQnLFxuICAgICAgICAgICAgeyBsaW5lSXRlbTogeyBpdGVtczogW3sgc29tZTogJ2xpbmVJdGVtJyB9XSwgcGFnaW5hdGlvbjogeyB0b3RhbENvdW50OiAxMCB9IH0gfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucGFyZW50T2JqZWN0ID0ge1xuICAgICAgICAgICAgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLFxuICAgICAgICAgICAgb2JqZWN0SWQ6IDEsXG4gICAgICAgICAgICBuZXN0ZWRPYmplY3RUeXBlOiAnbGluZUl0ZW0nLFxuICAgICAgICAgICAgbmVzdGVkT2JqZWN0SWQ6ICdhYmMtMTIzJ1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29tbWVudHMudGFrZSgxKS5zdWJzY3JpYmUoY29tbWVudHMgPT5cbiAgICAgICAgICAgIGV4cGVjdChjb21tZW50cykudG9FcXVhbCh7IGl0ZW1zOiBbeyBzb21lOiAnbGluZUl0ZW0nIH1dLCBwYWdpbmF0aW9uOiB7IHRvdGFsQ291bnQ6IDEwIH0gfSlcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQ29tbWVudE93bmVyJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXJJZCBpcyB0aGUgc2FtZSBhcyB0aGUgY29tbWVudCBvd25lcklkJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaXNDb21tZW50T3duZXIoMTApKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHVzZXJJZCBpcyBOT1QgdGhlIHNhbWUgYXMgdGhlIGNvbW1lbnQgb3duZXJJZCcsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmlzQ29tbWVudE93bmVyKDExKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncGx1cmFsaXplKCknLCAoKSA9PiB7XG4gICAgICBpdCgnYWRkcyBhbiBcXCdzXFwnJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBsdXJhbGl6ZSgnQ29tbWVudGVyJykpLnRvRXF1YWwoJ0NvbW1lbnRlcnMnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
