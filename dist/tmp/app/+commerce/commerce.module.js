"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shared_module_1 = require("../shared/shared.module");
var commerce_capabilities_1 = require("./services/commerce.capabilities");
var commerce_routes_1 = require("./commerce.routes");
var cart_resolver_1 = require("../+commerce/+cart/services/cart.resolver");
var cart_asset_resolver_1 = require("../+commerce/+cart/services/cart-asset.resolver");
var order_resolver_1 = require("../+commerce/+order/services/order.resolver");
var orders_resolver_1 = require("../+commerce/+order/services/orders.resolver");
var order_asset_resolver_1 = require("../+commerce/+order/services/order-asset.resolver");
var quote_show_resolver_1 = require("../+commerce/+quote/services/quote-show.resolver");
var quote_edit_asset_resolver_1 = require("../+commerce/+quote/services/quote-edit-asset.resolver");
var quote_show_asset_resolver_1 = require("../+commerce/+quote/services/quote-show-asset.resolver");
var quotes_resolver_1 = require("../+commerce/+quote/services/quotes.resolver");
var quote_edit_resolver_1 = require("../+commerce/+quote/services/quote-edit.resolver");
var invoice_resolver_1 = require("./+order/services/invoice.resolver");
var cart_guard_1 = require("./+cart/services/cart.guard");
var quote_edit_guard_1 = require("./+quote/services/quote-edit.guard");
var asset_module_1 = require("../+asset/asset.module");
var cart_component_1 = require("./+cart/cart.component");
var cart_asset_component_1 = require("./+cart/components/cart-asset.component");
var cart_tab_component_1 = require("./+cart/components/tabs/cart-tab.component");
var cart_billing_tab_component_1 = require("./+cart/components/tabs/cart-billing-tab.component");
var cart_payment_tab_component_1 = require("./+cart/components/tabs/cart-payment-tab.component");
var cart_confirm_tab_component_1 = require("./+cart/components/tabs/cart-confirm-tab.component");
var orders_component_1 = require("./+order/+index/orders.component");
var order_show_component_1 = require("./+order/+show/order-show.component");
var order_asset_component_1 = require("./+order/components/order-asset.component");
var invoice_component_1 = require("./+order/components/invoice.component");
var quote_show_component_1 = require("./+quote/+show/quote-show.component");
var quotes_component_1 = require("./+quote/+index/quotes.component");
var administer_quote_component_1 = require("./+quote/components/administer-quote.component");
var quote_purchase_type_component_1 = require("./+quote/components/quote-purchase-type.component");
var quote_edit_asset_component_1 = require("./+quote/components/quote-edit-asset.component");
var quote_show_asset_component_1 = require("./+quote/components/quote-show-asset.component");
var quote_edit_component_1 = require("./+quote/+edit/quote-edit.component");
var quote_info_component_1 = require("./+quote/components/quote-info.component");
var quote_edit_tab_component_1 = require("./+quote/+edit/components/tabs/quote-edit-tab.component");
var quote_edit_recipient_tab_component_1 = require("./+quote/+edit/components/tabs/quote-edit-recipient-tab.component");
var quote_edit_confirm_tab_component_1 = require("./+quote/+edit/components/tabs/quote-edit-confirm-tab.component");
var quote_tab_component_1 = require("./+quote/components/tabs/quote-tab.component");
var quote_billing_tab_component_1 = require("./+quote/components/tabs/quote-billing-tab.component");
var quote_payment_tab_component_1 = require("./+quote/components/tabs/quote-payment-tab.component");
var quote_confirm_tab_component_1 = require("./+quote/components/tabs/quote-confirm-tab.component");
var purchase_order_input_component_1 = require("./components/purchase-order-input/purchase-order-input.component");
var commerce_list_component_1 = require("./components/commerce-list/commerce-list.component");
var commerce_header_component_1 = require("./components/commerce-header/commerce-header.component");
var license_agreement_component_1 = require("./components/license-agreement/license-agreement.component");
var wz_form_autocomplete_view_component_1 = require("./+quote/+edit/components/wz-form-autocomplete-view.component");
var wz_form_picklist_component_1 = require("./+quote/+edit/components/wz-form-picklist.component");
var projects_component_1 = require("./components/project/projects.component");
var project_info_component_1 = require("./components/project/project-info.component");
var project_asset_info_component_1 = require("./components/project/project-asset-info.component");
var project_price_info_component_1 = require("./components/project/project-price-info.component");
var project_actions_component_1 = require("./components/project/project-actions.component");
var line_items_component_1 = require("./components/line-item/line-items.component");
var line_item_transcode_select_component_1 = require("./components/line-item/line-item-transcode-select.component");
var line_item_actions_component_1 = require("./components/line-item/line-item-actions.component");
var line_item_price_component_1 = require("./components/line-item/line-item-price.component");
var fee_line_items_component_1 = require("./components/line-item/fee-line-items.component");
var line_item_rights_component_1 = require("./components/line-item/line-item-rights.component");
var asset_component_1 = require("./components/asset/asset.component");
var asset_thumbnail_component_1 = require("./components/asset/asset-thumbnail.component");
var asset_info_component_1 = require("./components/asset/asset-info.component");
var asset_subclip_display_component_1 = require("./components/asset/asset-subclip-display.component");
var CommerceModule = (function () {
    function CommerceModule() {
    }
    CommerceModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [shared_module_1.SharedModule, asset_module_1.AssetModule, router_1.RouterModule.forChild(commerce_routes_1.COMMERCE_ROUTES)],
                    declarations: [
                        cart_component_1.CartComponent,
                        cart_tab_component_1.CartTabComponent,
                        cart_asset_component_1.CartAssetComponent,
                        cart_billing_tab_component_1.CartBillingTabComponent,
                        cart_payment_tab_component_1.CartPaymentTabComponent,
                        cart_confirm_tab_component_1.CartConfirmTabComponent,
                        projects_component_1.ProjectsComponent,
                        project_info_component_1.ProjectInfoComponent,
                        project_asset_info_component_1.ProjectAssetInfoComponent,
                        project_price_info_component_1.ProjectPriceInfoComponent,
                        project_actions_component_1.ProjectActionsComponent,
                        line_items_component_1.LineItemsComponent,
                        line_item_transcode_select_component_1.LineItemTranscodeSelectComponent,
                        line_item_actions_component_1.LineItemActionsComponent,
                        line_item_price_component_1.LineItemPriceComponent,
                        fee_line_items_component_1.FeeLineItemsComponent,
                        line_item_rights_component_1.LineItemRightsComponent,
                        asset_component_1.AssetComponent,
                        asset_thumbnail_component_1.AssetThumbnailComponent,
                        asset_info_component_1.AssetInfoComponent,
                        asset_subclip_display_component_1.AssetSubclipDisplayComponent,
                        order_show_component_1.OrderShowComponent,
                        orders_component_1.OrdersComponent,
                        order_asset_component_1.OrderAssetComponent,
                        invoice_component_1.InvoiceComponent,
                        purchase_order_input_component_1.PurchaseOrderInputComponent,
                        commerce_list_component_1.CommerceListComponent,
                        commerce_header_component_1.CommerceHeaderComponent,
                        license_agreement_component_1.LicenseAgreementComponent,
                        quote_show_component_1.QuoteShowComponent,
                        quotes_component_1.QuotesComponent,
                        administer_quote_component_1.AdministerQuoteComponent,
                        quote_purchase_type_component_1.QuotePurchaseTypeComponent,
                        quote_edit_component_1.QuoteEditComponent,
                        quote_edit_asset_component_1.QuoteEditAssetComponent,
                        quote_show_asset_component_1.QuoteShowAssetComponent,
                        quote_tab_component_1.QuoteTabComponent,
                        quote_billing_tab_component_1.QuoteBillingTabComponent,
                        quote_payment_tab_component_1.QuotePaymentTabComponent,
                        quote_confirm_tab_component_1.QuoteConfirmTabComponent,
                        quote_edit_tab_component_1.QuoteEditTabComponent,
                        quote_edit_recipient_tab_component_1.QuoteEditRecipientTabComponent,
                        quote_edit_confirm_tab_component_1.QuoteEditConfirmTabComponent,
                        wz_form_autocomplete_view_component_1.WzFormAutoCompleteViewComponent,
                        wz_form_picklist_component_1.WzFormPicklistComponent,
                        quote_info_component_1.QuoteInfoComponent
                    ],
                    exports: [cart_component_1.CartComponent, order_show_component_1.OrderShowComponent, orders_component_1.OrdersComponent],
                    providers: [
                        commerce_capabilities_1.CommerceCapabilities,
                        cart_resolver_1.CartResolver,
                        cart_asset_resolver_1.CartAssetResolver,
                        order_resolver_1.OrderResolver,
                        orders_resolver_1.OrdersResolver,
                        order_asset_resolver_1.OrderAssetResolver,
                        quote_show_resolver_1.QuoteShowResolver,
                        quote_edit_asset_resolver_1.QuoteEditAssetResolver,
                        quotes_resolver_1.QuotesResolver,
                        quote_edit_resolver_1.QuoteEditResolver,
                        cart_guard_1.CartGuard,
                        quote_edit_guard_1.QuoteEditGuard,
                        quote_show_asset_resolver_1.QuoteShowAssetResolver,
                        invoice_resolver_1.InvoiceResolver
                    ],
                    entryComponents: [license_agreement_component_1.LicenseAgreementComponent]
                },] },
    ];
    CommerceModule.ctorParameters = function () { return []; };
    return CommerceModule;
}());
exports.CommerceModule = CommerceModule;
//# sourceMappingURL=commerce.module.js.map