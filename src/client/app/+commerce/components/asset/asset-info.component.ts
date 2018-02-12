import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'asset-info-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mat-caption asset-name">{{ asset.assetName }}</div>
    <p class="asset-description">
      {{ (asset.metadata ? asset.metadata[0].value : '') | slice:0:100 }}
    </p>
    <div class="cart-asset-metadata mat-caption">
      <span *ngFor="let meta of asset.metadata">
        <ng-container *ngIf="shouldDisplay(meta)">
          <strong>{{ translationReady(meta.name) | uppercase | translate }}: </strong> {{ meta.value | slice:0:80 }}
        </ng-container>
      </span>
    </div>
  `
})
export class AssetInfoComponent {
  @Input() asset: any;

  public translationReady(field: any) {
    return 'assetmetadata.' + field.replace(/\./g, '_');
  }

  // This should be determined by config, let's fix it asap
  public shouldDisplay(meta: any): boolean {
    return meta.name !== 'Description'
      && meta.name !== 'Format.Duration'
      && meta.name !== 'Format.AspectRatio'
      && meta.name !== 'Resource.Class';
  }
}
