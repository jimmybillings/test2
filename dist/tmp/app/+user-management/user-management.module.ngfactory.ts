/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from './user-management.module';
import * as i2 from '../../node_modules/@angular/material/dialog/typings/index.ngfactory';
import * as i3 from '../../node_modules/@angular/material/datepicker/typings/index.ngfactory';
import * as i4 from '../../node_modules/@angular/material/tooltip/typings/index.ngfactory';
import * as i5 from '../../node_modules/@angular/material/snack-bar/typings/index.ngfactory';
import * as i6 from '../shared/modules/wz-form/components/wz-address-form/wz.address-form.component.ngfactory';
import * as i7 from '../shared/modules/wz-dialog/components/wz.notification-dialog.component.ngfactory';
import * as i8 from '../shared/modules/wz-dialog/components/wz.form-dialog.component.ngfactory';
import * as i9 from '../shared/modules/wz-dialog/components/wz.confirmation-dialog.component.ngfactory';
import * as i10 from '../shared/modules/wz-asset/wz-speedview/wz.speedview.component.ngfactory';
import * as i11 from '../+collection/components/collection-link.component.ngfactory';
import * as i12 from '../application/collection-tray/components/collection-form.component.ngfactory';
import * as i13 from '../shared/components/wz-terms/wz.terms.component.ngfactory';
import * as i14 from '../shared/components/wz-pricing/wz.pricing.component.ngfactory';
import * as i15 from '../shared/components/wz-coming-soon/wz-coming-soon.component.ngfactory';
import * as i16 from '../shared/components/wz-subclip-editor/wz.subclip-editor.component.ngfactory';
import * as i17 from './user-management.component.ngfactory';
import * as i18 from './+profile/profile.component.ngfactory';
import * as i19 from './+register/register.component.ngfactory';
import * as i20 from './+login/login.component.ngfactory';
import * as i21 from './+forgot-password/forgot-password.component.ngfactory';
import * as i22 from './+reset-password/reset-password.component.ngfactory';
import * as i23 from '@angular/common';
import * as i24 from '@angular/forms';
import * as i25 from '@angular/cdk/bidi';
import * as i26 from '@angular/platform-browser';
import * as i27 from '@angular/cdk/a11y';
import * as i28 from '@angular/cdk/platform';
import * as i29 from '@angular/cdk/collections';
import * as i30 from '@angular/cdk/observers';
import * as i31 from '@angular/cdk/overlay';
import * as i32 from '@angular/http';
import * as i33 from '@angular/material/icon';
import * as i34 from '@angular/material/datepicker';
import * as i35 from '@angular/material/core';
import * as i36 from '@angular/material/menu';
import * as i37 from '@angular/material/select';
import * as i38 from '@angular/material/tooltip';
import * as i39 from '@angular/material/paginator';
import * as i40 from '@angular/material/snack-bar';
import * as i41 from '../shared/modules/wz-form/wz.form.model';
import * as i42 from '../shared/modules/wz-form/services/google-places.service';
import * as i43 from '../shared/services/window-ref.service';
import * as i44 from '@ngrx/store';
import * as i45 from '@ngrx/store-devtools';
import * as i46 from './services/logged-in.guard';
import * as i47 from '../shared/services/current-user.service';
import * as i48 from '@angular/router';
import * as i49 from './services/logged-out.guard';
import * as i50 from '../app.store';
import * as i51 from '@ngx-translate/core/index';
import * as i52 from '@angular/material/button';
import * as i53 from '@angular/material/button-toggle';
import * as i54 from '@angular/material/card';
import * as i55 from '@angular/material/checkbox';
import * as i56 from '@angular/cdk/portal';
import * as i57 from '@angular/cdk/scrolling';
import * as i58 from '@angular/material/dialog';
import * as i59 from '@angular/material/form-field';
import * as i60 from '@angular/material/grid-list';
import * as i61 from '@angular/material/input';
import * as i62 from '@angular/material/list';
import * as i63 from '@angular/material/progress-bar';
import * as i64 from '@angular/material/progress-spinner';
import * as i65 from '@angular/material/radio';
import * as i66 from '@angular/material/sidenav';
import * as i67 from '@angular/material/slide-toggle';
import * as i68 from '@angular/material/slider';
import * as i69 from '@angular/material/tabs';
import * as i70 from '@angular/material/toolbar';
import * as i71 from '../shared/modules/wz-design/wz.design.module';
import * as i72 from '../shared/modules/wz-player/wz.player.module';
import * as i73 from '../shared/modules/wz-form/wz-form.module';
import * as i74 from '../shared/modules/wz-dialog/wz.dialog.module';
import * as i75 from '../shared/services/search-context.service';
import * as i76 from '../shared/stores/collections.store';
import * as i77 from '../shared/services/filter.service';
import * as i78 from '../shared/services/user-preference.service';
import * as i79 from '../shared/services/collection-context.service';
import * as i80 from '../shared/services/sort-definitions.service';
import * as i81 from '../shared/stores/orders.store';
import * as i82 from '../shared/stores/feature.store';
import * as i83 from '../shared/stores/gallery-view.store';
import * as i84 from '../shared/stores/quotes.store';
import * as i85 from '../store/active-collection/active-collection.state';
import * as i86 from '../store/asset/asset.state';
import * as i87 from '../store/cart/cart.state';
import * as i88 from '../store/checkout/checkout.state';
import * as i89 from '../store/comment/comment.state';
import * as i90 from '../store/delivery-options/delivery-options.state';
import * as i91 from '../store/header-display-options/header-display-options.state';
import * as i92 from '../store/invoice/invoice.state';
import * as i93 from '../store/loading-indicator/loading-indicator.state';
import * as i94 from '../store/multi-lingual/multi-lingual.state';
import * as i95 from '../store/order/order.state';
import * as i96 from '../store/pricing/pricing.state';
import * as i97 from '../store/privacy-policy/privacy-policy.state';
import * as i98 from '../store/quote-edit/quote-edit.state';
import * as i99 from '../store/quote-show/quote-show.state';
import * as i100 from '../store/search/search.state';
import * as i101 from '../store/sharing/sharing.state';
import * as i102 from '../store/snackbar/snackbar.state';
import * as i103 from '../store/speed-preview/speed-preview.state';
import * as i104 from '../store/ui-config/ui-config.state';
import * as i105 from '../store/fee-config/fee-config.state';
import * as i106 from '@ngrx/effects';
import * as i107 from '../store/account/account.effects';
import * as i108 from '../store/account/account.service';
import * as i109 from '../store/active-collection/active-collection.effects';
import * as i110 from '../store/active-collection/active-collection.service';
import * as i111 from '../store/activity/activity.effects';
import * as i112 from '../store/activity/activity.service';
import * as i113 from '../store/asset/asset.effects';
import * as i114 from '../store/asset/asset.service';
import * as i115 from '../store/cart/cart.effects';
import * as i116 from '../store/cart/cart.service';
import * as i117 from '../store/collections/collections.effects';
import * as i118 from '../store/collections/collections.service';
import * as i119 from '../store/comment/comment.effects';
import * as i120 from '../store/comment/comment.service';
import * as i121 from '../store/delivery-options/delivery-options.effects';
import * as i122 from '../store/delivery-options/delivery-options.service';
import * as i123 from '../shared/modules/wz-dialog/services/wz.dialog.service';
import * as i124 from '../store/dialog/dialog.effects';
import * as i125 from '../store/error/error.effects';
import * as i126 from '../store/fee-config/fee-config.effects';
import * as i127 from '../store/fee-config/fee-config.service';
import * as i128 from '../store/header-display-options/header-display-options.effects';
import * as i129 from '../store/invoice/invoice.effects';
import * as i130 from '../store/invoice/invoice.service';
import * as i131 from '@ngx-translate/core/src/translate.store';
import * as i132 from '@angular/common/http';
import * as i133 from '@ngx-translate/core/src/translate.loader';
import * as i134 from '../shared/shared.module';
import * as i135 from '@ngx-translate/core/src/translate.compiler';
import * as i136 from '@ngx-translate/core/src/translate.parser';
import * as i137 from '@ngx-translate/core/src/missing-translation-handler';
import * as i138 from '@ngx-translate/core/src/translate.service';
import * as i139 from '../store/multi-lingual/multi-lingual.effects';
import * as i140 from '../shared/services/api.config';
import * as i141 from '../store/notifier/notifier.effects';
import * as i142 from '../store/order/order.effects';
import * as i143 from '../store/order/order.service';
import * as i144 from '../store/page-data/page-data.effects';
import * as i145 from '../store/page-data/page-data.service';
import * as i146 from '../store/pricing/pricing.effects';
import * as i147 from '../store/pricing/pricing.service';
import * as i148 from '../store/privacy-policy/privacy-policy.effects';
import * as i149 from '../store/privacy-policy/privacy-policy.service';
import * as i150 from '../store/quote-edit/quote-edit.effects';
import * as i151 from '../store/quote-edit/quote-edit.service';
import * as i152 from '../store/quote-show/quote-show.effects';
import * as i153 from '../store/quote-show/quote-show.service';
import * as i154 from '../store/router/router.effects';
import * as i155 from '../store/search/search.effects';
import * as i156 from '../store/search/search.service';
import * as i157 from '../store/sharing/sharing.effects';
import * as i158 from '../store/sharing/sharing.service';
import * as i159 from '../shared/services/collections.service';
import * as i160 from '../store/snackbar/snackbar.effects';
import * as i161 from '../store/snackbar/snackbar.service';
import * as i162 from '../store/speed-preview/speed-preview.effects';
import * as i163 from '../store/speed-preview/speed-preview.service';
import * as i164 from '../store/ui-config/ui-config.effects';
import * as i165 from '../store/ui-config/ui-config.service';
import * as i166 from '../store/user/user.effects';
import * as i167 from '../store/user/user.service';
import * as i168 from '../shared/modules/wz-asset/wz-asset.module';
import * as i169 from './user-management.component';
import * as i170 from './+profile/profile.component';
import * as i171 from './+register/register.component';
import * as i172 from './+login/login.component';
import * as i173 from './+forgot-password/forgot-password.component';
import * as i174 from './+reset-password/reset-password.component';
export const UserManagementModuleNgFactory:i0.NgModuleFactory<i1.UserManagementModule> = i0.ɵcmf(i1.UserManagementModule,
    ([] as any[]),(_l:any) => {
      return i0.ɵmod([i0.ɵmpd(512,i0.ComponentFactoryResolver,i0.ɵCodegenComponentFactoryResolver,
          [[8,[i2.MatDialogContainerNgFactory,i3.MatDatepickerContentNgFactory,i4.TooltipComponentNgFactory,
              i5.MatSnackBarContainerNgFactory,i5.SimpleSnackBarNgFactory,i6.WzAddressFormComponentNgFactory,
              i7.WzNotificationDialogComponentNgFactory,i8.WzFormDialogComponentNgFactory,
              i9.WzConfirmationDialogComponentNgFactory,i10.WzSpeedviewComponentNgFactory,
              i11.CollectionLinkComponentNgFactory,i12.CollectionFormComponentNgFactory,
              i13.WzTermsComponentNgFactory,i14.WzPricingComponentNgFactory,i15.WzComingSoonComponentNgFactory,
              i16.WzSubclipEditorComponentNgFactory,i17.UserManagementComponentNgFactory,
              i18.ProfileComponentNgFactory,i19.RegisterComponentNgFactory,i20.LoginComponentNgFactory,
              i21.ForgotPasswordComponentNgFactory,i22.ResetPasswordComponentNgFactory]],
              [3,i0.ComponentFactoryResolver],i0.NgModuleRef]),i0.ɵmpd(4608,i23.NgLocalization,
          i23.NgLocaleLocalization,[i0.LOCALE_ID]),i0.ɵmpd(4608,i24.ɵi,i24.ɵi,([] as any[])),
          i0.ɵmpd(4608,i24.FormBuilder,i24.FormBuilder,([] as any[])),i0.ɵmpd(6144,
              i25.DIR_DOCUMENT,(null as any),[i26.DOCUMENT]),i0.ɵmpd(4608,i25.Directionality,
              i25.Directionality,[[2,i25.DIR_DOCUMENT]]),i0.ɵmpd(4608,i27.InteractivityChecker,
              i27.InteractivityChecker,[i28.Platform]),i0.ɵmpd(4608,i27.FocusTrapFactory,
              i27.FocusTrapFactory,[i27.InteractivityChecker,i28.Platform,i0.NgZone]),
          i0.ɵmpd(136192,i27.AriaDescriber,i27.ARIA_DESCRIBER_PROVIDER_FACTORY,[[3,
              i27.AriaDescriber],i28.Platform]),i0.ɵmpd(5120,i27.LiveAnnouncer,i27.LIVE_ANNOUNCER_PROVIDER_FACTORY,
              [[3,i27.LiveAnnouncer],[2,i27.LIVE_ANNOUNCER_ELEMENT_TOKEN],i28.Platform]),
          i0.ɵmpd(5120,i27.FocusMonitor,i27.FOCUS_MONITOR_PROVIDER_FACTORY,[[3,i27.FocusMonitor],
              i0.NgZone,i28.Platform]),i0.ɵmpd(5120,i29.UniqueSelectionDispatcher,
              i29.ɵa,[[3,i29.UniqueSelectionDispatcher]]),i0.ɵmpd(4608,i30.MatMutationObserverFactory,
              i30.MatMutationObserverFactory,([] as any[])),i0.ɵmpd(5120,i31.ɵc,i31.ɵd,
              [i31.Overlay]),i0.ɵmpd(4608,i32.BrowserXhr,i32.BrowserXhr,([] as any[])),
          i0.ɵmpd(4608,i32.ResponseOptions,i32.BaseResponseOptions,([] as any[])),
          i0.ɵmpd(5120,i32.XSRFStrategy,i32.ɵb,([] as any[])),i0.ɵmpd(4608,i32.XHRBackend,
              i32.XHRBackend,[i32.BrowserXhr,i32.ResponseOptions,i32.XSRFStrategy]),
          i0.ɵmpd(4608,i32.RequestOptions,i32.BaseRequestOptions,([] as any[])),i0.ɵmpd(5120,
              i32.Http,i32.ɵc,[i32.XHRBackend,i32.RequestOptions]),i0.ɵmpd(5120,i33.MatIconRegistry,
              i33.ICON_REGISTRY_PROVIDER_FACTORY,[[3,i33.MatIconRegistry],[2,i32.Http],
                  i26.DomSanitizer]),i0.ɵmpd(4608,i34.MatDatepickerIntl,i34.MatDatepickerIntl,
              ([] as any[])),i0.ɵmpd(5120,i34.MAT_DATEPICKER_SCROLL_STRATEGY,i34.MAT_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i31.Overlay]),i0.ɵmpd(4608,i35.ErrorStateMatcher,i35.ErrorStateMatcher,
              ([] as any[])),i0.ɵmpd(5120,i36.MAT_MENU_SCROLL_STRATEGY,i36.ɵc22,[i31.Overlay]),
          i0.ɵmpd(5120,i37.MAT_SELECT_SCROLL_STRATEGY,i37.MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i31.Overlay]),i0.ɵmpd(5120,i38.MAT_TOOLTIP_SCROLL_STRATEGY,i38.MAT_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i31.Overlay]),i0.ɵmpd(4608,i39.MatPaginatorIntl,i39.MatPaginatorIntl,
              ([] as any[])),i0.ɵmpd(4608,i26.HAMMER_GESTURE_CONFIG,i35.GestureConfig,
              ([] as any[])),i0.ɵmpd(4608,i40.MatSnackBar,i40.MatSnackBar,[i31.Overlay,
              i27.LiveAnnouncer,i0.Injector,[3,i40.MatSnackBar]]),i0.ɵmpd(6144,i35.MAT_DATE_LOCALE,
              (null as any),[i0.LOCALE_ID]),i0.ɵmpd(4608,i35.DateAdapter,i35.NativeDateAdapter,
              [[2,i35.MAT_DATE_LOCALE]]),i0.ɵmpd(4608,i41.FormModel,i41.FormModel,
              ([] as any[])),i0.ɵmpd(4608,i42.GooglePlacesService,i42.GooglePlacesService,
              [i43.WindowRef,i26.DOCUMENT]),i0.ɵmpd(135680,i44.State,i44.State,[i44.ActionsSubject,
              i44.ReducerObservable,i44.ScannedActionsSubject,i44.INITIAL_STATE]),
          i0.ɵmpd(5120,i45.ɵa,i45.ɵb,[i45.ɵj,i45.ɵh]),i0.ɵmpd(4608,i46.LoggedInGuard,
              i46.LoggedInGuard,[i47.CurrentUserService,i48.Router]),i0.ɵmpd(4608,
              i49.LoggedOutGuard,i49.LoggedOutGuard,[i47.CurrentUserService,i50.AppStore]),
          i0.ɵmpd(512,i23.CommonModule,i23.CommonModule,([] as any[])),i0.ɵmpd(512,
              i48.RouterModule,i48.RouterModule,[[2,i48.ɵa],[2,i48.Router]]),i0.ɵmpd(512,
              i24.ɵba,i24.ɵba,([] as any[])),i0.ɵmpd(512,i24.FormsModule,i24.FormsModule,
              ([] as any[])),i0.ɵmpd(512,i51.TranslateModule,i51.TranslateModule,([] as any[])),
          i0.ɵmpd(512,i24.ReactiveFormsModule,i24.ReactiveFormsModule,([] as any[])),
          i0.ɵmpd(512,i35.CompatibilityModule,i35.CompatibilityModule,([] as any[])),
          i0.ɵmpd(512,i25.BidiModule,i25.BidiModule,([] as any[])),i0.ɵmpd(256,i35.MATERIAL_SANITY_CHECKS,
              true,([] as any[])),i0.ɵmpd(512,i35.MatCommonModule,i35.MatCommonModule,
              [[2,i35.MATERIAL_SANITY_CHECKS]]),i0.ɵmpd(512,i28.PlatformModule,i28.PlatformModule,
              ([] as any[])),i0.ɵmpd(512,i35.MatRippleModule,i35.MatRippleModule,([] as any[])),
          i0.ɵmpd(512,i27.A11yModule,i27.A11yModule,([] as any[])),i0.ɵmpd(512,i52.MatButtonModule,
              i52.MatButtonModule,([] as any[])),i0.ɵmpd(512,i53.MatButtonToggleModule,
              i53.MatButtonToggleModule,([] as any[])),i0.ɵmpd(512,i54.MatCardModule,
              i54.MatCardModule,([] as any[])),i0.ɵmpd(512,i30.ObserversModule,i30.ObserversModule,
              ([] as any[])),i0.ɵmpd(512,i55.MatCheckboxModule,i55.MatCheckboxModule,
              ([] as any[])),i0.ɵmpd(512,i56.PortalModule,i56.PortalModule,([] as any[])),
          i0.ɵmpd(512,i57.ScrollDispatchModule,i57.ScrollDispatchModule,([] as any[])),
          i0.ɵmpd(512,i31.OverlayModule,i31.OverlayModule,([] as any[])),i0.ɵmpd(512,
              i58.MatDialogModule,i58.MatDialogModule,([] as any[])),i0.ɵmpd(512,i33.MatIconModule,
              i33.MatIconModule,([] as any[])),i0.ɵmpd(512,i34.MatDatepickerModule,
              i34.MatDatepickerModule,([] as any[])),i0.ɵmpd(512,i59.MatFormFieldModule,
              i59.MatFormFieldModule,([] as any[])),i0.ɵmpd(512,i35.MatLineModule,
              i35.MatLineModule,([] as any[])),i0.ɵmpd(512,i60.MatGridListModule,i60.MatGridListModule,
              ([] as any[])),i0.ɵmpd(512,i61.MatInputModule,i61.MatInputModule,([] as any[])),
          i0.ɵmpd(512,i35.MatPseudoCheckboxModule,i35.MatPseudoCheckboxModule,([] as any[])),
          i0.ɵmpd(512,i62.MatListModule,i62.MatListModule,([] as any[])),i0.ɵmpd(512,
              i36.MatMenuModule,i36.MatMenuModule,([] as any[])),i0.ɵmpd(512,i35.MatOptionModule,
              i35.MatOptionModule,([] as any[])),i0.ɵmpd(512,i37.MatSelectModule,i37.MatSelectModule,
              ([] as any[])),i0.ɵmpd(512,i38.MatTooltipModule,i38.MatTooltipModule,
              ([] as any[])),i0.ɵmpd(512,i39.MatPaginatorModule,i39.MatPaginatorModule,
              ([] as any[])),i0.ɵmpd(512,i63.MatProgressBarModule,i63.MatProgressBarModule,
              ([] as any[])),i0.ɵmpd(512,i64.MatProgressSpinnerModule,i64.MatProgressSpinnerModule,
              ([] as any[])),i0.ɵmpd(512,i65.MatRadioModule,i65.MatRadioModule,([] as any[])),
          i0.ɵmpd(512,i66.MatSidenavModule,i66.MatSidenavModule,([] as any[])),i0.ɵmpd(512,
              i67.MatSlideToggleModule,i67.MatSlideToggleModule,([] as any[])),i0.ɵmpd(512,
              i68.MatSliderModule,i68.MatSliderModule,([] as any[])),i0.ɵmpd(512,i40.MatSnackBarModule,
              i40.MatSnackBarModule,([] as any[])),i0.ɵmpd(512,i69.MatTabsModule,i69.MatTabsModule,
              ([] as any[])),i0.ɵmpd(512,i70.MatToolbarModule,i70.MatToolbarModule,
              ([] as any[])),i0.ɵmpd(512,i35.NativeDateModule,i35.NativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i35.MatNativeDateModule,i35.MatNativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i71.MaterialModule,i71.MaterialModule,([] as any[])),
          i0.ɵmpd(512,i72.WzPlayerModule,i72.WzPlayerModule,([] as any[])),i0.ɵmpd(512,
              i73.WzFormModule,i73.WzFormModule,([] as any[])),i0.ɵmpd(512,i74.WzDialogModule,
              i74.WzDialogModule,([] as any[])),i0.ɵmpd(131584,i44.ActionsSubject,
              i44.ActionsSubject,([] as any[])),i0.ɵmpd(131584,i45.ɵg,i45.ɵg,([] as any[])),
          i0.ɵmpd(2048,i44.ReducerManagerDispatcher,(null as any),[i45.ɵg]),i0.ɵmpd(256,
              i44._INITIAL_STATE,(undefined as any),([] as any[])),i0.ɵmpd(1024,i44.INITIAL_STATE,
              i44._initialStateFactory,[i44._INITIAL_STATE]),i0.ɵmpd(256,i44._INITIAL_REDUCERS,
              {currentUser:i47.currentUser,searchContext:i75.searchContext,collections:i76.collections,
                  filters:i77.filters,userPreferences:i78.userPreferences,collectionOptions:i79.collectionOptions,
                  sortDefinitions:i80.sortDefinitions,orders:i81.orders,features:i82.features,
                  gallery:i83.gallery,quotes:i84.quotes,activeCollection:i85.reducer,
                  asset:i86.reducer,cart:i87.reducer,checkout:i88.reducer,comment:i89.reducer,
                  deliveryOptions:i90.reducer,headerDisplayOptions:i91.reducer,invoice:i92.reducer,
                  loadingIndicator:i93.reducer,multiLingual:i94.reducer,order:i95.reducer,
                  pricing:i96.reducer,privacyPolicy:i97.reducer,quoteEdit:i98.reducer,
                  quoteShow:i99.reducer,search:i100.reducer,sharing:i101.reducer,snackbar:i102.reducer,
                  speedPreview:i103.reducer,uiConfig:i104.reducer,feeConfig:i105.reducer},
              ([] as any[])),i0.ɵmpd(2048,i44._STORE_REDUCERS,(null as any),[i44._INITIAL_REDUCERS]),
          i0.ɵmpd(1024,i44.INITIAL_REDUCERS,i44._createStoreReducers,[i0.Injector,
              i44._INITIAL_REDUCERS,i44._STORE_REDUCERS]),i0.ɵmpd(256,i44._REDUCER_FACTORY,
              i44.combineReducers,([] as any[])),i0.ɵmpd(256,i44.META_REDUCERS,([] as any[]),
              ([] as any[])),i0.ɵmpd(1024,i44.REDUCER_FACTORY,i44.createReducerFactory,
              [i44._REDUCER_FACTORY,i44.META_REDUCERS]),i0.ɵmpd(131584,i44.ReducerManager,
              i44.ReducerManager,[i44.ReducerManagerDispatcher,i44.INITIAL_STATE,i44.INITIAL_REDUCERS,
                  i44.REDUCER_FACTORY]),i0.ɵmpd(2048,i44.ReducerObservable,(null as any),
              [i44.ReducerManager]),i0.ɵmpd(131584,i44.ScannedActionsSubject,i44.ScannedActionsSubject,
              ([] as any[])),i0.ɵmpd(512,i44.StoreRootModule,i44.StoreRootModule,[i44.ActionsSubject,
              i44.ReducerObservable,i44.ScannedActionsSubject]),i0.ɵmpd(512,i45.StoreDevtoolsModule,
              i45.StoreDevtoolsModule,([] as any[])),i0.ɵmpd(1024,i106.ɵf,i106.ɵb,
              ([] as any[])),i0.ɵmpd(512,i106.ɵh,i106.ɵh,[i106.ɵf]),i0.ɵmpd(512,i106.EffectSources,
              i106.EffectSources,[i106.ɵh]),i0.ɵmpd(1024,i45.ɵj,i45.ɵc,([] as any[])),
          i0.ɵmpd(512,i45.ɵk,i45.ɵk,[i45.ɵj]),i0.ɵmpd(256,i45.ɵi,{},([] as any[])),
          i0.ɵmpd(1024,i45.ɵh,i45.ɵf,[i45.ɵi]),i0.ɵmpd(512,i45.StoreDevtools,i45.StoreDevtools,
              [i45.ɵg,i44.ActionsSubject,i44.ReducerObservable,i45.ɵk,i44.ScannedActionsSubject,
                  i44.INITIAL_STATE,i45.ɵh]),i0.ɵmpd(1024,i44.StateObservable,i45.ɵd,
              [i45.StoreDevtools]),i0.ɵmpd(512,i44.Store,i44.Store,[i44.StateObservable,
              i44.ActionsSubject,i44.ReducerManager]),i0.ɵmpd(131584,i106.ɵi,i106.ɵi,
              [i106.EffectSources,i44.Store]),i0.ɵmpd(512,i106.Actions,i106.Actions,
              [i44.ScannedActionsSubject]),i0.ɵmpd(512,i107.AccountEffects,i107.AccountEffects,
              [i106.Actions,i50.AppStore,i108.AccountService]),i0.ɵmpd(512,i109.ActiveCollectionEffects,
              i109.ActiveCollectionEffects,[i106.Actions,i50.AppStore,i110.ActiveCollectionService,
                  i78.UserPreferenceService]),i0.ɵmpd(512,i111.ActivityEffects,i111.ActivityEffects,
              [i106.Actions,i112.ActivityService]),i0.ɵmpd(512,i113.AssetEffects,i113.AssetEffects,
              [i106.Actions,i50.AppStore,i114.AssetService]),i0.ɵmpd(512,i115.CartEffects,
              i115.CartEffects,[i106.Actions,i50.AppStore,i116.FutureCartService]),
          i0.ɵmpd(512,i117.CollectionsEffects,i117.CollectionsEffects,[i106.Actions,
              i50.AppStore,i118.FutureCollectionsService]),i0.ɵmpd(512,i119.CommentEffects,
              i119.CommentEffects,[i106.Actions,i50.AppStore,i120.CommentService]),
          i0.ɵmpd(512,i121.DeliveryOptionsEffects,i121.DeliveryOptionsEffects,[i106.Actions,
              i50.AppStore,i122.DeliveryOptionsService,i43.WindowRef]),i0.ɵmpd(512,
              i28.Platform,i28.Platform,([] as any[])),i0.ɵmpd(1024,i57.ScrollDispatcher,
              i57.SCROLL_DISPATCHER_PROVIDER_FACTORY,[[3,i57.ScrollDispatcher],i0.NgZone,
                  i28.Platform]),i0.ɵmpd(1024,i57.ViewportRuler,i57.VIEWPORT_RULER_PROVIDER_FACTORY,
              [[3,i57.ViewportRuler],i28.Platform,i0.NgZone,i57.ScrollDispatcher]),
          i0.ɵmpd(512,i31.ScrollStrategyOptions,i31.ScrollStrategyOptions,[i57.ScrollDispatcher,
              i57.ViewportRuler]),i0.ɵmpd(1024,i31.OverlayContainer,i31.ɵa,[[3,i31.OverlayContainer]]),
          i0.ɵmpd(512,i31.ɵf,i31.ɵf,[i57.ViewportRuler]),i0.ɵmpd(512,i31.Overlay,i31.Overlay,
              [i31.ScrollStrategyOptions,i31.OverlayContainer,i0.ComponentFactoryResolver,
                  i31.ɵf,i0.ApplicationRef,i0.Injector,i0.NgZone]),i0.ɵmpd(1024,i58.MAT_DIALOG_SCROLL_STRATEGY,
              i58.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,[i31.Overlay]),i0.ɵmpd(512,
              i58.MatDialog,i58.MatDialog,[i31.Overlay,i0.Injector,[2,i23.Location],
                  i58.MAT_DIALOG_SCROLL_STRATEGY,[3,i58.MatDialog]]),i0.ɵmpd(512,i123.WzDialogService,
              i123.WzDialogService,[i58.MatDialog]),i0.ɵmpd(512,i124.DialogEffects,
              i124.DialogEffects,[i106.Actions,i50.AppStore,i123.WzDialogService]),
          i0.ɵmpd(512,i125.ErrorEffects,i125.ErrorEffects,[i106.Actions,i50.AppStore,
              i47.CurrentUserService,i23.Location]),i0.ɵmpd(512,i126.FeeConfigEffects,
              i126.FeeConfigEffects,[i106.Actions,i50.AppStore,i127.FeeConfigService]),
          i0.ɵmpd(512,i128.HeaderDisplayOptionsEffects,i128.HeaderDisplayOptionsEffects,
              [i106.Actions,i50.AppStore]),i0.ɵmpd(512,i129.InvoiceEffects,i129.InvoiceEffects,
              [i106.Actions,i50.AppStore,i130.InvoiceService]),i0.ɵmpd(512,i131.TranslateStore,
              i131.TranslateStore,([] as any[])),i0.ɵmpd(512,i132.ɵd,i132.ɵd,([] as any[])),
          i0.ɵmpd(2048,i132.XhrFactory,(null as any),[i132.ɵd]),i0.ɵmpd(512,i132.HttpXhrBackend,
              i132.HttpXhrBackend,[i132.XhrFactory]),i0.ɵmpd(2048,i132.HttpBackend,
              (null as any),[i132.HttpXhrBackend]),i0.ɵmpd(256,i132.ɵe,'XSRF-TOKEN',
              ([] as any[])),i0.ɵmpd(512,i132.HttpXsrfTokenExtractor,i132.ɵg,[i23.DOCUMENT,
              i0.PLATFORM_ID,i132.ɵe]),i0.ɵmpd(256,i132.ɵf,'X-XSRF-TOKEN',([] as any[])),
          i0.ɵmpd(512,i132.ɵh,i132.ɵh,[i132.HttpXsrfTokenExtractor,i132.ɵf]),i0.ɵmpd(1024,
              i132.HTTP_INTERCEPTORS,(p0_0:any) => {
                return [p0_0];
              },[i132.ɵh]),i0.ɵmpd(1024,i132.HttpHandler,i132.ɵinterceptingHandler,
              [i132.HttpBackend,[2,i132.HTTP_INTERCEPTORS]]),i0.ɵmpd(512,i132.HttpClient,
              i132.HttpClient,[i132.HttpHandler]),i0.ɵmpd(1024,i133.TranslateLoader,
              i134.createTranslateLoader,[i132.HttpClient]),i0.ɵmpd(512,i135.TranslateCompiler,
              i135.TranslateFakeCompiler,([] as any[])),i0.ɵmpd(512,i136.TranslateParser,
              i136.TranslateDefaultParser,([] as any[])),i0.ɵmpd(512,i137.MissingTranslationHandler,
              i137.FakeMissingTranslationHandler,([] as any[])),i0.ɵmpd(256,i138.USE_DEFAULT_LANG,
              (undefined as any),([] as any[])),i0.ɵmpd(256,i138.USE_STORE,(undefined as any),
              ([] as any[])),i0.ɵmpd(512,i138.TranslateService,i138.TranslateService,
              [i131.TranslateStore,i133.TranslateLoader,i135.TranslateCompiler,i136.TranslateParser,
                  i137.MissingTranslationHandler,i138.USE_DEFAULT_LANG,i138.USE_STORE]),
          i0.ɵmpd(512,i139.MultiLingualEffects,i139.MultiLingualEffects,[i106.Actions,
              i50.AppStore,i138.TranslateService,i140.ApiConfig]),i0.ɵmpd(512,i141.NotifierEffects,
              i141.NotifierEffects,[i106.Actions,i123.WzDialogService]),i0.ɵmpd(512,
              i142.OrderEffects,i142.OrderEffects,[i106.Actions,i50.AppStore,i143.OrderService]),
          i0.ɵmpd(512,i144.PageDataEffects,i144.PageDataEffects,[i106.Actions,i50.AppStore,
              i145.PageDataService]),i0.ɵmpd(512,i146.PricingEffects,i146.PricingEffects,
              [i106.Actions,i50.AppStore,i147.PricingService,i123.WzDialogService]),
          i0.ɵmpd(512,i148.PrivacyPolicyEffects,i148.PrivacyPolicyEffects,[i106.Actions,
              i50.AppStore,i149.PrivacyPolicyService]),i0.ɵmpd(512,i150.QuoteEditEffects,
              i150.QuoteEditEffects,[i106.Actions,i50.AppStore,i151.FutureQuoteEditService]),
          i0.ɵmpd(512,i152.QuoteShowEffects,i152.QuoteShowEffects,[i106.Actions,i50.AppStore,
              i153.FutureQuoteShowService]),i0.ɵmpd(512,i154.RouterEffects,i154.RouterEffects,
              [i106.Actions,i48.Router,i23.Location]),i0.ɵmpd(512,i155.SearchEffects,
              i155.SearchEffects,[i106.Actions,i50.AppStore,i156.SearchService]),i0.ɵmpd(512,
              i157.SharingEffects,i157.SharingEffects,[i106.Actions,i50.AppStore,i158.SharingService,
                  i159.CollectionsService]),i0.ɵmpd(512,i160.SnackbarEffects,i160.SnackbarEffects,
              [i106.Actions,i50.AppStore,i161.SnackbarService]),i0.ɵmpd(512,i162.SpeedPreviewEffects,
              i162.SpeedPreviewEffects,[i106.Actions,i50.AppStore,i163.SpeedPreviewService]),
          i0.ɵmpd(512,i164.UiConfigEffects,i164.UiConfigEffects,[i106.Actions,i50.AppStore,
              i165.UiConfigService]),i0.ɵmpd(512,i166.UserEffects,i166.UserEffects,
              [i106.Actions,i50.AppStore,i167.FutureUserService]),i0.ɵmpd(1024,i106.ɵd,
              i106.ɵa,[i107.AccountEffects,i109.ActiveCollectionEffects,i111.ActivityEffects,
                  i113.AssetEffects,i115.CartEffects,i117.CollectionsEffects,i119.CommentEffects,
                  i121.DeliveryOptionsEffects,i124.DialogEffects,i125.ErrorEffects,
                  i126.FeeConfigEffects,i128.HeaderDisplayOptionsEffects,i129.InvoiceEffects,
                  i139.MultiLingualEffects,i141.NotifierEffects,i142.OrderEffects,
                  i144.PageDataEffects,i146.PricingEffects,i148.PrivacyPolicyEffects,
                  i150.QuoteEditEffects,i152.QuoteShowEffects,i154.RouterEffects,i155.SearchEffects,
                  i157.SharingEffects,i160.SnackbarEffects,i162.SpeedPreviewEffects,
                  i164.UiConfigEffects,i166.UserEffects]),i0.ɵmpd(512,i44.StoreModule,
              i44.StoreModule,([] as any[])),i0.ɵmpd(512,i106.ɵg,i106.ɵg,[i106.EffectSources,
              i106.ɵi,i106.ɵd,[2,i44.StoreModule]]),i0.ɵmpd(512,i132.HttpClientXsrfModule,
              i132.HttpClientXsrfModule,([] as any[])),i0.ɵmpd(512,i132.HttpClientModule,
              i132.HttpClientModule,([] as any[])),i0.ɵmpd(512,i32.HttpModule,i32.HttpModule,
              ([] as any[])),i0.ɵmpd(512,i168.WzAssetModule,i168.WzAssetModule,([] as any[])),
          i0.ɵmpd(512,i134.SharedModule,i134.SharedModule,([] as any[])),i0.ɵmpd(512,
              i1.UserManagementModule,i1.UserManagementModule,([] as any[])),i0.ɵmpd(256,
              i36.MAT_MENU_DEFAULT_OPTIONS,{overlapTrigger:true,xPosition:'after',
                  yPosition:'below'},([] as any[])),i0.ɵmpd(256,i35.MAT_DATE_FORMATS,
              i35.MAT_NATIVE_DATE_FORMATS,([] as any[])),i0.ɵmpd(1024,i48.ROUTES,() => {
            return [[{path:'user',component:i169.UserManagementComponent,children:[{path:'',
                component:i170.ProfileComponent,canActivate:[i49.LoggedOutGuard],data:{title:'PAGE_TITLE.PROFILE'}},
                {path:'register',component:i171.RegisterComponent,canActivate:[i46.LoggedInGuard],
                    data:{title:'PAGE_TITLE.REGISTER'}},{path:'login',component:i172.LoginComponent,
                    canActivate:[i46.LoggedInGuard],data:{title:'PAGE_TITLE.LOGIN'}},
                {path:'forgot-password',component:i173.ForgotPasswordComponent,canActivate:[i46.LoggedInGuard],
                    data:{title:'PAGE_TITLE.FORGOT_PASSWORD'}},{path:'reset-password',
                    component:i174.ResetPasswordComponent,data:{title:'PAGE_TITLE.RESET_PASSWORD'}}]}]];
          },([] as any[]))]);
    });
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLyt1c2VyLW1hbmFnZW1lbnQvdXNlci1tYW5hZ2VtZW50Lm1vZHVsZS5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9Vc2Vycy9qYW1lc2JpbGxpbmdzL1dhemVlL3dhemVlLXVpL2Rpc3QvdG1wL2FwcC8rdXNlci1tYW5hZ2VtZW50L3VzZXItbWFuYWdlbWVudC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiICJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
