/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@angular/material/core';
import * as i2 from '@ngx-translate/core/src/translate.pipe';
import * as i3 from '@ngx-translate/core/src/translate.service';
import * as i4 from '@angular/common';
import * as i5 from '../../../../../../node_modules/@angular/material/list/typings/index.ngfactory';
import * as i6 from '@angular/material/list';
import * as i7 from './wz-input-suggestions.component';
import * as i8 from '../../../../services/api.service';
const styles_WzInputSuggestionsComponent:any[] = ['mat-list-item[_ngcontent-%COMP%]:first-child{ display: none;}'];
export const RenderType_WzInputSuggestionsComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:0,
    styles:styles_WzInputSuggestionsComponent,data:{}});
function View_WzInputSuggestionsComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'div',[['class',
      'heading mat-line'],['mat-line','']],(null as any),[[(null as any),'click']],
      (_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.closeSuggestions()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i1.MatLine,([] as any[]),
      (null as any),(null as any)),(_l()(),i0.ɵted((null as any),['\n    ','\n  '])),
      i0.ɵpid(131072,i2.TranslatePipe,[i3.TranslateService,i0.ChangeDetectorRef])],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = i0.ɵunv(_v,2,0,i0.ɵnov(_v,3).transform(_co.rawField.suggestionHeading));
        _ck(_v,2,0,currVal_0);
      });
}
function View_WzInputSuggestionsComponent_4(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'button',([] as any[]),
      [[8,'innerHTML',1]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.selectSuggestion((<any>_v.parent).context.$implicit)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),i0.ɵdid(278528,(null as any),0,i4.NgClass,[i0.IterableDiffers,
      i0.KeyValueDiffers,i0.ElementRef,i0.Renderer],{ngClass:[0,'ngClass']},(null as any)),
      i0.ɵpod({'active':0})],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_1:any = _ck(_v,2,0,(_co.activeSuggestion == (<any>_v.parent).context.$implicit));
    _ck(_v,1,0,currVal_1);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.parseSuggestion((<any>_v.parent).context.$implicit);
    _ck(_v,0,0,currVal_0);
  });
}
function View_WzInputSuggestionsComponent_5(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'button',([] as any[]),
      (null as any),[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.selectSuggestion((<any>_v.parent).context.$implicit)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),i0.ɵdid(278528,(null as any),0,i4.NgClass,[i0.IterableDiffers,
      i0.KeyValueDiffers,i0.ElementRef,i0.Renderer],{ngClass:[0,'ngClass']},(null as any)),
      i0.ɵpod({'active':0}),(_l()(),i0.ɵted((null as any),['','\n      ']))],(_ck,
      _v) => {
    var _co:any = _v.component;
    const currVal_0:any = _ck(_v,2,0,(_co.activeSuggestion == (<any>_v.parent).context.$implicit));
    _ck(_v,1,0,currVal_0);
  },(_ck,_v) => {
    const currVal_1:any = (<any>_v.parent).context.$implicit;
    _ck(_v,3,0,currVal_1);
  });
}
function View_WzInputSuggestionsComponent_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),11,'mat-list-item',
      [['class','mat-list-item'],['role','listitem']],(null as any),[[(null as any),
          'focus'],[(null as any),'blur']],(_v,en,$event) => {
        var ad:boolean = true;
        if (('focus' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,2)._handleFocus()) !== false);
          ad = (pd_0 && ad);
        }
        if (('blur' === en)) {
          const pd_1:any = ((<any>i0.ɵnov(_v,2)._handleBlur()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },i5.View_MatListItem_0,i5.RenderType_MatListItem)),i0.ɵdid(16384,(null as any),
      0,i1.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(1097728,
      (null as any),2,i6.MatListItem,[i0.Renderer2,i0.ElementRef,[2,i6.MatList],[2,
          i6.MatNavListCssMatStyler]],(null as any),(null as any)),i0.ɵqud(603979776,
      1,{_lines:1}),i0.ɵqud(335544320,2,{_hasAvatar:0}),(_l()(),i0.ɵted(2,['\n      '])),
      (_l()(),i0.ɵand(16777216,(null as any),2,1,(null as any),View_WzInputSuggestionsComponent_4)),
      i0.ɵdid(16384,(null as any),0,i4.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted(2,['\n      '])),(_l()(),i0.ɵand(16777216,
          (null as any),2,1,(null as any),View_WzInputSuggestionsComponent_5)),i0.ɵdid(16384,
          (null as any),0,i4.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted(2,['\n    ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:boolean = !_co.isCollection();
    _ck(_v,7,0,currVal_0);
    const currVal_1:any = _co.isCollection();
    _ck(_v,10,0,currVal_1);
  },(null as any));
}
function View_WzInputSuggestionsComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),15,'div',[['class',
      'suggestions-menu']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),i0.ɵdid(278528,(null as any),0,i4.NgClass,[i0.IterableDiffers,
      i0.KeyValueDiffers,i0.ElementRef,i0.Renderer],{klass:[0,'klass'],ngClass:[1,
      'ngClass']},(null as any)),i0.ɵpod({'revealed':0}),(_l()(),i0.ɵted((null as any),
      ['\n  '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_WzInputSuggestionsComponent_2)),i0.ɵdid(16384,(null as any),0,i4.NgIf,[i0.ViewContainerRef,
      i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),
      ['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),7,'mat-list',[['class',
      'mat-list'],['role','list']],(null as any),(null as any),(null as any),i5.View_MatList_0,
      i5.RenderType_MatList)),i0.ɵdid(16384,(null as any),0,i1.MatPrefixRejector,([] as any[]),
      (null as any),(null as any)),i0.ɵdid(49152,(null as any),0,i6.MatList,([] as any[]),
      (null as any),(null as any)),i0.ɵdid(16384,(null as any),0,i6.MatListCssMatStyler,
      ([] as any[]),(null as any),(null as any)),(_l()(),i0.ɵted(0,['\n    '])),(_l()(),
      i0.ɵand(16777216,(null as any),0,1,(null as any),View_WzInputSuggestionsComponent_3)),
      i0.ɵdid(802816,(null as any),0,i4.NgForOf,[i0.ViewContainerRef,i0.TemplateRef,
          i0.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i0.ɵted(0,
          ['\n  '])),(_l()(),i0.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = 'suggestions-menu';
    const currVal_1:any = _ck(_v,2,0,(_co.suggestions.length > 1));
    _ck(_v,1,0,currVal_0,currVal_1);
    const currVal_2:any = _co.rawField.suggestionHeading;
    _ck(_v,5,0,currVal_2);
    const currVal_3:any = _co.suggestions;
    _ck(_v,13,0,currVal_3);
  },(null as any));
}
export function View_WzInputSuggestionsComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[i0.ɵncd((null as any),0),(_l()(),i0.ɵted((null as any),['\n'])),
      (_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_WzInputSuggestionsComponent_1)),
      i0.ɵdid(16384,(null as any),0,i4.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i7.WzInputSuggestionsComponent = _v.component;
    const currVal_0:any = (_co.suggestions.length > 1);
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
export function View_WzInputSuggestionsComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-input-suggestions',
      ([] as any[]),(null as any),(null as any),(null as any),View_WzInputSuggestionsComponent_0,
      RenderType_WzInputSuggestionsComponent)),i0.ɵdid(245760,(null as any),0,i7.WzInputSuggestionsComponent,
      [i0.Renderer,i8.ApiService,i0.ChangeDetectorRef],(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(null as any));
}
export const WzInputSuggestionsComponentNgFactory:i0.ComponentFactory<i7.WzInputSuggestionsComponent> = i0.ɵccf('wz-input-suggestions',
    i7.WzInputSuggestionsComponent,View_WzInputSuggestionsComponent_Host_0,{fControl:'fControl',
        rawField:'rawField',matchOnProperty:'matchOnProperty'},{newSuggestion:'newSuggestion'},
    ['*']);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWZvcm0vY29tcG9uZW50cy93ei1pbnB1dC1zdWdnZXN0aW9ucy93ei1pbnB1dC1zdWdnZXN0aW9ucy5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL21vZHVsZXMvd3otZm9ybS9jb21wb25lbnRzL3d6LWlucHV0LXN1Z2dlc3Rpb25zL3d6LWlucHV0LXN1Z2dlc3Rpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWZvcm0vY29tcG9uZW50cy93ei1pbnB1dC1zdWdnZXN0aW9ucy93ei1pbnB1dC1zdWdnZXN0aW9ucy5odG1sIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL21vZHVsZXMvd3otZm9ybS9jb21wb25lbnRzL3d6LWlucHV0LXN1Z2dlc3Rpb25zL3d6LWlucHV0LXN1Z2dlc3Rpb25zLmNvbXBvbmVudC50cy5XeklucHV0U3VnZ2VzdGlvbnNDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48ZGl2IGNsYXNzPVwic3VnZ2VzdGlvbnMtbWVudVwiICpuZ0lmPVwic3VnZ2VzdGlvbnMubGVuZ3RoID4gMVwiIFtuZ0NsYXNzXT1cInsncmV2ZWFsZWQnOiBzdWdnZXN0aW9ucy5sZW5ndGggPiAxfVwiPlxuICA8ZGl2ICpuZ0lmPVwicmF3RmllbGQuc3VnZ2VzdGlvbkhlYWRpbmdcIiAoY2xpY2spPVwiY2xvc2VTdWdnZXN0aW9ucygpXCIgbWF0LWxpbmUgY2xhc3M9XCJoZWFkaW5nXCI+XG4gICAge3sgcmF3RmllbGQuc3VnZ2VzdGlvbkhlYWRpbmcgfCB0cmFuc2xhdGV9fVxuICA8L2Rpdj5cbiAgPG1hdC1saXN0PlxuICAgIDxtYXQtbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBzdWdnZXN0aW9uIG9mIHN1Z2dlc3Rpb25zXCI+XG4gICAgICA8YnV0dG9uICpuZ0lmPVwiIWlzQ29sbGVjdGlvbigpXCIgKGNsaWNrKT1cInNlbGVjdFN1Z2dlc3Rpb24oc3VnZ2VzdGlvbilcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGFjdGl2ZVN1Z2dlc3Rpb24gPT0gc3VnZ2VzdGlvbn1cIlxuICAgICAgICBbaW5uZXJIVE1MXT1cInBhcnNlU3VnZ2VzdGlvbihzdWdnZXN0aW9uKVwiPjwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiAqbmdJZj1cImlzQ29sbGVjdGlvbigpXCIgKGNsaWNrKT1cInNlbGVjdFN1Z2dlc3Rpb24oc3VnZ2VzdGlvbilcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGFjdGl2ZVN1Z2dlc3Rpb24gPT0gc3VnZ2VzdGlvbn1cIj57e3N1Z2dlc3Rpb259fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9tYXQtbGlzdC1pdGVtPlxuICA8L21hdC1saXN0PlxuPC9kaXY+XG4iLCI8d3otaW5wdXQtc3VnZ2VzdGlvbnM+PC93ei1pbnB1dC1zdWdnZXN0aW9ucz4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDRUU7TUFBQTtNQUFBO1FBQUE7UUFBQTtRQUF3QztVQUFBO1VBQUE7UUFBQTtRQUF4QztNQUFBLHVDQUFBO01BQUEsNkJBQThGO2FBQUE7OztRQUFBO1FBQUE7Ozs7b0JBSzFGO01BQUE7UUFBQTtRQUFBO1FBQWdDO1VBQUE7VUFBQTtRQUFBO1FBQWhDO01BQUEsdUNBQUE7a0RBQUE7YUFBdUU7O0lBQUE7SUFBdkUsV0FBdUUsU0FBdkU7OztJQUNFO0lBREYsV0FDRSxTQURGOzs7O29CQUVBO01BQUE7UUFBQTtRQUFBO1FBQStCO1VBQUE7VUFBQTtRQUFBO1FBQS9CO01BQUEsdUNBQUE7a0RBQUE7YUFBc0UsZUFBdUQ7OztJQUF2RDtJQUF0RSxXQUFzRSxTQUF0RTs7SUFBNkg7SUFBQTs7OztvQkFIL0g7TUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7TUFBQSwyREFBQTtNQUFBLHlFQUFBO01BQUE7bUNBQUE7TUFBQSxrREFBc0Q7TUFDcEQ7YUFBQTtVQUFBLHdCQUNxRCxpQ0FDckQ7VUFBQSw0RUFBQTtVQUFBO1VBQUEsZUFDUzs7SUFIRDtJQUFSLFdBQVEsU0FBUjtJQUVRO0lBQVIsWUFBUSxTQUFSOzs7O29CQVJOO01BQUE7TUFBQSx1QkFBQTtrREFBQTtNQUFBLGtDQUE2RCxpQkFBaUQ7TUFBQSxXQUM1RztNQUFBLDRDQUFBO29CQUFBLG1DQUVNO01BQUEsV0FDTjtNQUFBOzJCQUFBLFVBQUE7TUFBQSxvQ0FBQTtNQUFBLG9DQUFBO01BQUEsMkNBQVUsK0JBQ1I7YUFBQTthQUFBOzRCQUFBLHlDQUtnQjtVQUFBLFdBQ1A7O0lBWFI7SUFBd0Q7SUFBN0QsV0FBSyxVQUF3RCxTQUE3RDtJQUNPO0lBQUwsV0FBSyxTQUFMO0lBSWlCO0lBQWYsWUFBZSxTQUFmOzs7OzJCQU5KLGtCQUF5QjtNQUN6QjthQUFBO1VBQUEsd0JBWU07O0lBWndCO0lBQTlCLFdBQThCLFNBQTlCOzs7O29CQ0RBO01BQUE7NENBQUEsVUFBQTtNQUFBOztRQUFBOzs7Ozs7In0=
