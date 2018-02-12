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
import * as i10 from '@angular/common';
import * as i11 from './volume-control.component';
import * as i12 from '../../../../../../../node_modules/@angular/material/slider/typings/index.ngfactory';
import * as i13 from '@angular/forms';
import * as i14 from '@angular/material/slider';
import * as i15 from '@angular/cdk/bidi';
const styles_VolumeControlComponent:any[] = ([] as any[]);
export const RenderType_VolumeControlComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_VolumeControlComponent,data:{'animation':[{type:7,name:'volumeState',
        definitions:[{type:0,name:'inactive',styles:{type:6,styles:{opacity:'0',zIndex:'-1'},
            offset:(null as any)},options:(undefined as any)},{type:0,name:'active',
            styles:{type:6,styles:{opacity:'1',zIndex:'1'},offset:(null as any)},options:(undefined as any)},
            {type:1,expr:'inactive => active',animation:{type:4,styles:(null as any),
                timings:'250ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'},options:(null as any)},
            {type:1,expr:'active => inactive',animation:{type:4,styles:(null as any),
                timings:'360ms cubic-bezier(0.55, 0, 0.55, 0.2)'},options:(null as any)}],
        options:{}}]}});
function View_VolumeControlComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),10,'button',[['class',
      'mat-icon-button'],['mat-icon-button','']],[[8,'title',0],[8,'disabled',0]],
      [[(null as any),'mouseover']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('mouseover' === en)) {
          const pd_0:any = ((<any>_co.onMouseOver()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i1.View_MatButton_0,i1.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
      0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
      (null as any),0,i3.MatButton,[i0.Renderer2,i0.ElementRef,i4.Platform,i5.FocusMonitor],
      (null as any),(null as any)),i0.ɵdid(16384,(null as any),0,i3.MatIconButtonCssMatStyler,
      ([] as any[]),(null as any),(null as any)),i0.ɵpid(131072,i6.TranslatePipe,[i7.TranslateService,
      i0.ChangeDetectorRef]),(_l()(),i0.ɵted(0,['\n      '])),(_l()(),i0.ɵeld(0,(null as any),
      0,3,'mat-icon',[['class','mat-icon'],['role','img']],(null as any),(null as any),
      (null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),i0.ɵdid(16384,(null as any),
      0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(638976,
      (null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,i9.MatIconRegistry,[8,
          (null as any)]],(null as any),(null as any)),(_l()(),i0.ɵted(0,['',''])),
      (_l()(),i0.ɵted(0,['\n    ']))],(_ck,_v) => {
    _ck(_v,8,0);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i0.ɵinlineInterpolate(1,'',i0.ɵunv(_v,0,0,i0.ɵnov(_v,4).transform(_co.buttonTitle)),
        '');
    const currVal_1:any = (i0.ɵnov(_v,2).disabled || (null as any));
    _ck(_v,0,0,currVal_0,currVal_1);
    const currVal_2:any = _co.iconName;
    _ck(_v,9,0,currVal_2);
  });
}
export function View_VolumeControlComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_VolumeControlComponent_1)),
      i0.ɵdid(16384,(null as any),0,i10.NgIf,[i0.ViewContainerRef,i0.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),18,'div',[['class','volume-control']],
          [[24,'@volumeState',0]],[[(null as any),'mouseleave']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i11.VolumeControlComponent = _v.component;
            if (('mouseleave' === en)) {
              const pd_0:any = ((<any>_co.onMouseLeave()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n      '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),3,'mat-slider',[['class','mat-slider'],
          ['max','100'],['min','0'],['role','slider'],['tabindex','0'],['vertical',
              '']],[[1,'aria-disabled',0],[1,'aria-valuemax',0],[1,'aria-valuemin',
          0],[1,'aria-valuenow',0],[1,'aria-orientation',0],[2,'mat-slider-disabled',
          (null as any)],[2,'mat-slider-has-ticks',(null as any)],[2,'mat-slider-horizontal',
          (null as any)],[2,'mat-slider-axis-inverted',(null as any)],[2,'mat-slider-sliding',
          (null as any)],[2,'mat-slider-thumb-label-showing',(null as any)],[2,'mat-slider-vertical',
          (null as any)],[2,'mat-slider-min-value',(null as any)],[2,'mat-slider-hide-last-tick',
          (null as any)]],[[(null as any),'input'],[(null as any),'focus'],[(null as any),
          'blur'],[(null as any),'click'],[(null as any),'keydown'],[(null as any),
          'keyup'],[(null as any),'mouseenter'],[(null as any),'slide'],[(null as any),
          'slideend'],[(null as any),'slidestart']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i11.VolumeControlComponent = _v.component;
        if (('focus' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,9)._onFocus()) !== false);
          ad = (pd_0 && ad);
        }
        if (('blur' === en)) {
          const pd_1:any = ((<any>i0.ɵnov(_v,9)._onBlur()) !== false);
          ad = (pd_1 && ad);
        }
        if (('click' === en)) {
          const pd_2:any = ((<any>i0.ɵnov(_v,9)._onClick($event)) !== false);
          ad = (pd_2 && ad);
        }
        if (('keydown' === en)) {
          const pd_3:any = ((<any>i0.ɵnov(_v,9)._onKeydown($event)) !== false);
          ad = (pd_3 && ad);
        }
        if (('keyup' === en)) {
          const pd_4:any = ((<any>i0.ɵnov(_v,9)._onKeyup()) !== false);
          ad = (pd_4 && ad);
        }
        if (('mouseenter' === en)) {
          const pd_5:any = ((<any>i0.ɵnov(_v,9)._onMouseenter()) !== false);
          ad = (pd_5 && ad);
        }
        if (('slide' === en)) {
          const pd_6:any = ((<any>i0.ɵnov(_v,9)._onSlide($event)) !== false);
          ad = (pd_6 && ad);
        }
        if (('slideend' === en)) {
          const pd_7:any = ((<any>i0.ɵnov(_v,9)._onSlideEnd()) !== false);
          ad = (pd_7 && ad);
        }
        if (('slidestart' === en)) {
          const pd_8:any = ((<any>i0.ɵnov(_v,9)._onSlideStart($event)) !== false);
          ad = (pd_8 && ad);
        }
        if (('input' === en)) {
          const pd_9:any = ((<any>_co.onSliderInput($event)) !== false);
          ad = (pd_9 && ad);
        }
        return ad;
      },i12.View_MatSlider_0,i12.RenderType_MatSlider)),i0.ɵprd(5120,(null as any),
          i13.NG_VALUE_ACCESSOR,(p0_0:any) => {
            return [p0_0];
          },[i14.MatSlider]),i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),
          (null as any),(null as any)),i0.ɵdid(245760,(null as any),0,i14.MatSlider,
          [i0.Renderer2,i0.ElementRef,i5.FocusMonitor,i0.ChangeDetectorRef,[2,i15.Directionality]],
          {max:[0,'max'],min:[1,'min'],value:[2,'value'],vertical:[3,'vertical']},
          {input:'input'}),(_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),10,'button',[['class','mat-icon-button'],['mat-icon-button',
              '']],[[8,'title',0],[8,'disabled',0]],[[(null as any),'click']],(_v,
              en,$event) => {
            var ad:boolean = true;
            var _co:i11.VolumeControlComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onButtonClick()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i1.View_MatButton_0,i1.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
          0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
          (null as any),0,i3.MatButton,[i0.Renderer2,i0.ElementRef,i4.Platform,i5.FocusMonitor],
          (null as any),(null as any)),i0.ɵdid(16384,(null as any),0,i3.MatIconButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),i0.ɵpid(131072,i6.TranslatePipe,
          [i7.TranslateService,i0.ChangeDetectorRef]),(_l()(),i0.ɵted(0,['\n        '])),
      (_l()(),i0.ɵeld(0,(null as any),0,3,'mat-icon',[['class','mat-icon'],['role',
          'img']],(null as any),(null as any),(null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),
      i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),
          (null as any)),i0.ɵdid(638976,(null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,
          i9.MatIconRegistry,[8,(null as any)]],(null as any),(null as any)),(_l()(),
          i0.ɵted(0,['',''])),(_l()(),i0.ɵted(0,['\n      '])),(_l()(),i0.ɵted((null as any),
          ['\n    '])),(_l()(),i0.ɵted((null as any),['\n  ']))],(_ck,_v) => {
    var _co:i11.VolumeControlComponent = _v.component;
    const currVal_0:any = (_co.volumeState === 'inactive');
    _ck(_v,2,0,currVal_0);
    const currVal_16:any = '100';
    const currVal_17:any = '0';
    const currVal_18:any = i0.ɵinlineInterpolate(1,'',_co.playerState.volume,'');
    const currVal_19:any = '';
    _ck(_v,9,0,currVal_16,currVal_17,currVal_18,currVal_19);
    _ck(_v,19,0);
  },(_ck,_v) => {
    var _co:i11.VolumeControlComponent = _v.component;
    const currVal_1:any = _co.volumeState;
    _ck(_v,4,0,currVal_1);
    const currVal_2:any = i0.ɵnov(_v,9).disabled;
    const currVal_3:any = i0.ɵnov(_v,9).max;
    const currVal_4:any = i0.ɵnov(_v,9).min;
    const currVal_5:any = i0.ɵnov(_v,9).value;
    const currVal_6:any = (i0.ɵnov(_v,9).vertical? 'vertical': 'horizontal');
    const currVal_7:any = i0.ɵnov(_v,9).disabled;
    const currVal_8:any = i0.ɵnov(_v,9).tickInterval;
    const currVal_9:boolean = !i0.ɵnov(_v,9).vertical;
    const currVal_10:any = i0.ɵnov(_v,9)._invertAxis;
    const currVal_11:any = i0.ɵnov(_v,9)._isSliding;
    const currVal_12:any = i0.ɵnov(_v,9).thumbLabel;
    const currVal_13:any = i0.ɵnov(_v,9).vertical;
    const currVal_14:any = i0.ɵnov(_v,9)._isMinValue;
    const currVal_15:any = (i0.ɵnov(_v,9).disabled || ((i0.ɵnov(_v,9)._isMinValue && i0.ɵnov(_v,
        9)._thumbGap) && i0.ɵnov(_v,9)._invertAxis));
    _ck(_v,6,1,[currVal_2,currVal_3,currVal_4,currVal_5,currVal_6,currVal_7,currVal_8,
        currVal_9,currVal_10,currVal_11,currVal_12,currVal_13,currVal_14,currVal_15]);
    const currVal_20:any = i0.ɵinlineInterpolate(1,'',i0.ɵunv(_v,11,0,i0.ɵnov(_v,15).transform(_co.buttonTitle)),
        '');
    const currVal_21:any = (i0.ɵnov(_v,13).disabled || (null as any));
    _ck(_v,11,0,currVal_20,currVal_21);
    const currVal_22:any = _co.iconName;
    _ck(_v,20,0,currVal_22);
  });
}
export function View_VolumeControlComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-volume-control',
      ([] as any[]),(null as any),(null as any),(null as any),View_VolumeControlComponent_0,
      RenderType_VolumeControlComponent)),i0.ɵdid(49152,(null as any),0,i11.VolumeControlComponent,
      ([] as any[]),(null as any),(null as any))],(null as any),(null as any));
}
export const VolumeControlComponentNgFactory:i0.ComponentFactory<i11.VolumeControlComponent> = i0.ɵccf('wz-volume-control',
    i11.VolumeControlComponent,View_VolumeControlComponent_Host_0,{playerState:'playerState'},
    {request:'request'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy92b2x1bWUtY29udHJvbC5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3ZvbHVtZS1jb250cm9sLmNvbXBvbmVudC50cyIsIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy92b2x1bWUtY29udHJvbC5jb21wb25lbnQudHMuVm9sdW1lQ29udHJvbENvbXBvbmVudC5odG1sIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3ZvbHVtZS1jb250cm9sLmNvbXBvbmVudC50cy5Wb2x1bWVDb250cm9sQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKm5nSWY9XCJ2b2x1bWVTdGF0ZSA9PT0naW5hY3RpdmUnXCIgdGl0bGU9XCJ7eyBidXR0b25UaXRsZSB8IHRyYW5zbGF0ZSB9fVwiIChtb3VzZW92ZXIpPVwib25Nb3VzZU92ZXIoKVwiPlxuICAgICAgPG1hdC1pY29uPnt7IGljb25OYW1lIH19PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLWNvbnRyb2xcIiBbQHZvbHVtZVN0YXRlXT1cInZvbHVtZVN0YXRlXCIgKG1vdXNlbGVhdmUpPVwib25Nb3VzZUxlYXZlKClcIj5cbiAgICAgIDxtYXQtc2xpZGVyIHZlcnRpY2FsIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiB2YWx1ZT1cInt7IHBsYXllclN0YXRlLnZvbHVtZSB9fVwiIChpbnB1dCk9XCJvblNsaWRlcklucHV0KCRldmVudClcIj48L21hdC1zbGlkZXI+XG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiB0aXRsZT1cInt7IGJ1dHRvblRpdGxlIHwgdHJhbnNsYXRlIH19XCIgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soKVwiPlxuICAgICAgICA8bWF0LWljb24+e3sgaWNvbk5hbWUgfX08L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICIsIjx3ei12b2x1bWUtY29udHJvbD48L3d6LXZvbHVtZS1jb250cm9sPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNDSTtNQUFBO01BQUE7UUFBQTtRQUFBO1FBQWdHO1VBQUE7VUFBQTtRQUFBO1FBQWhHO01BQUEsdURBQUE7TUFBQSx5RUFBQTtNQUFBO01BQUEsb0NBQUE7TUFBQSxrREFBMEQ7MEJBQUEsR0FBa0UsaUNBQzFIO01BQUE7TUFBQSwrREFBQTtNQUFBLHlFQUFBO01BQUE7VUFBQSw2Q0FBVTtNQUF5QjtJQUFuQzs7O0lBRHdEO1FBQUE7SUFBMUQ7SUFBQSxXQUEwRCxVQUExRCxTQUFBO0lBQ1k7SUFBQTs7OztvQkFGaEIsMkNBQ0k7TUFBQTthQUFBO1VBQUEsaUNBRVM7TUFDVDtVQUFBO1lBQUE7WUFBQTtZQUF5RDtjQUFBO2NBQUE7WUFBQTtZQUF6RDtVQUFBLGdDQUF1RjtNQUNyRjtVQUFBO2NBQUE7VUFBQTtVQUFBO1VBQUE7VUFBQTtVQUFBO1VBQUE7VUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQXdFO1VBQUE7VUFBQTtRQUFBO1FBQXhFO01BQUE7Z0NBQUE7WUFBQTtVQUFBLDBCQUFBO1VBQUEsb0NBQUE7VUFBQTtVQUFBO1VBQUEsaUJBQXFILDZDQUNySDtVQUFBO2NBQUE7dUJBQUE7WUFBQTtZQUFBO1lBQThEO2NBQUE7Y0FBQTtZQUFBO1lBQTlEO1VBQUEsdURBQUE7VUFBQSx5RUFBQTtVQUFBO1VBQUEsb0NBQUE7VUFBQSxrREFBd0I7VUFBQSw0Q0FBZ0U7TUFDdEY7VUFBQTthQUFBO1VBQUEsc0JBQUE7NkJBQUEsZ0RBQVU7aUJBQUEsYUFBeUIsaUNBQzVCO1VBQUEsYUFDTDs7SUFSa0I7SUFBeEIsV0FBd0IsU0FBeEI7SUFJK0I7SUFBUjtJQUFrQjtJQUEzQjtJQUFaLFdBQTZCLFdBQVIsV0FBa0IsV0FBM0IsVUFBWjtJQUVFOzs7SUFId0I7SUFBNUIsV0FBNEIsU0FBNUI7SUFDRTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO1FBQUE7SUFBQSxZQUFBO1FBQUEsMkVBQUE7SUFDd0I7UUFBQTtJQUF4QjtJQUFBLFlBQXdCLFdBQXhCLFVBQUE7SUFDWTtJQUFBOzs7O29CQ1BsQjtNQUFBO3VDQUFBLFVBQUE7TUFBQTs7OzsifQ==