import { Observable } from 'rxjs/Observable';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { AppStore } from '../../app.store';

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: 'app-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppNavComponent {
  @Input() currentUser: any;
  @Input() config: any;
  @Input() supportedLanguages: any;
  @Input() userPreference: any;
  @Input() cartSize: any;
  @Input() userCan: any;
  @Output() onLogOut = new EventEmitter();
  @Output() onChangeLang = new EventEmitter();
  @Output() onOpenSidenav = new EventEmitter();
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public headerCanBeFixed: Observable<boolean>;
  public headerIsFixed: Observable<boolean>;

  constructor(private store: AppStore, private router: Router) {
    this.headerCanBeFixed = this._headerCanBeFixed();
    this.headerIsFixed = this._headerIsFixed();
  }

  public logOut(event: Event) {
    this.onLogOut.emit(event);
    this.trigger.closeMenu();
    this.router.navigate(['/']);
  }

  public toggleSearch() {
    this.userPreference.toggleSearch();
  }

  public toggleCollectionTray() {
    this.userPreference.toggleCollectionTray();
  }

  public formatBadgeNumber(size: any): string {
    return (size > 99) ? '99+' : size.toString();
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  private _headerIsFixed(): Observable<boolean> {
    return this.store.select(state => state.headerDisplayOptions.isFixed);
  }

  private _headerCanBeFixed(): Observable<boolean> {
    return this.store.select(state => state.headerDisplayOptions.canBeFixed);
  }
}
