import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AssetLineItem } from '../../../shared/interfaces/commerce.interface';
import { SelectedPriceAttribute } from '../../../shared/interfaces/common.interface';
@Component({
  moduleId: module.id,
  selector: 'line-item-rights-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    `
  <ng-container *ngIf="rightsManagedWithoutUsage">
    <section class="read-only">
      <header class="rights-managed">{{rightsManaged}}</header>
    </section>
  </ng-container>

  <ng-container *ngIf="rightsManagedDisplayUsage">
    <section
      data-pendo="cart-lineitem_pricing-btn"
      [ngClass]="{'read-only': readOnly, 'needs-rights': !hasAttributes}"
      (click)="showPricingDialog.emit()">
      <ng-container>
        <header>{{'QUOTE.RIGHTS_PACKAGE_TITLE' | translate}}</header>
        <span *ngIf="!hasAttributes" class="cart-asset-metadata mat-caption">
          <strong>{{'QUOTE.RIGHTS_PACKAGE_NOT_SELECTED_MSG' | translate}}</strong>
        </span>
      </ng-container>
      <ng-container *ngIf="displayRmAttributes">
        <span *ngFor="let right of rights" class="cart-asset-metadata mat-caption">
        <strong>{{attributeName(right)}}: </strong> {{attributeValue(right)}}
        </span>
      </ng-container>
    </section>
  </ng-container>

  <ng-container *ngIf="rightsRoyaltyFree">
    <section class="read-only">
      <header class="royalty-free">{{rightsManaged}}</header>
    </section>
  </ng-container>

  `
})
export class LineItemRightsComponent {
  @Input() rights: Array<SelectedPriceAttribute>;
  @Input() rightsManaged: string;
  @Input() hasAttributes: boolean;
  @Input() readOnly: boolean = false;
  @Input() displayRmAttributes: boolean = true;
  @Output() showPricingDialog: EventEmitter<null> = new EventEmitter();

  public attributeName(attribute: SelectedPriceAttribute): string {
    return attribute.priceAttributeDisplayName || attribute.priceAttributeName;
  }

  public attributeValue(attribute: SelectedPriceAttribute): string {
    return attribute.selectedAttributeName || attribute.selectedAttributeValue;
  }

  public get rightsManagedDisplayUsage(): boolean {
    return this.rightsManaged === 'Rights Managed' && this.displayRmAttributes;
  }

  public get rightsManagedWithoutUsage(): boolean {
    return this.rightsManaged === 'Rights Managed' && !this.displayRmAttributes;
  }

  public get rightsRoyaltyFree(): boolean {
    return this.rightsManaged === 'Royalty Free';
  }
}
