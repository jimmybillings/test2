import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'home-highlights',
  template: `
    <section layout="row" layout-align="center start" class="mrkt-collections">
      <div flex-gt-lg="70" flex-lg="70" flex-gt-md="80" flex-gt-sm="90" flex="100" layout="row" layout-wrap="">
        <div *ngFor="let highlight of config.highlights.items; let i = index" 
          flex-gt-xs="33" flex="100" 
          class="mrkt-collections__highlight"
        >
          <a *ngIf="config" [routerLink]="['/search', buildSearchContext(highlight.searchContext)]">
            <div class="mrkt-collections__highlight_img"></div>
            <div class="mrkt-collections__highlight_content">
              <h5 class="mat-title">{{ 'HOME.HIGHLIGHT.'+(i+1) | translate }}</h5>
            </div>
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeHighlightsComponent {
  @Input() config: any;

  public buildSearchContext(context: any): any {
    context = JSON.parse(context);
    for (let param in context) {
      if (context[param] === '') delete (context[param]);
    }
    return context;
  }
}
