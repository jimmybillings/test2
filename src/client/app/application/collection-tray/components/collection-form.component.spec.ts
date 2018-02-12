import { Observable } from 'rxjs/Observable';
import { Collection } from '../../../shared/interfaces/collection.interface';
import { CollectionFormComponent } from './collection-form.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { ResponseOptions, Response } from '@angular/http';
export function main() {
  let componentUnderTest: CollectionFormComponent, mockCollections: any,
    mockCollectionContext: any, mockActiveCollection: any, activeCollectionLoadSpy: jasmine.Spy,
    mockDetector: any;
  let mockStore: MockAppStore;

  describe('Collection Form Component', () => {
    beforeEach(() => {
      mockCollections = {
        create: jasmine.createSpy('create').and.returnValue(Observable.of(mockCollection())),
        update: jasmine.createSpy('update').and.returnValue(Observable.of({})),
        duplicate: jasmine.createSpy('duplicate').and.returnValue(Observable.of({})),
        load: jasmine.createSpy('load').and.returnValue(Observable.of([mockCollection(), mockCollection()]))
      };
      mockCollectionContext = {
        resetCollectionOptions: jasmine.createSpy('resetCollectionOptions'),
        refreshCollections: jasmine.createSpy('refreshCollections')
      };
      mockDetector = {
        markForCheck: jasmine.createSpy('markForCheck')
      };
      mockStore = new MockAppStore();
      mockStore.createStateSection('activeCollection', {
        collection: {
          id: 2, assets: {
            items: [
              { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
              { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
            ]
          }
        }, loaded: true
      });
      activeCollectionLoadSpy = mockStore.createActionFactoryMethod('activeCollection', 'load');
      componentUnderTest =
        new CollectionFormComponent(mockCollections, mockDetector, mockCollectionContext, mockStore);
    });

    describe('ngOnInit()', () => {
      describe('setForm() for collection fields', () => {
        it('Should create fields for creating a new collection', () => {
          componentUnderTest.fields = collectionFormFields();
          componentUnderTest.ngOnInit();
          expect(componentUnderTest.formItems).toEqual([{
            endPoint: 'collectionSummary/search',
            queryParams: 'accessLevel, all, i, 0, n, 100',
            service: 'assets',
            suggestionHeading: 'COLLECTION.FORM.TYPE_AHEAD_SUGGESTIONS_HEADING',
            name: 'name',
            label: 'COLLECTION.FORM.COLLECTION_NAME_LABEL',
            type: 'suggestions',
            value: '',
            validation: 'REQUIRED'
          },
          {
            name: 'tags',
            label: 'COLLECTION.FORM.TAGS_LABEL',
            type: 'tags',
            value: '',
            tags: []
          }]);
        });

        it('Should create fields for editing an existing collection', () => {
          componentUnderTest.fields = collectionFormFields();
          componentUnderTest.collection = { name: 'Test Collection', tags: ['test'] } as any;
          componentUnderTest.ngOnInit();
          expect(componentUnderTest.formItems).toEqual([{
            endPoint: 'collectionSummary/search',
            queryParams: 'accessLevel, all, i, 0, n, 100',
            service: 'assets',
            suggestionHeading: 'COLLECTION.FORM.TYPE_AHEAD_SUGGESTIONS_HEADING',
            name: 'name',
            label: 'COLLECTION.FORM.COLLECTION_NAME_LABEL',
            type: 'suggestions',
            value: 'Test Collection',
            validation: 'REQUIRED'
          },
          {
            name: 'tags',
            label: 'COLLECTION.FORM.TAGS_LABEL',
            type: 'tags',
            value: 'test',
            tags: ['test']
          }]);
        });

        it('Should create fields for duplicating an existing collection', () => {
          componentUnderTest.fields = collectionFormFields();
          componentUnderTest.collection = { name: 'Test Collection', tags: ['test'] } as any;
          componentUnderTest.collectionActionType = 'duplicate';
          componentUnderTest.ngOnInit();
          expect(componentUnderTest.formItems).toEqual([{
            endPoint: 'collectionSummary/search',
            queryParams: 'accessLevel, all, i, 0, n, 100',
            service: 'assets',
            suggestionHeading: 'COLLECTION.FORM.TYPE_AHEAD_SUGGESTIONS_HEADING',
            name: 'name',
            label: 'COLLECTION.FORM.COLLECTION_NAME_LABEL',
            type: 'suggestions',
            value: 'Copy - Test Collection',
            validation: 'REQUIRED'
          },
          {
            name: 'tags',
            label: 'COLLECTION.FORM.TAGS_LABEL',
            type: 'tags',
            value: 'test',
            tags: ['test']
          }]);
        });
      });

      describe('Sets the correct translation strings based on the form type - edit, create, duplicate', () => {
        it('Should be correct for create', () => {
          componentUnderTest.collectionActionType = 'create';
          componentUnderTest.fields = collectionFormFields();
          componentUnderTest.ngOnInit();
          expect(componentUnderTest.tr).toEqual({
            title: 'COLLECTION.NEW_TITLE',
            submitLabel: 'COLLECTION.FORM.SUBMIT_LABEL',
            close: 'COLLECTION.FORM.CLOSE_HOVER_TITLE'
          });
        });
        it('Should be correct for edit', () => {
          componentUnderTest.collectionActionType = 'edit';
          componentUnderTest.fields = collectionFormFields();
          componentUnderTest.ngOnInit();
          expect(componentUnderTest.tr).toEqual({
            title: 'COLLECTION.EDIT.TITLE',
            submitLabel: 'COLLECTION.EDIT.SUBMIT_LABEL',
            close: 'COLLECTION.FORM.CLOSE_HOVER_TITLE'
          });
        });
        it('Should be correct for duplicate', () => {
          componentUnderTest.collectionActionType = 'duplicate';
          componentUnderTest.fields = collectionFormFields();
          componentUnderTest.ngOnInit();
          expect(componentUnderTest.tr).toEqual({
            title: 'COLLECTION.DUPLICATE.TITLE',
            submitLabel: 'COLLECTION.DUPLICATE.SUBMIT_LABEL',
            close: 'COLLECTION.FORM.CLOSE_HOVER_TITLE'
          });
        });
      });
    });

    describe('collectionAction()', () => {
      let requestCollection: Collection;
      describe('createCollection()', () => {
        describe('Sucessful create', () => {
          beforeEach(() => {
            componentUnderTest.collectionActionType = 'create';
            spyOn(componentUnderTest.collectionSaved, 'emit');
            componentUnderTest.collectionAction(mockCollection());
            requestCollection = mockCollection();
            requestCollection.tags = ['cat', 'dog', 'cow'];
          });
          it('Should create a new collection', () => {
            expect(mockCollections.create).toHaveBeenCalledWith(requestCollection);
          });

          it('Should reset collection options in collection context', () => {
            expect(mockCollectionContext.resetCollectionOptions).toHaveBeenCalled();
          });

          it('Should load the new active collection', () => {
            expect(activeCollectionLoadSpy).toHaveBeenCalled();
          });

          it('Should reload all collections', () => {
            expect(mockCollections.load).toHaveBeenCalledWith(
              { 'q': '', 'accessLevel': 'all', 's': '', 'd': '', 'i': 0, 'n': 200 });
          });

          it('Should emit an event to indicate the collection has been saved', () => {

            expect(componentUnderTest.collectionSaved.emit).toHaveBeenCalled();
          });
        });

        describe('On error create', () => {
          beforeEach(() => {
            const errorResponse: Response = new Response(new ResponseOptions({
              body: JSON.stringify({ collection: 'A collection with this name already exists' })
            }));

            mockCollections = {
              create: jasmine.createSpy('create').and.returnValue(Observable.throw(errorResponse)),
              load: jasmine.createSpy('load').and.returnValue(Observable.of([mockCollection(), mockCollection()]))
            };

            componentUnderTest =
              new CollectionFormComponent(mockCollections, mockDetector, mockCollectionContext, mockStore);
            componentUnderTest.collectionActionType = 'create';
          });
          it('Should assign a create collection error response to the serverError variable', () => {
            componentUnderTest.collectionAction(mockCollection());
            expect(componentUnderTest.serverErrors).toEqual({ collection: 'A collection with this name already exists' });

          });

          it('Should ask angular to run change detection', () => {
            componentUnderTest.collectionAction(mockCollection());
            expect(mockDetector.markForCheck).toHaveBeenCalled();
          });
        });
      });

      describe('editCollection()', () => {
        describe('sucessful edit', () => {
          it('Should edit a new collection', () => {
            componentUnderTest.collectionActionType = 'edit';
            componentUnderTest.collection = mockCollection();
            spyOn(componentUnderTest.collectionSaved, 'emit');
            componentUnderTest.collectionAction({ tags: 'cat, dog, cow' } as any);
            requestCollection = mockCollection();
            requestCollection.tags = ['cat', 'dog', 'cow'];
            expect(mockCollections.update).toHaveBeenCalledWith(2, { tags: ['cat', 'dog', 'cow'] });
          });

          it('Should reload all collections', () => {
            componentUnderTest.collectionActionType = 'edit';
            componentUnderTest.collection = mockCollection();
            spyOn(componentUnderTest.collectionSaved, 'emit');
            componentUnderTest.collectionAction(mockCollection());
            requestCollection = mockCollection();
            requestCollection.tags = ['cat', 'dog', 'cow'];
            expect(mockCollections.load).toHaveBeenCalledWith(
              { 'q': '', 'accessLevel': 'all', 's': '', 'd': '', 'i': 0, 'n': 200 });
          });

          it('Should emit an event to indicate the collection has been saved', () => {
            componentUnderTest.collectionActionType = 'edit';
            componentUnderTest.collection = mockCollection();
            spyOn(componentUnderTest.collectionSaved, 'emit');
            componentUnderTest.collectionAction(mockCollection());
            requestCollection = mockCollection();
            requestCollection.tags = ['cat', 'dog', 'cow'];
            expect(componentUnderTest.collectionSaved.emit).toHaveBeenCalled();
          });

          it('Should reload the active collection if the collection id matches the active collection id', () => {
            componentUnderTest.collectionActionType = 'edit';
            componentUnderTest.collection = mockCollection();
            spyOn(componentUnderTest.collectionSaved, 'emit');
            componentUnderTest.collectionAction(mockCollection());
            requestCollection = mockCollection();
            requestCollection.tags = ['cat', 'dog', 'cow'];
            expect(activeCollectionLoadSpy).toHaveBeenCalled();
          });

          it('Should not reload the active collection if the collection id does not match the current active collection id',
            () => {
              componentUnderTest.collectionActionType = 'edit';
              componentUnderTest.collection = mockCollectionDiff();
              componentUnderTest.collectionAction(mockCollection());
              requestCollection = mockCollection();
              requestCollection.tags = ['cat', 'dog', 'cow'];
              expect(activeCollectionLoadSpy).not.toHaveBeenCalled();
            });
        });

        describe('On error edit', () => {
          beforeEach(() => {
            const errorResponse: Response = new Response(new ResponseOptions({
              body: JSON.stringify({ collection: 'A collection with this name already exists' })
            }));

            mockCollections = {
              update: jasmine.createSpy('update').and.returnValue(Observable.throw(errorResponse)),
              load: jasmine.createSpy('load').and.returnValue(Observable.of([mockCollection(), mockCollection()]))
            };

            componentUnderTest = new CollectionFormComponent(
              mockCollections, mockDetector, mockCollectionContext, mockStore
            );
            componentUnderTest.collectionActionType = 'edit';
            componentUnderTest.collection = { id: 12 } as any;
          });

          it('Should assign a edit collection error response to the serverError variable', () => {
            componentUnderTest.collectionAction(mockCollection());
            expect(componentUnderTest.serverErrors).toEqual({ collection: 'A collection with this name already exists' });

          });

          it('Should ask angular to run change detection', () => {
            componentUnderTest.collectionAction(mockCollection());
            expect(mockDetector.markForCheck).toHaveBeenCalled();
          });
        });
      });

      describe('duplicateCollection()', () => {
        describe('Sucessful duplicate', () => {
          beforeEach(() => {
            componentUnderTest.collectionActionType = 'duplicate';
            spyOn(componentUnderTest.collectionSaved, 'emit');
            componentUnderTest.collectionAction(mockCollection());
            requestCollection = mockCollection();
            requestCollection.tags = ['cat', 'dog', 'cow'];
          });
          it('Should duplicate an existing collection', () => {
            expect(mockCollections.duplicate).toHaveBeenCalledWith(requestCollection);
          });

          it('Should reset collection options in collection context', () => {
            expect(mockCollectionContext.resetCollectionOptions).toHaveBeenCalled();
          });

          it('Should load the new active collection', () => {
            expect(activeCollectionLoadSpy).toHaveBeenCalled();
          });

          it('Should reload all collections', () => {
            expect(mockCollections.load).toHaveBeenCalledWith(
              { 'q': '', 'accessLevel': 'all', 's': '', 'd': '', 'i': 0, 'n': 200 });
          });

          it('Should emit an event to indicate the collection has been saved', () => {

            expect(componentUnderTest.collectionSaved.emit).toHaveBeenCalled();
          });
        });

        describe('On error Duplicate', () => {
          beforeEach(() => {
            const errorResponse: Response = new Response(new ResponseOptions({
              body: JSON.stringify({ collection: 'A collection with this name already exists' })
            }));

            mockCollections = {
              duplicate: jasmine.createSpy('duplicate').and.returnValue(Observable.throw(errorResponse)),
              load: jasmine.createSpy('load').and.returnValue(Observable.of([mockCollection(), mockCollection()]))
            };

            componentUnderTest =
              new CollectionFormComponent(mockCollections, mockDetector, mockCollectionContext, mockStore);
            componentUnderTest.collectionActionType = 'duplicate';
          });
          it('Should assign a create collection error response to the serverError variable', () => {
            componentUnderTest.collectionAction(mockCollection());
            expect(componentUnderTest.serverErrors).toEqual({ collection: 'A collection with this name already exists' });

          });

          it('Should ask angular to run change detection', () => {
            componentUnderTest.collectionAction(mockCollection());
            expect(mockDetector.markForCheck).toHaveBeenCalled();
          });
        });
      });
    });
  });
}

function mockCollection(): Collection {
  return {
    id: 2,
    siteName: 'core',
    name: 'james billings',
    createdOn: new Date('2017-10-17T19:20:25.083Z'),
    owner: 123,
    tags: 'cat, dog, cow',
    userRole: 'owner',
    editors: [
      { id: 1, firstName: 'Tom', lastName: 'Thumb', emailAddress: 'tt@test.co' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', emailAddress: 'jd@test.co' },
      { id: 300, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }],
    viewers: [{ id: 4, firstName: 'Mary', lastName: 'Maze', emailAddress: 'mm@test.co' }]
  };
}

function mockCollectionDiff(): Collection {
  return {
    id: 4,
    siteName: 'core',
    name: 'james billings',
    owner: 123,
    tags: 'cat, dog, cow'
  };
}

function collectionFormFields() {
  return {
    form: {
      items: [
        {
          endPoint: 'collectionSummary/search',
          queryParams: 'accessLevel, all, i, 0, n, 100',
          service: 'assets',
          suggestionHeading: 'COLLECTION.FORM.TYPE_AHEAD_SUGGESTIONS_HEADING',
          name: 'name',
          label: 'COLLECTION.FORM.COLLECTION_NAME_LABEL',
          type: 'suggestions',
          value: '',
          validation: 'REQUIRED'
        },
        {
          name: 'tags',
          label: 'COLLECTION.FORM.TAGS_LABEL',
          type: 'tags',
          value: ''
        }
      ]
    }
  };
}




