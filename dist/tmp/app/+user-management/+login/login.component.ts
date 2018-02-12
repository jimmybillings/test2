import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Authentication } from '../../shared/services/authentication.data.service';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { UserService } from '../../shared/services/user.service';
import { PendoService } from '../../shared/services/pendo.service';
import { Session, Credentials } from '../../shared/interfaces/session.interface';
import { Account } from '../../shared/interfaces/account.interface';
import { Observable } from 'rxjs/Observable';
import { WzTermsComponent } from '../../shared/components/wz-terms/wz.terms.component';
import { FeatureStore } from '../../shared/stores/feature.store';
import { WzDialogService } from '../../shared/modules/wz-dialog/services/wz.dialog.service';
import { AppStore } from '../../app.store';

@Component({
  moduleId: module.id,
  selector: 'login-component',
  templateUrl: 'login.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {
  public config: any;
  public displayWelcomeMessage: boolean;
  public displayErrorMessage: boolean;

  constructor(
    private authentication: Authentication,
    private router: Router,
    private currentUser: CurrentUserService,
    private user: UserService,
    private pendo: PendoService,
    private dialogService: WzDialogService,
    private feature: FeatureStore,
    private store: AppStore) { }

  ngOnInit(): void {
    this.displayWelcomeMessage = this.router.routerState.snapshot.url.includes('newUser=true');
    this.displayErrorMessage = this.router.routerState.snapshot.url.includes('requireLogin=true');

    this.config = this.store.snapshotCloned(state => state.uiConfig.components.login.config);
  }

  public onSubmit(user: Credentials): void {
    this.authentication.create(user)
      .do((session: Session) => {
        this.currentUser.set(session.user, session.token.token);
        this.pendo.initialize(session.user);
        if (session.siteFeatures) this.feature.set(session.siteFeatures);

        if (session.documentsRequiringAgreement &&
          session.documentsRequiringAgreement.indexOf('TOS') > -1) {
          this.showTerms();
        } else { this.redirectUserAppropriately(); }
      })
      .switchMap((session) => {
        return (session.user && session.user.accountId) ?
          this.user.getAccount(session.user.accountId) : Observable.empty();
      })
      .do((account: Account) => {
        if (account) this.currentUser.addAccountToUser(account);
      }).subscribe();
  }

  private showTerms(): void {
    this.user.downloadActiveTosDocument().take(1).subscribe((terms: string) => {
      this.dialogService.openComponentInDialog({
        componentType: WzTermsComponent,
        inputOptions: {
          terms: terms,
          btnLabel: 'LOGIN.AGREE_TO_TOS',
          header: 'LOGIN.TOS_TITLE'
        }
      }).subscribe(() => this.agreeToTermsAndClose());
    });
  }

  private redirectUserAppropriately(): void {
    this.store.dispatch(factory => factory.router.followRedirect());
    // TODO: make this a side effect
    this.store.dispatch(factory => factory.uiConfig.load());
  }

  private agreeToTermsAndClose = (): void => {
    this.user.agreeUserToTerms();
    this.redirectUserAppropriately();
  }
}
