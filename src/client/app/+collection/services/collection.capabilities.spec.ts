import { Observable } from 'rxjs/Observable';

import { CollectionCapabilities } from './collection.capabilities';

export function main() {
  describe('Collection Capabilities', () => {
    let capabilitiesUnderTest: CollectionCapabilities, mockCurrentUserService: any;

    beforeEach(() => {
      mockCurrentUserService = { data: Observable.of({ id: 123, editableCollections: [7] }) };
      capabilitiesUnderTest = new CollectionCapabilities(mockCurrentUserService, null, null);
    });

    describe('editCollection()', () => {
      describe('returns an observable of true', () => {
        it('when the user\'s id is the same as the collection\'s owner id', () => {
          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ owner: 123 } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(true);
        });

        it('when the user has the collection id in his editableCollections array', () => {
          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ id: 7 } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(true);
        });

        it('when the collection has the user in its editors array', () => {
          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ editors: [{ id: 123 }] } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(true);
        });

        it('when the collection\'s userRole is \'editor\'', () => {
          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ userRole: 'editor' } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(true);
        });

        it('when the collection\'s userRole is \'owner\'', () => {
          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ userRole: 'owner' } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(true);
        });
      });

      describe('returns an observable of false', () => {
        it('when the user\'s id is mot the same as the collection\'s owner id', () => {
          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ owner: 1111 } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(false);
        });

        it('when the user does not have the collection id in his editableCollections array', () => {
          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ id: 9876 } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(false);
        });

        it('when the collection does not have the user in its editors array', () => {
          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ editors: [{ id: 1010 }] } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(false);
        });

        it('when the collection\'s userRole is not \'editor\' or \'owner\'', () => {
          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ userRole: 'notEditorOrOwner' } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(false);
        });

        it('when the user id and collection owner id are both 0', () => {
          mockCurrentUserService = { data: Observable.of({ id: 0 }) };
          capabilitiesUnderTest = new CollectionCapabilities(mockCurrentUserService, null, null);

          let canEdit: boolean;
          capabilitiesUnderTest.editCollection({ owner: 0 } as any).subscribe(d => canEdit = d);
          expect(canEdit).toBe(false);
        });
      });
    });
  });
};

