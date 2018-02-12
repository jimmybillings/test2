import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppStore } from '../../app.store';

@Component({
  moduleId: module.id,
  selector: 'app-loading-indicator',
  template: `<mat-progress-bar mode="indeterminate" color="accent" *ngIf="showLoadingIndicator | async"></mat-progress-bar>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLoadingIndicatorComponent {
  constructor(private store: AppStore) { }

  public get showLoadingIndicator(): Observable<boolean> {
    return this.store.select(state => state.loadingIndicator.show);
  }
}
