import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AppStore } from '../app.store';

@Component({
  moduleId: module.id,
  selector: 'privacy-policy-component',
  template: `
    <div class="privacy-policy" layout="row" layout-align="center center">
      <mat-card flex="90">
        <mat-card-content [innerHTML]="document | async"></mat-card-content>
      </mat-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    .privacy-policy mat-card { margin: 20px 0; }
    `
  ]
})
export class PrivacyPolicyComponent {
  constructor(private store: AppStore) { }

  public get document(): Observable<string> {
    return this.store.select(state => state.privacyPolicy.document);
  }
}
