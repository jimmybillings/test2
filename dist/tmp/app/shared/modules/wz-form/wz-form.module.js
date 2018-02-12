"use strict";
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
    WzFormModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    WzFormModule.ctorParameters = function () { return []; };
    return WzFormModule;
}());
exports.WzFormModule = WzFormModule;
//# sourceMappingURL=wz-form.module.js.map