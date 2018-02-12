import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Capabilities } from '../../shared/services/capabilities.service';
import { ErrorBase } from '../error.base';

@Component({
  moduleId: module.id,
  selector: 'server-error-component',
  templateUrl: './server-error.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerErrorComponent extends ErrorBase {
  constructor(protected userCan: Capabilities) {
    super(userCan);
  }
}
