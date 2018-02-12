"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var common_functions_1 = require("./shared/utilities/common.functions");
var AccountActions = require("./store/account/account.actions");
var ActiveCollectionActions = require("./store/active-collection/active-collection.actions");
var ActiveCollectionState = require("./store/active-collection/active-collection.state");
var ActivityActions = require("./store/activity/activity.actions");
var AssetActions = require("./store/asset/asset.actions");
var AssetState = require("./store/asset/asset.state");
var CartActions = require("./store/cart/cart.actions");
var CartState = require("./store/cart/cart.state");
var CheckoutActions = require("./store/checkout/checkout.actions");
var CheckoutState = require("./store/checkout/checkout.state");
var CollectionsActions = require("./store/collections/collections.actions");
var CommentActions = require("./store/comment/comment.actions");
var CommentState = require("./store/comment/comment.state");
var DeliveryOptionsActions = require("./store/delivery-options/delivery-options.actions");
var DeliveryOptionsState = require("./store/delivery-options/delivery-options.state");
var DialogActions = require("./store/dialog/dialog.actions");
var ErrorActions = require("./store/error/error.actions");
var FeeConfigActions = require("./store/fee-config/fee-config.actions");
var FeeConfigState = require("./store/fee-config/fee-config.state");
var HeaderDisplayOptionsActions = require("./store/header-display-options/header-display-options.actions");
var HeaderDisplayOptionsState = require("./store/header-display-options/header-display-options.state");
var InvoiceActions = require("./store/invoice/invoice.actions");
var InvoiceState = require("./store/invoice/invoice.state");
var LoadingIndicatorActions = require("./store/loading-indicator/loading-indicator.actions");
var LoadingIndicatorState = require("./store/loading-indicator/loading-indicator.state");
var MultiLingualActions = require("./store/multi-lingual/multi-lingual.actions");
var MultiLingualState = require("./store/multi-lingual/multi-lingual.state");
var NotifierActions = require("./store/notifier/notifier.actions");
var OrderActions = require("./store/order/order.actions");
var OrderState = require("./store/order/order.state");
var PageDataActions = require("./store/page-data/page-data.actions");
var PricingActions = require("./store/pricing/pricing.actions");
var PricingState = require("./store/pricing/pricing.state");
var PrivacyPolicyActions = require("./store/privacy-policy/privacy-policy.actions");
var PrivacyPolicyState = require("./store/privacy-policy/privacy-policy.state");
var QuoteEditActions = require("./store/quote-edit/quote-edit.actions");
var QuoteEditState = require("./store/quote-edit/quote-edit.state");
var QuoteShowActions = require("./store/quote-show/quote-show.actions");
var QuoteShowState = require("./store/quote-show/quote-show.state");
var RouterActions = require("./store/router/router.actions");
var SearchActions = require("./store/search/search.actions");
var SearchState = require("./store/search/search.state");
var SharingActions = require("./store/sharing/sharing.actions");
var SharingState = require("./store/sharing/sharing.state");
var SnackbarActions = require("./store/snackbar/snackbar.actions");
var SnackbarState = require("./store/snackbar/snackbar.state");
var SpeedPreviewActions = require("./store/speed-preview/speed-preview.actions");
var SpeedPreviewState = require("./store/speed-preview/speed-preview.state");
var UiConfigActions = require("./store/ui-config/ui-config.actions");
var UiConfigState = require("./store/ui-config/ui-config.state");
var UserActions = require("./store/user/user.actions");
var asset_service_1 = require("./store/asset/asset.service");
;
;
;
;
exports.reducers = {
    activeCollection: ActiveCollectionState.reducer,
    asset: AssetState.reducer,
    cart: CartState.reducer,
    checkout: CheckoutState.reducer,
    comment: CommentState.reducer,
    deliveryOptions: DeliveryOptionsState.reducer,
    feeConfig: FeeConfigState.reducer,
    headerDisplayOptions: HeaderDisplayOptionsState.reducer,
    invoice: InvoiceState.reducer,
    loadingIndicator: LoadingIndicatorState.reducer,
    order: OrderState.reducer,
    pricing: PricingState.reducer,
    privacyPolicy: PrivacyPolicyState.reducer,
    multiLingual: MultiLingualState.reducer,
    quoteEdit: QuoteEditState.reducer,
    quoteShow: QuoteShowState.reducer,
    search: SearchState.reducer,
    sharing: SharingState.reducer,
    snackbar: SnackbarState.reducer,
    speedPreview: SpeedPreviewState.reducer,
    uiConfig: UiConfigState.reducer
};
var AppStore = (function () {
    function AppStore(ngrxStore, legacyAssetService) {
        this.ngrxStore = ngrxStore;
        this.legacyAssetService = legacyAssetService;
        this.actionFactory = {
            account: new AccountActions.ActionFactory(),
            activeCollection: new ActiveCollectionActions.ActionFactory(),
            activity: new ActivityActions.ActionFactory(),
            asset: new AssetActions.ActionFactory(),
            cart: new CartActions.ActionFactory(),
            checkout: new CheckoutActions.ActionFactory(),
            collections: new CollectionsActions.ActionFactory(),
            comment: new CommentActions.ActionFactory(),
            deliveryOptions: new DeliveryOptionsActions.ActionFactory(),
            dialog: new DialogActions.ActionFactory(),
            error: new ErrorActions.ActionFactory(),
            feeConfig: new FeeConfigActions.ActionFactory(),
            headerDisplayOptions: new HeaderDisplayOptionsActions.ActionFactory(),
            invoice: new InvoiceActions.ActionFactory(),
            loadingIndicator: new LoadingIndicatorActions.ActionFactory(),
            multiLingual: new MultiLingualActions.ActionFactory(),
            notifier: new NotifierActions.ActionFactory(),
            page: new PageDataActions.ActionFactory(),
            order: new OrderActions.ActionFactory(),
            pricing: new PricingActions.ActionFactory(),
            privacyPolicy: new PrivacyPolicyActions.ActionFactory(),
            quoteEdit: new QuoteEditActions.ActionFactory(),
            quoteShow: new QuoteShowActions.ActionFactory(),
            router: new RouterActions.ActionFactory(),
            search: new SearchActions.ActionFactory(),
            sharing: new SharingActions.ActionFactory(),
            snackbar: new SnackbarActions.ActionFactory(),
            speedPreview: new SpeedPreviewActions.ActionFactory(),
            uiConfig: new UiConfigActions.ActionFactory(),
            user: new UserActions.ActionFactory()
        };
        this.internalActionFactory = {
            account: new AccountActions.InternalActionFactory(),
            activeCollection: new ActiveCollectionActions.InternalActionFactory(),
            activity: new ActivityActions.InternalActionFactory(),
            asset: new AssetActions.InternalActionFactory(),
            cart: new CartActions.InternalActionFactory(),
            checkout: new CheckoutActions.InternalActionFactory(),
            collections: new CollectionsActions.InternalActionFactory(),
            comment: new CommentActions.InternalActionFactory(),
            deliveryOptions: new DeliveryOptionsActions.InternalActionFactory(),
            dialog: new DialogActions.InternalActionFactory(),
            error: new ErrorActions.InternalActionFactory(),
            feeConfig: new FeeConfigActions.InternalActionFactory(),
            headerDisplayOptions: new HeaderDisplayOptionsActions.InternalActionFactory(),
            invoice: new InvoiceActions.InternalActionFactory(),
            loadingIndicator: new LoadingIndicatorActions.InternalActionFactory(),
            multiLingual: new MultiLingualActions.InternalActionFactory(),
            notifier: new NotifierActions.InternalActionFactory(),
            page: new PageDataActions.InternalActionFactory(),
            order: new OrderActions.InternalActionFactory(),
            pricing: new PricingActions.InternalActionFactory(),
            privacyPolicy: new PrivacyPolicyActions.InternalActionFactory(),
            quoteEdit: new QuoteEditActions.InternalActionFactory(),
            quoteShow: new QuoteShowActions.InternalActionFactory(),
            router: new RouterActions.InternalActionFactory(),
            search: new SearchActions.InternalActionFactory(),
            sharing: new SharingActions.InternalActionFactory(),
            snackbar: new SnackbarActions.InternalActionFactory(),
            speedPreview: new SpeedPreviewActions.InternalActionFactory(),
            uiConfig: new UiConfigActions.InternalActionFactory(),
            user: new UserActions.InternalActionFactory(),
        };
        this.initializeLegacyServices();
    }
    AppStore.prototype.dispatch = function (actionFactoryMapper) {
        this.ngrxStore.dispatch(actionFactoryMapper(this.actionFactory));
    };
    AppStore.prototype.create = function (internalActionFactoryMapper) {
        return internalActionFactoryMapper(this.internalActionFactory);
    };
    AppStore.prototype.select = function (stateMapper) {
        return this.ngrxStore.select(stateMapper);
    };
    AppStore.prototype.snapshot = function (stateMapper) {
        var snapshot;
        this.select(stateMapper).take(1).subscribe(function (latest) { return snapshot = latest; });
        return snapshot;
    };
    AppStore.prototype.selectCloned = function (stateMapper) {
        return this.ngrxStore.select(stateMapper).map(function (state) { return common_functions_1.Common.clone(state); });
    };
    AppStore.prototype.snapshotCloned = function (stateMapper) {
        var snapshot;
        this.select(stateMapper).take(1).subscribe(function (latest) { return snapshot = common_functions_1.Common.clone(latest); });
        return snapshot;
    };
    AppStore.prototype.completeSnapshot = function () {
        return this.snapshot(function (state) { return state; });
    };
    AppStore.prototype.match = function (value, stateMapper) {
        return value === this.snapshot(stateMapper);
    };
    AppStore.prototype.blockUntil = function (stateMapper) {
        return this.select(stateMapper).filter(function (selectedValue) { return selectedValue; }).take(1);
    };
    AppStore.prototype.blockUntilMatch = function (value, stateMapper) {
        return this.select(stateMapper).filter(function (selectedValue) { return value === selectedValue; }).take(1).map(function (value) { return null; });
    };
    AppStore.prototype.callLegacyServiceMethod = function (serviceMapper) {
        return serviceMapper(this.legacyService);
    };
    AppStore.prototype.initializeLegacyServices = function () {
        this.legacyService = {
            asset: this.legacyAssetService
        };
    };
    AppStore.decorators = [
        { type: core_1.Injectable },
    ];
    AppStore.ctorParameters = function () { return [
        { type: store_1.Store, },
        { type: asset_service_1.LegacyAssetService, },
    ]; };
    return AppStore;
}());
exports.AppStore = AppStore;
//# sourceMappingURL=app.store.js.map