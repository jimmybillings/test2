import { Observable } from 'rxjs/Observable';

import { WzCommentComponent } from './wz.comment.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Wz Comment Component', () => {
    let componentUnderTest: WzCommentComponent, mockStore: MockAppStore,
      loadSpy: jasmine.Spy, formSubmitSpy: jasmine.Spy, removeSpy: jasmine.Spy, changeToEditSpy: jasmine.Spy,
      changeFormModeToAdd: jasmine.Spy, mockCurrentUserService: any;

    const mockWzForm: any = {
      resetForm: jasmine.createSpy('resetForm'),
      mergeNewValues: jasmine.createSpy('mergeNewValues'),
      getValueForField: jasmine.createSpy('getValueForField').and.returnValue('Editor'),
      setValueForField: jasmine.createSpy('setValueForField')
    };

    beforeEach(() => {
      mockStore = new MockAppStore();
      mockStore.createStateSection('comment', {
        formSubmitLabel: 'some.trKey',
        collection: { items: [{ some: 'comment' }], pagination: {} }
      });

      loadSpy = mockStore.createActionFactoryMethod('comment', 'load');
      formSubmitSpy = mockStore.createActionFactoryMethod('comment', 'formSubmit');
      removeSpy = mockStore.createActionFactoryMethod('dialog', 'showConfirmation');
      changeToEditSpy = mockStore.createActionFactoryMethod('comment', 'changeFormModeToEdit');
      changeFormModeToAdd = mockStore.createActionFactoryMethod('comment', 'changeFormModeToAdd');

      mockCurrentUserService = { data: Observable.of({ id: 10 }) };

      componentUnderTest = new WzCommentComponent(mockStore, mockCurrentUserService);
      componentUnderTest.wzForm = mockWzForm;
      componentUnderTest.formFields = [{ name: 'some', value: '' }] as any;
    });

    describe('parentObject setter', () => {
      beforeEach(() => {
        componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };
      });

      it('should dispatch the getComments action', () => {
        mockStore.expectDispatchFor(loadSpy, { objectType: 'collection', objectId: 1 });
      });
    });

    describe('onFormSubmit', () => {
      beforeEach(() => {
        componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };
      });

      it('dispatches the proper action to the store', () => {
        componentUnderTest.onFormSubmit({ some: 'comment' } as any);

        mockStore.expectDispatchFor(formSubmitSpy, { objectType: 'collection', objectId: 1 }, { some: 'comment' });
      });

      it('calls resetForm() on the wzForm', () => {
        componentUnderTest.onFormSubmit({ some: 'comment' } as any);

        expect(mockWzForm.resetForm).toHaveBeenCalled();
      });

      it('calls getValueForField() on the wzForm', () => {
        expect(mockWzForm.getValueForField).toHaveBeenCalled();
      });

      it('calls setValueForField() on the wzForm', () => {
        expect(mockWzForm.setValueForField).toHaveBeenCalledWith('access', 'Editor');
      });
    });

    describe('get commentsExist()', () => {
      it('returns true if there are comments', () => {
        componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };

        componentUnderTest.commentsExist.take(1).subscribe(result => expect(result).toBe(true));
      });

      it('returns false if there are no comments', () => {
        mockStore.createStateSection('comment', { collection: { items: [], pagination: {} } });
        componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };

        componentUnderTest.commentsExist.take(1).subscribe(result => expect(result).toBe(false));
      });
    });

    describe('onEditButtonClick()', () => {
      beforeEach(() => {
        componentUnderTest.onEditCommentButtonClick({ some: 'comment' } as any);
      });

      it('calls mergeNewValues() on the form', () => {
        expect(mockWzForm.mergeNewValues).toHaveBeenCalledWith([{ name: 'some', value: 'comment' }]);
      });

      it('dispatches the proper action', () => {
        mockStore.expectDispatchFor(changeToEditSpy, { some: 'comment' });
      });
    });

    describe('initials()', () => {
      it('returns the proper string given a full userName', () => {
        expect(componentUnderTest.initials('Ross Edfort')).toBe('RE');
      });

      it('upcases the names', () => {
        expect(componentUnderTest.initials('ross edfort')).toBe('RE');
      });
    });

    describe('get formSubmitLabel', () => {
      it('returns the value thats in the store', () => {
        componentUnderTest.formSubmitLabel
          .subscribe(label => expect(label).toBe('some.trKey'));
      });
    });

    describe('onFormCancel()', () => {
      beforeEach(() => {
        componentUnderTest.onFormCancel({ preventDefault: () => { } });
      });

      it('calls resetForm() on the wzForm', () => {
        expect(mockWzForm.resetForm).toHaveBeenCalled();
      });

      it('calls getValueForField() on the wzForm', () => {
        expect(mockWzForm.getValueForField).toHaveBeenCalled();
      });

      it('calls setValueForField() on the wzForm', () => {
        expect(mockWzForm.setValueForField).toHaveBeenCalledWith('access', 'Editor');
      });

      it('dispatches the correct action', () => {
        mockStore.expectDispatchFor(changeFormModeToAdd);
      });
    });

    describe('onDeleteCommentButtonClick()', () => {
      it('dispatches the right action', () => {
        componentUnderTest.parentObject = { objectType: 'collection', objectId: 1 };
        componentUnderTest.onDeleteCommentButtonClick({ some: 'comment', id: 2 } as any);

        mockStore.expectDispatchFor(removeSpy, jasmine.any(Object), jasmine.any(Function));
      });
    });

    describe('closeComments', () => {
      it('emits the toggleCommentsVisibility event', () => {
        spyOn(componentUnderTest.toggleCommentsVisibility, 'emit');
        componentUnderTest.closeComments();
        expect(componentUnderTest.toggleCommentsVisibility.emit).toHaveBeenCalled();
      });
    });

    describe('comments getter', () => {
      describe('selects the right part of the store', () => {
        it('for a regular objectType', () => {
          mockStore.createStateSection(
            'comment',
            { collection: { items: [{ some: 'comment' }], pagination: { totalCount: 10 } } }
          );

          componentUnderTest.parentObject = {
            objectType: 'collection',
            objectId: 1
          };

          componentUnderTest.comments.take(1).subscribe(comments =>
            expect(comments).toEqual({ items: [{ some: 'comment' }], pagination: { totalCount: 10 } })
          );
        });

        it('for a nested objectType', () => {
          mockStore.createStateSection(
            'comment',
            { lineItem: { items: [{ some: 'lineItem' }], pagination: { totalCount: 10 } } }
          );

          componentUnderTest.parentObject = {
            objectType: 'collection',
            objectId: 1,
            nestedObjectType: 'lineItem',
            nestedObjectId: 'abc-123'
          };

          componentUnderTest.comments.take(1).subscribe(comments =>
            expect(comments).toEqual({ items: [{ some: 'lineItem' }], pagination: { totalCount: 10 } })
          );
        });
      });
    });

    describe('isCommentOwner', () => {
      describe('returns true', () => {
        it('when the userId is the same as the comment ownerId', () => {
          expect(componentUnderTest.isCommentOwner(10)).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the userId is NOT the same as the comment ownerId', () => {
          expect(componentUnderTest.isCommentOwner(11)).toBe(false);
        });
      });
    });

    describe('pluralize()', () => {
      it('adds an \'s\'', () => {
        expect(componentUnderTest.pluralize('Commenter')).toEqual('Commenters');
      });
    });
  });
}
