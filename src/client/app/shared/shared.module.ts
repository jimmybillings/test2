// Shared Angular Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from './modules/wz-design/wz.design.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

// Shared Wazee Modules
import { WzPlayerModule } from './modules/wz-player/wz.player.module';
import { WzFormModule } from './modules/wz-form/wz-form.module';
import { WzAssetModule } from './modules/wz-asset/wz-asset.module';
import { WzDialogModule } from './modules/wz-dialog/wz.dialog.module';

// Shared Pure Components
import { WzBreadcrumbComponent } from './components/wz-breadcrumb/wz.breadcrumb.component';
import { WzPaginationComponent } from './components/wz-pagination/wz.pagination.component';
import { WzClipBoardDirective } from './components/wz-clipboard/wz-clipboard.directive';
import { CollectionSortDdComponent } from '../+collection/components/collections-sort-dd.component';
import { CollectionFilterDdComponent } from '../+collection/components/collections-filter-dd.component';
import { WzItemSearchFormComponent } from './components/wz-item-search-form/wz.item-search-form.component';
import { CollectionFormComponent } from '../application/collection-tray/components/collection-form.component';
import { WzSortComponent } from './components/wz-sort/wz.sort.component';
import { CollectionLinkComponent } from '../+collection/components/collection-link.component';
import { WzTermsComponent } from './components/wz-terms/wz.terms.component';
import { WzPricingComponent } from './components/wz-pricing/wz.pricing.component';
import { WzComingSoonComponent } from './components/wz-coming-soon/wz-coming-soon.component';
import { WzSubclipEditorComponent } from './components/wz-subclip-editor/wz.subclip-editor.component';
import { WzGalleryTwoLevelComponent } from './components/wz-gallery-two-level/wz.gallery-two-level.component';
import { WzGalleryBreadcrumbComponent } from './components/wz-gallery-breadcrumb/wz.gallery-breadcrumb.component';
import { WzSiteChangerComponent } from './components/wz-site-changer/wz-site-changer.component';
import { WzCommentComponent } from './components/wz-comment/wz.comment.component';
import { WzShareComponent } from './components/wz-share/wz.share.component';
import { WzShareLinkComponent } from './components/wz-share-link/wz.share-link.component';

// WAZEE SERVICES
import { ApiConfig } from './services/api.config';
import { TranslateService } from '@ngx-translate/core';
import { CurrentUserService } from './services/current-user.service';
import { UserService } from './services/user.service';
import { SearchContext } from './services/search-context.service';
import { CollectionsService } from './services/collections.service';
import { UserPreferenceService } from './services/user-preference.service';
import { ApiService } from './services/api.service';
import { SortDefinitionsService } from './services/sort-definitions.service';
import { FilterService } from './services/filter.service';
import { Authentication } from './services/authentication.data.service';
import { PendoService } from './services/pendo.service';
import { CartService } from './services/cart.service';
import { OrdersService } from './services/orders.service';
import { CollectionContextService } from './services/collection-context.service';
import { GalleryViewService } from './services/gallery-view.service';
import { WindowRef } from './services/window-ref.service';
import { QuoteService } from './services/quote.service';
import { QuotesService } from './services/quotes.service';
import { AsperaService } from './services/aspera.service';
// New-ish services
import { AccountService } from '../store/account/account.service';
import { ActiveCollectionService } from '../store/active-collection/active-collection.service';
import { ActivityService } from '../store/activity/activity.service';
import { AssetService, LegacyAssetService } from '../store/asset/asset.service';
import { CommentService } from '../store/comment/comment.service';
import { FutureCollectionsService } from '../store/collections/collections.service';
import { DeliveryOptionsService } from '../store/delivery-options/delivery-options.service';
import { FeeConfigService } from '../store/fee-config/fee-config.service';
import { FutureApiService } from '../store/api/api.service';
import { FutureCartService } from '../store/cart/cart.service';
import { FutureQuoteEditService } from '../store/quote-edit/quote-edit.service';
import { FutureQuoteShowService } from '../store/quote-show/quote-show.service';
import { FutureUserService } from '../store/user/user.service';
import { OrderService } from '../store/order/order.service';
import { InvoiceService } from '../store/invoice/invoice.service';
import { PageDataService } from '../store/page-data/page-data.service';
import { PricingService } from '../store/pricing/pricing.service';
import { PrivacyPolicyService } from '../store/privacy-policy/privacy-policy.service';
import { SearchService } from '../store/search/search.service';
import { SharingService } from '../store/sharing/sharing.service';
import { SnackbarService } from '../store/snackbar/snackbar.service';
import { SpeedPreviewService } from '../store/speed-preview/speed-preview.service';
import { UiConfigService } from '../store/ui-config/ui-config.service';

// WAZEE STORES
import {
  AppStore
  // reducers
} from '../app.store';

import * as ActiveCollectionState from '../store/active-collection/active-collection.state';
import * as AssetState from '../store/asset/asset.state';
import * as CartState from '../store/cart/cart.state';
import * as CheckoutState from '../store/checkout/checkout.state';
import * as CommentState from '../store/comment/comment.state';
import * as DeliveryOptionState from '../store/delivery-options/delivery-options.state';
import * as FeeConfigState from '../store/fee-config/fee-config.state';
import * as HeaderDisplayOptions from '../store/header-display-options/header-display-options.state';
import * as InvoiceState from '../store/invoice/invoice.state';
import * as LoadingIndicatorState from '../store/loading-indicator/loading-indicator.state';
import * as MultiLingualState from '../store/multi-lingual/multi-lingual.state';
import * as OrderState from '../store/order/order.state';
import * as PricingState from '../store/pricing/pricing.state';
import * as PrivacyPolicyState from '../store/privacy-policy/privacy-policy.state';
import * as QuoteEditState from '../store/quote-edit/quote-edit.state';
import * as QuoteShowState from '../store/quote-show/quote-show.state';
import * as SearchState from '../store/search/search.state';
import * as SharingState from '../store/sharing/sharing.state';
import * as SnackbarState from '../store/snackbar/snackbar.state';
import * as SpeedPreviewState from '../store/speed-preview/speed-preview.state';
import * as UiConfigState from '../store/ui-config/ui-config.state';

import { collections, CollectionsStore } from './stores/collections.store';
import { orders, OrdersStore } from './stores/orders.store';
import { features, FeatureStore } from './stores/feature.store';
import { gallery, GalleryViewStore } from './stores/gallery-view.store';
import { quotes, QuotesStore } from './stores/quotes.store';
import { currentUser } from './services/current-user.service';
import { Capabilities } from './services/capabilities.service';
import { searchContext } from './services/search-context.service';
import { filters } from './services/filter.service';
import { userPreferences } from './services/user-preference.service';
import { collectionOptions } from './services/collection-context.service';
import { sortDefinitions } from './services/sort-definitions.service';

// WAZEE EFFECTS
import { AccountEffects } from '../store/account/account.effects';
import { ActiveCollectionEffects } from '../store/active-collection/active-collection.effects';
import { ActivityEffects } from '../store/activity/activity.effects';
import { AssetEffects } from '../store/asset/asset.effects';
import { CartEffects } from '../store/cart/cart.effects';
import { CommentEffects } from '../store/comment/comment.effects';
import { CollectionsEffects } from '../store/collections/collections.effects';
import { DeliveryOptionsEffects } from '../store/delivery-options/delivery-options.effects';
import { DialogEffects } from '../store/dialog/dialog.effects';
import { ErrorEffects } from '../store/error/error.effects';
import { FeeConfigEffects } from '../store/fee-config/fee-config.effects';
import { HeaderDisplayOptionsEffects } from '../store/header-display-options/header-display-options.effects';
import { InvoiceEffects } from '../store/invoice/invoice.effects';
import { MultiLingualEffects } from '../store/multi-lingual/multi-lingual.effects';
import { NotifierEffects } from '../store/notifier/notifier.effects';
import { OrderEffects } from '../store/order/order.effects';
import { PageDataEffects } from '../store/page-data/page-data.effects';
import { PricingEffects } from '../store/pricing/pricing.effects';
import { PrivacyPolicyEffects } from '../store/privacy-policy/privacy-policy.effects';
import { QuoteEditEffects } from '../store/quote-edit/quote-edit.effects';
import { QuoteShowEffects } from '../store/quote-show/quote-show.effects';
import { RouterEffects } from '../store/router/router.effects';
import { SearchEffects } from '../store/search/search.effects';
import { SharingEffects } from '../store/sharing/sharing.effects';
import { SnackbarEffects } from '../store/snackbar/snackbar.effects';
import { SpeedPreviewEffects } from '../store/speed-preview/speed-preview.effects';
import { UiConfigEffects } from '../store/ui-config/ui-config.effects';
import { UserEffects } from '../store/user/user.effects';

const WAZEE_SERVICES = [
  AccountService,
  ActivityService,
  ApiConfig,
  CurrentUserService,
  AssetService,
  CollectionsService,
  FutureCollectionsService,
  ActiveCollectionService,
  SearchContext,
  UserPreferenceService,
  CollectionContextService,
  ApiService,
  FutureApiService,
  SortDefinitionsService,
  Capabilities,
  FilterService,
  Authentication,
  PendoService,
  CartService,
  UserService,
  OrderService,
  InvoiceService,
  OrdersService,
  TranslateService,
  GalleryViewService,
  WindowRef,
  FutureQuoteEditService,
  FutureQuoteShowService,
  QuoteService,
  QuotesService,
  SearchService,
  SharingService,
  SnackbarService,
  CommentService,
  DeliveryOptionsService,
  FutureCartService,
  SpeedPreviewService,
  UiConfigService,
  PricingService,
  AsperaService,
  FeeConfigService,
  FutureUserService,
  PrivacyPolicyService,
  PageDataService,
  // Temporary legacy services accessed through AppStore
  LegacyAssetService
];

const WAZEE_STORE_INTERFACES = [
  CollectionsStore,
  FeatureStore,
  OrdersStore,
  GalleryViewStore,
  QuotesStore
];

const WAZEE_PROVIDERS: any = [
  AppStore,
  ...WAZEE_SERVICES,
  ...WAZEE_STORE_INTERFACES
];


const WAZEE_STORES: any = {
  currentUser: currentUser,
  searchContext: searchContext,
  collections: collections,
  filters: filters,
  userPreferences: userPreferences,
  collectionOptions: collectionOptions,
  sortDefinitions: sortDefinitions,
  orders: orders,
  features: features,
  gallery: gallery,
  quotes: quotes,
  // REDUX 200000.0.0
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

const WAZEE_EFFECTS = EffectsModule.forRoot([
  AccountEffects,
  ActiveCollectionEffects,
  ActivityEffects,
  AssetEffects,
  CartEffects,
  CollectionsEffects,
  CommentEffects,
  DeliveryOptionsEffects,
  DialogEffects,
  ErrorEffects,
  FeeConfigEffects,
  HeaderDisplayOptionsEffects,
  InvoiceEffects,
  MultiLingualEffects,
  NotifierEffects,
  OrderEffects,
  PageDataEffects,
  PricingEffects,
  PrivacyPolicyEffects,
  QuoteEditEffects,
  QuoteShowEffects,
  RouterEffects,
  SearchEffects,
  SharingEffects,
  SnackbarEffects,
  SpeedPreviewEffects,
  UiConfigEffects,
  UserEffects
]);

// Shared pipes
import { ValuesPipe } from './pipes/values.pipe';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'https://', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // HttpModule,
    // HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    MaterialModule,
    WzPlayerModule,
    WzFormModule,
    // WzAssetModule,
    WzDialogModule,
    StoreModule.forRoot(WAZEE_STORES),  // Eventually this will be just the reducers object from app.store.ts
    // TODO: Get StoreDevtoolsModule out of production!!!  (Looks scary, though:
    // https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md)
    StoreDevtoolsModule.instrument(),
    WAZEE_EFFECTS
  ],
  declarations: [
    WzGalleryBreadcrumbComponent,
    WzBreadcrumbComponent,
    WzPaginationComponent,
    CollectionSortDdComponent,
    CollectionFilterDdComponent,
    WzItemSearchFormComponent,
    ValuesPipe,
    CollectionFormComponent,
    WzSortComponent,
    CollectionLinkComponent,
    WzClipBoardDirective,
    WzTermsComponent,
    WzPricingComponent,
    WzComingSoonComponent,
    WzGalleryTwoLevelComponent,
    WzSubclipEditorComponent,
    WzSiteChangerComponent,
    WzCommentComponent,
    WzShareComponent,
    WzShareLinkComponent
  ],
  exports: [
    StoreModule,
    HttpClientModule,
    HttpModule,
    WzGalleryBreadcrumbComponent,
    WzBreadcrumbComponent,
    WzPaginationComponent,
    CollectionSortDdComponent,
    CollectionFilterDdComponent,
    WzItemSearchFormComponent,
    ValuesPipe,
    CollectionFormComponent,
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    WzPlayerModule,
    WzSortComponent,
    CollectionLinkComponent,
    WzClipBoardDirective,
    WzTermsComponent,
    WzAssetModule,
    WzPricingComponent,
    WzComingSoonComponent,
    WzFormModule,
    WzGalleryTwoLevelComponent,
    WzSubclipEditorComponent,
    WzSiteChangerComponent,
    WzCommentComponent,
    WzShareComponent,
    WzShareLinkComponent
  ],
  entryComponents: [
    CollectionLinkComponent,
    CollectionFormComponent,
    WzTermsComponent,
    WzPricingComponent,
    WzComingSoonComponent,
    WzSubclipEditorComponent
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [WAZEE_PROVIDERS]
    };
  }
}
