import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'asset-data',
  templateUrl: 'asset-data.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssetDataComponent implements OnChanges {
  public secondaryKeys: Array<string>;
  public secondaryMdata: Object;
  @Input() public asset: any;

  ngOnChanges(changes: any): void {
    if (changes.asset) {
      if (Object.keys(changes.asset.currentValue.detailTypeMap.common).length > 0) {
        this.asset = changes.asset.currentValue.detailTypeMap;
        // this.assetDetail.clipUrl = changes.assetDetail.currentValue.clipUrl;
        // this.assetDetail.clipThumbnailUrl = changes.assetDetail.currentValue.clipThumbnailUrl;
        this.secondaryMdata = this.asset.secondary[0];
        this.secondaryKeys = Object.keys(this.secondaryMdata);
      }
    }
  }

  public getMetaField(field: any) {
    let meta = this.asset.clipData.filter((item: any) => item.name === field)[0];
    if (meta) return meta.value;
  }

  public translationReady(field: any) {
    return 'assetmetadata.' + field.replace(/\./g, '_');
  }
}

