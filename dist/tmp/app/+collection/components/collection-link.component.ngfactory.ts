/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i2 from '@angular/material/core';
import * as i3 from '@angular/material/button';
import * as i4 from '@angular/cdk/platform';
import * as i5 from '@angular/cdk/a11y';
import * as i6 from '@angular/material/dialog';
import * as i7 from '../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i8 from '@angular/material/icon';
import * as i9 from '@ngx-translate/core/src/translate.pipe';
import * as i10 from '@ngx-translate/core/src/translate.service';
import * as i11 from './collection-link.component';
import * as i12 from '../../shared/components/wz-clipboard/wz-clipboard.directive';
import * as i13 from '../../app.store';
const styles_CollectionLinkComponent:any[] = ([] as any[]);
export const RenderType_CollectionLinkComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_CollectionLinkComponent,data:{}});
export function View_CollectionLinkComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[(_l()(),i0.ɵeld(0,(null as any),(null as any),48,'div',[['class',
      'wz-dialog wz-legacy-link']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵeld(0,
      (null as any),(null as any),10,'button',[['class','close mat-icon-button'],['mat-dialog-close',
          ''],['mat-icon-button',''],['title','close'],['type','button']],[[8,'disabled',
          0],[1,'aria-label',0]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        if (('click' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,6).dialogRef.close(i0.ɵnov(_v,6).dialogResult)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i1.View_MatButton_0,i1.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
      0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
      (null as any),0,i3.MatButton,[i0.Renderer2,i0.ElementRef,i4.Platform,i5.FocusMonitor],
      (null as any),(null as any)),i0.ɵdid(16384,(null as any),0,i3.MatIconButtonCssMatStyler,
      ([] as any[]),(null as any),(null as any)),i0.ɵdid(540672,(null as any),0,i6.MatDialogClose,
      [i6.MatDialogRef],{dialogResult:[0,'dialogResult']},(null as any)),(_l()(),i0.ɵted(0,
      ['\n      '])),(_l()(),i0.ɵeld(0,(null as any),0,3,'mat-icon',[['class','mat-icon'],
      ['role','img']],(null as any),(null as any),(null as any),i7.View_MatIcon_0,
      i7.RenderType_MatIcon)),i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,([] as any[]),
      (null as any),(null as any)),i0.ɵdid(638976,(null as any),0,i8.MatIcon,[i0.Renderer2,
      i0.ElementRef,i8.MatIconRegistry,[8,(null as any)]],(null as any),(null as any)),
      (_l()(),i0.ɵted(0,['close'])),(_l()(),i0.ɵted(0,['\n    '])),(_l()(),i0.ɵted((null as any),
          ['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),33,'mat-dialog-content',
          [['class','mat-dialog-content']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,
          ([] as any[]),(null as any),(null as any)),i0.ɵdid(16384,(null as any),0,
          i6.MatDialogContent,([] as any[]),(null as any),(null as any)),(_l()(),i0.ɵted((null as any),
          ['\n    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'h1',[['class',
          'dialog-title mat-dialog-title'],['mat-dialog-title','']],[[8,'id',0]],(null as any),
          (null as any),(null as any),(null as any))),i0.ɵdid(81920,(null as any),
          0,i6.MatDialogTitle,[[2,i6.MatDialogContainer]],(null as any),(null as any)),
      (_l()(),i0.ɵted((null as any),['',''])),i0.ɵpid(131072,i9.TranslatePipe,[i10.TranslateService,
          i0.ChangeDetectorRef]),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),2,'p',[['class','dialog-summary']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['',''])),i0.ɵpid(131072,i9.TranslatePipe,[i10.TranslateService,
          i0.ChangeDetectorRef]),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),19,'section',[['class','dd-menu-wrapper']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n      '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),16,'div',[['class','link-wrapper'],['flex','100'],['layout',
              'row']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),0,'input',[['class','link-input'],['flex','100'],['id','legacyLink'],
              ['layout-align','end center']],[[8,'value',0]],[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i11.CollectionLinkComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.selectInputForCopy($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n        '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),11,'button',[['class','clipboard-copy mat-icon-button'],
          ['data-clipboard-target','#legacyLink'],['flex','auto'],['layout-align',
              'end center'],['mat-icon-button',''],['wzClipboard','']],[[8,'title',
          0],[8,'disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i11.CollectionLinkComponent = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.onCopyLegacyLinkButtonClick()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i1.View_MatButton_0,i1.RenderType_MatButton)),i0.ɵdid(16384,(null as any),
          0,i2.MatPrefixRejector,([] as any[]),(null as any),(null as any)),i0.ɵdid(180224,
          (null as any),0,i3.MatButton,[i0.Renderer2,i0.ElementRef,i4.Platform,i5.FocusMonitor],
          (null as any),(null as any)),i0.ɵdid(16384,(null as any),0,i3.MatIconButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),i0.ɵdid(16384,(null as any),0,
          i12.WzClipBoardDirective,[i0.ElementRef],(null as any),(null as any)),i0.ɵpid(131072,
          i9.TranslatePipe,[i10.TranslateService,i0.ChangeDetectorRef]),(_l()(),i0.ɵted(0,
          ['\n          '])),(_l()(),i0.ɵeld(0,(null as any),0,3,'mat-icon',[['class',
          'mat-icon'],['role','img']],(null as any),(null as any),(null as any),i7.View_MatIcon_0,
          i7.RenderType_MatIcon)),i0.ɵdid(16384,(null as any),0,i2.MatPrefixRejector,
          ([] as any[]),(null as any),(null as any)),i0.ɵdid(638976,(null as any),
          0,i8.MatIcon,[i0.Renderer2,i0.ElementRef,i8.MatIconRegistry,[8,(null as any)]],
          (null as any),(null as any)),(_l()(),i0.ɵted(0,['content_copy'])),(_l()(),
          i0.ɵted(0,['\n        '])),(_l()(),i0.ɵted((null as any),['\n      '])),
      (_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵted((null as any),['\n  '])),
      (_l()(),i0.ɵted((null as any),['\n'])),(_l()(),i0.ɵted((null as any),['\n']))],
      (_ck,_v) => {
        const currVal_2:any = '';
        _ck(_v,6,0,currVal_2);
        _ck(_v,10,0);
        _ck(_v,19,0);
        _ck(_v,42,0);
      },(_ck,_v) => {
        var _co:i11.CollectionLinkComponent = _v.component;
        const currVal_0:any = (i0.ɵnov(_v,4).disabled || (null as any));
        const currVal_1:any = i0.ɵnov(_v,6).ariaLabel;
        _ck(_v,2,0,currVal_0,currVal_1);
        const currVal_3:any = i0.ɵnov(_v,19).id;
        _ck(_v,18,0,currVal_3);
        const currVal_4:any = i0.ɵunv(_v,20,0,i0.ɵnov(_v,21).transform('COLLECTION.COPY_LEGACY_LINK'));
        _ck(_v,20,0,currVal_4);
        const currVal_5:any = i0.ɵunv(_v,24,0,i0.ɵnov(_v,25).transform('COLLECTION.COPY_LEGACY_LINK_DESCRIPTION'));
        _ck(_v,24,0,currVal_5);
        const currVal_6:any = i0.ɵinlineInterpolate(1,'',_co.legacyLink,'');
        _ck(_v,31,0,currVal_6);
        const currVal_7:any = i0.ɵinlineInterpolate(1,'',i0.ɵunv(_v,33,0,i0.ɵnov(_v,
            38).transform('COLLECTION.COPY_LEGACY_LINK')),'');
        const currVal_8:any = (i0.ɵnov(_v,35).disabled || (null as any));
        _ck(_v,33,0,currVal_7,currVal_8);
      });
}
export function View_CollectionLinkComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'collection-link-component',
      ([] as any[]),(null as any),(null as any),(null as any),View_CollectionLinkComponent_0,
      RenderType_CollectionLinkComponent)),i0.ɵdid(49152,(null as any),0,i11.CollectionLinkComponent,
      [i13.AppStore],(null as any),(null as any))],(null as any),(null as any));
}
export const CollectionLinkComponentNgFactory:i0.ComponentFactory<i11.CollectionLinkComponent> = i0.ɵccf('collection-link-component',
    i11.CollectionLinkComponent,View_CollectionLinkComponent_Host_0,{assets:'assets'},
    {},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLytjb2xsZWN0aW9uL2NvbXBvbmVudHMvY29sbGVjdGlvbi1saW5rLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9Vc2Vycy9qYW1lc2JpbGxpbmdzL1dhemVlL3dhemVlLXVpL2Rpc3QvdG1wL2FwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tbGluay5jb21wb25lbnQudHMiLCJuZzovLy9Vc2Vycy9qYW1lc2JpbGxpbmdzL1dhemVlL3dhemVlLXVpL2Rpc3QvdG1wL2FwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tbGluay5odG1sIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvK2NvbGxlY3Rpb24vY29tcG9uZW50cy9jb2xsZWN0aW9uLWxpbmsuY29tcG9uZW50LnRzLkNvbGxlY3Rpb25MaW5rQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGRpdiBjbGFzcz1cInd6LWRpYWxvZyB3ei1sZWdhY3ktbGlua1wiPlxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdC1kaWFsb2ctY2xvc2UgdGl0bGU9XCJjbG9zZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCI+XG4gICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICA8bWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDxoMSBtYXQtZGlhbG9nLXRpdGxlIGNsYXNzPVwiZGlhbG9nLXRpdGxlXCI+e3sgJ0NPTExFQ1RJT04uQ09QWV9MRUdBQ1lfTElOSycgfCB0cmFuc2xhdGUgfX08L2gxPlxuICAgIDxwIGNsYXNzPVwiZGlhbG9nLXN1bW1hcnlcIj57eyAnQ09MTEVDVElPTi5DT1BZX0xFR0FDWV9MSU5LX0RFU0NSSVBUSU9OJyB8IHRyYW5zbGF0ZSB9fTwvcD5cbiAgICA8c2VjdGlvbiBjbGFzcz1cImRkLW1lbnUtd3JhcHBlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxpbmstd3JhcHBlclwiIGZsZXg9XCIxMDBcIiBsYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgPGlucHV0IFxuICAgICAgICAgIGlkPVwibGVnYWN5TGlua1wiXG4gICAgICAgICAgY2xhc3M9XCJsaW5rLWlucHV0XCJcbiAgICAgICAgICBmbGV4PVwiMTAwXCJcbiAgICAgICAgICBsYXlvdXQtYWxpZ249XCJlbmQgY2VudGVyXCJcbiAgICAgICAgICB2YWx1ZT1cInt7IGxlZ2FjeUxpbmsgfX1cIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RJbnB1dEZvckNvcHkoJGV2ZW50KVwiIC8+XG4gICAgICAgIDxidXR0b24gXG4gICAgICAgICAgZmxleD1cImF1dG9cIlxuICAgICAgICAgIGxheW91dC1hbGlnbj1cImVuZCBjZW50ZXJcIlxuICAgICAgICAgIHd6Q2xpcGJvYXJkXG4gICAgICAgICAgY2xhc3M9XCJjbGlwYm9hcmQtY29weVwiXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgZGF0YS1jbGlwYm9hcmQtdGFyZ2V0PVwiI2xlZ2FjeUxpbmtcIlxuICAgICAgICAgIHRpdGxlPVwie3sgJ0NPTExFQ1RJT04uQ09QWV9MRUdBQ1lfTElOSycgfCB0cmFuc2xhdGUgfX1cIlxuICAgICAgICAgIChjbGljayk9XCJvbkNvcHlMZWdhY3lMaW5rQnV0dG9uQ2xpY2soKVwiPlxuICAgICAgICAgIDxtYXQtaWNvbj5jb250ZW50X2NvcHk8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG48L2Rpdj5cbiIsIjxjb2xsZWN0aW9uLWxpbmstY29tcG9uZW50PjwvY29sbGVjdGlvbi1saW5rLWNvbXBvbmVudD4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNBQTtNQUFBO01BQUEsZ0JBQXNDLDJDQUNsQztNQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtNQUFBLHVEQUFBO01BQUEseUVBQUE7TUFBQTtNQUFBLG9DQUFBO01BQUEsa0RBQUE7TUFBQSxtRUFBbUY7TUFBQSxlQUNqRjtNQUFBOzJCQUFBLFVBQUE7TUFBQSxvQ0FBQTt1Q0FBQTtNQUFVLDhCQUFnQiwrQkFDbkI7VUFBQSxXQUNYO1VBQUE7VUFBQSxxQ0FBQTtVQUFBLGtEQUFBOzhCQUFBLDJDQUFvQjtVQUFBLGFBQ2xCO1VBQUE7VUFBQSxtREFBQTtVQUFBO01BQTBDOzhCQUFBLEdBQW9ELDJDQUM5RjtpQkFBQTtjQUFBO01BQTBCOzhCQUFBLEdBQStELDJDQUN6RjtpQkFBQTtjQUFBO01BQWlDLDZDQUMvQjtVQUFBO2NBQUE7TUFBa0QsK0NBQ2hEO1VBQUE7Y0FBQTtVQUFBO1lBQUE7WUFBQTtZQU1FO2NBQUE7Y0FBQTtZQUFBO1lBTkY7VUFBQSxnQ0FNeUM7TUFDekM7VUFBQTtjQUFBO1VBQUE7UUFBQTtRQUFBO1FBUUU7VUFBQTtVQUFBO1FBQUE7UUFSRjtNQUFBLHVEQUFBO1VBQUEseUVBQUE7VUFBQTtVQUFBLG9DQUFBO1VBQUEsa0RBQUE7bUNBQUEsb0RBT0U7MkJBQUEsNkNBQ3dDO1VBQUEsbUJBQ3hDO1VBQUE7K0JBQUEsVUFBQTtVQUFBLGtEQUFBO1VBQUE7VUFBQSw2QkFBVSxxQ0FBdUI7aUJBQUEsb0JBQzFCO01BQ0wsMkNBQ0U7TUFDUyx1Q0FDakI7O1FBN0JzQjtRQUF4QixXQUF3QixTQUF4QjtRQUNFO1FBR0Y7UUFvQk07OztRQXhCTjtRQUFBO1FBQUEsV0FBQSxVQUFBLFNBQUE7UUFJQTtRQUFBLFlBQUEsU0FBQTtRQUEwQztRQUFBO1FBQ2hCO1FBQUE7UUFRcEI7UUFMRixZQUtFLFNBTEY7UUFjRTtZQUFBO1FBUEY7UUFBQSxZQU9FLFVBUEYsU0FBQTs7OztvQkNoQlI7TUFBQTt3Q0FBQSxVQUFBO01BQUE7Ozs7In0=
