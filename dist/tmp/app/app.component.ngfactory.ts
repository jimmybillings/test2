/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from './application/collection-tray/collection-tray.component.ngfactory';
import * as i2 from './application/collection-tray/collection-tray.component';
import * as i3 from './shared/modules/wz-dialog/services/wz.dialog.service';
import * as i4 from './app.store';
import * as i5 from './shared/modules/wz-form/components/wz-autocomplete-search/wz-autocomplete-search.component.ngfactory';
import * as i6 from './shared/modules/wz-form/components/wz-autocomplete-search/wz-autocomplete-search.component';
import * as i7 from '@angular/forms';
import * as i8 from '@angular/common';
import * as i9 from './application/app-loading-indicator/app-loading-indicator.component.ngfactory';
import * as i10 from './application/app-loading-indicator/app-loading-indicator.component';
import * as i11 from './app.component';
import * as i12 from './application/app-nav/app-nav.component.ngfactory';
import * as i13 from './application/app-nav/app-nav.component';
import * as i14 from '@angular/router';
import * as i15 from './application/footer/footer.component.ngfactory';
import * as i16 from './application/footer/footer.component';
import * as i17 from './shared/services/search-context.service';
import * as i18 from './shared/services/current-user.service';
import * as i19 from './shared/services/collections.service';
import * as i20 from './shared/services/user-preference.service';
import * as i21 from './shared/services/capabilities.service';
import * as i22 from './shared/services/window-ref.service';
import * as i23 from './shared/services/filter.service';
import * as i24 from './shared/services/sort-definitions.service';
import * as i25 from './shared/services/authentication.data.service';
const styles_AppComponent:any[] = ([] as any[]);
export const RenderType_AppComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,styles:styles_AppComponent,
    data:{}});
function View_AppComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'collection-tray',
      ([] as any[]),(null as any),(null as any),(null as any),i1.View_CollectionTrayComponent_0,
      i1.RenderType_CollectionTrayComponent)),i0.ɵdid(245760,(null as any),0,i2.CollectionTrayComponent,
      [i3.WzDialogService,i4.AppStore,i0.ChangeDetectorRef],{userPreference:[0,'userPreference'],
          urlPath:[1,'urlPath']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.userPreference;
        const currVal_1:any = _co.state;
        _ck(_v,1,0,currVal_0,currVal_1);
      },(null as any));
}
function View_AppComponent_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'wz-autocomplete-search',
      ([] as any[]),(null as any),[[(null as any),'searchContext'],[(null as any),
          'toggleFilterTree']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('searchContext' === en)) {
          const pd_0:any = ((<any>_co.newSearchContext($event)) !== false);
          ad = (pd_0 && ad);
        }
        if (('toggleFilterTree' === en)) {
          const pd_1:any = ((<any>_co.toggleFilterTreePreference()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },i5.View_WzAutocompleteSearchComponent_0,i5.RenderType_WzAutocompleteSearchComponent)),
      i0.ɵdid(49152,(null as any),0,i6.WzAutocompleteSearchComponent,[i7.FormBuilder,
          i4.AppStore],{config:[0,'config'],currentUser:[1,'currentUser'],userPreference:[2,
          'userPreference'],state:[3,'state']},{searchContext:'searchContext',toggleFilterTree:'toggleFilterTree'}),
      i0.ɵpid(131072,i8.AsyncPipe,[i0.ChangeDetectorRef]),(_l()(),i0.ɵted((null as any),
          ['\n    ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i0.ɵunv(_v,1,0,i0.ɵnov(_v,2).transform(_co.searchBoxConfig));
    const currVal_1:any = _co.currentUser;
    const currVal_2:any = _co.userPreference;
    const currVal_3:any = _co.state;
    _ck(_v,1,0,currVal_0,currVal_1,currVal_2,currVal_3);
  },(null as any));
}
export function View_AppComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[(_l()(),i0.ɵeld(0,(null as any),(null as any),39,'div',[['class',
      'app']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          1,'app-loading-indicator',([] as any[]),(null as any),(null as any),(null as any),
          i9.View_AppLoadingIndicatorComponent_0,i9.RenderType_AppLoadingIndicatorComponent)),
      i0.ɵdid(49152,(null as any),0,i10.AppLoadingIndicatorComponent,[i4.AppStore],
          (null as any),(null as any)),(_l()(),i0.ɵted((null as any),['\n  '])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),19,'header',[['class','app-header']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      i0.ɵdid(278528,(null as any),0,i8.NgClass,[i0.IterableDiffers,i0.KeyValueDiffers,
          i0.ElementRef,i0.Renderer],{klass:[0,'klass'],ngClass:[1,'ngClass']},(null as any)),
      i0.ɵpid(131072,i8.AsyncPipe,[i0.ChangeDetectorRef]),i0.ɵpid(131072,i8.AsyncPipe,
          [i0.ChangeDetectorRef]),i0.ɵpid(131072,i8.AsyncPipe,[i0.ChangeDetectorRef]),
      i0.ɵpod({'fixed':0,'collection-tray-closed':1,'search-closed':2}),(_l()(),i0.ɵted((null as any),
          ['\n    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),4,'app-nav',([] as any[]),
          (null as any),[[(null as any),'onLogOut']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i11.AppComponent = _v.component;
            if (('onLogOut' === en)) {
              const pd_0:any = ((<any>_co.logout()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i12.View_AppNavComponent_0,i12.RenderType_AppNavComponent)),i0.ɵdid(49152,
          (null as any),0,i13.AppNavComponent,[i4.AppStore,i14.Router],{currentUser:[0,
              'currentUser'],config:[1,'config'],userPreference:[2,'userPreference'],
              cartSize:[3,'cartSize'],userCan:[4,'userCan']},{onLogOut:'onLogOut'}),
      i0.ɵpid(131072,i8.AsyncPipe,[i0.ChangeDetectorRef]),i0.ɵpid(131072,i8.AsyncPipe,
          [i0.ChangeDetectorRef]),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),
          i0.ɵted((null as any),['\n    '])),(_l()(),i0.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_AppComponent_1)),i0.ɵdid(16384,(null as any),
          0,i8.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i0.ɵted((null as any),['\n     '])),(_l()(),i0.ɵand(16777216,(null as any),
          (null as any),2,(null as any),View_AppComponent_2)),i0.ɵdid(16384,(null as any),
          0,i8.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      i0.ɵpid(131072,i8.AsyncPipe,[i0.ChangeDetectorRef]),(_l()(),i0.ɵted((null as any),
          ['\n  '])),(_l()(),i0.ɵted((null as any),['\n  '])),(_l()(),i0.ɵeld(0,(null as any),
          (null as any),8,'div',[['class','main-content']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),i0.ɵdid(278528,(null as any),
          0,i8.NgClass,[i0.IterableDiffers,i0.KeyValueDiffers,i0.ElementRef,i0.Renderer],
          {klass:[0,'klass'],ngClass:[1,'ngClass']},(null as any)),i0.ɵpid(131072,
          i8.AsyncPipe,[i0.ChangeDetectorRef]),i0.ɵpid(131072,i8.AsyncPipe,[i0.ChangeDetectorRef]),
      i0.ɵpod({'collection-tray-closed':0,'search-closed':1}),(_l()(),i0.ɵted((null as any),
          ['\n    '])),(_l()(),i0.ɵeld(16777216,(null as any),(null as any),1,'router-outlet',
          ([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
      i0.ɵdid(212992,(null as any),0,i14.RouterOutlet,[i14.ChildrenOutletContexts,
          i0.ViewContainerRef,i0.ComponentFactoryResolver,[8,(null as any)],i0.ChangeDetectorRef],
          (null as any),(null as any)),(_l()(),i0.ɵted((null as any),['\n  '])),(_l()(),
          i0.ɵted((null as any),['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          2,'app-footer',([] as any[]),(null as any),(null as any),(null as any),i15.View_FooterComponent_0,
          i15.RenderType_FooterComponent)),i0.ɵdid(49152,(null as any),0,i16.FooterComponent,
          ([] as any[]),{config:[0,'config']},(null as any)),i0.ɵpid(131072,i8.AsyncPipe,
          [i0.ChangeDetectorRef]),(_l()(),i0.ɵted((null as any),['\n'])),(_l()(),i0.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i11.AppComponent = _v.component;
    const currVal_0:any = 'app-header';
    const currVal_1:any = _ck(_v,10,0,i0.ɵunv(_v,6,1,i0.ɵnov(_v,7).transform(_co.headerIsFixed)),
        !i0.ɵunv(_v,6,1,i0.ɵnov(_v,8).transform(_co.userPreference.data)).collectionTrayIsOpen,
        !i0.ɵunv(_v,6,1,i0.ɵnov(_v,9).transform(_co.userPreference.data)).searchIsOpen);
    _ck(_v,6,0,currVal_0,currVal_1);
    const currVal_2:any = _co.currentUser;
    const currVal_3:any = i0.ɵunv(_v,13,1,i0.ɵnov(_v,14).transform(_co.headerConfig));
    const currVal_4:any = _co.userPreference;
    const currVal_5:any = i0.ɵunv(_v,13,3,i0.ɵnov(_v,15).transform(_co.cartCount));
    const currVal_6:any = _co.userCan;
    _ck(_v,13,0,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6);
    const currVal_7:any = _co.userCan.viewCollectionTray();
    _ck(_v,19,0,currVal_7);
    const currVal_8:any = i0.ɵunv(_v,22,0,i0.ɵnov(_v,23).transform(_co.headerCanBeFixed));
    _ck(_v,22,0,currVal_8);
    const currVal_9:any = 'main-content';
    const currVal_10:any = _ck(_v,30,0,!i0.ɵunv(_v,27,1,i0.ɵnov(_v,28).transform(_co.userPreference.data)).collectionTrayIsOpen,
        !i0.ɵunv(_v,27,1,i0.ɵnov(_v,29).transform(_co.userPreference.data)).searchIsOpen);
    _ck(_v,27,0,currVal_9,currVal_10);
    _ck(_v,33,0);
    const currVal_11:any = i0.ɵunv(_v,37,0,i0.ɵnov(_v,38).transform(_co.footerConfig));
    _ck(_v,37,0,currVal_11);
  },(null as any));
}
export function View_AppComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'wazee-digital-platform',
      ([] as any[]),(null as any),(null as any),(null as any),View_AppComponent_0,
      RenderType_AppComponent)),i0.ɵdid(114688,(null as any),0,i11.AppComponent,[i14.Router,
      i17.SearchContext,i18.CurrentUserService,i19.CollectionsService,i20.UserPreferenceService,
      i21.Capabilities,i22.WindowRef,i23.FilterService,i24.SortDefinitionsService,
      i0.NgZone,i4.AppStore,i14.ActivatedRoute,i25.Authentication],(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(null as any));
}
export const AppComponentNgFactory:i0.ComponentFactory<i11.AppComponent> = i0.ɵccf('wazee-digital-platform',
    i11.AppComponent,View_AppComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL2FwcC5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvYXBwLmNvbXBvbmVudC50cyIsIm5nOi8vL1VzZXJzL2phbWVzYmlsbGluZ3MvV2F6ZWUvd2F6ZWUtdWkvZGlzdC90bXAvYXBwL2FwcC5odG1sIiwibmc6Ly8vVXNlcnMvamFtZXNiaWxsaW5ncy9XYXplZS93YXplZS11aS9kaXN0L3RtcC9hcHAvYXBwLmNvbXBvbmVudC50cy5BcHBDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwiYXBwXCI+XG4gIDxhcHAtbG9hZGluZy1pbmRpY2F0b3I+PC9hcHAtbG9hZGluZy1pbmRpY2F0b3I+XG4gIDxoZWFkZXIgW25nQ2xhc3NdPVwie1xuICAgICdmaXhlZCc6IGhlYWRlcklzRml4ZWQgfCBhc3luYyxcbiAgICAnY29sbGVjdGlvbi10cmF5LWNsb3NlZCc6ICEodXNlclByZWZlcmVuY2UuZGF0YSB8IGFzeW5jKS5jb2xsZWN0aW9uVHJheUlzT3BlbixcbiAgICAnc2VhcmNoLWNsb3NlZCc6ICEodXNlclByZWZlcmVuY2UuZGF0YSB8IGFzeW5jKS5zZWFyY2hJc09wZW5cbiAgICB9XCIgY2xhc3M9XCJhcHAtaGVhZGVyXCI+XG4gICAgPGFwcC1uYXZcbiAgICAgIFtjdXJyZW50VXNlcl09XCJjdXJyZW50VXNlclwiXG4gICAgICBbdXNlclByZWZlcmVuY2VdPVwidXNlclByZWZlcmVuY2VcIlxuICAgICAgW2NvbmZpZ109XCJoZWFkZXJDb25maWcgfCBhc3luY1wiXG4gICAgICBbdXNlckNhbl09XCJ1c2VyQ2FuXCJcbiAgICAgIFtjYXJ0U2l6ZV09XCJjYXJ0Q291bnQgfCBhc3luY1wiXG4gICAgICAob25Mb2dPdXQpPVwibG9nb3V0KClcIj5cbiAgICA8L2FwcC1uYXY+XG4gICAgPGNvbGxlY3Rpb24tdHJheVxuICAgICAgKm5nSWY9XCJ1c2VyQ2FuLnZpZXdDb2xsZWN0aW9uVHJheSgpXCJcbiAgICAgIFt1c2VyUHJlZmVyZW5jZV09XCJ1c2VyUHJlZmVyZW5jZVwiXG4gICAgICBbdXJsUGF0aF09XCJzdGF0ZVwiPlxuICAgIDwvY29sbGVjdGlvbi10cmF5PlxuICAgICA8d3otYXV0b2NvbXBsZXRlLXNlYXJjaFxuICAgICAgKm5nSWY9XCJoZWFkZXJDYW5CZUZpeGVkIHwgYXN5bmNcIlxuICAgICAgW2N1cnJlbnRVc2VyXT1cImN1cnJlbnRVc2VyXCJcbiAgICAgIFt1c2VyUHJlZmVyZW5jZV09XCJ1c2VyUHJlZmVyZW5jZVwiXG4gICAgICBbc3RhdGVdPVwic3RhdGVcIlxuICAgICAgW2NvbmZpZ109XCJzZWFyY2hCb3hDb25maWcgfCBhc3luY1wiXG4gICAgICAoc2VhcmNoQ29udGV4dCk9XCJuZXdTZWFyY2hDb250ZXh0KCRldmVudClcIlxuICAgICAgKHRvZ2dsZUZpbHRlclRyZWUpPVwidG9nZ2xlRmlsdGVyVHJlZVByZWZlcmVuY2UoKVwiPlxuICAgIDwvd3otYXV0b2NvbXBsZXRlLXNlYXJjaD5cbiAgPC9oZWFkZXI+XG4gIDxkaXYgW25nQ2xhc3NdPVwie1xuICAgICdjb2xsZWN0aW9uLXRyYXktY2xvc2VkJzogISh1c2VyUHJlZmVyZW5jZS5kYXRhIHwgYXN5bmMpLmNvbGxlY3Rpb25UcmF5SXNPcGVuLFxuICAgICdzZWFyY2gtY2xvc2VkJzogISh1c2VyUHJlZmVyZW5jZS5kYXRhIHwgYXN5bmMpLnNlYXJjaElzT3BlblxuICAgIH1cIiBjbGFzcz1cIm1haW4tY29udGVudFwiPlxuICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgPC9kaXY+XG4gIDxhcHAtZm9vdGVyIFtjb25maWddPVwiZm9vdGVyQ29uZmlnIHwgYXN5bmNcIj48L2FwcC1mb290ZXI+XG48L2Rpdj5cbiIsIjx3YXplZS1kaWdpdGFsLXBsYXRmb3JtPjwvd2F6ZWUtZGlnaXRhbC1wbGF0Zm9ybT4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNlSTtNQUFBOzJDQUFBLFVBQUE7TUFBQTtVQUFBLHNDQUdvQjs7O1FBRGxCO1FBQ0E7UUFIRixXQUVFLFVBQ0EsU0FIRjs7OztvQkFLQztNQUFBO1VBQUE7UUFBQTtRQUFBO1FBTUM7VUFBQTtVQUFBO1FBQUE7UUFDQTtVQUFBO1VBQUE7UUFBQTtRQVBEO01BQUE7YUFBQTtxQkFBQTtVQUFBO2FBS0MsNkNBRWtEO1VBQUE7O0lBRmxEO0lBSEE7SUFDQTtJQUNBO0lBSkQsV0FLQyxVQUhBLFVBQ0EsVUFDQSxTQUpEOzs7O29CQXBCTDtNQUFBO01BQWlCLHlDQUNmO1VBQUE7MkZBQUE7YUFBQTtVQUFBLDZCQUErQyx5Q0FDL0M7aUJBQUE7Y0FBQTthQUFBO21DQUFBO2FBQVE7VUFBQTthQUFBLDJEQUlnQjtVQUFBLGFBQ3RCO1VBQUE7WUFBQTtZQUFBO1lBTUU7Y0FBQTtjQUFBO1lBQUE7WUFORjtVQUFBLHFFQUFBO1VBQUE7Y0FBQTtjQUFBO2FBR0Usb0RBRUE7VUFBQSx3QkFDc0IsMkNBQ2Q7aUJBQUEsNEJBQ1Y7VUFBQSwyREFBQTtVQUFBO01BSWtCLDRDQUNqQjtVQUFBLDJEQUFBO1VBQUE7YUFDQyw2Q0FPdUI7VUFBQSxXQUNsQix5Q0FDVDtVQUFBO1VBQUEsbURBQUE7VUFBQTtVQUFBLGdFQUFLO3VCQUFBO2FBQUEsaURBR3FCO1VBQUEsYUFDeEI7VUFBQTthQUFBOzBEQUFBO1VBQUEsNkJBQStCLHlDQUMzQjtpQkFBQSwwQkFDTjtVQUFBO3dDQUFBLFVBQUE7VUFBQSwwREFBWTtVQUFBLHdCQUE2Qyx1Q0FDckQ7VUFBQTs7SUEvQkM7SUFKRztRQUFBO1FBQUE7SUFBUixXQUlLLFVBSkcsU0FBUjtJQU1JO0lBRUE7SUFEQTtJQUdBO0lBREE7SUFKRixZQUNFLFVBRUEsVUFEQSxVQUdBLFVBREEsU0FKRjtJQVNFO0lBREYsWUFDRSxTQURGO0lBTUU7SUFERCxZQUNDLFNBREQ7SUFhRTtJQUhBO1FBQUE7SUFBTCxZQUdLLFVBSEEsVUFBTDtJQUlFO0lBRVU7SUFBWixZQUFZLFVBQVo7Ozs7b0JDcENGO01BQUE7NkJBQUEsVUFBQTs7O2lFQUFBOztRQUFBOzs7OyJ9
