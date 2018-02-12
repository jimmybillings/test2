import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PricingType, SpeedviewData } from '../../../interfaces/asset.interface';
import {
  style,
  trigger,
  state,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export type SpeedPreviewVisibility = 'visible' | 'hidden';

@Component({
  moduleId: module.id,
  selector: 'wz-speedview',
  templateUrl: 'wz.speedview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('state', [
      state('hidden', style({
        opacity: '0',
        transform: 'scale(0)'
      })),
      state('visible', style({
        opacity: '1',
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
      transition('visible => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
    ])
  ],
})

export class WzSpeedviewComponent {

  public speedviewAssetInfo: BehaviorSubject<SpeedviewData> = new BehaviorSubject({
    values: [],
    url: '',
    price: 0,
    imageQuickView: false,
    pricingType: '' as PricingType
  });

  public visibility: BehaviorSubject<SpeedPreviewVisibility> = new BehaviorSubject('hidden' as SpeedPreviewVisibility);

  public translationReady(field: string) {
    return 'assetmetadata.' + field.replace(/\./g, '_');
  }

  public merge(data: SpeedviewData) {
    let speedviewAssetInfo: SpeedviewData;
    this.speedviewAssetInfo.take(1).subscribe(currentData => {
      speedviewAssetInfo = currentData;
    });
    // Fall back if the asset has no data
    if (data.noData) {
      let tempData = { posterUrl: speedviewAssetInfo.posterUrl };
      speedviewAssetInfo = { ...tempData, ...data };

      // First hover using the cached image from the result thumbnail
    } else if (data.posterUrl) {
      speedviewAssetInfo.posterUrl = data.posterUrl;

      // main meta data coming from server or cache
    } else {
      if (speedviewAssetInfo.noData) delete speedviewAssetInfo.noData;
      speedviewAssetInfo = { ...speedviewAssetInfo, ...data };
    }
    this.speedviewAssetInfo.next(speedviewAssetInfo);
  }

  public show() {
    setTimeout(() => {
      this.visibility.next('visible');
    }, 300);
  }
}
