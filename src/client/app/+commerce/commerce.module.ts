import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CommerceCapabilities } from './services/commerce.capabilities';
import { COMMERCE_ROUTES } from './commerce.routes';
import { CartResolver } from '../+commerce/+cart/services/cart.resolver';
import { CartAssetResolver } from '../+commerce/+cart/services/cart-asset.resolver';
import { OrderResolver } from '../+commerce/+order/services/order.resolver';
import { OrdersResolver } from '../+commerce/+order/services/orders.resolver';
import { OrderAssetResolver } from '../+commerce/+order/services/order-asset.resolver';
import { QuoteShowResolver } from '../+commerce/+quote/services/quote-show.resolver';
import { QuoteEditAssetResolver } from '../+commerce/+quote/services/quote-edit-asset.resolver';
import { QuoteShowAssetResolver } from '../+commerce/+quote/services/quote-show-asset.resolver';
import { QuotesResolver } from '../+commerce/+quote/services/quotes.resolver';
import { QuoteEditResolver } from '../+commerce/+quote/services/quote-edit.resolver';
import { InvoiceResolver } from './+order/services/invoice.resolver';
import { CartGuard } from './+cart/services/cart.guard';
import { QuoteEditGuard } from './+quote/services/quote-edit.guard';
import { AssetModule } from '../+asset/asset.module';

// Cart Stuff
import { CartComponent } from './+cart/cart.component';
import { CartAssetComponent } from './+cart/components/cart-asset.component';

// tabs
import { CartTabComponent } from './+cart/components/tabs/cart-tab.component';
import { CartBillingTabComponent } from './+cart/components/tabs/cart-billing-tab.component';
import { CartPaymentTabComponent } from './+cart/components/tabs/cart-payment-tab.component';
import { CartConfirmTabComponent } from './+cart/components/tabs/cart-confirm-tab.component';

// Order Stuff
import { OrdersComponent } from './+order/+index/orders.component';
import { OrderShowComponent } from './+order/+show/order-show.component';
import { OrderAssetComponent } from './+order/components/order-asset.component';

import { InvoiceComponent } from './+order/components/invoice.component';

// Quote Stuff
import { QuoteShowComponent } from './+quote/+show/quote-show.component';
import { QuotesComponent } from './+quote/+index/quotes.component';
import { AdministerQuoteComponent } from './+quote/components/administer-quote.component';
import { QuotePurchaseTypeComponent } from './+quote/components/quote-purchase-type.component';
import { QuoteEditAssetComponent } from './+quote/components/quote-edit-asset.component';
import { QuoteShowAssetComponent } from './+quote/components/quote-show-asset.component';
import { QuoteEditComponent } from './+quote/+edit/quote-edit.component';
import { QuoteInfoComponent } from './+quote/components/quote-info.component';

// Quote Edit Tabs
import { QuoteEditTabComponent } from './+quote/+edit/components/tabs/quote-edit-tab.component';
import { QuoteEditRecipientTabComponent } from './+quote/+edit/components/tabs/quote-edit-recipient-tab.component';
import { QuoteEditConfirmTabComponent } from './+quote/+edit/components/tabs/quote-edit-confirm-tab.component';

// tabs
import { QuoteTabComponent } from './+quote/components/tabs/quote-tab.component';
import { QuoteBillingTabComponent } from './+quote/components/tabs/quote-billing-tab.component';
import { QuotePaymentTabComponent } from './+quote/components/tabs/quote-payment-tab.component';
import { QuoteConfirmTabComponent } from './+quote/components/tabs/quote-confirm-tab.component';

// SHARED STUFF
import { PurchaseOrderInputComponent } from './components/purchase-order-input/purchase-order-input.component';
import { CommerceListComponent } from './components/commerce-list/commerce-list.component';
import { CommerceHeaderComponent } from './components/commerce-header/commerce-header.component';
import { LicenseAgreementComponent } from './components/license-agreement/license-agreement.component';
import { WzFormAutoCompleteViewComponent } from './+quote/+edit/components/wz-form-autocomplete-view.component';
import { WzFormPicklistComponent } from './+quote/+edit/components/wz-form-picklist.component';

// project
import { ProjectsComponent } from './components/project/projects.component';
import { ProjectInfoComponent } from './components/project/project-info.component';
import { ProjectAssetInfoComponent } from './components/project/project-asset-info.component';
import { ProjectPriceInfoComponent } from './components/project/project-price-info.component';
import { ProjectActionsComponent } from './components/project/project-actions.component';

// lineitem
import { LineItemsComponent } from './components/line-item/line-items.component';
import { LineItemTranscodeSelectComponent } from './components/line-item/line-item-transcode-select.component';
import { LineItemActionsComponent } from './components/line-item/line-item-actions.component';
import { LineItemPriceComponent } from './components/line-item/line-item-price.component';
import { FeeLineItemsComponent } from './components/line-item/fee-line-items.component';
import { LineItemRightsComponent } from './components/line-item/line-item-rights.component';

// asset
import { AssetComponent } from './components/asset/asset.component';
import { AssetThumbnailComponent } from './components/asset/asset-thumbnail.component';
import { AssetInfoComponent } from './components/asset/asset-info.component';
import { AssetSubclipDisplayComponent } from './components/asset/asset-subclip-display.component';

@NgModule({
  imports: [SharedModule, AssetModule, RouterModule.forChild(COMMERCE_ROUTES)],
  declarations: [
    CartComponent,
    CartTabComponent,
    CartAssetComponent,
    CartBillingTabComponent,
    CartPaymentTabComponent,
    CartConfirmTabComponent,
    ProjectsComponent,
    ProjectInfoComponent,
    ProjectAssetInfoComponent,
    ProjectPriceInfoComponent,
    ProjectActionsComponent,
    LineItemsComponent,
    LineItemTranscodeSelectComponent,
    LineItemActionsComponent,
    LineItemPriceComponent,
    FeeLineItemsComponent,
    LineItemRightsComponent,
    AssetComponent,
    AssetThumbnailComponent,
    AssetInfoComponent,
    AssetSubclipDisplayComponent,
    OrderShowComponent,
    OrdersComponent,
    OrderAssetComponent,
    InvoiceComponent,
    PurchaseOrderInputComponent,
    CommerceListComponent,
    CommerceHeaderComponent,
    LicenseAgreementComponent,
    QuoteShowComponent,
    QuotesComponent,
    AdministerQuoteComponent,
    QuotePurchaseTypeComponent,
    QuoteEditComponent,
    QuoteEditAssetComponent,
    QuoteShowAssetComponent,
    QuoteTabComponent,
    QuoteBillingTabComponent,
    QuotePaymentTabComponent,
    QuoteConfirmTabComponent,
    QuoteEditTabComponent,
    QuoteEditRecipientTabComponent,
    QuoteEditConfirmTabComponent,
    WzFormAutoCompleteViewComponent,
    WzFormPicklistComponent,
    QuoteInfoComponent
  ],
  exports: [CartComponent, OrderShowComponent, OrdersComponent],
  providers: [
    CommerceCapabilities,
    CartResolver,
    CartAssetResolver,
    OrderResolver,
    OrdersResolver,
    OrderAssetResolver,
    QuoteShowResolver,
    QuoteEditAssetResolver,
    QuotesResolver,
    QuoteEditResolver,
    CartGuard,
    QuoteEditGuard,
    QuoteShowAssetResolver,
    InvoiceResolver
  ],
  entryComponents: [LicenseAgreementComponent]
})

export class CommerceModule { }
