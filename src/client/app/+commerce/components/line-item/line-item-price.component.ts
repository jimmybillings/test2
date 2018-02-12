import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'line-item-price-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      layout="column"
      class="line-item-price"
      layout-align="center end">
      <div *ngIf="shouldShowBasePrice" 
        class="multiplier-base"
        layout="row"
        layout-align="end center">
        <div class="label" flex="100">{{ 'QUOTE.BASE_PRICE_LABEL' | translate }}</div>
        <div class="multiplier-base-price" flex="no-grow">{{ itemPrice | currency:'USD':true:'1.2-2' }}</div>
      </div>  
      <ng-container *ngIf="shouldShowMultiplier">
        <div
          class="multiplier-base"
          layout="row"
          layout-align="end center">
          <div class="label" flex="100">{{ 'QUOTE.MULTIPLIER_BASE_PRICE_LABEL' | translate }}</div>
          <div class="multiplier-base-price" flex="no-grow">{{ itemPrice | currency:'USD':true:'1.2-2' }}</div>
        </div>
        <div 
          class="multiplier"
          layout="row"
          layout-align="end center">
          <div class="label" flex="100">{{ 'QUOTE.MULTIPLIER_LABEL' | translate }}</div>
          <div class="multiplier-value" flex="no-grow">
            {{ 'QUOTE.MULTIPLIER_VALUE' | translate:{multiplier: formattedMultiplier} }}
          </div>
        </div>
      </ng-container>
      <div *ngIf="showPreDiscountPrice" 
        class="pre-discount"
        layout="row"
        layout-align="end center">
        <div class="label" flex="100">{{ 'QUOTE.PRE_DISCOUNT_PRICE_LABEL' | translate }}</div>
        <div class="pre-discount-price" flex="no-grow">{{ grossAssetPrice | currency:'USD':true:'1.2-2' }}</div>
      </div>
      <div
        *ngIf="showAdminPrice"
        (click)="onClickPrice()"
        class="admin-price"
        [ngClass]="{'select-usage': needsAttributes }">
          {{ price | currency:'USD':true:'1.2-2' }}
      </div>
      <div
        *ngIf="showAdminOveridePrice"
        (click)="onClickPrice()"
        class="admin-price"
        [ngClass]="{'select-usage': needsAttributes }">
          <mat-icon>lock</mat-icon>{{ overrideGrossAssetPrice | currency:'USD':true:'1.2-2' }}
      </div>
      <div
        *ngIf="!showAdminPrice && !showAdminOveridePrice"
        class="non-admin-price"
        [ngClass]="{'select-usage': needsAttributes }">
        {{ price | currency:'USD':true:'1.2-2' }}
      </div>
    </div>
  `
})
export class LineItemPriceComponent {
  @Input() price: number;
  @Input() itemPrice: number;
  @Input() grossAssetPrice: number;
  @Input() multiplier: number;
  @Input() overrideGrossAssetPrice: number;
  @Input() userCanAdministerQuotes: boolean;
  @Input() rightsManaged: string;
  @Input() hasAttributes: boolean;
  @Input() readonly: boolean;
  @Output() addCustomPrice: EventEmitter<null> = new EventEmitter();

  public get needsAttributes(): boolean {
    return this.rightsManaged === 'Rights Managed' && !this.hasAttributes;
  }

  public get shouldShowMultiplier(): boolean {
    return this.userCanAdministerQuotes && this.multiplier > 1;
  }

  public get shouldShowBasePrice(): boolean {
    return this.userCanAdministerQuotes && !!this.overrideGrossAssetPrice && this.itemPrice !== this.price;
  }

  public get formattedMultiplier(): string {
    if (String(this.multiplier).includes('.')) {
      const [integer, decimal] = String(this.multiplier).split('.');
      return integer.concat('.').concat(decimal.slice(0, 2));
    } else {
      return String(this.multiplier);
    }
  }

  public get showAdminOveridePrice(): boolean {
    return this.userCanAdministerQuotes && !this.readonly && !!this.overrideGrossAssetPrice;
  }

  public get showAdminPrice(): boolean {
    return this.userCanAdministerQuotes && !this.needsAttributes && !this.readonly && !this.overrideGrossAssetPrice;
  }

  public get showPreDiscountPrice(): boolean {
    return this.userCanAdministerQuotes && !this.overrideGrossAssetPrice && (this.itemPrice !== this.price);
  }

  public onClickPrice(): void {
    this.addCustomPrice.emit();
  }
}
