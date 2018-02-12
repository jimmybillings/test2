import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AppStore } from '../../app.store';

@Component({
  moduleId: module.id,
  selector: 'collection-link-component',
  templateUrl: 'collection-link.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CollectionLinkComponent {
  @Input()
  set assets(value: any) {
    this.buildLegacyLink(value);
  }

  public legacyLink: string;

  constructor(private store: AppStore) { }

  public buildLegacyLink(assets: any): void {
    let filterSegment: string;
    filterSegment = assets.reduce((prev: string, current: any, i: number) => {
      (i !== assets.length - 1) ? prev += current.assetId + ' OR ' : prev += current.assetId;
      return prev;
    }, '');
    this.legacyLink = `https://commerce.wazeedigital.com/license/searchResults.do?search.keywords=id:(${filterSegment})`;
  }

  public selectInputForCopy(event: any): void {
    event.target.select();
  }

  public onCopyLegacyLinkButtonClick(): void {
    this.store.dispatch(factory => factory.snackbar.display('COLLECTION.LINK_COPIED_TOAST'));
  }
}
