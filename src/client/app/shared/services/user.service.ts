import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../shared/services/api.service';
import { Api, ApiResponse } from '../../shared/interfaces/api.interface';
import { Response } from '@angular/http';
import { User, Address, ViewAddress, Document, UserBasicInfo } from '../../shared/interfaces/user.interface';
import { CurrentUserService } from './current-user.service';
/**
 * Service that provides api access registering new users.
 */
@Injectable()
export class UserService {
  public documentId: number;
  constructor(private api: ApiService, private currentUser: CurrentUserService) { }

  public get(): Observable<any> {
    return this.api.get(Api.Identities, 'user/currentUser');
  }

  public getById(id: number): Observable<User> {
    return this.api.get(Api.Identities, 'user/' + id);
  }

  public create(user: Object): Observable<any> {
    return this.api.post(Api.Identities, 'user/register',
      { body: user, loadingIndicator: true }
    );
  }

  public forgotPassword(user: any): Observable<any> {
    return this.api.post(Api.Identities, 'user/requestPasswordReset',
      { body: user, loadingIndicator: true }
    );
  }

  public downloadActiveTosDocument(): Observable<any> {
    return this.api.get(Api.Identities, 'document/activeVersion/TOS').flatMap((response: Document) => {
      this.documentId = response.id;
      return this.api.get(
        Api.Identities,
        `document/downloadDocumentFile/${response.id}`,
        { headerType: 'download' }
      );
    }).map((response: Response) => {
      return response.text();
    });
  }

  public agreeUserToTerms(): void {
    this.api.post(
      Api.Identities,
      `document/version/agree`,
      { parameters: { documentId: this.documentId.toString() } }
    ).take(1).subscribe();
  }

  // Used by a logged-in user to change their password
  public changePassword(form: any): Observable<any> {
    return this.api.post(Api.Identities, 'user/changePassword', {
      body: { oldPassword: form.oldPassword, newPassword: form.newPassword },
      loadingIndicator: true
    });
  }

  // Used by a logged-out user to reset their password - requires overridingToken
  public resetPassword(form: any, overridingToken: string): Observable<any> {
    return this.api.post(Api.Identities, 'user/passwordReset',
      { body: { newPassword: form.newPassword }, overridingToken: overridingToken, loadingIndicator: true }
    );
  }

  public getAddresses(): Observable<Array<ViewAddress>> {
    return this.api.get(Api.Identities, 'user/currentUsersAssociatedAddresses')
      .map((addresses: { list: ViewAddress[] }) => {
        return addresses.list;
      });
  }

  public addBillingAddress(address: Address): Observable<any> {
    let newUser: User = Object.assign({}, JSON.parse(localStorage.getItem('currentUser')), { billingInfo: { address: address } });
    return this.editSelfSafe(newUser);
  }

  public addAccountBillingAddress(address: ViewAddress): Observable<any> {
    return this.api.get(
      Api.Identities,
      `account/${address.addressEntityId}`,
      { loadingIndicator: 'onBeforeRequest' }
    ).flatMap((account: any) => {
      let newAccount: any = Object.assign({}, account, { billingInfo: { address: address.address } });
      return this.api.put(
        Api.Identities,
        `account/${address.addressEntityId}`,
        { body: newAccount, loadingIndicator: 'offAfterResponse' }
      );
    });
  }

  public getAccount(accountId: number): Observable<any> {
    return this.api.get(Api.Identities, `account/${accountId}`);
  }

  public changeBasicInfo(form: UserBasicInfo): Observable<any> {
    let newUser: User = Object.assign({}, JSON.parse(localStorage.getItem('currentUser')), form);
    return this.editSelfSafe(newUser);
  }

  public editSelfSafe(body: User) {
    return this.api.put(Api.Identities, 'user/self', { body: body }).do((user: User) => {
      this.currentUser.set(user);
    });
  }
}
