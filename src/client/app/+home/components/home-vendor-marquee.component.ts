import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'home-vendor-marquee',
  template: `
    <section hide-xs="" layout="column" class="vendor-marquee">
      <ul>
        <li>
          <img 
            *ngFor="let vendor of vendors; let i = index" 
            src="assets/img/client-marquee/client_{{vendor}}.png"/>
        </li>
        <li>
          <img 
            *ngFor="let vendor2 of vendors2; let i = index" 
            src="assets/img/client-marquee/client_{{vendor2}}.png"/>
        </li>
        <li>
          <img 
            *ngFor="let vendor of vendors; let i = index" 
            src="assets/img/client-marquee/client_{{vendor}}.png"/>
        </li>
      </ul>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeVendorMarqueeComponent {
  @Input() config: any;

  public vendors: any = ['dimoc', 'usta', 'AFV', 'discovery', 'ncaa', 'paramount'];
  public vendors2: any = ['natgeo', 'pac12', 'usga', 'sony', 'big10', 'wpt'];
}
