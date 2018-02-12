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
import * as i4 from './asset-info.component';
const styles_AssetInfoComponent:any[] = ([] as any[]);
export const RenderType_AssetInfoComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_AssetInfoComponent,data:{}});
function View_AssetInfoComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),7,(null as any),
      (null as any),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n          '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),3,'strong',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['',': '])),
      i0.ɵppd(1),i0.ɵpid(131072,i1.TranslatePipe,[i2.TranslateService,i0.ChangeDetectorRef]),
      (_l()(),i0.ɵted((null as any),[' ','\n        '])),i0.ɵpid(0,i3.SlicePipe,([] as any[]))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = i0.ɵunv(_v,3,0,i0.ɵnov(_v,5).transform(i0.ɵunv(_v,3,
            0,_ck(_v,4,0,i0.ɵnov((<any>(<any>_v.parent).parent),0),_co.translationReady((<any>_v.parent).context.$implicit.name)))));
        _ck(_v,3,0,currVal_0);
        const currVal_1:any = i0.ɵunv(_v,6,0,i0.ɵnov(_v,7).transform((<any>_v.parent).context.$implicit.value,
            0,80));
        _ck(_v,6,0,currVal_1);
      });
}
function View_AssetInfoComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),4,'span',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n        '])),(_l()(),i0.ɵand(16777216,(null as any),
      (null as any),1,(null as any),View_AssetInfoComponent_2)),i0.ɵdid(16384,(null as any),
      0,i3.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i0.ɵted((null as any),['\n      ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.shouldDisplay(_v.context.$implicit);
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
export function View_AssetInfoComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[i0.ɵpid(0,i3.UpperCasePipe,([] as any[])),(_l()(),i0.ɵted((null as any),
      ['\n    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'mat-caption asset-name']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i0.ɵted((null as any),['',''])),(_l()(),i0.ɵted((null as any),
      ['\n    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'p',[['class','asset-description']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i0.ɵted((null as any),['\n      ','\n    '])),i0.ɵpid(0,i3.SlicePipe,([] as any[])),
      (_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          4,'div',[['class','cart-asset-metadata mat-caption']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n      '])),(_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),
          View_AssetInfoComponent_1)),i0.ɵdid(802816,(null as any),0,i3.NgForOf,[i0.ViewContainerRef,
          i0.TemplateRef,i0.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),
      (_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵted((null as any),['\n  ']))],
      (_ck,_v) => {
        var _co:i4.AssetInfoComponent = _v.component;
        const currVal_2:any = _co.asset.metadata;
        _ck(_v,12,0,currVal_2);
      },(_ck,_v) => {
        var _co:i4.AssetInfoComponent = _v.component;
        const currVal_0:any = _co.asset.assetName;
        _ck(_v,3,0,currVal_0);
        const currVal_1:any = i0.ɵunv(_v,6,0,i0.ɵnov(_v,7).transform((_co.asset.metadata? _co.asset.metadata[0].value: ''),
            0,100));
        _ck(_v,6,0,currVal_1);
      });
}
export function View_AssetInfoComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'asset-info-component',
      ([] as any[]),(null as any),(null as any),(null as any),View_AssetInfoComponent_0,
      RenderType_AssetInfoComponent)),i0.ɵdid(49152,(null as any),0,i4.AssetInfoComponent,
      ([] as any[]),(null as any),(null as any))],(null as any),(null as any));
}
export const AssetInfoComponentNgFactory:i0.ComponentFactory<i4.AssetInfoComponent> = i0.ɵccf('asset-info-component',
    i4.AssetInfoComponent,View_AssetInfoComponent_Host_0,{asset:'asset'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2Fzc2V0L2Fzc2V0LWluZm8uY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2Fzc2V0L2Fzc2V0LWluZm8uY29tcG9uZW50LnRzIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvK2NvbW1lcmNlL2NvbXBvbmVudHMvYXNzZXQvYXNzZXQtaW5mby5jb21wb25lbnQudHMuQXNzZXRJbmZvQ29tcG9uZW50Lmh0bWwiLCJuZzovLy9Vc2Vycy9qYW1lc2JpbGxpbmdzL1dhemVlL3dhemVlLXVpL2Rpc3QvdG1wL2FwcC8rY29tbWVyY2UvY29tcG9uZW50cy9hc3NldC9hc3NldC1pbmZvLmNvbXBvbmVudC50cy5Bc3NldEluZm9Db21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCJcbiAgICA8ZGl2IGNsYXNzPVwibWF0LWNhcHRpb24gYXNzZXQtbmFtZVwiPnt7IGFzc2V0LmFzc2V0TmFtZSB9fTwvZGl2PlxuICAgIDxwIGNsYXNzPVwiYXNzZXQtZGVzY3JpcHRpb25cIj5cbiAgICAgIHt7IChhc3NldC5tZXRhZGF0YSA/IGFzc2V0Lm1ldGFkYXRhWzBdLnZhbHVlIDogJycpIHwgc2xpY2U6MDoxMDAgfX1cbiAgICA8L3A+XG4gICAgPGRpdiBjbGFzcz1cImNhcnQtYXNzZXQtbWV0YWRhdGEgbWF0LWNhcHRpb25cIj5cbiAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBtZXRhIG9mIGFzc2V0Lm1ldGFkYXRhXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG91bGREaXNwbGF5KG1ldGEpXCI+XG4gICAgICAgICAgPHN0cm9uZz57eyB0cmFuc2xhdGlvblJlYWR5KG1ldGEubmFtZSkgfCB1cHBlcmNhc2UgfCB0cmFuc2xhdGUgfX06IDwvc3Ryb25nPiB7eyBtZXRhLnZhbHVlIHwgc2xpY2U6MDo4MCB9fVxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgIiwiPGFzc2V0LWluZm8tY29tcG9uZW50PjwvYXNzZXQtaW5mby1jb21wb25lbnQ+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDT1E7TUFBQTtNQUEwQyxpREFDeEM7VUFBQTtVQUFBLDhCQUFRO2FBQUE7TUFBb0U7OztRQUFwRTtZQUFBO1FBQUE7UUFBb0U7WUFBQTtRQUFBOzs7O29CQUZoRjtNQUFBLHdFQUEwQzthQUFBLGdDQUN4QztNQUFBLGlFQUFBO01BQUE7TUFFZTs7SUFGRDtJQUFkLFdBQWMsU0FBZDs7Ozs4REFQUjtNQUFBLGFBQ0k7TUFBQTtNQUFBLGdCQUFvQyx3Q0FBMkI7TUFBQSxhQUMvRDtNQUFBLHdFQUE2QjthQUFBO01BRXpCLDJDQUNKO1VBQUE7VUFBQSw0Q0FBNkM7VUFBQSxlQUMzQztVQUFBLG1DQUFBOzJDQUFBO01BSU8sMkNBQ0g7OztRQUxFO1FBQU4sWUFBTSxTQUFOOzs7UUFMa0M7UUFBQTtRQUNQO1lBQUE7UUFBQTs7OztvQkNGakM7TUFBQTttQ0FBQSxVQUFBO01BQUE7OzsifQ==