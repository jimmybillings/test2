import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Response } from '@angular/http';
import { UserService } from '../../shared/services/user.service';
import { AppStore } from '../../app.store';
import { ServerErrors } from '../../shared/interfaces/forms.interface';
import { Observable } from 'rxjs/Observable';
import { WzTermsComponent } from '../../shared/components/wz-terms/wz.terms.component';
import { WzDialogService } from '../../shared/modules/wz-dialog/services/wz.dialog.service';

/**
 * Registration page component - renders registration page and handles submiting registation form.
 */
@Component({
  moduleId: module.id,
  selector: 'register-component',
  templateUrl: 'register.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterComponent implements OnInit {
  public config: any;
  public serverErrors: ServerErrors = null;
  public newUser: any;
  public successfullySubmitted: boolean = false;
  private terms: any;

  constructor(
    public userService: UserService,
    public store: AppStore,
    private dialogService: WzDialogService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.config = this.store.snapshotCloned(state => state.uiConfig.components.register.config);
    this.downloadTos();
  }

  public onSubmit(user: any): void {
    Object.assign(user, { termsAgreedTo: this.userService.documentId });
    this.userService.create(user).take(1).subscribe((res: Response) => {
      this.successfullySubmitted = true;
      this.newUser = res;
      this.ref.markForCheck();
    }, (error => {
      if (error.status !== 451) this.serverErrors = error.json();
      this.ref.markForCheck();
    }));
  }

  public openTermsDialog() {
    this.dialogService.openComponentInDialog({
      componentType: WzTermsComponent,
      inputOptions: {
        terms: this.terms,
        btnLabel: 'REGISTER.CLOSE_TOS_DIALOG',
        header: 'REGISTER.TOS_TITLE'
      }
    });
  }

  private downloadTos(): void {
    this.userService.downloadActiveTosDocument().take(1).subscribe((terms: any) => {
      this.terms = terms;
    });
  }
}
