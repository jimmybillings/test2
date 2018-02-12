import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { LicenseAgreement, LicenseAgreements, LicenseAsset } from '../../../shared/interfaces/commerce.interface';
import { enhanceAsset, AssetType } from '../../../shared/interfaces/enhanced-asset';
import { Common } from '../../../shared/utilities/common.functions';

@Component({
  moduleId: module.id,
  selector: 'license-agreement-component',
  templateUrl: 'license-agreement.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LicenseAgreementComponent {
  public _licenses: LicenseAgreement[];

  @Input() assetType: AssetType;
  @Input() parentId: number;
  @Input()
  set licenses(licenses: LicenseAgreements) {
    this._licenses = licenses.items.map((license: LicenseAgreement) => {
      license.matchingAssets = license.matchingAssets.map((asset: LicenseAsset) => {
        return enhanceAsset(Object.assign(asset, { uuid: asset.assetLineItemId }), this.assetType, this.parentId);
      });

      return license;
    });
  }

  @Output() close: EventEmitter<null> = new EventEmitter();

  public onClickLink(): void {
    this.close.emit();
  }

  public labelForLicense(license: LicenseAgreement): string {
    return (!license.projectType || license.rights !== 'Rights Managed')
      ? license.rights
      : license.projectType;
  }
}
