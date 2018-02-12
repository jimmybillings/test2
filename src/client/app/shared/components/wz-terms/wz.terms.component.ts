import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'wz-terms',
  templateUrl: 'wz.terms.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzTermsComponent {
  @Input() terms: any;
  @Input() btnLabel: string;
  @Input() header: string;
}
