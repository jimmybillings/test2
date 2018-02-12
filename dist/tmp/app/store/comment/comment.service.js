"use strict";
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
    CommentService.decorators = [
        { type: core_1.Injectable },
    ];
    CommentService.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
    ]; };
    return CommentService;
}());
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map