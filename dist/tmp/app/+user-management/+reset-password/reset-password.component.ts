import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AppStore } from '../../app.store';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { ServerErrors } from '../../shared/interfaces/forms.interface';

@Component({
  moduleId: module.id,
  selector: 'reset-password-component',
  templateUrl: 'reset-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResetPasswordComponent implements OnInit {
  public config: any;
  public serverErrors: ServerErrors = null;
  public shareKey: string;

  constructor(
    private user: UserService,
    private store: AppStore,
    private route: ActivatedRoute,
    private router: Router,
    private currentUser: CurrentUserService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.shareKey = this.route.snapshot.params['share_key'] || null;
    const configSegment: string = this.currentUser.loggedIn() ? 'changePassword' : 'resetPassword';
    this.config = this.store.snapshotCloned(state => state.uiConfig.components[configSegment].config);
  }

  public onSubmit(form: any): void {
    if (this.shareKey) {
      this.user.resetPassword(form, this.shareKey)
        .do((res: any) => this.currentUser.set(res.user, res.token.token))
        .subscribe(this.handleSuccess, this.handleError);
    } else {
      this.user.changePassword(form).subscribe(this.handleSuccess, this.handleError);
    }
  }

  private handleSuccess = () => {
    this.router.navigate(['/']);
    this.store.dispatch(factory => factory.snackbar.display('RESETPASSWORD.PASSWORD_CHANGED'));
    this.ref.markForCheck();
  }

  private handleError = (error: any) => {
    this.serverErrors = error.json();
    this.ref.markForCheck();
  }
}
