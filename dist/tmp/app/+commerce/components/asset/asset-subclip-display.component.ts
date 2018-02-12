import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Frame, TimecodeFormat } from '../../../shared/modules/wazee-frame-formatter/index';
import { EnhancedAsset } from '../../../shared/interfaces/enhanced-asset';

@Component({
  moduleId: module.id,
  selector: 'asset-subclip-display-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="isSubclipped" class="asset-sub-clip mat-caption">
      <strong>{{ 'COLLECTION.SHOW.SUB_CLIPPING_LABEL' | translate }}</strong>
      <div class="subclip-timeline">
        <span class="subclip-segment" [ngStyle]="subclipSegmentStyles"></span>
      </div>
      <ul class="subclip-data" layout="row" hide-sm>
        <li flex-gt-sm="30" flex-gt-md="25" flex="35">
          <strong>{{ 'COLLECTION.SHOW.START_TIME_LABEL' | translate }}</strong>
          {{ inMarkerFrame | timecode }}
        </li>
        <li flex="none">
          <strong>{{ 'COLLECTION.SHOW.END_TIME_LABEL' | translate }} </strong>
          {{ outMarkerFrame | timecode }}
        </li>
        <li flex="" layout-align="end center">
          <strong>{{ 'COLLECTION.SHOW.SUB_CLIP_LENGTH_LABEL' | translate }}</strong>
          {{ subclipDurationFrame | timecode }}
        </li>
      </ul>
    </div>
  `
})
export class AssetSubclipDisplayComponent {
  private enhancedAsset: EnhancedAsset;

  @Input() public set asset(asset: EnhancedAsset) {
    this.enhancedAsset = asset;
  }

  public get isSubclipped(): boolean {
    return this.enhancedAsset.isSubclipped;
  }

  public get subclipSegmentStyles(): object {
    return {
      'margin-left.%': this.enhancedAsset.inMarkerPercentage,
      'width.%': this.enhancedAsset.subclipDurationPercentage,
      'min-width.px': 2
    };
  }

  public get inMarkerFrame(): Frame {
    return this.enhancedAsset.inMarkerFrame;
  }

  public get outMarkerFrame(): Frame {
    return this.enhancedAsset.outMarkerFrame;
  }

  public get subclipDurationFrame(): Frame {
    return this.enhancedAsset.subclipDurationFrame;
  }
}
