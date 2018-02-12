import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'error-component',
  template: `
    <section class="error">
      <div class="hero">
        <router-outlet></router-outlet>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent { }
