import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'wz-site-changer-component',
  template: `
      <form *ngIf="isPocNineTeen()" class="language-selector">
        <mat-form-field>
          <mat-select [(ngModel)]="currentSite" name="currentSite" (change)="selectSite($event)">
            <mat-option *ngFor="let site of sites" [value]="site">
              {{site}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </form>`,
  styles: [`
    mat-form-field {width: 175px; font-size: 16px;},
    form {padding:0;}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzSiteChangerComponent {
  public sites: string[] = [
    'commerce', 'usopen', 'cnn', 'usta-usopen',
    'bbcws', 'hbo-boxing', 'wpt', 'dvids', 'augusta',
    'laac', 'cfp', 'sony', 'nab', 'amblin'
  ];
  public currentSite: string = localStorage.getItem('currentSite') || 'commerce';

  public selectSite(site: any) {
    localStorage.clear();
    localStorage.setItem('currentSite', site.value);
    location.reload();
  }

  public isPocNineTeen() {
    return location.host.indexOf('poc19') > -1 || location.host.indexOf('localhost') > -1;
  }
}
