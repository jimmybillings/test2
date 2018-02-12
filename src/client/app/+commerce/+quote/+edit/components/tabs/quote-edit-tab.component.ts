import { DefaultComponentOptions } from '../../../../../shared/modules/wz-dialog/interfaces/wz.dialog.interface';
import { Common } from '../../../../../shared/utilities/common.functions';
import { enhanceAsset, EnhancedAsset } from '../../../../../shared/interfaces/enhanced-asset';
import { WzPricingComponent } from '../../../../../shared/components/wz-pricing/wz.pricing.component';
import { WzSubclipEditorComponent } from '../../../../../shared/components/wz-subclip-editor/wz.subclip-editor.component';
import { Tab } from '../../../../components/tabs/tab';
import { Component, Inject, ChangeDetectionStrategy, OnDestroy, OnInit, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WzDialogService } from '../../../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { Capabilities } from '../../../../../shared/services/capabilities.service';
import { UserPreferenceService } from '../../../../../shared/services/user-preference.service';
import { WindowRef } from '../../../../../shared/services/window-ref.service';
import {
  AssetLineItem, PurchaseType, PriceAttribute, Project, quotesWithoutPricing, quotesAllowedToHaveFeesOnly
} from '../../../../../shared/interfaces/commerce.interface';
import { Pojo, SelectedPriceAttribute, WzEvent } from '../../../../../shared/interfaces/common.interface';
import { FormFields, MdSelectOption } from '../../../../../shared/interfaces/forms.interface';
import { AppStore } from '../../../../../app.store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as SubclipMarkersInterface from '../../../../../shared/interfaces/subclip-markers';
import { MatDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'quote-edit-tab-component',
  templateUrl: 'quote-edit-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteEditTabComponent extends Tab implements OnInit, OnDestroy {
  public config: Pojo;
  public pricingPreferences: Pojo;
  public priceAttributes: Array<PriceAttribute> = null;
  @Input() projects: Project[];
  private preferencesSubscription: Subscription;

  constructor(
    public userCan: Capabilities,
    public dialogService: WzDialogService,
    public window: WindowRef,
    public userPreference: UserPreferenceService,
    @Inject(DOCUMENT) public document: any,
    protected store: AppStore,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.preferencesSubscription = this.userPreference.data.subscribe((data: any) => {
      this.pricingPreferences = data.pricingPreferences;
    });
    this.config = this.store.snapshotCloned(state => state.uiConfig.components.cart.config);
  }

  ngOnDestroy() {
    this.preferencesSubscription.unsubscribe();
  }

  public onNotification(message: WzEvent): void {
    switch (message.type) {

      case 'ADD_QUOTE_FEE':
        this.store.dispatch(factory => factory.quoteEdit.addFeeTo(
          message.payload.project,
          message.payload.fee
        ));
        break;

      case 'REMOVE_QUOTE_FEE':
        this.store.dispatch(factory =>
          factory.quoteEdit.removeFee(message.payload)
        );
        break;

      case 'SHOW_COST_MULTIPLIER_DIALOG':
        this.openCostMultiplierDialog(message.payload);
        break;

      case 'REMOVE_COST_MULTIPLIER':
        this.store.dispatch(factory =>
          factory.quoteEdit.editLineItem(message.payload, { multiplier: 1 })
        );
        break;

      case 'OPEN_BULK_IMPORT_DIALOG':
        this.onOpenBulkImportDialog(message.payload);
        break;

      case 'ADD_CUSTOM_PRICE':
        this.onAddCustomPriceTo(message.payload);
        break;

      case 'OPEN_DELETE_DIALOG':
      case 'SAVE_AND_NEW':
      case 'CLONE_QUOTE':
        this.notify.emit(message);
        break;

      case 'ADD_PROJECT':
        this.store.dispatch(factory => factory.quoteEdit.addProject());
        break;

      case 'REMOVE_PROJECT':
        this.store.dispatch(factory => factory.quoteEdit.removeProject(message.payload.id));
        break;

      case 'UPDATE_PROJECT':
        this.updateProject(message.payload);
        break;

      case 'MOVE_LINE_ITEM':
        this.store.dispatch(factory =>
          factory.quoteEdit.moveLineItem(message.payload.otherProject, message.payload.lineItem)
        );
        break;

      case 'CLONE_LINE_ITEM':
        this.store.dispatch(factory => factory.quoteEdit.cloneLineItem(message.payload));
        break;

      case 'REMOVE_LINE_ITEM':
        this.store.dispatch(factory => factory.quoteEdit.removeAsset(message.payload.asset));
        break;

      case 'EDIT_LINE_ITEM':
        this.store.dispatch(factory =>
          factory.quoteEdit.editLineItem(message.payload.lineItem, message.payload.fieldToEdit)
        );
        break;

      case 'EDIT_LINE_ITEM_MARKERS':
        this.editLineItemMarkers(message.payload);
        break;

      case 'SHOW_PRICING_DIALOG':
        this.showPricingDialog(message.payload);
        break;

      case 'EDIT_PROJECT_PRICING':
        this.editProjectPricing(message.payload);
        break;

      case 'ADD_NOTE':
        this.openNoteDialog(message.payload);
        break;

      case 'REMOVE_NOTE':
        this.removeNoteFrom(message.payload);
        break;

      case 'GO_TO_NEXT_TAB':
        this.goToNextTab();
        break;
    };
  }

  public get quoteType(): PurchaseType {
    return this.store.snapshot(state => state.quoteEdit.data.purchaseType);
  }

  public get showUsageWarning(): boolean {
    return !quotesWithoutPricing.includes(this.quoteType) && (this.quoteContainsAssets && !this.rmAssetsHaveRightsPackage);
  }

  public get userCanProceed(): boolean {
    if (this.quoteOnlyHasFeeItems) return quotesAllowedToHaveFeesOnly.includes(this.quoteType);
    if (quotesWithoutPricing.includes(this.quoteType)) return this.quoteHasItems;
    return this.quoteHasItems && this.rmAssetsHaveRightsPackage;
  }

  public get quoteHasItems(): boolean {
    return this.store.snapshot(state => state.quoteEdit.data.projects || [])
      .every((project: Project) => {
        return (project.hasOwnProperty('lineItems') && project.lineItems.length > 0) ||
          (project.hasOwnProperty('feeLineItems') && project.feeLineItems.length > 0);
      });
  }

  public get quoteContainsAssets(): boolean {
    return this.store.snapshot(state => state.quoteEdit.data.projects || [])
      .every((project: Project) => project.hasOwnProperty('lineItems'));
  }

  public get total(): Observable<number> {
    return this.store.select(state => state.quoteEdit.data.total);
  }

  public get subTotal(): Observable<number> {
    return this.store.select(state => state.quoteEdit.data.subTotal);
  }

  public get discount(): Observable<number> {
    return this.store.select(state => state.quoteEdit.data.discount);
  }

  public get showTotal(): boolean {
    return this.store.snapshot(factory => factory.quoteEdit.data.total > 0) &&
      !quotesWithoutPricing.includes(this.quoteType);
  }

  public get showDiscount(): boolean {
    return this.store.snapshot(factory => factory.quoteEdit.data.discount > 0) &&
      !quotesWithoutPricing.includes(this.quoteType);
  }

  public get shouldShowCloneButton(): Observable<boolean> {
    return this.userCan.cloneQuote(this.store.select(state => state.quoteEdit));
  }

  public get purchaseTypeConfig(): MdSelectOption[] {
    return this.config.quotePurchaseType.items;
  }

  public onSelectQuoteType(event: { purchaseType: PurchaseType }): void {
    this.store.dispatch(factory => factory.quoteEdit.updateQuoteField(event));
  }

  public get rmAssetsHaveRightsPackage(): boolean {
    return this.store.snapshot(state => state.quoteEdit.data.projects || [])
      .every((project: Project) => (project.lineItems || []).every((lineItem: Pojo) =>
        lineItem.rightsManaged !== 'Rights Managed' || lineItem.hasOwnProperty('attributes')
      ));
  }

  private get quoteOnlyHasFeeItems(): boolean {
    return this.store.snapshot(state => state.quoteEdit.data.projects || [])
      .every((project: Project) =>
        project.hasOwnProperty('feeLineItems') && !project.hasOwnProperty('lineItems')
      );
  }

  private onOpenBulkImportDialog(projectId: string): void {
    this.dialogService.openFormDialog(
      this.config.bulkImport.items,
      { title: 'QUOTE.BULK_IMPORT.TITLE', submitLabel: 'QUOTE.BULK_IMPORT.SUBMIT_BTN', autocomplete: 'off' },
      (rawAssets: { lineItemAttributes: string }) => {
        this.store.dispatch(factory => factory.quoteEdit.bulkImport(rawAssets, projectId));
      }
    );
  }

  private onAddCustomPriceTo(lineItem: AssetLineItem): void {
    let formFields: any = [
      {
        name: 'price',
        label: 'QUOTE.PRICE_LABEL',
        type: 'number',
        min: '0',
        validation: 'GREATER_THAN',
        value: (lineItem.price > 0) ? lineItem.price : null
      }, {
        name: 'priceLock',
        label: 'QUOTE.PRICE_LOCK_LABEL',
        type: 'slideToggle',
        value: (!!lineItem.overrideGrossAssetPrice) ? 'true' : ''
      }];
    this.dialogService.openFormDialog(
      formFields,
      { title: 'QUOTE.ADD_CUSTOM_PRICE_TITLE', submitLabel: 'QUOTE.ADD_CUSTOM_PRICE_SUBMIT', autocomplete: 'off' },
      (form: { price: number, priceLock: string }) => {
        this.store.dispatch(factory => factory.quoteEdit.addCustomPriceToLineItem(lineItem, form.price, Boolean(form.priceLock)));
      });
  }

  private updateProject(project: Project) {
    this.dialogService.openFormDialog(
      project.items,
      {
        dialogConfig: { position: { top: '10%' }, disableClose: false },
        title: 'CART.PROJECTS.FORM.TITLE',
        submitLabel: 'CART.PROJECTS.FORM.SUBMIT_LABEL',
        autocomplete: 'off'
      },
      (data: any) => {
        this.store.dispatch(factory => factory.quoteEdit.updateProject(Object.assign(project.project, data)));
      }
    );
  }

  private editLineItemMarkers(lineItem: AssetLineItem) {
    this.store.callLegacyServiceMethod(service => service.asset.getClipPreviewData(lineItem.asset.assetId))
      .subscribe(data => {
        this.document.body.classList.add('subclipping-edit-open');
        lineItem.asset.clipUrl = data.url;
        this.dialogService.openComponentInDialog(
          {
            componentType: WzSubclipEditorComponent,
            dialogConfig: { width: '530px', position: { top: '14%' } },
            inputOptions: {
              window: this.window.nativeWindow,
              enhancedAsset: lineItem.asset,
              usagePrice: null
            },
            outputOptions: [
              {
                event: 'cancel',
                callback: (event: any) => { return true; },
                closeOnEvent: true
              },
              {
                event: 'save',
                callback: (newMarkers: SubclipMarkersInterface.SubclipMarkers) => {
                  this.store.dispatch(factory =>
                    factory.quoteEdit.editLineItemMarkers(lineItem, newMarkers)
                  );
                },
                closeOnEvent: true
              }
            ]
          }
        ).subscribe(() => {
          this.document.body.classList.remove('subclipping-edit-open');
        });
      });
  }

  private editProjectPricing(project: Project) {
    let preferences: Pojo = project.attributes ? this.mapAttributesToPreferences(project.attributes) : this.pricingPreferences;
    this.store.dispatch(factory => factory.pricing.setPriceForDialog(null));
    this.store.dispatch(factory => factory.pricing.initializePricing(
      'Rights Managed',
      this.projectPricingOptions(preferences, project)
    ));
  }

  private projectPricingOptions(preferences: Pojo, project: Project): DefaultComponentOptions {
    return {
      componentType: WzPricingComponent,
      inputOptions: {
        pricingPreferences: preferences,
        userCanCustomizeRights: this.userCan.administerQuotes()
      },
      outputOptions: [
        {
          event: 'pricingEvent',
          callback: (event: WzEvent, dialogRef: any) => {
            this.applyProjectPricing(event, dialogRef, project);
          }
        }
      ]
    };
  }

  private showPricingDialog(lineItem: AssetLineItem): void {
    let preferences: Pojo = lineItem.attributes ? this.mapAttributesToPreferences(lineItem.attributes) : this.pricingPreferences;
    this.store.dispatch(factory => factory.pricing.initializePricing(
      'Rights Managed',
      this.lineitemPricingOptions(preferences, lineItem)
    ));
  }

  private lineitemPricingOptions(preferences: Pojo, lineItem: AssetLineItem): DefaultComponentOptions {
    return {
      componentType: WzPricingComponent,
      inputOptions: {
        pricingPreferences: preferences,
        userCanCustomizeRights: this.userCan.administerQuotes()
      },
      outputOptions: [
        {
          event: 'pricingEvent',
          callback: (event: WzEvent, dialogRef: any) => {
            this.applyPricing(event, dialogRef, lineItem);
          }
        }
      ]
    };
  }

  private openProjectPricingDialog(priceAttributes: Array<PriceAttribute>, preferences: Pojo, project: Project): void {
    this.dialogService.openComponentInDialog(
      {
        componentType: WzPricingComponent,
        inputOptions: {
          attributes: priceAttributes,
          pricingPreferences: preferences,
          usagePrice: null
        },
        outputOptions: [
          {
            event: 'pricingEvent',
            callback: (event: WzEvent, dialogRef: any) => {
              this.applyProjectPricing(event, dialogRef, project);
            }
          }
        ]
      }
    );
  }

  private applyProjectPricing(event: WzEvent, dialogRef: MatDialogRef<WzPricingComponent>, project: Project) {
    switch (event.type) {
      case 'APPLY_PRICE':
        this.store.dispatch(factory =>
          factory.quoteEdit.updateProjectPriceAttributes(event.payload.attributes, project)
        );
        if (event.payload.updatePrefs) {
          this.userPreference.updatePricingPreferences(event.payload.preferences);
        }
        dialogRef.close();
        break;
      case 'ERROR':
        this.store.dispatch(factory => factory.error.handleCustomError(event.payload));
        break;
      default:
        break;
    }
  }


  private applyPricing(event: WzEvent, dialogRef: MatDialogRef<WzPricingComponent>, lineItem: AssetLineItem) {
    switch (event.type) {
      case 'CALCULATE_PRICE':
        this.store.dispatch(factory => factory.pricing.calculatePrice(
          event.payload,
          lineItem.asset.assetId,
          this.markersFrom(lineItem.asset as EnhancedAsset)
        ));
        break;
      case 'APPLY_PRICE':
        if (event.payload.updatePrefs) {
          this.userPreference.updatePricingPreferences(event.payload.preferences);
        }
        this.store.dispatch(factory => factory.quoteEdit.editLineItem(lineItem, { pricingAttributes: event.payload.attributes }));
        dialogRef.close();
        break;
      case 'ERROR':
        this.store.dispatch(factory => factory.error.handleCustomError(event.payload));
        break;
      default:
        break;
    }
  }


  private mapAttributesToPreferences(attributes: any): Pojo {
    if (Array.isArray(attributes)) {
      // if the attributes came from a lineItem, they are an Array of SelectedPriceAttributes
      // we need to map them to a Pojo to pass on to the pricing component
      let mapped: any = {};
      attributes.forEach((attr: SelectedPriceAttribute) => {
        mapped[attr.priceAttributeName] = attr.selectedAttributeValue;
      });
      delete mapped['siteName'];
      return mapped;
    } else {
      // if the attributes came from a project, they are a Pojo.
      // we do not need to map them before passing them to the pricing component
      delete attributes['siteName'];
      return attributes;
    }
  }

  private openCostMultiplierDialog(lineItem: AssetLineItem): void {
    this.dialogService.openFormDialog(
      this.costMultiplierFormItems(lineItem),
      { title: this.costMultiplierFormTitle(lineItem), submitLabel: this.costMultiplierFormSubmitLabel(lineItem) },
      (result: { multiplier: string }): void => {
        this.store.dispatch(factory => factory.quoteEdit.editLineItem(lineItem, result));
      });
  }

  private costMultiplierFormItems(lineItem: AssetLineItem): Array<FormFields> {
    return lineItem.multiplier > 1 ?
      [Object.assign({}, this.config.addCostMultiplier.items[0], { value: lineItem.multiplier })] :
      this.config.addCostMultiplier.items;
  }

  private costMultiplierFormTitle(lineItem: AssetLineItem): string {
    return lineItem.multiplier > 1 ? 'QUOTE.EDIT_MULTIPLIER_TITLE' : 'QUOTE.ADD_MULTIPLIER_TITLE';
  }

  private costMultiplierFormSubmitLabel(lineItem: AssetLineItem): string {
    return lineItem.multiplier > 1 ? 'QUOTE.EDIT_MULTIPLIER_FORM_SUBMIT' : 'QUOTE.ADD_MULTIPLIER_FORM_SUBMIT';
  }

  private markersFrom(asset: EnhancedAsset): SubclipMarkersInterface.SubclipMarkers {
    return asset.isSubclipped ? {
      in: asset.inMarkerFrame,
      out: asset.outMarkerFrame
    } : null;
  }

  private calculatePrice(attributes: Pojo, lineItem: AssetLineItem): void {
    const markers: SubclipMarkersInterface.SubclipMarkers = this.markersFrom(lineItem.asset as EnhancedAsset);
    this.store.dispatch(factory => factory.pricing.calculatePrice(attributes, lineItem.asset.assetId, markers));
  }

  private openNoteDialog(lineItem: AssetLineItem): void {
    const hasNote: boolean = lineItem.hasOwnProperty('notes') &&
      lineItem.notes.length > 0 &&
      lineItem.notes[0].hasOwnProperty('notes') &&
      lineItem.notes[0].notes.length > 0;

    const title: string = hasNote ? 'QUOTE.EDIT_NOTE' : 'QUOTE.ADD_NOTE';
    const label: string = hasNote ? 'QUOTE.EDIT_NOTE' : 'QUOTE.ADD_NOTE';
    const value: string = hasNote ? lineItem.notes[0].notes[0] : '';

    this.dialogService.openFormDialog(
      [{ name: 'note', type: 'textarea', validation: 'REQUIRED', label, value }],
      { title },
      (form) => this.store.dispatch(factory => factory.quoteEdit.addNote(form.note, lineItem))
    );
  }

  private removeNoteFrom(lineItem: AssetLineItem): void {
    this.dialogService.openConfirmationDialog({
      title: 'QUOTE.DELETE_NOTES.TITLE',
      message: 'QUOTE.DELETE_NOTES.MESSAGE',
      accept: 'QUOTE.DELETE_NOTES.ACCEPT',
      decline: 'QUOTE.DELETE_NOTES.DECLINE'
    }, () => this.store.dispatch(factory => factory.quoteEdit.removeNoteFrom(lineItem)));
  }
}
