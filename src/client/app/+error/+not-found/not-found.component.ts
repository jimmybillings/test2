import { Capabilities } from '../../shared/services/capabilities.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorBase } from '../error.base';

@Component({
  moduleId: module.id,
  selector: 'not-found-component',
  templateUrl: `./not-found.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent extends ErrorBase {
  constructor(protected userCan: Capabilities) {
    super(userCan);
  }
}
