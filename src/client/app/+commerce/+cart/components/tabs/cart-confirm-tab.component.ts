import { Observable } from 'rxjs/Observable';
import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { CommerceConfirmTab } from '../../../components/tabs/commerce-confirm-tab';
import { CartService } from '../../../../shared/services/cart.service';
import { Router } from '@angular/router';
import { CommerceCapabilities } from '../../../services/commerce.capabilities';
import { WzDialogService } from '../../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { LicenseAgreements } from '../../../../shared/interfaces/commerce.interface';
import { LicenseAgreementComponent } from '../../../components/license-agreement/license-agreement.component';
import { Common } from '../../../../shared/utilities/common.functions';
import { AppStore } from '../../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'cart-confirm-tab-component',
  templateUrl: '../../../components/tabs/commerce-confirm-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CartConfirmTabComponent extends CommerceConfirmTab {
  constructor(
    protected router: Router,
    public cartService: CartService,
    public dialogService: WzDialogService,
    public userCan: CommerceCapabilities,
    protected store: AppStore
  ) {
    super(router, cartService, dialogService, userCan, store);
  }

  public showLicenseAgreements(): void {
    this.cartService.retrieveLicenseAgreements().take(1).subscribe((agreements: LicenseAgreements) => {
      this.dialogService.openComponentInDialog(
        {
          componentType: LicenseAgreementComponent,
          dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
          inputOptions: {
            assetType: 'cart',
            licenses: Common.clone(agreements)
          },
          outputOptions: [
            {
              event: 'close',
              callback: () => true,
              closeOnEvent: true
            }
          ]
        }
      );
    });
  }

  public get showPricing(): Observable<boolean> {
    return Observable.of(true);
  }

  public get quoteIsTrial(): Observable<boolean> {
    return Observable.of(false);
  }

  public get canPurchase(): boolean {
    return this.licensesAreAgreedTo && this.shouldShowLicenseDetailsBtn();
  }

  public shouldShowLicenseDetailsBtn(): boolean {
    return this.userCan.viewLicenseAgreementsButton(this.commerceService.hasAssetLineItems);
  }
}
