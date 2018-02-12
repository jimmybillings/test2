"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var wz_design_module_1 = require("./modules/wz-design/wz.design.module");
var store_1 = require("@ngrx/store");
var store_devtools_1 = require("@ngrx/store-devtools");
var effects_1 = require("@ngrx/effects");
var wz_player_module_1 = require("./modules/wz-player/wz.player.module");
var wz_form_module_1 = require("./modules/wz-form/wz-form.module");
var wz_asset_module_1 = require("./modules/wz-asset/wz-asset.module");
var wz_dialog_module_1 = require("./modules/wz-dialog/wz.dialog.module");
var wz_breadcrumb_component_1 = require("./components/wz-breadcrumb/wz.breadcrumb.component");
var wz_pagination_component_1 = require("./components/wz-pagination/wz.pagination.component");
var wz_clipboard_directive_1 = require("./components/wz-clipboard/wz-clipboard.directive");
var collections_sort_dd_component_1 = require("../+collection/components/collections-sort-dd.component");
var collections_filter_dd_component_1 = require("../+collection/components/collections-filter-dd.component");
var wz_item_search_form_component_1 = require("./components/wz-item-search-form/wz.item-search-form.component");
var collection_form_component_1 = require("../application/collection-tray/components/collection-form.component");
var wz_sort_component_1 = require("./components/wz-sort/wz.sort.component");
var collection_link_component_1 = require("../+collection/components/collection-link.component");
var wz_terms_component_1 = require("./components/wz-terms/wz.terms.component");
var wz_pricing_component_1 = require("./components/wz-pricing/wz.pricing.component");
var wz_coming_soon_component_1 = require("./components/wz-coming-soon/wz-coming-soon.component");
var wz_subclip_editor_component_1 = require("./components/wz-subclip-editor/wz.subclip-editor.component");
var wz_gallery_two_level_component_1 = require("./components/wz-gallery-two-level/wz.gallery-two-level.component");
var wz_gallery_breadcrumb_component_1 = require("./components/wz-gallery-breadcrumb/wz.gallery-breadcrumb.component");
var wz_site_changer_component_1 = require("./components/wz-site-changer/wz-site-changer.component");
var wz_comment_component_1 = require("./components/wz-comment/wz.comment.component");
var wz_share_component_1 = require("./components/wz-share/wz.share.component");
var wz_share_link_component_1 = require("./components/wz-share-link/wz.share-link.component");
var api_config_1 = require("./services/api.config");
var core_3 = require("@ngx-translate/core");
var current_user_service_1 = require("./services/current-user.service");
var user_service_1 = require("./services/user.service");
var search_context_service_1 = require("./services/search-context.service");
var collections_service_1 = require("./services/collections.service");
var user_preference_service_1 = require("./services/user-preference.service");
var api_service_1 = require("./services/api.service");
var sort_definitions_service_1 = require("./services/sort-definitions.service");
var filter_service_1 = require("./services/filter.service");
var authentication_data_service_1 = require("./services/authentication.data.service");
var pendo_service_1 = require("./services/pendo.service");
var cart_service_1 = require("./services/cart.service");
var orders_service_1 = require("./services/orders.service");
var collection_context_service_1 = require("./services/collection-context.service");
var gallery_view_service_1 = require("./services/gallery-view.service");
var window_ref_service_1 = require("./services/window-ref.service");
var quote_service_1 = require("./services/quote.service");
var quotes_service_1 = require("./services/quotes.service");
var aspera_service_1 = require("./services/aspera.service");
var account_service_1 = require("../store/account/account.service");
var active_collection_service_1 = require("../store/active-collection/active-collection.service");
var activity_service_1 = require("../store/activity/activity.service");
var asset_service_1 = require("../store/asset/asset.service");
var comment_service_1 = require("../store/comment/comment.service");
var collections_service_2 = require("../store/collections/collections.service");
var delivery_options_service_1 = require("../store/delivery-options/delivery-options.service");
var fee_config_service_1 = require("../store/fee-config/fee-config.service");
var api_service_2 = require("../store/api/api.service");
var cart_service_2 = require("../store/cart/cart.service");
var quote_edit_service_1 = require("../store/quote-edit/quote-edit.service");
var quote_show_service_1 = require("../store/quote-show/quote-show.service");
var user_service_2 = require("../store/user/user.service");
var order_service_1 = require("../store/order/order.service");
var invoice_service_1 = require("../store/invoice/invoice.service");
var page_data_service_1 = require("../store/page-data/page-data.service");
var pricing_service_1 = require("../store/pricing/pricing.service");
var privacy_policy_service_1 = require("../store/privacy-policy/privacy-policy.service");
var search_service_1 = require("../store/search/search.service");
var sharing_service_1 = require("../store/sharing/sharing.service");
var snackbar_service_1 = require("../store/snackbar/snackbar.service");
var speed_preview_service_1 = require("../store/speed-preview/speed-preview.service");
var ui_config_service_1 = require("../store/ui-config/ui-config.service");
var app_store_1 = require("../app.store");
var ActiveCollectionState = require("../store/active-collection/active-collection.state");
var AssetState = require("../store/asset/asset.state");
var CartState = require("../store/cart/cart.state");
var CheckoutState = require("../store/checkout/checkout.state");
var CommentState = require("../store/comment/comment.state");
var DeliveryOptionState = require("../store/delivery-options/delivery-options.state");
var FeeConfigState = require("../store/fee-config/fee-config.state");
var HeaderDisplayOptions = require("../store/header-display-options/header-display-options.state");
var InvoiceState = require("../store/invoice/invoice.state");
var LoadingIndicatorState = require("../store/loading-indicator/loading-indicator.state");
var MultiLingualState = require("../store/multi-lingual/multi-lingual.state");
var OrderState = require("../store/order/order.state");
var PricingState = require("../store/pricing/pricing.state");
var PrivacyPolicyState = require("../store/privacy-policy/privacy-policy.state");
var QuoteEditState = require("../store/quote-edit/quote-edit.state");
var QuoteShowState = require("../store/quote-show/quote-show.state");
var SearchState = require("../store/search/search.state");
var SharingState = require("../store/sharing/sharing.state");
var SnackbarState = require("../store/snackbar/snackbar.state");
var SpeedPreviewState = require("../store/speed-preview/speed-preview.state");
var UiConfigState = require("../store/ui-config/ui-config.state");
var collections_store_1 = require("./stores/collections.store");
var orders_store_1 = require("./stores/orders.store");
var feature_store_1 = require("./stores/feature.store");
var gallery_view_store_1 = require("./stores/gallery-view.store");
var quotes_store_1 = require("./stores/quotes.store");
var current_user_service_2 = require("./services/current-user.service");
var capabilities_service_1 = require("./services/capabilities.service");
var search_context_service_2 = require("./services/search-context.service");
var filter_service_2 = require("./services/filter.service");
var user_preference_service_2 = require("./services/user-preference.service");
var collection_context_service_2 = require("./services/collection-context.service");
var sort_definitions_service_2 = require("./services/sort-definitions.service");
var account_effects_1 = require("../store/account/account.effects");
var active_collection_effects_1 = require("../store/active-collection/active-collection.effects");
var activity_effects_1 = require("../store/activity/activity.effects");
var asset_effects_1 = require("../store/asset/asset.effects");
var cart_effects_1 = require("../store/cart/cart.effects");
var comment_effects_1 = require("../store/comment/comment.effects");
var collections_effects_1 = require("../store/collections/collections.effects");
var delivery_options_effects_1 = require("../store/delivery-options/delivery-options.effects");
var dialog_effects_1 = require("../store/dialog/dialog.effects");
var error_effects_1 = require("../store/error/error.effects");
var fee_config_effects_1 = require("../store/fee-config/fee-config.effects");
var header_display_options_effects_1 = require("../store/header-display-options/header-display-options.effects");
var invoice_effects_1 = require("../store/invoice/invoice.effects");
var multi_lingual_effects_1 = require("../store/multi-lingual/multi-lingual.effects");
var notifier_effects_1 = require("../store/notifier/notifier.effects");
var order_effects_1 = require("../store/order/order.effects");
var page_data_effects_1 = require("../store/page-data/page-data.effects");
var pricing_effects_1 = require("../store/pricing/pricing.effects");
var privacy_policy_effects_1 = require("../store/privacy-policy/privacy-policy.effects");
var quote_edit_effects_1 = require("../store/quote-edit/quote-edit.effects");
var quote_show_effects_1 = require("../store/quote-show/quote-show.effects");
var router_effects_1 = require("../store/router/router.effects");
var search_effects_1 = require("../store/search/search.effects");
var sharing_effects_1 = require("../store/sharing/sharing.effects");
var snackbar_effects_1 = require("../store/snackbar/snackbar.effects");
var speed_preview_effects_1 = require("../store/speed-preview/speed-preview.effects");
var ui_config_effects_1 = require("../store/ui-config/ui-config.effects");
var user_effects_1 = require("../store/user/user.effects");
var WAZEE_SERVICES = [
    account_service_1.AccountService,
    activity_service_1.ActivityService,
    api_config_1.ApiConfig,
    current_user_service_1.CurrentUserService,
    asset_service_1.AssetService,
    collections_service_1.CollectionsService,
    collections_service_2.FutureCollectionsService,
    active_collection_service_1.ActiveCollectionService,
    search_context_service_1.SearchContext,
    user_preference_service_1.UserPreferenceService,
    collection_context_service_1.CollectionContextService,
    api_service_1.ApiService,
    api_service_2.FutureApiService,
    sort_definitions_service_1.SortDefinitionsService,
    capabilities_service_1.Capabilities,
    filter_service_1.FilterService,
    authentication_data_service_1.Authentication,
    pendo_service_1.PendoService,
    cart_service_1.CartService,
    user_service_1.UserService,
    order_service_1.OrderService,
    invoice_service_1.InvoiceService,
    orders_service_1.OrdersService,
    core_3.TranslateService,
    gallery_view_service_1.GalleryViewService,
    window_ref_service_1.WindowRef,
    quote_edit_service_1.FutureQuoteEditService,
    quote_show_service_1.FutureQuoteShowService,
    quote_service_1.QuoteService,
    quotes_service_1.QuotesService,
    search_service_1.SearchService,
    sharing_service_1.SharingService,
    snackbar_service_1.SnackbarService,
    comment_service_1.CommentService,
    delivery_options_service_1.DeliveryOptionsService,
    cart_service_2.FutureCartService,
    speed_preview_service_1.SpeedPreviewService,
    ui_config_service_1.UiConfigService,
    pricing_service_1.PricingService,
    aspera_service_1.AsperaService,
    fee_config_service_1.FeeConfigService,
    user_service_2.FutureUserService,
    privacy_policy_service_1.PrivacyPolicyService,
    page_data_service_1.PageDataService,
    asset_service_1.LegacyAssetService
];
var WAZEE_STORE_INTERFACES = [
    collections_store_1.CollectionsStore,
    feature_store_1.FeatureStore,
    orders_store_1.OrdersStore,
    gallery_view_store_1.GalleryViewStore,
    quotes_store_1.QuotesStore
];
var WAZEE_PROVIDERS = [
    app_store_1.AppStore
].concat(WAZEE_SERVICES, WAZEE_STORE_INTERFACES);
var WAZEE_STORES = {
    currentUser: current_user_service_2.currentUser,
    searchContext: search_context_service_2.searchContext,
    collections: collections_store_1.collections,
    filters: filter_service_2.filters,
    userPreferences: user_preference_service_2.userPreferences,
    collectionOptions: collection_context_service_2.collectionOptions,
    sortDefinitions: sort_definitions_service_2.sortDefinitions,
    orders: orders_store_1.orders,
    features: feature_store_1.features,
    gallery: gallery_view_store_1.gallery,
    quotes: quotes_store_1.quotes,
    activeCollection: ActiveCollectionState.reducer,
    asset: AssetState.reducer,
    cart: CartState.reducer,
    checkout: CheckoutState.reducer,
    comment: CommentState.reducer,
    deliveryOptions: DeliveryOptionState.reducer,
    headerDisplayOptions: HeaderDisplayOptions.reducer,
    invoice: InvoiceState.reducer,
    loadingIndicator: LoadingIndicatorState.reducer,
    multiLingual: MultiLingualState.reducer,
    order: OrderState.reducer,
    pricing: PricingState.reducer,
    privacyPolicy: PrivacyPolicyState.reducer,
    quoteEdit: QuoteEditState.reducer,
    quoteShow: QuoteShowState.reducer,
    search: SearchState.reducer,
    sharing: SharingState.reducer,
    snackbar: SnackbarState.reducer,
    speedPreview: SpeedPreviewState.reducer,
    uiConfig: UiConfigState.reducer,
    feeConfig: FeeConfigState.reducer
};
var WAZEE_EFFECTS = effects_1.EffectsModule.forRoot([
    account_effects_1.AccountEffects,
    active_collection_effects_1.ActiveCollectionEffects,
    activity_effects_1.ActivityEffects,
    asset_effects_1.AssetEffects,
    cart_effects_1.CartEffects,
    collections_effects_1.CollectionsEffects,
    comment_effects_1.CommentEffects,
    delivery_options_effects_1.DeliveryOptionsEffects,
    dialog_effects_1.DialogEffects,
    error_effects_1.ErrorEffects,
    fee_config_effects_1.FeeConfigEffects,
    header_display_options_effects_1.HeaderDisplayOptionsEffects,
    invoice_effects_1.InvoiceEffects,
    multi_lingual_effects_1.MultiLingualEffects,
    notifier_effects_1.NotifierEffects,
    order_effects_1.OrderEffects,
    page_data_effects_1.PageDataEffects,
    pricing_effects_1.PricingEffects,
    privacy_policy_effects_1.PrivacyPolicyEffects,
    quote_edit_effects_1.QuoteEditEffects,
    quote_show_effects_1.QuoteShowEffects,
    router_effects_1.RouterEffects,
    search_effects_1.SearchEffects,
    sharing_effects_1.SharingEffects,
    snackbar_effects_1.SnackbarEffects,
    speed_preview_effects_1.SpeedPreviewEffects,
    ui_config_effects_1.UiConfigEffects,
    user_effects_1.UserEffects
]);
var values_pipe_1 = require("./pipes/values.pipe");
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, 'https://', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [WAZEE_PROVIDERS]
        };
    };
    SharedModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        router_1.RouterModule,
                        forms_1.FormsModule,
                        core_2.TranslateModule.forRoot({
                            loader: {
                                provide: core_2.TranslateLoader,
                                useFactory: (createTranslateLoader),
                                deps: [http_2.HttpClient]
                            }
                        }),
                        forms_1.ReactiveFormsModule,
                        wz_design_module_1.MaterialModule,
                        wz_player_module_1.WzPlayerModule,
                        wz_form_module_1.WzFormModule,
                        wz_dialog_module_1.WzDialogModule,
                        store_1.StoreModule.forRoot(WAZEE_STORES),
                        store_devtools_1.StoreDevtoolsModule.instrument(),
                        WAZEE_EFFECTS
                    ],
                    declarations: [
                        wz_gallery_breadcrumb_component_1.WzGalleryBreadcrumbComponent,
                        wz_breadcrumb_component_1.WzBreadcrumbComponent,
                        wz_pagination_component_1.WzPaginationComponent,
                        collections_sort_dd_component_1.CollectionSortDdComponent,
                        collections_filter_dd_component_1.CollectionFilterDdComponent,
                        wz_item_search_form_component_1.WzItemSearchFormComponent,
                        values_pipe_1.ValuesPipe,
                        collection_form_component_1.CollectionFormComponent,
                        wz_sort_component_1.WzSortComponent,
                        collection_link_component_1.CollectionLinkComponent,
                        wz_clipboard_directive_1.WzClipBoardDirective,
                        wz_terms_component_1.WzTermsComponent,
                        wz_pricing_component_1.WzPricingComponent,
                        wz_coming_soon_component_1.WzComingSoonComponent,
                        wz_gallery_two_level_component_1.WzGalleryTwoLevelComponent,
                        wz_subclip_editor_component_1.WzSubclipEditorComponent,
                        wz_site_changer_component_1.WzSiteChangerComponent,
                        wz_comment_component_1.WzCommentComponent,
                        wz_share_component_1.WzShareComponent,
                        wz_share_link_component_1.WzShareLinkComponent
                    ],
                    exports: [
                        store_1.StoreModule,
                        http_2.HttpClientModule,
                        http_1.HttpModule,
                        wz_gallery_breadcrumb_component_1.WzGalleryBreadcrumbComponent,
                        wz_breadcrumb_component_1.WzBreadcrumbComponent,
                        wz_pagination_component_1.WzPaginationComponent,
                        collections_sort_dd_component_1.CollectionSortDdComponent,
                        collections_filter_dd_component_1.CollectionFilterDdComponent,
                        wz_item_search_form_component_1.WzItemSearchFormComponent,
                        values_pipe_1.ValuesPipe,
                        collection_form_component_1.CollectionFormComponent,
                        common_1.CommonModule,
                        router_1.RouterModule,
                        core_2.TranslateModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule,
                        wz_design_module_1.MaterialModule,
                        wz_player_module_1.WzPlayerModule,
                        wz_sort_component_1.WzSortComponent,
                        collection_link_component_1.CollectionLinkComponent,
                        wz_clipboard_directive_1.WzClipBoardDirective,
                        wz_terms_component_1.WzTermsComponent,
                        wz_asset_module_1.WzAssetModule,
                        wz_pricing_component_1.WzPricingComponent,
                        wz_coming_soon_component_1.WzComingSoonComponent,
                        wz_form_module_1.WzFormModule,
                        wz_gallery_two_level_component_1.WzGalleryTwoLevelComponent,
                        wz_subclip_editor_component_1.WzSubclipEditorComponent,
                        wz_site_changer_component_1.WzSiteChangerComponent,
                        wz_comment_component_1.WzCommentComponent,
                        wz_share_component_1.WzShareComponent,
                        wz_share_link_component_1.WzShareLinkComponent
                    ],
                    entryComponents: [
                        collection_link_component_1.CollectionLinkComponent,
                        collection_form_component_1.CollectionFormComponent,
                        wz_terms_component_1.WzTermsComponent,
                        wz_pricing_component_1.WzPricingComponent,
                        wz_coming_soon_component_1.WzComingSoonComponent,
                        wz_subclip_editor_component_1.WzSubclipEditorComponent
                    ]
                },] },
    ];
    SharedModule.ctorParameters = function () { return []; };
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map