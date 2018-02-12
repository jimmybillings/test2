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
import * as i10 from '@angular/material/menu';
import * as i11 from '@angular/cdk/overlay';
import * as i12 from '@angular/cdk/bidi';
import * as i13 from '@angular/common';
import * as i14 from '../../../../../../../node_modules/@angular/material/menu/typings/index.ngfactory';
import * as i15 from './subclip-controlbar.component';
import * as i16 from '../controls/marker-seek-button.component.ngfactory';
import * as i17 from '../controls/marker-seek-button.component';
import * as i18 from '../controls/marker-time-display.component.ngfactory';
import * as i19 from '../controls/marker-time-display.component';
import * as i20 from '../controls/marker-set-button.component.ngfactory';
import * as i21 from '../controls/marker-set-button.component';
import * as i22 from '../controls/markers-playback-button.component.ngfactory';
import * as i23 from '../controls/markers-playback-button.component';
import * as i24 from '../controls/markers-clear-button.component.ngfactory';
import * as i25 from '../controls/markers-clear-button.component';
const styles_SubclipControlbarComponent:any[] = ([] as any[]);
export const RenderType_SubclipControlbarComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_SubclipControlbarComponent,data:{}});
function View_SubclipControlbarComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),10,'button',[['class',
      'mat-icon-button'],['mat-icon-button','']],[[8,'title',0],[8,'disabled',0]],
      (null as any),(null as any),i1.View_MatButton_0,i1.RenderType_MatButton)),i0.ɵdid(16384,
      (null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),
      i0.ɵdid(180224,(null as any),0,i3.MatButton,[i0.Renderer2,i0.ElementRef,i4.Platform,
          i5.FocusMonitor],(null as any),(null as any)),i0.ɵdid(16384,(null as any),
          0,i3.MatIconButtonCssMatStyler,([] as any[]),(null as any),(null as any)),
      i0.ɵpid(131072,i6.TranslatePipe,[i7.TranslateService,i0.ChangeDetectorRef]),
      (_l()(),i0.ɵted(0,['\n    '])),(_l()(),i0.ɵeld(0,(null as any),0,3,'mat-icon',
          [['class','mat-icon'],['role','img']],(null as any),(null as any),(null as any),
          i8.View_MatIcon_0,i8.RenderType_MatIcon)),i0.ɵdid(16384,(null as any),0,
          i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(638976,
          (null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,i9.MatIconRegistry,
              [8,(null as any)]],(null as any),(null as any)),(_l()(),i0.ɵted(0,['ondemand_video'])),
      (_l()(),i0.ɵted(0,['\n  ']))],(_ck,_v) => {
    _ck(_v,8,0);
  },(_ck,_v) => {
    const currVal_0:any = i0.ɵinlineInterpolate(1,'',i0.ɵunv(_v,0,0,i0.ɵnov(_v,4).transform('ASSET.ADV_PLAYER.SIMPLE_BTN_TITLE')),
        '');
    const currVal_1:any = (i0.ɵnov(_v,2).disabled || (null as any));
    _ck(_v,0,0,currVal_0,currVal_1);
  });
}
function View_SubclipControlbarComponent_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(16777216,(null as any),(null as any),11,'button',
      [['aria-haspopup','true'],['class','mat-icon-button'],['mat-icon-button','']],
      [[8,'title',0],[8,'disabled',0]],[[(null as any),'mousedown'],[(null as any),
          'keydown'],[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        if (('mousedown' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,4)._handleMousedown($event)) !== false);
          ad = (pd_0 && ad);
        }
        if (('keydown' === en)) {
          const pd_1:any = ((<any>i0.ɵnov(_v,4)._handleKeydown($event)) !== false);
          ad = (pd_1 && ad);
        }
        if (('click' === en)) {
          const pd_2:any = ((<any>i0.ɵnov(_v,4)._handleClick($event)) !== false);
          ad = (pd_2 && ad);
        }
        return ad;
      },i1.View_MatButton_0,i1.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
      0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
      (null as any),0,i3.MatButton,[i0.Renderer2,i0.ElementRef,i4.Platform,i5.FocusMonitor],
      (null as any),(null as any)),i0.ɵdid(16384,(null as any),0,i3.MatIconButtonCssMatStyler,
      ([] as any[]),(null as any),(null as any)),i0.ɵdid(1196032,(null as any),0,i10.MatMenuTrigger,
      [i11.Overlay,i0.ElementRef,i0.ViewContainerRef,i10.MAT_MENU_SCROLL_STRATEGY,
          [2,i10.MatMenu],[8,(null as any)],[2,i12.Directionality]],{_deprecatedMatMenuTriggerFor:[0,
          '_deprecatedMatMenuTriggerFor']},(null as any)),i0.ɵpid(131072,i6.TranslatePipe,
      [i7.TranslateService,i0.ChangeDetectorRef]),(_l()(),i0.ɵted(0,['\n    '])),(_l()(),
      i0.ɵeld(0,(null as any),0,3,'mat-icon',[['class','mat-icon'],['role','img']],
          (null as any),(null as any),(null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),
      i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),
          (null as any)),i0.ɵdid(638976,(null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,
          i9.MatIconRegistry,[8,(null as any)]],(null as any),(null as any)),(_l()(),
          i0.ɵted(0,['more_vert'])),(_l()(),i0.ɵted(0,['\n  '])),(_l()(),i0.ɵand(0,
          (null as any),(null as any),0))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_2:any = _co.morePlayerOptions;
    _ck(_v,4,0,currVal_2);
    _ck(_v,9,0);
  },(_ck,_v) => {
    const currVal_0:any = i0.ɵinlineInterpolate(1,'',i0.ɵunv(_v,0,0,i0.ɵnov(_v,5).transform('ASSET.ADV_PLAYER.MORE_BTN_TITLE')),
        '');
    const currVal_1:any = (i0.ɵnov(_v,2).disabled || (null as any));
    _ck(_v,0,0,currVal_0,currVal_1);
  });
}
function View_SubclipControlbarComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),7,'nav',[['class',
      'subclip-options'],['flex','20'],['layout-align','end stretch']],(null as any),
      (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
      ['\n  '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_SubclipControlbarComponent_2)),i0.ɵdid(16384,(null as any),0,i13.NgIf,[i0.ViewContainerRef,
      i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),
      ['\n  '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_SubclipControlbarComponent_3)),i0.ɵdid(16384,(null as any),0,i13.NgIf,[i0.ViewContainerRef,
      i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),
      ['\n']))],(_ck,_v) => {
    const currVal_0:any = false;
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = false;
    _ck(_v,6,0,currVal_1);
  },(null as any));
}
function View_SubclipControlbarComponent_4(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),28,'mat-menu',[['class',
      'more-options-menu'],['x-position','before']],(null as any),(null as any),(null as any),
      i14.View_MatMenu_0,i14.RenderType_MatMenu)),i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,
      ([] as any[]),(null as any),(null as any)),i0.ɵdid(1228800,[['morePlayerOptions',
      4]],1,i10.MatMenu,[i0.ElementRef,i0.NgZone,i10.MAT_MENU_DEFAULT_OPTIONS],{classList:[0,
      'classList']},(null as any)),i0.ɵqud(603979776,1,{items:1}),(_l()(),i0.ɵted(0,
      ['\n  '])),(_l()(),i0.ɵeld(0,(null as any),0,6,'button',[['class','mat-menu-item'],
      ['mat-menu-item',''],['role','menuitem']],[[2,'mat-menu-item-highlighted',(null as any)],
      [2,'mat-menu-item-submenu-trigger',(null as any)],[1,'tabindex',0],[1,'aria-disabled',
          0],[1,'disabled',0]],[[(null as any),'click'],[(null as any),'mouseenter']],
      (_v,en,$event) => {
        var ad:boolean = true;
        if (('click' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,6)._checkDisabled($event)) !== false);
          ad = (pd_0 && ad);
        }
        if (('mouseenter' === en)) {
          const pd_1:any = ((<any>i0.ɵnov(_v,6)._emitHoverEvent()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },i14.View_MatMenuItem_0,i14.RenderType_MatMenuItem)),i0.ɵdid(180224,[[1,4]],
      0,i10.MatMenuItem,[i0.ElementRef],(null as any),(null as any)),(_l()(),i0.ɵeld(0,
      (null as any),0,3,'mat-icon',[['class','mat-icon'],['role','img']],(null as any),
      (null as any),(null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),i0.ɵdid(16384,
      (null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),
      i0.ɵdid(638976,(null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,i9.MatIconRegistry,
          [8,(null as any)]],(null as any),(null as any)),(_l()(),i0.ɵted(0,['fullscreen'])),
      (_l()(),i0.ɵted(0,['Show full screen'])),(_l()(),i0.ɵted(0,['\n  '])),(_l()(),
          i0.ɵeld(0,(null as any),0,6,'button',[['class','mat-menu-item'],['mat-menu-item',
              ''],['role','menuitem']],[[2,'mat-menu-item-highlighted',(null as any)],
              [2,'mat-menu-item-submenu-trigger',(null as any)],[1,'tabindex',0],[1,
                  'aria-disabled',0],[1,'disabled',0]],[[(null as any),'click'],[(null as any),
              'mouseenter']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i0.ɵnov(_v,14)._checkDisabled($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('mouseenter' === en)) {
              const pd_1:any = ((<any>i0.ɵnov(_v,14)._emitHoverEvent()) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i14.View_MatMenuItem_0,i14.RenderType_MatMenuItem)),i0.ɵdid(180224,[[1,
          4]],0,i10.MatMenuItem,[i0.ElementRef],(null as any),(null as any)),(_l()(),
          i0.ɵeld(0,(null as any),0,3,'mat-icon',[['class','mat-icon'],['role','img']],
              (null as any),(null as any),(null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),
      i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),
          (null as any)),i0.ɵdid(638976,(null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,
          i9.MatIconRegistry,[8,(null as any)]],(null as any),(null as any)),(_l()(),
          i0.ɵted(0,['av_timer'])),(_l()(),i0.ɵted(0,['Show timecode formats'])),(_l()(),
          i0.ɵted(0,['\n  '])),(_l()(),i0.ɵeld(0,(null as any),0,6,'button',[['class',
          'mat-menu-item'],['mat-menu-item',''],['role','menuitem']],[[2,'mat-menu-item-highlighted',
          (null as any)],[2,'mat-menu-item-submenu-trigger',(null as any)],[1,'tabindex',
          0],[1,'aria-disabled',0],[1,'disabled',0]],[[(null as any),'click'],[(null as any),
          'mouseenter']],(_v,en,$event) => {
        var ad:boolean = true;
        if (('click' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,22)._checkDisabled($event)) !== false);
          ad = (pd_0 && ad);
        }
        if (('mouseenter' === en)) {
          const pd_1:any = ((<any>i0.ɵnov(_v,22)._emitHoverEvent()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },i14.View_MatMenuItem_0,i14.RenderType_MatMenuItem)),i0.ɵdid(180224,[[1,4]],
          0,i10.MatMenuItem,[i0.ElementRef],(null as any),(null as any)),(_l()(),i0.ɵeld(0,
          (null as any),0,3,'mat-icon',[['class','mat-icon'],['role','img']],(null as any),
          (null as any),(null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),i0.ɵdid(16384,
          (null as any),0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),
      i0.ɵdid(638976,(null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,i9.MatIconRegistry,
          [8,(null as any)]],(null as any),(null as any)),(_l()(),i0.ɵted(0,['keyboard'])),
      (_l()(),i0.ɵted(0,['Show keyboard shortcuts'])),(_l()(),i0.ɵted(0,['\n']))],
      (_ck,_v) => {
        const currVal_0:any = 'more-options-menu';
        _ck(_v,2,0,currVal_0);
        _ck(_v,9,0);
        _ck(_v,17,0);
        _ck(_v,25,0);
      },(_ck,_v) => {
        const currVal_1:any = i0.ɵnov(_v,6)._highlighted;
        const currVal_2:any = i0.ɵnov(_v,6)._triggersSubmenu;
        const currVal_3:any = i0.ɵnov(_v,6)._getTabIndex();
        const currVal_4:any = i0.ɵnov(_v,6).disabled.toString();
        const currVal_5:any = (i0.ɵnov(_v,6).disabled || (null as any));
        _ck(_v,5,0,currVal_1,currVal_2,currVal_3,currVal_4,currVal_5);
        const currVal_6:any = i0.ɵnov(_v,14)._highlighted;
        const currVal_7:any = i0.ɵnov(_v,14)._triggersSubmenu;
        const currVal_8:any = i0.ɵnov(_v,14)._getTabIndex();
        const currVal_9:any = i0.ɵnov(_v,14).disabled.toString();
        const currVal_10:any = (i0.ɵnov(_v,14).disabled || (null as any));
        _ck(_v,13,0,currVal_6,currVal_7,currVal_8,currVal_9,currVal_10);
        const currVal_11:any = i0.ɵnov(_v,22)._highlighted;
        const currVal_12:any = i0.ɵnov(_v,22)._triggersSubmenu;
        const currVal_13:any = i0.ɵnov(_v,22)._getTabIndex();
        const currVal_14:any = i0.ɵnov(_v,22).disabled.toString();
        const currVal_15:any = (i0.ɵnov(_v,22).disabled || (null as any));
        _ck(_v,21,0,currVal_11,currVal_12,currVal_13,currVal_14,currVal_15);
      });
}
export function View_SubclipControlbarComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[(_l()(),i0.ɵeld(0,(null as any),(null as any),25,'section',[['flex',
      '80'],['layout-align','start stretch']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n  '])),(_l()(),
      i0.ɵeld(0,(null as any),(null as any),1,'wz-marker-seek-button',([] as any[]),
          (null as any),[[(null as any),'request']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i15.SubclipControlbarComponent = _v.component;
            if (('request' === en)) {
              const pd_0:any = ((<any>_co.forward($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i16.View_MarkerSeekButtonComponent_0,i16.RenderType_MarkerSeekButtonComponent)),
      i0.ɵdid(49152,(null as any),0,i17.MarkerSeekButtonComponent,([] as any[]),{type:[0,
          'type'],playerState:[1,'playerState']},{request:'request'}),(_l()(),i0.ɵted((null as any),
          ['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-marker-time-display',
          ([] as any[]),(null as any),(null as any),(null as any),i18.View_MarkerTimeDisplayComponent_0,
          i18.RenderType_MarkerTimeDisplayComponent)),i0.ɵdid(49152,(null as any),
          0,i19.MarkerTimeDisplayComponent,([] as any[]),{type:[0,'type'],playerState:[1,
              'playerState']},(null as any)),(_l()(),i0.ɵted((null as any),['\n  '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-marker-set-button',([] as any[]),
          (null as any),[[(null as any),'request']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i15.SubclipControlbarComponent = _v.component;
            if (('request' === en)) {
              const pd_0:any = ((<any>_co.forward($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i20.View_MarkerSetButtonComponent_0,i20.RenderType_MarkerSetButtonComponent)),
      i0.ɵdid(49152,(null as any),0,i21.MarkerSetButtonComponent,([] as any[]),{type:[0,
          'type'],playerState:[1,'playerState']},{request:'request'}),(_l()(),i0.ɵted((null as any),
          ['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-markers-playback-button',
          ([] as any[]),(null as any),[[(null as any),'request']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i15.SubclipControlbarComponent = _v.component;
            if (('request' === en)) {
              const pd_0:any = ((<any>_co.forward($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i22.View_MarkersPlaybackButtonComponent_0,i22.RenderType_MarkersPlaybackButtonComponent)),
      i0.ɵdid(49152,(null as any),0,i23.MarkersPlaybackButtonComponent,([] as any[]),
          {playerState:[0,'playerState']},{request:'request'}),(_l()(),i0.ɵted((null as any),
          ['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-marker-set-button',
          ([] as any[]),(null as any),[[(null as any),'request']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i15.SubclipControlbarComponent = _v.component;
            if (('request' === en)) {
              const pd_0:any = ((<any>_co.forward($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i20.View_MarkerSetButtonComponent_0,i20.RenderType_MarkerSetButtonComponent)),
      i0.ɵdid(49152,(null as any),0,i21.MarkerSetButtonComponent,([] as any[]),{type:[0,
          'type'],playerState:[1,'playerState']},{request:'request'}),(_l()(),i0.ɵted((null as any),
          ['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-marker-time-display',
          ([] as any[]),(null as any),(null as any),(null as any),i18.View_MarkerTimeDisplayComponent_0,
          i18.RenderType_MarkerTimeDisplayComponent)),i0.ɵdid(49152,(null as any),
          0,i19.MarkerTimeDisplayComponent,([] as any[]),{type:[0,'type'],playerState:[1,
              'playerState']},(null as any)),(_l()(),i0.ɵted((null as any),['\n  '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-marker-seek-button',([] as any[]),
          (null as any),[[(null as any),'request']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i15.SubclipControlbarComponent = _v.component;
            if (('request' === en)) {
              const pd_0:any = ((<any>_co.forward($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i16.View_MarkerSeekButtonComponent_0,i16.RenderType_MarkerSeekButtonComponent)),
      i0.ɵdid(49152,(null as any),0,i17.MarkerSeekButtonComponent,([] as any[]),{type:[0,
          'type'],playerState:[1,'playerState']},{request:'request'}),(_l()(),i0.ɵted((null as any),
          ['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-markers-clear-button',
          ([] as any[]),(null as any),[[(null as any),'request']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i15.SubclipControlbarComponent = _v.component;
            if (('request' === en)) {
              const pd_0:any = ((<any>_co.forward($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i24.View_MarkersClearButtonComponent_0,i24.RenderType_MarkersClearButtonComponent)),
      i0.ɵdid(49152,(null as any),0,i25.MarkersClearButtonComponent,([] as any[]),
          {playerState:[0,'playerState']},{request:'request'}),(_l()(),i0.ɵted((null as any),
          ['\n'])),(_l()(),i0.ɵted((null as any),['\n\n'])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_SubclipControlbarComponent_1)),
      i0.ɵdid(16384,(null as any),0,i13.NgIf,[i0.ViewContainerRef,i0.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n\n'])),
      (_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_SubclipControlbarComponent_4)),
      i0.ɵdid(16384,(null as any),0,i13.NgIf,[i0.ViewContainerRef,i0.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n']))],
      (_ck,_v) => {
        var _co:i15.SubclipControlbarComponent = _v.component;
        const currVal_0:any = 'in';
        const currVal_1:any = _co.playerState;
        _ck(_v,3,0,currVal_0,currVal_1);
        const currVal_2:any = 'in';
        const currVal_3:any = _co.playerState;
        _ck(_v,6,0,currVal_2,currVal_3);
        const currVal_4:any = 'in';
        const currVal_5:any = _co.playerState;
        _ck(_v,9,0,currVal_4,currVal_5);
        const currVal_6:any = _co.playerState;
        _ck(_v,12,0,currVal_6);
        const currVal_7:any = 'out';
        const currVal_8:any = _co.playerState;
        _ck(_v,15,0,currVal_7,currVal_8);
        const currVal_9:any = 'out';
        const currVal_10:any = _co.playerState;
        _ck(_v,18,0,currVal_9,currVal_10);
        const currVal_11:any = 'out';
        const currVal_12:any = _co.playerState;
        _ck(_v,21,0,currVal_11,currVal_12);
        const currVal_13:any = _co.playerState;
        _ck(_v,24,0,currVal_13);
        const currVal_14:any = _co.displayAllControls;
        _ck(_v,28,0,currVal_14);
        const currVal_15:any = false;
        _ck(_v,31,0,currVal_15);
      },(null as any));
}
export function View_SubclipControlbarComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-subclip-controlbar',
      ([] as any[]),(null as any),(null as any),(null as any),View_SubclipControlbarComponent_0,
      RenderType_SubclipControlbarComponent)),i0.ɵdid(49152,(null as any),0,i15.SubclipControlbarComponent,
      ([] as any[]),(null as any),(null as any))],(null as any),(null as any));
}
export const SubclipControlbarComponentNgFactory:i0.ComponentFactory<i15.SubclipControlbarComponent> = i0.ɵccf('wz-subclip-controlbar',
    i15.SubclipControlbarComponent,View_SubclipControlbarComponent_Host_0,{playerState:'playerState',
        displayAllControls:'displayAllControls'},{request:'request'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9sYmFycy9zdWJjbGlwLWNvbnRyb2xiYXIuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LXBsYXllci9jb21wb25lbnRzL3d6LWFkdmFuY2VkLXBsYXllci9jb250cm9sYmFycy9zdWJjbGlwLWNvbnRyb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xiYXJzL3N1YmNsaXAtY29udHJvbGJhci5odG1sIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xiYXJzL3N1YmNsaXAtY29udHJvbGJhci5jb21wb25lbnQudHMuU3ViY2xpcENvbnRyb2xiYXJDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8c2VjdGlvbiBmbGV4PVwiODBcIiAgbGF5b3V0LWFsaWduPVwic3RhcnQgc3RyZXRjaFwiPlxuICA8d3otbWFya2VyLXNlZWstYnV0dG9uIFt0eXBlXT1cIidpbidcIiBbcGxheWVyU3RhdGVdPVwicGxheWVyU3RhdGVcIiAocmVxdWVzdCk9XCJmb3J3YXJkKCRldmVudClcIj48L3d6LW1hcmtlci1zZWVrLWJ1dHRvbj5cbiAgPHd6LW1hcmtlci10aW1lLWRpc3BsYXkgW3R5cGVdPVwiJ2luJ1wiIFtwbGF5ZXJTdGF0ZV09XCJwbGF5ZXJTdGF0ZVwiPjwvd3otbWFya2VyLXRpbWUtZGlzcGxheT5cbiAgPHd6LW1hcmtlci1zZXQtYnV0dG9uIFt0eXBlXT1cIidpbidcIiBbcGxheWVyU3RhdGVdPVwicGxheWVyU3RhdGVcIiAocmVxdWVzdCk9XCJmb3J3YXJkKCRldmVudClcIj48L3d6LW1hcmtlci1zZXQtYnV0dG9uPlxuICA8d3otbWFya2Vycy1wbGF5YmFjay1idXR0b24gW3BsYXllclN0YXRlXT1cInBsYXllclN0YXRlXCIgKHJlcXVlc3QpPVwiZm9yd2FyZCgkZXZlbnQpXCI+PC93ei1tYXJrZXJzLXBsYXliYWNrLWJ1dHRvbj5cbiAgPHd6LW1hcmtlci1zZXQtYnV0dG9uIFt0eXBlXT1cIidvdXQnXCIgW3BsYXllclN0YXRlXT1cInBsYXllclN0YXRlXCIgKHJlcXVlc3QpPVwiZm9yd2FyZCgkZXZlbnQpXCI+PC93ei1tYXJrZXItc2V0LWJ1dHRvbj5cbiAgPHd6LW1hcmtlci10aW1lLWRpc3BsYXkgW3R5cGVdPVwiJ291dCdcIiBbcGxheWVyU3RhdGVdPVwicGxheWVyU3RhdGVcIj48L3d6LW1hcmtlci10aW1lLWRpc3BsYXk+XG4gIDx3ei1tYXJrZXItc2Vlay1idXR0b24gW3R5cGVdPVwiJ291dCdcIiBbcGxheWVyU3RhdGVdPVwicGxheWVyU3RhdGVcIiAocmVxdWVzdCk9XCJmb3J3YXJkKCRldmVudClcIj48L3d6LW1hcmtlci1zZWVrLWJ1dHRvbj5cbiAgPHd6LW1hcmtlcnMtY2xlYXItYnV0dG9uIFtwbGF5ZXJTdGF0ZV09XCJwbGF5ZXJTdGF0ZVwiIChyZXF1ZXN0KT1cImZvcndhcmQoJGV2ZW50KVwiPjwvd3otbWFya2Vycy1jbGVhci1idXR0b24+XG48L3NlY3Rpb24+XG5cbjxuYXYgKm5nSWY9XCJkaXNwbGF5QWxsQ29udHJvbHNcIiBjbGFzcz1cInN1YmNsaXAtb3B0aW9uc1wiIGZsZXg9XCIyMFwiIGxheW91dC1hbGlnbj1cImVuZCBzdHJldGNoXCI+XG4gIDxidXR0b24gKm5nSWY9XCJmYWxzZVwiIG1hdC1pY29uLWJ1dHRvbiB0aXRsZT1cInt7ICdBU1NFVC5BRFZfUExBWUVSLlNJTVBMRV9CVE5fVElUTEUnIHwgdHJhbnNsYXRlIH19XCI+XG4gICAgPG1hdC1pY29uPm9uZGVtYW5kX3ZpZGVvPC9tYXQtaWNvbj5cbiAgPC9idXR0b24+XG4gIDxidXR0b24gKm5nSWY9XCJmYWxzZVwiIG1hdC1pY29uLWJ1dHRvbiB0aXRsZT1cInt7ICdBU1NFVC5BRFZfUExBWUVSLk1PUkVfQlROX1RJVExFJyB8IHRyYW5zbGF0ZSB9fVwiIFxuICAgIFttYXQtbWVudS10cmlnZ2VyLWZvcl09XCJtb3JlUGxheWVyT3B0aW9uc1wiPlxuICAgIDxtYXQtaWNvbj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuICA8L2J1dHRvbj5cbjwvbmF2PlxuXG48bWF0LW1lbnUgKm5nSWY9XCJmYWxzZVwiIGNsYXNzPVwibW9yZS1vcHRpb25zLW1lbnVcIiB4LXBvc2l0aW9uPVwiYmVmb3JlXCIgI21vcmVQbGF5ZXJPcHRpb25zPVwibWF0TWVudVwiPlxuICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0+PG1hdC1pY29uPmZ1bGxzY3JlZW48L21hdC1pY29uPlNob3cgZnVsbCBzY3JlZW48L2J1dHRvbj5cbiAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtPjxtYXQtaWNvbj5hdl90aW1lcjwvbWF0LWljb24+U2hvdyB0aW1lY29kZSBmb3JtYXRzPC9idXR0b24+XG4gIDxidXR0b24gbWF0LW1lbnUtaXRlbT48bWF0LWljb24+a2V5Ym9hcmQ8L21hdC1pY29uPlNob3cga2V5Ym9hcmQgc2hvcnRjdXRzPC9idXR0b24+XG48L21hdC1tZW51PlxuIiwiPHd6LXN1YmNsaXAtY29udHJvbGJhcj48L3d6LXN1YmNsaXAtY29udHJvbGJhcj4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Oztv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