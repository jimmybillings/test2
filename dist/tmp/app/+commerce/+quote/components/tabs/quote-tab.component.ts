import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteService } from '../../../../shared/services/quote.service';
import {
  Quote, QuoteState, Project, AssetLineItem, FeeLineItem, PurchaseType, quotesWithoutPricing
} from '../../../../shared/interfaces/commerce.interface';
import { Tab } from '../../../components/tabs/tab';
import { CommerceCapabilities } from '../../../services/commerce.capabilities';
import { Observable } from 'rxjs/Observable';
import { Feature } from '../../../../shared/interfaces/feature.interface';
import { WzDialogService } from '../../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { LicenseAgreements } from '../../../../shared/interfaces/commerce.interface';
import { LicenseAgreementComponent } from '../../../components/license-agreement/license-agreement.component';
import { FormFields } from '../../../../shared/interfaces/forms.interface';
import { Pojo } from '../../../../shared/interfaces/common.interface';
import { Subscription } from 'rxjs/Subscription';
import { Common } from '../../../../shared/utilities/common.functions';
import { AppStore } from '../../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'quote-tab',
  templateUrl: 'quote-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuoteTabComponent extends Tab implements OnDestroy {
  public quote: Observable<Quote>;
  public projects: Project[];
  private config: any;
  private projectSubscription: Subscription;

  constructor(
    public quoteService: QuoteService,
    public userCan: CommerceCapabilities,
    private dialogService: WzDialogService,
    private router: Router,
    private store: AppStore
  ) {
    super();
    this.quote = this.quoteService.data.map(state => state.data);
    this.projectSubscription = this.quoteService.projects.subscribe(projects => this.projects = projects);
    this.config = this.store.snapshotCloned(state => state.uiConfig.components.cart.config);
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

  public get hasDiscount(): boolean {
    return !!this.quoteService.state.data.discount;
  }

  public checkout(): void {
    this.quoteService.getPaymentOptions();
    this.goToNextTab();
  }

  public onCloneQuote() {
    this.store.dispatch(factory =>
      factory.quoteEdit.cloneQuote(this.store.snapshotCloned(state => state.quoteShow.data))
    );
  }

  public get shouldShowCloneButton(): Observable<boolean> {
    return this.userCan.cloneQuote(this.quoteService.data);
  }

  public get shouldShowLicenseDetailsBtn(): boolean {
    return this.userCan.viewLicenseAgreementsButton(this.quoteService.hasAssetLineItems) &&
      this.store.snapshot(state => state.quoteShow.data.purchaseType !== 'RevenueOnly');
  }

  public get shouldShowExpireQuoteButton(): boolean {
    return this.userCan.administerQuotes() && this.isActiveQuote;
  }

  public get shouldShowCheckoutOptions(): boolean {
    return !this.userCan.administerQuotes() && this.isActiveQuote;
  }

  public get shouldShowRejectQuoteButton(): boolean {
    return !this.userCan.administerQuotes();
  }

  public get shouldShowResendButton(): boolean {
    return this.userCan.administerQuotes() && (this.isExpiredQuote || this.isActiveQuote);
  }

  public showLicenseAgreements(): void {
    this.quoteService.retrieveLicenseAgreements().take(1).subscribe((agreements: LicenseAgreements) => {
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

  public showExpireConfirmationDialog(): void {
    this.dialogService.openConfirmationDialog({
      title: 'QUOTE.EXPIRE.TITLE',
      message: 'QUOTE.EXPIRE.MESSAGE',
      accept: 'QUOTE.EXPIRE.ACCEPT',
      decline: 'QUOTE.EXPIRE.DECLINE'
    }, this.expireQuote);
  }

  public openRejectQuoteDialog(): void {
    this.dialogService.openConfirmationDialog({
      title: 'QUOTE.REJECT.TITLE',
      message: 'QUOTE.REJECT.MESSAGE',
      accept: 'QUOTE.REJECT.ACCEPT',
      decline: 'QUOTE.REJECT.DECLINE'
    }, this.rejectQuote);
  }

  public openResendDialog(): void {
    this.dialogService.openFormDialog(
      this.config.extendQuote.items,
      { title: 'QUOTE.EXTEND_EXPIRATION' },
      this.extendQuoteExpiration
    );
  }

  public get quoteIsTrial(): Observable<boolean> {
    return this.store.select(state => state.quoteShow.data.purchaseType === 'Trial');
  }

  public get showPricing(): Observable<boolean> {
    return this.store.select(state => !quotesWithoutPricing.includes(state.quoteShow.data.purchaseType));
  }

  private get isActiveQuote(): boolean {
    return this.quoteService.state.data.quoteStatus === 'ACTIVE';
  }

  private get isExpiredQuote(): boolean {
    return this.quoteService.state.data.quoteStatus === 'EXPIRED';
  }

  private extendQuoteExpiration = (newDate: { expirationDate: string }): void => {
    this.quoteService
      .extendExpirationDate(newDate.expirationDate)
      .subscribe(() => {
        this.router.navigate(['/quotes']);
      });
  }

  private expireQuote = (): void => {
    this.quoteService.expireQuote().subscribe(() => {
      this.router.navigate(['/quotes']);
    });
  }

  private rejectQuote = (): void => {
    this.quoteService.rejectQuote().take(1).subscribe(() => {
      this.router.navigate(['/quotes']);
    });
  }
}
