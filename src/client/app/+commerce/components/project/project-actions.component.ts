import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AssetLineItem, PurchaseType, quotesWithoutPricing } from '../../../shared/interfaces/commerce.interface';

@Component({
  moduleId: module.id,
  selector: 'project-actions-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      mat-button
      type="button"
      data-pendo="cart-project_pricing-btn"
      *ngIf="showRightsPricingBtn"
      (click)="editProjectPricing()" 
      class="is-outlined rights-pkg"
      [ngClass]="{'select-usage': !rmAssetsHaveAttributes }">
      <mat-icon>assignment</mat-icon>
      {{ 'CART.PROJECTS.EDIT_USAGE_BTN_LABEL' | translate }}
    </button>
    <button
      data-pendo="cart-project_options-menu-trigger"
      mat-icon-button 
      [mat-menu-trigger-for]="projectOptionsMenu" 
      title="{{ 'CART.PROJECTS.MORE_OPTIONS_BTN_TITLE' | translate }}">
      <mat-icon>more_vert</mat-icon>
    </button>

    <mat-menu x-position="before" #projectOptionsMenu="matMenu">
      <button mat-menu-item (click)="onEditButtonClick()">
        <mat-icon>edit</mat-icon>{{ 'CART.PROJECTS.EDIT_PROJECT_BTN_TITLE' | translate }}
      </button>
      <ng-container *ngIf="allowQuoteAdministration">
        <button mat-menu-item (click)="onAddFeeButtonClick()">
          <mat-icon>note_add</mat-icon>{{ 'CART.PROJECTS.ADD_FEE' | translate }}
        </button>
        <button mat-menu-item (click)="onBulkImportClick()">
          <mat-icon>library_add</mat-icon>{{ 'QUOTE.BULK_IMPORT.TITLE' | translate }}
        </button>
        <div class="divider"></div>
      </ng-container>
      <button
        mat-menu-item
        (click)="onRemoveButtonClick()">
        <mat-icon>delete</mat-icon>{{ 'CART.PROJECTS.DELETE_PROJECT_BTN' | translate }}
      </button>
    </mat-menu>
  `
})
export class ProjectActionsComponent {
  @Input() quoteType: PurchaseType;
  @Input() allowQuoteAdministration: boolean = false;
  @Input() projectHasRmAssets: boolean = false;
  @Input() rmAssetsHaveAttributes: boolean = false;
  @Output() remove: EventEmitter<null> = new EventEmitter();
  @Output() edit: EventEmitter<null> = new EventEmitter();
  @Output() addFee: EventEmitter<null> = new EventEmitter();
  @Output() bulkImport: EventEmitter<null> = new EventEmitter();
  @Output() projectActionsNotify: EventEmitter<Object> = new EventEmitter<Object>();

  public onEditButtonClick(): void {
    this.edit.emit();
  }

  public onRemoveButtonClick(): void {
    this.remove.emit();
  }

  public onAddFeeButtonClick(): void {
    this.addFee.emit();
  }

  public editProjectPricing() {
    this.projectActionsNotify.emit({ type: 'EDIT_PROJECT_PRICING' });
  }

  public get showRightsPricingBtn(): boolean {
    return !quotesWithoutPricing.includes(this.quoteType) && this.projectHasRmAssets;
  }

  public onBulkImportClick(): void {
    this.bulkImport.emit();
  }
}
