/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from './collection.module';
import * as i2 from '../../node_modules/@angular/material/dialog/typings/index.ngfactory';
import * as i3 from '../../node_modules/@angular/material/datepicker/typings/index.ngfactory';
import * as i4 from '../../node_modules/@angular/material/tooltip/typings/index.ngfactory';
import * as i5 from '../../node_modules/@angular/material/snack-bar/typings/index.ngfactory';
import * as i6 from '../shared/modules/wz-form/components/wz-address-form/wz.address-form.component.ngfactory';
import * as i7 from '../shared/modules/wz-dialog/components/wz.notification-dialog.component.ngfactory';
import * as i8 from '../shared/modules/wz-dialog/components/wz.form-dialog.component.ngfactory';
import * as i9 from '../shared/modules/wz-dialog/components/wz.confirmation-dialog.component.ngfactory';
import * as i10 from '../shared/modules/wz-asset/wz-speedview/wz.speedview.component.ngfactory';
import * as i11 from './components/collection-link.component.ngfactory';
import * as i12 from '../application/collection-tray/components/collection-form.component.ngfactory';
import * as i13 from '../shared/components/wz-terms/wz.terms.component.ngfactory';
import * as i14 from '../shared/components/wz-pricing/wz.pricing.component.ngfactory';
import * as i15 from '../shared/components/wz-coming-soon/wz-coming-soon.component.ngfactory';
import * as i16 from '../shared/components/wz-subclip-editor/wz.subclip-editor.component.ngfactory';
import * as i17 from '../+asset/components/asset-share.component.ngfactory';
import * as i18 from './collection.component.ngfactory';
import * as i19 from './+index/collections.component.ngfactory';
import * as i20 from './+show/collection-show.component.ngfactory';
import * as i21 from './components/collection-asset.component.ngfactory';
import * as i22 from './components/collection-share-members.component.ngfactory';
import * as i23 from './components/collection-share.component.ngfactory';
import * as i24 from '@angular/common';
import * as i25 from '@angular/forms';
import * as i26 from '@angular/cdk/bidi';
import * as i27 from '@angular/platform-browser';
import * as i28 from '@angular/cdk/a11y';
import * as i29 from '@angular/cdk/platform';
import * as i30 from '@angular/cdk/collections';
import * as i31 from '@angular/cdk/observers';
import * as i32 from '@angular/cdk/overlay';
import * as i33 from '@angular/http';
import * as i34 from '@angular/material/icon';
import * as i35 from '@angular/material/datepicker';
import * as i36 from '@angular/material/core';
import * as i37 from '@angular/material/menu';
import * as i38 from '@angular/material/select';
import * as i39 from '@angular/material/tooltip';
import * as i40 from '@angular/material/paginator';
import * as i41 from '@angular/material/snack-bar';
import * as i42 from '../shared/modules/wz-form/wz.form.model';
import * as i43 from '../shared/modules/wz-form/services/google-places.service';
import * as i44 from '../shared/services/window-ref.service';
import * as i45 from '@ngrx/store';
import * as i46 from '@ngrx/store-devtools';
import * as i47 from './services/collection-show.resolver';
import * as i48 from '../app.store';
import * as i49 from './services/collection-guard';
import * as i50 from '../shared/services/capabilities.service';
import * as i51 from '../shared/services/current-user.service';
import * as i52 from '@angular/router';
import * as i53 from './services/collection-asset.resolver';
import * as i54 from './services/collections.resolver';
import * as i55 from '../shared/services/collections.service';
import * as i56 from '@ngx-translate/core/index';
import * as i57 from '@angular/material/button';
import * as i58 from '@angular/material/button-toggle';
import * as i59 from '@angular/material/card';
import * as i60 from '@angular/material/checkbox';
import * as i61 from '@angular/cdk/portal';
import * as i62 from '@angular/cdk/scrolling';
import * as i63 from '@angular/material/dialog';
import * as i64 from '@angular/material/form-field';
import * as i65 from '@angular/material/grid-list';
import * as i66 from '@angular/material/input';
import * as i67 from '@angular/material/list';
import * as i68 from '@angular/material/progress-bar';
import * as i69 from '@angular/material/progress-spinner';
import * as i70 from '@angular/material/radio';
import * as i71 from '@angular/material/sidenav';
import * as i72 from '@angular/material/slide-toggle';
import * as i73 from '@angular/material/slider';
import * as i74 from '@angular/material/tabs';
import * as i75 from '@angular/material/toolbar';
import * as i76 from '../shared/modules/wz-design/wz.design.module';
import * as i77 from '../shared/modules/wz-player/wz.player.module';
import * as i78 from '../shared/modules/wz-form/wz-form.module';
import * as i79 from '../shared/modules/wz-dialog/wz.dialog.module';
import * as i80 from '../shared/services/search-context.service';
import * as i81 from '../shared/stores/collections.store';
import * as i82 from '../shared/services/filter.service';
import * as i83 from '../shared/services/user-preference.service';
import * as i84 from '../shared/services/collection-context.service';
import * as i85 from '../shared/services/sort-definitions.service';
import * as i86 from '../shared/stores/orders.store';
import * as i87 from '../shared/stores/feature.store';
import * as i88 from '../shared/stores/gallery-view.store';
import * as i89 from '../shared/stores/quotes.store';
import * as i90 from '../store/active-collection/active-collection.state';
import * as i91 from '../store/asset/asset.state';
import * as i92 from '../store/cart/cart.state';
import * as i93 from '../store/checkout/checkout.state';
import * as i94 from '../store/comment/comment.state';
import * as i95 from '../store/delivery-options/delivery-options.state';
import * as i96 from '../store/header-display-options/header-display-options.state';
import * as i97 from '../store/invoice/invoice.state';
import * as i98 from '../store/loading-indicator/loading-indicator.state';
import * as i99 from '../store/multi-lingual/multi-lingual.state';
import * as i100 from '../store/order/order.state';
import * as i101 from '../store/pricing/pricing.state';
import * as i102 from '../store/privacy-policy/privacy-policy.state';
import * as i103 from '../store/quote-edit/quote-edit.state';
import * as i104 from '../store/quote-show/quote-show.state';
import * as i105 from '../store/search/search.state';
import * as i106 from '../store/sharing/sharing.state';
import * as i107 from '../store/snackbar/snackbar.state';
import * as i108 from '../store/speed-preview/speed-preview.state';
import * as i109 from '../store/ui-config/ui-config.state';
import * as i110 from '../store/fee-config/fee-config.state';
import * as i111 from '@ngrx/effects';
import * as i112 from '../store/account/account.effects';
import * as i113 from '../store/account/account.service';
import * as i114 from '../store/active-collection/active-collection.effects';
import * as i115 from '../store/active-collection/active-collection.service';
import * as i116 from '../store/activity/activity.effects';
import * as i117 from '../store/activity/activity.service';
import * as i118 from '../store/asset/asset.effects';
import * as i119 from '../store/asset/asset.service';
import * as i120 from '../store/cart/cart.effects';
import * as i121 from '../store/cart/cart.service';
import * as i122 from '../store/collections/collections.effects';
import * as i123 from '../store/collections/collections.service';
import * as i124 from '../store/comment/comment.effects';
import * as i125 from '../store/comment/comment.service';
import * as i126 from '../store/delivery-options/delivery-options.effects';
import * as i127 from '../store/delivery-options/delivery-options.service';
import * as i128 from '../shared/modules/wz-dialog/services/wz.dialog.service';
import * as i129 from '../store/dialog/dialog.effects';
import * as i130 from '../store/error/error.effects';
import * as i131 from '../store/fee-config/fee-config.effects';
import * as i132 from '../store/fee-config/fee-config.service';
import * as i133 from '../store/header-display-options/header-display-options.effects';
import * as i134 from '../store/invoice/invoice.effects';
import * as i135 from '../store/invoice/invoice.service';
import * as i136 from '@ngx-translate/core/src/translate.store';
import * as i137 from '@angular/common/http';
import * as i138 from '@ngx-translate/core/src/translate.loader';
import * as i139 from '../shared/shared.module';
import * as i140 from '@ngx-translate/core/src/translate.compiler';
import * as i141 from '@ngx-translate/core/src/translate.parser';
import * as i142 from '@ngx-translate/core/src/missing-translation-handler';
import * as i143 from '@ngx-translate/core/src/translate.service';
import * as i144 from '../store/multi-lingual/multi-lingual.effects';
import * as i145 from '../shared/services/api.config';
import * as i146 from '../store/notifier/notifier.effects';
import * as i147 from '../store/order/order.effects';
import * as i148 from '../store/order/order.service';
import * as i149 from '../store/page-data/page-data.effects';
import * as i150 from '../store/page-data/page-data.service';
import * as i151 from '../store/pricing/pricing.effects';
import * as i152 from '../store/pricing/pricing.service';
import * as i153 from '../store/privacy-policy/privacy-policy.effects';
import * as i154 from '../store/privacy-policy/privacy-policy.service';
import * as i155 from '../store/quote-edit/quote-edit.effects';
import * as i156 from '../store/quote-edit/quote-edit.service';
import * as i157 from '../store/quote-show/quote-show.effects';
import * as i158 from '../store/quote-show/quote-show.service';
import * as i159 from '../store/router/router.effects';
import * as i160 from '../store/search/search.effects';
import * as i161 from '../store/search/search.service';
import * as i162 from '../store/sharing/sharing.effects';
import * as i163 from '../store/sharing/sharing.service';
import * as i164 from '../store/snackbar/snackbar.effects';
import * as i165 from '../store/snackbar/snackbar.service';
import * as i166 from '../store/speed-preview/speed-preview.effects';
import * as i167 from '../store/speed-preview/speed-preview.service';
import * as i168 from '../store/ui-config/ui-config.effects';
import * as i169 from '../store/ui-config/ui-config.service';
import * as i170 from '../store/user/user.effects';
import * as i171 from '../store/user/user.service';
import * as i172 from '../shared/modules/wz-asset/wz-asset.module';
import * as i173 from '../+asset/asset.module';
import * as i174 from './collection.component';
import * as i175 from './+index/collections.component';
import * as i176 from './+show/collection-show.component';
import * as i177 from './components/collection-asset.component';
export const CollectionModuleNgFactory:i0.NgModuleFactory<i1.CollectionModule> = i0.ɵcmf(i1.CollectionModule,
    ([] as any[]),(_l:any) => {
      return i0.ɵmod([i0.ɵmpd(512,i0.ComponentFactoryResolver,i0.ɵCodegenComponentFactoryResolver,
          [[8,[i2.MatDialogContainerNgFactory,i3.MatDatepickerContentNgFactory,i4.TooltipComponentNgFactory,
              i5.MatSnackBarContainerNgFactory,i5.SimpleSnackBarNgFactory,i6.WzAddressFormComponentNgFactory,
              i7.WzNotificationDialogComponentNgFactory,i8.WzFormDialogComponentNgFactory,
              i9.WzConfirmationDialogComponentNgFactory,i10.WzSpeedviewComponentNgFactory,
              i11.CollectionLinkComponentNgFactory,i12.CollectionFormComponentNgFactory,
              i13.WzTermsComponentNgFactory,i14.WzPricingComponentNgFactory,i15.WzComingSoonComponentNgFactory,
              i16.WzSubclipEditorComponentNgFactory,i17.AssetShareComponentNgFactory,
              i18.CollectionComponentNgFactory,i19.CollectionsComponentNgFactory,i20.CollectionShowComponentNgFactory,
              i21.CollectionAssetComponentNgFactory,i22.CollectionShareMembersComponentNgFactory,
              i23.CollectionShareComponentNgFactory]],[3,i0.ComponentFactoryResolver],
              i0.NgModuleRef]),i0.ɵmpd(4608,i24.NgLocalization,i24.NgLocaleLocalization,
          [i0.LOCALE_ID]),i0.ɵmpd(4608,i25.ɵi,i25.ɵi,([] as any[])),i0.ɵmpd(4608,i25.FormBuilder,
          i25.FormBuilder,([] as any[])),i0.ɵmpd(6144,i26.DIR_DOCUMENT,(null as any),
          [i27.DOCUMENT]),i0.ɵmpd(4608,i26.Directionality,i26.Directionality,[[2,i26.DIR_DOCUMENT]]),
          i0.ɵmpd(4608,i28.InteractivityChecker,i28.InteractivityChecker,[i29.Platform]),
          i0.ɵmpd(4608,i28.FocusTrapFactory,i28.FocusTrapFactory,[i28.InteractivityChecker,
              i29.Platform,i0.NgZone]),i0.ɵmpd(136192,i28.AriaDescriber,i28.ARIA_DESCRIBER_PROVIDER_FACTORY,
              [[3,i28.AriaDescriber],i29.Platform]),i0.ɵmpd(5120,i28.LiveAnnouncer,
              i28.LIVE_ANNOUNCER_PROVIDER_FACTORY,[[3,i28.LiveAnnouncer],[2,i28.LIVE_ANNOUNCER_ELEMENT_TOKEN],
                  i29.Platform]),i0.ɵmpd(5120,i28.FocusMonitor,i28.FOCUS_MONITOR_PROVIDER_FACTORY,
              [[3,i28.FocusMonitor],i0.NgZone,i29.Platform]),i0.ɵmpd(5120,i30.UniqueSelectionDispatcher,
              i30.ɵa,[[3,i30.UniqueSelectionDispatcher]]),i0.ɵmpd(4608,i31.MatMutationObserverFactory,
              i31.MatMutationObserverFactory,([] as any[])),i0.ɵmpd(5120,i32.ɵc,i32.ɵd,
              [i32.Overlay]),i0.ɵmpd(4608,i33.BrowserXhr,i33.BrowserXhr,([] as any[])),
          i0.ɵmpd(4608,i33.ResponseOptions,i33.BaseResponseOptions,([] as any[])),
          i0.ɵmpd(5120,i33.XSRFStrategy,i33.ɵb,([] as any[])),i0.ɵmpd(4608,i33.XHRBackend,
              i33.XHRBackend,[i33.BrowserXhr,i33.ResponseOptions,i33.XSRFStrategy]),
          i0.ɵmpd(4608,i33.RequestOptions,i33.BaseRequestOptions,([] as any[])),i0.ɵmpd(5120,
              i33.Http,i33.ɵc,[i33.XHRBackend,i33.RequestOptions]),i0.ɵmpd(5120,i34.MatIconRegistry,
              i34.ICON_REGISTRY_PROVIDER_FACTORY,[[3,i34.MatIconRegistry],[2,i33.Http],
                  i27.DomSanitizer]),i0.ɵmpd(4608,i35.MatDatepickerIntl,i35.MatDatepickerIntl,
              ([] as any[])),i0.ɵmpd(5120,i35.MAT_DATEPICKER_SCROLL_STRATEGY,i35.MAT_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i32.Overlay]),i0.ɵmpd(4608,i36.ErrorStateMatcher,i36.ErrorStateMatcher,
              ([] as any[])),i0.ɵmpd(5120,i37.MAT_MENU_SCROLL_STRATEGY,i37.ɵc22,[i32.Overlay]),
          i0.ɵmpd(5120,i38.MAT_SELECT_SCROLL_STRATEGY,i38.MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i32.Overlay]),i0.ɵmpd(5120,i39.MAT_TOOLTIP_SCROLL_STRATEGY,i39.MAT_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i32.Overlay]),i0.ɵmpd(4608,i40.MatPaginatorIntl,i40.MatPaginatorIntl,
              ([] as any[])),i0.ɵmpd(4608,i27.HAMMER_GESTURE_CONFIG,i36.GestureConfig,
              ([] as any[])),i0.ɵmpd(4608,i41.MatSnackBar,i41.MatSnackBar,[i32.Overlay,
              i28.LiveAnnouncer,i0.Injector,[3,i41.MatSnackBar]]),i0.ɵmpd(6144,i36.MAT_DATE_LOCALE,
              (null as any),[i0.LOCALE_ID]),i0.ɵmpd(4608,i36.DateAdapter,i36.NativeDateAdapter,
              [[2,i36.MAT_DATE_LOCALE]]),i0.ɵmpd(4608,i42.FormModel,i42.FormModel,
              ([] as any[])),i0.ɵmpd(4608,i43.GooglePlacesService,i43.GooglePlacesService,
              [i44.WindowRef,i27.DOCUMENT]),i0.ɵmpd(135680,i45.State,i45.State,[i45.ActionsSubject,
              i45.ReducerObservable,i45.ScannedActionsSubject,i45.INITIAL_STATE]),
          i0.ɵmpd(5120,i46.ɵa,i46.ɵb,[i46.ɵj,i46.ɵh]),i0.ɵmpd(4608,i47.CollectionShowResolver,
              i47.CollectionShowResolver,[i48.AppStore]),i0.ɵmpd(4608,i49.CollectionGuard,
              i49.CollectionGuard,[i50.Capabilities,i51.CurrentUserService,i52.Router,
                  i48.AppStore]),i0.ɵmpd(4608,i53.CollectionAssetResolver,i53.CollectionAssetResolver,
              [i48.AppStore]),i0.ɵmpd(4608,i54.CollectionsResolver,i54.CollectionsResolver,
              [i55.CollectionsService]),i0.ɵmpd(512,i24.CommonModule,i24.CommonModule,
              ([] as any[])),i0.ɵmpd(512,i52.RouterModule,i52.RouterModule,[[2,i52.ɵa],
              [2,i52.Router]]),i0.ɵmpd(512,i25.ɵba,i25.ɵba,([] as any[])),i0.ɵmpd(512,
              i25.FormsModule,i25.FormsModule,([] as any[])),i0.ɵmpd(512,i56.TranslateModule,
              i56.TranslateModule,([] as any[])),i0.ɵmpd(512,i25.ReactiveFormsModule,
              i25.ReactiveFormsModule,([] as any[])),i0.ɵmpd(512,i36.CompatibilityModule,
              i36.CompatibilityModule,([] as any[])),i0.ɵmpd(512,i26.BidiModule,i26.BidiModule,
              ([] as any[])),i0.ɵmpd(256,i36.MATERIAL_SANITY_CHECKS,true,([] as any[])),
          i0.ɵmpd(512,i36.MatCommonModule,i36.MatCommonModule,[[2,i36.MATERIAL_SANITY_CHECKS]]),
          i0.ɵmpd(512,i29.PlatformModule,i29.PlatformModule,([] as any[])),i0.ɵmpd(512,
              i36.MatRippleModule,i36.MatRippleModule,([] as any[])),i0.ɵmpd(512,i28.A11yModule,
              i28.A11yModule,([] as any[])),i0.ɵmpd(512,i57.MatButtonModule,i57.MatButtonModule,
              ([] as any[])),i0.ɵmpd(512,i58.MatButtonToggleModule,i58.MatButtonToggleModule,
              ([] as any[])),i0.ɵmpd(512,i59.MatCardModule,i59.MatCardModule,([] as any[])),
          i0.ɵmpd(512,i31.ObserversModule,i31.ObserversModule,([] as any[])),i0.ɵmpd(512,
              i60.MatCheckboxModule,i60.MatCheckboxModule,([] as any[])),i0.ɵmpd(512,
              i61.PortalModule,i61.PortalModule,([] as any[])),i0.ɵmpd(512,i62.ScrollDispatchModule,
              i62.ScrollDispatchModule,([] as any[])),i0.ɵmpd(512,i32.OverlayModule,
              i32.OverlayModule,([] as any[])),i0.ɵmpd(512,i63.MatDialogModule,i63.MatDialogModule,
              ([] as any[])),i0.ɵmpd(512,i34.MatIconModule,i34.MatIconModule,([] as any[])),
          i0.ɵmpd(512,i35.MatDatepickerModule,i35.MatDatepickerModule,([] as any[])),
          i0.ɵmpd(512,i64.MatFormFieldModule,i64.MatFormFieldModule,([] as any[])),
          i0.ɵmpd(512,i36.MatLineModule,i36.MatLineModule,([] as any[])),i0.ɵmpd(512,
              i65.MatGridListModule,i65.MatGridListModule,([] as any[])),i0.ɵmpd(512,
              i66.MatInputModule,i66.MatInputModule,([] as any[])),i0.ɵmpd(512,i36.MatPseudoCheckboxModule,
              i36.MatPseudoCheckboxModule,([] as any[])),i0.ɵmpd(512,i67.MatListModule,
              i67.MatListModule,([] as any[])),i0.ɵmpd(512,i37.MatMenuModule,i37.MatMenuModule,
              ([] as any[])),i0.ɵmpd(512,i36.MatOptionModule,i36.MatOptionModule,([] as any[])),
          i0.ɵmpd(512,i38.MatSelectModule,i38.MatSelectModule,([] as any[])),i0.ɵmpd(512,
              i39.MatTooltipModule,i39.MatTooltipModule,([] as any[])),i0.ɵmpd(512,
              i40.MatPaginatorModule,i40.MatPaginatorModule,([] as any[])),i0.ɵmpd(512,
              i68.MatProgressBarModule,i68.MatProgressBarModule,([] as any[])),i0.ɵmpd(512,
              i69.MatProgressSpinnerModule,i69.MatProgressSpinnerModule,([] as any[])),
          i0.ɵmpd(512,i70.MatRadioModule,i70.MatRadioModule,([] as any[])),i0.ɵmpd(512,
              i71.MatSidenavModule,i71.MatSidenavModule,([] as any[])),i0.ɵmpd(512,
              i72.MatSlideToggleModule,i72.MatSlideToggleModule,([] as any[])),i0.ɵmpd(512,
              i73.MatSliderModule,i73.MatSliderModule,([] as any[])),i0.ɵmpd(512,i41.MatSnackBarModule,
              i41.MatSnackBarModule,([] as any[])),i0.ɵmpd(512,i74.MatTabsModule,i74.MatTabsModule,
              ([] as any[])),i0.ɵmpd(512,i75.MatToolbarModule,i75.MatToolbarModule,
              ([] as any[])),i0.ɵmpd(512,i36.NativeDateModule,i36.NativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i36.MatNativeDateModule,i36.MatNativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i76.MaterialModule,i76.MaterialModule,([] as any[])),
          i0.ɵmpd(512,i77.WzPlayerModule,i77.WzPlayerModule,([] as any[])),i0.ɵmpd(512,
              i78.WzFormModule,i78.WzFormModule,([] as any[])),i0.ɵmpd(512,i79.WzDialogModule,
              i79.WzDialogModule,([] as any[])),i0.ɵmpd(131584,i45.ActionsSubject,
              i45.ActionsSubject,([] as any[])),i0.ɵmpd(131584,i46.ɵg,i46.ɵg,([] as any[])),
          i0.ɵmpd(2048,i45.ReducerManagerDispatcher,(null as any),[i46.ɵg]),i0.ɵmpd(256,
              i45._INITIAL_STATE,(undefined as any),([] as any[])),i0.ɵmpd(1024,i45.INITIAL_STATE,
              i45._initialStateFactory,[i45._INITIAL_STATE]),i0.ɵmpd(256,i45._INITIAL_REDUCERS,
              {currentUser:i51.currentUser,searchContext:i80.searchContext,collections:i81.collections,
                  filters:i82.filters,userPreferences:i83.userPreferences,collectionOptions:i84.collectionOptions,
                  sortDefinitions:i85.sortDefinitions,orders:i86.orders,features:i87.features,
                  gallery:i88.gallery,quotes:i89.quotes,activeCollection:i90.reducer,
                  asset:i91.reducer,cart:i92.reducer,checkout:i93.reducer,comment:i94.reducer,
                  deliveryOptions:i95.reducer,headerDisplayOptions:i96.reducer,invoice:i97.reducer,
                  loadingIndicator:i98.reducer,multiLingual:i99.reducer,order:i100.reducer,
                  pricing:i101.reducer,privacyPolicy:i102.reducer,quoteEdit:i103.reducer,
                  quoteShow:i104.reducer,search:i105.reducer,sharing:i106.reducer,
                  snackbar:i107.reducer,speedPreview:i108.reducer,uiConfig:i109.reducer,
                  feeConfig:i110.reducer},([] as any[])),i0.ɵmpd(2048,i45._STORE_REDUCERS,
              (null as any),[i45._INITIAL_REDUCERS]),i0.ɵmpd(1024,i45.INITIAL_REDUCERS,
              i45._createStoreReducers,[i0.Injector,i45._INITIAL_REDUCERS,i45._STORE_REDUCERS]),
          i0.ɵmpd(256,i45._REDUCER_FACTORY,i45.combineReducers,([] as any[])),i0.ɵmpd(256,
              i45.META_REDUCERS,([] as any[]),([] as any[])),i0.ɵmpd(1024,i45.REDUCER_FACTORY,
              i45.createReducerFactory,[i45._REDUCER_FACTORY,i45.META_REDUCERS]),i0.ɵmpd(131584,
              i45.ReducerManager,i45.ReducerManager,[i45.ReducerManagerDispatcher,
                  i45.INITIAL_STATE,i45.INITIAL_REDUCERS,i45.REDUCER_FACTORY]),i0.ɵmpd(2048,
              i45.ReducerObservable,(null as any),[i45.ReducerManager]),i0.ɵmpd(131584,
              i45.ScannedActionsSubject,i45.ScannedActionsSubject,([] as any[])),i0.ɵmpd(512,
              i45.StoreRootModule,i45.StoreRootModule,[i45.ActionsSubject,i45.ReducerObservable,
                  i45.ScannedActionsSubject]),i0.ɵmpd(512,i46.StoreDevtoolsModule,
              i46.StoreDevtoolsModule,([] as any[])),i0.ɵmpd(1024,i111.ɵf,i111.ɵb,
              ([] as any[])),i0.ɵmpd(512,i111.ɵh,i111.ɵh,[i111.ɵf]),i0.ɵmpd(512,i111.EffectSources,
              i111.EffectSources,[i111.ɵh]),i0.ɵmpd(1024,i46.ɵj,i46.ɵc,([] as any[])),
          i0.ɵmpd(512,i46.ɵk,i46.ɵk,[i46.ɵj]),i0.ɵmpd(256,i46.ɵi,{},([] as any[])),
          i0.ɵmpd(1024,i46.ɵh,i46.ɵf,[i46.ɵi]),i0.ɵmpd(512,i46.StoreDevtools,i46.StoreDevtools,
              [i46.ɵg,i45.ActionsSubject,i45.ReducerObservable,i46.ɵk,i45.ScannedActionsSubject,
                  i45.INITIAL_STATE,i46.ɵh]),i0.ɵmpd(1024,i45.StateObservable,i46.ɵd,
              [i46.StoreDevtools]),i0.ɵmpd(512,i45.Store,i45.Store,[i45.StateObservable,
              i45.ActionsSubject,i45.ReducerManager]),i0.ɵmpd(131584,i111.ɵi,i111.ɵi,
              [i111.EffectSources,i45.Store]),i0.ɵmpd(512,i111.Actions,i111.Actions,
              [i45.ScannedActionsSubject]),i0.ɵmpd(512,i112.AccountEffects,i112.AccountEffects,
              [i111.Actions,i48.AppStore,i113.AccountService]),i0.ɵmpd(512,i114.ActiveCollectionEffects,
              i114.ActiveCollectionEffects,[i111.Actions,i48.AppStore,i115.ActiveCollectionService,
                  i83.UserPreferenceService]),i0.ɵmpd(512,i116.ActivityEffects,i116.ActivityEffects,
              [i111.Actions,i117.ActivityService]),i0.ɵmpd(512,i118.AssetEffects,i118.AssetEffects,
              [i111.Actions,i48.AppStore,i119.AssetService]),i0.ɵmpd(512,i120.CartEffects,
              i120.CartEffects,[i111.Actions,i48.AppStore,i121.FutureCartService]),
          i0.ɵmpd(512,i122.CollectionsEffects,i122.CollectionsEffects,[i111.Actions,
              i48.AppStore,i123.FutureCollectionsService]),i0.ɵmpd(512,i124.CommentEffects,
              i124.CommentEffects,[i111.Actions,i48.AppStore,i125.CommentService]),
          i0.ɵmpd(512,i126.DeliveryOptionsEffects,i126.DeliveryOptionsEffects,[i111.Actions,
              i48.AppStore,i127.DeliveryOptionsService,i44.WindowRef]),i0.ɵmpd(512,
              i29.Platform,i29.Platform,([] as any[])),i0.ɵmpd(1024,i62.ScrollDispatcher,
              i62.SCROLL_DISPATCHER_PROVIDER_FACTORY,[[3,i62.ScrollDispatcher],i0.NgZone,
                  i29.Platform]),i0.ɵmpd(1024,i62.ViewportRuler,i62.VIEWPORT_RULER_PROVIDER_FACTORY,
              [[3,i62.ViewportRuler],i29.Platform,i0.NgZone,i62.ScrollDispatcher]),
          i0.ɵmpd(512,i32.ScrollStrategyOptions,i32.ScrollStrategyOptions,[i62.ScrollDispatcher,
              i62.ViewportRuler]),i0.ɵmpd(1024,i32.OverlayContainer,i32.ɵa,[[3,i32.OverlayContainer]]),
          i0.ɵmpd(512,i32.ɵf,i32.ɵf,[i62.ViewportRuler]),i0.ɵmpd(512,i32.Overlay,i32.Overlay,
              [i32.ScrollStrategyOptions,i32.OverlayContainer,i0.ComponentFactoryResolver,
                  i32.ɵf,i0.ApplicationRef,i0.Injector,i0.NgZone]),i0.ɵmpd(1024,i63.MAT_DIALOG_SCROLL_STRATEGY,
              i63.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,[i32.Overlay]),i0.ɵmpd(512,
              i63.MatDialog,i63.MatDialog,[i32.Overlay,i0.Injector,[2,i24.Location],
                  i63.MAT_DIALOG_SCROLL_STRATEGY,[3,i63.MatDialog]]),i0.ɵmpd(512,i128.WzDialogService,
              i128.WzDialogService,[i63.MatDialog]),i0.ɵmpd(512,i129.DialogEffects,
              i129.DialogEffects,[i111.Actions,i48.AppStore,i128.WzDialogService]),
          i0.ɵmpd(512,i130.ErrorEffects,i130.ErrorEffects,[i111.Actions,i48.AppStore,
              i51.CurrentUserService,i24.Location]),i0.ɵmpd(512,i131.FeeConfigEffects,
              i131.FeeConfigEffects,[i111.Actions,i48.AppStore,i132.FeeConfigService]),
          i0.ɵmpd(512,i133.HeaderDisplayOptionsEffects,i133.HeaderDisplayOptionsEffects,
              [i111.Actions,i48.AppStore]),i0.ɵmpd(512,i134.InvoiceEffects,i134.InvoiceEffects,
              [i111.Actions,i48.AppStore,i135.InvoiceService]),i0.ɵmpd(512,i136.TranslateStore,
              i136.TranslateStore,([] as any[])),i0.ɵmpd(512,i137.ɵd,i137.ɵd,([] as any[])),
          i0.ɵmpd(2048,i137.XhrFactory,(null as any),[i137.ɵd]),i0.ɵmpd(512,i137.HttpXhrBackend,
              i137.HttpXhrBackend,[i137.XhrFactory]),i0.ɵmpd(2048,i137.HttpBackend,
              (null as any),[i137.HttpXhrBackend]),i0.ɵmpd(256,i137.ɵe,'XSRF-TOKEN',
              ([] as any[])),i0.ɵmpd(512,i137.HttpXsrfTokenExtractor,i137.ɵg,[i24.DOCUMENT,
              i0.PLATFORM_ID,i137.ɵe]),i0.ɵmpd(256,i137.ɵf,'X-XSRF-TOKEN',([] as any[])),
          i0.ɵmpd(512,i137.ɵh,i137.ɵh,[i137.HttpXsrfTokenExtractor,i137.ɵf]),i0.ɵmpd(1024,
              i137.HTTP_INTERCEPTORS,(p0_0:any) => {
                return [p0_0];
              },[i137.ɵh]),i0.ɵmpd(1024,i137.HttpHandler,i137.ɵinterceptingHandler,
              [i137.HttpBackend,[2,i137.HTTP_INTERCEPTORS]]),i0.ɵmpd(512,i137.HttpClient,
              i137.HttpClient,[i137.HttpHandler]),i0.ɵmpd(1024,i138.TranslateLoader,
              i139.createTranslateLoader,[i137.HttpClient]),i0.ɵmpd(512,i140.TranslateCompiler,
              i140.TranslateFakeCompiler,([] as any[])),i0.ɵmpd(512,i141.TranslateParser,
              i141.TranslateDefaultParser,([] as any[])),i0.ɵmpd(512,i142.MissingTranslationHandler,
              i142.FakeMissingTranslationHandler,([] as any[])),i0.ɵmpd(256,i143.USE_DEFAULT_LANG,
              (undefined as any),([] as any[])),i0.ɵmpd(256,i143.USE_STORE,(undefined as any),
              ([] as any[])),i0.ɵmpd(512,i143.TranslateService,i143.TranslateService,
              [i136.TranslateStore,i138.TranslateLoader,i140.TranslateCompiler,i141.TranslateParser,
                  i142.MissingTranslationHandler,i143.USE_DEFAULT_LANG,i143.USE_STORE]),
          i0.ɵmpd(512,i144.MultiLingualEffects,i144.MultiLingualEffects,[i111.Actions,
              i48.AppStore,i143.TranslateService,i145.ApiConfig]),i0.ɵmpd(512,i146.NotifierEffects,
              i146.NotifierEffects,[i111.Actions,i128.WzDialogService]),i0.ɵmpd(512,
              i147.OrderEffects,i147.OrderEffects,[i111.Actions,i48.AppStore,i148.OrderService]),
          i0.ɵmpd(512,i149.PageDataEffects,i149.PageDataEffects,[i111.Actions,i48.AppStore,
              i150.PageDataService]),i0.ɵmpd(512,i151.PricingEffects,i151.PricingEffects,
              [i111.Actions,i48.AppStore,i152.PricingService,i128.WzDialogService]),
          i0.ɵmpd(512,i153.PrivacyPolicyEffects,i153.PrivacyPolicyEffects,[i111.Actions,
              i48.AppStore,i154.PrivacyPolicyService]),i0.ɵmpd(512,i155.QuoteEditEffects,
              i155.QuoteEditEffects,[i111.Actions,i48.AppStore,i156.FutureQuoteEditService]),
          i0.ɵmpd(512,i157.QuoteShowEffects,i157.QuoteShowEffects,[i111.Actions,i48.AppStore,
              i158.FutureQuoteShowService]),i0.ɵmpd(512,i159.RouterEffects,i159.RouterEffects,
              [i111.Actions,i52.Router,i24.Location]),i0.ɵmpd(512,i160.SearchEffects,
              i160.SearchEffects,[i111.Actions,i48.AppStore,i161.SearchService]),i0.ɵmpd(512,
              i162.SharingEffects,i162.SharingEffects,[i111.Actions,i48.AppStore,i163.SharingService,
                  i55.CollectionsService]),i0.ɵmpd(512,i164.SnackbarEffects,i164.SnackbarEffects,
              [i111.Actions,i48.AppStore,i165.SnackbarService]),i0.ɵmpd(512,i166.SpeedPreviewEffects,
              i166.SpeedPreviewEffects,[i111.Actions,i48.AppStore,i167.SpeedPreviewService]),
          i0.ɵmpd(512,i168.UiConfigEffects,i168.UiConfigEffects,[i111.Actions,i48.AppStore,
              i169.UiConfigService]),i0.ɵmpd(512,i170.UserEffects,i170.UserEffects,
              [i111.Actions,i48.AppStore,i171.FutureUserService]),i0.ɵmpd(1024,i111.ɵd,
              i111.ɵa,[i112.AccountEffects,i114.ActiveCollectionEffects,i116.ActivityEffects,
                  i118.AssetEffects,i120.CartEffects,i122.CollectionsEffects,i124.CommentEffects,
                  i126.DeliveryOptionsEffects,i129.DialogEffects,i130.ErrorEffects,
                  i131.FeeConfigEffects,i133.HeaderDisplayOptionsEffects,i134.InvoiceEffects,
                  i144.MultiLingualEffects,i146.NotifierEffects,i147.OrderEffects,
                  i149.PageDataEffects,i151.PricingEffects,i153.PrivacyPolicyEffects,
                  i155.QuoteEditEffects,i157.QuoteShowEffects,i159.RouterEffects,i160.SearchEffects,
                  i162.SharingEffects,i164.SnackbarEffects,i166.SpeedPreviewEffects,
                  i168.UiConfigEffects,i170.UserEffects]),i0.ɵmpd(512,i45.StoreModule,
              i45.StoreModule,([] as any[])),i0.ɵmpd(512,i111.ɵg,i111.ɵg,[i111.EffectSources,
              i111.ɵi,i111.ɵd,[2,i45.StoreModule]]),i0.ɵmpd(512,i137.HttpClientXsrfModule,
              i137.HttpClientXsrfModule,([] as any[])),i0.ɵmpd(512,i137.HttpClientModule,
              i137.HttpClientModule,([] as any[])),i0.ɵmpd(512,i33.HttpModule,i33.HttpModule,
              ([] as any[])),i0.ɵmpd(512,i172.WzAssetModule,i172.WzAssetModule,([] as any[])),
          i0.ɵmpd(512,i139.SharedModule,i139.SharedModule,([] as any[])),i0.ɵmpd(512,
              i173.AssetModule,i173.AssetModule,([] as any[])),i0.ɵmpd(512,i1.CollectionModule,
              i1.CollectionModule,([] as any[])),i0.ɵmpd(256,i37.MAT_MENU_DEFAULT_OPTIONS,
              {overlapTrigger:true,xPosition:'after',yPosition:'below'},([] as any[])),
          i0.ɵmpd(256,i36.MAT_DATE_FORMATS,i36.MAT_NATIVE_DATE_FORMATS,([] as any[])),
          i0.ɵmpd(1024,i52.ROUTES,() => {
            return [[{path:'collections',component:i174.CollectionComponent,children:[{path:'',
                component:i175.CollectionsComponent,canActivate:[i49.CollectionGuard],
                resolve:{collections:i54.CollectionsResolver},data:{title:'PAGE_TITLE.COLLECTIONS'}},
                {path:':id',component:i176.CollectionShowComponent,canActivate:[i49.CollectionGuard],
                    resolve:{collection:i47.CollectionShowResolver},data:{title:'PAGE_TITLE.COLLECTION'}},
                {path:':id/asset/:uuid',component:i177.CollectionAssetComponent,canActivate:[i49.CollectionGuard],
                    resolve:{asset:i53.CollectionAssetResolver},data:{title:'PAGE_TITLE.COLLECTION_ASSET'}}]}]];
          },([] as any[]))]);
    });
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLytjb2xsZWN0aW9uL2NvbGxlY3Rpb24ubW9kdWxlLm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLytjb2xsZWN0aW9uL2NvbGxlY3Rpb24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9