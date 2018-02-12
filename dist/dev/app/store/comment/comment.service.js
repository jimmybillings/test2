"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../../shared/services/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var CommentService = (function () {
    function CommentService(apiService) {
        this.apiService = apiService;
        this.convertToComments = function (comments) {
            return {
                items: comments.items || [],
                pagination: {
                    currentPage: comments.currentPage,
                    numberOfPages: comments.numberOfPages,
                    hasNextPage: comments.hasNextPage,
                    hasPreviousPage: comments.hasPreviousPage,
                    pageSize: comments.pageSize,
                    totalCount: comments.totalCount
                }
            };
        };
        this.convertCounts = function (counts) {
            if (!counts.list)
                return {};
            return counts.list.reduce(function (formatted, commentCount) {
                var countKey = commentCount.nestedObjectId ? commentCount.nestedObjectId : commentCount.objectId;
                formatted[countKey] = commentCount.count;
                return formatted;
            }, {});
        };
    }
    CommentService.prototype.getCommentsFor = function (parentObject) {
        return this.apiService.get(api_interface_1.Api.Identities, "comment/" + this.urlSegmentFor(parentObject)).map(this.convertToComments);
    };
    CommentService.prototype.addCommentTo = function (parentObject, comment) {
        var _this = this;
        return this.apiService.post(api_interface_1.Api.Identities, "comment/" + this.urlSegmentFor(parentObject), { body: comment, loadingIndicator: true }).flatMap(function () { return _this.getCommentsFor(parentObject); });
    };
    CommentService.prototype.editComment = function (parentObject, comment) {
        var _this = this;
        return this.apiService.put(api_interface_1.Api.Identities, "comment/edit/" + comment.id, { body: comment, loadingIndicator: true }).flatMap(function () { return _this.getCommentsFor(parentObject); });
    };
    CommentService.prototype.removeComment = function (parentObject, commentId) {
        var _this = this;
        return this.apiService.delete(api_interface_1.Api.Identities, "comment/" + commentId, { loadingIndicator: true }).flatMap(function () { return _this.getCommentsFor(parentObject); });
    };
    CommentService.prototype.getCountsFor = function (parentObject) {
        return this.apiService.get(api_interface_1.Api.Identities, "comment/byType/counts/" + parentObject.objectType + "/" + parentObject.objectId).map(this.convertCounts);
    };
    CommentService.prototype.urlSegmentFor = function (parent) {
        return parent.nestedObjectId ?
            "byNestedType/" + parent.objectType + "/" + parent.objectId + "/" + parent.nestedObjectType + "/" + parent.nestedObjectId :
            "byType/" + parent.objectType + "/" + parent.objectId;
    };
    CommentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb21tZW50L2NvbW1lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUczQyxpRUFBK0Q7QUFDL0QsdUVBQTREO0FBTTVEO0lBQ0Usd0JBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUE4Q2xDLHNCQUFpQixHQUFHLFVBQUMsUUFBNkI7WUFDeEQsTUFBTSxDQUFDO2dCQUNMLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQzNCLFVBQVUsRUFBRTtvQkFDVixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7b0JBQ2pDLGFBQWEsRUFBRSxRQUFRLENBQUMsYUFBYTtvQkFDckMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO29CQUNqQyxlQUFlLEVBQUUsUUFBUSxDQUFDLGVBQWU7b0JBQ3pDLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtvQkFDM0IsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2lCQUNoQzthQUNGLENBQUM7UUFDSixDQUFDLENBQUE7UUFFTyxrQkFBYSxHQUFHLFVBQUMsTUFBZ0M7WUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsU0FBd0IsRUFBRSxZQUEwQjtnQkFDN0UsSUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDbkcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFBO0lBbkU2QyxDQUFDO0lBRXhDLHVDQUFjLEdBQXJCLFVBQXNCLFlBQWlDO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FDeEIsbUJBQUcsQ0FBQyxVQUFVLEVBQ2QsYUFBVyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBRyxDQUM5QyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0scUNBQVksR0FBbkIsVUFBb0IsWUFBaUMsRUFBRSxPQUFnQjtRQUF2RSxpQkFNQztRQUxDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDekIsbUJBQUcsQ0FBQyxVQUFVLEVBQ2QsYUFBVyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBRyxFQUM3QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQzFDLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLG9DQUFXLEdBQWxCLFVBQW1CLFlBQWlDLEVBQUUsT0FBZ0I7UUFBdEUsaUJBTUM7UUFMQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ3hCLG1CQUFHLENBQUMsVUFBVSxFQUNkLGtCQUFnQixPQUFPLENBQUMsRUFBSSxFQUM1QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQzFDLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLHNDQUFhLEdBQXBCLFVBQXFCLFlBQWlDLEVBQUUsU0FBaUI7UUFBekUsaUJBTUM7UUFMQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQzNCLG1CQUFHLENBQUMsVUFBVSxFQUNkLGFBQVcsU0FBVyxFQUN0QixFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUMzQixDQUFDLE9BQU8sQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxxQ0FBWSxHQUFuQixVQUFvQixZQUFpQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ3hCLG1CQUFHLENBQUMsVUFBVSxFQUNkLDJCQUF5QixZQUFZLENBQUMsVUFBVSxTQUFJLFlBQVksQ0FBQyxRQUFVLENBQzVFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU8sc0NBQWEsR0FBckIsVUFBc0IsTUFBMkI7UUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1QixrQkFBZ0IsTUFBTSxDQUFDLFVBQVUsU0FBSSxNQUFNLENBQUMsUUFBUSxTQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsU0FBSSxNQUFNLENBQUMsY0FBZ0IsQ0FBQyxDQUFDO1lBQzVHLFlBQVUsTUFBTSxDQUFDLFVBQVUsU0FBSSxNQUFNLENBQUMsUUFBVSxDQUFDO0lBQ3JELENBQUM7SUE3Q1UsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQUVxQix3QkFBVTtPQUQvQixjQUFjLENBcUUxQjtJQUFELHFCQUFDO0NBckVELEFBcUVDLElBQUE7QUFyRVksd0NBQWMiLCJmaWxlIjoiYXBwL3N0b3JlL2NvbW1lbnQvY29tbWVudC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5pbXBvcnQge1xuICBDb21tZW50c0FwaVJlc3BvbnNlLCBDb21tZW50cywgQ29tbWVudCwgT2JqZWN0VHlwZSwgQ29tbWVudFBhcmVudE9iamVjdCwgQ29tbWVudENvdW50c0FwaVJlc3BvbnNlLCBDb21tZW50Q291bnRzLCBDb21tZW50Q291bnRcbn0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVudC5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29tbWVudFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaVNlcnZpY2U6IEFwaVNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBnZXRDb21tZW50c0ZvcihwYXJlbnRPYmplY3Q6IENvbW1lbnRQYXJlbnRPYmplY3QpOiBPYnNlcnZhYmxlPENvbW1lbnRzPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5nZXQoXG4gICAgICBBcGkuSWRlbnRpdGllcyxcbiAgICAgIGBjb21tZW50LyR7dGhpcy51cmxTZWdtZW50Rm9yKHBhcmVudE9iamVjdCl9YFxuICAgICkubWFwKHRoaXMuY29udmVydFRvQ29tbWVudHMpO1xuICB9XG5cbiAgcHVibGljIGFkZENvbW1lbnRUbyhwYXJlbnRPYmplY3Q6IENvbW1lbnRQYXJlbnRPYmplY3QsIGNvbW1lbnQ6IENvbW1lbnQpOiBPYnNlcnZhYmxlPENvbW1lbnRzPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5wb3N0KFxuICAgICAgQXBpLklkZW50aXRpZXMsXG4gICAgICBgY29tbWVudC8ke3RoaXMudXJsU2VnbWVudEZvcihwYXJlbnRPYmplY3QpfWAsXG4gICAgICB7IGJvZHk6IGNvbW1lbnQsIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfVxuICAgICkuZmxhdE1hcCgoKSA9PiB0aGlzLmdldENvbW1lbnRzRm9yKHBhcmVudE9iamVjdCkpO1xuICB9XG5cbiAgcHVibGljIGVkaXRDb21tZW50KHBhcmVudE9iamVjdDogQ29tbWVudFBhcmVudE9iamVjdCwgY29tbWVudDogQ29tbWVudCk6IE9ic2VydmFibGU8Q29tbWVudHM+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLnB1dChcbiAgICAgIEFwaS5JZGVudGl0aWVzLFxuICAgICAgYGNvbW1lbnQvZWRpdC8ke2NvbW1lbnQuaWR9YCxcbiAgICAgIHsgYm9keTogY29tbWVudCwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgKS5mbGF0TWFwKCgpID0+IHRoaXMuZ2V0Q29tbWVudHNGb3IocGFyZW50T2JqZWN0KSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ29tbWVudChwYXJlbnRPYmplY3Q6IENvbW1lbnRQYXJlbnRPYmplY3QsIGNvbW1lbnRJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxDb21tZW50cz4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZGVsZXRlKFxuICAgICAgQXBpLklkZW50aXRpZXMsXG4gICAgICBgY29tbWVudC8ke2NvbW1lbnRJZH1gLFxuICAgICAgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH1cbiAgICApLmZsYXRNYXAoKCkgPT4gdGhpcy5nZXRDb21tZW50c0ZvcihwYXJlbnRPYmplY3QpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3VudHNGb3IocGFyZW50T2JqZWN0OiBDb21tZW50UGFyZW50T2JqZWN0KTogT2JzZXJ2YWJsZTxDb21tZW50Q291bnRzPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5nZXQoXG4gICAgICBBcGkuSWRlbnRpdGllcyxcbiAgICAgIGBjb21tZW50L2J5VHlwZS9jb3VudHMvJHtwYXJlbnRPYmplY3Qub2JqZWN0VHlwZX0vJHtwYXJlbnRPYmplY3Qub2JqZWN0SWR9YFxuICAgICkubWFwKHRoaXMuY29udmVydENvdW50cyk7XG4gIH1cblxuICBwcml2YXRlIHVybFNlZ21lbnRGb3IocGFyZW50OiBDb21tZW50UGFyZW50T2JqZWN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gcGFyZW50Lm5lc3RlZE9iamVjdElkID9cbiAgICAgIGBieU5lc3RlZFR5cGUvJHtwYXJlbnQub2JqZWN0VHlwZX0vJHtwYXJlbnQub2JqZWN0SWR9LyR7cGFyZW50Lm5lc3RlZE9iamVjdFR5cGV9LyR7cGFyZW50Lm5lc3RlZE9iamVjdElkfWAgOlxuICAgICAgYGJ5VHlwZS8ke3BhcmVudC5vYmplY3RUeXBlfS8ke3BhcmVudC5vYmplY3RJZH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0VG9Db21tZW50cyA9IChjb21tZW50czogQ29tbWVudHNBcGlSZXNwb25zZSk6IENvbW1lbnRzID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IGNvbW1lbnRzLml0ZW1zIHx8IFtdLFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBjdXJyZW50UGFnZTogY29tbWVudHMuY3VycmVudFBhZ2UsXG4gICAgICAgIG51bWJlck9mUGFnZXM6IGNvbW1lbnRzLm51bWJlck9mUGFnZXMsXG4gICAgICAgIGhhc05leHRQYWdlOiBjb21tZW50cy5oYXNOZXh0UGFnZSxcbiAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBjb21tZW50cy5oYXNQcmV2aW91c1BhZ2UsXG4gICAgICAgIHBhZ2VTaXplOiBjb21tZW50cy5wYWdlU2l6ZSxcbiAgICAgICAgdG90YWxDb3VudDogY29tbWVudHMudG90YWxDb3VudFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRDb3VudHMgPSAoY291bnRzOiBDb21tZW50Q291bnRzQXBpUmVzcG9uc2UpOiBDb21tZW50Q291bnRzID0+IHtcbiAgICBpZiAoIWNvdW50cy5saXN0KSByZXR1cm4ge307XG4gICAgcmV0dXJuIGNvdW50cy5saXN0LnJlZHVjZSgoZm9ybWF0dGVkOiBDb21tZW50Q291bnRzLCBjb21tZW50Q291bnQ6IENvbW1lbnRDb3VudCkgPT4ge1xuICAgICAgY29uc3QgY291bnRLZXkgPSBjb21tZW50Q291bnQubmVzdGVkT2JqZWN0SWQgPyBjb21tZW50Q291bnQubmVzdGVkT2JqZWN0SWQgOiBjb21tZW50Q291bnQub2JqZWN0SWQ7XG4gICAgICBmb3JtYXR0ZWRbY291bnRLZXldID0gY29tbWVudENvdW50LmNvdW50O1xuICAgICAgcmV0dXJuIGZvcm1hdHRlZDtcbiAgICB9LCB7fSk7XG4gIH1cbn1cbiJdfQ==
