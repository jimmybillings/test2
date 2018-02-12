"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var wz_design_module_1 = require("../wz-design/wz.design.module");
var core_2 = require("@ngx-translate/core");
var forms_1 = require("@angular/forms");
var wz_form_component_1 = require("./wz.form.component");
var wz_cc_form_component_1 = require("./wz.cc.form.component");
var wz_input_tags_component_1 = require("./components/wz-input-tags/wz-input-tags.component");
var wz_input_suggestions_component_1 = require("./components/wz-input-suggestions/wz-input-suggestions.component");
var wz_autocomplete_search_component_1 = require("./components/wz-autocomplete-search/wz-autocomplete-search.component");
var wz_equal_validator_directive_1 = require("./wz-validators/wz-equal-validator.directive");
var wz_form_model_1 = require("./wz.form.model");
var google_places_service_1 = require("./services/google-places.service");
var wz_address_form_component_1 = require("./components/wz-address-form/wz.address-form.component");
var WzFormModule = (function () {
    function WzFormModule() {
    }
    WzFormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                wz_design_module_1.MaterialModule,
                core_2.TranslateModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                wz_address_form_component_1.WzAddressFormComponent,
                wz_form_component_1.WzFormComponent,
                wz_cc_form_component_1.WzCcFormComponent,
                wz_input_tags_component_1.WzInputTagsComponent,
                wz_input_suggestions_component_1.WzInputSuggestionsComponent,
                wz_equal_validator_directive_1.EqualValidatorDirective,
                wz_autocomplete_search_component_1.WzAutocompleteSearchComponent
            ],
            exports: [
                wz_form_component_1.WzFormComponent,
                wz_cc_form_component_1.WzCcFormComponent,
                wz_autocomplete_search_component_1.WzAutocompleteSearchComponent,
                wz_address_form_component_1.WzAddressFormComponent,
                wz_input_suggestions_component_1.WzInputSuggestionsComponent
            ],
            entryComponents: [wz_address_form_component_1.WzAddressFormComponent],
            providers: [wz_form_model_1.FormModel, google_places_service_1.GooglePlacesService]
        })
    ], WzFormModule);
    return WzFormModule;
}());
exports.WzFormModule = WzFormModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLDBDQUErQztBQUMvQyxrRUFBK0Q7QUFDL0QsNENBQXNEO0FBQ3RELHdDQUFrRTtBQUVsRSx5REFBc0Q7QUFDdEQsK0RBQTJEO0FBQzNELDhGQUEwRjtBQUMxRixtSEFBK0c7QUFDL0cseUhBQXFIO0FBQ3JILDZGQUF1RjtBQUN2RixpREFBNEM7QUFFNUMsMEVBQXVFO0FBQ3ZFLG9HQUFnRztBQTZCaEc7SUFBQTtJQUE0QixDQUFDO0lBQWhCLFlBQVk7UUEzQnhCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxxQkFBWTtnQkFDWixpQ0FBYztnQkFDZCxzQkFBZTtnQkFDZixtQkFBVztnQkFDWCwyQkFBbUI7YUFDcEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osa0RBQXNCO2dCQUN0QixtQ0FBZTtnQkFDZix3Q0FBaUI7Z0JBQ2pCLDhDQUFvQjtnQkFDcEIsNERBQTJCO2dCQUMzQixzREFBdUI7Z0JBQ3ZCLGdFQUE2QjthQUM5QjtZQUNELE9BQU8sRUFBRTtnQkFDUCxtQ0FBZTtnQkFDZix3Q0FBaUI7Z0JBQ2pCLGdFQUE2QjtnQkFDN0Isa0RBQXNCO2dCQUN0Qiw0REFBMkI7YUFDNUI7WUFDRCxlQUFlLEVBQUUsQ0FBQyxrREFBc0IsQ0FBQztZQUN6QyxTQUFTLEVBQUUsQ0FBQyx5QkFBUyxFQUFFLDJDQUFtQixDQUFDO1NBQzVDLENBQUM7T0FDVyxZQUFZLENBQUk7SUFBRCxtQkFBQztDQUE3QixBQUE2QixJQUFBO0FBQWhCLG9DQUFZIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LWZvcm0ubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4uL3d6LWRlc2lnbi93ei5kZXNpZ24ubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFd6Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vd3ouZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pDY0Zvcm1Db21wb25lbnQgfSBmcm9tICcuL3d6LmNjLmZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IFd6SW5wdXRUYWdzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LWlucHV0LXRhZ3Mvd3otaW5wdXQtdGFncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pJbnB1dFN1Z2dlc3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3d6LWlucHV0LXN1Z2dlc3Rpb25zL3d6LWlucHV0LXN1Z2dlc3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXekF1dG9jb21wbGV0ZVNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei1hdXRvY29tcGxldGUtc2VhcmNoL3d6LWF1dG9jb21wbGV0ZS1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IEVxdWFsVmFsaWRhdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi93ei12YWxpZGF0b3JzL3d6LWVxdWFsLXZhbGlkYXRvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRm9ybU1vZGVsIH0gZnJvbSAnLi93ei5mb3JtLm1vZGVsJztcblxuaW1wb3J0IHsgR29vZ2xlUGxhY2VzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ29vZ2xlLXBsYWNlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFd6QWRkcmVzc0Zvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3otYWRkcmVzcy1mb3JtL3d6LmFkZHJlc3MtZm9ybS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBXekFkZHJlc3NGb3JtQ29tcG9uZW50LFxuICAgIFd6Rm9ybUNvbXBvbmVudCxcbiAgICBXekNjRm9ybUNvbXBvbmVudCxcbiAgICBXeklucHV0VGFnc0NvbXBvbmVudCxcbiAgICBXeklucHV0U3VnZ2VzdGlvbnNDb21wb25lbnQsXG4gICAgRXF1YWxWYWxpZGF0b3JEaXJlY3RpdmUsXG4gICAgV3pBdXRvY29tcGxldGVTZWFyY2hDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFd6Rm9ybUNvbXBvbmVudCxcbiAgICBXekNjRm9ybUNvbXBvbmVudCxcbiAgICBXekF1dG9jb21wbGV0ZVNlYXJjaENvbXBvbmVudCxcbiAgICBXekFkZHJlc3NGb3JtQ29tcG9uZW50LFxuICAgIFd6SW5wdXRTdWdnZXN0aW9uc0NvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtXekFkZHJlc3NGb3JtQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbRm9ybU1vZGVsLCBHb29nbGVQbGFjZXNTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBXekZvcm1Nb2R1bGUgeyB9XG4iXX0=
