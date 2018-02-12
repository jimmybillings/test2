/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../../../../../node_modules/@angular/material/slider/typings/index.ngfactory';
import * as i2 from '@angular/forms';
import * as i3 from '@angular/material/slider';
import * as i4 from '@angular/material/core';
import * as i5 from '@angular/cdk/a11y';
import * as i6 from '@angular/cdk/bidi';
import * as i7 from '@angular/common';
import * as i8 from '../../../pipes/player-timecode.pipe';
import * as i9 from './scrubber.component';
const styles_ScrubberComponent:any[] = ([] as any[]);
export const RenderType_ScrubberComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_ScrubberComponent,data:{}});
function View_ScrubberComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),4,'mat-slider',[['class',
      'marker in mat-slider'],['min','0'],['role','slider'],['tabindex','0']],[[1,
      'aria-disabled',0],[1,'aria-valuemax',0],[1,'aria-valuemin',0],[1,'aria-valuenow',
      0],[1,'aria-orientation',0],[2,'mat-slider-disabled',(null as any)],[2,'mat-slider-has-ticks',
      (null as any)],[2,'mat-slider-horizontal',(null as any)],[2,'mat-slider-axis-inverted',
      (null as any)],[2,'mat-slider-sliding',(null as any)],[2,'mat-slider-thumb-label-showing',
      (null as any)],[2,'mat-slider-vertical',(null as any)],[2,'mat-slider-min-value',
      (null as any)],[2,'mat-slider-hide-last-tick',(null as any)]],[[(null as any),
      'click'],[(null as any),'mouseover'],[(null as any),'mouseout'],[(null as any),
      'focus'],[(null as any),'blur'],[(null as any),'keydown'],[(null as any),'keyup'],
      [(null as any),'mouseenter'],[(null as any),'slide'],[(null as any),'slideend'],
      [(null as any),'slidestart']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('focus' === en)) {
      const pd_0:any = ((<any>i0.ɵnov(_v,3)._onFocus()) !== false);
      ad = (pd_0 && ad);
    }
    if (('blur' === en)) {
      const pd_1:any = ((<any>i0.ɵnov(_v,3)._onBlur()) !== false);
      ad = (pd_1 && ad);
    }
    if (('click' === en)) {
      const pd_2:any = ((<any>i0.ɵnov(_v,3)._onClick($event)) !== false);
      ad = (pd_2 && ad);
    }
    if (('keydown' === en)) {
      const pd_3:any = ((<any>i0.ɵnov(_v,3)._onKeydown($event)) !== false);
      ad = (pd_3 && ad);
    }
    if (('keyup' === en)) {
      const pd_4:any = ((<any>i0.ɵnov(_v,3)._onKeyup()) !== false);
      ad = (pd_4 && ad);
    }
    if (('mouseenter' === en)) {
      const pd_5:any = ((<any>i0.ɵnov(_v,3)._onMouseenter()) !== false);
      ad = (pd_5 && ad);
    }
    if (('slide' === en)) {
      const pd_6:any = ((<any>i0.ɵnov(_v,3)._onSlide($event)) !== false);
      ad = (pd_6 && ad);
    }
    if (('slideend' === en)) {
      const pd_7:any = ((<any>i0.ɵnov(_v,3)._onSlideEnd()) !== false);
      ad = (pd_7 && ad);
    }
    if (('slidestart' === en)) {
      const pd_8:any = ((<any>i0.ɵnov(_v,3)._onSlideStart($event)) !== false);
      ad = (pd_8 && ad);
    }
    if (('click' === en)) {
      const pd_9:any = ((<any>_co.onInMarkerClick()) !== false);
      ad = (pd_9 && ad);
    }
    if (('mouseover' === en)) {
      const pd_10:any = ((<any>_co.onMouseOver()) !== false);
      ad = (pd_10 && ad);
    }
    if (('mouseout' === en)) {
      const pd_11:any = ((<any>_co.onMouseOut()) !== false);
      ad = (pd_11 && ad);
    }
    return ad;
  },i1.View_MatSlider_0,i1.RenderType_MatSlider)),i0.ɵprd(5120,(null as any),i2.NG_VALUE_ACCESSOR,
      (p0_0:any) => {
        return [p0_0];
      },[i3.MatSlider]),i0.ɵdid(16384,(null as any),0,i4.MatPrefixRejector,([] as any[]),
      (null as any),(null as any)),i0.ɵdid(245760,(null as any),0,i3.MatSlider,[i0.Renderer2,
      i0.ElementRef,i5.FocusMonitor,i0.ChangeDetectorRef,[2,i6.Directionality]],{disabled:[0,
      'disabled'],max:[1,'max'],min:[2,'min'],value:[3,'value']},(null as any)),(_l()(),
      i0.ɵted((null as any),['\n      ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_14:any = true;
    const currVal_15:any = i0.ɵinlineInterpolate(1,'',_co.largestFrameNumber,'');
    const currVal_16:any = '0';
    const currVal_17:any = i0.ɵinlineInterpolate(1,'',_co.inMarkerFrameNumber,'');
    _ck(_v,3,0,currVal_14,currVal_15,currVal_16,currVal_17);
  },(_ck,_v) => {
    const currVal_0:any = i0.ɵnov(_v,3).disabled;
    const currVal_1:any = i0.ɵnov(_v,3).max;
    const currVal_2:any = i0.ɵnov(_v,3).min;
    const currVal_3:any = i0.ɵnov(_v,3).value;
    const currVal_4:any = (i0.ɵnov(_v,3).vertical? 'vertical': 'horizontal');
    const currVal_5:any = i0.ɵnov(_v,3).disabled;
    const currVal_6:any = i0.ɵnov(_v,3).tickInterval;
    const currVal_7:boolean = !i0.ɵnov(_v,3).vertical;
    const currVal_8:any = i0.ɵnov(_v,3)._invertAxis;
    const currVal_9:any = i0.ɵnov(_v,3)._isSliding;
    const currVal_10:any = i0.ɵnov(_v,3).thumbLabel;
    const currVal_11:any = i0.ɵnov(_v,3).vertical;
    const currVal_12:any = i0.ɵnov(_v,3)._isMinValue;
    const currVal_13:any = (i0.ɵnov(_v,3).disabled || ((i0.ɵnov(_v,3)._isMinValue && i0.ɵnov(_v,
        3)._thumbGap) && i0.ɵnov(_v,3)._invertAxis));
    _ck(_v,0,1,[currVal_0,currVal_1,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6,
        currVal_7,currVal_8,currVal_9,currVal_10,currVal_11,currVal_12,currVal_13]);
  });
}
function View_ScrubberComponent_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),4,'mat-slider',[['class',
      'marker out mat-slider'],['min','0'],['role','slider'],['tabindex','0']],[[1,
      'aria-disabled',0],[1,'aria-valuemax',0],[1,'aria-valuemin',0],[1,'aria-valuenow',
      0],[1,'aria-orientation',0],[2,'mat-slider-disabled',(null as any)],[2,'mat-slider-has-ticks',
      (null as any)],[2,'mat-slider-horizontal',(null as any)],[2,'mat-slider-axis-inverted',
      (null as any)],[2,'mat-slider-sliding',(null as any)],[2,'mat-slider-thumb-label-showing',
      (null as any)],[2,'mat-slider-vertical',(null as any)],[2,'mat-slider-min-value',
      (null as any)],[2,'mat-slider-hide-last-tick',(null as any)]],[[(null as any),
      'click'],[(null as any),'mouseover'],[(null as any),'mouseout'],[(null as any),
      'focus'],[(null as any),'blur'],[(null as any),'keydown'],[(null as any),'keyup'],
      [(null as any),'mouseenter'],[(null as any),'slide'],[(null as any),'slideend'],
      [(null as any),'slidestart']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('focus' === en)) {
      const pd_0:any = ((<any>i0.ɵnov(_v,3)._onFocus()) !== false);
      ad = (pd_0 && ad);
    }
    if (('blur' === en)) {
      const pd_1:any = ((<any>i0.ɵnov(_v,3)._onBlur()) !== false);
      ad = (pd_1 && ad);
    }
    if (('click' === en)) {
      const pd_2:any = ((<any>i0.ɵnov(_v,3)._onClick($event)) !== false);
      ad = (pd_2 && ad);
    }
    if (('keydown' === en)) {
      const pd_3:any = ((<any>i0.ɵnov(_v,3)._onKeydown($event)) !== false);
      ad = (pd_3 && ad);
    }
    if (('keyup' === en)) {
      const pd_4:any = ((<any>i0.ɵnov(_v,3)._onKeyup()) !== false);
      ad = (pd_4 && ad);
    }
    if (('mouseenter' === en)) {
      const pd_5:any = ((<any>i0.ɵnov(_v,3)._onMouseenter()) !== false);
      ad = (pd_5 && ad);
    }
    if (('slide' === en)) {
      const pd_6:any = ((<any>i0.ɵnov(_v,3)._onSlide($event)) !== false);
      ad = (pd_6 && ad);
    }
    if (('slideend' === en)) {
      const pd_7:any = ((<any>i0.ɵnov(_v,3)._onSlideEnd()) !== false);
      ad = (pd_7 && ad);
    }
    if (('slidestart' === en)) {
      const pd_8:any = ((<any>i0.ɵnov(_v,3)._onSlideStart($event)) !== false);
      ad = (pd_8 && ad);
    }
    if (('click' === en)) {
      const pd_9:any = ((<any>_co.onOutMarkerClick()) !== false);
      ad = (pd_9 && ad);
    }
    if (('mouseover' === en)) {
      const pd_10:any = ((<any>_co.onMouseOver()) !== false);
      ad = (pd_10 && ad);
    }
    if (('mouseout' === en)) {
      const pd_11:any = ((<any>_co.onMouseOut()) !== false);
      ad = (pd_11 && ad);
    }
    return ad;
  },i1.View_MatSlider_0,i1.RenderType_MatSlider)),i0.ɵprd(5120,(null as any),i2.NG_VALUE_ACCESSOR,
      (p0_0:any) => {
        return [p0_0];
      },[i3.MatSlider]),i0.ɵdid(16384,(null as any),0,i4.MatPrefixRejector,([] as any[]),
      (null as any),(null as any)),i0.ɵdid(245760,(null as any),0,i3.MatSlider,[i0.Renderer2,
      i0.ElementRef,i5.FocusMonitor,i0.ChangeDetectorRef,[2,i6.Directionality]],{disabled:[0,
      'disabled'],max:[1,'max'],min:[2,'min'],value:[3,'value']},(null as any)),(_l()(),
      i0.ɵted((null as any),['\n      ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_14:any = true;
    const currVal_15:any = i0.ɵinlineInterpolate(1,'',_co.largestFrameNumber,'');
    const currVal_16:any = '0';
    const currVal_17:any = i0.ɵinlineInterpolate(1,'',_co.outMarkerFrameNumber,'');
    _ck(_v,3,0,currVal_14,currVal_15,currVal_16,currVal_17);
  },(_ck,_v) => {
    const currVal_0:any = i0.ɵnov(_v,3).disabled;
    const currVal_1:any = i0.ɵnov(_v,3).max;
    const currVal_2:any = i0.ɵnov(_v,3).min;
    const currVal_3:any = i0.ɵnov(_v,3).value;
    const currVal_4:any = (i0.ɵnov(_v,3).vertical? 'vertical': 'horizontal');
    const currVal_5:any = i0.ɵnov(_v,3).disabled;
    const currVal_6:any = i0.ɵnov(_v,3).tickInterval;
    const currVal_7:boolean = !i0.ɵnov(_v,3).vertical;
    const currVal_8:any = i0.ɵnov(_v,3)._invertAxis;
    const currVal_9:any = i0.ɵnov(_v,3)._isSliding;
    const currVal_10:any = i0.ɵnov(_v,3).thumbLabel;
    const currVal_11:any = i0.ɵnov(_v,3).vertical;
    const currVal_12:any = i0.ɵnov(_v,3)._isMinValue;
    const currVal_13:any = (i0.ɵnov(_v,3).disabled || ((i0.ɵnov(_v,3)._isMinValue && i0.ɵnov(_v,
        3)._thumbGap) && i0.ɵnov(_v,3)._invertAxis));
    _ck(_v,0,1,[currVal_0,currVal_1,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6,
        currVal_7,currVal_8,currVal_9,currVal_10,currVal_11,currVal_12,currVal_13]);
  });
}
function View_ScrubberComponent_4(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'span',[['class',
      'hover-frame-display']],[[4,'left','px']],(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i0.ɵted((null as any),['\n        ','\n      '])),i0.ɵppd(2)],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.hoverFrameDisplayPosition;
        _ck(_v,0,0,currVal_0);
        const currVal_1:any = i0.ɵunv(_v,1,0,_ck(_v,2,0,i0.ɵnov((<any>(<any>_v.parent).parent),
            0),_co.hoverFrame,_co.playerState));
        _ck(_v,1,0,currVal_1);
      });
}
function View_ScrubberComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),16,(null as any),
      (null as any),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),4,'mat-slider',[['class','scrubber mat-slider'],['min','0'],
              ['role','slider'],['tabindex','0']],[[1,'aria-disabled',0],[1,'aria-valuemax',
              0],[1,'aria-valuemin',0],[1,'aria-valuenow',0],[1,'aria-orientation',
              0],[2,'mat-slider-disabled',(null as any)],[2,'mat-slider-has-ticks',
              (null as any)],[2,'mat-slider-horizontal',(null as any)],[2,'mat-slider-axis-inverted',
              (null as any)],[2,'mat-slider-sliding',(null as any)],[2,'mat-slider-thumb-label-showing',
              (null as any)],[2,'mat-slider-vertical',(null as any)],[2,'mat-slider-min-value',
              (null as any)],[2,'mat-slider-hide-last-tick',(null as any)]],[[(null as any),
              'input'],[(null as any),'mouseover'],[(null as any),'mouseout'],[(null as any),
              'mousedown'],[(null as any),'focus'],[(null as any),'blur'],[(null as any),
              'click'],[(null as any),'keydown'],[(null as any),'keyup'],[(null as any),
              'mouseenter'],[(null as any),'slide'],[(null as any),'slideend'],[(null as any),
              'slidestart']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('focus' === en)) {
              const pd_0:any = ((<any>i0.ɵnov(_v,5)._onFocus()) !== false);
              ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
              const pd_1:any = ((<any>i0.ɵnov(_v,5)._onBlur()) !== false);
              ad = (pd_1 && ad);
            }
            if (('click' === en)) {
              const pd_2:any = ((<any>i0.ɵnov(_v,5)._onClick($event)) !== false);
              ad = (pd_2 && ad);
            }
            if (('keydown' === en)) {
              const pd_3:any = ((<any>i0.ɵnov(_v,5)._onKeydown($event)) !== false);
              ad = (pd_3 && ad);
            }
            if (('keyup' === en)) {
              const pd_4:any = ((<any>i0.ɵnov(_v,5)._onKeyup()) !== false);
              ad = (pd_4 && ad);
            }
            if (('mouseenter' === en)) {
              const pd_5:any = ((<any>i0.ɵnov(_v,5)._onMouseenter()) !== false);
              ad = (pd_5 && ad);
            }
            if (('slide' === en)) {
              const pd_6:any = ((<any>i0.ɵnov(_v,5)._onSlide($event)) !== false);
              ad = (pd_6 && ad);
            }
            if (('slideend' === en)) {
              const pd_7:any = ((<any>i0.ɵnov(_v,5)._onSlideEnd()) !== false);
              ad = (pd_7 && ad);
            }
            if (('slidestart' === en)) {
              const pd_8:any = ((<any>i0.ɵnov(_v,5)._onSlideStart($event)) !== false);
              ad = (pd_8 && ad);
            }
            if (('input' === en)) {
              const pd_9:any = ((<any>_co.onSliderInput()) !== false);
              ad = (pd_9 && ad);
            }
            if (('mouseover' === en)) {
              const pd_10:any = ((<any>_co.onMouseOver()) !== false);
              ad = (pd_10 && ad);
            }
            if (('mouseout' === en)) {
              const pd_11:any = ((<any>_co.onMouseOut()) !== false);
              ad = (pd_11 && ad);
            }
            if (('mousedown' === en)) {
              const pd_12:any = ((<any>_co.onMouseDown()) !== false);
              ad = (pd_12 && ad);
            }
            return ad;
          },i1.View_MatSlider_0,i1.RenderType_MatSlider)),i0.ɵprd(5120,(null as any),
          i2.NG_VALUE_ACCESSOR,(p0_0:any) => {
            return [p0_0];
          },[i3.MatSlider]),i0.ɵdid(16384,(null as any),0,i4.MatPrefixRejector,([] as any[]),
          (null as any),(null as any)),i0.ɵdid(245760,(null as any),0,i3.MatSlider,
          [i0.Renderer2,i0.ElementRef,i5.FocusMonitor,i0.ChangeDetectorRef,[2,i6.Directionality]],
          {max:[0,'max'],min:[1,'min'],value:[2,'value']},{input:'input'}),(_l()(),
          i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵted((null as any),['\n\n      '])),
      (_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_ScrubberComponent_2)),
      i0.ɵdid(16384,(null as any),0,i7.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n\n      '])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_ScrubberComponent_3)),
      i0.ɵdid(16384,(null as any),0,i7.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n\n      '])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_ScrubberComponent_4)),
      i0.ɵdid(16384,(null as any),0,i7.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    ']))],(_ck,
      _v) => {
    var _co:any = _v.component;
    const currVal_14:any = i0.ɵinlineInterpolate(1,'',_co.largestFrameNumber,'');
    const currVal_15:any = '0';
    const currVal_16:any = i0.ɵinlineInterpolate(1,'',_co.currentFrameNumber,'');
    _ck(_v,5,0,currVal_14,currVal_15,currVal_16);
    const currVal_17:any = _co.inMarkerIsSet;
    _ck(_v,9,0,currVal_17);
    const currVal_18:any = _co.outMarkerIsSet;
    _ck(_v,12,0,currVal_18);
    const currVal_19:any = _co.hoverFrameDisplayIsVisible;
    _ck(_v,15,0,currVal_19);
  },(_ck,_v) => {
    const currVal_0:any = i0.ɵnov(_v,5).disabled;
    const currVal_1:any = i0.ɵnov(_v,5).max;
    const currVal_2:any = i0.ɵnov(_v,5).min;
    const currVal_3:any = i0.ɵnov(_v,5).value;
    const currVal_4:any = (i0.ɵnov(_v,5).vertical? 'vertical': 'horizontal');
    const currVal_5:any = i0.ɵnov(_v,5).disabled;
    const currVal_6:any = i0.ɵnov(_v,5).tickInterval;
    const currVal_7:boolean = !i0.ɵnov(_v,5).vertical;
    const currVal_8:any = i0.ɵnov(_v,5)._invertAxis;
    const currVal_9:any = i0.ɵnov(_v,5)._isSliding;
    const currVal_10:any = i0.ɵnov(_v,5).thumbLabel;
    const currVal_11:any = i0.ɵnov(_v,5).vertical;
    const currVal_12:any = i0.ɵnov(_v,5)._isMinValue;
    const currVal_13:any = (i0.ɵnov(_v,5).disabled || ((i0.ɵnov(_v,5)._isMinValue && i0.ɵnov(_v,
        5)._thumbGap) && i0.ɵnov(_v,5)._invertAxis));
    _ck(_v,2,1,[currVal_0,currVal_1,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6,
        currVal_7,currVal_8,currVal_9,currVal_10,currVal_11,currVal_12,currVal_13]);
  });
}
export function View_ScrubberComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[i0.ɵpid(0,i8.PlayerTimecodePipe,([] as any[])),(_l()(),i0.ɵted((null as any),
      ['\n    '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_ScrubberComponent_1)),i0.ɵdid(16384,(null as any),0,i7.NgIf,[i0.ViewContainerRef,
      i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),
      ['\n  ']))],(_ck,_v) => {
    var _co:i9.ScrubberComponent = _v.component;
    const currVal_0:any = _co.readyToDisplay;
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
export function View_ScrubberComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-scrubber',
      ([] as any[]),(null as any),(null as any),(null as any),View_ScrubberComponent_0,
      RenderType_ScrubberComponent)),i0.ɵdid(245760,(null as any),0,i9.ScrubberComponent,
      [i0.ElementRef,i0.Renderer,i0.ChangeDetectorRef],(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(null as any));
}
export const ScrubberComponentNgFactory:i0.ComponentFactory<i9.ScrubberComponent> = i0.ɵccf('wz-scrubber',
    i9.ScrubberComponent,View_ScrubberComponent_Host_0,{window:'window',playerState:'playerState'},
    {request:'request'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9zY3J1YmJlci5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3NjcnViYmVyLmNvbXBvbmVudC50cyIsIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9zY3J1YmJlci5jb21wb25lbnQudHMuU2NydWJiZXJDb21wb25lbnQuaHRtbCIsIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9scy9zY3J1YmJlci5jb21wb25lbnQudHMuU2NydWJiZXJDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicmVhZHlUb0Rpc3BsYXlcIj5cbiAgICAgIDxtYXQtc2xpZGVyXG4gICAgICAgIGNsYXNzPVwic2NydWJiZXJcIlxuICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgbWF4PVwie3sgbGFyZ2VzdEZyYW1lTnVtYmVyIH19XCJcbiAgICAgICAgdmFsdWU9XCJ7eyBjdXJyZW50RnJhbWVOdW1iZXIgfX1cIlxuICAgICAgICAoaW5wdXQpPVwib25TbGlkZXJJbnB1dCgpXCJcbiAgICAgICAgKG1vdXNlb3Zlcik9XCJvbk1vdXNlT3ZlcigpXCJcbiAgICAgICAgKG1vdXNlb3V0KT1cIm9uTW91c2VPdXQoKVwiXG4gICAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oKVwiPlxuICAgICAgPC9tYXQtc2xpZGVyPlxuXG4gICAgICA8bWF0LXNsaWRlclxuICAgICAgICAqbmdJZj1cImluTWFya2VySXNTZXRcIlxuICAgICAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzPVwibWFya2VyIGluXCJcbiAgICAgICAgbWluPVwiMFwiXG4gICAgICAgIG1heD1cInt7IGxhcmdlc3RGcmFtZU51bWJlciB9fVwiXG4gICAgICAgIHZhbHVlPVwie3sgaW5NYXJrZXJGcmFtZU51bWJlciB9fVwiXG4gICAgICAgIChjbGljayk9XCJvbkluTWFya2VyQ2xpY2soKVwiXG4gICAgICAgIChtb3VzZW92ZXIpPVwib25Nb3VzZU92ZXIoKVwiXG4gICAgICAgIChtb3VzZW91dCk9XCJvbk1vdXNlT3V0KClcIj5cbiAgICAgIDwvbWF0LXNsaWRlcj5cblxuICAgICAgPG1hdC1zbGlkZXJcbiAgICAgICAgKm5nSWY9XCJvdXRNYXJrZXJJc1NldFwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICAgICAgY2xhc3M9XCJtYXJrZXIgb3V0XCJcbiAgICAgICAgbWluPVwiMFwiXG4gICAgICAgIG1heD1cInt7IGxhcmdlc3RGcmFtZU51bWJlciB9fVwiXG4gICAgICAgIHZhbHVlPVwie3sgb3V0TWFya2VyRnJhbWVOdW1iZXIgfX1cIlxuICAgICAgICAoY2xpY2spPVwib25PdXRNYXJrZXJDbGljaygpXCJcbiAgICAgICAgKG1vdXNlb3Zlcik9XCJvbk1vdXNlT3ZlcigpXCJcbiAgICAgICAgKG1vdXNlb3V0KT1cIm9uTW91c2VPdXQoKVwiPlxuICAgICAgPC9tYXQtc2xpZGVyPlxuXG4gICAgICA8c3BhbiAqbmdJZj1cImhvdmVyRnJhbWVEaXNwbGF5SXNWaXNpYmxlXCIgY2xhc3M9XCJob3Zlci1mcmFtZS1kaXNwbGF5XCIgW3N0eWxlLmxlZnQucHhdPVwiaG92ZXJGcmFtZURpc3BsYXlQb3NpdGlvblwiPlxuICAgICAgICB7eyBob3ZlckZyYW1lIHwgcGxheWVyVGltZWNvZGU6cGxheWVyU3RhdGUgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgIiwiPHd6LXNjcnViYmVyPjwvd3otc2NydWJiZXI+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNhTTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7SUFBQTtJQUFBO0lBQUE7TUFBQTtNQUFBO0lBQUE7SUFBQTtNQUFBO01BQUE7SUFBQTtJQUFBO01BQUE7TUFBQTtJQUFBO0lBQUE7TUFBQTtNQUFBO0lBQUE7SUFBQTtNQUFBO01BQUE7SUFBQTtJQUFBO01BQUE7TUFBQTtJQUFBO0lBQUE7TUFBQTtNQUFBO0lBQUE7SUFBQTtNQUFBO01BQUE7SUFBQTtJQUFBO01BQUE7TUFBQTtJQUFBO0lBT0U7TUFBQTtNQUFBO0lBQUE7SUFDQTtNQUFBO01BQUE7SUFBQTtJQUNBO01BQUE7TUFBQTtJQUFBO0lBVEY7RUFBQTtNQUFBO1FBQUE7TUFBQSx5QkFBQTtNQUFBLG9DQUFBO3lEQUFBO01BQUEsMEVBUzRCO2FBQUE7O0lBUDFCO0lBR0E7SUFEQTtJQUVBO0lBTkYsV0FFRSxXQUdBLFdBREEsV0FFQSxVQU5GOztJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7UUFBQTtJQUFBLFlBQUE7UUFBQSx5RUFBQTs7OztvQkFZQTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7SUFBQTtJQUFBO0lBQUE7TUFBQTtNQUFBO0lBQUE7SUFBQTtNQUFBO01BQUE7SUFBQTtJQUFBO01BQUE7TUFBQTtJQUFBO0lBQUE7TUFBQTtNQUFBO0lBQUE7SUFBQTtNQUFBO01BQUE7SUFBQTtJQUFBO01BQUE7TUFBQTtJQUFBO0lBQUE7TUFBQTtNQUFBO0lBQUE7SUFBQTtNQUFBO01BQUE7SUFBQTtJQUFBO01BQUE7TUFBQTtJQUFBO0lBT0U7TUFBQTtNQUFBO0lBQUE7SUFDQTtNQUFBO01BQUE7SUFBQTtJQUNBO01BQUE7TUFBQTtJQUFBO0lBVEY7RUFBQTtNQUFBO1FBQUE7TUFBQSx5QkFBQTtNQUFBLG9DQUFBO3lEQUFBO01BQUEsMEVBUzRCO2FBQUE7O0lBUDFCO0lBR0E7SUFEQTtJQUVBO0lBTkYsV0FFRSxXQUdBLFdBREEsV0FFQSxVQU5GOztJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7UUFBQTtJQUFBLFlBQUE7UUFBQSx5RUFBQTs7OztvQkFZQTtNQUFBO01BQUEsZ0JBQWlIOzs7UUFBNUM7UUFBckUsV0FBcUUsU0FBckU7UUFBaUg7WUFBQTtRQUFBOzs7O29CQXBDbkg7TUFBQTtNQUFxQyw2Q0FDbkM7VUFBQTtjQUFBO2NBQUE7Y0FBQTtjQUFBO2NBQUE7Y0FBQTtjQUFBO2NBQUE7Y0FBQTtjQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFLRTtjQUFBO2NBQUE7WUFBQTtZQUNBO2NBQUE7Y0FBQTtZQUFBO1lBQ0E7Y0FBQTtjQUFBO1lBQUE7WUFDQTtjQUFBO2NBQUE7WUFBQTtZQVJGO1VBQUE7K0JBQUE7WUFBQTtVQUFBLHlCQUFBO1VBQUEsb0NBQUE7VUFBQTtVQUFBLGlFQVE4QjtpQkFBQSw4QkFDakI7TUFFYjthQUFBO1VBQUEsd0JBVWEsK0NBRWI7aUJBQUE7YUFBQTtVQUFBLHdCQVVhLCtDQUViO2lCQUFBO2FBQUE7VUFBQSx3QkFFTzs7O0lBbENMO0lBREE7SUFFQTtJQUpGLFdBR0UsV0FEQSxXQUVBLFVBSkY7SUFZRTtJQURGLFdBQ0UsVUFERjtJQWFFO0lBREYsWUFDRSxVQURGO0lBWU07SUFBTixZQUFNLFVBQU47O0lBbkNBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7UUFBQTtJQUFBLFlBQUE7UUFBQSx5RUFBQTs7OzttRUFGTjtNQUFBLGFBQ0k7TUFBQSxrQ0FBQTtvQkFBQSxtQ0F1Q2U7TUFBQTs7SUF2Q0Q7SUFBZCxXQUFjLFNBQWQ7Ozs7b0JDREo7TUFBQTtrQ0FBQSxVQUFBO01BQUE7O1FBQUE7Ozs7OyJ9
