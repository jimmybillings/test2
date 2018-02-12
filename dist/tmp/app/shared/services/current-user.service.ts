import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Account } from '../interfaces/account.interface';
import { LegacyAction } from '../interfaces/common.interface';
import { User } from '../interfaces/user.interface';

export function currentUser(state = {}, action: LegacyAction) {

  switch (action.type) {
    case 'SET_USER':
      return {
        ...action.payload
      };
    case 'SET_ACCOUNT_ON_USER':
      return {
        ...state, account: action.payload
      };
    default:
      return state;
  }
};

/**
 * Model that describes current user, and provides
 * methods for retrieving user attributes.
 */
@Injectable()
export class CurrentUserService {
  public permissions: any;
  public data: Observable<User>;

  constructor(private store: Store<User>) {
    this.data = this.store.select('currentUser');
  }

  public get state(): User {
    let s: User;
    this.data.take(1).subscribe((u: User) => s = u);
    return s;
  }

  public set(user: User = null, token?: string): void {
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    if (token) localStorage.setItem('token', token);
    this.store.dispatch({ type: 'SET_USER', payload: this._user() });
  }

  public destroy(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    this.set();
  }

  public addAccountToUser(account: Account) {
    const cachedUser: User = JSON.parse(localStorage.getItem('currentUser'));
    cachedUser.account = account;
    localStorage.setItem('currentUser', JSON.stringify(cachedUser));
    this.store.dispatch({ type: 'SET_ACCOUNT_ON_USER', payload: account });
  }

  public loggedInState(): Observable<boolean> {
    return this.data.map(user => user.id > 0);
  }

  public loggedIn(): boolean {
    let loggedIn: boolean = false;
    this.data
      .take(1)
      .subscribe(user => loggedIn = user.id > 0);
    return loggedIn;
  }

  public fullName(): Observable<string> {
    return this.data.map(user => `${user.firstName} ${user.lastName}`);
  }

  public hasPermission(permission: string): boolean {
    let hasPermission: boolean;
    this.data.map((user: any) => {
      return user.allUserPermissions || [];
    }).take(1).subscribe((permissions: any) => {
      hasPermission = permissions.indexOf(permission) > -1;
    });
    return hasPermission;
  }

  public hasPurchaseOnCredit(): boolean {
    let answer: boolean;
    this.data
      .take(1)
      .subscribe(user => answer = (user.hasOwnProperty('purchaseOnCredit') ? user.purchaseOnCredit : false));
    return answer;
  }

  private _user(): User {
    return JSON.parse(localStorage.getItem('currentUser')) || this.mayflyUser();
  }

  private mayflyUser(): User {
    return {
      lastUpdated: new Date(),
      createdOn: new Date(),
      id: 0,
      emailAddress: '',
      password: '',
      firstName: '',
      lastName: '',
      siteName: '',
      accountIds: [0],
      permissions: [''],
      purchaseOnCredit: false,
      focusedCollection: null,
      ownedCollections: null,
      editableCollections: null,
      accessibleCollections: null,
      account: null
    };
  }
}
