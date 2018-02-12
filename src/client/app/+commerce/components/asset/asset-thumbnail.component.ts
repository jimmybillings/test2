import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Frame } from '../../../shared/modules/wazee-frame-formatter/index';
import { EnhancedAsset } from '../../../shared/interfaces/enhanced-asset';

@Component({
  moduleId: module.id,
  selector: 'asset-thumbnail-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [routerLink]="routerLink">
      <div class="cart-asset-thb">
        <span class="asset-duration">
          <span>{{ durationFrame | timecode }}</span>
        </span>
        <span *ngIf="isImage" class="indicate-photo">
          <span class="image"></span>
        </span>
        <img src="{{ thumbnailUrl }}"/>
      </div>
    </a>
  `
})
export class AssetThumbnailComponent {
  private enhancedAsset: EnhancedAsset;

  @Input() public set asset(asset: EnhancedAsset) {
    this.enhancedAsset = asset;
  }

  public get routerLink(): any[] {
    return this.enhancedAsset.routerLink;
  }

  public get durationFrame(): Frame {
    return this.enhancedAsset.subclipDurationFrame;
  }

  public get isImage(): boolean {
    return this.enhancedAsset.isImage;
  }

  public get thumbnailUrl(): string {
    return this.enhancedAsset.thumbnailUrl;
  }
}
