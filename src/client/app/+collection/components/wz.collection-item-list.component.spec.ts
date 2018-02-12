import { WzCollectionItemListComponent } from './wz.collection-item-list.component';
import { Collection } from '../../shared/interfaces/collection.interface';
import { Observable } from 'rxjs/Observable';

export function main() {
  describe('Wz Collection Item List Component', () => {
    let componentUnderTest: WzCollectionItemListComponent;
    let mockCapabilitiesService: any;

    beforeEach(() => {
      mockCapabilitiesService = {
        editCollection: jasmine.createSpy('editCollection').and.returnValue(Observable.of(true))
      };

      componentUnderTest = new WzCollectionItemListComponent(mockCapabilitiesService);
      componentUnderTest.currentCollection = mockCurrentCollection();
    });

    describe('selectActiveCollection()', () => {
      it('emits setActiveCollection with a collection id', () => {
        spyOn(componentUnderTest.setActiveCollection, 'emit');
        componentUnderTest.selectActiveCollection(123);

        expect(componentUnderTest.setActiveCollection.emit).toHaveBeenCalledWith(123);
      });
    });

    describe('setCurrentCollection()', () => {
      it('takes a collection and sets the currentCollection var to it', () => {
        componentUnderTest.setCurrentCollection(mockCollection());

        expect(componentUnderTest.currentCollection).toEqual(mockCollection());
      });
    });

    describe('collectionIsShared()', () => {
      it('should return true when collection has editors or viewers', () => {

        expect(componentUnderTest.collectionIsShared(mockCollection())).toBe(true);
      });
      it('should return false when collection does not have editors or viewers', () => {

        expect(componentUnderTest.collectionIsShared(mockCollectionNotShared())).toBe(false);
      });
    });

    describe('userCanEditCollection()', () => {
      it('should call editCollection() on the cababilities service', () => {
        let result: boolean;
        componentUnderTest.userCanEditCollection(mockCollection()).take(1).subscribe(r => result = r);

        expect(result).toBe(true);
      });
    });

    describe('collectionViewerIsOwner()', () => {
      it('should return true when person viewing the collection is the owner', () => {

        expect(componentUnderTest.collectionViewerIsOwner(mockCollection())).toBe(true);
      });
      it('should return false when person viewing the collection is the NOT owner', () => {

        expect(componentUnderTest.collectionViewerIsOwner(mockCollectionNotOwned())).toBe(false);
      });
    });

    describe('edit()', () => {
      it('emits editCollection with a collection', () => {
        spyOn(componentUnderTest.editCollection, 'emit');
        componentUnderTest.edit(mockCollection());

        expect(componentUnderTest.editCollection.emit).toHaveBeenCalledWith(mockCollection());
      });
    });

    describe('sharedMembers()', () => {
      it('emits showShareMembers with a collection', () => {
        spyOn(componentUnderTest.showShareMembers, 'emit');
        componentUnderTest.sharedMembers(mockCollection());

        expect(componentUnderTest.showShareMembers.emit).toHaveBeenCalledWith(mockCollection());
      });
    });

    describe('delete()', () => {
      it('emits deleteCollection with a collection', () => {
        spyOn(componentUnderTest.deleteCollection, 'emit');
        componentUnderTest.delete(mockCollection());

        expect(componentUnderTest.deleteCollection.emit).toHaveBeenCalledWith(mockCollection());
      });
    });

    describe('duplicate()', () => {
      it('emits duplicateCollection with the current collection id', () => {
        spyOn(componentUnderTest.duplicateCollection, 'emit');
        componentUnderTest.duplicate();

        expect(componentUnderTest.duplicateCollection.emit).toHaveBeenCalledWith(3);
      });
    });

    describe('generateLegacyLink()', () => {
      it('emits generateCollectionLink with the current collection id', () => {
        spyOn(componentUnderTest.generateCollectionLink, 'emit');
        componentUnderTest.generateLegacyLink();

        expect(componentUnderTest.generateCollectionLink.emit).toHaveBeenCalledWith(3);
      });
    });

    describe('onCreateShareDialog()', () => {
      it('emits createShareDialog with the current collection', () => {
        spyOn(componentUnderTest.createShareDialog, 'emit');
        componentUnderTest.onCreateShareDialog({ collection: 'some collection' } as any);

        expect(componentUnderTest.createShareDialog.emit).toHaveBeenCalledWith({ collection: 'some collection' });
      });
    });

    describe('notOwnerOf()', () => {
      it('return true if the current user is not the collection owner', () => {

        expect(componentUnderTest.notOwnerOf({ userRole: 'editor' } as any)).toBe(true);
      });

      it('return false if the current user is the collection owner', () => {

        expect(componentUnderTest.notOwnerOf({ userRole: 'owner' } as any)).toBe(false);
      });
    });

  });
};

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
function mockCurrentCollection(): Collection {
  return {
    id: 3,
    siteName: 'core',
    name: 'Reptiles',
    createdOn: new Date('2017-10-12T14:20:25.083Z'),
    owner: 333,
    tags: 'frog, lizard, snake',
    userRole: 'owner',
    editors: [
      { id: 6, firstName: 'Tom', lastName: 'Thumb', emailAddress: 'tt@test.co' },
      { id: 7, firstName: 'Jane', lastName: 'Doe', emailAddress: 'jd@test.co' },
      { id: 800, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }],
    viewers: [{ id: 5, firstName: 'Mary', lastName: 'Maze', emailAddress: 'mm@test.co' }]
  };
}
function mockCollectionNotShared(): Collection {
  return {
    id: 4,
    siteName: 'core',
    name: 'Business',
    createdOn: new Date('2017-07-12T14:20:25.083Z'),
    owner: 333,
    tags: 'suit, tie, pants',
    userRole: 'owner'
  };
}
function mockCollectionNotOwned(): Collection {
  return {
    id: 5,
    siteName: 'core',
    name: 'Mockeriffic collection',
    createdOn: new Date('2017-06-14T16:20:25.083Z'),
    owner: 7676,
    tags: 'blue, green',
    userRole: 'editor',
    editors: [
      { id: 6542, firstName: 'Tom', lastName: 'Thumb', emailAddress: 'tt@test.co' },
      { id: 3, firstName: 'Jane', lastName: 'Doe', emailAddress: 'jd@test.co' },
      { id: 100, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }]
  };
}
