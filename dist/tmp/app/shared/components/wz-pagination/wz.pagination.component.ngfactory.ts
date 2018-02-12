/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from './wz.pagination.component';
import * as i3 from '../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i4 from '@angular/material/core';
import * as i5 from '@angular/material/button';
import * as i6 from '@angular/cdk/platform';
import * as i7 from '@angular/cdk/a11y';
import * as i8 from '../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i9 from '@angular/material/icon';
import * as i10 from '@angular/forms';
const styles_WzPaginationComponent:any[] = ([] as any[]);
export const RenderType_WzPaginationComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_WzPaginationComponent,data:{}});
function View_WzPaginationComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'div',[['class',
      'results-count']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['',' results'])),i0.ɵppd(1)],(null as any),(_ck,
      _v) => {
    var _co:any = _v.component;
    const currVal_0:any = i0.ɵunv(_v,1,0,_ck(_v,2,0,i0.ɵnov((<any>_v.parent),0),_co.pagination.totalCount));
    _ck(_v,1,0,currVal_0);
  });
}
export function View_WzPaginationComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[i0.ɵpid(0,i1.DecimalPipe,[i0.LOCALE_ID]),(_l()(),i0.ɵeld(0,(null as any),
      (null as any),32,'div',[['class','pagination mat-body-2'],['layout-align','end center']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n	'])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),
      1,(null as any),View_WzPaginationComponent_1)),i0.ɵdid(16384,(null as any),0,
      i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i0.ɵted((null as any),['\n	'])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          26,'nav',[['layout','row'],['layout-align','end center']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n		'])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'span',[['class',
          'current-page']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted((null as any),['page ',' of ',''])),i0.ɵppd(1),
      i0.ɵppd(1),(_l()(),i0.ɵted((null as any),['\n		'])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),7,'button',[['class','mat-icon-button'],['mat-icon-button',
              ''],['title','previous page']],[[8,'disabled',0]],[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.WzPaginationComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.getPageNumber((_co.pagination.currentPage - 1))) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i3.View_MatButton_0,i3.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
          0,i4.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
          (null as any),0,i5.MatButton,[i0.Renderer2,i0.ElementRef,i6.Platform,i7.FocusMonitor],
          {disabled:[0,'disabled']},(null as any)),i0.ɵdid(16384,(null as any),0,i5.MatIconButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),(_l()(),i0.ɵeld(0,(null as any),
          0,3,'mat-icon',[['class','mat-icon'],['role','img']],(null as any),(null as any),
          (null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),i0.ɵdid(16384,(null as any),
          0,i4.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(638976,
          (null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,i9.MatIconRegistry,
              [8,(null as any)]],(null as any),(null as any)),(_l()(),i0.ɵted(0,['keyboard_arrow_left'])),
      (_l()(),i0.ɵted((null as any),['\n		'])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          0,'div',[['class','divider']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n		'])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),7,'button',[['class','mat-icon-button'],
              ['mat-icon-button',''],['title','next page']],[[8,'disabled',0]],[[(null as any),
              'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.WzPaginationComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.getPageNumber((_co.pagination.currentPage + 1))) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i3.View_MatButton_0,i3.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
          0,i4.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
          (null as any),0,i5.MatButton,[i0.Renderer2,i0.ElementRef,i6.Platform,i7.FocusMonitor],
          {disabled:[0,'disabled']},(null as any)),i0.ɵdid(16384,(null as any),0,i5.MatIconButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),(_l()(),i0.ɵeld(0,(null as any),
          0,3,'mat-icon',[['class','mat-icon'],['role','img']],(null as any),(null as any),
          (null as any),i8.View_MatIcon_0,i8.RenderType_MatIcon)),i0.ɵdid(16384,(null as any),
          0,i4.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(638976,
          (null as any),0,i9.MatIcon,[i0.Renderer2,i0.ElementRef,i9.MatIconRegistry,
              [8,(null as any)]],(null as any),(null as any)),(_l()(),i0.ɵted(0,['keyboard_arrow_right'])),
      (_l()(),i0.ɵted((null as any),['\n	'])),(_l()(),i0.ɵted((null as any),['\n'])),
      (_l()(),i0.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i2.WzPaginationComponent = _v.component;
    const currVal_0:any = _co.pagination.totalCount;
    _ck(_v,4,0,currVal_0);
    const currVal_4:boolean = !_co.pagination.hasPreviousPage;
    _ck(_v,15,0,currVal_4);
    _ck(_v,19,0);
    const currVal_6:boolean = !_co.pagination.hasNextPage;
    _ck(_v,26,0,currVal_6);
    _ck(_v,30,0);
  },(_ck,_v) => {
    var _co:i2.WzPaginationComponent = _v.component;
    const currVal_1:any = i0.ɵunv(_v,9,0,_ck(_v,10,0,i0.ɵnov(_v,0),_co.pagination.currentPage));
    const currVal_2:any = i0.ɵunv(_v,9,1,_ck(_v,11,0,i0.ɵnov(_v,0),_co.pagination.numberOfPages));
    _ck(_v,9,0,currVal_1,currVal_2);
    const currVal_3:any = (i0.ɵnov(_v,15).disabled || (null as any));
    _ck(_v,13,0,currVal_3);
    const currVal_5:any = (i0.ɵnov(_v,26).disabled || (null as any));
    _ck(_v,24,0,currVal_5);
  });
}
export function View_WzPaginationComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-pagination',
      ([] as any[]),(null as any),(null as any),(null as any),View_WzPaginationComponent_0,
      RenderType_WzPaginationComponent)),i0.ɵdid(114688,(null as any),0,i2.WzPaginationComponent,
      [i10.FormBuilder],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const WzPaginationComponentNgFactory:i0.ComponentFactory<i2.WzPaginationComponent> = i0.ɵccf('wz-pagination',
    i2.WzPaginationComponent,View_WzPaginationComponent_Host_0,{pagination:'pagination'},
    {getPage:'getPage'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LXBhZ2luYXRpb24vd3oucGFnaW5hdGlvbi5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL2NvbXBvbmVudHMvd3otcGFnaW5hdGlvbi93ei5wYWdpbmF0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LXBhZ2luYXRpb24vd3oucGFnaW5hdGlvbi5odG1sIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvc2hhcmVkL2NvbXBvbmVudHMvd3otcGFnaW5hdGlvbi93ei5wYWdpbmF0aW9uLmNvbXBvbmVudC50cy5XelBhZ2luYXRpb25Db21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbiBtYXQtYm9keS0yXCIgbGF5b3V0LWFsaWduPVwiZW5kIGNlbnRlclwiPlxuXHQ8ZGl2ICpuZ0lmPVwicGFnaW5hdGlvbi50b3RhbENvdW50XCIgY2xhc3M9XCJyZXN1bHRzLWNvdW50XCI+e3sgcGFnaW5hdGlvbi50b3RhbENvdW50IHwgbnVtYmVyIH19IHJlc3VsdHM8L2Rpdj5cblx0PG5hdiBsYXlvdXQ9XCJyb3dcIiBsYXlvdXQtYWxpZ249XCJlbmQgY2VudGVyXCI+XG5cdFx0PHNwYW4gY2xhc3M9XCJjdXJyZW50LXBhZ2VcIj5wYWdlIHt7IHBhZ2luYXRpb24uY3VycmVudFBhZ2UgfCBudW1iZXIgfX0gb2Yge3sgcGFnaW5hdGlvbi5udW1iZXJPZlBhZ2VzIHwgbnVtYmVyIH19PC9zcGFuPlxuXHRcdDxidXR0b24gW2Rpc2FibGVkXT1cIiFwYWdpbmF0aW9uLmhhc1ByZXZpb3VzUGFnZVwiIG1hdC1pY29uLWJ1dHRvbiB0aXRsZT1cInByZXZpb3VzIHBhZ2VcIiAoY2xpY2spPVwiZ2V0UGFnZU51bWJlcihwYWdpbmF0aW9uLmN1cnJlbnRQYWdlIC0gMSlcIj48bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfbGVmdDwvbWF0LWljb24+PC9idXR0b24+XG5cdFx0PGRpdiBjbGFzcz1cImRpdmlkZXJcIj48L2Rpdj5cblx0XHQ8YnV0dG9uIFtkaXNhYmxlZF09XCIhcGFnaW5hdGlvbi5oYXNOZXh0UGFnZVwiIG1hdC1pY29uLWJ1dHRvbiB0aXRsZT1cIm5leHQgcGFnZVwiIChjbGljayk9XCJnZXRQYWdlTnVtYmVyKHBhZ2luYXRpb24uY3VycmVudFBhZ2UgKyAxKVwiPjxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19yaWdodDwvbWF0LWljb24+PC9idXR0b24+XG5cdDwvbmF2PlxuPC9kaXY+XG4iLCI8d3otcGFnaW5hdGlvbj48L3d6LXBhZ2luYXRpb24+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQ0M7TUFBQTtNQUF5RDs7O0lBQUE7SUFBQTs7Ozs2REFEMUQ7TUFBQTtNQUFBLHdFQUE2RDthQUFBLHlCQUM1RDtNQUFBLHNEQUFBO2NBQUE7TUFBMkcsd0NBQzNHO1VBQUE7VUFBQSwwREFBNEM7VUFBQSxXQUMzQztVQUFBO1VBQUEsZ0JBQTJCO2FBQUEsSUFBNEYseUNBQ3ZIO1VBQUE7Y0FBQTtVQUFBO1lBQUE7WUFBQTtZQUF1RjtjQUFBO2NBQUE7WUFBQTtZQUF2RjtVQUFBLHVEQUFBO1VBQUEseUVBQUE7VUFBQTtVQUFBLGdEQUFBO1VBQUEsMkNBQTJJO1VBQUE7VUFBQSwrREFBQTtVQUFBLHlFQUFBO1VBQUE7Y0FBQSxnREFBVTtNQUF1Qyx5Q0FDNUw7VUFBQTtVQUFBLDhCQUEyQix5Q0FDM0I7aUJBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtZQUErRTtjQUFBO2NBQUE7WUFBQTtZQUEvRTtVQUFBLHVEQUFBO1VBQUEseUVBQUE7VUFBQTtVQUFBLGdEQUFBO1VBQUEsMkNBQW1JO1VBQUE7VUFBQSwrREFBQTtVQUFBLHlFQUFBO1VBQUE7Y0FBQSxnREFBVTtNQUF3Qyx3Q0FDaEw7TUFDRDs7SUFQQTtJQUFMLFdBQUssU0FBTDtJQUdTO0lBQVIsWUFBUSxTQUFSO0lBQTJJO0lBRW5JO0lBQVIsWUFBUSxTQUFSO0lBQW1JOzs7SUFIeEc7SUFBQTtJQUFBO0lBQzNCO0lBQUEsWUFBQSxTQUFBO0lBRUE7SUFBQSxZQUFBLFNBQUE7Ozs7b0JDTkY7TUFBQTtzQ0FBQSxVQUFBO01BQUE7SUFBQTs7Ozs7In0=