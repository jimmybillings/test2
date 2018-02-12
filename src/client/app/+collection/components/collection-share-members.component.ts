import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Collection } from '../../shared/interfaces/collection.interface';

@Component({
  moduleId: module.id,
  selector: 'collection-share-members-component',
  templateUrl: 'collection-share-members.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CollectionShareMembersComponent {
  @Input() collection: Collection;
  @Output() close: EventEmitter<null> = new EventEmitter();
}
