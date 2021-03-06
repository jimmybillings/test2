/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@ngx-translate/core/src/translate.pipe';
import * as i2 from '@ngx-translate/core/src/translate.service';
import * as i3 from '@angular/common';
import * as i4 from './quote-edit-tab.component';
import * as i5 from '../../../components/quote-purchase-type.component.ngfactory';
import * as i6 from '../../../components/quote-purchase-type.component';
import * as i7 from '../../../../components/project/projects.component.ngfactory';
import * as i8 from '../../../../components/project/projects.component';
import * as i9 from '../../../../../shared/modules/wz-dialog/services/wz.dialog.service';
import * as i10 from '../../../../../app.store';
import * as i11 from '../../../components/administer-quote.component.ngfactory';
import * as i12 from '../../../components/administer-quote.component';
import * as i13 from '../../../../../shared/services/capabilities.service';
import * as i14 from '../../../../../shared/services/window-ref.service';
import * as i15 from '../../../../../shared/services/user-preference.service';
import * as i16 from '@angular/platform-browser';
const styles_QuoteEditTabComponent:any[] = ([] as any[]);
export const RenderType_QuoteEditTabComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_QuoteEditTabComponent,data:{}});
function View_QuoteEditTabComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),10,'div',[['class',
      'subtotal mat-headline'],['flex','100'],['layout','row'],['layout-align','end center']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      2,'span',[['class','total-label'],['flex','100']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n        ',
      ' \n      '])),i0.ɵpid(131072,i1.TranslatePipe,[i2.TranslateService,i0.ChangeDetectorRef]),
      (_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),3,'span',[['class','total-amount'],['flex','nogrow']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n        ','\n      '])),i0.ɵpid(131072,i3.AsyncPipe,[i0.ChangeDetectorRef]),
      i0.ɵppd(4),(_l()(),i0.ɵted((null as any),['\n    ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i0.ɵunv(_v,3,0,i0.ɵnov(_v,4).transform('CART.CART_SUBTOTAL'));
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = i0.ɵunv(_v,7,0,_ck(_v,9,0,i0.ɵnov((<any>_v.parent),0),i0.ɵunv(_v,
        7,0,i0.ɵnov(_v,8).transform(_co.subTotal)),'USD',true,'1.2-2'));
    _ck(_v,7,0,currVal_1);
  });
}
function View_QuoteEditTabComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),9,'div',[['class',
      'discount mat-headline'],['flex','100'],['layout','row'],['layout-align','end center']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      2,'span',[['class','total-label'],['flex','100']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n        ',
      ' \n      '])),i0.ɵpid(131072,i1.TranslatePipe,[i2.TranslateService,i0.ChangeDetectorRef]),
      (_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),2,'span',[['class','total-amount'],['flex','nogrow']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),i0.ɵpid(131072,i3.AsyncPipe,[i0.ChangeDetectorRef]),(_l()(),i0.ɵted((null as any),
          ['\n    ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i0.ɵunv(_v,3,0,i0.ɵnov(_v,4).transform('CART.CART_DISCOUNT'));
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = i0.ɵunv(_v,7,0,i0.ɵnov(_v,8).transform(_co.discount));
    _ck(_v,7,0,currVal_1);
  });
}
function View_QuoteEditTabComponent_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),10,'div',[['class',
      'total mat-headline'],['flex','100'],['layout','row'],['layout-align','end center']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
      2,'span',[['class','total-label'],['flex','100']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n        ',
      ' \n      '])),i0.ɵpid(131072,i1.TranslatePipe,[i2.TranslateService,i0.ChangeDetectorRef]),
      (_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),3,'span',[['class','total-amount'],['flex','nogrow']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n        ','\n      '])),i0.ɵpid(131072,i3.AsyncPipe,[i0.ChangeDetectorRef]),
      i0.ɵppd(4),(_l()(),i0.ɵted((null as any),['\n    ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i0.ɵunv(_v,3,0,i0.ɵnov(_v,4).transform('CART.CART_TOTAL'));
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = i0.ɵunv(_v,7,0,_ck(_v,9,0,i0.ɵnov((<any>_v.parent),0),i0.ɵunv(_v,
        7,0,i0.ɵnov(_v,8).transform(_co.total)),'USD',true,'1.2-2'));
    _ck(_v,7,0,currVal_1);
  });
}
function View_QuoteEditTabComponent_4(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'div',[['class',
      'select-usage-warn'],['flex','100'],['layout','row'],['layout-align','end center']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n      ','\n    '])),i0.ɵpid(131072,i1.TranslatePipe,
      [i2.TranslateService,i0.ChangeDetectorRef])],(null as any),(_ck,_v) => {
    const currVal_0:any = i0.ɵunv(_v,1,0,i0.ɵnov(_v,2).transform('CART.SELECT_USAGE_WARN'));
    _ck(_v,1,0,currVal_0);
  });
}
export function View_QuoteEditTabComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[i0.ɵpid(0,i3.CurrencyPipe,[i0.LOCALE_ID]),(_l()(),i0.ɵeld(0,(null as any),
      (null as any),2,'quote-purchase-type-component',[['flex','100'],['flex-gt-xs',
          'auto'],['layout','column'],['layout-align','start'],['layout-gt-xs','row']],
      (null as any),[[(null as any),'selectQuoteType']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i4.QuoteEditTabComponent = _v.component;
        if (('selectQuoteType' === en)) {
          const pd_0:any = ((<any>_co.onSelectQuoteType($event)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i5.View_QuotePurchaseTypeComponent_0,i5.RenderType_QuotePurchaseTypeComponent)),
      i0.ɵdid(49152,(null as any),0,i6.QuotePurchaseTypeComponent,([] as any[]),{selectedType:[0,
          'selectedType'],quoteTypes:[1,'quoteTypes']},{selectQuoteType:'selectQuoteType'}),
      (_l()(),i0.ɵted((null as any),['\n'])),(_l()(),i0.ɵted((null as any),['\n\n'])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),2,'projects-component',([] as any[]),
          (null as any),[[(null as any),'projectsNotify']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i4.QuoteEditTabComponent = _v.component;
            if (('projectsNotify' === en)) {
              const pd_0:any = ((<any>_co.onNotification($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i7.View_ProjectsComponent_0,i7.RenderType_ProjectsComponent)),i0.ɵdid(49152,
          (null as any),0,i8.ProjectsComponent,[i9.WzDialogService,i10.AppStore],{config:[0,
              'config'],projects:[1,'projects'],userCan:[2,'userCan'],quoteType:[3,
              'quoteType'],allRMAssetsHaveAttributes:[4,'allRMAssetsHaveAttributes']},
          {projectsNotify:'projectsNotify'}),(_l()(),i0.ɵted((null as any),['\n'])),
      (_l()(),i0.ɵted((null as any),['\n\n'])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          24,'section',[['class','cart-total'],['layout','row'],['layout-align','center center']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          21,'div',[['flex','100']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_QuoteEditTabComponent_1)),
      i0.ɵdid(16384,(null as any),0,i3.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_QuoteEditTabComponent_2)),
      i0.ɵdid(16384,(null as any),0,i3.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_QuoteEditTabComponent_3)),
      i0.ɵdid(16384,(null as any),0,i3.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),6,'div',[['flex','100'],['layout',
              'row'],['layout-align','center center']],(null as any),(null as any),
              (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n      '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'administer-quote-component',
          [['flex','100']],(null as any),[[(null as any),'notify']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i4.QuoteEditTabComponent = _v.component;
            if (('notify' === en)) {
              const pd_0:any = ((<any>_co.onNotification($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i11.View_AdministerQuoteComponent_0,i11.RenderType_AdministerQuoteComponent)),
      i0.ɵdid(49152,(null as any),0,i12.AdministerQuoteComponent,([] as any[]),{userCanProceed:[0,
          'userCanProceed'],shouldShowCloneButton:[1,'shouldShowCloneButton']},{notify:'notify'}),
      i0.ɵpid(131072,i3.AsyncPipe,[i0.ChangeDetectorRef]),(_l()(),i0.ɵted((null as any),
          ['\n      '])),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵted((null as any),
          ['\n    '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
          View_QuoteEditTabComponent_4)),i0.ɵdid(16384,(null as any),0,i3.NgIf,[i0.ViewContainerRef,
          i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['\n  '])),(_l()(),i0.ɵted((null as any),['\n'])),(_l()(),i0.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i4.QuoteEditTabComponent = _v.component;
    const currVal_0:any = _co.quoteType;
    const currVal_1:any = _co.purchaseTypeConfig;
    _ck(_v,2,0,currVal_0,currVal_1);
    const currVal_2:any = _co.config;
    const currVal_3:any = _co.projects;
    const currVal_4:any = _co.userCan;
    const currVal_5:any = _co.quoteType;
    const currVal_6:any = _co.rmAssetsHaveRightsPackage;
    _ck(_v,6,0,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6);
    const currVal_7:any = _co.showDiscount;
    _ck(_v,14,0,currVal_7);
    const currVal_8:any = _co.showDiscount;
    _ck(_v,17,0,currVal_8);
    const currVal_9:any = _co.showTotal;
    _ck(_v,20,0,currVal_9);
    const currVal_10:any = _co.userCanProceed;
    const currVal_11:any = i0.ɵunv(_v,25,1,i0.ɵnov(_v,26).transform(_co.shouldShowCloneButton));
    _ck(_v,25,0,currVal_10,currVal_11);
    const currVal_12:any = _co.showUsageWarning;
    _ck(_v,31,0,currVal_12);
  },(null as any));
}
export function View_QuoteEditTabComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'quote-edit-tab-component',
      ([] as any[]),(null as any),(null as any),(null as any),View_QuoteEditTabComponent_0,
      RenderType_QuoteEditTabComponent)),i0.ɵdid(245760,(null as any),0,i4.QuoteEditTabComponent,
      [i13.Capabilities,i9.WzDialogService,i14.WindowRef,i15.UserPreferenceService,
          i16.DOCUMENT,i10.AppStore],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const QuoteEditTabComponentNgFactory:i0.ComponentFactory<i4.QuoteEditTabComponent> = i0.ɵccf('quote-edit-tab-component',
    i4.QuoteEditTabComponent,View_QuoteEditTabComponent_Host_0,{projects:'projects'},
    {notify:'notify'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLytjb21tZXJjZS8rcXVvdGUvK2VkaXQvY29tcG9uZW50cy90YWJzL3F1b3RlLWVkaXQtdGFiLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9Vc2Vycy9qYW1lc2JpbGxpbmdzL1dhemVlL3dhemVlLXVpL2Rpc3QvdG1wL2FwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LXRhYi5jb21wb25lbnQudHMiLCJuZzovLy9Vc2Vycy9qYW1lc2JpbGxpbmdzL1dhemVlL3dhemVlLXVpL2Rpc3QvdG1wL2FwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LXRhYi5odG1sIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvK2NvbW1lcmNlLytxdW90ZS8rZWRpdC9jb21wb25lbnRzL3RhYnMvcXVvdGUtZWRpdC10YWIuY29tcG9uZW50LnRzLlF1b3RlRWRpdFRhYkNvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxxdW90ZS1wdXJjaGFzZS10eXBlLWNvbXBvbmVudFxuICBmbGV4LWd0LXhzPVwiYXV0b1wiIFxuICBmbGV4PVwiMTAwXCIgXG4gIGxheW91dC1ndC14cz1cInJvd1wiIFxuICBsYXlvdXQ9XCJjb2x1bW5cIiBcbiAgbGF5b3V0LWFsaWduPVwic3RhcnRcIlxuICBbcXVvdGVUeXBlc109XCJwdXJjaGFzZVR5cGVDb25maWdcIlxuICBbc2VsZWN0ZWRUeXBlXT1cInF1b3RlVHlwZVwiXG4gIChzZWxlY3RRdW90ZVR5cGUpPVwib25TZWxlY3RRdW90ZVR5cGUoJGV2ZW50KVwiPlxuPC9xdW90ZS1wdXJjaGFzZS10eXBlLWNvbXBvbmVudD5cblxuPHByb2plY3RzLWNvbXBvbmVudFxuICBbcXVvdGVUeXBlXT1cInF1b3RlVHlwZVwiXG4gIFtwcm9qZWN0c109XCJwcm9qZWN0c1wiXG4gIFtjb25maWddPVwiY29uZmlnXCIgXG4gIFt1c2VyQ2FuXT1cInVzZXJDYW5cIlxuICBbYWxsUk1Bc3NldHNIYXZlQXR0cmlidXRlc109XCJybUFzc2V0c0hhdmVSaWdodHNQYWNrYWdlXCJcbiAgKHByb2plY3RzTm90aWZ5KT1cIm9uTm90aWZpY2F0aW9uKCRldmVudClcIj5cbjwvcHJvamVjdHMtY29tcG9uZW50PlxuXG48c2VjdGlvbiBjbGFzcz1cImNhcnQtdG90YWxcIiBsYXlvdXQ9XCJyb3dcIiBsYXlvdXQtYWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gIDxkaXYgZmxleD1cIjEwMFwiPlxuICAgIDxkaXYgKm5nSWY9XCJzaG93RGlzY291bnRcIiBmbGV4PVwiMTAwXCIgbGF5b3V0PVwicm93XCIgbGF5b3V0LWFsaWduPVwiZW5kIGNlbnRlclwiIGNsYXNzPVwic3VidG90YWwgbWF0LWhlYWRsaW5lXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvdGFsLWxhYmVsXCIgZmxleD1cIjEwMFwiPlxuICAgICAgICB7eyAnQ0FSVC5DQVJUX1NVQlRPVEFMJyB8IHRyYW5zbGF0ZSB9fSBcbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG90YWwtYW1vdW50XCIgZmxleD1cIm5vZ3Jvd1wiPlxuICAgICAgICB7eyBzdWJUb3RhbCB8IGFzeW5jIHwgY3VycmVuY3k6J1VTRCc6dHJ1ZTonMS4yLTInIH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cInNob3dEaXNjb3VudFwiIGZsZXg9XCIxMDBcIiBsYXlvdXQ9XCJyb3dcIiBsYXlvdXQtYWxpZ249XCJlbmQgY2VudGVyXCIgY2xhc3M9XCJkaXNjb3VudCBtYXQtaGVhZGxpbmVcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG90YWwtbGFiZWxcIiBmbGV4PVwiMTAwXCI+XG4gICAgICAgIHt7ICdDQVJULkNBUlRfRElTQ09VTlQnIHwgdHJhbnNsYXRlIH19IFxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b3RhbC1hbW91bnRcIiBmbGV4PVwibm9ncm93XCI+e3sgZGlzY291bnQgfCBhc3luYyB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwic2hvd1RvdGFsXCIgZmxleD1cIjEwMFwiIGxheW91dD1cInJvd1wiIGxheW91dC1hbGlnbj1cImVuZCBjZW50ZXJcIiBjbGFzcz1cInRvdGFsIG1hdC1oZWFkbGluZVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b3RhbC1sYWJlbFwiIGZsZXg9XCIxMDBcIj5cbiAgICAgICAge3sgJ0NBUlQuQ0FSVF9UT1RBTCcgfCB0cmFuc2xhdGUgfX0gXG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRvdGFsLWFtb3VudFwiIGZsZXg9XCJub2dyb3dcIj5cbiAgICAgICAge3sgdG90YWwgfCBhc3luYyB8IGN1cnJlbmN5OidVU0QnOnRydWU6JzEuMi0yJyB9fVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgZmxleD1cIjEwMFwiIGxheW91dD1cInJvd1wiIGxheW91dC1hbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgIDxhZG1pbmlzdGVyLXF1b3RlLWNvbXBvbmVudFxuICAgICAgICBmbGV4PVwiMTAwXCJcbiAgICAgICAgW3VzZXJDYW5Qcm9jZWVkXT1cInVzZXJDYW5Qcm9jZWVkXCJcbiAgICAgICAgW3Nob3VsZFNob3dDbG9uZUJ1dHRvbl09XCJzaG91bGRTaG93Q2xvbmVCdXR0b24gfCBhc3luY1wiXG4gICAgICAgIChub3RpZnkpPVwib25Ob3RpZmljYXRpb24oJGV2ZW50KVwiPlxuICAgICAgPC9hZG1pbmlzdGVyLXF1b3RlLWNvbXBvbmVudD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGZsZXg9XCIxMDBcIiBsYXlvdXQ9XCJyb3dcIiBsYXlvdXQtYWxpZ249XCJlbmQgY2VudGVyXCIgY2xhc3M9J3NlbGVjdC11c2FnZS13YXJuJyAqbmdJZj1cInNob3dVc2FnZVdhcm5pbmdcIj5cbiAgICAgIHt7ICdDQVJULlNFTEVDVF9VU0FHRV9XQVJOJyB8IHRyYW5zbGF0ZSB9fVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvc2VjdGlvbj5cbiIsIjxxdW90ZS1lZGl0LXRhYi1jb21wb25lbnQ+PC9xdW90ZS1lZGl0LXRhYi1jb21wb25lbnQ+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDc0JJO01BQUE7TUFBQSx3RUFBMEc7YUFBQSw4QkFDeEc7TUFBQTtNQUFBLDRDQUFxQztNQUFBO01BRTlCLDZDQUNQO1VBQUE7VUFBQSwwREFBeUM7VUFBQTthQUFBLElBRWxDOztJQUw4QjtJQUFBO0lBR0k7UUFBQTtJQUFBOzs7O29CQUkzQztNQUFBO01BQUEsd0VBQTBHO2FBQUEsOEJBQ3hHO01BQUE7TUFBQSw0Q0FBcUM7TUFBQTtNQUU5Qiw2Q0FDUDtVQUFBO1VBQUEsMERBQXlDO1VBQUEsOERBQTZCO1VBQUE7O0lBSGpDO0lBQUE7SUFHSTtJQUFBOzs7O29CQUUzQztNQUFBO01BQUEsd0VBQW9HO2FBQUEsOEJBQ2xHO01BQUE7TUFBQSw0Q0FBcUM7TUFBQTtNQUU5Qiw2Q0FDUDtVQUFBO1VBQUEsMERBQXlDO1VBQUE7YUFBQSxJQUVsQzs7SUFMOEI7SUFBQTtJQUdJO1FBQUE7SUFBQTs7OztvQkFZM0M7TUFBQTtNQUFBLHdFQUEwRzthQUFBO01BQUE7SUFBQTtJQUFBOzs7OzhEQXBEOUc7TUFBQTtVQUFBO01BQUE7UUFBQTtRQUFBO1FBUUU7VUFBQTtVQUFBO1FBQUE7UUFSRjtNQUFBO2FBQUE7VUFBQTtNQVFnRCx1Q0FDaEI7TUFFaEM7VUFBQTtZQUFBO1lBQUE7WUFNRTtjQUFBO2NBQUE7WUFBQTtZQU5GO1VBQUEsdUVBQUE7VUFBQTtjQUFBO2NBQUE7VUFBQSxtQ0FNNEM7TUFDdkIseUNBRXJCO1VBQUE7VUFBQTtNQUFzRSx5Q0FDcEU7VUFBQTtVQUFBLGdCQUFnQiwyQ0FDZDtVQUFBO2FBQUE7VUFBQSx3QkFPTSwyQ0FDTjtpQkFBQTthQUFBO1VBQUEsd0JBS00sMkNBQ047aUJBQUE7YUFBQTtVQUFBLHdCQU9NLDJDQUNOO2lCQUFBO2NBQUE7Y0FBQSw0Q0FBMEQ7VUFBQSxlQUN4RDtVQUFBO1lBQUE7WUFBQTtZQUlFO2NBQUE7Y0FBQTtZQUFBO1lBSkY7VUFBQTthQUFBO1VBQUE7YUFHRSw2Q0FDa0M7VUFBQSxlQUNQLDJDQUN6QjtVQUFBLGFBQ047VUFBQSxzQ0FBQTt3QkFBQSxtQ0FFTTtVQUFBLFdBQ0YsdUNBQ0U7VUFBQTs7SUFqRFI7SUFEQTtJQU5GLFdBT0UsVUFEQSxTQU5GO0lBY0U7SUFEQTtJQUVBO0lBSEE7SUFJQTtJQUxGLFdBR0UsVUFEQSxVQUVBLFVBSEEsVUFJQSxTQUxGO0lBV1M7SUFBTCxZQUFLLFNBQUw7SUFRSztJQUFMLFlBQUssU0FBTDtJQU1LO0lBQUwsWUFBSyxTQUFMO0lBV0k7SUFDQTtJQUhGLFlBRUUsV0FDQSxVQUhGO0lBTytFO0lBQWpGLFlBQWlGLFVBQWpGOzs7O29CQ3BESjtNQUFBO3NDQUFBLFVBQUE7TUFBQTttQ0FBQTtJQUFBOzs7OzsifQ==
