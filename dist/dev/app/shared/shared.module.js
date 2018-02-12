"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [WAZEE_PROVIDERS]
        };
    };
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
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
        })
    ], SharedModule);
    return SharedModule;
    var SharedModule_1;
}());
exports.SharedModule = SharedModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLHNDQUE4RDtBQUM5RCwwQ0FBK0M7QUFDL0Msd0NBQWtFO0FBQ2xFLDBDQUErQztBQUMvQyxzQ0FBaUQ7QUFDakQsNkNBQW9FO0FBQ3BFLDRDQUF1RTtBQUN2RSwwREFBaUU7QUFDakUseUVBQXNFO0FBQ3RFLHFDQUEwQztBQUMxQyx1REFBMkQ7QUFDM0QseUNBQThDO0FBRzlDLHlFQUFzRTtBQUN0RSxtRUFBZ0U7QUFDaEUsc0VBQW1FO0FBQ25FLHlFQUFzRTtBQUd0RSw4RkFBMkY7QUFDM0YsOEZBQTJGO0FBQzNGLDJGQUF3RjtBQUN4Rix5R0FBb0c7QUFDcEcsNkdBQXdHO0FBQ3hHLGdIQUEyRztBQUMzRyxpSEFBOEc7QUFDOUcsNEVBQXlFO0FBQ3pFLGlHQUE4RjtBQUM5RiwrRUFBNEU7QUFDNUUscUZBQWtGO0FBQ2xGLGlHQUE2RjtBQUM3RiwwR0FBc0c7QUFDdEcsbUhBQThHO0FBQzlHLHNIQUFrSDtBQUNsSCxvR0FBZ0c7QUFDaEcscUZBQWtGO0FBQ2xGLCtFQUE0RTtBQUM1RSw4RkFBMEY7QUFHMUYsb0RBQWtEO0FBQ2xELDRDQUF1RDtBQUN2RCx3RUFBcUU7QUFDckUsd0RBQXNEO0FBQ3RELDRFQUFrRTtBQUNsRSxzRUFBb0U7QUFDcEUsOEVBQTJFO0FBQzNFLHNEQUFvRDtBQUNwRCxnRkFBNkU7QUFDN0UsNERBQTBEO0FBQzFELHNGQUF3RTtBQUN4RSwwREFBd0Q7QUFDeEQsd0RBQXNEO0FBQ3RELDREQUEwRDtBQUMxRCxvRkFBaUY7QUFDakYsd0VBQXFFO0FBQ3JFLG9FQUEwRDtBQUMxRCwwREFBd0Q7QUFDeEQsNERBQTBEO0FBQzFELDREQUEwRDtBQUUxRCxvRUFBa0U7QUFDbEUsa0dBQStGO0FBQy9GLHVFQUFxRTtBQUNyRSw4REFBZ0Y7QUFDaEYsb0VBQWtFO0FBQ2xFLGdGQUFvRjtBQUNwRiwrRkFBNEY7QUFDNUYsNkVB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Z0RBQXFCO2dCQUNyQixzREFBd0I7YUFDekI7U0FDRixDQUFDO09BRVcsWUFBWSxDQU94QjtJQUFELG1CQUFDOztDQVBELEFBT0MsSUFBQTtBQVBZLG9DQUFZIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNoYXJlZCBBbmd1bGFyIE1vZHVsZXNcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSwgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVIdHRwTG9hZGVyIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvaHR0cC1sb2FkZXInO1xuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvd3otZGVzaWduL3d6LmRlc2lnbi5tb2R1bGUnO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBTdG9yZURldnRvb2xzTW9kdWxlIH0gZnJvbSAnQG5ncngvc3RvcmUtZGV2dG9vbHMnO1xuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuXG4vLyBTaGFyZWQgV2F6ZWUgTW9kdWxlc1xuaW1wb3J0IHsgV3pQbGF5ZXJNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvd3otcGxheWVyL3d6LnBsYXllci5tb2R1bGUnO1xuaW1wb3J0IHsgV3pGb3JtTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL3d6LWZvcm0vd3otZm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgV3pBc3NldE1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy93ei1hc3NldC93ei1hc3NldC5tb2R1bGUnO1xuaW1wb3J0IHsgV3pEaWFsb2dNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvd3otZGlhbG9nL3d6LmRpYWxvZy5tb2R1bGUnO1xuXG4vLyBTaGFyZWQgUHVyZSBDb21wb25lbnRzXG5pbXBvcnQgeyBXekJyZWFkY3J1bWJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otYnJlYWRjcnVtYi93ei5icmVhZGNydW1iLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXelBhZ2luYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otcGFnaW5hdGlvbi93ei5wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXekNsaXBCb2FyZERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50cy93ei1jbGlwYm9hcmQvd3otY2xpcGJvYXJkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uU29ydERkQ29tcG9uZW50IH0gZnJvbSAnLi4vK2NvbGxlY3Rpb24vY29tcG9uZW50cy9jb2xsZWN0aW9ucy1zb3J0LWRkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uRmlsdGVyRGRDb21wb25lbnQgfSBmcm9tICcuLi8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb25zLWZpbHRlci1kZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pJdGVtU2VhcmNoRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1pdGVtLXNlYXJjaC1mb3JtL3d6Lml0ZW0tc2VhcmNoLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25Gb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vYXBwbGljYXRpb24vY29sbGVjdGlvbi10cmF5L2NvbXBvbmVudHMvY29sbGVjdGlvbi1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXelNvcnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otc29ydC93ei5zb3J0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uTGlua0NvbXBvbmVudCB9IGZyb20gJy4uLytjb2xsZWN0aW9uL2NvbXBvbmVudHMvY29sbGVjdGlvbi1saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXelRlcm1zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LXRlcm1zL3d6LnRlcm1zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXelByaWNpbmdDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otcHJpY2luZy93ei5wcmljaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXekNvbWluZ1Nvb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otY29taW5nLXNvb24vd3otY29taW5nLXNvb24uY29tcG9uZW50JztcbmltcG9ydCB7IFd6U3ViY2xpcEVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1zdWJjbGlwLWVkaXRvci93ei5zdWJjbGlwLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pHYWxsZXJ5VHdvTGV2ZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otZ2FsbGVyeS10d28tbGV2ZWwvd3ouZ2FsbGVyeS10d28tbGV2ZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFd6R2FsbGVyeUJyZWFkY3J1bWJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otZ2FsbGVyeS1icmVhZGNydW1iL3d6LmdhbGxlcnktYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pTaXRlQ2hhbmdlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1zaXRlLWNoYW5nZXIvd3otc2l0ZS1jaGFuZ2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXekNvbW1lbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otY29tbWVudC93ei5jb21tZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXelNoYXJlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LXNoYXJlL3d6LnNoYXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXelNoYXJlTGlua0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1zaGFyZS1saW5rL3d6LnNoYXJlLWxpbmsuY29tcG9uZW50JztcblxuLy8gV0FaRUUgU0VSVklDRVNcbmltcG9ydCB7IEFwaUNvbmZpZyB9IGZyb20gJy4vc2VydmljZXMvYXBpLmNvbmZpZyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBDdXJyZW50VXNlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoQ29udGV4dCB9IGZyb20gJy4vc2VydmljZXMvc2VhcmNoLWNvbnRleHQuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbGxlY3Rpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclByZWZlcmVuY2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLXByZWZlcmVuY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBTb3J0RGVmaW5pdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zb3J0LWRlZmluaXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZmlsdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tICcuL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBQZW5kb1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3BlbmRvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FydFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NhcnQuc2VydmljZSc7XG5pbXBvcnQgeyBPcmRlcnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9vcmRlcnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbGxlY3Rpb24tY29udGV4dC5zZXJ2aWNlJztcbmltcG9ydCB7IEdhbGxlcnlWaWV3U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ2FsbGVyeS12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVvdGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9xdW90ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFF1b3Rlc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3F1b3Rlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFzcGVyYVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2FzcGVyYS5zZXJ2aWNlJztcbi8vIE5ldy1pc2ggc2VydmljZXNcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvYWNjb3VudC9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEFjdGl2aXR5U2VydmljZSB9IGZyb20gJy4uL3N0b3JlL2FjdGl2aXR5L2FjdGl2aXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXNzZXRTZXJ2aWNlLCBMZWdhY3lBc3NldFNlcnZpY2UgfSBmcm9tICcuLi9zdG9yZS9hc3NldC9hc3NldC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvY29tbWVudC9jb21tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgRnV0dXJlQ29sbGVjdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvY29sbGVjdGlvbnMvY29sbGVjdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBEZWxpdmVyeU9wdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvZGVsaXZlcnktb3B0aW9ucy9kZWxpdmVyeS1vcHRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmVlQ29uZmlnU2VydmljZSB9IGZyb20gJy4uL3N0b3JlL2ZlZS1jb25maWcvZmVlLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZ1dHVyZUFwaVNlcnZpY2UgfSBmcm9tICcuLi9zdG9yZS9hcGkvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnV0dXJlQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zdG9yZS9jYXJ0L2NhcnQuc2VydmljZSc7XG5pbXBvcnQgeyBGdXR1cmVRdW90ZUVkaXRTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvcXVvdGUtZWRpdC9xdW90ZS1lZGl0LnNlcnZpY2UnO1xuaW1wb3J0IHsgRnV0dXJlUXVvdGVTaG93U2VydmljZSB9IGZyb20gJy4uL3N0b3JlL3F1b3RlLXNob3cvcXVvdGUtc2hvdy5zZXJ2aWNlJztcbmltcG9ydCB7IEZ1dHVyZVVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvdXNlci91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvb3JkZXIvb3JkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbnZvaWNlU2VydmljZSB9IGZyb20gJy4uL3N0b3JlL2ludm9pY2UvaW52b2ljZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VEYXRhU2VydmljZSB9IGZyb20gJy4uL3N0b3JlL3BhZ2UtZGF0YS9wYWdlLWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBQcmljaW5nU2VydmljZSB9IGZyb20gJy4uL3N0b3JlL3ByaWNpbmcvcHJpY2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IFByaXZhY3lQb2xpY3lTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvc2VhcmNoL3NlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvc2hhcmluZy9zaGFyaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU25hY2tiYXJTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvc25hY2tiYXIvc25hY2tiYXIuc2VydmljZSc7XG5pbXBvcnQgeyBTcGVlZFByZXZpZXdTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvc3BlZWQtcHJldmlldy9zcGVlZC1wcmV2aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgVWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vc3RvcmUvdWktY29uZmlnL3VpLWNvbmZpZy5zZXJ2aWNlJztcblxuLy8gV0FaRUUgU1RPUkVTXG5pbXBvcnQge1xuICBBcHBTdG9yZVxuICAvLyByZWR1Y2Vyc1xufSBmcm9tICcuLi9hcHAuc3RvcmUnO1xuXG5pbXBvcnQgKiBhcyBBY3RpdmVDb2xsZWN0aW9uU3RhdGUgZnJvbSAnLi4vc3RvcmUvYWN0aXZlLWNvbGxlY3Rpb24vYWN0aXZlLWNvbGxlY3Rpb24uc3RhdGUnO1xuaW1wb3J0ICogYXMgQXNzZXRTdGF0ZSBmcm9tICcuLi9zdG9yZS9hc3NldC9hc3NldC5zdGF0ZSc7XG5pbXBvcnQgKiBhcyBDYXJ0U3RhdGUgZnJvbSAnLi4vc3RvcmUvY2FydC9jYXJ0LnN0YXRlJztcbmltcG9ydCAqIGFzIENoZWNrb3V0U3RhdGUgZnJvbSAnLi4vc3RvcmUvY2hlY2tvdXQvY2hlY2tvdXQuc3RhdGUnO1xuaW1wb3J0ICogYXMgQ29tbWVudFN0YXRlIGZyb20gJy4uL3N0b3JlL2NvbW1lbnQvY29tbWVudC5zdGF0ZSc7XG5pbXBvcnQgKiBhcyBEZWxpdmVyeU9wdGlvblN0YXRlIGZyb20gJy4uL3N0b3JlL2RlbGl2ZXJ5LW9wdGlvbnMvZGVsaXZlcnktb3B0aW9ucy5zdGF0ZSc7XG5pbXBvcnQgKiBhcyBGZWVDb25maWdTdGF0ZSBmcm9tICcuLi9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuc3RhdGUnO1xuaW1wb3J0ICogYXMgSGVhZGVyRGlzcGxheU9wdGlvbnMgZnJvbSAnLi4vc3RvcmUvaGVhZGVyLWRpc3BsYXktb3B0aW9ucy9oZWFkZXItZGlzcGxheS1vcHRpb25zLnN0YXRlJztcbmltcG9ydCAqIGFzIEludm9pY2VTdGF0ZSBmcm9tICcuLi9zdG9yZS9pbnZvaWNlL2ludm9pY2Uuc3RhdGUnO1xuaW1wb3J0ICogYXMgTG9hZGluZ0luZGljYXRvclN0YXRlIGZyb20gJy4uL3N0b3JlL2xvYWRpbmctaW5kaWNhdG9yL2xvYWRpbmctaW5kaWNhdG9yLnN0YXRlJztcbmltcG9ydCAqIGFzIE11bHRpTGluZ3VhbFN0YXRlIGZyb20gJy4uL3N0b3JlL211bHRpLWxpbmd1YWwvbXVsdGktbGluZ3VhbC5zdGF0ZSc7XG5pbXBvcnQgKiBhcyBPcmRlclN0YXRlIGZyb20gJy4uL3N0b3JlL29yZGVyL29yZGVyLnN0YXRlJztcbmltcG9ydCAqIGFzIFByaWNpbmdTdGF0ZSBmcm9tICcuLi9zdG9yZS9wcmljaW5nL3ByaWNpbmcuc3RhdGUnO1xuaW1wb3J0ICogYXMgUHJpdmFjeVBvbGljeVN0YXRlIGZyb20gJy4uL3N0b3JlL3ByaXZhY3ktcG9saWN5L3ByaXZhY3ktcG9saWN5LnN0YXRlJztcbmltcG9ydCAqIGFzIFF1b3RlRWRpdFN0YXRlIGZyb20gJy4uL3N0b3JlL3F1b3RlLWVkaXQvcXVvdGUtZWRpdC5zdGF0ZSc7XG5pbXBvcnQgKiBhcyBRdW90ZVNob3dTdGF0ZSBmcm9tICcuLi9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuc3RhdGUnO1xuaW1wb3J0ICogYXMgU2VhcmNoU3RhdGUgZnJvbSAnLi4vc3RvcmUvc2VhcmNoL3NlYXJjaC5zdGF0ZSc7XG5pbXBvcnQgKiBhcyBTaGFyaW5nU3RhdGUgZnJvbSAnLi4vc3RvcmUvc2hhcmluZy9zaGFyaW5nLnN0YXRlJztcbmltcG9ydCAqIGFzIFNuYWNrYmFyU3RhdGUgZnJvbSAnLi4vc3RvcmUvc25hY2tiYXIvc25hY2tiYXIuc3RhdGUnO1xuaW1wb3J0ICogYXMgU3BlZWRQcmV2aWV3U3RhdGUgZnJvbSAnLi4vc3RvcmUvc3BlZWQtcHJldmlldy9zcGVlZC1wcmV2aWV3LnN0YXRlJztcbmltcG9ydCAqIGFzIFVpQ29uZmlnU3RhdGUgZnJvbSAnLi4vc3RvcmUvdWktY29uZmlnL3VpLWNvbmZpZy5zdGF0ZSc7XG5cbmltcG9ydCB7IGNvbGxlY3Rpb25zLCBDb2xsZWN0aW9uc1N0b3JlIH0gZnJvbSAnLi9zdG9yZXMvY29sbGVjdGlvbnMuc3RvcmUnO1xuaW1wb3J0IHsgb3JkZXJzLCBPcmRlcnNTdG9yZSB9IGZyb20gJy4vc3RvcmVzL29yZGVycy5zdG9yZSc7XG5pbXBvcnQgeyBmZWF0dXJlcywgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi9zdG9yZXMvZmVhdHVyZS5zdG9yZSc7XG5pbXBvcnQgeyBnYWxsZXJ5LCBHYWxsZXJ5Vmlld1N0b3JlIH0gZnJvbSAnLi9zdG9yZXMvZ2FsbGVyeS12aWV3LnN0b3JlJztcbmltcG9ydCB7IHF1b3RlcywgUXVvdGVzU3RvcmUgfSBmcm9tICcuL3N0b3Jlcy9xdW90ZXMuc3RvcmUnO1xuaW1wb3J0IHsgY3VycmVudFVzZXIgfSBmcm9tICcuL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IENhcGFiaWxpdGllcyB9IGZyb20gJy4vc2VydmljZXMvY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgc2VhcmNoQ29udGV4dCB9IGZyb20gJy4vc2VydmljZXMvc2VhcmNoLWNvbnRleHQuc2VydmljZSc7XG5pbXBvcnQgeyBmaWx0ZXJzIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyB1c2VyUHJlZmVyZW5jZXMgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItcHJlZmVyZW5jZS5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbGxlY3Rpb25PcHRpb25zIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb2xsZWN0aW9uLWNvbnRleHQuc2VydmljZSc7XG5pbXBvcnQgeyBzb3J0RGVmaW5pdGlvbnMgfSBmcm9tICcuL3NlcnZpY2VzL3NvcnQtZGVmaW5pdGlvbnMuc2VydmljZSc7XG5cbi8vIFdBWkVFIEVGRkVDVFNcbmltcG9ydCB7IEFjY291bnRFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvYWNjb3VudC9hY2NvdW50LmVmZmVjdHMnO1xuaW1wb3J0IHsgQWN0aXZlQ29sbGVjdGlvbkVmZmVjdHMgfSBmcm9tICcuLi9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5lZmZlY3RzJztcbmltcG9ydCB7IEFjdGl2aXR5RWZmZWN0cyB9IGZyb20gJy4uL3N0b3JlL2FjdGl2aXR5L2FjdGl2aXR5LmVmZmVjdHMnO1xuaW1wb3J0IHsgQXNzZXRFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvYXNzZXQvYXNzZXQuZWZmZWN0cyc7XG5pbXBvcnQgeyBDYXJ0RWZmZWN0cyB9IGZyb20gJy4uL3N0b3JlL2NhcnQvY2FydC5lZmZlY3RzJztcbmltcG9ydCB7IENvbW1lbnRFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvY29tbWVudC9jb21tZW50LmVmZmVjdHMnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbnNFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvY29sbGVjdGlvbnMvY29sbGVjdGlvbnMuZWZmZWN0cyc7XG5pbXBvcnQgeyBEZWxpdmVyeU9wdGlvbnNFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvZGVsaXZlcnktb3B0aW9ucy9kZWxpdmVyeS1vcHRpb25zLmVmZmVjdHMnO1xuaW1wb3J0IHsgRGlhbG9nRWZmZWN0cyB9IGZyb20gJy4uL3N0b3JlL2RpYWxvZy9kaWFsb2cuZWZmZWN0cyc7XG5pbXBvcnQgeyBFcnJvckVmZmVjdHMgfSBmcm9tICcuLi9zdG9yZS9lcnJvci9lcnJvci5lZmZlY3RzJztcbmltcG9ydCB7IEZlZUNvbmZpZ0VmZmVjdHMgfSBmcm9tICcuLi9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuZWZmZWN0cyc7XG5pbXBvcnQgeyBIZWFkZXJEaXNwbGF5T3B0aW9uc0VmZmVjdHMgfSBmcm9tICcuLi9zdG9yZS9oZWFkZXItZGlzcGxheS1vcHRpb25zL2hlYWRlci1kaXNwbGF5LW9wdGlvbnMuZWZmZWN0cyc7XG5pbXBvcnQgeyBJbnZvaWNlRWZmZWN0cyB9IGZyb20gJy4uL3N0b3JlL2ludm9pY2UvaW52b2ljZS5lZmZlY3RzJztcbmltcG9ydCB7IE11bHRpTGluZ3VhbEVmZmVjdHMgfSBmcm9tICcuLi9zdG9yZS9tdWx0aS1saW5ndWFsL211bHRpLWxpbmd1YWwuZWZmZWN0cyc7XG5pbXBvcnQgeyBOb3RpZmllckVmZmVjdHMgfSBmcm9tICcuLi9zdG9yZS9ub3RpZmllci9ub3RpZmllci5lZmZlY3RzJztcbmltcG9ydCB7IE9yZGVyRWZmZWN0cyB9IGZyb20gJy4uL3N0b3JlL29yZGVyL29yZGVyLmVmZmVjdHMnO1xuaW1wb3J0IHsgUGFnZURhdGFFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvcGFnZS1kYXRhL3BhZ2UtZGF0YS5lZmZlY3RzJztcbmltcG9ydCB7IFByaWNpbmdFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvcHJpY2luZy9wcmljaW5nLmVmZmVjdHMnO1xuaW1wb3J0IHsgUHJpdmFjeVBvbGljeUVmZmVjdHMgfSBmcm9tICcuLi9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5lZmZlY3RzJztcbmltcG9ydCB7IFF1b3RlRWRpdEVmZmVjdHMgfSBmcm9tICcuLi9zdG9yZS9xdW90ZS1lZGl0L3F1b3RlLWVkaXQuZWZmZWN0cyc7XG5pbXBvcnQgeyBRdW90ZVNob3dFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvcXVvdGUtc2hvdy9xdW90ZS1zaG93LmVmZmVjdHMnO1xuaW1wb3J0IHsgUm91dGVyRWZmZWN0cyB9IGZyb20gJy4uL3N0b3JlL3JvdXRlci9yb3V0ZXIuZWZmZWN0cyc7XG5pbXBvcnQgeyBTZWFyY2hFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvc2VhcmNoL3NlYXJjaC5lZmZlY3RzJztcbmltcG9ydCB7IFNoYXJpbmdFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvc2hhcmluZy9zaGFyaW5nLmVmZmVjdHMnO1xuaW1wb3J0IHsgU25hY2tiYXJFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvc25hY2tiYXIvc25hY2tiYXIuZWZmZWN0cyc7XG5pbXBvcnQgeyBTcGVlZFByZXZpZXdFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvc3BlZWQtcHJldmlldy9zcGVlZC1wcmV2aWV3LmVmZmVjdHMnO1xuaW1wb3J0IHsgVWlDb25maWdFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvdWktY29uZmlnL3VpLWNvbmZpZy5lZmZlY3RzJztcbmltcG9ydCB7IFVzZXJFZmZlY3RzIH0gZnJvbSAnLi4vc3RvcmUvdXNlci91c2VyLmVmZmVjdHMnO1xuXG5jb25zdCBXQVpFRV9TRVJWSUNFUyA9IFtcbiAgQWNjb3VudFNlcnZpY2UsXG4gIEFjdGl2aXR5U2VydmljZSxcbiAgQXBpQ29uZmlnLFxuICBDdXJyZW50VXNlclNlcnZpY2UsXG4gIEFzc2V0U2VydmljZSxcbiAgQ29sbGVjdGlvbnNTZXJ2aWNlLFxuICBGdXR1cmVDb2xsZWN0aW9uc1NlcnZpY2UsXG4gIEFjdGl2ZUNvbGxlY3Rpb25TZXJ2aWNlLFxuICBTZWFyY2hDb250ZXh0LFxuICBVc2VyUHJlZmVyZW5jZVNlcnZpY2UsXG4gIENvbGxlY3Rpb25Db250ZXh0U2VydmljZSxcbiAgQXBpU2VydmljZSxcbiAgRnV0dXJlQXBpU2VydmljZSxcbiAgU29ydERlZmluaXRpb25zU2VydmljZSxcbiAgQ2FwYWJpbGl0aWVzLFxuICBGaWx0ZXJTZXJ2aWNlLFxuICBBdXRoZW50aWNhdGlvbixcbiAgUGVuZG9TZXJ2aWNlLFxuICBDYXJ0U2VydmljZSxcbiAgVXNlclNlcnZpY2UsXG4gIE9yZGVyU2VydmljZSxcbiAgSW52b2ljZVNlcnZpY2UsXG4gIE9yZGVyc1NlcnZpY2UsXG4gIFRyYW5zbGF0ZVNlcnZpY2UsXG4gIEdhbGxlcnlWaWV3U2VydmljZSxcbiAgV2luZG93UmVmLFxuICBGdXR1cmVRdW90ZUVkaXRTZXJ2aWNlLFxuICBGdXR1cmVRdW90ZVNob3dTZXJ2aWNlLFxuICBRdW90ZVNlcnZpY2UsXG4gIFF1b3Rlc1NlcnZpY2UsXG4gIFNlYXJjaFNlcnZpY2UsXG4gIFNoYXJpbmdTZXJ2aWNlLFxuICBTbmFja2JhclNlcnZpY2UsXG4gIENvbW1lbnRTZXJ2aWNlLFxuICBEZWxpdmVyeU9wdGlvbnNTZXJ2aWNlLFxuICBGdXR1cmVDYXJ0U2VydmljZSxcbiAgU3BlZWRQcmV2aWV3U2VydmljZSxcbiAgVWlDb25maWdTZXJ2aWNlLFxuICBQcmljaW5nU2VydmljZSxcbiAgQXNwZXJhU2VydmljZSxcbiAgRmVlQ29uZmlnU2VydmljZSxcbiAgRnV0dXJlVXNlclNlcnZpY2UsXG4gIFByaXZhY3lQb2xpY3lTZXJ2aWNlLFxuICBQYWdlRGF0YVNlcnZpY2UsXG4gIC8vIFRlbXBvcmFyeSBsZWdhY3kgc2VydmljZXMgYWNjZXNzZWQgdGhyb3VnaCBBcHBTdG9yZVxuICBMZWdhY3lBc3NldFNlcnZpY2Vcbl07XG5cbmNvbnN0IFdBWkVFX1NUT1JFX0lOVEVSRkFDRVMgPSBbXG4gIENvbGxlY3Rpb25zU3RvcmUsXG4gIEZlYXR1cmVTdG9yZSxcbiAgT3JkZXJzU3RvcmUsXG4gIEdhbGxlcnlWaWV3U3RvcmUsXG4gIFF1b3Rlc1N0b3JlXG5dO1xuXG5jb25zdCBXQVpFRV9QUk9WSURFUlM6IGFueSA9IFtcbiAgQXBwU3RvcmUsXG4gIC4uLldBWkVFX1NFUlZJQ0VTLFxuICAuLi5XQVpFRV9TVE9SRV9JTlRFUkZBQ0VTXG5dO1xuXG5cbmNvbnN0IFdBWkVFX1NUT1JFUzogYW55ID0ge1xuICBjdXJyZW50VXNlcjogY3VycmVudFVzZXIsXG4gIHNlYXJjaENvbnRleHQ6IHNlYXJjaENvbnRleHQsXG4gIGNvbGxlY3Rpb25zOiBjb2xsZWN0aW9ucyxcbiAgZmlsdGVyczogZmlsdGVycyxcbiAgdXNlclByZWZlcmVuY2VzOiB1c2VyUHJlZmVyZW5jZXMsXG4gIGNvbGxlY3Rpb25PcHRpb25zOiBjb2xsZWN0aW9uT3B0aW9ucyxcbiAgc29ydERlZmluaXRpb25zOiBzb3J0RGVmaW5pdGlvbnMsXG4gIG9yZGVyczogb3JkZXJzLFxuICBmZWF0dXJlczogZmVhdHVyZXMsXG4gIGdhbGxlcnk6IGdhbGxlcnksXG4gIHF1b3RlczogcXVvdGVzLFxuICAvLyBSRURVWCAyMDAwMDAuMC4wXG4gIGFjdGl2ZUNvbGxlY3Rpb246IEFjdGl2ZUNvbGxlY3Rpb25TdGF0ZS5yZWR1Y2VyLFxuICBhc3NldDogQXNzZXRTdGF0ZS5yZWR1Y2VyLFxuICBjYXJ0OiBDYXJ0U3RhdGUucmVkdWNlcixcbiAgY2hlY2tvdXQ6IENoZWNrb3V0U3RhdGUucmVkdWNlcixcbiAgY29tbWVudDogQ29tbWVudFN0YXRlLnJlZHVjZXIsXG4gIGRlbGl2ZXJ5T3B0aW9uczogRGVsaXZlcnlPcHRpb25TdGF0ZS5yZWR1Y2VyLFxuICBoZWFkZXJEaXNwbGF5T3B0aW9uczogSGVhZGVyRGlzcGxheU9wdGlvbnMucmVkdWNlcixcbiAgaW52b2ljZTogSW52b2ljZVN0YXRlLnJlZHVjZXIsXG4gIGxvYWRpbmdJbmRpY2F0b3I6IExvYWRpbmdJbmRpY2F0b3JTdGF0ZS5yZWR1Y2VyLFxuICBtdWx0aUxpbmd1YWw6IE11bHRpTGluZ3VhbFN0YXRlLnJlZHVjZXIsXG4gIG9yZGVyOiBPcmRlclN0YXRlLnJlZHVjZXIsXG4gIHByaWNpbmc6IFByaWNpbmdTdGF0ZS5yZWR1Y2VyLFxuICBwcml2YWN5UG9saWN5OiBQcml2YWN5UG9saWN5U3RhdGUucmVkdWNlcixcbiAgcXVvdGVFZGl0OiBRdW90ZUVkaXRTdGF0ZS5yZWR1Y2VyLFxuICBxdW90ZVNob3c6IFF1b3RlU2hvd1N0YXRlLnJlZHVjZXIsXG4gIHNlYXJjaDogU2VhcmNoU3RhdGUucmVkdWNlcixcbiAgc2hhcmluZzogU2hhcmluZ1N0YXRlLnJlZHVjZXIsXG4gIHNuYWNrYmFyOiBTbmFja2JhclN0YXRlLnJlZHVjZXIsXG4gIHNwZWVkUHJldmlldzogU3BlZWRQcmV2aWV3U3RhdGUucmVkdWNlcixcbiAgdWlDb25maWc6IFVpQ29uZmlnU3RhdGUucmVkdWNlcixcbiAgZmVlQ29uZmlnOiBGZWVDb25maWdTdGF0ZS5yZWR1Y2VyXG59O1xuXG5jb25zdCBXQVpFRV9FRkZFQ1RTID0gRWZmZWN0c01vZHVsZS5mb3JSb290KFtcbiAgQWNjb3VudEVmZmVjdHMsXG4gIEFjdGl2ZUNvbGxlY3Rpb25FZmZlY3RzLFxuICBBY3Rpdml0eUVmZmVjdHMsXG4gIEFzc2V0RWZmZWN0cyxcbiAgQ2FydEVmZmVjdHMsXG4gIENvbGxlY3Rpb25zRWZmZWN0cyxcbiAgQ29tbWVudEVmZmVjdHMsXG4gIERlbGl2ZXJ5T3B0aW9uc0VmZmVjdHMsXG4gIERpYWxvZ0VmZmVjdHMsXG4gIEVycm9yRWZmZWN0cyxcbiAgRmVlQ29uZmlnRWZmZWN0cyxcbiAgSGVhZGVyRGlzcGxheU9wdGlvbnNFZmZlY3RzLFxuICBJbnZvaWNlRWZmZWN0cyxcbiAgTXVsdGlMaW5ndWFsRWZmZWN0cyxcbiAgTm90aWZpZXJFZmZlY3RzLFxuICBPcmRlckVmZmVjdHMsXG4gIFBhZ2VEYXRhRWZmZWN0cyxcbiAgUHJpY2luZ0VmZmVjdHMsXG4gIFByaXZhY3lQb2xpY3lFZmZlY3RzLFxuICBRdW90ZUVkaXRFZmZlY3RzLFxuICBRdW90ZVNob3dFZmZlY3RzLFxuICBSb3V0ZXJFZmZlY3RzLFxuICBTZWFyY2hFZmZlY3RzLFxuICBTaGFyaW5nRWZmZWN0cyxcbiAgU25hY2tiYXJFZmZlY3RzLFxuICBTcGVlZFByZXZpZXdFZmZlY3RzLFxuICBVaUNvbmZpZ0VmZmVjdHMsXG4gIFVzZXJFZmZlY3RzXG5dKTtcblxuLy8gU2hhcmVkIHBpcGVzXG5pbXBvcnQgeyBWYWx1ZXNQaXBlIH0gZnJvbSAnLi9waXBlcy92YWx1ZXMucGlwZSc7XG5cbi8vIEFvVCByZXF1aXJlcyBhbiBleHBvcnRlZCBmdW5jdGlvbiBmb3IgZmFjdG9yaWVzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVHJhbnNsYXRlTG9hZGVyKGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVIdHRwTG9hZGVyKGh0dHAsICdodHRwczovLycsICcuanNvbicpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICAvLyBIdHRwTW9kdWxlLFxuICAgIC8vIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgbG9hZGVyOiB7XG4gICAgICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgdXNlRmFjdG9yeTogKGNyZWF0ZVRyYW5zbGF0ZUxvYWRlciksXG4gICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50XVxuICAgICAgfVxuICAgIH0pLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0ZXJpYWxNb2R1bGUsXG4gICAgV3pQbGF5ZXJNb2R1bGUsXG4gICAgV3pGb3JtTW9kdWxlLFxuICAgIC8vIFd6QXNzZXRNb2R1bGUsXG4gICAgV3pEaWFsb2dNb2R1bGUsXG4gICAgU3RvcmVNb2R1bGUuZm9yUm9vdChXQVpFRV9TVE9SRVMpLCAgLy8gRXZlbnR1YWxseSB0aGlzIHdpbGwgYmUganVzdCB0aGUgcmVkdWNlcnMgb2JqZWN0IGZyb20gYXBwLnN0b3JlLnRzXG4gICAgLy8gVE9ETzogR2V0IFN0b3JlRGV2dG9vbHNNb2R1bGUgb3V0IG9mIHByb2R1Y3Rpb24hISEgIChMb29rcyBzY2FyeSwgdGhvdWdoOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWVhcm9uL3JlZHV4LWRldnRvb2xzL2Jsb2IvbWFzdGVyL2RvY3MvV2Fsa3Rocm91Z2gubWQpXG4gICAgU3RvcmVEZXZ0b29sc01vZHVsZS5pbnN0cnVtZW50KCksXG4gICAgV0FaRUVfRUZGRUNUU1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBXekdhbGxlcnlCcmVhZGNydW1iQ29tcG9uZW50LFxuICAgIFd6QnJlYWRjcnVtYkNvbXBvbmVudCxcbiAgICBXelBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgQ29sbGVjdGlvblNvcnREZENvbXBvbmVudCxcbiAgICBDb2xsZWN0aW9uRmlsdGVyRGRDb21wb25lbnQsXG4gICAgV3pJdGVtU2VhcmNoRm9ybUNvbXBvbmVudCxcbiAgICBWYWx1ZXNQaXBlLFxuICAgIENvbGxlY3Rpb25Gb3JtQ29tcG9uZW50LFxuICAgIFd6U29ydENvbXBvbmVudCxcbiAgICBDb2xsZWN0aW9uTGlua0NvbXBvbmVudCxcbiAgICBXekNsaXBCb2FyZERpcmVjdGl2ZSxcbiAgICBXelRlcm1zQ29tcG9uZW50LFxuICAgIFd6UHJpY2luZ0NvbXBvbmVudCxcbiAgICBXekNvbWluZ1Nvb25Db21wb25lbnQsXG4gICAgV3pHYWxsZXJ5VHdvTGV2ZWxDb21wb25lbnQsXG4gICAgV3pTdWJjbGlwRWRpdG9yQ29tcG9uZW50LFxuICAgIFd6U2l0ZUNoYW5nZXJDb21wb25lbnQsXG4gICAgV3pDb21tZW50Q29tcG9uZW50LFxuICAgIFd6U2hhcmVDb21wb25lbnQsXG4gICAgV3pTaGFyZUxpbmtDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFN0b3JlTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgSHR0cE1vZHVsZSxcbiAgICBXekdhbGxlcnlCcmVhZGNydW1iQ29tcG9uZW50LFxuICAgIFd6QnJlYWRjcnVtYkNvbXBvbmVudCxcbiAgICBXelBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgQ29sbGVjdGlvblNvcnREZENvbXBvbmVudCxcbiAgICBDb2xsZWN0aW9uRmlsdGVyRGRDb21wb25lbnQsXG4gICAgV3pJdGVtU2VhcmNoRm9ybUNvbXBvbmVudCxcbiAgICBWYWx1ZXNQaXBlLFxuICAgIENvbGxlY3Rpb25Gb3JtQ29tcG9uZW50LFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0ZXJpYWxNb2R1bGUsXG4gICAgV3pQbGF5ZXJNb2R1bGUsXG4gICAgV3pTb3J0Q29tcG9uZW50LFxuICAgIENvbGxlY3Rpb25MaW5rQ29tcG9uZW50LFxuICAgIFd6Q2xpcEJvYXJkRGlyZWN0aXZlLFxuICAgIFd6VGVybXNDb21wb25lbnQsXG4gICAgV3pBc3NldE1vZHVsZSxcbiAgICBXelByaWNpbmdDb21wb25lbnQsXG4gICAgV3pDb21pbmdTb29uQ29tcG9uZW50LFxuICAgIFd6Rm9ybU1vZHVsZSxcbiAgICBXekdhbGxlcnlUd29MZXZlbENvbXBvbmVudCxcbiAgICBXelN1YmNsaXBFZGl0b3JDb21wb25lbnQsXG4gICAgV3pTaXRlQ2hhbmdlckNvbXBvbmVudCxcbiAgICBXekNvbW1lbnRDb21wb25lbnQsXG4gICAgV3pTaGFyZUNvbXBvbmVudCxcbiAgICBXelNoYXJlTGlua0NvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBDb2xsZWN0aW9uTGlua0NvbXBvbmVudCxcbiAgICBDb2xsZWN0aW9uRm9ybUNvbXBvbmVudCxcbiAgICBXelRlcm1zQ29tcG9uZW50LFxuICAgIFd6UHJpY2luZ0NvbXBvbmVudCxcbiAgICBXekNvbWluZ1Nvb25Db21wb25lbnQsXG4gICAgV3pTdWJjbGlwRWRpdG9yQ29tcG9uZW50XG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNoYXJlZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1dBWkVFX1BST1ZJREVSU11cbiAgICB9O1xuICB9XG59XG4iXX0=
