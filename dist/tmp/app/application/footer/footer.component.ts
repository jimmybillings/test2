import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

/**
 * site footer component - renders the footer information
 */
@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: 'footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent {
  @Input() config: any;

  public get privacyPolicyExists(): boolean {
    return this.config &&
      this.config.hasOwnProperty('privacyPolicyId') &&
      this.config.privacyPolicyId.hasOwnProperty('value') &&
      this.config.privacyPolicyId.value !== '';
  }

  public get showContacts(): boolean {
    return this.config &&
      this.config.hasOwnProperty('contacts') &&
      this.config.contacts.hasOwnProperty('items') &&
      this.config.contacts.items.length > 0;
  }

  public get contacts(): any {
    return this.config.contacts.items;
  }

  public show(value: string): boolean {
    return value !== undefined;
  }
}
