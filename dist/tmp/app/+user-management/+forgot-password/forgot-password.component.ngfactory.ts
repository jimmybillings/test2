/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../node_modules/@angular/material/card/typings/index.ngfactory';
import * as i2 from '@angular/material/core';
import * as i3 from '@angular/material/card';
import * as i4 from '@ngx-translate/core/src/translate.pipe';
import * as i5 from '@ngx-translate/core/src/translate.service';
import * as i6 from '../../shared/modules/wz-form/wz.form.component.ngfactory';
import * as i7 from '../../shared/modules/wz-form/wz.form.component';
import * as i8 from '@angular/forms';
import * as i9 from '../../shared/modules/wz-form/wz.form.model';
import * as i10 from '@angular/common';
import * as i11 from '../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i12 from '@angular/router';
import * as i13 from '@angular/material/button';
import * as i14 from '@angular/cdk/platform';
import * as i15 from '@angular/cdk/a11y';
import * as i16 from './forgot-password.component';
import * as i17 from '../../shared/services/user.service';
import * as i18 from '../../app.store';
const styles_ForgotPasswordComponent:any[] = ([] as any[]);
export const RenderType_ForgotPasswordComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_ForgotPasswordComponent,data:{}});
function View_ForgotPasswordComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),23,'mat-card',[['class',
      'wz-form-card mat-card']],(null as any),(null as any),(null as any),i1.View_MatCard_0,
      i1.RenderType_MatCard)),i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),
      (null as any),(null as any)),i0.ɵdid(49152,(null as any),0,i3.MatCard,([] as any[]),
      (null as any),(null as any)),(_l()(),i0.ɵted(0,['\n        '])),(_l()(),i0.ɵeld(0,
      (null as any),0,4,'mat-card-header',[['class','mat-card-header']],(null as any),
      (null as any),(null as any),i1.View_MatCardHeader_0,i1.RenderType_MatCardHeader)),
      i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),
          (null as any)),i0.ɵdid(49152,(null as any),0,i3.MatCardHeader,([] as any[]),
          (null as any),(null as any)),(_l()(),i0.ɵted(2,['\n          '])),(_l()(),
          i0.ɵted(2,['\n        '])),(_l()(),i0.ɵted(0,['\n        '])),(_l()(),i0.ɵeld(0,
          (null as any),0,4,'mat-card-title',[['class','mat-card-title']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),i0.ɵdid(16384,
          (null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),
      i0.ɵdid(16384,(null as any),0,i3.MatCardTitle,([] as any[]),(null as any),(null as any)),
      (_l()(),i0.ɵted((null as any),['\n          ','\n        '])),i0.ɵpid(131072,
          i4.TranslatePipe,[i5.TranslateService,i0.ChangeDetectorRef]),(_l()(),i0.ɵted(0,
          ['\n        '])),(_l()(),i0.ɵeld(0,(null as any),0,6,'mat-card-content',
          [['class','mat-card-content']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,
          ([] as any[]),(null as any),(null as any)),i0.ɵdid(16384,(null as any),0,
          i3.MatCardContent,([] as any[]),(null as any),(null as any)),(_l()(),i0.ɵted((null as any),
          ['\n          '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-form',
          [['submitLabel','FORGOTPASSWORD.FORM.SUBMIT_LABEL']],(null as any),[[(null as any),
              'formSubmit']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('formSubmit' === en)) {
              const pd_0:any = ((<any>_co.onSubmit($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i6.View_WzFormComponent_0,i6.RenderType_WzFormComponent)),i0.ɵdid(638976,
          (null as any),0,i7.WzFormComponent,[i8.FormBuilder,i9.FormModel,i0.ElementRef],
          {items:[0,'items'],submitLabel:[1,'submitLabel']},{formSubmit:'formSubmit'}),
      (_l()(),i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵted(0,['\n      ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_1:any = _co.config.form.items;
        const currVal_2:any = 'FORGOTPASSWORD.FORM.SUBMIT_LABEL';
        _ck(_v,21,0,currVal_1,currVal_2);
      },(_ck,_v) => {
        const currVal_0:any = i0.ɵunv(_v,13,0,i0.ɵnov(_v,14).transform('FORGOTPASSWORD.TITLE'));
        _ck(_v,13,0,currVal_0);
      });
}
function View_ForgotPasswordComponent_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),15,'mat-card',[['class',
      'forgot-password-confirm mat-card']],(null as any),(null as any),(null as any),
      i1.View_MatCard_0,i1.RenderType_MatCard)),i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,
      ([] as any[]),(null as any),(null as any)),i0.ɵdid(49152,(null as any),0,i3.MatCard,
      ([] as any[]),(null as any),(null as any)),(_l()(),i0.ɵted(0,['\n        '])),
      (_l()(),i0.ɵeld(0,(null as any),0,4,'mat-card-title',[['class','mat-card-title']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),
          (null as any)),i0.ɵdid(16384,(null as any),0,i3.MatCardTitle,([] as any[]),
          (null as any),(null as any)),(_l()(),i0.ɵted((null as any),['',''])),i0.ɵpid(131072,
          i4.TranslatePipe,[i5.TranslateService,i0.ChangeDetectorRef]),(_l()(),i0.ɵted(0,
          ['\n        '])),(_l()(),i0.ɵeld(0,(null as any),0,4,'mat-card-subtitle',
          [['class','mat-card-subtitle']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,
          ([] as any[]),(null as any),(null as any)),i0.ɵdid(16384,(null as any),0,
          i3.MatCardSubtitle,([] as any[]),(null as any),(null as any)),(_l()(),i0.ɵted((null as any),
          ['',''])),i0.ɵpid(131072,i4.TranslatePipe,[i5.TranslateService,i0.ChangeDetectorRef]),
      (_l()(),i0.ɵted(0,['\n      ']))],(null as any),(_ck,_v) => {
    const currVal_0:any = i0.ɵunv(_v,7,0,i0.ɵnov(_v,8).transform('FORGOTPASSWORD.CONFIRMATION.TITLE'));
    _ck(_v,7,0,currVal_0);
    const currVal_1:any = i0.ɵunv(_v,13,0,i0.ɵnov(_v,14).transform('FORGOTPASSWORD.CONFIRMATION.MESSAGE'));
    _ck(_v,13,0,currVal_1);
  });
}
function View_ForgotPasswordComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,[['target',1]],(null as any),26,'section',[['class',
      'login hero']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          23,'div',[['layout','row'],['layout-align','center start'],['mat-scroll-y',
              '']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          20,'div',[['flex','90'],['flex-gt-lg','25'],['flex-gt-md','30'],['flex-gt-sm',
              '55'],['flex-gt-xs','60'],['flex-md','40']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n      '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
          View_ForgotPasswordComponent_2)),i0.ɵdid(16384,(null as any),0,i10.NgIf,
          [i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),
          i0.ɵted((null as any),['\n\n      '])),(_l()(),i0.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_ForgotPasswordComponent_3)),i0.ɵdid(16384,
          (null as any),0,i10.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted((null as any),['\n\n\n      '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),11,'div',[['layout','column'],['layout-align',
              'start center'],['layout-wrap',''],['mat-theme','docs-dark']],(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),10,'span',[['class','mat-title']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',' '])),i0.ɵpid(131072,i4.TranslatePipe,[i5.TranslateService,i0.ChangeDetectorRef]),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),7,'a',[['class','mat-button'],
          ['color','accent'],['mat-button','']],[[1,'target',0],[8,'href',4],[1,'tabindex',
          0],[1,'disabled',0],[1,'aria-disabled',0]],[[(null as any),'click']],(_v,
          en,$event) => {
        var ad:boolean = true;
        if (('click' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,17).onClick($event.button,$event.ctrlKey,
              $event.metaKey,$event.shiftKey)) !== false);
          ad = (pd_0 && ad);
        }
        if (('click' === en)) {
          const pd_1:any = ((<any>i0.ɵnov(_v,20)._haltDisabledEvents($event)) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },i11.View_MatAnchor_0,i11.RenderType_MatAnchor)),i0.ɵdid(671744,(null as any),
          0,i12.RouterLinkWithHref,[i12.Router,i12.ActivatedRoute,i10.LocationStrategy],
          {routerLink:[0,'routerLink']},(null as any)),i0.ɵpad(1),i0.ɵdid(16384,(null as any),
          0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
          (null as any),0,i13.MatAnchor,[i14.Platform,i15.FocusMonitor,i0.ElementRef,
              i0.Renderer2],{color:[0,'color']},(null as any)),i0.ɵdid(16384,(null as any),
          0,i13.MatButtonCssMatStyler,([] as any[]),(null as any),(null as any)),(_l()(),
          i0.ɵted(0,['',''])),i0.ɵpid(131072,i4.TranslatePipe,[i5.TranslateService,
          i0.ChangeDetectorRef]),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),
          i0.ɵted((null as any),['\n  '])),(_l()(),i0.ɵted((null as any),['\n']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:boolean = !_co.successfullySubmitted;
        _ck(_v,7,0,currVal_0);
        const currVal_1:any = _co.successfullySubmitted;
        _ck(_v,10,0,currVal_1);
        const currVal_8:any = _ck(_v,18,0,'/user/register');
        _ck(_v,17,0,currVal_8);
        const currVal_9:any = 'accent';
        _ck(_v,20,0,currVal_9);
      },(_ck,_v) => {
        const currVal_2:any = i0.ɵunv(_v,14,0,i0.ɵnov(_v,15).transform('LOGIN.GET_ACCOUNT'));
        _ck(_v,14,0,currVal_2);
        const currVal_3:any = i0.ɵnov(_v,17).target;
        const currVal_4:any = i0.ɵnov(_v,17).href;
        const currVal_5:any = (i0.ɵnov(_v,20).disabled? (0 - 1): 0);
        const currVal_6:any = (i0.ɵnov(_v,20).disabled || (null as any));
        const currVal_7:any = i0.ɵnov(_v,20).disabled.toString();
        _ck(_v,16,0,currVal_3,currVal_4,currVal_5,currVal_6,currVal_7);
        const currVal_10:any = i0.ɵunv(_v,22,0,i0.ɵnov(_v,23).transform('LOGIN.SIGN_UP'));
        _ck(_v,22,0,currVal_10);
      });
}
export function View_ForgotPasswordComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_ForgotPasswordComponent_1)),i0.ɵdid(16384,(null as any),0,i10.NgIf,[i0.ViewContainerRef,
      i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),
      ['\n']))],(_ck,_v) => {
    var _co:i16.ForgotPasswordComponent = _v.component;
    const currVal_0:any = _co.config;
    _ck(_v,1,0,currVal_0);
  },(null as any));
}
export function View_ForgotPasswordComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'forgot-password-component',
      ([] as any[]),(null as any),(null as any),(null as any),View_ForgotPasswordComponent_0,
      RenderType_ForgotPasswordComponent)),i0.ɵdid(114688,(null as any),0,i16.ForgotPasswordComponent,
      [i17.UserService,i18.AppStore,i0.ChangeDetectorRef],(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(null as any));
}
export const ForgotPasswordComponentNgFactory:i0.ComponentFactory<i16.ForgotPasswordComponent> = i0.ɵccf('forgot-password-component',
    i16.ForgotPasswordComponent,View_ForgotPasswordComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLyt1c2VyLW1hbmFnZW1lbnQvK2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLyt1c2VyLW1hbmFnZW1lbnQvK2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LnRzIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvK3VzZXItbWFuYWdlbWVudC8rZm9yZ290LXBhc3N3b3JkL2ZvcmdvdC1wYXNzd29yZC5odG1sIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvK3VzZXItbWFuYWdlbWVudC8rZm9yZ290LXBhc3N3b3JkL2ZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQudHMuRm9yZ290UGFzc3dvcmRDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8c2VjdGlvbiBjbGFzcz1cImxvZ2luIGhlcm9cIiAjdGFyZ2V0ICpuZ0lmPVwiY29uZmlnXCI+XG4gIDxkaXYgbGF5b3V0PVwicm93XCIgbWF0LXNjcm9sbC15PVwiXCIgbGF5b3V0LWFsaWduPVwiY2VudGVyIHN0YXJ0XCI+XG4gICAgPGRpdiBmbGV4LWd0LWxnPVwiMjVcIiBmbGV4LWd0LW1kPVwiMzBcIiBmbGV4LW1kPVwiNDBcIiBmbGV4LWd0LXNtPVwiNTVcIiBmbGV4LWd0LXhzPVwiNjBcIiBmbGV4PVwiOTBcIj5cbiAgICAgIDxtYXQtY2FyZCBjbGFzcz1cInd6LWZvcm0tY2FyZFwiICpuZ0lmPVwiIXN1Y2Nlc3NmdWxseVN1Ym1pdHRlZFwiPlxuICAgICAgICA8bWF0LWNhcmQtaGVhZGVyPlxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwibG9nby13cmFwcGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9nb1wiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8L21hdC1jYXJkLWhlYWRlcj5cbiAgICAgICAgPG1hdC1jYXJkLXRpdGxlPlxuICAgICAgICAgIHt7ICdGT1JHT1RQQVNTV09SRC5USVRMRScgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgPC9tYXQtY2FyZC10aXRsZT5cbiAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnQ+XG4gICAgICAgICAgPHd6LWZvcm0gW2l0ZW1zXT1cImNvbmZpZy5mb3JtLml0ZW1zXCIgc3VibWl0TGFiZWw9XCJGT1JHT1RQQVNTV09SRC5GT1JNLlNVQk1JVF9MQUJFTFwiIChmb3JtU3VibWl0KT1cIm9uU3VibWl0KCRldmVudClcIj48L3d6LWZvcm0+XG4gICAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cbiAgICAgIDwvbWF0LWNhcmQ+XG5cbiAgICAgIDxtYXQtY2FyZCBjbGFzcz1cImZvcmdvdC1wYXNzd29yZC1jb25maXJtXCIgKm5nSWY9XCJzdWNjZXNzZnVsbHlTdWJtaXR0ZWRcIj5cbiAgICAgICAgPG1hdC1jYXJkLXRpdGxlPnt7ICdGT1JHT1RQQVNTV09SRC5DT05GSVJNQVRJT04uVElUTEUnIHwgdHJhbnNsYXRlIH19PC9tYXQtY2FyZC10aXRsZT5cbiAgICAgICAgPG1hdC1jYXJkLXN1YnRpdGxlPnt7ICdGT1JHT1RQQVNTV09SRC5DT05GSVJNQVRJT04uTUVTU0FHRScgfCB0cmFuc2xhdGUgfX08L21hdC1jYXJkLXN1YnRpdGxlPlxuICAgICAgPC9tYXQtY2FyZD5cblxuXG4gICAgICA8ZGl2IG1hdC10aGVtZT1cImRvY3MtZGFya1wiIGxheW91dD1cImNvbHVtblwiIGxheW91dC1hbGlnbj1cInN0YXJ0IGNlbnRlclwiIGxheW91dC13cmFwPVwiXCI+PHNwYW4gY2xhc3M9XCJtYXQtdGl0bGVcIj57eydMT0dJTi5HRVRfQUNDT1VOVCcgfCB0cmFuc2xhdGUgfX0gPGEgbWF0LWJ1dHRvbiBbcm91dGVyTGlua109XCJbJy91c2VyL3JlZ2lzdGVyJ11cIiBjb2xvcj1cImFjY2VudFwiPnt7J0xPR0lOLlNJR05fVVAnIHwgdHJhbnNsYXRlIH19PC9hPjwvc3Bhbj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG4iLCI8Zm9yZ290LXBhc3N3b3JkLWNvbXBvbmVudD48L2ZvcmdvdC1wYXNzd29yZC1jb21wb25lbnQ+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNHTTtNQUFBOzJCQUFBLFVBQUE7TUFBQSxvQ0FBQTtNQUFBLDZCQUE4RCxtQ0FDNUQ7TUFBQTtNQUFBO2FBQUE7VUFBQSxzQkFBQTtVQUFBLDZCQUFpQixxQ0FHTjtpQkFBQSxvQkFDTyxtQ0FDbEI7VUFBQTtVQUFBLGlFQUFBO1VBQUE7YUFBQTtNQUFnQjsyQkFBQSw0Q0FFQztVQUFBLGlCQUNqQjtVQUFBO1VBQUEscUNBQUE7VUFBQSxrREFBQTs0QkFBQSwyQ0FBa0I7VUFBQSxtQkFDaEI7VUFBQTtjQUFBO1lBQUE7WUFBQTtZQUFvRjtjQUFBO2NBQUE7WUFBQTtZQUFwRjtVQUFBLG1FQUFBO1VBQUE7VUFBQTtNQUE4SCwrQ0FDN0c7OztRQURSO1FBQTRCO1FBQXJDLFlBQVMsVUFBNEIsU0FBckM7O1FBSmM7UUFBQTs7OztvQkFRbEI7TUFBQTs2Q0FBQSxVQUFBO01BQUEsa0RBQUE7TUFBQSwyQ0FBd0U7TUFDdEU7VUFBQTthQUFBO1VBQUEsc0JBQUE7VUFBQSw2QkFBZ0I7MkJBQUEsNENBQXNFO1VBQUEsaUJBQ3RGO1VBQUE7VUFBQSxxQ0FBQTtVQUFBLGtEQUFBOzZCQUFBLDJDQUFtQjtVQUFBO01BQTJFO0lBRDlFO0lBQUE7SUFDRztJQUFBOzs7O29CQW5CM0I7TUFBQTtNQUFtRCx5Q0FDakQ7VUFBQTtjQUFBO01BQThELDJDQUM1RDtVQUFBO2NBQUE7VUFBQSw0Q0FBNEY7VUFBQSxlQUMxRjtVQUFBLHdDQUFBO1VBQUEsc0VBWVc7aUJBQUEsZ0NBRVg7VUFBQSxzRUFBQTtVQUFBO1VBQUEsZUFHVyxpREFHWDtpQkFBQTtjQUFBO2NBQUEsMERBQXNGO1VBQUE7VUFBQSwwREFBd0I7VUFBQTtNQUFxQztVQUFBO1VBQUE7bUJBQUE7UUFBQTtRQUFBO1VBQUE7Y0FBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO01BQUEseURBQUE7VUFBQTtVQUFBLG9EQUFjLFdBQWQ7VUFBQSx5RUFBQTtVQUFBOzBCQUFBLDRDQUFBO1VBQUEsdUVBQStEO2lCQUFBOzhCQUFBLEdBQWlELDJDQUMvUDtpQkFBQSwwQkFDRjs7O1FBdEI2QjtRQUEvQixXQUErQixTQUEvQjtRQWMwQztRQUExQyxZQUEwQyxTQUExQztRQU1pSztRQUFkLFlBQWMsU0FBZDtRQUFnRDtRQUFoRCxZQUFnRCxTQUFoRDs7UUFBckM7UUFBQTtRQUFxQztRQUFBO1FBQUE7UUFBQTtRQUFBO1FBQUEsWUFBQSxvQkFBQSw2QkFBQTtRQUErRDtRQUFBOzs7O29CQXZCeE47TUFBQSx3Q0FBQTtvQkFBQSxtQ0EwQlU7TUFBQTs7SUExQjBCO0lBQXBDLFdBQW9DLFNBQXBDOzs7O29CQ0FBO01BQUE7d0NBQUEsVUFBQTtNQUFBOztRQUFBOzs7OyJ9
