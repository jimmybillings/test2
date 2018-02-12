import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export type ResultsView = 'grid' | 'list';

@Component({
  moduleId: module.id,
  selector: 'search-header',
  template: `
    	<section class="search-header" layout="row" layout-align="center center">
        <header flex-gt-lg="95" flex-lg="95" flex="100">
          <div layout="row" layout-align="space-between end">
            <wz-gallery-breadcrumb
              *ngIf="path"
              [path]="path"
              (clickBreadcrumb)="onClickBreadcrumb.emit($event)">
            </wz-gallery-breadcrumb>
            <h2 *ngIf="!hasResults" flex="100" class="mat-display-1 alert"> 
              {{ 'SEARCH.NO_RESULTS.PG_HEADING' | translate }}
            </h2>
            <div *ngIf="hasResults" class="asset-sort-by tools" flex="auto">
              <button mat-button class="is-dd" color="primary" [mat-menu-trigger-for]="assetSortMenu">
                <span class="key">{{'SEARCH.SORT_BTN_LABEL' | translate }}</span>
                <span class="value mat-caption">
                  {{ currentSort.name }}
                </span>
              </button>
              <mat-menu x-position="before" #assetSortMenu="matMenu">
                <wz-sort-component 
                  [current]="currentSort" 
                  [items]="sortDefinitionItems" 
                  (sort)="onSortResults.emit($event)">
                </wz-sort-component>
              </mat-menu>
              <button
                mat-icon-button
                color="primary"
                title="{{ titleForAssetViewBtn | translate }}" 
                (click)="onClickAssetViewBtn()">
                <mat-icon>{{ iconForAssetViewBtn }}</mat-icon>
              </button>
              <button
                [disabled]="!canEditCollection"
                mat-icon-button
                color="primary"
                title="{{ 'SEARCH.ADD_ALL_TO_COLLECTION.BTN_TITLE' | translate:{ collectionName:collectionName } }}"
                (click)="onClickAddAllBtn()">
                <mat-icon>library_add</mat-icon>  
              </button>
            </div>
          </div>
        </header>
      </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchHeaderComponent {
  @Input() hasResults: boolean = true;
  @Input() sortDefinitionItems: any;
  @Input() currentSort: any;
  @Input() assetView: ResultsView = 'grid';
  @Input() path: any;
  @Input() collectionName: string;
  @Input() canEditCollection: boolean;
  @Output() onChangeAssetView: EventEmitter<ResultsView> = new EventEmitter();
  @Output() onSortResults: EventEmitter<any> = new EventEmitter();
  @Output() onClickBreadcrumb: EventEmitter<any> = new EventEmitter();
  @Output() clickAddAllBtn: EventEmitter<null> = new EventEmitter();

  public get titleForAssetViewBtn(): string {
    return this.assetView === 'grid' ?
      'SEARCH.ASSET_VIEW_LIST_BTN_TITLE' :
      'SEARCH.ASSET_VIEW_GRID_BTN_TITLE';
  }

  public get iconForAssetViewBtn(): string {
    return this.assetView === 'grid' ? 'view_list' : 'view_comfy';
  }

  public onClickAssetViewBtn(): void {
    const newViewValue: ResultsView = this.assetView === 'grid' ? 'list' : 'grid';
    this.onChangeAssetView.emit(newViewValue);
  }

  public onClickAddAllBtn(): void {
    this.clickAddAllBtn.emit();
  }
}
