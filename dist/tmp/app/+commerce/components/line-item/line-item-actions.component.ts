import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PurchaseType, quotesWithoutPricing } from '../../../shared/interfaces/commerce.interface';

@Component({
  moduleId: module.id,
  selector: 'line-item-actions-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tools" flex="100">
      <button 
        mat-icon-button
        (click)="remove.emit()"
        title="{{ 'CART.PROJECTS.REMOVE_ASSET_BTN_HOVER' | translate }}">
          <mat-icon>remove_circle</mat-icon>
        </button>
      <button
        data-pendo="cart-lineitem_options-menu-trigger"
        mat-icon-button
        [mat-menu-trigger-for]="lineItemOptionsMenu"
        title="{{ 'CART.PROJECTS.MORE_OPTIONS_BTN_HOVER' | translate }}">
          <mat-icon>more_vert</mat-icon>
      </button>
    </div>

    <mat-menu x-position="before" #lineItemOptionsMenu="matMenu">
      <button mat-menu-item (click)="clone.emit()">
        <mat-icon>layers</mat-icon>{{ 'CART.PROJECTS.DUPLICATE_ASSET_BTN_LABEL' | translate }}
      </button>
      <div class="divider" *ngIf="otherProjectsExist"></div>
      <button mat-menu-item *ngFor="let otherProject of otherProjects" (click)="moveTo.emit(otherProject)">
        <mat-icon>swap_vert_circle</mat-icon>
        {{ 'CART.PROJECTS.MOVE_TO' | translate:{projectName: otherProject.name} | slice:0:28 }}
      </button>
      <div class="divider" *ngIf="shouldShowSubclipButton"></div>
      <button mat-menu-item (click)="editMarkers.emit()" *ngIf="userCanCreateSubclips">
        <mat-icon>access_time</mat-icon>
        <span>{{ trStringForSubclipping | translate }}</span>
      </button>
      <button mat-menu-item 
        *ngIf="displayPriceButton"
        (click)="showPricingDialog.emit()"
        [ngClass]="{'select-usage': needsAttributes }">
        <mat-icon>assignment</mat-icon>
        <span>{{ trStringForRightsPackage | translate }}</span>
      </button>
      <button
        mat-menu-item
        (click)="openNotesForm()">
        <mat-icon>note_add</mat-icon>
        <span>{{ trStringForNoteButton | translate }}</span>
      </button>
      <div *ngIf="userCanAdministerQuotes" class="divider"></div>
      <button mat-menu-item (click)="openCostMultiplierForm.emit()" *ngIf="userCanAdministerQuotes">
        <mat-icon>attach_money</mat-icon>
        <span>{{ trStringForCostMultiplier | translate }}</span>
      </button>
      <button mat-menu-item (click)="removeCostMultiplier.emit()" *ngIf="showDeleteCostMultiplierBtn">
        <mat-icon>remove_circle</mat-icon>
        <span>{{ 'QUOTE.REMOVE_MULTIPLIER' | translate }}</span>
      </button>
      <button mat-menu-item (click)="onClickAddCustomPrice()" *ngIf="userCanAdministerQuotes">
        <mat-icon>monetization_on</mat-icon>
        <span>{{ 'QUOTE.ADD_CUSTOM_PRICE_TITLE' | translate }}</span>
      </button>
    </mat-menu>
  `
})
export class LineItemActionsComponent {
  @Input() rightsReproduction: string;
  @Input() hasAttributes: boolean;
  @Input() otherProjects: any[];
  @Input() userCanCreateSubclips: boolean;
  @Input() userCanAdministerQuotes: boolean;
  @Input() assetIsSubclipped: boolean;
  @Input() quoteType: PurchaseType;
  @Input() hasMultiplier: boolean;
  @Input() hasNote: boolean;
  @Output() showPricingDialog: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() clone: EventEmitter<any> = new EventEmitter();
  @Output() moveTo: EventEmitter<any> = new EventEmitter();
  @Output() editMarkers: EventEmitter<any> = new EventEmitter();
  @Output() openCostMultiplierForm: EventEmitter<null> = new EventEmitter();
  @Output() removeCostMultiplier: EventEmitter<null> = new EventEmitter();
  @Output() addCustomPrice: EventEmitter<null> = new EventEmitter();
  @Output() addNote: EventEmitter<null> = new EventEmitter();

  public get displayPriceButton(): boolean {
    return this.rightsReproduction === 'Rights Managed' && !quotesWithoutPricing.includes(this.quoteType);
  }

  public get needsAttributes(): boolean {
    return this.rightsReproduction === 'Rights Managed' && !this.hasAttributes;
  }

  public get shouldShowSubclipButton(): boolean {
    return this.userCanCreateSubclips && this.otherProjectsExist;
  }

  public get otherProjectsExist(): boolean {
    return this.otherProjects.length > 0;
  }

  public get trStringForSubclipping(): string {
    return this.assetIsSubclipped
      ? 'COLLECTION.SHOW.ASSET_MORE_MENU.EDIT_SUBCLIPPING'
      : 'COLLECTION.SHOW.ASSET_MORE_MENU.ADD_SUBCLIPPING';
  }

  public get trStringForCostMultiplier(): string {
    return this.hasMultiplier
      ? 'QUOTE.EDIT_MULTIPLIER_TITLE'
      : 'QUOTE.ADD_MULTIPLIER_TITLE';
  }

  public get trStringForRightsPackage(): string {
    return this.hasAttributes
      ? 'QUOTE.EDIT_RIGHTS_PACKAGE_TITLE'
      : 'QUOTE.ADD_RIGHTS_PACKAGE_TITLE';
  }

  public get showDeleteCostMultiplierBtn(): boolean {
    return this.userCanAdministerQuotes && this.hasMultiplier;
  }

  public onClickAddCustomPrice(): void {
    this.addCustomPrice.emit();
  }

  public get trStringForNoteButton(): string {
    return this.hasNote ? 'QUOTE.EDIT_NOTE' : 'QUOTE.ADD_NOTE';
  }

  public openNotesForm(): void {
    this.addNote.emit();
  }
}
