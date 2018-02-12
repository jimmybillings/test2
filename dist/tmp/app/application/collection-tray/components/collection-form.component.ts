import {
  Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Collection, CollectionActionType, CollectionFormEvent } from '../../../shared/interfaces/collection.interface';
import { FormFields, ServerErrors } from '../../../shared/interfaces/forms.interface';
import { Asset, Pojo } from '../../../shared/interfaces/common.interface';

import { CollectionsService } from '../../../shared/services/collections.service';
import { CollectionContextService } from '../../../shared/services/collection-context.service';
import { AppStore } from '../../../app.store';
import { Common } from '../../../shared/utilities/common.functions';

@Component({
  moduleId: module.id,
  selector: 'collection-form',
  templateUrl: 'collection-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionFormComponent implements OnInit {
  @Input() public fields: { form: { items: FormFields[] } };
  @Input() public collection: Collection = null;
  @Input() public collectionActionType: CollectionActionType = 'create';
  @Output() public collectionSaved = new EventEmitter<CollectionFormEvent>();
  public formItems: FormFields[] = [];
  public serverErrors: ServerErrors;
  public tr: { title: string; submitLabel: string, close?: string };
  private defaultCollectionParams: Pojo = {
    q: '',
    accessLevel: 'all',
    s: '',
    d: '',
    i: 0,
    n: 200
  };

  constructor(
    public collectionsService: CollectionsService,
    private detector: ChangeDetectorRef,
    private collectionContext: CollectionContextService,
    private store: AppStore
  ) { }

  ngOnInit() {
    this.formItems = this.setForm();
    switch (this.collectionActionType) {
      case 'create':
        this.tr = {
          title: 'COLLECTION.NEW_TITLE',
          submitLabel: 'COLLECTION.FORM.SUBMIT_LABEL'
        };
        break;
      case 'edit':
        this.tr = {
          title: 'COLLECTION.EDIT.TITLE',
          submitLabel: 'COLLECTION.EDIT.SUBMIT_LABEL'
        };
        break;
      case 'duplicate':
        this.tr = {
          title: 'COLLECTION.DUPLICATE.TITLE',
          submitLabel: 'COLLECTION.DUPLICATE.SUBMIT_LABEL'
        };
        break;
    }
    this.tr.close = 'COLLECTION.FORM.CLOSE_HOVER_TITLE';
  }

  public collectionAction(collection: Collection) {
    switch (this.collectionActionType) {
      case 'create':
        this.createCollection(collection);
        break;
      case 'edit':
        this.editCollection(collection);
        break;
      case 'duplicate':
        this.duplicateCollection(collection);
        break;
    }
  }

  // -------- END OF PUBLIC INTERFACE --------- //

  private createCollection(collection: Collection): void {
    collection.tags = collection.tags.split(/\s*,\s*/).filter((tag: string) => tag !== '');
    this.collectionsService.create(collection).subscribe(collection => {
      this.collectionSaved.emit({ collectionId: collection.id });
      this.refreshCollections();
    }, this.error.bind(this));
  }

  private editCollection(collectionUpdates: Collection): void {
    const backEndReadyCollectionUpdates: Collection = {
      ...collectionUpdates,
      tags: collectionUpdates.tags.split(/\s*,\s*/).filter((tag: string) => tag !== '')
    };

    this.collectionsService.update(this.collection.id, backEndReadyCollectionUpdates)
      .subscribe(() => {
        this.collectionSaved.emit({ collectionId: this.collection.id });
        this.loadCollections();
        if (this.store.match(this.collection.id, state => state.activeCollection.collection.id)) {
          this.getActiveCollection();
        }
      }, this.error.bind(this));
  }

  private duplicateCollection(collection: Collection): void {
    collection = Object.assign(
      {}, this.collection, collection, {
        tags: collection.tags.split(/\s*,\s*/).filter((tag: string) => tag !== '')
      });
    this.collectionsService.duplicate(collection)
      .subscribe((collection: Collection) => {
        this.refreshCollections();
        this.collectionSaved.emit({ collectionId: collection.id });
      }, this.error.bind(this));
  }

  private loadCollections(): void {
    this.collectionsService.load(this.defaultCollectionParams).subscribe();
  }

  private getActiveCollection(): void {
    this.store.dispatch(factory => factory.activeCollection.load());
  }

  private error(error: any): void {
    this.serverErrors = error.json();
    this.detector.markForCheck();
  }

  private refreshCollections(): void {
    this.collectionContext.resetCollectionOptions();
    this.getActiveCollection();
    this.loadCollections();
  }

  private setForm(): FormFields[] {
    this.fields = Common.clone(this.fields);
    return this.fields.form.items.map((item: any) => {
      if (item.name === 'name' && this.collection) {
        item.value = this.collection.name;
        if (this.collectionActionType === 'duplicate') {
          item.value = `Copy - ${item.value}`;
        }
      }
      if (item.type === 'tags') {
        item.tags = (this.collection && this.collection.tags)
          ? this.collection.tags.filter((tag: string) => tag !== '') : [];
        item.value = (this.collection && this.collection.tags)
          ? this.collection.tags.toString() : '';
      }
      return item;
    });
  }
}
