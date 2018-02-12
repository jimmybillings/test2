import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../wz-design/wz.design.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WzFormComponent } from './wz.form.component';
import { WzCcFormComponent } from './wz.cc.form.component';
import { WzInputTagsComponent } from './components/wz-input-tags/wz-input-tags.component';
import { WzInputSuggestionsComponent } from './components/wz-input-suggestions/wz-input-suggestions.component';
import { WzAutocompleteSearchComponent } from './components/wz-autocomplete-search/wz-autocomplete-search.component';
import { EqualValidatorDirective } from './wz-validators/wz-equal-validator.directive';
import { FormModel } from './wz.form.model';

import { GooglePlacesService } from './services/google-places.service';
import { WzAddressFormComponent } from './components/wz-address-form/wz.address-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    WzAddressFormComponent,
    WzFormComponent,
    WzCcFormComponent,
    WzInputTagsComponent,
    WzInputSuggestionsComponent,
    EqualValidatorDirective,
    WzAutocompleteSearchComponent
  ],
  exports: [
    WzFormComponent,
    WzCcFormComponent,
    WzAutocompleteSearchComponent,
    WzAddressFormComponent,
    WzInputSuggestionsComponent
  ],
  entryComponents: [WzAddressFormComponent],
  providers: [FormModel, GooglePlacesService]
})
export class WzFormModule { }
