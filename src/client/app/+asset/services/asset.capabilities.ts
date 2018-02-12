import { Injectable } from '@angular/core';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { Router } from '@angular/router';

import { EnhancedAsset } from '../../shared/interfaces/enhanced-asset';

@Injectable()
export class AssetCapabilities {
  constructor(public currentUser: CurrentUserService, public route: Router) { }

  public viewAssetDetails(): boolean {
    return this.userHas('ViewClips');
  }

  public downloadWatermarkComps(hasComp: boolean): boolean {
    return this.userHas('DownloadWatermarkComps') && hasComp;
  }

  public downloadCleanComps(hasComp: boolean): boolean {
    return this.userHas('DownloadCleanComps') && hasComp;
  }

  public downloadFullComps(hasComp: boolean): boolean {
    return this.userHas('DownloadFullComps') && hasComp;
  }

  public createAccessInfo(): boolean {
    return this.userHas('CreateAccessInfo');
  }

  public createSubclips(asset: EnhancedAsset): boolean {
    // TODO: Unit test this if/when it has more functionality than just a simple boolean!
    return this.userHas('CreateSubclips') && typeof this.findMetadataValueFor('Format.FrameRate', asset) === 'string';
  }

  public viewAdvancedPlayer(asset: EnhancedAsset, isShared: boolean): boolean {
    return this.createSubclips(asset) || isShared;
  }

  public userHas(permission: string): boolean {
    return this.currentUser.hasPermission(permission);
  }

  public findMetadataValueFor(metadataName: string, object: any): string | null {
    if (object !== Object(object)) return null;

    const keys = Object.keys(object);

    if (keys.length === 2 && keys.sort().join('|') === 'name|value' && object.name === metadataName) {
      return object.value;
    }

    for (var key of keys) {
      const value = this.findMetadataValueFor(metadataName, object[key]);
      if (value) return value;
    }

    return null;
  }
}
