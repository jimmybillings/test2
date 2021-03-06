/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from './commerce.module';
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
import * as i17 from '../+asset/components/asset-share.component.ngfactory';
import * as i18 from './+cart/cart.component.ngfactory';
import * as i19 from './+cart/components/cart-asset.component.ngfactory';
import * as i20 from './+order/+index/orders.component.ngfactory';
import * as i21 from './+order/+show/order-show.component.ngfactory';
import * as i22 from './+order/components/invoice.component.ngfactory';
import * as i23 from './+order/components/order-asset.component.ngfactory';
import * as i24 from './+quote/+index/quotes.component.ngfactory';
import * as i25 from './+quote/+show/quote-show.component.ngfactory';
import * as i26 from './+quote/components/quote-show-asset.component.ngfactory';
import * as i27 from './+quote/+edit/quote-edit.component.ngfactory';
import * as i28 from './+quote/components/quote-edit-asset.component.ngfactory';
import * as i29 from './components/license-agreement/license-agreement.component.ngfactory';
import * as i30 from '@angular/common';
import * as i31 from '@angular/forms';
import * as i32 from '@angular/cdk/bidi';
import * as i33 from '@angular/platform-browser';
import * as i34 from '@angular/cdk/a11y';
import * as i35 from '@angular/cdk/platform';
import * as i36 from '@angular/cdk/collections';
import * as i37 from '@angular/cdk/observers';
import * as i38 from '@angular/cdk/overlay';
import * as i39 from '@angular/http';
import * as i40 from '@angular/material/icon';
import * as i41 from '@angular/material/datepicker';
import * as i42 from '@angular/material/core';
import * as i43 from '@angular/material/menu';
import * as i44 from '@angular/material/select';
import * as i45 from '@angular/material/tooltip';
import * as i46 from '@angular/material/paginator';
import * as i47 from '@angular/material/snack-bar';
import * as i48 from '../shared/modules/wz-form/wz.form.model';
import * as i49 from '../shared/modules/wz-form/services/google-places.service';
import * as i50 from '../shared/services/window-ref.service';
import * as i51 from '@ngrx/store';
import * as i52 from '@ngrx/store-devtools';
import * as i53 from './services/commerce.capabilities';
import * as i54 from '../shared/services/current-user.service';
import * as i55 from '../app.store';
import * as i56 from '../shared/stores/feature.store';
import * as i57 from './+cart/services/cart.resolver';
import * as i58 from './+cart/services/cart-asset.resolver';
import * as i59 from './+order/services/order.resolver';
import * as i60 from './+order/services/orders.resolver';
import * as i61 from '../shared/services/orders.service';
import * as i62 from './+order/services/order-asset.resolver';
import * as i63 from './+quote/services/quote-show.resolver';
import * as i64 from './+quote/services/quote-edit-asset.resolver';
import * as i65 from './+quote/services/quotes.resolver';
import * as i66 from '../shared/services/quotes.service';
import * as i67 from './+quote/services/quote-edit.resolver';
import * as i68 from './+cart/services/cart.guard';
import * as i69 from './+quote/services/quote-edit.guard';
import * as i70 from './+quote/services/quote-show-asset.resolver';
import * as i71 from './+order/services/invoice.resolver';
import * as i72 from '@angular/router';
import * as i73 from '@ngx-translate/core/index';
import * as i74 from '@angular/material/button';
import * as i75 from '@angular/material/button-toggle';
import * as i76 from '@angular/material/card';
import * as i77 from '@angular/material/checkbox';
import * as i78 from '@angular/cdk/portal';
import * as i79 from '@angular/cdk/scrolling';
import * as i80 from '@angular/material/dialog';
import * as i81 from '@angular/material/form-field';
import * as i82 from '@angular/material/grid-list';
import * as i83 from '@angular/material/input';
import * as i84 from '@angular/material/list';
import * as i85 from '@angular/material/progress-bar';
import * as i86 from '@angular/material/progress-spinner';
import * as i87 from '@angular/material/radio';
import * as i88 from '@angular/material/sidenav';
import * as i89 from '@angular/material/slide-toggle';
import * as i90 from '@angular/material/slider';
import * as i91 from '@angular/material/tabs';
import * as i92 from '@angular/material/toolbar';
import * as i93 from '../shared/modules/wz-design/wz.design.module';
import * as i94 from '../shared/modules/wz-player/wz.player.module';
import * as i95 from '../shared/modules/wz-form/wz-form.module';
import * as i96 from '../shared/modules/wz-dialog/wz.dialog.module';
import * as i97 from '../shared/services/search-context.service';
import * as i98 from '../shared/stores/collections.store';
import * as i99 from '../shared/services/filter.service';
import * as i100 from '../shared/services/user-preference.service';
import * as i101 from '../shared/services/collection-context.service';
import * as i102 from '../shared/services/sort-definitions.service';
import * as i103 from '../shared/stores/orders.store';
import * as i104 from '../shared/stores/gallery-view.store';
import * as i105 from '../shared/stores/quotes.store';
import * as i106 from '../store/active-collection/active-collection.state';
import * as i107 from '../store/asset/asset.state';
import * as i108 from '../store/cart/cart.state';
import * as i109 from '../store/checkout/checkout.state';
import * as i110 from '../store/comment/comment.state';
import * as i111 from '../store/delivery-options/delivery-options.state';
import * as i112 from '../store/header-display-options/header-display-options.state';
import * as i113 from '../store/invoice/invoice.state';
import * as i114 from '../store/loading-indicator/loading-indicator.state';
import * as i115 from '../store/multi-lingual/multi-lingual.state';
import * as i116 from '../store/order/order.state';
import * as i117 from '../store/pricing/pricing.state';
import * as i118 from '../store/privacy-policy/privacy-policy.state';
import * as i119 from '../store/quote-edit/quote-edit.state';
import * as i120 from '../store/quote-show/quote-show.state';
import * as i121 from '../store/search/search.state';
import * as i122 from '../store/sharing/sharing.state';
import * as i123 from '../store/snackbar/snackbar.state';
import * as i124 from '../store/speed-preview/speed-preview.state';
import * as i125 from '../store/ui-config/ui-config.state';
import * as i126 from '../store/fee-config/fee-config.state';
import * as i127 from '@ngrx/effects';
import * as i128 from '../store/account/account.effects';
import * as i129 from '../store/account/account.service';
import * as i130 from '../store/active-collection/active-collection.effects';
import * as i131 from '../store/active-collection/active-collection.service';
import * as i132 from '../store/activity/activity.effects';
import * as i133 from '../store/activity/activity.service';
import * as i134 from '../store/asset/asset.effects';
import * as i135 from '../store/asset/asset.service';
import * as i136 from '../store/cart/cart.effects';
import * as i137 from '../store/cart/cart.service';
import * as i138 from '../store/collections/collections.effects';
import * as i139 from '../store/collections/collections.service';
import * as i140 from '../store/comment/comment.effects';
import * as i141 from '../store/comment/comment.service';
import * as i142 from '../store/delivery-options/delivery-options.effects';
import * as i143 from '../store/delivery-options/delivery-options.service';
import * as i144 from '../shared/modules/wz-dialog/services/wz.dialog.service';
import * as i145 from '../store/dialog/dialog.effects';
import * as i146 from '../store/error/error.effects';
import * as i147 from '../store/fee-config/fee-config.effects';
import * as i148 from '../store/fee-config/fee-config.service';
import * as i149 from '../store/header-display-options/header-display-options.effects';
import * as i150 from '../store/invoice/invoice.effects';
import * as i151 from '../store/invoice/invoice.service';
import * as i152 from '@ngx-translate/core/src/translate.store';
import * as i153 from '@angular/common/http';
import * as i154 from '@ngx-translate/core/src/translate.loader';
import * as i155 from '../shared/shared.module';
import * as i156 from '@ngx-translate/core/src/translate.compiler';
import * as i157 from '@ngx-translate/core/src/translate.parser';
import * as i158 from '@ngx-translate/core/src/missing-translation-handler';
import * as i159 from '@ngx-translate/core/src/translate.service';
import * as i160 from '../store/multi-lingual/multi-lingual.effects';
import * as i161 from '../shared/services/api.config';
import * as i162 from '../store/notifier/notifier.effects';
import * as i163 from '../store/order/order.effects';
import * as i164 from '../store/order/order.service';
import * as i165 from '../store/page-data/page-data.effects';
import * as i166 from '../store/page-data/page-data.service';
import * as i167 from '../store/pricing/pricing.effects';
import * as i168 from '../store/pricing/pricing.service';
import * as i169 from '../store/privacy-policy/privacy-policy.effects';
import * as i170 from '../store/privacy-policy/privacy-policy.service';
import * as i171 from '../store/quote-edit/quote-edit.effects';
import * as i172 from '../store/quote-edit/quote-edit.service';
import * as i173 from '../store/quote-show/quote-show.effects';
import * as i174 from '../store/quote-show/quote-show.service';
import * as i175 from '../store/router/router.effects';
import * as i176 from '../store/search/search.effects';
import * as i177 from '../store/search/search.service';
import * as i178 from '../store/sharing/sharing.effects';
import * as i179 from '../store/sharing/sharing.service';
import * as i180 from '../shared/services/collections.service';
import * as i181 from '../store/snackbar/snackbar.effects';
import * as i182 from '../store/snackbar/snackbar.service';
import * as i183 from '../store/speed-preview/speed-preview.effects';
import * as i184 from '../store/speed-preview/speed-preview.service';
import * as i185 from '../store/ui-config/ui-config.effects';
import * as i186 from '../store/ui-config/ui-config.service';
import * as i187 from '../store/user/user.effects';
import * as i188 from '../store/user/user.service';
import * as i189 from '../shared/modules/wz-asset/wz-asset.module';
import * as i190 from '../+asset/asset.module';
import * as i191 from './+cart/cart.component';
import * as i192 from './+cart/components/cart-asset.component';
import * as i193 from './+order/+index/orders.component';
import * as i194 from './+order/+show/order-show.component';
import * as i195 from './+order/components/invoice.component';
import * as i196 from './+order/components/order-asset.component';
import * as i197 from './+quote/+index/quotes.component';
import * as i198 from './+quote/+show/quote-show.component';
import * as i199 from './+quote/components/quote-show-asset.component';
import * as i200 from './+quote/+edit/quote-edit.component';
import * as i201 from './+quote/components/quote-edit-asset.component';
export const CommerceModuleNgFactory:i0.NgModuleFactory<i1.CommerceModule> = i0.ɵcmf(i1.CommerceModule,
    ([] as any[]),(_l:any) => {
      return i0.ɵmod([i0.ɵmpd(512,i0.ComponentFactoryResolver,i0.ɵCodegenComponentFactoryResolver,
          [[8,[i2.MatDialogContainerNgFactory,i3.MatDatepickerContentNgFactory,i4.TooltipComponentNgFactory,
              i5.MatSnackBarContainerNgFactory,i5.SimpleSnackBarNgFactory,i6.WzAddressFormComponentNgFactory,
              i7.WzNotificationDialogComponentNgFactory,i8.WzFormDialogComponentNgFactory,
              i9.WzConfirmationDialogComponentNgFactory,i10.WzSpeedviewComponentNgFactory,
              i11.CollectionLinkComponentNgFactory,i12.CollectionFormComponentNgFactory,
              i13.WzTermsComponentNgFactory,i14.WzPricingComponentNgFactory,i15.WzComingSoonComponentNgFactory,
              i16.WzSubclipEditorComponentNgFactory,i17.AssetShareComponentNgFactory,
              i18.CartComponentNgFactory,i19.CartAssetComponentNgFactory,i20.OrdersComponentNgFactory,
              i21.OrderShowComponentNgFactory,i22.InvoiceComponentNgFactory,i23.OrderAssetComponentNgFactory,
              i24.QuotesComponentNgFactory,i25.QuoteShowComponentNgFactory,i26.QuoteShowAssetComponentNgFactory,
              i27.QuoteEditComponentNgFactory,i28.QuoteEditAssetComponentNgFactory,
              i29.LicenseAgreementComponentNgFactory]],[3,i0.ComponentFactoryResolver],
              i0.NgModuleRef]),i0.ɵmpd(4608,i30.NgLocalization,i30.NgLocaleLocalization,
          [i0.LOCALE_ID]),i0.ɵmpd(4608,i31.ɵi,i31.ɵi,([] as any[])),i0.ɵmpd(4608,i31.FormBuilder,
          i31.FormBuilder,([] as any[])),i0.ɵmpd(6144,i32.DIR_DOCUMENT,(null as any),
          [i33.DOCUMENT]),i0.ɵmpd(4608,i32.Directionality,i32.Directionality,[[2,i32.DIR_DOCUMENT]]),
          i0.ɵmpd(4608,i34.InteractivityChecker,i34.InteractivityChecker,[i35.Platform]),
          i0.ɵmpd(4608,i34.FocusTrapFactory,i34.FocusTrapFactory,[i34.InteractivityChecker,
              i35.Platform,i0.NgZone]),i0.ɵmpd(136192,i34.AriaDescriber,i34.ARIA_DESCRIBER_PROVIDER_FACTORY,
              [[3,i34.AriaDescriber],i35.Platform]),i0.ɵmpd(5120,i34.LiveAnnouncer,
              i34.LIVE_ANNOUNCER_PROVIDER_FACTORY,[[3,i34.LiveAnnouncer],[2,i34.LIVE_ANNOUNCER_ELEMENT_TOKEN],
                  i35.Platform]),i0.ɵmpd(5120,i34.FocusMonitor,i34.FOCUS_MONITOR_PROVIDER_FACTORY,
              [[3,i34.FocusMonitor],i0.NgZone,i35.Platform]),i0.ɵmpd(5120,i36.UniqueSelectionDispatcher,
              i36.ɵa,[[3,i36.UniqueSelectionDispatcher]]),i0.ɵmpd(4608,i37.MatMutationObserverFactory,
              i37.MatMutationObserverFactory,([] as any[])),i0.ɵmpd(5120,i38.ɵc,i38.ɵd,
              [i38.Overlay]),i0.ɵmpd(4608,i39.BrowserXhr,i39.BrowserXhr,([] as any[])),
          i0.ɵmpd(4608,i39.ResponseOptions,i39.BaseResponseOptions,([] as any[])),
          i0.ɵmpd(5120,i39.XSRFStrategy,i39.ɵb,([] as any[])),i0.ɵmpd(4608,i39.XHRBackend,
              i39.XHRBackend,[i39.BrowserXhr,i39.ResponseOptions,i39.XSRFStrategy]),
          i0.ɵmpd(4608,i39.RequestOptions,i39.BaseRequestOptions,([] as any[])),i0.ɵmpd(5120,
              i39.Http,i39.ɵc,[i39.XHRBackend,i39.RequestOptions]),i0.ɵmpd(5120,i40.MatIconRegistry,
              i40.ICON_REGISTRY_PROVIDER_FACTORY,[[3,i40.MatIconRegistry],[2,i39.Http],
                  i33.DomSanitizer]),i0.ɵmpd(4608,i41.MatDatepickerIntl,i41.MatDatepickerIntl,
              ([] as any[])),i0.ɵmpd(5120,i41.MAT_DATEPICKER_SCROLL_STRATEGY,i41.MAT_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i38.Overlay]),i0.ɵmpd(4608,i42.ErrorStateMatcher,i42.ErrorStateMatcher,
              ([] as any[])),i0.ɵmpd(5120,i43.MAT_MENU_SCROLL_STRATEGY,i43.ɵc22,[i38.Overlay]),
          i0.ɵmpd(5120,i44.MAT_SELECT_SCROLL_STRATEGY,i44.MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i38.Overlay]),i0.ɵmpd(5120,i45.MAT_TOOLTIP_SCROLL_STRATEGY,i45.MAT_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i38.Overlay]),i0.ɵmpd(4608,i46.MatPaginatorIntl,i46.MatPaginatorIntl,
              ([] as any[])),i0.ɵmpd(4608,i33.HAMMER_GESTURE_CONFIG,i42.GestureConfig,
              ([] as any[])),i0.ɵmpd(4608,i47.MatSnackBar,i47.MatSnackBar,[i38.Overlay,
              i34.LiveAnnouncer,i0.Injector,[3,i47.MatSnackBar]]),i0.ɵmpd(6144,i42.MAT_DATE_LOCALE,
              (null as any),[i0.LOCALE_ID]),i0.ɵmpd(4608,i42.DateAdapter,i42.NativeDateAdapter,
              [[2,i42.MAT_DATE_LOCALE]]),i0.ɵmpd(4608,i48.FormModel,i48.FormModel,
              ([] as any[])),i0.ɵmpd(4608,i49.GooglePlacesService,i49.GooglePlacesService,
              [i50.WindowRef,i33.DOCUMENT]),i0.ɵmpd(135680,i51.State,i51.State,[i51.ActionsSubject,
              i51.ReducerObservable,i51.ScannedActionsSubject,i51.INITIAL_STATE]),
          i0.ɵmpd(5120,i52.ɵa,i52.ɵb,[i52.ɵj,i52.ɵh]),i0.ɵmpd(4608,i53.CommerceCapabilities,
              i53.CommerceCapabilities,[i54.CurrentUserService,i55.AppStore,i56.FeatureStore]),
          i0.ɵmpd(4608,i57.CartResolver,i57.CartResolver,[i55.AppStore]),i0.ɵmpd(4608,
              i58.CartAssetResolver,i58.CartAssetResolver,[i55.AppStore]),i0.ɵmpd(4608,
              i59.OrderResolver,i59.OrderResolver,[i55.AppStore]),i0.ɵmpd(4608,i60.OrdersResolver,
              i60.OrdersResolver,[i61.OrdersService]),i0.ɵmpd(4608,i62.OrderAssetResolver,
              i62.OrderAssetResolver,[i55.AppStore]),i0.ɵmpd(4608,i63.QuoteShowResolver,
              i63.QuoteShowResolver,[i55.AppStore]),i0.ɵmpd(4608,i64.QuoteEditAssetResolver,
              i64.QuoteEditAssetResolver,[i55.AppStore]),i0.ɵmpd(4608,i65.QuotesResolver,
              i65.QuotesResolver,[i66.QuotesService,i53.CommerceCapabilities]),i0.ɵmpd(4608,
              i67.QuoteEditResolver,i67.QuoteEditResolver,[i55.AppStore]),i0.ɵmpd(4608,
              i68.CartGuard,i68.CartGuard,[i53.CommerceCapabilities,i55.AppStore]),
          i0.ɵmpd(4608,i69.QuoteEditGuard,i69.QuoteEditGuard,[i53.CommerceCapabilities,
              i55.AppStore]),i0.ɵmpd(4608,i70.QuoteShowAssetResolver,i70.QuoteShowAssetResolver,
              [i55.AppStore]),i0.ɵmpd(4608,i71.InvoiceResolver,i71.InvoiceResolver,
              [i55.AppStore]),i0.ɵmpd(512,i30.CommonModule,i30.CommonModule,([] as any[])),
          i0.ɵmpd(512,i72.RouterModule,i72.RouterModule,[[2,i72.ɵa],[2,i72.Router]]),
          i0.ɵmpd(512,i31.ɵba,i31.ɵba,([] as any[])),i0.ɵmpd(512,i31.FormsModule,i31.FormsModule,
              ([] as any[])),i0.ɵmpd(512,i73.TranslateModule,i73.TranslateModule,([] as any[])),
          i0.ɵmpd(512,i31.ReactiveFormsModule,i31.ReactiveFormsModule,([] as any[])),
          i0.ɵmpd(512,i42.CompatibilityModule,i42.CompatibilityModule,([] as any[])),
          i0.ɵmpd(512,i32.BidiModule,i32.BidiModule,([] as any[])),i0.ɵmpd(256,i42.MATERIAL_SANITY_CHECKS,
              true,([] as any[])),i0.ɵmpd(512,i42.MatCommonModule,i42.MatCommonModule,
              [[2,i42.MATERIAL_SANITY_CHECKS]]),i0.ɵmpd(512,i35.PlatformModule,i35.PlatformModule,
              ([] as any[])),i0.ɵmpd(512,i42.MatRippleModule,i42.MatRippleModule,([] as any[])),
          i0.ɵmpd(512,i34.A11yModule,i34.A11yModule,([] as any[])),i0.ɵmpd(512,i74.MatButtonModule,
              i74.MatButtonModule,([] as any[])),i0.ɵmpd(512,i75.MatButtonToggleModule,
              i75.MatButtonToggleModule,([] as any[])),i0.ɵmpd(512,i76.MatCardModule,
              i76.MatCardModule,([] as any[])),i0.ɵmpd(512,i37.ObserversModule,i37.ObserversModule,
              ([] as any[])),i0.ɵmpd(512,i77.MatCheckboxModule,i77.MatCheckboxModule,
              ([] as any[])),i0.ɵmpd(512,i78.PortalModule,i78.PortalModule,([] as any[])),
          i0.ɵmpd(512,i79.ScrollDispatchModule,i79.ScrollDispatchModule,([] as any[])),
          i0.ɵmpd(512,i38.OverlayModule,i38.OverlayModule,([] as any[])),i0.ɵmpd(512,
              i80.MatDialogModule,i80.MatDialogModule,([] as any[])),i0.ɵmpd(512,i40.MatIconModule,
              i40.MatIconModule,([] as any[])),i0.ɵmpd(512,i41.MatDatepickerModule,
              i41.MatDatepickerModule,([] as any[])),i0.ɵmpd(512,i81.MatFormFieldModule,
              i81.MatFormFieldModule,([] as any[])),i0.ɵmpd(512,i42.MatLineModule,
              i42.MatLineModule,([] as any[])),i0.ɵmpd(512,i82.MatGridListModule,i82.MatGridListModule,
              ([] as any[])),i0.ɵmpd(512,i83.MatInputModule,i83.MatInputModule,([] as any[])),
          i0.ɵmpd(512,i42.MatPseudoCheckboxModule,i42.MatPseudoCheckboxModule,([] as any[])),
          i0.ɵmpd(512,i84.MatListModule,i84.MatListModule,([] as any[])),i0.ɵmpd(512,
              i43.MatMenuModule,i43.MatMenuModule,([] as any[])),i0.ɵmpd(512,i42.MatOptionModule,
              i42.MatOptionModule,([] as any[])),i0.ɵmpd(512,i44.MatSelectModule,i44.MatSelectModule,
              ([] as any[])),i0.ɵmpd(512,i45.MatTooltipModule,i45.MatTooltipModule,
              ([] as any[])),i0.ɵmpd(512,i46.MatPaginatorModule,i46.MatPaginatorModule,
              ([] as any[])),i0.ɵmpd(512,i85.MatProgressBarModule,i85.MatProgressBarModule,
              ([] as any[])),i0.ɵmpd(512,i86.MatProgressSpinnerModule,i86.MatProgressSpinnerModule,
              ([] as any[])),i0.ɵmpd(512,i87.MatRadioModule,i87.MatRadioModule,([] as any[])),
          i0.ɵmpd(512,i88.MatSidenavModule,i88.MatSidenavModule,([] as any[])),i0.ɵmpd(512,
              i89.MatSlideToggleModule,i89.MatSlideToggleModule,([] as any[])),i0.ɵmpd(512,
              i90.MatSliderModule,i90.MatSliderModule,([] as any[])),i0.ɵmpd(512,i47.MatSnackBarModule,
              i47.MatSnackBarModule,([] as any[])),i0.ɵmpd(512,i91.MatTabsModule,i91.MatTabsModule,
              ([] as any[])),i0.ɵmpd(512,i92.MatToolbarModule,i92.MatToolbarModule,
              ([] as any[])),i0.ɵmpd(512,i42.NativeDateModule,i42.NativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i42.MatNativeDateModule,i42.MatNativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i93.MaterialModule,i93.MaterialModule,([] as any[])),
          i0.ɵmpd(512,i94.WzPlayerModule,i94.WzPlayerModule,([] as any[])),i0.ɵmpd(512,
              i95.WzFormModule,i95.WzFormModule,([] as any[])),i0.ɵmpd(512,i96.WzDialogModule,
              i96.WzDialogModule,([] as any[])),i0.ɵmpd(131584,i51.ActionsSubject,
              i51.ActionsSubject,([] as any[])),i0.ɵmpd(131584,i52.ɵg,i52.ɵg,([] as any[])),
          i0.ɵmpd(2048,i51.ReducerManagerDispatcher,(null as any),[i52.ɵg]),i0.ɵmpd(256,
              i51._INITIAL_STATE,(undefined as any),([] as any[])),i0.ɵmpd(1024,i51.INITIAL_STATE,
              i51._initialStateFactory,[i51._INITIAL_STATE]),i0.ɵmpd(256,i51._INITIAL_REDUCERS,
              {currentUser:i54.currentUser,searchContext:i97.searchContext,collections:i98.collections,
                  filters:i99.filters,userPreferences:i100.userPreferences,collectionOptions:i101.collectionOptions,
                  sortDefinitions:i102.sortDefinitions,orders:i103.orders,features:i56.features,
                  gallery:i104.gallery,quotes:i105.quotes,activeCollection:i106.reducer,
                  asset:i107.reducer,cart:i108.reducer,checkout:i109.reducer,comment:i110.reducer,
                  deliveryOptions:i111.reducer,headerDisplayOptions:i112.reducer,invoice:i113.reducer,
                  loadingIndicator:i114.reducer,multiLingual:i115.reducer,order:i116.reducer,
                  pricing:i117.reducer,privacyPolicy:i118.reducer,quoteEdit:i119.reducer,
                  quoteShow:i120.reducer,search:i121.reducer,sharing:i122.reducer,
                  snackbar:i123.reducer,speedPreview:i124.reducer,uiConfig:i125.reducer,
                  feeConfig:i126.reducer},([] as any[])),i0.ɵmpd(2048,i51._STORE_REDUCERS,
              (null as any),[i51._INITIAL_REDUCERS]),i0.ɵmpd(1024,i51.INITIAL_REDUCERS,
              i51._createStoreReducers,[i0.Injector,i51._INITIAL_REDUCERS,i51._STORE_REDUCERS]),
          i0.ɵmpd(256,i51._REDUCER_FACTORY,i51.combineReducers,([] as any[])),i0.ɵmpd(256,
              i51.META_REDUCERS,([] as any[]),([] as any[])),i0.ɵmpd(1024,i51.REDUCER_FACTORY,
              i51.createReducerFactory,[i51._REDUCER_FACTORY,i51.META_REDUCERS]),i0.ɵmpd(131584,
              i51.ReducerManager,i51.ReducerManager,[i51.ReducerManagerDispatcher,
                  i51.INITIAL_STATE,i51.INITIAL_REDUCERS,i51.REDUCER_FACTORY]),i0.ɵmpd(2048,
              i51.ReducerObservable,(null as any),[i51.ReducerManager]),i0.ɵmpd(131584,
              i51.ScannedActionsSubject,i51.ScannedActionsSubject,([] as any[])),i0.ɵmpd(512,
              i51.StoreRootModule,i51.StoreRootModule,[i51.ActionsSubject,i51.ReducerObservable,
                  i51.ScannedActionsSubject]),i0.ɵmpd(512,i52.StoreDevtoolsModule,
              i52.StoreDevtoolsModule,([] as any[])),i0.ɵmpd(1024,i127.ɵf,i127.ɵb,
              ([] as any[])),i0.ɵmpd(512,i127.ɵh,i127.ɵh,[i127.ɵf]),i0.ɵmpd(512,i127.EffectSources,
              i127.EffectSources,[i127.ɵh]),i0.ɵmpd(1024,i52.ɵj,i52.ɵc,([] as any[])),
          i0.ɵmpd(512,i52.ɵk,i52.ɵk,[i52.ɵj]),i0.ɵmpd(256,i52.ɵi,{},([] as any[])),
          i0.ɵmpd(1024,i52.ɵh,i52.ɵf,[i52.ɵi]),i0.ɵmpd(512,i52.StoreDevtools,i52.StoreDevtools,
              [i52.ɵg,i51.ActionsSubject,i51.ReducerObservable,i52.ɵk,i51.ScannedActionsSubject,
                  i51.INITIAL_STATE,i52.ɵh]),i0.ɵmpd(1024,i51.StateObservable,i52.ɵd,
              [i52.StoreDevtools]),i0.ɵmpd(512,i51.Store,i51.Store,[i51.StateObservable,
              i51.ActionsSubject,i51.ReducerManager]),i0.ɵmpd(131584,i127.ɵi,i127.ɵi,
              [i127.EffectSources,i51.Store]),i0.ɵmpd(512,i127.Actions,i127.Actions,
              [i51.ScannedActionsSubject]),i0.ɵmpd(512,i128.AccountEffects,i128.AccountEffects,
              [i127.Actions,i55.AppStore,i129.AccountService]),i0.ɵmpd(512,i130.ActiveCollectionEffects,
              i130.ActiveCollectionEffects,[i127.Actions,i55.AppStore,i131.ActiveCollectionService,
                  i100.UserPreferenceService]),i0.ɵmpd(512,i132.ActivityEffects,i132.ActivityEffects,
              [i127.Actions,i133.ActivityService]),i0.ɵmpd(512,i134.AssetEffects,i134.AssetEffects,
              [i127.Actions,i55.AppStore,i135.AssetService]),i0.ɵmpd(512,i136.CartEffects,
              i136.CartEffects,[i127.Actions,i55.AppStore,i137.FutureCartService]),
          i0.ɵmpd(512,i138.CollectionsEffects,i138.CollectionsEffects,[i127.Actions,
              i55.AppStore,i139.FutureCollectionsService]),i0.ɵmpd(512,i140.CommentEffects,
              i140.CommentEffects,[i127.Actions,i55.AppStore,i141.CommentService]),
          i0.ɵmpd(512,i142.DeliveryOptionsEffects,i142.DeliveryOptionsEffects,[i127.Actions,
              i55.AppStore,i143.DeliveryOptionsService,i50.WindowRef]),i0.ɵmpd(512,
              i35.Platform,i35.Platform,([] as any[])),i0.ɵmpd(1024,i79.ScrollDispatcher,
              i79.SCROLL_DISPATCHER_PROVIDER_FACTORY,[[3,i79.ScrollDispatcher],i0.NgZone,
                  i35.Platform]),i0.ɵmpd(1024,i79.ViewportRuler,i79.VIEWPORT_RULER_PROVIDER_FACTORY,
              [[3,i79.ViewportRuler],i35.Platform,i0.NgZone,i79.ScrollDispatcher]),
          i0.ɵmpd(512,i38.ScrollStrategyOptions,i38.ScrollStrategyOptions,[i79.ScrollDispatcher,
              i79.ViewportRuler]),i0.ɵmpd(1024,i38.OverlayContainer,i38.ɵa,[[3,i38.OverlayContainer]]),
          i0.ɵmpd(512,i38.ɵf,i38.ɵf,[i79.ViewportRuler]),i0.ɵmpd(512,i38.Overlay,i38.Overlay,
              [i38.ScrollStrategyOptions,i38.OverlayContainer,i0.ComponentFactoryResolver,
                  i38.ɵf,i0.ApplicationRef,i0.Injector,i0.NgZone]),i0.ɵmpd(1024,i80.MAT_DIALOG_SCROLL_STRATEGY,
              i80.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,[i38.Overlay]),i0.ɵmpd(512,
              i80.MatDialog,i80.MatDialog,[i38.Overlay,i0.Injector,[2,i30.Location],
                  i80.MAT_DIALOG_SCROLL_STRATEGY,[3,i80.MatDialog]]),i0.ɵmpd(512,i144.WzDialogService,
              i144.WzDialogService,[i80.MatDialog]),i0.ɵmpd(512,i145.DialogEffects,
              i145.DialogEffects,[i127.Actions,i55.AppStore,i144.WzDialogService]),
          i0.ɵmpd(512,i146.ErrorEffects,i146.ErrorEffects,[i127.Actions,i55.AppStore,
              i54.CurrentUserService,i30.Location]),i0.ɵmpd(512,i147.FeeConfigEffects,
              i147.FeeConfigEffects,[i127.Actions,i55.AppStore,i148.FeeConfigService]),
          i0.ɵmpd(512,i149.HeaderDisplayOptionsEffects,i149.HeaderDisplayOptionsEffects,
              [i127.Actions,i55.AppStore]),i0.ɵmpd(512,i150.InvoiceEffects,i150.InvoiceEffects,
              [i127.Actions,i55.AppStore,i151.InvoiceService]),i0.ɵmpd(512,i152.TranslateStore,
              i152.TranslateStore,([] as any[])),i0.ɵmpd(512,i153.ɵd,i153.ɵd,([] as any[])),
          i0.ɵmpd(2048,i153.XhrFactory,(null as any),[i153.ɵd]),i0.ɵmpd(512,i153.HttpXhrBackend,
              i153.HttpXhrBackend,[i153.XhrFactory]),i0.ɵmpd(2048,i153.HttpBackend,
              (null as any),[i153.HttpXhrBackend]),i0.ɵmpd(256,i153.ɵe,'XSRF-TOKEN',
              ([] as any[])),i0.ɵmpd(512,i153.HttpXsrfTokenExtractor,i153.ɵg,[i30.DOCUMENT,
              i0.PLATFORM_ID,i153.ɵe]),i0.ɵmpd(256,i153.ɵf,'X-XSRF-TOKEN',([] as any[])),
          i0.ɵmpd(512,i153.ɵh,i153.ɵh,[i153.HttpXsrfTokenExtractor,i153.ɵf]),i0.ɵmpd(1024,
              i153.HTTP_INTERCEPTORS,(p0_0:any) => {
                return [p0_0];
              },[i153.ɵh]),i0.ɵmpd(1024,i153.HttpHandler,i153.ɵinterceptingHandler,
              [i153.HttpBackend,[2,i153.HTTP_INTERCEPTORS]]),i0.ɵmpd(512,i153.HttpClient,
              i153.HttpClient,[i153.HttpHandler]),i0.ɵmpd(1024,i154.TranslateLoader,
              i155.createTranslateLoader,[i153.HttpClient]),i0.ɵmpd(512,i156.TranslateCompiler,
              i156.TranslateFakeCompiler,([] as any[])),i0.ɵmpd(512,i157.TranslateParser,
              i157.TranslateDefaultParser,([] as any[])),i0.ɵmpd(512,i158.MissingTranslationHandler,
              i158.FakeMissingTranslationHandler,([] as any[])),i0.ɵmpd(256,i159.USE_DEFAULT_LANG,
              (undefined as any),([] as any[])),i0.ɵmpd(256,i159.USE_STORE,(undefined as any),
              ([] as any[])),i0.ɵmpd(512,i159.TranslateService,i159.TranslateService,
              [i152.TranslateStore,i154.TranslateLoader,i156.TranslateCompiler,i157.TranslateParser,
                  i158.MissingTranslationHandler,i159.USE_DEFAULT_LANG,i159.USE_STORE]),
          i0.ɵmpd(512,i160.MultiLingualEffects,i160.MultiLingualEffects,[i127.Actions,
              i55.AppStore,i159.TranslateService,i161.ApiConfig]),i0.ɵmpd(512,i162.NotifierEffects,
              i162.NotifierEffects,[i127.Actions,i144.WzDialogService]),i0.ɵmpd(512,
              i163.OrderEffects,i163.OrderEffects,[i127.Actions,i55.AppStore,i164.OrderService]),
          i0.ɵmpd(512,i165.PageDataEffects,i165.PageDataEffects,[i127.Actions,i55.AppStore,
              i166.PageDataService]),i0.ɵmpd(512,i167.PricingEffects,i167.PricingEffects,
              [i127.Actions,i55.AppStore,i168.PricingService,i144.WzDialogService]),
          i0.ɵmpd(512,i169.PrivacyPolicyEffects,i169.PrivacyPolicyEffects,[i127.Actions,
              i55.AppStore,i170.PrivacyPolicyService]),i0.ɵmpd(512,i171.QuoteEditEffects,
              i171.QuoteEditEffects,[i127.Actions,i55.AppStore,i172.FutureQuoteEditService]),
          i0.ɵmpd(512,i173.QuoteShowEffects,i173.QuoteShowEffects,[i127.Actions,i55.AppStore,
              i174.FutureQuoteShowService]),i0.ɵmpd(512,i175.RouterEffects,i175.RouterEffects,
              [i127.Actions,i72.Router,i30.Location]),i0.ɵmpd(512,i176.SearchEffects,
              i176.SearchEffects,[i127.Actions,i55.AppStore,i177.SearchService]),i0.ɵmpd(512,
              i178.SharingEffects,i178.SharingEffects,[i127.Actions,i55.AppStore,i179.SharingService,
                  i180.CollectionsService]),i0.ɵmpd(512,i181.SnackbarEffects,i181.SnackbarEffects,
              [i127.Actions,i55.AppStore,i182.SnackbarService]),i0.ɵmpd(512,i183.SpeedPreviewEffects,
              i183.SpeedPreviewEffects,[i127.Actions,i55.AppStore,i184.SpeedPreviewService]),
          i0.ɵmpd(512,i185.UiConfigEffects,i185.UiConfigEffects,[i127.Actions,i55.AppStore,
              i186.UiConfigService]),i0.ɵmpd(512,i187.UserEffects,i187.UserEffects,
              [i127.Actions,i55.AppStore,i188.FutureUserService]),i0.ɵmpd(1024,i127.ɵd,
              i127.ɵa,[i128.AccountEffects,i130.ActiveCollectionEffects,i132.ActivityEffects,
                  i134.AssetEffects,i136.CartEffects,i138.CollectionsEffects,i140.CommentEffects,
                  i142.DeliveryOptionsEffects,i145.DialogEffects,i146.ErrorEffects,
                  i147.FeeConfigEffects,i149.HeaderDisplayOptionsEffects,i150.InvoiceEffects,
                  i160.MultiLingualEffects,i162.NotifierEffects,i163.OrderEffects,
                  i165.PageDataEffects,i167.PricingEffects,i169.PrivacyPolicyEffects,
                  i171.QuoteEditEffects,i173.QuoteShowEffects,i175.RouterEffects,i176.SearchEffects,
                  i178.SharingEffects,i181.SnackbarEffects,i183.SpeedPreviewEffects,
                  i185.UiConfigEffects,i187.UserEffects]),i0.ɵmpd(512,i51.StoreModule,
              i51.StoreModule,([] as any[])),i0.ɵmpd(512,i127.ɵg,i127.ɵg,[i127.EffectSources,
              i127.ɵi,i127.ɵd,[2,i51.StoreModule]]),i0.ɵmpd(512,i153.HttpClientXsrfModule,
              i153.HttpClientXsrfModule,([] as any[])),i0.ɵmpd(512,i153.HttpClientModule,
              i153.HttpClientModule,([] as any[])),i0.ɵmpd(512,i39.HttpModule,i39.HttpModule,
              ([] as any[])),i0.ɵmpd(512,i189.WzAssetModule,i189.WzAssetModule,([] as any[])),
          i0.ɵmpd(512,i155.SharedModule,i155.SharedModule,([] as any[])),i0.ɵmpd(512,
              i190.AssetModule,i190.AssetModule,([] as any[])),i0.ɵmpd(512,i1.CommerceModule,
              i1.CommerceModule,([] as any[])),i0.ɵmpd(256,i43.MAT_MENU_DEFAULT_OPTIONS,
              {overlapTrigger:true,xPosition:'after',yPosition:'below'},([] as any[])),
          i0.ɵmpd(256,i42.MAT_DATE_FORMATS,i42.MAT_NATIVE_DATE_FORMATS,([] as any[])),
          i0.ɵmpd(1024,i72.ROUTES,() => {
            return [[{path:'cart',component:i191.CartComponent,resolve:{cart:i57.CartResolver},
                data:{title:'PAGE_TITLE.CART'}},{path:'cart/asset/:uuid',component:i192.CartAssetComponent,
                resolve:{asset:i58.CartAssetResolver},data:{title:'PAGE_TITLE.CART_ASSET'}},
                {path:'orders',component:i193.OrdersComponent,resolve:{orders:i60.OrdersResolver},
                    data:{title:'PAGE_TITLE.ORDERS'}},{path:'orders/:id',component:i194.OrderShowComponent,
                    resolve:{order:i59.OrderResolver},data:{title:'PAGE_TITLE.ORDER'}},
                {path:'orders/:id/invoice',component:i195.InvoiceComponent,resolve:{invoice:i71.InvoiceResolver},
                    data:{title:'PAGE_TITLE.INVOICE'}},{path:'orders/:id/asset/:uuid',
                    component:i196.OrderAssetComponent,resolve:{order:i62.OrderAssetResolver},
                    data:{title:'PAGE_TITLE.ORDER_ASSET'}},{path:'quotes',component:i197.QuotesComponent,
                    resolve:{quotes:i65.QuotesResolver},data:{title:'PAGE_TITLE.QUOTES'}},
                {path:'quotes/:id',component:i198.QuoteShowComponent,resolve:{quote:i63.QuoteShowResolver},
                    data:{title:'PAGE_TITLE.QUOTE'}},{path:'quotes/:id/asset/:uuid',
                    component:i199.QuoteShowAssetComponent,resolve:{quoteShowAsset:i70.QuoteShowAssetResolver},
                    data:{title:'PAGE_TITLE.QUOTE_ASSET'}},{path:'active-quote',component:i200.QuoteEditComponent,
                    resolve:{quote:i67.QuoteEditResolver},canActivate:[i69.QuoteEditGuard],
                    data:{title:'PAGE_TITLE.ACTIVE_QUOTE'}},{path:'active-quote/asset/:uuid',
                    component:i201.QuoteEditAssetComponent,resolve:{quoteEditAsset:i64.QuoteEditAssetResolver},
                    data:{title:'PAGE_TITLE.ACTIVE_QUOTE_ASSET'}}]];
          },([] as any[]))]);
    });
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLytjb21tZXJjZS9jb21tZXJjZS5tb2R1bGUubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvK2NvbW1lcmNlL2NvbW1lcmNlLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIgIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
