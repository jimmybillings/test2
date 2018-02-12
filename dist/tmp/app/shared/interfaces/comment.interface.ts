import { Common, Pagination } from './common.interface';

export type ObjectType = 'collection' | 'cart' | 'quote' | 'order' | 'lineItem';

export type CommentAccess = 'Commenter' | 'Viewer' | 'Editor';

export interface Comment extends Common {
  userId: number;
  objectType: ObjectType;
  objectId: string;
  hidden: boolean;
  comment: string;
  access: CommentAccess;
  timeStart?: string;
  timeEnd?: string;
  userName?: string;
  [index: string]: any;
}

export interface CommentsApiResponse extends Pagination {
  items: Array<Comment>;
}

export interface Comments {
  items: Array<Comment>;
  pagination: Pagination;
}

export interface CommentParentObject {
  objectType: ObjectType;
  objectId: number;
  nestedObjectType?: 'lineItem';
  nestedObjectId?: string;
}

export type CommentFormMode = 'ADD' | 'EDIT';

export interface CommentCountsApiResponse {
  list: Array<CommentCount>;
}

export interface CommentCounts {
  [index: string]: number;
}

export interface CommentCount extends CommentParentObject {
  count: number;
}
