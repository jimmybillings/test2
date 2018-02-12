/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from './wz.dialog.module';
import * as i2 from '../../../../node_modules/@angular/material/dialog/typings/index.ngfactory';
import * as i3 from '../../../../node_modules/@angular/material/datepicker/typings/index.ngfactory';
import * as i4 from '../../../../node_modules/@angular/material/tooltip/typings/index.ngfactory';
import * as i5 from '../../../../node_modules/@angular/material/snack-bar/typings/index.ngfactory';
import * as i6 from '../wz-form/components/wz-address-form/wz.address-form.component.ngfactory';
import * as i7 from './components/wz.notification-dialog.component.ngfactory';
import * as i8 from './components/wz.form-dialog.component.ngfactory';
import * as i9 from './components/wz.confirmation-dialog.component.ngfactory';
import * as i10 from '@angular/common';
import * as i11 from '@angular/cdk/bidi';
import * as i12 from '@angular/platform-browser';
import * as i13 from '@angular/cdk/platform';
import * as i14 from '@angular/cdk/a11y';
import * as i15 from '@angular/cdk/collections';
import * as i16 from '@angular/cdk/observers';
import * as i17 from '@angular/cdk/scrolling';
import * as i18 from '@angular/cdk/overlay';
import * as i19 from '@angular/material/dialog';
import * as i20 from '@angular/material/icon';
import * as i21 from '@angular/http';
import * as i22 from '@angular/material/datepicker';
import * as i23 from '@angular/material/core';
import * as i24 from '@angular/material/menu';
import * as i25 from '@angular/material/select';
import * as i26 from '@angular/material/tooltip';
import * as i27 from '@angular/material/paginator';
import * as i28 from '@angular/material/snack-bar';
import * as i29 from '@angular/forms';
import * as i30 from '../wz-form/wz.form.model';
import * as i31 from '../wz-form/services/google-places.service';
import * as i32 from '../../services/window-ref.service';
import * as i33 from './services/wz.dialog.service';
import * as i34 from '@angular/material/button';
import * as i35 from '@angular/material/button-toggle';
import * as i36 from '@angular/material/card';
import * as i37 from '@angular/material/checkbox';
import * as i38 from '@angular/cdk/portal';
import * as i39 from '@angular/material/form-field';
import * as i40 from '@angular/material/grid-list';
import * as i41 from '@angular/material/input';
import * as i42 from '@angular/material/list';
import * as i43 from '@angular/material/progress-bar';
import * as i44 from '@angular/material/progress-spinner';
import * as i45 from '@angular/material/radio';
import * as i46 from '@angular/material/sidenav';
import * as i47 from '@angular/material/slide-toggle';
import * as i48 from '@angular/material/slider';
import * as i49 from '@angular/material/tabs';
import * as i50 from '@angular/material/toolbar';
import * as i51 from '../wz-design/wz.design.module';
import * as i52 from '@ngx-translate/core/index';
import * as i53 from '../wz-form/wz-form.module';
export const WzDialogModuleNgFactory:i0.NgModuleFactory<i1.WzDialogModule> = i0.ɵcmf(i1.WzDialogModule,
    ([] as any[]),(_l:any) => {
      return i0.ɵmod([i0.ɵmpd(512,i0.ComponentFactoryResolver,i0.ɵCodegenComponentFactoryResolver,
          [[8,[i2.MatDialogContainerNgFactory,i3.MatDatepickerContentNgFactory,i4.TooltipComponentNgFactory,
              i5.MatSnackBarContainerNgFactory,i5.SimpleSnackBarNgFactory,i6.WzAddressFormComponentNgFactory,
              i7.WzNotificationDialogComponentNgFactory,i8.WzFormDialogComponentNgFactory,
              i9.WzConfirmationDialogComponentNgFactory]],[3,i0.ComponentFactoryResolver],
              i0.NgModuleRef]),i0.ɵmpd(4608,i10.NgLocalization,i10.NgLocaleLocalization,
          [i0.LOCALE_ID]),i0.ɵmpd(6144,i11.DIR_DOCUMENT,(null as any),[i12.DOCUMENT]),
          i0.ɵmpd(4608,i11.Directionality,i11.Directionality,[[2,i11.DIR_DOCUMENT]]),
          i0.ɵmpd(4608,i13.Platform,i13.Platform,([] as any[])),i0.ɵmpd(4608,i14.InteractivityChecker,
              i14.InteractivityChecker,[i13.Platform]),i0.ɵmpd(4608,i14.FocusTrapFactory,
              i14.FocusTrapFactory,[i14.InteractivityChecker,i13.Platform,i0.NgZone]),
          i0.ɵmpd(136192,i14.AriaDescriber,i14.ARIA_DESCRIBER_PROVIDER_FACTORY,[[3,
              i14.AriaDescriber],i13.Platform]),i0.ɵmpd(5120,i14.LiveAnnouncer,i14.LIVE_ANNOUNCER_PROVIDER_FACTORY,
              [[3,i14.LiveAnnouncer],[2,i14.LIVE_ANNOUNCER_ELEMENT_TOKEN],i13.Platform]),
          i0.ɵmpd(5120,i14.FocusMonitor,i14.FOCUS_MONITOR_PROVIDER_FACTORY,[[3,i14.FocusMonitor],
              i0.NgZone,i13.Platform]),i0.ɵmpd(5120,i15.UniqueSelectionDispatcher,
              i15.ɵa,[[3,i15.UniqueSelectionDispatcher]]),i0.ɵmpd(4608,i16.MatMutationObserverFactory,
              i16.MatMutationObserverFactory,([] as any[])),i0.ɵmpd(5120,i17.ScrollDispatcher,
              i17.SCROLL_DISPATCHER_PROVIDER_FACTORY,[[3,i17.ScrollDispatcher],i0.NgZone,
                  i13.Platform]),i0.ɵmpd(5120,i17.ViewportRuler,i17.VIEWPORT_RULER_PROVIDER_FACTORY,
              [[3,i17.ViewportRuler],i13.Platform,i0.NgZone,i17.ScrollDispatcher]),
          i0.ɵmpd(4608,i18.ScrollStrategyOptions,i18.ScrollStrategyOptions,[i17.ScrollDispatcher,
              i17.ViewportRuler]),i0.ɵmpd(5120,i18.OverlayContainer,i18.ɵa,[[3,i18.OverlayContainer]]),
          i0.ɵmpd(4608,i18.ɵf,i18.ɵf,[i17.ViewportRuler]),i0.ɵmpd(4608,i18.Overlay,
              i18.Overlay,[i18.ScrollStrategyOptions,i18.OverlayContainer,i0.ComponentFactoryResolver,
                  i18.ɵf,i0.ApplicationRef,i0.Injector,i0.NgZone]),i0.ɵmpd(5120,i18.ɵc,
              i18.ɵd,[i18.Overlay]),i0.ɵmpd(5120,i19.MAT_DIALOG_SCROLL_STRATEGY,i19.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i18.Overlay]),i0.ɵmpd(4608,i19.MatDialog,i19.MatDialog,[i18.Overlay,
              i0.Injector,[2,i10.Location],i19.MAT_DIALOG_SCROLL_STRATEGY,[3,i19.MatDialog]]),
          i0.ɵmpd(5120,i20.MatIconRegistry,i20.ICON_REGISTRY_PROVIDER_FACTORY,[[3,
              i20.MatIconRegistry],[2,i21.Http],i12.DomSanitizer]),i0.ɵmpd(4608,i22.MatDatepickerIntl,
              i22.MatDatepickerIntl,([] as any[])),i0.ɵmpd(5120,i22.MAT_DATEPICKER_SCROLL_STRATEGY,
              i22.MAT_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,[i18.Overlay]),i0.ɵmpd(4608,
              i23.ErrorStateMatcher,i23.ErrorStateMatcher,([] as any[])),i0.ɵmpd(5120,
              i24.MAT_MENU_SCROLL_STRATEGY,i24.ɵc22,[i18.Overlay]),i0.ɵmpd(5120,i25.MAT_SELECT_SCROLL_STRATEGY,
              i25.MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,[i18.Overlay]),i0.ɵmpd(5120,
              i26.MAT_TOOLTIP_SCROLL_STRATEGY,i26.MAT_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i18.Overlay]),i0.ɵmpd(4608,i27.MatPaginatorIntl,i27.MatPaginatorIntl,
              ([] as any[])),i0.ɵmpd(4608,i12.HAMMER_GESTURE_CONFIG,i23.GestureConfig,
              ([] as any[])),i0.ɵmpd(4608,i28.MatSnackBar,i28.MatSnackBar,[i18.Overlay,
              i14.LiveAnnouncer,i0.Injector,[3,i28.MatSnackBar]]),i0.ɵmpd(6144,i23.MAT_DATE_LOCALE,
              (null as any),[i0.LOCALE_ID]),i0.ɵmpd(4608,i23.DateAdapter,i23.NativeDateAdapter,
              [[2,i23.MAT_DATE_LOCALE]]),i0.ɵmpd(4608,i29.ɵi,i29.ɵi,([] as any[])),
          i0.ɵmpd(4608,i29.FormBuilder,i29.FormBuilder,([] as any[])),i0.ɵmpd(4608,
              i30.FormModel,i30.FormModel,([] as any[])),i0.ɵmpd(4608,i31.GooglePlacesService,
              i31.GooglePlacesService,[i32.WindowRef,i12.DOCUMENT]),i0.ɵmpd(4608,i33.WzDialogService,
              i33.WzDialogService,[i19.MatDialog]),i0.ɵmpd(512,i10.CommonModule,i10.CommonModule,
              ([] as any[])),i0.ɵmpd(512,i23.CompatibilityModule,i23.CompatibilityModule,
              ([] as any[])),i0.ɵmpd(512,i11.BidiModule,i11.BidiModule,([] as any[])),
          i0.ɵmpd(256,i23.MATERIAL_SANITY_CHECKS,true,([] as any[])),i0.ɵmpd(512,i23.MatCommonModule,
              i23.MatCommonModule,[[2,i23.MATERIAL_SANITY_CHECKS]]),i0.ɵmpd(512,i13.PlatformModule,
              i13.PlatformModule,([] as any[])),i0.ɵmpd(512,i23.MatRippleModule,i23.MatRippleModule,
              ([] as any[])),i0.ɵmpd(512,i14.A11yModule,i14.A11yModule,([] as any[])),
          i0.ɵmpd(512,i34.MatButtonModule,i34.MatButtonModule,([] as any[])),i0.ɵmpd(512,
              i35.MatButtonToggleModule,i35.MatButtonToggleModule,([] as any[])),i0.ɵmpd(512,
              i36.MatCardModule,i36.MatCardModule,([] as any[])),i0.ɵmpd(512,i16.ObserversModule,
              i16.ObserversModule,([] as any[])),i0.ɵmpd(512,i37.MatCheckboxModule,
              i37.MatCheckboxModule,([] as any[])),i0.ɵmpd(512,i38.PortalModule,i38.PortalModule,
              ([] as any[])),i0.ɵmpd(512,i17.ScrollDispatchModule,i17.ScrollDispatchModule,
              ([] as any[])),i0.ɵmpd(512,i18.OverlayModule,i18.OverlayModule,([] as any[])),
          i0.ɵmpd(512,i19.MatDialogModule,i19.MatDialogModule,([] as any[])),i0.ɵmpd(512,
              i20.MatIconModule,i20.MatIconModule,([] as any[])),i0.ɵmpd(512,i22.MatDatepickerModule,
              i22.MatDatepickerModule,([] as any[])),i0.ɵmpd(512,i39.MatFormFieldModule,
              i39.MatFormFieldModule,([] as any[])),i0.ɵmpd(512,i23.MatLineModule,
              i23.MatLineModule,([] as any[])),i0.ɵmpd(512,i40.MatGridListModule,i40.MatGridListModule,
              ([] as any[])),i0.ɵmpd(512,i41.MatInputModule,i41.MatInputModule,([] as any[])),
          i0.ɵmpd(512,i23.MatPseudoCheckboxModule,i23.MatPseudoCheckboxModule,([] as any[])),
          i0.ɵmpd(512,i42.MatListModule,i42.MatListModule,([] as any[])),i0.ɵmpd(512,
              i24.MatMenuModule,i24.MatMenuModule,([] as any[])),i0.ɵmpd(512,i23.MatOptionModule,
              i23.MatOptionModule,([] as any[])),i0.ɵmpd(512,i25.MatSelectModule,i25.MatSelectModule,
              ([] as any[])),i0.ɵmpd(512,i26.MatTooltipModule,i26.MatTooltipModule,
              ([] as any[])),i0.ɵmpd(512,i27.MatPaginatorModule,i27.MatPaginatorModule,
              ([] as any[])),i0.ɵmpd(512,i43.MatProgressBarModule,i43.MatProgressBarModule,
              ([] as any[])),i0.ɵmpd(512,i44.MatProgressSpinnerModule,i44.MatProgressSpinnerModule,
              ([] as any[])),i0.ɵmpd(512,i45.MatRadioModule,i45.MatRadioModule,([] as any[])),
          i0.ɵmpd(512,i46.MatSidenavModule,i46.MatSidenavModule,([] as any[])),i0.ɵmpd(512,
              i47.MatSlideToggleModule,i47.MatSlideToggleModule,([] as any[])),i0.ɵmpd(512,
              i48.MatSliderModule,i48.MatSliderModule,([] as any[])),i0.ɵmpd(512,i28.MatSnackBarModule,
              i28.MatSnackBarModule,([] as any[])),i0.ɵmpd(512,i49.MatTabsModule,i49.MatTabsModule,
              ([] as any[])),i0.ɵmpd(512,i50.MatToolbarModule,i50.MatToolbarModule,
              ([] as any[])),i0.ɵmpd(512,i23.NativeDateModule,i23.NativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i23.MatNativeDateModule,i23.MatNativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i51.MaterialModule,i51.MaterialModule,([] as any[])),
          i0.ɵmpd(512,i52.TranslateModule,i52.TranslateModule,([] as any[])),i0.ɵmpd(512,
              i29.ɵba,i29.ɵba,([] as any[])),i0.ɵmpd(512,i29.FormsModule,i29.FormsModule,
              ([] as any[])),i0.ɵmpd(512,i29.ReactiveFormsModule,i29.ReactiveFormsModule,
              ([] as any[])),i0.ɵmpd(512,i53.WzFormModule,i53.WzFormModule,([] as any[])),
          i0.ɵmpd(512,i1.WzDialogModule,i1.WzDialogModule,([] as any[])),i0.ɵmpd(256,
              i24.MAT_MENU_DEFAULT_OPTIONS,{overlapTrigger:true,xPosition:'after',
                  yPosition:'below'},([] as any[])),i0.ɵmpd(256,i23.MAT_DATE_FORMATS,
              i23.MAT_NATIVE_DATE_FORMATS,([] as any[]))]);
    });
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy93ei5kaWFsb2cubW9kdWxlLm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy93ei5kaWFsb2cubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==