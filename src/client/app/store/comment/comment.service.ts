import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../shared/services/api.service';
import { Api } from '../../shared/interfaces/api.interface';
import {
  CommentsApiResponse, Comments, Comment, ObjectType, CommentParentObject, CommentCountsApiResponse, CommentCounts, CommentCount
} from '../../shared/interfaces/comment.interface';

@Injectable()
export class CommentService {
  constructor(private apiService: ApiService) { }

  public getCommentsFor(parentObject: CommentParentObject): Observable<Comments> {
    return this.apiService.get(
      Api.Identities,
      `comment/${this.urlSegmentFor(parentObject)}`
    ).map(this.convertToComments);
  }

  public addCommentTo(parentObject: CommentParentObject, comment: Comment): Observable<Comments> {
    return this.apiService.post(
      Api.Identities,
      `comment/${this.urlSegmentFor(parentObject)}`,
      { body: comment, loadingIndicator: true }
    ).flatMap(() => this.getCommentsFor(parentObject));
  }

  public editComment(parentObject: CommentParentObject, comment: Comment): Observable<Comments> {
    return this.apiService.put(
      Api.Identities,
      `comment/edit/${comment.id}`,
      { body: comment, loadingIndicator: true }
    ).flatMap(() => this.getCommentsFor(parentObject));
  }

  public removeComment(parentObject: CommentParentObject, commentId: number): Observable<Comments> {
    return this.apiService.delete(
      Api.Identities,
      `comment/${commentId}`,
      { loadingIndicator: true }
    ).flatMap(() => this.getCommentsFor(parentObject));
  }

  public getCountsFor(parentObject: CommentParentObject): Observable<CommentCounts> {
    return this.apiService.get(
      Api.Identities,
      `comment/byType/counts/${parentObject.objectType}/${parentObject.objectId}`
    ).map(this.convertCounts);
  }

  private urlSegmentFor(parent: CommentParentObject): string {
    return parent.nestedObjectId ?
      `byNestedType/${parent.objectType}/${parent.objectId}/${parent.nestedObjectType}/${parent.nestedObjectId}` :
      `byType/${parent.objectType}/${parent.objectId}`;
  }

  private convertToComments = (comments: CommentsApiResponse): Comments => {
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
  }

  private convertCounts = (counts: CommentCountsApiResponse): CommentCounts => {
    if (!counts.list) return {};
    return counts.list.reduce((formatted: CommentCounts, commentCount: CommentCount) => {
      const countKey = commentCount.nestedObjectId ? commentCount.nestedObjectId : commentCount.objectId;
      formatted[countKey] = commentCount.count;
      return formatted;
    }, {});
  }
}
