"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var collection_form_component_1 = require("./collection-form.component");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var http_1 = require("@angular/http");
function main() {
    var componentUnderTest, mockCollections, mockCollectionContext, mockActiveCollection, activeCollectionLoadSpy, mockDetector;
    var mockStore;
    describe('Collection Form Component', function () {
        beforeEach(function () {
            mockCollections = {
                create: jasmine.createSpy('create').and.returnValue(Observable_1.Observable.of(mockCollection())),
                update: jasmine.createSpy('update').and.returnValue(Observable_1.Observable.of({})),
                duplicate: jasmine.createSpy('duplicate').and.returnValue(Observable_1.Observable.of({})),
                load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of([mockCollection(), mockCollection()]))
            };
            mockCollectionContext = {
                resetCollectionOptions: jasmine.createSpy('resetCollectionOptions'),
                refreshCollections: jasmine.createSpy('refreshCollections')
            };
            mockDetector = {
                markForCheck: jasmine.createSpy('markForCheck')
            };
            mockStore = new mock_app_store_1.MockAppStore();
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
                new collection_form_component_1.CollectionFormComponent(mockCollections, mockDetector, mockCollectionContext, mockStore);
        });
        describe('ngOnInit()', function () {
            describe('setForm() for collection fields', function () {
                it('Should create fields for creating a new collection', function () {
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
                it('Should create fields for editing an existing collection', function () {
                    componentUnderTest.fields = collectionFormFields();
                    componentUnderTest.collection = { name: 'Test Collection', tags: ['test'] };
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
                it('Should create fields for duplicating an existing collection', function () {
                    componentUnderTest.fields = collectionFormFields();
                    componentUnderTest.collection = { name: 'Test Collection', tags: ['test'] };
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
            describe('Sets the correct translation strings based on the form type - edit, create, duplicate', function () {
                it('Should be correct for create', function () {
                    componentUnderTest.collectionActionType = 'create';
                    componentUnderTest.fields = collectionFormFields();
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.tr).toEqual({
                        title: 'COLLECTION.NEW_TITLE',
                        submitLabel: 'COLLECTION.FORM.SUBMIT_LABEL',
                        close: 'COLLECTION.FORM.CLOSE_HOVER_TITLE'
                    });
                });
                it('Should be correct for edit', function () {
                    componentUnderTest.collectionActionType = 'edit';
                    componentUnderTest.fields = collectionFormFields();
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.tr).toEqual({
                        title: 'COLLECTION.EDIT.TITLE',
                        submitLabel: 'COLLECTION.EDIT.SUBMIT_LABEL',
                        close: 'COLLECTION.FORM.CLOSE_HOVER_TITLE'
                    });
                });
                it('Should be correct for duplicate', function () {
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
        describe('collectionAction()', function () {
            var requestCollection;
            describe('createCollection()', function () {
                describe('Sucessful create', function () {
                    beforeEach(function () {
                        componentUnderTest.collectionActionType = 'create';
                        spyOn(componentUnderTest.collectionSaved, 'emit');
                        componentUnderTest.collectionAction(mockCollection());
                        requestCollection = mockCollection();
                        requestCollection.tags = ['cat', 'dog', 'cow'];
                    });
                    it('Should create a new collection', function () {
                        expect(mockCollections.create).toHaveBeenCalledWith(requestCollection);
                    });
                    it('Should reset collection options in collection context', function () {
                        expect(mockCollectionContext.resetCollectionOptions).toHaveBeenCalled();
                    });
                    it('Should load the new active collection', function () {
                        expect(activeCollectionLoadSpy).toHaveBeenCalled();
                    });
                    it('Should reload all collections', function () {
                        expect(mockCollections.load).toHaveBeenCalledWith({ 'q': '', 'accessLevel': 'all', 's': '', 'd': '', 'i': 0, 'n': 200 });
                    });
                    it('Should emit an event to indicate the collection has been saved', function () {
                        expect(componentUnderTest.collectionSaved.emit).toHaveBeenCalled();
                    });
                });
                describe('On error create', function () {
                    beforeEach(function () {
                        var errorResponse = new http_1.Response(new http_1.ResponseOptions({
                            body: JSON.stringify({ collection: 'A collection with this name already exists' })
                        }));
                        mockCollections = {
                            create: jasmine.createSpy('create').and.returnValue(Observable_1.Observable.throw(errorResponse)),
                            load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of([mockCollection(), mockCollection()]))
                        };
                        componentUnderTest =
                            new collection_form_component_1.CollectionFormComponent(mockCollections, mockDetector, mockCollectionContext, mockStore);
                        componentUnderTest.collectionActionType = 'create';
                    });
                    it('Should assign a create collection error response to the serverError variable', function () {
                        componentUnderTest.collectionAction(mockCollection());
                        expect(componentUnderTest.serverErrors).toEqual({ collection: 'A collection with this name already exists' });
                    });
                    it('Should ask angular to run change detection', function () {
                        componentUnderTest.collectionAction(mockCollection());
                        expect(mockDetector.markForCheck).toHaveBeenCalled();
                    });
                });
            });
            describe('editCollection()', function () {
                describe('sucessful edit', function () {
                    it('Should edit a new collection', function () {
                        componentUnderTest.collectionActionType = 'edit';
                        componentUnderTest.collection = mockCollection();
                        spyOn(componentUnderTest.collectionSaved, 'emit');
                        componentUnderTest.collectionAction({ tags: 'cat, dog, cow' });
                        requestCollection = mockCollection();
                        requestCollection.tags = ['cat', 'dog', 'cow'];
                        expect(mockCollections.update).toHaveBeenCalledWith(2, { tags: ['cat', 'dog', 'cow'] });
                    });
                    it('Should reload all collections', function () {
                        componentUnderTest.collectionActionType = 'edit';
                        componentUnderTest.collection = mockCollection();
                        spyOn(componentUnderTest.collectionSaved, 'emit');
                        componentUnderTest.collectionAction(mockCollection());
                        requestCollection = mockCollection();
                        requestCollection.tags = ['cat', 'dog', 'cow'];
                        expect(mockCollections.load).toHaveBeenCalledWith({ 'q': '', 'accessLevel': 'all', 's': '', 'd': '', 'i': 0, 'n': 200 });
                    });
                    it('Should emit an event to indicate the collection has been saved', function () {
                        componentUnderTest.collectionActionType = 'edit';
                        componentUnderTest.collection = mockCollection();
                        spyOn(componentUnderTest.collectionSaved, 'emit');
                        componentUnderTest.collectionAction(mockCollection());
                        requestCollection = mockCollection();
                        requestCollection.tags = ['cat', 'dog', 'cow'];
                        expect(componentUnderTest.collectionSaved.emit).toHaveBeenCalled();
                    });
                    it('Should reload the active collection if the collection id matches the active collection id', function () {
                        componentUnderTest.collectionActionType = 'edit';
                        componentUnderTest.collection = mockCollection();
                        spyOn(componentUnderTest.collectionSaved, 'emit');
                        componentUnderTest.collectionAction(mockCollection());
                        requestCollection = mockCollection();
                        requestCollection.tags = ['cat', 'dog', 'cow'];
                        expect(activeCollectionLoadSpy).toHaveBeenCalled();
                    });
                    it('Should not reload the active collection if the collection id does not match the current active collection id', function () {
                        componentUnderTest.collectionActionType = 'edit';
                        componentUnderTest.collection = mockCollectionDiff();
                        componentUnderTest.collectionAction(mockCollection());
                        requestCollection = mockCollection();
                        requestCollection.tags = ['cat', 'dog', 'cow'];
                        expect(activeCollectionLoadSpy).not.toHaveBeenCalled();
                    });
                });
                describe('On error edit', function () {
                    beforeEach(function () {
                        var errorResponse = new http_1.Response(new http_1.ResponseOptions({
                            body: JSON.stringify({ collection: 'A collection with this name already exists' })
                        }));
                        mockCollections = {
                            update: jasmine.createSpy('update').and.returnValue(Observable_1.Observable.throw(errorResponse)),
                            load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of([mockCollection(), mockCollection()]))
                        };
                        componentUnderTest = new collection_form_component_1.CollectionFormComponent(mockCollections, mockDetector, mockCollectionContext, mockStore);
                        componentUnderTest.collectionActionType = 'edit';
                        componentUnderTest.collection = { id: 12 };
                    });
                    it('Should assign a edit collection error response to the serverError variable', function () {
                        componentUnderTest.collectionAction(mockCollection());
                        expect(componentUnderTest.serverErrors).toEqual({ collection: 'A collection with this name already exists' });
                    });
                    it('Should ask angular to run change detection', function () {
                        componentUnderTest.collectionAction(mockCollection());
                        expect(mockDetector.markForCheck).toHaveBeenCalled();
                    });
                });
            });
            describe('duplicateCollection()', function () {
                describe('Sucessful duplicate', function () {
                    beforeEach(function () {
                        componentUnderTest.collectionActionType = 'duplicate';
                        spyOn(componentUnderTest.collectionSaved, 'emit');
                        componentUnderTest.collectionAction(mockCollection());
                        requestCollection = mockCollection();
                        requestCollection.tags = ['cat', 'dog', 'cow'];
                    });
                    it('Should duplicate an existing collection', function () {
                        expect(mockCollections.duplicate).toHaveBeenCalledWith(requestCollection);
                    });
                    it('Should reset collection options in collection context', function () {
                        expect(mockCollectionContext.resetCollectionOptions).toHaveBeenCalled();
                    });
                    it('Should load the new active collection', function () {
                        expect(activeCollectionLoadSpy).toHaveBeenCalled();
                    });
                    it('Should reload all collections', function () {
                        expect(mockCollections.load).toHaveBeenCalledWith({ 'q': '', 'accessLevel': 'all', 's': '', 'd': '', 'i': 0, 'n': 200 });
                    });
                    it('Should emit an event to indicate the collection has been saved', function () {
                        expect(componentUnderTest.collectionSaved.emit).toHaveBeenCalled();
                    });
                });
                describe('On error Duplicate', function () {
                    beforeEach(function () {
                        var errorResponse = new http_1.Response(new http_1.ResponseOptions({
                            body: JSON.stringify({ collection: 'A collection with this name already exists' })
                        }));
                        mockCollections = {
                            duplicate: jasmine.createSpy('duplicate').and.returnValue(Observable_1.Observable.throw(errorResponse)),
                            load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of([mockCollection(), mockCollection()]))
                        };
                        componentUnderTest =
                            new collection_form_component_1.CollectionFormComponent(mockCollections, mockDetector, mockCollectionContext, mockStore);
                        componentUnderTest.collectionActionType = 'duplicate';
                    });
                    it('Should assign a create collection error response to the serverError variable', function () {
                        componentUnderTest.collectionAction(mockCollection());
                        expect(componentUnderTest.serverErrors).toEqual({ collection: 'A collection with this name already exists' });
                    });
                    it('Should ask angular to run change detection', function () {
                        componentUnderTest.collectionAction(mockCollection());
                        expect(mockDetector.markForCheck).toHaveBeenCalled();
                    });
                });
            });
        });
    });
}
exports.main = main;
function mockCollection() {
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
            { id: 300, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }
        ],
        viewers: [{ id: 4, firstName: 'Mary', lastName: 'Maze', emailAddress: 'mm@test.co' }]
    };
}
function mockCollectionDiff() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9jb2xsZWN0aW9uLXRyYXkvY29tcG9uZW50cy9jb2xsZWN0aW9uLWZvcm0uY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFFN0MseUVBQXNFO0FBQ3RFLDZFQUEwRTtBQUMxRSxzQ0FBMEQ7QUFDMUQ7SUFDRSxJQUFJLGtCQUEyQyxFQUFFLGVBQW9CLEVBQ25FLHFCQUEwQixFQUFFLG9CQUF5QixFQUFFLHVCQUFvQyxFQUMzRixZQUFpQixDQUFDO0lBQ3BCLElBQUksU0FBdUIsQ0FBQztJQUU1QixRQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFDcEMsVUFBVSxDQUFDO1lBQ1QsZUFBZSxHQUFHO2dCQUNoQixNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BGLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDckcsQ0FBQztZQUNGLHFCQUFxQixHQUFHO2dCQUN0QixzQkFBc0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDO2dCQUNuRSxrQkFBa0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO2FBQzVELENBQUM7WUFDRixZQUFZLEdBQUc7Z0JBQ2IsWUFBWSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO2FBQ2hELENBQUM7WUFDRixTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDL0IsU0FBUyxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFO2dCQUMvQyxVQUFVLEVBQUU7b0JBQ1YsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUU7d0JBQ2IsS0FBSyxFQUFFOzRCQUNMLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRTs0QkFDekQsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTt5QkFDeEQ7cUJBQ0Y7aUJBQ0YsRUFBRSxNQUFNLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQUM7WUFDSCx1QkFBdUIsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDMUYsa0JBQWtCO2dCQUNoQixJQUFJLG1EQUF1QixDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakcsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRTtnQkFDMUMsRUFBRSxDQUFDLG9EQUFvRCxFQUFFO29CQUN2RCxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztvQkFDbkQsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDNUMsUUFBUSxFQUFFLDBCQUEwQjs0QkFDcEMsV0FBVyxFQUFFLGdDQUFnQzs0QkFDN0MsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLGlCQUFpQixFQUFFLGdEQUFnRDs0QkFDbkUsSUFBSSxFQUFFLE1BQU07NEJBQ1osS0FBSyxFQUFFLHVDQUF1Qzs0QkFDOUMsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLEtBQUssRUFBRSxFQUFFOzRCQUNULFVBQVUsRUFBRSxVQUFVO3lCQUN2Qjt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsTUFBTTs0QkFDWixLQUFLLEVBQUUsNEJBQTRCOzRCQUNuQyxJQUFJLEVBQUUsTUFBTTs0QkFDWixLQUFLLEVBQUUsRUFBRTs0QkFDVCxJQUFJLEVBQUUsRUFBRTt5QkFDVCxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMseURBQXlELEVBQUU7b0JBQzVELGtCQUFrQixDQUFDLE1BQU0sR0FBRyxvQkFBb0IsRUFBRSxDQUFDO29CQUNuRCxrQkFBa0IsQ0FBQyxVQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQVMsQ0FBQztvQkFDbkYsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDNUMsUUFBUSxFQUFFLDBCQUEwQjs0QkFDcEMsV0FBVyxFQUFFLGdDQUFnQzs0QkFDN0MsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLGlCQUFpQixFQUFFLGdEQUFnRDs0QkFDbkUsSUFBSSxFQUFFLE1BQU07NEJBQ1osS0FBSyxFQUFFLHVDQUF1Qzs0QkFDOUMsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLEtBQUssRUFBRSxpQkFBaUI7NEJBQ3hCLFVBQVUsRUFBRSxVQUFVO3lCQUN2Qjt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsTUFBTTs0QkFDWixLQUFLLEVBQUUsNEJBQTRCOzRCQUNuQyxJQUFJLEVBQUUsTUFBTTs0QkFDWixLQUFLLEVBQUUsTUFBTTs0QkFDYixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7eUJBQ2YsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLDZEQUE2RCxFQUFFO29CQUNoRSxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztvQkFDbkQsa0JBQWtCLENBQUMsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFTLENBQUM7b0JBQ25GLGtCQUFrQixDQUFDLG9CQUFvQixHQUFHLFdBQVcsQ0FBQztvQkFDdEQsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDNUMsUUFBUSxFQUFFLDBCQUEwQjs0QkFDcEMsV0FBVyxFQUFFLGdDQUFnQzs0QkFDN0MsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLGlCQUFpQixFQUFFLGdEQUFnRDs0QkFDbkUsSUFBSSxFQUFFLE1BQU07NEJBQ1osS0FBSyxFQUFFLHVDQUF1Qzs0QkFDOUMsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLEtBQUssRUFBRSx3QkFBd0I7NEJBQy9CLFVBQVUsRUFBRSxVQUFVO3lCQUN2Qjt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsTUFBTTs0QkFDWixLQUFLLEVBQUUsNEJBQTRCOzRCQUNuQyxJQUFJLEVBQUUsTUFBTTs0QkFDWixLQUFLLEVBQUUsTUFBTTs0QkFDYixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7eUJBQ2YsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyx1RkFBdUYsRUFBRTtnQkFDaEcsRUFBRSxDQUFDLDhCQUE4QixFQUFFO29CQUNqQyxrQkFBa0IsQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUM7b0JBQ25ELGtCQUFrQixDQUFDLE1BQU0sR0FBRyxvQkFBb0IsRUFBRSxDQUFDO29CQUNuRCxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDcEMsS0FBSyxFQUFFLHNCQUFzQjt3QkFDN0IsV0FBVyxFQUFFLDhCQUE4Qjt3QkFDM0MsS0FBSyxFQUFFLG1DQUFtQztxQkFDM0MsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILEVBQUUsQ0FBQyw0QkFBNEIsRUFBRTtvQkFDL0Isa0JBQWtCLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDO29CQUNqRCxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztvQkFDbkQsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ3BDLEtBQUssRUFBRSx1QkFBdUI7d0JBQzlCLFdBQVcsRUFBRSw4QkFBOEI7d0JBQzNDLEtBQUssRUFBRSxtQ0FBbUM7cUJBQzNDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxFQUFFLENBQUMsaUNBQWlDLEVBQUU7b0JBQ3BDLGtCQUFrQixDQUFDLG9CQUFvQixHQUFHLFdBQVcsQ0FBQztvQkFDdEQsa0JBQWtCLENBQUMsTUFBTSxHQUFHLG9CQUFvQixFQUFFLENBQUM7b0JBQ25ELGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNwQyxLQUFLLEVBQUUsNEJBQTRCO3dCQUNuQyxXQUFXLEVBQUUsbUNBQW1DO3dCQUNoRCxLQUFLLEVBQUUsbUNBQW1DO3FCQUMzQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLElBQUksaUJBQTZCLENBQUM7WUFDbEMsUUFBUSxDQUFDLG9CQUFvQixFQUFFO2dCQUM3QixRQUFRLENBQUMsa0JBQWtCLEVBQUU7b0JBQzNCLFVBQVUsQ0FBQzt3QkFDVCxrQkFBa0IsQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUM7d0JBQ25ELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ2xELGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7d0JBQ3RELGlCQUFpQixHQUFHLGNBQWMsRUFBRSxDQUFDO3dCQUNyQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxDQUFDLENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsZ0NBQWdDLEVBQUU7d0JBQ25DLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDekUsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO3dCQUMxRCxNQUFNLENBQUMscUJBQXFCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUMxRSxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUU7d0JBQzFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTt3QkFDbEMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FDL0MsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzNFLENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRTt3QkFFbkUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUNyRSxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFSCxRQUFRLENBQUMsaUJBQWlCLEVBQUU7b0JBQzFCLFVBQVUsQ0FBQzt3QkFDVCxJQUFNLGFBQWEsR0FBYSxJQUFJLGVBQVEsQ0FBQyxJQUFJLHNCQUFlLENBQUM7NEJBQy9ELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBVSxFQUFFLDRDQUE0QyxFQUFFLENBQUM7eUJBQ25GLENBQUMsQ0FBQyxDQUFDO3dCQUVKLGVBQWUsR0FBRzs0QkFDaEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFDcEYsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDckcsQ0FBQzt3QkFFRixrQkFBa0I7NEJBQ2hCLElBQUksbURBQXVCLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDL0Ysa0JBQWtCLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDO29CQUNyRCxDQUFDLENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsOEVBQThFLEVBQUU7d0JBQ2pGLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7d0JBQ3RELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsNENBQTRDLEVBQUUsQ0FBQyxDQUFDO29CQUVoSCxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsNENBQTRDLEVBQUU7d0JBQy9DLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7d0JBQ3RELE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDdkQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtnQkFDM0IsUUFBUSxDQUFDLGdCQUFnQixFQUFFO29CQUN6QixFQUFFLENBQUMsOEJBQThCLEVBQUU7d0JBQ2pDLGtCQUFrQixDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQzt3QkFDakQsa0JBQWtCLENBQUMsVUFBVSxHQUFHLGNBQWMsRUFBRSxDQUFDO3dCQUNqRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNsRCxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQVMsQ0FBQyxDQUFDO3dCQUN0RSxpQkFBaUIsR0FBRyxjQUFjLEVBQUUsQ0FBQzt3QkFDckMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDMUYsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFO3dCQUNsQyxrQkFBa0IsQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUM7d0JBQ2pELGtCQUFrQixDQUFDLFVBQVUsR0FBRyxjQUFjLEVBQUUsQ0FBQzt3QkFDakQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDbEQsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzt3QkFDdEQsaUJBQWlCLEdBQUcsY0FBYyxFQUFFLENBQUM7d0JBQ3JDLGlCQUFpQixDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQy9DLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQy9DLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUMzRSxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsZ0VBQWdFLEVBQUU7d0JBQ25FLGtCQUFrQixDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQzt3QkFDakQsa0JBQWtCLENBQUMsVUFBVSxHQUFHLGNBQWMsRUFBRSxDQUFDO3dCQUNqRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNsRCxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO3dCQUN0RCxpQkFBaUIsR0FBRyxjQUFjLEVBQUUsQ0FBQzt3QkFDckMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDL0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUNyRSxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsMkZBQTJGLEVBQUU7d0JBQzlGLGtCQUFrQixDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQzt3QkFDakQsa0JBQWtCLENBQUMsVUFBVSxHQUFHLGNBQWMsRUFBRSxDQUFDO3dCQUNqRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNsRCxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO3dCQUN0RCxpQkFBaUIsR0FBRyxjQUFjLEVBQUUsQ0FBQzt3QkFDckMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDL0MsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLDhHQUE4RyxFQUMvRzt3QkFDRSxrQkFBa0IsQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUM7d0JBQ2pELGtCQUFrQixDQUFDLFVBQVUsR0FBRyxrQkFBa0IsRUFBRSxDQUFDO3dCQUNyRCxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO3dCQUN0RCxpQkFBaUIsR0FBRyxjQUFjLEVBQUUsQ0FBQzt3QkFDckMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDL0MsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3pELENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7b0JBQ3hCLFVBQVUsQ0FBQzt3QkFDVCxJQUFNLGFBQWEsR0FBYSxJQUFJLGVBQVEsQ0FBQyxJQUFJLHNCQUFlLENBQUM7NEJBQy9ELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBVSxFQUFFLDRDQUE0QyxFQUFFLENBQUM7eUJBQ25GLENBQUMsQ0FBQyxDQUFDO3dCQUVKLGVBQWUsR0FBRzs0QkFDaEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFDcEYsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDckcsQ0FBQzt3QkFFRixrQkFBa0IsR0FBRyxJQUFJLG1EQUF1QixDQUM5QyxlQUFlLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsQ0FDaEUsQ0FBQzt3QkFDRixrQkFBa0IsQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUM7d0JBQ2pELGtCQUFrQixDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQVMsQ0FBQztvQkFDcEQsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLDRFQUE0RSxFQUFFO3dCQUMvRSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO3dCQUN0RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLDRDQUE0QyxFQUFFLENBQUMsQ0FBQztvQkFFaEgsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO3dCQUMvQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO3dCQUN0RCxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3ZELENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ2hDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtvQkFDOUIsVUFBVSxDQUFDO3dCQUNULGtCQUFrQixDQUFDLG9CQUFvQixHQUFHLFdBQVcsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDbEQsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzt3QkFDdEQsaUJBQWlCLEdBQUcsY0FBYyxFQUFFLENBQUM7d0JBQ3JDLGlCQUFpQixDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2pELENBQUMsQ0FBQyxDQUFDO29CQUNILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTt3QkFDNUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUM1RSxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsdURBQXVELEVBQUU7d0JBQzFELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQzFFLENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRTt3QkFDMUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFO3dCQUNsQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUMvQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDM0UsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO3dCQUVuRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3JFLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtvQkFDN0IsVUFBVSxDQUFDO3dCQUNULElBQU0sYUFBYSxHQUFhLElBQUksZUFBUSxDQUFDLElBQUksc0JBQWUsQ0FBQzs0QkFDL0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLEVBQUUsNENBQTRDLEVBQUUsQ0FBQzt5QkFDbkYsQ0FBQyxDQUFDLENBQUM7d0JBRUosZUFBZSxHQUFHOzRCQUNoQixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUMxRixJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNyRyxDQUFDO3dCQUVGLGtCQUFrQjs0QkFDaEIsSUFBSSxtREFBdUIsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUMvRixrQkFBa0IsQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxDQUFDO29CQUNILEVBQUUsQ0FBQyw4RUFBOEUsRUFBRTt3QkFDakYsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzt3QkFDdEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSw0Q0FBNEMsRUFBRSxDQUFDLENBQUM7b0JBRWhILENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRTt3QkFDL0Msa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzt3QkFDdEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN2RCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsV0Qsb0JBa1dDO0FBRUQ7SUFDRSxNQUFNLENBQUM7UUFDTCxFQUFFLEVBQUUsQ0FBQztRQUNMLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLDBCQUEwQixDQUFDO1FBQy9DLEtBQUssRUFBRSxHQUFHO1FBQ1YsSUFBSSxFQUFFLGVBQWU7UUFDckIsUUFBUSxFQUFFLE9BQU87UUFDakIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFO1lBQzFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRTtZQUN6RSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUU7U0FBQztRQUM3RSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQztLQUN0RixDQUFDO0FBQ0osQ0FBQztBQUVEO0lBQ0UsTUFBTSxDQUFDO1FBQ0wsRUFBRSxFQUFFLENBQUM7UUFDTCxRQUFRLEVBQUUsTUFBTTtRQUNoQixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLEtBQUssRUFBRSxHQUFHO1FBQ1YsSUFBSSxFQUFFLGVBQWU7S0FDdEIsQ0FBQztBQUNKLENBQUM7QUFFRDtJQUNFLE1BQU0sQ0FBQztRQUNMLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRTtnQkFDTDtvQkFDRSxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxXQUFXLEVBQUUsZ0NBQWdDO29CQUM3QyxPQUFPLEVBQUUsUUFBUTtvQkFDakIsaUJBQWlCLEVBQUUsZ0RBQWdEO29CQUNuRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixLQUFLLEVBQUUsdUNBQXVDO29CQUM5QyxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsVUFBVSxFQUFFLFVBQVU7aUJBQ3ZCO2dCQUNEO29CQUNFLElBQUksRUFBRSxNQUFNO29CQUNaLEtBQUssRUFBRSw0QkFBNEI7b0JBQ25DLElBQUksRUFBRSxNQUFNO29CQUNaLEtBQUssRUFBRSxFQUFFO2lCQUNWO2FBQ0Y7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDIiwiZmlsZSI6ImFwcC9hcHBsaWNhdGlvbi9jb2xsZWN0aW9uLXRyYXkvY29tcG9uZW50cy9jb2xsZWN0aW9uLWZvcm0uY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29sbGVjdGlvbi1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgUmVzcG9uc2VPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IENvbGxlY3Rpb25Gb3JtQ29tcG9uZW50LCBtb2NrQ29sbGVjdGlvbnM6IGFueSxcbiAgICBtb2NrQ29sbGVjdGlvbkNvbnRleHQ6IGFueSwgbW9ja0FjdGl2ZUNvbGxlY3Rpb246IGFueSwgYWN0aXZlQ29sbGVjdGlvbkxvYWRTcHk6IGphc21pbmUuU3B5LFxuICAgIG1vY2tEZXRlY3RvcjogYW55O1xuICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgZGVzY3JpYmUoJ0NvbGxlY3Rpb24gRm9ybSBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrQ29sbGVjdGlvbnMgPSB7XG4gICAgICAgIGNyZWF0ZTogamFzbWluZS5jcmVhdGVTcHkoJ2NyZWF0ZScpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKG1vY2tDb2xsZWN0aW9uKCkpKSxcbiAgICAgICAgdXBkYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgndXBkYXRlJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe30pKSxcbiAgICAgICAgZHVwbGljYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnZHVwbGljYXRlJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe30pKSxcbiAgICAgICAgbG9hZDogamFzbWluZS5jcmVhdGVTcHkoJ2xvYWQnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZihbbW9ja0NvbGxlY3Rpb24oKSwgbW9ja0NvbGxlY3Rpb24oKV0pKVxuICAgICAgfTtcbiAgICAgIG1vY2tDb2xsZWN0aW9uQ29udGV4dCA9IHtcbiAgICAgICAgcmVzZXRDb2xsZWN0aW9uT3B0aW9uczogamFzbWluZS5jcmVhdGVTcHkoJ3Jlc2V0Q29sbGVjdGlvbk9wdGlvbnMnKSxcbiAgICAgICAgcmVmcmVzaENvbGxlY3Rpb25zOiBqYXNtaW5lLmNyZWF0ZVNweSgncmVmcmVzaENvbGxlY3Rpb25zJylcbiAgICAgIH07XG4gICAgICBtb2NrRGV0ZWN0b3IgPSB7XG4gICAgICAgIG1hcmtGb3JDaGVjazogamFzbWluZS5jcmVhdGVTcHkoJ21hcmtGb3JDaGVjaycpXG4gICAgICB9O1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYWN0aXZlQ29sbGVjdGlvbicsIHtcbiAgICAgICAgY29sbGVjdGlvbjoge1xuICAgICAgICAgIGlkOiAyLCBhc3NldHM6IHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgaWQ6IDEyMywgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogMTIzLCB0aW1lRW5kOiA0NTYgfSxcbiAgICAgICAgICAgICAgeyBpZDogNDU2LCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAtMSwgdGltZUVuZDogLTIgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgbG9hZGVkOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGFjdGl2ZUNvbGxlY3Rpb25Mb2FkU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2FjdGl2ZUNvbGxlY3Rpb24nLCAnbG9hZCcpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID1cbiAgICAgICAgbmV3IENvbGxlY3Rpb25Gb3JtQ29tcG9uZW50KG1vY2tDb2xsZWN0aW9ucywgbW9ja0RldGVjdG9yLCBtb2NrQ29sbGVjdGlvbkNvbnRleHQsIG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmdPbkluaXQoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdzZXRGb3JtKCkgZm9yIGNvbGxlY3Rpb24gZmllbGRzJywgKCkgPT4ge1xuICAgICAgICBpdCgnU2hvdWxkIGNyZWF0ZSBmaWVsZHMgZm9yIGNyZWF0aW5nIGEgbmV3IGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZpZWxkcyA9IGNvbGxlY3Rpb25Gb3JtRmllbGRzKCk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtSXRlbXMpLnRvRXF1YWwoW3tcbiAgICAgICAgICAgIGVuZFBvaW50OiAnY29sbGVjdGlvblN1bW1hcnkvc2VhcmNoJyxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiAnYWNjZXNzTGV2ZWwsIGFsbCwgaSwgMCwgbiwgMTAwJyxcbiAgICAgICAgICAgIHNlcnZpY2U6ICdhc3NldHMnLFxuICAgICAgICAgICAgc3VnZ2VzdGlvbkhlYWRpbmc6ICdDT0xMRUNUSU9OLkZPUk0uVFlQRV9BSEVBRF9TVUdHRVNUSU9OU19IRUFESU5HJyxcbiAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgIGxhYmVsOiAnQ09MTEVDVElPTi5GT1JNLkNPTExFQ1RJT05fTkFNRV9MQUJFTCcsXG4gICAgICAgICAgICB0eXBlOiAnc3VnZ2VzdGlvbnMnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3RhZ3MnLFxuICAgICAgICAgICAgbGFiZWw6ICdDT0xMRUNUSU9OLkZPUk0uVEFHU19MQUJFTCcsXG4gICAgICAgICAgICB0eXBlOiAndGFncycsXG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICB0YWdzOiBbXVxuICAgICAgICAgIH1dKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ1Nob3VsZCBjcmVhdGUgZmllbGRzIGZvciBlZGl0aW5nIGFuIGV4aXN0aW5nIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZpZWxkcyA9IGNvbGxlY3Rpb25Gb3JtRmllbGRzKCk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb24gPSB7IG5hbWU6ICdUZXN0IENvbGxlY3Rpb24nLCB0YWdzOiBbJ3Rlc3QnXSB9IGFzIGFueTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmZvcm1JdGVtcykudG9FcXVhbChbe1xuICAgICAgICAgICAgZW5kUG9pbnQ6ICdjb2xsZWN0aW9uU3VtbWFyeS9zZWFyY2gnLFxuICAgICAgICAgICAgcXVlcnlQYXJhbXM6ICdhY2Nlc3NMZXZlbCwgYWxsLCBpLCAwLCBuLCAxMDAnLFxuICAgICAgICAgICAgc2VydmljZTogJ2Fzc2V0cycsXG4gICAgICAgICAgICBzdWdnZXN0aW9uSGVhZGluZzogJ0NPTExFQ1RJT04uRk9STS5UWVBFX0FIRUFEX1NVR0dFU1RJT05TX0hFQURJTkcnLFxuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgbGFiZWw6ICdDT0xMRUNUSU9OLkZPUk0uQ09MTEVDVElPTl9OQU1FX0xBQkVMJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWdnZXN0aW9ucycsXG4gICAgICAgICAgICB2YWx1ZTogJ1Rlc3QgQ29sbGVjdGlvbicsXG4gICAgICAgICAgICB2YWxpZGF0aW9uOiAnUkVRVUlSRUQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAndGFncycsXG4gICAgICAgICAgICBsYWJlbDogJ0NPTExFQ1RJT04uRk9STS5UQUdTX0xBQkVMJyxcbiAgICAgICAgICAgIHR5cGU6ICd0YWdzJyxcbiAgICAgICAgICAgIHZhbHVlOiAndGVzdCcsXG4gICAgICAgICAgICB0YWdzOiBbJ3Rlc3QnXVxuICAgICAgICAgIH1dKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ1Nob3VsZCBjcmVhdGUgZmllbGRzIGZvciBkdXBsaWNhdGluZyBhbiBleGlzdGluZyBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5maWVsZHMgPSBjb2xsZWN0aW9uRm9ybUZpZWxkcygpO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uID0geyBuYW1lOiAnVGVzdCBDb2xsZWN0aW9uJywgdGFnczogWyd0ZXN0J10gfSBhcyBhbnk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25BY3Rpb25UeXBlID0gJ2R1cGxpY2F0ZSc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5mb3JtSXRlbXMpLnRvRXF1YWwoW3tcbiAgICAgICAgICAgIGVuZFBvaW50OiAnY29sbGVjdGlvblN1bW1hcnkvc2VhcmNoJyxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiAnYWNjZXNzTGV2ZWwsIGFsbCwgaSwgMCwgbiwgMTAwJyxcbiAgICAgICAgICAgIHNlcnZpY2U6ICdhc3NldHMnLFxuICAgICAgICAgICAgc3VnZ2VzdGlvbkhlYWRpbmc6ICdDT0xMRUNUSU9OLkZPUk0uVFlQRV9BSEVBRF9TVUdHRVNUSU9OU19IRUFESU5HJyxcbiAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgIGxhYmVsOiAnQ09MTEVDVElPTi5GT1JNLkNPTExFQ1RJT05fTkFNRV9MQUJFTCcsXG4gICAgICAgICAgICB0eXBlOiAnc3VnZ2VzdGlvbnMnLFxuICAgICAgICAgICAgdmFsdWU6ICdDb3B5IC0gVGVzdCBDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgIHZhbGlkYXRpb246ICdSRVFVSVJFRCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd0YWdzJyxcbiAgICAgICAgICAgIGxhYmVsOiAnQ09MTEVDVElPTi5GT1JNLlRBR1NfTEFCRUwnLFxuICAgICAgICAgICAgdHlwZTogJ3RhZ3MnLFxuICAgICAgICAgICAgdmFsdWU6ICd0ZXN0JyxcbiAgICAgICAgICAgIHRhZ3M6IFsndGVzdCddXG4gICAgICAgICAgfV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnU2V0cyB0aGUgY29ycmVjdCB0cmFuc2xhdGlvbiBzdHJpbmdzIGJhc2VkIG9uIHRoZSBmb3JtIHR5cGUgLSBlZGl0LCBjcmVhdGUsIGR1cGxpY2F0ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ1Nob3VsZCBiZSBjb3JyZWN0IGZvciBjcmVhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25BY3Rpb25UeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZpZWxkcyA9IGNvbGxlY3Rpb25Gb3JtRmllbGRzKCk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50cikudG9FcXVhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ0NPTExFQ1RJT04uTkVXX1RJVExFJyxcbiAgICAgICAgICAgIHN1Ym1pdExhYmVsOiAnQ09MTEVDVElPTi5GT1JNLlNVQk1JVF9MQUJFTCcsXG4gICAgICAgICAgICBjbG9zZTogJ0NPTExFQ1RJT04uRk9STS5DTE9TRV9IT1ZFUl9USVRMRSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdTaG91bGQgYmUgY29ycmVjdCBmb3IgZWRpdCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvblR5cGUgPSAnZWRpdCc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZpZWxkcyA9IGNvbGxlY3Rpb25Gb3JtRmllbGRzKCk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50cikudG9FcXVhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ0NPTExFQ1RJT04uRURJVC5USVRMRScsXG4gICAgICAgICAgICBzdWJtaXRMYWJlbDogJ0NPTExFQ1RJT04uRURJVC5TVUJNSVRfTEFCRUwnLFxuICAgICAgICAgICAgY2xvc2U6ICdDT0xMRUNUSU9OLkZPUk0uQ0xPU0VfSE9WRVJfVElUTEUnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnU2hvdWxkIGJlIGNvcnJlY3QgZm9yIGR1cGxpY2F0ZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvblR5cGUgPSAnZHVwbGljYXRlJztcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZmllbGRzID0gY29sbGVjdGlvbkZvcm1GaWVsZHMoKTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRyKS50b0VxdWFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAnQ09MTEVDVElPTi5EVVBMSUNBVEUuVElUTEUnLFxuICAgICAgICAgICAgc3VibWl0TGFiZWw6ICdDT0xMRUNUSU9OLkRVUExJQ0FURS5TVUJNSVRfTEFCRUwnLFxuICAgICAgICAgICAgY2xvc2U6ICdDT0xMRUNUSU9OLkZPUk0uQ0xPU0VfSE9WRVJfVElUTEUnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29sbGVjdGlvbkFjdGlvbigpJywgKCkgPT4ge1xuICAgICAgbGV0IHJlcXVlc3RDb2xsZWN0aW9uOiBDb2xsZWN0aW9uO1xuICAgICAgZGVzY3JpYmUoJ2NyZWF0ZUNvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgICAgZGVzY3JpYmUoJ1N1Y2Vzc2Z1bCBjcmVhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvblR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uU2F2ZWQsICdlbWl0Jyk7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvbihtb2NrQ29sbGVjdGlvbigpKTtcbiAgICAgICAgICAgIHJlcXVlc3RDb2xsZWN0aW9uID0gbW9ja0NvbGxlY3Rpb24oKTtcbiAgICAgICAgICAgIHJlcXVlc3RDb2xsZWN0aW9uLnRhZ3MgPSBbJ2NhdCcsICdkb2cnLCAnY293J107XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaXQoJ1Nob3VsZCBjcmVhdGUgYSBuZXcgY29sbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnMuY3JlYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXF1ZXN0Q29sbGVjdGlvbik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnU2hvdWxkIHJlc2V0IGNvbGxlY3Rpb24gb3B0aW9ucyBpbiBjb2xsZWN0aW9uIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25Db250ZXh0LnJlc2V0Q29sbGVjdGlvbk9wdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdTaG91bGQgbG9hZCB0aGUgbmV3IGFjdGl2ZSBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGFjdGl2ZUNvbGxlY3Rpb25Mb2FkU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnU2hvdWxkIHJlbG9hZCBhbGwgY29sbGVjdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25zLmxvYWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICB7ICdxJzogJycsICdhY2Nlc3NMZXZlbCc6ICdhbGwnLCAncyc6ICcnLCAnZCc6ICcnLCAnaSc6IDAsICduJzogMjAwIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ1Nob3VsZCBlbWl0IGFuIGV2ZW50IHRvIGluZGljYXRlIHRoZSBjb2xsZWN0aW9uIGhhcyBiZWVuIHNhdmVkJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25TYXZlZC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdPbiBlcnJvciBjcmVhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvclJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZShuZXcgUmVzcG9uc2VPcHRpb25zKHtcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb2xsZWN0aW9uOiAnQSBjb2xsZWN0aW9uIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzJyB9KVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBtb2NrQ29sbGVjdGlvbnMgPSB7XG4gICAgICAgICAgICAgIGNyZWF0ZTogamFzbWluZS5jcmVhdGVTcHkoJ2NyZWF0ZScpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLnRocm93KGVycm9yUmVzcG9uc2UpKSxcbiAgICAgICAgICAgICAgbG9hZDogamFzbWluZS5jcmVhdGVTcHkoJ2xvYWQnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZihbbW9ja0NvbGxlY3Rpb24oKSwgbW9ja0NvbGxlY3Rpb24oKV0pKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID1cbiAgICAgICAgICAgICAgbmV3IENvbGxlY3Rpb25Gb3JtQ29tcG9uZW50KG1vY2tDb2xsZWN0aW9ucywgbW9ja0RldGVjdG9yLCBtb2NrQ29sbGVjdGlvbkNvbnRleHQsIG1vY2tTdG9yZSk7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvblR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpdCgnU2hvdWxkIGFzc2lnbiBhIGNyZWF0ZSBjb2xsZWN0aW9uIGVycm9yIHJlc3BvbnNlIHRvIHRoZSBzZXJ2ZXJFcnJvciB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uKG1vY2tDb2xsZWN0aW9uKCkpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZXJ2ZXJFcnJvcnMpLnRvRXF1YWwoeyBjb2xsZWN0aW9uOiAnQSBjb2xsZWN0aW9uIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzJyB9KTtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ1Nob3VsZCBhc2sgYW5ndWxhciB0byBydW4gY2hhbmdlIGRldGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uKG1vY2tDb2xsZWN0aW9uKCkpO1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tEZXRlY3Rvci5tYXJrRm9yQ2hlY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2VkaXRDb2xsZWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGRlc2NyaWJlKCdzdWNlc3NmdWwgZWRpdCcsICgpID0+IHtcbiAgICAgICAgICBpdCgnU2hvdWxkIGVkaXQgYSBuZXcgY29sbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uVHlwZSA9ICdlZGl0JztcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uID0gbW9ja0NvbGxlY3Rpb24oKTtcbiAgICAgICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uU2F2ZWQsICdlbWl0Jyk7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvbih7IHRhZ3M6ICdjYXQsIGRvZywgY293JyB9IGFzIGFueSk7XG4gICAgICAgICAgICByZXF1ZXN0Q29sbGVjdGlvbiA9IG1vY2tDb2xsZWN0aW9uKCk7XG4gICAgICAgICAgICByZXF1ZXN0Q29sbGVjdGlvbi50YWdzID0gWydjYXQnLCAnZG9nJywgJ2NvdyddO1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tDb2xsZWN0aW9ucy51cGRhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDIsIHsgdGFnczogWydjYXQnLCAnZG9nJywgJ2NvdyddIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ1Nob3VsZCByZWxvYWQgYWxsIGNvbGxlY3Rpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25BY3Rpb25UeXBlID0gJ2VkaXQnO1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbigpO1xuICAgICAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25TYXZlZCwgJ2VtaXQnKTtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uKG1vY2tDb2xsZWN0aW9uKCkpO1xuICAgICAgICAgICAgcmVxdWVzdENvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbigpO1xuICAgICAgICAgICAgcmVxdWVzdENvbGxlY3Rpb24udGFncyA9IFsnY2F0JywgJ2RvZycsICdjb3cnXTtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnMubG9hZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgIHsgJ3EnOiAnJywgJ2FjY2Vzc0xldmVsJzogJ2FsbCcsICdzJzogJycsICdkJzogJycsICdpJzogMCwgJ24nOiAyMDAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnU2hvdWxkIGVtaXQgYW4gZXZlbnQgdG8gaW5kaWNhdGUgdGhlIGNvbGxlY3Rpb24gaGFzIGJlZW4gc2F2ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvblR5cGUgPSAnZWRpdCc7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbiA9IG1vY2tDb2xsZWN0aW9uKCk7XG4gICAgICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvblNhdmVkLCAnZW1pdCcpO1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25BY3Rpb24obW9ja0NvbGxlY3Rpb24oKSk7XG4gICAgICAgICAgICByZXF1ZXN0Q29sbGVjdGlvbiA9IG1vY2tDb2xsZWN0aW9uKCk7XG4gICAgICAgICAgICByZXF1ZXN0Q29sbGVjdGlvbi50YWdzID0gWydjYXQnLCAnZG9nJywgJ2NvdyddO1xuICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uU2F2ZWQuZW1pdCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ1Nob3VsZCByZWxvYWQgdGhlIGFjdGl2ZSBjb2xsZWN0aW9uIGlmIHRoZSBjb2xsZWN0aW9uIGlkIG1hdGNoZXMgdGhlIGFjdGl2ZSBjb2xsZWN0aW9uIGlkJywgKCkgPT4ge1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25BY3Rpb25UeXBlID0gJ2VkaXQnO1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbigpO1xuICAgICAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25TYXZlZCwgJ2VtaXQnKTtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uKG1vY2tDb2xsZWN0aW9uKCkpO1xuICAgICAgICAgICAgcmVxdWVzdENvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbigpO1xuICAgICAgICAgICAgcmVxdWVzdENvbGxlY3Rpb24udGFncyA9IFsnY2F0JywgJ2RvZycsICdjb3cnXTtcbiAgICAgICAgICAgIGV4cGVjdChhY3RpdmVDb2xsZWN0aW9uTG9hZFNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ1Nob3VsZCBub3QgcmVsb2FkIHRoZSBhY3RpdmUgY29sbGVjdGlvbiBpZiB0aGUgY29sbGVjdGlvbiBpZCBkb2VzIG5vdCBtYXRjaCB0aGUgY3VycmVudCBhY3RpdmUgY29sbGVjdGlvbiBpZCcsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uVHlwZSA9ICdlZGl0JztcbiAgICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbkRpZmYoKTtcbiAgICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25BY3Rpb24obW9ja0NvbGxlY3Rpb24oKSk7XG4gICAgICAgICAgICAgIHJlcXVlc3RDb2xsZWN0aW9uID0gbW9ja0NvbGxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgcmVxdWVzdENvbGxlY3Rpb24udGFncyA9IFsnY2F0JywgJ2RvZycsICdjb3cnXTtcbiAgICAgICAgICAgICAgZXhwZWN0KGFjdGl2ZUNvbGxlY3Rpb25Mb2FkU3B5KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdPbiBlcnJvciBlZGl0JywgKCkgPT4ge1xuICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JSZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobmV3IFJlc3BvbnNlT3B0aW9ucyh7XG4gICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY29sbGVjdGlvbjogJ0EgY29sbGVjdGlvbiB3aXRoIHRoaXMgbmFtZSBhbHJlYWR5IGV4aXN0cycgfSlcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgbW9ja0NvbGxlY3Rpb25zID0ge1xuICAgICAgICAgICAgICB1cGRhdGU6IGphc21pbmUuY3JlYXRlU3B5KCd1cGRhdGUnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS50aHJvdyhlcnJvclJlc3BvbnNlKSksXG4gICAgICAgICAgICAgIGxvYWQ6IGphc21pbmUuY3JlYXRlU3B5KCdsb2FkJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YoW21vY2tDb2xsZWN0aW9uKCksIG1vY2tDb2xsZWN0aW9uKCldKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDb2xsZWN0aW9uRm9ybUNvbXBvbmVudChcbiAgICAgICAgICAgICAgbW9ja0NvbGxlY3Rpb25zLCBtb2NrRGV0ZWN0b3IsIG1vY2tDb2xsZWN0aW9uQ29udGV4dCwgbW9ja1N0b3JlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25BY3Rpb25UeXBlID0gJ2VkaXQnO1xuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb24gPSB7IGlkOiAxMiB9IGFzIGFueTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdTaG91bGQgYXNzaWduIGEgZWRpdCBjb2xsZWN0aW9uIGVycm9yIHJlc3BvbnNlIHRvIHRoZSBzZXJ2ZXJFcnJvciB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uKG1vY2tDb2xsZWN0aW9uKCkpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZXJ2ZXJFcnJvcnMpLnRvRXF1YWwoeyBjb2xsZWN0aW9uOiAnQSBjb2xsZWN0aW9uIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzJyB9KTtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ1Nob3VsZCBhc2sgYW5ndWxhciB0byBydW4gY2hhbmdlIGRldGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uKG1vY2tDb2xsZWN0aW9uKCkpO1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tEZXRlY3Rvci5tYXJrRm9yQ2hlY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2R1cGxpY2F0ZUNvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgICAgZGVzY3JpYmUoJ1N1Y2Vzc2Z1bCBkdXBsaWNhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvblR5cGUgPSAnZHVwbGljYXRlJztcbiAgICAgICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uU2F2ZWQsICdlbWl0Jyk7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvbihtb2NrQ29sbGVjdGlvbigpKTtcbiAgICAgICAgICAgIHJlcXVlc3RDb2xsZWN0aW9uID0gbW9ja0NvbGxlY3Rpb24oKTtcbiAgICAgICAgICAgIHJlcXVlc3RDb2xsZWN0aW9uLnRhZ3MgPSBbJ2NhdCcsICdkb2cnLCAnY293J107XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaXQoJ1Nob3VsZCBkdXBsaWNhdGUgYW4gZXhpc3RpbmcgY29sbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnMuZHVwbGljYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXF1ZXN0Q29sbGVjdGlvbik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnU2hvdWxkIHJlc2V0IGNvbGxlY3Rpb24gb3B0aW9ucyBpbiBjb2xsZWN0aW9uIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25Db250ZXh0LnJlc2V0Q29sbGVjdGlvbk9wdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdTaG91bGQgbG9hZCB0aGUgbmV3IGFjdGl2ZSBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGFjdGl2ZUNvbGxlY3Rpb25Mb2FkU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnU2hvdWxkIHJlbG9hZCBhbGwgY29sbGVjdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25zLmxvYWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICB7ICdxJzogJycsICdhY2Nlc3NMZXZlbCc6ICdhbGwnLCAncyc6ICcnLCAnZCc6ICcnLCAnaSc6IDAsICduJzogMjAwIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ1Nob3VsZCBlbWl0IGFuIGV2ZW50IHRvIGluZGljYXRlIHRoZSBjb2xsZWN0aW9uIGhhcyBiZWVuIHNhdmVkJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25TYXZlZC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdPbiBlcnJvciBEdXBsaWNhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvclJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZShuZXcgUmVzcG9uc2VPcHRpb25zKHtcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb2xsZWN0aW9uOiAnQSBjb2xsZWN0aW9uIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzJyB9KVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBtb2NrQ29sbGVjdGlvbnMgPSB7XG4gICAgICAgICAgICAgIGR1cGxpY2F0ZTogamFzbWluZS5jcmVhdGVTcHkoJ2R1cGxpY2F0ZScpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLnRocm93KGVycm9yUmVzcG9uc2UpKSxcbiAgICAgICAgICAgICAgbG9hZDogamFzbWluZS5jcmVhdGVTcHkoJ2xvYWQnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZihbbW9ja0NvbGxlY3Rpb24oKSwgbW9ja0NvbGxlY3Rpb24oKV0pKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID1cbiAgICAgICAgICAgICAgbmV3IENvbGxlY3Rpb25Gb3JtQ29tcG9uZW50KG1vY2tDb2xsZWN0aW9ucywgbW9ja0RldGVjdG9yLCBtb2NrQ29sbGVjdGlvbkNvbnRleHQsIG1vY2tTdG9yZSk7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbkFjdGlvblR5cGUgPSAnZHVwbGljYXRlJztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpdCgnU2hvdWxkIGFzc2lnbiBhIGNyZWF0ZSBjb2xsZWN0aW9uIGVycm9yIHJlc3BvbnNlIHRvIHRoZSBzZXJ2ZXJFcnJvciB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uKG1vY2tDb2xsZWN0aW9uKCkpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZXJ2ZXJFcnJvcnMpLnRvRXF1YWwoeyBjb2xsZWN0aW9uOiAnQSBjb2xsZWN0aW9uIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzJyB9KTtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ1Nob3VsZCBhc2sgYW5ndWxhciB0byBydW4gY2hhbmdlIGRldGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uQWN0aW9uKG1vY2tDb2xsZWN0aW9uKCkpO1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tEZXRlY3Rvci5tYXJrRm9yQ2hlY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vY2tDb2xsZWN0aW9uKCk6IENvbGxlY3Rpb24ge1xuICByZXR1cm4ge1xuICAgIGlkOiAyLFxuICAgIHNpdGVOYW1lOiAnY29yZScsXG4gICAgbmFtZTogJ2phbWVzIGJpbGxpbmdzJyxcbiAgICBjcmVhdGVkT246IG5ldyBEYXRlKCcyMDE3LTEwLTE3VDE5OjIwOjI1LjA4M1onKSxcbiAgICBvd25lcjogMTIzLFxuICAgIHRhZ3M6ICdjYXQsIGRvZywgY293JyxcbiAgICB1c2VyUm9sZTogJ293bmVyJyxcbiAgICBlZGl0b3JzOiBbXG4gICAgICB7IGlkOiAxLCBmaXJzdE5hbWU6ICdUb20nLCBsYXN0TmFtZTogJ1RodW1iJywgZW1haWxBZGRyZXNzOiAndHRAdGVzdC5jbycgfSxcbiAgICAgIHsgaWQ6IDIsIGZpcnN0TmFtZTogJ0phbmUnLCBsYXN0TmFtZTogJ0RvZScsIGVtYWlsQWRkcmVzczogJ2pkQHRlc3QuY28nIH0sXG4gICAgICB7IGlkOiAzMDAsIGZpcnN0TmFtZTogJ1R5JywgbGFzdE5hbWU6ICdUZXN0JywgZW1haWxBZGRyZXNzOiAndHlAdGVzdC5jbycgfV0sXG4gICAgdmlld2VyczogW3sgaWQ6IDQsIGZpcnN0TmFtZTogJ01hcnknLCBsYXN0TmFtZTogJ01hemUnLCBlbWFpbEFkZHJlc3M6ICdtbUB0ZXN0LmNvJyB9XVxuICB9O1xufVxuXG5mdW5jdGlvbiBtb2NrQ29sbGVjdGlvbkRpZmYoKTogQ29sbGVjdGlvbiB7XG4gIHJldHVybiB7XG4gICAgaWQ6IDQsXG4gICAgc2l0ZU5hbWU6ICdjb3JlJyxcbiAgICBuYW1lOiAnamFtZXMgYmlsbGluZ3MnLFxuICAgIG93bmVyOiAxMjMsXG4gICAgdGFnczogJ2NhdCwgZG9nLCBjb3cnXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3Rpb25Gb3JtRmllbGRzKCkge1xuICByZXR1cm4ge1xuICAgIGZvcm06IHtcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBlbmRQb2ludDogJ2NvbGxlY3Rpb25TdW1tYXJ5L3NlYXJjaCcsXG4gICAgICAgICAgcXVlcnlQYXJhbXM6ICdhY2Nlc3NMZXZlbCwgYWxsLCBpLCAwLCBuLCAxMDAnLFxuICAgICAgICAgIHNlcnZpY2U6ICdhc3NldHMnLFxuICAgICAgICAgIHN1Z2dlc3Rpb25IZWFkaW5nOiAnQ09MTEVDVElPTi5GT1JNLlRZUEVfQUhFQURfU1VHR0VTVElPTlNfSEVBRElORycsXG4gICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgIGxhYmVsOiAnQ09MTEVDVElPTi5GT1JNLkNPTExFQ1RJT05fTkFNRV9MQUJFTCcsXG4gICAgICAgICAgdHlwZTogJ3N1Z2dlc3Rpb25zJyxcbiAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3RhZ3MnLFxuICAgICAgICAgIGxhYmVsOiAnQ09MTEVDVElPTi5GT1JNLlRBR1NfTEFCRUwnLFxuICAgICAgICAgIHR5cGU6ICd0YWdzJyxcbiAgICAgICAgICB2YWx1ZTogJydcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfTtcbn1cblxuXG5cblxuIl19
