/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@angular/material/dialog';
import * as i2 from '@ngx-translate/core/src/translate.pipe';
import * as i3 from '@ngx-translate/core/src/translate.service';
import * as i4 from '../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i5 from '@angular/material/core';
import * as i6 from '@angular/material/button';
import * as i7 from '@angular/cdk/platform';
import * as i8 from '@angular/cdk/a11y';
import * as i9 from '../../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i10 from '@angular/material/icon';
import * as i11 from '@angular/common';
import * as i12 from './wz.form-dialog.component';
import * as i13 from '../../wz-form/wz.form.component.ngfactory';
import * as i14 from '../../wz-form/wz.form.component';
import * as i15 from '@angular/forms';
import * as i16 from '../../wz-form/wz.form.model';
const styles_WzFormDialogComponent:any[] = ([] as any[]);
export const RenderType_WzFormDialogComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_WzFormDialogComponent,data:{}});
function View_WzFormDialogComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'h1',[['class',
      'mat-dialog-title'],['mat-dialog-title','']],[[8,'id',0]],(null as any),(null as any),
      (null as any),(null as any))),i0.ɵdid(81920,(null as any),0,i1.MatDialogTitle,
      [[2,i1.MatDialogContainer]],(null as any),(null as any)),(_l()(),i0.ɵted((null as any),
      ['',''])),i0.ɵpid(131072,i2.TranslatePipe,[i3.TranslateService,i0.ChangeDetectorRef])],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = i0.ɵnov(_v,1).id;
        _ck(_v,0,0,currVal_0);
        const currVal_1:any = i0.ɵunv(_v,2,0,i0.ɵnov(_v,3).transform(_co.title));
        _ck(_v,2,0,currVal_1);
      });
}
export function View_WzFormDialogComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵeld(0,(null as any),
      (null as any),25,'div',[['class','wz-dialog']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),
      i0.ɵeld(0,(null as any),(null as any),10,'button',[['class','close mat-icon-button'],
          ['mat-dialog-close',''],['mat-icon-button',''],['title','Close'],['type',
              'button']],[[8,'disabled',0],[1,'aria-label',0]],[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i0.ɵnov(_v,7).dialogRef.close(i0.ɵnov(_v,7).dialogResult)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i4.View_MatButton_0,i4.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
      0,i5.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
      (null as any),0,i6.MatButton,[i0.Renderer2,i0.ElementRef,i7.Platform,i8.FocusMonitor],
      (null as any),(null as any)),i0.ɵdid(16384,(null as any),0,i6.MatIconButtonCssMatStyler,
      ([] as any[]),(null as any),(null as any)),i0.ɵdid(540672,(null as any),0,i1.MatDialogClose,
      [i1.MatDialogRef],{dialogResult:[0,'dialogResult']},(null as any)),(_l()(),i0.ɵted(0,
      ['\n        '])),(_l()(),i0.ɵeld(0,(null as any),0,3,'mat-icon',[['class','mat-icon'],
      ['role','img']],(null as any),(null as any),(null as any),i9.View_MatIcon_0,
      i9.RenderType_MatIcon)),i0.ɵdid(16384,(null as any),0,i5.MatPrefixRejector,([] as any[]),
      (null as any),(null as any)),i0.ɵdid(638976,(null as any),0,i10.MatIcon,[i0.Renderer2,
      i0.ElementRef,i10.MatIconRegistry,[8,(null as any)]],(null as any),(null as any)),
      (_l()(),i0.ɵted(0,['close'])),(_l()(),i0.ɵted(0,['\n      '])),(_l()(),i0.ɵted((null as any),
          ['\n      '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
          View_WzFormDialogComponent_1)),i0.ɵdid(16384,(null as any),0,i11.NgIf,[i0.ViewContainerRef,
          i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),
          ['\n      '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),7,'mat-dialog-content',
          [['class','mat-dialog-content'],['layout','row']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),i0.ɵdid(16384,(null as any),
          0,i5.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(16384,
          (null as any),0,i1.MatDialogContent,([] as any[]),(null as any),(null as any)),
      (_l()(),i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),2,'wz-form',([] as any[]),(null as any),[[(null as any),'formCancel'],
              [(null as any),'formSubmit']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i12.WzFormDialogComponent = _v.component;
            if (('formCancel' === en)) {
              const pd_0:any = ((<any>_co.onFormCancel()) !== false);
              ad = (pd_0 && ad);
            }
            if (('formSubmit' === en)) {
              const pd_1:any = ((<any>_co.onFormSubmit($event)) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i13.View_WzFormComponent_0,i13.RenderType_WzFormComponent)),i0.ɵdid(638976,
          (null as any),0,i14.WzFormComponent,[i15.FormBuilder,i16.FormModel,i0.ElementRef],
          {items:[0,'items'],submitLabel:[1,'submitLabel'],includeCancel:[2,'includeCancel'],
              cancelLabel:[3,'cancelLabel'],autocomplete:[4,'autocomplete']},{formSubmit:'formSubmit',
              formCancel:'formCancel'}),(_l()(),i0.ɵted((null as any),['\n        '])),
      (_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵted((null as any),['\n    '])),
      (_l()(),i0.ɵted((null as any),['\n  ']))],(_ck,_v) => {
    var _co:i12.WzFormDialogComponent = _v.component;
    const currVal_2:any = '';
    _ck(_v,7,0,currVal_2);
    _ck(_v,11,0);
    const currVal_3:any = _co.title;
    _ck(_v,16,0,currVal_3);
    const currVal_4:any = _co.formItems;
    const currVal_5:any = _co.submitLabel;
    const currVal_6:any = _co.displayCancelButton;
    const currVal_7:any = _co.cancelLabel;
    const currVal_8:any = _co.autocomplete;
    _ck(_v,23,0,currVal_4,currVal_5,currVal_6,currVal_7,currVal_8);
  },(_ck,_v) => {
    const currVal_0:any = (i0.ɵnov(_v,5).disabled || (null as any));
    const currVal_1:any = i0.ɵnov(_v,7).ariaLabel;
    _ck(_v,3,0,currVal_0,currVal_1);
  });
}
export function View_WzFormDialogComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wz-form-dialog',
      ([] as any[]),(null as any),(null as any),(null as any),View_WzFormDialogComponent_0,
      RenderType_WzFormDialogComponent)),i0.ɵdid(49152,(null as any),0,i12.WzFormDialogComponent,
      ([] as any[]),(null as any),(null as any))],(null as any),(null as any));
}
export const WzFormDialogComponentNgFactory:i0.ComponentFactory<i12.WzFormDialogComponent> = i0.ɵccf('wz-form-dialog',
    i12.WzFormDialogComponent,View_WzFormDialogComponent_Host_0,{formItems:'formItems',
        title:'title',displayCancelButton:'displayCancelButton',cancelLabel:'cancelLabel',
        submitLabel:'submitLabel',autocomplete:'autocomplete'},{cancel:'cancel',submit:'submit'},
    ([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy9jb21wb25lbnRzL3d6LmZvcm0tZGlhbG9nLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9Vc2Vycy9qYW1lc2JpbGxpbmdzL1dhemVlL3dhemVlLXVpL2Rpc3QvdG1wL2FwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvY29tcG9uZW50cy93ei5mb3JtLWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovLy9Vc2Vycy9qYW1lc2JpbGxpbmdzL1dhemVlL3dhemVlLXVpL2Rpc3QvdG1wL2FwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvY29tcG9uZW50cy93ei5mb3JtLWRpYWxvZy5jb21wb25lbnQudHMuV3pGb3JtRGlhbG9nQ29tcG9uZW50Lmh0bWwiLCJuZzovLy9Vc2Vycy9qYW1lc2JpbGxpbmdzL1dhemVlL3dhemVlLXVpL2Rpc3QvdG1wL2FwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvY29tcG9uZW50cy93ei5mb3JtLWRpYWxvZy5jb21wb25lbnQudHMuV3pGb3JtRGlhbG9nQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiXG4gICAgPGRpdiBjbGFzcz1cInd6LWRpYWxvZ1wiPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0LWRpYWxvZy1jbG9zZSB0aXRsZT1cIkNsb3NlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIj5cbiAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGgxICpuZ0lmPVwidGl0bGVcIiBtYXQtZGlhbG9nLXRpdGxlPnt7IHRpdGxlIHwgdHJhbnNsYXRlIH19PC9oMT5cbiAgICAgIDxtYXQtZGlhbG9nLWNvbnRlbnQgbGF5b3V0PVwicm93XCI+XG4gICAgICAgIDx3ei1mb3JtXG4gICAgICAgICAgW2l0ZW1zXT1cImZvcm1JdGVtc1wiXG4gICAgICAgICAgW2luY2x1ZGVDYW5jZWxdPVwiZGlzcGxheUNhbmNlbEJ1dHRvblwiXG4gICAgICAgICAgW2NhbmNlbExhYmVsXT1cImNhbmNlbExhYmVsXCJcbiAgICAgICAgICBbc3VibWl0TGFiZWxdPVwic3VibWl0TGFiZWxcIlxuICAgICAgICAgIFthdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAoZm9ybUNhbmNlbCk9XCJvbkZvcm1DYW5jZWwoKVwiXG4gICAgICAgICAgKGZvcm1TdWJtaXQpPVwib25Gb3JtU3VibWl0KCRldmVudClcIj5cbiAgICAgICAgPC93ei1mb3JtPlxuICAgICAgPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICIsIjx3ei1mb3JtLWRpYWxvZz48L3d6LWZvcm0tZGlhbG9nPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ0tNO01BQUE7TUFBQSxxQ0FBQTtNQUFBLHlEQUFtQztNQUFBOztRQUFuQzs7O1FBQUE7UUFBQSxXQUFBLFNBQUE7UUFBbUM7UUFBQTs7OztvQkFMekMsMkNBQ0k7TUFBQTtNQUFBLDhCQUF1Qiw2Q0FDckI7YUFBQTtVQUFBO2NBQUE7VUFBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBLHVEQUFBO01BQUEseUVBQUE7TUFBQTtNQUFBLG9DQUFBO01BQUEsa0RBQUE7TUFBQSxtRUFBbUY7TUFBQSxpQkFDakY7TUFBQTsyQkFBQSxVQUFBO01BQUEsb0NBQUE7d0NBQUE7TUFBVSw4QkFBZ0IsaUNBQ25CO1VBQUEsZUFDVDtVQUFBLHNDQUFBO3dCQUFBLG1DQUErRDtVQUFBLGVBQy9EO1VBQUE7VUFBQSxtREFBQTtVQUFBLHlFQUFBO1VBQUE7TUFBaUMsK0NBQy9CO1VBQUE7Y0FBQTtZQUFBO1lBQUE7WUFNRTtjQUFBO2NBQUE7WUFBQTtZQUNBO2NBQUE7Y0FBQTtZQUFBO1lBUEY7VUFBQSxxRUFBQTtVQUFBO1VBQUE7Y0FBQTtjQUFBLDBCQU9zQztNQUM1Qiw2Q0FDUztNQUNqQjs7SUFmb0I7SUFBeEIsV0FBd0IsU0FBeEI7SUFDRTtJQUVFO0lBQUosWUFBSSxTQUFKO0lBR0k7SUFHQTtJQUZBO0lBQ0E7SUFFQTtJQUxGLFlBQ0UsVUFHQSxVQUZBLFVBQ0EsVUFFQSxTQUxGOztJQUxGO0lBQUE7SUFBQSxXQUFBLFVBQUEsU0FBQTs7OztvQkNGTjtNQUFBO3NDQUFBLFVBQUE7TUFBQTs7Ozs7OyJ9