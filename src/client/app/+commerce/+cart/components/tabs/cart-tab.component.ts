import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, Inject, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material';

import { Tab } from '../../../components/tabs/tab';
import { WzPricingComponent } from '../../../../shared/components/wz-pricing/wz.pricing.component';
import { DefaultComponentOptions } from '../../../../shared/modules/wz-dialog/interfaces/wz.dialog.interface';
import { AssetLineItem, LicenseAgreements, Project } from '../../../../shared/interfaces/commerce.interface';
import { CartService } from '../../../../shared/services/cart.service';
import { WzDialogService } from '../../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { CommerceCapabilities } from '../../../services/commerce.capabilities';
import { UserPreferenceService } from '../../../../shared/services/user-preference.service';
import { WindowRef } from '../../../../shared/services/window-ref.service';
import { Feature } from '../../../../shared/interfaces/feature.interface';
import { LicenseAgreementComponent } from '../../../components/license-agreement/license-agreement.component';
import { Common } from '../../../../shared/utilities/common.functions';
import { Pojo, SelectedPriceAttribute, WzEvent } from '../../../../shared/interfaces/common.interface';
import * as SubclipMarkersInterface from '../../../../shared/interfaces/subclip-markers';
import { WzSubclipEditorComponent } from '../../../../shared/components/wz-subclip-editor/wz.subclip-editor.component';
import { EnhancedAsset } from '../../../../shared/interfaces/enhanced-asset';
import { AppStore } from '../../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'cart-tab-component',
  templateUrl: 'cart-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CartTabComponent extends Tab implements OnDestroy, OnInit {
  public projects: Project[];
  public config: any;
  public pricingPreferences: Pojo;
  public preferencesSubscription: Subscription;
  private projectSubscription: Subscription;

  constructor(
    public userCan: CommerceCapabilities,
    public cartService: CartService,
    public dialogService: WzDialogService,
    public window: WindowRef,
    public userPreference: UserPreferenceService,
    @Inject(DOCUMENT) public document: any,
    private store: AppStore,
    private detector: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.preferencesSubscription = this.userPreference.data.subscribe((data: any) => {
      this.pricingPreferences = data.pricingPreferences;
    });

    this.projectSubscription = this.cartService.projects.subscribe(projects => {
      this.projects = projects;
      this.detector.markForCheck();
    });

    this.config = this.store.snapshotCloned(state => state.uiConfig.components.cart.config);
  }

  public ngOnDestroy() {
    this.projectSubscription.unsubscribe();
    this.preferencesSubscription.unsubscribe();
  }

  public onNotification(message: WzEvent): void {
    switch (message.type) {
      case 'ADD_PROJECT': {
        this.cartService.addProject();
        break;
      }
      case 'REMOVE_PROJECT': {
        this.cartService.removeProject(message.payload);
        break;
      }
      case 'UPDATE_PROJECT': {
        this.updateProject(message.payload);
        break;
      }
      case 'MOVE_LINE_ITEM': {
        this.cartService.moveLineItemTo(message.payload.otherProject, message.payload.lineItem);
        break;
      }
      case 'CLONE_LINE_ITEM': {
        this.cartService.cloneLineItem(message.payload);
        break;
      }
      case 'REMOVE_LINE_ITEM': {
        this.store.dispatch(factory => factory.cart.removeAsset(message.payload.asset));
        break;
      }
      case 'EDIT_LINE_ITEM': {
        this.cartService.editLineItem(message.payload.lineItem, message.payload.fieldToEdit);
        break;
      }
      case 'EDIT_LINE_ITEM_MARKERS': {
        this.editAsset(message.payload);
        break;
      }
      case 'SHOW_PRICING_DIALOG': {
        this.showPricingDialog(message.payload);
        break;
      }
      case 'EDIT_PROJECT_PRICING': {
        this.editProjectPricing(message.payload);
        break;
      }
      case 'ADD_NOTE': {
        this.openNoteDialog(message.payload);
        break;
      }
      case 'REMOVE_NOTE': {
        this.removeNoteFrom(message.payload);
        break;
      }
    };
  }

  public checkout(): void {
    this.goToNextTab();
    this.cartService.getPaymentOptions();
  }

  public shouldShowLicenseDetailsBtn(): boolean {
    return this.userCan.viewLicenseAgreementsButton(this.cartService.hasAssetLineItems);
  }

  public get total(): Observable<number> {
    return this.cartService.total;
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

  public get userCanProceed(): boolean {
    return this.rmAssetsHaveAttributes && !this.cartContainsNoAssets;
  }

  public get rmAssetsHaveAttributes(): boolean {
    if (this.cartService.state.data.itemCount === 0) return true;

    let validAssets: boolean[] = [];

    this.cartService.state.data.projects.forEach((project: Project) => {
      if (project.lineItems) {
        project.lineItems.forEach((lineItem: AssetLineItem) => {
          validAssets.push(lineItem.rightsManaged === 'Rights Managed' ? !!lineItem.attributes : true);
        });
      }
    });
    return validAssets.indexOf(false) === -1;
  }

  public get showTotal(): boolean {
    return this.store.snapshot(factory => factory.cart.data.total > 0);
  }

  public get cartContainsNoAssets(): boolean {
    return (this.cartService.state.data.itemCount === 0) ? true : false;
  }

  public get showUsageWarning(): boolean {
    return !this.cartContainsNoAssets && !this.rmAssetsHaveAttributes;
  }

  private editProjectPricing(project: Project) {
    let preferences: Pojo = project.attributes ? this.mapAttributesToPreferences(project.attributes) : this.pricingPreferences;
    this.store.dispatch(factory => factory.pricing.setPriceForDialog(null));
    this.store.dispatch(factory => factory.pricing.initializePricing(
      'Rights Managed',
      this.projectPricingOptions(preferences, project)
    ));
  }

  private showPricingDialog(lineItem: AssetLineItem): void {
    let preferences: Pojo = lineItem.attributes ? this.mapAttributesToPreferences(lineItem.attributes) : this.pricingPreferences;
    this.store.dispatch(factory => factory.pricing.initializePricing(
      'Rights Managed',
      this.lineitemPricingOptions(preferences, lineItem)
    ));
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

  private applyProjectPricing(event: WzEvent, dialogRef: MatDialogRef<WzPricingComponent>, project: Project) {
    switch (event.type) {
      case 'APPLY_PRICE':
        if (event.payload.updatePrefs) {
          this.userPreference.updatePricingPreferences(event.payload.preferences);
        }
        this.cartService.updateProjectPriceAttributes(event.payload.attributes, project);
        dialogRef.close();
        break;
      case 'ERROR':
        this.store.dispatch(factory => factory.error.handleCustomError(event.payload));
        break;
      default:
        break;
    }
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
        this.cartService.editLineItem(lineItem, { pricingAttributes: event.payload.attributes });
        dialogRef.close();
        break;
      case 'ERROR':
        this.store.dispatch(factory => factory.error.handleCustomError(event.payload));
        break;
      default:
        break;
    }
  }

  private editAsset(lineItem: AssetLineItem) {
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
                  this.cartService.editLineItemMarkers(lineItem, newMarkers);
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
        this.cartService.updateProject(Object.assign(project.project, data));
      }
    );
  }

  private calculatePrice(attributes: Pojo, lineItem: AssetLineItem): void {
    const markers: SubclipMarkersInterface.SubclipMarkers = this.markersFrom(lineItem.asset as EnhancedAsset);
    this.store.dispatch(factory => factory.pricing.calculatePrice(attributes, lineItem.asset.assetId, markers));
  }

  private markersFrom(asset: EnhancedAsset): SubclipMarkersInterface.SubclipMarkers {
    return asset.isSubclipped ? {
      in: asset.inMarkerFrame,
      out: asset.outMarkerFrame
    } : null;
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
      (form) => this.store.dispatch(factory => factory.cart.addNote(form.note, lineItem))
    );
  }

  private removeNoteFrom(lineItem: AssetLineItem): void {
    this.dialogService.openConfirmationDialog({
      title: 'CART.DELETE_NOTES.TITLE',
      message: 'CART.DELETE_NOTES.MESSAGE',
      accept: 'CART.DELETE_NOTES.ACCEPT',
      decline: 'CART.DELETE_NOTES.DECLINE'
    }, () => this.store.dispatch(factory => factory.cart.removeNoteFrom(lineItem)));
  }
}
