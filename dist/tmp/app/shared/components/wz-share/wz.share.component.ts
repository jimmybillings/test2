import {
  Component, Input, Output, ViewChild, OnDestroy, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FormFields } from '../../interfaces/forms.interface';
import { WzFormComponent } from '../../modules/wz-form/wz.form.component';
import { Pojo } from '../../interfaces/common.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-share',
  templateUrl: 'wz.share.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzShareComponent implements OnDestroy {
  @Input() titleKey: string;
  @Input() formFields: FormFields[];
  @Input() allowShareLink: boolean = true;
  @Input() shareLink: string;

  @Output() shareLinkRequest: EventEmitter<void> = new EventEmitter();
  @Output() closeRequest: EventEmitter<void> = new EventEmitter();
  @Output() formSubmit: EventEmitter<Pojo> = new EventEmitter();

  @ViewChild(WzFormComponent) public wzForm: WzFormComponent;
  public shareLinkIsOpen: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef) { }

  public ngOnDestroy(): void {
    this.close();
  }

  public openShareLink(): void {
    this.shareLinkRequest.emit();
    this.shareLinkIsOpen = true;
  }

  public onShareLinkCloseRequest() {
    this.shareLinkIsOpen = false;
  }

  public onFormSubmit(shareParameters: Pojo): void {
    this.formSubmit.emit(shareParameters);
    this.close();
  }

  public onFormCancel(): void {
    this.close();
  }

  private close(): void {
    this.wzForm.resetForm();
    this.closeRequest.emit();
  }
}
