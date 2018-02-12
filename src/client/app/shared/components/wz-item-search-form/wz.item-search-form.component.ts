import { Component, ChangeDetectionStrategy, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'wz-item-search-form',
  templateUrl: 'wz.item-search-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzItemSearchFormComponent {
  public itemSearch: FormGroup;
  @Input() currentSearchQuery: any;
  @Input() placeholderTxt: any;
  @Output() query = new EventEmitter();
  @Output() closeSearch = new EventEmitter();

  constructor(
    public fb: FormBuilder) {
    this.setForm();
  }

  public setForm() {
    this.itemSearch = this.fb.group({ q: ['', Validators.required] });
  }

  public onSubmit() {
    this.query.emit(this.itemSearch.value);
  }

  public resetSearch(): void {
    this.itemSearch.controls['q'].reset('');
    this.onSubmit();
  }
}
