import { CollectionListDdComponent } from './collections-list-dd.component';
import { Observable } from 'rxjs/Observable';
import { Common } from '../../../shared/utilities/common.functions';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Collection List DD Component', () => {
    let componentUnderTest: CollectionListDdComponent;
    let mockCollectionsService: any, mockCollectionContext: any, mockRouter: any, mockStore: any, activeCollectionSetSpy: jasmine.Spy;
    beforeEach(() => {
      mockCollectionsService = {
        data: Observable.of({ items: [] }),
        load: jasmine.createSpy('load').and.returnValue(Observable.of({}))
      };
      mockCollectionContext = {
        data: Observable.of({ some: 'options' }),
        updateCollectionOptions: jasmine.createSpy('updateCollectionOptions')
      };
      mockRouter = {
        url: '/collections/',
        navigate: () => true
      };
      mockStore = new MockAppStore();
      componentUnderTest = new CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, mockStore);
    });

    describe('Check default variables', () => {
      it('editMode is defaulted to false', () => {
        expect(componentUnderTest.editMode).toEqual(false);
      });

      it('roleFilter defaults to include all roles', () => {
        expect(componentUnderTest.roleFilter).toEqual(['owner', 'editor', 'viewer']);
      });

      it('collectionFilterIsShowing defaults to false', () => {
        expect(componentUnderTest.collectionFilterIsShowing).toEqual(false);
      });

      it('collectionSortIsShowing defaults to false', () => {
        expect(componentUnderTest.collectionFilterIsShowing).toEqual(false);
      });

      it('collectionSearchIsShowing defaults to false', () => {
        expect(componentUnderTest.collectionFilterIsShowing).toEqual(false);
      });
    });

    describe('ngOnInit()', () => {
      it('Should load collections if the collections items array length is 0', () => {
        componentUnderTest.ngOnInit();
        expect(mockCollectionsService.load).toHaveBeenCalled();
      });

      it('Should not load collections if the collections items array length is greater than 0', () => {
        mockCollectionsService.data = Observable.of({ items: [1, 2, 3] });
        componentUnderTest = new CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, mockStore);
        componentUnderTest.ngOnInit();
        expect(mockCollectionsService.load).not.toHaveBeenCalled();
      });

      it('Assigns the collectionContext data subscription value to the options variable', () => {
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.options).toEqual({ some: 'options' });
      });
    });

    describe('closeCollectionsList()', () => {
      it('Should emit the close event with a collection', () => {
        spyOn(componentUnderTest.close, 'emit');
        componentUnderTest.closeCollectionsList({ some: 'collection' } as any);
        expect(componentUnderTest.close.emit).toHaveBeenCalledWith({ some: 'collection' });
      });

      it('Should emit the close event without a collection', () => {
        spyOn(componentUnderTest.close, 'emit');
        componentUnderTest.closeCollectionsList();
        expect(componentUnderTest.close.emit).toHaveBeenCalledWith(undefined);
      });
    });

    describe('collectionList getter', () => {
      function collectionItems() {
        return [
          { id: 1, userRole: 'editor' },
          { id: 2, userRole: 'viewer' },
          { id: 3, userRole: 'owner' },
          { id: 4, userRole: 'owner' },
          { id: 5, userRole: 'editor' },
          { id: 6, userRole: 'viewer' }
        ];
      };

      beforeEach(() => {
        mockCollectionsService.data = Observable.of({ items: collectionItems() });
        componentUnderTest = new CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, null);
      });

      it('Should return all collections in the list if editMode and roleFilter are set to there default values', () => {
        let collectionList: any;
        componentUnderTest.collectionList.subscribe(list => collectionList = list);
        expect(collectionList).toEqual(collectionItems());
      });

      it(`Should return all collections in the list except the current focused 
      if editMode is true roleFilter is set to its default value`, () => {
          componentUnderTest.focusedCollection = { id: 1 } as any;
          componentUnderTest.editMode = true;
          let collectionList: any;
          componentUnderTest.collectionList.subscribe(list => collectionList = list);
          expect(collectionList).toEqual([
            { id: 2, userRole: 'viewer' },
            { id: 3, userRole: 'owner' },
            { id: 4, userRole: 'owner' },
            { id: 5, userRole: 'editor' },
            { id: 6, userRole: 'viewer' }
          ]);
        });

      it(`Should return all collections in the list except any items with userRole properties not in 
      the roleFilter input array (in this case it should not return any items with the userRole as viewer)`, () => {
          componentUnderTest.roleFilter = ['owner', 'editor'];
          let collectionList: any;
          componentUnderTest.collectionList.subscribe(list => collectionList = list);
          expect(collectionList).toEqual([
            { id: 1, userRole: 'editor' },
            { id: 3, userRole: 'owner' },
            { id: 4, userRole: 'owner' },
            { id: 5, userRole: 'editor' },
          ]);
        });

      it(`Should return all collections in the list except any items with userRole properties not 
      in the roleFilter input array (in this case it should not return any items with the userRole 
        as viewer), as well as the focused collection when edit mode is true`, () => {
          componentUnderTest.roleFilter = ['owner', 'editor'];
          componentUnderTest.focusedCollection = { id: 1 } as any;
          componentUnderTest.editMode = true;
          let collectionList: any;
          componentUnderTest.collectionList.subscribe(list => collectionList = list);
          expect(collectionList).toEqual([
            { id: 3, userRole: 'owner' },
            { id: 4, userRole: 'owner' },
            { id: 5, userRole: 'editor' },
          ]);
        });
    });

    describe('selectFocusedCollection()', () => {
      beforeEach(() => {
        spyOn(Common, 'onCollectionShowPage').and.callThrough();
        spyOn(mockRouter, 'navigate');
        activeCollectionSetSpy = mockStore.createActionFactoryMethod('activeCollection', 'set');
        componentUnderTest = new CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, mockStore);
        spyOn(componentUnderTest.close, 'emit');
      });

      it('closes collection list with close event including the selected collection only if edit mode is true', () => {
        componentUnderTest.editMode = true;
        componentUnderTest.selectFocusedCollection({ id: 123 } as any);
        expect(Common.onCollectionShowPage).not.toHaveBeenCalled();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
        expect(activeCollectionSetSpy).not.toHaveBeenCalled();
        expect(componentUnderTest.close.emit).toHaveBeenCalledWith({ id: 123 });
      });

      it(`re-navigates to collection show if already on collection show to load new collection 
      and closes collection list with close event including the selected collection if edit mode is false`, () => {
          componentUnderTest.editMode = false;
          componentUnderTest.selectFocusedCollection({ id: 123 } as any);
          expect(activeCollectionSetSpy).not.toHaveBeenCalled();
          expect(Common.onCollectionShowPage).toHaveBeenCalled();
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/collections/', 123, { i: 1, n: 100 }]);
          expect(componentUnderTest.close.emit).toHaveBeenCalledWith({ id: 123 });
        });

      it(`sets to the new collection if not on the collection show page and closes collection 
      list with close event including the selected collection if edit mode is false`, () => {
          mockRouter.url = 'notOnCollectionShowPage';
          componentUnderTest = new CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, mockStore);
          spyOn(componentUnderTest.close, 'emit');
          componentUnderTest.editMode = false;
          componentUnderTest.selectFocusedCollection({ id: 123 } as any);
          expect(mockRouter.navigate).not.toHaveBeenCalled();
          expect(Common.onCollectionShowPage).toHaveBeenCalled();
          expect(activeCollectionSetSpy).toHaveBeenCalledWith(123);
          expect(componentUnderTest.close.emit).toHaveBeenCalledWith({ id: 123 });
        });
    });

    describe('applyFilter()', () => {
      beforeEach(() => {
        componentUnderTest.collectionFilterIsShowing = true;
        componentUnderTest.applyFilter({ access: 'owner' });
      });

      it('updates the Collection context current filter', () => {
        expect(mockCollectionContext.updateCollectionOptions).toHaveBeenCalledWith({ currentFilter: { access: 'owner' } });
      });

      it('loads collection on new filter', () => {
        expect(mockCollectionsService.load).toHaveBeenCalledWith('owner');
      });

      it('toggles the collectionFilterIsShowing boolean', () => {
        expect(componentUnderTest.collectionFilterIsShowing).toEqual(false);
      });
    });

    describe('applySort()', () => {
      beforeEach(() => {
        componentUnderTest.collectionSortIsShowing = true;
        componentUnderTest.applySort({ sort: 'date' });
      });

      it('updates the Collection context current filter', () => {
        expect(mockCollectionContext.updateCollectionOptions).toHaveBeenCalledWith({ currentSort: { sort: 'date' } });
      });

      it('loads collection on new filter', () => {
        expect(mockCollectionsService.load).toHaveBeenCalledWith('date');
      });

      it('toggles the collectionFilterIsShowing boolean', () => {
        expect(componentUnderTest.collectionSortIsShowing).toEqual(false);
      });
    });

    describe('search()', () => {
      beforeEach(() => {
        componentUnderTest.search('oceans');
      });

      it('updates the Collection context current filter', () => {
        expect(mockCollectionContext.updateCollectionOptions).toHaveBeenCalledWith({ currentSearchQuery: 'oceans' });
      });

      it('loads collection on new filter', () => {
        expect(mockCollectionsService.load).toHaveBeenCalledWith('oceans');
      });
    });

    describe('showCollectionSearch()', () => {
      it('toggles the collectionSearchIsShowing boolean value', () => {
        componentUnderTest.collectionSearchIsShowing = false;
        componentUnderTest.showCollectionSearch();
        expect(componentUnderTest.collectionSearchIsShowing).toBe(true);
      });
    });

  });
}
