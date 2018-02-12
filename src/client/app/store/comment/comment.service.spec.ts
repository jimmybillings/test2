import { CommentService } from './comment.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Comment Service', () => {
    let serviceUnderTest: CommentService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      mockApiService.getResponse = {
        items: [{ some: 'comment' }],
        currentPage: 0,
        numberOfPages: 10,
        hasNextPage: true,
        hasPreviousPage: false,
        pageSize: 10,
        totalCount: 100
      };
      serviceUnderTest = new CommentService(mockApiService.injector);
    });

    describe('getCommentsFor()', () => {
      describe('calls the API correctly', () => {
        it('for a regular object type', () => {
          serviceUnderTest.getCommentsFor({ objectType: 'collection', objectId: 123 });

          expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
          expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
        });

        it('for a nested object type', () => {
          serviceUnderTest.getCommentsFor({
            objectType: 'collection', objectId: 123, nestedObjectType: 'lineItem', nestedObjectId: 'abc-123'
          });

          expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
          expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byNestedType/collection/123/lineItem/abc-123');
        });
      });

      describe('converts to response to the proper shape', () => {
        it('when items exist', () => {
          serviceUnderTest.getCommentsFor({ objectType: 'collection', objectId: 123 }).subscribe(comments => expect(comments).toEqual({
            items: [{ some: 'comment' }],
            pagination: {
              currentPage: 0,
              numberOfPages: 10,
              hasNextPage: true,
              hasPreviousPage: false,
              pageSize: 10,
              totalCount: 100
            }
          }));
        });

        it('when items don\'t exist', () => {
          mockApiService.getResponse = {
            currentPage: 0,
            numberOfPages: 10,
            hasNextPage: true,
            hasPreviousPage: false,
            pageSize: 10,
            totalCount: 100
          };

          serviceUnderTest.getCommentsFor({ objectType: 'collection', objectId: 123 }).subscribe(comments => expect(comments).toEqual({
            items: [],
            pagination: {
              currentPage: 0,
              numberOfPages: 10,
              hasNextPage: true,
              hasPreviousPage: false,
              pageSize: 10,
              totalCount: 100
            }
          }));
        });
      });
    });

    describe('addCommentTo()', () => {
      describe('calls the API correctly', () => {
        it('for a regular object type', () => {
          serviceUnderTest.addCommentTo({ objectType: 'collection', objectId: 123 }, { comment: 'wow' } as any);

          expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
          expect(mockApiService.post).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
          expect(mockApiService.post).toHaveBeenCalledWithBody({ comment: 'wow' });
          expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
        });

        it('for a nested object type', () => {
          serviceUnderTest.addCommentTo(
            { objectType: 'collection', objectId: 123, nestedObjectType: 'lineItem', nestedObjectId: 'abc-123' },
            { comment: 'wow' } as any
          );

          expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
          expect(mockApiService.post).toHaveBeenCalledWithEndpoint('comment/byNestedType/collection/123/lineItem/abc-123');
          expect(mockApiService.post).toHaveBeenCalledWithBody({ comment: 'wow' });
          expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
        });
      });

      it('calls getCommentsFor() with the correct objectType and objectId', () => {
        serviceUnderTest.addCommentTo({ objectType: 'collection', objectId: 123 }, { comment: 'wow' } as any).subscribe();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
      });
    });

    describe('editComment()', () => {
      it('calls the api service correctly', () => {
        serviceUnderTest.editComment({ objectType: 'collection', objectId: 123 }, { some: 'comment', id: 123 } as any);

        expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.put).toHaveBeenCalledWithEndpoint('comment/edit/123');
        expect(mockApiService.put).toHaveBeenCalledWithBody({ some: 'comment', id: 123 });
        expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
      });

      it('calls getCommentsFor() with the correct objectType and objectId', () => {
        serviceUnderTest.editComment({ objectType: 'collection', objectId: 123 }, { comment: 'wow' } as any).subscribe();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
      });
    });

    describe('removeComment()', () => {
      it('calls the api service correctly', () => {
        serviceUnderTest.removeComment({ objectType: 'collection', objectId: 123 }, 1);

        expect(mockApiService.delete).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.delete).toHaveBeenCalledWithEndpoint('comment/1');
        expect(mockApiService.delete).toHaveBeenCalledWithLoading(true);
      });

      it('calls getCommentsFor() with the correct objectType and objectId', () => {
        serviceUnderTest.removeComment({ objectType: 'collection', objectId: 123 }, 1).subscribe();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
      });
    });

    describe('getCountsFor()', () => {
      it('calls the api service correctly', () => {
        serviceUnderTest.getCountsFor({ objectType: 'collection', objectId: 1 });

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/counts/collection/1');
      });

      describe('maps the result', () => {
        it('when the response has a properly formatted list', () => {
          mockApiService.getResponse = { list: [{ objectId: 'abc', count: 2 }, { objectId: 'def', count: 4 }] };

          serviceUnderTest.getCountsFor({ objectType: 'collection', objectId: 1 }).take(1).subscribe(res => {
            expect(res).toEqual({ 'abc': 2, 'def': 4 });
          });
        });

        it('when the response has no list', () => {
          mockApiService.getResponse = {};

          serviceUnderTest.getCountsFor({ objectType: 'collection', objectId: 1 }).take(1).subscribe(res => {
            expect(res).toEqual({});
          });
        });

        it('when there are comments for lineItems', () => {
          mockApiService.getResponse = {
            list: [
              { objectId: 'abc', count: 2 },
              { objectType: 'collection', objectId: 'def', nestedObjectType: 'lineItem', nestedObjectId: '123', count: 4 }
            ]
          };

          serviceUnderTest.getCountsFor({ objectType: 'collection', objectId: 1 }).take(1).subscribe(res => {
            expect(res).toEqual({ 'abc': 2, '123': 4 });
          });
        });
      });
    });
  });
}
