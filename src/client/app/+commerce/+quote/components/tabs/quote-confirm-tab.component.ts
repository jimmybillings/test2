import { Observable } from 'rxjs/Observable';
import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { CommerceConfirmTab } from '../../../components/tabs/commerce-confirm-tab';
import { QuoteService } from '../../../../shared/services/quote.service';
import { Router } from '@angular/router';
import { CommerceCapabilities } from '../../../services/commerce.capabilities';
import { WzDialogService } from '../../../../shared/modules/wz-dialog/services/wz.dialog.service';
import {
  LicenseAgreements,
  PurchaseType,
  quotesWithoutPricing,
  quotesAllowedToHaveFeesOnly
} from '../../../../shared/interfaces/commerce.interface';
import { LicenseAgreementComponent } from '../../../components/license-agreement/license-agreement.component';
import { Common } from '../../../../shared/utilities/common.functions';
import { AppStore } from '../../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'quote-confirm-tab',
  templateUrl: '../../../components/tabs/commerce-confirm-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuoteConfirmTabComponent extends CommerceConfirmTab {
  constructor(
    protected router: Router,
    public quoteService: QuoteService,
    public dialogService: WzDialogService,
    public userCan: CommerceCapabilities,
    protected store: AppStore
  ) {
    super(router, quoteService, dialogService, userCan, store);
  }

  public showLicenseAgreements(): void {
    this.commerceService.retrieveLicenseAgreements().take(1).subscribe((agreements: LicenseAgreements) => {
      this.dialogService.openComponentInDialog(
        {
          componentType: LicenseAgreementComponent,
          dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
          inputOptions: {
            assetType: 'quoteShow',
            parentId: this.quoteService.state.data.id,
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

  public get quoteIsTrial(): Observable<boolean> {
    return this.store.select(state => state.quoteShow.data.purchaseType === 'Trial');
  }

  public get showPricing(): Observable<boolean> {
    return this.store.select(state => !quotesWithoutPricing.includes(state.quoteShow.data.purchaseType));
  }

  public get canPurchase(): boolean {
    return this.store.snapshot(state => quotesAllowedToHaveFeesOnly.includes(state.quoteShow.data.purchaseType)) ||
      (this.licensesAreAgreedTo && this.shouldShowLicenseDetailsBtn());
  }

  public shouldShowLicenseDetailsBtn(): boolean {
    return this.userCan.viewLicenseAgreementsButton(this.commerceService.hasAssetLineItems) &&
      this.store.snapshot(state => !quotesAllowedToHaveFeesOnly.includes(state.quoteShow.data.purchaseType));
  }
}
