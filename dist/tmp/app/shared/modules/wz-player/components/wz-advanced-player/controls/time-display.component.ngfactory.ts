/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i2 from '@angular/material/core';
import * as i3 from '@angular/material/button';
import * as i4 from '@angular/cdk/platform';
import * as i5 from '@angular/cdk/a11y';
import * as i6 from '@ngx-translate/core/src/translate.pipe';
import * as i7 from '@ngx-translate/core/src/translate.service';
import * as i8 from '../../../../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i9 from '@angular/material/icon';
import * as i10 from '../../../pipes/player-timecode.pipe';
import * as i11 from './time-display.component';
import * as i12 from '@angular/common';
const styles_TimeDisplayComponent:any[] = ([] as any[]);
export const RenderType_TimeDisplayComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_TimeDisplayComponent,data:{}});
function View_TimeDisplayComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),37,(null as any),
      (null as any),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),10,'button',[['class','mat-icon-button'],['mat-icon-button',
              '']],[[8,'title',0],[8,'disabled',0]],[[(null as any),'click']],(_v,
              en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onApplyButtonClick()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i1.View_MatButton_0,i1.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
          0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
          (null as any),0,i3.MatButton,[i0.Renderer2,i0.ElementRef,i4.Platform,i5.FocusMonitor],
          {disabled:[0,'disabled']},(null as any)),i0.ɵdid(16384,(null as any),0,i3.MatIconButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),i0.ɵpid(131072,i6.TranslatePipe,
          [i7.TranslateService,i0.ChangeDetectorRef]),(_l()(),i0.ɵted(0,['\n          '])),
      (_l()(),i0.ɵeld(0,(null as any),0,3,'mat-icon',[['class','mat-icon'],['role',
          'img']],(null as any),(null as any),(null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),
      i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),
          (null as any)),i0.ɵdid(638976,(null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,
          i9.MatIconRegistry,[8,(null as any)]],(null as any),(null as any)),(_l()(),
          i0.ɵted(0,['check'])),(_l()(),i0.ɵted(0,['\n        '])),(_l()(),i0.ɵted((null as any),
          ['\n        \n        '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          10,'button',[['class','mat-icon-button'],['mat-icon-button','']],[[8,'title',
              0],[8,'disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onClearButtonClick()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i1.View_MatButton_0,i1.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
          0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
          (null as any),0,i3.MatButton,[i0.Renderer2,i0.ElementRef,i4.Platform,i5.FocusMonitor],
          {disabled:[0,'disabled']},(null as any)),i0.ɵdid(16384,(null as any),0,i3.MatIconButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),i0.ɵpid(131072,i6.TranslatePipe,
          [i7.TranslateService,i0.ChangeDetectorRef]),(_l()(),i0.ɵted(0,['\n          '])),
      (_l()(),i0.ɵeld(0,(null as any),0,3,'mat-icon',[['class','mat-icon'],['role',
          'img']],(null as any),(null as any),(null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),
      i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),
          (null as any)),i0.ɵdid(638976,(null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,
          i9.MatIconRegistry,[8,(null as any)]],(null as any),(null as any)),(_l()(),
          i0.ɵted(0,['remove'])),(_l()(),i0.ɵted(0,['\n        '])),(_l()(),i0.ɵted((null as any),
          ['\n        \n        '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          10,'button',[['class','mat-icon-button'],['mat-icon-button','']],[[8,'title',
              0],[8,'disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onCancelButtonClick()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i1.View_MatButton_0,i1.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
          0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
          (null as any),0,i3.MatButton,[i0.Renderer2,i0.ElementRef,i4.Platform,i5.FocusMonitor],
          (null as any),(null as any)),i0.ɵdid(16384,(null as any),0,i3.MatIconButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),i0.ɵpid(131072,i6.TranslatePipe,
          [i7.TranslateService,i0.ChangeDetectorRef]),(_l()(),i0.ɵted(0,['\n          '])),
      (_l()(),i0.ɵeld(0,(null as any),0,3,'mat-icon',[['class','mat-icon'],['role',
          'img']],(null as any),(null as any),(null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),
      i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),
          (null as any)),i0.ɵdid(638976,(null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,
          i9.MatIconRegistry,[8,(null as any)]],(null as any),(null as any)),(_l()(),
          i0.ɵted(0,['close'])),(_l()(),i0.ɵted(0,['\n        '])),(_l()(),i0.ɵted((null as any),
          ['\n      ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_2:boolean = !_co.canApply;
    _ck(_v,4,0,currVal_2);
    _ck(_v,10,0);
    const currVal_5:any = _co.isEmpty;
    _ck(_v,16,0,currVal_5);
    _ck(_v,22,0);
    _ck(_v,34,0);
  },(_ck,_v) => {
    const currVal_0:any = i0.ɵinlineInterpolate(1,'',i0.ɵunv(_v,2,0,i0.ɵnov(_v,6).transform('ASSET.ADV_PLAYER.TIME_DISPLAY.APPLY_BTN_TITLE')),
        '');
    const currVal_1:any = (i0.ɵnov(_v,4).disabled || (null as any));
    _ck(_v,2,0,currVal_0,currVal_1);
    const currVal_3:any = i0.ɵinlineInterpolate(1,'',i0.ɵunv(_v,14,0,i0.ɵnov(_v,18).transform('ASSET.ADV_PLAYER.TIME_DISPLAY.CLEAR_BTN_TITLE')),
        '');
    const currVal_4:any = (i0.ɵnov(_v,16).disabled || (null as any));
    _ck(_v,14,0,currVal_3,currVal_4);
    const currVal_6:any = i0.ɵinlineInterpolate(1,'',i0.ɵunv(_v,26,0,i0.ɵnov(_v,30).transform('ASSET.ADV_PLAYER.TIME_DISPLAY.CANCEL_BTN_TITLE')),
        '');
    const currVal_7:any = (i0.ɵnov(_v,28).disabled || (null as any));
    _ck(_v,26,0,currVal_6,currVal_7);
  });
}
export function View_TimeDisplayComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[i0.ɵpid(0,i10.PlayerTimecodePipe,([] as any[])),i0.ɵqud(402653184,
      1,{timeInput:0}),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵeld(0,
      (null as any),(null as any),9,'div',([] as any[]),[[8,'className',0]],(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n      '])),
      (_l()(),i0.ɵeld(0,[[1,0],['time',1]],(null as any),3,'input',[['class','current'],
          ['type','text']],[[8,'title',0],[8,'value',0]],[[(null as any),'click'],
          [(null as any),'keydown'],[(null as any),'keyup']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i11.TimeDisplayComponent = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.onTimeInputClick()) !== false);
          ad = (pd_0 && ad);
        }
        if (('keydown' === en)) {
          const pd_1:any = ((<any>_co.onKeyDown($event)) !== false);
          ad = (pd_1 && ad);
        }
        if (('keyup' === en)) {
          const pd_2:any = ((<any>_co.onKeyUp($event)) !== false);
          ad = (pd_2 && ad);
        }
        return ad;
      },(null as any),(null as any))),i0.ɵpid(131072,i6.TranslatePipe,[i7.TranslateService,
          i0.ChangeDetectorRef]),i0.ɵpid(131072,i12.AsyncPipe,[i0.ChangeDetectorRef]),
      i0.ɵppd(2),(_l()(),i0.ɵted((null as any),['\n\n      '])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_TimeDisplayComponent_1)),
      i0.ɵdid(16384,(null as any),0,i12.NgIf,[i0.ViewContainerRef,i0.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    '])),
      (_l()(),i0.ɵted((null as any),['\n\n    '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),1,'span',[['class','timecode divider']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['/'])),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),2,'span',[['class','timecode duration']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['',''])),i0.ɵppd(2),(_l()(),i0.ɵted((null as any),['\n  ']))],(_ck,_v) => {
    var _co:i11.TimeDisplayComponent = _v.component;
    const currVal_3:any = _co.editing;
    _ck(_v,11,0,currVal_3);
  },(_ck,_v) => {
    var _co:i11.TimeDisplayComponent = _v.component;
    const currVal_0:any = _co.containerClass;
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = i0.ɵinlineInterpolate(1,'',i0.ɵunv(_v,5,0,i0.ɵnov(_v,6).transform(_co.timeInputTitleTranslationKey)),
        '');
    const currVal_2:any = i0.ɵunv(_v,5,1,_ck(_v,8,0,i0.ɵnov(_v,0),i0.ɵunv(_v,5,1,i0.ɵnov(_v,
        7).transform(_co.currentFrame)),_co.playerState));
    _ck(_v,5,0,currVal_1,currVal_2);
    const currVal_4:any = i0.ɵunv(_v,18,0,_ck(_v,19,0,i0.ɵnov(_v,0),_co.durationFrame,
        _co.playerState));
    _ck(_v,18,0,currVal_4);
  });
}
export function View_TimeDisplayComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-time-display',
      ([] as any[]),(null as any),(null as any),(null as any),View_TimeDisplayComponent_0,
      RenderType_TimeDisplayComponent)),i0.ɵdid(49152,(null as any),0,i11.TimeDisplayComponent,
      ([] as any[]),(null as any),(null as any))],(null as any),(null as any));
}
export const TimeDisplayComponentNgFactory:i0.ComponentFactory<i11.TimeDisplayComponent> = i0.ɵccf('wz-time-display',
    i11.TimeDisplayComponent,View_TimeDisplayComponent_Host_0,{playerState:'playerState'},
    {request:'request'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy90aW1lLWRpc3BsYXkuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy90aW1lLWRpc3BsYXkuY29tcG9uZW50LnRzIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3RpbWUtZGlzcGxheS5jb21wb25lbnQudHMuVGltZURpc3BsYXlDb21wb25lbnQuaHRtbCIsIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy90aW1lLWRpc3BsYXkuY29tcG9uZW50LnRzLlRpbWVEaXNwbGF5Q29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiXG4gICAgPGRpdiBbY2xhc3NdPVwiY29udGFpbmVyQ2xhc3NcIj5cbiAgICAgIDxpbnB1dCAjdGltZVxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzPVwiY3VycmVudFwiXG4gICAgICAgIHRpdGxlPVwie3sgdGltZUlucHV0VGl0bGVUcmFuc2xhdGlvbktleSB8IHRyYW5zbGF0ZX19XCJcbiAgICAgICAgW3ZhbHVlXT1cImN1cnJlbnRGcmFtZSB8IGFzeW5jIHwgcGxheWVyVGltZWNvZGU6cGxheWVyU3RhdGVcIlxuICAgICAgICAoY2xpY2spPVwib25UaW1lSW5wdXRDbGljaygpXCJcbiAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAoa2V5dXApPVwib25LZXlVcCgkZXZlbnQpXCJcbiAgICAgIC8+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJlZGl0aW5nXCI+XG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgdGl0bGU9XCJ7eyAnQVNTRVQuQURWX1BMQVlFUi5USU1FX0RJU1BMQVkuQVBQTFlfQlROX1RJVExFJyB8IHRyYW5zbGF0ZSB9fVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cIiFjYW5BcHBseVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQXBwbHlCdXR0b25DbGljaygpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj5jaGVjazwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBcbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICB0aXRsZT1cInt7ICdBU1NFVC5BRFZfUExBWUVSLlRJTUVfRElTUExBWS5DTEVBUl9CVE5fVElUTEUnIHwgdHJhbnNsYXRlIH19XCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNFbXB0eVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQ2xlYXJCdXR0b25DbGljaygpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtaWNvbj5yZW1vdmU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgXG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgdGl0bGU9XCJ7eyAnQVNTRVQuQURWX1BMQVlFUi5USU1FX0RJU1BMQVkuQ0FOQ0VMX0JUTl9USVRMRScgfCB0cmFuc2xhdGUgfX1cIlxuICAgICAgICAgIChjbGljayk9XCJvbkNhbmNlbEJ1dHRvbkNsaWNrKClcIlxuICAgICAgICA+XG4gICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuICAgIDxzcGFuIGNsYXNzPVwidGltZWNvZGUgZGl2aWRlclwiPi88L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJ0aW1lY29kZSBkdXJhdGlvblwiPnt7IGR1cmF0aW9uRnJhbWUgfCBwbGF5ZXJUaW1lY29kZTpwbGF5ZXJTdGF0ZSB9fTwvc3Bhbj5cbiAgIiwiPHd6LXRpbWUtZGlzcGxheT48L3d6LXRpbWUtZGlzcGxheT4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ1lNO01BQUE7TUFBOEIsK0NBQzVCO1VBQUE7Y0FBQTt1QkFBQTtZQUFBO1lBQUE7WUFHRTtjQUFBO2NBQUE7WUFBQTtZQUhGO1VBQUEsdURBQUE7VUFBQSx5RUFBQTtVQUFBO1VBQUEsZ0RBQUE7VUFBQSxrREFDRTtVQUFBLDRDQUdEO01BQ0M7VUFBQTthQUFBO1VBQUEsc0JBQUE7NkJBQUEsZ0RBQVU7aUJBQUEsZUFBZ0IsbUNBQ25CO1VBQUEsMkJBRVQ7VUFBQTtjQUFBO1lBQUE7WUFBQTtZQUdFO2NBQUE7Y0FBQTtZQUFBO1lBSEY7VUFBQSx1REFBQTtVQUFBLHlFQUFBO1VBQUE7VUFBQSxnREFBQTtVQUFBLGtEQUNFO1VBQUEsNENBR0Q7TUFDQztVQUFBO2FBQUE7VUFBQSxzQkFBQTs2QkFBQSxnREFBVTtpQkFBQSxnQkFBaUIsbUNBQ3BCO1VBQUEsMkJBRVQ7VUFBQTtjQUFBO1lBQUE7WUFBQTtZQUVFO2NBQUE7Y0FBQTtZQUFBO1lBRkY7VUFBQSx1REFBQTtVQUFBLHlFQUFBO1VBQUE7VUFBQSxvQ0FBQTtVQUFBLGtEQUNFO1VBQUEsNENBRUQ7TUFDQztVQUFBO2FBQUE7VUFBQSxzQkFBQTs2QkFBQSxnREFBVTtpQkFBQSxlQUFnQixtQ0FDbkI7VUFBQTs7SUFuQlA7SUFGRixXQUVFLFNBRkY7SUFLRTtJQUtBO0lBRkYsWUFFRSxTQUZGO0lBS0U7SUFPQTs7SUFuQkE7UUFBQTtJQURGO0lBQUEsV0FDRSxVQURGLFNBQUE7SUFTRTtRQUFBO0lBREY7SUFBQSxZQUNFLFVBREYsU0FBQTtJQVNFO1FBQUE7SUFERjtJQUFBLFlBQ0UsVUFERixTQUFBOzs7Ozt1QkE3QlIsMkNBQ0k7TUFBQTtNQUFBLDRDQUE4QjtNQUM1QjtVQUFBO1VBQUE7UUFBQTtRQUFBO1FBS0U7VUFBQTtVQUFBO1FBQUE7UUFDQTtVQUFBO1VBQUE7UUFBQTtRQUNBO1VBQUE7VUFBQTtRQUFBO1FBUEY7TUFBQSx1Q0FHRTs4QkFBQSxVQUNBO2FBQUEsSUFJQSwrQ0FFRjtVQUFBO2FBQUE7VUFBQSxpQ0F1QmU7TUFDWCw2Q0FFTjtVQUFBO1VBQUEsNENBQStCO1VBQUEsUUFBUSwyQ0FDdkM7VUFBQTtVQUFBLDRDQUFnQztVQUFBLHFCQUF1RDs7SUEzQnZFO0lBQWQsWUFBYyxTQUFkOzs7SUFYRztJQUFMLFdBQUssU0FBTDtJQUlJO1FBQUE7SUFDQTtRQUFBO0lBSkYsV0FHRSxVQUNBLFNBSkY7SUFxQzhCO1FBQUE7SUFBQTs7OztvQkN2Q3BDO01BQUE7cUNBQUEsVUFBQTtNQUFBOzs7OyJ9
