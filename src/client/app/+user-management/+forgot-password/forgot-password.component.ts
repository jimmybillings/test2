import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { AppStore } from '../../app.store';

@Component({
  moduleId: module.id,
  selector: 'forgot-password-component',
  templateUrl: 'forgot-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ForgotPasswordComponent implements OnInit {
  public config: any;
  public successfullySubmitted: boolean = false;
  public serverErrors: any;

  constructor(
    public user: UserService,
    public store: AppStore,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.config = this.store.snapshotCloned(state => state.uiConfig.components.forgotPassword.config);
  }

  public onSubmit(user: Object): void {
    this.user.forgotPassword(user).subscribe();
    this.successfullySubmitted = true;
    this.ref.markForCheck();
  }
}
