import { enhanceAsset } from '../../../shared/interfaces/enhanced-asset';
import { Common } from '../../../shared/utilities/common.functions';
import { Subscription } from 'rxjs/Subscription';
import { Pojo } from '../../../shared/interfaces/common.interface';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { WzDialogService } from '../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { Capabilities } from '../../../shared/services/capabilities.service';
import { AssetLineItem, CommerceMessage, Project, Quote } from '../../../shared/interfaces/commerce.interface';
import { FormFields } from '../../../shared/interfaces/forms.interface';
import { CommentParentObject } from '../../../shared/interfaces/comment.interface';
import { AppStore } from '../../../app.store';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'quote-edit-component',
  templateUrl: 'quote-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuoteEditComponent implements OnInit, OnDestroy {
  public projects: Project[];
  public tabLabelKeys: string[];
  public tabEnabled: boolean[];
  public selectedTabIndex: number;
  public config: any;
  public commentFormConfig: Array<FormFields>;
  public commentParentObject: CommentParentObject;
  public showComments: boolean = null;
  private projectSubscription: Subscription;

  constructor(
    public userCan: Capabilities,
    public dialogService: WzDialogService,
    private store: AppStore,
    private detector: ChangeDetectorRef
  ) {
    this.commentFormConfig = this.store.snapshotCloned(state => state.uiConfig.components.quoteComment.config.form.items);
    this.commentParentObject = { objectType: 'quote', objectId: this.store.snapshot(state => state.quoteEdit.data.id) };
    this.config = this.store.snapshotCloned(state => state.uiConfig.components.cart.config);
  }

  ngOnInit() {
    // We could initialize a subset of these instead, based on some condition.
    // For example, don't include 'billing' and 'payment' if the cart total is 0.
    // this.tabLabelKeys = ['cart', 'billing', 'payment', 'confirm'];
    // I think the confirm tab should be place order
    this.tabLabelKeys = ['quote', 'recipient', 'confirm'];

    // Enable the first tab and disable the rest.
    this.tabEnabled = this.tabLabelKeys.map((_, index) => index === 0);

    this.selectedTabIndex = 0;

    this.projectSubscription = this.store.select(state => state.quoteEdit.data.projects)
      .subscribe(projects => this.projects = this.enhanceAssetsInProjects(projects));
  }
  ngOnDestroy() {
    this.projectSubscription.unsubscribe();

  }

  public onNotification(message: CommerceMessage): void {
    switch (message.type) {
      case 'OPEN_DELETE_DIALOG':
        this.onOpenDeleteQuoteDialog();
        break;

      case 'SAVE_AND_NEW':
        this.onCreateQuote();
        break;

      case 'CLONE_QUOTE':
        this.onCloneQuote();
        break;

      case 'GO_TO_NEXT_TAB': {
        this.goToNextTab();
        break;
      }
      case 'GO_TO_PREVIOUS_TAB': {
        this.goToPreviousTab();
        break;
      }
      case 'GO_TO_TAB': {
        this.goToTab(message.payload);
        break;
      }
      case 'DISABLE_TAB': {
        this.disableTab(message.payload);
      }
    }
  }

  public get hasBulkOrderId(): Observable<boolean | string> {
    return this.store.select(state => state.quoteEdit.data)
      .map(quote => (quote.bulkOrderId) ? quote.bulkOrderId : false);
  }

  public get bulkOrderIdActionLabel(): string {
    return this.store.snapshot(factory => factory.quoteEdit.data.bulkOrderId) ?
      'QUOTE.EDIT_BULK_ORDER_ID_TITLE' : 'QUOTE.ADD_BULK_ORDER_ID_TITLE';
  }

  public get discountActionLabel(): string {
    return this.store.snapshot(factory => factory.quoteEdit.data.discount) ?
      'QUOTE.EDIT_DISCOUNT_TITLE' : 'QUOTE.ADD_DISCOUNT_TITLE';
  }

  public get bulkOrderIdSubmitLabel(): string {
    return this.store.snapshot(factory => factory.quoteEdit.data.bulkOrderId) ?
      'QUOTE.EDIT_BULK_ORDER_FORM_SUBMIT' : 'QUOTE.ADD_BULK_ORDER_FORM_SUBMIT';
  }

  public get discountSubmitLabel(): string {
    return this.store.snapshot(factory => factory.quoteEdit.data.discount) ?
      'QUOTE.EDIT_DISCOUNT_FORM_SUBMIT' : 'QUOTE.ADD_DISCOUNT_FORM_SUBMIT';
  }

  public get shouldShowCloneButton(): Observable<boolean> {
    return this.userCan.cloneQuote(this.store.select(state => state.quoteEdit));
  }

  public toggleCommentsVisibility(): void {
    this.showComments = !this.showComments;
  }

  public get commentCount(): Observable<number> {
    return this.store.select(state => state.comment.quote.pagination.totalCount);
  }

  public addBulkOrderId(): void {
    this.dialogService.openFormDialog(
      this.mergeFormValues(this.config.addBulkOrderId.items, 'bulkOrderId'),
      {
        title: this.bulkOrderIdActionLabel,
        submitLabel: this.bulkOrderIdSubmitLabel,
        autocomplete: 'off'
      },
      this.updateQuoteField
    );
  }

  public editDiscount(): void {
    this.dialogService.openFormDialog(
      this.mergeFormValues(this.config.addDiscount.items, 'discount'),
      {
        title: this.discountActionLabel,
        submitLabel: this.discountSubmitLabel,
        autocomplete: 'off'
      },
      this.updateQuoteField
    );
  }

  public onOpenDeleteQuoteDialog(): void {
    this.dialogService.openConfirmationDialog({
      title: 'QUOTE.DELETE.TITLE',
      message: 'QUOTE.DELETE.MESSAGE',
      accept: 'QUOTE.DELETE.ACCEPT',
      decline: 'QUOTE.DELETE.DECLINE'
    }, this.deleteQuote);
  }

  public onCloneQuote() {
    this.store.dispatch(factory =>
      factory.quoteEdit.cloneQuote(this.store.snapshotCloned(state => state.quoteEdit.data))
    );
  }

  public onCreateQuote() {
    this.store.dispatch(factory => factory.quoteEdit.createQuote());
  }

  private enhanceAssetsInProjects(projects: Project[]): Project[] {
    if (!projects) return [];
    const clonedProjects: Project[] = Common.clone(projects);

    return clonedProjects.map((project: Project) => {
      if (project.lineItems) {
        project.lineItems = project.lineItems.map((lineItem: AssetLineItem) => {
          lineItem.asset = enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'quoteEdit');
          return lineItem;
        });
      }
      return project;
    });
  }

  private updateQuoteField = (options: Pojo): void => {
    this.store.dispatch(factory => factory.quoteEdit.updateQuoteField(options));
  }

  private goToNextTab(): void {
    let nextSelectedTabIndex: number = this.selectedTabIndex + 1;
    if (nextSelectedTabIndex >= this.tabLabelKeys.length) return;

    this.tabEnabled[nextSelectedTabIndex] = true;
    this.selectedTabIndex = nextSelectedTabIndex;
    this.detector.markForCheck();
  }

  private goToPreviousTab(): void {
    if (this.selectedTabIndex === 0) return;
    this.selectedTabIndex -= 1;
    this.detector.markForCheck();
  }

  private disableTab(tabIndex: number) {
    this.tabEnabled[tabIndex] = false;
    this.detector.markForCheck();
  }

  private goToTab(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
    this.detector.markForCheck();
  }

  private mergeFormValues(fields: any, property: string): Array<FormFields> {
    return fields.map((item: any) => {
      let value: any = this.store.snapshot(factory => factory.quoteEdit.data);
      item.value = value[property] ? value[property] : '';
      return item;
    });
  }

  private deleteQuote = (): void => {
    this.store.dispatch(factory => factory.quoteEdit.delete());
  }

}
