"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_service_1 = require("./comment.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Comment Service', function () {
        var serviceUnderTest, mockApiService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            mockApiService.getResponse = {
                items: [{ some: 'comment' }],
                currentPage: 0,
                numberOfPages: 10,
                hasNextPage: true,
                hasPreviousPage: false,
                pageSize: 10,
                totalCount: 100
            };
            serviceUnderTest = new comment_service_1.CommentService(mockApiService.injector);
        });
        describe('getCommentsFor()', function () {
            describe('calls the API correctly', function () {
                it('for a regular object type', function () {
                    serviceUnderTest.getCommentsFor({ objectType: 'collection', objectId: 123 });
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
                });
                it('for a nested object type', function () {
                    serviceUnderTest.getCommentsFor({
                        objectType: 'collection', objectId: 123, nestedObjectType: 'lineItem', nestedObjectId: 'abc-123'
                    });
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byNestedType/collection/123/lineItem/abc-123');
                });
            });
            describe('converts to response to the proper shape', function () {
                it('when items exist', function () {
                    serviceUnderTest.getCommentsFor({ objectType: 'collection', objectId: 123 }).subscribe(function (comments) { return expect(comments).toEqual({
                        items: [{ some: 'comment' }],
                        pagination: {
                            currentPage: 0,
                            numberOfPages: 10,
                            hasNextPage: true,
                            hasPreviousPage: false,
                            pageSize: 10,
                            totalCount: 100
                        }
                    }); });
                });
                it('when items don\'t exist', function () {
                    mockApiService.getResponse = {
                        currentPage: 0,
                        numberOfPages: 10,
                        hasNextPage: true,
                        hasPreviousPage: false,
                        pageSize: 10,
                        totalCount: 100
                    };
                    serviceUnderTest.getCommentsFor({ objectType: 'collection', objectId: 123 }).subscribe(function (comments) { return expect(comments).toEqual({
                        items: [],
                        pagination: {
                            currentPage: 0,
                            numberOfPages: 10,
                            hasNextPage: true,
                            hasPreviousPage: false,
                            pageSize: 10,
                            totalCount: 100
                        }
                    }); });
                });
            });
        });
        describe('addCommentTo()', function () {
            describe('calls the API correctly', function () {
                it('for a regular object type', function () {
                    serviceUnderTest.addCommentTo({ objectType: 'collection', objectId: 123 }, { comment: 'wow' });
                    expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                    expect(mockApiService.post).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
                    expect(mockApiService.post).toHaveBeenCalledWithBody({ comment: 'wow' });
                    expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
                });
                it('for a nested object type', function () {
                    serviceUnderTest.addCommentTo({ objectType: 'collection', objectId: 123, nestedObjectType: 'lineItem', nestedObjectId: 'abc-123' }, { comment: 'wow' });
                    expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                    expect(mockApiService.post).toHaveBeenCalledWithEndpoint('comment/byNestedType/collection/123/lineItem/abc-123');
                    expect(mockApiService.post).toHaveBeenCalledWithBody({ comment: 'wow' });
                    expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
                });
            });
            it('calls getCommentsFor() with the correct objectType and objectId', function () {
                serviceUnderTest.addCommentTo({ objectType: 'collection', objectId: 123 }, { comment: 'wow' }).subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
            });
        });
        describe('editComment()', function () {
            it('calls the api service correctly', function () {
                serviceUnderTest.editComment({ objectType: 'collection', objectId: 123 }, { some: 'comment', id: 123 });
                expect(mockApiService.put).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.put).toHaveBeenCalledWithEndpoint('comment/edit/123');
                expect(mockApiService.put).toHaveBeenCalledWithBody({ some: 'comment', id: 123 });
                expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
            });
            it('calls getCommentsFor() with the correct objectType and objectId', function () {
                serviceUnderTest.editComment({ objectType: 'collection', objectId: 123 }, { comment: 'wow' }).subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
            });
        });
        describe('removeComment()', function () {
            it('calls the api service correctly', function () {
                serviceUnderTest.removeComment({ objectType: 'collection', objectId: 123 }, 1);
                expect(mockApiService.delete).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.delete).toHaveBeenCalledWithEndpoint('comment/1');
                expect(mockApiService.delete).toHaveBeenCalledWithLoading(true);
            });
            it('calls getCommentsFor() with the correct objectType and objectId', function () {
                serviceUnderTest.removeComment({ objectType: 'collection', objectId: 123 }, 1).subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/collection/123');
            });
        });
        describe('getCountsFor()', function () {
            it('calls the api service correctly', function () {
                serviceUnderTest.getCountsFor({ objectType: 'collection', objectId: 1 });
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('comment/byType/counts/collection/1');
            });
            describe('maps the result', function () {
                it('when the response has a properly formatted list', function () {
                    mockApiService.getResponse = { list: [{ objectId: 'abc', count: 2 }, { objectId: 'def', count: 4 }] };
                    serviceUnderTest.getCountsFor({ objectType: 'collection', objectId: 1 }).take(1).subscribe(function (res) {
                        expect(res).toEqual({ 'abc': 2, 'def': 4 });
                    });
                });
                it('when the response has no list', function () {
                    mockApiService.getResponse = {};
                    serviceUnderTest.getCountsFor({ objectType: 'collection', objectId: 1 }).take(1).subscribe(function (res) {
                        expect(res).toEqual({});
                    });
                });
                it('when there are comments for lineItems', function () {
                    mockApiService.getResponse = {
                        list: [
                            { objectId: 'abc', count: 2 },
                            { objectType: 'collection', objectId: 'def', nestedObjectType: 'lineItem', nestedObjectId: '123', count: 4 }
                        ]
                    };
                    serviceUnderTest.getCountsFor({ objectType: 'collection', objectId: 1 }).take(1).subscribe(function (res) {
                        expect(res).toEqual({ 'abc': 2, '123': 4 });
                    });
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb21tZW50L2NvbW1lbnQuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW1EO0FBQ25ELHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFFNUQ7SUFDRSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsSUFBSSxnQkFBZ0MsRUFBRSxjQUE4QixDQUFDO1FBRXJFLFVBQVUsQ0FBQztZQUNULE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUN0QyxjQUFjLENBQUMsV0FBVyxHQUFHO2dCQUMzQixLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztnQkFDNUIsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsYUFBYSxFQUFFLEVBQUU7Z0JBQ2pCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixlQUFlLEVBQUUsS0FBSztnQkFDdEIsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osVUFBVSxFQUFFLEdBQUc7YUFDaEIsQ0FBQztZQUNGLGdCQUFnQixHQUFHLElBQUksZ0NBQWMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsUUFBUSxDQUFDLHlCQUF5QixFQUFFO2dCQUNsQyxFQUFFLENBQUMsMkJBQTJCLEVBQUU7b0JBQzlCLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBRTdFLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsdUJBQXVCLENBQUMsbUJBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDbkUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQywrQkFBK0Is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LEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO3dCQUM1RixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUU7b0JBQzFDLGNBQWMsQ0FBQyxXQUFXLEdBQUc7d0JBQzNCLElBQUksRUFBRTs0QkFDSixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTs0QkFDN0IsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTt5QkFDN0c7cUJBQ0YsQ0FBQztvQkFFRixnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO3dCQUM1RixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDOUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBekxELG9CQXlMQyIsImZpbGUiOiJhcHAvc3RvcmUvY29tbWVudC9jb21tZW50LnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9jb21tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9ja0FwaVNlcnZpY2UsIG1vY2tBcGlNYXRjaGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9tb2NrLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NvbW1lbnQgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogQ29tbWVudFNlcnZpY2UsIG1vY2tBcGlTZXJ2aWNlOiBNb2NrQXBpU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpO1xuICAgICAgbW9ja0FwaVNlcnZpY2UgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKTtcbiAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0ge1xuICAgICAgICBpdGVtczogW3sgc29tZTogJ2NvbW1lbnQnIH1dLFxuICAgICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgICAgbnVtYmVyT2ZQYWdlczogMTAsXG4gICAgICAgIGhhc05leHRQYWdlOiB0cnVlLFxuICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMFxuICAgICAgfTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgQ29tbWVudFNlcnZpY2UobW9ja0FwaVNlcnZpY2UuaW5qZWN0b3IpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldENvbW1lbnRzRm9yKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnY2FsbHMgdGhlIEFQSSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdmb3IgYSByZWd1bGFyIG9iamVjdCB0eXBlJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZ2V0Q29tbWVudHNGb3IoeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxMjMgfSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnY29tbWVudC9ieVR5cGUvY29sbGVjdGlvbi8xMjMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBhIG5lc3RlZCBvYmplY3QgdHlwZScsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmdldENvbW1lbnRzRm9yKHtcbiAgICAgICAgICAgIG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEyMywgbmVzdGVkT2JqZWN0VHlwZTogJ2xpbmVJdGVtJywgbmVzdGVkT2JqZWN0SWQ6ICdhYmMtMTIzJ1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbW1lbnQvYnlOZXN0ZWRUeXBlL2NvbGxlY3Rpb24vMTIzL2xpbmVJdGVtL2FiYy0xMjMnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2NvbnZlcnRzIHRvIHJlc3BvbnNlIHRvIHRoZSBwcm9wZXIgc2hhcGUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIGl0ZW1zIGV4aXN0JywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZ2V0Q29tbWVudHNGb3IoeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxMjMgfSkuc3Vic2NyaWJlKGNvbW1lbnRzID0+IGV4cGVjdChjb21tZW50cykudG9FcXVhbCh7XG4gICAgICAgICAgICBpdGVtczogW3sgc29tZTogJ2NvbW1lbnQnIH1dLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMCxcbiAgICAgICAgICAgICAgbnVtYmVyT2ZQYWdlczogMTAsXG4gICAgICAgICAgICAgIGhhc05leHRQYWdlOiB0cnVlLFxuICAgICAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgICAgICAgIHRvdGFsQ291bnQ6IDEwMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gaXRlbXMgZG9uXFwndCBleGlzdCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpU2VydmljZS5nZXRSZXNwb25zZSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAwLFxuICAgICAgICAgICAgbnVtYmVyT2ZQYWdlczogMTAsXG4gICAgICAgICAgICBoYXNOZXh0UGFnZTogdHJ1ZSxcbiAgICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZTogZmFsc2UsXG4gICAgICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgICAgICB0b3RhbENvdW50OiAxMDBcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5nZXRDb21tZW50c0Zvcih7IG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEyMyB9KS5zdWJzY3JpYmUoY29tbWVudHMgPT4gZXhwZWN0KGNvbW1lbnRzKS50b0VxdWFsKHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICAgICAgICAgIG51bWJlck9mUGFnZXM6IDEwLFxuICAgICAgICAgICAgICBoYXNOZXh0UGFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICAgICAgICB0b3RhbENvdW50OiAxMDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkQ29tbWVudFRvKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnY2FsbHMgdGhlIEFQSSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdmb3IgYSByZWd1bGFyIG9iamVjdCB0eXBlJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QuYWRkQ29tbWVudFRvKHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMTIzIH0sIHsgY29tbWVudDogJ3dvdycgfSBhcyBhbnkpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnY29tbWVudC9ieVR5cGUvY29sbGVjdGlvbi8xMjMnKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHsgY29tbWVudDogJ3dvdycgfSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBhIG5lc3RlZCBvYmplY3QgdHlwZScsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmFkZENvbW1lbnRUbyhcbiAgICAgICAgICAgIHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMTIzLCBuZXN0ZWRPYmplY3RUeXBlOiAnbGluZUl0ZW0nLCBuZXN0ZWRPYmplY3RJZDogJ2FiYy0xMjMnIH0sXG4gICAgICAgICAgICB7IGNvbW1lbnQ6ICd3b3cnIH0gYXMgYW55XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbW1lbnQvYnlOZXN0ZWRUeXBlL2NvbGxlY3Rpb24vMTIzL2xpbmVJdGVtL2FiYy0xMjMnKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHsgY29tbWVudDogJ3dvdycgfSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIGdldENvbW1lbnRzRm9yKCkgd2l0aCB0aGUgY29ycmVjdCBvYmplY3RUeXBlIGFuZCBvYmplY3RJZCcsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5hZGRDb21tZW50VG8oeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxMjMgfSwgeyBjb21tZW50OiAnd293JyB9IGFzIGFueSkuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjb21tZW50L2J5VHlwZS9jb2xsZWN0aW9uLzEyMycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZWRpdENvbW1lbnQoKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgYXBpIHNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmVkaXRDb21tZW50KHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMTIzIH0sIHsgc29tZTogJ2NvbW1lbnQnLCBpZDogMTIzIH0gYXMgYW55KTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbW1lbnQvZWRpdC8xMjMnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLnB1dCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHsgc29tZTogJ2NvbW1lbnQnLCBpZDogMTIzIH0pO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIGdldENvbW1lbnRzRm9yKCkgd2l0aCB0aGUgY29ycmVjdCBvYmplY3RUeXBlIGFuZCBvYmplY3RJZCcsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5lZGl0Q29tbWVudCh7IG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEyMyB9LCB7IGNvbW1lbnQ6ICd3b3cnIH0gYXMgYW55KS5zdWJzY3JpYmUoKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2NvbW1lbnQvYnlUeXBlL2NvbGxlY3Rpb24vMTIzJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZW1vdmVDb21tZW50KCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5yZW1vdmVDb21tZW50KHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMTIzIH0sIDEpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5kZWxldGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmRlbGV0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnY29tbWVudC8xJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5kZWxldGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgZ2V0Q29tbWVudHNGb3IoKSB3aXRoIHRoZSBjb3JyZWN0IG9iamVjdFR5cGUgYW5kIG9iamVjdElkJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LnJlbW92ZUNvbW1lbnQoeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxMjMgfSwgMSkuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjb21tZW50L2J5VHlwZS9jb2xsZWN0aW9uLzEyMycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q291bnRzRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5nZXRDb3VudHNGb3IoeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH0pO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnY29tbWVudC9ieVR5cGUvY291bnRzL2NvbGxlY3Rpb24vMScpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdtYXBzIHRoZSByZXN1bHQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSByZXNwb25zZSBoYXMgYSBwcm9wZXJseSBmb3JtYXR0ZWQgbGlzdCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpU2VydmljZS5nZXRSZXNwb25zZSA9IHsgbGlzdDogW3sgb2JqZWN0SWQ6ICdhYmMnLCBjb3VudDogMiB9LCB7IG9iamVjdElkOiAnZGVmJywgY291bnQ6IDQgfV0gfTtcblxuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZ2V0Q291bnRzRm9yKHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSB9KS50YWtlKDEpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHJlcykudG9FcXVhbCh7ICdhYmMnOiAyLCAnZGVmJzogNCB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIHJlc3BvbnNlIGhhcyBubyBsaXN0JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0ge307XG5cbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmdldENvdW50c0Zvcih7IG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEgfSkudGFrZSgxKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChyZXMpLnRvRXF1YWwoe30pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiB0aGVyZSBhcmUgY29tbWVudHMgZm9yIGxpbmVJdGVtcycsICgpID0+IHtcbiAgICAgICAgICBtb2NrQXBpU2VydmljZS5nZXRSZXNwb25zZSA9IHtcbiAgICAgICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICAgICAgeyBvYmplY3RJZDogJ2FiYycsIGNvdW50OiAyIH0sXG4gICAgICAgICAgICAgIHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogJ2RlZicsIG5lc3RlZE9iamVjdFR5cGU6ICdsaW5lSXRlbScsIG5lc3RlZE9iamVjdElkOiAnMTIzJywgY291bnQ6IDQgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmdldENvdW50c0Zvcih7IG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEgfSkudGFrZSgxKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChyZXMpLnRvRXF1YWwoeyAnYWJjJzogMiwgJzEyMyc6IDQgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
